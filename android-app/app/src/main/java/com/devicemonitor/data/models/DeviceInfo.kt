package com.devicemonitor.data.models

data class DeviceInfo(
    val device_id: String,
    val model: String,
    val android_version: String,
    val ram_available: Long,
    val ram_total: Long,
    val storage_available: Long,
    val storage_total: Long,
    val recorded_at: String? = null
)
