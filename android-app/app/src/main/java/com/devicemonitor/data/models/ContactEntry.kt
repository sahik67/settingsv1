package com.devicemonitor.data.models

import kotlinx.serialization.Serializable

@Serializable
data class ContactEntry(
    val id: String? = null,
    val device_id: String,
    val display_name: String? = null,
    val phone_numbers: List<String>? = null,
    val emails: List<String>? = null,
    val photo_uri: String? = null,
    val recorded_at: String? = null
)
