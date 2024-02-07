const Modale = ({ modaleIsOpen, closeModale, handleDelete }) => {
  return (
    <>
      {modaleIsOpen && (
        <div className="modal-container">
          <div className="modal-wrapper">
            <h1>Delete comment</h1>
            <p className="modale-desc">
              Are you sure you want to delete this comment? This will remove the
              comment and can’t be undone.
            </p>
            <div className="btn-wrapper">
              <button className="isNo" onClick={() => closeModale()}>
                No, cancel
              </button>
              <button className="isYes" onClick={() => handleDelete()}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modale;
