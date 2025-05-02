export const WALL_CELL = "#";
export const ROBOT_CELL = "@";
export const BOX_CELL = "O";
export const EMPTY_CELL = ".";
export const LEFT_BOX_CELL = "[";
export const RIGHT_BOX_CELL = "]";

export const Direction = {
  UP: "^",
  DOWN: "v",
  LEFT: "<",
  RIGHT: ">",
};

export const DirectionDiff = {
  [Direction.UP]: [-1, 0],
  [Direction.LEFT]: [0, -1],
  [Direction.RIGHT]: [0, 1],
  [Direction.DOWN]: [1, 0],
};
