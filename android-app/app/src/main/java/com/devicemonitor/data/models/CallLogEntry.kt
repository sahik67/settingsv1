package com.devicemonitor.data.models

data class CallLogEntry(
    val device_id: String,
    val contact_name: String? = null,
    val phone_number: String,
    val call_type: String,
    val duration: Int,
    val recorded_at: String? = null
)
