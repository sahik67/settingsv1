package com.devicemonitor.data.models

import kotlinx.serialization.Serializable

@Serializable
data class MessengerMessage(
    val device_id: String,
    val messenger_type: String, // whatsapp, facebook, snapchat, telegram, instagram
    val contact_name: String? = null,
    val content: String,
    val message_type: String, // sent, received
    val recorded_at: String? = null
)
