// gravity object
const Gravity = {}

// scene class
Gravity.Scene = class {
    // constructor
    constructor(options) {
        // create root element
        this.element = document.createElement('gravity')
        // objects array
        this.objects = []
        // system resistance
        this.resistance = 0.01
        // system gravity
        this.gravity = 10
        // position of view
        this.position = { x : 0, y : 0 }
        // size of scene
        this.size = { x : 400, y : 300 }
        // texture
        this.texture = null
        // set options
        this.set(options || {})
    }
    // method to set options
    set() {
        // get options by arguments
        const options = _Gravity_.getSetOptions(arguments)
        // return if null or non object input
        if(options === null || typeof options !== 'object') { return }
        // update resistance if given
        if('resistance' in options) { this.resistance = options.resistance }
        // update gravity if given
        if('gravity' in options) { this.gravity = options.gravity }
        // update position if given
        if('position' in options) { this.position = options.position }
        // update size if given
        if('size' in options) {
            // update size
            this.size = options.size
            // update element width
            this.element.style.width = this.size.x + 'px'
            // update element height
            this.element.style.height = this.size.y + 'px'
        }
        // update texture if given
        if('texture' in options) {
            // texture size
            this.texture = options.texture
            // update element texture
            this.element.setAttribute('texture', this.texture.id)
        }
    }
    // method to add objects
    add(object) {
        // push to objects array
        this.objects.push(object)
        // append to root element
        this.element.appendChild(object.element)
    }
    // method to remove objects
    remove(object) {
        // filter object from array
        this.objects = this.objects.filter(x => x === object)
        // remove from root element
        object.element.remove()
    }
    // method to render frame
    render() {

    }
}

// object class
Gravity.Object = class {
    // constructor
    constructor(options) {
        // create element
        this.element = document.createElement('obj')
        // physically enabled flag
        this.physical = true
        // friction factor
        this.friction = 0.05
        // elasticity
        this.elasticity = 0.2
        // velocity
        this.velocity = { x : 0, y : 0 }
        // fixed axes
        this.fixed = { x : 0, y : 0 }
        // weight
        this.weight = 50
        // current collide objects
        this.collide = []
        // visibility flag
        this.visible = true
        // position
        this.position = { x : 0, y : 0 }
        // size
        this.size = { x : 50, y : 50 }
        // texture
        this.texture = null
        // set options
        this.set(options || {})
    }
    // method to set options
    set() {
        // get options by arguments
        const options = _Gravity_.getSetOptions(arguments)
        // return if null or non object input
        if(options === null || typeof options !== 'object') { return }
        // update physical flag if given
        if('physical' in options) { this.physical = options.physical }
        // update friction if given
        if('friction' in options) { this.friction = options.friction }
        // update elasticity if given
        if('elasticity' in options) { this.elasticity = options.elasticity }
        // update velocity if given
        if('velocity' in options) { this.velocity = options.velocity }
        // update fixed axes if given
        if('fixed' in options) { this.fixed = options.fixed }
        // update weight if given
        if('weight' in options) { this.weight = options.weight }
        // update visibility flag if given
        if('visible' in options) {
            // update visibility flag
            this.visible = options.visible
            // update element visibility
            this.element.style.display = this.visible ? 'block' : 'none'
        }
        // update position if given
        if('position' in options) {
            // update position
            this.position = options.position
            // update element left
            this.element.style.left = this.position.x + 'px'
            // update element top
            this.element.style.top = this.position.y + 'px'
        }
        // update size if given
        if('size' in options) {
            // update size
            this.size = options.size
            // update element width
            this.element.style.width = this.size.x + 'px'
            // update element height
            this.element.style.height = this.size.y + 'px'
        }
        // update texture if given
        if('texture' in options) {
            // texture size
            this.texture = options.texture
            // update element texture
            this.element.setAttribute('texture', this.texture.id)
        }
    }
}

// texture class
Gravity.Texture = class {
    // constructor
    constructor(options) {
        // texture id
        this.id = _Gravity_.createID()
        // create style element
        this.element = document.createElement('style')
        // color
        this.color = null
        // image
        this.image = null
        // scale of image
        this.scale = { x : 1, y : 1 }
        // repetition of image
        this.repeat = { x : true, y : true }
        // flip of image
        this.flip = { x : false, y : false }
        // animation
        this.animation = null
        // set options
        this.set(options || {})
        // append style element to head
        document.head.appendChild(this.element)
    }
    // method to set options
    set() {
        // get options by arguments
        const options = _Gravity_.getSetOptions(arguments)
        // update color if given
        if('color' in options) { this.color = options.color }
        // update image if given
        if('image' in options) { this.image = encodeURI(options.image) }
        // update scale if given
        if('scale' in options) { this.scale = options.scale }
        // update repeat if given
        if('repeat' in options) { this.repeat = options.repeat }
        // update flip if given
        if('flip' in options) { this.flip = options.flip }
        // update animation if given
        if('animation' in options) { this.animation = options.animation }
        // generate and set on style element
        this.element.innerHTML = `
            [texture="${ this.id }"] {
                background-color: ${ this.color || 'transparent' };
                background-image: ${ this.image ? `url(${ this.image })` : 'none' };
                background-size: ${ this.scale.x * 100 }% ${ this.scale.y * 100 }%;
                background-repeat: ${
                    this.repeat.x && this.repeat.y ? 'repeat'
                        : this.repeat.x && !this.repeat.y ? 'repeat-x'
                        : !this.repeat.x && this.repeat.y ? 'repeat-y'
                        : 'no-repeat'
                };
                transform: scale(${
                    this.flip.x && this.flip.y ? '-1, -1'
                        : this.flip.x && !this.flip.y ? '-1, 1'
                        : !this.flip.x && this.flip.y ? '1, -1'
                        : '1, 1'
                });
            }
        `
    }
}

// gravity helpers
const _Gravity_ = {}

// helper to map set options
_Gravity_.getSetOptions = args => {
    // return if no args
    if(args.length === 0) { return {} }
    // check args length
    if(args.length === 1 && typeof args[0] === 'object' && args[1] !== null) {
        // return first as object
        return args[0]
    } else if(args.length === 2 && typeof args[0] === 'string') {
        // output object
        const out = {}
        // set single value option
        out[args[0]] = args[1]
        // return output
        return out
    } else if(args.length === 3 && typeof args[0] === 'string') {
        // output object
        const out = {}
        // set multi value option
        out[args[0]] = { x : args[1], y : args[2] }
        // return output
        return out
    } else {
        // return empty
        return {}
    }
}

// helper to create an id
_Gravity_.createID = () => {
    // array of ids
    const list = _Gravity_.createID.list
    // new id
    let id = null
    // while find proper id
    while(id === null || list.includes(id)) {
        id = 'G-' + (Date.now() + parseInt(Math.random() * Date.now()))
    }
    // push to ids
    list.push(id)
    // return new id
    return id
}

// list of previous ids
_Gravity_.createID.list = []