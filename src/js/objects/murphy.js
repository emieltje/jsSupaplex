(function() {
	Ext.namespace('supaplex.object.murphy');
	
	supaplex.object.murphy = Ext.extend(supaplex.object, {
		itemid : 3,
		
		constructor : function(config) {
			Ext.apply(this.position, { 
				x : (supaplex.gfx.getFrame().width / TILESIZE) / 2,
				y : (supaplex.gfx.getFrame().height / TILESIZE) / 2,
				offset : {
					x : 0,
					y : 0
				}
			});
			
			this.superclass().constructor.call(this, config);
		}
	});
})();