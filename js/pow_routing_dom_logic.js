//routing and DOM logic
//set up vars for routing
var router;

//grab the initial base URL for the page
var baseurl;

//specify the current language content object. Default to english
var currentLang = contentEng;

function buildRouter(){
	var Router = Backbone.Router.extend({
		routes: {
			'participate': 'participate',
			'experience': 'experience',
			'about': 'about',
			'schedule': 'schedule',
			'gallery': 'gallery'
		
		}, 
		participate: function(){
			//dom manip logic goes here
			console.log('participation page!');
			generalIn('participate', currentLang.praticipate);
		},
		experience: function(){
			//dom manip logic goes here
			console.log('experience page!');
			generalIn('experience', currentLang.experience);
		},
		about: function(){
			//dom manip logic goes here
			console.log('about page!');
			
			generalIn('about', currentLang.about);
		},
		schedule: function(){
			//dom manip logic goes here
			console.log('schedule page!');
			generalIn('schedule', currentLang.schedule);
		},
		gallery: function(){
			//dom manip logic goes here
			console.log('gallery page!');
			generalIn('gallery', currentLang.gallery);
		}
	});
	//initialize router and bind it to the history
	router = new Router();
	Backbone.history.start();
	
	if(window.location.href.indexOf('#')>0){
		
		baseurl = window.location.href.split('#')[0];
		
	}else{
		baseurl = window.location.href;
	}
}

//build a URL from the appropriate topic
function routeMe(t){
	window.location.href = baseurl + '#' + t;

}


//this function happens universally on any page state change or route IN
function generalIn(title, content){
	//fade in the shade on top of the canvas
	$('#contentHeader').html(title);
	$('#contentBody').html(content);
	$('#contentBox').fadeIn(500);
	
}
//this function happens universally to return the page back home
function generalOut(){
	//fade content
	$('#contentBox').fadeOut(500, function(){
		//push the browser URL back to its previous state
		window.history.back();
	
	});

}