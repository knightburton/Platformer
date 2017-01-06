/**
 * Rotary Chain Entity
 */
game.RotaryChainEntity = me.Entity.extend({

    /**
     * constructor
     */
    init : function (x, y, settings) {
        settings.image = "rotary-spike-animation";
        settings.framewidth = 256;
        settings.frameheight = 256;
        settings.anchorPoint = new me.Vector2d(0.5, 0.5);

        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);
        this.name = 'rotaryChain';

        // fix every spike on the map
        this.body.setVelocity(0, 0);
        this.body.setMaxVelocity(0, 0);
        this.body.garavity = 0;
        this.body.collisionType = me.collision.types.NO_OBJECT;

        // ALWAYS update
        this.alwaysUpdate = true;
        
        this.renderable.addAnimation('rotate', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 100);
        this.renderable.setCurrentAnimation('rotate');
    },

    /**
     * update the entity
     */
    update : function (dt) {

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]));
    },

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return false;
    }
});