const TILESIZE = 20;
const FPS = 20;

Ext.namespace('supaplex');

var supaplex = {
	gamefield : [],
	position: {
			x : 0,
			y : 0
	},
	
	init : function(config) {
		// Setup graphics device
		this.gfx = new supaplex.graphics();
		// Setup the keyboard
		this.initKeyboard();
		
		this.map = new supaplex.map(config.level || 1);
		this.map.redrawMap();
		
		// @todo test object
		this.initMurphy();
	},
	
	initMurphy : function() {
		this.murphy = new supaplex.object.murphy();
	},
	
	initKeyboard : function() {
		this.keyboard = new supaplex.keyboard();
		
		this.keyboard.on('keydown', function(event) {
			this.debug('keydown: ' + event.getCharCode());
		}, this);
		
		this.keyboard.on('keyup', function(event) {
			this.debug('keyu: ' + event.getCharCode());
		}, this);
		
	},
	
	start : function(config) {
		this.init(config);
		
		// Init gameloop
		Ext.TaskMgr.start({
			run: this.gameloop,
			interval: 1000 / FPS,
			scope: this
		});
	},

	gameloop : function() {
		var px = this.position.x
		 	py = this.position.y;

		this.gfx.getContext().clearRect(0, 0, this.gfx.getFrame().width, this.gfx.getFrame().height);	
		
		// Draw the map to the canvas
		this.gfx.getContext().drawImage(this.gfx.frame.map, px, py);

		// Draw murphy
		this.murphy.redraw((px * TILESIZE), (py * TILESIZE));
	}
};
