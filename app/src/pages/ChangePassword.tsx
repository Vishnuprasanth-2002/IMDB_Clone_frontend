import { useState } from "react";
import Layout from "../components/Layout";
import { IResetPass } from "../components/types";
import { updateUserPassword } from "../services/api";
import Modal from "../components/modal";

function ChangePassword() {
  const [user, setUser] = useState({
    old_password: "",
    new_password: "",
  });
  const [conPass, setConpass] = useState("");
  const [passError, setPassError] = useState({
    error: "",
    show: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  function handleconfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setConpass(value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (conPass === user.new_password) {
      setPassError({ ...passError, error: "", show: false });
      handleChangePass(user);
    } else {
      setPassError({ ...passError, error: "password not match", show: true });
    }
  }
  async function handleChangePass(user: IResetPass) {
    try {
      console.log(user);
      const response = await updateUserPassword(user);
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
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">
            Old Password
            <input
              type="text"
              id="old_password"
              name="old_password"
              value={user.old_password}
              placeholder="Old Password"
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="password">
            New Password
            <input
              type="text"
              id="new_password"
              name="new_password"
              value={user.new_password}
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
export default ChangePassword;
