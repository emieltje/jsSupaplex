const TILESIZE = 32;
const FPS = 20;

(function() {
	Ext.namespace('supaplex');
	
	supaplex = Ext.extend(Ext.util.Observable, {
		constructor : function(config) {
			// Setup graphics device
			this.gfx = new supaplex.graphics();
			
			this.initKeyboard();
			this.initMurphy();
			
			console.info(this.murphy);
			
			supaplex.superclass.constructor.call(this, config);
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
			this.level = new supaplex.level(config.level || 1);
			
			// Init gameloop
			Ext.TaskMgr.start({
		    	run: this.gameloop,
			    interval: 1000 / FPS,
			    scope: this
			});
		},
		
		framecounter : function() {
			if (!this.framecount) 
				this.framecount = 1;
			
			Ext.get('framcounter').dom.innerHTML = 'Frame: ' + this.framecount ;
			this.framecount++;
		},
		
		gameloop : function() {
			this.framecounter();
		
			var px = py = 10;
			
			var context = this.gfx.context;
			context.clearRect(0, 0, this.gfx.frame.dom.width, this.gfx.frame.dom.height);	
			
			this.murphy.redraw(context, (px * TILESIZE), (py * TILESIZE));
		},
		
		debug : function(t) {
			Ext.get('debug').dom.innerHTML = t + '<br />' + Ext.get('debug').dom.innerHTML;
		}
	});
})();