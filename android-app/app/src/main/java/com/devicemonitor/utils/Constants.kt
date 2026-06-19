package com.devicemonitor.utils

object Constants {
    // Supabase Configuration
    const val SUPABASE_URL = "https://orrdsscvzaginlvmbyow.supabase.co"
    const val SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ycmRzc2N2emFnaW5sdm1ieW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NDAyNDgsImV4cCI6MjA5NzQxNjI0OH0.DAxBhVIbTewGs_GiR8cmKpo-zT1eOHwG6W7HVeQzZVU"

    // Cloudinary Configuration (for media storage)
    const val CLOUDINARY_CLOUD_NAME = "dzd8hoo8e"
    const val CLOUDINARY_API_KEY = "698814473289373"
    const val CLOUDINARY_API_SECRET = "AL3-OivwlGrGZO30a3J2-4TVY4s"

    // Device Configuration
    const val DEVICE_ID = "ef7dde6f-4296-4c65-a20b-a36df9f07c8f" // Replace with your device UUID

    // Sync Configuration
    const val SYNC_INTERVAL_MINUTES = 15L

    // Shared Preferences
    const val PREFS_NAME = "device_monitor_prefs"
    const val PREF_STEALTH_MODE_ENABLED = "stealth_mode_enabled"
}
