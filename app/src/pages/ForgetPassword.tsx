import { useState } from "react";
import { forgetPasswordApi } from "../services/api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  function handlechange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleOtpApi(email);
  }
  async function handleOtpApi(email: string) {
    try {
      const payload = {
        email: email,
      };
      const response = await forgetPasswordApi(payload);
      console.log(response.data.user_id);
      navigate(`/otp/${response.data.user_id}`);
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <>
      <Layout title="forget">
        <h1>forget Password</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handlechange}
            required
          />
          <button type="submit">submit</button>
        </form>
      </Layout>
    </>
  );
}
export default ForgetPassword;
