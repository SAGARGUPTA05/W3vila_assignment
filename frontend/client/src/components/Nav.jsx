import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const isLog = !!localStorage.getItem("token");
  const admin = localStorage.getItem("role") === "admin";
  const navigate=useNavigate()
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Poll App</Link>
      <div className="space-x-4">
        {isLog ? (
          <>
            {admin && <Link to="/dashboard" className="text-gray-900">Dashboard</Link>}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
                navigate("/login")
              }}
              
              className="text-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600">Login</Link>
            <Link to="/register" className="text-gray-600">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
