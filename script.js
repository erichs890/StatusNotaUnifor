const numNotas = document.querySelector("#numNotas");
const gerarNotas = document.querySelector("#gerarNotas");
const notasInputDiv = document.querySelector("#notasInputs");

function quantasNotas(numeroDeNotas) {
    notasInputDiv.innerHTML = ""

    if (numeroDeNotas == 1) {
        const divAV = document.createElement("div");
        divAV.classList.add("notaAV1");

        const av1Label = document.createElement("label");
        av1Label.textContent = "AV1:";

        const nota1 = document.createElement("input");
        nota1.type = "Number";
        nota1.classList.add("nota1");

        divAV.append(av1Label, nota1);
        notasInputDiv.appendChild(divAV);
    } else if (numeroDeNotas == 2) {
        const divAV = document.createElement("div");
        divAV.classList.add("notaAV2");

        const av1Label = document.createElement("label");
        av1Label.textContent = "AV1:";
        const nota1 = document.createElement("input");
        nota1.type = "Number";
        nota1.classList.add("nota1");

        const av2Label = document.createElement("label");
        av2Label.textContent = "AV2:";
        const nota2 = document.createElement("input");
        nota2.type = "Number";
        nota2.classList.add("nota2");

        divAV.append(av1Label, nota1, av2Label, nota2);
        notasInputDiv.appendChild(divAV);
    } else if (numeroDeNotas == 3) {
        const divAV = document.createElement("div");
        divAV.classList.add("notaAV3");

        const av1Label = document.createElement("label");
        av1Label.textContent = "AV1:";
        const nota1 = document.createElement("input");
        nota1.type = "Number";
        nota1.classList.add("nota1");

        const av2Label = document.createElement("label");
        av2Label.textContent = "AV2:";
        const nota2 = document.createElement("input");
        nota2.type = "Number";
        nota2.classList.add("nota2");

        const av3Label = document.createElement("label");
        av3Label.textContent = "AV3:";
        const nota3 = document.createElement("input");
        nota3.type = "Number";
        nota3.classList.add("nota3");

        divAV.append(av1Label, nota1, av2Label, nota2, av3Label, nota3);
        notasInputDiv.appendChild(divAV);
    } else {
        alert("Adicione no máximo 3 notas");
        
    }

    const botaoMedia = document.createElement("button");
    botaoMedia.textContent = "Ver se passei";
    notasInputDiv.appendChild(botaoMedia);
    botaoMedia.classList.add("calcularBotao");

    botaoMedia.addEventListener("click", () => {
        const nota1 = parseFloat(document.querySelector(".nota1").value);
        let nota2, nota3;
      
        if (numeroDeNotas > 1) {
          nota2 = parseFloat(document.querySelector(".nota2").value);
        }
        if (numeroDeNotas > 2) {
          nota3 = parseFloat(document.querySelector(".nota3").value);
        }
      
        const body = document.querySelector("body");
      
        if (numeroDeNotas == 1) {
          const media = nota1 / 1;
          if (media >= 5) {
            body.style.backgroundColor = "green";
          } else {
            body.style.backgroundColor = "red";
          }
        } else {
          calcularMedia(nota1, nota2, nota3);
        }
      });
}

gerarNotas.addEventListener("click", () => {
        quantasNotas(numNotas.value);
});

function calcularMedia(nota1, nota2, nota3) {
    let media;
  
    if (nota2 === undefined) {
      media = nota1;
    } else if (nota3 === undefined) {
      media = (nota1 + nota2) / 2;
    } else {
      media = (nota1 + nota2 + nota3) / 3;
    }
  
    const body = document.querySelector("body");
    if (media < 5) {
      body.style.backgroundColor = "red";
    } else {
      body.style.backgroundColor = "green";
    }
  }
