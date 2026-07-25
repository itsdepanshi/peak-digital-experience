/* ---------- Data ---------- */
const SERVICES = [
  { title: "Web Development", desc: "Fast, scalable sites and web apps engineered with modern stacks.", icon: '<path d="M3 4h18v14H3z"/><path d="M3 8h18M8 12h4"/>' },
  { title: "UI/UX Design", desc: "Interfaces that feel intuitive, beautiful, and drive real conversion.", icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18"/>' },
  { title: "Branding", desc: "Identity systems that make your company impossible to forget.", icon: '<path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>' },
  { title: "SEO", desc: "Technical + content SEO that lifts you into the top results and keeps you there.", icon: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>' },
  { title: "Digital Marketing", desc: "Data-driven campaigns across search, social and paid — measured to the click.", icon: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>' },
  { title: "AI Automation", desc: "Custom AI agents and workflows that automate the repetitive work.", icon: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h.01M15 9h.01M8 14c1.5 1.5 6.5 1.5 8 0"/>' },
];

const TESTIMONIALS = [
  { quote: "NorthPeak rebuilt our platform in six weeks. Sign-ups doubled the month after launch.", name: "Amelia Chen", role: "COO, Lumen Health", initials: "AC" },
  { quote: "The most collaborative agency we've worked with. They own outcomes, not just deliverables.", name: "Marcus Feld", role: "Founder, Orbital Labs", initials: "MF" },
  { quote: "Beautiful design, world-class engineering, and an AI workflow that saves us 30 hours a week.", name: "Priya Natarajan", role: "VP Marketing, Vanta", initials: "PN" },
];

const PLANS = [
  {
    name: "Starter", price: "$2.4k", period: "/ project",
    desc: "For early-stage teams that need a beautiful site, fast.",
    features: ["5-page marketing site", "Custom design system", "CMS integration", "Basic on-page SEO", "2 weeks of support"],
    cta: "Start with Starter", popular: false,
  },
  {
    name: "Growth", price: "$6.8k", period: "/ month",
    desc: "Our most-loved plan — a full product & growth partner.",
    features: ["Everything in Starter", "Product design & prototyping", "Full-stack development", "Weekly experiments & analytics", "Priority Slack support"],
    cta: "Choose Growth", popular: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "",
    desc: "Dedicated squads for complex platforms and AI systems.",
    features: ["Dedicated product squad", "AI agents & automations", "Advanced integrations & SSO", "Quarterly roadmap workshops", "SLA & compliance ready"],
    cta: "Talk to sales", popular: false,
  },
];

/* ---------- Renderers ---------- */
function renderServices() {
  const el = document.getElementById("services-grid");
  el.innerHTML = SERVICES.map(s => `
    <article class="card service">
      <div class="service__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${s.icon}</svg>
      </div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </article>`).join("");
}

function renderTestimonials() {
  const el = document.getElementById("testimonials");
  el.innerHTML = TESTIMONIALS.map(t => `
    <article class="card">
      <p class="t__quote">"${t.quote}"</p>
      <div class="t__author">
        <div class="t__avatar" aria-hidden="true">${t.initials}</div>
        <div>
          <div class="t__name">${t.name}</div>
          <div class="t__role">${t.role}</div>
        </div>
      </div>
    </article>`).join("");
}

function renderPricing() {
  const el = document.getElementById("pricing-grid");
  el.innerHTML = PLANS.map(p => `
    <article class="card plan ${p.popular ? "plan--popular" : ""}">
      ${p.popular ? '<span class="plan__badge">Most Popular</span>' : ""}
      <div class="plan__name">${p.name}</div>
      <div class="plan__price">${p.price}<small>${p.period}</small></div>
      <p class="plan__desc">${p.desc}</p>
      <ul class="plan__features">${p.features.map(f => `<li>${f}</li>`).join("")}</ul>
      <a href="#contact" class="btn ${p.popular ? "btn--primary" : "btn--glass"} btn--full">${p.cta}</a>
    </article>`).join("");
}

/* ---------- Interactions ---------- */
function initNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("is-open")));
}

function initReveal() {
  const els = document.querySelectorAll(".reveal, .stagger");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
  els.forEach(e => io.observe(e));
}

function initCardGlow() {
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

function initCounters() {
  const nums = document.querySelectorAll(".stat__num");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      const dur = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
}

/* ---------- Form ---------- */
function initForm() {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");

  const validators = {
    name: (v) => v.trim().length >= 2 || "Please enter your name.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Please enter a valid email.",
    company: () => true,
    message: (v) => v.trim().length >= 10 || "Message should be at least 10 characters.",
  };

  const setError = (name, msg, value) => {
    const field = form.querySelector(`[name="${name}"]`).closest(".field");
    const err = form.querySelector(`.err[data-for="${name}"]`);
    if (msg === true || !msg) {
      field.classList.remove("has-error");
      if (err) err.textContent = "";
      if (value && value.trim()) field.classList.add("is-valid");
      else field.classList.remove("is-valid");
    } else {
      field.classList.add("has-error");
      field.classList.remove("is-valid");
      if (err) err.textContent = msg;
    }
  };

  form.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("blur", () => {
      const res = validators[input.name](input.value);
      setError(input.name, res, input.value);
    });
    input.addEventListener("input", () => {
      // Clear errors as user types
      const field = input.closest(".field");
      if (field.classList.contains("has-error")) {
        const res = validators[input.name](input.value);
        if (res === true) setError(input.name, true, input.value);
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    let firstBad = null;
    Object.keys(validators).forEach(name => {
      const input = form.querySelector(`[name="${name}"]`);
      const res = validators[name](input.value);
      setError(name, res, input.value);
      if (res !== true) { ok = false; if (!firstBad) firstBad = input; }
    });
    if (!ok) { firstBad && firstBad.focus(); return; }
    success.hidden = false;
    form.reset();
    form.querySelectorAll(".field").forEach(f => f.classList.remove("is-valid"));
    setTimeout(() => { success.hidden = true; }, 6000);
  });
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  renderTestimonials();
  renderPricing();
  initNav();
  initReveal();
  initCardGlow();
  initCounters();
  initForm();
  document.getElementById("year").textContent = new Date().getFullYear();
});
