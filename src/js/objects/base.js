function supaplex_object_base(){
    this.itemid = 2;
    
    /* constructor */
        Ext.apply(this.position, { 
            x : 0,
            y : 0,
            offset : {
                x : 0,
                y : 0
            }
        });
}
