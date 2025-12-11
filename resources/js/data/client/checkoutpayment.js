// data/client/checkoutpayment.js

const checkoutPayment = {
  qrImage: "/logo_payment/Alfamart.jpeg",

  // Countdown dummy (7 jam, 24 menit, 58 detik)
  countdown: {
    hours: 7,
    minutes: 24,
    seconds: 58,
  },

  // Informasi utama pesanan
  orderInfo: {
    tanggal: "11/26/2025",
    nomor_pesanan: "DICZV792",
    metode_pembayaran: "Alfamart",
    status: "Pending_payment",
  },

  // Detail Pembayaran
  detail: {
    judul: "Order kedua untuk client utama",
    nama_client: "Client Utama",
    tipe_pemesanan: "External",
    harga: "Rp 150.000",
    ppn: "Rp 16.500",
    admin: "Rp 2.000",
    total: "Rp 168.500",
  },
};

export default checkoutPayment;
