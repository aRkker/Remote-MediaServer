import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page home">
                <div className="container">
                    <header className="grid header">
                        <h1>
                            This will be the landingpage, enabling you to continue watching where you left of... some
                            time in the future...
                        </h1>
                    </header>
                </div>
            </div>
        )
    }

}
