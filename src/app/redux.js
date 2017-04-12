import { applyMiddleware, compose } from 'redux';
import { createOfflineStore } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import { merge } from 'lodash';

const reducer = (
    state = {
        messages: {}
     },
    {type, payload, meta}
) => {
    switch(type){
        case "persist/REHYDRATE": {
            return payload
        }
        case "POST_MESSAGE_REQUEST": {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [payload.uuid]: {
                        ...payload,
                        state: 0,
                    }
                }
            }
        }
        case "POST_MESSAGE_COMMIT": {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [meta.uuid]: {
                        ...state.messages[meta.uuid],
                        state: 1,
                    }
                }
            }
        }
    }
    return state
}

let store = createOfflineStore(
    reducer,
    {},
    compose(
        applyMiddleware(),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ),
    offlineConfig
);

export default store