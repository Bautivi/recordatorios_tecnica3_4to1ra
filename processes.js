const botonFijo = document.getElementById("botón_fijo_1");
const submenu = document.getElementById("submenu_1");
const botonSalir = document.getElementById("submenu_botón_salir");
const botonListo = document.getElementById("botón_submenu_listo");
const dropBtn = document.querySelector(".dropbtn");
const dropdown = document.querySelector(".dropdown-content");

// Abrir submenu
botonFijo.addEventListener("click", () => {
    submenu.style.display = "block";
    botonFijo.classList.add("expandido");
});

// Cerrar submenu
botonSalir.addEventListener("click", () => {
    submenu.style.display = "none";
    botonFijo.classList.remove("expandido");
});

// Dropdown
dropBtn.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Cerrar dropdown al hacer click fuera
window.addEventListener("click", (e) => {
    if (!e.target.matches(".dropbtn")) {
        dropdown.style.display = "none";
    }
});
