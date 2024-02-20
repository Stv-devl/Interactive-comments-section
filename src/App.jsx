import Loading from "./components/loading/Loading";
import Error from "./components/error/Error";
import Post from "./components/post/Post";
import CommentContainer from "./components/commentContainer/CommentContainer";
import { useSelector } from "react-redux";

const App = () => {
  const { comments, loading, error } = useSelector(
    (state) => state.commentReducer
  );

  return (
    <main>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading && !error && comments.length > 0 && (
        <>
          <CommentContainer />
          <Post isReply={false} />
        </>
      )}
    </main>
  );
};

export default App;
