Laundry API
===

sebuah api yang di tujukan untuk seorang developer yang ingin mengembangkan aplikasi laundry untuk kebutuhan bisnis

> **instalasi :** 

1. ubah `.env.example` ke `.env`
2. jalankan perintah `npm install`
3. buat dulu database `laundry_api`
4. jalankan perintah `npm run migrate` untuk migrasi
5. jalankan perintah `npm run seed` untuk menambahkan sedikit data dummy yang telah saya berikan

> **daftar endpoint :**

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

> **body request untuk method PUT dan POST :**

1. `/sign-up` :

```javascript
{
	"nama": "udin",
	"email": "udin@gmail.com",
	"password": "udin"
}
```

2. `/sign-in` :

```javascript
{
	"email": "admin@gmail.com",
	"password": "admin"
}

//  Note : saya telah membuat beberapa akun yang bisa di pakai seperti admin dengan email 'admin@gmail.com' dan pw admin begitu juga dengan yang lainnya 
```

3. `/employees` :

```javascript
{
	"nama": "jhondoe", // nama pegawai baru
	"email": "jhondoe@gmail.com"
}

// NOTE : 
// - pastikan bahwa pegawai harus memiliki akun terlebih dahulu dengan cara mendaftar terlebih dahulu
// - kemudian request ke endpoint ini dengan email yang sudah terdaftar tadi untuk mengubah akun tersebut menjadi pegawai
```

4. `/services` :

```javascript 
{
	"nama_layanan": "kiloan",
	"harga": 20000, // harga per kg maksudnya
	"keterangan": "silahkan tambahkan keterangan untuk layanan ini"
}
```

5. `/services/:serviceId` (PUT) :

```javascript 
{
	"nama_layanan": "kiloan edit",
	"harga": 10000,
	"keterangan": "silahkan tambahkan keterangan untuk layanan ini"
}
```

6. `/order` :

```javascript 
{
	"id_layanan": 2,
	"total": 3,
	"no_hp": "08637338",
	"alamat": "jalan doang jadian kagak",
	"tgl_pengambilan": "2023-06-12",
	"tgl_pengembalian": "2023-06-13"
}
```