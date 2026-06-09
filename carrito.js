let contador = parseInt(localStorage.getItem("carrito_contador")) || 0;
let total = parseFloat(localStorage.getItem("carrito_total")) || 0;
let juegosAgregados = JSON.parse(localStorage.getItem("carrito_juegos")) || [];
function obtenerPrecioJuego(nombre) {

    if (nombre == 'GTA V') return 30;
    if (nombre == 'Minecraft') return 25;
    if (nombre == 'Red Dead Redemption 2') return 45;
    if (nombre == 'God of War') return 40;
    if (nombre == 'Fornite') return 5;
    if (nombre == 'Elden Ring') return 50;
    if (nombre == 'Call of Duty: Modern Warfare') return 35;
    if (nombre == 'Silent Hill 2') return 40;
    if (nombre == 'hollow Knight') return 15;
    if (nombre == 'GTA VI en tus sueños XD') return 0;
    if (nombre == 'The Legend of Zelda: Twilight Princess') return 35;
    if (nombre == 'Zenless Zone Zero') return 3.99;
    if (nombre == 'The Last Of Us') return 40;
    if (nombre == 'Resident Evil 4 Remake') return 50;
    if (nombre == 'Cyberpunk 2077') return 45;

    return 0;
}
function actualizarVistaCarrito() {
    let contadorElemento = document.getElementById("contador");
    let totalElemento = document.getElementById("total");
    let listaElemento = document.getElementById("listaCompras");

    if (contadorElemento && totalElemento && listaElemento) {
        contadorElemento.innerHTML = contador;
        totalElemento.innerHTML = total;

        if (juegosAgregados.length === 0) {
            listaElemento.innerHTML = "No hay juegos agregados";
        } else {
            listaElemento.innerHTML = "";
            for (let i = 0; i < juegosAgregados.length; i++) {
                listaElemento.innerHTML += "• " + juegosAgregados[i] + 
                    " <button class='btn btn-sm btn-danger ms-2 py-0' style='font-size: 11px;' onclick='quitarJuego(" + i + ")'>Quitar</button><br>";
            }
        }
    }
}
actualizarVistaCarrito();

function agregarJuego(nombre, precio){
    let existe = false;
    for(let i = 0; i < juegosAgregados.length; i++){
        if(juegosAgregados[i] == nombre){
            existe = true;
        }
    }
    
    if(existe == true){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Este juego ya está agregado al carrito'
        });
    }
    else{
        juegosAgregados.push(nombre);
        contador++;
        total = total + precio;
        localStorage.setItem("carrito_contador", contador);
        localStorage.setItem("carrito_total", total);
        localStorage.setItem("carrito_juegos", JSON.stringify(juegosAgregados));

        actualizarVistaCarrito();

        Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: nombre + ' fue agregado al carrito'
        });
    }
}
function quitarJuego(index) {
    let nombreJuego = juegosAgregados[index];
    juegosAgregados.splice(index, 1);
    total = 0;
    for(let i = 0; i < juegosAgregados.length; i++){
        total += obtenerPrecioJuego(juegosAgregados[i]);
    }
    contador = juegosAgregados.length;
    localStorage.setItem("carrito_contador", contador);
    localStorage.setItem("carrito_total", total);
    localStorage.setItem("carrito_juegos", JSON.stringify(juegosAgregados));
    actualizarVistaCarrito();
    Swal.fire({
        icon: 'info',
        title: 'Eliminado',
        text: nombreJuego + ' fue quitado del carrito'
    });
}

function guardarFormulario() {
    let nom = document.getElementById("formNombre");
    let ema = document.getElementById("formEmail");
    let dir = document.getElementById("formDireccion");
    let men = document.getElementById("formMensaje");
    if (nom && ema && dir && men) {
        localStorage.setItem("form_nombre", nom.value);
        localStorage.setItem("form_email", ema.value);
        localStorage.setItem("form_direccion", dir.value);
        localStorage.setItem("form_mensaje", men.value);
    }
}
function cargarFormularioGuardado() {
    let nom = document.getElementById("formNombre");
    let ema = document.getElementById("formEmail");
    let dir = document.getElementById("formDireccion");
    let men = document.getElementById("formMensaje");

    if (nom && ema && dir && men) {
        nom.value = localStorage.getItem("form_nombre") || "";
        ema.value = localStorage.getItem("form_email") || "";
        dir.value = localStorage.getItem("form_direccion") || "";
        men.value = localStorage.getItem("form_mensaje") || "";
    }
}
cargarFormularioGuardado();
function limpiarTodoDespuesDeEnviar(formulario) {
    localStorage.clear();
    contador = 0;
    total = 0;
    juegosAgregados = [];
    actualizarVistaCarrito();
    formulario.reset();
}