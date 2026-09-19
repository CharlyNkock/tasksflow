import { useState } from "react";
import {useNavigate} from "react-router-dom";
import api from "../api";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('login/', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/tasks');            
        }catch (err) {
            setError('identifiants incorrects')
        }
    };
    return (
        <div>
            <h2> Connexion</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="nom utilisateur" value={username} onChange={(e) =>setUsername(e.target.value)} />
                <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">se connecter</button>
            </form>
            {error && <p style={{ color: 'red' }} >{error}</p>}
        </div>
    );
}

export default Login;