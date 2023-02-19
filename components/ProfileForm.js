import React, {useState, useMemo, useCallback} from "react";

const defaultFormValue = {
    nom: "",
    prenom: "",
    mail: "",
    numero: "",
    genre: "",
}

function ProfileForm() {
    const[formValue, setFormValue] = useState(defaultFormValue);

    const {nom, prenom, mail, numero, genre} = useMemo(() =>formValue, [formValue]);

    const handleChange = useCallback((event) => {
        setFormValue(prevForm => ({
            ...prevForm,
            [event.target.id] : event.target.value,
        }))
    }, []);

    /*
    function written in case we decide to handle the number type on our own to parse data (html number type accepts - and + which can be problematic depending on the format when want to save)
     */
    const numIsInRightFormat = useCallback(num => {
        const regex = /[`!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?~]| [a-z]|[A-Z]/;
        return !regex.test(num);
    }, []);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        console.log(formValue);
        setFormValue(defaultFormValue);
    }, [formValue]);
  
  return (
    <form onSubmit={handleSubmit}>
    <h2>Mon profil</h2>
    <input id="nom" value={nom} placeholder="Nom" onChange={handleChange} />
    <input id="prenom" value={prenom} placeholder="Prénom" onChange={handleChange} />
    <input id="mail" value={mail} placeholder="E-mail" onChange={handleChange} />
    <input id="numero" value={numero} placeholder="Numéro" type="number" onChange={handleChange} />
    <select id="genre" onChange={handleChange} value={genre}>
    <option hidden selected >Genre</option>
    <option>Homme</option>
    <option>Femme</option>
    </select>
    <button type="submit"> Continuer</button>
    </form>
  );
}

export default ProfileForm;
