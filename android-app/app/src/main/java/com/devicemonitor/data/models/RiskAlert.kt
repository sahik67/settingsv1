package com.devicemonitor.data.models

import kotlinx.serialization.Serializable

@Serializable
data class RiskAlert(
    val id: String? = null,
    val device_id: String,
    val alert_type: String, // 'sensitive_word', 'harmful_content', 'suspicious_activity'
    val description: String? = null,
    val source: String? = null, // e.g., 'whatsapp', 'sms', 'browser'
    val content: String? = null,
    val recorded_at: String? = null
)
