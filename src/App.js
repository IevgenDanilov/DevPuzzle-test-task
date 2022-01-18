import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const UsersList = ({ users, info }) => (
  <ul className="user-list" onClick={(e) => info(e)}>
    {users.map(({ id, username, email, address, website }) => (
      <li id={id} key={id} className="user-card">
        <h3>User {id}</h3>
        <hr></hr>
        <b>Information:</b>
        <p>username: {username}</p>
        <p>email: {email}</p>
        <p>city: {address.city}</p>
        <p>website: {website}</p>
        {/* <a href={url} target="_blank" rel="noreferrer noopener">
            {title}
          </a> */}
      </li>
    ))}
  </ul>
);

function App() {
  const [users, setUsers] = useState([]);
  const [sortValue, setSortValue] = useState("username");

  const sortByValue = users.sort((a, b) => {
    console.log(sortValue, typeof sortValue);

    if (sortValue.includes(".")) {
      const arr = sortValue.split(".");
      return a[arr[0]][arr[1]].localeCompare(b[arr[0]][arr[1]]);
    } else return a[sortValue].localeCompare(b[sortValue]);
  });

  users.length && console.log(sortByValue);
  // useEffect(() => {
  !users.length &&
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data));
  // .then((response) => console.log(response.data));
  // }, []);

  // const fetchUsers = () =>
  //   fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
  //     response.json()
  //   );
  // .then((usersList) => setUsers(usersList));

  // async function Markup() {
  //   const usersList = await fetchUsers();
  //   setUsers(usersList);
  // }

  // Markup();

  // const { name } = users[0];

  // users = usersList();

  // fetchUsers();

  const info = (e) => {
    // alert(e.target);
    console.log(e.target.id);
  };

  const onChangeHandler = ({ target }) => {
    console.log(target.value);
    setSortValue(target.value);
  };

  return (
    <div>
      <div className="sorter">
        <h2>Cards sorted by </h2>
        <select
          defaultValue="username"
          name="sorter"
          size="1"
          className="sorter-switcher"
          onChange={onChangeHandler}
        >
          <option selected="selected">name</option>
          <option>email</option>
          <option value="address.city">city</option>
          <option>website</option>
        </select>
      </div>
      {users.length > 0 ? <UsersList users={users} info={info} /> : null};
    </div>
  );
}

export default App;
