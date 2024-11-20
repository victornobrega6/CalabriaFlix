/********************************************************************
 * Objetivo: Sistema de cadastro, edição, exclusão e listagem de livros
 * Data: 30/10/2024
 * Autor: Pedro Allison and Victor Nobrega
 * Versão: 1.0
 ********************************************************************/

//Receber o botão salvar do HTML
const botaoSalvar = document.getElementById('salvar')

// receber dados do formulario
const getDadosForm = function(){
    let filmeJSON = {}
    let status = true

    // recebe das caixas do html os dados a ser enviado para a api
    let nomeFilme           = document.getElementById('title')
    let imagemFilme         = document.getElementById('image')
    let sinopseFilme        = document.getElementById('sinopse')
    let valorFilme          = document.getElementById('price')


    if(nomeFilme.value == '' || imagemFilme.value == '' || sinopseFilme.value == '' || valorFilme == '') {
        alert('Todos os dados devem ser preenchidos.')
    } else {
        // cria o objeto JSON
        filmeJSON.nome = nomeFilme.value
        filmeJSON.image = imagemFilme.value
        filmeJSON.sinopse = sinopseFilme.value
        filmeJSON.valor = valorFilme.value
    }

    if(status){
        return filmeJSON
    }else{
        return false
    }

}


// função para salvar um novo filme
const postFilme = async function (dadosFilme){
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/novo/filme'

    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosFilme)
    })

    if(response.status == 201){
        alert('Registro inserido com sucesso.')
        getFilmes()
    }else{
        alert('Não foi possível inserir o filme, verifique os dados encaminhados.')
    }
    
}


// função para alterar um filme existente 
const putFilme = async function(dadosFilme) {
    let id = sessionStorage.getItem('idFilme')

    alert(id)
    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/atualizar/filme/${id}`

    let response = await fetch(url,{
        method: 'PUT',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosFilme)
    })

    if(response.status == 200){
        alert('Registro atualizado com sucesso.')
        getFilmes()
    }else{
        alert('Não foi possível atualizar o filme, verifique os dados encaminhados.')
    }
}

// função para excluir um filme
const deleteFilme = async function(id){
    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/excluir/filme/${id}`

    let response = await fetch(url, {
        method: 'DELETE'
    })

    if(response.status == 200){
        alert('Registro excluído com sucesso!')
        getFilmes()
    }else{
        alert('Não foi possível excluir o registro.')
    }

    console.log()
}

// função para listar todos os filmes
const getFilmes = async function(){
    // url da api
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/listar/filmes'

    // executa a url no servidor para trazer a lista de filmes
    let response = await fetch(url)

    // converte o retorno em json
    let dados = await response.json()

    // chama a função para criar a lista de livros
    setCardItens(dados)
}

// função para criar a lista de itens no html
const setCardItens = function(dadosFilme){
    // recebe a caixa principal onde será criado a lista de filmes
    let divCardFilme = document.getElementById('cardFilme')

    // limpa a lista de dados ante de carregar novamente
    divCardFilme.innerText = ''

    dadosFilme.filmes.forEach(function(filme){
        
        // cria os elementos html
        let divCaixaFilme = document.createElement('div')
        let h2CaixaTitulo = document.createElement('h2')
        let figureCaixaImagem = document.createElement('figure')
        let img = document.createElement('img')
        let h3CaixaSinopse = document.createElement('h3')
        let h3CaixaValor = document.createElement('h3')
        let divEditar = document.createElement('div')
        let spanEditar = document.createElement('span')
        let imgEditar = document.createElement('img')
        let divExcluir = document.createElement('div')
        let spanExcluir = document.createElement('span')
        let imgExcluir = document.createElement('img')

        // escrevendo os dados do array de filmes nos elementos hmtl
        let textoTitulo = document.createTextNode(filme.nome)
        let textoSinopse = document.createTextNode("Sinopse: "+filme.sinopse)
        let textoValor = document.createTextNode('Valor: '+filme.valor)

        // adiciona atributos nas tags hmtl
        divCaixaFilme.setAttribute('class', 'caixa-filme')
        h2CaixaTitulo.setAttribute('class', 'caixa-titulo')
        figureCaixaImagem.setAttribute('class', 'caixa-imagem')
        img.setAttribute('src', filme.image)
        img.setAttribute('alt', filme.nome)
        img.setAttribute('title', filme.nome)
        h3CaixaSinopse.setAttribute('class', 'caixa-sinopse')
        h3CaixaValor.setAttribute('class', 'caiva-valor')

        imgEditar.setAttribute('src', 'icones/editar.png')
        imgExcluir.setAttribute('src', 'icones/excluir.png')

        imgEditar.setAttribute('idLivro', filme.id)
        imgExcluir.setAttribute('idLivro', filme.id)

        // associa um elemto dentro de outro no html
        divCardFilme.appendChild(divCaixaFilme)
        divCaixaFilme.appendChild(h2CaixaTitulo)
        h2CaixaTitulo.appendChild(textoTitulo)
        divCaixaFilme.appendChild(figureCaixaImagem)
        figureCaixaImagem.appendChild(img)
        divCaixaFilme.appendChild(h3CaixaSinopse)
        h3CaixaSinopse.appendChild(textoSinopse)
        divCaixaFilme.appendChild(h3CaixaValor)
        h3CaixaValor.appendChild(textoValor)
        divCaixaFilme.appendChild(divEditar)
        divEditar.appendChild(spanEditar)
        spanEditar.appendChild(imgEditar)
        divCaixaFilme.appendChild(divExcluir)
        divExcluir.appendChild(spanExcluir)
        spanExcluir.appendChild(imgExcluir)
        
        // criando eventos de clicks para os elementos do excluir e editar
        imgExcluir.addEventListener('click', function(){
            let id = imgExcluir.getAttribute('idFilme')
            let resposta = confirm('Deseja realmente excluir o filme?')
            if(resposta){
                deleteFilme(id)
            }
        })
        

        //evento de click editar
        imgEditar.addEventListener('click', function(){
            // recebe id do livro
            let id = imgEditar.getAttribute('idFilme')

            getBuscarFilme(id)
            
        })
        

    })
}



// função para buscar um filme por id
const getBuscarFilme = async function(id) {
    let url = `https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/buscar/filme/${id}`

    let response = await fetch(url)

    let dados = await response.json()

    if(response.status == 200){
        // coloca os dados da api do formulario
        document.getElementById('title').value      = dados.filme[0].nome
        document.getElementById('sinopse').value    = dados.filme[0].sinopse
        document.getElementById('image').value      = dados.filme[0].image
        document.getElementById('price').value      = dados.filme[0].valor
        


        //Altera o texto do botão para a palavra Atualizar
        document.getElementById('salvar').innerText = 'Atualizar'

        //Guardando o ID do livro na área de sessão do navegador, para ser utilizado no put
        sessionStorage.setItem('idFilme',id)
    }
    

}


botaoSalvar.addEventListener('click', function(){
    //postLivro()
    let dados = getDadosForm()

    if(dados) {
        if(document.getElementById('salvar').innerText == 'Salvar'){
            postFilme(dados)
        } else if(document.getElementById('salvar').innerText == 'Atualizar'){
            putFilme(dados)
        }
    } else {
        console.log("Não há dados para enviar.");
    }
})

window.addEventListener('load', function(){
    getFilmes()
})