package com.devicemonitor.receiver

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import androidx.core.content.ContextCompat
import com.devicemonitor.MainActivity

class DialCodeReceiverActivity : Activity() {

    private val SECRET_CODE = "12345"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Check if the secret code is dialed (via scheme or number)
        val data = intent.data
        val action = intent.action

        val codeDialed = if (data != null) {
            val scheme = data.scheme
            val host = data.host
            scheme == "secret" || host == SECRET_CODE
        } else {
            // Handle numeric dial code (e.g., *#*#12345#*#*)
            val number = intent.getStringExtra("android.intent.extra.PHONE_NUMBER")
            number?.contains(SECRET_CODE) == true
        }

        if (codeDialed) {
            // Launch MainActivity
            val mainIntent = Intent(this, MainActivity::class.java)
            mainIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP)
            ContextCompat.startActivity(this, mainIntent, null)
        }

        finish()
    }
}
