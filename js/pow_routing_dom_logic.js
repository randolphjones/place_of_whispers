//routing and DOM logic
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
		
			console.log('participation page!');
		},
		experience: function(){
			console.log('experience page!');
		},
		about: function(){
			console.log('about page!');
		},
		schedule: function(){
			console.log('schedule page!');
		},
		gallery: function(){
			console.log('gallery page!');
		}
	});
	//initialize router and bind it to the history
	router = new Router();
	Backbone.history.start();
}