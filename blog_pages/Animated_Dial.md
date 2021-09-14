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