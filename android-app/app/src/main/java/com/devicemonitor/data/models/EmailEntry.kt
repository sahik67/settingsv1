package com.devicemonitor.data.models

import kotlinx.serialization.Serializable

@Serializable
data class EmailEntry(
    val id: String? = null,
    val device_id: String,
    val from_address: String? = null,
    val to_addresses: List<String>? = null,
    val subject: String? = null,
    val body: String? = null,
    val recorded_at: String? = null
)
