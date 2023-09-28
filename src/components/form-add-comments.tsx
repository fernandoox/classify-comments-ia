import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { addCommentService } from "../api/comments";
import { Comment } from "../interfaces/model-comments";
import { v4 as uuidv4 } from "uuid";
import confetti from "canvas-confetti";

interface Props {
  updateComments: () => void;
}
const FormAddComment = ({ updateComments }: Props) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const addComment = () => {
    const newComment: Comment = {
      id: uuidv4(),
      user: name,
      comment,
    };
    setLoading(true);
    addCommentService(newComment)
      .then(() => {
        updateComments();
        confetti({ zIndex: 102 });
        setName("");
        setComment("");
      })
      .catch(() => {
        alert("Ha ocurrido un error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col flex-wrap md:flex-nowrap gap-4 my-5 max-w-sm shadow-lg p-5 rounded-md">
      <Input
        type="text"
        value={name}
        onValueChange={setName}
        label="Name"
        size="sm"
      />
      <Input
        type="text"
        maxLength={120}
        value={comment}
        onValueChange={setComment}
        label="Write your review"
        size="sm"
      />
      <Button
        color="secondary"
        onClick={addComment}
        isDisabled={!name || !comment}
        isLoading={loading}
      >
        Publish
      </Button>
    </div>
  );
};

export default FormAddComment;
