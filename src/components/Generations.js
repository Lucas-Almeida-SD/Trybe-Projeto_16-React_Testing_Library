import React from 'react';
import { Link } from 'react-router-dom';
import './generations.css'

class Generations extends React.Component {
  constructor() {
    super();
    this.state = {
      generations: null,
    };
    this.renderGenerationsList = this.renderGenerationsList.bind(this);
  }
  getGenerationsAtAPI() {
    const url = 'https://pokeapi.co/api/v2/generation/';
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ generations: data.results }))
      .catch((error) => console.log(error));
  }

  renderGenerationsList() {
    const { generations } = this.state;
    if (generations) {
      return (
          <ul>
            {generations.map((e, index) => {
            const generationName = e.name.replace('-', ' ').toUpperCase();
            return (
              <Link 
                to={`/Trybe-Projeto_16-React_Testing_Library/generation/${index + 1}`}
                key={e.name}
              >
                <li>{generationName}</li>
              </Link>
            );
            })}
          </ul>
      );
    }
  }

  componentDidMount() {
    this.getGenerationsAtAPI();
  }

  render() {
    const { renderGenerationsList } = this;
    return (
      <section className="generations-section">
        <h2>Generations</h2>
          {renderGenerationsList()}
      </section>
    );
  }
}

export default Generations;