import React, { Component } from 'react';
class EditRow extends Component {

    constructor() {
        super()
        this.state = {
            search: '',
            editing: false,
            savedValue: ''
        };
    }

    handleInput = (e) => {
        this.setState({ savedValue: e.target.value })
    }

    onAdd = () => {
        this.setState({ editing: true })
    }

    onSubmit = () => {
        this.props.submitNote(this.props.row, this.state.savedValue)
        this.setState({ editing: false })
    }


    render() {
        
        return (

            <div >

                {this.state.editing
                    ?
                    <>
                        <input
                            id="inputID"
                            placeholder="Insert note"
                            onChange={this.handleInput}
                            style={{ height: "22px" }}
                        />
                        <button
                            onClick={this.onSubmit}
                            style={{ height: "27px" }}
                        >
                            Save
                        </button>
                    </>
                    :
                    <button 
                    onClick={this.onAdd}
                    style={{height:"27.2px"}}
                    >Add Note</button>
                }
            </div>
        )
    }
}


export default EditRow;