(function () {
  'use strict';

  /* ===== DOM Cache ===== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const preloader = $('#preloader');
  const scrollIndicator = $('#scrollIndicator');
  const scrollTopBtn = $('#scrollTopBtn');
  const themeToggle = $('#themeToggle');
  const navbar = $('#navbar');
  const navMenu = $('#navMenu');
  const hamburger = $('#hamburger');
  const navLinks = $$('.nav-link');
  const sections = $$('.section');
  const typingTitle = $('#typingTitle');
  const skillBars = $$('.sci-fill');
  const projectDetailBtns = $$('.project-details-btn');
  const modalOverlay = $('#modalOverlay');
  const modalClose = $('#modalClose');
  const modalContent = $('#modalContent');
  const contactForm = $('#contactForm');
  const heroImg = $('.hero-image-img');
  const projectCards = $$('.project-card');
  const particlesContainer = $('#particles');
  const statNumbers = $$('.stat-number[data-target]');
  const navLogo = $('.nav-logo');
  const footerLogo = $('.footer-logo');

  /* ===== Particles Generator ===== */

  /* ===== Particles Generator ===== */
  function createParticles(count = 35) {
    if (!particlesContainer) return;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      const dur = 15 + Math.random() * 15;
      particle.style.animationDuration = dur + 's';
      particle.style.animationDelay = Math.random() * 20 + 's';
      const size = 1.5 + Math.random() * 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.opacity = 0.1 + Math.random() * 0.3;
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();

  /* ===== Preloader ===== */
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      if (heroImg) heroImg.classList.remove('clip-reveal');
    }, 500);
  });

  /* ===== Hero Image Clip Reveal ===== */
  if (heroImg) {
    heroImg.classList.add('clip-reveal');
  }

  /* ===== Preloader ===== */
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      heroImg.classList.remove('clip-reveal');
    }, 500);
  });

  /* ===== Typing Effect ===== */
  const titles = [
    'Computer Science Graduate',
    'Backend .NET Developer',
    'Clean Architecture Advocate',
    'Open Source Enthusiast'
  ];
  let titleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    const current = titles[titleIdx];
    if (!isDeleting) {
      typingTitle.textContent = current.slice(0, charIdx++);
      if (charIdx > current.length) {
        isDeleting = true;
        typeSpeed = 1500;
        setTimeout(typeEffect, typeSpeed);
        return;
      }
      typeSpeed = 80;
    } else {
      typingTitle.textContent = current.slice(0, charIdx--);
      if (charIdx < 0) {
        isDeleting = false;
        charIdx = 0;
        titleIdx = (titleIdx + 1) % titles.length;
        typeSpeed = 500;
      } else {
        typeSpeed = 40;
      }
    }
    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  /* ===== Theme Toggle ===== */
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.innerHTML = isLight
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  /* ===== Mobile Nav ===== */
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  /* ===== Active Nav Link ===== */
  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    let activeId = 'hero';
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeId = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  }

  /* ===== Scroll Indicator ===== */
  function updateScrollIndicator() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollIndicator.style.width = progress + '%';
  }

  /* ===== Scroll to Top ===== */
  function toggleScrollTop() {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== Section Reveal ===== */
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ===== Animate Skill Bars ===== */
  const skillObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.style.width = target.dataset.width + '%';
          skillObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ===== Animate Stats Counter ===== */
  const statObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const duration = 1500;
          const startTime = performance.now();
          const startVal = 0;

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuad
            const eased = progress * (2 - progress);
            const current = Math.floor(eased * target);
            el.textContent = current;
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target;
            }
          }
          requestAnimationFrame(updateCounter);
          statObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => statObserver.observe(el));



  /* ===== Project Modal Data ===== */
  const projectData = {
    lifedrop: {
      title: 'LifeDrop',
      date: 'June 2026',
      description:
        'A scalable blood donation platform that enables real-time communication between donors and healthcare providers, manages donation requests, appointments, notifications, and secure authentication.',
      techs: [
        '.NET 10',
        'ASP.NET Core Web API',
        'PostgreSQL',
        'Entity Framework Core',
        'MediatR (CQRS)',
        'SignalR',
        'Redis',
        'Firebase Cloud Messaging',
        'QuestPDF',
        'Docker'
      ],
      features: [
        'Clean Architecture',
        'CQRS Pattern',
        'Domain Events',
        'Outbox Pattern',
        'JWT Authentication',
        'RBAC Authorization',
        'OTP Verification',
        'SignalR Real-Time Updates',
        'Redis Hybrid Cache',
        'Docker Containerization'
      ]
    },
    mechanicshop: {
      title: 'Mechanic Shop Management System',
      date: 'January 2026',
      description:
        'A full-stack workshop management system designed to streamline workshop operations and manage data efficiently.',
      techs: [
        '.NET 9',
        'ASP.NET Core Web API',
        'Blazor WebAssembly',
        'SQL Server',
        'Entity Framework Core',
        'Docker'
      ],
      features: [
        'Clean Architecture',
        'RESTful APIs',
        'Docker Containerization',
        'xUnit Testing',
        'Responsive User Interface'
      ]
    }
  };

  /* ===== Open Modal ===== */
  function openModal(key) {
    const data = projectData[key];
    if (!data) return;
    modalContent.innerHTML = `
      <h2>${data.title}</h2>
      <div class="modal-date"><i class="fas fa-calendar-alt"></i> ${data.date}</div>
      <p>${data.description}</p>
      <h3>Technologies Used</h3>
      <div class="modal-techs">
        ${data.techs.map(t => `<span>${t}</span>`).join('')}
      </div>
      <h3>Key Features</h3>
      <ul class="modal-features">
        ${data.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
      </ul>
    `;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  projectDetailBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(btn.dataset.project);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ===== Contact Form ===== */
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        contactForm.reset();
      }, 2000);
    }, 1200);
  });

  /* ===== Download Resume ===== */

  /* ===== 3D Tilt Effect on Project Cards ===== */
  projectCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform =
        `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ===== Scroll Events ===== */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollIndicator();
        toggleScrollTop();
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ===== Initial Nav Highlight ===== */
  updateActiveLink();

  /* ===== Easter Egg: Logo Bounce ===== */
  function bounceLogo(el) {
    if (!el) return;
    el.style.transition = 'transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.style.transform = 'scale(1.3)';
    setTimeout(() => {
      el.style.transform = 'scale(0.9)';
      setTimeout(() => {
        el.style.transform = 'scale(1.1)';
        setTimeout(() => {
          el.style.transform = 'scale(1)';
          setTimeout(() => {
            el.style.transition = '';
          }, 150);
        }, 100);
      }, 100);
    }, 150);
  }

  if (navLogo) {
    navLogo.addEventListener('click', () => bounceLogo(navLogo));
  }
  if (footerLogo) {
    footerLogo.addEventListener('click', () => bounceLogo(footerLogo));
  }

  /* ===== Console Easter Egg ===== */
  console.log(
    '%c👋 Hey there, curious developer!%c\n\n' +
    '%cThanks for checking out my portfolio!%c\n' +
    'If you\'re interested in the code, check out:\n' +
    'https://github.com/tareq-11/Portfolio\n\n' +
    '%c💡 Fun fact:%c This portfolio is built with pure HTML, CSS, and Vanilla JS — no frameworks!',
    'font-size: 20px; font-weight: bold; color: #6c63ff;',
    '',
    'font-size: 14px; color: #888;',
    '',
    'font-size: 14px; color: #6c63ff; font-weight: bold;',
    'font-size: 14px; color: #888;'
  );

  /* ===== Tab Title Easter Egg ===== */
  const originalTitle = document.title;
  let titleTimeout;

  document.addEventListener('visibilitychange', () => {
    clearTimeout(titleTimeout);
    if (document.hidden) {
      document.title = '👋 Come back soon!';
    } else {
      document.title = '✨ Tareq Almahameed | Backend .NET Developer';
      titleTimeout = setTimeout(() => {
        document.title = originalTitle;
      }, 3000);
    }
  });

})();
