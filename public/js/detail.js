document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const quantityInput = document.getElementById('quantity'); // Campo de quantidade
    const priceElement = document.getElementById('price'); // Elemento que exibe o preço unitário
    const totalElement = document.getElementById('total'); // Elemento que exibe o total
    const buyButton = document.getElementById('buyButton'); // Botão de compra

    // Converte o preço unitário para número
    const price = parseFloat(priceElement.textContent);

    // Função para atualizar o total
    function updateTotal() {
        const quantity = parseInt(quantityInput.value) || 0; // Pega a quantidade ou usa 0 se for inválido
        const total = price * quantity; // Calcula o total
        totalElement.textContent = total.toFixed(2); // Atualiza o valor exibido
    }

    // Atualiza o total quando o valor da quantidade muda
    quantityInput.addEventListener('input', updateTotal);

    // Atualiza o total ao carregar a página
    updateTotal();

    // Botão de Comprar
    buyButton.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value) || 0;
        if (quantity > 0) {
            alert(`Compra de ${quantity} pacote(s) realizada com sucesso!`);
            // Aqui você pode adicionar a lógica para enviar os dados para o backend
        } else {
            alert('Selecione uma quantidade válida.');
        }
    });
});