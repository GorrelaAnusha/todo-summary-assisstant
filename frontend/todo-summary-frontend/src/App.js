/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

/*
import React, { useState } from 'react';
import AddTodoForm from './components/AddTodoForm'; // correct relative path!

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };
 

  return (
    <div>
      <h1>Todo Summary Assistant</h1>
      {/* Pass the function as prop named "onAdd" }
      <AddTodoForm onAdd={addTodo} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>

  );

}

export default App;*/


/*import React, { useState } from 'react';
import AddTodoForm from './components/AddTodoForm';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo Summary Assistant</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;*/


/*import React, { useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList'; // ✅ Import the new component

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo Summary Assistant</h1>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} /> {/* ✅ Use component }
    </div>
  );
}

export default App;*/


/*import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  // Add new todo
  const addTodo = () => {
    if (!newTodoText.trim()) return;
    const newTodo = { id: Date.now(), text: newTodoText.trim() };
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Start editing a todo
  const startEditing = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoText(todo.text);
  };

  // Save edited todo
  const saveEdit = () => {
    setTodos(todos.map(todo => {
      if (todo.id === editTodoId) {
        return { ...todo, text: editTodoText.trim() };
      }
      return todo;
    }));
    setEditTodoId(null);
    setEditTodoText('');
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditTodoId(null);
    setEditTodoText('');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Todo Summary Assistant</h1>

     
      <input
        type="text"
        placeholder="Enter new todo"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addTodo()}
        style={{ width: '70%', padding: 8, marginRight: 8 }}
      />
      <button onClick={addTodo} style={{ padding: '8px 16px' }}>Add Todo</button>

      
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                  style={{ flexGrow: 1, padding: 6 }}
                />
                <button onClick={saveEdit} style={{ marginLeft: 8 }}>Save</button>
                <button onClick={cancelEdit} style={{ marginLeft: 4 }}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ flexGrow: 1 }}>{todo.text}</span>
                <button onClick={() => startEditing(todo)} style={{ marginLeft: 8 }}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: 4 }}>Delete</button>
              </>
            )}
          </li>
        ))}
        {todos.length === 0 && <p>No todos yet, add one above!</p>}
      </ul>

      
      <button disabled style={{ marginTop: 20, padding: '10px 20px' }}>
        Summarize & Send to Slack (Coming Soon)
      </button>
    </div>
  );
}

export default App;*/





import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  // Add new todo
  const addTodo = () => {
    if (!newTodoText.trim()) return;
    const newTodo = { id: Date.now(), text: newTodoText.trim() };
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Start editing a todo
  const startEditing = (todo) => {
    setEditTodoId(todo.id);
    setEditTodoText(todo.text);
  };

  // Save edited todo
  const saveEdit = () => {
    setTodos(todos.map(todo => {
      if (todo.id === editTodoId) {
        return { ...todo, text: editTodoText.trim() };
      }
      return todo;
    }));
    setEditTodoId(null);
    setEditTodoText('');
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditTodoId(null);
    setEditTodoText('');
  };

  // ✅ Send summary to Slack
  const sendSummaryToSlack = async () => {
    const total = todos.length;
    const summaryText = `📝 *Todo Summary*:
- Total Todos: ${total}
- List: ${todos.map(t => t.text).join(', ') || 'None'}`;

    try {
      await fetch('http://localhost:8080/todos/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: summaryText }),
      });
      alert('Summary sent to Slack!');
    } catch (error) {
      console.error('Error sending to Slack:', error);
      alert('Failed to send summary to Slack.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Todo Summary Assistant</h1>

      <input
        type="text"
        placeholder="Enter new todo"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addTodo()}
        style={{ width: '70%', padding: 8, marginRight: 8 }}
      />
      <button onClick={addTodo} style={{ padding: '8px 16px' }}>Add Todo</button>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                  style={{ flexGrow: 1, padding: 6 }}
                />
                <button onClick={saveEdit} style={{ marginLeft: 8 }}>Save</button>
                <button onClick={cancelEdit} style={{ marginLeft: 4 }}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ flexGrow: 1 }}>{todo.text}</span>
                <button onClick={() => startEditing(todo)} style={{ marginLeft: 8 }}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: 4 }}>Delete</button>
              </>
            )}
          </li>
        ))}
        {todos.length === 0 && <p>No todos yet, add one above!</p>}
      </ul>

      <button onClick={sendSummaryToSlack} style={{ marginTop: 20, padding: '10px 20px' }}>
        Summarize & Send to Slack
      </button>
    </div>
  );
}

export default App;

