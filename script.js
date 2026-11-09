/**
 * FACHRI YUMANDA PUTRA - PORTFOLIO INTERACTIVITY
 * Faithful to Canva Web Design with Smooth Section-Based Scrolling & ScrollSpy
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const navbar = document.getElementById('mainHeader');
  const navTabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('.page-section');
  const indicatorDots = document.querySelectorAll('.indicator-dot');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  // Modals & Triggers
  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const btnLihatProjects = document.querySelectorAll('.btn-lihat-project');

  const cvModal = document.getElementById('cvModal');
  const btnUnduhCv = document.getElementById('btnUnduhCv');
  const cvModalCloseBtn = document.getElementById('cvModalCloseBtn');
  const btnDownloadPdf = document.getElementById('btnDownloadPdf');

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const btnSubmitMessage = document.getElementById('btnSubmitMessage');
  const toastContainer = document.getElementById('toastContainer');

  // Skills Section for Animation Trigger
  const skillCards = document.querySelectorAll('.skill-card-bar');

  // --- Project Data for Modals ---
  const projectsData = {
    'skripsi-gis': {
      title: 'Rancang Bangun Sistem Deteksi Titik Rawan Kecelakaan Lalu Lintas (Skripsi)',
      category: 'Web GIS • Decision Support System',
      badge: 'Skripsi / Tugas Akhir',
      image: 'assets/images/gis.png',
      description: 'Mengembangkan Web GIS Decision Support System untuk pemetaan dan deteksi titik rawan kecelakaan lalu lintas menggunakan metode spatial clustering DBSCAN, kalkulasi jarak Haversine, dan pembobotan AEK (Angka Ekuivalensi Kecelakaan). Sistem ini membantu instansi terkait dalam mengidentifikasi area berisiko tinggi dan mengambil keputusan preventif secara presisi.',
      features: [
        'Pemetaan spasial interaktif titik kecelakaan berbasis Leaflet.js',
        'Implementasi algoritma DBSCAN untuk pengelompokan zona titik rawan otomatis',
        'Kalkulasi jarak Haversine dan pembobotan indeks AEK untuk ranking tingkat kerawanan',
        'Visualisasi cluster data spasial dan filter rentang waktu kecelakaan',
        'Backend modular dengan Python Flask dan basis data spasial PostgreSQL'
      ],
      techStack: ['Python (Flask)', 'PostgreSQL', 'Leaflet.js', 'scikit-learn', 'geopy', 'HTML5 & CSS3', 'JavaScript ES6+'],
      demoUrl: '#'
    },
    'pln-monitoring': {
      title: 'Aplikasi Mobile Monitoring Inspeksi Tier 2 (PT PLN Persero)',
      category: 'Mobile Application • Enterprise Industrial System',
      badge: 'PT PLN (Persero) UP3 Lhokseumawe',
      image: 'assets/images/inspeksitier2.jpeg',
      description: 'Aplikasi mobile berbasis Flutter yang dikembangkan selama masa magang di PT PLN (Persero) UP3 Lhokseumawe. Berfungsi untuk mencatat, memvalidasi, dan memonitor data inspeksi peralatan kelistrikan Tier 2 secara real-time dengan integrasi backend Google Sheets dan Google Apps Script, serta sinkronisasi pencatatan logistik gudang via SAP.',
      features: [
        'Formulir inspeksi kelistrikan Tier 2 interaktif dengan validasi data lapangan',
        'Sinkronisasi data real-time ke backend Google Sheets via Google Apps Script API',
        'Dashboard status pemantauan inspeksi aktif dan rekapitulasi temuan anomali',
        'Pencatatan dan pengelolaan aliran material logistik gudang Lancang Garam via sistem SAP',
        'Antarmuka responsif dan ramah pengguna bagi teknisi operasional lapangan'
      ],
      techStack: ['Flutter', 'Dart', 'Google Apps Script', 'Google Sheets API', 'SAP Logistics Module', 'REST API'],
      demoUrl: '#'
    }
  };

  // --- Toast Notification Helper ---
  function showToast(message, icon = '✓', duration = 3500) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="font-weight: 700;">${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // --- Real-Time ScrollSpy (Updates active nav tab & side indicator as user scrolls down) ---
  function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 160;
    let currentSectionId = 'home';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Special case: if near bottom of page, activate last section
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
      currentSectionId = 'contact-form';
    }

    // Update Navbar Tabs
    navTabs.forEach(tab => {
      const targetSection = tab.getAttribute('data-section');
      // If contact-form is active, keep 'contact' highlighted in navbar
      if (targetSection === currentSectionId || (currentSectionId === 'contact-form' && targetSection === 'contact')) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update Side Dot Indicators
    indicatorDots.forEach(dot => {
      const target = dot.getAttribute('data-target');
      if (target === currentSectionId) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Navbar Scrolled Glass State
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateActiveNavigation, { passive: true });
  updateActiveNavigation(); // Initial run

  // --- Side Indicator Dots Click Handler ---
  indicatorDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Smooth Scroll for All Internal Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu if open
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
        }
      }
    });
  });

  // --- Mobile Hamburger Menu Toggle ---
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // Close mobile menu on click outside
  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('open')) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    }
  });

  // --- Skills Section Animation via Intersection Observer ---
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('animated');
          }, index * 120);
        });
      }
    });
  }, { threshold: 0.25 });

  const keahlianSection = document.getElementById('keahlian');
  if (keahlianSection) {
    skillObserver.observe(keahlianSection);
  }

  // --- Project Modal Functions ---
  function populateProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return false;

    modalBody.innerHTML = `
      <div class="project-modal-content">
        <div class="modal-media-container" style="border-radius: 14px; overflow: hidden; margin-bottom: 1.5rem; aspect-ratio: 16/9; background: #f4f4f5; border: 1px solid #e4e4e7;">
          <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <span class="tag-chip" style="margin-bottom: 0.8rem; display: inline-block;">${project.badge}</span>
        <h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 0.4rem; color: var(--text-dark);">${project.title}</h2>
        <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 1.2rem;">${project.category}</p>
        
        <p style="font-size: 1rem; line-height: 1.7; color: var(--text-medium); margin-bottom: 1.5rem;">${project.description}</p>
        
        <h3 style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.8rem;">Fitur Utama</h3>
        <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 8px; margin-bottom: 1.8rem;">
          ${project.features.map(feat => `
            <li style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.92rem; color: var(--text-medium);">
              <span style="color: #18181b; font-weight: bold;">✔</span>
              <span>${feat}</span>
            </li>
          `).join('')}
        </ul>

        <h3 style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.8rem;">Teknologi yang Digunakan</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 2rem;">
          ${project.techStack.map(tech => `
            <span class="tag-chip">${tech}</span>
          `).join('')}
        </div>

        <div style="display: flex; gap: 12px; justify-content: flex-end; border-top: 1px solid #e4e4e7; padding-top: 1.2rem;">
          <button type="button" class="btn-contact-me btn-modal-dismiss" style="padding: 8px 22px; font-size: 0.88rem;">
            Tutup
          </button>
        </div>
      </div>
    `;

    const dismissBtn = modalBody.querySelector('.btn-modal-dismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', closeProjectModal);
    }
    return true;
  }

  function openProjectModal(projectId) {
    if (!populateProjectModal(projectId)) return;
    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btnLihatProjects.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = btn.getAttribute('data-project');
      const card = btn.closest('.project-showcase-card');

      if (!card) {
        openProjectModal(projectId);
        return;
      }

      // Hindari multiple trigger bersamaan
      if (document.querySelector('.project-card-flip-clone')) return;

      // Render isi modal
      if (!populateProjectModal(projectId)) return;

      // Clone kartu asli
      const rect = card.getBoundingClientRect();
      const clone = card.cloneNode(true);
      clone.classList.add('project-card-flip-clone');
      clone.classList.remove('reveal', 'reveal-left', 'reveal-right', 'active');
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.margin = '0';
      clone.style.transform = 'perspective(1400px) rotateY(0deg) scale(1)';

      card.style.opacity = '0';
      document.body.appendChild(clone);

      // Hitung koordinat tengah layar yang pas sesuai viewport
      const targetW = Math.min(Math.max(rect.width * 1.08, 560), Math.min(window.innerWidth * 0.9, 660));
      const targetH = Math.min(Math.max(rect.height * 1.15, 480), window.innerHeight * 0.85);
      const targetX = (window.innerWidth - targetW) / 2;
      const targetY = (window.innerHeight - targetH) / 2;

      // Mulai animasi flip & terbang ke tengah
      requestAnimationFrame(() => {
        clone.style.left = `${targetX}px`;
        clone.style.top = `${targetY}px`;
        clone.style.width = `${targetW}px`;
        clone.style.height = `${targetH}px`;
        clone.style.transform = 'perspective(1400px) rotateY(360deg) scale(1)';
      });

      // Di fase akhir putaran (330ms), buka backdrop & modal secara crossfade menyatu
      setTimeout(() => {
        projectModal.classList.add('open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        clone.style.opacity = '0';
      }, 330);

      // Bersihkan clone saat modal sudah stabil
      setTimeout(() => {
        if (clone.parentNode) clone.remove();
        card.style.opacity = '1';
        card.style.transform = '';
      }, 550);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  // --- CV Modal Functions ---
  function openCvModal() {
    cvModal.classList.add('open');
    cvModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCvModal() {
    cvModal.classList.remove('open');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Preview CV Triggers (Modal)
  const btnHeroViewCv = document.getElementById('btnHeroViewCv');
  const btnFooterViewCv = document.getElementById('btnFooterViewCv');
  [btnHeroViewCv, btnFooterViewCv].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCvModal();
      });
    }
  });

  // Direct PDF Download Links Notification
  const downloadPdfLinks = document.querySelectorAll('a[href*="CV FACHRI.pdf"]');
  downloadPdfLinks.forEach(link => {
    link.addEventListener('click', () => {
      showToast('Mengunduh CV Fachri Yumanda Putra (PDF)...', '✓');
    });
  });

  if (cvModalCloseBtn) {
    cvModalCloseBtn.addEventListener('click', closeCvModal);
  }

  if (btnDownloadPdf) {
    btnDownloadPdf.addEventListener('click', () => {
      showToast('Membuka dialog cetak salinan CV Fachri...', '✓');
      setTimeout(() => {
        window.print();
      }, 400);
    });
  }

  // Close modals on clicking backdrop
  [projectModal, cvModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeCvModal();
    }
  });

  // --- Contact Form Submission Handler (Canva Page 6) ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('inputName');
      const emailInput = document.getElementById('inputEmail');
      const pesanInput = document.getElementById('inputPesan');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = pesanInput.value.trim();

      // Basic validation
      if (!name || !email || !message) {
        formFeedback.className = 'form-feedback-message error';
        formFeedback.textContent = 'Harap lengkapi semua kolom (Nama, Email, dan Pesan).';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formFeedback.className = 'form-feedback-message error';
        formFeedback.textContent = 'Format email tidak valid. Harap periksa kembali.';
        return;
      }

      // Simulate sending
      btnSubmitMessage.disabled = true;
      btnSubmitMessage.innerHTML = '<span>Mengirim...</span>';

      setTimeout(() => {
        btnSubmitMessage.disabled = false;
        btnSubmitMessage.innerHTML = `
          <span>submit</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        `;

        formFeedback.className = 'form-feedback-message success';
        formFeedback.textContent = `Terima kasih, ${name}! Pesan Anda telah berhasil terkirim. Fachri akan segera merespons ke ${email}.`;

        contactForm.reset();
        showToast('Pesan berhasil dikirim ke Fachri!', '✓', 4500);

        // Auto clear success message after 7 seconds
        setTimeout(() => {
          formFeedback.className = 'form-feedback-message';
          formFeedback.textContent = '';
        }, 7000);

      }, 1000);
    });
  }

  // --- Keyboard Section Navigation (Arrow Up / Arrow Down / Page Down / Page Up) ---
  document.addEventListener('keydown', (e) => {
    // Only navigate if no modal is open and not focusing an input or textarea
    if (document.querySelector('.modal-backdrop.open') || ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === 'PageDown' || (e.altKey && e.key === 'ArrowDown')) {
      e.preventDefault();
      navigateToNextSection(1);
    } else if (e.key === 'PageUp' || (e.altKey && e.key === 'ArrowUp')) {
      e.preventDefault();
      navigateToNextSection(-1);
    }
  });

  function navigateToNextSection(direction) {
    const sectionArray = Array.from(sections);
    const scrollPos = window.scrollY + window.innerHeight / 2;
    let currentIndex = 0;

    sectionArray.forEach((sec, idx) => {
      if (scrollPos >= sec.offsetTop) {
        currentIndex = idx;
      }
    });

    const targetIndex = Math.min(Math.max(currentIndex + direction, 0), sectionArray.length - 1);
    sectionArray[targetIndex].scrollIntoView({ behavior: 'smooth' });
  }

  // ===================================================================
  // INTERACTIVITY ENHANCEMENTS
  // ===================================================================

  // --- 1. Custom Cursor ---
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let rafId;

  if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      rafId = requestAnimationFrame(animateRing);
    }
    animateRing();

    // Expand ring on interactive elements
    const interactiveEls = document.querySelectorAll('a, button, [role="button"], .project-showcase-card, .contact-method-card, .highlight-item');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  }

  // --- 2. Scroll Progress Bar ---
  const scrollBar = document.getElementById('scroll-progress-bar');
  if (scrollBar) {
    window.addEventListener('scroll', () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      scrollBar.style.width = scrolled + '%';
    }, { passive: true });
  }

  // --- 3. Scroll Reveal (IntersectionObserver) ---
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // --- 4. Typed Text (cycling roles) ---
  const typedEl = document.getElementById('typed-role-text');
  const typedRoles = [
    'Web & GIS Developer',
    'Flutter Mobile Developer',
    'Python Backend (Flask)',
    'Fresh Graduate — Teknik Informatika',
    'Available for Full-time Role'
  ];
  let roleIdx = 0, charIdx = 0, isDeleting = false;

  function typeTick() {
    const current = typedRoles[roleIdx];
    if (isDeleting) {
      charIdx--;
    } else {
      charIdx++;
    }
    if (typedEl) typedEl.textContent = current.slice(0, charIdx);

    let delay = isDeleting ? 45 : 80;

    if (!isDeleting && charIdx === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % typedRoles.length;
      delay = 300;
    }
    setTimeout(typeTick, delay);
  }
  if (typedEl) setTimeout(typeTick, 900);

  // --- 5. Animated Stat Counters ---
  const statRow = document.getElementById('stat-row');
  if (statRow) {
    let statStarted = false;
    const statObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !statStarted) {
        statStarted = true;
        statRow.querySelectorAll('.stat-number').forEach(el => {
          const target = parseFloat(el.dataset.target);
          const decimals = parseInt(el.dataset.decimals || '0');
          const suffix = el.dataset.suffix || '';
          const duration = 1400;
          const start = performance.now();

          function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const value = target * ease;
            el.textContent = value.toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }
    }, { threshold: 0.5 });
    statObserver.observe(statRow);
  }

  // --- 6. Ripple Effect ---
  function addRipple(e, el) {
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const wave = document.createElement('span');
    wave.className = 'ripple-wave';
    // lighter ripple on dark buttons
    if (getComputedStyle(el).backgroundColor.includes('24, 24, 27') ||
      getComputedStyle(el).color.includes('255, 255, 255')) {
      wave.classList.add('light');
    }
    wave.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    el.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove());
  }

  document.querySelectorAll('.ripple-host, .btn-contact-me, .btn-unduh-cv, .btn-submit-canva, .btn-download-trigger').forEach(el => {
    if (!el.classList.contains('ripple-host')) el.classList.add('ripple-host');
    el.addEventListener('click', (e) => addRipple(e, el));
  });

  // --- 7. Hero Photo Card subtle parallax tilt on mouse ---
  const heroCard = document.getElementById('heroPhotoCard');
  if (heroCard && window.matchMedia('(hover: hover)').matches) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      heroCard.style.transform = `perspective(700px) rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg) scale(1.02)`;
    });
    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = '';
    });
  }

  // --- 8. Nav tab hover magnetic effect ---
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('mousemove', (e) => {
      const rect = tab.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) * 0.18;
      const dy = (e.clientY - rect.top - rect.height / 2) * 0.18;
      tab.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    tab.addEventListener('mouseleave', () => {
      tab.style.transform = '';
    });
  });

  // --- 9. Project card hover subtle tilt ---
  document.querySelectorAll('.project-showcase-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (document.querySelector('.project-card-flip-clone')) return;
      const rect = card.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
      card.style.transform = `perspective(900px) rotateX(${-dy}deg) rotateY(${dx}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- 10. Contact card click copy-to-clipboard feedback ---
  document.querySelectorAll('.contact-method-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const val = card.querySelector('.contact-card-val');
      if (!val) return;
      const text = val.textContent.trim();
      if (card.href && (card.href.startsWith('mailto:') || card.href.startsWith('http'))) return;
      e.preventDefault();
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Disalin: ${text}`, '📋', 2800);
      }).catch(() => { });
    });
  });

});
