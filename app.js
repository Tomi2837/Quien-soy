import { CHARACTER_POOL } from "./characters.js";

const nombre = document.getElementById("nombre");
const btnEmpezar = document.getElementById("btnEmpezar");
const btnSiguiente = document.getElementById("btnSiguiente");

let disponibles = [];

function mezclar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function reiniciarPool() {
  disponibles = mezclar(CHARACTER_POOL);
}

function obtenerSiguiente() {
  if (disponibles.length === 0) {
    reiniciarPool();
  }
  return disponibles.pop();
}

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mostrarPersonaje() {
  btnEmpezar.disabled = true;
  btnSiguiente.disabled = true;

  nombre.textContent = "3";
  await esperar(1000);
  nombre.textContent = "2";
  await esperar(1000);
  nombre.textContent = "1";
  await esperar(1000);

  const personaje = obtenerSiguiente();
  nombre.textContent = personaje.displayName;

  btnEmpezar.disabled = false;
  btnSiguiente.disabled = false;
}

btnEmpezar.addEventListener("click", mostrarPersonaje);
btnSiguiente.addEventListener("click", mostrarPersonaje);

reiniciarPool();