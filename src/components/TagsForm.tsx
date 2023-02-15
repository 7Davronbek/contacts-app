import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { contactAction } from "../redux/contactSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const TagsForm: FC = () => {
  const [name, setName] = useState<string>("");

  const { isLoading } = useAppSelector((state) => state.contact);
  const dispatch = useAppDispatch();

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(contactAction.createTag(name));
    setName("");
    await dispatch(contactAction.getTags());
  };

  return (
    <div className="TagsForm py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 mx-auto">
            <form onSubmit={handleClick}>
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                required
                className="form-control mb-4"
              />
              <button type="submit" className="btn btn-outline-primary">
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : (
                  ""
                )}
                Create Tag
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsForm;
