const Modale = () => {
  return (
    <div className="modal-container">
      <h1>Delete comment</h1>
      <p className="modale-desc">
        Are you sure you want to delete this comment? This will remove the
        comment and can’t be undone.
      </p>
      <div className="btn-wrapper">
        <button className="isNo">No, cancel</button>
        <button className="isYes">Yes, delete</button>
      </div>
    </div>
  );
};

export default Modale;
