import { useSelector } from "react-redux";
import Post from "./components/post/Post";
import Comment from "./components/comment/Comment";
import Loading from "./components/loading/Loading";
import Error from "./components/error/Error";

const App = () => {
  const { comments, loading, error } = useSelector(
    (state) => state.commentReducer
  );

  return (
    <>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!error && !loading && comments.length > 0 && (
        <main>
          {
            <div className="containers">
              {comments.map((comment) => (
                <div
                  className="comment-container"
                  key={`comment-container-${comment.id}`}
                >
                  <Comment
                    data={comment}
                    key={`comment-${comment.id}`}
                    isReply={false}
                  />
                  <div
                    className={`answer-container ${
                      comment.replies.length > 0 ? "active" : ""
                    } `}
                  >
                    {comment.replies &&
                      comment.replies.map((reply) => (
                        <Comment
                          data={reply}
                          key={`reply-${reply.id}`}
                          isReply={true}
                        />
                      ))}
                  </div>
                  {/*    {comment.replies.length > 0 && (
                    <div className="reply-ligne"></div>
              )}*/}
                </div>
              ))}
            </div>
          }
          <Post isReply={false} />
        </main>
      )}
    </>
  );
};

export default App;
