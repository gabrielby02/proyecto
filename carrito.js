let contador = 0;
let total = 0;
let juegosAgregados = [];
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
        document.getElementById("contador").innerHTML = contador;
        document.getElementById("total").innerHTML = total;
        let lista = document.getElementById("listaCompras");
        if(contador == 1){
            lista.innerHTML = "• " + nombre;
        }
        else{
            lista.innerHTML += "<br>• " + nombre;
        }
        Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: nombre + ' fue agregado al carrito'
        });
    }
}