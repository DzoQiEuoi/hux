# Hux

Access and dispatch to your redux store from anywhere in your compnent tree using only React Hooks.

## Example usage

```
import Store from 'hux';

const store = createStore(reducer);

const EntryPoint = () => (
    <Store.Provider value={store}>
        <App />
    </Store.Provider>
);
```

```
import { useDispatch, useSelector } from 'hux';

const MyComponent = id => {
    const value = useSelector(mySelector, id);
    const update = useDispatch(myActionCreator)

    return (
        <input
            type="text"
            value={value}
            onChange={e => update(e.target.value)}>
    );
}
```

## API

### Store

#### Usage

```
<Store.Provider value={store}>
    {children}
<Store.Provider>
```

`store` is an object with the methods `getState`, `subscribe`, and `dispatch` (i.e. a redux store).

All children will be able to access the store.

### useSelector

#### Usage

```
    useSelector(selector[, arg1, arg2...])
```

### Paramters

##### selector

A pure fucntion which takes store state as the first argument n additional paramters.

##### arg1, arg2...

Arguments to be passed to the `selector` after the store state.

### Returns

The return value of the selector.

### useDispatch

#### Usage

```
    useDispatch(actionCreator)
```

### Paramters

##### actionCreator

A pure fucntion which takes n parameters and returns an object with at least a `type` property (i.e. a redux action).

### Returns

A function which takes n parameters, passes them to the `actionCreator` and then dispathes the return value to the store.