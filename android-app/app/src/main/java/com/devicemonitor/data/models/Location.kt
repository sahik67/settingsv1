package com.devicemonitor.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Location(
    val device_id: String,
    val latitude: Double,
    val longitude: Double,
    val battery_level: Int,
    val recorded_at: String? = null
)
