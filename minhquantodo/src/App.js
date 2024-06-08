import "./App.css";
import "./Todo";
import { useEffect, useRef, useState } from "react";
import Todos from "./Todo";
import axios from "axios";

function del() {
  const checkeddel = document.querySelectorAll(".inputchecked:checked");
  checkeddel.forEach((item) => {
    axios
      .delete(
        "https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1/" + item.id
      )
      .catch((err) => {
        alert("bạn submit quá nhanh");
      });
    removeelement(item.id);
  });
}
function removeelement(id) {
  const x = document.getElementById(id);
  console.log(id);
  x.remove();
}

const App = () => {
  const [task, setTask] = useState([]);
  const [tasktodo, setTasktodo] = useState({
    item: "",
    status: "",
    id: 0,
  });

  const getapitask = async () => {
    await axios
      .get("https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1")
      .then((res) => {
        res.data.map((e) => {
          setTask((t) => [...t, e]);
        });
      });
  };

  const postapi = async (e) => {
    if (e.keyCode === 13) {
      if (e.target.value != "") {
        await axios.post('https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1', ({
          item: e.target.value,
          status: 'TO DO',
        }))
          .catch((error) => { alert('bạn đã submit quá nhanh') })
          
        setTask([...task, { item: e.target.value, status: "TO DO", id: task.length +1 }]); 
        console.log(task.length)
        const x = document.getElementById('add').value =''

      }
    }
  };

  useEffect(() => {
    setTask([]);
    getapitask();
  }, [tasktodo]);
  return (
    <div className="form">
      <div className="bodys">
        <p>NEED TO DO</p>
        <input
          type="text"
          placeholder="Add a new task and press 'Enter'"
          id="add"
          onKeyDown={postapi}
        />
        <div className="status">
          <span id="ALL">ALL</span>
          <span id="TO DO">To Do</span>
          <span id="IN PROGRESS">In Progressing</span>
          <span id="DONE">Done</span>
          <button className="clearbutton" onClick={del}>
            Clear
          </button>
        </div>
        <div className="items">
          <ul className="ul">
            {task.map((item, index) => {
              return (
                <li className="firstcome" id={item.id} key={index}>
                  <label>
                    <input
                      type="checkbox"
                      className="inputchecked"
                      id={item.id}
                    />
                    <p className="taskp">{item.item || item}</p>
                    <span className="material-symbols-outlined">edit</span>
                    <select name="statustask" className="roles">
                      <option className="opt" value="TO DO">
                        TO DO
                      </option>
                      <option className="opt" value="IN PROGRESS">
                        IN PROGRESS
                      </option>
                      <option className="opt" value="DONE">
                        DONE
                      </option>
                    </select>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
