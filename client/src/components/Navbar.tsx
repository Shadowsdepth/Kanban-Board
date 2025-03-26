import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = async () => {
    if (await auth.loggedIn()) {
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };

  // Re-run checkLogin when the loginCheck state changes
  useEffect(() => {
    checkLogin();
  }, [loginCheck]); // This will re-run whenever loginCheck changes

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
        {
          !loginCheck ? (
            <li className='nav-item'>
              <button type='button'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          ) : (
            <li className='nav-item'>
              <button
                type='button'
                onClick={() => {
                  auth.logout();
                  setLoginCheck(false); // Update login status locally
                  navigate('/login');
                }}
              >
                Logout
              </button>
            </li>
          )
        }
      </ul>
    </div>
  );
};

export default Navbar;
