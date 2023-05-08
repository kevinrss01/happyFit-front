import { Navbar } from "../components/Navbar";

//Test commit 2
export default function Reglages() {
  return (
    <Navbar>
      <div className="setting-container">
        <h1>Paramètres</h1>
        <div className="personal-info-container">
          <h2>Informations personnelles</h2>
        </div>
        <div className="email-container">
          <h2>Adresse email</h2>
        </div>
        <div className="password-container">
          <h2>Mot de passe</h2>
        </div>
      </div>
    </Navbar>
  );
}
