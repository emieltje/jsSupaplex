(function() {
	Ext.namespace('supaplex.map');
	
	supaplex.map = Ext.extend(Ext.util.Observable, {
		position : {
			x : 0,
			y : 0
		},
		
		statics : [ 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 
					19, 21, 22, 23, 26, 27, 28, 29, 30, 31, 
					32, 33, 34, 35, 36, 37, 38, 39, 40],
		
		constructor : function() {
			supaplex.map.superclass.constructor.call(this, {});
		},
		
		init : function(level) {
			this.level = new supaplex.level(level);
			this.map = this.level[0];
			supaplex.setLevelTitle(this.level[1].title);
			
			// Focus on Murphy, and save the coordinates
			var m = supaplex.math.getXY(supaplex.math.getSingleIndex(EL_MURPHY));
			this.moveto(m.x, m.y);
			
			supaplex.murphy.position.map.x += m.x;
			supaplex.murphy.position.map.y += m.y;

			this.redrawMap();
		},
		
		isStatic : function(num) {
			for(var i in this.statics) {
				if (this.statics[i] == num)
					return true;
			}

			return false;
		},
		
		redrawMap : function() {
			var im = new Image()
				x = y = i = 0;
			im.src = 'gfx/supaplex.gif';				
			
			for(i=0; i < 1440; i++) {
				if (x == 60) {
					x = 0;
					y++;
				}
				
				if (this.isStatic(this.map.tiles[i])) {
					supaplex.gfx.getMapContext().drawImage(im, (this.map.tiles[i]*16), 0, 16, 16, (x*TILESIZE), (y*TILESIZE), TILESIZE, TILESIZE);
				}
				
				x++;
			}
		},
		
		moveto : function(x, y) {
			var maxY = (24 - (supaplex.gfx.getFrame().height / TILESIZE));
			var maxX = (60 - (supaplex.gfx.getFrame().width / TILESIZE));
			
			if (y>maxY) {
				this.position.y = -maxY;
				supaplex.murphy.position.offset.y = (y - maxY) - ((supaplex.gfx.getFrame().height / TILESIZE)/2);
			}else
			{
				if (this.position.y == 0) {
					if (y > ((supaplex.gfx.getFrame().height / TILESIZE)/2) ) {
						supaplex.murphy.position.offset.y = 0;
						this.position.y = - (y-((supaplex.gfx.getFrame().height / TILESIZE)/2));
					}else
					{
						supaplex.murphy.position.offset.y -= ((supaplex.gfx.getFrame().height / TILESIZE)/2) ;
						supaplex.murphy.position.offset.y += y;
					}
				}else
				{
					this.position.y += -y;
					this.position.y += (supaplex.gfx.getFrame().height / TILESIZE) / 2;
				}
			}
			
			if (x>maxX) {
				this.position.x = -maxX;
				supaplex.murphy.position.offset.x = (x - maxX) - ((supaplex.gfx.getFrame().width / TILESIZE)/2);
			}else
			{
				if (this.position.x == 0) {
					if (x > ((supaplex.gfx.getFrame().width / TILESIZE)/2) ) {
						supaplex.murphy.position.offset.x = 0;
						this.position.x = - (x-((supaplex.gfx.getFrame().width / TILESIZE)/2));
					}else
					{
						supaplex.murphy.position.offset.x -= ((supaplex.gfx.getFrame().width / TILESIZE)/2) ;
						supaplex.murphy.position.offset.x += x;
					}
				}else
				{
					this.position.x += -x;
					this.position.x += (supaplex.gfx.getFrame().width / TILESIZE) / 2;
				}
			}
		},
		
		move : function(x, y) {
			this.map.tiles[supaplex.math.getXYIndex(supaplex.murphy.position.map.x, supaplex.murphy.position.map.y)] = EL_BLANK;
			
			if (Math.round(supaplex.murphy.position.offset.y) != 0) {
				supaplex.murphy.position.offset.y += y;
			} else 
			{
				this.position.y += -y;
			
				if(this.position.y > 0) {
					this.position.y = 0;
					supaplex.murphy.position.offset.y += y;
				}else if (this.position.y <  -(24 - (supaplex.gfx.getFrame().height / TILESIZE))) {
					this.position.y = -(24 - (supaplex.gfx.getFrame().height / TILESIZE));
					supaplex.murphy.position.offset.y += y;
				}
			}
			
			if (Math.round(supaplex.murphy.position.offset.x) != 0) {
				supaplex.murphy.position.offset.x += x;
			} else 
			{
				this.position.x += -x;
				if(this.position.x > 0) {
					this.position.x = 0;
					supaplex.murphy.position.offset.x += x;
				}else if (this.position.x <  -(60 - (supaplex.gfx.getFrame().width / TILESIZE))) {
					this.position.x = -(60 - (supaplex.gfx.getFrame().width / TILESIZE));
					supaplex.murphy.position.offset.x += x;
				}
			}
			supaplex.murphy.position.map.x += x;
			supaplex.murphy.position.map.y += y;
			
			this.map.tiles[supaplex.math.getXYIndex(supaplex.murphy.position.map.x, supaplex.murphy.position.map.y)] = EL_MURPHY;
		}
	});
})();