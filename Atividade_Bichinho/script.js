// ─── Elementos ────────────────────────────────────────────────
const cria        = document.getElementById("b");
const avatarImg   = document.getElementById("avatar-img");
const statusBadge = document.getElementById("status-badge");
const humorTexto  = document.getElementById("humor-texto");
const barraFome   = document.getElementById("barra-fome");
const fomeTexto   = document.getElementById("fome-texto");
const estrelasDiv = document.getElementById("estrelas");

// ─── Estados ──────────────────────────────────────────────────
const estados = {
  normal:     "b_n.png",
  irritado:   "b_i.png",
  morto:      "b_d.png",
  comendo:    "b_c.png",
  alimentado: "b_a.png",
};

// ─── Fundos ───────────────────────────────────────────────────
const fundoDia   = "bg.png";
const fundoNoite = "bg.png";

// ─── Variáveis de controle ────────────────────────────────────
let contador      = 0;
let intervalo     = null;
let timeoutClique = null;
let timeoutBack   = null;
let morto         = false;
let modoManual    = false;
let horasContador = 0;
let horasIntervalo = null;

// ─── Mensagens por estado ─────────────────────────────────────
const mensagens = {
  normal:     { texto: "Tá feliz da vida! 🌸",     badge: "😊 Bem alimentado", badgeClass: "badge-success" },
  comendo:    { texto: "NOM NOM NOM 🍓",            badge: "🍓 Comendo!",        badgeClass: "badge-warning" },
  alimentado: { texto: "Que delícia! Obrigado! 💖", badge: "💖 Satisfeito",      badgeClass: "badge-success" },
  irritado:   { texto: "Ei!! Tô com fome!! 😤",    badge: "😤 Com fome!",       badgeClass: "badge-warning" },
  morto:      { texto: "...(não responde)... 💀",   badge: "💀 Morto",           badgeClass: "badge-error"   },
};

// ─── Atualizar UI ─────────────────────────────────────────────
function setEstado(estado) {
  cria.src      = estados[estado];
  avatarImg.src = estados[estado];

  const m = mensagens[estado];
  humorTexto.textContent  = m.texto;
  statusBadge.textContent = m.badge;
  statusBadge.className   = `badge badge-lg badge-soft font-bold shadow ${m.badgeClass}`;
}

// ─── Barra de fome ────────────────────────────────────────────
function atualizarBarra() {
  const pct = Math.min(contador, 60);
  barraFome.value = pct;

  if (pct < 20)      fomeTexto.textContent = "Saciado 💖";
  else if (pct < 30) fomeTexto.textContent = "Com um pouco de fome 🍃";
  else if (pct < 60) fomeTexto.textContent = "Com muita fome!! 😤";
  else               fomeTexto.textContent = "Morreu de fome 💀";
}

// ─── Controlador de fome ─────────────────────────────────────
function controlador() {
  if (intervalo) clearInterval(intervalo);

  intervalo = setInterval(() => {
    if (morto) return;

    contador++;
    atualizarBarra();
    console.log("Tempo sem comer:", contador, "s");

    if (contador === 30) setEstado("irritado");
    if (contador >= 60) {
      setEstado("morto");
      morto = true;
    }
  }, 1000);
}

// ─── Alimentar ────────────────────────────────────────────────
function alimentar() {
  if (morto) return;

  if (timeoutClique) clearTimeout(timeoutClique);
  if (timeoutBack)   clearTimeout(timeoutBack);

  contador = 0;
  atualizarBarra();
  setEstado("comendo");
  console.log("Alimentando...");

  timeoutClique = setTimeout(() => {
    setEstado("alimentado");

    timeoutBack = setTimeout(() => {
      setEstado("normal");
    }, 2000);
  }, 1000);
}

// ─── Estrelas animadas ────────────────────────────────────────
function gerarEstrelas() {
  estrelasDiv.innerHTML = "";
  for (let i = 0; i < 80; i++) {
    const s = document.createElement("div");
    s.classList.add("estrela");
    const size = Math.random() * 3 + 1;
    s.style.width             = size + "px";
    s.style.height            = size + "px";
    s.style.top               = Math.random() * 100 + "%";
    s.style.left              = Math.random() * 100 + "%";
    s.style.animationDelay    = (Math.random() * 3) + "s";
    s.style.animationDuration = (1.5 + Math.random() * 2) + "s";
    estrelasDiv.appendChild(s);
  }
}

// ─── Modo noite / dia ─────────────────────────────────────────
function aplicarModo(noite) {
  if (noite) {
    document.body.classList.add("noite");
    document.body.style.backgroundColor = "#0d1b3e";
  } else {
    document.body.classList.remove("noite");
    document.body.style.backgroundColor = "#b8e4f7";
  }
}

function toggleModoManual() {
  const toggle = document.getElementById("toggle-noite");
  modoManual = true;
  aplicarModo(toggle.checked);
}

function atualizarFundo() {
  if (horasIntervalo) clearInterval(horasIntervalo);

  horasIntervalo = setInterval(() => {
    if (modoManual) return;

    horasContador++;
    const isNoite = horasContador >= 12;
    aplicarModo(isNoite);
    document.getElementById("toggle-noite").checked = isNoite;

    if (horasContador >= 24) horasContador = 0;
  }, 5000); // cada "hora" = 5 segundos
}

// ─── Easter egg: Ferlini ──────────────────────────────────────
function mostrarFerlini() {
  document.getElementById("ferlini-modal").classList.add("show");
}

function fecharFerlini() {
  document.getElementById("ferlini-modal").classList.remove("show");
}

// ─── Iniciar ──────────────────────────────────────────────────
gerarEstrelas();
controlador();
atualizarFundo();

console.log("🐾 Pet Virtual iniciado!");