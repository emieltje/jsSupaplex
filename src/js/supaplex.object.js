(function() {
	Ext.namespace('supaplex.object');
	
	supaplex.object = Ext.extend(Ext.util.Observable, {
	
		constructor : function(config) {
			supaplex.object.superclass.constructor.call(this, config);
		},
		
		redraw : function(itemid, x, y) {
			var im = new Image();
			im.src = 'gfx/supaplex.gif';
			
			supaplex.gfx.getMapContext().drawImage(im, (itemid*16), 0, 16, 16, x, y, TILESIZE, TILESIZE);				
		}
	});
})();