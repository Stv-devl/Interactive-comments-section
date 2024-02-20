const Profil = ({ user, createdAt, isCurrentUser }) => {
  return (
    <div className="profil-container">
      <img className="profil-image" src={user.image.png} alt="user-icone" />
      <p className="profil-name">{user.username}</p>
      {isCurrentUser && <span className="isThisyou">you</span>}
      <p className="writing-date">{createdAt}</p>
    </div>
  );
};

export default Profil;
