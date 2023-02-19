import React, {useState, useCallback} from "react";

const defaultQuestions = {
    question1 : [
        {text: "Débutant", selected: false},
        {text: "Intermédiaire", selected: false},
        {text: "Expert", selected: false},
    ],
question2 : [
        {text: "Perte de poids", selected: false},
        {text: "Prise de masse", selected: false},
        {text: "Remise en forme", selected: false},
],
question3 : [
        {text: "30 minutes", selected: false},
        {text: "1 heure", selected: false},
        {text: "1h30", selected: false},
        {text: "2 heures", selected: false},
],
question4 : [
        {text: "option 1", selected: false},
        {text: "option 2", selected: false},
        {text: "option 3", selected: false},
        {text: "option 4", selected: false},

],
question5 : [
        {text: "option 1", selected: false},
        {text: "option 2", selected: false},
],
}

const selectedStyle = {
    backgroundColor: "black",
    color: "white"
}

const defaultStyle = {
    backgroundColor: "inherit",
    color: "inherit"
}

function App() {
    const [questions, setQuestions] = useState(defaultQuestions);

    const handleClick = useCallback((question, value) => {
        setQuestions(prevQuestions => ({
            ...prevQuestions,
            [question] : prevQuestions[question].map(({text, selected}) => ({
                text,
                selected: !selected && text === value,
            }))
        }))
    }, []);

  return (
    <div>
        {
            Object.keys(questions).map(key => <div>
            <h2>{key}</h2>
            {questions[key].map(({text, selected}) => <button onClick={() => handleClick(key, text)} style={selected ? selectedStyle : defaultStyle}>{text}</button>)}
            </div>)
        }
    </div>
  );
}

export default App;
