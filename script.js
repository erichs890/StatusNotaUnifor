const numNotas = document.querySelector("#numNotas")
const notasInputDiv = document.querySelector("#notasInputs")
const divFaltando = document.querySelector("#falta")

function criarCampoNota(label) {
    const field = document.createElement("div")
    field.classList.add("nota-field")

    const lbl = document.createElement("label")
    lbl.textContent = label

    const input = document.createElement("input")
    input.type = "number"
    input.min = "0"
    input.max = "10"
    input.step = "0.1"
    input.placeholder = "0 - 10"

    field.append(lbl, input)
    return { field, input }
}

function criarBotao(texto, tipo) {
    const btn = document.createElement("button")
    btn.textContent = texto
    btn.classList.add("btn", tipo === "primary" ? "btn-primary" : "btn-secondary")
    return btn
}

function mostrarResultado(mensagem, tipo) {
    divFaltando.innerHTML = ""
    const box = document.createElement("div")
    box.classList.add("result-box", `result-${tipo}`)

    const icons = {
        success: "&#10003;",
        danger: "&#10007;",
        warning: "&#9888;"
    }

    box.innerHTML = `<span>${icons[tipo] || ""}</span> ${mensagem}`
    divFaltando.appendChild(box)
}

function quantasNotas(numeroDeNotas) {
    notasInputDiv.innerHTML = ""
    divFaltando.innerHTML = ""

    if (numeroDeNotas == 1) {
        const grid = document.createElement("div")
        grid.classList.add("notas-grid")

        const { field: f1, input: nota1 } = criarCampoNota("AV1:")
        grid.appendChild(f1)
        notasInputDiv.appendChild(grid)

        const btnGroup = document.createElement("div")
        btnGroup.classList.add("btn-group")

        const botaoQuantoFalta = criarBotao("Ver quanto falta para AV3", "secondary")
        const botaoMedia = criarBotao("Ver se passei (nota unica)", "primary")

        btnGroup.append(botaoQuantoFalta, botaoMedia)
        notasInputDiv.appendChild(btnGroup)

        botaoQuantoFalta.addEventListener("click", () => {
            verQuantoFalta(parseFloat(nota1.value))
        })

        botaoMedia.addEventListener("click", () => {
            if (parseFloat(nota1.value) >= 6) {
                mostrarResultado("Parabens, voce passou!", "success")
            } else {
                mostrarResultado("Infelizmente voce nao passou!", "danger")
            }
        })

    } else if (numeroDeNotas == 2) {
        const grid = document.createElement("div")
        grid.classList.add("notas-grid")

        const { field: f1, input: nota1 } = criarCampoNota("AV1:")
        const { field: f2, input: nota2 } = criarCampoNota("AV2:")

        grid.append(f1, f2)
        notasInputDiv.appendChild(grid)

        const btnGroup = document.createElement("div")
        btnGroup.classList.add("btn-group")

        const botaoQuantoFalta = criarBotao("Estou na AV3?", "primary")
        btnGroup.appendChild(botaoQuantoFalta)
        notasInputDiv.appendChild(btnGroup)

        botaoQuantoFalta.addEventListener("click", () => {
            estouNaAV3(parseFloat(nota1.value), parseFloat(nota2.value))
        })

    } else if (numeroDeNotas == 3) {
        const grid = document.createElement("div")
        grid.classList.add("notas-grid")

        const { field: f1, input: nota1 } = criarCampoNota("AV1:")
        const { field: f2, input: nota2 } = criarCampoNota("AV2:")
        const { field: f3, input: nota3 } = criarCampoNota("AV3:")

        grid.append(f1, f2, f3)
        notasInputDiv.appendChild(grid)

        const btnGroup = document.createElement("div")
        btnGroup.classList.add("btn-group")

        const botaoMedia = criarBotao("Ver se passei", "primary")
        btnGroup.appendChild(botaoMedia)
        notasInputDiv.appendChild(btnGroup)

        botaoMedia.addEventListener("click", () => {
            calcularMedia(parseFloat(nota1.value), parseFloat(nota2.value), parseFloat(nota3.value))
        })
    }
}

numNotas.addEventListener("change", () => {
    quantasNotas(numNotas.value)
})

function verQuantoFalta(nota1) {
    const falta = 8 - nota1

    if (nota1 >= 8) {
        mostrarResultado("Ja pode fazer a AV3!", "success")
    } else {
        mostrarResultado(`Faltam ${falta.toFixed(2)} pontos para fazer a AV3`, "warning")
    }
}

function estouNaAV3(nota1, nota2) {
    const media = (nota1 + nota2) / 2

    if (media >= 4) {
        mostrarResultado("Voce pode fazer a AV3!", "success")
    } else {
        mostrarResultado("Voce nao pode fazer a AV3", "danger")
    }
}

function calcularMedia(nota1, nota2, nota3) {
    if (nota3 < 4) {
        mostrarResultado("Infelizmente voce nao passou!", "danger")
    } else {
        const media1 = (nota1 + nota2) / 2
        if (media1 < 4) {
            mostrarResultado("Infelizmente voce nao passou!", "danger")
        } else {
            const media = (nota1 + nota2 + nota3) / 3
            if (media < 5) {
                mostrarResultado("Infelizmente voce nao passou!", "danger")
            } else {
                mostrarResultado("Parabens, voce passou!", "success")
            }
        }
    }
}
