# ระบบจัดการถังขยะอัจฉริยะ - Angular + Firebase

แอปพลิเคชัน Angular ที่เชื่อมต่อ Firebase Realtime Database สำหรับติดตามและจัดการถังขยะอัจฉริยะแบบ Real-time พร้อมบันทึกข้อมูลเซ็นเซอร์

> ✨ **เวอร์ชัน 2.0**: ระบบสมบูรณ์พร้อม Real-time Dashboard, Luxury UI Design, และบันทึกเซ็นเซอร์ที่ครอบคลุม

---

## 🚀 คุณสมบัติหลัก

### 📊 Luxury Dashboard
- **Hero Metrics Section**: แสดง 3 เมตริกหลัก
  - 🌡️ Temperature (อุณหภูมิ) - Thermometer visualization 0-100°C
  - 💧 Humidity (ความชื้น) - Circular progress ring 0-100%
  - 📦 Fill Level (ระดับเต็ม) - Circular progress ring 0-100%
- **Real-time Updates**: ข้อมูลอัปเดตทันที่ไม่ต้องรีเฟรช
- **Luxury Design**: Deep black gradient background (#0f0f0f → #1a1a2e), neon green accents (#00FF66), glassmorphism effects

### 🗑️ Bin Management
- **Visual Bin Display**: กราฟิกถังขยะแบบ Visual ที่สวยงาม
  - ปริมาณแสดงเป็นการเติมจากล่างขึ้นบน
  - สีเปลี่ยนตามระดับ:
    - 🟢 เขียว (0-59%): ว่าง
    - 🟡 เหลือง (60-79%): ใกล้เต็ม
    - 🔴 แดง (80-100%): เต็มเกือบเต็ม
- **CRUD Operations**: เพิ่ม แก้ไข ลบ ถังขยะ
- **Quick Update Buttons**: +10L, -10L, Empty All

### 📋 Sensor Data Logging
- บันทึกข้อมูลเซ็นเซอร์แบบ Real-time:
  - ID, Humidity (%), Temperature (°C), Fill Level (%), Timestamp
- ตารางแสดงประวัติข้อมูลล่าสุด
- อัปเดตอัตโนมัติจาก Firebase

### 🎨 Modern UI/UX
- **Responsive Design**: ทำงานบนทุกหน้าจอ
- **Glassmorphism**: Semi-transparent cards ด้วย blur effects
- **Dark Theme**: Deep black gradient พร้อมเนื่อนแอคเซ็นต์
- **Smooth Animations**: Transitions และ glows effects
- **Mobile Friendly**: ปรับขนาดอัตโนมัติบนอุปกรณ์เล็ก

---

## 📋 ข้อกำหนดเบื้องต้น

- **Node.js** (v18 หรือสูงกว่า) - [ดาวน์โหลด](https://nodejs.org/)
- **npm** (มาพร้อม Node.js)
- **Firebase Account** พร้อม Realtime Database

---

## 🔥 Firebase Structure

### Database Collections/Paths

```
/bin
  ├── humidity: 65.5
  ├── temperature: 28.3
  ├── volume: 45.0
  └── lastUpdated: timestamp

/sensor_data_log
  ├── log_1
  │   ├── id: 1
  │   ├── humidity: 65.5
  │   ├── temperature: 28.3
  │   ├── fill_level: 45.0
  │   └── timestamp: 2025-12-05T09:30:00Z
  └── ...
```

---

## ⚙️ Setup & Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd Project-Em-main
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase (`src/environments/environment.ts`)
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
  }
};
```

### 4. Start Development Server
```bash
npm start
```
Open `http://localhost:4200` in your browser.

### 5. Build for Production
```bash
npm run build
```
Output: `dist/` directory

---

## 📁 Project Structure

```
src/
├── app/
│   ├── app.component.ts          # Main component
│   ├── app.component.html        # Main template
│   ├── app.component.css         # Main styles (luxury design)
│   ├── app.module.ts             # Module definition
│   ├── firebase.service.ts       # Firebase operations
│   ├── trash-bin.service.ts      # Bin data management
│   └── logs/
│       ├── logs.component.ts     # Sensor logs display
│       ├── logs.component.html
│       └── logs.component.css
├── environments/
│   └── environment.ts            # Firebase config
├── index.html
├── main.ts
└── styles.css                    # Global styles + gradient background
```

---

## 🎯 Usage Guide

### View Dashboard
- ทันทีที่เปิดแอป ข้อมูลเซ็นเซอร์จะแสดงใน Hero Metrics
- ระดับของถังแสดงเป็นตัวเลขและกราฟิก

### Edit Bin Data
1. คลิกปุ่ม **"Edit"** บนแดชบอร์ด
2. แก้ไขค่า humidity, temperature, volume
3. คลิก **"Save"** เพื่ออัปเดต

### Quick Update
- **+10 L**: เพิ่มระดับขยะ 10 ลิตร
- **-10 L**: ลดระดับขยะ 10 ลิตร
- **Empty**: เทขยะออกหมด

### View Sensor Logs
- ตาราข้อมูลแสดงประวัติเซ็นเซอร์ 5 คอลัมน์:
  - ID, Humidity (%), Temperature (°C), Fill Level (%), Timestamp

---

## 🛠️ Technology Stack

- **Framework**: Angular 17+
- **Database**: Firebase Realtime Database
- **Real-time**: Firestore Listeners (on/off)
- **Styling**: CSS3 (Grid, Flexbox, Animations)
- **Language**: TypeScript
- **Build**: Angular CLI

---

## 🎨 Design System

### Color Palette
- **Primary**: Neon Green (#00FF66)
- **Background**: Deep Black Gradient (#0f0f0f → #1a1a2e → #0d1117)
- **Card**: Semi-transparent (#0a0a0a, 60% opacity)
- **Border**: Grey (#1a1a1a)

### Typography
- **Font Family**: Segoe UI
- **Headers**: Light weight (300), letter-spacing
- **Values**: Bold, neon glow
- **Labels**: Uppercase, subtle styling

### Spacing
- **Padding**: 40-60px for sections
- **Gap**: 40px between cards, 80px between sections
- **Margin**: Consistent 20px auto for small elements

---

## 📊 Real-time Features

- ✅ Auto-subscribe to `/bin` changes
- ✅ Auto-subscribe to `/sensor_data_log` updates
- ✅ Instant UI refresh on data change
- ✅ No page refresh needed
- ✅ Real-time metrics display

---

## 🐛 Troubleshooting

### Build Fails
```bash
npm install
npm run build
```

### Firebase Connection Issues
- ✅ ตรวจสอบ `environment.ts` configuration
- ✅ ตรวจสอบ Firebase rules ให้อ่าน/เขียนได้
- ✅ ตรวจสอบการเชื่อมต่อ Internet

### Data Not Updating
- ✅ ตรวจสอบ Console logs สำหรับ errors
- ✅ รีเฟรชหน้าบราวเซอร์
- ✅ ตรวจสอบ Firebase Realtime Database มีข้อมูลหรือไม่

---

## 📝 License

Project Em - Smart Waste Management System

---

## 🤝 Support

สำหรับคำถามหรือปัญหา โปรดติดต่อทีมพัฒนา

---

## ✨ Recent Updates (v2.0)

✅ Migrated from Cloud Firestore to Firebase Realtime Database
✅ Complete UI overhaul with luxury design
✅ Thermometer visualization for temperature
✅ Responsive dashboard with Hero Metrics
✅ Real-time sensor data logging
✅ Simplified logs table (sensor_data_log only)
✅ Glassmorphism effects with neon accents
✅ Smooth animations and transitions
2. **sensor_data_log** - ข้อมูลเซ็นเซอร์แบบ time-series (ความชื้น, อุณหภูมิ, ระดับการเต็ม, น้ำหนัก, ระดับก๊าซ)
3. **Devices** - ข้อมูลอุปกรณ์ IoT (DeviceID, BinID, DeviceName, DeviceType)

ดูรายละเอียด schema ใน [FIRESTORE_INTEGRATION.md](./FIRESTORE_INTEGRATION.md)

## 🛠️ การติดตั้ง

เปิด PowerShell และรันคำสั่ง:

```powershell
# ติดตั้ง dependencies (ครั้งแรกเท่านั้น)
npm install
```

## ▶️ การรันโปรเจ็กต์

```powershell
# เริ่มต้น development server
npm start
```

เว็บจะเปิดที่ `http://localhost:4200` โดยอัตโนมัติ

## 🌱 เพิ่มข้อมูลตัวอย่าง (Seed Data)

เปิดไฟล์นี้ในเบราว์เซอร์:

```
firebase-test-app/seed.html
```

จากนั้นกดปุ่ม:
- **ตรวจสอบข้อมูล** - ดูจำนวน documents ที่มีอยู่
- **เพิ่ม SmartBins** - สร้างถังขยะตัวอย่าง 5 ถัง
- **เพิ่ม Sensor Data** - เพิ่มข้อมูลเซ็นเซอร์ล่าสุด
- **เพิ่ม Devices** - เพิ่มอุปกรณ์ IoT ตัวอย่าง

ดูรายละเอียดเพิ่มเติมใน [SUMMARY.md](./SUMMARY.md)

## 📊 ข้อมูลตัวอย่าง

แอปมีข้อมูลถังขยะตัวอย่าง 6 ถัง:
- **ขยะเปียก:** 2 ถัง (ชั้น 1 โซนครัว, ชั้น 2 โซนพักผ่อน)
- **รีไซเคิล:** 2 ถัง (ชั้น 1 ทางเข้า, ชั้น 3 ห้องทำงาน)
- **ขยะทั่วไป:** 2 ถัง (ชั้น 2 ห้องประชุม, ชั้น 3 ห้องน้ำ)

แต่ละถังมีข้อมูล:
- ชื่อและประเภท
- สถานที่ตั้ง
- ความจุ (ลิตร)
- ปริมาตรปัจจุบัน
- เปอร์เซ็นต์การเต็ม
- เวลาอัปเดตล่าสุด

## 🎮 วิธีใช้งาน

### ดูสถานะถัง
1. ดูสรุปสถิติด้านบน (จำนวนถังและค่าเฉลี่ย)
2. กรองถังตามประเภทที่ต้องการ
3. ดูกราฟิกปริมาตรและเปอร์เซ็นต์

### เพิ่มถังใหม่
1. คลิกปุ่ม **"➕ เพิ่มถังขยะ"**
2. กรอกข้อมูล:
   - ชื่อถัง (เช่น "ถังขยะเปียก G")
   - เลือกประเภท (เปียก/รีไซเคิล/ทั่วไป)
   - สถานที่ (เช่น "ชั้น 4 - โรงอาหาร")
   - ความจุ (ลิตร)
   - ระดับปัจจุบัน
3. คลิก **"💾 บันทึก"**

### แก้ไขถัง
1. คลิกปุ่ม **✏️** บนการ์ดถัง
2. แก้ไขข้อมูลที่ต้องการ
3. คลิก **"💾 บันทึก"**

### อัปเดตระดับถังแบบด่วน
- **➕ +10L:** เพิ่มปริมาตร 10 ลิตร
- **➖ -10L:** ลดปริมาตร 10 ลิตร
- **🔄 เททิ้ง:** เทถังออกทั้งหมด (reset เป็น 0)

### ลบถัง
1. คลิกปุ่ม **🗑️** บนการ์ดถัง
2. ยืนยันการลบ

## 📂 โครงสร้างโปรเจ็กต์

```
project-em/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Logic หลัก + CRUD operations
│   │   ├── app.component.html     # Template (กราฟิกถัง + UI)
│   │   ├── app.component.css      # Component styles
│   │   └── app.module.ts          # Module configuration
│   ├── index.html                 # HTML หลัก
│   ├── main.ts                    # Entry point
│   └── styles.css                 # Global styles (bin graphics, animations)
├── angular.json                   # Angular configuration
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
└── README.md                      # เอกสารนี้
```

## 🎨 การปรับแต่ง

### เปลี่ยนสีตามประเภทถัง
แก้ไขใน `app.component.ts`:

```typescript
getBinTypeColor(type: string): string {
  const colors = { 
    wet: '#10b981',      // เขียว
    recycle: '#3b82f6',  // น้ำเงิน
    general: '#6b7280'   // เทา
  };
  return colors[type as keyof typeof colors] || '#6b7280';
}
```

### เปลี่ยนเกณฑ์สีตามเปอร์เซ็นต์
แก้ไขใน `app.component.ts`:

```typescript
getPercentageColor(percentage: number): string {
  if (percentage >= 80) return '#ef4444';  // แดง
  if (percentage >= 60) return '#f59e0b';  // เหลือง
  return '#10b981';                         // เขียว
}
```

### เพิ่มข้อมูลเริ่มต้น
แก้ไข method `loadMockData()` ใน `app.component.ts`

## 🌐 การ Build สำหรับ Production

```powershell
npm run build
```

ไฟล์ build จะอยู่ในโฟลเดอร์ `dist/mock-web-angular/`

## 💡 เทคโนโลยีที่ใช้

- **Angular 17:** Framework หลัก
- **TypeScript:** Type-safe programming
- **RxJS:** Reactive programming
- **CSS3:** Animations & responsive design
- **FormsModule:** Two-way data binding

## 🔧 การแก้ปัญหา

### ปัญหา: คำสั่ง `ng` ไม่สามารถใช้ได้
**วิธีแก้:** ใช้ `npm start` แทน หรือติดตั้ง Angular CLI แบบ global:

```powershell
npm install -g @angular/cli
```

### ปัญหา: Port 4200 ถูกใช้งานอยู่
**วิธีแก้:** ระบุ port อื่น:

```powershell
ng serve --port 4300
```

### ปัญหา: Animation ไม่แสดง
**วิธีแก้:** ตรวจสอบว่าไฟล์ `styles.css` ถูก load แล้วใน `angular.json`

## 📝 หมายเหตุ

- ข้อมูลถูกบันทึกใน **Firestore** แบบ persistent (ไม่หายหลังรีโหลด)
- ข้อมูลเซ็นเซอร์เก็บแบบ **time-series** (เพิ่มทุกครั้งที่มีการเปลี่ยนแปลง)
- การ "เพิ่ม/ลด/เททิ้ง" จะสร้าง **sensor_data_log** ใหม่พร้อม timestamp
- **BinID** auto-increment โดยสแกนหา max + 1
- ดูข้อมูล event_log, sensor_data_log, system_log ที่ส่วนล่างสุดของหน้าเว็บ

## 🚀 ไอเดียการพัฒนาต่อ

- [x] เชื่อมต่อกับ Firestore database
- [x] เขียนข้อมูลเซ็นเซอร์ (ความชื้น, อุณหภูมิ, ระดับการเต็ม, น้ำหนัก, ระดับก๊าซ)
- [x] รองรับประเภทถังขยะ (wet, recycle, general)
- [ ] แจ้งเตือนเมื่อถังเต็ม 90%
- [ ] กราฟแสดงแนวโน้มการเต็มของถัง (time-series chart)
- [ ] Export รายงานเป็น PDF/Excel
- [ ] PWA รองรับ offline mode
- [ ] เชื่อม IoT sensors แบบ real-time (MQTT/WebSocket)
- [ ] Dashboard สำหรับทีมงานจัดการขยะ

---

พัฒนาด้วย Angular 🅰️ | Smart Trash Management System 🗑️♻️
