//routing and DOM logic
//set up vars for routing
var router;

//grab the initial base URL for the page
var baseurl;

//keep track of the state
var state = 'index';

//specify the current language content object. Default to english
var currentLang = 'en';
var currentContent = contentEng;

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
			state='participate';
			console.log('participation page!');
			generalIn('participate', currentLang.participate);
		},
		experience: function(){
			state='experience';
			console.log('experience page!');
			generalIn('experience', currentLang.experience);
		},
		about: function(){
			state='about';
			console.log('about page!');
			generalIn('about', currentLang.about);
		},
		schedule: function(){
			state='schedule';
			console.log('schedule page!');
			generalIn('schedule', currentLang.schedule);
		},
		gallery: function(){
			state='gallery';
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
	$('#shade').fadeIn(500, function(){
		//push the browser URL back to its previous state
		$('#contentBox').fadeIn(500);

	});
	
}
//this function happens universally to return the page back home
function generalOut(){
	//fade content
	
	$('#contentBox').fadeOut(500, function(){
		$('#shade').fadeOut(500);
		state='index';
		//push the browser URL back to its previous state
		window.history.back();
	
	});

}

//this function will change content to german
function translate(){
	//grab the flag image name
	//translate content
	
	switch(currentLang){
		case 'en':
			//switch to german
			$('#transflag').css('background-image', 'url(images/en_flag.png)');
			
			//swap language objects
			currentLang='de';
			currentContent = contentDeu;
			
			//swap sculpture labels
			
			//swap content
			
			break;
		case 'de':
			//switch to english
			$('#transflag').css('background-image', 'url(images/de_flag.png)');
			
			//swap language objects
			currentContent = contentEng;
			currentLang='en';
			
			//swap sculpture labels
			
			//swap content
			
			break;
		
	
	}
	
	console.log(currentLang);
}

//this is a universal function that populates content of Dom objects
function populateContent(){


}