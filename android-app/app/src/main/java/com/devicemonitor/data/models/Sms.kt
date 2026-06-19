package com.devicemonitor.data.models

import kotlinx.serialization.Serializable

@Serializable
data class Sms(
    val device_id: String,
    val contact_name: String? = null,
    val phone_number: String,
    val message_type: String, // sent, received
    val content: String,
    val is_deleted: Boolean = false,
    val recorded_at: String? = null
)
