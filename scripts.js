
/* MENU DE NAVEGACION */

const menus = document.querySelectorAll(".menu");
const secciones = document.querySelectorAll(".seccion");

menus.forEach(function(menu) {
    menu.addEventListener("click", function() {
        menus.forEach(function(boton) {
            boton.classList.remove("activo");
        });

        secciones.forEach(function(seccion) {
            seccion.classList.remove("activa");
        });

        menu.classList.add("activo");
        document.getElementById(menu.dataset.seccion)
            .classList.add("activa");
    });
});


/* PROYECTO 1: CALCULADORA DE EDAD */

const dia = document.getElementById("dia");
const mes = document.getElementById("mes");
const anio = document.getElementById("anio");

// Llenar los selectores de fechas

for (let i = 1; i <= 31; i++) {
    dia.add(new Option(i, i));
}

const meses = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

meses.forEach(function(nombre, i) {
    mes.add(new Option(nombre, i + 1));
});

const hoy = new Date();

for (let i = hoy.getFullYear(); i >= 1900; i--) {
    anio.add(new Option(i, i));
}

document.getElementById("calcularEdad").addEventListener("click", function() {
    const d = Number(dia.value);
    const m = Number(mes.value);
    const a = Number(anio.value);
    const resultado = document.getElementById("resultadoEdad");

    if (!d || !m || !a) {
        resultado.textContent = "Selecciona día, mes y año.";
        return;
    }

    const nacimiento = new Date(a, m - 1, d);

    if (
        nacimiento.getFullYear() !== a ||
        nacimiento.getMonth() !== m - 1 ||
        nacimiento.getDate() !== d ||
        nacimiento > hoy
    ) {
        resultado.textContent = "La fecha no es válida.";
        return;
    }

    let anos = hoy.getFullYear() - a;
    let mesesEdad = hoy.getMonth() - (m - 1);

    if (hoy.getDate() < d) {
        mesesEdad--;
    }

    if (mesesEdad < 0) {
        anos--;
        mesesEdad += 12;
    }

    resultado.textContent =
        "Tienes " + anos + " años y " + mesesEdad + " meses.";
});


/* PROYECTO 2: CONVERTIDOR DE TEMPERATURA */

const valor = document.getElementById("valor");
const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const convertir = document.getElementById("convertir");

function revisarCampos() {
    convertir.disabled =
        valor.value.trim() === "" ||
        !Number.isFinite(Number(valor.value)) ||
        origen.value === "" ||
        destino.value === "";
}

valor.addEventListener("input", revisarCampos);
origen.addEventListener("change", revisarCampos);
destino.addEventListener("change", revisarCampos);

convertir.addEventListener("click", function() {
    let temperatura = Number(valor.value);
    let celsius;

    if (origen.value === "C") {
        celsius = temperatura;
    } else if (origen.value === "F") {
        celsius = (temperatura - 32) * 5 / 9;
    } else {
        celsius = temperatura - 273.15;
    }

    const resultado = document.getElementById("resultadoTemperatura");

    if (celsius < -273.15) {
        resultado.textContent = "La temperatura no puede ser menor al cero absoluto.";
        return;
    }

    let respuesta;

    if (destino.value === "C") {
        respuesta = celsius;
    } else if (destino.value === "F") {
        respuesta = celsius * 9 / 5 + 32;
    } else {
        respuesta = celsius + 273.15;
    }

    resultado.textContent =
        Number(temperatura.toFixed(2)) + " " + origen.value +
        " equivalen a " + Number(respuesta.toFixed(2)) +
        " " + destino.value + ".";
});


/* PROYECTO 3: LISTA DE TAREAS */

let tareas = [];

const nuevaTarea = document.getElementById("nuevaTarea");
const lista = document.getElementById("listaTareas");

function renderTasks() {
    lista.innerHTML = "";

    tareas.sort(function(a, b) {
        return Number(a.completada) - Number(b.completada);
    });

    tareas.forEach(function(tarea, indice) {
        const li = document.createElement("li");
        const check = document.createElement("input");
        const texto = document.createElement("span");
        const eliminar = document.createElement("button");

        check.type = "checkbox";
        check.checked = tarea.completada;

        texto.textContent = tarea.descripcion;

        eliminar.textContent = "Eliminar";
        eliminar.className = "eliminar";

        if (tarea.completada) {
            li.classList.add("completada");
        }

        check.addEventListener("change", function() {
            tarea.completada = check.checked;
            renderTasks();
        });

        eliminar.addEventListener("click", function() {
            tareas.splice(indice, 1);
            renderTasks();
        });

        li.append(check, texto, eliminar);
        lista.appendChild(li);
    });
}

function agregar() {
    const descripcion = nuevaTarea.value.trim();

    if (descripcion === "") {
        return;
    }

    tareas.push({
        descripcion: descripcion,
        completada: false
    });

    nuevaTarea.value = "";
    renderTasks();
}

document.getElementById("agregarTarea")
    .addEventListener("click", agregar);

nuevaTarea.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        agregar();
    }
});

