class Columnas {

  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }


  mostrar() {
    stroke(97, 105, 110);
    fill(183, 183, 158);
    rect(this.x1, this.y1, this.x2, this.y2);
  }

  mover() {
    if (this.x1 >= width) {
      this.x1 = -this.x2;
    }
    this.y2 += 10;
  }

  actualizarGrosor(mouseY) {
    if (mouseY < height / 2) {
      // Si el mouse se mueve hacia arriba, aumenta el grosor
      this.x2 += 1;
    } else {
      // Si el mouse se mueve hacia abajo, disminuye el grosor
      this.x2 -= 1;
    }
    if (mouseY>=100){
      this.x2=50;
    } else if (mouseY<=10){
      this.x2=20;
    }
  }
}


/*===========================================================================================================*/


//Funcion para detectar que el mouse se está moviendo 
function mouseMovedEvent() {
  mouseMoved = true;
}

let columnas = [];
let capa2;
let pincelada = [];
let cantidad = 5;
let mouseMoved = false; // Variable para verificar si el mouse se ha movido
let tiempo = 0;

function preload() { //cargo las imagenes
  for (let i = 0; i < cantidad; i++) {
    let nombre = "data/pinceladas" + nf(i, 2) + ".png";
    pincelada[i] = loadImage(nombre);
  }
}

function setup() {
  createCanvas(displayWidth, windowHeight);
  frameRate(30);
  for (let i = 0; i < 25; i++) {
    let x = i * 70; // Espacio horizontal entre las columnas
    let columna = new Columnas(x, 0, 50, 50); // Crear un objeto columna en la posición x
    columnas.push(columna); // Agregar el objeto columna al array
  }
  capa2 = createGraphics(width, height);

  document.addEventListener("mousemove", mouseMovedEvent);
}

function draw() {
  background(97, 105, 110);
  tiempo++;
  for (let i = 0; i < columnas.length; i++) {
    let columna = columnas[i];
    columna.mostrar();
    columna.mover();
    if (mouseMoved) {
      columna.actualizarGrosor(mouseY);
    }
  }

  if (mouseMoved) {
    if (tiempo % 15 === 0) {// Controlar la velocidad de aparición de las imágenes (cada 30 frames)
      let cual = capa2.int(random(cantidad)); //muevo con el mouse las pinceladas
      let x = capa2.random(mouseX);
      let y = capa2.random(mouseY);
      capa2.tint(255, 150);
      capa2.image(pincelada[cual], x, y, 300, 300);
    }
    image(capa2, 0, 0);
  }
  
  mouseMoved = false; // Reiniciar la variable para que las imágenes no se sigan mostrando mientras el mouse esté quieto. Mismo con el grosor de las columnas.

  // Reiniciar el tiempo después de un tiempo determinado para evitar que se vuelva demasiado grande
  if (tiempo > 100000) {
    tiempo = 0;
  }
}
