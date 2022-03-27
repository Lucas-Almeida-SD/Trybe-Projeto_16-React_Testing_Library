import React from 'react';
import './generationDetails.css'

class GenerationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pokemons: null,
    }
    this.getGenerationAtAPI = this.getGenerationAtAPI.bind(this);
    this.getPokemonsInfo = this.getPokemonsInfo.bind(this);
    this.generatePokemonURL = this.generatePokemonURL.bind(this);
    this.renderGenerationTitle = this.renderGenerationTitle.bind(this);
    this.renderRegions = this.renderRegions.bind(this);
    this.renderRegionPokemons = this.renderRegionPokemons.bind(this);
  }

  getGenerationAtAPI() {
    const { id } = this.props.match.params;
    const url = `https://pokeapi.co/api/v2/generation/${id}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ data }, () => this.getPokemonsInfo()))
  }

  getPokemonsInfo() {
    const { data } = this.state;
    const { pokemon_species: pokemons } = data;
    const pokemonsInfo = []
    for (let index = 0; index < pokemons.length; index += 1) {
      pokemonsInfo.push({
        name: pokemons[index].name,
        id: pokemons[index].url.split('/')[6],
      })
    }
    const pokemonsInfoSorted = pokemonsInfo.sort((a, b) => {
       return (parseInt(a.id, 10) - parseInt(b.id, 10));
    });
    this.setState({ pokemons: pokemonsInfoSorted })
  }

  renderGenerationTitle() {
    const { data } = this.state;
    if (data) {
      const generationName = data.name.replace('-', ' ').toUpperCase();
      return (<h2>{generationName}</h2>)
    }
    return (<h2>Carregando...</h2>)
  }

  renderRegions() {
    const { adjustName } = this;
    const { data } = this.state;
    if (data) {
      const { main_region: region } = data;
      return (
        <section className="region-section">
          <h3>Main Region</h3>
          <p>{adjustName(region.name)}</p>
        </section>
      );
    }
  }
  
  renderRegionPokemons() {
    const { pokemons } = this.state;
    const { generatePokemonURL, adjustName, adjustId } = this;
    if (pokemons) {
      return (
        <section className="region-pokemons-section">
          <h3>Pokémons</h3>
          {pokemons.map((e) => (
            <div key={e.name} className="pokemon-div">
              <img
                src={generatePokemonURL(e.id)}
                alt={`${adjustName(e.name)} sprite`}
              />
              <p>{`n°${adjustId(e.id)}`}</p>
              <p>{adjustName(e.name)}</p>
              </div>
          ))}
        </section>
      );
    }
  }

  adjustName(name) {
    return (`${name[0].toUpperCase()}${name.slice(1)}`)
  }

  adjustId(id) {
    let newId = id;
    if (id.length === 1) { newId = `00${id}` };
    if (id.length === 2) { newId = `0${id}` };
    return newId;
  }

  generatePokemonURL(id) {
    const newId = this.adjustId(id);
    return (`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${newId}.png`)
  }

  componentDidMount() {
    this.getGenerationAtAPI();
  }

  render() {
    const { renderGenerationTitle, renderRegions, renderRegionPokemons } = this;
    return (
      <section className='generation-details-section'>
        {renderGenerationTitle()}
        {renderRegions()}
        {renderRegionPokemons()}
      </section>
    );
  }
}

export default GenerationDetails;
