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
        // position of view
        this.position = { x : 0, y : 0 }
        // size of scene
        this.size = { x : 400, y : 300 }
        // system resistance
        this.resistance = 0.01
        // system gravity
        this.gravity = 10
        // set options
        this.set(options || {})
    }
    // method to set options
    set(options) {
        // return if null or non object input
        if(options === null || typeof options !== 'object') { return }
        // update position if given
        if('position' in options) { this.position = options.position }
        // update size if given
        if('size' in options) { this.size = options.size }
        // update resistance if given
        if('resistance' in options) { this.resistance = options.resistance }
        // update gravity if given
        if('gravity' in options) { this.gravity = options.gravity }
        // update element width
        this.element.style.width = this.size.x + 'px'
        // update element height
        this.element.style.height = this.size.y + 'px'
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