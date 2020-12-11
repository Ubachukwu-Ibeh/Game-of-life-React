import React from 'react'

export default function Cell(props) {
    const state = props.data.cellStates[props.data.id];
    
    const changeMyState = () => {
        let newState = state === 'alive' ? 'dead' : 'alive'
        props.data.setCellStates(prevCellStates => ({ ...prevCellStates, [props.data.id]: newState }));
    }
    return (
        <div
        onClick={changeMyState}
        className={props.data.cellStates[props.data.id]}
        >
        </div>
    )
}
