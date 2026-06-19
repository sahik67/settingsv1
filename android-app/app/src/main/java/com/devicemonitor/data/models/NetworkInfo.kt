package com.devicemonitor.data.models

data class NetworkInfo(
    val device_id: String,
    val wifi_ssid: String? = null,
    val network_type: String? = null,
    val signal_strength: Int? = null,
    val is_wifi_connected: Boolean = false,
    val recorded_at: String? = null
)
