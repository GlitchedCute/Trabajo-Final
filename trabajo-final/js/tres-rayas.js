
const jugadorUno = "⚫";
const jugadorDos = "⚪";


let turnos = "Primero";


const espacios = document.querySelectorAll(".espacio");


espacios.forEach((espacio, i) => {
    espacio.addEventListener("click", () => {
        if(turnos === "FIN"){
            return
        }
        if(espacio.textContent !== "") return
        
        if(turnos === "Primero"){
            espacio.innerText = jugadorUno;
        }else{
            espacio.innerText = jugadorDos;
        }
        const ubicacionGanador = hayGanador();

        if(typeof ubicacionGanador === "object"){
            unGanador(ubicacionGanador);
            return
        }
        if(ubicacionGanador === "empate"){
            mostrarInformacion("EMPATE");
        }
        
        if(turnos === "Primero"){
            turnos = "Segundo";
        }else{
            turnos = "Primero";
        }
    });
});


function hayGanador(){
    
    const arrayEspacios = [...espacios].map(espacio => espacio.textContent);


    for(let i = 0; i < 9; i+= 3){
        if(arrayEspacios[i] && arrayEspacios[i] === arrayEspacios[i+1] && arrayEspacios[i] === arrayEspacios[i+2]){
            return ([i, i+1, i+2])
        }
    }

    for(let i = 0; i < 3; i++){
        if(arrayEspacios[i] && arrayEspacios[i] === arrayEspacios[i+3] && arrayEspacios[i] === arrayEspacios[i+6]){
            return ([i, i+3, i+6])
        }
    }

    if(arrayEspacios[0] && arrayEspacios[0] === arrayEspacios[4] && arrayEspacios[0] === arrayEspacios[8]){
        return ([0, 4, 8])
    }
    if(arrayEspacios[2] && arrayEspacios[2] === arrayEspacios[4] && arrayEspacios[2] === arrayEspacios[6]){
        return ([2, 4, 6])
    }

    if(arrayEspacios.includes("")) return false;
    return "empate";
}

function unGanador(posicionDelGanador){

    posicionDelGanador.forEach(posicion => {
        espacios[posicion].classList.toggle("posiciones-ganadoras", true);
        espacios[posicion].innerText = "❤";
        if(turnos === "Primero"){
            espacios[posicion].classList.add("color-uno");
            espacios[posicion].classList.remove("color-dos");
        }else{
            espacios[posicion].classList.add("color-dos");
            espacios[posicion].classList.remove("color-uno");
        }
    })
    mostrarInformacion(turnos);
    turnos = "FIN";
}

const informacion = document.getElementById("contenedor-informacion");
const textoInfo = document.getElementById("info");

function mostrarInformacion(resultado){
    if(turnos === "Primero"){
        info.innerText = "El Ganador del juego es el Negro";
    }
    if(turnos === "Segundo"){
        info.innerText = "El Ganador del juego es el Blanco";
    }
    if(resultado === "EMPATE"){
        info.innerText = "El juego ha finalizado en Empate";
    }

    informacion.style.display = "block";
}

document.getElementById("reiniciar").addEventListener("click", () => {
    espacios.forEach(espacio => {
        espacio.textContent = "";
        espacio.classList.toggle("posiciones-ganadoras", false);
        informacion.style.display = "none";
        turnos = "Primero";
    })
})