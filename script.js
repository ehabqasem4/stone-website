// STONE — site interactions

const header = document.getElementById('header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Sticky header shadow
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Gallery thumb switching
const galleryMainImg = document.getElementById('gallery-main-img');
const galleryThumbs = document.querySelectorAll('.gallery-thumb');

galleryThumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const src = thumb.dataset.src;
    const alt = thumb.dataset.alt;

    galleryThumbs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    thumb.classList.add('active');
    thumb.setAttribute('aria-selected', 'true');

    galleryMainImg.src = src;
    galleryMainImg.alt = alt;
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.feature-card, .app-item, .step, .about-gallery, .bond-diagram, .hero-product-frame, .variant-card, .secondary-card, .products-main'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Contact form feedback
document.querySelector('.contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Message Sent ✓';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
    e.target.reset();
  }, 3000);
});
