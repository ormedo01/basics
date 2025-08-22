function Pessoa(altura, peso) {
    if (!altura || !peso) {
        throw new Error("Altura e peso são obrigatórios");
    }

    this.altura = altura;
    this.peso = peso;
}

function Nutricionista(altura, peso) {
    Pessoa.call(this, altura, peso);
    this.imc = function () {
        return this.peso / (this.altura * this.altura);
    };

    this.classificaIMC = function () {
        var imc = this.imc();
        if (imc < 18.5) {
            return "Abaixo do peso";
        }
        if (imc >= 18.5 && imc < 24.9) {
            return "Peso normal";
        }
        if (imc >= 25 && imc < 29.9) {
            return "Sobrepeso";
        }

        return "Obesidade";
    };
}
Nutricionista.prototype = Object.create(Pessoa.prototype);
Nutricionista.prototype.constructor = Nutricionista;

function renderizaResultadoIMC(nutricionista) {
    document.getElementById("imc").innerText =
        nutricionista.imc().toFixed(2) + " - " + nutricionista.classificaIMC();
    
    // Destacar a linha correspondente na tabela
    destacarLinhaIMC(nutricionista.imc());
}

function destacarLinhaIMC(valorIMC) {
    // Remover destaque de todas as linhas
    var linhas = document.querySelectorAll("#tabela-imc tbody tr");
    for (var i = 0; i < linhas.length; i++) {
        linhas[i].classList.remove("destaque-imc");
    }
    
    // Adicionar destaque à linha correspondente
    var linhaDestaque;
    if (valorIMC < 18.5) {
        linhaDestaque = document.getElementById("linha-abaixo");
    } else if (valorIMC >= 18.5 && valorIMC < 24.9) {
        linhaDestaque = document.getElementById("linha-normal");
    } else if (valorIMC >= 25 && valorIMC < 29.9) {
        linhaDestaque = document.getElementById("linha-sobrepeso");
    } else {
        linhaDestaque = document.getElementById("linha-obesidade");
    }
    
    if (linhaDestaque) {
        linhaDestaque.classList.add("destaque-imc");
    }
}

function actionCalcularIMCBuilder() {
    var alturaEl = document.getElementById("altura");
    var pesoEl = document.getElementById("peso");

    return function actionCalcularIMC(evt) {
        evt.preventDefault();

        var nutricionista = new Nutricionista(
            parseFloat(alturaEl.value),
            parseFloat(pesoEl.value)
        );
        console.log(Nutricionista.prototype.constructor);
        console.log(nutricionista instanceof Pessoa);

        renderizaResultadoIMC(nutricionista);
    }
}

window.onload = function () {
    document
        .getElementById("calcular")
        .addEventListener("click", actionCalcularIMCBuilder());
};
