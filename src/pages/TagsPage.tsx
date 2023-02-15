import { FC } from "react";
import { AllTags, TagsForm } from "../components";

const TagsPage: FC = () => {
  return (
    <>
      <TagsForm />
      <AllTags />
    </>
  );
};

export default TagsPage;
