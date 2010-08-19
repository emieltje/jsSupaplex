(function() {
	Ext.namespace('supaplex.object.murphy');
	
	supaplex.object.murphy = Ext.extend(supaplex.object, {
		itemid : 3,
		
		constructor : function(config) {
			this.superclass().constructor.call(this, config);
		},
		
		redraw : function(x, y) {
		
				this.superclass().redraw(this.itemid, x, y);
		}
	});
})();