import { Navbar } from "./Navbar";

const deniedComponents = ["Inscription", "Connexion"];

const componentDeniedForNavbar = (component) => {
  const [Function, ...rest] = component.toString().split("(");
  const name = Function.substring(9, Function.length).trim();
  return deniedComponents.includes(name);
};

export default function CustomNavbar({ children, component }) {
  const isDenied = componentDeniedForNavbar(component);
  if (isDenied) return <>{children}</>;

  return <Navbar>{children}</Navbar>;
}
