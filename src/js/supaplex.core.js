const TILESIZE = 25;
const FPS = 100;

const EL_BLANK = 0;
const EL_MURPHY = 3;
const EL_BASE = 2;
const EL_BOMB = 1;
const EL_INFOTRON = 4;
const EL_END = 7;

Ext.namespace('supaplex', 'supaplex.math', 'supaplex.objectmanager');

var supaplex = {
    pauze : false,
    supaplexlevel : 0,
    
    init : function(config) {
        this.supaplexlevel = config.level || 1;
        
        // Setup graphics device
        this.gfx = new supaplex.graphics(config.dimension || {width: 35, height : 15});
        
        // Setup the keyboard
        this.initKeyboard();
        this.map = new supaplex.map();
        this.murphy = new supaplex_object_murphy();


        this.map.init(this.supaplexlevel);
        
        this.objectmanager = new supaplex.objectmanager();
        this.objectmanager.init();
    },
    
    setLevelTitle : function(title) {
        Ext.getCmp('gamepanel').setTitle('[jsSupaplex] ' + title);
    },
    
    movelevel : function(level) {
        // this.pauze = true;
        // this.supaplexlevel = level;
        // 
        // this.murphy = new supaplex.object.murphy();
        // 
        // this.map.position.x = 0;
        // this.map.position.y = 0;
        // this.map.map = null;
        // supaplex.murphy.position.map.x = 0;
        // supaplex.murphy.position.map.y = 0;
        // 
        // this.gfx.setupMapCanvas();
        // // Clear the screen
        // this.gfx.getMapContext().clearRect(0, 0, this.gfx.getFrame().width, this.gfx.getFrame().height);
        // 
        // this.map.init(this.supaplexlevel);
        // this.pauze = false;
    },
    
    initKeyboard : function() {
        this.keyboard = new supaplex.keyboard();
        
        this.keyboard.on('keydown', function(event) {
            if (this.pauze)
                return;
            
            var x = y = 0;
            switch(event.keyCode) {
                case KEY_RIGHT:
                    x = 1;
                    y = 0;
                    break;
                case KEY_LEFT:
                    x = -1;
                    y = 0;
                    break;
                case KEY_DOWN:
                    x = 0;
                    y = 1;
                    break;
                case KEY_UP:
                    x = 0;
                    y = -1;
                    break;
            }
            
            var element = this.murphy.getNearElement(x, y);
			var index = supaplex.math.getXYIndex(this.murphy.position.map.x, this.murphy.position.map.y);
            switch(element) {
				case EL_BASE:
					// this.objectmanager.removeObject(index);
					// console.info(index);
                    this.map.move(x, y); 					
					break;
                case EL_END:
                    Ext.MessageBox.alert('Complete', 'Level complete!'); 
                    break;
				case EL_BOMB:
					break;
                default :

                    if (element == 11 && x == -1) { // Tube right to left
                        x = -2;
                        this.map.move(x, y); 
                    }else if (element == 9 && x == 1) { // Tube left to right
                        x = 2;
                        this.map.move(x, y);
                    }else if(element == 10 && y == 1) { // tube top to bottom
                        y = 2;
                        this.map.move(x, y);
                    }else if (element == 12 && y == -1) { // tube bottom to top
                        y = -2;
                        this.map.move(x, y);                    
                    }else if (!this.map.isStatic(element)) {
                        this.map.move(x, y); 
                    }
                    
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
	
		var context = this.gfx.getContext();
		
        // Clear the screen
        //this.gfx.getContext().clearRect(0, 0, this.gfx.getFrame().width, this.gfx.getFrame().height);   
    
		// Testing with gradiant background
		var my_gradient = context.createLinearGradient(0, 0, 0, this.gfx.getFrame().height);
		my_gradient.addColorStop(0, "black");
		my_gradient.addColorStop(1, "blue");

		context.fillStyle = my_gradient;
		context.fillRect(0, 0, this.gfx.getFrame().width, this.gfx.getFrame().height);

    
        // Draw the map to the canvas
        this.gfx.getContext().drawImage(this.gfx.frame.map, (this.map.position.x*TILESIZE), (this.map.position.y*TILESIZE));

        this.objectmanager.redraw();
        
        // Draw murphy
        this.murphy.redraw(((this.murphy.position.x + this.murphy.position.offset.x) * TILESIZE), ((this.murphy.position.y + this.murphy.position.offset.y) * TILESIZE));
    }
};