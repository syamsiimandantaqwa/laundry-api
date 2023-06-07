Laundry API
===

sebuah api yang di tujukan untuk seorang developer yang ingin mengembangkan aplikasi laundry untuk kebutuhan bisnis

> instalasi  :

1. ubah `.env.example` ke `.env`
2. jalankan perintah `npm install`
3. buat dulu database `laundry_api`
4. jalankan perintah `npm run migrate` untuk migrasi
5. jalankan perintah `npm run seed` untuk menambahkan sedikit data dummy yang telah saya berikan

> daftar endpoint :

| endpoint | method | role | keterangan |
| --------- | :-----: | :----: | --------|
| `/sign-up` | POST | - | daftar |
| `/sign-in` | POST | - | masuk |
| `/logout` | GET | - | keluar |
| `/customers` | GET | admin,pegawai | mendapatkan seluruh data pelanggan |
| `/emplooyes` | GET | admin | daftar seluruh pegawai |
| `/emplooyes` | POST | admin | menambah pegawai |
| `/services`  | GET | - |  list seluruh layanan yang ada |
| `/services` | POST | admin | menambah layanan baru |
| `/services/:serviceId` | PUT | admin | mengubah layanan yang sudah ada |
| `/services/:serviceId` | DELETE | admin | menghapus data layanan |
| `/order` | POST | pelanggan | membuat pesanan baru |
| `/order/list` | GET | admin,pegawai | mendapatkan seluruh daftar pesanan |
| `/order/list?status=selesai` | GET | admin,pegawai | mendapatkan seluruh daftar pesanan yang statusnya selesai|
| `/order/:userId` | GET | - | mendapatkan data pesanan dari seorang pengguna |
| `order/:orderId` | GET | pelanggan | jika pesanan pelanggan telah di kerjakan, maka pelanggan bisa melakukan konfirmasi lewat endpoint ini |
| `/recent-activity ` | GET | pelanggan | melihat seluruh log aktivitas |      

