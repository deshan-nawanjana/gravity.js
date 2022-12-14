// gravity object
const Gravity = {}

// scene class
Gravity.Scene = class {
    // constructor
    constructor(options) {
        // create root element
        this.element = document.createElement('gravity')
        // create inner element
        this.inner = document.createElement('gravity-inner')
        // append inner into root
        this.element.appendChild(this.inner)
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
        // color
        this.color = null
        // paused flag
        this.paused = false
        // class type
        this.type = 'Scene'
        // add cursor events
        _Gravity_.addCursorEvents(this)
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
        if('position' in options) {
            // update position
            this.position = options.position
            // generate transform rule for inner
            const itr = `translateX(${ this.position.x }px) translateY(${ this.position.y }px)`
            // update inner transform
            this.inner.style.transform = itr
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
        // update color if given
        if('color' in options) {
            // update color
            this.color = options.color
            // update element color
            this.element.style.backgroundColor = this.color || 'transparent'
        }
    }
    // method to add objects
    add(object) {
        // push to objects array
        this.objects.push(object)
        // append to root element
        this.inner.appendChild(object.element)
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
        // check paused state
        if(this.paused === false) {
            // update motions
            _Gravity_.updateMotion(this)
            // return true
            return true
        } else {
            // return false
            return false
        }
    }
    // method to pause rendering
    pause() {
        // stop keyframes
        this.element.setAttribute('paused', '')
        // update paused flag
        this.paused = true
    }
    // method to play rendering
    play() {
        // resume keyframes
        this.element.removeAttribute('paused')
        // update paused flag
        this.paused = false
    }
}

// object class
Gravity.Object = class {
    // constructor
    constructor(options) {
        // create element
        this.element = document.createElement('obj')
        // physically active flag
        this.active = true
        // friction factor
        this.friction = 0.05
        // elasticity
        this.elasticity = 0.2
        // velocity
        this.velocity = { x : 0, y : 0 }
        // fixed axes
        this.fixed = { x : false, y : false }
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
        // outline helper
        this.outline = false
        // tags array
        this.tags = []
        // events array
        this.events = []
        // text content
        this.text = ''
        // style class name
        this.style = null
        // store on element
        this.element._gravity = this
        // class type
        this.type = 'Object'
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
        // update active flag if given
        if('active' in options) { this.active = options.active }
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
        // update outline if given
        if('outline' in options) {
            // update outline
            this.outline = options.outline
            // check outline value
            if(this.outline) {
                // outline as flag
                if(this.outline === true) {
                    // show object outline
                    this.element.style.boxShadow = 'inset 0px 0px 0px 1px #F00'
                } else {
                    // show object outline
                    this.element.style.boxShadow = 'inset 0px 0px 0px 1px ' + this.outline
                }
            } else {
                // hide object outline
                this.element.style.boxShadow = ''
            }
        }
        // update tags if given
        if('tags' in options) { this.tags = options.tags }
        // update text content if given
        if('text' in options) {
            // update text
            this.text = options.text
            // update inner html
            this.element.innerHTML = this.text
        }
        // update style class if given
        if('style' in options) {
            // update style
            this.style = options.style
            // check class name
            if(this.style) {
                // set class name
                this.element.className = this.style
            } else {
                // remove class attribute
                this.element.removeAttribute('class')
            }
        }
    }
    // method to add event
    addEvent(type, callback) {
        this.events.push({ type : type, callback : callback })
    }
    // method to clone
    clone(...options) {
        // clone object
        const obj = new Gravity.Object(this)
        // setup with options
        obj.set(...options)
        // return clone
        return obj
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
        // opacity
        this.opacity = 1
        // size of image
        this.size = { x : 'auto', y : 'auto' }
        // position of image
        this.position = { x : 'center', y : 'center' }
        // repetition of image
        this.repeat = { x : true, y : true }
        // flip of image
        this.flip = { x : false, y : false }
        // animation
        this.animation = null
        // duration in seconds
        this.duration = 1
        // delay in seconds
        this.delay = 0
        // reverse flag
        this.reverse = false
        // paused flag
        this.paused = false
        // loop flag
        this.loop = true
        // class type
        this.type = 'Texture'
        // append style element to head
        document.head.appendChild(this.element)
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
        // update opacity if given
        if('opacity' in options) { this.opacity = options.opacity }
        // update size if given
        if('size' in options) { this.size = options.size }
        // update position if given
        if('position' in options) { this.position = options.position }
        // update repeat if given
        if('repeat' in options) { this.repeat = options.repeat }
        // update flip if given
        if('flip' in options) { this.flip = options.flip }
        // update animation if given
        if('animation' in options) { this.animation = options.animation }
        // update duration if given
        if('duration' in options) { this.duration = options.duration }
        // update delay if given
        if('delay' in options) { this.delay = options.delay }
        // update reverse if given
        if('reverse' in options) { this.reverse = options.reverse }
        // update paused if given
        if('paused' in options) { this.paused = options.paused }
        // update loop if given
        if('loop' in options) { this.loop = options.loop }
        // generate style node
        this.element.innerHTML = `
            [texture="${ this.id }"] {
                background-color: ${ this.color || 'transparent' };
                background-image: ${
                    this.image ? `url(${ encodeURI(this.image) })`
                    : 'none'
                };
                opacity: ${ this.opacity ? this.opacity : 0 };
                transition-duration: ${ this.duration }s;
                transition-delay: ${ this.delay }s;
                transition-property: background, color, opacity;
                background-size: ${
                    typeof this.size.x === 'number' ? this.size.x + 'px' : this.size.x
                } ${
                    typeof this.size.y === 'number' ? this.size.y + 'px' : this.size.y
                };
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
                } ${
                    typeof this.position.y === 'number' ? this.position.y + 'px'
                    : this.position.y
                };
                animation-name: ${
                    this.animation ? this.animation.id : 'none'
                };
                animation-duration: ${ this.duration }s;
                animation-delay: ${ this.delay }s;
                animation-direction: ${
                    this.reverse ? 'reverse' : 'normal'
                };
                animation-play-state: ${
                    this.paused ? 'paused' : 'running'
                };
                animation-iteration-count: ${
                    this.loop === true ? 'infinite'
                        : this.loop === false
                            ? '1' : this.loop
                };
            }
        `
    }
    // method to clone
    clone(...options) {
        // clone texture
        const obj = new Gravity.Texture(this)
        // setup with options
        obj.set(...options)
        // return clone
        return obj
    }
}

// animation class
Gravity.Animation = class {
    // constructor
    constructor(options) {
        // texture id
        this.id = _Gravity_.createID()
        // create style element
        this.element = document.createElement('style')
        // colors array
        this.colors = []
        // images array
        this.images = []
        // class type
        this.type = 'Animation'
        // set options
        this.set(options || {})
        // append style element to head
        document.head.appendChild(this.element)
    }
    // method to set options
    set() {
        // get options by arguments
        const options = _Gravity_.getSetOptions(arguments, this)
        // return if nothing to update
        if(options === null) { return }
        // update images if given
        if('images' in options || 'colors' in options) {
            // update images
            this.images = Object.values(options.images || this.images)
            // update colors
            this.colors = Object.values(options.colors || this.colors)
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
    }
    // method to clone
    clone(...options) {
        // clone animation
        const obj = new Gravity.Animation(this)
        // setup with options
        obj.set(...options)
        // return clone
        return obj
    }
}

// loader class
Gravity.Loader = class {
    // constructor
    constructor() {
        // method to load a single file
        this.load = async(input, progress) => {
            // check input type
            if(typeof input === 'object') {
                return this.loadAll(input, progress)
            } else if(input.split('.').pop().toLowerCase() !== 'asset') {
                // load unknown file type as blob
                const blob = await _Gravity_.loadFile(input, 'blob', progress)
                // return blob url
                return URL.createObjectURL(blob)
            } else {
                // output object
                let out = null
                // get text response of file
                const txt = await _Gravity_.loadFile(input, 'text', progress)
                // parse from json
                const obj = JSON.parse(txt)
                // check object type
                if(obj.type === 'Object') {
                    // create object
                    out = new Gravity.Object(obj)
                    // if texture available
                    if(obj.texture) {
                        out.set('texture', new Gravity.Texture(obj.texture))
                        // if animation available
                        if(obj.texture.animation) {
                            // create animation
                            out.texture.set(
                                'animation', new Gravity.Animation(obj.texture.animation)
                            )
                        }
                    }
                } else if(obj.type === 'Texture') {
                    // create texture
                    out = new Gravity.Texture(obj)
                    // if animation available
                    if(obj.animation) {
                        // create animation
                        out.set('animation', new Gravity.Animation(obj.animation))
                    }
                } else if(obj.type === 'Animation') {
                    // create animation
                    out = new Gravity.Animation(obj)
                } else if(obj.type === 'Files') {
                    // get object files
                    out = obj.data
                }
                // return output
                return out
            }
        }
        // method to load mutiple files
        this.loadAll = async(input, progress) => {
            // files array
            const files = []
            // recursive method to get all files
            const recFiles = (obj, path) => {
                // if item is an object
                if(typeof obj === 'object' && obj !== null) {
                    // get object keys
                    const keys = Object.keys(obj)
                    // for each key
                    for(let i = 0; i < keys.length; i++) {
                        // current key
                        const key = keys[i]
                        // if type is string
                        if(typeof obj[key] === 'string') {
                            // push to files with path
                            files.push({ url : obj[key], path : (path + key).split('.') })
                        } else {
                            // search for files in child
                            recFiles(obj[key], path + key + '.')
                        }
                    }
                }
            }
            // cumulative loaded
            let loaded = 0
            // cumulative total
            let total = 0
            // current index
            let index = null
            // get all files
            recFiles(input, '')
            // for each file
            for(let i = 0; i < files.length; i++) {
                // current file
                const file = files[i]
                // load single file content
                const data = await this.load(file.url, e => {
                    // if progress function available
                    if(typeof progress === 'function') {
                        // calculate current total
                        if(index !== i) {
                            total += e.total
                            index = i
                        }
                        // callback progress
                        progress({
                            loaded : loaded + e.loaded,
                            total : total,
                            index : i + 1,
                            length : files.length,
                            file : file.url,
                            size : e.total
                        })
                    }
                })
                // root object
                let root = input
                // for each path item
                for(let p = 0; p < file.path.length; p++) {
                    // current key
                    const key = file.path[p]
                    // check index
                    if(p === file.path.length - 1) {
                        // set data on object
                        root[key] = data
                    } else {
                        // jump to child object
                        root = root[key]
                    }
                }
                // set current loaded as current totoal
                loaded = total
            }
            // return output
            return input
        }
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
    // method to check all keys
    every() {
        // get inputs as array
        const inputs = arguments.length === 1 && Array.isArray(arguments[0])
            ? arguments[0] : Array.from(arguments)
        // return check result
        return inputs.every(x => this.keys.includes(x))
    }
    // method to check any keys
    some() {
        // get inputs as array
        const inputs = arguments.length === 1 && Array.isArray(arguments[0])
            ? arguments[0] : Array.from(arguments)
        // return check result
        return inputs.some(x => this.keys.includes(x))
    }
    // method to check not any key
    none() {
        // get inputs as array
        const inputs = arguments.length === 1 && Array.isArray(arguments[0])
            ? arguments[0] : Array.from(arguments)
        // return check result
        return !inputs.some(x => this.keys.includes(x))
    }
    // method to check single key
    is(key) {
        return this.keys.includes(key)
    }
    // method to check single key is not pressed
    not(key) {
        return !this.keys.includes(key)
    }
}

// gravity helpers
const _Gravity_ = {}

// helper to map set options
_Gravity_.getSetOptions = (args, that) => {
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

// helper to limit zero
_Gravity_.limitZero = (x, a) => {
    // check input value
    if(x === 0) {
        // return input for zero
        return x
    } else if(x > 0) {
        // return positive value
        return x + a < 0 ? 0 : x + a
    } else if(x < 0) {
        // return negative value
        return x + a > 0 ? 0 : x + a
    }
}

// helper to detect two objects horizontal collision
_Gravity_.isHorizontalBetween = (b, d, x, z) => {
    return (
        (d >= z && d <= x) && (b >= z && b <= x) || (d >= z && d <= x) && (b >= z && b >= x) ||
        (d <= z && d <= x) && (b >= z && b <= x) || (d <= z && d <= x) && (b >= z && b >= x)
    )
}

// helper to detect two objects vertical collision
_Gravity_.isVerticalBetween = (a, c, w, y) => {
    return (
        (a <= w && a <= y) && (c >= w && c <= y) || (a >= w && a <= y) && (c >= w && c <= y) ||
	    (a >= w && a <= y) && (c >= w && c >= y) || (a <= w && a <= y) && (c >= w && c >= y)
    )
}

// helper to find collide details
_Gravity_.getCollideState = (a, b, c, d, w, x, y, z) => {
    return {
        top : _Gravity_.isHorizontalBetween(b, d, x, z) && a <= y && c >= y,
        bottom : _Gravity_.isHorizontalBetween(b, d, x, z) && c >= w && a <= w,
        left : _Gravity_.isVerticalBetween(a, c, w, y) && d <= x && b >= x,
        right : _Gravity_.isVerticalBetween(a, c, w, y) && b >= z && d <= z,
        topRight : (x - d) > (c - w) ? 'A' : 'B',
        topLeft : (b - z) > (c - w) ? 'A' : 'D',
        bottomLeft : (b - z) > (y - a) ? 'C' : 'D',
        bottomRight : (x - d) > (y - a) ? 'C' : 'B'
    }
}

// helper to calculate velocities after collision
_Gravity_.getCollideValues = (child_1, child_2, direction) => {
    // weights of objects
    const m1 = child_1.weight
    const m2 = child_2.weight
    // initial velocities
    const u1 = child_1.velocity[direction]
    const u2 = child_2.velocity[direction]
    // velocities after collision
    const v1 = u1 * (m1 - m2) / (m1 + m2) + u2 * (2 * m2) / (m1 + m2)
    const v2 = u1 * (2 * m1) / (m1 + m2) + u2 * (m1 - m2) / (m1 + m2)
    // return calculations
    return { u1 : u1, u2 : u2, ut : u1 + u2, v1 : v1, v2 : v2, vt : v1 + v2 }
}

// helper to update motions
_Gravity_.updateMotion = scene => {
    // objects of scene
    const objects = scene.objects
    // for each child
    for(let i = 0; i < objects.length; i++) {
        // current child
        const child = objects[i]
        // update motion on active objects
        if(child.active) {
            // check for fall of gravity
            if(child.fixed.y === false) {
                // update velocity
                child.velocity.y += scene.gravity / 50
                // update position
                child.position.y += child.velocity.y
            } else {
                // constant horizontal movement
                child.position.y += child.velocity.y
            }
            // check for vertical movement
            if(child.fixed.x === false) {
                // horizontal move
                child.position.x += child.velocity.x
            } else {
                // constant vertical movement
                child.position.x += child.velocity.x
            }
        }
        // check and update collisions
        _Gravity_.updateCollisions(child, objects)
        // update friction on active objects
        if(child.active) {
            if(child.fixed.x === false) {
                // check collide object
                if(child.collide.length > 0) {
                    // total friction of collide objects
                    const friction = child.collide.map(x => x.friction).reduce((a, b) => a + b)
                    const totalfrc = friction + child.friction
                    // check velocity direction
                    if(child.velocity.x > 0) {
                        // reduce horizontal velocity
                        child.velocity.x = _Gravity_.limitZero(child.velocity.x, totalfrc * -1)
                    } else {
                        // reduce horizontal velocity
                        child.velocity.x = _Gravity_.limitZero(child.velocity.x, totalfrc * +1)
                    }
                }
                // remove system resistance mod
                child.velocity.x -= child.velocity.x % scene.resistance
                // fixing floats
                child.velocity.x = parseFloat(parseFloat(child.velocity.x).toFixed(2))
                child.velocity.y = parseFloat(parseFloat(child.velocity.y).toFixed(2))
            }
        }
        // child element
        const element = child.element
        // if any x position change
        if(child.position.x !== child.position._x) {
            // update x position
            element.style.left = child.position.x + 'px'
            // store last position
            child.position._x = child.position.x
        }
        // if any y position change
        if(child.position.y !== child.position._y) {
            // update y position
            element.style.top = child.position.y + 'px'
            // store last position
            child.position._y = child.position.y
        }
    }
}

// helper to update collisions
_Gravity_.updateCollisions = (child_1, objects) => {
    // collide objects array
    const collide = []
    // child positions
    const a = child_1.position.y
    const b = child_1.position.x + child_1.size.x
    const c = child_1.position.y + child_1.size.y
    const d = child_1.position.x
    // for each child
    for(let i = 0; i < objects.length; i++) {
        // current child
        const child_2 = objects[i]
        // continue if same child
        if(child_1 === child_2) { continue }
        // child positions
        const w = child_2.position.y
        const x = child_2.position.x + child_2.size.x
        const y = child_2.position.y + child_2.size.y
        const z = child_2.position.x
        // get collide details
        const s = _Gravity_.getCollideState(a, b, c, d, w, x, y, z)
        // react only for active object
        if(child_1.active && child_2.active) {
            // bounce methods
            const bounce = {
                top() {
                    // if object not fully fixed
                    if(child_1.fixed.y === false || child_1.fixed.y === false) {
                        // reset object position
                        child_1.position.y = w - child_1.size.y
                    }
                    // calculate velocities after collision
                    const velo = _Gravity_.getCollideValues(child_1, child_2, 'y')
                    // check objects fixed states
                    if(child_1.fixed.y === false && child_2.fixed.y === false) {
                        // update object velocity
                        child_1.velocity.y = velo.v1 * child_1.elasticity
                        // update barrier velocity
                        child_2.velocity.y = velo.v2 * child_2.elasticity
                    } else if(child_1.fixed.y === false && child_2.fixed.y === true) {
                        // reverse object velocity
                        child_1.velocity.y = velo.ut * -1 * child_1.elasticity
                    } else if(child_1.fixed.y === true && child_2.fixed.y === false) {
                        // reverse barrier velocity
                        if(child_1.velocity.y > 0) {
                            child_2.velocity.y = velo.ut * -1 * child_2.elasticity
                        }
                    }
                },
                bottom() {
                    // if object not fully fixed
                    if(child_1.fixed.y === false || child_1.fixed.y === false) {
                        // reset object position
                        child_1.position.y = y
                    }
                    // calculate velocities after collision
                    const velo = _Gravity_.getCollideValues(child_1, child_2, 'y')
                    // check objects fixed states
                    if(child_1.fixed.y === false && child_2.fixed.y === false) {
                        // update object velocity
                        child_1.velocity.y = velo.v1 * child_1.elasticity
                        // update barrier velocity
                        child_2.velocity.y = velo.v2 * child_2.elasticity
                    } else if(child_1.fixed.y === false && child_2.fixed.y === true) {
                        // reverse object velocity
                        child_1.velocity.y = velo.ut * child_1.elasticity
                    } else if(child_1.fixed.y === true && child_2.fixed.y === false) {
                        // reverse barrier velocity
                        if(child_1.velocity.y > 0) {
                            child_2.velocity.y = velo.ut * child_2.elasticity
                        }
                    }
                },
                left() {
                    // if object not fully fixed
                    if(child_1.fixed.x === false || child_1.fixed.y === false) {
                        // reset object position
                        child_1.position.x = z - child_1.size.x
                    }
                    // calculate velocities after collision
                    const velo = _Gravity_.getCollideValues(child_1, child_2, 'x')
                    // check objects fixed states
                    if(child_1.fixed.x === false && child_2.fixed.x === false) {
                        // update object velocity
                        child_1.velocity.x = velo.v1 * child_1.elasticity
                        // update barrier velocity
                        child_2.velocity.x = velo.v2 * child_2.elasticity
                    } else if(child_1.fixed.x === false && child_2.fixed.x === true) {
                        // reverse object velocity
                        child_1.velocity.x = velo.vt * child_1.elasticity
                    } else if(child_1.fixed.x === true && child_2.fixed.x === false) {
                        // reverse barrier velocity
                        if(child_1.velocity.x > 0) {
                            child_2.velocity.x = velo.vt * child_2.elasticity
                        }
                    }
                },
                right() {
                    // if object not fully fixed
                    if(child_1.fixed.x === false || child_1.fixed.y === false) {
                        // reset object position
                        child_1.position.x = x
                    }
                    // calculate velocities after collision
                    const velo = _Gravity_.getCollideValues(child_1, child_2, 'x')
                    // check objects fixed states
                    if(child_1.fixed.x === false && child_2.fixed.x === false) {
                        // update object velocity
                        child_1.velocity.x = velo.v1 * child_1.elasticity
                        // update barrier velocity
                        child_2.velocity.x = velo.v2 * child_2.elasticity
                    } else if(child_1.fixed.x === false && child_2.fixed.x === true) {
                        // reverse object velocity
                        child_1.velocity.x = velo.vt * child_1.elasticity
                    } else if(child_1.fixed.x === true && child_2.fixed.x === false) {
                        // reverse barrier velocity
                        if(child_1.velocity.x > 0) {
                            child_2.velocity.x = velo.vt * child_2.elasticity
                        }
                    }
                }
            }
            // object smaller than barrier
            if(s.top && !s.right && !s.bottom && !s.left) { bounce.bottom() }
            if(!s.top && !s.right && s.bottom && !s.left) { bounce.top() }
            if(!s.top && s.right && !s.bottom && !s.left) { bounce.left() }
            if(!s.top && !s.right && !s.bottom && s.left) { bounce.right() }
            // object larger than barrier
            if(s.top && !s.right && s.bottom && s.left) { bounce.right() }
            if(s.top && s.right && s.bottom && !s.left) { bounce.left() }
            if(!s.top && s.right && s.bottom && s.left) { bounce.top() }
            if(s.top && s.right && !s.bottom && s.left) { bounce.bottom() }
            // bottom left corner collision
            if(s.top && s.right && !s.bottom && !s.left) {
                s.bottomLeft === 'C' ? bounce.bottom() : bounce.left()
            }
            // bottom right corner collision
            if(s.top && !s.right && !s.bottom && s.left) {
                s.bottomRight === 'C' ? bounce.bottom() : bounce.right()
            }
            // top right corner collision
            if(!s.top && !s.right && s.bottom && s.left) {
                s.topRight === 'A' ? bounce.top() : bounce.right()
            }
            // top left corner collision
            if(!s.top && s.right && s.bottom && !s.left) {
                s.topLeft === 'A' ? bounce.top() : bounce.left()
            }
        }
        // if any collision
        if(s.top || s.right || s.bottom || s.left) {
            collide.push(child_2)
        }
    }
    // filter collidestart events
    const csa = child_1.events.filter(x => x.type === 'collidestart')
    // if events available
    if(csa.length > 0) {
        // filter collidestart objects
        const cs = collide.filter(x => child_1.collide.includes(x) === false)
        // for each event
        for(let i = 0; i < csa.length; i++) {
            // for each object
            for(let j = 0; j < cs.length; j++) {
                // callback event
                csa[i].callback({ type : 'collidestart', object : cs[j], timeStamp : Date.now() })
            }
        }
    }
    // filter collide events
    const coa = child_1.events.filter(x => x.type === 'collide')
    // if events available
    if(coa.length > 0) {
        // filter collide objects
        const co = collide.filter(x => child_1.collide.includes(x))
        // for each event
        for(let i = 0; i < coa.length; i++) {
            // for each object
            for(let j = 0; j < co.length; j++) {
                // callback event
                coa[i].callback({ type : 'collide', object : co[j], timeStamp : Date.now() })
            }
        }
    }
    // filter collideend events
    const cea = child_1.events.filter(x => x.type === 'collideend')
    // if events available
    if(cea.length > 0) {
        // filter collideend objects
        const ce = child_1.collide.filter(x => collide.includes(x) === false)
        // for each event
        for(let i = 0; i < cea.length; i++) {
            // for each object
            for(let j = 0; j < ce.length; j++) {
                // callback event
                cea[i].callback({ type : 'collide', object : ce[j], timeStamp : Date.now() })
            }
        }
    }
    // filter active old collide objects
    const aold = child_1.collide.filter(x => x.active)
    // filter active new collide objects
    const anew = collide.filter(x => x.active)
    // filter floatstart events
    const fsa = child_1.events.filter(x => x.type === 'floatstart')
    // if events available
    if(fsa.length > 0 && anew.length === 0 && aold.length > 0) {
        // for each event
        for(let i = 0; i < fsa.length; i++) {
            // callback event
            fsa[i].callback({
                type : 'floatstart',
                object : child_1,
                timeStamp : Date.now()
            })
        }
    }
    // filter float events
    const foa = child_1.events.filter(x => x.type === 'float')
    // if events available
    if(foa.length > 0 && anew.length === 0 && aold.length === 0) {
        // for each event
        for(let i = 0; i < foa.length; i++) {
            // callback event
            foa[i].callback({
                type : 'float',
                object : child_1,
                timeStamp : Date.now()
            })
        }
    }
    // filter floatend events
    const fea = child_1.events.filter(x => x.type === 'floatend')
    // if events available
    if(fea.length > 0 && anew.length > 0 && aold.length === 0) {
        // for each event
        for(let i = 0; i < fea.length; i++) {
            // callback event
            fea[i].callback({
                type : 'floatend',
                object : child_1,
                timeStamp : Date.now()
            })
        }
    }
    // update collide array
    child_1.collide = collide
}

// helper to add cursor events on root element
_Gravity_.addCursorEvents = scene => {
    // types of mouse events
    const types = [
        'click',
        'mousedown',
        'mouseup',
        'mousemove',
        'mouseenter',
        'mouseout'
    ]
    // for each event type
    for(let t = 0; t < types.length; t++) {
        // current type
        const type = types[t]
        // create event listener
        scene.element.addEventListener(type, e => {
            // get target object
            const object = e.target._gravity
            // if object available
            if(object) {
                // get click events
                const events = object.events.filter(x => x.type === type)
                // for each event
                for(let i = 0; i < events.length; i++) {
                    // callback event
                    events[i].callback({
                        type : type,
                        object : object,
                        timeStamp : Date.now(),
                        nativeEvent : e
                    })
                }
            }
        })
    }
}

// helper to load file
_Gravity_.loadFile = (path, type = 'blob', progress = () => {}) => {
    // return promise
    return new Promise((resolve, reject) => {
        // create new request
        const xhr = new XMLHttpRequest()
        // open request
        xhr.open('GET', path)
        // response type
        xhr.responseType = type
        // on complete
        xhr.addEventListener('load', e => {
            // resolve response
            resolve(e.currentTarget.response)
        })
        // on progress
        xhr.addEventListener('progress', e => {
            // callback progress
            progress({ loaded : e.loaded, total : e.total })
        })
        // on error
        xhr.addEventListener('error', reject)
        // send request
        xhr.send()
    })
}