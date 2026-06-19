package com.devicemonitor.data.models

data class AppUsage(
    val device_id: String,
    val package_name: String,
    val app_name: String? = null,
    val usage_time: Long,
    val recorded_at: String? = null
)
