import Comment from "../comment/Comment";
import { useSelector } from "react-redux";

const CommentContainer = () => {
  const { comments } = useSelector((state) => state.commentReducer);

  return (
    <div className="containers">
      {comments.length > 0 &&
        comments.map((comment) => (
          <div
            className="comment-container"
            key={`comment-container-${comment.id}`}
          >
            <Comment data={comment} isReply={false} />
            {comment.replies.length > 0 && (
              <div className="answer-container active">
                {comment.replies.map((reply) => (
                  <Comment
                    data={reply}
                    key={`reply-${reply.id}`}
                    isReply={true}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default CommentContainer;
