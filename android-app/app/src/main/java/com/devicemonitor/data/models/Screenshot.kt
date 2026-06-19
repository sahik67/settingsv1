package com.devicemonitor.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Screenshot(
    val device_id: String,
    val screenshot_url: String? = null,
    val recorded_at: String? = null
)
