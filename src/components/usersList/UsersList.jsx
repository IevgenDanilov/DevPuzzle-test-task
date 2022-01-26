const UsersList = ({ users, onDouble, setId }) => (
  <ul className="user-list">
    {users.map(({ id, username, email, address, website }) => (
      <li
        id={id}
        key={id}
        className="user-card grab"
        draggable="true"
        onDoubleClick={() => onDouble(id)}
        onDragStart={() => setId(id)}
      >
        <h3>User {id}</h3>
        <hr></hr>
        <b>Information:</b>
        <p>username: {username}</p>
        <p>email: {email}</p>
        <p>city: {address.city}</p>
        <p>website: {website}</p>
      </li>
    ))}
  </ul>
);

export default UsersList;
