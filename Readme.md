📈 ALUR KERJA LOGIC BACKEND SPK KARYAWAN ELECTRE

1. User Management & Data Dasar
   Admin bisa menambah/ubah/hapus user (karyawan dan admin).

Setiap user punya username, nama, password (hashed), dan role.

2. Input Data Penilaian
   Absensi: karyawan absen harian; data masuk ke tabel absensi.

Hasil Kerja: karyawan input hasil kerja harian; data ke tabel hasil_kerja.

Reject: input produk cacat oleh karyawan; data ke tabel reject.

Kuisioner:

Attitude: atasan nilai bawahan (1x/tahun), ke tabel kuisioner_attitude.

Kerjasama: rekan nilai rekan (1x/tahun), ke tabel kuisioner_kerjasama.

3. Kriteria & Sub Kriteria
   Admin bisa kelola kriteria (kriteria) & sub kriteria (sub_kriteria), beserta bobot dan range skornya.

4. Mapping ke Nilai Alternatif
   Nilai mentah dari absensi, hasil kerja, reject, kuisioner, dsb. di-mapping ke skor 1–5 (sesuai sub_kriteria).

Admin/manual (atau helper script) masukkan skor ini ke tabel nilai_alternatif:

Field: user_id, kriteria_id, nilai (1–5), periode (misal "2024")

5. Proses ELECTRE (Ranking)
   Endpoint /api/electre/hitung:

Ambil semua nilai_alternatif per user, per kriteria, per periode.

Normalisasi matrix (sesuai rumus ELECTRE).

Kali dengan bobot kriteria (dari tabel kriteria).

Hitung skor total (atau, jika mau, lanjut sampai concordance/discordance matrix).

Urutkan karyawan berdasarkan skor.

Output: ranking final, skor tiap karyawan, siap untuk diumumkan.

6. Flow Kerja (Diagram Singkat)
   pgsql
   Copy
   Edit
   [User/Admin]
   |
   v
   [Input Data Harian] --> [Tabel Absensi/Hasil Kerja/Reject/Kuisioner]
   |
   v
   [Admin mapping nilai ke Nilai Alternatif (per kriteria, per user, per periode)]
   |
   v
   [API ELECTRE] --proses ranking--> [Output: Ranking Karyawan]
7. Endpoint Utama
   Auth:
   /api/auth/register, /api/auth/login

User:
/api/users (GET, PUT, DELETE)

Absensi:
/api/absensi (CRUD)

Hasil Kerja:
/api/hasil-kerja (CRUD)

Reject:
/api/reject (CRUD)

Kriteria & Sub Kriteria:
/api/kriteria, /api/sub_kriteria

Kuisioner:
/api/kuisioner/attitude, /api/kuisioner/kerjasama

Nilai Alternatif:
/api/nilai_alternatif (CRUD)

ELECTRE:
/api/electre/hitung (POST, output ranking)

8. Catatan Logic
   Security: Semua endpoint sensitif sebaiknya hanya bisa diakses jika login (JWT).

Role: API update user, kriteria, mapping nilai, sebaiknya dibatasi hanya untuk admin.

Data Integrity: Satu user hanya boleh punya 1 entry nilai alternatif per kriteria per periode.

Frontend nanti tinggal konsumsi API ini untuk input data, lihat ranking, dsb.
