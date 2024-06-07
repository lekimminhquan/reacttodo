import './App.css';
import './Todo'
import { useEffect, useRef, useState } from 'react';
import Todos from './Todo';
import axios from 'axios';

function del() {
  const checkeddel = document.querySelectorAll('.inputchecked:checked')
  checkeddel.forEach((item) => {
    axios.delete('https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1/' + item.id)
      .catch(err => { alert('bạn submit quá nhanh') })
    removeelement(item.id)

  })
}
function removeelement(id) {
  const x = document.getElementById(id)
  console.log(id)
  x.remove()
}
function App() {
  const [todo, setTodo] = useState('')
  const [task, setTask] = useState([])
  const [tasktodo, setTasktodo] = useState([])

  const getapitask = async () => {
    await axios.get('https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1')
      .then((res) => {
        res.data.map((item) => {
          setTask((e) => [...e, item])
        })
      })
  }
  const postapi = async (todo) => {
    if (todo != "") {
      await axios.post('https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1', {
        item: todo,
        status: 'TO DO',
      })
        .catch((error) => { alert('bạn đã submit quá nhanh') })
      const clearinut = document.getElementById('add')
      clearinut.value = ""
      setTasktodo(...tasktodo,todo)
      setTask([...task,todo])
      setTodo('')
    }
  }


  useEffect(() => {
    setTask([])
    getapitask()
  }, [tasktodo])
  return (
    <>
      <div className="form">
        <div className="bodys">
          <p>NEED TO DO</p>
          <input type="text" placeholder="Add a new task" id="add" onChange={(e) => setTodo(e.target.value)} />
          <button className='addbutton' onClick={() => postapi(todo)}>+</button>
          <div className="status" >
            <span id="ALL" >ALL</span>
            <span id="TO DO" >To Do</span>
            <span id="IN PROGRESS" >In Progressing</span>
            <span id="DONE" >Done</span>
            <button className="clearbutton" onClick={del}>Clear</button>
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
