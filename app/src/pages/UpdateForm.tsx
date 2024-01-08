import { useEffect, useState } from "react";
import Form from "../components/Form";
import Layout from "../components/Layout";
import { IUserAdd } from "../components/types";
import { getUser, updateUser } from "../services/api";
import Modal from "../components/modal";

function UpdateForm() {
  const [details, setDetails] = useState<IUserAdd>({
    first_name: "",
    last_name: "",
    email: "",
    user_name: "",
    phone_no: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState<string>("");
  useEffect(() => {
    async function getUserFromAPI() {
      try {
        const response = await getUser();
        setDetails(response.data);
      } catch (error: any) {
        console.log(error);
        setError(error.response.data);
      }
    }
    getUserFromAPI();
  }, []);
  function handleUpdateUser(user: IUserAdd) {
    UpdateUserFromAPI(user);
  }
  async function UpdateUserFromAPI(user: IUserAdd) {
    try {
      const response = await updateUser(user);
      console.log(response);
      setShowModal(true);
      setMsg("successfully updated");
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    }
  }

  console.log(details);

  return (
    <>
      <Layout title="update">
        <h1>UpdateForm</h1>
        <Form
          details={details}
          type="update"
          handleAddUser={handleUpdateUser}
        />
        {showModal && <Modal msg={msg} />}
        {error && <p>{error}</p>}
      </Layout>
    </>
  );
}

export default UpdateForm;
