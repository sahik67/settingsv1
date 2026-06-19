package com.devicemonitor.data.models

data class RemoteCommand(
    val id: String? = null,
    val device_id: String,
    val command: String, // "fetch_location", "capture_photo", "ring_device", "sync_data"
    val payload: String? = null,
    val status: String = "pending", // "pending", "completed", "failed"
    val created_at: String? = null,
    val updated_at: String? = null
)
