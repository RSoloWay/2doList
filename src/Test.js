import React from 'react';


class Test extends React.Component {

    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
        this.state = {user: localStorage.getItem('item'), x: []}
    }

    componentWillMount() {

    }


    componentDidMount() {

    }


    
    click() {
        localStorage.setItem('item', 1)
    }

    render() {
        return (
            
            <div>
                <h1 onClick={this.click} id='example'>Hello world</h1>
            </div>
        )
    }
}

export default Test