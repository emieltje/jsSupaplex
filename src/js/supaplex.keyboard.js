const KEY_UP    = 38;
const KEY_DOWN  = 40;
const KEY_LEFT  = 37; 	
const KEY_RIGHT = 39;
const KEY_ENTER = 13;
const KEY_SPACE = 32;
const KEY_X 	= 88;
const KEY_L		= 76;

(function() {
	Ext.namespace('supaplex.keyboard');
	supaplex.keyboard = Ext.extend(Ext.util.Observable, {
		constructor : function(config) {
			this.installEvents();	

			supaplex.keyboard.superclass.constructor.call(this, config);
		},
		
		installEvents : function() {
			Ext.EventManager.on(document, 'keypress', this.pressEvent, this);	
			Ext.EventManager.on(document, 'keydown', this.keyDownEvent, this);	
			Ext.EventManager.on(document, 'keyup', this.keyUpEvent, this);	
			
			this.addEvents('keyup', 'keydown');
		},
		
		pressEvent : function(event) {
			//console.info(event.getKey());
		},
		
		keyDownEvent : function(event) {
			this.fireEvent('keydown', event);
		},
		
		keyUpEvent : function(event) {
			this.fireEvent('keyup', event);
		}
	});
})();