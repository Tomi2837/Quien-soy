// app.js
import { CHARACTER_POOL, CATEGORIES } from "./characters.js";

const triggerInput = document.getElementById("triggerInput");
const categorySelect = document.getElementById("categorySelect");
const playBtn = document.getElementById("playBtn");
const resetBtn = document.getElementById("resetBtn");
const revealBtn = document.getElementById("revealBtn");
const nextBtn = document.getElementById("nextBtn");
const copyBtn = document.getElementById("copyBtn");
const historyBtn = document.getElementById("historyBtn");

const board = document.getElementById("board");
const statusEl = document.getElementById("status");
const totalCountEl = document.getElementById("totalCount");
const remainingCountEl = document.getElementById("remainingCount");
const currentCategoryEl = document.getElementById("currentCategory");

let currentCharacter = null;
let currentHidden = false;
let currentPool = [];
let usedIds = new Set();
let history = [];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function populateCategories() {
  Object.entries(CATEGORIES)
    .filter(([key]) => key !== "all")
    .forEach(([key, label]) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = label;
      categorySelect.appendChild(opt);
    });
}

function getFilteredPool() {
  const selected = categorySelect.value;
  if (selected === "all") return CHARACTER_POOL;
  return CHARACTER_POOL.filter(item => item.category === selected);
}

function refillPool() {
  currentPool = shuffle(
    getFilteredPool().filter(item => !usedIds.has(item.id))
  );
}

function updateStats() {
  const fullPool = getFilteredPool();
  totalCountEl.textContent = `Total: ${fullPool.length}`;
  remainingCountEl.textContent = `Restantes: ${currentPool.length}`;
  currentCategoryEl.textContent = `Categoria: ${CATEGORIES[categorySelect.value] || "Todas"}`;
}

function renderEmpty(message = "Todavia no salio nadie") {
  board.innerHTML = `
    <div>
      <div class="char-meta">${message}</div>
    </div>
  `;
}

function renderCharacter(character, hidden = false) {
  board.innerHTML = `
    <div class="${hidden ? "hidden-card" : ""}">
      <div class="char-name">${character.displayName}</div>
      <div class="char-meta">${character.categoryLabel}</div>
      <div class="hint">Base: ${character.baseName}</div>
    </div>
  `;
}

function setWaiting(message) {
  statusEl.textContent = message;
}

async function countdown(seconds) {
  for (let i = seconds; i >= 1; i--) {
    board.innerHTML = `<div class="countdown">${i}</div>`;
    statusEl.textContent = `Mostrando en ${i}...`;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

function drawCharacter() {
  if (!currentPool.length) {
    refillPool();
  }

  if (!currentPool.length) {
    renderEmpty("No quedaron personajes en esta categoria");
    setWaiting("No quedaron personajes");
    return null;
  }

  const next = currentPool.shift();
  usedIds.add(next.id);
  history.unshift(next.displayName);
  history = history.slice(0, 20);

  currentCharacter = next;
  currentHidden = false;
  updateStats();
  return next;
}

async function startGame() {
  const value = triggerInput.value.trim().toLowerCase();

  if (value !== "ok") {
    setWaiting('Escribi "ok" primero');
    return;
  }

  playBtn.disabled = true;
  revealBtn.disabled = true;
  nextBtn.disabled = true;
  copyBtn.disabled = true;

  await countdown(3);

  const selected = drawCharacter();
  if (!selected) {
    playBtn.disabled = false;
    return;
  }

  renderCharacter(selected, false);
  setWaiting("Listo");
  revealBtn.disabled = false;
  nextBtn.disabled = false;
  copyBtn.disabled = false;
  playBtn.disabled = false;
}

function resetGame() {
  usedIds = new Set();
  history = [];
  currentCharacter = null;
  currentHidden = false;
  refillPool();
  updateStats();
  renderEmpty();
  setWaiting("Reset hecho");
  revealBtn.disabled = true;
  nextBtn.disabled = true;
  copyBtn.disabled = true;
}

function revealToggle() {
  if (!currentCharacter) return;
  currentHidden = !currentHidden;
  renderCharacter(currentCharacter, currentHidden);
  setWaiting(currentHidden ? "Oculto" : "Visible");
}

async function nextCharacter() {
  if (!currentCharacter) return;
  playBtn.disabled = true;
  revealBtn.disabled = true;
  nextBtn.disabled = true;
  copyBtn.disabled = true;

  await countdown(3);

  const selected = drawCharacter();
  if (!selected) {
    playBtn.disabled = false;
    return;
  }

  renderCharacter(selected, false);
  setWaiting("Nuevo personaje");
  revealBtn.disabled = false;
  nextBtn.disabled = false;
  copyBtn.disabled = false;
  playBtn.disabled = false;
}

async function copyCurrent() {
  if (!currentCharacter) return;
  await navigator.clipboard.writeText(currentCharacter.displayName);
  setWaiting("Copiado al portapapeles");
}

function showHistory() {
  if (!history.length) {
    alert("Todavia no salio nadie");
    return;
  }
  alert(history.join("\n"));
}

playBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
revealBtn.addEventListener("click", revealToggle);
nextBtn.addEventListener("click", nextCharacter);
copyBtn.addEventListener("click", copyCurrent);
historyBtn.addEventListener("click", showHistory);

categorySelect.addEventListener("change", () => {
  currentCharacter = null;
  currentHidden = false;
  usedIds = new Set();
  refillPool();
  updateStats();
  renderEmpty("Categoria cambiada");
  setWaiting("Categoria actualizada");
  revealBtn.disabled = true;
  nextBtn.disabled = true;
  copyBtn.disabled = true;
});

triggerInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    startGame();
  }
});

populateCategories();
refillPool();
updateStats();
renderEmpty();
setWaiting("Esperando...");