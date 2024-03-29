---
title: 'Building an Interactive Animated Dial'
description: 'My adventures in building an interactive and animated dial that a user can "spin" to change values.'
---
## Building An Interactive Animated Dial

### The Idea

My brother had an idea for a collaborative project. Part of that idea involved having a "spin-able" dial that a user could interact with to increase and decrease values. I liked the idea, and set off to create just such a thing.

### The Process

For animations, I've been using Framer Motion quite a bit lately. It seemed like a good place to start looking for ideas on how to implement the rest of the functionality.

After just a little digging, I found the [documentation](https://www.framer.com/docs/gestures/###onpan) for their onPan function.
Seems like something I could use!

When an onPan callback function is set to a motion element, it gives us the following information whenever a pan gesture is recognized on that element:

```none
point: Relative to the device or page.
delta: Distance moved since the last event.
offset: Offset from the original pan event.
velocity: Current velocity of the pointer.
```

This all seems like useful data. But one thing I couldn't find was a way to know just 'how' a pan gesture is moving. Up, down, around in a circle? This sort of thing sounds like math, and definitely not something I was familiar with. After a bit of searching for how to determine clockwise/counterclockwise movement, and even a video showing it in Unity, I found this post on [stack overflow](https://stackoverflow.com/questions/49147241/how-to-detect-if-mouse-is-moving-in-clockwise-direction).

```js
// cx,cy center of rotation
// ox,oy old position of mouse
// mx,my new position of mouse
function getAngle(cx, cy, ox, oy, mx, my){
    var x1 = ox - cx;
    var y1 = oy - cy;
    var x2 = mx - cx;
    var y2 = my - cy;
    var d1 = Math.sqrt(x1 * x1 + y1 * y1);
    var d2 = Math.sqrt(x2 * x2 + y2 * y2);

    return Math.asin((x1 / d1) * (y2 / d2) - (y1 / d1) * (x2 / d2));
}
```

This function returns a positive or negative float that shows how far the mouse has moved since the old mouse position. Positive indicates clockwise motion, negative indicates counterclockwise. Some of the data we need to plug into that function, is already given to us through the `onPan` callback. But we still need a bit more info.

In order to use this, we also need to know the center point coordinates on the screen of the element we want to use as a dial.

To get that data, we can apply a ref to the dial element

```ts
const dialRef = useRef<HTMLDivElement>(null);
```

and then, get the element dimensions as well as its position on the screen, divided by two.

```ts
function getElementCenter(top: number, left: number, width: number, height: number) {
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  return {
    centerX,
    centerY
  };
}
```

We already have the current mouse position from the onPan callback function. The last piece we need is where the mouse WAS last time. We could store each mouse event in a useState, and then compare/update that each time the onPan function fires. Luckily though, onPan sort of does this for us already with info.delta.

The info.point gives us the current mouse position, and by subtracting the delta from the current, we can get where the mouse last was.

Now we have all the mouse information we need to feed into the getAngle function,

```ts
const { centerX, centerY } = getElementCenter({ offsetTop, offsetLeft, clientWidth, clientHeight });
const oldX = info.point.x - info.delta.x;
const oldY = info.point.y - info.delta.y;
const mouseX = info.point.x;
const mouseY = info.point.y;

const angle = getAngle({ centerX, centerY, oldX, oldY, mouseX, mouseY });
```

Finding the center of an element seems like it could be a useful tool in other places. So I've abstracted it into it's own hook. You can read about that [here](Animated_Dial).

By utilizing the getAngle function, we now have a positive or negative float that shows how far and in what direction the mouse has moved, relative to the center of our element. Negative values indicate counterclockwise, while positive values indicate a clockwise pan motion.

We can further simplify the value into a 1, 0 or a -1 using `Math.sign();`.

```js
const direction = Math.sign(angle);

if(direction === 0) return;

if(angle > 1) {
  setValue(prev => prev + 1);
}

if(angle < 1) {
  setValue(prev = prev -1);
}
```

With all of this, it's finally functional! However, it triggers really quickly. In order to adjust the rate of the function firing off, we're gonna have to do a little more work.

To slow down or speed up the rate at which the rotation increases my state, I chose to set up some cumulative state. The getAngle function returns a positive or negative float, and by accumulating that number in state, and checking it against a threshold, I was able to create a buffer of sorts. Once the drag event had moved far enough, I would then trigger an implement or decrement to the display state.

Another potential path to victory might be using a de-bouncer or de-limiter function. I'm fairly certain that would be the more performant way to go about things. At the moment though, I'm not sure where I'd want to implement it, and performance for this site is hardly an issue. I'm making a personal time usage call here, but you may want to look further into it.

One thing that could trip up the cumulative state method is the user changing directions. So I'm storing the last direction in state, and when direction changes, I reset the buffer and start over. In order to keep the buffer fairly simple, I applied `Math.abs()` to the angle value, which converts any negative values to positive.

In order to have the dial be reusable, and affect the state of another component, we pass in handler functions as props. This way we can tie an external components state changes to how the dial has been turned, and set the sensitivity of the buffer.

So putting together this whole journey so far, here's what we've got:

```ts
  interface Props {
  sensitivity?: number,
  handleClockwise: () => void,
  handleCounterClockwise: () => void,
  children?: ReactNode 
}

interface GetAngleArgs {
  centerX: number,
  centerY: number,
  lastX: number,
  lastY: number,
  mouseX: number,
  mouseY: number
}

function getAngle({  centerX, centerY, lastX, lastY, mouseX, mouseY }: GetAngleArgs){
  const x1 = lastX - centerX;
  const y1 = lastY - centerY;
  const x2 = mouseX - centerX;
  const y2 = mouseY - centerY;
  const d1 = Math.sqrt(x1 * x1 + y1 * y1);
  const d2 = Math.sqrt(x2 * x2 + y2 * y2);

  return Math.asin((x1 / d1) * (y2 / d2) - (y1 / d1) * (x2 / d2));
}


export function AnimatedDial({
  // roughly 6.6 sensitivity would be one full rotation to increase by 1
  sensitivity= .75,
  handleClockwise,
  handleCounterClockwise,
  children
}: Props):ReactElement {
  const [cumulativeDistance, setCumulativeDistance] = useState(0);
  const [lastDirection, setLastDirection] = useState(0);
  const [centerX, centerY, centerRef] = useElementCenter<HTMLDivElement>();
  // const dialRef = useRef<HTMLDivElement>(null);


  function onPan(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo):void {
    const lastX = info.point.x - info.delta.x;
    const lastY = info.point.y - info.delta.y;
    const mouseX = info.point.x;
    const mouseY = info.point.y;
    
    const angle = getAngle({ centerX, centerY, lastX, lastY, mouseX, mouseY });
    // 1 = clockwise, -1 = counter clockwise, 0 = no movement (but mouse is still down and event is firing)
    const direction = Math.sign(angle);

    // I think there's a better way to handle this bit. Perhaps a switch/case action solution.
    if(direction === 0) return;

    if(direction !== lastDirection) {
      setCumulativeDistance(0);
      return setLastDirection(direction);
    }

    if(cumulativeDistance > sensitivity) {
      setCumulativeDistance(0);
      return direction > 0 ? handleClockwise() : handleCounterClockwise();
    }

    setCumulativeDistance(prev => prev + Math.abs(angle));
  }


  return (
    <div
    >
      {children}
    </div>
  );
}
  ```

With these controls, we can use any clockwise or counter clockwise pan event to trigger any corresponding state changes we want. There are still few things to do though. First of all, this is not accessible to anyone only using a keyboard. We can fix that with some hidden but tab-able buttons that also change state the same way, or we could avoid the dial all together for a keyboard only use case. Depends on what works best for your app.
