// main.js

// ----------------------------------------------------
// ATENÇÃO: POR FAVOR, COLOQUE SUA CHAVE DE API AQUI!
//
// SUBSTITUA 'COLOQUE_SUA_CHAVE_AQUI' pela sua chave real,
// mantendo as aspas.
// ----------------------------------------------------
const apiKey = 'AIzaSyDE15OWDlj-EMQmtn6xm6J_DsvCf7y__ho';

/**
 * Função assíncrona para buscar dados de uma API usando a chave fornecida.
 */
async function fetchData() {
    // Verifica se a chave de API foi inserida.
    // Se a chave ainda for o placeholder, exibe a mensagem de erro.
    if (apiKey === 'AIzaSyDE15OWDlj-EMQmtn6xm6J_DsvCf7y__ho') {
        document.getElementById('result').textContent = 'Erro: Por favor, insira sua chave de API no arquivo main.js.';
        return;
    }
    
    // Este é um URL de exemplo. Você deve substituí-lo pelo URL da API que
    // você quer usar. O `key=${apiKey}` é um exemplo de como passar a chave
    // na URL. Isso pode variar dependendo da API.
    const apiUrl = `https://exemplo-api.com/dados?key=${apiKey}`;

    // Atualiza a interface do usuário para mostrar que a busca está em andamento.
    document.getElementById('result').textContent = 'Buscando dados...';

    try {
        // Realiza a requisição usando `fetch`.
        const response = await fetch(apiUrl);
        
        // Se a resposta não for OK, lança um erro.
        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }

        // Converte a resposta para JSON.
        const data = await response.json();
        
        // Exibe os dados formatados na interface.
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);

    } catch (error) {
        // Captura e exibe erros de conexão ou da API.
        document.getElementById('result').textContent = `Falha ao buscar os dados: ${error.message}`;
        console.error('Erro:', error);
    }
}

// Adiciona um listener de evento ao botão com ID "fetchButton".
document.getElementById('fetchButton').addEventListener('click', fetchData);
