import axios from "axios";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_PATH } from "../constants";
import { ITags } from "../interface";
import { contactAction } from "../redux/contactSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const ContactForm: FC = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [allTags, setAllTags] = useState<ITags[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch();
  const { tags } = useAppSelector((state) => state.contact);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)

    const formData = new FormData();
    formData.append("full_name", name + " " + surname);
    formData.append("phone", phone);
    formData.append("email", email);
    allTags.forEach((item, index) => {
      formData.append("tag", String(item.id));
    });

    await axios
      .post(API_PATH + "/contact-create/", formData)
      .then((res) => {
        setName("");
        setSurname("");
        setPhone("");
        setEmail("");
        setAllTags([]);
        setSelected("");
        toast.success("User created successfully");
        dispatch(contactAction.getContacts());
        setIsLoading(false)
      })
      .catch((err) => {
        toast.error("Bad Request");
        setIsLoading(false)
      });
  };

  const handlePush = (e: string) => {
    const newTask = {
      name: e,
      id: Number(e),
    };
    setAllTags([...allTags, newTask]);
  };

  const deleteTag = (id: number): void => {
    const newAllTags = allTags.filter((item) => item.id !== id);
    setAllTags(newAllTags);
  };

  useEffect(() => {
    dispatch(contactAction.getTags());
  }, []);

  return (
    <div className="ContactForm py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 mx-auto">
            <form
              onSubmit={handleSubmit}
              className="card px-5 py-5 border rounded"
            >
            <h4 className='mb-3 text-center'>Contact Form</h4>
              <label htmlFor="FirsName">FirsName</label>
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
                id="FirsName"
                value={name}
                type="text"
                required
                className="form-control mb-4"
              />
              <label htmlFor="LastName">LastName</label>
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSurname(e.target.value);
                }}
                id="LastName"
                value={surname}
                type="text"
                required
                className="form-control mb-4"
              />

              <label htmlFor="Phone_Number">Phone Number</label>
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPhone(e.target.value);
                }}
                id="Phone_Number"
                value={phone}
                type="number"
                required
                className="form-control mb-4"
              />

              <label htmlFor="Email">Email</label>
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
                id="Email"
                value={email}
                type="email"
                required
                className="form-control mb-4"
              />

              <label htmlFor="">Tags</label>
              <select
                onChange={(e) => {
                  handlePush(e.target.value), setSelected(e.target.value);
                }}
                value={selected}
                disabled={tags.length === 0}
              >
                <option value=""></option>
                {tags.length > 0
                  ? tags.map((item: ITags) => (
                      <option key={item.name + item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  : ""}
              </select>

              <div className="d-flex align-items-center mt-3">
                {allTags.length > 0
                  ? allTags.map((item: ITags) => (
                      <div
                        key={item.name + item.id}
                        className="d-flex align-items-center"
                      >
                        <h6 className="me-2">
                          {item.name}
                          <button
                            type="button"
                            onClick={() => deleteTag(item.id)}
                            className="btn btn-outline-danger ms-2"
                          >
                            x
                          </button>
                        </h6>
                      </div>
                    ))
                  : ""}
              </div>

              <button
                type="submit"
                className="btn btn-outline-success mt-5 d-block ms-auto"
                disabled={isLoading}
              >
                Create Contact
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
