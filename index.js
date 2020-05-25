const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById("btnEmpezar")
const ultimoNivel = 10;
class Juego {
  constructor() {
      this.inicializar = this.inicializar.bind(this)
      this.inicializar()
      this.generarSecuencia()
      setTimeout(this.siguienteNivel, 500)
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
      this.nivel = 1
      this.colores = {
          celeste,
          violeta,
          naranja,
          verde,
      }
  }
  
  toggleBtnEmpezar() {
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    } else {
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ultimoNivel).fill(0).map(n => Math.floor(Math.random() * 4))
  }
  
  siguienteNivel() {
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventoClick()
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

  // Funcion que transforma un color a un numero
  trasformarColorANumero(color) {
    switch(color){
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  // Funcion que recorre el numero de la secuencia y le aplica la funcion de transformarNumeroAColor
  iluminarSecuencia() {
    for(let i = 0; i < this.nivel; i++){
      let color = this.trasformarNumeroAColor(this.secuencia[i])
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
  
  // Funcion que elimina los eventos click de los botones
  eliminarEventoClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
  }

  // Funcion para seleccionar el boton iluminado y seguir la secuencia
  elegirColor(ev){
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.trasformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if(numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++
      if(this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventoClick()
        if (this.nivel === (ultimoNivel + 1)) {
          this.ganoElJuego()
        } else {
          setTimeout(this.siguienteNivel, 1000)
        }
      }
    } else {
      this.perdioElJuego()
    }
  }

  ganoElJuego(){
    swal ( "Genial" ,  "Ganaste el juego" ,  "success" )
    .then(this.inicializar())
  }

  perdioElJuego(){
    swal ( "Oops" ,  "Perdiste le juego" ,  "error" )
    .then(this.eliminarEventoClick())
  }
}
function empezarJuego(){
  window.juego = new Juego();
}