import fs from "node:fs";
import { getSolution } from "./solution";
import { parser } from "./parser";

const getAnswer = (schema) => {
  const line = parser(schema);

  return getSolution(line);
};

const inputFilePath = `${__dirname}/input.txt`;

const main = async () => {
  const buf = fs.readFileSync(inputFilePath);

  const dateBefore = Date.now();

  const answer = getAnswer(buf.toString());

  console.info(`Answer: ${answer}`);
  const dateAfter = Date.now();
  console.info(`Time: ${dateAfter - dateBefore} ms`);
};

main();
