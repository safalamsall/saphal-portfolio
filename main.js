/* ═══════════════════════════════════
   SAPHAL LAMSAL — main.js  v3 Final
═══════════════════════════════════ */

// ══════════════════════════════════════════════════════════
// PROTECTION: Disable Right-Click, Inspect, and Dev Tools
// ══════════════════════════════════════════════════════════

// Disable right-click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
document.addEventListener('keydown', function(e) {
  // F12
  if (e.keyCode === 123) {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+I (Inspect)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+J (Console)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
    e.preventDefault();
    return false;
  }
  // Ctrl+U (View Source)
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+C (Inspect Element)
  if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
    e.preventDefault();
    return false;
  }
  // Ctrl+S (Save Page)
  if (e.ctrlKey && e.keyCode === 83) {
    e.preventDefault();
    return false;
  }
});

// Disable text selection
document.addEventListener('selectstart', function(e) {
  e.preventDefault();
  return false;
});

// Disable copy
document.addEventListener('copy', function(e) {
  e.preventDefault();
  return false;
});

// Detect DevTools
(function() {
  const devtools = /./;
  devtools.toString = function() {
    this.opened = true;
  }
  const checkDevTools = setInterval(function() {
    console.log(devtools);
    console.clear();
  }, 1000);
})();

// ── Navbar scroll shadow ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── Mobile Menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}

// ── Typewriter (home only) ──
const tw = document.getElementById('typewriter');
if (tw) {
  const roles = [
    'Front-End Developer',
    'Cybersecurity Enthusiast',
    'Network Technician',
    'Blockchain Researcher',
    'ML Explorer',
    'IT Educator',
  ];
  let ri = 0, ci = 0, deleting = false;
  function type() {
    const current = roles[ri];
    if (!deleting) {
      tw.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        setTimeout(() => { deleting = true; type(); }, 1900);
        return;
      }
    } else {
      tw.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 50 : 90);
  }
  type();
}

// ── Skill bar animations ──
function animateBars() {
  document.querySelectorAll('.sb-fill').forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      bar.style.width = bar.dataset.w + '%';
    }
  });
}
window.addEventListener('scroll', animateBars);
setTimeout(animateBars, 500);

// ── Scroll reveal (edu cards, exp items, cert cards, etc.) ──
const revealTargets = document.querySelectorAll(
  '[data-aos], .edu-card, .exp-item, .cert-card-full'
);
if (revealTargets.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });
  revealTargets.forEach(el => observer.observe(el));
}

// ── Copy citation (research page) ──
function copyCitation(btn) {
  const text = 'Lamsal, S. (2026). Exploring the Effectiveness of Blockchain in Enhancing Data Security in Healthcare Systems. Zenodo. https://doi.org/10.5281/zenodo.18247744';
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => { btn.innerHTML = orig; }, 2500);
  }).catch(() => {
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Copy Citation'; }, 2500);
  });
}
