"use strict";

/* -------------------------
   UI: MENÚ + SCROLL
-------------------------- */
const mobileMenu = document.getElementById("mobileMenu");
const hamburgerBtn = document.getElementById("hamburgerBtn");

function openMobileMenu() {
  mobileMenu.classList.add("active");
  hamburgerBtn.setAttribute("aria-expanded", "true");
}

function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  hamburgerBtn.setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.contains("active");
  isOpen ? closeMobileMenu() : openMobileMenu();
}

hamburgerBtn?.addEventListener("click", toggleMobileMenu);

document.querySelectorAll(".mobile-link").forEach((a) => {
  a.addEventListener("click", () => closeMobileMenu());
});

document.querySelectorAll("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-scroll");
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  });
});

/* -------------------------
   DATA NORMALIZADA
   (mismo contenido, solo cat sin tildes)
-------------------------- */
const CAT_LABEL = {
  economia: "Economía",
  empresa: "Empresa",
  marketing: "Marketing",
  turismo: "Turismo",
  educacion: "Educación",
};

const allPrompts = [
  { title: "Cómo usar ChatGPT para crear actividades de economía", desc: "Genera actividades sobre inflación, oferta y demanda", cat: "economia", ia: "ChatGPT", level: "Bachillerato" },
  { title: "10 prompts de IA que todo profesor debe conocer", desc: "Colección de prompts optimizados para docencia", cat: "educacion", ia: "ChatGPT", level: "Docentes" },
  { title: "Actividad para explicar PIB en 30 minutos", desc: "Simulación interactiva del concepto PIB", cat: "economia", ia: "Claude", level: "ESO" },
  { title: "Proyecto de empresa paso a paso", desc: "Guía completa para desarrollar simulación empresarial", cat: "empresa", ia: "ChatGPT", level: "FP" },
  { title: "Generador de casos empresariales", desc: "Crea casos realistas para análisis", cat: "empresa", ia: "Gemini", level: "Bachillerato" },
  { title: "Marketing digital: 5 estrategias para estudiantes", desc: "Actividades prácticas de marketing", cat: "marketing", ia: "Perplexity", level: "FP" },
  { title: "Diseño de producto turístico", desc: "Guía para crear experiencias turísticas", cat: "turismo", ia: "Claude", level: "FP" },
  { title: "Análisis de rentabilidad empresarial", desc: "Cálculo de ROI y margen", cat: "empresa", ia: "ChatGPT", level: "Bachillerato" },
  { title: "Emprendimiento: del concepto al mercado", desc: "Ruta completa para proyectos de emprendimiento", cat: "empresa", ia: "ChatGPT", level: "FP" },
  { title: "Economía circular y sostenibilidad", desc: "Actividad sobre modelos económicos sostenibles", cat: "economia", ia: "Claude", level: "Bachillerato" },
  { title: "Segmentación de mercado avanzada", desc: "Identifica y analiza segmentos", cat: "marketing", ia: "Gemini", level: "Universidad" },
  { title: "Negociación empresarial: dinámica de clase", desc: "Ejercicio de negociación con roles", cat: "empresa", ia: "ChatGPT", level: "FP" },
  { title: "Economía global: comercio internacional", desc: "Simulación de tratados comerciales", cat: "economia", ia: "Perplexity", level: "Bachillerato" },
  { title: "Análisis de competencia y FODA", desc: "Matriz completa de análisis estratégico", cat: "empresa", ia: "Claude", level: "FP" },
  { title: "Turismo gastronómico: proyecto educativo", desc: "Crear experiencias turísticas gastronómicas", cat: "turismo", ia: "ChatGPT", level: "Bachillerato" },
  { title: "Decisiones empresariales con datos", desc: "Toma de decisiones basada en análisis", cat: "empresa", ia: "Gemini", level: "Universidad" },
  { title: "Marketing en redes sociales para marcas jóvenes", desc: "Estrategia de social media", cat: "marketing", ia: "ChatGPT", level: "FP" },
  { title: "Finanzas personales: presupuesto familiar", desc: "Actividad sobre gestión financiera personal", cat: "economia", ia: "Claude", level: "ESO" },
  { title: "Innovación en empresas: disrupción digital", desc: "Cómo la tecnología transforma mercados", cat: "empresa", ia: "Perplexity", level: "Bachillerato" },
  { title: "Destinos turísticos: análisis de sostenibilidad", desc: "Evaluación del impacto turístico", cat: "turismo", ia: "Claude", level: "FP" },
  { title: "Economía del comportamiento: sesgos cognitivos", desc: "Cómo nuestros sesgos afectan decisiones", cat: "economia", ia: "Gemini", level: "Universidad" },
  { title: "Plan de marketing completo: from scratch", desc: "Metodología completa de marketing", cat: "marketing", ia: "ChatGPT", level: "FP" },
  { title: "Emprendimiento social: negocio con impacto", desc: "Empresas que generan cambio social", cat: "empresa", ia: "Claude", level: "Bachillerato" },
  { title: "Turismo de experiencias: diseño emocional", desc: "Crear experiencias memorables", cat: "turismo", ia: "ChatGPT", level: "FP" },
  { title: "Análisis de tendencias de mercado", desc: "Identificar oportunidades con datos", cat: "marketing", ia: "Perplexity", level: "Universidad" },
  { title: "Gestión de crisis empresarial", desc: "Cómo responder a problemas de reputación", cat: "empresa", ia: "Gemini", level: "Bachillerato" },
  { title: "Inflación y su impacto económico", desc: "Actividad sobre inflación y precios", cat: "economia", ia: "ChatGPT", level: "ESO" },
  { title: "Branding: identidad de marca", desc: "Construcción de identidad corporativa", cat: "marketing", ia: "Claude", level: "FP" },
  { title: "Turismo cultural: preservación y desarrollo", desc: "Equilibrio entre turismo y conservación", cat: "turismo", ia: "ChatGPT", level: "Bachillerato" },
  { title: "Cadena de valor: análisis de Porter", desc: "Desglosa la cadena de valor empresarial", cat: "empresa", ia: "Gemini", level: "Universidad" },
  { title: "Economía verde y emprendimiento sostenible", desc: "Negocios que cuidan el planeta", cat: "economia", ia: "Perplexity", level: "FP" },
  { title: "Precio y estrategia de precios", desc: "Modelos de fijación de precios", cat: "marketing", ia: "Claude", level: "Bachillerato" },
  { title: "Modelos de negocio innovadores", desc: "Canvas de modelo de negocio", cat: "empresa", ia: "ChatGPT", level: "FP" },
  { title: "Turismo digital: metaverso y experiencias", desc: "Tecnología en experiencias turísticas", cat: "turismo", ia: "Gemini", level: "Universidad" },
  { title: "Desempleo y políticas de empleo", desc: "Actividad sobre mercado laboral", cat: "economia", ia: "ChatGPT", level: "Bachillerato" },
  { title: "Customer journey mapping", desc: "Mapea la experiencia del cliente", cat: "marketing", ia: "Claude", level: "FP" },
  { title: "Competitividad empresarial", desc: "Estrategias para ser competitivos", cat: "empresa", ia: "Perplexity", level: "Universidad" },
  { title: "Turismo de negocios: eventos y congresos", desc: "Gestión de eventos corporativos", cat: "turismo", ia: "ChatGPT", level: "FP" },
  { title: "Comercio electrónico: oportunidades", desc: "E-commerce como modelo de negocio", cat: "empresa", ia: "Gemini", level: "Bachillerato" },
  { title: "Publicidad e impacto psicológico", desc: "Cómo funciona la publicidad", cat: "marketing", ia: "Claude", level: "ESO" },
  { title: "Inversión inmobiliaria: rentabilidad", desc: "Análisis de inversión en inmuebles", cat: "economia", ia: "ChatGPT", level: "Bachillerato" },
  { title: "RSC: Responsabilidad Social Corporativa", desc: "Impacto social de la empresa", cat: "empresa", ia: "Perplexity", level: "FP" },
  { title: "Turismo y tradición: preservación cultural", desc: "Cómo el turismo preserva culturas", cat: "turismo", ia: "Claude", level: "Bachillerato" },
  { title: "Dinámicas de liderazgo empresarial", desc: "Estilos de liderazgo y efectividad", cat: "empresa", ia: "Gemini", level: "Universidad" },
  { title: "Estrategia de distribución: canales", desc: "Canales de distribución y logística", cat: "marketing", ia: "ChatGPT", level: "FP" },
  { title: "Recursos naturales y economía", desc: "Explotación sostenible de recursos", cat: "economia", ia: "Claude", level: "Bachillerato" },
  { title: "Propuesta de valor: diferenciación", desc: "Cómo diferenciarse en el mercado", cat: "empresa", ia: "Perplexity", level: "FP" },
  { title: "Seguridad alimentaria en turismo", desc: "Calidad y seguridad en gastronomía turística", cat: "turismo", ia: "ChatGPT", level: "ESO" },
  { title: "Alianzas estratégicas y joint ventures", desc: "Colaboraciones empresariales", cat: "empresa", ia: "Gemini", level: "Universidad" },
  { title: "Community management: gestión de comunidad", desc: "Estrategia de redes sociales", cat: "marketing", ia: "Claude", level: "FP" },
];

const allBlog = [
  {
    icon: "🤖",
    title: "Cómo usar ChatGPT para crear actividades de economía",
    summary: "Guía práctica para generar actividades con IA en tiempo récord.",
    content: "<h2>Cómo usar ChatGPT para crear actividades de economía</h2><p>La inteligencia artificial ha transformado la forma en que preparamos nuestras clases...</p>"
  },
  {
    icon: "💡",
    title: "10 prompts de IA que todo profesor debería conocer",
    summary: "Colección de prompts optimizados para preparación de clases.",
    content: "<h2>10 prompts de IA que todo profesor debería conocer</h2><p>He compilado los 10 prompts que más uso...</p>"
  },
  // (pega aquí el resto de tu array allBlog tal cual)
];

/* -------------------------
   PROMPTS: FILTRO + PAGINACIÓN BIEN
-------------------------- */
const promptsContainer = document.getElementById("promptsContainer");
const loadMorePromptsBtn = document.getElementById("loadMorePrompts");

const categoryFilter = document.getElementById("categoryFilter");
const iaFilter = document.getElementById("iaFilter");
const levelFilter = document.getElementById("levelFilter");

let promptsLimit = 12;

function getFilteredPrompts() {
  const cat = categoryFilter?.value || "";
  const ia = iaFilter?.value || "";
  const lvl = levelFilter?.value || "";

  return allPrompts.filter(p =>
    (!cat || p.cat === cat) &&
    (!ia || p.ia === ia) &&
    (!lvl || p.level === lvl)
  );
}

function renderPrompts() {
  const filtered = getFilteredPrompts();
  const visible = filtered.slice(0, promptsLimit);

  promptsContainer.innerHTML = visible.map(p => `
    <div class="card">
      <span class="badge badge-${p.cat}">${CAT_LABEL[p.cat] ?? p.cat}</span>
      <div class="card-title" style="margin-top:0.75rem;font-size:0.95rem;">${p.title}</div>
      <div class="card-text" style="font-size:0.85rem;margin-bottom:1rem;">${p.desc}</div>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;font-size:0.75rem;">
        <span style="background:#f0f6ff;color:#0066CC;padding:0.25rem 0.5rem;border-radius:4px;">🤖 ${p.ia}</span>
        <span style="background:#f0f6ff;color:#0066CC;padding:0.25rem 0.5rem;border-radius:4px;">⭐ ${p.level}</span>
      </div>
    </div>
  `).join("");

  const hasMore = promptsLimit < filtered.length;
  loadMorePromptsBtn.style.display = hasMore ? "block" : "none";
}

function resetPromptsLimit() {
  promptsLimit = 12;
}

loadMorePromptsBtn?.addEventListener("click", () => {
  promptsLimit += 12;
  renderPrompts();
});

[categoryFilter, iaFilter, levelFilter].forEach(sel => {
  sel?.addEventListener("change", () => {
    resetPromptsLimit();
    renderPrompts();
  });
});

/* -------------------------
   BLOG: RENDER + MODAL SIN FUGAS
-------------------------- */
const blogContainer = document.getElementById("blogContainer");
const loadMoreBlogBtn = document.getElementById("loadMoreBlog");
let blogLimit = 6;

function renderBlog() {
  const visible = allBlog.slice(0, blogLimit);

  blogContainer.innerHTML = visible.map((b, idx) => `
    <div class="card">
      <div style="font-size:2.5rem;margin-bottom:1rem;">${b.icon}</div>
      <div class="card-title">${b.title}</div>
      <div class="card-text">${b.summary}</div>
      <button class="btn btn-secondary" style="width:100%;margin-top:1rem;font-size:0.85rem;" data-article="${idx}" type="button">
        Leer artículo
      </button>
    </div>
  `).join("");

  loadMoreBlogBtn.style.display = blogLimit >= allBlog.length ? "none" : "block";
}

loadMoreBlogBtn?.addEventListener("click", () => {
  blogLimit += 6;
  renderBlog();
});

function closeArticleModal() {
  const modal = document.getElementById("articleModal");
  if (modal) modal.remove();
}

function openArticleModal(index) {
  const article = allBlog[index];
  if (!article) return;

  const modal = document.createElement("div");
  modal.id = "articleModal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.style.cssText = `
    position:fixed; inset:0; background: rgba(0,0,0,0.6);
    display:flex; align-items:center; justify-content:center;
    z-index:2000; padding:1rem;
  `;

  modal.innerHTML = `
    <div style="background:white;border-radius:16px;max-width:800px;width:100%;max-height:85vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
      <div style="position:sticky;top:0;background:white;border-bottom:1px solid #e5e7eb;padding:1.5rem;display:flex;justify-content:space-between;align-items:center;z-index:10;">
        <div style="flex:1;"></div>
        <div style="font-size:2rem;">${article.icon}</div>
        <button id="closeModalBtn" type="button" aria-label="Cerrar" style="flex:1;text-align:right;background:none;border:none;font-size:1.5rem;cursor:pointer;color:#999;">✕</button>
      </div>
      <div style="padding:2rem;font-family:'Geist',sans-serif;color:#333;line-height:1.8;">
        ${article.content}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeBtn = document.getElementById("closeModalBtn");
  closeBtn?.addEventListener("click", closeArticleModal, { once: true });

  modal.addEventListener("click", (e) => { if (e.target === modal) closeArticleModal(); });

  const onKeyDown = (e) => { if (e.key === "Escape") closeArticleModal(); };
  document.addEventListener("keydown", onKeyDown, { once: true });
}

blogContainer?.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-article]");
  if (!btn) return;
  const idx = Number(btn.getAttribute("data-article"));
  openArticleModal(idx);
});

/* -------------------------
   INIT
-------------------------- */
renderPrompts();
renderBlog();
