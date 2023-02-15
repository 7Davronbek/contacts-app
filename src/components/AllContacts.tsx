import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IContacts, ITags } from "../interface";
import { contactAction } from "../redux/contactSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const AllContacts: FC = () => {
  const [type, setType] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [newContacts, setNewContacts] = useState<IContacts[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { contacts, isContact, deleteContactLoading } = useAppSelector(
    (state) => state.contact
  );

  const handleDelete = async (id: number) => {
    await dispatch(contactAction.deleteContact(id));
    await dispatch(contactAction.getContacts());
  };

  const handleEdit = (id: number) => {
    navigate(`/contacts/${id}`, { replace: true });
  };

  useEffect(() => {
    dispatch(contactAction.getContacts());
  }, [dispatch]);

  const handleChange = (e: string) => {
    setInputValue(e);
    const searchKey = e.toLowerCase();
    if (type === "Name") {
      const newContact = contacts.filter((item) => {
        const fullName = item.full_name.toLowerCase();

        return searchKey && fullName.startsWith(searchKey);
      });
      setNewContacts(newContact);
    } else if (type === "Email") {
      const newContact = contacts.filter((item) => {
        const email = item.email.toLowerCase();

        return searchKey && email.startsWith(searchKey);
      });
      setNewContacts(newContact);
    } else if (type === "Phone") {
      const newContact = contacts.filter((item) => {
        const phone = item.phone.toLowerCase();

        return searchKey && phone.startsWith(searchKey);
      });
      setNewContacts(newContact);
    }
  };

  return (
    <div className="AllContacts py-5 mb-5">
      <div className="container pb-5 mb-5">
        <div className="row">
          <div className="col-lg-5 my-5 ms-auto d-flex align-items-center">
            <h5>Filter</h5>
            <input
              type="text"
              className="form-control mx-2"
              placeholder="Search..."
              value={inputValue}
              onChange={(e) => handleChange(e.target.value)}
            />
            <select onChange={(e) => setType(e.target.value)} value={type}>
              <option value="">Choose type</option>
              <option value="Name">Name</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {inputValue.length > 0 && type.length > 0 ? (
                  <>
                    {newContacts.map((item: IContacts) => (
                      <tr
                        style={{ verticalAlign: "middle" }}
                        key={item.phone + item.full_name}
                      >
                        <th>{item.id}</th>
                        <th>{item.full_name}</th>
                        <th>
                          <a href={`tel:${item.phone}`}>{item.phone}</a>
                        </th>
                        <th>
                          <a href={`emailto=${item.email}`}>{item.email}</a>
                        </th>
                        <th className="">
                          {item?.tag.length > 0 &&
                            item.tag.map((item2: ITags) => (
                              <h6
                                className="me-2 mb-2"
                                key={item2.id + item2.name}
                              >
                                {item2.name}
                              </h6>
                            ))}
                        </th>
                        <th className="d-flex align-items-center">
                          <button
                            type="button"
                            className="btn btn-outline-warning me-2"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger me-2"
                            onClick={() => handleDelete(item.id)}
                            disabled={deleteContactLoading}
                          >
                            {deleteContactLoading ? (
                              <span className="spinner-border spinner-border-sm me-2"></span>
                            ) : (
                              ""
                            )}
                            Remove
                          </button>
                        </th>
                      </tr>
                    ))}
                  </>
                ) : isContact ? (
                  <tr>
                    <h5 className="text-center">
                      Loading{" "}
                      <span className="spinner-border spinner-border-sm"></span>
                    </h5>
                  </tr>
                ) : (
                  <>
                    {contacts.length > 0
                      ? contacts.map((item: IContacts, index: number) => (
                          <tr
                            style={{ verticalAlign: "middle" }}
                            key={item.phone + item.full_name}
                          >
                            <th>{index + 1}</th>
                            <th>{item.full_name}</th>
                            <th>
                              <a href={`tel:${item.phone}`}>+{item.phone}</a>
                            </th>
                            <th>
                              <a href={`emailto=${item.email}`}>{item.email}</a>
                            </th>
                            <th className="">
                              {item?.tag.length > 0 &&
                                item.tag.map((item2: ITags) => (
                                  <h6
                                    className="me-2 mb-2"
                                    key={item2.id + item2.name}
                                  >
                                    {item2.name}
                                  </h6>
                                ))}
                            </th>
                            <th className="d-flex align-items-center">
                              <button
                                type="button"
                                className="btn btn-outline-warning me-2"
                                onClick={() => handleEdit(item.id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger me-2"
                                onClick={() => handleDelete(item.id)}
                                disabled={deleteContactLoading}
                              >
                                {deleteContactLoading ? (
                                  <span className="spinner-border spinner-border-sm me-2"></span>
                                ) : (
                                  ""
                                )}
                                Remove
                              </button>
                            </th>
                          </tr>
                        ))
                      : ""}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllContacts;
