import React from 'react';
import Modal from 'react-modal';
import AddRecipe from './AddRecipe';

export default class ModalForm extends React.Component {
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.showModal}
                    contentLabel='New recipe'
                >
                    <AddRecipe handleAddRecipe={this.props.handleAddRecipe} />
                    <button onClick={this.props.handleCloseModal}>Close Modal</button>
                </Modal>
            </div>
        );
    };
};
