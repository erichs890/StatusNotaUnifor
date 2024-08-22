const numNotas = document.querySelector("#numNotas")
const notasInputDiv = document.querySelector("#notasInputs")
const divFaltando = document.querySelector("#falta")

function quantasNotas(numeroDeNotas) {
    notasInputDiv.innerHTML = ""

    if (numeroDeNotas == 1) {
        const divAV = document.createElement("div")
        divAV.classList.add("notaAV1")

        const av1Label = document.createElement("label")
        av1Label.textContent = "AV1:"
        av1Label.className = "nota1Label"

        const nota1 = document.createElement("input")
        nota1.type = "Number"
        nota1.classList.add("nota1")

        const botaoQuantoFalta = document.createElement("button")
        botaoQuantoFalta.textContent = "Ver quanto falta para AV3"
        botaoQuantoFalta.classList.add("quantoFaltaBotao")

        const botaoMedia = document.createElement("button")
        botaoMedia.textContent = "Ver se passei (nota única)"
        botaoMedia.classList.add("calcularBotao")

        divAV.append(av1Label, nota1)
        notasInputDiv.appendChild(divAV)
        notasInputDiv.appendChild(botaoQuantoFalta)
        notasInputDiv.appendChild(botaoMedia)

        botaoQuantoFalta.addEventListener("click", () => {
            verQuantoFalta(parseFloat(nota1.value))
        })

        botaoMedia.addEventListener("click", () => {
            const body = document.querySelector("body")

            if (parseFloat(nota1.value) >= 6) {
                body.style.backgroundColor = "green"
                divFaltando.textContent = "Parabéns, você passou!"
            } else {
                body.style.backgroundColor = "red"
                divFaltando.textContent = "Infelizmente você não passou!"
            }
        })

    } else if (numeroDeNotas == 2) {
        const divAV = document.createElement("div")
        divAV.classList.add("notaAV2")

        const av1Label = document.createElement("label")
        av1Label.textContent = "AV1:"
        av1Label.className = "nota1Label"

        const nota1 = document.createElement("input")
        nota1.type = "Number"
        nota1.classList.add("nota1")

        const av2Label = document.createElement("label")
        av2Label.textContent = "AV2:"
        av2Label.className = "nota2Label"

        const nota2 = document.createElement("input")
        nota2.type = "Number"
        nota2.classList.add("nota2")

        const botaoMedia = document.createElement("button")
        botaoMedia.textContent = "Ver se passei"
        botaoMedia.classList.add("calcularBotao")

        const botaoQuantoFalta = document.createElement("button")
        botaoQuantoFalta.textContent = "Estou na AV3?"
        botaoQuantoFalta.classList.add("quantoFaltaBotao")

        botaoQuantoFalta.addEventListener("click", () => {
            estouNaAV3(parseFloat(nota1.value), parseFloat(nota2.value))
        })

        divAV.append(av1Label, nota1, av2Label, nota2)
        notasInputDiv.appendChild(divAV)
        notasInputDiv.appendChild(botaoQuantoFalta)

    } else if (numeroDeNotas == 3) {
        const divAV = document.createElement("div")
        divAV.classList.add("notaAV3")

        const av1Label = document.createElement("label")
        av1Label.textContent = "AV1:"
        av1Label.className = "nota1Label"
        const nota1 = document.createElement("input")
        nota1.type = "Number"
        nota1.classList.add("nota1")

        const av2Label = document.createElement("label")
        av2Label.textContent = "AV2:"
        av2Label.className = "nota2Label"

        const nota2 = document.createElement("input")
        nota2.type = "Number"
        nota2.classList.add("nota2")

        const av3Label = document.createElement("label")
        av3Label.textContent = "AV3:"
        const nota3 = document.createElement("input")
        nota3.type = "Number"
        nota3.classList.add("nota3")

        const botaoMedia = document.createElement("button")
        botaoMedia.textContent = "Ver se passei"
        botaoMedia.classList.add("calcularBotao")

        divAV.append(av1Label, nota1, av2Label, nota2, av3Label, nota3)
        notasInputDiv.appendChild(divAV)
        notasInputDiv.appendChild(botaoMedia)

        botaoMedia.addEventListener("click", () => {
            calcularMedia(parseFloat(nota1.value), parseFloat(nota2.value), parseFloat(nota3.value))
        })
    } else if(numeroDeNotas>3) {
        alert("Adicione no máximo 3 notas")
    }
}

numNotas.addEventListener("input", () => {
    quantasNotas(numNotas.value)
})

function verQuantoFalta(nota1) {
    const falta = 8 - nota1
    const body = document.querySelector("body")

    if (nota1 >= 8) {
        body.style.backgroundColor = "green"
        divFaltando.innerHTML = "Já pode fazer a AV3"
    } else {
        body.style.backgroundColor = "yellow"
        divFaltando.innerHTML = `Faltam ${falta.toFixed(2)} pontos para fazer a AV3`
    }
}


function estouNaAV3(nota1, nota2) {
    const body = document.querySelector("body")
    const media = (nota1 + nota2) / 2
    
    if (media >= 4) {
        body.style.backgroundColor = "green"
        divFaltando.innerHTML = "Você pode fazer a AV3"
    } else {
        divFaltando.innerHTML = "Você não pode fazer a AV3"
        body.style.backgroundColor = "red"
    }
}

function calcularMedia(nota1, nota2, nota3) {
    const body = document.querySelector("body")

    if (nota3 < 4) {
        body.style.backgroundColor = "red"
        divFaltando.textContent = "Infelizmente você não passou!"
    } else {
        const media1 = (nota1 + nota2) / 2
        if(media1 < 4){
        body.style.backgroundColor = "red"
        divFaltando.textContent = "Infelizmente você não passou!"
        }else{
            const media = (nota1+nota2+nota3)/3
            if (media < 5) {
                body.style.backgroundColor = "red"
                 divFaltando.textContent = "Infelizmente você não passou!"              
            } else {
                body.style.backgroundColor = "green"
                divFaltando.textContent = "Parabéns, você passou!"
            }
        }
    }
}
