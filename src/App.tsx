import { useEffect, useState } from "react";
import { Divider, Avatar, Button, Progress } from "@nextui-org/react";
import { classifyCommentsService } from "./api/classify-comments";
import { getModelComments } from "./api/model-comments";
import { getCommentsService } from "./api/comments";
import { Comment } from "./interfaces/model-comments";
import { Classification, ReqClassifyProps } from "./interfaces/classifications";
import confetti from "canvas-confetti";
import FormAddComment from "./components/form-add-comments";
import ModelComments from "./components/model-ia-comments";

function App() {
  const [modelComments, setModelComments] = useState([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingClassify, setLoadingClassify] = useState(false);

  useEffect(() => {
    getModelIA();
    getCurrentComments();
  }, []);

  const getClassify = () => {
    const data: ReqClassifyProps = {
      model: "large",
      truncate: "START",
      examples: modelComments,
      inputs: comments.map((input) => input.comment),
    };
    setLoadingClassify(true);
    classifyCommentsService(data)
      .then(({ classifications }) => {
        confetti({ zIndex: 102 });
        setClassifications(classifications);
      })
      .catch((error) => {
        alert("Ha ocurrido un error");
        console.log(error);
      })
      .finally(() => setLoadingClassify(false));
  };

  const getModelIA = () => {
    getModelComments().then(({ data }) => setModelComments(data));
  };

  const getCurrentComments = () => {
    setLoadingComments(true);
    getCommentsService()
      .then(({ data }) => setComments(data))
      .finally(() => setLoadingComments(false));
  };

  return (
    <main className="container pt-8">
      <div className="bg-white">
        <div className="mx-auto px-8">
          <h1 className="text-3xl font-bold"></h1>
          <h1 className="tracking-tight inline font-semibold text-gray-900 text-3xl">
            Cohere: Sentiment Analysis
          </h1>
          <h4 className="text-lg text-gray-700">
            Let's comment and classify your review...
          </h4>

          <FormAddComment updateComments={getCurrentComments} />

          <div className="space-y-1 max-w-sm">
            {loadingComments && (
              <Progress
                size="sm"
                isIndeterminate
                aria-label="Loading..."
                className="max-w-md"
              />
            )}

            {comments.map((comment) => (
              <section key={comment.comment}>
                <h4 className="text-medium font-medium">{comment.comment}</h4>
                <div className="flex items-center">
                  <Avatar
                    color="default"
                    className="w-6 h-6 text-tiny"
                    showFallback
                  />
                  <p className="text-small text-default-400 ml-2">
                    {comment.user}
                  </p>
                </div>
                <Divider className="my-4" />
              </section>
            ))}
            <div className="pt-8">
              <Button
                isLoading={loadingClassify}
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                onClick={getClassify}
              >
                Classify reviews!
              </Button>
            </div>
          </div>

          {Boolean(classifications.length) && (
            <div className="mx-auto py-5 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <article className="p-5 rounded flex max-w-xl flex-col items-start justify-between shadow-lg">
                <div className="group relative">
                  <h3 className="mt-3 text-2xl font-semibold leading-6 text-green-500">
                    Positive reviews 🤩
                  </h3>
                  <ul>
                    {classifications
                      .filter(
                        (comment) => comment.prediction === "positive review"
                      )
                      .map((comment) => (
                        <li key={comment.id}>{comment.input} </li>
                      ))}
                  </ul>
                </div>
              </article>

              <article className="p-5 rounded flex max-w-xl flex-col items-start justify-between shadow-lg">
                <div className="group relative">
                  <h3 className="mt-3 text-2xl font-semibold leading-6 text-yellow-500">
                    Neutral review 😐️
                  </h3>
                  <ul>
                    {classifications
                      .filter(
                        (comment) => comment.prediction === "neutral review"
                      )
                      .map((comment) => (
                        <li key={comment.id}>{comment.input} </li>
                      ))}
                  </ul>
                </div>
              </article>

              <article className="p-5 rounded flex max-w-xl flex-col items-start justify-between shadow-lg">
                <div className="group relative">
                  <h3 className="mt-3 text-2xl font-semibold leading-6 text-orange-500">
                    Negative review ☹️
                  </h3>
                  <ul>
                    {classifications
                      .filter(
                        (comment) => comment.prediction === "negative review"
                      )
                      .map((comment) => (
                        <li key={comment.id}>{comment.input} </li>
                      ))}
                  </ul>
                </div>
              </article>
            </div>
          )}

          <ModelComments modelComments={modelComments} />
        </div>
      </div>
    </main>
  );
}

export default App;
