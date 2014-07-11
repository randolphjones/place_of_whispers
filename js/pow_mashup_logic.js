
var k = 'M7TtkpupLwgk3q7UQkd5UhFiEELJFw57Losv0NmuZdkrmAYRFY';
var u = 'http://api.tumblr.com/v2/blog/placeofwhispers.tumblr.com/posts/';
var type = 'audio';	

var galView = '<br>Loading...';


var audLimit = 10;
var phoLimit = 10;
var vidLimit = 4;


//this function grabs tumblr results
function grabResults(t){
	$.ajax({
		type:'GET',
		url:u+t+'?api_key='+k,
		dataType: 'JSONP',
		api_key: k,
		success: jsonParse,
		});
}

//this function parses the data that comes back
function jsonParse(d){
	//console.log(d.response);
	var templ;
	var limit;
	//select the correct template and limit based on type
	if(type =='audio'){
		galView =  currentContent.gallery + '<div class="contentSubtitle">Sounds</div><div class="allThumbs">';
		templ = $('#audTemp').html();
		limit = audLimit;
	}else if(type == 'photo'){
		templ = $('#phoTemp').html();
		limit = phoLimit;
	}else if(type == 'video'){
		templ = $('#vidTemp').html();
		limit = vidLimit;
	}
	
	//push the right views into the string
	var count = 0;
	_.each(d.response.posts, function(p){
		//console.log(p);
		
		if(count<limit){
			galView = galView + _.template(templ, p);
			count++;
		}
	});
	//switch to the next type now - grab more results
	if(type=='audio'){
		type = 'photo';
		galView = galView + '</div><div class="contentSubtitle">Photos</div><div class="allThumbs">';
		grabResults(type);
	}else if(type == 'photo'){
		
		type = 'video';
		galView = galView + '</div><div class="contentSubtitle">Videos</div><div class="allThumbs">';
		grabResults(type);
	}else if(type == 'video'){
		//take the next step
		galView = galView + '</div>';
		//console.log(galView);
		popGallery(galView);
	}	
}

//this function populates the gallery with the latest items
function popGallery(g){
	//stuff the gallery DOM into the content page
	if(state == 'gallery'){
		$('#contentBody').html(galView);

		}
}