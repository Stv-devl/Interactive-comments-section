/**
 * The component is a loader who is active when we waiting for'data'
 * @returns {JSX.Element} - A rotating loading circle
 */

const Loading = () => {
  return (
    <>
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    </>
  );
};

export default Loading;
