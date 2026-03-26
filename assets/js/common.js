(function () {
  "use strict";

  function toModuleUrl(module) {
    return `modulos/${module.slug}.html`;
  }

  function toModuleUrlFromModulePage(module) {
    return `${module.slug}.html`;
  }

  function getProgressStats() {
    const allModules = window.JavaModerno.modules;
    const completed = window.JavaStorage.getCompletedMap();
    const doneCount = allModules.filter((module) => completed[module.id]).length;
    const percent = Math.round((doneCount / allModules.length) * 100);
    return {
      total: allModules.length,
      done: doneCount,
      percent: percent
    };
  }

  function firstIncompleteModule() {
    const completed = window.JavaStorage.getCompletedMap();
    return window.JavaModerno.modules.find((module) => !completed[module.id]) || null;
  }

  function safeText(text) {
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function setupRevealAnimations() {
    const revealables = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!revealables.length) {
      return;
    }

    revealables.forEach((el, index) => {
      const delay = Math.min(index * 55, 260);
      el.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      revealables.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    revealables.forEach((el) => observer.observe(el));
  }

  function setProgressUI(barEl, textEl, percent, done, total) {
    if (barEl) {
      barEl.style.width = `${Math.max(0, Math.min(100, percent))}%`;
      const track = barEl.parentElement;
      if (track && track.getAttribute("role") === "progressbar") {
        track.setAttribute("aria-valuenow", String(Math.max(0, Math.min(100, percent))));
      }
    }
    if (textEl) {
      textEl.textContent = `${done} de ${total} módulos concluídos`;
    }
  }

  window.JavaCommon = {
    toModuleUrl: toModuleUrl,
    toModuleUrlFromModulePage: toModuleUrlFromModulePage,
    getProgressStats: getProgressStats,
    firstIncompleteModule: firstIncompleteModule,
    safeText: safeText,
    setupRevealAnimations: setupRevealAnimations,
    setProgressUI: setProgressUI
  };
})();
