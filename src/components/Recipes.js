import React from 'react';
import Recipe from './Recipe';

class Recipes extends React.Component {
    render() {
        return (
            <div>
                <p>Your recipes</p>
                {
                    this.props.recipes.map((recipe, index) => (
                        <Recipe
                            key={recipe}
                            recipeName={recipe}
                            count={index + 1}
                            handleDeleteRecipe={this.props.handleDeleteRecipe}
                        />
                    ))
                }
            </div>
        );
    };
};

export default Recipes;