import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

// Create a canvas that has a grid of 100x100px squares representing a 2D mathematical plane

// if x increases by 1, then the x coordinate increases by 400px
const PX_PER_GRID_UNIT = 400;
const CANVAS_OFFSETS = { x: 0, y: 0 };
const ORIGIN = { x: PX_PER_GRID_UNIT, y: PX_PER_GRID_UNIT };

const canvas = document.createElement("canvas");
canvas.width = PX_PER_GRID_UNIT * 2;
canvas.height = PX_PER_GRID_UNIT * 2;
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.border = "1px solid black";
app.appendChild(canvas);

// Create a grid of 100x100px squares

const ctx = canvas.getContext("2d")!;

function gridMoveTo(x: number, y: number) {
  ctx.moveTo(
    CANVAS_OFFSETS.x + ORIGIN.x + x * PX_PER_GRID_UNIT,
    CANVAS_OFFSETS.y + ORIGIN.y - y * PX_PER_GRID_UNIT
  );
}

function gridLineTo(x: number, y: number) {
  ctx.lineTo(
    CANVAS_OFFSETS.x + ORIGIN.x + x * PX_PER_GRID_UNIT,
    CANVAS_OFFSETS.y + ORIGIN.y - y * PX_PER_GRID_UNIT
  );
}

function gridDrawLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  strokeStyle: string = "black",
  lineWidth: number = 1,
  lineDash: number[] = []
) {
  ctx.beginPath();
  gridMoveTo(x1, y1);
  gridLineTo(x2, y2);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.setLineDash(lineDash);
  ctx.stroke();
}

function gridWriteText(
  text: string,
  x: number,
  y: number,
  xOffset: number = 0,
  yOffset: number = 0,
  font: string = "20px Arial",
  fillStyle: string = "black"
) {
  ctx.beginPath();
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.strokeText(
    text,
    ORIGIN.x + x * PX_PER_GRID_UNIT + xOffset,
    ORIGIN.y - y * PX_PER_GRID_UNIT + yOffset
  );
}

type RectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  lineDash?: number[];
};

function gridDrawRect(props: RectProps) {
  const { x, y, width, height, fillStyle, strokeStyle, lineWidth, lineDash } =
    props;

  ctx.beginPath();
  ctx.fillStyle = fillStyle || "transparent";
  ctx.strokeStyle = strokeStyle || "black";
  ctx.lineWidth = lineWidth || 1;
  ctx.setLineDash(lineDash || []);

  ctx.strokeRect(
    CANVAS_OFFSETS.x + ORIGIN.x + x * PX_PER_GRID_UNIT,
    CANVAS_OFFSETS.y + ORIGIN.y - y * PX_PER_GRID_UNIT,
    width * PX_PER_GRID_UNIT,
    height * PX_PER_GRID_UNIT
  );
  ctx.fillRect(
    CANVAS_OFFSETS.x + ORIGIN.x + x * PX_PER_GRID_UNIT,
    CANVAS_OFFSETS.y + ORIGIN.y - y * PX_PER_GRID_UNIT,
    width * PX_PER_GRID_UNIT,
    height * PX_PER_GRID_UNIT
  );
}

function drawBase() {
  // undo the stroke dash if there is one
  ctx.setLineDash([]);
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.strokeStyle = "lightgray";
  ctx.lineWidth = 1;
  for (let x = -1; x <= 1; x += 0.25) {
    for (let y = -1; y <= 1; y += 0.25) {
      gridDrawRect({
        x,
        y,
        width: 0.25,
        height: 0.25,
        strokeStyle: "lightgray",
      });
    }
  }

  // Draw a unit circle

  ctx.beginPath();
  ctx.arc(ORIGIN.x, ORIGIN.y, PX_PER_GRID_UNIT, 0, 2 * Math.PI);
  ctx.strokeStyle = "black";
  ctx.stroke();

  // Draw the axes with black

  gridDrawLine(-1, 0, 1, 0);
  gridDrawLine(0, 1, 0, -1);

  // Draw arrows (1,0), (0,1), (-1,0), (0,-1) with black

  ctx.beginPath();
  ctx.moveTo(PX_PER_GRID_UNIT + PX_PER_GRID_UNIT, PX_PER_GRID_UNIT);
  ctx.lineTo(PX_PER_GRID_UNIT + PX_PER_GRID_UNIT - 10, PX_PER_GRID_UNIT - 5);
  ctx.lineTo(PX_PER_GRID_UNIT + PX_PER_GRID_UNIT - 10, PX_PER_GRID_UNIT + 5);
  ctx.lineTo(PX_PER_GRID_UNIT + PX_PER_GRID_UNIT, PX_PER_GRID_UNIT);
  ctx.moveTo(PX_PER_GRID_UNIT, PX_PER_GRID_UNIT + PX_PER_GRID_UNIT);
  ctx.lineTo(PX_PER_GRID_UNIT - 5, PX_PER_GRID_UNIT + PX_PER_GRID_UNIT - 10);
  ctx.lineTo(PX_PER_GRID_UNIT + 5, PX_PER_GRID_UNIT + PX_PER_GRID_UNIT - 10);
  ctx.lineTo(PX_PER_GRID_UNIT, PX_PER_GRID_UNIT + PX_PER_GRID_UNIT);
  ctx.moveTo(PX_PER_GRID_UNIT - PX_PER_GRID_UNIT, PX_PER_GRID_UNIT);
  ctx.lineTo(PX_PER_GRID_UNIT - PX_PER_GRID_UNIT + 10, PX_PER_GRID_UNIT - 5);
  ctx.lineTo(PX_PER_GRID_UNIT - PX_PER_GRID_UNIT + 10, PX_PER_GRID_UNIT + 5);
  ctx.lineTo(PX_PER_GRID_UNIT - PX_PER_GRID_UNIT, PX_PER_GRID_UNIT);
  ctx.moveTo(PX_PER_GRID_UNIT, PX_PER_GRID_UNIT - PX_PER_GRID_UNIT);
  ctx.lineTo(PX_PER_GRID_UNIT - 5, PX_PER_GRID_UNIT - PX_PER_GRID_UNIT + 10);
  ctx.lineTo(PX_PER_GRID_UNIT + 5, PX_PER_GRID_UNIT - PX_PER_GRID_UNIT + 10);
  ctx.lineTo(PX_PER_GRID_UNIT, PX_PER_GRID_UNIT - PX_PER_GRID_UNIT);
  ctx.strokeStyle = "black";
  ctx.stroke();

  // Write the coordinates of the arrows with black text

  gridWriteText("(1,0)", 1, 0, -30, 20);
  gridWriteText("(0,-1)", 0, -1, 30, -30);
  gridWriteText("(-1,0)", -1, 0, 30, 20);
  gridWriteText("(0,1)", 0, 1, 30, 30);
}

// Get the mouse coordinates and draw a line from the origin to the unit circle so that the line goes through the mouse coordinates

function drawLine(x: number, y: number, strokeStyle: string = "black") {
  ctx.beginPath();
  ctx.moveTo(ORIGIN.x, ORIGIN.y);
  ctx.lineTo(x, y);
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
}

function positionAsGridCoordinates(x: number, y: number) {
  return [
    (x - ORIGIN.x - CANVAS_OFFSETS.x) / PX_PER_GRID_UNIT,
    (y - ORIGIN.y - CANVAS_OFFSETS.y) / PX_PER_GRID_UNIT,
  ];
}

function gridCoordinatesAsPosition(x: number, y: number) {
  return [
    ORIGIN.x + CANVAS_OFFSETS.x + x * PX_PER_GRID_UNIT,
    ORIGIN.y + CANVAS_OFFSETS.y + y * PX_PER_GRID_UNIT,
  ];
}

// Draw a line from the origin to the unit circle so that the line goes through the mouse coordinates

function handleMouseMove(e: MouseEvent) {
  const mouseX = e.clientX - canvas.offsetLeft;
  const mouseY = e.clientY - canvas.offsetTop;
  const [mouseXAsCoords, mouseYAsCoords] = positionAsGridCoordinates(
    mouseX,
    mouseY
  );

  // Find the coordinates of the point on the circle that goes from the origin through the mouse coordinates to the circle

  const x =
    ORIGIN.x +
    (PX_PER_GRID_UNIT * (mouseX - PX_PER_GRID_UNIT)) /
      Math.sqrt(
        (mouseX - PX_PER_GRID_UNIT) ** 2 + (mouseY - PX_PER_GRID_UNIT) ** 2
      );
  const y =
    PX_PER_GRID_UNIT +
    (PX_PER_GRID_UNIT * (mouseY - PX_PER_GRID_UNIT)) /
      Math.sqrt(
        (mouseX - PX_PER_GRID_UNIT) ** 2 + (mouseY - PX_PER_GRID_UNIT) ** 2
      );

  // Find the point 60% of the way from the origin to the point on the circle

  const xThreeQuarters =
    PX_PER_GRID_UNIT +
    ((x - PX_PER_GRID_UNIT) * 3) / 4 +
    ((mouseX - PX_PER_GRID_UNIT) * 1) / 4;
  const yThreeQuarters =
    PX_PER_GRID_UNIT +
    ((y - PX_PER_GRID_UNIT) * 3) / 4 +
    ((mouseY - PX_PER_GRID_UNIT) * 1) / 4;

  // calculate the cosine and sine. the hypotenuse is 1, so the cosine and sine are the x and y coordinates of the point on the circle

  const cos = (x - PX_PER_GRID_UNIT) / PX_PER_GRID_UNIT;
  const sin = (-1 * (y - PX_PER_GRID_UNIT)) / PX_PER_GRID_UNIT;
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
  ctx.lineTo(x, PX_PER_GRID_UNIT);

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
    y + (PX_PER_GRID_UNIT - y) / 2
  );

  // Draw the cosine as a red dotted line i.e. a line that goes from the origin to the (x, 0)

  // First erase the part of the x-axis from (0,0) to (x,0)

  ctx.clearRect(
    x <= PX_PER_GRID_UNIT ? x : PX_PER_GRID_UNIT,
    PX_PER_GRID_UNIT,
    Math.abs(x - PX_PER_GRID_UNIT),
    2
  );

  ctx.beginPath();
  ctx.moveTo(PX_PER_GRID_UNIT, PX_PER_GRID_UNIT);
  ctx.lineTo(x, PX_PER_GRID_UNIT);

  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = "red";
  ctx.stroke();

  // Write cos similarly above the x axis

  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(
    `cos: ${cos.toFixed(2)}`,
    // in the middle of the line
    x + (PX_PER_GRID_UNIT - x) / 2,
    PX_PER_GRID_UNIT - 10
  );

  // Draw a tangent line that touches the (x,y) coordinates (i.e. is parallel to the red line)

  const deltaX = x - PX_PER_GRID_UNIT;
  const deltaY = y - PX_PER_GRID_UNIT;

  // from deltaX and deltaY we can calculate the slope of the tangent line

  const slopeOfRedLine = deltaY / deltaX;
  const slopeOfParallelLine = -1 / slopeOfRedLine;

  // draw a line from (x,y) in the direction of the slopeOfParallelLine

  const x1 = x;
  const y1 = y;

  // y2 should always be 0 (i.e. the line should touch the x axis) so it is always PIXELS_PER_UNIT
  const y2 = PX_PER_GRID_UNIT;

  // x2 is whatever it takes to go from x until y2 is 0
  // slopeOfParallelLine * (x2 - x) = y2 - y
  // slopeOfParallelLine * x2 - slopeOfParallelLine * x = y2 - y
  // since y2 is always PIXELS_PER_UNIT, we can write
  // slopeOfParallelLine * x2 - slopeOfParallelLine * x = PIXELS_PER_UNIT - y
  // x2 = (PIXELS_PER_UNIT - y + slopeOfParallelLine * x) / slopeOfParallelLine

  const x2 =
    (PX_PER_GRID_UNIT - y + slopeOfParallelLine * x) / slopeOfParallelLine;

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
    PX_PER_GRID_UNIT,
    PX_PER_GRID_UNIT,
    PX_PER_GRID_UNIT / 8,
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
    PX_PER_GRID_UNIT + PX_PER_GRID_UNIT / 8 + 10,
    PX_PER_GRID_UNIT - PX_PER_GRID_UNIT / 8 + 10
  );
}

drawBase();

app.addEventListener("mousemove", handleMouseMove);
