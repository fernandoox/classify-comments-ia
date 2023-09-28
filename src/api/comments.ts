import axios from "axios";
import { Comment } from "../interfaces/model-comments";

export const getCommentsService = async () => {
  return await axios.get("http://localhost:3000/inputs");
};

export const addCommentService = async (comment: Comment) => {
  return await axios.post("http://localhost:3000/inputs", comment);
};
