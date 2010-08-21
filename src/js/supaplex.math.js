(function() {
	supaplex.math = {
		getSingleIndex : function(element) {
			for(var i in supaplex.map.map.tiles) {
				if (supaplex.map.map.tiles[i] == EL_MURPHY) {
					return i;
				}
			}

			return false;
		},
		
		getIndex : function(pos) {
			return (pos.y * 60) + pos.x;
		},
		
		getXYIndex : function(x, y) {
			var pos = {x : x, y : y};
			return this.getIndex(pos);
		},
		
		getXY : function(index) {
			var y = Math.floor(index/60);
			var x = (y < (index/60)) ? (index - (y * 60)) : 0 ;
		
			return { x : x, 
					 y : y };
		}
	};
})();