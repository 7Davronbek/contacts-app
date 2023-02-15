import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_PATH } from "../constants";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Login: FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post(API_PATH + "/login/", { phone, password })
      .then((res) => {
        setIsLoading(false);
        localStorage.setItem("TOKEN", String(res.data.token));
        setPhone("");
        setPassword("");
        navigate("/", { replace: true });
        window.location.reload()
      })
      .catch((err) => {
        toast.error("User not found");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="Login">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 my-5 mx-auto">
            <h3 className="mb-5">Login</h3>

            <form onSubmit={handleLogin}>
              <label htmlFor="Phone number">Phone number</label>
              <input
                id="Phone number"
                type="number"
                className="form-control mb-4"
                required
                value={phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPhone(e.target.value);
                }}
              />

              <label htmlFor="Password">Password</label>
              <input
                id="Password"
                type="password"
                className="form-control mb-4"
                required
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />

              <button
                type="submit"
                className="btn d-block ms-auto btn-outline-dark"
                disabled={isLoading}
              >
                {isLoading ? <span className="spinner-border spinner-border-sm me-2"></span> : ""}
                Login
              </button>

              <Link to="/register">Don't have an account? Register</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
