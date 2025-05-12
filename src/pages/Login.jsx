// frontend/src/pages/Login.jsx
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Email es obligatorio'),
    password: Yup.string()
      .min(6, 'Contraseña mínima de 6 caracteres')
      .required('Contraseña es obligatoria'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate('/');
      } catch (err) {
        alert('Error al iniciar sesión');
      }
    },
  });

  return (
    <div className="form-container">
      <h2 className="form-title">Iniciar Sesión</h2>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="form-input"
          />
          {formik.errors.email && <span className="form-error">{formik.errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="form-input"
          />
          {formik.errors.password && <span className="form-error">{formik.errors.password}</span>}
        </div>

        <button type="submit" className="form-button">Entrar</button>
      </form>
    </div>
  );
};

export default Login;