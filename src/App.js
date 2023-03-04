import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("all");
  const input = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3001/get_info").then(res => res.json()).then(data => {
      setTaskList(data.tasks || [])
    })
  }, []);


  const saveToFile = (list) => {
    setTaskList(list || [])
    fetch("http://localhost:3001/save_info", {
      method: "POST",
      body: JSON.stringify({
        tasks: list,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      if(res.status === 200) {
        input.current.value = ''
      }
    })
  }

    
  const handleSubmit = (e) => {
    e.preventDefault();
    const listToUpdate = [...taskList];
    const newTask = {
      id: taskList.length,
      task: input.current.value,
      isChecked: false
    }
    listToUpdate.push(newTask)
    saveToFile(listToUpdate);
  }
  // spread va rest, lifecycle react
  const handleToggle = (i) => {
    const listToUpdate = [...taskList];
    listToUpdate[i].isChecked = !listToUpdate[i].isChecked;
    saveToFile(listToUpdate);
  }

  return (
    <div className="App">
        <div className='submit-container'>
          <input id="field" type="text" placeholder='New-task' ref={input}/>
          <button id="submit" onClick={handleSubmit}>submit</button>
        </div>
        <div className='tabs-bar'>
          <div className={`btn ${filter === 'all' ? 'active' : ''}`} id="btn1" onClick={() => setFilter("all")}>All</div>
          <div className={`btn ${filter === false ? 'active' : ''}`} id="btn2" onClick={() => setFilter(false)}>Active</div>
          <div className={`btn ${filter === true ? 'active' : ''}`} id="btn3" onClick={() => setFilter(true)}>Done</div>
        </div>
        <div className='item-list'>
          {taskList.filter(el => {
            if (filter === 'all') {
              return true
            }

            return el.isChecked === filter;
          }).map(item => (
            <div className='item' key={item.id}>
              <div className={`checkbox ${item.isChecked ? 'checked' : ''}`} onClick={() => handleToggle(item.id)}/>
              <span>{item.task}</span>
            </div>
          ))}
        </div>
    </div>
  );
}

export default App;