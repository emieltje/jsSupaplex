(function() {
    Ext.namespace('supaplex.graphics');

    supaplex.graphics = Ext.extend(Ext.util.Observable, {
	
		context : {
			display : null,
			map : null
		},
		
		frame : {
			display : null,
			map : null
		},
		
        constructor : function(config) {
			this.setupDisplayCanvas();
			this.setupMapCanvas();
			
            supaplex.graphics.superclass.constructor.call(this, config);
        },
		
		getContext : function() {
			return this.context.display;
		},
		
		getMapContext : function() {
			return this.context.map;
		},
		
		getFrame : function() {
			return this.frame.display.dom;
		},
		
		setupMapCanvas : function() {
			this.frame.map = document.createElement('canvas');
			this.frame.map.width = (60 * TILESIZE);
			this.frame.map.height = (24 * TILESIZE);
			this.context.map = this.frame.map.getContext('2d');
			
		},
		
		setupDisplayCanvas : function() {
			this.frame.display = Ext.get('supaplexframe');
            this.context.display = this.getFrame().getContext('2d');
            
		}
		
		
    });
})();