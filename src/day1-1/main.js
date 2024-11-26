import fs from "node:fs";
// import { parser } from "./parser";

const getAnswer = () =>
  // schema
  // const matrix = parser(schema);

  // return getSolution(matrix);
  0;

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
