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

  /* ---------- Lightbox do portfólio ---------- */
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const stage = lightbox.querySelector(".lightbox-stage");
    const triggers = document.querySelectorAll("[data-lightbox]");
    let restoreFocus = null;
    let galleryImages = [];
    let galleryIndex = 0;

    const svgArrowLeft = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const svgArrowRight = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const svgExternal = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const svgPending = '<svg width="40" height="40" viewBox="0 0 48 48" fill="none"><rect x="6" y="12" width="36" height="26" rx="4" stroke="currentColor" stroke-width="2.2"/><path d="M18 22l9 6-9 6V22Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>';

    function renderGalleryFrame() {
      const wrap = stage.querySelector(".lightbox-media-wrap");
      wrap.innerHTML = `<img src="${galleryImages[galleryIndex]}" alt="">`;
      const dots = stage.querySelectorAll(".lightbox-dot");
      dots.forEach((d, i) => d.classList.toggle("active", i === galleryIndex));
    }

    function buildStage(data) {
      const type = data.type;
      let html = "";

      if (type === "image") {
        html += `<div class="lightbox-media-wrap"><img src="${data.src}" alt="${data.title || ""}"></div>`;
      } else if (type === "video") {
        html += `<div class="lightbox-media-wrap"><video src="${data.src}" controls autoplay playsinline></video></div>`;
      } else if (type === "gallery") {
        galleryImages = data.images;
        galleryIndex = 0;
        html += `<div class="lightbox-media-wrap"></div>`;
        if (galleryImages.length > 1) {
          html += `<div class="lightbox-nav">
            <button type="button" class="lightbox-arrow" data-lb-prev aria-label="Anterior">${svgArrowLeft}</button>
            <div class="lightbox-dots">${galleryImages.map((_, i) => `<button type="button" class="lightbox-dot" data-lb-dot="${i}" aria-label="Ir para imagem ${i + 1}"></button>`).join("")}</div>
            <button type="button" class="lightbox-arrow" data-lb-next aria-label="Próxima">${svgArrowRight}</button>
          </div>`;
        }
      } else if (type === "pending") {
        html += `<div class="lightbox-pending">
          ${svgPending}
          <strong>${data.title || "Prévia a caminho"}</strong>
          <p>${data.desc || "Esse material ainda não foi encaixado no site. Manda o arquivo direto aqui no chat que a gente coloca."}</p>
          ${data.link ? `<a href="${data.link}" target="_blank" rel="noopener">${data.linkLabel || "Ver link"} ${svgExternal}</a>` : ""}
        </div>`;
      }

      if (data.title && type !== "pending") {
        html += `<div class="lightbox-caption"><strong>${data.title}</strong>${data.desc ? `<span>${data.desc}</span>` : ""}${data.link ? `<br><a href="${data.link}" target="_blank" rel="noopener">${data.linkLabel || "Ver link"} ${svgExternal}</a>` : ""}</div>`;
      }

      stage.innerHTML = html;
      if (type === "gallery") {
        renderGalleryFrame();
        stage.querySelector("[data-lb-prev]")?.addEventListener("click", () => {
          galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
          renderGalleryFrame();
        });
        stage.querySelector("[data-lb-next]")?.addEventListener("click", () => {
          galleryIndex = (galleryIndex + 1) % galleryImages.length;
          renderGalleryFrame();
        });
        stage.querySelectorAll("[data-lb-dot]").forEach((dot) => {
          dot.addEventListener("click", () => {
            galleryIndex = Number(dot.dataset.lbDot);
            renderGalleryFrame();
          });
        });
      }
    }

    function openLightbox(trigger) {
      const data = {
        type: trigger.dataset.lightbox,
        src: trigger.dataset.lbSrc,
        title: trigger.dataset.lbTitle,
        desc: trigger.dataset.lbDesc,
        link: trigger.dataset.lbLink,
        linkLabel: trigger.dataset.lbLinkLabel,
        images: trigger.dataset.lbImages ? JSON.parse(trigger.dataset.lbImages) : null,
      };
      buildStage(data);
      restoreFocus = trigger;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-locked");
      lightbox.querySelector(".lightbox-close")?.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-locked");
      const video = stage.querySelector("video");
      if (video) video.pause();
      stage.innerHTML = "";
      if (restoreFocus) restoreFocus.focus();
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => openLightbox(trigger));
    });
    lightbox.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !lightbox.classList.contains("open")) return;
      closeLightbox();
    });
  }

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
