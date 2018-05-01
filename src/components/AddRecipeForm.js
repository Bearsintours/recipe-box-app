import React from 'react';
import { Button, Panel, PanelGroup, Form, FormGroup, InputGroup, FormControl, ControlLabel, Accordion, Badge, Glyphicon, Modal } from 'react-bootstrap';
import '../styles/styles.scss';


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

    render() {
        return (
            <Modal
                show={this.props.showModal}
                animation={true}
            >
                <Form onSubmit={this.addRecipe}>
                    <FormGroup controlId="recipeName">
                        <InputGroup>
                            <InputGroup.Addon>Recipe</InputGroup.Addon>
                            <FormControl
                                inputRef={(input) => this.recipeName = input}
                                type="text"
                                name="recipeName"
                                placeholder="Enter recipe name"
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
                            style={{ height: '200px' }}
                            componentClass="textarea"
                            type="text"
                            name="instructions"
                            placeholder="Separate steps with a dot '.'"
                        />
                    </FormGroup>
                    <div>
                        <Button bsStyle="success" onClick={this.addRecipe} disabled={this.state.submitBtnDisabled}><Glyphicon glyph="ok" /> Save</Button>
                        <Button bsStyle="danger" onClick={this.props.handleCloseModal}><Glyphicon glyph="remove" /> Cancel</Button>
                    </div>
                </Form>
            </Modal>
        );
    };
};

export default AddRecipeForm;