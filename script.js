const numNotas = document.querySelector("#numNotas")
const notasInputDiv = document.querySelector("#notasInputs")
const divFaltando = document.querySelector("#falta")

// Ripple effect on buttons
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn")
    if (!btn) return
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")
    const rect = btn.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px"
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px"
    btn.appendChild(ripple)
    ripple.addEventListener("animationend", () => ripple.remove())
})

// Confetti burst for success
function launchConfetti() {
    const colors = ["#16a34a", "#22c55e", "#4ade80", "#2563eb", "#facc15", "#f97316"]
    for (let i = 0; i < 30; i++) {
        const piece = document.createElement("div")
        piece.classList.add("confetti-piece")
        piece.style.background = colors[Math.floor(Math.random() * colors.length)]
        piece.style.left = (30 + Math.random() * 40) + "vw"
        piece.style.top = (20 + Math.random() * 20) + "vh"
        piece.style.animationDelay = (Math.random() * 0.3) + "s"
        piece.style.animationDuration = (0.8 + Math.random() * 0.6) + "s"
        piece.style.width = (5 + Math.random() * 6) + "px"
        piece.style.height = (5 + Math.random() * 6) + "px"
        document.body.appendChild(piece)
        piece.addEventListener("animationend", () => piece.remove())
    }
}

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

    if (tipo === "success") {
        launchConfetti()
    }
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
