(function() {
    supaplex.objectmanager = Ext.extend(Ext.util.Observable, {
        elements : [EL_BOMB, EL_BASE, EL_INFOTRON],
    
        objects : [],
        constructor : function(config) {
//            supaplex.object.superclass.constructor.call(this, config);
        },
        
        isNonStatic : function(num) {
            for(var i in this.elements) {
                if (this.elements[i] == num)
                    return true;
            }

            return false;
        },
        
        init : function() {
            var x = y = 0;
            
            for(i=0; i < 1440; i++) {
                if (x == 60) {
                    x = 0;
                    y++;
                }
                
                if (this.isNonStatic(supaplex.map.map.tiles[i])) {
                    // @todo
					switch(supaplex.map.map.tiles[i]) {
						case EL_BASE : 
							supaplex_object_base.prototype = new supaplex_object();
	                    	var o = new supaplex_object_base();
							break;
						case EL_INFOTRON :
							supaplex_object_infotron.prototype = new supaplex_object();
	                    	var o = new supaplex_object_infotron();
							break;
						case EL_BOMB:
							supaplex_object_bomb.prototype = new supaplex_object();
                    		var o = new supaplex_object_bomb();
							break;

					}
					
					o.index = i;
					
                    o.setMapXY(x, y);
                    this.objects.push(o);
					delete o;		
                }
                x++;
            }
        },
        
		removeObject : function(index) {
			var temp = new Array();
			
			Ext.each(this.objects, function(o) {
				if (o.index != index) {
					temp.push(o);			
				}
			}, this);				

			// Redefine the screen objects
			this.objects = temp;
		},
		
        redraw : function() {
			Ext.each(this.objects, function(o, index) {
				/* TODO: Only redraw objects that are renderd on-screen */
				var x = ((supaplex.map.position.x + o.position.map.x) *TILESIZE);
				var y = ((supaplex.map.position.y + o.position.map.y) *TILESIZE);
				
				o.redraw(x, y);
			});
        }
    });
})();