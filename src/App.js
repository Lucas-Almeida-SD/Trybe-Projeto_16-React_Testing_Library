import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import {
  About,
  FavoritePokemons,
  NotFound,
  Pokedex,
  PokemonDetails,
} from './components';

import {
  readFavoritePokemonIds,
  updateFavoritePokemons,
} from './services/pokedexService';

import pokemons from './data';

import './App.css';
import Locations from './components/Locations';
import Generations from './components/Generations';
import GenerationDetails from './components/GenerationDetails';

class App extends Component {
  static setIsPokemonFavoriteById() {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});

    return isPokemonFavorite;
  }

  constructor(props) {
    super(props);
    this.state = { isPokemonFavoriteById: App.setIsPokemonFavoriteById() };
  }

  onUpdateFavoritePokemons(pokemonId, isFavorite) {
    updateFavoritePokemons(pokemonId, isFavorite);

    this.setState(({ isPokemonFavoriteById: App.setIsPokemonFavoriteById() }));
  }

  renderPokedex() {
    const { isPokemonFavoriteById } = this.state;

    return (
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />
    );
  }

  renderPokemonDetails(match) {
    const { isPokemonFavoriteById } = this.state;

    return (
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
          this.onUpdateFavoritePokemons(pokemonId, isFavorite)
        ) }
      />
    );
  }

  renderRoutes() {
    const { isPokemonFavoriteById } = this.state;
    const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavoriteById[id]);

    return (
      <Switch>
        <Route
          exact
          path="/Trybe-Projeto_16-React_Testing_Library"
          render={ ({ match }) => this.renderPokedex(match) }
        />
        <Route
          exact
          path="/Trybe-Projeto_16-React_Testing_Library/pokemons/:id"
          render={ ({ match }) => this.renderPokemonDetails(match) }
        />
        <Route
          exact
          path="/Trybe-Projeto_16-React_Testing_Library/favorites"
          render={ () => <FavoritePokemons pokemons={ favoritePokemons } /> }
        />
        <Route
          exact
          path="/Trybe-Projeto_16-React_Testing_Library/about"
          component={ About }
        />
        <Route
          exact
          path="/Trybe-Projeto_16-React_Testing_Library/locations"
          component={ Locations }
        />
        <Route
          exact
          path="/Trybe-Projeto_16-React_Testing_Library/generations"
          component={ Generations }
        />
        <Route
          exact
          path="/Trybe-Projeto_16-React_Testing_Library/generation/:id"
          render={(props) => <GenerationDetails {...props} /> }
        />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Pokédex</h1>
        <nav>
          <Link
            className="link"
            to="/Trybe-Projeto_16-React_Testing_Library"
          >
            {`Home`}
          </Link>
          <Link
            className="link"
            to="/Trybe-Projeto_16-React_Testing_Library/about"
          >
            {`About`}
          </Link>
          <Link
            className="link"
            to="/Trybe-Projeto_16-React_Testing_Library/favorites"
          >
            {`Favorite Pokémons`}
          </Link>
          <Link
            className="link"
            to="/Trybe-Projeto_16-React_Testing_Library/locations"
          >
            { `Locations` }
          </Link>
          <Link
            className="link"
            to="/Trybe-Projeto_16-React_Testing_Library/generations"
          >
            { `Generations` }
          </Link>
        </nav>
        {this.renderRoutes()}
      </div>
    );
  }
}

export default App;
