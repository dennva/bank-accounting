function calculate() {
    // Ambil data dari input
    const amount = parseFloat(document.getElementById("amount").value);
    const rate = parseFloat(document.getElementById("rate").value) / 100;
    const time = parseInt(document.getElementById("time").value);

    // Validasi input
    if (isNaN(amount) || isNaN(rate) || isNaN(time)) {
        alert("Harap isi semua kolom dengan benar.");
        return;
    }

    // Perhitungan deposito
    const grossInterest = (amount * rate * time) / 12;
    const tax = grossInterest * 0.20; // Pajak bunga deposito 20%
    const netInterest = grossInterest - tax;
    const totalAmount = amount + netInterest;

    // Tampilkan hasil
    const resultText = `
        Bunga Bersih: Rp${netInterest.toLocaleString()}<br>
        Total Dana: Rp${totalAmount.toLocaleString()}
    `;
    document.getElementById("result").innerHTML = resultText;
}
