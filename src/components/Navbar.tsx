import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="Navbar py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <Link to="/">LOGO</Link>
          </div>

          <div className="col-lg-6 ms-auto d-flex align-items-center justify-content-end">
            {auth ? (
              <>
                <Link className="me-4" to="/contacts">
                  Contacts
                </Link>
                <Link className="me-4" to="/tags">
                  Tags
                </Link>
                <button
                  onClick={() => handleClick()}
                  className="me-4 btn btn-outline-danger ms-5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="me-4" to="/login">
                  Login
                </Link>
                <Link className="me-4 btn btn-outline-success" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
