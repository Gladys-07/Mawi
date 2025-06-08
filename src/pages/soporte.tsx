import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Soporte: React.FC = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    descripcion: ''
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/CSoftware/api/soporte', form);
      setShowModal(true);
    } catch (error) {
      alert('Error al enviar la solicitud. Intenta de nuevo.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#222',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 650,
          minWidth: 400,
          background: '#232323',
          borderRadius: 18,
          padding: '2rem 2.5rem',
          boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}
      >
        <h1 style={{
          textAlign: 'center',
          color: '#fff',
          fontSize: 26,
          fontWeight: 700,
          marginBottom: 2,
          letterSpacing: 1
        }}>
          Soporte 
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#bdbdbd',
          fontSize: 15,
          marginBottom: 10
        }}>
          ¿Tienes algún problema o duda? Completa el formulario y nuestro equipo te contactará.
        </p>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ marginBottom: 2 }}>Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              placeholder="Escribe..."
              style={{
                background: '#5a5a5a',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 14px',
                fontSize: 15,
                outline: 'none'
              }}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ marginBottom: 2 }}>Correo electrónico</label>
            <input
              name="correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
              required
              placeholder="Escribe..."
              style={{
                background: '#5a5a5a',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 14px',
                fontSize: 15,
                outline: 'none'
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ marginBottom: 2 }}>Asunto</label>
            <input
              name="asunto"
              value={form.asunto}
              onChange={handleChange}
              required
              placeholder="Escribe..."
              style={{
                background: '#5a5a5a',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 14px',
                fontSize: 15,
                outline: 'none'
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ marginBottom: 2 }}>Descripción del problema</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            required
            placeholder="Escribe..."
            rows={3}
            style={{
              background: '#5a5a5a',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '10px 14px',
              fontSize: 15,
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: '#388e3c',
            color: '#fff',
            padding: '13px 0',
            border: 'none',
            borderRadius: 10,
            fontSize: 17,
            fontWeight: 600,
            marginTop: 6,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#2e7031')}
          onMouseOut={e => (e.currentTarget.style.background = '#388e3c')}
        >
          Enviar datos
        </button>
      </form>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: '#222',
              padding: 32,
              borderRadius: 12,
              textAlign: 'center',
              minWidth: 300
            }}
          >
            <h2>¡Solicitud enviada!</h2>
            <p>En menos de 24h nos pondremos en contacto contigo a través del correo proporcionado.</p>
            <button
              style={{
                marginTop: 16,
                background: '#388e3c',
                color: '#fff',
                padding: '10px 24px',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={() => {
                const userId = sessionStorage.getItem("userId"); // o el nombre que uses
                if (userId) {
                  navigate('/cards');
                } else {
                  navigate('/login'); // o la ruta de tu login
                }
              }}
            >
              Ir al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Soporte;