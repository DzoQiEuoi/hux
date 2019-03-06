import React, {useContext, useEffect, useState} from 'react';

const Store = React.createContext();

const compose = (...funcs) => {
    if (funcs.length === 0) {
        return arg => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((a, b) => {
        return function() {
            return a(b.apply(undefined, arguments));
        };
    });
};

export const useDispatch = actionCreator => {
    const { dispatch } = useContext(Store);
    return compose(dispatch, actionCreator);
};

export const useSelector = (selector, ...rest) => {
    const { subscribe, getState } = useContext(Store);

    const select = () => selector(
        getState(),
        ...rest
    );

    const initial = select();
    const [value, update] = useState(initial);

    const listener = () => { 
        const next = select();
        if (next !== value) {
            update(next);
        }
    };

    useEffect(() => subscribe(listener));

    return value;
}

export default Store;