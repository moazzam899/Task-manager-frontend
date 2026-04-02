import { useState } from "react";
import axios from "axios";


function App() {
const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = "https://task-manager-backend-pv4b.onrender.com/";
  // const API = process.env.REACT_APP_API;

 const register = async () => {
  try {
    await axios.post(`${API}/auth/register`, {
      name,
      email,
      password
    });

    alert("Registered successfully");

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Register failed");
  }
};

  // LOGIN
  const login = async () => {
  try {
    console.log("Login clicked");

    const res = await axios.post(`${API}/auth/login`, {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);

    alert("Login success");

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Login failed");
  }
};

  // GET TASKS
  const getTasks = async () => {
  const res = await axios.get(`${API}/tasks`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  setTasks(res.data);
};

  // CREATE TASK
 const createTask = async () => {
  await axios.post(`${API}/tasks`, 
    { title },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  getTasks();
};

  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    getTasks();
  };

  return (
  <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
    
    <h2>Task Manager</h2>

    <h2>Register</h2>
<input placeholder="name" onChange={(e) => setName(e.target.value)} />
<input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
<input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
<button onClick={register}>Register</button>

    <hr />

    <h3>Login</h3>
    <button onClick={login}>Login</button>

    <hr />

    <h3>Tasks</h3>
    <input placeholder="task title" value={title} onChange={(e) => setTitle(e.target.value)} />
    <button onClick={createTask}>Add Task</button>
    <button onClick={getTasks}>Load Tasks</button>

    <ul>
      {tasks.map((t) => (
        <li key={t._id}>
          {t.title}
          <button onClick={() => deleteTask(t._id)}>Delete</button>
        </li>
      ))}
    </ul>

  </div>
);
}

export default App;