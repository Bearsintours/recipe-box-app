import React from 'react';

class Recipe extends React.Component {
    render() {
        return (
            <div>
                {this.props.count}. {this.props.recipeName}
                <button>Edit</button>
                <button
                    onClick={(e) => {
                        this.props.handleDeleteRecipe(this.props.recipeName)
                    }}
                >
                    Delete
        </button>
            </div>
        );
    };
};

export default Recipe;