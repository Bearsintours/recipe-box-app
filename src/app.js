import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import 'normalize.css/normalize.css';
import Header from './components/Header';
import ModalForm from './components/ModalForm';
import Recipes from './components/Recipes';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state = {
    recipes: [],
    showModal: false
    }
  }

  handleAddRecipe = (recipe) => {
    if(!recipe) {
      return "Please enter a recipe";
    }
    else if(this.state.recipes.indexOf(recipe) > -1) {
      return "This recipe already exists";
    }
    this.setState((prevState) => ({
      recipes: prevState.recipes.concat([recipe])
    }))
  };

  handleDeleteRecipe = (recipeToDelete) => {
    this.setState((prevState) => ({
      recipes: prevState.recipes.filter((recipe) => recipe !== recipeToDelete)
    }))
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render () {
   console.log(this.state.recipes);
    console.log(this.state.addingRecipe);
    return (
      <div>
        <Header />
        <Recipes
          recipes = {this.state.recipes}
          handleDeleteRecipe = {this.handleDeleteRecipe}
        />
        <button onClick={this.handleOpenModal}> + </button>      
        <ModalForm
          handleOpenModal = {this.handleOpenModal}
          handleCloseModal= {this.handleCloseModal}
          showModal = {this.state.showModal}
          handleAddRecipe={this.handleAddRecipe}
        />
      </div>
    )
  }
}


ReactDOM.render(<App />,document.getElementById('app'));
