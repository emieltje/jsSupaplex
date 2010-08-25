(function() {
    Ext.namespace('supaplex.graphics');

    supaplex.graphics = Ext.extend(Ext.util.Observable, {
    
        context : {
            display : null,
            map : null
        },
        
        frame : {
            display : null,
            map : null
        },
        
        constructor : function(dimension) {
            this.setupDisplayCanvas(dimension);
            this.setupMapCanvas();
            
            supaplex.graphics.superclass.constructor.call(this, {});
        },
        
        getContext : function() {
            return this.context.display;
        },
        
        getMapContext : function() {
            return this.context.map;
        },
        
        getFrame : function() {
            return this.frame.display.dom;
        },
        
        setupMapCanvas : function() {
            this.frame.map = document.createElement('canvas');
            this.frame.map.width = (60 * TILESIZE);
            this.frame.map.height = (24 * TILESIZE);
            this.context.map = this.frame.map.getContext('2d');
            
        },
        
        setupDisplayCanvas : function(dimension) {
            
            if (dimension.height > 24)
                dimension.height = 24;

            if (dimension.width > 60)
                dimension.	width = 60;
                
            var height = dimension.height * TILESIZE
                width  = dimension.width * TILESIZE;
                
            // @todo remove from here, and place this in the index.html
            var p = new Ext.Panel({
                title: 'Supaplex',
                id : 'gamepanel',
                renderTo: 'frame',
                width: width,
                height : height+(2*27),
                tbar : [{text: 'test'}],
                html: "<canvas id='supaplexframe' class='supaplexFrame' height="+height+" width="+width+" style='background-color: black;'><p>I'm sorry, you don't have canvas support in your browser</p></canvas>"
            });

            this.frame.display = Ext.get('supaplexframe');
            this.context.display = this.getFrame().getContext('2d');
        }
    });
})();