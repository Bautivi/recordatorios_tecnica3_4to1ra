//-----#region Eventos del botón-----//
const boton = document.getElementById("botón_fijo_1");
const submenu = document.getElementById("submenu_1");
const submenu_boton_salir = document.getElementById("submenu_botón_salir");
const dropdown = document.getElementById("dropdown_1");
const dropdown_content_1 = document.getElementById("dropdown_content_1");
const dropbtn_1 = document.getElementById("dropbtn_1");
const submenu_boton_listo = document.getElementById("botón_submenu_listo");

const resultados = document.getElementById("resultados");

// cuando presionás botón añadir tarea
boton.addEventListener("mousedown", () => {
  boton.classList.add("expandido");
});

// cuando soltás botón añadir tarea
boton.addEventListener("mouseup", () => {
    boton.classList.remove("expandido");
    if (submenu.style.display != "block") {
        submenu.style.display = "block"; // muestra el submenú
        add_sad_particles();
 }
});

// cuando soltás botón salir
submenu_boton_salir.addEventListener("mouseup", () => {
    
    if (submenu.style.display == "block") {
        borrar_tarea();
        submenu.style.display = "none"; // muestra el submenú
        // Detener partículas
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
 }
});

// cuando soltás botón lista de materias
dropdown.addEventListener("mouseup", () => {
    if (dropdown.style.display != "block") {
        dropdown_content_1.style.display = "block"; // muestra el submenú
    }
});
//-----#endregion Eventos del botón-----//

//-----#region Lógica de tareas submenú-----//
let tarea = "";
let lista_de_tareas = [];

const input_submenu_1 = document.getElementById("input_submenu_1");
input_submenu_1.addEventListener("blur", () => { //si salímos del input submenu 1
    const texto = input_submenu_1.value.trim(); // limpio espacios

    if(texto !== "") { //si hay algo en el input
        tarea = texto; //se sobreescribe
        console.log(tarea);                                                                                                                                                                                                                                                                                
    }
});

submenu_boton_listo.addEventListener("click", () => {
    const titulo = tarea;
    const materia = "";
    const fecha = "";
    if (titulo.trim() == "") {
        console.log("No colocaste el titulo boludo");
        titulo_no_colocado();
    } else {
        submenu.style.display = "none";
        remove_sad_particles();
    }
    
    nueva_tarea = {titulo, materia, fecha};
    lista_de_tareas.push(nueva_tarea);
    resultados.innerHTML = `
    <p>Tarea añadida:</p>
    <b>Título:</b> ${nueva_tarea.titulo}<br>
    <b>Materia:</b> ${nueva_tarea.materia}<br>
    <b>Fecha:</b> ${nueva_tarea.fecha}
  `;
    console.log(nueva_tarea);
    console.log(lista_de_tareas);
    borrar_tarea();
});


function borrar_tarea() {
        tarea = "";
        input_submenu_1.value = "";
        console.log(tarea);
    
}

function titulo_no_colocado() {
    input_submenu_1.placeholder = "Obligatorio";
}

//-----#region Lógica de tareas lista-----//






const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");
const img = document.getElementById("sad_face");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let animationId; // Esto ahora es global para poder cancelarlo

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Clase de partículas (definir afuera)
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.size = 35;
    this.speedY = Math.random() * 3;
  }

  update() {
    this.y += this.speedY;
    if (this.y > canvas.height) {
      this.y = Math.random() * -canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }
}

function initParticles(num) {
  particlesArray = [];
  for (let i = 0; i < num; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  animationId = requestAnimationFrame(animate);
}

// Llamar al abrir submenú
function add_sad_particles() {
  initParticles(50);
  animate();
}

// Llamar al cerrar submenú
function remove_sad_particles() {
  cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray = [];
}