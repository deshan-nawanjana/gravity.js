// assets to preload and null for skip unnecessary asset
const assets = {
    wizard : {
        idle : '../assets/mossy_cavern/wizard_idle.asset',
        walk : '../assets/mossy_cavern/wizard_walk.asset',
        jump : '../assets/mossy_cavern/wizard_jump.asset'
    },
    decorations : [
        '../assets/mossy_cavern/decorations/decoration_1.png',
        '../assets/mossy_cavern/decorations/decoration_2.png',
        '../assets/mossy_cavern/decorations/decoration_3.png',
        null,
        '../assets/mossy_cavern/decorations/decoration_5.png',
        null
    ],
    platforms : [
        null,
        null,
        null,
        '../assets/mossy_cavern/platforms/platform_4.png',
        null,
        '../assets/mossy_cavern/platforms/platform_6.png',
        null,
        null,
        '../assets/mossy_cavern/platforms/platform_9.png',
        '../assets/mossy_cavern/platforms/platform_10.png',
        '../assets/mossy_cavern/platforms/platform_11.png',
        '../assets/mossy_cavern/platforms/platform_12.png'
    ],
    plants : [
        '../assets/mossy_cavern/plant_1.asset',
        null,
        '../assets/mossy_cavern/plant_3.asset',
        null,
        '../assets/mossy_cavern/plant_5.asset',
        null,
        '../assets/mossy_cavern/plant_7.asset',
        '../assets/mossy_cavern/plant_8.asset',
        '../assets/mossy_cavern/plant_9.asset',
        '../assets/mossy_cavern/blue_flower_1.asset',
        '../assets/mossy_cavern/blue_flower_2.asset'
    ],
    hangings : [
        null,
        null,
        null,
        null,
        null,
        '../assets/mossy_cavern/hangings/hanging_6.png',
        null,
        null,
        null,
        null,
    ],
    hazards : [
        '../assets/mossy_cavern/hazards/hazard_1.png',
        '../assets/mossy_cavern/hazards/hazard_2.png',
        '../assets/mossy_cavern/hazards/hazard_3.png',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        '../assets/mossy_cavern/hazards/hazard_24.png',
        '../assets/mossy_cavern/hazards/hazard_25.png',
        null
    ],
    blocks : [
        '../assets/mossy_cavern/blocks/block_1.png',
        '../assets/mossy_cavern/blocks/block_2.png',
        '../assets/mossy_cavern/blocks/block_3.png',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ]
}

// image sizes of each asset
const sizes = {
    platforms : [
        { x :  79, y :  94 },
        { x : 115, y : 109 },
        { x :  83, y :  81 },
        { x : 149, y : 130 },
        { x : 132, y : 276 },
        { x : 136, y : 439 },
        { x : 317, y : 135 },
        { x : 308, y : 133 },
        { x : 308, y : 133 },
        { x : 458, y : 133 },
        { x : 591, y : 133 },
        { x : 445, y : 446 }
    ],
    hangings : [
        { x : 142, y : 460 },
        { x : 142, y : 381 },
        { x : 142, y : 381 },
        { x : 119, y : 319 },
        { x : 105, y : 371 },
        { x : 183, y : 538 },
        { x : 182, y : 538 },
        { x : 297, y : 200 },
        { x : 296, y : 200 },
        { x : 296, y : 199 }
    ],
    hazards : [
        { x : 315, y : 174 },
        { x : 284, y : 125 },
        { x : 258, y : 225 },
        { x : 361, y : 154 },
        { x : 300, y : 198 },
        { x : 225, y : 208 },
        { x : 112, y : 104 },
        { x : 149, y :  99 },
        { x : 182, y :  78 },
        { x :  72, y :  64 },
        { x :  68, y :  93 },
        { x :  38, y :  88 },
        { x : 108, y :  45 },
        { x :  86, y : 108 },
        { x :  74, y :  56 },
        { x :  35, y :  44 },
        { x :  99, y : 110 },
        { x :  43, y : 101 },
        { x :  26, y : 111 },
        { x :  21, y :  97 },
        { x :  90, y : 117 },
        { x :  90, y :  98 },
        { x : 102, y : 359 },
        { x : 105, y : 360 },
        { x : 103, y : 362 },
        { x :  61, y : 367 }
    ],
    decorations : [
        { x : 462, y : 1772 },
        { x : 456, y : 1037 },
        { x : 407, y :  284 },
        { x : 478, y :  441 },
        { x : 472, y :  401 },
        { x : 472, y :  759 }
    ]
}

// create scene
const scene = new Gravity.Scene()

// on window resize
window.addEventListener('resize', () => {
    // resize scene
    scene.set('size', innerWidth, innerHeight)
})

// on window load
window.addEventListener('load', () => {
    // resize scene
    scene.set('size', innerWidth, innerHeight)
    // append scene element to body
    document.body.appendChild(scene.element)
})

// method to create wizard
const createWizard = (i = 6, x, y) => {
    // create real object of wizard
    const object = new Gravity.Object({
        size : { x : 46, y : 105 },
        position : { x : x, y : y },
        elasticity : 0.1,
        weight : 10000
    })
    // animations for each action
    const ani_idle = new Gravity.Animation({ images : assets.wizard.idle })
    const ani_walk = new Gravity.Animation({ images : assets.wizard.walk })
    const ani_jump = new Gravity.Animation({ images : assets.wizard.jump })
    // create texture object of wizard with idle animation
    const image = new Gravity.Object({
        active : false,
        size : { x : 90, y : 145 },
        index : i,
        position : { x : x - 22, y : y - 40 },
        texture : new Gravity.Texture({
            size : { x : 252, y : 252 },
            animation : ani_idle
        })
    })
    // create input map for user controls
    const imap = new Gravity.InputMap()
    // on key pressed
    window.addEventListener('keydown', event => {
        // if space key
        if(event.key === ' ') {
            // if wizard is grounded
            if(object.collide.some(x => x.tags === 'ground')) {
                // force upward to jump
                object.velocity.y = -10
            }
        }
    })
    // method to update wizard
    const update = () => {
        // screen offset position
        // const sx = scene.size.x * 0.2 - object.position.x
        // const sy = scene.size.y * 0.4 - object.position.y
        const sx = scene.size.x * 0.5 - object.position.x
        const sy = scene.size.y * 0.5 - object.position.y
        // update screen offset
        scene.set('position', sx, sy)
        // locate image as active object
        image.set('position', object.position.x - 22, object.position.y - 40)
        // get wizard ground touch state
        const grounded = object.collide.some(x => x.tags === 'ground')
        // check grounded state
        if(grounded) {
            // check pressed keys
            if(imap.some('a', 'd')) {
                // walk animation if keys pressed
                image.texture.set('animation', ani_walk)
            } else {
                // idle animation if no keys pressed
                image.texture.set('animation', ani_idle)
            }
        } else {
            // jump animation if not grounded
            image.texture.set('animation', ani_jump)
        }
        // check turn keys to flip wizard
        if(imap.is('a')) {
            // flip wizard to left
            image.texture.set('flip', true, false)
        } else if(imap.is('d')) {
            // flip wizard to right
            image.texture.set('flip', false, false)
        }
        // check for navigate key states
        if(imap.every('a', 'Shift') && grounded) {
            // sprint to left
            object.velocity.x = -5
        } else if(imap.every('a')) {
            // walk to left
            object.velocity.x = -3.5
        } else if(imap.every('d', 'Shift') && grounded) {
            // sprint to right
            object.velocity.x = 5
        } else if(imap.every('d')) {
            // walk to right
            object.velocity.x = 3.5
        } else if(grounded) {
            // stop moving
            object.velocity.x = 0
        }
    }
    // add object to scene
    scene.add(object)
    // add image to scene
    scene.add(image)
    // return wizard
    return { image, object, update }
}

// method to create platform
const createPlatform = (i = 6, n, x, y) => {
    // rescale size
    const w = sizes.platforms[n].x * 0.7
    const h = sizes.platforms[n].y * 0.7
    // create active object
    const object = new Gravity.Object({
        active : true,
        index : 45,
        size : { x : w - 40, y : h - 40 },
        position : { x : x + 20, y : y + 15 },
        fixed : { x : true, y : true }
    })
    // create ground fixed object
    const ground = new Gravity.Object({
        active : false,
        index : 45,
        size : { x : w - 42, y : 20 },
        position : { x : x + 21, y : y - 6 },
        tags : 'ground'
    })
    // create texture object
    const image = new Gravity.Object({
        active : false,
        index : i,
        size : { x : w, y : h },
        position : { x : x, y : y },
        texture : new Gravity.Texture({
            image : assets.platforms[n],
            size : { x : w, y : h }
        })
    })
    // add object to scene
    scene.add(object)
    // add ground to scene
    scene.add(ground)
    // add texture to scene
    scene.add(image)
}

const plant_animations = {}

const createPlant = (i = 0, n, x, y, fx = false, fy = false, s = 1) => {
    // rescale size
    const w = 150 * s
    const h = 150 * s
    // create animation if not available
    if(plant_animations[n] === undefined) {
        plant_animations[n] = new Gravity.Animation({
            images : assets.plants[n]
        })
    }
    // create plant object
    const plant = new Gravity.Object({
        active : false,
        index : i,
        size : { x : w, y : h },
        position : { x : x, y : y },
        texture : new Gravity.Texture({
            duration : 1.6,
            flip : { x : fx, y : fy },
            delay : Math.random() * -2,
            size : { x : w, y : h },
            animation : plant_animations[n]
        })
    })
    // add plant to scene
    scene.add(plant)
}

const createHanging = (i = 0, n, x, y, fx = false, fy = false, s = 0.7) => {
    // rescale size
    const w = sizes.hangings[n].x * s
    const h = sizes.hangings[n].y * s
    // create hanging object
    const hanging = new Gravity.Object({
        active : false,
        index : i,
        size : { x : w, y : h },
        position : { x : x, y : y },
        texture : new Gravity.Texture({
            flip : { x : fx, y : fy },
            size : { x : w, y : h },
            image : assets.hangings[n]
        })
    })
    // add hanging to scene
    scene.add(hanging)
}

const createHazard = (i = 0, n, x, y, fx = false, fy = false, s = 0.7) => {
    // rescale size
    const w = sizes.hazards[n].x * s
    const h = sizes.hazards[n].y * s
    // create hanging object
    const hanging = new Gravity.Object({
        active : false,
        index : i,
        size : { x : w, y : h },
        position : { x : x, y : y },
        texture : new Gravity.Texture({
            flip : { x : fx, y : fy },
            size : { x : w, y : h },
            image : assets.hazards[n]
        })
    })
    // add hanging to scene
    scene.add(hanging)
}

const createDecoration = (i = 0, n, x, y, fx = false, fy = false, s = 0.7) => {
    // rescale size
    const w = sizes.decorations[n].x * s
    const h = sizes.decorations[n].y * s
    // create decoration object
    const decoration = new Gravity.Object({
        active : false,
        index : i,
        style : 'decoration',
        size : { x : w, y : h },
        position : { x : x, y : y },
        texture : new Gravity.Texture({
            flip : { x : fx, y : fy },
            size : { x : w, y : h },
            image : assets.decorations[n]
        })
    })
    // add decoration to scene
    scene.add(decoration)
}

const createFogLayer = (i = 1, o = 0.5, c = '#32a3b1') => {
    const layer = new Gravity.Object({
        active : false,
        index : i,
        size : { x : 1400, y : 1200 },
        position : { x : 0, y : 0 },
        texture : new Gravity.Texture({
            color : c,
            opacity : o
        })
    })
    scene.add(layer)
}

const createBounds = () => {
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 49, y : 1200 },
            position : { x : 0, y : 0 },
            index : 20,
            texture : new Gravity.Texture({
                image : assets.blocks[1],
                position : { x : 'right', y : 'top' }
            })
        })
    )
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 49, y : 1200 },
            position : { x : 1400 - 49, y : 0 },
            index : 20,
            texture : new Gravity.Texture({
                image : assets.blocks[1],
                position : { x : 'left', y : 'top' }
            })
        })
    )
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 1400, y : 49 },
            position : { x : 0, y : 0 },
            index : 20,
            texture : new Gravity.Texture({
                image : assets.blocks[0],
                position : { x : 'left', y : 'bottom' }
            })
        })
    )
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 1400, y : 49 },
            position : { x : 0, y : 1200 - 49 },
            index : 20,
            texture : new Gravity.Texture({
                image : assets.blocks[0],
                position : { x : 'top', y : 'bottom' }
            })
        })
    )
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 49, y : 49 },
            position : { x : 0, y : 0 },
            index : 20,
            texture : new Gravity.Texture({
                image : assets.blocks[2],
                position : { x : -60, y : -60 }
            })
        })
    )
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 49, y : 49 },
            position : { x : 0, y : 1200 - 49},
            index : 20,
            texture : new Gravity.Texture({
                image : assets.blocks[2],
                position : { x : -65, y : -120 }
            })
        })
    )
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 49, y : 49 },
            position : { x : 1400 - 49, y : 0 },
            index : 20,
            texture : new Gravity.Texture({
                image : assets.blocks[2],
                position : { x : -128, y : -60 }
            })
        })
    )
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 49, y : 49 },
            position : { x : 1400 - 49, y : 1200 - 49 },
            index : 20,
            texture : new Gravity.Texture({
                image : assets.blocks[2],
                position : { x : -120, y : -113 }
            })
        })
    )
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 1400, y : 2000 },
            position : { x : 0, y : -1999 },
            index : 400,
            texture : new Gravity.Texture({ color : '#000' })
        })
    )
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 1400, y : 2000 },
            position : { x : 0, y : 1199 },
            index : 400,
            texture : new Gravity.Texture({ color : '#000' })
        })
    )
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 2000, y : 5200 },
            position : { x : -1999, y : -2000 },
            index : 400,
            texture : new Gravity.Texture({ color : '#000' })
        })
    )
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 2000, y : 5200 },
            position : { x : 1399, y : -2000 },
            index : 400,
            texture : new Gravity.Texture({ color : '#000' })
        })
    )
    scene.add(
        new Gravity.Object({
            active : true,
            size : { x : 1400, y : 100 },
            position : { x : 0, y : -80 },
            fixed : { x : true, y : true },
            index : 401
        })
    )
    scene.add(
        new Gravity.Object({
            active : true,
            size : { x : 1400, y : 100 },
            position : { x : 0, y : 1165 },
            fixed : { x : true, y : true },
            index : 401
        })
    )
    scene.add(
        new Gravity.Object({
            active : false,
            size : { x : 1400, y : 20 },
            position : { x : 0, y : 1145 },
            index : 401,
            tags : 'ground'
        })
    )
    scene.add(
        new Gravity.Object({
            active : true,
            size : { x : 100, y : 1200 },
            position : { x : -65, y : 0 },
            fixed : { x : true, y : true },
            index : 401
        })
    )
    scene.add(
        new Gravity.Object({
            active : true,
            size : { x : 100, y : 1200 },
            position : { x : 1370, y : 0 },
            fixed : { x : true, y : true },
            index : 401
        })
    )
}