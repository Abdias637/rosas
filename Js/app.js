let Titulo = document.title;

window.addEventListener('blur', () => {
    Titulo = document.title;
    document.title = "No te vayas, regresa :(";
})

window.addEventListener('focus', () => {
    document.title = Titulo;
})

let h1 = document.getElementById("Titulo");
let Boton1 = document.getElementById("B1");
Boton1.addEventListener('click', function() {
    const ContenedorBotones = document.querySelector(".Con");
    document.querySelector(".Texto").style.display = "block";
    ContenedorBotones.style.display = "none";
    DibujarFlor(500, 100, 6, 30, 100, 200);
    h1.remove();
})

document.getElementById("B12").addEventListener('click', function() {
    const ContenedorBotones = document.querySelector(".Con");
    ContenedorBotones.style.display = "none";
    document.querySelector(".Texto").style.display = "block";
    CrearVarias();
    h1.remove();
})

const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

function DibujarPetalo(x, y, RadioX, scala, Rotacion, color1, color2, pasos) {
    const Numero = scala;

    const AnguloIncrement = (Math.PI / pasos) * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Rotacion);
    ctx.scale(1, Numero);
    ctx.beginPath();
    for (let i = 0; i <= pasos; i++) {
        const AnguloActual = i * AnguloIncrement;
        const currentRadius = Math.sin(AnguloActual) * RadioX;
        const PuntoY = Math.sin(AnguloActual) * currentRadius;
        const PuntoX = Math.cos(AnguloActual) * currentRadius;
        if (i === 0) {
          ctx.moveTo(PuntoX, PuntoY);
        } else {
          ctx.lineTo(PuntoX, PuntoY);
        }
        // Interpolación de color
        const gradiente = ctx.createLinearGradient(x, y, x + RadioX, y + RadioX);
        gradiente.addColorStop(0, color1);
        gradiente.addColorStop(1, color2);
        ctx.strokeStyle = gradiente;
        ctx.fillStyle = gradiente;
        ctx.fill();
        ctx.stroke();
      }
    
      ctx.restore();
}

function DibujarFlor(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo, AltoTrazo) {
    // Tallo
    const PasosTallo = 50;
    const AltoTallo = AltoTrazo / PasosTallo;
    let NuevaY = y;

  const DibujarTallo = () => {
    if (NuevaY < y + AltoTrazo) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, NuevaY);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      NuevaY += AltoTallo;
      setTimeout(DibujarTallo, 100);
    } else {
      // Dibuja los petalos en el tallo
      const Pasos = 50;
      let CuantosPasos = 0;
      function DibujarPetalosTallo() {
        if (CuantosPasos <= Pasos) {
          const PetaloY = y + 250 - RadioYPetalo;
          const PetaloY2 = y + 200 - RadioYPetalo;
          DibujarPetalo(500, PetaloY, 15, 2, 300, 'blue', 'white', CuantosPasos);
          DibujarPetalo(470, PetaloY2, 15, 2, 300, 'blue', 'white', CuantosPasos);
          CuantosPasos++;
          setTimeout(DibujarPetalosTallo, 100);
        }
      }
      DibujarPetalosTallo();
    }
  };
  DibujarTallo();

    const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;
  
    let contadorPetalos = 0;
    function dibujarSiguientePetalo() {
        if (contadorPetalos <= NumeroPetalos) {
          const Angulo = contadorPetalos * AnguloIncrement;
          DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, 'blue', 'white', 100);
          contadorPetalos++;
          setTimeout(dibujarSiguientePetalo, 1000); 
        }
        // Dibuja el centro de la flor
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }
      dibujarSiguientePetalo();
}

function DibujarFlorSinTallo(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo, AltoTrazo) {
    // Dibuja el tallo
    const PasosTallo = 30;
    const AltoTallo = AltoTrazo / PasosTallo;
    let NuevaY = y;

  const DibujarTallo = () => {
    if (NuevaY < y + AltoTrazo) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, NuevaY);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      NuevaY += AltoTallo;
      setTimeout(DibujarTallo, 100);
    } 
  };
  DibujarTallo();

    const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;
  
    // Dibuja los pétalos
    let contadorPetalos = 0;
    function dibujarSiguientePetalo() {
        if (contadorPetalos <= NumeroPetalos) {
          const Angulo = contadorPetalos * AnguloIncrement;
          DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, 'blue', 'white', 60);
          contadorPetalos++;
          setTimeout(dibujarSiguientePetalo, 1000); 
        }
        // Dibuja el centro de la flor
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }
      dibujarSiguientePetalo();
}

function CrearVarias() {
    const numFilas = 5; // Aumentamos el número de filas para mostrar 20 flores
    const numColumnas = 4;
    const numFlores = numFilas * numColumnas;

    // Espaciamiento y tamaño de cada flor
    const espacioX = canvas.width / (numColumnas + 1); // Agregamos 1 al número de columnas para centrar las flores
    const espacioY = canvas.height / (numFilas + 1); // Agregamos 1 al número de filas para centrar las flores
    const TamañoFlor = 70;
    const Separacion = 40; // Separación entre flores

    for (let i = 0; i < numFlores; i++) {
        const fila = Math.floor(i / numColumnas);
        const columna = i % numColumnas;
        const x = espacioX * (columna + 1) + Separacion * columna; // Sumamos Separacion * columna para agregar separación horizontal
        const y = espacioY * (fila + 1) + Separacion * fila; // Sumamos Separacion * fila para agregar separación vertical

        DibujarFlorSinTallo(x, y, 8, 15, 40, TamañoFlor);
    }
}
