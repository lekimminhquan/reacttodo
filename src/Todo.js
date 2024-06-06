import { useEffect, useState } from 'react';
import App from './App';
import './App.css';
import memo from 'react';
import axios from 'axios';

function Todos(){  
    const [task,setTask] =useState([])
    const getapitask = async ()=>{
        await axios.get('https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1')
        .then((res) =>{
        res.data.map((item)=>{
        setTask((e)=>[...e,item])
      })
    })
  }
  function cleartask(){
    setTask([])
  }
    useEffect(()=>{
        getapitask()
    },[])
    return(
       task.map((item)=>{
        return(
            <li className='firstcome'> 
                <label>  
                    <input type="checkbox" className='inputchecked'/>
                    <p className="taskp">{item.item}</p>
                    <span className="material-symbols-outlined" >edit</span>
                    <select name="statustask"  className="roles" >
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