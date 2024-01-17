import Card from "./components/card/Card";
import Post from "./components/post/Post";

const App = () => {
  return (
    <main>
      <div className="comments-containers">{<Card />}</div>
      <div className="post-container">{<Post />}</div>
    </main>
  );
};

export default App;
