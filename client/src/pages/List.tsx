import React, { Component } from 'react';

type Props = {}

type State = {
    list: string[]
}

class List extends Component<Props, State> {
    // Initialize the state
    constructor(props: Props) {
        super(props);
        this.state = {
            list: []
        };
    }

    // Fetch the list on first mount
    componentDidMount() {
        this.getList();
    }

    // Retrieves the list of items from the Express app
    getList = () => {
        fetch('/api/getList')
            .then(res => res.json())
            .then(list => this.setState({ list }))
    }

    render() {
        const { list } = this.state;

        return (
            <div className="App">
                <h1>Enjoy your {list.length} random numbers</h1>
                <div>
                    {/* Render the list of items */}
                    {list.map((item: any) => {
                        return (
                            <div>
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default List;