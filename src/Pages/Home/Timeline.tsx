import {useEffect, useRef, useState} from "react";


function Timeline() {

    const yearWidth = 1000;
    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024]
    const totalLength = yearWidth*years.length;
    const timelineRef = useRef(null);
    const [x, setX] = useState(0)
    const max = innerWidth;

    const handleMouseMove = (event) => {
        if (timelineRef.current) {
            const rect = timelineRef.current.getBoundingClientRect();
            const mouseX = event.clientX - rect.left; // Get mouse position relative to the timeline
            setX(mouseX > 0 ? mouseX : 0); // Update line width
        }
    };


    useEffect(() => {
        const timeline = timelineRef.current;
        if (timeline) {
            timeline.addEventListener('mousemove', handleMouseMove);
        }
        return () => {
            if (timeline) {
                timeline.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    //total width: 3500px





    return (
        <div ref={timelineRef} className="timeline">
            {x/max}


            {years.map((year, index) => (
                <div
                    key={year}
                    style={{
                        display: 'inline-block',
                        width: `${yearWidth}px`,
                        height: '100%',
                        borderLeft: '3px solid #404040',
                        position: 'absolute',
                        left: `${index * yearWidth -(max/3+totalLength)*x/max + x +max/3}px`,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%', // Adjust as needed for spacing
                            left: '0',
                            width: '100%',
                        }}
                    >
                        {year}
                    </div>
                </div>
            ))}







            <div className = "line"
                style={{
                    position: 'absolute',
                    height: '3px',
                    backgroundColor: '#ffffff',
                    width: `${x}px`, // Set width based on mouse position
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
            />
        </div>
    )
}

export default Timeline;