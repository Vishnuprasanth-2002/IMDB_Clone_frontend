import { Link, Navigate } from "react-router-dom";

interface IModal {
  msg: string;
}
const Modal: React.FC<IModal> = ({ msg }) => {
  return (
    <dialog open>
      <article>
        <header>
          <a href="#close" aria-label="Close" className="close"></a>
          {msg}
        </header>
        <p>{msg}</p>
        <footer>
          <Link to="/">
            <button role="button">Confirm</button>
          </Link>
        </footer>
      </article>
    </dialog>
  );
};
export default Modal;
