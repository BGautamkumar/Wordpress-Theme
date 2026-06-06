import { initAuth } from './auth.js';

// ─── Dropdown Interactions ───────────────────────────────────────────────────
const initDropdowns = () => {
  const dropdownContainers = document.querySelectorAll('.js-dropdown-container');

  dropdownContainers.forEach(container => {
    const toggleBtn = container.querySelector('[data-dropdown-toggle]');
    const targetId = toggleBtn?.getAttribute('data-dropdown-toggle');
    const menu = document.getElementById(targetId);
    const arrow = toggleBtn?.querySelector('.dropdown-arrow');

    if (!toggleBtn || !menu) return;

    const openMenu = () => {
      toggleBtn.setAttribute('aria-expanded', 'true');
      menu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
      menu.classList.add('opacity-100', 'visible', 'translate-y-0');
      if (arrow) arrow.classList.add('rotate-180');
    };

    const closeMenu = () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      menu.classList.add('opacity-0', 'invisible', 'translate-y-2');
      menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
      if (arrow) arrow.classList.remove('rotate-180');
    };

    const toggle = (e) => {
      e.stopPropagation();
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        document.querySelectorAll('[data-dropdown-toggle]').forEach(btn => {
          if (btn !== toggleBtn) {
            btn.setAttribute('aria-expanded', 'false');
            const otherMenu = document.getElementById(btn.getAttribute('data-dropdown-toggle'));
            if (otherMenu) {
              otherMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
              otherMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
            const otherArrow = btn.querySelector('.dropdown-arrow');
            if (otherArrow) otherArrow.classList.remove('rotate-180');
          }
        });
        openMenu();
      }
    };

    toggleBtn.addEventListener('click', toggle);

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { closeMenu(); toggleBtn.focus(); }
    });

    let timeout;
    container.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1024) { clearTimeout(timeout); openMenu(); }
    });
    container.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 1024) { timeout = setTimeout(closeMenu, 200); }
    });
  });

  document.addEventListener('click', (e) => {
    dropdownContainers.forEach(container => {
      if (!container.contains(e.target)) {
        const toggleBtn = container.querySelector('[data-dropdown-toggle]');
        const menu = document.getElementById(toggleBtn?.getAttribute('data-dropdown-toggle'));
        const arrow = toggleBtn?.querySelector('.dropdown-arrow');
        if (toggleBtn && menu && toggleBtn.getAttribute('aria-expanded') === 'true') {
          toggleBtn.setAttribute('aria-expanded', 'false');
          menu.classList.add('opacity-0', 'invisible', 'translate-y-2');
          menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
          if (arrow) arrow.classList.remove('rotate-180');
        }
      }
    });
  });
};

// ─── Mobile Menu ─────────────────────────────────────────────────────────────
const initMobileMenu = () => {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-menu-backdrop');

  if (!btn || !menu || !backdrop) return;

  const iconOpen = btn.querySelector('.mobile-menu-icon-open');
  const iconClose = btn.querySelector('.mobile-menu-icon-close');

  const closeMenu = () => {
    menu.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0', 'hidden');
    backdrop.classList.remove('opacity-100');
    document.body.style.overflow = '';
    btn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    if (iconOpen) { iconOpen.classList.remove('opacity-0', 'scale-50'); iconOpen.classList.add('opacity-100', 'scale-100'); }
    if (iconClose) { iconClose.classList.add('opacity-0', 'scale-50'); iconClose.classList.remove('opacity-100', 'scale-100'); }
  };

  const openMenu = () => {
    menu.classList.remove('hidden', 'translate-x-full');
    backdrop.classList.remove('hidden');
    setTimeout(() => backdrop.classList.add('opacity-100'), 10);
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    if (iconOpen) { iconOpen.classList.add('opacity-0', 'scale-50'); iconOpen.classList.remove('opacity-100', 'scale-100'); }
    if (iconClose) { iconClose.classList.remove('opacity-0', 'scale-50'); iconClose.classList.add('opacity-100', 'scale-100'); }
  };

  btn.addEventListener('click', () => {
    btn.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      closeMenu(); btn.focus();
    }
  });
};

// ─── Scroll Reveal Animations ─────────────────────────────────────────────────
const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
};

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initDropdowns();
  initMobileMenu();
  initScrollAnimations();
});

window.addEventListener('auth:updated', () => {
  initDropdowns();
});
