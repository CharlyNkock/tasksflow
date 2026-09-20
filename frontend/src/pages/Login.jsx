import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('login/', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/tasks');
    } catch (err) {
      setError('Identifiants incorrects.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-tabs">
          <span className="auth-tab active">Se connecter</span>
          <Link to="/register" className="auth-tab">S'inscrire</Link>
        </div>
        <h1 className="auth-title">Content de te revoir</h1>
        <form onSubmit={handleSubmit}>
          <input className="auth-field" type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="auth-field" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="auth-btn" type="submit">Se connecter</button>
        </form>
        {error && <p className="auth-error">{error}</p>}
        <p className="auth-footer">Pas encore de compte ? <Link to="/register">Créer un compte</Link></p>
      </div>
    </div>
  );
}

export default Login;