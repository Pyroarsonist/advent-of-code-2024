import { isDevelopment, someEnv } from "~/config";

console.info("Hello world! 🚀");
console.log({ someEnv });
console.log("Environment is development:", isDevelopment);
