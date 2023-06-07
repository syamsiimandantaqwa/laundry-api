const TransactionDetail = require("../models").transaction_detail;

const transactionDetail = async (req, id) => {
	const { tgl_pengambilan, tgl_pengembalian, alamat, no_hp } = req.body;

	try {
		await TransactionDetail.create({
			id_pesanan: id,
			alamat,
			no_hp,
			status: "di proses",
			tgl_pengembalian,
			tgl_pengambilan,
		})
	} catch (err) {
		console.log(err)
	}

}

module.exports = {
	transactionDetail
}