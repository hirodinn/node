import axios from "axios";
import { useEffect, useState } from "react";
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
        return <div key={i}>{user.name}</div>;
      })}
    </div>
  );
}

export default App;
