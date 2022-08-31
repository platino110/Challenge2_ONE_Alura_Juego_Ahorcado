;(function(){
    // variables
    var palabras = ["INGLES","ALBARICOQUE","MURCIELAGO","IDIOSINCRASIA","JIRAFA","OVOVIVIPARO","DINASTIA","RESTAURANTE","ELECTROCARDIOGRAMA","RINOCERONTE","LINUX","OBJETIVO","AVION","MATEMATICAS","FISICA","ALGEBRA","PROGRAMACION","CASA","CARRO","MOTO"]
    var juego = null
    var final = false
    var html = {
        hombredibujo: document.getElementById("hombredibujo"),
        correctas: document.querySelector(".correctas"),
        incorrectas: document.querySelector(".incorrectas")
    }
    
    // funcion que grafica el nuevo juego
    function graficar(juego){
        var elemento, elemento1, elemento2
        elemento = html.hombredibujo
        // grafica dependiendo del estado del nuevo juego
        elemento.src = "./imagenes/ahorcado" + juego.estado + ".jpg"
        //guarda la nueva palabra del juego
        var palabra = juego.palabra
        //guarda las letras correctas e incorrectas 
        var correcta = juego.correcto
        var incorrecta =juego.incorrecto
        //permite manupar el espacio de palabras correctas
        elemento1 = html.correctas
        elemento1.innerHTML = ""
        //muestra los espacios para la palabra correcta y la letra correcta digitada
        for (let letra of palabra) {
            //crea los espacios de la palabra correcta
            let etiqspan = document.createElement("span")
            let texto = document.createTextNode ("")
            //muestra las letras correctas que pertenencen a la palabra
            if (correcta.indexOf(letra) >= 0){
                texto.nodeValue = letra
            }
            etiqspan.setAttribute("class", "correcta")
            etiqspan.appendChild(texto)
            elemento1.appendChild(etiqspan)
        }
        //permite manupar el espacio de palabras incorrectas
        elemento2 = html.incorrectas
        elemento2.innerHTML = ""
        //muestra las letras incorrectas digitadas
        for (let letra of incorrecta){
            let etiqspan = document.createElement("span")
            let texto = document.createTextNode (letra)
            etiqspan.setAttribute("class", "incorrecta")
            etiqspan.appendChild(texto)
            elemento2.appendChild(etiqspan)  
        }
    }
    
    //funcion que valida la letra que se digita
    function adivinar(juego, letra){
        //guarda el tamaño d ela palabra a a adivinar
        let contador = juego.palabra.length
        //si el estado es 1=perdio o 8=gano no hace nada
        if (juego.estado == 1 || juego.estado == 8 ) {
            return
        }
        //valida que la letra digitada pertenezca a la palabara a adivinar
        if (juego.palabra.indexOf(letra) >=0 ) { 
            if (juego.correcto.indexOf(letra) >= 0){
                return //si la letra digitada ya esta en el espacio de letras correctas no hace nada
            } else {//sino escribe la letra en el espacio de letras correctas 
                juego.correcto.push(letra);
            }
            //for anidados que van contando la cantidad de letras faltantes para completar la palabra a adivinar  
            for (let letra1 of juego.palabra){
                for (let letra2 of juego.correcto){
                    if (letra1 == letra2){
                        contador-- //contador para letras faltantes
                    }
                }
            } 
            //sino falta ninguna letra a adivinar pasa a estado 8=gano
            if (contador == 0){
                juego.estado = 8 
            }              
        } else //si la letra digitada no pertence a la palabra a adivinar valida si ya esta en las letras incorrectas
            {
                if (juego.incorrecto.indexOf(letra) >= 0){
                    return //si la letra digitada ya esta en las letras incorrectas no hace nada
                    } else { //sino escribe la letra en espacio de letras incorrectas
                        juego.estado-- //cambia de estado la imagen del juego, un paso mas cerca a perder 
                        juego.incorrecto.push(letra)
                }
            }
    }

    //evento que lee la letra digitada
    window.onkeypress = function adivinarletra(e) {
        var letra = e.key //guarda la letra digitada
        letra = letra.toUpperCase()//la convierte en letra mayuscula
        let patron  = /[A-ZÑ]/ //define patron para solo letras mayusculas que incluye la ñ
        if (!patron.test(letra)){ //si la letra digitada no cumple el patron no hace nada
            return
        }
        adivinar(juego, letra) //invoca la funcion que valida la letra que se digita
        if (juego.estado == 8 && !final) { //si el estado es 8=gano y la variable final es falso da por ganado el juego
            setTimeout(function(){ //muestra alerta que gano 
                    alert("Buenas noticias, GANASTE!!! FELICIDADES!!!");
                    final = true //cambia la variable final a true
                }, 300);
            } else if (juego.estado == 1 && !final) { //si el estado es 1=perdio y la variable final es falso da por perdido el juego
                setTimeout(function(){ //muestra alerta que perdio 
                    alert("PERDISTE!!! la palabra era: " + juego.palabra + ", dale a NUEVO JUEGO, nada que hacer.");
                    final = true //cambia la variable final a true
                }, 300);
            }
        graficar(juego) //llama a la funcion que grafica 
    }

    //evento que inicia un nuevo juego
    window.nuevojuego = function nuevojuego() {
        //seleeciona una palabra de la lista de palabras
        var eleccion = ~~(Math.random()*palabras.length)
        var palabra = palabras[eleccion]
        //inicializa un nuevo juego
        juego = {} 
        juego.palabra = palabra
        juego.estado = 7
        juego.correcto = []
        juego.incorrecto = []
        //cambia la variable final a false
        final = false
        //llama a la funcion que grafica 
        graficar(juego)
        console.log(juego) //muestra el valor de variables que pertenecen a juego 
    }

    //evento que permite ingresar una nueva palabra
    window.nuevapalabra = function nuevapalabra() {
        //solicita que se digite la nueva palabra
        var palabranueva = prompt("Condiciones: ingrese la palabra sin espacios, ni caracteres especiales y sin numeros", "");
        let patron  = /[áéíóúÁÉÍÓÚ!"·$%&/()=?¿^\d*¨;:`+´,./*-_\s]/ //define un patron de letras prohibidas 
		if(palabranueva == undefined){ //si digita cancelar, muestra mensaje
			alert("Ha pulsado cancelar");
		}else if(palabranueva == ""){ //sino se digita nada, muestra mensaje
			alert("No ha ingresado palabra");
		    } else { //valida la pablabra digitada
                if (!patron.test(palabranueva)){  //si la palabra no cumple con el patron quiere decir que solo son letras 
                    palabranueva = palabranueva.toUpperCase() //pasa la palabra a mayusculas
                    palabras.push(palabranueva) //guarda la nueva palabra 
                    alert("Se confirma el ingreso de la palabra " + palabranueva + " al listado de palabras") //confirmacion ingreso nueva palabra
                } else { //sino indica qeu nos e cumplio las condiciones 
                    alert("Ingrese solo letras, sin numeros, espacios, caracteres especiales y sin acentos")
                }
		    }
        console.log(palabras) //muestra el listado de palabras y las nuevas palabras guardadas 
    }
    //inicia la pagina con un nuevo juego
    nuevojuego()
}())

