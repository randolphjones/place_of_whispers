//routing and DOM logic
//set up vars for routing
var router;

//grab the initial base URL for the page
var baseurl;


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
		},
		experience: function(){
			//dom manip logic goes here
			console.log('experience page!');
		},
		about: function(){
			//dom manip logic goes here
			console.log('about page!');
		},
		schedule: function(){
			//dom manip logic goes here
			console.log('schedule page!');
		},
		gallery: function(){
			//dom manip logic goes here
			console.log('gallery page!');
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