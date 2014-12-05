// TODO
game.PlayerEntity = me.Entity.extend ({
  init: function(x, y, settings){
      this._super(me.Entity, 'init', [x, y, {
        image: "mario",
        spritewidth: "128",
        spriteheight: "128",
        width: 128,
        height: 128,
        getShape: function(){
            return (new me.Rect(0, 0, 30, 128)).toPolygon();
        }
      }]);
  
      this.renderable.addAnimation("idle", [3]);
      //creating animation so the character can walk properly.
      this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);
      
      this.renderable.setCurrentAnimation("idle");
      
      //sets the speed 
      this.body.setVelocity(5, 20); 
      me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 },  
    
update: function(delta){
    if(me.input.isKeyPressed("Right")){
        //sets the posistion of mario on the x axis by adding the x value from serVelocity time the timer.tick
        //me.timer.tickuses the time since last animation to make the direction travel smooth. 
        this.body.vel.x += this.body.accel.x * me.timer.tick;
    }else{
        this.body.vel.x = 0;
    } 
    
    this.body.update(delta);
    me.collision.check(this, true, this.collideHandler.bind(this), true);
    
    if(this.body.vel.x !== 0){
        if(!this.renderable.isCurrentAnimation("smallWalk")){
           this.renderable.setCurrentAnimation("smallWalk");
           this.renderable.setAnimationFrame();
        }
    }
        else{
        this.renderable.setCurrentAnimation("idle");
    }
    
    
    this._super(me.Entity, "update", [delta]);
    return true;
},

collideHandler: function(response){
    
}

});

game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings){
        //if something collides with the object then we will call the onCollision 
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
    },
    
    onCollision: function(){
        //
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }
    
});