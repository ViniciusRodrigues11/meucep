
function renderImages(city){
  city += ' cidade'
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://bing-image-search1.p.rapidapi.com/images/search?count=5&safeSearch&q=${city}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
      "x-rapidapi-key": "a7301e5b09msh14e9febab0405fap1cee92jsn1dd97e01ea29"
    }
  }
  axios(settings).then(function (response){
    const images = response.data.value
    $('#images, img').fadeIn(1800);
    for(i=0; i <= 4; i++){
      $(`#images > img:nth-child(${i+1})`).attr('src', images[i].contentUrl) 
    }
  })
}


// // $.ajax(settings).done(function (response) {
// // 	console.log(response);
// // });
