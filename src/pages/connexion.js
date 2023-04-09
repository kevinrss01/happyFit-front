import LoginForm from "../components/LoginForm";

export default function Connexion() {
  return (
    <div
      style={{
        padding: 30,
        backgroundImage: "linear-gradient(to right, #1d1e27, #111111)",
        margin: "auto",
        width: "100%",
        height: "75%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "scale(1.2)",
      }}
    >
      <LoginForm />
    </div>
  );
}
