package com.devicemonitor.data.models

data class SmsEntry(
    val device_id: String,
    val contact_name: String? = null,
    val phone_number: String,
    val message_type: String,
    val content: String,
    val is_deleted: Boolean = false,
    val recorded_at: String? = null
)
