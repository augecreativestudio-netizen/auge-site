(() => {
  "use strict";

  /* Marca que JS está ativo: só a partir daqui o CSS pode esconder
     os elementos .reveal para animar a entrada. */
  document.documentElement.classList.add("js");

  /* ---------- Ano dinâmico no rodapé ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------- FAQ accordion ---------- */
  const accItems = document.querySelectorAll(".acc-item");
  accItems.forEach((item) => {
    const trigger = item.querySelector(".acc-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      accItems.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".acc-trigger")?.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Formulário de contato (placeholder) ---------- */
  const form = document.getElementById("ctaForm");
  const feedback = document.getElementById("formFeedback");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (feedback) {
        feedback.textContent = "Recebemos seu contato! A gente te chama em breve. 🙂";
      }
      form.reset();
    });
  }
})();
