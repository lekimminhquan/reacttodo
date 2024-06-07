import { useEffect, useState } from 'react';
import App from './App';
import './App.css';
import memo from 'react';
import axios from 'axios';

function Todos(props) {

    return (
        props.task.map((item) => {
            console.log(item.id)
            return (
                <li className='firstcome' id={item.id} key={item.id}>
                    <label>
                        <input type="checkbox" className='inputchecked' id={item.id} />
                        <p className="taskp">{item.item || item}</p>
                        <span className="material-symbols-outlined" >edit</span>
                        <select name="statustask" className="roles" >
                            <option className="opt" value="TO DO">TO DO</option>
                            <option className="opt" value="IN PROGRESS">IN PROGRESS</option>
                            <option className="opt" value="DONE">DONE</option>
                        </select>
                    </label>
                </li>
            )
        })
    )
}
export default Todos