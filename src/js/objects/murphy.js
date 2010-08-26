
    function supaplex_object_murphy() {
        this.itemid = 3;
        
		/* Constructor */
		Ext.apply(this.position, { 
		    x : (supaplex.gfx.getFrame().width / TILESIZE) / 2,
		    y : (supaplex.gfx.getFrame().height / TILESIZE) / 2,
		    offset : {
		        x : 0,
		        y : 0
		    }
		});
    };
supaplex_object_murphy.prototype = new supaplex_object();