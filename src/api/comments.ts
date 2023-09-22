import axios from "axios";

export const getComments = async () => {
  return await axios.get("http://localhost:3000/inputs");
};

export const addComment = async () => {
  return await axios.post("http://localhost:3000/inputs", {
    user: "Camila Soto",
    comment: "I loved the product!",
  });
};
