import axios from "axios";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PATH } from "../constants";

const Register: FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await axios
      .post(API_PATH + "/register/", { phone, password })
      .then((res) => {
        toast.success("Login please");
        setIsLoading(false);
        navigate("/login", { replace: true });
        setPhone("");
        setPassword("");
      })
      .catch((err) => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="Register">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 my-5 mx-auto">
            <h3 className="mb-5">Register</h3>

            <form onSubmit={handleRegister}>
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
                className="btn d-block ms-auto btn-outline-success"
              >
              {isLoading ? <span className="spinner-border spinner-border-sm me-2"></span> : ""}
                Register
              </button>

              <Link to="/login">Already have an account? Login</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
