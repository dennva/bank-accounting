document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const years = parseInt(document.getElementById('years').value);
    
    const interestRate = 0.10; // 10% per tahun
    const totalMonths = years * 12;
    
    // Hitung total angsuran bulanan yang tetap
    const monthlyInterestRate = interestRate / 12;
    const monthlyInstallment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
    
    // Tentukan tanggal mulai dan tanggal jatuh tempo
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setFullYear(startDate.getFullYear() + years);

    // Menampilkan hasil dalam tabel
    const resultTableBody = document.querySelector('#resultTable tbody');
    resultTableBody.innerHTML = ''; // Reset tabel

    let remainingLoan = amount; // Sisa pinjaman yang belum dibayar
    for (let i = 1; i <= totalMonths; i++) {
        // Hitung bunga untuk bulan ini berdasarkan sisa pinjaman
        const interestPayment = remainingLoan * monthlyInterestRate;
        
        // Angsuran pokok = total angsuran - bunga
        const principalPayment = monthlyInstallment - interestPayment;
        
        // Kurangi sisa pinjaman dengan angsuran pokok
        remainingLoan -= principalPayment;

        // Tentukan tanggal mulai dan jatuh tempo tiap bulan
        const monthStartDate = new Date(startDate);
        monthStartDate.setMonth(startDate.getMonth() + i - 1);
        const monthEndDate = new Date(monthStartDate);
        monthEndDate.setMonth(monthStartDate.getMonth() + 1);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${monthStartDate.toLocaleDateString()}</td>
            <td>${monthEndDate.toLocaleDateString()}</td>
            <td>Rp ${principalPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td>Rp ${interestPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td>Rp ${monthlyInstallment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        `;
        
        resultTableBody.appendChild(row);
    }
});
