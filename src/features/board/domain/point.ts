export type Point = {
  x: number;
  y: number;
};
export function distanceFromPoint(point1: Point, point2: Point) {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  );
}
export function vectorFromPoints(point1: Point, point2: Point) {
  return { x: point2.x - point1.x, y: point2.y - point1.y };
}
