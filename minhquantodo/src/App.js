import "./App.css";
import "./Todo";
import { createElement, useEffect, useState } from "react";
import axios from "axios";

function del() {
  const checkeddel = document.querySelectorAll(".inputchecked:checked");
  checkeddel.forEach((item) => {
    axios.delete(
      "https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1/" + item.id)
      .then((res) => {
        removeelement(item.id);
      })

  });
}
function removeelement(id) {
  const x = document.getElementById(id);
  console.log(id);
  x.remove();
}

const App = () => {
  const [task, setTask] = useState([]);
  const [roles, setRole] = useState(Number)

  const getapitask = async () => {
    await axios
      .get("https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1")
      .then((res) => {
        res.data.map((e) => {
          setTask((t) => [...t, e]);
        });
      });
  };
  const getapitasktodo = async () => {
    await axios
      .get("https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1")
      .then((res) => {
        res.data.map((e) => {
          if (e.status == 'TO DO') {
            setTask((t) => [...t, e]);
          }
        });
      });
  };
  const getapitaskinprogress = async () => {
    await axios
      .get("https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1")
      .then((res) => {
        res.data.map((e) => {
          if (e.status == "IN PROGRESS") {
            setTask((t) => [...t, e]);
            console.log(e.status)
          }
        });
      });
  };
  const getapitaskdone = async () => {
    await axios
      .get("https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1")
      .then((res) => {
        res.data.map((e) => {
          if (e.status == "DONE") {
            setTask((t) => [...t, e]);
          }
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

        setTask([...task, { item: e.target.value, status: "TO DO", id: task.length + 1 }]);
        document.getElementById('add').value = ''

      }
    }
  };
  const edit = (id) => {
        task.map((item) => {
          if (item.id == id) {
            item.key = true
          }
          setTask([...task])
        })
      }

  const editlisten = async (e) => {
    if (e.keyCode == 13) {
      if (e.target.value != "") {
        axios.put('https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1/' + e.target.id, {
          item: e.target.value,
        })
        task.map((item) => {
          if (item.id == e.target.id) {
            item.key = false
            item.item = e.target.value
          }

        })
        setTask([...task])
      }
      else {
        task.map((item) => {
          if (item.id == e.target.id) {
            item.key = false
          }

        })
        setTask([...task])
      }
    }
  }


  const clearshowrole = () => {
    const clear = document.querySelectorAll('.role')
    clear.forEach((clears) => {
      clears.style.color = '#000'
    })
  }

  const chooserole = () => {
    switch (roles) {
      case 0: {
        clearshowrole()
        const all = document.getElementById("ALL")
        all.style.color = 'rgb(188, 188, 255)'
        break
      }
      case 1: {
        clearshowrole()
        const all = document.getElementById("TO DO")
        all.style.color = 'rgb(188, 188, 255)'
        break
      }
      case 2: {
        clearshowrole()
        const all = document.getElementById("IN PROGRESS")
        all.style.color = 'rgb(188, 188, 255)'
        break
      }
      case 3: {
        clearshowrole()
        const all = document.getElementById("DONE")
        all.style.color = 'rgb(188, 188, 255)'
        break
      }
    }
  }
  const showseleterole = (statusname, value) => {
    if (statusname == value) {
      return true
    }
    else {
      return false
    }
  }

  const setrole = async (e) => {
    await axios.put('https://6641d7633d66a67b34352311.mockapi.io/api/todolist/1/' + e.target.id, {
      status: e.target.value
    })
    task.map((item) => {
      if (item.id == e.target.id) {
        item.status = e.target.value
      }
    })
    setTask([...task])
  }
  useEffect(() => {
    switch (roles) {
      case 0: {
        setTask([])
        getapitask()
        chooserole()
        break
      }
      case 1: {
        setTask([]);
        getapitasktodo();
        chooserole()
        break
      }
      case 2: {
        setTask([]);
        getapitaskinprogress()
        chooserole()
        break
      }
      case 3: {
        setTask([]);
        getapitaskdone()
        chooserole()
        break
      }
    }
  }, [roles]);
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
          <span id="ALL" className="role" onClick={() => setRole(0)}>ALL</span>
          <span id="TO DO" className="role" onClick={() => setRole(1)}>To Do</span>
          <span id="IN PROGRESS" className="role" onClick={() => setRole(2)}>In Progressing</span>
          <span id="DONE" className="role" onClick={() => setRole(3)}>Done</span>
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
                    {item.key ? <input className="add2" onKeyDown={editlisten} id={item.id} defaultValue={item.item}></input> : <p className="taskp" id={item.id}>{item.item}</p>}
                    <span className="material-symbols-outlined" onClick={() => edit(item.id)} >edit</span>
                    <select name="statustask" className="roles" id={item.id} onChange={setrole}>
                      <option className="opt" value="TO DO" id={item.id} selected={showseleterole(item.status, 'TO DO')}>
                        TO DO
                      </option>
                      <option className="opt" value="IN PROGRESS" id={item.id} selected={showseleterole(item.status, 'IN PROGRESS')}>
                        IN PROGRESS
                      </option>
                      <option className="opt" value="DONE" id={item.id} selected={showseleterole(item.status, 'DONE')}>
                        DONE
                      </option>
                    </select>
                  </label>
                  <p className="line"></p>
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
