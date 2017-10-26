/**
 * Spike Entity.
 */
game.FloatingSpikeEntity = me.Entity.extend({

  /**
   * Constructor
   */
  init(x, y, settings) {
    // Call the constructor.
    this._super(me.Entity, 'init', [x, y, settings]);

    this.name = 'floatingSpike';

    // Fix every floating spike on the map.
    this.body.setVelocity(0, 0);
    this.body.setMaxVelocity(0, 0);
    this.body.garavity = 0;

    this.body.collisionType = me.collision.types.ENEMY_OBJECT;

    // Enable the update.
    this.alwaysUpdate = true;
  },

  /**
   * Update the entity.
   */
  update(dt) {
    // Apply physics to the body (this moves the entity).
    this.body.update(dt);

    // Handle collisions against other shapes.
    me.collision.check(this);

    // Return true if we moved or if the renderable was updated.
    return (this._super(me.Entity, 'update', [dt]));
  },

  /**
   * Collision handler
   */
  onCollision() {
    // Make all other objects solid.
    return false;
  },
});
