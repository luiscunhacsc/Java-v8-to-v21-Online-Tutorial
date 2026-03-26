(function () {
  "use strict";

  const PREFIX = "javaModerno.v1";
  const KEYS = {
    completed: `${PREFIX}.progress`,
    quizScores: `${PREFIX}.quizScores`,
    quizAnswers: `${PREFIX}.quizAnswers`,
    totalScore: `${PREFIX}.totalScore`
  };

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        return fallback;
      }
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getCompletedMap() {
    return readJson(KEYS.completed, {});
  }

  function markCompleted(moduleId, done) {
    const map = getCompletedMap();
    map[moduleId] = Boolean(done);
    writeJson(KEYS.completed, map);
  }

  function isCompleted(moduleId) {
    const map = getCompletedMap();
    return Boolean(map[moduleId]);
  }

  function getQuizScores() {
    return readJson(KEYS.quizScores, {});
  }

  function setQuizScore(moduleId, score, max) {
    const payload = getQuizScores();
    payload[moduleId] = {
      score: score,
      max: max,
      percent: max > 0 ? Math.round((score / max) * 100) : 0,
      updatedAt: new Date().toISOString()
    };
    writeJson(KEYS.quizScores, payload);
    recomputeTotalScore();
  }

  function getModuleScore(moduleId) {
    const payload = getQuizScores();
    return payload[moduleId] || null;
  }

  function getQuizAnswers() {
    return readJson(KEYS.quizAnswers, {});
  }

  function saveQuizAnswers(moduleId, answersMap) {
    const payload = getQuizAnswers();
    payload[moduleId] = answersMap;
    writeJson(KEYS.quizAnswers, payload);
  }

  function getModuleAnswers(moduleId) {
    const payload = getQuizAnswers();
    return payload[moduleId] || null;
  }

  function recomputeTotalScore() {
    const scores = getQuizScores();
    const values = Object.values(scores);

    let raw = 0;
    let max = 0;
    values.forEach((entry) => {
      raw += Number(entry.score || 0);
      max += Number(entry.max || 0);
    });

    const total = {
      score: raw,
      max: max,
      percent: max > 0 ? Math.round((raw / max) * 100) : 0
    };
    writeJson(KEYS.totalScore, total);
    return total;
  }

  function getTotalScore() {
    const fallback = { score: 0, max: 0, percent: 0 };
    return readJson(KEYS.totalScore, fallback);
  }

  window.JavaStorage = {
    KEYS: KEYS,
    getCompletedMap: getCompletedMap,
    markCompleted: markCompleted,
    isCompleted: isCompleted,
    getQuizScores: getQuizScores,
    setQuizScore: setQuizScore,
    getModuleScore: getModuleScore,
    getQuizAnswers: getQuizAnswers,
    saveQuizAnswers: saveQuizAnswers,
    getModuleAnswers: getModuleAnswers,
    recomputeTotalScore: recomputeTotalScore,
    getTotalScore: getTotalScore
  };
})();
