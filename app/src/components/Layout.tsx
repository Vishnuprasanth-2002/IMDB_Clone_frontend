import { useEffect } from "react";
import Nav from "./Nav";

interface IProps {
  title?: string;
  children: React.ReactNode;
}
const Layout = (props: IProps) => {
  useEffect(() => {
    if (props.title) {
      document.title = props.title;
    }
  }, [props.title]);

  return (
    <>
      <Nav />
      <main className="container">{props.children}</main>
    </>
  );
};

export default Layout;
