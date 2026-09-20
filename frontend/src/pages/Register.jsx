import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('register/', { username, email, password });
      navigate('/login');
    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifie ton mot de passe (8 caractères minimum).");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-tabs">
          <Link to="/login" className="auth-tab">Se connecter</Link>
          <span className="auth-tab active">S'inscrire</span>
        </div>
        <h1 className="auth-title">Créer un compte</h1>
        <form onSubmit={handleSubmit}>
          <input className="auth-field" type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="auth-field" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="auth-field" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="auth-btn" type="submit">Créer un compte</button>
        </form>
        {error && <p className="auth-error">{error}</p>}
        <p className="auth-footer">Déjà un compte ? <Link to="/login">Se connecter</Link></p>
      </div>
    </div>
  );
}

export default Register;