// ============================================================
// HIND SAMEUT — Dual Profile Portfolio — script.js
// ============================================================

// Mark JS as running before anything else — see .reveal rules in style.css.
document.documentElement.classList.add("js-ready");

(function () {
  const root = document.documentElement;
  const STORAGE_KEY = "hs-profile-mode";

  function applyMode(mode, animate) {
    root.setAttribute("data-mode", mode);
    localStorage.setItem(STORAGE_KEY, mode);

    // switch buttons aria-state
    document.querySelectorAll(".mode-switch").forEach((sw) => {
      sw.setAttribute("aria-checked", mode === "tech" ? "true" : "false");
    });

    // hero role text
    document.querySelectorAll("[data-role-text]").forEach((el) => {
      el.textContent = el.getAttribute(
        mode === "tech" ? "data-role-tech" : "data-role-marketing"
      );
    });

    // chips: highlight relevant, dim the rest
    document.querySelectorAll(".chip[data-scope]").forEach((chip) => {
      const scope = chip.getAttribute("data-scope");
      const relevant = scope === "both" || scope === mode;
      chip.classList.toggle("active", relevant);
      chip.classList.toggle("dim", !relevant);
    });

    // tool tiles same logic
    document.querySelectorAll(".tool-tile[data-scope]").forEach((tile) => {
      const scope = tile.getAttribute("data-scope");
      const relevant = scope === "both" || scope === mode;
      tile.classList.toggle("active", relevant);
      tile.classList.toggle("dim", !relevant);
    });

    // swap CV download links to match current mode
    document.querySelectorAll("[data-cv-link]").forEach((link) => {
      const file =
        mode === "tech"
          ? link.getAttribute("data-cv-tech")
          : link.getAttribute("data-cv-marketing");
      if (file) link.setAttribute("href", file);
    });

    // quick flash overlay for a tactile "switching" feel
    if (animate) {
      const flash = document.getElementById("modeFlash");
      if (flash) {
        flash.style.opacity = "1";
        requestAnimationFrame(() => {
          setTimeout(() => (flash.style.opacity = "0"), 60);
        });
      }
    }

    // update meta theme-color-ish accent (no-op if absent)
    document.title =
      mode === "tech"
        ? "Hind Sameut — AI & Full-Stack Engineer"
        : "Hind Sameut — Marketing Manager & Meta Ads Specialist";
  }

  function toggleMode() {
    const current = root.getAttribute("data-mode") || "marketing";
    applyMode(current === "marketing" ? "tech" : "marketing", true);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    applyMode(saved === "tech" ? "tech" : "marketing", false);

    document.querySelectorAll(".mode-switch").forEach((sw) => {
      sw.addEventListener("click", toggleMode);
      sw.setAttribute("role", "switch");
      sw.setAttribute("tabindex", "0");
      sw.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleMode();
        }
      });
    });

    // explicit set buttons (e.g inside switch) shouldn't double fire bubbling issues
    document.querySelectorAll("[data-set]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        applyMode(btn.getAttribute("data-set"), true);
      });
    });

    // mobile menu
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
      });
      mobileMenu.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => mobileMenu.classList.remove("open"))
      );
    }

    // scroll reveal — with fallbacks so content can never get stuck invisible
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => io.observe(el));

      // safety net: force-reveal everything after a short delay regardless,
      // in case an element never intersects (e.g. very short viewport,
      // print/screenshot tools, unusual browsers)
      setTimeout(() => {
        revealEls.forEach((el) => el.classList.add("in-view"));
      }, 1800);
    } else {
      // no IntersectionObserver support: just show everything
      revealEls.forEach((el) => el.classList.add("in-view"));
    }

    // lightbox for gallery
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    document.querySelectorAll("[data-lightbox]").forEach((card) => {
      card.addEventListener("click", () => {
        lightboxImg.src = card.getAttribute("data-lightbox");
        lightbox.classList.add("open");
      });
    });
    if (lightbox) {
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target.closest(".close-btn")) {
          lightbox.classList.remove("open");
        }
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") lightbox.classList.remove("open");
      });
    }

    // active nav link on scroll
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((l) =>
              l.classList.toggle(
                "text-current",
                l.getAttribute("href") === "#" + entry.target.id
              )
            );
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => navObserver.observe(s));

    // current year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
