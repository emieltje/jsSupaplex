const TILESIZE = 20;
const FPS = 24;

const EL_BLANK = 0;
const EL_MURPHY = 3;
const EL_BASE = 2;
const EL_BOMB = 1;
const EL_INFOTRON = 4;

Ext.namespace('supaplex', 'supaplex.math');

var supaplex = {
	init : function(config) {
		// Setup graphics device
		this.gfx = new supaplex.graphics();
		
		// Setup the keyboard
		this.initKeyboard();
		
		this.map = new supaplex.map();

		this.murphy = new supaplex.object.murphy();

		// init the map at the end
		this.map.init(config.level || 1);
	},
	
	initKeyboard : function() {
		this.keyboard = new supaplex.keyboard();
		
		this.keyboard.on('keydown', function(event) {
			switch(event.keyCode) {
			 	case KEY_RIGHT:
					if (!this.map.isStatic(this.murphy.getNearElement(1,0)))
						this.map.move(1,0); 
					break;
				case KEY_LEFT:
					if (!this.map.isStatic(this.murphy.getNearElement(-1,0)))
						this.map.move(-1,0); 
					break;
				case KEY_DOWN:
					if (!this.map.isStatic(this.murphy.getNearElement(0,1)))				
						this.map.move(0,1); 
					break;
				case KEY_UP:
					if (!this.map.isStatic(this.murphy.getNearElement(0,-1)))
						this.map.move(0,-1); 
					break;
			}
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
		
		// Clear the screen
		this.gfx.getContext().clearRect(0, 0, this.gfx.getFrame().width, this.gfx.getFrame().height);	
		
		// Draw the map to the canvas
		this.gfx.getContext().drawImage(this.gfx.frame.map, (this.map.position.x*TILESIZE), (this.map.position.y*TILESIZE));
		
		// Draw murphy

		this.murphy.redraw(((this.murphy.position.x + this.murphy.position.offset.x) * TILESIZE), ((this.murphy.position.y + this.murphy.position.offset.y) * TILESIZE));
	}
};