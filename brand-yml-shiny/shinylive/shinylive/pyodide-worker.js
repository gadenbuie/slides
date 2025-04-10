// Shinylive 0.10.4
// Copyright 2025 Posit, PBC
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x3) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x3, {
  get: (a2, b2) => (typeof require !== "undefined" ? require : a2)[b2]
}) : x3)(function(x3) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x3 + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/ws/browser.js
var require_browser = __commonJS({
  "node_modules/ws/browser.js"(exports, module2) {
    "use strict";
    module2.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// src/awaitable-queue.ts
var AwaitableQueue = class {
  constructor() {
    this._buffer = [];
    this._resolve = null;
    this._promise = null;
    this._notifyAll();
  }
  async _wait() {
    await this._promise;
  }
  _notifyAll() {
    if (this._resolve) {
      this._resolve();
    }
    this._promise = new Promise((resolve) => this._resolve = resolve);
  }
  async dequeue() {
    while (this._buffer.length === 0) {
      await this._wait();
    }
    return this._buffer.shift();
  }
  enqueue(x3) {
    this._buffer.push(x3);
    this._notifyAll();
  }
};

// src/utils.ts
function uint8ArrayToString(buf) {
  let result = "";
  for (let i = 0; i < buf.length; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}

// node_modules/webr/dist/webr.mjs
var sn = Object.create;
var Zr = Object.defineProperty;
var nn = Object.getOwnPropertyDescriptor;
var on = Object.getOwnPropertyNames;
var an = Object.getPrototypeOf;
var ln = Object.prototype.hasOwnProperty;
var B = ((s2) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(s2, { get: (e, t) => (typeof __require < "u" ? __require : e)[t] }) : s2)(function(s2) {
  if (typeof __require < "u") return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + s2 + '" is not supported');
});
var S = (s2, e) => () => (e || s2((e = { exports: {} }).exports, e), e.exports);
var cn = (s2, e, t, r) => {
  if (e && typeof e == "object" || typeof e == "function") for (let n of on(e)) !ln.call(s2, n) && n !== t && Zr(s2, n, { get: () => e[n], enumerable: !(r = nn(e, n)) || r.enumerable });
  return s2;
};
var oe = (s2, e, t) => (t = s2 != null ? sn(an(s2)) : {}, cn(e || !s2 || !s2.__esModule ? Zr(t, "default", { value: s2, enumerable: true }) : t, s2));
var fr = (s2, e, t) => {
  if (!e.has(s2)) throw TypeError("Cannot " + t);
};
var a = (s2, e, t) => (fr(s2, e, "read from private field"), t ? t.call(s2) : e.get(s2));
var u = (s2, e, t) => {
  if (e.has(s2)) throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s2) : e.set(s2, t);
};
var d = (s2, e, t, r) => (fr(s2, e, "write to private field"), r ? r.call(s2, t) : e.set(s2, t), t);
var E = (s2, e, t) => (fr(s2, e, "access private method"), t);
var He = S((C2) => {
  "use strict";
  Object.defineProperty(C2, "__esModule", { value: true });
  C2.getUint64 = C2.getInt64 = C2.setInt64 = C2.setUint64 = C2.UINT32_MAX = void 0;
  C2.UINT32_MAX = 4294967295;
  function fn(s2, e, t) {
    let r = t / 4294967296, n = t;
    s2.setUint32(e, r), s2.setUint32(e + 4, n);
  }
  C2.setUint64 = fn;
  function Rn(s2, e, t) {
    let r = Math.floor(t / 4294967296), n = t;
    s2.setUint32(e, r), s2.setUint32(e + 4, n);
  }
  C2.setInt64 = Rn;
  function mn(s2, e) {
    let t = s2.getInt32(e), r = s2.getUint32(e + 4);
    return t * 4294967296 + r;
  }
  C2.getInt64 = mn;
  function gn(s2, e) {
    let t = s2.getUint32(e), r = s2.getUint32(e + 4);
    return t * 4294967296 + r;
  }
  C2.getUint64 = gn;
});
var Ot = S((M2) => {
  "use strict";
  var _r, Sr, kr;
  Object.defineProperty(M2, "__esModule", { value: true });
  M2.utf8DecodeTD = M2.TEXT_DECODER_THRESHOLD = M2.utf8DecodeJs = M2.utf8EncodeTE = M2.TEXT_ENCODER_THRESHOLD = M2.utf8EncodeJs = M2.utf8Count = void 0;
  var ps = He(), At = (typeof process > "u" || ((_r = process == null ? void 0 : process.env) === null || _r === void 0 ? void 0 : _r.TEXT_ENCODING) !== "never") && typeof TextEncoder < "u" && typeof TextDecoder < "u";
  function bn(s2) {
    let e = s2.length, t = 0, r = 0;
    for (; r < e; ) {
      let n = s2.charCodeAt(r++);
      if (n & 4294967168) if (!(n & 4294965248)) t += 2;
      else {
        if (n >= 55296 && n <= 56319 && r < e) {
          let o = s2.charCodeAt(r);
          (o & 64512) === 56320 && (++r, n = ((n & 1023) << 10) + (o & 1023) + 65536);
        }
        n & 4294901760 ? t += 4 : t += 3;
      }
      else {
        t++;
        continue;
      }
    }
    return t;
  }
  M2.utf8Count = bn;
  function wn(s2, e, t) {
    let r = s2.length, n = t, o = 0;
    for (; o < r; ) {
      let i = s2.charCodeAt(o++);
      if (i & 4294967168) if (!(i & 4294965248)) e[n++] = i >> 6 & 31 | 192;
      else {
        if (i >= 55296 && i <= 56319 && o < r) {
          let l = s2.charCodeAt(o);
          (l & 64512) === 56320 && (++o, i = ((i & 1023) << 10) + (l & 1023) + 65536);
        }
        i & 4294901760 ? (e[n++] = i >> 18 & 7 | 240, e[n++] = i >> 12 & 63 | 128, e[n++] = i >> 6 & 63 | 128) : (e[n++] = i >> 12 & 15 | 224, e[n++] = i >> 6 & 63 | 128);
      }
      else {
        e[n++] = i;
        continue;
      }
      e[n++] = i & 63 | 128;
    }
  }
  M2.utf8EncodeJs = wn;
  var ze = At ? new TextEncoder() : void 0;
  M2.TEXT_ENCODER_THRESHOLD = At ? typeof process < "u" && ((Sr = process == null ? void 0 : process.env) === null || Sr === void 0 ? void 0 : Sr.TEXT_ENCODING) !== "force" ? 200 : 0 : ps.UINT32_MAX;
  function xn(s2, e, t) {
    e.set(ze.encode(s2), t);
  }
  function vn(s2, e, t) {
    ze.encodeInto(s2, e.subarray(t));
  }
  M2.utf8EncodeTE = ze != null && ze.encodeInto ? vn : xn;
  var En = 4096;
  function Pn(s2, e, t) {
    let r = e, n = r + t, o = [], i = "";
    for (; r < n; ) {
      let l = s2[r++];
      if (!(l & 128)) o.push(l);
      else if ((l & 224) === 192) {
        let p2 = s2[r++] & 63;
        o.push((l & 31) << 6 | p2);
      } else if ((l & 240) === 224) {
        let p2 = s2[r++] & 63, D2 = s2[r++] & 63;
        o.push((l & 31) << 12 | p2 << 6 | D2);
      } else if ((l & 248) === 240) {
        let p2 = s2[r++] & 63, D2 = s2[r++] & 63, b2 = s2[r++] & 63, j2 = (l & 7) << 18 | p2 << 12 | D2 << 6 | b2;
        j2 > 65535 && (j2 -= 65536, o.push(j2 >>> 10 & 1023 | 55296), j2 = 56320 | j2 & 1023), o.push(j2);
      } else o.push(l);
      o.length >= En && (i += String.fromCharCode(...o), o.length = 0);
    }
    return o.length > 0 && (i += String.fromCharCode(...o)), i;
  }
  M2.utf8DecodeJs = Pn;
  var Tn = At ? new TextDecoder() : null;
  M2.TEXT_DECODER_THRESHOLD = At ? typeof process < "u" && ((kr = process == null ? void 0 : process.env) === null || kr === void 0 ? void 0 : kr.TEXT_DECODER) !== "force" ? 200 : 0 : ps.UINT32_MAX;
  function _n(s2, e, t) {
    let r = s2.subarray(e, e + t);
    return Tn.decode(r);
  }
  M2.utf8DecodeTD = _n;
});
var Dr = S((It) => {
  "use strict";
  Object.defineProperty(It, "__esModule", { value: true });
  It.ExtData = void 0;
  var Mr = class {
    constructor(e, t) {
      this.type = e, this.data = t;
    }
  };
  It.ExtData = Mr;
});
var Ct = S((Ut) => {
  "use strict";
  Object.defineProperty(Ut, "__esModule", { value: true });
  Ut.DecodeError = void 0;
  var we = class extends Error {
    constructor(e) {
      super(e);
      let t = Object.create(we.prototype);
      Object.setPrototypeOf(this, t), Object.defineProperty(this, "name", { configurable: true, enumerable: false, value: we.name });
    }
  };
  Ut.DecodeError = we;
});
var Wr = S((_2) => {
  "use strict";
  Object.defineProperty(_2, "__esModule", { value: true });
  _2.timestampExtension = _2.decodeTimestampExtension = _2.decodeTimestampToTimeSpec = _2.encodeTimestampExtension = _2.encodeDateToTimeSpec = _2.encodeTimeSpecToTimestamp = _2.EXT_TIMESTAMP = void 0;
  var Sn = Ct(), ds = He();
  _2.EXT_TIMESTAMP = -1;
  var kn = 4294967296 - 1, Mn = 17179869184 - 1;
  function hs({ sec: s2, nsec: e }) {
    if (s2 >= 0 && e >= 0 && s2 <= Mn) if (e === 0 && s2 <= kn) {
      let t = new Uint8Array(4);
      return new DataView(t.buffer).setUint32(0, s2), t;
    } else {
      let t = s2 / 4294967296, r = s2 & 4294967295, n = new Uint8Array(8), o = new DataView(n.buffer);
      return o.setUint32(0, e << 2 | t & 3), o.setUint32(4, r), n;
    }
    else {
      let t = new Uint8Array(12), r = new DataView(t.buffer);
      return r.setUint32(0, e), (0, ds.setInt64)(r, 4, s2), t;
    }
  }
  _2.encodeTimeSpecToTimestamp = hs;
  function ys(s2) {
    let e = s2.getTime(), t = Math.floor(e / 1e3), r = (e - t * 1e3) * 1e6, n = Math.floor(r / 1e9);
    return { sec: t + n, nsec: r - n * 1e9 };
  }
  _2.encodeDateToTimeSpec = ys;
  function fs(s2) {
    if (s2 instanceof Date) {
      let e = ys(s2);
      return hs(e);
    } else return null;
  }
  _2.encodeTimestampExtension = fs;
  function Rs(s2) {
    let e = new DataView(s2.buffer, s2.byteOffset, s2.byteLength);
    switch (s2.byteLength) {
      case 4:
        return { sec: e.getUint32(0), nsec: 0 };
      case 8: {
        let t = e.getUint32(0), r = e.getUint32(4), n = (t & 3) * 4294967296 + r, o = t >>> 2;
        return { sec: n, nsec: o };
      }
      case 12: {
        let t = (0, ds.getInt64)(e, 4), r = e.getUint32(0);
        return { sec: t, nsec: r };
      }
      default:
        throw new Sn.DecodeError(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${s2.length}`);
    }
  }
  _2.decodeTimestampToTimeSpec = Rs;
  function ms(s2) {
    let e = Rs(s2);
    return new Date(e.sec * 1e3 + e.nsec / 1e6);
  }
  _2.decodeTimestampExtension = ms;
  _2.timestampExtension = { type: _2.EXT_TIMESTAMP, encode: fs, decode: ms };
});
var Bt = S((Nt) => {
  "use strict";
  Object.defineProperty(Nt, "__esModule", { value: true });
  Nt.ExtensionCodec = void 0;
  var jt = Dr(), Dn = Wr(), Xe = class {
    constructor() {
      this.builtInEncoders = [], this.builtInDecoders = [], this.encoders = [], this.decoders = [], this.register(Dn.timestampExtension);
    }
    register({ type: e, encode: t, decode: r }) {
      if (e >= 0) this.encoders[e] = t, this.decoders[e] = r;
      else {
        let n = 1 + e;
        this.builtInEncoders[n] = t, this.builtInDecoders[n] = r;
      }
    }
    tryToEncode(e, t) {
      for (let r = 0; r < this.builtInEncoders.length; r++) {
        let n = this.builtInEncoders[r];
        if (n != null) {
          let o = n(e, t);
          if (o != null) {
            let i = -1 - r;
            return new jt.ExtData(i, o);
          }
        }
      }
      for (let r = 0; r < this.encoders.length; r++) {
        let n = this.encoders[r];
        if (n != null) {
          let o = n(e, t);
          if (o != null) {
            let i = r;
            return new jt.ExtData(i, o);
          }
        }
      }
      return e instanceof jt.ExtData ? e : null;
    }
    decode(e, t, r) {
      let n = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
      return n ? n(e, t, r) : new jt.ExtData(t, e);
    }
  };
  Nt.ExtensionCodec = Xe;
  Xe.defaultCodec = new Xe();
});
var Ar = S((xe) => {
  "use strict";
  Object.defineProperty(xe, "__esModule", { value: true });
  xe.createDataView = xe.ensureUint8Array = void 0;
  function gs(s2) {
    return s2 instanceof Uint8Array ? s2 : ArrayBuffer.isView(s2) ? new Uint8Array(s2.buffer, s2.byteOffset, s2.byteLength) : s2 instanceof ArrayBuffer ? new Uint8Array(s2) : Uint8Array.from(s2);
  }
  xe.ensureUint8Array = gs;
  function Wn(s2) {
    if (s2 instanceof ArrayBuffer) return new DataView(s2);
    let e = gs(s2);
    return new DataView(e.buffer, e.byteOffset, e.byteLength);
  }
  xe.createDataView = Wn;
});
var Ir = S((J2) => {
  "use strict";
  Object.defineProperty(J2, "__esModule", { value: true });
  J2.Encoder = J2.DEFAULT_INITIAL_BUFFER_SIZE = J2.DEFAULT_MAX_DEPTH = void 0;
  var Ge = Ot(), An = Bt(), bs = He(), On = Ar();
  J2.DEFAULT_MAX_DEPTH = 100;
  J2.DEFAULT_INITIAL_BUFFER_SIZE = 2048;
  var Or = class {
    constructor(e = An.ExtensionCodec.defaultCodec, t = void 0, r = J2.DEFAULT_MAX_DEPTH, n = J2.DEFAULT_INITIAL_BUFFER_SIZE, o = false, i = false, l = false, p2 = false) {
      this.extensionCodec = e, this.context = t, this.maxDepth = r, this.initialBufferSize = n, this.sortKeys = o, this.forceFloat32 = i, this.ignoreUndefined = l, this.forceIntegerToFloat = p2, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer);
    }
    reinitializeState() {
      this.pos = 0;
    }
    encodeSharedRef(e) {
      return this.reinitializeState(), this.doEncode(e, 1), this.bytes.subarray(0, this.pos);
    }
    encode(e) {
      return this.reinitializeState(), this.doEncode(e, 1), this.bytes.slice(0, this.pos);
    }
    doEncode(e, t) {
      if (t > this.maxDepth) throw new Error(`Too deep objects in depth ${t}`);
      e == null ? this.encodeNil() : typeof e == "boolean" ? this.encodeBoolean(e) : typeof e == "number" ? this.encodeNumber(e) : typeof e == "string" ? this.encodeString(e) : this.encodeObject(e, t);
    }
    ensureBufferSizeToWrite(e) {
      let t = this.pos + e;
      this.view.byteLength < t && this.resizeBuffer(t * 2);
    }
    resizeBuffer(e) {
      let t = new ArrayBuffer(e), r = new Uint8Array(t), n = new DataView(t);
      r.set(this.bytes), this.view = n, this.bytes = r;
    }
    encodeNil() {
      this.writeU8(192);
    }
    encodeBoolean(e) {
      e === false ? this.writeU8(194) : this.writeU8(195);
    }
    encodeNumber(e) {
      Number.isSafeInteger(e) && !this.forceIntegerToFloat ? e >= 0 ? e < 128 ? this.writeU8(e) : e < 256 ? (this.writeU8(204), this.writeU8(e)) : e < 65536 ? (this.writeU8(205), this.writeU16(e)) : e < 4294967296 ? (this.writeU8(206), this.writeU32(e)) : (this.writeU8(207), this.writeU64(e)) : e >= -32 ? this.writeU8(224 | e + 32) : e >= -128 ? (this.writeU8(208), this.writeI8(e)) : e >= -32768 ? (this.writeU8(209), this.writeI16(e)) : e >= -2147483648 ? (this.writeU8(210), this.writeI32(e)) : (this.writeU8(211), this.writeI64(e)) : this.forceFloat32 ? (this.writeU8(202), this.writeF32(e)) : (this.writeU8(203), this.writeF64(e));
    }
    writeStringHeader(e) {
      if (e < 32) this.writeU8(160 + e);
      else if (e < 256) this.writeU8(217), this.writeU8(e);
      else if (e < 65536) this.writeU8(218), this.writeU16(e);
      else if (e < 4294967296) this.writeU8(219), this.writeU32(e);
      else throw new Error(`Too long string: ${e} bytes in UTF-8`);
    }
    encodeString(e) {
      if (e.length > Ge.TEXT_ENCODER_THRESHOLD) {
        let n = (0, Ge.utf8Count)(e);
        this.ensureBufferSizeToWrite(5 + n), this.writeStringHeader(n), (0, Ge.utf8EncodeTE)(e, this.bytes, this.pos), this.pos += n;
      } else {
        let n = (0, Ge.utf8Count)(e);
        this.ensureBufferSizeToWrite(5 + n), this.writeStringHeader(n), (0, Ge.utf8EncodeJs)(e, this.bytes, this.pos), this.pos += n;
      }
    }
    encodeObject(e, t) {
      let r = this.extensionCodec.tryToEncode(e, this.context);
      if (r != null) this.encodeExtension(r);
      else if (Array.isArray(e)) this.encodeArray(e, t);
      else if (ArrayBuffer.isView(e)) this.encodeBinary(e);
      else if (typeof e == "object") this.encodeMap(e, t);
      else throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(e)}`);
    }
    encodeBinary(e) {
      let t = e.byteLength;
      if (t < 256) this.writeU8(196), this.writeU8(t);
      else if (t < 65536) this.writeU8(197), this.writeU16(t);
      else if (t < 4294967296) this.writeU8(198), this.writeU32(t);
      else throw new Error(`Too large binary: ${t}`);
      let r = (0, On.ensureUint8Array)(e);
      this.writeU8a(r);
    }
    encodeArray(e, t) {
      let r = e.length;
      if (r < 16) this.writeU8(144 + r);
      else if (r < 65536) this.writeU8(220), this.writeU16(r);
      else if (r < 4294967296) this.writeU8(221), this.writeU32(r);
      else throw new Error(`Too large array: ${r}`);
      for (let n of e) this.doEncode(n, t + 1);
    }
    countWithoutUndefined(e, t) {
      let r = 0;
      for (let n of t) e[n] !== void 0 && r++;
      return r;
    }
    encodeMap(e, t) {
      let r = Object.keys(e);
      this.sortKeys && r.sort();
      let n = this.ignoreUndefined ? this.countWithoutUndefined(e, r) : r.length;
      if (n < 16) this.writeU8(128 + n);
      else if (n < 65536) this.writeU8(222), this.writeU16(n);
      else if (n < 4294967296) this.writeU8(223), this.writeU32(n);
      else throw new Error(`Too large map object: ${n}`);
      for (let o of r) {
        let i = e[o];
        this.ignoreUndefined && i === void 0 || (this.encodeString(o), this.doEncode(i, t + 1));
      }
    }
    encodeExtension(e) {
      let t = e.data.length;
      if (t === 1) this.writeU8(212);
      else if (t === 2) this.writeU8(213);
      else if (t === 4) this.writeU8(214);
      else if (t === 8) this.writeU8(215);
      else if (t === 16) this.writeU8(216);
      else if (t < 256) this.writeU8(199), this.writeU8(t);
      else if (t < 65536) this.writeU8(200), this.writeU16(t);
      else if (t < 4294967296) this.writeU8(201), this.writeU32(t);
      else throw new Error(`Too large extension object: ${t}`);
      this.writeI8(e.type), this.writeU8a(e.data);
    }
    writeU8(e) {
      this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, e), this.pos++;
    }
    writeU8a(e) {
      let t = e.length;
      this.ensureBufferSizeToWrite(t), this.bytes.set(e, this.pos), this.pos += t;
    }
    writeI8(e) {
      this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, e), this.pos++;
    }
    writeU16(e) {
      this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, e), this.pos += 2;
    }
    writeI16(e) {
      this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, e), this.pos += 2;
    }
    writeU32(e) {
      this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, e), this.pos += 4;
    }
    writeI32(e) {
      this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, e), this.pos += 4;
    }
    writeF32(e) {
      this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, e), this.pos += 4;
    }
    writeF64(e) {
      this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, e), this.pos += 8;
    }
    writeU64(e) {
      this.ensureBufferSizeToWrite(8), (0, bs.setUint64)(this.view, this.pos, e), this.pos += 8;
    }
    writeI64(e) {
      this.ensureBufferSizeToWrite(8), (0, bs.setInt64)(this.view, this.pos, e), this.pos += 8;
    }
  };
  J2.Encoder = Or;
});
var ws = S((Lt) => {
  "use strict";
  Object.defineProperty(Lt, "__esModule", { value: true });
  Lt.encode = void 0;
  var In = Ir(), Un = {};
  function Cn(s2, e = Un) {
    return new In.Encoder(e.extensionCodec, e.context, e.maxDepth, e.initialBufferSize, e.sortKeys, e.forceFloat32, e.ignoreUndefined, e.forceIntegerToFloat).encodeSharedRef(s2);
  }
  Lt.encode = Cn;
});
var xs = S((Ft) => {
  "use strict";
  Object.defineProperty(Ft, "__esModule", { value: true });
  Ft.prettyByte = void 0;
  function jn(s2) {
    return `${s2 < 0 ? "-" : ""}0x${Math.abs(s2).toString(16).padStart(2, "0")}`;
  }
  Ft.prettyByte = jn;
});
var vs = S((qt) => {
  "use strict";
  Object.defineProperty(qt, "__esModule", { value: true });
  qt.CachedKeyDecoder = void 0;
  var Nn = Ot(), Bn = 16, Ln = 16, Ur = class {
    constructor(e = Bn, t = Ln) {
      this.maxKeyLength = e, this.maxLengthPerKey = t, this.hit = 0, this.miss = 0, this.caches = [];
      for (let r = 0; r < this.maxKeyLength; r++) this.caches.push([]);
    }
    canBeCached(e) {
      return e > 0 && e <= this.maxKeyLength;
    }
    find(e, t, r) {
      let n = this.caches[r - 1];
      e: for (let o of n) {
        let i = o.bytes;
        for (let l = 0; l < r; l++) if (i[l] !== e[t + l]) continue e;
        return o.str;
      }
      return null;
    }
    store(e, t) {
      let r = this.caches[e.length - 1], n = { bytes: e, str: t };
      r.length >= this.maxLengthPerKey ? r[Math.random() * r.length | 0] = n : r.push(n);
    }
    decode(e, t, r) {
      let n = this.find(e, t, r);
      if (n != null) return this.hit++, n;
      this.miss++;
      let o = (0, Nn.utf8DecodeJs)(e, t, r), i = Uint8Array.prototype.slice.call(e, t, t + r);
      return this.store(i, o), o;
    }
  };
  qt.CachedKeyDecoder = Ur;
});
var Vt = S((Q2) => {
  "use strict";
  Object.defineProperty(Q2, "__esModule", { value: true });
  Q2.Decoder = Q2.DataViewIndexOutOfBoundsError = void 0;
  var Cr = xs(), Fn = Bt(), ce2 = He(), jr = Ot(), Nr = Ar(), qn = vs(), K2 = Ct(), Vn = (s2) => {
    let e = typeof s2;
    return e === "string" || e === "number";
  }, $e2 = -1, Lr = new DataView(new ArrayBuffer(0)), Jn = new Uint8Array(Lr.buffer);
  Q2.DataViewIndexOutOfBoundsError = (() => {
    try {
      Lr.getInt8(0);
    } catch (s2) {
      return s2.constructor;
    }
    throw new Error("never reached");
  })();
  var Es = new Q2.DataViewIndexOutOfBoundsError("Insufficient data"), Hn = new qn.CachedKeyDecoder(), Br = class {
    constructor(e = Fn.ExtensionCodec.defaultCodec, t = void 0, r = ce2.UINT32_MAX, n = ce2.UINT32_MAX, o = ce2.UINT32_MAX, i = ce2.UINT32_MAX, l = ce2.UINT32_MAX, p2 = Hn) {
      this.extensionCodec = e, this.context = t, this.maxStrLength = r, this.maxBinLength = n, this.maxArrayLength = o, this.maxMapLength = i, this.maxExtLength = l, this.keyDecoder = p2, this.totalPos = 0, this.pos = 0, this.view = Lr, this.bytes = Jn, this.headByte = $e2, this.stack = [];
    }
    reinitializeState() {
      this.totalPos = 0, this.headByte = $e2, this.stack.length = 0;
    }
    setBuffer(e) {
      this.bytes = (0, Nr.ensureUint8Array)(e), this.view = (0, Nr.createDataView)(this.bytes), this.pos = 0;
    }
    appendBuffer(e) {
      if (this.headByte === $e2 && !this.hasRemaining(1)) this.setBuffer(e);
      else {
        let t = this.bytes.subarray(this.pos), r = (0, Nr.ensureUint8Array)(e), n = new Uint8Array(t.length + r.length);
        n.set(t), n.set(r, t.length), this.setBuffer(n);
      }
    }
    hasRemaining(e) {
      return this.view.byteLength - this.pos >= e;
    }
    createExtraByteError(e) {
      let { view: t, pos: r } = this;
      return new RangeError(`Extra ${t.byteLength - r} of ${t.byteLength} byte(s) found at buffer[${e}]`);
    }
    decode(e) {
      this.reinitializeState(), this.setBuffer(e);
      let t = this.doDecodeSync();
      if (this.hasRemaining(1)) throw this.createExtraByteError(this.pos);
      return t;
    }
    *decodeMulti(e) {
      for (this.reinitializeState(), this.setBuffer(e); this.hasRemaining(1); ) yield this.doDecodeSync();
    }
    async decodeAsync(e) {
      let t = false, r;
      for await (let l of e) {
        if (t) throw this.createExtraByteError(this.totalPos);
        this.appendBuffer(l);
        try {
          r = this.doDecodeSync(), t = true;
        } catch (p2) {
          if (!(p2 instanceof Q2.DataViewIndexOutOfBoundsError)) throw p2;
        }
        this.totalPos += this.pos;
      }
      if (t) {
        if (this.hasRemaining(1)) throw this.createExtraByteError(this.totalPos);
        return r;
      }
      let { headByte: n, pos: o, totalPos: i } = this;
      throw new RangeError(`Insufficient data in parsing ${(0, Cr.prettyByte)(n)} at ${i} (${o} in the current buffer)`);
    }
    decodeArrayStream(e) {
      return this.decodeMultiAsync(e, true);
    }
    decodeStream(e) {
      return this.decodeMultiAsync(e, false);
    }
    async *decodeMultiAsync(e, t) {
      let r = t, n = -1;
      for await (let o of e) {
        if (t && n === 0) throw this.createExtraByteError(this.totalPos);
        this.appendBuffer(o), r && (n = this.readArraySize(), r = false, this.complete());
        try {
          for (; yield this.doDecodeSync(), --n !== 0; ) ;
        } catch (i) {
          if (!(i instanceof Q2.DataViewIndexOutOfBoundsError)) throw i;
        }
        this.totalPos += this.pos;
      }
    }
    doDecodeSync() {
      e: for (; ; ) {
        let e = this.readHeadByte(), t;
        if (e >= 224) t = e - 256;
        else if (e < 192) if (e < 128) t = e;
        else if (e < 144) {
          let n = e - 128;
          if (n !== 0) {
            this.pushMapState(n), this.complete();
            continue e;
          } else t = {};
        } else if (e < 160) {
          let n = e - 144;
          if (n !== 0) {
            this.pushArrayState(n), this.complete();
            continue e;
          } else t = [];
        } else {
          let n = e - 160;
          t = this.decodeUtf8String(n, 0);
        }
        else if (e === 192) t = null;
        else if (e === 194) t = false;
        else if (e === 195) t = true;
        else if (e === 202) t = this.readF32();
        else if (e === 203) t = this.readF64();
        else if (e === 204) t = this.readU8();
        else if (e === 205) t = this.readU16();
        else if (e === 206) t = this.readU32();
        else if (e === 207) t = this.readU64();
        else if (e === 208) t = this.readI8();
        else if (e === 209) t = this.readI16();
        else if (e === 210) t = this.readI32();
        else if (e === 211) t = this.readI64();
        else if (e === 217) {
          let n = this.lookU8();
          t = this.decodeUtf8String(n, 1);
        } else if (e === 218) {
          let n = this.lookU16();
          t = this.decodeUtf8String(n, 2);
        } else if (e === 219) {
          let n = this.lookU32();
          t = this.decodeUtf8String(n, 4);
        } else if (e === 220) {
          let n = this.readU16();
          if (n !== 0) {
            this.pushArrayState(n), this.complete();
            continue e;
          } else t = [];
        } else if (e === 221) {
          let n = this.readU32();
          if (n !== 0) {
            this.pushArrayState(n), this.complete();
            continue e;
          } else t = [];
        } else if (e === 222) {
          let n = this.readU16();
          if (n !== 0) {
            this.pushMapState(n), this.complete();
            continue e;
          } else t = {};
        } else if (e === 223) {
          let n = this.readU32();
          if (n !== 0) {
            this.pushMapState(n), this.complete();
            continue e;
          } else t = {};
        } else if (e === 196) {
          let n = this.lookU8();
          t = this.decodeBinary(n, 1);
        } else if (e === 197) {
          let n = this.lookU16();
          t = this.decodeBinary(n, 2);
        } else if (e === 198) {
          let n = this.lookU32();
          t = this.decodeBinary(n, 4);
        } else if (e === 212) t = this.decodeExtension(1, 0);
        else if (e === 213) t = this.decodeExtension(2, 0);
        else if (e === 214) t = this.decodeExtension(4, 0);
        else if (e === 215) t = this.decodeExtension(8, 0);
        else if (e === 216) t = this.decodeExtension(16, 0);
        else if (e === 199) {
          let n = this.lookU8();
          t = this.decodeExtension(n, 1);
        } else if (e === 200) {
          let n = this.lookU16();
          t = this.decodeExtension(n, 2);
        } else if (e === 201) {
          let n = this.lookU32();
          t = this.decodeExtension(n, 4);
        } else throw new K2.DecodeError(`Unrecognized type byte: ${(0, Cr.prettyByte)(e)}`);
        this.complete();
        let r = this.stack;
        for (; r.length > 0; ) {
          let n = r[r.length - 1];
          if (n.type === 0) if (n.array[n.position] = t, n.position++, n.position === n.size) r.pop(), t = n.array;
          else continue e;
          else if (n.type === 1) {
            if (!Vn(t)) throw new K2.DecodeError("The type of key must be string or number but " + typeof t);
            if (t === "__proto__") throw new K2.DecodeError("The key __proto__ is not allowed");
            n.key = t, n.type = 2;
            continue e;
          } else if (n.map[n.key] = t, n.readCount++, n.readCount === n.size) r.pop(), t = n.map;
          else {
            n.key = null, n.type = 1;
            continue e;
          }
        }
        return t;
      }
    }
    readHeadByte() {
      return this.headByte === $e2 && (this.headByte = this.readU8()), this.headByte;
    }
    complete() {
      this.headByte = $e2;
    }
    readArraySize() {
      let e = this.readHeadByte();
      switch (e) {
        case 220:
          return this.readU16();
        case 221:
          return this.readU32();
        default: {
          if (e < 160) return e - 144;
          throw new K2.DecodeError(`Unrecognized array type byte: ${(0, Cr.prettyByte)(e)}`);
        }
      }
    }
    pushMapState(e) {
      if (e > this.maxMapLength) throw new K2.DecodeError(`Max length exceeded: map length (${e}) > maxMapLengthLength (${this.maxMapLength})`);
      this.stack.push({ type: 1, size: e, key: null, readCount: 0, map: {} });
    }
    pushArrayState(e) {
      if (e > this.maxArrayLength) throw new K2.DecodeError(`Max length exceeded: array length (${e}) > maxArrayLength (${this.maxArrayLength})`);
      this.stack.push({ type: 0, size: e, array: new Array(e), position: 0 });
    }
    decodeUtf8String(e, t) {
      var r;
      if (e > this.maxStrLength) throw new K2.DecodeError(`Max length exceeded: UTF-8 byte length (${e}) > maxStrLength (${this.maxStrLength})`);
      if (this.bytes.byteLength < this.pos + t + e) throw Es;
      let n = this.pos + t, o;
      return this.stateIsMapKey() && (!((r = this.keyDecoder) === null || r === void 0) && r.canBeCached(e)) ? o = this.keyDecoder.decode(this.bytes, n, e) : e > jr.TEXT_DECODER_THRESHOLD ? o = (0, jr.utf8DecodeTD)(this.bytes, n, e) : o = (0, jr.utf8DecodeJs)(this.bytes, n, e), this.pos += t + e, o;
    }
    stateIsMapKey() {
      return this.stack.length > 0 ? this.stack[this.stack.length - 1].type === 1 : false;
    }
    decodeBinary(e, t) {
      if (e > this.maxBinLength) throw new K2.DecodeError(`Max length exceeded: bin length (${e}) > maxBinLength (${this.maxBinLength})`);
      if (!this.hasRemaining(e + t)) throw Es;
      let r = this.pos + t, n = this.bytes.subarray(r, r + e);
      return this.pos += t + e, n;
    }
    decodeExtension(e, t) {
      if (e > this.maxExtLength) throw new K2.DecodeError(`Max length exceeded: ext length (${e}) > maxExtLength (${this.maxExtLength})`);
      let r = this.view.getInt8(this.pos + t), n = this.decodeBinary(e, t + 1);
      return this.extensionCodec.decode(n, r, this.context);
    }
    lookU8() {
      return this.view.getUint8(this.pos);
    }
    lookU16() {
      return this.view.getUint16(this.pos);
    }
    lookU32() {
      return this.view.getUint32(this.pos);
    }
    readU8() {
      let e = this.view.getUint8(this.pos);
      return this.pos++, e;
    }
    readI8() {
      let e = this.view.getInt8(this.pos);
      return this.pos++, e;
    }
    readU16() {
      let e = this.view.getUint16(this.pos);
      return this.pos += 2, e;
    }
    readI16() {
      let e = this.view.getInt16(this.pos);
      return this.pos += 2, e;
    }
    readU32() {
      let e = this.view.getUint32(this.pos);
      return this.pos += 4, e;
    }
    readI32() {
      let e = this.view.getInt32(this.pos);
      return this.pos += 4, e;
    }
    readU64() {
      let e = (0, ce2.getUint64)(this.view, this.pos);
      return this.pos += 8, e;
    }
    readI64() {
      let e = (0, ce2.getInt64)(this.view, this.pos);
      return this.pos += 8, e;
    }
    readF32() {
      let e = this.view.getFloat32(this.pos);
      return this.pos += 4, e;
    }
    readF64() {
      let e = this.view.getFloat64(this.pos);
      return this.pos += 8, e;
    }
  };
  Q2.Decoder = Br;
});
var Fr = S((H2) => {
  "use strict";
  Object.defineProperty(H2, "__esModule", { value: true });
  H2.decodeMulti = H2.decode = H2.defaultDecodeOptions = void 0;
  var Ps = Vt();
  H2.defaultDecodeOptions = {};
  function zn(s2, e = H2.defaultDecodeOptions) {
    return new Ps.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decode(s2);
  }
  H2.decode = zn;
  function Xn(s2, e = H2.defaultDecodeOptions) {
    return new Ps.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decodeMulti(s2);
  }
  H2.decodeMulti = Xn;
});
var Ss = S((re2) => {
  "use strict";
  Object.defineProperty(re2, "__esModule", { value: true });
  re2.ensureAsyncIterable = re2.asyncIterableFromStream = re2.isAsyncIterable = void 0;
  function Ts(s2) {
    return s2[Symbol.asyncIterator] != null;
  }
  re2.isAsyncIterable = Ts;
  function Gn(s2) {
    if (s2 == null) throw new Error("Assertion Failure: value must not be null nor undefined");
  }
  async function* _s(s2) {
    let e = s2.getReader();
    try {
      for (; ; ) {
        let { done: t, value: r } = await e.read();
        if (t) return;
        Gn(r), yield r;
      }
    } finally {
      e.releaseLock();
    }
  }
  re2.asyncIterableFromStream = _s;
  function $n(s2) {
    return Ts(s2) ? s2 : _s(s2);
  }
  re2.ensureAsyncIterable = $n;
});
var Ms = S((z2) => {
  "use strict";
  Object.defineProperty(z2, "__esModule", { value: true });
  z2.decodeStream = z2.decodeMultiStream = z2.decodeArrayStream = z2.decodeAsync = void 0;
  var qr = Vt(), Vr = Ss(), Jt = Fr();
  async function Kn(s2, e = Jt.defaultDecodeOptions) {
    let t = (0, Vr.ensureAsyncIterable)(s2);
    return new qr.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decodeAsync(t);
  }
  z2.decodeAsync = Kn;
  function Qn(s2, e = Jt.defaultDecodeOptions) {
    let t = (0, Vr.ensureAsyncIterable)(s2);
    return new qr.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decodeArrayStream(t);
  }
  z2.decodeArrayStream = Qn;
  function ks(s2, e = Jt.defaultDecodeOptions) {
    let t = (0, Vr.ensureAsyncIterable)(s2);
    return new qr.Decoder(e.extensionCodec, e.context, e.maxStrLength, e.maxBinLength, e.maxArrayLength, e.maxMapLength, e.maxExtLength).decodeStream(t);
  }
  z2.decodeMultiStream = ks;
  function Zn(s2, e = Jt.defaultDecodeOptions) {
    return ks(s2, e);
  }
  z2.decodeStream = Zn;
});
var zt = S((h2) => {
  "use strict";
  Object.defineProperty(h2, "__esModule", { value: true });
  h2.decodeTimestampExtension = h2.encodeTimestampExtension = h2.decodeTimestampToTimeSpec = h2.encodeTimeSpecToTimestamp = h2.encodeDateToTimeSpec = h2.EXT_TIMESTAMP = h2.ExtData = h2.ExtensionCodec = h2.Encoder = h2.DataViewIndexOutOfBoundsError = h2.DecodeError = h2.Decoder = h2.decodeStream = h2.decodeMultiStream = h2.decodeArrayStream = h2.decodeAsync = h2.decodeMulti = h2.decode = h2.encode = void 0;
  var Yn = ws();
  Object.defineProperty(h2, "encode", { enumerable: true, get: function() {
    return Yn.encode;
  } });
  var Ds = Fr();
  Object.defineProperty(h2, "decode", { enumerable: true, get: function() {
    return Ds.decode;
  } });
  Object.defineProperty(h2, "decodeMulti", { enumerable: true, get: function() {
    return Ds.decodeMulti;
  } });
  var Ht = Ms();
  Object.defineProperty(h2, "decodeAsync", { enumerable: true, get: function() {
    return Ht.decodeAsync;
  } });
  Object.defineProperty(h2, "decodeArrayStream", { enumerable: true, get: function() {
    return Ht.decodeArrayStream;
  } });
  Object.defineProperty(h2, "decodeMultiStream", { enumerable: true, get: function() {
    return Ht.decodeMultiStream;
  } });
  Object.defineProperty(h2, "decodeStream", { enumerable: true, get: function() {
    return Ht.decodeStream;
  } });
  var Ws = Vt();
  Object.defineProperty(h2, "Decoder", { enumerable: true, get: function() {
    return Ws.Decoder;
  } });
  Object.defineProperty(h2, "DataViewIndexOutOfBoundsError", { enumerable: true, get: function() {
    return Ws.DataViewIndexOutOfBoundsError;
  } });
  var eo = Ct();
  Object.defineProperty(h2, "DecodeError", { enumerable: true, get: function() {
    return eo.DecodeError;
  } });
  var to = Ir();
  Object.defineProperty(h2, "Encoder", { enumerable: true, get: function() {
    return to.Encoder;
  } });
  var ro = Bt();
  Object.defineProperty(h2, "ExtensionCodec", { enumerable: true, get: function() {
    return ro.ExtensionCodec;
  } });
  var so = Dr();
  Object.defineProperty(h2, "ExtData", { enumerable: true, get: function() {
    return so.ExtData;
  } });
  var ve = Wr();
  Object.defineProperty(h2, "EXT_TIMESTAMP", { enumerable: true, get: function() {
    return ve.EXT_TIMESTAMP;
  } });
  Object.defineProperty(h2, "encodeDateToTimeSpec", { enumerable: true, get: function() {
    return ve.encodeDateToTimeSpec;
  } });
  Object.defineProperty(h2, "encodeTimeSpecToTimestamp", { enumerable: true, get: function() {
    return ve.encodeTimeSpecToTimestamp;
  } });
  Object.defineProperty(h2, "decodeTimestampToTimeSpec", { enumerable: true, get: function() {
    return ve.decodeTimestampToTimeSpec;
  } });
  Object.defineProperty(h2, "encodeTimestampExtension", { enumerable: true, get: function() {
    return ve.encodeTimestampExtension;
  } });
  Object.defineProperty(h2, "decodeTimestampExtension", { enumerable: true, get: function() {
    return ve.decodeTimestampExtension;
  } });
});
var I = class extends Error {
  constructor(e) {
    super(e), this.name = this.constructor.name, Object.setPrototypeOf(this, new.target.prototype);
  }
};
var A = class extends I {
};
var P = class extends I {
};
var m = typeof process < "u" && process.release && process.release.name === "node";
var Rr;
if (globalThis.document) Rr = (s2) => new Promise((e, t) => {
  let r = document.createElement("script");
  r.src = s2, r.onload = () => e(), r.onerror = t, document.head.appendChild(r);
});
else if (globalThis.importScripts) Rr = async (s2) => {
  try {
    globalThis.importScripts(s2);
  } catch (e) {
    if (e instanceof TypeError) await Promise.resolve().then(() => oe(B(s2)));
    else throw e;
  }
};
else if (m) Rr = async (s2) => {
  let e = (await Promise.resolve().then(() => oe(B("path")))).default;
  await Promise.resolve().then(() => oe(B(e.resolve(s2))));
};
else throw new I("Cannot determine runtime environment");
var c = {};
function es(s2) {
  Object.keys(s2).forEach((e) => c._free(s2[e]));
}
var N = { null: 0, symbol: 1, pairlist: 2, closure: 3, environment: 4, promise: 5, call: 6, special: 7, builtin: 8, string: 9, logical: 10, integer: 13, double: 14, complex: 15, character: 16, dots: 17, any: 18, list: 19, expression: 20, bytecode: 21, pointer: 22, weakref: 23, raw: 24, s4: 25, new: 30, free: 31, function: 99 };
function mr(s2) {
  return !!s2 && typeof s2 == "object" && Object.keys(N).includes(s2.type);
}
function Ce(s2) {
  return !!s2 && typeof s2 == "object" && "re" in s2 && "im" in s2;
}
function je(s2) {
  return c._Rf_protect(L(s2)), s2;
}
function w(s2, e) {
  return c._Rf_protect(L(s2)), ++e.n, s2;
}
function ts(s2) {
  let e = c._malloc(4);
  return c._R_ProtectWithIndex(L(s2), e), { loc: c.getValue(e, "i32"), ptr: e };
}
function rs(s2) {
  c._Rf_unprotect(1), c._free(s2.ptr);
}
function ss(s2, e) {
  return c._R_Reprotect(L(s2), e.loc), s2;
}
function T(s2) {
  c._Rf_unprotect(s2);
}
function gr(s2, e, t) {
  c._Rf_defineVar(L(e), L(t), L(s2));
}
function br(s2, e) {
  let t = {}, r = { n: 0 };
  try {
    let n = new Be(e);
    w(n, r), t.code = c.allocateUTF8(s2);
    let o = c._R_ParseEvalString(t.code, n.ptr);
    return y.wrap(o);
  } finally {
    es(t), T(r.n);
  }
}
function Ne(s2, e) {
  return c.getWasmTableEntry(c.GOT.ffi_safe_eval.value)(L(s2), L(e));
}
var un = /* @__PURE__ */ new WeakMap();
function ns(s2, e) {
  return un.set(s2, e), s2;
}
function L(s2) {
  return Tt(s2) ? s2.ptr : s2;
}
function le(s2, e) {
  if (c._TYPEOF(s2.ptr) !== N[e]) throw new Error(`Unexpected object type "${s2.type()}" when expecting type "${e}"`);
}
function as(s2) {
  if (mr(s2)) return new (is(s2.type))(s2);
  if (s2 && typeof s2 == "object" && "type" in s2 && s2.type === "null") return new Pt();
  if (s2 === null) return new Y({ type: "logical", names: null, values: [null] });
  if (typeof s2 == "boolean") return new Y(s2);
  if (typeof s2 == "number") return new fe(s2);
  if (typeof s2 == "string") return new F(s2);
  if (Ce(s2)) return new Fe(s2);
  if (ArrayBuffer.isView(s2) || s2 instanceof ArrayBuffer) return new qe(s2);
  if (Array.isArray(s2)) return dn(s2);
  if (typeof s2 == "object") return ee.fromObject(s2);
  throw new Error("Robj construction for this JS object is not yet supported");
}
function dn(s2) {
  let e = { n: 0 };
  if (s2.every((r) => r && typeof r == "object" && !Tt(r) && !Ce(r))) {
    let r = s2, n = r.every((i) => Object.keys(i).filter((l) => !Object.keys(r[0]).includes(l)).length === 0 && Object.keys(r[0]).filter((l) => !Object.keys(i).includes(l)).length === 0), o = r.every((i) => Object.values(i).every((l) => cs(l) || ls(l)));
    if (n && o) return ee.fromD3(r);
  }
  if (s2.every((r) => typeof r == "boolean" || r === null)) return new Y(s2);
  if (s2.every((r) => typeof r == "number" || r === null)) return new fe(s2);
  if (s2.every((r) => typeof r == "string" || r === null)) return new F(s2);
  try {
    let r = new q([new U("c"), ...s2]);
    return w(r, e), r.eval();
  } finally {
    T(e.n);
  }
}
var x = class {
  constructor(e) {
    this.ptr = e;
  }
  type() {
    let e = c._TYPEOF(this.ptr);
    return Object.keys(N).find((r) => N[r] === e);
  }
};
var Re;
var vt;
var ae = class extends x {
  constructor(t) {
    if (!(t instanceof x)) return as(t);
    super(t.ptr);
    u(this, Re);
  }
  static wrap(t) {
    let r = c._TYPEOF(t), n = Object.keys(N)[Object.values(N).indexOf(r)];
    return new (is(n))(new x(t));
  }
  get [Symbol.toStringTag]() {
    return `RObject:${this.type()}`;
  }
  static getPersistentObject(t) {
    return k[t];
  }
  getPropertyValue(t) {
    return this[t];
  }
  inspect() {
    br(".Internal(inspect(x))", { x: this });
  }
  isNull() {
    return c._TYPEOF(this.ptr) === N.null;
  }
  isNa() {
    try {
      let t = br("is.na(x)", { x: this });
      return je(t), t.toBoolean();
    } finally {
      T(1);
    }
  }
  isUnbound() {
    return this.ptr === k.unboundValue.ptr;
  }
  attrs() {
    return ie.wrap(c._ATTRIB(this.ptr));
  }
  class() {
    let t = { n: 0 }, r = new q([new U("class"), this]);
    w(r, t);
    try {
      return r.eval();
    } finally {
      T(t.n);
    }
  }
  setNames(t) {
    let r;
    if (t === null) r = k.null;
    else if (Array.isArray(t) && t.every((n) => typeof n == "string" || n === null)) r = new F(t);
    else throw new Error("Argument to setNames must be null or an Array of strings or null");
    return c._Rf_setAttrib(this.ptr, k.namesSymbol.ptr, r.ptr), this;
  }
  names() {
    let t = F.wrap(c._Rf_getAttrib(this.ptr, k.namesSymbol.ptr));
    return t.isNull() ? null : t.toArray();
  }
  includes(t) {
    let r = this.names();
    return r && r.includes(t);
  }
  toJs(t = { depth: 0 }, r = 1) {
    throw new Error("This R object cannot be converted to JS");
  }
  subset(t) {
    return E(this, Re, vt).call(this, t, k.bracketSymbol.ptr);
  }
  get(t) {
    return E(this, Re, vt).call(this, t, k.bracket2Symbol.ptr);
  }
  getDollar(t) {
    return E(this, Re, vt).call(this, t, k.dollarSymbol.ptr);
  }
  pluck(...t) {
    let r = ts(k.null);
    try {
      let n = (i, l) => {
        let p2 = i.get(l);
        return ss(p2, r);
      }, o = t.reduce(n, this);
      return o.isNull() ? void 0 : o;
    } finally {
      rs(r);
    }
  }
  set(t, r) {
    let n = { n: 0 };
    try {
      let o = new ae(t);
      w(o, n);
      let i = new ae(r);
      w(i, n);
      let l = new U("[[<-"), p2 = c._Rf_lang4(l.ptr, this.ptr, o.ptr, i.ptr);
      return w(p2, n), ae.wrap(Ne(p2, k.baseEnv));
    } finally {
      T(n.n);
    }
  }
  static getMethods(t) {
    let r = /* @__PURE__ */ new Set(), n = t;
    do
      Object.getOwnPropertyNames(n).map((o) => r.add(o));
    while (n = Object.getPrototypeOf(n));
    return [...r.keys()].filter((o) => typeof t[o] == "function");
  }
};
var y = ae;
Re = /* @__PURE__ */ new WeakSet(), vt = function(t, r) {
  let n = { n: 0 };
  try {
    let o = new ae(t);
    w(o, n);
    let i = c._Rf_lang3(r, this.ptr, o.ptr);
    return w(i, n), ae.wrap(Ne(i, k.baseEnv));
  } finally {
    T(n.n);
  }
};
var Pt = class extends y {
  constructor() {
    return super(new x(c.getValue(c._R_NilValue, "*"))), this;
  }
  toJs() {
    return { type: "null" };
  }
};
var U = class extends y {
  constructor(e) {
    if (e instanceof x) {
      le(e, "symbol"), super(e);
      return;
    }
    let t = c.allocateUTF8(e);
    try {
      super(new x(c._Rf_install(t)));
    } finally {
      c._free(t);
    }
  }
  toJs() {
    let e = this.toObject();
    return { type: "symbol", printname: e.printname, symvalue: e.symvalue, internal: e.internal };
  }
  toObject() {
    return { printname: this.printname().isUnbound() ? null : this.printname().toString(), symvalue: this.symvalue().isUnbound() ? null : this.symvalue().ptr, internal: this.internal().isNull() ? null : this.internal().ptr };
  }
  toString() {
    return this.printname().toString();
  }
  printname() {
    return Je.wrap(c._PRINTNAME(this.ptr));
  }
  symvalue() {
    return y.wrap(c._SYMVALUE(this.ptr));
  }
  internal() {
    return y.wrap(c._INTERNAL(this.ptr));
  }
};
var ie = class extends y {
  constructor(e) {
    if (e instanceof x) return le(e, "pairlist"), super(e), this;
    let t = { n: 0 };
    try {
      let { names: r, values: n } = me(e), o = ie.wrap(c._Rf_allocList(n.length));
      w(o, t);
      for (let [i, l] = [0, o]; !l.isNull(); [i, l] = [i + 1, l.cdr()]) l.setcar(new y(n[i]));
      o.setNames(r), super(o);
    } finally {
      T(t.n);
    }
  }
  get length() {
    return this.toArray().length;
  }
  toArray(e = { depth: 1 }) {
    return this.toJs(e).values;
  }
  toObject({ allowDuplicateKey: e = true, allowEmptyKey: t = false, depth: r = -1 } = {}) {
    let n = this.entries({ depth: r }), o = n.map(([i]) => i);
    if (!e && new Set(o).size !== o.length) throw new Error("Duplicate key when converting pairlist without allowDuplicateKey enabled");
    if (!t && o.some((i) => !i)) throw new Error("Empty or null key when converting pairlist without allowEmptyKey enabled");
    return Object.fromEntries(n.filter((i, l) => n.findIndex((p2) => p2[0] === i[0]) === l));
  }
  entries(e = { depth: 1 }) {
    let t = this.toJs(e);
    return t.values.map((r, n) => [t.names ? t.names[n] : null, r]);
  }
  toJs(e = { depth: 0 }, t = 1) {
    let r = [], n = false, o = [];
    for (let l = this; !l.isNull(); l = l.cdr()) {
      let p2 = l.tag();
      p2.isNull() ? r.push("") : (n = true, r.push(p2.toString())), e.depth && t >= e.depth ? o.push(l.car()) : o.push(l.car().toJs(e, t + 1));
    }
    return { type: "pairlist", names: n ? r : null, values: o };
  }
  includes(e) {
    return e in this.toObject();
  }
  setcar(e) {
    c._SETCAR(this.ptr, e.ptr);
  }
  car() {
    return y.wrap(c._CAR(this.ptr));
  }
  cdr() {
    return y.wrap(c._CDR(this.ptr));
  }
  tag() {
    return y.wrap(c._TAG(this.ptr));
  }
};
var q = class extends y {
  constructor(e) {
    if (e instanceof x) return le(e, "call"), super(e), this;
    let t = { n: 0 };
    try {
      let { values: r } = me(e), n = r.map((i) => w(new y(i), t)), o = q.wrap(c._Rf_allocVector(N.call, r.length));
      w(o, t);
      for (let [i, l] = [0, o]; !l.isNull(); [i, l] = [i + 1, l.cdr()]) l.setcar(n[i]);
      super(o);
    } finally {
      T(t.n);
    }
  }
  setcar(e) {
    c._SETCAR(this.ptr, e.ptr);
  }
  car() {
    return y.wrap(c._CAR(this.ptr));
  }
  cdr() {
    return y.wrap(c._CDR(this.ptr));
  }
  eval() {
    return c.webr.evalR(this, { env: k.baseEnv });
  }
  capture(e = {}) {
    return c.webr.captureR(this, e);
  }
  deparse() {
    let e = { n: 0 };
    try {
      let t = c._Rf_lang2(new U("deparse1").ptr, c._Rf_lang2(new U("quote").ptr, this.ptr));
      w(t, e);
      let r = F.wrap(Ne(t, k.baseEnv));
      return w(r, e), r.toString();
    } finally {
      T(e.n);
    }
  }
};
var Ve = class extends y {
  constructor(e, t = null) {
    if (e instanceof x) {
      if (le(e, "list"), super(e), t) {
        if (t.length !== this.length) throw new Error("Can't construct named `RList`. Supplied `names` must be the same length as the list.");
        this.setNames(t);
      }
      return this;
    }
    let r = { n: 0 };
    try {
      let n = me(e), o = c._Rf_allocVector(N.list, n.values.length);
      w(o, r), n.values.forEach((l, p2) => {
        c._SET_VECTOR_ELT(o, p2, new y(l).ptr);
      });
      let i = t || n.names;
      if (i && i.length !== n.values.length) throw new Error("Can't construct named `RList`. Supplied `names` must be the same length as the list.");
      y.wrap(o).setNames(i), super(new x(o));
    } finally {
      T(r.n);
    }
  }
  get length() {
    return c._LENGTH(this.ptr);
  }
  isDataFrame() {
    let e = ie.wrap(c._ATTRIB(this.ptr)).get("class");
    return !e.isNull() && e.toArray().includes("data.frame");
  }
  toArray(e = { depth: 1 }) {
    return this.toJs(e).values;
  }
  toObject({ allowDuplicateKey: e = true, allowEmptyKey: t = false, depth: r = -1 } = {}) {
    let n = this.entries({ depth: r }), o = n.map(([i]) => i);
    if (!e && new Set(o).size !== o.length) throw new Error("Duplicate key when converting list without allowDuplicateKey enabled");
    if (!t && o.some((i) => !i)) throw new Error("Empty or null key when converting list without allowEmptyKey enabled");
    return Object.fromEntries(n.filter((i, l) => n.findIndex((p2) => p2[0] === i[0]) === l));
  }
  toD3() {
    if (!this.isDataFrame()) throw new Error("Can't convert R list object to D3 format. Object must be of class 'data.frame'.");
    return this.entries().reduce((t, r) => (r[1].forEach((n, o) => t[o] = Object.assign(t[o] || {}, { [r[0]]: n })), t), []);
  }
  entries(e = { depth: -1 }) {
    let t = this.toJs(e);
    return this.isDataFrame() && e.depth < 0 && (t.values = t.values.map((r) => r.toArray())), t.values.map((r, n) => [t.names ? t.names[n] : null, r]);
  }
  toJs(e = { depth: 0 }, t = 1) {
    return { type: "list", names: this.names(), values: [...Array(this.length).keys()].map((r) => e.depth && t >= e.depth ? this.get(r + 1) : this.get(r + 1).toJs(e, t + 1)) };
  }
};
var ee = class extends Ve {
  constructor(e) {
    if (e instanceof x) {
      if (super(e), !this.isDataFrame()) throw new Error("Can't construct `RDataFrame`. Supplied R object is not a `data.frame`.");
      return this;
    }
    return ee.fromObject(e);
  }
  static fromObject(e) {
    let { names: t, values: r } = me(e), n = { n: 0 };
    try {
      let o = !!t && t.length > 0 && t.every((l) => l), i = r.length > 0 && r.every((l) => Array.isArray(l) || ArrayBuffer.isView(l) || l instanceof ArrayBuffer);
      if (o && i) {
        let l = r, p2 = l.every((b2) => b2.length === l[0].length), D2 = l.every((b2) => cs(b2[0]) || ls(b2[0]));
        if (p2 && D2) {
          let b2 = new Ve({ type: "list", names: t, values: l.map((rn) => as(rn)) });
          w(b2, n);
          let j2 = new q([new U("as.data.frame"), b2]);
          return w(j2, n), new ee(j2.eval());
        }
      }
    } finally {
      T(n.n);
    }
    throw new Error("Can't construct `data.frame`. Source object is not eligible.");
  }
  static fromD3(e) {
    return this.fromObject(Object.fromEntries(Object.keys(e[0]).map((t) => [t, e.map((r) => r[t])])));
  }
};
var ye = class extends y {
  exec(...e) {
    let t = { n: 0 };
    try {
      let r = new q([this, ...e]);
      return w(r, t), r.eval();
    } finally {
      T(t.n);
    }
  }
  capture(e = {}, ...t) {
    let r = { n: 0 };
    try {
      let n = new q([this, ...t]);
      return w(n, r), n.capture(e);
    } finally {
      T(r.n);
    }
  }
};
var Je = class extends y {
  constructor(e) {
    if (e instanceof x) {
      le(e, "string"), super(e);
      return;
    }
    let t = c.allocateUTF8(e);
    try {
      super(new x(c._Rf_mkChar(t)));
    } finally {
      c._free(t);
    }
  }
  toString() {
    return c.UTF8ToString(c._R_CHAR(this.ptr));
  }
  toJs() {
    return { type: "string", value: this.toString() };
  }
};
var Be = class extends y {
  constructor(e = {}) {
    if (e instanceof x) return le(e, "environment"), super(e), this;
    let t = 0;
    try {
      let { names: r, values: n } = me(e), o = je(c._R_NewEnv(k.globalEnv.ptr, 0, 0));
      ++t, n.forEach((i, l) => {
        let p2 = r ? r[l] : null;
        if (!p2) throw new Error("Can't create object in new environment with empty symbol name");
        let D2 = new U(p2), b2 = je(new y(i));
        try {
          gr(o, D2, b2);
        } finally {
          T(1);
        }
      }), super(new x(o));
    } finally {
      T(t);
    }
  }
  ls(e = false, t = true) {
    return F.wrap(c._R_lsInternal3(this.ptr, Number(e), Number(t))).toArray();
  }
  bind(e, t) {
    let r = new U(e), n = je(new y(t));
    try {
      gr(this, r, n);
    } finally {
      T(1);
    }
  }
  names() {
    return this.ls(true, true);
  }
  frame() {
    return y.wrap(c._FRAME(this.ptr));
  }
  subset(e) {
    if (typeof e == "number") throw new Error("Object of type environment is not subsettable");
    return this.getDollar(e);
  }
  toObject({ depth: e = -1 } = {}) {
    let t = this.names();
    return Object.fromEntries([...Array(t.length).keys()].map((r) => {
      let n = this.getDollar(t[r]);
      return [t[r], e < 0 ? n : n.toJs({ depth: e })];
    }));
  }
  toJs(e = { depth: 0 }, t = 1) {
    let r = this.names(), n = [...Array(r.length).keys()].map((o) => e.depth && t >= e.depth ? this.getDollar(r[o]) : this.getDollar(r[o]).toJs(e, t + 1));
    return { type: "environment", names: r, values: n };
  }
};
var te = class extends y {
  constructor(e, t, r) {
    if (e instanceof x) return le(e, t), super(e), this;
    let n = { n: 0 };
    try {
      let { names: o, values: i } = me(e), l = c._Rf_allocVector(N[t], i.length);
      w(l, n), i.forEach(r(l)), y.wrap(l).setNames(o), super(new x(l));
    } finally {
      T(n.n);
    }
  }
  get length() {
    return c._LENGTH(this.ptr);
  }
  get(e) {
    return super.get(e);
  }
  subset(e) {
    return super.subset(e);
  }
  getDollar() {
    throw new Error("$ operator is invalid for atomic vectors");
  }
  detectMissing() {
    let e = { n: 0 };
    try {
      let t = c._Rf_lang2(new U("is.na").ptr, this.ptr);
      w(t, e);
      let r = Y.wrap(Ne(t, k.baseEnv));
      w(r, e);
      let n = r.toTypedArray();
      return Array.from(n).map((o) => !!o);
    } finally {
      T(e.n);
    }
  }
  toArray() {
    let e = this.toTypedArray();
    return this.detectMissing().map((t, r) => t ? null : e[r]);
  }
  toObject({ allowDuplicateKey: e = true, allowEmptyKey: t = false } = {}) {
    let r = this.entries(), n = r.map(([o]) => o);
    if (!e && new Set(n).size !== n.length) throw new Error("Duplicate key when converting atomic vector without allowDuplicateKey enabled");
    if (!t && n.some((o) => !o)) throw new Error("Empty or null key when converting atomic vector without allowEmptyKey enabled");
    return Object.fromEntries(r.filter((o, i) => r.findIndex((l) => l[0] === o[0]) === i));
  }
  entries() {
    let e = this.toArray(), t = this.names();
    return e.map((r, n) => [t ? t[n] : null, r]);
  }
  toJs() {
    return { type: this.type(), names: this.names(), values: this.toArray() };
  }
};
var _t;
var wr = class extends te {
  constructor(e) {
    super(e, "logical", a(wr, _t));
  }
  getBoolean(e) {
    return this.get(e).toArray()[0];
  }
  toBoolean() {
    if (this.length !== 1) throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    let e = this.getBoolean(1);
    if (e === null) throw new Error("Can't convert missing value `NA` to a JS boolean");
    return e;
  }
  toTypedArray() {
    return new Int32Array(c.HEAP32.subarray(c._LOGICAL(this.ptr) / 4, c._LOGICAL(this.ptr) / 4 + this.length));
  }
  toArray() {
    let e = this.toTypedArray();
    return this.detectMissing().map((t, r) => t ? null : !!e[r]);
  }
};
var Y = wr;
_t = /* @__PURE__ */ new WeakMap(), u(Y, _t, (e) => {
  let t = c._LOGICAL(e), r = c.getValue(c._R_NaInt, "i32");
  return (n, o) => {
    c.setValue(t + 4 * o, n === null ? r : !!n, "i32");
  };
});
var St;
var xr = class extends te {
  constructor(e) {
    super(e, "integer", a(xr, St));
  }
  getNumber(e) {
    return this.get(e).toArray()[0];
  }
  toNumber() {
    if (this.length !== 1) throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    let e = this.getNumber(1);
    if (e === null) throw new Error("Can't convert missing value `NA` to a JS number");
    return e;
  }
  toTypedArray() {
    return new Int32Array(c.HEAP32.subarray(c._INTEGER(this.ptr) / 4, c._INTEGER(this.ptr) / 4 + this.length));
  }
};
var Et = xr;
St = /* @__PURE__ */ new WeakMap(), u(Et, St, (e) => {
  let t = c._INTEGER(e), r = c.getValue(c._R_NaInt, "i32");
  return (n, o) => {
    c.setValue(t + 4 * o, n === null ? r : Math.round(Number(n)), "i32");
  };
});
var kt;
var vr = class extends te {
  constructor(e) {
    super(e, "double", a(vr, kt));
  }
  getNumber(e) {
    return this.get(e).toArray()[0];
  }
  toNumber() {
    if (this.length !== 1) throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    let e = this.getNumber(1);
    if (e === null) throw new Error("Can't convert missing value `NA` to a JS number");
    return e;
  }
  toTypedArray() {
    return new Float64Array(c.HEAPF64.subarray(c._REAL(this.ptr) / 8, c._REAL(this.ptr) / 8 + this.length));
  }
};
var fe = vr;
kt = /* @__PURE__ */ new WeakMap(), u(fe, kt, (e) => {
  let t = c._REAL(e), r = c.getValue(c._R_NaReal, "double");
  return (n, o) => {
    c.setValue(t + 8 * o, n === null ? r : n, "double");
  };
});
var Mt;
var Er = class extends te {
  constructor(e) {
    super(e, "complex", a(Er, Mt));
  }
  getComplex(e) {
    return this.get(e).toArray()[0];
  }
  toComplex() {
    if (this.length !== 1) throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    let e = this.getComplex(1);
    if (e === null) throw new Error("Can't convert missing value `NA` to a JS object");
    return e;
  }
  toTypedArray() {
    return new Float64Array(c.HEAPF64.subarray(c._COMPLEX(this.ptr) / 8, c._COMPLEX(this.ptr) / 8 + 2 * this.length));
  }
  toArray() {
    let e = this.toTypedArray();
    return this.detectMissing().map((t, r) => t ? null : { re: e[2 * r], im: e[2 * r + 1] });
  }
};
var Fe = Er;
Mt = /* @__PURE__ */ new WeakMap(), u(Fe, Mt, (e) => {
  let t = c._COMPLEX(e), r = c.getValue(c._R_NaReal, "double");
  return (n, o) => {
    c.setValue(t + 8 * (2 * o), n === null ? r : n.re, "double"), c.setValue(t + 8 * (2 * o + 1), n === null ? r : n.im, "double");
  };
});
var Dt;
var Pr = class extends te {
  constructor(e) {
    super(e, "character", a(Pr, Dt));
  }
  getString(e) {
    return this.get(e).toArray()[0];
  }
  toString() {
    if (this.length !== 1) throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    let e = this.getString(1);
    if (e === null) throw new Error("Can't convert missing value `NA` to a JS string");
    return e;
  }
  toTypedArray() {
    return new Uint32Array(c.HEAPU32.subarray(c._STRING_PTR(this.ptr) / 4, c._STRING_PTR(this.ptr) / 4 + this.length));
  }
  toArray() {
    return this.detectMissing().map((e, t) => e ? null : c.UTF8ToString(c._R_CHAR(c._STRING_ELT(this.ptr, t))));
  }
};
var F = Pr;
Dt = /* @__PURE__ */ new WeakMap(), u(F, Dt, (e) => (t, r) => {
  t === null ? c._SET_STRING_ELT(e, r, k.naString.ptr) : c._SET_STRING_ELT(e, r, new Je(t).ptr);
});
var Wt;
var Tr = class extends te {
  constructor(e) {
    e instanceof ArrayBuffer && (e = new Uint8Array(e)), super(e, "raw", a(Tr, Wt));
  }
  getNumber(e) {
    return this.get(e).toArray()[0];
  }
  toNumber() {
    if (this.length !== 1) throw new Error("Can't convert atomic vector of length > 1 to a scalar JS value");
    let e = this.getNumber(1);
    if (e === null) throw new Error("Can't convert missing value `NA` to a JS number");
    return e;
  }
  toTypedArray() {
    return new Uint8Array(c.HEAPU8.subarray(c._RAW(this.ptr), c._RAW(this.ptr) + this.length));
  }
};
var qe = Tr;
Wt = /* @__PURE__ */ new WeakMap(), u(qe, Wt, (e) => {
  let t = c._RAW(e);
  return (r, n) => {
    c.setValue(t + n, Number(r), "i8");
  };
});
function me(s2) {
  return mr(s2) ? s2 : Array.isArray(s2) || ArrayBuffer.isView(s2) ? { names: null, values: s2 } : s2 && typeof s2 == "object" && !Ce(s2) ? { names: Object.keys(s2), values: Object.values(s2) } : { names: null, values: [s2] };
}
function is(s2) {
  let e = { object: y, null: Pt, symbol: U, pairlist: ie, closure: ye, environment: Be, call: q, special: ye, builtin: ye, string: Je, logical: Y, integer: Et, double: fe, complex: Fe, character: F, list: Ve, raw: qe, function: ye, dataframe: ee };
  return s2 in e ? e[s2] : y;
}
function Tt(s2) {
  return s2 instanceof y;
}
function ls(s2) {
  let e = ["logical", "integer", "double", "complex", "character"];
  return Tt(s2) && e.includes(s2.type()) || Tt(s2) && s2.isNa();
}
function cs(s2) {
  return s2 === null || typeof s2 == "number" || typeof s2 == "boolean" || typeof s2 == "string" || Ce(s2);
}
var k;
var Os = oe(zt());
var no = new TextEncoder();
var X;
var G;
var Ke;
var Jr;
X = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakSet(), Jr = function() {
  a(this, X).push(new Promise((e) => {
    a(this, G).push(e);
  }));
};
function Qe(s2, e, t) {
  return Us({ type: "response", data: { uuid: s2, resp: e } }, t);
}
function Us(s2, e) {
  return e && ns(s2, e), s2;
}
var Te;
var Ze;
Te = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap();
var Bs = oe(zt());
var lo = new TextDecoder("utf-8");
var _e;
var Se;
var Ye;
var et;
var ke;
_e = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ new WeakMap(), et = /* @__PURE__ */ new WeakMap(), ke = /* @__PURE__ */ new WeakMap();
var zr = new Int32Array(new ArrayBuffer(4));
m && (globalThis.Worker = B("worker_threads").Worker);
var Me;
var Zt;
var Vs;
var rt;
Me = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ new WeakSet(), Vs = function(t) {
  m ? (t.on("message", (r) => {
    a(this, rt).call(this, t, r);
  }), t.on("error", (r) => {
    console.error(r), this.reject(new A("An error occurred initialising the webR SharedBufferChannel worker."));
  })) : (t.onmessage = (r) => a(this, rt).call(this, t, r.data), t.onerror = (r) => {
    console.error(r), this.reject(new A("An error occurred initialising the webR SharedBufferChannel worker."));
  });
}, rt = /* @__PURE__ */ new WeakMap();
var ue;
var st;
var pe;
var nt;
ue = /* @__PURE__ */ new WeakMap(), st = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), nt = /* @__PURE__ */ new WeakMap();
var sr = oe(zt());
m && (globalThis.Worker = B("worker_threads").Worker);
var De;
var de;
var We;
var er;
var Js;
var tr;
var Hs;
var rr;
var zs;
var ot;
De = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakMap(), We = /* @__PURE__ */ new WeakMap(), er = /* @__PURE__ */ new WeakSet(), Js = async function(t) {
  d(this, de, await navigator.serviceWorker.register(t)), await navigator.serviceWorker.ready, window.addEventListener("beforeunload", () => {
    var n;
    (n = a(this, de)) == null || n.unregister();
  });
  let r = await new Promise((n) => {
    navigator.serviceWorker.addEventListener("message", function o(i) {
      i.data.type === "registration-successful" && (navigator.serviceWorker.removeEventListener("message", o), n(i.data.clientId));
    }), this.activeRegistration().postMessage({ type: "register-client-main" });
  });
  return navigator.serviceWorker.addEventListener("message", (n) => {
    E(this, tr, Hs).call(this, n);
  }), r;
}, tr = /* @__PURE__ */ new WeakSet(), Hs = async function(t) {
  if (t.data.type === "request") {
    let r = t.data.data, n = a(this, De).get(r);
    if (!n) throw new P("Request not found during service worker XHR request");
    switch (a(this, De).delete(r), n.type) {
      case "read": {
        let o = await this.inputQueue.get();
        this.activeRegistration().postMessage({ type: "wasm-webr-fetch-response", uuid: r, response: Qe(r, o) });
        break;
      }
      case "interrupt": {
        let o = a(this, We);
        this.activeRegistration().postMessage({ type: "wasm-webr-fetch-response", uuid: r, response: Qe(r, o) }), this.inputQueue.reset(), d(this, We, false);
        break;
      }
      default:
        throw new P(`Unsupported request type '${n.type}'.`);
    }
    return;
  }
}, rr = /* @__PURE__ */ new WeakSet(), zs = function(t) {
  m ? (t.on("message", (r) => {
    a(this, ot).call(this, t, r);
  }), t.on("error", (r) => {
    console.error(r), this.reject(new A("An error occurred initialising the webR ServiceWorkerChannel worker."));
  })) : (t.onmessage = (r) => a(this, ot).call(this, t, r.data), t.onerror = (r) => {
    console.error(r), this.reject(new A("An error occurred initialising the webR ServiceWorkerChannel worker."));
  });
}, ot = /* @__PURE__ */ new WeakMap();
var Ae;
var at;
var it;
var lt;
var ct;
var ut;
Ae = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap(), it = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakMap(), ct = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakMap();
m && (globalThis.Worker = B("worker_threads").Worker);
var Oe;
var nr;
var Xs;
var dt;
Oe = /* @__PURE__ */ new WeakMap(), nr = /* @__PURE__ */ new WeakSet(), Xs = function(t) {
  m ? (t.on("message", (r) => {
    a(this, dt).call(this, t, r);
  }), t.on("error", (r) => {
    console.error(r), this.reject(new A("An error occurred initialising the webR PostMessageChannel worker."));
  })) : (t.onmessage = (r) => a(this, dt).call(this, t, r.data), t.onerror = (r) => {
    console.error(r), this.reject(new A("An error occurred initialising the webR PostMessageChannel worker."));
  });
}, dt = /* @__PURE__ */ new WeakMap();
var Ie;
var Ue;
var ht;
var he;
var or;
Ie = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), or = /* @__PURE__ */ new WeakMap();
var O = { Automatic: 0, SharedArrayBuffer: 1, ServiceWorker: 2, PostMessage: 3 };
var $s = m ? __dirname + "/" : "https://webr.r-wasm.org/v0.4.2/";
var Ks = "https://repo.r-wasm.org";
var Kr = "0.4.2";
var yt;
var ft;
var Rt;
var mt;
var gt;
var ar;
var ir;
var lr;
var cr;
var ur;
var pr;
var Ys;
yt = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), mt = /* @__PURE__ */ new WeakMap(), gt = /* @__PURE__ */ new WeakMap(), ar = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap(), lr = /* @__PURE__ */ new WeakMap(), cr = /* @__PURE__ */ new WeakMap(), ur = /* @__PURE__ */ new WeakMap(), pr = /* @__PURE__ */ new WeakSet(), Ys = async function() {
  for (; ; ) {
    let e = await this.webR.read();
    switch (e.type) {
      case "stdout":
        a(this, yt).call(this, e.data);
        break;
      case "stderr":
        a(this, ft).call(this, e.data);
        break;
      case "prompt":
        a(this, Rt).call(this, e.data);
        break;
      case "canvas":
        e.data.event === "canvasImage" ? a(this, mt).call(this, e.data.image) : e.data.event === "canvasNewPage" && a(this, gt).call(this);
        break;
      case "closed":
        return;
      default:
        console.warn(`Unhandled output type for webR Console: ${e.type}.`);
    }
  }
};
var yo = { FONTCONFIG_PATH: "/etc/fonts", R_HOME: "/usr/lib/R", R_ENABLE_JIT: "0", WEBR: "1", WEBR_VERSION: Kr };
var en = { RArgs: [], REnv: yo, baseUrl: $s, serviceWorkerUrl: "", repoUrl: Ks, homedir: "/home/web_user", interactive: true, channelType: O.Automatic, createLazyFilesystem: true };
var R;
var bt;
var yr;
var tn;
R = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), yr = /* @__PURE__ */ new WeakSet(), tn = async function() {
  for (; ; ) {
    let e = await a(this, R).readSystem();
    switch (e.type) {
      case "setTimeoutWasm":
        setTimeout((t, r) => {
          this.invokeWasmFunction(t, ...r);
        }, e.data.delay, e.data.ptr, e.data.args);
        break;
      case "console.log":
        console.log(e.data);
        break;
      case "console.warn":
        console.warn(e.data);
        break;
      case "console.error":
        console.error(e.data);
        break;
      case "close":
        a(this, R).close();
        break;
      default:
        throw new I("Unknown system message type `" + e.type + "`");
    }
  }
};
var g;
var f;
var wt;
g = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ new WeakMap();

// src/messageporthttp.ts
async function makeRequest(scope, appName, clientPort, pyodide2) {
  const asgiFunc = pyodide2.runPython(
    `_shiny_app_registry["${appName}"].app.call_pyodide`
  );
  await connect(scope, clientPort, asgiFunc);
}
async function connect(scope, clientPort, asgiFunc) {
  const fromClientQueue = new AwaitableQueue();
  clientPort.addEventListener("message", (event) => {
    if (event.data.type === "http.request") {
      fromClientQueue.enqueue({
        type: "http.request",
        body: event.data.body,
        more_body: event.data.more_body
      });
    }
  });
  clientPort.start();
  async function fromClient() {
    return fromClientQueue.dequeue();
  }
  async function toClient(event) {
    event = Object.fromEntries(event.toJs());
    if (event.type === "http.response.start") {
      clientPort.postMessage({
        type: event.type,
        status: event.status,
        headers: asgiHeadersToRecord(event.headers)
      });
    } else if (event.type === "http.response.body") {
      clientPort.postMessage({
        type: event.type,
        body: asgiBodyToArray(event.body),
        more_body: event.more_body
      });
    } else {
      throw new Error(`Unhandled ASGI event: ${event.type}`);
    }
  }
  await asgiFunc(scope, fromClient, toClient);
}
function asgiHeadersToRecord(headers) {
  headers = headers.map(([key, val]) => {
    return [uint8ArrayToString(key), uint8ArrayToString(val)];
  });
  return Object.fromEntries(headers);
}
function asgiBodyToArray(body) {
  return body;
}

// src/messageportwebsocket.ts
var MessagePortWebSocket = class extends EventTarget {
  constructor(port) {
    super();
    this.readyState = 0;
    this.addEventListener("open", (e) => {
      if (this.onopen) {
        this.onopen(e);
      }
    });
    this.addEventListener("message", (e) => {
      if (this.onmessage) {
        this.onmessage(e);
      }
    });
    this.addEventListener("error", (e) => {
      if (this.onerror) {
        this.onerror(e);
      }
    });
    this.addEventListener("close", (e) => {
      if (this.onclose) {
        this.onclose(e);
      }
    });
    this._port = port;
    port.addEventListener("message", this._onMessage.bind(this));
    port.start();
  }
  // Call on the server side of the connection, to tell the client that
  // the connection has been established.
  accept() {
    if (this.readyState !== 0) {
      return;
    }
    this.readyState = 1;
    this._port.postMessage({ type: "open" });
  }
  send(data) {
    if (this.readyState === 0) {
      throw new DOMException(
        "Can't send messages while WebSocket is in CONNECTING state",
        "InvalidStateError"
      );
    }
    if (this.readyState > 1) {
      return;
    }
    this._port.postMessage({ type: "message", value: { data } });
  }
  close(code, reason) {
    if (this.readyState > 1) {
      return;
    }
    this.readyState = 2;
    this._port.postMessage({ type: "close", value: { code, reason } });
    this.readyState = 3;
    this.dispatchEvent(new CloseEvent("close", { code, reason }));
  }
  _onMessage(e) {
    const event = e.data;
    switch (event.type) {
      case "open":
        if (this.readyState === 0) {
          this.readyState = 1;
          this.dispatchEvent(new Event("open"));
          return;
        }
        break;
      case "message":
        if (this.readyState === 1) {
          this.dispatchEvent(new MessageEvent("message", { ...event.value }));
          return;
        }
        break;
      case "close":
        if (this.readyState < 3) {
          this.readyState = 3;
          this.dispatchEvent(new CloseEvent("close", { ...event.value }));
          return;
        }
        break;
    }
    this._reportError(
      `Unexpected event '${event.type}' while in readyState ${this.readyState}`,
      1002
    );
  }
  _reportError(message, code) {
    this.dispatchEvent(new ErrorEvent("error", { message }));
    if (typeof code === "number") {
      this.close(code, message);
    }
  }
};

// src/messageportwebsocket-channel.ts
async function openChannel(path, appName, clientPort, pyodide2) {
  const conn = new MessagePortWebSocket(clientPort);
  const asgiFunc = pyodide2.runPython(
    `_shiny_app_registry["${appName}"].app.call_pyodide`
  );
  await connect2(path, conn, asgiFunc);
}
async function connect2(path, conn, asgiFunc) {
  const scope = {
    type: "websocket",
    asgi: {
      version: "3.0",
      spec_version: "2.1"
    },
    path,
    headers: []
  };
  const fromClientQueue = new AwaitableQueue();
  fromClientQueue.enqueue({ type: "websocket.connect" });
  async function fromClient() {
    return await fromClientQueue.dequeue();
  }
  async function toClient(event) {
    event = Object.fromEntries(event.toJs());
    if (event.type === "websocket.accept") {
      conn.accept();
    } else if (event.type === "websocket.send") {
      conn.send(event.text ?? event.bytes);
    } else if (event.type === "websocket.close") {
      conn.close(event.code, event.reason);
      fromClientQueue.enqueue({ type: "websocket.disconnect" });
    } else {
      conn.close(1002, "ASGI protocol error");
      throw new Error(`Unhandled ASGI event: ${event.type}`);
    }
  }
  conn.addEventListener("message", (e) => {
    const me3 = e;
    const event = { type: "websocket.receive" };
    if (typeof me3.data === "string") {
      event.text = me3.data;
    } else {
      event.bytes = me3.data;
    }
    fromClientQueue.enqueue(event);
  });
  conn.addEventListener("close", (e) => {
    const ce2 = e;
    fromClientQueue.enqueue({ type: "websocket.disconnect", code: ce2.code });
  });
  conn.addEventListener("error", (e) => {
    console.error(e);
  });
  await asgiFunc(scope, fromClient, toClient);
}

// src/postable-error.ts
function errorToPostableErrorObject(e) {
  const errObj = {
    message: "An unknown error occured",
    name: e.name
  };
  if (!(e instanceof Error)) {
    return errObj;
  }
  errObj.message = e.message;
  if (e.stack) {
    errObj.stack = e.stack;
  }
  return errObj;
}

// src/pyodide/pyodide.js
var Q = Object.defineProperty;
var s = (e, t) => Q(e, "name", { value: t, configurable: true });
var I2 = ((e) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(e, { get: (t, o) => (typeof __require < "u" ? __require : t)[o] }) : e)(function(e) {
  if (typeof __require < "u") return __require.apply(this, arguments);
  throw new Error('Dynamic require of "' + e + '" is not supported');
});
function Z(e) {
  return !isNaN(parseFloat(e)) && isFinite(e);
}
s(Z, "_isNumber");
function E2(e) {
  return e.charAt(0).toUpperCase() + e.substring(1);
}
s(E2, "_capitalize");
function k2(e) {
  return function() {
    return this[e];
  };
}
s(k2, "_getter");
var w2 = ["isConstructor", "isEval", "isNative", "isToplevel"];
var N2 = ["columnNumber", "lineNumber"];
var _ = ["fileName", "functionName", "source"];
var ee2 = ["args"];
var te2 = ["evalOrigin"];
var O2 = w2.concat(N2, _, ee2, te2);
function p(e) {
  if (e) for (var t = 0; t < O2.length; t++) e[O2[t]] !== void 0 && this["set" + E2(O2[t])](e[O2[t]]);
}
s(p, "StackFrame");
p.prototype = { getArgs: function() {
  return this.args;
}, setArgs: function(e) {
  if (Object.prototype.toString.call(e) !== "[object Array]") throw new TypeError("Args must be an Array");
  this.args = e;
}, getEvalOrigin: function() {
  return this.evalOrigin;
}, setEvalOrigin: function(e) {
  if (e instanceof p) this.evalOrigin = e;
  else if (e instanceof Object) this.evalOrigin = new p(e);
  else throw new TypeError("Eval Origin must be an Object or StackFrame");
}, toString: function() {
  var e = this.getFileName() || "", t = this.getLineNumber() || "", o = this.getColumnNumber() || "", r = this.getFunctionName() || "";
  return this.getIsEval() ? e ? "[eval] (" + e + ":" + t + ":" + o + ")" : "[eval]:" + t + ":" + o : r ? r + " (" + e + ":" + t + ":" + o + ")" : e + ":" + t + ":" + o;
} };
p.fromString = s(function(t) {
  var o = t.indexOf("("), r = t.lastIndexOf(")"), a2 = t.substring(0, o), n = t.substring(o + 1, r).split(","), i = t.substring(r + 1);
  if (i.indexOf("@") === 0) var c2 = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(i, ""), l = c2[1], d2 = c2[2], u2 = c2[3];
  return new p({ functionName: a2, args: n || void 0, fileName: l, lineNumber: d2 || void 0, columnNumber: u2 || void 0 });
}, "StackFrame$$fromString");
for (b = 0; b < w2.length; b++) p.prototype["get" + E2(w2[b])] = k2(w2[b]), p.prototype["set" + E2(w2[b])] = /* @__PURE__ */ function(e) {
  return function(t) {
    this[e] = !!t;
  };
}(w2[b]);
var b;
for (v = 0; v < N2.length; v++) p.prototype["get" + E2(N2[v])] = k2(N2[v]), p.prototype["set" + E2(N2[v])] = /* @__PURE__ */ function(e) {
  return function(t) {
    if (!Z(t)) throw new TypeError(e + " must be a Number");
    this[e] = Number(t);
  };
}(N2[v]);
var v;
for (h = 0; h < _.length; h++) p.prototype["get" + E2(_[h])] = k2(_[h]), p.prototype["set" + E2(_[h])] = /* @__PURE__ */ function(e) {
  return function(t) {
    this[e] = String(t);
  };
}(_[h]);
var h;
var x2 = p;
function ne() {
  var e = /^\s*at .*(\S+:\d+|\(native\))/m, t = /^(eval@)?(\[native code])?$/;
  return { parse: s(function(r) {
    if (r.stack && r.stack.match(e)) return this.parseV8OrIE(r);
    if (r.stack) return this.parseFFOrSafari(r);
    throw new Error("Cannot parse given Error object");
  }, "ErrorStackParser$$parse"), extractLocation: s(function(r) {
    if (r.indexOf(":") === -1) return [r];
    var a2 = /(.+?)(?::(\d+))?(?::(\d+))?$/, n = a2.exec(r.replace(/[()]/g, ""));
    return [n[1], n[2] || void 0, n[3] || void 0];
  }, "ErrorStackParser$$extractLocation"), parseV8OrIE: s(function(r) {
    var a2 = r.stack.split(`
`).filter(function(n) {
      return !!n.match(e);
    }, this);
    return a2.map(function(n) {
      n.indexOf("(eval ") > -1 && (n = n.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, ""));
      var i = n.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, ""), c2 = i.match(/ (\(.+\)$)/);
      i = c2 ? i.replace(c2[0], "") : i;
      var l = this.extractLocation(c2 ? c2[1] : i), d2 = c2 && i || void 0, u2 = ["eval", "<anonymous>"].indexOf(l[0]) > -1 ? void 0 : l[0];
      return new x2({ functionName: d2, fileName: u2, lineNumber: l[1], columnNumber: l[2], source: n });
    }, this);
  }, "ErrorStackParser$$parseV8OrIE"), parseFFOrSafari: s(function(r) {
    var a2 = r.stack.split(`
`).filter(function(n) {
      return !n.match(t);
    }, this);
    return a2.map(function(n) {
      if (n.indexOf(" > eval") > -1 && (n = n.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1")), n.indexOf("@") === -1 && n.indexOf(":") === -1) return new x2({ functionName: n });
      var i = /((.*".+"[^@]*)?[^@]*)(?:@)/, c2 = n.match(i), l = c2 && c2[1] ? c2[1] : void 0, d2 = this.extractLocation(n.replace(i, ""));
      return new x2({ functionName: l, fileName: d2[0], lineNumber: d2[1], columnNumber: d2[2], source: n });
    }, this);
  }, "ErrorStackParser$$parseFFOrSafari") };
}
s(ne, "ErrorStackParser");
var re = new ne();
var C = re;
var g2 = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && !process.browser;
var A2 = g2 && typeof module < "u" && typeof module.exports < "u" && typeof I2 < "u" && typeof __dirname < "u";
var W = g2 && !A2;
var Ne2 = typeof globalThis.Bun < "u";
var ie2 = typeof Deno < "u";
var B2 = !g2 && !ie2;
var $ = B2 && typeof window == "object" && typeof document == "object" && typeof document.createElement == "function" && "sessionStorage" in window && typeof importScripts != "function";
var j = B2 && typeof importScripts == "function" && typeof self == "object";
var _e2 = typeof navigator == "object" && typeof navigator.userAgent == "string" && navigator.userAgent.indexOf("Chrome") == -1 && navigator.userAgent.indexOf("Safari") > -1;
var z;
var D;
var V;
var H;
var L2;
async function T2() {
  if (!g2 || (z = (await import("node:url")).default, H = await import("node:fs"), L2 = await import("node:fs/promises"), V = (await import("node:vm")).default, D = await import("node:path"), U2 = D.sep, typeof I2 < "u")) return;
  let e = H, t = await import("node:crypto"), o = await Promise.resolve().then(() => __toESM(require_browser())), r = await import("node:child_process"), a2 = { fs: e, crypto: t, ws: o, child_process: r };
  globalThis.require = function(n) {
    return a2[n];
  };
}
s(T2, "initNodeModules");
function oe2(e, t) {
  return D.resolve(t || ".", e);
}
s(oe2, "node_resolvePath");
function ae2(e, t) {
  return t === void 0 && (t = location), new URL(e, t).toString();
}
s(ae2, "browser_resolvePath");
var P2;
g2 ? P2 = oe2 : P2 = ae2;
var U2;
g2 || (U2 = "/");
function se(e, t) {
  return e.startsWith("file://") && (e = e.slice(7)), e.includes("://") ? { response: fetch(e) } : { binary: L2.readFile(e).then((o) => new Uint8Array(o.buffer, o.byteOffset, o.byteLength)) };
}
s(se, "node_getBinaryResponse");
function ce(e, t) {
  let o = new URL(e, location);
  return { response: fetch(o, t ? { integrity: t } : {}) };
}
s(ce, "browser_getBinaryResponse");
var F2;
g2 ? F2 = se : F2 = ce;
async function q2(e, t) {
  let { response: o, binary: r } = F2(e, t);
  if (r) return r;
  let a2 = await o;
  if (!a2.ok) throw new Error(`Failed to load '${e}': request failed.`);
  return new Uint8Array(await a2.arrayBuffer());
}
s(q2, "loadBinaryFile");
var R2;
if ($) R2 = s(async (e) => await import(e), "loadScript");
else if (j) R2 = s(async (e) => {
  try {
    globalThis.importScripts(e);
  } catch (t) {
    if (t instanceof TypeError) await import(e);
    else throw t;
  }
}, "loadScript");
else if (g2) R2 = le2;
else throw new Error("Cannot determine runtime environment");
async function le2(e) {
  e.startsWith("file://") && (e = e.slice(7)), e.includes("://") ? V.runInThisContext(await (await fetch(e)).text()) : await import(z.pathToFileURL(e).href);
}
s(le2, "nodeLoadScript");
async function J(e) {
  if (g2) {
    await T2();
    let t = await L2.readFile(e, { encoding: "utf8" });
    return JSON.parse(t);
  } else return await (await fetch(e)).json();
}
s(J, "loadLockFile");
async function K() {
  if (A2) return __dirname;
  let e;
  try {
    throw new Error();
  } catch (r) {
    e = r;
  }
  let t = C.parse(e)[0].fileName;
  if (g2 && !t.startsWith("file://") && (t = `file://${t}`), W) {
    let r = await import("node:path");
    return (await import("node:url")).fileURLToPath(r.dirname(t));
  }
  let o = t.lastIndexOf(U2);
  if (o === -1) throw new Error("Could not extract indexURL path from pyodide module location");
  return t.slice(0, o);
}
s(K, "calculateDirname");
function Y2(e) {
  let t = e.FS, o = e.FS.filesystems.MEMFS, r = e.PATH, a2 = { DIR_MODE: 16895, FILE_MODE: 33279, mount: function(n) {
    if (!n.opts.fileSystemHandle) throw new Error("opts.fileSystemHandle is required");
    return o.mount.apply(null, arguments);
  }, syncfs: async (n, i, c2) => {
    try {
      let l = a2.getLocalSet(n), d2 = await a2.getRemoteSet(n), u2 = i ? d2 : l, m2 = i ? l : d2;
      await a2.reconcile(n, u2, m2), c2(null);
    } catch (l) {
      c2(l);
    }
  }, getLocalSet: (n) => {
    let i = /* @__PURE__ */ Object.create(null);
    function c2(u2) {
      return u2 !== "." && u2 !== "..";
    }
    s(c2, "isRealDir");
    function l(u2) {
      return (m2) => r.join2(u2, m2);
    }
    s(l, "toAbsolute");
    let d2 = t.readdir(n.mountpoint).filter(c2).map(l(n.mountpoint));
    for (; d2.length; ) {
      let u2 = d2.pop(), m2 = t.stat(u2);
      t.isDir(m2.mode) && d2.push.apply(d2, t.readdir(u2).filter(c2).map(l(u2))), i[u2] = { timestamp: m2.mtime, mode: m2.mode };
    }
    return { type: "local", entries: i };
  }, getRemoteSet: async (n) => {
    let i = /* @__PURE__ */ Object.create(null), c2 = await de2(n.opts.fileSystemHandle);
    for (let [l, d2] of c2) l !== "." && (i[r.join2(n.mountpoint, l)] = { timestamp: d2.kind === "file" ? (await d2.getFile()).lastModifiedDate : /* @__PURE__ */ new Date(), mode: d2.kind === "file" ? a2.FILE_MODE : a2.DIR_MODE });
    return { type: "remote", entries: i, handles: c2 };
  }, loadLocalEntry: (n) => {
    let c2 = t.lookupPath(n).node, l = t.stat(n);
    if (t.isDir(l.mode)) return { timestamp: l.mtime, mode: l.mode };
    if (t.isFile(l.mode)) return c2.contents = o.getFileDataAsTypedArray(c2), { timestamp: l.mtime, mode: l.mode, contents: c2.contents };
    throw new Error("node type not supported");
  }, storeLocalEntry: (n, i) => {
    if (t.isDir(i.mode)) t.mkdirTree(n, i.mode);
    else if (t.isFile(i.mode)) t.writeFile(n, i.contents, { canOwn: true });
    else throw new Error("node type not supported");
    t.chmod(n, i.mode), t.utime(n, i.timestamp, i.timestamp);
  }, removeLocalEntry: (n) => {
    var i = t.stat(n);
    t.isDir(i.mode) ? t.rmdir(n) : t.isFile(i.mode) && t.unlink(n);
  }, loadRemoteEntry: async (n) => {
    if (n.kind === "file") {
      let i = await n.getFile();
      return { contents: new Uint8Array(await i.arrayBuffer()), mode: a2.FILE_MODE, timestamp: i.lastModifiedDate };
    } else {
      if (n.kind === "directory") return { mode: a2.DIR_MODE, timestamp: /* @__PURE__ */ new Date() };
      throw new Error("unknown kind: " + n.kind);
    }
  }, storeRemoteEntry: async (n, i, c2) => {
    let l = n.get(r.dirname(i)), d2 = t.isFile(c2.mode) ? await l.getFileHandle(r.basename(i), { create: true }) : await l.getDirectoryHandle(r.basename(i), { create: true });
    if (d2.kind === "file") {
      let u2 = await d2.createWritable();
      await u2.write(c2.contents), await u2.close();
    }
    n.set(i, d2);
  }, removeRemoteEntry: async (n, i) => {
    await n.get(r.dirname(i)).removeEntry(r.basename(i)), n.delete(i);
  }, reconcile: async (n, i, c2) => {
    let l = 0, d2 = [];
    Object.keys(i.entries).forEach(function(f2) {
      let y2 = i.entries[f2], S2 = c2.entries[f2];
      (!S2 || t.isFile(y2.mode) && y2.timestamp.getTime() > S2.timestamp.getTime()) && (d2.push(f2), l++);
    }), d2.sort();
    let u2 = [];
    if (Object.keys(c2.entries).forEach(function(f2) {
      i.entries[f2] || (u2.push(f2), l++);
    }), u2.sort().reverse(), !l) return;
    let m2 = i.type === "remote" ? i.handles : c2.handles;
    for (let f2 of d2) {
      let y2 = r.normalize(f2.replace(n.mountpoint, "/")).substring(1);
      if (c2.type === "local") {
        let S2 = m2.get(y2), X2 = await a2.loadRemoteEntry(S2);
        a2.storeLocalEntry(f2, X2);
      } else {
        let S2 = a2.loadLocalEntry(f2);
        await a2.storeRemoteEntry(m2, y2, S2);
      }
    }
    for (let f2 of u2) if (c2.type === "local") a2.removeLocalEntry(f2);
    else {
      let y2 = r.normalize(f2.replace(n.mountpoint, "/")).substring(1);
      await a2.removeRemoteEntry(m2, y2);
    }
  } };
  e.FS.filesystems.NATIVEFS_ASYNC = a2;
}
s(Y2, "initializeNativeFS");
var de2 = s(async (e) => {
  let t = [];
  async function o(a2) {
    for await (let n of a2.values()) t.push(n), n.kind === "directory" && await o(n);
  }
  s(o, "collect"), await o(e);
  let r = /* @__PURE__ */ new Map();
  r.set(".", e);
  for (let a2 of t) {
    let n = (await e.resolve(a2)).join("/");
    r.set(n, a2);
  }
  return r;
}, "getFsHandles");
function G2(e) {
  let t = { noImageDecoding: true, noAudioDecoding: true, noWasmDecoding: false, preRun: ge(e), quit(o, r) {
    throw t.exited = { status: o, toThrow: r }, r;
  }, print: e.stdout, printErr: e.stderr, arguments: e.args, API: { config: e }, locateFile: (o) => e.indexURL + o, instantiateWasm: ye2(e.indexURL) };
  return t;
}
s(G2, "createSettings");
function ue2(e) {
  return function(t) {
    let o = "/";
    try {
      t.FS.mkdirTree(e);
    } catch (r) {
      console.error(`Error occurred while making a home directory '${e}':`), console.error(r), console.error(`Using '${o}' for a home directory instead`), e = o;
    }
    t.FS.chdir(e);
  };
}
s(ue2, "createHomeDirectory");
function fe2(e) {
  return function(t) {
    Object.assign(t.ENV, e);
  };
}
s(fe2, "setEnvironment");
function me2(e) {
  return (t) => {
    for (let o of e) t.FS.mkdirTree(o), t.FS.mount(t.FS.filesystems.NODEFS, { root: o }, o);
  };
}
s(me2, "mountLocalDirectories");
function pe2(e) {
  let t = q2(e);
  return (o) => {
    let r = o._py_version_major(), a2 = o._py_version_minor();
    o.FS.mkdirTree("/lib"), o.FS.mkdirTree(`/lib/python${r}.${a2}/site-packages`), o.addRunDependency("install-stdlib"), t.then((n) => {
      o.FS.writeFile(`/lib/python${r}${a2}.zip`, n);
    }).catch((n) => {
      console.error("Error occurred while installing the standard library:"), console.error(n);
    }).finally(() => {
      o.removeRunDependency("install-stdlib");
    });
  };
}
s(pe2, "installStdlib");
function ge(e) {
  let t;
  return e.stdLibURL != null ? t = e.stdLibURL : t = e.indexURL + "python_stdlib.zip", [pe2(t), ue2(e.env.HOME), fe2(e.env), me2(e._node_mounts), Y2];
}
s(ge, "getFileSystemInitializationFuncs");
function ye2(e) {
  if (typeof WasmOffsetConverter < "u") return;
  let { binary: t, response: o } = F2(e + "pyodide.asm.wasm");
  return function(r, a2) {
    return async function() {
      try {
        let n;
        o ? n = await WebAssembly.instantiateStreaming(o, r) : n = await WebAssembly.instantiate(await t, r);
        let { instance: i, module: c2 } = n;
        a2(i, c2);
      } catch (n) {
        console.warn("wasm instantiation failed!"), console.warn(n);
      }
    }(), {};
  };
}
s(ye2, "getInstantiateWasmFunc");
var M = "0.27.3";
async function $e(e = {}) {
  var u2, m2;
  await T2();
  let t = e.indexURL || await K();
  t = P2(t), t.endsWith("/") || (t += "/"), e.indexURL = t;
  let o = { fullStdLib: false, jsglobals: globalThis, stdin: globalThis.prompt ? globalThis.prompt : void 0, lockFileURL: t + "pyodide-lock.json", args: [], _node_mounts: [], env: {}, packageCacheDir: t, packages: [], enableRunUntilComplete: false, checkAPIVersion: true, BUILD_ID: "285ab4f913dd7f9216f3d9f225a9425b58b1c1cf058302946162bb3873fa1e70" }, r = Object.assign(o, e);
  (u2 = r.env).HOME ?? (u2.HOME = "/home/pyodide"), (m2 = r.env).PYTHONINSPECT ?? (m2.PYTHONINSPECT = "1");
  let a2 = G2(r), n = a2.API;
  if (n.lockFilePromise = J(r.lockFileURL), typeof _createPyodideModule != "function") {
    let f2 = `${r.indexURL}pyodide.asm.js`;
    await R2(f2);
  }
  let i;
  if (e._loadSnapshot) {
    let f2 = await e._loadSnapshot;
    ArrayBuffer.isView(f2) ? i = f2 : i = new Uint8Array(f2), a2.noInitialRun = true, a2.INITIAL_MEMORY = i.length;
  }
  let c2 = await _createPyodideModule(a2);
  if (a2.exited) throw a2.exited.toThrow;
  if (e.pyproxyToStringRepr && n.setPyProxyToStringMethod(true), n.version !== M && r.checkAPIVersion) throw new Error(`Pyodide version does not match: '${M}' <==> '${n.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);
  c2.locateFile = (f2) => {
    throw new Error("Didn't expect to load any more file_packager files!");
  };
  let l;
  i && (l = n.restoreSnapshot(i));
  let d2 = n.finalizeBootstrap(l, e._snapshotDeserializer);
  return n.sys.path.insert(0, n.config.env.HOME), d2.version.includes("dev") || n.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${d2.version}/full/`), n._pyodide.set_excepthook(), await n.packageIndexReady, n.initializeStreams(r.stdin, r.stdout, r.stderr), d2;
}
s($e, "loadPyodide");

// src/pyodide-proxy.ts
async function setupPythonEnv(pyodide2, callJS2) {
  const repr = pyodide2.globals.get("repr");
  pyodide2.globals.set("js_pyodide", pyodide2);
  const pyconsole = await pyodide2.runPythonAsync(`
  import pyodide.console
  import __main__
  pyodide.console.PyodideConsole(__main__.__dict__)
  `);
  const tabComplete = pyconsole.complete.copy();
  pyconsole.destroy();
  if (callJS2) {
    pyodide2.globals.set("callJS", callJS2);
  }
  const shortFormatLastTraceback = await pyodide2.runPythonAsync(`
  def _short_format_last_traceback() -> str:
      import sys
      import traceback
      e = sys.last_value
      found_marker = False
      nframes = 0
      for (frame, _) in traceback.walk_tb(e.__traceback__):
          if frame.f_code.co_filename in ("<console>", "<exec>"):
              found_marker = True
          if found_marker:
              nframes += 1
      return "".join(traceback.format_exception(type(e), e, e.__traceback__, -nframes))

  _short_format_last_traceback
  `);
  await pyodide2.runPythonAsync(`del _short_format_last_traceback`);
  return {
    repr,
    tabComplete,
    shortFormatLastTraceback
  };
}
function processReturnValue(value, returnResult = "none", pyodide2, repr) {
  const possibleReturnValues = {
    get value() {
      if (value instanceof pyodide2.ffi.PyProxy) {
        return value.toJs();
      } else {
        return value;
      }
    },
    get printed_value() {
      return repr(value);
    },
    get to_html() {
      let toHtml;
      try {
        toHtml = pyodide2.globals.get("_to_html");
      } catch (e) {
        console.error("Couldn't find _to_html function: ", e);
        toHtml = (x3) => ({
          type: "text",
          value: "Couldn't finding _to_html function."
        });
      }
      const val = toHtml(value).toJs({
        dict_converter: Object.fromEntries
      });
      return val;
    },
    get none() {
      return void 0;
    }
  };
  return possibleReturnValues[returnResult];
}

// src/pyodide-worker.ts
var pyodideStatus = "none";
var pyodide;
self.stdout_callback = function(s2) {
  self.postMessage({ type: "nonreply", subtype: "output", stdout: s2 });
};
self.stderr_callback = function(s2) {
  self.postMessage({ type: "nonreply", subtype: "output", stderr: s2 });
};
async function callJS(fnName, args) {
  self.postMessage({
    type: "nonreply",
    subtype: "callJS",
    fnName: fnName.toJs(),
    args: args.toJs()
  });
}
var pyUtils;
self.onmessage = async function(e) {
  const msg = e.data;
  if (msg.type === "openChannel") {
    const clientPort = e.ports[0];
    await openChannel(msg.path, msg.appName, clientPort, pyodide);
    return;
  } else if (msg.type === "makeRequest") {
    const clientPort = e.ports[0];
    await makeRequest(msg.scope, msg.appName, clientPort, pyodide);
    return;
  }
  const messagePort = e.ports[0];
  try {
    if (msg.type === "init") {
      if (pyodideStatus === "none") {
        pyodideStatus = "loading";
        pyodide = await $e({
          ...msg.config,
          stdout: self.stdout_callback,
          stderr: self.stderr_callback
        });
        pyUtils = await setupPythonEnv(pyodide, callJS);
        pyodideStatus = "loaded";
      }
      messagePort.postMessage({ type: "reply", subtype: "done" });
    } else if (msg.type === "loadPackagesFromImports") {
      const result = await pyodide.loadPackagesFromImports(msg.code);
      messagePort.postMessage({
        type: "reply",
        subtype: "done",
        value: result
      });
    } else if (msg.type === "runPythonAsync") {
      await pyodide.loadPackagesFromImports(msg.code);
      const result = await pyodide.runPythonAsync(msg.code);
      if (msg.printResult && result !== void 0) {
        self.stdout_callback(pyUtils.repr(result));
      }
      try {
        const processedResult = processReturnValue(
          result,
          msg.returnResult,
          pyodide,
          pyUtils.repr
        );
        messagePort.postMessage({
          type: "reply",
          subtype: "done",
          value: processedResult
        });
      } finally {
        if (result instanceof pyodide.ffi.PyProxy) {
          result.destroy();
        }
      }
    } else if (msg.type === "tabComplete") {
      const completions = pyUtils.tabComplete(msg.code).toJs()[0];
      messagePort.postMessage({
        type: "reply",
        subtype: "tabCompletions",
        completions
      });
    } else if (msg.type === "callPyAsync") {
      const { fnName, args, kwargs } = msg;
      let fn = pyodide.globals.get(fnName[0]);
      for (const el of fnName.slice(1)) {
        fn = fn[el];
      }
      const resultMaybePromise = fn.callKwargs(...args, kwargs);
      const result = await Promise.resolve(resultMaybePromise);
      if (msg.printResult && result !== void 0) {
        self.stdout_callback(pyUtils.repr(result));
      }
      try {
        const processedResult = processReturnValue(
          result,
          msg.returnResult,
          pyodide,
          pyUtils.repr
        );
        messagePort.postMessage({
          type: "reply",
          subtype: "done",
          value: processedResult
        });
      } finally {
        if (result instanceof pyodide.ffi.PyProxy) {
          result.destroy();
        }
      }
    } else {
      messagePort.postMessage({
        type: "reply",
        subtype: "done",
        error: new Error(`Unknown message type: ${msg.toString()}`)
      });
    }
  } catch (e2) {
    if (e2 instanceof pyodide.ffi.PythonError) {
      e2.message = pyUtils.shortFormatLastTraceback();
    }
    messagePort.postMessage({
      type: "reply",
      subtype: "done",
      error: errorToPostableErrorObject(e2)
    });
  }
};
