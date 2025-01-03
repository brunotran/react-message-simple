import React, { useRef, useState } from "react";
import { MessageInt } from "./model";
import Message from "./components/Message";

const App: React.FC = () => {
    // useRef() pour récupérer ce qui est tapé dans le #inputMessage
    // const [ex, setEx] = useState("coucou");
    // const inputMessage = useRef(2);
    const inputMessage = useRef<HTMLInputElement | null>(null);

    const [messData, setMessData] = useState<MessageInt[]>([]);
    // MessageInt est un objet, mais dans le useState() on déclare que c'est un tableau ? donc non.
    // Ce qu'on veut c'est un tableau qui renferme des objets MessageInt <MessageInt[]>

    // messData = [
    //     { id: 1, message: "xxx", date: 111212 },
    //     { id: 1, message: "xxx", date: 111212 },
    //     { id: 1, message: "xxx", date: 111212 },
    // ];

    // setMessData("23") // erreur car string
    // setMessData({
    // }) // aussi erreur car objet
    // setMessData([
    //     {
    //         id: 23,
    //         message: "Coucou",
    //         date: 34434566,
    //     },
    // ]);

    //fonction submit form
    const handleSubmit = (e: any) => {
        e.preventDefault();

        // logique d'envoi des données
        if (inputMessage) {
            const mess: MessageInt = {
                id: Math.round(Math.random() * Date.now()), // id aléatoire round
                message: inputMessage?.current?.value, //mettre ? et déclarer undefined dans l'interface
                date: Date.now(),
            };
            setMessData((prevData) => [...prevData, mess]); // IMPORTANT cette fonction incrémente un tableau. On reprendre notre tableau, on le casse et on ajoute un nouveau message mess
        }

        // inputMessage.current.value = ""; // // vider le inputMessage, reset du useRef
        (document.getElementById("inputMessage") as HTMLInputElement).value = "";
    };
    return (
        <div>
            <h2>Poster un message</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" placeholder="Entrez un message" id="inputMessage" ref={inputMessage} />
                <input type="submit" value="Envoyer" />
            </form>
            <h2>Liste des messages</h2>
            <div>
                {messData?.map((mess) => (
                    <Message mess={mess} messData={messData} setMessData={setMessData} key={mess.id} /> // on passe la fonction setMessData au composant enfant Message
                ))}
            </div>
        </div>
    );
};

export default App;
