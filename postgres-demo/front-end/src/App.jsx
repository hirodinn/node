import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const loadUser = async () => {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    };
    loadUser();
  }, []);
  return (
    <div>
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
                className="bg-my-red text-white text-[15px] cursor-pointer shadow-[0px_3px_1px_0px_rgb(255,0,0)]
 hover:shadow-none py-1 px-5"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
