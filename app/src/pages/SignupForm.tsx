import { useState } from "react";
import Form from "../components/Form";
import Layout from "../components/Layout";
import { IUserAdd } from "../components/types";
import { addUser } from "../services/api";
import Modal from "../components/modal";
function SignupForm() {
  const [details, setDetails] = useState<IUserAdd>({
    first_name: "",
    last_name: "",
    email: "",
    user_name: "",
    phone_no: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  async function handleAddUser(user: IUserAdd) {
    try {
      const userPayload = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        user_name: user.user_name,
        user_password: user.user_password,
        phone_no: user.phone_no,
      };
      console.log(userPayload);
      const response = await addUser(userPayload);
      console.log(response);
      setShowModal(true);
      setMsg("signup");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting movie:", error);
      }
    }
  }
  return (
    <>
      <Layout title="signup">
        <h1>SignupForm</h1>
        <Form handleAddUser={handleAddUser} type="Add" details={details} />
        {showModal && <Modal msg={msg} />}
      </Layout>
    </>
  );
}

export default SignupForm;
