package com.devicemonitor.data.models

data class LocationEntry(
    val device_id: String,
    val latitude: Double,
    val longitude: Double,
    val battery_level: Int,
    val is_charging: Boolean,
    val recorded_at: String? = null
)
