module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1773651886957, function(require, module, exports) {

module.exports = require('./full');

}, function(modId) {var map = {"./full":1773651886958}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886958, function(require, module, exports) {

require('../modules/es.symbol');
require('../modules/es.symbol.description');
require('../modules/es.symbol.async-dispose');
require('../modules/es.symbol.async-iterator');
require('../modules/es.symbol.dispose');
require('../modules/es.symbol.has-instance');
require('../modules/es.symbol.is-concat-spreadable');
require('../modules/es.symbol.iterator');
require('../modules/es.symbol.match');
require('../modules/es.symbol.match-all');
require('../modules/es.symbol.replace');
require('../modules/es.symbol.search');
require('../modules/es.symbol.species');
require('../modules/es.symbol.split');
require('../modules/es.symbol.to-primitive');
require('../modules/es.symbol.to-string-tag');
require('../modules/es.symbol.unscopables');
require('../modules/es.error.cause');
require('../modules/es.error.is-error');
require('../modules/es.error.to-string');
require('../modules/es.aggregate-error');
require('../modules/es.aggregate-error.cause');
require('../modules/es.suppressed-error.constructor');
require('../modules/es.array.at');
require('../modules/es.array.concat');
require('../modules/es.array.copy-within');
require('../modules/es.array.every');
require('../modules/es.array.fill');
require('../modules/es.array.filter');
require('../modules/es.array.find');
require('../modules/es.array.find-index');
require('../modules/es.array.find-last');
require('../modules/es.array.find-last-index');
require('../modules/es.array.flat');
require('../modules/es.array.flat-map');
require('../modules/es.array.for-each');
require('../modules/es.array.from');
require('../modules/es.array.includes');
require('../modules/es.array.index-of');
require('../modules/es.array.is-array');
require('../modules/es.array.iterator');
require('../modules/es.array.join');
require('../modules/es.array.last-index-of');
require('../modules/es.array.map');
require('../modules/es.array.of');
require('../modules/es.array.push');
require('../modules/es.array.reduce');
require('../modules/es.array.reduce-right');
require('../modules/es.array.reverse');
require('../modules/es.array.slice');
require('../modules/es.array.some');
require('../modules/es.array.sort');
require('../modules/es.array.species');
require('../modules/es.array.splice');
require('../modules/es.array.to-reversed');
require('../modules/es.array.to-sorted');
require('../modules/es.array.to-spliced');
require('../modules/es.array.unscopables.flat');
require('../modules/es.array.unscopables.flat-map');
require('../modules/es.array.unshift');
require('../modules/es.array.with');
require('../modules/es.array-buffer.constructor');
require('../modules/es.array-buffer.is-view');
require('../modules/es.array-buffer.slice');
require('../modules/es.data-view');
require('../modules/es.data-view.get-float16');
require('../modules/es.data-view.set-float16');
require('../modules/es.array-buffer.detached');
require('../modules/es.array-buffer.transfer');
require('../modules/es.array-buffer.transfer-to-fixed-length');
require('../modules/es.date.get-year');
require('../modules/es.date.now');
require('../modules/es.date.set-year');
require('../modules/es.date.to-gmt-string');
require('../modules/es.date.to-iso-string');
require('../modules/es.date.to-json');
require('../modules/es.date.to-primitive');
require('../modules/es.date.to-string');
require('../modules/es.disposable-stack.constructor');
require('../modules/es.escape');
require('../modules/es.function.bind');
require('../modules/es.function.has-instance');
require('../modules/es.function.name');
require('../modules/es.global-this');
require('../modules/es.iterator.constructor');
require('../modules/es.iterator.concat');
require('../modules/es.iterator.dispose');
require('../modules/es.iterator.drop');
require('../modules/es.iterator.every');
require('../modules/es.iterator.filter');
require('../modules/es.iterator.find');
require('../modules/es.iterator.flat-map');
require('../modules/es.iterator.for-each');
require('../modules/es.iterator.from');
require('../modules/es.iterator.map');
require('../modules/es.iterator.reduce');
require('../modules/es.iterator.some');
require('../modules/es.iterator.take');
require('../modules/es.iterator.to-array');
require('../modules/es.json.is-raw-json');
require('../modules/es.json.parse');
require('../modules/es.json.raw-json');
require('../modules/es.json.stringify');
require('../modules/es.json.to-string-tag');
require('../modules/es.map');
require('../modules/es.map.group-by');
require('../modules/es.map.get-or-insert');
require('../modules/es.map.get-or-insert-computed');
require('../modules/es.math.acosh');
require('../modules/es.math.asinh');
require('../modules/es.math.atanh');
require('../modules/es.math.cbrt');
require('../modules/es.math.clz32');
require('../modules/es.math.cosh');
require('../modules/es.math.expm1');
require('../modules/es.math.fround');
require('../modules/es.math.f16round');
require('../modules/es.math.hypot');
require('../modules/es.math.imul');
require('../modules/es.math.log10');
require('../modules/es.math.log1p');
require('../modules/es.math.log2');
require('../modules/es.math.sign');
require('../modules/es.math.sinh');
require('../modules/es.math.sum-precise');
require('../modules/es.math.tanh');
require('../modules/es.math.to-string-tag');
require('../modules/es.math.trunc');
require('../modules/es.number.constructor');
require('../modules/es.number.epsilon');
require('../modules/es.number.is-finite');
require('../modules/es.number.is-integer');
require('../modules/es.number.is-nan');
require('../modules/es.number.is-safe-integer');
require('../modules/es.number.max-safe-integer');
require('../modules/es.number.min-safe-integer');
require('../modules/es.number.parse-float');
require('../modules/es.number.parse-int');
require('../modules/es.number.to-exponential');
require('../modules/es.number.to-fixed');
require('../modules/es.number.to-precision');
require('../modules/es.object.assign');
require('../modules/es.object.create');
require('../modules/es.object.define-getter');
require('../modules/es.object.define-properties');
require('../modules/es.object.define-property');
require('../modules/es.object.define-setter');
require('../modules/es.object.entries');
require('../modules/es.object.freeze');
require('../modules/es.object.from-entries');
require('../modules/es.object.get-own-property-descriptor');
require('../modules/es.object.get-own-property-descriptors');
require('../modules/es.object.get-own-property-names');
require('../modules/es.object.get-prototype-of');
require('../modules/es.object.group-by');
require('../modules/es.object.has-own');
require('../modules/es.object.is');
require('../modules/es.object.is-extensible');
require('../modules/es.object.is-frozen');
require('../modules/es.object.is-sealed');
require('../modules/es.object.keys');
require('../modules/es.object.lookup-getter');
require('../modules/es.object.lookup-setter');
require('../modules/es.object.prevent-extensions');
require('../modules/es.object.proto');
require('../modules/es.object.seal');
require('../modules/es.object.set-prototype-of');
require('../modules/es.object.to-string');
require('../modules/es.object.values');
require('../modules/es.parse-float');
require('../modules/es.parse-int');
require('../modules/es.promise');
require('../modules/es.promise.all-settled');
require('../modules/es.promise.any');
require('../modules/es.promise.finally');
require('../modules/es.promise.try');
require('../modules/es.promise.with-resolvers');
require('../modules/es.array.from-async');
require('../modules/es.async-disposable-stack.constructor');
require('../modules/es.async-iterator.async-dispose');
require('../modules/es.reflect.apply');
require('../modules/es.reflect.construct');
require('../modules/es.reflect.define-property');
require('../modules/es.reflect.delete-property');
require('../modules/es.reflect.get');
require('../modules/es.reflect.get-own-property-descriptor');
require('../modules/es.reflect.get-prototype-of');
require('../modules/es.reflect.has');
require('../modules/es.reflect.is-extensible');
require('../modules/es.reflect.own-keys');
require('../modules/es.reflect.prevent-extensions');
require('../modules/es.reflect.set');
require('../modules/es.reflect.set-prototype-of');
require('../modules/es.reflect.to-string-tag');
require('../modules/es.regexp.constructor');
require('../modules/es.regexp.escape');
require('../modules/es.regexp.dot-all');
require('../modules/es.regexp.exec');
require('../modules/es.regexp.flags');
require('../modules/es.regexp.sticky');
require('../modules/es.regexp.test');
require('../modules/es.regexp.to-string');
require('../modules/es.set');
require('../modules/es.set.difference.v2');
require('../modules/es.set.intersection.v2');
require('../modules/es.set.is-disjoint-from.v2');
require('../modules/es.set.is-subset-of.v2');
require('../modules/es.set.is-superset-of.v2');
require('../modules/es.set.symmetric-difference.v2');
require('../modules/es.set.union.v2');
require('../modules/es.string.at-alternative');
require('../modules/es.string.code-point-at');
require('../modules/es.string.ends-with');
require('../modules/es.string.from-code-point');
require('../modules/es.string.includes');
require('../modules/es.string.is-well-formed');
require('../modules/es.string.iterator');
require('../modules/es.string.match');
require('../modules/es.string.match-all');
require('../modules/es.string.pad-end');
require('../modules/es.string.pad-start');
require('../modules/es.string.raw');
require('../modules/es.string.repeat');
require('../modules/es.string.replace');
require('../modules/es.string.replace-all');
require('../modules/es.string.search');
require('../modules/es.string.split');
require('../modules/es.string.starts-with');
require('../modules/es.string.substr');
require('../modules/es.string.to-well-formed');
require('../modules/es.string.trim');
require('../modules/es.string.trim-end');
require('../modules/es.string.trim-start');
require('../modules/es.string.anchor');
require('../modules/es.string.big');
require('../modules/es.string.blink');
require('../modules/es.string.bold');
require('../modules/es.string.fixed');
require('../modules/es.string.fontcolor');
require('../modules/es.string.fontsize');
require('../modules/es.string.italics');
require('../modules/es.string.link');
require('../modules/es.string.small');
require('../modules/es.string.strike');
require('../modules/es.string.sub');
require('../modules/es.string.sup');
require('../modules/es.typed-array.float32-array');
require('../modules/es.typed-array.float64-array');
require('../modules/es.typed-array.int8-array');
require('../modules/es.typed-array.int16-array');
require('../modules/es.typed-array.int32-array');
require('../modules/es.typed-array.uint8-array');
require('../modules/es.typed-array.uint8-clamped-array');
require('../modules/es.typed-array.uint16-array');
require('../modules/es.typed-array.uint32-array');
require('../modules/es.typed-array.at');
require('../modules/es.typed-array.copy-within');
require('../modules/es.typed-array.every');
require('../modules/es.typed-array.fill');
require('../modules/es.typed-array.filter');
require('../modules/es.typed-array.find');
require('../modules/es.typed-array.find-index');
require('../modules/es.typed-array.find-last');
require('../modules/es.typed-array.find-last-index');
require('../modules/es.typed-array.for-each');
require('../modules/es.typed-array.from');
require('../modules/es.typed-array.includes');
require('../modules/es.typed-array.index-of');
require('../modules/es.typed-array.iterator');
require('../modules/es.typed-array.join');
require('../modules/es.typed-array.last-index-of');
require('../modules/es.typed-array.map');
require('../modules/es.typed-array.of');
require('../modules/es.typed-array.reduce');
require('../modules/es.typed-array.reduce-right');
require('../modules/es.typed-array.reverse');
require('../modules/es.typed-array.set');
require('../modules/es.typed-array.slice');
require('../modules/es.typed-array.some');
require('../modules/es.typed-array.sort');
require('../modules/es.typed-array.subarray');
require('../modules/es.typed-array.to-locale-string');
require('../modules/es.typed-array.to-reversed');
require('../modules/es.typed-array.to-sorted');
require('../modules/es.typed-array.to-string');
require('../modules/es.typed-array.with');
require('../modules/es.uint8-array.from-base64');
require('../modules/es.uint8-array.from-hex');
require('../modules/es.uint8-array.set-from-base64');
require('../modules/es.uint8-array.set-from-hex');
require('../modules/es.uint8-array.to-base64');
require('../modules/es.uint8-array.to-hex');
require('../modules/es.unescape');
require('../modules/es.weak-map');
require('../modules/es.weak-map.get-or-insert');
require('../modules/es.weak-map.get-or-insert-computed');
require('../modules/es.weak-set');
require('../modules/esnext.aggregate-error');
require('../modules/esnext.suppressed-error.constructor');
require('../modules/esnext.array.from-async');
require('../modules/esnext.array.at');
require('../modules/esnext.array.filter-out');
require('../modules/esnext.array.filter-reject');
require('../modules/esnext.array.find-last');
require('../modules/esnext.array.find-last-index');
require('../modules/esnext.array.group');
require('../modules/esnext.array.group-by');
require('../modules/esnext.array.group-by-to-map');
require('../modules/esnext.array.group-to-map');
require('../modules/esnext.array.is-template-object');
require('../modules/esnext.array.last-index');
require('../modules/esnext.array.last-item');
require('../modules/esnext.array.to-reversed');
require('../modules/esnext.array.to-sorted');
require('../modules/esnext.array.to-spliced');
require('../modules/esnext.array.unique-by');
require('../modules/esnext.array.with');
require('../modules/esnext.array-buffer.detached');
require('../modules/esnext.array-buffer.transfer');
require('../modules/esnext.array-buffer.transfer-to-fixed-length');
require('../modules/esnext.async-disposable-stack.constructor');
require('../modules/esnext.async-iterator.constructor');
require('../modules/esnext.async-iterator.as-indexed-pairs');
require('../modules/esnext.async-iterator.async-dispose');
require('../modules/esnext.async-iterator.drop');
require('../modules/esnext.async-iterator.every');
require('../modules/esnext.async-iterator.filter');
require('../modules/esnext.async-iterator.find');
require('../modules/esnext.async-iterator.flat-map');
require('../modules/esnext.async-iterator.for-each');
require('../modules/esnext.async-iterator.from');
require('../modules/esnext.async-iterator.indexed');
require('../modules/esnext.async-iterator.map');
require('../modules/esnext.async-iterator.reduce');
require('../modules/esnext.async-iterator.some');
require('../modules/esnext.async-iterator.take');
require('../modules/esnext.async-iterator.to-array');
require('../modules/esnext.bigint.range');
require('../modules/esnext.composite-key');
require('../modules/esnext.composite-symbol');
require('../modules/esnext.data-view.get-float16');
require('../modules/esnext.data-view.get-uint8-clamped');
require('../modules/esnext.data-view.set-float16');
require('../modules/esnext.data-view.set-uint8-clamped');
require('../modules/esnext.disposable-stack.constructor');
require('../modules/esnext.error.is-error');
require('../modules/esnext.function.demethodize');
require('../modules/esnext.function.is-callable');
require('../modules/esnext.function.is-constructor');
require('../modules/esnext.function.metadata');
require('../modules/esnext.function.un-this');
require('../modules/esnext.global-this');
require('../modules/esnext.iterator.constructor');
require('../modules/esnext.iterator.as-indexed-pairs');
require('../modules/esnext.iterator.chunks');
require('../modules/esnext.iterator.concat');
require('../modules/esnext.iterator.dispose');
require('../modules/esnext.iterator.drop');
require('../modules/esnext.iterator.every');
require('../modules/esnext.iterator.filter');
require('../modules/esnext.iterator.find');
require('../modules/esnext.iterator.flat-map');
require('../modules/esnext.iterator.for-each');
require('../modules/esnext.iterator.from');
require('../modules/esnext.iterator.indexed');
require('../modules/esnext.iterator.map');
require('../modules/esnext.iterator.range');
require('../modules/esnext.iterator.reduce');
require('../modules/esnext.iterator.sliding');
require('../modules/esnext.iterator.some');
require('../modules/esnext.iterator.take');
require('../modules/esnext.iterator.to-array');
require('../modules/esnext.iterator.to-async');
require('../modules/esnext.iterator.windows');
require('../modules/esnext.iterator.zip');
require('../modules/esnext.iterator.zip-keyed');
require('../modules/esnext.json.is-raw-json');
require('../modules/esnext.json.parse');
require('../modules/esnext.json.raw-json');
require('../modules/esnext.map.delete-all');
require('../modules/esnext.map.emplace');
require('../modules/esnext.map.every');
require('../modules/esnext.map.filter');
require('../modules/esnext.map.find');
require('../modules/esnext.map.find-key');
require('../modules/esnext.map.from');
require('../modules/esnext.map.get-or-insert');
require('../modules/esnext.map.get-or-insert-computed');
require('../modules/esnext.map.group-by');
require('../modules/esnext.map.includes');
require('../modules/esnext.map.key-by');
require('../modules/esnext.map.key-of');
require('../modules/esnext.map.map-keys');
require('../modules/esnext.map.map-values');
require('../modules/esnext.map.merge');
require('../modules/esnext.map.of');
require('../modules/esnext.map.reduce');
require('../modules/esnext.map.some');
require('../modules/esnext.map.update');
require('../modules/esnext.map.update-or-insert');
require('../modules/esnext.map.upsert');
require('../modules/esnext.math.clamp');
require('../modules/esnext.math.deg-per-rad');
require('../modules/esnext.math.degrees');
require('../modules/esnext.math.fscale');
require('../modules/esnext.math.f16round');
require('../modules/esnext.math.iaddh');
require('../modules/esnext.math.imulh');
require('../modules/esnext.math.isubh');
require('../modules/esnext.math.rad-per-deg');
require('../modules/esnext.math.radians');
require('../modules/esnext.math.scale');
require('../modules/esnext.math.seeded-prng');
require('../modules/esnext.math.signbit');
require('../modules/esnext.math.sum-precise');
require('../modules/esnext.math.umulh');
require('../modules/esnext.number.clamp');
require('../modules/esnext.number.from-string');
require('../modules/esnext.number.range');
require('../modules/esnext.object.has-own');
require('../modules/esnext.object.iterate-entries');
require('../modules/esnext.object.iterate-keys');
require('../modules/esnext.object.iterate-values');
require('../modules/esnext.object.group-by');
require('../modules/esnext.observable');
require('../modules/esnext.promise.all-settled');
require('../modules/esnext.promise.any');
require('../modules/esnext.promise.try');
require('../modules/esnext.promise.with-resolvers');
require('../modules/esnext.reflect.define-metadata');
require('../modules/esnext.reflect.delete-metadata');
require('../modules/esnext.reflect.get-metadata');
require('../modules/esnext.reflect.get-metadata-keys');
require('../modules/esnext.reflect.get-own-metadata');
require('../modules/esnext.reflect.get-own-metadata-keys');
require('../modules/esnext.reflect.has-metadata');
require('../modules/esnext.reflect.has-own-metadata');
require('../modules/esnext.reflect.metadata');
require('../modules/esnext.regexp.escape');
require('../modules/esnext.set.add-all');
require('../modules/esnext.set.delete-all');
require('../modules/esnext.set.difference.v2');
require('../modules/esnext.set.difference');
require('../modules/esnext.set.every');
require('../modules/esnext.set.filter');
require('../modules/esnext.set.find');
require('../modules/esnext.set.from');
require('../modules/esnext.set.intersection.v2');
require('../modules/esnext.set.intersection');
require('../modules/esnext.set.is-disjoint-from.v2');
require('../modules/esnext.set.is-disjoint-from');
require('../modules/esnext.set.is-subset-of.v2');
require('../modules/esnext.set.is-subset-of');
require('../modules/esnext.set.is-superset-of.v2');
require('../modules/esnext.set.is-superset-of');
require('../modules/esnext.set.join');
require('../modules/esnext.set.map');
require('../modules/esnext.set.of');
require('../modules/esnext.set.reduce');
require('../modules/esnext.set.some');
require('../modules/esnext.set.symmetric-difference.v2');
require('../modules/esnext.set.symmetric-difference');
require('../modules/esnext.set.union.v2');
require('../modules/esnext.set.union');
require('../modules/esnext.string.at');
require('../modules/esnext.string.cooked');
require('../modules/esnext.string.code-points');
require('../modules/esnext.string.dedent');
require('../modules/esnext.string.is-well-formed');
require('../modules/esnext.string.match-all');
require('../modules/esnext.string.replace-all');
require('../modules/esnext.string.to-well-formed');
require('../modules/esnext.symbol.async-dispose');
require('../modules/esnext.symbol.custom-matcher');
require('../modules/esnext.symbol.dispose');
require('../modules/esnext.symbol.is-registered-symbol');
require('../modules/esnext.symbol.is-registered');
require('../modules/esnext.symbol.is-well-known-symbol');
require('../modules/esnext.symbol.is-well-known');
require('../modules/esnext.symbol.matcher');
require('../modules/esnext.symbol.metadata');
require('../modules/esnext.symbol.metadata-key');
require('../modules/esnext.symbol.observable');
require('../modules/esnext.symbol.pattern-match');
require('../modules/esnext.symbol.replace-all');
require('../modules/esnext.typed-array.from-async');
require('../modules/esnext.typed-array.at');
require('../modules/esnext.typed-array.filter-out');
require('../modules/esnext.typed-array.filter-reject');
require('../modules/esnext.typed-array.find-last');
require('../modules/esnext.typed-array.find-last-index');
require('../modules/esnext.typed-array.group-by');
require('../modules/esnext.typed-array.to-reversed');
require('../modules/esnext.typed-array.to-sorted');
require('../modules/esnext.typed-array.to-spliced');
require('../modules/esnext.typed-array.unique-by');
require('../modules/esnext.typed-array.with');
require('../modules/esnext.uint8-array.from-base64');
require('../modules/esnext.uint8-array.from-hex');
require('../modules/esnext.uint8-array.set-from-base64');
require('../modules/esnext.uint8-array.set-from-hex');
require('../modules/esnext.uint8-array.to-base64');
require('../modules/esnext.uint8-array.to-hex');
require('../modules/esnext.weak-map.delete-all');
require('../modules/esnext.weak-map.from');
require('../modules/esnext.weak-map.of');
require('../modules/esnext.weak-map.emplace');
require('../modules/esnext.weak-map.get-or-insert');
require('../modules/esnext.weak-map.get-or-insert-computed');
require('../modules/esnext.weak-map.upsert');
require('../modules/esnext.weak-set.add-all');
require('../modules/esnext.weak-set.delete-all');
require('../modules/esnext.weak-set.from');
require('../modules/esnext.weak-set.of');
require('../modules/web.atob');
require('../modules/web.btoa');
require('../modules/web.dom-collections.for-each');
require('../modules/web.dom-collections.iterator');
require('../modules/web.dom-exception.constructor');
require('../modules/web.dom-exception.stack');
require('../modules/web.dom-exception.to-string-tag');
require('../modules/web.immediate');
require('../modules/web.queue-microtask');
require('../modules/web.self');
require('../modules/web.structured-clone');
require('../modules/web.timers');
require('../modules/web.url');
require('../modules/web.url.can-parse');
require('../modules/web.url.parse');
require('../modules/web.url.to-json');
require('../modules/web.url-search-params');
require('../modules/web.url-search-params.delete');
require('../modules/web.url-search-params.has');
require('../modules/web.url-search-params.size');

module.exports = require('../internals/path');

}, function(modId) { var map = {"../modules/es.symbol":1773651886959,"../modules/es.symbol.description":1773651887055,"../modules/es.symbol.async-dispose":1773651887056,"../modules/es.symbol.async-iterator":1773651887057,"../modules/es.symbol.dispose":1773651887058,"../modules/es.symbol.has-instance":1773651887059,"../modules/es.symbol.is-concat-spreadable":1773651887060,"../modules/es.symbol.iterator":1773651887061,"../modules/es.symbol.match":1773651887062,"../modules/es.symbol.match-all":1773651887063,"../modules/es.symbol.replace":1773651887064,"../modules/es.symbol.search":1773651887065,"../modules/es.symbol.species":1773651887066,"../modules/es.symbol.split":1773651887067,"../modules/es.symbol.to-primitive":1773651887068,"../modules/es.symbol.to-string-tag":1773651887069,"../modules/es.symbol.unscopables":1773651887070,"../modules/es.error.cause":1773651887071,"../modules/es.error.is-error":1773651887086,"../modules/es.error.to-string":1773651887087,"../modules/es.aggregate-error":1773651887088,"../modules/es.aggregate-error.cause":1773651887098,"../modules/es.suppressed-error.constructor":1773651887099,"../modules/es.array.at":1773651887100,"../modules/es.array.concat":1773651887102,"../modules/es.array.copy-within":1773651887106,"../modules/es.array.every":1773651887109,"../modules/es.array.fill":1773651887111,"../modules/es.array.filter":1773651887113,"../modules/es.array.find":1773651887114,"../modules/es.array.find-index":1773651887115,"../modules/es.array.find-last":1773651887116,"../modules/es.array.find-last-index":1773651887118,"../modules/es.array.flat":1773651887119,"../modules/es.array.flat-map":1773651887121,"../modules/es.array.for-each":1773651887122,"../modules/es.array.from":1773651887124,"../modules/es.array.includes":1773651887128,"../modules/es.array.index-of":1773651887129,"../modules/es.array.is-array":1773651887130,"../modules/es.array.iterator":1773651887131,"../modules/es.array.join":1773651887137,"../modules/es.array.last-index-of":1773651887138,"../modules/es.array.map":1773651887140,"../modules/es.array.of":1773651887141,"../modules/es.array.push":1773651887142,"../modules/es.array.reduce":1773651887143,"../modules/es.array.reduce-right":1773651887147,"../modules/es.array.reverse":1773651887148,"../modules/es.array.slice":1773651887149,"../modules/es.array.some":1773651887150,"../modules/es.array.sort":1773651887151,"../modules/es.array.species":1773651887156,"../modules/es.array.splice":1773651887158,"../modules/es.array.to-reversed":1773651887159,"../modules/es.array.to-sorted":1773651887160,"../modules/es.array.to-spliced":1773651887163,"../modules/es.array.unscopables.flat":1773651887164,"../modules/es.array.unscopables.flat-map":1773651887165,"../modules/es.array.unshift":1773651887166,"../modules/es.array.with":1773651887167,"../modules/es.array-buffer.constructor":1773651887168,"../modules/es.array-buffer.is-view":1773651887169,"../modules/es.array-buffer.slice":1773651887170,"../modules/es.data-view":1773651887171,"../modules/es.data-view.get-float16":1773651887172,"../modules/es.data-view.set-float16":1773651887173,"../modules/es.array-buffer.detached":1773651887174,"../modules/es.array-buffer.transfer":1773651887175,"../modules/es.array-buffer.transfer-to-fixed-length":1773651887176,"../modules/es.date.get-year":1773651887177,"../modules/es.date.now":1773651887178,"../modules/es.date.set-year":1773651887179,"../modules/es.date.to-gmt-string":1773651887180,"../modules/es.date.to-iso-string":1773651887181,"../modules/es.date.to-json":1773651887185,"../modules/es.date.to-primitive":1773651887186,"../modules/es.date.to-string":1773651887187,"../modules/es.disposable-stack.constructor":1773651887188,"../modules/es.escape":1773651887192,"../modules/es.function.bind":1773651887193,"../modules/es.function.has-instance":1773651887195,"../modules/es.function.name":1773651887197,"../modules/es.global-this":1773651887198,"../modules/es.iterator.constructor":1773651887199,"../modules/es.iterator.concat":1773651887200,"../modules/es.iterator.dispose":1773651887203,"../modules/es.iterator.drop":1773651887204,"../modules/es.iterator.every":1773651887210,"../modules/es.iterator.filter":1773651887211,"../modules/es.iterator.find":1773651887212,"../modules/es.iterator.flat-map":1773651887213,"../modules/es.iterator.for-each":1773651887215,"../modules/es.iterator.from":1773651887216,"../modules/es.iterator.map":1773651887217,"../modules/es.iterator.reduce":1773651887218,"../modules/es.iterator.some":1773651887219,"../modules/es.iterator.take":1773651887220,"../modules/es.iterator.to-array":1773651887221,"../modules/es.json.is-raw-json":1773651887222,"../modules/es.json.parse":1773651887223,"../modules/es.json.raw-json":1773651887224,"../modules/es.json.stringify":1773651887050,"../modules/es.json.to-string-tag":1773651887226,"../modules/es.map":1773651887227,"../modules/es.map.group-by":1773651887234,"../modules/es.map.get-or-insert":1773651887237,"../modules/es.map.get-or-insert-computed":1773651887239,"../modules/es.math.acosh":1773651887240,"../modules/es.math.asinh":1773651887242,"../modules/es.math.atanh":1773651887243,"../modules/es.math.cbrt":1773651887244,"../modules/es.math.clz32":1773651887246,"../modules/es.math.cosh":1773651887247,"../modules/es.math.expm1":1773651887249,"../modules/es.math.fround":1773651887250,"../modules/es.math.f16round":1773651887254,"../modules/es.math.hypot":1773651887255,"../modules/es.math.imul":1773651887256,"../modules/es.math.log10":1773651887257,"../modules/es.math.log1p":1773651887259,"../modules/es.math.log2":1773651887260,"../modules/es.math.sign":1773651887262,"../modules/es.math.sinh":1773651887263,"../modules/es.math.sum-precise":1773651887264,"../modules/es.math.tanh":1773651887265,"../modules/es.math.to-string-tag":1773651887266,"../modules/es.math.trunc":1773651887267,"../modules/es.number.constructor":1773651887268,"../modules/es.number.epsilon":1773651887272,"../modules/es.number.is-finite":1773651887273,"../modules/es.number.is-integer":1773651887275,"../modules/es.number.is-nan":1773651887277,"../modules/es.number.is-safe-integer":1773651887278,"../modules/es.number.max-safe-integer":1773651887279,"../modules/es.number.min-safe-integer":1773651887280,"../modules/es.number.parse-float":1773651887281,"../modules/es.number.parse-int":1773651887283,"../modules/es.number.to-exponential":1773651887285,"../modules/es.number.to-fixed":1773651887286,"../modules/es.number.to-precision":1773651887287,"../modules/es.object.assign":1773651887288,"../modules/es.object.create":1773651887290,"../modules/es.object.define-getter":1773651887291,"../modules/es.object.define-properties":1773651887293,"../modules/es.object.define-property":1773651887294,"../modules/es.object.define-setter":1773651887295,"../modules/es.object.entries":1773651887296,"../modules/es.object.freeze":1773651887298,"../modules/es.object.from-entries":1773651887299,"../modules/es.object.get-own-property-descriptor":1773651887300,"../modules/es.object.get-own-property-descriptors":1773651887301,"../modules/es.object.get-own-property-names":1773651887302,"../modules/es.object.get-prototype-of":1773651887303,"../modules/es.object.group-by":1773651887304,"../modules/es.object.has-own":1773651887305,"../modules/es.object.is":1773651887306,"../modules/es.object.is-extensible":1773651887308,"../modules/es.object.is-frozen":1773651887309,"../modules/es.object.is-sealed":1773651887310,"../modules/es.object.keys":1773651887311,"../modules/es.object.lookup-getter":1773651887312,"../modules/es.object.lookup-setter":1773651887313,"../modules/es.object.prevent-extensions":1773651887314,"../modules/es.object.proto":1773651887315,"../modules/es.object.seal":1773651887316,"../modules/es.object.set-prototype-of":1773651887317,"../modules/es.object.to-string":1773651887318,"../modules/es.object.values":1773651887319,"../modules/es.parse-float":1773651887320,"../modules/es.parse-int":1773651887321,"../modules/es.promise":1773651887322,"../modules/es.promise.all-settled":1773651887346,"../modules/es.promise.any":1773651887347,"../modules/es.promise.finally":1773651887348,"../modules/es.promise.try":1773651887349,"../modules/es.promise.with-resolvers":1773651887350,"../modules/es.array.from-async":1773651887351,"../modules/es.async-disposable-stack.constructor":1773651887358,"../modules/es.async-iterator.async-dispose":1773651887359,"../modules/es.reflect.apply":1773651887360,"../modules/es.reflect.construct":1773651887361,"../modules/es.reflect.define-property":1773651887362,"../modules/es.reflect.delete-property":1773651887363,"../modules/es.reflect.get":1773651887364,"../modules/es.reflect.get-own-property-descriptor":1773651887366,"../modules/es.reflect.get-prototype-of":1773651887367,"../modules/es.reflect.has":1773651887368,"../modules/es.reflect.is-extensible":1773651887369,"../modules/es.reflect.own-keys":1773651887370,"../modules/es.reflect.prevent-extensions":1773651887371,"../modules/es.reflect.set":1773651887372,"../modules/es.reflect.set-prototype-of":1773651887373,"../modules/es.reflect.to-string-tag":1773651887374,"../modules/es.regexp.constructor":1773651887375,"../modules/es.regexp.escape":1773651887376,"../modules/es.regexp.dot-all":1773651887378,"../modules/es.regexp.exec":1773651887379,"../modules/es.regexp.flags":1773651887380,"../modules/es.regexp.sticky":1773651887381,"../modules/es.regexp.test":1773651887382,"../modules/es.regexp.to-string":1773651887383,"../modules/es.set":1773651887384,"../modules/es.set.difference.v2":1773651887386,"../modules/es.set.intersection.v2":1773651887396,"../modules/es.set.is-disjoint-from.v2":1773651887398,"../modules/es.set.is-subset-of.v2":1773651887400,"../modules/es.set.is-superset-of.v2":1773651887402,"../modules/es.set.symmetric-difference.v2":1773651887404,"../modules/es.set.union.v2":1773651887407,"../modules/es.string.at-alternative":1773651887409,"../modules/es.string.code-point-at":1773651887410,"../modules/es.string.ends-with":1773651887412,"../modules/es.string.from-code-point":1773651887416,"../modules/es.string.includes":1773651887417,"../modules/es.string.is-well-formed":1773651887418,"../modules/es.string.iterator":1773651887419,"../modules/es.string.match":1773651887420,"../modules/es.string.match-all":1773651887421,"../modules/es.string.pad-end":1773651887428,"../modules/es.string.pad-start":1773651887430,"../modules/es.string.raw":1773651887431,"../modules/es.string.repeat":1773651887432,"../modules/es.string.replace":1773651887433,"../modules/es.string.replace-all":1773651887434,"../modules/es.string.search":1773651887436,"../modules/es.string.split":1773651887437,"../modules/es.string.starts-with":1773651887438,"../modules/es.string.substr":1773651887439,"../modules/es.string.to-well-formed":1773651887440,"../modules/es.string.trim":1773651887441,"../modules/es.string.trim-end":1773651887443,"../modules/es.string.trim-start":1773651887446,"../modules/es.string.anchor":1773651887449,"../modules/es.string.big":1773651887452,"../modules/es.string.blink":1773651887453,"../modules/es.string.bold":1773651887454,"../modules/es.string.fixed":1773651887455,"../modules/es.string.fontcolor":1773651887456,"../modules/es.string.fontsize":1773651887457,"../modules/es.string.italics":1773651887458,"../modules/es.string.link":1773651887459,"../modules/es.string.small":1773651887460,"../modules/es.string.strike":1773651887461,"../modules/es.string.sub":1773651887462,"../modules/es.string.sup":1773651887463,"../modules/es.typed-array.float32-array":1773651887464,"../modules/es.typed-array.float64-array":1773651887465,"../modules/es.typed-array.int8-array":1773651887466,"../modules/es.typed-array.int16-array":1773651887467,"../modules/es.typed-array.int32-array":1773651887468,"../modules/es.typed-array.uint8-array":1773651887469,"../modules/es.typed-array.uint8-clamped-array":1773651887470,"../modules/es.typed-array.uint16-array":1773651887471,"../modules/es.typed-array.uint32-array":1773651887472,"../modules/es.typed-array.at":1773651887473,"../modules/es.typed-array.copy-within":1773651887474,"../modules/es.typed-array.every":1773651887475,"../modules/es.typed-array.fill":1773651887476,"../modules/es.typed-array.filter":1773651887477,"../modules/es.typed-array.find":1773651887478,"../modules/es.typed-array.find-index":1773651887479,"../modules/es.typed-array.find-last":1773651887480,"../modules/es.typed-array.find-last-index":1773651887481,"../modules/es.typed-array.for-each":1773651887482,"../modules/es.typed-array.from":1773651887483,"../modules/es.typed-array.includes":1773651887484,"../modules/es.typed-array.index-of":1773651887485,"../modules/es.typed-array.iterator":1773651887486,"../modules/es.typed-array.join":1773651887487,"../modules/es.typed-array.last-index-of":1773651887488,"../modules/es.typed-array.map":1773651887489,"../modules/es.typed-array.of":1773651887490,"../modules/es.typed-array.reduce":1773651887491,"../modules/es.typed-array.reduce-right":1773651887492,"../modules/es.typed-array.reverse":1773651887493,"../modules/es.typed-array.set":1773651887494,"../modules/es.typed-array.slice":1773651887495,"../modules/es.typed-array.some":1773651887496,"../modules/es.typed-array.sort":1773651887497,"../modules/es.typed-array.subarray":1773651887498,"../modules/es.typed-array.to-locale-string":1773651887499,"../modules/es.typed-array.to-reversed":1773651887500,"../modules/es.typed-array.to-sorted":1773651887501,"../modules/es.typed-array.to-string":1773651887502,"../modules/es.typed-array.with":1773651887503,"../modules/es.uint8-array.from-base64":1773651887504,"../modules/es.uint8-array.from-hex":1773651887505,"../modules/es.uint8-array.set-from-base64":1773651887506,"../modules/es.uint8-array.set-from-hex":1773651887507,"../modules/es.uint8-array.to-base64":1773651887508,"../modules/es.uint8-array.to-hex":1773651887509,"../modules/es.unescape":1773651887510,"../modules/es.weak-map":1773651887511,"../modules/es.weak-map.get-or-insert":1773651887514,"../modules/es.weak-map.get-or-insert-computed":1773651887517,"../modules/es.weak-set":1773651887519,"../modules/esnext.aggregate-error":1773651887521,"../modules/esnext.suppressed-error.constructor":1773651887522,"../modules/esnext.array.from-async":1773651887523,"../modules/esnext.array.at":1773651887524,"../modules/esnext.array.filter-out":1773651887525,"../modules/esnext.array.filter-reject":1773651887526,"../modules/esnext.array.find-last":1773651887527,"../modules/esnext.array.find-last-index":1773651887528,"../modules/esnext.array.group":1773651887529,"../modules/esnext.array.group-by":1773651887531,"../modules/esnext.array.group-by-to-map":1773651887532,"../modules/esnext.array.group-to-map":1773651887534,"../modules/esnext.array.is-template-object":1773651887535,"../modules/esnext.array.last-index":1773651887536,"../modules/esnext.array.last-item":1773651887537,"../modules/esnext.array.to-reversed":1773651887538,"../modules/esnext.array.to-sorted":1773651887539,"../modules/esnext.array.to-spliced":1773651887540,"../modules/esnext.array.unique-by":1773651887541,"../modules/esnext.array.with":1773651887544,"../modules/esnext.array-buffer.detached":1773651887545,"../modules/esnext.array-buffer.transfer":1773651887546,"../modules/esnext.array-buffer.transfer-to-fixed-length":1773651887547,"../modules/esnext.async-disposable-stack.constructor":1773651887548,"../modules/esnext.async-iterator.constructor":1773651887549,"../modules/esnext.async-iterator.as-indexed-pairs":1773651887550,"../modules/esnext.async-iterator.async-dispose":1773651887554,"../modules/esnext.async-iterator.drop":1773651887555,"../modules/esnext.async-iterator.every":1773651887556,"../modules/esnext.async-iterator.filter":1773651887557,"../modules/esnext.async-iterator.find":1773651887558,"../modules/esnext.async-iterator.flat-map":1773651887559,"../modules/esnext.async-iterator.for-each":1773651887561,"../modules/esnext.async-iterator.from":1773651887562,"../modules/esnext.async-iterator.indexed":1773651887564,"../modules/esnext.async-iterator.map":1773651887565,"../modules/esnext.async-iterator.reduce":1773651887566,"../modules/esnext.async-iterator.some":1773651887567,"../modules/esnext.async-iterator.take":1773651887568,"../modules/esnext.async-iterator.to-array":1773651887569,"../modules/esnext.bigint.range":1773651887570,"../modules/esnext.composite-key":1773651887572,"../modules/esnext.composite-symbol":1773651887574,"../modules/esnext.data-view.get-float16":1773651887575,"../modules/esnext.data-view.get-uint8-clamped":1773651887576,"../modules/esnext.data-view.set-float16":1773651887577,"../modules/esnext.data-view.set-uint8-clamped":1773651887578,"../modules/esnext.disposable-stack.constructor":1773651887579,"../modules/esnext.error.is-error":1773651887580,"../modules/esnext.function.demethodize":1773651887581,"../modules/esnext.function.is-callable":1773651887583,"../modules/esnext.function.is-constructor":1773651887584,"../modules/esnext.function.metadata":1773651887585,"../modules/esnext.function.un-this":1773651887586,"../modules/esnext.global-this":1773651887587,"../modules/esnext.iterator.constructor":1773651887588,"../modules/esnext.iterator.as-indexed-pairs":1773651887589,"../modules/esnext.iterator.chunks":1773651887591,"../modules/esnext.iterator.concat":1773651887592,"../modules/esnext.iterator.dispose":1773651887593,"../modules/esnext.iterator.drop":1773651887594,"../modules/esnext.iterator.every":1773651887595,"../modules/esnext.iterator.filter":1773651887596,"../modules/esnext.iterator.find":1773651887597,"../modules/esnext.iterator.flat-map":1773651887598,"../modules/esnext.iterator.for-each":1773651887599,"../modules/esnext.iterator.from":1773651887600,"../modules/esnext.iterator.indexed":1773651887601,"../modules/esnext.iterator.map":1773651887602,"../modules/esnext.iterator.range":1773651887603,"../modules/esnext.iterator.reduce":1773651887604,"../modules/esnext.iterator.sliding":1773651887605,"../modules/esnext.iterator.some":1773651887607,"../modules/esnext.iterator.take":1773651887608,"../modules/esnext.iterator.to-array":1773651887609,"../modules/esnext.iterator.to-async":1773651887610,"../modules/esnext.iterator.windows":1773651887611,"../modules/esnext.iterator.zip":1773651887612,"../modules/esnext.iterator.zip-keyed":1773651887617,"../modules/esnext.json.is-raw-json":1773651887618,"../modules/esnext.json.parse":1773651887619,"../modules/esnext.json.raw-json":1773651887620,"../modules/esnext.map.delete-all":1773651887621,"../modules/esnext.map.emplace":1773651887622,"../modules/esnext.map.every":1773651887623,"../modules/esnext.map.filter":1773651887624,"../modules/esnext.map.find":1773651887625,"../modules/esnext.map.find-key":1773651887626,"../modules/esnext.map.from":1773651887627,"../modules/esnext.map.get-or-insert":1773651887629,"../modules/esnext.map.get-or-insert-computed":1773651887630,"../modules/esnext.map.group-by":1773651887631,"../modules/esnext.map.includes":1773651887632,"../modules/esnext.map.key-by":1773651887634,"../modules/esnext.map.key-of":1773651887635,"../modules/esnext.map.map-keys":1773651887636,"../modules/esnext.map.map-values":1773651887637,"../modules/esnext.map.merge":1773651887638,"../modules/esnext.map.of":1773651887639,"../modules/esnext.map.reduce":1773651887641,"../modules/esnext.map.some":1773651887642,"../modules/esnext.map.update":1773651887643,"../modules/esnext.map.update-or-insert":1773651887644,"../modules/esnext.map.upsert":1773651887646,"../modules/esnext.math.clamp":1773651887647,"../modules/esnext.math.deg-per-rad":1773651887650,"../modules/esnext.math.degrees":1773651887651,"../modules/esnext.math.fscale":1773651887652,"../modules/esnext.math.f16round":1773651887654,"../modules/esnext.math.iaddh":1773651887655,"../modules/esnext.math.imulh":1773651887656,"../modules/esnext.math.isubh":1773651887657,"../modules/esnext.math.rad-per-deg":1773651887658,"../modules/esnext.math.radians":1773651887659,"../modules/esnext.math.scale":1773651887660,"../modules/esnext.math.seeded-prng":1773651887661,"../modules/esnext.math.signbit":1773651887662,"../modules/esnext.math.sum-precise":1773651887663,"../modules/esnext.math.umulh":1773651887664,"../modules/esnext.number.clamp":1773651887665,"../modules/esnext.number.from-string":1773651887666,"../modules/esnext.number.range":1773651887667,"../modules/esnext.object.has-own":1773651887668,"../modules/esnext.object.iterate-entries":1773651887669,"../modules/esnext.object.iterate-keys":1773651887671,"../modules/esnext.object.iterate-values":1773651887672,"../modules/esnext.object.group-by":1773651887673,"../modules/esnext.observable":1773651887674,"../modules/esnext.promise.all-settled":1773651887678,"../modules/esnext.promise.any":1773651887679,"../modules/esnext.promise.try":1773651887680,"../modules/esnext.promise.with-resolvers":1773651887681,"../modules/esnext.reflect.define-metadata":1773651887682,"../modules/esnext.reflect.delete-metadata":1773651887684,"../modules/esnext.reflect.get-metadata":1773651887685,"../modules/esnext.reflect.get-metadata-keys":1773651887686,"../modules/esnext.reflect.get-own-metadata":1773651887687,"../modules/esnext.reflect.get-own-metadata-keys":1773651887688,"../modules/esnext.reflect.has-metadata":1773651887689,"../modules/esnext.reflect.has-own-metadata":1773651887690,"../modules/esnext.reflect.metadata":1773651887691,"../modules/esnext.regexp.escape":1773651887692,"../modules/esnext.set.add-all":1773651887693,"../modules/esnext.set.delete-all":1773651887694,"../modules/esnext.set.difference.v2":1773651887695,"../modules/esnext.set.difference":1773651887696,"../modules/esnext.set.every":1773651887699,"../modules/esnext.set.filter":1773651887700,"../modules/esnext.set.find":1773651887701,"../modules/esnext.set.from":1773651887702,"../modules/esnext.set.intersection.v2":1773651887703,"../modules/esnext.set.intersection":1773651887704,"../modules/esnext.set.is-disjoint-from.v2":1773651887705,"../modules/esnext.set.is-disjoint-from":1773651887706,"../modules/esnext.set.is-subset-of.v2":1773651887707,"../modules/esnext.set.is-subset-of":1773651887708,"../modules/esnext.set.is-superset-of.v2":1773651887709,"../modules/esnext.set.is-superset-of":1773651887710,"../modules/esnext.set.join":1773651887711,"../modules/esnext.set.map":1773651887712,"../modules/esnext.set.of":1773651887713,"../modules/esnext.set.reduce":1773651887714,"../modules/esnext.set.some":1773651887715,"../modules/esnext.set.symmetric-difference.v2":1773651887716,"../modules/esnext.set.symmetric-difference":1773651887717,"../modules/esnext.set.union.v2":1773651887718,"../modules/esnext.set.union":1773651887719,"../modules/esnext.string.at":1773651887720,"../modules/esnext.string.cooked":1773651887721,"../modules/esnext.string.code-points":1773651887723,"../modules/esnext.string.dedent":1773651887724,"../modules/esnext.string.is-well-formed":1773651887726,"../modules/esnext.string.match-all":1773651887727,"../modules/esnext.string.replace-all":1773651887728,"../modules/esnext.string.to-well-formed":1773651887729,"../modules/esnext.symbol.async-dispose":1773651887730,"../modules/esnext.symbol.custom-matcher":1773651887731,"../modules/esnext.symbol.dispose":1773651887732,"../modules/esnext.symbol.is-registered-symbol":1773651887733,"../modules/esnext.symbol.is-registered":1773651887735,"../modules/esnext.symbol.is-well-known-symbol":1773651887736,"../modules/esnext.symbol.is-well-known":1773651887738,"../modules/esnext.symbol.matcher":1773651887739,"../modules/esnext.symbol.metadata":1773651887740,"../modules/esnext.symbol.metadata-key":1773651887741,"../modules/esnext.symbol.observable":1773651887742,"../modules/esnext.symbol.pattern-match":1773651887743,"../modules/esnext.symbol.replace-all":1773651887744,"../modules/esnext.typed-array.from-async":1773651887745,"../modules/esnext.typed-array.at":1773651887746,"../modules/esnext.typed-array.filter-out":1773651887747,"../modules/esnext.typed-array.filter-reject":1773651887748,"../modules/esnext.typed-array.find-last":1773651887749,"../modules/esnext.typed-array.find-last-index":1773651887750,"../modules/esnext.typed-array.group-by":1773651887751,"../modules/esnext.typed-array.to-reversed":1773651887752,"../modules/esnext.typed-array.to-sorted":1773651887753,"../modules/esnext.typed-array.to-spliced":1773651887754,"../modules/esnext.typed-array.unique-by":1773651887755,"../modules/esnext.typed-array.with":1773651887756,"../modules/esnext.uint8-array.from-base64":1773651887757,"../modules/esnext.uint8-array.from-hex":1773651887758,"../modules/esnext.uint8-array.set-from-base64":1773651887759,"../modules/esnext.uint8-array.set-from-hex":1773651887760,"../modules/esnext.uint8-array.to-base64":1773651887761,"../modules/esnext.uint8-array.to-hex":1773651887762,"../modules/esnext.weak-map.delete-all":1773651887763,"../modules/esnext.weak-map.from":1773651887764,"../modules/esnext.weak-map.of":1773651887765,"../modules/esnext.weak-map.emplace":1773651887766,"../modules/esnext.weak-map.get-or-insert":1773651887767,"../modules/esnext.weak-map.get-or-insert-computed":1773651887768,"../modules/esnext.weak-map.upsert":1773651887769,"../modules/esnext.weak-set.add-all":1773651887770,"../modules/esnext.weak-set.delete-all":1773651887773,"../modules/esnext.weak-set.from":1773651887774,"../modules/esnext.weak-set.of":1773651887775,"../modules/web.atob":1773651887776,"../modules/web.btoa":1773651887778,"../modules/web.dom-collections.for-each":1773651887779,"../modules/web.dom-collections.iterator":1773651887780,"../modules/web.dom-exception.constructor":1773651887782,"../modules/web.dom-exception.stack":1773651887786,"../modules/web.dom-exception.to-string-tag":1773651887787,"../modules/web.immediate":1773651887788,"../modules/web.queue-microtask":1773651887792,"../modules/web.self":1773651887793,"../modules/web.structured-clone":1773651887794,"../modules/web.timers":1773651887797,"../modules/web.url":1773651887800,"../modules/web.url.can-parse":1773651887805,"../modules/web.url.parse":1773651887806,"../modules/web.url.to-json":1773651887807,"../modules/web.url-search-params":1773651887808,"../modules/web.url-search-params.delete":1773651887809,"../modules/web.url-search-params.has":1773651887810,"../modules/web.url-search-params.size":1773651887811,"../internals/path":1773651886984}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886959, function(require, module, exports) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require('../modules/es.symbol.constructor');
require('../modules/es.symbol.for');
require('../modules/es.symbol.key-for');
require('../modules/es.json.stringify');
require('../modules/es.object.get-own-property-symbols');

}, function(modId) { var map = {"../modules/es.symbol.constructor":1773651886960,"../modules/es.symbol.for":1773651887047,"../modules/es.symbol.key-for":1773651887049,"../modules/es.json.stringify":1773651887050,"../modules/es.object.get-own-property-symbols":1773651887054}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886960, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var IS_PURE = require('../internals/is-pure');
var DESCRIPTORS = require('../internals/descriptors');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');
var fails = require('../internals/fails');
var hasOwn = require('../internals/has-own-property');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var anObject = require('../internals/an-object');
var toIndexedObject = require('../internals/to-indexed-object');
var toPropertyKey = require('../internals/to-property-key');
var $toString = require('../internals/to-string');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var nativeObjectCreate = require('../internals/object-create');
var objectKeys = require('../internals/object-keys');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertyNamesExternal = require('../internals/object-get-own-property-names-external');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');
var definePropertiesModule = require('../internals/object-define-properties');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var defineBuiltIn = require('../internals/define-built-in');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var shared = require('../internals/shared');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');
var uid = require('../internals/uid');
var wellKnownSymbol = require('../internals/well-known-symbol');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineWellKnownSymbol = require('../internals/well-known-symbol-define');
var defineSymbolToPrimitive = require('../internals/symbol-define-to-primitive');
var setToStringTag = require('../internals/set-to-string-tag');
var InternalStateModule = require('../internals/internal-state');
var $forEach = require('../internals/array-iteration').forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);

var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = globalThis.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var RangeError = globalThis.RangeError;
var TypeError = globalThis.TypeError;
var QObject = globalThis.QObject;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var WellKnownSymbolsStore = shared('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var fallbackDefineProperty = function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
};

var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a !== 7;
}) ? fallbackDefineProperty : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, nativeObjectCreate(null)));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function (O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw new TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      var $this = this === undefined ? globalThis : this;
      if ($this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn($this, HIDDEN) && hasOwn($this[HIDDEN], tag)) $this[HIDDEN][tag] = false;
      var descriptor = createPropertyDescriptor(1, value);
      try {
        setSymbolDescriptor($this, tag, descriptor);
      } catch (error) {
        if (!(error instanceof RangeError)) throw error;
        fallbackDefineProperty($this, tag, descriptor);
      }
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  defineBuiltIn(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });

  defineBuiltIn($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  definePropertiesModule.f = $defineProperties;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://tc39.es/ecma262/#sec-symbol.prototype.description
    defineBuiltInAccessor(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      defineBuiltIn(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames
});

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive();

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/function-call":1773651886972,"../internals/function-uncurry-this":1773651886968,"../internals/is-pure":1773651886997,"../internals/descriptors":1773651886971,"../internals/symbol-constructor-detection":1773651886987,"../internals/fails":1773651886965,"../internals/has-own-property":1773651886999,"../internals/object-is-prototype-of":1773651886985,"../internals/an-object":1773651887009,"../internals/to-indexed-object":1773651886975,"../internals/to-property-key":1773651886979,"../internals/to-string":1773651887010,"../internals/create-property-descriptor":1773651886974,"../internals/object-create":1773651887013,"../internals/object-keys":1773651887015,"../internals/object-get-own-property-names":1773651887027,"../internals/object-get-own-property-names-external":1773651887028,"../internals/object-get-own-property-symbols":1773651887030,"../internals/object-get-own-property-descriptor":1773651886970,"../internals/object-define-property":1773651887007,"../internals/object-define-properties":1773651887014,"../internals/object-property-is-enumerable":1773651886973,"../internals/define-built-in":1773651887031,"../internals/define-built-in-accessor":1773651887032,"../internals/shared":1773651886995,"../internals/shared-key":1773651887026,"../internals/hidden-keys":1773651887023,"../internals/uid":1773651887001,"../internals/well-known-symbol":1773651886994,"../internals/well-known-symbol-wrapped":1773651887033,"../internals/well-known-symbol-define":1773651887034,"../internals/symbol-define-to-primitive":1773651887035,"../internals/set-to-string-tag":1773651887036,"../internals/internal-state":1773651887038,"../internals/array-iteration":1773651887040}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886961, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var apply = require('../internals/function-apply');
var uncurryThis = require('../internals/function-uncurry-this-clause');
var isCallable = require('../internals/is-callable');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var isForced = require('../internals/is-forced');
var path = require('../internals/path');
var bind = require('../internals/function-bind-context');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var hasOwn = require('../internals/has-own-property');
// add debugging info
require('../internals/shared-store');

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof Wrapper) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return apply(NativeConstructor, this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? globalThis : STATIC ? globalThis[TARGET] : globalThis[TARGET] && globalThis[TARGET].prototype;

  var target = GLOBAL ? path : path[TARGET] || createNonEnumerableProperty(path, TARGET, {})[TARGET];
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && hasOwn(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (!FORCED && !PROTO && typeof targetProperty == typeof sourceProperty) continue;

    // bind methods to global for calling from export context
    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, globalThis);
    // wrap global constructors for prevent changes in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && isCallable(sourceProperty)) resultProperty = uncurryThis(sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    createNonEnumerableProperty(target, key, resultProperty);

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!hasOwn(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      createNonEnumerableProperty(path[VIRTUAL_PROTOTYPE], key, sourceProperty);
      // export real prototype methods
      if (options.real && targetPrototype && (FORCED || !targetPrototype[key])) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/function-apply":1773651886963,"../internals/function-uncurry-this-clause":1773651886966,"../internals/is-callable":1773651886969,"../internals/object-get-own-property-descriptor":1773651886970,"../internals/is-forced":1773651887004,"../internals/path":1773651886984,"../internals/function-bind-context":1773651887005,"../internals/create-non-enumerable-property":1773651887006,"../internals/has-own-property":1773651886999,"../internals/shared-store":1773651886996}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886962, function(require, module, exports) {

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886963, function(require, module, exports) {

var NATIVE_BIND = require('../internals/function-bind-native');

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});

}, function(modId) { var map = {"../internals/function-bind-native":1773651886964}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886964, function(require, module, exports) {

var fails = require('../internals/fails');

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

}, function(modId) { var map = {"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886965, function(require, module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886966, function(require, module, exports) {

var classofRaw = require('../internals/classof-raw');
var uncurryThis = require('../internals/function-uncurry-this');

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};

}, function(modId) { var map = {"../internals/classof-raw":1773651886967,"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886967, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886968, function(require, module, exports) {

var NATIVE_BIND = require('../internals/function-bind-native');

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};

}, function(modId) { var map = {"../internals/function-bind-native":1773651886964}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886969, function(require, module, exports) {

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886970, function(require, module, exports) {

var DESCRIPTORS = require('../internals/descriptors');
var call = require('../internals/function-call');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPropertyKey = require('../internals/to-property-key');
var hasOwn = require('../internals/has-own-property');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

}, function(modId) { var map = {"../internals/descriptors":1773651886971,"../internals/function-call":1773651886972,"../internals/object-property-is-enumerable":1773651886973,"../internals/create-property-descriptor":1773651886974,"../internals/to-indexed-object":1773651886975,"../internals/to-property-key":1773651886979,"../internals/has-own-property":1773651886999,"../internals/ie8-dom-define":1773651887002}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886971, function(require, module, exports) {

var fails = require('../internals/fails');

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});

}, function(modId) { var map = {"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886972, function(require, module, exports) {

var NATIVE_BIND = require('../internals/function-bind-native');

var call = Function.prototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

}, function(modId) { var map = {"../internals/function-bind-native":1773651886964}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886973, function(require, module, exports) {

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886974, function(require, module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886975, function(require, module, exports) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

}, function(modId) { var map = {"../internals/indexed-object":1773651886976,"../internals/require-object-coercible":1773651886977}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886976, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/fails":1773651886965,"../internals/classof-raw":1773651886967}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886977, function(require, module, exports) {

var isNullOrUndefined = require('../internals/is-null-or-undefined');

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};

}, function(modId) { var map = {"../internals/is-null-or-undefined":1773651886978}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886978, function(require, module, exports) {

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886979, function(require, module, exports) {

var toPrimitive = require('../internals/to-primitive');
var isSymbol = require('../internals/is-symbol');

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

}, function(modId) { var map = {"../internals/to-primitive":1773651886980,"../internals/is-symbol":1773651886982}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886980, function(require, module, exports) {

var call = require('../internals/function-call');
var isObject = require('../internals/is-object');
var isSymbol = require('../internals/is-symbol');
var getMethod = require('../internals/get-method');
var ordinaryToPrimitive = require('../internals/ordinary-to-primitive');
var wellKnownSymbol = require('../internals/well-known-symbol');

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/is-object":1773651886981,"../internals/is-symbol":1773651886982,"../internals/get-method":1773651886990,"../internals/ordinary-to-primitive":1773651886993,"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886981, function(require, module, exports) {

var isCallable = require('../internals/is-callable');

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

}, function(modId) { var map = {"../internals/is-callable":1773651886969}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886982, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/is-callable":1773651886969,"../internals/object-is-prototype-of":1773651886985,"../internals/use-symbol-as-uid":1773651886986}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886983, function(require, module, exports) {

var path = require('../internals/path');
var globalThis = require('../internals/global-this');
var isCallable = require('../internals/is-callable');

var aFunction = function (variable) {
  return isCallable(variable) ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(globalThis[namespace])
    : path[namespace] && path[namespace][method] || globalThis[namespace] && globalThis[namespace][method];
};

}, function(modId) { var map = {"../internals/path":1773651886984,"../internals/global-this":1773651886962,"../internals/is-callable":1773651886969}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886984, function(require, module, exports) {

module.exports = {};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886985, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis({}.isPrototypeOf);

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886986, function(require, module, exports) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');

module.exports = NATIVE_SYMBOL &&
  !Symbol.sham &&
  typeof Symbol.iterator == 'symbol';

}, function(modId) { var map = {"../internals/symbol-constructor-detection":1773651886987}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886987, function(require, module, exports) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = require('../internals/environment-v8-version');
var fails = require('../internals/fails');
var globalThis = require('../internals/global-this');

var $String = globalThis.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

}, function(modId) { var map = {"../internals/environment-v8-version":1773651886988,"../internals/fails":1773651886965,"../internals/global-this":1773651886962}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886988, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var userAgent = require('../internals/environment-user-agent');

var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/environment-user-agent":1773651886989}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886989, function(require, module, exports) {

var globalThis = require('../internals/global-this');

var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;

module.exports = userAgent ? String(userAgent) : '';

}, function(modId) { var map = {"../internals/global-this":1773651886962}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886990, function(require, module, exports) {

var aCallable = require('../internals/a-callable');
var isNullOrUndefined = require('../internals/is-null-or-undefined');

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};

}, function(modId) { var map = {"../internals/a-callable":1773651886991,"../internals/is-null-or-undefined":1773651886978}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886991, function(require, module, exports) {

var isCallable = require('../internals/is-callable');
var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};

}, function(modId) { var map = {"../internals/is-callable":1773651886969,"../internals/try-to-string":1773651886992}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886992, function(require, module, exports) {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886993, function(require, module, exports) {

var call = require('../internals/function-call');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/is-callable":1773651886969,"../internals/is-object":1773651886981}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886994, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var shared = require('../internals/shared');
var hasOwn = require('../internals/has-own-property');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/shared":1773651886995,"../internals/has-own-property":1773651886999,"../internals/uid":1773651887001,"../internals/symbol-constructor-detection":1773651886987,"../internals/use-symbol-as-uid":1773651886986}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886995, function(require, module, exports) {

var store = require('../internals/shared-store');

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};

}, function(modId) { var map = {"../internals/shared-store":1773651886996}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886996, function(require, module, exports) {

var IS_PURE = require('../internals/is-pure');
var globalThis = require('../internals/global-this');
var defineGlobalProperty = require('../internals/define-global-property');

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.48.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.',
  license: 'https://github.com/zloirock/core-js/blob/v3.48.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

}, function(modId) { var map = {"../internals/is-pure":1773651886997,"../internals/global-this":1773651886962,"../internals/define-global-property":1773651886998}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886997, function(require, module, exports) {

module.exports = true;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886998, function(require, module, exports) {

var globalThis = require('../internals/global-this');

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis[key] = value;
  } return value;
};

}, function(modId) { var map = {"../internals/global-this":1773651886962}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886999, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/to-object":1773651887000}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887000, function(require, module, exports) {

var requireObjectCoercible = require('../internals/require-object-coercible');

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};

}, function(modId) { var map = {"../internals/require-object-coercible":1773651886977}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887001, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.1.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887002, function(require, module, exports) {

var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});

}, function(modId) { var map = {"../internals/descriptors":1773651886971,"../internals/fails":1773651886965,"../internals/document-create-element":1773651887003}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887003, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var isObject = require('../internals/is-object');

var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/is-object":1773651886981}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887004, function(require, module, exports) {

var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

}, function(modId) { var map = {"../internals/fails":1773651886965,"../internals/is-callable":1773651886969}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887005, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this-clause');
var aCallable = require('../internals/a-callable');
var NATIVE_BIND = require('../internals/function-bind-native');

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

}, function(modId) { var map = {"../internals/function-uncurry-this-clause":1773651886966,"../internals/a-callable":1773651886991,"../internals/function-bind-native":1773651886964}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887006, function(require, module, exports) {

var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

}, function(modId) { var map = {"../internals/descriptors":1773651886971,"../internals/object-define-property":1773651887007,"../internals/create-property-descriptor":1773651886974}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887007, function(require, module, exports) {

var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug');
var anObject = require('../internals/an-object');
var toPropertyKey = require('../internals/to-property-key');

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

}, function(modId) { var map = {"../internals/descriptors":1773651886971,"../internals/ie8-dom-define":1773651887002,"../internals/v8-prototype-define-bug":1773651887008,"../internals/an-object":1773651887009,"../internals/to-property-key":1773651886979}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887008, function(require, module, exports) {

var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});

}, function(modId) { var map = {"../internals/descriptors":1773651886971,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887009, function(require, module, exports) {

var isObject = require('../internals/is-object');

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};

}, function(modId) { var map = {"../internals/is-object":1773651886981}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887010, function(require, module, exports) {

var classof = require('../internals/classof');

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

}, function(modId) { var map = {"../internals/classof":1773651887011}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887011, function(require, module, exports) {

var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var isCallable = require('../internals/is-callable');
var classofRaw = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

}, function(modId) { var map = {"../internals/to-string-tag-support":1773651887012,"../internals/is-callable":1773651886969,"../internals/classof-raw":1773651886967,"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887012, function(require, module, exports) {

var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
// eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';

}, function(modId) { var map = {"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887013, function(require, module, exports) {

/* global ActiveXObject -- old IE, WSH */
var anObject = require('../internals/an-object');
var definePropertiesModule = require('../internals/object-define-properties');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = require('../internals/hidden-keys');
var html = require('../internals/html');
var documentCreateElement = require('../internals/document-create-element');
var sharedKey = require('../internals/shared-key');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
  activeXDocument = null;
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

}, function(modId) { var map = {"../internals/an-object":1773651887009,"../internals/object-define-properties":1773651887014,"../internals/enum-bug-keys":1773651887024,"../internals/hidden-keys":1773651887023,"../internals/html":1773651887025,"../internals/document-create-element":1773651887003,"../internals/shared-key":1773651887026}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887014, function(require, module, exports) {

var DESCRIPTORS = require('../internals/descriptors');
var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug');
var definePropertyModule = require('../internals/object-define-property');
var anObject = require('../internals/an-object');
var toIndexedObject = require('../internals/to-indexed-object');
var objectKeys = require('../internals/object-keys');

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};

}, function(modId) { var map = {"../internals/descriptors":1773651886971,"../internals/v8-prototype-define-bug":1773651887008,"../internals/object-define-property":1773651887007,"../internals/an-object":1773651887009,"../internals/to-indexed-object":1773651886975,"../internals/object-keys":1773651887015}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887015, function(require, module, exports) {

var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

}, function(modId) { var map = {"../internals/object-keys-internal":1773651887016,"../internals/enum-bug-keys":1773651887024}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887016, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var hasOwn = require('../internals/has-own-property');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/has-own-property":1773651886999,"../internals/to-indexed-object":1773651886975,"../internals/array-includes":1773651887017,"../internals/hidden-keys":1773651887023}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887017, function(require, module, exports) {

var toIndexedObject = require('../internals/to-indexed-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

}, function(modId) { var map = {"../internals/to-indexed-object":1773651886975,"../internals/to-absolute-index":1773651887018,"../internals/length-of-array-like":1773651887021}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887018, function(require, module, exports) {

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

}, function(modId) { var map = {"../internals/to-integer-or-infinity":1773651887019}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887019, function(require, module, exports) {

var trunc = require('../internals/math-trunc');

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

}, function(modId) { var map = {"../internals/math-trunc":1773651887020}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887020, function(require, module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887021, function(require, module, exports) {

var toLength = require('../internals/to-length');

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};

}, function(modId) { var map = {"../internals/to-length":1773651887022}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887022, function(require, module, exports) {

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

}, function(modId) { var map = {"../internals/to-integer-or-infinity":1773651887019}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887023, function(require, module, exports) {

module.exports = {};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887024, function(require, module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887025, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

}, function(modId) { var map = {"../internals/get-built-in":1773651886983}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887026, function(require, module, exports) {

var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

}, function(modId) { var map = {"../internals/shared":1773651886995,"../internals/uid":1773651887001}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887027, function(require, module, exports) {

var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

}, function(modId) { var map = {"../internals/object-keys-internal":1773651887016,"../internals/enum-bug-keys":1773651887024}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887028, function(require, module, exports) {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof = require('../internals/classof-raw');
var toIndexedObject = require('../internals/to-indexed-object');
var $getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var arraySlice = require('../internals/array-slice');

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) === 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};

}, function(modId) { var map = {"../internals/classof-raw":1773651886967,"../internals/to-indexed-object":1773651886975,"../internals/object-get-own-property-names":1773651887027,"../internals/array-slice":1773651887029}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887029, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');

module.exports = uncurryThis([].slice);

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887030, function(require, module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887031, function(require, module, exports) {

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty(target, key, value);
  return target;
};

}, function(modId) { var map = {"../internals/create-non-enumerable-property":1773651887006}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887032, function(require, module, exports) {

var defineProperty = require('../internals/object-define-property');

module.exports = function (target, name, descriptor) {
  return defineProperty.f(target, name, descriptor);
};

}, function(modId) { var map = {"../internals/object-define-property":1773651887007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887033, function(require, module, exports) {

var wellKnownSymbol = require('../internals/well-known-symbol');

exports.f = wellKnownSymbol;

}, function(modId) { var map = {"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887034, function(require, module, exports) {

var path = require('../internals/path');
var hasOwn = require('../internals/has-own-property');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineProperty = require('../internals/object-define-property').f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

}, function(modId) { var map = {"../internals/path":1773651886984,"../internals/has-own-property":1773651886999,"../internals/well-known-symbol-wrapped":1773651887033,"../internals/object-define-property":1773651887007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887035, function(require, module, exports) {

var call = require('../internals/function-call');
var getBuiltIn = require('../internals/get-built-in');
var wellKnownSymbol = require('../internals/well-known-symbol');
var defineBuiltIn = require('../internals/define-built-in');

module.exports = function () {
  var Symbol = getBuiltIn('Symbol');
  var SymbolPrototype = Symbol && Symbol.prototype;
  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
    // eslint-disable-next-line no-unused-vars -- required for .length
    defineBuiltIn(SymbolPrototype, TO_PRIMITIVE, function (hint) {
      return call(valueOf, this);
    }, { arity: 1 });
  }
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/get-built-in":1773651886983,"../internals/well-known-symbol":1773651886994,"../internals/define-built-in":1773651887031}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887036, function(require, module, exports) {

var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var defineProperty = require('../internals/object-define-property').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var hasOwn = require('../internals/has-own-property');
var toString = require('../internals/object-to-string');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC, SET_METHOD) {
  var target = STATIC ? it : it && it.prototype;
  if (target) {
    if (!hasOwn(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
      createNonEnumerableProperty(target, 'toString', toString);
    }
  }
};

}, function(modId) { var map = {"../internals/to-string-tag-support":1773651887012,"../internals/object-define-property":1773651887007,"../internals/create-non-enumerable-property":1773651887006,"../internals/has-own-property":1773651886999,"../internals/object-to-string":1773651887037,"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887037, function(require, module, exports) {

var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classof = require('../internals/classof');

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

}, function(modId) { var map = {"../internals/to-string-tag-support":1773651887012,"../internals/classof":1773651887011}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887038, function(require, module, exports) {

var NATIVE_WEAK_MAP = require('../internals/weak-map-basic-detection');
var globalThis = require('../internals/global-this');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var hasOwn = require('../internals/has-own-property');
var shared = require('../internals/shared-store');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

}, function(modId) { var map = {"../internals/weak-map-basic-detection":1773651887039,"../internals/global-this":1773651886962,"../internals/is-object":1773651886981,"../internals/create-non-enumerable-property":1773651887006,"../internals/has-own-property":1773651886999,"../internals/shared-store":1773651886996,"../internals/shared-key":1773651887026,"../internals/hidden-keys":1773651887023}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887039, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var isCallable = require('../internals/is-callable');

var WeakMap = globalThis.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/is-callable":1773651886969}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887040, function(require, module, exports) {

var bind = require('../internals/function-bind-context');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var arraySpeciesCreate = require('../internals/array-species-create');
var createProperty = require('../internals/create-property');

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE === 1;
  var IS_FILTER = TYPE === 2;
  var IS_SOME = TYPE === 3;
  var IS_EVERY = TYPE === 4;
  var IS_FIND_INDEX = TYPE === 6;
  var IS_FILTER_REJECT = TYPE === 7;
  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(self);
    var boundFunction = bind(callbackfn, that);
    var index = 0;
    var resIndex = 0;
    var target = IS_MAP ? arraySpeciesCreate($this, length) : IS_FILTER || IS_FILTER_REJECT ? arraySpeciesCreate($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) createProperty(target, index, result);    // map
        else if (result) switch (TYPE) {
          case 3: return true;                                // some
          case 5: return value;                               // find
          case 6: return index;                               // findIndex
          case 2: createProperty(target, resIndex++, value);  // filter
        } else switch (TYPE) {
          case 4: return false;                               // every
          case 7: createProperty(target, resIndex++, value);  // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};

}, function(modId) { var map = {"../internals/function-bind-context":1773651887005,"../internals/indexed-object":1773651886976,"../internals/to-object":1773651887000,"../internals/length-of-array-like":1773651887021,"../internals/array-species-create":1773651887041,"../internals/create-property":1773651887046}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887041, function(require, module, exports) {

var arraySpeciesConstructor = require('../internals/array-species-constructor');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

}, function(modId) { var map = {"../internals/array-species-constructor":1773651887042}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887042, function(require, module, exports) {

var isArray = require('../internals/is-array');
var isConstructor = require('../internals/is-constructor');
var isObject = require('../internals/is-object');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};

}, function(modId) { var map = {"../internals/is-array":1773651887043,"../internals/is-constructor":1773651887044,"../internals/is-object":1773651886981,"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887043, function(require, module, exports) {

var classof = require('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};

}, function(modId) { var map = {"../internals/classof-raw":1773651886967}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887044, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var classof = require('../internals/classof');
var getBuiltIn = require('../internals/get-built-in');
var inspectSource = require('../internals/inspect-source');

var noop = function () { /* empty */ };
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, [], argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/fails":1773651886965,"../internals/is-callable":1773651886969,"../internals/classof":1773651887011,"../internals/get-built-in":1773651886983,"../internals/inspect-source":1773651887045}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887045, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var isCallable = require('../internals/is-callable');
var store = require('../internals/shared-store');

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/is-callable":1773651886969,"../internals/shared-store":1773651886996}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887046, function(require, module, exports) {

var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = function (object, key, value) {
  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
  else object[key] = value;
};

}, function(modId) { var map = {"../internals/descriptors":1773651886971,"../internals/object-define-property":1773651887007,"../internals/create-property-descriptor":1773651886974}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887047, function(require, module, exports) {

var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var hasOwn = require('../internals/has-own-property');
var toString = require('../internals/to-string');
var shared = require('../internals/shared');
var NATIVE_SYMBOL_REGISTRY = require('../internals/symbol-registry-detection');

var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.for` method
// https://tc39.es/ecma262/#sec-symbol.for
$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  'for': function (key) {
    var string = toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = getBuiltIn('Symbol')(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/get-built-in":1773651886983,"../internals/has-own-property":1773651886999,"../internals/to-string":1773651887010,"../internals/shared":1773651886995,"../internals/symbol-registry-detection":1773651887048}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887048, function(require, module, exports) {

var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');

/* eslint-disable es/no-symbol -- safe */
module.exports = NATIVE_SYMBOL && !!Symbol['for'] && !!Symbol.keyFor;

}, function(modId) { var map = {"../internals/symbol-constructor-detection":1773651886987}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887049, function(require, module, exports) {

var $ = require('../internals/export');
var hasOwn = require('../internals/has-own-property');
var isSymbol = require('../internals/is-symbol');
var tryToString = require('../internals/try-to-string');
var shared = require('../internals/shared');
var NATIVE_SYMBOL_REGISTRY = require('../internals/symbol-registry-detection');

var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.keyFor` method
// https://tc39.es/ecma262/#sec-symbol.keyfor
$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw new TypeError(tryToString(sym) + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/has-own-property":1773651886999,"../internals/is-symbol":1773651886982,"../internals/try-to-string":1773651886992,"../internals/shared":1773651886995,"../internals/symbol-registry-detection":1773651887048}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887050, function(require, module, exports) {

var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var apply = require('../internals/function-apply');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var isArray = require('../internals/is-array');
var isCallable = require('../internals/is-callable');
var isRawJSON = require('../internals/is-raw-json');
var isSymbol = require('../internals/is-symbol');
var classof = require('../internals/classof-raw');
var toString = require('../internals/to-string');
var arraySlice = require('../internals/array-slice');
var parseJSONString = require('../internals/parse-json-string');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');
var NATIVE_RAW_JSON = require('../internals/native-raw-json');

var $String = String;
var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var slice = uncurryThis(''.slice);
var push = uncurryThis([].push);
var numberToString = uncurryThis(1.1.toString);

var surrogates = /[\uD800-\uDFFF]/g;
var lowSurrogates = /^[\uD800-\uDBFF]$/;
var hiSurrogates = /^[\uDC00-\uDFFF]$/;

var MARK = uid();
var MARK_LENGTH = MARK.length;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
  var symbol = getBuiltIn('Symbol')('stringify detection');
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) !== '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) !== '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) !== '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithProperSymbolsConversion = WRONG_SYMBOLS_CONVERSION ? function (it, replacer) {
  var args = arraySlice(arguments);
  var $replacer = getReplacerFunction(replacer);
  if (!isCallable($replacer) && (it === undefined || isSymbol(it))) return; // IE8 returns string on undefined
  args[1] = function (key, value) {
    // some old implementations (like WebKit) could pass numbers as keys
    if (isCallable($replacer)) value = call($replacer, this, $String(key), value);
    if (!isSymbol(value)) return value;
  };
  return apply($stringify, null, args);
} : $stringify;

var fixIllFormedJSON = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if ((exec(lowSurrogates, match) && !exec(hiSurrogates, next)) || (exec(hiSurrogates, match) && !exec(lowSurrogates, prev))) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

var getReplacerFunction = function (replacer) {
  if (isCallable(replacer)) return replacer;
  if (!isArray(replacer)) return;
  var rawLength = replacer.length;
  var keys = [];
  for (var i = 0; i < rawLength; i++) {
    var element = replacer[i];
    if (typeof element == 'string') push(keys, element);
    else if (typeof element == 'number' || classof(element) === 'Number' || classof(element) === 'String') push(keys, toString(element));
  }
  var keysLength = keys.length;
  var root = true;
  return function (key, value) {
    if (root) {
      root = false;
      return value;
    }
    if (isArray(this)) return value;
    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
  };
};

// `JSON.stringify` method
// https://tc39.es/ecma262/#sec-json.stringify
// https://github.com/tc39/proposal-json-parse-with-source
if ($stringify) $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE || !NATIVE_RAW_JSON }, {
  stringify: function stringify(text, replacer, space) {
    var replacerFunction = getReplacerFunction(replacer);
    var rawStrings = [];

    var json = stringifyWithProperSymbolsConversion(text, function (key, value) {
      // some old implementations (like WebKit) could pass numbers as keys
      var v = isCallable(replacerFunction) ? call(replacerFunction, this, $String(key), value) : value;
      return !NATIVE_RAW_JSON && isRawJSON(v) ? MARK + (push(rawStrings, v.rawJSON) - 1) : v;
    }, space);

    if (typeof json != 'string') return json;

    if (ILL_FORMED_UNICODE) json = replace(json, surrogates, fixIllFormedJSON);

    if (NATIVE_RAW_JSON) return json;

    var result = '';
    var length = json.length;

    for (var i = 0; i < length; i++) {
      var chr = charAt(json, i);
      if (chr === '"') {
        var end = parseJSONString(json, ++i).end - 1;
        var string = slice(json, i, end);
        result += slice(string, 0, MARK_LENGTH) === MARK
          ? rawStrings[slice(string, MARK_LENGTH)]
          : '"' + string + '"';
        i = end;
      } else result += chr;
    }

    return result;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/get-built-in":1773651886983,"../internals/function-apply":1773651886963,"../internals/function-call":1773651886972,"../internals/function-uncurry-this":1773651886968,"../internals/fails":1773651886965,"../internals/is-array":1773651887043,"../internals/is-callable":1773651886969,"../internals/is-raw-json":1773651887051,"../internals/is-symbol":1773651886982,"../internals/classof-raw":1773651886967,"../internals/to-string":1773651887010,"../internals/array-slice":1773651887029,"../internals/parse-json-string":1773651887052,"../internals/uid":1773651887001,"../internals/symbol-constructor-detection":1773651886987,"../internals/native-raw-json":1773651887053}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887051, function(require, module, exports) {

var isObject = require('../internals/is-object');
var getInternalState = require('../internals/internal-state').get;

module.exports = function isRawJSON(O) {
  if (!isObject(O)) return false;
  var state = getInternalState(O);
  return !!state && state.type === 'RawJSON';
};

}, function(modId) { var map = {"../internals/is-object":1773651886981,"../internals/internal-state":1773651887038}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887052, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var hasOwn = require('../internals/has-own-property');

var $SyntaxError = SyntaxError;
var $parseInt = parseInt;
var fromCharCode = String.fromCharCode;
var at = uncurryThis(''.charAt);
var slice = uncurryThis(''.slice);
var exec = uncurryThis(/./.exec);

var codePoints = {
  '\\"': '"',
  '\\\\': '\\',
  '\\/': '/',
  '\\b': '\b',
  '\\f': '\f',
  '\\n': '\n',
  '\\r': '\r',
  '\\t': '\t'
};

var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
// eslint-disable-next-line regexp/no-control-character -- safe
var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;

module.exports = function (source, i) {
  var unterminated = true;
  var value = '';
  while (i < source.length) {
    var chr = at(source, i);
    if (chr === '\\') {
      var twoChars = slice(source, i, i + 2);
      if (hasOwn(codePoints, twoChars)) {
        value += codePoints[twoChars];
        i += 2;
      } else if (twoChars === '\\u') {
        i += 2;
        var fourHexDigits = slice(source, i, i + 4);
        if (!exec(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError('Bad Unicode escape at: ' + i);
        value += fromCharCode($parseInt(fourHexDigits, 16));
        i += 4;
      } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
    } else if (chr === '"') {
      unterminated = false;
      i++;
      break;
    } else {
      if (exec(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError('Bad control character in string literal at: ' + i);
      value += chr;
      i++;
    }
  }
  if (unterminated) throw new $SyntaxError('Unterminated string at: ' + i);
  return { value: value, end: i };
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/has-own-property":1773651886999}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887053, function(require, module, exports) {

/* eslint-disable es/no-json -- safe */
var fails = require('../internals/fails');

module.exports = !fails(function () {
  var unsafeInt = '9007199254740993';
  // eslint-disable-next-line es/no-json-rawjson -- feature detection
  var raw = JSON.rawJSON(unsafeInt);
  // eslint-disable-next-line es/no-json-israwjson -- feature detection
  return !JSON.isRawJSON(raw) || JSON.stringify(raw) !== unsafeInt;
});

}, function(modId) { var map = {"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887054, function(require, module, exports) {

var $ = require('../internals/export');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');
var fails = require('../internals/fails');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var toObject = require('../internals/to-object');

// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FORCED = !NATIVE_SYMBOL || fails(function () { getOwnPropertySymbolsModule.f(1); });

// `Object.getOwnPropertySymbols` method
// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
$({ target: 'Object', stat: true, forced: FORCED }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject(it)) : [];
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/symbol-constructor-detection":1773651886987,"../internals/fails":1773651886965,"../internals/object-get-own-property-symbols":1773651887030,"../internals/to-object":1773651887000}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887055, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887056, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.asyncDispose` well-known symbol
// https://github.com/tc39/proposal-async-explicit-resource-management
defineWellKnownSymbol('asyncDispose');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887057, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887058, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.dispose` well-known symbol
// https://github.com/tc39/proposal-explicit-resource-management
defineWellKnownSymbol('dispose');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887059, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.hasInstance` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.hasinstance
defineWellKnownSymbol('hasInstance');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887060, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
defineWellKnownSymbol('isConcatSpreadable');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887061, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887062, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.match` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.match
defineWellKnownSymbol('match');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887063, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.matchAll` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.matchall
defineWellKnownSymbol('matchAll');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887064, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.replace` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.replace
defineWellKnownSymbol('replace');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887065, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.search` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.search
defineWellKnownSymbol('search');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887066, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.species` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.species
defineWellKnownSymbol('species');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887067, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.split` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.split
defineWellKnownSymbol('split');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887068, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');
var defineSymbolToPrimitive = require('../internals/symbol-define-to-primitive');

// `Symbol.toPrimitive` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol('toPrimitive');

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive();

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034,"../internals/symbol-define-to-primitive":1773651887035}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887069, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var defineWellKnownSymbol = require('../internals/well-known-symbol-define');
var setToStringTag = require('../internals/set-to-string-tag');

// `Symbol.toStringTag` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag(getBuiltIn('Symbol'), 'Symbol');

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/well-known-symbol-define":1773651887034,"../internals/set-to-string-tag":1773651887036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887070, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.unscopables` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.unscopables
defineWellKnownSymbol('unscopables');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887071, function(require, module, exports) {

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var apply = require('../internals/function-apply');
var wrapErrorConstructorWithCause = require('../internals/wrap-error-constructor-with-cause');

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = globalThis[WEB_ASSEMBLY];

// eslint-disable-next-line es/no-error-cause -- feature detection
var FORCED = new Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://tc39.es/ecma262/#sec-nativeerror
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/function-apply":1773651886963,"../internals/wrap-error-constructor-with-cause":1773651887072}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887072, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var hasOwn = require('../internals/has-own-property');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var proxyAccessor = require('../internals/proxy-accessor');
var inheritIfRequired = require('../internals/inherit-if-required');
var normalizeStringArgument = require('../internals/normalize-string-argument');
var installErrorCause = require('../internals/install-error-cause');
var installErrorStack = require('../internals/error-stack-install');
var DESCRIPTORS = require('../internals/descriptors');
var IS_PURE = require('../internals/is-pure');

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    installErrorStack(result, WrappedError, result.stack, 2);
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/has-own-property":1773651886999,"../internals/create-non-enumerable-property":1773651887006,"../internals/object-is-prototype-of":1773651886985,"../internals/object-set-prototype-of":1773651887073,"../internals/copy-constructor-properties":1773651887077,"../internals/proxy-accessor":1773651887079,"../internals/inherit-if-required":1773651887080,"../internals/normalize-string-argument":1773651887081,"../internals/install-error-cause":1773651887082,"../internals/error-stack-install":1773651887083,"../internals/descriptors":1773651886971,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887073, function(require, module, exports) {

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = require('../internals/function-uncurry-this-accessor');
var isObject = require('../internals/is-object');
var requireObjectCoercible = require('../internals/require-object-coercible');
var aPossiblePrototype = require('../internals/a-possible-prototype');

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    requireObjectCoercible(O);
    aPossiblePrototype(proto);
    if (!isObject(O)) return O;
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

}, function(modId) { var map = {"../internals/function-uncurry-this-accessor":1773651887074,"../internals/is-object":1773651886981,"../internals/require-object-coercible":1773651886977,"../internals/a-possible-prototype":1773651887075}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887074, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/a-callable":1773651886991}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887075, function(require, module, exports) {

var isPossiblePrototype = require('../internals/is-possible-prototype');

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
};

}, function(modId) { var map = {"../internals/is-possible-prototype":1773651887076}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887076, function(require, module, exports) {

var isObject = require('../internals/is-object');

module.exports = function (argument) {
  return isObject(argument) || argument === null;
};

}, function(modId) { var map = {"../internals/is-object":1773651886981}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887077, function(require, module, exports) {

var hasOwn = require('../internals/has-own-property');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

}, function(modId) { var map = {"../internals/has-own-property":1773651886999,"../internals/own-keys":1773651887078,"../internals/object-get-own-property-descriptor":1773651886970,"../internals/object-define-property":1773651887007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887078, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/function-uncurry-this":1773651886968,"../internals/object-get-own-property-names":1773651887027,"../internals/object-get-own-property-symbols":1773651887030,"../internals/an-object":1773651887009}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887079, function(require, module, exports) {

var defineProperty = require('../internals/object-define-property').f;

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};

}, function(modId) { var map = {"../internals/object-define-property":1773651887007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887080, function(require, module, exports) {

var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var setPrototypeOf = require('../internals/object-set-prototype-of');

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

}, function(modId) { var map = {"../internals/is-callable":1773651886969,"../internals/is-object":1773651886981,"../internals/object-set-prototype-of":1773651887073}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887081, function(require, module, exports) {

var toString = require('../internals/to-string');

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};

}, function(modId) { var map = {"../internals/to-string":1773651887010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887082, function(require, module, exports) {

var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

// `InstallErrorCause` abstract operation
// https://tc39.es/ecma262/#sec-installerrorcause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};

}, function(modId) { var map = {"../internals/is-object":1773651886981,"../internals/create-non-enumerable-property":1773651887006}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887083, function(require, module, exports) {

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var clearErrorStack = require('../internals/error-stack-clear');
var ERROR_STACK_INSTALLABLE = require('../internals/error-stack-installable');

// non-standard V8
// eslint-disable-next-line es/no-nonstandard-error-properties -- safe
var captureStackTrace = Error.captureStackTrace;

module.exports = function (error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE) {
    if (captureStackTrace) captureStackTrace(error, C);
    else createNonEnumerableProperty(error, 'stack', clearErrorStack(stack, dropEntries));
  }
};

}, function(modId) { var map = {"../internals/create-non-enumerable-property":1773651887006,"../internals/error-stack-clear":1773651887084,"../internals/error-stack-installable":1773651887085}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887084, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable, sonarjs/slow-regex -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887085, function(require, module, exports) {

var fails = require('../internals/fails');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = !fails(function () {
  var error = new Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});

}, function(modId) { var map = {"../internals/fails":1773651886965,"../internals/create-property-descriptor":1773651886974}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887086, function(require, module, exports) {

var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var isObject = require('../internals/is-object');
var classof = require('../internals/classof');
var fails = require('../internals/fails');

var ERROR = 'Error';
var DOM_EXCEPTION = 'DOMException';
// eslint-disable-next-line es/no-object-setprototypeof, no-proto -- safe
var PROTOTYPE_SETTING_AVAILABLE = Object.setPrototypeOf || ({}).__proto__;

var DOMException = getBuiltIn(DOM_EXCEPTION);
var $Error = Error;
// eslint-disable-next-line es/no-error-iserror -- safe
var $isError = $Error.isError;

var FORCED = !$isError || !PROTOTYPE_SETTING_AVAILABLE || fails(function () {
  // Bun, isNativeError-based implementations, some buggy structuredClone-based implementations, etc.
  // https://github.com/oven-sh/bun/issues/15821
  return (DOMException && !$isError(new DOMException(DOM_EXCEPTION))) ||
    // structuredClone-based implementations
    // eslint-disable-next-line es/no-error-cause -- detection
    !$isError(new $Error(ERROR, { cause: function () { /* empty */ } })) ||
    // instanceof-based and FF Error#stack-based implementations
    $isError(getBuiltIn('Object', 'create')($Error.prototype));
});

// `Error.isError` method
// https://tc39.es/ecma262/#sec-error.iserror
$({ target: 'Error', stat: true, sham: true, forced: FORCED }, {
  isError: function isError(arg) {
    if (!isObject(arg)) return false;
    var tag = classof(arg);
    return tag === ERROR || tag === DOM_EXCEPTION;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/get-built-in":1773651886983,"../internals/is-object":1773651886981,"../internals/classof":1773651887011,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887087, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887088, function(require, module, exports) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
require('../modules/es.aggregate-error.constructor');

}, function(modId) { var map = {"../modules/es.aggregate-error.constructor":1773651887089}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887089, function(require, module, exports) {

var $ = require('../internals/export');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var create = require('../internals/object-create');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var installErrorCause = require('../internals/install-error-cause');
var installErrorStack = require('../internals/error-stack-install');
var iterate = require('../internals/iterate');
var normalizeStringArgument = require('../internals/normalize-string-argument');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Error = Error;
var push = [].push;

var $AggregateError = function AggregateError(errors, message /* , options */) {
  var isInstance = isPrototypeOf(AggregateErrorPrototype, this);
  var that;
  if (setPrototypeOf) {
    that = setPrototypeOf(new $Error(), isInstance ? getPrototypeOf(this) : AggregateErrorPrototype);
  } else {
    that = isInstance ? this : create(AggregateErrorPrototype);
    createNonEnumerableProperty(that, TO_STRING_TAG, 'Error');
  }
  if (message !== undefined) createNonEnumerableProperty(that, 'message', normalizeStringArgument(message));
  installErrorStack(that, $AggregateError, that.stack, 1);
  if (arguments.length > 2) installErrorCause(that, arguments[2]);
  var errorsArray = [];
  iterate(errors, push, { that: errorsArray });
  createNonEnumerableProperty(that, 'errors', errorsArray);
  return that;
};

if (setPrototypeOf) setPrototypeOf($AggregateError, $Error);
else copyConstructorProperties($AggregateError, $Error, { name: true });

var AggregateErrorPrototype = $AggregateError.prototype = create($Error.prototype, {
  constructor: createPropertyDescriptor(1, $AggregateError),
  message: createPropertyDescriptor(1, ''),
  name: createPropertyDescriptor(1, 'AggregateError')
});

// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
$({ global: true, constructor: true, arity: 2 }, {
  AggregateError: $AggregateError
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/object-is-prototype-of":1773651886985,"../internals/object-get-prototype-of":1773651887090,"../internals/object-set-prototype-of":1773651887073,"../internals/copy-constructor-properties":1773651887077,"../internals/object-create":1773651887013,"../internals/create-non-enumerable-property":1773651887006,"../internals/create-property-descriptor":1773651886974,"../internals/install-error-cause":1773651887082,"../internals/error-stack-install":1773651887083,"../internals/iterate":1773651887092,"../internals/normalize-string-argument":1773651887081,"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887090, function(require, module, exports) {

var hasOwn = require('../internals/has-own-property');
var isCallable = require('../internals/is-callable');
var toObject = require('../internals/to-object');
var sharedKey = require('../internals/shared-key');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};

}, function(modId) { var map = {"../internals/has-own-property":1773651886999,"../internals/is-callable":1773651886969,"../internals/to-object":1773651887000,"../internals/shared-key":1773651887026,"../internals/correct-prototype-getter":1773651887091}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887091, function(require, module, exports) {

var fails = require('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

}, function(modId) { var map = {"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887092, function(require, module, exports) {

var bind = require('../internals/function-bind-context');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var tryToString = require('../internals/try-to-string');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var getIterator = require('../internals/get-iterator');
var getIteratorMethod = require('../internals/get-iterator-method');
var iteratorClose = require('../internals/iterator-close');

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal');
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};

}, function(modId) { var map = {"../internals/function-bind-context":1773651887005,"../internals/function-call":1773651886972,"../internals/an-object":1773651887009,"../internals/try-to-string":1773651886992,"../internals/is-array-iterator-method":1773651887093,"../internals/length-of-array-like":1773651887021,"../internals/object-is-prototype-of":1773651886985,"../internals/get-iterator":1773651887095,"../internals/get-iterator-method":1773651887096,"../internals/iterator-close":1773651887097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887093, function(require, module, exports) {

var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

}, function(modId) { var map = {"../internals/well-known-symbol":1773651886994,"../internals/iterators":1773651887094}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887094, function(require, module, exports) {

module.exports = {};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887095, function(require, module, exports) {

var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var tryToString = require('../internals/try-to-string');
var getIteratorMethod = require('../internals/get-iterator-method');

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw new $TypeError(tryToString(argument) + ' is not iterable');
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/try-to-string":1773651886992,"../internals/get-iterator-method":1773651887096}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887096, function(require, module, exports) {

var classof = require('../internals/classof');
var getMethod = require('../internals/get-method');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};

}, function(modId) { var map = {"../internals/classof":1773651887011,"../internals/get-method":1773651886990,"../internals/is-null-or-undefined":1773651886978,"../internals/iterators":1773651887094,"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887097, function(require, module, exports) {

var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var getMethod = require('../internals/get-method');

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/an-object":1773651887009,"../internals/get-method":1773651886990}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887098, function(require, module, exports) {

var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var apply = require('../internals/function-apply');
var fails = require('../internals/fails');
var wrapErrorConstructorWithCause = require('../internals/wrap-error-constructor-with-cause');

var AGGREGATE_ERROR = 'AggregateError';
var $AggregateError = getBuiltIn(AGGREGATE_ERROR);

var FORCED = !fails(function () {
  return $AggregateError([1]).errors[0] !== 1;
}) && fails(function () {
  return $AggregateError([1], AGGREGATE_ERROR, { cause: 7 }).cause !== 7;
});

// https://tc39.es/ecma262/#sec-aggregate-error
$({ global: true, constructor: true, arity: 2, forced: FORCED }, {
  AggregateError: wrapErrorConstructorWithCause(AGGREGATE_ERROR, function (init) {
    // eslint-disable-next-line no-unused-vars -- required for functions `.length`
    return function AggregateError(errors, message) { return apply(init, this, arguments); };
  }, FORCED, true)
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/get-built-in":1773651886983,"../internals/function-apply":1773651886963,"../internals/fails":1773651886965,"../internals/wrap-error-constructor-with-cause":1773651887072}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887099, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var create = require('../internals/object-create');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var installErrorStack = require('../internals/error-stack-install');
var normalizeStringArgument = require('../internals/normalize-string-argument');
var wellKnownSymbol = require('../internals/well-known-symbol');
var fails = require('../internals/fails');
var IS_PURE = require('../internals/is-pure');

var NativeSuppressedError = globalThis.SuppressedError;
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Error = Error;

// https://github.com/oven-sh/bun/issues/9282
var WRONG_ARITY = !!NativeSuppressedError && NativeSuppressedError.length !== 3;

// https://github.com/oven-sh/bun/issues/9283
var EXTRA_ARGS_SUPPORT = !!NativeSuppressedError && fails(function () {
  return new NativeSuppressedError(1, 2, 3, { cause: 4 }).cause === 4;
});

var PATCH = WRONG_ARITY || EXTRA_ARGS_SUPPORT;

var $SuppressedError = function SuppressedError(error, suppressed, message) {
  var isInstance = isPrototypeOf(SuppressedErrorPrototype, this);
  var that;
  if (setPrototypeOf) {
    that = PATCH && (!isInstance || getPrototypeOf(this) === SuppressedErrorPrototype)
      ? new NativeSuppressedError()
      : setPrototypeOf(new $Error(), isInstance ? getPrototypeOf(this) : SuppressedErrorPrototype);
  } else {
    that = isInstance ? this : create(SuppressedErrorPrototype);
    createNonEnumerableProperty(that, TO_STRING_TAG, 'Error');
  }
  if (message !== undefined) createNonEnumerableProperty(that, 'message', normalizeStringArgument(message));
  installErrorStack(that, $SuppressedError, that.stack, 1);
  createNonEnumerableProperty(that, 'error', error);
  createNonEnumerableProperty(that, 'suppressed', suppressed);
  return that;
};

if (setPrototypeOf) setPrototypeOf($SuppressedError, $Error);
else copyConstructorProperties($SuppressedError, $Error, { name: true });

var SuppressedErrorPrototype = $SuppressedError.prototype = PATCH ? NativeSuppressedError.prototype : create($Error.prototype, {
  constructor: createPropertyDescriptor(1, $SuppressedError),
  message: createPropertyDescriptor(1, ''),
  name: createPropertyDescriptor(1, 'SuppressedError')
});

if (PATCH && !IS_PURE) SuppressedErrorPrototype.constructor = $SuppressedError;

// `SuppressedError` constructor
// https://github.com/tc39/proposal-explicit-resource-management
$({ global: true, constructor: true, arity: 3, forced: PATCH }, {
  SuppressedError: $SuppressedError
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/object-is-prototype-of":1773651886985,"../internals/object-get-prototype-of":1773651887090,"../internals/object-set-prototype-of":1773651887073,"../internals/copy-constructor-properties":1773651887077,"../internals/object-create":1773651887013,"../internals/create-non-enumerable-property":1773651887006,"../internals/create-property-descriptor":1773651886974,"../internals/error-stack-install":1773651887083,"../internals/normalize-string-argument":1773651887081,"../internals/well-known-symbol":1773651886994,"../internals/fails":1773651886965,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887100, function(require, module, exports) {

var $ = require('../internals/export');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.at` method
// https://tc39.es/ecma262/#sec-array.prototype.at
$({ target: 'Array', proto: true }, {
  at: function at(index) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var relativeIndex = toIntegerOrInfinity(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : O[k];
  }
});

addToUnscopables('at');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/to-object":1773651887000,"../internals/length-of-array-like":1773651887021,"../internals/to-integer-or-infinity":1773651887019,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887101, function(require, module, exports) {

module.exports = function () { /* empty */ };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887102, function(require, module, exports) {

var $ = require('../internals/export');
var fails = require('../internals/fails');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer');
var createProperty = require('../internals/create-property');
var setArrayLength = require('../internals/array-set-length');
var arraySpeciesCreate = require('../internals/array-species-create');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/environment-v8-version');

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty(A, n++, E);
      }
    }
    setArrayLength(A, n);
    return A;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/fails":1773651886965,"../internals/is-array":1773651887043,"../internals/is-object":1773651886981,"../internals/to-object":1773651887000,"../internals/length-of-array-like":1773651887021,"../internals/does-not-exceed-safe-integer":1773651887103,"../internals/create-property":1773651887046,"../internals/array-set-length":1773651887104,"../internals/array-species-create":1773651887041,"../internals/array-method-has-species-support":1773651887105,"../internals/well-known-symbol":1773651886994,"../internals/environment-v8-version":1773651886988}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887103, function(require, module, exports) {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887104, function(require, module, exports) {

var DESCRIPTORS = require('../internals/descriptors');
var isArray = require('../internals/is-array');

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};

}, function(modId) { var map = {"../internals/descriptors":1773651886971,"../internals/is-array":1773651887043}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887105, function(require, module, exports) {

var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/environment-v8-version');

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

}, function(modId) { var map = {"../internals/fails":1773651886965,"../internals/well-known-symbol":1773651886994,"../internals/environment-v8-version":1773651886988}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887106, function(require, module, exports) {

var $ = require('../internals/export');
var copyWithin = require('../internals/array-copy-within');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.copyWithin` method
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
$({ target: 'Array', proto: true }, {
  copyWithin: copyWithin
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('copyWithin');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-copy-within":1773651887107,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887107, function(require, module, exports) {

var toObject = require('../internals/to-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var deletePropertyOrThrow = require('../internals/delete-property-or-throw');

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
// eslint-disable-next-line es/no-array-prototype-copywithin -- safe
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = lengthOfArrayLike(O);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else deletePropertyOrThrow(O, to);
    to += inc;
    from += inc;
  } return O;
};

}, function(modId) { var map = {"../internals/to-object":1773651887000,"../internals/to-absolute-index":1773651887018,"../internals/length-of-array-like":1773651887021,"../internals/delete-property-or-throw":1773651887108}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887108, function(require, module, exports) {

var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

module.exports = function (O, P) {
  if (!delete O[P]) throw new $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};

}, function(modId) { var map = {"../internals/try-to-string":1773651886992}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887109, function(require, module, exports) {

var $ = require('../internals/export');
var $every = require('../internals/array-iteration').every;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var STRICT_METHOD = arrayMethodIsStrict('every');

// `Array.prototype.every` method
// https://tc39.es/ecma262/#sec-array.prototype.every
$({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-iteration":1773651887040,"../internals/array-method-is-strict":1773651887110}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887110, function(require, module, exports) {

var fails = require('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};

}, function(modId) { var map = {"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887111, function(require, module, exports) {

var $ = require('../internals/export');
var fill = require('../internals/array-fill');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-fill":1773651887112,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887112, function(require, module, exports) {

var toObject = require('../internals/to-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

}, function(modId) { var map = {"../internals/to-object":1773651887000,"../internals/to-absolute-index":1773651887018,"../internals/length-of-array-like":1773651887021}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887113, function(require, module, exports) {

var $ = require('../internals/export');
var $filter = require('../internals/array-iteration').filter;
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-iteration":1773651887040,"../internals/array-method-has-species-support":1773651887105}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887114, function(require, module, exports) {

var $ = require('../internals/export');
var $find = require('../internals/array-iteration').find;
var addToUnscopables = require('../internals/add-to-unscopables');

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
// eslint-disable-next-line es/no-array-prototype-find -- testing
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-iteration":1773651887040,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887115, function(require, module, exports) {

var $ = require('../internals/export');
var $findIndex = require('../internals/array-iteration').findIndex;
var addToUnscopables = require('../internals/add-to-unscopables');

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

// Shouldn't skip holes
// eslint-disable-next-line es/no-array-prototype-findindex -- testing
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-array.prototype.findindex
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-iteration":1773651887040,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887116, function(require, module, exports) {

var $ = require('../internals/export');
var $findLast = require('../internals/array-iteration-from-last').findLast;
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.findLast` method
// https://tc39.es/ecma262/#sec-array.prototype.findlast
$({ target: 'Array', proto: true }, {
  findLast: function findLast(callbackfn /* , that = undefined */) {
    return $findLast(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

addToUnscopables('findLast');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-iteration-from-last":1773651887117,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887117, function(require, module, exports) {

var bind = require('../internals/function-bind-context');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');

// `Array.prototype.{ findLast, findLastIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_FIND_LAST_INDEX = TYPE === 1;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var index = lengthOfArrayLike(self);
    var boundFunction = bind(callbackfn, that);
    var value, result;
    while (index-- > 0) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (result) switch (TYPE) {
        case 0: return value; // findLast
        case 1: return index; // findLastIndex
      }
    }
    return IS_FIND_LAST_INDEX ? -1 : undefined;
  };
};

module.exports = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: createMethod(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: createMethod(1)
};

}, function(modId) { var map = {"../internals/function-bind-context":1773651887005,"../internals/indexed-object":1773651886976,"../internals/to-object":1773651887000,"../internals/length-of-array-like":1773651887021}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887118, function(require, module, exports) {

var $ = require('../internals/export');
var $findLastIndex = require('../internals/array-iteration-from-last').findLastIndex;
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.findLastIndex` method
// https://tc39.es/ecma262/#sec-array.prototype.findlastindex
$({ target: 'Array', proto: true }, {
  findLastIndex: function findLastIndex(callbackfn /* , that = undefined */) {
    return $findLastIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

addToUnscopables('findLastIndex');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-iteration-from-last":1773651887117,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887119, function(require, module, exports) {

var $ = require('../internals/export');
var flattenIntoArray = require('../internals/flatten-into-array');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var arraySpeciesCreate = require('../internals/array-species-create');

// `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat
$({ target: 'Array', proto: true }, {
  flat: function flat(/* depthArg = 1 */) {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/flatten-into-array":1773651887120,"../internals/to-object":1773651887000,"../internals/length-of-array-like":1773651887021,"../internals/to-integer-or-infinity":1773651887019,"../internals/array-species-create":1773651887041}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887120, function(require, module, exports) {

var isArray = require('../internals/is-array');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer');
var bind = require('../internals/function-bind-context');
var createProperty = require('../internals/create-property');

// `FlattenIntoArray` abstract operation
// https://tc39.es/ecma262/#sec-flattenintoarray
var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg) : false;
  var element, elementLen;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        elementLen = lengthOfArrayLike(element);
        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        doesNotExceedSafeInteger(targetIndex + 1);
        createProperty(target, targetIndex, element);
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};

module.exports = flattenIntoArray;

}, function(modId) { var map = {"../internals/is-array":1773651887043,"../internals/length-of-array-like":1773651887021,"../internals/does-not-exceed-safe-integer":1773651887103,"../internals/function-bind-context":1773651887005,"../internals/create-property":1773651887046}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887121, function(require, module, exports) {

var $ = require('../internals/export');
var flattenIntoArray = require('../internals/flatten-into-array');
var aCallable = require('../internals/a-callable');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var arraySpeciesCreate = require('../internals/array-species-create');

// `Array.prototype.flatMap` method
// https://tc39.es/ecma262/#sec-array.prototype.flatmap
$({ target: 'Array', proto: true }, {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A;
    aCallable(callbackfn);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return A;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/flatten-into-array":1773651887120,"../internals/a-callable":1773651886991,"../internals/to-object":1773651887000,"../internals/length-of-array-like":1773651887021,"../internals/array-species-create":1773651887041}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887122, function(require, module, exports) {

var $ = require('../internals/export');
var forEach = require('../internals/array-for-each');

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach !== forEach }, {
  forEach: forEach
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-for-each":1773651887123}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887123, function(require, module, exports) {

var $forEach = require('../internals/array-iteration').forEach;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

}, function(modId) { var map = {"../internals/array-iteration":1773651887040,"../internals/array-method-is-strict":1773651887110}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887124, function(require, module, exports) {

var $ = require('../internals/export');
var from = require('../internals/array-from');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-from":1773651887125,"../internals/check-correctness-of-iteration":1773651887127}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887125, function(require, module, exports) {

var bind = require('../internals/function-bind-context');
var call = require('../internals/function-call');
var toObject = require('../internals/to-object');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var isConstructor = require('../internals/is-constructor');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var createProperty = require('../internals/create-property');
var setArrayLength = require('../internals/array-set-length');
var getIterator = require('../internals/get-iterator');
var getIteratorMethod = require('../internals/get-iterator-method');

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    result = IS_CONSTRUCTOR ? new this() : [];
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  setArrayLength(result, index);
  return result;
};

}, function(modId) { var map = {"../internals/function-bind-context":1773651887005,"../internals/function-call":1773651886972,"../internals/to-object":1773651887000,"../internals/call-with-safe-iteration-closing":1773651887126,"../internals/is-array-iterator-method":1773651887093,"../internals/is-constructor":1773651887044,"../internals/length-of-array-like":1773651887021,"../internals/create-property":1773651887046,"../internals/array-set-length":1773651887104,"../internals/get-iterator":1773651887095,"../internals/get-iterator-method":1773651887096}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887126, function(require, module, exports) {

var anObject = require('../internals/an-object');
var iteratorClose = require('../internals/iterator-close');

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};

}, function(modId) { var map = {"../internals/an-object":1773651887009,"../internals/iterator-close":1773651887097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887127, function(require, module, exports) {

var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  try {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  } catch (error) { return false; } // workaround of old WebKit + `eval` bug
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

}, function(modId) { var map = {"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887128, function(require, module, exports) {

var $ = require('../internals/export');
var $includes = require('../internals/array-includes').includes;
var fails = require('../internals/fails');
var addToUnscopables = require('../internals/add-to-unscopables');

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  // eslint-disable-next-line es/no-array-prototype-includes -- detection
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-includes":1773651887017,"../internals/fails":1773651886965,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887129, function(require, module, exports) {

/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this-clause');
var $indexOf = require('../internals/array-includes').indexOf;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var nativeIndexOf = uncurryThis([].indexOf);

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
var FORCED = NEGATIVE_ZERO || !arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: FORCED }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf(this, searchElement, fromIndex) || 0
      : $indexOf(this, searchElement, fromIndex);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this-clause":1773651886966,"../internals/array-includes":1773651887017,"../internals/array-method-is-strict":1773651887110}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887130, function(require, module, exports) {

var $ = require('../internals/export');
var isArray = require('../internals/is-array');

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/is-array":1773651887043}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887131, function(require, module, exports) {

var toIndexedObject = require('../internals/to-indexed-object');
var addToUnscopables = require('../internals/add-to-unscopables');
var Iterators = require('../internals/iterators');
var InternalStateModule = require('../internals/internal-state');
var defineProperty = require('../internals/object-define-property').f;
var defineIterator = require('../internals/iterator-define');
var createIterResultObject = require('../internals/create-iter-result-object');
var IS_PURE = require('../internals/is-pure');
var DESCRIPTORS = require('../internals/descriptors');

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = null;
    return createIterResultObject(undefined, true);
  }
  switch (state.kind) {
    case 'keys': return createIterResultObject(index, false);
    case 'values': return createIterResultObject(target[index], false);
  } return createIterResultObject([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

}, function(modId) { var map = {"../internals/to-indexed-object":1773651886975,"../internals/add-to-unscopables":1773651887101,"../internals/iterators":1773651887094,"../internals/internal-state":1773651887038,"../internals/object-define-property":1773651887007,"../internals/iterator-define":1773651887132,"../internals/create-iter-result-object":1773651887136,"../internals/is-pure":1773651886997,"../internals/descriptors":1773651886971}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887132, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var IS_PURE = require('../internals/is-pure');
var FunctionName = require('../internals/function-name');
var isCallable = require('../internals/is-callable');
var createIteratorConstructor = require('../internals/iterator-create-constructor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var defineBuiltIn = require('../internals/define-built-in');
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');
var IteratorsCore = require('../internals/iterators-core');

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    }

    return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/is-pure":1773651886997,"../internals/function-name":1773651887133,"../internals/is-callable":1773651886969,"../internals/iterator-create-constructor":1773651887134,"../internals/object-get-prototype-of":1773651887090,"../internals/object-set-prototype-of":1773651887073,"../internals/set-to-string-tag":1773651887036,"../internals/create-non-enumerable-property":1773651887006,"../internals/define-built-in":1773651887031,"../internals/well-known-symbol":1773651886994,"../internals/iterators":1773651887094,"../internals/iterators-core":1773651887135}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887133, function(require, module, exports) {

var DESCRIPTORS = require('../internals/descriptors');
var hasOwn = require('../internals/has-own-property');

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

}, function(modId) { var map = {"../internals/descriptors":1773651886971,"../internals/has-own-property":1773651886999}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887134, function(require, module, exports) {

var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var setToStringTag = require('../internals/set-to-string-tag');
var Iterators = require('../internals/iterators');

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

}, function(modId) { var map = {"../internals/iterators-core":1773651887135,"../internals/object-create":1773651887013,"../internals/create-property-descriptor":1773651886974,"../internals/set-to-string-tag":1773651887036,"../internals/iterators":1773651887094}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887135, function(require, module, exports) {

var fails = require('../internals/fails');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var defineBuiltIn = require('../internals/define-built-in');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

}, function(modId) { var map = {"../internals/fails":1773651886965,"../internals/is-callable":1773651886969,"../internals/is-object":1773651886981,"../internals/object-create":1773651887013,"../internals/object-get-prototype-of":1773651887090,"../internals/define-built-in":1773651887031,"../internals/well-known-symbol":1773651886994,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887136, function(require, module, exports) {

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887137, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var IndexedObject = require('../internals/indexed-object');
var toIndexedObject = require('../internals/to-indexed-object');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var nativeJoin = uncurryThis([].join);

var ES3_STRINGS = IndexedObject !== Object;
var FORCED = ES3_STRINGS || !arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: FORCED }, {
  join: function join(separator) {
    return nativeJoin(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/indexed-object":1773651886976,"../internals/to-indexed-object":1773651886975,"../internals/array-method-is-strict":1773651887110}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887138, function(require, module, exports) {

var $ = require('../internals/export');
var lastIndexOf = require('../internals/array-last-index-of');

// `Array.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
// eslint-disable-next-line es/no-array-prototype-lastindexof -- required for testing
$({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-last-index-of":1773651887139}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887139, function(require, module, exports) {

/* eslint-disable es/no-array-prototype-lastindexof -- safe */
var apply = require('../internals/function-apply');
var toIndexedObject = require('../internals/to-indexed-object');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var min = Math.min;
var $lastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!$lastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return apply($lastIndexOf, this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = lengthOfArrayLike(O);
  if (length === 0) return -1;
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toIntegerOrInfinity(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : $lastIndexOf;

}, function(modId) { var map = {"../internals/function-apply":1773651886963,"../internals/to-indexed-object":1773651886975,"../internals/to-integer-or-infinity":1773651887019,"../internals/length-of-array-like":1773651887021,"../internals/array-method-is-strict":1773651887110}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887140, function(require, module, exports) {

var $ = require('../internals/export');
var $map = require('../internals/array-iteration').map;
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-iteration":1773651887040,"../internals/array-method-has-species-support":1773651887105}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887141, function(require, module, exports) {

var $ = require('../internals/export');
var fails = require('../internals/fails');
var isConstructor = require('../internals/is-constructor');
var createProperty = require('../internals/create-property');
var setArrayLength = require('../internals/array-set-length');

var $Array = Array;

var ISNT_GENERIC = fails(function () {
  function F() { /* empty */ }
  // eslint-disable-next-line es/no-array-of -- safe
  return !($Array.of.call(F) instanceof F);
});

// `Array.of` method
// https://tc39.es/ecma262/#sec-array.of
// WebKit Array.of isn't generic
$({ target: 'Array', stat: true, forced: ISNT_GENERIC }, {
  of: function of(/* ...args */) {
    var index = 0;
    var argumentsLength = arguments.length;
    var result = new (isConstructor(this) ? this : $Array)(argumentsLength);
    while (argumentsLength > index) createProperty(result, index, arguments[index++]);
    setArrayLength(result, argumentsLength);
    return result;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/fails":1773651886965,"../internals/is-constructor":1773651887044,"../internals/create-property":1773651887046,"../internals/array-set-length":1773651887104}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887142, function(require, module, exports) {

var $ = require('../internals/export');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var setArrayLength = require('../internals/array-set-length');
var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer');
var fails = require('../internals/fails');

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/to-object":1773651887000,"../internals/length-of-array-like":1773651887021,"../internals/array-set-length":1773651887104,"../internals/does-not-exceed-safe-integer":1773651887103,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887143, function(require, module, exports) {

var $ = require('../internals/export');
var $reduce = require('../internals/array-reduce').left;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var CHROME_VERSION = require('../internals/environment-v8-version');
var IS_NODE = require('../internals/environment-is-node');

// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
var FORCED = CHROME_BUG || !arrayMethodIsStrict('reduce');

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: FORCED }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-reduce":1773651887144,"../internals/array-method-is-strict":1773651887110,"../internals/environment-v8-version":1773651886988,"../internals/environment-is-node":1773651887145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887144, function(require, module, exports) {

var aCallable = require('../internals/a-callable');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');

var $TypeError = TypeError;

var REDUCE_EMPTY = 'Reduce of empty array with no initial value';

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(O);
    aCallable(callbackfn);
    if (length === 0 && argumentsLength < 2) throw new $TypeError(REDUCE_EMPTY);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw new $TypeError(REDUCE_EMPTY);
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

}, function(modId) { var map = {"../internals/a-callable":1773651886991,"../internals/to-object":1773651887000,"../internals/indexed-object":1773651886976,"../internals/length-of-array-like":1773651887021}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887145, function(require, module, exports) {

var ENVIRONMENT = require('../internals/environment');

module.exports = ENVIRONMENT === 'NODE';

}, function(modId) { var map = {"../internals/environment":1773651887146}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887146, function(require, module, exports) {

/* global Bun, Deno -- detection */
var globalThis = require('../internals/global-this');
var userAgent = require('../internals/environment-user-agent');
var classof = require('../internals/classof-raw');

var userAgentStartsWith = function (string) {
  return userAgent.slice(0, string.length) === string;
};

module.exports = (function () {
  if (userAgentStartsWith('Bun/')) return 'BUN';
  if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
  if (userAgentStartsWith('Deno/')) return 'DENO';
  if (userAgentStartsWith('Node.js/')) return 'NODE';
  if (globalThis.Bun && typeof Bun.version == 'string') return 'BUN';
  if (globalThis.Deno && typeof Deno.version == 'object') return 'DENO';
  if (classof(globalThis.process) === 'process') return 'NODE';
  if (globalThis.window && globalThis.document) return 'BROWSER';
  return 'REST';
})();

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/environment-user-agent":1773651886989,"../internals/classof-raw":1773651886967}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887147, function(require, module, exports) {

var $ = require('../internals/export');
var $reduceRight = require('../internals/array-reduce').right;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var CHROME_VERSION = require('../internals/environment-v8-version');
var IS_NODE = require('../internals/environment-is-node');

// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
var FORCED = CHROME_BUG || !arrayMethodIsStrict('reduceRight');

// `Array.prototype.reduceRight` method
// https://tc39.es/ecma262/#sec-array.prototype.reduceright
$({ target: 'Array', proto: true, forced: FORCED }, {
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-reduce":1773651887144,"../internals/array-method-is-strict":1773651887110,"../internals/environment-v8-version":1773651886988,"../internals/environment-is-node":1773651887145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887148, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var isArray = require('../internals/is-array');

var nativeReverse = uncurryThis([].reverse);
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray(this)) this.length = this.length;
    return nativeReverse(this);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/is-array":1773651887043}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887149, function(require, module, exports) {

var $ = require('../internals/export');
var isArray = require('../internals/is-array');
var isConstructor = require('../internals/is-constructor');
var isObject = require('../internals/is-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toIndexedObject = require('../internals/to-indexed-object');
var createProperty = require('../internals/create-property');
var setArrayLength = require('../internals/array-set-length');
var wellKnownSymbol = require('../internals/well-known-symbol');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var nativeSlice = require('../internals/array-slice');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var $Array = Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === $Array || Constructor === undefined) {
        return nativeSlice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    setArrayLength(result, n);
    return result;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/is-array":1773651887043,"../internals/is-constructor":1773651887044,"../internals/is-object":1773651886981,"../internals/to-absolute-index":1773651887018,"../internals/length-of-array-like":1773651887021,"../internals/to-indexed-object":1773651886975,"../internals/create-property":1773651887046,"../internals/array-set-length":1773651887104,"../internals/well-known-symbol":1773651886994,"../internals/array-method-has-species-support":1773651887105,"../internals/array-slice":1773651887029}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887150, function(require, module, exports) {

var $ = require('../internals/export');
var $some = require('../internals/array-iteration').some;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var STRICT_METHOD = arrayMethodIsStrict('some');

// `Array.prototype.some` method
// https://tc39.es/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-iteration":1773651887040,"../internals/array-method-is-strict":1773651887110}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887151, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var deletePropertyOrThrow = require('../internals/delete-property-or-throw');
var toString = require('../internals/to-string');
var fails = require('../internals/fails');
var internalSort = require('../internals/array-sort');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var FF = require('../internals/environment-ff-version');
var IE_OR_EDGE = require('../internals/environment-is-ie-or-edge');
var V8 = require('../internals/environment-v8-version');
var WEBKIT = require('../internals/environment-webkit-version');

var test = [];
var nativeSort = uncurryThis(test.sort);
var push = uncurryThis(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);

    var array = toObject(this);

    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = lengthOfArrayLike(items);
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) deletePropertyOrThrow(array, index++);

    return array;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/a-callable":1773651886991,"../internals/to-object":1773651887000,"../internals/length-of-array-like":1773651887021,"../internals/delete-property-or-throw":1773651887108,"../internals/to-string":1773651887010,"../internals/fails":1773651886965,"../internals/array-sort":1773651887152,"../internals/array-method-is-strict":1773651887110,"../internals/environment-ff-version":1773651887153,"../internals/environment-is-ie-or-edge":1773651887154,"../internals/environment-v8-version":1773651886988,"../internals/environment-webkit-version":1773651887155}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887152, function(require, module, exports) {

var arraySlice = require('../internals/array-slice');

var floor = Math.floor;

var sort = function (array, comparefn) {
  var length = array.length;

  if (length < 8) {
    // insertion sort
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    }
  } else {
    // merge sort
    var middle = floor(length / 2);
    var left = sort(arraySlice(array, 0, middle), comparefn);
    var right = sort(arraySlice(array, middle), comparefn);
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = (lindex < llength && rindex < rlength)
        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
        : lindex < llength ? left[lindex++] : right[rindex++];
    }
  }

  return array;
};

module.exports = sort;

}, function(modId) { var map = {"../internals/array-slice":1773651887029}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887153, function(require, module, exports) {

var userAgent = require('../internals/environment-user-agent');

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];

}, function(modId) { var map = {"../internals/environment-user-agent":1773651886989}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887154, function(require, module, exports) {

var UA = require('../internals/environment-user-agent');

module.exports = /MSIE|Trident/.test(UA);

}, function(modId) { var map = {"../internals/environment-user-agent":1773651886989}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887155, function(require, module, exports) {

var userAgent = require('../internals/environment-user-agent');

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];

}, function(modId) { var map = {"../internals/environment-user-agent":1773651886989}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887156, function(require, module, exports) {

var setSpecies = require('../internals/set-species');

// `Array[@@species]` getter
// https://tc39.es/ecma262/#sec-get-array-@@species
setSpecies('Array');

}, function(modId) { var map = {"../internals/set-species":1773651887157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887157, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var wellKnownSymbol = require('../internals/well-known-symbol');
var DESCRIPTORS = require('../internals/descriptors');

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineBuiltInAccessor(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/define-built-in-accessor":1773651887032,"../internals/well-known-symbol":1773651886994,"../internals/descriptors":1773651886971}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887158, function(require, module, exports) {

var $ = require('../internals/export');
var toObject = require('../internals/to-object');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var setArrayLength = require('../internals/array-set-length');
var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer');
var arraySpeciesCreate = require('../internals/array-species-create');
var createProperty = require('../internals/create-property');
var deletePropertyOrThrow = require('../internals/delete-property-or-throw');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max = Math.max;
var min = Math.min;

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    setArrayLength(A, actualDeleteCount);
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    setArrayLength(O, len - actualDeleteCount + insertCount);
    return A;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/to-object":1773651887000,"../internals/to-absolute-index":1773651887018,"../internals/to-integer-or-infinity":1773651887019,"../internals/length-of-array-like":1773651887021,"../internals/array-set-length":1773651887104,"../internals/does-not-exceed-safe-integer":1773651887103,"../internals/array-species-create":1773651887041,"../internals/create-property":1773651887046,"../internals/delete-property-or-throw":1773651887108,"../internals/array-method-has-species-support":1773651887105}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887159, function(require, module, exports) {

var $ = require('../internals/export');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toIndexedObject = require('../internals/to-indexed-object');
var createProperty = require('../internals/create-property');
var addToUnscopables = require('../internals/add-to-unscopables');

var $Array = Array;

// `Array.prototype.toReversed` method
// https://tc39.es/ecma262/#sec-array.prototype.toreversed
$({ target: 'Array', proto: true }, {
  toReversed: function toReversed() {
    var O = toIndexedObject(this);
    var len = lengthOfArrayLike(O);
    var A = new $Array(len);
    var k = 0;
    for (; k < len; k++) createProperty(A, k, O[len - k - 1]);
    return A;
  }
});

addToUnscopables('toReversed');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/length-of-array-like":1773651887021,"../internals/to-indexed-object":1773651886975,"../internals/create-property":1773651887046,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887160, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var toIndexedObject = require('../internals/to-indexed-object');
var arrayFromConstructorAndList = require('../internals/array-from-constructor-and-list');
var getBuiltInPrototypeMethod = require('../internals/get-built-in-prototype-method');
var addToUnscopables = require('../internals/add-to-unscopables');

var $Array = Array;
var sort = uncurryThis(getBuiltInPrototypeMethod('Array', 'sort'));

// `Array.prototype.toSorted` method
// https://tc39.es/ecma262/#sec-array.prototype.tosorted
$({ target: 'Array', proto: true }, {
  toSorted: function toSorted(compareFn) {
    if (compareFn !== undefined) aCallable(compareFn);
    var O = toIndexedObject(this);
    var A = arrayFromConstructorAndList($Array, O);
    return sort(A, compareFn);
  }
});

addToUnscopables('toSorted');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/a-callable":1773651886991,"../internals/to-indexed-object":1773651886975,"../internals/array-from-constructor-and-list":1773651887161,"../internals/get-built-in-prototype-method":1773651887162,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887161, function(require, module, exports) {

var lengthOfArrayLike = require('../internals/length-of-array-like');

module.exports = function (Constructor, list, $length) {
  var index = 0;
  var length = arguments.length > 2 ? $length : lengthOfArrayLike(list);
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};

}, function(modId) { var map = {"../internals/length-of-array-like":1773651887021}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887162, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var path = require('../internals/path');

module.exports = function (CONSTRUCTOR, METHOD) {
  var Namespace = path[CONSTRUCTOR + 'Prototype'];
  var pureMethod = Namespace && Namespace[METHOD];
  if (pureMethod) return pureMethod;
  var NativeConstructor = globalThis[CONSTRUCTOR];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  return NativePrototype && NativePrototype[METHOD];
};

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/path":1773651886984}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887163, function(require, module, exports) {

var $ = require('../internals/export');
var addToUnscopables = require('../internals/add-to-unscopables');
var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toIndexedObject = require('../internals/to-indexed-object');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var createProperty = require('../internals/create-property');

var $Array = Array;
var max = Math.max;
var min = Math.min;

// `Array.prototype.toSpliced` method
// https://tc39.es/ecma262/#sec-array.prototype.tospliced
$({ target: 'Array', proto: true }, {
  toSpliced: function toSpliced(start, deleteCount /* , ...items */) {
    var O = toIndexedObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var k = 0;
    var insertCount, actualDeleteCount, newLen, A;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    newLen = doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
    A = $Array(newLen);

    for (; k < actualStart; k++) createProperty(A, k, O[k]);
    for (; k < actualStart + insertCount; k++) createProperty(A, k, arguments[k - actualStart + 2]);
    for (; k < newLen; k++) createProperty(A, k, O[k + actualDeleteCount - insertCount]);

    return A;
  }
});

addToUnscopables('toSpliced');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/add-to-unscopables":1773651887101,"../internals/does-not-exceed-safe-integer":1773651887103,"../internals/length-of-array-like":1773651887021,"../internals/to-absolute-index":1773651887018,"../internals/to-indexed-object":1773651886975,"../internals/to-integer-or-infinity":1773651887019,"../internals/create-property":1773651887046}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887164, function(require, module, exports) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = require('../internals/add-to-unscopables');

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('flat');

}, function(modId) { var map = {"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887165, function(require, module, exports) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = require('../internals/add-to-unscopables');

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('flatMap');

}, function(modId) { var map = {"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887166, function(require, module, exports) {

var $ = require('../internals/export');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var setArrayLength = require('../internals/array-set-length');
var deletePropertyOrThrow = require('../internals/delete-property-or-throw');
var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer');

// IE8-
var INCORRECT_RESULT = [].unshift(0) !== 1;

// V8 ~ Chrome < 71 and Safari <= 15.4, FF < 23 throws InternalError
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).unshift();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_RESULT || !properErrorOnNonWritableLength();

// `Array.prototype.unshift` method
// https://tc39.es/ecma262/#sec-array.prototype.unshift
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  unshift: function unshift(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    if (argCount) {
      doesNotExceedSafeInteger(len + argCount);
      var k = len;
      while (k--) {
        var to = k + argCount;
        if (k in O) O[to] = O[k];
        else deletePropertyOrThrow(O, to);
      }
      for (var j = 0; j < argCount; j++) {
        O[j] = arguments[j];
      }
    } return setArrayLength(O, len + argCount);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/to-object":1773651887000,"../internals/length-of-array-like":1773651887021,"../internals/array-set-length":1773651887104,"../internals/delete-property-or-throw":1773651887108,"../internals/does-not-exceed-safe-integer":1773651887103}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887167, function(require, module, exports) {

var $ = require('../internals/export');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toIndexedObject = require('../internals/to-indexed-object');
var createProperty = require('../internals/create-property');

var $Array = Array;
var $RangeError = RangeError;

// Firefox bug
var INCORRECT_EXCEPTION_ON_COERCION_FAIL = (function () {
  try {
    // eslint-disable-next-line es/no-array-prototype-with, no-throw-literal -- needed for testing
    []['with']({ valueOf: function () { throw 4; } }, null);
  } catch (error) {
    return error !== 4;
  }
})();

// `Array.prototype.with` method
// https://tc39.es/ecma262/#sec-array.prototype.with
$({ target: 'Array', proto: true, forced: INCORRECT_EXCEPTION_ON_COERCION_FAIL }, {
  'with': function (index, value) {
    var O = toIndexedObject(this);
    var len = lengthOfArrayLike(O);
    var relativeIndex = toIntegerOrInfinity(index);
    var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
    if (actualIndex >= len || actualIndex < 0) throw new $RangeError('Incorrect index');
    var A = new $Array(len);
    var k = 0;
    for (; k < len; k++) createProperty(A, k, k === actualIndex ? value : O[k]);
    return A;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/length-of-array-like":1773651887021,"../internals/to-integer-or-infinity":1773651887019,"../internals/to-indexed-object":1773651886975,"../internals/create-property":1773651887046}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887168, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887169, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887170, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887171, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887172, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887173, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887174, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887175, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887176, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887177, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');

// IE8- non-standard case
var FORCED = fails(function () {
  // eslint-disable-next-line es/no-date-prototype-getyear-setyear -- detection
  return new Date(16e11).getYear() !== 120;
});

var getFullYear = uncurryThis(Date.prototype.getFullYear);

// `Date.prototype.getYear` method
// https://tc39.es/ecma262/#sec-date.prototype.getyear
$({ target: 'Date', proto: true, forced: FORCED }, {
  getYear: function getYear() {
    return getFullYear(this) - 1900;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887178, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');

var $Date = Date;
var thisTimeValue = uncurryThis($Date.prototype.getTime);

// `Date.now` method
// https://tc39.es/ecma262/#sec-date.now
$({ target: 'Date', stat: true }, {
  now: function now() {
    return thisTimeValue(new $Date());
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887179, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var DatePrototype = Date.prototype;
var thisTimeValue = uncurryThis(DatePrototype.getTime);
var setFullYear = uncurryThis(DatePrototype.setFullYear);

// `Date.prototype.setYear` method
// https://tc39.es/ecma262/#sec-date.prototype.setyear
$({ target: 'Date', proto: true }, {
  setYear: function setYear(year) {
    // validate
    thisTimeValue(this);
    var yi = toIntegerOrInfinity(year);
    var yyyy = yi >= 0 && yi <= 99 ? yi + 1900 : yi;
    return setFullYear(this, yyyy);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/to-integer-or-infinity":1773651887019}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887180, function(require, module, exports) {

var $ = require('../internals/export');

// `Date.prototype.toGMTString` method
// https://tc39.es/ecma262/#sec-date.prototype.togmtstring
$({ target: 'Date', proto: true }, {
  toGMTString: Date.prototype.toUTCString
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887181, function(require, module, exports) {

var $ = require('../internals/export');
var toISOString = require('../internals/date-to-iso-string');

// `Date.prototype.toISOString` method
// https://tc39.es/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit has a broken implementations
$({ target: 'Date', proto: true, forced: Date.prototype.toISOString !== toISOString }, {
  toISOString: toISOString
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/date-to-iso-string":1773651887182}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887182, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var padStart = require('../internals/string-pad').start;

var $RangeError = RangeError;
var $isFinite = isFinite;
var abs = Math.abs;
var DatePrototype = Date.prototype;
var nativeDateToISOString = DatePrototype.toISOString;
var thisTimeValue = uncurryThis(DatePrototype.getTime);
var getUTCDate = uncurryThis(DatePrototype.getUTCDate);
var getUTCFullYear = uncurryThis(DatePrototype.getUTCFullYear);
var getUTCHours = uncurryThis(DatePrototype.getUTCHours);
var getUTCMilliseconds = uncurryThis(DatePrototype.getUTCMilliseconds);
var getUTCMinutes = uncurryThis(DatePrototype.getUTCMinutes);
var getUTCMonth = uncurryThis(DatePrototype.getUTCMonth);
var getUTCSeconds = uncurryThis(DatePrototype.getUTCSeconds);

// `Date.prototype.toISOString` method implementation
// https://tc39.es/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit fails here:
module.exports = (fails(function () {
  return nativeDateToISOString.call(new Date(-5e13 - 1)) !== '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  nativeDateToISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!$isFinite(thisTimeValue(this))) throw new $RangeError('Invalid time value');
  var date = this;
  var year = getUTCFullYear(date);
  var milliseconds = getUTCMilliseconds(date);
  var sign = year < 0 ? '-' : year > 9999 ? '+' : '';
  return sign + padStart(abs(year), sign ? 6 : 4, 0) +
    '-' + padStart(getUTCMonth(date) + 1, 2, 0) +
    '-' + padStart(getUTCDate(date), 2, 0) +
    'T' + padStart(getUTCHours(date), 2, 0) +
    ':' + padStart(getUTCMinutes(date), 2, 0) +
    ':' + padStart(getUTCSeconds(date), 2, 0) +
    '.' + padStart(milliseconds, 3, 0) +
    'Z';
} : nativeDateToISOString;

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/fails":1773651886965,"../internals/string-pad":1773651887183}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887183, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var $repeat = require('../internals/string-repeat');
var requireObjectCoercible = require('../internals/require-object-coercible');

var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = toString(requireObjectCoercible($this));
    var intMaxLength = toLength(maxLength);
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : toString(fillString);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr === '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

module.exports = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/to-length":1773651887022,"../internals/to-string":1773651887010,"../internals/string-repeat":1773651887184,"../internals/require-object-coercible":1773651886977}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887184, function(require, module, exports) {

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toString = require('../internals/to-string');
var requireObjectCoercible = require('../internals/require-object-coercible');

var $RangeError = RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toIntegerOrInfinity(count);
  if (n < 0 || n === Infinity) throw new $RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};

}, function(modId) { var map = {"../internals/to-integer-or-infinity":1773651887019,"../internals/to-string":1773651887010,"../internals/require-object-coercible":1773651886977}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887185, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var toObject = require('../internals/to-object');
var toPrimitive = require('../internals/to-primitive');
var toISOString = require('../internals/date-to-iso-string');
var classof = require('../internals/classof-raw');
var fails = require('../internals/fails');

var FORCED = fails(function () {
  return new Date(NaN).toJSON() !== null
    || call(Date.prototype.toJSON, { toISOString: function () { return 1; } }) !== 1;
});

// `Date.prototype.toJSON` method
// https://tc39.es/ecma262/#sec-date.prototype.tojson
$({ target: 'Date', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O, 'number');
    return typeof pv == 'number' && !isFinite(pv) ? null :
      (!('toISOString' in O) && classof(O) === 'Date') ? call(toISOString, O) : O.toISOString();
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/to-object":1773651887000,"../internals/to-primitive":1773651886980,"../internals/date-to-iso-string":1773651887182,"../internals/classof-raw":1773651886967,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887186, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887187, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887188, function(require, module, exports) {

// https://github.com/tc39/proposal-explicit-resource-management
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var getBuiltIn = require('../internals/get-built-in');
var aCallable = require('../internals/a-callable');
var anInstance = require('../internals/an-instance');
var defineBuiltIn = require('../internals/define-built-in');
var defineBuiltIns = require('../internals/define-built-ins');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var wellKnownSymbol = require('../internals/well-known-symbol');
var InternalStateModule = require('../internals/internal-state');
var addDisposableResource = require('../internals/add-disposable-resource');

var SuppressedError = getBuiltIn('SuppressedError');
var $ReferenceError = ReferenceError;

var DISPOSE = wellKnownSymbol('dispose');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var DISPOSABLE_STACK = 'DisposableStack';
var setInternalState = InternalStateModule.set;
var getDisposableStackInternalState = InternalStateModule.getterFor(DISPOSABLE_STACK);

var HINT = 'sync-dispose';
var DISPOSED = 'disposed';
var PENDING = 'pending';

var getPendingDisposableStackInternalState = function (stack) {
  var internalState = getDisposableStackInternalState(stack);
  if (internalState.state === DISPOSED) throw new $ReferenceError(DISPOSABLE_STACK + ' already disposed');
  return internalState;
};

var $DisposableStack = function DisposableStack() {
  setInternalState(anInstance(this, DisposableStackPrototype), {
    type: DISPOSABLE_STACK,
    state: PENDING,
    stack: []
  });

  if (!DESCRIPTORS) this.disposed = false;
};

var DisposableStackPrototype = $DisposableStack.prototype;

defineBuiltIns(DisposableStackPrototype, {
  dispose: function dispose() {
    var internalState = getDisposableStackInternalState(this);
    if (internalState.state === DISPOSED) return;
    internalState.state = DISPOSED;
    if (!DESCRIPTORS) this.disposed = true;
    var stack = internalState.stack;
    var i = stack.length;
    var thrown = false;
    var suppressed;
    while (i) {
      var disposeMethod = stack[--i];
      stack[i] = null;
      try {
        disposeMethod();
      } catch (errorResult) {
        if (thrown) {
          suppressed = new SuppressedError(errorResult, suppressed);
        } else {
          thrown = true;
          suppressed = errorResult;
        }
      }
    }
    internalState.stack = null;
    if (thrown) throw suppressed;
  },
  use: function use(value) {
    addDisposableResource(getPendingDisposableStackInternalState(this), value, HINT);
    return value;
  },
  adopt: function adopt(value, onDispose) {
    var internalState = getPendingDisposableStackInternalState(this);
    aCallable(onDispose);
    addDisposableResource(internalState, undefined, HINT, function () {
      onDispose(value);
    });
    return value;
  },
  defer: function defer(onDispose) {
    var internalState = getPendingDisposableStackInternalState(this);
    aCallable(onDispose);
    addDisposableResource(internalState, undefined, HINT, onDispose);
  },
  move: function move() {
    var internalState = getPendingDisposableStackInternalState(this);
    var newDisposableStack = new $DisposableStack();
    getDisposableStackInternalState(newDisposableStack).stack = internalState.stack;
    internalState.stack = [];
    internalState.state = DISPOSED;
    if (!DESCRIPTORS) this.disposed = true;
    return newDisposableStack;
  }
});

if (DESCRIPTORS) defineBuiltInAccessor(DisposableStackPrototype, 'disposed', {
  configurable: true,
  get: function disposed() {
    return getDisposableStackInternalState(this).state === DISPOSED;
  }
});

defineBuiltIn(DisposableStackPrototype, DISPOSE, DisposableStackPrototype.dispose, { name: 'dispose' });
defineBuiltIn(DisposableStackPrototype, TO_STRING_TAG, DISPOSABLE_STACK, { nonWritable: true });

$({ global: true, constructor: true }, {
  DisposableStack: $DisposableStack
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/get-built-in":1773651886983,"../internals/a-callable":1773651886991,"../internals/an-instance":1773651887189,"../internals/define-built-in":1773651887031,"../internals/define-built-ins":1773651887190,"../internals/define-built-in-accessor":1773651887032,"../internals/well-known-symbol":1773651886994,"../internals/internal-state":1773651887038,"../internals/add-disposable-resource":1773651887191}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887189, function(require, module, exports) {

var isPrototypeOf = require('../internals/object-is-prototype-of');

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw new $TypeError('Incorrect invocation');
};

}, function(modId) { var map = {"../internals/object-is-prototype-of":1773651886985}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887190, function(require, module, exports) {

var defineBuiltIn = require('../internals/define-built-in');

module.exports = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];
    else defineBuiltIn(target, key, src[key], options);
  } return target;
};

}, function(modId) { var map = {"../internals/define-built-in":1773651887031}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887191, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var bind = require('../internals/function-bind-context');
var anObject = require('../internals/an-object');
var aCallable = require('../internals/a-callable');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var getMethod = require('../internals/get-method');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ASYNC_DISPOSE = wellKnownSymbol('asyncDispose');
var DISPOSE = wellKnownSymbol('dispose');

var push = uncurryThis([].push);

// `GetDisposeMethod` abstract operation
// https://tc39.es/proposal-explicit-resource-management/#sec-getdisposemethod
var getDisposeMethod = function (V, hint) {
  if (hint === 'async-dispose') {
    var method = getMethod(V, ASYNC_DISPOSE);
    if (method !== undefined) return method;
    method = getMethod(V, DISPOSE);
    if (method === undefined) return method;
    return function () {
      var O = this;
      var Promise = getBuiltIn('Promise');
      return new Promise(function (resolve) {
        call(method, O);
        resolve(undefined);
      });
    };
  } return getMethod(V, DISPOSE);
};

// `CreateDisposableResource` abstract operation
// https://tc39.es/proposal-explicit-resource-management/#sec-createdisposableresource
var createDisposableResource = function (V, hint, method) {
  if (arguments.length < 3 && !isNullOrUndefined(V)) {
    method = aCallable(getDisposeMethod(anObject(V), hint));
  }

  return method === undefined ? function () {
    return undefined;
  } : bind(method, V);
};

// `AddDisposableResource` abstract operation
// https://tc39.es/proposal-explicit-resource-management/#sec-adddisposableresource
module.exports = function (disposable, V, hint, method) {
  var resource;
  if (arguments.length < 4) {
    // When `V`` is either `null` or `undefined` and hint is `async-dispose`,
    // we record that the resource was evaluated to ensure we will still perform an `Await` when resources are later disposed.
    if (isNullOrUndefined(V) && hint === 'sync-dispose') return;
    resource = createDisposableResource(V, hint);
  } else {
    resource = createDisposableResource(undefined, hint, method);
  }

  push(disposable.stack, resource);
};

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/function-call":1773651886972,"../internals/function-uncurry-this":1773651886968,"../internals/function-bind-context":1773651887005,"../internals/an-object":1773651887009,"../internals/a-callable":1773651886991,"../internals/is-null-or-undefined":1773651886978,"../internals/get-method":1773651886990,"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887192, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var toString = require('../internals/to-string');

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var exec = uncurryThis(/./.exec);
var numberToString = uncurryThis(1.1.toString);
var toUpperCase = uncurryThis(''.toUpperCase);

var raw = /[\w*+\-./@]/;

var hex = function (code, length) {
  var result = numberToString(code, 16);
  while (result.length < length) result = '0' + result;
  return result;
};

// `escape` method
// https://tc39.es/ecma262/#sec-escape-string
$({ global: true }, {
  escape: function escape(string) {
    var str = toString(string);
    var result = '';
    var length = str.length;
    var index = 0;
    var chr, code;
    while (index < length) {
      chr = charAt(str, index++);
      if (exec(raw, chr)) {
        result += chr;
      } else {
        code = charCodeAt(chr, 0);
        if (code < 256) {
          result += '%' + hex(code, 2);
        } else {
          result += '%u' + toUpperCase(hex(code, 4));
        }
      }
    } return result;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/to-string":1773651887010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887193, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var bind = require('../internals/function-bind');

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
// eslint-disable-next-line es/no-function-prototype-bind -- detection
$({ target: 'Function', proto: true, forced: Function.bind !== bind }, {
  bind: bind
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind":1773651887194}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887194, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var isObject = require('../internals/is-object');
var hasOwn = require('../internals/has-own-property');
var arraySlice = require('../internals/array-slice');
var NATIVE_BIND = require('../internals/function-bind-native');

var $Function = Function;
var concat = uncurryThis([].concat);
var join = uncurryThis([].join);
var factories = {};

var construct = function (C, argsLength, args) {
  if (!hasOwn(factories, argsLength)) {
    var list = [];
    var i = 0;
    for (; i < argsLength; i++) list[i] = 'a[' + i + ']';
    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
// eslint-disable-next-line es/no-function-prototype-bind -- detection
module.exports = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
  var F = aCallable(this);
  var Prototype = F.prototype;
  var partArgs = arraySlice(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = concat(partArgs, arraySlice(arguments));
    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
  };
  if (isObject(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/a-callable":1773651886991,"../internals/is-object":1773651886981,"../internals/has-own-property":1773651886999,"../internals/array-slice":1773651887029,"../internals/function-bind-native":1773651886964}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887195, function(require, module, exports) {

var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var definePropertyModule = require('../internals/object-define-property');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var wellKnownSymbol = require('../internals/well-known-symbol');
var makeBuiltIn = require('../internals/make-built-in');

var HAS_INSTANCE = wellKnownSymbol('hasInstance');
var FunctionPrototype = Function.prototype;

// `Function.prototype[@@hasInstance]` method
// https://tc39.es/ecma262/#sec-function.prototype-@@hasinstance
if (!(HAS_INSTANCE in FunctionPrototype)) {
  definePropertyModule.f(FunctionPrototype, HAS_INSTANCE, { value: makeBuiltIn(function (O) {
    if (!isCallable(this) || !isObject(O)) return false;
    var P = this.prototype;
    return isObject(P) ? isPrototypeOf(P, O) : O instanceof this;
  }, HAS_INSTANCE) });
}

}, function(modId) { var map = {"../internals/is-callable":1773651886969,"../internals/is-object":1773651886981,"../internals/object-define-property":1773651887007,"../internals/object-is-prototype-of":1773651886985,"../internals/well-known-symbol":1773651886994,"../internals/make-built-in":1773651887196}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887196, function(require, module, exports) {

module.exports = function (value) {
  return value;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887197, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887198, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');

// `globalThis` object
// https://tc39.es/ecma262/#sec-globalthis
$({ global: true, forced: globalThis.globalThis !== globalThis }, {
  globalThis: globalThis
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887199, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var anInstance = require('../internals/an-instance');
var anObject = require('../internals/an-object');
var isCallable = require('../internals/is-callable');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var createProperty = require('../internals/create-property');
var fails = require('../internals/fails');
var hasOwn = require('../internals/has-own-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var DESCRIPTORS = require('../internals/descriptors');
var IS_PURE = require('../internals/is-pure');

var CONSTRUCTOR = 'constructor';
var ITERATOR = 'Iterator';
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $TypeError = TypeError;
var NativeIterator = globalThis[ITERATOR];

// FF56- have non-standard global helper `Iterator`
var FORCED = IS_PURE
  || !isCallable(NativeIterator)
  || NativeIterator.prototype !== IteratorPrototype
  // FF44- non-standard `Iterator` passes previous tests
  || !fails(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance(this, IteratorPrototype);
  if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable');
};

var defineIteratorPrototypeAccessor = function (key, value) {
  if (DESCRIPTORS) {
    defineBuiltInAccessor(IteratorPrototype, key, {
      configurable: true,
      get: function () {
        return value;
      },
      set: function (replacement) {
        anObject(this);
        if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property");
        if (hasOwn(this, key)) this[key] = replacement;
        else createProperty(this, key, replacement);
      }
    });
  } else IteratorPrototype[key] = value;
};

if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR);

if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;

// `Iterator` constructor
// https://tc39.es/ecma262/#sec-iterator
$({ global: true, constructor: true, forced: FORCED }, {
  Iterator: IteratorConstructor
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/an-instance":1773651887189,"../internals/an-object":1773651887009,"../internals/is-callable":1773651886969,"../internals/object-get-prototype-of":1773651887090,"../internals/define-built-in-accessor":1773651887032,"../internals/create-property":1773651887046,"../internals/fails":1773651886965,"../internals/has-own-property":1773651886999,"../internals/well-known-symbol":1773651886994,"../internals/iterators-core":1773651887135,"../internals/descriptors":1773651886971,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887200, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorMethod = require('../internals/get-iterator-method');
var createIteratorProxy = require('../internals/iterator-create-proxy');

var $Array = Array;

var IteratorProxy = createIteratorProxy(function () {
  while (true) {
    var iterator = this.iterator;
    if (!iterator) {
      var iterableIndex = this.nextIterableIndex++;
      var iterables = this.iterables;
      if (iterableIndex >= iterables.length) {
        this.done = true;
        return;
      }
      var entry = iterables[iterableIndex];
      this.iterables[iterableIndex] = null;
      iterator = this.iterator = call(entry.method, entry.iterable);
      this.next = iterator.next;
    }
    var result = anObject(call(this.next, iterator));
    if (result.done) {
      this.iterator = null;
      this.next = null;
      continue;
    }
    return result.value;
  }
});

// `Iterator.concat` method
// https://github.com/tc39/proposal-iterator-sequencing
$({ target: 'Iterator', stat: true }, {
  concat: function concat() {
    var length = arguments.length;
    var iterables = $Array(length);
    for (var index = 0; index < length; index++) {
      var item = anObject(arguments[index]);
      iterables[index] = {
        iterable: item,
        method: aCallable(getIteratorMethod(item))
      };
    }
    return new IteratorProxy({
      iterables: iterables,
      nextIterableIndex: 0,
      iterator: null,
      next: null
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/get-iterator-method":1773651887096,"../internals/iterator-create-proxy":1773651887201}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887201, function(require, module, exports) {

var call = require('../internals/function-call');
var create = require('../internals/object-create');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var defineBuiltIns = require('../internals/define-built-ins');
var wellKnownSymbol = require('../internals/well-known-symbol');
var InternalStateModule = require('../internals/internal-state');
var getMethod = require('../internals/get-method');
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var createIterResultObject = require('../internals/create-iter-result-object');
var iteratorClose = require('../internals/iterator-close');
var iteratorCloseAll = require('../internals/iterator-close-all');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ITERATOR_HELPER = 'IteratorHelper';
var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
var NORMAL = 'normal';
var THROW = 'throw';
var setInternalState = InternalStateModule.set;

var createIteratorProxyPrototype = function (IS_ITERATOR) {
  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

  return defineBuiltIns(create(IteratorPrototype), {
    next: function next() {
      var state = getInternalState(this);
      // for simplification:
      //   for `%WrapForValidIteratorPrototype%.next` or with `state.returnHandlerResult` our `nextHandler` returns `IterResultObject`
      //   for `%IteratorHelperPrototype%.next` - just a value
      if (IS_ITERATOR) return state.nextHandler();
      if (state.done) return createIterResultObject(undefined, true);
      try {
        var result = state.nextHandler();
        return state.returnHandlerResult ? result : createIterResultObject(result, state.done);
      } catch (error) {
        state.done = true;
        throw error;
      }
    },
    'return': function () {
      var state = getInternalState(this);
      var iterator = state.iterator;
      state.done = true;
      if (IS_ITERATOR) {
        var returnMethod = getMethod(iterator, 'return');
        return returnMethod ? call(returnMethod, iterator) : createIterResultObject(undefined, true);
      }
      if (state.inner) try {
        iteratorClose(state.inner.iterator, NORMAL);
      } catch (error) {
        return iteratorClose(iterator, THROW, error);
      }
      if (state.openIters) try {
        iteratorCloseAll(state.openIters, NORMAL);
      } catch (error) {
        return iteratorClose(iterator, THROW, error);
      }
      if (iterator) iteratorClose(iterator, NORMAL);
      return createIterResultObject(undefined, true);
    }
  });
};

var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
var IteratorHelperPrototype = createIteratorProxyPrototype(false);

createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

module.exports = function (nextHandler, IS_ITERATOR, RETURN_HANDLER_RESULT) {
  var IteratorProxy = function Iterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
    state.returnHandlerResult = !!RETURN_HANDLER_RESULT;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState(this, state);
  };

  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

  return IteratorProxy;
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/object-create":1773651887013,"../internals/create-non-enumerable-property":1773651887006,"../internals/define-built-ins":1773651887190,"../internals/well-known-symbol":1773651886994,"../internals/internal-state":1773651887038,"../internals/get-method":1773651886990,"../internals/iterators-core":1773651887135,"../internals/create-iter-result-object":1773651887136,"../internals/iterator-close":1773651887097,"../internals/iterator-close-all":1773651887202}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887202, function(require, module, exports) {

var iteratorClose = require('../internals/iterator-close');

module.exports = function (iters, kind, value) {
  for (var i = iters.length - 1; i >= 0; i--) {
    if (iters[i] === undefined) continue;
    try {
      value = iteratorClose(iters[i].iterator, kind, value);
    } catch (error) {
      kind = 'throw';
      value = error;
    }
  }
  if (kind === 'throw') throw value;
  return value;
};

}, function(modId) { var map = {"../internals/iterator-close":1773651887097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887203, function(require, module, exports) {

// https://github.com/tc39/proposal-explicit-resource-management
var call = require('../internals/function-call');
var defineBuiltIn = require('../internals/define-built-in');
var getMethod = require('../internals/get-method');
var hasOwn = require('../internals/has-own-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;

var DISPOSE = wellKnownSymbol('dispose');

if (!hasOwn(IteratorPrototype, DISPOSE)) {
  defineBuiltIn(IteratorPrototype, DISPOSE, function () {
    var $return = getMethod(this, 'return');
    if ($return) call($return, this);
  });
}

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/define-built-in":1773651887031,"../internals/get-method":1773651886990,"../internals/has-own-property":1773651886999,"../internals/well-known-symbol":1773651886994,"../internals/iterators-core":1773651887135}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887204, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var notANaN = require('../internals/not-a-nan');
var toPositiveInteger = require('../internals/to-positive-integer');
var iteratorClose = require('../internals/iterator-close');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var iteratorHelperThrowsOnInvalidIterator = require('../internals/iterator-helper-throws-on-invalid-iterator');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');
var IS_PURE = require('../internals/is-pure');

var DROP_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator('drop', 0);
var dropWithoutClosingOnEarlyError = !IS_PURE && !DROP_WITHOUT_THROWING_ON_INVALID_ITERATOR
  && iteratorHelperWithoutClosingOnEarlyError('drop', RangeError);

var FORCED = IS_PURE || DROP_WITHOUT_THROWING_ON_INVALID_ITERATOR || dropWithoutClosingOnEarlyError;

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var next = this.next;
  var result, done;
  while (this.remaining) {
    this.remaining--;
    result = anObject(call(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
  }
  result = anObject(call(next, iterator));
  done = this.done = !!result.done;
  if (!done) return result.value;
});

// `Iterator.prototype.drop` method
// https://tc39.es/ecma262/#sec-iterator.prototype.drop
$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
  drop: function drop(limit) {
    anObject(this);
    var remaining;
    try {
      remaining = toPositiveInteger(notANaN(+limit));
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (dropWithoutClosingOnEarlyError) return call(dropWithoutClosingOnEarlyError, this, remaining);

    return new IteratorProxy(getIteratorDirect(this), {
      remaining: remaining
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/not-a-nan":1773651887206,"../internals/to-positive-integer":1773651887207,"../internals/iterator-close":1773651887097,"../internals/iterator-create-proxy":1773651887201,"../internals/iterator-helper-throws-on-invalid-iterator":1773651887208,"../internals/iterator-helper-without-closing-on-early-error":1773651887209,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887205, function(require, module, exports) {

// `GetIteratorDirect(obj)` abstract operation
// https://tc39.es/ecma262/#sec-getiteratordirect
module.exports = function (obj) {
  return {
    iterator: obj,
    next: obj.next,
    done: false
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887206, function(require, module, exports) {

var $RangeError = RangeError;

module.exports = function (it) {
  // eslint-disable-next-line no-self-compare -- NaN check
  if (it === it) return it;
  throw new $RangeError('NaN is not allowed');
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887207, function(require, module, exports) {

var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var $RangeError = RangeError;

module.exports = function (it) {
  var result = toIntegerOrInfinity(it);
  if (result < 0) throw new $RangeError("The argument can't be less than 0");
  return result;
};

}, function(modId) { var map = {"../internals/to-integer-or-infinity":1773651887019}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887208, function(require, module, exports) {

// Should throw an error on invalid iterator
// https://issues.chromium.org/issues/336839115
module.exports = function (methodName, argument) {
  // eslint-disable-next-line es/no-iterator -- required for testing
  var method = typeof Iterator == 'function' && Iterator.prototype[methodName];
  if (method) try {
    method.call({ next: null }, argument).next();
  } catch (error) {
    return true;
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887209, function(require, module, exports) {

var globalThis = require('../internals/global-this');

// https://github.com/tc39/ecma262/pull/3467
module.exports = function (METHOD_NAME, ExpectedError) {
  var Iterator = globalThis.Iterator;
  var IteratorPrototype = Iterator && Iterator.prototype;
  var method = IteratorPrototype && IteratorPrototype[METHOD_NAME];

  var CLOSED = false;

  if (method) try {
    method.call({
      next: function () { return { done: true }; },
      'return': function () { CLOSED = true; }
    }, -1);
  } catch (error) {
    // https://bugs.webkit.org/show_bug.cgi?id=291195
    if (!(error instanceof ExpectedError)) CLOSED = false;
  }

  if (!CLOSED) return method;
};

}, function(modId) { var map = {"../internals/global-this":1773651886962}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887210, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');

var everyWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('every', TypeError);

// `Iterator.prototype.every` method
// https://tc39.es/ecma262/#sec-iterator.prototype.every
$({ target: 'Iterator', proto: true, real: true, forced: everyWithoutClosingOnEarlyError }, {
  every: function every(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (everyWithoutClosingOnEarlyError) return call(everyWithoutClosingOnEarlyError, this, predicate);

    var record = getIteratorDirect(this);
    var counter = 0;
    return !iterate(record, function (value, stop) {
      if (!predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/iterate":1773651887092,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/iterator-close":1773651887097,"../internals/iterator-helper-without-closing-on-early-error":1773651887209}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887211, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');
var IS_PURE = require('../internals/is-pure');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperThrowsOnInvalidIterator = require('../internals/iterator-helper-throws-on-invalid-iterator');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');

var FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator('filter', function () { /* empty */ });
var filterWithoutClosingOnEarlyError = !IS_PURE && !FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR
  && iteratorHelperWithoutClosingOnEarlyError('filter', TypeError);

var FORCED = IS_PURE || FILTER_WITHOUT_THROWING_ON_INVALID_ITERATOR || filterWithoutClosingOnEarlyError;

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var predicate = this.predicate;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject(call(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing(iterator, predicate, [value, this.counter++], true)) return value;
  }
});

// `Iterator.prototype.filter` method
// https://tc39.es/ecma262/#sec-iterator.prototype.filter
$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
  filter: function filter(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (filterWithoutClosingOnEarlyError) return call(filterWithoutClosingOnEarlyError, this, predicate);

    return new IteratorProxy(getIteratorDirect(this), {
      predicate: predicate
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/iterator-create-proxy":1773651887201,"../internals/call-with-safe-iteration-closing":1773651887126,"../internals/is-pure":1773651886997,"../internals/iterator-close":1773651887097,"../internals/iterator-helper-throws-on-invalid-iterator":1773651887208,"../internals/iterator-helper-without-closing-on-early-error":1773651887209}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887212, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');

var findWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('find', TypeError);

// `Iterator.prototype.find` method
// https://tc39.es/ecma262/#sec-iterator.prototype.find
$({ target: 'Iterator', proto: true, real: true, forced: findWithoutClosingOnEarlyError }, {
  find: function find(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (findWithoutClosingOnEarlyError) return call(findWithoutClosingOnEarlyError, this, predicate);

    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop(value);
    }, { IS_RECORD: true, INTERRUPTED: true }).result;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/iterate":1773651887092,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/iterator-close":1773651887097,"../internals/iterator-helper-without-closing-on-early-error":1773651887209}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887213, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var getIteratorFlattenable = require('../internals/get-iterator-flattenable');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var iteratorClose = require('../internals/iterator-close');
var IS_PURE = require('../internals/is-pure');
var iteratorHelperThrowsOnInvalidIterator = require('../internals/iterator-helper-throws-on-invalid-iterator');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');

// Should not throw an error for an iterator without `return` method. Fixed in Safari 26.2
// https://bugs.webkit.org/show_bug.cgi?id=297532
function throwsOnIteratorWithoutReturn() {
  try {
    // eslint-disable-next-line es/no-map, es/no-iterator, es/no-iterator-prototype-flatmap -- required for testing
    var it = Iterator.prototype.flatMap.call(new Map([[4, 5]]).entries(), function (v) { return v; });
    it.next();
    it['return']();
  } catch (error) {
    return true;
  }
}

var FLAT_MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE
  && !iteratorHelperThrowsOnInvalidIterator('flatMap', function () { /* empty */ });
var flatMapWithoutClosingOnEarlyError = !IS_PURE && !FLAT_MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR
  && iteratorHelperWithoutClosingOnEarlyError('flatMap', TypeError);

var FORCED = IS_PURE || FLAT_MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR || flatMapWithoutClosingOnEarlyError
  || throwsOnIteratorWithoutReturn();

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var mapper = this.mapper;
  var result, inner;

  while (true) {
    if (inner = this.inner) try {
      result = anObject(call(inner.next, inner.iterator));
      if (!result.done) return result.value;
      this.inner = null;
    } catch (error) { iteratorClose(iterator, 'throw', error); }

    result = anObject(call(this.next, iterator));

    if (this.done = !!result.done) return;

    try {
      this.inner = getIteratorFlattenable(mapper(result.value, this.counter++), false);
    } catch (error) { iteratorClose(iterator, 'throw', error); }
  }
});

// `Iterator.prototype.flatMap` method
// https://tc39.es/ecma262/#sec-iterator.prototype.flatmap
$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
  flatMap: function flatMap(mapper) {
    anObject(this);
    try {
      aCallable(mapper);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (flatMapWithoutClosingOnEarlyError) return call(flatMapWithoutClosingOnEarlyError, this, mapper);

    return new IteratorProxy(getIteratorDirect(this), {
      mapper: mapper,
      inner: null
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/get-iterator-flattenable":1773651887214,"../internals/iterator-create-proxy":1773651887201,"../internals/iterator-close":1773651887097,"../internals/is-pure":1773651886997,"../internals/iterator-helper-throws-on-invalid-iterator":1773651887208,"../internals/iterator-helper-without-closing-on-early-error":1773651887209}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887214, function(require, module, exports) {

var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var getIteratorMethod = require('../internals/get-iterator-method');

module.exports = function (obj, stringHandling) {
  if (!stringHandling || typeof obj !== 'string') anObject(obj);
  var method = getIteratorMethod(obj);
  return getIteratorDirect(anObject(method !== undefined ? call(method, obj) : obj));
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/get-iterator-method":1773651887096}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887215, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');

var forEachWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('forEach', TypeError);

// `Iterator.prototype.forEach` method
// https://tc39.es/ecma262/#sec-iterator.prototype.foreach
$({ target: 'Iterator', proto: true, real: true, forced: forEachWithoutClosingOnEarlyError }, {
  forEach: function forEach(fn) {
    anObject(this);
    try {
      aCallable(fn);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (forEachWithoutClosingOnEarlyError) return call(forEachWithoutClosingOnEarlyError, this, fn);

    var record = getIteratorDirect(this);
    var counter = 0;
    iterate(record, function (value) {
      fn(value, counter++);
    }, { IS_RECORD: true });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/iterate":1773651887092,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/iterator-close":1773651887097,"../internals/iterator-helper-without-closing-on-early-error":1773651887209}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887216, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var toObject = require('../internals/to-object');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var createIteratorProxy = require('../internals/iterator-create-proxy');
var getIteratorFlattenable = require('../internals/get-iterator-flattenable');
var IS_PURE = require('../internals/is-pure');

var FORCED = IS_PURE || function () {
  // Should not throw when an underlying iterator's `return` method is null
  // https://bugs.webkit.org/show_bug.cgi?id=288714
  try {
    // eslint-disable-next-line es/no-iterator -- required for testing
    Iterator.from({ 'return': null })['return']();
  } catch (error) {
    return true;
  }
}();

var IteratorProxy = createIteratorProxy(function () {
  return call(this.next, this.iterator);
}, true);

// `Iterator.from` method
// https://tc39.es/ecma262/#sec-iterator.from
$({ target: 'Iterator', stat: true, forced: FORCED }, {
  from: function from(O) {
    var iteratorRecord = getIteratorFlattenable(typeof O == 'string' ? toObject(O) : O, true);
    return isPrototypeOf(IteratorPrototype, iteratorRecord.iterator)
      ? iteratorRecord.iterator
      : new IteratorProxy(iteratorRecord);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/to-object":1773651887000,"../internals/object-is-prototype-of":1773651886985,"../internals/iterators-core":1773651887135,"../internals/iterator-create-proxy":1773651887201,"../internals/get-iterator-flattenable":1773651887214,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887217, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperThrowsOnInvalidIterator = require('../internals/iterator-helper-throws-on-invalid-iterator');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');
var IS_PURE = require('../internals/is-pure');

var MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator('map', function () { /* empty */ });
var mapWithoutClosingOnEarlyError = !IS_PURE && !MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR
  && iteratorHelperWithoutClosingOnEarlyError('map', TypeError);

var FORCED = IS_PURE || MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR || mapWithoutClosingOnEarlyError;

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var result = anObject(call(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
});

// `Iterator.prototype.map` method
// https://tc39.es/ecma262/#sec-iterator.prototype.map
$({ target: 'Iterator', proto: true, real: true, forced: FORCED }, {
  map: function map(mapper) {
    anObject(this);
    try {
      aCallable(mapper);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (mapWithoutClosingOnEarlyError) return call(mapWithoutClosingOnEarlyError, this, mapper);

    return new IteratorProxy(getIteratorDirect(this), {
      mapper: mapper
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/iterator-create-proxy":1773651887201,"../internals/call-with-safe-iteration-closing":1773651887126,"../internals/iterator-close":1773651887097,"../internals/iterator-helper-throws-on-invalid-iterator":1773651887208,"../internals/iterator-helper-without-closing-on-early-error":1773651887209,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887218, function(require, module, exports) {

var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');
var apply = require('../internals/function-apply');
var fails = require('../internals/fails');

var $TypeError = TypeError;

// https://bugs.webkit.org/show_bug.cgi?id=291651
var FAILS_ON_INITIAL_UNDEFINED = fails(function () {
  // eslint-disable-next-line es/no-iterator-prototype-reduce, es/no-array-prototype-keys, array-callback-return -- required for testing
  [].keys().reduce(function () { /* empty */ }, undefined);
});

var reduceWithoutClosingOnEarlyError = !FAILS_ON_INITIAL_UNDEFINED && iteratorHelperWithoutClosingOnEarlyError('reduce', $TypeError);

// `Iterator.prototype.reduce` method
// https://tc39.es/ecma262/#sec-iterator.prototype.reduce
$({ target: 'Iterator', proto: true, real: true, forced: FAILS_ON_INITIAL_UNDEFINED || reduceWithoutClosingOnEarlyError }, {
  reduce: function reduce(reducer /* , initialValue */) {
    anObject(this);
    try {
      aCallable(reducer);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    if (reduceWithoutClosingOnEarlyError) {
      return apply(reduceWithoutClosingOnEarlyError, this, noInitial ? [reducer] : [reducer, accumulator]);
    }
    var record = getIteratorDirect(this);
    var counter = 0;
    iterate(record, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = reducer(accumulator, value, counter);
      }
      counter++;
    }, { IS_RECORD: true });
    if (noInitial) throw new $TypeError('Reduce of empty iterator with no initial value');
    return accumulator;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/iterate":1773651887092,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/iterator-close":1773651887097,"../internals/iterator-helper-without-closing-on-early-error":1773651887209,"../internals/function-apply":1773651886963,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887219, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var iterate = require('../internals/iterate');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');

var someWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('some', TypeError);

// `Iterator.prototype.some` method
// https://tc39.es/ecma262/#sec-iterator.prototype.some
$({ target: 'Iterator', proto: true, real: true, forced: someWithoutClosingOnEarlyError }, {
  some: function some(predicate) {
    anObject(this);
    try {
      aCallable(predicate);
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (someWithoutClosingOnEarlyError) return call(someWithoutClosingOnEarlyError, this, predicate);

    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/iterate":1773651887092,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/iterator-close":1773651887097,"../internals/iterator-helper-without-closing-on-early-error":1773651887209}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887220, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var notANaN = require('../internals/not-a-nan');
var toPositiveInteger = require('../internals/to-positive-integer');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var iteratorClose = require('../internals/iterator-close');
var iteratorHelperWithoutClosingOnEarlyError = require('../internals/iterator-helper-without-closing-on-early-error');
var IS_PURE = require('../internals/is-pure');

var takeWithoutClosingOnEarlyError = !IS_PURE && iteratorHelperWithoutClosingOnEarlyError('take', RangeError);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  if (!this.remaining--) {
    this.done = true;
    return iteratorClose(iterator, 'normal', undefined);
  }
  var result = anObject(call(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return result.value;
});

// `Iterator.prototype.take` method
// https://tc39.es/ecma262/#sec-iterator.prototype.take
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE || takeWithoutClosingOnEarlyError }, {
  take: function take(limit) {
    anObject(this);
    var remaining;
    try {
      remaining = toPositiveInteger(notANaN(+limit));
    } catch (error) {
      iteratorClose(this, 'throw', error);
    }

    if (takeWithoutClosingOnEarlyError) return call(takeWithoutClosingOnEarlyError, this, remaining);

    return new IteratorProxy(getIteratorDirect(this), {
      remaining: remaining
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/not-a-nan":1773651887206,"../internals/to-positive-integer":1773651887207,"../internals/iterator-create-proxy":1773651887201,"../internals/iterator-close":1773651887097,"../internals/iterator-helper-without-closing-on-early-error":1773651887209,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887221, function(require, module, exports) {

var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var createProperty = require('../internals/create-property');
var iterate = require('../internals/iterate');
var getIteratorDirect = require('../internals/get-iterator-direct');

// `Iterator.prototype.toArray` method
// https://tc39.es/ecma262/#sec-iterator.prototype.toarray
$({ target: 'Iterator', proto: true, real: true }, {
  toArray: function toArray() {
    var result = [];
    var index = 0;
    iterate(getIteratorDirect(anObject(this)), function (element) {
      createProperty(result, index++, element);
    }, { IS_RECORD: true });
    return result;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/an-object":1773651887009,"../internals/create-property":1773651887046,"../internals/iterate":1773651887092,"../internals/get-iterator-direct":1773651887205}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887222, function(require, module, exports) {

var $ = require('../internals/export');
var NATIVE_RAW_JSON = require('../internals/native-raw-json');
var isRawJSON = require('../internals/is-raw-json');

// `JSON.isRawJSON` method
// https://tc39.es/proposal-json-parse-with-source/#sec-json.israwjson
// https://github.com/tc39/proposal-json-parse-with-source
$({ target: 'JSON', stat: true, forced: !NATIVE_RAW_JSON }, {
  isRawJSON: isRawJSON
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/native-raw-json":1773651887053,"../internals/is-raw-json":1773651887051}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887223, function(require, module, exports) {

var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var globalThis = require('../internals/global-this');
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var call = require('../internals/function-call');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var hasOwn = require('../internals/has-own-property');
var toString = require('../internals/to-string');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var createProperty = require('../internals/create-property');
var fails = require('../internals/fails');
var parseJSONString = require('../internals/parse-json-string');
var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection');

var JSON = globalThis.JSON;
var Number = globalThis.Number;
var SyntaxError = globalThis.SyntaxError;
var nativeParse = JSON && JSON.parse;
var enumerableOwnProperties = getBuiltIn('Object', 'keys');
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var at = uncurryThis(''.charAt);
var slice = uncurryThis(''.slice);
var exec = uncurryThis(/./.exec);
var push = uncurryThis([].push);

var IS_DIGIT = /^\d$/;
var IS_NON_ZERO_DIGIT = /^[1-9]$/;
var IS_NUMBER_START = /^[\d-]$/;
var IS_WHITESPACE = /^[\t\n\r ]$/;

var PRIMITIVE = 0;
var OBJECT = 1;

var $parse = function (source, reviver) {
  source = toString(source);
  var context = new Context(source, 0, '');
  var root = context.parse();
  var value = root.value;
  var endIndex = context.skip(IS_WHITESPACE, root.end);
  if (endIndex < source.length) {
    throw new SyntaxError('Unexpected extra character: "' + at(source, endIndex) + '" after the parsed data at: ' + endIndex);
  }
  return isCallable(reviver) ? internalize({ '': value }, '', reviver, root) : value;
};

var internalize = function (holder, name, reviver, node) {
  var val = holder[name];
  var unmodified = node && val === node.value;
  var context = unmodified && typeof node.source == 'string' ? { source: node.source } : {};
  var elementRecordsLen, keys, len, i, P;
  if (isObject(val)) {
    var nodeIsArray = isArray(val);
    var nodes = unmodified ? node.nodes : nodeIsArray ? [] : {};
    if (nodeIsArray) {
      elementRecordsLen = nodes.length;
      len = lengthOfArrayLike(val);
      for (i = 0; i < len; i++) {
        internalizeProperty(val, i, internalize(val, '' + i, reviver, i < elementRecordsLen ? nodes[i] : undefined));
      }
    } else {
      keys = enumerableOwnProperties(val);
      len = lengthOfArrayLike(keys);
      for (i = 0; i < len; i++) {
        P = keys[i];
        internalizeProperty(val, P, internalize(val, P, reviver, hasOwn(nodes, P) ? nodes[P] : undefined));
      }
    }
  }
  return call(reviver, holder, name, val, context);
};

var internalizeProperty = function (object, key, value) {
  if (DESCRIPTORS) {
    var descriptor = getOwnPropertyDescriptor(object, key);
    if (descriptor && !descriptor.configurable) return;
  }
  if (value === undefined) delete object[key];
  else createProperty(object, key, value);
};

var Node = function (value, end, source, nodes) {
  this.value = value;
  this.end = end;
  this.source = source;
  this.nodes = nodes;
};

var Context = function (source, index) {
  this.source = source;
  this.index = index;
};

// https://www.json.org/json-en.html
Context.prototype = {
  fork: function (nextIndex) {
    return new Context(this.source, nextIndex);
  },
  parse: function () {
    var source = this.source;
    var i = this.skip(IS_WHITESPACE, this.index);
    var fork = this.fork(i);
    var chr = at(source, i);
    if (exec(IS_NUMBER_START, chr)) return fork.number();
    switch (chr) {
      case '{':
        return fork.object();
      case '[':
        return fork.array();
      case '"':
        return fork.string();
      case 't':
        return fork.keyword(true);
      case 'f':
        return fork.keyword(false);
      case 'n':
        return fork.keyword(null);
    } throw new SyntaxError('Unexpected character: "' + chr + '" at: ' + i);
  },
  node: function (type, value, start, end, nodes) {
    return new Node(value, end, type ? null : slice(this.source, start, end), nodes);
  },
  object: function () {
    var source = this.source;
    var i = this.index + 1;
    var expectKeypair = false;
    var object = {};
    var nodes = {};
    while (i < source.length) {
      i = this.until(['"', '}'], i);
      if (at(source, i) === '}' && !expectKeypair) {
        i++;
        break;
      }
      // Parsing the key
      var result = this.fork(i).string();
      var key = result.value;
      i = result.end;
      i = this.until([':'], i) + 1;
      // Parsing value
      i = this.skip(IS_WHITESPACE, i);
      result = this.fork(i).parse();
      createProperty(nodes, key, result);
      createProperty(object, key, result.value);
      i = this.until([',', '}'], result.end);
      var chr = at(source, i);
      if (chr === ',') {
        expectKeypair = true;
        i++;
      } else if (chr === '}') {
        i++;
        break;
      }
    }
    return this.node(OBJECT, object, this.index, i, nodes);
  },
  array: function () {
    var source = this.source;
    var i = this.index + 1;
    var expectElement = false;
    var array = [];
    var nodes = [];
    while (i < source.length) {
      i = this.skip(IS_WHITESPACE, i);
      if (at(source, i) === ']' && !expectElement) {
        i++;
        break;
      }
      var result = this.fork(i).parse();
      push(nodes, result);
      push(array, result.value);
      i = this.until([',', ']'], result.end);
      if (at(source, i) === ',') {
        expectElement = true;
        i++;
      } else if (at(source, i) === ']') {
        i++;
        break;
      }
    }
    return this.node(OBJECT, array, this.index, i, nodes);
  },
  string: function () {
    var index = this.index;
    var parsed = parseJSONString(this.source, this.index + 1);
    return this.node(PRIMITIVE, parsed.value, index, parsed.end);
  },
  number: function () {
    var source = this.source;
    var startIndex = this.index;
    var i = startIndex;
    if (at(source, i) === '-') i++;
    if (at(source, i) === '0') i++;
    else if (exec(IS_NON_ZERO_DIGIT, at(source, i))) i = this.skip(IS_DIGIT, i + 1);
    else throw new SyntaxError('Failed to parse number at: ' + i);
    if (at(source, i) === '.') i = this.skip(IS_DIGIT, i + 1);
    if (at(source, i) === 'e' || at(source, i) === 'E') {
      i++;
      if (at(source, i) === '+' || at(source, i) === '-') i++;
      var exponentStartIndex = i;
      i = this.skip(IS_DIGIT, i);
      if (exponentStartIndex === i) throw new SyntaxError("Failed to parse number's exponent value at: " + i);
    }
    return this.node(PRIMITIVE, Number(slice(source, startIndex, i)), startIndex, i);
  },
  keyword: function (value) {
    var keyword = '' + value;
    var index = this.index;
    var endIndex = index + keyword.length;
    if (slice(this.source, index, endIndex) !== keyword) throw new SyntaxError('Failed to parse value at: ' + index);
    return this.node(PRIMITIVE, value, index, endIndex);
  },
  skip: function (regex, i) {
    var source = this.source;
    for (; i < source.length; i++) if (!exec(regex, at(source, i))) break;
    return i;
  },
  until: function (array, i) {
    i = this.skip(IS_WHITESPACE, i);
    var chr = at(this.source, i);
    for (var j = 0; j < array.length; j++) if (array[j] === chr) return i;
    throw new SyntaxError('Unexpected character: "' + chr + '" at: ' + i);
  }
};

var NO_SOURCE_SUPPORT = fails(function () {
  var unsafeInt = '9007199254740993';
  var source;
  nativeParse(unsafeInt, function (key, value, context) {
    source = context.source;
  });
  return source !== unsafeInt;
});

var PROPER_BASE_PARSE = NATIVE_SYMBOL && !fails(function () {
  // Safari 9 bug
  return 1 / nativeParse('-0 \t') !== -Infinity;
});

// `JSON.parse` method
// https://tc39.es/ecma262/#sec-json.parse
// https://github.com/tc39/proposal-json-parse-with-source
$({ target: 'JSON', stat: true, forced: NO_SOURCE_SUPPORT }, {
  parse: function parse(text, reviver) {
    return PROPER_BASE_PARSE && !isCallable(reviver) ? nativeParse(text) : $parse(text, reviver);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/global-this":1773651886962,"../internals/get-built-in":1773651886983,"../internals/function-uncurry-this":1773651886968,"../internals/function-call":1773651886972,"../internals/is-callable":1773651886969,"../internals/is-object":1773651886981,"../internals/is-array":1773651887043,"../internals/has-own-property":1773651886999,"../internals/to-string":1773651887010,"../internals/length-of-array-like":1773651887021,"../internals/create-property":1773651887046,"../internals/fails":1773651886965,"../internals/parse-json-string":1773651887052,"../internals/symbol-constructor-detection":1773651886987}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887224, function(require, module, exports) {

var $ = require('../internals/export');
var FREEZING = require('../internals/freezing');
var NATIVE_RAW_JSON = require('../internals/native-raw-json');
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var toString = require('../internals/to-string');
var createProperty = require('../internals/create-property');
var setInternalState = require('../internals/internal-state').set;

var $SyntaxError = SyntaxError;
var parse = getBuiltIn('JSON', 'parse');
var create = getBuiltIn('Object', 'create');
var freeze = getBuiltIn('Object', 'freeze');
var at = uncurryThis(''.charAt);

var ERROR_MESSAGE = 'Unacceptable as raw JSON';

var isWhitespace = function (it) {
  return it === ' ' || it === '\t' || it === '\n' || it === '\r';
};

// `JSON.rawJSON` method
// https://tc39.es/proposal-json-parse-with-source/#sec-json.rawjson
// https://github.com/tc39/proposal-json-parse-with-source
$({ target: 'JSON', stat: true, forced: !NATIVE_RAW_JSON }, {
  rawJSON: function rawJSON(text) {
    var jsonString = toString(text);
    if (jsonString === '' || isWhitespace(at(jsonString, 0)) || isWhitespace(at(jsonString, jsonString.length - 1))) {
      throw new $SyntaxError(ERROR_MESSAGE);
    }
    var parsed = parse(jsonString);
    if (typeof parsed == 'object' && parsed !== null) throw new $SyntaxError(ERROR_MESSAGE);
    var obj = create(null);
    setInternalState(obj, { type: 'RawJSON' });
    createProperty(obj, 'rawJSON', jsonString);
    return FREEZING ? freeze(obj) : obj;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/freezing":1773651887225,"../internals/native-raw-json":1773651887053,"../internals/get-built-in":1773651886983,"../internals/function-uncurry-this":1773651886968,"../internals/to-string":1773651887010,"../internals/create-property":1773651887046,"../internals/internal-state":1773651887038}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887225, function(require, module, exports) {

var fails = require('../internals/fails');

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});

}, function(modId) { var map = {"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887226, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var setToStringTag = require('../internals/set-to-string-tag');

// JSON[@@toStringTag] property
// https://tc39.es/ecma262/#sec-json-@@tostringtag
setToStringTag(globalThis.JSON, 'JSON', true);

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/set-to-string-tag":1773651887036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887227, function(require, module, exports) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
require('../modules/es.map.constructor');

}, function(modId) { var map = {"../modules/es.map.constructor":1773651887228}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887228, function(require, module, exports) {

var collection = require('../internals/collection');
var collectionStrong = require('../internals/collection-strong');

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

}, function(modId) { var map = {"../internals/collection":1773651887229,"../internals/collection-strong":1773651887233}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887229, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var InternalMetadataModule = require('../internals/internal-metadata');
var fails = require('../internals/fails');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var iterate = require('../internals/iterate');
var anInstance = require('../internals/an-instance');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var setToStringTag = require('../internals/set-to-string-tag');
var defineProperty = require('../internals/object-define-property').f;
var forEach = require('../internals/array-iteration').forEach;
var DESCRIPTORS = require('../internals/descriptors');
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = globalThis[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var exported = {};
  var Constructor;

  if (!DESCRIPTORS || !isCallable(NativeConstructor)
    || !(IS_WEAK || NativePrototype.forEach && !fails(function () { new NativeConstructor().entries().next(); }))
  ) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.enable();
  } else {
    Constructor = wrapper(function (target, iterable) {
      setInternalState(anInstance(target, Prototype), {
        type: CONSTRUCTOR_NAME,
        collection: new NativeConstructor()
      });
      if (!isNullOrUndefined(iterable)) iterate(iterable, target[ADDER], { that: target, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    forEach(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
      var IS_ADDER = KEY === 'add' || KEY === 'set';
      if (KEY in NativePrototype && !(IS_WEAK && KEY === 'clear')) {
        createNonEnumerableProperty(Prototype, KEY, function (a, b) {
          var collection = getInternalState(this).collection;
          if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY === 'get' ? undefined : false;
          var result = collection[KEY](a === 0 ? 0 : a, b);
          return IS_ADDER ? this : result;
        });
      }
    });

    IS_WEAK || defineProperty(Prototype, 'size', {
      configurable: true,
      get: function () {
        return getInternalState(this).collection.size;
      }
    });
  }

  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: true }, exported);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/internal-metadata":1773651887230,"../internals/fails":1773651886965,"../internals/create-non-enumerable-property":1773651887006,"../internals/iterate":1773651887092,"../internals/an-instance":1773651887189,"../internals/is-callable":1773651886969,"../internals/is-object":1773651886981,"../internals/is-null-or-undefined":1773651886978,"../internals/set-to-string-tag":1773651887036,"../internals/object-define-property":1773651887007,"../internals/array-iteration":1773651887040,"../internals/descriptors":1773651886971,"../internals/internal-state":1773651887038}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887230, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var hiddenKeys = require('../internals/hidden-keys');
var isObject = require('../internals/is-object');
var hasOwn = require('../internals/has-own-property');
var defineProperty = require('../internals/object-define-property').f;
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertyNamesExternalModule = require('../internals/object-get-own-property-names-external');
var isExtensible = require('../internals/object-is-extensible');
var uid = require('../internals/uid');
var FREEZING = require('../internals/freezing');

var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + id++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = uncurryThis([].splice);
  var test = {};
  // eslint-disable-next-line unicorn/no-immediate-mutation -- ES3 syntax limitation
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice(result, i, 1);
          break;
        }
      } return result;
    };

    $({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = module.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/hidden-keys":1773651887023,"../internals/is-object":1773651886981,"../internals/has-own-property":1773651886999,"../internals/object-define-property":1773651887007,"../internals/object-get-own-property-names":1773651887027,"../internals/object-get-own-property-names-external":1773651887028,"../internals/object-is-extensible":1773651887231,"../internals/uid":1773651887001,"../internals/freezing":1773651887225}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887231, function(require, module, exports) {

var fails = require('../internals/fails');
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var ARRAY_BUFFER_NON_EXTENSIBLE = require('../internals/array-buffer-non-extensible');

// eslint-disable-next-line es/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
module.exports = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  if (!isObject(it)) return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return false;
  return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;

}, function(modId) { var map = {"../internals/fails":1773651886965,"../internals/is-object":1773651886981,"../internals/classof-raw":1773651886967,"../internals/array-buffer-non-extensible":1773651887232}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887232, function(require, module, exports) {

// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
var fails = require('../internals/fails');

module.exports = fails(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});

}, function(modId) { var map = {"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887233, function(require, module, exports) {

var create = require('../internals/object-create');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var defineBuiltIns = require('../internals/define-built-ins');
var bind = require('../internals/function-bind-context');
var anInstance = require('../internals/an-instance');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var iterate = require('../internals/iterate');
var defineIterator = require('../internals/iterator-define');
var createIterResultObject = require('../internals/create-iter-result-object');
var setSpecies = require('../internals/set-species');
var DESCRIPTORS = require('../internals/descriptors');
var fastKey = require('../internals/internal-metadata').fastKey;
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: null,
        last: null,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: null,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key === key) return entry;
      }
    };

    defineBuiltIns(Prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = null;
          entry = entry.next;
        }
        state.first = state.last = null;
        state.index = create(null);
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first === entry) state.first = next;
          if (state.last === entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    defineBuiltIns(Prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineBuiltInAccessor(Prototype, 'size', {
      configurable: true,
      get: function () {
        return getInternalState(this).size;
      }
    });
    return Constructor;
  },
  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: null
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = null;
        return createIterResultObject(undefined, true);
      }
      // return step by kind
      if (kind === 'keys') return createIterResultObject(entry.key, false);
      if (kind === 'values') return createIterResultObject(entry.value, false);
      return createIterResultObject([entry.key, entry.value], false);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};

}, function(modId) { var map = {"../internals/object-create":1773651887013,"../internals/define-built-in-accessor":1773651887032,"../internals/define-built-ins":1773651887190,"../internals/function-bind-context":1773651887005,"../internals/an-instance":1773651887189,"../internals/is-null-or-undefined":1773651886978,"../internals/iterate":1773651887092,"../internals/iterator-define":1773651887132,"../internals/create-iter-result-object":1773651887136,"../internals/set-species":1773651887157,"../internals/descriptors":1773651886971,"../internals/internal-metadata":1773651887230,"../internals/internal-state":1773651887038}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887234, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var requireObjectCoercible = require('../internals/require-object-coercible');
var iterate = require('../internals/iterate');
var MapHelpers = require('../internals/map-helpers');
var IS_PURE = require('../internals/is-pure');
var fails = require('../internals/fails');

var Map = MapHelpers.Map;
var has = MapHelpers.has;
var get = MapHelpers.get;
var set = MapHelpers.set;
var push = uncurryThis([].push);

// https://bugs.webkit.org/show_bug.cgi?id=271524
var DOES_NOT_WORK_WITH_PRIMITIVES = IS_PURE || fails(function () {
  return Map.groupBy('ab', function (it) {
    return it;
  }).get('a').length !== 1;
});

// `Map.groupBy` method
// https://tc39.es/ecma262/#sec-map.groupby
$({ target: 'Map', stat: true, forced: IS_PURE || DOES_NOT_WORK_WITH_PRIMITIVES }, {
  groupBy: function groupBy(items, callbackfn) {
    requireObjectCoercible(items);
    aCallable(callbackfn);
    var map = new Map();
    var k = 0;
    iterate(items, function (value) {
      var key = callbackfn(value, k++);
      if (!has(map, key)) set(map, key, [value]);
      else push(get(map, key), value);
    });
    return map;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/a-callable":1773651886991,"../internals/require-object-coercible":1773651886977,"../internals/iterate":1773651887092,"../internals/map-helpers":1773651887235,"../internals/is-pure":1773651886997,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887235, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var caller = require('../internals/caller');

var Map = getBuiltIn('Map');

module.exports = {
  Map: Map,
  set: caller('set', 2),
  get: caller('get', 1),
  has: caller('has', 1),
  remove: caller('delete', 1),
  proto: Map.prototype
};

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/caller":1773651887236}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887236, function(require, module, exports) {

module.exports = function (methodName, numArgs) {
  return numArgs === 1 ? function (object, arg) {
    return object[methodName](arg);
  } : function (object, arg1, arg2) {
    return object[methodName](arg1, arg2);
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887237, function(require, module, exports) {

var $ = require('../internals/export');
var aMap = require('../internals/a-map');
var MapHelpers = require('../internals/map-helpers');
var IS_PURE = require('../internals/is-pure');

var get = MapHelpers.get;
var has = MapHelpers.has;
var set = MapHelpers.set;

// `Map.prototype.getOrInsert` method
// https://github.com/tc39/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  getOrInsert: function getOrInsert(key, value) {
    if (has(aMap(this), key)) return get(this, key);
    set(this, key, value);
    return value;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-map":1773651887238,"../internals/map-helpers":1773651887235,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887238, function(require, module, exports) {

var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

// Perform ? RequireInternalSlot(M, [[MapData]])
module.exports = function (it) {
  if (typeof it == 'object' && 'size' in it && 'has' in it && 'get' in it && 'set' in it && 'delete' in it && 'entries' in it) return it;
  throw new $TypeError(tryToString(it) + ' is not a map');
};

}, function(modId) { var map = {"../internals/try-to-string":1773651886992}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887239, function(require, module, exports) {

var $ = require('../internals/export');
var aCallable = require('../internals/a-callable');
var aMap = require('../internals/a-map');
var MapHelpers = require('../internals/map-helpers');
var IS_PURE = require('../internals/is-pure');

var get = MapHelpers.get;
var has = MapHelpers.has;
var set = MapHelpers.set;

// `Map.prototype.getOrInsertComputed` method
// https://github.com/tc39/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: IS_PURE }, {
  getOrInsertComputed: function getOrInsertComputed(key, callbackfn) {
    aMap(this);
    aCallable(callbackfn);
    if (has(this, key)) return get(this, key);
    // CanonicalizeKeyedCollectionKey
    if (key === 0 && 1 / key === -Infinity) key = 0;
    var value = callbackfn(key);
    set(this, key, value);
    return value;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-callable":1773651886991,"../internals/a-map":1773651887238,"../internals/map-helpers":1773651887235,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887240, function(require, module, exports) {

var $ = require('../internals/export');
var log1p = require('../internals/math-log1p');

// eslint-disable-next-line es/no-math-acosh -- required for testing
var $acosh = Math.acosh;
var log = Math.log;
var sqrt = Math.sqrt;
var LN2 = Math.LN2;

var FORCED = !$acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  || Math.floor($acosh(Number.MAX_VALUE)) !== 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  || $acosh(Infinity) !== Infinity;

// `Math.acosh` method
// https://tc39.es/ecma262/#sec-math.acosh
$({ target: 'Math', stat: true, forced: FORCED }, {
  acosh: function acosh(x) {
    var n = +x;
    return n < 1 ? NaN : n > 94906265.62425156
      ? log(n) + LN2
      : log1p(n - 1 + sqrt(n - 1) * sqrt(n + 1));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-log1p":1773651887241}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887241, function(require, module, exports) {

var log = Math.log;

// `Math.log1p` method implementation
// https://tc39.es/ecma262/#sec-math.log1p
// eslint-disable-next-line es/no-math-log1p -- safe
module.exports = Math.log1p || function log1p(x) {
  var n = +x;
  return n > -1e-8 && n < 1e-8 ? n - n * n / 2 : log(1 + n);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887242, function(require, module, exports) {

var $ = require('../internals/export');

// eslint-disable-next-line es/no-math-asinh -- required for testing
var $asinh = Math.asinh;
var log = Math.log;
var sqrt = Math.sqrt;

function asinh(x) {
  var n = +x;
  return !isFinite(n) || n === 0 ? n : n < 0 ? -asinh(-n) : log(n + sqrt(n * n + 1));
}

var FORCED = !($asinh && 1 / $asinh(0) > 0);

// `Math.asinh` method
// https://tc39.es/ecma262/#sec-math.asinh
// Tor Browser bug: Math.asinh(0) -> -0
$({ target: 'Math', stat: true, forced: FORCED }, {
  asinh: asinh
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887243, function(require, module, exports) {

var $ = require('../internals/export');

// eslint-disable-next-line es/no-math-atanh -- required for testing
var $atanh = Math.atanh;
var log = Math.log;

var FORCED = !($atanh && 1 / $atanh(-0) < 0);

// `Math.atanh` method
// https://tc39.es/ecma262/#sec-math.atanh
// Tor Browser bug: Math.atanh(-0) -> 0
$({ target: 'Math', stat: true, forced: FORCED }, {
  atanh: function atanh(x) {
    var n = +x;
    return n === 0 ? n : log((1 + n) / (1 - n)) / 2;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887244, function(require, module, exports) {

var $ = require('../internals/export');
var sign = require('../internals/math-sign');

var abs = Math.abs;
var pow = Math.pow;

// `Math.cbrt` method
// https://tc39.es/ecma262/#sec-math.cbrt
$({ target: 'Math', stat: true }, {
  cbrt: function cbrt(x) {
    var n = +x;
    return sign(n) * pow(abs(n), 1 / 3);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-sign":1773651887245}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887245, function(require, module, exports) {

// `Math.sign` method implementation
// https://tc39.es/ecma262/#sec-math.sign
// eslint-disable-next-line es/no-math-sign -- safe
module.exports = Math.sign || function sign(x) {
  var n = +x;
  // eslint-disable-next-line no-self-compare -- NaN check
  return n === 0 || n !== n ? n : n < 0 ? -1 : 1;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887246, function(require, module, exports) {

var $ = require('../internals/export');

var floor = Math.floor;
var log = Math.log;
var LOG2E = Math.LOG2E;

// `Math.clz32` method
// https://tc39.es/ecma262/#sec-math.clz32
$({ target: 'Math', stat: true }, {
  clz32: function clz32(x) {
    var n = x >>> 0;
    return n ? 31 - floor(log(n + 0.5) * LOG2E) : 32;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887247, function(require, module, exports) {

var $ = require('../internals/export');
var expm1 = require('../internals/math-expm1');

// eslint-disable-next-line es/no-math-cosh -- required for testing
var $cosh = Math.cosh;
var abs = Math.abs;
var E = Math.E;

var FORCED = !$cosh || $cosh(710) === Infinity;

// `Math.cosh` method
// https://tc39.es/ecma262/#sec-math.cosh
$({ target: 'Math', stat: true, forced: FORCED }, {
  cosh: function cosh(x) {
    var t = expm1(abs(x) - 1) + 1;
    return (t + 1 / (t * E * E)) * (E / 2);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-expm1":1773651887248}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887248, function(require, module, exports) {

// eslint-disable-next-line es/no-math-expm1 -- safe
var $expm1 = Math.expm1;
var exp = Math.exp;

// `Math.expm1` method implementation
// https://tc39.es/ecma262/#sec-math.expm1
module.exports = (!$expm1
  // Old FF bug
  // eslint-disable-next-line no-loss-of-precision -- required for old engines
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) !== -2e-17
) ? function expm1(x) {
  var n = +x;
  return n === 0 ? n : n > -1e-6 && n < 1e-6 ? n + n * n / 2 : exp(n) - 1;
} : $expm1;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887249, function(require, module, exports) {

var $ = require('../internals/export');
var expm1 = require('../internals/math-expm1');

// `Math.expm1` method
// https://tc39.es/ecma262/#sec-math.expm1
// eslint-disable-next-line es/no-math-expm1 -- required for testing
$({ target: 'Math', stat: true, forced: expm1 !== Math.expm1 }, { expm1: expm1 });

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-expm1":1773651887248}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887250, function(require, module, exports) {

var $ = require('../internals/export');
var fround = require('../internals/math-fround');

// `Math.fround` method
// https://tc39.es/ecma262/#sec-math.fround
$({ target: 'Math', stat: true }, { fround: fround });

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-fround":1773651887251}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887251, function(require, module, exports) {

var floatRound = require('../internals/math-float-round');

var FLOAT32_EPSILON = 1.1920928955078125e-7; // 2 ** -23;
var FLOAT32_MAX_VALUE = 3.4028234663852886e+38; // 2 ** 128 - 2 ** 104
var FLOAT32_MIN_VALUE = 1.1754943508222875e-38; // 2 ** -126;

// `Math.fround` method implementation
// https://tc39.es/ecma262/#sec-math.fround
// eslint-disable-next-line es/no-math-fround -- safe
module.exports = Math.fround || function fround(x) {
  return floatRound(x, FLOAT32_EPSILON, FLOAT32_MAX_VALUE, FLOAT32_MIN_VALUE);
};

}, function(modId) { var map = {"../internals/math-float-round":1773651887252}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887252, function(require, module, exports) {

var sign = require('../internals/math-sign');
var roundTiesToEven = require('../internals/math-round-ties-to-even');

var abs = Math.abs;

var EPSILON = 2.220446049250313e-16; // Number.EPSILON

module.exports = function (x, FLOAT_EPSILON, FLOAT_MAX_VALUE, FLOAT_MIN_VALUE) {
  var n = +x;
  var absolute = abs(n);
  var s = sign(n);
  if (absolute < FLOAT_MIN_VALUE) return s * roundTiesToEven(absolute / FLOAT_MIN_VALUE / FLOAT_EPSILON) * FLOAT_MIN_VALUE * FLOAT_EPSILON;
  var a = (1 + FLOAT_EPSILON / EPSILON) * absolute;
  var result = a - (a - absolute);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (result > FLOAT_MAX_VALUE || result !== result) return s * Infinity;
  return s * result;
};

}, function(modId) { var map = {"../internals/math-sign":1773651887245,"../internals/math-round-ties-to-even":1773651887253}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887253, function(require, module, exports) {

var EPSILON = 2.220446049250313e-16; // Number.EPSILON
var INVERSE_EPSILON = 1 / EPSILON;

module.exports = function (n) {
  return n + INVERSE_EPSILON - INVERSE_EPSILON;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887254, function(require, module, exports) {

var $ = require('../internals/export');
var floatRound = require('../internals/math-float-round');

var FLOAT16_EPSILON = 0.0009765625;
var FLOAT16_MAX_VALUE = 65504;
var FLOAT16_MIN_VALUE = 6.103515625e-05;

// `Math.f16round` method
// https://tc39.es/ecma262/#sec-math.f16round
$({ target: 'Math', stat: true }, {
  f16round: function f16round(x) {
    return floatRound(x, FLOAT16_EPSILON, FLOAT16_MAX_VALUE, FLOAT16_MIN_VALUE);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-float-round":1773651887252}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887255, function(require, module, exports) {

var $ = require('../internals/export');

// eslint-disable-next-line es/no-math-hypot -- required for testing
var $hypot = Math.hypot;
var abs = Math.abs;
var sqrt = Math.sqrt;

// Chrome 77 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=9546
var FORCED = !!$hypot && $hypot(Infinity, NaN) !== Infinity;

// `Math.hypot` method
// https://tc39.es/ecma262/#sec-math.hypot
$({ target: 'Math', stat: true, arity: 2, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  hypot: function hypot(value1, value2) {
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * sqrt(sum);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887256, function(require, module, exports) {

var $ = require('../internals/export');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-math-imul -- required for testing
var $imul = Math.imul;

var FORCED = fails(function () {
  return $imul(0xFFFFFFFF, 5) !== -5 || $imul.length !== 2;
});

// `Math.imul` method
// https://tc39.es/ecma262/#sec-math.imul
// some WebKit versions fails with big numbers, some has wrong arity
$({ target: 'Math', stat: true, forced: FORCED }, {
  imul: function imul(x, y) {
    var UINT16 = 0xFFFF;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887257, function(require, module, exports) {

var $ = require('../internals/export');
var log10 = require('../internals/math-log10');

// `Math.log10` method
// https://tc39.es/ecma262/#sec-math.log10
$({ target: 'Math', stat: true }, {
  log10: log10
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-log10":1773651887258}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887258, function(require, module, exports) {

var log = Math.log;
var LOG10E = Math.LOG10E;

// eslint-disable-next-line es/no-math-log10 -- safe
module.exports = Math.log10 || function log10(x) {
  return log(x) * LOG10E;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887259, function(require, module, exports) {

var $ = require('../internals/export');
var log1p = require('../internals/math-log1p');

// `Math.log1p` method
// https://tc39.es/ecma262/#sec-math.log1p
$({ target: 'Math', stat: true }, { log1p: log1p });

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-log1p":1773651887241}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887260, function(require, module, exports) {

var $ = require('../internals/export');
var log2 = require('../internals/math-log2');

// `Math.log2` method
// https://tc39.es/ecma262/#sec-math.log2
$({ target: 'Math', stat: true }, {
  log2: log2
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-log2":1773651887261}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887261, function(require, module, exports) {

var log = Math.log;
var LN2 = Math.LN2;

// `Math.log2` method
// https://tc39.es/ecma262/#sec-math.log2
// eslint-disable-next-line es/no-math-log2 -- safe
module.exports = Math.log2 || function log2(x) {
  return log(x) / LN2;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887262, function(require, module, exports) {

var $ = require('../internals/export');
var sign = require('../internals/math-sign');

// `Math.sign` method
// https://tc39.es/ecma262/#sec-math.sign
$({ target: 'Math', stat: true }, {
  sign: sign
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-sign":1773651887245}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887263, function(require, module, exports) {

var $ = require('../internals/export');
var fails = require('../internals/fails');
var expm1 = require('../internals/math-expm1');

var abs = Math.abs;
var exp = Math.exp;
var E = Math.E;

var FORCED = fails(function () {
  // eslint-disable-next-line es/no-math-sinh -- required for testing
  return Math.sinh(-2e-17) !== -2e-17;
});

// `Math.sinh` method
// https://tc39.es/ecma262/#sec-math.sinh
// V8 near Chromium 38 has a problem with very small numbers
$({ target: 'Math', stat: true, forced: FORCED }, {
  sinh: function sinh(x) {
    var n = +x;
    return abs(n) < 1 ? (expm1(n) - expm1(-n)) / 2 : (exp(n - 1) - exp(-n - 1)) * (E / 2);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/fails":1773651886965,"../internals/math-expm1":1773651887248}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887264, function(require, module, exports) {

// based on Shewchuk's algorithm for exactly floating point addition
// adapted from https://github.com/tc39/proposal-math-sum/blob/3513d58323a1ae25560e8700aa5294500c6c9287/polyfill/polyfill.mjs
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var iterate = require('../internals/iterate');

var $RangeError = RangeError;
var $TypeError = TypeError;
var $Infinity = Infinity;
var $NaN = NaN;
var abs = Math.abs;
var pow = Math.pow;
var push = uncurryThis([].push);

var POW_2_1023 = pow(2, 1023);
var MAX_SAFE_INTEGER = pow(2, 53) - 1; // 2 ** 53 - 1 === 9007199254740992
var MAX_DOUBLE = Number.MAX_VALUE; // 2 ** 1024 - 2 ** (1023 - 52) === 1.79769313486231570815e+308
var MAX_ULP = pow(2, 971); // 2 ** (1023 - 52) === 1.99584030953471981166e+292

var NOT_A_NUMBER = {};
var MINUS_INFINITY = {};
var PLUS_INFINITY = {};
var MINUS_ZERO = {};
var FINITE = {};

// prerequisite: abs(x) >= abs(y)
var twosum = function (x, y) {
  var hi = x + y;
  var lo = y - (hi - x);
  return { hi: hi, lo: lo };
};

// `Math.sumPrecise` method
// https://github.com/tc39/proposal-math-sum
$({ target: 'Math', stat: true }, {
  // eslint-disable-next-line max-statements -- ok
  sumPrecise: function sumPrecise(items) {
    var numbers = [];
    var count = 0;
    var state = MINUS_ZERO;

    iterate(items, function (n) {
      if (++count >= MAX_SAFE_INTEGER) throw new $RangeError('Maximum allowed index exceeded');
      if (typeof n != 'number') throw new $TypeError('Value is not a number');
      if (state !== NOT_A_NUMBER) {
        // eslint-disable-next-line no-self-compare -- NaN check
        if (n !== n) state = NOT_A_NUMBER;
        else if (n === $Infinity) state = state === MINUS_INFINITY ? NOT_A_NUMBER : PLUS_INFINITY;
        else if (n === -$Infinity) state = state === PLUS_INFINITY ? NOT_A_NUMBER : MINUS_INFINITY;
        else if ((n !== 0 || (1 / n) === $Infinity) && (state === MINUS_ZERO || state === FINITE)) {
          state = FINITE;
          push(numbers, n);
        }
      }
    });

    switch (state) {
      case NOT_A_NUMBER: return $NaN;
      case MINUS_INFINITY: return -$Infinity;
      case PLUS_INFINITY: return $Infinity;
      case MINUS_ZERO: return -0;
    }

    var partials = [];
    var overflow = 0; // conceptually 2 ** 1024 times this value; the final partial is biased by this amount
    var x, y, sum, hi, lo, tmp;

    for (var i = 0; i < numbers.length; i++) {
      x = numbers[i];
      var actuallyUsedPartials = 0;
      for (var j = 0; j < partials.length; j++) {
        y = partials[j];
        if (abs(x) < abs(y)) {
          tmp = x;
          x = y;
          y = tmp;
        }
        sum = twosum(x, y);
        hi = sum.hi;
        lo = sum.lo;
        if (abs(hi) === $Infinity) {
          var sign = hi === $Infinity ? 1 : -1;
          overflow += sign;

          x = (x - (sign * POW_2_1023)) - (sign * POW_2_1023);
          if (abs(x) < abs(y)) {
            tmp = x;
            x = y;
            y = tmp;
          }
          sum = twosum(x, y);
          hi = sum.hi;
          lo = sum.lo;
        }
        if (lo !== 0) partials[actuallyUsedPartials++] = lo;
        x = hi;
      }
      partials.length = actuallyUsedPartials;
      if (x !== 0) push(partials, x);
    }

    // compute the exact sum of partials, stopping once we lose precision
    var n = partials.length - 1;
    hi = 0;
    lo = 0;

    if (overflow !== 0) {
      var next = n >= 0 ? partials[n] : 0;
      n--;
      if (abs(overflow) > 1 || (overflow > 0 && next > 0) || (overflow < 0 && next < 0)) {
        return overflow > 0 ? $Infinity : -$Infinity;
      }
      // here we actually have to do the arithmetic
      // drop a factor of 2 so we can do it without overflow
      // assert(abs(overflow) === 1)
      sum = twosum(overflow * POW_2_1023, next / 2);
      hi = sum.hi;
      lo = sum.lo;
      lo *= 2;
      if (abs(2 * hi) === $Infinity) {
        // rounding to the maximum value
        if (hi > 0) {
          return (hi === POW_2_1023 && lo === -(MAX_ULP / 2) && n >= 0 && partials[n] < 0) ? MAX_DOUBLE : $Infinity;
        } return (hi === -POW_2_1023 && lo === (MAX_ULP / 2) && n >= 0 && partials[n] > 0) ? -MAX_DOUBLE : -$Infinity;
      }

      if (lo !== 0) {
        partials[++n] = lo;
        lo = 0;
      }

      hi *= 2;
    }

    while (n >= 0) {
      sum = twosum(hi, partials[n--]);
      hi = sum.hi;
      lo = sum.lo;
      if (lo !== 0) break;
    }

    if (n >= 0 && ((lo < 0 && partials[n] < 0) || (lo > 0 && partials[n] > 0))) {
      y = lo * 2;
      x = hi + y;
      if (y === x - hi) hi = x;
    }

    return hi;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/iterate":1773651887092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887265, function(require, module, exports) {

var $ = require('../internals/export');
var expm1 = require('../internals/math-expm1');

var exp = Math.exp;

// `Math.tanh` method
// https://tc39.es/ecma262/#sec-math.tanh
$({ target: 'Math', stat: true }, {
  tanh: function tanh(x) {
    var n = +x;
    var a = expm1(n);
    var b = expm1(-n);
    return a === Infinity ? 1 : b === Infinity ? -1 : (a - b) / (exp(n) + exp(-n));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-expm1":1773651887248}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887266, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887267, function(require, module, exports) {

var $ = require('../internals/export');
var trunc = require('../internals/math-trunc');

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
$({ target: 'Math', stat: true }, {
  trunc: trunc
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-trunc":1773651887020}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887268, function(require, module, exports) {

var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var DESCRIPTORS = require('../internals/descriptors');
var globalThis = require('../internals/global-this');
var path = require('../internals/path');
var uncurryThis = require('../internals/function-uncurry-this');
var isForced = require('../internals/is-forced');
var hasOwn = require('../internals/has-own-property');
var inheritIfRequired = require('../internals/inherit-if-required');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var isSymbol = require('../internals/is-symbol');
var toPrimitive = require('../internals/to-primitive');
var fails = require('../internals/fails');
var getOwnPropertyNames = require('../internals/object-get-own-property-names').f;
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var defineProperty = require('../internals/object-define-property').f;
var thisNumberValue = require('../internals/this-number-value');
var trim = require('../internals/string-trim').trim;

var NUMBER = 'Number';
var NativeNumber = globalThis[NUMBER];
var PureNumberNamespace = path[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = globalThis.TypeError;
var stringSlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw new TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        // fast equal of /^0b[01]+$/i
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal of /^0o[0-7]+$/i
        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        default:
          return +it;
      }
      digits = stringSlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

var FORCED = isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'));

var calledWithNew = function (dummy) {
  // includes check on 1..constructor(foo) case
  return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); });
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
var NumberWrapper = function Number(value) {
  var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
  return calledWithNew(this) ? inheritIfRequired(Object(n), this, NumberWrapper) : n;
};

NumberWrapper.prototype = NumberPrototype;
if (FORCED && !IS_PURE) NumberPrototype.constructor = NumberWrapper;

$({ global: true, constructor: true, wrap: true, forced: FORCED }, {
  Number: NumberWrapper
});

// Use `internal/copy-constructor-properties` helper in `core-js@4`
var copyConstructorProperties = function (target, source) {
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(source) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(source, key = keys[j]) && !hasOwn(target, key)) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

if (IS_PURE && PureNumberNamespace) copyConstructorProperties(path[NUMBER], PureNumberNamespace);
if (FORCED || IS_PURE) copyConstructorProperties(path[NUMBER], NativeNumber);

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/is-pure":1773651886997,"../internals/descriptors":1773651886971,"../internals/global-this":1773651886962,"../internals/path":1773651886984,"../internals/function-uncurry-this":1773651886968,"../internals/is-forced":1773651887004,"../internals/has-own-property":1773651886999,"../internals/inherit-if-required":1773651887080,"../internals/object-is-prototype-of":1773651886985,"../internals/is-symbol":1773651886982,"../internals/to-primitive":1773651886980,"../internals/fails":1773651886965,"../internals/object-get-own-property-names":1773651887027,"../internals/object-get-own-property-descriptor":1773651886970,"../internals/object-define-property":1773651887007,"../internals/this-number-value":1773651887269,"../internals/string-trim":1773651887270}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887269, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.1.valueOf);

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887270, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');
var whitespaces = require('../internals/whitespaces');

var replace = uncurryThis(''.replace);
var ltrim = RegExp('^[' + whitespaces + ']+');
var rtrim = RegExp('(^|[^' + whitespaces + '])[' + whitespaces + ']+$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '$1');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/require-object-coercible":1773651886977,"../internals/to-string":1773651887010,"../internals/whitespaces":1773651887271}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887271, function(require, module, exports) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887272, function(require, module, exports) {

var $ = require('../internals/export');

// `Number.EPSILON` constant
// https://tc39.es/ecma262/#sec-number.epsilon
$({ target: 'Number', stat: true, nonConfigurable: true, nonWritable: true }, {
  EPSILON: Math.pow(2, -52)
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887273, function(require, module, exports) {

var $ = require('../internals/export');
var numberIsFinite = require('../internals/number-is-finite');

// `Number.isFinite` method
// https://tc39.es/ecma262/#sec-number.isfinite
$({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/number-is-finite":1773651887274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887274, function(require, module, exports) {

var globalThis = require('../internals/global-this');

var globalIsFinite = globalThis.isFinite;

// `Number.isFinite` method
// https://tc39.es/ecma262/#sec-number.isfinite
// eslint-disable-next-line es/no-number-isfinite -- safe
module.exports = Number.isFinite || function isFinite(it) {
  return typeof it == 'number' && globalIsFinite(it);
};

}, function(modId) { var map = {"../internals/global-this":1773651886962}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887275, function(require, module, exports) {

var $ = require('../internals/export');
var isIntegralNumber = require('../internals/is-integral-number');

// `Number.isInteger` method
// https://tc39.es/ecma262/#sec-number.isinteger
$({ target: 'Number', stat: true }, {
  isInteger: isIntegralNumber
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/is-integral-number":1773651887276}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887276, function(require, module, exports) {

var isObject = require('../internals/is-object');

var floor = Math.floor;

// `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es/no-number-isinteger -- safe
module.exports = Number.isInteger || function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

}, function(modId) { var map = {"../internals/is-object":1773651886981}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887277, function(require, module, exports) {

var $ = require('../internals/export');

// `Number.isNaN` method
// https://tc39.es/ecma262/#sec-number.isnan
$({ target: 'Number', stat: true }, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887278, function(require, module, exports) {

var $ = require('../internals/export');
var isIntegralNumber = require('../internals/is-integral-number');

var abs = Math.abs;

// `Number.isSafeInteger` method
// https://tc39.es/ecma262/#sec-number.issafeinteger
$({ target: 'Number', stat: true }, {
  isSafeInteger: function isSafeInteger(number) {
    return isIntegralNumber(number) && abs(number) <= 0x1FFFFFFFFFFFFF;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/is-integral-number":1773651887276}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887279, function(require, module, exports) {

var $ = require('../internals/export');

// `Number.MAX_SAFE_INTEGER` constant
// https://tc39.es/ecma262/#sec-number.max_safe_integer
$({ target: 'Number', stat: true, nonConfigurable: true, nonWritable: true }, {
  MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887280, function(require, module, exports) {

var $ = require('../internals/export');

// `Number.MIN_SAFE_INTEGER` constant
// https://tc39.es/ecma262/#sec-number.min_safe_integer
$({ target: 'Number', stat: true, nonConfigurable: true, nonWritable: true }, {
  MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887281, function(require, module, exports) {

var $ = require('../internals/export');
var parseFloat = require('../internals/number-parse-float');

// `Number.parseFloat` method
// https://tc39.es/ecma262/#sec-number.parseFloat
// eslint-disable-next-line es/no-number-parsefloat -- required for testing
$({ target: 'Number', stat: true, forced: Number.parseFloat !== parseFloat }, {
  parseFloat: parseFloat
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/number-parse-float":1773651887282}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887282, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var fails = require('../internals/fails');
var uncurryThis = require('../internals/function-uncurry-this');
var toString = require('../internals/to-string');
var trim = require('../internals/string-trim').trim;
var whitespaces = require('../internals/whitespaces');

var charAt = uncurryThis(''.charAt);
var $parseFloat = globalThis.parseFloat;
var Symbol = globalThis.Symbol;
var ITERATOR = Symbol && Symbol.iterator;
var FORCED = 1 / $parseFloat(whitespaces + '-0') !== -Infinity
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR && !fails(function () { $parseFloat(Object(ITERATOR)); }));

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(toString(string));
  var result = $parseFloat(trimmedString);
  return result === 0 && charAt(trimmedString, 0) === '-' ? -0 : result;
} : $parseFloat;

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/fails":1773651886965,"../internals/function-uncurry-this":1773651886968,"../internals/to-string":1773651887010,"../internals/string-trim":1773651887270,"../internals/whitespaces":1773651887271}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887283, function(require, module, exports) {

var $ = require('../internals/export');
var parseInt = require('../internals/number-parse-int');

// `Number.parseInt` method
// https://tc39.es/ecma262/#sec-number.parseint
// eslint-disable-next-line es/no-number-parseint -- required for testing
$({ target: 'Number', stat: true, forced: Number.parseInt !== parseInt }, {
  parseInt: parseInt
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/number-parse-int":1773651887284}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887284, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var fails = require('../internals/fails');
var uncurryThis = require('../internals/function-uncurry-this');
var toString = require('../internals/to-string');
var trim = require('../internals/string-trim').trim;
var whitespaces = require('../internals/whitespaces');

var $parseInt = globalThis.parseInt;
var Symbol = globalThis.Symbol;
var ITERATOR = Symbol && Symbol.iterator;
var hex = /^[+-]?0x/i;
var exec = uncurryThis(hex.exec);
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR && !fails(function () { $parseInt(Object(ITERATOR)); }));

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(toString(string));
  return $parseInt(S, (radix >>> 0) || (exec(hex, S) ? 16 : 10));
} : $parseInt;

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/fails":1773651886965,"../internals/function-uncurry-this":1773651886968,"../internals/to-string":1773651887010,"../internals/string-trim":1773651887270,"../internals/whitespaces":1773651887271}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887285, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var thisNumberValue = require('../internals/this-number-value');
var $repeat = require('../internals/string-repeat');
var log10 = require('../internals/math-log10');
var fails = require('../internals/fails');

var $RangeError = RangeError;
var $String = String;
var $isFinite = isFinite;
var abs = Math.abs;
var floor = Math.floor;
var pow = Math.pow;
var round = Math.round;
var nativeToExponential = uncurryThis(1.1.toExponential);
var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);

// Edge 17-
var ROUNDS_PROPERLY = nativeToExponential(-6.9e-11, 4) === '-6.9000e-11'
  // IE11- && Edge 14-
  && nativeToExponential(1.255, 2) === '1.25e+0'
  // FF86-, V8 ~ Chrome 49-50
  && nativeToExponential(12345, 3) === '1.235e+4'
  // FF86-, V8 ~ Chrome 49-50
  && nativeToExponential(25, 0) === '3e+1';

// IE8-
var throwsOnInfinityFraction = function () {
  return fails(function () {
    nativeToExponential(1, Infinity);
  }) && fails(function () {
    nativeToExponential(1, -Infinity);
  });
};

// Safari <11 && FF <50
var properNonFiniteThisCheck = function () {
  return !fails(function () {
    nativeToExponential(Infinity, Infinity);
    nativeToExponential(NaN, Infinity);
  });
};

var FORCED = !ROUNDS_PROPERLY || !throwsOnInfinityFraction() || !properNonFiniteThisCheck();

// `Number.prototype.toExponential` method
// https://tc39.es/ecma262/#sec-number.prototype.toexponential
$({ target: 'Number', proto: true, forced: FORCED }, {
  toExponential: function toExponential(fractionDigits) {
    var x = thisNumberValue(this);
    if (fractionDigits === undefined) return nativeToExponential(x);
    var f = toIntegerOrInfinity(fractionDigits);
    if (!$isFinite(x)) return String(x);
    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
    if (f < 0 || f > 20) throw new $RangeError('Incorrect fraction digits');
    if (ROUNDS_PROPERLY) return nativeToExponential(x, f);
    var s = '';
    var m, e, c, d;
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x === 0) {
      e = 0;
      m = repeat('0', f + 1);
    } else {
      // this block is based on https://gist.github.com/SheetJSDev/1100ad56b9f856c95299ed0e068eea08
      // TODO: improve accuracy with big fraction digits
      var l = log10(x);
      e = floor(l);
      var w = pow(10, e - f);
      var n = round(x / w);
      if (2 * x >= (2 * n + 1) * w) {
        n += 1;
      }
      if (n >= pow(10, f + 1)) {
        n /= 10;
        e += 1;
      }
      m = $String(n);
    }
    if (f !== 0) {
      m = stringSlice(m, 0, 1) + '.' + stringSlice(m, 1);
    }
    if (e === 0) {
      c = '+';
      d = '0';
    } else {
      c = e > 0 ? '+' : '-';
      d = $String(abs(e));
    }
    m += 'e' + c + d;
    return s + m;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/to-integer-or-infinity":1773651887019,"../internals/this-number-value":1773651887269,"../internals/string-repeat":1773651887184,"../internals/math-log10":1773651887258,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887286, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var thisNumberValue = require('../internals/this-number-value');
var $repeat = require('../internals/string-repeat');
var fails = require('../internals/fails');

var $RangeError = RangeError;
var $String = String;
var floor = Math.floor;
var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var nativeToFixed = uncurryThis(1.1.toFixed);

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = $String(data[index]);
      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED = fails(function () {
  return nativeToFixed(0.00008, 3) !== '0.000' ||
    nativeToFixed(0.9, 0) !== '1' ||
    nativeToFixed(1.255, 2) !== '1.25' ||
    nativeToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToFixed({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toIntegerOrInfinity(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
    if (fractDigits < 0 || fractDigits > 20) throw new $RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number !== number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return $String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat('0', fractDigits - k) + result
        : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/to-integer-or-infinity":1773651887019,"../internals/this-number-value":1773651887269,"../internals/string-repeat":1773651887184,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887287, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var thisNumberValue = require('../internals/this-number-value');

var nativeToPrecision = uncurryThis(1.1.toPrecision);

var FORCED = fails(function () {
  // IE7-
  return nativeToPrecision(1, undefined) !== '1';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToPrecision({});
});

// `Number.prototype.toPrecision` method
// https://tc39.es/ecma262/#sec-number.prototype.toprecision
$({ target: 'Number', proto: true, forced: FORCED }, {
  toPrecision: function toPrecision(precision) {
    return precision === undefined
      ? nativeToPrecision(thisNumberValue(this))
      : nativeToPrecision(thisNumberValue(this), precision);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/fails":1773651886965,"../internals/this-number-value":1773651887269}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887288, function(require, module, exports) {

var $ = require('../internals/export');
var assign = require('../internals/object-assign');

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
  assign: assign
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/object-assign":1773651887289}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887289, function(require, module, exports) {

var DESCRIPTORS = require('../internals/descriptors');
var uncurryThis = require('../internals/function-uncurry-this');
var call = require('../internals/function-call');
var fails = require('../internals/fails');
var objectKeys = require('../internals/object-keys');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol('assign detection');
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

}, function(modId) { var map = {"../internals/descriptors":1773651886971,"../internals/function-uncurry-this":1773651886968,"../internals/function-call":1773651886972,"../internals/fails":1773651886965,"../internals/object-keys":1773651887015,"../internals/object-get-own-property-symbols":1773651887030,"../internals/object-property-is-enumerable":1773651886973,"../internals/to-object":1773651887000,"../internals/indexed-object":1773651886976}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887290, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var create = require('../internals/object-create');

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/object-create":1773651887013}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887291, function(require, module, exports) {

var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/object-prototype-accessors-forced');
var aCallable = require('../internals/a-callable');
var toObject = require('../internals/to-object');
var definePropertyModule = require('../internals/object-define-property');

// `Object.prototype.__defineGetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__defineGetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __defineGetter__: function __defineGetter__(P, getter) {
      definePropertyModule.f(toObject(this), P, { get: aCallable(getter), enumerable: true, configurable: true });
    }
  });
}

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/object-prototype-accessors-forced":1773651887292,"../internals/a-callable":1773651886991,"../internals/to-object":1773651887000,"../internals/object-define-property":1773651887007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887292, function(require, module, exports) {

/* eslint-disable no-undef, no-useless-call, sonarjs/no-reference-error -- required for testing */
/* eslint-disable es/no-legacy-object-prototype-accessor-methods -- required for testing */
var IS_PURE = require('../internals/is-pure');
var globalThis = require('../internals/global-this');
var fails = require('../internals/fails');
var WEBKIT = require('../internals/environment-webkit-version');

// Forced replacement object prototype accessors methods
module.exports = IS_PURE || !fails(function () {
  // This feature detection crashes old WebKit
  // https://github.com/zloirock/core-js/issues/232
  if (WEBKIT && WEBKIT < 535) return;
  var key = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, key, function () { /* empty */ });
  delete globalThis[key];
});

}, function(modId) { var map = {"../internals/is-pure":1773651886997,"../internals/global-this":1773651886962,"../internals/fails":1773651886965,"../internals/environment-webkit-version":1773651887155}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887293, function(require, module, exports) {

var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var defineProperties = require('../internals/object-define-properties').f;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
$({ target: 'Object', stat: true, forced: Object.defineProperties !== defineProperties, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/object-define-properties":1773651887014}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887294, function(require, module, exports) {

var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var defineProperty = require('../internals/object-define-property').f;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
// eslint-disable-next-line es/no-object-defineproperty -- safe
$({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty, sham: !DESCRIPTORS }, {
  defineProperty: defineProperty
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/object-define-property":1773651887007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887295, function(require, module, exports) {

var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/object-prototype-accessors-forced');
var aCallable = require('../internals/a-callable');
var toObject = require('../internals/to-object');
var definePropertyModule = require('../internals/object-define-property');

// `Object.prototype.__defineSetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__defineSetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __defineSetter__: function __defineSetter__(P, setter) {
      definePropertyModule.f(toObject(this), P, { set: aCallable(setter), enumerable: true, configurable: true });
    }
  });
}

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/object-prototype-accessors-forced":1773651887292,"../internals/a-callable":1773651886991,"../internals/to-object":1773651887000,"../internals/object-define-property":1773651887007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887296, function(require, module, exports) {

var $ = require('../internals/export');
var $entries = require('../internals/object-to-array').entries;

// `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/object-to-array":1773651887297}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887297, function(require, module, exports) {

var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var uncurryThis = require('../internals/function-uncurry-this');
var objectGetPrototypeOf = require('../internals/object-get-prototype-of');
var objectKeys = require('../internals/object-keys');
var toIndexedObject = require('../internals/to-indexed-object');
var $propertyIsEnumerable = require('../internals/object-property-is-enumerable').f;

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push);

// in some IE versions, `propertyIsEnumerable` returns incorrect result on integer keys
// of `null` prototype objects
var IE_BUG = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-create -- safe
  var O = Object.create(null);
  O[2] = 2;
  return !propertyIsEnumerable(O, 2);
});

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf(O) === null;
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || (IE_WORKAROUND ? key in O : propertyIsEnumerable(O, key))) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};

}, function(modId) { var map = {"../internals/descriptors":1773651886971,"../internals/fails":1773651886965,"../internals/function-uncurry-this":1773651886968,"../internals/object-get-prototype-of":1773651887090,"../internals/object-keys":1773651887015,"../internals/to-indexed-object":1773651886975,"../internals/object-property-is-enumerable":1773651886973}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887298, function(require, module, exports) {

var $ = require('../internals/export');
var FREEZING = require('../internals/freezing');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');
var onFreeze = require('../internals/internal-metadata').onFreeze;

// eslint-disable-next-line es/no-object-freeze -- safe
var $freeze = Object.freeze;
var FAILS_ON_PRIMITIVES = fails(function () { $freeze(1); });

// `Object.freeze` method
// https://tc39.es/ecma262/#sec-object.freeze
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  freeze: function freeze(it) {
    return $freeze && isObject(it) ? $freeze(onFreeze(it)) : it;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/freezing":1773651887225,"../internals/fails":1773651886965,"../internals/is-object":1773651886981,"../internals/internal-metadata":1773651887230}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887299, function(require, module, exports) {

var $ = require('../internals/export');
var iterate = require('../internals/iterate');
var createProperty = require('../internals/create-property');

// `Object.fromEntries` method
// https://tc39.es/ecma262/#sec-object.fromentries
$({ target: 'Object', stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, { AS_ENTRIES: true });
    return obj;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/iterate":1773651887092,"../internals/create-property":1773651887046}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887300, function(require, module, exports) {

var $ = require('../internals/export');
var fails = require('../internals/fails');
var toIndexedObject = require('../internals/to-indexed-object');
var nativeGetOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var DESCRIPTORS = require('../internals/descriptors');

var FORCED = !DESCRIPTORS || fails(function () { nativeGetOwnPropertyDescriptor(1); });

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/fails":1773651886965,"../internals/to-indexed-object":1773651886975,"../internals/object-get-own-property-descriptor":1773651886970,"../internals/descriptors":1773651886971}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887301, function(require, module, exports) {

var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var ownKeys = require('../internals/own-keys');
var toIndexedObject = require('../internals/to-indexed-object');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var createProperty = require('../internals/create-property');

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/own-keys":1773651887078,"../internals/to-indexed-object":1773651886975,"../internals/object-get-own-property-descriptor":1773651886970,"../internals/create-property":1773651887046}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887302, function(require, module, exports) {

var $ = require('../internals/export');
var fails = require('../internals/fails');
var getOwnPropertyNames = require('../internals/object-get-own-property-names-external').f;

// eslint-disable-next-line es/no-object-getownpropertynames -- required for testing
var FAILS_ON_PRIMITIVES = fails(function () { return !Object.getOwnPropertyNames(1); });

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  getOwnPropertyNames: getOwnPropertyNames
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/fails":1773651886965,"../internals/object-get-own-property-names-external":1773651887028}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887303, function(require, module, exports) {

var $ = require('../internals/export');
var fails = require('../internals/fails');
var toObject = require('../internals/to-object');
var nativeGetPrototypeOf = require('../internals/object-get-prototype-of');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});


}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/fails":1773651886965,"../internals/to-object":1773651887000,"../internals/object-get-prototype-of":1773651887090,"../internals/correct-prototype-getter":1773651887091}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887304, function(require, module, exports) {

var $ = require('../internals/export');
var createProperty = require('../internals/create-property');
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toPropertyKey = require('../internals/to-property-key');
var iterate = require('../internals/iterate');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-object-groupby -- testing
var nativeGroupBy = Object.groupBy;
var create = getBuiltIn('Object', 'create');
var push = uncurryThis([].push);

// https://bugs.webkit.org/show_bug.cgi?id=271524
var DOES_NOT_WORK_WITH_PRIMITIVES = !nativeGroupBy || fails(function () {
  return nativeGroupBy('ab', function (it) {
    return it;
  }).a.length !== 1;
});

// `Object.groupBy` method
// https://tc39.es/ecma262/#sec-object.groupby
$({ target: 'Object', stat: true, forced: DOES_NOT_WORK_WITH_PRIMITIVES }, {
  groupBy: function groupBy(items, callbackfn) {
    requireObjectCoercible(items);
    aCallable(callbackfn);
    var obj = create(null);
    var k = 0;
    iterate(items, function (value) {
      var key = toPropertyKey(callbackfn(value, k++));
      // in some IE versions, `hasOwnProperty` returns incorrect result on integer keys
      // but since it's a `null` prototype object, we can safely use `in`
      if (key in obj) push(obj[key], value);
      else createProperty(obj, key, [value]);
    });
    return obj;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-property":1773651887046,"../internals/get-built-in":1773651886983,"../internals/function-uncurry-this":1773651886968,"../internals/a-callable":1773651886991,"../internals/require-object-coercible":1773651886977,"../internals/to-property-key":1773651886979,"../internals/iterate":1773651887092,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887305, function(require, module, exports) {

var $ = require('../internals/export');
var hasOwn = require('../internals/has-own-property');

// `Object.hasOwn` method
// https://tc39.es/ecma262/#sec-object.hasown
$({ target: 'Object', stat: true }, {
  hasOwn: hasOwn
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/has-own-property":1773651886999}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887306, function(require, module, exports) {

var $ = require('../internals/export');
var is = require('../internals/same-value');

// `Object.is` method
// https://tc39.es/ecma262/#sec-object.is
$({ target: 'Object', stat: true }, {
  is: is
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/same-value":1773651887307}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887307, function(require, module, exports) {

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887308, function(require, module, exports) {

var $ = require('../internals/export');
var $isExtensible = require('../internals/object-is-extensible');

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
// eslint-disable-next-line es/no-object-isextensible -- safe
$({ target: 'Object', stat: true, forced: Object.isExtensible !== $isExtensible }, {
  isExtensible: $isExtensible
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/object-is-extensible":1773651887231}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887309, function(require, module, exports) {

var $ = require('../internals/export');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var ARRAY_BUFFER_NON_EXTENSIBLE = require('../internals/array-buffer-non-extensible');

// eslint-disable-next-line es/no-object-isfrozen -- safe
var $isFrozen = Object.isFrozen;

var FORCED = ARRAY_BUFFER_NON_EXTENSIBLE || fails(function () { $isFrozen(1); });

// `Object.isFrozen` method
// https://tc39.es/ecma262/#sec-object.isfrozen
$({ target: 'Object', stat: true, forced: FORCED }, {
  isFrozen: function isFrozen(it) {
    if (!isObject(it)) return true;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return true;
    return $isFrozen ? $isFrozen(it) : false;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/fails":1773651886965,"../internals/is-object":1773651886981,"../internals/classof-raw":1773651886967,"../internals/array-buffer-non-extensible":1773651887232}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887310, function(require, module, exports) {

var $ = require('../internals/export');
var fails = require('../internals/fails');
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var ARRAY_BUFFER_NON_EXTENSIBLE = require('../internals/array-buffer-non-extensible');

// eslint-disable-next-line es/no-object-issealed -- safe
var $isSealed = Object.isSealed;

var FORCED = ARRAY_BUFFER_NON_EXTENSIBLE || fails(function () { $isSealed(1); });

// `Object.isSealed` method
// https://tc39.es/ecma262/#sec-object.issealed
$({ target: 'Object', stat: true, forced: FORCED }, {
  isSealed: function isSealed(it) {
    if (!isObject(it)) return true;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return true;
    return $isSealed ? $isSealed(it) : false;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/fails":1773651886965,"../internals/is-object":1773651886981,"../internals/classof-raw":1773651886967,"../internals/array-buffer-non-extensible":1773651887232}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887311, function(require, module, exports) {

var $ = require('../internals/export');
var toObject = require('../internals/to-object');
var nativeKeys = require('../internals/object-keys');
var fails = require('../internals/fails');

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/to-object":1773651887000,"../internals/object-keys":1773651887015,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887312, function(require, module, exports) {

var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/object-prototype-accessors-forced');
var toObject = require('../internals/to-object');
var toPropertyKey = require('../internals/to-property-key');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

// `Object.prototype.__lookupGetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__lookupGetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __lookupGetter__: function __lookupGetter__(P) {
      var O = toObject(this);
      var key = toPropertyKey(P);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor(O, key)) return desc.get;
      } while (O = getPrototypeOf(O));
    }
  });
}

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/object-prototype-accessors-forced":1773651887292,"../internals/to-object":1773651887000,"../internals/to-property-key":1773651886979,"../internals/object-get-prototype-of":1773651887090,"../internals/object-get-own-property-descriptor":1773651886970}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887313, function(require, module, exports) {

var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var FORCED = require('../internals/object-prototype-accessors-forced');
var toObject = require('../internals/to-object');
var toPropertyKey = require('../internals/to-property-key');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

// `Object.prototype.__lookupSetter__` method
// https://tc39.es/ecma262/#sec-object.prototype.__lookupSetter__
if (DESCRIPTORS) {
  $({ target: 'Object', proto: true, forced: FORCED }, {
    __lookupSetter__: function __lookupSetter__(P) {
      var O = toObject(this);
      var key = toPropertyKey(P);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor(O, key)) return desc.set;
      } while (O = getPrototypeOf(O));
    }
  });
}

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/object-prototype-accessors-forced":1773651887292,"../internals/to-object":1773651887000,"../internals/to-property-key":1773651886979,"../internals/object-get-prototype-of":1773651887090,"../internals/object-get-own-property-descriptor":1773651886970}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887314, function(require, module, exports) {

var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var onFreeze = require('../internals/internal-metadata').onFreeze;
var FREEZING = require('../internals/freezing');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-object-preventextensions -- safe
var $preventExtensions = Object.preventExtensions;
var FAILS_ON_PRIMITIVES = fails(function () { $preventExtensions(1); });

// `Object.preventExtensions` method
// https://tc39.es/ecma262/#sec-object.preventextensions
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(onFreeze(it)) : it;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/is-object":1773651886981,"../internals/internal-metadata":1773651887230,"../internals/freezing":1773651887225,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887315, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887316, function(require, module, exports) {

var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var onFreeze = require('../internals/internal-metadata').onFreeze;
var FREEZING = require('../internals/freezing');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-object-seal -- safe
var $seal = Object.seal;
var FAILS_ON_PRIMITIVES = fails(function () { $seal(1); });

// `Object.seal` method
// https://tc39.es/ecma262/#sec-object.seal
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  seal: function seal(it) {
    return $seal && isObject(it) ? $seal(onFreeze(it)) : it;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/is-object":1773651886981,"../internals/internal-metadata":1773651887230,"../internals/freezing":1773651887225,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887317, function(require, module, exports) {

var $ = require('../internals/export');
var setPrototypeOf = require('../internals/object-set-prototype-of');

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
$({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/object-set-prototype-of":1773651887073}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887318, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887319, function(require, module, exports) {

var $ = require('../internals/export');
var $values = require('../internals/object-to-array').values;

// `Object.values` method
// https://tc39.es/ecma262/#sec-object.values
$({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/object-to-array":1773651887297}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887320, function(require, module, exports) {

var $ = require('../internals/export');
var $parseFloat = require('../internals/number-parse-float');

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
$({ global: true, forced: parseFloat !== $parseFloat }, {
  parseFloat: $parseFloat
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/number-parse-float":1773651887282}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887321, function(require, module, exports) {

var $ = require('../internals/export');
var $parseInt = require('../internals/number-parse-int');

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt !== $parseInt }, {
  parseInt: $parseInt
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/number-parse-int":1773651887284}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887322, function(require, module, exports) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require('../modules/es.promise.constructor');
require('../modules/es.promise.all');
require('../modules/es.promise.catch');
require('../modules/es.promise.race');
require('../modules/es.promise.reject');
require('../modules/es.promise.resolve');

}, function(modId) { var map = {"../modules/es.promise.constructor":1773651887323,"../modules/es.promise.all":1773651887339,"../modules/es.promise.catch":1773651887341,"../modules/es.promise.race":1773651887342,"../modules/es.promise.reject":1773651887343,"../modules/es.promise.resolve":1773651887344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887323, function(require, module, exports) {

var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var IS_NODE = require('../internals/environment-is-node');
var globalThis = require('../internals/global-this');
var path = require('../internals/path');
var call = require('../internals/function-call');
var defineBuiltIn = require('../internals/define-built-in');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var setSpecies = require('../internals/set-species');
var aCallable = require('../internals/a-callable');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var anInstance = require('../internals/an-instance');
var speciesConstructor = require('../internals/species-constructor');
var task = require('../internals/task').set;
var microtask = require('../internals/microtask');
var hostReportErrors = require('../internals/host-report-errors');
var perform = require('../internals/perform');
var Queue = require('../internals/queue');
var InternalStateModule = require('../internals/internal-state');
var NativePromiseConstructor = require('../internals/promise-native-constructor');
var PromiseConstructorDetection = require('../internals/promise-constructor-detection');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var PromiseConstructor = NativePromiseConstructor;
var PromisePrototype = NativePromisePrototype;
var TypeError = globalThis.TypeError;
var document = globalThis.document;
var process = globalThis.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;

var DISPATCH_EVENT = !!(document && document.createEvent && globalThis.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state === FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(new TypeError('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    globalThis.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = globalThis['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call(task, globalThis, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call(task, globalThis, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw new TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call(then, value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable(executor);
    call(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: null
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable(onRejected) && onRejected;
    reaction.domain = IS_NODE ? process.domain : undefined;
    if (state.state === PENDING) state.reactions.add(reaction);
    else microtask(function () {
      callReaction(reaction, state);
    });
    return reaction.promise;
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
  }
}

// `Promise` constructor
// https://tc39.es/ecma262/#sec-promise-executor
$({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  Promise: PromiseConstructor
});

PromiseWrapper = path.Promise;

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/is-pure":1773651886997,"../internals/environment-is-node":1773651887145,"../internals/global-this":1773651886962,"../internals/path":1773651886984,"../internals/function-call":1773651886972,"../internals/define-built-in":1773651887031,"../internals/object-set-prototype-of":1773651887073,"../internals/set-to-string-tag":1773651887036,"../internals/set-species":1773651887157,"../internals/a-callable":1773651886991,"../internals/is-callable":1773651886969,"../internals/is-object":1773651886981,"../internals/an-instance":1773651887189,"../internals/species-constructor":1773651887324,"../internals/task":1773651887326,"../internals/microtask":1773651887329,"../internals/host-report-errors":1773651887334,"../internals/perform":1773651887335,"../internals/queue":1773651887331,"../internals/internal-state":1773651887038,"../internals/promise-native-constructor":1773651887336,"../internals/promise-constructor-detection":1773651887337,"../internals/new-promise-capability":1773651887338}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887324, function(require, module, exports) {

var anObject = require('../internals/an-object');
var aConstructor = require('../internals/a-constructor');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES]) ? defaultConstructor : aConstructor(S);
};

}, function(modId) { var map = {"../internals/an-object":1773651887009,"../internals/a-constructor":1773651887325,"../internals/is-null-or-undefined":1773651886978,"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887325, function(require, module, exports) {

var isConstructor = require('../internals/is-constructor');
var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a constructor');
};

}, function(modId) { var map = {"../internals/is-constructor":1773651887044,"../internals/try-to-string":1773651886992}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887326, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var apply = require('../internals/function-apply');
var bind = require('../internals/function-bind-context');
var isCallable = require('../internals/is-callable');
var hasOwn = require('../internals/has-own-property');
var fails = require('../internals/fails');
var html = require('../internals/html');
var arraySlice = require('../internals/array-slice');
var createElement = require('../internals/document-create-element');
var validateArgumentsLength = require('../internals/validate-arguments-length');
var IS_IOS = require('../internals/environment-is-ios');
var IS_NODE = require('../internals/environment-is-node');

var set = globalThis.setImmediate;
var clear = globalThis.clearImmediate;
var process = globalThis.process;
var Dispatch = globalThis.Dispatch;
var Function = globalThis.Function;
var MessageChannel = globalThis.MessageChannel;
var String = globalThis.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;

fails(function () {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  $location = globalThis.location;
});

var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var eventListener = function (event) {
  run(event.data);
};

var globalPostMessageDefer = function (id) {
  // old engines have not location.origin
  globalThis.postMessage(String(id), $location.protocol + '//' + $location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = arraySlice(arguments, 1);
    queue[++counter] = function () {
      apply(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = eventListener;
    defer = bind(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    globalThis.addEventListener &&
    isCallable(globalThis.postMessage) &&
    !globalThis.importScripts &&
    $location && $location.protocol !== 'file:' &&
    !fails(globalPostMessageDefer)
  ) {
    defer = globalPostMessageDefer;
    globalThis.addEventListener('message', eventListener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/function-apply":1773651886963,"../internals/function-bind-context":1773651887005,"../internals/is-callable":1773651886969,"../internals/has-own-property":1773651886999,"../internals/fails":1773651886965,"../internals/html":1773651887025,"../internals/array-slice":1773651887029,"../internals/document-create-element":1773651887003,"../internals/validate-arguments-length":1773651887327,"../internals/environment-is-ios":1773651887328,"../internals/environment-is-node":1773651887145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887327, function(require, module, exports) {

var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw new $TypeError('Not enough arguments');
  return passed;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887328, function(require, module, exports) {

var userAgent = require('../internals/environment-user-agent');

// eslint-disable-next-line redos/no-vulnerable -- safe
module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

}, function(modId) { var map = {"../internals/environment-user-agent":1773651886989}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887329, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var safeGetBuiltIn = require('../internals/safe-get-built-in');
var bind = require('../internals/function-bind-context');
var macrotask = require('../internals/task').set;
var Queue = require('../internals/queue');
var IS_IOS = require('../internals/environment-is-ios');
var IS_IOS_PEBBLE = require('../internals/environment-is-ios-pebble');
var IS_WEBOS_WEBKIT = require('../internals/environment-is-webos-webkit');
var IS_NODE = require('../internals/environment-is-node');

var MutationObserver = globalThis.MutationObserver || globalThis.WebKitMutationObserver;
var document = globalThis.document;
var process = globalThis.process;
var Promise = globalThis.Promise;
var microtask = safeGetBuiltIn('queueMicrotask');
var notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!microtask) {
  var queue = new Queue();

  var flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (fn = queue.get()) try {
      fn();
    } catch (error) {
      if (queue.head) notify();
      throw error;
    }
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = bind(promise.then, promise);
    notify = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // `webpack` dev server bug on IE global methods - use bind(fn, global)
    macrotask = bind(macrotask, globalThis);
    notify = function () {
      macrotask(flush);
    };
  }

  microtask = function (fn) {
    if (!queue.head) notify();
    queue.add(fn);
  };
}

module.exports = microtask;

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/safe-get-built-in":1773651887330,"../internals/function-bind-context":1773651887005,"../internals/task":1773651887326,"../internals/queue":1773651887331,"../internals/environment-is-ios":1773651887328,"../internals/environment-is-ios-pebble":1773651887332,"../internals/environment-is-webos-webkit":1773651887333,"../internals/environment-is-node":1773651887145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887330, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var DESCRIPTORS = require('../internals/descriptors');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Avoid NodeJS experimental warning
module.exports = function (name) {
  if (!DESCRIPTORS) return globalThis[name];
  var descriptor = getOwnPropertyDescriptor(globalThis, name);
  return descriptor && descriptor.value;
};

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/descriptors":1773651886971}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887331, function(require, module, exports) {

var Queue = function () {
  this.head = null;
  this.tail = null;
};

Queue.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    var tail = this.tail;
    if (tail) tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      var next = this.head = entry.next;
      if (next === null) this.tail = null;
      return entry.item;
    }
  }
};

module.exports = Queue;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887332, function(require, module, exports) {

var userAgent = require('../internals/environment-user-agent');

module.exports = /ipad|iphone|ipod/i.test(userAgent) && typeof Pebble != 'undefined';

}, function(modId) { var map = {"../internals/environment-user-agent":1773651886989}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887333, function(require, module, exports) {

var userAgent = require('../internals/environment-user-agent');

module.exports = /web0s(?!.*chrome)/i.test(userAgent);

}, function(modId) { var map = {"../internals/environment-user-agent":1773651886989}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887334, function(require, module, exports) {

module.exports = function (a, b) {
  try {
    // eslint-disable-next-line no-console -- safe
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  } catch (error) { /* empty */ }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887335, function(require, module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887336, function(require, module, exports) {

var globalThis = require('../internals/global-this');

module.exports = globalThis.Promise;

}, function(modId) { var map = {"../internals/global-this":1773651886962}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887337, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var NativePromiseConstructor = require('../internals/promise-native-constructor');
var isCallable = require('../internals/is-callable');
var isForced = require('../internals/is-forced');
var inspectSource = require('../internals/inspect-source');
var wellKnownSymbol = require('../internals/well-known-symbol');
var ENVIRONMENT = require('../internals/environment');
var IS_PURE = require('../internals/is-pure');
var V8_VERSION = require('../internals/environment-v8-version');

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var SPECIES = wellKnownSymbol('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT = isCallable(globalThis.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR = isForced('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#{ catch, finally } in the pure version for preventing prototype pollution
  if (IS_PURE && !(NativePromisePrototype['catch'] && NativePromisePrototype['finally'])) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
    // Detect correctness of subclassing with @@species support
    var promise = new NativePromiseConstructor(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  } return !GLOBAL_CORE_JS_PROMISE && (ENVIRONMENT === 'BROWSER' || ENVIRONMENT === 'DENO') && !NATIVE_PROMISE_REJECTION_EVENT;
});

module.exports = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
  SUBCLASSING: SUBCLASSING
};

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/promise-native-constructor":1773651887336,"../internals/is-callable":1773651886969,"../internals/is-forced":1773651887004,"../internals/inspect-source":1773651887045,"../internals/well-known-symbol":1773651886994,"../internals/environment":1773651887146,"../internals/is-pure":1773651886997,"../internals/environment-v8-version":1773651886988}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887338, function(require, module, exports) {

var aCallable = require('../internals/a-callable');

var $TypeError = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw new $TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};

}, function(modId) { var map = {"../internals/a-callable":1773651886991}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887339, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');
var PROMISE_STATICS_INCORRECT_ITERATION = require('../internals/promise-statics-incorrect-iteration');

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/new-promise-capability":1773651887338,"../internals/perform":1773651887335,"../internals/iterate":1773651887092,"../internals/promise-statics-incorrect-iteration":1773651887340}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887340, function(require, module, exports) {

var NativePromiseConstructor = require('../internals/promise-native-constructor');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');
var FORCED_PROMISE_CONSTRUCTOR = require('../internals/promise-constructor-detection').CONSTRUCTOR;

module.exports = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration(function (iterable) {
  NativePromiseConstructor.all(iterable).then(undefined, function () { /* empty */ });
});

}, function(modId) { var map = {"../internals/promise-native-constructor":1773651887336,"../internals/check-correctness-of-iteration":1773651887127,"../internals/promise-constructor-detection":1773651887337}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887341, function(require, module, exports) {

var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var FORCED_PROMISE_CONSTRUCTOR = require('../internals/promise-constructor-detection').CONSTRUCTOR;
var NativePromiseConstructor = require('../internals/promise-native-constructor');
var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var defineBuiltIn = require('../internals/define-built-in');

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (!IS_PURE && isCallable(NativePromiseConstructor)) {
  var method = getBuiltIn('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/is-pure":1773651886997,"../internals/promise-constructor-detection":1773651887337,"../internals/promise-native-constructor":1773651887336,"../internals/get-built-in":1773651886983,"../internals/is-callable":1773651886969,"../internals/define-built-in":1773651887031}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887342, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');
var PROMISE_STATICS_INCORRECT_ITERATION = require('../internals/promise-statics-incorrect-iteration');

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/new-promise-capability":1773651887338,"../internals/perform":1773651887335,"../internals/iterate":1773651887092,"../internals/promise-statics-incorrect-iteration":1773651887340}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887343, function(require, module, exports) {

var $ = require('../internals/export');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var FORCED_PROMISE_CONSTRUCTOR = require('../internals/promise-constructor-detection').CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    var capabilityReject = capability.reject;
    capabilityReject(r);
    return capability.promise;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/new-promise-capability":1773651887338,"../internals/promise-constructor-detection":1773651887337}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887344, function(require, module, exports) {

var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var IS_PURE = require('../internals/is-pure');
var NativePromiseConstructor = require('../internals/promise-native-constructor');
var FORCED_PROMISE_CONSTRUCTOR = require('../internals/promise-constructor-detection').CONSTRUCTOR;
var promiseResolve = require('../internals/promise-resolve');

var PromiseConstructorWrapper = getBuiltIn('Promise');
var CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR;

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$({ target: 'Promise', stat: true, forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/get-built-in":1773651886983,"../internals/is-pure":1773651886997,"../internals/promise-native-constructor":1773651887336,"../internals/promise-constructor-detection":1773651887337,"../internals/promise-resolve":1773651887345}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887345, function(require, module, exports) {

var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var newPromiseCapability = require('../internals/new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

}, function(modId) { var map = {"../internals/an-object":1773651887009,"../internals/is-object":1773651886981,"../internals/new-promise-capability":1773651887338}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887346, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');
var PROMISE_STATICS_INCORRECT_ITERATION = require('../internals/promise-statics-incorrect-iteration');

// `Promise.allSettled` method
// https://tc39.es/ecma262/#sec-promise.allsettled
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call(promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (error) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: error };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/new-promise-capability":1773651887338,"../internals/perform":1773651887335,"../internals/iterate":1773651887092,"../internals/promise-statics-incorrect-iteration":1773651887340}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887347, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var getBuiltIn = require('../internals/get-built-in');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var perform = require('../internals/perform');
var iterate = require('../internals/iterate');
var PROMISE_STATICS_INCORRECT_ITERATION = require('../internals/promise-statics-incorrect-iteration');

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  any: function any(iterable) {
    var C = this;
    var AggregateError = getBuiltIn('AggregateError');
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aCallable(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        remaining++;
        call(promiseResolve, C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/get-built-in":1773651886983,"../internals/new-promise-capability":1773651887338,"../internals/perform":1773651887335,"../internals/iterate":1773651887092,"../internals/promise-statics-incorrect-iteration":1773651887340}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887348, function(require, module, exports) {

var $ = require('../internals/export');
var IS_PURE = require('../internals/is-pure');
var NativePromiseConstructor = require('../internals/promise-native-constructor');
var fails = require('../internals/fails');
var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var speciesConstructor = require('../internals/species-constructor');
var promiseResolve = require('../internals/promise-resolve');
var defineBuiltIn = require('../internals/define-built-in');

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromiseConstructor && fails(function () {
  // eslint-disable-next-line unicorn/no-thenable -- required for testing
  NativePromisePrototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = isCallable(onFinally);
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
if (!IS_PURE && isCallable(NativePromiseConstructor)) {
  var method = getBuiltIn('Promise').prototype['finally'];
  if (NativePromisePrototype['finally'] !== method) {
    defineBuiltIn(NativePromisePrototype, 'finally', method, { unsafe: true });
  }
}

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/is-pure":1773651886997,"../internals/promise-native-constructor":1773651887336,"../internals/fails":1773651886965,"../internals/get-built-in":1773651886983,"../internals/is-callable":1773651886969,"../internals/species-constructor":1773651887324,"../internals/promise-resolve":1773651887345,"../internals/define-built-in":1773651887031}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887349, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var apply = require('../internals/function-apply');
var slice = require('../internals/array-slice');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');
var aCallable = require('../internals/a-callable');
var perform = require('../internals/perform');

var Promise = globalThis.Promise;

var ACCEPT_ARGUMENTS = false;
// Avoiding the use of polyfills of the previous iteration of this proposal
// that does not accept arguments of the callback
var FORCED = !Promise || !Promise['try'] || perform(function () {
  Promise['try'](function (argument) {
    ACCEPT_ARGUMENTS = argument === 8;
  }, 8);
}).error || !ACCEPT_ARGUMENTS;

// `Promise.try` method
// https://tc39.es/ecma262/#sec-promise.try
$({ target: 'Promise', stat: true, forced: FORCED }, {
  'try': function (callbackfn /* , ...args */) {
    var args = arguments.length > 1 ? slice(arguments, 1) : [];
    var promiseCapability = newPromiseCapabilityModule.f(this);
    var result = perform(function () {
      return apply(aCallable(callbackfn), undefined, args);
    });
    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
    return promiseCapability.promise;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/function-apply":1773651886963,"../internals/array-slice":1773651887029,"../internals/new-promise-capability":1773651887338,"../internals/a-callable":1773651886991,"../internals/perform":1773651887335}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887350, function(require, module, exports) {

var $ = require('../internals/export');
var newPromiseCapabilityModule = require('../internals/new-promise-capability');

// `Promise.withResolvers` method
// https://tc39.es/ecma262/#sec-promise.withResolvers
$({ target: 'Promise', stat: true }, {
  withResolvers: function withResolvers() {
    var promiseCapability = newPromiseCapabilityModule.f(this);
    return {
      promise: promiseCapability.promise,
      resolve: promiseCapability.resolve,
      reject: promiseCapability.reject
    };
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/new-promise-capability":1773651887338}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887351, function(require, module, exports) {

var $ = require('../internals/export');
var fromAsync = require('../internals/array-from-async');
var fails = require('../internals/fails');

// eslint-disable-next-line es/no-array-fromasync -- safe
var nativeFromAsync = Array.fromAsync;
// https://bugs.webkit.org/show_bug.cgi?id=271703
var INCORRECT_CONSTRUCTURING = !nativeFromAsync || fails(function () {
  var counter = 0;
  nativeFromAsync.call(function () {
    counter++;
    return [];
  }, { length: 0 });
  return counter !== 1;
});

// `Array.fromAsync` method
// https://github.com/tc39/proposal-array-from-async
$({ target: 'Array', stat: true, forced: INCORRECT_CONSTRUCTURING }, {
  fromAsync: fromAsync
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-from-async":1773651887352,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887352, function(require, module, exports) {

var bind = require('../internals/function-bind-context');
var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');
var isConstructor = require('../internals/is-constructor');
var getAsyncIterator = require('../internals/get-async-iterator');
var getIterator = require('../internals/get-iterator');
var getIteratorDirect = require('../internals/get-iterator-direct');
var getIteratorMethod = require('../internals/get-iterator-method');
var getMethod = require('../internals/get-method');
var getBuiltIn = require('../internals/get-built-in');
var getBuiltInPrototypeMethod = require('../internals/get-built-in-prototype-method');
var wellKnownSymbol = require('../internals/well-known-symbol');
var AsyncFromSyncIterator = require('../internals/async-from-sync-iterator');
var toArray = require('../internals/async-iterator-iteration').toArray;

var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');
var arrayIterator = uncurryThis(getBuiltInPrototypeMethod('Array', 'values'));
var arrayIteratorNext = uncurryThis(arrayIterator([]).next);

var safeArrayIterator = function () {
  return new SafeArrayIterator(this);
};

var SafeArrayIterator = function (O) {
  this.iterator = arrayIterator(O);
};

SafeArrayIterator.prototype.next = function () {
  return arrayIteratorNext(this.iterator);
};

// `Array.fromAsync` method implementation
// https://github.com/tc39/proposal-array-from-async
module.exports = function fromAsync(asyncItems /* , mapfn = undefined, thisArg = undefined */) {
  var C = this;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var thisArg = argumentsLength > 2 ? arguments[2] : undefined;
  return new (getBuiltIn('Promise'))(function (resolve) {
    var O = toObject(asyncItems);
    if (mapfn !== undefined) mapfn = bind(mapfn, thisArg);
    var usingAsyncIterator = getMethod(O, ASYNC_ITERATOR);
    var usingSyncIterator = usingAsyncIterator ? undefined : getIteratorMethod(O) || safeArrayIterator;
    var A = isConstructor(C) ? new C() : [];
    var iterator = usingAsyncIterator
      ? getAsyncIterator(O, usingAsyncIterator)
      : new AsyncFromSyncIterator(getIteratorDirect(getIterator(O, usingSyncIterator)));
    resolve(toArray(iterator, mapfn, A));
  });
};

}, function(modId) { var map = {"../internals/function-bind-context":1773651887005,"../internals/function-uncurry-this":1773651886968,"../internals/to-object":1773651887000,"../internals/is-constructor":1773651887044,"../internals/get-async-iterator":1773651887353,"../internals/get-iterator":1773651887095,"../internals/get-iterator-direct":1773651887205,"../internals/get-iterator-method":1773651887096,"../internals/get-method":1773651886990,"../internals/get-built-in":1773651886983,"../internals/get-built-in-prototype-method":1773651887162,"../internals/well-known-symbol":1773651886994,"../internals/async-from-sync-iterator":1773651887354,"../internals/async-iterator-iteration":1773651887356}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887353, function(require, module, exports) {

var call = require('../internals/function-call');
var AsyncFromSyncIterator = require('../internals/async-from-sync-iterator');
var anObject = require('../internals/an-object');
var getIterator = require('../internals/get-iterator');
var getIteratorDirect = require('../internals/get-iterator-direct');
var getMethod = require('../internals/get-method');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');

module.exports = function (it, usingIterator) {
  var method = arguments.length < 2 ? getMethod(it, ASYNC_ITERATOR) : usingIterator;
  return method ? anObject(call(method, it)) : new AsyncFromSyncIterator(getIteratorDirect(getIterator(it)));
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/async-from-sync-iterator":1773651887354,"../internals/an-object":1773651887009,"../internals/get-iterator":1773651887095,"../internals/get-iterator-direct":1773651887205,"../internals/get-method":1773651886990,"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887354, function(require, module, exports) {

var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var create = require('../internals/object-create');
var getMethod = require('../internals/get-method');
var defineBuiltIns = require('../internals/define-built-ins');
var InternalStateModule = require('../internals/internal-state');
var iteratorClose = require('../internals/iterator-close');
var getBuiltIn = require('../internals/get-built-in');
var AsyncIteratorPrototype = require('../internals/async-iterator-prototype');
var createIterResultObject = require('../internals/create-iter-result-object');

var Promise = getBuiltIn('Promise');

var ASYNC_FROM_SYNC_ITERATOR = 'AsyncFromSyncIterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ASYNC_FROM_SYNC_ITERATOR);

var asyncFromSyncIteratorContinuation = function (result, resolve, reject, syncIterator, closeOnRejection) {
  var done = result.done;
  Promise.resolve(result.value).then(function (value) {
    resolve(createIterResultObject(value, done));
  }, function (error) {
    if (!done && closeOnRejection) {
      try {
        iteratorClose(syncIterator, 'throw', error);
      } catch (error2) {
        error = error2;
      }
    }

    reject(error);
  });
};

var AsyncFromSyncIterator = function AsyncIterator(iteratorRecord) {
  iteratorRecord.type = ASYNC_FROM_SYNC_ITERATOR;
  setInternalState(this, iteratorRecord);
};

AsyncFromSyncIterator.prototype = defineBuiltIns(create(AsyncIteratorPrototype), {
  next: function next() {
    var state = getInternalState(this);
    return new Promise(function (resolve, reject) {
      var result = anObject(call(state.next, state.iterator));
      asyncFromSyncIteratorContinuation(result, resolve, reject, state.iterator, true);
    });
  },
  'return': function () {
    var iterator = getInternalState(this).iterator;
    return new Promise(function (resolve, reject) {
      var $return = getMethod(iterator, 'return');
      if ($return === undefined) return resolve(createIterResultObject(undefined, true));
      var result = anObject(call($return, iterator));
      asyncFromSyncIteratorContinuation(result, resolve, reject, iterator);
    });
  }
});

module.exports = AsyncFromSyncIterator;

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/an-object":1773651887009,"../internals/object-create":1773651887013,"../internals/get-method":1773651886990,"../internals/define-built-ins":1773651887190,"../internals/internal-state":1773651887038,"../internals/iterator-close":1773651887097,"../internals/get-built-in":1773651886983,"../internals/async-iterator-prototype":1773651887355,"../internals/create-iter-result-object":1773651887136}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887355, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var shared = require('../internals/shared-store');
var isCallable = require('../internals/is-callable');
var create = require('../internals/object-create');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var defineBuiltIn = require('../internals/define-built-in');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var USE_FUNCTION_CONSTRUCTOR = 'USE_FUNCTION_CONSTRUCTOR';
var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');
var AsyncIterator = globalThis.AsyncIterator;
var PassedAsyncIteratorPrototype = shared.AsyncIteratorPrototype;
var AsyncIteratorPrototype, prototype;

if (PassedAsyncIteratorPrototype) {
  AsyncIteratorPrototype = PassedAsyncIteratorPrototype;
} else if (isCallable(AsyncIterator)) {
  AsyncIteratorPrototype = AsyncIterator.prototype;
} else if (shared[USE_FUNCTION_CONSTRUCTOR] || globalThis[USE_FUNCTION_CONSTRUCTOR]) {
  try {
    // eslint-disable-next-line no-new-func -- we have no alternatives without usage of modern syntax
    prototype = getPrototypeOf(getPrototypeOf(getPrototypeOf(Function('return async function*(){}()')())));
    if (getPrototypeOf(prototype) === Object.prototype) AsyncIteratorPrototype = prototype;
  } catch (error) { /* empty */ }
}

if (!AsyncIteratorPrototype) AsyncIteratorPrototype = {};
else if (IS_PURE) AsyncIteratorPrototype = create(AsyncIteratorPrototype);

if (!isCallable(AsyncIteratorPrototype[ASYNC_ITERATOR])) {
  defineBuiltIn(AsyncIteratorPrototype, ASYNC_ITERATOR, function () {
    return this;
  });
}

module.exports = AsyncIteratorPrototype;

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/shared-store":1773651886996,"../internals/is-callable":1773651886969,"../internals/object-create":1773651887013,"../internals/object-get-prototype-of":1773651887090,"../internals/define-built-in":1773651887031,"../internals/well-known-symbol":1773651886994,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887356, function(require, module, exports) {

// https://github.com/tc39/proposal-async-iterator-helpers
// https://github.com/tc39/proposal-array-from-async
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer');
var getBuiltIn = require('../internals/get-built-in');
var createProperty = require('../internals/create-property');
var setArrayLength = require('../internals/array-set-length');
var getIteratorDirect = require('../internals/get-iterator-direct');
var closeAsyncIteration = require('../internals/async-iterator-close');

var createMethod = function (TYPE) {
  var IS_TO_ARRAY = TYPE === 0;
  var IS_FOR_EACH = TYPE === 1;
  var IS_EVERY = TYPE === 2;
  var IS_SOME = TYPE === 3;
  return function (object, fn, target) {
    anObject(object);
    var MAPPING = fn !== undefined;
    if (MAPPING || !IS_TO_ARRAY) aCallable(fn);
    var record = getIteratorDirect(object);
    var Promise = getBuiltIn('Promise');
    var iterator = record.iterator;
    var next = record.next;
    var counter = 0;

    return new Promise(function (resolve, reject) {
      var ifAbruptCloseAsyncIterator = function (error) {
        closeAsyncIteration(iterator, reject, error, reject);
      };

      var loop = function () {
        try {
          if (MAPPING) try {
            doesNotExceedSafeInteger(counter);
          } catch (error5) { ifAbruptCloseAsyncIterator(error5); }
          Promise.resolve(anObject(call(next, iterator))).then(function (step) {
            try {
              if (anObject(step).done) {
                if (IS_TO_ARRAY) {
                  setArrayLength(target, counter);
                  resolve(target);
                } else resolve(IS_SOME ? false : IS_EVERY || undefined);
              } else {
                var value = step.value;
                try {
                  if (MAPPING) {
                    var result = fn(value, counter);

                    var handler = function ($result) {
                      if (IS_FOR_EACH) {
                        loop();
                      } else if (IS_EVERY) {
                        $result ? loop() : closeAsyncIteration(iterator, resolve, false, reject);
                      } else if (IS_TO_ARRAY) {
                        try {
                          createProperty(target, counter++, $result);
                          loop();
                        } catch (error4) { ifAbruptCloseAsyncIterator(error4); }
                      } else {
                        $result ? closeAsyncIteration(iterator, resolve, IS_SOME || value, reject) : loop();
                      }
                    };

                    if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
                    else handler(result);
                  } else {
                    createProperty(target, counter++, value);
                    loop();
                  }
                } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
              }
            } catch (error2) { reject(error2); }
          }, reject);
        } catch (error) { reject(error); }
      };

      loop();
    });
  };
};

module.exports = {
  // `AsyncIterator.prototype.toArray` / `Array.fromAsync` methods
  toArray: createMethod(0),
  // `AsyncIterator.prototype.forEach` method
  forEach: createMethod(1),
  // `AsyncIterator.prototype.every` method
  every: createMethod(2),
  // `AsyncIterator.prototype.some` method
  some: createMethod(3),
  // `AsyncIterator.prototype.find` method
  find: createMethod(4)
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/is-object":1773651886981,"../internals/does-not-exceed-safe-integer":1773651887103,"../internals/get-built-in":1773651886983,"../internals/create-property":1773651887046,"../internals/array-set-length":1773651887104,"../internals/get-iterator-direct":1773651887205,"../internals/async-iterator-close":1773651887357}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887357, function(require, module, exports) {

var call = require('../internals/function-call');
var getBuiltIn = require('../internals/get-built-in');
var getMethod = require('../internals/get-method');

module.exports = function (iterator, method, argument, reject) {
  try {
    var returnMethod = getMethod(iterator, 'return');
    if (returnMethod) {
      return getBuiltIn('Promise').resolve(call(returnMethod, iterator)).then(function () {
        method(argument);
      }, function (error) {
        reject(error);
      });
    }
  } catch (error2) {
    return reject(error2);
  } method(argument);
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/get-built-in":1773651886983,"../internals/get-method":1773651886990}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887358, function(require, module, exports) {

// https://github.com/tc39/proposal-async-explicit-resource-management
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var getBuiltIn = require('../internals/get-built-in');
var aCallable = require('../internals/a-callable');
var anInstance = require('../internals/an-instance');
var defineBuiltIn = require('../internals/define-built-in');
var defineBuiltIns = require('../internals/define-built-ins');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var wellKnownSymbol = require('../internals/well-known-symbol');
var InternalStateModule = require('../internals/internal-state');
var addDisposableResource = require('../internals/add-disposable-resource');
var V8_VERSION = require('../internals/environment-v8-version');

var Promise = getBuiltIn('Promise');
var SuppressedError = getBuiltIn('SuppressedError');
var $ReferenceError = ReferenceError;

var ASYNC_DISPOSE = wellKnownSymbol('asyncDispose');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var ASYNC_DISPOSABLE_STACK = 'AsyncDisposableStack';
var setInternalState = InternalStateModule.set;
var getAsyncDisposableStackInternalState = InternalStateModule.getterFor(ASYNC_DISPOSABLE_STACK);

var HINT = 'async-dispose';
var DISPOSED = 'disposed';
var PENDING = 'pending';

var getPendingAsyncDisposableStackInternalState = function (stack) {
  var internalState = getAsyncDisposableStackInternalState(stack);
  if (internalState.state === DISPOSED) throw new $ReferenceError(ASYNC_DISPOSABLE_STACK + ' already disposed');
  return internalState;
};

var $AsyncDisposableStack = function AsyncDisposableStack() {
  setInternalState(anInstance(this, AsyncDisposableStackPrototype), {
    type: ASYNC_DISPOSABLE_STACK,
    state: PENDING,
    stack: []
  });

  if (!DESCRIPTORS) this.disposed = false;
};

var AsyncDisposableStackPrototype = $AsyncDisposableStack.prototype;

defineBuiltIns(AsyncDisposableStackPrototype, {
  disposeAsync: function disposeAsync() {
    var asyncDisposableStack = this;
    return new Promise(function (resolve, reject) {
      var internalState = getAsyncDisposableStackInternalState(asyncDisposableStack);
      if (internalState.state === DISPOSED) return resolve(undefined);
      internalState.state = DISPOSED;
      if (!DESCRIPTORS) asyncDisposableStack.disposed = true;
      var stack = internalState.stack;
      var i = stack.length;
      var thrown = false;
      var suppressed;

      var handleError = function (result) {
        if (thrown) {
          suppressed = new SuppressedError(result, suppressed);
        } else {
          thrown = true;
          suppressed = result;
        }

        loop();
      };

      var loop = function () {
        if (i) {
          var disposeMethod = stack[--i];
          stack[i] = null;
          try {
            Promise.resolve(disposeMethod()).then(loop, handleError);
          } catch (error) {
            handleError(error);
          }
        } else {
          internalState.stack = null;
          thrown ? reject(suppressed) : resolve(undefined);
        }
      };

      loop();
    });
  },
  use: function use(value) {
    addDisposableResource(getPendingAsyncDisposableStackInternalState(this), value, HINT);
    return value;
  },
  adopt: function adopt(value, onDispose) {
    var internalState = getPendingAsyncDisposableStackInternalState(this);
    aCallable(onDispose);
    addDisposableResource(internalState, undefined, HINT, function () {
      return onDispose(value);
    });
    return value;
  },
  defer: function defer(onDispose) {
    var internalState = getPendingAsyncDisposableStackInternalState(this);
    aCallable(onDispose);
    addDisposableResource(internalState, undefined, HINT, onDispose);
  },
  move: function move() {
    var internalState = getPendingAsyncDisposableStackInternalState(this);
    var newAsyncDisposableStack = new $AsyncDisposableStack();
    getAsyncDisposableStackInternalState(newAsyncDisposableStack).stack = internalState.stack;
    internalState.stack = [];
    internalState.state = DISPOSED;
    if (!DESCRIPTORS) this.disposed = true;
    return newAsyncDisposableStack;
  }
});

if (DESCRIPTORS) defineBuiltInAccessor(AsyncDisposableStackPrototype, 'disposed', {
  configurable: true,
  get: function disposed() {
    return getAsyncDisposableStackInternalState(this).state === DISPOSED;
  }
});

defineBuiltIn(AsyncDisposableStackPrototype, ASYNC_DISPOSE, AsyncDisposableStackPrototype.disposeAsync, { name: 'disposeAsync' });
defineBuiltIn(AsyncDisposableStackPrototype, TO_STRING_TAG, ASYNC_DISPOSABLE_STACK, { nonWritable: true });

// https://github.com/tc39/proposal-explicit-resource-management/issues/256
// can't be detected synchronously
var SYNC_DISPOSE_RETURNING_PROMISE_RESOLUTION_BUG = V8_VERSION && V8_VERSION < 136;

$({ global: true, constructor: true, forced: SYNC_DISPOSE_RETURNING_PROMISE_RESOLUTION_BUG }, {
  AsyncDisposableStack: $AsyncDisposableStack
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/get-built-in":1773651886983,"../internals/a-callable":1773651886991,"../internals/an-instance":1773651887189,"../internals/define-built-in":1773651887031,"../internals/define-built-ins":1773651887190,"../internals/define-built-in-accessor":1773651887032,"../internals/well-known-symbol":1773651886994,"../internals/internal-state":1773651887038,"../internals/add-disposable-resource":1773651887191,"../internals/environment-v8-version":1773651886988}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887359, function(require, module, exports) {

// https://github.com/tc39/proposal-async-explicit-resource-management
var call = require('../internals/function-call');
var defineBuiltIn = require('../internals/define-built-in');
var getBuiltIn = require('../internals/get-built-in');
var getMethod = require('../internals/get-method');
var hasOwn = require('../internals/has-own-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var AsyncIteratorPrototype = require('../internals/async-iterator-prototype');

var ASYNC_DISPOSE = wellKnownSymbol('asyncDispose');
var Promise = getBuiltIn('Promise');

if (!hasOwn(AsyncIteratorPrototype, ASYNC_DISPOSE)) {
  defineBuiltIn(AsyncIteratorPrototype, ASYNC_DISPOSE, function () {
    var O = this;
    return new Promise(function (resolve, reject) {
      var $return = getMethod(O, 'return');
      if ($return) {
        Promise.resolve(call($return, O)).then(function () {
          resolve(undefined);
        }, reject);
      } else resolve(undefined);
    });
  });
}

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/define-built-in":1773651887031,"../internals/get-built-in":1773651886983,"../internals/get-method":1773651886990,"../internals/has-own-property":1773651886999,"../internals/well-known-symbol":1773651886994,"../internals/async-iterator-prototype":1773651887355}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887360, function(require, module, exports) {

var $ = require('../internals/export');
var functionApply = require('../internals/function-apply');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var fails = require('../internals/fails');

// MS Edge argumentsList argument is optional
var OPTIONAL_ARGUMENTS_LIST = !fails(function () {
  // eslint-disable-next-line es/no-reflect -- required for testing
  Reflect.apply(function () { /* empty */ });
});

// `Reflect.apply` method
// https://tc39.es/ecma262/#sec-reflect.apply
$({ target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
  apply: function apply(target, thisArgument, argumentsList) {
    return functionApply(aCallable(target), thisArgument, anObject(argumentsList));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-apply":1773651886963,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887361, function(require, module, exports) {

var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var apply = require('../internals/function-apply');
var bind = require('../internals/function-bind');
var aConstructor = require('../internals/a-constructor');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var create = require('../internals/object-create');
var fails = require('../internals/fails');

var nativeConstruct = getBuiltIn('Reflect', 'construct');
var ObjectPrototype = Object.prototype;
var push = [].push;

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});

var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});

var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aConstructor(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target === newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      apply(push, $args, args);
      return new (apply(bind, Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : ObjectPrototype);
    var result = apply(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/get-built-in":1773651886983,"../internals/function-apply":1773651886963,"../internals/function-bind":1773651887194,"../internals/a-constructor":1773651887325,"../internals/an-object":1773651887009,"../internals/is-object":1773651886981,"../internals/object-create":1773651887013,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887362, function(require, module, exports) {

var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var anObject = require('../internals/an-object');
var toPropertyKey = require('../internals/to-property-key');
var definePropertyModule = require('../internals/object-define-property');
var fails = require('../internals/fails');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
var ERROR_INSTEAD_OF_FALSE = fails(function () {
  // eslint-disable-next-line es/no-reflect -- required for testing
  Reflect.defineProperty(definePropertyModule.f({}, 1, { value: 1 }), 1, { value: 2 });
});

// `Reflect.defineProperty` method
// https://tc39.es/ecma262/#sec-reflect.defineproperty
$({ target: 'Reflect', stat: true, forced: ERROR_INSTEAD_OF_FALSE, sham: !DESCRIPTORS }, {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    var key = toPropertyKey(propertyKey);
    anObject(attributes);
    try {
      definePropertyModule.f(target, key, attributes);
      return true;
    } catch (error) {
      return false;
    }
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/an-object":1773651887009,"../internals/to-property-key":1773651886979,"../internals/object-define-property":1773651887007,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887363, function(require, module, exports) {

var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

// `Reflect.deleteProperty` method
// https://tc39.es/ecma262/#sec-reflect.deleteproperty
$({ target: 'Reflect', stat: true }, {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var descriptor = getOwnPropertyDescriptor(anObject(target), propertyKey);
    return descriptor && !descriptor.configurable ? false : delete target[propertyKey];
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/an-object":1773651887009,"../internals/object-get-own-property-descriptor":1773651886970}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887364, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var isObject = require('../internals/is-object');
var anObject = require('../internals/an-object');
var isDataDescriptor = require('../internals/is-data-descriptor');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var getPrototypeOf = require('../internals/object-get-prototype-of');

// `Reflect.get` method
// https://tc39.es/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey);
  if (descriptor) return isDataDescriptor(descriptor)
    ? descriptor.value
    : descriptor.get === undefined ? undefined : call(descriptor.get, receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({ target: 'Reflect', stat: true }, {
  get: get
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/is-object":1773651886981,"../internals/an-object":1773651887009,"../internals/is-data-descriptor":1773651887365,"../internals/object-get-own-property-descriptor":1773651886970,"../internals/object-get-prototype-of":1773651887090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887365, function(require, module, exports) {

var hasOwn = require('../internals/has-own-property');

module.exports = function (descriptor) {
  return descriptor !== undefined && (hasOwn(descriptor, 'value') || hasOwn(descriptor, 'writable'));
};

}, function(modId) { var map = {"../internals/has-own-property":1773651886999}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887366, function(require, module, exports) {

var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var anObject = require('../internals/an-object');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');

// `Reflect.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-reflect.getownpropertydescriptor
$({ target: 'Reflect', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/an-object":1773651887009,"../internals/object-get-own-property-descriptor":1773651886970}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887367, function(require, module, exports) {

var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var objectGetPrototypeOf = require('../internals/object-get-prototype-of');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

// `Reflect.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-reflect.getprototypeof
$({ target: 'Reflect', stat: true, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(target) {
    return objectGetPrototypeOf(anObject(target));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/an-object":1773651887009,"../internals/object-get-prototype-of":1773651887090,"../internals/correct-prototype-getter":1773651887091}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887368, function(require, module, exports) {

var $ = require('../internals/export');

// `Reflect.has` method
// https://tc39.es/ecma262/#sec-reflect.has
$({ target: 'Reflect', stat: true }, {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887369, function(require, module, exports) {

var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var $isExtensible = require('../internals/object-is-extensible');

// `Reflect.isExtensible` method
// https://tc39.es/ecma262/#sec-reflect.isextensible
$({ target: 'Reflect', stat: true }, {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible(target);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/an-object":1773651887009,"../internals/object-is-extensible":1773651887231}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887370, function(require, module, exports) {

var $ = require('../internals/export');
var ownKeys = require('../internals/own-keys');

// `Reflect.ownKeys` method
// https://tc39.es/ecma262/#sec-reflect.ownkeys
$({ target: 'Reflect', stat: true }, {
  ownKeys: ownKeys
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/own-keys":1773651887078}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887371, function(require, module, exports) {

var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var anObject = require('../internals/an-object');
var FREEZING = require('../internals/freezing');

// `Reflect.preventExtensions` method
// https://tc39.es/ecma262/#sec-reflect.preventextensions
$({ target: 'Reflect', stat: true, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      var objectPreventExtensions = getBuiltIn('Object', 'preventExtensions');
      if (objectPreventExtensions) objectPreventExtensions(target);
      return true;
    } catch (error) {
      return false;
    }
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/get-built-in":1773651886983,"../internals/an-object":1773651887009,"../internals/freezing":1773651887225}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887372, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var isDataDescriptor = require('../internals/is-data-descriptor');
var fails = require('../internals/fails');
var definePropertyModule = require('../internals/object-define-property');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

// `Reflect.set` method
// https://tc39.es/ecma262/#sec-reflect.set
function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDescriptor = getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  var existingDescriptor, prototype, setter;
  if (!ownDescriptor) {
    if (isObject(prototype = getPrototypeOf(target))) {
      return set(prototype, propertyKey, V, receiver);
    }
    ownDescriptor = createPropertyDescriptor(0);
  }
  if (isDataDescriptor(ownDescriptor)) {
    if (ownDescriptor.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = getOwnPropertyDescriptorModule.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      definePropertyModule.f(receiver, propertyKey, existingDescriptor);
    } else definePropertyModule.f(receiver, propertyKey, createPropertyDescriptor(0, V));
  } else {
    setter = ownDescriptor.set;
    if (setter === undefined) return false;
    call(setter, receiver, V);
  } return true;
}

// MS Edge 17-18 Reflect.set allows setting the property to object
// with non-writable property on the prototype
var MS_EDGE_BUG = fails(function () {
  var Constructor = function () { /* empty */ };
  var object = definePropertyModule.f(new Constructor(), 'a', { configurable: true });
  // eslint-disable-next-line es/no-reflect -- required for testing
  return Reflect.set(Constructor.prototype, 'a', 1, object) !== false;
});

$({ target: 'Reflect', stat: true, forced: MS_EDGE_BUG }, {
  set: set
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/an-object":1773651887009,"../internals/is-object":1773651886981,"../internals/is-data-descriptor":1773651887365,"../internals/fails":1773651886965,"../internals/object-define-property":1773651887007,"../internals/object-get-own-property-descriptor":1773651886970,"../internals/object-get-prototype-of":1773651887090,"../internals/create-property-descriptor":1773651886974}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887373, function(require, module, exports) {

var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');
var objectSetPrototypeOf = require('../internals/object-set-prototype-of');

// `Reflect.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-reflect.setprototypeof
if (objectSetPrototypeOf) $({ target: 'Reflect', stat: true }, {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    anObject(target);
    aPossiblePrototype(proto);
    try {
      objectSetPrototypeOf(target, proto);
      return true;
    } catch (error) {
      return false;
    }
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/an-object":1773651887009,"../internals/a-possible-prototype":1773651887075,"../internals/object-set-prototype-of":1773651887073}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887374, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887375, function(require, module, exports) {

var setSpecies = require('../internals/set-species');

setSpecies('RegExp');

}, function(modId) { var map = {"../internals/set-species":1773651887157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887376, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var aString = require('../internals/a-string');
var hasOwn = require('../internals/has-own-property');
var padStart = require('../internals/string-pad').start;
var WHITESPACES = require('../internals/whitespaces');

var $Array = Array;
var $escape = RegExp.escape;
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var numberToString = uncurryThis(1.1.toString);
var join = uncurryThis([].join);
var FIRST_DIGIT_OR_ASCII = /^[0-9a-z]/i;
var SYNTAX_SOLIDUS = /^[$()*+./?[\\\]^{|}]/;
var OTHER_PUNCTUATORS_AND_WHITESPACES = RegExp('^[!"#%&\',\\-:;<=>@`~' + WHITESPACES + ']');
var exec = uncurryThis(FIRST_DIGIT_OR_ASCII.exec);

var ControlEscape = {
  '\u0009': 't',
  '\u000A': 'n',
  '\u000B': 'v',
  '\u000C': 'f',
  '\u000D': 'r'
};

var escapeChar = function (chr) {
  var hex = numberToString(charCodeAt(chr, 0), 16);
  return hex.length < 3 ? '\\x' + padStart(hex, 2, '0') : '\\u' + padStart(hex, 4, '0');
};

// Avoiding the use of polyfills of the previous iteration of this proposal
var FORCED = !$escape || $escape('ab') !== '\\x61b';

// `RegExp.escape` method
// https://tc39.es/ecma262/#sec-regexp.escape
$({ target: 'RegExp', stat: true, forced: FORCED }, {
  escape: function escape(S) {
    aString(S);
    var length = S.length;
    var result = $Array(length);

    for (var i = 0; i < length; i++) {
      var chr = charAt(S, i);
      if (i === 0 && exec(FIRST_DIGIT_OR_ASCII, chr)) {
        result[i] = escapeChar(chr);
      } else if (hasOwn(ControlEscape, chr)) {
        result[i] = '\\' + ControlEscape[chr];
      } else if (exec(SYNTAX_SOLIDUS, chr)) {
        result[i] = '\\' + chr;
      } else if (exec(OTHER_PUNCTUATORS_AND_WHITESPACES, chr)) {
        result[i] = escapeChar(chr);
      } else {
        var charCode = charCodeAt(chr, 0);
        // single UTF-16 code unit
        if ((charCode & 0xF800) !== 0xD800) result[i] = chr;
        // unpaired surrogate
        else if (charCode >= 0xDC00 || i + 1 >= length || (charCodeAt(S, i + 1) & 0xFC00) !== 0xDC00) result[i] = escapeChar(chr);
        // surrogate pair
        else {
          result[i] = chr;
          result[++i] = charAt(S, i);
        }
      }
    }

    return join(result, '');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/a-string":1773651887377,"../internals/has-own-property":1773651886999,"../internals/string-pad":1773651887183,"../internals/whitespaces":1773651887271}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887377, function(require, module, exports) {

var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'string') return argument;
  throw new $TypeError('Argument is not a string');
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887378, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887379, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887380, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887381, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887382, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887383, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887384, function(require, module, exports) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
require('../modules/es.set.constructor');

}, function(modId) { var map = {"../modules/es.set.constructor":1773651887385}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887385, function(require, module, exports) {

var collection = require('../internals/collection');
var collectionStrong = require('../internals/collection-strong');

// `Set` constructor
// https://tc39.es/ecma262/#sec-set-objects
collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

}, function(modId) { var map = {"../internals/collection":1773651887229,"../internals/collection-strong":1773651887233}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887386, function(require, module, exports) {

var $ = require('../internals/export');
var difference = require('../internals/set-difference');
var fails = require('../internals/fails');
var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like');

var SET_LIKE_INCORRECT_BEHAVIOR = !setMethodAcceptSetLike('difference', function (result) {
  return result.size === 0;
});

var FORCED = SET_LIKE_INCORRECT_BEHAVIOR || fails(function () {
  // https://bugs.webkit.org/show_bug.cgi?id=288595
  var setLike = {
    size: 1,
    has: function () { return true; },
    keys: function () {
      var index = 0;
      return {
        next: function () {
          var done = index++ > 1;
          if (baseSet.has(1)) baseSet.clear();
          return { done: done, value: 2 };
        }
      };
    }
  };
  // eslint-disable-next-line es/no-set -- testing
  var baseSet = new Set([1, 2, 3, 4]);
  // eslint-disable-next-line es/no-set-prototype-difference -- testing
  return baseSet.difference(setLike).size !== 3;
});

// `Set.prototype.difference` method
// https://tc39.es/ecma262/#sec-set.prototype.difference
$({ target: 'Set', proto: true, real: true, forced: FORCED }, {
  difference: difference
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/set-difference":1773651887387,"../internals/fails":1773651886965,"../internals/set-method-accept-set-like":1773651887395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887387, function(require, module, exports) {

var aSet = require('../internals/a-set');
var SetHelpers = require('../internals/set-helpers');
var clone = require('../internals/set-clone');
var size = require('../internals/set-size');
var getSetRecord = require('../internals/get-set-record');
var iterateSet = require('../internals/set-iterate');
var iterateSimple = require('../internals/iterate-simple');

var has = SetHelpers.has;
var remove = SetHelpers.remove;

// `Set.prototype.difference` method
// https://tc39.es/ecma262/#sec-set.prototype.difference
module.exports = function difference(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  var result = clone(O);
  if (size(O) <= otherRec.size) iterateSet(O, function (e) {
    if (otherRec.includes(e)) remove(result, e);
  });
  else iterateSimple(otherRec.getIterator(), function (e) {
    if (has(result, e)) remove(result, e);
  });
  return result;
};

}, function(modId) { var map = {"../internals/a-set":1773651887388,"../internals/set-helpers":1773651887389,"../internals/set-clone":1773651887390,"../internals/set-size":1773651887393,"../internals/get-set-record":1773651887394,"../internals/set-iterate":1773651887391,"../internals/iterate-simple":1773651887392}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887388, function(require, module, exports) {

var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

// Perform ? RequireInternalSlot(M, [[SetData]])
module.exports = function (it) {
  if (typeof it == 'object' && 'size' in it && 'has' in it && 'add' in it && 'delete' in it && 'keys' in it) return it;
  throw new $TypeError(tryToString(it) + ' is not a set');
};

}, function(modId) { var map = {"../internals/try-to-string":1773651886992}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887389, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var caller = require('../internals/caller');

var Set = getBuiltIn('Set');
var SetPrototype = Set.prototype;

module.exports = {
  Set: Set,
  add: caller('add', 1),
  has: caller('has', 1),
  remove: caller('delete', 1),
  proto: SetPrototype
};

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/caller":1773651887236}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887390, function(require, module, exports) {

var SetHelpers = require('../internals/set-helpers');
var iterate = require('../internals/set-iterate');

var Set = SetHelpers.Set;
var add = SetHelpers.add;

module.exports = function (set) {
  var result = new Set();
  iterate(set, function (it) {
    add(result, it);
  });
  return result;
};

}, function(modId) { var map = {"../internals/set-helpers":1773651887389,"../internals/set-iterate":1773651887391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887391, function(require, module, exports) {

var iterateSimple = require('../internals/iterate-simple');

module.exports = function (set, fn, interruptible) {
  return interruptible ? iterateSimple(set.keys(), fn, true) : set.forEach(fn);
};

}, function(modId) { var map = {"../internals/iterate-simple":1773651887392}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887392, function(require, module, exports) {

var call = require('../internals/function-call');

module.exports = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
  var next = record.next;
  var step, result;
  while (!(step = call(next, iterator)).done) {
    result = fn(step.value);
    if (result !== undefined) return result;
  }
};

}, function(modId) { var map = {"../internals/function-call":1773651886972}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887393, function(require, module, exports) {

module.exports = function (set) {
  return set.size;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887394, function(require, module, exports) {

var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var call = require('../internals/function-call');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var getIteratorDirect = require('../internals/get-iterator-direct');

var INVALID_SIZE = 'Invalid size';
var $RangeError = RangeError;
var $TypeError = TypeError;
var max = Math.max;

var SetRecord = function (set, intSize) {
  this.set = set;
  this.size = max(intSize, 0);
  this.has = aCallable(set.has);
  this.keys = aCallable(set.keys);
};

SetRecord.prototype = {
  getIterator: function () {
    return getIteratorDirect(anObject(call(this.keys, this.set)));
  },
  includes: function (it) {
    return call(this.has, this.set, it);
  }
};

// `GetSetRecord` abstract operation
// https://tc39.es/proposal-set-methods/#sec-getsetrecord
module.exports = function (obj) {
  anObject(obj);
  var numSize = +obj.size;
  // NOTE: If size is undefined, then numSize will be NaN
  // eslint-disable-next-line no-self-compare -- NaN check
  if (numSize !== numSize) throw new $TypeError(INVALID_SIZE);
  var intSize = toIntegerOrInfinity(numSize);
  if (intSize < 0) throw new $RangeError(INVALID_SIZE);
  return new SetRecord(obj, intSize);
};

}, function(modId) { var map = {"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/function-call":1773651886972,"../internals/to-integer-or-infinity":1773651887019,"../internals/get-iterator-direct":1773651887205}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887395, function(require, module, exports) {

module.exports = function () {
  return false;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887396, function(require, module, exports) {

var $ = require('../internals/export');
var fails = require('../internals/fails');
var intersection = require('../internals/set-intersection');
var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like');

var INCORRECT = !setMethodAcceptSetLike('intersection', function (result) {
  return result.size === 2 && result.has(1) && result.has(2);
}) || fails(function () {
  // eslint-disable-next-line es/no-array-from, es/no-set, es/no-set-prototype-intersection -- testing
  return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== '3,2';
});

// `Set.prototype.intersection` method
// https://tc39.es/ecma262/#sec-set.prototype.intersection
$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
  intersection: intersection
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/fails":1773651886965,"../internals/set-intersection":1773651887397,"../internals/set-method-accept-set-like":1773651887395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887397, function(require, module, exports) {

var aSet = require('../internals/a-set');
var SetHelpers = require('../internals/set-helpers');
var size = require('../internals/set-size');
var getSetRecord = require('../internals/get-set-record');
var iterateSet = require('../internals/set-iterate');
var iterateSimple = require('../internals/iterate-simple');

var Set = SetHelpers.Set;
var add = SetHelpers.add;
var has = SetHelpers.has;

// `Set.prototype.intersection` method
// https://tc39.es/ecma262/#sec-set.prototype.intersection
module.exports = function intersection(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  var result = new Set();

  if (size(O) > otherRec.size) {
    iterateSimple(otherRec.getIterator(), function (e) {
      if (has(O, e)) add(result, e);
    });
  } else {
    iterateSet(O, function (e) {
      if (otherRec.includes(e)) add(result, e);
    });
  }

  return result;
};

}, function(modId) { var map = {"../internals/a-set":1773651887388,"../internals/set-helpers":1773651887389,"../internals/set-size":1773651887393,"../internals/get-set-record":1773651887394,"../internals/set-iterate":1773651887391,"../internals/iterate-simple":1773651887392}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887398, function(require, module, exports) {

var $ = require('../internals/export');
var isDisjointFrom = require('../internals/set-is-disjoint-from');
var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like');

var INCORRECT = !setMethodAcceptSetLike('isDisjointFrom', function (result) {
  return !result;
});

// `Set.prototype.isDisjointFrom` method
// https://tc39.es/ecma262/#sec-set.prototype.isdisjointfrom
$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
  isDisjointFrom: isDisjointFrom
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/set-is-disjoint-from":1773651887399,"../internals/set-method-accept-set-like":1773651887395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887399, function(require, module, exports) {

var aSet = require('../internals/a-set');
var has = require('../internals/set-helpers').has;
var size = require('../internals/set-size');
var getSetRecord = require('../internals/get-set-record');
var iterateSet = require('../internals/set-iterate');
var iterateSimple = require('../internals/iterate-simple');
var iteratorClose = require('../internals/iterator-close');

// `Set.prototype.isDisjointFrom` method
// https://tc39.es/ecma262/#sec-set.prototype.isdisjointfrom
module.exports = function isDisjointFrom(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) <= otherRec.size) return iterateSet(O, function (e) {
    if (otherRec.includes(e)) return false;
  }, true) !== false;
  var iterator = otherRec.getIterator();
  return iterateSimple(iterator, function (e) {
    if (has(O, e)) return iteratorClose(iterator, 'normal', false);
  }) !== false;
};

}, function(modId) { var map = {"../internals/a-set":1773651887388,"../internals/set-helpers":1773651887389,"../internals/set-size":1773651887393,"../internals/get-set-record":1773651887394,"../internals/set-iterate":1773651887391,"../internals/iterate-simple":1773651887392,"../internals/iterator-close":1773651887097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887400, function(require, module, exports) {

var $ = require('../internals/export');
var isSubsetOf = require('../internals/set-is-subset-of');
var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like');

var INCORRECT = !setMethodAcceptSetLike('isSubsetOf', function (result) {
  return result;
});

// `Set.prototype.isSubsetOf` method
// https://tc39.es/ecma262/#sec-set.prototype.issubsetof
$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
  isSubsetOf: isSubsetOf
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/set-is-subset-of":1773651887401,"../internals/set-method-accept-set-like":1773651887395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887401, function(require, module, exports) {

var aSet = require('../internals/a-set');
var size = require('../internals/set-size');
var iterate = require('../internals/set-iterate');
var getSetRecord = require('../internals/get-set-record');

// `Set.prototype.isSubsetOf` method
// https://tc39.es/ecma262/#sec-set.prototype.issubsetof
module.exports = function isSubsetOf(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) > otherRec.size) return false;
  return iterate(O, function (e) {
    if (!otherRec.includes(e)) return false;
  }, true) !== false;
};

}, function(modId) { var map = {"../internals/a-set":1773651887388,"../internals/set-size":1773651887393,"../internals/set-iterate":1773651887391,"../internals/get-set-record":1773651887394}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887402, function(require, module, exports) {

var $ = require('../internals/export');
var isSupersetOf = require('../internals/set-is-superset-of');
var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like');

var INCORRECT = !setMethodAcceptSetLike('isSupersetOf', function (result) {
  return !result;
});

// `Set.prototype.isSupersetOf` method
// https://tc39.es/ecma262/#sec-set.prototype.issupersetof
$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
  isSupersetOf: isSupersetOf
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/set-is-superset-of":1773651887403,"../internals/set-method-accept-set-like":1773651887395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887403, function(require, module, exports) {

var aSet = require('../internals/a-set');
var has = require('../internals/set-helpers').has;
var size = require('../internals/set-size');
var getSetRecord = require('../internals/get-set-record');
var iterateSimple = require('../internals/iterate-simple');
var iteratorClose = require('../internals/iterator-close');

// `Set.prototype.isSupersetOf` method
// https://tc39.es/ecma262/#sec-set.prototype.issupersetof
module.exports = function isSupersetOf(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) < otherRec.size) return false;
  var iterator = otherRec.getIterator();
  return iterateSimple(iterator, function (e) {
    if (!has(O, e)) return iteratorClose(iterator, 'normal', false);
  }) !== false;
};

}, function(modId) { var map = {"../internals/a-set":1773651887388,"../internals/set-helpers":1773651887389,"../internals/set-size":1773651887393,"../internals/get-set-record":1773651887394,"../internals/iterate-simple":1773651887392,"../internals/iterator-close":1773651887097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887404, function(require, module, exports) {

var $ = require('../internals/export');
var symmetricDifference = require('../internals/set-symmetric-difference');
var setMethodGetKeysBeforeCloning = require('../internals/set-method-get-keys-before-cloning-detection');
var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like');

var FORCED = !setMethodAcceptSetLike('symmetricDifference') || !setMethodGetKeysBeforeCloning('symmetricDifference');

// `Set.prototype.symmetricDifference` method
// https://tc39.es/ecma262/#sec-set.prototype.symmetricdifference
$({ target: 'Set', proto: true, real: true, forced: FORCED }, {
  symmetricDifference: symmetricDifference
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/set-symmetric-difference":1773651887405,"../internals/set-method-get-keys-before-cloning-detection":1773651887406,"../internals/set-method-accept-set-like":1773651887395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887405, function(require, module, exports) {

var aSet = require('../internals/a-set');
var SetHelpers = require('../internals/set-helpers');
var clone = require('../internals/set-clone');
var getSetRecord = require('../internals/get-set-record');
var iterateSimple = require('../internals/iterate-simple');

var add = SetHelpers.add;
var has = SetHelpers.has;
var remove = SetHelpers.remove;

// `Set.prototype.symmetricDifference` method
// https://tc39.es/ecma262/#sec-set.prototype.symmetricdifference
module.exports = function symmetricDifference(other) {
  var O = aSet(this);
  var keysIter = getSetRecord(other).getIterator();
  var result = clone(O);
  iterateSimple(keysIter, function (e) {
    if (has(O, e)) remove(result, e);
    else add(result, e);
  });
  return result;
};

}, function(modId) { var map = {"../internals/a-set":1773651887388,"../internals/set-helpers":1773651887389,"../internals/set-clone":1773651887390,"../internals/get-set-record":1773651887394,"../internals/iterate-simple":1773651887392}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887406, function(require, module, exports) {

// Should get iterator record of a set-like object before cloning this
// https://bugs.webkit.org/show_bug.cgi?id=289430
module.exports = function (METHOD_NAME) {
  try {
    // eslint-disable-next-line es/no-set -- needed for test
    var baseSet = new Set();
    var setLike = {
      size: 0,
      has: function () { return true; },
      keys: function () {
        // eslint-disable-next-line es/no-object-defineproperty -- needed for test
        return Object.defineProperty({}, 'next', {
          get: function () {
            baseSet.clear();
            baseSet.add(4);
            return function () {
              return { done: true };
            };
          }
        });
      }
    };
    var result = baseSet[METHOD_NAME](setLike);

    return result.size === 1 && result.values().next().value === 4;
  } catch (error) {
    return false;
  }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887407, function(require, module, exports) {

var $ = require('../internals/export');
var union = require('../internals/set-union');
var setMethodGetKeysBeforeCloning = require('../internals/set-method-get-keys-before-cloning-detection');
var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like');

var FORCED = !setMethodAcceptSetLike('union') || !setMethodGetKeysBeforeCloning('union');

// `Set.prototype.union` method
// https://tc39.es/ecma262/#sec-set.prototype.union
$({ target: 'Set', proto: true, real: true, forced: FORCED }, {
  union: union
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/set-union":1773651887408,"../internals/set-method-get-keys-before-cloning-detection":1773651887406,"../internals/set-method-accept-set-like":1773651887395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887408, function(require, module, exports) {

var aSet = require('../internals/a-set');
var add = require('../internals/set-helpers').add;
var clone = require('../internals/set-clone');
var getSetRecord = require('../internals/get-set-record');
var iterateSimple = require('../internals/iterate-simple');

// `Set.prototype.union` method
// https://tc39.es/ecma262/#sec-set.prototype.union
module.exports = function union(other) {
  var O = aSet(this);
  var keysIter = getSetRecord(other).getIterator();
  var result = clone(O);
  iterateSimple(keysIter, function (it) {
    add(result, it);
  });
  return result;
};

}, function(modId) { var map = {"../internals/a-set":1773651887388,"../internals/set-helpers":1773651887389,"../internals/set-clone":1773651887390,"../internals/get-set-record":1773651887394,"../internals/iterate-simple":1773651887392}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887409, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toString = require('../internals/to-string');
var fails = require('../internals/fails');

var charAt = uncurryThis(''.charAt);

var FORCED = fails(function () {
  // eslint-disable-next-line es/no-string-prototype-at -- safe
  return '𠮷'.at(-2) !== '\uD842';
});

// `String.prototype.at` method
// https://tc39.es/ecma262/#sec-string.prototype.at
$({ target: 'String', proto: true, forced: FORCED }, {
  at: function at(index) {
    var S = toString(requireObjectCoercible(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : charAt(S, k);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/require-object-coercible":1773651886977,"../internals/to-integer-or-infinity":1773651887019,"../internals/to-string":1773651887010,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887410, function(require, module, exports) {

var $ = require('../internals/export');
var codeAt = require('../internals/string-multibyte').codeAt;

// `String.prototype.codePointAt` method
// https://tc39.es/ecma262/#sec-string.prototype.codepointat
$({ target: 'String', proto: true }, {
  codePointAt: function codePointAt(pos) {
    return codeAt(this, pos);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/string-multibyte":1773651887411}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887411, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toString = require('../internals/to-string');
var requireObjectCoercible = require('../internals/require-object-coercible');

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/to-integer-or-infinity":1773651887019,"../internals/to-string":1773651887010,"../internals/require-object-coercible":1773651886977}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887412, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this-clause');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');

var slice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = that.length;
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = toString(searchString);
    return slice(that, end - search.length, end) === search;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this-clause":1773651886966,"../internals/object-get-own-property-descriptor":1773651886970,"../internals/to-length":1773651887022,"../internals/to-string":1773651887010,"../internals/not-a-regexp":1773651887413,"../internals/require-object-coercible":1773651886977,"../internals/correct-is-regexp-logic":1773651887415,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887413, function(require, module, exports) {

var isRegExp = require('../internals/is-regexp');

var $TypeError = TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw new $TypeError("The method doesn't accept regular expressions");
  } return it;
};

}, function(modId) { var map = {"../internals/is-regexp":1773651887414}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887414, function(require, module, exports) {

var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');
};

}, function(modId) { var map = {"../internals/is-object":1773651886981,"../internals/classof-raw":1773651886967,"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887415, function(require, module, exports) {

var wellKnownSymbol = require('../internals/well-known-symbol');

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};

}, function(modId) { var map = {"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887416, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var toAbsoluteIndex = require('../internals/to-absolute-index');

var $RangeError = RangeError;
var fromCharCode = String.fromCharCode;
// eslint-disable-next-line es/no-string-fromcodepoint -- required for testing
var $fromCodePoint = String.fromCodePoint;
var join = uncurryThis([].join);

// length should be 1, old FF problem
var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length !== 1;

// `String.fromCodePoint` method
// https://tc39.es/ecma262/#sec-string.fromcodepoint
$({ target: 'String', stat: true, arity: 1, forced: INCORRECT_LENGTH }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  fromCodePoint: function fromCodePoint(x) {
    var elements = [];
    var length = arguments.length;
    var i = 0;
    var code;
    while (length > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw new $RangeError(code + ' is not a valid code point');
      elements[i] = code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00);
    } return join(elements, '');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/to-absolute-index":1773651887018}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887417, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/not-a-regexp":1773651887413,"../internals/require-object-coercible":1773651886977,"../internals/to-string":1773651887010,"../internals/correct-is-regexp-logic":1773651887415}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887418, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');

var charCodeAt = uncurryThis(''.charCodeAt);

// `String.prototype.isWellFormed` method
// https://tc39.es/ecma262/#sec-string.prototype.iswellformed
$({ target: 'String', proto: true }, {
  isWellFormed: function isWellFormed() {
    var S = toString(requireObjectCoercible(this));
    var length = S.length;
    for (var i = 0; i < length; i++) {
      var charCode = charCodeAt(S, i);
      // single UTF-16 code unit
      if ((charCode & 0xF800) !== 0xD800) continue;
      // unpaired surrogate
      if (charCode >= 0xDC00 || ++i >= length || (charCodeAt(S, i) & 0xFC00) !== 0xDC00) return false;
    } return true;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/require-object-coercible":1773651886977,"../internals/to-string":1773651887010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887419, function(require, module, exports) {

var charAt = require('../internals/string-multibyte').charAt;
var toString = require('../internals/to-string');
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/iterator-define');
var createIterResultObject = require('../internals/create-iter-result-object');

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt(string, index);
  state.index += point.length;
  return createIterResultObject(point, false);
});

}, function(modId) { var map = {"../internals/string-multibyte":1773651887411,"../internals/to-string":1773651887010,"../internals/internal-state":1773651887038,"../internals/iterator-define":1773651887132,"../internals/create-iter-result-object":1773651887136}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887420, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887421, function(require, module, exports) {

/* eslint-disable es/no-string-prototype-matchall -- safe */
var $ = require('../internals/export');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this-clause');
var createIteratorConstructor = require('../internals/iterator-create-constructor');
var createIterResultObject = require('../internals/create-iter-result-object');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var classof = require('../internals/classof-raw');
var isRegExp = require('../internals/is-regexp');
var getRegExpFlags = require('../internals/regexp-get-flags');
var getMethod = require('../internals/get-method');
var defineBuiltIn = require('../internals/define-built-in');
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var speciesConstructor = require('../internals/species-constructor');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');
var InternalStateModule = require('../internals/internal-state');
var IS_PURE = require('../internals/is-pure');

var MATCH_ALL = wellKnownSymbol('matchAll');
var REGEXP_STRING = 'RegExp String';
var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(REGEXP_STRING_ITERATOR);
var RegExpPrototype = RegExp.prototype;
var $TypeError = TypeError;
var stringIndexOf = uncurryThis(''.indexOf);
var nativeMatchAll = uncurryThis(''.matchAll);

var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails(function () {
  nativeMatchAll('a', /./);
});

var $RegExpStringIterator = createIteratorConstructor(function RegExpStringIterator(regexp, string, $global, fullUnicode) {
  setInternalState(this, {
    type: REGEXP_STRING_ITERATOR,
    regexp: regexp,
    string: string,
    global: $global,
    unicode: fullUnicode,
    done: false
  });
}, REGEXP_STRING, function next() {
  var state = getInternalState(this);
  if (state.done) return createIterResultObject(undefined, true);
  var R = state.regexp;
  var S = state.string;
  var match = regExpExec(R, S);
  if (match === null) {
    state.done = true;
    return createIterResultObject(undefined, true);
  }
  if (state.global) {
    if (toString(match[0]) === '') R.lastIndex = advanceStringIndex(S, toLength(R.lastIndex), state.unicode);
    return createIterResultObject(match, false);
  }
  state.done = true;
  return createIterResultObject(match, false);
});

var $matchAll = function (string) {
  var R = anObject(this);
  var S = toString(string);
  var C = speciesConstructor(R, RegExp);
  var flags = toString(getRegExpFlags(R));
  var matcher, $global, fullUnicode;
  matcher = new C(C === RegExp ? R.source : R, flags);
  $global = !!~stringIndexOf(flags, 'g');
  fullUnicode = !!~stringIndexOf(flags, 'u');
  matcher.lastIndex = toLength(R.lastIndex);
  return new $RegExpStringIterator(matcher, S, $global, fullUnicode);
};

// `String.prototype.matchAll` method
// https://tc39.es/ecma262/#sec-string.prototype.matchall
$({ target: 'String', proto: true, forced: WORKS_WITH_NON_GLOBAL_REGEX }, {
  matchAll: function matchAll(regexp) {
    var O = requireObjectCoercible(this);
    var flags, S, matcher, rx;
    if (isObject(regexp)) {
      if (isRegExp(regexp)) {
        flags = toString(requireObjectCoercible(getRegExpFlags(regexp)));
        if (!~stringIndexOf(flags, 'g')) throw new $TypeError('`.matchAll` does not allow non-global regexes');
      }
      if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll(O, regexp);
      matcher = getMethod(regexp, MATCH_ALL);
      if (matcher === undefined && IS_PURE && classof(regexp) === 'RegExp') matcher = $matchAll;
      if (matcher) return call(matcher, regexp, O);
    } else if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll(O, regexp);
    S = toString(O);
    rx = new RegExp(regexp, 'g');
    return IS_PURE ? call($matchAll, rx, S) : rx[MATCH_ALL](S);
  }
});

IS_PURE || MATCH_ALL in RegExpPrototype || defineBuiltIn(RegExpPrototype, MATCH_ALL, $matchAll);

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/function-uncurry-this-clause":1773651886966,"../internals/iterator-create-constructor":1773651887134,"../internals/create-iter-result-object":1773651887136,"../internals/require-object-coercible":1773651886977,"../internals/to-length":1773651887022,"../internals/to-string":1773651887010,"../internals/an-object":1773651887009,"../internals/is-object":1773651886981,"../internals/classof-raw":1773651886967,"../internals/is-regexp":1773651887414,"../internals/regexp-get-flags":1773651887422,"../internals/get-method":1773651886990,"../internals/define-built-in":1773651887031,"../internals/fails":1773651886965,"../internals/well-known-symbol":1773651886994,"../internals/species-constructor":1773651887324,"../internals/advance-string-index":1773651887425,"../internals/regexp-exec-abstract":1773651887426,"../internals/internal-state":1773651887038,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887422, function(require, module, exports) {

var call = require('../internals/function-call');
var hasOwn = require('../internals/has-own-property');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var regExpFlagsDetection = require('../internals/regexp-flags-detection');
var regExpFlagsGetterImplementation = require('../internals/regexp-flags');

var RegExpPrototype = RegExp.prototype;

module.exports = regExpFlagsDetection.correct ? function (it) {
  return it.flags;
} : function (it) {
  return (!regExpFlagsDetection.correct && isPrototypeOf(RegExpPrototype, it) && !hasOwn(it, 'flags'))
    ? call(regExpFlagsGetterImplementation, it)
    : it.flags;
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/has-own-property":1773651886999,"../internals/object-is-prototype-of":1773651886985,"../internals/regexp-flags-detection":1773651887423,"../internals/regexp-flags":1773651887424}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887423, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var fails = require('../internals/fails');

// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
var RegExp = globalThis.RegExp;

var FLAGS_GETTER_IS_CORRECT = !fails(function () {
  var INDICES_SUPPORT = true;
  try {
    RegExp('.', 'd');
  } catch (error) {
    INDICES_SUPPORT = false;
  }

  var O = {};
  // modern V8 bug
  var calls = '';
  var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy';

  var addGetter = function (key, chr) {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty(O, key, { get: function () {
      calls += chr;
      return true;
    } });
  };

  var pairs = {
    dotAll: 's',
    global: 'g',
    ignoreCase: 'i',
    multiline: 'm',
    sticky: 'y'
  };

  if (INDICES_SUPPORT) pairs.hasIndices = 'd';

  for (var key in pairs) addGetter(key, pairs[key]);

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var result = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call(O);

  return result !== expected || calls !== expected;
});

module.exports = { correct: FLAGS_GETTER_IS_CORRECT };

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887424, function(require, module, exports) {

var anObject = require('../internals/an-object');

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

}, function(modId) { var map = {"../internals/an-object":1773651887009}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887425, function(require, module, exports) {

var charAt = require('../internals/string-multibyte').charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

}, function(modId) { var map = {"../internals/string-multibyte":1773651887411}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887426, function(require, module, exports) {

var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var isCallable = require('../internals/is-callable');
var classof = require('../internals/classof-raw');
var regexpExec = require('../internals/regexp-exec');

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw new $TypeError('RegExp#exec called on incompatible receiver');
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/an-object":1773651887009,"../internals/is-callable":1773651886969,"../internals/classof-raw":1773651886967,"../internals/regexp-exec":1773651887427}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887427, function(require, module, exports) {

module.exports = /./.exec;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887428, function(require, module, exports) {

var $ = require('../internals/export');
var $padEnd = require('../internals/string-pad').end;
var WEBKIT_BUG = require('../internals/string-pad-webkit-bug');

// `String.prototype.padEnd` method
// https://tc39.es/ecma262/#sec-string.prototype.padend
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/string-pad":1773651887183,"../internals/string-pad-webkit-bug":1773651887429}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887429, function(require, module, exports) {

// https://github.com/zloirock/core-js/issues/280
var userAgent = require('../internals/environment-user-agent');

module.exports = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent);

}, function(modId) { var map = {"../internals/environment-user-agent":1773651886989}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887430, function(require, module, exports) {

var $ = require('../internals/export');
var $padStart = require('../internals/string-pad').start;
var WEBKIT_BUG = require('../internals/string-pad-webkit-bug');

// `String.prototype.padStart` method
// https://tc39.es/ecma262/#sec-string.prototype.padstart
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/string-pad":1773651887183,"../internals/string-pad-webkit-bug":1773651887429}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887431, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var toIndexedObject = require('../internals/to-indexed-object');
var toObject = require('../internals/to-object');
var toString = require('../internals/to-string');
var lengthOfArrayLike = require('../internals/length-of-array-like');

var push = uncurryThis([].push);
var join = uncurryThis([].join);

// `String.raw` method
// https://tc39.es/ecma262/#sec-string.raw
$({ target: 'String', stat: true }, {
  raw: function raw(template) {
    var rawTemplate = toIndexedObject(toObject(template).raw);
    var literalSegments = lengthOfArrayLike(rawTemplate);
    if (!literalSegments) return '';
    var argumentsLength = arguments.length;
    var elements = [];
    var i = 0;
    while (true) {
      push(elements, toString(rawTemplate[i++]));
      if (i === literalSegments) return join(elements, '');
      if (i < argumentsLength) push(elements, toString(arguments[i]));
    }
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/to-indexed-object":1773651886975,"../internals/to-object":1773651887000,"../internals/to-string":1773651887010,"../internals/length-of-array-like":1773651887021}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887432, function(require, module, exports) {

var $ = require('../internals/export');
var repeat = require('../internals/string-repeat');

// `String.prototype.repeat` method
// https://tc39.es/ecma262/#sec-string.prototype.repeat
$({ target: 'String', proto: true }, {
  repeat: repeat
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/string-repeat":1773651887184}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887433, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887434, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var isCallable = require('../internals/is-callable');
var isObject = require('../internals/is-object');
var isRegExp = require('../internals/is-regexp');
var toString = require('../internals/to-string');
var getMethod = require('../internals/get-method');
var getRegExpFlags = require('../internals/regexp-get-flags');
var getSubstitution = require('../internals/get-substitution');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var REPLACE = wellKnownSymbol('replace');
var $TypeError = TypeError;
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var max = Math.max;

// `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall
$({ target: 'String', proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, position, replacement;
    var endOfLastMatch = 0;
    var result = '';
    if (isObject(searchValue)) {
      IS_REG_EXP = isRegExp(searchValue);
      if (IS_REG_EXP) {
        flags = toString(requireObjectCoercible(getRegExpFlags(searchValue)));
        if (!~indexOf(flags, 'g')) throw new $TypeError('`.replaceAll` does not allow non-global regexes');
      }
      replacer = getMethod(searchValue, REPLACE);
      if (replacer) return call(replacer, searchValue, O, replaceValue);
      if (IS_PURE && IS_REG_EXP) return replace(toString(O), searchValue, replaceValue);
    }
    string = toString(O);
    searchString = toString(searchValue);
    functionalReplace = isCallable(replaceValue);
    if (!functionalReplace) replaceValue = toString(replaceValue);
    searchLength = searchString.length;
    advanceBy = max(1, searchLength);
    position = indexOf(string, searchString);
    while (position !== -1) {
      replacement = functionalReplace
        ? toString(replaceValue(searchString, position, string))
        : getSubstitution(searchString, string, position, [], undefined, replaceValue);
      result += stringSlice(string, endOfLastMatch, position) + replacement;
      endOfLastMatch = position + searchLength;
      position = position + advanceBy > string.length ? -1 : indexOf(string, searchString, position + advanceBy);
    }
    if (endOfLastMatch < string.length) {
      result += stringSlice(string, endOfLastMatch);
    }
    return result;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/function-uncurry-this":1773651886968,"../internals/require-object-coercible":1773651886977,"../internals/is-callable":1773651886969,"../internals/is-object":1773651886981,"../internals/is-regexp":1773651887414,"../internals/to-string":1773651887010,"../internals/get-method":1773651886990,"../internals/regexp-get-flags":1773651887422,"../internals/get-substitution":1773651887435,"../internals/well-known-symbol":1773651886994,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887435, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var toObject = require('../internals/to-object');

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
// eslint-disable-next-line redos/no-vulnerable -- safe
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/to-object":1773651887000}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887436, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887437, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887438, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this-clause');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var toLength = require('../internals/to-length');
var toString = require('../internals/to-string');
var notARegExp = require('../internals/not-a-regexp');
var requireObjectCoercible = require('../internals/require-object-coercible');
var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic');
var IS_PURE = require('../internals/is-pure');

var stringSlice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = toString(searchString);
    return stringSlice(that, index, index + search.length) === search;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this-clause":1773651886966,"../internals/object-get-own-property-descriptor":1773651886970,"../internals/to-length":1773651887022,"../internals/to-string":1773651887010,"../internals/not-a-regexp":1773651887413,"../internals/require-object-coercible":1773651886977,"../internals/correct-is-regexp-logic":1773651887415,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887439, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toString = require('../internals/to-string');

var stringSlice = uncurryThis(''.slice);
var max = Math.max;
var min = Math.min;

// eslint-disable-next-line unicorn/prefer-string-slice -- required for testing
var FORCED = !''.substr || 'ab'.substr(-1) !== 'b';

// `String.prototype.substr` method
// https://tc39.es/ecma262/#sec-string.prototype.substr
$({ target: 'String', proto: true, forced: FORCED }, {
  substr: function substr(start, length) {
    var that = toString(requireObjectCoercible(this));
    var size = that.length;
    var intStart = toIntegerOrInfinity(start);
    var intLength, intEnd;
    if (intStart === Infinity) intStart = 0;
    if (intStart < 0) intStart = max(size + intStart, 0);
    intLength = length === undefined ? size : toIntegerOrInfinity(length);
    if (intLength <= 0 || intLength === Infinity) return '';
    intEnd = min(intStart + intLength, size);
    return intStart >= intEnd ? '' : stringSlice(that, intStart, intEnd);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/require-object-coercible":1773651886977,"../internals/to-integer-or-infinity":1773651887019,"../internals/to-string":1773651887010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887440, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');
var fails = require('../internals/fails');

var $Array = Array;
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var join = uncurryThis([].join);
// eslint-disable-next-line es/no-string-prototype-towellformed -- safe
var $toWellFormed = ''.toWellFormed;
var REPLACEMENT_CHARACTER = '\uFFFD';

// Safari bug
var TO_STRING_CONVERSION_BUG = $toWellFormed && fails(function () {
  return call($toWellFormed, 1) !== '1';
});

// `String.prototype.toWellFormed` method
// https://tc39.es/ecma262/#sec-string.prototype.towellformed
$({ target: 'String', proto: true, forced: TO_STRING_CONVERSION_BUG }, {
  toWellFormed: function toWellFormed() {
    var S = toString(requireObjectCoercible(this));
    if (TO_STRING_CONVERSION_BUG) return call($toWellFormed, S);
    var length = S.length;
    var result = $Array(length);
    for (var i = 0; i < length; i++) {
      var charCode = charCodeAt(S, i);
      // single UTF-16 code unit
      if ((charCode & 0xF800) !== 0xD800) result[i] = charAt(S, i);
      // unpaired surrogate
      else if (charCode >= 0xDC00 || i + 1 >= length || (charCodeAt(S, i + 1) & 0xFC00) !== 0xDC00) result[i] = REPLACEMENT_CHARACTER;
      // surrogate pair
      else {
        result[i] = charAt(S, i);
        result[++i] = charAt(S, i);
      }
    } return join(result, '');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/function-uncurry-this":1773651886968,"../internals/require-object-coercible":1773651886977,"../internals/to-string":1773651887010,"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887441, function(require, module, exports) {

var $ = require('../internals/export');
var $trim = require('../internals/string-trim').trim;
var forcedStringTrimMethod = require('../internals/string-trim-forced');

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/string-trim":1773651887270,"../internals/string-trim-forced":1773651887442}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887442, function(require, module, exports) {

var PROPER_FUNCTION_NAME = require('../internals/function-name').PROPER;
var fails = require('../internals/fails');
var whitespaces = require('../internals/whitespaces');

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  });
};

}, function(modId) { var map = {"../internals/function-name":1773651887133,"../internals/fails":1773651886965,"../internals/whitespaces":1773651887271}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887443, function(require, module, exports) {

// TODO: Remove this line from `core-js@4`
require('../modules/es.string.trim-right');
var $ = require('../internals/export');
var trimEnd = require('../internals/string-trim-end');

// `String.prototype.trimEnd` method
// https://tc39.es/ecma262/#sec-string.prototype.trimend
// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
$({ target: 'String', proto: true, name: 'trimEnd', forced: ''.trimEnd !== trimEnd }, {
  trimEnd: trimEnd
});

}, function(modId) { var map = {"../modules/es.string.trim-right":1773651887444,"../internals/export":1773651886961,"../internals/string-trim-end":1773651887445}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887444, function(require, module, exports) {

var $ = require('../internals/export');
var trimEnd = require('../internals/string-trim-end');

// `String.prototype.trimRight` method
// https://tc39.es/ecma262/#sec-string.prototype.trimend
// eslint-disable-next-line es/no-string-prototype-trimleft-trimright -- safe
$({ target: 'String', proto: true, name: 'trimEnd', forced: ''.trimRight !== trimEnd }, {
  trimRight: trimEnd
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/string-trim-end":1773651887445}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887445, function(require, module, exports) {

var $trimEnd = require('../internals/string-trim').end;
var forcedStringTrimMethod = require('../internals/string-trim-forced');

// `String.prototype.{ trimEnd, trimRight }` method
// https://tc39.es/ecma262/#sec-string.prototype.trimend
// https://tc39.es/ecma262/#String.prototype.trimright
module.exports = forcedStringTrimMethod('trimEnd') ? function trimEnd() {
  return $trimEnd(this);
// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
} : ''.trimEnd;

}, function(modId) { var map = {"../internals/string-trim":1773651887270,"../internals/string-trim-forced":1773651887442}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887446, function(require, module, exports) {

// TODO: Remove this line from `core-js@4`
require('../modules/es.string.trim-left');
var $ = require('../internals/export');
var trimStart = require('../internals/string-trim-start');

// `String.prototype.trimStart` method
// https://tc39.es/ecma262/#sec-string.prototype.trimstart
// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
$({ target: 'String', proto: true, name: 'trimStart', forced: ''.trimStart !== trimStart }, {
  trimStart: trimStart
});

}, function(modId) { var map = {"../modules/es.string.trim-left":1773651887447,"../internals/export":1773651886961,"../internals/string-trim-start":1773651887448}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887447, function(require, module, exports) {

var $ = require('../internals/export');
var trimStart = require('../internals/string-trim-start');

// `String.prototype.trimLeft` method
// https://tc39.es/ecma262/#sec-string.prototype.trimleft
// eslint-disable-next-line es/no-string-prototype-trimleft-trimright -- safe
$({ target: 'String', proto: true, name: 'trimStart', forced: ''.trimLeft !== trimStart }, {
  trimLeft: trimStart
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/string-trim-start":1773651887448}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887448, function(require, module, exports) {

var $trimStart = require('../internals/string-trim').start;
var forcedStringTrimMethod = require('../internals/string-trim-forced');

// `String.prototype.{ trimStart, trimLeft }` method
// https://tc39.es/ecma262/#sec-string.prototype.trimstart
// https://tc39.es/ecma262/#String.prototype.trimleft
module.exports = forcedStringTrimMethod('trimStart') ? function trimStart() {
  return $trimStart(this);
// eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
} : ''.trimStart;

}, function(modId) { var map = {"../internals/string-trim":1773651887270,"../internals/string-trim-forced":1773651887442}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887449, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.anchor` method
// https://tc39.es/ecma262/#sec-string.prototype.anchor
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('anchor') }, {
  anchor: function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887450, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');

var quot = /"/g;
var replace = uncurryThis(''.replace);

// `CreateHTML` abstract operation
// https://tc39.es/ecma262/#sec-createhtml
module.exports = function (string, tag, attribute, value) {
  var S = toString(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + replace(toString(value), quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/require-object-coercible":1773651886977,"../internals/to-string":1773651887010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887451, function(require, module, exports) {

var fails = require('../internals/fails');

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
module.exports = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};

}, function(modId) { var map = {"../internals/fails":1773651886965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887452, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.big` method
// https://tc39.es/ecma262/#sec-string.prototype.big
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('big') }, {
  big: function big() {
    return createHTML(this, 'big', '', '');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887453, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.blink` method
// https://tc39.es/ecma262/#sec-string.prototype.blink
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('blink') }, {
  blink: function blink() {
    return createHTML(this, 'blink', '', '');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887454, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.bold` method
// https://tc39.es/ecma262/#sec-string.prototype.bold
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('bold') }, {
  bold: function bold() {
    return createHTML(this, 'b', '', '');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887455, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.fixed` method
// https://tc39.es/ecma262/#sec-string.prototype.fixed
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fixed') }, {
  fixed: function fixed() {
    return createHTML(this, 'tt', '', '');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887456, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.fontcolor` method
// https://tc39.es/ecma262/#sec-string.prototype.fontcolor
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fontcolor') }, {
  fontcolor: function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887457, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.fontsize` method
// https://tc39.es/ecma262/#sec-string.prototype.fontsize
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fontsize') }, {
  fontsize: function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887458, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.italics` method
// https://tc39.es/ecma262/#sec-string.prototype.italics
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('italics') }, {
  italics: function italics() {
    return createHTML(this, 'i', '', '');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887459, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.link` method
// https://tc39.es/ecma262/#sec-string.prototype.link
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('link') }, {
  link: function link(url) {
    return createHTML(this, 'a', 'href', url);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887460, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.small` method
// https://tc39.es/ecma262/#sec-string.prototype.small
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('small') }, {
  small: function small() {
    return createHTML(this, 'small', '', '');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887461, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.strike` method
// https://tc39.es/ecma262/#sec-string.prototype.strike
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('strike') }, {
  strike: function strike() {
    return createHTML(this, 'strike', '', '');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887462, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.sub` method
// https://tc39.es/ecma262/#sec-string.prototype.sub
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sub') }, {
  sub: function sub() {
    return createHTML(this, 'sub', '', '');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887463, function(require, module, exports) {

var $ = require('../internals/export');
var createHTML = require('../internals/create-html');
var forcedStringHTMLMethod = require('../internals/string-html-forced');

// `String.prototype.sup` method
// https://tc39.es/ecma262/#sec-string.prototype.sup
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sup') }, {
  sup: function sup() {
    return createHTML(this, 'sup', '', '');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/create-html":1773651887450,"../internals/string-html-forced":1773651887451}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887464, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887465, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887466, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887467, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887468, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887469, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887470, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887471, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887472, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887473, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887474, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887475, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887476, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887477, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887478, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887479, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887480, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887481, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887482, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887483, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887484, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887485, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887486, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887487, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887488, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887489, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887490, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887491, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887492, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887493, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887494, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887495, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887496, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887497, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887498, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887499, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887500, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887501, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887502, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887503, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887504, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887505, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887506, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887507, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887508, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887509, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887510, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var toString = require('../internals/to-string');

var fromCharCode = String.fromCharCode;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(/./.exec);
var stringSlice = uncurryThis(''.slice);

var hex2 = /^[\da-f]{2}$/i;
var hex4 = /^[\da-f]{4}$/i;

// `unescape` method
// https://tc39.es/ecma262/#sec-unescape-string
$({ global: true }, {
  unescape: function unescape(string) {
    var str = toString(string);
    var result = '';
    var length = str.length;
    var index = 0;
    var chr, part;
    while (index < length) {
      chr = charAt(str, index++);
      if (chr === '%') {
        if (charAt(str, index) === 'u') {
          part = stringSlice(str, index + 1, index + 5);
          if (exec(hex4, part)) {
            result += fromCharCode(parseInt(part, 16));
            index += 5;
            continue;
          }
        } else {
          part = stringSlice(str, index, index + 2);
          if (exec(hex2, part)) {
            result += fromCharCode(parseInt(part, 16));
            index += 2;
            continue;
          }
        }
      }
      result += chr;
    } return result;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/to-string":1773651887010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887511, function(require, module, exports) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
require('../modules/es.weak-map.constructor');

}, function(modId) { var map = {"../modules/es.weak-map.constructor":1773651887512}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887512, function(require, module, exports) {

var FREEZING = require('../internals/freezing');
var globalThis = require('../internals/global-this');
var uncurryThis = require('../internals/function-uncurry-this');
var defineBuiltIns = require('../internals/define-built-ins');
var InternalMetadataModule = require('../internals/internal-metadata');
var collection = require('../internals/collection');
var collectionWeak = require('../internals/collection-weak');
var isObject = require('../internals/is-object');
var enforceInternalState = require('../internals/internal-state').enforce;
var fails = require('../internals/fails');
var NATIVE_WEAK_MAP = require('../internals/weak-map-basic-detection');

var $Object = Object;
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray = Array.isArray;
// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = $Object.isExtensible;
// eslint-disable-next-line es/no-object-isfrozen -- safe
var isFrozen = $Object.isFrozen;
// eslint-disable-next-line es/no-object-issealed -- safe
var isSealed = $Object.isSealed;
// eslint-disable-next-line es/no-object-freeze -- safe
var freeze = $Object.freeze;
// eslint-disable-next-line es/no-object-seal -- safe
var seal = $Object.seal;

var IS_IE11 = !globalThis.ActiveXObject && 'ActiveXObject' in globalThis;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor
var $WeakMap = collection('WeakMap', wrapper, collectionWeak);
var WeakMapPrototype = $WeakMap.prototype;
var nativeSet = uncurryThis(WeakMapPrototype.set);

// Chakra Edge bug: adding frozen arrays to WeakMap unfreeze them
var hasMSEdgeFreezingBug = function () {
  return FREEZING && fails(function () {
    var frozenArray = freeze([]);
    nativeSet(new $WeakMap(), frozenArray, 1);
    return !isFrozen(frozenArray);
  });
};

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP) if (IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.enable();
  var nativeDelete = uncurryThis(WeakMapPrototype['delete']);
  var nativeHas = uncurryThis(WeakMapPrototype.has);
  var nativeGet = uncurryThis(WeakMapPrototype.get);
  defineBuiltIns(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete(this, key) || state.frozen['delete'](key);
      } return nativeDelete(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) || state.frozen.has(key);
      } return nativeHas(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
      } return nativeGet(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
      } else nativeSet(this, key, value);
      return this;
    }
  });
// Chakra Edge frozen keys fix
} else if (hasMSEdgeFreezingBug()) {
  defineBuiltIns(WeakMapPrototype, {
    set: function set(key, value) {
      var arrayIntegrityLevel;
      if (isArray(key)) {
        if (isFrozen(key)) arrayIntegrityLevel = freeze;
        else if (isSealed(key)) arrayIntegrityLevel = seal;
      }
      nativeSet(this, key, value);
      if (arrayIntegrityLevel) arrayIntegrityLevel(key);
      return this;
    }
  });
}

}, function(modId) { var map = {"../internals/freezing":1773651887225,"../internals/global-this":1773651886962,"../internals/function-uncurry-this":1773651886968,"../internals/define-built-ins":1773651887190,"../internals/internal-metadata":1773651887230,"../internals/collection":1773651887229,"../internals/collection-weak":1773651887513,"../internals/is-object":1773651886981,"../internals/internal-state":1773651887038,"../internals/fails":1773651886965,"../internals/weak-map-basic-detection":1773651887039}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887513, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var defineBuiltIns = require('../internals/define-built-ins');
var getWeakData = require('../internals/internal-metadata').getWeakData;
var anInstance = require('../internals/an-instance');
var anObject = require('../internals/an-object');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var isObject = require('../internals/is-object');
var iterate = require('../internals/iterate');
var ArrayIterationModule = require('../internals/array-iteration');
var hasOwn = require('../internals/has-own-property');
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var splice = uncurryThis([].splice);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (state) {
  return state.frozen || (state.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) splice(this.entries, index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: null
      });
      if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    defineBuiltIns(Prototype, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && hasOwn(data, state.id) && delete data[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && hasOwn(data, state.id);
      }
    });

    defineBuiltIns(Prototype, IS_MAP ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          if (data) return data[state.id];
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return Constructor;
  }
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/define-built-ins":1773651887190,"../internals/internal-metadata":1773651887230,"../internals/an-instance":1773651887189,"../internals/an-object":1773651887009,"../internals/is-null-or-undefined":1773651886978,"../internals/is-object":1773651886981,"../internals/iterate":1773651887092,"../internals/array-iteration":1773651887040,"../internals/has-own-property":1773651886999,"../internals/internal-state":1773651887038}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887514, function(require, module, exports) {

var $ = require('../internals/export');
var aWeakMap = require('../internals/a-weak-map');
var WeakMapHelpers = require('../internals/weak-map-helpers');
var IS_PURE = require('../internals/is-pure');

var get = WeakMapHelpers.get;
var has = WeakMapHelpers.has;
var set = WeakMapHelpers.set;

// `WeakMap.prototype.getOrInsert` method
// https://github.com/tc39/proposal-upsert
$({ target: 'WeakMap', proto: true, real: true, forced: IS_PURE }, {
  getOrInsert: function getOrInsert(key, value) {
    if (has(aWeakMap(this), key)) return get(this, key);
    set(this, key, value);
    return value;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-weak-map":1773651887515,"../internals/weak-map-helpers":1773651887516,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887515, function(require, module, exports) {

var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

// Perform ? RequireInternalSlot(M, [[WeakMapData]])
module.exports = function (it) {
  if (typeof it == 'object' && 'has' in it && 'get' in it && 'set' in it && 'delete') return it;
  throw new $TypeError(tryToString(it) + ' is not a weakmap');
};

}, function(modId) { var map = {"../internals/try-to-string":1773651886992}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887516, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var caller = require('../internals/caller');

module.exports = {
  WeakMap: getBuiltIn('WeakMap'),
  set: caller('set', 2),
  get: caller('get', 1),
  has: caller('has', 1),
  remove: caller('delete', 1)
};

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/caller":1773651887236}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887517, function(require, module, exports) {

var $ = require('../internals/export');
var aCallable = require('../internals/a-callable');
var aWeakMap = require('../internals/a-weak-map');
var aWeakKey = require('../internals/a-weak-key');
var WeakMapHelpers = require('../internals/weak-map-helpers');
var IS_PURE = require('../internals/is-pure');

var get = WeakMapHelpers.get;
var has = WeakMapHelpers.has;
var set = WeakMapHelpers.set;

var FORCED = IS_PURE || !function () {
  try {
    // eslint-disable-next-line es/no-weak-map, no-throw-literal -- testing
    if (WeakMap.prototype.getOrInsertComputed) new WeakMap().getOrInsertComputed(1, function () { throw 1; });
  } catch (error) {
    // FF144 Nightly - Beta 3 bug
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1988369
    return error instanceof TypeError;
  }
}();

// `WeakMap.prototype.getOrInsertComputed` method
// https://github.com/tc39/proposal-upsert
$({ target: 'WeakMap', proto: true, real: true, forced: FORCED }, {
  getOrInsertComputed: function getOrInsertComputed(key, callbackfn) {
    aWeakMap(this);
    aWeakKey(key);
    aCallable(callbackfn);
    if (has(this, key)) return get(this, key);
    var value = callbackfn(key);
    set(this, key, value);
    return value;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-callable":1773651886991,"../internals/a-weak-map":1773651887515,"../internals/a-weak-key":1773651887518,"../internals/weak-map-helpers":1773651887516,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887518, function(require, module, exports) {

var WeakMapHelpers = require('../internals/weak-map-helpers');

var weakmap = new WeakMapHelpers.WeakMap();
var set = WeakMapHelpers.set;
var remove = WeakMapHelpers.remove;

module.exports = function (key) {
  set(weakmap, key, 1);
  remove(weakmap, key);
  return key;
};

}, function(modId) { var map = {"../internals/weak-map-helpers":1773651887516}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887519, function(require, module, exports) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
require('../modules/es.weak-set.constructor');

}, function(modId) { var map = {"../modules/es.weak-set.constructor":1773651887520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887520, function(require, module, exports) {

var collection = require('../internals/collection');
var collectionWeak = require('../internals/collection-weak');

// `WeakSet` constructor
// https://tc39.es/ecma262/#sec-weakset-constructor
collection('WeakSet', function (init) {
  return function WeakSet() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionWeak);

}, function(modId) { var map = {"../internals/collection":1773651887229,"../internals/collection-weak":1773651887513}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887521, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.aggregate-error');

}, function(modId) { var map = {"../modules/es.aggregate-error":1773651887088}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887522, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.suppressed-error.constructor');

}, function(modId) { var map = {"../modules/es.suppressed-error.constructor":1773651887099}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887523, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.array.from-async');

}, function(modId) { var map = {"../modules/es.array.from-async":1773651887351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887524, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.array.at');

}, function(modId) { var map = {"../modules/es.array.at":1773651887100}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887525, function(require, module, exports) {

// TODO: remove from `core-js@4`
var $ = require('../internals/export');
var $filterReject = require('../internals/array-iteration').filterReject;
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.filterOut` method
// https://github.com/tc39/proposal-array-filtering
$({ target: 'Array', proto: true, forced: true }, {
  filterOut: function filterOut(callbackfn /* , thisArg */) {
    return $filterReject(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

addToUnscopables('filterOut');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-iteration":1773651887040,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887526, function(require, module, exports) {

var $ = require('../internals/export');
var $filterReject = require('../internals/array-iteration').filterReject;
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.filterReject` method
// https://github.com/tc39/proposal-array-filtering
$({ target: 'Array', proto: true, forced: true }, {
  filterReject: function filterReject(callbackfn /* , thisArg */) {
    return $filterReject(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

addToUnscopables('filterReject');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-iteration":1773651887040,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887527, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.array.find-last');

}, function(modId) { var map = {"../modules/es.array.find-last":1773651887116}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887528, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.array.find-last-index');

}, function(modId) { var map = {"../modules/es.array.find-last-index":1773651887118}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887529, function(require, module, exports) {

var $ = require('../internals/export');
var $group = require('../internals/array-group');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.group` method
// https://github.com/tc39/proposal-array-grouping
$({ target: 'Array', proto: true }, {
  group: function group(callbackfn /* , thisArg */) {
    var thisArg = arguments.length > 1 ? arguments[1] : undefined;
    return $group(this, callbackfn, thisArg);
  }
});

addToUnscopables('group');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-group":1773651887530,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887530, function(require, module, exports) {

var bind = require('../internals/function-bind-context');
var uncurryThis = require('../internals/function-uncurry-this');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var toPropertyKey = require('../internals/to-property-key');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var objectCreate = require('../internals/object-create');
var arrayFromConstructorAndList = require('../internals/array-from-constructor-and-list');

var $Array = Array;
var push = uncurryThis([].push);

module.exports = function ($this, callbackfn, that, specificConstructor) {
  var O = toObject($this);
  var self = IndexedObject(O);
  var boundFunction = bind(callbackfn, that);
  var target = objectCreate(null);
  var length = lengthOfArrayLike(self);
  var index = 0;
  var Constructor, key, value;
  for (;length > index; index++) {
    value = self[index];
    key = toPropertyKey(boundFunction(value, index, O));
    // in some IE versions, `hasOwnProperty` returns incorrect result on integer keys
    // but since it's a `null` prototype object, we can safely use `in`
    if (key in target) push(target[key], value);
    else target[key] = [value];
  }
  // TODO: Remove this block from `core-js@4`
  if (specificConstructor) {
    Constructor = specificConstructor(O);
    if (Constructor !== $Array) {
      for (key in target) target[key] = arrayFromConstructorAndList(Constructor, target[key]);
    }
  } return target;
};

}, function(modId) { var map = {"../internals/function-bind-context":1773651887005,"../internals/function-uncurry-this":1773651886968,"../internals/indexed-object":1773651886976,"../internals/to-object":1773651887000,"../internals/to-property-key":1773651886979,"../internals/length-of-array-like":1773651887021,"../internals/object-create":1773651887013,"../internals/array-from-constructor-and-list":1773651887161}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887531, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var $group = require('../internals/array-group');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var addToUnscopables = require('../internals/add-to-unscopables');

// `Array.prototype.groupBy` method
// https://github.com/tc39/proposal-array-grouping
// https://bugs.webkit.org/show_bug.cgi?id=236541
$({ target: 'Array', proto: true, forced: !arrayMethodIsStrict('groupBy') }, {
  groupBy: function groupBy(callbackfn /* , thisArg */) {
    var thisArg = arguments.length > 1 ? arguments[1] : undefined;
    return $group(this, callbackfn, thisArg);
  }
});

addToUnscopables('groupBy');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-group":1773651887530,"../internals/array-method-is-strict":1773651887110,"../internals/add-to-unscopables":1773651887101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887532, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var addToUnscopables = require('../internals/add-to-unscopables');
var $groupToMap = require('../internals/array-group-to-map');
var IS_PURE = require('../internals/is-pure');

// `Array.prototype.groupByToMap` method
// https://github.com/tc39/proposal-array-grouping
// https://bugs.webkit.org/show_bug.cgi?id=236541
$({ target: 'Array', proto: true, name: 'groupToMap', forced: IS_PURE || !arrayMethodIsStrict('groupByToMap') }, {
  groupByToMap: $groupToMap
});

addToUnscopables('groupByToMap');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/array-method-is-strict":1773651887110,"../internals/add-to-unscopables":1773651887101,"../internals/array-group-to-map":1773651887533,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887533, function(require, module, exports) {

var bind = require('../internals/function-bind-context');
var uncurryThis = require('../internals/function-uncurry-this');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var MapHelpers = require('../internals/map-helpers');

var Map = MapHelpers.Map;
var mapGet = MapHelpers.get;
var mapHas = MapHelpers.has;
var mapSet = MapHelpers.set;
var push = uncurryThis([].push);

// `Array.prototype.groupToMap` method
// https://github.com/tc39/proposal-array-grouping
module.exports = function groupToMap(callbackfn /* , thisArg */) {
  var O = toObject(this);
  var self = IndexedObject(O);
  var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  var map = new Map();
  var length = lengthOfArrayLike(self);
  var index = 0;
  var key, value;
  for (;length > index; index++) {
    value = self[index];
    key = boundFunction(value, index, O);
    if (mapHas(map, key)) push(mapGet(map, key), value);
    else mapSet(map, key, [value]);
  } return map;
};

}, function(modId) { var map = {"../internals/function-bind-context":1773651887005,"../internals/function-uncurry-this":1773651886968,"../internals/indexed-object":1773651886976,"../internals/to-object":1773651887000,"../internals/length-of-array-like":1773651887021,"../internals/map-helpers":1773651887235}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887534, function(require, module, exports) {

var $ = require('../internals/export');
var addToUnscopables = require('../internals/add-to-unscopables');
var $groupToMap = require('../internals/array-group-to-map');
var IS_PURE = require('../internals/is-pure');

// `Array.prototype.groupToMap` method
// https://github.com/tc39/proposal-array-grouping
$({ target: 'Array', proto: true, forced: IS_PURE }, {
  groupToMap: $groupToMap
});

addToUnscopables('groupToMap');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/add-to-unscopables":1773651887101,"../internals/array-group-to-map":1773651887533,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887535, function(require, module, exports) {

var $ = require('../internals/export');
var isArray = require('../internals/is-array');

// eslint-disable-next-line es/no-object-isfrozen -- safe
var isFrozen = Object.isFrozen;

var isFrozenStringArray = function (array, allowUndefined) {
  if (!isFrozen || !isArray(array) || !isFrozen(array)) return false;
  var index = 0;
  var length = array.length;
  var element;
  while (index < length) {
    element = array[index++];
    if (!(typeof element == 'string' || (allowUndefined && element === undefined))) {
      return false;
    }
  } return length !== 0;
};

// `Array.isTemplateObject` method
// https://github.com/tc39/proposal-array-is-template-object
$({ target: 'Array', stat: true, sham: true, forced: true }, {
  isTemplateObject: function isTemplateObject(value) {
    if (!isFrozenStringArray(value, true)) return false;
    var raw = value.raw;
    return raw.length === value.length && isFrozenStringArray(raw, false);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/is-array":1773651887043}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887536, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887537, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887538, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.array.to-reversed');

}, function(modId) { var map = {"../modules/es.array.to-reversed":1773651887159}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887539, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.array.to-sorted');

}, function(modId) { var map = {"../modules/es.array.to-sorted":1773651887160}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887540, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.array.to-spliced');

}, function(modId) { var map = {"../modules/es.array.to-spliced":1773651887163}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887541, function(require, module, exports) {

var $ = require('../internals/export');
var addToUnscopables = require('../internals/add-to-unscopables');
var uniqueBy = require('../internals/array-unique-by');

// `Array.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
$({ target: 'Array', proto: true, forced: true }, {
  uniqueBy: uniqueBy
});

addToUnscopables('uniqueBy');

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/add-to-unscopables":1773651887101,"../internals/array-unique-by":1773651887542}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887542, function(require, module, exports) {

var aCallable = require('../internals/a-callable');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var toObject = require('../internals/to-object');
var createProperty = require('../internals/create-property');
var MapHelpers = require('../internals/map-helpers');
var iterate = require('../internals/map-iterate');

var Map = MapHelpers.Map;
var mapHas = MapHelpers.has;
var mapSet = MapHelpers.set;

// `Array.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
module.exports = function uniqueBy(resolver) {
  var that = toObject(this);
  var length = lengthOfArrayLike(that);
  var result = [];
  var map = new Map();
  var resolverFunction = !isNullOrUndefined(resolver) ? aCallable(resolver) : function (value) {
    return value;
  };
  var index, item, key;
  for (index = 0; index < length; index++) {
    item = that[index];
    key = resolverFunction(item);
    if (!mapHas(map, key)) mapSet(map, key, item);
  }
  index = 0;
  iterate(map, function (value) {
    createProperty(result, index++, value);
  });
  return result;
};

}, function(modId) { var map = {"../internals/a-callable":1773651886991,"../internals/is-null-or-undefined":1773651886978,"../internals/length-of-array-like":1773651887021,"../internals/to-object":1773651887000,"../internals/create-property":1773651887046,"../internals/map-helpers":1773651887235,"../internals/map-iterate":1773651887543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887543, function(require, module, exports) {

var iterateSimple = require('../internals/iterate-simple');

module.exports = function (map, fn, interruptible) {
  return interruptible ? iterateSimple(map.entries(), function (entry) {
    return fn(entry[1], entry[0]);
  }, true) : map.forEach(fn);
};

}, function(modId) { var map = {"../internals/iterate-simple":1773651887392}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887544, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.array.with');

}, function(modId) { var map = {"../modules/es.array.with":1773651887167}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887545, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887546, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887547, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887548, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.async-disposable-stack.constructor');

}, function(modId) { var map = {"../modules/es.async-disposable-stack.constructor":1773651887358}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887549, function(require, module, exports) {

var $ = require('../internals/export');
var anInstance = require('../internals/an-instance');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var hasOwn = require('../internals/has-own-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var AsyncIteratorPrototype = require('../internals/async-iterator-prototype');
var IS_PURE = require('../internals/is-pure');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $TypeError = TypeError;

var AsyncIteratorConstructor = function AsyncIterator() {
  anInstance(this, AsyncIteratorPrototype);
  if (getPrototypeOf(this) === AsyncIteratorPrototype) throw new $TypeError('Abstract class AsyncIterator not directly constructable');
};

AsyncIteratorConstructor.prototype = AsyncIteratorPrototype;

if (!hasOwn(AsyncIteratorPrototype, TO_STRING_TAG)) {
  createNonEnumerableProperty(AsyncIteratorPrototype, TO_STRING_TAG, 'AsyncIterator');
}

if (IS_PURE || !hasOwn(AsyncIteratorPrototype, 'constructor') || AsyncIteratorPrototype.constructor === Object) {
  createNonEnumerableProperty(AsyncIteratorPrototype, 'constructor', AsyncIteratorConstructor);
}

// `AsyncIterator` constructor
// https://github.com/tc39/proposal-async-iterator-helpers
$({ global: true, constructor: true, forced: IS_PURE }, {
  AsyncIterator: AsyncIteratorConstructor
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/an-instance":1773651887189,"../internals/object-get-prototype-of":1773651887090,"../internals/create-non-enumerable-property":1773651887006,"../internals/has-own-property":1773651886999,"../internals/well-known-symbol":1773651886994,"../internals/async-iterator-prototype":1773651887355,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887550, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var indexed = require('../internals/async-iterator-indexed');

// `AsyncIterator.prototype.asIndexedPairs` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'AsyncIterator', name: 'indexed', proto: true, real: true, forced: true }, {
  asIndexedPairs: indexed
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/async-iterator-indexed":1773651887551}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887551, function(require, module, exports) {

var call = require('../internals/function-call');
var map = require('../internals/async-iterator-map');

var callback = function (value, counter) {
  return [counter, value];
};

// `AsyncIterator.prototype.indexed` method
// https://github.com/tc39/proposal-iterator-helpers
module.exports = function indexed() {
  return call(map, this, callback);
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/async-iterator-map":1773651887552}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887552, function(require, module, exports) {

var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');
var createIterResultObject = require('../internals/create-iter-result-object');
var closeAsyncIteration = require('../internals/async-iterator-close');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;
  var iterator = state.iterator;
  var mapper = state.mapper;

  return new Promise(function (resolve, reject) {
    var doneAndReject = function (error) {
      state.done = true;
      reject(error);
    };

    var ifAbruptCloseAsyncIterator = function (error) {
      closeAsyncIteration(iterator, doneAndReject, error, doneAndReject);
    };

    Promise.resolve(anObject(call(state.next, iterator))).then(function (step) {
      try {
        if (anObject(step).done) {
          state.done = true;
          resolve(createIterResultObject(undefined, true));
        } else {
          var value = step.value;
          try {
            var result = mapper(value, state.counter++);

            var handler = function (mapped) {
              resolve(createIterResultObject(mapped, false));
            };

            if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
            else handler(result);
          } catch (error2) { ifAbruptCloseAsyncIterator(error2); }
        }
      } catch (error) { doneAndReject(error); }
    }, doneAndReject);
  });
});

// `AsyncIterator.prototype.map` method
// https://github.com/tc39/proposal-async-iterator-helpers
module.exports = function map(mapper) {
  anObject(this);
  aCallable(mapper);
  return new AsyncIteratorProxy(getIteratorDirect(this), {
    mapper: mapper
  });
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/is-object":1773651886981,"../internals/get-iterator-direct":1773651887205,"../internals/async-iterator-create-proxy":1773651887553,"../internals/create-iter-result-object":1773651887136,"../internals/async-iterator-close":1773651887357}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887553, function(require, module, exports) {

var call = require('../internals/function-call');
var perform = require('../internals/perform');
var anObject = require('../internals/an-object');
var create = require('../internals/object-create');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var defineBuiltIns = require('../internals/define-built-ins');
var wellKnownSymbol = require('../internals/well-known-symbol');
var InternalStateModule = require('../internals/internal-state');
var getBuiltIn = require('../internals/get-built-in');
var getMethod = require('../internals/get-method');
var AsyncIteratorPrototype = require('../internals/async-iterator-prototype');
var createIterResultObject = require('../internals/create-iter-result-object');
var iteratorClose = require('../internals/iterator-close');

var Promise = getBuiltIn('Promise');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ASYNC_ITERATOR_HELPER = 'AsyncIteratorHelper';
var WRAP_FOR_VALID_ASYNC_ITERATOR = 'WrapForValidAsyncIterator';
var setInternalState = InternalStateModule.set;

var createAsyncIteratorProxyPrototype = function (IS_ITERATOR) {
  var IS_GENERATOR = !IS_ITERATOR;
  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ASYNC_ITERATOR : ASYNC_ITERATOR_HELPER);

  var getStateOrEarlyExit = function (that) {
    var stateCompletion = perform(function () {
      return getInternalState(that);
    });

    var stateError = stateCompletion.error;
    var state = stateCompletion.value;

    if (stateError || (IS_GENERATOR && state.done)) {
      return { exit: true, value: stateError ? Promise.reject(state) : Promise.resolve(createIterResultObject(undefined, true)) };
    } return { exit: false, value: state };
  };

  return defineBuiltIns(create(AsyncIteratorPrototype), {
    next: function next() {
      var stateCompletion = getStateOrEarlyExit(this);
      var state = stateCompletion.value;
      if (stateCompletion.exit) return state;
      var handlerCompletion = perform(function () {
        return anObject(state.nextHandler(Promise));
      });
      var handlerError = handlerCompletion.error;
      var value = handlerCompletion.value;
      if (handlerError) state.done = true;
      return handlerError ? Promise.reject(value) : Promise.resolve(value);
    },
    'return': function () {
      var stateCompletion = getStateOrEarlyExit(this);
      var state = stateCompletion.value;
      if (stateCompletion.exit) return state;
      state.done = true;
      var iterator = state.iterator;
      var returnMethod, result;
      var completion = perform(function () {
        if (state.inner) try {
          iteratorClose(state.inner.iterator, 'normal');
        } catch (error) {
          return iteratorClose(iterator, 'throw', error);
        }
        return getMethod(iterator, 'return');
      });
      returnMethod = result = completion.value;
      if (completion.error) return Promise.reject(result);
      if (returnMethod === undefined) return Promise.resolve(createIterResultObject(undefined, true));
      completion = perform(function () {
        return call(returnMethod, iterator);
      });
      result = completion.value;
      if (completion.error) return Promise.reject(result);
      return IS_ITERATOR ? Promise.resolve(result) : Promise.resolve(result).then(function (resolved) {
        anObject(resolved);
        return createIterResultObject(undefined, true);
      });
    }
  });
};

var WrapForValidAsyncIteratorPrototype = createAsyncIteratorProxyPrototype(true);
var AsyncIteratorHelperPrototype = createAsyncIteratorProxyPrototype(false);

createNonEnumerableProperty(AsyncIteratorHelperPrototype, TO_STRING_TAG, 'Async Iterator Helper');

module.exports = function (nextHandler, IS_ITERATOR) {
  var AsyncIteratorProxy = function AsyncIterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ASYNC_ITERATOR : ASYNC_ITERATOR_HELPER;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState(this, state);
  };

  AsyncIteratorProxy.prototype = IS_ITERATOR ? WrapForValidAsyncIteratorPrototype : AsyncIteratorHelperPrototype;

  return AsyncIteratorProxy;
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/perform":1773651887335,"../internals/an-object":1773651887009,"../internals/object-create":1773651887013,"../internals/create-non-enumerable-property":1773651887006,"../internals/define-built-ins":1773651887190,"../internals/well-known-symbol":1773651886994,"../internals/internal-state":1773651887038,"../internals/get-built-in":1773651886983,"../internals/get-method":1773651886990,"../internals/async-iterator-prototype":1773651887355,"../internals/create-iter-result-object":1773651887136,"../internals/iterator-close":1773651887097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887554, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.async-iterator.async-dispose');

}, function(modId) { var map = {"../modules/es.async-iterator.async-dispose":1773651887359}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887555, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var notANaN = require('../internals/not-a-nan');
var toPositiveInteger = require('../internals/to-positive-integer');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');
var createIterResultObject = require('../internals/create-iter-result-object');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;

  return new Promise(function (resolve, reject) {
    var doneAndReject = function (error) {
      state.done = true;
      reject(error);
    };

    var loop = function () {
      try {
        Promise.resolve(anObject(call(state.next, state.iterator))).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve(createIterResultObject(undefined, true));
            } else if (state.remaining) {
              state.remaining--;
              loop();
            } else resolve(createIterResultObject(step.value, false));
          } catch (err) { doneAndReject(err); }
        }, doneAndReject);
      } catch (error) { doneAndReject(error); }
    };

    loop();
  });
});

// `AsyncIterator.prototype.drop` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  drop: function drop(limit) {
    anObject(this);
    var remaining = toPositiveInteger(notANaN(+limit));
    return new AsyncIteratorProxy(getIteratorDirect(this), {
      remaining: remaining
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/not-a-nan":1773651887206,"../internals/to-positive-integer":1773651887207,"../internals/async-iterator-create-proxy":1773651887553,"../internals/create-iter-result-object":1773651887136}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887556, function(require, module, exports) {

var $ = require('../internals/export');
var $every = require('../internals/async-iterator-iteration').every;

// `AsyncIterator.prototype.every` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  every: function every(predicate) {
    return $every(this, predicate);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/async-iterator-iteration":1773651887356}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887557, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');
var createIterResultObject = require('../internals/create-iter-result-object');
var closeAsyncIteration = require('../internals/async-iterator-close');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;
  var iterator = state.iterator;
  var predicate = state.predicate;

  return new Promise(function (resolve, reject) {
    var doneAndReject = function (error) {
      state.done = true;
      reject(error);
    };

    var ifAbruptCloseAsyncIterator = function (error) {
      closeAsyncIteration(iterator, doneAndReject, error, doneAndReject);
    };

    var loop = function () {
      try {
        Promise.resolve(anObject(call(state.next, iterator))).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve(createIterResultObject(undefined, true));
            } else {
              var value = step.value;
              try {
                var result = predicate(value, state.counter++);

                var handler = function (selected) {
                  selected ? resolve(createIterResultObject(value, false)) : loop();
                };

                if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
                else handler(result);
              } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
            }
          } catch (error2) { doneAndReject(error2); }
        }, doneAndReject);
      } catch (error) { doneAndReject(error); }
    };

    loop();
  });
});

// `AsyncIterator.prototype.filter` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  filter: function filter(predicate) {
    anObject(this);
    aCallable(predicate);
    return new AsyncIteratorProxy(getIteratorDirect(this), {
      predicate: predicate
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/is-object":1773651886981,"../internals/get-iterator-direct":1773651887205,"../internals/async-iterator-create-proxy":1773651887553,"../internals/create-iter-result-object":1773651887136,"../internals/async-iterator-close":1773651887357}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887558, function(require, module, exports) {

var $ = require('../internals/export');
var $find = require('../internals/async-iterator-iteration').find;

// `AsyncIterator.prototype.find` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  find: function find(predicate) {
    return $find(this, predicate);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/async-iterator-iteration":1773651887356}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887559, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');
var createIterResultObject = require('../internals/create-iter-result-object');
var getAsyncIteratorFlattenable = require('../internals/get-async-iterator-flattenable');
var closeAsyncIteration = require('../internals/async-iterator-close');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;
  var iterator = state.iterator;
  var mapper = state.mapper;

  return new Promise(function (resolve, reject) {
    var doneAndReject = function (error) {
      state.done = true;
      reject(error);
    };

    var ifAbruptCloseAsyncIterator = function (error) {
      closeAsyncIteration(iterator, doneAndReject, error, doneAndReject);
    };

    var outerLoop = function () {
      try {
        Promise.resolve(anObject(call(state.next, iterator))).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true;
              resolve(createIterResultObject(undefined, true));
            } else {
              var value = step.value;
              try {
                var result = mapper(value, state.counter++);

                var handler = function (mapped) {
                  try {
                    state.inner = getAsyncIteratorFlattenable(mapped);
                    innerLoop();
                  } catch (error4) { ifAbruptCloseAsyncIterator(error4); }
                };

                if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
                else handler(result);
              } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
            }
          } catch (error2) { doneAndReject(error2); }
        }, doneAndReject);
      } catch (error) { doneAndReject(error); }
    };

    var innerLoop = function () {
      var inner = state.inner;
      if (inner) {
        try {
          Promise.resolve(anObject(call(inner.next, inner.iterator))).then(function (result) {
            try {
              if (anObject(result).done) {
                state.inner = null;
                outerLoop();
              } else resolve(createIterResultObject(result.value, false));
            } catch (error1) { ifAbruptCloseAsyncIterator(error1); }
          }, ifAbruptCloseAsyncIterator);
        } catch (error) { ifAbruptCloseAsyncIterator(error); }
      } else outerLoop();
    };

    innerLoop();
  });
});

// `AsyncIterator.prototype.flatMap` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  flatMap: function flatMap(mapper) {
    anObject(this);
    aCallable(mapper);
    return new AsyncIteratorProxy(getIteratorDirect(this), {
      mapper: mapper,
      inner: null
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/is-object":1773651886981,"../internals/get-iterator-direct":1773651887205,"../internals/async-iterator-create-proxy":1773651887553,"../internals/create-iter-result-object":1773651887136,"../internals/get-async-iterator-flattenable":1773651887560,"../internals/async-iterator-close":1773651887357}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887560, function(require, module, exports) {

var call = require('../internals/function-call');
var isCallable = require('../internals/is-callable');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var getIteratorMethod = require('../internals/get-iterator-method');
var getMethod = require('../internals/get-method');
var wellKnownSymbol = require('../internals/well-known-symbol');
var AsyncFromSyncIterator = require('../internals/async-from-sync-iterator');

var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator');

module.exports = function (obj) {
  var object = anObject(obj);
  var alreadyAsync = true;
  var method = getMethod(object, ASYNC_ITERATOR);
  var iterator;
  if (!isCallable(method)) {
    method = getIteratorMethod(object);
    alreadyAsync = false;
  }
  if (method !== undefined) {
    iterator = call(method, object);
  } else {
    iterator = object;
    alreadyAsync = true;
  }
  anObject(iterator);
  return getIteratorDirect(alreadyAsync ? iterator : new AsyncFromSyncIterator(getIteratorDirect(iterator)));
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/is-callable":1773651886969,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/get-iterator-method":1773651887096,"../internals/get-method":1773651886990,"../internals/well-known-symbol":1773651886994,"../internals/async-from-sync-iterator":1773651887354}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887561, function(require, module, exports) {

var $ = require('../internals/export');
var $forEach = require('../internals/async-iterator-iteration').forEach;

// `AsyncIterator.prototype.forEach` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  forEach: function forEach(fn) {
    return $forEach(this, fn);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/async-iterator-iteration":1773651887356}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887562, function(require, module, exports) {

var $ = require('../internals/export');
var toObject = require('../internals/to-object');
var isPrototypeOf = require('../internals/object-is-prototype-of');
var getAsyncIteratorFlattenable = require('../internals/get-async-iterator-flattenable');
var AsyncIteratorPrototype = require('../internals/async-iterator-prototype');
var WrapAsyncIterator = require('../internals/async-iterator-wrap');

// `AsyncIterator.from` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', stat: true, forced: true }, {
  from: function from(O) {
    var iteratorRecord = getAsyncIteratorFlattenable(typeof O == 'string' ? toObject(O) : O);
    return isPrototypeOf(AsyncIteratorPrototype, iteratorRecord.iterator)
      ? iteratorRecord.iterator
      : new WrapAsyncIterator(iteratorRecord);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/to-object":1773651887000,"../internals/object-is-prototype-of":1773651886985,"../internals/get-async-iterator-flattenable":1773651887560,"../internals/async-iterator-prototype":1773651887355,"../internals/async-iterator-wrap":1773651887563}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887563, function(require, module, exports) {

var call = require('../internals/function-call');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');

module.exports = createAsyncIteratorProxy(function () {
  return call(this.next, this.iterator);
}, true);

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/async-iterator-create-proxy":1773651887553}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887564, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var indexed = require('../internals/async-iterator-indexed');

// `AsyncIterator.prototype.indexed` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  indexed: indexed
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/async-iterator-indexed":1773651887551}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887565, function(require, module, exports) {

var $ = require('../internals/export');
var map = require('../internals/async-iterator-map');

// `AsyncIterator.prototype.map` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  map: map
});


}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/async-iterator-map":1773651887552}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887566, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var getBuiltIn = require('../internals/get-built-in');
var getIteratorDirect = require('../internals/get-iterator-direct');
var closeAsyncIteration = require('../internals/async-iterator-close');

var Promise = getBuiltIn('Promise');
var $TypeError = TypeError;

// `AsyncIterator.prototype.reduce` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  reduce: function reduce(reducer /* , initialValue */) {
    anObject(this);
    aCallable(reducer);
    var record = getIteratorDirect(this);
    var iterator = record.iterator;
    var next = record.next;
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    var counter = 0;

    return new Promise(function (resolve, reject) {
      var ifAbruptCloseAsyncIterator = function (error) {
        closeAsyncIteration(iterator, reject, error, reject);
      };

      var loop = function () {
        try {
          Promise.resolve(anObject(call(next, iterator))).then(function (step) {
            try {
              if (anObject(step).done) {
                noInitial ? reject(new $TypeError('Reduce of empty iterator with no initial value')) : resolve(accumulator);
              } else {
                var value = step.value;
                if (noInitial) {
                  noInitial = false;
                  accumulator = value;
                  loop();
                } else try {
                  var result = reducer(accumulator, value, counter);

                  var handler = function ($result) {
                    accumulator = $result;
                    loop();
                  };

                  if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator);
                  else handler(result);
                } catch (error3) { ifAbruptCloseAsyncIterator(error3); }
              }
              counter++;
            } catch (error2) { reject(error2); }
          }, reject);
        } catch (error) { reject(error); }
      };

      loop();
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/is-object":1773651886981,"../internals/get-built-in":1773651886983,"../internals/get-iterator-direct":1773651887205,"../internals/async-iterator-close":1773651887357}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887567, function(require, module, exports) {

var $ = require('../internals/export');
var $some = require('../internals/async-iterator-iteration').some;

// `AsyncIterator.prototype.some` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  some: function some(predicate) {
    return $some(this, predicate);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/async-iterator-iteration":1773651887356}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887568, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var notANaN = require('../internals/not-a-nan');
var toPositiveInteger = require('../internals/to-positive-integer');
var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy');
var createIterResultObject = require('../internals/create-iter-result-object');

var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
  var state = this;
  var iterator = state.iterator;
  var returnMethod;

  if (!state.remaining--) {
    var resultDone = createIterResultObject(undefined, true);
    state.done = true;
    returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return Promise.resolve(call(returnMethod, iterator, undefined)).then(function () {
        return resultDone;
      });
    }
    return resultDone;
  } return Promise.resolve(call(state.next, iterator)).then(function (step) {
    if (anObject(step).done) {
      state.done = true;
      return createIterResultObject(undefined, true);
    } return createIterResultObject(step.value, false);
  }).then(null, function (error) {
    state.done = true;
    throw error;
  });
});

// `AsyncIterator.prototype.take` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  take: function take(limit) {
    anObject(this);
    var remaining = toPositiveInteger(notANaN(+limit));
    return new AsyncIteratorProxy(getIteratorDirect(this), {
      remaining: remaining
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/an-object":1773651887009,"../internals/get-iterator-direct":1773651887205,"../internals/not-a-nan":1773651887206,"../internals/to-positive-integer":1773651887207,"../internals/async-iterator-create-proxy":1773651887553,"../internals/create-iter-result-object":1773651887136}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887569, function(require, module, exports) {

var $ = require('../internals/export');
var $toArray = require('../internals/async-iterator-iteration').toArray;

// `AsyncIterator.prototype.toArray` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  toArray: function toArray() {
    return $toArray(this, undefined, []);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/async-iterator-iteration":1773651887356}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887570, function(require, module, exports) {

/* eslint-disable es/no-bigint -- safe */
var $ = require('../internals/export');
var NumericRangeIterator = require('../internals/numeric-range-iterator');

// `BigInt.range` method
// https://github.com/tc39/proposal-Number.range
// TODO: Remove from `core-js@4`
if (typeof BigInt == 'function') {
  $({ target: 'BigInt', stat: true, forced: true }, {
    range: function range(start, end, option) {
      return new NumericRangeIterator(start, end, option, 'bigint', BigInt(0), BigInt(1));
    }
  });
}

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/numeric-range-iterator":1773651887571}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887571, function(require, module, exports) {

var InternalStateModule = require('../internals/internal-state');
var createIteratorConstructor = require('../internals/iterator-create-constructor');
var createIterResultObject = require('../internals/create-iter-result-object');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var isObject = require('../internals/is-object');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var DESCRIPTORS = require('../internals/descriptors');

var INCORRECT_RANGE = 'Incorrect Iterator.range arguments';
var NUMERIC_RANGE_ITERATOR = 'NumericRangeIterator';

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(NUMERIC_RANGE_ITERATOR);

var $RangeError = RangeError;
var $TypeError = TypeError;

var $RangeIterator = createIteratorConstructor(function NumericRangeIterator(start, end, option, type, zero, one) {
  // TODO: Drop the first `typeof` check after removing legacy methods in `core-js@4`
  if (typeof start != type || (end !== Infinity && end !== -Infinity && typeof end != type)) {
    throw new $TypeError(INCORRECT_RANGE);
  }
  if (start === Infinity || start === -Infinity) {
    throw new $RangeError(INCORRECT_RANGE);
  }
  var ifIncrease = end > start;
  var inclusiveEnd = false;
  var step;
  if (option === undefined) {
    step = undefined;
  } else if (isObject(option)) {
    step = option.step;
    inclusiveEnd = !!option.inclusive;
  } else if (typeof option == type) {
    step = option;
  } else {
    throw new $TypeError(INCORRECT_RANGE);
  }
  if (isNullOrUndefined(step)) {
    step = ifIncrease ? one : -one;
  }
  if (typeof step != type) {
    throw new $TypeError(INCORRECT_RANGE);
  }
  if (step === Infinity || step === -Infinity || (step === zero && start !== end)) {
    throw new $RangeError(INCORRECT_RANGE);
  }
  // eslint-disable-next-line no-self-compare -- NaN check
  var hitsEnd = start !== start || end !== end || step !== step || (end > start) !== (step > zero);
  setInternalState(this, {
    type: NUMERIC_RANGE_ITERATOR,
    start: start,
    end: end,
    step: step,
    inclusive: inclusiveEnd,
    hitsEnd: hitsEnd,
    currentCount: zero,
    zero: zero
  });
  if (!DESCRIPTORS) {
    this.start = start;
    this.end = end;
    this.step = step;
    this.inclusive = inclusiveEnd;
  }
}, NUMERIC_RANGE_ITERATOR, function next() {
  var state = getInternalState(this);
  if (state.hitsEnd) return createIterResultObject(undefined, true);
  var start = state.start;
  var end = state.end;
  var step = state.step;
  var currentYieldingValue = start + (step * state.currentCount++);
  if (currentYieldingValue === end) state.hitsEnd = true;
  var inclusiveEnd = state.inclusive;
  var endCondition;
  if (end > start) {
    endCondition = inclusiveEnd ? currentYieldingValue > end : currentYieldingValue >= end;
  } else {
    endCondition = inclusiveEnd ? end > currentYieldingValue : end >= currentYieldingValue;
  }
  if (endCondition) {
    state.hitsEnd = true;
    return createIterResultObject(undefined, true);
  } return createIterResultObject(currentYieldingValue, false);
});

var addGetter = function (key) {
  defineBuiltInAccessor($RangeIterator.prototype, key, {
    get: function () {
      return getInternalState(this)[key];
    },
    set: function () { /* empty */ },
    configurable: true,
    enumerable: false
  });
};

if (DESCRIPTORS) {
  addGetter('start');
  addGetter('end');
  addGetter('inclusive');
  addGetter('step');
}

module.exports = $RangeIterator;

}, function(modId) { var map = {"../internals/internal-state":1773651887038,"../internals/iterator-create-constructor":1773651887134,"../internals/create-iter-result-object":1773651887136,"../internals/is-null-or-undefined":1773651886978,"../internals/is-object":1773651886981,"../internals/define-built-in-accessor":1773651887032,"../internals/descriptors":1773651886971}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887572, function(require, module, exports) {

var $ = require('../internals/export');
var apply = require('../internals/function-apply');
var getCompositeKeyNode = require('../internals/composite-key');
var getBuiltIn = require('../internals/get-built-in');
var create = require('../internals/object-create');

var $Object = Object;

var initializer = function () {
  var freeze = getBuiltIn('Object', 'freeze');
  return freeze ? freeze(create(null)) : create(null);
};

// https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey
$({ global: true, forced: true }, {
  compositeKey: function compositeKey() {
    return apply(getCompositeKeyNode, $Object, arguments).get('object', initializer);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-apply":1773651886963,"../internals/composite-key":1773651887573,"../internals/get-built-in":1773651886983,"../internals/object-create":1773651887013}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887573, function(require, module, exports) {

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
require('../modules/es.map');
require('../modules/es.weak-map');
var getBuiltIn = require('../internals/get-built-in');
var create = require('../internals/object-create');
var isObject = require('../internals/is-object');

var $Object = Object;
var $TypeError = TypeError;
var Map = getBuiltIn('Map');
var WeakMap = getBuiltIn('WeakMap');

var Node = function () {
  // keys
  this.object = null;
  this.symbol = null;
  // child nodes
  this.primitives = null;
  this.objectsByIndex = create(null);
};

Node.prototype.get = function (key, initializer) {
  return this[key] || (this[key] = initializer());
};

Node.prototype.next = function (i, it, IS_OBJECT) {
  var store = IS_OBJECT
    ? this.objectsByIndex[i] || (this.objectsByIndex[i] = new WeakMap())
    : this.primitives || (this.primitives = new Map());
  var entry = store.get(it);
  if (!entry) store.set(it, entry = new Node());
  return entry;
};

var root = new Node();

module.exports = function () {
  var active = root;
  var length = arguments.length;
  var i, it;
  // for prevent leaking, start from objects
  for (i = 0; i < length; i++) {
    if (isObject(it = arguments[i])) active = active.next(i, it, true);
  }
  if (this === $Object && active === root) throw new $TypeError('Composite keys must contain a non-primitive component');
  for (i = 0; i < length; i++) {
    if (!isObject(it = arguments[i])) active = active.next(i, it, false);
  } return active;
};

}, function(modId) { var map = {"../modules/es.map":1773651887227,"../modules/es.weak-map":1773651887511,"../internals/get-built-in":1773651886983,"../internals/object-create":1773651887013,"../internals/is-object":1773651886981}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887574, function(require, module, exports) {

var $ = require('../internals/export');
var getCompositeKeyNode = require('../internals/composite-key');
var getBuiltIn = require('../internals/get-built-in');
var apply = require('../internals/function-apply');

// https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey
$({ global: true, forced: true }, {
  compositeSymbol: function compositeSymbol() {
    if (arguments.length === 1 && typeof arguments[0] == 'string') return getBuiltIn('Symbol')['for'](arguments[0]);
    return apply(getCompositeKeyNode, null, arguments).get('symbol', getBuiltIn('Symbol'));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/composite-key":1773651887573,"../internals/get-built-in":1773651886983,"../internals/function-apply":1773651886963}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887575, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887576, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887577, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887578, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887579, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.disposable-stack.constructor');

}, function(modId) { var map = {"../modules/es.disposable-stack.constructor":1773651887188}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887580, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.error.is-error');

}, function(modId) { var map = {"../modules/es.error.is-error":1773651887086}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887581, function(require, module, exports) {

var $ = require('../internals/export');
var demethodize = require('../internals/function-demethodize');

// `Function.prototype.demethodize` method
// https://github.com/js-choi/proposal-function-demethodize
$({ target: 'Function', proto: true, forced: true }, {
  demethodize: demethodize
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-demethodize":1773651887582}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887582, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var aCallable = require('../internals/a-callable');

module.exports = function demethodize() {
  return uncurryThis(aCallable(this));
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/a-callable":1773651886991}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887583, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var $isCallable = require('../internals/is-callable');
var inspectSource = require('../internals/inspect-source');
var hasOwn = require('../internals/has-own-property');
var DESCRIPTORS = require('../internals/descriptors');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var classRegExp = /^\s*class\b/;
var exec = uncurryThis(classRegExp.exec);

var isClassConstructor = function (argument) {
  try {
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    if (!DESCRIPTORS || !exec(classRegExp, inspectSource(argument))) return false;
  } catch (error) { /* empty */ }
  var prototype = getOwnPropertyDescriptor(argument, 'prototype');
  return !!prototype && hasOwn(prototype, 'writable') && !prototype.writable;
};

// `Function.isCallable` method
// https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md
$({ target: 'Function', stat: true, sham: true, forced: true }, {
  isCallable: function isCallable(argument) {
    return $isCallable(argument) && !isClassConstructor(argument);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/is-callable":1773651886969,"../internals/inspect-source":1773651887045,"../internals/has-own-property":1773651886999,"../internals/descriptors":1773651886971}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887584, function(require, module, exports) {

var $ = require('../internals/export');
var isConstructor = require('../internals/is-constructor');

// `Function.isConstructor` method
// https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md
$({ target: 'Function', stat: true, forced: true }, {
  isConstructor: isConstructor
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/is-constructor":1773651887044}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887585, function(require, module, exports) {

var wellKnownSymbol = require('../internals/well-known-symbol');
var defineProperty = require('../internals/object-define-property').f;

var METADATA = wellKnownSymbol('metadata');
var FunctionPrototype = Function.prototype;

// Function.prototype[@@metadata]
// https://github.com/tc39/proposal-decorator-metadata
if (FunctionPrototype[METADATA] === undefined) {
  defineProperty(FunctionPrototype, METADATA, {
    value: null
  });
}

}, function(modId) { var map = {"../internals/well-known-symbol":1773651886994,"../internals/object-define-property":1773651887007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887586, function(require, module, exports) {

var $ = require('../internals/export');
var demethodize = require('../internals/function-demethodize');

// `Function.prototype.unThis` method
// https://github.com/js-choi/proposal-function-demethodize
// TODO: Remove from `core-js@4`
$({ target: 'Function', proto: true, forced: true, name: 'demethodize' }, {
  unThis: demethodize
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-demethodize":1773651887582}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887587, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.global-this');

}, function(modId) { var map = {"../modules/es.global-this":1773651887198}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887588, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.constructor');

}, function(modId) { var map = {"../modules/es.iterator.constructor":1773651887199}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887589, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var indexed = require('../internals/iterator-indexed');

// `Iterator.prototype.asIndexedPairs` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', name: 'indexed', proto: true, real: true, forced: true }, {
  asIndexedPairs: indexed
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/iterator-indexed":1773651887590}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887590, function(require, module, exports) {

require('../modules/es.iterator.map');
var call = require('../internals/function-call');
var map = require('../internals/iterators-core').IteratorPrototype.map;

var callback = function (value, counter) {
  return [counter, value];
};

// `Iterator.prototype.indexed` method
// https://github.com/tc39/proposal-iterator-helpers
module.exports = function indexed() {
  return call(map, this, callback);
};

}, function(modId) { var map = {"../modules/es.iterator.map":1773651887217,"../internals/function-call":1773651886972,"../internals/iterators-core":1773651887135}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887591, function(require, module, exports) {

var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var call = require('../internals/function-call');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var getIteratorDirect = require('../internals/get-iterator-direct');
var iteratorClose = require('../internals/iterator-close');
var uncurryThis = require('../internals/function-uncurry-this');

var $RangeError = RangeError;
var push = uncurryThis([].push);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var next = this.next;
  var chunkSize = this.chunkSize;
  var buffer = [];
  var result, done;
  while (true) {
    result = anObject(call(next, iterator));
    done = !!result.done;
    if (done) {
      if (buffer.length) return buffer;
      this.done = true;
      return;
    }
    push(buffer, result.value);
    if (buffer.length === chunkSize) return buffer;
  }
});

// `Iterator.prototype.chunks` method
// https://github.com/tc39/proposal-iterator-chunking
$({ target: 'Iterator', proto: true, real: true, forced: true }, {
  chunks: function chunks(chunkSize) {
    var O = anObject(this);
    if (typeof chunkSize != 'number' || !chunkSize || chunkSize >>> 0 !== chunkSize) {
      return iteratorClose(O, 'throw', new $RangeError('chunkSize must be integer in [1, 2^32-1]'));
    }
    return new IteratorProxy(getIteratorDirect(O), {
      chunkSize: chunkSize
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/an-object":1773651887009,"../internals/function-call":1773651886972,"../internals/iterator-create-proxy":1773651887201,"../internals/get-iterator-direct":1773651887205,"../internals/iterator-close":1773651887097,"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887592, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.concat');

}, function(modId) { var map = {"../modules/es.iterator.concat":1773651887200}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887593, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.dispose');

}, function(modId) { var map = {"../modules/es.iterator.dispose":1773651887203}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887594, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.drop');

}, function(modId) { var map = {"../modules/es.iterator.drop":1773651887204}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887595, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.every');

}, function(modId) { var map = {"../modules/es.iterator.every":1773651887210}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887596, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.filter');

}, function(modId) { var map = {"../modules/es.iterator.filter":1773651887211}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887597, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.find');

}, function(modId) { var map = {"../modules/es.iterator.find":1773651887212}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887598, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.flat-map');

}, function(modId) { var map = {"../modules/es.iterator.flat-map":1773651887213}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887599, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.for-each');

}, function(modId) { var map = {"../modules/es.iterator.for-each":1773651887215}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887600, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.from');

}, function(modId) { var map = {"../modules/es.iterator.from":1773651887216}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887601, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var indexed = require('../internals/iterator-indexed');

// `Iterator.prototype.indexed` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true, forced: true }, {
  indexed: indexed
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/iterator-indexed":1773651887590}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887602, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.map');

}, function(modId) { var map = {"../modules/es.iterator.map":1773651887217}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887603, function(require, module, exports) {

/* eslint-disable es/no-bigint -- safe */
var $ = require('../internals/export');
var NumericRangeIterator = require('../internals/numeric-range-iterator');

var $TypeError = TypeError;

// `Iterator.range` method
// https://github.com/tc39/proposal-Number.range
$({ target: 'Iterator', stat: true, forced: true }, {
  range: function range(start, end, option) {
    if (typeof start == 'number') return new NumericRangeIterator(start, end, option, 'number', 0, 1);
    if (typeof start == 'bigint') return new NumericRangeIterator(start, end, option, 'bigint', BigInt(0), BigInt(1));
    throw new $TypeError('Incorrect Iterator.range arguments');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/numeric-range-iterator":1773651887571}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887604, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.reduce');

}, function(modId) { var map = {"../modules/es.iterator.reduce":1773651887218}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887605, function(require, module, exports) {

var $ = require('../internals/export');
var iteratorWindow = require('../internals/iterator-window');

// `Iterator.prototype.sliding` method
// https://github.com/tc39/proposal-iterator-chunking
$({ target: 'Iterator', proto: true, real: true, forced: true }, {
  sliding: function sliding(windowSize) {
    return iteratorWindow(this, windowSize, 'allow-partial');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/iterator-window":1773651887606}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887606, function(require, module, exports) {

var anObject = require('../internals/an-object');
var call = require('../internals/function-call');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var createIterResultObject = require('../internals/create-iter-result-object');
var getIteratorDirect = require('../internals/get-iterator-direct');
var iteratorClose = require('../internals/iterator-close');
var uncurryThis = require('../internals/function-uncurry-this');

var $RangeError = RangeError;
var $TypeError = TypeError;
var push = uncurryThis([].push);
var slice = uncurryThis([].slice);
var ALLOW_PARTIAL = 'allow-partial';

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var next = this.next;
  var buffer = this.buffer;
  var windowSize = this.windowSize;
  var allowPartial = this.allowPartial;
  var result, done;
  while (true) {
    result = anObject(call(next, iterator));
    done = this.done = !!result.done;
    if (allowPartial && done && buffer.length && buffer.length < windowSize) return createIterResultObject(buffer, false);
    if (done) return createIterResultObject(undefined, true);

    if (buffer.length === windowSize) this.buffer = buffer = slice(buffer, 1);
    push(buffer, result.value);
    if (buffer.length === windowSize) return createIterResultObject(buffer, false);
  }
}, false, true);

// `Iterator.prototype.windows` and obsolete `Iterator.prototype.sliding` methods
// https://github.com/tc39/proposal-iterator-chunking
module.exports = function (O, windowSize, undersized) {
  anObject(O);
  if (typeof windowSize != 'number' || !windowSize || windowSize >>> 0 !== windowSize) {
    return iteratorClose(O, 'throw', new $RangeError('`windowSize` must be integer in [1, 2^32-1]'));
  }
  if (undersized !== undefined && undersized !== 'only-full' && undersized !== ALLOW_PARTIAL) {
    return iteratorClose(O, 'throw', new $TypeError('Incorrect `undersized` argument'));
  }
  return new IteratorProxy(getIteratorDirect(O), {
    windowSize: windowSize,
    buffer: [],
    allowPartial: undersized === ALLOW_PARTIAL
  });
};

}, function(modId) { var map = {"../internals/an-object":1773651887009,"../internals/function-call":1773651886972,"../internals/iterator-create-proxy":1773651887201,"../internals/create-iter-result-object":1773651887136,"../internals/get-iterator-direct":1773651887205,"../internals/iterator-close":1773651887097,"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887607, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.some');

}, function(modId) { var map = {"../modules/es.iterator.some":1773651887219}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887608, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.take');

}, function(modId) { var map = {"../modules/es.iterator.take":1773651887220}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887609, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.iterator.to-array');

}, function(modId) { var map = {"../modules/es.iterator.to-array":1773651887221}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887610, function(require, module, exports) {

var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var AsyncFromSyncIterator = require('../internals/async-from-sync-iterator');
var WrapAsyncIterator = require('../internals/async-iterator-wrap');
var getIteratorDirect = require('../internals/get-iterator-direct');

// `Iterator.prototype.toAsync` method
// https://github.com/tc39/proposal-async-iterator-helpers
$({ target: 'Iterator', proto: true, real: true, forced: true }, {
  toAsync: function toAsync() {
    return new WrapAsyncIterator(getIteratorDirect(new AsyncFromSyncIterator(getIteratorDirect(anObject(this)))));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/an-object":1773651887009,"../internals/async-from-sync-iterator":1773651887354,"../internals/async-iterator-wrap":1773651887563,"../internals/get-iterator-direct":1773651887205}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887611, function(require, module, exports) {

var $ = require('../internals/export');
var iteratorWindow = require('../internals/iterator-window');

// `Iterator.prototype.windows` method
// https://github.com/tc39/proposal-iterator-chunking
$({ target: 'Iterator', proto: true, real: true, forced: true }, {
  windows: function windows(windowSize /* , undersized */) {
    return iteratorWindow(this, windowSize, arguments.length < 2 ? undefined : arguments[1]);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/iterator-window":1773651887606}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887612, function(require, module, exports) {

var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var anObjectOrUndefined = require('../internals/an-object-or-undefined');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var getIteratorRecord = require('../internals/get-iterator-record');
var getIteratorFlattenable = require('../internals/get-iterator-flattenable');
var getModeOption = require('../internals/get-mode-option');
var iteratorClose = require('../internals/iterator-close');
var iteratorCloseAll = require('../internals/iterator-close-all');
var iteratorZip = require('../internals/iterator-zip');

var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var THROW = 'throw';

// `Iterator.zip` method
// https://github.com/tc39/proposal-joint-iteration
$({ target: 'Iterator', stat: true }, {
  zip: function zip(iterables /* , options */) {
    anObject(iterables);
    var options = arguments.length > 1 ? anObjectOrUndefined(arguments[1]) : undefined;
    var mode = getModeOption(options);
    var paddingOption = mode === 'longest' ? anObjectOrUndefined(options && options.padding) : undefined;

    var iters = [];
    var padding = [];
    var inputIter = getIteratorRecord(iterables);
    var iter, done, next;
    while (!done) {
      try {
        next = anObject(call(inputIter.next, inputIter.iterator));
        done = next.done;
      } catch (error) {
        return iteratorCloseAll(iters, THROW, error);
      }
      if (!done) {
        try {
          iter = getIteratorFlattenable(next.value, true);
        } catch (error) {
          return iteratorCloseAll(concat([inputIter.iterator], iters), THROW, error);
        }
        push(iters, iter);
      }
    }

    var iterCount = iters.length;
    var i, paddingDone, paddingIter;
    if (mode === 'longest') {
      if (paddingOption === undefined) {
        for (i = 0; i < iterCount; i++) push(padding, undefined);
      } else {
        try {
          paddingIter = getIteratorRecord(paddingOption);
        } catch (error) {
          return iteratorCloseAll(iters, THROW, error);
        }
        var usingIterator = true;
        for (i = 0; i < iterCount; i++) {
          if (usingIterator) {
            try {
              next = anObject(call(paddingIter.next, paddingIter.iterator));
              paddingDone = next.done;
              next = next.value;
            } catch (error) {
              return iteratorCloseAll(iters, THROW, error);
            }
            if (paddingDone) {
              usingIterator = false;
            } else {
              push(padding, next);
            }
          } else {
            push(padding, undefined);
          }
        }

        if (usingIterator) {
          try {
            iteratorClose(paddingIter.iterator, 'normal');
          } catch (error) {
            return iteratorCloseAll(iters, THROW, error);
          }
        }
      }
    }

    return iteratorZip(iters, mode, padding);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/an-object":1773651887009,"../internals/an-object-or-undefined":1773651887613,"../internals/function-call":1773651886972,"../internals/function-uncurry-this":1773651886968,"../internals/get-iterator-record":1773651887614,"../internals/get-iterator-flattenable":1773651887214,"../internals/get-mode-option":1773651887615,"../internals/iterator-close":1773651887097,"../internals/iterator-close-all":1773651887202,"../internals/iterator-zip":1773651887616}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887613, function(require, module, exports) {

var isObject = require('../internals/is-object');

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (argument === undefined || isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object or undefined');
};

}, function(modId) { var map = {"../internals/is-object":1773651886981}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887614, function(require, module, exports) {

var getIterator = require('../internals/get-iterator');
var getIteratorDirect = require('../internals/get-iterator-direct');

module.exports = function (argument) {
  return getIteratorDirect(getIterator(argument));
};

}, function(modId) { var map = {"../internals/get-iterator":1773651887095,"../internals/get-iterator-direct":1773651887205}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887615, function(require, module, exports) {

var $TypeError = TypeError;

module.exports = function (options) {
  var mode = options && options.mode;
  if (mode === undefined || mode === 'shortest' || mode === 'longest' || mode === 'strict') return mode || 'shortest';
  throw new $TypeError('Incorrect `mode` option');
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887616, function(require, module, exports) {

var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var createIteratorProxy = require('../internals/iterator-create-proxy');
var iteratorCloseAll = require('../internals/iterator-close-all');

var $TypeError = TypeError;
var slice = uncurryThis([].slice);
var push = uncurryThis([].push);
var ITERATOR_IS_EXHAUSTED = 'Iterator is exhausted';
var THROW = 'throw';

// eslint-disable-next-line max-statements -- specification case
var IteratorProxy = createIteratorProxy(function () {
  var iterCount = this.iterCount;
  if (!iterCount) {
    this.done = true;
    return;
  }
  var openIters = this.openIters;
  var iters = this.iters;
  var padding = this.padding;
  var mode = this.mode;
  var finishResults = this.finishResults;

  var results = [];
  var result, done;
  for (var i = 0; i < iterCount; i++) {
    var iter = iters[i];
    if (iter === null) {
      result = padding[i];
    } else {
      try {
        result = call(iter.next, iter.iterator);
        done = result.done;
        result = result.value;
      } catch (error) {
        openIters[i] = undefined;
        return iteratorCloseAll(openIters, THROW, error);
      }
      if (done) {
        openIters[i] = undefined;
        this.openItersCount--;
        if (mode === 'shortest') {
          this.done = true;
          return iteratorCloseAll(openIters, 'normal', undefined);
        }
        if (mode === 'strict') {
          if (i) {
            return iteratorCloseAll(openIters, THROW, new $TypeError(ITERATOR_IS_EXHAUSTED));
          }

          var open, openDone;
          for (var k = 1; k < iterCount; k++) {
            // eslint-disable-next-line max-depth -- specification case
            try {
              open = call(iters[k].next, iters[k].iterator);
              openDone = open.done;
              open = open.value;
            } catch (error) {
              openIters[k] = undefined;
              return iteratorCloseAll(openIters, THROW, open);
            }
            // eslint-disable-next-line max-depth -- specification case
            if (openDone) {
              openIters[k] = undefined;
              this.openItersCount--;
            } else {
              return iteratorCloseAll(openIters, THROW, new $TypeError(ITERATOR_IS_EXHAUSTED));
            }
          }
          this.done = true;
          return;
        }
        if (!this.openItersCount) {
          this.done = true;
          return;
        }
        iters[i] = null;
        result = padding[i];
      }
    }
    push(results, result);
  }

  return finishResults ? finishResults(results) : results;
});

module.exports = function (iters, mode, padding, finishResults) {
  var iterCount = iters.length;
  return new IteratorProxy({
    iters: iters,
    iterCount: iterCount,
    openIters: slice(iters, 0),
    openItersCount: iterCount,
    mode: mode,
    padding: padding,
    finishResults: finishResults
  });
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/function-uncurry-this":1773651886968,"../internals/iterator-create-proxy":1773651887201,"../internals/iterator-close-all":1773651887202}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887617, function(require, module, exports) {

var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var anObjectOrUndefined = require('../internals/an-object-or-undefined');
var createProperty = require('../internals/create-property');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var getBuiltIn = require('../internals/get-built-in');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var getIteratorFlattenable = require('../internals/get-iterator-flattenable');
var getModeOption = require('../internals/get-mode-option');
var iteratorCloseAll = require('../internals/iterator-close-all');
var iteratorZip = require('../internals/iterator-zip');

var create = getBuiltIn('Object', 'create');
var ownKeys = getBuiltIn('Reflect', 'ownKeys');
var push = uncurryThis([].push);
var THROW = 'throw';

// `Iterator.zipKeyed` method
// https://github.com/tc39/proposal-joint-iteration
$({ target: 'Iterator', stat: true }, {
  zipKeyed: function zipKeyed(iterables /* , options */) {
    anObject(iterables);
    var options = arguments.length > 1 ? anObjectOrUndefined(arguments[1]) : undefined;
    var mode = getModeOption(options);
    var paddingOption = mode === 'longest' ? anObjectOrUndefined(options && options.padding) : undefined;

    var iters = [];
    var padding = [];
    var allKeys = ownKeys(iterables);
    var keys = [];
    var propertyIsEnumerable = propertyIsEnumerableModule.f;
    var i, key, value;
    for (i = 0; i < allKeys.length; i++) try {
      key = allKeys[i];
      if (!call(propertyIsEnumerable, iterables, key)) continue;
      value = iterables[key];
      if (value !== undefined) {
        push(keys, key);
        push(iters, getIteratorFlattenable(value, true));
      }
    } catch (error) {
      return iteratorCloseAll(iters, THROW, error);
    }

    var iterCount = iters.length;
    if (mode === 'longest') {
      if (paddingOption === undefined) {
        for (i = 0; i < iterCount; i++) push(padding, undefined);
      } else {
        for (i = 0; i < keys.length; i++) {
          try {
            value = paddingOption[keys[i]];
          } catch (error) {
            return iteratorCloseAll(iters, THROW, error);
          }
          push(padding, value);
        }
      }
    }

    return iteratorZip(iters, mode, padding, function (results) {
      var obj = create(null);
      for (var j = 0; j < iterCount; j++) {
        createProperty(obj, keys[j], results[j]);
      }
      return obj;
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/an-object":1773651887009,"../internals/an-object-or-undefined":1773651887613,"../internals/create-property":1773651887046,"../internals/function-call":1773651886972,"../internals/function-uncurry-this":1773651886968,"../internals/get-built-in":1773651886983,"../internals/object-property-is-enumerable":1773651886973,"../internals/get-iterator-flattenable":1773651887214,"../internals/get-mode-option":1773651887615,"../internals/iterator-close-all":1773651887202,"../internals/iterator-zip":1773651887616}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887618, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.json.is-raw-json');

}, function(modId) { var map = {"../modules/es.json.is-raw-json":1773651887222}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887619, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.json.parse');

}, function(modId) { var map = {"../modules/es.json.parse":1773651887223}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887620, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.json.raw-json');

}, function(modId) { var map = {"../modules/es.json.raw-json":1773651887224}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887621, function(require, module, exports) {

var $ = require('../internals/export');
var aMap = require('../internals/a-map');
var remove = require('../internals/map-helpers').remove;

// `Map.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aMap(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-map":1773651887238,"../internals/map-helpers":1773651887235}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887622, function(require, module, exports) {

var $ = require('../internals/export');
var aMap = require('../internals/a-map');
var MapHelpers = require('../internals/map-helpers');

var get = MapHelpers.get;
var has = MapHelpers.has;
var set = MapHelpers.set;

// `Map.prototype.emplace` method
// https://github.com/tc39/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: true }, {
  emplace: function emplace(key, handler) {
    var map = aMap(this);
    var value, inserted;
    if (has(map, key)) {
      value = get(map, key);
      if ('update' in handler) {
        value = handler.update(value, key, map);
        set(map, key, value);
      } return value;
    }
    inserted = handler.insert(key, map);
    set(map, key, inserted);
    return inserted;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-map":1773651887238,"../internals/map-helpers":1773651887235}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887623, function(require, module, exports) {

var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

// `Map.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  every: function every(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(map, function (value, key) {
      if (!boundFunction(value, key, map)) return false;
    }, true) !== false;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind-context":1773651887005,"../internals/a-map":1773651887238,"../internals/map-iterate":1773651887543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887624, function(require, module, exports) {

var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var MapHelpers = require('../internals/map-helpers');
var iterate = require('../internals/map-iterate');

var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) set(newMap, key, value);
    });
    return newMap;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind-context":1773651887005,"../internals/a-map":1773651887238,"../internals/map-helpers":1773651887235,"../internals/map-iterate":1773651887543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887625, function(require, module, exports) {

var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

// `Map.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  find: function find(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return { value: value };
    }, true);
    return result && result.value;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind-context":1773651887005,"../internals/a-map":1773651887238,"../internals/map-iterate":1773651887543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887626, function(require, module, exports) {

var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

// `Map.prototype.findKey` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  findKey: function findKey(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return { key: key };
    }, true);
    return result && result.key;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind-context":1773651887005,"../internals/a-map":1773651887238,"../internals/map-iterate":1773651887543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887627, function(require, module, exports) {

var $ = require('../internals/export');
var MapHelpers = require('../internals/map-helpers');
var createCollectionFrom = require('../internals/collection-from');

// `Map.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
$({ target: 'Map', stat: true, forced: true }, {
  from: createCollectionFrom(MapHelpers.Map, MapHelpers.set, true)
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/map-helpers":1773651887235,"../internals/collection-from":1773651887628}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887628, function(require, module, exports) {

// https://tc39.github.io/proposal-setmap-offrom/
var bind = require('../internals/function-bind-context');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var iterate = require('../internals/iterate');

module.exports = function (C, adder, ENTRY) {
  return function from(source /* , mapFn, thisArg */) {
    var O = toObject(source);
    var length = arguments.length;
    var mapFn = length > 1 ? arguments[1] : undefined;
    var mapping = mapFn !== undefined;
    var boundFunction = mapping ? bind(mapFn, length > 2 ? arguments[2] : undefined) : undefined;
    var result = new C();
    var n = 0;
    iterate(O, function (nextItem) {
      var entry = mapping ? boundFunction(nextItem, n++) : nextItem;
      if (ENTRY) adder(result, anObject(entry)[0], entry[1]);
      else adder(result, entry);
    });
    return result;
  };
};

}, function(modId) { var map = {"../internals/function-bind-context":1773651887005,"../internals/an-object":1773651887009,"../internals/to-object":1773651887000,"../internals/iterate":1773651887092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887629, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.map.get-or-insert');

}, function(modId) { var map = {"../modules/es.map.get-or-insert":1773651887237}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887630, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.map.get-or-insert-computed');

}, function(modId) { var map = {"../modules/es.map.get-or-insert-computed":1773651887239}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887631, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.map.group-by');

}, function(modId) { var map = {"../modules/es.map.group-by":1773651887234}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887632, function(require, module, exports) {

var $ = require('../internals/export');
var sameValueZero = require('../internals/same-value-zero');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

// `Map.prototype.includes` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  includes: function includes(searchElement) {
    return iterate(aMap(this), function (value) {
      if (sameValueZero(value, searchElement)) return true;
    }, true) === true;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/same-value-zero":1773651887633,"../internals/a-map":1773651887238,"../internals/map-iterate":1773651887543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887633, function(require, module, exports) {

// `SameValueZero` abstract operation
// https://tc39.es/ecma262/#sec-samevaluezero
module.exports = function (x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y || x !== x && y !== y;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887634, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var iterate = require('../internals/iterate');
var isCallable = require('../internals/is-callable');
var aCallable = require('../internals/a-callable');
var Map = require('../internals/map-helpers').Map;

// `Map.keyBy` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', stat: true, forced: true }, {
  keyBy: function keyBy(iterable, keyDerivative) {
    var C = isCallable(this) ? this : Map;
    var newMap = new C();
    aCallable(keyDerivative);
    var setter = aCallable(newMap.set);
    iterate(iterable, function (element) {
      call(setter, newMap, keyDerivative(element), element);
    });
    return newMap;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/iterate":1773651887092,"../internals/is-callable":1773651886969,"../internals/a-callable":1773651886991,"../internals/map-helpers":1773651887235}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887635, function(require, module, exports) {

var $ = require('../internals/export');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

// `Map.prototype.keyOf` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  keyOf: function keyOf(searchElement) {
    var result = iterate(aMap(this), function (value, key) {
      if (value === searchElement) return { key: key };
    }, true);
    return result && result.key;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-map":1773651887238,"../internals/map-iterate":1773651887543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887636, function(require, module, exports) {

var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var MapHelpers = require('../internals/map-helpers');
var iterate = require('../internals/map-iterate');

var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.mapKeys` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  mapKeys: function mapKeys(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      set(newMap, boundFunction(value, key, map), value);
    });
    return newMap;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind-context":1773651887005,"../internals/a-map":1773651887238,"../internals/map-helpers":1773651887235,"../internals/map-iterate":1773651887543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887637, function(require, module, exports) {

var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var MapHelpers = require('../internals/map-helpers');
var iterate = require('../internals/map-iterate');

var Map = MapHelpers.Map;
var set = MapHelpers.set;

// `Map.prototype.mapValues` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  mapValues: function mapValues(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newMap = new Map();
    iterate(map, function (value, key) {
      set(newMap, key, boundFunction(value, key, map));
    });
    return newMap;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind-context":1773651887005,"../internals/a-map":1773651887238,"../internals/map-helpers":1773651887235,"../internals/map-iterate":1773651887543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887638, function(require, module, exports) {

var $ = require('../internals/export');
var aMap = require('../internals/a-map');
var iterate = require('../internals/iterate');
var set = require('../internals/map-helpers').set;

// `Map.prototype.merge` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, arity: 1, forced: true }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  merge: function merge(iterable /* ...iterables */) {
    var map = aMap(this);
    var argumentsLength = arguments.length;
    var i = 0;
    while (i < argumentsLength) {
      iterate(arguments[i++], function (key, value) {
        set(map, key, value);
      }, { AS_ENTRIES: true });
    }
    return map;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-map":1773651887238,"../internals/iterate":1773651887092,"../internals/map-helpers":1773651887235}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887639, function(require, module, exports) {

var $ = require('../internals/export');
var MapHelpers = require('../internals/map-helpers');
var createCollectionOf = require('../internals/collection-of');

// `Map.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
$({ target: 'Map', stat: true, forced: true }, {
  of: createCollectionOf(MapHelpers.Map, MapHelpers.set, true)
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/map-helpers":1773651887235,"../internals/collection-of":1773651887640}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887640, function(require, module, exports) {

var anObject = require('../internals/an-object');

// https://tc39.github.io/proposal-setmap-offrom/
module.exports = function (C, adder, ENTRY) {
  return function of() {
    var result = new C();
    var length = arguments.length;
    for (var index = 0; index < length; index++) {
      var entry = arguments[index];
      if (ENTRY) adder(result, anObject(entry)[0], entry[1]);
      else adder(result, entry);
    } return result;
  };
};

}, function(modId) { var map = {"../internals/an-object":1773651887009}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887641, function(require, module, exports) {

var $ = require('../internals/export');
var aCallable = require('../internals/a-callable');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

var $TypeError = TypeError;

// `Map.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var map = aMap(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable(callbackfn);
    iterate(map, function (value, key) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, key, map);
      }
    });
    if (noInitial) throw new $TypeError('Reduce of empty map with no initial value');
    return accumulator;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-callable":1773651886991,"../internals/a-map":1773651887238,"../internals/map-iterate":1773651887543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887642, function(require, module, exports) {

var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aMap = require('../internals/a-map');
var iterate = require('../internals/map-iterate');

// `Map.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  some: function some(callbackfn /* , thisArg */) {
    var map = aMap(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(map, function (value, key) {
      if (boundFunction(value, key, map)) return true;
    }, true) === true;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind-context":1773651887005,"../internals/a-map":1773651887238,"../internals/map-iterate":1773651887543}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887643, function(require, module, exports) {

var $ = require('../internals/export');
var aCallable = require('../internals/a-callable');
var aMap = require('../internals/a-map');
var MapHelpers = require('../internals/map-helpers');

var $TypeError = TypeError;
var get = MapHelpers.get;
var has = MapHelpers.has;
var set = MapHelpers.set;

// `Map.prototype.update` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Map', proto: true, real: true, forced: true }, {
  update: function update(key, callback /* , thunk */) {
    var map = aMap(this);
    var length = arguments.length;
    aCallable(callback);
    var isPresentInMap = has(map, key);
    if (!isPresentInMap && length < 3) {
      throw new $TypeError('Updating absent value');
    }
    var value = isPresentInMap ? get(map, key) : aCallable(length > 2 ? arguments[2] : undefined)(key, map);
    set(map, key, callback(value, key, map));
    return map;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-callable":1773651886991,"../internals/a-map":1773651887238,"../internals/map-helpers":1773651887235}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887644, function(require, module, exports) {

// TODO: remove from `core-js@4`
var $ = require('../internals/export');
var upsert = require('../internals/map-upsert');

// `Map.prototype.updateOrInsert` method (replaced by `Map.prototype.emplace`)
// https://github.com/thumbsupep/proposal-upsert
$({ target: 'Map', proto: true, real: true, name: 'upsert', forced: true }, {
  updateOrInsert: upsert
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/map-upsert":1773651887645}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887645, function(require, module, exports) {

var call = require('../internals/function-call');
var aCallable = require('../internals/a-callable');
var isCallable = require('../internals/is-callable');
var anObject = require('../internals/an-object');

var $TypeError = TypeError;

// `Map.prototype.upsert` method
// https://github.com/tc39/proposal-upsert
module.exports = function upsert(key, updateFn /* , insertFn */) {
  var map = anObject(this);
  var get = aCallable(map.get);
  var has = aCallable(map.has);
  var set = aCallable(map.set);
  var insertFn = arguments.length > 2 ? arguments[2] : undefined;
  var value;
  if (!isCallable(updateFn) && !isCallable(insertFn)) {
    throw new $TypeError('At least one callback required');
  }
  if (call(has, map, key)) {
    value = call(get, map, key);
    if (isCallable(updateFn)) {
      value = updateFn(value);
      call(set, map, key, value);
    }
  } else if (isCallable(insertFn)) {
    value = insertFn();
    call(set, map, key, value);
  } return value;
};

}, function(modId) { var map = {"../internals/function-call":1773651886972,"../internals/a-callable":1773651886991,"../internals/is-callable":1773651886969,"../internals/an-object":1773651887009}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887646, function(require, module, exports) {

// TODO: remove from `core-js@4`
var $ = require('../internals/export');
var upsert = require('../internals/map-upsert');

// `Map.prototype.upsert` method (replaced by `Map.prototype.emplace`)
// https://github.com/thumbsupep/proposal-upsert
$({ target: 'Map', proto: true, real: true, forced: true }, {
  upsert: upsert
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/map-upsert":1773651887645}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887647, function(require, module, exports) {

var $ = require('../internals/export');
var clamp = require('../internals/math-clamp');

// TODO: Remove from `core-js@4`
// `Math.clamp` method
// https://github.com/tc39/proposal-math-clamp
$({ target: 'Math', stat: true, forced: true }, {
  clamp: clamp
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-clamp":1773651887648}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887648, function(require, module, exports) {

var aNumber = require('../internals/a-number');

var $min = Math.min;
var $max = Math.max;

module.exports = function clamp(value, min, max) {
  return $min($max(aNumber(value), aNumber(min)), aNumber(max));
};

}, function(modId) { var map = {"../internals/a-number":1773651887649}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887649, function(require, module, exports) {

var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'number') return argument;
  throw new $TypeError('Argument is not a number');
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887650, function(require, module, exports) {

var $ = require('../internals/export');

// `Math.DEG_PER_RAD` constant
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, nonConfigurable: true, nonWritable: true }, {
  DEG_PER_RAD: Math.PI / 180
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887651, function(require, module, exports) {

var $ = require('../internals/export');

var RAD_PER_DEG = 180 / Math.PI;

// `Math.degrees` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, forced: true }, {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887652, function(require, module, exports) {

var $ = require('../internals/export');

var scale = require('../internals/math-scale');
var fround = require('../internals/math-fround');

// `Math.fscale` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, forced: true }, {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-scale":1773651887653,"../internals/math-fround":1773651887251}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887653, function(require, module, exports) {

// `Math.scale` method implementation
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = function scale(x, inLow, inHigh, outLow, outHigh) {
  var nx = +x;
  var nInLow = +inLow;
  var nInHigh = +inHigh;
  var nOutLow = +outLow;
  var nOutHigh = +outHigh;
  // eslint-disable-next-line no-self-compare -- NaN check
  if (nx !== nx || nInLow !== nInLow || nInHigh !== nInHigh || nOutLow !== nOutLow || nOutHigh !== nOutHigh) return NaN;
  if (nx === Infinity || nx === -Infinity) return nx;
  return (nx - nInLow) * (nOutHigh - nOutLow) / (nInHigh - nInLow) + nOutLow;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887654, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.math.f16round');

}, function(modId) { var map = {"../modules/es.math.f16round":1773651887254}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887655, function(require, module, exports) {

var $ = require('../internals/export');

// `Math.iaddh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true, forced: true }, {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887656, function(require, module, exports) {

var $ = require('../internals/export');

// `Math.imulh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true, forced: true }, {
  imulh: function imulh(u, v) {
    var UINT16 = 0xFFFF;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887657, function(require, module, exports) {

var $ = require('../internals/export');

// `Math.isubh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true, forced: true }, {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887658, function(require, module, exports) {

var $ = require('../internals/export');

// `Math.RAD_PER_DEG` constant
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, nonConfigurable: true, nonWritable: true }, {
  RAD_PER_DEG: 180 / Math.PI
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887659, function(require, module, exports) {

var $ = require('../internals/export');

var DEG_PER_RAD = Math.PI / 180;

// `Math.radians` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, forced: true }, {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887660, function(require, module, exports) {

var $ = require('../internals/export');
var scale = require('../internals/math-scale');

// `Math.scale` method
// https://rwaldron.github.io/proposal-math-extensions/
$({ target: 'Math', stat: true, forced: true }, {
  scale: scale
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-scale":1773651887653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887661, function(require, module, exports) {

var $ = require('../internals/export');
var anObject = require('../internals/an-object');
var numberIsFinite = require('../internals/number-is-finite');
var createIteratorConstructor = require('../internals/iterator-create-constructor');
var createIterResultObject = require('../internals/create-iter-result-object');
var InternalStateModule = require('../internals/internal-state');

var SEEDED_RANDOM = 'Seeded Random';
var SEEDED_RANDOM_GENERATOR = SEEDED_RANDOM + ' Generator';
var SEED_TYPE_ERROR = 'Math.seededPRNG() argument should have a "seed" field with a finite value.';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SEEDED_RANDOM_GENERATOR);
var $TypeError = TypeError;

var $SeededRandomGenerator = createIteratorConstructor(function SeededRandomGenerator(seed) {
  setInternalState(this, {
    type: SEEDED_RANDOM_GENERATOR,
    seed: seed % 2147483647
  });
}, SEEDED_RANDOM, function next() {
  var state = getInternalState(this);
  var seed = state.seed = (state.seed * 1103515245 + 12345) % 2147483647;
  return createIterResultObject((seed & 1073741823) / 1073741823, false);
});

// `Math.seededPRNG` method
// https://github.com/tc39/proposal-seeded-random
// based on https://github.com/tc39/proposal-seeded-random/blob/78b8258835b57fc2100d076151ab506bc3202ae6/demo.html
$({ target: 'Math', stat: true, forced: true }, {
  seededPRNG: function seededPRNG(it) {
    var seed = anObject(it).seed;
    if (!numberIsFinite(seed)) throw new $TypeError(SEED_TYPE_ERROR);
    return new $SeededRandomGenerator(seed);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/an-object":1773651887009,"../internals/number-is-finite":1773651887274,"../internals/iterator-create-constructor":1773651887134,"../internals/create-iter-result-object":1773651887136,"../internals/internal-state":1773651887038}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887662, function(require, module, exports) {

var $ = require('../internals/export');

// `Math.signbit` method
// https://github.com/tc39/proposal-Math.signbit
$({ target: 'Math', stat: true, forced: true }, {
  signbit: function signbit(x) {
    var n = +x;
    // eslint-disable-next-line no-self-compare -- NaN check
    return n === n && n === 0 ? 1 / n === -Infinity : n < 0;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887663, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.math.sum-precise');

}, function(modId) { var map = {"../modules/es.math.sum-precise":1773651887264}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887664, function(require, module, exports) {

var $ = require('../internals/export');

// `Math.umulh` method
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
// TODO: Remove from `core-js@4`
$({ target: 'Math', stat: true, forced: true }, {
  umulh: function umulh(u, v) {
    var UINT16 = 0xFFFF;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887665, function(require, module, exports) {

var $ = require('../internals/export');
var $clamp = require('../internals/math-clamp');
var thisNumberValue = require('../internals/this-number-value');

// `Number.prototype.clamp` method
// https://github.com/tc39/proposal-math-clamp
$({ target: 'Number', proto: true, forced: true }, {
  clamp: function clamp(min, max) {
    return $clamp(thisNumberValue(this), min, max);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/math-clamp":1773651887648,"../internals/this-number-value":1773651887269}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887666, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');

var INVALID_NUMBER_REPRESENTATION = 'Invalid number representation';
var INVALID_RADIX = 'Invalid radix';
var $RangeError = RangeError;
var $SyntaxError = SyntaxError;
var $TypeError = TypeError;
var $parseInt = parseInt;
var pow = Math.pow;
var valid = /^[\d.a-z]+$/;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(valid.exec);
var numberToString = uncurryThis(1.1.toString);
var stringSlice = uncurryThis(''.slice);
var split = uncurryThis(''.split);

// `Number.fromString` method
// https://github.com/tc39/proposal-number-fromstring
$({ target: 'Number', stat: true, forced: true }, {
  fromString: function fromString(string, radix) {
    var sign = 1;
    if (typeof string != 'string') throw new $TypeError(INVALID_NUMBER_REPRESENTATION);
    if (!string.length) throw new $SyntaxError(INVALID_NUMBER_REPRESENTATION);
    if (charAt(string, 0) === '-') {
      sign = -1;
      string = stringSlice(string, 1);
      if (!string.length) throw new $SyntaxError(INVALID_NUMBER_REPRESENTATION);
    }
    var R = radix === undefined ? 10 : toIntegerOrInfinity(radix);
    if (R < 2 || R > 36) throw new $RangeError(INVALID_RADIX);
    if (!exec(valid, string)) throw new $SyntaxError(INVALID_NUMBER_REPRESENTATION);
    var parts = split(string, '.');
    var mathNum = $parseInt(parts[0], R);
    if (parts.length > 1) mathNum += $parseInt(parts[1], R) / pow(R, parts[1].length);
    if (R === 10 && numberToString(mathNum, R) !== string) throw new $SyntaxError(INVALID_NUMBER_REPRESENTATION);
    return sign * mathNum;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/to-integer-or-infinity":1773651887019}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887667, function(require, module, exports) {

var $ = require('../internals/export');
var NumericRangeIterator = require('../internals/numeric-range-iterator');

// `Number.range` method
// https://github.com/tc39/proposal-Number.range
// TODO: Remove from `core-js@4`
$({ target: 'Number', stat: true, forced: true }, {
  range: function range(start, end, option) {
    return new NumericRangeIterator(start, end, option, 'number', 0, 1);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/numeric-range-iterator":1773651887571}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887668, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.object.has-own');

}, function(modId) { var map = {"../modules/es.object.has-own":1773651887305}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887669, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var ObjectIterator = require('../internals/object-iterator');

// `Object.iterateEntries` method
// https://github.com/tc39/proposal-object-iteration
$({ target: 'Object', stat: true, forced: true }, {
  iterateEntries: function iterateEntries(object) {
    return new ObjectIterator(object, 'entries');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/object-iterator":1773651887670}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887670, function(require, module, exports) {

var InternalStateModule = require('../internals/internal-state');
var createIteratorConstructor = require('../internals/iterator-create-constructor');
var createIterResultObject = require('../internals/create-iter-result-object');
var hasOwn = require('../internals/has-own-property');
var objectKeys = require('../internals/object-keys');
var toObject = require('../internals/to-object');

var OBJECT_ITERATOR = 'Object Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(OBJECT_ITERATOR);

module.exports = createIteratorConstructor(function ObjectIterator(source, mode) {
  var object = toObject(source);
  setInternalState(this, {
    type: OBJECT_ITERATOR,
    mode: mode,
    object: object,
    keys: objectKeys(object),
    index: 0
  });
}, 'Object', function next() {
  var state = getInternalState(this);
  var keys = state.keys;
  while (true) {
    if (keys === null || state.index >= keys.length) {
      state.object = state.keys = null;
      return createIterResultObject(undefined, true);
    }
    var key = keys[state.index++];
    var object = state.object;
    if (!hasOwn(object, key)) continue;
    switch (state.mode) {
      case 'keys': return createIterResultObject(key, false);
      case 'values': return createIterResultObject(object[key], false);
    } /* entries */ return createIterResultObject([key, object[key]], false);
  }
});

}, function(modId) { var map = {"../internals/internal-state":1773651887038,"../internals/iterator-create-constructor":1773651887134,"../internals/create-iter-result-object":1773651887136,"../internals/has-own-property":1773651886999,"../internals/object-keys":1773651887015,"../internals/to-object":1773651887000}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887671, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var ObjectIterator = require('../internals/object-iterator');

// `Object.iterateKeys` method
// https://github.com/tc39/proposal-object-iteration
$({ target: 'Object', stat: true, forced: true }, {
  iterateKeys: function iterateKeys(object) {
    return new ObjectIterator(object, 'keys');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/object-iterator":1773651887670}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887672, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var ObjectIterator = require('../internals/object-iterator');

// `Object.iterateValues` method
// https://github.com/tc39/proposal-object-iteration
$({ target: 'Object', stat: true, forced: true }, {
  iterateValues: function iterateValues(object) {
    return new ObjectIterator(object, 'values');
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/object-iterator":1773651887670}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887673, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.object.group-by');

}, function(modId) { var map = {"../modules/es.object.group-by":1773651887304}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887674, function(require, module, exports) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require('../modules/esnext.observable.constructor');
require('../modules/esnext.observable.from');
require('../modules/esnext.observable.of');

}, function(modId) { var map = {"../modules/esnext.observable.constructor":1773651887675,"../modules/esnext.observable.from":1773651887676,"../modules/esnext.observable.of":1773651887677}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887675, function(require, module, exports) {

// https://github.com/tc39/proposal-observable
var $ = require('../internals/export');
var call = require('../internals/function-call');
var DESCRIPTORS = require('../internals/descriptors');
var setSpecies = require('../internals/set-species');
var aCallable = require('../internals/a-callable');
var anObject = require('../internals/an-object');
var anInstance = require('../internals/an-instance');
var isCallable = require('../internals/is-callable');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var isObject = require('../internals/is-object');
var getMethod = require('../internals/get-method');
var defineBuiltIn = require('../internals/define-built-in');
var defineBuiltIns = require('../internals/define-built-ins');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var hostReportErrors = require('../internals/host-report-errors');
var wellKnownSymbol = require('../internals/well-known-symbol');
var InternalStateModule = require('../internals/internal-state');

var $$OBSERVABLE = wellKnownSymbol('observable');
var OBSERVABLE = 'Observable';
var SUBSCRIPTION = 'Subscription';
var SUBSCRIPTION_OBSERVER = 'SubscriptionObserver';
var getterFor = InternalStateModule.getterFor;
var setInternalState = InternalStateModule.set;
var getObservableInternalState = getterFor(OBSERVABLE);
var getSubscriptionInternalState = getterFor(SUBSCRIPTION);
var getSubscriptionObserverInternalState = getterFor(SUBSCRIPTION_OBSERVER);

var SubscriptionState = function (observer) {
  this.observer = anObject(observer);
  this.cleanup = null;
  this.subscriptionObserver = null;
};

SubscriptionState.prototype = {
  type: SUBSCRIPTION,
  clean: function () {
    var cleanup = this.cleanup;
    if (cleanup) {
      this.cleanup = null;
      try {
        cleanup();
      } catch (error) {
        hostReportErrors(error);
      }
    }
  },
  close: function () {
    if (!DESCRIPTORS) {
      var subscription = this.facade;
      var subscriptionObserver = this.subscriptionObserver;
      subscription.closed = true;
      if (subscriptionObserver) subscriptionObserver.closed = true;
    } this.observer = null;
  },
  isClosed: function () {
    return this.observer === null;
  }
};

var Subscription = function (observer, subscriber) {
  var subscriptionState = setInternalState(this, new SubscriptionState(observer));
  var start;
  if (!DESCRIPTORS) this.closed = false;
  try {
    if (start = getMethod(observer, 'start')) call(start, observer, this);
  } catch (error) {
    hostReportErrors(error);
  }
  if (subscriptionState.isClosed()) return;
  var subscriptionObserver = subscriptionState.subscriptionObserver = new SubscriptionObserver(subscriptionState);
  try {
    var cleanup = subscriber(subscriptionObserver);
    var subscription = cleanup;
    if (!isNullOrUndefined(cleanup)) subscriptionState.cleanup = isCallable(cleanup.unsubscribe)
      ? function () { subscription.unsubscribe(); }
      : aCallable(cleanup);
  } catch (error) {
    subscriptionObserver.error(error);
    return;
  } if (subscriptionState.isClosed()) subscriptionState.clean();
};

Subscription.prototype = defineBuiltIns({}, {
  unsubscribe: function unsubscribe() {
    var subscriptionState = getSubscriptionInternalState(this);
    if (!subscriptionState.isClosed()) {
      subscriptionState.close();
      subscriptionState.clean();
    }
  }
});

if (DESCRIPTORS) defineBuiltInAccessor(Subscription.prototype, 'closed', {
  configurable: true,
  get: function closed() {
    return getSubscriptionInternalState(this).isClosed();
  }
});

var SubscriptionObserver = function (subscriptionState) {
  setInternalState(this, {
    type: SUBSCRIPTION_OBSERVER,
    subscriptionState: subscriptionState
  });
  if (!DESCRIPTORS) this.closed = false;
};

SubscriptionObserver.prototype = defineBuiltIns({}, {
  next: function next(value) {
    var subscriptionState = getSubscriptionObserverInternalState(this).subscriptionState;
    if (!subscriptionState.isClosed()) {
      var observer = subscriptionState.observer;
      try {
        var nextMethod = getMethod(observer, 'next');
        if (nextMethod) call(nextMethod, observer, value);
      } catch (error) {
        hostReportErrors(error);
      }
    }
  },
  error: function error(value) {
    var subscriptionState = getSubscriptionObserverInternalState(this).subscriptionState;
    if (!subscriptionState.isClosed()) {
      var observer = subscriptionState.observer;
      subscriptionState.close();
      try {
        var errorMethod = getMethod(observer, 'error');
        if (errorMethod) call(errorMethod, observer, value);
        else hostReportErrors(value);
      } catch (err) {
        hostReportErrors(err);
      } subscriptionState.clean();
    }
  },
  complete: function complete() {
    var subscriptionState = getSubscriptionObserverInternalState(this).subscriptionState;
    if (!subscriptionState.isClosed()) {
      var observer = subscriptionState.observer;
      subscriptionState.close();
      try {
        var completeMethod = getMethod(observer, 'complete');
        if (completeMethod) call(completeMethod, observer);
      } catch (error) {
        hostReportErrors(error);
      } subscriptionState.clean();
    }
  }
});

if (DESCRIPTORS) defineBuiltInAccessor(SubscriptionObserver.prototype, 'closed', {
  configurable: true,
  get: function closed() {
    return getSubscriptionObserverInternalState(this).subscriptionState.isClosed();
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, ObservablePrototype);
  setInternalState(this, {
    type: OBSERVABLE,
    subscriber: aCallable(subscriber)
  });
};

var ObservablePrototype = $Observable.prototype;

defineBuiltIns(ObservablePrototype, {
  subscribe: function subscribe(observer) {
    var length = arguments.length;
    return new Subscription(isCallable(observer) ? {
      next: observer,
      error: length > 1 ? arguments[1] : undefined,
      complete: length > 2 ? arguments[2] : undefined
    } : isObject(observer) ? observer : {}, getObservableInternalState(this).subscriber);
  }
});

defineBuiltIn(ObservablePrototype, $$OBSERVABLE, function () { return this; });

$({ global: true, constructor: true, forced: true }, {
  Observable: $Observable
});

setSpecies(OBSERVABLE);

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/descriptors":1773651886971,"../internals/set-species":1773651887157,"../internals/a-callable":1773651886991,"../internals/an-object":1773651887009,"../internals/an-instance":1773651887189,"../internals/is-callable":1773651886969,"../internals/is-null-or-undefined":1773651886978,"../internals/is-object":1773651886981,"../internals/get-method":1773651886990,"../internals/define-built-in":1773651887031,"../internals/define-built-ins":1773651887190,"../internals/define-built-in-accessor":1773651887032,"../internals/host-report-errors":1773651887334,"../internals/well-known-symbol":1773651886994,"../internals/internal-state":1773651887038}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887676, function(require, module, exports) {

var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var call = require('../internals/function-call');
var anObject = require('../internals/an-object');
var isConstructor = require('../internals/is-constructor');
var getIterator = require('../internals/get-iterator');
var getMethod = require('../internals/get-method');
var iterate = require('../internals/iterate');
var wellKnownSymbol = require('../internals/well-known-symbol');

var $$OBSERVABLE = wellKnownSymbol('observable');

// `Observable.from` method
// https://github.com/tc39/proposal-observable
$({ target: 'Observable', stat: true, forced: true }, {
  from: function from(x) {
    var C = isConstructor(this) ? this : getBuiltIn('Observable');
    var observableMethod = getMethod(anObject(x), $$OBSERVABLE);
    if (observableMethod) {
      var observable = anObject(call(observableMethod, x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    var iterator = getIterator(x);
    return new C(function (observer) {
      iterate(iterator, function (it, stop) {
        observer.next(it);
        if (observer.closed) return stop();
      }, { IS_ITERATOR: true, INTERRUPTED: true });
      observer.complete();
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/get-built-in":1773651886983,"../internals/function-call":1773651886972,"../internals/an-object":1773651887009,"../internals/is-constructor":1773651887044,"../internals/get-iterator":1773651887095,"../internals/get-method":1773651886990,"../internals/iterate":1773651887092,"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887677, function(require, module, exports) {

var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var isConstructor = require('../internals/is-constructor');

var Array = getBuiltIn('Array');

// `Observable.of` method
// https://github.com/tc39/proposal-observable
$({ target: 'Observable', stat: true, forced: true }, {
  of: function of() {
    var C = isConstructor(this) ? this : getBuiltIn('Observable');
    var length = arguments.length;
    var items = Array(length);
    var index = 0;
    while (index < length) items[index] = arguments[index++];
    return new C(function (observer) {
      for (var i = 0; i < length; i++) {
        observer.next(items[i]);
        if (observer.closed) return;
      } observer.complete();
    });
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/get-built-in":1773651886983,"../internals/is-constructor":1773651887044}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887678, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.promise.all-settled.js');

}, function(modId) { var map = {"../modules/es.promise.all-settled.js":1773651887346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887679, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.promise.any');

}, function(modId) { var map = {"../modules/es.promise.any":1773651887347}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887680, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.promise.try.js');

}, function(modId) { var map = {"../modules/es.promise.try.js":1773651887349}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887681, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.promise.with-resolvers');

}, function(modId) { var map = {"../modules/es.promise.with-resolvers":1773651887350}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887682, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var toMetadataKey = ReflectMetadataModule.toKey;
var ordinaryDefineOwnMetadata = ReflectMetadataModule.set;

// `Reflect.defineMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  defineMetadata: function defineMetadata(metadataKey, metadataValue, target /* , targetKey */) {
    var targetKey = arguments.length < 4 ? undefined : toMetadataKey(arguments[3]);
    ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), targetKey);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/reflect-metadata":1773651887683,"../internals/an-object":1773651887009}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887683, function(require, module, exports) {

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
require('../modules/es.map');
require('../modules/es.weak-map');
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var shared = require('../internals/shared');

var Map = getBuiltIn('Map');
var WeakMap = getBuiltIn('WeakMap');
var push = uncurryThis([].push);

var metadata = shared('metadata');
var store = metadata.store || (metadata.store = new WeakMap());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};

var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};

var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};

var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};

var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { push(keys, key); });
  return keys;
};

var toMetadataKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};

module.exports = {
  store: store,
  getMap: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  toKey: toMetadataKey
};

}, function(modId) { var map = {"../modules/es.map":1773651887227,"../modules/es.weak-map":1773651887511,"../internals/get-built-in":1773651886983,"../internals/function-uncurry-this":1773651886968,"../internals/shared":1773651886995}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887684, function(require, module, exports) {

var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var toMetadataKey = ReflectMetadataModule.toKey;
var getOrCreateMetadataMap = ReflectMetadataModule.getMap;
var store = ReflectMetadataModule.store;

// `Reflect.deleteMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
    if (metadataMap.size) return true;
    var targetMetadata = store.get(target);
    targetMetadata['delete'](targetKey);
    return !!targetMetadata.size || store['delete'](target);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/reflect-metadata":1773651887683,"../internals/an-object":1773651887009}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887685, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');
var getPrototypeOf = require('../internals/object-get-prototype-of');

var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var ordinaryGetOwnMetadata = ReflectMetadataModule.get;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

// `Reflect.getMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryGetMetadata(metadataKey, anObject(target), targetKey);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/reflect-metadata":1773651887683,"../internals/an-object":1773651887009,"../internals/object-get-prototype-of":1773651887090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887686, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var $arrayUniqueBy = require('../internals/array-unique-by');

var arrayUniqueBy = uncurryThis($arrayUniqueBy);
var concat = uncurryThis([].concat);
var ordinaryOwnMetadataKeys = ReflectMetadataModule.keys;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? arrayUniqueBy(concat(oKeys, pKeys)) : pKeys : oKeys;
};

// `Reflect.getMetadataKeys` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
    var targetKey = arguments.length < 2 ? undefined : toMetadataKey(arguments[1]);
    return ordinaryMetadataKeys(anObject(target), targetKey);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/reflect-metadata":1773651887683,"../internals/an-object":1773651887009,"../internals/object-get-prototype-of":1773651887090,"../internals/array-unique-by":1773651887542}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887687, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var ordinaryGetOwnMetadata = ReflectMetadataModule.get;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.getOwnMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryGetOwnMetadata(metadataKey, anObject(target), targetKey);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/reflect-metadata":1773651887683,"../internals/an-object":1773651887009}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887688, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var ordinaryOwnMetadataKeys = ReflectMetadataModule.keys;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.getOwnMetadataKeys` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
    var targetKey = arguments.length < 2 ? undefined : toMetadataKey(arguments[1]);
    return ordinaryOwnMetadataKeys(anObject(target), targetKey);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/reflect-metadata":1773651887683,"../internals/an-object":1773651887009}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887689, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');
var getPrototypeOf = require('../internals/object-get-prototype-of');

var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

// `Reflect.hasMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryHasMetadata(metadataKey, anObject(target), targetKey);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/reflect-metadata":1773651887683,"../internals/an-object":1773651887009,"../internals/object-get-prototype-of":1773651887090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887690, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.hasOwnMetadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryHasOwnMetadata(metadataKey, anObject(target), targetKey);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/reflect-metadata":1773651887683,"../internals/an-object":1773651887009}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887691, function(require, module, exports) {

var $ = require('../internals/export');
var ReflectMetadataModule = require('../internals/reflect-metadata');
var anObject = require('../internals/an-object');

var toMetadataKey = ReflectMetadataModule.toKey;
var ordinaryDefineOwnMetadata = ReflectMetadataModule.set;

// `Reflect.metadata` method
// https://github.com/rbuckton/reflect-metadata
$({ target: 'Reflect', stat: true }, {
  metadata: function metadata(metadataKey, metadataValue) {
    return function decorator(target, key) {
      ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetadataKey(key));
    };
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/reflect-metadata":1773651887683,"../internals/an-object":1773651887009}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887692, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.regexp.escape.js');

}, function(modId) { var map = {"../modules/es.regexp.escape.js":1773651887376}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887693, function(require, module, exports) {

var $ = require('../internals/export');
var aSet = require('../internals/a-set');
var add = require('../internals/set-helpers').add;

// `Set.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  addAll: function addAll(/* ...elements */) {
    var set = aSet(this);
    for (var k = 0, len = arguments.length; k < len; k++) {
      add(set, arguments[k]);
    } return set;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-set":1773651887388,"../internals/set-helpers":1773651887389}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887694, function(require, module, exports) {

var $ = require('../internals/export');
var aSet = require('../internals/a-set');
var remove = require('../internals/set-helpers').remove;

// `Set.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aSet(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-set":1773651887388,"../internals/set-helpers":1773651887389}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887695, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.set.difference.v2');

}, function(modId) { var map = {"../modules/es.set.difference.v2":1773651887386}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887696, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $difference = require('../internals/set-difference');

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  difference: function difference(other) {
    return call($difference, this, toSetLike(other));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/to-set-like":1773651887697,"../internals/set-difference":1773651887387}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887697, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var isCallable = require('../internals/is-callable');
var isIterable = require('../internals/is-iterable');
var isObject = require('../internals/is-object');

var Set = getBuiltIn('Set');

var isSetLike = function (it) {
  return isObject(it)
    && typeof it.size == 'number'
    && isCallable(it.has)
    && isCallable(it.keys);
};

// fallback old -> new set methods proposal arguments
module.exports = function (it) {
  if (isSetLike(it)) return it;
  return isIterable(it) ? new Set(it) : it;
};

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/is-callable":1773651886969,"../internals/is-iterable":1773651887698,"../internals/is-object":1773651886981}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887698, function(require, module, exports) {

var classof = require('../internals/classof');
var hasOwn = require('../internals/has-own-property');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var $Object = Object;

module.exports = function (it) {
  if (isNullOrUndefined(it)) return false;
  var O = $Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || hasOwn(Iterators, classof(O));
};

}, function(modId) { var map = {"../internals/classof":1773651887011,"../internals/has-own-property":1773651886999,"../internals/is-null-or-undefined":1773651886978,"../internals/well-known-symbol":1773651886994,"../internals/iterators":1773651887094}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887699, function(require, module, exports) {

var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aSet = require('../internals/a-set');
var iterate = require('../internals/set-iterate');

// `Set.prototype.every` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  every: function every(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(set, function (value) {
      if (!boundFunction(value, value, set)) return false;
    }, true) !== false;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind-context":1773651887005,"../internals/a-set":1773651887388,"../internals/set-iterate":1773651887391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887700, function(require, module, exports) {

var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aSet = require('../internals/a-set');
var SetHelpers = require('../internals/set-helpers');
var iterate = require('../internals/set-iterate');

var Set = SetHelpers.Set;
var add = SetHelpers.add;

// `Set.prototype.filter` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  filter: function filter(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newSet = new Set();
    iterate(set, function (value) {
      if (boundFunction(value, value, set)) add(newSet, value);
    });
    return newSet;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind-context":1773651887005,"../internals/a-set":1773651887388,"../internals/set-helpers":1773651887389,"../internals/set-iterate":1773651887391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887701, function(require, module, exports) {

var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aSet = require('../internals/a-set');
var iterate = require('../internals/set-iterate');

// `Set.prototype.find` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  find: function find(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var result = iterate(set, function (value) {
      if (boundFunction(value, value, set)) return { value: value };
    }, true);
    return result && result.value;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind-context":1773651887005,"../internals/a-set":1773651887388,"../internals/set-iterate":1773651887391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887702, function(require, module, exports) {

var $ = require('../internals/export');
var SetHelpers = require('../internals/set-helpers');
var createCollectionFrom = require('../internals/collection-from');

// `Set.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
$({ target: 'Set', stat: true, forced: true }, {
  from: createCollectionFrom(SetHelpers.Set, SetHelpers.add, false)
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/set-helpers":1773651887389,"../internals/collection-from":1773651887628}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887703, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.set.intersection.v2');

}, function(modId) { var map = {"../modules/es.set.intersection.v2":1773651887396}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887704, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $intersection = require('../internals/set-intersection');

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  intersection: function intersection(other) {
    return call($intersection, this, toSetLike(other));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/to-set-like":1773651887697,"../internals/set-intersection":1773651887397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887705, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.set.is-disjoint-from.v2');

}, function(modId) { var map = {"../modules/es.set.is-disjoint-from.v2":1773651887398}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887706, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $isDisjointFrom = require('../internals/set-is-disjoint-from');

// `Set.prototype.isDisjointFrom` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  isDisjointFrom: function isDisjointFrom(other) {
    return call($isDisjointFrom, this, toSetLike(other));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/to-set-like":1773651887697,"../internals/set-is-disjoint-from":1773651887399}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887707, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.set.is-subset-of.v2');

}, function(modId) { var map = {"../modules/es.set.is-subset-of.v2":1773651887400}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887708, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $isSubsetOf = require('../internals/set-is-subset-of');

// `Set.prototype.isSubsetOf` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  isSubsetOf: function isSubsetOf(other) {
    return call($isSubsetOf, this, toSetLike(other));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/to-set-like":1773651887697,"../internals/set-is-subset-of":1773651887401}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887709, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.set.is-superset-of.v2');

}, function(modId) { var map = {"../modules/es.set.is-superset-of.v2":1773651887402}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887710, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $isSupersetOf = require('../internals/set-is-superset-of');

// `Set.prototype.isSupersetOf` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  isSupersetOf: function isSupersetOf(other) {
    return call($isSupersetOf, this, toSetLike(other));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/to-set-like":1773651887697,"../internals/set-is-superset-of":1773651887403}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887711, function(require, module, exports) {

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var aSet = require('../internals/a-set');
var iterate = require('../internals/set-iterate');
var toString = require('../internals/to-string');

var arrayJoin = uncurryThis([].join);
var push = uncurryThis([].push);

// `Set.prototype.join` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  join: function join(separator) {
    var set = aSet(this);
    var sep = separator === undefined ? ',' : toString(separator);
    var array = [];
    iterate(set, function (value) {
      push(array, value);
    });
    return arrayJoin(array, sep);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-uncurry-this":1773651886968,"../internals/a-set":1773651887388,"../internals/set-iterate":1773651887391,"../internals/to-string":1773651887010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887712, function(require, module, exports) {

var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aSet = require('../internals/a-set');
var SetHelpers = require('../internals/set-helpers');
var iterate = require('../internals/set-iterate');

var Set = SetHelpers.Set;
var add = SetHelpers.add;

// `Set.prototype.map` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  map: function map(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    var newSet = new Set();
    iterate(set, function (value) {
      add(newSet, boundFunction(value, value, set));
    });
    return newSet;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind-context":1773651887005,"../internals/a-set":1773651887388,"../internals/set-helpers":1773651887389,"../internals/set-iterate":1773651887391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887713, function(require, module, exports) {

var $ = require('../internals/export');
var SetHelpers = require('../internals/set-helpers');
var createCollectionOf = require('../internals/collection-of');

// `Set.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
$({ target: 'Set', stat: true, forced: true }, {
  of: createCollectionOf(SetHelpers.Set, SetHelpers.add, false)
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/set-helpers":1773651887389,"../internals/collection-of":1773651887640}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887714, function(require, module, exports) {

var $ = require('../internals/export');
var aCallable = require('../internals/a-callable');
var aSet = require('../internals/a-set');
var iterate = require('../internals/set-iterate');

var $TypeError = TypeError;

// `Set.prototype.reduce` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var set = aSet(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    aCallable(callbackfn);
    iterate(set, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = callbackfn(accumulator, value, value, set);
      }
    });
    if (noInitial) throw new $TypeError('Reduce of empty set with no initial value');
    return accumulator;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-callable":1773651886991,"../internals/a-set":1773651887388,"../internals/set-iterate":1773651887391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887715, function(require, module, exports) {

var $ = require('../internals/export');
var bind = require('../internals/function-bind-context');
var aSet = require('../internals/a-set');
var iterate = require('../internals/set-iterate');

// `Set.prototype.some` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'Set', proto: true, real: true, forced: true }, {
  some: function some(callbackfn /* , thisArg */) {
    var set = aSet(this);
    var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return iterate(set, function (value) {
      if (boundFunction(value, value, set)) return true;
    }, true) === true;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-bind-context":1773651887005,"../internals/a-set":1773651887388,"../internals/set-iterate":1773651887391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887716, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.set.symmetric-difference.v2');

}, function(modId) { var map = {"../modules/es.set.symmetric-difference.v2":1773651887404}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887717, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $symmetricDifference = require('../internals/set-symmetric-difference');

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  symmetricDifference: function symmetricDifference(other) {
    return call($symmetricDifference, this, toSetLike(other));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/to-set-like":1773651887697,"../internals/set-symmetric-difference":1773651887405}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887718, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.set.union.v2');

}, function(modId) { var map = {"../modules/es.set.union.v2":1773651887407}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887719, function(require, module, exports) {

var $ = require('../internals/export');
var call = require('../internals/function-call');
var toSetLike = require('../internals/to-set-like');
var $union = require('../internals/set-union');

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
// TODO: Obsolete version, remove from `core-js@4`
$({ target: 'Set', proto: true, real: true, forced: true }, {
  union: function union(other) {
    return call($union, this, toSetLike(other));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/function-call":1773651886972,"../internals/to-set-like":1773651887697,"../internals/set-union":1773651887408}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887720, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var $ = require('../internals/export');
var charAt = require('../internals/string-multibyte').charAt;
var requireObjectCoercible = require('../internals/require-object-coercible');
var toIntegerOrInfinity = require('../internals/to-integer-or-infinity');
var toString = require('../internals/to-string');

// `String.prototype.at` method
// https://github.com/mathiasbynens/String.prototype.at
$({ target: 'String', proto: true, forced: true }, {
  at: function at(index) {
    var S = toString(requireObjectCoercible(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : charAt(S, k);
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/string-multibyte":1773651887411,"../internals/require-object-coercible":1773651886977,"../internals/to-integer-or-infinity":1773651887019,"../internals/to-string":1773651887010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887721, function(require, module, exports) {

var $ = require('../internals/export');
var cooked = require('../internals/string-cooked');

// `String.cooked` method
// https://github.com/tc39/proposal-string-cooked
$({ target: 'String', stat: true, forced: true }, {
  cooked: cooked
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/string-cooked":1773651887722}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887722, function(require, module, exports) {

var uncurryThis = require('../internals/function-uncurry-this');
var toIndexedObject = require('../internals/to-indexed-object');
var toString = require('../internals/to-string');
var lengthOfArrayLike = require('../internals/length-of-array-like');

var $TypeError = TypeError;
var push = uncurryThis([].push);
var join = uncurryThis([].join);

// `String.cooked` method
// https://tc39.es/proposal-string-cooked/
module.exports = function cooked(template /* , ...substitutions */) {
  var cookedTemplate = toIndexedObject(template);
  var literalSegments = lengthOfArrayLike(cookedTemplate);
  if (!literalSegments) return '';
  var argumentsLength = arguments.length;
  var elements = [];
  var i = 0;
  while (true) {
    var nextVal = cookedTemplate[i++];
    if (nextVal === undefined) throw new $TypeError('Incorrect template');
    push(elements, toString(nextVal));
    if (i === literalSegments) return join(elements, '');
    if (i < argumentsLength) push(elements, toString(arguments[i]));
  }
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968,"../internals/to-indexed-object":1773651886975,"../internals/to-string":1773651887010,"../internals/length-of-array-like":1773651887021}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887723, function(require, module, exports) {

var $ = require('../internals/export');
var createIteratorConstructor = require('../internals/iterator-create-constructor');
var createIterResultObject = require('../internals/create-iter-result-object');
var requireObjectCoercible = require('../internals/require-object-coercible');
var toString = require('../internals/to-string');
var InternalStateModule = require('../internals/internal-state');
var StringMultibyteModule = require('../internals/string-multibyte');

var codeAt = StringMultibyteModule.codeAt;
var charAt = StringMultibyteModule.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// TODO: unify with String#@@iterator
var $StringIterator = createIteratorConstructor(function StringIterator(string) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: string,
    index: 0
  });
}, 'String', function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt(string, index);
  state.index += point.length;
  return createIterResultObject({ codePoint: codeAt(point, 0), position: index }, false);
});

// `String.prototype.codePoints` method
// https://github.com/tc39/proposal-string-prototype-codepoints
$({ target: 'String', proto: true, forced: true }, {
  codePoints: function codePoints() {
    return new $StringIterator(toString(requireObjectCoercible(this)));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/iterator-create-constructor":1773651887134,"../internals/create-iter-result-object":1773651887136,"../internals/require-object-coercible":1773651886977,"../internals/to-string":1773651887010,"../internals/internal-state":1773651887038,"../internals/string-multibyte":1773651887411}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887724, function(require, module, exports) {

var FREEZING = require('../internals/freezing');
var $ = require('../internals/export');
var makeBuiltIn = require('../internals/make-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var apply = require('../internals/function-apply');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var isCallable = require('../internals/is-callable');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var defineProperty = require('../internals/object-define-property').f;
var createArrayFromList = require('../internals/array-slice');
var WeakMapHelpers = require('../internals/weak-map-helpers');
var cooked = require('../internals/string-cooked');
var parse = require('../internals/string-parse');
var whitespaces = require('../internals/whitespaces');

var DedentMap = new WeakMapHelpers.WeakMap();
var weakMapGet = WeakMapHelpers.get;
var weakMapHas = WeakMapHelpers.has;
var weakMapSet = WeakMapHelpers.set;

var $Array = Array;
var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-freeze -- safe
var freeze = Object.freeze || Object;
// eslint-disable-next-line es/no-object-isfrozen -- safe
var isFrozen = Object.isFrozen;
var min = Math.min;
var charAt = uncurryThis(''.charAt);
var stringSlice = uncurryThis(''.slice);
var split = uncurryThis(''.split);
var exec = uncurryThis(/./.exec);

var NEW_LINE = /([\n\u2028\u2029]|\r\n?)/g;
var LEADING_WHITESPACE = RegExp('^[' + whitespaces + ']*');
var NON_WHITESPACE = RegExp('[^' + whitespaces + ']');
var INVALID_TAG = 'Invalid tag';
var INVALID_OPENING_LINE = 'Invalid opening line';
var INVALID_CLOSING_LINE = 'Invalid closing line';

var dedentTemplateStringsArray = function (template) {
  var rawInput = template.raw;
  // https://github.com/tc39/proposal-string-dedent/issues/75
  if (FREEZING && !isFrozen(rawInput)) throw new $TypeError('Raw template should be frozen');
  if (weakMapHas(DedentMap, rawInput)) return weakMapGet(DedentMap, rawInput);
  var raw = dedentStringsArray(rawInput);
  var cookedArr = cookStrings(raw);
  defineProperty(cookedArr, 'raw', {
    value: freeze(raw)
  });
  freeze(cookedArr);
  weakMapSet(DedentMap, rawInput, cookedArr);
  return cookedArr;
};

var dedentStringsArray = function (template) {
  var t = toObject(template);
  var length = lengthOfArrayLike(t);
  var blocks = $Array(length);
  var dedented = $Array(length);
  var i = 0;
  var lines, common, quasi, k;

  if (!length) throw new $TypeError(INVALID_TAG);

  for (; i < length; i++) {
    var element = t[i];
    if (typeof element == 'string') blocks[i] = split(element, NEW_LINE);
    else throw new $TypeError(INVALID_TAG);
  }

  for (i = 0; i < length; i++) {
    var lastSplit = i + 1 === length;
    lines = blocks[i];
    if (i === 0) {
      if (lines.length === 1 || lines[0].length > 0) {
        throw new $TypeError(INVALID_OPENING_LINE);
      }
      lines[1] = '';
    }
    if (lastSplit) {
      if (lines.length === 1 || exec(NON_WHITESPACE, lines[lines.length - 1])) {
        throw new $TypeError(INVALID_CLOSING_LINE);
      }
      lines[lines.length - 2] = '';
      lines[lines.length - 1] = '';
    }
    // eslint-disable-next-line sonarjs/no-redundant-assignments -- false positive, https://github.com/SonarSource/SonarJS/issues/4767
    for (var j = 2; j < lines.length; j += 2) {
      var text = lines[j];
      var lineContainsTemplateExpression = j + 1 === lines.length && !lastSplit;
      var leading = exec(LEADING_WHITESPACE, text)[0];
      if (!lineContainsTemplateExpression && leading.length === text.length) {
        lines[j] = '';
        continue;
      }
      common = commonLeadingIndentation(leading, common);
    }
  }

  var count = common ? common.length : 0;

  for (i = 0; i < length; i++) {
    lines = blocks[i];
    quasi = lines[0];
    k = 1;
    for (; k < lines.length; k += 2) {
      quasi += lines[k] + stringSlice(lines[k + 1], count);
    }
    dedented[i] = quasi;
  }

  return dedented;
};

var commonLeadingIndentation = function (a, b) {
  if (b === undefined || a === b) return a;
  var i = 0;
  for (var len = min(a.length, b.length); i < len; i++) {
    if (charAt(a, i) !== charAt(b, i)) break;
  }
  return stringSlice(a, 0, i);
};

var cookStrings = function (raw) {
  var i = 0;
  var length = raw.length;
  var result = $Array(length);
  for (; i < length; i++) {
    result[i] = parse(raw[i]);
  } return result;
};

var makeDedentTag = function (tag) {
  return makeBuiltIn(function (template /* , ...substitutions */) {
    var args = createArrayFromList(arguments);
    args[0] = dedentTemplateStringsArray(anObject(template));
    return apply(tag, this, args);
  }, '');
};

var cookedDedentTag = makeDedentTag(cooked);

// `String.dedent` method
// https://github.com/tc39/proposal-string-dedent
$({ target: 'String', stat: true, forced: true }, {
  dedent: function dedent(templateOrFn /* , ...substitutions */) {
    anObject(templateOrFn);
    if (isCallable(templateOrFn)) return makeDedentTag(templateOrFn);
    return apply(cookedDedentTag, this, arguments);
  }
});

}, function(modId) { var map = {"../internals/freezing":1773651887225,"../internals/export":1773651886961,"../internals/make-built-in":1773651887196,"../internals/function-uncurry-this":1773651886968,"../internals/function-apply":1773651886963,"../internals/an-object":1773651887009,"../internals/to-object":1773651887000,"../internals/is-callable":1773651886969,"../internals/length-of-array-like":1773651887021,"../internals/object-define-property":1773651887007,"../internals/array-slice":1773651887029,"../internals/weak-map-helpers":1773651887516,"../internals/string-cooked":1773651887722,"../internals/string-parse":1773651887725,"../internals/whitespaces":1773651887271}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887725, function(require, module, exports) {

// adapted from https://github.com/jridgewell/string-dedent
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');

var fromCharCode = String.fromCharCode;
var fromCodePoint = getBuiltIn('String', 'fromCodePoint');
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var ZERO_CODE = 48;
var NINE_CODE = 57;
var LOWER_A_CODE = 97;
var LOWER_F_CODE = 102;
var UPPER_A_CODE = 65;
var UPPER_F_CODE = 70;

var isDigit = function (str, index) {
  var c = charCodeAt(str, index);
  return c >= ZERO_CODE && c <= NINE_CODE;
};

var parseHex = function (str, index, end) {
  if (end >= str.length) return -1;
  var n = 0;
  for (; index < end; index++) {
    var c = hexToInt(charCodeAt(str, index));
    if (c === -1) return -1;
    n = n * 16 + c;
  }
  return n;
};

var hexToInt = function (c) {
  if (c >= ZERO_CODE && c <= NINE_CODE) return c - ZERO_CODE;
  if (c >= LOWER_A_CODE && c <= LOWER_F_CODE) return c - LOWER_A_CODE + 10;
  if (c >= UPPER_A_CODE && c <= UPPER_F_CODE) return c - UPPER_A_CODE + 10;
  return -1;
};

module.exports = function (raw) {
  var out = '';
  var start = 0;
  // We need to find every backslash escape sequence, and cook the escape into a real char.
  var i = 0;
  var n;
  while ((i = stringIndexOf(raw, '\\', i)) > -1) {
    out += stringSlice(raw, start, i);
    // If the backslash is the last char of the string, then it was an invalid sequence.
    // This can't actually happen in a tagged template literal, but could happen if you manually
    // invoked the tag with an array.
    if (++i === raw.length) return;
    var next = charAt(raw, i++);
    switch (next) {
      // Escaped control codes need to be individually processed.
      case 'b':
        out += '\b';
        break;
      case 't':
        out += '\t';
        break;
      case 'n':
        out += '\n';
        break;
      case 'v':
        out += '\v';
        break;
      case 'f':
        out += '\f';
        break;
      case 'r':
        out += '\r';
        break;
      // Escaped line terminators just skip the char.
      case '\r':
        // Treat `\r\n` as a single terminator.
        if (i < raw.length && charAt(raw, i) === '\n') ++i;
      // break omitted
      case '\n':
      case '\u2028':
      case '\u2029':
        break;
      // `\0` is a null control char, but `\0` followed by another digit is an illegal octal escape.
      case '0':
        if (isDigit(raw, i)) return;
        out += '\0';
        break;
      // Hex escapes must contain 2 hex chars.
      case 'x':
        n = parseHex(raw, i, i + 2);
        if (n === -1) return;
        i += 2;
        out += fromCharCode(n);
        break;
      // Unicode escapes contain either 4 chars, or an unlimited number between `{` and `}`.
      // The hex value must not overflow 0x10FFFF.
      case 'u':
        if (i < raw.length && charAt(raw, i) === '{') {
          var end = stringIndexOf(raw, '}', ++i);
          if (end === -1) return;
          n = parseHex(raw, i, end);
          i = end + 1;
        } else {
          n = parseHex(raw, i, i + 4);
          i += 4;
        }
        if (n === -1 || n > 0x10FFFF) return;
        out += fromCodePoint(n);
        break;
      default:
        if (isDigit(next, 0)) return;
        out += next;
    }
    start = i;
  }
  return out + stringSlice(raw, start);
};

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887726, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.string.is-well-formed');

}, function(modId) { var map = {"../modules/es.string.is-well-formed":1773651887418}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887727, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.string.match-all');

}, function(modId) { var map = {"../modules/es.string.match-all":1773651887421}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887728, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.string.replace-all');

}, function(modId) { var map = {"../modules/es.string.replace-all":1773651887434}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887729, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.string.to-well-formed');

}, function(modId) { var map = {"../modules/es.string.to-well-formed":1773651887440}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887730, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.symbol.async-dispose');

}, function(modId) { var map = {"../modules/es.symbol.async-dispose":1773651887056}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887731, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.customMatcher` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('customMatcher');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887732, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.symbol.dispose');

}, function(modId) { var map = {"../modules/es.symbol.dispose":1773651887058}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887733, function(require, module, exports) {

var $ = require('../internals/export');
var isRegisteredSymbol = require('../internals/symbol-is-registered');

// `Symbol.isRegisteredSymbol` method
// https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
$({ target: 'Symbol', stat: true }, {
  isRegisteredSymbol: isRegisteredSymbol
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/symbol-is-registered":1773651887734}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887734, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');

var Symbol = getBuiltIn('Symbol');
var keyFor = Symbol.keyFor;
var thisSymbolValue = uncurryThis(Symbol.prototype.valueOf);

// `Symbol.isRegisteredSymbol` method
// https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
module.exports = Symbol.isRegisteredSymbol || function isRegisteredSymbol(value) {
  try {
    return keyFor(thisSymbolValue(value)) !== undefined;
  } catch (error) {
    return false;
  }
};

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887735, function(require, module, exports) {

var $ = require('../internals/export');
var isRegisteredSymbol = require('../internals/symbol-is-registered');

// `Symbol.isRegistered` method
// obsolete version of https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
$({ target: 'Symbol', stat: true, name: 'isRegisteredSymbol' }, {
  isRegistered: isRegisteredSymbol
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/symbol-is-registered":1773651887734}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887736, function(require, module, exports) {

var $ = require('../internals/export');
var isWellKnownSymbol = require('../internals/symbol-is-well-known');

// `Symbol.isWellKnownSymbol` method
// https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
$({ target: 'Symbol', stat: true, forced: true }, {
  isWellKnownSymbol: isWellKnownSymbol
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/symbol-is-well-known":1773651887737}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887737, function(require, module, exports) {

var shared = require('../internals/shared');
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var isSymbol = require('../internals/is-symbol');
var wellKnownSymbol = require('../internals/well-known-symbol');

var Symbol = getBuiltIn('Symbol');
var $isWellKnownSymbol = Symbol.isWellKnownSymbol;
var getOwnPropertyNames = getBuiltIn('Object', 'getOwnPropertyNames');
var thisSymbolValue = uncurryThis(Symbol.prototype.valueOf);
var WellKnownSymbolsStore = shared('wks');

for (var i = 0, symbolKeys = getOwnPropertyNames(Symbol), symbolKeysLength = symbolKeys.length; i < symbolKeysLength; i++) {
  // some old engines throws on access to some keys like `arguments` or `caller`
  try {
    var symbolKey = symbolKeys[i];
    if (isSymbol(Symbol[symbolKey])) wellKnownSymbol(symbolKey);
  } catch (error) { /* empty */ }
}

// `Symbol.isWellKnownSymbol` method
// https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
module.exports = function isWellKnownSymbol(value) {
  if ($isWellKnownSymbol && $isWellKnownSymbol(value)) return true;
  try {
    var symbol = thisSymbolValue(value);
    for (var j = 0, keys = getOwnPropertyNames(WellKnownSymbolsStore), keysLength = keys.length; j < keysLength; j++) {
      // eslint-disable-next-line eqeqeq -- polyfilled symbols case
      if (WellKnownSymbolsStore[keys[j]] == symbol) return true;
    }
  } catch (error) { /* empty */ }
  return false;
};

}, function(modId) { var map = {"../internals/shared":1773651886995,"../internals/get-built-in":1773651886983,"../internals/function-uncurry-this":1773651886968,"../internals/is-symbol":1773651886982,"../internals/well-known-symbol":1773651886994}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887738, function(require, module, exports) {

var $ = require('../internals/export');
var isWellKnownSymbol = require('../internals/symbol-is-well-known');

// `Symbol.isWellKnown` method
// obsolete version of https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
$({ target: 'Symbol', stat: true, name: 'isWellKnownSymbol', forced: true }, {
  isWellKnown: isWellKnownSymbol
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/symbol-is-well-known":1773651887737}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887739, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.matcher` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('matcher');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887740, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.metadata` well-known symbol
// https://github.com/tc39/proposal-decorators
defineWellKnownSymbol('metadata');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887741, function(require, module, exports) {

// TODO: Remove from `core-js@4`
var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.metadataKey` well-known symbol
// https://github.com/tc39/proposal-decorator-metadata
defineWellKnownSymbol('metadataKey');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887742, function(require, module, exports) {

var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.observable` well-known symbol
// https://github.com/tc39/proposal-observable
defineWellKnownSymbol('observable');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887743, function(require, module, exports) {

// TODO: remove from `core-js@4`
var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

// `Symbol.patternMatch` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('patternMatch');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887744, function(require, module, exports) {

// TODO: remove from `core-js@4`
var defineWellKnownSymbol = require('../internals/well-known-symbol-define');

defineWellKnownSymbol('replaceAll');

}, function(modId) { var map = {"../internals/well-known-symbol-define":1773651887034}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887745, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887746, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887747, function(require, module, exports) {

// TODO: Remove from `core-js@4`

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887748, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887749, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887750, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887751, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887752, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.typed-array.to-reversed');

}, function(modId) { var map = {"../modules/es.typed-array.to-reversed":1773651887500}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887753, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.typed-array.to-sorted');

}, function(modId) { var map = {"../modules/es.typed-array.to-sorted":1773651887501}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887754, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887755, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887756, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.typed-array.with');

}, function(modId) { var map = {"../modules/es.typed-array.with":1773651887503}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887757, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887758, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887759, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887760, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887761, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887762, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887763, function(require, module, exports) {

var $ = require('../internals/export');
var aWeakMap = require('../internals/a-weak-map');
var remove = require('../internals/weak-map-helpers').remove;

// `WeakMap.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakMap', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aWeakMap(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-weak-map":1773651887515,"../internals/weak-map-helpers":1773651887516}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887764, function(require, module, exports) {

var $ = require('../internals/export');
var WeakMapHelpers = require('../internals/weak-map-helpers');
var createCollectionFrom = require('../internals/collection-from');

// `WeakMap.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
$({ target: 'WeakMap', stat: true, forced: true }, {
  from: createCollectionFrom(WeakMapHelpers.WeakMap, WeakMapHelpers.set, true)
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/weak-map-helpers":1773651887516,"../internals/collection-from":1773651887628}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887765, function(require, module, exports) {

var $ = require('../internals/export');
var WeakMapHelpers = require('../internals/weak-map-helpers');
var createCollectionOf = require('../internals/collection-of');

// `WeakMap.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
$({ target: 'WeakMap', stat: true, forced: true }, {
  of: createCollectionOf(WeakMapHelpers.WeakMap, WeakMapHelpers.set, true)
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/weak-map-helpers":1773651887516,"../internals/collection-of":1773651887640}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887766, function(require, module, exports) {

var $ = require('../internals/export');
var aWeakMap = require('../internals/a-weak-map');
var WeakMapHelpers = require('../internals/weak-map-helpers');

var get = WeakMapHelpers.get;
var has = WeakMapHelpers.has;
var set = WeakMapHelpers.set;

// `WeakMap.prototype.emplace` method
// https://github.com/tc39/proposal-upsert
$({ target: 'WeakMap', proto: true, real: true, forced: true }, {
  emplace: function emplace(key, handler) {
    var map = aWeakMap(this);
    var value, inserted;
    if (has(map, key)) {
      value = get(map, key);
      if ('update' in handler) {
        value = handler.update(value, key, map);
        set(map, key, value);
      } return value;
    }
    inserted = handler.insert(key, map);
    set(map, key, inserted);
    return inserted;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-weak-map":1773651887515,"../internals/weak-map-helpers":1773651887516}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887767, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.weak-map.get-or-insert');

}, function(modId) { var map = {"../modules/es.weak-map.get-or-insert":1773651887514}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887768, function(require, module, exports) {

// TODO: Remove from `core-js@4`
require('../modules/es.weak-map.get-or-insert-computed');

}, function(modId) { var map = {"../modules/es.weak-map.get-or-insert-computed":1773651887517}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887769, function(require, module, exports) {

// TODO: remove from `core-js@4`
var $ = require('../internals/export');
var upsert = require('../internals/map-upsert');

// `WeakMap.prototype.upsert` method (replaced by `WeakMap.prototype.emplace`)
// https://github.com/tc39/proposal-upsert
$({ target: 'WeakMap', proto: true, real: true, forced: true }, {
  upsert: upsert
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/map-upsert":1773651887645}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887770, function(require, module, exports) {

var $ = require('../internals/export');
var aWeakSet = require('../internals/a-weak-set');
var add = require('../internals/weak-set-helpers').add;

// `WeakSet.prototype.addAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakSet', proto: true, real: true, forced: true }, {
  addAll: function addAll(/* ...elements */) {
    var set = aWeakSet(this);
    for (var k = 0, len = arguments.length; k < len; k++) {
      add(set, arguments[k]);
    } return set;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-weak-set":1773651887771,"../internals/weak-set-helpers":1773651887772}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887771, function(require, module, exports) {

var tryToString = require('../internals/try-to-string');

var $TypeError = TypeError;

// Perform ? RequireInternalSlot(M, [[WeakSetData]])
module.exports = function (it) {
  if (typeof it == 'object' && 'has' in it && 'add' in it && 'delete' in it) return it;
  throw new $TypeError(tryToString(it) + ' is not a weakset');
};

}, function(modId) { var map = {"../internals/try-to-string":1773651886992}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887772, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var caller = require('../internals/caller');

module.exports = {
  WeakSet: getBuiltIn('WeakSet'),
  add: caller('add', 1),
  has: caller('has', 1),
  remove: caller('delete', 1)
};

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/caller":1773651887236}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887773, function(require, module, exports) {

var $ = require('../internals/export');
var aWeakSet = require('../internals/a-weak-set');
var remove = require('../internals/weak-set-helpers').remove;

// `WeakSet.prototype.deleteAll` method
// https://github.com/tc39/proposal-collection-methods
$({ target: 'WeakSet', proto: true, real: true, forced: true }, {
  deleteAll: function deleteAll(/* ...elements */) {
    var collection = aWeakSet(this);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remove(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    } return !!allDeleted;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/a-weak-set":1773651887771,"../internals/weak-set-helpers":1773651887772}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887774, function(require, module, exports) {

var $ = require('../internals/export');
var WeakSetHelpers = require('../internals/weak-set-helpers');
var createCollectionFrom = require('../internals/collection-from');

// `WeakSet.from` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
$({ target: 'WeakSet', stat: true, forced: true }, {
  from: createCollectionFrom(WeakSetHelpers.WeakSet, WeakSetHelpers.add, false)
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/weak-set-helpers":1773651887772,"../internals/collection-from":1773651887628}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887775, function(require, module, exports) {

var $ = require('../internals/export');
var WeakSetHelpers = require('../internals/weak-set-helpers');
var createCollectionOf = require('../internals/collection-of');

// `WeakSet.of` method
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
$({ target: 'WeakSet', stat: true, forced: true }, {
  of: createCollectionOf(WeakSetHelpers.WeakSet, WeakSetHelpers.add, false)
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/weak-set-helpers":1773651887772,"../internals/collection-of":1773651887640}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887776, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var call = require('../internals/function-call');
var fails = require('../internals/fails');
var toString = require('../internals/to-string');
var validateArgumentsLength = require('../internals/validate-arguments-length');
var c2i = require('../internals/base64-map').c2i;

var disallowed = /[^\d+/a-z]/i;
var whitespaces = /[\t\n\f\r ]+/g;
var finalEq = /[=]{1,2}$/;

var $atob = getBuiltIn('atob');
var fromCharCode = String.fromCharCode;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var exec = uncurryThis(disallowed.exec);

var BASIC = !!$atob && !fails(function () {
  return $atob('aGk=') !== 'hi';
});

var NO_SPACES_IGNORE = BASIC && fails(function () {
  return $atob(' ') !== '';
});

var NO_ENCODING_CHECK = BASIC && !fails(function () {
  $atob('a');
});

var NO_ARG_RECEIVING_CHECK = BASIC && !fails(function () {
  $atob();
});

var WRONG_ARITY = BASIC && $atob.length !== 1;

var FORCED = !BASIC || NO_SPACES_IGNORE || NO_ENCODING_CHECK || NO_ARG_RECEIVING_CHECK || WRONG_ARITY;

// `atob` method
// https://html.spec.whatwg.org/multipage/webappapis.html#dom-atob
$({ global: true, bind: true, enumerable: true, forced: FORCED }, {
  atob: function atob(data) {
    validateArgumentsLength(arguments.length, 1);
    // `webpack` dev server bug on IE global methods - use call(fn, global, ...)
    if (BASIC && !NO_SPACES_IGNORE && !NO_ENCODING_CHECK) return call($atob, globalThis, data);
    var string = replace(toString(data), whitespaces, '');
    var output = '';
    var position = 0;
    var bc = 0;
    var length, chr, bs;
    if (string.length % 4 === 0) {
      string = replace(string, finalEq, '');
    }
    length = string.length;
    if (length % 4 === 1 || exec(disallowed, string)) {
      throw new (getBuiltIn('DOMException'))('The string is not correctly encoded', 'InvalidCharacterError');
    }
    while (position < length) {
      chr = charAt(string, position++);
      bs = bc % 4 ? bs * 64 + c2i[chr] : c2i[chr];
      if (bc++ % 4) output += fromCharCode(255 & bs >> (-2 * bc & 6));
    } return output;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/get-built-in":1773651886983,"../internals/function-uncurry-this":1773651886968,"../internals/function-call":1773651886972,"../internals/fails":1773651886965,"../internals/to-string":1773651887010,"../internals/validate-arguments-length":1773651887327,"../internals/base64-map":1773651887777}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887777, function(require, module, exports) {

var commonAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var base64Alphabet = commonAlphabet + '+/';
var base64UrlAlphabet = commonAlphabet + '-_';

var inverse = function (characters) {
  // TODO: use `Object.create(null)` in `core-js@4`
  var result = {};
  var index = 0;
  for (; index < 64; index++) result[characters.charAt(index)] = index;
  return result;
};

module.exports = {
  i2c: base64Alphabet,
  c2i: inverse(base64Alphabet),
  i2cUrl: base64UrlAlphabet,
  c2iUrl: inverse(base64UrlAlphabet)
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887778, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var call = require('../internals/function-call');
var fails = require('../internals/fails');
var toString = require('../internals/to-string');
var validateArgumentsLength = require('../internals/validate-arguments-length');
var i2c = require('../internals/base64-map').i2c;

var $btoa = getBuiltIn('btoa');
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);

var BASIC = !!$btoa && !fails(function () {
  return $btoa('hi') !== 'aGk=';
});

var NO_ARG_RECEIVING_CHECK = BASIC && !fails(function () {
  $btoa();
});

var WRONG_ARG_CONVERSION = BASIC && fails(function () {
  return $btoa(null) !== 'bnVsbA==';
});

var WRONG_ARITY = BASIC && $btoa.length !== 1;

// `btoa` method
// https://html.spec.whatwg.org/multipage/webappapis.html#dom-btoa
$({ global: true, bind: true, enumerable: true, forced: !BASIC || NO_ARG_RECEIVING_CHECK || WRONG_ARG_CONVERSION || WRONG_ARITY }, {
  btoa: function btoa(data) {
    validateArgumentsLength(arguments.length, 1);
    // `webpack` dev server bug on IE global methods - use call(fn, global, ...)
    if (BASIC) return call($btoa, globalThis, toString(data));
    var string = toString(data);
    var output = '';
    var position = 0;
    var map = i2c;
    var block, charCode;
    while (charAt(string, position) || (map = '=', position % 1)) {
      charCode = charCodeAt(string, position += 3 / 4);
      if (charCode > 0xFF) {
        throw new (getBuiltIn('DOMException'))('The string contains characters outside of the Latin1 range', 'InvalidCharacterError');
      }
      block = block << 8 | charCode;
      output += charAt(map, 63 & block >> 8 - position % 1 * 8);
    } return output;
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/get-built-in":1773651886983,"../internals/function-uncurry-this":1773651886968,"../internals/function-call":1773651886972,"../internals/fails":1773651886965,"../internals/to-string":1773651887010,"../internals/validate-arguments-length":1773651887327,"../internals/base64-map":1773651887777}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887779, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887780, function(require, module, exports) {

require('../modules/es.array.iterator');
var DOMIterables = require('../internals/dom-iterables');
var globalThis = require('../internals/global-this');
var setToStringTag = require('../internals/set-to-string-tag');
var Iterators = require('../internals/iterators');

for (var COLLECTION_NAME in DOMIterables) {
  setToStringTag(globalThis[COLLECTION_NAME], COLLECTION_NAME);
  Iterators[COLLECTION_NAME] = Iterators.Array;
}

}, function(modId) { var map = {"../modules/es.array.iterator":1773651887131,"../internals/dom-iterables":1773651887781,"../internals/global-this":1773651886962,"../internals/set-to-string-tag":1773651887036,"../internals/iterators":1773651887094}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887781, function(require, module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887782, function(require, module, exports) {

var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var getBuiltInNodeModule = require('../internals/get-built-in-node-module');
var fails = require('../internals/fails');
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var defineProperty = require('../internals/object-define-property').f;
var defineBuiltIn = require('../internals/define-built-in');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var hasOwn = require('../internals/has-own-property');
var anInstance = require('../internals/an-instance');
var anObject = require('../internals/an-object');
var errorToString = require('../internals/error-to-string');
var normalizeStringArgument = require('../internals/normalize-string-argument');
var DOMExceptionConstants = require('../internals/dom-exception-constants');
var clearErrorStack = require('../internals/error-stack-clear');
var InternalStateModule = require('../internals/internal-state');
var DESCRIPTORS = require('../internals/descriptors');
var IS_PURE = require('../internals/is-pure');

var DOM_EXCEPTION = 'DOMException';
var DATA_CLONE_ERR = 'DATA_CLONE_ERR';
var Error = getBuiltIn('Error');
// NodeJS < 17.0 does not expose `DOMException` to global
var NativeDOMException = getBuiltIn(DOM_EXCEPTION) || (function () {
  try {
    // NodeJS < 15.0 does not expose `MessageChannel` to global
    var MessageChannel = getBuiltIn('MessageChannel') || getBuiltInNodeModule('worker_threads').MessageChannel;
    // eslint-disable-next-line es/no-weak-map, unicorn/require-post-message-target-origin -- safe
    new MessageChannel().port1.postMessage(new WeakMap());
  } catch (error) {
    if (error.name === DATA_CLONE_ERR && error.code === 25) return error.constructor;
  }
})();
var NativeDOMExceptionPrototype = NativeDOMException && NativeDOMException.prototype;
var ErrorPrototype = Error.prototype;
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(DOM_EXCEPTION);
var HAS_STACK = 'stack' in new Error(DOM_EXCEPTION);

var codeFor = function (name) {
  return hasOwn(DOMExceptionConstants, name) && DOMExceptionConstants[name].m ? DOMExceptionConstants[name].c : 0;
};

var $DOMException = function DOMException() {
  anInstance(this, DOMExceptionPrototype);
  var argumentsLength = arguments.length;
  var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0]);
  var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error');
  var code = codeFor(name);
  setInternalState(this, {
    type: DOM_EXCEPTION,
    name: name,
    message: message,
    code: code
  });
  if (!DESCRIPTORS) {
    this.name = name;
    this.message = message;
    this.code = code;
  }
  if (HAS_STACK) {
    var error = new Error(message);
    error.name = DOM_EXCEPTION;
    defineProperty(this, 'stack', createPropertyDescriptor(1, clearErrorStack(error.stack, 1)));
  }
};

var DOMExceptionPrototype = $DOMException.prototype = create(ErrorPrototype);

var createGetterDescriptor = function (get) {
  return { enumerable: true, configurable: true, get: get };
};

var getterFor = function (key) {
  return createGetterDescriptor(function () {
    return getInternalState(this)[key];
  });
};

if (DESCRIPTORS) {
  // `DOMException.prototype.code` getter
  defineBuiltInAccessor(DOMExceptionPrototype, 'code', getterFor('code'));
  // `DOMException.prototype.message` getter
  defineBuiltInAccessor(DOMExceptionPrototype, 'message', getterFor('message'));
  // `DOMException.prototype.name` getter
  defineBuiltInAccessor(DOMExceptionPrototype, 'name', getterFor('name'));
}

defineProperty(DOMExceptionPrototype, 'constructor', createPropertyDescriptor(1, $DOMException));

// FF36- DOMException is a function, but can't be constructed
var INCORRECT_CONSTRUCTOR = fails(function () {
  return !(new NativeDOMException() instanceof Error);
});

// Safari 10.1 / Chrome 32- / IE8- DOMException.prototype.toString bugs
var INCORRECT_TO_STRING = INCORRECT_CONSTRUCTOR || fails(function () {
  return ErrorPrototype.toString !== errorToString || String(new NativeDOMException(1, 2)) !== '2: 1';
});

// Deno 1.6.3- DOMException.prototype.code just missed
var INCORRECT_CODE = INCORRECT_CONSTRUCTOR || fails(function () {
  return new NativeDOMException(1, 'DataCloneError').code !== 25;
});

// Deno 1.6.3- DOMException constants just missed
var MISSED_CONSTANTS = INCORRECT_CONSTRUCTOR
  || NativeDOMException[DATA_CLONE_ERR] !== 25
  || NativeDOMExceptionPrototype[DATA_CLONE_ERR] !== 25;

var FORCED_CONSTRUCTOR = IS_PURE ? INCORRECT_TO_STRING || INCORRECT_CODE || MISSED_CONSTANTS : INCORRECT_CONSTRUCTOR;

// `DOMException` constructor
// https://webidl.spec.whatwg.org/#idl-DOMException
$({ global: true, constructor: true, forced: FORCED_CONSTRUCTOR }, {
  DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
});

var PolyfilledDOMException = getBuiltIn(DOM_EXCEPTION);
var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype;

if (INCORRECT_TO_STRING && (IS_PURE || NativeDOMException === PolyfilledDOMException)) {
  defineBuiltIn(PolyfilledDOMExceptionPrototype, 'toString', errorToString);
}

if (INCORRECT_CODE && DESCRIPTORS && NativeDOMException === PolyfilledDOMException) {
  defineBuiltInAccessor(PolyfilledDOMExceptionPrototype, 'code', createGetterDescriptor(function () {
    return codeFor(anObject(this).name);
  }));
}

// `DOMException` constants
for (var key in DOMExceptionConstants) if (hasOwn(DOMExceptionConstants, key)) {
  var constant = DOMExceptionConstants[key];
  var constantName = constant.s;
  var descriptor = createPropertyDescriptor(6, constant.c);
  if (!hasOwn(PolyfilledDOMException, constantName)) {
    defineProperty(PolyfilledDOMException, constantName, descriptor);
  }
  if (!hasOwn(PolyfilledDOMExceptionPrototype, constantName)) {
    defineProperty(PolyfilledDOMExceptionPrototype, constantName, descriptor);
  }
}

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/get-built-in":1773651886983,"../internals/get-built-in-node-module":1773651887783,"../internals/fails":1773651886965,"../internals/object-create":1773651887013,"../internals/create-property-descriptor":1773651886974,"../internals/object-define-property":1773651887007,"../internals/define-built-in":1773651887031,"../internals/define-built-in-accessor":1773651887032,"../internals/has-own-property":1773651886999,"../internals/an-instance":1773651887189,"../internals/an-object":1773651887009,"../internals/error-to-string":1773651887784,"../internals/normalize-string-argument":1773651887081,"../internals/dom-exception-constants":1773651887785,"../internals/error-stack-clear":1773651887084,"../internals/internal-state":1773651887038,"../internals/descriptors":1773651886971,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887783, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var IS_NODE = require('../internals/environment-is-node');

module.exports = function (name) {
  if (IS_NODE) {
    try {
      return globalThis.process.getBuiltinModule(name);
    } catch (error) { /* empty */ }
    try {
      // eslint-disable-next-line no-new-func -- safe
      return Function('return require("' + name + '")')();
    } catch (error) { /* empty */ }
  }
};

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/environment-is-node":1773651887145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887784, function(require, module, exports) {

var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var anObject = require('../internals/an-object');
var normalizeStringArgument = require('../internals/normalize-string-argument');

var nativeErrorToString = Error.prototype.toString;

var INCORRECT_TO_STRING = fails(function () {
  if (DESCRIPTORS) {
    // Chrome 32- incorrectly call accessor
    // eslint-disable-next-line es/no-object-create, es/no-object-defineproperty -- safe
    var object = Object.create(Object.defineProperty({}, 'name', { get: function () {
      return this === object;
    } }));
    if (nativeErrorToString.call(object) !== 'true') return true;
  }
  // FF10- does not properly handle non-strings
  return nativeErrorToString.call({ message: 1, name: 2 }) !== '2: 1'
    // IE8 does not properly handle defaults
    || nativeErrorToString.call({}) !== 'Error';
});

module.exports = INCORRECT_TO_STRING ? function toString() {
  var O = anObject(this);
  var name = normalizeStringArgument(O.name, 'Error');
  var message = normalizeStringArgument(O.message);
  return !name ? message : !message ? name : name + ': ' + message;
} : nativeErrorToString;

}, function(modId) { var map = {"../internals/descriptors":1773651886971,"../internals/fails":1773651886965,"../internals/an-object":1773651887009,"../internals/normalize-string-argument":1773651887081}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887785, function(require, module, exports) {

module.exports = {
  IndexSizeError: { s: 'INDEX_SIZE_ERR', c: 1, m: 1 },
  DOMStringSizeError: { s: 'DOMSTRING_SIZE_ERR', c: 2, m: 0 },
  HierarchyRequestError: { s: 'HIERARCHY_REQUEST_ERR', c: 3, m: 1 },
  WrongDocumentError: { s: 'WRONG_DOCUMENT_ERR', c: 4, m: 1 },
  InvalidCharacterError: { s: 'INVALID_CHARACTER_ERR', c: 5, m: 1 },
  NoDataAllowedError: { s: 'NO_DATA_ALLOWED_ERR', c: 6, m: 0 },
  NoModificationAllowedError: { s: 'NO_MODIFICATION_ALLOWED_ERR', c: 7, m: 1 },
  NotFoundError: { s: 'NOT_FOUND_ERR', c: 8, m: 1 },
  NotSupportedError: { s: 'NOT_SUPPORTED_ERR', c: 9, m: 1 },
  InUseAttributeError: { s: 'INUSE_ATTRIBUTE_ERR', c: 10, m: 1 },
  InvalidStateError: { s: 'INVALID_STATE_ERR', c: 11, m: 1 },
  SyntaxError: { s: 'SYNTAX_ERR', c: 12, m: 1 },
  InvalidModificationError: { s: 'INVALID_MODIFICATION_ERR', c: 13, m: 1 },
  NamespaceError: { s: 'NAMESPACE_ERR', c: 14, m: 1 },
  InvalidAccessError: { s: 'INVALID_ACCESS_ERR', c: 15, m: 1 },
  ValidationError: { s: 'VALIDATION_ERR', c: 16, m: 0 },
  TypeMismatchError: { s: 'TYPE_MISMATCH_ERR', c: 17, m: 1 },
  SecurityError: { s: 'SECURITY_ERR', c: 18, m: 1 },
  NetworkError: { s: 'NETWORK_ERR', c: 19, m: 1 },
  AbortError: { s: 'ABORT_ERR', c: 20, m: 1 },
  URLMismatchError: { s: 'URL_MISMATCH_ERR', c: 21, m: 1 },
  QuotaExceededError: { s: 'QUOTA_EXCEEDED_ERR', c: 22, m: 1 },
  TimeoutError: { s: 'TIMEOUT_ERR', c: 23, m: 1 },
  InvalidNodeTypeError: { s: 'INVALID_NODE_TYPE_ERR', c: 24, m: 1 },
  DataCloneError: { s: 'DATA_CLONE_ERR', c: 25, m: 1 }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887786, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var getBuiltIn = require('../internals/get-built-in');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var defineProperty = require('../internals/object-define-property').f;
var hasOwn = require('../internals/has-own-property');
var anInstance = require('../internals/an-instance');
var inheritIfRequired = require('../internals/inherit-if-required');
var normalizeStringArgument = require('../internals/normalize-string-argument');
var DOMExceptionConstants = require('../internals/dom-exception-constants');
var clearErrorStack = require('../internals/error-stack-clear');
var DESCRIPTORS = require('../internals/descriptors');
var IS_PURE = require('../internals/is-pure');

var DOM_EXCEPTION = 'DOMException';
var Error = getBuiltIn('Error');
var NativeDOMException = getBuiltIn(DOM_EXCEPTION);

var $DOMException = function DOMException() {
  anInstance(this, DOMExceptionPrototype);
  var argumentsLength = arguments.length;
  var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0]);
  var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error');
  var that = new NativeDOMException(message, name);
  var error = new Error(message);
  error.name = DOM_EXCEPTION;
  defineProperty(that, 'stack', createPropertyDescriptor(1, clearErrorStack(error.stack, 1)));
  inheritIfRequired(that, this, $DOMException);
  return that;
};

var DOMExceptionPrototype = $DOMException.prototype = NativeDOMException.prototype;

var ERROR_HAS_STACK = 'stack' in new Error(DOM_EXCEPTION);
var DOM_EXCEPTION_HAS_STACK = 'stack' in new NativeDOMException(1, 2);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var descriptor = NativeDOMException && DESCRIPTORS && Object.getOwnPropertyDescriptor(globalThis, DOM_EXCEPTION);

// Bun ~ 0.1.1 DOMException have incorrect descriptor and we can't redefine it
// https://github.com/Jarred-Sumner/bun/issues/399
var BUGGY_DESCRIPTOR = !!descriptor && !(descriptor.writable && descriptor.configurable);

var FORCED_CONSTRUCTOR = ERROR_HAS_STACK && !BUGGY_DESCRIPTOR && !DOM_EXCEPTION_HAS_STACK;

// `DOMException` constructor patch for `.stack` where it's required
// https://webidl.spec.whatwg.org/#es-DOMException-specialness
$({ global: true, constructor: true, forced: IS_PURE || FORCED_CONSTRUCTOR }, { // TODO: fix export logic
  DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
});

var PolyfilledDOMException = getBuiltIn(DOM_EXCEPTION);
var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype;

if (PolyfilledDOMExceptionPrototype.constructor !== PolyfilledDOMException) {
  if (!IS_PURE) {
    defineProperty(PolyfilledDOMExceptionPrototype, 'constructor', createPropertyDescriptor(1, PolyfilledDOMException));
  }

  for (var key in DOMExceptionConstants) if (hasOwn(DOMExceptionConstants, key)) {
    var constant = DOMExceptionConstants[key];
    var constantName = constant.s;
    if (!hasOwn(PolyfilledDOMException, constantName)) {
      defineProperty(PolyfilledDOMException, constantName, createPropertyDescriptor(6, constant.c));
    }
  }
}

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/get-built-in":1773651886983,"../internals/create-property-descriptor":1773651886974,"../internals/object-define-property":1773651887007,"../internals/has-own-property":1773651886999,"../internals/an-instance":1773651887189,"../internals/inherit-if-required":1773651887080,"../internals/normalize-string-argument":1773651887081,"../internals/dom-exception-constants":1773651887785,"../internals/error-stack-clear":1773651887084,"../internals/descriptors":1773651886971,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887787, function(require, module, exports) {

var getBuiltIn = require('../internals/get-built-in');
var setToStringTag = require('../internals/set-to-string-tag');

var DOM_EXCEPTION = 'DOMException';

// `DOMException.prototype[@@toStringTag]` property
setToStringTag(getBuiltIn(DOM_EXCEPTION), DOM_EXCEPTION);

}, function(modId) { var map = {"../internals/get-built-in":1773651886983,"../internals/set-to-string-tag":1773651887036}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887788, function(require, module, exports) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require('../modules/web.clear-immediate');
require('../modules/web.set-immediate');

}, function(modId) { var map = {"../modules/web.clear-immediate":1773651887789,"../modules/web.set-immediate":1773651887790}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887789, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var clearImmediate = require('../internals/task').clear;

// `clearImmediate` method
// http://w3c.github.io/setImmediate/#si-clearImmediate
$({ global: true, bind: true, enumerable: true, forced: globalThis.clearImmediate !== clearImmediate }, {
  clearImmediate: clearImmediate
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/task":1773651887326}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887790, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var setTask = require('../internals/task').set;
var schedulersFix = require('../internals/schedulers-fix');

// https://github.com/oven-sh/bun/issues/1633
var setImmediate = globalThis.setImmediate ? schedulersFix(setTask, false) : setTask;

// `setImmediate` method
// http://w3c.github.io/setImmediate/#si-setImmediate
$({ global: true, bind: true, enumerable: true, forced: globalThis.setImmediate !== setImmediate }, {
  setImmediate: setImmediate
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/task":1773651887326,"../internals/schedulers-fix":1773651887791}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887791, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var apply = require('../internals/function-apply');
var isCallable = require('../internals/is-callable');
var ENVIRONMENT = require('../internals/environment');
var USER_AGENT = require('../internals/environment-user-agent');
var arraySlice = require('../internals/array-slice');
var validateArgumentsLength = require('../internals/validate-arguments-length');

var Function = globalThis.Function;
// dirty IE9- and Bun 0.3.0- checks
var WRAP = /MSIE .\./.test(USER_AGENT) || ENVIRONMENT === 'BUN' && (function () {
  var version = globalThis.Bun.version.split('.');
  return version.length < 3 || version[0] === '0' && (version[1] < 3 || version[1] === '3' && version[2] === '0');
})();

// IE9- / Bun 0.3.0- setTimeout / setInterval / setImmediate additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
// https://github.com/oven-sh/bun/issues/1633
module.exports = function (scheduler, hasTimeArg) {
  var firstParamIndex = hasTimeArg ? 2 : 1;
  return WRAP ? function (handler, timeout /* , ...arguments */) {
    var boundArgs = validateArgumentsLength(arguments.length, 1) > firstParamIndex;
    var fn = isCallable(handler) ? handler : Function(handler);
    var params = boundArgs ? arraySlice(arguments, firstParamIndex) : [];
    var callback = boundArgs ? function () {
      apply(fn, this, params);
    } : fn;
    return hasTimeArg ? scheduler(callback, timeout) : scheduler(callback);
  } : scheduler;
};

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/function-apply":1773651886963,"../internals/is-callable":1773651886969,"../internals/environment":1773651887146,"../internals/environment-user-agent":1773651886989,"../internals/array-slice":1773651887029,"../internals/validate-arguments-length":1773651887327}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887792, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var microtask = require('../internals/microtask');
var aCallable = require('../internals/a-callable');
var validateArgumentsLength = require('../internals/validate-arguments-length');
var fails = require('../internals/fails');
var DESCRIPTORS = require('../internals/descriptors');

// Bun ~ 1.0.30 bug
// https://github.com/oven-sh/bun/issues/9249
var WRONG_ARITY = fails(function () {
  // getOwnPropertyDescriptor for prevent experimental warning in Node 11
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  return DESCRIPTORS && Object.getOwnPropertyDescriptor(globalThis, 'queueMicrotask').value.length !== 1;
});

// `queueMicrotask` method
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask
$({ global: true, enumerable: true, dontCallGetSet: true, forced: WRONG_ARITY }, {
  queueMicrotask: function queueMicrotask(fn) {
    validateArgumentsLength(arguments.length, 1);
    microtask(aCallable(fn));
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/microtask":1773651887329,"../internals/a-callable":1773651886991,"../internals/validate-arguments-length":1773651887327,"../internals/fails":1773651886965,"../internals/descriptors":1773651886971}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887793, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');

// `self` getter
// https://html.spec.whatwg.org/multipage/window-object.html#dom-self
$({ global: true, forced: globalThis.self !== globalThis }, {
  self: globalThis
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887794, function(require, module, exports) {

var IS_PURE = require('../internals/is-pure');
var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var getBuiltIn = require('../internals/get-built-in');
var uncurryThis = require('../internals/function-uncurry-this');
var fails = require('../internals/fails');
var uid = require('../internals/uid');
var isCallable = require('../internals/is-callable');
var isConstructor = require('../internals/is-constructor');
var isNullOrUndefined = require('../internals/is-null-or-undefined');
var isObject = require('../internals/is-object');
var isSymbol = require('../internals/is-symbol');
var iterate = require('../internals/iterate');
var anObject = require('../internals/an-object');
var classof = require('../internals/classof');
var hasOwn = require('../internals/has-own-property');
var createProperty = require('../internals/create-property');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var validateArgumentsLength = require('../internals/validate-arguments-length');
var getRegExpFlags = require('../internals/regexp-get-flags');
var MapHelpers = require('../internals/map-helpers');
var SetHelpers = require('../internals/set-helpers');
var setIterate = require('../internals/set-iterate');
var detachTransferable = require('../internals/detach-transferable');
var ERROR_STACK_INSTALLABLE = require('../internals/error-stack-installable');
var PROPER_STRUCTURED_CLONE_TRANSFER = require('../internals/structured-clone-proper-transfer');

var Object = globalThis.Object;
var Array = globalThis.Array;
var Date = globalThis.Date;
var Error = globalThis.Error;
var TypeError = globalThis.TypeError;
var PerformanceMark = globalThis.PerformanceMark;
var DOMException = getBuiltIn('DOMException');
var Map = MapHelpers.Map;
var mapHas = MapHelpers.has;
var mapGet = MapHelpers.get;
var mapSet = MapHelpers.set;
var Set = SetHelpers.Set;
var setAdd = SetHelpers.add;
var setHas = SetHelpers.has;
var objectKeys = getBuiltIn('Object', 'keys');
var push = uncurryThis([].push);
var thisBooleanValue = uncurryThis(true.valueOf);
var thisNumberValue = uncurryThis(1.1.valueOf);
var thisStringValue = uncurryThis(''.valueOf);
var thisTimeValue = uncurryThis(Date.prototype.getTime);
var PERFORMANCE_MARK = uid('structuredClone');
var DATA_CLONE_ERROR = 'DataCloneError';
var TRANSFERRING = 'Transferring';

var checkBasicSemantic = function (structuredCloneImplementation) {
  return !fails(function () {
    var set1 = new globalThis.Set([7]);
    var set2 = structuredCloneImplementation(set1);
    var number = structuredCloneImplementation(Object(7));
    return set2 === set1 || !set2.has(7) || !isObject(number) || +number !== 7;
  }) && structuredCloneImplementation;
};

var checkErrorsCloning = function (structuredCloneImplementation, $Error) {
  return !fails(function () {
    var error = new $Error();
    var test = structuredCloneImplementation({ a: error, b: error });
    return !(test && test.a === test.b && test.a instanceof $Error && test.a.stack === error.stack);
  });
};

// https://github.com/whatwg/html/pull/5749
var checkNewErrorsCloningSemantic = function (structuredCloneImplementation) {
  return !fails(function () {
    var test = structuredCloneImplementation(new globalThis.AggregateError([1], PERFORMANCE_MARK, { cause: 3 }));
    return test.name !== 'AggregateError' || test.errors[0] !== 1 || test.message !== PERFORMANCE_MARK || test.cause !== 3;
  });
};

// FF94+, Safari 15.4+, Chrome 98+, NodeJS 17.0+, Deno 1.13+
// FF<103 and Safari implementations can't clone errors
// https://bugzilla.mozilla.org/show_bug.cgi?id=1556604
// FF103 can clone errors, but `.stack` of clone is an empty string
// https://bugzilla.mozilla.org/show_bug.cgi?id=1778762
// FF104+ fixed it on usual errors, but not on DOMExceptions
// https://bugzilla.mozilla.org/show_bug.cgi?id=1777321
// Chrome <102 returns `null` if cloned object contains multiple references to one error
// https://bugs.chromium.org/p/v8/issues/detail?id=12542
// NodeJS implementation can't clone DOMExceptions
// https://github.com/nodejs/node/issues/41038
// only FF103+ supports new (html/5749) error cloning semantic
var nativeStructuredClone = globalThis.structuredClone;

var FORCED_REPLACEMENT = IS_PURE
  || !checkErrorsCloning(nativeStructuredClone, Error)
  || !checkErrorsCloning(nativeStructuredClone, DOMException)
  || !checkNewErrorsCloningSemantic(nativeStructuredClone);

// Chrome 82+, Safari 14.1+, Deno 1.11+
// Chrome 78-81 implementation swaps `.name` and `.message` of cloned `DOMException`
// Chrome returns `null` if cloned object contains multiple references to one error
// Safari 14.1 implementation doesn't clone some `RegExp` flags, so requires a workaround
// Safari implementation can't clone errors
// Deno 1.2-1.10 implementations too naive
// NodeJS 16.0+ does not have `PerformanceMark` constructor
// NodeJS <17.2 structured cloning implementation from `performance.mark` is too naive
// and can't clone, for example, `RegExp` or some boxed primitives
// https://github.com/nodejs/node/issues/40840
// no one of those implementations supports new (html/5749) error cloning semantic
var structuredCloneFromMark = !nativeStructuredClone && checkBasicSemantic(function (value) {
  return new PerformanceMark(PERFORMANCE_MARK, { detail: value }).detail;
});

var nativeRestrictedStructuredClone = checkBasicSemantic(nativeStructuredClone) || structuredCloneFromMark;

var throwUncloneable = function (type) {
  throw new DOMException('Uncloneable type: ' + type, DATA_CLONE_ERROR);
};

var throwUnpolyfillable = function (type, action) {
  throw new DOMException((action || 'Cloning') + ' of ' + type + ' cannot be properly polyfilled in this engine', DATA_CLONE_ERROR);
};

var tryNativeRestrictedStructuredClone = function (value, type) {
  if (!nativeRestrictedStructuredClone) throwUnpolyfillable(type);
  return nativeRestrictedStructuredClone(value);
};

var createDataTransfer = function () {
  var dataTransfer;
  try {
    dataTransfer = new globalThis.DataTransfer();
  } catch (error) {
    try {
      dataTransfer = new globalThis.ClipboardEvent('').clipboardData;
    } catch (error2) { /* empty */ }
  }
  return dataTransfer && dataTransfer.items && dataTransfer.files ? dataTransfer : null;
};

var cloneBuffer = function (value, map, $type) {
  if (mapHas(map, value)) return mapGet(map, value);

  var type = $type || classof(value);
  var clone, length, options, source, target, i;

  if (type === 'SharedArrayBuffer') {
    if (nativeRestrictedStructuredClone) clone = nativeRestrictedStructuredClone(value);
    // SharedArrayBuffer should use shared memory, we can't polyfill it, so return the original
    else clone = value;
  } else {
    var DataView = globalThis.DataView;

    // `ArrayBuffer#slice` is not available in IE10
    // `ArrayBuffer#slice` and `DataView` are not available in old FF
    if (!DataView && !isCallable(value.slice)) throwUnpolyfillable('ArrayBuffer');
    // detached buffers throws in `DataView` and `.slice`
    try {
      if (isCallable(value.slice) && !value.resizable) {
        clone = value.slice(0);
      } else {
        length = value.byteLength;
        options = 'maxByteLength' in value ? { maxByteLength: value.maxByteLength } : undefined;
        // eslint-disable-next-line es/no-resizable-and-growable-arraybuffers -- safe
        clone = new ArrayBuffer(length, options);
        source = new DataView(value);
        target = new DataView(clone);
        for (i = 0; i < length; i++) {
          target.setUint8(i, source.getUint8(i));
        }
      }
    } catch (error) {
      throw new DOMException('ArrayBuffer is detached', DATA_CLONE_ERROR);
    }
  }

  mapSet(map, value, clone);

  return clone;
};

var cloneView = function (value, type, offset, length, map) {
  var C = globalThis[type];
  // in some old engines like Safari 9, typeof C is 'object'
  // on Uint8ClampedArray or some other constructors
  if (!isObject(C)) throwUnpolyfillable(type);
  return new C(cloneBuffer(value.buffer, map), offset, length);
};

var structuredCloneInternal = function (value, map) {
  if (isSymbol(value)) throwUncloneable('Symbol');
  if (!isObject(value)) return value;
  // effectively preserves circular references
  if (map) {
    if (mapHas(map, value)) return mapGet(map, value);
  } else map = new Map();

  var type = classof(value);
  var C, name, cloned, dataTransfer, i, length, keys, key;

  switch (type) {
    case 'Array':
      cloned = Array(lengthOfArrayLike(value));
      break;
    case 'Object':
      cloned = {};
      break;
    case 'Map':
      cloned = new Map();
      break;
    case 'Set':
      cloned = new Set();
      break;
    case 'RegExp':
      // in this block because of a Safari 14.1 bug
      // old FF does not clone regexes passed to the constructor, so get the source and flags directly
      cloned = new RegExp(value.source, getRegExpFlags(value));
      break;
    case 'Error':
      name = value.name;
      switch (name) {
        case 'AggregateError':
          cloned = new (getBuiltIn(name))([]);
          break;
        case 'EvalError':
        case 'RangeError':
        case 'ReferenceError':
        case 'SuppressedError':
        case 'SyntaxError':
        case 'TypeError':
        case 'URIError':
          cloned = new (getBuiltIn(name))();
          break;
        case 'CompileError':
        case 'LinkError':
        case 'RuntimeError':
          cloned = new (getBuiltIn('WebAssembly', name))();
          break;
        default:
          cloned = new Error();
      }
      break;
    case 'DOMException':
      cloned = new DOMException(value.message, value.name);
      break;
    case 'ArrayBuffer':
    case 'SharedArrayBuffer':
      cloned = cloneBuffer(value, map, type);
      break;
    case 'DataView':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float16Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'BigInt64Array':
    case 'BigUint64Array':
      length = type === 'DataView' ? value.byteLength : value.length;
      cloned = cloneView(value, type, value.byteOffset, length, map);
      break;
    case 'DOMQuad':
      try {
        cloned = new DOMQuad(
          structuredCloneInternal(value.p1, map),
          structuredCloneInternal(value.p2, map),
          structuredCloneInternal(value.p3, map),
          structuredCloneInternal(value.p4, map)
        );
      } catch (error) {
        cloned = tryNativeRestrictedStructuredClone(value, type);
      }
      break;
    case 'File':
      if (nativeRestrictedStructuredClone) try {
        cloned = nativeRestrictedStructuredClone(value);
        // NodeJS 20.0.0 bug, https://github.com/nodejs/node/issues/47612
        if (classof(cloned) !== type) cloned = undefined;
      } catch (error) { /* empty */ }
      if (!cloned) try {
        cloned = new File([value], value.name, value);
      } catch (error) { /* empty */ }
      if (!cloned) throwUnpolyfillable(type);
      break;
    case 'FileList':
      dataTransfer = createDataTransfer();
      if (dataTransfer) {
        for (i = 0, length = lengthOfArrayLike(value); i < length; i++) {
          dataTransfer.items.add(structuredCloneInternal(value[i], map));
        }
        cloned = dataTransfer.files;
      } else cloned = tryNativeRestrictedStructuredClone(value, type);
      break;
    case 'ImageData':
      // Safari 9 ImageData is a constructor, but typeof ImageData is 'object'
      try {
        cloned = new ImageData(
          structuredCloneInternal(value.data, map),
          value.width,
          value.height,
          { colorSpace: value.colorSpace }
        );
      } catch (error) {
        cloned = tryNativeRestrictedStructuredClone(value, type);
      } break;
    default:
      if (nativeRestrictedStructuredClone) {
        cloned = nativeRestrictedStructuredClone(value);
      } else switch (type) {
        case 'BigInt':
          // can be a 3rd party polyfill
          cloned = Object(value.valueOf());
          break;
        case 'Boolean':
          cloned = Object(thisBooleanValue(value));
          break;
        case 'Number':
          cloned = Object(thisNumberValue(value));
          break;
        case 'String':
          cloned = Object(thisStringValue(value));
          break;
        case 'Date':
          cloned = new Date(thisTimeValue(value));
          break;
        case 'Blob':
          try {
            cloned = value.slice(0, value.size, value.type);
          } catch (error) {
            throwUnpolyfillable(type);
          } break;
        case 'DOMPoint':
        case 'DOMPointReadOnly':
          C = globalThis[type];
          try {
            cloned = C.fromPoint
              ? C.fromPoint(value)
              : new C(value.x, value.y, value.z, value.w);
          } catch (error) {
            throwUnpolyfillable(type);
          } break;
        case 'DOMRect':
        case 'DOMRectReadOnly':
          C = globalThis[type];
          try {
            cloned = C.fromRect
              ? C.fromRect(value)
              : new C(value.x, value.y, value.width, value.height);
          } catch (error) {
            throwUnpolyfillable(type);
          } break;
        case 'DOMMatrix':
        case 'DOMMatrixReadOnly':
          C = globalThis[type];
          try {
            cloned = C.fromMatrix
              ? C.fromMatrix(value)
              : new C(value);
          } catch (error) {
            throwUnpolyfillable(type);
          } break;
        case 'AudioData':
        case 'VideoFrame':
          if (!isCallable(value.clone)) throwUnpolyfillable(type);
          try {
            cloned = value.clone();
          } catch (error) {
            throwUncloneable(type);
          } break;
        case 'CropTarget':
        case 'CryptoKey':
        case 'FileSystemDirectoryHandle':
        case 'FileSystemFileHandle':
        case 'FileSystemHandle':
        case 'GPUCompilationInfo':
        case 'GPUCompilationMessage':
        case 'ImageBitmap':
        case 'RTCCertificate':
        case 'WebAssembly.Module':
          throwUnpolyfillable(type);
          // break omitted
        default:
          throwUncloneable(type);
      }
  }

  mapSet(map, value, cloned);

  switch (type) {
    case 'Array':
    case 'Object':
      keys = objectKeys(value);
      for (i = 0, length = lengthOfArrayLike(keys); i < length; i++) {
        key = keys[i];
        createProperty(cloned, key, structuredCloneInternal(value[key], map));
      } break;
    case 'Map':
      value.forEach(function (v, k) {
        mapSet(cloned, structuredCloneInternal(k, map), structuredCloneInternal(v, map));
      });
      break;
    case 'Set':
      value.forEach(function (v) {
        setAdd(cloned, structuredCloneInternal(v, map));
      });
      break;
    case 'Error':
      createNonEnumerableProperty(cloned, 'message', structuredCloneInternal(value.message, map));
      if (hasOwn(value, 'cause')) {
        createNonEnumerableProperty(cloned, 'cause', structuredCloneInternal(value.cause, map));
      }
      if (name === 'AggregateError') {
        cloned.errors = structuredCloneInternal(value.errors, map);
      } else if (name === 'SuppressedError') {
        cloned.error = structuredCloneInternal(value.error, map);
        cloned.suppressed = structuredCloneInternal(value.suppressed, map);
      } // break omitted
    case 'DOMException':
      if (ERROR_STACK_INSTALLABLE) {
        createNonEnumerableProperty(cloned, 'stack', structuredCloneInternal(value.stack, map));
      }
  }

  return cloned;
};

var tryToTransfer = function (rawTransfer, map) {
  if (!isObject(rawTransfer)) throw new TypeError('Transfer option cannot be converted to a sequence');

  var transfer = [];

  iterate(rawTransfer, function (value) {
    push(transfer, anObject(value));
  });

  var i = 0;
  var length = lengthOfArrayLike(transfer);
  var buffers = new Set();
  var value, type, C, transferred, canvas, context;

  while (i < length) {
    value = transfer[i++];

    type = classof(value);

    if (type === 'ArrayBuffer' ? setHas(buffers, value) : mapHas(map, value)) {
      throw new DOMException('Duplicate transferable', DATA_CLONE_ERROR);
    }

    if (type === 'ArrayBuffer') {
      setAdd(buffers, value);
      continue;
    }

    if (PROPER_STRUCTURED_CLONE_TRANSFER) {
      transferred = nativeStructuredClone(value, { transfer: [value] });
    } else switch (type) {
      case 'ImageBitmap':
        C = globalThis.OffscreenCanvas;
        if (!isConstructor(C)) throwUnpolyfillable(type, TRANSFERRING);
        try {
          canvas = new C(value.width, value.height);
          context = canvas.getContext('bitmaprenderer');
          context.transferFromImageBitmap(value);
          transferred = canvas.transferToImageBitmap();
        } catch (error) { /* empty */ }
        break;
      case 'AudioData':
      case 'VideoFrame':
        if (!isCallable(value.clone) || !isCallable(value.close)) throwUnpolyfillable(type, TRANSFERRING);
        try {
          transferred = value.clone();
          value.close();
        } catch (error) { /* empty */ }
        break;
      case 'MediaSourceHandle':
      case 'MessagePort':
      case 'MIDIAccess':
      case 'OffscreenCanvas':
      case 'ReadableStream':
      case 'RTCDataChannel':
      case 'TransformStream':
      case 'WebTransportReceiveStream':
      case 'WebTransportSendStream':
      case 'WritableStream':
        throwUnpolyfillable(type, TRANSFERRING);
    }

    if (transferred === undefined) throw new DOMException('This object cannot be transferred: ' + type, DATA_CLONE_ERROR);

    mapSet(map, value, transferred);
  }

  return buffers;
};

var detachBuffers = function (buffers) {
  setIterate(buffers, function (buffer) {
    if (PROPER_STRUCTURED_CLONE_TRANSFER) {
      nativeRestrictedStructuredClone(buffer, { transfer: [buffer] });
    } else if (isCallable(buffer.transfer)) {
      buffer.transfer();
    } else if (detachTransferable) {
      detachTransferable(buffer);
    } else {
      throwUnpolyfillable('ArrayBuffer', TRANSFERRING);
    }
  });
};

// `structuredClone` method
// https://html.spec.whatwg.org/multipage/structured-data.html#dom-structuredclone
$({ global: true, enumerable: true, sham: !PROPER_STRUCTURED_CLONE_TRANSFER, forced: FORCED_REPLACEMENT }, {
  structuredClone: function structuredClone(value /* , { transfer } */) {
    var options = validateArgumentsLength(arguments.length, 1) > 1 && !isNullOrUndefined(arguments[1]) ? anObject(arguments[1]) : undefined;
    var transfer = options ? options.transfer : undefined;
    var map, buffers;

    if (transfer !== undefined) {
      map = new Map();
      buffers = tryToTransfer(transfer, map);
    }

    var clone = structuredCloneInternal(value, map);

    // since of an issue with cloning views of transferred buffers, we a forced to detach them later
    // https://github.com/zloirock/core-js/issues/1265
    if (buffers) detachBuffers(buffers);

    return clone;
  }
});

}, function(modId) { var map = {"../internals/is-pure":1773651886997,"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/get-built-in":1773651886983,"../internals/function-uncurry-this":1773651886968,"../internals/fails":1773651886965,"../internals/uid":1773651887001,"../internals/is-callable":1773651886969,"../internals/is-constructor":1773651887044,"../internals/is-null-or-undefined":1773651886978,"../internals/is-object":1773651886981,"../internals/is-symbol":1773651886982,"../internals/iterate":1773651887092,"../internals/an-object":1773651887009,"../internals/classof":1773651887011,"../internals/has-own-property":1773651886999,"../internals/create-property":1773651887046,"../internals/create-non-enumerable-property":1773651887006,"../internals/length-of-array-like":1773651887021,"../internals/validate-arguments-length":1773651887327,"../internals/regexp-get-flags":1773651887422,"../internals/map-helpers":1773651887235,"../internals/set-helpers":1773651887389,"../internals/set-iterate":1773651887391,"../internals/detach-transferable":1773651887795,"../internals/error-stack-installable":1773651887085,"../internals/structured-clone-proper-transfer":1773651887796}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887795, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var getBuiltInNodeModule = require('../internals/get-built-in-node-module');
var PROPER_STRUCTURED_CLONE_TRANSFER = require('../internals/structured-clone-proper-transfer');

var structuredClone = globalThis.structuredClone;
var $ArrayBuffer = globalThis.ArrayBuffer;
var $MessageChannel = globalThis.MessageChannel;
var detach = false;
var WorkerThreads, channel, buffer, $detach;

if (PROPER_STRUCTURED_CLONE_TRANSFER) {
  detach = function (transferable) {
    structuredClone(transferable, { transfer: [transferable] });
  };
} else if ($ArrayBuffer) try {
  if (!$MessageChannel) {
    WorkerThreads = getBuiltInNodeModule('worker_threads');
    if (WorkerThreads) $MessageChannel = WorkerThreads.MessageChannel;
  }

  if ($MessageChannel) {
    channel = new $MessageChannel();
    buffer = new $ArrayBuffer(2);

    $detach = function (transferable) {
      channel.port1.postMessage(null, [transferable]);
    };

    if (buffer.byteLength === 2) {
      $detach(buffer);
      if (buffer.byteLength === 0) detach = $detach;
    }
  }
} catch (error) { /* empty */ }

module.exports = detach;

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/get-built-in-node-module":1773651887783,"../internals/structured-clone-proper-transfer":1773651887796}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887796, function(require, module, exports) {

var globalThis = require('../internals/global-this');
var fails = require('../internals/fails');
var V8 = require('../internals/environment-v8-version');
var ENVIRONMENT = require('../internals/environment');

var structuredClone = globalThis.structuredClone;

module.exports = !!structuredClone && !fails(function () {
  // prevent V8 ArrayBufferDetaching protector cell invalidation and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if ((ENVIRONMENT === 'DENO' && V8 > 92) || (ENVIRONMENT === 'NODE' && V8 > 94) || (ENVIRONMENT === 'BROWSER' && V8 > 97)) return false;
  var buffer = new ArrayBuffer(8);
  var clone = structuredClone(buffer, { transfer: [buffer] });
  return buffer.byteLength !== 0 || clone.byteLength !== 8;
});

}, function(modId) { var map = {"../internals/global-this":1773651886962,"../internals/fails":1773651886965,"../internals/environment-v8-version":1773651886988,"../internals/environment":1773651887146}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887797, function(require, module, exports) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
require('../modules/web.set-interval');
require('../modules/web.set-timeout');

}, function(modId) { var map = {"../modules/web.set-interval":1773651887798,"../modules/web.set-timeout":1773651887799}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887798, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var schedulersFix = require('../internals/schedulers-fix');

var setInterval = schedulersFix(globalThis.setInterval, true);

// Bun / IE9- setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
$({ global: true, bind: true, forced: globalThis.setInterval !== setInterval }, {
  setInterval: setInterval
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/schedulers-fix":1773651887791}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887799, function(require, module, exports) {

var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var schedulersFix = require('../internals/schedulers-fix');

var setTimeout = schedulersFix(globalThis.setTimeout, true);

// Bun / IE9- setTimeout additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
$({ global: true, bind: true, forced: globalThis.setTimeout !== setTimeout }, {
  setTimeout: setTimeout
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/schedulers-fix":1773651887791}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887800, function(require, module, exports) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
require('../modules/web.url.constructor');

}, function(modId) { var map = {"../modules/web.url.constructor":1773651887801}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887801, function(require, module, exports) {

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
require('../modules/es.string.iterator');
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var USE_NATIVE_URL = require('../internals/url-constructor-detection');
var globalThis = require('../internals/global-this');
var bind = require('../internals/function-bind-context');
var uncurryThis = require('../internals/function-uncurry-this');
var defineBuiltIn = require('../internals/define-built-in');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var anInstance = require('../internals/an-instance');
var hasOwn = require('../internals/has-own-property');
var assign = require('../internals/object-assign');
var arrayFrom = require('../internals/array-from');
var arraySlice = require('../internals/array-slice');
var codeAt = require('../internals/string-multibyte').codeAt;
var toASCII = require('../internals/string-punycode-to-ascii');
var $toString = require('../internals/to-string');
var setToStringTag = require('../internals/set-to-string-tag');
var validateArgumentsLength = require('../internals/validate-arguments-length');
var URLSearchParamsModule = require('../modules/web.url-search-params.constructor');
var InternalStateModule = require('../internals/internal-state');

var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;

var NativeURL = globalThis.URL;
var TypeError = globalThis.TypeError;
var parseInt = globalThis.parseInt;
var floor = Math.floor;
var pow = Math.pow;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(/./.exec);
var join = uncurryThis([].join);
var numberToString = uncurryThis(1.1.toString);
var pop = uncurryThis([].pop);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);
var toLowerCase = uncurryThis(''.toLowerCase);
var unshift = uncurryThis([].unshift);

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[a-z]/i;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
/* eslint-disable regexp/no-control-character -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable regexp/no-control-character -- safe */
// eslint-disable-next-line no-unassigned-vars -- expected `undefined` value
var EOF;

// https://url.spec.whatwg.org/#ipv4-number-parser
var parseIPv4 = function (input) {
  var parts = split(input, '.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] === '') {
    parts.length--;
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part === '') return input;
    radix = 10;
    if (part.length > 1 && charAt(part, 0) === '0') {
      radix = exec(HEX_START, part) ? 16 : 8;
      part = stringSlice(part, radix === 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!exec(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return input;
      number = parseInt(part, radix);
    }
    push(numbers, number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index === partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = pop(numbers);
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// https://url.spec.whatwg.org/#concept-ipv6-parser
// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var chr = function () {
    return charAt(input, pointer);
  };

  if (chr() === ':') {
    if (charAt(input, 1) !== ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (chr()) {
    if (pieceIndex === 8) return;
    if (chr() === ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && exec(HEX, chr())) {
      value = value * 16 + parseInt(chr(), 16);
      pointer++;
      length++;
    }
    if (chr() === '.') {
      if (length === 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (chr()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (chr() === '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!exec(DIGIT, chr())) return;
        while (exec(DIGIT, chr())) {
          number = parseInt(chr(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece === 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
      }
      if (numbersSeen !== 4) return;
      break;
    } else if (chr() === ':') {
      pointer++;
      if (!chr()) return;
    } else if (chr()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex !== 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex !== 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  return currLength > maxLength ? currStart : maxIndex;
};

// https://url.spec.whatwg.org/#host-serializing
var serializeHost = function (host) {
  var result, index, compress, ignore0;

  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      unshift(result, host % 256);
      host = floor(host / 256);
    }
    return join(result, '.');
  }

  // ipv6
  if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += numberToString(host[index], 16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  }

  return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (chr, set) {
  var code = codeAt(chr, 0);
  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
};

// https://url.spec.whatwg.org/#special-scheme
var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

// https://url.spec.whatwg.org/#windows-drive-letter
var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length === 2 && exec(ALPHA, charAt(string, 0))
    && ((second = charAt(string, 1)) === ':' || (!normalized && second === '|'));
};

// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (
    string.length === 2 ||
    ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

// https://url.spec.whatwg.org/#single-dot-path-segment
var isSingleDot = function (segment) {
  return segment === '.' || toLowerCase(segment) === '%2e';
};

// https://url.spec.whatwg.org/#double-dot-path-segment
var isDoubleDot = function (segment) {
  segment = toLowerCase(segment);
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

var URLState = function (url, isBase, base) {
  var urlString = $toString(url);
  var baseState, failure, searchParams;
  if (isBase) {
    failure = this.parse(urlString);
    if (failure) throw new TypeError(failure);
    this.searchParams = null;
  } else {
    if (base !== undefined) baseState = new URLState(base, true);
    failure = this.parse(urlString, null, baseState);
    if (failure) throw new TypeError(failure);
    searchParams = getInternalSearchParamsState(new URLSearchParams());
    searchParams.bindURL(this);
    this.searchParams = searchParams;
  }
};

URLState.prototype = {
  type: 'URL',
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function (input, stateOverride, base) {
    var url = this;
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, chr, bufferCodePoints, failure;

    input = $toString(input);

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = replace(input, LEADING_C0_CONTROL_OR_SPACE, '');
      input = replace(input, TRAILING_C0_CONTROL_OR_SPACE, '$1');
    }

    input = replace(input, TAB_AND_NEW_LINE, '');

    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      chr = codePoints[pointer];
      switch (state) {
        case SCHEME_START:
          if (chr && exec(ALPHA, chr)) {
            buffer += toLowerCase(chr);
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;
          break;

        case SCHEME:
          if (chr && (exec(ALPHANUMERIC, chr) || chr === '+' || chr === '-' || chr === '.')) {
            buffer += toLowerCase(chr);
          } else if (chr === ':') {
            if (stateOverride && (
              (url.isSpecial() !== hasOwn(specialSchemes, buffer)) ||
              (buffer === 'file' && (url.includesCredentials() || url.port !== null)) ||
              (url.scheme === 'file' && !url.host)
            )) return;
            url.scheme = buffer;
            if (stateOverride) {
              if (url.isSpecial() && specialSchemes[url.scheme] === url.port) url.port = null;
              return;
            }
            buffer = '';
            if (url.scheme === 'file') {
              state = FILE;
            } else if (url.isSpecial() && base && base.scheme === url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (url.isSpecial()) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] === '/') {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              push(url.path, '');
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;
          break;

        case NO_SCHEME:
          if (!base || (base.cannotBeABaseURL && chr !== '#')) return INVALID_SCHEME;
          if (base.cannotBeABaseURL && chr === '#') {
            url.scheme = base.scheme;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }
          state = base.scheme === 'file' ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (chr === '/' && codePoints[pointer + 1] === '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          } break;

        case PATH_OR_AUTHORITY:
          if (chr === '/') {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;
          if (chr === EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
          } else if (chr === '/' || (chr === '\\' && url.isSpecial())) {
            state = RELATIVE_SLASH;
          } else if (chr === '?') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = '';
            state = QUERY;
          } else if (chr === '#') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.path.length--;
            state = PATH;
            continue;
          } break;

        case RELATIVE_SLASH:
          if (url.isSpecial() && (chr === '/' || chr === '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (chr === '/') {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          } break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (chr !== '/' || charAt(buffer, pointer + 1) !== '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (chr !== '/' && chr !== '\\') {
            state = AUTHORITY;
            continue;
          } break;

        case AUTHORITY:
          if (chr === '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);
            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];
              if (codePoint === ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }
              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
              if (seenPasswordToken) url.password += encodedCodePoints;
              else url.username += encodedCodePoints;
            }
            buffer = '';
          } else if (
            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial())
          ) {
            if (seenAt && buffer === '') return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = '';
            state = HOST;
          } else buffer += chr;
          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme === 'file') {
            state = FILE_HOST;
            continue;
          } else if (chr === ':' && !seenBracket) {
            if (buffer === '') return INVALID_HOST;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT;
            if (stateOverride === HOSTNAME) return;
          } else if (
            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial())
          ) {
            if (url.isSpecial() && buffer === '') return INVALID_HOST;
            if (stateOverride && buffer === '' && (url.includesCredentials() || url.port !== null)) return;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (chr === '[') seenBracket = true;
            else if (chr === ']') seenBracket = false;
            buffer += chr;
          } break;

        case PORT:
          if (exec(DIGIT, chr)) {
            buffer += chr;
          } else if (
            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial()) ||
            stateOverride
          ) {
            if (buffer !== '') {
              var port = parseInt(buffer, 10);
              if (port > 0xFFFF) return INVALID_PORT;
              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
              buffer = '';
            }
            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;
          break;

        case FILE:
          url.scheme = 'file';
          if (chr === '/' || chr === '\\') state = FILE_SLASH;
          else if (base && base.scheme === 'file') {
            switch (chr) {
              case EOF:
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = base.query;
                break;
              case '?':
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = '';
                state = QUERY;
                break;
              case '#':
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = base.query;
                url.fragment = '';
                state = FRAGMENT;
                break;
              default:
                if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.shortenPath();
                }
                state = PATH;
                continue;
            }
          } else {
            state = PATH;
            continue;
          } break;

        case FILE_SLASH:
          if (chr === '/' || chr === '\\') {
            state = FILE_HOST;
            break;
          }
          if (base && base.scheme === 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
            if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);
            else url.host = base.host;
          }
          state = PATH;
          continue;

        case FILE_HOST:
          if (chr === EOF || chr === '/' || chr === '\\' || chr === '?' || chr === '#') {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer === '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = url.parseHost(buffer);
              if (failure) return failure;
              if (url.host === 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START;
            } continue;
          } else buffer += chr;
          break;

        case PATH_START:
          if (url.isSpecial()) {
            state = PATH;
            if (chr !== '/' && chr !== '\\') continue;
          } else if (!stateOverride && chr === '?') {
            url.query = '';
            state = QUERY;
          } else if (!stateOverride && chr === '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr !== EOF) {
            state = PATH;
            if (chr !== '/') continue;
          } break;

        case PATH:
          if (
            chr === EOF || chr === '/' ||
            (chr === '\\' && url.isSpecial()) ||
            (!stateOverride && (chr === '?' || chr === '#'))
          ) {
            if (isDoubleDot(buffer)) {
              url.shortenPath();
              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else if (isSingleDot(buffer)) {
              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else {
              if (url.scheme === 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                if (url.host) url.host = '';
                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
              }
              push(url.path, buffer);
            }
            buffer = '';
            if (url.scheme === 'file' && (chr === EOF || chr === '?' || chr === '#')) {
              while (url.path.length > 1 && url.path[0] === '') {
                shift(url.path);
              }
            }
            if (chr === '?') {
              url.query = '';
              state = QUERY;
            } else if (chr === '#') {
              url.fragment = '';
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(chr, pathPercentEncodeSet);
          } break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (chr === '?') {
            url.query = '';
            state = QUERY;
          } else if (chr === '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr !== EOF) {
            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case QUERY:
          if (!stateOverride && chr === '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr !== EOF) {
            if (chr === "'" && url.isSpecial()) url.query += '%27';
            else if (chr === '#') url.query += '%23';
            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case FRAGMENT:
          if (chr !== EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
          break;
      }

      pointer++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function (input) {
    var result, codePoints, index;
    if (charAt(input, 0) === '[') {
      if (charAt(input, input.length - 1) !== ']') return INVALID_HOST;
      result = parseIPv6(stringSlice(input, 1, -1));
      if (!result) return INVALID_HOST;
      this.host = result;
    // opaque host
    } else if (!this.isSpecial()) {
      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
      result = '';
      codePoints = arrayFrom(input);
      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }
      this.host = result;
    } else {
      input = toASCII(input);
      if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      this.host = result;
    }
  },
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  cannotHaveUsernamePasswordPort: function () {
    return !this.host || this.cannotBeABaseURL || this.scheme === 'file';
  },
  // https://url.spec.whatwg.org/#include-credentials
  includesCredentials: function () {
    return this.username !== '' || this.password !== '';
  },
  // https://url.spec.whatwg.org/#is-special
  isSpecial: function () {
    return hasOwn(specialSchemes, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function () {
    var path = this.path;
    var pathSize = path.length;
    if (pathSize && (this.scheme !== 'file' || pathSize !== 1 || !isWindowsDriveLetter(path[0], true))) {
      path.length--;
    }
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function () {
    var url = this;
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';
    if (host !== null) {
      output += '//';
      if (url.includesCredentials()) {
        output += username + (password ? ':' + password : '') + '@';
      }
      output += serializeHost(host);
      if (port !== null) output += ':' + port;
    } else if (scheme === 'file') output += '//';
    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function (href) {
    var failure = this.parse(href);
    if (failure) throw new TypeError(failure);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function () {
    var scheme = this.scheme;
    var port = this.port;
    if (scheme === 'blob') try {
      return new URLConstructor(scheme.path[0]).origin;
    } catch (error) {
      return 'null';
    }
    if (scheme === 'file' || !this.isSpecial()) return 'null';
    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function () {
    return this.scheme + ':';
  },
  setProtocol: function (protocol) {
    this.parse($toString(protocol) + ':', SCHEME_START);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function () {
    return this.username;
  },
  setUsername: function (username) {
    var codePoints = arrayFrom($toString(username));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.username = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function () {
    return this.password;
  },
  setPassword: function (password) {
    var codePoints = arrayFrom($toString(password));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.password = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function () {
    var host = this.host;
    var port = this.port;
    return host === null ? ''
      : port === null ? serializeHost(host)
      : serializeHost(host) + ':' + port;
  },
  setHost: function (host) {
    if (this.cannotBeABaseURL) return;
    this.parse(host, HOST);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function () {
    var host = this.host;
    return host === null ? '' : serializeHost(host);
  },
  setHostname: function (hostname) {
    if (this.cannotBeABaseURL) return;
    this.parse(hostname, HOSTNAME);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function () {
    var port = this.port;
    return port === null ? '' : $toString(port);
  },
  setPort: function (port) {
    if (this.cannotHaveUsernamePasswordPort()) return;
    port = $toString(port);
    if (port === '') this.port = null;
    else this.parse(port, PORT);
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function () {
    var path = this.path;
    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  },
  setPathname: function (pathname) {
    if (this.cannotBeABaseURL) return;
    this.path = [];
    this.parse(pathname, PATH_START);
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function () {
    var query = this.query;
    return query ? '?' + query : '';
  },
  setSearch: function (search) {
    search = $toString(search);
    if (search === '') {
      this.query = null;
    } else {
      if (charAt(search, 0) === '?') search = stringSlice(search, 1);
      this.query = '';
      this.parse(search, QUERY);
    }
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function () {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function () {
    var fragment = this.fragment;
    return fragment ? '#' + fragment : '';
  },
  setHash: function (hash) {
    hash = $toString(hash);
    if (hash === '') {
      this.fragment = null;
      return;
    }
    if (charAt(hash, 0) === '#') hash = stringSlice(hash, 1);
    this.fragment = '';
    this.parse(hash, FRAGMENT);
  },
  update: function () {
    this.query = this.searchParams.serialize() || null;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLPrototype);
  var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
  var state = setInternalState(that, new URLState(url, false, base));
  if (!DESCRIPTORS) {
    that.href = state.serialize();
    that.origin = state.getOrigin();
    that.protocol = state.getProtocol();
    that.username = state.getUsername();
    that.password = state.getPassword();
    that.host = state.getHost();
    that.hostname = state.getHostname();
    that.port = state.getPort();
    that.pathname = state.getPathname();
    that.search = state.getSearch();
    that.searchParams = state.getSearchParams();
    that.hash = state.getHash();
  }
};

var URLPrototype = URLConstructor.prototype;

var accessorDescriptor = function (getter, setter) {
  return {
    get: function () {
      return getInternalURLState(this)[getter]();
    },
    set: setter && function (value) {
      return getInternalURLState(this)[setter](value);
    },
    configurable: true,
    enumerable: true
  };
};

if (DESCRIPTORS) {
  // `URL.prototype.href` accessors pair
  // https://url.spec.whatwg.org/#dom-url-href
  defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
  // `URL.prototype.origin` getter
  // https://url.spec.whatwg.org/#dom-url-origin
  defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
  // `URL.prototype.protocol` accessors pair
  // https://url.spec.whatwg.org/#dom-url-protocol
  defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
  // `URL.prototype.username` accessors pair
  // https://url.spec.whatwg.org/#dom-url-username
  defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
  // `URL.prototype.password` accessors pair
  // https://url.spec.whatwg.org/#dom-url-password
  defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
  // `URL.prototype.host` accessors pair
  // https://url.spec.whatwg.org/#dom-url-host
  defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
  // `URL.prototype.hostname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hostname
  defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
  // `URL.prototype.port` accessors pair
  // https://url.spec.whatwg.org/#dom-url-port
  defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
  // `URL.prototype.pathname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-pathname
  defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
  // `URL.prototype.search` accessors pair
  // https://url.spec.whatwg.org/#dom-url-search
  defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
  // `URL.prototype.searchParams` getter
  // https://url.spec.whatwg.org/#dom-url-searchparams
  defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
  // `URL.prototype.hash` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hash
  defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
defineBuiltIn(URLPrototype, 'toJSON', function toJSON() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
defineBuiltIn(URLPrototype, 'toString', function toString() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});

}, function(modId) { var map = {"../modules/es.string.iterator":1773651887419,"../internals/export":1773651886961,"../internals/descriptors":1773651886971,"../internals/url-constructor-detection":1773651887802,"../internals/global-this":1773651886962,"../internals/function-bind-context":1773651887005,"../internals/function-uncurry-this":1773651886968,"../internals/define-built-in":1773651887031,"../internals/define-built-in-accessor":1773651887032,"../internals/an-instance":1773651887189,"../internals/has-own-property":1773651886999,"../internals/object-assign":1773651887289,"../internals/array-from":1773651887125,"../internals/array-slice":1773651887029,"../internals/string-multibyte":1773651887411,"../internals/string-punycode-to-ascii":1773651887803,"../internals/to-string":1773651887010,"../internals/set-to-string-tag":1773651887036,"../internals/validate-arguments-length":1773651887327,"../modules/web.url-search-params.constructor":1773651887804,"../internals/internal-state":1773651887038}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887802, function(require, module, exports) {

var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var DESCRIPTORS = require('../internals/descriptors');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
  var url = new URL('b?a=1&b=2&c=3', 'https://a');
  var params = url.searchParams;
  var params2 = new URLSearchParams('a=1&a=2&b=3');
  var result = '';
  url.pathname = 'c%20d';
  params.forEach(function (value, key) {
    params['delete']('b');
    result += key + value;
  });
  params2['delete']('a', 2);
  // `undefined` case is a Chromium 117 bug
  // https://bugs.chromium.org/p/v8/issues/detail?id=14222
  params2['delete']('b', undefined);
  return (IS_PURE && (!url.toJSON || !params2.has('a', 1) || params2.has('a', 2) || !params2.has('a', undefined) || params2.has('b')))
    || (!params.size && (IS_PURE || !DESCRIPTORS))
    || !params.sort
    || url.href !== 'https://a/c%20d?a=1&c=3'
    || params.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !params[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('https://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('https://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('https://x', undefined).host !== 'x';
});

}, function(modId) { var map = {"../internals/fails":1773651886965,"../internals/well-known-symbol":1773651886994,"../internals/descriptors":1773651886971,"../internals/is-pure":1773651886997}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887803, function(require, module, exports) {

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var uncurryThis = require('../internals/function-uncurry-this');

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;

var $RangeError = RangeError;
var exec = uncurryThis(regexSeparators.exec);
var floor = Math.floor;
var fromCharCode = String.fromCharCode;
var charCodeAt = uncurryThis(''.charCodeAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var split = uncurryThis(''.split);
var toLowerCase = uncurryThis(''.toLowerCase);

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = charCodeAt(string, counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = charCodeAt(string, counter++);
      if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
        push(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        push(output, value);
        counter--;
      }
    } else {
      push(output, value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  while (delta > baseMinusTMin * tMax >> 1) {
    delta = floor(delta / baseMinusTMin);
    k += base;
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      push(output, fromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    push(output, delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw new $RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw new $RangeError(OVERFLOW_ERROR);
      }
      if (currentValue === n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        var k = base;
        while (true) {
          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          push(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
          k += base;
        }

        push(output, fromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
        delta = 0;
        handledCPCount++;
      }
    }

    delta++;
    n++;
  }
  return join(output, '');
};

module.exports = function (input) {
  var encoded = [];
  var labels = split(replace(toLowerCase(input), regexSeparators, '\u002E'), '.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    push(encoded, exec(regexNonASCII, label) ? 'xn--' + encode(label) : label);
  }
  return join(encoded, '.');
};

}, function(modId) { var map = {"../internals/function-uncurry-this":1773651886968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887804, function(require, module, exports) {

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
require('../modules/es.array.iterator');
require('../modules/es.string.from-code-point');
var $ = require('../internals/export');
var globalThis = require('../internals/global-this');
var safeGetBuiltIn = require('../internals/safe-get-built-in');
var getBuiltIn = require('../internals/get-built-in');
var call = require('../internals/function-call');
var uncurryThis = require('../internals/function-uncurry-this');
var DESCRIPTORS = require('../internals/descriptors');
var USE_NATIVE_URL = require('../internals/url-constructor-detection');
var defineBuiltIn = require('../internals/define-built-in');
var defineBuiltInAccessor = require('../internals/define-built-in-accessor');
var defineBuiltIns = require('../internals/define-built-ins');
var setToStringTag = require('../internals/set-to-string-tag');
var createIteratorConstructor = require('../internals/iterator-create-constructor');
var InternalStateModule = require('../internals/internal-state');
var anInstance = require('../internals/an-instance');
var isCallable = require('../internals/is-callable');
var hasOwn = require('../internals/has-own-property');
var bind = require('../internals/function-bind-context');
var classof = require('../internals/classof');
var anObject = require('../internals/an-object');
var isObject = require('../internals/is-object');
var $toString = require('../internals/to-string');
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var getIterator = require('../internals/get-iterator');
var getIteratorMethod = require('../internals/get-iterator-method');
var createIterResultObject = require('../internals/create-iter-result-object');
var validateArgumentsLength = require('../internals/validate-arguments-length');
var wellKnownSymbol = require('../internals/well-known-symbol');
var arraySort = require('../internals/array-sort');

var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var nativeFetch = safeGetBuiltIn('fetch');
var NativeRequest = safeGetBuiltIn('Request');
var Headers = safeGetBuiltIn('Headers');
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var TypeError = globalThis.TypeError;
var encodeURIComponent = globalThis.encodeURIComponent;
var fromCharCode = String.fromCharCode;
var fromCodePoint = getBuiltIn('String', 'fromCodePoint');
var $parseInt = parseInt;
var charAt = uncurryThis(''.charAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var splice = uncurryThis([].splice);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);
var exec = uncurryThis(/./.exec);

var plus = /\+/g;
var FALLBACK_REPLACER = '\uFFFD';
var VALID_HEX = /^[0-9a-f]+$/i;

var parseHexOctet = function (string, start) {
  var substr = stringSlice(string, start, start + 2);
  if (!exec(VALID_HEX, substr)) return NaN;

  return $parseInt(substr, 16);
};

var getLeadingOnes = function (octet) {
  var count = 0;
  for (var mask = 0x80; mask > 0 && (octet & mask) !== 0; mask >>= 1) {
    count++;
  }
  return count;
};

var utf8Decode = function (octets) {
  var codePoint = null;

  switch (octets.length) {
    case 1:
      codePoint = octets[0];
      break;
    case 2:
      codePoint = (octets[0] & 0x1F) << 6 | (octets[1] & 0x3F);
      break;
    case 3:
      codePoint = (octets[0] & 0x0F) << 12 | (octets[1] & 0x3F) << 6 | (octets[2] & 0x3F);
      break;
    case 4:
      codePoint = (octets[0] & 0x07) << 18 | (octets[1] & 0x3F) << 12 | (octets[2] & 0x3F) << 6 | (octets[3] & 0x3F);
      break;
  }

  return codePoint > 0x10FFFF ? null : codePoint;
};

var decode = function (input) {
  input = replace(input, plus, ' ');
  var length = input.length;
  var result = '';
  var i = 0;

  while (i < length) {
    var decodedChar = charAt(input, i);

    if (decodedChar === '%') {
      if (charAt(input, i + 1) === '%' || i + 3 > length) {
        result += '%';
        i++;
        continue;
      }

      var octet = parseHexOctet(input, i + 1);

      // eslint-disable-next-line no-self-compare -- NaN check
      if (octet !== octet) {
        result += decodedChar;
        i++;
        continue;
      }

      i += 2;
      var byteSequenceLength = getLeadingOnes(octet);

      if (byteSequenceLength === 0) {
        decodedChar = fromCharCode(octet);
      } else {
        if (byteSequenceLength === 1 || byteSequenceLength > 4) {
          result += FALLBACK_REPLACER;
          i++;
          continue;
        }

        var octets = [octet];
        var sequenceIndex = 1;

        while (sequenceIndex < byteSequenceLength) {
          i++;
          if (i + 3 > length || charAt(input, i) !== '%') break;

          var nextByte = parseHexOctet(input, i + 1);

          // eslint-disable-next-line no-self-compare -- NaN check
          if (nextByte !== nextByte) {
            i += 3;
            break;
          }
          if (nextByte > 191 || nextByte < 128) break;

          push(octets, nextByte);
          i += 2;
          sequenceIndex++;
        }

        if (octets.length !== byteSequenceLength) {
          result += FALLBACK_REPLACER;
          continue;
        }

        var codePoint = utf8Decode(octets);
        if (codePoint === null) {
          result += FALLBACK_REPLACER;
        } else {
          decodedChar = fromCodePoint(codePoint);
        }
      }
    }

    result += decodedChar;
    i++;
  }

  return result;
};

var find = /[!'()~]|%20/g;

var replacements = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replacements[match];
};

var serialize = function (it) {
  return replace(encodeURIComponent(it), find, replacer);
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    target: getInternalParamsState(params).entries,
    index: 0,
    kind: kind
  });
}, URL_SEARCH_PARAMS, function next() {
  var state = getInternalIteratorState(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = null;
    return createIterResultObject(undefined, true);
  }
  var entry = target[index];
  switch (state.kind) {
    case 'keys': return createIterResultObject(entry.key, false);
    case 'values': return createIterResultObject(entry.value, false);
  } return createIterResultObject([entry.key, entry.value], false);
}, true);

var URLSearchParamsState = function (init) {
  this.entries = [];
  this.url = null;

  if (init !== undefined) {
    if (isObject(init)) this.parseObject(init);
    else this.parseQuery(typeof init == 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : $toString(init));
  }
};

URLSearchParamsState.prototype = {
  type: URL_SEARCH_PARAMS,
  bindURL: function (url) {
    this.url = url;
    this.update();
  },
  parseObject: function (object) {
    var entries = this.entries;
    var iteratorMethod = getIteratorMethod(object);
    var iterator, next, step, entryIterator, entryNext, first, second;

    if (iteratorMethod) {
      iterator = getIterator(object, iteratorMethod);
      next = iterator.next;
      while (!(step = call(next, iterator)).done) {
        entryIterator = getIterator(anObject(step.value));
        entryNext = entryIterator.next;
        if (
          (first = call(entryNext, entryIterator)).done ||
          (second = call(entryNext, entryIterator)).done ||
          !call(entryNext, entryIterator).done
        ) throw new TypeError('Expected sequence with length 2');
        push(entries, { key: $toString(first.value), value: $toString(second.value) });
      }
    } else for (var key in object) if (hasOwn(object, key)) {
      push(entries, { key: key, value: $toString(object[key]) });
    }
  },
  parseQuery: function (query) {
    if (query) {
      var entries = this.entries;
      var attributes = split(query, '&');
      var index = 0;
      var attribute, entry;
      while (index < attributes.length) {
        attribute = attributes[index++];
        if (attribute.length) {
          entry = split(attribute, '=');
          push(entries, {
            key: decode(shift(entry)),
            value: decode(join(entry, '='))
          });
        }
      }
    }
  },
  serialize: function () {
    var entries = this.entries;
    var result = [];
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      push(result, serialize(entry.key) + '=' + serialize(entry.value));
    } return join(result, '&');
  },
  update: function () {
    this.entries.length = 0;
    this.parseQuery(this.url.query);
  },
  updateURL: function () {
    if (this.url) this.url.update();
  }
};

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsPrototype);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var state = setInternalState(this, new URLSearchParamsState(init));
  if (!DESCRIPTORS) this.size = state.entries.length;
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

defineBuiltIns(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength(arguments.length, 2);
    push(state.entries, { key: $toString(name), value: $toString(value) });
    if (!DESCRIPTORS) this.size++;
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name /* , value */) {
    var state = getInternalParamsState(this);
    var length = validateArgumentsLength(arguments.length, 1);
    var entries = state.entries;
    var key = $toString(name);
    var $value = length < 2 ? undefined : arguments[1];
    var value = $value === undefined ? $value : $toString($value);
    var index = 0;
    while (index < entries.length) {
      var entry = entries[index];
      if (entry.key === key && (value === undefined || entry.value === value)) {
        splice(entries, index, 1);
        if (value !== undefined) break;
      } else index++;
    }
    if (!DESCRIPTORS) this.size = entries.length;
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    var entries = getInternalParamsState(this).entries;
    validateArgumentsLength(arguments.length, 1);
    var key = $toString(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    var entries = getInternalParamsState(this).entries;
    validateArgumentsLength(arguments.length, 1);
    var key = $toString(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) push(result, entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name /* , value */) {
    var entries = getInternalParamsState(this).entries;
    var length = validateArgumentsLength(arguments.length, 1);
    var key = $toString(name);
    var $value = length < 2 ? undefined : arguments[1];
    var value = $value === undefined ? $value : $toString($value);
    var index = 0;
    while (index < entries.length) {
      var entry = entries[index++];
      if (entry.key === key && (value === undefined || entry.value === value)) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength(arguments.length, 1);
    var entries = state.entries;
    var found = false;
    var key = $toString(name);
    var val = $toString(value);
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) splice(entries, index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) push(entries, { key: key, value: val });
    if (!DESCRIPTORS) this.size = entries.length;
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    arraySort(state.entries, function (a, b) {
      return a.key > b.key ? 1 : -1;
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
defineBuiltIn(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
defineBuiltIn(URLSearchParamsPrototype, 'toString', function toString() {
  return getInternalParamsState(this).serialize();
}, { enumerable: true });

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS) defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
  get: function size() {
    return getInternalParamsState(this).entries.length;
  },
  configurable: true,
  enumerable: true
});

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, constructor: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL && isCallable(Headers)) {
  var headersHas = uncurryThis(HeadersPrototype.has);
  var headersSet = uncurryThis(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headersHas(headers, 'content-type')) {
          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create(init, {
          body: createPropertyDescriptor(0, $toString(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    } return init;
  };

  if (isCallable(nativeFetch)) {
    $({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable(NativeRequest)) {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance(this, RequestPrototype);
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};

}, function(modId) { var map = {"../modules/es.array.iterator":1773651887131,"../modules/es.string.from-code-point":1773651887416,"../internals/export":1773651886961,"../internals/global-this":1773651886962,"../internals/safe-get-built-in":1773651887330,"../internals/get-built-in":1773651886983,"../internals/function-call":1773651886972,"../internals/function-uncurry-this":1773651886968,"../internals/descriptors":1773651886971,"../internals/url-constructor-detection":1773651887802,"../internals/define-built-in":1773651887031,"../internals/define-built-in-accessor":1773651887032,"../internals/define-built-ins":1773651887190,"../internals/set-to-string-tag":1773651887036,"../internals/iterator-create-constructor":1773651887134,"../internals/internal-state":1773651887038,"../internals/an-instance":1773651887189,"../internals/is-callable":1773651886969,"../internals/has-own-property":1773651886999,"../internals/function-bind-context":1773651887005,"../internals/classof":1773651887011,"../internals/an-object":1773651887009,"../internals/is-object":1773651886981,"../internals/to-string":1773651887010,"../internals/object-create":1773651887013,"../internals/create-property-descriptor":1773651886974,"../internals/get-iterator":1773651887095,"../internals/get-iterator-method":1773651887096,"../internals/create-iter-result-object":1773651887136,"../internals/validate-arguments-length":1773651887327,"../internals/well-known-symbol":1773651886994,"../internals/array-sort":1773651887152}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887805, function(require, module, exports) {

var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var fails = require('../internals/fails');
var validateArgumentsLength = require('../internals/validate-arguments-length');
var toString = require('../internals/to-string');
var USE_NATIVE_URL = require('../internals/url-constructor-detection');

var URL = getBuiltIn('URL');

// https://github.com/nodejs/node/issues/47505
// https://github.com/denoland/deno/issues/18893
var THROWS_WITHOUT_ARGUMENTS = USE_NATIVE_URL && fails(function () {
  URL.canParse();
});

// Bun ~ 1.0.30 bug
// https://github.com/oven-sh/bun/issues/9250
var WRONG_ARITY = fails(function () {
  return URL.canParse.length !== 1;
});

// `URL.canParse` method
// https://url.spec.whatwg.org/#dom-url-canparse
$({ target: 'URL', stat: true, forced: !THROWS_WITHOUT_ARGUMENTS || WRONG_ARITY }, {
  canParse: function canParse(url) {
    var length = validateArgumentsLength(arguments.length, 1);
    var urlString = toString(url);
    var base = length < 2 || arguments[1] === undefined ? undefined : toString(arguments[1]);
    try {
      return !!new URL(urlString, base);
    } catch (error) {
      return false;
    }
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/get-built-in":1773651886983,"../internals/fails":1773651886965,"../internals/validate-arguments-length":1773651887327,"../internals/to-string":1773651887010,"../internals/url-constructor-detection":1773651887802}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887806, function(require, module, exports) {

var $ = require('../internals/export');
var getBuiltIn = require('../internals/get-built-in');
var validateArgumentsLength = require('../internals/validate-arguments-length');
var toString = require('../internals/to-string');
var USE_NATIVE_URL = require('../internals/url-constructor-detection');

var URL = getBuiltIn('URL');

// `URL.parse` method
// https://url.spec.whatwg.org/#dom-url-canparse
$({ target: 'URL', stat: true, forced: !USE_NATIVE_URL }, {
  parse: function parse(url) {
    var length = validateArgumentsLength(arguments.length, 1);
    var urlString = toString(url);
    var base = length < 2 || arguments[1] === undefined ? undefined : toString(arguments[1]);
    try {
      return new URL(urlString, base);
    } catch (error) {
      return null;
    }
  }
});

}, function(modId) { var map = {"../internals/export":1773651886961,"../internals/get-built-in":1773651886983,"../internals/validate-arguments-length":1773651887327,"../internals/to-string":1773651887010,"../internals/url-constructor-detection":1773651887802}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887807, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887808, function(require, module, exports) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
require('../modules/web.url-search-params.constructor');

}, function(modId) { var map = {"../modules/web.url-search-params.constructor":1773651887804}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887809, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887810, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651887811, function(require, module, exports) {
// empty

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1773651886957);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map