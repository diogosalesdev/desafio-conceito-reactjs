import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    // DONE
    const response = await api.post('repositories', {
      title: "título",
      url: "título.com",
      techs: "título"
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>   
          <li key={repository.id} >
            <ul>
              <li>{repository.title}</li>     
              <li><b>likes: {repository.likes}</b></li>
            </ul>     
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )} 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
