import './ActionBar.css'
import Typed from '../Typed.tsx'
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

function ActionBar () {

    const [selection, setSelection] = useState([0,0]);

    const location = useLocation().pathname;


    useEffect(() => {
        setSelection([0,0]);
    }, [location]);
    return (

        <div className={"ActionBar"} style={{width: '100%', height: 305}}>

            <div className={"MainBar"} style={{width: '100%', height: 104}}>

                <text className="clickme"><Typed speed={350} text={"(Click Me!)"}/></text>

                <div className={selection[0] != 2 ? 'border' : 'selected-border'}
                     onMouseLeave={selection[0] == 2 ? () => setSelection([2, 0]) : () => setSelection([0])}
                     onMouseOver={selection[0] != 2 ? () => {
                         setSelection([1, 0])
                     } : () => setSelection([2, 0])}
                     onClick={selection[0] != 2 ? () => setSelection([2, 0]) : () => setSelection([1, 0])
                }>
                    <h1>
                        <Typed flash={true} text={'Mari-Rzepka' + location}/>
                    </h1>
                </div>
            </div>
            <div className={"SubBar"}>
                <div className={'closedSubCategory'}
                     onClick={() => {setSelection([2,1])}}
                     style={selection[0] != 2 ? {
                         animationDuration: '0.25s',
                         animationName: selection[0] == 0 ? 'none' : 'none',
                         opacity: selection[0] == 0 ? 0 : 1,
                     } : {}}

                >
                     {selection[0] !== 0 ? <h4><Link to={"/"}><Typed text={'/Home'}/></Link></h4> : ""}
                </div>
                <div className={selection[0] != 2 ? 'closedSubCategory' : 'subCategory'}
                     onClick={() => {setSelection([2,2])}}
                     style={selection[0] != 2 ? {
                         opacity: selection[0] == 0 ? 0 : 1,
                         animationName: selection[0] == 0 ? 'none' : 'showSubCategory',
                         animationDuration: '0.5s',
                     } : {}}
                >
                    {selection[0] !== 0 ? <h4><Link to={"/Projects"}><Typed text={'/Projects/'}/></Link></h4> : ""}
                </div>
                <div className={selection[0] != 2 ? 'closedSubCategory' : 'subCategory'}
                     onClick={() => {setSelection([2,3])}}
                     style={selection[0] != 2 ? {
                         animationDuration: '0.75s',
                         animationName: selection[0] == 0 ? 'none' : 'showSubCategory',
                         opacity: selection[0] == 0 ? 0 : 1,
                     } : {}}
                >
                    {selection[0] !== 0 ? <h4><Link to={"/Goals"}><Typed text={'/Goals/'}/></Link></h4> : ""}
                </div>
                <div className={selection[0] != 2 ? 'closedSubCategory' : 'subCategory'}
                     onClick={() => {setSelection([2,4])}}
                     style={selection[0] != 2 ? {
                         animationDuration: '1s',
                         animationName: selection[0] == 0 ? 'none' : 'showSubCategory',
                         opacity: selection[0] == 0 ? 0 : 1,
                     } : {}}
                >
                    {selection[0] !== 0 ? <h4><Link to={"/About"}><Typed text={'/About Me/'}/></Link></h4> : ""}
                </div>
                <div className={selection[0] != 2 ? 'closedSubCategory' : 'subCategory'}
                     onClick={() => {setSelection([2,5])}}
                     style={selection[0] != 2 ? {
                         animationDuration: '1.25s',
                         animationName: selection[0] == 0 ? 'none' : 'showSubCategory',
                         opacity: selection[0] == 0 ? 0 : 1,
                     } : {}}
                >
                    {selection[0] !== 0 ? <h4><Link to={"/Games"}><Typed text={'/Games/'}/></Link></h4> : ""}
                </div>
            </div>
        </div>
    )
}


export default ActionBar;
