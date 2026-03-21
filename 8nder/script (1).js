/**
 * VOLT SHIRTS — script.js
 * ─────────────────────────────────────────────────────────────
 * Responsável por:
 *   • Dados das camisas (fácil de editar)
 *   • Renderização dos cards no grid
 *   • Pesquisa em tempo real
 *   • Filtro por liga
 *   • Menu mobile
 *   • Animações de entrada escalonadas
 * ─────────────────────────────────────────────────────────────
 */

'use strict';

/* ══════════════════════════════════════════════════════════
   1. DADOS — Edite aqui para adicionar / remover camisas
      Campos:
        id       — identificador único
        team     — nome do clube
        league   — liga (deve corresponder ao data-filter)
        leagueLabel — nome legível da liga
        season   — época ex: "2024/25"
        version  — "Titular" | "Alternativa" | "Terceiro" | "Especial"
        sizes    — array de tamanhos disponíveis; prefixe com "!" p/ esgotado
        desc     — descrição curta
        price    — preço em euros (número)
        img      — URL da imagem (coloque fotos em imagens/ e referencie aqui)
   ══════════════════════════════════════════════════════════ */
const SHIRTS = [
  {
    id: 1,
    team: "Manchester City",
    league: "premier",
    leagueLabel: "Premier League",
    season: "2024/25",
    version: "Titular",
    sizes: ["S","M","L","XL","!XXL"],
    desc: "Azul celeste icónico com detalhes técnicos Puma. Patch de campeão incluído.",
    price: 99.99,
    img: "imagens/man-city-home.jpg"
  },
  {
    id: 2,
    team: "Arsenal",
    league: "premier",
    leagueLabel: "Premier League",
    season: "2024/25",
    version: "Alternativa",
    sizes: ["S","M","!L","XL"],
    desc: "Amarelo clássico em homenagem ao icónico kit dos anos 70. Adidas.",
    price: 94.99,
    img: "imagens/arsenal-away.jpg"
  },
  {
    id: 3,
    team: "Liverpool",
    league: "premier",
    leagueLabel: "Premier League",
    season: "2024/25",
    version: "Titular",
    sizes: ["XS","S","M","L","XL","XXL"],
    desc: "O vermelho de Anfield. Nike Dri-FIT ADV com tecnologia de controlo de temperatura.",
    price: 104.99,
    img: "imagens/liverpool-home.jpg"
  },
  {
    id: 4,
    team: "Real Madrid",
    league: "laliga",
    leagueLabel: "La Liga",
    season: "2024/25",
    version: "Titular",
    sizes: ["S","M","L","XL"],
    desc: "Branco imaculado com listras douradas subtis. Adidas. 14 UCL.",
    price: 109.99,
    img: "imagens/real-madrid-home.jpg"
  },
  {
    id: 5,
    team: "FC Barcelona",
    league: "laliga",
    leagueLabel: "La Liga",
    season: "2024/25",
    version: "Titular",
    sizes: ["S","M","L","!XL","!XXL"],
    desc: "Listras blaugrana redefinidas com tecido Nike Aeroswift para desempenho máximo.",
    price: 104.99,
    img: "imagens/barca-home.jpg"
  },
  {
    id: 6,
    team: "Atlético Madrid",
    league: "laliga",
    leagueLabel: "La Liga",
    season: "2024/25",
    version: "Terceiro",
    sizes: ["M","L","XL"],
    desc: "Preto elegante com detalhes vermelhos. Edição limitada 120º aniversário.",
    price: 94.99,
    img: "imagens/atletico-third.jpg"
  },
  {
    id: 7,
    team: "Juventus",
    league: "seriea",
    leagueLabel: "Serie A",
    season: "2024/25",
    version: "Titular",
    sizes: ["XS","S","M","L","XL"],
    desc: "O clássico preto e branco que definiu uma era. Adidas Authentic.",
    price: 99.99,
    img: "imagens/juventus-home.jpg"
  },
  {
    id: 8,
    team: "Inter de Milão",
    league: "seriea",
    leagueLabel: "Serie A",
    season: "2024/25",
    version: "Alternativa",
    sizes: ["S","M","L"],
    desc: "Branco com listras azul-preto. Nike x Inter — elegância nerazzurri.",
    price: 94.99,
    img: "imagens/inter-away.jpg"
  },
  {
    id: 9,
    team: "PSG",
    league: "ligue1",
    leagueLabel: "Ligue 1",
    season: "2024/25",
    version: "Titular",
    sizes: ["S","M","L","XL","XXL"],
    desc: "Azul de Paris com a Torre Eiffel gravada no tecido. Nike edição premium.",
    price: 109.99,
    img: "imagens/psg-home.jpg"
  },
  {
    id: 10,
    team: "Olympique Lyon",
    league: "ligue1",
    leagueLabel: "Ligue 1",
    season: "2024/25",
    version: "Alternativa",
    sizes: ["S","M","L"],
    desc: "Rosa vibrante — um dos kits alternativos mais comentados da temporada.",
    price: 84.99,
    img: "imagens/lyon-away.jpg"
  },
  {
    id: 11,
    team: "Bayern Munique",
    league: "bundesliga",
    leagueLabel: "Bundesliga",
    season: "2024/25",
    version: "Titular",
    sizes: ["S","M","L","XL","!XXL"],
    desc: "Vermelho clássico com textura geométrica Adidas. O rei do futebol alemão.",
    price: 99.99,
    img: "imagens/bayern-home.jpg"
  },
  {
    id: 12,
    team: "Borussia Dortmund",
    league: "bundesliga",
    leagueLabel: "Bundesliga",
    season: "2024/25",
    version: "Titular",
    sizes: ["XS","S","M","L","XL"],
    desc: "Amarelo sinal que ilumina o Signal Iduna Park. Puma Authentic.",
    price: 94.99,
    img: "imagens/bvb-home.jpg"
  },
  {
    id: 13,
    team: "Flamengo",
    league: "brasil",
    leagueLabel: "Brasil",
    season: "2024",
    version: "Titular",
    sizes: ["P","M","G","GG"],
    desc: "Nação Rubro-Negra. Adidas com listras horizontais vermelhas e pretas. Mengão é mundial.",
    price: 79.99,
    img: "imagens/flamengo-home.jpg"
  },
  {
    id: 14,
    team: "Palmeiras",
    league: "brasil",
    leagueLabel: "Brasil",
    season: "2024",
    version: "Alternativa",
    sizes: ["P","M","G","!GG"],
    desc: "Branco com verde e dourado. Puma — homenagem aos títulos libertadores.",
    price: 79.99,
    img: "imagens/palmeiras-away.jpg"
  },
  {
    id: 15,
    team: "Chelsea",
    league: "premier",
    leagueLabel: "Premier League",
    season: "2024/25",
    version: "Terceiro",
    sizes: ["S","M","L","XL"],
    desc: "Dourado arrojado no kit de terceiro. Nike x Chelsea — apenas 5000 unidades.",
    price: 114.99,
    img: "imagens/chelsea-third.jpg"
  },
  {
    id: 16,
    team: "AC Milan",
    league: "seriea",
    leagueLabel: "Serie A",
    season: "2024/25",
    version: "Especial",
    sizes: ["S","M","L"],
    desc: "Edição 125º aniversário. Rossoneri com patch comemorativo em ouro.",
    price: 124.99,
    img: "imagens/milan-special.jpg"
  }
];

/* ══════════════════════════════════════════════════════════
   2. ESTADO DA APP
   ══════════════════════════════════════════════════════════ */
let activeFilter = 'all';
let searchQuery  = '';

/* ══════════════════════════════════════════════════════════
   3. UTILITÁRIOS
   ══════════════════════════════════════════════════════════ */

/** Formata preço em euros */
const formatPrice = (n) => n.toFixed(2).replace('.', ',');

/** Retorna SVG do raio (reutilizável) */
const boltSVG = `
  <svg viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="9,0 2,13 7,13 7,24 14,11 9,11" fill="currentColor"/>
  </svg>`;

/**
 * Gera HTML dos chips de tamanho.
 * Tamanhos prefixados com "!" estão esgotados.
 */
const renderSizes = (sizes) =>
  sizes.map(s => {
    const out  = s.startsWith('!');
    const label = out ? s.slice(1) : s;
    return `<span class="size-chip${out ? ' out' : ''}" title="${out ? 'Esgotado' : 'Disponível'}">${label}</span>`;
  }).join('');

/** Placeholder SVG para imagens em falta */
const imgPlaceholder = (team) => {
  const initials = team.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 420">
      <rect width="320" height="420" fill="#181818"/>
      <!-- Camisa estilizada -->
      <path d="M90,60 L60,90 L80,100 L80,360 L240,360 L240,100 L260,90 L230,60 L200,80 C190,50 170,40 160,40 C150,40 130,50 120,80 Z" fill="#222" stroke="#333" stroke-width="2"/>
      <!-- Raio decorativo -->
      <polygon points="172,130 148,174 164,174 164,210 188,166 172,166" fill="#fff" opacity="0.15"/>
      <!-- Iniciais -->
      <text x="160" y="290" font-family="sans-serif" font-size="38" font-weight="900" fill="#fff" opacity="0.5" text-anchor="middle" letter-spacing="3">${initials}</text>
    </svg>
  `)}`;
};

/* ══════════════════════════════════════════════════════════
   4. RENDERIZAÇÃO DOS CARDS
   ══════════════════════════════════════════════════════════ */

/**
 * Cria o HTML de um card de camisa.
 * @param {Object} shirt - Dados da camisa
 * @param {number} index - Índice para delay da animação
 */
const createCardHTML = (shirt, index) => {
  const delay = Math.min(index * 60, 600); // max 600ms delay
  const isAlt = shirt.version !== 'Titular';

  return `
    <article
      class="shirt-card"
      role="listitem"
      style="animation-delay: ${delay}ms"
      aria-label="${shirt.team} — ${shirt.version} ${shirt.season}"
      data-id="${shirt.id}"
    >
      <!-- Imagem -->
      <div class="card-img">
        <img
          src="${shirt.img}"
          alt="Camisa ${shirt.team} ${shirt.version} ${shirt.season}"
          loading="lazy"
          onerror="this.src='${imgPlaceholder(shirt.team)}'"
        />
        <span class="card-badge${isAlt ? ' card-badge--alt' : ''}">${shirt.version}</span>
        <!-- Raio aparece no hover -->
        <div class="card-bolt">${boltSVG}</div>
      </div>

      <!-- Corpo -->
      <div class="card-body">
        <p class="card-league">${shirt.leagueLabel}</p>
        <h3 class="card-team">${shirt.team}</h3>
        <div class="card-meta">
          <span class="card-season">${shirt.season}</span>
          <span class="card-dot" aria-hidden="true"></span>
          <span class="card-version">${shirt.version}</span>
        </div>
        <p class="card-desc">${shirt.desc}</p>
        <div class="card-sizes" aria-label="Tamanhos disponíveis">
          ${renderSizes(shirt.sizes)}
        </div>
      </div>

      <!-- Rodapé: preço + CTA -->
      <div class="card-footer">
        <p class="card-price"><span>€</span>${formatPrice(shirt.price)}</p>
        <button class="card-cta" aria-label="Adicionar ${shirt.team} ao carrinho">
          ${boltSVG}
          Comprar
        </button>
      </div>
    </article>
  `;
};

/* ══════════════════════════════════════════════════════════
   5. FILTRAGEM E PESQUISA
   ══════════════════════════════════════════════════════════ */

/** Retorna camisas filtradas por liga e pesquisa */
const getFilteredShirts = () => {
  const q = searchQuery.toLowerCase().trim();
  return SHIRTS.filter(shirt => {
    // Filtro por liga
    const matchLeague = activeFilter === 'all' || shirt.league === activeFilter;
    // Pesquisa por texto (time, época, versão, liga, descrição)
    const matchSearch = !q || [
      shirt.team, shirt.season, shirt.version,
      shirt.leagueLabel, shirt.desc
    ].some(field => field.toLowerCase().includes(q));
    return matchLeague && matchSearch;
  });
};

/** Atualiza o grid com os resultados filtrados */
const renderGrid = () => {
  const grid       = document.getElementById('cardsGrid');
  const emptyState = document.getElementById('emptyState');
  const countEl    = document.getElementById('resultsCount');

  const filtered = getFilteredShirts();

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.hidden = false;
    countEl.textContent = 'Nenhum resultado';
    return;
  }

  emptyState.hidden = true;
  countEl.textContent = `${filtered.length} camisa${filtered.length !== 1 ? 's' : ''}`;

  // Inserir cards — re-trigger CSS animation resetando o DOM
  grid.innerHTML = filtered
    .map((shirt, i) => createCardHTML(shirt, i))
    .join('');
};

/* ══════════════════════════════════════════════════════════
   6. EVENTOS
   ══════════════════════════════════════════════════════════ */

/** Filtros de liga */
const initFilters = () => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualiza estado visual
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Atualiza estado e re-renderiza
      activeFilter = btn.dataset.filter;
      renderGrid();
    });
  });
};

/** Pesquisa */
const initSearch = () => {
  const input = document.getElementById('searchInput');
  if (!input) return;

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchQuery = input.value;
      renderGrid();
    }, 220); // debounce 220ms
  });

  // Toggle foco via botão header mobile
  const toggle = document.getElementById('searchToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      input.focus();
      // Scroll suave até ao catálogo
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
};

/** Menu mobile */
const initMobileMenu = () => {
  const btn  = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
  });

  // Fechar ao clicar num link
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
};

/** Botões "Comprar" — placeholder para futura integração de carrinho */
const initCartButtons = () => {
  document.getElementById('cardsGrid').addEventListener('click', e => {
    const cta = e.target.closest('.card-cta');
    if (!cta) return;

    const card   = cta.closest('.shirt-card');
    const id     = Number(card?.dataset.id);
    const shirt  = SHIRTS.find(s => s.id === id);
    if (!shirt) return;

    // Flash visual de confirmação
    cta.textContent = '';
    cta.insertAdjacentHTML('beforeend', boltSVG + ' Adicionado!');
    cta.style.background = '#e8e8e8';

    setTimeout(() => {
      cta.textContent = '';
      cta.insertAdjacentHTML('beforeend', boltSVG + ' Comprar');
      cta.style.background = '';
    }, 1400);

    // TODO: integrar com sistema de carrinho / e-commerce
    console.log(`[Volt Shirts] Adicionado ao carrinho:`, shirt);
  });
};

/* ══════════════════════════════════════════════════════════
   7. INIT
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
  initFilters();
  initSearch();
  initMobileMenu();
  initCartButtons();
});
