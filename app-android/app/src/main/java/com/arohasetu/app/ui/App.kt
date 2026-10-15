package com.arohasetu.app.ui

import android.Manifest
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothGatt
import android.bluetooth.BluetoothGattCallback
import android.bluetooth.BluetoothGattCharacteristic
import android.bluetooth.BluetoothGattDescriptor
import android.bluetooth.BluetoothProfile
import android.bluetooth.BluetoothManager
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.ParcelUuid
import android.bluetooth.le.ScanCallback
import android.bluetooth.le.ScanFilter
import android.bluetooth.le.ScanResult
import android.bluetooth.le.ScanSettings
import java.util.UUID
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.platform.LocalContext
import androidx.core.content.ContextCompat
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.foundation.Canvas
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.arohasetu.app.core.*
import com.arohasetu.app.data.Repository

@Composable
fun BrandLogoMark(modifier: Modifier = Modifier, size: Dp = 32.dp) {
    val logoBg = Color(0xFFE8F6F5)
    val logoNavy = Color(0xFF103663)
    val logoBorder = Color(0xFFC2E8E4)

    Box(
        modifier = modifier
            .size(size)
            .clip(RoundedCornerShape(size * 0.24f))
            .background(logoBg)
            .border(1.dp, logoBorder, RoundedCornerShape(size * 0.24f)),
        contentAlignment = Alignment.Center
    ) {
        Canvas(modifier = Modifier.size(size * 0.68f)) {
            val w = this.size.width
            val h = this.size.height
            val strokeW = (w * 0.08f).coerceAtLeast(1.8f)

            // Heart outline
            val heartPath = Path().apply {
                moveTo(w * 0.50f, h * 0.78f)
                cubicTo(w * 0.34f, h * 0.65f, w * 0.20f, h * 0.53f, w * 0.20f, h * 0.38f)
                cubicTo(w * 0.20f, h * 0.25f, w * 0.305f, h * 0.17f, w * 0.415f, h * 0.17f)
                cubicTo(w * 0.465f, h * 0.17f, w * 0.488f, h * 0.195f, w * 0.50f, h * 0.22f)
                cubicTo(w * 0.512f, h * 0.195f, w * 0.535f, h * 0.17f, w * 0.585f, h * 0.17f)
                cubicTo(w * 0.695f, h * 0.17f, w * 0.80f, h * 0.25f, w * 0.80f, h * 0.38f)
                cubicTo(w * 0.80f, h * 0.53f, w * 0.66f, h * 0.65f, w * 0.50f, h * 0.78f)
                close()
            }
            drawPath(
                path = heartPath,
                color = logoNavy,
                style = Stroke(width = strokeW, cap = StrokeCap.Round, join = StrokeJoin.Round)
            )

            // ECG pulse line
            val pulsePath = Path().apply {
                moveTo(w * 0.20f, h * 0.50f)
                lineTo(w * 0.41f, h * 0.50f)
                lineTo(w * 0.45f, h * 0.61f)
                lineTo(w * 0.525f, h * 0.33f)
                lineTo(w * 0.575f, h * 0.50f)
                lineTo(w * 0.80f, h * 0.50f)
            }
            drawPath(
                path = pulsePath,
                color = logoNavy,
                style = Stroke(width = strokeW, cap = StrokeCap.Round, join = StrokeJoin.Round)
            )
        }
    }
}

@Composable
fun App(state: AppState) {
    MaterialTheme(colorScheme = darkColorScheme(
        background = AppColors.bg,
        surface = AppColors.panel,
        primary = AppColors.accent,
        secondary = AppColors.accent2
    )) {
        val user = state.currentUser
        if (user == null) {
            LoginScreen(state)
        } else {
            MainShell(state)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun LoginScreen(state: AppState) {
    val ctx = LocalContext.current
    val prefs = ctx.getSharedPreferences("arohasetu_prefs", Context.MODE_PRIVATE)
    var isRegistering by remember { mutableStateOf(false) }
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf(prefs.getString("last_email", "") ?: "") }
    var password by remember { mutableStateOf(prefs.getString("last_pass", "") ?: "") }
    var rememberLogin by remember { mutableStateOf(true) }
    var err by remember { mutableStateOf("") }

    fun doLogin(em: String, pw: String) {
        val e = state.login(em.trim(), pw)
        if (e != null) { err = e; return }
        err = ""
        if (rememberLogin) prefs.edit()
            .putString("last_email", em.trim()).putString("last_pass", pw).apply()
    }

    fun doRegister(nm: String, em: String, pw: String) {
        if (nm.isBlank() || em.isBlank() || pw.length < 6) {
            err = "Name, email & 6+ character password required"
            return
        }
        val e = state.register(nm.trim(), em.trim(), pw, "caregiver")
        if (e != null) { err = e; return }
        err = ""
        if (rememberLogin) prefs.edit()
            .putString("last_email", em.trim()).putString("last_pass", pw).apply()
    }

    Box(Modifier.fillMaxSize().background(AppColors.bg), contentAlignment = Alignment.Center) {
        Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel),
            shape = RoundedCornerShape(18.dp),
            modifier = Modifier.padding(20.dp).widthIn(max = 400.dp)) {
            Column(Modifier.padding(26.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    BrandLogoMark(size = 44.dp)
                    Spacer(Modifier.width(12.dp))
                    Column {
                        Text("Arohasetu FS", color = AppColors.accent, fontSize = 24.sp, fontWeight = FontWeight.Bold)
                        Text("Notice sooner, care better", color = AppColors.muted, fontSize = 12.sp)
                    }
                }
                Spacer(Modifier.height(14.dp))
                if (isRegistering) {
                    OutlinedTextField(value = name, onValueChange = { name = it },
                        label = { Text("Full Name") }, singleLine = true,
                        colors = fieldColors(), modifier = Modifier.fillMaxWidth())
                    Spacer(Modifier.height(8.dp))
                }
                OutlinedTextField(value = email, onValueChange = { email = it },
                    label = { Text("Email") }, singleLine = true, isError = err.isNotEmpty(),
                    colors = fieldColors(), modifier = Modifier.fillMaxWidth())
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(value = password, onValueChange = { password = it },
                    label = { Text("Password") }, singleLine = true, isError = err.isNotEmpty(),
                    visualTransformation = PasswordVisualTransformation(),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    colors = fieldColors(), modifier = Modifier.fillMaxWidth())
                Spacer(Modifier.height(6.dp))
                Text(err, color = AppColors.danger, fontSize = 13.sp, minLines = 1)
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Checkbox(checked = rememberLogin, onCheckedChange = { rememberLogin = it })
                    Text("Remember login", color = AppColors.muted, fontSize = 12.sp)
                }
                Spacer(Modifier.height(2.dp))
                Button(onClick = {
                    if (isRegistering) doRegister(name, email, password)
                    else doLogin(email, password)
                },
                    colors = ButtonDefaults.buttonColors(containerColor = AppColors.accent),
                    modifier = Modifier.fillMaxWidth()) {
                    Text(if (isRegistering) "Register & Sync to Web" else "Login", color = AppColors.bg, fontWeight = FontWeight.Bold)
                }
                Spacer(Modifier.height(6.dp))
                TextButton(onClick = { isRegistering = !isRegistering; err = "" }, modifier = Modifier.fillMaxWidth()) {
                    Text(if (isRegistering) "Already registered? Switch to Login" else "Need an account? Register on Server", color = AppColors.accent2, fontSize = 12.sp)
                }
                if (!isRegistering) {
                    Spacer(Modifier.height(10.dp))
                    Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel2),
                        shape = RoundedCornerShape(10.dp)) {
                        Column(Modifier.padding(10.dp)) {
                            Text("Tap an account to log in instantly (password: demo123)", color = AppColors.txt, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            DemoShortcut("asharma@demo.in", "home patient", AppColors.ok) { doLogin("asharma@demo.in", "demo123") }
                            DemoShortcut("rprakash@demo.in", "home patient", AppColors.ok) { doLogin("rprakash@demo.in", "demo123") }
                            DemoShortcut("wardnurse@demo.in", "Virtual Ward", AppColors.accent2) { doLogin("wardnurse@demo.in", "demo123") }
                        }
                    }
                }
                Spacer(Modifier.height(10.dp))
                Text("Region: ${DemoData.REGION}", color = AppColors.warn, fontSize = 12.sp)
            }
        }
    }
}

@Composable
private fun DemoShortcut(mail: String, roleLabel: String, roleColor: Color, onTap: () -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()
        .clip(RoundedCornerShape(8.dp))
        .clickable(onClick = onTap)
        .background(AppColors.panel)
        .padding(horizontal = 10.dp, vertical = 8.dp)) {
        Text(mail, color = AppColors.accent2, fontSize = 12.sp, fontWeight = FontWeight.Bold)
        Spacer(Modifier.weight(1f))
        Text(roleLabel, color = roleColor, fontSize = 11.sp)
    }
}

@Composable
private fun fieldColors() = OutlinedTextFieldDefaults.colors(
    focusedBorderColor = AppColors.accent,
    unfocusedBorderColor = AppColors.line,
    cursorColor = AppColors.accent,
    focusedTextColor = AppColors.txt,
    unfocusedTextColor = AppColors.txt,
    focusedLabelColor = AppColors.accent,
    unfocusedLabelColor = AppColors.muted
)

@OptIn(ExperimentalMaterial3Api::class)
private data class NavItem(val label: String, val icon: ImageVector, val selectedIcon: ImageVector)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainShell(state: AppState) {
    val isNurse = state.currentUser?.role == "ward" || state.currentUser?.role == "nurse" || state.currentUser?.email?.contains("nurse") == true
    var tab by remember(isNurse) { mutableStateOf(if (isNurse) "Ward" else "Dashboard") }
    val tabs = buildList {
        add(NavItem("Dashboard", Icons.Outlined.Home, Icons.Filled.Home))
        add(NavItem("Medicines", Icons.Outlined.Medication, Icons.Filled.Medication))
        add(NavItem("Alerts", Icons.Outlined.Notifications, Icons.Filled.Notifications))
        add(NavItem("Devices", Icons.Outlined.Devices, Icons.Filled.Devices))
        if (isNurse) {
            add(NavItem("Ward", Icons.Outlined.LocalHospital, Icons.Filled.LocalHospital))
        }
        add(NavItem("Camera", Icons.Outlined.Videocam, Icons.Filled.Videocam))
    }
    Scaffold(
        containerColor = AppColors.bg,
        topBar = {
            Row(Modifier.fillMaxWidth().padding(start = 14.dp, end = 14.dp, top = 12.dp, bottom = 10.dp), verticalAlignment = Alignment.CenterVertically) {
                BrandLogoMark(size = 32.dp)
                Spacer(Modifier.width(10.dp))
                Column {
                    Text("Arohasetu FS", color = AppColors.txt, fontSize = 19.sp, fontWeight = FontWeight.Bold, lineHeight = 20.sp)
                    Text("Notice sooner, care better", color = AppColors.muted, fontSize = 9.5.sp, lineHeight = 11.sp)
                }
                Spacer(Modifier.weight(1f))
                val srcLabel = if (state.dataSource == Repository.Source.SERVER) "SERVER" else "OFFLINE"
                val srcColor = if (state.dataSource == Repository.Source.SERVER) AppColors.ok else AppColors.warn
                Card(colors = CardDefaults.cardColors(containerColor = srcColor.copy(alpha = 0.15f)),
                    shape = RoundedCornerShape(20.dp)) {
                    Text(srcLabel, color = srcColor, fontSize = 9.sp, fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp))
                }
                Spacer(Modifier.width(6.dp))
                Card(colors = CardDefaults.cardColors(containerColor = AppColors.warn.copy(alpha = 0.15f)),
                    shape = RoundedCornerShape(20.dp)) {
                    Text("LIVE · SIM", color = AppColors.warn, fontSize = 8.sp, fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp))
                }
                Spacer(Modifier.width(4.dp))
                TextButton(onClick = { state.logout() }) {
                    Text("Logout", color = AppColors.accent2, fontSize = 12.sp)
                }
            }
        },
        bottomBar = {
            NavigationBar(containerColor = AppColors.panel2, tonalElevation = 0.dp) {
                tabs.forEach { itm ->
                    val active = tab == itm.label
                    NavigationBarItem(
                        selected = active,
                        onClick = { tab = itm.label },
                        icon = { Icon(if (active) itm.selectedIcon else itm.icon, contentDescription = itm.label) },
                        label = { Text(itm.label, fontSize = 10.sp) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = AppColors.bg,
                            selectedTextColor = AppColors.accent,
                            indicatorColor = AppColors.accent,
                            unselectedIconColor = AppColors.muted,
                            unselectedTextColor = AppColors.muted
                        )
                    )
                }
            }
        }
    ) { pad ->
        Box(Modifier.padding(pad)) {
            when (tab) {
                "Dashboard" -> Dashboard(state)
                "Medicines" -> Medicines(state)
                "Alerts" -> Alerts(state)
                "Devices" -> Devices(state)
                "Ward" -> if (isNurse) Ward(state) else Dashboard(state)
                "Camera" -> Camera(state)
            }
        }
    }
}

@Composable
private fun Section(text: String, color: Color = AppColors.accent) {
    Text(text, color = color, fontSize = 16.sp, fontWeight = FontWeight.Bold)
}

@Composable
private fun StatusBadge(status: String) {
    val (bg, fg) = when (status) {
        "danger" -> AppColors.dangerPanel to AppColors.danger
        "caution" -> AppColors.cautionPanel to AppColors.warn
        else -> AppColors.okPanel to AppColors.ok
    }
    Text(status.uppercase(), color = fg, fontSize = 11.sp, fontWeight = FontWeight.Bold,
        modifier = Modifier.background(bg, RoundedCornerShape(20.dp)).padding(horizontal = 8.dp, vertical = 2.dp))
}

@Composable
fun Dashboard(state: AppState) {
    val tick = state.tick
    val isNurse = state.currentUser?.role == "ward" || state.currentUser?.role == "nurse" || state.currentUser?.email?.contains("nurse") == true
    var selectedPatientId by remember { mutableStateOf("ALL") }
    var dashboardWatchHr by remember { mutableStateOf<Int?>(null) }
    var dashboardWatchSource by remember { mutableStateOf("SIMULATED") }
    var dashboardWatchPatientId by remember { mutableStateOf("") }

    val displayedPatients = if (isNurse && selectedPatientId != "ALL") {
        state.patients.filter { it.id == selectedPatientId }
    } else {
        state.patients
    }

    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(14.dp)) {
        item {
            Text("Live Vitals Dashboard", color = AppColors.txt, fontSize = 18.sp, fontWeight = FontWeight.Bold)
            Text("Region: ${DemoData.REGION}", color = AppColors.warn, fontSize = 12.sp)
            val srcNote = if (state.dataSource == Repository.Source.SERVER)
                "Data fetched from arohasetu.vercel.app" else "OFFLINE: local engine"
            Text(srcNote, color = if (state.dataSource == Repository.Source.SERVER) AppColors.ok else AppColors.muted, fontSize = 11.sp)
            Text("SIMULATED vital data • REAL monitoring logic", color = AppColors.muted, fontSize = 11.sp)
        }
        item {
            val watchPatient = displayedPatients.firstOrNull()
            SmartwatchBluetoothPanel { heartRate, source ->
                dashboardWatchHr = heartRate
                dashboardWatchSource = source
                dashboardWatchPatientId = watchPatient?.id.orEmpty()
            }
        }
        item {
            val nNormal = state.patients.count { worstStatus(state.reportOf(it)) == "normal" }
            val nCaution = state.patients.count { worstStatus(state.reportOf(it)) == "caution" }
            val nDanger = state.patients.count { worstStatus(state.reportOf(it)) == "danger" }
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                StatTile("Patients", state.patients.size, AppColors.accent2) { Modifier.weight(1f) }
                StatTile("Stable", nNormal, AppColors.ok) { Modifier.weight(1f) }
                StatTile("Caution", nCaution, AppColors.warn) { Modifier.weight(1f) }
                StatTile("Danger", nDanger, AppColors.danger) { Modifier.weight(1f) }
            }
        }
        if (isNurse && state.patients.isNotEmpty()) {
            item {
                Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel2),
                    shape = RoundedCornerShape(12.dp), modifier = Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(10.dp)) {
                        Text("HOSPITAL INPATIENT BED TOGGLE", color = AppColors.accent, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                        Spacer(Modifier.height(8.dp))
                        Row(Modifier.fillMaxWidth().horizontalScroll(rememberScrollState()),
                            horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            val allActive = selectedPatientId == "ALL"
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(if (allActive) AppColors.accent else AppColors.panel)
                                    .clickable { selectedPatientId = "ALL" }
                                    .padding(horizontal = 10.dp, vertical = 6.dp)
                            ) {
                                Text("All Beds (${state.patients.size})",
                                    color = if (allActive) AppColors.bg else AppColors.txt,
                                    fontSize = 11.sp,
                                    fontWeight = if (allActive) FontWeight.Bold else FontWeight.Normal)
                            }
                            state.patients.forEach { p ->
                                val active = selectedPatientId == p.id
                                val bedLabel = p.ward?.substringAfterLast("- ")?.trim() ?: p.id
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(8.dp))
                                        .background(if (active) AppColors.accent2 else AppColors.panel)
                                        .clickable { selectedPatientId = p.id }
                                        .padding(horizontal = 10.dp, vertical = 6.dp)
                                ) {
                                    Text("🛏️ $bedLabel: ${p.name.split(" ").first()}",
                                        color = if (active) AppColors.bg else AppColors.txt,
                                        fontSize = 11.sp,
                                        fontWeight = if (active) FontWeight.Bold else FontWeight.Normal)
                                }
                            }
                        }
                    }
                }
            }
        }
        if (displayedPatients.isEmpty()) {
            item { Text("No patients registered for this account.", color = AppColors.muted) }
        }
        items(displayedPatients) { p ->
            val r = state.reportOf(p)
            val liveWatchHr = dashboardWatchHr?.takeIf { p.id == dashboardWatchPatientId }
            val watchHrStatus = liveWatchHr?.let { if (it >= 130 || it < 45) "danger" else if (it > 100 || it < 60) "caution" else "normal" }
            Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel),
                shape = RoundedCornerShape(14.dp), modifier = Modifier.fillMaxWidth()
                    .border(1.dp, AppColors.line, RoundedCornerShape(14.dp))) {
                Column(Modifier.padding(14.dp)) {
                    val bp = r["bp"] as? String ?: "normal"
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(p.name, color = AppColors.txt, fontSize = 16.sp, fontWeight = FontWeight.Bold)
                        Spacer(Modifier.weight(1f))
                        StatusBadge(bp)
                    }
                    Text("${p.age} yrs • ${p.sex} • ${p.condition} • ${p.location}", color = AppColors.muted, fontSize = 12.sp)
                    if (p.ward != null) Text("${p.ward}", color = AppColors.accent2, fontSize = 12.sp)
                    Spacer(Modifier.height(10.dp))
                    val hrMap = r["hr"] as? Map<*, *> ?: mapOf("value" to "--", "status" to "normal")
                    val spo2Map = r["spo2"] as? Map<*, *> ?: mapOf("value" to "--", "status" to "normal")
                    val sbpMap = r["sbp"] as? Map<*, *> ?: mapOf("value" to "--", "status" to "normal")
                    val dbpMap = r["dbp"] as? Map<*, *> ?: mapOf("value" to "--", "status" to "normal")
                    val tempMap = r["temp"] as? Map<*, *> ?: mapOf("value" to "--", "status" to "normal")
                    val glucoseMap = r["glucose"] as? Map<*, *> ?: mapOf("value" to "--", "status" to "normal")
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        VitalCard(if (liveWatchHr != null) "HR · $dashboardWatchSource" else "HR", liveWatchHr?.toString() ?: hrMap["value"].toString(), watchHrStatus ?: (hrMap["status"] as? String ?: "normal")) { Modifier.weight(1f) }
                        VitalCard("SpO2", spo2Map["value"].toString() + "%", spo2Map["status"] as? String ?: "normal") { Modifier.weight(1f) }
                    }
                    Spacer(Modifier.height(8.dp))
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        VitalCard("BP", "${sbpMap["value"]} / ${dbpMap["value"]}", bp) { Modifier.weight(1f) }
                        VitalCard("Temp", tempMap["value"].toString() + "\u00B0C", tempMap["status"] as? String ?: "normal") { Modifier.weight(1f) }
                    }
                    Spacer(Modifier.height(8.dp))
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        VitalCard("Glucose", glucoseMap["value"].toString(), glucoseMap["status"] as? String ?: "normal") { Modifier.weight(1f) }
                        val danger = RulesEngine.dangerLabels(r).joinToString(", ")
                        Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel2),
                            shape = RoundedCornerShape(10.dp), modifier = Modifier.weight(1f)) {
                            Column(Modifier.padding(10.dp)) {
                                Text("SYSTEM", color = AppColors.muted, fontSize = 10.sp)
                                Text(if (danger.isEmpty()) "All stable" else "DANGER: $danger",
                                    color = if (danger.isEmpty()) AppColors.ok else AppColors.danger,
                                    fontSize = 13.sp, fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                    if (!isNurse && displayedPatients.size == 1) {
                        Spacer(Modifier.height(6.dp))
                        CareAssistantCard(
                            patient = p,
                            report = if (liveWatchHr != null) r + ("hr" to mapOf("value" to liveWatchHr, "status" to (watchHrStatus ?: "normal"))) else r,
                            alerts = state.alerts().filter { it.patientId == p.id },
                            serverConnected = state.dataSource == Repository.Source.SERVER,
                            hasRealWatchReading = liveWatchHr != null && dashboardWatchSource != "SIMULATED"
                        )
                    }
                }
            }
        }
        item { Text("Updated: $tick", color = AppColors.muted, fontSize = 10.sp) }
    }
}

@Composable
private fun CareAssistantCard(
    patient: Patient,
    report: Map<String, Any>,
    alerts: List<AlertEngine.Alert>,
    serverConnected: Boolean,
    hasRealWatchReading: Boolean
) {
    var question by remember(patient.id) { mutableStateOf("") }
    var conversation by remember(patient.id) { mutableStateOf<List<Pair<String, String>>>(emptyList()) }
    val dangerLabels = RulesEngine.dangerLabels(report)
    val condition = alerts.any { it.status == "danger" } || dangerLabels.isNotEmpty()
    val latestAlerts = alerts.take(3).map { it.message }.filter { it.isNotBlank() }
    val hr = reportValue(report, "hr")
    val oxygen = reportValue(report, "spo2")
    val sbp = reportValue(report, "sbp")
    val dbp = reportValue(report, "dbp")
    val temperature = reportValue(report, "temp")
    val glucose = reportValue(report, "glucose")

    fun ask(raw: String) {
        val prompt = raw.trim()
        if (prompt.isBlank()) return
        val lower = prompt.lowercase()
        val feed = if (serverConnected) "The app is receiving updates from the Arohasetu server." else "The app is offline and showing its local demo data."
        val snapshot = "Current readings for ${patient.name}: heart rate $hr bpm; oxygen $oxygen%; blood pressure $sbp/$dbp mmHg; temperature $temperature °C; glucose $glucose mg/dL."
        val reply = when {
            listOf("alert", "fall", "event", "warning").any { it in lower } -> if (latestAlerts.isEmpty()) {
                "No active alerts are currently shown for ${patient.name}. $feed"
            } else "Recent alerts for ${patient.name}: ${latestAlerts.joinToString("; ")}. Check the Alerts page for their status."
            listOf("online", "connect", "update", "fresh", "stale").any { it in lower } -> "$feed Patient readings update automatically when the app is online."
            "oxygen" in lower || "spo2" in lower -> "The current oxygen reading is $oxygen%. ${if (serverConnected) "Use the displayed alerts and ask the care team to interpret concerns." else "This is local demo data, not a live measurement."}"
            "heart" in lower || "pulse" in lower || "rate" in lower -> "The current heart-rate reading is $hr bpm. ${if (hasRealWatchReading) "It includes a connected watch reading." else "It is simulated demo data."}"
            "pressure" in lower || "blood" in lower || "bp" in lower -> "The current blood-pressure reading is $sbp/$dbp mmHg. Follow the patient's care plan and ask their clinician about concerning readings."
            "temperature" in lower || "fever" in lower -> "The current temperature reading is $temperature °C. This assistant cannot diagnose illness."
            "glucose" in lower || "sugar" in lower -> "The current glucose reading is $glucose mg/dL. Follow the patient's care plan for interpretation."
            else -> "$snapshot $feed${if (latestAlerts.isEmpty()) " No active alerts are shown." else " Recent alert: ${latestAlerts.first()}."}"
        } + if (condition) {
            " A danger-level reading or alert is present. Contact the care team promptly; for an immediate emergency, contact local emergency services. This demo does not diagnose."
        } else " These summaries are not a diagnosis or treatment plan."
        conversation = (conversation + ("You" to prompt) + ("Arohasetu assistant" to reply)).takeLast(6)
        question = ""
    }

    Card(
        colors = CardDefaults.cardColors(containerColor = AppColors.panel),
        shape = RoundedCornerShape(14.dp),
        modifier = Modifier.fillMaxWidth().border(1.dp, AppColors.line, RoundedCornerShape(14.dp))
    ) {
        Column(Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(9.dp)) {
            Text("AROHASETU CARE ASSISTANT · DEMO", color = AppColors.accent, fontSize = 10.sp, fontWeight = FontWeight.Bold)
            Text("Ask about ${patient.name}'s situation", color = AppColors.txt, fontSize = 16.sp, fontWeight = FontWeight.Bold)
            Text("Summarizes this account's displayed readings and alerts in the app. No external AI service is used; this is not a diagnosis.", color = AppColors.muted, fontSize = 11.sp)
            if (conversation.isNotEmpty()) {
                conversation.takeLast(4).forEach { (speaker, message) ->
                    Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel2), shape = RoundedCornerShape(9.dp)) {
                        Column(Modifier.fillMaxWidth().padding(9.dp)) {
                            Text(speaker, color = AppColors.accent2, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                            Text(message, color = AppColors.txt, fontSize = 12.sp)
                        }
                    }
                }
            }
            OutlinedTextField(
                value = question,
                onValueChange = { question = it },
                label = { Text("Ask about current readings or alerts") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                colors = fieldColors()
            )
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(onClick = { ask(question.ifBlank { "Summarize the situation" }) }, modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(containerColor = AppColors.accent)) {
                    Text("Ask / Summarize", color = AppColors.bg)
                }
                OutlinedButton(onClick = { ask("Any current alerts?") }, modifier = Modifier.weight(1f)) {
                    Text("Check alerts", color = AppColors.accent2)
                }
            }
        }
    }
}

private fun reportValue(report: Map<String, Any>, key: String): String {
    val metric = report[key] as? Map<*, *> ?: return "not available"
    return metric["value"]?.toString() ?: "not available"
}

@Composable
private fun StatTile(label: String, value: Int, color: Color, weight: @Composable () -> Modifier) {
    Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel2),
        shape = RoundedCornerShape(12.dp), modifier = weight().border(1.dp, AppColors.line, RoundedCornerShape(12.dp))) {
        Column(Modifier.padding(vertical = 10.dp, horizontal = 8.dp)) {
            Text(label.uppercase(), color = AppColors.muted, fontSize = 9.sp, fontWeight = FontWeight.Bold)
            Text(value.toString(), color = color, fontSize = 22.sp, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
private fun MetricChip(label: String, value: String) {
    Text("$label $value", color = AppColors.txt, fontSize = 10.sp, fontWeight = FontWeight.Medium,
        modifier = Modifier.background(AppColors.panel2, RoundedCornerShape(6.dp))
            .border(1.dp, AppColors.line, RoundedCornerShape(6.dp))
            .padding(horizontal = 6.dp, vertical = 2.dp))
}

@Composable
private fun VitalCard(label: String, value: String, status: String, weight: @Composable () -> Modifier) {
    Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel2),
        shape = RoundedCornerShape(10.dp), modifier = weight()) {
        Column(Modifier.padding(10.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(label, color = AppColors.muted, fontSize = 11.sp)
                Spacer(Modifier.weight(1f))
                StatusBadge(status)
            }
            Text(value, color = AppColors.txt, fontSize = 18.sp, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
private fun SmartwatchBluetoothPanel(onHeartRate: (Int?, String) -> Unit) {
    val context = LocalContext.current
    val manager = remember { context.getSystemService(Context.BLUETOOTH_SERVICE) as? BluetoothManager }
    val adapter = manager?.adapter
    val discovered = remember { mutableStateListOf<BluetoothDevice>() }
    var status by remember { mutableStateOf("No real watch connected. Dashboard vitals are simulated.") }
    var scanning by remember { mutableStateOf(false) }
    var liveHr by remember { mutableStateOf<Int?>(null) }
    var watchSource by remember { mutableStateOf("SIMULATED") }
    var manualHr by remember { mutableFloatStateOf(84f) }
    var gatt by remember { mutableStateOf<BluetoothGatt?>(null) }
    var scanCallback by remember { mutableStateOf<ScanCallback?>(null) }
    val scanAction = remember { mutableStateOf<(() -> Unit)?>(null) }
    val mainHandler = remember { Handler(Looper.getMainLooper()) }
    val requiredPermissions = remember {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            arrayOf(Manifest.permission.BLUETOOTH_SCAN, Manifest.permission.BLUETOOTH_CONNECT)
        } else arrayOf(Manifest.permission.ACCESS_FINE_LOCATION)
    }

    val permissionLauncher = rememberLauncherForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { result ->
        if (result.values.all { it }) scanAction.value?.invoke()
        else status = "Bluetooth permission was declined; simulated demo readings are still available."
    }

    fun hasPermissions(): Boolean = requiredPermissions.all {
        ContextCompat.checkSelfPermission(context, it) == PackageManager.PERMISSION_GRANTED
    }

    fun stopScan() {
        try { scanCallback?.let { adapter?.bluetoothLeScanner?.stopScan(it) } } catch (_: SecurityException) {}
        scanning = false
    }

    fun beginScan() {
        val scanner = adapter?.bluetoothLeScanner
        if (scanner == null) { status = "Bluetooth is unavailable or switched off on this device."; return }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && !adapter.isEnabled) {
            status = "Turn on Bluetooth, then scan again."
            return
        }
        discovered.clear()
        val callback = object : ScanCallback() {
            override fun onScanResult(callbackType: Int, result: ScanResult) {
                val device = result.device
                if (discovered.none { it.address == device.address }) discovered.add(device)
            }
            override fun onScanFailed(errorCode: Int) {
                scanning = false
                status = "Bluetooth scan could not start (code $errorCode)."
            }
        }
        scanCallback = callback
        scanning = true
        status = "Looking for nearby devices that publish the standard BLE heart-rate service…"
        try {
            scanner.startScan(
                listOf(ScanFilter.Builder().setServiceUuid(ParcelUuid(UUID.fromString("0000180d-0000-1000-8000-00805f9b34fb"))).build()),
                ScanSettings.Builder().setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY).build(),
                callback
            )
            mainHandler.postDelayed({ stopScan(); if (discovered.isEmpty()) status = "No compatible watch found. Try the SIMULATED demo reading below." }, 10000)
        } catch (_: SecurityException) {
            scanning = false
            status = "Bluetooth permission is needed to scan."
        }
    }

    fun requestScan() {
        if (adapter == null) { status = "This device does not have Bluetooth LE."; return }
        scanAction.value = { beginScan() }
        if (hasPermissions()) beginScan() else permissionLauncher.launch(requiredPermissions)
    }

    fun connect(device: BluetoothDevice) {
        stopScan()
        try { gatt?.close() } catch (_: Exception) {}
        status = "Connecting to the selected watch…"
        try {
            gatt = device.connectGatt(context, false, object : BluetoothGattCallback() {
                fun receive(bytes: ByteArray) {
                    if (bytes.size < 2) return
                    val flags = bytes[0].toInt() and 0xff
                    val hr = if ((flags and 1) != 0 && bytes.size >= 3) {
                        (bytes[1].toInt() and 0xff) or ((bytes[2].toInt() and 0xff) shl 8)
                    } else bytes[1].toInt() and 0xff
                    mainHandler.post {
                        liveHr = hr
                        watchSource = "REAL BLE"
                        status = "REAL Bluetooth heart-rate packets are arriving from ${device.name ?: "the paired device"}."
                        onHeartRate(hr, "REAL BLE")
                    }
                }
                override fun onConnectionStateChange(connection: BluetoothGatt, statusCode: Int, newState: Int) {
                    if (newState == BluetoothProfile.STATE_CONNECTED) {
                        mainHandler.post { status = "Connected; enabling the watch heart-rate stream…" }
                        connection.discoverServices()
                    } else if (newState == BluetoothProfile.STATE_DISCONNECTED) {
                        mainHandler.post { liveHr = null; watchSource = "SIMULATED"; status = "Watch disconnected. Dashboard vitals return to simulated values."; onHeartRate(null, "SIMULATED") }
                        connection.close()
                        if (gatt === connection) gatt = null
                    }
                }
                @Suppress("DEPRECATION")
                override fun onServicesDiscovered(connection: BluetoothGatt, statusCode: Int) {
                    val service = connection.getService(UUID.fromString("0000180d-0000-1000-8000-00805f9b34fb"))
                    val characteristic = service?.getCharacteristic(UUID.fromString("00002a37-0000-1000-8000-00805f9b34fb"))
                    if (characteristic == null) {
                        mainHandler.post { status = "This device did not provide a heart-rate measurement stream." }
                        return
                    }
                    connection.setCharacteristicNotification(characteristic, true)
                    val descriptor = characteristic.getDescriptor(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb"))
                    if (descriptor != null) {
                        if (Build.VERSION.SDK_INT >= 33) connection.writeDescriptor(descriptor, BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE)
                        else { descriptor.value = BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE; connection.writeDescriptor(descriptor) }
                    }
                }
                @Suppress("DEPRECATION")
                override fun onCharacteristicChanged(connection: BluetoothGatt, characteristic: BluetoothGattCharacteristic) {
                    characteristic.value?.let { receive(it) }
                }
                override fun onCharacteristicChanged(connection: BluetoothGatt, characteristic: BluetoothGattCharacteristic, value: ByteArray) {
                    receive(value)
                }
                override fun onDescriptorWrite(connection: BluetoothGatt, descriptor: BluetoothGattDescriptor, statusCode: Int) {
                    if (statusCode == BluetoothGatt.GATT_SUCCESS) mainHandler.post { status = "Connected; waiting for the first real heart-rate packet…" }
                }
            }, BluetoothDevice.TRANSPORT_LE)
        } catch (_: SecurityException) {
            status = "Android Bluetooth permission is needed to connect."
        } catch (error: Exception) {
            status = "Could not connect: ${error.message ?: "device error"}"
        }
    }

    DisposableEffect(Unit) {
        onDispose {
            try { scanCallback?.let { adapter?.bluetoothLeScanner?.stopScan(it) } } catch (_: Exception) {}
            try { gatt?.disconnect(); gatt?.close() } catch (_: Exception) {}
        }
    }

    Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel),
        shape = RoundedCornerShape(14.dp), modifier = Modifier.fillMaxWidth().border(1.dp, AppColors.line, RoundedCornerShape(14.dp))) {
        Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("Smartwatch connection", color = AppColors.txt, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                Spacer(Modifier.weight(1f))
                Text(if (liveHr != null) watchSource else "SIMULATED", color = if (watchSource == "REAL BLE" && liveHr != null) AppColors.ok else AppColors.warn, fontSize = 9.sp, fontWeight = FontWeight.Bold)
            }
            Text("Bluetooth supplies heart rate only. Other patient readings stay simulated unless measured by their own devices.", color = AppColors.muted, fontSize = 10.sp)
            Text(status, color = if (liveHr != null) AppColors.ok else AppColors.muted, fontSize = 11.sp)
            if (liveHr != null) Text("Live heart rate: $liveHr bpm", color = AppColors.txt, fontSize = 20.sp, fontWeight = FontWeight.Bold)
            Row(horizontalArrangement = Arrangement.spacedBy(7.dp)) {
                Button(onClick = { requestScan() }, enabled = !scanning,
                    colors = ButtonDefaults.buttonColors(containerColor = AppColors.accent)) {
                    Text(if (scanning) "Scanning…" else "Scan for BLE watch", color = AppColors.bg, fontSize = 11.sp)
                }
                if (gatt != null) OutlinedButton(onClick = { try { gatt?.disconnect(); gatt?.close() } catch (_: Exception) {}; gatt = null; liveHr = null; watchSource = "SIMULATED"; onHeartRate(null, "SIMULATED"); status = "Disconnected; simulated dashboard data resumed." }) {
                    Text("Disconnect", color = AppColors.danger, fontSize = 11.sp)
                }
            }
            discovered.forEach { device ->
                Row(Modifier.fillMaxWidth().clip(RoundedCornerShape(8.dp)).background(AppColors.panel2).padding(horizontal = 9.dp, vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text(device.name ?: "Heart-rate device", color = AppColors.txt, fontSize = 11.sp, modifier = Modifier.weight(1f))
                    TextButton(onClick = { if (hasPermissions()) connect(device) else { scanAction.value = { connect(device) }; permissionLauncher.launch(requiredPermissions) } }) {
                        Text("Connect", color = AppColors.accent2, fontSize = 10.sp)
                    }
                }
            }
            HorizontalDivider(color = AppColors.line)
            Text("No compatible watch? Use a clearly simulated sample", color = AppColors.muted, fontSize = 10.sp)
            Slider(value = manualHr, onValueChange = { manualHr = it }, valueRange = 40f..180f)
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("$manualHr bpm · SIMULATED", color = AppColors.warn, fontSize = 10.sp, modifier = Modifier.weight(1f))
                TextButton(onClick = { liveHr = manualHr.toInt(); watchSource = "SIMULATED"; status = "SIMULATED manual demo reading; this is not a wearable packet."; onHeartRate(manualHr.toInt(), "SIMULATED") }) {
                    Text("Use demo reading", color = AppColors.accent2, fontSize = 10.sp)
                }
                TextButton(onClick = { liveHr = null; watchSource = "SIMULATED"; status = "No real watch connected. Dashboard vitals are simulated."; onHeartRate(null, "SIMULATED") }) {
                    Text("Clear", color = AppColors.muted, fontSize = 10.sp)
                }
            }
        }
    }
}

@Composable
fun Medicines(state: AppState) {
    var showAdd by remember { mutableStateOf(false) }
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Section("Medicines Schedule")
                Spacer(Modifier.weight(1f))
                TextButton(onClick = { showAdd = true }) { Text("+ Add", color = AppColors.accent) }
            }
            val medNote = if (state.dataSource == Repository.Source.SERVER)
                "Live from arohasetu.vercel.app • changes sync two ways"
            else "Offline: saved on this device only"
            Text(medNote, color = if (state.dataSource == Repository.Source.SERVER) AppColors.ok else AppColors.muted, fontSize = 11.sp)
        }
        items(state.meds()) { m ->
            Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel),
                shape = RoundedCornerShape(12.dp), modifier = Modifier.fillMaxWidth()) {
                Column(Modifier.padding(12.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(m.name, color = AppColors.txt, fontWeight = FontWeight.Bold)
                        Text("  ${m.dose}", color = AppColors.muted)
                        Spacer(Modifier.weight(1f))
                        TextButton(onClick = { state.removeMed(m.id) }) { Text("Delete", color = AppColors.danger) }
                    }
                    Text("${m.frequency} • Times: ${m.times.joinToString(", ")}", color = AppColors.accent2, fontSize = 12.sp)
                    Text(m.notes, color = AppColors.muted, fontSize = 12.sp)
                }
            }
        }
        if (showAdd) {
            item { AddMedDialog(state) { showAdd = false } }
        }
    }
}

@Composable
private fun AddMedDialog(state: AppState, onClose: () -> Unit) {
    var name by remember { mutableStateOf("") }
    var dose by remember { mutableStateOf("") }
    var freq by remember { mutableStateOf("daily") }
    var time by remember { mutableStateOf("08:00") }
    Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel),
        shape = RoundedCornerShape(14.dp), modifier = Modifier.fillMaxWidth().border(1.dp, AppColors.line, RoundedCornerShape(14.dp))) {
        Column(Modifier.padding(14.dp)) {
            Section("New medicine", AppColors.accent2)
            OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text("Name") }, singleLine = true, colors = fieldColors())
            OutlinedTextField(value = dose, onValueChange = { dose = it }, label = { Text("Dose (e.g. 10 mg)") }, singleLine = true, colors = fieldColors())
            OutlinedTextField(value = freq, onValueChange = { freq = it }, label = { Text("Frequency") }, singleLine = true, colors = fieldColors())
            OutlinedTextField(value = time, onValueChange = { time = it }, label = { Text("Time (HH:MM)") }, singleLine = true, colors = fieldColors())
            Spacer(Modifier.height(6.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(onClick = {
                    val pid = state.patients.firstOrNull()?.id ?: return@Button
                    state.addMed(Medication("MED-${System.currentTimeMillis()%100000}", pid, name.ifBlank { "Med" },
                        dose, freq, listOf(time), "Added on device"))
                    onClose()
                }, colors = ButtonDefaults.buttonColors(containerColor = AppColors.accent)) { Text("Save", color = AppColors.bg) }
                TextButton(onClick = onClose) { Text("Cancel", color = AppColors.muted) }
            }
        }
    }
}

@Composable
fun Alerts(state: AppState) {
    val alerts = state.alerts()
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Section("Alerts & Emergency Calls")
            Text("REAL auto-trigger + escalation logic • SIMULATED placement", color = AppColors.muted, fontSize = 11.sp)
        }
        if (alerts.isEmpty()) {
            item { Text("No active alerts.", color = AppColors.muted) }
        }
        items(alerts) { a ->
            val call = state.callFor(a)
            Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel2),
                shape = RoundedCornerShape(12.dp), modifier = Modifier.fillMaxWidth()
                    .border(1.dp, if (a.status == "danger") AppColors.danger else AppColors.warn, RoundedCornerShape(12.dp))) {
                Column(Modifier.padding(12.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(a.patientName, color = AppColors.txt, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                        Spacer(Modifier.weight(1f))
                        StatusBadge(a.status)
                    }
                    Text(a.message, color = AppColors.txt, fontSize = 12.sp)
                    Text("Metric: ${a.metric}", color = AppColors.muted, fontSize = 11.sp)
                    Spacer(Modifier.height(8.dp))
                    Text("Emergency call chain", color = AppColors.accent2, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    call.steps.forEach { s ->
                        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(vertical = 3.dp)) {
                            Text("•", color = stepColor(s.status), fontSize = 14.sp)
                            Spacer(Modifier.width(8.dp))
                            Column {
                                Text(s.label, color = AppColors.txt, fontSize = 12.sp)
                                Text(s.number, color = AppColors.muted, fontSize = 10.sp)
                            }
                            Spacer(Modifier.weight(1f))
                            Text(s.status.uppercase(), color = stepColor(s.status), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }
    }
}

private fun stepColor(status: String) = when (status) {
    "answered" -> AppColors.ok
    "skipped" -> AppColors.muted
    "dialing" -> AppColors.warn
    else -> AppColors.danger
}

@Composable
fun Ward(state: AppState) {
    val wardPatients = state.patients.filter { it.ward != null }
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Section("Virtual Ward — GB Pant Hospital, Port Blair")
            Text("Nurse-station view • priority queue", color = AppColors.muted, fontSize = 11.sp)
        }
        if (wardPatients.isEmpty()) {
            item { Text("This account has no ward beds assigned.", color = AppColors.muted) }
        }
        items(wardPatients) { p ->
            val r = state.reportOf(p)
            val status = worstStatus(r)
            val barColor = when (status) {
                "danger" -> AppColors.danger
                "caution" -> AppColors.warn
                else -> AppColors.ok
            }
            val hrMap = r["hr"] as? Map<*, *> ?: mapOf("value" to "--")
            val spo2Map = r["spo2"] as? Map<*, *> ?: mapOf("value" to "--")
            val sbpMap = r["sbp"] as? Map<*, *> ?: mapOf("value" to "--")
            val dbpMap = r["dbp"] as? Map<*, *> ?: mapOf("value" to "--")
            Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel),
                shape = RoundedCornerShape(12.dp), modifier = Modifier.fillMaxWidth()
                    .border(2.dp, barColor, RoundedCornerShape(12.dp))) {
                Column(Modifier.padding(14.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Card(colors = CardDefaults.cardColors(containerColor = barColor.copy(alpha = 0.18f)),
                            shape = RoundedCornerShape(20.dp)) {
                            Text(status.uppercase(), color = barColor, fontSize = 10.sp, fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp))
                        }
                        Spacer(Modifier.weight(1f))
                        Text(p.ward ?: "", color = AppColors.accent2, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                    Spacer(Modifier.height(4.dp))
                    Text(p.name, color = AppColors.txt, fontSize = 15.sp, fontWeight = FontWeight.Bold)
                    Text("${p.condition} • ${p.age} yrs • ${p.location ?: ""}", color = AppColors.muted, fontSize = 11.sp)
                    Spacer(Modifier.height(6.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        MetricChip("HR", hrMap["value"]?.toString() ?: "--")
                        MetricChip("SpO2", spo2Map["value"]?.toString()?.plus("%") ?: "--")
                        MetricChip("BP", "${sbpMap["value"] ?: "--"}/${dbpMap["value"] ?: "--"}")
                    }
                }
            }
        }
        item {
            Text("REGION: ${DemoData.REGION} • Reachable hospital: GB Pant Hospital", color = AppColors.warn, fontSize = 11.sp)
        }
    }
}

private fun worstStatus(r: Map<String, Any>): String {
    var w = "normal"
    for (m in listOf("hr", "spo2", "bp", "temp", "glucose")) {
        val s = r[m]
        val status = if (s is Map<*, *>) (s["status"] as? String) else s as? String
        if (status == "danger") return "danger"
        if (status == "caution") w = "caution"
    }
    return w
}

@Composable
fun Camera(state: AppState) {
    val zones = state.zones
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Section("Privacy-First Camera Zones")
            Text("No video recorded or stored • on-device Prajñā only (SIMULATED)", color = AppColors.muted, fontSize = 11.sp)
        }
        zones.forEach { z ->
            item { CameraCard(state, z) }
        }
        item {
            val note = if (state.dataSource == Repository.Source.SERVER)
                "Live data from arohasetu.vercel.app — falls back to on-device engine when offline."
            else "OFFLINE: local on-device engine (no internet needed)."
            Text(note, color = if (state.dataSource == Repository.Source.SERVER) AppColors.ok else AppColors.warn, fontSize = 11.sp)
        }
    }
}

@Composable
private fun CameraCard(state: AppState, zone: CameraZone) {
    val now = state.tick
    val frame = CameraZoneEngine.liveFrame(zone.id, if (now > 0) now else System.currentTimeMillis())
    Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel),
        shape = RoundedCornerShape(12.dp), modifier = Modifier.fillMaxWidth()) {
        Column(Modifier.padding(12.dp)) {
            Text(zone.name, color = AppColors.txt, fontWeight = FontWeight.Bold)
            Text(zone.room, color = AppColors.muted, fontSize = 12.sp)
            Spacer(Modifier.height(8.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(if (frame.person) "Person present" else "No person",
                    color = if (frame.person) AppColors.ok else AppColors.muted, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                Spacer(Modifier.width(12.dp))
                Text("Motion ${(frame.motion * 100).toInt()}%", color = AppColors.muted, fontSize = 12.sp)
                Spacer(Modifier.width(12.dp))
                Text("Lighting: ${frame.lighting}", color = AppColors.muted, fontSize = 12.sp)
            }
            Spacer(Modifier.height(8.dp))
            Box(Modifier.fillMaxWidth().height(70.dp).background(Color(0xFF0A0F18), RoundedCornerShape(8.dp)),
                contentAlignment = Alignment.Center) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("PRIVACY-SAFE VIEW", color = AppColors.accent2, fontSize = 11.sp, fontWeight = FontWeight.Bold)
                    Text("On-device metadata only — no video", color = AppColors.muted, fontSize = 9.sp)
                }
            }
        }
    }
}

private fun metricLabel(m: String): String = when (m) {
    "hr" -> "HR"
    "spo2" -> "SpO2"
    "sbp" -> "SYS BP"
    "dbp" -> "DIA BP"
    "temp" -> "Temp"
    "glucose" -> "Glucose"
    else -> m
}

@Composable
fun Devices(state: AppState) {
    val groups = state.deviceGroups()
    val catalogue = state.deviceCatalogue()
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Section("Medical Devices")
            val srcNote = if (state.dataSource == Repository.Source.SERVER)
                "Live from arohasetu.vercel.app" else "OFFLINE: local catalogue (FDA/CDSCO approved)"
            Text(srcNote, color = if (state.dataSource == Repository.Source.SERVER) AppColors.ok else AppColors.muted, fontSize = 11.sp)
            Text("SIMULATED connectivity • REAL device profiles & approvals", color = AppColors.muted, fontSize = 11.sp)
        }
        if (groups.isNotEmpty()) {
            items(groups) { g ->
                Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel),
                    shape = RoundedCornerShape(14.dp), modifier = Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(12.dp)) {
                        Text("${g.patientName} — Connected Devices", color = AppColors.txt, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                        val online = g.devices.count { it.connected }
                        Text("${g.devices.size} devices · $online online", color = AppColors.muted, fontSize = 11.sp)
                        Spacer(Modifier.height(6.dp))
                        g.devices.forEach { d -> DeviceRow(d) }
                        if (g.devices.isEmpty()) {
                            Text("No devices connected.", color = AppColors.muted, fontSize = 12.sp)
                        }
                    }
                }
            }
        } else {
            item { Text("No devices for this account.", color = AppColors.muted) }
        }
        item {
            Spacer(Modifier.height(4.dp))
            Section("Supported Device Catalogue", AppColors.accent2)
            Text("${catalogue.size} medical-grade devices (all FDA/CDSCO/CE approved)", color = AppColors.muted, fontSize = 11.sp)
        }
        items(catalogue) { c ->
            Card(colors = CardDefaults.cardColors(containerColor = AppColors.panel2),
                shape = RoundedCornerShape(12.dp), modifier = Modifier.fillMaxWidth()) {
                Column(Modifier.padding(12.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(c.name, color = AppColors.txt, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                        Spacer(Modifier.weight(1f))
                        if (c.madeInIndia) {
                            Card(colors = CardDefaults.cardColors(containerColor = AppColors.ok.copy(alpha = 0.15f)),
                                shape = RoundedCornerShape(20.dp)) {
                                Text("IN", color = AppColors.ok, fontSize = 9.sp, fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(horizontal = 7.dp, vertical = 2.dp))
                            }
                        }
                    }
                    Text("${c.manufacturer} · ${c.approval}", color = AppColors.muted, fontSize = 11.sp)
                    if (c.priceINR.isNotBlank() && c.priceINR != "0") {
                        Text("\u20B9${c.priceINR.toIntOrNull()?.let { it } ?: c.priceINR}",
                            color = AppColors.accent2, fontSize = 13.sp, fontWeight = FontWeight.Bold)
                    }
                    if (c.measures.isNotEmpty()) {
                        Row(horizontalArrangement = Arrangement.spacedBy(5.dp), modifier = Modifier.padding(top = 5.dp)) {
                            c.measures.take(4).forEach { m ->
                                Text(metricLabel(m), color = AppColors.accent2, fontSize = 9.sp,
                                    modifier = Modifier.background(AppColors.line, RoundedCornerShape(4.dp))
                                        .padding(horizontal = 6.dp, vertical = 2.dp))
                            }
                        }
                    }
                    if (c.description.isNotBlank()) {
                        Text(c.description, color = AppColors.muted, fontSize = 11.sp, modifier = Modifier.padding(top = 5.dp))
                    }
                }
            }
        }
        item {
            Text("In production these connect via BLE/WiFi to real hardware — here connectivity is SIMULATED.",
                color = AppColors.warn, fontSize = 10.sp)
        }
    }
}

@Composable
private fun DeviceRow(d: com.arohasetu.app.network.Sync.ServerDevice) {
    val dot = if (d.connected) AppColors.ok else AppColors.danger
    val badgeTxt = if (d.connected) "CONNECTED" else "DISCONNECTED"
    val badgeColor = if (d.connected) AppColors.ok else AppColors.danger
    Column(Modifier.fillMaxWidth().padding(vertical = 6.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(Modifier.size(10.dp).background(dot, RoundedCornerShape(20.dp)))
            Spacer(Modifier.width(8.dp))
            Text(d.name, color = AppColors.txt, fontSize = 12.sp, fontWeight = FontWeight.Bold)
            Spacer(Modifier.weight(1f))
            Card(colors = CardDefaults.cardColors(containerColor = badgeColor.copy(alpha = 0.12f)),
                shape = RoundedCornerShape(20.dp)) {
                Text(badgeTxt, color = badgeColor, fontSize = 9.sp, fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(horizontal = 7.dp, vertical = 2.dp))
            }
        }
        Text("${d.manufacturer} · ${d.approval}", color = AppColors.muted, fontSize = 10.sp)
        Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(top = 3.dp)) {
            Box(Modifier.width(60.dp).height(6.dp).background(AppColors.line, RoundedCornerShape(3.dp))) {
                Box(Modifier.width((d.battery.coerceIn(0, 100) * 0.60).dp).height(6.dp)
                    .background(if (d.battery > 20) AppColors.ok else AppColors.danger, RoundedCornerShape(3.dp)))
            }
            Spacer(Modifier.width(6.dp))
            Text("${d.battery}%", color = AppColors.muted, fontSize = 10.sp)
            Spacer(Modifier.width(10.dp))
            Text("${d.secondsSinceLastSeen}s ago", color = AppColors.muted, fontSize = 10.sp)
        }
    }
}
