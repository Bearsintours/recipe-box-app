import React from 'react';
import { Button, Panel, PanelGroup, Form, FormGroup, InputGroup, FormControl, ControlLabel, Accordion, Badge, Glyphicon, Modal } from 'react-bootstrap';
import '../styles/styles.scss';


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
        this.props.handleCloseModal();
        this.props.handleUpdateRecipe();
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.showModal}
                >
                    <Form onSubmit={this.updateRecipe}>
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
                                style={{ height: '200px' }}
                                type="text"
                                name="prepTime"
                                value={this.props.recipeToEdit.instructions}
                                onChange={this.onInstructionsChange}
                            />
                        </FormGroup>
                        <Button bsStyle="success" type="submit"><Glyphicon glyph="ok" /> Save</Button>
                        <Button bsStyle="danger" onClick={this.props.handleCloseModal}><Glyphicon glyph="remove" /> Cancel</Button>
                    </Form>
                </Modal>
            </div>
        );
    };
};

export default EditRecipeForm;