import { useEffect, useState } from "react";
import axios from "axios";
const FRONTEND_URL = "https://w3vila-assignment.onrender.com";

const Dashboard = () => {
  const [polls, setPolls] = useState([]);
  const [form, setForm] = useState({
    question: "",
    options: "",
    closingDate: "",
  });

  const fetchPolls = async () => {
    try {
      
      const res = await axios.get(`${FRONTEND_URL}/api/polls/admin`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPolls(res.data);
    } catch (err) {
      alert("Failed to fetch polls");
    }
  };

  useEffect(() => {
    fetchPolls();
    console.log(polls)
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const optionsArr = form.options.split(",").map((optn) => optn.trim());
    if (optionsArr.length < 2) return alert("Minimum two options required");

    const payload = {
      question: form.question,
      options: optionsArr,
      closingDate: form.closingDate,
    };

    try {
      if (form.editMode && form.id) {
        await axios.put(`${FRONTEND_URL}/api/polls/${form.id}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        await axios.post(`${FRONTEND_URL}/api/polls/create`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      setForm({ question: "", options: "", closingDate: "", editMode: false });
      fetchPolls();
    } catch (err) {
      alert("Error saving poll");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${FRONTEND_URL}/api/polls/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchPolls();
    } catch (err) {
      alert("Failed to delete poll");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <form onSubmit={handleCreateOrUpdate} className="mb-6 space-y-2">
        <input
          name="question"
          placeholder="Poll question"
          className="w-full border p-2"
          value={form.question}
          onChange={handleChange}
          required
        />
        <input
          name="options"
          placeholder="Comma-separated options"
          className="w-full border p-2"
          value={form.options}
          onChange={handleChange}
          required
        />
        <input
          name="closingDate"
          type="datetime-local"
          className="w-full border p-2"
          value={form.closingDate}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          {form.editMode ? "Update Poll" : "Create Poll"}
        </button>
      </form>

      <h3 className="text-xl mb-2">Your Polls</h3>
      {polls.map((poll) => (
        <div key={poll._id} className="bg-white border p-4 rounded mb-3 shadow">
          <p className="font-semibold">{poll.question}</p>
          <p className="text-sm text-gray-500">
            Closes: {new Date(poll.closingDate).toLocaleString()}
          </p>

          <button
            onClick={() =>
              setForm({
                id: poll._id,
                question: poll.question,
                options: poll.options.join(", "),
                closingDate: new Date(poll.closingDate).toISOString().slice(0, 16),
                editMode: true,
              })
            }
            className="text-gray-600 mr-2"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(poll._id)}
            className="text-gray-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
