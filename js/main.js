/* ============================================================
   DAMILOLA PORTFOLIO — main.js
============================================================ */

// ── Navbar scroll effect ─────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ── Mobile menu ───────────────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});


// ── Scroll reveal ─────────────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// ── Counter animation ─────────────────────────────────────────
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

const animateCounters = () => {
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 1800;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.round(eased * target);
      counter.textContent = value;
      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target;
    };

    requestAnimationFrame(update);
  });
};

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      setTimeout(animateCounters, 600);
    }
  });
}, { threshold: 0.3 });

const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);


// ── Active nav link on scroll ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-slate-400');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('text-white');
          link.classList.remove('text-slate-400');
        }
      });
    }
  });
}, {
  threshold: 0.4,
  rootMargin: '-80px 0px -40% 0px'
});

sections.forEach(section => activeObserver.observe(section));


// ── FAQ accordion ─────────────────────────────────────────────
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const button = item.querySelector('.faq-question');
  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    faqItems.forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Toggle clicked
    if (!isOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});


// ── Smooth scroll for anchor links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ── Contact form handling ─────────────────────────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Formspree or mailto fallback
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // If Formspree action is set up properly, submit to it
    const action = contactForm.getAttribute('action');

    if (action && action.includes('formspree.io/f/')) {
      try {
        const response = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          contactForm.reset();
          formSuccess.classList.remove('hidden');
          setTimeout(() => formSuccess.classList.add('hidden'), 5000);
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        // Fallback: open mailto
        const subject = encodeURIComponent('Automation Inquiry from Portfolio');
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nBusiness: ${data.business || 'N/A'}\n\nMessage:\n${data.message}`);
        window.location.href = `mailto:oluwadamilolaadenike33@gmail.com?subject=${subject}&body=${body}`;
      }
    } else {
      // Mailto fallback
      const subject = encodeURIComponent('Automation Inquiry from Portfolio');
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nBusiness: ${data.business || 'N/A'}\n\nMessage:\n${data.message}`);
      window.location.href = `mailto:oluwadamilolaadenike33@gmail.com?subject=${subject}&body=${body}`;
      formSuccess.classList.remove('hidden');
      contactForm.reset();
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}


// ── Subtle parallax on hero ───────────────────────────────────
const glowOrbs = document.querySelectorAll('.glow-orb');

window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  glowOrbs.forEach((orb, i) => {
    const factor = (i % 2 === 0) ? 1 : -0.6;
    orb.style.transform = `translate(calc(-50% + ${x * factor}px), calc(-50% + ${y * factor}px))`;
  });
}, { passive: true });
