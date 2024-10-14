import {useEffect, useState} from "react";

function Typed({text, speed= 150, flash = false}) {

    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [done, setDone] = useState(false);
    const [underscore, setUnderscore] = useState(flash ? "_" : "");



    useEffect(() => {

        let timeout = null;

        if (currentIndex > text.length || !text.includes(currentText)) {
            setDone(false);
            timeout = setTimeout(() => {
                setCurrentText(prevText => prevText.substring(0, prevText.length - 1));
                setCurrentIndex(prevIndex => prevIndex - 1);
            }, Math.random() * speed);

        } else {
            if (currentIndex < text.length) {
                setDone(false);
                timeout = setTimeout(() => {
                    setCurrentText(prevText => prevText + text[currentIndex]);
                    setCurrentIndex(prevIndex => prevIndex + 1);
                }, Math.random() * speed);

            } else {
                    setDone(true);
            }
        }

        return () => clearTimeout(timeout);

    }, [currentIndex, text]);



    if (flash && done) {
        if (underscore === "_") {
            setTimeout(() => {
                setUnderscore("");
            }, 500)
        } else {
            setTimeout(() => {
                setUnderscore("_")
            }, 500)
        }
    }

    return (
            currentText+underscore
    )


}

export default Typed;