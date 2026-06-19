package com.devicemonitor.data.models

import kotlinx.serialization.Serializable

@Serializable
data class CallRecording(
    val id: String? = null,
    val device_id: String,
    val file_url: String? = null,
    val contact_name: String? = null,
    val phone_number: String? = null,
    val call_type: String? = null,
    val duration_seconds: Long? = null,
    val recorded_at: String? = null
)
