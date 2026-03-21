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
/* ══════════════════════════════════════════════════════════
   NOTA SOBRE IMAGENS:
   - O campo `img` usa imgPlaceholder(team) como fallback automático
   - Para usar uma imagem real: substitui o valor por um caminho local
     ex: img: "imagens/man-city-home.jpg"
   - Ou por um URL directo de imagem (JPG/PNG/WEBP)
     ex: img: "https://exemplo.com/camisa.jpg"
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
    img: null   // null = usa placeholder SVG automático com cores do clube
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
    img: null
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
    img: null
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
    img: null
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
    img: null
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
    img: null
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
    img: null
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
    img: null
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
    img: null
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
    img: null
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
    img: null
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
    img: null
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
    img: null
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
    img: null
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
    img: null
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
    img: null
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

/**
 * Gera um placeholder SVG realista para cada clube.
 * Cada entrada define: cor principal, cor secundária, iniciais, padrão de camisa.
 * Usado quando não existe imagem real na pasta imagens/.
 */
const CLUB_STYLES = {
  // Premier League
  "Manchester City":  { bg: "#6CABDD", stripe: "#1C2C5B", text: "#fff", pattern: "stripes_v", initials: "MC" },
  "Arsenal":          { bg: "#EF0107", stripe: "#ffffff", text: "#fff", pattern: "stripes_sleeve", initials: "AFC" },
  "Liverpool":        { bg: "#C8102E", stripe: "#F6EB61", text: "#fff", pattern: "pinstripes", initials: "LFC" },
  "Chelsea":          { bg: "#034694", stripe: "#ffffff", text: "#fff", pattern: "plain", initials: "CFC" },
  // La Liga
  "Real Madrid":      { bg: "#ffffff", stripe: "#000000", text: "#000", pattern: "plain", initials: "RM" },
  "FC Barcelona":     { bg: "#A50044", stripe: "#004D98", text: "#fff", pattern: "stripes_v_dual", initials: "FCB" },
  "Atlético Madrid":  { bg: "#272E61", stripe: "#CB3524", text: "#fff", pattern: "stripes_h", initials: "ATM" },
  // Serie A
  "Juventus":         { bg: "#000000", stripe: "#ffffff", text: "#fff", pattern: "stripes_v_half", initials: "JUV" },
  "Inter de Milão":   { bg: "#010E80", stripe: "#000000", text: "#fff", pattern: "stripes_v_dual", initials: "INT" },
  "AC Milan":         { bg: "#FB090B", stripe: "#000000", text: "#fff", pattern: "stripes_v_dual", initials: "ACM" },
  // Ligue 1
  "PSG":              { bg: "#003F7C", stripe: "#EF1923", text: "#fff", pattern: "stripes_v_center", initials: "PSG" },
  "Olympique Lyon":   { bg: "#ffffff", stripe: "#1F1F1F", text: "#000", pattern: "plain", initials: "OL" },
  // Bundesliga
  "Bayern Munique":   { bg: "#DC052D", stripe: "#ffffff", text: "#fff", pattern: "stripes_sleeve", initials: "FCB" },
  "Borussia Dortmund":{ bg: "#FDE100", stripe: "#000000", text: "#000", pattern: "plain", initials: "BVB" },
  // Brasil
  "Flamengo":         { bg: "#E3001B", stripe: "#000000", text: "#fff", pattern: "stripes_h_thick", initials: "FLA" },
  "Palmeiras":        { bg: "#006437", stripe: "#ffffff", text: "#fff", pattern: "stripes_sleeve", initials: "PAL" },
};

const imgPlaceholder = (team) => {
  const s = CLUB_STYLES[team] || { bg: "#181818", stripe: "#333", text: "#fff", pattern: "plain", initials: team.slice(0,3).toUpperCase() };
  const bg = s.bg, stripe = s.stripe, textCol = s.text;
  const init = s.initials;

  // Padrão da camisa (stripes/plain)
  let patternDef = '';
  let patternFill = 'none';

  if (s.pattern === 'stripes_v') {
    patternDef = `<defs><pattern id="p" x="0" y="0" width="20" height="1" patternUnits="userSpaceOnUse"><rect width="10" height="1" fill="${stripe}" opacity="0.35"/></pattern></defs>`;
    patternFill = 'url(#p)';
  } else if (s.pattern === 'stripes_v_dual') {
    patternDef = `<defs><pattern id="p" x="0" y="0" width="40" height="1" patternUnits="userSpaceOnUse"><rect x="0" width="20" height="1" fill="${bg}"/><rect x="20" width="20" height="1" fill="${stripe}"/></pattern></defs>`;
    patternFill = 'url(#p)';
  } else if (s.pattern === 'stripes_v_half') {
    // Metade preta, metade branca (Juventus)
    patternDef = '';
    patternFill = 'none';
  } else if (s.pattern === 'stripes_h' || s.pattern === 'stripes_h_thick') {
    const h = s.pattern === 'stripes_h_thick' ? 28 : 18;
    patternDef = `<defs><pattern id="p" x="0" y="0" width="1" height="${h*2}" patternUnits="userSpaceOnUse"><rect width="1" height="${h}" fill="${stripe}" opacity="0.55"/></pattern></defs>`;
    patternFill = 'url(#p)';
  } else if (s.pattern === 'pinstripes') {
    patternDef = `<defs><pattern id="p" x="0" y="0" width="12" height="1" patternUnits="userSpaceOnUse"><rect x="5" width="2" height="1" fill="${stripe}" opacity="0.25"/></pattern></defs>`;
    patternFill = 'url(#p)';
  } else if (s.pattern === 'stripes_v_center') {
    patternDef = `<defs><pattern id="p" x="0" y="0" width="60" height="1" patternUnits="userSpaceOnUse"><rect x="20" width="20" height="1" fill="${stripe}" opacity="0.6"/></pattern></defs>`;
    patternFill = 'url(#p)';
  }

  // Camisa SVG detalhada
  const shirtPath = "M95,70 L58,105 L82,118 L82,370 L238,370 L238,118 L262,105 L225,70 L196,88 C186,54 174,42 160,42 C146,42 134,54 124,88 Z";
  const collarPath = "M124,88 C134,54 146,42 160,42 C174,42 186,54 196,88 C186,78 174,72 160,72 C146,72 134,78 124,88 Z";

  // Divisão metade (Juventus style)
  const halfLeft  = s.pattern === 'stripes_v_half' ? `<clipPath id="cl"><path d="${shirtPath}"/></clipPath><rect x="82" y="42" width="78" height="328" fill="${bg}" clip-path="url(#cl)"/><rect x="160" y="42" width="78" height="328" fill="${stripe}" clip-path="url(#cl)"/>` : '';

  // Manga colorida (sleeve accent)
  const sleeveAccent = s.pattern === 'stripes_sleeve' ? `
    <polygon points="82,118 58,105 82,180" fill="${stripe}" opacity="0.5"/>
    <polygon points="238,118 262,105 238,180" fill="${stripe}" opacity="0.5"/>
  ` : '';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 420">
    <!-- Fundo -->
    <rect width="320" height="420" fill="#111"/>
    ${patternDef}

    ${s.pattern === 'stripes_v_half' ? halfLeft : `
    <!-- Corpo da camisa (cor base) -->
    <path d="${shirtPath}" fill="${bg}"/>
    <!-- Padrão overlay -->
    ${patternFill !== 'none' ? `<path d="${shirtPath}" fill="${patternFill}"/>` : ''}
    `}

    <!-- Detalhes manga -->
    ${sleeveAccent}

    <!-- Contorno da camisa -->
    <path d="${shirtPath}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>

    <!-- Gola -->
    <path d="${collarPath}" fill="${stripe}" opacity="0.7"/>
    <path d="${collarPath}" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>

    <!-- Raio decorativo no peito -->
    <polygon points="168,145 148,183 163,183 163,218 184,180 169,180"
      fill="${textCol}" opacity="0.12"/>

    <!-- Iniciais do clube -->
    <text x="160" y="310"
      font-family="Arial Black, sans-serif"
      font-size="32" font-weight="900"
      fill="${textCol}" opacity="0.45"
      text-anchor="middle" letter-spacing="2">${init}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
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
          src="${shirt.img || imgPlaceholder(shirt.team)}"
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
