(function() {
	Ext.namespace('supaplex.object');
	
	supaplex.object = Ext.extend(Ext.util.Observable, {
		position : { 
			x : 0,
			y : 0,
			map : {
				x : 0,
				y : 0
			},
			offset : {
				x : 0,
				y : 0
			}
		},
		
		constructor : function(config) {
			supaplex.object.superclass.constructor.call(this, config);
		},
		
		redraw : function(x, y) {
			var im = new Image();
			im.src = 'gfx/supaplex.gif';
			var itemid = this.itemid;
			supaplex.gfx.getContext().drawImage(im, (itemid*16), 0, 16, 16, x, y, TILESIZE, TILESIZE);				
		},
		
		getNearElement : function(x, y) {
			return supaplex.map.map.tiles[supaplex.math.getXYIndex((this.position.map.x + x), (this.position.map.y + y))];
		}
	});
})();