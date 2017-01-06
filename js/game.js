
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        currentLevel : 1,
        deathCounter: 0,
        obtainedKeys : []
    },

    // an object where to store color information
    colors : {
        blue : 0,
        green : 1,
        red : 2,
        yellow : 3
    },

    // parse the color text to number
    parseColor : function (cs) {
        if (cs === 'blue') {
            return this.colors.blue;
        } else if (cs === 'green') {
            return this.colors.green;
        } else if (cs === 'red') {
            return this.colors.red;
        } else {
            return this.colors.yellow;
        }
    },

    /**
     * collect every key in the world
     */
    collectKeys : function () {
        game.keys = me.game.world.getChildByProp('name', 'key');
    },

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(640, 480, {
            wrapper : "screen",
            scale : "auto",
            scaleMethod: "flex-width",
            doubleBuffering : true,
            renderer : me.video.AUTO,
            pixelated : true,
            subPixel : false
        })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());



        // add our entities in the entity pool
        me.pool.register("player", game.PlayerEntity);
        me.pool.register("door", game.DoorEntity);
        me.pool.register("spike", game.SpikeEntity);
        me.pool.register("floatingSpike", game.FloatingSpikeEntity);
        me.pool.register("spring", game.SpringEntity);
        me.pool.register("key", game.KeyEntity);
        me.pool.register("padlock", game.PadlockEntity);
        me.pool.register("cannon", game.CannonEntity);
        me.pool.register("cannonSpike", game.CannonSpikeEntity);
        me.pool.register("chest", game.ChestEntity);
        me.pool.register("rotarySpike", game.RotarySpikeEntity);
        me.pool.register("rotaryChain", game.RotaryChainEntity);

        // run the key collector
        me.game.onLevelLoaded = this.collectKeys.bind(this);

        // add some global keyboard shortcuts
        me.event.subscribe(me.event.KEYDOWN, function (action, keyCode /*, edge */) {
            // toggle fullscreen on/off
            if (keyCode === me.input.KEY.F) {
                if (!me.device.isFullscreen) {
                    me.device.requestFullscreen();
                } else {
                    me.device.exitFullscreen();
                }
            }
        });

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};