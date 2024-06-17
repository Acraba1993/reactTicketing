import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';
import { AuthContext} from '../contexts/AuthContext';
import { loginStyles } from '../assets/styles/LoginStyles'; // Importamos los estilos


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);
  const { token, isAdmin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginMutation({
        variables: {
          loginInput: {
            email,
            password
          }
        }
      });

      const { token, user } = data.login;
      login(user, token);

      console.log('Login exitoso:', data.login);
      setSuccess('Login exitoso');
      setError('');
      navigate('/home'); // Redirigir a la página Home
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión');
      setSuccess('');
    }
  };

  return (
    <div style={loginStyles.container}>
      <h2 style={loginStyles.title}>Iniciar Sesión</h2>
      {loading && <p style={loginStyles.message}>Cargando...</p>}
      {error && <p style={loginStyles.message}>{error}</p>}
      {success && <p style={loginStyles.message}>{success}</p>}
      <form onSubmit={handleSubmit} style={loginStyles.form}>
        <div style={loginStyles.formGroup}>
          <label style={loginStyles.label}>Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={loginStyles.input}
            required
          />
        </div>
        <div style={loginStyles.formGroup}>
          <label style={loginStyles.label}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={loginStyles.input}
            required
          />
        </div>
        <button type="submit" style={loginStyles.button}>Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
