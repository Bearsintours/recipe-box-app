import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import ReactModal from 'react-modal';
import './styles/styles.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
  } 

  render () {
    return (
      <div>
        <Header />  
        <Recipes />
      </div>
    );
  };
};


class Header extends React.Component {
  render () {
    return (
      <div>
       <h1>Recipe Box</h1>
      </div>
    );
  };
};


class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
    this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
    this.handleEditRecipe = this.handleEditRecipe.bind(this);
  } 

  state = {
    showAddModal: false,
    showEditModal: false,
    recipes: [
      {
        recipeName: 'Croque-Monsieur',
        ingredients: ['bread', 'butter', 'ham'],
        prepTime: '15',
        instructions: 'blablabla'
      },
      {
        recipeName: 'Curry',
        ingredients: ['rice', 'ginger', 'garlic'],
        prepTime: '55',
        instructions: 'stuffs'
      }
    ],
    recipeToEdit: {
      recipeName: '',
      ingredients: [],
      prepTime: '',
      instructions: ''
    }
  }

  handleOpenAddModal() {
    this.setState({ showAddModal: true });
  };

  handleCloseAddModal() {
    this.setState({ showAddModal: false });
  };

  handleOpenEditModal() {
    this.setState({ showEditModal: true });
  };

  handleCloseEditModal() {
    this.setState({ showEditModal: false });
  };

  handleAddRecipe(recipe) {
    return this.setState((prevState) => ({
      recipes: prevState.recipes.concat(recipe)
    }));
  };

  handleDeleteRecipe = (recipeToDelete) => {
    return this.setState((prevState) => ({
      recipes: prevState.recipes.filter((recipe) => recipe.recipeName !== recipeToDelete.recipeName)
    }));
  };

  handleEditRecipe = (recipeToUpdate) => {
    this.setState(() => ({
      recipeToEdit: {
        recipeName: recipeToUpdate.recipeName, 
        prepTime: recipeToUpdate.prepTime, 
        ingredients: recipeToUpdate.ingredients, 
        instructions: recipeToUpdate.instructions
      }
    }));
    this.handleOpenEditModal();
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <button onClick={this.handleOpenAddModal}>+</button> 
        {
          this.state.recipes.map((recipe) => {
            return (
              <div key={recipe.recipeName}>
              <p>{recipe.recipeName}</p>
                <button onClick={(e) => {this.handleDeleteRecipe(recipe)}}>Delete</button>
              <button onClick={(e) => {this.handleEditRecipe(recipe)}}>Edit</button>
              </div>
            )
          })
        }
        <AddRecipeForm
          showModal={this.state.showAddModal}
          handleCloseModal={this.handleCloseAddModal}
          handleAddRecipe={this.handleAddRecipe}
        />
        <EditRecipeForm
          showModal={this.state.showEditModal}
          handleCloseModal={this.handleCloseEditModal}
          recipeToEdit={this.state.recipeToEdit}
        />
      </div>
    );
  };
};


class AddRecipeForm extends React.Component {

  addRecipe = (e) => {
    e.preventDefault();
    let recipeName = e.target.elements.recipe.value.trim();
    let prepTime = e.target.elements.prepTime.value.trim();
    let ingredients = e.target.elements.ingredients.value.trim();
    let instructions = e.target.elements.instructions.value.trim();
    let recipe = {recipeName, prepTime, ingredients, instructions}
    console.log(recipe);
    this.props.handleAddRecipe(recipe);
    this.props.handleCloseModal();
  };
  
  render () {
    return (
      <ReactModal
        isOpen={this.props.showModal}
        contentLabel="Add recipe"
      > 
        <form onSubmit={this.addRecipe}>
          <label>Recipe<input type="text" name="recipe" /></label>
          <label>Prep Time<input type="text" name="prepTime" /></label>
          <label>Ingredients<input type="text" name="ingredients" /></label>
          <textarea type="text" name="instructions" placeholder="Instructions" />
          <div>
            <button>Add Recipe</button>
          </div>
        </form>
        <button onClick={this.props.handleCloseModal}>Cancel</button>
      </ReactModal>
    );
  };
};


class EditRecipeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipeName: this.props.recipeToEdit.recipeName,
      prepTime: '',
      ingredients: [],
      instructions: ''
    };
  };

  onRecipeNameChange = (e) => {
    console.log(this.state);
    const recipeName = e.target.value;
    this.setState(() => ({ recipeName }));
  };

  render() {
    return (
      <div>
        <ReactModal
        isOpen = {this.props.showModal}
        contentLabel = "Edit recipe"
        >
        <form onSubmit={this.handleEditRecipe}>
          <label>
            Recipe
            <input 
              type="text" 
              name="recipe"
              value = {this.state.recipeName}
              onChange={this.onRecipeNameChange}
            />
          </label>
          <label>Prep Time<input type="text" name="prepTime" /></label>
          <label>Ingredients<input type="text" name="ingredients" /></label>
          <textarea type="text" name="instructions"></textarea>
          <div>
            <button>Submit</button>
          </div>
        </form>
        <button onClick={this.props.handleCloseModal}>Cancel</button>
        </ReactModal>
      </div>
    );
  };
};


ReactDOM.render(<App />, document.getElementById('app'));