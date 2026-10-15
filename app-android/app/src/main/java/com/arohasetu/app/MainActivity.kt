package com.arohasetu.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.DisposableEffect
import com.arohasetu.app.core.DemoData
import com.arohasetu.app.data.MedStore
import com.arohasetu.app.ui.App
import com.arohasetu.app.ui.AppState

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        MedStore.init(applicationContext, DemoData.BASE_MEDICATIONS)
        val state = AppState(applicationContext)
        setContent {
            DisposableEffect(Unit) {
                state.startClock()
                onDispose { state.stopClock() }
            }
            App(state)
        }
    }
}
