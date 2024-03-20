import React from "react";
import "./Square.css";

const Square=(props)=>{
    //default => 메인으로 밖으로 내보낼 수 있게됨?

 
        return(
            <button className='square'
            onClick={()=> {props.onClick()}}>
            {props.value}
            </button>
        )
}
export default Square;