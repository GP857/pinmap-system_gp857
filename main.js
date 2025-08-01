// main.js

// --- LOCAL ONDE VOCÊ INSERE A CHAVE DE API ---
// Substitua o texto 'SUA_CHAVE_DE_API_AQUI' pela sua chave real.
// Certifique-se de que a chave permaneça entre aspas!
const apiKey = 'AIzaSyDE15OWDlj-EMQmtn6xm6J_DsvCf7y__ho'; // Exemplo: Substitua este texto pela sua chave!

/**
 * Função assíncrona para buscar dados de uma API usando a chave fornecida.
 */
async function fetchData() {
    // Verifica se a chave de API foi inserida
    if (apiKey === 'AIzaSyDE15OWDlj-EMQmtn6xm6J_DsvCf7y__ho') {
        document.getElementById('result').textContent = 'Erro: Por favor, insira sua chave de API no arquivo main.js.';
        return;
    }
    
    // Exemplo de URL de API com a chave como parâmetro.
    // A forma correta de usar a chave (na URL, no cabeçalho, etc.)
    // depende da API específica que você está utilizando.
    const apiUrl = `https://exemplo-api.com/dados?key=${AIzaSyDE15OWDlj-EMQmtn6xm6J_DsvCf7y__ho}`;

    // Atualiza a interface do usuário para mostrar que a busca está em andamento.
    document.getElementById('result').textContent = 'Buscando dados...';

    try {
        // Realiza a requisição fetch.
        const response = await fetch(apiUrl);
        
        // Lança um erro se a resposta não for bem-sucedida (status code 4xx ou 5xx).
        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }

        // Converte o corpo da resposta para o formato JSON.
        const data = await response.json();
        
        // Exibe os dados JSON formatados na interface do usuário.
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);

    } catch (error) {
        // Captura e exibe qualquer erro que ocorra durante a requisição.
        document.getElementById('result').textContent = `Falha ao buscar os dados: ${error.message}`;
        console.error('Erro:', error);
    }
}

// Adiciona um evento de clique ao botão com o ID "fetchButton".
// Quando o botão é clicado, a função fetchData é executada.
document.getElementById('fetchButton').addEventListener('click', fetchData);
