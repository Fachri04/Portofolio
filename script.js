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

  function scrollToSection(targetElement) {
    if (!targetElement) return;
    const navBarHeight = 70;
    const browserBarHeight = window.innerWidth <= 768 ? 0 : 38;
    const totalHeaderHeight = navBarHeight + browserBarHeight;
    const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - totalHeaderHeight;

    window.scrollTo({
      top: Math.max(0, Math.round(targetTop)),
      behavior: 'smooth'
    });
  }

  // --- Side Indicator Dots Click Handler ---
  indicatorDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        scrollToSection(targetEl);
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
        scrollToSection(targetElement);

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

      // Send via EmailJS (Connected to Fachri's Gmail)
      const EMAILJS_SERVICE_ID = 'service_m8vnpsp';
      const EMAILJS_TEMPLATE_ID = 'template_77tj1lc';
      const EMAILJS_PUBLIC_KEY = '58atw6yL_0tVve19T';

      btnSubmitMessage.disabled = true;
      btnSubmitMessage.innerHTML = '<span>Mengirim...</span>';

      const isEmailJsReady = typeof emailjs !== 'undefined';

      if (isEmailJsReady) {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          name: name,
          from_name: name,
          email: email,
          from_email: email,
          message: message,
          title: `Pesan Portofolio dari ${name}`
        }, EMAILJS_PUBLIC_KEY)
        .then(() => {
          btnSubmitMessage.disabled = false;
          btnSubmitMessage.innerHTML = `
            <span>${currentLang === 'id' ? 'kirim pesan' : 'send message'}</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          `;
          formFeedback.className = 'form-feedback-message success';
          formFeedback.textContent = currentLang === 'id' 
            ? `Terima kasih, ${name}! Pesan Anda telah terkirim langsung ke email Fachri.`
            : `Thank you, ${name}! Your message has been sent directly to Fachri's email.`;
          contactForm.reset();
          showToast(currentLang === 'id' ? 'Pesan berhasil terkirim ke Gmail! ✉️' : 'Message sent to Gmail! ✉️', '✓', 4500);
          setTimeout(() => {
            formFeedback.className = 'form-feedback-message';
            formFeedback.textContent = '';
          }, 7000);
        })
        .catch((err) => {
          console.error('EmailJS Error:', err);
          btnSubmitMessage.disabled = false;
          btnSubmitMessage.innerHTML = `
            <span>${currentLang === 'id' ? 'kirim pesan' : 'send message'}</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          `;
          formFeedback.className = 'form-feedback-message error';
          formFeedback.textContent = currentLang === 'id'
            ? 'Gagal mengirim pesan melalui server email. Silakan coba lagi atau hubungi via WhatsApp.'
            : 'Failed to send message via email server. Please try again or reach out via WhatsApp.';
        });
      } else {
        // Fallback langsung menggunakan mailto jika Public Key EmailJS belum diisi
        const mailtoUrl = `mailto:yumandaf@gmail.com?subject=${encodeURIComponent('Pesan Portofolio dari ' + name)}&body=${encodeURIComponent('Nama: ' + name + '\nEmail: ' + email + '\n\nPesan:\n' + message)}`;
        window.open(mailtoUrl, '_blank');

        btnSubmitMessage.disabled = false;
        btnSubmitMessage.innerHTML = `
          <span>${currentLang === 'id' ? 'kirim pesan' : 'send message'}</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        `;

        formFeedback.className = 'form-feedback-message success';
        formFeedback.textContent = currentLang === 'id'
          ? `Membuka aplikasi email... Silakan klik 'Send' untuk mengirimkan pesan ke Fachri.`
          : `Opening email client... Please click 'Send' to forward your message to Fachri.`;

        contactForm.reset();
        showToast(currentLang === 'id' ? 'Aplikasi email dibuka!' : 'Email client opened!', '✓', 4500);

        setTimeout(() => {
          formFeedback.className = 'form-feedback-message';
          formFeedback.textContent = '';
        }, 7000);
      }
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
        showToast(currentLang === 'id' ? `Disalin: ${text}` : `Copied: ${text}`, '📋', 2800);
      }).catch(() => { });
    });
  });

  // ===================================================================
  // 11. MULTI-LANGUAGE SYSTEM (ID <-> EN)
  // ===================================================================
  const i18nDict = {
    id: {
      'nav.home': 'HOME',
      'nav.tentang': 'TENTANG',
      'nav.keahlian': 'KEAHLIAN',
      'nav.project': 'PROJECT',
      'nav.contact': 'CONTACT',
      'nav.unduhCv': 'unduh cv',
      'hero.greeting': 'Halo, Saya Fachri 👋',
      'hero.badge': 'Teknik Informatika (D-IV)',
      'hero.desc': 'Fresh graduate D-IV Teknik Informatika dari Politeknik Negeri Lhokseumawe dengan pengalaman dalam pengembangan aplikasi web dan mobile menggunakan Python (Flask), PHP, dan Flutter, integrasi database relasional, pemetaan Web GIS, serta pengalaman magang di PT PLN (Persero).',
      'hero.btnContact': 'HUBUNGI SAYA',
      'hero.btnDownloadCv': 'UNDUH CV (PDF)',
      'hero.btnPreviewCv': 'PREVIEW CV',
      'stat.ipk': 'IPK Kelulusan',
      'stat.projects': 'Project Selesai',
      'stat.intern': 'Pengalaman Magang',
      'tentang.title': 'TENTANG SAYA',
      'tentang.p1': 'Halo! Saya Fachri Yumanda Putra, lulusan Sarjana Terapan (D-IV) Teknik Informatika dari Politeknik Negeri Lhokseumawe dengan IPK 3.57/4.00. Saya berfokus pada pengembangan perangkat lunak berbasis web dan mobile, perancangan arsitektur backend, serta solusi data spasial (GIS).',
      'tentang.p2': 'Memiliki rekam jejak dalam merancang sistem cerdas untuk kebutuhan nyata, mulai dari Tugas Akhir Sistem Deteksi Titik Rawan Kecelakaan dengan Spatial Clustering DBSCAN hingga aplikasi inspeksi lapangan berbasis Flutter di PT PLN (Persero) UP3 Lhokseumawe.',
      'tentang.p3': 'Saya siap memberikan kontribusi maksimal dan terus berkembang dalam lingkungan kerja profesional, baik sebagai Web Developer, Mobile Developer, maupun Software Engineer.',
      'tentang.hl1Title': 'Pendidikan',
      'tentang.hl1Desc': 'D-IV Teknik Informatika (IPK 3.57)',
      'tentang.hl2Title': 'Pengalaman',
      'tentang.hl2Desc': 'IT & Logistics Intern di PT PLN',
      'tentang.hl3Title': 'Spesialisasi',
      'tentang.hl3Desc': 'Python (Flask), Flutter & Web GIS',
      'tentang.hl4Title': 'Domisili',
      'tentang.hl4Desc': 'Kuta Makmur, Aceh, Indonesia',
      'keahlian.title': 'KEAHLIAN',
      'keahlian.sub': 'Keahlian teknis rekayasa perangkat lunak, framework, basis data, dan enterprise tools yang saya terapkan dalam project web, mobile, dan sistem industri.',
      'project.title': 'PROJECT',
      'project.sub': 'Karya dan project rekayasa perangkat lunak terpilih yang merefleksikan keahlian saya dalam web, mobile, dan sistem informasi.',
      'project.btn': 'LIHAT DETAIL PROJECT',
      'project.p1Badge': 'Skripsi • Web GIS DSS',
      'project.p1Title': 'Sistem Deteksi Titik Rawan Kecelakaan',
      'project.p1Desc': 'Web GIS Decision Support System untuk pemetaan dan deteksi titik rawan kecelakaan lalu lintas menggunakan metode DBSCAN spatial clustering, jarak Haversine, dan pembobotan AEK (Angka Ekuivalensi Kecelakaan).',
      'project.p2Badge': 'PT PLN (Persero) UP3',
      'project.p2Title': 'Mobile Monitoring Inspeksi Tier 2',
      'project.p2Desc': 'Aplikasi mobile inspeksi Tier 2 berbasis Flutter yang terintegrasi real-time dengan Google Sheets & Apps Script untuk mendukung pencatatan, verifikasi, dan pemantauan data inspeksi lapangan PT PLN (Persero).',
      'contact.title': 'CONTACT',
      'contact.sub': 'Pilih saluran komunikasi favorit Anda atau kirimkan pesan langsung melalui form di bawah.',
      'contact.formTitle': 'KIRIM PESAN',
      'contact.name': 'NAME',
      'contact.namePh': 'Masukkan nama Anda',
      'contact.email': 'EMAIL ADDRESS',
      'contact.emailPh': 'alamat@email.com',
      'contact.msg': 'PESAN',
      'contact.msgPh': 'Tuliskan pesan atau ajakan kolaborasi di sini...',
      'contact.submit': 'kirim pesan'
    },
    en: {
      'nav.home': 'HOME',
      'nav.tentang': 'ABOUT',
      'nav.keahlian': 'SKILLS',
      'nav.project': 'PROJECTS',
      'nav.contact': 'CONTACT',
      'nav.unduhCv': 'download cv',
      'hero.greeting': 'Hello, I am Fachri 👋',
      'hero.badge': 'Informatics Engineering (B.App.Sc)',
      'hero.desc': 'Fresh graduate in Informatics Engineering from Politeknik Negeri Lhokseumawe with hands-on experience in web and mobile app development with Python (Flask), PHP, Flutter, relational databases, Web GIS mapping, and industrial internship at PT PLN (Persero).',
      'hero.btnContact': 'GET IN TOUCH',
      'hero.btnDownloadCv': 'DOWNLOAD CV (PDF)',
      'hero.btnPreviewCv': 'PREVIEW CV',
      'stat.ipk': 'Graduation GPA',
      'stat.projects': 'Completed Projects',
      'stat.intern': 'Internship Experience',
      'tentang.title': 'ABOUT ME',
      'tentang.p1': 'Hello! I am Fachri Yumanda Putra, an Informatics Engineering graduate (B.App.Sc) from Politeknik Negeri Lhokseumawe with a GPA of 3.57/4.00. My focus centers on web & mobile software development, backend engineering, and spatial data solutions (GIS).',
      'tentang.p2': 'Proven track record of engineering intelligent systems for real-world scenarios—from an Accident Blackspot Detection Decision Support System using DBSCAN clustering to a real-time mobile inspection app with Flutter at PT PLN (Persero).',
      'tentang.p3': 'Ready to make a positive impact and grow further in collaborative tech environments as a Web Developer, Mobile Developer, or Software Engineer.',
      'tentang.hl1Title': 'Education',
      'tentang.hl1Desc': 'B.App.Sc in Informatics Eng. (GPA 3.57)',
      'tentang.hl2Title': 'Experience',
      'tentang.hl2Desc': 'IT & Logistics Intern at PT PLN',
      'tentang.hl3Title': 'Specialization',
      'tentang.hl3Desc': 'Python (Flask), Flutter & Web GIS',
      'tentang.hl4Title': 'Location',
      'tentang.hl4Desc': 'Kuta Makmur, Aceh, Indonesia',
      'keahlian.title': 'SKILLS',
      'keahlian.sub': 'Technical proficiencies in software engineering, frameworks, database architectures, and enterprise systems applied across industry solutions.',
      'project.title': 'PROJECTS',
      'project.sub': 'Selected software engineering works reflecting my capabilities across web, mobile, and intelligent data systems.',
      'project.btn': 'VIEW PROJECT DETAILS',
      'project.p1Badge': 'Thesis • Web GIS DSS',
      'project.p1Title': 'Traffic Accident Blackspot Detection System',
      'project.p1Desc': 'Web GIS Decision Support System for mapping and detecting traffic accident blackspots using spatial clustering DBSCAN, Haversine formula, and AEK weighting.',
      'project.p2Badge': 'PT PLN (Persero) UP3',
      'project.p2Title': 'Tier 2 Inspection Mobile Monitoring',
      'project.p2Desc': 'Flutter-based Tier 2 mobile inspection app seamlessly connected in real-time to Google Sheets & Apps Script for field equipment audits at PT PLN (Persero).',
      'contact.title': 'CONTACT',
      'contact.sub': 'Connect with me through your favorite channels or send a direct message via the form below.',
      'contact.formTitle': 'SEND MESSAGE',
      'contact.name': 'NAME',
      'contact.namePh': 'Enter your full name',
      'contact.email': 'EMAIL ADDRESS',
      'contact.emailPh': 'yourname@email.com',
      'contact.msg': 'MESSAGE',
      'contact.msgPh': 'Write your thoughts or project collaboration inquiry here...',
      'contact.submit': 'send message'
    }
  };

  let currentLang = localStorage.getItem('porto_lang') || 'id';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('porto_lang', lang);

    const langBtn = document.getElementById('langLabel');
    if (langBtn) langBtn.textContent = lang.toUpperCase();

    // Nav
    const navH = document.querySelector('#nav-home span'); if (navH) navH.textContent = i18nDict[lang]['nav.home'];
    const navT = document.querySelector('#nav-tentang span'); if (navT) navT.textContent = i18nDict[lang]['nav.tentang'];
    const navK = document.querySelector('#nav-keahlian span'); if (navK) navK.textContent = i18nDict[lang]['nav.keahlian'];
    const navP = document.querySelector('#nav-project span'); if (navP) navP.textContent = i18nDict[lang]['nav.project'];
    const navC = document.querySelector('#nav-contact span'); if (navC) navC.textContent = i18nDict[lang]['nav.contact'];

    // Hero
    const heroGreet = document.querySelector('.hero-greeting'); if (heroGreet) heroGreet.textContent = i18nDict[lang]['hero.greeting'];
    const heroRole = document.querySelector('.role-badge'); if (heroRole) heroRole.textContent = i18nDict[lang]['hero.badge'];
    const heroDesc = document.querySelector('.hero-description'); if (heroDesc) heroDesc.textContent = i18nDict[lang]['hero.desc'];
    const heroContactBtn = document.querySelector('#btnHeroContact span'); if (heroContactBtn) heroContactBtn.textContent = i18nDict[lang]['hero.btnContact'];
    const heroCvBtn = document.querySelector('#btnHeroDownloadCv span'); if (heroCvBtn) heroCvBtn.textContent = i18nDict[lang]['hero.btnDownloadCv'];
    const heroPrevBtn = document.querySelector('#btnHeroViewCv span'); if (heroPrevBtn) heroPrevBtn.textContent = i18nDict[lang]['hero.btnPreviewCv'];

    // Stats
    const statLabels = document.querySelectorAll('.stat-item .stat-label');
    if (statLabels[0]) statLabels[0].textContent = i18nDict[lang]['stat.ipk'];
    if (statLabels[1]) statLabels[1].textContent = i18nDict[lang]['stat.projects'];
    if (statLabels[2]) statLabels[2].textContent = i18nDict[lang]['stat.intern'];

    // Tentang
    const tentTitle = document.querySelector('.section-tentang .section-title'); if (tentTitle) tentTitle.textContent = i18nDict[lang]['tentang.title'];
    const tentParas = document.querySelectorAll('.tentang-text-box p');
    if (tentParas[0]) tentParas[0].textContent = i18nDict[lang]['tentang.p1'];
    if (tentParas[1]) tentParas[1].textContent = i18nDict[lang]['tentang.p2'];
    if (tentParas[2]) tentParas[2].textContent = i18nDict[lang]['tentang.p3'];

    // Tentang Highlights Cards
    const hlItems = document.querySelectorAll('.tentang-highlights-grid .highlight-item');
    if (hlItems.length >= 4) {
      const h1 = hlItems[0].querySelector('h3'); if (h1) h1.textContent = i18nDict[lang]['tentang.hl1Title'];
      const p1 = hlItems[0].querySelector('p'); if (p1) p1.textContent = i18nDict[lang]['tentang.hl1Desc'];

      const h2 = hlItems[1].querySelector('h3'); if (h2) h2.textContent = i18nDict[lang]['tentang.hl2Title'];
      const p2 = hlItems[1].querySelector('p'); if (p2) p2.textContent = i18nDict[lang]['tentang.hl2Desc'];

      const h3 = hlItems[2].querySelector('h3'); if (h3) h3.textContent = i18nDict[lang]['tentang.hl3Title'];
      const p3 = hlItems[2].querySelector('p'); if (p3) p3.textContent = i18nDict[lang]['tentang.hl3Desc'];

      const h4 = hlItems[3].querySelector('h3'); if (h4) h4.textContent = i18nDict[lang]['tentang.hl4Title'];
      const p4 = hlItems[3].querySelector('p'); if (p4) p4.textContent = i18nDict[lang]['tentang.hl4Desc'];
    }

    // Keahlian
    const keahTitle = document.querySelector('.keahlian-big-title'); if (keahTitle) keahTitle.textContent = i18nDict[lang]['keahlian.title'];
    const keahSub = document.querySelector('.keahlian-subtitle'); if (keahSub) keahSub.textContent = i18nDict[lang]['keahlian.sub'];

    // Project Section & Cards
    const projTitle = document.querySelector('.section-project .section-title'); if (projTitle) projTitle.textContent = i18nDict[lang]['project.title'];
    const projSub = document.querySelector('.section-project .section-subtitle-text'); if (projSub) projSub.textContent = i18nDict[lang]['project.sub'];
    document.querySelectorAll('.btn-lihat-project span').forEach(el => el.textContent = i18nDict[lang]['project.btn']);

    const projCards = document.querySelectorAll('.project-showcase-card');
    if (projCards.length >= 2) {
      // Project 1
      const p1Badge = projCards[0].querySelector('.project-badge-tag'); if (p1Badge) p1Badge.textContent = i18nDict[lang]['project.p1Badge'];
      const p1Title = projCards[0].querySelector('.project-card-title'); if (p1Title) p1Title.textContent = i18nDict[lang]['project.p1Title'];
      const p1Desc = projCards[0].querySelector('.project-card-summary'); if (p1Desc) p1Desc.textContent = i18nDict[lang]['project.p1Desc'];

      // Project 2
      const p2Badge = projCards[1].querySelector('.project-badge-tag'); if (p2Badge) p2Badge.textContent = i18nDict[lang]['project.p2Badge'];
      const p2Title = projCards[1].querySelector('.project-card-title'); if (p2Title) p2Title.textContent = i18nDict[lang]['project.p2Title'];
      const p2Desc = projCards[1].querySelector('.project-card-summary'); if (p2Desc) p2Desc.textContent = i18nDict[lang]['project.p2Desc'];
    }

    // Contact
    const contTitle = document.querySelector('.section-contact .section-title'); if (contTitle) contTitle.textContent = i18nDict[lang]['contact.title'];
    const contSub = document.querySelector('.section-contact .section-subtitle-text'); if (contSub) contSub.textContent = i18nDict[lang]['contact.sub'];
    const contFormTitle = document.querySelector('.form-title'); if (contFormTitle) contFormTitle.textContent = i18nDict[lang]['contact.formTitle'];
    
    const inpName = document.getElementById('inputName'); if (inpName) inpName.placeholder = i18nDict[lang]['contact.namePh'];
    const inpEmail = document.getElementById('inputEmail'); if (inpEmail) inpEmail.placeholder = i18nDict[lang]['contact.emailPh'];
    const inpMsg = document.getElementById('inputPesan'); if (inpMsg) inpMsg.placeholder = i18nDict[lang]['contact.msgPh'];
    const submitBtn = document.querySelector('#btnSubmitMessage span'); if (submitBtn) submitBtn.textContent = i18nDict[lang]['contact.submit'];
  }

  const langSwitchBtn = document.getElementById('langSwitchBtn');
  if (langSwitchBtn) {
    langSwitchBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'id' ? 'en' : 'id';
      applyLanguage(nextLang);
      showToast(nextLang === 'id' ? 'Bahasa: Indonesia' : 'Language: English', '🌐', 2000);
    });
  }
  applyLanguage(currentLang);

  // ===================================================================
  // 12. THEME SWITCHER (Light, Dark, Cyber, Aurora)
  // ===================================================================
  const themes = ['light', 'dark', 'cyber', 'aurora'];
  const themeMeta = {
    light:  { name: 'Light', icon: '☀️' },
    dark:   { name: 'Dark', icon: '🌙' },
    cyber:  { name: 'Cyber', icon: '⚡' },
    aurora: { name: 'Aurora', icon: '🌌' }
  };

  let currentTheme = localStorage.getItem('porto_theme') || 'light';

  function applyTheme(theme) {
    if (!themes.includes(theme)) theme = 'light';
    currentTheme = theme;
    localStorage.setItem('porto_theme', theme);

    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }

    const tIcon = document.getElementById('themeIcon');
    const tLabel = document.getElementById('themeLabel');
    if (tIcon) tIcon.textContent = themeMeta[theme].icon;
    if (tLabel) tLabel.textContent = themeMeta[theme].name;

    // Reset dan ganti jenis partikel background interaktif
    initInteractiveBackground(theme);
  }

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextIdx = (themes.indexOf(currentTheme) + 1) % themes.length;
      const nextTheme = themes[nextIdx];
      applyTheme(nextTheme);
      showToast(`Tema: ${themeMeta[nextTheme].name}`, themeMeta[nextTheme].icon, 2200);
    });
  }

  // ===================================================================
  // 13. DYNAMIC INTERACTIVE THEME-SPECIFIC BACKGROUND ANIMATION
  // ===================================================================
  const bgCanvas = document.getElementById('bg-canvas');
  let bgCtx = null;
  let bgParticles = [];
  let bgAnimFrameId = null;

  if (bgCanvas) {
    bgCtx = bgCanvas.getContext('2d');
    function resizeCanvas() {
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  }

  function initInteractiveBackground(theme) {
    if (!bgCanvas || !bgCtx) return;
    if (bgAnimFrameId) cancelAnimationFrame(bgAnimFrameId);
    bgParticles = [];

    const w = bgCanvas.width;
    const h = bgCanvas.height;

    if (theme === 'light') {
      // Light Theme: Floating modern geometric glow bubbles with smooth interactive movement
      const count = Math.min(Math.floor(w * 0.028), 45);
      for (let i = 0; i < count; i++) {
        bgParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 26 + 10,
          dx: (Math.random() - 0.5) * 0.7,
          dy: (Math.random() - 0.5) * 0.7,
          color: Math.random() > 0.4 ? 'rgba(24, 24, 27, 0.075)' : 'rgba(99, 102, 241, 0.09)'
        });
      }
    } else if (theme === 'dark') {
      // Dark Theme: Constellation / Neural Network Connected Grid
      const count = Math.min(Math.floor(w * 0.045), 65);
      for (let i = 0; i < count; i++) {
        bgParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2.8 + 1.2,
          dx: (Math.random() - 0.5) * 0.75,
          dy: (Math.random() - 0.5) * 0.75,
          color: 'rgba(251, 251, 254, 0.75)'
        });
      }
    } else if (theme === 'cyber') {
      // Cyber Theme: Digital Matrix Cyber Rain / Digital Pillars
      const count = Math.min(Math.floor(w * 0.06), 85);
      for (let i = 0; i < count; i++) {
        bgParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          len: Math.random() * 34 + 16,
          speed: Math.random() * 3.2 + 1.4,
          color: `rgba(16, 185, 129, ${Math.random() * 0.65 + 0.3})`
        });
      }
    } else if (theme === 'aurora') {
      // Aurora Theme: Flowing dreamy starlight drifting nebula particles
      const count = Math.min(Math.floor(w * 0.045), 60);
      for (let i = 0; i < count; i++) {
        bgParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 4.5 + 1.8,
          dx: (Math.random() - 0.5) * 0.65,
          dy: (Math.random() - 0.5) * 0.65,
          pulse: Math.random() * Math.PI,
          color: Math.random() > 0.5 ? 'rgba(129, 140, 248, 0.7)' : 'rgba(236, 72, 153, 0.55)'
        });
      }
    }

    function renderBg() {
      bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

      if (theme === 'light') {
        bgParticles.forEach(p => {
          p.x += p.dx;
          p.y += p.dy;
          if (p.x < -p.r) p.x = bgCanvas.width + p.r;
          if (p.x > bgCanvas.width + p.r) p.x = -p.r;
          if (p.y < -p.r) p.y = bgCanvas.height + p.r;
          if (p.y > bgCanvas.height + p.r) p.y = -p.r;

          bgCtx.beginPath();
          bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          bgCtx.fillStyle = p.color;
          bgCtx.fill();
        });
      } else if (theme === 'dark') {
        // Draw constellation lines
        for (let i = 0; i < bgParticles.length; i++) {
          const p1 = bgParticles[i];
          p1.x += p1.dx;
          p1.y += p1.dy;
          if (p1.x < 0 || p1.x > bgCanvas.width) p1.dx *= -1;
          if (p1.y < 0 || p1.y > bgCanvas.height) p1.dy *= -1;

          bgCtx.beginPath();
          bgCtx.arc(p1.x, p1.y, p1.r, 0, Math.PI * 2);
          bgCtx.fillStyle = p1.color;
          bgCtx.fill();

          for (let j = i + 1; j < bgParticles.length; j++) {
            const p2 = bgParticles[j];
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (dist < 130) {
              bgCtx.strokeStyle = `rgba(251, 251, 254, ${0.28 * (1 - dist / 130)})`;
              bgCtx.lineWidth = 1;
              bgCtx.beginPath();
              bgCtx.moveTo(p1.x, p1.y);
              bgCtx.lineTo(p2.x, p2.y);
              bgCtx.stroke();
            }
          }
        }
      } else if (theme === 'cyber') {
        bgParticles.forEach(p => {
          p.y += p.speed;
          if (p.y > bgCanvas.height + p.len) {
            p.y = -p.len;
            p.x = Math.random() * bgCanvas.width;
          }
          bgCtx.strokeStyle = p.color;
          bgCtx.lineWidth = 1.4;
          bgCtx.beginPath();
          bgCtx.moveTo(p.x, p.y);
          bgCtx.lineTo(p.x, p.y + p.len);
          bgCtx.stroke();
        });
      } else if (theme === 'aurora') {
        bgParticles.forEach(p => {
          p.pulse += 0.02;
          p.x += p.dx;
          p.y += p.dy;
          if (p.x < 0 || p.x > bgCanvas.width) p.dx *= -1;
          if (p.y < 0 || p.y > bgCanvas.height) p.dy *= -1;

          const dynamicR = p.r + Math.sin(p.pulse) * 1.2;
          bgCtx.beginPath();
          bgCtx.arc(p.x, p.y, Math.max(dynamicR, 0.5), 0, Math.PI * 2);
          bgCtx.fillStyle = p.color;
          bgCtx.shadowBlur = 12;
          bgCtx.shadowColor = 'rgba(99, 102, 241, 0.45)';
          bgCtx.fill();
          bgCtx.shadowBlur = 0;
        });
      }

      bgAnimFrameId = requestAnimationFrame(renderBg);
    }
    renderBg();
  }

  // Aktifkan tema saat awal load
  applyTheme(currentTheme);

});
