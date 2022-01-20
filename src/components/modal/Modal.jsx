import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const Modal = ({ onClose, children, posts }) => {
  //   console.log(posts);
  useEffect(() => {
    window.addEventListener("keydown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  });

  const closeModal = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        {children}

        <ul className="posts-list">
          {posts.map((item) => (
            <li key={item.id} className="post">
              <b>{item.title}</b>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
