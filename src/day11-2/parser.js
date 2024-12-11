export const parser = (schema) => schema.split(" ").filter(Boolean).map(Number);
