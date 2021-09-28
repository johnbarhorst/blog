---
title: 'Building an Animated Dial'
---
After talking to my brother about some web site ideas he has involving a rotatable dial, I set off to try and build such a thing.

First step seemed obvious, create a quick circle with border radius of 50% on a div.

For animations, I've been using Framer Motion quite a bit lately. It seemed like a good place to start looking for ideas on how to implement the rest of the functionality.

After just a little digging, I found the documentation for their onPan function. https://www.framer.com/docs/gestures/###onpan
Seems like something I could use!

When an onPan callback function is set to a motion element, it gives us the following information whenever a pan gesture is rocognised on that element:

point: Relative to the device or page.
delta: Distance moved since the last event.
offset: Offset from the original pan event.
velocity: Current velocity of the pointer.

This all seems like useful data. But one thing I couldn't find was a way to know just 'how' a pan gesture is moving. Up, down, around in a circle? This sort of thing sounds like math, and definitely not something I was familiar with. After a bit of searching for how to determine clockwise/counterclockwise movement, and even a video showing it in Unity, I found this post on stack overflow. 

https://stackoverflow.com/questions/49147241/how-to-detect-if-mouse-is-moving-in-clockwise-direction

// cx,cy center of rotation
// ox,oy old position of mouse
// mx,my new position of mouse.
function getAngle(cx, cy, ox, oy, mx, my){
    var x1 = ox - cx;
    var y1 = oy - cy;
    var x2 = mx - cx;
    var y2 = my - cy;
    var d1 = Math.sqrt(x1 * x1 + y1 * y1);
    var d2 = Math.sqrt(x2 * x2 + y2 * y2);

    return Math.asin((x1 / d1) * (y2 / d2) - (y1 / d1) * (x2 / d2));
}

This function returns a positive or negative float that shows how far the mouse has moved since the old mouse position. Positive indicates clockwise motion, negative indicates counterclockwise. Some of the data we need to plug into that function, is already given to us throught the onPan callback. But we still need a bit more info.

In order to use this, we also need to know the center point coordinates on the screen of the element we want to use as a dial.

To get that data, we can apply a ref to the dial element, 
  const dialRef = useRef<HTMLDivElement>(null);

and then, get the element dimensions as well as its position on the screen, divided by two.

function getElementCenter(top: number, left: number, width: number, height: number) {
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  return {
    centerX,
    centerY
  };
}

We already have the current mouse position from the onPan callback function. The last piece we need is where the mouse WAS last time. We could store each mouse event in a useState, and then compare/update that each time the onPan function fires. Luckily though, onPan sort of does this for us already with info.delta.

The info.point gives us the current mouse position, and by subracting the delta from the current, we can get where the mouse last was.

Now we have all the mouse information we need to feed into the getAngle function,

    const { centerX, centerY } = getElementCenter({ offsetTop, offsetLeft, clientWidth, clientHeight });
    const oldX = info.point.x - info.delta.x;
    const oldY = info.point.y - info.delta.y;
    const mouseX = info.point.x;
    const mouseY = info.point.y;

    const angle = getAngle({ centerX, centerY, oldX, oldY, mouseX, mouseY });

By utilizing the getAngle function, we now have a positive or negative float that shows how far and in what direction the mouse has moved, relative to the center of our element. Negative values indicate counterclockwise, while positive indicate a clockwise pan motion.

We can further simplify the value into a 1, 0 or a -1 using Math.sign();

const direction = Math.sign(angle);

if(direction === 0) return;

if(angle > 1) {
  setValue(prev => prev + 1);
}

if(angle < 1) {
  setValue(prev = prev -1);
}

With all of this, it's finally functional! However, it triggers really quickly. In order to adjust the rate of the function firing off, we're gonna have to do a little more work.

To slow down or speed up the rate at which the rotation increases my state, I had to set up some cumulative state. The getAngle function returns a positive or negative float, and by accumulating that number in state, and checking it against a threshold, I was able to create a buffer of sorts. Once the drag event had moved far enough, I would then trigger an implement or decrement to the display state.

One thing that could trip that up would be the user changing directions. So I stored last direction in state, and when direction changed, I would reset the buffer and start over. In order to keep the buffer fairly simple, I applied Math.abs() to the angle value, which converts any negative values to positive.

With these controls, we can use any clockwise or counter clockwise pan event to trigger any corresponding state changes we want. There are still few things to do though. First of all, this is not accessible to anyone only using a keyboard. We can fix that with some hidden but tab-able buttons that also change state the same way.

Another thing is there's no actual animation going on yet.
