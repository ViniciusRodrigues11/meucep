$(document).ready(function () {
  feather.replace()
  getLocation();
  getAddress()
});

const getCepByPosition = (request, response) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${request.latitude},${request.longitude}&key=AIzaSyDQyu9lYR4Zy5JVLT360Ffc5lQ4wB2pojc`
  axios.get(url).then(function (response) {
    const responseSize = (response.data.results[0].address_components.length) - 1;
    const addressData = [{
      formatted_address
    } = response.data.results[0].formatted_address, {
      long_name
    } = response.data.results[0].address_components[responseSize]]
    renderImages(response.data.results[0].address_components[3].long_name)
    renderAddress(addressData)
  })
}

const getCepByAddress = (request, response) => {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${request}&key=AIzaSyDQyu9lYR4Zy5JVLT360Ffc5lQ4wB2pojc`).then(function (response) {
    const position = {
      latitude: response.data.results[0].geometry.location.lat,
      longitude: response.data.results[0].geometry.location.lng
    };
    
    renderPosition(position)
    getCepByPosition(position)
  })
}

function getLocation() {

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  const sucess = (loc) => {
    const position = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude
    };
     renderPosition(position)
    getCepByPosition(position)
  }

  navigator.geolocation.getCurrentPosition(sucess, error, options);

}

const renderPosition = ({
  latitude,
  longitude
}) => {
  $('#currentPosition').text(`Latitude: ${latitude}  Longitude: ${longitude}`)
  $( '#map_container' ).html( ' ' ).append( '<div id="map"></div>')
  var map = L.map('map').setView([latitude, longitude], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([latitude, longitude]).addTo(map)
    .openPopup();
}

const renderAddress = (address) => {
  
  $('#addressView h2').text(address[1].long_name)
  $('#addressView p').text(address[0])
}

function getAddress() {
  $('#address').on('keypress',function(e){
    if ($('#address').val()) {
      const address = ($('#address').val()).replace(/ /gi, '+')
      getCepByAddress(address)
    } else {
      console.error('Precisa de um endereço')
    }
  })
  
  $('#btnGetAddress').on('click', function () {
    if ($('#address').val()) {
      const address = ($('#address').val()).replace(/ /gi, '+')
      getCepByAddress(address)
    } else {
      console.error('Precisa de um endereço')
    }
  })
}
