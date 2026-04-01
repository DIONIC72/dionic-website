/* ============================================
   DIONIC — APRIL REDESIGN
   main.js
   ============================================ */

"use strict";

// ---- CURSOR ----
const cursor   = document.getElementById("cursor");
const trail    = document.getElementById("cursor-trail");
let mx = 0, my = 0, tx = 0, ty = 0;

if (cursor && trail) {
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top  = my + "px";
  });
  (function animateTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = tx + "px";
    trail.style.top  = ty + "px";
    requestAnimationFrame(animateTrail);
  })();
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    trail.style.opacity  = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    trail.style.opacity  = "1";
  });
}

// ---- NAV SCROLL STATE ----
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (nav) {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }
}, { passive: true });

// ---- MOBILE MENU ----
const navToggle  = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    const spans = navToggle.querySelectorAll("span");
    if (mobileMenu.classList.contains("open")) {
      spans[0].style.transform = "rotate(45deg) translate(4px, 4px)";
      spans[1].style.transform = "rotate(-45deg) translate(4px, -4px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.transform = "";
    }
  });

  mobileMenu.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      const spans = navToggle.querySelectorAll("span");
      spans[0].style.transform = "";
      spans[1].style.transform = "";
    });
  });
}

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
  ".service-card, .work-card, .approach-step, .approach-left, .approach-right, .contact-left, .contact-right, .roi-inner, .section-header, .work-footer"
);

revealEls.forEach(el => {
  el.classList.add("scroll-reveal");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

revealEls.forEach(el => observer.observe(el));

// ---- STAGGERED GRID REVEALS ----
const grids = document.querySelectorAll(".services-grid, .work-grid");
grids.forEach(grid => {
  const cards = grid.querySelectorAll(".service-card, .work-card");
  const gridObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add("visible");
        }, i * 100);
      });
      gridObserver.unobserve(grid);
    }
  }, { threshold: 0.05 });
  gridObserver.observe(grid);
});

// ---- SMOOTH ANCHOR SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ---- FORM SUCCESS HANDLING ----
const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = "Sending…";
    btn.disabled = true;

    try {
      const data = new FormData(form);
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      btn.textContent = "Sent ✓";
      btn.style.background = "#22C55E";
      form.reset();
      setTimeout(() => {
        btn.textContent = origText;
        btn.style.background = "";
        btn.disabled = false;
      }, 4000);
    } catch (err) {
      btn.textContent = "Error — try again";
      btn.disabled = false;
      setTimeout(() => { btn.textContent = origText; }, 3000);
    }
  });
}

// ---- SUBTLE HERO PARALLAX ----
const heroBg = document.querySelector(".hero-bg");
if (heroBg) {
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.3}px)`;
  }, { passive: true });
}
