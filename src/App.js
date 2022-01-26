import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./components/modal";
import UsersList from "./components/usersList";
import "./bootstrap-social.css";

function App() {
  // constants and states declaration

  const URL = "https://jsonplaceholder.typicode.com";
  const [login, setLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postsById, setPostsById] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [sortValue, setSortValue] = useState("username");
  const [sortedUsers, setSortedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // server requests

  useEffect(() => {
    axios.get(`${URL}/users`).then((response) => {
      setUsers(response.data);
      setSortedUsers(response.data);
    });
    axios.get(`${URL}/posts`).then((response) => setPosts(response.data));
  }, []);

  // array of users sorting by selected value

  sortedUsers.sort((a, b) => {
    if (sortValue.includes(".")) {
      const arr = sortValue.split(".");
      return a[arr[0]][arr[1]].localeCompare(b[arr[0]][arr[1]]);
    } else return a[sortValue].localeCompare(b[sortValue]);
  });

  // set cards sort value

  const onChangeHandler = ({ target }) => {
    setSortValue(target.value);
  };

  // opening a post box

  const onOpenModal = (id) => {
    const postsById = posts.filter((post) => post.userId === id);
    setUserId(id);
    setPostsById(postsById);
    setIsModal(true);
  };

  // closing a post box

  const onCloseModal = (e) => {
    if (e && e.target.className !== "Overlay") {
      return null;
    }
    setIsModal(false);
  };

  // add card to database

  const dragToBaseHandler = () => {
    const sortedUser = selectedUsers.find((user) => user.id === userId);
    sortedUser && setSortedUsers([...sortedUsers, sortedUser]);
    const filteredUsers = selectedUsers.filter((user) => user.id !== userId);
    setSelectedUsers(filteredUsers);
  };

  // remove card from database

  function dragFromBaseHandler() {
    const selectedUser = sortedUsers.find((user) => user.id === userId);
    selectedUser && setSelectedUsers([...selectedUsers, selectedUser]);
    const filteredUsers = sortedUsers.filter((user) => user.id !== userId);
    setSortedUsers(filteredUsers);
  }

  return (
    <>
      <div className="main-title">
        <h1>Hello, it's a DevPuzzle test task</h1>
        <button
          className="log-button btn btn-block btn-social btn-google"
          onClick={() => setLogin(!login)}
        >
          <img
            src="./google.svg"
            alt="google btn"
            className="btn-img"
            width="18"
            height="18"
          />
          {login ? "Log out" : "Log in by google"}
        </button>
      </div>
      <div className="wrapper">
        <div className="cards-wrapper" onDragLeave={() => dragToBaseHandler()}>
          <div className="sorter">
            <h2>Cards sorted by </h2>
            <select
              defaultValue="username"
              name="sorter"
              size="1"
              className="sorter-switcher"
              onChange={onChangeHandler}
            >
              <option value="name">name</option>
              <option value="email">email</option>
              <option value="address.city">city</option>
              <option value="website">website</option>
            </select>
          </div>
          {sortedUsers.length > 0 ? (
            <UsersList
              users={sortedUsers}
              onDouble={onOpenModal}
              setId={setUserId}
            />
          ) : null}
        </div>

        <div
          className="selected-cards-wrapper"
          onDragLeave={() => dragFromBaseHandler()}
        >
          <h2>Cards included in the database</h2>
          {selectedUsers.length > 0 ? (
            <UsersList
              users={selectedUsers}
              onDouble={onOpenModal}
              setId={setUserId}
            />
          ) : null}
        </div>

        {isModal && (
          <Modal onClose={onCloseModal} posts={postsById}>
            <h2 className="modal-title">Posts of user № {userId}</h2>
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
