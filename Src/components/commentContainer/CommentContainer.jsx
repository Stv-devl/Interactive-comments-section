import React from "react";
import Comment from "../comment/Comment";
import Loading from "../loading/Loading";
import Error from "../error/Error";
import { useSelector } from "react-redux";

const CommentContainer = () => {
  const { comments, loading, error } = useSelector(
    (state) => state.commentReducer
  );

  return (
    <div className="containers">
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading &&
        !error &&
        comments.length > 0 &&
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
