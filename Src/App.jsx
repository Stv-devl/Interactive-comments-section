import Post from "./components/post/Post";

import CommentContainer from "./components/commentContainer/CommentContainer";

const App = () => {
  return (
    <main>
      <CommentContainer />
      <Post isReply={false} />
    </main>
  );
};

export default App;
