var  lista = [
    {"descricao":"arroz","quantidade":"1","valor": "5.40"},
    {"descricao":"cerveja","quantidade":"12","valor":"1.99"},
    {"descricao":"carne","quantidade":"1","valor":"15.00"}
];

function getTotal(lista){
    var total = 0;
    for(var chave in lista){
        total += lista[chave].valor * lista[chave].quantidade;
    }
    return total;
}

function setList(lista){
    var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>';
    for(var chave in lista){
        table += '<tr><td>' + formatDescricao(lista[chave].descricao) + '</td><td>' + formatQuantidade(lista[chave].quantidade) + '</td><td>' + formatValor(lista[chave].valor) + '</td><td><button id="" class="btn btn-default" onclick="setUpdate(' + chave + ');">Edit</button> <button id="" class="btn btn-default" onclick="deleteData(' + chave + ');">Delete</button> </td><tr>';
    }
    table += '</tbody>';

    document.getElementById("listTable").innerHTML = table;
    document.getElementById("valorTotal").innerHTML = formatValor(getTotal(lista));
    saveListStorage(lista);
}

function addData(){
    if(!validation()){
        return;
    }

    var descricao = document.getElementById("descricao").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;

    lista.unshift({
        "descricao":descricao,
        "quantidade":quantidade,
        "valor": valor
    });

    setList(lista);
    resetForm();
}

function setUpdate(id){
    console.log(id);

    var obj = lista[id];
    document.getElementById("descricao").value = obj.descricao;
    document.getElementById("quantidade").value = obj.quantidade;
    document.getElementById("valor").value = obj.valor;
    document.getElementById("btnUpdate").style = "display:inline-block";
    document.getElementById("btnAdd").style = "display:none";


    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value=' + id + '>';
}

function updateData(){
    if(!validation()){
        return;
    }

    var id = document.getElementById("idUpdate").value;

    var descricao = document.getElementById("descricao").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;

    lista[id] = {"descricao": descricao, "quantidade": quantidade, "valor" : valor};
    setList(lista);
    resetForm();
}

function resetForm(){
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("btnUpdate").style = "display:none";
    document.getElementById("btnAdd").style = "display:inline-block";
    document.getElementById("errors").style.display = "none";
}

function deleteData(id){
    if(confirm("Excluir este item?")){

        /*
        var arrAuxIni = lista.slice(0,id);

        var arrAuxEnd = lista.slice(id + 1);
        lista = arrAuxIni.concat(arrAuxEnd);
        */
        lista.splice(id,1);
        setList(lista);
    }
}

function deleteList(){
    if(confirm('Deseja limpar a lista?')){
        lista.length = 0;
        setList(lista);
    }
}

function formatDescricao(descricao){
    var str = descricao.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatQuantidade(quantidade){
    return parseInt(quantidade);
}

function formatValor(valor){
    var str = parseFloat(valor).toFixed(2) + "";
    str = str.replace(".",",");
    str = "R$ " + str;
    return str;
}

function validation(){
    var divErrors = document.getElementById("errors");
    divErrors.style.display = "none";

    var descricao = document.getElementById("descricao").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;

    var errors = '';

    if(descricao === ''){
        errors += '<p>Informe a descrição!</p>';
    }

    if(quantidade === ''){
        errors += '<p>Informe a quantidade!</p>';
    }else if(quantidade != parseInt(quantidade)){
        errors += '<p>Informe uma quantidade valida</p>';
    }

    if(valor === ''){
        errors += '<p>Informe o valor</p>';
    }else if(valor != parseFloat(valor)){
        errors += '<p>Informe um valor valido</p>'
    }

    if(errors != ""){

        divErrors.style.display = "block";
        divErrors.innerHTML = "<h3>Error:</h3>" + errors;
        divErrors.style.backgroundColor = "rgba(255, 1, 1, 0.3)";
        divErrors.style.color = "black";
        divErrors.style.margin = "10px";
        divErrors.style.padding = "10px";
        divErrors.style.borderRadius = "13px";
        divErrors.style.boxShadow = "1px 1px 1px";
        return 0;
    }else{
        return 1;
    }
}

//Gravação Local Storage

function saveListStorage(lista){
    var jsonStr = JSON.stringify(lista);
    localStorage.setItem('lista',jsonStr);
    console.log(jsonStr);
}

function initListStorage(){
    var testList = localStorage.getItem('lista');
    if(testList){
        lista = JSON.parse(testList);
    }
    setList(lista);
}

initListStorage();