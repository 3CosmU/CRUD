
$(function () {
    $(".mascara").maskMoney({
        prefix: 'R$ ',
        allowNegative: true,
        thousands: '.',
        decimal: ','
    });
});


function Adicionar() {
    /* Pegar valores dos campos */
    var codigoInput = document.getElementById("codigo").value;
    var nomeInput = document.getElementById("nome").value;
    var precoInput = document.getElementById("preco").value;

    /*  Validação, serve pra validar 3 campos,codigoInput, nomeInput, precoInput 
     (a validação é o processo de verificar se os dados que você recebe (seja de um usuário, de um arquivo, de um banco de dados, etc.) estão corretos e seguem as regras que você definiu. É como um porteiro que verifica se as pessoas que querem entrar em um prédio têm permissão e se comportam de acordo com as regras do local) */


    precoInput = parseFloat(precoInput);
    if (isNaN(precoInput) || precoInput <= 0) { }


    var tabela = document.getElementById("tabelaProdutos");
    var linha = tabela.insertRow();

    /* Nova celula para os vbotoes */
    var celulaCodigo = linha.insertCell();
    var celulaNome = linha.insertCell();
    var celulaPreco = linha.insertCell();
    var celulaAcoes = linha.insertCell();
    celulaCodigo.textContent = codigoInput;
    celulaNome.textContent = nomeInput;
    celulaPreco.textContent = precoInput.toFixed(2);

    /* Adiciona os botões na célula de ações editar/excluir */
    celulaAcoes.innerHTML = `
       <button class="btn btn-warning btn-sm editar">Editar</button>
        <button class="btn btn-danger btn-sm excluir">Excluir</button>
    `;


    /* Event listener para os botões  */
    var tabelaProdutos = document.getElementById('tabelaProdutos');

    tabelaProdutos.addEventListener('click', (event) => {
        if (event.target.classList.contains('excluir')) {
            const linha = event.target.closest('tr');
            linha.remove();
        } else if (event.target.classList.contains('editar')) {
            const linha = event.target.closest('tr');
            const celulas = linha.querySelectorAll('td');

            /* Extrai os dados da linha(O código extrai dados de células de uma linha de tabela HTML.) */
            const codigo = celulas[0].textContent;
            const nome = celulas[1].textContent;
            const preco = celulas[2].textContent;

            /*  Substitui as células por campos de texto */
            celulas[0].innerHTML = `<input type="text" value="${codigo}">`;
            celulas[1].innerHTML = `<input type="text" value="${nome}">`;
            celulas[2].innerHTML = `<input type="text" value="${preco}">`;

            /* Adiciona botão Salva depois que termina a edicao */
            celulas[3].innerHTML = '<button class="btn btn-success btn-sm salvar">Salvar</button>';
        } else if (event.target.classList.contains('salvar')) {
            const linha = event.target.closest('tr');
            const celulas = linha.querySelectorAll('td');

            /* Colocar os novos valores editados */
            const novoCodigo = celulas[0].querySelector('input').value;
            const novoNome = celulas[1].querySelector('input').value;
            const novoPreco = celulas[2].querySelector('input').value;

            /* atualizar a lista com os valores novos qye foram editados */
            celulas[0].textContent = novoCodigo;
            celulas[1].textContent = novoNome;
            celulas[2].textContent = novoPreco;

            /*  Reseta os botoes editar e excluir */
            celulas[3].innerHTML = `
                <button class="btn btn-warning btn-sm editar">Editar</button>
                <button class="btn btn-danger btn-sm excluir">Excluir</button>
            `;
        }
    });
}