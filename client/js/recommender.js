var counter = 0;
function recommenderLoader() {
  // TODO: Rimuovere urlVid e da statici e farli dinamici
  // TODO: Generare da[] e urlVid[] e con quello autogenerare le tumbnail

  var recommender0 = [
    {
  		"category": "Indie",
  		"artist": "Pinguini Tattici Nucleari",
  		"title": "Tetris",
  		"videoID": "MQZjkKQGChU"
  	},
  	{
  		"category": "Rock",
  		"artist": "Radiohead",
  		"title": "True Love Waits",
  		"videoID": "z2hZ9CTLICs"
  	},
  	{
  		"category": "Jazz",
  		"artist": "Glenn Miller",
  		"title": "In the mood",
  		"videoID": "6vOUYry_5Nw"
  	},
  	{
  		"category": "Jazz",
  		"artist": "Benny Goodman",
  		"title": "Why don't you do right",
  		"videoID": "4zRwze8_SGk"
  	},
  	{
  		"category": "Trance",
  		"artist": "Musica Per Bambini",
  		"title": "Preghiera Delle Palle Di Neve",
  		"videoID": "vF8WkIsFrrk"
  	}
  ]
  var recommender1 = [
    {
  		"category": "Pop",
  		"artist": "Frank Sinatra",
  		"title": "Somethin' Stupid",
  		"videoID": "PoSbnAFvqfA"
  	},
  	{
  		"category": "pop",
  		"artist": "Tony tammaro",
  		"title": "Scalea",
  		"videoID": "X2nQWeD1JUY"
  	},
    {
  		"category": "pop",
  		"artist": "Bag Raider",
  		"title": "Shooting Stars",
  		"videoID": "feA64wXhbjo"
  	}
  ]
  var recommender2 = [
    {
  		"category": "Rock",
  		"artist": "Muse",
  		"title": "New Born",
  		"videoID": "qhduQhDqtb4"
  	},
  	{
  		"category": "Rock",
  		"artist": "Paolo Nutini",
  		"title": "Iron Sky",
  		"videoID": "ELKbtFljucQ"
  	},
  	{
  		"category": "Metal",
  		"artist": "Nightwish",
  		"title": "Over The Hills And Far Away",
  		"videoID": "CwED4C5FJuo"
  	},
  	{
  		"category": "Punk",
  		"artist": "Crystal Castles",
  		"title": "Baptism",
  		"videoID": "vStjmYxetY0"
  	}
  ]
  var recommender3 = [
    {
  		"category": "Rock",
  		"artist": "Linkin Park",
  		"title": "Bleed it Out",
  		"videoID": "OnuuYcqhzCE"
  	},
  	{
  		"category": "Rock",
  		"artist": "Litfiba",
  		"title": "Gioconda",
  		"videoID": "l51-ebCdCJo"
  	},
  	{
  		"category": "Hip Hop",
  		"artist": "Duplici",
  		"title": "21 grammi",
  		"videoID": "9H_-gIMly_U"
  	},
  	{
  		"category": "Hip Hop",
  		"artist": "Bolo by night",
  		"title": "Inoki",
  		"videoID": "L2WCSlqRZ74"
  	}
  ]
  var recommender4 = [
    {
  		"category": "Rock",
  		"artist": "Oasis",
  		"title": "Wonderwall",
  		"videoID": "bx1Bh8ZvH84"
  	},
  	{
  		"category": "Rock",
  		"artist": "Bryan Scary & the Shredding Tears",
  		"title": "Imitation of The Sky",
  		"videoID": "Xxi5CJo8UbM"
  	},
  	{
  		"category": "Rock",
  		"artist": "Nickelback",
  		"title": "How you remind me",
  		"videoID": "1cQh1ccqu8M"
  	},
  	{
  		"category": "Rock",
  		"artist": "White Stripes",
  		"title": "Seven Nation Army",
  		"videoID": "0J2QdDbelmY"
  	}
  ]
  var recommender5 = [
    {
  		"category": "Rock",
  		"artist": "Foo fighters",
  		"title": "Learn to fly",
  		"videoID": "1VQ_3sBZEm0"
  	},
  	{
  		"category": "Rock",
  		"artist": "Green Day",
  		"title": "Boulevard of broken dreams",
  		"videoID": "Soa3gO7tL-c"
  	},
  	{
  		"category": "Rock",
  		"artist": "Eddie Vedder",
  		"title": "Society",
  		"videoID": "lm8oxC24QZc"
  	},
  	{
  		"category": "Rock 10 ",
  		"artist": "Cellar Darling",
  		"title": "Avalanche",
  		"videoID": "NWMiBj0yDJg"
  	}
  ]

  var recommender = '<h3 class="mt-3">Consigliati</h3>' +
  '<div class="card-deck recommender">';

  var da = "Da YouTube";
  recommender += singleFrame(da, recommender0);
  da = "Dal recommender 1";
  recommender += singleFrame(da, recommender1);
  da = "Dal recommender 2";
  recommender += singleFrame(da, recommender2);
  da = "Dal recommender 3";
  recommender += singleFrame(da, recommender3);
  da = "Dal recommender 4";
  recommender += singleFrame(da, recommender4);
  da = "Dal recommender 5";
  recommender += singleFrame(da, recommender5);
  recommender += '</div>';
  return (recommender);
}

function singleFrame(da, rec) {
  var frame = '' +
  `<div class="col-sm-6 col-md-4 col-lg-3 p-1 m-0">
    <div class="card m-0 sFrm">
    <div id="carousel` + counter + `" class="carousel slide " data-ride="carousel">
        <ol class="carousel-indicators">`
      /* col-6 col-md-4 col-lg-3*/
        for (var e = 0; e < rec.length; e++) {
          frame += '<li data-target="#carousel' + counter + '" data-slide-to="' + e + '"'; if(e == 0){frame += 'class="active"'}; frame += '></li>'
        }
      frame += `</ol>
      <div class="carousel-inner">`
        for (e = 0; e < rec.length; e++) {
        frame += '<div class="carousel-item '; if (e == 0) {frame += 'active'}; frame += '">' +
          '<a href="#?' + $.param(rec[e]) +`" style="text-decoration:none;">
            <div class="card-body text-secondary p-2">
              <h5 class="card-title text-right text-dark font-weight-bold">`
                if (da != undefined) {frame += da} else {frame += 'Dal Recommender'};
              frame += `</h5>
              <p class="card-text mb-1 h6">` + rec[e].artist + `</p>
              <p class="card-text h6"><small class="text-muted">` + rec[e].title + `</small></p>
            </div>
            <img class="card-img-bottom" src="https://i.ytimg.com/vi/` + rec[e].videoID + `/mqdefault.jpg" alt="Card image cap">
          </a>
        </div>`
        }
      frame += `</div>
      <a class="carousel-control-prev mt-5" href="#carousel` + counter + `" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon mt-5" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next mt-5" href="#carousel` + counter + `" role="button" data-slide="next">
        <span class="carousel-control-next-icon mt-5" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</div>`
  counter = counter + 1;
  return frame;
}

$(document).ready(function(){
    $("div.sFrm").mouseover(function(){
        $(this).addClass("border-secondary");
    });
    $("div.sFrm").mouseout(function(){
        $(this).removeClass("border-secondary");
    });
});
