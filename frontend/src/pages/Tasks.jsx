import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { formatRelativeTime } from '../utils';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const navigate = useNavigate();

  const fetchTasks = () => {
    api.get('tasks/').then((response) => setTasks(response.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await api.post('tasks/', { title: newTitle, description: newDescription });
    setNewTitle('');
    setNewDescription('');
    setShowAdd(false);
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

  const todo = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => t.completed);
  const visible = activeTab === 'active' ? todo : done;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">taskflow</div>
        <div className="sidebar-nav-item active">Mes tâches</div>
        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>Se déconnecter</button>
        </div>
      </aside>

      <main className="main-content">
        <div className="tabs-row">
          <button
            className={`tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Actives ({todo.length})
          </button>
          <button
            className={`tab ${activeTab === 'done' ? 'active' : ''}`}
            onClick={() => setActiveTab('done')}
          >
            Terminées ({done.length})
          </button>
        </div>

        <div className="task-list">
          {visible.length === 0 ? (
            <p className="empty-state">
              {activeTab === 'active' ? "rien à faire pour l'instant" : 'aucune tâche terminée'}
            </p>
          ) : (
            visible.map((task) => (
              <div key={task.id} className={`task-row-item ${task.completed ? 'done' : ''}`}>
                <div className="row-main" onClick={() => handleToggle(task)}>
                  <div className="row-icon">{task.completed ? '✓' : '●'}</div>
                  <div className="row-text">
                    <p className="row-title">{task.title}</p>
                    {task.description && <p className="row-description">{task.description}</p>}
                  </div>
                </div>
                <div className="row-footer">
                  <div className="row-status">
                    <span className={`status-pill ${task.completed ? 'done' : 'todo'}`}>
                      {task.completed ? 'Terminé' : 'À faire'}
                    </span>
                    {task.completed && task.completed_at && (
                      <span className="row-meta">{formatRelativeTime(task.completed_at)}</span>
                    )}
                  </div>
                  <button className="row-delete" onClick={() => handleDelete(task.id)}>✕</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <div className="fab-wrap">
        {showAdd && (
          <form className="fab-form" onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Titre de la tâche"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <textarea
              placeholder="Description (optionnelle)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button type="submit">Ajouter</button>
          </form>
        )}
        <button className="fab-btn" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Annuler' : '+ Nouvelle tâche'}
        </button>
      </div>
    </div>
  );
}

export default Tasks;