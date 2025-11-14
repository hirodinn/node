import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "./App.css";
function App() {
  const [users, setUsers] = useState([]);
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [loadingAddResponse, setLoadingAddResponse] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [nameText, setNameText] = useState("");

  const formRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    const loadUser = async () => {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (containerRef)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [users]);

  async function removeItem(id) {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      const temp = users.filter((user) => user.id != id);
      setUsers(temp);
    } catch {
      console.log("error occurred");
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    setLoadingAddResponse(true);
    try {
      const response = await axios.post("http://localhost:3000/users", {
        name: nameText,
        email: emailText,
      });
      setUsers([
        ...users,
        {
          name: response.data.name,
        },
      ]);
      setShowInsertForm(false);
    } catch {
      alert("This email address is already used");
    } finally {
      setLoadingAddResponse(false);
    }
  }

  return (
    <div className="h-screen box-border overflow-hidden py-20">
      <div
        className="h-full box-border overflow-y-scroll overflow-x-hidden w-[90%] max-w-[1000px] mx-auto no-scrollbar shadow-[0_0_10px_1px_rgba(0,0,233,0.3)] rounded-3xl"
        ref={containerRef}
      >
        {users.map((user, i) => {
          return (
            <div
              key={i}
              className={`flex justify-between py-3 px-6 text-[20px] items-center ${
                i % 2 === 0 ? "bg-my-even" : "bg-my-odd"
              }`}
            >
              <p>{user.name}</p>
              <div>
                <button
                  className="bg-my-red button
                  shadow-[0px_3px_1px_0px_rgb(255,0,0)]
                  hover:shadow-none"
                  onClick={() => {
                    removeItem(user.id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[90%] max-w-[1000px] mx-auto">
        <button
          className="block ml-auto mt-3 cursor-pointer bg-gray-200 rounded-3xl px-3 py-1.5"
          onClick={() => {
            setShowInsertForm(true);
          }}
        >
          <i className="fa-solid fa-plus mr-2"></i>Add User
        </button>
      </div>

      {showInsertForm && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-my-black"
          onClick={(e) => {
            if (!formRef || !formRef?.current.contains(e.target)) {
              setShowInsertForm(false);
            }
          }}
        >
          {loadingAddResponse ? (
            <div className="w-10 h-10 rounded-[50%] border-2 border-white border-t-blue-500 animate-spin"></div>
          ) : (
            <form
              className="w-[90%] max-w-[900px] bg-white flex flex-col justify-center px-20 py-10 text-[19px]"
              ref={formRef}
              onSubmit={handleAdd}
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name: "
                id="name"
                className="border-b-2 border-gray-600 w-full focus:outline-none mb-3 h-8"
                onChange={(e) => {
                  setNameText(e.target.value);
                }}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                placeholder="Enter your email: "
                id="email"
                className="border-b-2 border-gray-600 w-full focus:outline-none h-8"
                onChange={(e) => {
                  setEmailText(e.target.value);
                }}
              />
              <div className="flex justify-end items-center gap-3 mt-3">
                <button
                  type="button"
                  className="button bg-my-red shadow-[0px_3px_1px_0px_rgb(255,0,0)] hover:shadow-none"
                  onClick={() => {
                    setShowInsertForm(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-my-green shadow-[0px_3px_1px_0px_rgb(0,255,0)] button hover:shadow-none"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
