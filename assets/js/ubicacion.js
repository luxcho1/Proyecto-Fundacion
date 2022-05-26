function findMe(){
    var output = document.getElementById('map');

    // Verificar si soporta geolocalizacion
    if (navigator.geolocation) {
        output.innerHTML = "<p>espere un momento</p>";
    }else{
        output.innerHTML = "<p>su navegador no soporta Geolocalizacion</p>";
    }

    //Obtenemos latitud y longitud
    function localizacion(posicion){

        var latitude = posicion.coords.latitude;
        var longitude = posicion.coords.longitude;

        var imgURL = "https://maps.googleapis.com/maps/api/staticmap?center="+latitude+","+longitude+"&size=600x300&markers=color:red%7C"+latitude+","+longitude+"&key=AIzaSyD1IH_7XELVMY_fFNucrU5MUKAuw-xEpbI";

        output.innerHTML ="<img src='"+imgURL+"'>";

        

    }

    function error(){
        output.innerHTML = "<p>no se pudo obtener su ubicación</p>";

    }

    navigator.geolocation.getCurrentPosition(localizacion,error);

}

$(document).ready(function(){
    var ubicacion = navigator.geolocation.getCurrentPosition(function(info){
        var latitud = info.coords.latitude;
        var longitud = info.coords.longitude;

        $.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&lang=es&units=metric&appid=68a417ccd8493e33698b951ac65f49c4`, function(data){
            console.log(data)
            var html = `<h7 id="ciudad" class="text-capitalize">${data.name} (${data.sys.country}): ${data.weather[0].description} <h7>
                        <h7 id="temperatura" class="text-capitalize"> Temperatura: ${data.main.temp} humedad: ${data.main.humidity}% <h7>`;
            $('#info-clima').html(html);
        },'json').fail(function(){
            Swal.fire({
                title: 'Error',
                title: 'En estos momentos la api no funciona',
                icon: 'error',
                confirmButtonText: 'Continuar'
              });
        })
    })
})