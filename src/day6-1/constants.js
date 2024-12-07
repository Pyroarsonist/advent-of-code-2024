export const START_CELL = "^";
export const OBSTACLE_CELL = "#";
export const EMPTY_CELL = ".";

export const Direction = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT",
};

export const Velocity = {
  [Direction.UP]: { x: -1, y: -0 },
  [Direction.RIGHT]: { x: 0, y: 1 },
  [Direction.DOWN]: { x: 1, y: 0 },
  [Direction.LEFT]: { x: 0, y: -1 },
};
