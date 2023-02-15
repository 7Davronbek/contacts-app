import { FC } from "react";
import { AllContacts, ContactForm } from "../components";

const ContactPage: FC = () => {
  return (
    <>
      <ContactForm />
      <AllContacts />
    </>
  );
};

export default ContactPage;
