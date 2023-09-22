import axios from "axios";
import { commentsExamples } from "../models-ia/comments";

const options = {
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    authorization: "Bearer gsoSpXsZYPy7wn9ZECT4ZPmjww9pqpubYM8fQShB",
  },
};

const data = {
  truncate: "END",
  model: "large",
  inputs: [
    "This item was broken when it arrived",
    "The product is amazing",
    "The product was not too bad",
  ],
  examples: commentsExamples,
};

export const classifyComments = async () => {
  return await axios.post("https://api.cohere.ai/classify", data, options);
};
