import { Button, Panel, PanelGroup, Accordion, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

<form onSubmit={this.addRecipe}>
    <FormGroup
        controlId="recipeName"
    >
        <ControlLabel>Recipe</ControlLabel>
        <FormControl
            type="text"
            name="recipe"
            placeholder="Enter recipe name"
        />
    </FormGroup>
    <FormGroup
        controlId="ingredients"
    >
        <ControlLabel>Ingredients</ControlLabel>
        <FormControl
            type="text"
            name="ingredients"
            placeholder="Enter ingredients"
        />
    </FormGroup>
    <FormGroup
        controlId="prepTime"
    >
        <ControlLabel>Preparation Time</ControlLabel>
        <FormControl
            type="text"
            name="prepTime"
            placeholder="Enter time in min"
        />
    </FormGroup>
    <FormGroup
        controlId="instructions"
    >
        <ControlLabel>Instructions</ControlLabel>
        <FormControl
            componentClass="textarea"
            type="text"
            name="prepTime"
            placeholder="Enter time in min"
        />
    </FormGroup>
    <div>
        <Button bsStyle="success" onClick={this.addRecipe}>Add Recipe</Button>
        <Button bsStyle="danger" onClick={this.props.handleCloseModal}>Cancel</Button>
    </div>
</form>