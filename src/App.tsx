import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useEffect, useState } from "react";
import { classifyComments } from "./api/classify-comments";
import { getModelComments } from "./api/model-comments";
import { addComment, getComments } from "./api/comments";

function App() {
  const [modelComments, setModelComments] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getClassify();
  }, []);

  const getClassify = () => {
    /*  classifyComments()
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      }); */
    getModelComments().then(({ data }) => setModelComments(data));
    getComments().then(({ data }) => setComments(data));
    //addComment().then((data) => console.log(data));
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <pre> {JSON.stringify(modelComments, undefined, 2)} </pre>
      <pre> {JSON.stringify(comments, undefined, 2)} </pre>
      <input type="text" name="" id="" />
    </>
  );
}

export default App;
