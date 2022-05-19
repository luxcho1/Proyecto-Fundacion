function saludar() {
    var fecha = new Date();
    document.getElementById('saludo').innerHTML = 'Hola hoy es ' + fecha;
    var tiempo = setTimeout(function() {saludar()},1000);
}