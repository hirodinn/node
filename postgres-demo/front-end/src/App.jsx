import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [users, setUsers] = useState([]);
  const [showInsertForm, setShowInsertForm] = useState(false);
  useEffect(() => {
    const loadUser = async () => {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    };
    loadUser();
  }, []);

  async function removeItem(id) {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      const temp = users.filter((user) => user.id != id);
      setUsers(temp);
    } catch {
      console.log("error occurred");
    }
  }

  return (
    <div className="h-screen box-border overflow-hidden py-6">
      <div className="h-full box-border overflow-y-scroll overflow-x-hidden w-[90%] max-w-[1000px] mx-auto no-scrollbar">
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
                  className="bg-my-red text-white text-[15px] cursor-pointer
                  shadow-[0px_3px_1px_0px_rgb(255,0,0)]
                  hover:shadow-none py-1 px-5"
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
        <button
          className="block ml-auto mt-3"
          onClick={() => {
            setShowInsertForm(true);
          }}
        >
          plus
        </button>
      </div>
      {showInsertForm && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-my-black">
          <form className="w-70 h-50 bg-white"></form>
        </div>
      )}
    </div>
  );
}

export default App;
