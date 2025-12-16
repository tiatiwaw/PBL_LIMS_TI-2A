# LIMS Laboo - Laboratory Information Management System

<p align="center">
  <strong>Sistem Informasi Manajemen Laboratorium</strong><br>
  <em>PBL TI-2A | Tahun 2025</em>
</p>

---

## 📋 Daftar Isi
1. [Tentang Project](#tentang-project)
2. [Stack Teknologi](#stack-teknologi)
3. [Fitur Utama](#fitur-utama)
4. [Struktur Database](#struktur-database)
5. [Roles & Permissions](#roles--permissions)
6. [Panduan Penggunaan Per Role](#panduan-penggunaan-per-role)
7. [Installation & Setup](#installation--setup)
8. [API Documentation](#api-documentation)

---

## 📌 Tentang Project

### Deskripsi Produk
**LIMS Laboo** adalah sebuah **Laboratory Information Management System** (LIMS) yang dirancang untuk mengelola seluruh operasional laboratorium secara efisien dan terorganisir. Sistem ini memungkinkan:

- **Manajemen Order**: Klien dapat membuat dan melacak pesanan analisis sampel
- **Manajemen Sampel**: Pencatatan detail spesimen yang akan dianalisis
- **Manajemen Analis**: Penugasan dan tracking pekerjaan tim laboratorium
- **Manajemen Inventori**: Pencatatan peralatan, reagen, dan resource laboratorium
- **Quality Control**: Validasi hasil pengujian dan quality assurance
- **Reporting**: Pembuatan laporan terperinci dalam format PDF dan Excel
- **Payment Management**: Integrasi pembayaran dengan Tripay untuk transaksi online

### Target User
- **Laboratorium Profesional**: Mengelola proses testing dan quality control
- **Klien Eksternal**: Melakukan ordering dan pembayaran analisis
- **Tim Internal**: Admin, Supervisor, Manager, Analyst, dan Staff

### Tujuan
Meningkatkan efisiensi operasional laboratorium, akurasi data, dan kepuasan pelanggan melalui sistem informasi yang terintegrasi dan user-friendly.

---

## 🛠️ Stack Teknologi

| Layer | Teknologi |
|-------|-----------|
| **Backend** | Laravel 11 (PHP 8.2+) |
| **Frontend** | React 18 + Inertia.js |
| **Styling** | Tailwind CSS 3 |
| **Database** | MySQL 8.0+ |
| **Authentication** | Laravel Sanctum (API Token) |
| **Authorization** | Spatie Permission & Roles |
| **PDF Generation** | DomPDF |
| **Payment Gateway** | Tripay API |
| **Session Management** | Database-driven Sessions |
| **Build Tool** | Vite + Vite Laravel Plugin |

---

## ✨ Fitur Utama

### 1. **Manajemen Order** 📦
- Membuat order/pesanan analisis sampel
- Tipe order: Regular, Urgent, Internal, External
- Tracking status order real-time
- Upload dan download laporan
- Integrasi payment gateway

**Status Order:**
- `received` - Order baru dibuat oleh client
- `disapproved` - Order ditolak oleh supervisor
- `pending_payment` - Menunggu pembayaran
- `paid` - Pembayaran sukses
- `in_progress` - Dalam proses pengujian
- `received_test` - Pengujian selesai (QC)
- `revision_test` - Uji ulang diperlukan
- `pending` - Menunggu approval laporan
- `completed` - Order selesai

### 2. **Manajemen Sampel** 🧪
- Registrasi sampel dengan detail spesimen
- Kategorisasi sampel berdasarkan jenis
- Tracking volume dan kondisi sampel
- Riwayat pengujian sampel

### 3. **Manajemen Analis** 👨‍🔬
- Database analis/laboratorium staff
- Sertifikasi dan pelatihan
- Penugasan ke order tertentu
- Tracking performa analis

### 4. **Manajemen Inventori** 📊
- Equipment/Alat laboratorium
- Reagen dan bahan kimia
- Reference Standards
- Supplier dan vendor management
- Status tracking (tersedia/rusak/maintenance)

### 5. **Quality Control & Validation** ✓
- Validasi hasil pengujian oleh supervisor
- Repeat test jika diperlukan
- Compliance checking
- Documentation

### 6. **Reporting** 📄
- Laporan order PDF
- Laporan analisis sampel
- Report inventory & equipment
- Report performa analis & user
- Export data ke Excel
- Custom report filtering

### 7. **Admin Dashboard** 📈
- KPI monitoring
- Analytics & insights
- User management
- Master data management
- System configuration

### 8. **Payment Integration** 💳
- Integrasi Tripay payment gateway
- Order payment tracking
- Invoice generation
- Transaction history

---

## 🗂️ Struktur Database

### Tabel Utama:
```
users                           - User account (Admin, Analyst, Client, Supervisor, Manager, Staff)
clients                         - Data klien/pelanggan
orders                          - Order/pesanan analisis
samples                         - Data sampel/spesimen
analysts                        - Data analis/laboratorium staff
equipments                      - Data peralatan laboratorium
reagents                        - Data reagen/bahan kimia
test_methods                    - Metode pengujian yang tersedia
test_parameters                 - Parameter/indikator pengujian
analyses_methods                - Kombinasi test method + parameters
training                        - Data training analis
certificates                    - Sertifikasi analis
transactions                    - Transaksi pembayaran
n_order_samples                 - Relasi many-to-many: Order ↔ Sample
n_parameter_methods             - Relasi many-to-many: Parameter ↔ Method
n_analyses_methods_orders       - Relasi many-to-many: Analysis Method ↔ Order
n_reagents                      - Relasi many-to-many: Order ↔ Reagent
n_training_analysts             - Relasi many-to-many: Training ↔ Analyst
n_equipments                    - Relasi many-to-many: Order ↔ Equipment
n_analysts                      - Relasi many-to-many: Order ↔ Analyst
```

---

## 👥 Roles & Permissions

### 1. **Admin** 🔐
**Deskripsi:** Pengelola sistem dengan akses penuh
- Manajemen user (create, read, update, delete)
- Master data management (metode, parameter, supplier, etc)
- Konfigurasi sistem
- View semua data & reports

### 2. **Supervisor** 👔
**Deskripsi:** Pimpinan lab yang manage order & quality control
- Menerima & meninjau order dari client
- Assign analis ke order
- Validasi hasil pengujian (QC)
- Approve/reject order
- Manage equipment allocation

### 3. **Manager** 📋
**Deskripsi:** Manajer yang handle inventory & approval akhir
- Approve laporan final dari supervisor
- Manajemen inventori (equipment, reagent)
- Supplier management
- Generate reports
- Employee performance tracking

### 4. **Analyst** 🧑‍🔬
**Deskripsi:** Laboratorium staff yang melakukan pengujian
- View assigned orders
- Input hasil pengujian
- Submit test results
- View performance metrics
- Access training materials

### 5. **Staff** 📝
**Deskripsi:** Administrative staff
- Create & manage orders
- Register samples
- Client management
- Input order details
- Cannot approve/validate

### 6. **Client** 🛍️
**Deskripsi:** Customer eksternal
- Create order/request testing
- View order status
- Pay invoices
- Download reports
- View order history

---

## 🚀 Panduan Penggunaan Per Role

### CLIENT FLOW - Cara Klien Menggunakan Sistem

#### **Step 1: Registration & Login**
```
1. Buka halaman login (localhost:8000/login)
2. Klik "Register" untuk membuat akun baru
3. Isi form: Nama, Email, Password
4. Verifikasi email
5. Login dengan credentials yang sudah dibuat
```

#### **Step 2: Create Order**
```
1. Navigasi ke halaman "Orders" → "Create New Order"
2. Isi detail order:
   - Pilih tipe order (regular/urgent)
   - Masukkan judul order
   - Set tanggal estimasi selesai
3. Klik "Next" untuk tambah sampel
```

#### **Step 3: Register Samples**
```
1. Klik "Add Sample"
2. Isi detail sampel:
   - Pilih kategori sampel
   - Masukkan volume/jumlah
   - Masukkan keterangan (kondisi, penyimpanan, dll)
3. Pilih test methods yang diinginkan
4. Klik "Save Sample"
5. Repeat untuk sampel lainnya
```

#### **Step 4: Select Analysis Methods**
```
1. Review semua sampel yang sudah didaftarkan
2. Pilih metode analisis untuk setiap sampel
3. Lihat harga estimasi
4. Klik "Submit Order"
```

#### **Step 5: Payment**
```
1. Order akan status "pending_payment"
2. Klik "Pay Invoice"
3. Pilih payment method (e-wallet, transfer bank, dll via Tripay)
4. Selesaikan transaksi
5. Tunggu konfirmasi pembayaran (auto atau manual by admin)
```

#### **Step 6: Track & Receive Results**
```
1. Di halaman "Order History", monitor status order
2. Supervisor akan assign analis setelah payment dikonfirmasi
3. Tunggu pengujian selesai
4. Supervisor melakukan QC
5. Manager approve laporan final
6. Laporan siap download dalam format PDF
```

#### **Client Features:**
- ✅ View all orders & status
- ✅ Download test reports (PDF)
- ✅ View payment history
- ✅ Upload signatures on reports
- ✅ Get notifications on order updates
- ✅ Chat/contact support

---

### STAFF FLOW - Cara Staff/Admin Operasional Bekerja

#### **Step 1: Access Dashboard**
```
1. Login dengan akun Staff
2. Dashboard menampilkan:
   - Pending orders
   - Client management
   - Sample registrations
```

#### **Step 2: Create Order (Admin Role)**
```
1. Navigasi ke "Orders" → "New Order"
2. Pilih client dari dropdown
3. Isi order details:
   - Tipe order
   - Judul order
   - Estimasi selesai
4. Klik "Create Order"
```

#### **Step 3: Register Samples**
```
1. Dalam order detail, klik "Add Sample"
2. Isi form:
   - Kategori sampel
   - Volume sampel
   - Kondisi/keterangan spesial
3. Pilih metode analisis yang diperlukan
4. Klik "Save Sample"
```

#### **Step 4: Manage Clients**
```
1. Menu "Clients" → "Manage Clients"
2. Create new client:
   - Nama perusahaan
   - Kontact person
   - Alamat & kontak
   - PIC (Point of Contact)
3. Edit/Delete existing clients
```

#### **Staff Features:**
- ✅ Create & manage orders
- ✅ Register & track samples
- ✅ Manage client database
- ✅ Input order information
- ✅ View pending tasks
- ❌ Cannot approve/validate

---

### SUPERVISOR FLOW - Cara Supervisor Manage Quality Control

#### **Step 1: Review Pending Orders**
```
1. Login dengan akun Supervisor
2. Dashboard menampilkan:
   - Pending approval orders
   - Orders ready for testing
   - Completed tests needing QC
```

#### **Step 2: Approve/Reject Order**
```
1. Menu "Orders" → "Pending Review"
2. Klik order untuk detail
3. Review:
   - Client info
   - Sample details
   - Analysis methods
4. Tombol action:
   - "Approve" - lanjut ke assign analyst
   - "Reject" - kembalikan ke staff dengan alasan
```

#### **Step 3: Assign Analysts**
```
1. Pada order yang approved, klik "Assign Analysts"
2. Input detail parameters yang akan diuji
3. Pilih analyst untuk setiap parameter:
   - Lihat availability
   - Check sertifikasi analyst
4. Set timeline pengujian
5. Klik "Submit & Notify Analysts"
```

#### **Step 4: Quality Control (QC) Process**
```
1. Ketika analyst submit hasil, status = "received_test"
2. Menu "Orders" → "QC Review"
3. Untuk setiap hasil pengujian:
   - Review data accuracy
   - Check compliance
   - Verify methodology
4. Tombol action:
   - "Validate Test" - hasil OK, lanjut ke manager
   - "Repeat Test" - hasil error, uji ulang
```

#### **Step 5: Generate & Review Reports**
```
1. Setelah all tests validated, status = "pending"
2. Menu "Reports" → "Generate Report"
3. System automatically creates PDF report
4. Review & sign off report
5. Submit ke Manager untuk final approval
```

#### **Supervisor Features:**
- ✅ Approve/reject orders
- ✅ Assign analysts to tasks
- ✅ Perform quality control
- ✅ Validate test results
- ✅ Generate & sign reports
- ✅ View all order status
- ✅ Equipment allocation
- ✅ Notifications & alerts

---

### MANAGER FLOW - Cara Manager Approve & Generate Reports

#### **Step 1: Monitor Dashboard**
```
1. Login dengan akun Manager
2. Dashboard KPI:
   - Total orders completed
   - Pending approval reports
   - Inventory status
   - Top clients & analysts
```

#### **Step 2: Review & Approve Reports**
```
1. Menu "Reports" → "Pending Approval"
2. Klik report untuk review:
   - Lihat hasil pengujian
   - Lihat supervisor QC notes
   - Lihat methodology
3. Tombol action:
   - "Approve & Issue" - finalize report
   - "Reject & Request Revision" - kembalikan ke supervisor
```

#### **Step 3: Inventory Management**
```
1. Menu "Inventory" → "Equipment"
   - View all equipment
   - Check status (available/broken/maintenance)
   - Add new equipment
   - Update stock & condition

2. Menu "Inventory" → "Reagents"
   - View reagent stock
   - Track usage
   - Request reordering
   - Manage expiry dates

3. Menu "Supplier Management"
   - Manage vendor data
   - Track orders
   - Compare pricing
```

#### **Step 4: Generate Analytics Reports**
```
1. Menu "Reports" → "Analytics"
2. Generate reports:
   - Orders report (status distribution, volume)
   - Users report (analyst performance, client ranking)
   - Inventory report (equipment status, reagent usage)
3. Export to Excel/PDF
4. Set date range & filters
5. Download or email report
```

#### **Step 5: Employee Management**
```
1. Menu "Employees"
2. View analyst performance:
   - Number of tests completed
   - Quality metrics
   - Certifications & trainings
3. Update training records
4. Track certifications expiry
```

#### **Manager Features:**
- ✅ Approve final reports
- ✅ Inventory management (equipment, reagents, suppliers)
- ✅ Generate analytics & KPI reports
- ✅ Employee performance tracking
- ✅ View business metrics
- ✅ System configuration
- ✅ Dashboard analytics

---

### ANALYST FLOW - Cara Analis Melakukan Pengujian

#### **Step 1: Check Assigned Tasks**
```
1. Login dengan akun Analyst
2. Dashboard menampilkan:
   - Assigned orders
   - Samples to test
   - Deadlines
```

#### **Step 2: View Sample Details**
```
1. Menu "Tasks" → "My Assignments"
2. Klik order untuk detail:
   - Sample information
   - Analysis methods
   - Parameter to test
   - Equipment available
3. Review supervisor notes & requirements
```

#### **Step 3: Perform Testing**
```
1. Menu "My Tasks" → "Current Tests"
2. Untuk setiap sample:
   - Record test date & time
   - Equipment used
   - Reagent batch numbers
   - Test conditions
```

#### **Step 4: Input Test Results**
```
1. Klik "Add Test Result"
2. Isi form:
   - Parameter tested
   - Measurement value
   - Unit
   - Reference range
   - Notes/observations
   - Attachments (charts, images)
3. Klik "Save Result"
```

#### **Step 5: Submit for QC**
```
1. Review all results
2. Klik "Submit to QC"
3. Tunggu supervisor validation
4. Jika rejected, revise & resubmit
5. Jika approved, task completed
```

#### **Analyst Features:**
- ✅ View assigned orders & samples
- ✅ Input test results & data
- ✅ Upload attachments (charts, images)
- ✅ View quality control feedback
- ✅ Update my profile & signature
- ✅ View certifications & training
- ✅ Performance dashboard
- ✅ Notifications

---

### ADMIN FLOW - Cara Admin Setup & Configure Sistem

#### **Step 1: User Management**
```
1. Menu "Admin" → "Users"
2. Create new user:
   - Nama & email
   - Role (Admin, Supervisor, Manager, Analyst, Staff, Client)
   - Assign permissions
3. Edit user:
   - Change role
   - Update credentials
   - Reset password
4. View user activity log
```

#### **Step 2: Master Data Management**

**Test Methods:**
```
1. Menu "Admin" → "Test Methods"
2. Create/Edit methods:
   - Nama metode
   - Deskripsi
   - Standards (ISO, ASTM, dll)
   - Equipment required
```

**Test Parameters:**
```
1. Menu "Admin" → "Parameters"
2. Create/Edit parameters:
   - Nama parameter
   - Unit pengukuran
   - Reference range
   - Test methods yang applicable
```

**Sample Categories:**
```
1. Menu "Admin" → "Sample Categories"
2. Create categories:
   - Water, Soil, Air, Chemical, Food, etc
   - Storage requirements
   - Handling procedures
```

**Suppliers:**
```
1. Menu "Admin" → "Suppliers"
2. Create/Edit supplier:
   - Nama perusahaan
   - Kontak
   - Produk (Equipment/Reagent)
   - Harga & terms
```

**Equipment:**
```
1. Menu "Admin" → "Equipment"
2. Register equipment:
   - Model & brand
   - Serial number
   - Purchase date
   - Calibration schedule
   - Status
```

**Reagents:**
```
1. Menu "Admin" → "Reagents"
2. Add reagent:
   - Nama kimia
   - Supplier
   - Batch number
   - Expiry date
   - Quantity & unit
```

#### **Step 3: Training & Certification**
```
1. Menu "Admin" → "Training"
2. Create training programs:
   - Judul training
   - Deskripsi
   - Target analyst
3. Create certificates:
   - Nama sertifikasi
   - Issued date
   - Expiry date
   - Link to analyst
```

#### **Step 4: System Configuration**
```
1. Menu "Admin" → "Settings"
2. Configure:
   - Company info
   - Payment settings (Tripay keys)
   - Email settings (SMTP)
   - Session timeout
   - Report templates
```

#### **Step 5: Reports & Logs**
```
1. Menu "Admin" → "Activity Logs"
2. View system activity:
   - User login/logout
   - Data changes
   - Report generation
3. Export audit trail
```

#### **Admin Features:**
- ✅ Complete user management
- ✅ Master data configuration
- ✅ System settings & configuration
- ✅ Training & certification management
- ✅ Activity logs & audit trail
- ✅ Payment gateway setup
- ✅ Email templates
- ✅ System monitoring

---

## 💾 Installation & Setup

### Prerequisites
```
- PHP 8.2 atau lebih tinggi
- Composer
- Node.js & npm
- MySQL 8.0 atau lebih tinggi
```

### Step 1: Clone & Install Dependencies
```bash
# Clone repository
git clone <repository-url>
cd PBL_LIMS_TI-2A

# Install PHP dependencies
composer install

# Install Node dependencies
npm install
```

### Step 2: Environment Setup
```bash
# Copy .env.example ke .env
cp .env.example .env

# Generate app key
php artisan key:generate

# Edit .env dan set database credentials:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lims_pbl_2025
DB_USERNAME=root
DB_PASSWORD=
```

### Step 3: Database Setup
```bash
# Run migrations
php artisan migrate

# Run seeders (untuk dummy data)
php artisan db:seed

# Atau seed specific seeder
php artisan db:seed --class=DatabaseSeeder
```

### Step 4: File Storage Setup
```bash
# Create storage links
php artisan storage:link

# Set storage permissions
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

### Step 5: Run Application
```bash
# Terminal 1: Laravel backend
php artisan serve

# Terminal 2: Vite frontend dev server
npm run dev

# Atau jalankan keduanya bersamaan (jika tersedia npm script):
npm run serve
```

### Step 6: Access Application
```
Backend API: http://localhost:8000
Frontend: http://localhost:5173 (atau sesuai Vite)
```

### Login Credentials (Dari Seeder)
```
Admin:
Email: admin@example.com
Password: password

Supervisor:
Email: supervisor@example.com
Password: password

Staff:
Email: staff@example.com
Password: password

Analyst:
Email: analyst@example.com
Password: password

Manager:
Email: manager@example.com
Password: password

Client:
Email: client@example.com
Password: password
```

---

## 🔌 API Documentation

### Authentication

**POST** `/api/v1/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password"
}
```
Response: `{ "token": "...", "user": {...} }`

**POST** `/api/v1/auth/logout`
Requires: Sanctum token

---

### Orders API

#### Client Operations
- **GET** `/api/v1/client/orders` - List my orders
- **GET** `/api/v1/client/orders/{id}` - Order detail
- **POST** `/api/v1/client/orders` - Create order
- **PUT** `/api/v1/client/orders/{id}` - Update order
- **DELETE** `/api/v1/client/orders/{id}` - Cancel order

#### Staff Operations
- **GET** `/api/v1/staff/orders` - List orders
- **POST** `/api/v1/staff/orders` - Create order
- **POST** `/api/v1/staff/orders/samples` - Add sample

#### Supervisor Operations
- **GET** `/api/v1/supervisor/orders` - List pending orders
- **PUT** `/api/v1/supervisor/orders/{id}/approve` - Approve order
- **PUT** `/api/v1/supervisor/orders/{id}/reject` - Reject order
- **POST** `/api/v1/supervisor/orders/{id}/parameters/submit` - Assign analysts

---

### Samples API

- **GET** `/api/v1/client/orders/{orderId}/samples` - List samples
- **POST** `/api/v1/staff/orders/samples` - Register sample
- **PUT** `/api/v1/staff/orders/samples/{id}` - Update sample
- **DELETE** `/api/v1/staff/orders/samples/{id}` - Delete sample

---

### Profile API

- **GET** `/api/v1/profile/{userId}` - Get profile
- **PUT** `/api/v1/profile/update/{userId}` - Update profile
- **PUT** `/api/v1/profile/change-password/{userId}` - Change password
- **POST** `/api/v1/profile/upload-signature` - Upload signature

---

### Admin API

- **GET** `/api/v1/admin/users` - List users
- **POST** `/api/v1/admin/users` - Create user
- **PUT** `/api/v1/admin/users/{id}` - Update user
- **GET** `/api/v1/admin/test-methods` - List test methods
- **GET** `/api/v1/admin/parameters` - List parameters
- **GET** `/api/v1/admin/equipment` - List equipment
- **GET** `/api/v1/admin/reagents` - List reagents

---

### Reports API

- **GET** `/api/v1/admin/reports/orders` - Orders report
- **GET** `/api/v1/manager/reports/analytics` - Analytics report
- **GET** `/api/v1/manager/reports/inventory` - Inventory report
- **GET** `/orders/download-report/{id}` - Download order report (PDF)

---

### Payment API

- **POST** `/api/v1/payment/create-transaction` - Create payment
- **POST** `/api/v1/payment/callback` - Payment webhook callback
- **GET** `/api/v1/client/transactions` - View transactions

---

## 📚 Project Structure

```
PBL_LIMS_TI-2A/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── API/V1/          # API Controllers per role
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/                  # Eloquent Models (Order, User, Sample, dll)
│   ├── Services/                # Business logic (ReportGeneratorService, dll)
│   └── Providers/
├── database/
│   ├── migrations/              # Database schema
│   ├── seeders/                 # Dummy data seeders
│   └── factories/               # Model factories
├── resources/
│   ├── js/                      # React components & pages
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components per role
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API service calls
│   │   ├── utils/               # Utility functions
│   │   └── data/                # Mock/demo data
│   ├── css/                     # Global styles
│   └── views/                   # Blade templates
├── routes/
│   ├── api.php                  # API routes (v1)
│   ├── web.php                  # Web routes
│   └── auth.php                 # Auth routes
├── config/
│   ├── app.php
│   ├── database.php
│   ├── permission.php           # Spatie permission config
│   ├── tripay.php               # Payment gateway config
│   └── ...
├── storage/                     # File storage (PDFs, reports, signatures)
├── tests/                       # Unit & Feature tests
└── public/                      # Public assets

```

---

## 🔐 Security Features

- ✅ **Authentication**: Laravel Sanctum token-based API authentication
- ✅ **Authorization**: Spatie Permission & Roles (role-based access control)
- ✅ **CSRF Protection**: CSRF tokens untuk web requests
- ✅ **Password Hashing**: Bcrypt hashing (12 rounds)
- ✅ **SQL Injection Prevention**: Eloquent ORM parameterized queries
- ✅ **XSS Prevention**: React auto-escaping & CSRF tokens
- ✅ **File Upload Security**: Validated file types & size limits
- ✅ **Session Security**: Database-driven sessions
- ✅ **Payment Security**: Encrypted Tripay API keys in .env

---

## 📊 Database Relationships

```
User (1) ─── (M) Order
         ├── (M) Client (jika role = Client)
         └── (M) Analyst (jika role = Analyst)

Order (1) ─── (M) Sample via n_order_samples
      ├── (M) AnalysesMethod via n_analyses_methods_orders
      ├── (M) Reagent via n_reagents
      ├── (M) Equipment via n_equipments
      └── (M) Analyst via n_analysts

Sample (1) ─── (M) SampleCategory
       └── (M) TestParameter via n_parameter_methods

TestMethod (M) ─── (M) TestParameter via n_parameter_methods

Analyst (M) ─── (M) Training via n_training_analysts
       ├── (M) Certificate
       └── (M) Order via n_analysts
```

---

## 🎯 Key Features Summary

| Fitur | Client | Staff | Analyst | Supervisor | Manager | Admin |
|-------|--------|-------|---------|------------|---------|-------|
| Create Order | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Register Sample | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View Results | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Input Test Data | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Quality Control | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Approve Report | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage Inventory | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Generate Reports | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| User Management | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| System Config | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Payment | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 📝 Development Notes

### Conventions Used
- **Database**: Snake case (order_date, client_id)
- **Code**: Camel case (orderDate, clientId)
- **Routes**: Kebab case (/api/v1/test-methods)
- **Components**: Pascal case (OrderCard.jsx, UserForm.jsx)
- **Hooks**: camelCase prefixed with 'use' (useOrder, useAuth)

### Naming Conventions for Pivot Tables
Pivot tables menggunakan prefix `n_` dan nama diurutkan secara alfabetis:
- `n_order_samples` - Order ↔ Sample
- `n_parameter_methods` - TestParameter ↔ TestMethod
- `n_analyses_methods_orders` - AnalysesMethod ↔ Order

---

## 🤝 Contributing

Untuk development, ikuti guidelines:
1. Create branch baru dari `main`: `git checkout -b feature/nama-fitur`
2. Commit dengan message yang jelas
3. Push dan buat Pull Request
4. Request review sebelum merge

---

## 📞 Support & Contact

- **Project Lead**: [TI-2A Team]
- **Documentation**: Check repository wiki
- **Issues**: Report via GitHub Issues

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

**Last Updated**: December 2025
**Version**: 1.0.0 Beta
**Status**: In Development**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
