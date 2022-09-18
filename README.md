# gravity.js - 2D Game Development Library

Gravity provides the environment for handling object movements, collisions and their textures easily to develop 2D gaming experiences. By creating a Scene and adding some objects into it can startup using gravity.js within ten seconds.

## Installation

You can download the minified version of gravity.js using [this link](./dist/gravity.min.js) and attach into your web application.

```HTML
<script src="path/to/file/gravity.min.js"></script>
```

## Creating Scene

You have to create a scene using `Gravity.Scene` to add all the physical objects later. Default size of the scene will be 400x300 but you can use `.set()` method to resize it anytime. For many situations, event for objects, we use `.set()` method to update any kind of property that object holds.

```JavaScript
// create a scene with default settings
const scene = new Gravity.Scene()

// create a scene with specified settings
const scene = new Gravity.Scene({ size : { x : 1200, y : 3000 } })
```

As I mentioned,  you can change the scene size later, using `.set()` method. Event other properties such as gravity and resistance. Also you can update several settings once. All of options value for `Gravity.Scene` will be explined later.

```JavaScript
// resize scene
scene.set({ size : { x : 1000, y : 1000 } })

// set new gravity value
scene.set({ gravity : 0.98 })

// update multiple settings together
scene.set({
    size : { x : 1000, y : 1000 },
    gravity : 0.98
})
```

If you need to update a single setting, you can use the two parameter mode.

```JavaScript
// set new gravity value
scene.set('gravity', 0.98)
```

To display the scene in the web page, append the scene element into your web page body.

```JavaScript
// append scene element to body
document.body.appendChild(scene.element)
```

## Adding Objects

You can create an object for the scene using `Gravity.Object`. After doing all the initial setup, you can add it into scene using `.add()` method of `Gravity.Scene`

```JavaScript
// create new object
const obj_1 = new Gravity.Object({
    size : { x : 100, y : 100 }
})
```

You may have to add a simple texture to the object to make it visible. Use `Gravity.Texture` for that. Textures will be exmplined later in details.

```JavaScript
// create object
const obj_1 = new Gravity.Object()
// create texture
const tex_1 = new Gravity.Texture({ color : 'red' })
// add texture to the object
obj_1.set('texture', tex_1)
```

Now you can add the object into your scene.

```JavaScript
// add object to scene
scene.add(obj_1)
```

## Start Rendering

A rendering loop should be there to make this scene active. You can use `requestAnimationFrame()` to loop the rendering and call `.render()` method of `Gravity.Scene` inside it.

```JavaScript
// function to render
const renderFrame = () => {
    // request next frame
    requestAnimationFrame(renderFrame)
    // render scene
    scene.render()
}

// start render
renderFrame()
```

Now you should able to see the object is falling down due to gravity and get disappeared within few seconds. 

Let's look at all the properties and method that you can use in gravity.js

## Scene - `Gravity.Scene()`

Scene is the root of all the objects.

### Options

```JavaScript
new Gravity.Scene({
    resistance : 0.01            // system resistance
    gravity : 10,                // system gravity
    size : { x : 400, y : 300 }, // size of scene
    position : { x : 0, y : 0 }, // position of view
    color : 'transparent',       // background color
    paused : false,              // pause state of scene (read only)
    objects : []                 // all objects in scene (read only),
    element : gravity            // element of the scene (read only)
})
```

### Methods

| Method            | Description                | Input Parameters                |
|-------------------|----------------------------|---------------------------------|
| `.set()`          | update / change properties | `(object)` or `(string, value)` |
| `.add()`          | add object to scene        | `(Gravity.Object)`              |
| `.remove()`       | remove object from scene   | `(Gravity.Object)`              |
| `.render()`       | render next frame          | -                               |
| `.pause()`        | pause scene rendering      | -                               |
| `.play()`         | resume scene rendering     | -                               |

## Object - `Gravity.Object()`

Object can be a physical or non physical child inside a scene.

### Options

```JavaScript
new Gravity.Object({
    element : obj                     // element of the object (read only)
    active : true,                    // should move collide with objects
    friction : 0.05,                  // friction factor
    elasticity : 0.2,                 // elasticity
    velocity : { x : 0, y : 0 },      // current velocity
    fixed : { x : false, y : false }, // axes wise fixed modes
    weight : 50,                      // weight of object
    collide : [],                     // currently collided objects (read only)
    visible : true,                   // visible state
    index : 0,                        // rendering index
    position : { x : 0, y : 0 },      // position inside scene
    size : { x : 50, y : 50 },        // width and height of object
    texture : null,                   // texture of object (null = no texture)
    outline : false,                  // outline color (null = hidden)
    tags : [],                        // object identification values
    events : [],                      // events on object (read only)
    text : '',                        // inner text / html content
    style : null                      // class name for external styles
})
```

`active` property is the active state of physical movements. If you need any object to be in the scene, without any movement, and without any collsion with other objects, `active` property should be `false`.

`fixed` state for each axis represents whether object should be move in that direction or not. But if you have specified any `velocity` in that direction, object will be move with conatant velocity.

`collide` is an array of currently collided objects. These object can be active object or inactive but array collects all of them. Using `tags` property, you can identify which objects have collided and to some changes in gameplay.

### Methods

| Method            | Description                | Input Parameters                |
|-------------------|----------------------------|---------------------------------|
| `.set()`          | update / change properties | `(object)` or `(string, value)` |
| `.addEvent()`     | add events to object       | `(type, callback)`              |
| `.clone()`        | clone object               | -                               |

### Add Events on Objects

Objects can have event that can trigger in some situations such as object collision, click and more. Loo at the following event types specified for objects.

| Event Type              | Description                | Callback Output                    |
|-------------------------|----------------------------|------------------------------------|
| `collidestart`          | object starts to collide   | `{ type, object, timeStamp }`      |
| `collide`               | object still colliding     | `{ type, object, timeStamp }`      |
| `collideend`            | object ends colliding      | `{ type, timeStamp }`              |
| `floatstart`            | object starts to float     | `{ type, timeStamp }`              |
| `float`                 | object still floating      | `{ type, timeStamp }`              |
| `floatend`              | object ends floating       | `{ type, timeStamp }`              |
| `click`                 | click on object            | `{ type, timeStamp, nativeEvent }` |
| `mousedown`             | mousedown on object        | `{ type, timeStamp, nativeEvent }` |
| `mouseup`               | mouseup on object          | `{ type, timeStamp, nativeEvent }` |
| `mousemove`             | mousemove on object        | `{ type, timeStamp, nativeEvent }` |
| `mouseenter`            | mouseenter to object       | `{ type, timeStamp, nativeEvent }` |
| `mouseout`              | mouseout from object       | `{ type, timeStamp, nativeEvent }` |

Look at the following example that detect when one object collide on other specfied object.

```JavaScript
// create object 1
const obj_1 = new Gravity.Object()

// create object 2 with tags
const obj_2 = new Gravity.Object({ tags : ['abc'] })

// when collide on object 1
obj_1.addEvent('collidestart', e => {
    // check collided object
    if(e.object.tags.includes('abc')) {
        // collided object is object 2
    }
})
```

## Texture - `Gravity.Texture()`

Texture can holds an object color, image or current animation.

### Options

```JavaScript
new Gravity.Texture({
    color : null,                              // color code or name (null = transparent)
    image : null,                              // image url (null = no image)
    opacity : 1,                               // opacity of texture
    size : { x : 'auto', y : 'auto' },         // size of texture image
    position : { x : 'center', y : 'center' }, // position of texture image
    repeat : { x : true, y : true },           // repetition for each direction
    flip : { x : false, y : false },           // mirror state for each direction
    animation : null,                          // current animation (Gravity.Animation)
    duration : 1,                              // duration of animation in seconds
    delay : 0,                                 // delay of animation in seconds
    reverse : false,                           // reverse mode of animation
    paused : false,                            // paused state of animation
    loop : true                                // loop the animation
})
```

Texture can be added to an object after creating it with specific color image or animation. You can use color codes, rgba or rgb rules or color name for `color` property. `image` should be an image url or data url. `animation` should be created using `Gravity.Animation`.

```JavaScript
// create texture 1
const tex_1 = new Gravity.Texture({ color : '#FF11E6' })

// create texture 2
const tex_2 = new Gravity.Texture({ color : '#FF00FF' })

// create object with texture 1
const obj = new Gravity.Object({ texture : tex_1 })

// change object texture to texture 2
obj.set('texture', tex_2)
```

### Methods

| Method            | Description                | Input Parameters                |
|-------------------|----------------------------|---------------------------------|
| `.set()`          | update / change properties | `(object)` or `(string, value)` |
| `.clone()`        | clone object               | -                               |

## Animation - `Gravity.Animation()`

Animation holds array of images or array of colors as frames of an animation.

### Options

```JavaScript
new Gravity.Animation({
    colors : [], // array of image urls to animate
    images : []  // array of colors to animate
})
```

You can create a simple animation with array of colors or images then use it in any texture.

```JavaScript
// animation of colors
const ani_1 = Gravity.Animation({
    colors : ['red', 'green', 'orange', 'blue']
})

// animation of images
const ani_2 = Gravity.Animation({
    images : [
        'path/to/frame_1.png',
        'path/to/frame_2.png',
        'path/to/frame_3.png',
        'path/to/frame_4.png'
    ]
})

// use texture 1 on object 1 with new texture
const obj_1 = new Gravity.Object({
    texture : new Gravity.Texture({ animation : ani_1 })
})

// use texture 2 on object 2 with new texture
const obj_2 = new Gravity.Object({
    texture : new Gravity.Texture({ animation : ani_2 })
})
```

### Methods

| Method            | Description                | Input Parameters                |
|-------------------|----------------------------|---------------------------------|
| `.set()`          | update / change properties | `(object)` or `(string, value)` |
| `.clone()`        | clone object               | -                               |

## InputMap - `Gravity.InputMap()`

Input map is used to monitor key inputs on your keyboard and use them in many situations such as character controls. Use `Gravity.InputMap()` methods inside render loop to capture them.

```JavaScript
// create input map
const imap = new Gravity.InputMap()

// check whether following keys pressed
if(imap.every('a', 'Shift')) {
    // both pressed
} else {
    // not both pressed
}
```

### Options

```JavaScript
new Gravity.InputMap({
    keys : [] // array of keys currently pressing
})
```

### Methods

| Method            | Description                    | Input Parameters                |
|-------------------|--------------------------------|---------------------------------|
| `.is()`           | single key pressed check       | (key)                           |
| `.not()`          | single key not pressed check   | (key)                           |
| `.every()`        | all keys pressed check         | (...keys)                       |
| `.some()`         | some of all keys pressed check | (...keys)                       |
| `.none()`         | none of all keys pressed check | (...keys)                       |

## Loader and Exporter

Preloading is important for game assets such as images and frame files. Using `Gravity.Loader` you can preload one file or mutiple files with progress callback.

Exporter can be used to export textures, animations or objects as files and use `Gravity.Loader` to load them later.

### Loader - `Gravity.Loader()`

```JavaScript
// create loader
const loader = new Gravity.Loader()

// load single file
loader.load('path/to/file.png').then(blobURL => {
    // use blob url
})
```

You can have an object type file collection. In this case, all the string values in the object will consider as file links and the will be replaced with blob urls.

```JavaScript
// files to load
const files = {
    background : 'assets/background.png',
    walk_animation : [
        'assets/animations/walk/frame_1.png',
        'assets/animations/walk/frame_2.png',
        'assets/animations/walk/frame_3.png'
    ]
}

// load all files
loader.load(files).then(() => {
    // use files
})
```

To get the progress status, you can provide a callback function as second parameter to `.load()` method.

```JavaScript
// progress callback fucntion
const progress = event => {
    // use event values
    event.loaded // total downloaded bytes
    event.total  // total bytes
    event.file   // current file url
    event.size   // size of current file
    event.index  // index of current file
    event.length // all files count to load
}

// load all files
loader.load(files, progress).then(() => {
    // use files
})
```