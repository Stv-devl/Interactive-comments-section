/**
 * The component is diplsay the error message
 * @returns {JSX.Element} - An error message
 */
const Error = () => {
  return (
    <div className="error-container">
      <h1 className="error">404</h1>
      <h2 className="oups">Oups! La page que vous demandez n'existe pas.</h2>
    </div>
  );
};

export default Error;
