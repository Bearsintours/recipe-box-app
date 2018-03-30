import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Panel, PanelGroup, Form, FormGroup, InputGroup, FormControl, ControlLabel, Accordion, Badge, Glyphicon, Modal } from 'react-bootstrap';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
  } 

  render () {
    return (
      <div className="app">
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
       <h1 className="text-center header">Recipe Box</h1>
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
        ingredients: [
          '5 tbs butter', '1 tbs flour', '2/3 cup milk', 'sea salt', '4 slices country bread', 
          'grated nutmeg', '4 slices french ham', '2 slices gruyere cheese'],
        prepTime: 20,
        instructions: 'Melt the butter over low heat in a small saucepan and add the flour all at once, stirring with a wooden spoon for 2 minutes. Slowly pour the hot milk into the butter?flour mixture and cook, whisking constantly, until the sauce is thickened. Off the heat add the salt, pepper, nutmeg, 1/2 cup grated Gruyere, and the Parmesan and set aside.'
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

  componentDidMount() {
    try {
      const json = localStorage.getItem('recipes');
      const recipes = JSON.parse(json);
      if (recipes) {
      this.setState(() => ({ recipes }));
      }
    } catch(e) {
      // In case invalid value is parsed, do nothing
    } 
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.recipes.length !== this.state.recipes.length) {
      const json = JSON.stringify(this.state.recipes);
      localStorage.setItem('recipes', json);
    }
  }

  handleOpenAddModal() {
    this.setState({ showAddModal: true });
  }

  handleCloseAddModal() {
    this.setState({ showAddModal: false });
  }

  handleOpenEditModal() {
    this.setState({ showEditModal: true });
  }

  handleCloseEditModal() {
    this.setState({ showEditModal: false });
  }

  handleAddRecipe(recipe) {
    return this.setState((prevState) => ({
      recipes: prevState.recipes.concat(recipe)
    }));
  }

  handleDeleteRecipe = (recipeToDelete) => {
    return this.setState((prevState) => ({
      recipes: prevState.recipes.filter((recipe) => recipe.recipeName !== recipeToDelete.recipeName)
    }));
  }

  handleEditRecipe = (recipeToEdit) => {
    this.setState(() => ({
      recipeToEdit: {
        recipeName: recipeToEdit.recipeName, 
        prepTime: recipeToEdit.prepTime,
        ingredients: recipeToEdit.ingredients,
        instructions: recipeToEdit.instructions
      }
    }));
    this.handleOpenEditModal();
  }

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
    return (
      <div className="recipes">       
        <div>
          <PanelGroup accordion id="accordion-recipe">
          {
            this.state.recipes.map((recipe) => {
              return (          
                <Panel bsStyle="warning" eventKey={recipe.recipeName} key={recipe.recipeName}>
                    <Panel.Heading>
                    <Panel.Title className="text-center" toggle>{recipe.recipeName}</Panel.Title>            
                    </Panel.Heading>
                    <Panel.Body collapsible>
                     <p className="category"> Ingredients: </p>
                      <p>{
                        recipe.ingredients.length !== 0 && recipe.ingredients.map((ingredient) => (
                          <Badge bsClass="badge "key={ingredient}> {ingredient}</Badge>
                        ))
                      }</p>                    
                      {recipe.prepTime !== "" && <p className="category">{`Preparation:  ${recipe.prepTime} min`}</p>}
                      <p className="category">{`Instructions: ${recipe.instructions}`}</p>
                    <Button bsSize="small" bsStyle="warning" onClick={(e) => { this.handleEditRecipe(recipe) }}><Glyphicon glyph="pencil" /> Edit</Button>
                    <Button id="deleteBtn" bsSize="small" bsStyle="danger" onClick={(e) => { this.handleDeleteRecipe(recipe) }}><Glyphicon glyph="trash"/> Delete</Button>
                    </Panel.Body>
                  </Panel>
              )
            })
          }
          </PanelGroup> 
        </div>
        <div>
          <Button className="addBtn" bsStyle="warning" bsSize="large" onClick={this.handleOpenAddModal}><Glyphicon glyph="plus"/> new recipe</Button>
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

  constructor(props) {
    super(props);
    this.state = {
      submitBtnDisabled: true
    };
  };

  handleSubmitBtn = () => {
    this.setState({ 
      submitBtnDisabled: this.recipeName.value.length === 0 ? true : false
    });
  }

  addRecipe = (e) => {
    e.preventDefault();
    const recipeName = this.recipeName.value.trim();
    const prepTime = this.prepTime.value.trim();
    const ingredients = this.ingredients.value.length > 0 ? this.ingredients.value.split(",") : [];
    const instructions = this.instructions.value;
    const recipe = {
      recipeName,
      prepTime,
      ingredients,
      instructions
    }
    this.props.handleAddRecipe(recipe);
    this.props.handleCloseModal();
  }
  
  render () {
    return (
      <Modal
        show={this.props.showModal}
        className="modal"
      > 
        <Modal.Header>
          <Modal.Title>Add your recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.addRecipe}>
            <FormGroup controlId="recipeName">  
              <InputGroup>
                <InputGroup.Addon>Recipe</InputGroup.Addon>
                <FormControl 
                  inputRef = {(input) => this.recipeName = input}
                  type = "text"
                  name = "recipeName"
                  placeholder = "Enter recipe name" 
                  autoFocus
                  onChange={this.handleSubmitBtn}


                />       
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="ingredients">
              <InputGroup>
                <InputGroup.Addon>Ingredients</InputGroup.Addon>
                <FormControl
                  inputRef={(input) => this.ingredients = input}
                  type="text"
                  name="ingredients"
                  placeholder="Enter ingredients (comma separated)"
                />
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="prepTime">
              <InputGroup>
                <InputGroup.Addon>Preparation</InputGroup.Addon>
                <FormControl
                  inputRef={(input) => this.prepTime = input}
                  type="text"
                  name="prepTime"
                  placeholder="Enter time in min"
                />
              </InputGroup>
            </FormGroup>
            <FormGroup
              controlId="instructions"
            >
              <ControlLabel>Instructions</ControlLabel>{' '}
              <FormControl
                inputRef={(input) => this.instructions = input}
                componentClass="textarea"
                type="text"
                name="instructions"
              />
            </FormGroup>
            <div>
              <Button bsStyle="success" onClick={this.addRecipe} disabled={this.state.submitBtnDisabled}><Glyphicon glyph="ok" /> Save</Button>
              <Button bsStyle="danger" onClick={this.props.handleCloseModal}><Glyphicon glyph="remove" /> Cancel</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
};


class EditRecipeForm extends React.Component {

  onPrepTimeChange = (e) => {
    const prepTime = e.target.value;
    this.props.handleEditPrepTime(prepTime);
  }

  onIngredientsChange = (e) => {
    const ingredients = e.target.value.split(",");
    console.log(ingredients);
    this.props.handleEditIngredients(ingredients);
  }

  onInstructionsChange = (e) => {
    const instructions = e.target.value;
    this.props.handleEditInstructions(instructions);
  }

  updateRecipe = (e) => {
    e.preventDefault();
    const updatedRecipe = this.props.recipeToEdit;
    this.props.handleCloseModal();
    this.props.handleUpdateRecipe(updatedRecipe);   
  }

  render() {
    return (
      <div>
        <Modal
          show = {this.props.showModal}
          className="modal"
        >
          <form onSubmit={this.updateRecipe}>
            <FormGroup controlId="prepTime">
              <InputGroup>
                <InputGroup.Addon>Preparation</InputGroup.Addon>
                <FormControl
                  type="text"
                  value={this.props.recipeToEdit.prepTime}
                  onChange={this.onPrepTimeChange}
                  autoFocus
                />
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="ingredients">
              <InputGroup>
                <InputGroup.Addon>Ingredients</InputGroup.Addon>
                <FormControl
                  type="text"
                  value={this.props.recipeToEdit.ingredients}
                  onChange={this.onIngredientsChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="instructions">
              <ControlLabel>Instructions</ControlLabel>
              <FormControl
                componentClass="textarea"
                type="text"
                name="prepTime"
                value={this.props.recipeToEdit.instructions}
                onChange={this.onInstructionsChange}
              />
            </FormGroup>
            <Button bsStyle="success" type="submit"><Glyphicon glyph="ok"/> Save</Button>
            <Button bsStyle="danger" onClick={this.props.handleCloseModal}><Glyphicon glyph="remove"/> Cancel</Button>
          </form>     
        </Modal> 
      </div>
    );
  };
};


ReactDOM.render(<App />, document.getElementById('app'));