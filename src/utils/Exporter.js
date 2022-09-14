// exporter class
Gravity.Exporter = class {
    // constructor
    constructor() {
        // method to export object
        this.exportObject = async(input, file = null) => {
            // return invalid input
            if(input.type !== 'Object') { return null }
            // clone object
            const obj = Object.assign({}, input)
            // remove collide
            delete obj.collide
            // remove element
            delete obj.element
            // remove events
            delete obj.events
            // download if file name is given
            if(file) { _Gravity_.downloadFile(JSON.stringify(obj), file, 'asset') }
            // return object
            return obj
        }
        // method to export texture
        this.exportTexture = async(input, file = null) => {
            // return invalid input
            if(input.type !== 'Texture') { return null }
            // clone object
            const obj = Object.assign({}, input)
            // remove element
            delete obj.element
            // remove id
            delete obj.id
            // if image available
            if(obj.image) {
                // load image data url
                obj.image = await _Gravity_.getDataURL(obj.image)
            }
            // download if file name is given
            if(file) { _Gravity_.downloadFile(JSON.stringify(obj), file, 'asset') }
            // return object
            return obj
        }
        // method to export animation
        this.exportAnimation = async(input, file = null) => {
            // return invalid input
            if(input.type !== 'Animation') { return null }
            // clone object
            const obj = Object.assign({}, input)
            // remove element
            delete obj.element
            // remove id
            delete obj.id
            // for each image
            for(let i = 0; i < obj.images.length; i++) {
                // load current image data url
                obj.images[i] = await _Gravity_.getDataURL(obj.images[i])
            }
            // download if file name is given
            if(file) { _Gravity_.downloadFile(JSON.stringify(obj), file, 'asset') }
            // return object
            return obj
        }
        // method to export files
        this.exportFiles = async(input, file = null) => {
            // clone input
            const obj = { type : 'Files', data : Object.assign({}, input) }
            // recursive method to load
            const rec = async obj => {
                // only if an object
                if(typeof obj === 'object' && obj !== null) {
                    // get keys
                    const keys = Object.keys(obj)
                    // for each key
                    for(let i = 0; i < keys.length; i++) {
                        // current key
                        const key = keys[i]
                        if(typeof obj[key] === 'string') {
                            obj[key] = await _Gravity_.getDataURL(obj[key])
                        } else {
                            await rec(obj[key])
                        }
                    }
                }
            }
            // start load
            await rec(obj.data)
            // download if file name is given
            if(file) { _Gravity_.downloadFile(JSON.stringify(obj), file, 'asset') }
            // return output
            return obj
        }
        // method to export in deep mode
        this.exportAll = async(input, file = null) => {
            // output object
            let obj = null
            // check input type
            if(input.type === 'Object') {
                // export object
                obj = await this.exportObject(input)
                // if texture available
                if(input.texture) {
                    // export texture
                    obj.texture = await this.exportTexture(input.texture)
                    // if animation available
                    if(input.texture.animation) {
                        // export animation
                        obj.texture.animation = await this.exportAnimation(input.texture.animation)
                    }
                }
            } else if(input.type === 'Texture') {
                // export texture
                obj = await this.exportTexture(input)
                // if animation available
                if(input.animation) {
                    // export animation
                    obj.animation = await this.exportAnimation(input.animation)
                }
            } else if(input.type === 'Animation') {
                // export animation
                obj = await this.exportAnimation(input)
            }
            // download if file name is given
            if(file) { _Gravity_.downloadFile(JSON.stringify(obj), file, 'asset') }
            // return object
            return obj
        }
    }
}

// helper to get file data url
_Gravity_.getDataURL = path => {
    // return promise
    return new Promise(resolve => {
        // fetch file as blob
        fetch(path).then(resp => resp.blob()).then(blob => {
            // create file reader
            const reader = new FileReader()
            // on file read
            reader.addEventListener('load', e => {
                // resolve data url
                resolve(e.currentTarget.result)
            })
            // read as data url
            reader.readAsDataURL(blob)
        })
    })
}

// helper to download a text file
_Gravity_.downloadFile = (text, name = 'file.txt', ext = '.txt') => {
    // create element
    const link = document.createElement('a')
    // set text content
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    // set file name
    link.download = name.split('.').pop().toLowerCase() == ext
        // extension in name
        ? name
        // extension not in name
        : name + '.' + ext
    // append element to body
    document.body.appendChild(link)
    // click to trigger download
    link.click()
    // remove element after delay
    setTimeout(() => link.remove(), 500)
}