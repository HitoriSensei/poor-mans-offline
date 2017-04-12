import React from 'react'
import './serviceWorkerInstaller'
import store from './redux'
import {values} from 'lodash'

import {connect} from 'react-redux'

import uuid from 'uuid/v4'

const postMessage = (message) => ({
    type: 'POST_MESSAGE_REQUEST',
    payload: message,
    meta: {
        offline: {
            // the network action to execute:
            effect: {
                url: 'http://localhost:3001/post',
                method: 'POST',
                body: message
            },
            // action to dispatch when effect succeeds:
            commit: {
                type: 'POST_MESSAGE_COMMIT',
                meta: message
            },
            // action to dispatch when effect succeeds:
            rollback: {
                type: 'POST_MESSAGE_ROLLBACK',
                meta: message
            },
        }
    }
});


export default connect(
    (state) => {
        return {
            messages: values(state.messages),
        }
    }
)
(class App extends React.Component {
    static defaultProps = {
        messages: []
    }

    constructor() {
        super()
        this.state = {
            input: ''
        }
    }

    render() {
        return (
            <div>
                {this.props.messages.map((message) =>
                    <div key={message.uuid}>
                        {message.text}
                        <sub>{message.state ? "Send" : "Sending"}</sub>
                    </div>
                )}
                <input
                    value={this.state.input}
                    onChange={(e) => this.setState({input: e.target.value})}
                />
                <button
                    onClick={() => {
                        this.setState({input: ""})
                        store.dispatch(postMessage({
                            text: this.state.input,
                            uuid: uuid(),
                            user: "Me",
                            time: Date.now()
                        }))
                    }}
                >
                    Send
                </button>
            </div>
        );
    }
})