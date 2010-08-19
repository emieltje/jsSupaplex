(function() {
	Ext.namespace('supaplex.object.murphy');
	
	supaplex.object.murphy = Ext.extend(supaplex.object, {
		itemid : 3,
		
		constructor : function(config) {
			supaplex.object.murphy.superclass.constructor.call(this, config);
		},
		
		redraw : function(context, x, y) {
			supaplex.object.murphy.superclass.redraw(context, this.itemid, x, y);
		}
	});
})();