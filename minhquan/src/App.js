
import './App.css';
import './Todo'
import { useEffect, useRef, useState } from 'react';
import Todos from './Todo';
import axios from 'axios';
function App() {
  const [todo,setTodo] = useState('')
  const [task,setTask] =useState([])
    const getapitask = async ()=>{
        await axios.get('https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1')
        .then((res) =>{
        res.data.map((item)=>{
        setTask((e)=>[...e,item])
      })
    })
  }
  const postapi = async (todo)=>{
    await axios.post('https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1',{
      item:todo,
      status:'TO DO',
    })
  }
  useEffect(()=>{
    setTask([])
    getapitask()
  },[])
  return (
  <>
    <div className="form">
        <div className="bodys">
            <p>NEED TO DO</p>
            <input type="text" placeholder="Add a new task" id="add" onChange={(e)=>setTodo(e.target.value)}/>
            <button className='addbutton' onClick={()=>postapi(todo)}>+</button>
            <div className="status" >
                <span id="ALL" >ALL</span>
                <span id="TO DO" >To Do</span>
                <span id="IN PROGRESS" >In Progressing</span>
                <span id="DONE" >Done</span>
                <button className="clearbutton">Clear</button>
            </div>
            <div className="items">
                <ul className="ul">
                  <Todos task={task}></Todos>
                </ul> 
            </div> 
        </div>
    </div>
  </>
  );
}

export default App;
