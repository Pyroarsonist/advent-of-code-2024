// Positive x means the robot is moving to the right, and positive y means the robot is moving down.

import { MAX_X, MAX_Y, SECONDS } from "./constants";

const move = (robot) => {
  const totalX = robot.p.x + robot.v.x * SECONDS;
  const totalY = robot.p.y + robot.v.y * SECONDS;

  const x = totalX >= 0 ? totalX % MAX_X : (totalX + -totalX * MAX_X) % MAX_X;
  const y = totalY >= 0 ? totalY % MAX_Y : (totalY + -totalY * MAX_Y) % MAX_Y;

  return { x, y };
};

export const getSolution = (robots) => {
  const movedRobots = JSON.parse(JSON.stringify(robots)).map(move);
  const middleX = Math.trunc(MAX_X / 2);
  const middleY = Math.trunc(MAX_Y / 2);
  const quadrants = movedRobots.reduce(
    (quadrantsAcc, { x, y }) => {
      if (x === middleX || y === middleY) {
        return quadrantsAcc;
      }

      if (x < middleX && y < middleY) {
        quadrantsAcc.leftTop++;
        return quadrantsAcc;
      }

      if (x > middleX && y < middleY) {
        quadrantsAcc.rightTop++;
        return quadrantsAcc;
      }

      if (x > middleX && y > middleY) {
        quadrantsAcc.rightBottom++;
        return quadrantsAcc;
      }

      if (x < middleX && y > middleY) {
        quadrantsAcc.leftBottom++;
        return quadrantsAcc;
      }

      return quadrantsAcc;
    },
    { leftTop: 0, rightTop: 0, rightBottom: 0, leftBottom: 0 },
  );

  return Object.values(quadrants).reduce((product, val) => product * val, 1);
};
