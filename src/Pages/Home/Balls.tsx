import {Bodies, Body, Engine, Mouse, Render, Runner, Vector, World} from "matter-js";
import {useEffect, useRef, useState} from "react";
import * as Matter from "matter-js";


function Balls({currentText}) {

    const spritePaths = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ]

    const [empty, setEmpty] = useState(false)


    const scene = useRef()
    const engine = useRef(Engine.create())
    const runner = useRef(Runner.create());

    const cw= useRef(innerWidth)
    const ch = useRef(innerHeight-100)
    const door = useRef(Bodies.rectangle(cw.current + 10,  ch.current / 2, 25, ch.current, {label: "wall", isStatic: true, render: {fillStyle: "#FFFFFF"}}))


    useEffect(() => {

        const render = Render.create({
            canvas: scene.current,
            engine: engine.current,
            options: {
                width: cw.current,
                height: ch.current,
                wireframes: false,
                background: 'transparent'
            }
        })





            World.add(engine.current.world, [
                Bodies.rectangle(cw.current / 2, -10, cw.current, 20, {label: "wall", isStatic: true, render: {opacity: 0}}),
                Bodies.rectangle(-10, ch.current / 2, 20, ch.current, {label: "wall", isStatic: true, render: {opacity: 0}}),
                Bodies.rectangle(cw.current / 2, ch.current + 10, cw.current, 20, {label: "wall", isStatic: true, render: {opacity: 0}}),
                Bodies.rectangle(cw.current + 10,   ch.current / 2 - 175, 25, ch.current - 175, {label: "wall", isStatic: true, render: {fillStyle: "#FFFFFF"}}),
            ])

            Engine.run(engine.current)
            Runner.run(runner.current, engine.current);
            Render.run(render)

            return () => {
                // Render.stop(render)
                // World.clear(engine.current.world)
                // Engine.clear(engine.current)
                // render.canvas.remove()
                // render.canvas = null
                // render.context = null
                // render.textures = {}
            }
    }, [])

    const [count, setCount] = useState(0)

    useEffect(() => {
        setCount((c) => c+1)
        if (count < 1) {
            return;
        }
        if (count === 30) {
            setCount(1)
            setEmpty(true);
        }


        const ball = Bodies.circle(
            50,
            50,
            50,
            {
                restitution: 0.9,
                friction: 0.005,
                render: {
                    opacity: 0.3, // This controls the transparency
                    sprite: {
                        texture: spritePaths[currentText], // Your texture
                        xScale: 3,
                        yScale: 3,
                    },
                    fillStyle: 'rgba(0, 0, 0, 0)', // Transparent fill
                    strokeStyle: '#FFFFFF', // White outline
                    lineWidth: 3, // Width of the outline
                }
            })
        Body.setVelocity(ball, Vector.create(10,1))
        World.add(engine.current.world, [ball])
    }, [currentText]);

    useEffect(() => {
        const mouse = Mouse.create(scene.current);
        const mouseConstraint = Matter.MouseConstraint.create(engine.current, { mouse });

        World.add(engine.current.world, mouseConstraint);

        // Allow scrolling even when hovering over the canvas
        const handleWheel = (event) => {
            event.stopPropagation(); // Prevent mouse wheel event from propagating
            window.scrollBy(0, event.deltaY); // Manually scroll the window
        };

        scene.current.addEventListener('wheel', handleWheel, { passive: false });

        Matter.Events.on(mouseConstraint, "mousemove", function (event) {
            const { mouse } = event;
            const bodies = Matter.Composite.allBodies(engine.current.world);
            bodies.forEach((body) => {
                if (body.label !== "wall") {
                    body.render.opacity = Matter.Bounds.contains(body.bounds, mouse.position) ? 1 : 0.3;
                }
            });
        });
    }, []);


    useEffect(() => {
        if (empty) {

            World.remove(engine.current.world, door.current);
            Matter.Composite.allBodies(engine.current.world).includes(door.current);
        } else {
            if (!Matter.Composite.allBodies(engine.current.world).includes(door.current)) {
                World.addBody(engine.current.world, door.current)
            }

        }
    }, [door, empty]);



    useEffect(() => {
        const tickHandler = () => {
            const bodies = Matter.Composite.allBodies(engine.current.world);
            bodies.forEach((body) => {
                if (body.type !== "wall") {
                    if (empty) {
                        if (body.position.x > cw.current + 40) {
                            World.remove(engine.current.world, body);
                        } else {
                            Body.applyForce(body, body.position, Vector.create(0.002, 0.001));
                        }
                    }
                }
            });

            if (empty && Matter.Composite.allBodies(engine.current.world).length === 8) {
                setEmpty(false);
            }
        };

        Matter.Events.on(runner.current, "tick", tickHandler);

        return () => {
            Matter.Events.off(runner.current, "tick", tickHandler);
        };
    }, [empty]); // Dependency on empty to re-attach the event





    return (

        <div className={"balls"}>
            <canvas ref={scene} style={{ width: '100%', height: '100%' }} />
        </div>
    )
}

export default Balls