import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./components/modal";
import UsersList from "./components/usersList";

function App() {
  const URL = "https://jsonplaceholder.typicode.com";
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postsById, setPostsById] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [sortValue, setSortValue] = useState("username");

  const sortedUsers = [...users];
  sortedUsers.sort((a, b) => {
    if (sortValue.includes(".")) {
      const arr = sortValue.split(".");
      return a[arr[0]][arr[1]].localeCompare(b[arr[0]][arr[1]]);
    } else return a[sortValue].localeCompare(b[sortValue]);
  });

  users.length && console.log(sortedUsers);

  useEffect(() => {
    axios.get(`${URL}/users`).then((response) => setUsers(response.data));
    axios.get(`${URL}/posts`).then((response) => setPosts(response.data));
  }, []);
  // !users.length &&
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => setUsers(response.data));
  // const onOpenModal = (image) => {
  //   setLargeImageURL(image);
  // };

  const onCloseModal = (e) => {
    if (e && e.target.className !== "Overlay") {
      return null;
    }
    setIsModal(false);
  };

  const onDoubleClickHandler = (id) => {
    const postsById = posts.filter((post) => post.userId === id);
    setUserId(id);
    setPostsById(postsById);
    setIsModal(true);
  };

  const onChangeHandler = ({ target }) => {
    setSortValue(target.value);
  };

  return (
    <div className="wrapper">
      <div className="cards-wrapper">
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
        {users.length > 0 ? (
          <UsersList users={sortedUsers} onDouble={onDoubleClickHandler} />
        ) : null}

        {isModal && (
          <Modal onClose={onCloseModal} posts={postsById}>
            <h2 className="modal-title">Posts of user № {userId}</h2>
          </Modal>
        )}
      </div>
      <div className="cards-wrapper">
        <h2>Cards included in the database</h2>
      </div>
    </div>
  );
}

export default App;
