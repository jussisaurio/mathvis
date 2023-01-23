import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

// Create a canvas that has a grid of 100x100px squares representing a 2D mathematical plane

// x = 1 in the mathematical plane is 400px in the canvas
const PIXELS_PER_UNIT = 400;

const canvas = document.createElement("canvas");
canvas.width = PIXELS_PER_UNIT * 2;
canvas.height = PIXELS_PER_UNIT * 2;
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.border = "1px solid black";
app.appendChild(canvas);

// Create a grid of 100x100px squares

const ctx = canvas.getContext("2d")!;

function drawBase() {
  // undo the stroke dash if there is one
  ctx.setLineDash([]);
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.strokeStyle = "lightgray";
  ctx.lineWidth = 1;
  for (let x = 0; x < PIXELS_PER_UNIT * 2; x += PIXELS_PER_UNIT / 4) {
    for (let y = 0; y < PIXELS_PER_UNIT * 2; y += PIXELS_PER_UNIT / 4) {
      ctx.strokeRect(x, y, PIXELS_PER_UNIT / 4, PIXELS_PER_UNIT / 4);
    }
  }

  // Draw a unit circle

  ctx.beginPath();
  ctx.arc(PIXELS_PER_UNIT, PIXELS_PER_UNIT, PIXELS_PER_UNIT, 0, 2 * Math.PI);
  ctx.strokeStyle = "black";
  ctx.stroke();

  // Draw the axes with black

  ctx.beginPath();
  ctx.moveTo(0, PIXELS_PER_UNIT);
  ctx.lineTo(PIXELS_PER_UNIT * 2, PIXELS_PER_UNIT);
  ctx.moveTo(PIXELS_PER_UNIT, 0);
  ctx.lineTo(PIXELS_PER_UNIT, PIXELS_PER_UNIT * 2);
  ctx.strokeStyle = "black";
  ctx.stroke();

  // Draw arrows (1,0), (0,1), (-1,0), (0,-1) with black

  ctx.beginPath();
  ctx.moveTo(PIXELS_PER_UNIT + PIXELS_PER_UNIT, PIXELS_PER_UNIT);
  ctx.lineTo(PIXELS_PER_UNIT + PIXELS_PER_UNIT - 10, PIXELS_PER_UNIT - 5);
  ctx.lineTo(PIXELS_PER_UNIT + PIXELS_PER_UNIT - 10, PIXELS_PER_UNIT + 5);
  ctx.lineTo(PIXELS_PER_UNIT + PIXELS_PER_UNIT, PIXELS_PER_UNIT);
  ctx.moveTo(PIXELS_PER_UNIT, PIXELS_PER_UNIT + PIXELS_PER_UNIT);
  ctx.lineTo(PIXELS_PER_UNIT - 5, PIXELS_PER_UNIT + PIXELS_PER_UNIT - 10);
  ctx.lineTo(PIXELS_PER_UNIT + 5, PIXELS_PER_UNIT + PIXELS_PER_UNIT - 10);
  ctx.lineTo(PIXELS_PER_UNIT, PIXELS_PER_UNIT + PIXELS_PER_UNIT);
  ctx.moveTo(PIXELS_PER_UNIT - PIXELS_PER_UNIT, PIXELS_PER_UNIT);
  ctx.lineTo(PIXELS_PER_UNIT - PIXELS_PER_UNIT + 10, PIXELS_PER_UNIT - 5);
  ctx.lineTo(PIXELS_PER_UNIT - PIXELS_PER_UNIT + 10, PIXELS_PER_UNIT + 5);
  ctx.lineTo(PIXELS_PER_UNIT - PIXELS_PER_UNIT, PIXELS_PER_UNIT);
  ctx.moveTo(PIXELS_PER_UNIT, PIXELS_PER_UNIT - PIXELS_PER_UNIT);
  ctx.lineTo(PIXELS_PER_UNIT - 5, PIXELS_PER_UNIT - PIXELS_PER_UNIT + 10);
  ctx.lineTo(PIXELS_PER_UNIT + 5, PIXELS_PER_UNIT - PIXELS_PER_UNIT + 10);
  ctx.lineTo(PIXELS_PER_UNIT, PIXELS_PER_UNIT - PIXELS_PER_UNIT);
  ctx.strokeStyle = "black";
  ctx.stroke();

  // Write the coordinates of the arrows with black text

  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(
    "(1,0)",
    PIXELS_PER_UNIT + PIXELS_PER_UNIT - 30,
    PIXELS_PER_UNIT + 20
  );
  ctx.fillText(
    "(0,-1)",
    PIXELS_PER_UNIT + 30,
    PIXELS_PER_UNIT + PIXELS_PER_UNIT - 30
  );
  ctx.fillText(
    "(-1,0)",
    PIXELS_PER_UNIT - PIXELS_PER_UNIT + 30,
    PIXELS_PER_UNIT + 20
  );
  ctx.fillText(
    "(0,1)",
    PIXELS_PER_UNIT + 30,
    PIXELS_PER_UNIT - PIXELS_PER_UNIT + 30
  );
}

drawBase();

// Get the mouse coordinates and draw a line from the origin to the unit circle so that the line goes through the mouse coordinates

function drawLine(x: number, y: number) {
  ctx.beginPath();
  ctx.moveTo(PIXELS_PER_UNIT, PIXELS_PER_UNIT);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "red";
  ctx.stroke();
}

// Draw a line from the origin to the unit circle so that the line goes through the mouse coordinates

function drawLineFromMouse(e: MouseEvent) {
  const mouseX = e.clientX - canvas.offsetLeft;
  const mouseY = e.clientY - canvas.offsetTop;

  // Find the coordinates of the point on the circle that goes from the origin through the mouse coordinates to the circle

  const x =
    PIXELS_PER_UNIT +
    (PIXELS_PER_UNIT * (mouseX - PIXELS_PER_UNIT)) /
      Math.sqrt(
        (mouseX - PIXELS_PER_UNIT) ** 2 + (mouseY - PIXELS_PER_UNIT) ** 2
      );
  const y =
    PIXELS_PER_UNIT +
    (PIXELS_PER_UNIT * (mouseY - PIXELS_PER_UNIT)) /
      Math.sqrt(
        (mouseX - PIXELS_PER_UNIT) ** 2 + (mouseY - PIXELS_PER_UNIT) ** 2
      );

  // Find the point 60% of the way from the origin to the point on the circle

  const xThreeQuarters =
    PIXELS_PER_UNIT +
    ((x - PIXELS_PER_UNIT) * 3) / 4 +
    ((mouseX - PIXELS_PER_UNIT) * 1) / 4;
  const yThreeQuarters =
    PIXELS_PER_UNIT +
    ((y - PIXELS_PER_UNIT) * 3) / 4 +
    ((mouseY - PIXELS_PER_UNIT) * 1) / 4;

  // calculate the cosine and sine. the hypotenuse is 1, so the cosine and sine are the x and y coordinates of the point on the circle

  const cos = (x - PIXELS_PER_UNIT) / PIXELS_PER_UNIT;
  const sin = (-1 * (y - PIXELS_PER_UNIT)) / PIXELS_PER_UNIT;
  const angleRadiansStartingFromX1Y0 =
    Math.atan2(sin, cos) < 0
      ? Math.PI * 2 + Math.atan2(sin, cos)
      : Math.atan2(sin, cos);
  const angleDegrees = (angleRadiansStartingFromX1Y0 * 180) / Math.PI;

  // clear the canvas and draw the base again

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBase();

  // draw the line from the origin to the point on the circle
  drawLine(x, y);

  // draw a vertical dotted line from the circle coordinates to the x-axis

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, PIXELS_PER_UNIT);

  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = "red";
  ctx.stroke();

  // Write the sine value with red text next to the vertical dotted line

  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(
    `sin: ${sin.toFixed(2)}`,
    x + 10,
    // in the middle of the line
    y + (PIXELS_PER_UNIT - y) / 2
  );

  // Draw the cosine as a red dotted line i.e. a line that goes from the origin to the (x, 0)

  // First erase the part of the x-axis from (0,0) to (x,0)

  ctx.clearRect(
    x <= PIXELS_PER_UNIT ? x : PIXELS_PER_UNIT,
    PIXELS_PER_UNIT,
    Math.abs(x - PIXELS_PER_UNIT),
    2
  );

  ctx.beginPath();
  ctx.moveTo(PIXELS_PER_UNIT, PIXELS_PER_UNIT);
  ctx.lineTo(x, PIXELS_PER_UNIT);

  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = "red";
  ctx.stroke();

  // Write cos similarly above the x axis

  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(
    `cos: ${cos.toFixed(2)}`,
    // in the middle of the line
    x + (PIXELS_PER_UNIT - x) / 2,
    PIXELS_PER_UNIT - 10
  );

  // Draw a tangent line that touches the (x,y) coordinates (i.e. is parallel to the red line)

  const deltaX = x - PIXELS_PER_UNIT;
  const deltaY = y - PIXELS_PER_UNIT;

  // from deltaX and deltaY we can calculate the slope of the tangent line

  const slopeOfRedLine = deltaY / deltaX;
  const slopeOfParallelLine = -1 / slopeOfRedLine;

  // draw a line from (x,y) in the direction of the slopeOfParallelLine

  const x1 = x;
  const y1 = y;

  // y2 should always be 0 (i.e. the line should touch the x axis) so it is always PIXELS_PER_UNIT
  const y2 = PIXELS_PER_UNIT;

  // x2 is whatever it takes to go from x until y2 is 0
  // slopeOfParallelLine * (x2 - x) = y2 - y
  // slopeOfParallelLine * x2 - slopeOfParallelLine * x = y2 - y
  // since y2 is always PIXELS_PER_UNIT, we can write
  // slopeOfParallelLine * x2 - slopeOfParallelLine * x = PIXELS_PER_UNIT - y
  // x2 = (PIXELS_PER_UNIT - y + slopeOfParallelLine * x) / slopeOfParallelLine

  const x2 =
    (PIXELS_PER_UNIT - y + slopeOfParallelLine * x) / slopeOfParallelLine;

  const x2Opposite = x - (x2 - x);
  const y2Opposite = y - (y2 - y);

  // draw the tangent line

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2Opposite, y2Opposite);
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = "red";
  ctx.stroke();

  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(
    `tan: ${(sin / cos).toFixed(2)}`,
    xThreeQuarters,
    yThreeQuarters
  );

  // draw the angle as a red arc

  ctx.beginPath();
  ctx.arc(
    PIXELS_PER_UNIT,
    PIXELS_PER_UNIT,
    PIXELS_PER_UNIT / 8,
    Math.PI * 2 - angleRadiansStartingFromX1Y0,
    0,
    false
  );
  ctx.setLineDash([]);
  ctx.strokeStyle = "red";
  ctx.stroke();

  // Write the angle with red text next to the arc

  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(
    angleDegrees.toFixed(2) + "°",
    PIXELS_PER_UNIT + PIXELS_PER_UNIT / 8 + 10,
    PIXELS_PER_UNIT - PIXELS_PER_UNIT / 8 + 10
  );
}

app.addEventListener("mousemove", drawLineFromMouse);
