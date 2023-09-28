import axios from "axios";
import {
  ReqClassifyProps,
  ResClassifyPros,
} from "../interfaces/classifications";

const options = {
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    authorization: "Bearer jH5du2V07GdS1NFdPmtH7CA2XfxS1PCTKrN8YxZo",
  },
};

export const classifyCommentsService = async (data: ReqClassifyProps) => {
  const response = await axios.post(
    "https://api.cohere.ai/classify",
    data,
    options
  );

  return response.data as ResClassifyPros;
};
