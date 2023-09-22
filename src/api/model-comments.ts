import axios from "axios";

export const getModelComments = async () => {
  return await axios.get("http://localhost:3000/model-comments");
};
