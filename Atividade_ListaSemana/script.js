// ===============================
// EXERCÍCIO 01 - CPF
// ===============================
function validarCPF() {
    let cpf = document.getElementById("cpf").value.replace(/\D/g, "");

    if (cpf.length !== 11) return setResult("cpfResult", false);

    let calc = (base) => {
        let soma = 0;
        for (let i = 0; i < base.length; i++) {
            soma += Number(base[i]) * ((base.length + 1) - i);
        }
        let resto = (soma * 10) % 11;
        return resto === 10 ? 0 : resto;
    };

    let d1 = calc(cpf.substring(0, 9));
    let d2 = calc(cpf.substring(0, 9) + d1);

    setResult("cpfResult", cpf.endsWith("" + d1 + d2));
}

function setResult(id, valid) {
    let el = document.getElementById(id);
    el.innerText = valid ? "VÁLIDO ✅" : "INVÁLIDO ❌";
    el.style.color = valid ? "#22c55e" : "#ef4444";
}


// ===============================
// EXERCÍCIO 02 - CONVERSOR
// ===============================
function setupConversor() {
    const c = document.getElementById("celsius");
    const f = document.getElementById("fahrenheit");

    if (!c || !f) return;

    c.addEventListener("input", () => {
        if (c.value === "") return;
        f.value = ((c.value * 9/5) + 32).toFixed(2);
    });

    f.addEventListener("input", () => {
        if (f.value === "") return;
        c.value = ((f.value - 32) * 5/9).toFixed(2);
    });
}


// ===============================
// EXERCÍCIO 03 - MÉDIA
// ===============================
function calcularMedia() {
    let n1 = Number(document.getElementById("n1").value);
    let n2 = Number(document.getElementById("n2").value);
    let n3 = Number(document.getElementById("n3").value);

    let media = (n1 + n2 + n3) / 3;
    let res = document.getElementById("mediaResult");

    if (media >= 7) {
        res.innerText = `Aprovado - ${media.toFixed(2)}`;
        res.style.color = "#3b82f6";
    } 
    else if (media >= 4) {
        res.innerText = `Exame - falta ${(10 - media).toFixed(2)} para 10`;
        res.style.color = "#22c55e";
    } 
    else {
        res.innerText = `Reprovado - ${media.toFixed(2)}`;
        res.style.color = "#ef4444";
    }
}


// ===============================
// EXERCÍCIO 04 - TAXAS
// ===============================
function calcularTaxas() {
    let valor = Number(document.getElementById("valor").value);
    let bandeira = document.getElementById("bandeira").value;
    let parcelas = Number(document.getElementById("parcelas").value);

    let taxa = 0;

    switch (bandeira) {
        case "visa": taxa = 0.02; break;
        case "master": taxa = 0.0185; break;
        case "elo": taxa = 0.03; break;
    }

    let taxaValor = valor * taxa;
    let juros = valor * (0.0035 * parcelas);
    let mensal = 12.5 * parcelas;

    let total = valor + taxaValor + juros + mensal;
    let parcela = total / parcelas;

    document.getElementById("taxaOut").innerText = taxaValor.toFixed(2);
    document.getElementById("jurosOut").innerText = juros.toFixed(2);
    document.getElementById("parcelaOut").innerText = parcela.toFixed(2);
}


// ===============================
// EXERCÍCIO 05 - VIP LISTA
// ===============================
function addConvidado() {
    let input = document.getElementById("nome");
    let nome = input.value.trim();

    if (!nome) return;

    let li = document.createElement("li");

    li.innerHTML = `
        <span>${nome}</span>
        <button onclick="concluir(this)">✔</button>
        <button onclick="editar(this)">✏</button>
        <button onclick="excluir(this)">🗑</button>
    `;

    document.getElementById("lista").appendChild(li);
    input.value = "";
}

function concluir(btn) {
    btn.parentElement.classList.toggle("done");
}

function editar(btn) {
    let novo = prompt("Novo nome:");
    if (novo) btn.parentElement.querySelector("span").innerText = novo;
}

function excluir(btn) {
    btn.parentElement.remove();
}


// ===============================
// EXERCÍCIO 06 - EVENTOS
// ===============================
function calcularEvento() {
    let pessoas = Number(document.getElementById("pessoas").value);
    let pacote = document.getElementById("pacote").value;

    let preco = 0;

    if (pacote === "standard") preco = 50;
    if (pacote === "premium") preco = 80;
    if (pacote === "deluxe") preco = 120;

    let base = preco * pessoas;
    let taxa = base * 0.10;
    let total = base + taxa;

    if (pessoas > 100) total *= 0.95;

    document.getElementById("eventoOut").innerText = total.toFixed(2);
}


// ===============================
// EXERCÍCIO 07 - CARTÃO (LUHN)
// ===============================
function validarCartao() {
    let num = document.getElementById("cartao").value.replace(/\D/g, "");

    if (num.length < 13 || num.length > 16) {
        return showCard(false);
    }

    let arr = num.split("").reverse().map(Number);

    let soma = 0;

    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];

        if (i % 2 === 1) {
            val *= 2;
            if (val > 9) val -= 9;
        }

        soma += val;
    }

    let valid = soma % 10 === 0;
    showCard(valid);
}

function showCard(valid) {
    let el = document.getElementById("cardResult");
    el.innerText = valid ? "Cartão VÁLIDO ✅" : "Cartão INVÁLIDO ❌";
    el.style.color = valid ? "#22c55e" : "#ef4444";
}