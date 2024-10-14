import WhoAmI from "./WhoAmI.tsx";
import "./Home.css";
import Balls from "./Balls.tsx";
import {useEffect, useState} from "react";
import Timeline from "./Timeline.tsx";


function Home() {

    const [currentText, setCurrentText] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentText === 12) {
                setCurrentText(0);
            } else {
                setCurrentText((curr) => curr + 1);
            }
        }, 5000)

        return () => clearTimeout(timeout);
    }, [currentText]);



    return (
        <div className={"home-container"}>
            <div className={"extra-wall"} />
            <WhoAmI currentText={currentText}/>
            <Balls currentText={currentText}/>
            <div className={"intro"}>
                Hi, yes, I am Mari, and im sure your tired of reading that by now
            </div>
            <Timeline />
        </div>
    )


}

export default Home;