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
        const options = _Gravity_.getSetOptions(arguments, this)
        // return if nothing to update
        if(options === null) { return }
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
        // render index
        this.index = 0
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
        const options = _Gravity_.getSetOptions(arguments, this)
        // return if nothing to update
        if(options === null) { return }
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
        // update index if given
        if('index' in options) {
            // update index flag
            this.index = options.index
            // update element index
            this.element.style.zIndex = this.index
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
    // method to clone
    clone() {
        // return cloned object
        return new Gravity.Object(this)
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
        // position of image
        this.position = { x : 'center', y : 'center' }
        // repetition of image
        this.repeat = { x : true, y : true }
        // flip of image
        this.flip = { x : false, y : false }
        // animation
        this.animation = null
        // append style node
        this.element.appendChild(document.createTextNode(' '))
        // append animation node
        this.element.appendChild(document.createTextNode(' '))
        // append style element to head
        document.head.appendChild(this.element)
        // push to texture list
        Gravity.Texture.list.push(this)
        // set options
        this.set(options || {})
    }
    // method to set options
    set() {
        // get options by arguments
        const options = _Gravity_.getSetOptions(arguments, this)
        // return if nothing to update
        if(options === null) { return }
        // update color if given
        if('color' in options) { this.color = options.color }
        // update image if given
        if('image' in options) { this.image = options.image }
        // update scale if given
        if('scale' in options) { this.scale = options.scale }
        // update position if given
        if('position' in options) { this.position = options.position }
        // update repeat if given
        if('repeat' in options) { this.repeat = options.repeat }
        // update flip if given
        if('flip' in options) { this.flip = options.flip }
        // update animation if given
        if('animation' in options) {
            // update animation
            this.animation = options.animation
            // check animation
            if(this.animation === null) {
                // remove animation rules
                this.element.childNodes[1].data = ''
            } else {
                // update animation
                this.animation.set()
            }
        }
        // generate style node
        this.element.childNodes[0].data = `
            [texture="${ this.id }"] {
                background-color: ${ this.color || 'transparent' };
                background-image: ${
                    this.image ? `url(${ encodeURI(this.image) })`
                    : 'none'
                };
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
                background-position: ${
                    typeof this.position.x === 'number' ? this.position.x + 'px'
                    : this.position.x
                }, ${
                    typeof this.position.y === 'number' ? this.position.y + 'px'
                    : this.position.y
                };
            }
        `
    }
    // method to clone
    clone() {
        // return cloned texture
        return new Gravity.Texture(this)
    }
}

// list of textures
Gravity.Texture.list = []

// animation class
Gravity.Animation = class {
    // constructor
    constructor(options) {
        // texture id
        this.id = _Gravity_.createID()
        // create style element
        this.element = document.createElement('style')
        // duration in seconds
        this.duration = 1
        // delay in seconds
        this.delay = 0
        // reverse flag
        this.reverse = false
        // loop flag
        this.loop = true
        // colors array
        this.colors = []
        // images array
        this.images = []
        // set options
        this.set(options || {})
        // append style element to head
        document.head.appendChild(this.element)
    }
    // method to set options
    set() {
        // get options by arguments
        const options = _Gravity_.getSetOptions(arguments, this, true)
        // return if nothing to update
        if(options === null) { return }
        // update duration if given
        if('duration' in options) { this.duration = options.duration }
        // update delay if given
        if('delay' in options) { this.delay = options.delay }
        // update reverse if given
        if('reverse' in options) { this.reverse = options.reverse }
        // update loop if given
        if('loop' in options) { this.loop = options.loop }
        // update images if given
        if('images' in options || 'colors' in options) {
            // update images
            this.images = options.images || this.images
            // update colors
            this.colors = options.colors || this.colors
            // generate and set on style element
            this.element.innerHTML = `
                @keyframes ${ this.id } {
                    ${ this.images.map((image, i, r) => {
                        const color = this.colors[i]
                        return `${ i * 100 / r.length }% {
                            background-image: ${ image ? `url(${ encodeURI(image) })` : 'none' };
                            background-color: ${ color ? color : 'transparent' };
                        }`
                    }).join('\n') }

                    100% {${(() => {
                        const image = this.images[0] || 'none'
                        const color = this.colors[0] || 'transparent'
                        return `
                            background-image: ${ image ? `url(${ encodeURI(image) })` : 'none' };
                            background-color: ${ color ? color : 'transparent' };
                        `
                    })()}}
                }
            `
        }
        // filter textures that uses this animation
        const textures = Gravity.Texture.list.filter(x => x.animation === this)
        // for each texture
        for(let i = 0; i < textures.length; i++) {
            // current texture
            const texture = textures[i]
            // if texture is ready to update
            if(texture.element.childNodes.length === 2) {
                // generate animation rules
                const rules = `
                    [texture="${ texture.id }"] {
                        animation-name: ${ this.id };
                        animation-duration: ${ this.duration }s;
                        animation-delay: ${ this.delay }s;
                        animation-direction: ${
                            this.reverse ? 'reverse' : 'normal'
                        };
                        animation-iteration-count: ${
                            this.loop === true ? 'infinite'
                                : this.loop === false
                                    ? '1' : this.loop
                        };
                    }
                `
                // if rules not equals to previous
                if(texture.element.childNodes[1].data !== rules) {
                    // update animation node
                    texture.element.childNodes[1].data = rules
                }
            }
        }
    }
    // method to clone
    clone() {
        // return cloned animation
        return new Gravity.Animation(this)
    }
}

// asset loader class
Gravity.AssetLoader = class {
    // constructor
    constructor() {
        // busy flag
        this.busy = false
    }
    // method to load assets
    load(input, progess = () => {}, complete = () => {}, error = () => {}) {
        // return if busy or update busy flag
        if(this.busy) { return } else { this.busy = true }
        // load assets with callback functions
        _Gravity_.loadAssets(input, progess, complete, error).then(() => {
            // update busy flag
            this.busy = false
        }).catch(() => {
            // update busy flag
            this.busy = false
        })
    }
}

// input map class
Gravity.InputMap = class {
    // constructor
    constructor() {
        this.keys = []
        // keydown listener
        window.addEventListener('keydown', event => {
            // get key letter or code
            const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
            // if not in keys array
            if(this.keys.includes(key) === false) {
                // push to keys array
                this.keys.push(key)
            }
        })
        // keyup listener
        window.addEventListener('keyup', event => {
            // get key letter or code
            const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
            // remove from keys array
            this.keys = this.keys.filter(x => x !== key)
        })
    }
}

// gravity helpers
const _Gravity_ = {}

// helper to map set options
_Gravity_.getSetOptions = (args, that, override = false) => {
    // options object
    const obj = {}
    // check args length
    if(args.length === 1 && typeof args[0] === 'object' && args[1] !== null) {
        // first arg as object
        Object.assign(obj, args[0])
    } else if(args.length === 2 && typeof args[0] === 'string') {
        // set single value option
        obj[args[0]] = args[1]
    } else if(args.length === 3 && typeof args[0] === 'string') {
        // set multi value option
        obj[args[0]] = { x : args[1], y : args[2] }
    }
    // output object
    const out = {}
    // keys array
    const keys = Object.keys(obj)
    // for each key
    for(let i = 0; i < keys.length; i++) {
        // current key
        const key = keys[i]
        // current value
        const val = obj[key]
        // if values not equals
        if(that[key] !== val) {
            // check null value
            if(that[key] === null || val === null) {
                // set to updates
                out[key] = val
            } else if(typeof val === 'object') {
                // check for multi value option
                if('x' in val && 'y' in val) {
                    // check x and y values
                    if(that[key].x !== val.x || that[key].y !== val.y) {
                        // set to updates
                        out[key] = val
                    }
                } else {
                    // set to updates
                    out[key] = val
                }
            } else {
                // set to updates
                out[key] = val
            }
        }
    }
    if(override) { return obj }
    // check output keys length
    if(Object.keys(out).length === 0) {
        // nothing to update
        return null
    } else {
        // return object to update
        return out
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

// method to load all assets
_Gravity_.loadAssets = async(input, progess, complete, error) => {
    // items array
    const items = []
    // keys of object
    const keys = Object.keys(input)
    // for each key
    for(let i = 0; i < keys.length; i++) {
        // current key
        const key = keys[i]
        // current value
        const val = input[key]
        // check value type
        if(Array.isArray(val)) {
            // for each item in array
            for(let j = 0; j < val.length; j++) {
                // push to items
                items.push({ file : val[j], key : key, index : j })
            }
        } else if(typeof val === 'string') {
            // push to items
            items.push({ file : val, key : key })
        }
    }
    // for each item in array
    for(let i = 0; i < items.length; i++) {
        // current item
        const item = items[i]
        // load image
        const blob = await _Gravity_.loadImage(item.file).catch(error)
        Array.isArray(input[item.key])
            ? input[item.key][item.index] = blob
            : input[item.key] = blob
        // progess callback
        progess({ loaded : i + 1, total : items.length, file : item.file })
    }
    // complete callback
    complete(input)
}

// method to load image
_Gravity_.loadImage = url => {
    // return promise
    return new Promise((resolve, reject) => {
        // create new image
        const img = new Image()
        // resolve callback
        img.addEventListener('load', () => resolve(url))
        // error callback
        img.addEventListener('error', reject)
        // set image url
        img.src = url
    })
}