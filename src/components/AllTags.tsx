import { FC, useEffect } from "react";
import { ITags } from "../interface";
import { contactAction } from "../redux/contactSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const AllTags: FC = () => {
  const dispatch = useAppDispatch();
  const { isTags, tags } = useAppSelector((state) => state.contact);

  useEffect(() => {
    dispatch(contactAction.getTags());
  }, [dispatch]);

  return (
    <div className="AllTags py-5">
      <div className="container">
        <div className="row ">
          {isTags ? (
            <h5>
              Loading <span className="spinner-border spinner-border-sm"></span>
            </h5>
          ) : (
            <>
              {tags.length > 0
                ? tags.map((item: ITags) => (
                    <div key={item.id} className="col-lg-2 mb-3">
                      <h5>{item.name}</h5>
                    </div>
                  ))
                : ""}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTags;
