const assert = require('assert');
const util = require('util');
const inspect = require('./');

const testInspect = (test, expected, options) => {
  const actual = inspect(test, options);
  assert.equal(actual, expected);
};

const testInspectAsNative = (test, options) => {
  const expected = util.inspect(test, options);
  testInspect(test, expected, options);
};

describe('browserified inspect', () => {
  it('inspects simple types', () => {
    testInspectAsNative(1);
    testInspectAsNative('string');
    testInspectAsNative(Symbol('sym'));
  });

  it('inspects objects', () => {
    testInspectAsNative({x: 1});
  });

  it('inspects class instances', () => {
    class C {}
    testInspectAsNative(new C());
  });

  it('inspects buffers', () => {
    testInspectAsNative(Buffer.from('abc'));
  });

  it.skip('inspects boxed primitives', () => {
    // eslint-disable-next-line no-new-wrappers
    testInspectAsNative(new String());
  });

  it('does not inspect objects with hidden properties', () => {
    const object = {x: 1};

    Object.defineProperty(object, 'hidden', {
      enumerable: false,
      value: 2
    });

    testInspectAsNative(object);
  });

  it('inspects objects with hidden symbols', () => {
    const object = {x: 1};

    Object.defineProperty(object, Symbol('hidden'), {
      enumerable: false,
      value: 2
    });

    testInspectAsNative(object);
  });

  context('when showHidden: true', () => {
    it('inspects objects with hidden properties', () => {
      const object = {x: 1};

      Object.defineProperty(object, 'hidden', {
        enumerable: false,
        value: 2
      });

      testInspectAsNative(object, {showHidden: true});
    });

    it('inspects objects with hidden symbols', () => {
      const object = {x: 1};

      Object.defineProperty(object, Symbol('hidden'), {
        enumerable: false,
        value: 2
      });

      testInspectAsNative(object, {showHidden: true});
    });
  });

  it('inspects arrays', () => {
    testInspectAsNative([1, 2, 3]);
  });

  it('inspects promises', () => {
    // NOTE: all promises will show as <pending> due to
    // limitations on inspecting promise status

    const pending = new Promise(resolve => setTimeout(resolve));
    const resolved = Promise.resolve(1);
    const rejected = Promise.reject(new Error());
    rejected.catch(() => {});

    testInspect(pending, 'Promise { <pending> }');
    testInspect(resolved, 'Promise { <pending> }');
    testInspect(rejected, 'Promise { <pending> }');
  });

  it('inspects weak collections', () => {
    testInspectAsNative(new WeakMap());
    testInspectAsNative(new WeakSet());
  });

  it('allows custom inspect', () => {
    assert.equal(
      inspect({[inspect.custom]: () => 'ok'}),
      'ok'
    );
  });
});


