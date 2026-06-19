package com.devicemonitor.data.models

import kotlinx.serialization.Serializable

@Serializable
data class CallLog(
    val device_id: String,
    val contact_name: String? = null,
    val phone_number: String,
    val call_type: String, // incoming, outgoing, missed
    val duration: Int,
    val recorded_at: String? = null
)
