const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById("btnEmpezar");

class Juego {
  constructor() {
      this.inicializar();
      this.generarSecuencia();
      this.siguienteNivel();
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this)
      btnEmpezar.classList.add('hide');
      this.nivel = 1;
      this.colores = {
          celeste,
          violeta,
          naranja,
          verde
      }
  }
  
  generarSecuencia() {
    this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4));
  }
  
  siguienteNivel() {
    this.iluminarSecuencia();
    this.agregarEventoClick();
  }
  
  // Funcion que trasforma un numero a un color
  trasformarNumeroAColor(numero) {
    switch(numero){
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  // Funcion que recorre el numero de la secuencia y le aplica la funcion de transformarNumeroAColor
  iluminarSecuencia() {
    for(let i = 0; i < this.nivel; i++){
      const color =this.trasformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }
  // Funcion para cambiar el color del elemento y agrega una clase al css
  iluminarColor(color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }
  
  // Funcion para quitar el color y la clase previamente implementadas
  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  // Funcion que agrega los eventos de click a los botones
  agregarEventoClick(){
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
  }

  elegirColor(){

  }
}
function empezarJuego(){
  window.juego = new Juego();
}