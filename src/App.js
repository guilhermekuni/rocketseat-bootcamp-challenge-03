import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const getRepositories = async () => {
    const response = await api.get('repositories');
    setRepositories(response.data);
  };

  useEffect(() => {
    getRepositories();
  }, []);

  const handleAddRepository = async () => {
    const newRepository = {
      id: Date.now(),
      url: 'https://github.com/guilhermekuni',
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    };

    const response = await api.post('repositories', newRepository);

    setRepositories([...repositories, response.data]);
  }

  const handleRemoveRepository = async (id) => {
    await api.delete(`repositories/${id}`);
    
    const updatedArray = repositories.filter(item => item.id !== id);

    setRepositories(updatedArray);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(item => (
            <li key={item.id}>
              {item.title}

              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
