function supaplex_object() {
	this.index = 0;
    this.position = { 
        x : 0,
        y : 0,
        map : {
            x : 0,
            y : 0
        }
    };
    
    this.redraw = function(x, y) {
        var im = new Image();
        im.src = 'gfx/supaplex.png';
        var itemid = this.itemid;
        supaplex.gfx.getContext().drawImage(im, (itemid*16), 0, 16, 16, x, y, TILESIZE, TILESIZE);              
    };
    
    this.getNearElement = function(x, y) {
        return supaplex.map.map.tiles[supaplex.math.getXYIndex((this.position.map.x + x), (this.position.map.y + y))];
    };
    
    this.setMapXY = function(x, y) {
        this.position.map = {
            x: x,
            y: y
        };
    }
};
