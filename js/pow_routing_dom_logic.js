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
			generalIn(state, currentContent.participate);
		},
		experience: function(){
			//this is where you would at least put a function in here that runs experience
			state='experience';
			generalIn(state, currentContent.experience);
		},
		about: function(){
			state='about';
			generalIn(state, currentContent.about);
		},
		schedule: function(){
			state='schedule';
			generalIn(state, currentContent.schedule);
		},
		gallery: function(){
			state='gallery';
			generalIn(state, currentContent.gallery);
			//fancy code goes here for view templating
			//$('#contentBody').html('completely replace');
			$('#contentBody').append('append content');

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
	//just make sure you retrieve the content page title in the correct language
	var ind = _.indexOf(contentEng.topics, title);
	$('#contentHeader').html(currentContent.topics[ind]);
	
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
		//window.location.href = baseUrl;
	
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
			_.each(sculptures, function(s){
				swapLabel(s);
			});
			//swap content
			swapContent();
			
			
			break;
		case 'de':
			//switch to english
			$('#transflag').css('background-image', 'url(images/de_flag.png)');
			
			//swap language objects
			currentContent = contentEng;
			currentLang='en';
			
			//swap sculpture labels
			_.each(sculptures, function(s){
				swapLabel(s);
			});
			//swap content
			swapContent();
			
			break;
		
	
	}
	
}

//this swaps out any given label on a sculpture
function swapLabel(s){
	var ind = _.indexOf(contentEng.topics, s.topic);
	s.topicDisp.form.text = currentContent.topics[ind];
	s.topicDispHl.form.text = currentContent.topics[ind];
	if(s.topic == state){
		$('#contentHeader').html(currentContent.topics[ind]);
	}
}



//this is a universal function that swaps content of Dom objects
function swapContent(){
	var key = _.pick(currentContent, state);
	var val = _.values(key);
	$('#contentBody').html(val[0]);

}

