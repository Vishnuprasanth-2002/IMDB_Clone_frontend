import { useState } from "react";
import Layout from "../components/Layout";
import { IResetPass } from "../components/types";
import { setNewPassword, updateUserPassword } from "../services/api";
import Modal from "../components/modal";
import { useParams } from "react-router-dom";

function UpdateNewPassword() {
  const { id } = useParams();
  const [new_password, setNew_password] = useState("");
  const [conPass, setConpass] = useState("");
  const [passError, setPassError] = useState({
    error: "",
    show: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setNew_password(value);
  }
  function handleconfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setConpass(value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (conPass === new_password) {
      setPassError({ ...passError, error: "", show: false });
      handleChangePass(new_password, id || "");
    } else {
      setPassError({ ...passError, error: "password not match", show: true });
    }
  }
  async function handleChangePass(user: string, id: string) {
    try {
      const payload = {
        new_password: user,
      };
      const response = await setNewPassword(payload, id);
      console.log(response.data.message);
      setShowModal(true);
      setMsg(response.data.message);
    } catch (error: any) {
      console.log(error);
      setShowModal(true);
      setMsg(error.response.data.message);
    }
  }
  return (
    <>
      <Layout title="chane_password">
        <h1>Update New Password</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">
            New Password
            <input
              type="text"
              id="new_password"
              name="new_password"
              value={new_password}
              placeholder="New password"
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="confirm-password">
            confirm-Password
            <input
              type="text"
              id="confirm-password"
              name="confirm-password"
              value={conPass}
              placeholder="confirm Password"
              onChange={handleconfirmPassword}
              required
            />
          </label>
          {passError.show && <p style={{ color: "red" }}>{passError.error}</p>}
          <button type="submit">Submit</button>
        </form>
        {showModal && <Modal msg={msg} />}
      </Layout>
    </>
  );
}
export default UpdateNewPassword;
