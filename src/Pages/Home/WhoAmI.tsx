
import Typed from "../../Typed.tsx";
import {useEffect} from "react";

function WhoAmI({currentText, setCurrentText}) {

    const things = [
        "I'm Mari.",
        "I'm an engineer.",
        "I love coffee.",
        "I need to stop buying cars... (lol)",
        "I wear glasses.",
        "I'm a software developer.",
        "I climb rocks.",
        "I'm starting the robot uprising.",
        "I have great hair?",
        "I love my cats.",
        "I help people.",
        "I'm obnoxiously ambitious.",
        "I'm a student."
    ]


    return (
        <>
            <h1 className="whoami"><Typed flash={false} text={things[currentText]}/></h1>
        </>
    )
}

export default WhoAmI;