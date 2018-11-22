import React, {useContext, useEffect, useState} from 'react';
import { compose } from 'redux';

const Store = React.createContext();

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