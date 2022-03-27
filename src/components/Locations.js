import React from 'react';
import './locations.css';

class Locations extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: null,
      nextLocationsURL: null,
      previousLocationsURL: null,
      error: null,
    }
    this.renderLocationsList = this.renderLocationsList.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.moreLocations = this.moreLocations.bind(this);
  }

  async getLocationsAtAPI(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        locations: data.results,
        nextLocationsURL: data.next,
        previousLocationsURL: data.previous,
      })
      
    } catch(error) {
      this.state({ error: 'erro' })
    }
  }

  moreLocations(moreLoc) {
    const locationUrl = this.state[moreLoc];
    if (locationUrl) {
      this.setState({ locations: null }, () => this.getLocationsAtAPI(locationUrl));
    }
  }

  renderButton(name, nameState) {
    const { moreLocations } = this;
    const previousOrNextURL = this.state[nameState];
    const isDisabled = (previousOrNextURL) ? false : true;
    return (
      <button
        type="button"
        onClick={() => moreLocations(nameState)}
        disabled={ isDisabled }
      >
        {name}
      </button>
    );
  }

  renderLocationsList() {
    const { renderButton } = this;
    const {locations} = this.state;
    if (locations) {
      return (
        <>
          {renderButton('Anterior', 'previousLocationsURL')}
          {renderButton('Próximo', 'nextLocationsURL')}
          <ul>
            {locations.map((e) => {
              const name = e.name.split('-');
              const newName = name.map((word) => 
                (word!== '') ? `${word[0].toUpperCase()}${word.slice(1)}` : ' - '
              );
              return (<li key={e.name}>{newName.join(' ')}</li>)
            })}
          </ul>
        </>
      );
    }
    return (<p>Carregando...</p>)
  }

  componentDidMount() {
    this.getLocationsAtAPI('https://pokeapi.co/api/v2/location/?offset=0&limit=20');
  }

  render() {
    return(
      <section className="locations-section">
        <h2>Locations</h2>
        {this.renderLocationsList()}
      </section>
    );
  }
}

export default Locations;
