import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const loadUser = async () => {
      const response = await axios.get("http://localhost:3000/users");
      console.log(response.data);
    };
    loadUser();
  }, []);
  return <div>App</div>;
}

export default App;
