/* ============================================================
   GUSTAVO FONTOURA — PORTFÓLIO
   Interatividade: tema, scroll, filtros, menu mobile, formulário
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== TEMA CLARO/ESCURO ====================
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Verifica preferência salva ou do sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', initialTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ==================== MENU MOBILE ====================
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ==================== SCROLL SUAVE (fallback para navegadores sem CSS smooth) ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==================== NAVBAR: BORDA AO ROLAR ====================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.borderBottomColor = 'var(--border-light)';
    } else {
      navbar.style.borderBottomColor = 'var(--border)';
    }
  }, { passive: true });

  // ==================== FILTRO DE PROJETOS ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualiza botão ativo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const tags = card.getAttribute('data-tags') || '';
        if (filter === 'all' || tags.includes(filter)) {
          card.classList.remove('hidden');
          // Reinicia animação de entrada
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ==================== FORMULÁRIO SIMULADO ====================
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) return;

    // Simula envio — aqui você integraria com um serviço real (EmailJS, Formspree, etc.)
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Mensagem enviada!';
    btn.style.backgroundColor = '#22c55e';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.backgroundColor = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });

  // ==================== ANIMAÇÕES DE ENTRADA (Intersection Observer) ====================
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // ==================== NAV LINK ATIVO (seção visível) ====================
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksAll.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--text-primary)'
            : '';
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64}px 0px 0px 0px`
  });

  sections.forEach(section => sectionObserver.observe(section));
});
