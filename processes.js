//-----HTML elements-----//
const boton = document.getElementById("botón_fijo_1");
const submenu = document.getElementById("submenu_1");
const submenu_boton_salir = document.getElementById("submenu_botón_salir");
const dropdown = document.getElementById("dropdown_1");
const dropdown_content_1 = document.getElementById("dropdown_content_1");
const dropbtn_1 = document.getElementById("dropbtn_1");
const submenu_boton_listo = document.getElementById("botón_submenu_listo");

const resultados = document.getElementById("resultados");

let animationId; // global para poder detener las partículas
let particlesRunning = false; // para evitar iniciar varias veces

//add-task btn expand effect
boton.addEventListener("mousedown", () => {
  boton.classList.add("expandido");
});

//if i click up add-task btn
boton.addEventListener("mouseup", () => {
  boton.classList.remove("expandido");
  if (submenu.style.display !== "block") {
    submenu.style.display = "block"; //show add-task submenu
    if (!particlesRunning) {
      add_sad_particles();
      particlesRunning = true;
    }
  }
});

//if i click up close btn
submenu_boton_salir.addEventListener("mouseup", () => {
  if (submenu.style.display === "block") { //check if submenu is not already closed
    borrar_tarea(); 
    submenu.style.display = "none"; //close add-task submenu
    //stop particles
    stopParticles();
  }
});

//If i click up dropdown btn
dropdown.addEventListener("mouseup", () => {
  dropdown_content_1.style.display =
  dropdown_content_1.style.display === "block" ? "none" : "block";
});

// cuando hacés clic en alguna materia del dropdown
dropdown_content_1.querySelectorAll("a").forEach(opcion => {
  opcion.addEventListener("click", (e) => {
    e.preventDefault(); // evita que el enlace recargue la página
    materia = opcion.textContent; // guarda el texto (ej: "Lengua")
    dropbtn_1.textContent = materia; // cambia el texto del botón
    dropdown_content_1.style.display = "none"; // cierra el menú
  });
});

//-----#region Lógica de tareas submenú-----//
let tarea = "";
let materia = "";
let fecha = "";
let lista_de_tareas = [];

const input_submenu_1 = document.getElementById("input_submenu_1");
input_submenu_1.addEventListener("blur", () => {
  const texto = input_submenu_1.value.trim();
  if (texto !== "") {
    tarea = texto;
  }
});

submenu_boton_listo.addEventListener("click", () => {
  const titulo = tarea;
  if (titulo.trim() === "") {
    console.log("No colocaste el titulo");
    titulo_no_colocado();
  } else {
    submenu.style.display = "none";
    stopParticles();
  }

  const nueva_tarea = {titulo, materia, fecha};
  lista_de_tareas.push(nueva_tarea);

  let new_task = document.createElement("div");
  new_task.className = "tareas";

  new_task.innerHTML = `
    <p><b>Título:</b> ${nueva_tarea.titulo || "(sin título)"}<br>
    <b>Materia:</b> ${nueva_tarea.materia || "(vacío)"}<br>
    <b>Fecha:</b> ${nueva_tarea.fecha || "(vacío)"}</p>
  `;
  const contenedor = document.getElementById("contenedor_de_tareas");
  contenedor.appendChild(new_task);
  borrar_tarea();
  stopParticles();
  console.log(lista_de_tareas);
});

function borrar_tarea() {
   // limpiar inputs
  input_submenu_1.value = "";
  input_day.value = "";
  input_month.value = "";
  dropbtn_1.textContent = "Seleccionar"; // reset dropdown visual
  materia = "";
  submenu.style.display = "none";
}

function titulo_no_colocado() {
  input_submenu_1.placeholder = "Obligatorio";
}
//-----#endregion Lógica de tareas submenú-----//

//-----#region Fecha (día y mes)-----//
const input_day = document.getElementById("fecha_dia");
const input_month = document.getElementById("fecha_mes");

// controlar que el día esté entre 1 y 31
input_day.addEventListener("input", () => {
  let valor_day = parseInt(input_day.value);
  if (valor_day > 31) input_day.value = 31;
  if (valor_day < 1 || isNaN(valor_day)) input_day.value = "";
});

// controlar que el día esté entre 1 y 31
input_month.addEventListener("input", () => {
  let valor_month = parseInt(input_month.value);
  if (valor_month > 12) input_month.value = 12;
  if (valor_month < 1 || isNaN(valor_month)) input_month.value = "";
});

// actualizar la variable fecha cuando cambie algo
function actualizarFecha() {
  const dia = input_day.value;
  const mes = input_month.value;
  if (dia && mes) {
    fecha = `${dia}/${mes}`;
  } else {
    fecha = "";
  }
}

input_day.addEventListener("change", actualizarFecha);
input_month.addEventListener("change", actualizarFecha);
//-----#endregion Fecha (día y mes)-----//

//-----#region Partículas-----//
function add_sad_particles() {
  const canvas = document.getElementById("particlesCanvas");
  const ctx = canvas.getContext("2d");
  const img = document.getElementById("sad_face");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height;
      this.size = 35;
      this.speedY = 1 + Math.random() * 3;
    }

    update() {
      this.y += this.speedY;
      if (this.y > canvas.height) this.reset();
    }

    draw() {
      ctx.drawImage(img, this.x, this.y, this.size, this.size);
    }
  }

  const particlesArray = [];
  for (let i = 0; i < 40; i++) {
    particlesArray.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particlesArray) {
      p.update();
      p.draw();
    }
    animationId = requestAnimationFrame(animate);
  }

  animate();
}

// detener partículas correctamente
function stopParticles() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
    particlesRunning = false;

    const canvas = document.getElementById("particlesCanvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}

document.body.addEventListener("click", (e) => {
    const circle = document.createElement("div");
    circle.classList.add("ripple");

    // Posición del click en la pantalla
    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;

    document.body.appendChild(circle);

    // Quitar el círculo después de la animación
    setTimeout(() => {
        circle.remove();
    }, 600);
});