async function exibirImagemPersonagem(nome) {
    try {

        const resposta = await fetch('https://hp-api.onrender.com/api/characters');
        const personagens = await resposta.json();

        const personagemEncontrado = personagens.find(personagem => 
            personagem.name.toLowerCase() === nome.toLowerCase()
        );

        // Container da imagem
        const container = document.getElementById('imagemPersonagem');
        container.innerHTML = '';

        if (personagemEncontrado && personagemEncontrado.image) {
            const urlImagem = personagemEncontrado.image;
            
            // Criando elemento de imagem
            const imgElement = document.createElement('img');
            imgElement.src = urlImagem;
            imgElement.alt = personagemEncontrado.name;

            imgElement.className = 'img-fluid rounded';

            container.appendChild(imgElement);
        } else {
            container.innerHTML = '<p class="text-danger">Nenhum personagem encontrado com esse nome ou sem imagem disponível.</p>';
        }
    } catch (erro) {
        console.error('Erro ao buscar personagens:', erro);
    }
}

document.getElementById('btnBuscar').addEventListener('click', () => {
    const nomePersonagem = document.getElementById('nome-personagem').value.trim();
    if (nomePersonagem) {
        exibirImagemPersonagem(nomePersonagem);
    }
});
