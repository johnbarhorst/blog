Created a round motion.div with border radius.


Found out about onPan function in framer docs https://www.framer.com/docs/gestures/###onpan


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

In order to use this, I would need to know the center point coordinates on the screen, of the element I want to have as a dial.

To do that, we apply a ref to the dial element, 
  const dialRef = useRef<HTMLDivElement>(null);

and then, get the dimensions as well as position on the screen, divided by two.

function getElementCenter(top: number, left: number, width: number, height: number) {
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  return {
    centerX,
    centerY
  };
}

Using onPan from Framer Motion, I'm able to get the current mouse position when the drag starts. I thought that using that, and subracting the offset from last position (the event is debounced or buffered to a few times a second) I could determine the current direction things are going.

While it does mostly work at determining clockwise or counter clockwise, one bug is that to switch directions, the mouse pointer has to travel backwards passed the original mousedown/drag event location.
There also seems to be some issue with going around too fast and/or out of bounds.

I think I'll have to use better values. Perhaps taking values from the current ref? or native mouse location rather than points from the onPan hook.