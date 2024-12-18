// Positive x means the robot is moving to the right, and positive y means the robot is moving down.

import fs from "node:fs/promises";
import { BUSY_CELL, EMPTY_CELL, MAX_X, MAX_Y } from "./constants";

const move = (robot) => {
  const totalX = robot.p.x + robot.v.x;
  const totalY = robot.p.y + robot.v.y;

  const x = totalX >= 0 ? totalX % MAX_X : (totalX + -totalX * MAX_X) % MAX_X;
  const y = totalY >= 0 ? totalY % MAX_Y : (totalY + -totalY * MAX_Y) % MAX_Y;

  robot.p.x = x;
  robot.p.y = y;
};

const parseMatrix = (robots) => {
  const matrix = [];
  for (let i = 0; i < MAX_X; i++) {
    matrix.push([]);
    for (let j = 0; j < MAX_Y; j++) {
      matrix[i].push(EMPTY_CELL);
    }
  }

  let heuristicCoef = 0;

  for (const robot of robots) {
    matrix[robot.p.x][robot.p.y] = BUSY_CELL;
    heuristicCoef += Math.abs(robot.p.x - MAX_X / 2);
    heuristicCoef += Math.abs(robot.p.y - MAX_Y / 2);
  }

  return { matrix, heuristicCoef };
};

export const getSolution = (_robots) => {
  const robots = JSON.parse(JSON.stringify(_robots));

  for (let seconds = 1; seconds < 10000; seconds++) {
    for (const robot of robots) {
      move(robot);
    }

    const { matrix, heuristicCoef } = parseMatrix(robots);

    const str = matrix.map((line) => line.join("")).join("\n");

    const emptyFieldsLength = [...str].filter((c) => c === EMPTY_CELL).length;
    const percent = (emptyFieldsLength / str.length) * 100;

    // hardcoded
    if (heuristicCoef < 19000) {
      console.info(
        emptyFieldsLength,
        str.length,
        robots.length,
        percent,
        heuristicCoef,
      );

      fs.writeFile(`${__dirname}/images/${seconds}.txt`, str);
    }
  }

  return 0;
};
