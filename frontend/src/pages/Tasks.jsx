import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();

  const fetchTasks = () => {
    api.get('tasks/').then((response) => {
      setTasks(response.data);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await api.post('tasks/', { title: newTitle });
    setNewTitle('');
    fetchTasks();
  };

  const handleToggle = async (task) => {
    await api.patch(`tasks/${task.id}/`, { completed: !task.completed });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await api.delete(`tasks/${id}/`);
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Mes tâches</h2>
      <button onClick={handleLogout}>Se déconnecter</button>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => handleToggle(task)}
              style={{
                cursor: 'pointer',
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </span>
            <button onClick={() => handleDelete(task.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;