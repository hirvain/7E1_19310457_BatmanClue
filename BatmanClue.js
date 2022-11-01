let contenido = document.getElementById('content');
let display = document.getElementById('texto');
let displayDiv = document.querySelector('#texto div');
let cont = document.getElementById('cont');
let seguir = document.querySelector('#cont button');
let img = document.createElement('img');
let personajes = document.querySelectorAll('.personajes');
let lugares = document.querySelectorAll('.lugares');

let listPersonaje = ['joker','riddler','carmine','catwoman','penguin'];
let listLugar = ['escaleras','pista','piso2','oficina','parking'];
let listArma = ['rifle','palanca','cuchillo','paraguas','pistola'];

let opci, randPersonajes, randLugares, randArmas,  elecPersonaje, elecLugar, asesino;
let intentos = 0;
let coartadas = [];
let sound = new Audio('sounds/thebatman1.mp3');
sound.volume = 0.3;
let sound2 = new Audio('sounds/boton.mp3');
sound2.volume = 0.3;

let addText = function (texto) { 
    let text = document.createElement('p');
    text.innerHTML = texto;
    displayDiv.append(text);
}

let boton = function (texto) {
    let btn = document.createElement('button');
    let br = document.createElement('br');
    btn.innerHTML = texto;
    displayDiv.append(br);
    displayDiv.append(btn);
}

let changeImg = function (ubicacion) { 
    let img = document.createElement('img');
    let source = document.createElement('source');
    contenido.innerHTML = '';
    img.setAttribute('src',ubicacion);
    contenido.append(img);
}

let main = function () { 
    sound.play();
    sound2.play();
    changeImg('images/start.jpg');
    addText('Hubo un asesinato en el Iceberg lounge');
    addText('Debemos encontrar al culpable antes de que ataque de nuevo');
    display.style.display = 'block';
    cont.style.display = 'block';

    randPersonajes = listPersonaje.sort(function() { return Math.random() - 0.5 });
    randLugares = listLugar.sort(function() { return Math.random() - 0.5 });
    randArmas= listArma.sort(function() { return Math.random() - 0.5 });
    coartadas = [];
    for(let i = 0; i<5; i++) {
        let cintas = {
            personaje: randPersonajes[i],
            lugar: randLugares[i],
            arma: randArmas[i]
        }
        coartadas.push(cintas);
    }
    asesino = {
        personaje: randPersonajes[Math.floor(Math.random() * 5)],
        lugar: randLugares[Math.floor(Math.random() * 5)],
        arma: randArmas[Math.floor(Math.random() * 5)],
    }
   // addText(`El asesinato lo cometio ${asesino.personaje} en ${asesino.lugar} con ${asesino.arma} `);
   /* listPersonaje = randPersonajes.filter((perso) => perso != asesino.personaje);
    listLugar = randLugares.filter((lug) => lug != asesino.lugar);
    listArma = randArmas.filter((arm) => arm != asesino.arma);*/
    seguir.onclick = function() {
        sound2.play();
        instrucciones();
    }
}

let  instrucciones = function () { 
    addText('Sospechosos: 1-Joker 2-Riddler 3-Carmine 4-Catwoman 5-Penguin');
    addText('Lugares: 1-Escaleras 2-Pista 3-2do Piso 4-Oficina 5-Parking ');
    addText('Armas: 1-Rifle 2-Palanca 3-Cuchillo 4-Paraguas 5-Pistola');

    seguir.onclick = function() {
        sound2.play();
        displayDiv.innerHTML = '';
        instrucciones2();
    }
}

 let  instrucciones2 = function () {
    addText('Se puede consultar los videos del club 5 veces antes de que se borren');
    addText('En base a estos eligiras un culpable');

    seguir.onclick = function() {
        sound2.play();
        displayDiv.innerHTML = '';
        cont.style.display = 'none';
        opciones();
    }
 }

 let opciones = function () {
    intentos++;
    if (intentos <= 5) {
        addText('VIDEOS:');  
        boton('Personaje');
        boton('Lugar');
        boton('Arma');
        opci = document.querySelectorAll('#texto div button');
        for (const opc of opci) {
            opc.addEventListener('click', function(event) {
                sound2.play();
                let selec = opc.innerHTML;
                displayDiv.innerHTML = '';
                switch(selec) {
                    case 'Personaje':
                        sPersonaje();
                        break;
                    case 'Lugar':
                        sLugar();
                        break;
                    case 'Arma':
                        sArma();
                        break;
                    default:
                  }
            });
        }      
    } else {
        addText('Se han borrado las grabaciones');
        addText('Elige un culpable');
        cont.style.display = 'block';

        seguir.onclick = function() {
            sound2.play();
            displayDiv.innerHTML = '';
            display.style.display = 'none';
            cont.style.display = 'none';
            sPersonaje();
        }
    }
}

let sPersonaje = function() {
    changeImg('images/villanos.jpg');
    for (const personaje of personajes) {
        personaje.style.display = 'block';
        personaje.addEventListener('click', function (event) { 
            sound2.play();
            let selecP = personaje.getAttribute('id');
            if(intentos <= 5) {
                tapes(selecP);
            } else {
                elecPersonaje = selecP;
                sLugar();
            }
        });
    }
}

let sLugar = function() {
    changeImg('images/lugares.jpg');
    for (const personaje of personajes) {
        personaje.style.display = 'none';
    }
    for (const lugar of lugares) {
        lugar.style.display = 'block';
        lugar.addEventListener('click', function (event) { 
            sound2.play();
            let selecL = lugar.getAttribute('id');
            if(intentos <= 5) {
                tapes(selecL);
            }else {
                elecLugar = selecL;
                sArma();
            }
        });
    }
}

let sArma = function() {
    for (const lugar of lugares) {
        lugar.style.display = 'none';
    }
    displayDiv.innerHTML = '';
    display.style.display = 'block';

    boton('rifle');
    boton('palanca');
    boton('cuchillo');
    boton('paraguas');
    boton('pistola');

    let armas = document.querySelectorAll('#texto div button');

    for (const arma of armas) {
        arma.addEventListener('click', function(event) {
            let selecA = arma.innerHTML;
            displayDiv.innerHTML = '';
            display.style.display = 'none';
            sound2.play();
            if(intentos <= 5) {
                tapes(selecA);
            }else {
                acusar(elecPersonaje,elecLugar,selecA);
            }
        });
    }
}

let tapes = function (seleccion) {  
    let camino;
    for (const personaje of personajes) {
        personaje.style.display = 'none';
    }
    for (const lugar of lugares) {
        lugar.style.display = 'none';
    }
    for(i of coartadas) {
        for(j in i) {
            if(seleccion == i[j]) {
                camino = i;
                if(i.personaje == asesino.personaje) {
                    changeImg('images/noTape.jpg');
                }else {
                    if(i.lugar == asesino.lugar) {
                        changeImg('images/noPlace.jpg');
                    }else {
                        changeImg(`images/${i.personaje}.jpg`);
                    }
                }    
                displayDiv.innerHTML = '';
                addText(`${camino.personaje} dice que estuvo en ${camino.lugar} y vio el arma ${camino.arma}`);
                if(camino.personaje == asesino.personaje) {
                    addText(`No se encuentran grabaciones de ${camino.personaje}`);
                } else {
                    addText(`A ${camino.personaje} se le vio en el lugar`);
                }
                if(camino.lugar == asesino.lugar) {
                    addText(`Las camaras en ${camino.lugar} estan dañadas`);
                } else {
                    addText(`Las camaras en ${camino.lugar} si funcionan`);
                }
                if(camino.arma == asesino.arma) {
                    addText(`Las grabaciones no muestran el arma ${camino.arma}`);
                    
                }else {
                    addText(`Las grabaciones muestran el arma ${camino.arma}`);
                }
                display.style.display = 'block';
                cont.style.display = 'block';
                seguir.onclick = function() {
                    sound2.play();
                    displayDiv.innerHTML = '';
                    cont.style.display = 'none';
                    opciones();
                }
            }
        }
    }

}

let acusar = function (personaje, lugar, arma) {  
    display.style.display = 'block';
    cont.style.display = 'block';
    if(personaje == asesino.personaje && lugar == asesino.lugar && arma == asesino.arma) {
            addText(`Lograste detener al asesino ubicando el arma y lugar correctos.`);
            changeImg('images/goodending.jpg');
    } else {
        changeImg('images/badending.gif');
        addText(`El asesino ha logrado huir`);
        if(personaje !== asesino.personaje) {
            addText(`${personaje} es inocente, las grabaciones lo prueban`);
        }
        if(lugar !== asesino.lugar) {
            addText(`Las grabaciones no muestran el asesinato en ${lugar}`);
        }    
        if(arma !== asesino.arma) {
            addText(`Fallaste con el arma homicida ${arma}, las grabaciones la muestran en lugares donde no paso nada`);
        }
        addText(`El asesinato lo cometio ${asesino.personaje} en ${asesino.lugar} con ${asesino.arma} `);
        addText(`Al parecer no eres el mejor detective del mundo `);
    }
    intentos = 0;  
    cont.style.display = 'block';
    seguir.onclick = function() {
        sound2.play();
        displayDiv.innerHTML = '';
        cont.style.display = 'none';
        display.style.display = 'none';
        main();
    }

}
changeImg('images/inicio.jpg');
window.onclick = function () { main(); this.onclick=null }