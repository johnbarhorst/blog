Created a round motion.div with border radius.


Found out about onPan function in framer docs https://www.framer.com/docs/gestures/###onpan

onPan gives us the following information: 

point: Relative to the device or page.
delta: Distance moved since the last event.
offset: Offset from the original pan event.
velocity: Current velocity of the pointer.


Realizing that determining if the mouse is moving clockwise or counter-clockwise is not simple math.


Found this post on stack overflow explaining how to check for clock/counterclock movement. https://stackoverflow.com/questions/49147241/how-to-detect-if-mouse-is-moving-in-clockwise-direction

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

This function returns a positive or negative float that shows how far the mouse has moved since the old mouse position. Positive indicates clockwise motion, negative indicates counterclockwise.

In order to use this, I would need to know the center point coordinates on the screen, of the element I want to have as a dial.

To do that, we apply a ref to the dial element, 
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

Once we have our elements center point, we need a way to get not only where the mouse is currently, but where it was before. Luckily, we can get that from the onPan event with a little math.

The info.point gives us the current mouse position, and by subracting the delta from the current, we can get where the mouse last was.

Now we have all the mouse information we need to feed into the getAngle function,

    const { centerX, centerY } = getElementCenter({ offsetTop, offsetLeft, clientWidth, clientHeight });
    const oldX = info.point.x - info.delta.x;
    const oldY = info.point.y - info.delta.y;
    const mouseX = info.point.x;
    const mouseY = info.point.y;

By utilizing the getAngle function, we now have a positive or negative float that shows how far and in what direction the mouse has moved, relative to the center of our element. We can easily use that information to trigger clockwise/counter-clockwise mouse drags to change.

    const angle = getAngle({ centerX, centerY, oldX, oldY, mouseX, mouseY });

With that we can use Math.sign(angle) to give


if(angle > 1) {
  setValue(prev => prev + 1);
}

if(angle < 1) {
  setValue(prev = prev -1);
}



Now that that is set up, I need to find a way to tweak how much distance must be traveled around in a direction in order to increment or decrement the values we want. 



To slow down or speed up the rate at which the rotation increases my state, I had to set up some cumulative state. The getAngle function returns a positive or negative float, and by accumulating that number in state, and checking it against a threshold, I was able to create a buffer of sorts. Once the drag event had moved far enough, I would then trigger an implement or decrement to the display state.

One thing that could trip that up would be the user changing directions. So I stored last direction in state, and when direction changed, I would purge the buffer and start over. In order to keep the buffer fairly simple, I applied Math.abs() to the angle float ()
