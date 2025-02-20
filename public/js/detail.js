document.addEventListener('DOMContentLoaded', () => {
    const quantity = document.getElementById('quantity');
    const price = parseFloat(document.getElementById('price').textContent);
    const total = document.getElementById('total');

    function updateTotal() {
        const qty = parseInt(quantity.value) || 0;
        total.textContent = (price * qty).toFixed(2);
    }

    quantity.addEventListener('input', updateTotal);
    updateTotal();
});