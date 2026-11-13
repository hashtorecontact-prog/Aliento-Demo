/**
 * ALIENTO - Women's Fitness & Wellness Centre
 * Main JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initScrollReveal();
  initBackToTop();
  initActiveNavLink();
  initAccordions();
  initCookieNotice();
  initBookingForm();
  initCounters();
  initStationNavSpy();
});

/**
 * Universal WhatsApp Helper Function
 * @param {string} message - Unencoded string to send
 */
window.openWhatsApp = function(message) {
  const phone = '61397641110';
  const encoded = encodeURIComponent(message || 'Hi Aliento, I would like to enquire about your services.');
  const url = `https://wa.me/${phone}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  if (!toggleBtn || !drawer) return;

  const toggle = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  const open = () => {
    drawer.classList.add('open');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    drawer.classList.remove('open');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', toggle);

  // Close on nav link click
  const navLinks = drawer.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      close();
    }
  });
}

/**
 * Scroll Reveal Animations using IntersectionObserver
 */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  elements.forEach(el => el.classList.add('reveal-init'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/**
 * Back-to-Top Button
 */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  const checkScroll = () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Active Navigation Highlight based on current page
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Check if link matches current page or index
    if (href === currentPath || (href === '/' && (currentPath === '' || currentPath === 'index.html'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * FAQ Accordion Component
 */
function initAccordions() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordions in same group
      const parent = item.closest('.accordion-group');
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherContent = other.querySelector('.accordion-content');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });
      }

      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/**
 * Booking / Enquiry Form Handling
 * Generates WhatsApp message or email enquiry
 */
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const service = form.querySelector('[name="service"]')?.value || 'General Enquiry';
    const day = form.querySelector('[name="preferredDay"]')?.value || 'Flexible';
    const time = form.querySelector('[name="preferredTime"]')?.value || 'Anytime';
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !phone) {
      showToast('Please provide your name and contact phone number.');
      return;
    }

    let waMessage = `Hi Aliento, my name is ${name}. I am interested in ${service}.`;
    if (day !== 'Flexible' || time !== 'Anytime') {
      waMessage += ` My preferred time is ${day} around ${time}.`;
    }
    if (phone) {
      waMessage += ` My contact number is ${phone}.`;
    }
    if (email) {
      waMessage += ` (Email: ${email})`;
    }
    if (message) {
      waMessage += ` Note: ${message}`;
    }

    window.openWhatsApp(waMessage);
    showToast('Opening WhatsApp with your booking details...');
  });
}

/**
 * Cookie Notice Logic
 */
function initCookieNotice() {
  const notice = document.getElementById('cookieNotice');
  if (!notice) return;

  if (!localStorage.getItem('aliento_cookie_accepted')) {
    setTimeout(() => {
      notice.classList.add('active');
    }, 1500);
  }

  const acceptBtn = document.getElementById('acceptCookies');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('aliento_cookie_accepted', 'true');
      notice.classList.remove('active');
    });
  }
}

/**
 * Animated Stat Counters
 */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        let current = 0;
        const duration = 1200;
        const stepTime = 20;
        const increment = target / (duration / stepTime);

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/**
 * Lightweight Toast Notification
 */
window.showToast = function(msg) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${msg}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

/**
 * Shapemaster Station Navigation Smooth Jump & Active State Spy
 */
function initStationNavSpy() {
  const stationSections = document.querySelectorAll('.machine-detail-section');
  const navButtons = document.querySelectorAll('.station-nav-btn');
  const navWrapper = document.querySelector('.station-nav-wrapper');
  const navScroll = document.querySelector('.station-nav-scroll');
  if (!stationSections.length || !navButtons.length) return;

  let isProgrammaticScroll = false;
  let scrollTimeout = null;

  // Center a button horizontally in the station-nav-scroll bar
  // Uses scrollLeft directly on the container to prevent any vertical window jerking
  const centerNavButton = (btn) => {
    if (!navScroll || !btn) return;
    const containerWidth = navScroll.clientWidth;
    const btnLeft = btn.offsetLeft;
    const btnWidth = btn.offsetWidth;
    const targetScrollLeft = btnLeft - (containerWidth / 2) + (btnWidth / 2);
    navScroll.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: 'smooth'
    });
  };

  // Scroll window accurately to target section with sticky header & nav bar offsets
  const scrollToTargetSection = (targetEl) => {
    if (!targetEl) return;
    const siteHeader = document.querySelector('.site-header');
    const headerHeight = siteHeader ? siteHeader.offsetHeight : 80;
    const navHeight = navWrapper ? navWrapper.offsetHeight : 64;
    const totalOffset = headerHeight + navHeight + 14;

    const elTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
    const scrollToY = Math.max(0, elTop - totalOffset);

    isProgrammaticScroll = true;
    if (scrollTimeout) clearTimeout(scrollTimeout);

    window.scrollTo({
      top: scrollToY,
      behavior: 'smooth'
    });

    scrollTimeout = setTimeout(() => {
      isProgrammaticScroll = false;
    }, 850);
  };

  // Click handlers on Jump to Machine slider buttons
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        // Immediately update active state
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Center button inside the horizontal slider
        centerNavButton(btn);

        // Smoothly scroll window to the exact section
        scrollToTargetSection(target);

        // Update URL hash cleanly
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', href);
        }
      }
    });
  });

  // Handle "Back to Station List" buttons (href="#machines")
  const backToNavLinks = document.querySelectorAll('a[href="#machines"]');
  backToNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.getElementById('machines');
      if (target) {
        e.preventDefault();
        const siteHeader = document.querySelector('.site-header');
        const headerHeight = siteHeader ? siteHeader.offsetHeight : 80;
        const targetY = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: 'smooth'
        });
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', '#machines');
        }
      }
    });
  });

  // Handle "Explore All 8 Machines" links
  const exploreLinks = document.querySelectorAll('a[href="#machines-directory"]');
  exploreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.getElementById('machines-directory');
      if (target) {
        e.preventDefault();
        scrollToTargetSection(target);
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', '#machines-directory');
        }
      }
    });
  });

  // IntersectionObserver to update active state during manual user scroll
  const observer = new IntersectionObserver((entries) => {
    if (isProgrammaticScroll) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navButtons.forEach(btn => {
          if (btn.getAttribute('href') === `#${id}`) {
            btn.classList.add('active');
            centerNavButton(btn);
          } else {
            btn.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -55% 0px'
  });

  stationSections.forEach(sec => observer.observe(sec));

  // If page loads with a hash anchor, scroll with proper offset
  if (window.location.hash) {
    const initialTarget = document.querySelector(window.location.hash);
    if (initialTarget && initialTarget.classList.contains('machine-detail-section')) {
      setTimeout(() => {
        const matchingBtn = document.querySelector(`.station-nav-btn[href="${window.location.hash}"]`);
        if (matchingBtn) {
          navButtons.forEach(b => b.classList.remove('active'));
          matchingBtn.classList.add('active');
          centerNavButton(matchingBtn);
        }
        scrollToTargetSection(initialTarget);
      }, 250);
    }
  }
}
