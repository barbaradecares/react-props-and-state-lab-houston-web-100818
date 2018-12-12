import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  updateFilters = newFilters => {
    this.setState({ filters: { type: newFilters } });
  };

  handleFindPets = e => {
    let type = this.state.filters.type;
    let url = "/api/pets";

    if (type != "all") {
      url += `?type=${type}`;
    }

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(pets => this.setState(state => (state.pets = pets)));
  };

  adoptToggle = petId => {
    this.setState(state => {
      let pet = state.pets.find(pet => pet.id == petId);
      pet.isAdopted = !pet.isAdopted;
      return state;
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.updateFilters}
                handleFindPets={this.handleFindPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.adoptToggle}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
