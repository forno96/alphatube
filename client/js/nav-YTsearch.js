/*
 * example
 * https://google-developers.appspot.com/youtube/v3/code_samples/
 * https://gist.github.com/danviv/11156842
*/


// https://developers.google.com/api-client-library/javascript/reference/referencedocs#loading-the-client-library
function handleClientLoad() {
	gapi.load('client', handleAPILoaded);	// Asynchronously loads the gapi libraries requested
}

function handleAPILoaded() {
	// https://developers.google.com/api-client-library/javascript/start/start-js
	gapi.client.init({
		'apiKey': 'AIzaSyCZIY9kX67U3u3wtgrO3FviBD_uIm5AQao',
		'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
	});
	$('#search-button').attr('disabled', false);
	$('#searchForm').on("submit",function(){youtubeSearch();});
}

function param(name) {
    return (location.hash.split(name)[1] || '').split('&')[0];
}

// example <body onload="youtubeSearch(promiseName);">
function youtubeSearch() {	//defaul value is supported in ECMA v6+
	//location.hash = '#Search?' + $('#searchForm').serialize();
	youtubeSearchResultContainer();
	$('#Search').collapse('show');
	gapi.client.request({
		'method': 'GET',
		'path': '/youtube/v3/search',
		'params': {
			'q': $('#query').val(),
			'part': 'snippet',
			'maxResults': 12,
			'type': 'video',
			'videoCategoryId': 10
		}
	}).then(function(response) {
		//console.log(response);
		youtubeSearchResult(response.result);
	});
}

function youtubeSearchResultContainer() {
	if ( $('#search-row-container').length ) $('#search-row-container').empty();
	else $("#Search").append(
		`<div class="container-fluid">
			<div class="bg-light px-4 pt-3 pb-1">
				<!--<h5 class="title text-center">Search result</h5>-->
				<div class="row justify-content-center" id="search-row-container">
				</div>
				<nav aria-label="Page navigation example">
					<ul class="pagination justify-content-center">
						<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
						<li class="page-item active"><a class="page-link" href="#">1 <span class="sr-only">(current)</span></a></li>
						<li class="page-item"><a class="page-link" href="#">2</a></li>
						<li class="page-item"><a class="page-link" href="#">3</a></li>
						<li class="page-item"><a class="page-link" href="#">Next</a></li>
					</ul>
				</nav>
			</div>
		</div>`
	);
}

function youtubeSearchResult(response) {
	//console.log(response);
	// TODO: make query string https://api.jquery.com/jquery.param/
	// https://davidwalsh.name/query-string-javascript
	// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
	for (var i=0; i<response.items.length; i++) {
		$('#search-row-container').append(
			'<div class="card card-columns col-lg-2 col-md-3 col-sm-4 px-0 mb-2">' +
				'<a href="#?videoID=' + response.items[i].id.videoId + '">' +
					'<img class="card-img-top img-fluid" src="' + response.items[i].snippet.thumbnails.medium.url + '" alt="' + response.items[i].snippet.title + '">' +
					'<div class="card-body">' +
						'<h6 class="card-title">' + response.items[i].snippet.title + '</h6>' +
/*'<p class="card-text text-wrap text-truncate">' + response.items[i].snippet.description + '</p>' +*/
					'</div>' +
				'</a>' +
			'</div>'
		);
	}
	
	$( "#search-row-container > div > a" ).click(function() {
		$('#Search').collapse('hide');
	});
	
	// TODO: https://www.codeply.com/go/JuADMG3eTG/bootstrap-image-hover-css-zoom-scale
	// http://api.jquery.com/animate/
	
	// MOUSEOVER fires when the pointer moves into the child element as well, while
	// MOUSEENTER fires only when the pointer moves into the bound element.
	$("#search-row-container > div").mouseenter( function() {
		//$(this).siblings().removeClass('col-lg-2 col-md-3 col-sm-4');
		//$(this).siblings().addClass('col');
		$(this).removeClass('col-lg-2 col-md-3 col-sm-4');
		$(this).addClass('col');
	}).mouseleave( function() {
		//$(this).siblings().addClass('col-lg-2 col-md-3 col-sm-4');
		//$(this).siblings().removeClass('col');
		$(this).addClass('col-lg-2 col-md-3 col-sm-4');
		$(this).removeClass('col');
	});
	
	// TODO: using cache
}

/*
function truncate(length,str1,str2) {
	var sum = str1.length + str2.length;
	if (sum > length) {
		return str1.substring(0, length - (sum - length) - 3) + '...';
	}
	else if (sum < length) {
		var ret = str1;
		for (var i=str1.length; i<(length - (sum - length)); i++) ret = ret + ' ';
		return ret;
	}
	else return str1;
}*/
