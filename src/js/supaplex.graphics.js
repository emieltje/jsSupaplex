(function() {
    Ext.namespace('supaplex.graphics');

    supaplex.graphics = Ext.extend(Ext.util.Observable, {
        constructor: function(config) {
            this.frame = Ext.get('supaplexframe');
            this.context = this.frame.dom.getContext('2d');

            supaplex.graphics.superclass.constructor.call(this, config);
        }
    });
})();