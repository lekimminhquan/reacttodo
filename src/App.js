
import './App.css';
import './Todo'
import { useEffect, useRef, useState } from 'react';
import Todos from './Todo';
function App() {
  const [todo,setTodo] = useState('')
  return (
  <>
    <div className="form">
        <div className="bodys">
            <p>NEED TO DO</p>
            <input type="text" placeholder="Add a new task" id="add" onChange={(e)=>setTodo(e.target.value)}/>
            <button className='addbutton' >+</button>
            <div className="status" >
                <span id="ALL" >ALL</span>
                <span id="TO DO" >To Do</span>
                <span id="IN PROGRESS" >In Progressing</span>
                <span id="DONE" >Done</span>
                <button className="clearbutton">Clear</button>
            </div>
            <div className="items">
                <ul className="ul">
                  <Todos></Todos>
                </ul> 
            </div> 
        </div>
    </div>
  </>
  );
}

export default App;
