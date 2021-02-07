import React, { Component } from 'react';

class SearchID extends Component {

    constructor() {
        super()
        this.state = {
            search: ''
        };
    }

    handleInput = (e) => {
        this.setState({ search: e.target.value })
    }

    onSubmit = () => {
        let id = this.state.search;
        this.props.submitSearch(id)
    }

    render() {

        return (
            <>
                <input id="inputID" placeholder="Search by driver's ID" onChange={this.handleInput} />
                <button onClick={this.onSubmit}>Search</button>
            </>

        )
    }

}




export default SearchID;