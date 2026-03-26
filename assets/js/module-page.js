(function () {
  "use strict";

  function currentModule() {
    const id = document.body.getAttribute("data-module-id");
    return window.JavaModerno.getById(id);
  }

  function renderSidebar(module) {
    const list = document.getElementById("sidebar-modules");
    const progressLabel = document.getElementById("sidebar-progress");
    if (!list) {
      return;
    }

    const completed = window.JavaStorage.getCompletedMap();
    const items = window.JavaModerno.modules.map((item) => {
      const isActive = item.id === module.id;
      const done = completed[item.id];
      const status = done ? "Concluído" : "Por fazer";
      return `
        <li>
          <a href="${window.JavaCommon.toModuleUrlFromModulePage(item)}" class="${isActive ? "is-active" : ""}" ${isActive ? 'aria-current="page"' : ""}>
            <span class="sidebar-item-head">M${item.ordem.toString().padStart(2, "0")} · ${status}</span>
            <span class="sidebar-item-title">${window.JavaCommon.safeText(item.titulo)}</span>
          </a>
        </li>
      `;
    });
    list.innerHTML = items.join("");

    const stats = window.JavaCommon.getProgressStats();
    if (progressLabel) {
      progressLabel.textContent = `${stats.done} de ${stats.total} concluídos`;
    }
  }

  function renderHeader(module) {
    const title = document.getElementById("module-title");
    const hook = document.getElementById("module-hook");
    const duration = document.getElementById("module-duration");
    const badge = document.getElementById("module-badge");
    const completeButton = document.getElementById("complete-module-btn");

    if (title) {
      title.textContent = module.titulo;
    }
    if (hook) {
      hook.textContent = module.gancho;
    }
    if (duration) {
      duration.textContent = `Duração média: ${module.duracaoMin} min`;
    }
    if (badge) {
      badge.textContent = `Módulo ${module.ordem.toString().padStart(2, "0")}`;
    }
    if (completeButton) {
      const done = window.JavaStorage.isCompleted(module.id);
      completeButton.textContent = done ? "Módulo concluído" : "Marcar como concluído";
      completeButton.classList.toggle("btn-primary", !done);
      completeButton.classList.toggle("btn-secondary", done);
      completeButton.setAttribute("aria-pressed", done ? "true" : "false");
    }
    document.title = `${module.titulo} | Java Moderno 8→21`;
  }

  function renderObjectives(module) {
    const target = document.getElementById("objectives-list");
    if (!target) {
      return;
    }
    target.innerHTML = module.objetivos.map((item) => `<li>${window.JavaCommon.safeText(item)}</li>`).join("");
  }

  function renderSections(module) {
    const target = document.getElementById("sections-wrap");
    if (!target) {
      return;
    }

    target.innerHTML = module.secoes
      .map((sec) => {
        const paragraphs = sec.texto.map((paragraph) => `<p>${window.JavaCommon.safeText(paragraph)}</p>`).join("");
        return `
          <article class="explain-block">
            <h3>${window.JavaCommon.safeText(sec.titulo)}</h3>
            ${paragraphs}
          </article>
        `;
      })
      .join("");
  }

  function codePane(title, codeText) {
    return `
      <div class="example-pane">
        <p class="example-pane-head">${window.JavaCommon.safeText(title)}</p>
        <div class="code-wrap">
          <button class="copy-btn" type="button">Copiar</button>
          <pre class="language-java"><code class="language-java">${window.JavaCommon.safeText(codeText)}</code></pre>
        </div>
      </div>
    `;
  }

  function renderExamples(module) {
    const target = document.getElementById("examples-wrap");
    if (!target) {
      return;
    }

    target.innerHTML = module.exemplos
      .map((example) => {
        return `
          <article class="example-card">
            <h3>${window.JavaCommon.safeText(example.titulo)}</h3>
            <div class="example-grid">
              ${codePane("Antes", example.antes)}
              ${codePane("Moderno", example.moderno)}
            </div>
            <p>${window.JavaCommon.safeText(example.explicacao)}</p>
          </article>
        `;
      })
      .join("");
  }

  function renderPitfalls(module) {
    const target = document.getElementById("pitfalls-list");
    if (!target) {
      return;
    }
    target.innerHTML = module.erros.map((item) => `<li>${window.JavaCommon.safeText(item)}</li>`).join("");
  }

  function renderRecap(module) {
    const target = document.getElementById("recap-list");
    const bridge = document.getElementById("next-bridge");
    if (target) {
      target.innerHTML = module.recap.map((item) => `<li>${window.JavaCommon.safeText(item)}</li>`).join("");
    }
    if (bridge) {
      bridge.textContent = module.ponteProximo;
    }
  }

  function renderQuiz(module) {
    const form = document.getElementById("quiz-form");
    if (!form) {
      return;
    }

    const savedAnswers = window.JavaStorage.getModuleAnswers(module.id) || {};
    const questions = module.quiz
      .map((question, qIndex) => {
        const options = question.opcoes
          .map((option, optionIndex) => {
            const checked = Number(savedAnswers[question.id]) === optionIndex ? "checked" : "";
            const inputId = `${question.id}_${optionIndex}`;
            return `
              <label class="quiz-option" for="${inputId}">
                <input id="${inputId}" type="radio" name="${question.id}" value="${optionIndex}" ${checked}>
                <span>${window.JavaCommon.safeText(option)}</span>
              </label>
            `;
          })
          .join("");

        return `
          <fieldset class="quiz-question">
            <legend>${qIndex + 1}. ${window.JavaCommon.safeText(question.pergunta)}</legend>
            ${options}
          </fieldset>
        `;
      })
      .join("");

    form.innerHTML = `
      ${questions}
      <div class="quiz-actions">
        <button class="btn btn-primary" type="submit">Validar Checkpoint</button>
      </div>
    `;
  }

  function updateModuleScoreChip(moduleId) {
    const chip = document.getElementById("module-score-chip");
    if (!chip) {
      return;
    }

    const score = window.JavaStorage.getModuleScore(moduleId);
    if (!score) {
      chip.textContent = "Sem checkpoint";
      return;
    }
    chip.textContent = `Checkpoint ${score.score}/${score.max} (${score.percent}%)`;
  }

  function updateGlobalProgressUI() {
    const stats = window.JavaCommon.getProgressStats();
    const bar = document.getElementById("module-progress-bar");
    const text = document.getElementById("module-progress-text");
    if (bar) {
      bar.style.width = `${stats.percent}%`;
      const track = bar.parentElement;
      if (track && track.getAttribute("role") === "progressbar") {
        track.setAttribute("aria-valuenow", String(stats.percent));
      }
    }
    if (text) {
      text.textContent = `${stats.percent}% · ${stats.done} de ${stats.total} módulos concluídos`;
    }
  }

  function renderPulse(module) {
    const heroCard = document.querySelector(".hero-card");
    if (!heroCard) {
      return;
    }

    let pulse = document.getElementById("module-pulse");
    if (!pulse) {
      pulse = document.createElement("p");
      pulse.id = "module-pulse";
      pulse.className = "hero-motivation";
      heroCard.appendChild(pulse);
    }

    const score = window.JavaStorage.getModuleScore(module.id);
    const done = window.JavaStorage.isCompleted(module.id);

    if (!done && !score) {
      pulse.textContent = "Ritmo recomendado: fecha este módulo com o quiz antes de avançar.";
      return;
    }

    if (score && score.percent >= 80) {
      pulse.textContent = "Checkpoint forte. Excelente base para acelerar o próximo módulo.";
      return;
    }

    if (score && score.percent < 80) {
      pulse.textContent = "Bom progresso. Revê os pontos com erro antes de seguir.";
      return;
    }

    pulse.textContent = "Módulo assinalado como concluído. Podes reforçar com o checkpoint.";
  }

  function wireQuiz(module) {
    const form = document.getElementById("quiz-form");
    const result = document.getElementById("quiz-result");
    if (!form || !result) {
      return;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const answersMap = {};
      let answeredCount = 0;
      let score = 0;
      const feedback = [];

      module.quiz.forEach((question, index) => {
        const selected = form.querySelector(`input[name="${question.id}"]:checked`);
        if (!selected) {
          feedback.push(`<li class="quiz-feedback-ko">Q${index + 1}: falta responder.</li>`);
          return;
        }

        const selectedIndex = Number(selected.value);
        answersMap[question.id] = selectedIndex;
        answeredCount += 1;
        const isCorrect = selectedIndex === question.indiceCorreto;
        if (isCorrect) {
          score += 1;
          feedback.push(`<li class="quiz-feedback-ok">Q${index + 1}: correta. ${window.JavaCommon.safeText(question.explicacao)}</li>`);
        } else {
          const right = window.JavaCommon.safeText(question.opcoes[question.indiceCorreto]);
          feedback.push(`<li class="quiz-feedback-ko">Q${index + 1}: incorreta. Correta: ${right}. ${window.JavaCommon.safeText(question.explicacao)}</li>`);
        }
      });

      window.JavaStorage.saveQuizAnswers(module.id, answersMap);

      if (answeredCount < module.quiz.length) {
        result.className = "quiz-result warn";
        result.innerHTML = `
          Responde a todas as perguntas para validar o módulo.
          <ul class="quiz-feedback-list">${feedback.join("")}</ul>
        `;
        return;
      }

      window.JavaStorage.setQuizScore(module.id, score, module.quiz.length);
      window.JavaStorage.markCompleted(module.id, true);

      const percent = Math.round((score / module.quiz.length) * 100);
      result.className = percent >= 70 ? "quiz-result good" : "quiz-result warn";
      result.innerHTML = `
        Resultado: ${score}/${module.quiz.length} (${percent}%).
        <ul class="quiz-feedback-list">${feedback.join("")}</ul>
      `;

      renderHeader(module);
      updateModuleScoreChip(module.id);
      updateGlobalProgressUI();
      renderSidebar(module);
      renderPulse(module);
    });
  }

  function wireCompleteButton(module) {
    const button = document.getElementById("complete-module-btn");
    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const done = window.JavaStorage.isCompleted(module.id);
      window.JavaStorage.markCompleted(module.id, !done);
      renderHeader(module);
      updateGlobalProgressUI();
      renderSidebar(module);
      renderPulse(module);
    });
  }

  function renderNav(module) {
    const prevLink = document.getElementById("nav-prev");
    const nextLink = document.getElementById("nav-next");
    const prevId = window.JavaModerno.getPrevId(module.id);
    const nextId = window.JavaModerno.getNextId(module.id);

    if (prevLink) {
      if (!prevId) {
        prevLink.href = "../index.html";
        prevLink.textContent = "Voltar ao Início";
      } else {
        const prevModule = window.JavaModerno.getById(prevId);
        prevLink.href = window.JavaCommon.toModuleUrlFromModulePage(prevModule);
        prevLink.textContent = `Anterior · ${prevModule.titulo}`;
      }
    }

    if (nextLink) {
      if (!nextId) {
        nextLink.href = "../index.html";
        nextLink.textContent = "Finalizar no Início";
      } else {
        const nextModule = window.JavaModerno.getById(nextId);
        nextLink.href = window.JavaCommon.toModuleUrlFromModulePage(nextModule);
        nextLink.textContent = `Seguinte · ${nextModule.titulo}`;
      }
    }
  }

  function wireCopyButtons() {
    const toast = document.getElementById("copy-toast");
    const buttons = Array.from(document.querySelectorAll(".copy-btn"));

    function fallbackCopy(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    async function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
      fallbackCopy(text);
    }

    buttons.forEach((button) => {
      button.addEventListener("click", async () => {
        const code = button.parentElement.querySelector("code");
        if (!code) {
          return;
        }

        try {
          await copyText(code.textContent || "");
          if (toast) {
            toast.textContent = "Código copiado.";
            toast.classList.add("is-visible");
            setTimeout(() => toast.classList.remove("is-visible"), 1300);
          }
        } catch (error) {
          if (toast) {
            toast.textContent = "Falha ao copiar.";
            toast.classList.add("is-visible");
            setTimeout(() => toast.classList.remove("is-visible"), 1300);
          }
        }
      });
    });
  }

  function renderExistingScore(module) {
    const result = document.getElementById("quiz-result");
    const score = window.JavaStorage.getModuleScore(module.id);
    if (!result || !score) {
      return;
    }
    result.className = score.percent >= 70 ? "quiz-result good" : "quiz-result warn";
    result.textContent = `Último resultado guardado: ${score.score}/${score.max} (${score.percent}%).`;
  }

  function highlightCode() {
    if (window.Prism && typeof window.Prism.highlightAllUnder === "function") {
      const root = document.getElementById("module-root");
      if (root) {
        window.Prism.highlightAllUnder(root);
      }
    }
  }

  function boot() {
    const module = currentModule();
    if (!module) {
      return;
    }

    renderHeader(module);
    renderSidebar(module);
    renderObjectives(module);
    renderSections(module);
    renderExamples(module);
    renderPitfalls(module);
    renderRecap(module);
    renderQuiz(module);
    renderExistingScore(module);
    updateModuleScoreChip(module.id);
    updateGlobalProgressUI();
    renderPulse(module);
    renderNav(module);
    wireQuiz(module);
    wireCompleteButton(module);
    wireCopyButtons();
    highlightCode();
    window.JavaCommon.setupRevealAnimations();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
