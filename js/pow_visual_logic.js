
			// declare variables here 
			//may refactor to cut down on globals
			var stage;			
			var canvas;
			var w;
			var h;
			var sculptures = [];
			var sculptureCt = 5;
			//scale factor for the sculptures based on a normal screen width
			var sculptureScaleFac = 670;
			//how much margin is on the edges to buffer the sculptures
			var margin = .1;
			//json object array that will hold waypoint info
			var wayPoints;
			//waypoint / rotation speed
			var speed =10000;
			
			//highlighted sculpture sprite
			var sculpturehl;
			var topAlpha = .75;
			
			//whisper shapes and graphics
			var whsh;
			var whg;
			//var whcolor = '#B9D8FA';
			var whrgb = [185, 216, 250];
			var sc; 
			
			var blurFilter;
			
			//whisper objects and logic
			var whispers = [];
			var whCount = 10;
			var attractor;
			var whSize = 3;
			var tail = 15;
			
			
			var frameRate = 24;
			var velocity = 8;
			var acceleration = frameRate/24*5;
			var tSpeed = 6.5;	
			var intervalSwitch = 5000;
			
			
			//set up vars for routing
			var router;
			
			//loading queue for any kind of audio
			//it's likely that we'll be downloading audio from soundcloud
			//soundcloud may be buffered though..
			/*
			var queue = new createjs.LoadQueue(true);
			queue.installPlugin(createjs.Sound);
			createjs.Sound.alternateExtensions = ['mp3'];
			queue.on('complete', handleComplete, this);
			queue.on('progress', progressTick);
			queue.loadManifest([
				{id: 'sound1', src: 'audio/sound1.mp3'}
				]);
				
				*/
			// Set a function to run on document load
			$(document).ready(function(){
				buildRouter();
			
				//sizing logic
				//only works for a desktop with a horizontal aspect ratio right now
				//will eventually add logic to size and configure specifically for mobile.
				w = $('#canHolder').width();
				h = $('#canHolder').height()*.66;
				$('#canHolder').append('<canvas id="whisperCan" width="'+w+'" height="'+h+'">You need an HTML5-enabled browser to view this content.</canvas>');
			
			
				
			
				//define canvas set up the stage
				canvas = $('#whisperCan')[0];
				resizeCan();
				stage = new createjs.Stage(canvas);
				
				wayPoints = calcWp(sculptureCt);
				//console.log(wayPoints);
				//set up and position five images initially
				for(var i=0; i<sculptureCt; i++){
					//define each sculpture as a createjs bitmap
					sculptures[i] = new createjs.Bitmap('images/sculpture.png');
					sculptures[i].regX = 82;
					sculptures[i].regY = 150;
					
					
					
				}
				
				//re-sort the array to more accurately reflect the animation order of the sculptures
				sculptures = [sculptures[2], sculptures[0], sculptures[1], sculptures[3], sculptures[4]];
				
				//now that they're placed in the appropriate order, they can be placed on the stage
				for(var i = 0; i < sculptures.length; i++){
					
					sculptures[i].x = wayPoints[i].x;
					sculptures[i].y = wayPoints[i].y;
					sculptures[i].scaleX  = sculptures[i].scaleY = wayPoints[i].scale;
					sculptures[i].alpha = wayPoints[i].alpha;
					
					stage.addChild(sculptures[i]);
					
					//add a placeholder for an event listener for each sculpture
					sculptures[i].addEventListener('mousedown', function(evt){console.log('you clicked on a sculpture')});;
				}
				//set each sculpture in motion with a recursive function
				for(var i = 0; i < sculptureCt; i++){
					if((i+1)>=sculptureCt){
						rotateNext(i, 0);
					}else{
						rotateNext(i, i+1);
					}
				}
				
				//logic for the highlighted sculpture
				sculpturehl = new createjs.Bitmap('images/sculpture_hl.png');
				sculpturehl.regX = 82;
					sculpturehl.regY = 150;
				
				//set the initial alpha value for the highlight to 0
				sculpturehl.alpha = 0;
				
				//add a property to the highlight that holds the index value for the sculpture that the highlight will be attached to
				sculpturehl.attInd = 0;
				sculpturehl.update = function(ind){
					this.x = sculptures[ind].x;
					this.y = sculptures[ind].y;
					this.scaleX = this.scaleY = sculptures[ind].scaleX;
					//this.alpha = sculptures[ind].alpha;	
					
				}
				sculpturehl.update(sculpturehl.attInd);
				stage.addChild(sculpturehl);
				
				//initialize a context for drawing graphics dynamically for the whispers
				whg =  new createjs.Graphics();
				whsh = new createjs.Shape(whg);
				//add the drawing context to the stage
				whsh.alpha=.95;
				stage.addChild(whsh);
				
				
				
				//blurFilter = new createjs.BlurFilter(12, 12, 1);
				
				//whsh.filters = [blurFilter];
				//whsh.cache(0,0,w,h);
				//swarm logic
				//set up a test attractor;
				attractor = $V([200, 100]);
				for(var i=0; i<whCount; i++){
					//set up the whispers initially
					whispers.push(new Whisper(Math.random() * w, 
					Math.random() * h,
					velocity,
					acceleration,
					tSpeed,
					Math.random() * whSize));
				}
				
				//update the stage initially
				//stage.update();
				//set the ticker and framerate
				createjs.Ticker.setFPS(frameRate);
				createjs.Ticker.addEventListener('tick', drawNewFrame);
				
				setAttractor();
				setInterval(function(){ setAttractor()}, intervalSwitch);
			});
			
			//set a function to run on window resize
			$(window).resize(function(){
				//resizeCan();
			});
			
			//function that runs when the loadqueue is completed
			function handleComplete(){
				//createjs.Sound.play('sound1');
			}
			//function that runs when progress is recorded in the preload
			function progressTick(evt){
				console.log(evt.progress*100 + "% loaded");
			}
			
			//helper function to resize canvas
			function resizeCan(){
				//$('#whisperCan').css('width', '100%');
				//$('#whiserCan').css('height', '100%');
				//$('#whisperCan').attr('width', window.innerWidth);
				//$('#whisperCan').attr('height', window.innerHeight);
			}
			//calculate waypoint values based on a count
			function calcWp(ct){
				var wp = [];
				var canWid = $(canvas).width();
				for(var i = 0; i<ct; i++){
					var o = {};
					//o.x = $(canvas).width()/(ct-1) * i;
					o.x =  (((canWid - (canWid * margin*2))/(ct-1))*i)+ (canWid * margin);
					//frame the y range for placement
					var yt = $(canvas).height()*.66;
					var yb = $(canvas).height()*.33;
					
					
					
					//populate waypoints manually for now
					//find algorithm if there's time...
					switch(i){
						case 0:
							o.y = $(canvas).height()*.5;
							break;
						case 1:
							o.y = $(canvas).height()*.33;
							break;
						case 2:
							o.y = $(canvas).height()*.66;
							break;				
						case 3:
							o.y = $(canvas).height()*.33;
							break;			
						case 4:
							o.y = $(canvas).height()*.5;
							break;
					}
					//determine scaling and alpha based on y placement
					o.scale = map_range(o.y, yb, yt, .45*canWid/sculptureScaleFac, .75*canWid/sculptureScaleFac);
					//o.scale = map_range(o.y, yb, yt, .45, .75);
					o.alpha = map_range(o.y, yb, yt, .6, 1.0);
					
					//push the object to the end of the array
					wp.push(o);
				}
				//reorder the array based on y placement and x proximity to the middle
				//reorder manually for now
				wp = [wp[2], wp[0], wp[1], wp[3], wp[4]];
				
				return wp;
			}
			function drawNewFrame(evt){
	
				
				//update the whisper swarm
				//draw the whisper swarm into the graphics context
				
				whg.clear();
				for(var i=0; i<whispers.length; i++){
					whispers[i].update();
					
					whispers[i].render();
				}
				
				//move the attractor to where it needs to go
				moveAttractor();
				
				//move and scale highlight per frame
				
				sculpturehl.update(sculpturehl.attInd);
				
				
				stage.update();	
				
				
			}
			
			//function for remaping values
			function map_range(value, low1, high1, low2, high2) {
				return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
			}
			
			
			
			//a recursive function that tweens the rotation of each sculpture
			function rotateNext(s, p){
			
				if(p>=sculptureCt){
					p=0;
				}
				if(p==sculptureCt){
				//always draw the sculpture at the correct index
					//stage.setChildIndex(sculptures[s], 0);
				}
				if(p==0){
				//always draw the sculpture at the correct index
					//stage.setChildIndex(sculptures[s], sculptureCt);
				}
			
				//console.log('call!');
				createjs.Tween.get(sculptures[s],
					{override:true,
					//loop:true
					})
					.to({x: wayPoints[p].x,
						y: wayPoints[p].y, 
						scaleX: wayPoints[p].scale, 
						scaleY: wayPoints[p].scale, 
						alpha: wayPoints[p].alpha}, 
						speed, createjs.Ease.linear)
						.call(function(){rotateNext(s, p+1)});
			}
			
			//the class that constitutes a single whisper
			function Whisper(x, y, v, a, t, s){
				this.locale = [];
				for(i = 0; i<tail; i++){
					this.locale.push($V([x, y]));
				}
				//this.lastLocale = $V([x, y]);
				this.velocity = $V([v, v]);
				this.acceleration = $V([a, a]);
				this.acc = a;
				this.topSpeed = t;
				this.size = s;
				this.update = function(){
					var ts = this.topSpeed;	
					
					//this.lastLocale = this.locale[0];
					
					var dir = attractor.subtract(this.locale[tail-1]);
					//normalize the vector
					var length = Math.sqrt((dir.elements[0]*dir.elements[0])+(dir.elements[1] * dir.elements[1]));
					dir = dir.map(function(x){return x/Math.abs(length)});
					dir.multiply(this.acc);
					
					this.acceleration = dir;
					this.velocity = this.velocity.add(this.acceleration);
					//set limit to top speed here
					this.velocity = this.velocity.map(function(q){
						if(q > ts){
							return ts;
						}else if(q<ts*-1){
							return ts*-1;
						}else{
							return q;
						}
					});
					//console.log(this.velocity.elements[0]);
					this.locale.push( this.locale[tail-1].add(this.velocity));
					this.locale.splice(0,1);
					//this.locale = attractor;
					//console.log('you\'ve been moved');
					
				}
				
				this.render = function(){
					//console.log('you\'ve been rendered');
					for(i=1; i<tail; i++){
						//lolerz! windshield wipers!
						var lv = this.locale[i-1].elements;
						var v = this.locale[i].elements;
						
						var whcol = 'rgba('+
						whrgb[0]+
						','+ 
						whrgb[1]+
						','+
						whrgb[2]+
						','+ 
						(1/(tail-i)+.3)+ 
						')';
					
						whg.s(whcol).ss(this.size).mt(lv[0],lv[1]).lt(v[0], v[1]);
					}			
					
					
				}
			
			}
			
			//A function that move the attractor to any number of possible location options
			function setAttractor(){
				var scLast = sc;
				//keep choosing a random sculpture until it's different than the last one.
				while(sc == scLast){
					sc = sculptures[Math.floor(Math.random()*sculptureCt)];
				}
				
				createjs.Tween.get(sculpturehl, {override:true})
				.to({alpha:0} ,500).call(function(){
					sculpturehl.attInd = _.indexOf(sculptures, sc);
					createjs.Tween.get(sculpturehl,{override:true}).to({alpha:topAlpha}, 500);
				
				});
			}
			
			function moveAttractor(){
				
				attractor = $V([sc.x, sc.y]);

				
			}