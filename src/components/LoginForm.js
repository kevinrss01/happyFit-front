import React, {useState, useMemo, useCallback} from "react";

const defaultFormValue = {
    mail: "",
    password: "",
    visible: false,
}

function LoginForm() {
    const[formValue, setFormValue] = useState(defaultFormValue);

    const {mail, password, visible} = useMemo(() =>formValue, [formValue]);

    const handleChange = useCallback(({target}) => {
        const {value, id, checked, type} = target;
        setFormValue(prevForm => ({
            ...prevForm,
            [id] : type==="checkbox" ? checked : value,
        }))
    }, [])

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        console.log(formValue);
        setFormValue(defaultFormValue);
    }, [formValue]);

  return (
    <form onSubmit={handleSubmit}>
    <h2>Connexion</h2>
    <input onChange={handleChange} id="mail" type="mail" placeholder="E-mail" value={mail}/>
    <input onChange={handleChange} id="password" type={visible ? "text" : "password"} placeholder="Mot de passe" value={password}/>
    <label htmlFor="visible">
    Afficher le mot de passe
    <input onChange={handleChange} id="visible" placeholder="" value={visible} type="checkbox"/>
    </label>
    <button type="submit"> Connexion</button>
    </form>
  );
}

export default LoginForm;
