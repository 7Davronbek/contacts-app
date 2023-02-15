import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { contactAction } from "../redux/contactSlice";
import { ITags } from "../interface/";
import axios from "axios";
import { API_PATH } from "../constants";
import { toast } from "react-toastify";

const ContactUpdatePage: FC = () => {
  const [fullName, setFullName] = useState<string>(String(""));
  const [phone, setPhone] = useState<string>(String(""));
  const [email, setEmail] = useState<string>("");
  const [oldTags, setOldTags] = useState<ITags[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [allTags, setAllTags] = useState<ITags[]>([]);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const dispatch = useAppDispatch();
  const { getSingleContactLoading, contact, tags, isTags } = useAppSelector(
    (state) => state.contact
  );
  const navigate = useNavigate();

  const getNewDatas = () => {
    if (contact) {
      setFullName(String(contact?.full_name));
      setPhone(contact?.phone);
      setEmail(contact?.email);
      setOldTags(contact?.tag);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("phone", phone);
    formData.append("email", email);
    oldTags.forEach((item, index) => {
      formData.append("tag", String(item.id));
    });

    await axios
      .patch(API_PATH + `/contact-rud/${path}/`, formData)
      .then((res) => {
        toast.warning("User updated successfully");
        dispatch(contactAction.getContacts());
        navigate("/contacts", { replace: true });
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Bad Request");
        setIsLoading(false);
      });
  };

  const handlePush = (e: string) => {
    const newTask = {
      name: e,
      id: Number(e),
    };
    setOldTags([...oldTags, newTask]);
  };

  const deleteTag = (id: number): void => {
    const newAllTags = oldTags.filter((item) => item.id !== id);
    setOldTags(newAllTags);
  };
  

  useEffect(() => {
    dispatch(contactAction.getContact(path));
    dispatch(contactAction.getTags());
    getNewDatas();
  }, [path, dispatch, contact?.full_name]);

  // let name1 = String(contact?.full_name)?.split(" ")[0];
  // let name2 = String(contact?.full_name)?.split(" ")[1];

  return (
    <div className="ContactUpdatePage py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto ">
            {getSingleContactLoading ? (
              <h5 className="my-3">
                Loading{" "}
                <span className="spinner-border spinner-border-sm text-center"></span>
              </h5>
            ) : (
              <>
                <h2 className="my-3">Update User ID: {path}</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="FirsName">Full Name</label>
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setFullName(e.target.value);
                    }}
                    value={fullName}
                    id="FirsName"
                    type="text"
                    required
                    className="form-control mb-4"
                  />

                  <label htmlFor="Phone_Number">Phone Number</label>
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setPhone(e.target.value);
                    }}
                    value={phone}
                    id="Phone_Number"
                    type="number"
                    required
                    className="form-control mb-4"
                  />

                  <label htmlFor="Email">Email</label>
                  <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    id="Email"
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
                    disabled={tags?.length === 0}
                  >
                    <option value=""></option>
                    {tags?.length > 0
                      ? tags.map((item: ITags) => (
                          <option key={item.name} value={item.id}>
                            {item.name}
                          </option>
                        ))
                      : ""}
                  </select>

                  <div className="d-flex align-items-center mt-3">
                    {oldTags?.length > 0
                      ? oldTags.map((item: ITags, index: number) => (
                          <div
                            key={index}
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
                    className="btn btn-warning mt-5 d-block ms-auto"
                    disabled={isLoading}
                  >
                    Update Contact
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUpdatePage;
