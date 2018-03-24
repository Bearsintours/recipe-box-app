import React from 'react';
import ReactDOM from 'react-dom';
//import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Button, Panel, PanelGroup, Accordion } from 'react-bootstrap';
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
       <h1 className="text-center">Recipe Box</h1>
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
    this.handleUpdateRecipe = this.handleUpdateRecipe.bind(this);
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

  handleEditRecipe = (recipeToEdit) => {
    console.log('recipe to update', recipeToEdit);
    this.setState(() => ({
      recipeToEdit: {
        recipeName: recipeToEdit.recipeName, 
        prepTime: recipeToEdit.prepTime,
        ingredients: recipeToEdit.ingredients,
        instructions: recipeToEdit.instructions
      }
    }));
    this.handleOpenEditModal();
  };

  handleEditPrepTime = (prepTime) => {
    this.setState({
      recipeToEdit: { ...this.state.recipeToEdit, prepTime }
    });
  }

  handleEditIngredients= (ingredients) => {
    this.setState({
      recipeToEdit: { ...this.state.recipeToEdit, ingredients }
    });
  }

  handleEditInstructions = (instructions) => {
    this.setState({
      recipeToEdit: { ...this.state.recipeToEdit, instructions }
    });
  }

  handleUpdateRecipe = () => {
    const updatedRecipe = this.state.recipeToEdit;
    const recipes = [...this.state.recipes];
    const index = recipes.findIndex((recipe) => recipe.recipeName === updatedRecipe.recipeName);
    recipes[index] = updatedRecipe;
    this.setState({ recipes });

  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          <Button bsStyle="warning" onClick={this.handleOpenAddModal}>Add a new recipe</Button>
        </div>
        <div className="App container">
          <PanelGroup accordion id="accordion-recipe">
          {
            this.state.recipes.map((recipe) => {
              return (          
                <Panel bsStyle="info" eventKey={recipe.recipeName} key={recipe.recipeName}>
                    <Panel.Heading>
                    <Panel.Title className="text-center" toggle>{recipe.recipeName}</Panel.Title>            
                    </Panel.Heading>
                    <Panel.Body collapsible>
                      <ul>
                        <p>Ingredients: </p>
                        {
                          recipe.ingredients.map((ingredient) => (
                            <li key={ingredient}>{ingredient}</li>
                          ))
                        }
                      </ul>
                      <div>{`Preparation:  ${recipe.prepTime} min`}</div>
                      <div>{`Instructions:  ${recipe.instructions}`}</div>
                      <Button bsStyle="danger" onClick={(e) => { this.handleDeleteRecipe(recipe) }}>Delete</Button>
                      <Button bsStyle="warning" onClick={(e) => { this.handleEditRecipe(recipe) }}>Edit</Button>
                    </Panel.Body>
                  </Panel>
           
              )
            })
          }
          </PanelGroup> 
        </div>
        <AddRecipeForm
          showModal={this.state.showAddModal}
          handleCloseModal={this.handleCloseAddModal}
          handleAddRecipe={this.handleAddRecipe}
        />
        <EditRecipeForm
          showModal={this.state.showEditModal}
          handleCloseModal={this.handleCloseEditModal}
          recipeToEdit={this.state.recipeToEdit}
          handleEditPrepTime={this.handleEditPrepTime}
          handleEditIngredients={this.handleEditIngredients}
          handleEditInstructions={this.handleEditInstructions}
          handleUpdateRecipe={this.handleUpdateRecipe}
        />
      </div>
    );
  };
};


class AddRecipeForm extends React.Component {

  addRecipe = (e) => {
    e.preventDefault();
    const recipeName = e.target.elements.recipe.value.trim();
    const prepTime = e.target.elements.prepTime.value.trim();
    const ingredients = e.target.elements.ingredients.value.split(",");
    const instructions = e.target.elements.instructions.value.trim();
    const recipe = {
      recipeName,
      prepTime,
      ingredients,
      instructions
    }
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
            <Button bsStyle="success" type="submit">Add Recipe</Button>
          </div>
        </form>
        <Button bsStyle="danger" onClick={this.props.handleCloseModal}>Cancel</Button>
      </ReactModal>
    );
  };
};


class EditRecipeForm extends React.Component {

  onPrepTimeChange = (e) => {
    const prepTime = e.target.value;
    this.props.handleEditPrepTime(prepTime);
  };

  onIngredientsChange = (e) => {
    const ingredients = e.target.value.split(",");
    console.log(ingredients);
    this.props.handleEditIngredients(ingredients);
  };

  onInstructionsChange = (e) => {
    const instructions = e.target.value;
    this.props.handleEditInstructions(instructions);
  };

  updateRecipe = (e) => {
    e.preventDefault();
    const updatedRecipe = this.props.recipeToEdit;
    this.props.handleCloseModal();
    this.props.handleUpdateRecipe(updatedRecipe);
    
  }

  render() {
    return (
      <div>
        <ReactModal
        isOpen = {this.props.showModal}
        contentLabel = "Edit recipe"
        >
        <h1>{this.props.recipeToEdit.recipeName}</h1>
        <form onSubmit={this.updateRecipe}>
          <label>
            Prep Time
            <input 
              type="text" 
              name="prepTime" 
              value={this.props.recipeToEdit.prepTime}
              onChange={this.onPrepTimeChange}
            />
          </label>
          <label>
            Ingredients
            <input 
              type="text" 
              name="ingredients" 
              value={this.props.recipeToEdit.ingredients}
              onChange={this.onIngredientsChange}
            />
          </label>
          <textarea 
            type="text" 
            name="instructions"
            value={this.props.recipeToEdit.instructions}
            onChange={this.onInstructionsChange}
          >
          </textarea>
          <div>
              <Button bsStyle="success" type="submit">Update</Button>
          </div>
        </form>
          <Button bsStyle="danger" onClick={this.props.handleCloseModal}>Cancel</Button>
        </ReactModal>
      </div>
    );
  };
};


ReactDOM.render(<App />, document.getElementById('app'));