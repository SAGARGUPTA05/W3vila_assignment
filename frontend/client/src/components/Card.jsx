import { Link } from "react-router-dom";


const Card = ({ poll }) => {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="text-xl font-bold">{poll.question}</h3>
      <p className="text-sm text-gray-500">Closes: {new Date(poll.closingDate).toLocaleString()}</p>
      <Link to={`/poll/${poll._id}`} className="mt-2 inline-block text-gray-600">Vote/View</Link>
    </div>
  );
};

export default Card;
