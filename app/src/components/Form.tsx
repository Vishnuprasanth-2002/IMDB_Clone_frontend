import { useEffect, useState } from "react";
import { IUserAdd } from "./types";
interface IForm {
  handleAddUser: (user: IUserAdd) => void;
  type: string;
  details: IUserAdd;
}
const Form: React.FC<IForm> = ({ handleAddUser, type, details }) => {
  const [user, setUser] = useState<IUserAdd>(details);
  console.log(user);
  const [conPass, setConpass] = useState("");
  const [passError, setPassError] = useState({
    error: "",
    show: false,
  });
  useEffect(() => {
    setUser(details);
  }, [details]);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  function handleconfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setConpass(value);
  }
  function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (conPass === user.user_password) {
      handleAddUser(user);
    } else {
      setPassError({ ...passError, error: "password not match", show: true });
    }
  }
  function handleupdate() {
    handleAddUser(user);
  }
  function handleRefresh(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <>
      <form onSubmit={handleRefresh}>
        <label htmlFor="firstname">Firstname</label>

        <input
          type="text"
          id="first_name"
          name="first_name"
          value={user.first_name}
          placeholder="First name"
          onChange={handleChange}
          required
        />

        <label htmlFor="lastname">Lastname</label>

        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Last name"
          value={user.last_name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email address</label>

        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          placeholder="Email address"
          onChange={handleChange}
          required
        />

        <label htmlFor="username">Username</label>

        <input
          type="text"
          id="user_name"
          name="user_name"
          value={user.user_name}
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone_no"
          name="phone_no"
          value={user.phone_no}
          placeholder="Phone"
          onChange={handleChange}
        />
        {type == "Add" ? (
          <>
            <label htmlFor="password">
              Password
              <input
                type="text"
                id="user_password"
                name="user_password"
                value={user.user_password}
                placeholder="Password"
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
              {passError.show && (
                <p style={{ color: "red" }}>{passError.error}</p>
              )}
            </label>
            <button onClick={handleSubmit}>Submit</button>
          </>
        ) : (
          <button onClick={handleupdate}>Submit</button>
        )}
      </form>
    </>
  );
};
export default Form;
