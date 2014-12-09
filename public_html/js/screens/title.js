game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
    onResetEvent: function() {	
        me.game.world.addChild( new me.Sprite (0, 0, me.loader.getImage('title-screen')), -10);
        me.input.bindKey(me.input.KEY.ENTER, "start");
        
        me.game.world.addChild(new (me.Renderable.extend ({
            init: function(){
                //Adding the color and font to the game's name
                this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
                this.font = new me.Font("Arial", 46, "cyan");
            },
            
            draw: function(renderer){
                //Adding a name to your game title. 
                this.font.draw(renderer.getContext(), "Ghetto Mario", 450, 130);
                this.font.draw(renderer.getContext(), "Press ENTER to play", 250, 530);
            }
            
        })));
        
        //Makes the game start when ENTER is pressed. 
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
	    if(action === "start"){
                me.state.change(me.state.PLAY);
                } 
            });
            },
    
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function(){
            //When the ENTER button is pressed, the game will start. 
            me.input.unbindKey(me.input.KEY.ENTER);
            me.event.unsubscribe(this.handler);
        }       
     });