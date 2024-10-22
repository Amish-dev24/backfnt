import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", age: "", contact: "" });
  const [editUser, setEditUser] = useState({
    id: null,
    name: "",
    age: "",
    contact: "",
  });

  const [notification, setNotification] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => setBackendData(data.users))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddUser = () => {
    if (newUser.name && newUser.age && newUser.contact) {
      fetch("http://localhost:5000/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: newUser }),
      })
        .then((response) => response.json())
        .then((data) => {
          setBackendData(data.users);
          setNewUser({ name: "", age: "", contact: "" });
          setNotification("User added successfully!");
          scrollToTop(); // Scroll to the top when notification is shown
          setTimeout(() => setNotification(""), 3000);
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          setNotification("Error adding user.");
          scrollToTop(); // Scroll to the top when notification is shown
          setTimeout(() => setNotification(""), 3000);
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleUpdateUser = () => {
    if (editUser.name && editUser.age && editUser.contact) {
      fetch(`http://localhost:5000/api/${editUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: editUser }),
      })
        .then((response) => response.json())
        .then((data) => {
          setBackendData(data.users);
          setEditUser({ id: null, name: "", age: "", contact: "" });
          setNotification("User updated successfully!");
          scrollToTop(); // Scroll to the top when notification is shown
          setTimeout(() => setNotification(""), 3000);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          setNotification("Error updating user.");
          scrollToTop(); // Scroll to the top when notification is shown
          setTimeout(() => setNotification(""), 3000);
        });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:5000/api/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data.users);
        setNotification("User deleted successfully!");
        scrollToTop(); // Scroll to the top when notification is shown
        setTimeout(() => setNotification(""), 3000);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setNotification("Error deleting user.");
        scrollToTop(); // Scroll to the top when notification is shown
        setTimeout(() => setNotification(""), 3000);
      });
  };

  return (
    <div className="container mt-5">
      {/* Notification Banner */}
      {notification && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {notification}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <h1 className="mb-4 text-center">CRUD APP</h1>

      {/* Add New User Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Add New User</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="newUserName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="newUserName"
                placeholder="Enter name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newUserAge" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="newUserAge"
                placeholder="Enter age"
                value={newUser.age}
                onChange={(e) =>
                  setNewUser({ ...newUser, age: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newUserContact" className="form-label">
                Contact
              </label>
              <input
                type="text"
                className="form-control"
                id="newUserContact"
                placeholder="Enter contact"
                value={newUser.contact}
                onChange={(e) =>
                  setNewUser({ ...newUser, contact: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddUser}
            >
              Add User
            </button>
          </form>
        </div>
      </div>

      {/* Edit User Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Update User</h2>
          {editUser.id && (
            <form>
              <div className="mb-3">
                <label htmlFor="editUserName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editUserName"
                  placeholder="Enter name"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editUserAge" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="editUserAge"
                  placeholder="Enter age"
                  value={editUser.age}
                  onChange={(e) =>
                    setEditUser({ ...editUser, age: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editUserContact" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editUserContact"
                  placeholder="Enter contact"
                  value={editUser.contact}
                  onChange={(e) =>
                    setEditUser({ ...editUser, contact: e.target.value })
                  }
                />
              </div>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleUpdateUser}
              >
                Update User
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Users List Section */}
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Users List</h2>
          <ul className="list-group">
            {backendData.map((user) => (
              <li
                key={user.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{user.name}</strong>
                  <br />
                  Age: {user.age}
                  <br />
                  Contact: {user.contact}
                </div>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
