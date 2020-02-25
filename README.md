# browserify-util-inspect

Browserified version of node.js `util.inspect`.

## Build

```
npm run clone
npm run build
```

## Test

```
npm run test
```

## Differences with native inspect:

- Proxies are treated as plain objects (be aware of side effects).
- Promises status is always `<pending>` as there is no way to
  synchronously determine the status of a promise (at least without incurring in side effects (ie. catching an unhandled rejection) or relying on vendor specific details).
- Weak collections will be inspected as empty.
- Once `options.depth` is reached any constructor will show up as `Object`
- Boxed primitives (ie. `new String()`) are not supported for now.
