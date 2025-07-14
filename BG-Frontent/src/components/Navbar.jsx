// components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/reducers/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token'); // optional if using token auth
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-10">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-10" />
        <span className="text-xl font-bold text-gray-700">Backend Remover</span>
      </Link>

      <div className="space-x-4">
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-700 font-medium">
              Welcome, {user?.username || user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
