// eslint-disable-next-line no-unused-vars
function internalBinding(name) {
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }

  const isExternal = function isExternal() {};

  const isDate = function isDate(d) {
    return objectToString(d) === '[object Date]' && d instanceof Date;
  };

  const isArgumentsObject = function isArgumentsObject(a) {
    return objectToString(a) === '[object Arguments]';
  };

  const isBooleanObject = function isBooleanObject(b) {
    return objectToString(b) === '[object Boolean]' && b instanceof Boolean;
  };

  const isNumberObject = function isNumberObject(n) {
    return objectToString(n) === '[object Number]' && n instanceof Number;
  };

  const isStringObject = function isStringObject(s) {
    return objectToString(s) === '[object String]' && s instanceof String;
  };

  const isSymbolObject = function isSymbolObject(s) {
    return objectToString(s) === '[object Symbol]' && s instanceof Symbol;
  };

  const isNativeError = function isNativeError(e) {
    return objectToString(e) === '[object Error]' && e instanceof Error;
  };

  const isRegExp = function isRegExp(r) {
    return objectToString(r) === '[object RegExp]' && r instanceof RegExp;
  };

  const isAsyncFunction = function isAsyncFunction(a) {
    return objectToString(a) === '[object AsyncFunction]';
  };

  const isGeneratorFunction = function isGeneratorFunction(g) {
    return objectToString(g) === '[object GeneratorFunction]';
  };

  const isGeneratorObject = function isGeneratorObject(g) {
    return objectToString(g) === '[object Generator]';
  };

  const isPromise = function isPromise(p) {
    return objectToString(p) === '[object Promise]';
  };

  const isMap = function isMap(m) {
    return objectToString(m) === '[object Map]' && m instanceof Map;
  };

  const isSet = function isSet(s) {
    return objectToString(s) === '[object Set]' && s instanceof Set;
  };

  const isMapIterator = function isMapIterator(m) {
    return objectToString(m) === '[object Map Iterator]';
  };

  const isSetIterator = function isSetIterator(s) {
    return objectToString(s) === '[object Set Iterator]';
  };

  const isWeakMap = function isWeakMap(w) {
    return objectToString(w) === '[object WeakMap]';
  };

  const isWeakSet = function isWeakSet(w) {
    return objectToString(w) === '[object WeakSet]';
  };

  const isArrayBuffer = function isArrayBuffer(a) {
    return objectToString(a) === '[object ArrayBuffer]' && a instanceof ArrayBuffer;
  };

  const isDataView = function isDataView(d) {
    return objectToString(d) === '[object DataView]' && d instanceof DataView;
  };

  const isSharedArrayBuffer = function isSharedArrayBuffer(s) {
    return objectToString(s) === '[object SharedArrayBuffer]' && s instanceof SharedArrayBuffer;
  };

  // Without hooking in v8 anymore we can't tell proxies from plain
  // objects, and it is by spec.
  // Some browsers allow `x instanceof Proxy` to work
  // but different engines behaves unpredictably: some would throw an
  // error some just always return `false`.
  const isProxy = function isProxy() { return false; };

  const isWebAssemblyCompiledModule = function isWebAssemblyCompiledModule(w) {
    return objectToString(w) === '[object WebAssembly.Module]';
  };

  const isModuleNamespaceObject = function isModuleNamespaceObject() {};

  const isAnyArrayBuffer = function isAnyArrayBuffer() {};

  // dataView, int32Array, uint8Array, buffer,
  // stealthyDataView, stealthyInt32Array, stealthyUint8Array
  const isArrayBufferView = function isArrayBufferView() {};

  // int32Array, uint8Array, buffer, stealthyInt32Array, stealthyUint8Array
  // see https://github.com/lodash/lodash/blob/master/isTypedArray.js
  const isTypedArray = function isTypedArray(t) {
    const tags = /^\[object (?:Float(?:32|64)Array|(?:Int|Uint)(?:8|16|32)Array|Uint8ClampedArray)\]$/;

    return tags.test(objectToString(t));
  };

  const isUint8Array = function isUint8Array(u) {
    return objectToString(u) === '[object Uint8Array]' && u instanceof Uint8Array;
  };

  const isUint8ClampedArray = function isUint8ClampedArray(u) {
    return objectToString(u) === '[object Uint8ClampedArray]' && u instanceof Uint8ClampedArray;
  };

  const isUint16Array = function isUint16Array(u) {
    return objectToString(u) === '[object Uint16Array]' && u instanceof Uint16Array;
  };

  const isUint32Array = function isUint32Array(u) {
    return objectToString(u) === '[object Uint32Array]' && u instanceof Uint32Array;
  };

  const isInt8Array = function isInt8Array(i) {
    return objectToString(i) === '[object Int8Array]' && i instanceof Int8Array;
  };

  const isInt16Array = function isInt16Array(i) {
    return objectToString(i) === '[object Int16Array]' && i instanceof Int16Array;
  };

  const isInt32Array = function isInt32Array(i) {
    return objectToString(i) === '[object Int32Array]' && i instanceof Int32Array;
  };

  const isFloat32Array = function isFloat32Array(i) {
    return objectToString(i) === '[object Float32Array]' && i instanceof Float32Array;
  };

  const isFloat64Array = function isFloat64Array(i) {
    return objectToString(i) === '[object Float64Array]' && i instanceof Float64Array;
  };

  const isBigInt64Array = function isBigInt64Array(i) {
    return objectToString(i) === '[object Float64Array]' && i instanceof Float64Array;
  };

  const isBigIntObject = function isBigIntObject(i) {
    // note: this was experimental since recently
    // eslint-disable-next-line node/no-unsupported-features/es-builtins
    if (typeof BigInt === 'function') {
      // eslint-disable-next-line node/no-unsupported-features/es-builtins
      return objectToString(i) === '[object BigInt]' && i instanceof BigInt;
    }
  };

  const isBigUint64Array = function isBigUint64Array(i) {
    // note: this was experimental since recently
    // eslint-disable-next-line node/no-unsupported-features/es-builtins
    if (typeof BigUint64Array === 'function') {
      // eslint-disable-next-line node/no-unsupported-features/es-builtins
      return objectToString(i) === '[object BigUint64Array]' && i instanceof BigUint64Array;
    }

    return false;
  };

  // TODO: support isBoxedPrimitive
  const isBoxedPrimitive = function isBoxedPrimitive() {
    return false;
  };

  if (name === 'buffer') {
    return require('buffer');
  }

  if (name === 'util') {
    const kPending = 0;
    const kRejected = 1;

    const getPromiseDetails = () => {
      return [kPending, undefined];
    };

    const ALL_PROPERTIES = 0;
    const ONLY_ENUMERABLE = 1;
    const IS_NUMERIC_RE = /^\d$/;

    const getOwnNonIndexProperties = (array, filter) => {
      const keys = filter === ALL_PROPERTIES ?
        Object.getOwnPropertyNames(array) :
        Object.keys(array);

      return keys.filter((k) => !k.match(IS_NUMERIC_RE));
    };

    return {
      propertyFilter: {
        ALL_PROPERTIES,
        ONLY_ENUMERABLE
      },
      getOwnNonIndexProperties,

      kPending,
      kRejected,
      getPromiseDetails,

      // since we can't reliably detect a Proxy
      // in the browser we just ignore them
      getProxyDetails: () => undefined,

      // This is only used in case max depth
      // has been reached.
      //
      // In such case we fallback to Object
      getConstructorName: () => 'Object',

      // TODO ?
      previewEntries: () => []
    };
  }

  if (name === 'constants') {
    return {
      os: {
        signals: {},
      },
    };
  }

  if (name === 'types') {
    return {
      isExternal,
      isDate,
      isArgumentsObject,
      isBooleanObject,
      isNumberObject,
      isStringObject,
      isSymbolObject,
      isNativeError,
      isRegExp,
      isAsyncFunction,
      isGeneratorFunction,
      isGeneratorObject,
      isPromise,
      isMap,
      isSet,
      isMapIterator,
      isSetIterator,
      isWeakMap,
      isWeakSet,
      isArrayBuffer,
      isDataView,
      isSharedArrayBuffer,
      isProxy,
      isWebAssemblyCompiledModule,
      isModuleNamespaceObject,
      isAnyArrayBuffer,
      isArrayBufferView,
      isTypedArray,
      isUint8Array,
      isUint8ClampedArray,
      isUint16Array,
      isUint32Array,
      isInt8Array,
      isInt16Array,
      isInt32Array,
      isFloat32Array,
      isFloat64Array,
      isBigInt64Array,
      isBigUint64Array,
      isBoxedPrimitive,
      isBigIntObject
    };
  }

  if (name === 'config') {
    return {
      hasIntl: false,
    };
  }

  if (name === 'native_module') {
    return {
      moduleIds: []
    };
  }

  throw new Error('binding not found: ' + name);
}

// eslint-disable-next-line no-undef
getInternalBinding = internalBinding;
