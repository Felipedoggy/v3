document.addEventListener('DOMContentLoaded', () => {
    const quantity = document.getElementById('quantity'); // Campo de quantidade
    const price = parseFloat(document.getElementById('price').textContent); // Preço unitário
    const total = document.getElementById('total'); // Elemento onde o total será exibido

    // Função para atualizar o total
    function updateTotal() {
        const qty = parseInt(quantity.value) || 0; // Pega a quantidade ou usa 0 se for inválido
        const calculatedTotal = price * qty; // Calcula o total
        total.textContent = calculatedTotal.toFixed(2); // Atualiza o valor exibido
    }

    // Atualiza o total quando o valor da quantidade muda
    quantity.addEventListener('input', updateTotal);

    // Atualiza o total ao carregar a página
    updateTotal();
});

const buyButton = document.getElementById('buyButton');
buyButton.addEventListener('click', () => {
    const qty = parseInt(quantity.value) || 0;
    if (qty > 0) {
        alert(`Compra de ${qty} pacote(s) realizada com sucesso!`);
        // Redirecionar para a página de confirmação ou enviar dados para o backend
    } else {
        alert('Selecione uma quantidade válida.');
    }
});


fetch(`/api/pacotes/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log('Detalhes do pacote:', data);
        // Atualize a página com os dados recebidos
    })
    .catch(error => console.error('Erro ao buscar pacote:', error));