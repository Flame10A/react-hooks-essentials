# React Hooks Essentials
![npm](https://img.shields.io/npm/v/react-hooks-essentials)
![typings: included](https://img.shields.io/badge/typings-included-brightgreen)
![dependencies: 0](https://img.shields.io/badge/dependencies-0-brightgreen)

A small collection of React hooks, designed to make general hooks usage simpler.

## useMethod()
An alternative to React's `useCallback()`, without the fuss of dependencies or
volatile function references.

```js
const myFunc = useMethod((...args) => {
    // do stuff
});

// ...

const x = myFunc(...args); // Acts exactly like the input function
```

Use as you would `useCallback()`, but without the dependencies array.
The returned function will do exactly as the inner function would, but wraps it
in such a way that the output function never changes reference, but always has
the up-to-date functionality.

As a result, the function doesn't need a dependency array, and doesn't need to
be included in those of other callbacks, effects, etc.

### Example

### Vs. useCallback() and unwrapped functions
|                                     | useMethod          | useCallback      | Inline function  |
| ----------------------------------- | :----------------: | :--------------: | :--------------: |
| Requires deps array                 | ✘                  | ✔               | ✘                |
| Changes reference                   | Never              | When deps change | Every update     |
| Needs to be included in deps arrays | ✘                  | ✔               | ✔ (but not safe) |
| Safe to include in deps arrays      | ✔ (but not needed) | ✔               | ✘                |
| Safe to use in async code           | ✔                  | ✘               | ✘                |

### When **not** to use it
- When you specifically want the function to change only when the deps change
    (use `useCallback()`).

## useGetter()
Returns a getter function for the input value.

```js
const getValue = useGetter(props.value);

// ...

const x = getValue(); // Up-to-date value of props.value.
```

The returned function, like those returned by `useMethod()`, is single-instance,
meaning it doesn't need to be included in dependencies arrays, and is safe to
use in asynchronous code.

## useObject()
Returns a single-instance object, which is always updated with the contents of
its input.

As with the other hooks, the returned object is updated rather than replaced,
so it does not need to be included in dependency arrays, and is safe to use
in asynchronous code.

This can also be useful for creating an object to be passed down through the
[Context API](https://reactjs.org/docs/context.html), if the consumers
don't need to be notified of changes.

```js
const obj = useObject({
    a: someVolatileValue,
    b: anotherVolatileValue
});

// ...

const x = obj.a; // The up-to-date value of someVolatileValue
```

## useSelf()
Provides single-instance functions related to the component lifecycle.

Currently this is only `isMounted()`.

### self.isMounted()
A function which indicates whether the containing component is still mounted.

```js
const self = useSelf();

// ...

if (self.isMounted()) {
    // do stuff that's only safe while mounted (e.g. setState())
}
```