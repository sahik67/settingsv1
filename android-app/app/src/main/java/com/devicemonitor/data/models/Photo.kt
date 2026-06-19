package com.devicemonitor.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Photo(
    val device_id: String,
    val photo_url: String? = null,
    val thumbnail_url: String? = null,
    val recorded_at: String? = null
)
