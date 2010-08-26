function supaplex_object_bomb(){
    this.itemid = EL_BOMB;
    
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
