import React from 'react';

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.addRecipe = this.addRecipe.bind(this);
        this.state = {
            error: undefined
        }
    }

    addRecipe = (e) => {
        e.preventDefault();
        let recipe = e.target.elements.recipe.value.trim();
        const error = this.props.handleAddRecipe(recipe);

        this.setState(() => ({ error }));

        if (!error) {
            e.target.elements.recipe.value = '';
        }
    };

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.addRecipe}>
                    <input type="text" name="recipe" />
                    <button>Add Recipe</button>
                </form>
            </div>
        );
    };
};

export default AddRecipe;