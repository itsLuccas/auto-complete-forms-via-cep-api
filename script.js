document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;
    console.log(cepInformado);

    //validar cep
    if (!(cepInformado.length === 8))
        return;

    //busca via cep
    //promessa que o fetch vai buscar esse recurso 
    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;

                localStorage.setItem("cep", data.cep);
                localStorage.setItem("logradouro", data.logradouro);
                localStorage.setItem("bairro", data.bairro);
                localStorage.setItem("cidade", data.localidade);
                localStorage.setItem("estado", data.uf);
            } else {
                alert("CEP não encontrado.");
            }
        })
        .catch(error => console.error("Erro ao buscar CEP: ", error));

})

document.addEventListener('DOMContentLoaded', () => {
    //Verifica se tem itens salvo
    const cep = localStorage.getItem("cep");
    const logradouro = localStorage.getItem("logradouro");
    const bairro = localStorage.getItem("bairro");
    const cidade = localStorage.getItem("cidade");
    const estado = localStorage.getItem("estado");

    //Se for dark, adiciona a classe e altera o botão
    if (logradouro !== null) {
        document.getElementById('cep').value = cep;
        document.getElementById('logradouro').value = logradouro;
        document.getElementById('bairro').value = bairro;
        document.getElementById('cidade').value = cidade;
        document.getElementById('estado').value = estado;
    }
})