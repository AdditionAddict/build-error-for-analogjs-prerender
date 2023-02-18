import "zone.js/bundles/zone-node.umd.js";
import { Subject, Subscription, Observable, merge as merge$1, of, ConnectableObservable, from, BehaviorSubject, EMPTY, concat, defer, combineLatest, throwError as throwError$1, EmptyError, pipe } from "rxjs";
import { share, concatMap, filter, map, first, tap, finalize, refCount, mergeMap, take, switchMap, catchError, defaultIfEmpty, startWith, scan, last as last$1, takeWhile, takeLast, mapTo } from "rxjs/operators";
import domino from "domino";
import * as xhr2 from "xhr2";
import * as url from "url";
import { __rest } from "tslib";
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function _regeneratorRuntime2() {
    return exports;
  };
  var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
    obj[key] = desc.value;
  }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define2(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self2, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self2, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function() {
    return this;
  });
  var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg, value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value2) {
          invoke("next", value2, resolve, reject);
        }, function(err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function(unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function(error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self2, context) {
    var state = "suspendedStart";
    return function(method, arg) {
      if ("executing" === state)
        throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method)
          throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg; ; ) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel)
              continue;
            return delegateResult;
          }
        }
        if ("next" === context.method)
          context.sent = context._sent = context.arg;
        else if ("throw" === context.method) {
          if ("suspendedStart" === state)
            throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else
          "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self2, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel)
            continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method, method = delegate.iterator[methodName];
    if (void 0 === method)
      return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type)
      return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = void 0), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod)
        return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next)
        return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1, next = function next2() {
          for (; ++i < iterable.length; )
            if (hasOwn.call(iterable, i))
              return next2.value = iterable[i], next2.done = false, next2;
          return next2.value = void 0, next2.done = true, next2;
        };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: void 0,
      done: true
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function(genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function(genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function(arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self2, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
    return this;
  }), define(Gp, "toString", function() {
    return "[object Generator]";
  }), exports.keys = function(val) {
    var object = Object(val), keys = [];
    for (var key in object)
      keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length; ) {
        var key2 = keys.pop();
        if (key2 in object)
          return next.value = key2, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), !skipTempReset)
        for (var name in this)
          "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
    },
    stop: function stop() {
      this.done = true;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type)
        throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done)
        throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = void 0), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i], record = entry.completion;
        if ("root" === entry.tryLoc)
          return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc)
              return handle(entry.catchLoc, true);
            if (this.prev < entry.finallyLoc)
              return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc)
              return handle(entry.catchLoc, true);
          } else {
            if (!hasFinally)
              throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc)
              return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type)
        throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc)
          return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName,
        nextLoc
      }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function getClosureSafeProperty(objWithPropertyToExtract) {
  for (let key in objWithPropertyToExtract) {
    if (objWithPropertyToExtract[key] === getClosureSafeProperty) {
      return key;
    }
  }
  throw Error("Could not find renamed property on target object.");
}
function stringify$1(token) {
  if (typeof token === "string") {
    return token;
  }
  if (Array.isArray(token)) {
    return "[" + token.map(stringify$1).join(", ") + "]";
  }
  if (token == null) {
    return "" + token;
  }
  if (token.overriddenName) {
    return `${token.overriddenName}`;
  }
  if (token.name) {
    return `${token.name}`;
  }
  const res = token.toString();
  if (res == null) {
    return "" + res;
  }
  const newLineIndex = res.indexOf("\n");
  return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}
function concatStringsWithSpace(before, after) {
  return before == null || before === "" ? after === null ? "" : after : after == null || after === "" ? before : before + " " + after;
}
const __forward_ref__ = /* @__PURE__ */ getClosureSafeProperty({
  __forward_ref__: getClosureSafeProperty
});
function forwardRef(forwardRefFn) {
  forwardRefFn.__forward_ref__ = forwardRef;
  forwardRefFn.toString = function() {
    return stringify$1(this());
  };
  return forwardRefFn;
}
function resolveForwardRef(type) {
  return isForwardRef(type) ? type() : type;
}
function isForwardRef(fn) {
  return typeof fn === "function" && fn.hasOwnProperty(__forward_ref__) && fn.__forward_ref__ === forwardRef;
}
function isEnvironmentProviders(value) {
  return value && !!value.ɵproviders;
}
const ERROR_DETAILS_PAGE_BASE_URL = "https://angular.io/errors";
const XSS_SECURITY_URL = "https://g.co/ng/security#xss";
class RuntimeError extends Error {
  constructor(code, message) {
    super(formatRuntimeError(code, message));
    this.code = code;
  }
}
function formatRuntimeError(code, message) {
  const fullCode = `NG0${Math.abs(code)}`;
  let errorMessage = `${fullCode}${message ? ": " + message.trim() : ""}`;
  if (false) {
    const addPeriodSeparator = !errorMessage.match(/[.,;!?]$/);
    const separator = addPeriodSeparator ? "." : "";
    errorMessage = `${errorMessage}${separator} Find more at ${ERROR_DETAILS_PAGE_BASE_URL}/${fullCode}`;
  }
  return errorMessage;
}
function renderStringify(value) {
  if (typeof value === "string")
    return value;
  if (value == null)
    return "";
  return String(value);
}
function stringifyForError(value) {
  if (typeof value === "function")
    return value.name || value.toString();
  if (typeof value === "object" && value != null && typeof value.type === "function") {
    return value.type.name || value.type.toString();
  }
  return renderStringify(value);
}
function throwCyclicDependencyError(token, path) {
  const depPath = path ? `. Dependency path: ${path.join(" > ")} > ${token}` : "";
  throw new RuntimeError(-200, `Circular dependency in DI detected for ${token}${depPath}`);
}
function throwMixedMultiProviderError() {
  throw new Error(`Cannot mix multi providers and regular providers`);
}
function throwInvalidProviderError(ngModuleType, providers, provider) {
  if (ngModuleType && providers) {
    const providerDetail = providers.map((v) => v == provider ? "?" + provider + "?" : "...");
    throw new Error(`Invalid provider for the NgModule '${stringify$1(ngModuleType)}' - only instances of Provider and Type are allowed, got: [${providerDetail.join(", ")}]`);
  } else if (isEnvironmentProviders(provider)) {
    if (provider.ɵfromNgModule) {
      throw new RuntimeError(207, `Invalid providers from 'importProvidersFrom' present in a non-environment injector. 'importProvidersFrom' can't be used for component providers.`);
    } else {
      throw new RuntimeError(207, `Invalid providers present in a non-environment injector. 'EnvironmentProviders' can't be used for component providers.`);
    }
  } else {
    throw new Error("Invalid provider");
  }
}
function throwProviderNotFoundError(token, injectorName) {
  const injectorDetails = injectorName ? ` in ${injectorName}` : "";
  throw new RuntimeError(-201, false);
}
function assertNumber(actual, msg) {
  if (!(typeof actual === "number")) {
    throwError(msg, typeof actual, "number", "===");
  }
}
function assertNumberInRange(actual, minInclusive, maxInclusive) {
  assertNumber(actual, "Expected a number");
  assertLessThanOrEqual(actual, maxInclusive, "Expected number to be less than or equal to");
  assertGreaterThanOrEqual(actual, minInclusive, "Expected number to be greater than or equal to");
}
function assertString(actual, msg) {
  if (!(typeof actual === "string")) {
    throwError(msg, actual === null ? "null" : typeof actual, "string", "===");
  }
}
function assertFunction(actual, msg) {
  if (!(typeof actual === "function")) {
    throwError(msg, actual === null ? "null" : typeof actual, "function", "===");
  }
}
function assertEqual(actual, expected, msg) {
  if (!(actual == expected)) {
    throwError(msg, actual, expected, "==");
  }
}
function assertNotEqual(actual, expected, msg) {
  if (!(actual != expected)) {
    throwError(msg, actual, expected, "!=");
  }
}
function assertSame(actual, expected, msg) {
  if (!(actual === expected)) {
    throwError(msg, actual, expected, "===");
  }
}
function assertNotSame(actual, expected, msg) {
  if (!(actual !== expected)) {
    throwError(msg, actual, expected, "!==");
  }
}
function assertLessThan(actual, expected, msg) {
  if (!(actual < expected)) {
    throwError(msg, actual, expected, "<");
  }
}
function assertLessThanOrEqual(actual, expected, msg) {
  if (!(actual <= expected)) {
    throwError(msg, actual, expected, "<=");
  }
}
function assertGreaterThan(actual, expected, msg) {
  if (!(actual > expected)) {
    throwError(msg, actual, expected, ">");
  }
}
function assertGreaterThanOrEqual(actual, expected, msg) {
  if (!(actual >= expected)) {
    throwError(msg, actual, expected, ">=");
  }
}
function assertDefined(actual, msg) {
  if (actual == null) {
    throwError(msg, actual, null, "!=");
  }
}
function throwError(msg, actual, expected, comparison) {
  throw new Error(`ASSERTION ERROR: ${msg}` + (comparison == null ? "" : ` [Expected=> ${expected} ${comparison} ${actual} <=Actual]`));
}
function assertDomNode(node) {
  if (!(typeof Node !== "undefined" && node instanceof Node) && !(typeof node === "object" && node != null && node.constructor.name === "WebWorkerRenderNode")) {
    throwError(`The provided value must be an instance of a DOM Node but got ${stringify$1(node)}`);
  }
}
function assertIndexInRange(arr, index) {
  assertDefined(arr, "Array must be defined.");
  const maxLen = arr.length;
  if (index < 0 || index >= maxLen) {
    throwError(`Index expected to be less than ${maxLen} but got ${index}`);
  }
}
function ɵɵdefineInjectable(opts) {
  return {
    token: opts.token,
    providedIn: opts.providedIn || null,
    factory: opts.factory,
    value: void 0
  };
}
function ɵɵdefineInjector(options) {
  return {
    providers: options.providers || [],
    imports: options.imports || []
  };
}
function getInjectableDef(type) {
  return getOwnDefinition(type, NG_PROV_DEF) || getOwnDefinition(type, NG_INJECTABLE_DEF);
}
function isInjectable(type) {
  return getInjectableDef(type) !== null;
}
function getOwnDefinition(type, field) {
  return type.hasOwnProperty(field) ? type[field] : null;
}
function getInheritedInjectableDef(type) {
  const def = type && (type[NG_PROV_DEF] || type[NG_INJECTABLE_DEF]);
  if (def) {
    const typeName = getTypeName(type);
    console.warn(`DEPRECATED: DI is instantiating a token "${typeName}" that inherits its @Injectable decorator but does not provide one itself.
This will become an error in a future version of Angular. Please add @Injectable() to the "${typeName}" class.`);
    return def;
  } else {
    return null;
  }
}
function getTypeName(type) {
  if (type.hasOwnProperty("name")) {
    return type.name;
  }
  const match2 = ("" + type).match(/^function\s*([^\s(]+)/);
  return match2 === null ? "" : match2[1];
}
function getInjectorDef(type) {
  return type && (type.hasOwnProperty(NG_INJ_DEF) || type.hasOwnProperty(NG_INJECTOR_DEF)) ? type[NG_INJ_DEF] : null;
}
const NG_PROV_DEF = /* @__PURE__ */ getClosureSafeProperty({
  ɵprov: getClosureSafeProperty
});
const NG_INJ_DEF = /* @__PURE__ */ getClosureSafeProperty({
  ɵinj: getClosureSafeProperty
});
const NG_INJECTABLE_DEF = /* @__PURE__ */ getClosureSafeProperty({
  ngInjectableDef: getClosureSafeProperty
});
const NG_INJECTOR_DEF = /* @__PURE__ */ getClosureSafeProperty({
  ngInjectorDef: getClosureSafeProperty
});
var InjectFlags = /* @__PURE__ */ (() => {
  InjectFlags = InjectFlags || {};
  InjectFlags[InjectFlags["Default"] = 0] = "Default";
  InjectFlags[InjectFlags["Host"] = 1] = "Host";
  InjectFlags[InjectFlags["Self"] = 2] = "Self";
  InjectFlags[InjectFlags["SkipSelf"] = 4] = "SkipSelf";
  InjectFlags[InjectFlags["Optional"] = 8] = "Optional";
  return InjectFlags;
})();
let _injectImplementation;
function getInjectImplementation() {
  return _injectImplementation;
}
function setInjectImplementation(impl) {
  const previous = _injectImplementation;
  _injectImplementation = impl;
  return previous;
}
function injectRootLimpMode(token, notFoundValue, flags) {
  const injectableDef = getInjectableDef(token);
  if (injectableDef && injectableDef.providedIn == "root") {
    return injectableDef.value === void 0 ? injectableDef.value = injectableDef.factory() : injectableDef.value;
  }
  if (flags & InjectFlags.Optional)
    return null;
  if (notFoundValue !== void 0)
    return notFoundValue;
  throwProviderNotFoundError(stringify$1(token), "Injector");
}
function assertInjectImplementationNotEqual(fn) {
}
const _global = /* @__PURE__ */ (() => typeof globalThis !== "undefined" && globalThis || typeof global !== "undefined" && global || typeof window !== "undefined" && window || typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && self)();
function ngDevModeResetPerfCounters() {
  const locationString = typeof location !== "undefined" ? location.toString() : "";
  const newCounters = {
    namedConstructors: locationString.indexOf("ngDevMode=namedConstructors") != -1,
    firstCreatePass: 0,
    tNode: 0,
    tView: 0,
    rendererCreateTextNode: 0,
    rendererSetText: 0,
    rendererCreateElement: 0,
    rendererAddEventListener: 0,
    rendererSetAttribute: 0,
    rendererRemoveAttribute: 0,
    rendererSetProperty: 0,
    rendererSetClassName: 0,
    rendererAddClass: 0,
    rendererRemoveClass: 0,
    rendererSetStyle: 0,
    rendererRemoveStyle: 0,
    rendererDestroy: 0,
    rendererDestroyNode: 0,
    rendererMoveNode: 0,
    rendererRemoveNode: 0,
    rendererAppendChild: 0,
    rendererInsertBefore: 0,
    rendererCreateComment: 0
  };
  const allowNgDevModeTrue = locationString.indexOf("ngDevMode=false") === -1;
  _global["ngDevMode"] = allowNgDevModeTrue && newCounters;
  return newCounters;
}
function initNgDevMode() {
  if (false) {
    if (true) {
      ngDevModeResetPerfCounters();
    }
    return false;
  }
  return false;
}
const _THROW_IF_NOT_FOUND = {};
const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
const DI_DECORATOR_FLAG = "__NG_DI_FLAG__";
const NG_TEMP_TOKEN_PATH = "ngTempTokenPath";
const NG_TOKEN_PATH = "ngTokenPath";
const NEW_LINE = /\n/gm;
const NO_NEW_LINE = "ɵ";
const SOURCE = "__source";
let _currentInjector = void 0;
function setCurrentInjector(injector) {
  const former = _currentInjector;
  _currentInjector = injector;
  return former;
}
function injectInjectorOnly(token, flags = InjectFlags.Default) {
  if (_currentInjector === void 0) {
    throw new RuntimeError(-203, false);
  } else if (_currentInjector === null) {
    return injectRootLimpMode(token, void 0, flags);
  } else {
    return _currentInjector.get(token, flags & InjectFlags.Optional ? null : void 0, flags);
  }
}
function ɵɵinject(token, flags = InjectFlags.Default) {
  return (getInjectImplementation() || injectInjectorOnly)(resolveForwardRef(token), flags);
}
function inject(token, flags = InjectFlags.Default) {
  return ɵɵinject(token, convertToBitFlags(flags));
}
function convertToBitFlags(flags) {
  if (typeof flags === "undefined" || typeof flags === "number") {
    return flags;
  }
  return 0 | // comment to force a line break in the formatter
  (flags.optional && 8) | (flags.host && 1) | (flags.self && 2) | (flags.skipSelf && 4);
}
function injectArgs(types) {
  const args = [];
  for (let i = 0; i < types.length; i++) {
    const arg = resolveForwardRef(types[i]);
    if (Array.isArray(arg)) {
      if (arg.length === 0) {
        throw new RuntimeError(900, false);
      }
      let type = void 0;
      let flags = InjectFlags.Default;
      for (let j = 0; j < arg.length; j++) {
        const meta = arg[j];
        const flag = getInjectFlag(meta);
        if (typeof flag === "number") {
          if (flag === -1) {
            type = meta.token;
          } else {
            flags |= flag;
          }
        } else {
          type = meta;
        }
      }
      args.push(ɵɵinject(type, flags));
    } else {
      args.push(ɵɵinject(arg));
    }
  }
  return args;
}
function attachInjectFlag(decorator, flag) {
  decorator[DI_DECORATOR_FLAG] = flag;
  decorator.prototype[DI_DECORATOR_FLAG] = flag;
  return decorator;
}
function getInjectFlag(token) {
  return token[DI_DECORATOR_FLAG];
}
function catchInjectorError(e, token, injectorErrorName, source) {
  const tokenPath = e[NG_TEMP_TOKEN_PATH];
  if (token[SOURCE]) {
    tokenPath.unshift(token[SOURCE]);
  }
  e.message = formatError("\n" + e.message, tokenPath, injectorErrorName, source);
  e[NG_TOKEN_PATH] = tokenPath;
  e[NG_TEMP_TOKEN_PATH] = null;
  throw e;
}
function formatError(text, obj, injectorErrorName, source = null) {
  text = text && text.charAt(0) === "\n" && text.charAt(1) == NO_NEW_LINE ? text.slice(2) : text;
  let context = stringify$1(obj);
  if (Array.isArray(obj)) {
    context = obj.map(stringify$1).join(" -> ");
  } else if (typeof obj === "object") {
    let parts = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];
        parts.push(key + ":" + (typeof value === "string" ? JSON.stringify(value) : stringify$1(value)));
      }
    }
    context = `{${parts.join(", ")}}`;
  }
  return `${injectorErrorName}${source ? "(" + source + ")" : ""}[${context}]: ${text.replace(NEW_LINE, "\n  ")}`;
}
function noSideEffects(fn) {
  return {
    toString: fn
  }.toString();
}
var ChangeDetectionStrategy = /* @__PURE__ */ (() => {
  ChangeDetectionStrategy = ChangeDetectionStrategy || {};
  ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
  ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
  return ChangeDetectionStrategy;
})();
var ViewEncapsulation$1 = /* @__PURE__ */ (() => {
  (function(ViewEncapsulation2) {
    ViewEncapsulation2[ViewEncapsulation2["Emulated"] = 0] = "Emulated";
    ViewEncapsulation2[ViewEncapsulation2["None"] = 2] = "None";
    ViewEncapsulation2[ViewEncapsulation2["ShadowDom"] = 3] = "ShadowDom";
  })(ViewEncapsulation$1 || (ViewEncapsulation$1 = {}));
  return ViewEncapsulation$1;
})();
const EMPTY_OBJ = {};
const EMPTY_ARRAY$1 = [];
if (false)
  ;
const NG_COMP_DEF = /* @__PURE__ */ getClosureSafeProperty({
  ɵcmp: getClosureSafeProperty
});
const NG_DIR_DEF = /* @__PURE__ */ getClosureSafeProperty({
  ɵdir: getClosureSafeProperty
});
const NG_PIPE_DEF = /* @__PURE__ */ getClosureSafeProperty({
  ɵpipe: getClosureSafeProperty
});
const NG_MOD_DEF = /* @__PURE__ */ getClosureSafeProperty({
  ɵmod: getClosureSafeProperty
});
const NG_FACTORY_DEF = /* @__PURE__ */ getClosureSafeProperty({
  ɵfac: getClosureSafeProperty
});
const NG_ELEMENT_ID = /* @__PURE__ */ getClosureSafeProperty({
  __NG_ELEMENT_ID__: getClosureSafeProperty
});
let componentDefCount = 0;
function ɵɵdefineComponent(componentDefinition) {
  return noSideEffects(() => {
    const type = componentDefinition.type;
    const standalone = componentDefinition.standalone === true;
    const declaredInputs = {};
    const def = {
      type,
      providersResolver: null,
      decls: componentDefinition.decls,
      vars: componentDefinition.vars,
      factory: null,
      template: componentDefinition.template || null,
      consts: componentDefinition.consts || null,
      ngContentSelectors: componentDefinition.ngContentSelectors,
      hostBindings: componentDefinition.hostBindings || null,
      hostVars: componentDefinition.hostVars || 0,
      hostAttrs: componentDefinition.hostAttrs || null,
      contentQueries: componentDefinition.contentQueries || null,
      declaredInputs,
      inputs: null,
      outputs: null,
      exportAs: componentDefinition.exportAs || null,
      onPush: componentDefinition.changeDetection === ChangeDetectionStrategy.OnPush,
      directiveDefs: null,
      pipeDefs: null,
      standalone,
      dependencies: standalone && componentDefinition.dependencies || null,
      getStandaloneInjector: null,
      selectors: componentDefinition.selectors || EMPTY_ARRAY$1,
      viewQuery: componentDefinition.viewQuery || null,
      features: componentDefinition.features || null,
      data: componentDefinition.data || {},
      encapsulation: componentDefinition.encapsulation || ViewEncapsulation$1.Emulated,
      id: `c${componentDefCount++}`,
      styles: componentDefinition.styles || EMPTY_ARRAY$1,
      _: null,
      setInput: null,
      schemas: componentDefinition.schemas || null,
      tView: null,
      findHostDirectiveDefs: null,
      hostDirectives: null
    };
    const dependencies = componentDefinition.dependencies;
    const feature = componentDefinition.features;
    def.inputs = invertObject(componentDefinition.inputs, declaredInputs), def.outputs = invertObject(componentDefinition.outputs), feature && feature.forEach((fn) => fn(def));
    def.directiveDefs = dependencies ? () => (typeof dependencies === "function" ? dependencies() : dependencies).map(extractDirectiveDef).filter(nonNull) : null;
    def.pipeDefs = dependencies ? () => (typeof dependencies === "function" ? dependencies() : dependencies).map(getPipeDef$1).filter(nonNull) : null;
    return def;
  });
}
function extractDirectiveDef(type) {
  return getComponentDef(type) || getDirectiveDef(type);
}
function nonNull(value) {
  return value !== null;
}
function ɵɵdefineNgModule(def) {
  return noSideEffects(() => {
    const res = {
      type: def.type,
      bootstrap: def.bootstrap || EMPTY_ARRAY$1,
      declarations: def.declarations || EMPTY_ARRAY$1,
      imports: def.imports || EMPTY_ARRAY$1,
      exports: def.exports || EMPTY_ARRAY$1,
      transitiveCompileScopes: null,
      schemas: def.schemas || null,
      id: def.id || null
    };
    return res;
  });
}
function invertObject(obj, secondary) {
  if (obj == null)
    return EMPTY_OBJ;
  const newLookup = {};
  for (const minifiedKey in obj) {
    if (obj.hasOwnProperty(minifiedKey)) {
      let publicName = obj[minifiedKey];
      let declaredName = publicName;
      if (Array.isArray(publicName)) {
        declaredName = publicName[1];
        publicName = publicName[0];
      }
      newLookup[publicName] = minifiedKey;
      if (secondary) {
        secondary[publicName] = declaredName;
      }
    }
  }
  return newLookup;
}
const ɵɵdefineDirective = ɵɵdefineComponent;
function ɵɵdefinePipe(pipeDef) {
  return {
    type: pipeDef.type,
    name: pipeDef.name,
    factory: null,
    pure: pipeDef.pure !== false,
    standalone: pipeDef.standalone === true,
    onDestroy: pipeDef.type.prototype.ngOnDestroy || null
  };
}
function getComponentDef(type) {
  return type[NG_COMP_DEF] || null;
}
function getDirectiveDef(type) {
  return type[NG_DIR_DEF] || null;
}
function getPipeDef$1(type) {
  return type[NG_PIPE_DEF] || null;
}
function isStandalone(type) {
  const def = getComponentDef(type) || getDirectiveDef(type) || getPipeDef$1(type);
  return def !== null ? def.standalone : false;
}
function getNgModuleDef(type, throwNotFound) {
  const ngModuleDef = type[NG_MOD_DEF] || null;
  if (!ngModuleDef && throwNotFound === true) {
    throw new Error(`Type ${stringify$1(type)} does not have 'ɵmod' property.`);
  }
  return ngModuleDef;
}
const TYPE = 1;
const HAS_TRANSPLANTED_VIEWS = 2;
const NATIVE = 7;
const VIEW_REFS = 8;
const MOVED_VIEWS = 9;
const CONTAINER_HEADER_OFFSET = 10;
const HOST = 0;
const TVIEW = 1;
const FLAGS = 2;
const PARENT = 3;
const NEXT = 4;
const TRANSPLANTED_VIEWS_TO_REFRESH = 5;
const T_HOST = 6;
const CLEANUP = 7;
const CONTEXT = 8;
const INJECTOR$1 = 9;
const RENDERER_FACTORY = 10;
const RENDERER = 11;
const SANITIZER = 12;
const CHILD_HEAD = 13;
const CHILD_TAIL = 14;
const DECLARATION_VIEW = 15;
const DECLARATION_COMPONENT_VIEW = 16;
const DECLARATION_LCONTAINER = 17;
const PREORDER_HOOK_FLAGS = 18;
const QUERIES = 19;
const ID = 20;
const EMBEDDED_VIEW_INJECTOR = 21;
const HEADER_OFFSET = 22;
function isLView(value) {
  return Array.isArray(value) && typeof value[TYPE] === "object";
}
function isLContainer(value) {
  return Array.isArray(value) && value[TYPE] === true;
}
function isContentQueryHost(tNode) {
  return (tNode.flags & 4) !== 0;
}
function isComponentHost(tNode) {
  return tNode.componentOffset > -1;
}
function isDirectiveHost(tNode) {
  return (tNode.flags & 1) === 1;
}
function isComponentDef(def) {
  return def.template !== null;
}
function isRootView(target) {
  return (target[FLAGS] & 256) !== 0;
}
function assertTNodeForLView(tNode, lView) {
  assertTNodeForTView(tNode, lView[TVIEW]);
}
function assertTNodeForTView(tNode, tView) {
  assertTNode(tNode);
  tNode.hasOwnProperty("tView_") && assertEqual(tNode.tView_, tView, "This TNode does not belong to this TView.");
}
function assertTNode(tNode) {
  assertDefined(tNode, "TNode must be defined");
  if (!(tNode && typeof tNode === "object" && tNode.hasOwnProperty("directiveStylingLast"))) {
    throwError("Not of type TNode, got: " + tNode);
  }
}
function assertComponentType(actual, msg = "Type passed in is not ComponentType, it does not have 'ɵcmp' property.") {
  if (!getComponentDef(actual)) {
    throwError(msg);
  }
}
function assertNgModuleType(actual, msg = "Type passed in is not NgModuleType, it does not have 'ɵmod' property.") {
  if (!getNgModuleDef(actual)) {
    throwError(msg);
  }
}
function assertHasParent(tNode) {
  assertDefined(tNode, "currentTNode should exist!");
  assertDefined(tNode.parent, "currentTNode should have a parent");
}
function assertLContainer(value) {
  assertDefined(value, "LContainer must be defined");
  assertEqual(isLContainer(value), true, "Expecting LContainer");
}
function assertLViewOrUndefined(value) {
  value && assertEqual(isLView(value), true, "Expecting LView or undefined or null");
}
function assertLView(value) {
  assertDefined(value, "LView must be defined");
  assertEqual(isLView(value), true, "Expecting LView");
}
function assertFirstCreatePass(tView, errMessage) {
  assertEqual(tView.firstCreatePass, true, errMessage || "Should only be called in first create pass.");
}
function assertFirstUpdatePass(tView, errMessage) {
  assertEqual(tView.firstUpdatePass, true, errMessage || "Should only be called in first update pass.");
}
function assertDirectiveDef(obj) {
  if (obj.type === void 0 || obj.selectors == void 0 || obj.inputs === void 0) {
    throwError(`Expected a DirectiveDef/ComponentDef and this object does not seem to have the expected shape.`);
  }
}
function assertIndexInDeclRange(lView, index) {
  const tView = lView[1];
  assertBetween(HEADER_OFFSET, tView.bindingStartIndex, index);
}
function assertIndexInExpandoRange(lView, index) {
  const tView = lView[1];
  assertBetween(tView.expandoStartIndex, lView.length, index);
}
function assertBetween(lower, upper, index) {
  if (!(lower <= index && index < upper)) {
    throwError(`Index out of range (expecting ${lower} <= ${index} < ${upper})`);
  }
}
function assertProjectionSlots(lView, errMessage) {
  assertDefined(lView[DECLARATION_COMPONENT_VIEW], "Component views should exist.");
  assertDefined(lView[DECLARATION_COMPONENT_VIEW][T_HOST].projection, errMessage || "Components with projection nodes (<ng-content>) must have projection slots defined.");
}
function assertParentView(lView, errMessage) {
  assertDefined(lView, errMessage || "Component views should always have a parent view (component's host view)");
}
function assertNodeInjector(lView, injectorIndex) {
  assertIndexInExpandoRange(lView, injectorIndex);
  assertIndexInExpandoRange(
    lView,
    injectorIndex + 8
    /* NodeInjectorOffset.PARENT */
  );
  assertNumber(lView[injectorIndex + 0], "injectorIndex should point to a bloom filter");
  assertNumber(lView[injectorIndex + 1], "injectorIndex should point to a bloom filter");
  assertNumber(lView[injectorIndex + 2], "injectorIndex should point to a bloom filter");
  assertNumber(lView[injectorIndex + 3], "injectorIndex should point to a bloom filter");
  assertNumber(lView[injectorIndex + 4], "injectorIndex should point to a bloom filter");
  assertNumber(lView[injectorIndex + 5], "injectorIndex should point to a bloom filter");
  assertNumber(lView[injectorIndex + 6], "injectorIndex should point to a bloom filter");
  assertNumber(lView[injectorIndex + 7], "injectorIndex should point to a bloom filter");
  assertNumber(lView[
    injectorIndex + 8
    /* NodeInjectorOffset.PARENT */
  ], "injectorIndex should point to parent injector");
}
function getFactoryDef(type, throwNotFound) {
  const hasFactoryDef = type.hasOwnProperty(NG_FACTORY_DEF);
  if (!hasFactoryDef && throwNotFound === true && false) {
    throw new Error(`Type ${stringify$1(type)} does not have 'ɵfac' property.`);
  }
  return hasFactoryDef ? type[NG_FACTORY_DEF] : null;
}
class SimpleChange {
  constructor(previousValue, currentValue, firstChange) {
    this.previousValue = previousValue;
    this.currentValue = currentValue;
    this.firstChange = firstChange;
  }
  /**
   * Check whether the new value is the first value assigned.
   */
  isFirstChange() {
    return this.firstChange;
  }
}
function ɵɵNgOnChangesFeature() {
  return NgOnChangesFeatureImpl;
}
function NgOnChangesFeatureImpl(definition) {
  if (definition.type.prototype.ngOnChanges) {
    definition.setInput = ngOnChangesSetInput;
  }
  return rememberChangeHistoryAndInvokeOnChangesHook;
}
ɵɵNgOnChangesFeature.ngInherit = true;
function rememberChangeHistoryAndInvokeOnChangesHook() {
  const simpleChangesStore = getSimpleChangesStore(this);
  const current = simpleChangesStore === null || simpleChangesStore === void 0 ? void 0 : simpleChangesStore.current;
  if (current) {
    const previous = simpleChangesStore.previous;
    if (previous === EMPTY_OBJ) {
      simpleChangesStore.previous = current;
    } else {
      for (let key in current) {
        previous[key] = current[key];
      }
    }
    simpleChangesStore.current = null;
    this.ngOnChanges(current);
  }
}
function ngOnChangesSetInput(instance, value, publicName, privateName) {
  const declaredName = this.declaredInputs[publicName];
  const simpleChangesStore = getSimpleChangesStore(instance) || setSimpleChangesStore(instance, {
    previous: EMPTY_OBJ,
    current: null
  });
  const current = simpleChangesStore.current || (simpleChangesStore.current = {});
  const previous = simpleChangesStore.previous;
  const previousChange = previous[declaredName];
  current[declaredName] = new SimpleChange(previousChange && previousChange.currentValue, value, previous === EMPTY_OBJ);
  instance[privateName] = value;
}
const SIMPLE_CHANGES_STORE = "__ngSimpleChanges__";
function getSimpleChangesStore(instance) {
  return instance[SIMPLE_CHANGES_STORE] || null;
}
function setSimpleChangesStore(instance, store2) {
  return instance[SIMPLE_CHANGES_STORE] = store2;
}
let profilerCallback = null;
const setProfiler = (profiler2) => {
  profilerCallback = profiler2;
};
const profiler = function(event, instance, hookOrListener) {
  if (profilerCallback != null) {
    profilerCallback(event, instance, hookOrListener);
  }
};
const SVG_NAMESPACE = "svg";
const MATH_ML_NAMESPACE = "math";
function unwrapRNode(value) {
  while (Array.isArray(value)) {
    value = value[HOST];
  }
  return value;
}
function getNativeByIndex(index, lView) {
  return unwrapRNode(lView[index]);
}
function getNativeByTNode(tNode, lView) {
  const node = unwrapRNode(lView[tNode.index]);
  return node;
}
function getTNode(tView, index) {
  const tNode = tView.data[index];
  return tNode;
}
function load(view, index) {
  return view[index];
}
function getComponentLViewByIndex(nodeIndex, hostView) {
  const slotValue = hostView[nodeIndex];
  const lView = isLView(slotValue) ? slotValue : slotValue[HOST];
  return lView;
}
function isCreationMode(view) {
  return (view[FLAGS] & 4) === 4;
}
function viewAttachedToChangeDetector(view) {
  return (view[FLAGS] & 64) === 64;
}
function viewAttachedToContainer(view) {
  return isLContainer(view[PARENT]);
}
function getConstant(consts, index) {
  if (index === null || index === void 0)
    return null;
  return consts[index];
}
function resetPreOrderHookFlags(lView) {
  lView[PREORDER_HOOK_FLAGS] = 0;
}
function updateTransplantedViewCount(lContainer, amount) {
  lContainer[TRANSPLANTED_VIEWS_TO_REFRESH] += amount;
  let viewOrContainer = lContainer;
  let parent = lContainer[PARENT];
  while (parent !== null && (amount === 1 && viewOrContainer[TRANSPLANTED_VIEWS_TO_REFRESH] === 1 || amount === -1 && viewOrContainer[TRANSPLANTED_VIEWS_TO_REFRESH] === 0)) {
    parent[TRANSPLANTED_VIEWS_TO_REFRESH] += amount;
    viewOrContainer = parent;
    parent = parent[PARENT];
  }
}
const instructionState = {
  lFrame: /* @__PURE__ */ createLFrame(null),
  bindingsEnabled: true
};
let _isInCheckNoChangesMode = false;
function getElementDepthCount() {
  return instructionState.lFrame.elementDepthCount;
}
function increaseElementDepthCount() {
  instructionState.lFrame.elementDepthCount++;
}
function decreaseElementDepthCount() {
  instructionState.lFrame.elementDepthCount--;
}
function getLView() {
  return instructionState.lFrame.lView;
}
function getTView() {
  return instructionState.lFrame.tView;
}
function getCurrentTNode() {
  let currentTNode = getCurrentTNodePlaceholderOk();
  while (currentTNode !== null && currentTNode.type === 64) {
    currentTNode = currentTNode.parent;
  }
  return currentTNode;
}
function getCurrentTNodePlaceholderOk() {
  return instructionState.lFrame.currentTNode;
}
function getCurrentParentTNode() {
  const lFrame = instructionState.lFrame;
  const currentTNode = lFrame.currentTNode;
  return lFrame.isParent ? currentTNode : currentTNode.parent;
}
function setCurrentTNode(tNode, isParent) {
  const lFrame = instructionState.lFrame;
  lFrame.currentTNode = tNode;
  lFrame.isParent = isParent;
}
function isCurrentTNodeParent() {
  return instructionState.lFrame.isParent;
}
function setCurrentTNodeAsNotParent() {
  instructionState.lFrame.isParent = false;
}
function isInCheckNoChangesMode() {
  throwError("Must never be called in production mode");
  return _isInCheckNoChangesMode;
}
function setIsInCheckNoChangesMode(mode) {
  throwError("Must never be called in production mode");
  _isInCheckNoChangesMode = mode;
}
function getBindingRoot() {
  const lFrame = instructionState.lFrame;
  let index = lFrame.bindingRootIndex;
  if (index === -1) {
    index = lFrame.bindingRootIndex = lFrame.tView.bindingStartIndex;
  }
  return index;
}
function getBindingIndex() {
  return instructionState.lFrame.bindingIndex;
}
function setBindingIndex(value) {
  return instructionState.lFrame.bindingIndex = value;
}
function nextBindingIndex() {
  return instructionState.lFrame.bindingIndex++;
}
function incrementBindingIndex(count) {
  const lFrame = instructionState.lFrame;
  const index = lFrame.bindingIndex;
  lFrame.bindingIndex = lFrame.bindingIndex + count;
  return index;
}
function isInI18nBlock() {
  return instructionState.lFrame.inI18n;
}
function setBindingRootForHostBindings(bindingRootIndex, currentDirectiveIndex) {
  const lFrame = instructionState.lFrame;
  lFrame.bindingIndex = lFrame.bindingRootIndex = bindingRootIndex;
  setCurrentDirectiveIndex(currentDirectiveIndex);
}
function getCurrentDirectiveIndex() {
  return instructionState.lFrame.currentDirectiveIndex;
}
function setCurrentDirectiveIndex(currentDirectiveIndex) {
  instructionState.lFrame.currentDirectiveIndex = currentDirectiveIndex;
}
function getCurrentDirectiveDef(tData) {
  const currentDirectiveIndex = instructionState.lFrame.currentDirectiveIndex;
  return currentDirectiveIndex === -1 ? null : tData[currentDirectiveIndex];
}
function setCurrentQueryIndex(value) {
  instructionState.lFrame.currentQueryIndex = value;
}
function getDeclarationTNode(lView) {
  const tView = lView[TVIEW];
  if (tView.type === 2) {
    return tView.declTNode;
  }
  if (tView.type === 1) {
    return lView[T_HOST];
  }
  return null;
}
function enterDI(lView, tNode, flags) {
  if (flags & InjectFlags.SkipSelf) {
    let parentTNode = tNode;
    let parentLView = lView;
    while (true) {
      parentTNode = parentTNode.parent;
      if (parentTNode === null && !(flags & InjectFlags.Host)) {
        parentTNode = getDeclarationTNode(parentLView);
        if (parentTNode === null)
          break;
        parentLView = parentLView[DECLARATION_VIEW];
        if (parentTNode.type & (2 | 8)) {
          break;
        }
      } else {
        break;
      }
    }
    if (parentTNode === null) {
      return false;
    } else {
      tNode = parentTNode;
      lView = parentLView;
    }
  }
  const lFrame = instructionState.lFrame = allocLFrame();
  lFrame.currentTNode = tNode;
  lFrame.lView = lView;
  return true;
}
function enterView(newView) {
  const newLFrame = allocLFrame();
  if (false) {
    assertEqual(newLFrame.isParent, true, "Expected clean LFrame");
    assertEqual(newLFrame.lView, null, "Expected clean LFrame");
    assertEqual(newLFrame.tView, null, "Expected clean LFrame");
    assertEqual(newLFrame.selectedIndex, -1, "Expected clean LFrame");
    assertEqual(newLFrame.elementDepthCount, 0, "Expected clean LFrame");
    assertEqual(newLFrame.currentDirectiveIndex, -1, "Expected clean LFrame");
    assertEqual(newLFrame.currentNamespace, null, "Expected clean LFrame");
    assertEqual(newLFrame.bindingRootIndex, -1, "Expected clean LFrame");
    assertEqual(newLFrame.currentQueryIndex, 0, "Expected clean LFrame");
  }
  const tView = newView[TVIEW];
  instructionState.lFrame = newLFrame;
  newLFrame.currentTNode = tView.firstChild;
  newLFrame.lView = newView;
  newLFrame.tView = tView;
  newLFrame.contextLView = newView;
  newLFrame.bindingIndex = tView.bindingStartIndex;
  newLFrame.inI18n = false;
}
function allocLFrame() {
  const currentLFrame = instructionState.lFrame;
  const childLFrame = currentLFrame === null ? null : currentLFrame.child;
  const newLFrame = childLFrame === null ? createLFrame(currentLFrame) : childLFrame;
  return newLFrame;
}
function createLFrame(parent) {
  const lFrame = {
    currentTNode: null,
    isParent: true,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent,
    child: null,
    inI18n: false
  };
  parent !== null && (parent.child = lFrame);
  return lFrame;
}
function leaveViewLight() {
  const oldLFrame = instructionState.lFrame;
  instructionState.lFrame = oldLFrame.parent;
  oldLFrame.currentTNode = null;
  oldLFrame.lView = null;
  return oldLFrame;
}
const leaveDI = leaveViewLight;
function leaveView() {
  const oldLFrame = leaveViewLight();
  oldLFrame.isParent = true;
  oldLFrame.tView = null;
  oldLFrame.selectedIndex = -1;
  oldLFrame.contextLView = null;
  oldLFrame.elementDepthCount = 0;
  oldLFrame.currentDirectiveIndex = -1;
  oldLFrame.currentNamespace = null;
  oldLFrame.bindingRootIndex = -1;
  oldLFrame.bindingIndex = -1;
  oldLFrame.currentQueryIndex = 0;
}
function getSelectedIndex() {
  return instructionState.lFrame.selectedIndex;
}
function setSelectedIndex(index) {
  instructionState.lFrame.selectedIndex = index;
}
function getSelectedTNode() {
  const lFrame = instructionState.lFrame;
  return getTNode(lFrame.tView, lFrame.selectedIndex);
}
function getNamespace$1() {
  return instructionState.lFrame.currentNamespace;
}
function registerPreOrderHooks(directiveIndex, directiveDef, tView) {
  const {
    ngOnChanges,
    ngOnInit,
    ngDoCheck
  } = directiveDef.type.prototype;
  if (ngOnChanges) {
    const wrappedOnChanges = NgOnChangesFeatureImpl(directiveDef);
    (tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, wrappedOnChanges);
    (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, wrappedOnChanges);
  }
  if (ngOnInit) {
    (tView.preOrderHooks || (tView.preOrderHooks = [])).push(0 - directiveIndex, ngOnInit);
  }
  if (ngDoCheck) {
    (tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, ngDoCheck);
    (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, ngDoCheck);
  }
}
function registerPostOrderHooks(tView, tNode) {
  for (let i = tNode.directiveStart, end = tNode.directiveEnd; i < end; i++) {
    const directiveDef = tView.data[i];
    const lifecycleHooks = directiveDef.type.prototype;
    const {
      ngAfterContentInit,
      ngAfterContentChecked,
      ngAfterViewInit,
      ngAfterViewChecked,
      ngOnDestroy
    } = lifecycleHooks;
    if (ngAfterContentInit) {
      (tView.contentHooks || (tView.contentHooks = [])).push(-i, ngAfterContentInit);
    }
    if (ngAfterContentChecked) {
      (tView.contentHooks || (tView.contentHooks = [])).push(i, ngAfterContentChecked);
      (tView.contentCheckHooks || (tView.contentCheckHooks = [])).push(i, ngAfterContentChecked);
    }
    if (ngAfterViewInit) {
      (tView.viewHooks || (tView.viewHooks = [])).push(-i, ngAfterViewInit);
    }
    if (ngAfterViewChecked) {
      (tView.viewHooks || (tView.viewHooks = [])).push(i, ngAfterViewChecked);
      (tView.viewCheckHooks || (tView.viewCheckHooks = [])).push(i, ngAfterViewChecked);
    }
    if (ngOnDestroy != null) {
      (tView.destroyHooks || (tView.destroyHooks = [])).push(i, ngOnDestroy);
    }
  }
}
function executeCheckHooks(lView, hooks, nodeIndex) {
  callHooks(lView, hooks, 3, nodeIndex);
}
function executeInitAndCheckHooks(lView, hooks, initPhase, nodeIndex) {
  if ((lView[FLAGS] & 3) === initPhase) {
    callHooks(lView, hooks, initPhase, nodeIndex);
  }
}
function incrementInitPhaseFlags(lView, initPhase) {
  let flags = lView[FLAGS];
  if ((flags & 3) === initPhase) {
    flags &= 2047;
    flags += 1;
    lView[FLAGS] = flags;
  }
}
function callHooks(currentView, arr, initPhase, currentNodeIndex) {
  const startIndex = currentNodeIndex !== void 0 ? currentView[PREORDER_HOOK_FLAGS] & 65535 : 0;
  const nodeIndexLimit = currentNodeIndex != null ? currentNodeIndex : -1;
  const max = arr.length - 1;
  let lastNodeIndexFound = 0;
  for (let i = startIndex; i < max; i++) {
    const hook = arr[i + 1];
    if (typeof hook === "number") {
      lastNodeIndexFound = arr[i];
      if (currentNodeIndex != null && lastNodeIndexFound >= currentNodeIndex) {
        break;
      }
    } else {
      const isInitHook = arr[i] < 0;
      if (isInitHook)
        currentView[PREORDER_HOOK_FLAGS] += 65536;
      if (lastNodeIndexFound < nodeIndexLimit || nodeIndexLimit == -1) {
        callHook(currentView, initPhase, arr, i);
        currentView[PREORDER_HOOK_FLAGS] = (currentView[PREORDER_HOOK_FLAGS] & 4294901760) + i + 2;
      }
      i++;
    }
  }
}
function callHook(currentView, initPhase, arr, i) {
  const isInitHook = arr[i] < 0;
  const hook = arr[i + 1];
  const directiveIndex = isInitHook ? -arr[i] : arr[i];
  const directive = currentView[directiveIndex];
  if (isInitHook) {
    const indexWithintInitPhase = currentView[FLAGS] >> 11;
    if (indexWithintInitPhase < currentView[PREORDER_HOOK_FLAGS] >> 16 && (currentView[FLAGS] & 3) === initPhase) {
      currentView[FLAGS] += 2048;
      profiler(4, directive, hook);
      try {
        hook.call(directive);
      } finally {
        profiler(5, directive, hook);
      }
    }
  } else {
    profiler(4, directive, hook);
    try {
      hook.call(directive);
    } finally {
      profiler(5, directive, hook);
    }
  }
}
const NO_PARENT_INJECTOR = -1;
class NodeInjectorFactory {
  constructor(factory, isViewProvider, injectImplementation) {
    this.factory = factory;
    this.resolving = false;
    this.canSeeViewProviders = isViewProvider;
    this.injectImpl = injectImplementation;
  }
}
function isFactory(obj) {
  return obj instanceof NodeInjectorFactory;
}
function toTNodeTypeAsString(tNodeType) {
  let text = "";
  tNodeType & 1 && (text += "|Text");
  tNodeType & 2 && (text += "|Element");
  tNodeType & 4 && (text += "|Container");
  tNodeType & 8 && (text += "|ElementContainer");
  tNodeType & 16 && (text += "|Projection");
  tNodeType & 32 && (text += "|IcuContainer");
  tNodeType & 64 && (text += "|Placeholder");
  return text.length > 0 ? text.substring(1) : text;
}
function hasClassInput(tNode) {
  return (tNode.flags & 8) !== 0;
}
function hasStyleInput(tNode) {
  return (tNode.flags & 16) !== 0;
}
function assertTNodeType(tNode, expectedTypes, message) {
  assertDefined(tNode, "should be called with a TNode");
  if ((tNode.type & expectedTypes) === 0) {
    throwError(message || `Expected [${toTNodeTypeAsString(expectedTypes)}] but got ${toTNodeTypeAsString(tNode.type)}.`);
  }
}
function assertPureTNodeType(type) {
  if (!(type === 2 || //
  type === 1 || //
  type === 4 || //
  type === 8 || //
  type === 32 || //
  type === 16 || //
  type === 64)) {
    throwError(`Expected TNodeType to have only a single type selected, but got ${toTNodeTypeAsString(type)}.`);
  }
}
function setUpAttributes(renderer, native, attrs) {
  let i = 0;
  while (i < attrs.length) {
    const value = attrs[i];
    if (typeof value === "number") {
      if (value !== 0) {
        break;
      }
      i++;
      const namespaceURI = attrs[i++];
      const attrName = attrs[i++];
      const attrVal = attrs[i++];
      renderer.setAttribute(native, attrName, attrVal, namespaceURI);
    } else {
      const attrName = value;
      const attrVal = attrs[++i];
      if (isAnimationProp(attrName)) {
        renderer.setProperty(native, attrName, attrVal);
      } else {
        renderer.setAttribute(native, attrName, attrVal);
      }
      i++;
    }
  }
  return i;
}
function isNameOnlyAttributeMarker(marker) {
  return marker === 3 || marker === 4 || marker === 6;
}
function isAnimationProp(name) {
  return name.charCodeAt(0) === 64;
}
function mergeHostAttrs(dst, src) {
  if (src === null || src.length === 0)
    ;
  else if (dst === null || dst.length === 0) {
    dst = src.slice();
  } else {
    let srcMarker = -1;
    for (let i = 0; i < src.length; i++) {
      const item = src[i];
      if (typeof item === "number") {
        srcMarker = item;
      } else {
        if (srcMarker === 0)
          ;
        else if (srcMarker === -1 || srcMarker === 2) {
          mergeHostAttribute(dst, srcMarker, item, null, src[++i]);
        } else {
          mergeHostAttribute(dst, srcMarker, item, null, null);
        }
      }
    }
  }
  return dst;
}
function mergeHostAttribute(dst, marker, key1, key2, value) {
  let i = 0;
  let markerInsertPosition = dst.length;
  if (marker === -1) {
    markerInsertPosition = -1;
  } else {
    while (i < dst.length) {
      const dstValue = dst[i++];
      if (typeof dstValue === "number") {
        if (dstValue === marker) {
          markerInsertPosition = -1;
          break;
        } else if (dstValue > marker) {
          markerInsertPosition = i - 1;
          break;
        }
      }
    }
  }
  while (i < dst.length) {
    const item = dst[i];
    if (typeof item === "number") {
      break;
    } else if (item === key1) {
      if (key2 === null) {
        if (value !== null) {
          dst[i + 1] = value;
        }
        return;
      } else if (key2 === dst[i + 1]) {
        dst[i + 2] = value;
        return;
      }
    }
    i++;
    if (key2 !== null)
      i++;
    if (value !== null)
      i++;
  }
  if (markerInsertPosition !== -1) {
    dst.splice(markerInsertPosition, 0, marker);
    i = markerInsertPosition + 1;
  }
  dst.splice(i++, 0, key1);
  if (key2 !== null) {
    dst.splice(i++, 0, key2);
  }
  if (value !== null) {
    dst.splice(i++, 0, value);
  }
}
function hasParentInjector(parentLocation) {
  return parentLocation !== NO_PARENT_INJECTOR;
}
function getParentInjectorIndex(parentLocation) {
  const parentInjectorIndex = parentLocation & 32767;
  return parentLocation & 32767;
}
function getParentInjectorViewOffset(parentLocation) {
  return parentLocation >> 16;
}
function getParentInjectorView(location2, startView) {
  let viewOffset = getParentInjectorViewOffset(location2);
  let parentView = startView;
  while (viewOffset > 0) {
    parentView = parentView[DECLARATION_VIEW];
    viewOffset--;
  }
  return parentView;
}
let includeViewProviders = true;
function setIncludeViewProviders(v) {
  const oldValue = includeViewProviders;
  includeViewProviders = v;
  return oldValue;
}
const BLOOM_SIZE = 256;
const BLOOM_MASK = BLOOM_SIZE - 1;
const BLOOM_BUCKET_BITS = 5;
let nextNgElementId = 0;
const NOT_FOUND = {};
function bloomAdd(injectorIndex, tView, type) {
  let id;
  if (typeof type === "string") {
    id = type.charCodeAt(0) || 0;
  } else if (type.hasOwnProperty(NG_ELEMENT_ID)) {
    id = type[NG_ELEMENT_ID];
  }
  if (id == null) {
    id = type[NG_ELEMENT_ID] = nextNgElementId++;
  }
  const bloomHash = id & BLOOM_MASK;
  const mask = 1 << bloomHash;
  tView.data[injectorIndex + (bloomHash >> BLOOM_BUCKET_BITS)] |= mask;
}
function getOrCreateNodeInjectorForNode(tNode, lView) {
  const existingInjectorIndex = getInjectorIndex(tNode, lView);
  if (existingInjectorIndex !== -1) {
    return existingInjectorIndex;
  }
  const tView = lView[TVIEW];
  if (tView.firstCreatePass) {
    tNode.injectorIndex = lView.length;
    insertBloom(tView.data, tNode);
    insertBloom(lView, null);
    insertBloom(tView.blueprint, null);
  }
  const parentLoc = getParentInjectorLocation(tNode, lView);
  const injectorIndex = tNode.injectorIndex;
  if (hasParentInjector(parentLoc)) {
    const parentIndex = getParentInjectorIndex(parentLoc);
    const parentLView = getParentInjectorView(parentLoc, lView);
    const parentData = parentLView[TVIEW].data;
    for (let i = 0; i < 8; i++) {
      lView[injectorIndex + i] = parentLView[parentIndex + i] | parentData[parentIndex + i];
    }
  }
  lView[
    injectorIndex + 8
    /* NodeInjectorOffset.PARENT */
  ] = parentLoc;
  return injectorIndex;
}
function insertBloom(arr, footer) {
  arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
}
function getInjectorIndex(tNode, lView) {
  if (tNode.injectorIndex === -1 || // If the injector index is the same as its parent's injector index, then the index has been
  // copied down from the parent node. No injector has been created yet on this node.
  tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex || // After the first template pass, the injector index might exist but the parent values
  // might not have been calculated yet for this instance
  lView[
    tNode.injectorIndex + 8
    /* NodeInjectorOffset.PARENT */
  ] === null) {
    return -1;
  } else {
    return tNode.injectorIndex;
  }
}
function getParentInjectorLocation(tNode, lView) {
  if (tNode.parent && tNode.parent.injectorIndex !== -1) {
    return tNode.parent.injectorIndex;
  }
  let declarationViewOffset = 0;
  let parentTNode = null;
  let lViewCursor = lView;
  while (lViewCursor !== null) {
    parentTNode = getTNodeFromLView(lViewCursor);
    if (parentTNode === null) {
      return NO_PARENT_INJECTOR;
    }
    declarationViewOffset++;
    lViewCursor = lViewCursor[DECLARATION_VIEW];
    if (parentTNode.injectorIndex !== -1) {
      return parentTNode.injectorIndex | declarationViewOffset << 16;
    }
  }
  return NO_PARENT_INJECTOR;
}
function diPublicInInjector(injectorIndex, tView, token) {
  bloomAdd(injectorIndex, tView, token);
}
function injectAttributeImpl(tNode, attrNameToInject) {
  if (attrNameToInject === "class") {
    return tNode.classes;
  }
  if (attrNameToInject === "style") {
    return tNode.styles;
  }
  const attrs = tNode.attrs;
  if (attrs) {
    const attrsLength = attrs.length;
    let i = 0;
    while (i < attrsLength) {
      const value = attrs[i];
      if (isNameOnlyAttributeMarker(value))
        break;
      if (value === 0) {
        i = i + 2;
      } else if (typeof value === "number") {
        i++;
        while (i < attrsLength && typeof attrs[i] === "string") {
          i++;
        }
      } else if (value === attrNameToInject) {
        return attrs[i + 1];
      } else {
        i = i + 2;
      }
    }
  }
  return null;
}
function notFoundValueOrThrow(notFoundValue, token, flags) {
  if (flags & InjectFlags.Optional || notFoundValue !== void 0) {
    return notFoundValue;
  } else {
    throwProviderNotFoundError(token, "NodeInjector");
  }
}
function lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue) {
  if (flags & InjectFlags.Optional && notFoundValue === void 0) {
    notFoundValue = null;
  }
  if ((flags & (InjectFlags.Self | InjectFlags.Host)) === 0) {
    const moduleInjector = lView[INJECTOR$1];
    const previousInjectImplementation = setInjectImplementation(void 0);
    try {
      if (moduleInjector) {
        return moduleInjector.get(token, notFoundValue, flags & InjectFlags.Optional);
      } else {
        return injectRootLimpMode(token, notFoundValue, flags & InjectFlags.Optional);
      }
    } finally {
      setInjectImplementation(previousInjectImplementation);
    }
  }
  return notFoundValueOrThrow(notFoundValue, token, flags);
}
function getOrCreateInjectable(tNode, lView, token, flags = InjectFlags.Default, notFoundValue) {
  if (tNode !== null) {
    if (lView[FLAGS] & 1024) {
      const embeddedInjectorValue = lookupTokenUsingEmbeddedInjector(tNode, lView, token, flags, NOT_FOUND);
      if (embeddedInjectorValue !== NOT_FOUND) {
        return embeddedInjectorValue;
      }
    }
    const value = lookupTokenUsingNodeInjector(tNode, lView, token, flags, NOT_FOUND);
    if (value !== NOT_FOUND) {
      return value;
    }
  }
  return lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue);
}
function lookupTokenUsingNodeInjector(tNode, lView, token, flags, notFoundValue) {
  const bloomHash = bloomHashBitOrFactory(token);
  if (typeof bloomHash === "function") {
    if (!enterDI(lView, tNode, flags)) {
      return flags & InjectFlags.Host ? notFoundValueOrThrow(notFoundValue, token, flags) : lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue);
    }
    try {
      const value = bloomHash(flags);
      if (value == null && !(flags & InjectFlags.Optional)) {
        throwProviderNotFoundError(token);
      } else {
        return value;
      }
    } finally {
      leaveDI();
    }
  } else if (typeof bloomHash === "number") {
    let previousTView = null;
    let injectorIndex = getInjectorIndex(tNode, lView);
    let parentLocation = NO_PARENT_INJECTOR;
    let hostTElementNode = flags & InjectFlags.Host ? lView[DECLARATION_COMPONENT_VIEW][T_HOST] : null;
    if (injectorIndex === -1 || flags & InjectFlags.SkipSelf) {
      parentLocation = injectorIndex === -1 ? getParentInjectorLocation(tNode, lView) : lView[
        injectorIndex + 8
        /* NodeInjectorOffset.PARENT */
      ];
      if (parentLocation === NO_PARENT_INJECTOR || !shouldSearchParent(flags, false)) {
        injectorIndex = -1;
      } else {
        previousTView = lView[TVIEW];
        injectorIndex = getParentInjectorIndex(parentLocation);
        lView = getParentInjectorView(parentLocation, lView);
      }
    }
    while (injectorIndex !== -1) {
      const tView = lView[TVIEW];
      if (bloomHasToken(bloomHash, injectorIndex, tView.data)) {
        const instance = searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode);
        if (instance !== NOT_FOUND) {
          return instance;
        }
      }
      parentLocation = lView[
        injectorIndex + 8
        /* NodeInjectorOffset.PARENT */
      ];
      if (parentLocation !== NO_PARENT_INJECTOR && shouldSearchParent(flags, lView[TVIEW].data[
        injectorIndex + 8
        /* NodeInjectorOffset.TNODE */
      ] === hostTElementNode) && bloomHasToken(bloomHash, injectorIndex, lView)) {
        previousTView = tView;
        injectorIndex = getParentInjectorIndex(parentLocation);
        lView = getParentInjectorView(parentLocation, lView);
      } else {
        injectorIndex = -1;
      }
    }
  }
  return notFoundValue;
}
function searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode) {
  const currentTView = lView[TVIEW];
  const tNode = currentTView.data[
    injectorIndex + 8
    /* NodeInjectorOffset.TNODE */
  ];
  const canAccessViewProviders = previousTView == null ? (
    // 1) This is the first invocation `previousTView == null` which means that we are at the
    // `TNode` of where injector is starting to look. In such a case the only time we are allowed
    // to look into the ViewProviders is if:
    // - we are on a component
    // - AND the injector set `includeViewProviders` to true (implying that the token can see
    // ViewProviders because it is the Component or a Service which itself was declared in
    // ViewProviders)
    isComponentHost(tNode) && includeViewProviders
  ) : (
    // 2) `previousTView != null` which means that we are now walking across the parent nodes.
    // In such a case we are only allowed to look into the ViewProviders if:
    // - We just crossed from child View to Parent View `previousTView != currentTView`
    // - AND the parent TNode is an Element.
    // This means that we just came from the Component's View and therefore are allowed to see
    // into the ViewProviders.
    previousTView != currentTView && (tNode.type & 3) !== 0
  );
  const isHostSpecialCase = flags & InjectFlags.Host && hostTElementNode === tNode;
  const injectableIdx = locateDirectiveOrProvider(tNode, currentTView, token, canAccessViewProviders, isHostSpecialCase);
  if (injectableIdx !== null) {
    return getNodeInjectable(lView, currentTView, injectableIdx, tNode);
  } else {
    return NOT_FOUND;
  }
}
function locateDirectiveOrProvider(tNode, tView, token, canAccessViewProviders, isHostSpecialCase) {
  const nodeProviderIndexes = tNode.providerIndexes;
  const tInjectables = tView.data;
  const injectablesStart = nodeProviderIndexes & 1048575;
  const directivesStart = tNode.directiveStart;
  const directiveEnd = tNode.directiveEnd;
  const cptViewProvidersCount = nodeProviderIndexes >> 20;
  const startingIndex = canAccessViewProviders ? injectablesStart : injectablesStart + cptViewProvidersCount;
  const endIndex = isHostSpecialCase ? injectablesStart + cptViewProvidersCount : directiveEnd;
  for (let i = startingIndex; i < endIndex; i++) {
    const providerTokenOrDef = tInjectables[i];
    if (i < directivesStart && token === providerTokenOrDef || i >= directivesStart && providerTokenOrDef.type === token) {
      return i;
    }
  }
  if (isHostSpecialCase) {
    const dirDef = tInjectables[directivesStart];
    if (dirDef && isComponentDef(dirDef) && dirDef.type === token) {
      return directivesStart;
    }
  }
  return null;
}
function getNodeInjectable(lView, tView, index, tNode) {
  let value = lView[index];
  const tData = tView.data;
  if (isFactory(value)) {
    const factory = value;
    if (factory.resolving) {
      throwCyclicDependencyError(stringifyForError(tData[index]));
    }
    const previousIncludeViewProviders = setIncludeViewProviders(factory.canSeeViewProviders);
    factory.resolving = true;
    const previousInjectImplementation = factory.injectImpl ? setInjectImplementation(factory.injectImpl) : null;
    const success = enterDI(lView, tNode, InjectFlags.Default);
    try {
      value = lView[index] = factory.factory(void 0, tData, lView, tNode);
      if (tView.firstCreatePass && index >= tNode.directiveStart) {
        registerPreOrderHooks(index, tData[index], tView);
      }
    } finally {
      previousInjectImplementation !== null && setInjectImplementation(previousInjectImplementation);
      setIncludeViewProviders(previousIncludeViewProviders);
      factory.resolving = false;
      leaveDI();
    }
  }
  return value;
}
function bloomHashBitOrFactory(token) {
  if (typeof token === "string") {
    return token.charCodeAt(0) || 0;
  }
  const tokenId = (
    // First check with `hasOwnProperty` so we don't get an inherited ID.
    token.hasOwnProperty(NG_ELEMENT_ID) ? token[NG_ELEMENT_ID] : void 0
  );
  if (typeof tokenId === "number") {
    if (tokenId >= 0) {
      return tokenId & BLOOM_MASK;
    } else {
      return createNodeInjector;
    }
  } else {
    return tokenId;
  }
}
function bloomHasToken(bloomHash, injectorIndex, injectorView) {
  const mask = 1 << bloomHash;
  const value = injectorView[injectorIndex + (bloomHash >> BLOOM_BUCKET_BITS)];
  return !!(value & mask);
}
function shouldSearchParent(flags, isFirstHostTNode) {
  return !(flags & InjectFlags.Self) && !(flags & InjectFlags.Host && isFirstHostTNode);
}
class NodeInjector {
  constructor(_tNode, _lView) {
    this._tNode = _tNode;
    this._lView = _lView;
  }
  get(token, notFoundValue, flags) {
    return getOrCreateInjectable(this._tNode, this._lView, token, convertToBitFlags(flags), notFoundValue);
  }
}
function createNodeInjector() {
  return new NodeInjector(getCurrentTNode(), getLView());
}
function ɵɵgetInheritedFactory(type) {
  return noSideEffects(() => {
    const ownConstructor = type.prototype.constructor;
    const ownFactory = ownConstructor[NG_FACTORY_DEF] || getFactoryOf(ownConstructor);
    const objectPrototype = Object.prototype;
    let parent = Object.getPrototypeOf(type.prototype).constructor;
    while (parent && parent !== objectPrototype) {
      const factory = parent[NG_FACTORY_DEF] || getFactoryOf(parent);
      if (factory && factory !== ownFactory) {
        return factory;
      }
      parent = Object.getPrototypeOf(parent);
    }
    return (t) => new t();
  });
}
function getFactoryOf(type) {
  if (isForwardRef(type)) {
    return () => {
      const factory = getFactoryOf(resolveForwardRef(type));
      return factory && factory();
    };
  }
  return getFactoryDef(type);
}
function lookupTokenUsingEmbeddedInjector(tNode, lView, token, flags, notFoundValue) {
  let currentTNode = tNode;
  let currentLView = lView;
  while (currentTNode !== null && currentLView !== null && currentLView[FLAGS] & 1024 && !(currentLView[FLAGS] & 256)) {
    const nodeInjectorValue = lookupTokenUsingNodeInjector(currentTNode, currentLView, token, flags | InjectFlags.Self, NOT_FOUND);
    if (nodeInjectorValue !== NOT_FOUND) {
      return nodeInjectorValue;
    }
    let parentTNode = currentTNode.parent;
    if (!parentTNode) {
      const embeddedViewInjector = currentLView[EMBEDDED_VIEW_INJECTOR];
      if (embeddedViewInjector) {
        const embeddedViewInjectorValue = embeddedViewInjector.get(token, NOT_FOUND, flags);
        if (embeddedViewInjectorValue !== NOT_FOUND) {
          return embeddedViewInjectorValue;
        }
      }
      parentTNode = getTNodeFromLView(currentLView);
      currentLView = currentLView[DECLARATION_VIEW];
    }
    currentTNode = parentTNode;
  }
  return notFoundValue;
}
function getTNodeFromLView(lView) {
  const tView = lView[TVIEW];
  const tViewType = tView.type;
  if (tViewType === 2) {
    return tView.declTNode;
  } else if (tViewType === 1) {
    return lView[T_HOST];
  }
  return null;
}
function ɵɵinjectAttribute(attrNameToInject) {
  return injectAttributeImpl(getCurrentTNode(), attrNameToInject);
}
const PARAMETERS = "__parameters__";
function makeMetadataCtor(props) {
  return function ctor(...args) {
    if (props) {
      const values = props(...args);
      for (const propName in values) {
        this[propName] = values[propName];
      }
    }
  };
}
function makeParamDecorator(name, props, parentClass) {
  return noSideEffects(() => {
    const metaCtor = makeMetadataCtor(props);
    function ParamDecoratorFactory(...args) {
      if (this instanceof ParamDecoratorFactory) {
        metaCtor.apply(this, args);
        return this;
      }
      const annotationInstance = new ParamDecoratorFactory(...args);
      ParamDecorator.annotation = annotationInstance;
      return ParamDecorator;
      function ParamDecorator(cls, unusedKey, index) {
        const parameters = cls.hasOwnProperty(PARAMETERS) ? cls[PARAMETERS] : Object.defineProperty(cls, PARAMETERS, {
          value: []
        })[PARAMETERS];
        while (parameters.length <= index) {
          parameters.push(null);
        }
        (parameters[index] = parameters[index] || []).push(annotationInstance);
        return cls;
      }
    }
    if (parentClass) {
      ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    ParamDecoratorFactory.prototype.ngMetadataName = name;
    ParamDecoratorFactory.annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
  });
}
class InjectionToken {
  /**
   * @param _desc   Description for the token,
   *                used only for debugging purposes,
   *                it should but does not need to be unique
   * @param options Options for the token's usage, as described above
   */
  constructor(_desc, options) {
    this._desc = _desc;
    this.ngMetadataName = "InjectionToken";
    this.ɵprov = void 0;
    if (typeof options == "number") {
      this.__NG_ELEMENT_ID__ = options;
    } else if (options !== void 0) {
      this.ɵprov = ɵɵdefineInjectable({
        token: this,
        providedIn: options.providedIn || "root",
        factory: options.factory
      });
    }
  }
  /**
   * @internal
   */
  get multi() {
    return this;
  }
  toString() {
    return `InjectionToken ${this._desc}`;
  }
}
function getCompilerFacade(request) {
  const globalNg = _global["ng"];
  if (globalNg && globalNg.ɵcompilerFacade) {
    return globalNg.ɵcompilerFacade;
  }
  if (false) {
    console.error(`JIT compilation failed for ${request.kind}`, request.type);
    let message = `The ${request.kind} '${request.type.name}' needs to be compiled using the JIT compiler, but '@angular/compiler' is not available.

`;
    if (request.usage === 1) {
      message += `The ${request.kind} is part of a library that has been partially compiled.
`;
      message += `However, the Angular Linker has not processed the library such that JIT compilation is used as fallback.
`;
      message += "\n";
      message += `Ideally, the library is processed using the Angular Linker to become fully AOT compiled.
`;
    } else {
      message += `JIT compilation is discouraged for production use-cases! Consider using AOT mode instead.
`;
    }
    message += `Alternatively, the JIT compiler should be loaded by bootstrapping using '@angular/platform-browser-dynamic' or '@angular/platform-server',
`;
    message += `or manually provide the compiler with 'import "@angular/compiler";' before bootstrapping.`;
    throw new Error(message);
  } else {
    throw new Error("JIT compiler unavailable");
  }
}
function isType(v) {
  return typeof v === "function";
}
function deepForEach(input, fn) {
  input.forEach((value) => Array.isArray(value) ? deepForEach(value, fn) : fn(value));
}
function addToArray(arr, index, value) {
  if (index >= arr.length) {
    arr.push(value);
  } else {
    arr.splice(index, 0, value);
  }
}
function removeFromArray(arr, index) {
  if (index >= arr.length - 1) {
    return arr.pop();
  } else {
    return arr.splice(index, 1)[0];
  }
}
function newArray(size, value) {
  const list = [];
  for (let i = 0; i < size; i++) {
    list.push(value);
  }
  return list;
}
function arrayInsert2(array, index, value1, value2) {
  let end = array.length;
  if (end == index) {
    array.push(value1, value2);
  } else if (end === 1) {
    array.push(value2, array[0]);
    array[0] = value1;
  } else {
    end--;
    array.push(array[end - 1], array[end]);
    while (end > index) {
      const previousEnd = end - 2;
      array[end] = array[previousEnd];
      end--;
    }
    array[index] = value1;
    array[index + 1] = value2;
  }
}
function keyValueArraySet(keyValueArray, key, value) {
  let index = keyValueArrayIndexOf(keyValueArray, key);
  if (index >= 0) {
    keyValueArray[index | 1] = value;
  } else {
    index = ~index;
    arrayInsert2(keyValueArray, index, key, value);
  }
  return index;
}
function keyValueArrayGet(keyValueArray, key) {
  const index = keyValueArrayIndexOf(keyValueArray, key);
  if (index >= 0) {
    return keyValueArray[index | 1];
  }
  return void 0;
}
function keyValueArrayIndexOf(keyValueArray, key) {
  return _arrayIndexOfSorted(keyValueArray, key, 1);
}
function _arrayIndexOfSorted(array, value, shift) {
  let start = 0;
  let end = array.length >> shift;
  while (end !== start) {
    const middle = start + (end - start >> 1);
    const current = array[middle << shift];
    if (value === current) {
      return middle << shift;
    } else if (current > value) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  return ~(end << shift);
}
const Optional = (
  // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
  // tslint:disable-next-line: no-toplevel-property-access
  /* @__PURE__ */ attachInjectFlag(
    /* @__PURE__ */ makeParamDecorator("Optional"),
    8
    /* InternalInjectFlags.Optional */
  )
);
function resolveComponentResources(resourceResolver) {
  const componentResolved = [];
  const urlMap = /* @__PURE__ */ new Map();
  function cachedResourceResolve(url2) {
    let promise2 = urlMap.get(url2);
    if (!promise2) {
      const resp = resourceResolver(url2);
      urlMap.set(url2, promise2 = resp.then(unwrapResponse));
    }
    return promise2;
  }
  componentResourceResolutionQueue.forEach((component, type) => {
    const promises = [];
    if (component.templateUrl) {
      promises.push(cachedResourceResolve(component.templateUrl).then((template) => {
        component.template = template;
      }));
    }
    const styleUrls = component.styleUrls;
    const styles = component.styles || (component.styles = []);
    const styleOffset = component.styles.length;
    styleUrls && styleUrls.forEach((styleUrl, index) => {
      styles.push("");
      promises.push(cachedResourceResolve(styleUrl).then((style2) => {
        styles[styleOffset + index] = style2;
        styleUrls.splice(styleUrls.indexOf(styleUrl), 1);
        if (styleUrls.length == 0) {
          component.styleUrls = void 0;
        }
      }));
    });
    const fullyResolved = Promise.all(promises).then(() => componentDefResolved(type));
    componentResolved.push(fullyResolved);
  });
  clearResolutionOfComponentResourcesQueue();
  return Promise.all(componentResolved).then(() => void 0);
}
let componentResourceResolutionQueue = /* @__PURE__ */ new Map();
const componentDefPendingResolution = /* @__PURE__ */ new Set();
function clearResolutionOfComponentResourcesQueue() {
  const old = componentResourceResolutionQueue;
  componentResourceResolutionQueue = /* @__PURE__ */ new Map();
  return old;
}
function isComponentResourceResolutionQueueEmpty() {
  return componentResourceResolutionQueue.size === 0;
}
function unwrapResponse(response) {
  return typeof response == "string" ? response : response.text();
}
function componentDefResolved(type) {
  componentDefPendingResolution.delete(type);
}
const CUSTOM_ELEMENTS_SCHEMA$1 = {
  name: "custom-elements"
};
const NO_ERRORS_SCHEMA$1 = {
  name: "no-errors-schema"
};
function validateElementIsKnown(element, lView, tagName, schemas, hasDirectives) {
  if (schemas === null)
    return;
  if (!hasDirectives && tagName !== null) {
    const isUnknown = (
      // Note that we can't check for `typeof HTMLUnknownElement === 'function'`,
      // because while most browsers return 'function', IE returns 'object'.
      typeof HTMLUnknownElement !== "undefined" && HTMLUnknownElement && element instanceof HTMLUnknownElement || typeof customElements !== "undefined" && tagName.indexOf("-") > -1 && !customElements.get(tagName)
    );
    if (isUnknown && !matchingSchemas(schemas, tagName)) {
      const isHostStandalone = isHostComponentStandalone(lView);
      const templateLocation = getTemplateLocationDetails(lView);
      const schemas2 = `'${isHostStandalone ? "@Component" : "@NgModule"}.schemas'`;
      let message = `'${tagName}' is not a known element${templateLocation}:
`;
      message += `1. If '${tagName}' is an Angular component, then verify that it is ${isHostStandalone ? "included in the '@Component.imports' of this component" : "a part of an @NgModule where this component is declared"}.
`;
      if (tagName && tagName.indexOf("-") > -1) {
        message += `2. If '${tagName}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${schemas2} of this component to suppress this message.`;
      } else {
        message += `2. To allow any element add 'NO_ERRORS_SCHEMA' to the ${schemas2} of this component.`;
      }
      {
        console.error(formatRuntimeError(304, message));
      }
    }
  }
}
function isPropertyValid(element, propName, tagName, schemas) {
  if (schemas === null)
    return true;
  if (matchingSchemas(schemas, tagName) || propName in element || isAnimationProp(propName)) {
    return true;
  }
  return typeof Node === "undefined" || Node === null || !(element instanceof Node);
}
function handleUnknownPropertyError(propName, tagName, nodeType, lView) {
  if (!tagName && nodeType === 4) {
    tagName = "ng-template";
  }
  const isHostStandalone = isHostComponentStandalone(lView);
  const templateLocation = getTemplateLocationDetails(lView);
  let message = `Can't bind to '${propName}' since it isn't a known property of '${tagName}'${templateLocation}.`;
  const schemas = `'${isHostStandalone ? "@Component" : "@NgModule"}.schemas'`;
  const importLocation = isHostStandalone ? "included in the '@Component.imports' of this component" : "a part of an @NgModule where this component is declared";
  if (KNOWN_CONTROL_FLOW_DIRECTIVES.has(propName)) {
    const correspondingImport = KNOWN_CONTROL_FLOW_DIRECTIVES.get(propName);
    message += `
If the '${propName}' is an Angular control flow directive, please make sure that either the '${correspondingImport}' directive or the 'CommonModule' is ${importLocation}.`;
  } else {
    message += `
1. If '${tagName}' is an Angular component and it has the '${propName}' input, then verify that it is ${importLocation}.`;
    if (tagName && tagName.indexOf("-") > -1) {
      message += `
2. If '${tagName}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the ${schemas} of this component to suppress this message.`;
      message += `
3. To allow any property add 'NO_ERRORS_SCHEMA' to the ${schemas} of this component.`;
    } else {
      message += `
2. To allow any property add 'NO_ERRORS_SCHEMA' to the ${schemas} of this component.`;
    }
  }
  reportUnknownPropertyError(message);
}
function reportUnknownPropertyError(message) {
  {
    console.error(formatRuntimeError(303, message));
  }
}
function getDeclarationComponentDef(lView) {
  throwError("Must never be called in production mode");
  const declarationLView = lView[DECLARATION_COMPONENT_VIEW];
  const context = declarationLView[CONTEXT];
  if (!context)
    return null;
  return context.constructor ? getComponentDef(context.constructor) : null;
}
function isHostComponentStandalone(lView) {
  throwError("Must never be called in production mode");
  const componentDef = getDeclarationComponentDef(lView);
  return !!(componentDef === null || componentDef === void 0 ? void 0 : componentDef.standalone);
}
function getTemplateLocationDetails(lView) {
  var _a;
  throwError("Must never be called in production mode");
  const hostComponentDef = getDeclarationComponentDef(lView);
  const componentClassName = (_a = hostComponentDef === null || hostComponentDef === void 0 ? void 0 : hostComponentDef.type) === null || _a === void 0 ? void 0 : _a.name;
  return componentClassName ? ` (used in the '${componentClassName}' component template)` : "";
}
const KNOWN_CONTROL_FLOW_DIRECTIVES = /* @__PURE__ */ new Map([["ngIf", "NgIf"], ["ngFor", "NgFor"], ["ngSwitchCase", "NgSwitchCase"], ["ngSwitchDefault", "NgSwitchDefault"]]);
function matchingSchemas(schemas, tagName) {
  if (schemas !== null) {
    for (let i = 0; i < schemas.length; i++) {
      const schema = schemas[i];
      if (schema === NO_ERRORS_SCHEMA$1 || schema === CUSTOM_ELEMENTS_SCHEMA$1 && tagName && tagName.indexOf("-") > -1) {
        return true;
      }
    }
  }
  return false;
}
var RendererStyleFlags2 = /* @__PURE__ */ (() => {
  RendererStyleFlags2 = RendererStyleFlags2 || {};
  RendererStyleFlags2[RendererStyleFlags2["Important"] = 1] = "Important";
  RendererStyleFlags2[RendererStyleFlags2["DashCase"] = 2] = "DashCase";
  return RendererStyleFlags2;
})();
const COMMENT_DISALLOWED = /^>|^->|<!--|-->|--!>|<!-$/g;
const COMMENT_DELIMITER = /(<|>)/;
const COMMENT_DELIMITER_ESCAPED = "​$1​";
function escapeCommentText(value) {
  return value.replace(COMMENT_DISALLOWED, (text) => text.replace(COMMENT_DELIMITER, COMMENT_DELIMITER_ESCAPED));
}
const TRACKED_LVIEWS = /* @__PURE__ */ new Map();
let uniqueIdCounter = 0;
function getUniqueLViewId() {
  return uniqueIdCounter++;
}
function registerLView(lView) {
  TRACKED_LVIEWS.set(lView[ID], lView);
}
function getLViewById(id) {
  return TRACKED_LVIEWS.get(id) || null;
}
function unregisterLView(lView) {
  TRACKED_LVIEWS.delete(lView[ID]);
}
class LContext {
  /** Component's parent view data. */
  get lView() {
    return getLViewById(this.lViewId);
  }
  constructor(lViewId, nodeIndex, native) {
    this.lViewId = lViewId;
    this.nodeIndex = nodeIndex;
    this.native = native;
  }
}
function getLContext(target) {
  let mpValue = readPatchedData(target);
  if (mpValue) {
    if (isLView(mpValue)) {
      const lView = mpValue;
      let nodeIndex;
      let component = void 0;
      let directives = void 0;
      if (isComponentInstance(target)) {
        nodeIndex = findViaComponent(lView, target);
        if (nodeIndex == -1) {
          throw new Error("The provided component was not found in the application");
        }
        component = target;
      } else if (isDirectiveInstance(target)) {
        nodeIndex = findViaDirective(lView, target);
        if (nodeIndex == -1) {
          throw new Error("The provided directive was not found in the application");
        }
        directives = getDirectivesAtNodeIndex(nodeIndex, lView);
      } else {
        nodeIndex = findViaNativeElement(lView, target);
        if (nodeIndex == -1) {
          return null;
        }
      }
      const native = unwrapRNode(lView[nodeIndex]);
      const existingCtx = readPatchedData(native);
      const context = existingCtx && !Array.isArray(existingCtx) ? existingCtx : createLContext(lView, nodeIndex, native);
      if (component && context.component === void 0) {
        context.component = component;
        attachPatchData(context.component, context);
      }
      if (directives && context.directives === void 0) {
        context.directives = directives;
        for (let i = 0; i < directives.length; i++) {
          attachPatchData(directives[i], context);
        }
      }
      attachPatchData(context.native, context);
      mpValue = context;
    }
  } else {
    const rElement = target;
    let parent = rElement;
    while (parent = parent.parentNode) {
      const parentContext = readPatchedData(parent);
      if (parentContext) {
        const lView = Array.isArray(parentContext) ? parentContext : parentContext.lView;
        if (!lView) {
          return null;
        }
        const index = findViaNativeElement(lView, rElement);
        if (index >= 0) {
          const native = unwrapRNode(lView[index]);
          const context = createLContext(lView, index, native);
          attachPatchData(native, context);
          mpValue = context;
          break;
        }
      }
    }
  }
  return mpValue || null;
}
function createLContext(lView, nodeIndex, native) {
  return new LContext(lView[ID], nodeIndex, native);
}
function getComponentViewByInstance(componentInstance) {
  let patchedData = readPatchedData(componentInstance);
  let lView;
  if (isLView(patchedData)) {
    const contextLView = patchedData;
    const nodeIndex = findViaComponent(contextLView, componentInstance);
    lView = getComponentLViewByIndex(nodeIndex, contextLView);
    const context = createLContext(contextLView, nodeIndex, lView[HOST]);
    context.component = componentInstance;
    attachPatchData(componentInstance, context);
    attachPatchData(context.native, context);
  } else {
    const context = patchedData;
    const contextLView = context.lView;
    lView = getComponentLViewByIndex(context.nodeIndex, contextLView);
  }
  return lView;
}
const MONKEY_PATCH_KEY_NAME = "__ngContext__";
function attachPatchData(target, data) {
  if (isLView(data)) {
    target[MONKEY_PATCH_KEY_NAME] = data[ID];
    registerLView(data);
  } else {
    target[MONKEY_PATCH_KEY_NAME] = data;
  }
}
function readPatchedData(target) {
  const data = target[MONKEY_PATCH_KEY_NAME];
  return typeof data === "number" ? getLViewById(data) : data || null;
}
function readPatchedLView(target) {
  const value = readPatchedData(target);
  if (value) {
    return isLView(value) ? value : value.lView;
  }
  return null;
}
function isComponentInstance(instance) {
  return instance && instance.constructor && instance.constructor.ɵcmp;
}
function isDirectiveInstance(instance) {
  return instance && instance.constructor && instance.constructor.ɵdir;
}
function findViaNativeElement(lView, target) {
  const tView = lView[TVIEW];
  for (let i = HEADER_OFFSET; i < tView.bindingStartIndex; i++) {
    if (unwrapRNode(lView[i]) === target) {
      return i;
    }
  }
  return -1;
}
function traverseNextElement(tNode) {
  if (tNode.child) {
    return tNode.child;
  } else if (tNode.next) {
    return tNode.next;
  } else {
    while (tNode.parent && !tNode.parent.next) {
      tNode = tNode.parent;
    }
    return tNode.parent && tNode.parent.next;
  }
}
function findViaComponent(lView, componentInstance) {
  const componentIndices = lView[TVIEW].components;
  if (componentIndices) {
    for (let i = 0; i < componentIndices.length; i++) {
      const elementComponentIndex = componentIndices[i];
      const componentView = getComponentLViewByIndex(elementComponentIndex, lView);
      if (componentView[CONTEXT] === componentInstance) {
        return elementComponentIndex;
      }
    }
  } else {
    const rootComponentView = getComponentLViewByIndex(HEADER_OFFSET, lView);
    const rootComponent = rootComponentView[CONTEXT];
    if (rootComponent === componentInstance) {
      return HEADER_OFFSET;
    }
  }
  return -1;
}
function findViaDirective(lView, directiveInstance) {
  let tNode = lView[TVIEW].firstChild;
  while (tNode) {
    const directiveIndexStart = tNode.directiveStart;
    const directiveIndexEnd = tNode.directiveEnd;
    for (let i = directiveIndexStart; i < directiveIndexEnd; i++) {
      if (lView[i] === directiveInstance) {
        return tNode.index;
      }
    }
    tNode = traverseNextElement(tNode);
  }
  return -1;
}
function getDirectivesAtNodeIndex(nodeIndex, lView) {
  const tNode = lView[TVIEW].data[nodeIndex];
  if (tNode.directiveStart === 0)
    return EMPTY_ARRAY$1;
  const results = [];
  for (let i = tNode.directiveStart; i < tNode.directiveEnd; i++) {
    const directiveInstance = lView[i];
    if (!isComponentInstance(directiveInstance)) {
      results.push(directiveInstance);
    }
  }
  return results;
}
function getComponentAtNodeIndex(nodeIndex, lView) {
  const tNode = lView[TVIEW].data[nodeIndex];
  const {
    directiveStart,
    componentOffset
  } = tNode;
  return componentOffset > -1 ? lView[directiveStart + componentOffset] : null;
}
let _icuContainerIterate;
function icuContainerIterate(tIcuContainerNode, lView) {
  return _icuContainerIterate(tIcuContainerNode, lView);
}
function getLViewParent(lView) {
  const parent = lView[PARENT];
  return isLContainer(parent) ? parent[PARENT] : parent;
}
function getRootView(componentOrLView) {
  let lView = isLView(componentOrLView) ? componentOrLView : readPatchedLView(componentOrLView);
  while (lView && !(lView[FLAGS] & 256)) {
    lView = getLViewParent(lView);
  }
  return lView;
}
function getRootContext(viewOrComponent) {
  const rootView = getRootView(viewOrComponent);
  return rootView[CONTEXT];
}
function getFirstLContainer(lView) {
  return getNearestLContainer(lView[CHILD_HEAD]);
}
function getNextLContainer(container) {
  return getNearestLContainer(container[NEXT]);
}
function getNearestLContainer(viewOrContainer) {
  while (viewOrContainer !== null && !isLContainer(viewOrContainer)) {
    viewOrContainer = viewOrContainer[NEXT];
  }
  return viewOrContainer;
}
function applyToElementOrContainer(action, renderer, parent, lNodeToHandle, beforeNode) {
  if (lNodeToHandle != null) {
    let lContainer;
    let isComponent = false;
    if (isLContainer(lNodeToHandle)) {
      lContainer = lNodeToHandle;
    } else if (isLView(lNodeToHandle)) {
      isComponent = true;
      lNodeToHandle = lNodeToHandle[HOST];
    }
    const rNode = unwrapRNode(lNodeToHandle);
    if (action === 0 && parent !== null) {
      if (beforeNode == null) {
        nativeAppendChild(renderer, parent, rNode);
      } else {
        nativeInsertBefore(renderer, parent, rNode, beforeNode || null, true);
      }
    } else if (action === 1 && parent !== null) {
      nativeInsertBefore(renderer, parent, rNode, beforeNode || null, true);
    } else if (action === 2) {
      nativeRemoveNode(renderer, rNode, isComponent);
    } else if (action === 3) {
      renderer.destroyNode(rNode);
    }
    if (lContainer != null) {
      applyContainer(renderer, action, lContainer, parent, beforeNode);
    }
  }
}
function createTextNode(renderer, value) {
  return renderer.createText(value);
}
function updateTextNode(renderer, rNode, value) {
  renderer.setValue(rNode, value);
}
function createElementNode(renderer, name, namespace) {
  return renderer.createElement(name, namespace);
}
function removeViewFromContainer(tView, lView) {
  const renderer = lView[RENDERER];
  applyView(tView, lView, renderer, 2, null, null);
  lView[HOST] = null;
  lView[T_HOST] = null;
}
function addViewToContainer(tView, parentTNode, renderer, lView, parentNativeNode, beforeNode) {
  lView[HOST] = parentNativeNode;
  lView[T_HOST] = parentTNode;
  applyView(tView, lView, renderer, 1, parentNativeNode, beforeNode);
}
function renderDetachView(tView, lView) {
  applyView(tView, lView, lView[RENDERER], 2, null, null);
}
function destroyViewTree(rootView) {
  let lViewOrLContainer = rootView[CHILD_HEAD];
  if (!lViewOrLContainer) {
    return cleanUpView(rootView[TVIEW], rootView);
  }
  while (lViewOrLContainer) {
    let next = null;
    if (isLView(lViewOrLContainer)) {
      next = lViewOrLContainer[CHILD_HEAD];
    } else {
      const firstView = lViewOrLContainer[CONTAINER_HEADER_OFFSET];
      if (firstView)
        next = firstView;
    }
    if (!next) {
      while (lViewOrLContainer && !lViewOrLContainer[NEXT] && lViewOrLContainer !== rootView) {
        if (isLView(lViewOrLContainer)) {
          cleanUpView(lViewOrLContainer[TVIEW], lViewOrLContainer);
        }
        lViewOrLContainer = lViewOrLContainer[PARENT];
      }
      if (lViewOrLContainer === null)
        lViewOrLContainer = rootView;
      if (isLView(lViewOrLContainer)) {
        cleanUpView(lViewOrLContainer[TVIEW], lViewOrLContainer);
      }
      next = lViewOrLContainer && lViewOrLContainer[NEXT];
    }
    lViewOrLContainer = next;
  }
}
function insertView(tView, lView, lContainer, index) {
  const indexInContainer = CONTAINER_HEADER_OFFSET + index;
  const containerLength = lContainer.length;
  if (index > 0) {
    lContainer[indexInContainer - 1][NEXT] = lView;
  }
  if (index < containerLength - CONTAINER_HEADER_OFFSET) {
    lView[NEXT] = lContainer[indexInContainer];
    addToArray(lContainer, CONTAINER_HEADER_OFFSET + index, lView);
  } else {
    lContainer.push(lView);
    lView[NEXT] = null;
  }
  lView[PARENT] = lContainer;
  const declarationLContainer = lView[DECLARATION_LCONTAINER];
  if (declarationLContainer !== null && lContainer !== declarationLContainer) {
    trackMovedView(declarationLContainer, lView);
  }
  const lQueries = lView[QUERIES];
  if (lQueries !== null) {
    lQueries.insertView(tView);
  }
  lView[FLAGS] |= 64;
}
function trackMovedView(declarationContainer, lView) {
  const movedViews = declarationContainer[MOVED_VIEWS];
  const insertedLContainer = lView[PARENT];
  const insertedComponentLView = insertedLContainer[PARENT][DECLARATION_COMPONENT_VIEW];
  const declaredComponentLView = lView[DECLARATION_COMPONENT_VIEW];
  if (declaredComponentLView !== insertedComponentLView) {
    declarationContainer[HAS_TRANSPLANTED_VIEWS] = true;
  }
  if (movedViews === null) {
    declarationContainer[MOVED_VIEWS] = [lView];
  } else {
    movedViews.push(lView);
  }
}
function detachMovedView(declarationContainer, lView) {
  const movedViews = declarationContainer[MOVED_VIEWS];
  const declarationViewIndex = movedViews.indexOf(lView);
  const insertionLContainer = lView[PARENT];
  if (lView[FLAGS] & 512) {
    lView[FLAGS] &= ~512;
    updateTransplantedViewCount(insertionLContainer, -1);
  }
  movedViews.splice(declarationViewIndex, 1);
}
function detachView(lContainer, removeIndex) {
  if (lContainer.length <= CONTAINER_HEADER_OFFSET)
    return;
  const indexInContainer = CONTAINER_HEADER_OFFSET + removeIndex;
  const viewToDetach = lContainer[indexInContainer];
  if (viewToDetach) {
    const declarationLContainer = viewToDetach[DECLARATION_LCONTAINER];
    if (declarationLContainer !== null && declarationLContainer !== lContainer) {
      detachMovedView(declarationLContainer, viewToDetach);
    }
    if (removeIndex > 0) {
      lContainer[indexInContainer - 1][NEXT] = viewToDetach[NEXT];
    }
    const removedLView = removeFromArray(lContainer, CONTAINER_HEADER_OFFSET + removeIndex);
    removeViewFromContainer(viewToDetach[TVIEW], viewToDetach);
    const lQueries = removedLView[QUERIES];
    if (lQueries !== null) {
      lQueries.detachView(removedLView[TVIEW]);
    }
    viewToDetach[PARENT] = null;
    viewToDetach[NEXT] = null;
    viewToDetach[FLAGS] &= ~64;
  }
  return viewToDetach;
}
function destroyLView(tView, lView) {
  if (!(lView[FLAGS] & 128)) {
    const renderer = lView[RENDERER];
    if (renderer.destroyNode) {
      applyView(tView, lView, renderer, 3, null, null);
    }
    destroyViewTree(lView);
  }
}
function cleanUpView(tView, lView) {
  if (!(lView[FLAGS] & 128)) {
    lView[FLAGS] &= ~64;
    lView[FLAGS] |= 128;
    executeOnDestroys(tView, lView);
    processCleanups(tView, lView);
    if (lView[TVIEW].type === 1) {
      lView[RENDERER].destroy();
    }
    const declarationContainer = lView[DECLARATION_LCONTAINER];
    if (declarationContainer !== null && isLContainer(lView[PARENT])) {
      if (declarationContainer !== lView[PARENT]) {
        detachMovedView(declarationContainer, lView);
      }
      const lQueries = lView[QUERIES];
      if (lQueries !== null) {
        lQueries.detachView(tView);
      }
    }
    unregisterLView(lView);
  }
}
function processCleanups(tView, lView) {
  const tCleanup = tView.cleanup;
  const lCleanup = lView[CLEANUP];
  let lastLCleanupIndex = -1;
  if (tCleanup !== null) {
    for (let i = 0; i < tCleanup.length - 1; i += 2) {
      if (typeof tCleanup[i] === "string") {
        const targetIdx = tCleanup[i + 3];
        if (targetIdx >= 0) {
          lCleanup[lastLCleanupIndex = targetIdx]();
        } else {
          lCleanup[lastLCleanupIndex = -targetIdx].unsubscribe();
        }
        i += 2;
      } else {
        const context = lCleanup[lastLCleanupIndex = tCleanup[i + 1]];
        tCleanup[i].call(context);
      }
    }
  }
  if (lCleanup !== null) {
    for (let i = lastLCleanupIndex + 1; i < lCleanup.length; i++) {
      const instanceCleanupFn = lCleanup[i];
      instanceCleanupFn();
    }
    lView[CLEANUP] = null;
  }
}
function executeOnDestroys(tView, lView) {
  let destroyHooks;
  if (tView != null && (destroyHooks = tView.destroyHooks) != null) {
    for (let i = 0; i < destroyHooks.length; i += 2) {
      const context = lView[destroyHooks[i]];
      if (!(context instanceof NodeInjectorFactory)) {
        const toCall = destroyHooks[i + 1];
        if (Array.isArray(toCall)) {
          for (let j = 0; j < toCall.length; j += 2) {
            const callContext = context[toCall[j]];
            const hook = toCall[j + 1];
            profiler(4, callContext, hook);
            try {
              hook.call(callContext);
            } finally {
              profiler(5, callContext, hook);
            }
          }
        } else {
          profiler(4, context, toCall);
          try {
            toCall.call(context);
          } finally {
            profiler(5, context, toCall);
          }
        }
      }
    }
  }
}
function getParentRElement(tView, tNode, lView) {
  return getClosestRElement(tView, tNode.parent, lView);
}
function getClosestRElement(tView, tNode, lView) {
  let parentTNode = tNode;
  while (parentTNode !== null && parentTNode.type & (8 | 32)) {
    tNode = parentTNode;
    parentTNode = tNode.parent;
  }
  if (parentTNode === null) {
    return lView[HOST];
  } else {
    const {
      componentOffset
    } = parentTNode;
    if (componentOffset > -1) {
      const {
        encapsulation
      } = tView.data[parentTNode.directiveStart + componentOffset];
      if (encapsulation === ViewEncapsulation$1.None || encapsulation === ViewEncapsulation$1.Emulated) {
        return null;
      }
    }
    return getNativeByTNode(parentTNode, lView);
  }
}
function nativeInsertBefore(renderer, parent, child, beforeNode, isMove) {
  renderer.insertBefore(parent, child, beforeNode, isMove);
}
function nativeAppendChild(renderer, parent, child) {
  renderer.appendChild(parent, child);
}
function nativeAppendOrInsertBefore(renderer, parent, child, beforeNode, isMove) {
  if (beforeNode !== null) {
    nativeInsertBefore(renderer, parent, child, beforeNode, isMove);
  } else {
    nativeAppendChild(renderer, parent, child);
  }
}
function nativeRemoveChild(renderer, parent, child, isHostElement) {
  renderer.removeChild(parent, child, isHostElement);
}
function nativeParentNode(renderer, node) {
  return renderer.parentNode(node);
}
function nativeNextSibling(renderer, node) {
  return renderer.nextSibling(node);
}
function getInsertInFrontOfRNode(parentTNode, currentTNode, lView) {
  return _getInsertInFrontOfRNodeWithI18n(parentTNode, currentTNode, lView);
}
function getInsertInFrontOfRNodeWithNoI18n(parentTNode, currentTNode, lView) {
  if (parentTNode.type & (8 | 32)) {
    return getNativeByTNode(parentTNode, lView);
  }
  return null;
}
let _getInsertInFrontOfRNodeWithI18n = getInsertInFrontOfRNodeWithNoI18n;
function appendChild(tView, lView, childRNode, childTNode) {
  const parentRNode = getParentRElement(tView, childTNode, lView);
  const renderer = lView[RENDERER];
  const parentTNode = childTNode.parent || lView[T_HOST];
  const anchorNode = getInsertInFrontOfRNode(parentTNode, childTNode, lView);
  if (parentRNode != null) {
    if (Array.isArray(childRNode)) {
      for (let i = 0; i < childRNode.length; i++) {
        nativeAppendOrInsertBefore(renderer, parentRNode, childRNode[i], anchorNode, false);
      }
    } else {
      nativeAppendOrInsertBefore(renderer, parentRNode, childRNode, anchorNode, false);
    }
  }
}
function getFirstNativeNode(lView, tNode) {
  if (tNode !== null) {
    const tNodeType = tNode.type;
    if (tNodeType & 3) {
      return getNativeByTNode(tNode, lView);
    } else if (tNodeType & 4) {
      return getBeforeNodeForView(-1, lView[tNode.index]);
    } else if (tNodeType & 8) {
      const elIcuContainerChild = tNode.child;
      if (elIcuContainerChild !== null) {
        return getFirstNativeNode(lView, elIcuContainerChild);
      } else {
        const rNodeOrLContainer = lView[tNode.index];
        if (isLContainer(rNodeOrLContainer)) {
          return getBeforeNodeForView(-1, rNodeOrLContainer);
        } else {
          return unwrapRNode(rNodeOrLContainer);
        }
      }
    } else if (tNodeType & 32) {
      let nextRNode = icuContainerIterate(tNode, lView);
      let rNode = nextRNode();
      return rNode || unwrapRNode(lView[tNode.index]);
    } else {
      const projectionNodes = getProjectionNodes(lView, tNode);
      if (projectionNodes !== null) {
        if (Array.isArray(projectionNodes)) {
          return projectionNodes[0];
        }
        const parentView = getLViewParent(lView[DECLARATION_COMPONENT_VIEW]);
        return getFirstNativeNode(parentView, projectionNodes);
      } else {
        return getFirstNativeNode(lView, tNode.next);
      }
    }
  }
  return null;
}
function getProjectionNodes(lView, tNode) {
  if (tNode !== null) {
    const componentView = lView[DECLARATION_COMPONENT_VIEW];
    const componentHost = componentView[T_HOST];
    const slotIdx = tNode.projection;
    return componentHost.projection[slotIdx];
  }
  return null;
}
function getBeforeNodeForView(viewIndexInContainer, lContainer) {
  const nextViewIndex = CONTAINER_HEADER_OFFSET + viewIndexInContainer + 1;
  if (nextViewIndex < lContainer.length) {
    const lView = lContainer[nextViewIndex];
    const firstTNodeOfView = lView[TVIEW].firstChild;
    if (firstTNodeOfView !== null) {
      return getFirstNativeNode(lView, firstTNodeOfView);
    }
  }
  return lContainer[NATIVE];
}
function nativeRemoveNode(renderer, rNode, isHostElement) {
  const nativeParent = nativeParentNode(renderer, rNode);
  if (nativeParent) {
    nativeRemoveChild(renderer, nativeParent, rNode, isHostElement);
  }
}
function applyNodes(renderer, action, tNode, lView, parentRElement, beforeNode, isProjection) {
  while (tNode != null) {
    const rawSlotValue = lView[tNode.index];
    const tNodeType = tNode.type;
    if (isProjection) {
      if (action === 0) {
        rawSlotValue && attachPatchData(unwrapRNode(rawSlotValue), lView);
        tNode.flags |= 2;
      }
    }
    if ((tNode.flags & 32) !== 32) {
      if (tNodeType & 8) {
        applyNodes(renderer, action, tNode.child, lView, parentRElement, beforeNode, false);
        applyToElementOrContainer(action, renderer, parentRElement, rawSlotValue, beforeNode);
      } else if (tNodeType & 32) {
        const nextRNode = icuContainerIterate(tNode, lView);
        let rNode;
        while (rNode = nextRNode()) {
          applyToElementOrContainer(action, renderer, parentRElement, rNode, beforeNode);
        }
        applyToElementOrContainer(action, renderer, parentRElement, rawSlotValue, beforeNode);
      } else if (tNodeType & 16) {
        applyProjectionRecursive(renderer, action, lView, tNode, parentRElement, beforeNode);
      } else {
        applyToElementOrContainer(action, renderer, parentRElement, rawSlotValue, beforeNode);
      }
    }
    tNode = isProjection ? tNode.projectionNext : tNode.next;
  }
}
function applyView(tView, lView, renderer, action, parentRElement, beforeNode) {
  applyNodes(renderer, action, tView.firstChild, lView, parentRElement, beforeNode, false);
}
function applyProjectionRecursive(renderer, action, lView, tProjectionNode, parentRElement, beforeNode) {
  const componentLView = lView[DECLARATION_COMPONENT_VIEW];
  const componentNode = componentLView[T_HOST];
  const nodeToProjectOrRNodes = componentNode.projection[tProjectionNode.projection];
  if (Array.isArray(nodeToProjectOrRNodes)) {
    for (let i = 0; i < nodeToProjectOrRNodes.length; i++) {
      const rNode = nodeToProjectOrRNodes[i];
      applyToElementOrContainer(action, renderer, parentRElement, rNode, beforeNode);
    }
  } else {
    let nodeToProject = nodeToProjectOrRNodes;
    const projectedComponentLView = componentLView[PARENT];
    applyNodes(renderer, action, nodeToProject, projectedComponentLView, parentRElement, beforeNode, true);
  }
}
function applyContainer(renderer, action, lContainer, parentRElement, beforeNode) {
  const anchor = lContainer[NATIVE];
  const native = unwrapRNode(lContainer);
  if (anchor !== native) {
    applyToElementOrContainer(action, renderer, parentRElement, anchor, beforeNode);
  }
  for (let i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
    const lView = lContainer[i];
    applyView(lView[TVIEW], lView, renderer, action, parentRElement, anchor);
  }
}
function applyStyling(renderer, isClassBased, rNode, prop, value) {
  if (isClassBased) {
    if (!value) {
      renderer.removeClass(rNode, prop);
    } else {
      renderer.addClass(rNode, prop);
    }
  } else {
    let flags = prop.indexOf("-") === -1 ? void 0 : RendererStyleFlags2.DashCase;
    if (value == null) {
      renderer.removeStyle(rNode, prop, flags);
    } else {
      const isImportant = typeof value === "string" ? value.endsWith("!important") : false;
      if (isImportant) {
        value = value.slice(0, -10);
        flags |= RendererStyleFlags2.Important;
      }
      renderer.setStyle(rNode, prop, value, flags);
    }
  }
}
function writeDirectStyle(renderer, element, newValue) {
  renderer.setAttribute(element, "style", newValue);
}
function writeDirectClass(renderer, element, newValue) {
  if (newValue === "") {
    renderer.removeAttribute(element, "class");
  } else {
    renderer.setAttribute(element, "class", newValue);
  }
}
function setupStaticAttributes(renderer, element, tNode) {
  const {
    mergedAttrs,
    classes,
    styles
  } = tNode;
  if (mergedAttrs !== null) {
    setUpAttributes(renderer, element, mergedAttrs);
  }
  if (classes !== null) {
    writeDirectClass(renderer, element, classes);
  }
  if (styles !== null) {
    writeDirectStyle(renderer, element, styles);
  }
}
let policy$1;
function getPolicy$1() {
  if (policy$1 === void 0) {
    policy$1 = null;
    if (_global.trustedTypes) {
      try {
        policy$1 = _global.trustedTypes.createPolicy("angular", {
          createHTML: (s) => s,
          createScript: (s) => s,
          createScriptURL: (s) => s
        });
      } catch (_a) {
      }
    }
  }
  return policy$1;
}
function trustedHTMLFromString(html) {
  var _a;
  return ((_a = getPolicy$1()) === null || _a === void 0 ? void 0 : _a.createHTML(html)) || html;
}
let DOCUMENT$1 = void 0;
function setDocument(document2) {
  DOCUMENT$1 = document2;
}
function getDocument() {
  if (DOCUMENT$1 !== void 0) {
    return DOCUMENT$1;
  } else if (typeof document !== "undefined") {
    return document;
  }
  return void 0;
}
let policy;
function getPolicy() {
  if (policy === void 0) {
    policy = null;
    if (_global.trustedTypes) {
      try {
        policy = _global.trustedTypes.createPolicy("angular#unsafe-bypass", {
          createHTML: (s) => s,
          createScript: (s) => s,
          createScriptURL: (s) => s
        });
      } catch (_a) {
      }
    }
  }
  return policy;
}
function trustedHTMLFromStringBypass(html) {
  var _a;
  return ((_a = getPolicy()) === null || _a === void 0 ? void 0 : _a.createHTML(html)) || html;
}
function trustedScriptURLFromStringBypass(url2) {
  var _a;
  return ((_a = getPolicy()) === null || _a === void 0 ? void 0 : _a.createScriptURL(url2)) || url2;
}
class SafeValueImpl {
  constructor(changingThisBreaksApplicationSecurity) {
    this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${XSS_SECURITY_URL})`;
  }
}
class SafeHtmlImpl extends SafeValueImpl {
  getTypeName() {
    return "HTML";
  }
}
class SafeStyleImpl extends SafeValueImpl {
  getTypeName() {
    return "Style";
  }
}
class SafeScriptImpl extends SafeValueImpl {
  getTypeName() {
    return "Script";
  }
}
class SafeUrlImpl extends SafeValueImpl {
  getTypeName() {
    return "URL";
  }
}
class SafeResourceUrlImpl extends SafeValueImpl {
  getTypeName() {
    return "ResourceURL";
  }
}
function unwrapSafeValue(value) {
  return value instanceof SafeValueImpl ? value.changingThisBreaksApplicationSecurity : value;
}
function allowSanitizationBypassAndThrow(value, type) {
  const actualType = getSanitizationBypassType(value);
  if (actualType != null && actualType !== type) {
    if (actualType === "ResourceURL" && type === "URL")
      return true;
    throw new Error(`Required a safe ${type}, got a ${actualType} (see ${XSS_SECURITY_URL})`);
  }
  return actualType === type;
}
function getSanitizationBypassType(value) {
  return value instanceof SafeValueImpl && value.getTypeName() || null;
}
function bypassSanitizationTrustHtml(trustedHtml) {
  return new SafeHtmlImpl(trustedHtml);
}
function bypassSanitizationTrustStyle(trustedStyle) {
  return new SafeStyleImpl(trustedStyle);
}
function bypassSanitizationTrustScript(trustedScript) {
  return new SafeScriptImpl(trustedScript);
}
function bypassSanitizationTrustUrl(trustedUrl) {
  return new SafeUrlImpl(trustedUrl);
}
function bypassSanitizationTrustResourceUrl(trustedResourceUrl) {
  return new SafeResourceUrlImpl(trustedResourceUrl);
}
function getInertBodyHelper(defaultDoc) {
  const inertDocumentHelper = new InertDocumentHelper(defaultDoc);
  return isDOMParserAvailable() ? new DOMParserHelper(inertDocumentHelper) : inertDocumentHelper;
}
class DOMParserHelper {
  constructor(inertDocumentHelper) {
    this.inertDocumentHelper = inertDocumentHelper;
  }
  getInertBodyElement(html) {
    html = "<body><remove></remove>" + html;
    try {
      const body = new window.DOMParser().parseFromString(trustedHTMLFromString(html), "text/html").body;
      if (body === null) {
        return this.inertDocumentHelper.getInertBodyElement(html);
      }
      body.removeChild(body.firstChild);
      return body;
    } catch (_a) {
      return null;
    }
  }
}
class InertDocumentHelper {
  constructor(defaultDoc) {
    this.defaultDoc = defaultDoc;
    this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert");
    if (this.inertDocument.body == null) {
      const inertHtml = this.inertDocument.createElement("html");
      this.inertDocument.appendChild(inertHtml);
      const inertBodyElement = this.inertDocument.createElement("body");
      inertHtml.appendChild(inertBodyElement);
    }
  }
  getInertBodyElement(html) {
    const templateEl = this.inertDocument.createElement("template");
    if ("content" in templateEl) {
      templateEl.innerHTML = trustedHTMLFromString(html);
      return templateEl;
    }
    const inertBody = this.inertDocument.createElement("body");
    inertBody.innerHTML = trustedHTMLFromString(html);
    if (this.defaultDoc.documentMode) {
      this.stripCustomNsAttrs(inertBody);
    }
    return inertBody;
  }
  /**
   * When IE11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1'
   * attribute to declare ns1 namespace and prefixes the attribute with 'ns1' (e.g.
   * 'ns1:xlink:foo').
   *
   * This is undesirable since we don't want to allow any of these custom attributes. This method
   * strips them all.
   */
  stripCustomNsAttrs(el) {
    const elAttrs = el.attributes;
    for (let i = elAttrs.length - 1; 0 < i; i--) {
      const attrib = elAttrs.item(i);
      const attrName = attrib.name;
      if (attrName === "xmlns:ns1" || attrName.indexOf("ns1:") === 0) {
        el.removeAttribute(attrName);
      }
    }
    let childNode = el.firstChild;
    while (childNode) {
      if (childNode.nodeType === Node.ELEMENT_NODE)
        this.stripCustomNsAttrs(childNode);
      childNode = childNode.nextSibling;
    }
  }
}
function isDOMParserAvailable() {
  try {
    return !!new window.DOMParser().parseFromString(trustedHTMLFromString(""), "text/html");
  } catch (_a) {
    return false;
  }
}
const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
function _sanitizeUrl(url2) {
  url2 = String(url2);
  if (url2.match(SAFE_URL_PATTERN))
    return url2;
  if (false) {
    console.warn(`WARNING: sanitizing unsafe URL value ${url2} (see ${XSS_SECURITY_URL})`);
  }
  return "unsafe:" + url2;
}
function tagSet(tags) {
  const res = {};
  for (const t of tags.split(","))
    res[t] = true;
  return res;
}
function merge(...sets) {
  const res = {};
  for (const s of sets) {
    for (const v in s) {
      if (s.hasOwnProperty(v))
        res[v] = true;
    }
  }
  return res;
}
const VOID_ELEMENTS = /* @__PURE__ */ tagSet("area,br,col,hr,img,wbr");
const OPTIONAL_END_TAG_BLOCK_ELEMENTS = /* @__PURE__ */ tagSet("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");
const OPTIONAL_END_TAG_INLINE_ELEMENTS = /* @__PURE__ */ tagSet("rp,rt");
const OPTIONAL_END_TAG_ELEMENTS = /* @__PURE__ */ merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, OPTIONAL_END_TAG_BLOCK_ELEMENTS);
const BLOCK_ELEMENTS = /* @__PURE__ */ merge(OPTIONAL_END_TAG_BLOCK_ELEMENTS, /* @__PURE__ */ tagSet("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"));
const INLINE_ELEMENTS = /* @__PURE__ */ merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, /* @__PURE__ */ tagSet("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"));
const VALID_ELEMENTS = /* @__PURE__ */ merge(VOID_ELEMENTS, BLOCK_ELEMENTS, INLINE_ELEMENTS, OPTIONAL_END_TAG_ELEMENTS);
const URI_ATTRS = /* @__PURE__ */ tagSet("background,cite,href,itemtype,longdesc,poster,src,xlink:href");
const HTML_ATTRS = /* @__PURE__ */ tagSet("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width");
const ARIA_ATTRS = /* @__PURE__ */ tagSet("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext");
const VALID_ATTRS = /* @__PURE__ */ merge(URI_ATTRS, HTML_ATTRS, ARIA_ATTRS);
const SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS = /* @__PURE__ */ tagSet("script,style,template");
class SanitizingHtmlSerializer {
  constructor() {
    this.sanitizedSomething = false;
    this.buf = [];
  }
  sanitizeChildren(el) {
    let current = el.firstChild;
    let traverseContent = true;
    while (current) {
      if (current.nodeType === Node.ELEMENT_NODE) {
        traverseContent = this.startElement(current);
      } else if (current.nodeType === Node.TEXT_NODE) {
        this.chars(current.nodeValue);
      } else {
        this.sanitizedSomething = true;
      }
      if (traverseContent && current.firstChild) {
        current = current.firstChild;
        continue;
      }
      while (current) {
        if (current.nodeType === Node.ELEMENT_NODE) {
          this.endElement(current);
        }
        let next = this.checkClobberedElement(current, current.nextSibling);
        if (next) {
          current = next;
          break;
        }
        current = this.checkClobberedElement(current, current.parentNode);
      }
    }
    return this.buf.join("");
  }
  /**
   * Sanitizes an opening element tag (if valid) and returns whether the element's contents should
   * be traversed. Element content must always be traversed (even if the element itself is not
   * valid/safe), unless the element is one of `SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS`.
   *
   * @param element The element to sanitize.
   * @return True if the element's contents should be traversed.
   */
  startElement(element) {
    const tagName = element.nodeName.toLowerCase();
    if (!VALID_ELEMENTS.hasOwnProperty(tagName)) {
      this.sanitizedSomething = true;
      return !SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS.hasOwnProperty(tagName);
    }
    this.buf.push("<");
    this.buf.push(tagName);
    const elAttrs = element.attributes;
    for (let i = 0; i < elAttrs.length; i++) {
      const elAttr = elAttrs.item(i);
      const attrName = elAttr.name;
      const lower = attrName.toLowerCase();
      if (!VALID_ATTRS.hasOwnProperty(lower)) {
        this.sanitizedSomething = true;
        continue;
      }
      let value = elAttr.value;
      if (URI_ATTRS[lower])
        value = _sanitizeUrl(value);
      this.buf.push(" ", attrName, '="', encodeEntities(value), '"');
    }
    this.buf.push(">");
    return true;
  }
  endElement(current) {
    const tagName = current.nodeName.toLowerCase();
    if (VALID_ELEMENTS.hasOwnProperty(tagName) && !VOID_ELEMENTS.hasOwnProperty(tagName)) {
      this.buf.push("</");
      this.buf.push(tagName);
      this.buf.push(">");
    }
  }
  chars(chars) {
    this.buf.push(encodeEntities(chars));
  }
  checkClobberedElement(node, nextNode) {
    if (nextNode && (node.compareDocumentPosition(nextNode) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY) {
      throw new Error(`Failed to sanitize html because the element is clobbered: ${node.outerHTML}`);
    }
    return nextNode;
  }
}
const SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
const NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
function encodeEntities(value) {
  return value.replace(/&/g, "&amp;").replace(SURROGATE_PAIR_REGEXP, function(match2) {
    const hi = match2.charCodeAt(0);
    const low = match2.charCodeAt(1);
    return "&#" + ((hi - 55296) * 1024 + (low - 56320) + 65536) + ";";
  }).replace(NON_ALPHANUMERIC_REGEXP, function(match2) {
    return "&#" + match2.charCodeAt(0) + ";";
  }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
let inertBodyHelper;
function _sanitizeHtml(defaultDoc, unsafeHtmlInput) {
  let inertBodyElement = null;
  try {
    inertBodyHelper = inertBodyHelper || getInertBodyHelper(defaultDoc);
    let unsafeHtml = unsafeHtmlInput ? String(unsafeHtmlInput) : "";
    inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
    let mXSSAttempts = 5;
    let parsedHtml = unsafeHtml;
    do {
      if (mXSSAttempts === 0) {
        throw new Error("Failed to sanitize html because the input is unstable");
      }
      mXSSAttempts--;
      unsafeHtml = parsedHtml;
      parsedHtml = inertBodyElement.innerHTML;
      inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
    } while (unsafeHtml !== parsedHtml);
    const sanitizer = new SanitizingHtmlSerializer();
    const safeHtml = sanitizer.sanitizeChildren(getTemplateContent(inertBodyElement) || inertBodyElement);
    if (false) {
      console.warn(`WARNING: sanitizing HTML stripped some content, see ${XSS_SECURITY_URL}`);
    }
    return trustedHTMLFromString(safeHtml);
  } finally {
    if (inertBodyElement) {
      const parent = getTemplateContent(inertBodyElement) || inertBodyElement;
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }
  }
}
function getTemplateContent(el) {
  return "content" in el && isTemplateElement(el) ? el.content : null;
}
function isTemplateElement(el) {
  return el.nodeType === Node.ELEMENT_NODE && el.nodeName === "TEMPLATE";
}
var SecurityContext$1 = /* @__PURE__ */ (() => {
  SecurityContext$1 = SecurityContext$1 || {};
  SecurityContext$1[SecurityContext$1["NONE"] = 0] = "NONE";
  SecurityContext$1[SecurityContext$1["HTML"] = 1] = "HTML";
  SecurityContext$1[SecurityContext$1["STYLE"] = 2] = "STYLE";
  SecurityContext$1[SecurityContext$1["SCRIPT"] = 3] = "SCRIPT";
  SecurityContext$1[SecurityContext$1["URL"] = 4] = "URL";
  SecurityContext$1[SecurityContext$1["RESOURCE_URL"] = 5] = "RESOURCE_URL";
  return SecurityContext$1;
})();
function ɵɵsanitizeHtml(unsafeHtml) {
  const sanitizer = getSanitizer();
  if (sanitizer) {
    return trustedHTMLFromStringBypass(sanitizer.sanitize(SecurityContext$1.HTML, unsafeHtml) || "");
  }
  if (allowSanitizationBypassAndThrow(
    unsafeHtml,
    "HTML"
    /* BypassType.Html */
  )) {
    return trustedHTMLFromStringBypass(unwrapSafeValue(unsafeHtml));
  }
  return _sanitizeHtml(getDocument(), renderStringify(unsafeHtml));
}
function ɵɵsanitizeUrl(unsafeUrl) {
  const sanitizer = getSanitizer();
  if (sanitizer) {
    return sanitizer.sanitize(SecurityContext$1.URL, unsafeUrl) || "";
  }
  if (allowSanitizationBypassAndThrow(
    unsafeUrl,
    "URL"
    /* BypassType.Url */
  )) {
    return unwrapSafeValue(unsafeUrl);
  }
  return _sanitizeUrl(renderStringify(unsafeUrl));
}
function ɵɵsanitizeResourceUrl(unsafeResourceUrl) {
  const sanitizer = getSanitizer();
  if (sanitizer) {
    return trustedScriptURLFromStringBypass(sanitizer.sanitize(SecurityContext$1.RESOURCE_URL, unsafeResourceUrl) || "");
  }
  if (allowSanitizationBypassAndThrow(
    unsafeResourceUrl,
    "ResourceURL"
    /* BypassType.ResourceUrl */
  )) {
    return trustedScriptURLFromStringBypass(unwrapSafeValue(unsafeResourceUrl));
  }
  throw new RuntimeError(904, false);
}
function getUrlSanitizer(tag, prop) {
  if (prop === "src" && (tag === "embed" || tag === "frame" || tag === "iframe" || tag === "media" || tag === "script") || prop === "href" && (tag === "base" || tag === "link")) {
    return ɵɵsanitizeResourceUrl;
  }
  return ɵɵsanitizeUrl;
}
function ɵɵsanitizeUrlOrResourceUrl(unsafeUrl, tag, prop) {
  return getUrlSanitizer(tag, prop)(unsafeUrl);
}
function validateAgainstEventProperties(name) {
  if (name.toLowerCase().startsWith("on")) {
    const errorMessage = `Binding to event property '${name}' is disallowed for security reasons, please use (${name.slice(2)})=...
If '${name}' is a directive input, make sure the directive is imported by the current module.`;
    throw new RuntimeError(306, errorMessage);
  }
}
function validateAgainstEventAttributes(name) {
  if (name.toLowerCase().startsWith("on")) {
    const errorMessage = `Binding to event attribute '${name}' is disallowed for security reasons, please use (${name.slice(2)})=...`;
    throw new RuntimeError(306, errorMessage);
  }
}
function getSanitizer() {
  const lView = getLView();
  return lView && lView[SANITIZER];
}
const ENVIRONMENT_INITIALIZER = /* @__PURE__ */ new InjectionToken("ENVIRONMENT_INITIALIZER");
const INJECTOR = /* @__PURE__ */ new InjectionToken(
  "INJECTOR",
  // Disable tslint because this is const enum which gets inlined not top level prop access.
  // tslint:disable-next-line: no-toplevel-property-access
  -1
  /* InjectorMarkers.Injector */
);
const INJECTOR_DEF_TYPES = /* @__PURE__ */ new InjectionToken("INJECTOR_DEF_TYPES");
class NullInjector {
  get(token, notFoundValue = THROW_IF_NOT_FOUND) {
    if (notFoundValue === THROW_IF_NOT_FOUND) {
      const error = new Error(`NullInjectorError: No provider for ${stringify$1(token)}!`);
      error.name = "NullInjectorError";
      throw error;
    }
    return notFoundValue;
  }
}
function makeEnvironmentProviders(providers) {
  return {
    ɵproviders: providers
  };
}
function importProvidersFrom(...sources) {
  return {
    ɵproviders: internalImportProvidersFrom(true, sources),
    ɵfromNgModule: true
  };
}
function internalImportProvidersFrom(checkForStandaloneCmp, ...sources) {
  const providersOut = [];
  const dedup = /* @__PURE__ */ new Set();
  let injectorTypesWithProviders;
  deepForEach(sources, (source) => {
    if (false) {
      const cmpDef = getComponentDef(source);
      if (cmpDef === null || cmpDef === void 0 ? void 0 : cmpDef.standalone) {
        throw new RuntimeError(800, `Importing providers supports NgModule or ModuleWithProviders but got a standalone component "${stringifyForError(source)}"`);
      }
    }
    const internalSource = source;
    if (walkProviderTree(internalSource, providersOut, [], dedup)) {
      injectorTypesWithProviders || (injectorTypesWithProviders = []);
      injectorTypesWithProviders.push(internalSource);
    }
  });
  if (injectorTypesWithProviders !== void 0) {
    processInjectorTypesWithProviders(injectorTypesWithProviders, providersOut);
  }
  return providersOut;
}
function processInjectorTypesWithProviders(typesWithProviders, providersOut) {
  for (let i = 0; i < typesWithProviders.length; i++) {
    const {
      ngModule,
      providers
    } = typesWithProviders[i];
    deepForEachProvider(providers, (provider) => {
      providersOut.push(provider);
    });
  }
}
function walkProviderTree(container, providersOut, parents, dedup) {
  container = resolveForwardRef(container);
  if (!container)
    return false;
  let defType = null;
  let injDef = getInjectorDef(container);
  const cmpDef = !injDef && getComponentDef(container);
  if (!injDef && !cmpDef) {
    const ngModule = container.ngModule;
    injDef = getInjectorDef(ngModule);
    if (injDef) {
      defType = ngModule;
    } else {
      return false;
    }
  } else if (cmpDef && !cmpDef.standalone) {
    return false;
  } else {
    defType = container;
  }
  if (false) {
    const defName = stringify$1(defType);
    const path = parents.map(stringify$1);
    throwCyclicDependencyError(defName, path);
  }
  const isDuplicate = dedup.has(defType);
  if (cmpDef) {
    if (isDuplicate) {
      return false;
    }
    dedup.add(defType);
    if (cmpDef.dependencies) {
      const deps = typeof cmpDef.dependencies === "function" ? cmpDef.dependencies() : cmpDef.dependencies;
      for (const dep of deps) {
        walkProviderTree(dep, providersOut, parents, dedup);
      }
    }
  } else if (injDef) {
    if (injDef.imports != null && !isDuplicate) {
      dedup.add(defType);
      let importTypesWithProviders;
      try {
        deepForEach(injDef.imports, (imported) => {
          if (walkProviderTree(imported, providersOut, parents, dedup)) {
            importTypesWithProviders || (importTypesWithProviders = []);
            importTypesWithProviders.push(imported);
          }
        });
      } finally {
      }
      if (importTypesWithProviders !== void 0) {
        processInjectorTypesWithProviders(importTypesWithProviders, providersOut);
      }
    }
    if (!isDuplicate) {
      const factory = getFactoryDef(defType) || (() => new defType());
      providersOut.push(
        // Provider to create `defType` using its factory.
        {
          provide: defType,
          useFactory: factory,
          deps: EMPTY_ARRAY$1
        },
        // Make this `defType` available to an internal logic that calculates injector scope.
        {
          provide: INJECTOR_DEF_TYPES,
          useValue: defType,
          multi: true
        },
        // Provider to eagerly instantiate `defType` via `ENVIRONMENT_INITIALIZER`.
        {
          provide: ENVIRONMENT_INITIALIZER,
          useValue: () => ɵɵinject(defType),
          multi: true
        }
        //
      );
    }
    const defProviders = injDef.providers;
    if (defProviders != null && !isDuplicate) {
      const injectorType = container;
      deepForEachProvider(defProviders, (provider) => {
        providersOut.push(provider);
      });
    }
  } else {
    return false;
  }
  return defType !== container && container.providers !== void 0;
}
function validateProvider(provider, providers, containerType) {
  if (isTypeProvider(provider) || isValueProvider(provider) || isFactoryProvider(provider) || isExistingProvider(provider)) {
    return;
  }
  const classRef = resolveForwardRef(provider && (provider.useClass || provider.provide));
  if (!classRef) {
    throwInvalidProviderError(containerType, providers, provider);
  }
}
function deepForEachProvider(providers, fn) {
  for (let provider of providers) {
    if (isEnvironmentProviders(provider)) {
      provider = provider.ɵproviders;
    }
    if (Array.isArray(provider)) {
      deepForEachProvider(provider, fn);
    } else {
      fn(provider);
    }
  }
}
const USE_VALUE$1 = /* @__PURE__ */ getClosureSafeProperty({
  provide: String,
  useValue: getClosureSafeProperty
});
function isValueProvider(value) {
  return value !== null && typeof value == "object" && USE_VALUE$1 in value;
}
function isExistingProvider(value) {
  return !!(value && value.useExisting);
}
function isFactoryProvider(value) {
  return !!(value && value.useFactory);
}
function isTypeProvider(value) {
  return typeof value === "function";
}
const INJECTOR_SCOPE = /* @__PURE__ */ new InjectionToken("Set Injector scope.");
const NOT_YET = {};
const CIRCULAR = {};
let NULL_INJECTOR$1 = void 0;
function getNullInjector() {
  if (NULL_INJECTOR$1 === void 0) {
    NULL_INJECTOR$1 = new NullInjector();
  }
  return NULL_INJECTOR$1;
}
class EnvironmentInjector {
}
class R3Injector extends EnvironmentInjector {
  /**
   * Flag indicating that this injector was previously destroyed.
   */
  get destroyed() {
    return this._destroyed;
  }
  constructor(providers, parent, source, scopes) {
    super();
    this.parent = parent;
    this.source = source;
    this.scopes = scopes;
    this.records = /* @__PURE__ */ new Map();
    this._ngOnDestroyHooks = /* @__PURE__ */ new Set();
    this._onDestroyHooks = [];
    this._destroyed = false;
    forEachSingleProvider(providers, (provider) => this.processProvider(provider));
    this.records.set(INJECTOR, makeRecord(void 0, this));
    if (scopes.has("environment")) {
      this.records.set(EnvironmentInjector, makeRecord(void 0, this));
    }
    const record = this.records.get(INJECTOR_SCOPE);
    if (record != null && typeof record.value === "string") {
      this.scopes.add(record.value);
    }
    this.injectorDefTypes = new Set(this.get(INJECTOR_DEF_TYPES.multi, EMPTY_ARRAY$1, InjectFlags.Self));
  }
  /**
   * Destroy the injector and release references to every instance or provider associated with it.
   *
   * Also calls the `OnDestroy` lifecycle hooks of every instance that was created for which a
   * hook was found.
   */
  destroy() {
    this.assertNotDestroyed();
    this._destroyed = true;
    try {
      for (const service of this._ngOnDestroyHooks) {
        service.ngOnDestroy();
      }
      for (const hook of this._onDestroyHooks) {
        hook();
      }
    } finally {
      this.records.clear();
      this._ngOnDestroyHooks.clear();
      this.injectorDefTypes.clear();
      this._onDestroyHooks.length = 0;
    }
  }
  onDestroy(callback) {
    this._onDestroyHooks.push(callback);
  }
  runInContext(fn) {
    this.assertNotDestroyed();
    const previousInjector = setCurrentInjector(this);
    const previousInjectImplementation = setInjectImplementation(void 0);
    try {
      return fn();
    } finally {
      setCurrentInjector(previousInjector);
      setInjectImplementation(previousInjectImplementation);
    }
  }
  get(token, notFoundValue = THROW_IF_NOT_FOUND, flags = InjectFlags.Default) {
    this.assertNotDestroyed();
    flags = convertToBitFlags(flags);
    const previousInjector = setCurrentInjector(this);
    const previousInjectImplementation = setInjectImplementation(void 0);
    try {
      if (!(flags & InjectFlags.SkipSelf)) {
        let record = this.records.get(token);
        if (record === void 0) {
          const def = couldBeInjectableType(token) && getInjectableDef(token);
          if (def && this.injectableDefInScope(def)) {
            record = makeRecord(injectableDefOrInjectorDefFactory(token), NOT_YET);
          } else {
            record = null;
          }
          this.records.set(token, record);
        }
        if (record != null) {
          return this.hydrate(token, record);
        }
      }
      const nextInjector = !(flags & InjectFlags.Self) ? this.parent : getNullInjector();
      notFoundValue = flags & InjectFlags.Optional && notFoundValue === THROW_IF_NOT_FOUND ? null : notFoundValue;
      return nextInjector.get(token, notFoundValue);
    } catch (e) {
      if (e.name === "NullInjectorError") {
        const path = e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || [];
        path.unshift(stringify$1(token));
        if (previousInjector) {
          throw e;
        } else {
          return catchInjectorError(e, token, "R3InjectorError", this.source);
        }
      } else {
        throw e;
      }
    } finally {
      setInjectImplementation(previousInjectImplementation);
      setCurrentInjector(previousInjector);
    }
  }
  /** @internal */
  resolveInjectorInitializers() {
    const previousInjector = setCurrentInjector(this);
    const previousInjectImplementation = setInjectImplementation(void 0);
    try {
      const initializers = this.get(ENVIRONMENT_INITIALIZER.multi, EMPTY_ARRAY$1, InjectFlags.Self);
      if (false) {
        throw new RuntimeError(-209, `Unexpected type of the \`ENVIRONMENT_INITIALIZER\` token value (expected an array, but got ${typeof initializers}). Please check that the \`ENVIRONMENT_INITIALIZER\` token is configured as a \`multi: true\` provider.`);
      }
      for (const initializer of initializers) {
        initializer();
      }
    } finally {
      setCurrentInjector(previousInjector);
      setInjectImplementation(previousInjectImplementation);
    }
  }
  toString() {
    const tokens = [];
    const records = this.records;
    for (const token of records.keys()) {
      tokens.push(stringify$1(token));
    }
    return `R3Injector[${tokens.join(", ")}]`;
  }
  assertNotDestroyed() {
    if (this._destroyed) {
      throw new RuntimeError(205, false);
    }
  }
  /**
   * Process a `SingleProvider` and add it.
   */
  processProvider(provider) {
    provider = resolveForwardRef(provider);
    let token = isTypeProvider(provider) ? provider : resolveForwardRef(provider && provider.provide);
    const record = providerToRecord(provider);
    if (!isTypeProvider(provider) && provider.multi === true) {
      let multiRecord = this.records.get(token);
      if (multiRecord) {
        if (false) {
          throwMixedMultiProviderError();
        }
      } else {
        multiRecord = makeRecord(void 0, NOT_YET, true);
        multiRecord.factory = () => injectArgs(multiRecord.multi);
        this.records.set(token, multiRecord);
      }
      token = provider;
      multiRecord.multi.push(provider);
    } else {
      const existing = this.records.get(token);
      if (false) {
        throwMixedMultiProviderError();
      }
    }
    this.records.set(token, record);
  }
  hydrate(token, record) {
    if (false) {
      throwCyclicDependencyError(stringify$1(token));
    } else if (record.value === NOT_YET) {
      record.value = CIRCULAR;
      record.value = record.factory();
    }
    if (typeof record.value === "object" && record.value && hasOnDestroy(record.value)) {
      this._ngOnDestroyHooks.add(record.value);
    }
    return record.value;
  }
  injectableDefInScope(def) {
    if (!def.providedIn) {
      return false;
    }
    const providedIn = resolveForwardRef(def.providedIn);
    if (typeof providedIn === "string") {
      return providedIn === "any" || this.scopes.has(providedIn);
    } else {
      return this.injectorDefTypes.has(providedIn);
    }
  }
}
function injectableDefOrInjectorDefFactory(token) {
  const injectableDef = getInjectableDef(token);
  const factory = injectableDef !== null ? injectableDef.factory : getFactoryDef(token);
  if (factory !== null) {
    return factory;
  }
  if (token instanceof InjectionToken) {
    throw new RuntimeError(204, false);
  }
  if (token instanceof Function) {
    return getUndecoratedInjectableFactory(token);
  }
  throw new RuntimeError(204, false);
}
function getUndecoratedInjectableFactory(token) {
  const paramLength = token.length;
  if (paramLength > 0) {
    const args = newArray(paramLength, "?");
    throw new RuntimeError(204, false);
  }
  const inheritedInjectableDef = getInheritedInjectableDef(token);
  if (inheritedInjectableDef !== null) {
    return () => inheritedInjectableDef.factory(token);
  } else {
    return () => new token();
  }
}
function providerToRecord(provider) {
  if (isValueProvider(provider)) {
    return makeRecord(void 0, provider.useValue);
  } else {
    const factory = providerToFactory(provider);
    return makeRecord(factory, NOT_YET);
  }
}
function providerToFactory(provider, ngModuleType, providers) {
  let factory = void 0;
  if (false) {
    throwInvalidProviderError(void 0, providers, provider);
  }
  if (isTypeProvider(provider)) {
    const unwrappedProvider = resolveForwardRef(provider);
    return getFactoryDef(unwrappedProvider) || injectableDefOrInjectorDefFactory(unwrappedProvider);
  } else {
    if (isValueProvider(provider)) {
      factory = () => resolveForwardRef(provider.useValue);
    } else if (isFactoryProvider(provider)) {
      factory = () => provider.useFactory(...injectArgs(provider.deps || []));
    } else if (isExistingProvider(provider)) {
      factory = () => ɵɵinject(resolveForwardRef(provider.useExisting));
    } else {
      const classRef = resolveForwardRef(provider && (provider.useClass || provider.provide));
      if (false) {
        throwInvalidProviderError(ngModuleType, providers, provider);
      }
      if (hasDeps(provider)) {
        factory = () => new classRef(...injectArgs(provider.deps));
      } else {
        return getFactoryDef(classRef) || injectableDefOrInjectorDefFactory(classRef);
      }
    }
  }
  return factory;
}
function makeRecord(factory, value, multi = false) {
  return {
    factory,
    value,
    multi: multi ? [] : void 0
  };
}
function hasDeps(value) {
  return !!value.deps;
}
function hasOnDestroy(value) {
  return value !== null && typeof value === "object" && typeof value.ngOnDestroy === "function";
}
function couldBeInjectableType(value) {
  return typeof value === "function" || typeof value === "object" && value instanceof InjectionToken;
}
function forEachSingleProvider(providers, fn) {
  for (const provider of providers) {
    if (Array.isArray(provider)) {
      forEachSingleProvider(provider, fn);
    } else if (provider && isEnvironmentProviders(provider)) {
      forEachSingleProvider(provider.ɵproviders, fn);
    } else {
      fn(provider);
    }
  }
}
class ComponentRef$1 {
}
class ComponentFactory$1 {
}
function noComponentFactoryError(component) {
  const error = Error(`No component factory found for ${stringify$1(component)}. Did you add it to @NgModule.entryComponents?`);
  error[ERROR_COMPONENT] = component;
  return error;
}
const ERROR_COMPONENT = "ngComponent";
class _NullComponentFactoryResolver {
  resolveComponentFactory(component) {
    throw noComponentFactoryError(component);
  }
}
let ComponentFactoryResolver$1 = /* @__PURE__ */ (() => {
  let ComponentFactoryResolver$12 = /* @__PURE__ */ (() => {
    class ComponentFactoryResolver$13 {
    }
    ComponentFactoryResolver$13.NULL = /* @__PURE__ */ new _NullComponentFactoryResolver();
    return ComponentFactoryResolver$13;
  })();
  return ComponentFactoryResolver$12;
})();
function injectElementRef() {
  return createElementRef(getCurrentTNode(), getLView());
}
function createElementRef(tNode, lView) {
  return new ElementRef(getNativeByTNode(tNode, lView));
}
let ElementRef = /* @__PURE__ */ (() => {
  let ElementRef2 = /* @__PURE__ */ (() => {
    class ElementRef3 {
      constructor(nativeElement) {
        this.nativeElement = nativeElement;
      }
    }
    ElementRef3.__NG_ELEMENT_ID__ = injectElementRef;
    return ElementRef3;
  })();
  return ElementRef2;
})();
class RendererFactory2 {
}
let Renderer2 = /* @__PURE__ */ (() => {
  let Renderer22 = /* @__PURE__ */ (() => {
    class Renderer23 {
    }
    Renderer23.__NG_ELEMENT_ID__ = () => injectRenderer2();
    return Renderer23;
  })();
  return Renderer22;
})();
function injectRenderer2() {
  const lView = getLView();
  const tNode = getCurrentTNode();
  const nodeAtIndex = getComponentLViewByIndex(tNode.index, lView);
  return (isLView(nodeAtIndex) ? nodeAtIndex : lView)[RENDERER];
}
let Sanitizer = /* @__PURE__ */ (() => {
  let Sanitizer2 = /* @__PURE__ */ (() => {
    class Sanitizer3 {
    }
    Sanitizer3.ɵprov = ɵɵdefineInjectable({
      token: Sanitizer3,
      providedIn: "root",
      factory: () => null
    });
    return Sanitizer3;
  })();
  return Sanitizer2;
})();
class Version {
  constructor(full) {
    this.full = full;
    this.major = full.split(".")[0];
    this.minor = full.split(".")[1];
    this.patch = full.split(".").slice(2).join(".");
  }
}
const VERSION = /* @__PURE__ */ new Version("15.1.5");
const NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {};
const ERROR_ORIGINAL_ERROR = "ngOriginalError";
function getOriginalError(error) {
  return error[ERROR_ORIGINAL_ERROR];
}
class ErrorHandler {
  constructor() {
    this._console = console;
  }
  handleError(error) {
    const originalError = this._findOriginalError(error);
    this._console.error("ERROR", error);
    if (originalError) {
      this._console.error("ORIGINAL ERROR", originalError);
    }
  }
  /** @internal */
  _findOriginalError(error) {
    let e = error && getOriginalError(error);
    while (e && getOriginalError(e)) {
      e = getOriginalError(e);
    }
    return e || null;
  }
}
function normalizeDebugBindingName(name) {
  name = camelCaseToDashCase$1(name.replace(/[$@]/g, "_"));
  return `ng-reflect-${name}`;
}
const CAMEL_CASE_REGEXP = /([A-Z])/g;
function camelCaseToDashCase$1(input) {
  return input.replace(CAMEL_CASE_REGEXP, (...m) => "-" + m[1].toLowerCase());
}
function normalizeDebugBindingValue(value) {
  try {
    return value != null ? value.toString().slice(0, 30) : value;
  } catch (e) {
    return "[ERROR] Exception while trying to serialize the value";
  }
}
const INTERPOLATION_DELIMITER = `�`;
function maybeUnwrapFn(value) {
  if (value instanceof Function) {
    return value();
  } else {
    return value;
  }
}
function assertStandaloneComponentType(type) {
  assertComponentDef(type);
  const componentDef = getComponentDef(type);
  if (!componentDef.standalone) {
    throw new RuntimeError(907, `The ${stringifyForError(type)} component is not marked as standalone, but Angular expects to have a standalone component here. Please make sure the ${stringifyForError(type)} component has the \`standalone: true\` flag in the decorator.`);
  }
}
function assertComponentDef(type) {
  if (!getComponentDef(type)) {
    throw new RuntimeError(906, `The ${stringifyForError(type)} is not an Angular component, make sure it has the \`@Component\` decorator.`);
  }
}
function throwMultipleComponentError(tNode, first2, second) {
  throw new RuntimeError(-300, `Multiple components match node with tagname ${tNode.value}: ${stringifyForError(first2)} and ${stringifyForError(second)}`);
}
function throwErrorIfNoChangesMode(creationMode, oldValue, currValue, propName) {
  const field = propName ? ` for '${propName}'` : "";
  let msg = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value${field}: '${oldValue}'. Current value: '${currValue}'.`;
  if (creationMode) {
    msg += ` It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook?`;
  }
  throw new RuntimeError(-100, msg);
}
function constructDetailsForInterpolation(lView, rootIndex, expressionIndex, meta, changedValue) {
  const [propName, prefix, ...chunks] = meta.split(INTERPOLATION_DELIMITER);
  let oldValue = prefix, newValue = prefix;
  for (let i = 0; i < chunks.length; i++) {
    const slotIdx = rootIndex + i;
    oldValue += `${lView[slotIdx]}${chunks[i]}`;
    newValue += `${slotIdx === expressionIndex ? changedValue : lView[slotIdx]}${chunks[i]}`;
  }
  return {
    propName,
    oldValue,
    newValue
  };
}
function getExpressionChangedErrorDetails(lView, bindingIndex, oldValue, newValue) {
  const tData = lView[TVIEW].data;
  const metadata = tData[bindingIndex];
  if (typeof metadata === "string") {
    if (metadata.indexOf(INTERPOLATION_DELIMITER) > -1) {
      return constructDetailsForInterpolation(lView, bindingIndex, bindingIndex, metadata, newValue);
    }
    return {
      propName: metadata,
      oldValue,
      newValue
    };
  }
  if (metadata === null) {
    let idx = bindingIndex - 1;
    while (typeof tData[idx] !== "string" && tData[idx + 1] === null) {
      idx--;
    }
    const meta = tData[idx];
    if (typeof meta === "string") {
      const matches = meta.match(new RegExp(INTERPOLATION_DELIMITER, "g"));
      if (matches && matches.length - 1 > bindingIndex - idx) {
        return constructDetailsForInterpolation(lView, idx, bindingIndex, meta, newValue);
      }
    }
  }
  return {
    propName: void 0,
    oldValue,
    newValue
  };
}
function classIndexOf(className, classToSearch, startingIndex) {
  let end = className.length;
  while (true) {
    const foundIndex = className.indexOf(classToSearch, startingIndex);
    if (foundIndex === -1)
      return foundIndex;
    if (foundIndex === 0 || className.charCodeAt(foundIndex - 1) <= 32) {
      const length = classToSearch.length;
      if (foundIndex + length === end || className.charCodeAt(foundIndex + length) <= 32) {
        return foundIndex;
      }
    }
    startingIndex = foundIndex + 1;
  }
}
const NG_TEMPLATE_SELECTOR = "ng-template";
function isCssClassMatching(attrs, cssClassToMatch, isProjectionMode) {
  let i = 0;
  while (i < attrs.length) {
    let item = attrs[i++];
    if (isProjectionMode && item === "class") {
      item = attrs[i];
      if (classIndexOf(item.toLowerCase(), cssClassToMatch, 0) !== -1) {
        return true;
      }
    } else if (item === 1) {
      while (i < attrs.length && typeof (item = attrs[i++]) == "string") {
        if (item.toLowerCase() === cssClassToMatch)
          return true;
      }
      return false;
    }
  }
  return false;
}
function isInlineTemplate(tNode) {
  return tNode.type === 4 && tNode.value !== NG_TEMPLATE_SELECTOR;
}
function hasTagAndTypeMatch(tNode, currentSelector, isProjectionMode) {
  const tagNameToCompare = tNode.type === 4 && !isProjectionMode ? NG_TEMPLATE_SELECTOR : tNode.value;
  return currentSelector === tagNameToCompare;
}
function isNodeMatchingSelector(tNode, selector, isProjectionMode) {
  let mode = 4;
  const nodeAttrs = tNode.attrs || [];
  const nameOnlyMarkerIdx = getNameOnlyMarkerIndex(nodeAttrs);
  let skipToNextSelector = false;
  for (let i = 0; i < selector.length; i++) {
    const current = selector[i];
    if (typeof current === "number") {
      if (!skipToNextSelector && !isPositive(mode) && !isPositive(current)) {
        return false;
      }
      if (skipToNextSelector && isPositive(current))
        continue;
      skipToNextSelector = false;
      mode = current | mode & 1;
      continue;
    }
    if (skipToNextSelector)
      continue;
    if (mode & 4) {
      mode = 2 | mode & 1;
      if (current !== "" && !hasTagAndTypeMatch(tNode, current, isProjectionMode) || current === "" && selector.length === 1) {
        if (isPositive(mode))
          return false;
        skipToNextSelector = true;
      }
    } else {
      const selectorAttrValue = mode & 8 ? current : selector[++i];
      if (mode & 8 && tNode.attrs !== null) {
        if (!isCssClassMatching(tNode.attrs, selectorAttrValue, isProjectionMode)) {
          if (isPositive(mode))
            return false;
          skipToNextSelector = true;
        }
        continue;
      }
      const attrName = mode & 8 ? "class" : current;
      const attrIndexInNode = findAttrIndexInNode(attrName, nodeAttrs, isInlineTemplate(tNode), isProjectionMode);
      if (attrIndexInNode === -1) {
        if (isPositive(mode))
          return false;
        skipToNextSelector = true;
        continue;
      }
      if (selectorAttrValue !== "") {
        let nodeAttrValue;
        if (attrIndexInNode > nameOnlyMarkerIdx) {
          nodeAttrValue = "";
        } else {
          nodeAttrValue = nodeAttrs[attrIndexInNode + 1].toLowerCase();
        }
        const compareAgainstClassName = mode & 8 ? nodeAttrValue : null;
        if (compareAgainstClassName && classIndexOf(compareAgainstClassName, selectorAttrValue, 0) !== -1 || mode & 2 && selectorAttrValue !== nodeAttrValue) {
          if (isPositive(mode))
            return false;
          skipToNextSelector = true;
        }
      }
    }
  }
  return isPositive(mode) || skipToNextSelector;
}
function isPositive(mode) {
  return (mode & 1) === 0;
}
function findAttrIndexInNode(name, attrs, isInlineTemplate2, isProjectionMode) {
  if (attrs === null)
    return -1;
  let i = 0;
  if (isProjectionMode || !isInlineTemplate2) {
    let bindingsMode = false;
    while (i < attrs.length) {
      const maybeAttrName = attrs[i];
      if (maybeAttrName === name) {
        return i;
      } else if (maybeAttrName === 3 || maybeAttrName === 6) {
        bindingsMode = true;
      } else if (maybeAttrName === 1 || maybeAttrName === 2) {
        let value = attrs[++i];
        while (typeof value === "string") {
          value = attrs[++i];
        }
        continue;
      } else if (maybeAttrName === 4) {
        break;
      } else if (maybeAttrName === 0) {
        i += 4;
        continue;
      }
      i += bindingsMode ? 1 : 2;
    }
    return -1;
  } else {
    return matchTemplateAttribute(attrs, name);
  }
}
function isNodeMatchingSelectorList(tNode, selector, isProjectionMode = false) {
  for (let i = 0; i < selector.length; i++) {
    if (isNodeMatchingSelector(tNode, selector[i], isProjectionMode)) {
      return true;
    }
  }
  return false;
}
function getNameOnlyMarkerIndex(nodeAttrs) {
  for (let i = 0; i < nodeAttrs.length; i++) {
    const nodeAttr = nodeAttrs[i];
    if (isNameOnlyAttributeMarker(nodeAttr)) {
      return i;
    }
  }
  return nodeAttrs.length;
}
function matchTemplateAttribute(attrs, name) {
  let i = attrs.indexOf(
    4
    /* AttributeMarker.Template */
  );
  if (i > -1) {
    i++;
    while (i < attrs.length) {
      const attr = attrs[i];
      if (typeof attr === "number")
        return -1;
      if (attr === name)
        return i;
      i++;
    }
  }
  return -1;
}
function maybeWrapInNotSelector(isNegativeMode, chunk) {
  return isNegativeMode ? ":not(" + chunk.trim() + ")" : chunk;
}
function stringifyCSSSelector(selector) {
  let result = selector[0];
  let i = 1;
  let mode = 2;
  let currentChunk = "";
  let isNegativeMode = false;
  while (i < selector.length) {
    let valueOrMarker = selector[i];
    if (typeof valueOrMarker === "string") {
      if (mode & 2) {
        const attrValue = selector[++i];
        currentChunk += "[" + valueOrMarker + (attrValue.length > 0 ? '="' + attrValue + '"' : "") + "]";
      } else if (mode & 8) {
        currentChunk += "." + valueOrMarker;
      } else if (mode & 4) {
        currentChunk += " " + valueOrMarker;
      }
    } else {
      if (currentChunk !== "" && !isPositive(valueOrMarker)) {
        result += maybeWrapInNotSelector(isNegativeMode, currentChunk);
        currentChunk = "";
      }
      mode = valueOrMarker;
      isNegativeMode = isNegativeMode || !isPositive(mode);
    }
    i++;
  }
  if (currentChunk !== "") {
    result += maybeWrapInNotSelector(isNegativeMode, currentChunk);
  }
  return result;
}
function stringifyCSSSelectorList(selectorList) {
  return selectorList.map(stringifyCSSSelector).join(",");
}
function extractAttrsAndClassesFromSelector(selector) {
  const attrs = [];
  const classes = [];
  let i = 1;
  let mode = 2;
  while (i < selector.length) {
    let valueOrMarker = selector[i];
    if (typeof valueOrMarker === "string") {
      if (mode === 2) {
        if (valueOrMarker !== "") {
          attrs.push(valueOrMarker, selector[++i]);
        }
      } else if (mode === 8) {
        classes.push(valueOrMarker);
      }
    } else {
      if (!isPositive(mode))
        break;
      mode = valueOrMarker;
    }
    i++;
  }
  return {
    attrs,
    classes
  };
}
const NO_CHANGE = false ? {
  __brand__: "NO_CHANGE"
} : {};
function ɵɵadvance(delta) {
  selectIndexInternal(getTView(), getLView(), getSelectedIndex() + delta, false);
}
function selectIndexInternal(tView, lView, index, checkNoChangesMode) {
  if (!checkNoChangesMode) {
    const hooksInitPhaseCompleted = (lView[FLAGS] & 3) === 3;
    if (hooksInitPhaseCompleted) {
      const preOrderCheckHooks = tView.preOrderCheckHooks;
      if (preOrderCheckHooks !== null) {
        executeCheckHooks(lView, preOrderCheckHooks, index);
      }
    } else {
      const preOrderHooks = tView.preOrderHooks;
      if (preOrderHooks !== null) {
        executeInitAndCheckHooks(lView, preOrderHooks, 0, index);
      }
    }
  }
  setSelectedIndex(index);
}
function createInjector(defType, parent = null, additionalProviders = null, name) {
  const injector = createInjectorWithoutInjectorInstances(defType, parent, additionalProviders, name);
  injector.resolveInjectorInitializers();
  return injector;
}
function createInjectorWithoutInjectorInstances(defType, parent = null, additionalProviders = null, name, scopes = /* @__PURE__ */ new Set()) {
  const providers = [additionalProviders || EMPTY_ARRAY$1, importProvidersFrom(defType)];
  name = name || (typeof defType === "object" ? void 0 : stringify$1(defType));
  return new R3Injector(providers, parent || getNullInjector(), name || null, scopes);
}
let Injector = /* @__PURE__ */ (() => {
  let Injector2 = /* @__PURE__ */ (() => {
    class Injector3 {
      static create(options, parent) {
        var _a;
        if (Array.isArray(options)) {
          return createInjector({
            name: ""
          }, parent, options, "");
        } else {
          const name = (_a = options.name) !== null && _a !== void 0 ? _a : "";
          return createInjector({
            name
          }, options.parent, options.providers, name);
        }
      }
    }
    Injector3.THROW_IF_NOT_FOUND = THROW_IF_NOT_FOUND;
    Injector3.NULL = /* @__PURE__ */ new NullInjector();
    Injector3.ɵprov = ɵɵdefineInjectable({
      token: Injector3,
      providedIn: "any",
      factory: () => ɵɵinject(INJECTOR)
    });
    Injector3.__NG_ELEMENT_ID__ = -1;
    return Injector3;
  })();
  return Injector2;
})();
function ɵɵdirectiveInject(token, flags = InjectFlags.Default) {
  const lView = getLView();
  if (lView === null) {
    return ɵɵinject(token, flags);
  }
  const tNode = getCurrentTNode();
  return getOrCreateInjectable(tNode, lView, resolveForwardRef(token), flags);
}
function processHostBindingOpCodes(tView, lView) {
  const hostBindingOpCodes = tView.hostBindingOpCodes;
  if (hostBindingOpCodes === null)
    return;
  try {
    for (let i = 0; i < hostBindingOpCodes.length; i++) {
      const opCode = hostBindingOpCodes[i];
      if (opCode < 0) {
        setSelectedIndex(~opCode);
      } else {
        const directiveIdx = opCode;
        const bindingRootIndx = hostBindingOpCodes[++i];
        const hostBindingFn = hostBindingOpCodes[++i];
        setBindingRootForHostBindings(bindingRootIndx, directiveIdx);
        const context = lView[directiveIdx];
        hostBindingFn(2, context);
      }
    }
  } finally {
    setSelectedIndex(-1);
  }
}
function refreshContentQueries(tView, lView) {
  const contentQueries = tView.contentQueries;
  if (contentQueries !== null) {
    for (let i = 0; i < contentQueries.length; i += 2) {
      const queryStartIdx = contentQueries[i];
      const directiveDefIdx = contentQueries[i + 1];
      if (directiveDefIdx !== -1) {
        const directiveDef = tView.data[directiveDefIdx];
        setCurrentQueryIndex(queryStartIdx);
        directiveDef.contentQueries(2, lView[directiveDefIdx], directiveDefIdx);
      }
    }
  }
}
function refreshChildComponents(hostLView, components) {
  for (let i = 0; i < components.length; i++) {
    refreshComponent(hostLView, components[i]);
  }
}
function renderChildComponents(hostLView, components) {
  for (let i = 0; i < components.length; i++) {
    renderComponent(hostLView, components[i]);
  }
}
function createLView(parentLView, tView, context, flags, host, tHostNode, rendererFactory, renderer, sanitizer, injector, embeddedViewInjector) {
  const lView = tView.blueprint.slice();
  lView[HOST] = host;
  lView[FLAGS] = flags | 4 | 64 | 8;
  if (embeddedViewInjector !== null || parentLView && parentLView[FLAGS] & 1024) {
    lView[FLAGS] |= 1024;
  }
  resetPreOrderHookFlags(lView);
  lView[PARENT] = lView[DECLARATION_VIEW] = parentLView;
  lView[CONTEXT] = context;
  lView[RENDERER_FACTORY] = rendererFactory || parentLView && parentLView[RENDERER_FACTORY];
  lView[RENDERER] = renderer || parentLView && parentLView[RENDERER];
  lView[SANITIZER] = sanitizer || parentLView && parentLView[SANITIZER] || null;
  lView[INJECTOR$1] = injector || parentLView && parentLView[INJECTOR$1] || null;
  lView[T_HOST] = tHostNode;
  lView[ID] = getUniqueLViewId();
  lView[EMBEDDED_VIEW_INJECTOR] = embeddedViewInjector;
  lView[DECLARATION_COMPONENT_VIEW] = tView.type == 2 ? parentLView[DECLARATION_COMPONENT_VIEW] : lView;
  return lView;
}
function getOrCreateTNode(tView, index, type, name, attrs) {
  let tNode = tView.data[index];
  if (tNode === null) {
    tNode = createTNodeAtIndex(tView, index, type, name, attrs);
    if (isInI18nBlock()) {
      tNode.flags |= 32;
    }
  } else if (tNode.type & 64) {
    tNode.type = type;
    tNode.value = name;
    tNode.attrs = attrs;
    const parent = getCurrentParentTNode();
    tNode.injectorIndex = parent === null ? -1 : parent.injectorIndex;
  }
  setCurrentTNode(tNode, true);
  return tNode;
}
function createTNodeAtIndex(tView, index, type, name, attrs) {
  const currentTNode = getCurrentTNodePlaceholderOk();
  const isParent = isCurrentTNodeParent();
  const parent = isParent ? currentTNode : currentTNode && currentTNode.parent;
  const tNode = tView.data[index] = createTNode(tView, parent, type, index, name, attrs);
  if (tView.firstChild === null) {
    tView.firstChild = tNode;
  }
  if (currentTNode !== null) {
    if (isParent) {
      if (currentTNode.child == null && tNode.parent !== null) {
        currentTNode.child = tNode;
      }
    } else {
      if (currentTNode.next === null) {
        currentTNode.next = tNode;
      }
    }
  }
  return tNode;
}
function allocExpando(tView, lView, numSlotsToAlloc, initialValue) {
  if (numSlotsToAlloc === 0)
    return -1;
  if (false) {
    assertFirstCreatePass(tView);
    assertSame(tView, lView[TVIEW], "`LView` must be associated with `TView`!");
    assertEqual(tView.data.length, lView.length, "Expecting LView to be same size as TView");
    assertEqual(tView.data.length, tView.blueprint.length, "Expecting Blueprint to be same size as TView");
    assertFirstUpdatePass(tView);
  }
  const allocIdx = lView.length;
  for (let i = 0; i < numSlotsToAlloc; i++) {
    lView.push(initialValue);
    tView.blueprint.push(initialValue);
    tView.data.push(null);
  }
  return allocIdx;
}
function renderView(tView, lView, context) {
  enterView(lView);
  try {
    const viewQuery = tView.viewQuery;
    if (viewQuery !== null) {
      executeViewQueryFn(1, viewQuery, context);
    }
    const templateFn = tView.template;
    if (templateFn !== null) {
      executeTemplate(tView, lView, templateFn, 1, context);
    }
    if (tView.firstCreatePass) {
      tView.firstCreatePass = false;
    }
    if (tView.staticContentQueries) {
      refreshContentQueries(tView, lView);
    }
    if (tView.staticViewQueries) {
      executeViewQueryFn(2, tView.viewQuery, context);
    }
    const components = tView.components;
    if (components !== null) {
      renderChildComponents(lView, components);
    }
  } catch (error) {
    if (tView.firstCreatePass) {
      tView.incompleteFirstPass = true;
      tView.firstCreatePass = false;
    }
    throw error;
  } finally {
    lView[FLAGS] &= ~4;
    leaveView();
  }
}
function refreshView(tView, lView, templateFn, context) {
  const flags = lView[FLAGS];
  if ((flags & 128) === 128)
    return;
  enterView(lView);
  const isInCheckNoChangesPass = false;
  try {
    resetPreOrderHookFlags(lView);
    setBindingIndex(tView.bindingStartIndex);
    if (templateFn !== null) {
      executeTemplate(tView, lView, templateFn, 2, context);
    }
    const hooksInitPhaseCompleted = (flags & 3) === 3;
    if (!isInCheckNoChangesPass) {
      if (hooksInitPhaseCompleted) {
        const preOrderCheckHooks = tView.preOrderCheckHooks;
        if (preOrderCheckHooks !== null) {
          executeCheckHooks(lView, preOrderCheckHooks, null);
        }
      } else {
        const preOrderHooks = tView.preOrderHooks;
        if (preOrderHooks !== null) {
          executeInitAndCheckHooks(lView, preOrderHooks, 0, null);
        }
        incrementInitPhaseFlags(
          lView,
          0
          /* InitPhaseState.OnInitHooksToBeRun */
        );
      }
    }
    markTransplantedViewsForRefresh(lView);
    refreshEmbeddedViews(lView);
    if (tView.contentQueries !== null) {
      refreshContentQueries(tView, lView);
    }
    if (!isInCheckNoChangesPass) {
      if (hooksInitPhaseCompleted) {
        const contentCheckHooks = tView.contentCheckHooks;
        if (contentCheckHooks !== null) {
          executeCheckHooks(lView, contentCheckHooks);
        }
      } else {
        const contentHooks = tView.contentHooks;
        if (contentHooks !== null) {
          executeInitAndCheckHooks(
            lView,
            contentHooks,
            1
            /* InitPhaseState.AfterContentInitHooksToBeRun */
          );
        }
        incrementInitPhaseFlags(
          lView,
          1
          /* InitPhaseState.AfterContentInitHooksToBeRun */
        );
      }
    }
    processHostBindingOpCodes(tView, lView);
    const components = tView.components;
    if (components !== null) {
      refreshChildComponents(lView, components);
    }
    const viewQuery = tView.viewQuery;
    if (viewQuery !== null) {
      executeViewQueryFn(2, viewQuery, context);
    }
    if (!isInCheckNoChangesPass) {
      if (hooksInitPhaseCompleted) {
        const viewCheckHooks = tView.viewCheckHooks;
        if (viewCheckHooks !== null) {
          executeCheckHooks(lView, viewCheckHooks);
        }
      } else {
        const viewHooks = tView.viewHooks;
        if (viewHooks !== null) {
          executeInitAndCheckHooks(
            lView,
            viewHooks,
            2
            /* InitPhaseState.AfterViewInitHooksToBeRun */
          );
        }
        incrementInitPhaseFlags(
          lView,
          2
          /* InitPhaseState.AfterViewInitHooksToBeRun */
        );
      }
    }
    if (tView.firstUpdatePass === true) {
      tView.firstUpdatePass = false;
    }
    if (!isInCheckNoChangesPass) {
      lView[FLAGS] &= ~(32 | 8);
    }
    if (lView[FLAGS] & 512) {
      lView[FLAGS] &= ~512;
      updateTransplantedViewCount(lView[PARENT], -1);
    }
  } finally {
    leaveView();
  }
}
function executeTemplate(tView, lView, templateFn, rf, context) {
  const prevSelectedIndex = getSelectedIndex();
  const isUpdatePhase = rf & 2;
  try {
    setSelectedIndex(-1);
    if (isUpdatePhase && lView.length > HEADER_OFFSET) {
      selectIndexInternal(tView, lView, HEADER_OFFSET, false);
    }
    const preHookType = isUpdatePhase ? 2 : 0;
    profiler(preHookType, context);
    templateFn(rf, context);
  } finally {
    setSelectedIndex(prevSelectedIndex);
    const postHookType = isUpdatePhase ? 3 : 1;
    profiler(postHookType, context);
  }
}
function executeContentQueries(tView, tNode, lView) {
  if (isContentQueryHost(tNode)) {
    const start = tNode.directiveStart;
    const end = tNode.directiveEnd;
    for (let directiveIndex = start; directiveIndex < end; directiveIndex++) {
      const def = tView.data[directiveIndex];
      if (def.contentQueries) {
        def.contentQueries(1, lView[directiveIndex], directiveIndex);
      }
    }
  }
}
function createDirectivesInstances(tView, lView, tNode) {
  instantiateAllDirectives(tView, lView, tNode, getNativeByTNode(tNode, lView));
  if ((tNode.flags & 64) === 64) {
    invokeDirectivesHostBindings(tView, lView, tNode);
  }
}
function saveResolvedLocalsInData(viewData, tNode, localRefExtractor = getNativeByTNode) {
  const localNames = tNode.localNames;
  if (localNames !== null) {
    let localIndex = tNode.index + 1;
    for (let i = 0; i < localNames.length; i += 2) {
      const index = localNames[i + 1];
      const value = index === -1 ? localRefExtractor(tNode, viewData) : viewData[index];
      viewData[localIndex++] = value;
    }
  }
}
function getOrCreateComponentTView(def) {
  const tView = def.tView;
  if (tView === null || tView.incompleteFirstPass) {
    const declTNode = null;
    return def.tView = createTView(1, declTNode, def.template, def.decls, def.vars, def.directiveDefs, def.pipeDefs, def.viewQuery, def.schemas, def.consts);
  }
  return tView;
}
function createTView(type, declTNode, templateFn, decls, vars, directives, pipes, viewQuery, schemas, constsOrFactory) {
  const bindingStartIndex = HEADER_OFFSET + decls;
  const initialViewLength = bindingStartIndex + vars;
  const blueprint = createViewBlueprint(bindingStartIndex, initialViewLength);
  const consts = typeof constsOrFactory === "function" ? constsOrFactory() : constsOrFactory;
  const tView = blueprint[TVIEW] = {
    type,
    blueprint,
    template: templateFn,
    queries: null,
    viewQuery,
    declTNode,
    data: blueprint.slice().fill(null, bindingStartIndex),
    bindingStartIndex,
    expandoStartIndex: initialViewLength,
    hostBindingOpCodes: null,
    firstCreatePass: true,
    firstUpdatePass: true,
    staticViewQueries: false,
    staticContentQueries: false,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof directives === "function" ? directives() : directives,
    pipeRegistry: typeof pipes === "function" ? pipes() : pipes,
    firstChild: null,
    schemas,
    consts,
    incompleteFirstPass: false
  };
  if (false) {
    Object.seal(tView);
  }
  return tView;
}
function createViewBlueprint(bindingStartIndex, initialViewLength) {
  const blueprint = [];
  for (let i = 0; i < initialViewLength; i++) {
    blueprint.push(i < bindingStartIndex ? null : NO_CHANGE);
  }
  return blueprint;
}
function locateHostElement(renderer, elementOrSelector, encapsulation) {
  const preserveContent = encapsulation === ViewEncapsulation$1.ShadowDom;
  return renderer.selectRootElement(elementOrSelector, preserveContent);
}
function storeCleanupWithContext(tView, lView, context, cleanupFn) {
  const lCleanup = getOrCreateLViewCleanup(lView);
  if (context === null) {
    if (false) {
      Object.freeze(getOrCreateTViewCleanup(tView));
    }
    lCleanup.push(cleanupFn);
  } else {
    lCleanup.push(context);
    if (tView.firstCreatePass) {
      getOrCreateTViewCleanup(tView).push(cleanupFn, lCleanup.length - 1);
    }
  }
}
function createTNode(tView, tParent, type, index, value, attrs) {
  let injectorIndex = tParent ? tParent.injectorIndex : -1;
  const tNode = {
    type,
    index,
    insertBeforeIndex: null,
    injectorIndex,
    directiveStart: -1,
    directiveEnd: -1,
    directiveStylingLast: -1,
    componentOffset: -1,
    propertyBindings: null,
    flags: 0,
    providerIndexes: 0,
    value,
    attrs,
    mergedAttrs: null,
    localNames: null,
    initialInputs: void 0,
    inputs: null,
    outputs: null,
    tViews: null,
    next: null,
    projectionNext: null,
    child: null,
    parent: tParent,
    projection: null,
    styles: null,
    stylesWithoutHost: null,
    residualStyles: void 0,
    classes: null,
    classesWithoutHost: null,
    residualClasses: void 0,
    classBindings: 0,
    styleBindings: 0
  };
  if (false) {
    Object.seal(tNode);
  }
  return tNode;
}
function generatePropertyAliases(aliasMap, directiveIndex, propertyAliases, hostDirectiveAliasMap) {
  for (let publicName in aliasMap) {
    if (aliasMap.hasOwnProperty(publicName)) {
      propertyAliases = propertyAliases === null ? {} : propertyAliases;
      const internalName = aliasMap[publicName];
      if (hostDirectiveAliasMap === null) {
        addPropertyAlias(propertyAliases, directiveIndex, publicName, internalName);
      } else if (hostDirectiveAliasMap.hasOwnProperty(publicName)) {
        addPropertyAlias(propertyAliases, directiveIndex, hostDirectiveAliasMap[publicName], internalName);
      }
    }
  }
  return propertyAliases;
}
function addPropertyAlias(propertyAliases, directiveIndex, publicName, internalName) {
  if (propertyAliases.hasOwnProperty(publicName)) {
    propertyAliases[publicName].push(directiveIndex, internalName);
  } else {
    propertyAliases[publicName] = [directiveIndex, internalName];
  }
}
function initializeInputAndOutputAliases(tView, tNode, hostDirectiveDefinitionMap) {
  const start = tNode.directiveStart;
  const end = tNode.directiveEnd;
  const tViewData = tView.data;
  const tNodeAttrs = tNode.attrs;
  const inputsFromAttrs = [];
  let inputsStore = null;
  let outputsStore = null;
  for (let directiveIndex = start; directiveIndex < end; directiveIndex++) {
    const directiveDef = tViewData[directiveIndex];
    const aliasData = hostDirectiveDefinitionMap ? hostDirectiveDefinitionMap.get(directiveDef) : null;
    const aliasedInputs = aliasData ? aliasData.inputs : null;
    const aliasedOutputs = aliasData ? aliasData.outputs : null;
    inputsStore = generatePropertyAliases(directiveDef.inputs, directiveIndex, inputsStore, aliasedInputs);
    outputsStore = generatePropertyAliases(directiveDef.outputs, directiveIndex, outputsStore, aliasedOutputs);
    const initialInputs = inputsStore !== null && tNodeAttrs !== null && !isInlineTemplate(tNode) ? generateInitialInputs(inputsStore, directiveIndex, tNodeAttrs) : null;
    inputsFromAttrs.push(initialInputs);
  }
  if (inputsStore !== null) {
    if (inputsStore.hasOwnProperty("class")) {
      tNode.flags |= 8;
    }
    if (inputsStore.hasOwnProperty("style")) {
      tNode.flags |= 16;
    }
  }
  tNode.initialInputs = inputsFromAttrs;
  tNode.inputs = inputsStore;
  tNode.outputs = outputsStore;
}
function mapPropName(name) {
  if (name === "class")
    return "className";
  if (name === "for")
    return "htmlFor";
  if (name === "formaction")
    return "formAction";
  if (name === "innerHtml")
    return "innerHTML";
  if (name === "readonly")
    return "readOnly";
  if (name === "tabindex")
    return "tabIndex";
  return name;
}
function elementPropertyInternal(tView, tNode, lView, propName, value, renderer, sanitizer, nativeOnly) {
  const element = getNativeByTNode(tNode, lView);
  let inputData = tNode.inputs;
  let dataValue;
  if (!nativeOnly && inputData != null && (dataValue = inputData[propName])) {
    setInputsForProperty(tView, lView, dataValue, propName, value);
    if (isComponentHost(tNode))
      markDirtyIfOnPush(lView, tNode.index);
    if (false) {
      setNgReflectProperties(lView, element, tNode.type, dataValue, value);
    }
  } else if (tNode.type & 3) {
    propName = mapPropName(propName);
    if (false) {
      validateAgainstEventProperties(propName);
      if (!isPropertyValid(element, propName, tNode.value, tView.schemas)) {
        handleUnknownPropertyError(propName, tNode.value, tNode.type, lView);
      }
      false.rendererSetProperty++;
    }
    value = sanitizer != null ? sanitizer(value, tNode.value || "", propName) : value;
    renderer.setProperty(element, propName, value);
  } else if (tNode.type & 12) {
    if (false) {
      handleUnknownPropertyError(propName, tNode.value, tNode.type, lView);
    }
  }
}
function markDirtyIfOnPush(lView, viewIndex) {
  const childComponentLView = getComponentLViewByIndex(viewIndex, lView);
  if (!(childComponentLView[FLAGS] & 16)) {
    childComponentLView[FLAGS] |= 32;
  }
}
function setNgReflectProperty(lView, element, type, attrName, value) {
  const renderer = lView[RENDERER];
  attrName = normalizeDebugBindingName(attrName);
  const debugValue = normalizeDebugBindingValue(value);
  if (type & 3) {
    if (value == null) {
      renderer.removeAttribute(element, attrName);
    } else {
      renderer.setAttribute(element, attrName, debugValue);
    }
  } else {
    const textContent = escapeCommentText(`bindings=${JSON.stringify({
      [attrName]: debugValue
    }, null, 2)}`);
    renderer.setValue(element, textContent);
  }
}
function setNgReflectProperties(lView, element, type, dataValue, value) {
  if (type & (3 | 4)) {
    for (let i = 0; i < dataValue.length; i += 2) {
      setNgReflectProperty(lView, element, type, dataValue[i + 1], value);
    }
  }
}
function resolveDirectives(tView, lView, tNode, localRefs) {
  let hasDirectives = false;
  {
    const exportsMap = localRefs === null ? null : {
      "": -1
    };
    const matchResult = findDirectiveDefMatches(tView, tNode);
    let directiveDefs;
    let hostDirectiveDefs;
    if (matchResult === null) {
      directiveDefs = hostDirectiveDefs = null;
    } else {
      [directiveDefs, hostDirectiveDefs] = matchResult;
    }
    if (directiveDefs !== null) {
      hasDirectives = true;
      initializeDirectives(tView, lView, tNode, directiveDefs, exportsMap, hostDirectiveDefs);
    }
    if (exportsMap)
      cacheMatchingLocalNames(tNode, localRefs, exportsMap);
  }
  tNode.mergedAttrs = mergeHostAttrs(tNode.mergedAttrs, tNode.attrs);
  return hasDirectives;
}
function initializeDirectives(tView, lView, tNode, directives, exportsMap, hostDirectiveDefs) {
  for (let i = 0; i < directives.length; i++) {
    diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, lView), tView, directives[i].type);
  }
  initTNodeFlags(tNode, tView.data.length, directives.length);
  for (let i = 0; i < directives.length; i++) {
    const def = directives[i];
    if (def.providersResolver)
      def.providersResolver(def);
  }
  let preOrderHooksFound = false;
  let preOrderCheckHooksFound = false;
  let directiveIdx = allocExpando(tView, lView, directives.length, null);
  for (let i = 0; i < directives.length; i++) {
    const def = directives[i];
    tNode.mergedAttrs = mergeHostAttrs(tNode.mergedAttrs, def.hostAttrs);
    configureViewWithDirective(tView, tNode, lView, directiveIdx, def);
    saveNameToExportMap(directiveIdx, def, exportsMap);
    if (def.contentQueries !== null)
      tNode.flags |= 4;
    if (def.hostBindings !== null || def.hostAttrs !== null || def.hostVars !== 0)
      tNode.flags |= 64;
    const lifeCycleHooks = def.type.prototype;
    if (!preOrderHooksFound && (lifeCycleHooks.ngOnChanges || lifeCycleHooks.ngOnInit || lifeCycleHooks.ngDoCheck)) {
      (tView.preOrderHooks || (tView.preOrderHooks = [])).push(tNode.index);
      preOrderHooksFound = true;
    }
    if (!preOrderCheckHooksFound && (lifeCycleHooks.ngOnChanges || lifeCycleHooks.ngDoCheck)) {
      (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(tNode.index);
      preOrderCheckHooksFound = true;
    }
    directiveIdx++;
  }
  initializeInputAndOutputAliases(tView, tNode, hostDirectiveDefs);
}
function registerHostBindingOpCodes(tView, tNode, directiveIdx, directiveVarsIdx, def) {
  const hostBindings = def.hostBindings;
  if (hostBindings) {
    let hostBindingOpCodes = tView.hostBindingOpCodes;
    if (hostBindingOpCodes === null) {
      hostBindingOpCodes = tView.hostBindingOpCodes = [];
    }
    const elementIndx = ~tNode.index;
    if (lastSelectedElementIdx(hostBindingOpCodes) != elementIndx) {
      hostBindingOpCodes.push(elementIndx);
    }
    hostBindingOpCodes.push(directiveIdx, directiveVarsIdx, hostBindings);
  }
}
function lastSelectedElementIdx(hostBindingOpCodes) {
  let i = hostBindingOpCodes.length;
  while (i > 0) {
    const value = hostBindingOpCodes[--i];
    if (typeof value === "number" && value < 0) {
      return value;
    }
  }
  return 0;
}
function instantiateAllDirectives(tView, lView, tNode, native) {
  const start = tNode.directiveStart;
  const end = tNode.directiveEnd;
  if (isComponentHost(tNode)) {
    addComponentLogic(lView, tNode, tView.data[start + tNode.componentOffset]);
  }
  if (!tView.firstCreatePass) {
    getOrCreateNodeInjectorForNode(tNode, lView);
  }
  attachPatchData(native, lView);
  const initialInputs = tNode.initialInputs;
  for (let i = start; i < end; i++) {
    const def = tView.data[i];
    const directive = getNodeInjectable(lView, tView, i, tNode);
    attachPatchData(directive, lView);
    if (initialInputs !== null) {
      setInputsFromAttrs(lView, i - start, directive, def, tNode, initialInputs);
    }
    if (isComponentDef(def)) {
      const componentView = getComponentLViewByIndex(tNode.index, lView);
      componentView[CONTEXT] = getNodeInjectable(lView, tView, i, tNode);
    }
  }
}
function invokeDirectivesHostBindings(tView, lView, tNode) {
  const start = tNode.directiveStart;
  const end = tNode.directiveEnd;
  const elementIndex = tNode.index;
  const currentDirectiveIndex = getCurrentDirectiveIndex();
  try {
    setSelectedIndex(elementIndex);
    for (let dirIndex = start; dirIndex < end; dirIndex++) {
      const def = tView.data[dirIndex];
      const directive = lView[dirIndex];
      setCurrentDirectiveIndex(dirIndex);
      if (def.hostBindings !== null || def.hostVars !== 0 || def.hostAttrs !== null) {
        invokeHostBindingsInCreationMode(def, directive);
      }
    }
  } finally {
    setSelectedIndex(-1);
    setCurrentDirectiveIndex(currentDirectiveIndex);
  }
}
function invokeHostBindingsInCreationMode(def, directive) {
  if (def.hostBindings !== null) {
    def.hostBindings(1, directive);
  }
}
function findDirectiveDefMatches(tView, tNode) {
  var _a;
  const registry = tView.directiveRegistry;
  let matches = null;
  let hostDirectiveDefs = null;
  if (registry) {
    for (let i = 0; i < registry.length; i++) {
      const def = registry[i];
      if (isNodeMatchingSelectorList(
        tNode,
        def.selectors,
        /* isProjectionMode */
        false
      )) {
        matches || (matches = []);
        if (isComponentDef(def)) {
          if (false) {
            assertTNodeType(tNode, 2, `"${tNode.value}" tags cannot be used as component hosts. Please use a different tag to activate the ${stringify$1(def.type)} component.`);
            if (isComponentHost(tNode)) {
              throwMultipleComponentError(tNode, matches.find(isComponentDef).type, def.type);
            }
          }
          if (def.findHostDirectiveDefs !== null) {
            const hostDirectiveMatches = [];
            hostDirectiveDefs = hostDirectiveDefs || /* @__PURE__ */ new Map();
            def.findHostDirectiveDefs(def, hostDirectiveMatches, hostDirectiveDefs);
            matches.unshift(...hostDirectiveMatches, def);
            const componentOffset = hostDirectiveMatches.length;
            markAsComponentHost(tView, tNode, componentOffset);
          } else {
            matches.unshift(def);
            markAsComponentHost(tView, tNode, 0);
          }
        } else {
          hostDirectiveDefs = hostDirectiveDefs || /* @__PURE__ */ new Map();
          (_a = def.findHostDirectiveDefs) === null || _a === void 0 ? void 0 : _a.call(def, def, matches, hostDirectiveDefs);
          matches.push(def);
        }
      }
    }
  }
  return matches === null ? null : [matches, hostDirectiveDefs];
}
function markAsComponentHost(tView, hostTNode, componentOffset) {
  hostTNode.componentOffset = componentOffset;
  (tView.components || (tView.components = [])).push(hostTNode.index);
}
function cacheMatchingLocalNames(tNode, localRefs, exportsMap) {
  if (localRefs) {
    const localNames = tNode.localNames = [];
    for (let i = 0; i < localRefs.length; i += 2) {
      const index = exportsMap[localRefs[i + 1]];
      if (index == null)
        throw new RuntimeError(-301, false);
      localNames.push(localRefs[i], index);
    }
  }
}
function saveNameToExportMap(directiveIdx, def, exportsMap) {
  if (exportsMap) {
    if (def.exportAs) {
      for (let i = 0; i < def.exportAs.length; i++) {
        exportsMap[def.exportAs[i]] = directiveIdx;
      }
    }
    if (isComponentDef(def))
      exportsMap[""] = directiveIdx;
  }
}
function initTNodeFlags(tNode, index, numberOfDirectives) {
  tNode.flags |= 1;
  tNode.directiveStart = index;
  tNode.directiveEnd = index + numberOfDirectives;
  tNode.providerIndexes = index;
}
function configureViewWithDirective(tView, tNode, lView, directiveIndex, def) {
  tView.data[directiveIndex] = def;
  const directiveFactory = def.factory || (def.factory = getFactoryDef(def.type, true));
  const nodeInjectorFactory = new NodeInjectorFactory(directiveFactory, isComponentDef(def), ɵɵdirectiveInject);
  tView.blueprint[directiveIndex] = nodeInjectorFactory;
  lView[directiveIndex] = nodeInjectorFactory;
  registerHostBindingOpCodes(tView, tNode, directiveIndex, allocExpando(tView, lView, def.hostVars, NO_CHANGE), def);
}
function addComponentLogic(lView, hostTNode, def) {
  const native = getNativeByTNode(hostTNode, lView);
  const tView = getOrCreateComponentTView(def);
  const rendererFactory = lView[RENDERER_FACTORY];
  const componentView = addToViewTree(lView, createLView(lView, tView, null, def.onPush ? 32 : 16, native, hostTNode, rendererFactory, rendererFactory.createRenderer(native, def), null, null, null));
  lView[hostTNode.index] = componentView;
}
function elementAttributeInternal(tNode, lView, name, value, sanitizer, namespace) {
  if (false) {
    assertNotSame(value, NO_CHANGE, "Incoming value should never be NO_CHANGE.");
    validateAgainstEventAttributes(name);
    assertTNodeType(tNode, 2, `Attempted to set attribute \`${name}\` on a container node. Host bindings are not valid on ng-container or ng-template.`);
  }
  const element = getNativeByTNode(tNode, lView);
  setElementAttribute(lView[RENDERER], element, namespace, tNode.value, name, value, sanitizer);
}
function setElementAttribute(renderer, element, namespace, tagName, name, value, sanitizer) {
  if (value == null) {
    renderer.removeAttribute(element, name, namespace);
  } else {
    const strValue = sanitizer == null ? renderStringify(value) : sanitizer(value, tagName || "", name);
    renderer.setAttribute(element, name, strValue, namespace);
  }
}
function setInputsFromAttrs(lView, directiveIndex, instance, def, tNode, initialInputData) {
  const initialInputs = initialInputData[directiveIndex];
  if (initialInputs !== null) {
    const setInput = def.setInput;
    for (let i = 0; i < initialInputs.length; ) {
      const publicName = initialInputs[i++];
      const privateName = initialInputs[i++];
      const value = initialInputs[i++];
      if (setInput !== null) {
        def.setInput(instance, value, publicName, privateName);
      } else {
        instance[privateName] = value;
      }
      if (false) {
        const nativeElement = getNativeByTNode(tNode, lView);
        setNgReflectProperty(lView, nativeElement, tNode.type, privateName, value);
      }
    }
  }
}
function generateInitialInputs(inputs, directiveIndex, attrs) {
  let inputsToStore = null;
  let i = 0;
  while (i < attrs.length) {
    const attrName = attrs[i];
    if (attrName === 0) {
      i += 4;
      continue;
    } else if (attrName === 5) {
      i += 2;
      continue;
    }
    if (typeof attrName === "number")
      break;
    if (inputs.hasOwnProperty(attrName)) {
      if (inputsToStore === null)
        inputsToStore = [];
      const inputConfig = inputs[attrName];
      for (let j = 0; j < inputConfig.length; j += 2) {
        if (inputConfig[j] === directiveIndex) {
          inputsToStore.push(attrName, inputConfig[j + 1], attrs[i + 1]);
          break;
        }
      }
    }
    i += 2;
  }
  return inputsToStore;
}
function createLContainer(hostNative, currentView, native, tNode) {
  const lContainer = [
    hostNative,
    true,
    false,
    currentView,
    null,
    0,
    tNode,
    native,
    null,
    null
    // moved views
  ];
  return lContainer;
}
function refreshEmbeddedViews(lView) {
  for (let lContainer = getFirstLContainer(lView); lContainer !== null; lContainer = getNextLContainer(lContainer)) {
    for (let i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
      const embeddedLView = lContainer[i];
      const embeddedTView = embeddedLView[TVIEW];
      if (viewAttachedToChangeDetector(embeddedLView)) {
        refreshView(embeddedTView, embeddedLView, embeddedTView.template, embeddedLView[CONTEXT]);
      }
    }
  }
}
function markTransplantedViewsForRefresh(lView) {
  for (let lContainer = getFirstLContainer(lView); lContainer !== null; lContainer = getNextLContainer(lContainer)) {
    if (!lContainer[HAS_TRANSPLANTED_VIEWS])
      continue;
    const movedViews = lContainer[MOVED_VIEWS];
    for (let i = 0; i < movedViews.length; i++) {
      const movedLView = movedViews[i];
      const insertionLContainer = movedLView[PARENT];
      if ((movedLView[FLAGS] & 512) === 0) {
        updateTransplantedViewCount(insertionLContainer, 1);
      }
      movedLView[FLAGS] |= 512;
    }
  }
}
function refreshComponent(hostLView, componentHostIdx) {
  const componentView = getComponentLViewByIndex(componentHostIdx, hostLView);
  if (viewAttachedToChangeDetector(componentView)) {
    const tView = componentView[TVIEW];
    if (componentView[FLAGS] & (16 | 32)) {
      refreshView(tView, componentView, tView.template, componentView[CONTEXT]);
    } else if (componentView[TRANSPLANTED_VIEWS_TO_REFRESH] > 0) {
      refreshContainsDirtyView(componentView);
    }
  }
}
function refreshContainsDirtyView(lView) {
  for (let lContainer = getFirstLContainer(lView); lContainer !== null; lContainer = getNextLContainer(lContainer)) {
    for (let i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
      const embeddedLView = lContainer[i];
      if (viewAttachedToChangeDetector(embeddedLView)) {
        if (embeddedLView[FLAGS] & 512) {
          const embeddedTView = embeddedLView[TVIEW];
          refreshView(embeddedTView, embeddedLView, embeddedTView.template, embeddedLView[CONTEXT]);
        } else if (embeddedLView[TRANSPLANTED_VIEWS_TO_REFRESH] > 0) {
          refreshContainsDirtyView(embeddedLView);
        }
      }
    }
  }
  const tView = lView[TVIEW];
  const components = tView.components;
  if (components !== null) {
    for (let i = 0; i < components.length; i++) {
      const componentView = getComponentLViewByIndex(components[i], lView);
      if (viewAttachedToChangeDetector(componentView) && componentView[TRANSPLANTED_VIEWS_TO_REFRESH] > 0) {
        refreshContainsDirtyView(componentView);
      }
    }
  }
}
function renderComponent(hostLView, componentHostIdx) {
  const componentView = getComponentLViewByIndex(componentHostIdx, hostLView);
  const componentTView = componentView[TVIEW];
  syncViewWithBlueprint(componentTView, componentView);
  renderView(componentTView, componentView, componentView[CONTEXT]);
}
function syncViewWithBlueprint(tView, lView) {
  for (let i = lView.length; i < tView.blueprint.length; i++) {
    lView.push(tView.blueprint[i]);
  }
}
function addToViewTree(lView, lViewOrLContainer) {
  if (lView[CHILD_HEAD]) {
    lView[CHILD_TAIL][NEXT] = lViewOrLContainer;
  } else {
    lView[CHILD_HEAD] = lViewOrLContainer;
  }
  lView[CHILD_TAIL] = lViewOrLContainer;
  return lViewOrLContainer;
}
function markViewDirty(lView) {
  while (lView) {
    lView[FLAGS] |= 32;
    const parent = getLViewParent(lView);
    if (isRootView(lView) && !parent) {
      return lView;
    }
    lView = parent;
  }
  return null;
}
function detectChangesInternal(tView, lView, context, notifyErrorHandler = true) {
  const rendererFactory = lView[RENDERER_FACTORY];
  const checkNoChangesMode = false;
  if (!checkNoChangesMode && rendererFactory.begin)
    rendererFactory.begin();
  try {
    refreshView(tView, lView, tView.template, context);
  } catch (error) {
    if (notifyErrorHandler) {
      handleError(lView, error);
    }
    throw error;
  } finally {
    if (!checkNoChangesMode && rendererFactory.end)
      rendererFactory.end();
  }
}
function checkNoChangesInternal(tView, lView, context, notifyErrorHandler = true) {
  setIsInCheckNoChangesMode(true);
  try {
    detectChangesInternal(tView, lView, context, notifyErrorHandler);
  } finally {
    setIsInCheckNoChangesMode(false);
  }
}
function executeViewQueryFn(flags, viewQueryFn, component) {
  setCurrentQueryIndex(0);
  viewQueryFn(flags, component);
}
function storePropertyBindingMetadata(tData, tNode, propertyName, bindingIndex, ...interpolationParts) {
  if (tData[bindingIndex] === null) {
    if (tNode.inputs == null || !tNode.inputs[propertyName]) {
      const propBindingIdxs = tNode.propertyBindings || (tNode.propertyBindings = []);
      propBindingIdxs.push(bindingIndex);
      let bindingMetadata = propertyName;
      if (interpolationParts.length > 0) {
        bindingMetadata += INTERPOLATION_DELIMITER + interpolationParts.join(INTERPOLATION_DELIMITER);
      }
      tData[bindingIndex] = bindingMetadata;
    }
  }
}
function getOrCreateLViewCleanup(view) {
  return view[CLEANUP] || (view[CLEANUP] = []);
}
function getOrCreateTViewCleanup(tView) {
  return tView.cleanup || (tView.cleanup = []);
}
function handleError(lView, error) {
  const injector = lView[INJECTOR$1];
  const errorHandler2 = injector ? injector.get(ErrorHandler, null) : null;
  errorHandler2 && errorHandler2.handleError(error);
}
function setInputsForProperty(tView, lView, inputs, publicName, value) {
  for (let i = 0; i < inputs.length; ) {
    const index = inputs[i++];
    const privateName = inputs[i++];
    const instance = lView[index];
    const def = tView.data[index];
    if (def.setInput !== null) {
      def.setInput(instance, value, publicName, privateName);
    } else {
      instance[privateName] = value;
    }
  }
}
function textBindingInternal(lView, index, value) {
  const element = getNativeByIndex(index, lView);
  updateTextNode(lView[RENDERER], element, value);
}
function computeStaticStyling(tNode, attrs, writeToHost) {
  let styles = writeToHost ? tNode.styles : null;
  let classes = writeToHost ? tNode.classes : null;
  let mode = 0;
  if (attrs !== null) {
    for (let i = 0; i < attrs.length; i++) {
      const value = attrs[i];
      if (typeof value === "number") {
        mode = value;
      } else if (mode == 1) {
        classes = concatStringsWithSpace(classes, value);
      } else if (mode == 2) {
        const style2 = value;
        const styleValue = attrs[++i];
        styles = concatStringsWithSpace(styles, style2 + ": " + styleValue + ";");
      }
    }
  }
  writeToHost ? tNode.styles = styles : tNode.stylesWithoutHost = styles;
  writeToHost ? tNode.classes = classes : tNode.classesWithoutHost = classes;
}
function collectNativeNodes(tView, lView, tNode, result, isProjection = false) {
  while (tNode !== null) {
    const lNode = lView[tNode.index];
    if (lNode !== null) {
      result.push(unwrapRNode(lNode));
    }
    if (isLContainer(lNode)) {
      for (let i = CONTAINER_HEADER_OFFSET; i < lNode.length; i++) {
        const lViewInAContainer = lNode[i];
        const lViewFirstChildTNode = lViewInAContainer[TVIEW].firstChild;
        if (lViewFirstChildTNode !== null) {
          collectNativeNodes(lViewInAContainer[TVIEW], lViewInAContainer, lViewFirstChildTNode, result);
        }
      }
    }
    const tNodeType = tNode.type;
    if (tNodeType & 8) {
      collectNativeNodes(tView, lView, tNode.child, result);
    } else if (tNodeType & 32) {
      const nextRNode = icuContainerIterate(tNode, lView);
      let rNode;
      while (rNode = nextRNode()) {
        result.push(rNode);
      }
    } else if (tNodeType & 16) {
      const nodesInSlot = getProjectionNodes(lView, tNode);
      if (Array.isArray(nodesInSlot)) {
        result.push(...nodesInSlot);
      } else {
        const parentView = getLViewParent(lView[DECLARATION_COMPONENT_VIEW]);
        collectNativeNodes(parentView[TVIEW], parentView, nodesInSlot, result, true);
      }
    }
    tNode = isProjection ? tNode.projectionNext : tNode.next;
  }
  return result;
}
class ViewRef$1 {
  get rootNodes() {
    const lView = this._lView;
    const tView = lView[TVIEW];
    return collectNativeNodes(tView, lView, tView.firstChild, []);
  }
  constructor(_lView, _cdRefInjectingView) {
    this._lView = _lView;
    this._cdRefInjectingView = _cdRefInjectingView;
    this._appRef = null;
    this._attachedToViewContainer = false;
  }
  get context() {
    return this._lView[CONTEXT];
  }
  set context(value) {
    this._lView[CONTEXT] = value;
  }
  get destroyed() {
    return (this._lView[FLAGS] & 128) === 128;
  }
  destroy() {
    if (this._appRef) {
      this._appRef.detachView(this);
    } else if (this._attachedToViewContainer) {
      const parent = this._lView[PARENT];
      if (isLContainer(parent)) {
        const viewRefs = parent[VIEW_REFS];
        const index = viewRefs ? viewRefs.indexOf(this) : -1;
        if (index > -1) {
          detachView(parent, index);
          removeFromArray(viewRefs, index);
        }
      }
      this._attachedToViewContainer = false;
    }
    destroyLView(this._lView[TVIEW], this._lView);
  }
  onDestroy(callback) {
    storeCleanupWithContext(this._lView[TVIEW], this._lView, null, callback);
  }
  /**
   * Marks a view and all of its ancestors dirty.
   *
   * This can be used to ensure an {@link ChangeDetectionStrategy#OnPush OnPush} component is
   * checked when it needs to be re-rendered but the two normal triggers haven't marked it
   * dirty (i.e. inputs haven't changed and events haven't fired in the view).
   *
   * <!-- TODO: Add a link to a chapter on OnPush components -->
   *
   * @usageNotes
   * ### Example
   *
   * ```typescript
   * @Component({
   *   selector: 'app-root',
   *   template: `Number of ticks: {{numberOfTicks}}`
   *   changeDetection: ChangeDetectionStrategy.OnPush,
   * })
   * class AppComponent {
   *   numberOfTicks = 0;
   *
   *   constructor(private ref: ChangeDetectorRef) {
   *     setInterval(() => {
   *       this.numberOfTicks++;
   *       // the following is required, otherwise the view will not be updated
   *       this.ref.markForCheck();
   *     }, 1000);
   *   }
   * }
   * ```
   */
  markForCheck() {
    markViewDirty(this._cdRefInjectingView || this._lView);
  }
  /**
   * Detaches the view from the change detection tree.
   *
   * Detached views will not be checked during change detection runs until they are
   * re-attached, even if they are dirty. `detach` can be used in combination with
   * {@link ChangeDetectorRef#detectChanges detectChanges} to implement local change
   * detection checks.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example defines a component with a large list of readonly data.
   * Imagine the data changes constantly, many times per second. For performance reasons,
   * we want to check and update the list every five seconds. We can do that by detaching
   * the component's change detector and doing a local check every five seconds.
   *
   * ```typescript
   * class DataProvider {
   *   // in a real application the returned data will be different every time
   *   get data() {
   *     return [1,2,3,4,5];
   *   }
   * }
   *
   * @Component({
   *   selector: 'giant-list',
   *   template: `
   *     <li *ngFor="let d of dataProvider.data">Data {{d}}</li>
   *   `,
   * })
   * class GiantList {
   *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
   *     ref.detach();
   *     setInterval(() => {
   *       this.ref.detectChanges();
   *     }, 5000);
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   providers: [DataProvider],
   *   template: `
   *     <giant-list><giant-list>
   *   `,
   * })
   * class App {
   * }
   * ```
   */
  detach() {
    this._lView[FLAGS] &= ~64;
  }
  /**
   * Re-attaches a view to the change detection tree.
   *
   * This can be used to re-attach views that were previously detached from the tree
   * using {@link ChangeDetectorRef#detach detach}. Views are attached to the tree by default.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example creates a component displaying `live` data. The component will detach
   * its change detector from the main change detector tree when the component's live property
   * is set to false.
   *
   * ```typescript
   * class DataProvider {
   *   data = 1;
   *
   *   constructor() {
   *     setInterval(() => {
   *       this.data = this.data * 2;
   *     }, 500);
   *   }
   * }
   *
   * @Component({
   *   selector: 'live-data',
   *   inputs: ['live'],
   *   template: 'Data: {{dataProvider.data}}'
   * })
   * class LiveData {
   *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {}
   *
   *   set live(value) {
   *     if (value) {
   *       this.ref.reattach();
   *     } else {
   *       this.ref.detach();
   *     }
   *   }
   * }
   *
   * @Component({
   *   selector: 'app-root',
   *   providers: [DataProvider],
   *   template: `
   *     Live Update: <input type="checkbox" [(ngModel)]="live">
   *     <live-data [live]="live"><live-data>
   *   `,
   * })
   * class AppComponent {
   *   live = true;
   * }
   * ```
   */
  reattach() {
    this._lView[FLAGS] |= 64;
  }
  /**
   * Checks the view and its children.
   *
   * This can also be used in combination with {@link ChangeDetectorRef#detach detach} to implement
   * local change detection checks.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example defines a component with a large list of readonly data.
   * Imagine, the data changes constantly, many times per second. For performance reasons,
   * we want to check and update the list every five seconds.
   *
   * We can do that by detaching the component's change detector and doing a local change detection
   * check every five seconds.
   *
   * See {@link ChangeDetectorRef#detach detach} for more information.
   */
  detectChanges() {
    detectChangesInternal(this._lView[TVIEW], this._lView, this.context);
  }
  /**
   * Checks the change detector and its children, and throws if any changes are detected.
   *
   * This is used in development mode to verify that running change detection doesn't
   * introduce other changes.
   */
  checkNoChanges() {
    if (false) {
      checkNoChangesInternal(this._lView[TVIEW], this._lView, this.context);
    }
  }
  attachToViewContainerRef() {
    if (this._appRef) {
      throw new RuntimeError(902, false);
    }
    this._attachedToViewContainer = true;
  }
  detachFromAppRef() {
    this._appRef = null;
    renderDetachView(this._lView[TVIEW], this._lView);
  }
  attachToAppRef(appRef) {
    if (this._attachedToViewContainer) {
      throw new RuntimeError(902, false);
    }
    this._appRef = appRef;
  }
}
class RootViewRef extends ViewRef$1 {
  constructor(_view) {
    super(_view);
    this._view = _view;
  }
  detectChanges() {
    const lView = this._view;
    const tView = lView[TVIEW];
    const context = lView[CONTEXT];
    detectChangesInternal(tView, lView, context, false);
  }
  checkNoChanges() {
    if (false) {
      const lView = this._view;
      const tView = lView[TVIEW];
      const context = lView[CONTEXT];
      checkNoChangesInternal(tView, lView, context, false);
    }
  }
  get context() {
    return null;
  }
}
class ComponentFactoryResolver extends ComponentFactoryResolver$1 {
  /**
   * @param ngModule The NgModuleRef to which all resolved factories are bound.
   */
  constructor(ngModule) {
    super();
    this.ngModule = ngModule;
  }
  resolveComponentFactory(component) {
    const componentDef = getComponentDef(component);
    return new ComponentFactory(componentDef, this.ngModule);
  }
}
function toRefArray(map2) {
  const array = [];
  for (let nonMinified in map2) {
    if (map2.hasOwnProperty(nonMinified)) {
      const minified = map2[nonMinified];
      array.push({
        propName: minified,
        templateName: nonMinified
      });
    }
  }
  return array;
}
function getNamespace(elementName) {
  const name = elementName.toLowerCase();
  return name === "svg" ? SVG_NAMESPACE : name === "math" ? MATH_ML_NAMESPACE : null;
}
class ChainedInjector {
  constructor(injector, parentInjector) {
    this.injector = injector;
    this.parentInjector = parentInjector;
  }
  get(token, notFoundValue, flags) {
    flags = convertToBitFlags(flags);
    const value = this.injector.get(token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, flags);
    if (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR || notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) {
      return value;
    }
    return this.parentInjector.get(token, notFoundValue, flags);
  }
}
class ComponentFactory extends ComponentFactory$1 {
  get inputs() {
    return toRefArray(this.componentDef.inputs);
  }
  get outputs() {
    return toRefArray(this.componentDef.outputs);
  }
  /**
   * @param componentDef The component definition.
   * @param ngModule The NgModuleRef to which the factory is bound.
   */
  constructor(componentDef, ngModule) {
    super();
    this.componentDef = componentDef;
    this.ngModule = ngModule;
    this.componentType = componentDef.type;
    this.selector = stringifyCSSSelectorList(componentDef.selectors);
    this.ngContentSelectors = componentDef.ngContentSelectors ? componentDef.ngContentSelectors : [];
    this.isBoundToModule = !!ngModule;
  }
  create(injector, projectableNodes, rootSelectorOrNode, environmentInjector) {
    environmentInjector = environmentInjector || this.ngModule;
    let realEnvironmentInjector = environmentInjector instanceof EnvironmentInjector ? environmentInjector : environmentInjector === null || environmentInjector === void 0 ? void 0 : environmentInjector.injector;
    if (realEnvironmentInjector && this.componentDef.getStandaloneInjector !== null) {
      realEnvironmentInjector = this.componentDef.getStandaloneInjector(realEnvironmentInjector) || realEnvironmentInjector;
    }
    const rootViewInjector = realEnvironmentInjector ? new ChainedInjector(injector, realEnvironmentInjector) : injector;
    const rendererFactory = rootViewInjector.get(RendererFactory2, null);
    if (rendererFactory === null) {
      throw new RuntimeError(407, false);
    }
    const sanitizer = rootViewInjector.get(Sanitizer, null);
    const hostRenderer = rendererFactory.createRenderer(null, this.componentDef);
    const elementName = this.componentDef.selectors[0][0] || "div";
    const hostRNode = rootSelectorOrNode ? locateHostElement(hostRenderer, rootSelectorOrNode, this.componentDef.encapsulation) : createElementNode(hostRenderer, elementName, getNamespace(elementName));
    const rootFlags = this.componentDef.onPush ? 32 | 256 : 16 | 256;
    const rootTView = createTView(0, null, null, 1, 0, null, null, null, null, null);
    const rootLView = createLView(null, rootTView, null, rootFlags, null, null, rendererFactory, hostRenderer, sanitizer, rootViewInjector, null);
    enterView(rootLView);
    let component;
    let tElementNode;
    try {
      const rootComponentDef = this.componentDef;
      let rootDirectives;
      let hostDirectiveDefs = null;
      if (rootComponentDef.findHostDirectiveDefs) {
        rootDirectives = [];
        hostDirectiveDefs = /* @__PURE__ */ new Map();
        rootComponentDef.findHostDirectiveDefs(rootComponentDef, rootDirectives, hostDirectiveDefs);
        rootDirectives.push(rootComponentDef);
      } else {
        rootDirectives = [rootComponentDef];
      }
      const hostTNode = createRootComponentTNode(rootLView, hostRNode);
      const componentView = createRootComponentView(hostTNode, hostRNode, rootComponentDef, rootDirectives, rootLView, rendererFactory, hostRenderer);
      tElementNode = getTNode(rootTView, HEADER_OFFSET);
      if (hostRNode) {
        setRootNodeAttributes(hostRenderer, rootComponentDef, hostRNode, rootSelectorOrNode);
      }
      if (projectableNodes !== void 0) {
        projectNodes(tElementNode, this.ngContentSelectors, projectableNodes);
      }
      component = createRootComponent(componentView, rootComponentDef, rootDirectives, hostDirectiveDefs, rootLView, [LifecycleHooksFeature]);
      renderView(rootTView, rootLView, null);
    } finally {
      leaveView();
    }
    return new ComponentRef(this.componentType, component, createElementRef(tElementNode, rootLView), rootLView, tElementNode);
  }
}
class ComponentRef extends ComponentRef$1 {
  constructor(componentType, instance, location2, _rootLView, _tNode) {
    super();
    this.location = location2;
    this._rootLView = _rootLView;
    this._tNode = _tNode;
    this.instance = instance;
    this.hostView = this.changeDetectorRef = new RootViewRef(_rootLView);
    this.componentType = componentType;
  }
  setInput(name, value) {
    const inputData = this._tNode.inputs;
    let dataValue;
    if (inputData !== null && (dataValue = inputData[name])) {
      const lView = this._rootLView;
      setInputsForProperty(lView[TVIEW], lView, dataValue, name, value);
      markDirtyIfOnPush(lView, this._tNode.index);
    } else {
      if (false) {
        const cmpNameForError = stringifyForError(this.componentType);
        let message = `Can't set value of the '${name}' input on the '${cmpNameForError}' component. `;
        message += `Make sure that the '${name}' property is annotated with @Input() or a mapped @Input('${name}') exists.`;
        reportUnknownPropertyError(message);
      }
    }
  }
  get injector() {
    return new NodeInjector(this._tNode, this._rootLView);
  }
  destroy() {
    this.hostView.destroy();
  }
  onDestroy(callback) {
    this.hostView.onDestroy(callback);
  }
}
function createRootComponentTNode(lView, rNode) {
  const tView = lView[TVIEW];
  const index = HEADER_OFFSET;
  lView[index] = rNode;
  return getOrCreateTNode(tView, index, 2, "#host", null);
}
function createRootComponentView(tNode, rNode, rootComponentDef, rootDirectives, rootView, rendererFactory, hostRenderer, sanitizer) {
  const tView = rootView[TVIEW];
  applyRootComponentStyling(rootDirectives, tNode, rNode, hostRenderer);
  const viewRenderer = rendererFactory.createRenderer(rNode, rootComponentDef);
  const componentView = createLView(rootView, getOrCreateComponentTView(rootComponentDef), null, rootComponentDef.onPush ? 32 : 16, rootView[tNode.index], tNode, rendererFactory, viewRenderer, sanitizer || null, null, null);
  if (tView.firstCreatePass) {
    markAsComponentHost(tView, tNode, rootDirectives.length - 1);
  }
  addToViewTree(rootView, componentView);
  return rootView[tNode.index] = componentView;
}
function applyRootComponentStyling(rootDirectives, tNode, rNode, hostRenderer) {
  for (const def of rootDirectives) {
    tNode.mergedAttrs = mergeHostAttrs(tNode.mergedAttrs, def.hostAttrs);
  }
  if (tNode.mergedAttrs !== null) {
    computeStaticStyling(tNode, tNode.mergedAttrs, true);
    if (rNode !== null) {
      setupStaticAttributes(hostRenderer, rNode, tNode);
    }
  }
}
function createRootComponent(componentView, rootComponentDef, rootDirectives, hostDirectiveDefs, rootLView, hostFeatures) {
  const rootTNode = getCurrentTNode();
  const tView = rootLView[TVIEW];
  const native = getNativeByTNode(rootTNode, rootLView);
  initializeDirectives(tView, rootLView, rootTNode, rootDirectives, null, hostDirectiveDefs);
  for (let i = 0; i < rootDirectives.length; i++) {
    const directiveIndex = rootTNode.directiveStart + i;
    const directiveInstance = getNodeInjectable(rootLView, tView, directiveIndex, rootTNode);
    attachPatchData(directiveInstance, rootLView);
  }
  invokeDirectivesHostBindings(tView, rootLView, rootTNode);
  if (native) {
    attachPatchData(native, rootLView);
  }
  const component = getNodeInjectable(rootLView, tView, rootTNode.directiveStart + rootTNode.componentOffset, rootTNode);
  componentView[CONTEXT] = rootLView[CONTEXT] = component;
  if (hostFeatures !== null) {
    for (const feature of hostFeatures) {
      feature(component, rootComponentDef);
    }
  }
  executeContentQueries(tView, rootTNode, componentView);
  return component;
}
function setRootNodeAttributes(hostRenderer, componentDef, hostRNode, rootSelectorOrNode) {
  if (rootSelectorOrNode) {
    setUpAttributes(hostRenderer, hostRNode, ["ng-version", VERSION.full]);
  } else {
    const {
      attrs,
      classes
    } = extractAttrsAndClassesFromSelector(componentDef.selectors[0]);
    if (attrs) {
      setUpAttributes(hostRenderer, hostRNode, attrs);
    }
    if (classes && classes.length > 0) {
      writeDirectClass(hostRenderer, hostRNode, classes.join(" "));
    }
  }
}
function projectNodes(tNode, ngContentSelectors, projectableNodes) {
  const projection = tNode.projection = [];
  for (let i = 0; i < ngContentSelectors.length; i++) {
    const nodesforSlot = projectableNodes[i];
    projection.push(nodesforSlot != null ? Array.from(nodesforSlot) : null);
  }
}
function LifecycleHooksFeature() {
  const tNode = getCurrentTNode();
  registerPostOrderHooks(getLView()[TVIEW], tNode);
}
function ɵɵHostDirectivesFeature(rawHostDirectives) {
  return (definition) => {
    definition.findHostDirectiveDefs = findHostDirectiveDefs;
    definition.hostDirectives = (Array.isArray(rawHostDirectives) ? rawHostDirectives : rawHostDirectives()).map((dir) => {
      return typeof dir === "function" ? {
        directive: resolveForwardRef(dir),
        inputs: EMPTY_OBJ,
        outputs: EMPTY_OBJ
      } : {
        directive: resolveForwardRef(dir.directive),
        inputs: bindingArrayToMap(dir.inputs),
        outputs: bindingArrayToMap(dir.outputs)
      };
    });
  };
}
function findHostDirectiveDefs(currentDef, matchedDefs, hostDirectiveDefs) {
  if (currentDef.hostDirectives !== null) {
    for (const hostDirectiveConfig of currentDef.hostDirectives) {
      const hostDirectiveDef = getDirectiveDef(hostDirectiveConfig.directive);
      if (false) {
        validateHostDirective(hostDirectiveConfig, hostDirectiveDef, matchedDefs);
      }
      patchDeclaredInputs(hostDirectiveDef.declaredInputs, hostDirectiveConfig.inputs);
      findHostDirectiveDefs(hostDirectiveDef, matchedDefs, hostDirectiveDefs);
      hostDirectiveDefs.set(hostDirectiveDef, hostDirectiveConfig);
      matchedDefs.push(hostDirectiveDef);
    }
  }
}
function bindingArrayToMap(bindings) {
  if (bindings === void 0 || bindings.length === 0) {
    return EMPTY_OBJ;
  }
  const result = {};
  for (let i = 0; i < bindings.length; i += 2) {
    result[bindings[i]] = bindings[i + 1];
  }
  return result;
}
function patchDeclaredInputs(declaredInputs, exposedInputs) {
  for (const publicName in exposedInputs) {
    if (exposedInputs.hasOwnProperty(publicName)) {
      const remappedPublicName = exposedInputs[publicName];
      const privateName = declaredInputs[publicName];
      if (false) {
        assertEqual(declaredInputs[remappedPublicName], declaredInputs[publicName], `Conflicting host directive input alias ${publicName}.`);
      }
      declaredInputs[remappedPublicName] = privateName;
    }
  }
}
function validateHostDirective(hostDirectiveConfig, directiveDef, matchedDefs) {
  const type = hostDirectiveConfig.directive;
  if (directiveDef === null) {
    if (getComponentDef(type) !== null) {
      throw new RuntimeError(310, `Host directive ${type.name} cannot be a component.`);
    }
    throw new RuntimeError(307, `Could not resolve metadata for host directive ${type.name}. Make sure that the ${type.name} class is annotated with an @Directive decorator.`);
  }
  if (!directiveDef.standalone) {
    throw new RuntimeError(308, `Host directive ${directiveDef.type.name} must be standalone.`);
  }
  if (matchedDefs.indexOf(directiveDef) > -1) {
    throw new RuntimeError(309, `Directive ${directiveDef.type.name} matches multiple times on the same element. Directives can only match an element once.`);
  }
  validateMappings("input", directiveDef, hostDirectiveConfig.inputs);
  validateMappings("output", directiveDef, hostDirectiveConfig.outputs);
}
function validateMappings(bindingType, def, hostDirectiveBindings) {
  const className = def.type.name;
  const bindings = bindingType === "input" ? def.inputs : def.outputs;
  for (const publicName in hostDirectiveBindings) {
    if (hostDirectiveBindings.hasOwnProperty(publicName)) {
      if (!bindings.hasOwnProperty(publicName)) {
        throw new RuntimeError(311, `Directive ${className} does not have an ${bindingType} with a public name of ${publicName}.`);
      }
      const remappedPublicName = hostDirectiveBindings[publicName];
      if (bindings.hasOwnProperty(remappedPublicName) && bindings[remappedPublicName] !== publicName) {
        throw new RuntimeError(312, `Cannot alias ${bindingType} ${publicName} of host directive ${className} to ${remappedPublicName}, because it already has a different ${bindingType} with the same public name.`);
      }
    }
  }
}
let _symbolIterator = null;
function getSymbolIterator() {
  if (!_symbolIterator) {
    const Symbol2 = _global["Symbol"];
    if (Symbol2 && Symbol2.iterator) {
      _symbolIterator = Symbol2.iterator;
    } else {
      const keys = Object.getOwnPropertyNames(Map.prototype);
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key !== "entries" && key !== "size" && Map.prototype[key] === Map.prototype["entries"]) {
          _symbolIterator = key;
        }
      }
    }
  }
  return _symbolIterator;
}
function isListLikeIterable(obj) {
  if (!isJsObject(obj))
    return false;
  return Array.isArray(obj) || !(obj instanceof Map) && // JS Map are iterables but return entries as [k, v]
  getSymbolIterator() in obj;
}
function areIterablesEqual(a, b, comparator) {
  const iterator1 = a[getSymbolIterator()]();
  const iterator2 = b[getSymbolIterator()]();
  while (true) {
    const item1 = iterator1.next();
    const item2 = iterator2.next();
    if (item1.done && item2.done)
      return true;
    if (item1.done || item2.done)
      return false;
    if (!comparator(item1.value, item2.value))
      return false;
  }
}
function isJsObject(o) {
  return o !== null && (typeof o === "function" || typeof o === "object");
}
function devModeEqual(a, b) {
  const isListLikeIterableA = isListLikeIterable(a);
  const isListLikeIterableB = isListLikeIterable(b);
  if (isListLikeIterableA && isListLikeIterableB) {
    return areIterablesEqual(a, b, devModeEqual);
  } else {
    const isAObject = a && (typeof a === "object" || typeof a === "function");
    const isBObject = b && (typeof b === "object" || typeof b === "function");
    if (!isListLikeIterableA && isAObject && !isListLikeIterableB && isBObject) {
      return true;
    } else {
      return Object.is(a, b);
    }
  }
}
function updateBinding(lView, bindingIndex, value) {
  return lView[bindingIndex] = value;
}
function bindingUpdated(lView, bindingIndex, value) {
  const oldValue = lView[bindingIndex];
  if (Object.is(oldValue, value)) {
    return false;
  } else {
    if (false) {
      const oldValueToCompare = oldValue !== NO_CHANGE ? oldValue : void 0;
      if (!devModeEqual(oldValueToCompare, value)) {
        const details = getExpressionChangedErrorDetails(lView, bindingIndex, oldValueToCompare, value);
        throwErrorIfNoChangesMode(oldValue === NO_CHANGE, details.oldValue, details.newValue, details.propName);
      }
      return false;
    }
    lView[bindingIndex] = value;
    return true;
  }
}
function ɵɵattribute(name, value, sanitizer, namespace) {
  const lView = getLView();
  const bindingIndex = nextBindingIndex();
  if (bindingUpdated(lView, bindingIndex, value)) {
    const tView = getTView();
    const tNode = getSelectedTNode();
    elementAttributeInternal(tNode, lView, name, value, sanitizer, namespace);
  }
  return ɵɵattribute;
}
function interpolation1(lView, prefix, v0, suffix) {
  const different = bindingUpdated(lView, nextBindingIndex(), v0);
  return different ? prefix + renderStringify(v0) + suffix : NO_CHANGE;
}
function detectChanges(component) {
  const view = getComponentViewByInstance(component);
  detectChangesInternal(view[TVIEW], view, component);
}
function store(tView, lView, index, value) {
  if (index >= tView.data.length) {
    tView.data[index] = null;
    tView.blueprint[index] = null;
  }
  lView[index] = value;
}
function ɵɵproperty(propName, value, sanitizer) {
  const lView = getLView();
  const bindingIndex = nextBindingIndex();
  if (bindingUpdated(lView, bindingIndex, value)) {
    const tView = getTView();
    const tNode = getSelectedTNode();
    elementPropertyInternal(tView, tNode, lView, propName, value, lView[RENDERER], sanitizer, false);
  }
  return ɵɵproperty;
}
function setDirectiveInputsWhichShadowsStyling(tView, tNode, lView, value, isClassBased) {
  const inputs = tNode.inputs;
  const property = isClassBased ? "class" : "style";
  setInputsForProperty(tView, lView, inputs[property], property, value);
}
function elementStartFirstCreatePass(index, tView, lView, native, name, attrsIndex, localRefsIndex) {
  const tViewConsts = tView.consts;
  const attrs = getConstant(tViewConsts, attrsIndex);
  const tNode = getOrCreateTNode(tView, index, 2, name, attrs);
  const hasDirectives = resolveDirectives(tView, lView, tNode, getConstant(tViewConsts, localRefsIndex));
  if (false) {
    validateElementIsKnown(native, lView, tNode.value, tView.schemas, hasDirectives);
  }
  if (tNode.attrs !== null) {
    computeStaticStyling(tNode, tNode.attrs, false);
  }
  if (tNode.mergedAttrs !== null) {
    computeStaticStyling(tNode, tNode.mergedAttrs, true);
  }
  if (tView.queries !== null) {
    tView.queries.elementStart(tView, tNode);
  }
  return tNode;
}
function ɵɵelementStart(index, name, attrsIndex, localRefsIndex) {
  const lView = getLView();
  const tView = getTView();
  const adjustedIndex = HEADER_OFFSET + index;
  const renderer = lView[RENDERER];
  const native = lView[adjustedIndex] = createElementNode(renderer, name, getNamespace$1());
  const tNode = tView.firstCreatePass ? elementStartFirstCreatePass(adjustedIndex, tView, lView, native, name, attrsIndex, localRefsIndex) : tView.data[adjustedIndex];
  setCurrentTNode(tNode, true);
  setupStaticAttributes(renderer, native, tNode);
  if ((tNode.flags & 32) !== 32) {
    appendChild(tView, lView, native, tNode);
  }
  if (getElementDepthCount() === 0) {
    attachPatchData(native, lView);
  }
  increaseElementDepthCount();
  if (isDirectiveHost(tNode)) {
    createDirectivesInstances(tView, lView, tNode);
    executeContentQueries(tView, tNode, lView);
  }
  if (localRefsIndex !== null) {
    saveResolvedLocalsInData(lView, tNode);
  }
  return ɵɵelementStart;
}
function ɵɵelementEnd() {
  let currentTNode = getCurrentTNode();
  if (isCurrentTNodeParent()) {
    setCurrentTNodeAsNotParent();
  } else {
    currentTNode = currentTNode.parent;
    setCurrentTNode(currentTNode, false);
  }
  const tNode = currentTNode;
  decreaseElementDepthCount();
  const tView = getTView();
  if (tView.firstCreatePass) {
    registerPostOrderHooks(tView, currentTNode);
    if (isContentQueryHost(currentTNode)) {
      tView.queries.elementEnd(currentTNode);
    }
  }
  if (tNode.classesWithoutHost != null && hasClassInput(tNode)) {
    setDirectiveInputsWhichShadowsStyling(tView, tNode, getLView(), tNode.classesWithoutHost, true);
  }
  if (tNode.stylesWithoutHost != null && hasStyleInput(tNode)) {
    setDirectiveInputsWhichShadowsStyling(tView, tNode, getLView(), tNode.stylesWithoutHost, false);
  }
  return ɵɵelementEnd;
}
function ɵɵelement(index, name, attrsIndex, localRefsIndex) {
  ɵɵelementStart(index, name, attrsIndex, localRefsIndex);
  ɵɵelementEnd();
  return ɵɵelement;
}
function isPromise(obj) {
  return !!obj && typeof obj.then === "function";
}
function isSubscribable(obj) {
  return !!obj && typeof obj.subscribe === "function";
}
const isObservable = isSubscribable;
function ɵɵlistener(eventName, listenerFn, useCapture, eventTargetResolver) {
  const lView = getLView();
  const tView = getTView();
  const tNode = getCurrentTNode();
  listenerInternal(tView, lView, lView[RENDERER], tNode, eventName, listenerFn, eventTargetResolver);
  return ɵɵlistener;
}
function findExistingListener(tView, lView, eventName, tNodeIdx) {
  const tCleanup = tView.cleanup;
  if (tCleanup != null) {
    for (let i = 0; i < tCleanup.length - 1; i += 2) {
      const cleanupEventName = tCleanup[i];
      if (cleanupEventName === eventName && tCleanup[i + 1] === tNodeIdx) {
        const lCleanup = lView[CLEANUP];
        const listenerIdxInLCleanup = tCleanup[i + 2];
        return lCleanup.length > listenerIdxInLCleanup ? lCleanup[listenerIdxInLCleanup] : null;
      }
      if (typeof cleanupEventName === "string") {
        i += 2;
      }
    }
  }
  return null;
}
function listenerInternal(tView, lView, renderer, tNode, eventName, listenerFn, eventTargetResolver) {
  const isTNodeDirectiveHost = isDirectiveHost(tNode);
  const firstCreatePass = tView.firstCreatePass;
  const tCleanup = firstCreatePass && getOrCreateTViewCleanup(tView);
  const context = lView[CONTEXT];
  const lCleanup = getOrCreateLViewCleanup(lView);
  let processOutputs = true;
  if (tNode.type & 3 || eventTargetResolver) {
    const native = getNativeByTNode(tNode, lView);
    const target = eventTargetResolver ? eventTargetResolver(native) : native;
    const lCleanupIndex = lCleanup.length;
    const idxOrTargetGetter = eventTargetResolver ? (_lView) => eventTargetResolver(unwrapRNode(_lView[tNode.index])) : tNode.index;
    let existingListener = null;
    if (!eventTargetResolver && isTNodeDirectiveHost) {
      existingListener = findExistingListener(tView, lView, eventName, tNode.index);
    }
    if (existingListener !== null) {
      const lastListenerFn = existingListener.__ngLastListenerFn__ || existingListener;
      lastListenerFn.__ngNextListenerFn__ = listenerFn;
      existingListener.__ngLastListenerFn__ = listenerFn;
      processOutputs = false;
    } else {
      listenerFn = wrapListener(
        tNode,
        lView,
        context,
        listenerFn,
        false
        /** preventDefault */
      );
      const cleanupFn = renderer.listen(target, eventName, listenerFn);
      lCleanup.push(listenerFn, cleanupFn);
      tCleanup && tCleanup.push(eventName, idxOrTargetGetter, lCleanupIndex, lCleanupIndex + 1);
    }
  } else {
    listenerFn = wrapListener(
      tNode,
      lView,
      context,
      listenerFn,
      false
      /** preventDefault */
    );
  }
  const outputs = tNode.outputs;
  let props;
  if (processOutputs && outputs !== null && (props = outputs[eventName])) {
    const propsLength = props.length;
    if (propsLength) {
      for (let i = 0; i < propsLength; i += 2) {
        const index = props[i];
        const minifiedName = props[i + 1];
        const directiveInstance = lView[index];
        const output = directiveInstance[minifiedName];
        if (false) {
          throw new Error(`@Output ${minifiedName} not initialized in '${directiveInstance.constructor.name}'.`);
        }
        const subscription = output.subscribe(listenerFn);
        const idx = lCleanup.length;
        lCleanup.push(listenerFn, subscription);
        tCleanup && tCleanup.push(eventName, tNode.index, idx, -(idx + 1));
      }
    }
  }
}
function executeListenerWithErrorHandling(lView, context, listenerFn, e) {
  try {
    profiler(6, context, listenerFn);
    return listenerFn(e) !== false;
  } catch (error) {
    handleError(lView, error);
    return false;
  } finally {
    profiler(7, context, listenerFn);
  }
}
function wrapListener(tNode, lView, context, listenerFn, wrapWithPreventDefault) {
  return function wrapListenerIn_markDirtyAndPreventDefault(e) {
    if (e === Function) {
      return listenerFn;
    }
    const startView = tNode.componentOffset > -1 ? getComponentLViewByIndex(tNode.index, lView) : lView;
    markViewDirty(startView);
    let result = executeListenerWithErrorHandling(lView, context, listenerFn, e);
    let nextListenerFn = wrapListenerIn_markDirtyAndPreventDefault.__ngNextListenerFn__;
    while (nextListenerFn) {
      result = executeListenerWithErrorHandling(lView, context, nextListenerFn, e) && result;
      nextListenerFn = nextListenerFn.__ngNextListenerFn__;
    }
    if (wrapWithPreventDefault && result === false) {
      e.preventDefault();
      e.returnValue = false;
    }
    return result;
  };
}
function toTStylingRange(prev, next) {
  return prev << 17 | next << 2;
}
function getTStylingRangePrev(tStylingRange) {
  return tStylingRange >> 17 & 32767;
}
function getTStylingRangePrevDuplicate(tStylingRange) {
  return (tStylingRange & 2) == 2;
}
function setTStylingRangePrev(tStylingRange, previous) {
  return tStylingRange & ~4294836224 | previous << 17;
}
function setTStylingRangePrevDuplicate(tStylingRange) {
  return tStylingRange | 2;
}
function getTStylingRangeNext(tStylingRange) {
  return (tStylingRange & 131068) >> 2;
}
function setTStylingRangeNext(tStylingRange, next) {
  return tStylingRange & ~131068 | //
  next << 2;
}
function getTStylingRangeNextDuplicate(tStylingRange) {
  return (tStylingRange & 1) === 1;
}
function setTStylingRangeNextDuplicate(tStylingRange) {
  return tStylingRange | 1;
}
function insertTStylingBinding(tData, tNode, tStylingKeyWithStatic, index, isHostBinding, isClassBinding) {
  let tBindings = isClassBinding ? tNode.classBindings : tNode.styleBindings;
  let tmplHead = getTStylingRangePrev(tBindings);
  let tmplTail = getTStylingRangeNext(tBindings);
  tData[index] = tStylingKeyWithStatic;
  let isKeyDuplicateOfStatic = false;
  let tStylingKey;
  if (Array.isArray(tStylingKeyWithStatic)) {
    const staticKeyValueArray = tStylingKeyWithStatic;
    tStylingKey = staticKeyValueArray[1];
    if (tStylingKey === null || keyValueArrayIndexOf(staticKeyValueArray, tStylingKey) > 0) {
      isKeyDuplicateOfStatic = true;
    }
  } else {
    tStylingKey = tStylingKeyWithStatic;
  }
  if (isHostBinding) {
    const hasTemplateBindings = tmplTail !== 0;
    if (hasTemplateBindings) {
      const previousNode = getTStylingRangePrev(tData[tmplHead + 1]);
      tData[index + 1] = toTStylingRange(previousNode, tmplHead);
      if (previousNode !== 0) {
        tData[previousNode + 1] = setTStylingRangeNext(tData[previousNode + 1], index);
      }
      tData[tmplHead + 1] = setTStylingRangePrev(tData[tmplHead + 1], index);
    } else {
      tData[index + 1] = toTStylingRange(tmplHead, 0);
      if (tmplHead !== 0) {
        tData[tmplHead + 1] = setTStylingRangeNext(tData[tmplHead + 1], index);
      }
      tmplHead = index;
    }
  } else {
    tData[index + 1] = toTStylingRange(tmplTail, 0);
    if (tmplHead === 0) {
      tmplHead = index;
    } else {
      tData[tmplTail + 1] = setTStylingRangeNext(tData[tmplTail + 1], index);
    }
    tmplTail = index;
  }
  if (isKeyDuplicateOfStatic) {
    tData[index + 1] = setTStylingRangePrevDuplicate(tData[index + 1]);
  }
  markDuplicates(tData, tStylingKey, index, true);
  markDuplicates(tData, tStylingKey, index, false);
  markDuplicateOfResidualStyling(tNode, tStylingKey, tData, index, isClassBinding);
  tBindings = toTStylingRange(tmplHead, tmplTail);
  if (isClassBinding) {
    tNode.classBindings = tBindings;
  } else {
    tNode.styleBindings = tBindings;
  }
}
function markDuplicateOfResidualStyling(tNode, tStylingKey, tData, index, isClassBinding) {
  const residual = isClassBinding ? tNode.residualClasses : tNode.residualStyles;
  if (residual != null && typeof tStylingKey == "string" && keyValueArrayIndexOf(residual, tStylingKey) >= 0) {
    tData[index + 1] = setTStylingRangeNextDuplicate(tData[index + 1]);
  }
}
function markDuplicates(tData, tStylingKey, index, isPrevDir, isClassBinding) {
  const tStylingAtIndex = tData[index + 1];
  const isMap = tStylingKey === null;
  let cursor = isPrevDir ? getTStylingRangePrev(tStylingAtIndex) : getTStylingRangeNext(tStylingAtIndex);
  let foundDuplicate = false;
  while (cursor !== 0 && (foundDuplicate === false || isMap)) {
    const tStylingValueAtCursor = tData[cursor];
    const tStyleRangeAtCursor = tData[cursor + 1];
    if (isStylingMatch(tStylingValueAtCursor, tStylingKey)) {
      foundDuplicate = true;
      tData[cursor + 1] = isPrevDir ? setTStylingRangeNextDuplicate(tStyleRangeAtCursor) : setTStylingRangePrevDuplicate(tStyleRangeAtCursor);
    }
    cursor = isPrevDir ? getTStylingRangePrev(tStyleRangeAtCursor) : getTStylingRangeNext(tStyleRangeAtCursor);
  }
  if (foundDuplicate) {
    tData[index + 1] = isPrevDir ? setTStylingRangePrevDuplicate(tStylingAtIndex) : setTStylingRangeNextDuplicate(tStylingAtIndex);
  }
}
function isStylingMatch(tStylingKeyCursor, tStylingKey) {
  if (tStylingKeyCursor === null || // If the cursor is `null` it means that we have map at that
  // location so we must assume that we have a match.
  tStylingKey == null || // If `tStylingKey` is `null` then it is a map therefor assume that it
  // contains a match.
  (Array.isArray(tStylingKeyCursor) ? tStylingKeyCursor[1] : tStylingKeyCursor) === tStylingKey) {
    return true;
  } else if (Array.isArray(tStylingKeyCursor) && typeof tStylingKey === "string") {
    return keyValueArrayIndexOf(tStylingKeyCursor, tStylingKey) >= 0;
  }
  return false;
}
const parserState = {
  textEnd: 0,
  key: 0,
  keyEnd: 0,
  value: 0,
  valueEnd: 0
};
function getLastParsedKey(text) {
  return text.substring(parserState.key, parserState.keyEnd);
}
function parseClassName(text) {
  resetParserState(text);
  return parseClassNameNext(text, consumeWhitespace(text, 0, parserState.textEnd));
}
function parseClassNameNext(text, index) {
  const end = parserState.textEnd;
  if (end === index) {
    return -1;
  }
  index = parserState.keyEnd = consumeClassToken(text, parserState.key = index, end);
  return consumeWhitespace(text, index, end);
}
function resetParserState(text) {
  parserState.key = 0;
  parserState.keyEnd = 0;
  parserState.value = 0;
  parserState.valueEnd = 0;
  parserState.textEnd = text.length;
}
function consumeWhitespace(text, startIndex, endIndex) {
  while (startIndex < endIndex && text.charCodeAt(startIndex) <= 32) {
    startIndex++;
  }
  return startIndex;
}
function consumeClassToken(text, startIndex, endIndex) {
  while (startIndex < endIndex && text.charCodeAt(startIndex) > 32) {
    startIndex++;
  }
  return startIndex;
}
function ɵɵclassMap(classes) {
  checkStylingMap(keyValueArraySet, classStringParser, classes, true);
}
function classStringParser(keyValueArray, text) {
  for (let i = parseClassName(text); i >= 0; i = parseClassNameNext(text, i)) {
    keyValueArraySet(keyValueArray, getLastParsedKey(text), true);
  }
}
function checkStylingMap(keyValueArraySet2, stringParser, value, isClassBased) {
  const tView = getTView();
  const bindingIndex = incrementBindingIndex(2);
  if (tView.firstUpdatePass) {
    stylingFirstUpdatePass(tView, null, bindingIndex, isClassBased);
  }
  const lView = getLView();
  if (value !== NO_CHANGE && bindingUpdated(lView, bindingIndex, value)) {
    const tNode = tView.data[getSelectedIndex()];
    if (hasStylingInputShadow(tNode, isClassBased) && !isInHostBindings(tView, bindingIndex)) {
      if (false) {
        const tStylingKey = tView.data[bindingIndex];
        assertEqual(Array.isArray(tStylingKey) ? tStylingKey[1] : tStylingKey, false, "Styling linked list shadow input should be marked as 'false'");
      }
      let staticPrefix = isClassBased ? tNode.classesWithoutHost : tNode.stylesWithoutHost;
      if (staticPrefix !== null) {
        value = concatStringsWithSpace(staticPrefix, value ? value : "");
      }
      setDirectiveInputsWhichShadowsStyling(tView, tNode, lView, value, isClassBased);
    } else {
      updateStylingMap(tView, tNode, lView, lView[RENDERER], lView[bindingIndex + 1], lView[bindingIndex + 1] = toStylingKeyValueArray(keyValueArraySet2, stringParser, value), isClassBased, bindingIndex);
    }
  }
}
function isInHostBindings(tView, bindingIndex) {
  return bindingIndex >= tView.expandoStartIndex;
}
function stylingFirstUpdatePass(tView, tStylingKey, bindingIndex, isClassBased) {
  const tData = tView.data;
  if (tData[bindingIndex + 1] === null) {
    const tNode = tData[getSelectedIndex()];
    const isHostBindings = isInHostBindings(tView, bindingIndex);
    if (hasStylingInputShadow(tNode, isClassBased) && tStylingKey === null && !isHostBindings) {
      tStylingKey = false;
    }
    tStylingKey = wrapInStaticStylingKey(tData, tNode, tStylingKey, isClassBased);
    insertTStylingBinding(tData, tNode, tStylingKey, bindingIndex, isHostBindings, isClassBased);
  }
}
function wrapInStaticStylingKey(tData, tNode, stylingKey, isClassBased) {
  const hostDirectiveDef = getCurrentDirectiveDef(tData);
  let residual = isClassBased ? tNode.residualClasses : tNode.residualStyles;
  if (hostDirectiveDef === null) {
    const isFirstStylingInstructionInTemplate = (isClassBased ? tNode.classBindings : tNode.styleBindings) === 0;
    if (isFirstStylingInstructionInTemplate) {
      stylingKey = collectStylingFromDirectives(null, tData, tNode, stylingKey, isClassBased);
      stylingKey = collectStylingFromTAttrs(stylingKey, tNode.attrs, isClassBased);
      residual = null;
    }
  } else {
    const directiveStylingLast = tNode.directiveStylingLast;
    const isFirstStylingInstructionInHostBinding = directiveStylingLast === -1 || tData[directiveStylingLast] !== hostDirectiveDef;
    if (isFirstStylingInstructionInHostBinding) {
      stylingKey = collectStylingFromDirectives(hostDirectiveDef, tData, tNode, stylingKey, isClassBased);
      if (residual === null) {
        let templateStylingKey = getTemplateHeadTStylingKey(tData, tNode, isClassBased);
        if (templateStylingKey !== void 0 && Array.isArray(templateStylingKey)) {
          templateStylingKey = collectStylingFromDirectives(null, tData, tNode, templateStylingKey[1], isClassBased);
          templateStylingKey = collectStylingFromTAttrs(templateStylingKey, tNode.attrs, isClassBased);
          setTemplateHeadTStylingKey(tData, tNode, isClassBased, templateStylingKey);
        }
      } else {
        residual = collectResidual(tData, tNode, isClassBased);
      }
    }
  }
  if (residual !== void 0) {
    isClassBased ? tNode.residualClasses = residual : tNode.residualStyles = residual;
  }
  return stylingKey;
}
function getTemplateHeadTStylingKey(tData, tNode, isClassBased) {
  const bindings = isClassBased ? tNode.classBindings : tNode.styleBindings;
  if (getTStylingRangeNext(bindings) === 0) {
    return void 0;
  }
  return tData[getTStylingRangePrev(bindings)];
}
function setTemplateHeadTStylingKey(tData, tNode, isClassBased, tStylingKey) {
  const bindings = isClassBased ? tNode.classBindings : tNode.styleBindings;
  tData[getTStylingRangePrev(bindings)] = tStylingKey;
}
function collectResidual(tData, tNode, isClassBased) {
  let residual = void 0;
  const directiveEnd = tNode.directiveEnd;
  for (let i = 1 + tNode.directiveStylingLast; i < directiveEnd; i++) {
    const attrs = tData[i].hostAttrs;
    residual = collectStylingFromTAttrs(residual, attrs, isClassBased);
  }
  return collectStylingFromTAttrs(residual, tNode.attrs, isClassBased);
}
function collectStylingFromDirectives(hostDirectiveDef, tData, tNode, stylingKey, isClassBased) {
  let currentDirective = null;
  const directiveEnd = tNode.directiveEnd;
  let directiveStylingLast = tNode.directiveStylingLast;
  if (directiveStylingLast === -1) {
    directiveStylingLast = tNode.directiveStart;
  } else {
    directiveStylingLast++;
  }
  while (directiveStylingLast < directiveEnd) {
    currentDirective = tData[directiveStylingLast];
    stylingKey = collectStylingFromTAttrs(stylingKey, currentDirective.hostAttrs, isClassBased);
    if (currentDirective === hostDirectiveDef)
      break;
    directiveStylingLast++;
  }
  if (hostDirectiveDef !== null) {
    tNode.directiveStylingLast = directiveStylingLast;
  }
  return stylingKey;
}
function collectStylingFromTAttrs(stylingKey, attrs, isClassBased) {
  const desiredMarker = isClassBased ? 1 : 2;
  let currentMarker = -1;
  if (attrs !== null) {
    for (let i = 0; i < attrs.length; i++) {
      const item = attrs[i];
      if (typeof item === "number") {
        currentMarker = item;
      } else {
        if (currentMarker === desiredMarker) {
          if (!Array.isArray(stylingKey)) {
            stylingKey = stylingKey === void 0 ? [] : ["", stylingKey];
          }
          keyValueArraySet(stylingKey, item, isClassBased ? true : attrs[++i]);
        }
      }
    }
  }
  return stylingKey === void 0 ? null : stylingKey;
}
function toStylingKeyValueArray(keyValueArraySet2, stringParser, value) {
  if (value == null || value === "")
    return EMPTY_ARRAY$1;
  const styleKeyValueArray = [];
  const unwrappedValue = unwrapSafeValue(value);
  if (Array.isArray(unwrappedValue)) {
    for (let i = 0; i < unwrappedValue.length; i++) {
      keyValueArraySet2(styleKeyValueArray, unwrappedValue[i], true);
    }
  } else if (typeof unwrappedValue === "object") {
    for (const key in unwrappedValue) {
      if (unwrappedValue.hasOwnProperty(key)) {
        keyValueArraySet2(styleKeyValueArray, key, unwrappedValue[key]);
      }
    }
  } else if (typeof unwrappedValue === "string") {
    stringParser(styleKeyValueArray, unwrappedValue);
  } else {
  }
  return styleKeyValueArray;
}
function updateStylingMap(tView, tNode, lView, renderer, oldKeyValueArray, newKeyValueArray, isClassBased, bindingIndex) {
  if (oldKeyValueArray === NO_CHANGE) {
    oldKeyValueArray = EMPTY_ARRAY$1;
  }
  let oldIndex = 0;
  let newIndex = 0;
  let oldKey = 0 < oldKeyValueArray.length ? oldKeyValueArray[0] : null;
  let newKey = 0 < newKeyValueArray.length ? newKeyValueArray[0] : null;
  while (oldKey !== null || newKey !== null) {
    const oldValue = oldIndex < oldKeyValueArray.length ? oldKeyValueArray[oldIndex + 1] : void 0;
    const newValue = newIndex < newKeyValueArray.length ? newKeyValueArray[newIndex + 1] : void 0;
    let setKey = null;
    let setValue = void 0;
    if (oldKey === newKey) {
      oldIndex += 2;
      newIndex += 2;
      if (oldValue !== newValue) {
        setKey = newKey;
        setValue = newValue;
      }
    } else if (newKey === null || oldKey !== null && oldKey < newKey) {
      oldIndex += 2;
      setKey = oldKey;
    } else {
      newIndex += 2;
      setKey = newKey;
      setValue = newValue;
    }
    if (setKey !== null) {
      updateStyling(tView, tNode, lView, renderer, setKey, setValue, isClassBased, bindingIndex);
    }
    oldKey = oldIndex < oldKeyValueArray.length ? oldKeyValueArray[oldIndex] : null;
    newKey = newIndex < newKeyValueArray.length ? newKeyValueArray[newIndex] : null;
  }
}
function updateStyling(tView, tNode, lView, renderer, prop, value, isClassBased, bindingIndex) {
  if (!(tNode.type & 3)) {
    return;
  }
  const tData = tView.data;
  const tRange = tData[bindingIndex + 1];
  const higherPriorityValue = getTStylingRangeNextDuplicate(tRange) ? findStylingValue(tData, tNode, lView, prop, getTStylingRangeNext(tRange), isClassBased) : void 0;
  if (!isStylingValuePresent(higherPriorityValue)) {
    if (!isStylingValuePresent(value)) {
      if (getTStylingRangePrevDuplicate(tRange)) {
        value = findStylingValue(tData, null, lView, prop, bindingIndex, isClassBased);
      }
    }
    const rNode = getNativeByIndex(getSelectedIndex(), lView);
    applyStyling(renderer, isClassBased, rNode, prop, value);
  }
}
function findStylingValue(tData, tNode, lView, prop, index, isClassBased) {
  const isPrevDirection = tNode === null;
  let value = void 0;
  while (index > 0) {
    const rawKey = tData[index];
    const containsStatics = Array.isArray(rawKey);
    const key = containsStatics ? rawKey[1] : rawKey;
    const isStylingMap = key === null;
    let valueAtLViewIndex = lView[index + 1];
    if (valueAtLViewIndex === NO_CHANGE) {
      valueAtLViewIndex = isStylingMap ? EMPTY_ARRAY$1 : void 0;
    }
    let currentValue = isStylingMap ? keyValueArrayGet(valueAtLViewIndex, prop) : key === prop ? valueAtLViewIndex : void 0;
    if (containsStatics && !isStylingValuePresent(currentValue)) {
      currentValue = keyValueArrayGet(rawKey, prop);
    }
    if (isStylingValuePresent(currentValue)) {
      value = currentValue;
      if (isPrevDirection) {
        return value;
      }
    }
    const tRange = tData[index + 1];
    index = isPrevDirection ? getTStylingRangePrev(tRange) : getTStylingRangeNext(tRange);
  }
  if (tNode !== null) {
    let residual = isClassBased ? tNode.residualClasses : tNode.residualStyles;
    if (residual != null) {
      value = keyValueArrayGet(residual, prop);
    }
  }
  return value;
}
function isStylingValuePresent(value) {
  return value !== void 0;
}
function hasStylingInputShadow(tNode, isClassBased) {
  return (tNode.flags & (isClassBased ? 8 : 16)) !== 0;
}
function ɵɵtext(index, value = "") {
  const lView = getLView();
  const tView = getTView();
  const adjustedIndex = index + HEADER_OFFSET;
  const tNode = tView.firstCreatePass ? getOrCreateTNode(tView, adjustedIndex, 1, value, null) : tView.data[adjustedIndex];
  const textNative = lView[adjustedIndex] = createTextNode(lView[RENDERER], value);
  appendChild(tView, lView, textNative, tNode);
  setCurrentTNode(tNode, false);
}
function ɵɵtextInterpolate1(prefix, v0, suffix) {
  const lView = getLView();
  const interpolated = interpolation1(lView, prefix, v0, suffix);
  if (interpolated !== NO_CHANGE) {
    textBindingInternal(lView, getSelectedIndex(), interpolated);
  }
  return ɵɵtextInterpolate1;
}
const DEFAULT_LOCALE_ID = "en-US";
function setLocaleId(localeId) {
  assertDefined(localeId, `Expected localeId to be defined`);
  if (typeof localeId === "string") {
    localeId.toLowerCase().replace(/_/g, "-");
  }
}
class NgModuleRef$1 {
}
class NgModuleFactory$1 {
}
class NgModuleRef extends NgModuleRef$1 {
  constructor(ngModuleType, _parent) {
    super();
    this._parent = _parent;
    this._bootstrapComponents = [];
    this.destroyCbs = [];
    this.componentFactoryResolver = new ComponentFactoryResolver(this);
    const ngModuleDef = getNgModuleDef(ngModuleType);
    this._bootstrapComponents = maybeUnwrapFn(ngModuleDef.bootstrap);
    this._r3Injector = createInjectorWithoutInjectorInstances(ngModuleType, _parent, [{
      provide: NgModuleRef$1,
      useValue: this
    }, {
      provide: ComponentFactoryResolver$1,
      useValue: this.componentFactoryResolver
    }], stringify$1(ngModuleType), /* @__PURE__ */ new Set(["environment"]));
    this._r3Injector.resolveInjectorInitializers();
    this.instance = this._r3Injector.get(ngModuleType);
  }
  get injector() {
    return this._r3Injector;
  }
  destroy() {
    const injector = this._r3Injector;
    !injector.destroyed && injector.destroy();
    this.destroyCbs.forEach((fn) => fn());
    this.destroyCbs = null;
  }
  onDestroy(callback) {
    this.destroyCbs.push(callback);
  }
}
class NgModuleFactory extends NgModuleFactory$1 {
  constructor(moduleType) {
    super();
    this.moduleType = moduleType;
  }
  create(parentInjector) {
    return new NgModuleRef(this.moduleType, parentInjector);
  }
}
class EnvironmentNgModuleRefAdapter extends NgModuleRef$1 {
  constructor(providers, parent, source) {
    super();
    this.componentFactoryResolver = new ComponentFactoryResolver(this);
    this.instance = null;
    const injector = new R3Injector([...providers, {
      provide: NgModuleRef$1,
      useValue: this
    }, {
      provide: ComponentFactoryResolver$1,
      useValue: this.componentFactoryResolver
    }], parent || getNullInjector(), source, /* @__PURE__ */ new Set(["environment"]));
    this.injector = injector;
    injector.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(callback) {
    this.injector.onDestroy(callback);
  }
}
function createEnvironmentInjector(providers, parent, debugName = null) {
  const adapter = new EnvironmentNgModuleRefAdapter(providers, parent, debugName);
  return adapter.injector;
}
let StandaloneService = /* @__PURE__ */ (() => {
  let StandaloneService2 = /* @__PURE__ */ (() => {
    class StandaloneService3 {
      constructor(_injector) {
        this._injector = _injector;
        this.cachedInjectors = /* @__PURE__ */ new Map();
      }
      getOrCreateStandaloneInjector(componentDef) {
        if (!componentDef.standalone) {
          return null;
        }
        if (!this.cachedInjectors.has(componentDef.id)) {
          const providers = internalImportProvidersFrom(false, componentDef.type);
          const standaloneInjector = providers.length > 0 ? createEnvironmentInjector([providers], this._injector, `Standalone[${componentDef.type.name}]`) : null;
          this.cachedInjectors.set(componentDef.id, standaloneInjector);
        }
        return this.cachedInjectors.get(componentDef.id);
      }
      ngOnDestroy() {
        try {
          for (const injector of this.cachedInjectors.values()) {
            if (injector !== null) {
              injector.destroy();
            }
          }
        } finally {
          this.cachedInjectors.clear();
        }
      }
    }
    StandaloneService3.ɵprov = ɵɵdefineInjectable({
      token: StandaloneService3,
      providedIn: "environment",
      factory: () => new StandaloneService3(ɵɵinject(EnvironmentInjector))
    });
    return StandaloneService3;
  })();
  return StandaloneService2;
})();
function ɵɵStandaloneFeature(definition) {
  definition.getStandaloneInjector = (parentInjector) => {
    return parentInjector.get(StandaloneService).getOrCreateStandaloneInjector(definition);
  };
}
function getComponent(element) {
  const context = getLContext(element);
  if (context === null)
    return null;
  if (context.component === void 0) {
    const lView = context.lView;
    if (lView === null) {
      return null;
    }
    context.component = getComponentAtNodeIndex(context.nodeIndex, lView);
  }
  return context.component;
}
function getContext(element) {
  assertDomElement(element);
  const context = getLContext(element);
  const lView = context ? context.lView : null;
  return lView === null ? null : lView[CONTEXT];
}
function getOwningComponent(elementOrDir) {
  const context = getLContext(elementOrDir);
  let lView = context ? context.lView : null;
  if (lView === null)
    return null;
  let parent;
  while (lView[TVIEW].type === 2 && (parent = getLViewParent(lView))) {
    lView = parent;
  }
  return lView[FLAGS] & 256 ? null : lView[CONTEXT];
}
function getRootComponents(elementOrDir) {
  const lView = readPatchedLView(elementOrDir);
  return lView !== null ? [getRootContext(lView)] : [];
}
function getInjector(elementOrDir) {
  const context = getLContext(elementOrDir);
  const lView = context ? context.lView : null;
  if (lView === null)
    return Injector.NULL;
  const tNode = lView[TVIEW].data[context.nodeIndex];
  return new NodeInjector(tNode, lView);
}
function getDirectives(node) {
  if (node instanceof Text) {
    return [];
  }
  const context = getLContext(node);
  const lView = context ? context.lView : null;
  if (lView === null) {
    return [];
  }
  const tView = lView[TVIEW];
  const nodeIndex = context.nodeIndex;
  if (!(tView === null || tView === void 0 ? void 0 : tView.data[nodeIndex])) {
    return [];
  }
  if (context.directives === void 0) {
    context.directives = getDirectivesAtNodeIndex(nodeIndex, lView);
  }
  return context.directives === null ? [] : [...context.directives];
}
function getDirectiveMetadata$1(directiveOrComponentInstance) {
  const {
    constructor
  } = directiveOrComponentInstance;
  if (!constructor) {
    throw new Error("Unable to find the instance constructor");
  }
  const componentDef = getComponentDef(constructor);
  if (componentDef) {
    return {
      inputs: componentDef.inputs,
      outputs: componentDef.outputs,
      encapsulation: componentDef.encapsulation,
      changeDetection: componentDef.onPush ? ChangeDetectionStrategy.OnPush : ChangeDetectionStrategy.Default
    };
  }
  const directiveDef = getDirectiveDef(constructor);
  if (directiveDef) {
    return {
      inputs: directiveDef.inputs,
      outputs: directiveDef.outputs
    };
  }
  return null;
}
function getHostElement(componentOrDirective) {
  return getLContext(componentOrDirective).native;
}
function getListeners(element) {
  const lContext = getLContext(element);
  const lView = lContext === null ? null : lContext.lView;
  if (lView === null)
    return [];
  const tView = lView[TVIEW];
  const lCleanup = lView[CLEANUP];
  const tCleanup = tView.cleanup;
  const listeners = [];
  if (tCleanup && lCleanup) {
    for (let i = 0; i < tCleanup.length; ) {
      const firstParam = tCleanup[i++];
      const secondParam = tCleanup[i++];
      if (typeof firstParam === "string") {
        const name = firstParam;
        const listenerElement = unwrapRNode(lView[secondParam]);
        const callback = lCleanup[tCleanup[i++]];
        const useCaptureOrIndx = tCleanup[i++];
        const type = typeof useCaptureOrIndx === "boolean" || useCaptureOrIndx >= 0 ? "dom" : "output";
        const useCapture = typeof useCaptureOrIndx === "boolean" ? useCaptureOrIndx : false;
        if (element == listenerElement) {
          listeners.push({
            element,
            name,
            callback,
            useCapture,
            type
          });
        }
      }
    }
  }
  listeners.sort(sortListeners);
  return listeners;
}
function sortListeners(a, b) {
  if (a.name == b.name)
    return 0;
  return a.name < b.name ? -1 : 1;
}
function assertDomElement(value) {
  if (typeof Element !== "undefined" && !(value instanceof Element)) {
    throw new Error("Expecting instance of DOM Element");
  }
}
function getPureFunctionReturnValue(lView, returnValueIndex) {
  const lastReturnValue = lView[returnValueIndex];
  return lastReturnValue === NO_CHANGE ? void 0 : lastReturnValue;
}
function pureFunction1Internal(lView, bindingRoot, slotOffset, pureFn, exp, thisArg) {
  const bindingIndex = bindingRoot + slotOffset;
  return bindingUpdated(lView, bindingIndex, exp) ? updateBinding(lView, bindingIndex + 1, thisArg ? pureFn.call(thisArg, exp) : pureFn(exp)) : getPureFunctionReturnValue(lView, bindingIndex + 1);
}
function ɵɵpipe(index, pipeName) {
  const tView = getTView();
  let pipeDef;
  const adjustedIndex = index + HEADER_OFFSET;
  if (tView.firstCreatePass) {
    pipeDef = getPipeDef(pipeName, tView.pipeRegistry);
    tView.data[adjustedIndex] = pipeDef;
    if (pipeDef.onDestroy) {
      (tView.destroyHooks || (tView.destroyHooks = [])).push(adjustedIndex, pipeDef.onDestroy);
    }
  } else {
    pipeDef = tView.data[adjustedIndex];
  }
  const pipeFactory = pipeDef.factory || (pipeDef.factory = getFactoryDef(pipeDef.type, true));
  const previousInjectImplementation = setInjectImplementation(ɵɵdirectiveInject);
  try {
    const previousIncludeViewProviders = setIncludeViewProviders(false);
    const pipeInstance = pipeFactory();
    setIncludeViewProviders(previousIncludeViewProviders);
    store(tView, getLView(), adjustedIndex, pipeInstance);
    return pipeInstance;
  } finally {
    setInjectImplementation(previousInjectImplementation);
  }
}
function getPipeDef(name, registry) {
  if (registry) {
    for (let i = registry.length - 1; i >= 0; i--) {
      const pipeDef = registry[i];
      if (name === pipeDef.name) {
        return pipeDef;
      }
    }
  }
  if (false) {
    throw new RuntimeError(-302, getPipeNotFoundErrorMessage(name));
  }
}
function getPipeNotFoundErrorMessage(name) {
  const lView = getLView();
  const declarationLView = lView[DECLARATION_COMPONENT_VIEW];
  const context = declarationLView[CONTEXT];
  const hostIsStandalone = isHostComponentStandalone(lView);
  const componentInfoMessage = context ? ` in the '${context.constructor.name}' component` : "";
  const verifyMessage = `Verify that it is ${hostIsStandalone ? "included in the '@Component.imports' of this component" : "declared or imported in this module"}`;
  const errorMessage = `The pipe '${name}' could not be found${componentInfoMessage}. ${verifyMessage}`;
  return errorMessage;
}
function ɵɵpipeBind1(index, slotOffset, v1) {
  const adjustedIndex = index + HEADER_OFFSET;
  const lView = getLView();
  const pipeInstance = load(lView, adjustedIndex);
  return isPure(lView, adjustedIndex) ? pureFunction1Internal(lView, getBindingRoot(), slotOffset, pipeInstance.transform, v1, pipeInstance) : pipeInstance.transform(v1);
}
function isPure(lView, index) {
  return lView[TVIEW].data[index].pure;
}
class EventEmitter_ extends Subject {
  constructor(isAsync = false) {
    super();
    this.__isAsync = isAsync;
  }
  emit(value) {
    super.next(value);
  }
  subscribe(observerOrNext, error, complete) {
    var _a, _b, _c;
    let nextFn = observerOrNext;
    let errorFn = error || (() => null);
    let completeFn = complete;
    if (observerOrNext && typeof observerOrNext === "object") {
      const observer = observerOrNext;
      nextFn = (_a = observer.next) === null || _a === void 0 ? void 0 : _a.bind(observer);
      errorFn = (_b = observer.error) === null || _b === void 0 ? void 0 : _b.bind(observer);
      completeFn = (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.bind(observer);
    }
    if (this.__isAsync) {
      errorFn = _wrapInTimeout(errorFn);
      if (nextFn) {
        nextFn = _wrapInTimeout(nextFn);
      }
      if (completeFn) {
        completeFn = _wrapInTimeout(completeFn);
      }
    }
    const sink = super.subscribe({
      next: nextFn,
      error: errorFn,
      complete: completeFn
    });
    if (observerOrNext instanceof Subscription) {
      observerOrNext.add(sink);
    }
    return sink;
  }
}
function _wrapInTimeout(fn) {
  return (value) => {
    setTimeout(fn, void 0, value);
  };
}
const EventEmitter = EventEmitter_;
let ViewContainerRef = /* @__PURE__ */ (() => {
  let ViewContainerRef3 = /* @__PURE__ */ (() => {
    class ViewContainerRef4 {
    }
    ViewContainerRef4.__NG_ELEMENT_ID__ = injectViewContainerRef;
    return ViewContainerRef4;
  })();
  return ViewContainerRef3;
})();
function injectViewContainerRef() {
  const previousTNode = getCurrentTNode();
  return createContainerRef(previousTNode, getLView());
}
const VE_ViewContainerRef = ViewContainerRef;
const R3ViewContainerRef = class ViewContainerRef2 extends VE_ViewContainerRef {
  constructor(_lContainer, _hostTNode, _hostLView) {
    super();
    this._lContainer = _lContainer;
    this._hostTNode = _hostTNode;
    this._hostLView = _hostLView;
  }
  get element() {
    return createElementRef(this._hostTNode, this._hostLView);
  }
  get injector() {
    return new NodeInjector(this._hostTNode, this._hostLView);
  }
  /** @deprecated No replacement */
  get parentInjector() {
    const parentLocation = getParentInjectorLocation(this._hostTNode, this._hostLView);
    if (hasParentInjector(parentLocation)) {
      const parentView = getParentInjectorView(parentLocation, this._hostLView);
      const injectorIndex = getParentInjectorIndex(parentLocation);
      const parentTNode = parentView[TVIEW].data[
        injectorIndex + 8
        /* NodeInjectorOffset.TNODE */
      ];
      return new NodeInjector(parentTNode, parentView);
    } else {
      return new NodeInjector(null, this._hostLView);
    }
  }
  clear() {
    while (this.length > 0) {
      this.remove(this.length - 1);
    }
  }
  get(index) {
    const viewRefs = getViewRefs(this._lContainer);
    return viewRefs !== null && viewRefs[index] || null;
  }
  get length() {
    return this._lContainer.length - CONTAINER_HEADER_OFFSET;
  }
  createEmbeddedView(templateRef, context, indexOrOptions) {
    let index;
    let injector;
    if (typeof indexOrOptions === "number") {
      index = indexOrOptions;
    } else if (indexOrOptions != null) {
      index = indexOrOptions.index;
      injector = indexOrOptions.injector;
    }
    const viewRef = templateRef.createEmbeddedView(context || {}, injector);
    this.insert(viewRef, index);
    return viewRef;
  }
  createComponent(componentFactoryOrType, indexOrOptions, injector, projectableNodes, environmentInjector) {
    const isComponentFactory = componentFactoryOrType && !isType(componentFactoryOrType);
    let index;
    if (isComponentFactory) {
      if (false) {
        assertEqual(typeof indexOrOptions !== "object", true, "It looks like Component factory was provided as the first argument and an options object as the second argument. This combination of arguments is incompatible. You can either change the first argument to provide Component type or change the second argument to be a number (representing an index at which to insert the new component's host view into this container)");
      }
      index = indexOrOptions;
    } else {
      if (false) {
        assertDefined(getComponentDef(componentFactoryOrType), `Provided Component class doesn't contain Component definition. Please check whether provided class has @Component decorator.`);
        assertEqual(typeof indexOrOptions !== "number", true, "It looks like Component type was provided as the first argument and a number (representing an index at which to insert the new component's host view into this container as the second argument. This combination of arguments is incompatible. Please use an object as the second argument instead.");
      }
      const options = indexOrOptions || {};
      if (false) {
        throwError(`Cannot pass both environmentInjector and ngModuleRef options to createComponent().`);
      }
      index = options.index;
      injector = options.injector;
      projectableNodes = options.projectableNodes;
      environmentInjector = options.environmentInjector || options.ngModuleRef;
    }
    const componentFactory = isComponentFactory ? componentFactoryOrType : new ComponentFactory(getComponentDef(componentFactoryOrType));
    const contextInjector = injector || this.parentInjector;
    if (!environmentInjector && componentFactory.ngModule == null) {
      const _injector = isComponentFactory ? contextInjector : this.parentInjector;
      const result = _injector.get(EnvironmentInjector, null);
      if (result) {
        environmentInjector = result;
      }
    }
    const componentRef = componentFactory.create(contextInjector, projectableNodes, void 0, environmentInjector);
    this.insert(componentRef.hostView, index);
    return componentRef;
  }
  insert(viewRef, index) {
    const lView = viewRef._lView;
    const tView = lView[TVIEW];
    if (false) {
      throw new Error("Cannot insert a destroyed View in a ViewContainer!");
    }
    if (viewAttachedToContainer(lView)) {
      const prevIdx = this.indexOf(viewRef);
      if (prevIdx !== -1) {
        this.detach(prevIdx);
      } else {
        const prevLContainer = lView[PARENT];
        const prevVCRef = new R3ViewContainerRef(prevLContainer, prevLContainer[T_HOST], prevLContainer[PARENT]);
        prevVCRef.detach(prevVCRef.indexOf(viewRef));
      }
    }
    const adjustedIdx = this._adjustIndex(index);
    const lContainer = this._lContainer;
    insertView(tView, lView, lContainer, adjustedIdx);
    const beforeNode = getBeforeNodeForView(adjustedIdx, lContainer);
    const renderer = lView[RENDERER];
    const parentRNode = nativeParentNode(renderer, lContainer[NATIVE]);
    if (parentRNode !== null) {
      addViewToContainer(tView, lContainer[T_HOST], renderer, lView, parentRNode, beforeNode);
    }
    viewRef.attachToViewContainerRef();
    addToArray(getOrCreateViewRefs(lContainer), adjustedIdx, viewRef);
    return viewRef;
  }
  move(viewRef, newIndex) {
    if (false) {
      throw new Error("Cannot move a destroyed View in a ViewContainer!");
    }
    return this.insert(viewRef, newIndex);
  }
  indexOf(viewRef) {
    const viewRefsArr = getViewRefs(this._lContainer);
    return viewRefsArr !== null ? viewRefsArr.indexOf(viewRef) : -1;
  }
  remove(index) {
    const adjustedIdx = this._adjustIndex(index, -1);
    const detachedView = detachView(this._lContainer, adjustedIdx);
    if (detachedView) {
      removeFromArray(getOrCreateViewRefs(this._lContainer), adjustedIdx);
      destroyLView(detachedView[TVIEW], detachedView);
    }
  }
  detach(index) {
    const adjustedIdx = this._adjustIndex(index, -1);
    const view = detachView(this._lContainer, adjustedIdx);
    const wasDetached = view && removeFromArray(getOrCreateViewRefs(this._lContainer), adjustedIdx) != null;
    return wasDetached ? new ViewRef$1(view) : null;
  }
  _adjustIndex(index, shift = 0) {
    if (index == null) {
      return this.length + shift;
    }
    if (false) {
      assertGreaterThan(index, -1, `ViewRef index must be positive, got ${index}`);
      assertLessThan(index, this.length + 1 + shift, "index");
    }
    return index;
  }
};
function getViewRefs(lContainer) {
  return lContainer[VIEW_REFS];
}
function getOrCreateViewRefs(lContainer) {
  return lContainer[VIEW_REFS] || (lContainer[VIEW_REFS] = []);
}
function createContainerRef(hostTNode, hostLView) {
  let lContainer;
  const slotValue = hostLView[hostTNode.index];
  if (isLContainer(slotValue)) {
    lContainer = slotValue;
  } else {
    let commentNode;
    if (hostTNode.type & 8) {
      commentNode = unwrapRNode(slotValue);
    } else {
      const renderer = hostLView[RENDERER];
      commentNode = renderer.createComment(false ? "container" : "");
      const hostNative = getNativeByTNode(hostTNode, hostLView);
      const parentOfHostNative = nativeParentNode(renderer, hostNative);
      nativeInsertBefore(renderer, parentOfHostNative, commentNode, nativeNextSibling(renderer, hostNative), false);
    }
    hostLView[hostTNode.index] = lContainer = createLContainer(slotValue, hostLView, commentNode, hostTNode);
    addToViewTree(hostLView, lContainer);
  }
  return new R3ViewContainerRef(lContainer, hostTNode, hostLView);
}
let jitOptions = null;
function setJitOptions(options) {
  if (jitOptions !== null) {
    if (options.defaultEncapsulation !== jitOptions.defaultEncapsulation) {
      return;
    }
    if (options.preserveWhitespaces !== jitOptions.preserveWhitespaces) {
      return;
    }
  }
  jitOptions = options;
}
function noop(...args) {
}
const APP_INITIALIZER = /* @__PURE__ */ new InjectionToken("Application Initializer");
let ApplicationInitStatus = /* @__PURE__ */ (() => {
  let ApplicationInitStatus2 = /* @__PURE__ */ (() => {
    class ApplicationInitStatus3 {
      constructor(appInits) {
        this.appInits = appInits;
        this.resolve = noop;
        this.reject = noop;
        this.initialized = false;
        this.done = false;
        this.donePromise = new Promise((res, rej) => {
          this.resolve = res;
          this.reject = rej;
        });
      }
      /** @internal */
      runInitializers() {
        if (this.initialized) {
          return;
        }
        const asyncInitPromises = [];
        const complete = () => {
          this.done = true;
          this.resolve();
        };
        if (this.appInits) {
          for (let i = 0; i < this.appInits.length; i++) {
            const initResult = this.appInits[i]();
            if (isPromise(initResult)) {
              asyncInitPromises.push(initResult);
            } else if (isObservable(initResult)) {
              const observableAsPromise = new Promise((resolve, reject) => {
                initResult.subscribe({
                  complete: resolve,
                  error: reject
                });
              });
              asyncInitPromises.push(observableAsPromise);
            }
          }
        }
        Promise.all(asyncInitPromises).then(() => {
          complete();
        }).catch((e) => {
          this.reject(e);
        });
        if (asyncInitPromises.length === 0) {
          complete();
        }
        this.initialized = true;
      }
    }
    ApplicationInitStatus3.ɵfac = function ApplicationInitStatus_Factory(t) {
      return new (t || ApplicationInitStatus3)(ɵɵinject(APP_INITIALIZER, 8));
    };
    ApplicationInitStatus3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: ApplicationInitStatus3,
      factory: ApplicationInitStatus3.ɵfac,
      providedIn: "root"
    });
    return ApplicationInitStatus3;
  })();
  return ApplicationInitStatus2;
})();
const APP_ID = /* @__PURE__ */ new InjectionToken("AppId", {
  providedIn: "root",
  factory: _appIdRandomProviderFactory
});
function _appIdRandomProviderFactory() {
  return `${_randomChar()}${_randomChar()}${_randomChar()}`;
}
function _randomChar() {
  return String.fromCharCode(97 + Math.floor(Math.random() * 25));
}
const PLATFORM_INITIALIZER = /* @__PURE__ */ new InjectionToken("Platform Initializer");
const PLATFORM_ID = /* @__PURE__ */ new InjectionToken("Platform ID", {
  providedIn: "platform",
  factory: () => "unknown"
  // set a default platform name, when none set explicitly
});
const APP_BOOTSTRAP_LISTENER = /* @__PURE__ */ new InjectionToken("appBootstrapListener");
const ANIMATION_MODULE_TYPE = /* @__PURE__ */ new InjectionToken("AnimationModuleType");
let Console = /* @__PURE__ */ (() => {
  let Console2 = /* @__PURE__ */ (() => {
    class Console3 {
      log(message) {
        console.log(message);
      }
      // Note: for reporting errors use `DOM.logError()` as it is platform specific
      warn(message) {
        console.warn(message);
      }
    }
    Console3.ɵfac = function Console_Factory(t) {
      return new (t || Console3)();
    };
    Console3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: Console3,
      factory: Console3.ɵfac,
      providedIn: "platform"
    });
    return Console3;
  })();
  return Console2;
})();
function getGlobalLocale() {
  if (false) {
    return goog.LOCALE;
  } else {
    return typeof $localize !== "undefined" && $localize.locale || DEFAULT_LOCALE_ID;
  }
}
const LOCALE_ID = /* @__PURE__ */ new InjectionToken("LocaleId", {
  providedIn: "root",
  factory: () => inject(LOCALE_ID, InjectFlags.Optional | InjectFlags.SkipSelf) || getGlobalLocale()
});
var MissingTranslationStrategy = /* @__PURE__ */ (() => {
  MissingTranslationStrategy = MissingTranslationStrategy || {};
  MissingTranslationStrategy[MissingTranslationStrategy["Error"] = 0] = "Error";
  MissingTranslationStrategy[MissingTranslationStrategy["Warning"] = 1] = "Warning";
  MissingTranslationStrategy[MissingTranslationStrategy["Ignore"] = 2] = "Ignore";
  return MissingTranslationStrategy;
})();
class ModuleWithComponentFactories {
  constructor(ngModuleFactory, componentFactories) {
    this.ngModuleFactory = ngModuleFactory;
    this.componentFactories = componentFactories;
  }
}
let Compiler = /* @__PURE__ */ (() => {
  let Compiler2 = /* @__PURE__ */ (() => {
    class Compiler3 {
      /**
       * Compiles the given NgModule and all of its components. All templates of the components listed
       * in `entryComponents` have to be inlined.
       */
      compileModuleSync(moduleType) {
        return new NgModuleFactory(moduleType);
      }
      /**
       * Compiles the given NgModule and all of its components
       */
      compileModuleAsync(moduleType) {
        return Promise.resolve(this.compileModuleSync(moduleType));
      }
      /**
       * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
       */
      compileModuleAndAllComponentsSync(moduleType) {
        const ngModuleFactory = this.compileModuleSync(moduleType);
        const moduleDef = getNgModuleDef(moduleType);
        const componentFactories = maybeUnwrapFn(moduleDef.declarations).reduce((factories, declaration) => {
          const componentDef = getComponentDef(declaration);
          componentDef && factories.push(new ComponentFactory(componentDef));
          return factories;
        }, []);
        return new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
      }
      /**
       * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
       */
      compileModuleAndAllComponentsAsync(moduleType) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(moduleType));
      }
      /**
       * Clears all caches.
       */
      clearCache() {
      }
      /**
       * Clears the cache for the given component/ngModule.
       */
      clearCacheFor(type) {
      }
      /**
       * Returns the id for a given NgModule, if one is defined and known to the compiler.
       */
      getModuleId(moduleType) {
        return void 0;
      }
    }
    Compiler3.ɵfac = function Compiler_Factory(t) {
      return new (t || Compiler3)();
    };
    Compiler3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: Compiler3,
      factory: Compiler3.ɵfac,
      providedIn: "root"
    });
    return Compiler3;
  })();
  return Compiler2;
})();
const COMPILER_OPTIONS = /* @__PURE__ */ new InjectionToken("compilerOptions");
class CompilerFactory {
}
function applyChanges(component) {
  markViewDirty(getComponentViewByInstance(component));
  getRootComponents(component).forEach((rootComponent) => detectChanges(rootComponent));
}
const GLOBAL_PUBLISH_EXPANDO_KEY = "ng";
let _published = false;
function publishDefaultGlobalUtils$1() {
  if (!_published) {
    _published = true;
    publishGlobalUtil("ɵsetProfiler", setProfiler);
    publishGlobalUtil("getDirectiveMetadata", getDirectiveMetadata$1);
    publishGlobalUtil("getComponent", getComponent);
    publishGlobalUtil("getContext", getContext);
    publishGlobalUtil("getListeners", getListeners);
    publishGlobalUtil("getOwningComponent", getOwningComponent);
    publishGlobalUtil("getHostElement", getHostElement);
    publishGlobalUtil("getInjector", getInjector);
    publishGlobalUtil("getRootComponents", getRootComponents);
    publishGlobalUtil("getDirectives", getDirectives);
    publishGlobalUtil("applyChanges", applyChanges);
  }
}
function publishGlobalUtil(name, fn) {
  if (typeof COMPILED === "undefined" || !COMPILED) {
    const w = _global;
    if (w) {
      let container = w[GLOBAL_PUBLISH_EXPANDO_KEY];
      if (!container) {
        container = w[GLOBAL_PUBLISH_EXPANDO_KEY] = {};
      }
      container[name] = fn;
    }
  }
}
const promise = /* @__PURE__ */ (() => Promise.resolve(0))();
function scheduleMicroTask$2(fn) {
  if (typeof Zone === "undefined") {
    promise.then(() => {
      fn && fn.apply(null, null);
    });
  } else {
    Zone.current.scheduleMicroTask("scheduleMicrotask", fn);
  }
}
function getNativeRequestAnimationFrame() {
  let nativeRequestAnimationFrame = _global["requestAnimationFrame"];
  let nativeCancelAnimationFrame = _global["cancelAnimationFrame"];
  if (typeof Zone !== "undefined" && nativeRequestAnimationFrame && nativeCancelAnimationFrame) {
    const unpatchedRequestAnimationFrame = nativeRequestAnimationFrame[Zone.__symbol__("OriginalDelegate")];
    if (unpatchedRequestAnimationFrame) {
      nativeRequestAnimationFrame = unpatchedRequestAnimationFrame;
    }
    const unpatchedCancelAnimationFrame = nativeCancelAnimationFrame[Zone.__symbol__("OriginalDelegate")];
    if (unpatchedCancelAnimationFrame) {
      nativeCancelAnimationFrame = unpatchedCancelAnimationFrame;
    }
  }
  return {
    nativeRequestAnimationFrame,
    nativeCancelAnimationFrame
  };
}
class AsyncStackTaggingZoneSpec {
  constructor(namePrefix, consoleAsyncStackTaggingImpl = console) {
    var _a;
    this.name = "asyncStackTagging for " + namePrefix;
    this.createTask = (_a = consoleAsyncStackTaggingImpl === null || consoleAsyncStackTaggingImpl === void 0 ? void 0 : consoleAsyncStackTaggingImpl.createTask) !== null && _a !== void 0 ? _a : () => null;
  }
  onScheduleTask(delegate, _current, target, task) {
    task.consoleTask = this.createTask(`Zone - ${task.source || task.type}`);
    return delegate.scheduleTask(target, task);
  }
  onInvokeTask(delegate, _currentZone, targetZone, task, applyThis, applyArgs) {
    let ret;
    if (task.consoleTask) {
      ret = task.consoleTask.run(() => delegate.invokeTask(targetZone, task, applyThis, applyArgs));
    } else {
      ret = delegate.invokeTask(targetZone, task, applyThis, applyArgs);
    }
    return ret;
  }
}
class NgZone {
  constructor({
    enableLongStackTrace = false,
    shouldCoalesceEventChangeDetection = false,
    shouldCoalesceRunChangeDetection = false
  }) {
    this.hasPendingMacrotasks = false;
    this.hasPendingMicrotasks = false;
    this.isStable = true;
    this.onUnstable = new EventEmitter(false);
    this.onMicrotaskEmpty = new EventEmitter(false);
    this.onStable = new EventEmitter(false);
    this.onError = new EventEmitter(false);
    if (typeof Zone == "undefined") {
      throw new RuntimeError(908, false);
    }
    Zone.assertZonePatched();
    const self2 = this;
    self2._nesting = 0;
    self2._outer = self2._inner = Zone.current;
    if (false) {
      self2._inner = self2._inner.fork(new AsyncStackTaggingZoneSpec("Angular"));
    }
    if (Zone["TaskTrackingZoneSpec"]) {
      self2._inner = self2._inner.fork(new Zone["TaskTrackingZoneSpec"]());
    }
    if (enableLongStackTrace && Zone["longStackTraceZoneSpec"]) {
      self2._inner = self2._inner.fork(Zone["longStackTraceZoneSpec"]);
    }
    self2.shouldCoalesceEventChangeDetection = !shouldCoalesceRunChangeDetection && shouldCoalesceEventChangeDetection;
    self2.shouldCoalesceRunChangeDetection = shouldCoalesceRunChangeDetection;
    self2.lastRequestAnimationFrameId = -1;
    self2.nativeRequestAnimationFrame = getNativeRequestAnimationFrame().nativeRequestAnimationFrame;
    forkInnerZoneWithAngularBehavior(self2);
  }
  static isInAngularZone() {
    return typeof Zone !== "undefined" && Zone.current.get("isAngularZone") === true;
  }
  static assertInAngularZone() {
    if (!NgZone.isInAngularZone()) {
      throw new RuntimeError(909, false);
    }
  }
  static assertNotInAngularZone() {
    if (NgZone.isInAngularZone()) {
      throw new RuntimeError(909, false);
    }
  }
  /**
   * Executes the `fn` function synchronously within the Angular zone and returns value returned by
   * the function.
   *
   * Running functions via `run` allows you to reenter Angular zone from a task that was executed
   * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * within the Angular zone.
   *
   * If a synchronous error happens it will be rethrown and not reported via `onError`.
   */
  run(fn, applyThis, applyArgs) {
    return this._inner.run(fn, applyThis, applyArgs);
  }
  /**
   * Executes the `fn` function synchronously within the Angular zone as a task and returns value
   * returned by the function.
   *
   * Running functions via `run` allows you to reenter Angular zone from a task that was executed
   * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * within the Angular zone.
   *
   * If a synchronous error happens it will be rethrown and not reported via `onError`.
   */
  runTask(fn, applyThis, applyArgs, name) {
    const zone = this._inner;
    const task = zone.scheduleEventTask("NgZoneEvent: " + name, fn, EMPTY_PAYLOAD, noop, noop);
    try {
      return zone.runTask(task, applyThis, applyArgs);
    } finally {
      zone.cancelTask(task);
    }
  }
  /**
   * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
   * rethrown.
   */
  runGuarded(fn, applyThis, applyArgs) {
    return this._inner.runGuarded(fn, applyThis, applyArgs);
  }
  /**
   * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
   * the function.
   *
   * Running functions via {@link #runOutsideAngular} allows you to escape Angular's zone and do
   * work that
   * doesn't trigger Angular change-detection or is subject to Angular's error handling.
   *
   * Any future tasks or microtasks scheduled from within this function will continue executing from
   * outside of the Angular zone.
   *
   * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
   */
  runOutsideAngular(fn) {
    return this._outer.run(fn);
  }
}
const EMPTY_PAYLOAD = {};
function checkStable(zone) {
  if (zone._nesting == 0 && !zone.hasPendingMicrotasks && !zone.isStable) {
    try {
      zone._nesting++;
      zone.onMicrotaskEmpty.emit(null);
    } finally {
      zone._nesting--;
      if (!zone.hasPendingMicrotasks) {
        try {
          zone.runOutsideAngular(() => zone.onStable.emit(null));
        } finally {
          zone.isStable = true;
        }
      }
    }
  }
}
function delayChangeDetectionForEvents(zone) {
  if (zone.isCheckStableRunning || zone.lastRequestAnimationFrameId !== -1) {
    return;
  }
  zone.lastRequestAnimationFrameId = zone.nativeRequestAnimationFrame.call(_global, () => {
    if (!zone.fakeTopEventTask) {
      zone.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
        zone.lastRequestAnimationFrameId = -1;
        updateMicroTaskStatus(zone);
        zone.isCheckStableRunning = true;
        checkStable(zone);
        zone.isCheckStableRunning = false;
      }, void 0, () => {
      }, () => {
      });
    }
    zone.fakeTopEventTask.invoke();
  });
  updateMicroTaskStatus(zone);
}
function forkInnerZoneWithAngularBehavior(zone) {
  const delayChangeDetectionForEventsDelegate = () => {
    delayChangeDetectionForEvents(zone);
  };
  zone._inner = zone._inner.fork({
    name: "angular",
    properties: {
      "isAngularZone": true
    },
    onInvokeTask: (delegate, current, target, task, applyThis, applyArgs) => {
      try {
        onEnter(zone);
        return delegate.invokeTask(target, task, applyThis, applyArgs);
      } finally {
        if (zone.shouldCoalesceEventChangeDetection && task.type === "eventTask" || zone.shouldCoalesceRunChangeDetection) {
          delayChangeDetectionForEventsDelegate();
        }
        onLeave(zone);
      }
    },
    onInvoke: (delegate, current, target, callback, applyThis, applyArgs, source) => {
      try {
        onEnter(zone);
        return delegate.invoke(target, callback, applyThis, applyArgs, source);
      } finally {
        if (zone.shouldCoalesceRunChangeDetection) {
          delayChangeDetectionForEventsDelegate();
        }
        onLeave(zone);
      }
    },
    onHasTask: (delegate, current, target, hasTaskState) => {
      delegate.hasTask(target, hasTaskState);
      if (current === target) {
        if (hasTaskState.change == "microTask") {
          zone._hasPendingMicrotasks = hasTaskState.microTask;
          updateMicroTaskStatus(zone);
          checkStable(zone);
        } else if (hasTaskState.change == "macroTask") {
          zone.hasPendingMacrotasks = hasTaskState.macroTask;
        }
      }
    },
    onHandleError: (delegate, current, target, error) => {
      delegate.handleError(target, error);
      zone.runOutsideAngular(() => zone.onError.emit(error));
      return false;
    }
  });
}
function updateMicroTaskStatus(zone) {
  if (zone._hasPendingMicrotasks || (zone.shouldCoalesceEventChangeDetection || zone.shouldCoalesceRunChangeDetection) && zone.lastRequestAnimationFrameId !== -1) {
    zone.hasPendingMicrotasks = true;
  } else {
    zone.hasPendingMicrotasks = false;
  }
}
function onEnter(zone) {
  zone._nesting++;
  if (zone.isStable) {
    zone.isStable = false;
    zone.onUnstable.emit(null);
  }
}
function onLeave(zone) {
  zone._nesting--;
  checkStable(zone);
}
class NoopNgZone {
  constructor() {
    this.hasPendingMicrotasks = false;
    this.hasPendingMacrotasks = false;
    this.isStable = true;
    this.onUnstable = new EventEmitter();
    this.onMicrotaskEmpty = new EventEmitter();
    this.onStable = new EventEmitter();
    this.onError = new EventEmitter();
  }
  run(fn, applyThis, applyArgs) {
    return fn.apply(applyThis, applyArgs);
  }
  runGuarded(fn, applyThis, applyArgs) {
    return fn.apply(applyThis, applyArgs);
  }
  runOutsideAngular(fn) {
    return fn();
  }
  runTask(fn, applyThis, applyArgs, name) {
    return fn.apply(applyThis, applyArgs);
  }
}
const TESTABILITY = /* @__PURE__ */ new InjectionToken("");
const TESTABILITY_GETTER = /* @__PURE__ */ new InjectionToken("");
let Testability = /* @__PURE__ */ (() => {
  let Testability2 = /* @__PURE__ */ (() => {
    class Testability3 {
      constructor(_ngZone, registry, testabilityGetter) {
        this._ngZone = _ngZone;
        this.registry = registry;
        this._pendingCount = 0;
        this._isZoneStable = true;
        this._didWork = false;
        this._callbacks = [];
        this.taskTrackingZone = null;
        if (!_testabilityGetter) {
          setTestabilityGetter(testabilityGetter);
          testabilityGetter.addToWindow(registry);
        }
        this._watchAngularEvents();
        _ngZone.run(() => {
          this.taskTrackingZone = typeof Zone == "undefined" ? null : Zone.current.get("TaskTrackingZone");
        });
      }
      _watchAngularEvents() {
        this._ngZone.onUnstable.subscribe({
          next: () => {
            this._didWork = true;
            this._isZoneStable = false;
          }
        });
        this._ngZone.runOutsideAngular(() => {
          this._ngZone.onStable.subscribe({
            next: () => {
              NgZone.assertNotInAngularZone();
              scheduleMicroTask$2(() => {
                this._isZoneStable = true;
                this._runCallbacksIfReady();
              });
            }
          });
        });
      }
      /**
       * Increases the number of pending request
       * @deprecated pending requests are now tracked with zones.
       */
      increasePendingRequestCount() {
        this._pendingCount += 1;
        this._didWork = true;
        return this._pendingCount;
      }
      /**
       * Decreases the number of pending request
       * @deprecated pending requests are now tracked with zones
       */
      decreasePendingRequestCount() {
        this._pendingCount -= 1;
        if (this._pendingCount < 0) {
          throw new Error("pending async requests below zero");
        }
        this._runCallbacksIfReady();
        return this._pendingCount;
      }
      /**
       * Whether an associated application is stable
       */
      isStable() {
        return this._isZoneStable && this._pendingCount === 0 && !this._ngZone.hasPendingMacrotasks;
      }
      _runCallbacksIfReady() {
        if (this.isStable()) {
          scheduleMicroTask$2(() => {
            while (this._callbacks.length !== 0) {
              let cb = this._callbacks.pop();
              clearTimeout(cb.timeoutId);
              cb.doneCb(this._didWork);
            }
            this._didWork = false;
          });
        } else {
          let pending = this.getPendingTasks();
          this._callbacks = this._callbacks.filter((cb) => {
            if (cb.updateCb && cb.updateCb(pending)) {
              clearTimeout(cb.timeoutId);
              return false;
            }
            return true;
          });
          this._didWork = true;
        }
      }
      getPendingTasks() {
        if (!this.taskTrackingZone) {
          return [];
        }
        return this.taskTrackingZone.macroTasks.map((t) => {
          return {
            source: t.source,
            // From TaskTrackingZone:
            // https://github.com/angular/zone.js/blob/master/lib/zone-spec/task-tracking.ts#L40
            creationLocation: t.creationLocation,
            data: t.data
          };
        });
      }
      addCallback(cb, timeout, updateCb) {
        let timeoutId = -1;
        if (timeout && timeout > 0) {
          timeoutId = setTimeout(() => {
            this._callbacks = this._callbacks.filter((cb2) => cb2.timeoutId !== timeoutId);
            cb(this._didWork, this.getPendingTasks());
          }, timeout);
        }
        this._callbacks.push({
          doneCb: cb,
          timeoutId,
          updateCb
        });
      }
      /**
       * Wait for the application to be stable with a timeout. If the timeout is reached before that
       * happens, the callback receives a list of the macro tasks that were pending, otherwise null.
       *
       * @param doneCb The callback to invoke when Angular is stable or the timeout expires
       *    whichever comes first.
       * @param timeout Optional. The maximum time to wait for Angular to become stable. If not
       *    specified, whenStable() will wait forever.
       * @param updateCb Optional. If specified, this callback will be invoked whenever the set of
       *    pending macrotasks changes. If this callback returns true doneCb will not be invoked
       *    and no further updates will be issued.
       */
      whenStable(doneCb, timeout, updateCb) {
        if (updateCb && !this.taskTrackingZone) {
          throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
        }
        this.addCallback(doneCb, timeout, updateCb);
        this._runCallbacksIfReady();
      }
      /**
       * Get the number of pending requests
       * @deprecated pending requests are now tracked with zones
       */
      getPendingRequestCount() {
        return this._pendingCount;
      }
      /**
       * Registers an application with a testability hook so that it can be tracked.
       * @param token token of application, root element
       *
       * @internal
       */
      registerApplication(token) {
        this.registry.registerApplication(token, this);
      }
      /**
       * Unregisters an application.
       * @param token token of application, root element
       *
       * @internal
       */
      unregisterApplication(token) {
        this.registry.unregisterApplication(token);
      }
      /**
       * Find providers by name
       * @param using The root element to search from
       * @param provider The name of binding variable
       * @param exactMatch Whether using exactMatch
       */
      findProviders(using, provider, exactMatch) {
        return [];
      }
    }
    Testability3.ɵfac = function Testability_Factory(t) {
      return new (t || Testability3)(ɵɵinject(NgZone), ɵɵinject(TestabilityRegistry), ɵɵinject(TESTABILITY_GETTER));
    };
    Testability3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: Testability3,
      factory: Testability3.ɵfac
    });
    return Testability3;
  })();
  return Testability2;
})();
let TestabilityRegistry = /* @__PURE__ */ (() => {
  let TestabilityRegistry2 = /* @__PURE__ */ (() => {
    class TestabilityRegistry3 {
      constructor() {
        this._applications = /* @__PURE__ */ new Map();
      }
      /**
       * Registers an application with a testability hook so that it can be tracked
       * @param token token of application, root element
       * @param testability Testability hook
       */
      registerApplication(token, testability) {
        this._applications.set(token, testability);
      }
      /**
       * Unregisters an application.
       * @param token token of application, root element
       */
      unregisterApplication(token) {
        this._applications.delete(token);
      }
      /**
       * Unregisters all applications
       */
      unregisterAllApplications() {
        this._applications.clear();
      }
      /**
       * Get a testability hook associated with the application
       * @param elem root element
       */
      getTestability(elem) {
        return this._applications.get(elem) || null;
      }
      /**
       * Get all registered testabilities
       */
      getAllTestabilities() {
        return Array.from(this._applications.values());
      }
      /**
       * Get all registered applications(root elements)
       */
      getAllRootElements() {
        return Array.from(this._applications.keys());
      }
      /**
       * Find testability of a node in the Tree
       * @param elem node
       * @param findInAncestors whether finding testability in ancestors if testability was not found in
       * current node
       */
      findTestabilityInTree(elem, findInAncestors = true) {
        var _a;
        return (_a = _testabilityGetter === null || _testabilityGetter === void 0 ? void 0 : _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors)) !== null && _a !== void 0 ? _a : null;
      }
    }
    TestabilityRegistry3.ɵfac = function TestabilityRegistry_Factory(t) {
      return new (t || TestabilityRegistry3)();
    };
    TestabilityRegistry3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: TestabilityRegistry3,
      factory: TestabilityRegistry3.ɵfac,
      providedIn: "platform"
    });
    return TestabilityRegistry3;
  })();
  return TestabilityRegistry2;
})();
function setTestabilityGetter(getter) {
  _testabilityGetter = getter;
}
let _testabilityGetter;
let _platformInjector = null;
const ALLOW_MULTIPLE_PLATFORMS = /* @__PURE__ */ new InjectionToken("AllowMultipleToken");
const PLATFORM_DESTROY_LISTENERS = /* @__PURE__ */ new InjectionToken("PlatformDestroyListeners");
const NG_DEV_MODE$d = false;
function compileNgModuleFactory(injector, options, moduleType) {
  const moduleFactory = new NgModuleFactory(moduleType);
  if (true) {
    return Promise.resolve(moduleFactory);
  }
  const compilerOptions = injector.get(COMPILER_OPTIONS, []).concat(options);
  setJitOptions({
    defaultEncapsulation: _lastDefined$1(compilerOptions.map((opts) => opts.defaultEncapsulation)),
    preserveWhitespaces: _lastDefined$1(compilerOptions.map((opts) => opts.preserveWhitespaces))
  });
  if (isComponentResourceResolutionQueueEmpty()) {
    return Promise.resolve(moduleFactory);
  }
  const compilerProviders = _mergeArrays$1(compilerOptions.map((o) => o.providers));
  if (compilerProviders.length === 0) {
    return Promise.resolve(moduleFactory);
  }
  const compiler = getCompilerFacade({
    usage: 0,
    kind: "NgModule",
    type: moduleType
  });
  const compilerInjector = Injector.create({
    providers: compilerProviders
  });
  const resourceLoader = compilerInjector.get(compiler.ResourceLoader);
  return resolveComponentResources((url2) => Promise.resolve(resourceLoader.get(url2))).then(() => moduleFactory);
}
function publishDefaultGlobalUtils() {
}
function isBoundToModule(cf) {
  return cf.isBoundToModule;
}
function createPlatform(injector) {
  if (_platformInjector && !_platformInjector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
    throw new RuntimeError(400, false);
  }
  publishDefaultGlobalUtils();
  _platformInjector = injector;
  const platform = injector.get(PlatformRef);
  runPlatformInitializers(injector);
  return platform;
}
function createOrReusePlatformInjector(providers = []) {
  if (_platformInjector)
    return _platformInjector;
  const injector = createPlatformInjector(providers);
  _platformInjector = injector;
  publishDefaultGlobalUtils();
  runPlatformInitializers(injector);
  return injector;
}
function runPlatformInitializers(injector) {
  const inits = injector.get(PLATFORM_INITIALIZER, null);
  if (inits) {
    inits.forEach((init) => init());
  }
}
function internalCreateApplication(config) {
  const {
    rootComponent,
    appProviders,
    platformProviders
  } = config;
  if (NG_DEV_MODE$d && rootComponent !== void 0) {
    assertStandaloneComponentType(rootComponent);
  }
  const platformInjector = createOrReusePlatformInjector(platformProviders);
  const ngZone = getNgZone("zone.js", getNgZoneOptions());
  return ngZone.run(() => {
    const allAppProviders = [
      {
        provide: NgZone,
        useValue: ngZone
      },
      ...appProviders || []
      //
    ];
    const envInjector = createEnvironmentInjector(allAppProviders, platformInjector, "Environment Injector");
    const exceptionHandler = envInjector.get(ErrorHandler, null);
    if (NG_DEV_MODE$d && !exceptionHandler) {
      throw new RuntimeError(402, "No `ErrorHandler` found in the Dependency Injection tree.");
    }
    let onErrorSubscription;
    ngZone.runOutsideAngular(() => {
      onErrorSubscription = ngZone.onError.subscribe({
        next: (error) => {
          exceptionHandler.handleError(error);
        }
      });
    });
    const destroyListener = () => envInjector.destroy();
    const onPlatformDestroyListeners = platformInjector.get(PLATFORM_DESTROY_LISTENERS);
    onPlatformDestroyListeners.add(destroyListener);
    envInjector.onDestroy(() => {
      onErrorSubscription.unsubscribe();
      onPlatformDestroyListeners.delete(destroyListener);
    });
    return _callAndReportToErrorHandler(exceptionHandler, ngZone, () => {
      const initStatus = envInjector.get(ApplicationInitStatus);
      initStatus.runInitializers();
      return initStatus.donePromise.then(() => {
        const localeId = envInjector.get(LOCALE_ID, DEFAULT_LOCALE_ID);
        setLocaleId(localeId || DEFAULT_LOCALE_ID);
        const appRef = envInjector.get(ApplicationRef);
        if (rootComponent !== void 0) {
          appRef.bootstrap(rootComponent);
        }
        return appRef;
      });
    });
  });
}
function createPlatformFactory(parentPlatformFactory, name, providers = []) {
  const desc = `Platform: ${name}`;
  const marker = new InjectionToken(desc);
  return (extraProviders = []) => {
    let platform = getPlatform();
    if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
      const platformProviders = [...providers, ...extraProviders, {
        provide: marker,
        useValue: true
      }];
      if (parentPlatformFactory) {
        parentPlatformFactory(platformProviders);
      } else {
        createPlatform(createPlatformInjector(platformProviders, desc));
      }
    }
    return assertPlatform(marker);
  };
}
function assertPlatform(requiredToken) {
  const platform = getPlatform();
  if (!platform) {
    throw new RuntimeError(401, false);
  }
  if (false) {
    throw new RuntimeError(400, "A platform with a different configuration has been created. Please destroy it first.");
  }
  return platform;
}
function createPlatformInjector(providers = [], name) {
  return Injector.create({
    name,
    providers: [{
      provide: INJECTOR_SCOPE,
      useValue: "platform"
    }, {
      provide: PLATFORM_DESTROY_LISTENERS,
      useValue: /* @__PURE__ */ new Set([() => _platformInjector = null])
    }, ...providers]
  });
}
function getPlatform() {
  var _a;
  return (_a = _platformInjector === null || _platformInjector === void 0 ? void 0 : _platformInjector.get(PlatformRef)) !== null && _a !== void 0 ? _a : null;
}
let PlatformRef = /* @__PURE__ */ (() => {
  let PlatformRef2 = /* @__PURE__ */ (() => {
    class PlatformRef3 {
      /** @internal */
      constructor(_injector) {
        this._injector = _injector;
        this._modules = [];
        this._destroyListeners = [];
        this._destroyed = false;
      }
      /**
       * Creates an instance of an `@NgModule` for the given platform.
       *
       * @deprecated Passing NgModule factories as the `PlatformRef.bootstrapModuleFactory` function
       *     argument is deprecated. Use the `PlatformRef.bootstrapModule` API instead.
       */
      bootstrapModuleFactory(moduleFactory, options) {
        const ngZone = getNgZone(options === null || options === void 0 ? void 0 : options.ngZone, getNgZoneOptions(options));
        const providers = [{
          provide: NgZone,
          useValue: ngZone
        }];
        return ngZone.run(() => {
          const ngZoneInjector = Injector.create({
            providers,
            parent: this.injector,
            name: moduleFactory.moduleType.name
          });
          const moduleRef = moduleFactory.create(ngZoneInjector);
          const exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
          if (!exceptionHandler) {
            throw new RuntimeError(402, false);
          }
          ngZone.runOutsideAngular(() => {
            const subscription = ngZone.onError.subscribe({
              next: (error) => {
                exceptionHandler.handleError(error);
              }
            });
            moduleRef.onDestroy(() => {
              remove(this._modules, moduleRef);
              subscription.unsubscribe();
            });
          });
          return _callAndReportToErrorHandler(exceptionHandler, ngZone, () => {
            const initStatus = moduleRef.injector.get(ApplicationInitStatus);
            initStatus.runInitializers();
            return initStatus.donePromise.then(() => {
              const localeId = moduleRef.injector.get(LOCALE_ID, DEFAULT_LOCALE_ID);
              setLocaleId(localeId || DEFAULT_LOCALE_ID);
              this._moduleDoBootstrap(moduleRef);
              return moduleRef;
            });
          });
        });
      }
      /**
       * Creates an instance of an `@NgModule` for a given platform.
       *
       * @usageNotes
       * ### Simple Example
       *
       * ```typescript
       * @NgModule({
       *   imports: [BrowserModule]
       * })
       * class MyModule {}
       *
       * let moduleRef = platformBrowser().bootstrapModule(MyModule);
       * ```
       *
       */
      bootstrapModule(moduleType, compilerOptions = []) {
        const options = optionsReducer({}, compilerOptions);
        return compileNgModuleFactory(this.injector, options, moduleType).then((moduleFactory) => this.bootstrapModuleFactory(moduleFactory, options));
      }
      _moduleDoBootstrap(moduleRef) {
        const appRef = moduleRef.injector.get(ApplicationRef);
        if (moduleRef._bootstrapComponents.length > 0) {
          moduleRef._bootstrapComponents.forEach((f) => appRef.bootstrap(f));
        } else if (moduleRef.instance.ngDoBootstrap) {
          moduleRef.instance.ngDoBootstrap(appRef);
        } else {
          throw new RuntimeError(-403, false);
        }
        this._modules.push(moduleRef);
      }
      /**
       * Registers a listener to be called when the platform is destroyed.
       */
      onDestroy(callback) {
        this._destroyListeners.push(callback);
      }
      /**
       * Retrieves the platform {@link Injector}, which is the parent injector for
       * every Angular application on the page and provides singleton providers.
       */
      get injector() {
        return this._injector;
      }
      /**
       * Destroys the current Angular platform and all Angular applications on the page.
       * Destroys all modules and listeners registered with the platform.
       */
      destroy() {
        if (this._destroyed) {
          throw new RuntimeError(404, false);
        }
        this._modules.slice().forEach((module) => module.destroy());
        this._destroyListeners.forEach((listener) => listener());
        const destroyListeners = this._injector.get(PLATFORM_DESTROY_LISTENERS, null);
        if (destroyListeners) {
          destroyListeners.forEach((listener) => listener());
          destroyListeners.clear();
        }
        this._destroyed = true;
      }
      /**
       * Indicates whether this instance was destroyed.
       */
      get destroyed() {
        return this._destroyed;
      }
    }
    PlatformRef3.ɵfac = function PlatformRef_Factory(t) {
      return new (t || PlatformRef3)(ɵɵinject(Injector));
    };
    PlatformRef3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: PlatformRef3,
      factory: PlatformRef3.ɵfac,
      providedIn: "platform"
    });
    return PlatformRef3;
  })();
  return PlatformRef2;
})();
function getNgZoneOptions(options) {
  return {
    enableLongStackTrace: false ? false : false,
    shouldCoalesceEventChangeDetection: !!(options && options.ngZoneEventCoalescing) || false,
    shouldCoalesceRunChangeDetection: !!(options && options.ngZoneRunCoalescing) || false
  };
}
function getNgZone(ngZoneToUse, options) {
  let ngZone;
  if (ngZoneToUse === "noop") {
    ngZone = new NoopNgZone();
  } else {
    ngZone = (ngZoneToUse === "zone.js" ? void 0 : ngZoneToUse) || new NgZone(options);
  }
  return ngZone;
}
function _callAndReportToErrorHandler(errorHandler2, ngZone, callback) {
  try {
    const result = callback();
    if (isPromise(result)) {
      return result.catch((e) => {
        ngZone.runOutsideAngular(() => errorHandler2.handleError(e));
        throw e;
      });
    }
    return result;
  } catch (e) {
    ngZone.runOutsideAngular(() => errorHandler2.handleError(e));
    throw e;
  }
}
function optionsReducer(dst, objs) {
  if (Array.isArray(objs)) {
    dst = objs.reduce(optionsReducer, dst);
  } else {
    dst = Object.assign(Object.assign({}, dst), objs);
  }
  return dst;
}
let ApplicationRef = /* @__PURE__ */ (() => {
  let ApplicationRef2 = /* @__PURE__ */ (() => {
    class ApplicationRef3 {
      /**
       * Indicates whether this instance was destroyed.
       */
      get destroyed() {
        return this._destroyed;
      }
      /**
       * The `EnvironmentInjector` used to create this application.
       */
      get injector() {
        return this._injector;
      }
      /** @internal */
      constructor(_zone, _injector, _exceptionHandler) {
        this._zone = _zone;
        this._injector = _injector;
        this._exceptionHandler = _exceptionHandler;
        this._bootstrapListeners = [];
        this._views = [];
        this._runningTick = false;
        this._stable = true;
        this._destroyed = false;
        this._destroyListeners = [];
        this.componentTypes = [];
        this.components = [];
        this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
          next: () => {
            this._zone.run(() => {
              this.tick();
            });
          }
        });
        const isCurrentlyStable = new Observable((observer) => {
          this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks;
          this._zone.runOutsideAngular(() => {
            observer.next(this._stable);
            observer.complete();
          });
        });
        const isStable = new Observable((observer) => {
          let stableSub;
          this._zone.runOutsideAngular(() => {
            stableSub = this._zone.onStable.subscribe(() => {
              NgZone.assertNotInAngularZone();
              scheduleMicroTask$2(() => {
                if (!this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks) {
                  this._stable = true;
                  observer.next(true);
                }
              });
            });
          });
          const unstableSub = this._zone.onUnstable.subscribe(() => {
            NgZone.assertInAngularZone();
            if (this._stable) {
              this._stable = false;
              this._zone.runOutsideAngular(() => {
                observer.next(false);
              });
            }
          });
          return () => {
            stableSub.unsubscribe();
            unstableSub.unsubscribe();
          };
        });
        this.isStable = merge$1(isCurrentlyStable, isStable.pipe(share()));
      }
      /**
       * Bootstrap a component onto the element identified by its selector or, optionally, to a
       * specified element.
       *
       * @usageNotes
       * ### Bootstrap process
       *
       * When bootstrapping a component, Angular mounts it onto a target DOM element
       * and kicks off automatic change detection. The target DOM element can be
       * provided using the `rootSelectorOrNode` argument.
       *
       * If the target DOM element is not provided, Angular tries to find one on a page
       * using the `selector` of the component that is being bootstrapped
       * (first matched element is used).
       *
       * ### Example
       *
       * Generally, we define the component to bootstrap in the `bootstrap` array of `NgModule`,
       * but it requires us to know the component while writing the application code.
       *
       * Imagine a situation where we have to wait for an API call to decide about the component to
       * bootstrap. We can use the `ngDoBootstrap` hook of the `NgModule` and call this method to
       * dynamically bootstrap a component.
       *
       * {@example core/ts/platform/platform.ts region='componentSelector'}
       *
       * Optionally, a component can be mounted onto a DOM element that does not match the
       * selector of the bootstrapped component.
       *
       * In the following example, we are providing a CSS selector to match the target element.
       *
       * {@example core/ts/platform/platform.ts region='cssSelector'}
       *
       * While in this example, we are providing reference to a DOM node.
       *
       * {@example core/ts/platform/platform.ts region='domNode'}
       */
      bootstrap(componentOrFactory, rootSelectorOrNode) {
        NG_DEV_MODE$d && this.warnIfDestroyed();
        const isComponentFactory = componentOrFactory instanceof ComponentFactory$1;
        const initStatus = this._injector.get(ApplicationInitStatus);
        if (!initStatus.done) {
          const standalone = !isComponentFactory && isStandalone(componentOrFactory);
          const errorMessage = "Cannot bootstrap as there are still asynchronous initializers running." + (standalone ? "" : " Bootstrap components in the `ngDoBootstrap` method of the root module.");
          throw new RuntimeError(405, NG_DEV_MODE$d && errorMessage);
        }
        let componentFactory;
        if (isComponentFactory) {
          componentFactory = componentOrFactory;
        } else {
          const resolver = this._injector.get(ComponentFactoryResolver$1);
          componentFactory = resolver.resolveComponentFactory(componentOrFactory);
        }
        this.componentTypes.push(componentFactory.componentType);
        const ngModule = isBoundToModule(componentFactory) ? void 0 : this._injector.get(NgModuleRef$1);
        const selectorOrNode = rootSelectorOrNode || componentFactory.selector;
        const compRef = componentFactory.create(Injector.NULL, [], selectorOrNode, ngModule);
        const nativeElement = compRef.location.nativeElement;
        const testability = compRef.injector.get(TESTABILITY, null);
        testability === null || testability === void 0 ? void 0 : testability.registerApplication(nativeElement);
        compRef.onDestroy(() => {
          this.detachView(compRef.hostView);
          remove(this.components, compRef);
          testability === null || testability === void 0 ? void 0 : testability.unregisterApplication(nativeElement);
        });
        this._loadComponent(compRef);
        if (false) {
          const _console = this._injector.get(Console);
          _console.log(`Angular is running in development mode. Call enableProdMode() to enable production mode.`);
        }
        return compRef;
      }
      /**
       * Invoke this method to explicitly process change detection and its side-effects.
       *
       * In development mode, `tick()` also performs a second change detection cycle to ensure that no
       * further changes are detected. If additional changes are picked up during this second cycle,
       * bindings in the app have side-effects that cannot be resolved in a single change detection
       * pass.
       * In this case, Angular throws an error, since an Angular application can only have one change
       * detection pass during which all change detection must complete.
       */
      tick() {
        NG_DEV_MODE$d && this.warnIfDestroyed();
        if (this._runningTick) {
          throw new RuntimeError(101, false);
        }
        try {
          this._runningTick = true;
          for (let view of this._views) {
            view.detectChanges();
          }
          if (false) {
            for (let view of this._views) {
              view.checkNoChanges();
            }
          }
        } catch (e) {
          this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(e));
        } finally {
          this._runningTick = false;
        }
      }
      /**
       * Attaches a view so that it will be dirty checked.
       * The view will be automatically detached when it is destroyed.
       * This will throw if the view is already attached to a ViewContainer.
       */
      attachView(viewRef) {
        NG_DEV_MODE$d && this.warnIfDestroyed();
        const view = viewRef;
        this._views.push(view);
        view.attachToAppRef(this);
      }
      /**
       * Detaches a view from dirty checking again.
       */
      detachView(viewRef) {
        NG_DEV_MODE$d && this.warnIfDestroyed();
        const view = viewRef;
        remove(this._views, view);
        view.detachFromAppRef();
      }
      _loadComponent(componentRef) {
        this.attachView(componentRef.hostView);
        this.tick();
        this.components.push(componentRef);
        const listeners = this._injector.get(APP_BOOTSTRAP_LISTENER, []);
        if (false) {
          throw new RuntimeError(-209, `Unexpected type of the \`APP_BOOTSTRAP_LISTENER\` token value (expected an array, but got ${typeof listeners}). Please check that the \`APP_BOOTSTRAP_LISTENER\` token is configured as a \`multi: true\` provider.`);
        }
        listeners.push(...this._bootstrapListeners);
        listeners.forEach((listener) => listener(componentRef));
      }
      /** @internal */
      ngOnDestroy() {
        if (this._destroyed)
          return;
        try {
          this._destroyListeners.forEach((listener) => listener());
          this._views.slice().forEach((view) => view.destroy());
          this._onMicrotaskEmptySubscription.unsubscribe();
        } finally {
          this._destroyed = true;
          this._views = [];
          this._bootstrapListeners = [];
          this._destroyListeners = [];
        }
      }
      /**
       * Registers a listener to be called when an instance is destroyed.
       *
       * @param callback A callback function to add as a listener.
       * @returns A function which unregisters a listener.
       *
       * @internal
       */
      onDestroy(callback) {
        NG_DEV_MODE$d && this.warnIfDestroyed();
        this._destroyListeners.push(callback);
        return () => remove(this._destroyListeners, callback);
      }
      /**
       * Destroys an Angular application represented by this `ApplicationRef`. Calling this function
       * will destroy the associated environment injectors as well as all the bootstrapped components
       * with their views.
       */
      destroy() {
        if (this._destroyed) {
          throw new RuntimeError(406, false);
        }
        const injector = this._injector;
        if (injector.destroy && !injector.destroyed) {
          injector.destroy();
        }
      }
      /**
       * Returns the number of attached views.
       */
      get viewCount() {
        return this._views.length;
      }
      warnIfDestroyed() {
        if (NG_DEV_MODE$d && this._destroyed) {
          console.warn(formatRuntimeError(406, "This instance of the `ApplicationRef` has already been destroyed."));
        }
      }
    }
    ApplicationRef3.ɵfac = function ApplicationRef_Factory(t) {
      return new (t || ApplicationRef3)(ɵɵinject(NgZone), ɵɵinject(EnvironmentInjector), ɵɵinject(ErrorHandler));
    };
    ApplicationRef3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: ApplicationRef3,
      factory: ApplicationRef3.ɵfac,
      providedIn: "root"
    });
    return ApplicationRef3;
  })();
  return ApplicationRef2;
})();
function remove(list, el) {
  const index = list.indexOf(el);
  if (index > -1) {
    list.splice(index, 1);
  }
}
function _lastDefined$1(args) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (args[i] !== void 0) {
      return args[i];
    }
  }
  return void 0;
}
function _mergeArrays$1(parts) {
  const result = [];
  parts.forEach((part) => part && result.push(...part));
  return result;
}
function enableProdMode() {
  if (false) {
    _global["ngDevMode"] = false;
  }
}
let ChangeDetectorRef = /* @__PURE__ */ (() => {
  let ChangeDetectorRef2 = /* @__PURE__ */ (() => {
    class ChangeDetectorRef3 {
    }
    ChangeDetectorRef3.__NG_ELEMENT_ID__ = injectChangeDetectorRef;
    return ChangeDetectorRef3;
  })();
  return ChangeDetectorRef2;
})();
function injectChangeDetectorRef(flags) {
  return createViewRef(
    getCurrentTNode(),
    getLView(),
    (flags & 16) === 16
    /* InternalInjectFlags.ForPipe */
  );
}
function createViewRef(tNode, lView, isPipe) {
  if (isComponentHost(tNode) && !isPipe) {
    const componentView = getComponentLViewByIndex(tNode.index, lView);
    return new ViewRef$1(componentView, componentView);
  } else if (tNode.type & (3 | 12 | 32)) {
    const hostComponentView = lView[DECLARATION_COMPONENT_VIEW];
    return new ViewRef$1(hostComponentView, lView);
  }
  return null;
}
const platformCore = /* @__PURE__ */ createPlatformFactory(null, "core", []);
let ApplicationModule = /* @__PURE__ */ (() => {
  let ApplicationModule2 = /* @__PURE__ */ (() => {
    class ApplicationModule3 {
      // Inject ApplicationRef to make it eager...
      constructor(appRef) {
      }
    }
    ApplicationModule3.ɵfac = function ApplicationModule_Factory(t) {
      return new (t || ApplicationModule3)(ɵɵinject(ApplicationRef));
    };
    ApplicationModule3.ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
      type: ApplicationModule3
    });
    ApplicationModule3.ɵinj = /* @__PURE__ */ ɵɵdefineInjector({});
    return ApplicationModule3;
  })();
  return ApplicationModule2;
})();
function coerceToBoolean(value) {
  return typeof value === "boolean" ? value : value != null && value !== "false";
}
if (false) {
  _global.$localize = _global.$localize || function() {
    throw new Error("It looks like your application or one of its dependencies is using i18n.\nAngular 9 introduced a global `$localize()` function that needs to be loaded.\nPlease run `ng add @angular/localize` from the Angular CLI.\n(For non-CLI projects, add `import '@angular/localize/init';` to your `polyfills.ts` file.\nFor server-side rendering applications add the import to your `main.server.ts` file.)");
  };
}
let _DOM = null;
function getDOM() {
  return _DOM;
}
function setRootDomAdapter(adapter) {
  if (!_DOM) {
    _DOM = adapter;
  }
}
class DomAdapter {
}
const DOCUMENT = /* @__PURE__ */ new InjectionToken("DocumentToken");
let PlatformLocation = /* @__PURE__ */ (() => {
  let PlatformLocation2 = /* @__PURE__ */ (() => {
    class PlatformLocation3 {
      historyGo(relativePosition) {
        throw new Error("Not implemented");
      }
    }
    PlatformLocation3.ɵfac = function PlatformLocation_Factory(t) {
      return new (t || PlatformLocation3)();
    };
    PlatformLocation3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: PlatformLocation3,
      factory: function() {
        return useBrowserPlatformLocation();
      },
      providedIn: "platform"
    });
    return PlatformLocation3;
  })();
  return PlatformLocation2;
})();
function useBrowserPlatformLocation() {
  return ɵɵinject(BrowserPlatformLocation);
}
const LOCATION_INITIALIZED = /* @__PURE__ */ new InjectionToken("Location Initialized");
let BrowserPlatformLocation = /* @__PURE__ */ (() => {
  let BrowserPlatformLocation2 = /* @__PURE__ */ (() => {
    class BrowserPlatformLocation3 extends PlatformLocation {
      constructor(_doc) {
        super();
        this._doc = _doc;
        this._location = window.location;
        this._history = window.history;
      }
      getBaseHrefFromDOM() {
        return getDOM().getBaseHref(this._doc);
      }
      onPopState(fn) {
        const window2 = getDOM().getGlobalEventTarget(this._doc, "window");
        window2.addEventListener("popstate", fn, false);
        return () => window2.removeEventListener("popstate", fn);
      }
      onHashChange(fn) {
        const window2 = getDOM().getGlobalEventTarget(this._doc, "window");
        window2.addEventListener("hashchange", fn, false);
        return () => window2.removeEventListener("hashchange", fn);
      }
      get href() {
        return this._location.href;
      }
      get protocol() {
        return this._location.protocol;
      }
      get hostname() {
        return this._location.hostname;
      }
      get port() {
        return this._location.port;
      }
      get pathname() {
        return this._location.pathname;
      }
      get search() {
        return this._location.search;
      }
      get hash() {
        return this._location.hash;
      }
      set pathname(newPath) {
        this._location.pathname = newPath;
      }
      pushState(state, title, url2) {
        if (supportsState()) {
          this._history.pushState(state, title, url2);
        } else {
          this._location.hash = url2;
        }
      }
      replaceState(state, title, url2) {
        if (supportsState()) {
          this._history.replaceState(state, title, url2);
        } else {
          this._location.hash = url2;
        }
      }
      forward() {
        this._history.forward();
      }
      back() {
        this._history.back();
      }
      historyGo(relativePosition = 0) {
        this._history.go(relativePosition);
      }
      getState() {
        return this._history.state;
      }
    }
    BrowserPlatformLocation3.ɵfac = function BrowserPlatformLocation_Factory(t) {
      return new (t || BrowserPlatformLocation3)(ɵɵinject(DOCUMENT));
    };
    BrowserPlatformLocation3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: BrowserPlatformLocation3,
      factory: function() {
        return createBrowserPlatformLocation();
      },
      providedIn: "platform"
    });
    return BrowserPlatformLocation3;
  })();
  return BrowserPlatformLocation2;
})();
function supportsState() {
  return !!window.history.pushState;
}
function createBrowserPlatformLocation() {
  return new BrowserPlatformLocation(ɵɵinject(DOCUMENT));
}
function joinWithSlash(start, end) {
  if (start.length == 0) {
    return end;
  }
  if (end.length == 0) {
    return start;
  }
  let slashes = 0;
  if (start.endsWith("/")) {
    slashes++;
  }
  if (end.startsWith("/")) {
    slashes++;
  }
  if (slashes == 2) {
    return start + end.substring(1);
  }
  if (slashes == 1) {
    return start + end;
  }
  return start + "/" + end;
}
function stripTrailingSlash(url2) {
  const match2 = url2.match(/#|\?|$/);
  const pathEndIdx = match2 && match2.index || url2.length;
  const droppedSlashIdx = pathEndIdx - (url2[pathEndIdx - 1] === "/" ? 1 : 0);
  return url2.slice(0, droppedSlashIdx) + url2.slice(pathEndIdx);
}
function normalizeQueryParams(params) {
  return params && params[0] !== "?" ? "?" + params : params;
}
let LocationStrategy = /* @__PURE__ */ (() => {
  let LocationStrategy2 = /* @__PURE__ */ (() => {
    class LocationStrategy3 {
      historyGo(relativePosition) {
        throw new Error("Not implemented");
      }
    }
    LocationStrategy3.ɵfac = function LocationStrategy_Factory(t) {
      return new (t || LocationStrategy3)();
    };
    LocationStrategy3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: LocationStrategy3,
      factory: function() {
        return (() => inject(PathLocationStrategy))();
      },
      providedIn: "root"
    });
    return LocationStrategy3;
  })();
  return LocationStrategy2;
})();
const APP_BASE_HREF = /* @__PURE__ */ new InjectionToken("appBaseHref");
let PathLocationStrategy = /* @__PURE__ */ (() => {
  let PathLocationStrategy2 = /* @__PURE__ */ (() => {
    class PathLocationStrategy3 extends LocationStrategy {
      constructor(_platformLocation, href) {
        var _a, _b, _c;
        super();
        this._platformLocation = _platformLocation;
        this._removeListenerFns = [];
        this._baseHref = (_c = (_a = href !== null && href !== void 0 ? href : this._platformLocation.getBaseHrefFromDOM()) !== null && _a !== void 0 ? _a : (_b = inject(DOCUMENT).location) === null || _b === void 0 ? void 0 : _b.origin) !== null && _c !== void 0 ? _c : "";
      }
      /** @nodoc */
      ngOnDestroy() {
        while (this._removeListenerFns.length) {
          this._removeListenerFns.pop()();
        }
      }
      onPopState(fn) {
        this._removeListenerFns.push(this._platformLocation.onPopState(fn), this._platformLocation.onHashChange(fn));
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(internal) {
        return joinWithSlash(this._baseHref, internal);
      }
      path(includeHash = false) {
        const pathname = this._platformLocation.pathname + normalizeQueryParams(this._platformLocation.search);
        const hash = this._platformLocation.hash;
        return hash && includeHash ? `${pathname}${hash}` : pathname;
      }
      pushState(state, title, url2, queryParams) {
        const externalUrl = this.prepareExternalUrl(url2 + normalizeQueryParams(queryParams));
        this._platformLocation.pushState(state, title, externalUrl);
      }
      replaceState(state, title, url2, queryParams) {
        const externalUrl = this.prepareExternalUrl(url2 + normalizeQueryParams(queryParams));
        this._platformLocation.replaceState(state, title, externalUrl);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(relativePosition = 0) {
        var _a, _b;
        (_b = (_a = this._platformLocation).historyGo) === null || _b === void 0 ? void 0 : _b.call(_a, relativePosition);
      }
    }
    PathLocationStrategy3.ɵfac = function PathLocationStrategy_Factory(t) {
      return new (t || PathLocationStrategy3)(ɵɵinject(PlatformLocation), ɵɵinject(APP_BASE_HREF, 8));
    };
    PathLocationStrategy3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: PathLocationStrategy3,
      factory: PathLocationStrategy3.ɵfac,
      providedIn: "root"
    });
    return PathLocationStrategy3;
  })();
  return PathLocationStrategy2;
})();
let Location = /* @__PURE__ */ (() => {
  let Location2 = /* @__PURE__ */ (() => {
    class Location3 {
      constructor(locationStrategy) {
        this._subject = new EventEmitter();
        this._urlChangeListeners = [];
        this._urlChangeSubscription = null;
        this._locationStrategy = locationStrategy;
        const baseHref = this._locationStrategy.getBaseHref();
        this._basePath = _stripOrigin(stripTrailingSlash(_stripIndexHtml(baseHref)));
        this._locationStrategy.onPopState((ev) => {
          this._subject.emit({
            "url": this.path(true),
            "pop": true,
            "state": ev.state,
            "type": ev.type
          });
        });
      }
      /** @nodoc */
      ngOnDestroy() {
        var _a;
        (_a = this._urlChangeSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        this._urlChangeListeners = [];
      }
      /**
       * Normalizes the URL path for this location.
       *
       * @param includeHash True to include an anchor fragment in the path.
       *
       * @returns The normalized URL path.
       */
      // TODO: vsavkin. Remove the boolean flag and always include hash once the deprecated router is
      // removed.
      path(includeHash = false) {
        return this.normalize(this._locationStrategy.path(includeHash));
      }
      /**
       * Reports the current state of the location history.
       * @returns The current value of the `history.state` object.
       */
      getState() {
        return this._locationStrategy.getState();
      }
      /**
       * Normalizes the given path and compares to the current normalized path.
       *
       * @param path The given URL path.
       * @param query Query parameters.
       *
       * @returns True if the given URL path is equal to the current normalized path, false
       * otherwise.
       */
      isCurrentPathEqualTo(path, query = "") {
        return this.path() == this.normalize(path + normalizeQueryParams(query));
      }
      /**
       * Normalizes a URL path by stripping any trailing slashes.
       *
       * @param url String representing a URL.
       *
       * @returns The normalized URL string.
       */
      normalize(url2) {
        return Location3.stripTrailingSlash(_stripBasePath(this._basePath, _stripIndexHtml(url2)));
      }
      /**
       * Normalizes an external URL path.
       * If the given URL doesn't begin with a leading slash (`'/'`), adds one
       * before normalizing. Adds a hash if `HashLocationStrategy` is
       * in use, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
       *
       * @param url String representing a URL.
       *
       * @returns  A normalized platform-specific URL.
       */
      prepareExternalUrl(url2) {
        if (url2 && url2[0] !== "/") {
          url2 = "/" + url2;
        }
        return this._locationStrategy.prepareExternalUrl(url2);
      }
      // TODO: rename this method to pushState
      /**
       * Changes the browser's URL to a normalized version of a given URL, and pushes a
       * new item onto the platform's history.
       *
       * @param path  URL path to normalize.
       * @param query Query parameters.
       * @param state Location history state.
       *
       */
      go(path, query = "", state = null) {
        this._locationStrategy.pushState(state, "", path, query);
        this._notifyUrlChangeListeners(this.prepareExternalUrl(path + normalizeQueryParams(query)), state);
      }
      /**
       * Changes the browser's URL to a normalized version of the given URL, and replaces
       * the top item on the platform's history stack.
       *
       * @param path  URL path to normalize.
       * @param query Query parameters.
       * @param state Location history state.
       */
      replaceState(path, query = "", state = null) {
        this._locationStrategy.replaceState(state, "", path, query);
        this._notifyUrlChangeListeners(this.prepareExternalUrl(path + normalizeQueryParams(query)), state);
      }
      /**
       * Navigates forward in the platform's history.
       */
      forward() {
        this._locationStrategy.forward();
      }
      /**
       * Navigates back in the platform's history.
       */
      back() {
        this._locationStrategy.back();
      }
      /**
       * Navigate to a specific page from session history, identified by its relative position to the
       * current page.
       *
       * @param relativePosition  Position of the target page in the history relative to the current
       *     page.
       * A negative value moves backwards, a positive value moves forwards, e.g. `location.historyGo(2)`
       * moves forward two pages and `location.historyGo(-2)` moves back two pages. When we try to go
       * beyond what's stored in the history session, we stay in the current page. Same behaviour occurs
       * when `relativePosition` equals 0.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/History_API#Moving_to_a_specific_point_in_history
       */
      historyGo(relativePosition = 0) {
        var _a, _b;
        (_b = (_a = this._locationStrategy).historyGo) === null || _b === void 0 ? void 0 : _b.call(_a, relativePosition);
      }
      /**
       * Registers a URL change listener. Use to catch updates performed by the Angular
       * framework that are not detectible through "popstate" or "hashchange" events.
       *
       * @param fn The change handler function, which take a URL and a location history state.
       * @returns A function that, when executed, unregisters a URL change listener.
       */
      onUrlChange(fn) {
        this._urlChangeListeners.push(fn);
        if (!this._urlChangeSubscription) {
          this._urlChangeSubscription = this.subscribe((v) => {
            this._notifyUrlChangeListeners(v.url, v.state);
          });
        }
        return () => {
          var _a;
          const fnIndex = this._urlChangeListeners.indexOf(fn);
          this._urlChangeListeners.splice(fnIndex, 1);
          if (this._urlChangeListeners.length === 0) {
            (_a = this._urlChangeSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
            this._urlChangeSubscription = null;
          }
        };
      }
      /** @internal */
      _notifyUrlChangeListeners(url2 = "", state) {
        this._urlChangeListeners.forEach((fn) => fn(url2, state));
      }
      /**
       * Subscribes to the platform's `popState` events.
       *
       * Note: `Location.go()` does not trigger the `popState` event in the browser. Use
       * `Location.onUrlChange()` to subscribe to URL changes instead.
       *
       * @param value Event that is triggered when the state history changes.
       * @param exception The exception to throw.
       *
       * @see [onpopstate](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate)
       *
       * @returns Subscribed events.
       */
      subscribe(onNext, onThrow, onReturn) {
        return this._subject.subscribe({
          next: onNext,
          error: onThrow,
          complete: onReturn
        });
      }
    }
    Location3.normalizeQueryParams = normalizeQueryParams;
    Location3.joinWithSlash = joinWithSlash;
    Location3.stripTrailingSlash = stripTrailingSlash;
    Location3.ɵfac = function Location_Factory(t) {
      return new (t || Location3)(ɵɵinject(LocationStrategy));
    };
    Location3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: Location3,
      factory: function() {
        return createLocation();
      },
      providedIn: "root"
    });
    return Location3;
  })();
  return Location2;
})();
function createLocation() {
  return new Location(ɵɵinject(LocationStrategy));
}
function _stripBasePath(basePath, url2) {
  return basePath && new RegExp(`^${basePath}([/;?#]|$)`).test(url2) ? url2.substring(basePath.length) : url2;
}
function _stripIndexHtml(url2) {
  return url2.replace(/\/index.html$/, "");
}
function _stripOrigin(baseHref) {
  const isAbsoluteUrl2 = new RegExp("^(https?:)?//").test(baseHref);
  if (isAbsoluteUrl2) {
    const [, pathname] = baseHref.split(/\/\/[^\/]+/);
    return pathname;
  }
  return baseHref;
}
function parseCookieValue(cookieStr, name) {
  name = encodeURIComponent(name);
  for (const cookie of cookieStr.split(";")) {
    const eqIndex = cookie.indexOf("=");
    const [cookieName, cookieValue] = eqIndex == -1 ? [cookie, ""] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)];
    if (cookieName.trim() === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}
function invalidPipeArgumentError(type, value) {
  return new RuntimeError(2100, false);
}
class SubscribableStrategy {
  createSubscription(async, updateLatestValue) {
    return async.subscribe({
      next: updateLatestValue,
      error: (e) => {
        throw e;
      }
    });
  }
  dispose(subscription) {
    subscription.unsubscribe();
  }
}
class PromiseStrategy {
  createSubscription(async, updateLatestValue) {
    return async.then(updateLatestValue, (e) => {
      throw e;
    });
  }
  dispose(subscription) {
  }
}
const _promiseStrategy = /* @__PURE__ */ new PromiseStrategy();
const _subscribableStrategy = /* @__PURE__ */ new SubscribableStrategy();
let AsyncPipe = /* @__PURE__ */ (() => {
  let AsyncPipe2 = /* @__PURE__ */ (() => {
    class AsyncPipe3 {
      constructor(ref) {
        this._latestValue = null;
        this._subscription = null;
        this._obj = null;
        this._strategy = null;
        this._ref = ref;
      }
      ngOnDestroy() {
        if (this._subscription) {
          this._dispose();
        }
        this._ref = null;
      }
      transform(obj) {
        if (!this._obj) {
          if (obj) {
            this._subscribe(obj);
          }
          return this._latestValue;
        }
        if (obj !== this._obj) {
          this._dispose();
          return this.transform(obj);
        }
        return this._latestValue;
      }
      _subscribe(obj) {
        this._obj = obj;
        this._strategy = this._selectStrategy(obj);
        this._subscription = this._strategy.createSubscription(obj, (value) => this._updateLatestValue(obj, value));
      }
      _selectStrategy(obj) {
        if (isPromise(obj)) {
          return _promiseStrategy;
        }
        if (isSubscribable(obj)) {
          return _subscribableStrategy;
        }
        throw invalidPipeArgumentError(AsyncPipe3, obj);
      }
      _dispose() {
        this._strategy.dispose(this._subscription);
        this._latestValue = null;
        this._subscription = null;
        this._obj = null;
      }
      _updateLatestValue(async, value) {
        if (async === this._obj) {
          this._latestValue = value;
          this._ref.markForCheck();
        }
      }
    }
    AsyncPipe3.ɵfac = function AsyncPipe_Factory(t) {
      return new (t || AsyncPipe3)(ɵɵdirectiveInject(ChangeDetectorRef, 16));
    };
    AsyncPipe3.ɵpipe = /* @__PURE__ */ ɵɵdefinePipe({
      name: "async",
      type: AsyncPipe3,
      pure: false,
      standalone: true
    });
    return AsyncPipe3;
  })();
  return AsyncPipe2;
})();
let CommonModule = /* @__PURE__ */ (() => {
  let CommonModule2 = /* @__PURE__ */ (() => {
    class CommonModule3 {
    }
    CommonModule3.ɵfac = function CommonModule_Factory(t) {
      return new (t || CommonModule3)();
    };
    CommonModule3.ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
      type: CommonModule3
    });
    CommonModule3.ɵinj = /* @__PURE__ */ ɵɵdefineInjector({});
    return CommonModule3;
  })();
  return CommonModule2;
})();
const PLATFORM_SERVER_ID = "server";
let ViewportScroller = /* @__PURE__ */ (() => {
  let ViewportScroller2 = /* @__PURE__ */ (() => {
    class ViewportScroller3 {
    }
    ViewportScroller3.ɵprov = ɵɵdefineInjectable({
      token: ViewportScroller3,
      providedIn: "root",
      factory: () => new BrowserViewportScroller(ɵɵinject(DOCUMENT), window)
    });
    return ViewportScroller3;
  })();
  return ViewportScroller2;
})();
class BrowserViewportScroller {
  constructor(document2, window2) {
    this.document = document2;
    this.window = window2;
    this.offset = () => [0, 0];
  }
  /**
   * Configures the top offset used when scrolling to an anchor.
   * @param offset A position in screen coordinates (a tuple with x and y values)
   * or a function that returns the top offset position.
   *
   */
  setOffset(offset) {
    if (Array.isArray(offset)) {
      this.offset = () => offset;
    } else {
      this.offset = offset;
    }
  }
  /**
   * Retrieves the current scroll position.
   * @returns The position in screen coordinates.
   */
  getScrollPosition() {
    if (this.supportsScrolling()) {
      return [this.window.pageXOffset, this.window.pageYOffset];
    } else {
      return [0, 0];
    }
  }
  /**
   * Sets the scroll position.
   * @param position The new position in screen coordinates.
   */
  scrollToPosition(position) {
    if (this.supportsScrolling()) {
      this.window.scrollTo(position[0], position[1]);
    }
  }
  /**
   * Scrolls to an element and attempts to focus the element.
   *
   * Note that the function name here is misleading in that the target string may be an ID for a
   * non-anchor element.
   *
   * @param target The ID of an element or name of the anchor.
   *
   * @see https://html.spec.whatwg.org/#the-indicated-part-of-the-document
   * @see https://html.spec.whatwg.org/#scroll-to-fragid
   */
  scrollToAnchor(target) {
    if (!this.supportsScrolling()) {
      return;
    }
    const elSelected = findAnchorFromDocument(this.document, target);
    if (elSelected) {
      this.scrollToElement(elSelected);
      elSelected.focus();
    }
  }
  /**
   * Disables automatic scroll restoration provided by the browser.
   */
  setHistoryScrollRestoration(scrollRestoration) {
    if (this.supportScrollRestoration()) {
      const history = this.window.history;
      if (history && history.scrollRestoration) {
        history.scrollRestoration = scrollRestoration;
      }
    }
  }
  /**
   * Scrolls to an element using the native offset and the specified offset set on this scroller.
   *
   * The offset can be used when we know that there is a floating header and scrolling naively to an
   * element (ex: `scrollIntoView`) leaves the element hidden behind the floating header.
   */
  scrollToElement(el) {
    const rect = el.getBoundingClientRect();
    const left = rect.left + this.window.pageXOffset;
    const top = rect.top + this.window.pageYOffset;
    const offset = this.offset();
    this.window.scrollTo(left - offset[0], top - offset[1]);
  }
  /**
   * We only support scroll restoration when we can get a hold of window.
   * This means that we do not support this behavior when running in a web worker.
   *
   * Lifting this restriction right now would require more changes in the dom adapter.
   * Since webworkers aren't widely used, we will lift it once RouterScroller is
   * battle-tested.
   */
  supportScrollRestoration() {
    try {
      if (!this.supportsScrolling()) {
        return false;
      }
      const scrollRestorationDescriptor = getScrollRestorationProperty(this.window.history) || getScrollRestorationProperty(Object.getPrototypeOf(this.window.history));
      return !!scrollRestorationDescriptor && !!(scrollRestorationDescriptor.writable || scrollRestorationDescriptor.set);
    } catch (_a) {
      return false;
    }
  }
  supportsScrolling() {
    try {
      return !!this.window && !!this.window.scrollTo && "pageXOffset" in this.window;
    } catch (_a) {
      return false;
    }
  }
}
function getScrollRestorationProperty(obj) {
  return Object.getOwnPropertyDescriptor(obj, "scrollRestoration");
}
function findAnchorFromDocument(document2, target) {
  const documentResult = document2.getElementById(target) || document2.getElementsByName(target)[0];
  if (documentResult) {
    return documentResult;
  }
  if (typeof document2.createTreeWalker === "function" && document2.body && (document2.body.createShadowRoot || document2.body.attachShadow)) {
    const treeWalker = document2.createTreeWalker(document2.body, NodeFilter.SHOW_ELEMENT);
    let currentNode = treeWalker.currentNode;
    while (currentNode) {
      const shadowRoot = currentNode.shadowRoot;
      if (shadowRoot) {
        const result = shadowRoot.getElementById(target) || shadowRoot.querySelector(`[name="${target}"]`);
        if (result) {
          return result;
        }
      }
      currentNode = treeWalker.nextNode();
    }
  }
  return null;
}
class NullViewportScroller {
  /**
   * Empty implementation
   */
  setOffset(offset) {
  }
  /**
   * Empty implementation
   */
  getScrollPosition() {
    return [0, 0];
  }
  /**
   * Empty implementation
   */
  scrollToPosition(position) {
  }
  /**
   * Empty implementation
   */
  scrollToAnchor(anchor) {
  }
  /**
   * Empty implementation
   */
  setHistoryScrollRestoration(scrollRestoration) {
  }
}
class XhrFactory {
}
function isAbsoluteUrl$1(src) {
  return /^https?:\/\//.test(src);
}
function isValidPath(path) {
  const isString = typeof path === "string";
  if (!isString || path.trim() === "") {
    return false;
  }
  try {
    const url2 = new URL(path);
    return true;
  } catch (_a) {
    return false;
  }
}
function normalizePath(path) {
  return path.endsWith("/") ? path.slice(0, -1) : path;
}
function normalizeSrc(src) {
  return src.startsWith("/") ? src.slice(1) : src;
}
const noopImageLoader = (config) => config.src;
const IMAGE_LOADER = /* @__PURE__ */ new InjectionToken("ImageLoader", {
  providedIn: "root",
  factory: () => noopImageLoader
});
function createImageLoader(buildUrlFn, exampleUrls) {
  return function provideImageLoader(path) {
    if (!isValidPath(path)) {
      throwInvalidPathError(path, exampleUrls || []);
    }
    path = normalizePath(path);
    const loaderFn = (config) => {
      if (isAbsoluteUrl$1(config.src)) {
        throwUnexpectedAbsoluteUrlError(path, config.src);
      }
      return buildUrlFn(path, Object.assign(Object.assign({}, config), {
        src: normalizeSrc(config.src)
      }));
    };
    const providers = [{
      provide: IMAGE_LOADER,
      useValue: loaderFn
    }];
    return providers;
  };
}
function throwInvalidPathError(path, exampleUrls) {
  throw new RuntimeError(2959, false);
}
function throwUnexpectedAbsoluteUrlError(path, url2) {
  throw new RuntimeError(2959, false);
}
/* @__PURE__ */ createImageLoader(createCloudflareUrl, false ? ["https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>"] : void 0);
function createCloudflareUrl(path, config) {
  let params = `format=auto`;
  if (config.width) {
    params += `,width=${config.width}`;
  }
  return `${path}/cdn-cgi/image/${params}/${config.src}`;
}
/* @__PURE__ */ createImageLoader(createCloudinaryUrl, false ? ["https://res.cloudinary.com/mysite", "https://mysite.cloudinary.com", "https://subdomain.mysite.com"] : void 0);
function createCloudinaryUrl(path, config) {
  let params = `f_auto,q_auto`;
  if (config.width) {
    params += `,w_${config.width}`;
  }
  return `${path}/image/upload/${params}/${config.src}`;
}
/* @__PURE__ */ createImageLoader(createImagekitUrl, false ? ["https://ik.imagekit.io/mysite", "https://subdomain.mysite.com"] : void 0);
function createImagekitUrl(path, config) {
  let params = `tr:q-auto`;
  if (config.width) {
    params += `,w-${config.width}`;
  }
  return `${path}/${params}/${config.src}`;
}
/* @__PURE__ */ createImageLoader(createImgixUrl, false ? ["https://somepath.imgix.net/"] : void 0);
function createImgixUrl(path, config) {
  const url2 = new URL(`${path}/${config.src}`);
  url2.searchParams.set("auto", "format");
  if (config.width) {
    url2.searchParams.set("w", config.width.toString());
  }
  return url2.href;
}
class GenericBrowserDomAdapter extends DomAdapter {
  constructor() {
    super(...arguments);
    this.supportsDOMEvents = true;
  }
}
class BrowserDomAdapter extends GenericBrowserDomAdapter {
  static makeCurrent() {
    setRootDomAdapter(new BrowserDomAdapter());
  }
  onAndCancel(el, evt, listener) {
    el.addEventListener(evt, listener, false);
    return () => {
      el.removeEventListener(evt, listener, false);
    };
  }
  dispatchEvent(el, evt) {
    el.dispatchEvent(evt);
  }
  remove(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  createElement(tagName, doc) {
    doc = doc || this.getDefaultDocument();
    return doc.createElement(tagName);
  }
  createHtmlDocument() {
    return document.implementation.createHTMLDocument("fakeTitle");
  }
  getDefaultDocument() {
    return document;
  }
  isElementNode(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }
  isShadowRoot(node) {
    return node instanceof DocumentFragment;
  }
  /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
  getGlobalEventTarget(doc, target) {
    if (target === "window") {
      return window;
    }
    if (target === "document") {
      return doc;
    }
    if (target === "body") {
      return doc.body;
    }
    return null;
  }
  getBaseHref(doc) {
    const href = getBaseElementHref();
    return href == null ? null : relativePath(href);
  }
  resetBaseElement() {
    baseElement = null;
  }
  getUserAgent() {
    return window.navigator.userAgent;
  }
  getCookie(name) {
    return parseCookieValue(document.cookie, name);
  }
}
let baseElement = null;
function getBaseElementHref() {
  baseElement = baseElement || document.querySelector("base");
  return baseElement ? baseElement.getAttribute("href") : null;
}
let urlParsingNode;
function relativePath(url2) {
  urlParsingNode = urlParsingNode || document.createElement("a");
  urlParsingNode.setAttribute("href", url2);
  const pathName = urlParsingNode.pathname;
  return pathName.charAt(0) === "/" ? pathName : `/${pathName}`;
}
const TRANSITION_ID = /* @__PURE__ */ new InjectionToken("TRANSITION_ID");
function appInitializerFactory(transitionId, document2, injector) {
  return () => {
    injector.get(ApplicationInitStatus).donePromise.then(() => {
      const dom = getDOM();
      const styles = document2.querySelectorAll(`style[ng-transition="${transitionId}"]`);
      for (let i = 0; i < styles.length; i++) {
        dom.remove(styles[i]);
      }
    });
  };
}
const SERVER_TRANSITION_PROVIDERS = [{
  provide: APP_INITIALIZER,
  useFactory: appInitializerFactory,
  deps: [TRANSITION_ID, DOCUMENT, Injector],
  multi: true
}];
class BrowserGetTestability {
  addToWindow(registry) {
    _global["getAngularTestability"] = (elem, findInAncestors = true) => {
      const testability = registry.findTestabilityInTree(elem, findInAncestors);
      if (testability == null) {
        throw new Error("Could not find testability for element.");
      }
      return testability;
    };
    _global["getAllAngularTestabilities"] = () => registry.getAllTestabilities();
    _global["getAllAngularRootElements"] = () => registry.getAllRootElements();
    const whenAllStable = (callback) => {
      const testabilities = _global["getAllAngularTestabilities"]();
      let count = testabilities.length;
      let didWork = false;
      const decrement = function(didWork_) {
        didWork = didWork || didWork_;
        count--;
        if (count == 0) {
          callback(didWork);
        }
      };
      testabilities.forEach(function(testability) {
        testability.whenStable(decrement);
      });
    };
    if (!_global["frameworkStabilizers"]) {
      _global["frameworkStabilizers"] = [];
    }
    _global["frameworkStabilizers"].push(whenAllStable);
  }
  findTestabilityInTree(registry, elem, findInAncestors) {
    if (elem == null) {
      return null;
    }
    const t = registry.getTestability(elem);
    if (t != null) {
      return t;
    } else if (!findInAncestors) {
      return null;
    }
    if (getDOM().isShadowRoot(elem)) {
      return this.findTestabilityInTree(registry, elem.host, true);
    }
    return this.findTestabilityInTree(registry, elem.parentElement, true);
  }
}
let BrowserXhr = /* @__PURE__ */ (() => {
  let BrowserXhr2 = /* @__PURE__ */ (() => {
    class BrowserXhr3 {
      build() {
        return new XMLHttpRequest();
      }
    }
    BrowserXhr3.ɵfac = function BrowserXhr_Factory(t) {
      return new (t || BrowserXhr3)();
    };
    BrowserXhr3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: BrowserXhr3,
      factory: BrowserXhr3.ɵfac
    });
    return BrowserXhr3;
  })();
  return BrowserXhr2;
})();
const EVENT_MANAGER_PLUGINS = /* @__PURE__ */ new InjectionToken("EventManagerPlugins");
let EventManager = /* @__PURE__ */ (() => {
  let EventManager2 = /* @__PURE__ */ (() => {
    class EventManager3 {
      /**
       * Initializes an instance of the event-manager service.
       */
      constructor(plugins, _zone) {
        this._zone = _zone;
        this._eventNameToPlugin = /* @__PURE__ */ new Map();
        plugins.forEach((p) => p.manager = this);
        this._plugins = plugins.slice().reverse();
      }
      /**
       * Registers a handler for a specific element and event.
       *
       * @param element The HTML element to receive event notifications.
       * @param eventName The name of the event to listen for.
       * @param handler A function to call when the notification occurs. Receives the
       * event object as an argument.
       * @returns  A callback function that can be used to remove the handler.
       */
      addEventListener(element, eventName, handler) {
        const plugin = this._findPluginFor(eventName);
        return plugin.addEventListener(element, eventName, handler);
      }
      /**
       * Registers a global handler for an event in a target view.
       *
       * @param target A target for global event notifications. One of "window", "document", or "body".
       * @param eventName The name of the event to listen for.
       * @param handler A function to call when the notification occurs. Receives the
       * event object as an argument.
       * @returns A callback function that can be used to remove the handler.
       * @deprecated No longer being used in Ivy code. To be removed in version 14.
       */
      addGlobalEventListener(target, eventName, handler) {
        const plugin = this._findPluginFor(eventName);
        return plugin.addGlobalEventListener(target, eventName, handler);
      }
      /**
       * Retrieves the compilation zone in which event listeners are registered.
       */
      getZone() {
        return this._zone;
      }
      /** @internal */
      _findPluginFor(eventName) {
        const plugin = this._eventNameToPlugin.get(eventName);
        if (plugin) {
          return plugin;
        }
        const plugins = this._plugins;
        for (let i = 0; i < plugins.length; i++) {
          const plugin2 = plugins[i];
          if (plugin2.supports(eventName)) {
            this._eventNameToPlugin.set(eventName, plugin2);
            return plugin2;
          }
        }
        throw new Error(`No event manager plugin found for event ${eventName}`);
      }
    }
    EventManager3.ɵfac = function EventManager_Factory(t) {
      return new (t || EventManager3)(ɵɵinject(EVENT_MANAGER_PLUGINS), ɵɵinject(NgZone));
    };
    EventManager3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: EventManager3,
      factory: EventManager3.ɵfac
    });
    return EventManager3;
  })();
  return EventManager2;
})();
class EventManagerPlugin {
  constructor(_doc) {
    this._doc = _doc;
  }
  addGlobalEventListener(element, eventName, handler) {
    const target = getDOM().getGlobalEventTarget(this._doc, element);
    if (!target) {
      throw new Error(`Unsupported event target ${target} for event ${eventName}`);
    }
    return this.addEventListener(target, eventName, handler);
  }
}
let SharedStylesHost = /* @__PURE__ */ (() => {
  let SharedStylesHost2 = /* @__PURE__ */ (() => {
    class SharedStylesHost3 {
      constructor() {
        this._stylesSet = /* @__PURE__ */ new Set();
      }
      addStyles(styles) {
        const additions = /* @__PURE__ */ new Set();
        styles.forEach((style2) => {
          if (!this._stylesSet.has(style2)) {
            this._stylesSet.add(style2);
            additions.add(style2);
          }
        });
        this.onStylesAdded(additions);
      }
      onStylesAdded(additions) {
      }
      getAllStyles() {
        return Array.from(this._stylesSet);
      }
    }
    SharedStylesHost3.ɵfac = function SharedStylesHost_Factory(t) {
      return new (t || SharedStylesHost3)();
    };
    SharedStylesHost3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: SharedStylesHost3,
      factory: SharedStylesHost3.ɵfac
    });
    return SharedStylesHost3;
  })();
  return SharedStylesHost2;
})();
let DomSharedStylesHost = /* @__PURE__ */ (() => {
  let DomSharedStylesHost2 = /* @__PURE__ */ (() => {
    class DomSharedStylesHost3 extends SharedStylesHost {
      constructor(_doc) {
        super();
        this._doc = _doc;
        this._hostNodes = /* @__PURE__ */ new Map();
        this._hostNodes.set(_doc.head, []);
      }
      _addStylesToHost(styles, host, styleNodes) {
        styles.forEach((style2) => {
          const styleEl = this._doc.createElement("style");
          styleEl.textContent = style2;
          styleNodes.push(host.appendChild(styleEl));
        });
      }
      addHost(hostNode) {
        const styleNodes = [];
        this._addStylesToHost(this._stylesSet, hostNode, styleNodes);
        this._hostNodes.set(hostNode, styleNodes);
      }
      removeHost(hostNode) {
        const styleNodes = this._hostNodes.get(hostNode);
        if (styleNodes) {
          styleNodes.forEach(removeStyle);
        }
        this._hostNodes.delete(hostNode);
      }
      onStylesAdded(additions) {
        this._hostNodes.forEach((styleNodes, hostNode) => {
          this._addStylesToHost(additions, hostNode, styleNodes);
        });
      }
      ngOnDestroy() {
        this._hostNodes.forEach((styleNodes) => styleNodes.forEach(removeStyle));
      }
    }
    DomSharedStylesHost3.ɵfac = function DomSharedStylesHost_Factory(t) {
      return new (t || DomSharedStylesHost3)(ɵɵinject(DOCUMENT));
    };
    DomSharedStylesHost3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: DomSharedStylesHost3,
      factory: DomSharedStylesHost3.ɵfac
    });
    return DomSharedStylesHost3;
  })();
  return DomSharedStylesHost2;
})();
function removeStyle(styleNode) {
  getDOM().remove(styleNode);
}
const NAMESPACE_URIS = {
  "svg": "http://www.w3.org/2000/svg",
  "xhtml": "http://www.w3.org/1999/xhtml",
  "xlink": "http://www.w3.org/1999/xlink",
  "xml": "http://www.w3.org/XML/1998/namespace",
  "xmlns": "http://www.w3.org/2000/xmlns/",
  "math": "http://www.w3.org/1998/MathML/"
};
const COMPONENT_REGEX = /%COMP%/g;
const NG_DEV_MODE$1$1 = false;
const COMPONENT_VARIABLE = "%COMP%";
const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
function shimContentAttribute(componentShortId) {
  return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimHostAttribute(componentShortId) {
  return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function flattenStyles$1(compId, styles) {
  return styles.flat(100).map((s) => s.replace(COMPONENT_REGEX, compId));
}
function decoratePreventDefault(eventHandler) {
  return (event) => {
    if (event === "__ngUnwrap__") {
      return eventHandler;
    }
    const allowDefaultBehavior = eventHandler(event);
    if (allowDefaultBehavior === false) {
      event.preventDefault();
      event.returnValue = false;
    }
    return void 0;
  };
}
let DomRendererFactory2 = /* @__PURE__ */ (() => {
  let DomRendererFactory22 = /* @__PURE__ */ (() => {
    class DomRendererFactory23 {
      constructor(eventManager, sharedStylesHost, appId) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.appId = appId;
        this.rendererByCompId = /* @__PURE__ */ new Map();
        this.defaultRenderer = new DefaultDomRenderer2(eventManager);
      }
      createRenderer(element, type) {
        if (!element || !type) {
          return this.defaultRenderer;
        }
        switch (type.encapsulation) {
          case ViewEncapsulation$1.Emulated: {
            let renderer = this.rendererByCompId.get(type.id);
            if (!renderer) {
              renderer = new EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type, this.appId);
              this.rendererByCompId.set(type.id, renderer);
            }
            renderer.applyToHost(element);
            return renderer;
          }
          case ViewEncapsulation$1.ShadowDom:
            return new ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);
          default: {
            if (!this.rendererByCompId.has(type.id)) {
              const styles = flattenStyles$1(type.id, type.styles);
              this.sharedStylesHost.addStyles(styles);
              this.rendererByCompId.set(type.id, this.defaultRenderer);
            }
            return this.defaultRenderer;
          }
        }
      }
      begin() {
      }
      end() {
      }
    }
    DomRendererFactory23.ɵfac = function DomRendererFactory2_Factory(t) {
      return new (t || DomRendererFactory23)(ɵɵinject(EventManager), ɵɵinject(DomSharedStylesHost), ɵɵinject(APP_ID));
    };
    DomRendererFactory23.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: DomRendererFactory23,
      factory: DomRendererFactory23.ɵfac
    });
    return DomRendererFactory23;
  })();
  return DomRendererFactory22;
})();
class DefaultDomRenderer2 {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.data = /* @__PURE__ */ Object.create(null);
    this.destroyNode = null;
  }
  destroy() {
  }
  createElement(name, namespace) {
    if (namespace) {
      return document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
    }
    return document.createElement(name);
  }
  createComment(value) {
    return document.createComment(value);
  }
  createText(value) {
    return document.createTextNode(value);
  }
  appendChild(parent, newChild) {
    const targetParent = isTemplateNode$1(parent) ? parent.content : parent;
    targetParent.appendChild(newChild);
  }
  insertBefore(parent, newChild, refChild) {
    if (parent) {
      const targetParent = isTemplateNode$1(parent) ? parent.content : parent;
      targetParent.insertBefore(newChild, refChild);
    }
  }
  removeChild(parent, oldChild) {
    if (parent) {
      parent.removeChild(oldChild);
    }
  }
  selectRootElement(selectorOrNode, preserveContent) {
    let el = typeof selectorOrNode === "string" ? document.querySelector(selectorOrNode) : selectorOrNode;
    if (!el) {
      throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
    }
    if (!preserveContent) {
      el.textContent = "";
    }
    return el;
  }
  parentNode(node) {
    return node.parentNode;
  }
  nextSibling(node) {
    return node.nextSibling;
  }
  setAttribute(el, name, value, namespace) {
    if (namespace) {
      name = namespace + ":" + name;
      const namespaceUri = NAMESPACE_URIS[namespace];
      if (namespaceUri) {
        el.setAttributeNS(namespaceUri, name, value);
      } else {
        el.setAttribute(name, value);
      }
    } else {
      el.setAttribute(name, value);
    }
  }
  removeAttribute(el, name, namespace) {
    if (namespace) {
      const namespaceUri = NAMESPACE_URIS[namespace];
      if (namespaceUri) {
        el.removeAttributeNS(namespaceUri, name);
      } else {
        el.removeAttribute(`${namespace}:${name}`);
      }
    } else {
      el.removeAttribute(name);
    }
  }
  addClass(el, name) {
    el.classList.add(name);
  }
  removeClass(el, name) {
    el.classList.remove(name);
  }
  setStyle(el, style2, value, flags) {
    if (flags & (RendererStyleFlags2.DashCase | RendererStyleFlags2.Important)) {
      el.style.setProperty(style2, value, flags & RendererStyleFlags2.Important ? "important" : "");
    } else {
      el.style[style2] = value;
    }
  }
  removeStyle(el, style2, flags) {
    if (flags & RendererStyleFlags2.DashCase) {
      el.style.removeProperty(style2);
    } else {
      el.style[style2] = "";
    }
  }
  setProperty(el, name, value) {
    NG_DEV_MODE$1$1 && checkNoSyntheticProp$1(name, "property");
    el[name] = value;
  }
  setValue(node, value) {
    node.nodeValue = value;
  }
  listen(target, event, callback) {
    NG_DEV_MODE$1$1 && checkNoSyntheticProp$1(event, "listener");
    if (typeof target === "string") {
      return this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback));
    }
    return this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
  }
}
const AT_CHARCODE$1 = /* @__PURE__ */ (() => "@".charCodeAt(0))();
function checkNoSyntheticProp$1(name, nameKind) {
  if (name.charCodeAt(0) === AT_CHARCODE$1) {
    throw new Error(`Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Either \`BrowserAnimationsModule\` or \`NoopAnimationsModule\` are imported in your application.
  - There is corresponding configuration for the animation named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.io/api/core/Component#animations).`);
  }
}
function isTemplateNode$1(node) {
  return node.tagName === "TEMPLATE" && node.content !== void 0;
}
class EmulatedEncapsulationDomRenderer2 extends DefaultDomRenderer2 {
  constructor(eventManager, sharedStylesHost, component, appId) {
    super(eventManager);
    this.component = component;
    const styles = flattenStyles$1(appId + "-" + component.id, component.styles);
    sharedStylesHost.addStyles(styles);
    this.contentAttr = shimContentAttribute(appId + "-" + component.id);
    this.hostAttr = shimHostAttribute(appId + "-" + component.id);
  }
  applyToHost(element) {
    super.setAttribute(element, this.hostAttr, "");
  }
  createElement(parent, name) {
    const el = super.createElement(parent, name);
    super.setAttribute(el, this.contentAttr, "");
    return el;
  }
}
class ShadowDomRenderer extends DefaultDomRenderer2 {
  constructor(eventManager, sharedStylesHost, hostEl, component) {
    super(eventManager);
    this.sharedStylesHost = sharedStylesHost;
    this.hostEl = hostEl;
    this.shadowRoot = hostEl.attachShadow({
      mode: "open"
    });
    this.sharedStylesHost.addHost(this.shadowRoot);
    const styles = flattenStyles$1(component.id, component.styles);
    for (let i = 0; i < styles.length; i++) {
      const styleEl = document.createElement("style");
      styleEl.textContent = styles[i];
      this.shadowRoot.appendChild(styleEl);
    }
  }
  nodeOrShadowRoot(node) {
    return node === this.hostEl ? this.shadowRoot : node;
  }
  destroy() {
    this.sharedStylesHost.removeHost(this.shadowRoot);
  }
  appendChild(parent, newChild) {
    return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
  }
  insertBefore(parent, newChild, refChild) {
    return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
  }
  removeChild(parent, oldChild) {
    return super.removeChild(this.nodeOrShadowRoot(parent), oldChild);
  }
  parentNode(node) {
    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
  }
}
let DomEventsPlugin = /* @__PURE__ */ (() => {
  let DomEventsPlugin2 = /* @__PURE__ */ (() => {
    class DomEventsPlugin3 extends EventManagerPlugin {
      constructor(doc) {
        super(doc);
      }
      // This plugin should come last in the list of plugins, because it accepts all
      // events.
      supports(eventName) {
        return true;
      }
      addEventListener(element, eventName, handler) {
        element.addEventListener(eventName, handler, false);
        return () => this.removeEventListener(element, eventName, handler);
      }
      removeEventListener(target, eventName, callback) {
        return target.removeEventListener(eventName, callback);
      }
    }
    DomEventsPlugin3.ɵfac = function DomEventsPlugin_Factory(t) {
      return new (t || DomEventsPlugin3)(ɵɵinject(DOCUMENT));
    };
    DomEventsPlugin3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: DomEventsPlugin3,
      factory: DomEventsPlugin3.ɵfac
    });
    return DomEventsPlugin3;
  })();
  return DomEventsPlugin2;
})();
const MODIFIER_KEYS = ["alt", "control", "meta", "shift"];
const _keyMap = {
  "\b": "Backspace",
  "	": "Tab",
  "": "Delete",
  "\x1B": "Escape",
  "Del": "Delete",
  "Esc": "Escape",
  "Left": "ArrowLeft",
  "Right": "ArrowRight",
  "Up": "ArrowUp",
  "Down": "ArrowDown",
  "Menu": "ContextMenu",
  "Scroll": "ScrollLock",
  "Win": "OS"
};
const MODIFIER_KEY_GETTERS = {
  "alt": (event) => event.altKey,
  "control": (event) => event.ctrlKey,
  "meta": (event) => event.metaKey,
  "shift": (event) => event.shiftKey
};
let KeyEventsPlugin = /* @__PURE__ */ (() => {
  let KeyEventsPlugin2 = /* @__PURE__ */ (() => {
    class KeyEventsPlugin3 extends EventManagerPlugin {
      /**
       * Initializes an instance of the browser plug-in.
       * @param doc The document in which key events will be detected.
       */
      constructor(doc) {
        super(doc);
      }
      /**
       * Reports whether a named key event is supported.
       * @param eventName The event name to query.
       * @return True if the named key event is supported.
       */
      supports(eventName) {
        return KeyEventsPlugin3.parseEventName(eventName) != null;
      }
      /**
       * Registers a handler for a specific element and key event.
       * @param element The HTML element to receive event notifications.
       * @param eventName The name of the key event to listen for.
       * @param handler A function to call when the notification occurs. Receives the
       * event object as an argument.
       * @returns The key event that was registered.
       */
      addEventListener(element, eventName, handler) {
        const parsedEvent = KeyEventsPlugin3.parseEventName(eventName);
        const outsideHandler = KeyEventsPlugin3.eventCallback(parsedEvent["fullKey"], handler, this.manager.getZone());
        return this.manager.getZone().runOutsideAngular(() => {
          return getDOM().onAndCancel(element, parsedEvent["domEventName"], outsideHandler);
        });
      }
      /**
       * Parses the user provided full keyboard event definition and normalizes it for
       * later internal use. It ensures the string is all lowercase, converts special
       * characters to a standard spelling, and orders all the values consistently.
       *
       * @param eventName The name of the key event to listen for.
       * @returns an object with the full, normalized string, and the dom event name
       * or null in the case when the event doesn't match a keyboard event.
       */
      static parseEventName(eventName) {
        const parts = eventName.toLowerCase().split(".");
        const domEventName = parts.shift();
        if (parts.length === 0 || !(domEventName === "keydown" || domEventName === "keyup")) {
          return null;
        }
        const key = KeyEventsPlugin3._normalizeKey(parts.pop());
        let fullKey = "";
        let codeIX = parts.indexOf("code");
        if (codeIX > -1) {
          parts.splice(codeIX, 1);
          fullKey = "code.";
        }
        MODIFIER_KEYS.forEach((modifierName) => {
          const index = parts.indexOf(modifierName);
          if (index > -1) {
            parts.splice(index, 1);
            fullKey += modifierName + ".";
          }
        });
        fullKey += key;
        if (parts.length != 0 || key.length === 0) {
          return null;
        }
        const result = {};
        result["domEventName"] = domEventName;
        result["fullKey"] = fullKey;
        return result;
      }
      /**
       * Determines whether the actual keys pressed match the configured key code string.
       * The `fullKeyCode` event is normalized in the `parseEventName` method when the
       * event is attached to the DOM during the `addEventListener` call. This is unseen
       * by the end user and is normalized for internal consistency and parsing.
       *
       * @param event The keyboard event.
       * @param fullKeyCode The normalized user defined expected key event string
       * @returns boolean.
       */
      static matchEventFullKeyCode(event, fullKeyCode) {
        let keycode = _keyMap[event.key] || event.key;
        let key = "";
        if (fullKeyCode.indexOf("code.") > -1) {
          keycode = event.code;
          key = "code.";
        }
        if (keycode == null || !keycode)
          return false;
        keycode = keycode.toLowerCase();
        if (keycode === " ") {
          keycode = "space";
        } else if (keycode === ".") {
          keycode = "dot";
        }
        MODIFIER_KEYS.forEach((modifierName) => {
          if (modifierName !== keycode) {
            const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
            if (modifierGetter(event)) {
              key += modifierName + ".";
            }
          }
        });
        key += keycode;
        return key === fullKeyCode;
      }
      /**
       * Configures a handler callback for a key event.
       * @param fullKey The event name that combines all simultaneous keystrokes.
       * @param handler The function that responds to the key event.
       * @param zone The zone in which the event occurred.
       * @returns A callback function.
       */
      static eventCallback(fullKey, handler, zone) {
        return (event) => {
          if (KeyEventsPlugin3.matchEventFullKeyCode(event, fullKey)) {
            zone.runGuarded(() => handler(event));
          }
        };
      }
      /** @internal */
      static _normalizeKey(keyName) {
        switch (keyName) {
          case "esc":
            return "escape";
          default:
            return keyName;
        }
      }
    }
    KeyEventsPlugin3.ɵfac = function KeyEventsPlugin_Factory(t) {
      return new (t || KeyEventsPlugin3)(ɵɵinject(DOCUMENT));
    };
    KeyEventsPlugin3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: KeyEventsPlugin3,
      factory: KeyEventsPlugin3.ɵfac
    });
    return KeyEventsPlugin3;
  })();
  return KeyEventsPlugin2;
})();
const NG_DEV_MODE$c = false;
function errorHandler() {
  return new ErrorHandler();
}
const BROWSER_MODULE_PROVIDERS_MARKER = /* @__PURE__ */ new InjectionToken(NG_DEV_MODE$c ? "BrowserModule Providers Marker" : "");
const TESTABILITY_PROVIDERS = [{
  provide: TESTABILITY_GETTER,
  useClass: BrowserGetTestability,
  deps: []
}, {
  provide: TESTABILITY,
  useClass: Testability,
  deps: [NgZone, TestabilityRegistry, TESTABILITY_GETTER]
}, {
  provide: Testability,
  useClass: Testability,
  deps: [NgZone, TestabilityRegistry, TESTABILITY_GETTER]
}];
const BROWSER_MODULE_PROVIDERS = [{
  provide: INJECTOR_SCOPE,
  useValue: "root"
}, {
  provide: ErrorHandler,
  useFactory: errorHandler,
  deps: []
}, {
  provide: EVENT_MANAGER_PLUGINS,
  useClass: DomEventsPlugin,
  multi: true,
  deps: [DOCUMENT, NgZone, PLATFORM_ID]
}, {
  provide: EVENT_MANAGER_PLUGINS,
  useClass: KeyEventsPlugin,
  multi: true,
  deps: [DOCUMENT]
}, {
  provide: DomRendererFactory2,
  useClass: DomRendererFactory2,
  deps: [EventManager, DomSharedStylesHost, APP_ID]
}, {
  provide: RendererFactory2,
  useExisting: DomRendererFactory2
}, {
  provide: SharedStylesHost,
  useExisting: DomSharedStylesHost
}, {
  provide: DomSharedStylesHost,
  useClass: DomSharedStylesHost,
  deps: [DOCUMENT]
}, {
  provide: EventManager,
  useClass: EventManager,
  deps: [EVENT_MANAGER_PLUGINS, NgZone]
}, {
  provide: XhrFactory,
  useClass: BrowserXhr,
  deps: []
}, NG_DEV_MODE$c ? {
  provide: BROWSER_MODULE_PROVIDERS_MARKER,
  useValue: true
} : []];
let BrowserModule = /* @__PURE__ */ (() => {
  let BrowserModule2 = /* @__PURE__ */ (() => {
    class BrowserModule3 {
      constructor(providersAlreadyPresent) {
        if (NG_DEV_MODE$c && providersAlreadyPresent) {
          throw new Error(`Providers from the \`BrowserModule\` have already been loaded. If you need access to common directives such as NgIf and NgFor, import the \`CommonModule\` instead.`);
        }
      }
      /**
       * Configures a browser-based app to transition from a server-rendered app, if
       * one is present on the page.
       *
       * @param params An object containing an identifier for the app to transition.
       * The ID must match between the client and server versions of the app.
       * @returns The reconfigured `BrowserModule` to import into the app's root `AppModule`.
       */
      static withServerTransition(params) {
        return {
          ngModule: BrowserModule3,
          providers: [{
            provide: APP_ID,
            useValue: params.appId
          }, {
            provide: TRANSITION_ID,
            useExisting: APP_ID
          }, SERVER_TRANSITION_PROVIDERS]
        };
      }
    }
    BrowserModule3.ɵfac = function BrowserModule_Factory(t) {
      return new (t || BrowserModule3)(ɵɵinject(BROWSER_MODULE_PROVIDERS_MARKER, 12));
    };
    BrowserModule3.ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
      type: BrowserModule3
    });
    BrowserModule3.ɵinj = /* @__PURE__ */ ɵɵdefineInjector({
      providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS],
      imports: [CommonModule, ApplicationModule]
    });
    return BrowserModule3;
  })();
  return BrowserModule2;
})();
function createMeta() {
  return new Meta(ɵɵinject(DOCUMENT));
}
let Meta = /* @__PURE__ */ (() => {
  let Meta2 = /* @__PURE__ */ (() => {
    class Meta3 {
      constructor(_doc) {
        this._doc = _doc;
        this._dom = getDOM();
      }
      /**
       * Retrieves or creates a specific `<meta>` tag element in the current HTML document.
       * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
       * values in the provided tag definition, and verifies that all other attribute values are equal.
       * If an existing element is found, it is returned and is not modified in any way.
       * @param tag The definition of a `<meta>` element to match or create.
       * @param forceCreation True to create a new element without checking whether one already exists.
       * @returns The existing element with the same attributes and values if found,
       * the new element if no match is found, or `null` if the tag parameter is not defined.
       */
      addTag(tag, forceCreation = false) {
        if (!tag)
          return null;
        return this._getOrCreateElement(tag, forceCreation);
      }
      /**
       * Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
       * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
       * values in the provided tag definition, and verifies that all other attribute values are equal.
       * @param tags An array of tag definitions to match or create.
       * @param forceCreation True to create new elements without checking whether they already exist.
       * @returns The matching elements if found, or the new elements.
       */
      addTags(tags, forceCreation = false) {
        if (!tags)
          return [];
        return tags.reduce((result, tag) => {
          if (tag) {
            result.push(this._getOrCreateElement(tag, forceCreation));
          }
          return result;
        }, []);
      }
      /**
       * Retrieves a `<meta>` tag element in the current HTML document.
       * @param attrSelector The tag attribute and value to match against, in the format
       * `"tag_attribute='value string'"`.
       * @returns The matching element, if any.
       */
      getTag(attrSelector) {
        if (!attrSelector)
          return null;
        return this._doc.querySelector(`meta[${attrSelector}]`) || null;
      }
      /**
       * Retrieves a set of `<meta>` tag elements in the current HTML document.
       * @param attrSelector The tag attribute and value to match against, in the format
       * `"tag_attribute='value string'"`.
       * @returns The matching elements, if any.
       */
      getTags(attrSelector) {
        if (!attrSelector)
          return [];
        const list = this._doc.querySelectorAll(`meta[${attrSelector}]`);
        return list ? [].slice.call(list) : [];
      }
      /**
       * Modifies an existing `<meta>` tag element in the current HTML document.
       * @param tag The tag description with which to replace the existing tag content.
       * @param selector A tag attribute and value to match against, to identify
       * an existing tag. A string in the format `"tag_attribute=`value string`"`.
       * If not supplied, matches a tag with the same `name` or `property` attribute value as the
       * replacement tag.
       * @return The modified element.
       */
      updateTag(tag, selector) {
        if (!tag)
          return null;
        selector = selector || this._parseSelector(tag);
        const meta = this.getTag(selector);
        if (meta) {
          return this._setMetaElementAttributes(tag, meta);
        }
        return this._getOrCreateElement(tag, true);
      }
      /**
       * Removes an existing `<meta>` tag element from the current HTML document.
       * @param attrSelector A tag attribute and value to match against, to identify
       * an existing tag. A string in the format `"tag_attribute=`value string`"`.
       */
      removeTag(attrSelector) {
        this.removeTagElement(this.getTag(attrSelector));
      }
      /**
       * Removes an existing `<meta>` tag element from the current HTML document.
       * @param meta The tag definition to match against to identify an existing tag.
       */
      removeTagElement(meta) {
        if (meta) {
          this._dom.remove(meta);
        }
      }
      _getOrCreateElement(meta, forceCreation = false) {
        if (!forceCreation) {
          const selector = this._parseSelector(meta);
          const elem = this.getTags(selector).filter((elem2) => this._containsAttributes(meta, elem2))[0];
          if (elem !== void 0)
            return elem;
        }
        const element = this._dom.createElement("meta");
        this._setMetaElementAttributes(meta, element);
        const head = this._doc.getElementsByTagName("head")[0];
        head.appendChild(element);
        return element;
      }
      _setMetaElementAttributes(tag, el) {
        Object.keys(tag).forEach((prop) => el.setAttribute(this._getMetaKeyMap(prop), tag[prop]));
        return el;
      }
      _parseSelector(tag) {
        const attr = tag.name ? "name" : "property";
        return `${attr}="${tag[attr]}"`;
      }
      _containsAttributes(tag, elem) {
        return Object.keys(tag).every((key) => elem.getAttribute(this._getMetaKeyMap(key)) === tag[key]);
      }
      _getMetaKeyMap(prop) {
        return META_KEYS_MAP[prop] || prop;
      }
    }
    Meta3.ɵfac = function Meta_Factory(t) {
      return new (t || Meta3)(ɵɵinject(DOCUMENT));
    };
    Meta3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: Meta3,
      factory: function Meta_Factory(t) {
        let r = null;
        if (t) {
          r = new t();
        } else {
          r = createMeta();
        }
        return r;
      },
      providedIn: "root"
    });
    return Meta3;
  })();
  return Meta2;
})();
const META_KEYS_MAP = {
  httpEquiv: "http-equiv"
};
function createTitle() {
  return new Title(ɵɵinject(DOCUMENT));
}
let Title = /* @__PURE__ */ (() => {
  let Title2 = /* @__PURE__ */ (() => {
    class Title3 {
      constructor(_doc) {
        this._doc = _doc;
      }
      /**
       * Get the title of the current HTML document.
       */
      getTitle() {
        return this._doc.title;
      }
      /**
       * Set the title of the current HTML document.
       * @param newTitle
       */
      setTitle(newTitle) {
        this._doc.title = newTitle || "";
      }
    }
    Title3.ɵfac = function Title_Factory(t) {
      return new (t || Title3)(ɵɵinject(DOCUMENT));
    };
    Title3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: Title3,
      factory: function Title_Factory(t) {
        let r = null;
        if (t) {
          r = new t();
        } else {
          r = createTitle();
        }
        return r;
      },
      providedIn: "root"
    });
    return Title3;
  })();
  return Title2;
})();
function escapeHtml(text) {
  const escapedText = {
    "&": "&a;",
    '"': "&q;",
    "'": "&s;",
    "<": "&l;",
    ">": "&g;"
  };
  return text.replace(/[&"'<>]/g, (s) => escapedText[s]);
}
function unescapeHtml(text) {
  const unescapedText = {
    "&a;": "&",
    "&q;": '"',
    "&s;": "'",
    "&l;": "<",
    "&g;": ">"
  };
  return text.replace(/&[^;]+;/g, (s) => unescapedText[s]);
}
let TransferState = /* @__PURE__ */ (() => {
  let TransferState2 = /* @__PURE__ */ (() => {
    class TransferState3 {
      constructor() {
        this.store = {};
        this.onSerializeCallbacks = {};
      }
      /**
       * Get the value corresponding to a key. Return `defaultValue` if key is not found.
       */
      get(key, defaultValue) {
        return this.store[key] !== void 0 ? this.store[key] : defaultValue;
      }
      /**
       * Set the value corresponding to a key.
       */
      set(key, value) {
        this.store[key] = value;
      }
      /**
       * Remove a key from the store.
       */
      remove(key) {
        delete this.store[key];
      }
      /**
       * Test whether a key exists in the store.
       */
      hasKey(key) {
        return this.store.hasOwnProperty(key);
      }
      /**
       * Indicates whether the state is empty.
       */
      get isEmpty() {
        return Object.keys(this.store).length === 0;
      }
      /**
       * Register a callback to provide the value for a key when `toJson` is called.
       */
      onSerialize(key, callback) {
        this.onSerializeCallbacks[key] = callback;
      }
      /**
       * Serialize the current state of the store to JSON.
       */
      toJson() {
        for (const key in this.onSerializeCallbacks) {
          if (this.onSerializeCallbacks.hasOwnProperty(key)) {
            try {
              this.store[key] = this.onSerializeCallbacks[key]();
            } catch (e) {
              console.warn("Exception in onSerialize callback: ", e);
            }
          }
        }
        return JSON.stringify(this.store);
      }
    }
    TransferState3.ɵfac = function TransferState_Factory(t) {
      return new (t || TransferState3)();
    };
    TransferState3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: TransferState3,
      factory: function() {
        return (() => {
          const doc = inject(DOCUMENT);
          const appId = inject(APP_ID);
          const state = new TransferState3();
          state.store = retrieveTransferredState(doc, appId);
          return state;
        })();
      },
      providedIn: "root"
    });
    return TransferState3;
  })();
  return TransferState2;
})();
function retrieveTransferredState(doc, appId) {
  const script = doc.getElementById(appId + "-state");
  let initialState = {};
  if (script && script.textContent) {
    try {
      initialState = JSON.parse(unescapeHtml(script.textContent));
    } catch (e) {
      console.warn("Exception while restoring TransferState for app " + appId, e);
    }
  }
  return initialState;
}
let DomSanitizer = /* @__PURE__ */ (() => {
  let DomSanitizer2 = /* @__PURE__ */ (() => {
    class DomSanitizer3 {
    }
    DomSanitizer3.ɵfac = function DomSanitizer_Factory(t) {
      return new (t || DomSanitizer3)();
    };
    DomSanitizer3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: DomSanitizer3,
      factory: function DomSanitizer_Factory(t) {
        let r = null;
        if (t) {
          r = new (t || DomSanitizer3)();
        } else {
          r = ɵɵinject(DomSanitizerImpl);
        }
        return r;
      },
      providedIn: "root"
    });
    return DomSanitizer3;
  })();
  return DomSanitizer2;
})();
function domSanitizerImplFactory(injector) {
  return new DomSanitizerImpl(injector.get(DOCUMENT));
}
let DomSanitizerImpl = /* @__PURE__ */ (() => {
  let DomSanitizerImpl2 = /* @__PURE__ */ (() => {
    class DomSanitizerImpl3 extends DomSanitizer {
      constructor(_doc) {
        super();
        this._doc = _doc;
      }
      sanitize(ctx, value) {
        if (value == null)
          return null;
        switch (ctx) {
          case SecurityContext$1.NONE:
            return value;
          case SecurityContext$1.HTML:
            if (allowSanitizationBypassAndThrow(
              value,
              "HTML"
              /* BypassType.Html */
            )) {
              return unwrapSafeValue(value);
            }
            return _sanitizeHtml(this._doc, String(value)).toString();
          case SecurityContext$1.STYLE:
            if (allowSanitizationBypassAndThrow(
              value,
              "Style"
              /* BypassType.Style */
            )) {
              return unwrapSafeValue(value);
            }
            return value;
          case SecurityContext$1.SCRIPT:
            if (allowSanitizationBypassAndThrow(
              value,
              "Script"
              /* BypassType.Script */
            )) {
              return unwrapSafeValue(value);
            }
            throw new Error("unsafe value used in a script context");
          case SecurityContext$1.URL:
            if (allowSanitizationBypassAndThrow(
              value,
              "URL"
              /* BypassType.Url */
            )) {
              return unwrapSafeValue(value);
            }
            return _sanitizeUrl(String(value));
          case SecurityContext$1.RESOURCE_URL:
            if (allowSanitizationBypassAndThrow(
              value,
              "ResourceURL"
              /* BypassType.ResourceUrl */
            )) {
              return unwrapSafeValue(value);
            }
            throw new Error(`unsafe value used in a resource URL context (see ${XSS_SECURITY_URL})`);
          default:
            throw new Error(`Unexpected SecurityContext ${ctx} (see ${XSS_SECURITY_URL})`);
        }
      }
      bypassSecurityTrustHtml(value) {
        return bypassSanitizationTrustHtml(value);
      }
      bypassSecurityTrustStyle(value) {
        return bypassSanitizationTrustStyle(value);
      }
      bypassSecurityTrustScript(value) {
        return bypassSanitizationTrustScript(value);
      }
      bypassSecurityTrustUrl(value) {
        return bypassSanitizationTrustUrl(value);
      }
      bypassSecurityTrustResourceUrl(value) {
        return bypassSanitizationTrustResourceUrl(value);
      }
    }
    DomSanitizerImpl3.ɵfac = function DomSanitizerImpl_Factory(t) {
      return new (t || DomSanitizerImpl3)(ɵɵinject(DOCUMENT));
    };
    DomSanitizerImpl3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: DomSanitizerImpl3,
      factory: function DomSanitizerImpl_Factory(t) {
        let r = null;
        if (t) {
          r = new t();
        } else {
          r = domSanitizerImplFactory(ɵɵinject(Injector));
        }
        return r;
      },
      providedIn: "root"
    });
    return DomSanitizerImpl3;
  })();
  return DomSanitizerImpl2;
})();
class AnimationBuilder {
}
class AnimationFactory {
}
const AUTO_STYLE = "*";
function sequence(steps, options = null) {
  return {
    type: 2,
    steps,
    options
  };
}
function style(tokens) {
  return {
    type: 6,
    styles: tokens,
    offset: null
  };
}
function scheduleMicroTask$1(cb) {
  Promise.resolve().then(cb);
}
class NoopAnimationPlayer {
  constructor(duration = 0, delay = 0) {
    this._onDoneFns = [];
    this._onStartFns = [];
    this._onDestroyFns = [];
    this._originalOnDoneFns = [];
    this._originalOnStartFns = [];
    this._started = false;
    this._destroyed = false;
    this._finished = false;
    this._position = 0;
    this.parentPlayer = null;
    this.totalTime = duration + delay;
  }
  _onFinish() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach((fn) => fn());
      this._onDoneFns = [];
    }
  }
  onStart(fn) {
    this._originalOnStartFns.push(fn);
    this._onStartFns.push(fn);
  }
  onDone(fn) {
    this._originalOnDoneFns.push(fn);
    this._onDoneFns.push(fn);
  }
  onDestroy(fn) {
    this._onDestroyFns.push(fn);
  }
  hasStarted() {
    return this._started;
  }
  init() {
  }
  play() {
    if (!this.hasStarted()) {
      this._onStart();
      this.triggerMicrotask();
    }
    this._started = true;
  }
  /** @internal */
  triggerMicrotask() {
    scheduleMicroTask$1(() => this._onFinish());
  }
  _onStart() {
    this._onStartFns.forEach((fn) => fn());
    this._onStartFns = [];
  }
  pause() {
  }
  restart() {
  }
  finish() {
    this._onFinish();
  }
  destroy() {
    if (!this._destroyed) {
      this._destroyed = true;
      if (!this.hasStarted()) {
        this._onStart();
      }
      this.finish();
      this._onDestroyFns.forEach((fn) => fn());
      this._onDestroyFns = [];
    }
  }
  reset() {
    this._started = false;
    this._finished = false;
    this._onStartFns = this._originalOnStartFns;
    this._onDoneFns = this._originalOnDoneFns;
  }
  setPosition(position) {
    this._position = this.totalTime ? position * this.totalTime : 1;
  }
  getPosition() {
    return this.totalTime ? this._position / this.totalTime : 1;
  }
  /** @internal */
  triggerCallback(phaseName) {
    const methods = phaseName == "start" ? this._onStartFns : this._onDoneFns;
    methods.forEach((fn) => fn());
    methods.length = 0;
  }
}
class AnimationGroupPlayer {
  constructor(_players) {
    this._onDoneFns = [];
    this._onStartFns = [];
    this._finished = false;
    this._started = false;
    this._destroyed = false;
    this._onDestroyFns = [];
    this.parentPlayer = null;
    this.totalTime = 0;
    this.players = _players;
    let doneCount = 0;
    let destroyCount = 0;
    let startCount = 0;
    const total = this.players.length;
    if (total == 0) {
      scheduleMicroTask$1(() => this._onFinish());
    } else {
      this.players.forEach((player) => {
        player.onDone(() => {
          if (++doneCount == total) {
            this._onFinish();
          }
        });
        player.onDestroy(() => {
          if (++destroyCount == total) {
            this._onDestroy();
          }
        });
        player.onStart(() => {
          if (++startCount == total) {
            this._onStart();
          }
        });
      });
    }
    this.totalTime = this.players.reduce((time, player) => Math.max(time, player.totalTime), 0);
  }
  _onFinish() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach((fn) => fn());
      this._onDoneFns = [];
    }
  }
  init() {
    this.players.forEach((player) => player.init());
  }
  onStart(fn) {
    this._onStartFns.push(fn);
  }
  _onStart() {
    if (!this.hasStarted()) {
      this._started = true;
      this._onStartFns.forEach((fn) => fn());
      this._onStartFns = [];
    }
  }
  onDone(fn) {
    this._onDoneFns.push(fn);
  }
  onDestroy(fn) {
    this._onDestroyFns.push(fn);
  }
  hasStarted() {
    return this._started;
  }
  play() {
    if (!this.parentPlayer) {
      this.init();
    }
    this._onStart();
    this.players.forEach((player) => player.play());
  }
  pause() {
    this.players.forEach((player) => player.pause());
  }
  restart() {
    this.players.forEach((player) => player.restart());
  }
  finish() {
    this._onFinish();
    this.players.forEach((player) => player.finish());
  }
  destroy() {
    this._onDestroy();
  }
  _onDestroy() {
    if (!this._destroyed) {
      this._destroyed = true;
      this._onFinish();
      this.players.forEach((player) => player.destroy());
      this._onDestroyFns.forEach((fn) => fn());
      this._onDestroyFns = [];
    }
  }
  reset() {
    this.players.forEach((player) => player.reset());
    this._destroyed = false;
    this._finished = false;
    this._started = false;
  }
  setPosition(p) {
    const timeAtPosition = p * this.totalTime;
    this.players.forEach((player) => {
      const position = player.totalTime ? Math.min(1, timeAtPosition / player.totalTime) : 1;
      player.setPosition(position);
    });
  }
  getPosition() {
    const longestPlayer = this.players.reduce((longestSoFar, player) => {
      const newPlayerIsLongest = longestSoFar === null || player.totalTime > longestSoFar.totalTime;
      return newPlayerIsLongest ? player : longestSoFar;
    }, null);
    return longestPlayer != null ? longestPlayer.getPosition() : 0;
  }
  beforeDestroy() {
    this.players.forEach((player) => {
      if (player.beforeDestroy) {
        player.beforeDestroy();
      }
    });
  }
  /** @internal */
  triggerCallback(phaseName) {
    const methods = phaseName == "start" ? this._onStartFns : this._onDoneFns;
    methods.forEach((fn) => fn());
    methods.length = 0;
  }
}
const ɵPRE_STYLE = "!";
const LINE_START = "\n - ";
function invalidTimingValue(exp) {
  return new RuntimeError(3e3, false);
}
function negativeStepValue() {
  return new RuntimeError(3100, false);
}
function negativeDelayValue() {
  return new RuntimeError(3101, false);
}
function invalidStyleParams(varName) {
  return new RuntimeError(3001, false);
}
function invalidParamValue(varName) {
  return new RuntimeError(3003, false);
}
function invalidNodeType(nodeType) {
  return new RuntimeError(3004, false);
}
function invalidCssUnitValue(userProvidedProperty, value) {
  return new RuntimeError(3005, false);
}
function invalidTrigger() {
  return new RuntimeError(3006, false);
}
function invalidDefinition() {
  return new RuntimeError(3007, false);
}
function invalidState(metadataName, missingSubs) {
  return new RuntimeError(3008, false);
}
function invalidStyleValue(value) {
  return new RuntimeError(3002, false);
}
function invalidParallelAnimation(prop, firstStart, firstEnd, secondStart, secondEnd) {
  return new RuntimeError(3010, false);
}
function invalidKeyframes() {
  return new RuntimeError(3011, false);
}
function invalidOffset() {
  return new RuntimeError(3012, false);
}
function keyframeOffsetsOutOfOrder() {
  return new RuntimeError(3200, false);
}
function keyframesMissingOffsets() {
  return new RuntimeError(3202, false);
}
function invalidStagger() {
  return new RuntimeError(3013, false);
}
function invalidQuery(selector) {
  return new RuntimeError(3014, false);
}
function invalidExpression(expr) {
  return new RuntimeError(3015, false);
}
function invalidTransitionAlias(alias) {
  return new RuntimeError(3016, false);
}
function triggerBuildFailed(name, errors) {
  return new RuntimeError(3404, false);
}
function animationFailed(errors) {
  return new RuntimeError(3502, false);
}
function registerFailed(errors) {
  return new RuntimeError(3503, false);
}
function missingOrDestroyedAnimation() {
  return new RuntimeError(3300, false);
}
function createAnimationFailed(errors) {
  return new RuntimeError(3504, false);
}
function missingPlayer(id) {
  return new RuntimeError(3301, false);
}
function missingTrigger(phase, name) {
  return new RuntimeError(3302, false);
}
function missingEvent(name) {
  return new RuntimeError(3303, false);
}
function unsupportedTriggerEvent(phase, name) {
  return new RuntimeError(3400, false);
}
function unregisteredTrigger(name) {
  return new RuntimeError(3401, false);
}
function triggerTransitionsFailed(errors) {
  return new RuntimeError(3402, false);
}
function transitionFailed(name, errors) {
  return new RuntimeError(3505, false);
}
function isBrowser() {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
}
function isNode() {
  return typeof process !== "undefined" && {}.toString.call(process) === "[object process]";
}
function optimizeGroupPlayer(players) {
  switch (players.length) {
    case 0:
      return new NoopAnimationPlayer();
    case 1:
      return players[0];
    default:
      return new AnimationGroupPlayer(players);
  }
}
function normalizeKeyframes$1(driver, normalizer, element, keyframes, preStyles = /* @__PURE__ */ new Map(), postStyles = /* @__PURE__ */ new Map()) {
  const errors = [];
  const normalizedKeyframes = [];
  let previousOffset = -1;
  let previousKeyframe = null;
  keyframes.forEach((kf) => {
    const offset = kf.get("offset");
    const isSameOffset = offset == previousOffset;
    const normalizedKeyframe = isSameOffset && previousKeyframe || /* @__PURE__ */ new Map();
    kf.forEach((val, prop) => {
      let normalizedProp = prop;
      let normalizedValue = val;
      if (prop !== "offset") {
        normalizedProp = normalizer.normalizePropertyName(normalizedProp, errors);
        switch (normalizedValue) {
          case ɵPRE_STYLE:
            normalizedValue = preStyles.get(prop);
            break;
          case AUTO_STYLE:
            normalizedValue = postStyles.get(prop);
            break;
          default:
            normalizedValue = normalizer.normalizeStyleValue(prop, normalizedProp, normalizedValue, errors);
            break;
        }
      }
      normalizedKeyframe.set(normalizedProp, normalizedValue);
    });
    if (!isSameOffset) {
      normalizedKeyframes.push(normalizedKeyframe);
    }
    previousKeyframe = normalizedKeyframe;
    previousOffset = offset;
  });
  if (errors.length) {
    throw animationFailed(errors);
  }
  return normalizedKeyframes;
}
function listenOnPlayer(player, eventName, event, callback) {
  switch (eventName) {
    case "start":
      player.onStart(() => callback(event && copyAnimationEvent(event, "start", player)));
      break;
    case "done":
      player.onDone(() => callback(event && copyAnimationEvent(event, "done", player)));
      break;
    case "destroy":
      player.onDestroy(() => callback(event && copyAnimationEvent(event, "destroy", player)));
      break;
  }
}
function copyAnimationEvent(e, phaseName, player) {
  const totalTime = player.totalTime;
  const disabled = player.disabled ? true : false;
  const event = makeAnimationEvent(e.element, e.triggerName, e.fromState, e.toState, phaseName || e.phaseName, totalTime == void 0 ? e.totalTime : totalTime, disabled);
  const data = e["_data"];
  if (data != null) {
    event["_data"] = data;
  }
  return event;
}
function makeAnimationEvent(element, triggerName, fromState, toState, phaseName = "", totalTime = 0, disabled) {
  return {
    element,
    triggerName,
    fromState,
    toState,
    phaseName,
    totalTime,
    disabled: !!disabled
  };
}
function getOrSetDefaultValue(map2, key, defaultValue) {
  let value = map2.get(key);
  if (!value) {
    map2.set(key, value = defaultValue);
  }
  return value;
}
function parseTimelineCommand(command) {
  const separatorPos = command.indexOf(":");
  const id = command.substring(1, separatorPos);
  const action = command.slice(separatorPos + 1);
  return [id, action];
}
let _contains = (elm1, elm2) => false;
let _query = (element, selector, multi) => {
  return [];
};
let _documentElement = null;
function getParentElement(element) {
  const parent = element.parentNode || element.host;
  if (parent === _documentElement) {
    return null;
  }
  return parent;
}
const _isNode = /* @__PURE__ */ isNode();
if (_isNode || typeof Element !== "undefined") {
  if (!/* @__PURE__ */ isBrowser()) {
    _contains = (elm1, elm2) => elm1.contains(elm2);
  } else {
    _documentElement = /* @__PURE__ */ (() => document.documentElement)();
    _contains = (elm1, elm2) => {
      while (elm2) {
        if (elm2 === elm1) {
          return true;
        }
        elm2 = getParentElement(elm2);
      }
      return false;
    };
  }
  _query = (element, selector, multi) => {
    if (multi) {
      return Array.from(element.querySelectorAll(selector));
    }
    const elem = element.querySelector(selector);
    return elem ? [elem] : [];
  };
}
function containsVendorPrefix(prop) {
  return prop.substring(1, 6) == "ebkit";
}
let _CACHED_BODY = null;
let _IS_WEBKIT = false;
function validateStyleProperty(prop) {
  if (!_CACHED_BODY) {
    _CACHED_BODY = getBodyNode() || {};
    _IS_WEBKIT = _CACHED_BODY.style ? "WebkitAppearance" in _CACHED_BODY.style : false;
  }
  let result = true;
  if (_CACHED_BODY.style && !containsVendorPrefix(prop)) {
    result = prop in _CACHED_BODY.style;
    if (!result && _IS_WEBKIT) {
      const camelProp = "Webkit" + prop.charAt(0).toUpperCase() + prop.slice(1);
      result = camelProp in _CACHED_BODY.style;
    }
  }
  return result;
}
function getBodyNode() {
  if (typeof document != "undefined") {
    return document.body;
  }
  return null;
}
const containsElement = _contains;
const invokeQuery = _query;
let NoopAnimationDriver = /* @__PURE__ */ (() => {
  let NoopAnimationDriver2 = /* @__PURE__ */ (() => {
    class NoopAnimationDriver3 {
      validateStyleProperty(prop) {
        return validateStyleProperty(prop);
      }
      matchesElement(_element, _selector) {
        return false;
      }
      containsElement(elm1, elm2) {
        return containsElement(elm1, elm2);
      }
      getParentElement(element) {
        return getParentElement(element);
      }
      query(element, selector, multi) {
        return invokeQuery(element, selector, multi);
      }
      computeStyle(element, prop, defaultValue) {
        return defaultValue || "";
      }
      animate(element, keyframes, duration, delay, easing, previousPlayers = [], scrubberAccessRequested) {
        return new NoopAnimationPlayer(duration, delay);
      }
    }
    NoopAnimationDriver3.ɵfac = function NoopAnimationDriver_Factory(t) {
      return new (t || NoopAnimationDriver3)();
    };
    NoopAnimationDriver3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: NoopAnimationDriver3,
      factory: NoopAnimationDriver3.ɵfac
    });
    return NoopAnimationDriver3;
  })();
  return NoopAnimationDriver2;
})();
let AnimationDriver = /* @__PURE__ */ (() => {
  let AnimationDriver2 = /* @__PURE__ */ (() => {
    class AnimationDriver3 {
    }
    AnimationDriver3.NOOP = /* @__PURE__ */ new NoopAnimationDriver();
    return AnimationDriver3;
  })();
  return AnimationDriver2;
})();
const ONE_SECOND = 1e3;
const SUBSTITUTION_EXPR_START = "{{";
const SUBSTITUTION_EXPR_END = "}}";
const ENTER_CLASSNAME = "ng-enter";
const LEAVE_CLASSNAME = "ng-leave";
const NG_TRIGGER_CLASSNAME = "ng-trigger";
const NG_TRIGGER_SELECTOR = ".ng-trigger";
const NG_ANIMATING_CLASSNAME = "ng-animating";
const NG_ANIMATING_SELECTOR = ".ng-animating";
function resolveTimingValue(value) {
  if (typeof value == "number")
    return value;
  const matches = value.match(/^(-?[\.\d]+)(m?s)/);
  if (!matches || matches.length < 2)
    return 0;
  return _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
}
function _convertTimeValueToMS(value, unit) {
  switch (unit) {
    case "s":
      return value * ONE_SECOND;
    default:
      return value;
  }
}
function resolveTiming(timings, errors, allowNegativeValues) {
  return timings.hasOwnProperty("duration") ? timings : parseTimeExpression(timings, errors, allowNegativeValues);
}
function parseTimeExpression(exp, errors, allowNegativeValues) {
  const regex = /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;
  let duration;
  let delay = 0;
  let easing = "";
  if (typeof exp === "string") {
    const matches = exp.match(regex);
    if (matches === null) {
      errors.push(invalidTimingValue(exp));
      return {
        duration: 0,
        delay: 0,
        easing: ""
      };
    }
    duration = _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
    const delayMatch = matches[3];
    if (delayMatch != null) {
      delay = _convertTimeValueToMS(parseFloat(delayMatch), matches[4]);
    }
    const easingVal = matches[5];
    if (easingVal) {
      easing = easingVal;
    }
  } else {
    duration = exp;
  }
  if (!allowNegativeValues) {
    let containsErrors = false;
    let startIndex = errors.length;
    if (duration < 0) {
      errors.push(negativeStepValue());
      containsErrors = true;
    }
    if (delay < 0) {
      errors.push(negativeDelayValue());
      containsErrors = true;
    }
    if (containsErrors) {
      errors.splice(startIndex, 0, invalidTimingValue(exp));
    }
  }
  return {
    duration,
    delay,
    easing
  };
}
function copyObj(obj, destination = {}) {
  Object.keys(obj).forEach((prop) => {
    destination[prop] = obj[prop];
  });
  return destination;
}
function convertToMap(obj) {
  const styleMap = /* @__PURE__ */ new Map();
  Object.keys(obj).forEach((prop) => {
    const val = obj[prop];
    styleMap.set(prop, val);
  });
  return styleMap;
}
function copyStyles(styles, destination = /* @__PURE__ */ new Map(), backfill) {
  if (backfill) {
    for (let [prop, val] of backfill) {
      destination.set(prop, val);
    }
  }
  for (let [prop, val] of styles) {
    destination.set(prop, val);
  }
  return destination;
}
function getStyleAttributeString(element, key, value) {
  if (value) {
    return key + ":" + value + ";";
  } else {
    return "";
  }
}
function writeStyleAttribute(element) {
  let styleAttrValue = "";
  for (let i = 0; i < element.style.length; i++) {
    const key = element.style.item(i);
    styleAttrValue += getStyleAttributeString(element, key, element.style.getPropertyValue(key));
  }
  for (const key in element.style) {
    if (!element.style.hasOwnProperty(key) || key.startsWith("_")) {
      continue;
    }
    const dashKey = camelCaseToDashCase(key);
    styleAttrValue += getStyleAttributeString(element, dashKey, element.style[key]);
  }
  element.setAttribute("style", styleAttrValue);
}
function setStyles(element, styles, formerStyles) {
  if (element["style"]) {
    styles.forEach((val, prop) => {
      const camelProp = dashCaseToCamelCase$1(prop);
      if (formerStyles && !formerStyles.has(prop)) {
        formerStyles.set(prop, element.style[camelProp]);
      }
      element.style[camelProp] = val;
    });
    if (isNode()) {
      writeStyleAttribute(element);
    }
  }
}
function eraseStyles(element, styles) {
  if (element["style"]) {
    styles.forEach((_, prop) => {
      const camelProp = dashCaseToCamelCase$1(prop);
      element.style[camelProp] = "";
    });
    if (isNode()) {
      writeStyleAttribute(element);
    }
  }
}
function normalizeAnimationEntry(steps) {
  if (Array.isArray(steps)) {
    if (steps.length == 1)
      return steps[0];
    return sequence(steps);
  }
  return steps;
}
function validateStyleParams(value, options, errors) {
  const params = options.params || {};
  const matches = extractStyleParams(value);
  if (matches.length) {
    matches.forEach((varName) => {
      if (!params.hasOwnProperty(varName)) {
        errors.push(invalidStyleParams(varName));
      }
    });
  }
}
const PARAM_REGEX = /* @__PURE__ */ new RegExp(`${SUBSTITUTION_EXPR_START}\\s*(.+?)\\s*${SUBSTITUTION_EXPR_END}`, "g");
function extractStyleParams(value) {
  let params = [];
  if (typeof value === "string") {
    let match2;
    while (match2 = PARAM_REGEX.exec(value)) {
      params.push(match2[1]);
    }
    PARAM_REGEX.lastIndex = 0;
  }
  return params;
}
function interpolateParams(value, params, errors) {
  const original = value.toString();
  const str = original.replace(PARAM_REGEX, (_, varName) => {
    let localVal = params[varName];
    if (localVal == null) {
      errors.push(invalidParamValue(varName));
      localVal = "";
    }
    return localVal.toString();
  });
  return str == original ? value : str;
}
function iteratorToArray(iterator) {
  const arr = [];
  let item = iterator.next();
  while (!item.done) {
    arr.push(item.value);
    item = iterator.next();
  }
  return arr;
}
const DASH_CASE_REGEXP$1 = /-+([a-z0-9])/g;
function dashCaseToCamelCase$1(input) {
  return input.replace(DASH_CASE_REGEXP$1, (...m) => m[1].toUpperCase());
}
function camelCaseToDashCase(input) {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function visitDslNode(visitor, node, context) {
  switch (node.type) {
    case 7:
      return visitor.visitTrigger(node, context);
    case 0:
      return visitor.visitState(node, context);
    case 1:
      return visitor.visitTransition(node, context);
    case 2:
      return visitor.visitSequence(node, context);
    case 3:
      return visitor.visitGroup(node, context);
    case 4:
      return visitor.visitAnimate(node, context);
    case 5:
      return visitor.visitKeyframes(node, context);
    case 6:
      return visitor.visitStyle(node, context);
    case 8:
      return visitor.visitReference(node, context);
    case 9:
      return visitor.visitAnimateChild(node, context);
    case 10:
      return visitor.visitAnimateRef(node, context);
    case 11:
      return visitor.visitQuery(node, context);
    case 12:
      return visitor.visitStagger(node, context);
    default:
      throw invalidNodeType(node.type);
  }
}
const NG_DEV_MODE$9 = false;
function createListOfWarnings(warnings) {
  const LINE_START2 = "\n - ";
  return `${LINE_START2}${warnings.filter(Boolean).map((warning) => warning).join(LINE_START2)}`;
}
function warnTriggerBuild(name, warnings) {
  NG_DEV_MODE$9 && console.warn(`The animation trigger "${name}" has built with the following warnings:${createListOfWarnings(warnings)}`);
}
function warnRegister(warnings) {
  NG_DEV_MODE$9 && console.warn(`Animation built with the following warnings:${createListOfWarnings(warnings)}`);
}
function pushUnrecognizedPropertiesWarning(warnings, props) {
  if (props.length) {
    warnings.push(`The following provided properties are not recognized: ${props.join(", ")}`);
  }
}
const ANY_STATE = "*";
function parseTransitionExpr(transitionValue, errors) {
  const expressions = [];
  if (typeof transitionValue == "string") {
    transitionValue.split(/\s*,\s*/).forEach((str) => parseInnerTransitionStr(str, expressions, errors));
  } else {
    expressions.push(transitionValue);
  }
  return expressions;
}
function parseInnerTransitionStr(eventStr, expressions, errors) {
  if (eventStr[0] == ":") {
    const result = parseAnimationAlias(eventStr, errors);
    if (typeof result == "function") {
      expressions.push(result);
      return;
    }
    eventStr = result;
  }
  const match2 = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
  if (match2 == null || match2.length < 4) {
    errors.push(invalidExpression(eventStr));
    return expressions;
  }
  const fromState = match2[1];
  const separator = match2[2];
  const toState = match2[3];
  expressions.push(makeLambdaFromStates(fromState, toState));
  const isFullAnyStateExpr = fromState == ANY_STATE && toState == ANY_STATE;
  if (separator[0] == "<" && !isFullAnyStateExpr) {
    expressions.push(makeLambdaFromStates(toState, fromState));
  }
}
function parseAnimationAlias(alias, errors) {
  switch (alias) {
    case ":enter":
      return "void => *";
    case ":leave":
      return "* => void";
    case ":increment":
      return (fromState, toState) => parseFloat(toState) > parseFloat(fromState);
    case ":decrement":
      return (fromState, toState) => parseFloat(toState) < parseFloat(fromState);
    default:
      errors.push(invalidTransitionAlias(alias));
      return "* => *";
  }
}
const TRUE_BOOLEAN_VALUES = /* @__PURE__ */ new Set(["true", "1"]);
const FALSE_BOOLEAN_VALUES = /* @__PURE__ */ new Set(["false", "0"]);
function makeLambdaFromStates(lhs, rhs) {
  const LHS_MATCH_BOOLEAN = TRUE_BOOLEAN_VALUES.has(lhs) || FALSE_BOOLEAN_VALUES.has(lhs);
  const RHS_MATCH_BOOLEAN = TRUE_BOOLEAN_VALUES.has(rhs) || FALSE_BOOLEAN_VALUES.has(rhs);
  return (fromState, toState) => {
    let lhsMatch = lhs == ANY_STATE || lhs == fromState;
    let rhsMatch = rhs == ANY_STATE || rhs == toState;
    if (!lhsMatch && LHS_MATCH_BOOLEAN && typeof fromState === "boolean") {
      lhsMatch = fromState ? TRUE_BOOLEAN_VALUES.has(lhs) : FALSE_BOOLEAN_VALUES.has(lhs);
    }
    if (!rhsMatch && RHS_MATCH_BOOLEAN && typeof toState === "boolean") {
      rhsMatch = toState ? TRUE_BOOLEAN_VALUES.has(rhs) : FALSE_BOOLEAN_VALUES.has(rhs);
    }
    return lhsMatch && rhsMatch;
  };
}
const SELF_TOKEN = ":self";
const SELF_TOKEN_REGEX = /* @__PURE__ */ new RegExp(`s*${SELF_TOKEN}s*,?`, "g");
function buildAnimationAst(driver, metadata, errors, warnings) {
  return new AnimationAstBuilderVisitor(driver).build(metadata, errors, warnings);
}
const ROOT_SELECTOR = "";
class AnimationAstBuilderVisitor {
  constructor(_driver) {
    this._driver = _driver;
  }
  build(metadata, errors, warnings) {
    const context = new AnimationAstBuilderContext(errors);
    this._resetContextStyleTimingState(context);
    const ast = visitDslNode(this, normalizeAnimationEntry(metadata), context);
    if (false) {
      if (context.unsupportedCSSPropertiesFound.size) {
        pushUnrecognizedPropertiesWarning(warnings, [...context.unsupportedCSSPropertiesFound.keys()]);
      }
    }
    return ast;
  }
  _resetContextStyleTimingState(context) {
    context.currentQuerySelector = ROOT_SELECTOR;
    context.collectedStyles = /* @__PURE__ */ new Map();
    context.collectedStyles.set(ROOT_SELECTOR, /* @__PURE__ */ new Map());
    context.currentTime = 0;
  }
  visitTrigger(metadata, context) {
    let queryCount = context.queryCount = 0;
    let depCount = context.depCount = 0;
    const states = [];
    const transitions = [];
    if (metadata.name.charAt(0) == "@") {
      context.errors.push(invalidTrigger());
    }
    metadata.definitions.forEach((def) => {
      this._resetContextStyleTimingState(context);
      if (def.type == 0) {
        const stateDef = def;
        const name = stateDef.name;
        name.toString().split(/\s*,\s*/).forEach((n) => {
          stateDef.name = n;
          states.push(this.visitState(stateDef, context));
        });
        stateDef.name = name;
      } else if (def.type == 1) {
        const transition = this.visitTransition(def, context);
        queryCount += transition.queryCount;
        depCount += transition.depCount;
        transitions.push(transition);
      } else {
        context.errors.push(invalidDefinition());
      }
    });
    return {
      type: 7,
      name: metadata.name,
      states,
      transitions,
      queryCount,
      depCount,
      options: null
    };
  }
  visitState(metadata, context) {
    const styleAst = this.visitStyle(metadata.styles, context);
    const astParams = metadata.options && metadata.options.params || null;
    if (styleAst.containsDynamicStyles) {
      const missingSubs = /* @__PURE__ */ new Set();
      const params = astParams || {};
      styleAst.styles.forEach((style2) => {
        if (style2 instanceof Map) {
          style2.forEach((value) => {
            extractStyleParams(value).forEach((sub) => {
              if (!params.hasOwnProperty(sub)) {
                missingSubs.add(sub);
              }
            });
          });
        }
      });
      if (missingSubs.size) {
        const missingSubsArr = iteratorToArray(missingSubs.values());
        context.errors.push(invalidState(metadata.name, missingSubsArr));
      }
    }
    return {
      type: 0,
      name: metadata.name,
      style: styleAst,
      options: astParams ? {
        params: astParams
      } : null
    };
  }
  visitTransition(metadata, context) {
    context.queryCount = 0;
    context.depCount = 0;
    const animation = visitDslNode(this, normalizeAnimationEntry(metadata.animation), context);
    const matchers = parseTransitionExpr(metadata.expr, context.errors);
    return {
      type: 1,
      matchers,
      animation,
      queryCount: context.queryCount,
      depCount: context.depCount,
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitSequence(metadata, context) {
    return {
      type: 2,
      steps: metadata.steps.map((s) => visitDslNode(this, s, context)),
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitGroup(metadata, context) {
    const currentTime = context.currentTime;
    let furthestTime = 0;
    const steps = metadata.steps.map((step) => {
      context.currentTime = currentTime;
      const innerAst = visitDslNode(this, step, context);
      furthestTime = Math.max(furthestTime, context.currentTime);
      return innerAst;
    });
    context.currentTime = furthestTime;
    return {
      type: 3,
      steps,
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitAnimate(metadata, context) {
    const timingAst = constructTimingAst(metadata.timings, context.errors);
    context.currentAnimateTimings = timingAst;
    let styleAst;
    let styleMetadata = metadata.styles ? metadata.styles : style({});
    if (styleMetadata.type == 5) {
      styleAst = this.visitKeyframes(styleMetadata, context);
    } else {
      let styleMetadata2 = metadata.styles;
      let isEmpty = false;
      if (!styleMetadata2) {
        isEmpty = true;
        const newStyleData = {};
        if (timingAst.easing) {
          newStyleData["easing"] = timingAst.easing;
        }
        styleMetadata2 = style(newStyleData);
      }
      context.currentTime += timingAst.duration + timingAst.delay;
      const _styleAst = this.visitStyle(styleMetadata2, context);
      _styleAst.isEmptyStep = isEmpty;
      styleAst = _styleAst;
    }
    context.currentAnimateTimings = null;
    return {
      type: 4,
      timings: timingAst,
      style: styleAst,
      options: null
    };
  }
  visitStyle(metadata, context) {
    const ast = this._makeStyleAst(metadata, context);
    this._validateStyleAst(ast, context);
    return ast;
  }
  _makeStyleAst(metadata, context) {
    const styles = [];
    const metadataStyles = Array.isArray(metadata.styles) ? metadata.styles : [metadata.styles];
    for (let styleTuple of metadataStyles) {
      if (typeof styleTuple === "string") {
        if (styleTuple === AUTO_STYLE) {
          styles.push(styleTuple);
        } else {
          context.errors.push(invalidStyleValue(styleTuple));
        }
      } else {
        styles.push(convertToMap(styleTuple));
      }
    }
    let containsDynamicStyles = false;
    let collectedEasing = null;
    styles.forEach((styleData) => {
      if (styleData instanceof Map) {
        if (styleData.has("easing")) {
          collectedEasing = styleData.get("easing");
          styleData.delete("easing");
        }
        if (!containsDynamicStyles) {
          for (let value of styleData.values()) {
            if (value.toString().indexOf(SUBSTITUTION_EXPR_START) >= 0) {
              containsDynamicStyles = true;
              break;
            }
          }
        }
      }
    });
    return {
      type: 6,
      styles,
      easing: collectedEasing,
      offset: metadata.offset,
      containsDynamicStyles,
      options: null
    };
  }
  _validateStyleAst(ast, context) {
    const timings = context.currentAnimateTimings;
    let endTime = context.currentTime;
    let startTime = context.currentTime;
    if (timings && startTime > 0) {
      startTime -= timings.duration + timings.delay;
    }
    ast.styles.forEach((tuple) => {
      if (typeof tuple === "string")
        return;
      tuple.forEach((value, prop) => {
        if (false) {
          if (!this._driver.validateStyleProperty(prop)) {
            tuple.delete(prop);
            context.unsupportedCSSPropertiesFound.add(prop);
            return;
          }
        }
        const collectedStyles = context.collectedStyles.get(context.currentQuerySelector);
        const collectedEntry = collectedStyles.get(prop);
        let updateCollectedStyle = true;
        if (collectedEntry) {
          if (startTime != endTime && startTime >= collectedEntry.startTime && endTime <= collectedEntry.endTime) {
            context.errors.push(invalidParallelAnimation(prop, collectedEntry.startTime, collectedEntry.endTime, startTime, endTime));
            updateCollectedStyle = false;
          }
          startTime = collectedEntry.startTime;
        }
        if (updateCollectedStyle) {
          collectedStyles.set(prop, {
            startTime,
            endTime
          });
        }
        if (context.options) {
          validateStyleParams(value, context.options, context.errors);
        }
      });
    });
  }
  visitKeyframes(metadata, context) {
    const ast = {
      type: 5,
      styles: [],
      options: null
    };
    if (!context.currentAnimateTimings) {
      context.errors.push(invalidKeyframes());
      return ast;
    }
    const MAX_KEYFRAME_OFFSET = 1;
    let totalKeyframesWithOffsets = 0;
    const offsets = [];
    let offsetsOutOfOrder = false;
    let keyframesOutOfRange = false;
    let previousOffset = 0;
    const keyframes = metadata.steps.map((styles) => {
      const style2 = this._makeStyleAst(styles, context);
      let offsetVal = style2.offset != null ? style2.offset : consumeOffset(style2.styles);
      let offset = 0;
      if (offsetVal != null) {
        totalKeyframesWithOffsets++;
        offset = style2.offset = offsetVal;
      }
      keyframesOutOfRange = keyframesOutOfRange || offset < 0 || offset > 1;
      offsetsOutOfOrder = offsetsOutOfOrder || offset < previousOffset;
      previousOffset = offset;
      offsets.push(offset);
      return style2;
    });
    if (keyframesOutOfRange) {
      context.errors.push(invalidOffset());
    }
    if (offsetsOutOfOrder) {
      context.errors.push(keyframeOffsetsOutOfOrder());
    }
    const length = metadata.steps.length;
    let generatedOffset = 0;
    if (totalKeyframesWithOffsets > 0 && totalKeyframesWithOffsets < length) {
      context.errors.push(keyframesMissingOffsets());
    } else if (totalKeyframesWithOffsets == 0) {
      generatedOffset = MAX_KEYFRAME_OFFSET / (length - 1);
    }
    const limit = length - 1;
    const currentTime = context.currentTime;
    const currentAnimateTimings = context.currentAnimateTimings;
    const animateDuration = currentAnimateTimings.duration;
    keyframes.forEach((kf, i) => {
      const offset = generatedOffset > 0 ? i == limit ? 1 : generatedOffset * i : offsets[i];
      const durationUpToThisFrame = offset * animateDuration;
      context.currentTime = currentTime + currentAnimateTimings.delay + durationUpToThisFrame;
      currentAnimateTimings.duration = durationUpToThisFrame;
      this._validateStyleAst(kf, context);
      kf.offset = offset;
      ast.styles.push(kf);
    });
    return ast;
  }
  visitReference(metadata, context) {
    return {
      type: 8,
      animation: visitDslNode(this, normalizeAnimationEntry(metadata.animation), context),
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitAnimateChild(metadata, context) {
    context.depCount++;
    return {
      type: 9,
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitAnimateRef(metadata, context) {
    return {
      type: 10,
      animation: this.visitReference(metadata.animation, context),
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitQuery(metadata, context) {
    const parentSelector = context.currentQuerySelector;
    const options = metadata.options || {};
    context.queryCount++;
    context.currentQuery = metadata;
    const [selector, includeSelf] = normalizeSelector(metadata.selector);
    context.currentQuerySelector = parentSelector.length ? parentSelector + " " + selector : selector;
    getOrSetDefaultValue(context.collectedStyles, context.currentQuerySelector, /* @__PURE__ */ new Map());
    const animation = visitDslNode(this, normalizeAnimationEntry(metadata.animation), context);
    context.currentQuery = null;
    context.currentQuerySelector = parentSelector;
    return {
      type: 11,
      selector,
      limit: options.limit || 0,
      optional: !!options.optional,
      includeSelf,
      animation,
      originalSelector: metadata.selector,
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitStagger(metadata, context) {
    if (!context.currentQuery) {
      context.errors.push(invalidStagger());
    }
    const timings = metadata.timings === "full" ? {
      duration: 0,
      delay: 0,
      easing: "full"
    } : resolveTiming(metadata.timings, context.errors, true);
    return {
      type: 12,
      animation: visitDslNode(this, normalizeAnimationEntry(metadata.animation), context),
      timings,
      options: null
    };
  }
}
function normalizeSelector(selector) {
  const hasAmpersand = selector.split(/\s*,\s*/).find((token) => token == SELF_TOKEN) ? true : false;
  if (hasAmpersand) {
    selector = selector.replace(SELF_TOKEN_REGEX, "");
  }
  selector = selector.replace(/@\*/g, NG_TRIGGER_SELECTOR).replace(/@\w+/g, (match2) => NG_TRIGGER_SELECTOR + "-" + match2.slice(1)).replace(/:animating/g, NG_ANIMATING_SELECTOR);
  return [selector, hasAmpersand];
}
function normalizeParams(obj) {
  return obj ? copyObj(obj) : null;
}
class AnimationAstBuilderContext {
  constructor(errors) {
    this.errors = errors;
    this.queryCount = 0;
    this.depCount = 0;
    this.currentTransition = null;
    this.currentQuery = null;
    this.currentQuerySelector = null;
    this.currentAnimateTimings = null;
    this.currentTime = 0;
    this.collectedStyles = /* @__PURE__ */ new Map();
    this.options = null;
    this.unsupportedCSSPropertiesFound = /* @__PURE__ */ new Set();
  }
}
function consumeOffset(styles) {
  if (typeof styles == "string")
    return null;
  let offset = null;
  if (Array.isArray(styles)) {
    styles.forEach((styleTuple) => {
      if (styleTuple instanceof Map && styleTuple.has("offset")) {
        const obj = styleTuple;
        offset = parseFloat(obj.get("offset"));
        obj.delete("offset");
      }
    });
  } else if (styles instanceof Map && styles.has("offset")) {
    const obj = styles;
    offset = parseFloat(obj.get("offset"));
    obj.delete("offset");
  }
  return offset;
}
function constructTimingAst(value, errors) {
  if (value.hasOwnProperty("duration")) {
    return value;
  }
  if (typeof value == "number") {
    const duration = resolveTiming(value, errors).duration;
    return makeTimingAst(duration, 0, "");
  }
  const strValue = value;
  const isDynamic = strValue.split(/\s+/).some((v) => v.charAt(0) == "{" && v.charAt(1) == "{");
  if (isDynamic) {
    const ast = makeTimingAst(0, 0, "");
    ast.dynamic = true;
    ast.strValue = strValue;
    return ast;
  }
  const timings = resolveTiming(strValue, errors);
  return makeTimingAst(timings.duration, timings.delay, timings.easing);
}
function normalizeAnimationOptions(options) {
  if (options) {
    options = copyObj(options);
    if (options["params"]) {
      options["params"] = normalizeParams(options["params"]);
    }
  } else {
    options = {};
  }
  return options;
}
function makeTimingAst(duration, delay, easing) {
  return {
    duration,
    delay,
    easing
  };
}
function createTimelineInstruction(element, keyframes, preStyleProps, postStyleProps, duration, delay, easing = null, subTimeline = false) {
  return {
    type: 1,
    element,
    keyframes,
    preStyleProps,
    postStyleProps,
    duration,
    delay,
    totalTime: duration + delay,
    easing,
    subTimeline
  };
}
class ElementInstructionMap {
  constructor() {
    this._map = /* @__PURE__ */ new Map();
  }
  get(element) {
    return this._map.get(element) || [];
  }
  append(element, instructions) {
    let existingInstructions = this._map.get(element);
    if (!existingInstructions) {
      this._map.set(element, existingInstructions = []);
    }
    existingInstructions.push(...instructions);
  }
  has(element) {
    return this._map.has(element);
  }
  clear() {
    this._map.clear();
  }
}
const ONE_FRAME_IN_MILLISECONDS = 1;
const ENTER_TOKEN = ":enter";
const ENTER_TOKEN_REGEX = /* @__PURE__ */ new RegExp(ENTER_TOKEN, "g");
const LEAVE_TOKEN = ":leave";
const LEAVE_TOKEN_REGEX = /* @__PURE__ */ new RegExp(LEAVE_TOKEN, "g");
function buildAnimationTimelines(driver, rootElement, ast, enterClassName, leaveClassName, startingStyles = /* @__PURE__ */ new Map(), finalStyles = /* @__PURE__ */ new Map(), options, subInstructions, errors = []) {
  return new AnimationTimelineBuilderVisitor().buildKeyframes(driver, rootElement, ast, enterClassName, leaveClassName, startingStyles, finalStyles, options, subInstructions, errors);
}
class AnimationTimelineBuilderVisitor {
  buildKeyframes(driver, rootElement, ast, enterClassName, leaveClassName, startingStyles, finalStyles, options, subInstructions, errors = []) {
    subInstructions = subInstructions || new ElementInstructionMap();
    const context = new AnimationTimelineContext(driver, rootElement, subInstructions, enterClassName, leaveClassName, errors, []);
    context.options = options;
    const delay = options.delay ? resolveTimingValue(options.delay) : 0;
    context.currentTimeline.delayNextStep(delay);
    context.currentTimeline.setStyles([startingStyles], null, context.errors, options);
    visitDslNode(this, ast, context);
    const timelines = context.timelines.filter((timeline) => timeline.containsAnimation());
    if (timelines.length && finalStyles.size) {
      let lastRootTimeline;
      for (let i = timelines.length - 1; i >= 0; i--) {
        const timeline = timelines[i];
        if (timeline.element === rootElement) {
          lastRootTimeline = timeline;
          break;
        }
      }
      if (lastRootTimeline && !lastRootTimeline.allowOnlyTimelineStyles()) {
        lastRootTimeline.setStyles([finalStyles], null, context.errors, options);
      }
    }
    return timelines.length ? timelines.map((timeline) => timeline.buildKeyframes()) : [createTimelineInstruction(rootElement, [], [], [], 0, delay, "", false)];
  }
  visitTrigger(ast, context) {
  }
  visitState(ast, context) {
  }
  visitTransition(ast, context) {
  }
  visitAnimateChild(ast, context) {
    const elementInstructions = context.subInstructions.get(context.element);
    if (elementInstructions) {
      const innerContext = context.createSubContext(ast.options);
      const startTime = context.currentTimeline.currentTime;
      const endTime = this._visitSubInstructions(elementInstructions, innerContext, innerContext.options);
      if (startTime != endTime) {
        context.transformIntoNewTimeline(endTime);
      }
    }
    context.previousNode = ast;
  }
  visitAnimateRef(ast, context) {
    const innerContext = context.createSubContext(ast.options);
    innerContext.transformIntoNewTimeline();
    this._applyAnimationRefDelays([ast.options, ast.animation.options], context, innerContext);
    this.visitReference(ast.animation, innerContext);
    context.transformIntoNewTimeline(innerContext.currentTimeline.currentTime);
    context.previousNode = ast;
  }
  _applyAnimationRefDelays(animationsRefsOptions, context, innerContext) {
    var _a;
    for (const animationRefOptions of animationsRefsOptions) {
      const animationDelay = animationRefOptions === null || animationRefOptions === void 0 ? void 0 : animationRefOptions.delay;
      if (animationDelay) {
        const animationDelayValue = typeof animationDelay === "number" ? animationDelay : resolveTimingValue(interpolateParams(animationDelay, (_a = animationRefOptions === null || animationRefOptions === void 0 ? void 0 : animationRefOptions.params) !== null && _a !== void 0 ? _a : {}, context.errors));
        innerContext.delayNextStep(animationDelayValue);
      }
    }
  }
  _visitSubInstructions(instructions, context, options) {
    const startTime = context.currentTimeline.currentTime;
    let furthestTime = startTime;
    const duration = options.duration != null ? resolveTimingValue(options.duration) : null;
    const delay = options.delay != null ? resolveTimingValue(options.delay) : null;
    if (duration !== 0) {
      instructions.forEach((instruction) => {
        const instructionTimings = context.appendInstructionToTimeline(instruction, duration, delay);
        furthestTime = Math.max(furthestTime, instructionTimings.duration + instructionTimings.delay);
      });
    }
    return furthestTime;
  }
  visitReference(ast, context) {
    context.updateOptions(ast.options, true);
    visitDslNode(this, ast.animation, context);
    context.previousNode = ast;
  }
  visitSequence(ast, context) {
    const subContextCount = context.subContextCount;
    let ctx = context;
    const options = ast.options;
    if (options && (options.params || options.delay)) {
      ctx = context.createSubContext(options);
      ctx.transformIntoNewTimeline();
      if (options.delay != null) {
        if (ctx.previousNode.type == 6) {
          ctx.currentTimeline.snapshotCurrentStyles();
          ctx.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
        }
        const delay = resolveTimingValue(options.delay);
        ctx.delayNextStep(delay);
      }
    }
    if (ast.steps.length) {
      ast.steps.forEach((s) => visitDslNode(this, s, ctx));
      ctx.currentTimeline.applyStylesToKeyframe();
      if (ctx.subContextCount > subContextCount) {
        ctx.transformIntoNewTimeline();
      }
    }
    context.previousNode = ast;
  }
  visitGroup(ast, context) {
    const innerTimelines = [];
    let furthestTime = context.currentTimeline.currentTime;
    const delay = ast.options && ast.options.delay ? resolveTimingValue(ast.options.delay) : 0;
    ast.steps.forEach((s) => {
      const innerContext = context.createSubContext(ast.options);
      if (delay) {
        innerContext.delayNextStep(delay);
      }
      visitDslNode(this, s, innerContext);
      furthestTime = Math.max(furthestTime, innerContext.currentTimeline.currentTime);
      innerTimelines.push(innerContext.currentTimeline);
    });
    innerTimelines.forEach((timeline) => context.currentTimeline.mergeTimelineCollectedStyles(timeline));
    context.transformIntoNewTimeline(furthestTime);
    context.previousNode = ast;
  }
  _visitTiming(ast, context) {
    if (ast.dynamic) {
      const strValue = ast.strValue;
      const timingValue = context.params ? interpolateParams(strValue, context.params, context.errors) : strValue;
      return resolveTiming(timingValue, context.errors);
    } else {
      return {
        duration: ast.duration,
        delay: ast.delay,
        easing: ast.easing
      };
    }
  }
  visitAnimate(ast, context) {
    const timings = context.currentAnimateTimings = this._visitTiming(ast.timings, context);
    const timeline = context.currentTimeline;
    if (timings.delay) {
      context.incrementTime(timings.delay);
      timeline.snapshotCurrentStyles();
    }
    const style2 = ast.style;
    if (style2.type == 5) {
      this.visitKeyframes(style2, context);
    } else {
      context.incrementTime(timings.duration);
      this.visitStyle(style2, context);
      timeline.applyStylesToKeyframe();
    }
    context.currentAnimateTimings = null;
    context.previousNode = ast;
  }
  visitStyle(ast, context) {
    const timeline = context.currentTimeline;
    const timings = context.currentAnimateTimings;
    if (!timings && timeline.hasCurrentStyleProperties()) {
      timeline.forwardFrame();
    }
    const easing = timings && timings.easing || ast.easing;
    if (ast.isEmptyStep) {
      timeline.applyEmptyStep(easing);
    } else {
      timeline.setStyles(ast.styles, easing, context.errors, context.options);
    }
    context.previousNode = ast;
  }
  visitKeyframes(ast, context) {
    const currentAnimateTimings = context.currentAnimateTimings;
    const startTime = context.currentTimeline.duration;
    const duration = currentAnimateTimings.duration;
    const innerContext = context.createSubContext();
    const innerTimeline = innerContext.currentTimeline;
    innerTimeline.easing = currentAnimateTimings.easing;
    ast.styles.forEach((step) => {
      const offset = step.offset || 0;
      innerTimeline.forwardTime(offset * duration);
      innerTimeline.setStyles(step.styles, step.easing, context.errors, context.options);
      innerTimeline.applyStylesToKeyframe();
    });
    context.currentTimeline.mergeTimelineCollectedStyles(innerTimeline);
    context.transformIntoNewTimeline(startTime + duration);
    context.previousNode = ast;
  }
  visitQuery(ast, context) {
    const startTime = context.currentTimeline.currentTime;
    const options = ast.options || {};
    const delay = options.delay ? resolveTimingValue(options.delay) : 0;
    if (delay && (context.previousNode.type === 6 || startTime == 0 && context.currentTimeline.hasCurrentStyleProperties())) {
      context.currentTimeline.snapshotCurrentStyles();
      context.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
    }
    let furthestTime = startTime;
    const elms = context.invokeQuery(ast.selector, ast.originalSelector, ast.limit, ast.includeSelf, options.optional ? true : false, context.errors);
    context.currentQueryTotal = elms.length;
    let sameElementTimeline = null;
    elms.forEach((element, i) => {
      context.currentQueryIndex = i;
      const innerContext = context.createSubContext(ast.options, element);
      if (delay) {
        innerContext.delayNextStep(delay);
      }
      if (element === context.element) {
        sameElementTimeline = innerContext.currentTimeline;
      }
      visitDslNode(this, ast.animation, innerContext);
      innerContext.currentTimeline.applyStylesToKeyframe();
      const endTime = innerContext.currentTimeline.currentTime;
      furthestTime = Math.max(furthestTime, endTime);
    });
    context.currentQueryIndex = 0;
    context.currentQueryTotal = 0;
    context.transformIntoNewTimeline(furthestTime);
    if (sameElementTimeline) {
      context.currentTimeline.mergeTimelineCollectedStyles(sameElementTimeline);
      context.currentTimeline.snapshotCurrentStyles();
    }
    context.previousNode = ast;
  }
  visitStagger(ast, context) {
    const parentContext = context.parentContext;
    const tl = context.currentTimeline;
    const timings = ast.timings;
    const duration = Math.abs(timings.duration);
    const maxTime = duration * (context.currentQueryTotal - 1);
    let delay = duration * context.currentQueryIndex;
    let staggerTransformer = timings.duration < 0 ? "reverse" : timings.easing;
    switch (staggerTransformer) {
      case "reverse":
        delay = maxTime - delay;
        break;
      case "full":
        delay = parentContext.currentStaggerTime;
        break;
    }
    const timeline = context.currentTimeline;
    if (delay) {
      timeline.delayNextStep(delay);
    }
    const startingTime = timeline.currentTime;
    visitDslNode(this, ast.animation, context);
    context.previousNode = ast;
    parentContext.currentStaggerTime = tl.currentTime - startingTime + (tl.startTime - parentContext.currentTimeline.startTime);
  }
}
const DEFAULT_NOOP_PREVIOUS_NODE = {};
class AnimationTimelineContext {
  constructor(_driver, element, subInstructions, _enterClassName, _leaveClassName, errors, timelines, initialTimeline) {
    this._driver = _driver;
    this.element = element;
    this.subInstructions = subInstructions;
    this._enterClassName = _enterClassName;
    this._leaveClassName = _leaveClassName;
    this.errors = errors;
    this.timelines = timelines;
    this.parentContext = null;
    this.currentAnimateTimings = null;
    this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
    this.subContextCount = 0;
    this.options = {};
    this.currentQueryIndex = 0;
    this.currentQueryTotal = 0;
    this.currentStaggerTime = 0;
    this.currentTimeline = initialTimeline || new TimelineBuilder(this._driver, element, 0);
    timelines.push(this.currentTimeline);
  }
  get params() {
    return this.options.params;
  }
  updateOptions(options, skipIfExists) {
    if (!options)
      return;
    const newOptions = options;
    let optionsToUpdate = this.options;
    if (newOptions.duration != null) {
      optionsToUpdate.duration = resolveTimingValue(newOptions.duration);
    }
    if (newOptions.delay != null) {
      optionsToUpdate.delay = resolveTimingValue(newOptions.delay);
    }
    const newParams = newOptions.params;
    if (newParams) {
      let paramsToUpdate = optionsToUpdate.params;
      if (!paramsToUpdate) {
        paramsToUpdate = this.options.params = {};
      }
      Object.keys(newParams).forEach((name) => {
        if (!skipIfExists || !paramsToUpdate.hasOwnProperty(name)) {
          paramsToUpdate[name] = interpolateParams(newParams[name], paramsToUpdate, this.errors);
        }
      });
    }
  }
  _copyOptions() {
    const options = {};
    if (this.options) {
      const oldParams = this.options.params;
      if (oldParams) {
        const params = options["params"] = {};
        Object.keys(oldParams).forEach((name) => {
          params[name] = oldParams[name];
        });
      }
    }
    return options;
  }
  createSubContext(options = null, element, newTime) {
    const target = element || this.element;
    const context = new AnimationTimelineContext(this._driver, target, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(target, newTime || 0));
    context.previousNode = this.previousNode;
    context.currentAnimateTimings = this.currentAnimateTimings;
    context.options = this._copyOptions();
    context.updateOptions(options);
    context.currentQueryIndex = this.currentQueryIndex;
    context.currentQueryTotal = this.currentQueryTotal;
    context.parentContext = this;
    this.subContextCount++;
    return context;
  }
  transformIntoNewTimeline(newTime) {
    this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
    this.currentTimeline = this.currentTimeline.fork(this.element, newTime);
    this.timelines.push(this.currentTimeline);
    return this.currentTimeline;
  }
  appendInstructionToTimeline(instruction, duration, delay) {
    const updatedTimings = {
      duration: duration != null ? duration : instruction.duration,
      delay: this.currentTimeline.currentTime + (delay != null ? delay : 0) + instruction.delay,
      easing: ""
    };
    const builder = new SubTimelineBuilder(this._driver, instruction.element, instruction.keyframes, instruction.preStyleProps, instruction.postStyleProps, updatedTimings, instruction.stretchStartingKeyframe);
    this.timelines.push(builder);
    return updatedTimings;
  }
  incrementTime(time) {
    this.currentTimeline.forwardTime(this.currentTimeline.duration + time);
  }
  delayNextStep(delay) {
    if (delay > 0) {
      this.currentTimeline.delayNextStep(delay);
    }
  }
  invokeQuery(selector, originalSelector, limit, includeSelf, optional, errors) {
    let results = [];
    if (includeSelf) {
      results.push(this.element);
    }
    if (selector.length > 0) {
      selector = selector.replace(ENTER_TOKEN_REGEX, "." + this._enterClassName);
      selector = selector.replace(LEAVE_TOKEN_REGEX, "." + this._leaveClassName);
      const multi = limit != 1;
      let elements = this._driver.query(this.element, selector, multi);
      if (limit !== 0) {
        elements = limit < 0 ? elements.slice(elements.length + limit, elements.length) : elements.slice(0, limit);
      }
      results.push(...elements);
    }
    if (!optional && results.length == 0) {
      errors.push(invalidQuery(originalSelector));
    }
    return results;
  }
}
class TimelineBuilder {
  constructor(_driver, element, startTime, _elementTimelineStylesLookup) {
    this._driver = _driver;
    this.element = element;
    this.startTime = startTime;
    this._elementTimelineStylesLookup = _elementTimelineStylesLookup;
    this.duration = 0;
    this._previousKeyframe = /* @__PURE__ */ new Map();
    this._currentKeyframe = /* @__PURE__ */ new Map();
    this._keyframes = /* @__PURE__ */ new Map();
    this._styleSummary = /* @__PURE__ */ new Map();
    this._localTimelineStyles = /* @__PURE__ */ new Map();
    this._pendingStyles = /* @__PURE__ */ new Map();
    this._backFill = /* @__PURE__ */ new Map();
    this._currentEmptyStepKeyframe = null;
    if (!this._elementTimelineStylesLookup) {
      this._elementTimelineStylesLookup = /* @__PURE__ */ new Map();
    }
    this._globalTimelineStyles = this._elementTimelineStylesLookup.get(element);
    if (!this._globalTimelineStyles) {
      this._globalTimelineStyles = this._localTimelineStyles;
      this._elementTimelineStylesLookup.set(element, this._localTimelineStyles);
    }
    this._loadKeyframe();
  }
  containsAnimation() {
    switch (this._keyframes.size) {
      case 0:
        return false;
      case 1:
        return this.hasCurrentStyleProperties();
      default:
        return true;
    }
  }
  hasCurrentStyleProperties() {
    return this._currentKeyframe.size > 0;
  }
  get currentTime() {
    return this.startTime + this.duration;
  }
  delayNextStep(delay) {
    const hasPreStyleStep = this._keyframes.size === 1 && this._pendingStyles.size;
    if (this.duration || hasPreStyleStep) {
      this.forwardTime(this.currentTime + delay);
      if (hasPreStyleStep) {
        this.snapshotCurrentStyles();
      }
    } else {
      this.startTime += delay;
    }
  }
  fork(element, currentTime) {
    this.applyStylesToKeyframe();
    return new TimelineBuilder(this._driver, element, currentTime || this.currentTime, this._elementTimelineStylesLookup);
  }
  _loadKeyframe() {
    if (this._currentKeyframe) {
      this._previousKeyframe = this._currentKeyframe;
    }
    this._currentKeyframe = this._keyframes.get(this.duration);
    if (!this._currentKeyframe) {
      this._currentKeyframe = /* @__PURE__ */ new Map();
      this._keyframes.set(this.duration, this._currentKeyframe);
    }
  }
  forwardFrame() {
    this.duration += ONE_FRAME_IN_MILLISECONDS;
    this._loadKeyframe();
  }
  forwardTime(time) {
    this.applyStylesToKeyframe();
    this.duration = time;
    this._loadKeyframe();
  }
  _updateStyle(prop, value) {
    this._localTimelineStyles.set(prop, value);
    this._globalTimelineStyles.set(prop, value);
    this._styleSummary.set(prop, {
      time: this.currentTime,
      value
    });
  }
  allowOnlyTimelineStyles() {
    return this._currentEmptyStepKeyframe !== this._currentKeyframe;
  }
  applyEmptyStep(easing) {
    if (easing) {
      this._previousKeyframe.set("easing", easing);
    }
    for (let [prop, value] of this._globalTimelineStyles) {
      this._backFill.set(prop, value || AUTO_STYLE);
      this._currentKeyframe.set(prop, AUTO_STYLE);
    }
    this._currentEmptyStepKeyframe = this._currentKeyframe;
  }
  setStyles(input, easing, errors, options) {
    var _a;
    if (easing) {
      this._previousKeyframe.set("easing", easing);
    }
    const params = options && options.params || {};
    const styles = flattenStyles(input, this._globalTimelineStyles);
    for (let [prop, value] of styles) {
      const val = interpolateParams(value, params, errors);
      this._pendingStyles.set(prop, val);
      if (!this._localTimelineStyles.has(prop)) {
        this._backFill.set(prop, (_a = this._globalTimelineStyles.get(prop)) !== null && _a !== void 0 ? _a : AUTO_STYLE);
      }
      this._updateStyle(prop, val);
    }
  }
  applyStylesToKeyframe() {
    if (this._pendingStyles.size == 0)
      return;
    this._pendingStyles.forEach((val, prop) => {
      this._currentKeyframe.set(prop, val);
    });
    this._pendingStyles.clear();
    this._localTimelineStyles.forEach((val, prop) => {
      if (!this._currentKeyframe.has(prop)) {
        this._currentKeyframe.set(prop, val);
      }
    });
  }
  snapshotCurrentStyles() {
    for (let [prop, val] of this._localTimelineStyles) {
      this._pendingStyles.set(prop, val);
      this._updateStyle(prop, val);
    }
  }
  getFinalKeyframe() {
    return this._keyframes.get(this.duration);
  }
  get properties() {
    const properties = [];
    for (let prop in this._currentKeyframe) {
      properties.push(prop);
    }
    return properties;
  }
  mergeTimelineCollectedStyles(timeline) {
    timeline._styleSummary.forEach((details1, prop) => {
      const details0 = this._styleSummary.get(prop);
      if (!details0 || details1.time > details0.time) {
        this._updateStyle(prop, details1.value);
      }
    });
  }
  buildKeyframes() {
    this.applyStylesToKeyframe();
    const preStyleProps = /* @__PURE__ */ new Set();
    const postStyleProps = /* @__PURE__ */ new Set();
    const isEmpty = this._keyframes.size === 1 && this.duration === 0;
    let finalKeyframes = [];
    this._keyframes.forEach((keyframe, time) => {
      const finalKeyframe = copyStyles(keyframe, /* @__PURE__ */ new Map(), this._backFill);
      finalKeyframe.forEach((value, prop) => {
        if (value === ɵPRE_STYLE) {
          preStyleProps.add(prop);
        } else if (value === AUTO_STYLE) {
          postStyleProps.add(prop);
        }
      });
      if (!isEmpty) {
        finalKeyframe.set("offset", time / this.duration);
      }
      finalKeyframes.push(finalKeyframe);
    });
    const preProps = preStyleProps.size ? iteratorToArray(preStyleProps.values()) : [];
    const postProps = postStyleProps.size ? iteratorToArray(postStyleProps.values()) : [];
    if (isEmpty) {
      const kf0 = finalKeyframes[0];
      const kf1 = new Map(kf0);
      kf0.set("offset", 0);
      kf1.set("offset", 1);
      finalKeyframes = [kf0, kf1];
    }
    return createTimelineInstruction(this.element, finalKeyframes, preProps, postProps, this.duration, this.startTime, this.easing, false);
  }
}
class SubTimelineBuilder extends TimelineBuilder {
  constructor(driver, element, keyframes, preStyleProps, postStyleProps, timings, _stretchStartingKeyframe = false) {
    super(driver, element, timings.delay);
    this.keyframes = keyframes;
    this.preStyleProps = preStyleProps;
    this.postStyleProps = postStyleProps;
    this._stretchStartingKeyframe = _stretchStartingKeyframe;
    this.timings = {
      duration: timings.duration,
      delay: timings.delay,
      easing: timings.easing
    };
  }
  containsAnimation() {
    return this.keyframes.length > 1;
  }
  buildKeyframes() {
    let keyframes = this.keyframes;
    let {
      delay,
      duration,
      easing
    } = this.timings;
    if (this._stretchStartingKeyframe && delay) {
      const newKeyframes = [];
      const totalTime = duration + delay;
      const startingGap = delay / totalTime;
      const newFirstKeyframe = copyStyles(keyframes[0]);
      newFirstKeyframe.set("offset", 0);
      newKeyframes.push(newFirstKeyframe);
      const oldFirstKeyframe = copyStyles(keyframes[0]);
      oldFirstKeyframe.set("offset", roundOffset(startingGap));
      newKeyframes.push(oldFirstKeyframe);
      const limit = keyframes.length - 1;
      for (let i = 1; i <= limit; i++) {
        let kf = copyStyles(keyframes[i]);
        const oldOffset = kf.get("offset");
        const timeAtKeyframe = delay + oldOffset * duration;
        kf.set("offset", roundOffset(timeAtKeyframe / totalTime));
        newKeyframes.push(kf);
      }
      duration = totalTime;
      delay = 0;
      easing = "";
      keyframes = newKeyframes;
    }
    return createTimelineInstruction(this.element, keyframes, this.preStyleProps, this.postStyleProps, duration, delay, easing, true);
  }
}
function roundOffset(offset, decimalPoints = 3) {
  const mult = Math.pow(10, decimalPoints - 1);
  return Math.round(offset * mult) / mult;
}
function flattenStyles(input, allStyles) {
  const styles = /* @__PURE__ */ new Map();
  let allProperties;
  input.forEach((token) => {
    if (token === "*") {
      allProperties = allProperties || allStyles.keys();
      for (let prop of allProperties) {
        styles.set(prop, AUTO_STYLE);
      }
    } else {
      copyStyles(token, styles);
    }
  });
  return styles;
}
class AnimationStyleNormalizer {
}
const DIMENSIONAL_PROP_SET = /* @__PURE__ */ new Set(["width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "left", "top", "bottom", "right", "fontSize", "outlineWidth", "outlineOffset", "paddingTop", "paddingLeft", "paddingBottom", "paddingRight", "marginTop", "marginLeft", "marginBottom", "marginRight", "borderRadius", "borderWidth", "borderTopWidth", "borderLeftWidth", "borderRightWidth", "borderBottomWidth", "textIndent", "perspective"]);
class WebAnimationsStyleNormalizer extends AnimationStyleNormalizer {
  normalizePropertyName(propertyName, errors) {
    return dashCaseToCamelCase$1(propertyName);
  }
  normalizeStyleValue(userProvidedProperty, normalizedProperty, value, errors) {
    let unit = "";
    const strVal = value.toString().trim();
    if (DIMENSIONAL_PROP_SET.has(normalizedProperty) && value !== 0 && value !== "0") {
      if (typeof value === "number") {
        unit = "px";
      } else {
        const valAndSuffixMatch = value.match(/^[+-]?[\d\.]+([a-z]*)$/);
        if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
          errors.push(invalidCssUnitValue(userProvidedProperty, value));
        }
      }
    }
    return strVal + unit;
  }
}
function createTransitionInstruction(element, triggerName, fromState, toState, isRemovalTransition, fromStyles, toStyles, timelines, queriedElements, preStyleProps, postStyleProps, totalTime, errors) {
  return {
    type: 0,
    element,
    triggerName,
    isRemovalTransition,
    fromState,
    fromStyles,
    toState,
    toStyles,
    timelines,
    queriedElements,
    preStyleProps,
    postStyleProps,
    totalTime,
    errors
  };
}
const EMPTY_OBJECT = {};
class AnimationTransitionFactory {
  constructor(_triggerName, ast, _stateStyles) {
    this._triggerName = _triggerName;
    this.ast = ast;
    this._stateStyles = _stateStyles;
  }
  match(currentState, nextState, element, params) {
    return oneOrMoreTransitionsMatch(this.ast.matchers, currentState, nextState, element, params);
  }
  buildStyles(stateName, params, errors) {
    let styler = this._stateStyles.get("*");
    if (stateName !== void 0) {
      styler = this._stateStyles.get(stateName === null || stateName === void 0 ? void 0 : stateName.toString()) || styler;
    }
    return styler ? styler.buildStyles(params, errors) : /* @__PURE__ */ new Map();
  }
  build(driver, element, currentState, nextState, enterClassName, leaveClassName, currentOptions, nextOptions, subInstructions, skipAstBuild) {
    var _a;
    const errors = [];
    const transitionAnimationParams = this.ast.options && this.ast.options.params || EMPTY_OBJECT;
    const currentAnimationParams = currentOptions && currentOptions.params || EMPTY_OBJECT;
    const currentStateStyles = this.buildStyles(currentState, currentAnimationParams, errors);
    const nextAnimationParams = nextOptions && nextOptions.params || EMPTY_OBJECT;
    const nextStateStyles = this.buildStyles(nextState, nextAnimationParams, errors);
    const queriedElements = /* @__PURE__ */ new Set();
    const preStyleMap = /* @__PURE__ */ new Map();
    const postStyleMap = /* @__PURE__ */ new Map();
    const isRemoval = nextState === "void";
    const animationOptions = {
      params: applyParamDefaults(nextAnimationParams, transitionAnimationParams),
      delay: (_a = this.ast.options) === null || _a === void 0 ? void 0 : _a.delay
    };
    const timelines = skipAstBuild ? [] : buildAnimationTimelines(driver, element, this.ast.animation, enterClassName, leaveClassName, currentStateStyles, nextStateStyles, animationOptions, subInstructions, errors);
    let totalTime = 0;
    timelines.forEach((tl) => {
      totalTime = Math.max(tl.duration + tl.delay, totalTime);
    });
    if (errors.length) {
      return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, [], [], preStyleMap, postStyleMap, totalTime, errors);
    }
    timelines.forEach((tl) => {
      const elm = tl.element;
      const preProps = getOrSetDefaultValue(preStyleMap, elm, /* @__PURE__ */ new Set());
      tl.preStyleProps.forEach((prop) => preProps.add(prop));
      const postProps = getOrSetDefaultValue(postStyleMap, elm, /* @__PURE__ */ new Set());
      tl.postStyleProps.forEach((prop) => postProps.add(prop));
      if (elm !== element) {
        queriedElements.add(elm);
      }
    });
    if (false) {
      checkNonAnimatableInTimelines(timelines, this._triggerName, driver);
    }
    const queriedElementsList = iteratorToArray(queriedElements.values());
    return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, timelines, queriedElementsList, preStyleMap, postStyleMap, totalTime);
  }
}
function checkNonAnimatableInTimelines(timelines, triggerName, driver) {
  if (!driver.validateAnimatableStyleProperty) {
    return;
  }
  const allowedNonAnimatableProps = /* @__PURE__ */ new Set([
    // 'easing' is a utility/synthetic prop we use to represent
    // easing functions, it represents a property of the animation
    // which is not animatable but different values can be used
    // in different steps
    "easing"
  ]);
  const invalidNonAnimatableProps = /* @__PURE__ */ new Set();
  timelines.forEach(({
    keyframes
  }) => {
    const nonAnimatablePropsInitialValues = /* @__PURE__ */ new Map();
    keyframes.forEach((keyframe) => {
      const entriesToCheck = Array.from(keyframe.entries()).filter(([prop]) => !allowedNonAnimatableProps.has(prop));
      for (const [prop, value] of entriesToCheck) {
        if (!driver.validateAnimatableStyleProperty(prop)) {
          if (nonAnimatablePropsInitialValues.has(prop) && !invalidNonAnimatableProps.has(prop)) {
            const propInitialValue = nonAnimatablePropsInitialValues.get(prop);
            if (propInitialValue !== value) {
              invalidNonAnimatableProps.add(prop);
            }
          } else {
            nonAnimatablePropsInitialValues.set(prop, value);
          }
        }
      }
    });
  });
  if (invalidNonAnimatableProps.size > 0) {
    console.warn(`Warning: The animation trigger "${triggerName}" is attempting to animate the following not animatable properties: ` + Array.from(invalidNonAnimatableProps).join(", ") + "\n(to check the list of all animatable properties visit https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)");
  }
}
function oneOrMoreTransitionsMatch(matchFns, currentState, nextState, element, params) {
  return matchFns.some((fn) => fn(currentState, nextState, element, params));
}
function applyParamDefaults(userParams, defaults) {
  const result = copyObj(defaults);
  for (const key in userParams) {
    if (userParams.hasOwnProperty(key) && userParams[key] != null) {
      result[key] = userParams[key];
    }
  }
  return result;
}
class AnimationStateStyles {
  constructor(styles, defaultParams, normalizer) {
    this.styles = styles;
    this.defaultParams = defaultParams;
    this.normalizer = normalizer;
  }
  buildStyles(params, errors) {
    const finalStyles = /* @__PURE__ */ new Map();
    const combinedParams = copyObj(this.defaultParams);
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== null) {
        combinedParams[key] = value;
      }
    });
    this.styles.styles.forEach((value) => {
      if (typeof value !== "string") {
        value.forEach((val, prop) => {
          if (val) {
            val = interpolateParams(val, combinedParams, errors);
          }
          const normalizedProp = this.normalizer.normalizePropertyName(prop, errors);
          val = this.normalizer.normalizeStyleValue(prop, normalizedProp, val, errors);
          finalStyles.set(prop, val);
        });
      }
    });
    return finalStyles;
  }
}
function buildTrigger(name, ast, normalizer) {
  return new AnimationTrigger(name, ast, normalizer);
}
class AnimationTrigger {
  constructor(name, ast, _normalizer) {
    this.name = name;
    this.ast = ast;
    this._normalizer = _normalizer;
    this.transitionFactories = [];
    this.states = /* @__PURE__ */ new Map();
    ast.states.forEach((ast2) => {
      const defaultParams = ast2.options && ast2.options.params || {};
      this.states.set(ast2.name, new AnimationStateStyles(ast2.style, defaultParams, _normalizer));
    });
    balanceProperties(this.states, "true", "1");
    balanceProperties(this.states, "false", "0");
    ast.transitions.forEach((ast2) => {
      this.transitionFactories.push(new AnimationTransitionFactory(name, ast2, this.states));
    });
    this.fallbackTransition = createFallbackTransition(name, this.states, this._normalizer);
  }
  get containsQueries() {
    return this.ast.queryCount > 0;
  }
  matchTransition(currentState, nextState, element, params) {
    const entry = this.transitionFactories.find((f) => f.match(currentState, nextState, element, params));
    return entry || null;
  }
  matchStyles(currentState, params, errors) {
    return this.fallbackTransition.buildStyles(currentState, params, errors);
  }
}
function createFallbackTransition(triggerName, states, normalizer) {
  const matchers = [(fromState, toState) => true];
  const animation = {
    type: 2,
    steps: [],
    options: null
  };
  const transition = {
    type: 1,
    animation,
    matchers,
    options: null,
    queryCount: 0,
    depCount: 0
  };
  return new AnimationTransitionFactory(triggerName, transition, states);
}
function balanceProperties(stateMap, key1, key2) {
  if (stateMap.has(key1)) {
    if (!stateMap.has(key2)) {
      stateMap.set(key2, stateMap.get(key1));
    }
  } else if (stateMap.has(key2)) {
    stateMap.set(key1, stateMap.get(key2));
  }
}
const EMPTY_INSTRUCTION_MAP = /* @__PURE__ */ new ElementInstructionMap();
class TimelineAnimationEngine {
  constructor(bodyNode, _driver, _normalizer) {
    this.bodyNode = bodyNode;
    this._driver = _driver;
    this._normalizer = _normalizer;
    this._animations = /* @__PURE__ */ new Map();
    this._playersById = /* @__PURE__ */ new Map();
    this.players = [];
  }
  register(id, metadata) {
    const errors = [];
    const warnings = [];
    const ast = buildAnimationAst(this._driver, metadata, errors, warnings);
    if (errors.length) {
      throw registerFailed(errors);
    } else {
      if (warnings.length) {
        warnRegister(warnings);
      }
      this._animations.set(id, ast);
    }
  }
  _buildPlayer(i, preStyles, postStyles) {
    const element = i.element;
    const keyframes = normalizeKeyframes$1(this._driver, this._normalizer, element, i.keyframes, preStyles, postStyles);
    return this._driver.animate(element, keyframes, i.duration, i.delay, i.easing, [], true);
  }
  create(id, element, options = {}) {
    const errors = [];
    const ast = this._animations.get(id);
    let instructions;
    const autoStylesMap = /* @__PURE__ */ new Map();
    if (ast) {
      instructions = buildAnimationTimelines(this._driver, element, ast, ENTER_CLASSNAME, LEAVE_CLASSNAME, /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map(), options, EMPTY_INSTRUCTION_MAP, errors);
      instructions.forEach((inst) => {
        const styles = getOrSetDefaultValue(autoStylesMap, inst.element, /* @__PURE__ */ new Map());
        inst.postStyleProps.forEach((prop) => styles.set(prop, null));
      });
    } else {
      errors.push(missingOrDestroyedAnimation());
      instructions = [];
    }
    if (errors.length) {
      throw createAnimationFailed(errors);
    }
    autoStylesMap.forEach((styles, element2) => {
      styles.forEach((_, prop) => {
        styles.set(prop, this._driver.computeStyle(element2, prop, AUTO_STYLE));
      });
    });
    const players = instructions.map((i) => {
      const styles = autoStylesMap.get(i.element);
      return this._buildPlayer(i, /* @__PURE__ */ new Map(), styles);
    });
    const player = optimizeGroupPlayer(players);
    this._playersById.set(id, player);
    player.onDestroy(() => this.destroy(id));
    this.players.push(player);
    return player;
  }
  destroy(id) {
    const player = this._getPlayer(id);
    player.destroy();
    this._playersById.delete(id);
    const index = this.players.indexOf(player);
    if (index >= 0) {
      this.players.splice(index, 1);
    }
  }
  _getPlayer(id) {
    const player = this._playersById.get(id);
    if (!player) {
      throw missingPlayer(id);
    }
    return player;
  }
  listen(id, element, eventName, callback) {
    const baseEvent = makeAnimationEvent(element, "", "", "");
    listenOnPlayer(this._getPlayer(id), eventName, baseEvent, callback);
    return () => {
    };
  }
  command(id, element, command, args) {
    if (command == "register") {
      this.register(id, args[0]);
      return;
    }
    if (command == "create") {
      const options = args[0] || {};
      this.create(id, element, options);
      return;
    }
    const player = this._getPlayer(id);
    switch (command) {
      case "play":
        player.play();
        break;
      case "pause":
        player.pause();
        break;
      case "reset":
        player.reset();
        break;
      case "restart":
        player.restart();
        break;
      case "finish":
        player.finish();
        break;
      case "init":
        player.init();
        break;
      case "setPosition":
        player.setPosition(parseFloat(args[0]));
        break;
      case "destroy":
        this.destroy(id);
        break;
    }
  }
}
const QUEUED_CLASSNAME = "ng-animate-queued";
const QUEUED_SELECTOR = ".ng-animate-queued";
const DISABLED_CLASSNAME = "ng-animate-disabled";
const DISABLED_SELECTOR = ".ng-animate-disabled";
const STAR_CLASSNAME = "ng-star-inserted";
const STAR_SELECTOR = ".ng-star-inserted";
const EMPTY_PLAYER_ARRAY = [];
const NULL_REMOVAL_STATE = {
  namespaceId: "",
  setForRemoval: false,
  setForMove: false,
  hasAnimation: false,
  removedBeforeQueried: false
};
const NULL_REMOVED_QUERIED_STATE = {
  namespaceId: "",
  setForMove: false,
  setForRemoval: false,
  hasAnimation: false,
  removedBeforeQueried: true
};
const REMOVAL_FLAG = "__ng_removed";
class StateValue {
  get params() {
    return this.options.params;
  }
  constructor(input, namespaceId = "") {
    this.namespaceId = namespaceId;
    const isObj = input && input.hasOwnProperty("value");
    const value = isObj ? input["value"] : input;
    this.value = normalizeTriggerValue(value);
    if (isObj) {
      const options = copyObj(input);
      delete options["value"];
      this.options = options;
    } else {
      this.options = {};
    }
    if (!this.options.params) {
      this.options.params = {};
    }
  }
  absorbOptions(options) {
    const newParams = options.params;
    if (newParams) {
      const oldParams = this.options.params;
      Object.keys(newParams).forEach((prop) => {
        if (oldParams[prop] == null) {
          oldParams[prop] = newParams[prop];
        }
      });
    }
  }
}
const VOID_VALUE = "void";
const DEFAULT_STATE_VALUE = /* @__PURE__ */ new StateValue(VOID_VALUE);
class AnimationTransitionNamespace {
  constructor(id, hostElement, _engine) {
    this.id = id;
    this.hostElement = hostElement;
    this._engine = _engine;
    this.players = [];
    this._triggers = /* @__PURE__ */ new Map();
    this._queue = [];
    this._elementListeners = /* @__PURE__ */ new Map();
    this._hostClassName = "ng-tns-" + id;
    addClass(hostElement, this._hostClassName);
  }
  listen(element, name, phase, callback) {
    if (!this._triggers.has(name)) {
      throw missingTrigger(phase, name);
    }
    if (phase == null || phase.length == 0) {
      throw missingEvent(name);
    }
    if (!isTriggerEventValid(phase)) {
      throw unsupportedTriggerEvent(phase, name);
    }
    const listeners = getOrSetDefaultValue(this._elementListeners, element, []);
    const data = {
      name,
      phase,
      callback
    };
    listeners.push(data);
    const triggersWithStates = getOrSetDefaultValue(this._engine.statesByElement, element, /* @__PURE__ */ new Map());
    if (!triggersWithStates.has(name)) {
      addClass(element, NG_TRIGGER_CLASSNAME);
      addClass(element, NG_TRIGGER_CLASSNAME + "-" + name);
      triggersWithStates.set(name, DEFAULT_STATE_VALUE);
    }
    return () => {
      this._engine.afterFlush(() => {
        const index = listeners.indexOf(data);
        if (index >= 0) {
          listeners.splice(index, 1);
        }
        if (!this._triggers.has(name)) {
          triggersWithStates.delete(name);
        }
      });
    };
  }
  register(name, ast) {
    if (this._triggers.has(name)) {
      return false;
    } else {
      this._triggers.set(name, ast);
      return true;
    }
  }
  _getTrigger(name) {
    const trigger = this._triggers.get(name);
    if (!trigger) {
      throw unregisteredTrigger(name);
    }
    return trigger;
  }
  trigger(element, triggerName, value, defaultToFallback = true) {
    const trigger = this._getTrigger(triggerName);
    const player = new TransitionAnimationPlayer(this.id, triggerName, element);
    let triggersWithStates = this._engine.statesByElement.get(element);
    if (!triggersWithStates) {
      addClass(element, NG_TRIGGER_CLASSNAME);
      addClass(element, NG_TRIGGER_CLASSNAME + "-" + triggerName);
      this._engine.statesByElement.set(element, triggersWithStates = /* @__PURE__ */ new Map());
    }
    let fromState = triggersWithStates.get(triggerName);
    const toState = new StateValue(value, this.id);
    const isObj = value && value.hasOwnProperty("value");
    if (!isObj && fromState) {
      toState.absorbOptions(fromState.options);
    }
    triggersWithStates.set(triggerName, toState);
    if (!fromState) {
      fromState = DEFAULT_STATE_VALUE;
    }
    const isRemoval = toState.value === VOID_VALUE;
    if (!isRemoval && fromState.value === toState.value) {
      if (!objEquals(fromState.params, toState.params)) {
        const errors = [];
        const fromStyles = trigger.matchStyles(fromState.value, fromState.params, errors);
        const toStyles = trigger.matchStyles(toState.value, toState.params, errors);
        if (errors.length) {
          this._engine.reportError(errors);
        } else {
          this._engine.afterFlush(() => {
            eraseStyles(element, fromStyles);
            setStyles(element, toStyles);
          });
        }
      }
      return;
    }
    const playersOnElement = getOrSetDefaultValue(this._engine.playersByElement, element, []);
    playersOnElement.forEach((player2) => {
      if (player2.namespaceId == this.id && player2.triggerName == triggerName && player2.queued) {
        player2.destroy();
      }
    });
    let transition = trigger.matchTransition(fromState.value, toState.value, element, toState.params);
    let isFallbackTransition = false;
    if (!transition) {
      if (!defaultToFallback)
        return;
      transition = trigger.fallbackTransition;
      isFallbackTransition = true;
    }
    this._engine.totalQueuedPlayers++;
    this._queue.push({
      element,
      triggerName,
      transition,
      fromState,
      toState,
      player,
      isFallbackTransition
    });
    if (!isFallbackTransition) {
      addClass(element, QUEUED_CLASSNAME);
      player.onStart(() => {
        removeClass(element, QUEUED_CLASSNAME);
      });
    }
    player.onDone(() => {
      let index = this.players.indexOf(player);
      if (index >= 0) {
        this.players.splice(index, 1);
      }
      const players = this._engine.playersByElement.get(element);
      if (players) {
        let index2 = players.indexOf(player);
        if (index2 >= 0) {
          players.splice(index2, 1);
        }
      }
    });
    this.players.push(player);
    playersOnElement.push(player);
    return player;
  }
  deregister(name) {
    this._triggers.delete(name);
    this._engine.statesByElement.forEach((stateMap) => stateMap.delete(name));
    this._elementListeners.forEach((listeners, element) => {
      this._elementListeners.set(element, listeners.filter((entry) => {
        return entry.name != name;
      }));
    });
  }
  clearElementCache(element) {
    this._engine.statesByElement.delete(element);
    this._elementListeners.delete(element);
    const elementPlayers = this._engine.playersByElement.get(element);
    if (elementPlayers) {
      elementPlayers.forEach((player) => player.destroy());
      this._engine.playersByElement.delete(element);
    }
  }
  _signalRemovalForInnerTriggers(rootElement, context) {
    const elements = this._engine.driver.query(rootElement, NG_TRIGGER_SELECTOR, true);
    elements.forEach((elm) => {
      if (elm[REMOVAL_FLAG])
        return;
      const namespaces = this._engine.fetchNamespacesByElement(elm);
      if (namespaces.size) {
        namespaces.forEach((ns) => ns.triggerLeaveAnimation(elm, context, false, true));
      } else {
        this.clearElementCache(elm);
      }
    });
    this._engine.afterFlushAnimationsDone(() => elements.forEach((elm) => this.clearElementCache(elm)));
  }
  triggerLeaveAnimation(element, context, destroyAfterComplete, defaultToFallback) {
    const triggerStates = this._engine.statesByElement.get(element);
    const previousTriggersValues = /* @__PURE__ */ new Map();
    if (triggerStates) {
      const players = [];
      triggerStates.forEach((state, triggerName) => {
        previousTriggersValues.set(triggerName, state.value);
        if (this._triggers.has(triggerName)) {
          const player = this.trigger(element, triggerName, VOID_VALUE, defaultToFallback);
          if (player) {
            players.push(player);
          }
        }
      });
      if (players.length) {
        this._engine.markElementAsRemoved(this.id, element, true, context, previousTriggersValues);
        if (destroyAfterComplete) {
          optimizeGroupPlayer(players).onDone(() => this._engine.processLeaveNode(element));
        }
        return true;
      }
    }
    return false;
  }
  prepareLeaveAnimationListeners(element) {
    const listeners = this._elementListeners.get(element);
    const elementStates = this._engine.statesByElement.get(element);
    if (listeners && elementStates) {
      const visitedTriggers = /* @__PURE__ */ new Set();
      listeners.forEach((listener) => {
        const triggerName = listener.name;
        if (visitedTriggers.has(triggerName))
          return;
        visitedTriggers.add(triggerName);
        const trigger = this._triggers.get(triggerName);
        const transition = trigger.fallbackTransition;
        const fromState = elementStates.get(triggerName) || DEFAULT_STATE_VALUE;
        const toState = new StateValue(VOID_VALUE);
        const player = new TransitionAnimationPlayer(this.id, triggerName, element);
        this._engine.totalQueuedPlayers++;
        this._queue.push({
          element,
          triggerName,
          transition,
          fromState,
          toState,
          player,
          isFallbackTransition: true
        });
      });
    }
  }
  removeNode(element, context) {
    const engine = this._engine;
    if (element.childElementCount) {
      this._signalRemovalForInnerTriggers(element, context);
    }
    if (this.triggerLeaveAnimation(element, context, true))
      return;
    let containsPotentialParentTransition = false;
    if (engine.totalAnimations) {
      const currentPlayers = engine.players.length ? engine.playersByQueriedElement.get(element) : [];
      if (currentPlayers && currentPlayers.length) {
        containsPotentialParentTransition = true;
      } else {
        let parent = element;
        while (parent = parent.parentNode) {
          const triggers = engine.statesByElement.get(parent);
          if (triggers) {
            containsPotentialParentTransition = true;
            break;
          }
        }
      }
    }
    this.prepareLeaveAnimationListeners(element);
    if (containsPotentialParentTransition) {
      engine.markElementAsRemoved(this.id, element, false, context);
    } else {
      const removalFlag = element[REMOVAL_FLAG];
      if (!removalFlag || removalFlag === NULL_REMOVAL_STATE) {
        engine.afterFlush(() => this.clearElementCache(element));
        engine.destroyInnerAnimations(element);
        engine._onRemovalComplete(element, context);
      }
    }
  }
  insertNode(element, parent) {
    addClass(element, this._hostClassName);
  }
  drainQueuedTransitions(microtaskId) {
    const instructions = [];
    this._queue.forEach((entry) => {
      const player = entry.player;
      if (player.destroyed)
        return;
      const element = entry.element;
      const listeners = this._elementListeners.get(element);
      if (listeners) {
        listeners.forEach((listener) => {
          if (listener.name == entry.triggerName) {
            const baseEvent = makeAnimationEvent(element, entry.triggerName, entry.fromState.value, entry.toState.value);
            baseEvent["_data"] = microtaskId;
            listenOnPlayer(entry.player, listener.phase, baseEvent, listener.callback);
          }
        });
      }
      if (player.markedForDestroy) {
        this._engine.afterFlush(() => {
          player.destroy();
        });
      } else {
        instructions.push(entry);
      }
    });
    this._queue = [];
    return instructions.sort((a, b) => {
      const d0 = a.transition.ast.depCount;
      const d1 = b.transition.ast.depCount;
      if (d0 == 0 || d1 == 0) {
        return d0 - d1;
      }
      return this._engine.driver.containsElement(a.element, b.element) ? 1 : -1;
    });
  }
  destroy(context) {
    this.players.forEach((p) => p.destroy());
    this._signalRemovalForInnerTriggers(this.hostElement, context);
  }
  elementContainsData(element) {
    let containsData = false;
    if (this._elementListeners.has(element))
      containsData = true;
    containsData = (this._queue.find((entry) => entry.element === element) ? true : false) || containsData;
    return containsData;
  }
}
class TransitionAnimationEngine {
  /** @internal */
  _onRemovalComplete(element, context) {
    this.onRemovalComplete(element, context);
  }
  constructor(bodyNode, driver, _normalizer) {
    this.bodyNode = bodyNode;
    this.driver = driver;
    this._normalizer = _normalizer;
    this.players = [];
    this.newHostElements = /* @__PURE__ */ new Map();
    this.playersByElement = /* @__PURE__ */ new Map();
    this.playersByQueriedElement = /* @__PURE__ */ new Map();
    this.statesByElement = /* @__PURE__ */ new Map();
    this.disabledNodes = /* @__PURE__ */ new Set();
    this.totalAnimations = 0;
    this.totalQueuedPlayers = 0;
    this._namespaceLookup = {};
    this._namespaceList = [];
    this._flushFns = [];
    this._whenQuietFns = [];
    this.namespacesByHostElement = /* @__PURE__ */ new Map();
    this.collectedEnterElements = [];
    this.collectedLeaveElements = [];
    this.onRemovalComplete = (element, context) => {
    };
  }
  get queuedPlayers() {
    const players = [];
    this._namespaceList.forEach((ns) => {
      ns.players.forEach((player) => {
        if (player.queued) {
          players.push(player);
        }
      });
    });
    return players;
  }
  createNamespace(namespaceId, hostElement) {
    const ns = new AnimationTransitionNamespace(namespaceId, hostElement, this);
    if (this.bodyNode && this.driver.containsElement(this.bodyNode, hostElement)) {
      this._balanceNamespaceList(ns, hostElement);
    } else {
      this.newHostElements.set(hostElement, ns);
      this.collectEnterElement(hostElement);
    }
    return this._namespaceLookup[namespaceId] = ns;
  }
  _balanceNamespaceList(ns, hostElement) {
    const namespaceList = this._namespaceList;
    const namespacesByHostElement = this.namespacesByHostElement;
    const limit = namespaceList.length - 1;
    if (limit >= 0) {
      let found = false;
      let ancestor = this.driver.getParentElement(hostElement);
      while (ancestor) {
        const ancestorNs = namespacesByHostElement.get(ancestor);
        if (ancestorNs) {
          const index = namespaceList.indexOf(ancestorNs);
          namespaceList.splice(index + 1, 0, ns);
          found = true;
          break;
        }
        ancestor = this.driver.getParentElement(ancestor);
      }
      if (!found) {
        namespaceList.unshift(ns);
      }
    } else {
      namespaceList.push(ns);
    }
    namespacesByHostElement.set(hostElement, ns);
    return ns;
  }
  register(namespaceId, hostElement) {
    let ns = this._namespaceLookup[namespaceId];
    if (!ns) {
      ns = this.createNamespace(namespaceId, hostElement);
    }
    return ns;
  }
  registerTrigger(namespaceId, name, trigger) {
    let ns = this._namespaceLookup[namespaceId];
    if (ns && ns.register(name, trigger)) {
      this.totalAnimations++;
    }
  }
  destroy(namespaceId, context) {
    if (!namespaceId)
      return;
    const ns = this._fetchNamespace(namespaceId);
    this.afterFlush(() => {
      this.namespacesByHostElement.delete(ns.hostElement);
      delete this._namespaceLookup[namespaceId];
      const index = this._namespaceList.indexOf(ns);
      if (index >= 0) {
        this._namespaceList.splice(index, 1);
      }
    });
    this.afterFlushAnimationsDone(() => ns.destroy(context));
  }
  _fetchNamespace(id) {
    return this._namespaceLookup[id];
  }
  fetchNamespacesByElement(element) {
    const namespaces = /* @__PURE__ */ new Set();
    const elementStates = this.statesByElement.get(element);
    if (elementStates) {
      for (let stateValue of elementStates.values()) {
        if (stateValue.namespaceId) {
          const ns = this._fetchNamespace(stateValue.namespaceId);
          if (ns) {
            namespaces.add(ns);
          }
        }
      }
    }
    return namespaces;
  }
  trigger(namespaceId, element, name, value) {
    if (isElementNode(element)) {
      const ns = this._fetchNamespace(namespaceId);
      if (ns) {
        ns.trigger(element, name, value);
        return true;
      }
    }
    return false;
  }
  insertNode(namespaceId, element, parent, insertBefore) {
    if (!isElementNode(element))
      return;
    const details = element[REMOVAL_FLAG];
    if (details && details.setForRemoval) {
      details.setForRemoval = false;
      details.setForMove = true;
      const index = this.collectedLeaveElements.indexOf(element);
      if (index >= 0) {
        this.collectedLeaveElements.splice(index, 1);
      }
    }
    if (namespaceId) {
      const ns = this._fetchNamespace(namespaceId);
      if (ns) {
        ns.insertNode(element, parent);
      }
    }
    if (insertBefore) {
      this.collectEnterElement(element);
    }
  }
  collectEnterElement(element) {
    this.collectedEnterElements.push(element);
  }
  markElementAsDisabled(element, value) {
    if (value) {
      if (!this.disabledNodes.has(element)) {
        this.disabledNodes.add(element);
        addClass(element, DISABLED_CLASSNAME);
      }
    } else if (this.disabledNodes.has(element)) {
      this.disabledNodes.delete(element);
      removeClass(element, DISABLED_CLASSNAME);
    }
  }
  removeNode(namespaceId, element, isHostElement, context) {
    if (isElementNode(element)) {
      const ns = namespaceId ? this._fetchNamespace(namespaceId) : null;
      if (ns) {
        ns.removeNode(element, context);
      } else {
        this.markElementAsRemoved(namespaceId, element, false, context);
      }
      if (isHostElement) {
        const hostNS = this.namespacesByHostElement.get(element);
        if (hostNS && hostNS.id !== namespaceId) {
          hostNS.removeNode(element, context);
        }
      }
    } else {
      this._onRemovalComplete(element, context);
    }
  }
  markElementAsRemoved(namespaceId, element, hasAnimation, context, previousTriggersValues) {
    this.collectedLeaveElements.push(element);
    element[REMOVAL_FLAG] = {
      namespaceId,
      setForRemoval: context,
      hasAnimation,
      removedBeforeQueried: false,
      previousTriggersValues
    };
  }
  listen(namespaceId, element, name, phase, callback) {
    if (isElementNode(element)) {
      return this._fetchNamespace(namespaceId).listen(element, name, phase, callback);
    }
    return () => {
    };
  }
  _buildInstruction(entry, subTimelines, enterClassName, leaveClassName, skipBuildAst) {
    return entry.transition.build(this.driver, entry.element, entry.fromState.value, entry.toState.value, enterClassName, leaveClassName, entry.fromState.options, entry.toState.options, subTimelines, skipBuildAst);
  }
  destroyInnerAnimations(containerElement) {
    let elements = this.driver.query(containerElement, NG_TRIGGER_SELECTOR, true);
    elements.forEach((element) => this.destroyActiveAnimationsForElement(element));
    if (this.playersByQueriedElement.size == 0)
      return;
    elements = this.driver.query(containerElement, NG_ANIMATING_SELECTOR, true);
    elements.forEach((element) => this.finishActiveQueriedAnimationOnElement(element));
  }
  destroyActiveAnimationsForElement(element) {
    const players = this.playersByElement.get(element);
    if (players) {
      players.forEach((player) => {
        if (player.queued) {
          player.markedForDestroy = true;
        } else {
          player.destroy();
        }
      });
    }
  }
  finishActiveQueriedAnimationOnElement(element) {
    const players = this.playersByQueriedElement.get(element);
    if (players) {
      players.forEach((player) => player.finish());
    }
  }
  whenRenderingDone() {
    return new Promise((resolve) => {
      if (this.players.length) {
        return optimizeGroupPlayer(this.players).onDone(() => resolve());
      } else {
        resolve();
      }
    });
  }
  processLeaveNode(element) {
    var _a;
    const details = element[REMOVAL_FLAG];
    if (details && details.setForRemoval) {
      element[REMOVAL_FLAG] = NULL_REMOVAL_STATE;
      if (details.namespaceId) {
        this.destroyInnerAnimations(element);
        const ns = this._fetchNamespace(details.namespaceId);
        if (ns) {
          ns.clearElementCache(element);
        }
      }
      this._onRemovalComplete(element, details.setForRemoval);
    }
    if ((_a = element.classList) === null || _a === void 0 ? void 0 : _a.contains(DISABLED_CLASSNAME)) {
      this.markElementAsDisabled(element, false);
    }
    this.driver.query(element, DISABLED_SELECTOR, true).forEach((node) => {
      this.markElementAsDisabled(node, false);
    });
  }
  flush(microtaskId = -1) {
    let players = [];
    if (this.newHostElements.size) {
      this.newHostElements.forEach((ns, element) => this._balanceNamespaceList(ns, element));
      this.newHostElements.clear();
    }
    if (this.totalAnimations && this.collectedEnterElements.length) {
      for (let i = 0; i < this.collectedEnterElements.length; i++) {
        const elm = this.collectedEnterElements[i];
        addClass(elm, STAR_CLASSNAME);
      }
    }
    if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
      const cleanupFns = [];
      try {
        players = this._flushAnimations(cleanupFns, microtaskId);
      } finally {
        for (let i = 0; i < cleanupFns.length; i++) {
          cleanupFns[i]();
        }
      }
    } else {
      for (let i = 0; i < this.collectedLeaveElements.length; i++) {
        const element = this.collectedLeaveElements[i];
        this.processLeaveNode(element);
      }
    }
    this.totalQueuedPlayers = 0;
    this.collectedEnterElements.length = 0;
    this.collectedLeaveElements.length = 0;
    this._flushFns.forEach((fn) => fn());
    this._flushFns = [];
    if (this._whenQuietFns.length) {
      const quietFns = this._whenQuietFns;
      this._whenQuietFns = [];
      if (players.length) {
        optimizeGroupPlayer(players).onDone(() => {
          quietFns.forEach((fn) => fn());
        });
      } else {
        quietFns.forEach((fn) => fn());
      }
    }
  }
  reportError(errors) {
    throw triggerTransitionsFailed(errors);
  }
  _flushAnimations(cleanupFns, microtaskId) {
    const subTimelines = new ElementInstructionMap();
    const skippedPlayers = [];
    const skippedPlayersMap = /* @__PURE__ */ new Map();
    const queuedInstructions = [];
    const queriedElements = /* @__PURE__ */ new Map();
    const allPreStyleElements = /* @__PURE__ */ new Map();
    const allPostStyleElements = /* @__PURE__ */ new Map();
    const disabledElementsSet = /* @__PURE__ */ new Set();
    this.disabledNodes.forEach((node) => {
      disabledElementsSet.add(node);
      const nodesThatAreDisabled = this.driver.query(node, QUEUED_SELECTOR, true);
      for (let i2 = 0; i2 < nodesThatAreDisabled.length; i2++) {
        disabledElementsSet.add(nodesThatAreDisabled[i2]);
      }
    });
    const bodyNode = this.bodyNode;
    const allTriggerElements = Array.from(this.statesByElement.keys());
    const enterNodeMap = buildRootMap(allTriggerElements, this.collectedEnterElements);
    const enterNodeMapIds = /* @__PURE__ */ new Map();
    let i = 0;
    enterNodeMap.forEach((nodes, root) => {
      const className = ENTER_CLASSNAME + i++;
      enterNodeMapIds.set(root, className);
      nodes.forEach((node) => addClass(node, className));
    });
    const allLeaveNodes = [];
    const mergedLeaveNodes = /* @__PURE__ */ new Set();
    const leaveNodesWithoutAnimations = /* @__PURE__ */ new Set();
    for (let i2 = 0; i2 < this.collectedLeaveElements.length; i2++) {
      const element = this.collectedLeaveElements[i2];
      const details = element[REMOVAL_FLAG];
      if (details && details.setForRemoval) {
        allLeaveNodes.push(element);
        mergedLeaveNodes.add(element);
        if (details.hasAnimation) {
          this.driver.query(element, STAR_SELECTOR, true).forEach((elm) => mergedLeaveNodes.add(elm));
        } else {
          leaveNodesWithoutAnimations.add(element);
        }
      }
    }
    const leaveNodeMapIds = /* @__PURE__ */ new Map();
    const leaveNodeMap = buildRootMap(allTriggerElements, Array.from(mergedLeaveNodes));
    leaveNodeMap.forEach((nodes, root) => {
      const className = LEAVE_CLASSNAME + i++;
      leaveNodeMapIds.set(root, className);
      nodes.forEach((node) => addClass(node, className));
    });
    cleanupFns.push(() => {
      enterNodeMap.forEach((nodes, root) => {
        const className = enterNodeMapIds.get(root);
        nodes.forEach((node) => removeClass(node, className));
      });
      leaveNodeMap.forEach((nodes, root) => {
        const className = leaveNodeMapIds.get(root);
        nodes.forEach((node) => removeClass(node, className));
      });
      allLeaveNodes.forEach((element) => {
        this.processLeaveNode(element);
      });
    });
    const allPlayers = [];
    const erroneousTransitions = [];
    for (let i2 = this._namespaceList.length - 1; i2 >= 0; i2--) {
      const ns = this._namespaceList[i2];
      ns.drainQueuedTransitions(microtaskId).forEach((entry) => {
        const player = entry.player;
        const element = entry.element;
        allPlayers.push(player);
        if (this.collectedEnterElements.length) {
          const details = element[REMOVAL_FLAG];
          if (details && details.setForMove) {
            if (details.previousTriggersValues && details.previousTriggersValues.has(entry.triggerName)) {
              const previousValue = details.previousTriggersValues.get(entry.triggerName);
              const triggersWithStates = this.statesByElement.get(entry.element);
              if (triggersWithStates && triggersWithStates.has(entry.triggerName)) {
                const state = triggersWithStates.get(entry.triggerName);
                state.value = previousValue;
                triggersWithStates.set(entry.triggerName, state);
              }
            }
            player.destroy();
            return;
          }
        }
        const nodeIsOrphaned = !bodyNode || !this.driver.containsElement(bodyNode, element);
        const leaveClassName = leaveNodeMapIds.get(element);
        const enterClassName = enterNodeMapIds.get(element);
        const instruction = this._buildInstruction(entry, subTimelines, enterClassName, leaveClassName, nodeIsOrphaned);
        if (instruction.errors && instruction.errors.length) {
          erroneousTransitions.push(instruction);
          return;
        }
        if (nodeIsOrphaned) {
          player.onStart(() => eraseStyles(element, instruction.fromStyles));
          player.onDestroy(() => setStyles(element, instruction.toStyles));
          skippedPlayers.push(player);
          return;
        }
        if (entry.isFallbackTransition) {
          player.onStart(() => eraseStyles(element, instruction.fromStyles));
          player.onDestroy(() => setStyles(element, instruction.toStyles));
          skippedPlayers.push(player);
          return;
        }
        const timelines = [];
        instruction.timelines.forEach((tl) => {
          tl.stretchStartingKeyframe = true;
          if (!this.disabledNodes.has(tl.element)) {
            timelines.push(tl);
          }
        });
        instruction.timelines = timelines;
        subTimelines.append(element, instruction.timelines);
        const tuple = {
          instruction,
          player,
          element
        };
        queuedInstructions.push(tuple);
        instruction.queriedElements.forEach((element2) => getOrSetDefaultValue(queriedElements, element2, []).push(player));
        instruction.preStyleProps.forEach((stringMap, element2) => {
          if (stringMap.size) {
            let setVal = allPreStyleElements.get(element2);
            if (!setVal) {
              allPreStyleElements.set(element2, setVal = /* @__PURE__ */ new Set());
            }
            stringMap.forEach((_, prop) => setVal.add(prop));
          }
        });
        instruction.postStyleProps.forEach((stringMap, element2) => {
          let setVal = allPostStyleElements.get(element2);
          if (!setVal) {
            allPostStyleElements.set(element2, setVal = /* @__PURE__ */ new Set());
          }
          stringMap.forEach((_, prop) => setVal.add(prop));
        });
      });
    }
    if (erroneousTransitions.length) {
      const errors = [];
      erroneousTransitions.forEach((instruction) => {
        errors.push(transitionFailed(instruction.triggerName, instruction.errors));
      });
      allPlayers.forEach((player) => player.destroy());
      this.reportError(errors);
    }
    const allPreviousPlayersMap = /* @__PURE__ */ new Map();
    const animationElementMap = /* @__PURE__ */ new Map();
    queuedInstructions.forEach((entry) => {
      const element = entry.element;
      if (subTimelines.has(element)) {
        animationElementMap.set(element, element);
        this._beforeAnimationBuild(entry.player.namespaceId, entry.instruction, allPreviousPlayersMap);
      }
    });
    skippedPlayers.forEach((player) => {
      const element = player.element;
      const previousPlayers = this._getPreviousPlayers(element, false, player.namespaceId, player.triggerName, null);
      previousPlayers.forEach((prevPlayer) => {
        getOrSetDefaultValue(allPreviousPlayersMap, element, []).push(prevPlayer);
        prevPlayer.destroy();
      });
    });
    const replaceNodes = allLeaveNodes.filter((node) => {
      return replacePostStylesAsPre(node, allPreStyleElements, allPostStyleElements);
    });
    const postStylesMap = /* @__PURE__ */ new Map();
    const allLeaveQueriedNodes = cloakAndComputeStyles(postStylesMap, this.driver, leaveNodesWithoutAnimations, allPostStyleElements, AUTO_STYLE);
    allLeaveQueriedNodes.forEach((node) => {
      if (replacePostStylesAsPre(node, allPreStyleElements, allPostStyleElements)) {
        replaceNodes.push(node);
      }
    });
    const preStylesMap = /* @__PURE__ */ new Map();
    enterNodeMap.forEach((nodes, root) => {
      cloakAndComputeStyles(preStylesMap, this.driver, new Set(nodes), allPreStyleElements, ɵPRE_STYLE);
    });
    replaceNodes.forEach((node) => {
      var _a, _b;
      const post = postStylesMap.get(node);
      const pre = preStylesMap.get(node);
      postStylesMap.set(node, new Map([...Array.from((_a = post === null || post === void 0 ? void 0 : post.entries()) !== null && _a !== void 0 ? _a : []), ...Array.from((_b = pre === null || pre === void 0 ? void 0 : pre.entries()) !== null && _b !== void 0 ? _b : [])]));
    });
    const rootPlayers = [];
    const subPlayers = [];
    const NO_PARENT_ANIMATION_ELEMENT_DETECTED = {};
    queuedInstructions.forEach((entry) => {
      const {
        element,
        player,
        instruction
      } = entry;
      if (subTimelines.has(element)) {
        if (disabledElementsSet.has(element)) {
          player.onDestroy(() => setStyles(element, instruction.toStyles));
          player.disabled = true;
          player.overrideTotalTime(instruction.totalTime);
          skippedPlayers.push(player);
          return;
        }
        let parentWithAnimation = NO_PARENT_ANIMATION_ELEMENT_DETECTED;
        if (animationElementMap.size > 1) {
          let elm = element;
          const parentsToAdd = [];
          while (elm = elm.parentNode) {
            const detectedParent = animationElementMap.get(elm);
            if (detectedParent) {
              parentWithAnimation = detectedParent;
              break;
            }
            parentsToAdd.push(elm);
          }
          parentsToAdd.forEach((parent) => animationElementMap.set(parent, parentWithAnimation));
        }
        const innerPlayer = this._buildAnimation(player.namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap);
        player.setRealPlayer(innerPlayer);
        if (parentWithAnimation === NO_PARENT_ANIMATION_ELEMENT_DETECTED) {
          rootPlayers.push(player);
        } else {
          const parentPlayers = this.playersByElement.get(parentWithAnimation);
          if (parentPlayers && parentPlayers.length) {
            player.parentPlayer = optimizeGroupPlayer(parentPlayers);
          }
          skippedPlayers.push(player);
        }
      } else {
        eraseStyles(element, instruction.fromStyles);
        player.onDestroy(() => setStyles(element, instruction.toStyles));
        subPlayers.push(player);
        if (disabledElementsSet.has(element)) {
          skippedPlayers.push(player);
        }
      }
    });
    subPlayers.forEach((player) => {
      const playersForElement = skippedPlayersMap.get(player.element);
      if (playersForElement && playersForElement.length) {
        const innerPlayer = optimizeGroupPlayer(playersForElement);
        player.setRealPlayer(innerPlayer);
      }
    });
    skippedPlayers.forEach((player) => {
      if (player.parentPlayer) {
        player.syncPlayerEvents(player.parentPlayer);
      } else {
        player.destroy();
      }
    });
    for (let i2 = 0; i2 < allLeaveNodes.length; i2++) {
      const element = allLeaveNodes[i2];
      const details = element[REMOVAL_FLAG];
      removeClass(element, LEAVE_CLASSNAME);
      if (details && details.hasAnimation)
        continue;
      let players = [];
      if (queriedElements.size) {
        let queriedPlayerResults = queriedElements.get(element);
        if (queriedPlayerResults && queriedPlayerResults.length) {
          players.push(...queriedPlayerResults);
        }
        let queriedInnerElements = this.driver.query(element, NG_ANIMATING_SELECTOR, true);
        for (let j = 0; j < queriedInnerElements.length; j++) {
          let queriedPlayers = queriedElements.get(queriedInnerElements[j]);
          if (queriedPlayers && queriedPlayers.length) {
            players.push(...queriedPlayers);
          }
        }
      }
      const activePlayers = players.filter((p) => !p.destroyed);
      if (activePlayers.length) {
        removeNodesAfterAnimationDone(this, element, activePlayers);
      } else {
        this.processLeaveNode(element);
      }
    }
    allLeaveNodes.length = 0;
    rootPlayers.forEach((player) => {
      this.players.push(player);
      player.onDone(() => {
        player.destroy();
        const index = this.players.indexOf(player);
        this.players.splice(index, 1);
      });
      player.play();
    });
    return rootPlayers;
  }
  elementContainsData(namespaceId, element) {
    let containsData = false;
    const details = element[REMOVAL_FLAG];
    if (details && details.setForRemoval)
      containsData = true;
    if (this.playersByElement.has(element))
      containsData = true;
    if (this.playersByQueriedElement.has(element))
      containsData = true;
    if (this.statesByElement.has(element))
      containsData = true;
    return this._fetchNamespace(namespaceId).elementContainsData(element) || containsData;
  }
  afterFlush(callback) {
    this._flushFns.push(callback);
  }
  afterFlushAnimationsDone(callback) {
    this._whenQuietFns.push(callback);
  }
  _getPreviousPlayers(element, isQueriedElement, namespaceId, triggerName, toStateValue) {
    let players = [];
    if (isQueriedElement) {
      const queriedElementPlayers = this.playersByQueriedElement.get(element);
      if (queriedElementPlayers) {
        players = queriedElementPlayers;
      }
    } else {
      const elementPlayers = this.playersByElement.get(element);
      if (elementPlayers) {
        const isRemovalAnimation = !toStateValue || toStateValue == VOID_VALUE;
        elementPlayers.forEach((player) => {
          if (player.queued)
            return;
          if (!isRemovalAnimation && player.triggerName != triggerName)
            return;
          players.push(player);
        });
      }
    }
    if (namespaceId || triggerName) {
      players = players.filter((player) => {
        if (namespaceId && namespaceId != player.namespaceId)
          return false;
        if (triggerName && triggerName != player.triggerName)
          return false;
        return true;
      });
    }
    return players;
  }
  _beforeAnimationBuild(namespaceId, instruction, allPreviousPlayersMap) {
    const triggerName = instruction.triggerName;
    const rootElement = instruction.element;
    const targetNameSpaceId = instruction.isRemovalTransition ? void 0 : namespaceId;
    const targetTriggerName = instruction.isRemovalTransition ? void 0 : triggerName;
    for (const timelineInstruction of instruction.timelines) {
      const element = timelineInstruction.element;
      const isQueriedElement = element !== rootElement;
      const players = getOrSetDefaultValue(allPreviousPlayersMap, element, []);
      const previousPlayers = this._getPreviousPlayers(element, isQueriedElement, targetNameSpaceId, targetTriggerName, instruction.toState);
      previousPlayers.forEach((player) => {
        const realPlayer = player.getRealPlayer();
        if (realPlayer.beforeDestroy) {
          realPlayer.beforeDestroy();
        }
        player.destroy();
        players.push(player);
      });
    }
    eraseStyles(rootElement, instruction.fromStyles);
  }
  _buildAnimation(namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap) {
    const triggerName = instruction.triggerName;
    const rootElement = instruction.element;
    const allQueriedPlayers = [];
    const allConsumedElements = /* @__PURE__ */ new Set();
    const allSubElements = /* @__PURE__ */ new Set();
    const allNewPlayers = instruction.timelines.map((timelineInstruction) => {
      const element = timelineInstruction.element;
      allConsumedElements.add(element);
      const details = element[REMOVAL_FLAG];
      if (details && details.removedBeforeQueried)
        return new NoopAnimationPlayer(timelineInstruction.duration, timelineInstruction.delay);
      const isQueriedElement = element !== rootElement;
      const previousPlayers = flattenGroupPlayers((allPreviousPlayersMap.get(element) || EMPTY_PLAYER_ARRAY).map((p) => p.getRealPlayer())).filter((p) => {
        const pp = p;
        return pp.element ? pp.element === element : false;
      });
      const preStyles = preStylesMap.get(element);
      const postStyles = postStylesMap.get(element);
      const keyframes = normalizeKeyframes$1(this.driver, this._normalizer, element, timelineInstruction.keyframes, preStyles, postStyles);
      const player2 = this._buildPlayer(timelineInstruction, keyframes, previousPlayers);
      if (timelineInstruction.subTimeline && skippedPlayersMap) {
        allSubElements.add(element);
      }
      if (isQueriedElement) {
        const wrappedPlayer = new TransitionAnimationPlayer(namespaceId, triggerName, element);
        wrappedPlayer.setRealPlayer(player2);
        allQueriedPlayers.push(wrappedPlayer);
      }
      return player2;
    });
    allQueriedPlayers.forEach((player2) => {
      getOrSetDefaultValue(this.playersByQueriedElement, player2.element, []).push(player2);
      player2.onDone(() => deleteOrUnsetInMap(this.playersByQueriedElement, player2.element, player2));
    });
    allConsumedElements.forEach((element) => addClass(element, NG_ANIMATING_CLASSNAME));
    const player = optimizeGroupPlayer(allNewPlayers);
    player.onDestroy(() => {
      allConsumedElements.forEach((element) => removeClass(element, NG_ANIMATING_CLASSNAME));
      setStyles(rootElement, instruction.toStyles);
    });
    allSubElements.forEach((element) => {
      getOrSetDefaultValue(skippedPlayersMap, element, []).push(player);
    });
    return player;
  }
  _buildPlayer(instruction, keyframes, previousPlayers) {
    if (keyframes.length > 0) {
      return this.driver.animate(instruction.element, keyframes, instruction.duration, instruction.delay, instruction.easing, previousPlayers);
    }
    return new NoopAnimationPlayer(instruction.duration, instruction.delay);
  }
}
class TransitionAnimationPlayer {
  constructor(namespaceId, triggerName, element) {
    this.namespaceId = namespaceId;
    this.triggerName = triggerName;
    this.element = element;
    this._player = new NoopAnimationPlayer();
    this._containsRealPlayer = false;
    this._queuedCallbacks = /* @__PURE__ */ new Map();
    this.destroyed = false;
    this.markedForDestroy = false;
    this.disabled = false;
    this.queued = true;
    this.totalTime = 0;
  }
  setRealPlayer(player) {
    if (this._containsRealPlayer)
      return;
    this._player = player;
    this._queuedCallbacks.forEach((callbacks, phase) => {
      callbacks.forEach((callback) => listenOnPlayer(player, phase, void 0, callback));
    });
    this._queuedCallbacks.clear();
    this._containsRealPlayer = true;
    this.overrideTotalTime(player.totalTime);
    this.queued = false;
  }
  getRealPlayer() {
    return this._player;
  }
  overrideTotalTime(totalTime) {
    this.totalTime = totalTime;
  }
  syncPlayerEvents(player) {
    const p = this._player;
    if (p.triggerCallback) {
      player.onStart(() => p.triggerCallback("start"));
    }
    player.onDone(() => this.finish());
    player.onDestroy(() => this.destroy());
  }
  _queueEvent(name, callback) {
    getOrSetDefaultValue(this._queuedCallbacks, name, []).push(callback);
  }
  onDone(fn) {
    if (this.queued) {
      this._queueEvent("done", fn);
    }
    this._player.onDone(fn);
  }
  onStart(fn) {
    if (this.queued) {
      this._queueEvent("start", fn);
    }
    this._player.onStart(fn);
  }
  onDestroy(fn) {
    if (this.queued) {
      this._queueEvent("destroy", fn);
    }
    this._player.onDestroy(fn);
  }
  init() {
    this._player.init();
  }
  hasStarted() {
    return this.queued ? false : this._player.hasStarted();
  }
  play() {
    !this.queued && this._player.play();
  }
  pause() {
    !this.queued && this._player.pause();
  }
  restart() {
    !this.queued && this._player.restart();
  }
  finish() {
    this._player.finish();
  }
  destroy() {
    this.destroyed = true;
    this._player.destroy();
  }
  reset() {
    !this.queued && this._player.reset();
  }
  setPosition(p) {
    if (!this.queued) {
      this._player.setPosition(p);
    }
  }
  getPosition() {
    return this.queued ? 0 : this._player.getPosition();
  }
  /** @internal */
  triggerCallback(phaseName) {
    const p = this._player;
    if (p.triggerCallback) {
      p.triggerCallback(phaseName);
    }
  }
}
function deleteOrUnsetInMap(map2, key, value) {
  let currentValues = map2.get(key);
  if (currentValues) {
    if (currentValues.length) {
      const index = currentValues.indexOf(value);
      currentValues.splice(index, 1);
    }
    if (currentValues.length == 0) {
      map2.delete(key);
    }
  }
  return currentValues;
}
function normalizeTriggerValue(value) {
  return value != null ? value : null;
}
function isElementNode(node) {
  return node && node["nodeType"] === 1;
}
function isTriggerEventValid(eventName) {
  return eventName == "start" || eventName == "done";
}
function cloakElement(element, value) {
  const oldValue = element.style.display;
  element.style.display = value != null ? value : "none";
  return oldValue;
}
function cloakAndComputeStyles(valuesMap, driver, elements, elementPropsMap, defaultStyle) {
  const cloakVals = [];
  elements.forEach((element) => cloakVals.push(cloakElement(element)));
  const failedElements = [];
  elementPropsMap.forEach((props, element) => {
    const styles = /* @__PURE__ */ new Map();
    props.forEach((prop) => {
      const value = driver.computeStyle(element, prop, defaultStyle);
      styles.set(prop, value);
      if (!value || value.length == 0) {
        element[REMOVAL_FLAG] = NULL_REMOVED_QUERIED_STATE;
        failedElements.push(element);
      }
    });
    valuesMap.set(element, styles);
  });
  let i = 0;
  elements.forEach((element) => cloakElement(element, cloakVals[i++]));
  return failedElements;
}
function buildRootMap(roots, nodes) {
  const rootMap = /* @__PURE__ */ new Map();
  roots.forEach((root) => rootMap.set(root, []));
  if (nodes.length == 0)
    return rootMap;
  const NULL_NODE = 1;
  const nodeSet = new Set(nodes);
  const localRootMap = /* @__PURE__ */ new Map();
  function getRoot(node) {
    if (!node)
      return NULL_NODE;
    let root = localRootMap.get(node);
    if (root)
      return root;
    const parent = node.parentNode;
    if (rootMap.has(parent)) {
      root = parent;
    } else if (nodeSet.has(parent)) {
      root = NULL_NODE;
    } else {
      root = getRoot(parent);
    }
    localRootMap.set(node, root);
    return root;
  }
  nodes.forEach((node) => {
    const root = getRoot(node);
    if (root !== NULL_NODE) {
      rootMap.get(root).push(node);
    }
  });
  return rootMap;
}
function addClass(element, className) {
  var _a;
  (_a = element.classList) === null || _a === void 0 ? void 0 : _a.add(className);
}
function removeClass(element, className) {
  var _a;
  (_a = element.classList) === null || _a === void 0 ? void 0 : _a.remove(className);
}
function removeNodesAfterAnimationDone(engine, element, players) {
  optimizeGroupPlayer(players).onDone(() => engine.processLeaveNode(element));
}
function flattenGroupPlayers(players) {
  const finalPlayers = [];
  _flattenGroupPlayersRecur(players, finalPlayers);
  return finalPlayers;
}
function _flattenGroupPlayersRecur(players, finalPlayers) {
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (player instanceof AnimationGroupPlayer) {
      _flattenGroupPlayersRecur(player.players, finalPlayers);
    } else {
      finalPlayers.push(player);
    }
  }
}
function objEquals(a, b) {
  const k1 = Object.keys(a);
  const k2 = Object.keys(b);
  if (k1.length != k2.length)
    return false;
  for (let i = 0; i < k1.length; i++) {
    const prop = k1[i];
    if (!b.hasOwnProperty(prop) || a[prop] !== b[prop])
      return false;
  }
  return true;
}
function replacePostStylesAsPre(element, allPreStyleElements, allPostStyleElements) {
  const postEntry = allPostStyleElements.get(element);
  if (!postEntry)
    return false;
  let preEntry = allPreStyleElements.get(element);
  if (preEntry) {
    postEntry.forEach((data) => preEntry.add(data));
  } else {
    allPreStyleElements.set(element, postEntry);
  }
  allPostStyleElements.delete(element);
  return true;
}
class AnimationEngine {
  constructor(bodyNode, _driver, _normalizer) {
    this.bodyNode = bodyNode;
    this._driver = _driver;
    this._normalizer = _normalizer;
    this._triggerCache = {};
    this.onRemovalComplete = (element, context) => {
    };
    this._transitionEngine = new TransitionAnimationEngine(bodyNode, _driver, _normalizer);
    this._timelineEngine = new TimelineAnimationEngine(bodyNode, _driver, _normalizer);
    this._transitionEngine.onRemovalComplete = (element, context) => this.onRemovalComplete(element, context);
  }
  registerTrigger(componentId, namespaceId, hostElement, name, metadata) {
    const cacheKey = componentId + "-" + name;
    let trigger = this._triggerCache[cacheKey];
    if (!trigger) {
      const errors = [];
      const warnings = [];
      const ast = buildAnimationAst(this._driver, metadata, errors, warnings);
      if (errors.length) {
        throw triggerBuildFailed(name, errors);
      }
      if (warnings.length) {
        warnTriggerBuild(name, warnings);
      }
      trigger = buildTrigger(name, ast, this._normalizer);
      this._triggerCache[cacheKey] = trigger;
    }
    this._transitionEngine.registerTrigger(namespaceId, name, trigger);
  }
  register(namespaceId, hostElement) {
    this._transitionEngine.register(namespaceId, hostElement);
  }
  destroy(namespaceId, context) {
    this._transitionEngine.destroy(namespaceId, context);
  }
  onInsert(namespaceId, element, parent, insertBefore) {
    this._transitionEngine.insertNode(namespaceId, element, parent, insertBefore);
  }
  onRemove(namespaceId, element, context, isHostElement) {
    this._transitionEngine.removeNode(namespaceId, element, isHostElement || false, context);
  }
  disableAnimations(element, disable) {
    this._transitionEngine.markElementAsDisabled(element, disable);
  }
  process(namespaceId, element, property, value) {
    if (property.charAt(0) == "@") {
      const [id, action] = parseTimelineCommand(property);
      const args = value;
      this._timelineEngine.command(id, element, action, args);
    } else {
      this._transitionEngine.trigger(namespaceId, element, property, value);
    }
  }
  listen(namespaceId, element, eventName, eventPhase, callback) {
    if (eventName.charAt(0) == "@") {
      const [id, action] = parseTimelineCommand(eventName);
      return this._timelineEngine.listen(id, element, action, callback);
    }
    return this._transitionEngine.listen(namespaceId, element, eventName, eventPhase, callback);
  }
  flush(microtaskId = -1) {
    this._transitionEngine.flush(microtaskId);
  }
  get players() {
    return this._transitionEngine.players.concat(this._timelineEngine.players);
  }
  whenRenderingDone() {
    return this._transitionEngine.whenRenderingDone();
  }
}
class HttpHandler {
}
class HttpBackend {
}
class HttpHeaders {
  /**  Constructs a new HTTP header object with the given values.*/
  constructor(headers) {
    this.normalizedNames = /* @__PURE__ */ new Map();
    this.lazyUpdate = null;
    if (!headers) {
      this.headers = /* @__PURE__ */ new Map();
    } else if (typeof headers === "string") {
      this.lazyInit = () => {
        this.headers = /* @__PURE__ */ new Map();
        headers.split("\n").forEach((line) => {
          const index = line.indexOf(":");
          if (index > 0) {
            const name = line.slice(0, index);
            const key = name.toLowerCase();
            const value = line.slice(index + 1).trim();
            this.maybeSetNormalizedName(name, key);
            if (this.headers.has(key)) {
              this.headers.get(key).push(value);
            } else {
              this.headers.set(key, [value]);
            }
          }
        });
      };
    } else {
      this.lazyInit = () => {
        if (false) {
          assertValidHeaders(headers);
        }
        this.headers = /* @__PURE__ */ new Map();
        Object.keys(headers).forEach((name) => {
          let values = headers[name];
          const key = name.toLowerCase();
          if (typeof values === "string") {
            values = [values];
          }
          if (values.length > 0) {
            this.headers.set(key, values);
            this.maybeSetNormalizedName(name, key);
          }
        });
      };
    }
  }
  /**
   * Checks for existence of a given header.
   *
   * @param name The header name to check for existence.
   *
   * @returns True if the header exists, false otherwise.
   */
  has(name) {
    this.init();
    return this.headers.has(name.toLowerCase());
  }
  /**
   * Retrieves the first value of a given header.
   *
   * @param name The header name.
   *
   * @returns The value string if the header exists, null otherwise
   */
  get(name) {
    this.init();
    const values = this.headers.get(name.toLowerCase());
    return values && values.length > 0 ? values[0] : null;
  }
  /**
   * Retrieves the names of the headers.
   *
   * @returns A list of header names.
   */
  keys() {
    this.init();
    return Array.from(this.normalizedNames.values());
  }
  /**
   * Retrieves a list of values for a given header.
   *
   * @param name The header name from which to retrieve values.
   *
   * @returns A string of values if the header exists, null otherwise.
   */
  getAll(name) {
    this.init();
    return this.headers.get(name.toLowerCase()) || null;
  }
  /**
   * Appends a new value to the existing set of values for a header
   * and returns them in a clone of the original instance.
   *
   * @param name The header name for which to append the values.
   * @param value The value to append.
   *
   * @returns A clone of the HTTP headers object with the value appended to the given header.
   */
  append(name, value) {
    return this.clone({
      name,
      value,
      op: "a"
    });
  }
  /**
   * Sets or modifies a value for a given header in a clone of the original instance.
   * If the header already exists, its value is replaced with the given value
   * in the returned object.
   *
   * @param name The header name.
   * @param value The value or values to set or override for the given header.
   *
   * @returns A clone of the HTTP headers object with the newly set header value.
   */
  set(name, value) {
    return this.clone({
      name,
      value,
      op: "s"
    });
  }
  /**
   * Deletes values for a given header in a clone of the original instance.
   *
   * @param name The header name.
   * @param value The value or values to delete for the given header.
   *
   * @returns A clone of the HTTP headers object with the given value deleted.
   */
  delete(name, value) {
    return this.clone({
      name,
      value,
      op: "d"
    });
  }
  maybeSetNormalizedName(name, lcName) {
    if (!this.normalizedNames.has(lcName)) {
      this.normalizedNames.set(lcName, name);
    }
  }
  init() {
    if (!!this.lazyInit) {
      if (this.lazyInit instanceof HttpHeaders) {
        this.copyFrom(this.lazyInit);
      } else {
        this.lazyInit();
      }
      this.lazyInit = null;
      if (!!this.lazyUpdate) {
        this.lazyUpdate.forEach((update) => this.applyUpdate(update));
        this.lazyUpdate = null;
      }
    }
  }
  copyFrom(other) {
    other.init();
    Array.from(other.headers.keys()).forEach((key) => {
      this.headers.set(key, other.headers.get(key));
      this.normalizedNames.set(key, other.normalizedNames.get(key));
    });
  }
  clone(update) {
    const clone = new HttpHeaders();
    clone.lazyInit = !!this.lazyInit && this.lazyInit instanceof HttpHeaders ? this.lazyInit : this;
    clone.lazyUpdate = (this.lazyUpdate || []).concat([update]);
    return clone;
  }
  applyUpdate(update) {
    const key = update.name.toLowerCase();
    switch (update.op) {
      case "a":
      case "s":
        let value = update.value;
        if (typeof value === "string") {
          value = [value];
        }
        if (value.length === 0) {
          return;
        }
        this.maybeSetNormalizedName(update.name, key);
        const base = (update.op === "a" ? this.headers.get(key) : void 0) || [];
        base.push(...value);
        this.headers.set(key, base);
        break;
      case "d":
        const toDelete = update.value;
        if (!toDelete) {
          this.headers.delete(key);
          this.normalizedNames.delete(key);
        } else {
          let existing = this.headers.get(key);
          if (!existing) {
            return;
          }
          existing = existing.filter((value2) => toDelete.indexOf(value2) === -1);
          if (existing.length === 0) {
            this.headers.delete(key);
            this.normalizedNames.delete(key);
          } else {
            this.headers.set(key, existing);
          }
        }
        break;
    }
  }
  /**
   * @internal
   */
  forEach(fn) {
    this.init();
    Array.from(this.normalizedNames.keys()).forEach((key) => fn(this.normalizedNames.get(key), this.headers.get(key)));
  }
}
function assertValidHeaders(headers) {
  for (const [key, value] of Object.entries(headers)) {
    if (typeof value !== "string" && !Array.isArray(value)) {
      throw new Error(`Unexpected value of the \`${key}\` header provided. Expecting either a string or an array, but got: \`${value}\`.`);
    }
  }
}
class HttpUrlEncodingCodec {
  /**
   * Encodes a key name for a URL parameter or query-string.
   * @param key The key name.
   * @returns The encoded key name.
   */
  encodeKey(key) {
    return standardEncoding(key);
  }
  /**
   * Encodes the value of a URL parameter or query-string.
   * @param value The value.
   * @returns The encoded value.
   */
  encodeValue(value) {
    return standardEncoding(value);
  }
  /**
   * Decodes an encoded URL parameter or query-string key.
   * @param key The encoded key name.
   * @returns The decoded key name.
   */
  decodeKey(key) {
    return decodeURIComponent(key);
  }
  /**
   * Decodes an encoded URL parameter or query-string value.
   * @param value The encoded value.
   * @returns The decoded value.
   */
  decodeValue(value) {
    return decodeURIComponent(value);
  }
}
function paramParser(rawParams, codec) {
  const map2 = /* @__PURE__ */ new Map();
  if (rawParams.length > 0) {
    const params = rawParams.replace(/^\?/, "").split("&");
    params.forEach((param) => {
      const eqIdx = param.indexOf("=");
      const [key, val] = eqIdx == -1 ? [codec.decodeKey(param), ""] : [codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1))];
      const list = map2.get(key) || [];
      list.push(val);
      map2.set(key, list);
    });
  }
  return map2;
}
const STANDARD_ENCODING_REGEX = /%(\d[a-f0-9])/gi;
const STANDARD_ENCODING_REPLACEMENTS = {
  "40": "@",
  "3A": ":",
  "24": "$",
  "2C": ",",
  "3B": ";",
  "3D": "=",
  "3F": "?",
  "2F": "/"
};
function standardEncoding(v) {
  return encodeURIComponent(v).replace(STANDARD_ENCODING_REGEX, (s, t) => {
    var _a;
    return (_a = STANDARD_ENCODING_REPLACEMENTS[t]) !== null && _a !== void 0 ? _a : s;
  });
}
function valueToString(value) {
  return `${value}`;
}
class HttpParams {
  constructor(options = {}) {
    this.updates = null;
    this.cloneFrom = null;
    this.encoder = options.encoder || new HttpUrlEncodingCodec();
    if (!!options.fromString) {
      if (!!options.fromObject) {
        throw new Error(`Cannot specify both fromString and fromObject.`);
      }
      this.map = paramParser(options.fromString, this.encoder);
    } else if (!!options.fromObject) {
      this.map = /* @__PURE__ */ new Map();
      Object.keys(options.fromObject).forEach((key) => {
        const value = options.fromObject[key];
        const values = Array.isArray(value) ? value.map(valueToString) : [valueToString(value)];
        this.map.set(key, values);
      });
    } else {
      this.map = null;
    }
  }
  /**
   * Reports whether the body includes one or more values for a given parameter.
   * @param param The parameter name.
   * @returns True if the parameter has one or more values,
   * false if it has no value or is not present.
   */
  has(param) {
    this.init();
    return this.map.has(param);
  }
  /**
   * Retrieves the first value for a parameter.
   * @param param The parameter name.
   * @returns The first value of the given parameter,
   * or `null` if the parameter is not present.
   */
  get(param) {
    this.init();
    const res = this.map.get(param);
    return !!res ? res[0] : null;
  }
  /**
   * Retrieves all values for a  parameter.
   * @param param The parameter name.
   * @returns All values in a string array,
   * or `null` if the parameter not present.
   */
  getAll(param) {
    this.init();
    return this.map.get(param) || null;
  }
  /**
   * Retrieves all the parameters for this body.
   * @returns The parameter names in a string array.
   */
  keys() {
    this.init();
    return Array.from(this.map.keys());
  }
  /**
   * Appends a new value to existing values for a parameter.
   * @param param The parameter name.
   * @param value The new value to add.
   * @return A new body with the appended value.
   */
  append(param, value) {
    return this.clone({
      param,
      value,
      op: "a"
    });
  }
  /**
   * Constructs a new body with appended values for the given parameter name.
   * @param params parameters and values
   * @return A new body with the new value.
   */
  appendAll(params) {
    const updates = [];
    Object.keys(params).forEach((param) => {
      const value = params[param];
      if (Array.isArray(value)) {
        value.forEach((_value) => {
          updates.push({
            param,
            value: _value,
            op: "a"
          });
        });
      } else {
        updates.push({
          param,
          value,
          op: "a"
        });
      }
    });
    return this.clone(updates);
  }
  /**
   * Replaces the value for a parameter.
   * @param param The parameter name.
   * @param value The new value.
   * @return A new body with the new value.
   */
  set(param, value) {
    return this.clone({
      param,
      value,
      op: "s"
    });
  }
  /**
   * Removes a given value or all values from a parameter.
   * @param param The parameter name.
   * @param value The value to remove, if provided.
   * @return A new body with the given value removed, or with all values
   * removed if no value is specified.
   */
  delete(param, value) {
    return this.clone({
      param,
      value,
      op: "d"
    });
  }
  /**
   * Serializes the body to an encoded string, where key-value pairs (separated by `=`) are
   * separated by `&`s.
   */
  toString() {
    this.init();
    return this.keys().map((key) => {
      const eKey = this.encoder.encodeKey(key);
      return this.map.get(key).map((value) => eKey + "=" + this.encoder.encodeValue(value)).join("&");
    }).filter((param) => param !== "").join("&");
  }
  clone(update) {
    const clone = new HttpParams({
      encoder: this.encoder
    });
    clone.cloneFrom = this.cloneFrom || this;
    clone.updates = (this.updates || []).concat(update);
    return clone;
  }
  init() {
    if (this.map === null) {
      this.map = /* @__PURE__ */ new Map();
    }
    if (this.cloneFrom !== null) {
      this.cloneFrom.init();
      this.cloneFrom.keys().forEach((key) => this.map.set(key, this.cloneFrom.map.get(key)));
      this.updates.forEach((update) => {
        switch (update.op) {
          case "a":
          case "s":
            const base = (update.op === "a" ? this.map.get(update.param) : void 0) || [];
            base.push(valueToString(update.value));
            this.map.set(update.param, base);
            break;
          case "d":
            if (update.value !== void 0) {
              let base2 = this.map.get(update.param) || [];
              const idx = base2.indexOf(valueToString(update.value));
              if (idx !== -1) {
                base2.splice(idx, 1);
              }
              if (base2.length > 0) {
                this.map.set(update.param, base2);
              } else {
                this.map.delete(update.param);
              }
            } else {
              this.map.delete(update.param);
              break;
            }
        }
      });
      this.cloneFrom = this.updates = null;
    }
  }
}
class HttpContext {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  /**
   * Store a value in the context. If a value is already present it will be overwritten.
   *
   * @param token The reference to an instance of `HttpContextToken`.
   * @param value The value to store.
   *
   * @returns A reference to itself for easy chaining.
   */
  set(token, value) {
    this.map.set(token, value);
    return this;
  }
  /**
   * Retrieve the value associated with the given token.
   *
   * @param token The reference to an instance of `HttpContextToken`.
   *
   * @returns The stored value or default if one is defined.
   */
  get(token) {
    if (!this.map.has(token)) {
      this.map.set(token, token.defaultValue());
    }
    return this.map.get(token);
  }
  /**
   * Delete the value associated with the given token.
   *
   * @param token The reference to an instance of `HttpContextToken`.
   *
   * @returns A reference to itself for easy chaining.
   */
  delete(token) {
    this.map.delete(token);
    return this;
  }
  /**
   * Checks for existence of a given token.
   *
   * @param token The reference to an instance of `HttpContextToken`.
   *
   * @returns True if the token exists, false otherwise.
   */
  has(token) {
    return this.map.has(token);
  }
  /**
   * @returns a list of tokens currently stored in the context.
   */
  keys() {
    return this.map.keys();
  }
}
function mightHaveBody(method) {
  switch (method) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return false;
    default:
      return true;
  }
}
function isArrayBuffer(value) {
  return typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer;
}
function isBlob(value) {
  return typeof Blob !== "undefined" && value instanceof Blob;
}
function isFormData(value) {
  return typeof FormData !== "undefined" && value instanceof FormData;
}
function isUrlSearchParams(value) {
  return typeof URLSearchParams !== "undefined" && value instanceof URLSearchParams;
}
class HttpRequest {
  constructor(method, url2, third, fourth) {
    this.url = url2;
    this.body = null;
    this.reportProgress = false;
    this.withCredentials = false;
    this.responseType = "json";
    this.method = method.toUpperCase();
    let options;
    if (mightHaveBody(this.method) || !!fourth) {
      this.body = third !== void 0 ? third : null;
      options = fourth;
    } else {
      options = third;
    }
    if (options) {
      this.reportProgress = !!options.reportProgress;
      this.withCredentials = !!options.withCredentials;
      if (!!options.responseType) {
        this.responseType = options.responseType;
      }
      if (!!options.headers) {
        this.headers = options.headers;
      }
      if (!!options.context) {
        this.context = options.context;
      }
      if (!!options.params) {
        this.params = options.params;
      }
    }
    if (!this.headers) {
      this.headers = new HttpHeaders();
    }
    if (!this.context) {
      this.context = new HttpContext();
    }
    if (!this.params) {
      this.params = new HttpParams();
      this.urlWithParams = url2;
    } else {
      const params = this.params.toString();
      if (params.length === 0) {
        this.urlWithParams = url2;
      } else {
        const qIdx = url2.indexOf("?");
        const sep = qIdx === -1 ? "?" : qIdx < url2.length - 1 ? "&" : "";
        this.urlWithParams = url2 + sep + params;
      }
    }
  }
  /**
   * Transform the free-form body into a serialized format suitable for
   * transmission to the server.
   */
  serializeBody() {
    if (this.body === null) {
      return null;
    }
    if (isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) || isUrlSearchParams(this.body) || typeof this.body === "string") {
      return this.body;
    }
    if (this.body instanceof HttpParams) {
      return this.body.toString();
    }
    if (typeof this.body === "object" || typeof this.body === "boolean" || Array.isArray(this.body)) {
      return JSON.stringify(this.body);
    }
    return this.body.toString();
  }
  /**
   * Examine the body and attempt to infer an appropriate MIME type
   * for it.
   *
   * If no such type can be inferred, this method will return `null`.
   */
  detectContentTypeHeader() {
    if (this.body === null) {
      return null;
    }
    if (isFormData(this.body)) {
      return null;
    }
    if (isBlob(this.body)) {
      return this.body.type || null;
    }
    if (isArrayBuffer(this.body)) {
      return null;
    }
    if (typeof this.body === "string") {
      return "text/plain";
    }
    if (this.body instanceof HttpParams) {
      return "application/x-www-form-urlencoded;charset=UTF-8";
    }
    if (typeof this.body === "object" || typeof this.body === "number" || typeof this.body === "boolean") {
      return "application/json";
    }
    return null;
  }
  clone(update = {}) {
    var _a;
    const method = update.method || this.method;
    const url2 = update.url || this.url;
    const responseType = update.responseType || this.responseType;
    const body = update.body !== void 0 ? update.body : this.body;
    const withCredentials = update.withCredentials !== void 0 ? update.withCredentials : this.withCredentials;
    const reportProgress = update.reportProgress !== void 0 ? update.reportProgress : this.reportProgress;
    let headers = update.headers || this.headers;
    let params = update.params || this.params;
    const context = (_a = update.context) !== null && _a !== void 0 ? _a : this.context;
    if (update.setHeaders !== void 0) {
      headers = Object.keys(update.setHeaders).reduce((headers2, name) => headers2.set(name, update.setHeaders[name]), headers);
    }
    if (update.setParams) {
      params = Object.keys(update.setParams).reduce((params2, param) => params2.set(param, update.setParams[param]), params);
    }
    return new HttpRequest(method, url2, body, {
      params,
      headers,
      context,
      reportProgress,
      responseType,
      withCredentials
    });
  }
}
var HttpEventType = /* @__PURE__ */ (() => {
  HttpEventType = HttpEventType || {};
  HttpEventType[HttpEventType["Sent"] = 0] = "Sent";
  HttpEventType[HttpEventType["UploadProgress"] = 1] = "UploadProgress";
  HttpEventType[HttpEventType["ResponseHeader"] = 2] = "ResponseHeader";
  HttpEventType[HttpEventType["DownloadProgress"] = 3] = "DownloadProgress";
  HttpEventType[HttpEventType["Response"] = 4] = "Response";
  HttpEventType[HttpEventType["User"] = 5] = "User";
  return HttpEventType;
})();
class HttpResponseBase {
  /**
   * Super-constructor for all responses.
   *
   * The single parameter accepted is an initialization hash. Any properties
   * of the response passed there will override the default values.
   */
  constructor(init, defaultStatus = 200, defaultStatusText = "OK") {
    this.headers = init.headers || new HttpHeaders();
    this.status = init.status !== void 0 ? init.status : defaultStatus;
    this.statusText = init.statusText || defaultStatusText;
    this.url = init.url || null;
    this.ok = this.status >= 200 && this.status < 300;
  }
}
class HttpHeaderResponse extends HttpResponseBase {
  /**
   * Create a new `HttpHeaderResponse` with the given parameters.
   */
  constructor(init = {}) {
    super(init);
    this.type = HttpEventType.ResponseHeader;
  }
  /**
   * Copy this `HttpHeaderResponse`, overriding its contents with the
   * given parameter hash.
   */
  clone(update = {}) {
    return new HttpHeaderResponse({
      headers: update.headers || this.headers,
      status: update.status !== void 0 ? update.status : this.status,
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || void 0
    });
  }
}
class HttpResponse extends HttpResponseBase {
  /**
   * Construct a new `HttpResponse`.
   */
  constructor(init = {}) {
    super(init);
    this.type = HttpEventType.Response;
    this.body = init.body !== void 0 ? init.body : null;
  }
  clone(update = {}) {
    return new HttpResponse({
      body: update.body !== void 0 ? update.body : this.body,
      headers: update.headers || this.headers,
      status: update.status !== void 0 ? update.status : this.status,
      statusText: update.statusText || this.statusText,
      url: update.url || this.url || void 0
    });
  }
}
class HttpErrorResponse extends HttpResponseBase {
  constructor(init) {
    super(init, 0, "Unknown Error");
    this.name = "HttpErrorResponse";
    this.ok = false;
    if (this.status >= 200 && this.status < 300) {
      this.message = `Http failure during parsing for ${init.url || "(unknown url)"}`;
    } else {
      this.message = `Http failure response for ${init.url || "(unknown url)"}: ${init.status} ${init.statusText}`;
    }
    this.error = init.error || null;
  }
}
function addBody(options, body) {
  return {
    body,
    headers: options.headers,
    context: options.context,
    observe: options.observe,
    params: options.params,
    reportProgress: options.reportProgress,
    responseType: options.responseType,
    withCredentials: options.withCredentials
  };
}
let HttpClient = /* @__PURE__ */ (() => {
  let HttpClient2 = /* @__PURE__ */ (() => {
    class HttpClient3 {
      constructor(handler) {
        this.handler = handler;
      }
      /**
       * Constructs an observable for a generic HTTP request that, when subscribed,
       * fires the request through the chain of registered interceptors and on to the
       * server.
       *
       * You can pass an `HttpRequest` directly as the only parameter. In this case,
       * the call returns an observable of the raw `HttpEvent` stream.
       *
       * Alternatively you can pass an HTTP method as the first parameter,
       * a URL string as the second, and an options hash containing the request body as the third.
       * See `addBody()`. In this case, the specified `responseType` and `observe` options determine the
       * type of returned observable.
       *   * The `responseType` value determines how a successful response body is parsed.
       *   * If `responseType` is the default `json`, you can pass a type interface for the resulting
       * object as a type parameter to the call.
       *
       * The `observe` value determines the return type, according to what you are interested in
       * observing.
       *   * An `observe` value of events returns an observable of the raw `HttpEvent` stream, including
       * progress events by default.
       *   * An `observe` value of response returns an observable of `HttpResponse<T>`,
       * where the `T` parameter depends on the `responseType` and any optionally provided type
       * parameter.
       *   * An `observe` value of body returns an observable of `<T>` with the same `T` body type.
       *
       */
      request(first2, url2, options = {}) {
        let req;
        if (first2 instanceof HttpRequest) {
          req = first2;
        } else {
          let headers = void 0;
          if (options.headers instanceof HttpHeaders) {
            headers = options.headers;
          } else {
            headers = new HttpHeaders(options.headers);
          }
          let params = void 0;
          if (!!options.params) {
            if (options.params instanceof HttpParams) {
              params = options.params;
            } else {
              params = new HttpParams({
                fromObject: options.params
              });
            }
          }
          req = new HttpRequest(first2, url2, options.body !== void 0 ? options.body : null, {
            headers,
            context: options.context,
            params,
            reportProgress: options.reportProgress,
            // By default, JSON is assumed to be returned for all calls.
            responseType: options.responseType || "json",
            withCredentials: options.withCredentials
          });
        }
        const events$ = of(req).pipe(concatMap((req2) => this.handler.handle(req2)));
        if (first2 instanceof HttpRequest || options.observe === "events") {
          return events$;
        }
        const res$ = events$.pipe(filter((event) => event instanceof HttpResponse));
        switch (options.observe || "body") {
          case "body":
            switch (req.responseType) {
              case "arraybuffer":
                return res$.pipe(map((res) => {
                  if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                    throw new Error("Response is not an ArrayBuffer.");
                  }
                  return res.body;
                }));
              case "blob":
                return res$.pipe(map((res) => {
                  if (res.body !== null && !(res.body instanceof Blob)) {
                    throw new Error("Response is not a Blob.");
                  }
                  return res.body;
                }));
              case "text":
                return res$.pipe(map((res) => {
                  if (res.body !== null && typeof res.body !== "string") {
                    throw new Error("Response is not a string.");
                  }
                  return res.body;
                }));
              case "json":
              default:
                return res$.pipe(map((res) => res.body));
            }
          case "response":
            return res$;
          default:
            throw new Error(`Unreachable: unhandled observe type ${options.observe}}`);
        }
      }
      /**
       * Constructs an observable that, when subscribed, causes the configured
       * `DELETE` request to execute on the server. See the individual overloads for
       * details on the return type.
       *
       * @param url     The endpoint URL.
       * @param options The HTTP options to send with the request.
       *
       */
      delete(url2, options = {}) {
        return this.request("DELETE", url2, options);
      }
      /**
       * Constructs an observable that, when subscribed, causes the configured
       * `GET` request to execute on the server. See the individual overloads for
       * details on the return type.
       */
      get(url2, options = {}) {
        return this.request("GET", url2, options);
      }
      /**
       * Constructs an observable that, when subscribed, causes the configured
       * `HEAD` request to execute on the server. The `HEAD` method returns
       * meta information about the resource without transferring the
       * resource itself. See the individual overloads for
       * details on the return type.
       */
      head(url2, options = {}) {
        return this.request("HEAD", url2, options);
      }
      /**
       * Constructs an `Observable` that, when subscribed, causes a request with the special method
       * `JSONP` to be dispatched via the interceptor pipeline.
       * The [JSONP pattern](https://en.wikipedia.org/wiki/JSONP) works around limitations of certain
       * API endpoints that don't support newer,
       * and preferable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) protocol.
       * JSONP treats the endpoint API as a JavaScript file and tricks the browser to process the
       * requests even if the API endpoint is not located on the same domain (origin) as the client-side
       * application making the request.
       * The endpoint API must support JSONP callback for JSONP requests to work.
       * The resource API returns the JSON response wrapped in a callback function.
       * You can pass the callback function name as one of the query parameters.
       * Note that JSONP requests can only be used with `GET` requests.
       *
       * @param url The resource URL.
       * @param callbackParam The callback function name.
       *
       */
      jsonp(url2, callbackParam) {
        return this.request("JSONP", url2, {
          params: new HttpParams().append(callbackParam, "JSONP_CALLBACK"),
          observe: "body",
          responseType: "json"
        });
      }
      /**
       * Constructs an `Observable` that, when subscribed, causes the configured
       * `OPTIONS` request to execute on the server. This method allows the client
       * to determine the supported HTTP methods and other capabilities of an endpoint,
       * without implying a resource action. See the individual overloads for
       * details on the return type.
       */
      options(url2, options = {}) {
        return this.request("OPTIONS", url2, options);
      }
      /**
       * Constructs an observable that, when subscribed, causes the configured
       * `PATCH` request to execute on the server. See the individual overloads for
       * details on the return type.
       */
      patch(url2, body, options = {}) {
        return this.request("PATCH", url2, addBody(options, body));
      }
      /**
       * Constructs an observable that, when subscribed, causes the configured
       * `POST` request to execute on the server. The server responds with the location of
       * the replaced resource. See the individual overloads for
       * details on the return type.
       */
      post(url2, body, options = {}) {
        return this.request("POST", url2, addBody(options, body));
      }
      /**
       * Constructs an observable that, when subscribed, causes the configured
       * `PUT` request to execute on the server. The `PUT` method replaces an existing resource
       * with a new set of values.
       * See the individual overloads for details on the return type.
       */
      put(url2, body, options = {}) {
        return this.request("PUT", url2, addBody(options, body));
      }
    }
    HttpClient3.ɵfac = function HttpClient_Factory(t) {
      return new (t || HttpClient3)(ɵɵinject(HttpHandler));
    };
    HttpClient3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: HttpClient3,
      factory: HttpClient3.ɵfac
    });
    return HttpClient3;
  })();
  return HttpClient2;
})();
function interceptorChainEndFn(req, finalHandlerFn) {
  return finalHandlerFn(req);
}
function adaptLegacyInterceptorToChain(chainTailFn, interceptor) {
  return (initialRequest, finalHandlerFn) => interceptor.intercept(initialRequest, {
    handle: (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn)
  });
}
function chainedInterceptorFn(chainTailFn, interceptorFn, injector) {
  return (initialRequest, finalHandlerFn) => injector.runInContext(() => interceptorFn(initialRequest, (downstreamRequest) => chainTailFn(downstreamRequest, finalHandlerFn)));
}
const HTTP_INTERCEPTORS = /* @__PURE__ */ new InjectionToken("HTTP_INTERCEPTORS");
const HTTP_INTERCEPTOR_FNS = /* @__PURE__ */ new InjectionToken("HTTP_INTERCEPTOR_FNS");
function legacyInterceptorFnFactory() {
  let chain = null;
  return (req, handler) => {
    var _a;
    if (chain === null) {
      const interceptors = (_a = inject(HTTP_INTERCEPTORS, {
        optional: true
      })) !== null && _a !== void 0 ? _a : [];
      chain = interceptors.reduceRight(adaptLegacyInterceptorToChain, interceptorChainEndFn);
    }
    return chain(req, handler);
  };
}
let HttpInterceptorHandler = /* @__PURE__ */ (() => {
  let HttpInterceptorHandler2 = /* @__PURE__ */ (() => {
    class HttpInterceptorHandler3 extends HttpHandler {
      constructor(backend, injector) {
        super();
        this.backend = backend;
        this.injector = injector;
        this.chain = null;
      }
      handle(initialRequest) {
        if (this.chain === null) {
          const dedupedInterceptorFns = Array.from(new Set(this.injector.get(HTTP_INTERCEPTOR_FNS)));
          this.chain = dedupedInterceptorFns.reduceRight((nextSequencedFn, interceptorFn) => chainedInterceptorFn(nextSequencedFn, interceptorFn, this.injector), interceptorChainEndFn);
        }
        return this.chain(initialRequest, (downstreamRequest) => this.backend.handle(downstreamRequest));
      }
    }
    HttpInterceptorHandler3.ɵfac = function HttpInterceptorHandler_Factory(t) {
      return new (t || HttpInterceptorHandler3)(ɵɵinject(HttpBackend), ɵɵinject(EnvironmentInjector));
    };
    HttpInterceptorHandler3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: HttpInterceptorHandler3,
      factory: HttpInterceptorHandler3.ɵfac
    });
    return HttpInterceptorHandler3;
  })();
  return HttpInterceptorHandler2;
})();
const XSSI_PREFIX = /^\)\]\}',?\n/;
function getResponseUrl(xhr) {
  if ("responseURL" in xhr && xhr.responseURL) {
    return xhr.responseURL;
  }
  if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
    return xhr.getResponseHeader("X-Request-URL");
  }
  return null;
}
let HttpXhrBackend = /* @__PURE__ */ (() => {
  let HttpXhrBackend2 = /* @__PURE__ */ (() => {
    class HttpXhrBackend3 {
      constructor(xhrFactory) {
        this.xhrFactory = xhrFactory;
      }
      /**
       * Processes a request and returns a stream of response events.
       * @param req The request object.
       * @returns An observable of the response events.
       */
      handle(req) {
        if (req.method === "JSONP") {
          throw new Error(`Attempted to construct Jsonp request without HttpClientJsonpModule installed.`);
        }
        return new Observable((observer) => {
          const xhr = this.xhrFactory.build();
          xhr.open(req.method, req.urlWithParams);
          if (!!req.withCredentials) {
            xhr.withCredentials = true;
          }
          req.headers.forEach((name, values) => xhr.setRequestHeader(name, values.join(",")));
          if (!req.headers.has("Accept")) {
            xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
          }
          if (!req.headers.has("Content-Type")) {
            const detectedType = req.detectContentTypeHeader();
            if (detectedType !== null) {
              xhr.setRequestHeader("Content-Type", detectedType);
            }
          }
          if (req.responseType) {
            const responseType = req.responseType.toLowerCase();
            xhr.responseType = responseType !== "json" ? responseType : "text";
          }
          const reqBody = req.serializeBody();
          let headerResponse = null;
          const partialFromXhr = () => {
            if (headerResponse !== null) {
              return headerResponse;
            }
            const statusText = xhr.statusText || "OK";
            const headers = new HttpHeaders(xhr.getAllResponseHeaders());
            const url2 = getResponseUrl(xhr) || req.url;
            headerResponse = new HttpHeaderResponse({
              headers,
              status: xhr.status,
              statusText,
              url: url2
            });
            return headerResponse;
          };
          const onLoad = () => {
            let {
              headers,
              status,
              statusText,
              url: url2
            } = partialFromXhr();
            let body = null;
            if (status !== 204) {
              body = typeof xhr.response === "undefined" ? xhr.responseText : xhr.response;
            }
            if (status === 0) {
              status = !!body ? 200 : 0;
            }
            let ok = status >= 200 && status < 300;
            if (req.responseType === "json" && typeof body === "string") {
              const originalBody = body;
              body = body.replace(XSSI_PREFIX, "");
              try {
                body = body !== "" ? JSON.parse(body) : null;
              } catch (error) {
                body = originalBody;
                if (ok) {
                  ok = false;
                  body = {
                    error,
                    text: body
                  };
                }
              }
            }
            if (ok) {
              observer.next(new HttpResponse({
                body,
                headers,
                status,
                statusText,
                url: url2 || void 0
              }));
              observer.complete();
            } else {
              observer.error(new HttpErrorResponse({
                // The error in this case is the response body (error from the server).
                error: body,
                headers,
                status,
                statusText,
                url: url2 || void 0
              }));
            }
          };
          const onError = (error) => {
            const {
              url: url2
            } = partialFromXhr();
            const res = new HttpErrorResponse({
              error,
              status: xhr.status || 0,
              statusText: xhr.statusText || "Unknown Error",
              url: url2 || void 0
            });
            observer.error(res);
          };
          let sentHeaders = false;
          const onDownProgress = (event) => {
            if (!sentHeaders) {
              observer.next(partialFromXhr());
              sentHeaders = true;
            }
            let progressEvent = {
              type: HttpEventType.DownloadProgress,
              loaded: event.loaded
            };
            if (event.lengthComputable) {
              progressEvent.total = event.total;
            }
            if (req.responseType === "text" && !!xhr.responseText) {
              progressEvent.partialText = xhr.responseText;
            }
            observer.next(progressEvent);
          };
          const onUpProgress = (event) => {
            let progress = {
              type: HttpEventType.UploadProgress,
              loaded: event.loaded
            };
            if (event.lengthComputable) {
              progress.total = event.total;
            }
            observer.next(progress);
          };
          xhr.addEventListener("load", onLoad);
          xhr.addEventListener("error", onError);
          xhr.addEventListener("timeout", onError);
          xhr.addEventListener("abort", onError);
          if (req.reportProgress) {
            xhr.addEventListener("progress", onDownProgress);
            if (reqBody !== null && xhr.upload) {
              xhr.upload.addEventListener("progress", onUpProgress);
            }
          }
          xhr.send(reqBody);
          observer.next({
            type: HttpEventType.Sent
          });
          return () => {
            xhr.removeEventListener("error", onError);
            xhr.removeEventListener("abort", onError);
            xhr.removeEventListener("load", onLoad);
            xhr.removeEventListener("timeout", onError);
            if (req.reportProgress) {
              xhr.removeEventListener("progress", onDownProgress);
              if (reqBody !== null && xhr.upload) {
                xhr.upload.removeEventListener("progress", onUpProgress);
              }
            }
            if (xhr.readyState !== xhr.DONE) {
              xhr.abort();
            }
          };
        });
      }
    }
    HttpXhrBackend3.ɵfac = function HttpXhrBackend_Factory(t) {
      return new (t || HttpXhrBackend3)(ɵɵinject(XhrFactory));
    };
    HttpXhrBackend3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: HttpXhrBackend3,
      factory: HttpXhrBackend3.ɵfac
    });
    return HttpXhrBackend3;
  })();
  return HttpXhrBackend2;
})();
const XSRF_ENABLED = /* @__PURE__ */ new InjectionToken("XSRF_ENABLED");
const XSRF_DEFAULT_COOKIE_NAME = "XSRF-TOKEN";
const XSRF_COOKIE_NAME = /* @__PURE__ */ new InjectionToken("XSRF_COOKIE_NAME", {
  providedIn: "root",
  factory: () => XSRF_DEFAULT_COOKIE_NAME
});
const XSRF_DEFAULT_HEADER_NAME = "X-XSRF-TOKEN";
const XSRF_HEADER_NAME = /* @__PURE__ */ new InjectionToken("XSRF_HEADER_NAME", {
  providedIn: "root",
  factory: () => XSRF_DEFAULT_HEADER_NAME
});
class HttpXsrfTokenExtractor {
}
let HttpXsrfCookieExtractor = /* @__PURE__ */ (() => {
  let HttpXsrfCookieExtractor2 = /* @__PURE__ */ (() => {
    class HttpXsrfCookieExtractor3 {
      constructor(doc, platform, cookieName) {
        this.doc = doc;
        this.platform = platform;
        this.cookieName = cookieName;
        this.lastCookieString = "";
        this.lastToken = null;
        this.parseCount = 0;
      }
      getToken() {
        if (this.platform === "server") {
          return null;
        }
        const cookieString = this.doc.cookie || "";
        if (cookieString !== this.lastCookieString) {
          this.parseCount++;
          this.lastToken = parseCookieValue(cookieString, this.cookieName);
          this.lastCookieString = cookieString;
        }
        return this.lastToken;
      }
    }
    HttpXsrfCookieExtractor3.ɵfac = function HttpXsrfCookieExtractor_Factory(t) {
      return new (t || HttpXsrfCookieExtractor3)(ɵɵinject(DOCUMENT), ɵɵinject(PLATFORM_ID), ɵɵinject(XSRF_COOKIE_NAME));
    };
    HttpXsrfCookieExtractor3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: HttpXsrfCookieExtractor3,
      factory: HttpXsrfCookieExtractor3.ɵfac
    });
    return HttpXsrfCookieExtractor3;
  })();
  return HttpXsrfCookieExtractor2;
})();
function xsrfInterceptorFn(req, next) {
  const lcUrl = req.url.toLowerCase();
  if (!inject(XSRF_ENABLED) || req.method === "GET" || req.method === "HEAD" || lcUrl.startsWith("http://") || lcUrl.startsWith("https://")) {
    return next(req);
  }
  const token = inject(HttpXsrfTokenExtractor).getToken();
  const headerName = inject(XSRF_HEADER_NAME);
  if (token != null && !req.headers.has(headerName)) {
    req = req.clone({
      headers: req.headers.set(headerName, token)
    });
  }
  return next(req);
}
var HttpFeatureKind = /* @__PURE__ */ (() => {
  HttpFeatureKind = HttpFeatureKind || {};
  HttpFeatureKind[HttpFeatureKind["Interceptors"] = 0] = "Interceptors";
  HttpFeatureKind[HttpFeatureKind["LegacyInterceptors"] = 1] = "LegacyInterceptors";
  HttpFeatureKind[HttpFeatureKind["CustomXsrfConfiguration"] = 2] = "CustomXsrfConfiguration";
  HttpFeatureKind[HttpFeatureKind["NoXsrfProtection"] = 3] = "NoXsrfProtection";
  HttpFeatureKind[HttpFeatureKind["JsonpSupport"] = 4] = "JsonpSupport";
  HttpFeatureKind[HttpFeatureKind["RequestsMadeViaParent"] = 5] = "RequestsMadeViaParent";
  return HttpFeatureKind;
})();
function makeHttpFeature(kind, providers) {
  return {
    ɵkind: kind,
    ɵproviders: providers
  };
}
function provideHttpClient(...features) {
  if (false) {
    const featureKinds = new Set(features.map((f) => f.ɵkind));
    if (featureKinds.has(HttpFeatureKind.NoXsrfProtection) && featureKinds.has(HttpFeatureKind.CustomXsrfConfiguration)) {
      throw new Error(false ? `Configuration error: found both withXsrfConfiguration() and withNoXsrfProtection() in the same call to provideHttpClient(), which is a contradiction.` : "");
    }
  }
  const providers = [HttpClient, HttpXhrBackend, HttpInterceptorHandler, {
    provide: HttpHandler,
    useExisting: HttpInterceptorHandler
  }, {
    provide: HttpBackend,
    useExisting: HttpXhrBackend
  }, {
    provide: HTTP_INTERCEPTOR_FNS,
    useValue: xsrfInterceptorFn,
    multi: true
  }, {
    provide: XSRF_ENABLED,
    useValue: true
  }, {
    provide: HttpXsrfTokenExtractor,
    useClass: HttpXsrfCookieExtractor
  }];
  for (const feature of features) {
    providers.push(...feature.ɵproviders);
  }
  return makeEnvironmentProviders(providers);
}
const LEGACY_INTERCEPTOR_FN = /* @__PURE__ */ new InjectionToken("LEGACY_INTERCEPTOR_FN");
function withInterceptorsFromDi() {
  return makeHttpFeature(HttpFeatureKind.LegacyInterceptors, [{
    provide: LEGACY_INTERCEPTOR_FN,
    useFactory: legacyInterceptorFnFactory
  }, {
    provide: HTTP_INTERCEPTOR_FNS,
    useExisting: LEGACY_INTERCEPTOR_FN,
    multi: true
  }]);
}
function withXsrfConfiguration({
  cookieName,
  headerName
}) {
  const providers = [];
  if (cookieName !== void 0) {
    providers.push({
      provide: XSRF_COOKIE_NAME,
      useValue: cookieName
    });
  }
  if (headerName !== void 0) {
    providers.push({
      provide: XSRF_HEADER_NAME,
      useValue: headerName
    });
  }
  return makeHttpFeature(HttpFeatureKind.CustomXsrfConfiguration, providers);
}
let HttpClientModule = /* @__PURE__ */ (() => {
  let HttpClientModule2 = /* @__PURE__ */ (() => {
    class HttpClientModule3 {
    }
    HttpClientModule3.ɵfac = function HttpClientModule_Factory(t) {
      return new (t || HttpClientModule3)();
    };
    HttpClientModule3.ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
      type: HttpClientModule3
    });
    HttpClientModule3.ɵinj = /* @__PURE__ */ ɵɵdefineInjector({
      providers: [provideHttpClient(withInterceptorsFromDi(), withXsrfConfiguration({
        cookieName: XSRF_DEFAULT_COOKIE_NAME,
        headerName: XSRF_DEFAULT_HEADER_NAME
      }))]
    });
    return HttpClientModule3;
  })();
  return HttpClientModule2;
})();
var ViewEncapsulation = /* @__PURE__ */ (() => {
  ViewEncapsulation = ViewEncapsulation || {};
  ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
  ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
  ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
  return ViewEncapsulation;
})();
const CUSTOM_ELEMENTS_SCHEMA = {
  name: "custom-elements"
};
const NO_ERRORS_SCHEMA = {
  name: "no-errors-schema"
};
var SecurityContext = /* @__PURE__ */ (() => {
  SecurityContext = SecurityContext || {};
  SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
  SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
  SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
  SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
  SecurityContext[SecurityContext["URL"] = 4] = "URL";
  SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
  return SecurityContext;
})();
const CORE = "@angular/core";
let Identifiers = /* @__PURE__ */ (() => {
  let Identifiers2 = /* @__PURE__ */ (() => {
    class Identifiers3 {
    }
    Identifiers3.NEW_METHOD = "factory";
    Identifiers3.TRANSFORM_METHOD = "transform";
    Identifiers3.PATCH_DEPS = "patchedDeps";
    Identifiers3.core = {
      name: null,
      moduleName: CORE
    };
    Identifiers3.namespaceHTML = {
      name: "ɵɵnamespaceHTML",
      moduleName: CORE
    };
    Identifiers3.namespaceMathML = {
      name: "ɵɵnamespaceMathML",
      moduleName: CORE
    };
    Identifiers3.namespaceSVG = {
      name: "ɵɵnamespaceSVG",
      moduleName: CORE
    };
    Identifiers3.element = {
      name: "ɵɵelement",
      moduleName: CORE
    };
    Identifiers3.elementStart = {
      name: "ɵɵelementStart",
      moduleName: CORE
    };
    Identifiers3.elementEnd = {
      name: "ɵɵelementEnd",
      moduleName: CORE
    };
    Identifiers3.advance = {
      name: "ɵɵadvance",
      moduleName: CORE
    };
    Identifiers3.syntheticHostProperty = {
      name: "ɵɵsyntheticHostProperty",
      moduleName: CORE
    };
    Identifiers3.syntheticHostListener = {
      name: "ɵɵsyntheticHostListener",
      moduleName: CORE
    };
    Identifiers3.attribute = {
      name: "ɵɵattribute",
      moduleName: CORE
    };
    Identifiers3.attributeInterpolate1 = {
      name: "ɵɵattributeInterpolate1",
      moduleName: CORE
    };
    Identifiers3.attributeInterpolate2 = {
      name: "ɵɵattributeInterpolate2",
      moduleName: CORE
    };
    Identifiers3.attributeInterpolate3 = {
      name: "ɵɵattributeInterpolate3",
      moduleName: CORE
    };
    Identifiers3.attributeInterpolate4 = {
      name: "ɵɵattributeInterpolate4",
      moduleName: CORE
    };
    Identifiers3.attributeInterpolate5 = {
      name: "ɵɵattributeInterpolate5",
      moduleName: CORE
    };
    Identifiers3.attributeInterpolate6 = {
      name: "ɵɵattributeInterpolate6",
      moduleName: CORE
    };
    Identifiers3.attributeInterpolate7 = {
      name: "ɵɵattributeInterpolate7",
      moduleName: CORE
    };
    Identifiers3.attributeInterpolate8 = {
      name: "ɵɵattributeInterpolate8",
      moduleName: CORE
    };
    Identifiers3.attributeInterpolateV = {
      name: "ɵɵattributeInterpolateV",
      moduleName: CORE
    };
    Identifiers3.classProp = {
      name: "ɵɵclassProp",
      moduleName: CORE
    };
    Identifiers3.elementContainerStart = {
      name: "ɵɵelementContainerStart",
      moduleName: CORE
    };
    Identifiers3.elementContainerEnd = {
      name: "ɵɵelementContainerEnd",
      moduleName: CORE
    };
    Identifiers3.elementContainer = {
      name: "ɵɵelementContainer",
      moduleName: CORE
    };
    Identifiers3.styleMap = {
      name: "ɵɵstyleMap",
      moduleName: CORE
    };
    Identifiers3.styleMapInterpolate1 = {
      name: "ɵɵstyleMapInterpolate1",
      moduleName: CORE
    };
    Identifiers3.styleMapInterpolate2 = {
      name: "ɵɵstyleMapInterpolate2",
      moduleName: CORE
    };
    Identifiers3.styleMapInterpolate3 = {
      name: "ɵɵstyleMapInterpolate3",
      moduleName: CORE
    };
    Identifiers3.styleMapInterpolate4 = {
      name: "ɵɵstyleMapInterpolate4",
      moduleName: CORE
    };
    Identifiers3.styleMapInterpolate5 = {
      name: "ɵɵstyleMapInterpolate5",
      moduleName: CORE
    };
    Identifiers3.styleMapInterpolate6 = {
      name: "ɵɵstyleMapInterpolate6",
      moduleName: CORE
    };
    Identifiers3.styleMapInterpolate7 = {
      name: "ɵɵstyleMapInterpolate7",
      moduleName: CORE
    };
    Identifiers3.styleMapInterpolate8 = {
      name: "ɵɵstyleMapInterpolate8",
      moduleName: CORE
    };
    Identifiers3.styleMapInterpolateV = {
      name: "ɵɵstyleMapInterpolateV",
      moduleName: CORE
    };
    Identifiers3.classMap = {
      name: "ɵɵclassMap",
      moduleName: CORE
    };
    Identifiers3.classMapInterpolate1 = {
      name: "ɵɵclassMapInterpolate1",
      moduleName: CORE
    };
    Identifiers3.classMapInterpolate2 = {
      name: "ɵɵclassMapInterpolate2",
      moduleName: CORE
    };
    Identifiers3.classMapInterpolate3 = {
      name: "ɵɵclassMapInterpolate3",
      moduleName: CORE
    };
    Identifiers3.classMapInterpolate4 = {
      name: "ɵɵclassMapInterpolate4",
      moduleName: CORE
    };
    Identifiers3.classMapInterpolate5 = {
      name: "ɵɵclassMapInterpolate5",
      moduleName: CORE
    };
    Identifiers3.classMapInterpolate6 = {
      name: "ɵɵclassMapInterpolate6",
      moduleName: CORE
    };
    Identifiers3.classMapInterpolate7 = {
      name: "ɵɵclassMapInterpolate7",
      moduleName: CORE
    };
    Identifiers3.classMapInterpolate8 = {
      name: "ɵɵclassMapInterpolate8",
      moduleName: CORE
    };
    Identifiers3.classMapInterpolateV = {
      name: "ɵɵclassMapInterpolateV",
      moduleName: CORE
    };
    Identifiers3.styleProp = {
      name: "ɵɵstyleProp",
      moduleName: CORE
    };
    Identifiers3.stylePropInterpolate1 = {
      name: "ɵɵstylePropInterpolate1",
      moduleName: CORE
    };
    Identifiers3.stylePropInterpolate2 = {
      name: "ɵɵstylePropInterpolate2",
      moduleName: CORE
    };
    Identifiers3.stylePropInterpolate3 = {
      name: "ɵɵstylePropInterpolate3",
      moduleName: CORE
    };
    Identifiers3.stylePropInterpolate4 = {
      name: "ɵɵstylePropInterpolate4",
      moduleName: CORE
    };
    Identifiers3.stylePropInterpolate5 = {
      name: "ɵɵstylePropInterpolate5",
      moduleName: CORE
    };
    Identifiers3.stylePropInterpolate6 = {
      name: "ɵɵstylePropInterpolate6",
      moduleName: CORE
    };
    Identifiers3.stylePropInterpolate7 = {
      name: "ɵɵstylePropInterpolate7",
      moduleName: CORE
    };
    Identifiers3.stylePropInterpolate8 = {
      name: "ɵɵstylePropInterpolate8",
      moduleName: CORE
    };
    Identifiers3.stylePropInterpolateV = {
      name: "ɵɵstylePropInterpolateV",
      moduleName: CORE
    };
    Identifiers3.nextContext = {
      name: "ɵɵnextContext",
      moduleName: CORE
    };
    Identifiers3.resetView = {
      name: "ɵɵresetView",
      moduleName: CORE
    };
    Identifiers3.templateCreate = {
      name: "ɵɵtemplate",
      moduleName: CORE
    };
    Identifiers3.text = {
      name: "ɵɵtext",
      moduleName: CORE
    };
    Identifiers3.enableBindings = {
      name: "ɵɵenableBindings",
      moduleName: CORE
    };
    Identifiers3.disableBindings = {
      name: "ɵɵdisableBindings",
      moduleName: CORE
    };
    Identifiers3.getCurrentView = {
      name: "ɵɵgetCurrentView",
      moduleName: CORE
    };
    Identifiers3.textInterpolate = {
      name: "ɵɵtextInterpolate",
      moduleName: CORE
    };
    Identifiers3.textInterpolate1 = {
      name: "ɵɵtextInterpolate1",
      moduleName: CORE
    };
    Identifiers3.textInterpolate2 = {
      name: "ɵɵtextInterpolate2",
      moduleName: CORE
    };
    Identifiers3.textInterpolate3 = {
      name: "ɵɵtextInterpolate3",
      moduleName: CORE
    };
    Identifiers3.textInterpolate4 = {
      name: "ɵɵtextInterpolate4",
      moduleName: CORE
    };
    Identifiers3.textInterpolate5 = {
      name: "ɵɵtextInterpolate5",
      moduleName: CORE
    };
    Identifiers3.textInterpolate6 = {
      name: "ɵɵtextInterpolate6",
      moduleName: CORE
    };
    Identifiers3.textInterpolate7 = {
      name: "ɵɵtextInterpolate7",
      moduleName: CORE
    };
    Identifiers3.textInterpolate8 = {
      name: "ɵɵtextInterpolate8",
      moduleName: CORE
    };
    Identifiers3.textInterpolateV = {
      name: "ɵɵtextInterpolateV",
      moduleName: CORE
    };
    Identifiers3.restoreView = {
      name: "ɵɵrestoreView",
      moduleName: CORE
    };
    Identifiers3.pureFunction0 = {
      name: "ɵɵpureFunction0",
      moduleName: CORE
    };
    Identifiers3.pureFunction1 = {
      name: "ɵɵpureFunction1",
      moduleName: CORE
    };
    Identifiers3.pureFunction2 = {
      name: "ɵɵpureFunction2",
      moduleName: CORE
    };
    Identifiers3.pureFunction3 = {
      name: "ɵɵpureFunction3",
      moduleName: CORE
    };
    Identifiers3.pureFunction4 = {
      name: "ɵɵpureFunction4",
      moduleName: CORE
    };
    Identifiers3.pureFunction5 = {
      name: "ɵɵpureFunction5",
      moduleName: CORE
    };
    Identifiers3.pureFunction6 = {
      name: "ɵɵpureFunction6",
      moduleName: CORE
    };
    Identifiers3.pureFunction7 = {
      name: "ɵɵpureFunction7",
      moduleName: CORE
    };
    Identifiers3.pureFunction8 = {
      name: "ɵɵpureFunction8",
      moduleName: CORE
    };
    Identifiers3.pureFunctionV = {
      name: "ɵɵpureFunctionV",
      moduleName: CORE
    };
    Identifiers3.pipeBind1 = {
      name: "ɵɵpipeBind1",
      moduleName: CORE
    };
    Identifiers3.pipeBind2 = {
      name: "ɵɵpipeBind2",
      moduleName: CORE
    };
    Identifiers3.pipeBind3 = {
      name: "ɵɵpipeBind3",
      moduleName: CORE
    };
    Identifiers3.pipeBind4 = {
      name: "ɵɵpipeBind4",
      moduleName: CORE
    };
    Identifiers3.pipeBindV = {
      name: "ɵɵpipeBindV",
      moduleName: CORE
    };
    Identifiers3.hostProperty = {
      name: "ɵɵhostProperty",
      moduleName: CORE
    };
    Identifiers3.property = {
      name: "ɵɵproperty",
      moduleName: CORE
    };
    Identifiers3.propertyInterpolate = {
      name: "ɵɵpropertyInterpolate",
      moduleName: CORE
    };
    Identifiers3.propertyInterpolate1 = {
      name: "ɵɵpropertyInterpolate1",
      moduleName: CORE
    };
    Identifiers3.propertyInterpolate2 = {
      name: "ɵɵpropertyInterpolate2",
      moduleName: CORE
    };
    Identifiers3.propertyInterpolate3 = {
      name: "ɵɵpropertyInterpolate3",
      moduleName: CORE
    };
    Identifiers3.propertyInterpolate4 = {
      name: "ɵɵpropertyInterpolate4",
      moduleName: CORE
    };
    Identifiers3.propertyInterpolate5 = {
      name: "ɵɵpropertyInterpolate5",
      moduleName: CORE
    };
    Identifiers3.propertyInterpolate6 = {
      name: "ɵɵpropertyInterpolate6",
      moduleName: CORE
    };
    Identifiers3.propertyInterpolate7 = {
      name: "ɵɵpropertyInterpolate7",
      moduleName: CORE
    };
    Identifiers3.propertyInterpolate8 = {
      name: "ɵɵpropertyInterpolate8",
      moduleName: CORE
    };
    Identifiers3.propertyInterpolateV = {
      name: "ɵɵpropertyInterpolateV",
      moduleName: CORE
    };
    Identifiers3.i18n = {
      name: "ɵɵi18n",
      moduleName: CORE
    };
    Identifiers3.i18nAttributes = {
      name: "ɵɵi18nAttributes",
      moduleName: CORE
    };
    Identifiers3.i18nExp = {
      name: "ɵɵi18nExp",
      moduleName: CORE
    };
    Identifiers3.i18nStart = {
      name: "ɵɵi18nStart",
      moduleName: CORE
    };
    Identifiers3.i18nEnd = {
      name: "ɵɵi18nEnd",
      moduleName: CORE
    };
    Identifiers3.i18nApply = {
      name: "ɵɵi18nApply",
      moduleName: CORE
    };
    Identifiers3.i18nPostprocess = {
      name: "ɵɵi18nPostprocess",
      moduleName: CORE
    };
    Identifiers3.pipe = {
      name: "ɵɵpipe",
      moduleName: CORE
    };
    Identifiers3.projection = {
      name: "ɵɵprojection",
      moduleName: CORE
    };
    Identifiers3.projectionDef = {
      name: "ɵɵprojectionDef",
      moduleName: CORE
    };
    Identifiers3.reference = {
      name: "ɵɵreference",
      moduleName: CORE
    };
    Identifiers3.inject = {
      name: "ɵɵinject",
      moduleName: CORE
    };
    Identifiers3.injectAttribute = {
      name: "ɵɵinjectAttribute",
      moduleName: CORE
    };
    Identifiers3.directiveInject = {
      name: "ɵɵdirectiveInject",
      moduleName: CORE
    };
    Identifiers3.invalidFactory = {
      name: "ɵɵinvalidFactory",
      moduleName: CORE
    };
    Identifiers3.invalidFactoryDep = {
      name: "ɵɵinvalidFactoryDep",
      moduleName: CORE
    };
    Identifiers3.templateRefExtractor = {
      name: "ɵɵtemplateRefExtractor",
      moduleName: CORE
    };
    Identifiers3.forwardRef = {
      name: "forwardRef",
      moduleName: CORE
    };
    Identifiers3.resolveForwardRef = {
      name: "resolveForwardRef",
      moduleName: CORE
    };
    Identifiers3.ɵɵdefineInjectable = {
      name: "ɵɵdefineInjectable",
      moduleName: CORE
    };
    Identifiers3.declareInjectable = {
      name: "ɵɵngDeclareInjectable",
      moduleName: CORE
    };
    Identifiers3.InjectableDeclaration = {
      name: "ɵɵInjectableDeclaration",
      moduleName: CORE
    };
    Identifiers3.resolveWindow = {
      name: "ɵɵresolveWindow",
      moduleName: CORE
    };
    Identifiers3.resolveDocument = {
      name: "ɵɵresolveDocument",
      moduleName: CORE
    };
    Identifiers3.resolveBody = {
      name: "ɵɵresolveBody",
      moduleName: CORE
    };
    Identifiers3.defineComponent = {
      name: "ɵɵdefineComponent",
      moduleName: CORE
    };
    Identifiers3.declareComponent = {
      name: "ɵɵngDeclareComponent",
      moduleName: CORE
    };
    Identifiers3.setComponentScope = {
      name: "ɵɵsetComponentScope",
      moduleName: CORE
    };
    Identifiers3.ChangeDetectionStrategy = {
      name: "ChangeDetectionStrategy",
      moduleName: CORE
    };
    Identifiers3.ViewEncapsulation = {
      name: "ViewEncapsulation",
      moduleName: CORE
    };
    Identifiers3.ComponentDeclaration = {
      name: "ɵɵComponentDeclaration",
      moduleName: CORE
    };
    Identifiers3.FactoryDeclaration = {
      name: "ɵɵFactoryDeclaration",
      moduleName: CORE
    };
    Identifiers3.declareFactory = {
      name: "ɵɵngDeclareFactory",
      moduleName: CORE
    };
    Identifiers3.FactoryTarget = {
      name: "ɵɵFactoryTarget",
      moduleName: CORE
    };
    Identifiers3.defineDirective = {
      name: "ɵɵdefineDirective",
      moduleName: CORE
    };
    Identifiers3.declareDirective = {
      name: "ɵɵngDeclareDirective",
      moduleName: CORE
    };
    Identifiers3.DirectiveDeclaration = {
      name: "ɵɵDirectiveDeclaration",
      moduleName: CORE
    };
    Identifiers3.InjectorDef = {
      name: "ɵɵInjectorDef",
      moduleName: CORE
    };
    Identifiers3.InjectorDeclaration = {
      name: "ɵɵInjectorDeclaration",
      moduleName: CORE
    };
    Identifiers3.defineInjector = {
      name: "ɵɵdefineInjector",
      moduleName: CORE
    };
    Identifiers3.declareInjector = {
      name: "ɵɵngDeclareInjector",
      moduleName: CORE
    };
    Identifiers3.NgModuleDeclaration = {
      name: "ɵɵNgModuleDeclaration",
      moduleName: CORE
    };
    Identifiers3.ModuleWithProviders = {
      name: "ModuleWithProviders",
      moduleName: CORE
    };
    Identifiers3.defineNgModule = {
      name: "ɵɵdefineNgModule",
      moduleName: CORE
    };
    Identifiers3.declareNgModule = {
      name: "ɵɵngDeclareNgModule",
      moduleName: CORE
    };
    Identifiers3.setNgModuleScope = {
      name: "ɵɵsetNgModuleScope",
      moduleName: CORE
    };
    Identifiers3.registerNgModuleType = {
      name: "ɵɵregisterNgModuleType",
      moduleName: CORE
    };
    Identifiers3.PipeDeclaration = {
      name: "ɵɵPipeDeclaration",
      moduleName: CORE
    };
    Identifiers3.definePipe = {
      name: "ɵɵdefinePipe",
      moduleName: CORE
    };
    Identifiers3.declarePipe = {
      name: "ɵɵngDeclarePipe",
      moduleName: CORE
    };
    Identifiers3.declareClassMetadata = {
      name: "ɵɵngDeclareClassMetadata",
      moduleName: CORE
    };
    Identifiers3.setClassMetadata = {
      name: "ɵsetClassMetadata",
      moduleName: CORE
    };
    Identifiers3.queryRefresh = {
      name: "ɵɵqueryRefresh",
      moduleName: CORE
    };
    Identifiers3.viewQuery = {
      name: "ɵɵviewQuery",
      moduleName: CORE
    };
    Identifiers3.loadQuery = {
      name: "ɵɵloadQuery",
      moduleName: CORE
    };
    Identifiers3.contentQuery = {
      name: "ɵɵcontentQuery",
      moduleName: CORE
    };
    Identifiers3.NgOnChangesFeature = {
      name: "ɵɵNgOnChangesFeature",
      moduleName: CORE
    };
    Identifiers3.InheritDefinitionFeature = {
      name: "ɵɵInheritDefinitionFeature",
      moduleName: CORE
    };
    Identifiers3.CopyDefinitionFeature = {
      name: "ɵɵCopyDefinitionFeature",
      moduleName: CORE
    };
    Identifiers3.StandaloneFeature = {
      name: "ɵɵStandaloneFeature",
      moduleName: CORE
    };
    Identifiers3.ProvidersFeature = {
      name: "ɵɵProvidersFeature",
      moduleName: CORE
    };
    Identifiers3.HostDirectivesFeature = {
      name: "ɵɵHostDirectivesFeature",
      moduleName: CORE
    };
    Identifiers3.listener = {
      name: "ɵɵlistener",
      moduleName: CORE
    };
    Identifiers3.getInheritedFactory = {
      name: "ɵɵgetInheritedFactory",
      moduleName: CORE
    };
    Identifiers3.sanitizeHtml = {
      name: "ɵɵsanitizeHtml",
      moduleName: CORE
    };
    Identifiers3.sanitizeStyle = {
      name: "ɵɵsanitizeStyle",
      moduleName: CORE
    };
    Identifiers3.sanitizeResourceUrl = {
      name: "ɵɵsanitizeResourceUrl",
      moduleName: CORE
    };
    Identifiers3.sanitizeScript = {
      name: "ɵɵsanitizeScript",
      moduleName: CORE
    };
    Identifiers3.sanitizeUrl = {
      name: "ɵɵsanitizeUrl",
      moduleName: CORE
    };
    Identifiers3.sanitizeUrlOrResourceUrl = {
      name: "ɵɵsanitizeUrlOrResourceUrl",
      moduleName: CORE
    };
    Identifiers3.trustConstantHtml = {
      name: "ɵɵtrustConstantHtml",
      moduleName: CORE
    };
    Identifiers3.trustConstantResourceUrl = {
      name: "ɵɵtrustConstantResourceUrl",
      moduleName: CORE
    };
    Identifiers3.validateIframeAttribute = {
      name: "ɵɵvalidateIframeAttribute",
      moduleName: CORE
    };
    return Identifiers3;
  })();
  return Identifiers2;
})();
const DASH_CASE_REGEXP = /-+([a-z0-9])/g;
function dashCaseToCamelCase(input) {
  return input.replace(DASH_CASE_REGEXP, (...m) => m[1].toUpperCase());
}
function noUndefined(val) {
  return val === void 0 ? null : val;
}
/* @__PURE__ */ new Set([Identifiers.element, Identifiers.elementStart, Identifiers.elementEnd, Identifiers.elementContainer, Identifiers.elementContainerStart, Identifiers.elementContainerEnd, Identifiers.i18nExp, Identifiers.listener, Identifiers.classProp, Identifiers.syntheticHostListener, Identifiers.hostProperty, Identifiers.syntheticHostProperty, Identifiers.property, Identifiers.propertyInterpolate1, Identifiers.propertyInterpolate2, Identifiers.propertyInterpolate3, Identifiers.propertyInterpolate4, Identifiers.propertyInterpolate5, Identifiers.propertyInterpolate6, Identifiers.propertyInterpolate7, Identifiers.propertyInterpolate8, Identifiers.propertyInterpolateV, Identifiers.attribute, Identifiers.attributeInterpolate1, Identifiers.attributeInterpolate2, Identifiers.attributeInterpolate3, Identifiers.attributeInterpolate4, Identifiers.attributeInterpolate5, Identifiers.attributeInterpolate6, Identifiers.attributeInterpolate7, Identifiers.attributeInterpolate8, Identifiers.attributeInterpolateV, Identifiers.styleProp, Identifiers.stylePropInterpolate1, Identifiers.stylePropInterpolate2, Identifiers.stylePropInterpolate3, Identifiers.stylePropInterpolate4, Identifiers.stylePropInterpolate5, Identifiers.stylePropInterpolate6, Identifiers.stylePropInterpolate7, Identifiers.stylePropInterpolate8, Identifiers.stylePropInterpolateV, Identifiers.textInterpolate, Identifiers.textInterpolate1, Identifiers.textInterpolate2, Identifiers.textInterpolate3, Identifiers.textInterpolate4, Identifiers.textInterpolate5, Identifiers.textInterpolate6, Identifiers.textInterpolate7, Identifiers.textInterpolate8, Identifiers.textInterpolateV]);
let _SECURITY_SCHEMA;
function SECURITY_SCHEMA() {
  if (!_SECURITY_SCHEMA) {
    _SECURITY_SCHEMA = {};
    registerContext(SecurityContext.HTML, ["iframe|srcdoc", "*|innerHTML", "*|outerHTML"]);
    registerContext(SecurityContext.STYLE, ["*|style"]);
    registerContext(SecurityContext.URL, ["*|formAction", "area|href", "area|ping", "audio|src", "a|href", "a|ping", "blockquote|cite", "body|background", "del|cite", "form|action", "img|src", "input|src", "ins|cite", "q|cite", "source|src", "track|src", "video|poster", "video|src"]);
    registerContext(SecurityContext.RESOURCE_URL, ["applet|code", "applet|codebase", "base|href", "embed|src", "frame|src", "head|profile", "html|manifest", "iframe|src", "link|href", "media|src", "object|codebase", "object|data", "script|src"]);
  }
  return _SECURITY_SCHEMA;
}
function registerContext(ctx, specs) {
  for (const spec of specs)
    _SECURITY_SCHEMA[spec.toLowerCase()] = ctx;
}
function splitNsName(elementName) {
  if (elementName[0] != ":") {
    return [null, elementName];
  }
  const colonIndex = elementName.indexOf(":", 1);
  if (colonIndex === -1) {
    throw new Error(`Unsupported format "${elementName}" expecting ":namespace:name"`);
  }
  return [elementName.slice(1, colonIndex), elementName.slice(colonIndex + 1)];
}
function isNgContainer(tagName) {
  return splitNsName(tagName)[1] === "ng-container";
}
function isNgContent(tagName) {
  return splitNsName(tagName)[1] === "ng-content";
}
class ElementSchemaRegistry {
}
const BOOLEAN = "boolean";
const NUMBER = "number";
const STRING = "string";
const OBJECT = "object";
const SCHEMA = ["[Element]|textContent,%ariaAtomic,%ariaAutoComplete,%ariaBusy,%ariaChecked,%ariaColCount,%ariaColIndex,%ariaColSpan,%ariaCurrent,%ariaDescription,%ariaDisabled,%ariaExpanded,%ariaHasPopup,%ariaHidden,%ariaKeyShortcuts,%ariaLabel,%ariaLevel,%ariaLive,%ariaModal,%ariaMultiLine,%ariaMultiSelectable,%ariaOrientation,%ariaPlaceholder,%ariaPosInSet,%ariaPressed,%ariaReadOnly,%ariaRelevant,%ariaRequired,%ariaRoleDescription,%ariaRowCount,%ariaRowIndex,%ariaRowSpan,%ariaSelected,%ariaSetSize,%ariaSort,%ariaValueMax,%ariaValueMin,%ariaValueNow,%ariaValueText,%classList,className,elementTiming,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*fullscreenchange,*fullscreenerror,*search,*webkitfullscreenchange,*webkitfullscreenerror,outerHTML,%part,#scrollLeft,#scrollTop,slot,*message,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored", "[HTMLElement]^[Element]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy", "abbr,address,article,aside,b,bdi,bdo,cite,content,code,dd,dfn,dt,em,figcaption,figure,footer,header,hgroup,i,kbd,main,mark,nav,noscript,rb,rp,rt,rtc,ruby,s,samp,section,small,strong,sub,sup,u,var,wbr^[HTMLElement]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy", "media^[HTMLElement]|!autoplay,!controls,%controlsList,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,*waitingforkey,#playbackRate,preload,!preservesPitch,src,%srcObject,#volume", ":svg:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex", ":svg:graphics^:svg:|", ":svg:animation^:svg:|*begin,*end,*repeat", ":svg:geometry^:svg:|", ":svg:componentTransferFunction^:svg:|", ":svg:gradient^:svg:|", ":svg:textContent^:svg:graphics|", ":svg:textPositioning^:svg:textContent|", "a^[HTMLElement]|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,rev,search,shape,target,text,type,username", "area^[HTMLElement]|alt,coords,download,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,search,shape,target,username", "audio^media|", "br^[HTMLElement]|clear", "base^[HTMLElement]|href,target", "body^[HTMLElement]|aLink,background,bgColor,link,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink", "button^[HTMLElement]|!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value", "canvas^[HTMLElement]|#height,#width", "content^[HTMLElement]|select", "dl^[HTMLElement]|!compact", "data^[HTMLElement]|value", "datalist^[HTMLElement]|", "details^[HTMLElement]|!open", "dialog^[HTMLElement]|!open,returnValue", "dir^[HTMLElement]|!compact", "div^[HTMLElement]|align", "embed^[HTMLElement]|align,height,name,src,type,width", "fieldset^[HTMLElement]|!disabled,name", "font^[HTMLElement]|color,face,size", "form^[HTMLElement]|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target", "frame^[HTMLElement]|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src", "frameset^[HTMLElement]|cols,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows", "hr^[HTMLElement]|align,color,!noShade,size,width", "head^[HTMLElement]|", "h1,h2,h3,h4,h5,h6^[HTMLElement]|align", "html^[HTMLElement]|version", "iframe^[HTMLElement]|align,allow,!allowFullscreen,!allowPaymentRequest,csp,frameBorder,height,loading,longDesc,marginHeight,marginWidth,name,referrerPolicy,%sandbox,scrolling,src,srcdoc,width", "img^[HTMLElement]|align,alt,border,%crossOrigin,decoding,#height,#hspace,!isMap,loading,longDesc,lowsrc,name,referrerPolicy,sizes,src,srcset,useMap,#vspace,#width", "input^[HTMLElement]|accept,align,alt,autocomplete,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width", "li^[HTMLElement]|type,#value", "label^[HTMLElement]|htmlFor", "legend^[HTMLElement]|align", "link^[HTMLElement]|as,charset,%crossOrigin,!disabled,href,hreflang,imageSizes,imageSrcset,integrity,media,referrerPolicy,rel,%relList,rev,%sizes,target,type", "map^[HTMLElement]|name", "marquee^[HTMLElement]|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width", "menu^[HTMLElement]|!compact", "meta^[HTMLElement]|content,httpEquiv,media,name,scheme", "meter^[HTMLElement]|#high,#low,#max,#min,#optimum,#value", "ins,del^[HTMLElement]|cite,dateTime", "ol^[HTMLElement]|!compact,!reversed,#start,type", "object^[HTMLElement]|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width", "optgroup^[HTMLElement]|!disabled,label", "option^[HTMLElement]|!defaultSelected,!disabled,label,!selected,text,value", "output^[HTMLElement]|defaultValue,%htmlFor,name,value", "p^[HTMLElement]|align", "param^[HTMLElement]|name,type,value,valueType", "picture^[HTMLElement]|", "pre^[HTMLElement]|#width", "progress^[HTMLElement]|#max,#value", "q,blockquote,cite^[HTMLElement]|", "script^[HTMLElement]|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,!noModule,%referrerPolicy,src,text,type", "select^[HTMLElement]|autocomplete,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value", "slot^[HTMLElement]|name", "source^[HTMLElement]|#height,media,sizes,src,srcset,type,#width", "span^[HTMLElement]|", "style^[HTMLElement]|!disabled,media,type", "caption^[HTMLElement]|align", "th,td^[HTMLElement]|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width", "col,colgroup^[HTMLElement]|align,ch,chOff,#span,vAlign,width", "table^[HTMLElement]|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width", "tr^[HTMLElement]|align,bgColor,ch,chOff,vAlign", "tfoot,thead,tbody^[HTMLElement]|align,ch,chOff,vAlign", "template^[HTMLElement]|", "textarea^[HTMLElement]|autocomplete,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap", "time^[HTMLElement]|dateTime", "title^[HTMLElement]|text", "track^[HTMLElement]|!default,kind,label,src,srclang", "ul^[HTMLElement]|!compact,type", "unknown^[HTMLElement]|", "video^media|!disablePictureInPicture,#height,*enterpictureinpicture,*leavepictureinpicture,!playsInline,poster,#width", ":svg:a^:svg:graphics|", ":svg:animate^:svg:animation|", ":svg:animateMotion^:svg:animation|", ":svg:animateTransform^:svg:animation|", ":svg:circle^:svg:geometry|", ":svg:clipPath^:svg:graphics|", ":svg:defs^:svg:graphics|", ":svg:desc^:svg:|", ":svg:discard^:svg:|", ":svg:ellipse^:svg:geometry|", ":svg:feBlend^:svg:|", ":svg:feColorMatrix^:svg:|", ":svg:feComponentTransfer^:svg:|", ":svg:feComposite^:svg:|", ":svg:feConvolveMatrix^:svg:|", ":svg:feDiffuseLighting^:svg:|", ":svg:feDisplacementMap^:svg:|", ":svg:feDistantLight^:svg:|", ":svg:feDropShadow^:svg:|", ":svg:feFlood^:svg:|", ":svg:feFuncA^:svg:componentTransferFunction|", ":svg:feFuncB^:svg:componentTransferFunction|", ":svg:feFuncG^:svg:componentTransferFunction|", ":svg:feFuncR^:svg:componentTransferFunction|", ":svg:feGaussianBlur^:svg:|", ":svg:feImage^:svg:|", ":svg:feMerge^:svg:|", ":svg:feMergeNode^:svg:|", ":svg:feMorphology^:svg:|", ":svg:feOffset^:svg:|", ":svg:fePointLight^:svg:|", ":svg:feSpecularLighting^:svg:|", ":svg:feSpotLight^:svg:|", ":svg:feTile^:svg:|", ":svg:feTurbulence^:svg:|", ":svg:filter^:svg:|", ":svg:foreignObject^:svg:graphics|", ":svg:g^:svg:graphics|", ":svg:image^:svg:graphics|decoding", ":svg:line^:svg:geometry|", ":svg:linearGradient^:svg:gradient|", ":svg:mpath^:svg:|", ":svg:marker^:svg:|", ":svg:mask^:svg:|", ":svg:metadata^:svg:|", ":svg:path^:svg:geometry|", ":svg:pattern^:svg:|", ":svg:polygon^:svg:geometry|", ":svg:polyline^:svg:geometry|", ":svg:radialGradient^:svg:gradient|", ":svg:rect^:svg:geometry|", ":svg:svg^:svg:graphics|#currentScale,#zoomAndPan", ":svg:script^:svg:|type", ":svg:set^:svg:animation|", ":svg:stop^:svg:|", ":svg:style^:svg:|!disabled,media,title,type", ":svg:switch^:svg:graphics|", ":svg:symbol^:svg:|", ":svg:tspan^:svg:textPositioning|", ":svg:text^:svg:textPositioning|", ":svg:textPath^:svg:textContent|", ":svg:title^:svg:|", ":svg:use^:svg:graphics|", ":svg:view^:svg:|#zoomAndPan", "data^[HTMLElement]|value", "keygen^[HTMLElement]|!autofocus,challenge,!disabled,form,keytype,name", "menuitem^[HTMLElement]|type,label,icon,!disabled,!checked,radiogroup,!default", "summary^[HTMLElement]|", "time^[HTMLElement]|dateTime", ":svg:cursor^:svg:|"];
const _ATTR_TO_PROP = /* @__PURE__ */ new Map(/* @__PURE__ */ Object.entries({
  "class": "className",
  "for": "htmlFor",
  "formaction": "formAction",
  "innerHtml": "innerHTML",
  "readonly": "readOnly",
  "tabindex": "tabIndex"
}));
const _PROP_TO_ATTR = /* @__PURE__ */ Array.from(_ATTR_TO_PROP).reduce((inverted, [propertyName, attributeName]) => {
  inverted.set(propertyName, attributeName);
  return inverted;
}, /* @__PURE__ */ new Map());
class DomElementSchemaRegistry extends ElementSchemaRegistry {
  constructor() {
    super();
    this._schema = /* @__PURE__ */ new Map();
    this._eventSchema = /* @__PURE__ */ new Map();
    SCHEMA.forEach((encodedType) => {
      const type = /* @__PURE__ */ new Map();
      const events = /* @__PURE__ */ new Set();
      const [strType, strProperties] = encodedType.split("|");
      const properties = strProperties.split(",");
      const [typeNames, superName] = strType.split("^");
      typeNames.split(",").forEach((tag) => {
        this._schema.set(tag.toLowerCase(), type);
        this._eventSchema.set(tag.toLowerCase(), events);
      });
      const superType = superName && this._schema.get(superName.toLowerCase());
      if (superType) {
        for (const [prop, value] of superType) {
          type.set(prop, value);
        }
        for (const superEvent of this._eventSchema.get(superName.toLowerCase())) {
          events.add(superEvent);
        }
      }
      properties.forEach((property) => {
        if (property.length > 0) {
          switch (property[0]) {
            case "*":
              events.add(property.substring(1));
              break;
            case "!":
              type.set(property.substring(1), BOOLEAN);
              break;
            case "#":
              type.set(property.substring(1), NUMBER);
              break;
            case "%":
              type.set(property.substring(1), OBJECT);
              break;
            default:
              type.set(property, STRING);
          }
        }
      });
    });
  }
  hasProperty(tagName, propName, schemaMetas) {
    if (schemaMetas.some((schema) => schema.name === NO_ERRORS_SCHEMA.name)) {
      return true;
    }
    if (tagName.indexOf("-") > -1) {
      if (isNgContainer(tagName) || isNgContent(tagName)) {
        return false;
      }
      if (schemaMetas.some((schema) => schema.name === CUSTOM_ELEMENTS_SCHEMA.name)) {
        return true;
      }
    }
    const elementProperties = this._schema.get(tagName.toLowerCase()) || this._schema.get("unknown");
    return elementProperties.has(propName);
  }
  hasElement(tagName, schemaMetas) {
    if (schemaMetas.some((schema) => schema.name === NO_ERRORS_SCHEMA.name)) {
      return true;
    }
    if (tagName.indexOf("-") > -1) {
      if (isNgContainer(tagName) || isNgContent(tagName)) {
        return true;
      }
      if (schemaMetas.some((schema) => schema.name === CUSTOM_ELEMENTS_SCHEMA.name)) {
        return true;
      }
    }
    return this._schema.has(tagName.toLowerCase());
  }
  /**
   * securityContext returns the security context for the given property on the given DOM tag.
   *
   * Tag and property name are statically known and cannot change at runtime, i.e. it is not
   * possible to bind a value into a changing attribute or tag name.
   *
   * The filtering is based on a list of allowed tags|attributes. All attributes in the schema
   * above are assumed to have the 'NONE' security context, i.e. that they are safe inert
   * string values. Only specific well known attack vectors are assigned their appropriate context.
   */
  securityContext(tagName, propName, isAttribute) {
    if (isAttribute) {
      propName = this.getMappedPropName(propName);
    }
    tagName = tagName.toLowerCase();
    propName = propName.toLowerCase();
    let ctx = SECURITY_SCHEMA()[tagName + "|" + propName];
    if (ctx) {
      return ctx;
    }
    ctx = SECURITY_SCHEMA()["*|" + propName];
    return ctx ? ctx : SecurityContext.NONE;
  }
  getMappedPropName(propName) {
    var _a;
    return (_a = _ATTR_TO_PROP.get(propName)) !== null && _a !== void 0 ? _a : propName;
  }
  getDefaultComponentElementName() {
    return "ng-component";
  }
  validateProperty(name) {
    if (name.toLowerCase().startsWith("on")) {
      const msg = `Binding to event property '${name}' is disallowed for security reasons, please use (${name.slice(2)})=...
If '${name}' is a directive input, make sure the directive is imported by the current module.`;
      return {
        error: true,
        msg
      };
    } else {
      return {
        error: false
      };
    }
  }
  validateAttribute(name) {
    if (name.toLowerCase().startsWith("on")) {
      const msg = `Binding to event attribute '${name}' is disallowed for security reasons, please use (${name.slice(2)})=...`;
      return {
        error: true,
        msg
      };
    } else {
      return {
        error: false
      };
    }
  }
  allKnownElementNames() {
    return Array.from(this._schema.keys());
  }
  allKnownAttributesOfElement(tagName) {
    const elementProperties = this._schema.get(tagName.toLowerCase()) || this._schema.get("unknown");
    return Array.from(elementProperties.keys()).map((prop) => {
      var _a;
      return (_a = _PROP_TO_ATTR.get(prop)) !== null && _a !== void 0 ? _a : prop;
    });
  }
  allKnownEventsOfElement(tagName) {
    var _a;
    return Array.from((_a = this._eventSchema.get(tagName.toLowerCase())) !== null && _a !== void 0 ? _a : []);
  }
  normalizeAnimationStyleProperty(propName) {
    return dashCaseToCamelCase(propName);
  }
  normalizeAnimationStyleValue(camelCaseProp, userProvidedProp, val) {
    let unit = "";
    const strVal = val.toString().trim();
    let errorMsg = null;
    if (_isPixelDimensionStyle(camelCaseProp) && val !== 0 && val !== "0") {
      if (typeof val === "number") {
        unit = "px";
      } else {
        const valAndSuffixMatch = val.match(/^[+-]?[\d\.]+([a-z]*)$/);
        if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
          errorMsg = `Please provide a CSS unit value for ${userProvidedProp}:${val}`;
        }
      }
    }
    return {
      error: errorMsg,
      value: strVal + unit
    };
  }
}
function _isPixelDimensionStyle(prop) {
  switch (prop) {
    case "width":
    case "height":
    case "minWidth":
    case "minHeight":
    case "maxWidth":
    case "maxHeight":
    case "left":
    case "top":
    case "bottom":
    case "right":
    case "fontSize":
    case "outlineWidth":
    case "outlineOffset":
    case "paddingTop":
    case "paddingLeft":
    case "paddingBottom":
    case "paddingRight":
    case "marginTop":
    case "marginLeft":
    case "marginBottom":
    case "marginRight":
    case "borderRadius":
    case "borderWidth":
    case "borderTopWidth":
    case "borderLeftWidth":
    case "borderRightWidth":
    case "borderBottomWidth":
    case "textIndent":
      return true;
    default:
      return false;
  }
}
/* @__PURE__ */ new Map([["window", Identifiers.resolveWindow], ["document", Identifiers.resolveDocument], ["body", Identifiers.resolveBody]]);
[Identifiers.pipeBind1, Identifiers.pipeBind2, Identifiers.pipeBind3, Identifiers.pipeBind4];
[Identifiers.pureFunction0, Identifiers.pureFunction1, Identifiers.pureFunction2, Identifiers.pureFunction3, Identifiers.pureFunction4, Identifiers.pureFunction5, Identifiers.pureFunction6, Identifiers.pureFunction7, Identifiers.pureFunction8];
class CompilerConfig {
  constructor({
    defaultEncapsulation = ViewEncapsulation.Emulated,
    useJit = true,
    missingTranslation = null,
    preserveWhitespaces,
    strictInjectionParameters
  } = {}) {
    this.defaultEncapsulation = defaultEncapsulation;
    this.useJit = !!useJit;
    this.missingTranslation = missingTranslation;
    this.preserveWhitespaces = preserveWhitespacesDefault(noUndefined(preserveWhitespaces));
    this.strictInjectionParameters = strictInjectionParameters === true;
  }
}
function preserveWhitespacesDefault(preserveWhitespacesOption, defaultSetting = false) {
  return preserveWhitespacesOption === null ? defaultSetting : preserveWhitespacesOption;
}
const COMPILER_PROVIDERS = [{
  provide: Compiler,
  useFactory: () => new Compiler()
}];
class JitCompilerFactory {
  /* @internal */
  constructor(defaultOptions) {
    const compilerOptions = {
      useJit: true,
      defaultEncapsulation: ViewEncapsulation$1.Emulated,
      missingTranslation: MissingTranslationStrategy.Warning
    };
    this._defaultOptions = [compilerOptions, ...defaultOptions];
  }
  createCompiler(options = []) {
    const opts = _mergeOptions(this._defaultOptions.concat(options));
    const injector = Injector.create([COMPILER_PROVIDERS, {
      provide: CompilerConfig,
      useFactory: () => {
        return new CompilerConfig({
          // let explicit values from the compiler options overwrite options
          // from the app providers
          useJit: opts.useJit,
          // let explicit values from the compiler options overwrite options
          // from the app providers
          defaultEncapsulation: opts.defaultEncapsulation,
          missingTranslation: opts.missingTranslation,
          preserveWhitespaces: opts.preserveWhitespaces
        });
      },
      deps: []
    }, opts.providers]);
    return injector.get(Compiler);
  }
}
function _mergeOptions(optionsArr) {
  return {
    useJit: _lastDefined(optionsArr.map((options) => options.useJit)),
    defaultEncapsulation: _lastDefined(optionsArr.map((options) => options.defaultEncapsulation)),
    providers: _mergeArrays(optionsArr.map((options) => options.providers)),
    missingTranslation: _lastDefined(optionsArr.map((options) => options.missingTranslation)),
    preserveWhitespaces: _lastDefined(optionsArr.map((options) => options.preserveWhitespaces))
  };
}
function _lastDefined(args) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (args[i] !== void 0) {
      return args[i];
    }
  }
  return void 0;
}
function _mergeArrays(parts) {
  const result = [];
  parts.forEach((part) => part && result.push(...part));
  return result;
}
const platformCoreDynamic = /* @__PURE__ */ createPlatformFactory(platformCore, "coreDynamic", [{
  provide: COMPILER_OPTIONS,
  useValue: {},
  multi: true
}, {
  provide: CompilerFactory,
  useClass: JitCompilerFactory,
  deps: [COMPILER_OPTIONS]
}]);
let BrowserAnimationBuilder = /* @__PURE__ */ (() => {
  let BrowserAnimationBuilder2 = /* @__PURE__ */ (() => {
    class BrowserAnimationBuilder3 extends AnimationBuilder {
      constructor(rootRenderer, doc) {
        super();
        this._nextAnimationId = 0;
        const typeData = {
          id: "0",
          encapsulation: ViewEncapsulation$1.None,
          styles: [],
          data: {
            animation: []
          }
        };
        this._renderer = rootRenderer.createRenderer(doc.body, typeData);
      }
      build(animation) {
        const id = this._nextAnimationId.toString();
        this._nextAnimationId++;
        const entry = Array.isArray(animation) ? sequence(animation) : animation;
        issueAnimationCommand(this._renderer, null, id, "register", [entry]);
        return new BrowserAnimationFactory(id, this._renderer);
      }
    }
    BrowserAnimationBuilder3.ɵfac = function BrowserAnimationBuilder_Factory(t) {
      return new (t || BrowserAnimationBuilder3)(ɵɵinject(RendererFactory2), ɵɵinject(DOCUMENT));
    };
    BrowserAnimationBuilder3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: BrowserAnimationBuilder3,
      factory: BrowserAnimationBuilder3.ɵfac
    });
    return BrowserAnimationBuilder3;
  })();
  return BrowserAnimationBuilder2;
})();
class BrowserAnimationFactory extends AnimationFactory {
  constructor(_id, _renderer) {
    super();
    this._id = _id;
    this._renderer = _renderer;
  }
  create(element, options) {
    return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
  }
}
class RendererAnimationPlayer {
  constructor(id, element, options, _renderer) {
    this.id = id;
    this.element = element;
    this._renderer = _renderer;
    this.parentPlayer = null;
    this._started = false;
    this.totalTime = 0;
    this._command("create", options);
  }
  _listen(eventName, callback) {
    return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
  }
  _command(command, ...args) {
    return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
  }
  onDone(fn) {
    this._listen("done", fn);
  }
  onStart(fn) {
    this._listen("start", fn);
  }
  onDestroy(fn) {
    this._listen("destroy", fn);
  }
  init() {
    this._command("init");
  }
  hasStarted() {
    return this._started;
  }
  play() {
    this._command("play");
    this._started = true;
  }
  pause() {
    this._command("pause");
  }
  restart() {
    this._command("restart");
  }
  finish() {
    this._command("finish");
  }
  destroy() {
    this._command("destroy");
  }
  reset() {
    this._command("reset");
    this._started = false;
  }
  setPosition(p) {
    this._command("setPosition", p);
  }
  getPosition() {
    var _a, _b;
    return (_b = (_a = this._renderer.engine.players[+this.id]) === null || _a === void 0 ? void 0 : _a.getPosition()) !== null && _b !== void 0 ? _b : 0;
  }
}
function issueAnimationCommand(renderer, element, id, command, args) {
  return renderer.setProperty(element, `@@${id}:${command}`, args);
}
const ANIMATION_PREFIX = "@";
const DISABLE_ANIMATIONS_FLAG = "@.disabled";
let AnimationRendererFactory = /* @__PURE__ */ (() => {
  let AnimationRendererFactory2 = /* @__PURE__ */ (() => {
    class AnimationRendererFactory3 {
      constructor(delegate, engine, _zone) {
        this.delegate = delegate;
        this.engine = engine;
        this._zone = _zone;
        this._currentId = 0;
        this._microtaskId = 1;
        this._animationCallbacksBuffer = [];
        this._rendererCache = /* @__PURE__ */ new Map();
        this._cdRecurDepth = 0;
        this.promise = Promise.resolve(0);
        engine.onRemovalComplete = (element, delegate2) => {
          const parentNode = delegate2 === null || delegate2 === void 0 ? void 0 : delegate2.parentNode(element);
          if (parentNode) {
            delegate2.removeChild(parentNode, element);
          }
        };
      }
      createRenderer(hostElement, type) {
        const EMPTY_NAMESPACE_ID = "";
        const delegate = this.delegate.createRenderer(hostElement, type);
        if (!hostElement || !type || !type.data || !type.data["animation"]) {
          let renderer = this._rendererCache.get(delegate);
          if (!renderer) {
            const onRendererDestroy = () => this._rendererCache.delete(delegate);
            renderer = new BaseAnimationRenderer(EMPTY_NAMESPACE_ID, delegate, this.engine, onRendererDestroy);
            this._rendererCache.set(delegate, renderer);
          }
          return renderer;
        }
        const componentId = type.id;
        const namespaceId = type.id + "-" + this._currentId;
        this._currentId++;
        this.engine.register(namespaceId, hostElement);
        const registerTrigger = (trigger) => {
          if (Array.isArray(trigger)) {
            trigger.forEach(registerTrigger);
          } else {
            this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger);
          }
        };
        const animationTriggers = type.data["animation"];
        animationTriggers.forEach(registerTrigger);
        return new AnimationRenderer(this, namespaceId, delegate, this.engine);
      }
      begin() {
        this._cdRecurDepth++;
        if (this.delegate.begin) {
          this.delegate.begin();
        }
      }
      _scheduleCountTask() {
        this.promise.then(() => {
          this._microtaskId++;
        });
      }
      /** @internal */
      scheduleListenerCallback(count, fn, data) {
        if (count >= 0 && count < this._microtaskId) {
          this._zone.run(() => fn(data));
          return;
        }
        if (this._animationCallbacksBuffer.length == 0) {
          Promise.resolve(null).then(() => {
            this._zone.run(() => {
              this._animationCallbacksBuffer.forEach((tuple) => {
                const [fn2, data2] = tuple;
                fn2(data2);
              });
              this._animationCallbacksBuffer = [];
            });
          });
        }
        this._animationCallbacksBuffer.push([fn, data]);
      }
      end() {
        this._cdRecurDepth--;
        if (this._cdRecurDepth == 0) {
          this._zone.runOutsideAngular(() => {
            this._scheduleCountTask();
            this.engine.flush(this._microtaskId);
          });
        }
        if (this.delegate.end) {
          this.delegate.end();
        }
      }
      whenRenderingDone() {
        return this.engine.whenRenderingDone();
      }
    }
    AnimationRendererFactory3.ɵfac = function AnimationRendererFactory_Factory(t) {
      return new (t || AnimationRendererFactory3)(ɵɵinject(RendererFactory2), ɵɵinject(AnimationEngine), ɵɵinject(NgZone));
    };
    AnimationRendererFactory3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: AnimationRendererFactory3,
      factory: AnimationRendererFactory3.ɵfac
    });
    return AnimationRendererFactory3;
  })();
  return AnimationRendererFactory2;
})();
class BaseAnimationRenderer {
  constructor(namespaceId, delegate, engine, _onDestroy) {
    this.namespaceId = namespaceId;
    this.delegate = delegate;
    this.engine = engine;
    this._onDestroy = _onDestroy;
    this.destroyNode = this.delegate.destroyNode ? (n) => delegate.destroyNode(n) : null;
  }
  get data() {
    return this.delegate.data;
  }
  destroy() {
    var _a;
    this.engine.destroy(this.namespaceId, this.delegate);
    this.delegate.destroy();
    (_a = this._onDestroy) === null || _a === void 0 ? void 0 : _a.call(this);
  }
  createElement(name, namespace) {
    return this.delegate.createElement(name, namespace);
  }
  createComment(value) {
    return this.delegate.createComment(value);
  }
  createText(value) {
    return this.delegate.createText(value);
  }
  appendChild(parent, newChild) {
    this.delegate.appendChild(parent, newChild);
    this.engine.onInsert(this.namespaceId, newChild, parent, false);
  }
  insertBefore(parent, newChild, refChild, isMove = true) {
    this.delegate.insertBefore(parent, newChild, refChild);
    this.engine.onInsert(this.namespaceId, newChild, parent, isMove);
  }
  removeChild(parent, oldChild, isHostElement) {
    this.engine.onRemove(this.namespaceId, oldChild, this.delegate, isHostElement);
  }
  selectRootElement(selectorOrNode, preserveContent) {
    return this.delegate.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node) {
    return this.delegate.parentNode(node);
  }
  nextSibling(node) {
    return this.delegate.nextSibling(node);
  }
  setAttribute(el, name, value, namespace) {
    this.delegate.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el, name, namespace) {
    this.delegate.removeAttribute(el, name, namespace);
  }
  addClass(el, name) {
    this.delegate.addClass(el, name);
  }
  removeClass(el, name) {
    this.delegate.removeClass(el, name);
  }
  setStyle(el, style2, value, flags) {
    this.delegate.setStyle(el, style2, value, flags);
  }
  removeStyle(el, style2, flags) {
    this.delegate.removeStyle(el, style2, flags);
  }
  setProperty(el, name, value) {
    if (name.charAt(0) == ANIMATION_PREFIX && name == DISABLE_ANIMATIONS_FLAG) {
      this.disableAnimations(el, !!value);
    } else {
      this.delegate.setProperty(el, name, value);
    }
  }
  setValue(node, value) {
    this.delegate.setValue(node, value);
  }
  listen(target, eventName, callback) {
    return this.delegate.listen(target, eventName, callback);
  }
  disableAnimations(element, value) {
    this.engine.disableAnimations(element, value);
  }
}
class AnimationRenderer extends BaseAnimationRenderer {
  constructor(factory, namespaceId, delegate, engine, onDestroy) {
    super(namespaceId, delegate, engine, onDestroy);
    this.factory = factory;
    this.namespaceId = namespaceId;
  }
  setProperty(el, name, value) {
    if (name.charAt(0) == ANIMATION_PREFIX) {
      if (name.charAt(1) == "." && name == DISABLE_ANIMATIONS_FLAG) {
        value = value === void 0 ? true : !!value;
        this.disableAnimations(el, value);
      } else {
        this.engine.process(this.namespaceId, el, name.slice(1), value);
      }
    } else {
      this.delegate.setProperty(el, name, value);
    }
  }
  listen(target, eventName, callback) {
    if (eventName.charAt(0) == ANIMATION_PREFIX) {
      const element = resolveElementFromTarget(target);
      let name = eventName.slice(1);
      let phase = "";
      if (name.charAt(0) != ANIMATION_PREFIX) {
        [name, phase] = parseTriggerCallbackName(name);
      }
      return this.engine.listen(this.namespaceId, element, name, phase, (event) => {
        const countId = event["_data"] || -1;
        this.factory.scheduleListenerCallback(countId, callback, event);
      });
    }
    return this.delegate.listen(target, eventName, callback);
  }
}
function resolveElementFromTarget(target) {
  switch (target) {
    case "body":
      return document.body;
    case "document":
      return document;
    case "window":
      return window;
    default:
      return target;
  }
}
function parseTriggerCallbackName(triggerName) {
  const dotIndex = triggerName.indexOf(".");
  const trigger = triggerName.substring(0, dotIndex);
  const phase = triggerName.slice(dotIndex + 1);
  return [trigger, phase];
}
let InjectableAnimationEngine = /* @__PURE__ */ (() => {
  let InjectableAnimationEngine2 = /* @__PURE__ */ (() => {
    class InjectableAnimationEngine3 extends AnimationEngine {
      // The `ApplicationRef` is injected here explicitly to force the dependency ordering.
      // Since the `ApplicationRef` should be created earlier before the `AnimationEngine`, they
      // both have `ngOnDestroy` hooks and `flush()` must be called after all views are destroyed.
      constructor(doc, driver, normalizer, appRef) {
        super(doc.body, driver, normalizer);
      }
      ngOnDestroy() {
        this.flush();
      }
    }
    InjectableAnimationEngine3.ɵfac = function InjectableAnimationEngine_Factory(t) {
      return new (t || InjectableAnimationEngine3)(ɵɵinject(DOCUMENT), ɵɵinject(AnimationDriver), ɵɵinject(AnimationStyleNormalizer), ɵɵinject(ApplicationRef));
    };
    InjectableAnimationEngine3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: InjectableAnimationEngine3,
      factory: InjectableAnimationEngine3.ɵfac
    });
    return InjectableAnimationEngine3;
  })();
  return InjectableAnimationEngine2;
})();
function instantiateDefaultStyleNormalizer() {
  return new WebAnimationsStyleNormalizer();
}
function instantiateRendererFactory(renderer, engine, zone) {
  return new AnimationRendererFactory(renderer, engine, zone);
}
const SHARED_ANIMATION_PROVIDERS = [{
  provide: AnimationBuilder,
  useClass: BrowserAnimationBuilder
}, {
  provide: AnimationStyleNormalizer,
  useFactory: instantiateDefaultStyleNormalizer
}, {
  provide: AnimationEngine,
  useClass: InjectableAnimationEngine
}, {
  provide: RendererFactory2,
  useFactory: instantiateRendererFactory,
  deps: [DomRendererFactory2, AnimationEngine, NgZone]
}];
const BROWSER_NOOP_ANIMATIONS_PROVIDERS = [{
  provide: AnimationDriver,
  useClass: NoopAnimationDriver
}, {
  provide: ANIMATION_MODULE_TYPE,
  useValue: "NoopAnimations"
}, ...SHARED_ANIMATION_PROVIDERS];
let NoopAnimationsModule = /* @__PURE__ */ (() => {
  let NoopAnimationsModule2 = /* @__PURE__ */ (() => {
    class NoopAnimationsModule3 {
    }
    NoopAnimationsModule3.ɵfac = function NoopAnimationsModule_Factory(t) {
      return new (t || NoopAnimationsModule3)();
    };
    NoopAnimationsModule3.ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
      type: NoopAnimationsModule3
    });
    NoopAnimationsModule3.ɵinj = /* @__PURE__ */ ɵɵdefineInjector({
      providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
      imports: [BrowserModule]
    });
    return NoopAnimationsModule3;
  })();
  return NoopAnimationsModule2;
})();
function setDomTypes() {
  Object.assign(global, domino.impl);
  global["KeyboardEvent"] = domino.impl.Event;
}
function parseDocument(html, url2 = "/") {
  let window2 = domino.createWindow(html, url2);
  let doc = window2.document;
  return doc;
}
function serializeDocument(doc) {
  return doc.serialize();
}
class DominoAdapter extends BrowserDomAdapter {
  constructor() {
    super(...arguments);
    this.supportsDOMEvents = false;
  }
  static makeCurrent() {
    setDomTypes();
    setRootDomAdapter(new DominoAdapter());
  }
  createHtmlDocument() {
    return parseDocument("<html><head><title>fakeTitle</title></head><body></body></html>");
  }
  getDefaultDocument() {
    if (!DominoAdapter.defaultDoc) {
      DominoAdapter.defaultDoc = domino.createDocument();
    }
    return DominoAdapter.defaultDoc;
  }
  isElementNode(node) {
    return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
  }
  isShadowRoot(node) {
    return node.shadowRoot == node;
  }
  /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
  getGlobalEventTarget(doc, target) {
    if (target === "window") {
      return doc.defaultView;
    }
    if (target === "document") {
      return doc;
    }
    if (target === "body") {
      return doc.body;
    }
    return null;
  }
  getBaseHref(doc) {
    var _a;
    return ((_a = doc.documentElement.querySelector("base")) === null || _a === void 0 ? void 0 : _a.getAttribute("href")) || "";
  }
  dispatchEvent(el, evt) {
    el.dispatchEvent(evt);
    const doc = el.ownerDocument || el;
    const win = doc.defaultView;
    if (win) {
      win.dispatchEvent(evt);
    }
  }
  getUserAgent() {
    return "Fake user agent";
  }
  getCookie(name) {
    throw new Error("getCookie has not been implemented");
  }
}
let PlatformState = /* @__PURE__ */ (() => {
  let PlatformState2 = /* @__PURE__ */ (() => {
    class PlatformState3 {
      constructor(_doc) {
        this._doc = _doc;
      }
      /**
       * Renders the current state of the platform to string.
       */
      renderToString() {
        return serializeDocument(this._doc);
      }
      /**
       * Returns the current DOM state.
       */
      getDocument() {
        return this._doc;
      }
    }
    PlatformState3.ɵfac = function PlatformState_Factory(t) {
      return new (t || PlatformState3)(ɵɵinject(DOCUMENT));
    };
    PlatformState3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: PlatformState3,
      factory: PlatformState3.ɵfac
    });
    return PlatformState3;
  })();
  return PlatformState2;
})();
const INITIAL_CONFIG = /* @__PURE__ */ new InjectionToken("Server.INITIAL_CONFIG");
const BEFORE_APP_SERIALIZED = /* @__PURE__ */ new InjectionToken("Server.RENDER_MODULE_HOOK");
const isAbsoluteUrl = /^[a-zA-Z\-\+.]+:\/\//;
let ServerXhr = /* @__PURE__ */ (() => {
  let ServerXhr2 = /* @__PURE__ */ (() => {
    class ServerXhr3 {
      build() {
        return new xhr2.default.default.XMLHttpRequest();
      }
    }
    ServerXhr3.ɵfac = function ServerXhr_Factory(t) {
      return new (t || ServerXhr3)();
    };
    ServerXhr3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: ServerXhr3,
      factory: ServerXhr3.ɵfac
    });
    return ServerXhr3;
  })();
  return ServerXhr2;
})();
class ZoneMacroTaskWrapper {
  wrap(request) {
    return new Observable((observer) => {
      let task = null;
      let scheduled = false;
      let sub = null;
      let savedResult = null;
      let savedError = null;
      const scheduleTask = (_task2) => {
        task = _task2;
        scheduled = true;
        const delegate = this.delegate(request);
        sub = delegate.subscribe((res) => savedResult = res, (err) => {
          if (!scheduled) {
            throw new Error("An http observable was completed twice. This shouldn't happen, please file a bug.");
          }
          savedError = err;
          scheduled = false;
          task.invoke();
        }, () => {
          if (!scheduled) {
            throw new Error("An http observable was completed twice. This shouldn't happen, please file a bug.");
          }
          scheduled = false;
          task.invoke();
        });
      };
      const cancelTask = (_task2) => {
        if (!scheduled) {
          return;
        }
        scheduled = false;
        if (sub) {
          sub.unsubscribe();
          sub = null;
        }
      };
      const onComplete = () => {
        if (savedError !== null) {
          observer.error(savedError);
        } else {
          observer.next(savedResult);
          observer.complete();
        }
      };
      const _task = Zone.current.scheduleMacroTask("ZoneMacroTaskWrapper.subscribe", onComplete, {}, () => null, cancelTask);
      scheduleTask(_task);
      return () => {
        if (scheduled && task) {
          task.zone.cancelTask(task);
          scheduled = false;
        }
        if (sub) {
          sub.unsubscribe();
          sub = null;
        }
      };
    });
  }
}
class ZoneClientBackend extends ZoneMacroTaskWrapper {
  constructor(backend, platformLocation, config) {
    super();
    this.backend = backend;
    this.platformLocation = platformLocation;
    this.config = config;
  }
  handle(request) {
    const {
      href,
      protocol,
      hostname,
      port
    } = this.platformLocation;
    if (this.config.useAbsoluteUrl && !isAbsoluteUrl.test(request.url) && isAbsoluteUrl.test(href)) {
      const baseHref = this.platformLocation.getBaseHrefFromDOM() || href;
      const urlPrefix = `${protocol}//${hostname}` + (port ? `:${port}` : "");
      const baseUrl = new URL(baseHref, urlPrefix);
      const url2 = new URL(request.url, baseUrl);
      return this.wrap(request.clone({
        url: url2.toString()
      }));
    }
    return this.wrap(request);
  }
  delegate(request) {
    return this.backend.handle(request);
  }
}
function zoneWrappedInterceptorHandler(platformLocation, config) {
  return new ZoneClientBackend(new HttpInterceptorHandler(inject(HttpBackend), inject(EnvironmentInjector)), platformLocation, config);
}
const SERVER_HTTP_PROVIDERS = [{
  provide: XhrFactory,
  useClass: ServerXhr
}, {
  provide: HttpHandler,
  useFactory: zoneWrappedInterceptorHandler,
  deps: [PlatformLocation, INITIAL_CONFIG]
}];
function parseUrl(urlStr) {
  const parsedUrl = url.parse(urlStr);
  return {
    hostname: parsedUrl.hostname || "",
    protocol: parsedUrl.protocol || "",
    port: parsedUrl.port || "",
    pathname: parsedUrl.pathname || "",
    search: parsedUrl.search || "",
    hash: parsedUrl.hash || ""
  };
}
let ServerPlatformLocation = /* @__PURE__ */ (() => {
  let ServerPlatformLocation2 = /* @__PURE__ */ (() => {
    class ServerPlatformLocation3 {
      constructor(_doc, _config) {
        this._doc = _doc;
        this.href = "/";
        this.hostname = "/";
        this.protocol = "/";
        this.port = "/";
        this.pathname = "/";
        this.search = "";
        this.hash = "";
        this._hashUpdate = new Subject();
        const config = _config;
        if (!config) {
          return;
        }
        if (config.url) {
          const url2 = parseUrl(config.url);
          this.protocol = url2.protocol;
          this.hostname = url2.hostname;
          this.port = url2.port;
          this.pathname = url2.pathname;
          this.search = url2.search;
          this.hash = url2.hash;
          this.href = _doc.location.href;
        }
        if (config.useAbsoluteUrl) {
          if (!config.baseUrl) {
            throw new Error(`"PlatformConfig.baseUrl" must be set if "useAbsoluteUrl" is true`);
          }
          const url2 = parseUrl(config.baseUrl);
          this.protocol = url2.protocol;
          this.hostname = url2.hostname;
          this.port = url2.port;
        }
      }
      getBaseHrefFromDOM() {
        return getDOM().getBaseHref(this._doc);
      }
      onPopState(fn) {
        return () => {
        };
      }
      onHashChange(fn) {
        const subscription = this._hashUpdate.subscribe(fn);
        return () => subscription.unsubscribe();
      }
      get url() {
        return `${this.pathname}${this.search}${this.hash}`;
      }
      setHash(value, oldUrl) {
        if (this.hash === value) {
          return;
        }
        this.hash = value;
        const newUrl = this.url;
        scheduleMicroTask(() => this._hashUpdate.next({
          type: "hashchange",
          state: null,
          oldUrl,
          newUrl
        }));
      }
      replaceState(state, title, newUrl) {
        const oldUrl = this.url;
        const parsedUrl = parseUrl(newUrl);
        this.pathname = parsedUrl.pathname;
        this.search = parsedUrl.search;
        this.setHash(parsedUrl.hash, oldUrl);
      }
      pushState(state, title, newUrl) {
        this.replaceState(state, title, newUrl);
      }
      forward() {
        throw new Error("Not implemented");
      }
      back() {
        throw new Error("Not implemented");
      }
      // History API isn't available on server, therefore return undefined
      getState() {
        return void 0;
      }
    }
    ServerPlatformLocation3.ɵfac = function ServerPlatformLocation_Factory(t) {
      return new (t || ServerPlatformLocation3)(ɵɵinject(DOCUMENT), ɵɵinject(INITIAL_CONFIG, 8));
    };
    ServerPlatformLocation3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: ServerPlatformLocation3,
      factory: ServerPlatformLocation3.ɵfac
    });
    return ServerPlatformLocation3;
  })();
  return ServerPlatformLocation2;
})();
function scheduleMicroTask(fn) {
  Zone.current.scheduleMicroTask("scheduleMicrotask", fn);
}
let ServerEventManagerPlugin = /* @__PURE__ */ (() => {
  let ServerEventManagerPlugin2 = /* @__PURE__ */ (() => {
    class ServerEventManagerPlugin3 {
      constructor(doc) {
        this.doc = doc;
      }
      // Handle all events on the server.
      supports(eventName) {
        return true;
      }
      addEventListener(element, eventName, handler) {
        return getDOM().onAndCancel(element, eventName, handler);
      }
      /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
      addGlobalEventListener(element, eventName, handler) {
        const target = getDOM().getGlobalEventTarget(this.doc, element);
        if (!target) {
          throw new Error(`Unsupported event target ${target} for event ${eventName}`);
        }
        return this.addEventListener(target, eventName, handler);
      }
    }
    ServerEventManagerPlugin3.ɵfac = function ServerEventManagerPlugin_Factory(t) {
      return new (t || ServerEventManagerPlugin3)(ɵɵinject(DOCUMENT));
    };
    ServerEventManagerPlugin3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: ServerEventManagerPlugin3,
      factory: ServerEventManagerPlugin3.ɵfac
    });
    return ServerEventManagerPlugin3;
  })();
  return ServerEventManagerPlugin2;
})();
const EMPTY_ARRAY = [];
const DEFAULT_SCHEMA = /* @__PURE__ */ new DomElementSchemaRegistry();
let ServerRendererFactory2 = /* @__PURE__ */ (() => {
  let ServerRendererFactory22 = /* @__PURE__ */ (() => {
    class ServerRendererFactory23 {
      constructor(eventManager, ngZone, document2, sharedStylesHost) {
        this.eventManager = eventManager;
        this.ngZone = ngZone;
        this.document = document2;
        this.sharedStylesHost = sharedStylesHost;
        this.rendererByCompId = /* @__PURE__ */ new Map();
        this.schema = DEFAULT_SCHEMA;
        this.defaultRenderer = new DefaultServerRenderer2(eventManager, document2, ngZone, this.schema);
      }
      createRenderer(element, type) {
        if (!element || !type) {
          return this.defaultRenderer;
        }
        switch (type.encapsulation) {
          case ViewEncapsulation$1.Emulated: {
            let renderer = this.rendererByCompId.get(type.id);
            if (!renderer) {
              renderer = new EmulatedEncapsulationServerRenderer2(this.eventManager, this.document, this.ngZone, this.sharedStylesHost, this.schema, type);
              this.rendererByCompId.set(type.id, renderer);
            }
            renderer.applyToHost(element);
            return renderer;
          }
          default: {
            if (!this.rendererByCompId.has(type.id)) {
              const styles = flattenStyles$1(type.id, type.styles);
              this.sharedStylesHost.addStyles(styles);
              this.rendererByCompId.set(type.id, this.defaultRenderer);
            }
            return this.defaultRenderer;
          }
        }
      }
      begin() {
      }
      end() {
      }
    }
    ServerRendererFactory23.ɵfac = function ServerRendererFactory2_Factory(t) {
      return new (t || ServerRendererFactory23)(ɵɵinject(EventManager), ɵɵinject(NgZone), ɵɵinject(DOCUMENT), ɵɵinject(SharedStylesHost));
    };
    ServerRendererFactory23.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: ServerRendererFactory23,
      factory: ServerRendererFactory23.ɵfac
    });
    return ServerRendererFactory23;
  })();
  return ServerRendererFactory22;
})();
class DefaultServerRenderer2 {
  constructor(eventManager, document2, ngZone, schema) {
    this.eventManager = eventManager;
    this.document = document2;
    this.ngZone = ngZone;
    this.schema = schema;
    this.data = /* @__PURE__ */ Object.create(null);
    this.destroyNode = null;
  }
  destroy() {
  }
  createElement(name, namespace) {
    if (namespace) {
      const doc = this.document || getDOM().getDefaultDocument();
      return doc.createElementNS(NAMESPACE_URIS[namespace], name);
    }
    return getDOM().createElement(name, this.document);
  }
  createComment(value) {
    return getDOM().getDefaultDocument().createComment(value);
  }
  createText(value) {
    const doc = getDOM().getDefaultDocument();
    return doc.createTextNode(value);
  }
  appendChild(parent, newChild) {
    const targetParent = isTemplateNode(parent) ? parent.content : parent;
    targetParent.appendChild(newChild);
  }
  insertBefore(parent, newChild, refChild) {
    if (parent) {
      const targetParent = isTemplateNode(parent) ? parent.content : parent;
      targetParent.insertBefore(newChild, refChild);
    }
  }
  removeChild(parent, oldChild) {
    if (parent) {
      parent.removeChild(oldChild);
    }
  }
  selectRootElement(selectorOrNode, preserveContent) {
    const el = typeof selectorOrNode === "string" ? this.document.querySelector(selectorOrNode) : selectorOrNode;
    if (!el) {
      throw new Error(`The selector "${selectorOrNode}" did not match any elements`);
    }
    if (!preserveContent) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }
    return el;
  }
  parentNode(node) {
    return node.parentNode;
  }
  nextSibling(node) {
    return node.nextSibling;
  }
  setAttribute(el, name, value, namespace) {
    if (namespace) {
      el.setAttributeNS(NAMESPACE_URIS[namespace], namespace + ":" + name, value);
    } else {
      el.setAttribute(name, value);
    }
  }
  removeAttribute(el, name, namespace) {
    if (namespace) {
      el.removeAttributeNS(NAMESPACE_URIS[namespace], name);
    } else {
      el.removeAttribute(name);
    }
  }
  addClass(el, name) {
    el.classList.add(name);
  }
  removeClass(el, name) {
    el.classList.remove(name);
  }
  setStyle(el, style2, value, flags) {
    style2 = style2.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    value = value == null ? "" : `${value}`.trim();
    const styleMap = _readStyleAttribute(el);
    if (flags & RendererStyleFlags2.Important) {
      value += " !important";
    }
    styleMap[style2] = value;
    _writeStyleAttribute(el, styleMap);
  }
  removeStyle(el, style2, flags) {
    this.setStyle(el, style2, "", flags);
  }
  // The value was validated already as a property binding, against the property name.
  // To know this value is safe to use as an attribute, the security context of the
  // attribute with the given name is checked against that security context of the
  // property.
  _isSafeToReflectProperty(tagName, propertyName) {
    return this.schema.securityContext(tagName, propertyName, true) === this.schema.securityContext(tagName, propertyName, false);
  }
  setProperty(el, name, value) {
    checkNoSyntheticProp(name, "property");
    if (name === "innerText") {
      el.textContent = value;
    }
    el[name] = value;
    const tagName = el.tagName.toLowerCase();
    if (value != null && (typeof value === "number" || typeof value == "string") && name.toLowerCase() !== "innerhtml" && this.schema.hasElement(tagName, EMPTY_ARRAY) && this.schema.hasProperty(tagName, name, EMPTY_ARRAY) && this._isSafeToReflectProperty(tagName, name)) {
      this.setAttribute(el, name, value.toString());
    }
  }
  setValue(node, value) {
    node.textContent = value;
  }
  listen(target, eventName, callback) {
    checkNoSyntheticProp(eventName, "listener");
    if (typeof target === "string") {
      return this.eventManager.addGlobalEventListener(target, eventName, this.decoratePreventDefault(callback));
    }
    return this.eventManager.addEventListener(target, eventName, this.decoratePreventDefault(callback));
  }
  decoratePreventDefault(eventHandler) {
    return (event) => {
      if (event === Function) {
        return eventHandler;
      }
      const allowDefaultBehavior = this.ngZone.runGuarded(() => eventHandler(event));
      if (allowDefaultBehavior === false) {
        event.preventDefault();
        event.returnValue = false;
      }
      return void 0;
    };
  }
}
const AT_CHARCODE = /* @__PURE__ */ "@".charCodeAt(0);
function checkNoSyntheticProp(name, nameKind) {
  if (name.charCodeAt(0) === AT_CHARCODE) {
    throw new Error(`Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Either \`BrowserAnimationsModule\` or \`NoopAnimationsModule\` are imported in your application.
  - There is corresponding configuration for the animation named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.io/api/core/Component#animations).`);
  }
}
function isTemplateNode(node) {
  return node.tagName === "TEMPLATE" && node.content !== void 0;
}
class EmulatedEncapsulationServerRenderer2 extends DefaultServerRenderer2 {
  constructor(eventManager, document2, ngZone, sharedStylesHost, schema, component) {
    super(eventManager, document2, ngZone, schema);
    this.component = component;
    const componentId = "s" + component.id;
    const styles = flattenStyles$1(componentId, component.styles);
    sharedStylesHost.addStyles(styles);
    this.contentAttr = shimContentAttribute(componentId);
    this.hostAttr = shimHostAttribute(componentId);
  }
  applyToHost(element) {
    super.setAttribute(element, this.hostAttr, "");
  }
  createElement(parent, name) {
    const el = super.createElement(parent, name);
    super.setAttribute(el, this.contentAttr, "");
    return el;
  }
}
function _readStyleAttribute(element) {
  const styleMap = {};
  const styleAttribute = element.getAttribute("style");
  if (styleAttribute) {
    const styleList = styleAttribute.split(/;+/g);
    for (let i = 0; i < styleList.length; i++) {
      const style2 = styleList[i].trim();
      if (style2.length > 0) {
        const colonIndex = style2.indexOf(":");
        if (colonIndex === -1) {
          throw new Error(`Invalid CSS style: ${style2}`);
        }
        const name = style2.slice(0, colonIndex).trim();
        styleMap[name] = style2.slice(colonIndex + 1).trim();
      }
    }
  }
  return styleMap;
}
function _writeStyleAttribute(element, styleMap) {
  let styleAttrValue = "";
  for (const key in styleMap) {
    const newValue = styleMap[key];
    if (newValue != null && newValue !== "") {
      styleAttrValue += key + ":" + newValue + ";";
    }
  }
  if (styleAttrValue) {
    element.setAttribute("style", styleAttrValue);
  } else {
    element.removeAttribute("style");
  }
}
let ServerStylesHost = /* @__PURE__ */ (() => {
  let ServerStylesHost2 = /* @__PURE__ */ (() => {
    class ServerStylesHost3 extends SharedStylesHost {
      constructor(doc, transitionId) {
        super();
        this.doc = doc;
        this.transitionId = transitionId;
        this.head = null;
        this._styleNodes = /* @__PURE__ */ new Set();
        this.head = doc.getElementsByTagName("head")[0];
      }
      _addStyle(style2) {
        let adapter = getDOM();
        const el = adapter.createElement("style");
        el.textContent = style2;
        if (!!this.transitionId) {
          el.setAttribute("ng-transition", this.transitionId);
        }
        this.head.appendChild(el);
        this._styleNodes.add(el);
      }
      onStylesAdded(additions) {
        additions.forEach((style2) => this._addStyle(style2));
      }
      ngOnDestroy() {
        this._styleNodes.forEach((styleNode) => styleNode.remove());
      }
    }
    ServerStylesHost3.ɵfac = function ServerStylesHost_Factory(t) {
      return new (t || ServerStylesHost3)(ɵɵinject(DOCUMENT), ɵɵinject(TRANSITION_ID, 8));
    };
    ServerStylesHost3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: ServerStylesHost3,
      factory: ServerStylesHost3.ɵfac
    });
    return ServerStylesHost3;
  })();
  return ServerStylesHost2;
})();
const TRANSFER_STATE_SERIALIZATION_PROVIDERS = [{
  provide: BEFORE_APP_SERIALIZED,
  useFactory: serializeTransferStateFactory,
  deps: [DOCUMENT, APP_ID, TransferState],
  multi: true
}];
function serializeTransferStateFactory(doc, appId, transferStore) {
  return () => {
    const content = transferStore.toJson();
    if (transferStore.isEmpty) {
      return;
    }
    const script = doc.createElement("script");
    script.id = appId + "-state";
    script.setAttribute("type", "application/json");
    script.textContent = escapeHtml(content);
    const existingScript = doc.body.querySelector("script");
    if (existingScript) {
      existingScript.before(script);
    } else {
      doc.body.appendChild(script);
    }
  };
}
const INTERNAL_SERVER_PLATFORM_PROVIDERS = [
  {
    provide: DOCUMENT,
    useFactory: _document,
    deps: [Injector]
  },
  {
    provide: PLATFORM_ID,
    useValue: PLATFORM_SERVER_ID
  },
  {
    provide: PLATFORM_INITIALIZER,
    useFactory: initDominoAdapter,
    multi: true
  },
  {
    provide: PlatformLocation,
    useClass: ServerPlatformLocation,
    deps: [DOCUMENT, [Optional, INITIAL_CONFIG]]
  },
  {
    provide: PlatformState,
    deps: [DOCUMENT]
  },
  // Add special provider that allows multiple instances of platformServer* to be created.
  {
    provide: ALLOW_MULTIPLE_PLATFORMS,
    useValue: true
  }
];
function initDominoAdapter() {
  return () => {
    DominoAdapter.makeCurrent();
  };
}
function instantiateServerRendererFactory(renderer, engine, zone) {
  return new AnimationRendererFactory(renderer, engine, zone);
}
const SERVER_RENDER_PROVIDERS = [ServerRendererFactory2, {
  provide: RendererFactory2,
  useFactory: instantiateServerRendererFactory,
  deps: [ServerRendererFactory2, AnimationEngine, NgZone]
}, ServerStylesHost, {
  provide: SharedStylesHost,
  useExisting: ServerStylesHost
}, {
  provide: EVENT_MANAGER_PLUGINS,
  multi: true,
  useClass: ServerEventManagerPlugin
}];
let ServerModule = /* @__PURE__ */ (() => {
  let ServerModule2 = /* @__PURE__ */ (() => {
    class ServerModule3 {
    }
    ServerModule3.ɵfac = function ServerModule_Factory(t) {
      return new (t || ServerModule3)();
    };
    ServerModule3.ɵmod = /* @__PURE__ */ ɵɵdefineNgModule({
      type: ServerModule3
    });
    ServerModule3.ɵinj = /* @__PURE__ */ ɵɵdefineInjector({
      providers: [TRANSFER_STATE_SERIALIZATION_PROVIDERS, SERVER_RENDER_PROVIDERS, SERVER_HTTP_PROVIDERS, {
        provide: Testability,
        useValue: null
      }, {
        provide: TESTABILITY,
        useValue: null
      }, {
        provide: ViewportScroller,
        useClass: NullViewportScroller
      }],
      imports: [HttpClientModule, NoopAnimationsModule, BrowserModule]
    });
    return ServerModule3;
  })();
  return ServerModule2;
})();
function _document(injector) {
  const config = injector.get(INITIAL_CONFIG, null);
  let document2;
  if (config && config.document) {
    document2 = typeof config.document === "string" ? parseDocument(config.document, config.url) : config.document;
  } else {
    document2 = getDOM().createHtmlDocument();
  }
  setDocument(document2);
  return document2;
}
const platformDynamicServer = /* @__PURE__ */ createPlatformFactory(platformCoreDynamic, "serverDynamic", INTERNAL_SERVER_PLATFORM_PROVIDERS);
function _getPlatform(platformFactory, options) {
  var _a;
  const extraProviders = (_a = options.platformProviders) !== null && _a !== void 0 ? _a : [];
  return platformFactory([{
    provide: INITIAL_CONFIG,
    useValue: {
      document: options.document,
      url: options.url
    }
  }, extraProviders]);
}
function appendServerContextInfo(serverContext, applicationRef) {
  applicationRef.components.forEach((componentRef) => {
    const renderer = componentRef.injector.get(Renderer2);
    const element = componentRef.location.nativeElement;
    if (element) {
      renderer.setAttribute(element, "ng-server-context", serverContext);
    }
  });
}
function _render$1(platform, bootstrapPromise) {
  return bootstrapPromise.then((moduleOrApplicationRef) => {
    const environmentInjector = moduleOrApplicationRef.injector;
    const transitionId = environmentInjector.get(TRANSITION_ID, null);
    if (!transitionId) {
      throw new Error(`renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure
the server-rendered app can be properly bootstrapped into a client app.`);
    }
    const applicationRef = moduleOrApplicationRef instanceof ApplicationRef ? moduleOrApplicationRef : environmentInjector.get(ApplicationRef);
    const serverContext = sanitizeServerContext(environmentInjector.get(SERVER_CONTEXT, DEFAULT_SERVER_CONTEXT));
    return applicationRef.isStable.pipe(first((isStable) => isStable)).toPromise().then(() => {
      appendServerContextInfo(serverContext, applicationRef);
      const platformState = platform.injector.get(PlatformState);
      const asyncPromises = [];
      const callbacks = environmentInjector.get(BEFORE_APP_SERIALIZED, null);
      if (callbacks) {
        for (const callback of callbacks) {
          try {
            const callbackResult = callback();
            if (isPromise(callbackResult)) {
              asyncPromises.push(callbackResult);
            }
          } catch (e) {
            console.warn("Ignoring BEFORE_APP_SERIALIZED Exception: ", e);
          }
        }
      }
      const complete = () => {
        const output = platformState.renderToString();
        platform.destroy();
        return output;
      };
      if (asyncPromises.length === 0) {
        return complete();
      }
      return Promise.all(asyncPromises.map((asyncPromise) => {
        return asyncPromise.catch((e) => {
          console.warn("Ignoring BEFORE_APP_SERIALIZED Exception: ", e);
        });
      })).then(complete);
    });
  });
}
const DEFAULT_SERVER_CONTEXT = "other";
const SERVER_CONTEXT = /* @__PURE__ */ new InjectionToken("SERVER_CONTEXT");
function sanitizeServerContext(serverContext) {
  const context = serverContext.replace(/[^a-zA-Z0-9\-]/g, "");
  return context.length > 0 ? context : DEFAULT_SERVER_CONTEXT;
}
function renderApplication(rootComponent, options) {
  var _a;
  const {
    document: document2,
    url: url2,
    platformProviders,
    appId
  } = options;
  const platform = _getPlatform(platformDynamicServer, {
    document: document2,
    url: url2,
    platformProviders
  });
  const appProviders = [importProvidersFrom(BrowserModule.withServerTransition({
    appId
  })), importProvidersFrom(ServerModule), ...TRANSFER_STATE_SERIALIZATION_PROVIDERS, ...(_a = options.providers) !== null && _a !== void 0 ? _a : []];
  return _render$1(platform, internalCreateApplication({
    rootComponent,
    appProviders
  }));
}
const PRIMARY_OUTLET = "primary";
const RouteTitleKey = /* @__PURE__ */ Symbol("RouteTitle");
class ParamsAsMap {
  constructor(params) {
    this.params = params || {};
  }
  has(name) {
    return Object.prototype.hasOwnProperty.call(this.params, name);
  }
  get(name) {
    if (this.has(name)) {
      const v = this.params[name];
      return Array.isArray(v) ? v[0] : v;
    }
    return null;
  }
  getAll(name) {
    if (this.has(name)) {
      const v = this.params[name];
      return Array.isArray(v) ? v : [v];
    }
    return [];
  }
  get keys() {
    return Object.keys(this.params);
  }
}
function convertToParamMap(params) {
  return new ParamsAsMap(params);
}
function defaultUrlMatcher(segments, segmentGroup, route) {
  const parts = route.path.split("/");
  if (parts.length > segments.length) {
    return null;
  }
  if (route.pathMatch === "full" && (segmentGroup.hasChildren() || parts.length < segments.length)) {
    return null;
  }
  const posParams = {};
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    const segment = segments[index];
    const isParameter = part.startsWith(":");
    if (isParameter) {
      posParams[part.substring(1)] = segment;
    } else if (part !== segment.path) {
      return null;
    }
  }
  return {
    consumed: segments.slice(0, parts.length),
    posParams
  };
}
function shallowEqualArrays(a, b) {
  if (a.length !== b.length)
    return false;
  for (let i = 0; i < a.length; ++i) {
    if (!shallowEqual(a[i], b[i]))
      return false;
  }
  return true;
}
function shallowEqual(a, b) {
  const k1 = a ? Object.keys(a) : void 0;
  const k2 = b ? Object.keys(b) : void 0;
  if (!k1 || !k2 || k1.length != k2.length) {
    return false;
  }
  let key;
  for (let i = 0; i < k1.length; i++) {
    key = k1[i];
    if (!equalArraysOrString(a[key], b[key])) {
      return false;
    }
  }
  return true;
}
function equalArraysOrString(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length)
      return false;
    const aSorted = [...a].sort();
    const bSorted = [...b].sort();
    return aSorted.every((val, index) => bSorted[index] === val);
  } else {
    return a === b;
  }
}
function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}
function last(a) {
  return a.length > 0 ? a[a.length - 1] : null;
}
function forEach(map2, callback) {
  for (const prop in map2) {
    if (map2.hasOwnProperty(prop)) {
      callback(map2[prop], prop);
    }
  }
}
function wrapIntoObservable(value) {
  if (isObservable(value)) {
    return value;
  }
  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }
  return of(value);
}
const NG_DEV_MODE$b = false;
const pathCompareMap = {
  "exact": equalSegmentGroups,
  "subset": containsSegmentGroup
};
const paramCompareMap = {
  "exact": equalParams,
  "subset": containsParams,
  "ignored": () => true
};
function containsTree(container, containee, options) {
  return pathCompareMap[options.paths](container.root, containee.root, options.matrixParams) && paramCompareMap[options.queryParams](container.queryParams, containee.queryParams) && !(options.fragment === "exact" && container.fragment !== containee.fragment);
}
function equalParams(container, containee) {
  return shallowEqual(container, containee);
}
function equalSegmentGroups(container, containee, matrixParams) {
  if (!equalPath(container.segments, containee.segments))
    return false;
  if (!matrixParamsMatch(container.segments, containee.segments, matrixParams)) {
    return false;
  }
  if (container.numberOfChildren !== containee.numberOfChildren)
    return false;
  for (const c in containee.children) {
    if (!container.children[c])
      return false;
    if (!equalSegmentGroups(container.children[c], containee.children[c], matrixParams))
      return false;
  }
  return true;
}
function containsParams(container, containee) {
  return Object.keys(containee).length <= Object.keys(container).length && Object.keys(containee).every((key) => equalArraysOrString(container[key], containee[key]));
}
function containsSegmentGroup(container, containee, matrixParams) {
  return containsSegmentGroupHelper(container, containee, containee.segments, matrixParams);
}
function containsSegmentGroupHelper(container, containee, containeePaths, matrixParams) {
  if (container.segments.length > containeePaths.length) {
    const current = container.segments.slice(0, containeePaths.length);
    if (!equalPath(current, containeePaths))
      return false;
    if (containee.hasChildren())
      return false;
    if (!matrixParamsMatch(current, containeePaths, matrixParams))
      return false;
    return true;
  } else if (container.segments.length === containeePaths.length) {
    if (!equalPath(container.segments, containeePaths))
      return false;
    if (!matrixParamsMatch(container.segments, containeePaths, matrixParams))
      return false;
    for (const c in containee.children) {
      if (!container.children[c])
        return false;
      if (!containsSegmentGroup(container.children[c], containee.children[c], matrixParams)) {
        return false;
      }
    }
    return true;
  } else {
    const current = containeePaths.slice(0, container.segments.length);
    const next = containeePaths.slice(container.segments.length);
    if (!equalPath(container.segments, current))
      return false;
    if (!matrixParamsMatch(container.segments, current, matrixParams))
      return false;
    if (!container.children[PRIMARY_OUTLET])
      return false;
    return containsSegmentGroupHelper(container.children[PRIMARY_OUTLET], containee, next, matrixParams);
  }
}
function matrixParamsMatch(containerPaths, containeePaths, options) {
  return containeePaths.every((containeeSegment, i) => {
    return paramCompareMap[options](containerPaths[i].parameters, containeeSegment.parameters);
  });
}
class UrlTree {
  constructor(root = new UrlSegmentGroup([], {}), queryParams = {}, fragment = null) {
    this.root = root;
    this.queryParams = queryParams;
    this.fragment = fragment;
    if (NG_DEV_MODE$b) {
      if (root.segments.length > 0) {
        throw new RuntimeError(4015, "The root `UrlSegmentGroup` should not contain `segments`. Instead, these segments belong in the `children` so they can be associated with a named outlet.");
      }
    }
  }
  get queryParamMap() {
    if (!this._queryParamMap) {
      this._queryParamMap = convertToParamMap(this.queryParams);
    }
    return this._queryParamMap;
  }
  /** @docsNotRequired */
  toString() {
    return DEFAULT_SERIALIZER.serialize(this);
  }
}
class UrlSegmentGroup {
  constructor(segments, children) {
    this.segments = segments;
    this.children = children;
    this.parent = null;
    forEach(children, (v, k) => v.parent = this);
  }
  /** Whether the segment has child segments */
  hasChildren() {
    return this.numberOfChildren > 0;
  }
  /** Number of child segments */
  get numberOfChildren() {
    return Object.keys(this.children).length;
  }
  /** @docsNotRequired */
  toString() {
    return serializePaths(this);
  }
}
class UrlSegment {
  constructor(path, parameters) {
    this.path = path;
    this.parameters = parameters;
  }
  get parameterMap() {
    if (!this._parameterMap) {
      this._parameterMap = convertToParamMap(this.parameters);
    }
    return this._parameterMap;
  }
  /** @docsNotRequired */
  toString() {
    return serializePath(this);
  }
}
function equalSegments(as, bs) {
  return equalPath(as, bs) && as.every((a, i) => shallowEqual(a.parameters, bs[i].parameters));
}
function equalPath(as, bs) {
  if (as.length !== bs.length)
    return false;
  return as.every((a, i) => a.path === bs[i].path);
}
function mapChildrenIntoArray(segment, fn) {
  let res = [];
  forEach(segment.children, (child, childOutlet) => {
    if (childOutlet === PRIMARY_OUTLET) {
      res = res.concat(fn(child, childOutlet));
    }
  });
  forEach(segment.children, (child, childOutlet) => {
    if (childOutlet !== PRIMARY_OUTLET) {
      res = res.concat(fn(child, childOutlet));
    }
  });
  return res;
}
let UrlSerializer = /* @__PURE__ */ (() => {
  let UrlSerializer2 = /* @__PURE__ */ (() => {
    class UrlSerializer3 {
    }
    UrlSerializer3.ɵfac = function UrlSerializer_Factory(t) {
      return new (t || UrlSerializer3)();
    };
    UrlSerializer3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: UrlSerializer3,
      factory: function() {
        return (() => new DefaultUrlSerializer())();
      },
      providedIn: "root"
    });
    return UrlSerializer3;
  })();
  return UrlSerializer2;
})();
class DefaultUrlSerializer {
  /** Parses a url into a `UrlTree` */
  parse(url2) {
    const p = new UrlParser(url2);
    return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
  }
  /** Converts a `UrlTree` into a url */
  serialize(tree2) {
    const segment = `/${serializeSegment(tree2.root, true)}`;
    const query = serializeQueryParams(tree2.queryParams);
    const fragment = typeof tree2.fragment === `string` ? `#${encodeUriFragment(tree2.fragment)}` : "";
    return `${segment}${query}${fragment}`;
  }
}
const DEFAULT_SERIALIZER = /* @__PURE__ */ new DefaultUrlSerializer();
function serializePaths(segment) {
  return segment.segments.map((p) => serializePath(p)).join("/");
}
function serializeSegment(segment, root) {
  if (!segment.hasChildren()) {
    return serializePaths(segment);
  }
  if (root) {
    const primary = segment.children[PRIMARY_OUTLET] ? serializeSegment(segment.children[PRIMARY_OUTLET], false) : "";
    const children = [];
    forEach(segment.children, (v, k) => {
      if (k !== PRIMARY_OUTLET) {
        children.push(`${k}:${serializeSegment(v, false)}`);
      }
    });
    return children.length > 0 ? `${primary}(${children.join("//")})` : primary;
  } else {
    const children = mapChildrenIntoArray(segment, (v, k) => {
      if (k === PRIMARY_OUTLET) {
        return [serializeSegment(segment.children[PRIMARY_OUTLET], false)];
      }
      return [`${k}:${serializeSegment(v, false)}`];
    });
    if (Object.keys(segment.children).length === 1 && segment.children[PRIMARY_OUTLET] != null) {
      return `${serializePaths(segment)}/${children[0]}`;
    }
    return `${serializePaths(segment)}/(${children.join("//")})`;
  }
}
function encodeUriString(s) {
  return encodeURIComponent(s).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",");
}
function encodeUriQuery(s) {
  return encodeUriString(s).replace(/%3B/gi, ";");
}
function encodeUriFragment(s) {
  return encodeURI(s);
}
function encodeUriSegment(s) {
  return encodeUriString(s).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&");
}
function decode(s) {
  return decodeURIComponent(s);
}
function decodeQuery(s) {
  return decode(s.replace(/\+/g, "%20"));
}
function serializePath(path) {
  return `${encodeUriSegment(path.path)}${serializeMatrixParams(path.parameters)}`;
}
function serializeMatrixParams(params) {
  return Object.keys(params).map((key) => `;${encodeUriSegment(key)}=${encodeUriSegment(params[key])}`).join("");
}
function serializeQueryParams(params) {
  const strParams = Object.keys(params).map((name) => {
    const value = params[name];
    return Array.isArray(value) ? value.map((v) => `${encodeUriQuery(name)}=${encodeUriQuery(v)}`).join("&") : `${encodeUriQuery(name)}=${encodeUriQuery(value)}`;
  }).filter((s) => !!s);
  return strParams.length ? `?${strParams.join("&")}` : "";
}
const SEGMENT_RE = /^[^\/()?;=#]+/;
function matchSegments(str) {
  const match2 = str.match(SEGMENT_RE);
  return match2 ? match2[0] : "";
}
const QUERY_PARAM_RE = /^[^=?&#]+/;
function matchQueryParams(str) {
  const match2 = str.match(QUERY_PARAM_RE);
  return match2 ? match2[0] : "";
}
const QUERY_PARAM_VALUE_RE = /^[^&#]+/;
function matchUrlQueryParamValue(str) {
  const match2 = str.match(QUERY_PARAM_VALUE_RE);
  return match2 ? match2[0] : "";
}
class UrlParser {
  constructor(url2) {
    this.url = url2;
    this.remaining = url2;
  }
  parseRootSegment() {
    this.consumeOptional("/");
    if (this.remaining === "" || this.peekStartsWith("?") || this.peekStartsWith("#")) {
      return new UrlSegmentGroup([], {});
    }
    return new UrlSegmentGroup([], this.parseChildren());
  }
  parseQueryParams() {
    const params = {};
    if (this.consumeOptional("?")) {
      do {
        this.parseQueryParam(params);
      } while (this.consumeOptional("&"));
    }
    return params;
  }
  parseFragment() {
    return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null;
  }
  parseChildren() {
    if (this.remaining === "") {
      return {};
    }
    this.consumeOptional("/");
    const segments = [];
    if (!this.peekStartsWith("(")) {
      segments.push(this.parseSegment());
    }
    while (this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(")) {
      this.capture("/");
      segments.push(this.parseSegment());
    }
    let children = {};
    if (this.peekStartsWith("/(")) {
      this.capture("/");
      children = this.parseParens(true);
    }
    let res = {};
    if (this.peekStartsWith("(")) {
      res = this.parseParens(false);
    }
    if (segments.length > 0 || Object.keys(children).length > 0) {
      res[PRIMARY_OUTLET] = new UrlSegmentGroup(segments, children);
    }
    return res;
  }
  // parse a segment with its matrix parameters
  // ie `name;k1=v1;k2`
  parseSegment() {
    const path = matchSegments(this.remaining);
    if (path === "" && this.peekStartsWith(";")) {
      throw new RuntimeError(4009, NG_DEV_MODE$b && `Empty path url segment cannot have parameters: '${this.remaining}'.`);
    }
    this.capture(path);
    return new UrlSegment(decode(path), this.parseMatrixParams());
  }
  parseMatrixParams() {
    const params = {};
    while (this.consumeOptional(";")) {
      this.parseParam(params);
    }
    return params;
  }
  parseParam(params) {
    const key = matchSegments(this.remaining);
    if (!key) {
      return;
    }
    this.capture(key);
    let value = "";
    if (this.consumeOptional("=")) {
      const valueMatch = matchSegments(this.remaining);
      if (valueMatch) {
        value = valueMatch;
        this.capture(value);
      }
    }
    params[decode(key)] = decode(value);
  }
  // Parse a single query parameter `name[=value]`
  parseQueryParam(params) {
    const key = matchQueryParams(this.remaining);
    if (!key) {
      return;
    }
    this.capture(key);
    let value = "";
    if (this.consumeOptional("=")) {
      const valueMatch = matchUrlQueryParamValue(this.remaining);
      if (valueMatch) {
        value = valueMatch;
        this.capture(value);
      }
    }
    const decodedKey = decodeQuery(key);
    const decodedVal = decodeQuery(value);
    if (params.hasOwnProperty(decodedKey)) {
      let currentVal = params[decodedKey];
      if (!Array.isArray(currentVal)) {
        currentVal = [currentVal];
        params[decodedKey] = currentVal;
      }
      currentVal.push(decodedVal);
    } else {
      params[decodedKey] = decodedVal;
    }
  }
  // parse `(a/b//outlet_name:c/d)`
  parseParens(allowPrimary) {
    const segments = {};
    this.capture("(");
    while (!this.consumeOptional(")") && this.remaining.length > 0) {
      const path = matchSegments(this.remaining);
      const next = this.remaining[path.length];
      if (next !== "/" && next !== ")" && next !== ";") {
        throw new RuntimeError(4010, NG_DEV_MODE$b && `Cannot parse url '${this.url}'`);
      }
      let outletName = void 0;
      if (path.indexOf(":") > -1) {
        outletName = path.slice(0, path.indexOf(":"));
        this.capture(outletName);
        this.capture(":");
      } else if (allowPrimary) {
        outletName = PRIMARY_OUTLET;
      }
      const children = this.parseChildren();
      segments[outletName] = Object.keys(children).length === 1 ? children[PRIMARY_OUTLET] : new UrlSegmentGroup([], children);
      this.consumeOptional("//");
    }
    return segments;
  }
  peekStartsWith(str) {
    return this.remaining.startsWith(str);
  }
  // Consumes the prefix when it is present and returns whether it has been consumed
  consumeOptional(str) {
    if (this.peekStartsWith(str)) {
      this.remaining = this.remaining.substring(str.length);
      return true;
    }
    return false;
  }
  capture(str) {
    if (!this.consumeOptional(str)) {
      throw new RuntimeError(4011, NG_DEV_MODE$b && `Expected "${str}".`);
    }
  }
}
function createRoot(rootCandidate) {
  return rootCandidate.segments.length > 0 ? new UrlSegmentGroup([], {
    [PRIMARY_OUTLET]: rootCandidate
  }) : rootCandidate;
}
function squashSegmentGroup(segmentGroup) {
  const newChildren = {};
  for (const childOutlet of Object.keys(segmentGroup.children)) {
    const child = segmentGroup.children[childOutlet];
    const childCandidate = squashSegmentGroup(child);
    if (childCandidate.segments.length > 0 || childCandidate.hasChildren()) {
      newChildren[childOutlet] = childCandidate;
    }
  }
  const s = new UrlSegmentGroup(segmentGroup.segments, newChildren);
  return mergeTrivialChildren(s);
}
function mergeTrivialChildren(s) {
  if (s.numberOfChildren === 1 && s.children[PRIMARY_OUTLET]) {
    const c = s.children[PRIMARY_OUTLET];
    return new UrlSegmentGroup(s.segments.concat(c.segments), c.children);
  }
  return s;
}
function isUrlTree(v) {
  return v instanceof UrlTree;
}
const NG_DEV_MODE$a = false;
function createUrlTree(route, urlTree, commands, queryParams, fragment) {
  var _a;
  if (commands.length === 0) {
    return tree(urlTree.root, urlTree.root, urlTree.root, queryParams, fragment);
  }
  const nav = computeNavigation(commands);
  if (nav.toRoot()) {
    return tree(urlTree.root, urlTree.root, new UrlSegmentGroup([], {}), queryParams, fragment);
  }
  function createTreeUsingPathIndex(lastPathIndex) {
    var _a2;
    const startingPosition = findStartingPosition(nav, urlTree, (_a2 = route.snapshot) === null || _a2 === void 0 ? void 0 : _a2._urlSegment, lastPathIndex);
    const segmentGroup = startingPosition.processChildren ? updateSegmentGroupChildren(startingPosition.segmentGroup, startingPosition.index, nav.commands) : updateSegmentGroup(startingPosition.segmentGroup, startingPosition.index, nav.commands);
    return tree(urlTree.root, startingPosition.segmentGroup, segmentGroup, queryParams, fragment);
  }
  const result = createTreeUsingPathIndex((_a = route.snapshot) === null || _a === void 0 ? void 0 : _a._lastPathIndex);
  return result;
}
function isMatrixParams(command) {
  return typeof command === "object" && command != null && !command.outlets && !command.segmentPath;
}
function isCommandWithOutlets(command) {
  return typeof command === "object" && command != null && command.outlets;
}
function tree(oldRoot, oldSegmentGroup, newSegmentGroup, queryParams, fragment) {
  let qp = {};
  if (queryParams) {
    forEach(queryParams, (value, name) => {
      qp[name] = Array.isArray(value) ? value.map((v) => `${v}`) : `${value}`;
    });
  }
  let rootCandidate;
  if (oldRoot === oldSegmentGroup) {
    rootCandidate = newSegmentGroup;
  } else {
    rootCandidate = replaceSegment(oldRoot, oldSegmentGroup, newSegmentGroup);
  }
  const newRoot = createRoot(squashSegmentGroup(rootCandidate));
  return new UrlTree(newRoot, qp, fragment);
}
function replaceSegment(current, oldSegment, newSegment) {
  const children = {};
  forEach(current.children, (c, outletName) => {
    if (c === oldSegment) {
      children[outletName] = newSegment;
    } else {
      children[outletName] = replaceSegment(c, oldSegment, newSegment);
    }
  });
  return new UrlSegmentGroup(current.segments, children);
}
class Navigation {
  constructor(isAbsolute, numberOfDoubleDots, commands) {
    this.isAbsolute = isAbsolute;
    this.numberOfDoubleDots = numberOfDoubleDots;
    this.commands = commands;
    if (isAbsolute && commands.length > 0 && isMatrixParams(commands[0])) {
      throw new RuntimeError(4003, NG_DEV_MODE$a && "Root segment cannot have matrix parameters");
    }
    const cmdWithOutlet = commands.find(isCommandWithOutlets);
    if (cmdWithOutlet && cmdWithOutlet !== last(commands)) {
      throw new RuntimeError(4004, NG_DEV_MODE$a && "{outlets:{}} has to be the last command");
    }
  }
  toRoot() {
    return this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/";
  }
}
function computeNavigation(commands) {
  if (typeof commands[0] === "string" && commands.length === 1 && commands[0] === "/") {
    return new Navigation(true, 0, commands);
  }
  let numberOfDoubleDots = 0;
  let isAbsolute = false;
  const res = commands.reduce((res2, cmd, cmdIdx) => {
    if (typeof cmd === "object" && cmd != null) {
      if (cmd.outlets) {
        const outlets = {};
        forEach(cmd.outlets, (commands2, name) => {
          outlets[name] = typeof commands2 === "string" ? commands2.split("/") : commands2;
        });
        return [...res2, {
          outlets
        }];
      }
      if (cmd.segmentPath) {
        return [...res2, cmd.segmentPath];
      }
    }
    if (!(typeof cmd === "string")) {
      return [...res2, cmd];
    }
    if (cmdIdx === 0) {
      cmd.split("/").forEach((urlPart, partIndex) => {
        if (partIndex == 0 && urlPart === ".")
          ;
        else if (partIndex == 0 && urlPart === "") {
          isAbsolute = true;
        } else if (urlPart === "..") {
          numberOfDoubleDots++;
        } else if (urlPart != "") {
          res2.push(urlPart);
        }
      });
      return res2;
    }
    return [...res2, cmd];
  }, []);
  return new Navigation(isAbsolute, numberOfDoubleDots, res);
}
class Position {
  constructor(segmentGroup, processChildren, index) {
    this.segmentGroup = segmentGroup;
    this.processChildren = processChildren;
    this.index = index;
  }
}
function findStartingPosition(nav, tree2, segmentGroup, lastPathIndex) {
  if (nav.isAbsolute) {
    return new Position(tree2.root, true, 0);
  }
  if (lastPathIndex === -1) {
    const processChildren = segmentGroup === tree2.root;
    return new Position(segmentGroup, processChildren, 0);
  }
  const modifier = isMatrixParams(nav.commands[0]) ? 0 : 1;
  const index = lastPathIndex + modifier;
  return createPositionApplyingDoubleDots(segmentGroup, index, nav.numberOfDoubleDots);
}
function createPositionApplyingDoubleDots(group, index, numberOfDoubleDots) {
  let g = group;
  let ci = index;
  let dd = numberOfDoubleDots;
  while (dd > ci) {
    dd -= ci;
    g = g.parent;
    if (!g) {
      throw new RuntimeError(4005, NG_DEV_MODE$a && "Invalid number of '../'");
    }
    ci = g.segments.length;
  }
  return new Position(g, false, ci - dd);
}
function getOutlets(commands) {
  if (isCommandWithOutlets(commands[0])) {
    return commands[0].outlets;
  }
  return {
    [PRIMARY_OUTLET]: commands
  };
}
function updateSegmentGroup(segmentGroup, startIndex, commands) {
  if (!segmentGroup) {
    segmentGroup = new UrlSegmentGroup([], {});
  }
  if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
    return updateSegmentGroupChildren(segmentGroup, startIndex, commands);
  }
  const m = prefixedWith(segmentGroup, startIndex, commands);
  const slicedCommands = commands.slice(m.commandIndex);
  if (m.match && m.pathIndex < segmentGroup.segments.length) {
    const g = new UrlSegmentGroup(segmentGroup.segments.slice(0, m.pathIndex), {});
    g.children[PRIMARY_OUTLET] = new UrlSegmentGroup(segmentGroup.segments.slice(m.pathIndex), segmentGroup.children);
    return updateSegmentGroupChildren(g, 0, slicedCommands);
  } else if (m.match && slicedCommands.length === 0) {
    return new UrlSegmentGroup(segmentGroup.segments, {});
  } else if (m.match && !segmentGroup.hasChildren()) {
    return createNewSegmentGroup(segmentGroup, startIndex, commands);
  } else if (m.match) {
    return updateSegmentGroupChildren(segmentGroup, 0, slicedCommands);
  } else {
    return createNewSegmentGroup(segmentGroup, startIndex, commands);
  }
}
function updateSegmentGroupChildren(segmentGroup, startIndex, commands) {
  if (commands.length === 0) {
    return new UrlSegmentGroup(segmentGroup.segments, {});
  } else {
    const outlets = getOutlets(commands);
    const children = {};
    if (!outlets[PRIMARY_OUTLET] && segmentGroup.children[PRIMARY_OUTLET] && segmentGroup.numberOfChildren === 1 && segmentGroup.children[PRIMARY_OUTLET].segments.length === 0) {
      return updateSegmentGroupChildren(segmentGroup.children[PRIMARY_OUTLET], startIndex, commands);
    }
    forEach(outlets, (commands2, outlet) => {
      if (typeof commands2 === "string") {
        commands2 = [commands2];
      }
      if (commands2 !== null) {
        children[outlet] = updateSegmentGroup(segmentGroup.children[outlet], startIndex, commands2);
      }
    });
    forEach(segmentGroup.children, (child, childOutlet) => {
      if (outlets[childOutlet] === void 0) {
        children[childOutlet] = child;
      }
    });
    return new UrlSegmentGroup(segmentGroup.segments, children);
  }
}
function prefixedWith(segmentGroup, startIndex, commands) {
  let currentCommandIndex = 0;
  let currentPathIndex = startIndex;
  const noMatch2 = {
    match: false,
    pathIndex: 0,
    commandIndex: 0
  };
  while (currentPathIndex < segmentGroup.segments.length) {
    if (currentCommandIndex >= commands.length)
      return noMatch2;
    const path = segmentGroup.segments[currentPathIndex];
    const command = commands[currentCommandIndex];
    if (isCommandWithOutlets(command)) {
      break;
    }
    const curr = `${command}`;
    const next = currentCommandIndex < commands.length - 1 ? commands[currentCommandIndex + 1] : null;
    if (currentPathIndex > 0 && curr === void 0)
      break;
    if (curr && next && typeof next === "object" && next.outlets === void 0) {
      if (!compare(curr, next, path))
        return noMatch2;
      currentCommandIndex += 2;
    } else {
      if (!compare(curr, {}, path))
        return noMatch2;
      currentCommandIndex++;
    }
    currentPathIndex++;
  }
  return {
    match: true,
    pathIndex: currentPathIndex,
    commandIndex: currentCommandIndex
  };
}
function createNewSegmentGroup(segmentGroup, startIndex, commands) {
  const paths = segmentGroup.segments.slice(0, startIndex);
  let i = 0;
  while (i < commands.length) {
    const command = commands[i];
    if (isCommandWithOutlets(command)) {
      const children = createNewSegmentChildren(command.outlets);
      return new UrlSegmentGroup(paths, children);
    }
    if (i === 0 && isMatrixParams(commands[0])) {
      const p = segmentGroup.segments[startIndex];
      paths.push(new UrlSegment(p.path, stringify(commands[0])));
      i++;
      continue;
    }
    const curr = isCommandWithOutlets(command) ? command.outlets[PRIMARY_OUTLET] : `${command}`;
    const next = i < commands.length - 1 ? commands[i + 1] : null;
    if (curr && next && isMatrixParams(next)) {
      paths.push(new UrlSegment(curr, stringify(next)));
      i += 2;
    } else {
      paths.push(new UrlSegment(curr, {}));
      i++;
    }
  }
  return new UrlSegmentGroup(paths, {});
}
function createNewSegmentChildren(outlets) {
  const children = {};
  forEach(outlets, (commands, outlet) => {
    if (typeof commands === "string") {
      commands = [commands];
    }
    if (commands !== null) {
      children[outlet] = createNewSegmentGroup(new UrlSegmentGroup([], {}), 0, commands);
    }
  });
  return children;
}
function stringify(params) {
  const res = {};
  forEach(params, (v, k) => res[k] = `${v}`);
  return res;
}
function compare(path, params, segment) {
  return path == segment.path && shallowEqual(params, segment.parameters);
}
const IMPERATIVE_NAVIGATION = "imperative";
class RouterEvent {
  constructor(id, url2) {
    this.id = id;
    this.url = url2;
  }
}
class NavigationStart extends RouterEvent {
  constructor(id, url2, navigationTrigger = "imperative", restoredState = null) {
    super(id, url2);
    this.type = 0;
    this.navigationTrigger = navigationTrigger;
    this.restoredState = restoredState;
  }
  /** @docsNotRequired */
  toString() {
    return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
  }
}
class NavigationEnd extends RouterEvent {
  constructor(id, url2, urlAfterRedirects) {
    super(id, url2);
    this.urlAfterRedirects = urlAfterRedirects;
    this.type = 1;
  }
  /** @docsNotRequired */
  toString() {
    return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
  }
}
class NavigationCancel extends RouterEvent {
  constructor(id, url2, reason, code) {
    super(id, url2);
    this.reason = reason;
    this.code = code;
    this.type = 2;
  }
  /** @docsNotRequired */
  toString() {
    return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
  }
}
class NavigationSkipped extends RouterEvent {
  constructor(id, url2, reason, code) {
    super(id, url2);
    this.reason = reason;
    this.code = code;
    this.type = 16;
  }
}
class NavigationError extends RouterEvent {
  constructor(id, url2, error, target) {
    super(id, url2);
    this.error = error;
    this.target = target;
    this.type = 3;
  }
  /** @docsNotRequired */
  toString() {
    return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
  }
}
class RoutesRecognized extends RouterEvent {
  constructor(id, url2, urlAfterRedirects, state) {
    super(id, url2);
    this.urlAfterRedirects = urlAfterRedirects;
    this.state = state;
    this.type = 4;
  }
  /** @docsNotRequired */
  toString() {
    return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
  }
}
class GuardsCheckStart extends RouterEvent {
  constructor(id, url2, urlAfterRedirects, state) {
    super(id, url2);
    this.urlAfterRedirects = urlAfterRedirects;
    this.state = state;
    this.type = 7;
  }
  toString() {
    return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
  }
}
class GuardsCheckEnd extends RouterEvent {
  constructor(id, url2, urlAfterRedirects, state, shouldActivate) {
    super(id, url2);
    this.urlAfterRedirects = urlAfterRedirects;
    this.state = state;
    this.shouldActivate = shouldActivate;
    this.type = 8;
  }
  toString() {
    return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
  }
}
class ResolveStart extends RouterEvent {
  constructor(id, url2, urlAfterRedirects, state) {
    super(id, url2);
    this.urlAfterRedirects = urlAfterRedirects;
    this.state = state;
    this.type = 5;
  }
  toString() {
    return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
  }
}
class ResolveEnd extends RouterEvent {
  constructor(id, url2, urlAfterRedirects, state) {
    super(id, url2);
    this.urlAfterRedirects = urlAfterRedirects;
    this.state = state;
    this.type = 6;
  }
  toString() {
    return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
  }
}
class RouteConfigLoadStart {
  constructor(route) {
    this.route = route;
    this.type = 9;
  }
  toString() {
    return `RouteConfigLoadStart(path: ${this.route.path})`;
  }
}
class RouteConfigLoadEnd {
  constructor(route) {
    this.route = route;
    this.type = 10;
  }
  toString() {
    return `RouteConfigLoadEnd(path: ${this.route.path})`;
  }
}
class ChildActivationStart {
  constructor(snapshot) {
    this.snapshot = snapshot;
    this.type = 11;
  }
  toString() {
    const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
    return `ChildActivationStart(path: '${path}')`;
  }
}
class ChildActivationEnd {
  constructor(snapshot) {
    this.snapshot = snapshot;
    this.type = 12;
  }
  toString() {
    const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
    return `ChildActivationEnd(path: '${path}')`;
  }
}
class ActivationStart {
  constructor(snapshot) {
    this.snapshot = snapshot;
    this.type = 13;
  }
  toString() {
    const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
    return `ActivationStart(path: '${path}')`;
  }
}
class ActivationEnd {
  constructor(snapshot) {
    this.snapshot = snapshot;
    this.type = 14;
  }
  toString() {
    const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || "";
    return `ActivationEnd(path: '${path}')`;
  }
}
let LegacyCreateUrlTree = /* @__PURE__ */ (() => {
  let LegacyCreateUrlTree2 = /* @__PURE__ */ (() => {
    class LegacyCreateUrlTree3 {
      createUrlTree(relativeTo, currentState, currentUrlTree, commands, queryParams, fragment) {
        const a = relativeTo || currentState.root;
        return createUrlTree(a, currentUrlTree, commands, queryParams, fragment);
      }
    }
    LegacyCreateUrlTree3.ɵfac = function LegacyCreateUrlTree_Factory(t) {
      return new (t || LegacyCreateUrlTree3)();
    };
    LegacyCreateUrlTree3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: LegacyCreateUrlTree3,
      factory: LegacyCreateUrlTree3.ɵfac
    });
    return LegacyCreateUrlTree3;
  })();
  return LegacyCreateUrlTree2;
})();
let CreateUrlTreeStrategy = /* @__PURE__ */ (() => {
  let CreateUrlTreeStrategy2 = /* @__PURE__ */ (() => {
    class CreateUrlTreeStrategy3 {
    }
    CreateUrlTreeStrategy3.ɵfac = function CreateUrlTreeStrategy_Factory(t) {
      return new (t || CreateUrlTreeStrategy3)();
    };
    CreateUrlTreeStrategy3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: CreateUrlTreeStrategy3,
      factory: function(t) {
        return LegacyCreateUrlTree.ɵfac(t);
      },
      providedIn: "root"
    });
    return CreateUrlTreeStrategy3;
  })();
  return CreateUrlTreeStrategy2;
})();
class Tree {
  constructor(root) {
    this._root = root;
  }
  get root() {
    return this._root.value;
  }
  /**
   * @internal
   */
  parent(t) {
    const p = this.pathFromRoot(t);
    return p.length > 1 ? p[p.length - 2] : null;
  }
  /**
   * @internal
   */
  children(t) {
    const n = findNode(t, this._root);
    return n ? n.children.map((t2) => t2.value) : [];
  }
  /**
   * @internal
   */
  firstChild(t) {
    const n = findNode(t, this._root);
    return n && n.children.length > 0 ? n.children[0].value : null;
  }
  /**
   * @internal
   */
  siblings(t) {
    const p = findPath(t, this._root);
    if (p.length < 2)
      return [];
    const c = p[p.length - 2].children.map((c2) => c2.value);
    return c.filter((cc) => cc !== t);
  }
  /**
   * @internal
   */
  pathFromRoot(t) {
    return findPath(t, this._root).map((s) => s.value);
  }
}
function findNode(value, node) {
  if (value === node.value)
    return node;
  for (const child of node.children) {
    const node2 = findNode(value, child);
    if (node2)
      return node2;
  }
  return null;
}
function findPath(value, node) {
  if (value === node.value)
    return [node];
  for (const child of node.children) {
    const path = findPath(value, child);
    if (path.length) {
      path.unshift(node);
      return path;
    }
  }
  return [];
}
class TreeNode {
  constructor(value, children) {
    this.value = value;
    this.children = children;
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
}
function nodeChildrenAsMap(node) {
  const map2 = {};
  if (node) {
    node.children.forEach((child) => map2[child.value.outlet] = child);
  }
  return map2;
}
class RouterState extends Tree {
  /** @internal */
  constructor(root, snapshot) {
    super(root);
    this.snapshot = snapshot;
    setRouterState(this, root);
  }
  toString() {
    return this.snapshot.toString();
  }
}
function createEmptyState(urlTree, rootComponent) {
  const snapshot = createEmptyStateSnapshot(urlTree, rootComponent);
  const emptyUrl = new BehaviorSubject([new UrlSegment("", {})]);
  const emptyParams = new BehaviorSubject({});
  const emptyData = new BehaviorSubject({});
  const emptyQueryParams = new BehaviorSubject({});
  const fragment = new BehaviorSubject("");
  const activated = new ActivatedRoute(emptyUrl, emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, snapshot.root);
  activated.snapshot = snapshot.root;
  return new RouterState(new TreeNode(activated, []), snapshot);
}
function createEmptyStateSnapshot(urlTree, rootComponent) {
  const emptyParams = {};
  const emptyData = {};
  const emptyQueryParams = {};
  const fragment = "";
  const activated = new ActivatedRouteSnapshot([], emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, null, urlTree.root, -1, {});
  return new RouterStateSnapshot("", new TreeNode(activated, []));
}
class ActivatedRoute {
  /** @internal */
  constructor(url2, params, queryParams, fragment, data, outlet, component, futureSnapshot) {
    var _a, _b;
    this.url = url2;
    this.params = params;
    this.queryParams = queryParams;
    this.fragment = fragment;
    this.data = data;
    this.outlet = outlet;
    this.component = component;
    this.title = (_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.pipe(map((d) => d[RouteTitleKey]))) !== null && _b !== void 0 ? _b : of(void 0);
    this._futureSnapshot = futureSnapshot;
  }
  /** The configuration used to match this route. */
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  /** The root of the router state. */
  get root() {
    return this._routerState.root;
  }
  /** The parent of this route in the router state tree. */
  get parent() {
    return this._routerState.parent(this);
  }
  /** The first child of this route in the router state tree. */
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  /** The children of this route in the router state tree. */
  get children() {
    return this._routerState.children(this);
  }
  /** The path from the root of the router state tree to this route. */
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  /**
   * An Observable that contains a map of the required and optional parameters
   * specific to the route.
   * The map supports retrieving single and multiple values from the same parameter.
   */
  get paramMap() {
    if (!this._paramMap) {
      this._paramMap = this.params.pipe(map((p) => convertToParamMap(p)));
    }
    return this._paramMap;
  }
  /**
   * An Observable that contains a map of the query parameters available to all routes.
   * The map supports retrieving single and multiple values from the query parameter.
   */
  get queryParamMap() {
    if (!this._queryParamMap) {
      this._queryParamMap = this.queryParams.pipe(map((p) => convertToParamMap(p)));
    }
    return this._queryParamMap;
  }
  toString() {
    return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
  }
}
function inheritedParamsDataResolve(route, paramsInheritanceStrategy = "emptyOnly") {
  const pathFromRoot = route.pathFromRoot;
  let inheritingStartingFrom = 0;
  if (paramsInheritanceStrategy !== "always") {
    inheritingStartingFrom = pathFromRoot.length - 1;
    while (inheritingStartingFrom >= 1) {
      const current = pathFromRoot[inheritingStartingFrom];
      const parent = pathFromRoot[inheritingStartingFrom - 1];
      if (current.routeConfig && current.routeConfig.path === "") {
        inheritingStartingFrom--;
      } else if (!parent.component) {
        inheritingStartingFrom--;
      } else {
        break;
      }
    }
  }
  return flattenInherited(pathFromRoot.slice(inheritingStartingFrom));
}
function flattenInherited(pathFromRoot) {
  return pathFromRoot.reduce((res, curr) => {
    var _a;
    const params = Object.assign(Object.assign({}, res.params), curr.params);
    const data = Object.assign(Object.assign({}, res.data), curr.data);
    const resolve = Object.assign(Object.assign(Object.assign(Object.assign({}, curr.data), res.resolve), (_a = curr.routeConfig) === null || _a === void 0 ? void 0 : _a.data), curr._resolvedData);
    return {
      params,
      data,
      resolve
    };
  }, {
    params: {},
    data: {},
    resolve: {}
  });
}
class ActivatedRouteSnapshot {
  /** The resolved route title */
  get title() {
    var _a;
    return (_a = this.data) === null || _a === void 0 ? void 0 : _a[RouteTitleKey];
  }
  /** @internal */
  constructor(url2, params, queryParams, fragment, data, outlet, component, routeConfig, urlSegment, lastPathIndex, resolve) {
    this.url = url2;
    this.params = params;
    this.queryParams = queryParams;
    this.fragment = fragment;
    this.data = data;
    this.outlet = outlet;
    this.component = component;
    this.routeConfig = routeConfig;
    this._urlSegment = urlSegment;
    this._lastPathIndex = lastPathIndex;
    this._resolve = resolve;
  }
  /** The root of the router state */
  get root() {
    return this._routerState.root;
  }
  /** The parent of this route in the router state tree */
  get parent() {
    return this._routerState.parent(this);
  }
  /** The first child of this route in the router state tree */
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  /** The children of this route in the router state tree */
  get children() {
    return this._routerState.children(this);
  }
  /** The path from the root of the router state tree to this route */
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    if (!this._paramMap) {
      this._paramMap = convertToParamMap(this.params);
    }
    return this._paramMap;
  }
  get queryParamMap() {
    if (!this._queryParamMap) {
      this._queryParamMap = convertToParamMap(this.queryParams);
    }
    return this._queryParamMap;
  }
  toString() {
    const url2 = this.url.map((segment) => segment.toString()).join("/");
    const matched = this.routeConfig ? this.routeConfig.path : "";
    return `Route(url:'${url2}', path:'${matched}')`;
  }
}
class RouterStateSnapshot extends Tree {
  /** @internal */
  constructor(url2, root) {
    super(root);
    this.url = url2;
    setRouterState(this, root);
  }
  toString() {
    return serializeNode(this._root);
  }
}
function setRouterState(state, node) {
  node.value._routerState = state;
  node.children.forEach((c) => setRouterState(state, c));
}
function serializeNode(node) {
  const c = node.children.length > 0 ? ` { ${node.children.map(serializeNode).join(", ")} } ` : "";
  return `${node.value}${c}`;
}
function advanceActivatedRoute(route) {
  if (route.snapshot) {
    const currentSnapshot = route.snapshot;
    const nextSnapshot = route._futureSnapshot;
    route.snapshot = nextSnapshot;
    if (!shallowEqual(currentSnapshot.queryParams, nextSnapshot.queryParams)) {
      route.queryParams.next(nextSnapshot.queryParams);
    }
    if (currentSnapshot.fragment !== nextSnapshot.fragment) {
      route.fragment.next(nextSnapshot.fragment);
    }
    if (!shallowEqual(currentSnapshot.params, nextSnapshot.params)) {
      route.params.next(nextSnapshot.params);
    }
    if (!shallowEqualArrays(currentSnapshot.url, nextSnapshot.url)) {
      route.url.next(nextSnapshot.url);
    }
    if (!shallowEqual(currentSnapshot.data, nextSnapshot.data)) {
      route.data.next(nextSnapshot.data);
    }
  } else {
    route.snapshot = route._futureSnapshot;
    route.data.next(route._futureSnapshot.data);
  }
}
function equalParamsAndUrlSegments(a, b) {
  const equalUrlParams = shallowEqual(a.params, b.params) && equalSegments(a.url, b.url);
  const parentsMismatch = !a.parent !== !b.parent;
  return equalUrlParams && !parentsMismatch && (!a.parent || equalParamsAndUrlSegments(a.parent, b.parent));
}
function createRouterState(routeReuseStrategy, curr, prevState) {
  const root = createNode(routeReuseStrategy, curr._root, prevState ? prevState._root : void 0);
  return new RouterState(root, curr);
}
function createNode(routeReuseStrategy, curr, prevState) {
  if (prevState && routeReuseStrategy.shouldReuseRoute(curr.value, prevState.value.snapshot)) {
    const value = prevState.value;
    value._futureSnapshot = curr.value;
    const children = createOrReuseChildren(routeReuseStrategy, curr, prevState);
    return new TreeNode(value, children);
  } else {
    if (routeReuseStrategy.shouldAttach(curr.value)) {
      const detachedRouteHandle = routeReuseStrategy.retrieve(curr.value);
      if (detachedRouteHandle !== null) {
        const tree2 = detachedRouteHandle.route;
        tree2.value._futureSnapshot = curr.value;
        tree2.children = curr.children.map((c) => createNode(routeReuseStrategy, c));
        return tree2;
      }
    }
    const value = createActivatedRoute(curr.value);
    const children = curr.children.map((c) => createNode(routeReuseStrategy, c));
    return new TreeNode(value, children);
  }
}
function createOrReuseChildren(routeReuseStrategy, curr, prevState) {
  return curr.children.map((child) => {
    for (const p of prevState.children) {
      if (routeReuseStrategy.shouldReuseRoute(child.value, p.value.snapshot)) {
        return createNode(routeReuseStrategy, child, p);
      }
    }
    return createNode(routeReuseStrategy, child);
  });
}
function createActivatedRoute(c) {
  return new ActivatedRoute(new BehaviorSubject(c.url), new BehaviorSubject(c.params), new BehaviorSubject(c.queryParams), new BehaviorSubject(c.fragment), new BehaviorSubject(c.data), c.outlet, c.component, c);
}
const NAVIGATION_CANCELING_ERROR = "ngNavigationCancelingError";
function redirectingNavigationError(urlSerializer, redirect) {
  const {
    redirectTo,
    navigationBehaviorOptions
  } = isUrlTree(redirect) ? {
    redirectTo: redirect,
    navigationBehaviorOptions: void 0
  } : redirect;
  const error = navigationCancelingError(false, 0, redirect);
  error.url = redirectTo;
  error.navigationBehaviorOptions = navigationBehaviorOptions;
  return error;
}
function navigationCancelingError(message, code, redirectUrl) {
  const error = new Error("NavigationCancelingError: " + (message || ""));
  error[NAVIGATION_CANCELING_ERROR] = true;
  error.cancellationCode = code;
  if (redirectUrl) {
    error.url = redirectUrl;
  }
  return error;
}
function isRedirectingNavigationCancelingError$1(error) {
  return isNavigationCancelingError$1(error) && isUrlTree(error.url);
}
function isNavigationCancelingError$1(error) {
  return error && error[NAVIGATION_CANCELING_ERROR];
}
class OutletContext {
  constructor() {
    this.outlet = null;
    this.route = null;
    this.resolver = null;
    this.injector = null;
    this.children = new ChildrenOutletContexts();
    this.attachRef = null;
  }
}
let ChildrenOutletContexts = /* @__PURE__ */ (() => {
  let ChildrenOutletContexts2 = /* @__PURE__ */ (() => {
    class ChildrenOutletContexts3 {
      constructor() {
        this.contexts = /* @__PURE__ */ new Map();
      }
      /** Called when a `RouterOutlet` directive is instantiated */
      onChildOutletCreated(childName, outlet) {
        const context = this.getOrCreateContext(childName);
        context.outlet = outlet;
        this.contexts.set(childName, context);
      }
      /**
       * Called when a `RouterOutlet` directive is destroyed.
       * We need to keep the context as the outlet could be destroyed inside a NgIf and might be
       * re-created later.
       */
      onChildOutletDestroyed(childName) {
        const context = this.getContext(childName);
        if (context) {
          context.outlet = null;
          context.attachRef = null;
        }
      }
      /**
       * Called when the corresponding route is deactivated during navigation.
       * Because the component get destroyed, all children outlet are destroyed.
       */
      onOutletDeactivated() {
        const contexts = this.contexts;
        this.contexts = /* @__PURE__ */ new Map();
        return contexts;
      }
      onOutletReAttached(contexts) {
        this.contexts = contexts;
      }
      getOrCreateContext(childName) {
        let context = this.getContext(childName);
        if (!context) {
          context = new OutletContext();
          this.contexts.set(childName, context);
        }
        return context;
      }
      getContext(childName) {
        return this.contexts.get(childName) || null;
      }
    }
    ChildrenOutletContexts3.ɵfac = function ChildrenOutletContexts_Factory(t) {
      return new (t || ChildrenOutletContexts3)();
    };
    ChildrenOutletContexts3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: ChildrenOutletContexts3,
      factory: ChildrenOutletContexts3.ɵfac,
      providedIn: "root"
    });
    return ChildrenOutletContexts3;
  })();
  return ChildrenOutletContexts2;
})();
const NG_DEV_MODE$8 = false;
let RouterOutlet = /* @__PURE__ */ (() => {
  let RouterOutlet2 = /* @__PURE__ */ (() => {
    class RouterOutlet3 {
      constructor() {
        this.activated = null;
        this._activatedRoute = null;
        this.name = PRIMARY_OUTLET;
        this.activateEvents = new EventEmitter();
        this.deactivateEvents = new EventEmitter();
        this.attachEvents = new EventEmitter();
        this.detachEvents = new EventEmitter();
        this.parentContexts = inject(ChildrenOutletContexts);
        this.location = inject(ViewContainerRef);
        this.changeDetector = inject(ChangeDetectorRef);
        this.environmentInjector = inject(EnvironmentInjector);
      }
      /** @nodoc */
      ngOnChanges(changes) {
        if (changes["name"]) {
          const {
            firstChange,
            previousValue
          } = changes["name"];
          if (firstChange) {
            return;
          }
          if (this.isTrackedInParentContexts(previousValue)) {
            this.deactivate();
            this.parentContexts.onChildOutletDestroyed(previousValue);
          }
          this.initializeOutletWithName();
        }
      }
      /** @nodoc */
      ngOnDestroy() {
        if (this.isTrackedInParentContexts(this.name)) {
          this.parentContexts.onChildOutletDestroyed(this.name);
        }
      }
      isTrackedInParentContexts(outletName) {
        var _a;
        return ((_a = this.parentContexts.getContext(outletName)) === null || _a === void 0 ? void 0 : _a.outlet) === this;
      }
      /** @nodoc */
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        this.parentContexts.onChildOutletCreated(this.name, this);
        if (this.activated) {
          return;
        }
        const context = this.parentContexts.getContext(this.name);
        if (context === null || context === void 0 ? void 0 : context.route) {
          if (context.attachRef) {
            this.attach(context.attachRef, context.route);
          } else {
            this.activateWith(context.route, context.injector);
          }
        }
      }
      get isActivated() {
        return !!this.activated;
      }
      /**
       * @returns The currently activated component instance.
       * @throws An error if the outlet is not activated.
       */
      get component() {
        if (!this.activated)
          throw new RuntimeError(4012, NG_DEV_MODE$8 && "Outlet is not activated");
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated)
          throw new RuntimeError(4012, NG_DEV_MODE$8 && "Outlet is not activated");
        return this._activatedRoute;
      }
      get activatedRouteData() {
        if (this._activatedRoute) {
          return this._activatedRoute.snapshot.data;
        }
        return {};
      }
      /**
       * Called when the `RouteReuseStrategy` instructs to detach the subtree
       */
      detach() {
        if (!this.activated)
          throw new RuntimeError(4012, NG_DEV_MODE$8 && "Outlet is not activated");
        this.location.detach();
        const cmp = this.activated;
        this.activated = null;
        this._activatedRoute = null;
        this.detachEvents.emit(cmp.instance);
        return cmp;
      }
      /**
       * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
       */
      attach(ref, activatedRoute) {
        this.activated = ref;
        this._activatedRoute = activatedRoute;
        this.location.insert(ref.hostView);
        this.attachEvents.emit(ref.instance);
      }
      deactivate() {
        if (this.activated) {
          const c = this.component;
          this.activated.destroy();
          this.activated = null;
          this._activatedRoute = null;
          this.deactivateEvents.emit(c);
        }
      }
      activateWith(activatedRoute, resolverOrInjector) {
        if (this.isActivated) {
          throw new RuntimeError(4013, NG_DEV_MODE$8 && "Cannot activate an already activated outlet");
        }
        this._activatedRoute = activatedRoute;
        const location2 = this.location;
        const snapshot = activatedRoute.snapshot;
        const component = snapshot.component;
        const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
        const injector = new OutletInjector(activatedRoute, childContexts, location2.injector);
        if (resolverOrInjector && isComponentFactoryResolver(resolverOrInjector)) {
          const factory = resolverOrInjector.resolveComponentFactory(component);
          this.activated = location2.createComponent(factory, location2.length, injector);
        } else {
          const environmentInjector = resolverOrInjector !== null && resolverOrInjector !== void 0 ? resolverOrInjector : this.environmentInjector;
          this.activated = location2.createComponent(component, {
            index: location2.length,
            injector,
            environmentInjector
          });
        }
        this.changeDetector.markForCheck();
        this.activateEvents.emit(this.activated.instance);
      }
    }
    RouterOutlet3.ɵfac = function RouterOutlet_Factory(t) {
      return new (t || RouterOutlet3)();
    };
    RouterOutlet3.ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
      type: RouterOutlet3,
      selectors: [["router-outlet"]],
      inputs: {
        name: "name"
      },
      outputs: {
        activateEvents: "activate",
        deactivateEvents: "deactivate",
        attachEvents: "attach",
        detachEvents: "detach"
      },
      exportAs: ["outlet"],
      standalone: true,
      features: [ɵɵNgOnChangesFeature]
    });
    return RouterOutlet3;
  })();
  return RouterOutlet2;
})();
class OutletInjector {
  constructor(route, childContexts, parent) {
    this.route = route;
    this.childContexts = childContexts;
    this.parent = parent;
  }
  get(token, notFoundValue) {
    if (token === ActivatedRoute) {
      return this.route;
    }
    if (token === ChildrenOutletContexts) {
      return this.childContexts;
    }
    return this.parent.get(token, notFoundValue);
  }
}
function isComponentFactoryResolver(item) {
  return !!item.resolveComponentFactory;
}
let ɵEmptyOutletComponent = /* @__PURE__ */ (() => {
  let ɵEmptyOutletComponent2 = /* @__PURE__ */ (() => {
    class ɵEmptyOutletComponent3 {
    }
    ɵEmptyOutletComponent3.ɵfac = function ɵEmptyOutletComponent_Factory(t) {
      return new (t || ɵEmptyOutletComponent3)();
    };
    ɵEmptyOutletComponent3.ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
      type: ɵEmptyOutletComponent3,
      selectors: [["ng-component"]],
      standalone: true,
      features: [ɵɵStandaloneFeature],
      decls: 1,
      vars: 0,
      template: function ɵEmptyOutletComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelement(0, "router-outlet");
        }
      },
      dependencies: [RouterOutlet],
      encapsulation: 2
    });
    return ɵEmptyOutletComponent3;
  })();
  return ɵEmptyOutletComponent2;
})();
function getOrCreateRouteInjectorIfNeeded(route, currentInjector) {
  var _a;
  if (route.providers && !route._injector) {
    route._injector = createEnvironmentInjector(route.providers, currentInjector, `Route: ${route.path}`);
  }
  return (_a = route._injector) !== null && _a !== void 0 ? _a : currentInjector;
}
function validateConfig(config, parentPath = "", requireStandaloneComponents = false) {
  for (let i = 0; i < config.length; i++) {
    const route = config[i];
    const fullPath = getFullPath(parentPath, route);
    validateNode(route, fullPath, requireStandaloneComponents);
  }
}
function assertStandalone(fullPath, component) {
  if (component && !isStandalone(component)) {
    throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. The component must be standalone.`);
  }
}
function validateNode(route, fullPath, requireStandaloneComponents) {
  if (false) {
    if (!route) {
      throw new RuntimeError(4014, `
      Invalid configuration of route '${fullPath}': Encountered undefined route.
      The reason might be an extra comma.

      Example:
      const routes: Routes = [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'dashboard',  component: DashboardComponent },, << two commas
        { path: 'detail/:id', component: HeroDetailComponent }
      ];
    `);
    }
    if (Array.isArray(route)) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': Array cannot be specified`);
    }
    if (!route.redirectTo && !route.component && !route.loadComponent && !route.children && !route.loadChildren && route.outlet && route.outlet !== PRIMARY_OUTLET) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': a componentless route without children or loadChildren cannot have a named outlet set`);
    }
    if (route.redirectTo && route.children) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and children cannot be used together`);
    }
    if (route.redirectTo && route.loadChildren) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and loadChildren cannot be used together`);
    }
    if (route.children && route.loadChildren) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': children and loadChildren cannot be used together`);
    }
    if (route.redirectTo && (route.component || route.loadComponent)) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and component/loadComponent cannot be used together`);
    }
    if (route.component && route.loadComponent) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': component and loadComponent cannot be used together`);
    }
    if (route.redirectTo && route.canActivate) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and canActivate cannot be used together. Redirects happen before activation so canActivate will never be executed.`);
    }
    if (route.path && route.matcher) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': path and matcher cannot be used together`);
    }
    if (route.redirectTo === void 0 && !route.component && !route.loadComponent && !route.children && !route.loadChildren) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. One of the following must be provided: component, loadComponent, redirectTo, children or loadChildren`);
    }
    if (route.path === void 0 && route.matcher === void 0) {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': routes must have either a path or a matcher specified`);
    }
    if (typeof route.path === "string" && route.path.charAt(0) === "/") {
      throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': path cannot start with a slash`);
    }
    if (route.path === "" && route.redirectTo !== void 0 && route.pathMatch === void 0) {
      const exp = `The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`;
      throw new RuntimeError(4014, `Invalid configuration of route '{path: "${fullPath}", redirectTo: "${route.redirectTo}"}': please provide 'pathMatch'. ${exp}`);
    }
    if (requireStandaloneComponents) {
      assertStandalone(fullPath, route.component);
    }
  }
  if (route.children) {
    validateConfig(route.children, fullPath, requireStandaloneComponents);
  }
}
function getFullPath(parentPath, currentRoute) {
  if (!currentRoute) {
    return parentPath;
  }
  if (!parentPath && !currentRoute.path) {
    return "";
  } else if (parentPath && !currentRoute.path) {
    return `${parentPath}/`;
  } else if (!parentPath && currentRoute.path) {
    return currentRoute.path;
  } else {
    return `${parentPath}/${currentRoute.path}`;
  }
}
function standardizeConfig(r) {
  const children = r.children && r.children.map(standardizeConfig);
  const c = children ? Object.assign(Object.assign({}, r), {
    children
  }) : Object.assign({}, r);
  if (!c.component && !c.loadComponent && (children || c.loadChildren) && c.outlet && c.outlet !== PRIMARY_OUTLET) {
    c.component = ɵEmptyOutletComponent;
  }
  return c;
}
function getOutlet(route) {
  return route.outlet || PRIMARY_OUTLET;
}
function sortByMatchingOutlets(routes2, outletName) {
  const sortedConfig = routes2.filter((r) => getOutlet(r) === outletName);
  sortedConfig.push(...routes2.filter((r) => getOutlet(r) !== outletName));
  return sortedConfig;
}
function getClosestRouteInjector(snapshot) {
  var _a;
  if (!snapshot)
    return null;
  if ((_a = snapshot.routeConfig) === null || _a === void 0 ? void 0 : _a._injector) {
    return snapshot.routeConfig._injector;
  }
  for (let s = snapshot.parent; s; s = s.parent) {
    const route = s.routeConfig;
    if (route === null || route === void 0 ? void 0 : route._loadedInjector)
      return route._loadedInjector;
    if (route === null || route === void 0 ? void 0 : route._injector)
      return route._injector;
  }
  return null;
}
const activateRoutes = (rootContexts, routeReuseStrategy, forwardEvent) => map((t) => {
  new ActivateRoutes(routeReuseStrategy, t.targetRouterState, t.currentRouterState, forwardEvent).activate(rootContexts);
  return t;
});
class ActivateRoutes {
  constructor(routeReuseStrategy, futureState, currState, forwardEvent) {
    this.routeReuseStrategy = routeReuseStrategy;
    this.futureState = futureState;
    this.currState = currState;
    this.forwardEvent = forwardEvent;
  }
  activate(parentContexts) {
    const futureRoot = this.futureState._root;
    const currRoot = this.currState ? this.currState._root : null;
    this.deactivateChildRoutes(futureRoot, currRoot, parentContexts);
    advanceActivatedRoute(this.futureState.root);
    this.activateChildRoutes(futureRoot, currRoot, parentContexts);
  }
  // De-activate the child route that are not re-used for the future state
  deactivateChildRoutes(futureNode, currNode, contexts) {
    const children = nodeChildrenAsMap(currNode);
    futureNode.children.forEach((futureChild) => {
      const childOutletName = futureChild.value.outlet;
      this.deactivateRoutes(futureChild, children[childOutletName], contexts);
      delete children[childOutletName];
    });
    forEach(children, (v, childName) => {
      this.deactivateRouteAndItsChildren(v, contexts);
    });
  }
  deactivateRoutes(futureNode, currNode, parentContext) {
    const future = futureNode.value;
    const curr = currNode ? currNode.value : null;
    if (future === curr) {
      if (future.component) {
        const context = parentContext.getContext(future.outlet);
        if (context) {
          this.deactivateChildRoutes(futureNode, currNode, context.children);
        }
      } else {
        this.deactivateChildRoutes(futureNode, currNode, parentContext);
      }
    } else {
      if (curr) {
        this.deactivateRouteAndItsChildren(currNode, parentContext);
      }
    }
  }
  deactivateRouteAndItsChildren(route, parentContexts) {
    if (route.value.component && this.routeReuseStrategy.shouldDetach(route.value.snapshot)) {
      this.detachAndStoreRouteSubtree(route, parentContexts);
    } else {
      this.deactivateRouteAndOutlet(route, parentContexts);
    }
  }
  detachAndStoreRouteSubtree(route, parentContexts) {
    const context = parentContexts.getContext(route.value.outlet);
    const contexts = context && route.value.component ? context.children : parentContexts;
    const children = nodeChildrenAsMap(route);
    for (const childOutlet of Object.keys(children)) {
      this.deactivateRouteAndItsChildren(children[childOutlet], contexts);
    }
    if (context && context.outlet) {
      const componentRef = context.outlet.detach();
      const contexts2 = context.children.onOutletDeactivated();
      this.routeReuseStrategy.store(route.value.snapshot, {
        componentRef,
        route,
        contexts: contexts2
      });
    }
  }
  deactivateRouteAndOutlet(route, parentContexts) {
    const context = parentContexts.getContext(route.value.outlet);
    const contexts = context && route.value.component ? context.children : parentContexts;
    const children = nodeChildrenAsMap(route);
    for (const childOutlet of Object.keys(children)) {
      this.deactivateRouteAndItsChildren(children[childOutlet], contexts);
    }
    if (context && context.outlet) {
      context.outlet.deactivate();
      context.children.onOutletDeactivated();
      context.attachRef = null;
      context.resolver = null;
      context.route = null;
    }
  }
  activateChildRoutes(futureNode, currNode, contexts) {
    const children = nodeChildrenAsMap(currNode);
    futureNode.children.forEach((c) => {
      this.activateRoutes(c, children[c.value.outlet], contexts);
      this.forwardEvent(new ActivationEnd(c.value.snapshot));
    });
    if (futureNode.children.length) {
      this.forwardEvent(new ChildActivationEnd(futureNode.value.snapshot));
    }
  }
  activateRoutes(futureNode, currNode, parentContexts) {
    var _a;
    const future = futureNode.value;
    const curr = currNode ? currNode.value : null;
    advanceActivatedRoute(future);
    if (future === curr) {
      if (future.component) {
        const context = parentContexts.getOrCreateContext(future.outlet);
        this.activateChildRoutes(futureNode, currNode, context.children);
      } else {
        this.activateChildRoutes(futureNode, currNode, parentContexts);
      }
    } else {
      if (future.component) {
        const context = parentContexts.getOrCreateContext(future.outlet);
        if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
          const stored = this.routeReuseStrategy.retrieve(future.snapshot);
          this.routeReuseStrategy.store(future.snapshot, null);
          context.children.onOutletReAttached(stored.contexts);
          context.attachRef = stored.componentRef;
          context.route = stored.route.value;
          if (context.outlet) {
            context.outlet.attach(stored.componentRef, stored.route.value);
          }
          advanceActivatedRoute(stored.route.value);
          this.activateChildRoutes(futureNode, null, context.children);
        } else {
          const injector = getClosestRouteInjector(future.snapshot);
          const cmpFactoryResolver = (_a = injector === null || injector === void 0 ? void 0 : injector.get(ComponentFactoryResolver$1)) !== null && _a !== void 0 ? _a : null;
          context.attachRef = null;
          context.route = future;
          context.resolver = cmpFactoryResolver;
          context.injector = injector;
          if (context.outlet) {
            context.outlet.activateWith(future, context.injector);
          }
          this.activateChildRoutes(futureNode, null, context.children);
        }
      } else {
        this.activateChildRoutes(futureNode, null, parentContexts);
      }
    }
  }
}
class CanActivate {
  constructor(path) {
    this.path = path;
    this.route = this.path[this.path.length - 1];
  }
}
class CanDeactivate {
  constructor(component, route) {
    this.component = component;
    this.route = route;
  }
}
function getAllRouteGuards(future, curr, parentContexts) {
  const futureRoot = future._root;
  const currRoot = curr ? curr._root : null;
  return getChildRouteGuards(futureRoot, currRoot, parentContexts, [futureRoot.value]);
}
function getCanActivateChild(p) {
  const canActivateChild = p.routeConfig ? p.routeConfig.canActivateChild : null;
  if (!canActivateChild || canActivateChild.length === 0)
    return null;
  return {
    node: p,
    guards: canActivateChild
  };
}
function getTokenOrFunctionIdentity(tokenOrFunction, injector) {
  const NOT_FOUND2 = Symbol();
  const result = injector.get(tokenOrFunction, NOT_FOUND2);
  if (result === NOT_FOUND2) {
    if (typeof tokenOrFunction === "function" && !isInjectable(tokenOrFunction)) {
      return tokenOrFunction;
    } else {
      return injector.get(tokenOrFunction);
    }
  }
  return result;
}
function getChildRouteGuards(futureNode, currNode, contexts, futurePath, checks = {
  canDeactivateChecks: [],
  canActivateChecks: []
}) {
  const prevChildren = nodeChildrenAsMap(currNode);
  futureNode.children.forEach((c) => {
    getRouteGuards(c, prevChildren[c.value.outlet], contexts, futurePath.concat([c.value]), checks);
    delete prevChildren[c.value.outlet];
  });
  forEach(prevChildren, (v, k) => deactivateRouteAndItsChildren(v, contexts.getContext(k), checks));
  return checks;
}
function getRouteGuards(futureNode, currNode, parentContexts, futurePath, checks = {
  canDeactivateChecks: [],
  canActivateChecks: []
}) {
  const future = futureNode.value;
  const curr = currNode ? currNode.value : null;
  const context = parentContexts ? parentContexts.getContext(futureNode.value.outlet) : null;
  if (curr && future.routeConfig === curr.routeConfig) {
    const shouldRun = shouldRunGuardsAndResolvers(curr, future, future.routeConfig.runGuardsAndResolvers);
    if (shouldRun) {
      checks.canActivateChecks.push(new CanActivate(futurePath));
    } else {
      future.data = curr.data;
      future._resolvedData = curr._resolvedData;
    }
    if (future.component) {
      getChildRouteGuards(futureNode, currNode, context ? context.children : null, futurePath, checks);
    } else {
      getChildRouteGuards(futureNode, currNode, parentContexts, futurePath, checks);
    }
    if (shouldRun && context && context.outlet && context.outlet.isActivated) {
      checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, curr));
    }
  } else {
    if (curr) {
      deactivateRouteAndItsChildren(currNode, context, checks);
    }
    checks.canActivateChecks.push(new CanActivate(futurePath));
    if (future.component) {
      getChildRouteGuards(futureNode, null, context ? context.children : null, futurePath, checks);
    } else {
      getChildRouteGuards(futureNode, null, parentContexts, futurePath, checks);
    }
  }
  return checks;
}
function shouldRunGuardsAndResolvers(curr, future, mode) {
  if (typeof mode === "function") {
    return mode(curr, future);
  }
  switch (mode) {
    case "pathParamsChange":
      return !equalPath(curr.url, future.url);
    case "pathParamsOrQueryParamsChange":
      return !equalPath(curr.url, future.url) || !shallowEqual(curr.queryParams, future.queryParams);
    case "always":
      return true;
    case "paramsOrQueryParamsChange":
      return !equalParamsAndUrlSegments(curr, future) || !shallowEqual(curr.queryParams, future.queryParams);
    case "paramsChange":
    default:
      return !equalParamsAndUrlSegments(curr, future);
  }
}
function deactivateRouteAndItsChildren(route, context, checks) {
  const children = nodeChildrenAsMap(route);
  const r = route.value;
  forEach(children, (node, childName) => {
    if (!r.component) {
      deactivateRouteAndItsChildren(node, context, checks);
    } else if (context) {
      deactivateRouteAndItsChildren(node, context.children.getContext(childName), checks);
    } else {
      deactivateRouteAndItsChildren(node, null, checks);
    }
  });
  if (!r.component) {
    checks.canDeactivateChecks.push(new CanDeactivate(null, r));
  } else if (context && context.outlet && context.outlet.isActivated) {
    checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, r));
  } else {
    checks.canDeactivateChecks.push(new CanDeactivate(null, r));
  }
}
function isFunction(v) {
  return typeof v === "function";
}
function isBoolean(v) {
  return typeof v === "boolean";
}
function isCanLoad(guard) {
  return guard && isFunction(guard.canLoad);
}
function isCanActivate(guard) {
  return guard && isFunction(guard.canActivate);
}
function isCanActivateChild(guard) {
  return guard && isFunction(guard.canActivateChild);
}
function isCanDeactivate(guard) {
  return guard && isFunction(guard.canDeactivate);
}
function isCanMatch(guard) {
  return guard && isFunction(guard.canMatch);
}
function isEmptyError(e) {
  return e instanceof EmptyError || (e === null || e === void 0 ? void 0 : e.name) === "EmptyError";
}
const INITIAL_VALUE = /* @__PURE__ */ Symbol("INITIAL_VALUE");
function prioritizedGuardValue() {
  return switchMap((obs) => {
    return combineLatest(obs.map((o) => o.pipe(take(1), startWith(INITIAL_VALUE)))).pipe(map((results) => {
      for (const result of results) {
        if (result === true) {
          continue;
        } else if (result === INITIAL_VALUE) {
          return INITIAL_VALUE;
        } else if (result === false || result instanceof UrlTree) {
          return result;
        }
      }
      return true;
    }), filter((item) => item !== INITIAL_VALUE), take(1));
  });
}
function checkGuards(injector, forwardEvent) {
  return mergeMap((t) => {
    const {
      targetSnapshot,
      currentSnapshot,
      guards: {
        canActivateChecks,
        canDeactivateChecks
      }
    } = t;
    if (canDeactivateChecks.length === 0 && canActivateChecks.length === 0) {
      return of(Object.assign(Object.assign({}, t), {
        guardsResult: true
      }));
    }
    return runCanDeactivateChecks(canDeactivateChecks, targetSnapshot, currentSnapshot, injector).pipe(mergeMap((canDeactivate) => {
      return canDeactivate && isBoolean(canDeactivate) ? runCanActivateChecks(targetSnapshot, canActivateChecks, injector, forwardEvent) : of(canDeactivate);
    }), map((guardsResult) => Object.assign(Object.assign({}, t), {
      guardsResult
    })));
  });
}
function runCanDeactivateChecks(checks, futureRSS, currRSS, injector) {
  return from(checks).pipe(mergeMap((check) => runCanDeactivate(check.component, check.route, currRSS, futureRSS, injector)), first((result) => {
    return result !== true;
  }, true));
}
function runCanActivateChecks(futureSnapshot, checks, injector, forwardEvent) {
  return from(checks).pipe(concatMap((check) => {
    return concat(fireChildActivationStart(check.route.parent, forwardEvent), fireActivationStart(check.route, forwardEvent), runCanActivateChild(futureSnapshot, check.path, injector), runCanActivate(futureSnapshot, check.route, injector));
  }), first((result) => {
    return result !== true;
  }, true));
}
function fireActivationStart(snapshot, forwardEvent) {
  if (snapshot !== null && forwardEvent) {
    forwardEvent(new ActivationStart(snapshot));
  }
  return of(true);
}
function fireChildActivationStart(snapshot, forwardEvent) {
  if (snapshot !== null && forwardEvent) {
    forwardEvent(new ChildActivationStart(snapshot));
  }
  return of(true);
}
function runCanActivate(futureRSS, futureARS, injector) {
  const canActivate = futureARS.routeConfig ? futureARS.routeConfig.canActivate : null;
  if (!canActivate || canActivate.length === 0)
    return of(true);
  const canActivateObservables = canActivate.map((canActivate2) => {
    return defer(() => {
      var _a;
      const closestInjector = (_a = getClosestRouteInjector(futureARS)) !== null && _a !== void 0 ? _a : injector;
      const guard = getTokenOrFunctionIdentity(canActivate2, closestInjector);
      const guardVal = isCanActivate(guard) ? guard.canActivate(futureARS, futureRSS) : closestInjector.runInContext(() => guard(futureARS, futureRSS));
      return wrapIntoObservable(guardVal).pipe(first());
    });
  });
  return of(canActivateObservables).pipe(prioritizedGuardValue());
}
function runCanActivateChild(futureRSS, path, injector) {
  const futureARS = path[path.length - 1];
  const canActivateChildGuards = path.slice(0, path.length - 1).reverse().map((p) => getCanActivateChild(p)).filter((_) => _ !== null);
  const canActivateChildGuardsMapped = canActivateChildGuards.map((d) => {
    return defer(() => {
      const guardsMapped = d.guards.map((canActivateChild) => {
        var _a;
        const closestInjector = (_a = getClosestRouteInjector(d.node)) !== null && _a !== void 0 ? _a : injector;
        const guard = getTokenOrFunctionIdentity(canActivateChild, closestInjector);
        const guardVal = isCanActivateChild(guard) ? guard.canActivateChild(futureARS, futureRSS) : closestInjector.runInContext(() => guard(futureARS, futureRSS));
        return wrapIntoObservable(guardVal).pipe(first());
      });
      return of(guardsMapped).pipe(prioritizedGuardValue());
    });
  });
  return of(canActivateChildGuardsMapped).pipe(prioritizedGuardValue());
}
function runCanDeactivate(component, currARS, currRSS, futureRSS, injector) {
  const canDeactivate = currARS && currARS.routeConfig ? currARS.routeConfig.canDeactivate : null;
  if (!canDeactivate || canDeactivate.length === 0)
    return of(true);
  const canDeactivateObservables = canDeactivate.map((c) => {
    var _a;
    const closestInjector = (_a = getClosestRouteInjector(currARS)) !== null && _a !== void 0 ? _a : injector;
    const guard = getTokenOrFunctionIdentity(c, closestInjector);
    const guardVal = isCanDeactivate(guard) ? guard.canDeactivate(component, currARS, currRSS, futureRSS) : closestInjector.runInContext(() => guard(component, currARS, currRSS, futureRSS));
    return wrapIntoObservable(guardVal).pipe(first());
  });
  return of(canDeactivateObservables).pipe(prioritizedGuardValue());
}
function runCanLoadGuards(injector, route, segments, urlSerializer) {
  const canLoad = route.canLoad;
  if (canLoad === void 0 || canLoad.length === 0) {
    return of(true);
  }
  const canLoadObservables = canLoad.map((injectionToken) => {
    const guard = getTokenOrFunctionIdentity(injectionToken, injector);
    const guardVal = isCanLoad(guard) ? guard.canLoad(route, segments) : injector.runInContext(() => guard(route, segments));
    return wrapIntoObservable(guardVal);
  });
  return of(canLoadObservables).pipe(prioritizedGuardValue(), redirectIfUrlTree(urlSerializer));
}
function redirectIfUrlTree(urlSerializer) {
  return pipe(tap((result) => {
    if (!isUrlTree(result))
      return;
    throw redirectingNavigationError(urlSerializer, result);
  }), map((result) => result === true));
}
function runCanMatchGuards(injector, route, segments, urlSerializer) {
  const canMatch = route.canMatch;
  if (!canMatch || canMatch.length === 0)
    return of(true);
  const canMatchObservables = canMatch.map((injectionToken) => {
    const guard = getTokenOrFunctionIdentity(injectionToken, injector);
    const guardVal = isCanMatch(guard) ? guard.canMatch(route, segments) : injector.runInContext(() => guard(route, segments));
    return wrapIntoObservable(guardVal);
  });
  return of(canMatchObservables).pipe(prioritizedGuardValue(), redirectIfUrlTree(urlSerializer));
}
const noMatch$1 = {
  matched: false,
  consumedSegments: [],
  remainingSegments: [],
  parameters: {},
  positionalParamSegments: {}
};
function matchWithChecks(segmentGroup, route, segments, injector, urlSerializer) {
  const result = match(segmentGroup, route, segments);
  if (!result.matched) {
    return of(result);
  }
  injector = getOrCreateRouteInjectorIfNeeded(route, injector);
  return runCanMatchGuards(injector, route, segments, urlSerializer).pipe(map((v) => v === true ? result : Object.assign({}, noMatch$1)));
}
function match(segmentGroup, route, segments) {
  var _a;
  if (route.path === "") {
    if (route.pathMatch === "full" && (segmentGroup.hasChildren() || segments.length > 0)) {
      return Object.assign({}, noMatch$1);
    }
    return {
      matched: true,
      consumedSegments: [],
      remainingSegments: segments,
      parameters: {},
      positionalParamSegments: {}
    };
  }
  const matcher = route.matcher || defaultUrlMatcher;
  const res = matcher(segments, segmentGroup, route);
  if (!res)
    return Object.assign({}, noMatch$1);
  const posParams = {};
  forEach(res.posParams, (v, k) => {
    posParams[k] = v.path;
  });
  const parameters = res.consumed.length > 0 ? Object.assign(Object.assign({}, posParams), res.consumed[res.consumed.length - 1].parameters) : posParams;
  return {
    matched: true,
    consumedSegments: res.consumed,
    remainingSegments: segments.slice(res.consumed.length),
    // TODO(atscott): investigate combining parameters and positionalParamSegments
    parameters,
    positionalParamSegments: (_a = res.posParams) !== null && _a !== void 0 ? _a : {}
  };
}
function split(segmentGroup, consumedSegments, slicedSegments, config) {
  if (slicedSegments.length > 0 && containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config)) {
    const s2 = new UrlSegmentGroup(consumedSegments, createChildrenForEmptyPaths(segmentGroup, consumedSegments, config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
    s2._sourceSegment = segmentGroup;
    s2._segmentIndexShift = consumedSegments.length;
    return {
      segmentGroup: s2,
      slicedSegments: []
    };
  }
  if (slicedSegments.length === 0 && containsEmptyPathMatches(segmentGroup, slicedSegments, config)) {
    const s2 = new UrlSegmentGroup(segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, consumedSegments, slicedSegments, config, segmentGroup.children));
    s2._sourceSegment = segmentGroup;
    s2._segmentIndexShift = consumedSegments.length;
    return {
      segmentGroup: s2,
      slicedSegments
    };
  }
  const s = new UrlSegmentGroup(segmentGroup.segments, segmentGroup.children);
  s._sourceSegment = segmentGroup;
  s._segmentIndexShift = consumedSegments.length;
  return {
    segmentGroup: s,
    slicedSegments
  };
}
function addEmptyPathsToChildrenIfNeeded(segmentGroup, consumedSegments, slicedSegments, routes2, children) {
  const res = {};
  for (const r of routes2) {
    if (emptyPathMatch(segmentGroup, slicedSegments, r) && !children[getOutlet(r)]) {
      const s = new UrlSegmentGroup([], {});
      s._sourceSegment = segmentGroup;
      s._segmentIndexShift = consumedSegments.length;
      res[getOutlet(r)] = s;
    }
  }
  return Object.assign(Object.assign({}, children), res);
}
function createChildrenForEmptyPaths(segmentGroup, consumedSegments, routes2, primarySegment) {
  const res = {};
  res[PRIMARY_OUTLET] = primarySegment;
  primarySegment._sourceSegment = segmentGroup;
  primarySegment._segmentIndexShift = consumedSegments.length;
  for (const r of routes2) {
    if (r.path === "" && getOutlet(r) !== PRIMARY_OUTLET) {
      const s = new UrlSegmentGroup([], {});
      s._sourceSegment = segmentGroup;
      s._segmentIndexShift = consumedSegments.length;
      res[getOutlet(r)] = s;
    }
  }
  return res;
}
function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes2) {
  return routes2.some((r) => emptyPathMatch(segmentGroup, slicedSegments, r) && getOutlet(r) !== PRIMARY_OUTLET);
}
function containsEmptyPathMatches(segmentGroup, slicedSegments, routes2) {
  return routes2.some((r) => emptyPathMatch(segmentGroup, slicedSegments, r));
}
function emptyPathMatch(segmentGroup, slicedSegments, r) {
  if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === "full") {
    return false;
  }
  return r.path === "";
}
function isImmediateMatch(route, rawSegment, segments, outlet) {
  if (getOutlet(route) !== outlet && (outlet === PRIMARY_OUTLET || !emptyPathMatch(rawSegment, segments, route))) {
    return false;
  }
  if (route.path === "**") {
    return true;
  }
  return match(rawSegment, route, segments).matched;
}
function noLeftoversInUrl(segmentGroup, segments, outlet) {
  return segments.length === 0 && !segmentGroup.children[outlet];
}
const NG_DEV_MODE$7 = false;
class NoMatch$1 {
  constructor(segmentGroup) {
    this.segmentGroup = segmentGroup || null;
  }
}
class AbsoluteRedirect {
  constructor(urlTree) {
    this.urlTree = urlTree;
  }
}
function noMatch(segmentGroup) {
  return throwError$1(new NoMatch$1(segmentGroup));
}
function absoluteRedirect(newTree) {
  return throwError$1(new AbsoluteRedirect(newTree));
}
function namedOutletsRedirect(redirectTo) {
  return throwError$1(new RuntimeError(4e3, NG_DEV_MODE$7 && `Only absolute redirects can have named outlets. redirectTo: '${redirectTo}'`));
}
function canLoadFails(route) {
  return throwError$1(navigationCancelingError(
    NG_DEV_MODE$7 && `Cannot load children because the guard of the route "path: '${route.path}'" returned false`,
    3
    /* NavigationCancellationCode.GuardRejected */
  ));
}
function applyRedirects$1(injector, configLoader, urlSerializer, urlTree, config) {
  return new ApplyRedirects(injector, configLoader, urlSerializer, urlTree, config).apply();
}
class ApplyRedirects {
  constructor(injector, configLoader, urlSerializer, urlTree, config) {
    this.injector = injector;
    this.configLoader = configLoader;
    this.urlSerializer = urlSerializer;
    this.urlTree = urlTree;
    this.config = config;
    this.allowRedirects = true;
  }
  apply() {
    const splitGroup = split(this.urlTree.root, [], [], this.config).segmentGroup;
    const rootSegmentGroup = new UrlSegmentGroup(splitGroup.segments, splitGroup.children);
    const expanded$ = this.expandSegmentGroup(this.injector, this.config, rootSegmentGroup, PRIMARY_OUTLET);
    const urlTrees$ = expanded$.pipe(map((rootSegmentGroup2) => {
      return this.createUrlTree(squashSegmentGroup(rootSegmentGroup2), this.urlTree.queryParams, this.urlTree.fragment);
    }));
    return urlTrees$.pipe(catchError((e) => {
      if (e instanceof AbsoluteRedirect) {
        this.allowRedirects = false;
        return this.match(e.urlTree);
      }
      if (e instanceof NoMatch$1) {
        throw this.noMatchError(e);
      }
      throw e;
    }));
  }
  match(tree2) {
    const expanded$ = this.expandSegmentGroup(this.injector, this.config, tree2.root, PRIMARY_OUTLET);
    const mapped$ = expanded$.pipe(map((rootSegmentGroup) => {
      return this.createUrlTree(squashSegmentGroup(rootSegmentGroup), tree2.queryParams, tree2.fragment);
    }));
    return mapped$.pipe(catchError((e) => {
      if (e instanceof NoMatch$1) {
        throw this.noMatchError(e);
      }
      throw e;
    }));
  }
  noMatchError(e) {
    return new RuntimeError(4002, NG_DEV_MODE$7 && `Cannot match any routes. URL Segment: '${e.segmentGroup}'`);
  }
  createUrlTree(rootCandidate, queryParams, fragment) {
    const root = createRoot(rootCandidate);
    return new UrlTree(root, queryParams, fragment);
  }
  expandSegmentGroup(injector, routes2, segmentGroup, outlet) {
    if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
      return this.expandChildren(injector, routes2, segmentGroup).pipe(map((children) => new UrlSegmentGroup([], children)));
    }
    return this.expandSegment(injector, segmentGroup, routes2, segmentGroup.segments, outlet, true);
  }
  // Recursively expand segment groups for all the child outlets
  expandChildren(injector, routes2, segmentGroup) {
    const childOutlets = [];
    for (const child of Object.keys(segmentGroup.children)) {
      if (child === "primary") {
        childOutlets.unshift(child);
      } else {
        childOutlets.push(child);
      }
    }
    return from(childOutlets).pipe(concatMap((childOutlet) => {
      const child = segmentGroup.children[childOutlet];
      const sortedRoutes = sortByMatchingOutlets(routes2, childOutlet);
      return this.expandSegmentGroup(injector, sortedRoutes, child, childOutlet).pipe(map((s) => ({
        segment: s,
        outlet: childOutlet
      })));
    }), scan((children, expandedChild) => {
      children[expandedChild.outlet] = expandedChild.segment;
      return children;
    }, {}), last$1());
  }
  expandSegment(injector, segmentGroup, routes2, segments, outlet, allowRedirects) {
    return from(routes2).pipe(concatMap((r) => {
      const expanded$ = this.expandSegmentAgainstRoute(injector, segmentGroup, routes2, r, segments, outlet, allowRedirects);
      return expanded$.pipe(catchError((e) => {
        if (e instanceof NoMatch$1) {
          return of(null);
        }
        throw e;
      }));
    }), first((s) => !!s), catchError((e, _) => {
      if (isEmptyError(e)) {
        if (noLeftoversInUrl(segmentGroup, segments, outlet)) {
          return of(new UrlSegmentGroup([], {}));
        }
        return noMatch(segmentGroup);
      }
      throw e;
    }));
  }
  expandSegmentAgainstRoute(injector, segmentGroup, routes2, route, paths, outlet, allowRedirects) {
    if (!isImmediateMatch(route, segmentGroup, paths, outlet)) {
      return noMatch(segmentGroup);
    }
    if (route.redirectTo === void 0) {
      return this.matchSegmentAgainstRoute(injector, segmentGroup, route, paths, outlet);
    }
    if (allowRedirects && this.allowRedirects) {
      return this.expandSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes2, route, paths, outlet);
    }
    return noMatch(segmentGroup);
  }
  expandSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes2, route, segments, outlet) {
    if (route.path === "**") {
      return this.expandWildCardWithParamsAgainstRouteUsingRedirect(injector, routes2, route, outlet);
    }
    return this.expandRegularSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes2, route, segments, outlet);
  }
  expandWildCardWithParamsAgainstRouteUsingRedirect(injector, routes2, route, outlet) {
    const newTree = this.applyRedirectCommands([], route.redirectTo, {});
    if (route.redirectTo.startsWith("/")) {
      return absoluteRedirect(newTree);
    }
    return this.lineralizeSegments(route, newTree).pipe(mergeMap((newSegments) => {
      const group = new UrlSegmentGroup(newSegments, {});
      return this.expandSegment(injector, group, routes2, newSegments, outlet, false);
    }));
  }
  expandRegularSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes2, route, segments, outlet) {
    const {
      matched,
      consumedSegments,
      remainingSegments,
      positionalParamSegments
    } = match(segmentGroup, route, segments);
    if (!matched)
      return noMatch(segmentGroup);
    const newTree = this.applyRedirectCommands(consumedSegments, route.redirectTo, positionalParamSegments);
    if (route.redirectTo.startsWith("/")) {
      return absoluteRedirect(newTree);
    }
    return this.lineralizeSegments(route, newTree).pipe(mergeMap((newSegments) => {
      return this.expandSegment(injector, segmentGroup, routes2, newSegments.concat(remainingSegments), outlet, false);
    }));
  }
  matchSegmentAgainstRoute(injector, rawSegmentGroup, route, segments, outlet) {
    if (route.path === "**") {
      injector = getOrCreateRouteInjectorIfNeeded(route, injector);
      if (route.loadChildren) {
        const loaded$ = route._loadedRoutes ? of({
          routes: route._loadedRoutes,
          injector: route._loadedInjector
        }) : this.configLoader.loadChildren(injector, route);
        return loaded$.pipe(map((cfg) => {
          route._loadedRoutes = cfg.routes;
          route._loadedInjector = cfg.injector;
          return new UrlSegmentGroup(segments, {});
        }));
      }
      return of(new UrlSegmentGroup(segments, {}));
    }
    return matchWithChecks(rawSegmentGroup, route, segments, injector, this.urlSerializer).pipe(switchMap(({
      matched,
      consumedSegments,
      remainingSegments
    }) => {
      var _a;
      if (!matched)
        return noMatch(rawSegmentGroup);
      injector = (_a = route._injector) !== null && _a !== void 0 ? _a : injector;
      const childConfig$ = this.getChildConfig(injector, route, segments);
      return childConfig$.pipe(mergeMap((routerConfig) => {
        var _a2;
        const childInjector = (_a2 = routerConfig.injector) !== null && _a2 !== void 0 ? _a2 : injector;
        const childConfig = routerConfig.routes;
        const {
          segmentGroup: splitSegmentGroup,
          slicedSegments
        } = split(rawSegmentGroup, consumedSegments, remainingSegments, childConfig);
        const segmentGroup = new UrlSegmentGroup(splitSegmentGroup.segments, splitSegmentGroup.children);
        if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
          const expanded$2 = this.expandChildren(childInjector, childConfig, segmentGroup);
          return expanded$2.pipe(map((children) => new UrlSegmentGroup(consumedSegments, children)));
        }
        if (childConfig.length === 0 && slicedSegments.length === 0) {
          return of(new UrlSegmentGroup(consumedSegments, {}));
        }
        const matchedOnOutlet = getOutlet(route) === outlet;
        const expanded$ = this.expandSegment(childInjector, segmentGroup, childConfig, slicedSegments, matchedOnOutlet ? PRIMARY_OUTLET : outlet, true);
        return expanded$.pipe(map((cs) => new UrlSegmentGroup(consumedSegments.concat(cs.segments), cs.children)));
      }));
    }));
  }
  getChildConfig(injector, route, segments) {
    if (route.children) {
      return of({
        routes: route.children,
        injector
      });
    }
    if (route.loadChildren) {
      if (route._loadedRoutes !== void 0) {
        return of({
          routes: route._loadedRoutes,
          injector: route._loadedInjector
        });
      }
      return runCanLoadGuards(injector, route, segments, this.urlSerializer).pipe(mergeMap((shouldLoadResult) => {
        if (shouldLoadResult) {
          return this.configLoader.loadChildren(injector, route).pipe(tap((cfg) => {
            route._loadedRoutes = cfg.routes;
            route._loadedInjector = cfg.injector;
          }));
        }
        return canLoadFails(route);
      }));
    }
    return of({
      routes: [],
      injector
    });
  }
  lineralizeSegments(route, urlTree) {
    let res = [];
    let c = urlTree.root;
    while (true) {
      res = res.concat(c.segments);
      if (c.numberOfChildren === 0) {
        return of(res);
      }
      if (c.numberOfChildren > 1 || !c.children[PRIMARY_OUTLET]) {
        return namedOutletsRedirect(route.redirectTo);
      }
      c = c.children[PRIMARY_OUTLET];
    }
  }
  applyRedirectCommands(segments, redirectTo, posParams) {
    return this.applyRedirectCreateUrlTree(redirectTo, this.urlSerializer.parse(redirectTo), segments, posParams);
  }
  applyRedirectCreateUrlTree(redirectTo, urlTree, segments, posParams) {
    const newRoot = this.createSegmentGroup(redirectTo, urlTree.root, segments, posParams);
    return new UrlTree(newRoot, this.createQueryParams(urlTree.queryParams, this.urlTree.queryParams), urlTree.fragment);
  }
  createQueryParams(redirectToParams, actualParams) {
    const res = {};
    forEach(redirectToParams, (v, k) => {
      const copySourceValue = typeof v === "string" && v.startsWith(":");
      if (copySourceValue) {
        const sourceName = v.substring(1);
        res[k] = actualParams[sourceName];
      } else {
        res[k] = v;
      }
    });
    return res;
  }
  createSegmentGroup(redirectTo, group, segments, posParams) {
    const updatedSegments = this.createSegments(redirectTo, group.segments, segments, posParams);
    let children = {};
    forEach(group.children, (child, name) => {
      children[name] = this.createSegmentGroup(redirectTo, child, segments, posParams);
    });
    return new UrlSegmentGroup(updatedSegments, children);
  }
  createSegments(redirectTo, redirectToSegments, actualSegments, posParams) {
    return redirectToSegments.map((s) => s.path.startsWith(":") ? this.findPosParam(redirectTo, s, posParams) : this.findOrReturn(s, actualSegments));
  }
  findPosParam(redirectTo, redirectToUrlSegment, posParams) {
    const pos = posParams[redirectToUrlSegment.path.substring(1)];
    if (!pos)
      throw new RuntimeError(4001, NG_DEV_MODE$7 && `Cannot redirect to '${redirectTo}'. Cannot find '${redirectToUrlSegment.path}'.`);
    return pos;
  }
  findOrReturn(redirectToUrlSegment, actualSegments) {
    let idx = 0;
    for (const s of actualSegments) {
      if (s.path === redirectToUrlSegment.path) {
        actualSegments.splice(idx);
        return s;
      }
      idx++;
    }
    return redirectToUrlSegment;
  }
}
function applyRedirects(environmentInjector, configLoader, urlSerializer, config) {
  return switchMap((t) => applyRedirects$1(environmentInjector, configLoader, urlSerializer, t.extractedUrl, config).pipe(map((urlAfterRedirects) => Object.assign(Object.assign({}, t), {
    urlAfterRedirects
  }))));
}
const NG_DEV_MODE$6 = false;
class NoMatch {
}
function newObservableError(e) {
  return new Observable((obs) => obs.error(e));
}
function recognize$1(injector, rootComponentType, config, urlTree, url2, urlSerializer, paramsInheritanceStrategy = "emptyOnly") {
  return new Recognizer(injector, rootComponentType, config, urlTree, url2, paramsInheritanceStrategy, urlSerializer).recognize().pipe(switchMap((result) => {
    if (result === null) {
      return newObservableError(new NoMatch());
    } else {
      return of(result);
    }
  }));
}
class Recognizer {
  constructor(injector, rootComponentType, config, urlTree, url2, paramsInheritanceStrategy, urlSerializer) {
    this.injector = injector;
    this.rootComponentType = rootComponentType;
    this.config = config;
    this.urlTree = urlTree;
    this.url = url2;
    this.paramsInheritanceStrategy = paramsInheritanceStrategy;
    this.urlSerializer = urlSerializer;
  }
  recognize() {
    const rootSegmentGroup = split(this.urlTree.root, [], [], this.config.filter((c) => c.redirectTo === void 0)).segmentGroup;
    return this.processSegmentGroup(this.injector, this.config, rootSegmentGroup, PRIMARY_OUTLET).pipe(map((children) => {
      if (children === null) {
        return null;
      }
      const root = new ActivatedRouteSnapshot([], Object.freeze({}), Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, {}, PRIMARY_OUTLET, this.rootComponentType, null, this.urlTree.root, -1, {});
      const rootNode = new TreeNode(root, children);
      const routeState = new RouterStateSnapshot(this.url, rootNode);
      this.inheritParamsAndData(routeState._root);
      return routeState;
    }));
  }
  inheritParamsAndData(routeNode) {
    const route = routeNode.value;
    const i = inheritedParamsDataResolve(route, this.paramsInheritanceStrategy);
    route.params = Object.freeze(i.params);
    route.data = Object.freeze(i.data);
    routeNode.children.forEach((n) => this.inheritParamsAndData(n));
  }
  processSegmentGroup(injector, config, segmentGroup, outlet) {
    if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
      return this.processChildren(injector, config, segmentGroup);
    }
    return this.processSegment(injector, config, segmentGroup, segmentGroup.segments, outlet);
  }
  /**
   * Matches every child outlet in the `segmentGroup` to a `Route` in the config. Returns `null` if
   * we cannot find a match for _any_ of the children.
   *
   * @param config - The `Routes` to match against
   * @param segmentGroup - The `UrlSegmentGroup` whose children need to be matched against the
   *     config.
   */
  processChildren(injector, config, segmentGroup) {
    return from(Object.keys(segmentGroup.children)).pipe(concatMap((childOutlet) => {
      const child = segmentGroup.children[childOutlet];
      const sortedConfig = sortByMatchingOutlets(config, childOutlet);
      return this.processSegmentGroup(injector, sortedConfig, child, childOutlet);
    }), scan((children, outletChildren) => {
      if (!children || !outletChildren)
        return null;
      children.push(...outletChildren);
      return children;
    }), takeWhile((children) => children !== null), defaultIfEmpty(null), last$1(), map((children) => {
      if (children === null)
        return null;
      const mergedChildren = mergeEmptyPathMatches(children);
      if (NG_DEV_MODE$6) {
        checkOutletNameUniqueness(mergedChildren);
      }
      sortActivatedRouteSnapshots(mergedChildren);
      return mergedChildren;
    }));
  }
  processSegment(injector, routes2, segmentGroup, segments, outlet) {
    return from(routes2).pipe(concatMap((r) => {
      var _a;
      return this.processSegmentAgainstRoute((_a = r._injector) !== null && _a !== void 0 ? _a : injector, r, segmentGroup, segments, outlet);
    }), first((x) => !!x), catchError((e) => {
      if (isEmptyError(e)) {
        if (noLeftoversInUrl(segmentGroup, segments, outlet)) {
          return of([]);
        }
        return of(null);
      }
      throw e;
    }));
  }
  processSegmentAgainstRoute(injector, route, rawSegment, segments, outlet) {
    var _a, _b;
    if (route.redirectTo || !isImmediateMatch(route, rawSegment, segments, outlet))
      return of(null);
    let matchResult;
    if (route.path === "**") {
      const params = segments.length > 0 ? last(segments).parameters : {};
      const pathIndexShift = getPathIndexShift(rawSegment) + segments.length;
      const snapshot = new ActivatedRouteSnapshot(segments, params, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, getData(route), getOutlet(route), (_b = (_a = route.component) !== null && _a !== void 0 ? _a : route._loadedComponent) !== null && _b !== void 0 ? _b : null, route, getSourceSegmentGroup(rawSegment), pathIndexShift, getResolve(route));
      matchResult = of({
        snapshot,
        consumedSegments: [],
        remainingSegments: []
      });
    } else {
      matchResult = matchWithChecks(rawSegment, route, segments, injector, this.urlSerializer).pipe(map(({
        matched,
        consumedSegments,
        remainingSegments,
        parameters
      }) => {
        var _a2, _b2;
        if (!matched) {
          return null;
        }
        const pathIndexShift = getPathIndexShift(rawSegment) + consumedSegments.length;
        const snapshot = new ActivatedRouteSnapshot(consumedSegments, parameters, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, getData(route), getOutlet(route), (_b2 = (_a2 = route.component) !== null && _a2 !== void 0 ? _a2 : route._loadedComponent) !== null && _b2 !== void 0 ? _b2 : null, route, getSourceSegmentGroup(rawSegment), pathIndexShift, getResolve(route));
        return {
          snapshot,
          consumedSegments,
          remainingSegments
        };
      }));
    }
    return matchResult.pipe(switchMap((result) => {
      var _a2, _b2;
      if (result === null) {
        return of(null);
      }
      const {
        snapshot,
        consumedSegments,
        remainingSegments
      } = result;
      injector = (_a2 = route._injector) !== null && _a2 !== void 0 ? _a2 : injector;
      const childInjector = (_b2 = route._loadedInjector) !== null && _b2 !== void 0 ? _b2 : injector;
      const childConfig = getChildConfig(route);
      const {
        segmentGroup,
        slicedSegments
      } = split(
        rawSegment,
        consumedSegments,
        remainingSegments,
        // Filter out routes with redirectTo because we are trying to create activated route
        // snapshots and don't handle redirects here. That should have been done in
        // `applyRedirects`.
        childConfig.filter((c) => c.redirectTo === void 0)
      );
      if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
        return this.processChildren(childInjector, childConfig, segmentGroup).pipe(map((children) => {
          if (children === null) {
            return null;
          }
          return [new TreeNode(snapshot, children)];
        }));
      }
      if (childConfig.length === 0 && slicedSegments.length === 0) {
        return of([new TreeNode(snapshot, [])]);
      }
      const matchedOnOutlet = getOutlet(route) === outlet;
      return this.processSegment(childInjector, childConfig, segmentGroup, slicedSegments, matchedOnOutlet ? PRIMARY_OUTLET : outlet).pipe(map((children) => {
        if (children === null) {
          return null;
        }
        return [new TreeNode(snapshot, children)];
      }));
    }));
  }
}
function sortActivatedRouteSnapshots(nodes) {
  nodes.sort((a, b) => {
    if (a.value.outlet === PRIMARY_OUTLET)
      return -1;
    if (b.value.outlet === PRIMARY_OUTLET)
      return 1;
    return a.value.outlet.localeCompare(b.value.outlet);
  });
}
function getChildConfig(route) {
  if (route.children) {
    return route.children;
  }
  if (route.loadChildren) {
    return route._loadedRoutes;
  }
  return [];
}
function hasEmptyPathConfig(node) {
  const config = node.value.routeConfig;
  return config && config.path === "" && config.redirectTo === void 0;
}
function mergeEmptyPathMatches(nodes) {
  const result = [];
  const mergedNodes = /* @__PURE__ */ new Set();
  for (const node of nodes) {
    if (!hasEmptyPathConfig(node)) {
      result.push(node);
      continue;
    }
    const duplicateEmptyPathNode = result.find((resultNode) => node.value.routeConfig === resultNode.value.routeConfig);
    if (duplicateEmptyPathNode !== void 0) {
      duplicateEmptyPathNode.children.push(...node.children);
      mergedNodes.add(duplicateEmptyPathNode);
    } else {
      result.push(node);
    }
  }
  for (const mergedNode of mergedNodes) {
    const mergedChildren = mergeEmptyPathMatches(mergedNode.children);
    result.push(new TreeNode(mergedNode.value, mergedChildren));
  }
  return result.filter((n) => !mergedNodes.has(n));
}
function checkOutletNameUniqueness(nodes) {
  const names = {};
  nodes.forEach((n) => {
    const routeWithSameOutletName = names[n.value.outlet];
    if (routeWithSameOutletName) {
      const p = routeWithSameOutletName.url.map((s) => s.toString()).join("/");
      const c = n.value.url.map((s) => s.toString()).join("/");
      throw new RuntimeError(4006, NG_DEV_MODE$6 && `Two segments cannot have the same outlet name: '${p}' and '${c}'.`);
    }
    names[n.value.outlet] = n.value;
  });
}
function getSourceSegmentGroup(segmentGroup) {
  let s = segmentGroup;
  while (s._sourceSegment) {
    s = s._sourceSegment;
  }
  return s;
}
function getPathIndexShift(segmentGroup) {
  var _a, _b;
  let s = segmentGroup;
  let res = (_a = s._segmentIndexShift) !== null && _a !== void 0 ? _a : 0;
  while (s._sourceSegment) {
    s = s._sourceSegment;
    res += (_b = s._segmentIndexShift) !== null && _b !== void 0 ? _b : 0;
  }
  return res - 1;
}
function getData(route) {
  return route.data || {};
}
function getResolve(route) {
  return route.resolve || {};
}
function recognize(injector, rootComponentType, config, serializer, paramsInheritanceStrategy) {
  return mergeMap((t) => recognize$1(injector, rootComponentType, config, t.urlAfterRedirects, serializer.serialize(t.urlAfterRedirects), serializer, paramsInheritanceStrategy).pipe(map((targetSnapshot) => Object.assign(Object.assign({}, t), {
    targetSnapshot
  }))));
}
function resolveData(paramsInheritanceStrategy, injector) {
  return mergeMap((t) => {
    const {
      targetSnapshot,
      guards: {
        canActivateChecks
      }
    } = t;
    if (!canActivateChecks.length) {
      return of(t);
    }
    let canActivateChecksResolved = 0;
    return from(canActivateChecks).pipe(concatMap((check) => runResolve(check.route, targetSnapshot, paramsInheritanceStrategy, injector)), tap(() => canActivateChecksResolved++), takeLast(1), mergeMap((_) => canActivateChecksResolved === canActivateChecks.length ? of(t) : EMPTY));
  });
}
function runResolve(futureARS, futureRSS, paramsInheritanceStrategy, injector) {
  const config = futureARS.routeConfig;
  const resolve = futureARS._resolve;
  if ((config === null || config === void 0 ? void 0 : config.title) !== void 0 && !hasStaticTitle(config)) {
    resolve[RouteTitleKey] = config.title;
  }
  return resolveNode(resolve, futureARS, futureRSS, injector).pipe(map((resolvedData) => {
    futureARS._resolvedData = resolvedData;
    futureARS.data = inheritedParamsDataResolve(futureARS, paramsInheritanceStrategy).resolve;
    if (config && hasStaticTitle(config)) {
      futureARS.data[RouteTitleKey] = config.title;
    }
    return null;
  }));
}
function resolveNode(resolve, futureARS, futureRSS, injector) {
  const keys = getDataKeys(resolve);
  if (keys.length === 0) {
    return of({});
  }
  const data = {};
  return from(keys).pipe(mergeMap((key) => getResolver(resolve[key], futureARS, futureRSS, injector).pipe(first(), tap((value) => {
    data[key] = value;
  }))), takeLast(1), mapTo(data), catchError((e) => isEmptyError(e) ? EMPTY : throwError$1(e)));
}
function getDataKeys(obj) {
  return [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
}
function getResolver(injectionToken, futureARS, futureRSS, injector) {
  var _a;
  const closestInjector = (_a = getClosestRouteInjector(futureARS)) !== null && _a !== void 0 ? _a : injector;
  const resolver = getTokenOrFunctionIdentity(injectionToken, closestInjector);
  const resolverValue = resolver.resolve ? resolver.resolve(futureARS, futureRSS) : closestInjector.runInContext(() => resolver(futureARS, futureRSS));
  return wrapIntoObservable(resolverValue);
}
function hasStaticTitle(config) {
  return typeof config.title === "string" || config.title === null;
}
function switchTap(next) {
  return switchMap((v) => {
    const nextResult = next(v);
    if (nextResult) {
      return from(nextResult).pipe(map(() => v));
    }
    return of(v);
  });
}
function deprecatedLoadChildrenString(injector, loadChildren) {
  return null;
}
const NG_DEV_MODE$5 = false;
const ROUTES = /* @__PURE__ */ new InjectionToken("ROUTES");
let RouterConfigLoader = /* @__PURE__ */ (() => {
  let RouterConfigLoader2 = /* @__PURE__ */ (() => {
    class RouterConfigLoader3 {
      constructor(injector, compiler) {
        this.injector = injector;
        this.compiler = compiler;
        this.componentLoaders = /* @__PURE__ */ new WeakMap();
        this.childrenLoaders = /* @__PURE__ */ new WeakMap();
      }
      loadComponent(route) {
        if (this.componentLoaders.get(route)) {
          return this.componentLoaders.get(route);
        } else if (route._loadedComponent) {
          return of(route._loadedComponent);
        }
        if (this.onLoadStartListener) {
          this.onLoadStartListener(route);
        }
        const loadRunner = wrapIntoObservable(route.loadComponent()).pipe(map(maybeUnwrapDefaultExport), tap((component) => {
          var _a;
          if (this.onLoadEndListener) {
            this.onLoadEndListener(route);
          }
          NG_DEV_MODE$5 && assertStandalone((_a = route.path) !== null && _a !== void 0 ? _a : "", component);
          route._loadedComponent = component;
        }), finalize(() => {
          this.componentLoaders.delete(route);
        }));
        const loader = new ConnectableObservable(loadRunner, () => new Subject()).pipe(refCount());
        this.componentLoaders.set(route, loader);
        return loader;
      }
      loadChildren(parentInjector, route) {
        if (this.childrenLoaders.get(route)) {
          return this.childrenLoaders.get(route);
        } else if (route._loadedRoutes) {
          return of({
            routes: route._loadedRoutes,
            injector: route._loadedInjector
          });
        }
        if (this.onLoadStartListener) {
          this.onLoadStartListener(route);
        }
        const moduleFactoryOrRoutes$ = this.loadModuleFactoryOrRoutes(route.loadChildren);
        const loadRunner = moduleFactoryOrRoutes$.pipe(map((factoryOrRoutes) => {
          if (this.onLoadEndListener) {
            this.onLoadEndListener(route);
          }
          let injector;
          let rawRoutes;
          let requireStandaloneComponents = false;
          if (Array.isArray(factoryOrRoutes)) {
            rawRoutes = factoryOrRoutes;
            requireStandaloneComponents = true;
          } else {
            injector = factoryOrRoutes.create(parentInjector).injector;
            rawRoutes = flatten(injector.get(ROUTES, [], InjectFlags.Self | InjectFlags.Optional));
          }
          const routes2 = rawRoutes.map(standardizeConfig);
          NG_DEV_MODE$5 && validateConfig(routes2, route.path, requireStandaloneComponents);
          return {
            routes: routes2,
            injector
          };
        }), finalize(() => {
          this.childrenLoaders.delete(route);
        }));
        const loader = new ConnectableObservable(loadRunner, () => new Subject()).pipe(refCount());
        this.childrenLoaders.set(route, loader);
        return loader;
      }
      loadModuleFactoryOrRoutes(loadChildren) {
        deprecatedLoadChildrenString(this.injector);
        return wrapIntoObservable(loadChildren()).pipe(map(maybeUnwrapDefaultExport), mergeMap((t) => {
          if (t instanceof NgModuleFactory$1 || Array.isArray(t)) {
            return of(t);
          } else {
            return from(this.compiler.compileModuleAsync(t));
          }
        }));
      }
    }
    RouterConfigLoader3.ɵfac = function RouterConfigLoader_Factory(t) {
      return new (t || RouterConfigLoader3)(ɵɵinject(Injector), ɵɵinject(Compiler));
    };
    RouterConfigLoader3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: RouterConfigLoader3,
      factory: RouterConfigLoader3.ɵfac,
      providedIn: "root"
    });
    return RouterConfigLoader3;
  })();
  return RouterConfigLoader2;
})();
function isWrappedDefaultExport(value) {
  return value && typeof value === "object" && "default" in value;
}
function maybeUnwrapDefaultExport(input) {
  return isWrappedDefaultExport(input) ? input["default"] : input;
}
const NG_DEV_MODE$4 = false;
let NavigationTransitions = /* @__PURE__ */ (() => {
  let NavigationTransitions2 = /* @__PURE__ */ (() => {
    class NavigationTransitions3 {
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      constructor() {
        this.currentNavigation = null;
        this.lastSuccessfulNavigation = null;
        this.events = new Subject();
        this.configLoader = inject(RouterConfigLoader);
        this.environmentInjector = inject(EnvironmentInjector);
        this.urlSerializer = inject(UrlSerializer);
        this.rootContexts = inject(ChildrenOutletContexts);
        this.navigationId = 0;
        this.afterPreactivation = () => of(void 0);
        this.rootComponentType = null;
        const onLoadStart = (r) => this.events.next(new RouteConfigLoadStart(r));
        const onLoadEnd = (r) => this.events.next(new RouteConfigLoadEnd(r));
        this.configLoader.onLoadEndListener = onLoadEnd;
        this.configLoader.onLoadStartListener = onLoadStart;
      }
      complete() {
        var _a;
        (_a = this.transitions) === null || _a === void 0 ? void 0 : _a.complete();
      }
      handleNavigationRequest(request) {
        var _a;
        const id = ++this.navigationId;
        (_a = this.transitions) === null || _a === void 0 ? void 0 : _a.next(Object.assign(Object.assign(Object.assign({}, this.transitions.value), request), {
          id
        }));
      }
      setupNavigations(router) {
        this.transitions = new BehaviorSubject({
          id: 0,
          targetPageId: 0,
          currentUrlTree: router.currentUrlTree,
          currentRawUrl: router.currentUrlTree,
          extractedUrl: router.urlHandlingStrategy.extract(router.currentUrlTree),
          urlAfterRedirects: router.urlHandlingStrategy.extract(router.currentUrlTree),
          rawUrl: router.currentUrlTree,
          extras: {},
          resolve: null,
          reject: null,
          promise: Promise.resolve(true),
          source: IMPERATIVE_NAVIGATION,
          restoredState: null,
          currentSnapshot: router.routerState.snapshot,
          targetSnapshot: null,
          currentRouterState: router.routerState,
          targetRouterState: null,
          guards: {
            canActivateChecks: [],
            canDeactivateChecks: []
          },
          guardsResult: null
        });
        return this.transitions.pipe(
          filter((t) => t.id !== 0),
          // Extract URL
          map((t) => Object.assign(Object.assign({}, t), {
            extractedUrl: router.urlHandlingStrategy.extract(t.rawUrl)
          })),
          // Using switchMap so we cancel executing navigations when a new one comes in
          switchMap((overallTransitionState) => {
            let completed = false;
            let errored = false;
            return of(overallTransitionState).pipe(
              // Store the Navigation object
              tap((t) => {
                this.currentNavigation = {
                  id: t.id,
                  initialUrl: t.rawUrl,
                  extractedUrl: t.extractedUrl,
                  trigger: t.source,
                  extras: t.extras,
                  previousNavigation: !this.lastSuccessfulNavigation ? null : Object.assign(Object.assign({}, this.lastSuccessfulNavigation), {
                    previousNavigation: null
                  })
                };
              }),
              switchMap((t) => {
                var _a;
                const browserUrlTree = router.browserUrlTree.toString();
                const urlTransition = !router.navigated || t.extractedUrl.toString() !== browserUrlTree || // Navigations which succeed or ones which fail and are cleaned up
                // correctly should result in `browserUrlTree` and `currentUrlTree`
                // matching. If this is not the case, assume something went wrong and
                // try processing the URL again.
                browserUrlTree !== router.currentUrlTree.toString();
                const onSameUrlNavigation = (_a = t.extras.onSameUrlNavigation) !== null && _a !== void 0 ? _a : router.onSameUrlNavigation;
                if (!urlTransition && onSameUrlNavigation !== "reload") {
                  const reason = NG_DEV_MODE$4 ? `Navigation to ${t.rawUrl} was ignored because it is the same as the current Router URL.` : "";
                  this.events.next(new NavigationSkipped(
                    t.id,
                    router.serializeUrl(overallTransitionState.rawUrl),
                    reason,
                    0
                    /* NavigationSkippedCode.IgnoredSameUrlNavigation */
                  ));
                  router.rawUrlTree = t.rawUrl;
                  t.resolve(null);
                  return EMPTY;
                }
                if (router.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)) {
                  if (isBrowserTriggeredNavigation(t.source)) {
                    router.browserUrlTree = t.extractedUrl;
                  }
                  return of(t).pipe(
                    // Fire NavigationStart event
                    switchMap((t2) => {
                      var _a2, _b;
                      const transition = (_a2 = this.transitions) === null || _a2 === void 0 ? void 0 : _a2.getValue();
                      this.events.next(new NavigationStart(t2.id, this.urlSerializer.serialize(t2.extractedUrl), t2.source, t2.restoredState));
                      if (transition !== ((_b = this.transitions) === null || _b === void 0 ? void 0 : _b.getValue())) {
                        return EMPTY;
                      }
                      return Promise.resolve(t2);
                    }),
                    // ApplyRedirects
                    applyRedirects(this.environmentInjector, this.configLoader, this.urlSerializer, router.config),
                    // Update the currentNavigation
                    // `urlAfterRedirects` is guaranteed to be set after this point
                    tap((t2) => {
                      this.currentNavigation = Object.assign(Object.assign({}, this.currentNavigation), {
                        finalUrl: t2.urlAfterRedirects
                      });
                      overallTransitionState.urlAfterRedirects = t2.urlAfterRedirects;
                    }),
                    // Recognize
                    recognize(this.environmentInjector, this.rootComponentType, router.config, this.urlSerializer, router.paramsInheritanceStrategy),
                    // Update URL if in `eager` update mode
                    tap((t2) => {
                      overallTransitionState.targetSnapshot = t2.targetSnapshot;
                      if (router.urlUpdateStrategy === "eager") {
                        if (!t2.extras.skipLocationChange) {
                          const rawUrl = router.urlHandlingStrategy.merge(t2.urlAfterRedirects, t2.rawUrl);
                          router.setBrowserUrl(rawUrl, t2);
                        }
                        router.browserUrlTree = t2.urlAfterRedirects;
                      }
                      const routesRecognized = new RoutesRecognized(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
                      this.events.next(routesRecognized);
                    })
                  );
                } else if (urlTransition && router.urlHandlingStrategy.shouldProcessUrl(router.rawUrlTree)) {
                  const {
                    id,
                    extractedUrl,
                    source,
                    restoredState,
                    extras
                  } = t;
                  const navStart = new NavigationStart(id, this.urlSerializer.serialize(extractedUrl), source, restoredState);
                  this.events.next(navStart);
                  const targetSnapshot = createEmptyState(extractedUrl, this.rootComponentType).snapshot;
                  overallTransitionState = Object.assign(Object.assign({}, t), {
                    targetSnapshot,
                    urlAfterRedirects: extractedUrl,
                    extras: Object.assign(Object.assign({}, extras), {
                      skipLocationChange: false,
                      replaceUrl: false
                    })
                  });
                  return of(overallTransitionState);
                } else {
                  const reason = NG_DEV_MODE$4 ? `Navigation was ignored because the UrlHandlingStrategy indicated neither the current URL ${router.rawUrlTree} nor target URL ${t.rawUrl} should be processed.` : "";
                  this.events.next(new NavigationSkipped(
                    t.id,
                    router.serializeUrl(overallTransitionState.extractedUrl),
                    reason,
                    1
                    /* NavigationSkippedCode.IgnoredByUrlHandlingStrategy */
                  ));
                  router.rawUrlTree = t.rawUrl;
                  t.resolve(null);
                  return EMPTY;
                }
              }),
              // --- GUARDS ---
              tap((t) => {
                const guardsStart = new GuardsCheckStart(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot);
                this.events.next(guardsStart);
              }),
              map((t) => {
                overallTransitionState = Object.assign(Object.assign({}, t), {
                  guards: getAllRouteGuards(t.targetSnapshot, t.currentSnapshot, this.rootContexts)
                });
                return overallTransitionState;
              }),
              checkGuards(this.environmentInjector, (evt) => this.events.next(evt)),
              tap((t) => {
                overallTransitionState.guardsResult = t.guardsResult;
                if (isUrlTree(t.guardsResult)) {
                  throw redirectingNavigationError(this.urlSerializer, t.guardsResult);
                }
                const guardsEnd = new GuardsCheckEnd(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot, !!t.guardsResult);
                this.events.next(guardsEnd);
              }),
              filter((t) => {
                if (!t.guardsResult) {
                  router.restoreHistory(t);
                  this.cancelNavigationTransition(
                    t,
                    "",
                    3
                    /* NavigationCancellationCode.GuardRejected */
                  );
                  return false;
                }
                return true;
              }),
              // --- RESOLVE ---
              switchTap((t) => {
                if (t.guards.canActivateChecks.length) {
                  return of(t).pipe(tap((t2) => {
                    const resolveStart = new ResolveStart(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
                    this.events.next(resolveStart);
                  }), switchMap((t2) => {
                    let dataResolved = false;
                    return of(t2).pipe(resolveData(router.paramsInheritanceStrategy, this.environmentInjector), tap({
                      next: () => dataResolved = true,
                      complete: () => {
                        if (!dataResolved) {
                          router.restoreHistory(t2);
                          this.cancelNavigationTransition(
                            t2,
                            NG_DEV_MODE$4 ? `At least one route resolver didn't emit any value.` : "",
                            2
                            /* NavigationCancellationCode.NoDataFromResolver */
                          );
                        }
                      }
                    }));
                  }), tap((t2) => {
                    const resolveEnd = new ResolveEnd(t2.id, this.urlSerializer.serialize(t2.extractedUrl), this.urlSerializer.serialize(t2.urlAfterRedirects), t2.targetSnapshot);
                    this.events.next(resolveEnd);
                  }));
                }
                return void 0;
              }),
              // --- LOAD COMPONENTS ---
              switchTap((t) => {
                const loadComponents = (route) => {
                  var _a;
                  const loaders = [];
                  if (((_a = route.routeConfig) === null || _a === void 0 ? void 0 : _a.loadComponent) && !route.routeConfig._loadedComponent) {
                    loaders.push(this.configLoader.loadComponent(route.routeConfig).pipe(tap((loadedComponent) => {
                      route.component = loadedComponent;
                    }), map(() => void 0)));
                  }
                  for (const child of route.children) {
                    loaders.push(...loadComponents(child));
                  }
                  return loaders;
                };
                return combineLatest(loadComponents(t.targetSnapshot.root)).pipe(defaultIfEmpty(), take(1));
              }),
              switchTap(() => this.afterPreactivation()),
              map((t) => {
                const targetRouterState = createRouterState(router.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
                overallTransitionState = Object.assign(Object.assign({}, t), {
                  targetRouterState
                });
                return overallTransitionState;
              }),
              /* Once here, we are about to activate synchronously. The assumption is
                 this will succeed, and user code may read from the Router service.
                 Therefore before activation, we need to update router properties storing
                 the current URL and the RouterState, as well as updated the browser URL.
                 All this should happen *before* activating. */
              tap((t) => {
                router.currentUrlTree = t.urlAfterRedirects;
                router.rawUrlTree = router.urlHandlingStrategy.merge(t.urlAfterRedirects, t.rawUrl);
                router.routerState = t.targetRouterState;
                if (router.urlUpdateStrategy === "deferred") {
                  if (!t.extras.skipLocationChange) {
                    router.setBrowserUrl(router.rawUrlTree, t);
                  }
                  router.browserUrlTree = t.urlAfterRedirects;
                }
              }),
              activateRoutes(this.rootContexts, router.routeReuseStrategy, (evt) => this.events.next(evt)),
              tap({
                next: (t) => {
                  var _a;
                  completed = true;
                  this.lastSuccessfulNavigation = this.currentNavigation;
                  router.navigated = true;
                  this.events.next(new NavigationEnd(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(router.currentUrlTree)));
                  (_a = router.titleStrategy) === null || _a === void 0 ? void 0 : _a.updateTitle(t.targetRouterState.snapshot);
                  t.resolve(true);
                },
                complete: () => {
                  completed = true;
                }
              }),
              finalize(() => {
                var _a;
                if (!completed && !errored) {
                  const cancelationReason = NG_DEV_MODE$4 ? `Navigation ID ${overallTransitionState.id} is not equal to the current navigation id ${this.navigationId}` : "";
                  this.cancelNavigationTransition(
                    overallTransitionState,
                    cancelationReason,
                    1
                    /* NavigationCancellationCode.SupersededByNewNavigation */
                  );
                }
                if (((_a = this.currentNavigation) === null || _a === void 0 ? void 0 : _a.id) === overallTransitionState.id) {
                  this.currentNavigation = null;
                }
              }),
              catchError((e) => {
                var _a;
                errored = true;
                if (isNavigationCancelingError$1(e)) {
                  if (!isRedirectingNavigationCancelingError$1(e)) {
                    router.navigated = true;
                    router.restoreHistory(overallTransitionState, true);
                  }
                  const navCancel = new NavigationCancel(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), e.message, e.cancellationCode);
                  this.events.next(navCancel);
                  if (!isRedirectingNavigationCancelingError$1(e)) {
                    overallTransitionState.resolve(false);
                  } else {
                    const mergedTree = router.urlHandlingStrategy.merge(e.url, router.rawUrlTree);
                    const extras = {
                      skipLocationChange: overallTransitionState.extras.skipLocationChange,
                      // The URL is already updated at this point if we have 'eager' URL
                      // updates or if the navigation was triggered by the browser (back
                      // button, URL bar, etc). We want to replace that item in history
                      // if the navigation is rejected.
                      replaceUrl: router.urlUpdateStrategy === "eager" || isBrowserTriggeredNavigation(overallTransitionState.source)
                    };
                    router.scheduleNavigation(mergedTree, IMPERATIVE_NAVIGATION, null, extras, {
                      resolve: overallTransitionState.resolve,
                      reject: overallTransitionState.reject,
                      promise: overallTransitionState.promise
                    });
                  }
                } else {
                  router.restoreHistory(overallTransitionState, true);
                  const navError = new NavigationError(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), e, (_a = overallTransitionState.targetSnapshot) !== null && _a !== void 0 ? _a : void 0);
                  this.events.next(navError);
                  try {
                    overallTransitionState.resolve(router.errorHandler(e));
                  } catch (ee) {
                    overallTransitionState.reject(ee);
                  }
                }
                return EMPTY;
              })
            );
          })
        );
      }
      cancelNavigationTransition(t, reason, code) {
        const navCancel = new NavigationCancel(t.id, this.urlSerializer.serialize(t.extractedUrl), reason, code);
        this.events.next(navCancel);
        t.resolve(false);
      }
    }
    NavigationTransitions3.ɵfac = function NavigationTransitions_Factory(t) {
      return new (t || NavigationTransitions3)();
    };
    NavigationTransitions3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: NavigationTransitions3,
      factory: NavigationTransitions3.ɵfac,
      providedIn: "root"
    });
    return NavigationTransitions3;
  })();
  return NavigationTransitions2;
})();
function isBrowserTriggeredNavigation(source) {
  return source !== IMPERATIVE_NAVIGATION;
}
let TitleStrategy = /* @__PURE__ */ (() => {
  let TitleStrategy2 = /* @__PURE__ */ (() => {
    class TitleStrategy3 {
      /**
       * @returns The `title` of the deepest primary route.
       */
      buildTitle(snapshot) {
        var _a;
        let pageTitle;
        let route = snapshot.root;
        while (route !== void 0) {
          pageTitle = (_a = this.getResolvedTitleForRoute(route)) !== null && _a !== void 0 ? _a : pageTitle;
          route = route.children.find((child) => child.outlet === PRIMARY_OUTLET);
        }
        return pageTitle;
      }
      /**
       * Given an `ActivatedRouteSnapshot`, returns the final value of the
       * `Route.title` property, which can either be a static string or a resolved value.
       */
      getResolvedTitleForRoute(snapshot) {
        return snapshot.data[RouteTitleKey];
      }
    }
    TitleStrategy3.ɵfac = function TitleStrategy_Factory(t) {
      return new (t || TitleStrategy3)();
    };
    TitleStrategy3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: TitleStrategy3,
      factory: function() {
        return (() => inject(DefaultTitleStrategy))();
      },
      providedIn: "root"
    });
    return TitleStrategy3;
  })();
  return TitleStrategy2;
})();
let DefaultTitleStrategy = /* @__PURE__ */ (() => {
  let DefaultTitleStrategy2 = /* @__PURE__ */ (() => {
    class DefaultTitleStrategy3 extends TitleStrategy {
      constructor(title) {
        super();
        this.title = title;
      }
      /**
       * Sets the title of the browser to the given value.
       *
       * @param title The `pageTitle` from the deepest primary route.
       */
      updateTitle(snapshot) {
        const title = this.buildTitle(snapshot);
        if (title !== void 0) {
          this.title.setTitle(title);
        }
      }
    }
    DefaultTitleStrategy3.ɵfac = function DefaultTitleStrategy_Factory(t) {
      return new (t || DefaultTitleStrategy3)(ɵɵinject(Title));
    };
    DefaultTitleStrategy3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: DefaultTitleStrategy3,
      factory: DefaultTitleStrategy3.ɵfac,
      providedIn: "root"
    });
    return DefaultTitleStrategy3;
  })();
  return DefaultTitleStrategy2;
})();
let RouteReuseStrategy = /* @__PURE__ */ (() => {
  let RouteReuseStrategy2 = /* @__PURE__ */ (() => {
    class RouteReuseStrategy3 {
    }
    RouteReuseStrategy3.ɵfac = function RouteReuseStrategy_Factory(t) {
      return new (t || RouteReuseStrategy3)();
    };
    RouteReuseStrategy3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: RouteReuseStrategy3,
      factory: function() {
        return (() => inject(DefaultRouteReuseStrategy))();
      },
      providedIn: "root"
    });
    return RouteReuseStrategy3;
  })();
  return RouteReuseStrategy2;
})();
class BaseRouteReuseStrategy {
  /**
   * Whether the given route should detach for later reuse.
   * Always returns false for `BaseRouteReuseStrategy`.
   * */
  shouldDetach(route) {
    return false;
  }
  /**
   * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
   */
  store(route, detachedTree) {
  }
  /** Returns `false`, meaning the route (and its subtree) is never reattached */
  shouldAttach(route) {
    return false;
  }
  /** Returns `null` because this strategy does not store routes for later re-use. */
  retrieve(route) {
    return null;
  }
  /**
   * Determines if a route should be reused.
   * This strategy returns `true` when the future route config and current route config are
   * identical.
   */
  shouldReuseRoute(future, curr) {
    return future.routeConfig === curr.routeConfig;
  }
}
let DefaultRouteReuseStrategy = /* @__PURE__ */ (() => {
  let DefaultRouteReuseStrategy2 = /* @__PURE__ */ (() => {
    class DefaultRouteReuseStrategy3 extends BaseRouteReuseStrategy {
    }
    DefaultRouteReuseStrategy3.ɵfac = /* @__PURE__ */ function() {
      let ɵDefaultRouteReuseStrategy_BaseFactory;
      return function DefaultRouteReuseStrategy_Factory(t) {
        return (ɵDefaultRouteReuseStrategy_BaseFactory || (ɵDefaultRouteReuseStrategy_BaseFactory = ɵɵgetInheritedFactory(DefaultRouteReuseStrategy3)))(t || DefaultRouteReuseStrategy3);
      };
    }();
    DefaultRouteReuseStrategy3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: DefaultRouteReuseStrategy3,
      factory: DefaultRouteReuseStrategy3.ɵfac,
      providedIn: "root"
    });
    return DefaultRouteReuseStrategy3;
  })();
  return DefaultRouteReuseStrategy2;
})();
const NG_DEV_MODE$3 = false;
const ROUTER_CONFIGURATION = /* @__PURE__ */ new InjectionToken(NG_DEV_MODE$3 ? "router config" : "", {
  providedIn: "root",
  factory: () => ({})
});
let UrlHandlingStrategy = /* @__PURE__ */ (() => {
  let UrlHandlingStrategy2 = /* @__PURE__ */ (() => {
    class UrlHandlingStrategy3 {
    }
    UrlHandlingStrategy3.ɵfac = function UrlHandlingStrategy_Factory(t) {
      return new (t || UrlHandlingStrategy3)();
    };
    UrlHandlingStrategy3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: UrlHandlingStrategy3,
      factory: function() {
        return (() => inject(DefaultUrlHandlingStrategy))();
      },
      providedIn: "root"
    });
    return UrlHandlingStrategy3;
  })();
  return UrlHandlingStrategy2;
})();
let DefaultUrlHandlingStrategy = /* @__PURE__ */ (() => {
  let DefaultUrlHandlingStrategy2 = /* @__PURE__ */ (() => {
    class DefaultUrlHandlingStrategy3 {
      shouldProcessUrl(url2) {
        return true;
      }
      extract(url2) {
        return url2;
      }
      merge(newUrlPart, wholeUrl) {
        return newUrlPart;
      }
    }
    DefaultUrlHandlingStrategy3.ɵfac = function DefaultUrlHandlingStrategy_Factory(t) {
      return new (t || DefaultUrlHandlingStrategy3)();
    };
    DefaultUrlHandlingStrategy3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: DefaultUrlHandlingStrategy3,
      factory: DefaultUrlHandlingStrategy3.ɵfac,
      providedIn: "root"
    });
    return DefaultUrlHandlingStrategy3;
  })();
  return DefaultUrlHandlingStrategy2;
})();
const NG_DEV_MODE$2 = false;
function defaultErrorHandler(error) {
  throw error;
}
function defaultMalformedUriErrorHandler(error, urlSerializer, url2) {
  return urlSerializer.parse("/");
}
const exactMatchOptions = {
  paths: "exact",
  fragment: "ignored",
  matrixParams: "ignored",
  queryParams: "exact"
};
const subsetMatchOptions = {
  paths: "subset",
  fragment: "ignored",
  matrixParams: "ignored",
  queryParams: "subset"
};
let Router = /* @__PURE__ */ (() => {
  let Router2 = /* @__PURE__ */ (() => {
    class Router3 {
      // TODO(b/260747083): This should not exist and navigationId should be private in
      // `NavigationTransitions`
      get navigationId() {
        return this.navigationTransitions.navigationId;
      }
      /**
       * The ɵrouterPageId of whatever page is currently active in the browser history. This is
       * important for computing the target page id for new navigations because we need to ensure each
       * page id in the browser history is 1 more than the previous entry.
       */
      get browserPageId() {
        var _a;
        return (_a = this.location.getState()) === null || _a === void 0 ? void 0 : _a.ɵrouterPageId;
      }
      /**
       * An event stream for routing events.
       */
      get events() {
        return this.navigationTransitions.events;
      }
      constructor() {
        var _a;
        this.disposed = false;
        this.currentPageId = 0;
        this.console = inject(Console);
        this.isNgZoneEnabled = false;
        this.options = inject(ROUTER_CONFIGURATION, {
          optional: true
        }) || {};
        this.errorHandler = this.options.errorHandler || defaultErrorHandler;
        this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || defaultMalformedUriErrorHandler;
        this.navigated = false;
        this.lastSuccessfulId = -1;
        this.urlHandlingStrategy = inject(UrlHandlingStrategy);
        this.routeReuseStrategy = inject(RouteReuseStrategy);
        this.urlCreationStrategy = inject(CreateUrlTreeStrategy);
        this.titleStrategy = inject(TitleStrategy);
        this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore";
        this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly";
        this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
        this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace";
        this.config = flatten((_a = inject(ROUTES, {
          optional: true
        })) !== null && _a !== void 0 ? _a : []);
        this.navigationTransitions = inject(NavigationTransitions);
        this.urlSerializer = inject(UrlSerializer);
        this.location = inject(Location);
        this.isNgZoneEnabled = inject(NgZone) instanceof NgZone && NgZone.isInAngularZone();
        this.resetConfig(this.config);
        this.currentUrlTree = new UrlTree();
        this.rawUrlTree = this.currentUrlTree;
        this.browserUrlTree = this.currentUrlTree;
        this.routerState = createEmptyState(this.currentUrlTree, null);
        this.navigationTransitions.setupNavigations(this).subscribe((t) => {
          this.lastSuccessfulId = t.id;
          this.currentPageId = t.targetPageId;
        }, (e) => {
          this.console.warn(`Unhandled Navigation Error: ${e}`);
        });
      }
      /** @internal */
      resetRootComponentType(rootComponentType) {
        this.routerState.root.component = rootComponentType;
        this.navigationTransitions.rootComponentType = rootComponentType;
      }
      /**
       * Sets up the location change listener and performs the initial navigation.
       */
      initialNavigation() {
        this.setUpLocationChangeListener();
        if (!this.navigationTransitions.hasRequestedNavigation) {
          const state = this.location.getState();
          this.navigateToSyncWithBrowser(this.location.path(true), IMPERATIVE_NAVIGATION, state);
        }
      }
      /**
       * Sets up the location change listener. This listener detects navigations triggered from outside
       * the Router (the browser back/forward buttons, for example) and schedules a corresponding Router
       * navigation so that the correct events, guards, etc. are triggered.
       */
      setUpLocationChangeListener() {
        if (!this.locationSubscription) {
          this.locationSubscription = this.location.subscribe((event) => {
            const source = event["type"] === "popstate" ? "popstate" : "hashchange";
            if (source === "popstate") {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(event["url"], source, event.state);
              }, 0);
            }
          });
        }
      }
      /**
       * Schedules a router navigation to synchronize Router state with the browser state.
       *
       * This is done as a response to a popstate event and the initial navigation. These
       * two scenarios represent times when the browser URL/state has been updated and
       * the Router needs to respond to ensure its internal state matches.
       */
      navigateToSyncWithBrowser(url2, source, state) {
        const extras = {
          replaceUrl: true
        };
        const restoredState = (state === null || state === void 0 ? void 0 : state.navigationId) ? state : null;
        if (state) {
          const stateCopy = Object.assign({}, state);
          delete stateCopy.navigationId;
          delete stateCopy.ɵrouterPageId;
          if (Object.keys(stateCopy).length !== 0) {
            extras.state = stateCopy;
          }
        }
        const urlTree = this.parseUrl(url2);
        this.scheduleNavigation(urlTree, source, restoredState, extras);
      }
      /** The current URL. */
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      /**
       * Returns the current `Navigation` object when the router is navigating,
       * and `null` when idle.
       */
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      /**
       * Resets the route configuration used for navigation and generating links.
       *
       * @param config The route array for the new configuration.
       *
       * @usageNotes
       *
       * ```
       * router.resetConfig([
       *  { path: 'team/:id', component: TeamCmp, children: [
       *    { path: 'simple', component: SimpleCmp },
       *    { path: 'user/:name', component: UserCmp }
       *  ]}
       * ]);
       * ```
       */
      resetConfig(config) {
        NG_DEV_MODE$2 && validateConfig(config);
        this.config = config.map(standardizeConfig);
        this.navigated = false;
        this.lastSuccessfulId = -1;
      }
      /** @nodoc */
      ngOnDestroy() {
        this.dispose();
      }
      /** Disposes of the router. */
      dispose() {
        this.navigationTransitions.complete();
        if (this.locationSubscription) {
          this.locationSubscription.unsubscribe();
          this.locationSubscription = void 0;
        }
        this.disposed = true;
      }
      /**
       * Appends URL segments to the current URL tree to create a new URL tree.
       *
       * @param commands An array of URL fragments with which to construct the new URL tree.
       * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
       * segments, followed by the parameters for each segment.
       * The fragments are applied to the current URL tree or the one provided  in the `relativeTo`
       * property of the options object, if supplied.
       * @param navigationExtras Options that control the navigation strategy.
       * @returns The new URL tree.
       *
       * @usageNotes
       *
       * ```
       * // create /team/33/user/11
       * router.createUrlTree(['/team', 33, 'user', 11]);
       *
       * // create /team/33;expand=true/user/11
       * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
       *
       * // you can collapse static segments like this (this works only with the first passed-in value):
       * router.createUrlTree(['/team/33/user', userId]);
       *
       * // If the first segment can contain slashes, and you do not want the router to split it,
       * // you can do the following:
       * router.createUrlTree([{segmentPath: '/one/two'}]);
       *
       * // create /team/33/(user/11//right:chat)
       * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);
       *
       * // remove the right secondary node
       * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
       *
       * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
       *
       * // navigate to /team/33/user/11/details
       * router.createUrlTree(['details'], {relativeTo: route});
       *
       * // navigate to /team/33/user/22
       * router.createUrlTree(['../22'], {relativeTo: route});
       *
       * // navigate to /team/44/user/22
       * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
       *
       * Note that a value of `null` or `undefined` for `relativeTo` indicates that the
       * tree should be created relative to the root.
       * ```
       */
      createUrlTree(commands, navigationExtras = {}) {
        const {
          relativeTo,
          queryParams,
          fragment,
          queryParamsHandling,
          preserveFragment
        } = navigationExtras;
        const f = preserveFragment ? this.currentUrlTree.fragment : fragment;
        let q = null;
        switch (queryParamsHandling) {
          case "merge":
            q = Object.assign(Object.assign({}, this.currentUrlTree.queryParams), queryParams);
            break;
          case "preserve":
            q = this.currentUrlTree.queryParams;
            break;
          default:
            q = queryParams || null;
        }
        if (q !== null) {
          q = this.removeEmptyProps(q);
        }
        return this.urlCreationStrategy.createUrlTree(relativeTo, this.routerState, this.currentUrlTree, commands, q, f !== null && f !== void 0 ? f : null);
      }
      /**
       * Navigates to a view using an absolute route path.
       *
       * @param url An absolute path for a defined route. The function does not apply any delta to the
       *     current URL.
       * @param extras An object containing properties that modify the navigation strategy.
       *
       * @returns A Promise that resolves to 'true' when navigation succeeds,
       * to 'false' when navigation fails, or is rejected on error.
       *
       * @usageNotes
       *
       * The following calls request navigation to an absolute path.
       *
       * ```
       * router.navigateByUrl("/team/33/user/11");
       *
       * // Navigate without updating the URL
       * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
       * ```
       *
       * @see [Routing and Navigation guide](guide/router)
       *
       */
      navigateByUrl(url2, extras = {
        skipLocationChange: false
      }) {
        if (false) {
          this.console.warn(`Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?`);
        }
        const urlTree = isUrlTree(url2) ? url2 : this.parseUrl(url2);
        const mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);
        return this.scheduleNavigation(mergedTree, IMPERATIVE_NAVIGATION, null, extras);
      }
      /**
       * Navigate based on the provided array of commands and a starting point.
       * If no starting route is provided, the navigation is absolute.
       *
       * @param commands An array of URL fragments with which to construct the target URL.
       * If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
       * segments, followed by the parameters for each segment.
       * The fragments are applied to the current URL or the one provided  in the `relativeTo` property
       * of the options object, if supplied.
       * @param extras An options object that determines how the URL should be constructed or
       *     interpreted.
       *
       * @returns A Promise that resolves to `true` when navigation succeeds, to `false` when navigation
       *     fails,
       * or is rejected on error.
       *
       * @usageNotes
       *
       * The following calls request navigation to a dynamic route path relative to the current URL.
       *
       * ```
       * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
       *
       * // Navigate without updating the URL, overriding the default behavior
       * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
       * ```
       *
       * @see [Routing and Navigation guide](guide/router)
       *
       */
      navigate(commands, extras = {
        skipLocationChange: false
      }) {
        validateCommands(commands);
        return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
      }
      /** Serializes a `UrlTree` into a string */
      serializeUrl(url2) {
        return this.urlSerializer.serialize(url2);
      }
      /** Parses a string into a `UrlTree` */
      parseUrl(url2) {
        let urlTree;
        try {
          urlTree = this.urlSerializer.parse(url2);
        } catch (e) {
          urlTree = this.malformedUriErrorHandler(e, this.urlSerializer, url2);
        }
        return urlTree;
      }
      isActive(url2, matchOptions) {
        let options;
        if (matchOptions === true) {
          options = Object.assign({}, exactMatchOptions);
        } else if (matchOptions === false) {
          options = Object.assign({}, subsetMatchOptions);
        } else {
          options = matchOptions;
        }
        if (isUrlTree(url2)) {
          return containsTree(this.currentUrlTree, url2, options);
        }
        const urlTree = this.parseUrl(url2);
        return containsTree(this.currentUrlTree, urlTree, options);
      }
      removeEmptyProps(params) {
        return Object.keys(params).reduce((result, key) => {
          const value = params[key];
          if (value !== null && value !== void 0) {
            result[key] = value;
          }
          return result;
        }, {});
      }
      /** @internal */
      scheduleNavigation(rawUrl, source, restoredState, extras, priorPromise) {
        var _a, _b;
        if (this.disposed) {
          return Promise.resolve(false);
        }
        let resolve;
        let reject;
        let promise2;
        if (priorPromise) {
          resolve = priorPromise.resolve;
          reject = priorPromise.reject;
          promise2 = priorPromise.promise;
        } else {
          promise2 = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
          });
        }
        let targetPageId;
        if (this.canceledNavigationResolution === "computed") {
          if (restoredState && restoredState.ɵrouterPageId) {
            targetPageId = restoredState.ɵrouterPageId;
          } else {
            if (extras.replaceUrl || extras.skipLocationChange) {
              targetPageId = (_a = this.browserPageId) !== null && _a !== void 0 ? _a : 0;
            } else {
              targetPageId = ((_b = this.browserPageId) !== null && _b !== void 0 ? _b : 0) + 1;
            }
          }
        } else {
          targetPageId = 0;
        }
        this.navigationTransitions.handleNavigationRequest({
          targetPageId,
          source,
          restoredState,
          currentUrlTree: this.currentUrlTree,
          currentRawUrl: this.currentUrlTree,
          rawUrl,
          extras,
          resolve,
          reject,
          promise: promise2,
          currentSnapshot: this.routerState.snapshot,
          currentRouterState: this.routerState
        });
        return promise2.catch((e) => {
          return Promise.reject(e);
        });
      }
      /** @internal */
      setBrowserUrl(url2, transition) {
        const path = this.urlSerializer.serialize(url2);
        const state = Object.assign(Object.assign({}, transition.extras.state), this.generateNgRouterState(transition.id, transition.targetPageId));
        if (this.location.isCurrentPathEqualTo(path) || !!transition.extras.replaceUrl) {
          this.location.replaceState(path, "", state);
        } else {
          this.location.go(path, "", state);
        }
      }
      /**
       * Performs the necessary rollback action to restore the browser URL to the
       * state before the transition.
       * @internal
       */
      restoreHistory(transition, restoringFromCaughtError = false) {
        var _a, _b;
        if (this.canceledNavigationResolution === "computed") {
          const targetPagePosition = this.currentPageId - transition.targetPageId;
          const browserUrlUpdateOccurred = transition.source === "popstate" || this.urlUpdateStrategy === "eager" || this.currentUrlTree === ((_a = this.getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.finalUrl);
          if (browserUrlUpdateOccurred && targetPagePosition !== 0) {
            this.location.historyGo(targetPagePosition);
          } else if (this.currentUrlTree === ((_b = this.getCurrentNavigation()) === null || _b === void 0 ? void 0 : _b.finalUrl) && targetPagePosition === 0) {
            this.resetState(transition);
            this.browserUrlTree = transition.currentUrlTree;
            this.resetUrlToCurrentUrlTree();
          } else
            ;
        } else if (this.canceledNavigationResolution === "replace") {
          if (restoringFromCaughtError) {
            this.resetState(transition);
          }
          this.resetUrlToCurrentUrlTree();
        }
      }
      resetState(t) {
        this.routerState = t.currentRouterState;
        this.currentUrlTree = t.currentUrlTree;
        this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl);
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId));
      }
      generateNgRouterState(navigationId, routerPageId) {
        if (this.canceledNavigationResolution === "computed") {
          return {
            navigationId,
            ɵrouterPageId: routerPageId
          };
        }
        return {
          navigationId
        };
      }
    }
    Router3.ɵfac = function Router_Factory(t) {
      return new (t || Router3)();
    };
    Router3.ɵprov = /* @__PURE__ */ ɵɵdefineInjectable({
      token: Router3,
      factory: Router3.ɵfac,
      providedIn: "root"
    });
    return Router3;
  })();
  return Router2;
})();
function validateCommands(commands) {
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    if (cmd == null) {
      throw new RuntimeError(4008, NG_DEV_MODE$2 && `The requested path contains ${cmd} segment at index ${i}`);
    }
  }
}
let RouterLink = /* @__PURE__ */ (() => {
  let RouterLink2 = /* @__PURE__ */ (() => {
    class RouterLink3 {
      constructor(router, route, tabIndexAttribute, renderer, el, locationStrategy) {
        var _a;
        this.router = router;
        this.route = route;
        this.tabIndexAttribute = tabIndexAttribute;
        this.renderer = renderer;
        this.el = el;
        this.locationStrategy = locationStrategy;
        this._preserveFragment = false;
        this._skipLocationChange = false;
        this._replaceUrl = false;
        this.href = null;
        this.commands = null;
        this.onChanges = new Subject();
        const tagName = (_a = el.nativeElement.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        this.isAnchorElement = tagName === "a" || tagName === "area";
        if (this.isAnchorElement) {
          this.subscription = router.events.subscribe((s) => {
            if (s instanceof NavigationEnd) {
              this.updateHref();
            }
          });
        } else {
          this.setTabIndexIfNotOnNativeEl("0");
        }
      }
      /**
       * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the
       * `UrlCreationOptions`.
       * @see {@link UrlCreationOptions#preserveFragment UrlCreationOptions#preserveFragment}
       * @see {@link Router#createUrlTree Router#createUrlTree}
       */
      set preserveFragment(preserveFragment) {
        this._preserveFragment = coerceToBoolean(preserveFragment);
      }
      get preserveFragment() {
        return this._preserveFragment;
      }
      /**
       * Passed to {@link Router#navigateByUrl Router#navigateByUrl} as part of the
       * `NavigationBehaviorOptions`.
       * @see {@link NavigationBehaviorOptions#skipLocationChange NavigationBehaviorOptions#skipLocationChange}
       * @see {@link Router#navigateByUrl Router#navigateByUrl}
       */
      set skipLocationChange(skipLocationChange) {
        this._skipLocationChange = coerceToBoolean(skipLocationChange);
      }
      get skipLocationChange() {
        return this._skipLocationChange;
      }
      /**
       * Passed to {@link Router#navigateByUrl Router#navigateByUrl} as part of the
       * `NavigationBehaviorOptions`.
       * @see {@link NavigationBehaviorOptions#replaceUrl NavigationBehaviorOptions#replaceUrl}
       * @see {@link Router#navigateByUrl Router#navigateByUrl}
       */
      set replaceUrl(replaceUrl) {
        this._replaceUrl = coerceToBoolean(replaceUrl);
      }
      get replaceUrl() {
        return this._replaceUrl;
      }
      /**
       * Modifies the tab index if there was not a tabindex attribute on the element during
       * instantiation.
       */
      setTabIndexIfNotOnNativeEl(newTabIndex) {
        if (this.tabIndexAttribute != null || this.isAnchorElement) {
          return;
        }
        this.applyAttributeValue("tabindex", newTabIndex);
      }
      /** @nodoc */
      ngOnChanges(changes) {
        if (this.isAnchorElement) {
          this.updateHref();
        }
        this.onChanges.next(this);
      }
      /**
       * Commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
       *   - **array**: commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
       *   - **string**: shorthand for array of commands with just the string, i.e. `['/route']`
       *   - **null|undefined**: effectively disables the `routerLink`
       * @see {@link Router#createUrlTree Router#createUrlTree}
       */
      set routerLink(commands) {
        if (commands != null) {
          this.commands = Array.isArray(commands) ? commands : [commands];
          this.setTabIndexIfNotOnNativeEl("0");
        } else {
          this.commands = null;
          this.setTabIndexIfNotOnNativeEl(null);
        }
      }
      /** @nodoc */
      onClick(button, ctrlKey, shiftKey, altKey, metaKey) {
        if (this.urlTree === null) {
          return true;
        }
        if (this.isAnchorElement) {
          if (button !== 0 || ctrlKey || shiftKey || altKey || metaKey) {
            return true;
          }
          if (typeof this.target === "string" && this.target != "_self") {
            return true;
          }
        }
        const extras = {
          skipLocationChange: this.skipLocationChange,
          replaceUrl: this.replaceUrl,
          state: this.state
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return !this.isAnchorElement;
      }
      /** @nodoc */
      ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
      }
      updateHref() {
        var _a;
        this.href = this.urlTree !== null && this.locationStrategy ? (_a = this.locationStrategy) === null || _a === void 0 ? void 0 : _a.prepareExternalUrl(this.router.serializeUrl(this.urlTree)) : null;
        const sanitizedValue = this.href === null ? null : (
          // This class represents a directive that can be added to both `<a>` elements,
          // as well as other elements. As a result, we can't define security context at
          // compile time. So the security context is deferred to runtime.
          // The `ɵɵsanitizeUrlOrResourceUrl` selects the necessary sanitizer function
          // based on the tag and property names. The logic mimics the one from
          // `packages/compiler/src/schema/dom_security_schema.ts`, which is used at compile time.
          //
          // Note: we should investigate whether we can switch to using `@HostBinding('attr.href')`
          // instead of applying a value via a renderer, after a final merge of the
          // `RouterLinkWithHref` directive.
          ɵɵsanitizeUrlOrResourceUrl(this.href, this.el.nativeElement.tagName.toLowerCase(), "href")
        );
        this.applyAttributeValue("href", sanitizedValue);
      }
      applyAttributeValue(attrName, attrValue) {
        const renderer = this.renderer;
        const nativeElement = this.el.nativeElement;
        if (attrValue !== null) {
          renderer.setAttribute(nativeElement, attrName, attrValue);
        } else {
          renderer.removeAttribute(nativeElement, attrName);
        }
      }
      get urlTree() {
        if (this.commands === null) {
          return null;
        }
        return this.router.createUrlTree(this.commands, {
          // If the `relativeTo` input is not defined, we want to use `this.route` by default.
          // Otherwise, we should use the value provided by the user in the input.
          relativeTo: this.relativeTo !== void 0 ? this.relativeTo : this.route,
          queryParams: this.queryParams,
          fragment: this.fragment,
          queryParamsHandling: this.queryParamsHandling,
          preserveFragment: this.preserveFragment
        });
      }
    }
    RouterLink3.ɵfac = function RouterLink_Factory(t) {
      return new (t || RouterLink3)(ɵɵdirectiveInject(Router), ɵɵdirectiveInject(ActivatedRoute), ɵɵinjectAttribute("tabindex"), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(LocationStrategy));
    };
    RouterLink3.ɵdir = /* @__PURE__ */ ɵɵdefineDirective({
      type: RouterLink3,
      selectors: [["", "routerLink", ""]],
      hostVars: 1,
      hostBindings: function RouterLink_HostBindings(rf, ctx) {
        if (rf & 1) {
          ɵɵlistener("click", function RouterLink_click_HostBindingHandler($event) {
            return ctx.onClick($event.button, $event.ctrlKey, $event.shiftKey, $event.altKey, $event.metaKey);
          });
        }
        if (rf & 2) {
          ɵɵattribute("target", ctx.target);
        }
      },
      inputs: {
        target: "target",
        queryParams: "queryParams",
        fragment: "fragment",
        queryParamsHandling: "queryParamsHandling",
        state: "state",
        relativeTo: "relativeTo",
        preserveFragment: "preserveFragment",
        skipLocationChange: "skipLocationChange",
        replaceUrl: "replaceUrl",
        routerLink: "routerLink"
      },
      standalone: true,
      features: [ɵɵNgOnChangesFeature]
    });
    return RouterLink3;
  })();
  return RouterLink2;
})();
const ROUTER_SCROLLER = /* @__PURE__ */ new InjectionToken("");
const NG_DEV_MODE$1 = false;
function provideRouter(routes2, ...features) {
  return makeEnvironmentProviders([{
    provide: ROUTES,
    multi: true,
    useValue: routes2
  }, NG_DEV_MODE$1 ? {
    provide: ROUTER_IS_PROVIDED,
    useValue: true
  } : [], {
    provide: ActivatedRoute,
    useFactory: rootRoute,
    deps: [Router]
  }, {
    provide: APP_BOOTSTRAP_LISTENER,
    multi: true,
    useFactory: getBootstrapListener
  }, features.map((feature) => feature.ɵproviders)]);
}
function rootRoute(router) {
  return router.routerState.root;
}
function routerFeature(kind, providers) {
  return {
    ɵkind: kind,
    ɵproviders: providers
  };
}
const ROUTER_IS_PROVIDED = /* @__PURE__ */ new InjectionToken("", {
  providedIn: "root",
  factory: () => false
});
function getBootstrapListener() {
  const injector = inject(Injector);
  return (bootstrappedComponentRef) => {
    var _a, _b;
    const ref = injector.get(ApplicationRef);
    if (bootstrappedComponentRef !== ref.components[0]) {
      return;
    }
    const router = injector.get(Router);
    const bootstrapDone = injector.get(BOOTSTRAP_DONE);
    if (injector.get(INITIAL_NAVIGATION) === 1) {
      router.initialNavigation();
    }
    (_a = injector.get(ROUTER_PRELOADER, null, InjectFlags.Optional)) === null || _a === void 0 ? void 0 : _a.setUpPreloading();
    (_b = injector.get(ROUTER_SCROLLER, null, InjectFlags.Optional)) === null || _b === void 0 ? void 0 : _b.init();
    router.resetRootComponentType(ref.componentTypes[0]);
    if (!bootstrapDone.closed) {
      bootstrapDone.next();
      bootstrapDone.unsubscribe();
    }
  };
}
const BOOTSTRAP_DONE = /* @__PURE__ */ new InjectionToken(NG_DEV_MODE$1 ? "bootstrap done indicator" : "", {
  factory: () => {
    return new Subject();
  }
});
const INITIAL_NAVIGATION = /* @__PURE__ */ new InjectionToken(NG_DEV_MODE$1 ? "initial navigation" : "", {
  providedIn: "root",
  factory: () => 1
  /* InitialNavigation.EnabledNonBlocking */
});
function withEnabledBlockingInitialNavigation() {
  const providers = [{
    provide: INITIAL_NAVIGATION,
    useValue: 0
    /* InitialNavigation.EnabledBlocking */
  }, {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [Injector],
    useFactory: (injector) => {
      const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve());
      function afterNextNavigation(action) {
        const router = injector.get(Router);
        router.events.pipe(filter((e) => e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError), map((e) => {
          if (e instanceof NavigationEnd) {
            return true;
          }
          const redirecting = e instanceof NavigationCancel ? e.code === 0 || e.code === 1 : false;
          return redirecting ? null : false;
        }), filter((result) => result !== null), take(1)).subscribe(() => {
          action();
        });
      }
      return () => {
        return locationInitialized.then(() => {
          return new Promise((resolve) => {
            const router = injector.get(Router);
            const bootstrapDone = injector.get(BOOTSTRAP_DONE);
            afterNextNavigation(() => {
              resolve(true);
            });
            injector.get(NavigationTransitions).afterPreactivation = () => {
              resolve(true);
              return bootstrapDone.closed ? of(void 0) : bootstrapDone;
            };
            router.initialNavigation();
          });
        });
      };
    }
  }];
  return routerFeature(2, providers);
}
const ROUTER_PRELOADER = /* @__PURE__ */ new InjectionToken(NG_DEV_MODE$1 ? "router preloader" : "");
const NG_DEV_MODE = false;
[
  Location,
  {
    provide: UrlSerializer,
    useClass: DefaultUrlSerializer
  },
  Router,
  ChildrenOutletContexts,
  {
    provide: ActivatedRoute,
    useFactory: rootRoute,
    deps: [Router]
  },
  RouterConfigLoader,
  // Only used to warn when `provideRoutes` is used without `RouterModule` or `provideRouter`. Can
  // be removed when `provideRoutes` is removed.
  NG_DEV_MODE ? {
    provide: ROUTER_IS_PROVIDED,
    useValue: true
  } : []
];
const ROUTE_META_TAGS_KEY = Symbol("@analogjs/router Route Meta Tags Key");
const CHARSET_KEY = "charset";
const HTTP_EQUIV_SELECTOR_KEY = "http-equiv";
const NAME_KEY = "name";
const PROPERTY_KEY = "property";
function updateMetaTagsOnRouteChange() {
  const router = inject(Router);
  const metaService = inject(Meta);
  router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
    const metaTagMap = getMetaTagMap(router.routerState.snapshot.root);
    for (const metaTagSelector in metaTagMap) {
      const metaTag = metaTagMap[metaTagSelector];
      metaService.updateTag(metaTag, metaTagSelector);
    }
  });
}
function getMetaTagMap(route) {
  var _a;
  const metaTagMap = {};
  let currentRoute = route;
  while (currentRoute) {
    const metaTags = (_a = currentRoute.data[ROUTE_META_TAGS_KEY]) !== null && _a !== void 0 ? _a : [];
    for (const metaTag of metaTags) {
      metaTagMap[getMetaTagSelector(metaTag)] = metaTag;
    }
    currentRoute = currentRoute.firstChild;
  }
  return metaTagMap;
}
function getMetaTagSelector(metaTag) {
  if (metaTag.name) {
    return `${NAME_KEY}="${metaTag.name}"`;
  }
  if (metaTag.property) {
    return `${PROPERTY_KEY}="${metaTag.property}"`;
  }
  if (metaTag.httpEquiv) {
    return `${HTTP_EQUIV_SELECTOR_KEY}="${metaTag.httpEquiv}"`;
  }
  return CHARSET_KEY;
}
function toRouteConfig(routeMeta) {
  if (!routeMeta) {
    return {};
  }
  if (isRedirectRouteMeta(routeMeta)) {
    return routeMeta;
  }
  const {
    meta
  } = routeMeta, routeConfig = __rest(routeMeta, ["meta"]);
  if (Array.isArray(meta)) {
    routeConfig.data = Object.assign(Object.assign({}, routeConfig.data), {
      [ROUTE_META_TAGS_KEY]: meta
    });
  } else if (typeof meta === "function") {
    routeConfig.resolve = Object.assign(Object.assign({}, routeConfig.resolve), {
      [ROUTE_META_TAGS_KEY]: meta
    });
  }
  return routeConfig;
}
function isRedirectRouteMeta(routeMeta) {
  return !!routeMeta.redirectTo;
}
function toMarkdownModule(markdownFileFactory) {
  return () => Promise.all([import("./assets/analogjs-content-990b7471.mjs"), markdownFileFactory()]).then(([{
    parseRawContentFile,
    MarkdownComponent
  }, markdownFile]) => {
    const {
      content,
      attributes
    } = parseRawContentFile(markdownFile);
    const {
      title,
      meta
    } = attributes;
    return {
      default: MarkdownComponent,
      routeMeta: {
        data: {
          _analogContent: content
        },
        title,
        meta
      }
    };
  });
}
const FILES = /* @__PURE__ */ Object.assign({ "/src/app/routes/index.ts": () => import("./assets/index-3312d681.mjs"), "/src/app/routes/test-component-route.ts": () => import("./assets/test-component-route-35e68e83.mjs") });
const CONTENT_FILES = /* @__PURE__ */ Object.assign({});
function getRoutes(files) {
  const ROUTES2 = Object.keys(files).sort((a, b) => a.length - b.length);
  const routeConfigs = ROUTES2.reduce((routes2, key) => {
    const module = key.endsWith(".md") ? toMarkdownModule(files[key]) : files[key];
    const segments = key.replace(/^\/(.*?)\/routes|\/app\/routes|\.(js|ts|md)$/g, "").replace(/\[\.{3}.+\]/, "**").replace(/\[([^\]]+)\]/g, ":$1").split("/").filter(Boolean);
    segments.reduce((parent, segment, index) => {
      var _a;
      const path = segment.replace(/index|^\(.*?\)$/g, "").replace(".", "/");
      const isIndex = !path;
      const isCatchall = path === "**";
      const pathMatch = isIndex ? "full" : "prefix";
      const root = index === 0;
      const leaf = index === segments.length - 1 && segments.length > 1;
      const node = !root && !leaf;
      const insert = /^\w|\//.test(path) && !isCatchall ? "unshift" : "push";
      if (root) {
        const dynamic = path.startsWith(":");
        if (dynamic)
          return parent;
        const last2 = segments.length === 1;
        if (last2) {
          const newRoute = {
            path,
            pathMatch,
            _module: () => module(),
            loadChildren: () => module().then((m) => [Object.assign({
              path: "",
              component: m.default
            }, toRouteConfig(m.routeMeta))])
          };
          routes2 === null || routes2 === void 0 ? void 0 : routes2[insert](newRoute);
          return parent;
        }
      }
      if (root || node) {
        const current = root ? routes2 : parent._children;
        const found = current === null || current === void 0 ? void 0 : current.find((route) => route.path === path);
        if (found) {
          if (!found._children) {
            found._children = [];
          }
          found.pathMatch = pathMatch;
        } else {
          current === null || current === void 0 ? void 0 : current[insert]({
            path,
            pathMatch,
            _module: () => module(),
            loadChildren: () => module().then((m) => [Object.assign({
              path: "",
              component: m.default
            }, toRouteConfig(m.routeMeta))])
          });
        }
        return found || (current === null || current === void 0 ? void 0 : current[insert === "unshift" ? 0 : current.length - 1]);
      }
      if (leaf) {
        (_a = parent === null || parent === void 0 ? void 0 : parent._children) === null || _a === void 0 ? void 0 : _a[insert]({
          path,
          pathMatch,
          _module: () => module(),
          loadChildren: () => module().then((m) => [Object.assign({
            path: "",
            component: m.default
          }, toRouteConfig(m.routeMeta))])
        });
      }
      if (parent._children) {
        parent.loadComponent = () => parent._module().then((m) => m.default);
        parent.loadChildren = () => parent._module().then((m) => {
          return [Object.assign({
            path: "",
            children: parent._children
          }, toRouteConfig(m.routeMeta))];
        });
      }
      return parent;
    }, {});
    return routes2;
  }, []);
  return routeConfigs;
}
const routes = [...getRoutes(Object.assign(Object.assign({}, FILES), CONTENT_FILES))];
function provideFileRouter(...features) {
  return makeEnvironmentProviders([
    // TODO: remove type casting after Angular >=15.1.1 upgrade
    // https://github.com/angular/angular/pull/48720
    provideRouter(routes, ...features).ɵproviders,
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => updateMetaTagsOnRouteChange()
    }
  ]);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var AppComponent = /* @__PURE__ */ _createClass(function AppComponent2() {
  _classCallCheck(this, AppComponent2);
});
AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)();
};
AppComponent.ɵcmp = /* @__PURE__ */ ɵɵdefineComponent({
  type: AppComponent,
  selectors: [["app-root"]],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  decls: 1,
  vars: 0,
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelement(0, "router-outlet");
    }
  },
  dependencies: [RouterOutlet],
  styles: ["[_nghost-%COMP%] {\n        max-width: 1280px;\n        margin: 0 auto;\n        padding: 2rem;\n        text-align: center;\n      }"]
});
(function() {
})();
{
  enableProdMode();
}
function render(_x, _x2) {
  return _render.apply(this, arguments);
}
function _render() {
  _render = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(url2, document2) {
    var html;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1)
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return renderApplication(AppComponent, {
              appId: "analog-app",
              document: document2,
              url: url2,
              providers: [provideFileRouter(withEnabledBlockingInitialNavigation())]
            });
          case 2:
            html = _context.sent;
            return _context.abrupt("return", html);
          case 4:
          case "end":
            return _context.stop();
        }
    }, _callee);
  }));
  return _render.apply(this, arguments);
}
export {
  ActivatedRoute as A,
  DomSanitizer as D,
  InjectionToken as I,
  Location as L,
  PLATFORM_ID as P,
  Router as R,
  _createClass as _,
  ɵɵdefineComponent as a,
  ɵɵNgOnChangesFeature as b,
  ɵɵStandaloneFeature as c,
  ɵɵHostDirectivesFeature as d,
  render as default,
  ɵɵelement as e,
  ɵɵpipe as f,
  ɵɵclassMap as g,
  ɵɵproperty as h,
  inject as i,
  ɵɵpipeBind1 as j,
  AsyncPipe as k,
  ɵɵsanitizeHtml as l,
  ɵɵdefineDirective as m,
  ɵɵlistener as n,
  DOCUMENT as o,
  ɵɵelementStart as p,
  ɵɵelementEnd as q,
  ɵɵtext as r,
  ɵɵadvance as s,
  ɵɵtextInterpolate1 as t,
  RouterLink as u,
  _classCallCheck as v,
  ɵɵdefineInjectable as ɵ
};
