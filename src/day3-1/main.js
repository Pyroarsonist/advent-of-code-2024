import fs from "node:fs";
import { getSolution } from "./solution";

const getAnswer = (schema) => getSolution(schema);

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
