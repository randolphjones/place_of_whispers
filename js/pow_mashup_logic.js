
var k = 'M7TtkpupLwgk3q7UQkd5UhFiEELJFw57Losv0NmuZdkrmAYRFY';
var u = 'http://api.tumblr.com/v2/blog/placeofwhispers.tumblr.com/posts/';
var type = 'audio';	

//this function grabs tumblr results
function grabResults(){
	$.ajax({
		type:'GET',
		url:u+type+'?api_key='+k,
		dataType: 'JSONP',
		api_key: k,
		success: jsonParse,
		});
}

//this function parses the data that comes back
function jsonParse(d){
	console.log(d.response);
	_.each(d.response.posts, function(p){
		console.log(JSON.stringify(p.audio_url));
		//test appending main
		$('#main').append(_.template($('#audTemp').html(), p));
	});
}

//this function populates the gallery with the latest items
function popGallery(){
	
}