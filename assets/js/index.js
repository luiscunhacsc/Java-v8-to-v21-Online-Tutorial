(function () {
  "use strict";

  function renderHeroProgress() {
    const stats = window.JavaCommon.getProgressStats();
    const totalScore = window.JavaStorage.getTotalScore();
    const label = document.getElementById("global-progress-label");
    const text = document.getElementById("global-progress-text");
    const bar = document.getElementById("global-progress-bar");
    const scoreText = document.getElementById("global-score-text");
    const motivationText = document.getElementById("global-motivation-text");

    if (label) {
      label.textContent = `${stats.percent}%`;
    }
    window.JavaCommon.setProgressUI(bar, text, stats.percent, stats.done, stats.total);
    if (scoreText) {
      scoreText.textContent = `Pontuação total: ${totalScore.score}/${totalScore.max} (${totalScore.percent}%)`;
    }
    if (motivationText) {
      if (stats.done === 0) {
        motivationText.textContent = "Começa pelo módulo 1 e ganha ritmo.";
      } else if (stats.percent < 45) {
        motivationText.textContent = "Excelente arranque. Mantém consistência e fecha o próximo checkpoint.";
      } else if (stats.percent < 85) {
        motivationText.textContent = "Já tens tração real. Consolida os módulos com pontuação mais baixa.";
      } else if (stats.percent < 100) {
        motivationText.textContent = "Falta pouco para fechar o percurso completo. Últimos módulos em foco.";
      } else {
        motivationText.textContent = "Percurso completo. Revê os checkpoints para atingir domínio total.";
      }
    }
  }

  function renderStartButton() {
    const button = document.getElementById("btn-start");
    if (!button) {
      return;
    }

    const next = window.JavaCommon.firstIncompleteModule();
    if (next) {
      button.href = window.JavaCommon.toModuleUrl(next);
      button.textContent = "Continuar Percurso";
      return;
    }

    const first = window.JavaModerno.modules[0];
    button.href = window.JavaCommon.toModuleUrl(first);
    button.textContent = "Rever Percurso";
  }

  function getStatusPill(moduleId) {
    const done = window.JavaStorage.isCompleted(moduleId);
    if (done) {
      return '<span class="status-pill is-done">Concluído</span>';
    }
    return '<span class="status-pill is-pending">Por fazer</span>';
  }

  function renderModules() {
    const grid = document.getElementById("modules-grid");
    if (!grid) {
      return;
    }

    const scores = window.JavaStorage.getQuizScores();
    const cards = window.JavaModerno.modules.map((module) => {
      const moduleScore = scores[module.id];
      const scoreText = moduleScore
        ? `Checkpoint: ${moduleScore.score}/${moduleScore.max} (${moduleScore.percent}%)`
        : "Checkpoint: por responder";

      const objectives = module.objetivos
        .slice(0, 2)
        .map((item) => `<li>${window.JavaCommon.safeText(item)}</li>`)
        .join("");

      const toneClass = module.ordem % 3 === 1 ? "tone-a" : module.ordem % 3 === 2 ? "tone-b" : "tone-c";

      return `
        <article class="module-card ${toneClass}" data-reveal>
          <header class="module-card-head">
            <div>
              <p class="module-kicker">Módulo ${module.ordem.toString().padStart(2, "0")}</p>
              <h3>${window.JavaCommon.safeText(module.titulo)}</h3>
            </div>
            ${getStatusPill(module.id)}
          </header>
          <p class="module-meta">Duração média: ${module.duracaoMin} min</p>
          <ul class="module-objectives">${objectives}</ul>
          <p class="module-meta">${scoreText}</p>
          <a class="btn btn-primary" href="${window.JavaCommon.toModuleUrl(module)}">Abrir Módulo</a>
        </article>
      `;
    });

    grid.innerHTML = cards.join("");
  }

  function boot() {
    window.JavaStorage.recomputeTotalScore();
    renderHeroProgress();
    renderStartButton();
    renderModules();
    window.JavaCommon.setupRevealAnimations();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
