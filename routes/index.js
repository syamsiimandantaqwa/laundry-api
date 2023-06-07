const express = require("express");
const router = express.Router();
const { checkDuplicateUser } = require("../db/middleware/verifyUser");
const { verifyToken } = require("../db/middleware/verifyToken");
const { isAdmin, isAdminOrEmployee, isCustomer } = require("../db/middleware/verifyRole");
const { register, login, logout, getAllCustomers, addEmployee, getAllEmployees } = require("../db/controllers/user.controller.js");
const { getServices, addService, updateService, deleteService } = require("../db/controllers/service.controller.js")
const { addOrder, getOrderByUserId, getAllOrders, orderConfirm } = require("../db/controllers/order_book.controller.js");
const { getActivities } = require("../db/controllers/logs.controller.js");

// user model
router.post("/sign-up", checkDuplicateUser, register); // daftar
router.post("/sign-in", login); // masuk
router.get("/logout", [verifyToken], logout) // keluar
router.get("/customers", [verifyToken, isAdminOrEmployee], getAllCustomers); // list pelanggan
router.get("/employees", [verifyToken, isAdmin], getAllEmployees); // list pegawai
router.post("/employees", [verifyToken, isAdmin], addEmployee); // tambah pegawai berdasarkan email
// service model
router.get("/services", [verifyToken], getServices); // mengambil semua data layanan yang ada
router.post("/services", [verifyToken, isAdmin], addService); // menambah layanan baru
router.put("/services/:serviceId", [verifyToken, isAdmin], updateService); // mengupdate layanan 
router.delete("/services/:serviceId", [verifyToken, isAdmin], deleteService); // menghapus layanan
// order book  & detail transaction model
router.post("/order", [verifyToken, isCustomer], addOrder); // membuat pesanan
router.get("/order/list", [verifyToken, isAdminOrEmployee], getAllOrders); // melihat daftar seluruh pesanan
router.get("/order/:userId", verifyToken, getOrderByUserId); // mendapatkan pesanan dari seorang pelanggan
router.get("/order/:orderId", [verifyToken, isCustomer], orderConfirm); // konfirmasi pesanan jika pesanan sudah selesai di proses
router.get("/recent-activity", [verifyToken, isCustomer], getActivities); // mendapatkan seluruh log aktivitas

module.exports = router;