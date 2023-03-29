const PATH = Symbol("PATH");
const DEREF = Symbol("DEREF");

class Keypath extends Function {
  constructor(...path) {
    super();
    this[PATH] = path;
  }

  [DEREF](object) {
    for (const key of this) {
      if (typeof object[key] === "function") {
        object = object[key].bind(object);
      } else {
        object = object[key];
      }
    }
    return object;
  }

  *[Symbol.iterator]() {
    yield* this[PATH];
  }
}

function keypath(base) {
  return new Proxy(base, {
    get(target, prop) {
      if (prop !== Symbol.iterator) {
        return keypath(new Keypath(...target, prop));
      } else {
        return target[prop];
      }
    },

    apply(target, thisArg, args) {
      return target[DEREF](...args);
    },
  });
}

function fnKeypath(base) {
  return new Proxy(base, {
    get(target, prop) {
      if (prop !== Symbol.iterator) {
        return fnKeypath(new Keypath(...target, prop));
      } else {
        return target[prop];
      }
    },

    apply(target, thisArg, args) {
      return (object) => target[DEREF](object)(...args);
    },
  });
}

/// A keypath to a property.
///
/// # Usage
/// ```js
/// const profiles = [{ user: { name: "Cam" }}, { user: { name: "Casey" }}];
/// const names = profiles.map(_.user.name);
/// ```
export const _ = keypath(new Keypath());

/// A keypath to a method call, with arguments provided
///
/// # Usage
/// ```js
/// const animals = [
///   { speak(times) { while (times --> 0) console.log('meow'); }},
///   { speak(times) { while (times --> 0) console.log('woof'); }},
/// ];
/// animals.forEach(λ.speak(3));
/// ```
export const λ = fnKeypath(new Keypath());
