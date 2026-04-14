// Evento ao enviar o formulário
document.getElementById("quiz").addEventListener("submit", function(e) {
    e.preventDefault();

    let acertos = 0;
    const total = 10;

    // Gabarito das questões
    const gabarito = {
        q1: "c", q2: "c", q3: "c", q4: "c", q5: "c",
        q6: "c", q7: "c", q8: "c", q9: "c", q10: "c"
    };

    // Limpa cores antigas
    document.querySelectorAll("label").forEach(l => {
        l.style.background = "";
    });

    // Correção
    for (let i = 1; i <= total; i++) {
        const selecionada = document.querySelector(`input[name="q${i}"]:checked`);
        const opcoes = document.querySelectorAll(`input[name="q${i}"]`);

        opcoes.forEach(op => {
            const label = op.parentElement;

            // Resposta correta (verde)
            if (op.value === gabarito[`q${i}`]) {
                label.style.background = "#14532d";
            }

            // Resposta errada selecionada (vermelho)
            if (op.checked && op.value !== gabarito[`q${i}`]) {
                label.style.background = "#7f1d1d";
            }
        });

        if (selecionada && selecionada.value === "c") {
            acertos++;
        }
    }

    let emoji, msg, cor;

    if (acertos === total) {
        emoji = "🔥"; msg = "Excelente! Você dominou o conteúdo!"; cor = "#22c55e";
    } else if (acertos >= 7) {
        emoji = "✅"; msg = "Muito bom! Continue assim!"; cor = "#38bdf8";
    } else if (acertos >= 4) {
        emoji = "⚠️"; msg = "Você está no caminho, revise alguns pontos."; cor = "#f59e0b";
    } else {
        emoji = "❌"; msg = "Reveja o material e tente novamente."; cor = "#ef4444";
    }

    const resultado = document.getElementById("resultado");
    resultado.className = "show";
    resultado.style.borderLeftColor = cor;

    resultado.innerHTML = `
        <div style="animation: fadeIn 0.5s ease">
            <p style="font-size:28px">${emoji}</p>
            <p>Você acertou <strong style="color:${cor}">${acertos} de ${total}</strong> questões.</p>
            <p>${msg}</p>
            <button onclick="refazerQuiz()">Refazer Quiz</button>
        </div>
    `;

    resultado.scrollIntoView({ behavior: "smooth" });
});

// Função para reiniciar o quiz
function refazerQuiz() {
    document.getElementById("quiz").reset();

    document.querySelectorAll("label").forEach(l => {
        l.style.background = "";
    });

    const resultado = document.getElementById("resultado");
    resultado.className = "";
    resultado.innerHTML = "";
}