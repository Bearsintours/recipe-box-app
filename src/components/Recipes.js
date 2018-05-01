import React from 'react';
import { Button, Panel, PanelGroup, Form, FormGroup, InputGroup, FormControl, ControlLabel, Accordion, Badge, Glyphicon, Modal } from 'react-bootstrap';
import AddRecipeForm from './AddRecipeForm.js';
import EditRecipeForm from './EditRecipeForm.js'
import '../styles/styles.scss';


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
        filter: '',
        recipes: [
            {
                recipeName: 'Croque-Monsieur',
                ingredients: [
                    '5 tbs butter', '1 tbs flour', '2/3 cup milk', 'sea salt', '4 slices country bread',
                    'grated nutmeg', '4 slices french ham', '2 slices gruyere cheese'],
                prepTime: 20,
                instructions: 'Melt the butter over low heat in a small saucepan and add the flour all at once, stirring with a wooden spoon for 2 minutes. Slowly pour the hot milk into the butter?flour mixture and cook, whisking constantly, until the sauce is thickened. Off the heat add the salt, pepper, nutmeg, 1/2 cup grated Gruyere, and the Parmesan and set aside'
            },
            {
                recipeName: 'Nopales Salad',
                ingredients: ['2 pounds cactus pads', '4 Roma tomatoes', '1 large white onion', '12 sprigs of cilantro', '6 ounces ranchero cheese1', '2 tsp.salt'],
                prepTime: 25,
                instructions: 'Cooking the Cactus Cut the cactus pads into 1 / 4 " x 1/2" pieces. Place the cactus in a large pan and cover with 2 " of water. Turn the heat on high and bring the water to a boil. Reduce the heat to medium.Skim the slime during cooking until the cactus no longer releases any. Drain the cactus and rinse under cool running water. Dice the tomatoes. Dice the onion. Finely chop the cilantro. Crumble the ranchero cheese. Assembling the Salad Add all of the ingredients to a mixing bowl and gently turn until well mixed'
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
        } catch (e) {
            // In case invalid value is parsed, do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const json = JSON.stringify(this.state.recipes);
        localStorage.setItem('recipes', json);
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

    handleEditIngredients = (ingredients) => {
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

    handleChange = (e) => {
        const filter = e.target.value;
        this.setState({ filter })
    }

    render() {
        const allRecipes = this.state.recipes;
        const filter = this.state.filter.trim();
        const filteredRecipes = allRecipes.filter((recipe) => {
            return recipe.ingredients.join('').toLowerCase().includes(filter.toLowerCase()) 
                || recipe.recipeName.toLowerCase().includes(filter.toLowerCase()) ;
        })
        const recipes = filter.length > 0 ? filteredRecipes : allRecipes;
        return (
            <div className="recipes">
                <div>
                    <PanelGroup accordion id="accordion-recipe">
                        {
                            recipes.map((recipe) => {
                                return (
                                    <Panel bsStyle="warning" eventKey={recipe.recipeName} key={recipe.recipeName}>
                                        <Panel.Heading>
                                            <Panel.Title className="text-center" toggle>{recipe.recipeName}</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible>
                                            <h4 className="category"> Ingredients: </h4>
                                            <p>
                                                {
                                                    recipe.ingredients.length !== 0 && recipe.ingredients.map((ingredient) => (
                                                        <Badge key={ingredient}> {ingredient}</Badge>
                                                    ))
                                                }
                                            </p>
                                            {recipe.prepTime !== "" && <h4 className="category">{`Preparation:  ${recipe.prepTime} min`}</h4>}
                                            <h4 className="category"> Instructions: </h4>
                                            {
                                                recipe.instructions.length !== 0 && recipe.instructions.split(".").map((instruction, idx) => (
                                                    <p className="instructions" key={idx + 1}>{`${idx + 1}- ${instruction}`}</p>
                                                ))
                                            }
                                            <Button bsSize="small" bsStyle="warning" onClick={(e) => { this.handleEditRecipe(recipe) }}><Glyphicon glyph="pencil" /> Edit</Button>
                                            <Button id="deleteBtn" bsSize="small" bsStyle="danger" onClick={(e) => { this.handleDeleteRecipe(recipe) }}><Glyphicon glyph="trash" /> Delete</Button>
                                        </Panel.Body>
                                    </Panel>
                                )
                            })
                        }
                    </PanelGroup>
                </div>
                <div>
                    <Button className="addBtn" bsStyle="warning" bsSize="large" onClick={this.handleOpenAddModal}><Glyphicon glyph="plus" /> new recipe</Button>
                    <form>
                        <FormControl
                            type="text"
                            value={this.state.filter}
                            placeholder="Search ingredient or recipe"
                            onChange={this.handleChange}
                        />
                    </form>
                    
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

export default Recipes;