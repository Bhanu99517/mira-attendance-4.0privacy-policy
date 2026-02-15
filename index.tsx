
function initializeApp() {
  console.log("Mira Attendance 4.0 - Initializing...");

  // Set Current Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  // Mobile Menu Logic
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMobileMenuButton = document.getElementById('close-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  const openMenu = () => {
    if (mobileMenu && menuOverlay) {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
      menuOverlay.classList.add('opacity-100', 'pointer-events-auto');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMenu = () => {
    if (mobileMenu && menuOverlay) {
      mobileMenu.classList.remove('translate-x-0');
      mobileMenu.classList.add('translate-x-full');
      menuOverlay.classList.add('opacity-0', 'pointer-events-none');
      menuOverlay.classList.remove('opacity-100', 'pointer-events-auto');
      document.body.style.overflow = '';
    }
  };

  if (mobileMenuButton) mobileMenuButton.onclick = openMenu;
  if (closeMobileMenuButton) closeMobileMenuButton.onclick = closeMenu;
  if (menuOverlay) menuOverlay.onclick = closeMenu;

  // Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Scrollspy & Active State
  const sections = document.querySelectorAll('.policy-section');
  const navLinks = document.querySelectorAll('.sidebar-link');

  const updateActiveLink = () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionEl = section as HTMLElement;
      const sectionTop = sectionEl.offsetTop;
      const sectionHeight = sectionEl.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = sectionEl.getAttribute('id') || '';
      }
    });

    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href')?.substring(1);
      if (linkHref === current) {
        link.classList.add('active-sidebar-link');
        link.classList.remove('text-slate-500', 'border-transparent');
      } else {
        link.classList.remove('active-sidebar-link');
        link.classList.add('text-slate-500', 'border-transparent');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // Smooth Scroll & Auto-Close Menu
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          closeMenu();
        }
      }
    });
  });
}

// Ensure the app initializes correctly whether the DOM is loading or already ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
