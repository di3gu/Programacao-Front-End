// ── NAV ATIVA CONFORME SEÇÃO VISÍVEL ──────────────────────────
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));


// ── Q3: MOSTRAR / OCULTAR TABELA ──────────────────────────────
function mostrarTabela() {
  const btn       = document.getElementById('btn-tabela');
  const container = document.getElementById('container-tabela');
  let   img       = document.getElementById('tabela-img');

  if (img) {
    img.remove();
    btn.textContent = 'Mostrar Tabela de Jogos';
    return;
  }

  img     = document.createElement('img');
  img.src = 'Tabela_Jogos.png';
  img.alt = 'Tabela de Jogos da Copa do Mundo 2026';
  img.id  = 'tabela-img';

  container.appendChild(img);
  btn.textContent = 'Ocultar Tabela de Jogos';

  requestAnimationFrame(() => {
    img.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}


// ── Q4: REVELAR JOGADOR ───────────────────────────────────────
function revelar() {

  // 1. Troca a imagem
  const foto = document.getElementById('player-img');
  if (foto) foto.src = '_vinicius_junior.png';

  // 2. Preenche as informações
  document.getElementById('Nome').textContent     = 'Vinícius José Paixão de Oliveira Júnior';
  document.getElementById('Data_Nas').textContent = '12/07/2000 (25 anos)';
  document.getElementById('Altura').textContent   = '1,76 m';
  document.getElementById('Posicao').textContent  = 'Ponta-esquerda / Atacante';
  document.getElementById('Rank').textContent     = '9,5';

  // 3 e 4. Remove placeholder e aplica card-text
  document.querySelectorAll('.placeholder').forEach(el => {
    el.classList.remove('placeholder');
    el.classList.add('card-text');
  });
}