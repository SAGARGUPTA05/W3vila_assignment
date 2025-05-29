import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { Navigate } from "react-router-dom";

const FRONTEND_URL = "https://w3vila-assignment.onrender.com";

const Home = () => {
  const [polls, setPolls] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios.get(`${FRONTEND_URL}/api/polls/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setPolls(res.data))
    .catch((err) => console.error(err));
  }, [token]);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Open Polls</h2>
      <div className="grid gap-4">
        {polls.length ? (
          polls.map(poll => (
            <Card key={poll._id} poll={poll} />
          ))
        ) : (
          <p>No polls available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
