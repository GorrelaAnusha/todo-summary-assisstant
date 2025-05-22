import React, { useState } from 'react';
import EditTodoForm from './EditTodoForm';

function TodoList({ todos, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {editingId === todo.id ? (
            <EditTodoForm
              todo={todo}
              onSave={(id, newText) => {
                onEdit(id, newText);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              {todo.text}
              <button onClick={() => setEditingId(todo.id)}>Edit</button>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
