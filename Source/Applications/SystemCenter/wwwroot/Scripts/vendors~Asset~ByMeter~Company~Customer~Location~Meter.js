(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~Asset~ByMeter~Company~Customer~Location~Meter"],{

/***/ "../../node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js":
/*!***************************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js ***!
  \***************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _emotion_memoize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emotion/memoize */ "../../node_modules/@emotion/memoize/dist/memoize.browser.esm.js");


var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = Object(_emotion_memoize__WEBPACK_IMPORTED_MODULE_0__["default"])(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

/* harmony default export */ __webpack_exports__["default"] = (index);


/***/ }),

/***/ "../../node_modules/@emotion/memoize/dist/memoize.browser.esm.js":
/*!***************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@emotion/memoize/dist/memoize.browser.esm.js ***!
  \***************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ __webpack_exports__["default"] = (memoize);


/***/ }),

/***/ "../../node_modules/@emotion/stylis/dist/stylis.browser.esm.js":
/*!*************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@emotion/stylis/dist/stylis.browser.esm.js ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

/* harmony default export */ __webpack_exports__["default"] = (stylis_min);


/***/ }),

/***/ "../../node_modules/@emotion/unitless/dist/unitless.browser.esm.js":
/*!*****************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@emotion/unitless/dist/unitless.browser.esm.js ***!
  \*****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ __webpack_exports__["default"] = (unitlessKeys);


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/gpa-symbols/lib/index.js":
/*!*********************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/gpa-symbols/lib/index.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.InputNumbers = exports.DNA = exports.DownArrow = exports.UpArrow = exports.Flag = exports.Wrench = exports.Spinner = exports.Warning = exports.Plus = exports.CrossMark = exports.TrashCan = exports.Pencil = exports.HeavyCheckMark = void 0;
// ******************************************************************************************************
//  index.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  09/30/2020 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
var HeavyCheckMark = '✔️';
exports.HeavyCheckMark = HeavyCheckMark;
var Pencil = '✏️';
exports.Pencil = Pencil;
var TrashCan = '🗑️';
exports.TrashCan = TrashCan;
var CrossMark = '❌';
exports.CrossMark = CrossMark;
var Plus = '➕';
exports.Plus = Plus;
var Warning = '⚠️';
exports.Warning = Warning;
var Spinner = '🔄';
exports.Spinner = Spinner;
var Wrench = '🔧';
exports.Wrench = Wrench;
var Flag = '🚩';
exports.Flag = Flag;
var UpArrow = '⬆️';
exports.UpArrow = UpArrow;
var DownArrow = '⬇️';
exports.DownArrow = DownArrow;
var DNA = '🧬';
exports.DNA = DNA;
var InputNumbers = '🔢';
exports.InputNumbers = InputNumbers;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/helper-functions/lib/CreateGuid.js":
/*!*******************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/helper-functions/lib/CreateGuid.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  CreateGuid.ts - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//  
//  https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  01/04/2021 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGuid = void 0;
function CreateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
exports.CreateGuid = CreateGuid;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/helper-functions/lib/GetNodeSize.js":
/*!********************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/helper-functions/lib/GetNodeSize.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  GetNodeSize.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  01/15/2021 - C. Lackner
//       Generated original version of source code.
//
// ******************************************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNodeSize = void 0;
function GetNodeSize(node) {
    if (node === null)
        return {
            height: 0,
            width: 0,
            top: 0,
            left: 0,
        };
    var _a = node.getBoundingClientRect(), height = _a.height, width = _a.width, top = _a.top, left = _a.left;
    return {
        height: parseInt(height.toString(), 10),
        width: parseInt(width.toString(), 10),
        top: parseInt(top.toString(), 10),
        left: parseInt(left.toString(), 10),
    };
}
exports.GetNodeSize = GetNodeSize;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/helper-functions/lib/GetTextWidth.js":
/*!*********************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/helper-functions/lib/GetTextWidth.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  GetTextWidth.tsx - Gbtc
//
//  Copyright © 2021, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  01/07/2021 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTextWidth = void 0;
function GetTextWidth(font, fontSize, word) {
    var text = document.createElement("span");
    document.body.appendChild(text);
    text.style.font = font;
    text.style.fontSize = fontSize;
    text.style.height = 'auto';
    text.style.width = 'auto';
    text.style.position = 'absolute';
    text.style.whiteSpace = 'no-wrap';
    text.innerHTML = word;
    var width = Math.ceil(text.clientWidth);
    document.body.removeChild(text);
    return width;
}
exports.GetTextWidth = GetTextWidth;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/helper-functions/lib/index.js":
/*!**************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/helper-functions/lib/index.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  index.ts - Gbtc
//
//  Copyright � 2021, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//  
//  https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  01/04/2021 - Billy Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNodeSize = exports.GetTextWidth = exports.CreateGuid = void 0;
var CreateGuid_1 = __webpack_require__(/*! ./CreateGuid */ "../../node_modules/@gpa-gemstone/helper-functions/lib/CreateGuid.js");
Object.defineProperty(exports, "CreateGuid", { enumerable: true, get: function () { return CreateGuid_1.CreateGuid; } });
var GetTextWidth_1 = __webpack_require__(/*! ./GetTextWidth */ "../../node_modules/@gpa-gemstone/helper-functions/lib/GetTextWidth.js");
Object.defineProperty(exports, "GetTextWidth", { enumerable: true, get: function () { return GetTextWidth_1.GetTextWidth; } });
var GetNodeSize_1 = __webpack_require__(/*! ./GetNodeSize */ "../../node_modules/@gpa-gemstone/helper-functions/lib/GetNodeSize.js");
Object.defineProperty(exports, "GetNodeSize", { enumerable: true, get: function () { return GetNodeSize_1.GetNodeSize; } });


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-interactive/lib/LoadingIcon.js":
/*!*********************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-interactive/lib/LoadingIcon.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  LoadingIcon.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  01/11/2020 - Christoph Lackner
//       Generated original version of source code.
// ******************************************************************************************************
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var styled_components_1 = __webpack_require__(/*! styled-components */ "../../node_modules/styled-components/dist/styled-components.browser.esm.js");
var spin = styled_components_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n 0% { transform: rotate(0deg); }\n 100% { transform: rotate(360deg); }\n"], ["\n 0% { transform: rotate(0deg); }\n 100% { transform: rotate(360deg); }\n"])));
var Icon = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tanimation: ", " 1s linear infinite;\n\tborder: ", "px solid #f3f3f3;\n\tborder-Top: ", "px solid #555;\n\tborder-Radius: 50%;\n\twidth: ", "px;\n\theight: ", "px\n"], ["\n\tanimation: ", " 1s linear infinite;\n\tborder: ", "px solid #f3f3f3;\n\tborder-Top: ", "px solid #555;\n\tborder-Radius: 50%;\n\twidth: ", "px;\n\theight: ", "px\n"])), spin, function (props) { return props.size / 5; }, function (props) { return props.size / 5; }, function (props) { return props.size; }, function (props) { return props.size; });
var LoadingIcon = function (props) {
    var h = (props.Size === undefined ? 25 : props.Size);
    return (React.createElement("div", null,
        React.createElement("div", { style: { width: (props.Label === undefined ? h : undefined), margin: 'auto' }, hidden: !props.Show },
            React.createElement(Icon, { size: h }),
            props.Label !== undefined ? React.createElement("span", null, props.Label) : null)));
};
exports.default = LoadingIcon;
var templateObject_1, templateObject_2;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-interactive/lib/LoadingScreen.js":
/*!***********************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-interactive/lib/LoadingScreen.js ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  LoadingScreen.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  01/11/2020 - Christoph Lackner
//       Generated original version of source code.
// ******************************************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var LoadingIcon_1 = __webpack_require__(/*! ./LoadingIcon */ "../../node_modules/@gpa-gemstone/react-interactive/lib/LoadingIcon.js");
var LoadingScreen = function (props) {
    var x = window.innerHeight / 2 - 20;
    return (props.Show ? React.createElement("div", { style: {
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            opacity: 0.5,
            backgroundColor: '#000000',
            zIndex: 9980,
        } },
        React.createElement("div", { style: { height: '40px', width: '40px', margin: 'auto', marginTop: x } },
            React.createElement(LoadingIcon_1.default, { Show: true, Size: 40 }))) : null);
};
exports.default = LoadingScreen;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-interactive/lib/Modal.js":
/*!***************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-interactive/lib/Modal.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  Modal.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  12/29/2020 - Christoph Lackner
//       Generated original version of source code.
// ******************************************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var ToolTip_1 = __webpack_require__(/*! ./ToolTip */ "../../node_modules/@gpa-gemstone/react-interactive/lib/ToolTip.js");
var helper_functions_1 = __webpack_require__(/*! @gpa-gemstone/helper-functions */ "../../node_modules/@gpa-gemstone/helper-functions/lib/index.js");
// Props Description:
// Title => Title of The Modal
// ShowX => show or hide the X button (default true)
// CallBack => Function to be called when closing the Modal either through Cancel (confirmed=false) or Accept Button (confirmed=true)
// Show => Whether to show the modal
// Size => Size of the modal
// ShowCancel => Whether to show the cancel button
// DisableConfirm => Disables the Confirm button
// CancelText => Text on Cancel Button
// Confirm text => Text on Confirm button
// ConfirmBtnClass => Class of the Confirm Button
// CancelBtnClass =>> Class of the Cancel Button
var Modal = function (props) {
    var _a = React.useState('none'), hover = _a[0], setHover = _a[1];
    var _b = React.useState(''), guid = _b[0], setGuid = _b[1];
    React.useEffect(function () {
        setGuid(helper_functions_1.CreateGuid());
    }, []);
    var confirmBtn = (props.ConfirmText === undefined ? 'Save' : props.ConfirmText);
    var cxnBtn = (props.CancelText === undefined ? 'Cancel' : props.CancelText);
    var cxnbtnCls = 'btn ' + (props.CancelBtnClass === undefined ? 'btn-danger' : props.CancelBtnClass);
    var confirmbtnCls = 'btn ' + (props.ConfirmBtnClass === undefined ? 'btn-primary' : props.ConfirmBtnClass);
    var showConfirmToolTip = (props.ConfirmShowToolTip !== undefined && props.ConfirmShowToolTip) && hover === 'confirm';
    var showCxnToolTip = (props.CancelShowToolTip !== undefined && props.CancelShowToolTip) && hover === 'cancel';
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "modal" + (props.Show ? " show" : ''), style: props.Show ? { display: 'block', zIndex: 9990 } : {} },
            React.createElement("div", { className: "modal-dialog" + (props.Size === undefined ? '' : props.Size === 'xlg' ? '' : (" modal-" + props.Size)), style: props.Size === 'xlg' ? { maxWidth: window.innerWidth - 100 } : {} },
                React.createElement("div", { className: "modal-content" },
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("h4", { className: "modal-title" }, props.Title),
                        props.ShowX ? React.createElement("button", { type: "button", className: "close", onClick: function () { return props.CallBack(false, false); } }, "\u00D7") : null),
                    React.createElement("div", { className: "modal-body" }, props.Show ? props.children : null),
                    React.createElement("div", { className: "modal-footer" },
                        React.createElement("button", { type: "button", className: confirmbtnCls + (!(props.DisableConfirm === undefined || !props.DisableConfirm) ? ' disabled' : ''), "data-tooltip": guid + '-confirm', onClick: function () { if (!(props.DisableConfirm === undefined || !props.DisableConfirm))
                                return; props.CallBack(true, true); }, onMouseEnter: function () { return setHover('confirm'); }, onMouseLeave: function () { return setHover('none'); } }, confirmBtn),
                        props.ShowCancel === undefined || props.ShowCancel ?
                            React.createElement("button", { type: "button", className: cxnbtnCls + (!(props.DisableCancel === undefined || !props.DisableCancel) ? ' disabled' : ''), "data-tooltip": guid + '-cancel', onClick: function () { if (!(props.DisableCancel === undefined || !props.DisableCancel))
                                    return; props.CallBack(false, true); }, onMouseEnter: function () { return setHover('cancel'); }, onMouseLeave: function () { return setHover('none'); } }, cxnBtn)
                            : null,
                        React.createElement(ToolTip_1.default, { Show: showConfirmToolTip, Position: 'top', Theme: 'dark', Target: guid + '-confirm', Zindex: 9999 }, props.ConfirmToolTipContent),
                        React.createElement(ToolTip_1.default, { Show: showCxnToolTip, Position: 'top', Theme: 'dark', Target: guid + '-cancel', Zindex: 9999 }, props.CancelToolTipContent))))),
        props.Show ? React.createElement("div", { style: {
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                opacity: 0.5,
                backgroundColor: '#ffffff',
                zIndex: 9980,
            } }) : null));
};
exports.default = Modal;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-interactive/lib/SearchBar.js":
/*!*******************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-interactive/lib/SearchBar.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  SearchBar.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  01/06/2020 - Christoph Lackner
//       Generated original version of source code.
// ******************************************************************************************************
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var Modal_1 = __webpack_require__(/*! ./Modal */ "../../node_modules/@gpa-gemstone/react-interactive/lib/Modal.js");
var LoadingIcon_1 = __webpack_require__(/*! ./LoadingIcon */ "../../node_modules/@gpa-gemstone/react-interactive/lib/LoadingIcon.js");
var react_forms_1 = __webpack_require__(/*! @gpa-gemstone/react-forms */ "../../node_modules/@gpa-gemstone/react-forms/lib/index.js");
var gpa_symbols_1 = __webpack_require__(/*! @gpa-gemstone/gpa-symbols */ "../../node_modules/@gpa-gemstone/gpa-symbols/lib/index.js");
function SearchBar(props) {
    var _a = React.useState(false), hover = _a[0], setHover = _a[1];
    var _b = React.useState(false), show = _b[0], setShow = _b[1];
    var _c = React.useState(false), isNew = _c[0], setIsNew = _c[1];
    var _d = React.useState([]), filters = _d[0], setFilters = _d[1];
    var _e = React.useState({ FieldName: props.CollumnList[0].key, SearchText: '', Operator: props.CollumnList[0].type === 'string' ? 'LIKE' : '=', Type: props.CollumnList[0].type }), filter = _e[0], setFilter = _e[1];
    var _f = React.useState(""), search = _f[0], setSearch = _f[1];
    var _g = React.useState(null), searchFilter = _g[0], setSearchFilter = _g[1];
    // Update SearchFilter if there are any Character and only do it every 500ms to avoid hammering the server while typing
    React.useEffect(function () {
        var handle = null;
        if (search.length > 0 && props.defaultCollumn !== undefined)
            handle = setTimeout(function () {
                if (props.defaultCollumn !== undefined)
                    setSearchFilter({ FieldName: props.defaultCollumn.key, Operator: 'LIKE', Type: props.defaultCollumn.type, SearchText: ('*' + search + '*') });
            }, 500);
        else
            handle = setTimeout(function () {
                setSearchFilter(null);
            }, 500);
        return function () { if (handle !== null)
            clearTimeout(handle); };
    }, [search]);
    React.useEffect(function () {
        if (searchFilter !== null)
            props.SetFilter(__spreadArrays(filters, [searchFilter]));
        if (searchFilter === null)
            props.SetFilter(filters);
    }, [searchFilter]);
    function deleteFilter(f) {
        var index = filters.findIndex(function (fs) { return fs === f; });
        var filts = __spreadArrays(filters);
        filts.splice(index, 1);
        setFilters(filts);
        setHover(false);
        if (props.defaultCollumn !== undefined && searchFilter !== null)
            props.SetFilter(__spreadArrays(filts, [searchFilter]));
        else
            props.SetFilter(filts);
    }
    function addFilter() {
        var oldFilters = __spreadArrays(filters);
        var adjustedFilter = __assign({}, filter);
        if (adjustedFilter.Type === 'string' && adjustedFilter.Operator === 'LIKE')
            adjustedFilter.SearchText = '*' + adjustedFilter.SearchText + '*';
        oldFilters.push(adjustedFilter);
        setFilters(oldFilters);
        setFilter({ FieldName: props.CollumnList[0].key, SearchText: '', Operator: props.CollumnList[0].type === 'string' ? 'LIKE' : '=', Type: props.CollumnList[0].type });
        setFilter({ FieldName: props.CollumnList[0].key, SearchText: '', Operator: props.CollumnList[0].type === 'string' ? 'LIKE' : '=', Type: props.CollumnList[0].type });
        if (props.defaultCollumn !== undefined && searchFilter !== null)
            props.SetFilter(__spreadArrays(oldFilters, [searchFilter]));
        else
            props.SetFilter(oldFilters);
    }
    function editFilter(index) {
        setIsNew(false);
        var oldFilters = __spreadArrays(filters);
        var filt = oldFilters[index];
        oldFilters.splice(index, 1);
        if (filt.Type === 'string' && filt.Operator === 'LIKE')
            filt.SearchText = filt.SearchText.substr(1, filt.SearchText.length - 2);
        setShow(true);
        setFilters(oldFilters);
        setFilter(filt);
        if (props.defaultCollumn !== undefined && searchFilter !== null)
            props.SetFilter(__spreadArrays(oldFilters, [searchFilter]));
        else
            props.SetFilter(oldFilters);
    }
    ;
    function createFilter() {
        setShow(!show);
        setIsNew(true);
        setFilter({ FieldName: props.CollumnList[0].key, SearchText: '', Operator: props.CollumnList[0].type === 'string' ? 'LIKE' : '=', Type: props.CollumnList[0].type });
    }
    var content = (React.createElement(React.Fragment, null,
        React.createElement("form", null,
            React.createElement("div", { className: "row" },
                props.defaultCollumn !== undefined ?
                    React.createElement("div", { className: "col" },
                        React.createElement("div", { className: "input-group" },
                            React.createElement("input", { className: "form-control mr-sm-2", type: "search", placeholder: "Search " + props.defaultCollumn.label, onChange: function (event) { return setSearch(event.target.value); } }),
                            props.ShowLoading !== undefined && props.ShowLoading ? React.createElement("div", { className: "input-group-append" },
                                " ",
                                React.createElement(LoadingIcon_1.default, { Show: true }),
                                " ") : null),
                        React.createElement("p", { style: { marginTop: 2, marginBottom: 2 } }, props.ResultNote)) : null,
                React.createElement("div", { style: { position: 'relative', display: 'inline-block' }, className: 'col' },
                    React.createElement("button", { className: "btn btn-primary", onClick: function (evt) { evt.preventDefault(); createFilter(); }, onMouseEnter: function () { return setHover(true); }, onMouseLeave: function () { return setHover(false); } }, "Add Filter"),
                    React.createElement("div", { style: { width: window.innerWidth / 3, display: hover ? 'block' : 'none', position: 'absolute', backgroundColor: '#f1f1f1', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', zIndex: 1, right: (props.Direction === 'right' ? 0 : undefined), left: (props.Direction === 'left' ? 0 : undefined) }, onMouseEnter: function () { return setHover(true); }, onMouseLeave: function () { return setHover(false); } },
                        React.createElement("table", { className: 'table' },
                            React.createElement("thead", null,
                                React.createElement("tr", null,
                                    React.createElement("th", null, "Column"),
                                    React.createElement("th", null, "Operator"),
                                    React.createElement("th", null, "Search Text"),
                                    React.createElement("th", null, "Edit"),
                                    React.createElement("th", null, "Remove"))),
                            React.createElement("tbody", null, filters.map(function (f, i) { return React.createElement("tr", { key: i },
                                React.createElement("td", null, f.FieldName),
                                React.createElement("td", null, f.Operator),
                                React.createElement("td", null, f.SearchText),
                                React.createElement("td", null,
                                    React.createElement("button", { className: "btn btn-sm", onClick: function (e) { return editFilter(i); } },
                                        React.createElement("span", null, gpa_symbols_1.Pencil))),
                                React.createElement("td", null,
                                    React.createElement("button", { className: "btn btn-sm", onClick: function (e) { return deleteFilter(f); } },
                                        React.createElement("span", null, gpa_symbols_1.TrashCan)))); })))))))));
    return (React.createElement("div", { style: { width: '100%' } },
        React.createElement("nav", { className: "navbar navbar-expand-lg navbar-light bg-light" },
            React.createElement("div", { className: "collapse navbar-collapse", style: { width: '100%' } },
                React.createElement("ul", { className: "navbar-nav mr-auto", style: { width: '100%' } },
                    props.Direction === 'right' ? props.children : null,
                    props.Label !== undefined ?
                        React.createElement("li", { className: "nav-item", style: { minWidth: (props.Width === undefined ? '150px' : undefined), width: props.Width, paddingRight: 10 } },
                            React.createElement("fieldset", { className: "border", style: { padding: '10px', height: '100%' } },
                                React.createElement("legend", { className: "w-auto", style: { fontSize: 'large' } },
                                    props.Label,
                                    ":"),
                                content)) :
                        React.createElement("li", { className: "nav-item", style: { minWidth: (props.Width === undefined ? '150px' : undefined), width: props.Width, paddingRight: 10 } }, content),
                    props.Direction === 'left' ? props.children : null))),
        React.createElement(Modal_1.default, { Title: 'Add Filter', Show: show, CallBack: function (conf) { if (conf)
                addFilter(); setShow(false); }, ConfirmText: isNew ? 'Add' : 'Save', CancelText: isNew ? 'Close' : 'Delete' },
            React.createElement(react_forms_1.Select, { Record: filter, Field: 'FieldName', Options: props.CollumnList.map(function (fl) { return ({ Value: fl.key, Label: fl.label }); }), Setter: function (record) {
                    var operator = "IN";
                    var column = props.CollumnList.find(function (fl) { return fl.key === record.FieldName; });
                    if (column !== undefined && column.type === 'string')
                        operator = "LIKE";
                    setFilter(function (prevFilter) { return (__assign(__assign({}, prevFilter), { FieldName: record.FieldName, SearchText: '', Operator: operator, Type: (column !== undefined ? column.type : 'string') })); });
                }, Label: 'Column' }),
            React.createElement(FilterCreator, { Filter: filter, Field: props.CollumnList.find(function (fl) { return fl.key === filter.FieldName; }), Setter: function (record) { return setFilter(record); }, Enum: (props.GetEnum === undefined ? undefined : props.GetEnum) }))));
}
exports.default = SearchBar;
function FilterCreator(props) {
    var _a = React.useState([]), options = _a[0], setOptions = _a[1];
    React.useEffect(function () {
        if (props.Field === undefined)
            return;
        if (props.Field.enum !== undefined)
            setOptions(props.Field.enum);
        if (props.Enum !== undefined)
            return props.Enum(setOptions, props.Field);
        if (props.Field.enum === undefined)
            setOptions([]);
    }, [props.Field, props.Enum]);
    if (props.Field === undefined)
        return null;
    if (props.Field.type === "string") {
        return (React.createElement(React.Fragment, null,
            React.createElement("label", null, "Column type is string. Wildcard (*) can be used with 'LIKE' and 'NOT LIKE'"),
            React.createElement("div", { className: 'row' },
                React.createElement("div", { className: 'col-4' },
                    React.createElement("select", { className: 'form-control', value: props.Filter.Operator, onChange: function (evt) {
                            var value = evt.target.value;
                            props.Setter(function (prevState) { return (__assign(__assign({}, prevState), { Operator: value })); });
                        } },
                        React.createElement("option", { value: 'LIKE' }, "LIKE"),
                        React.createElement("option", { value: '=' }, "="),
                        React.createElement("option", { value: 'NOT LIKE' }, "NOT LIKE"))),
                React.createElement("div", { className: 'col' },
                    React.createElement("input", { className: 'form-control', value: props.Filter.SearchText, onChange: function (evt) {
                            var value = evt.target.value;
                            props.Setter(function (prevState) { return (__assign(__assign({}, prevState), { SearchText: value })); });
                        } })))));
    }
    else if (props.Field.type === "integer" || props.Field.type === "number") {
        return (React.createElement(React.Fragment, null,
            React.createElement("label", null,
                "Column type is ",
                props.Field.type,
                "."),
            React.createElement("div", { className: 'row' },
                React.createElement("div", { className: 'col-4' },
                    React.createElement("select", { className: 'form-control', value: props.Filter.Operator, onChange: function (evt) {
                            var value = evt.target.value;
                            props.Setter(function (prevState) { return (__assign(__assign({}, prevState), { Operator: value })); });
                        } },
                        React.createElement("option", { value: '=' }, "="),
                        React.createElement("option", { value: '<>' }, "!="),
                        React.createElement("option", { value: '>' }, ">"),
                        React.createElement("option", { value: '>=' }, ">="),
                        React.createElement("option", { value: '<' }, "<"),
                        React.createElement("option", { value: '>=' }, ">="))),
                React.createElement("div", { className: 'col' },
                    React.createElement("input", { type: 'number', className: 'form-control', value: props.Filter.SearchText, onChange: function (evt) {
                            var value = evt.target.value;
                            props.Setter(function (prevState) { return (__assign(__assign({}, prevState), { SearchText: value })); });
                        } })))));
    }
    else if (props.Field.type === "datetime") {
        return (React.createElement(React.Fragment, null,
            React.createElement("label", null,
                "Column type is ",
                props.Field.type,
                "."),
            React.createElement("div", { className: 'row' },
                React.createElement("div", { className: 'col-4' },
                    React.createElement("select", { className: 'form-control', value: props.Filter.Operator, onChange: function (evt) {
                            var value = evt.target.value;
                            props.Setter(function (prevState) { return (__assign(__assign({}, prevState), { Operator: value })); });
                        } },
                        React.createElement("option", { value: '=' }, "="),
                        React.createElement("option", { value: '<>' }, "!="),
                        React.createElement("option", { value: '>' }, ">"),
                        React.createElement("option", { value: '>=' }, ">="),
                        React.createElement("option", { value: '<' }, "<"),
                        React.createElement("option", { value: '>=' }, ">="))),
                React.createElement("div", { className: 'col' },
                    React.createElement("input", { type: 'date', className: 'form-control', value: props.Filter.SearchText.split(' ')[0], onChange: function (evt) {
                            var value = evt.target.value;
                            props.Setter(function (prevState) { return (__assign(__assign({}, prevState), { SearchText: (value + ' ' + (prevState.SearchText.split(' ').length > 1 ? prevState.SearchText.split(' ')[1] : '0:00')) })); });
                        } }),
                    React.createElement("input", { type: 'time', className: 'form-control', value: props.Filter.SearchText.split(' ').length > 1 ? props.Filter.SearchText.split(' ')[1] : '0:00', onChange: function (evt) {
                            var value = evt.target.value;
                            props.Setter(function (prevState) { return (__assign(__assign({}, prevState), { SearchText: (prevState.SearchText.split(' ')[0] + ' ' + value) })); });
                        } })))));
    }
    else if (props.Field.type === "boolean") {
        return React.createElement(react_forms_1.CheckBox, { Record: props.Filter, Field: 'SearchText', Setter: function (filter) {
                props.Setter(function (prevFilter) { return (__assign(__assign({}, prevFilter), { Operator: '=', SearchText: filter.SearchText.toString() === 'true' ? '1' : '0' })); });
            }, Label: "Column type is boolean. Yes/On is checked." });
    }
    else {
        return (React.createElement(React.Fragment, null,
            React.createElement("label", null, "Column type is enumerable. Select from below."),
            React.createElement("ul", { style: { listStyle: 'none' } },
                React.createElement("li", null,
                    React.createElement("div", { className: "form-check" },
                        React.createElement("input", { type: "checkbox", className: "form-check-input", style: { zIndex: 1 }, onChange: function (evt) {
                                if (evt.target.checked)
                                    props.Setter(function (prevSetter) { return (__assign(__assign({}, prevSetter), { SearchText: "(" + options.map(function (x) { return x.Value; }).join(',') + ")" })); });
                                else
                                    props.Setter(function (prevSetter) { return (__assign(__assign({}, prevSetter), { SearchText: '' })); });
                            }, defaultValue: 'off' }),
                        React.createElement("label", { className: "form-check-label" }, "Select All"))),
                options.map(function (vli, index) { return React.createElement("li", { key: index },
                    React.createElement("div", { className: "form-check" },
                        React.createElement("input", { type: "checkbox", className: "form-check-input", style: { zIndex: 1 }, onChange: function (evt) {
                                if (evt.target.checked) {
                                    var list = props.Filter.SearchText.replace('(', '').replace(')', '').split(',');
                                    list = list.filter(function (x) { return x !== ""; });
                                    list.push(vli.Value);
                                    var text_1 = "(" + list.join(',') + ")";
                                    props.Setter(function (prevSetter) { return (__assign(__assign({}, prevSetter), { SearchText: text_1 })); });
                                }
                                else {
                                    var list = props.Filter.SearchText.replace('(', '').replace(')', '').split(',');
                                    list = list.filter(function (x) { return x !== ""; });
                                    list = list.filter(function (x) { return x !== vli.Value; });
                                    var text_2 = "(" + list.join(',') + ")";
                                    props.Setter(function (prevSetter) { return (__assign(__assign({}, prevSetter), { SearchText: text_2 })); });
                                }
                            }, value: props.Filter.SearchText.indexOf(vli.Value) >= 0 ? 'on' : 'off', checked: props.Filter.SearchText.indexOf(vli.Value) >= 0 ? true : false }),
                        React.createElement("label", { className: "form-check-label" }, vli.Label))); }))));
    }
}


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-interactive/lib/ToolTip.js":
/*!*****************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-interactive/lib/ToolTip.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  ToolTip.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  01/14/2021 - Christoph Lackner
//       Generated original version of source code.
// ******************************************************************************************************
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var styled_components_1 = __webpack_require__(/*! styled-components */ "../../node_modules/styled-components/dist/styled-components.browser.esm.js");
var helper_functions_1 = __webpack_require__(/*! @gpa-gemstone/helper-functions */ "../../node_modules/@gpa-gemstone/helper-functions/lib/index.js");
var WrapperDiv = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  & {\n    border-radius: 3px;\n    display: inline-block;\n    font-size: 13px;\n    padding: 8px 21px;\n    position: fixed;\n    pointer-events: none;\n    transition: opacity 0.3s ease-out;\n    z-index: ", ";\n    opacity: ", ";\n    color: ", ";\n    background: ", ";\n    top: ", ";\n    left: ", ";\n    border: 1px solid transparent;\n  }\n  ", "\n  ", "\n  ", "\n  ", ""], ["\n  & {\n    border-radius: 3px;\n    display: inline-block;\n    font-size: 13px;\n    padding: 8px 21px;\n    position: fixed;\n    pointer-events: none;\n    transition: opacity 0.3s ease-out;\n    z-index: ", ";\n    opacity: ", ";\n    color: ", ";\n    background: ", ";\n    top: ", ";\n    left: ", ";\n    border: 1px solid transparent;\n  }\n  ",
    "\n  ",
    "\n  ",
    "\n  ",
    ""
    // The other element needs to be labeld as data-tooltip that will only be used for positioning
])), function (props) { return props.Zindex; }, function (props) { return props.Show ? "0.9" : "0"; }, function (props) { return (props.Theme === 'dark' ? "#fff" : '#222'); }, function (props) { return (props.Theme === 'dark' ? "#222" : '#fff'); }, function (props) { return props.Top + "px"; }, function (props) { return props.Left + "px"; }, function (props) { return (props.Location === 'top' ? "\n    &::after {\n     border-left: 8px solid transparent;\n     border-right: 8px solid transparent;\n     border-top: 8px solid " + (props.Theme === 'dark' ? "#222" : '#fff') + ";\n     left: 50%;\n     bottom: -6px;\n     margin-left: -8px;\n     content: \"\";\n     width: 0px;\n     height: 0px;\n     position: absolute\n    }\n  " : ''); }, function (props) { return (props.Location === 'bottom' ? "\n    &::before {\n     border-left: 8px solid transparent;\n     border-right: 8px solid transparent;\n     border-bottom: 8px solid " + (props.Theme === 'dark' ? "#222" : '#fff') + ";\n     left: 50%;\n     top: -6px;\n     margin-left: -8px;\n     content: \"\";\n     width: 0px;\n     height: 0px;\n     position: absolute\n    }\n  " : ''); }, function (props) { return (props.Location === 'left' ? "\n    &::before {\n     border-top: 8px solid transparent;\n     border-bottom: 8px solid transparent;\n     border-left: 8px solid " + (props.Theme === 'dark' ? "#222" : '#fff') + ";\n     top: 50%;\n     left: 100%;\n     margin-top: -8px;\n     content: \"\";\n     width: 0px;\n     height: 0px;\n     position: absolute\n    }\n  " : ''); }, function (props) { return (props.Location === 'right' ? "\n    &::before {\n     border-top: 8px solid transparent;\n     border-bottom: 8px solid transparent;\n     border-right: 8px solid " + (props.Theme === 'dark' ? "#222" : '#fff') + ";\n     top: 50%;\n     left: -6px;\n     margin-top: -8px;\n     content: \"\";\n     width: 0px;\n     height: 0px;\n     position: absolute\n    }\n  " : ''); });
// The other element needs to be labeld as data-tooltip that will only be used for positioning
var ToolTip = function (props) {
    var _a = React.useState(0), top = _a[0], setTop = _a[1];
    var _b = React.useState(0), left = _b[0], setLeft = _b[1];
    var _c = React.useState(""), guid = _c[0], setGuid = _c[1];
    React.useEffect(function () {
        setGuid(helper_functions_1.CreateGuid());
    }, []);
    React.useLayoutEffect(function () {
        var _a = UpdatePosition(), t = _a[0], l = _a[1];
        if (t !== top)
            setTop(t);
        if (l !== left)
            setLeft(l);
    });
    var zIndex = (props.Zindex === undefined ? 2000 : props.Zindex);
    function UpdatePosition() {
        var target = document.querySelectorAll("[data-tooltip" + (props.Target === undefined ? '' : "=\"" + props.Target + "\"") + "]");
        if (target.length === 0)
            return [-999, -999];
        var targetLocation = helper_functions_1.GetNodeSize(target[0]);
        var toolTip = document.getElementById(guid);
        if (toolTip === null)
            return [-999, -999];
        var tipLocation = helper_functions_1.GetNodeSize(toolTip);
        var offset = 5;
        var result = [0, 0];
        if (props.Position === 'left') {
            result[0] = targetLocation.top + 0.5 * targetLocation.height - 0.5 * tipLocation.height;
            result[1] = targetLocation.left - tipLocation.width - offset;
        }
        else if (props.Position === 'right') {
            result[0] = targetLocation.top + 0.5 * targetLocation.height - 0.5 * tipLocation.height;
            result[1] = targetLocation.left + targetLocation.width + offset;
        }
        else if (props.Position === 'top') {
            result[0] = targetLocation.top - tipLocation.height - offset;
            result[1] = targetLocation.left + 0.5 * targetLocation.width - 0.5 * tipLocation.width;
        }
        else if (props.Position === 'bottom') {
            result[0] = targetLocation.top + targetLocation.height + offset;
            result[1] = targetLocation.left + 0.5 * targetLocation.width - 0.5 * tipLocation.width;
        }
        return result;
    }
    var theme = (props.Theme === undefined ? 'dark' : props.Theme);
    return (React.createElement(WrapperDiv, { Show: props.Show, Theme: theme, Top: top, Left: left, id: guid, Location: props.Position === undefined ? 'top' : props.Position, Zindex: zIndex }, props.children));
};
exports.default = ToolTip;
var templateObject_1;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-interactive/lib/Warning.js":
/*!*****************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-interactive/lib/Warning.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  Warning.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  12/29/2020 - Christoph Lackner
//       Generated original version of source code.
// ******************************************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var Modal_1 = __webpack_require__(/*! ./Modal */ "../../node_modules/@gpa-gemstone/react-interactive/lib/Modal.js");
// Usage:
// <Warning Title='This is a Warning' Message={'Are you sure you want to Continue?'} Callback={(canceled) => setShow(false)} Show={show} />
//
// Props Description:
// Title => Title of The Modal
// CallBack => Function to be called when closing the Modal either through Cancel (confirmed=false) or Confirm Button (confirmed=true)
// Show => Whether to show the modal
// Message => The message shown by the Modal
var Warning = function (props) {
    return (React.createElement(Modal_1.default, { Title: props.Title, Show: props.Show, CancelBtnClass: 'btn-danger', CancelText: 'Cancel', ConfirmBtnClass: 'btn-success', ConfirmText: 'Confirm', ShowX: false, ShowCancel: true, Size: 'sm', CallBack: function (confirmed) { return props.CallBack(confirmed); } },
        React.createElement("p", null, props.Message)));
};
exports.default = Warning;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-interactive/lib/index.js":
/*!***************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-interactive/lib/index.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ******************************************************************************************************
//  index.tsx - Gbtc
//
//  Copyright © 2020, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  12/29/2020 - C. Lackner Ernest
//       Generated original version of source code.
//
// ******************************************************************************************************
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolTip = exports.LoadingIcon = exports.LoadingScreen = exports.SearchBar = exports.Warning = exports.Modal = void 0;
var Modal_1 = __webpack_require__(/*! ./Modal */ "../../node_modules/@gpa-gemstone/react-interactive/lib/Modal.js");
exports.Modal = Modal_1.default;
var Warning_1 = __webpack_require__(/*! ./Warning */ "../../node_modules/@gpa-gemstone/react-interactive/lib/Warning.js");
exports.Warning = Warning_1.default;
var SearchBar_1 = __webpack_require__(/*! ./SearchBar */ "../../node_modules/@gpa-gemstone/react-interactive/lib/SearchBar.js");
exports.SearchBar = SearchBar_1.default;
var LoadingScreen_1 = __webpack_require__(/*! ./LoadingScreen */ "../../node_modules/@gpa-gemstone/react-interactive/lib/LoadingScreen.js");
exports.LoadingScreen = LoadingScreen_1.default;
var LoadingIcon_1 = __webpack_require__(/*! ./LoadingIcon */ "../../node_modules/@gpa-gemstone/react-interactive/lib/LoadingIcon.js");
exports.LoadingIcon = LoadingIcon_1.default;
var ToolTip_1 = __webpack_require__(/*! ./ToolTip */ "../../node_modules/@gpa-gemstone/react-interactive/lib/ToolTip.js");
exports.ToolTip = ToolTip_1.default;


/***/ }),

/***/ "../../node_modules/@gpa-gemstone/react-table/lib/index.js":
/*!*********************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/@gpa-gemstone/react-table/lib/index.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//  ******************************************************************************************************
//  Table.tsx - Gbtc
//
//  Copyright © 2018, Grid Protection Alliance.  All Rights Reserved.
//
//  Licensed to the Grid Protection Alliance (GPA) under one or more contributor license agreements. See
//  the NOTICE file distributed with this work for additional information regarding copyright ownership.
//  The GPA licenses this file to you under the MIT License (MIT), the "License"; you may not use this
//  file except in compliance with the License. You may obtain a copy of the License at:
//
//      http://opensource.org/licenses/MIT
//
//  Unless agreed to in writing, the subject software distributed under the License is distributed on an
//  "AS-IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. Refer to the
//  License for the specific language governing permissions and limitations.
//
//  Code Modification History:
//  ----------------------------------------------------------------------------------------------------
//  08/02/2018 - Billy Ernest
//       Generated original version of source code.
//
//  ******************************************************************************************************
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(/*! react */ "react");
var AngleIcon = function (props) { return (React.createElement("span", { style: { width: 10, height: 10, margin: 3 }, className: 'fa fa-angle-' + (props.ascending ? 'up' : 'down') })); };
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        return _super.call(this, props) || this;
    }
    Table.prototype.render = function () {
        var rowComponents = this.generateRows();
        var headerComponents = this.generateHeaders();
        return (React.createElement("table", { className: this.props.tableClass !== undefined ? this.props.tableClass : '', style: this.props.tableStyle },
            React.createElement("thead", { style: this.props.theadStyle }, headerComponents),
            React.createElement("tbody", { style: this.props.tbodyStyle }, rowComponents)));
    };
    Table.prototype.generateHeaders = function () {
        var _this = this;
        if (this.props.cols.length === 0)
            return null;
        var cells = this.props.cols.map(function (colData, index) {
            var style;
            if (colData.headerStyle !== undefined) {
                style = colData.headerStyle;
            }
            else
                style = {};
            if (style.cursor === undefined)
                style.cursor = 'pointer';
            return (React.createElement("th", { key: index, style: style, onClick: function (e) { return _this.handleSort({ col: colData.key, ascending: _this.props.ascending }, e); } },
                colData.label,
                _this.props.sortField === colData.key ? React.createElement(AngleIcon, { ascending: _this.props.ascending }) : null));
        });
        return React.createElement("tr", null, cells);
    };
    Table.prototype.generateRows = function () {
        var _this = this;
        if (this.props.data.length === 0)
            return null;
        return this.props.data.map(function (item, index) {
            var cells = _this.props.cols.map(function (colData) {
                var css;
                if (colData.rowStyle === undefined)
                    css = {};
                else
                    css = __assign({}, colData.rowStyle);
                return (React.createElement("td", { key: index.toString() + item[colData.key] + colData.key, style: css, onClick: _this.handleClick.bind(_this, { col: colData.key, row: item, data: item[colData.key] }) }, colData.content !== undefined ? colData.content(item, colData.key, css) : item[colData.key]));
            });
            var style;
            if (_this.props.rowStyle !== undefined) {
                style = __assign({}, _this.props.rowStyle);
            }
            else
                style = {};
            if (style.cursor === undefined)
                style.cursor = 'pointer';
            if (_this.props.selected !== undefined && _this.props.selected(item))
                style.backgroundColor = 'yellow';
            return (React.createElement("tr", { style: style, key: index.toString() }, cells));
        });
    };
    Table.prototype.handleClick = function (data, event) {
        this.props.onClick(data, event);
    };
    Table.prototype.handleSort = function (data, event) {
        this.props.onSort(data);
    };
    return Table;
}(React.Component));
exports.default = Table;


/***/ }),

/***/ "../../node_modules/process/browser.js":
/*!*************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/process/browser.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../../node_modules/shallowequal/index.js":
/*!****************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/shallowequal/index.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),

/***/ "../../node_modules/styled-components/dist/styled-components.browser.esm.js":
/*!**************************************************************************************************************************************!*\
  !*** D:/Projects/SystemCenter/Source/Applications/SystemCenter/node_modules/styled-components/dist/styled-components.browser.esm.js ***!
  \**************************************************************************************************************************************/
/*! exports provided: default, ServerStyleSheet, StyleSheetConsumer, StyleSheetContext, StyleSheetManager, ThemeConsumer, ThemeContext, ThemeProvider, __PRIVATE__, createGlobalStyle, css, isStyledComponent, keyframes, useTheme, version, withTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerStyleSheet", function() { return Ue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetConsumer", function() { return le; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetContext", function() { return ue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetManager", function() { return ye; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeConsumer", function() { return Le; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeContext", function() { return ze; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return Ge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__PRIVATE__", function() { return Ze; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGlobalStyle", function() { return $e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return Ae; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStyledComponent", function() { return N; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return We; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTheme", function() { return Xe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return C; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return Je; });
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-is */ "../../node_modules/react-is/index.js");
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_is__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var shallowequal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! shallowequal */ "../../node_modules/shallowequal/index.js");
/* harmony import */ var shallowequal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(shallowequal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_stylis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @emotion/stylis */ "../../node_modules/@emotion/stylis/dist/stylis.browser.esm.js");
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/unitless */ "../../node_modules/@emotion/unitless/dist/unitless.browser.esm.js");
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @emotion/is-prop-valid */ "../../node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! hoist-non-react-statics */ "../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_6__);
function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var g=function(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n},S=function(t){return null!==t&&"object"==typeof t&&"[object Object]"===(t.toString?t.toString():Object.prototype.toString.call(t))&&!Object(react_is__WEBPACK_IMPORTED_MODULE_0__["typeOf"])(t)},w=Object.freeze([]),E=Object.freeze({});function b(e){return"function"==typeof e}function _(e){return true&&"string"==typeof e&&e||e.displayName||e.name||"Component"}function N(e){return e&&"string"==typeof e.styledComponentId}var A="undefined"!=typeof process&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",C="5.2.1",I="undefined"!=typeof window&&"HTMLElement"in window,P=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY:"production"!=="development"),O={},R= true?{1:"Cannot create styled-component for component: %s.\n\n",2:"Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",3:"Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",4:"The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",5:"The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",6:"Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",7:'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',8:'ThemeProvider: Please make your "theme" prop an object.\n\n',9:"Missing document `<head>`\n\n",10:"Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",11:"_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",12:"It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n",13:"%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n",14:'ThemeProvider: "theme" prop is required.\n\n',15:"A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",16:"Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",17:"CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n"}:undefined;function D(){for(var e=arguments.length<=0?void 0:arguments[0],t=[],n=1,r=arguments.length;n<r;n+=1)t.push(n<0||arguments.length<=n?void 0:arguments[n]);return t.forEach((function(t){e=e.replace(/%[a-z]/,t)})),e}function j(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw false?undefined:new Error(D.apply(void 0,[R[e]].concat(n)).trim())}var T=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}var t=e.prototype;return t.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},t.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)(o<<=1)<0&&j(16,""+e);this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var s=r;s<o;s++)this.groupSizes[s]=0}for(var i=this.indexOfGroup(e+1),a=0,c=t.length;a<c;a++)this.tag.insertRule(i,t[a])&&(this.groupSizes[e]++,i++)},t.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n)}},t.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,s=r;s<o;s++)t+=this.tag.getRule(s)+"/*!sc*/\n";return t},e}(),k=new Map,x=new Map,V=1,B=function(e){if(k.has(e))return k.get(e);for(;x.has(V);)V++;var t=V++;return true&&((0|t)<0||t>1<<30)&&j(16,""+t),k.set(e,t),x.set(t,e),t},M=function(e){return x.get(e)},z=function(e,t){k.set(e,t),x.set(t,e)},L="style["+A+'][data-styled-version="5.2.1"]',G=new RegExp("^"+A+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),F=function(e,t,n){for(var r,o=n.split(","),s=0,i=o.length;s<i;s++)(r=o[s])&&e.registerName(t,r)},Y=function(e,t){for(var n=t.innerHTML.split("/*!sc*/\n"),r=[],o=0,s=n.length;o<s;o++){var i=n[o].trim();if(i){var a=i.match(G);if(a){var c=0|parseInt(a[1],10),u=a[2];0!==c&&(z(u,c),F(e,u,a[3]),e.getTag().insertRules(c,r)),r.length=0}else r.push(i)}}},q=function(){return true?__webpack_require__.nc:undefined},H=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(A))return r}}(n),s=void 0!==o?o.nextSibling:null;r.setAttribute(A,"active"),r.setAttribute("data-styled-version","5.2.1");var i=q();return i&&r.setAttribute("nonce",i),n.insertBefore(r,s),r},$=function(){function e(e){var t=this.element=H(e);t.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}j(17)}(t),this.length=0}var t=e.prototype;return t.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},t.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},t.getRule=function(e){var t=this.sheet.cssRules[e];return void 0!==t&&"string"==typeof t.cssText?t.cssText:""},e}(),W=function(){function e(e){var t=this.element=H(e);this.nodes=t.childNodes,this.length=0}var t=e.prototype;return t.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t),r=this.nodes[e];return this.element.insertBefore(n,r||null),this.length++,!0}return!1},t.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},t.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),U=function(){function e(e){this.rules=[],this.length=0}var t=e.prototype;return t.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},t.deleteRule=function(e){this.rules.splice(e,1),this.length--},t.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),J=I,X={isServer:!I,useCSSOMInjection:!P},Z=function(){function e(e,t,n){void 0===e&&(e=E),void 0===t&&(t={}),this.options=v({},X,{},e),this.gs=t,this.names=new Map(n),!this.options.isServer&&I&&J&&(J=!1,function(e){for(var t=document.querySelectorAll(L),n=0,r=t.length;n<r;n++){var o=t[n];o&&"active"!==o.getAttribute(A)&&(Y(e,o),o.parentNode&&o.parentNode.removeChild(o))}}(this))}e.registerId=function(e){return B(e)};var t=e.prototype;return t.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(v({},this.options,{},t),this.gs,n&&this.names||void 0)},t.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.getTag=function(){return this.tag||(this.tag=(n=(t=this.options).isServer,r=t.useCSSOMInjection,o=t.target,e=n?new U(o):r?new $(o):new W(o),new T(e)));var e,t,n,r,o},t.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},t.registerName=function(e,t){if(B(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},t.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(B(e),n)},t.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},t.clearRules=function(e){this.getTag().clearGroup(B(e)),this.clearNames(e)},t.clearTag=function(){this.tag=void 0},t.toString=function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=0;o<n;o++){var s=M(o);if(void 0!==s){var i=e.names.get(s),a=t.getGroup(o);if(void 0!==i&&0!==a.length){var c=A+".g"+o+'[id="'+s+'"]',u="";void 0!==i&&i.forEach((function(e){e.length>0&&(u+=e+",")})),r+=""+a+c+'{content:"'+u+'"}/*!sc*/\n'}}}return r}(this)},e}(),K=/(a)(d)/gi,Q=function(e){return String.fromCharCode(e+(e>25?39:97))};function ee(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Q(t%52)+n;return(Q(t%52)+n).replace(K,"$1-$2")}var te=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},ne=function(e){return te(5381,e)};function re(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(b(n)&&!N(n))return!1}return!0}var oe=ne("5.2.1"),se=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic= false&&false,this.componentId=t,this.baseHash=te(oe,t),this.baseStyle=n,Z.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.componentId,o=[];if(this.baseStyle&&o.push(this.baseStyle.generateAndInjectStyles(e,t,n)),this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))o.push(this.staticRulesId);else{var s=Ne(this.rules,e,t,n).join(""),i=ee(te(this.baseHash,s.length)>>>0);if(!t.hasNameForId(r,i)){var a=n(s,"."+i,void 0,r);t.insertRules(r,i,a)}o.push(i),this.staticRulesId=i}else{for(var c=this.rules.length,u=te(this.baseHash,n.hash),l="",d=0;d<c;d++){var h=this.rules[d];if("string"==typeof h)l+=h, true&&(u=te(u,h+d));else if(h){var p=Ne(h,e,t,n),f=Array.isArray(p)?p.join(""):p;u=te(u,f+d),l+=f}}if(l){var m=ee(u>>>0);if(!t.hasNameForId(r,m)){var y=n(l,"."+m,void 0,r);t.insertRules(r,m,y)}o.push(m)}}return o.join(" ")},e}(),ie=/^\s*\/\/.*$/gm,ae=[":","[",".","#"];function ce(e){var t,n,r,o,s=void 0===e?E:e,i=s.options,a=void 0===i?E:i,c=s.plugins,u=void 0===c?w:c,l=new _emotion_stylis__WEBPACK_IMPORTED_MODULE_3__["default"](a),d=[],h=function(e){function t(t){if(t)try{e(t+"}")}catch(e){}}return function(n,r,o,s,i,a,c,u,l,d){switch(n){case 1:if(0===l&&64===r.charCodeAt(0))return e(r+";"),"";break;case 2:if(0===u)return r+"/*|*/";break;case 3:switch(u){case 102:case 112:return e(o[0]+r),"";default:return r+(0===d?"/*|*/":"")}case-2:r.split("/*|*/}").forEach(t)}}}((function(e){d.push(e)})),f=function(e,r,s){return 0===r&&ae.includes(s[n.length])||s.match(o)?e:"."+t};function m(e,s,i,a){void 0===a&&(a="&");var c=e.replace(ie,""),u=s&&i?i+" "+s+" { "+c+" }":c;return t=a,n=s,r=new RegExp("\\"+n+"\\b","g"),o=new RegExp("(\\"+n+"\\b){2,}"),l(i||!s?"":s,u)}return l.use([].concat(u,[function(e,t,o){2===e&&o.length&&o[0].lastIndexOf(n)>0&&(o[0]=o[0].replace(r,f))},h,function(e){if(-2===e){var t=d;return d=[],t}}])),m.hash=u.length?u.reduce((function(e,t){return t.name||j(15),te(e,t.name)}),5381).toString():"",m}var ue=react__WEBPACK_IMPORTED_MODULE_1___default.a.createContext(),le=ue.Consumer,de=react__WEBPACK_IMPORTED_MODULE_1___default.a.createContext(),he=(de.Consumer,new Z),pe=ce();function fe(){return Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(ue)||he}function me(){return Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(de)||pe}function ye(e){var t=Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(e.stylisPlugins),n=t[0],s=t[1],c=fe(),u=Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])((function(){var t=c;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t}),[e.disableCSSOMInjection,e.sheet,e.target]),l=Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])((function(){return ce({options:{prefix:!e.disableVendorPrefixes},plugins:n})}),[e.disableVendorPrefixes,n]);return Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])((function(){shallowequal__WEBPACK_IMPORTED_MODULE_2___default()(n,e.stylisPlugins)||s(e.stylisPlugins)}),[e.stylisPlugins]),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ue.Provider,{value:u},react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(de.Provider,{value:l}, true?react__WEBPACK_IMPORTED_MODULE_1___default.a.Children.only(e.children):undefined))}var ve=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=pe);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.toString=function(){return j(12,String(n.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t}return e.prototype.getName=function(e){return void 0===e&&(e=pe),this.name+e.hash},e}(),ge=/([A-Z])/,Se=/([A-Z])/g,we=/^ms-/,Ee=function(e){return"-"+e.toLowerCase()};function be(e){return ge.test(e)?e.replace(Se,Ee).replace(we,"-ms-"):e}var _e=function(e){return null==e||!1===e||""===e};function Ne(e,n,r,o){if(Array.isArray(e)){for(var s,i=[],a=0,c=e.length;a<c;a+=1)""!==(s=Ne(e[a],n,r,o))&&(Array.isArray(s)?i.push.apply(i,s):i.push(s));return i}if(_e(e))return"";if(N(e))return"."+e.styledComponentId;if(b(e)){if("function"!=typeof(l=e)||l.prototype&&l.prototype.isReactComponent||!n)return e;var u=e(n);return true&&Object(react_is__WEBPACK_IMPORTED_MODULE_0__["isElement"])(u)&&console.warn(_(e)+" is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details."),Ne(u,n,r,o)}var l;return e instanceof ve?r?(e.inject(r,o),e.getName(o)):e:S(e)?function e(t,n){var r,o,s=[];for(var i in t)t.hasOwnProperty(i)&&!_e(t[i])&&(S(t[i])?s.push.apply(s,e(t[i],i)):b(t[i])?s.push(be(i)+":",t[i],";"):s.push(be(i)+": "+(r=i,null==(o=t[i])||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||r in _emotion_unitless__WEBPACK_IMPORTED_MODULE_4__["default"]?String(o).trim():o+"px")+";"));return n?[n+" {"].concat(s,["}"]):s}(e):e.toString()}function Ae(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return b(e)||S(e)?Ne(g(w,[e].concat(n))):0===n.length&&1===e.length&&"string"==typeof e[0]?e:Ne(g(e,n))}var Ce=/invalid hook call/i,Ie=new Set,Pe=function(e,t){if(true){var n="The component "+e+(t?' with the id of "'+t+'"':"")+" has been created dynamically.\nYou may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.";try{Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(),Ie.has(n)||(console.warn(n),Ie.add(n))}catch(e){Ce.test(e.message)&&Ie.delete(n)}}},Oe=function(e,t,n){return void 0===n&&(n=E),e.theme!==n.theme&&e.theme||t||n.theme},Re=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,De=/(^-|-$)/g;function je(e){return e.replace(Re,"-").replace(De,"")}var Te=function(e){return ee(ne(e)>>>0)};function ke(e){return"string"==typeof e&&( false||e.charAt(0)===e.charAt(0).toLowerCase())}var xe=function(e){return"function"==typeof e||"object"==typeof e&&null!==e&&!Array.isArray(e)},Ve=function(e){return"__proto__"!==e&&"constructor"!==e&&"prototype"!==e};function Be(e,t,n){var r=e[n];xe(t)&&xe(r)?Me(r,t):e[n]=t}function Me(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var o=0,s=n;o<s.length;o++){var i=s[o];if(xe(i))for(var a in i)Ve(a)&&Be(e,i[a],a)}return e}var ze=react__WEBPACK_IMPORTED_MODULE_1___default.a.createContext(),Le=ze.Consumer;function Ge(e){var t=Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(ze),n=Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])((function(){return function(e,t){if(!e)return j(14);if(b(e)){var n=e(t);return false||null!==n&&!Array.isArray(n)&&"object"==typeof n?n:j(7)}return Array.isArray(e)||"object"!=typeof e?j(8):t?v({},t,{},e):e}(e.theme,t)}),[e.theme,t]);return e.children?react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ze.Provider,{value:n},e.children):null}var Fe={};function Ye(e,t,n){var o=N(e),i=!ke(e),a=t.attrs,c=void 0===a?w:a,d=t.componentId,h=void 0===d?function(e,t){var n="string"!=typeof e?"sc":je(e);Fe[n]=(Fe[n]||0)+1;var r=n+"-"+Te("5.2.1"+n+Fe[n]);return t?t+"-"+r:r}(t.displayName,t.parentComponentId):d,p=t.displayName,f=void 0===p?function(e){return ke(e)?"styled."+e:"Styled("+_(e)+")"}(e):p,g=t.displayName&&t.componentId?je(t.displayName)+"-"+t.componentId:t.componentId||h,S=o&&e.attrs?Array.prototype.concat(e.attrs,c).filter(Boolean):c,A=t.shouldForwardProp;o&&e.shouldForwardProp&&(A=t.shouldForwardProp?function(n,r){return e.shouldForwardProp(n,r)&&t.shouldForwardProp(n,r)}:e.shouldForwardProp);var C,I=new se(n,g,o?e.componentStyle:void 0),P=I.isStatic&&0===c.length,O=function(e,t){return function(e,t,n,r){var o=e.attrs,i=e.componentStyle,a=e.defaultProps,c=e.foldedComponentIds,d=e.shouldForwardProp,h=e.styledComponentId,p=e.target; true&&Object(react__WEBPACK_IMPORTED_MODULE_1__["useDebugValue"])(h);var f=function(e,t,n){void 0===e&&(e=E);var r=v({},t,{theme:e}),o={};return n.forEach((function(e){var t,n,s,i=e;for(t in b(i)&&(i=i(r)),i)r[t]=o[t]="className"===t?(n=o[t],s=i[t],n&&s?n+" "+s:n||s):i[t]})),[r,o]}(Oe(t,Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(ze),a)||E,t,o),y=f[0],g=f[1],S=function(e,t,n,r){var o=fe(),s=me(),i=t?e.generateAndInjectStyles(E,o,s):e.generateAndInjectStyles(n,o,s);return true&&Object(react__WEBPACK_IMPORTED_MODULE_1__["useDebugValue"])(i), true&&!t&&r&&r(i),i}(i,r,y, true?e.warnTooManyClasses:undefined),w=n,_=g.$as||t.$as||g.as||t.as||p,N=ke(_),A=g!==t?v({},t,{},g):t,C={};for(var I in A)"$"!==I[0]&&"as"!==I&&("forwardedAs"===I?C.as=A[I]:(d?d(I,_emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_5__["default"]):!N||Object(_emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_5__["default"])(I))&&(C[I]=A[I]));return t.style&&g.style!==t.style&&(C.style=v({},t.style,{},g.style)),C.className=Array.prototype.concat(c,h,S!==h?S:null,t.className,g.className).filter(Boolean).join(" "),C.ref=w,Object(react__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_,C)}(C,e,t,P)};return O.displayName=f,(C=react__WEBPACK_IMPORTED_MODULE_1___default.a.forwardRef(O)).attrs=S,C.componentStyle=I,C.displayName=f,C.shouldForwardProp=A,C.foldedComponentIds=o?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):w,C.styledComponentId=g,C.target=o?e.target:e,C.withComponent=function(e){var r=t.componentId,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(t,["componentId"]),s=r&&r+"-"+(ke(e)?e:je(_(e)));return Ye(e,v({},o,{attrs:S,componentId:s}),n)},Object.defineProperty(C,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(t){this._foldedDefaultProps=o?Me({},e.defaultProps,t):t}}), true&&(Pe(f,g),C.warnTooManyClasses=function(e,t){var n={},r=!1;return function(o){if(!r&&(n[o]=!0,Object.keys(n).length>=200)){var s=t?' with the id of "'+t+'"':"";console.warn("Over 200 classes were generated for component "+e+s+".\nConsider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"),r=!0,n={}}}}(f,g)),C.toString=function(){return"."+C.styledComponentId},i&&hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_6___default()(C,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),C}var qe=function(e){return function e(t,r,o){if(void 0===o&&(o=E),!Object(react_is__WEBPACK_IMPORTED_MODULE_0__["isValidElementType"])(r))return j(1,String(r));var s=function(){return t(r,o,Ae.apply(void 0,arguments))};return s.withConfig=function(n){return e(t,r,v({},o,{},n))},s.attrs=function(n){return e(t,r,v({},o,{attrs:Array.prototype.concat(o.attrs,n).filter(Boolean)}))},s}(Ye,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){qe[e]=qe(e)}));var He=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=re(e),Z.registerId(this.componentId+1)}var t=e.prototype;return t.createStyles=function(e,t,n,r){var o=r(Ne(this.rules,t,n,r).join(""),""),s=this.componentId+e;n.insertRules(s,s,o)},t.removeStyles=function(e,t){t.clearRules(this.componentId+e)},t.renderStyles=function(e,t,n,r){e>2&&Z.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();function $e(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];var i=Ae.apply(void 0,[e].concat(n)),a="sc-global-"+Te(JSON.stringify(i)),u=new He(i,a);function l(e){var t=fe(),n=me(),o=Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(ze),l=Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(t.allocateGSInstance(a)).current;return true&&react__WEBPACK_IMPORTED_MODULE_1___default.a.Children.count(e.children)&&console.warn("The global style component "+a+" was given child JSX. createGlobalStyle does not render children."), true&&i.some((function(e){return"string"==typeof e&&-1!==e.indexOf("@import")}))&&console.warn("Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app."),Object(react__WEBPACK_IMPORTED_MODULE_1__["useLayoutEffect"])((function(){return h(l,e,t,o,n),function(){return u.removeStyles(l,t)}}),[l,e,t,o,n]),null}function h(e,t,n,r,o){if(u.isStatic)u.renderStyles(e,O,n,o);else{var s=v({},t,{theme:Oe(t,r,l.defaultProps)});u.renderStyles(e,s,n,o)}}return true&&Pe(a),react__WEBPACK_IMPORTED_MODULE_1___default.a.memo(l)}function We(e){ true&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.");for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=Ae.apply(void 0,[e].concat(n)).join(""),s=Te(o);return new ve(s,o)}var Ue=function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString(),n=q();return"<style "+[n&&'nonce="'+n+'"',A+'="true"','data-styled-version="5.2.1"'].filter(Boolean).join(" ")+">"+t+"</style>"},this.getStyleTags=function(){return e.sealed?j(2):e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)return j(2);var n=((t={})[A]="",t["data-styled-version"]="5.2.1",t.dangerouslySetInnerHTML={__html:e.instance.toString()},t),o=q();return o&&(n.nonce=o),[react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("style",v({},n,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Z({isServer:!0}),this.sealed=!1}var t=e.prototype;return t.collectStyles=function(e){return this.sealed?j(2):react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ye,{sheet:this.instance},e)},t.interleaveWithNodeStream=function(e){return j(3)},e}(),Je=function(e){var t=react__WEBPACK_IMPORTED_MODULE_1___default.a.forwardRef((function(t,n){var o=Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(ze),i=e.defaultProps,a=Oe(t,o,i);return true&&void 0===a&&console.warn('[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class "'+_(e)+'"'),react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(e,v({},t,{theme:a,ref:n}))}));return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_6___default()(t,e),t.displayName="WithTheme("+_(e)+")",t},Xe=function(){return Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(ze)},Ze={StyleSheet:Z,masterSheet:he}; true&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product&&console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native"), true&&(window["__styled-components-init__"]=window["__styled-components-init__"]||0,1===window["__styled-components-init__"]&&console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."),window["__styled-components-init__"]+=1);/* harmony default export */ __webpack_exports__["default"] = (qe);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../../node_modules/process/browser.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9pcy1wcm9wLXZhbGlkL2Rpc3QvaXMtcHJvcC12YWxpZC5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9tZW1vaXplL2Rpc3QvbWVtb2l6ZS5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9zdHlsaXMvZGlzdC9zdHlsaXMuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGVtb3Rpb24vdW5pdGxlc3MvZGlzdC91bml0bGVzcy5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL2dwYS1zeW1ib2xzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL2hlbHBlci1mdW5jdGlvbnMvbGliL0NyZWF0ZUd1aWQuanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9oZWxwZXItZnVuY3Rpb25zL2xpYi9HZXROb2RlU2l6ZS5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL2hlbHBlci1mdW5jdGlvbnMvbGliL0dldFRleHRXaWR0aC5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL2hlbHBlci1mdW5jdGlvbnMvbGliL2luZGV4LmpzIiwid2VicGFjazovLy9EOi9Qcm9qZWN0cy9TeXN0ZW1DZW50ZXIvU291cmNlL0FwcGxpY2F0aW9ucy9TeXN0ZW1DZW50ZXIvbm9kZV9tb2R1bGVzL0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUvbGliL0xvYWRpbmdJY29uLmpzIiwid2VicGFjazovLy9EOi9Qcm9qZWN0cy9TeXN0ZW1DZW50ZXIvU291cmNlL0FwcGxpY2F0aW9ucy9TeXN0ZW1DZW50ZXIvbm9kZV9tb2R1bGVzL0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUvbGliL0xvYWRpbmdTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9yZWFjdC1pbnRlcmFjdGl2ZS9saWIvTW9kYWwuanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9yZWFjdC1pbnRlcmFjdGl2ZS9saWIvU2VhcmNoQmFyLmpzIiwid2VicGFjazovLy9EOi9Qcm9qZWN0cy9TeXN0ZW1DZW50ZXIvU291cmNlL0FwcGxpY2F0aW9ucy9TeXN0ZW1DZW50ZXIvbm9kZV9tb2R1bGVzL0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUvbGliL1Rvb2xUaXAuanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9yZWFjdC1pbnRlcmFjdGl2ZS9saWIvV2FybmluZy5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWludGVyYWN0aXZlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LXRhYmxlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvc2hhbGxvd2VxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uLi9zcmMvc2hlZXQvVGFnLmpzIiwid2VicGFjazovLy8uLi9zcmMvc2hlZXQvU2hlZXQuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy91dGlscy9pc1N0YXRpY1J1bGVzLmpzIiwid2VicGFjazovLy8uLi9zcmMvbW9kZWxzL0tleWZyYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL21vZGVscy9TdHlsZWRDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tb2RlbHMvR2xvYmFsU3R5bGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tb2RlbHMvU2VydmVyU3R5bGVTaGVldC5qcyJdLCJuYW1lcyI6WyJub2RlcyIsImluc2VydFJ1bGUiLCJuYW1lcyIsImlkIiwib3B0aW9ucyIsImZsYXR0ZW4iLCJSZWFjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBdUM7O0FBRXZDLGs3SEFBazdIOztBQUVsN0gsWUFBWSxnRUFBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLG9FQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNkckI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxzRUFBTyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDUnZCO0FBQUE7QUFDQTtBQUNBLHlLQUF5SyxPQUFPO0FBQ2hMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLE9BQU87QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0Isa0NBQWtDO0FBQzFEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFVBQVU7QUFDeEM7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixVQUFVO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFVBQVU7O0FBRXBDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbERhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xDYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6Q2E7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2Q2E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7QUNuSEE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhzQkMxQ2dDLHVvT0NtRk5BLGdIQWdCeEJDLFdBQUEseVdDM0RRQyx5eEJBbUM4QkMsaU9Ba0JWQSxreUJDM0Z1QixtaUhDY0hBLHV5TENxUGlCQyxxd0ZDL08vQ0Msa0NBRVZGLGs2RUNzQ0VHIiwiZmlsZSI6InZlbmRvcnN+QXNzZXR+QnlNZXRlcn5Db21wYW55fkN1c3RvbWVyfkxvY2F0aW9ufk1ldGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1lbW9pemUgZnJvbSAnQGVtb3Rpb24vbWVtb2l6ZSc7XG5cbnZhciByZWFjdFByb3BzUmVnZXggPSAvXigoY2hpbGRyZW58ZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUx8a2V5fHJlZnxhdXRvRm9jdXN8ZGVmYXVsdFZhbHVlfGRlZmF1bHRDaGVja2VkfGlubmVySFRNTHxzdXBwcmVzc0NvbnRlbnRFZGl0YWJsZVdhcm5pbmd8c3VwcHJlc3NIeWRyYXRpb25XYXJuaW5nfHZhbHVlTGlua3xhY2NlcHR8YWNjZXB0Q2hhcnNldHxhY2Nlc3NLZXl8YWN0aW9ufGFsbG93fGFsbG93VXNlck1lZGlhfGFsbG93UGF5bWVudFJlcXVlc3R8YWxsb3dGdWxsU2NyZWVufGFsbG93VHJhbnNwYXJlbmN5fGFsdHxhc3luY3xhdXRvQ29tcGxldGV8YXV0b1BsYXl8Y2FwdHVyZXxjZWxsUGFkZGluZ3xjZWxsU3BhY2luZ3xjaGFsbGVuZ2V8Y2hhclNldHxjaGVja2VkfGNpdGV8Y2xhc3NJRHxjbGFzc05hbWV8Y29sc3xjb2xTcGFufGNvbnRlbnR8Y29udGVudEVkaXRhYmxlfGNvbnRleHRNZW51fGNvbnRyb2xzfGNvbnRyb2xzTGlzdHxjb29yZHN8Y3Jvc3NPcmlnaW58ZGF0YXxkYXRlVGltZXxkZWNvZGluZ3xkZWZhdWx0fGRlZmVyfGRpcnxkaXNhYmxlZHxkaXNhYmxlUGljdHVyZUluUGljdHVyZXxkb3dubG9hZHxkcmFnZ2FibGV8ZW5jVHlwZXxmb3JtfGZvcm1BY3Rpb258Zm9ybUVuY1R5cGV8Zm9ybU1ldGhvZHxmb3JtTm9WYWxpZGF0ZXxmb3JtVGFyZ2V0fGZyYW1lQm9yZGVyfGhlYWRlcnN8aGVpZ2h0fGhpZGRlbnxoaWdofGhyZWZ8aHJlZkxhbmd8aHRtbEZvcnxodHRwRXF1aXZ8aWR8aW5wdXRNb2RlfGludGVncml0eXxpc3xrZXlQYXJhbXN8a2V5VHlwZXxraW5kfGxhYmVsfGxhbmd8bGlzdHxsb2FkaW5nfGxvb3B8bG93fG1hcmdpbkhlaWdodHxtYXJnaW5XaWR0aHxtYXh8bWF4TGVuZ3RofG1lZGlhfG1lZGlhR3JvdXB8bWV0aG9kfG1pbnxtaW5MZW5ndGh8bXVsdGlwbGV8bXV0ZWR8bmFtZXxub25jZXxub1ZhbGlkYXRlfG9wZW58b3B0aW11bXxwYXR0ZXJufHBsYWNlaG9sZGVyfHBsYXlzSW5saW5lfHBvc3RlcnxwcmVsb2FkfHByb2ZpbGV8cmFkaW9Hcm91cHxyZWFkT25seXxyZWZlcnJlclBvbGljeXxyZWx8cmVxdWlyZWR8cmV2ZXJzZWR8cm9sZXxyb3dzfHJvd1NwYW58c2FuZGJveHxzY29wZXxzY29wZWR8c2Nyb2xsaW5nfHNlYW1sZXNzfHNlbGVjdGVkfHNoYXBlfHNpemV8c2l6ZXN8c2xvdHxzcGFufHNwZWxsQ2hlY2t8c3JjfHNyY0RvY3xzcmNMYW5nfHNyY1NldHxzdGFydHxzdGVwfHN0eWxlfHN1bW1hcnl8dGFiSW5kZXh8dGFyZ2V0fHRpdGxlfHR5cGV8dXNlTWFwfHZhbHVlfHdpZHRofHdtb2RlfHdyYXB8YWJvdXR8ZGF0YXR5cGV8aW5saXN0fHByZWZpeHxwcm9wZXJ0eXxyZXNvdXJjZXx0eXBlb2Z8dm9jYWJ8YXV0b0NhcGl0YWxpemV8YXV0b0NvcnJlY3R8YXV0b1NhdmV8Y29sb3J8aW5lcnR8aXRlbVByb3B8aXRlbVNjb3BlfGl0ZW1UeXBlfGl0ZW1JRHxpdGVtUmVmfG9ufHJlc3VsdHN8c2VjdXJpdHl8dW5zZWxlY3RhYmxlfGFjY2VudEhlaWdodHxhY2N1bXVsYXRlfGFkZGl0aXZlfGFsaWdubWVudEJhc2VsaW5lfGFsbG93UmVvcmRlcnxhbHBoYWJldGljfGFtcGxpdHVkZXxhcmFiaWNGb3JtfGFzY2VudHxhdHRyaWJ1dGVOYW1lfGF0dHJpYnV0ZVR5cGV8YXV0b1JldmVyc2V8YXppbXV0aHxiYXNlRnJlcXVlbmN5fGJhc2VsaW5lU2hpZnR8YmFzZVByb2ZpbGV8YmJveHxiZWdpbnxiaWFzfGJ5fGNhbGNNb2RlfGNhcEhlaWdodHxjbGlwfGNsaXBQYXRoVW5pdHN8Y2xpcFBhdGh8Y2xpcFJ1bGV8Y29sb3JJbnRlcnBvbGF0aW9ufGNvbG9ySW50ZXJwb2xhdGlvbkZpbHRlcnN8Y29sb3JQcm9maWxlfGNvbG9yUmVuZGVyaW5nfGNvbnRlbnRTY3JpcHRUeXBlfGNvbnRlbnRTdHlsZVR5cGV8Y3Vyc29yfGN4fGN5fGR8ZGVjZWxlcmF0ZXxkZXNjZW50fGRpZmZ1c2VDb25zdGFudHxkaXJlY3Rpb258ZGlzcGxheXxkaXZpc29yfGRvbWluYW50QmFzZWxpbmV8ZHVyfGR4fGR5fGVkZ2VNb2RlfGVsZXZhdGlvbnxlbmFibGVCYWNrZ3JvdW5kfGVuZHxleHBvbmVudHxleHRlcm5hbFJlc291cmNlc1JlcXVpcmVkfGZpbGx8ZmlsbE9wYWNpdHl8ZmlsbFJ1bGV8ZmlsdGVyfGZpbHRlclJlc3xmaWx0ZXJVbml0c3xmbG9vZENvbG9yfGZsb29kT3BhY2l0eXxmb2N1c2FibGV8Zm9udEZhbWlseXxmb250U2l6ZXxmb250U2l6ZUFkanVzdHxmb250U3RyZXRjaHxmb250U3R5bGV8Zm9udFZhcmlhbnR8Zm9udFdlaWdodHxmb3JtYXR8ZnJvbXxmcnxmeHxmeXxnMXxnMnxnbHlwaE5hbWV8Z2x5cGhPcmllbnRhdGlvbkhvcml6b250YWx8Z2x5cGhPcmllbnRhdGlvblZlcnRpY2FsfGdseXBoUmVmfGdyYWRpZW50VHJhbnNmb3JtfGdyYWRpZW50VW5pdHN8aGFuZ2luZ3xob3JpekFkdlh8aG9yaXpPcmlnaW5YfGlkZW9ncmFwaGljfGltYWdlUmVuZGVyaW5nfGlufGluMnxpbnRlcmNlcHR8a3xrMXxrMnxrM3xrNHxrZXJuZWxNYXRyaXh8a2VybmVsVW5pdExlbmd0aHxrZXJuaW5nfGtleVBvaW50c3xrZXlTcGxpbmVzfGtleVRpbWVzfGxlbmd0aEFkanVzdHxsZXR0ZXJTcGFjaW5nfGxpZ2h0aW5nQ29sb3J8bGltaXRpbmdDb25lQW5nbGV8bG9jYWx8bWFya2VyRW5kfG1hcmtlck1pZHxtYXJrZXJTdGFydHxtYXJrZXJIZWlnaHR8bWFya2VyVW5pdHN8bWFya2VyV2lkdGh8bWFza3xtYXNrQ29udGVudFVuaXRzfG1hc2tVbml0c3xtYXRoZW1hdGljYWx8bW9kZXxudW1PY3RhdmVzfG9mZnNldHxvcGFjaXR5fG9wZXJhdG9yfG9yZGVyfG9yaWVudHxvcmllbnRhdGlvbnxvcmlnaW58b3ZlcmZsb3d8b3ZlcmxpbmVQb3NpdGlvbnxvdmVybGluZVRoaWNrbmVzc3xwYW5vc2UxfHBhaW50T3JkZXJ8cGF0aExlbmd0aHxwYXR0ZXJuQ29udGVudFVuaXRzfHBhdHRlcm5UcmFuc2Zvcm18cGF0dGVyblVuaXRzfHBvaW50ZXJFdmVudHN8cG9pbnRzfHBvaW50c0F0WHxwb2ludHNBdFl8cG9pbnRzQXRafHByZXNlcnZlQWxwaGF8cHJlc2VydmVBc3BlY3RSYXRpb3xwcmltaXRpdmVVbml0c3xyfHJhZGl1c3xyZWZYfHJlZll8cmVuZGVyaW5nSW50ZW50fHJlcGVhdENvdW50fHJlcGVhdER1cnxyZXF1aXJlZEV4dGVuc2lvbnN8cmVxdWlyZWRGZWF0dXJlc3xyZXN0YXJ0fHJlc3VsdHxyb3RhdGV8cnh8cnl8c2NhbGV8c2VlZHxzaGFwZVJlbmRlcmluZ3xzbG9wZXxzcGFjaW5nfHNwZWN1bGFyQ29uc3RhbnR8c3BlY3VsYXJFeHBvbmVudHxzcGVlZHxzcHJlYWRNZXRob2R8c3RhcnRPZmZzZXR8c3RkRGV2aWF0aW9ufHN0ZW1ofHN0ZW12fHN0aXRjaFRpbGVzfHN0b3BDb2xvcnxzdG9wT3BhY2l0eXxzdHJpa2V0aHJvdWdoUG9zaXRpb258c3RyaWtldGhyb3VnaFRoaWNrbmVzc3xzdHJpbmd8c3Ryb2tlfHN0cm9rZURhc2hhcnJheXxzdHJva2VEYXNob2Zmc2V0fHN0cm9rZUxpbmVjYXB8c3Ryb2tlTGluZWpvaW58c3Ryb2tlTWl0ZXJsaW1pdHxzdHJva2VPcGFjaXR5fHN0cm9rZVdpZHRofHN1cmZhY2VTY2FsZXxzeXN0ZW1MYW5ndWFnZXx0YWJsZVZhbHVlc3x0YXJnZXRYfHRhcmdldFl8dGV4dEFuY2hvcnx0ZXh0RGVjb3JhdGlvbnx0ZXh0UmVuZGVyaW5nfHRleHRMZW5ndGh8dG98dHJhbnNmb3JtfHUxfHUyfHVuZGVybGluZVBvc2l0aW9ufHVuZGVybGluZVRoaWNrbmVzc3x1bmljb2RlfHVuaWNvZGVCaWRpfHVuaWNvZGVSYW5nZXx1bml0c1BlckVtfHZBbHBoYWJldGljfHZIYW5naW5nfHZJZGVvZ3JhcGhpY3x2TWF0aGVtYXRpY2FsfHZhbHVlc3x2ZWN0b3JFZmZlY3R8dmVyc2lvbnx2ZXJ0QWR2WXx2ZXJ0T3JpZ2luWHx2ZXJ0T3JpZ2luWXx2aWV3Qm94fHZpZXdUYXJnZXR8dmlzaWJpbGl0eXx3aWR0aHN8d29yZFNwYWNpbmd8d3JpdGluZ01vZGV8eHx4SGVpZ2h0fHgxfHgyfHhDaGFubmVsU2VsZWN0b3J8eGxpbmtBY3R1YXRlfHhsaW5rQXJjcm9sZXx4bGlua0hyZWZ8eGxpbmtSb2xlfHhsaW5rU2hvd3x4bGlua1RpdGxlfHhsaW5rVHlwZXx4bWxCYXNlfHhtbG5zfHhtbG5zWGxpbmt8eG1sTGFuZ3x4bWxTcGFjZXx5fHkxfHkyfHlDaGFubmVsU2VsZWN0b3J8enx6b29tQW5kUGFufGZvcnxjbGFzc3xhdXRvZm9jdXMpfCgoW0RkXVtBYV1bVHRdW0FhXXxbQWFdW1JyXVtJaV1bQWFdfHgpLS4qKSkkLzsgLy8gaHR0cHM6Ly9lc2JlbmNoLmNvbS9iZW5jaC81YmZlZTY4YTRjZDdlNjAwOWVmNjFkMjNcblxudmFyIGluZGV4ID0gbWVtb2l6ZShmdW5jdGlvbiAocHJvcCkge1xuICByZXR1cm4gcmVhY3RQcm9wc1JlZ2V4LnRlc3QocHJvcCkgfHwgcHJvcC5jaGFyQ29kZUF0KDApID09PSAxMTFcbiAgLyogbyAqL1xuICAmJiBwcm9wLmNoYXJDb2RlQXQoMSkgPT09IDExMFxuICAvKiBuICovXG4gICYmIHByb3AuY2hhckNvZGVBdCgyKSA8IDkxO1xufVxuLyogWisxICovXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBpbmRleDtcbiIsImZ1bmN0aW9uIG1lbW9pemUoZm4pIHtcbiAgdmFyIGNhY2hlID0ge307XG4gIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgaWYgKGNhY2hlW2FyZ10gPT09IHVuZGVmaW5lZCkgY2FjaGVbYXJnXSA9IGZuKGFyZyk7XG4gICAgcmV0dXJuIGNhY2hlW2FyZ107XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1lbW9pemU7XG4iLCJmdW5jdGlvbiBzdHlsaXNfbWluIChXKSB7XG4gIGZ1bmN0aW9uIE0oZCwgYywgZSwgaCwgYSkge1xuICAgIGZvciAodmFyIG0gPSAwLCBiID0gMCwgdiA9IDAsIG4gPSAwLCBxLCBnLCB4ID0gMCwgSyA9IDAsIGssIHUgPSBrID0gcSA9IDAsIGwgPSAwLCByID0gMCwgSSA9IDAsIHQgPSAwLCBCID0gZS5sZW5ndGgsIEogPSBCIC0gMSwgeSwgZiA9ICcnLCBwID0gJycsIEYgPSAnJywgRyA9ICcnLCBDOyBsIDwgQjspIHtcbiAgICAgIGcgPSBlLmNoYXJDb2RlQXQobCk7XG4gICAgICBsID09PSBKICYmIDAgIT09IGIgKyBuICsgdiArIG0gJiYgKDAgIT09IGIgJiYgKGcgPSA0NyA9PT0gYiA/IDEwIDogNDcpLCBuID0gdiA9IG0gPSAwLCBCKyssIEorKyk7XG5cbiAgICAgIGlmICgwID09PSBiICsgbiArIHYgKyBtKSB7XG4gICAgICAgIGlmIChsID09PSBKICYmICgwIDwgciAmJiAoZiA9IGYucmVwbGFjZShOLCAnJykpLCAwIDwgZi50cmltKCkubGVuZ3RoKSkge1xuICAgICAgICAgIHN3aXRjaCAoZykge1xuICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgIGNhc2UgNTk6XG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGYgKz0gZS5jaGFyQXQobCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZyA9IDU5O1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChnKSB7XG4gICAgICAgICAgY2FzZSAxMjM6XG4gICAgICAgICAgICBmID0gZi50cmltKCk7XG4gICAgICAgICAgICBxID0gZi5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgayA9IDE7XG5cbiAgICAgICAgICAgIGZvciAodCA9ICsrbDsgbCA8IEI7KSB7XG4gICAgICAgICAgICAgIHN3aXRjaCAoZyA9IGUuY2hhckNvZGVBdChsKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTIzOlxuICAgICAgICAgICAgICAgICAgaysrO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDEyNTpcbiAgICAgICAgICAgICAgICAgIGstLTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSA0NzpcbiAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZyA9IGUuY2hhckNvZGVBdChsICsgMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0MjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0NzpcbiAgICAgICAgICAgICAgICAgICAgICBhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHUgPSBsICsgMTsgdSA8IEo7ICsrdSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGUuY2hhckNvZGVBdCh1KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoNDIgPT09IGcgJiYgNDIgPT09IGUuY2hhckNvZGVBdCh1IC0gMSkgJiYgbCArIDIgIT09IHUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbCA9IHUgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoNDcgPT09IGcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbCA9IHUgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbCA9IHU7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSA5MTpcbiAgICAgICAgICAgICAgICAgIGcrKztcblxuICAgICAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgICBnKys7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDM0OlxuICAgICAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgICBmb3IgKDsgbCsrIDwgSiAmJiBlLmNoYXJDb2RlQXQobCkgIT09IGc7KSB7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICgwID09PSBrKSBicmVhaztcbiAgICAgICAgICAgICAgbCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBrID0gZS5zdWJzdHJpbmcodCwgbCk7XG4gICAgICAgICAgICAwID09PSBxICYmIChxID0gKGYgPSBmLnJlcGxhY2UoY2EsICcnKS50cmltKCkpLmNoYXJDb2RlQXQoMCkpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHEpIHtcbiAgICAgICAgICAgICAgY2FzZSA2NDpcbiAgICAgICAgICAgICAgICAwIDwgciAmJiAoZiA9IGYucmVwbGFjZShOLCAnJykpO1xuICAgICAgICAgICAgICAgIGcgPSBmLmNoYXJDb2RlQXQoMSk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGcpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTAwOlxuICAgICAgICAgICAgICAgICAgY2FzZSAxMDk6XG4gICAgICAgICAgICAgICAgICBjYXNlIDExNTpcbiAgICAgICAgICAgICAgICAgIGNhc2UgNDU6XG4gICAgICAgICAgICAgICAgICAgIHIgPSBjO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgciA9IE87XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgayA9IE0oYywgciwgaywgZywgYSArIDEpO1xuICAgICAgICAgICAgICAgIHQgPSBrLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAwIDwgQSAmJiAociA9IFgoTywgZiwgSSksIEMgPSBIKDMsIGssIHIsIGMsIEQsIHosIHQsIGcsIGEsIGgpLCBmID0gci5qb2luKCcnKSwgdm9pZCAwICE9PSBDICYmIDAgPT09ICh0ID0gKGsgPSBDLnRyaW0oKSkubGVuZ3RoKSAmJiAoZyA9IDAsIGsgPSAnJykpO1xuICAgICAgICAgICAgICAgIGlmICgwIDwgdCkgc3dpdGNoIChnKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIDExNTpcbiAgICAgICAgICAgICAgICAgICAgZiA9IGYucmVwbGFjZShkYSwgZWEpO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIDEwMDpcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTA5OlxuICAgICAgICAgICAgICAgICAgY2FzZSA0NTpcbiAgICAgICAgICAgICAgICAgICAgayA9IGYgKyAneycgKyBrICsgJ30nO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgY2FzZSAxMDc6XG4gICAgICAgICAgICAgICAgICAgIGYgPSBmLnJlcGxhY2UoZmEsICckMSAkMicpO1xuICAgICAgICAgICAgICAgICAgICBrID0gZiArICd7JyArIGsgKyAnfSc7XG4gICAgICAgICAgICAgICAgICAgIGsgPSAxID09PSB3IHx8IDIgPT09IHcgJiYgTCgnQCcgKyBrLCAzKSA/ICdALXdlYmtpdC0nICsgayArICdAJyArIGsgOiAnQCcgKyBrO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgayA9IGYgKyBrLCAxMTIgPT09IGggJiYgKGsgPSAocCArPSBrLCAnJykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBrID0gJyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBrID0gTShjLCBYKGMsIGYsIEkpLCBrLCBoLCBhICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEYgKz0gaztcbiAgICAgICAgICAgIGsgPSBJID0gciA9IHUgPSBxID0gMDtcbiAgICAgICAgICAgIGYgPSAnJztcbiAgICAgICAgICAgIGcgPSBlLmNoYXJDb2RlQXQoKytsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAxMjU6XG4gICAgICAgICAgY2FzZSA1OTpcbiAgICAgICAgICAgIGYgPSAoMCA8IHIgPyBmLnJlcGxhY2UoTiwgJycpIDogZikudHJpbSgpO1xuICAgICAgICAgICAgaWYgKDEgPCAodCA9IGYubGVuZ3RoKSkgc3dpdGNoICgwID09PSB1ICYmIChxID0gZi5jaGFyQ29kZUF0KDApLCA0NSA9PT0gcSB8fCA5NiA8IHEgJiYgMTIzID4gcSkgJiYgKHQgPSAoZiA9IGYucmVwbGFjZSgnICcsICc6JykpLmxlbmd0aCksIDAgPCBBICYmIHZvaWQgMCAhPT0gKEMgPSBIKDEsIGYsIGMsIGQsIEQsIHosIHAubGVuZ3RoLCBoLCBhLCBoKSkgJiYgMCA9PT0gKHQgPSAoZiA9IEMudHJpbSgpKS5sZW5ndGgpICYmIChmID0gJ1xceDAwXFx4MDAnKSwgcSA9IGYuY2hhckNvZGVBdCgwKSwgZyA9IGYuY2hhckNvZGVBdCgxKSwgcSkge1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgY2FzZSA2NDpcbiAgICAgICAgICAgICAgICBpZiAoMTA1ID09PSBnIHx8IDk5ID09PSBnKSB7XG4gICAgICAgICAgICAgICAgICBHICs9IGYgKyBlLmNoYXJBdChsKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIDU4ICE9PSBmLmNoYXJDb2RlQXQodCAtIDEpICYmIChwICs9IFAoZiwgcSwgZywgZi5jaGFyQ29kZUF0KDIpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBJID0gciA9IHUgPSBxID0gMDtcbiAgICAgICAgICAgIGYgPSAnJztcbiAgICAgICAgICAgIGcgPSBlLmNoYXJDb2RlQXQoKytsKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKGcpIHtcbiAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICA0NyA9PT0gYiA/IGIgPSAwIDogMCA9PT0gMSArIHEgJiYgMTA3ICE9PSBoICYmIDAgPCBmLmxlbmd0aCAmJiAociA9IDEsIGYgKz0gJ1xceDAwJyk7XG4gICAgICAgICAgMCA8IEEgKiBZICYmIEgoMCwgZiwgYywgZCwgRCwgeiwgcC5sZW5ndGgsIGgsIGEsIGgpO1xuICAgICAgICAgIHogPSAxO1xuICAgICAgICAgIEQrKztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDU5OlxuICAgICAgICBjYXNlIDEyNTpcbiAgICAgICAgICBpZiAoMCA9PT0gYiArIG4gKyB2ICsgbSkge1xuICAgICAgICAgICAgeisrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgeisrO1xuICAgICAgICAgIHkgPSBlLmNoYXJBdChsKTtcblxuICAgICAgICAgIHN3aXRjaCAoZykge1xuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgaWYgKDAgPT09IG4gKyBtICsgYikgc3dpdGNoICh4KSB7XG4gICAgICAgICAgICAgICAgY2FzZSA0NDpcbiAgICAgICAgICAgICAgICBjYXNlIDU4OlxuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICAgICAgeSA9ICcnO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgMzIgIT09IGcgJiYgKHkgPSAnICcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgIHkgPSAnXFxcXDAnO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAxMjpcbiAgICAgICAgICAgICAgeSA9ICdcXFxcZic7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICB5ID0gJ1xcXFx2JztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgIDAgPT09IG4gKyBiICsgbSAmJiAociA9IEkgPSAxLCB5ID0gJ1xcZicgKyB5KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTA4OlxuICAgICAgICAgICAgICBpZiAoMCA9PT0gbiArIGIgKyBtICsgRSAmJiAwIDwgdSkgc3dpdGNoIChsIC0gdSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgIDExMiA9PT0geCAmJiA1OCA9PT0gZS5jaGFyQ29kZUF0KGwgLSAzKSAmJiAoRSA9IHgpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgMTExID09PSBLICYmIChFID0gSyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNTg6XG4gICAgICAgICAgICAgIDAgPT09IG4gKyBiICsgbSAmJiAodSA9IGwpO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA0NDpcbiAgICAgICAgICAgICAgMCA9PT0gYiArIHYgKyBuICsgbSAmJiAociA9IDEsIHkgKz0gJ1xccicpO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAzNDpcbiAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgIDAgPT09IGIgJiYgKG4gPSBuID09PSBnID8gMCA6IDAgPT09IG4gPyBnIDogbik7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDkxOlxuICAgICAgICAgICAgICAwID09PSBuICsgYiArIHYgJiYgbSsrO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA5MzpcbiAgICAgICAgICAgICAgMCA9PT0gbiArIGIgKyB2ICYmIG0tLTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDE6XG4gICAgICAgICAgICAgIDAgPT09IG4gKyBiICsgbSAmJiB2LS07XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICBpZiAoMCA9PT0gbiArIGIgKyBtKSB7XG4gICAgICAgICAgICAgICAgaWYgKDAgPT09IHEpIHN3aXRjaCAoMiAqIHggKyAzICogSykge1xuICAgICAgICAgICAgICAgICAgY2FzZSA1MzM6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBxID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdisrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNjQ6XG4gICAgICAgICAgICAgIDAgPT09IGIgKyB2ICsgbiArIG0gKyB1ICsgayAmJiAoayA9IDEpO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA0MjpcbiAgICAgICAgICAgIGNhc2UgNDc6XG4gICAgICAgICAgICAgIGlmICghKDAgPCBuICsgbSArIHYpKSBzd2l0Y2ggKGIpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICBzd2l0Y2ggKDIgKiBnICsgMyAqIGUuY2hhckNvZGVBdChsICsgMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyMzU6XG4gICAgICAgICAgICAgICAgICAgICAgYiA9IDQ3O1xuICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjIwOlxuICAgICAgICAgICAgICAgICAgICAgIHQgPSBsLCBiID0gNDI7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSA0MjpcbiAgICAgICAgICAgICAgICAgIDQ3ID09PSBnICYmIDQyID09PSB4ICYmIHQgKyAyICE9PSBsICYmICgzMyA9PT0gZS5jaGFyQ29kZUF0KHQgKyAyKSAmJiAocCArPSBlLnN1YnN0cmluZyh0LCBsICsgMSkpLCB5ID0gJycsIGIgPSAwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIDAgPT09IGIgJiYgKGYgKz0geSk7XG4gICAgICB9XG5cbiAgICAgIEsgPSB4O1xuICAgICAgeCA9IGc7XG4gICAgICBsKys7XG4gICAgfVxuXG4gICAgdCA9IHAubGVuZ3RoO1xuXG4gICAgaWYgKDAgPCB0KSB7XG4gICAgICByID0gYztcbiAgICAgIGlmICgwIDwgQSAmJiAoQyA9IEgoMiwgcCwgciwgZCwgRCwgeiwgdCwgaCwgYSwgaCksIHZvaWQgMCAhPT0gQyAmJiAwID09PSAocCA9IEMpLmxlbmd0aCkpIHJldHVybiBHICsgcCArIEY7XG4gICAgICBwID0gci5qb2luKCcsJykgKyAneycgKyBwICsgJ30nO1xuXG4gICAgICBpZiAoMCAhPT0gdyAqIEUpIHtcbiAgICAgICAgMiAhPT0gdyB8fCBMKHAsIDIpIHx8IChFID0gMCk7XG5cbiAgICAgICAgc3dpdGNoIChFKSB7XG4gICAgICAgICAgY2FzZSAxMTE6XG4gICAgICAgICAgICBwID0gcC5yZXBsYWNlKGhhLCAnOi1tb3otJDEnKSArIHA7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMTEyOlxuICAgICAgICAgICAgcCA9IHAucmVwbGFjZShRLCAnOjotd2Via2l0LWlucHV0LSQxJykgKyBwLnJlcGxhY2UoUSwgJzo6LW1vei0kMScpICsgcC5yZXBsYWNlKFEsICc6LW1zLWlucHV0LSQxJykgKyBwO1xuICAgICAgICB9XG5cbiAgICAgICAgRSA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIEcgKyBwICsgRjtcbiAgfVxuXG4gIGZ1bmN0aW9uIFgoZCwgYywgZSkge1xuICAgIHZhciBoID0gYy50cmltKCkuc3BsaXQoaWEpO1xuICAgIGMgPSBoO1xuICAgIHZhciBhID0gaC5sZW5ndGgsXG4gICAgICAgIG0gPSBkLmxlbmd0aDtcblxuICAgIHN3aXRjaCAobSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgY2FzZSAxOlxuICAgICAgICB2YXIgYiA9IDA7XG5cbiAgICAgICAgZm9yIChkID0gMCA9PT0gbSA/ICcnIDogZFswXSArICcgJzsgYiA8IGE7ICsrYikge1xuICAgICAgICAgIGNbYl0gPSBaKGQsIGNbYl0sIGUpLnRyaW0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgdiA9IGIgPSAwO1xuXG4gICAgICAgIGZvciAoYyA9IFtdOyBiIDwgYTsgKytiKSB7XG4gICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBtOyArK24pIHtcbiAgICAgICAgICAgIGNbdisrXSA9IFooZFtuXSArICcgJywgaFtiXSwgZSkudHJpbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGM7XG4gIH1cblxuICBmdW5jdGlvbiBaKGQsIGMsIGUpIHtcbiAgICB2YXIgaCA9IGMuY2hhckNvZGVBdCgwKTtcbiAgICAzMyA+IGggJiYgKGggPSAoYyA9IGMudHJpbSgpKS5jaGFyQ29kZUF0KDApKTtcblxuICAgIHN3aXRjaCAoaCkge1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgcmV0dXJuIGMucmVwbGFjZShGLCAnJDEnICsgZC50cmltKCkpO1xuXG4gICAgICBjYXNlIDU4OlxuICAgICAgICByZXR1cm4gZC50cmltKCkgKyBjLnJlcGxhY2UoRiwgJyQxJyArIGQudHJpbSgpKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKDAgPCAxICogZSAmJiAwIDwgYy5pbmRleE9mKCdcXGYnKSkgcmV0dXJuIGMucmVwbGFjZShGLCAoNTggPT09IGQuY2hhckNvZGVBdCgwKSA/ICcnIDogJyQxJykgKyBkLnRyaW0oKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGQgKyBjO1xuICB9XG5cbiAgZnVuY3Rpb24gUChkLCBjLCBlLCBoKSB7XG4gICAgdmFyIGEgPSBkICsgJzsnLFxuICAgICAgICBtID0gMiAqIGMgKyAzICogZSArIDQgKiBoO1xuXG4gICAgaWYgKDk0NCA9PT0gbSkge1xuICAgICAgZCA9IGEuaW5kZXhPZignOicsIDkpICsgMTtcbiAgICAgIHZhciBiID0gYS5zdWJzdHJpbmcoZCwgYS5sZW5ndGggLSAxKS50cmltKCk7XG4gICAgICBiID0gYS5zdWJzdHJpbmcoMCwgZCkudHJpbSgpICsgYiArICc7JztcbiAgICAgIHJldHVybiAxID09PSB3IHx8IDIgPT09IHcgJiYgTChiLCAxKSA/ICctd2Via2l0LScgKyBiICsgYiA6IGI7XG4gICAgfVxuXG4gICAgaWYgKDAgPT09IHcgfHwgMiA9PT0gdyAmJiAhTChhLCAxKSkgcmV0dXJuIGE7XG5cbiAgICBzd2l0Y2ggKG0pIHtcbiAgICAgIGNhc2UgMTAxNTpcbiAgICAgICAgcmV0dXJuIDk3ID09PSBhLmNoYXJDb2RlQXQoMTApID8gJy13ZWJraXQtJyArIGEgKyBhIDogYTtcblxuICAgICAgY2FzZSA5NTE6XG4gICAgICAgIHJldHVybiAxMTYgPT09IGEuY2hhckNvZGVBdCgzKSA/ICctd2Via2l0LScgKyBhICsgYSA6IGE7XG5cbiAgICAgIGNhc2UgOTYzOlxuICAgICAgICByZXR1cm4gMTEwID09PSBhLmNoYXJDb2RlQXQoNSkgPyAnLXdlYmtpdC0nICsgYSArIGEgOiBhO1xuXG4gICAgICBjYXNlIDEwMDk6XG4gICAgICAgIGlmICgxMDAgIT09IGEuY2hhckNvZGVBdCg0KSkgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTY5OlxuICAgICAgY2FzZSA5NDI6XG4gICAgICAgIHJldHVybiAnLXdlYmtpdC0nICsgYSArIGE7XG5cbiAgICAgIGNhc2UgOTc4OlxuICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyAnLW1vei0nICsgYSArIGE7XG5cbiAgICAgIGNhc2UgMTAxOTpcbiAgICAgIGNhc2UgOTgzOlxuICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyAnLW1vei0nICsgYSArICctbXMtJyArIGEgKyBhO1xuXG4gICAgICBjYXNlIDg4MzpcbiAgICAgICAgaWYgKDQ1ID09PSBhLmNoYXJDb2RlQXQoOCkpIHJldHVybiAnLXdlYmtpdC0nICsgYSArIGE7XG4gICAgICAgIGlmICgwIDwgYS5pbmRleE9mKCdpbWFnZS1zZXQoJywgMTEpKSByZXR1cm4gYS5yZXBsYWNlKGphLCAnJDEtd2Via2l0LSQyJykgKyBhO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA5MzI6XG4gICAgICAgIGlmICg0NSA9PT0gYS5jaGFyQ29kZUF0KDQpKSBzd2l0Y2ggKGEuY2hhckNvZGVBdCg1KSkge1xuICAgICAgICAgIGNhc2UgMTAzOlxuICAgICAgICAgICAgcmV0dXJuICctd2Via2l0LWJveC0nICsgYS5yZXBsYWNlKCctZ3JvdycsICcnKSArICctd2Via2l0LScgKyBhICsgJy1tcy0nICsgYS5yZXBsYWNlKCdncm93JywgJ3Bvc2l0aXZlJykgKyBhO1xuXG4gICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyAnLW1zLScgKyBhLnJlcGxhY2UoJ3NocmluaycsICduZWdhdGl2ZScpICsgYTtcblxuICAgICAgICAgIGNhc2UgOTg6XG4gICAgICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyAnLW1zLScgKyBhLnJlcGxhY2UoJ2Jhc2lzJywgJ3ByZWZlcnJlZC1zaXplJykgKyBhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnLXdlYmtpdC0nICsgYSArICctbXMtJyArIGEgKyBhO1xuXG4gICAgICBjYXNlIDk2NDpcbiAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tcy1mbGV4LScgKyBhICsgYTtcblxuICAgICAgY2FzZSAxMDIzOlxuICAgICAgICBpZiAoOTkgIT09IGEuY2hhckNvZGVBdCg4KSkgYnJlYWs7XG4gICAgICAgIGIgPSBhLnN1YnN0cmluZyhhLmluZGV4T2YoJzonLCAxNSkpLnJlcGxhY2UoJ2ZsZXgtJywgJycpLnJlcGxhY2UoJ3NwYWNlLWJldHdlZW4nLCAnanVzdGlmeScpO1xuICAgICAgICByZXR1cm4gJy13ZWJraXQtYm94LXBhY2snICsgYiArICctd2Via2l0LScgKyBhICsgJy1tcy1mbGV4LXBhY2snICsgYiArIGE7XG5cbiAgICAgIGNhc2UgMTAwNTpcbiAgICAgICAgcmV0dXJuIGthLnRlc3QoYSkgPyBhLnJlcGxhY2UoYWEsICc6LXdlYmtpdC0nKSArIGEucmVwbGFjZShhYSwgJzotbW96LScpICsgYSA6IGE7XG5cbiAgICAgIGNhc2UgMWUzOlxuICAgICAgICBiID0gYS5zdWJzdHJpbmcoMTMpLnRyaW0oKTtcbiAgICAgICAgYyA9IGIuaW5kZXhPZignLScpICsgMTtcblxuICAgICAgICBzd2l0Y2ggKGIuY2hhckNvZGVBdCgwKSArIGIuY2hhckNvZGVBdChjKSkge1xuICAgICAgICAgIGNhc2UgMjI2OlxuICAgICAgICAgICAgYiA9IGEucmVwbGFjZShHLCAndGInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAyMzI6XG4gICAgICAgICAgICBiID0gYS5yZXBsYWNlKEcsICd0Yi1ybCcpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDIyMDpcbiAgICAgICAgICAgIGIgPSBhLnJlcGxhY2UoRywgJ2xyJyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gYTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnLXdlYmtpdC0nICsgYSArICctbXMtJyArIGIgKyBhO1xuXG4gICAgICBjYXNlIDEwMTc6XG4gICAgICAgIGlmICgtMSA9PT0gYS5pbmRleE9mKCdzdGlja3knLCA5KSkgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTc1OlxuICAgICAgICBjID0gKGEgPSBkKS5sZW5ndGggLSAxMDtcbiAgICAgICAgYiA9ICgzMyA9PT0gYS5jaGFyQ29kZUF0KGMpID8gYS5zdWJzdHJpbmcoMCwgYykgOiBhKS5zdWJzdHJpbmcoZC5pbmRleE9mKCc6JywgNykgKyAxKS50cmltKCk7XG5cbiAgICAgICAgc3dpdGNoIChtID0gYi5jaGFyQ29kZUF0KDApICsgKGIuY2hhckNvZGVBdCg3KSB8IDApKSB7XG4gICAgICAgICAgY2FzZSAyMDM6XG4gICAgICAgICAgICBpZiAoMTExID4gYi5jaGFyQ29kZUF0KDgpKSBicmVhaztcblxuICAgICAgICAgIGNhc2UgMTE1OlxuICAgICAgICAgICAgYSA9IGEucmVwbGFjZShiLCAnLXdlYmtpdC0nICsgYikgKyAnOycgKyBhO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDIwNzpcbiAgICAgICAgICBjYXNlIDEwMjpcbiAgICAgICAgICAgIGEgPSBhLnJlcGxhY2UoYiwgJy13ZWJraXQtJyArICgxMDIgPCBtID8gJ2lubGluZS0nIDogJycpICsgJ2JveCcpICsgJzsnICsgYS5yZXBsYWNlKGIsICctd2Via2l0LScgKyBiKSArICc7JyArIGEucmVwbGFjZShiLCAnLW1zLScgKyBiICsgJ2JveCcpICsgJzsnICsgYTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhICsgJzsnO1xuXG4gICAgICBjYXNlIDkzODpcbiAgICAgICAgaWYgKDQ1ID09PSBhLmNoYXJDb2RlQXQoNSkpIHN3aXRjaCAoYS5jaGFyQ29kZUF0KDYpKSB7XG4gICAgICAgICAgY2FzZSAxMDU6XG4gICAgICAgICAgICByZXR1cm4gYiA9IGEucmVwbGFjZSgnLWl0ZW1zJywgJycpLCAnLXdlYmtpdC0nICsgYSArICctd2Via2l0LWJveC0nICsgYiArICctbXMtZmxleC0nICsgYiArIGE7XG5cbiAgICAgICAgICBjYXNlIDExNTpcbiAgICAgICAgICAgIHJldHVybiAnLXdlYmtpdC0nICsgYSArICctbXMtZmxleC1pdGVtLScgKyBhLnJlcGxhY2UoYmEsICcnKSArIGE7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tcy1mbGV4LWxpbmUtcGFjaycgKyBhLnJlcGxhY2UoJ2FsaWduLWNvbnRlbnQnLCAnJykucmVwbGFjZShiYSwgJycpICsgYTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA5NzM6XG4gICAgICBjYXNlIDk4OTpcbiAgICAgICAgaWYgKDQ1ICE9PSBhLmNoYXJDb2RlQXQoMykgfHwgMTIyID09PSBhLmNoYXJDb2RlQXQoNCkpIGJyZWFrO1xuXG4gICAgICBjYXNlIDkzMTpcbiAgICAgIGNhc2UgOTUzOlxuICAgICAgICBpZiAoITAgPT09IGxhLnRlc3QoZCkpIHJldHVybiAxMTUgPT09IChiID0gZC5zdWJzdHJpbmcoZC5pbmRleE9mKCc6JykgKyAxKSkuY2hhckNvZGVBdCgwKSA/IFAoZC5yZXBsYWNlKCdzdHJldGNoJywgJ2ZpbGwtYXZhaWxhYmxlJyksIGMsIGUsIGgpLnJlcGxhY2UoJzpmaWxsLWF2YWlsYWJsZScsICc6c3RyZXRjaCcpIDogYS5yZXBsYWNlKGIsICctd2Via2l0LScgKyBiKSArIGEucmVwbGFjZShiLCAnLW1vei0nICsgYi5yZXBsYWNlKCdmaWxsLScsICcnKSkgKyBhO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSA5NjI6XG4gICAgICAgIGlmIChhID0gJy13ZWJraXQtJyArIGEgKyAoMTAyID09PSBhLmNoYXJDb2RlQXQoNSkgPyAnLW1zLScgKyBhIDogJycpICsgYSwgMjExID09PSBlICsgaCAmJiAxMDUgPT09IGEuY2hhckNvZGVBdCgxMykgJiYgMCA8IGEuaW5kZXhPZigndHJhbnNmb3JtJywgMTApKSByZXR1cm4gYS5zdWJzdHJpbmcoMCwgYS5pbmRleE9mKCc7JywgMjcpICsgMSkucmVwbGFjZShtYSwgJyQxLXdlYmtpdC0kMicpICsgYTtcbiAgICB9XG5cbiAgICByZXR1cm4gYTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEwoZCwgYykge1xuICAgIHZhciBlID0gZC5pbmRleE9mKDEgPT09IGMgPyAnOicgOiAneycpLFxuICAgICAgICBoID0gZC5zdWJzdHJpbmcoMCwgMyAhPT0gYyA/IGUgOiAxMCk7XG4gICAgZSA9IGQuc3Vic3RyaW5nKGUgKyAxLCBkLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiBSKDIgIT09IGMgPyBoIDogaC5yZXBsYWNlKG5hLCAnJDEnKSwgZSwgYyk7XG4gIH1cblxuICBmdW5jdGlvbiBlYShkLCBjKSB7XG4gICAgdmFyIGUgPSBQKGMsIGMuY2hhckNvZGVBdCgwKSwgYy5jaGFyQ29kZUF0KDEpLCBjLmNoYXJDb2RlQXQoMikpO1xuICAgIHJldHVybiBlICE9PSBjICsgJzsnID8gZS5yZXBsYWNlKG9hLCAnIG9yICgkMSknKS5zdWJzdHJpbmcoNCkgOiAnKCcgKyBjICsgJyknO1xuICB9XG5cbiAgZnVuY3Rpb24gSChkLCBjLCBlLCBoLCBhLCBtLCBiLCB2LCBuLCBxKSB7XG4gICAgZm9yICh2YXIgZyA9IDAsIHggPSBjLCB3OyBnIDwgQTsgKytnKSB7XG4gICAgICBzd2l0Y2ggKHcgPSBTW2ddLmNhbGwoQiwgZCwgeCwgZSwgaCwgYSwgbSwgYiwgdiwgbiwgcSkpIHtcbiAgICAgICAgY2FzZSB2b2lkIDA6XG4gICAgICAgIGNhc2UgITE6XG4gICAgICAgIGNhc2UgITA6XG4gICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHggPSB3O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh4ICE9PSBjKSByZXR1cm4geDtcbiAgfVxuXG4gIGZ1bmN0aW9uIFQoZCkge1xuICAgIHN3aXRjaCAoZCkge1xuICAgICAgY2FzZSB2b2lkIDA6XG4gICAgICBjYXNlIG51bGw6XG4gICAgICAgIEEgPSBTLmxlbmd0aCA9IDA7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGQpIFNbQSsrXSA9IGQ7ZWxzZSBpZiAoJ29iamVjdCcgPT09IHR5cGVvZiBkKSBmb3IgKHZhciBjID0gMCwgZSA9IGQubGVuZ3RoOyBjIDwgZTsgKytjKSB7XG4gICAgICAgICAgVChkW2NdKTtcbiAgICAgICAgfSBlbHNlIFkgPSAhIWQgfCAwO1xuICAgIH1cblxuICAgIHJldHVybiBUO1xuICB9XG5cbiAgZnVuY3Rpb24gVShkKSB7XG4gICAgZCA9IGQucHJlZml4O1xuICAgIHZvaWQgMCAhPT0gZCAmJiAoUiA9IG51bGwsIGQgPyAnZnVuY3Rpb24nICE9PSB0eXBlb2YgZCA/IHcgPSAxIDogKHcgPSAyLCBSID0gZCkgOiB3ID0gMCk7XG4gICAgcmV0dXJuIFU7XG4gIH1cblxuICBmdW5jdGlvbiBCKGQsIGMpIHtcbiAgICB2YXIgZSA9IGQ7XG4gICAgMzMgPiBlLmNoYXJDb2RlQXQoMCkgJiYgKGUgPSBlLnRyaW0oKSk7XG4gICAgViA9IGU7XG4gICAgZSA9IFtWXTtcblxuICAgIGlmICgwIDwgQSkge1xuICAgICAgdmFyIGggPSBIKC0xLCBjLCBlLCBlLCBELCB6LCAwLCAwLCAwLCAwKTtcbiAgICAgIHZvaWQgMCAhPT0gaCAmJiAnc3RyaW5nJyA9PT0gdHlwZW9mIGggJiYgKGMgPSBoKTtcbiAgICB9XG5cbiAgICB2YXIgYSA9IE0oTywgZSwgYywgMCwgMCk7XG4gICAgMCA8IEEgJiYgKGggPSBIKC0yLCBhLCBlLCBlLCBELCB6LCBhLmxlbmd0aCwgMCwgMCwgMCksIHZvaWQgMCAhPT0gaCAmJiAoYSA9IGgpKTtcbiAgICBWID0gJyc7XG4gICAgRSA9IDA7XG4gICAgeiA9IEQgPSAxO1xuICAgIHJldHVybiBhO1xuICB9XG5cbiAgdmFyIGNhID0gL15cXDArL2csXG4gICAgICBOID0gL1tcXDBcXHJcXGZdL2csXG4gICAgICBhYSA9IC86ICovZyxcbiAgICAgIGthID0gL3pvb3xncmEvLFxuICAgICAgbWEgPSAvKFssOiBdKSh0cmFuc2Zvcm0pL2csXG4gICAgICBpYSA9IC8sXFxyKz8vZyxcbiAgICAgIEYgPSAvKFtcXHRcXHJcXG4gXSkqXFxmPyYvZyxcbiAgICAgIGZhID0gL0Aoa1xcdyspXFxzKihcXFMqKVxccyovLFxuICAgICAgUSA9IC86OihwbGFjZSkvZyxcbiAgICAgIGhhID0gLzoocmVhZC1vbmx5KS9nLFxuICAgICAgRyA9IC9bc3ZoXVxcdystW3RibHJdezJ9LyxcbiAgICAgIGRhID0gL1xcKFxccyooLiopXFxzKlxcKS9nLFxuICAgICAgb2EgPSAvKFtcXHNcXFNdKj8pOy9nLFxuICAgICAgYmEgPSAvLXNlbGZ8ZmxleC0vZyxcbiAgICAgIG5hID0gL1teXSo/KDpbcnBdW2VsXWFbXFx3LV0rKVteXSovLFxuICAgICAgbGEgPSAvc3RyZXRjaHw6XFxzKlxcdytcXC0oPzpjb250ZXxhdmFpbCkvLFxuICAgICAgamEgPSAvKFteLV0pKGltYWdlLXNldFxcKCkvLFxuICAgICAgeiA9IDEsXG4gICAgICBEID0gMSxcbiAgICAgIEUgPSAwLFxuICAgICAgdyA9IDEsXG4gICAgICBPID0gW10sXG4gICAgICBTID0gW10sXG4gICAgICBBID0gMCxcbiAgICAgIFIgPSBudWxsLFxuICAgICAgWSA9IDAsXG4gICAgICBWID0gJyc7XG4gIEIudXNlID0gVDtcbiAgQi5zZXQgPSBVO1xuICB2b2lkIDAgIT09IFcgJiYgVShXKTtcbiAgcmV0dXJuIEI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0eWxpc19taW47XG4iLCJ2YXIgdW5pdGxlc3NLZXlzID0ge1xuICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogMSxcbiAgYm9yZGVySW1hZ2VPdXRzZXQ6IDEsXG4gIGJvcmRlckltYWdlU2xpY2U6IDEsXG4gIGJvcmRlckltYWdlV2lkdGg6IDEsXG4gIGJveEZsZXg6IDEsXG4gIGJveEZsZXhHcm91cDogMSxcbiAgYm94T3JkaW5hbEdyb3VwOiAxLFxuICBjb2x1bW5Db3VudDogMSxcbiAgY29sdW1uczogMSxcbiAgZmxleDogMSxcbiAgZmxleEdyb3c6IDEsXG4gIGZsZXhQb3NpdGl2ZTogMSxcbiAgZmxleFNocmluazogMSxcbiAgZmxleE5lZ2F0aXZlOiAxLFxuICBmbGV4T3JkZXI6IDEsXG4gIGdyaWRSb3c6IDEsXG4gIGdyaWRSb3dFbmQ6IDEsXG4gIGdyaWRSb3dTcGFuOiAxLFxuICBncmlkUm93U3RhcnQ6IDEsXG4gIGdyaWRDb2x1bW46IDEsXG4gIGdyaWRDb2x1bW5FbmQ6IDEsXG4gIGdyaWRDb2x1bW5TcGFuOiAxLFxuICBncmlkQ29sdW1uU3RhcnQ6IDEsXG4gIG1zR3JpZFJvdzogMSxcbiAgbXNHcmlkUm93U3BhbjogMSxcbiAgbXNHcmlkQ29sdW1uOiAxLFxuICBtc0dyaWRDb2x1bW5TcGFuOiAxLFxuICBmb250V2VpZ2h0OiAxLFxuICBsaW5lSGVpZ2h0OiAxLFxuICBvcGFjaXR5OiAxLFxuICBvcmRlcjogMSxcbiAgb3JwaGFuczogMSxcbiAgdGFiU2l6ZTogMSxcbiAgd2lkb3dzOiAxLFxuICB6SW5kZXg6IDEsXG4gIHpvb206IDEsXG4gIFdlYmtpdExpbmVDbGFtcDogMSxcbiAgLy8gU1ZHLXJlbGF0ZWQgcHJvcGVydGllc1xuICBmaWxsT3BhY2l0eTogMSxcbiAgZmxvb2RPcGFjaXR5OiAxLFxuICBzdG9wT3BhY2l0eTogMSxcbiAgc3Ryb2tlRGFzaGFycmF5OiAxLFxuICBzdHJva2VEYXNob2Zmc2V0OiAxLFxuICBzdHJva2VNaXRlcmxpbWl0OiAxLFxuICBzdHJva2VPcGFjaXR5OiAxLFxuICBzdHJva2VXaWR0aDogMVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdW5pdGxlc3NLZXlzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLklucHV0TnVtYmVycyA9IGV4cG9ydHMuRE5BID0gZXhwb3J0cy5Eb3duQXJyb3cgPSBleHBvcnRzLlVwQXJyb3cgPSBleHBvcnRzLkZsYWcgPSBleHBvcnRzLldyZW5jaCA9IGV4cG9ydHMuU3Bpbm5lciA9IGV4cG9ydHMuV2FybmluZyA9IGV4cG9ydHMuUGx1cyA9IGV4cG9ydHMuQ3Jvc3NNYXJrID0gZXhwb3J0cy5UcmFzaENhbiA9IGV4cG9ydHMuUGVuY2lsID0gZXhwb3J0cy5IZWF2eUNoZWNrTWFyayA9IHZvaWQgMDtcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIGluZGV4LnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjEsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDA5LzMwLzIwMjAgLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxudmFyIEhlYXZ5Q2hlY2tNYXJrID0gJ+KclO+4jyc7XG5leHBvcnRzLkhlYXZ5Q2hlY2tNYXJrID0gSGVhdnlDaGVja01hcms7XG52YXIgUGVuY2lsID0gJ+Kcj++4jyc7XG5leHBvcnRzLlBlbmNpbCA9IFBlbmNpbDtcbnZhciBUcmFzaENhbiA9ICfwn5eR77iPJztcbmV4cG9ydHMuVHJhc2hDYW4gPSBUcmFzaENhbjtcbnZhciBDcm9zc01hcmsgPSAn4p2MJztcbmV4cG9ydHMuQ3Jvc3NNYXJrID0gQ3Jvc3NNYXJrO1xudmFyIFBsdXMgPSAn4p6VJztcbmV4cG9ydHMuUGx1cyA9IFBsdXM7XG52YXIgV2FybmluZyA9ICfimqDvuI8nO1xuZXhwb3J0cy5XYXJuaW5nID0gV2FybmluZztcbnZhciBTcGlubmVyID0gJ/CflIQnO1xuZXhwb3J0cy5TcGlubmVyID0gU3Bpbm5lcjtcbnZhciBXcmVuY2ggPSAn8J+Upyc7XG5leHBvcnRzLldyZW5jaCA9IFdyZW5jaDtcbnZhciBGbGFnID0gJ/CfmqknO1xuZXhwb3J0cy5GbGFnID0gRmxhZztcbnZhciBVcEFycm93ID0gJ+Kshu+4jyc7XG5leHBvcnRzLlVwQXJyb3cgPSBVcEFycm93O1xudmFyIERvd25BcnJvdyA9ICfirIfvuI8nO1xuZXhwb3J0cy5Eb3duQXJyb3cgPSBEb3duQXJyb3c7XG52YXIgRE5BID0gJ/Cfp6wnO1xuZXhwb3J0cy5ETkEgPSBETkE7XG52YXIgSW5wdXROdW1iZXJzID0gJ/CflKInO1xuZXhwb3J0cy5JbnB1dE51bWJlcnMgPSBJbnB1dE51bWJlcnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBDcmVhdGVHdWlkLnRzIC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjEsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vLyAgXHJcbi8vICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDUwMzQvaG93LXRvLWNyZWF0ZS1hLWd1aWQtdXVpZFxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzA0LzIwMjEgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ3JlYXRlR3VpZCA9IHZvaWQgMDtcclxuZnVuY3Rpb24gQ3JlYXRlR3VpZCgpIHtcclxuICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XHJcbiAgICAgICAgdmFyIHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwO1xyXG4gICAgICAgIHZhciB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KTtcclxuICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLkNyZWF0ZUd1aWQgPSBDcmVhdGVHdWlkO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBHZXROb2RlU2l6ZS50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMTUvMjAyMSAtIEMuIExhY2tuZXJcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuR2V0Tm9kZVNpemUgPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIEdldE5vZGVTaXplKG5vZGUpIHtcclxuICAgIGlmIChub2RlID09PSBudWxsKVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICB9O1xyXG4gICAgdmFyIF9hID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgaGVpZ2h0ID0gX2EuaGVpZ2h0LCB3aWR0aCA9IF9hLndpZHRoLCB0b3AgPSBfYS50b3AsIGxlZnQgPSBfYS5sZWZ0O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KGhlaWdodC50b1N0cmluZygpLCAxMCksXHJcbiAgICAgICAgd2lkdGg6IHBhcnNlSW50KHdpZHRoLnRvU3RyaW5nKCksIDEwKSxcclxuICAgICAgICB0b3A6IHBhcnNlSW50KHRvcC50b1N0cmluZygpLCAxMCksXHJcbiAgICAgICAgbGVmdDogcGFyc2VJbnQobGVmdC50b1N0cmluZygpLCAxMCksXHJcbiAgICB9O1xyXG59XHJcbmV4cG9ydHMuR2V0Tm9kZVNpemUgPSBHZXROb2RlU2l6ZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgR2V0VGV4dFdpZHRoLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIxLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8wNy8yMDIxIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkdldFRleHRXaWR0aCA9IHZvaWQgMDtcclxuZnVuY3Rpb24gR2V0VGV4dFdpZHRoKGZvbnQsIGZvbnRTaXplLCB3b3JkKSB7XHJcbiAgICB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0KTtcclxuICAgIHRleHQuc3R5bGUuZm9udCA9IGZvbnQ7XHJcbiAgICB0ZXh0LnN0eWxlLmZvbnRTaXplID0gZm9udFNpemU7XHJcbiAgICB0ZXh0LnN0eWxlLmhlaWdodCA9ICdhdXRvJztcclxuICAgIHRleHQuc3R5bGUud2lkdGggPSAnYXV0byc7XHJcbiAgICB0ZXh0LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgIHRleHQuc3R5bGUud2hpdGVTcGFjZSA9ICduby13cmFwJztcclxuICAgIHRleHQuaW5uZXJIVE1MID0gd29yZDtcclxuICAgIHZhciB3aWR0aCA9IE1hdGguY2VpbCh0ZXh0LmNsaWVudFdpZHRoKTtcclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGV4dCk7XHJcbiAgICByZXR1cm4gd2lkdGg7XHJcbn1cclxuZXhwb3J0cy5HZXRUZXh0V2lkdGggPSBHZXRUZXh0V2lkdGg7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIGluZGV4LnRzIC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IO+/vSAyMDIxLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy8gIFxyXG4vLyAgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2hvdy10by1jcmVhdGUtYS1ndWlkLXV1aWRcclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8wNC8yMDIxIC0gQmlsbHkgRXJuZXN0XHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vL1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkdldE5vZGVTaXplID0gZXhwb3J0cy5HZXRUZXh0V2lkdGggPSBleHBvcnRzLkNyZWF0ZUd1aWQgPSB2b2lkIDA7XHJcbnZhciBDcmVhdGVHdWlkXzEgPSByZXF1aXJlKFwiLi9DcmVhdGVHdWlkXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDcmVhdGVHdWlkXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBDcmVhdGVHdWlkXzEuQ3JlYXRlR3VpZDsgfSB9KTtcclxudmFyIEdldFRleHRXaWR0aF8xID0gcmVxdWlyZShcIi4vR2V0VGV4dFdpZHRoXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJHZXRUZXh0V2lkdGhcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEdldFRleHRXaWR0aF8xLkdldFRleHRXaWR0aDsgfSB9KTtcclxudmFyIEdldE5vZGVTaXplXzEgPSByZXF1aXJlKFwiLi9HZXROb2RlU2l6ZVwiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiR2V0Tm9kZVNpemVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEdldE5vZGVTaXplXzEuR2V0Tm9kZVNpemU7IH0gfSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIExvYWRpbmdJY29uLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8xMS8yMDIwIC0gQ2hyaXN0b3BoIExhY2tuZXJcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG52YXIgX19tYWtlVGVtcGxhdGVPYmplY3QgPSAodGhpcyAmJiB0aGlzLl9fbWFrZVRlbXBsYXRlT2JqZWN0KSB8fCBmdW5jdGlvbiAoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcclxudmFyIHN0eWxlZF9jb21wb25lbnRzXzEgPSByZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIik7XHJcbnZhciBzcGluID0gc3R5bGVkX2NvbXBvbmVudHNfMS5rZXlmcmFtZXModGVtcGxhdGVPYmplY3RfMSB8fCAodGVtcGxhdGVPYmplY3RfMSA9IF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XFxuIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XFxuXCJdLCBbXCJcXG4gMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxcbiAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxcblwiXSkpKTtcclxudmFyIEljb24gPSBzdHlsZWRfY29tcG9uZW50c18xLmRlZmF1bHQuZGl2KHRlbXBsYXRlT2JqZWN0XzIgfHwgKHRlbXBsYXRlT2JqZWN0XzIgPSBfX21ha2VUZW1wbGF0ZU9iamVjdChbXCJcXG5cXHRhbmltYXRpb246IFwiLCBcIiAxcyBsaW5lYXIgaW5maW5pdGU7XFxuXFx0Ym9yZGVyOiBcIiwgXCJweCBzb2xpZCAjZjNmM2YzO1xcblxcdGJvcmRlci1Ub3A6IFwiLCBcInB4IHNvbGlkICM1NTU7XFxuXFx0Ym9yZGVyLVJhZGl1czogNTAlO1xcblxcdHdpZHRoOiBcIiwgXCJweDtcXG5cXHRoZWlnaHQ6IFwiLCBcInB4XFxuXCJdLCBbXCJcXG5cXHRhbmltYXRpb246IFwiLCBcIiAxcyBsaW5lYXIgaW5maW5pdGU7XFxuXFx0Ym9yZGVyOiBcIiwgXCJweCBzb2xpZCAjZjNmM2YzO1xcblxcdGJvcmRlci1Ub3A6IFwiLCBcInB4IHNvbGlkICM1NTU7XFxuXFx0Ym9yZGVyLVJhZGl1czogNTAlO1xcblxcdHdpZHRoOiBcIiwgXCJweDtcXG5cXHRoZWlnaHQ6IFwiLCBcInB4XFxuXCJdKSksIHNwaW4sIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gcHJvcHMuc2l6ZSAvIDU7IH0sIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gcHJvcHMuc2l6ZSAvIDU7IH0sIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gcHJvcHMuc2l6ZTsgfSwgZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBwcm9wcy5zaXplOyB9KTtcclxudmFyIExvYWRpbmdJY29uID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICB2YXIgaCA9IChwcm9wcy5TaXplID09PSB1bmRlZmluZWQgPyAyNSA6IHByb3BzLlNpemUpO1xyXG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IHdpZHRoOiAocHJvcHMuTGFiZWwgPT09IHVuZGVmaW5lZCA/IGggOiB1bmRlZmluZWQpLCBtYXJnaW46ICdhdXRvJyB9LCBoaWRkZW46ICFwcm9wcy5TaG93IH0sXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSWNvbiwgeyBzaXplOiBoIH0pLFxyXG4gICAgICAgICAgICBwcm9wcy5MYWJlbCAhPT0gdW5kZWZpbmVkID8gUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgcHJvcHMuTGFiZWwpIDogbnVsbCkpKTtcclxufTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gTG9hZGluZ0ljb247XHJcbnZhciB0ZW1wbGF0ZU9iamVjdF8xLCB0ZW1wbGF0ZU9iamVjdF8yO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBMb2FkaW5nU2NyZWVuLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8xMS8yMDIwIC0gQ2hyaXN0b3BoIExhY2tuZXJcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcclxudmFyIExvYWRpbmdJY29uXzEgPSByZXF1aXJlKFwiLi9Mb2FkaW5nSWNvblwiKTtcclxudmFyIExvYWRpbmdTY3JlZW4gPSBmdW5jdGlvbiAocHJvcHMpIHtcclxuICAgIHZhciB4ID0gd2luZG93LmlubmVySGVpZ2h0IC8gMiAtIDIwO1xyXG4gICAgcmV0dXJuIChwcm9wcy5TaG93ID8gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDk5ODAsXHJcbiAgICAgICAgfSB9LFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBoZWlnaHQ6ICc0MHB4Jywgd2lkdGg6ICc0MHB4JywgbWFyZ2luOiAnYXV0bycsIG1hcmdpblRvcDogeCB9IH0sXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTG9hZGluZ0ljb25fMS5kZWZhdWx0LCB7IFNob3c6IHRydWUsIFNpemU6IDQwIH0pKSkgOiBudWxsKTtcclxufTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gTG9hZGluZ1NjcmVlbjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTW9kYWwudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDEyLzI5LzIwMjAgLSBDaHJpc3RvcGggTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xyXG52YXIgVG9vbFRpcF8xID0gcmVxdWlyZShcIi4vVG9vbFRpcFwiKTtcclxudmFyIGhlbHBlcl9mdW5jdGlvbnNfMSA9IHJlcXVpcmUoXCJAZ3BhLWdlbXN0b25lL2hlbHBlci1mdW5jdGlvbnNcIik7XHJcbi8vIFByb3BzIERlc2NyaXB0aW9uOlxyXG4vLyBUaXRsZSA9PiBUaXRsZSBvZiBUaGUgTW9kYWxcclxuLy8gU2hvd1ggPT4gc2hvdyBvciBoaWRlIHRoZSBYIGJ1dHRvbiAoZGVmYXVsdCB0cnVlKVxyXG4vLyBDYWxsQmFjayA9PiBGdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiBjbG9zaW5nIHRoZSBNb2RhbCBlaXRoZXIgdGhyb3VnaCBDYW5jZWwgKGNvbmZpcm1lZD1mYWxzZSkgb3IgQWNjZXB0IEJ1dHRvbiAoY29uZmlybWVkPXRydWUpXHJcbi8vIFNob3cgPT4gV2hldGhlciB0byBzaG93IHRoZSBtb2RhbFxyXG4vLyBTaXplID0+IFNpemUgb2YgdGhlIG1vZGFsXHJcbi8vIFNob3dDYW5jZWwgPT4gV2hldGhlciB0byBzaG93IHRoZSBjYW5jZWwgYnV0dG9uXHJcbi8vIERpc2FibGVDb25maXJtID0+IERpc2FibGVzIHRoZSBDb25maXJtIGJ1dHRvblxyXG4vLyBDYW5jZWxUZXh0ID0+IFRleHQgb24gQ2FuY2VsIEJ1dHRvblxyXG4vLyBDb25maXJtIHRleHQgPT4gVGV4dCBvbiBDb25maXJtIGJ1dHRvblxyXG4vLyBDb25maXJtQnRuQ2xhc3MgPT4gQ2xhc3Mgb2YgdGhlIENvbmZpcm0gQnV0dG9uXHJcbi8vIENhbmNlbEJ0bkNsYXNzID0+PiBDbGFzcyBvZiB0aGUgQ2FuY2VsIEJ1dHRvblxyXG52YXIgTW9kYWwgPSBmdW5jdGlvbiAocHJvcHMpIHtcclxuICAgIHZhciBfYSA9IFJlYWN0LnVzZVN0YXRlKCdub25lJyksIGhvdmVyID0gX2FbMF0sIHNldEhvdmVyID0gX2FbMV07XHJcbiAgICB2YXIgX2IgPSBSZWFjdC51c2VTdGF0ZSgnJyksIGd1aWQgPSBfYlswXSwgc2V0R3VpZCA9IF9iWzFdO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZXRHdWlkKGhlbHBlcl9mdW5jdGlvbnNfMS5DcmVhdGVHdWlkKCkpO1xyXG4gICAgfSwgW10pO1xyXG4gICAgdmFyIGNvbmZpcm1CdG4gPSAocHJvcHMuQ29uZmlybVRleHQgPT09IHVuZGVmaW5lZCA/ICdTYXZlJyA6IHByb3BzLkNvbmZpcm1UZXh0KTtcclxuICAgIHZhciBjeG5CdG4gPSAocHJvcHMuQ2FuY2VsVGV4dCA9PT0gdW5kZWZpbmVkID8gJ0NhbmNlbCcgOiBwcm9wcy5DYW5jZWxUZXh0KTtcclxuICAgIHZhciBjeG5idG5DbHMgPSAnYnRuICcgKyAocHJvcHMuQ2FuY2VsQnRuQ2xhc3MgPT09IHVuZGVmaW5lZCA/ICdidG4tZGFuZ2VyJyA6IHByb3BzLkNhbmNlbEJ0bkNsYXNzKTtcclxuICAgIHZhciBjb25maXJtYnRuQ2xzID0gJ2J0biAnICsgKHByb3BzLkNvbmZpcm1CdG5DbGFzcyA9PT0gdW5kZWZpbmVkID8gJ2J0bi1wcmltYXJ5JyA6IHByb3BzLkNvbmZpcm1CdG5DbGFzcyk7XHJcbiAgICB2YXIgc2hvd0NvbmZpcm1Ub29sVGlwID0gKHByb3BzLkNvbmZpcm1TaG93VG9vbFRpcCAhPT0gdW5kZWZpbmVkICYmIHByb3BzLkNvbmZpcm1TaG93VG9vbFRpcCkgJiYgaG92ZXIgPT09ICdjb25maXJtJztcclxuICAgIHZhciBzaG93Q3huVG9vbFRpcCA9IChwcm9wcy5DYW5jZWxTaG93VG9vbFRpcCAhPT0gdW5kZWZpbmVkICYmIHByb3BzLkNhbmNlbFNob3dUb29sVGlwKSAmJiBob3ZlciA9PT0gJ2NhbmNlbCc7XHJcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtb2RhbFwiICsgKHByb3BzLlNob3cgPyBcIiBzaG93XCIgOiAnJyksIHN0eWxlOiBwcm9wcy5TaG93ID8geyBkaXNwbGF5OiAnYmxvY2snLCB6SW5kZXg6IDk5OTAgfSA6IHt9IH0sXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibW9kYWwtZGlhbG9nXCIgKyAocHJvcHMuU2l6ZSA9PT0gdW5kZWZpbmVkID8gJycgOiBwcm9wcy5TaXplID09PSAneGxnJyA/ICcnIDogKFwiIG1vZGFsLVwiICsgcHJvcHMuU2l6ZSkpLCBzdHlsZTogcHJvcHMuU2l6ZSA9PT0gJ3hsZycgPyB7IG1heFdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCAtIDEwMCB9IDoge30gfSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibW9kYWwtY29udGVudFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtb2RhbC1oZWFkZXJcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDRcIiwgeyBjbGFzc05hbWU6IFwibW9kYWwtdGl0bGVcIiB9LCBwcm9wcy5UaXRsZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlNob3dYID8gUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IHR5cGU6IFwiYnV0dG9uXCIsIGNsYXNzTmFtZTogXCJjbG9zZVwiLCBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7IHJldHVybiBwcm9wcy5DYWxsQmFjayhmYWxzZSwgZmFsc2UpOyB9IH0sIFwiXFx1MDBEN1wiKSA6IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibW9kYWwtYm9keVwiIH0sIHByb3BzLlNob3cgPyBwcm9wcy5jaGlsZHJlbiA6IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwibW9kYWwtZm9vdGVyXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IHR5cGU6IFwiYnV0dG9uXCIsIGNsYXNzTmFtZTogY29uZmlybWJ0bkNscyArICghKHByb3BzLkRpc2FibGVDb25maXJtID09PSB1bmRlZmluZWQgfHwgIXByb3BzLkRpc2FibGVDb25maXJtKSA/ICcgZGlzYWJsZWQnIDogJycpLCBcImRhdGEtdG9vbHRpcFwiOiBndWlkICsgJy1jb25maXJtJywgb25DbGljazogZnVuY3Rpb24gKCkgeyBpZiAoIShwcm9wcy5EaXNhYmxlQ29uZmlybSA9PT0gdW5kZWZpbmVkIHx8ICFwcm9wcy5EaXNhYmxlQ29uZmlybSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyBwcm9wcy5DYWxsQmFjayh0cnVlLCB0cnVlKTsgfSwgb25Nb3VzZUVudGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXRIb3ZlcignY29uZmlybScpOyB9LCBvbk1vdXNlTGVhdmU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNldEhvdmVyKCdub25lJyk7IH0gfSwgY29uZmlybUJ0biksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlNob3dDYW5jZWwgPT09IHVuZGVmaW5lZCB8fCBwcm9wcy5TaG93Q2FuY2VsID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyB0eXBlOiBcImJ1dHRvblwiLCBjbGFzc05hbWU6IGN4bmJ0bkNscyArICghKHByb3BzLkRpc2FibGVDYW5jZWwgPT09IHVuZGVmaW5lZCB8fCAhcHJvcHMuRGlzYWJsZUNhbmNlbCkgPyAnIGRpc2FibGVkJyA6ICcnKSwgXCJkYXRhLXRvb2x0aXBcIjogZ3VpZCArICctY2FuY2VsJywgb25DbGljazogZnVuY3Rpb24gKCkgeyBpZiAoIShwcm9wcy5EaXNhYmxlQ2FuY2VsID09PSB1bmRlZmluZWQgfHwgIXByb3BzLkRpc2FibGVDYW5jZWwpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47IHByb3BzLkNhbGxCYWNrKGZhbHNlLCB0cnVlKTsgfSwgb25Nb3VzZUVudGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXRIb3ZlcignY2FuY2VsJyk7IH0sIG9uTW91c2VMZWF2ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2V0SG92ZXIoJ25vbmUnKTsgfSB9LCBjeG5CdG4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbFRpcF8xLmRlZmF1bHQsIHsgU2hvdzogc2hvd0NvbmZpcm1Ub29sVGlwLCBQb3NpdGlvbjogJ3RvcCcsIFRoZW1lOiAnZGFyaycsIFRhcmdldDogZ3VpZCArICctY29uZmlybScsIFppbmRleDogOTk5OSB9LCBwcm9wcy5Db25maXJtVG9vbFRpcENvbnRlbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xUaXBfMS5kZWZhdWx0LCB7IFNob3c6IHNob3dDeG5Ub29sVGlwLCBQb3NpdGlvbjogJ3RvcCcsIFRoZW1lOiAnZGFyaycsIFRhcmdldDogZ3VpZCArICctY2FuY2VsJywgWmluZGV4OiA5OTk5IH0sIHByb3BzLkNhbmNlbFRvb2xUaXBDb250ZW50KSkpKSksXHJcbiAgICAgICAgcHJvcHMuU2hvdyA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMC41LFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgICAgICAgICAgICB6SW5kZXg6IDk5ODAsXHJcbiAgICAgICAgICAgIH0gfSkgOiBudWxsKSk7XHJcbn07XHJcbmV4cG9ydHMuZGVmYXVsdCA9IE1vZGFsO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBTZWFyY2hCYXIudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzA2LzIwMjAgLSBDaHJpc3RvcGggTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufTtcclxudmFyIF9fc3ByZWFkQXJyYXlzID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5cykgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xyXG52YXIgTW9kYWxfMSA9IHJlcXVpcmUoXCIuL01vZGFsXCIpO1xyXG52YXIgTG9hZGluZ0ljb25fMSA9IHJlcXVpcmUoXCIuL0xvYWRpbmdJY29uXCIpO1xyXG52YXIgcmVhY3RfZm9ybXNfMSA9IHJlcXVpcmUoXCJAZ3BhLWdlbXN0b25lL3JlYWN0LWZvcm1zXCIpO1xyXG52YXIgZ3BhX3N5bWJvbHNfMSA9IHJlcXVpcmUoXCJAZ3BhLWdlbXN0b25lL2dwYS1zeW1ib2xzXCIpO1xyXG5mdW5jdGlvbiBTZWFyY2hCYXIocHJvcHMpIHtcclxuICAgIHZhciBfYSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKSwgaG92ZXIgPSBfYVswXSwgc2V0SG92ZXIgPSBfYVsxXTtcclxuICAgIHZhciBfYiA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKSwgc2hvdyA9IF9iWzBdLCBzZXRTaG93ID0gX2JbMV07XHJcbiAgICB2YXIgX2MgPSBSZWFjdC51c2VTdGF0ZShmYWxzZSksIGlzTmV3ID0gX2NbMF0sIHNldElzTmV3ID0gX2NbMV07XHJcbiAgICB2YXIgX2QgPSBSZWFjdC51c2VTdGF0ZShbXSksIGZpbHRlcnMgPSBfZFswXSwgc2V0RmlsdGVycyA9IF9kWzFdO1xyXG4gICAgdmFyIF9lID0gUmVhY3QudXNlU3RhdGUoeyBGaWVsZE5hbWU6IHByb3BzLkNvbGx1bW5MaXN0WzBdLmtleSwgU2VhcmNoVGV4dDogJycsIE9wZXJhdG9yOiBwcm9wcy5Db2xsdW1uTGlzdFswXS50eXBlID09PSAnc3RyaW5nJyA/ICdMSUtFJyA6ICc9JywgVHlwZTogcHJvcHMuQ29sbHVtbkxpc3RbMF0udHlwZSB9KSwgZmlsdGVyID0gX2VbMF0sIHNldEZpbHRlciA9IF9lWzFdO1xyXG4gICAgdmFyIF9mID0gUmVhY3QudXNlU3RhdGUoXCJcIiksIHNlYXJjaCA9IF9mWzBdLCBzZXRTZWFyY2ggPSBfZlsxXTtcclxuICAgIHZhciBfZyA9IFJlYWN0LnVzZVN0YXRlKG51bGwpLCBzZWFyY2hGaWx0ZXIgPSBfZ1swXSwgc2V0U2VhcmNoRmlsdGVyID0gX2dbMV07XHJcbiAgICAvLyBVcGRhdGUgU2VhcmNoRmlsdGVyIGlmIHRoZXJlIGFyZSBhbnkgQ2hhcmFjdGVyIGFuZCBvbmx5IGRvIGl0IGV2ZXJ5IDUwMG1zIHRvIGF2b2lkIGhhbW1lcmluZyB0aGUgc2VydmVyIHdoaWxlIHR5cGluZ1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaGFuZGxlID0gbnVsbDtcclxuICAgICAgICBpZiAoc2VhcmNoLmxlbmd0aCA+IDAgJiYgcHJvcHMuZGVmYXVsdENvbGx1bW4gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgaGFuZGxlID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvcHMuZGVmYXVsdENvbGx1bW4gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICBzZXRTZWFyY2hGaWx0ZXIoeyBGaWVsZE5hbWU6IHByb3BzLmRlZmF1bHRDb2xsdW1uLmtleSwgT3BlcmF0b3I6ICdMSUtFJywgVHlwZTogcHJvcHMuZGVmYXVsdENvbGx1bW4udHlwZSwgU2VhcmNoVGV4dDogKCcqJyArIHNlYXJjaCArICcqJykgfSk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBoYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNldFNlYXJjaEZpbHRlcihudWxsKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyBpZiAoaGFuZGxlICE9PSBudWxsKVxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaGFuZGxlKTsgfTtcclxuICAgIH0sIFtzZWFyY2hdKTtcclxuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHNlYXJjaEZpbHRlciAhPT0gbnVsbClcclxuICAgICAgICAgICAgcHJvcHMuU2V0RmlsdGVyKF9fc3ByZWFkQXJyYXlzKGZpbHRlcnMsIFtzZWFyY2hGaWx0ZXJdKSk7XHJcbiAgICAgICAgaWYgKHNlYXJjaEZpbHRlciA9PT0gbnVsbClcclxuICAgICAgICAgICAgcHJvcHMuU2V0RmlsdGVyKGZpbHRlcnMpO1xyXG4gICAgfSwgW3NlYXJjaEZpbHRlcl0pO1xyXG4gICAgZnVuY3Rpb24gZGVsZXRlRmlsdGVyKGYpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSBmaWx0ZXJzLmZpbmRJbmRleChmdW5jdGlvbiAoZnMpIHsgcmV0dXJuIGZzID09PSBmOyB9KTtcclxuICAgICAgICB2YXIgZmlsdHMgPSBfX3NwcmVhZEFycmF5cyhmaWx0ZXJzKTtcclxuICAgICAgICBmaWx0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHNldEZpbHRlcnMoZmlsdHMpO1xyXG4gICAgICAgIHNldEhvdmVyKGZhbHNlKTtcclxuICAgICAgICBpZiAocHJvcHMuZGVmYXVsdENvbGx1bW4gIT09IHVuZGVmaW5lZCAmJiBzZWFyY2hGaWx0ZXIgIT09IG51bGwpXHJcbiAgICAgICAgICAgIHByb3BzLlNldEZpbHRlcihfX3NwcmVhZEFycmF5cyhmaWx0cywgW3NlYXJjaEZpbHRlcl0pKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHByb3BzLlNldEZpbHRlcihmaWx0cyk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhZGRGaWx0ZXIoKSB7XHJcbiAgICAgICAgdmFyIG9sZEZpbHRlcnMgPSBfX3NwcmVhZEFycmF5cyhmaWx0ZXJzKTtcclxuICAgICAgICB2YXIgYWRqdXN0ZWRGaWx0ZXIgPSBfX2Fzc2lnbih7fSwgZmlsdGVyKTtcclxuICAgICAgICBpZiAoYWRqdXN0ZWRGaWx0ZXIuVHlwZSA9PT0gJ3N0cmluZycgJiYgYWRqdXN0ZWRGaWx0ZXIuT3BlcmF0b3IgPT09ICdMSUtFJylcclxuICAgICAgICAgICAgYWRqdXN0ZWRGaWx0ZXIuU2VhcmNoVGV4dCA9ICcqJyArIGFkanVzdGVkRmlsdGVyLlNlYXJjaFRleHQgKyAnKic7XHJcbiAgICAgICAgb2xkRmlsdGVycy5wdXNoKGFkanVzdGVkRmlsdGVyKTtcclxuICAgICAgICBzZXRGaWx0ZXJzKG9sZEZpbHRlcnMpO1xyXG4gICAgICAgIHNldEZpbHRlcih7IEZpZWxkTmFtZTogcHJvcHMuQ29sbHVtbkxpc3RbMF0ua2V5LCBTZWFyY2hUZXh0OiAnJywgT3BlcmF0b3I6IHByb3BzLkNvbGx1bW5MaXN0WzBdLnR5cGUgPT09ICdzdHJpbmcnID8gJ0xJS0UnIDogJz0nLCBUeXBlOiBwcm9wcy5Db2xsdW1uTGlzdFswXS50eXBlIH0pO1xyXG4gICAgICAgIHNldEZpbHRlcih7IEZpZWxkTmFtZTogcHJvcHMuQ29sbHVtbkxpc3RbMF0ua2V5LCBTZWFyY2hUZXh0OiAnJywgT3BlcmF0b3I6IHByb3BzLkNvbGx1bW5MaXN0WzBdLnR5cGUgPT09ICdzdHJpbmcnID8gJ0xJS0UnIDogJz0nLCBUeXBlOiBwcm9wcy5Db2xsdW1uTGlzdFswXS50eXBlIH0pO1xyXG4gICAgICAgIGlmIChwcm9wcy5kZWZhdWx0Q29sbHVtbiAhPT0gdW5kZWZpbmVkICYmIHNlYXJjaEZpbHRlciAhPT0gbnVsbClcclxuICAgICAgICAgICAgcHJvcHMuU2V0RmlsdGVyKF9fc3ByZWFkQXJyYXlzKG9sZEZpbHRlcnMsIFtzZWFyY2hGaWx0ZXJdKSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBwcm9wcy5TZXRGaWx0ZXIob2xkRmlsdGVycyk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBlZGl0RmlsdGVyKGluZGV4KSB7XHJcbiAgICAgICAgc2V0SXNOZXcoZmFsc2UpO1xyXG4gICAgICAgIHZhciBvbGRGaWx0ZXJzID0gX19zcHJlYWRBcnJheXMoZmlsdGVycyk7XHJcbiAgICAgICAgdmFyIGZpbHQgPSBvbGRGaWx0ZXJzW2luZGV4XTtcclxuICAgICAgICBvbGRGaWx0ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgaWYgKGZpbHQuVHlwZSA9PT0gJ3N0cmluZycgJiYgZmlsdC5PcGVyYXRvciA9PT0gJ0xJS0UnKVxyXG4gICAgICAgICAgICBmaWx0LlNlYXJjaFRleHQgPSBmaWx0LlNlYXJjaFRleHQuc3Vic3RyKDEsIGZpbHQuU2VhcmNoVGV4dC5sZW5ndGggLSAyKTtcclxuICAgICAgICBzZXRTaG93KHRydWUpO1xyXG4gICAgICAgIHNldEZpbHRlcnMob2xkRmlsdGVycyk7XHJcbiAgICAgICAgc2V0RmlsdGVyKGZpbHQpO1xyXG4gICAgICAgIGlmIChwcm9wcy5kZWZhdWx0Q29sbHVtbiAhPT0gdW5kZWZpbmVkICYmIHNlYXJjaEZpbHRlciAhPT0gbnVsbClcclxuICAgICAgICAgICAgcHJvcHMuU2V0RmlsdGVyKF9fc3ByZWFkQXJyYXlzKG9sZEZpbHRlcnMsIFtzZWFyY2hGaWx0ZXJdKSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBwcm9wcy5TZXRGaWx0ZXIob2xkRmlsdGVycyk7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVGaWx0ZXIoKSB7XHJcbiAgICAgICAgc2V0U2hvdyghc2hvdyk7XHJcbiAgICAgICAgc2V0SXNOZXcodHJ1ZSk7XHJcbiAgICAgICAgc2V0RmlsdGVyKHsgRmllbGROYW1lOiBwcm9wcy5Db2xsdW1uTGlzdFswXS5rZXksIFNlYXJjaFRleHQ6ICcnLCBPcGVyYXRvcjogcHJvcHMuQ29sbHVtbkxpc3RbMF0udHlwZSA9PT0gJ3N0cmluZycgPyAnTElLRScgOiAnPScsIFR5cGU6IHByb3BzLkNvbGx1bW5MaXN0WzBdLnR5cGUgfSk7XHJcbiAgICB9XHJcbiAgICB2YXIgY29udGVudCA9IChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIsIG51bGwsXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicm93XCIgfSxcclxuICAgICAgICAgICAgICAgIHByb3BzLmRlZmF1bHRDb2xsdW1uICE9PSB1bmRlZmluZWQgP1xyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiY29sXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbnB1dC1ncm91cFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jb250cm9sIG1yLXNtLTJcIiwgdHlwZTogXCJzZWFyY2hcIiwgcGxhY2Vob2xkZXI6IFwiU2VhcmNoIFwiICsgcHJvcHMuZGVmYXVsdENvbGx1bW4ubGFiZWwsIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIHNldFNlYXJjaChldmVudC50YXJnZXQudmFsdWUpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2hvd0xvYWRpbmcgIT09IHVuZGVmaW5lZCAmJiBwcm9wcy5TaG93TG9hZGluZyA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiaW5wdXQtZ3JvdXAtYXBwZW5kXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExvYWRpbmdJY29uXzEuZGVmYXVsdCwgeyBTaG93OiB0cnVlIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiKSA6IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IHN0eWxlOiB7IG1hcmdpblRvcDogMiwgbWFyZ2luQm90dG9tOiAyIH0gfSwgcHJvcHMuUmVzdWx0Tm90ZSkpIDogbnVsbCxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBwb3NpdGlvbjogJ3JlbGF0aXZlJywgZGlzcGxheTogJ2lubGluZS1ibG9jaycgfSwgY2xhc3NOYW1lOiAnY29sJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBjbGFzc05hbWU6IFwiYnRuIGJ0bi1wcmltYXJ5XCIsIG9uQ2xpY2s6IGZ1bmN0aW9uIChldnQpIHsgZXZ0LnByZXZlbnREZWZhdWx0KCk7IGNyZWF0ZUZpbHRlcigpOyB9LCBvbk1vdXNlRW50ZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNldEhvdmVyKHRydWUpOyB9LCBvbk1vdXNlTGVhdmU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNldEhvdmVyKGZhbHNlKTsgfSB9LCBcIkFkZCBGaWx0ZXJcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCAvIDMsIGRpc3BsYXk6IGhvdmVyID8gJ2Jsb2NrJyA6ICdub25lJywgcG9zaXRpb246ICdhYnNvbHV0ZScsIGJhY2tncm91bmRDb2xvcjogJyNmMWYxZjEnLCBib3hTaGFkb3c6ICcwcHggOHB4IDE2cHggMHB4IHJnYmEoMCwwLDAsMC4yKScsIHpJbmRleDogMSwgcmlnaHQ6IChwcm9wcy5EaXJlY3Rpb24gPT09ICdyaWdodCcgPyAwIDogdW5kZWZpbmVkKSwgbGVmdDogKHByb3BzLkRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gMCA6IHVuZGVmaW5lZCkgfSwgb25Nb3VzZUVudGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXRIb3Zlcih0cnVlKTsgfSwgb25Nb3VzZUxlYXZlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXRIb3ZlcihmYWxzZSk7IH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRhYmxlXCIsIHsgY2xhc3NOYW1lOiAndGFibGUnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIiwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIG51bGwsIFwiQ29sdW1uXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwgbnVsbCwgXCJPcGVyYXRvclwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIG51bGwsIFwiU2VhcmNoIFRleHRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiLCBudWxsLCBcIkVkaXRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiLCBudWxsLCBcIlJlbW92ZVwiKSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRib2R5XCIsIG51bGwsIGZpbHRlcnMubWFwKGZ1bmN0aW9uIChmLCBpKSB7IHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgeyBrZXk6IGkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCwgZi5GaWVsZE5hbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLCBmLk9wZXJhdG9yKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCwgZi5TZWFyY2hUZXh0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJidG4gYnRuLXNtXCIsIG9uQ2xpY2s6IGZ1bmN0aW9uIChlKSB7IHJldHVybiBlZGl0RmlsdGVyKGkpOyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBncGFfc3ltYm9sc18xLlBlbmNpbCkpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJidG4gYnRuLXNtXCIsIG9uQ2xpY2s6IGZ1bmN0aW9uIChlKSB7IHJldHVybiBkZWxldGVGaWx0ZXIoZik7IH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIGdwYV9zeW1ib2xzXzEuVHJhc2hDYW4pKSkpOyB9KSkpKSkpKSkpO1xyXG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgd2lkdGg6ICcxMDAlJyB9IH0sXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm5hdlwiLCB7IGNsYXNzTmFtZTogXCJuYXZiYXIgbmF2YmFyLWV4cGFuZC1sZyBuYXZiYXItbGlnaHQgYmctbGlnaHRcIiB9LFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImNvbGxhcHNlIG5hdmJhci1jb2xsYXBzZVwiLCBzdHlsZTogeyB3aWR0aDogJzEwMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7IGNsYXNzTmFtZTogXCJuYXZiYXItbmF2IG1yLWF1dG9cIiwgc3R5bGU6IHsgd2lkdGg6ICcxMDAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuRGlyZWN0aW9uID09PSAncmlnaHQnID8gcHJvcHMuY2hpbGRyZW4gOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLkxhYmVsICE9PSB1bmRlZmluZWQgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwibmF2LWl0ZW1cIiwgc3R5bGU6IHsgbWluV2lkdGg6IChwcm9wcy5XaWR0aCA9PT0gdW5kZWZpbmVkID8gJzE1MHB4JyA6IHVuZGVmaW5lZCksIHdpZHRoOiBwcm9wcy5XaWR0aCwgcGFkZGluZ1JpZ2h0OiAxMCB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIiwgeyBjbGFzc05hbWU6IFwiYm9yZGVyXCIsIHN0eWxlOiB7IHBhZGRpbmc6ICcxMHB4JywgaGVpZ2h0OiAnMTAwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsZWdlbmRcIiwgeyBjbGFzc05hbWU6IFwidy1hdXRvXCIsIHN0eWxlOiB7IGZvbnRTaXplOiAnbGFyZ2UnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuTGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiOlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50KSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IFwibmF2LWl0ZW1cIiwgc3R5bGU6IHsgbWluV2lkdGg6IChwcm9wcy5XaWR0aCA9PT0gdW5kZWZpbmVkID8gJzE1MHB4JyA6IHVuZGVmaW5lZCksIHdpZHRoOiBwcm9wcy5XaWR0aCwgcGFkZGluZ1JpZ2h0OiAxMCB9IH0sIGNvbnRlbnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLkRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gcHJvcHMuY2hpbGRyZW4gOiBudWxsKSkpLFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxfMS5kZWZhdWx0LCB7IFRpdGxlOiAnQWRkIEZpbHRlcicsIFNob3c6IHNob3csIENhbGxCYWNrOiBmdW5jdGlvbiAoY29uZikgeyBpZiAoY29uZilcclxuICAgICAgICAgICAgICAgIGFkZEZpbHRlcigpOyBzZXRTaG93KGZhbHNlKTsgfSwgQ29uZmlybVRleHQ6IGlzTmV3ID8gJ0FkZCcgOiAnU2F2ZScsIENhbmNlbFRleHQ6IGlzTmV3ID8gJ0Nsb3NlJyA6ICdEZWxldGUnIH0sXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQocmVhY3RfZm9ybXNfMS5TZWxlY3QsIHsgUmVjb3JkOiBmaWx0ZXIsIEZpZWxkOiAnRmllbGROYW1lJywgT3B0aW9uczogcHJvcHMuQ29sbHVtbkxpc3QubWFwKGZ1bmN0aW9uIChmbCkgeyByZXR1cm4gKHsgVmFsdWU6IGZsLmtleSwgTGFiZWw6IGZsLmxhYmVsIH0pOyB9KSwgU2V0dGVyOiBmdW5jdGlvbiAocmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wZXJhdG9yID0gXCJJTlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2x1bW4gPSBwcm9wcy5Db2xsdW1uTGlzdC5maW5kKGZ1bmN0aW9uIChmbCkgeyByZXR1cm4gZmwua2V5ID09PSByZWNvcmQuRmllbGROYW1lOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uICE9PSB1bmRlZmluZWQgJiYgY29sdW1uLnR5cGUgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvciA9IFwiTElLRVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEZpbHRlcihmdW5jdGlvbiAocHJldkZpbHRlcikgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcmV2RmlsdGVyKSwgeyBGaWVsZE5hbWU6IHJlY29yZC5GaWVsZE5hbWUsIFNlYXJjaFRleHQ6ICcnLCBPcGVyYXRvcjogb3BlcmF0b3IsIFR5cGU6IChjb2x1bW4gIT09IHVuZGVmaW5lZCA/IGNvbHVtbi50eXBlIDogJ3N0cmluZycpIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCBMYWJlbDogJ0NvbHVtbicgfSksXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsdGVyQ3JlYXRvciwgeyBGaWx0ZXI6IGZpbHRlciwgRmllbGQ6IHByb3BzLkNvbGx1bW5MaXN0LmZpbmQoZnVuY3Rpb24gKGZsKSB7IHJldHVybiBmbC5rZXkgPT09IGZpbHRlci5GaWVsZE5hbWU7IH0pLCBTZXR0ZXI6IGZ1bmN0aW9uIChyZWNvcmQpIHsgcmV0dXJuIHNldEZpbHRlcihyZWNvcmQpOyB9LCBFbnVtOiAocHJvcHMuR2V0RW51bSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogcHJvcHMuR2V0RW51bSkgfSkpKSk7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gU2VhcmNoQmFyO1xyXG5mdW5jdGlvbiBGaWx0ZXJDcmVhdG9yKHByb3BzKSB7XHJcbiAgICB2YXIgX2EgPSBSZWFjdC51c2VTdGF0ZShbXSksIG9wdGlvbnMgPSBfYVswXSwgc2V0T3B0aW9ucyA9IF9hWzFdO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAocHJvcHMuRmllbGQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmIChwcm9wcy5GaWVsZC5lbnVtICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHNldE9wdGlvbnMocHJvcHMuRmllbGQuZW51bSk7XHJcbiAgICAgICAgaWYgKHByb3BzLkVudW0gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIHByb3BzLkVudW0oc2V0T3B0aW9ucywgcHJvcHMuRmllbGQpO1xyXG4gICAgICAgIGlmIChwcm9wcy5GaWVsZC5lbnVtID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xyXG4gICAgfSwgW3Byb3BzLkZpZWxkLCBwcm9wcy5FbnVtXSk7XHJcbiAgICBpZiAocHJvcHMuRmllbGQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIGlmIChwcm9wcy5GaWVsZC50eXBlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJDb2x1bW4gdHlwZSBpcyBzdHJpbmcuIFdpbGRjYXJkICgqKSBjYW4gYmUgdXNlZCB3aXRoICdMSUtFJyBhbmQgJ05PVCBMSUtFJ1wiKSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ3JvdycgfSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdjb2wtNCcgfSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHsgY2xhc3NOYW1lOiAnZm9ybS1jb250cm9sJywgdmFsdWU6IHByb3BzLkZpbHRlci5PcGVyYXRvciwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIoZnVuY3Rpb24gKHByZXZTdGF0ZSkgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcmV2U3RhdGUpLCB7IE9wZXJhdG9yOiB2YWx1ZSB9KSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogJ0xJS0UnIH0sIFwiTElLRVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiAnPScgfSwgXCI9XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsgdmFsdWU6ICdOT1QgTElLRScgfSwgXCJOT1QgTElLRVwiKSkpLFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2NvbCcgfSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBjbGFzc05hbWU6ICdmb3JtLWNvbnRyb2wnLCB2YWx1ZTogcHJvcHMuRmlsdGVyLlNlYXJjaFRleHQsIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKGZ1bmN0aW9uIChwcmV2U3RhdGUpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJldlN0YXRlKSwgeyBTZWFyY2hUZXh0OiB2YWx1ZSB9KSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0pKSkpKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHByb3BzLkZpZWxkLnR5cGUgPT09IFwiaW50ZWdlclwiIHx8IHByb3BzLkZpZWxkLnR5cGUgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLFxyXG4gICAgICAgICAgICAgICAgXCJDb2x1bW4gdHlwZSBpcyBcIixcclxuICAgICAgICAgICAgICAgIHByb3BzLkZpZWxkLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBcIi5cIiksXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdyb3cnIH0sXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnY29sLTQnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiLCB7IGNsYXNzTmFtZTogJ2Zvcm0tY29udHJvbCcsIHZhbHVlOiBwcm9wcy5GaWx0ZXIuT3BlcmF0b3IsIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKGZ1bmN0aW9uIChwcmV2U3RhdGUpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJldlN0YXRlKSwgeyBPcGVyYXRvcjogdmFsdWUgfSkpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsgdmFsdWU6ICc9JyB9LCBcIj1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogJzw+JyB9LCBcIiE9XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsgdmFsdWU6ICc+JyB9LCBcIj5cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogJz49JyB9LCBcIj49XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsgdmFsdWU6ICc8JyB9LCBcIjxcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogJz49JyB9LCBcIj49XCIpKSksXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnY29sJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IHR5cGU6ICdudW1iZXInLCBjbGFzc05hbWU6ICdmb3JtLWNvbnRyb2wnLCB2YWx1ZTogcHJvcHMuRmlsdGVyLlNlYXJjaFRleHQsIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKGZ1bmN0aW9uIChwcmV2U3RhdGUpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJldlN0YXRlKSwgeyBTZWFyY2hUZXh0OiB2YWx1ZSB9KSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0pKSkpKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHByb3BzLkZpZWxkLnR5cGUgPT09IFwiZGF0ZXRpbWVcIikge1xyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsXHJcbiAgICAgICAgICAgICAgICBcIkNvbHVtbiB0eXBlIGlzIFwiLFxyXG4gICAgICAgICAgICAgICAgcHJvcHMuRmllbGQudHlwZSxcclxuICAgICAgICAgICAgICAgIFwiLlwiKSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ3JvdycgfSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdjb2wtNCcgfSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHsgY2xhc3NOYW1lOiAnZm9ybS1jb250cm9sJywgdmFsdWU6IHByb3BzLkZpbHRlci5PcGVyYXRvciwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIoZnVuY3Rpb24gKHByZXZTdGF0ZSkgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcmV2U3RhdGUpLCB7IE9wZXJhdG9yOiB2YWx1ZSB9KSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogJz0nIH0sIFwiPVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiAnPD4nIH0sIFwiIT1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogJz4nIH0sIFwiPlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiAnPj0nIH0sIFwiPj1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogJzwnIH0sIFwiPFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiAnPj0nIH0sIFwiPj1cIikpKSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdjb2wnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgdHlwZTogJ2RhdGUnLCBjbGFzc05hbWU6ICdmb3JtLWNvbnRyb2wnLCB2YWx1ZTogcHJvcHMuRmlsdGVyLlNlYXJjaFRleHQuc3BsaXQoJyAnKVswXSwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIoZnVuY3Rpb24gKHByZXZTdGF0ZSkgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcmV2U3RhdGUpLCB7IFNlYXJjaFRleHQ6ICh2YWx1ZSArICcgJyArIChwcmV2U3RhdGUuU2VhcmNoVGV4dC5zcGxpdCgnICcpLmxlbmd0aCA+IDEgPyBwcmV2U3RhdGUuU2VhcmNoVGV4dC5zcGxpdCgnICcpWzFdIDogJzA6MDAnKSkgfSkpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyB0eXBlOiAndGltZScsIGNsYXNzTmFtZTogJ2Zvcm0tY29udHJvbCcsIHZhbHVlOiBwcm9wcy5GaWx0ZXIuU2VhcmNoVGV4dC5zcGxpdCgnICcpLmxlbmd0aCA+IDEgPyBwcm9wcy5GaWx0ZXIuU2VhcmNoVGV4dC5zcGxpdCgnICcpWzFdIDogJzA6MDAnLCBvbkNoYW5nZTogZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlNldHRlcihmdW5jdGlvbiAocHJldlN0YXRlKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHByZXZTdGF0ZSksIHsgU2VhcmNoVGV4dDogKHByZXZTdGF0ZS5TZWFyY2hUZXh0LnNwbGl0KCcgJylbMF0gKyAnICcgKyB2YWx1ZSkgfSkpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSkpKSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwcm9wcy5GaWVsZC50eXBlID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHJlYWN0X2Zvcm1zXzEuQ2hlY2tCb3gsIHsgUmVjb3JkOiBwcm9wcy5GaWx0ZXIsIEZpZWxkOiAnU2VhcmNoVGV4dCcsIFNldHRlcjogZnVuY3Rpb24gKGZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKGZ1bmN0aW9uIChwcmV2RmlsdGVyKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHByZXZGaWx0ZXIpLCB7IE9wZXJhdG9yOiAnPScsIFNlYXJjaFRleHQ6IGZpbHRlci5TZWFyY2hUZXh0LnRvU3RyaW5nKCkgPT09ICd0cnVlJyA/ICcxJyA6ICcwJyB9KSk7IH0pO1xyXG4gICAgICAgICAgICB9LCBMYWJlbDogXCJDb2x1bW4gdHlwZSBpcyBib29sZWFuLiBZZXMvT24gaXMgY2hlY2tlZC5cIiB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsIFwiQ29sdW1uIHR5cGUgaXMgZW51bWVyYWJsZS4gU2VsZWN0IGZyb20gYmVsb3cuXCIpLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidWxcIiwgeyBzdHlsZTogeyBsaXN0U3R5bGU6ICdub25lJyB9IH0sXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tY2hlY2tcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNsYXNzTmFtZTogXCJmb3JtLWNoZWNrLWlucHV0XCIsIHN0eWxlOiB7IHpJbmRleDogMSB9LCBvbkNoYW5nZTogZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQudGFyZ2V0LmNoZWNrZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlNldHRlcihmdW5jdGlvbiAocHJldlNldHRlcikgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcmV2U2V0dGVyKSwgeyBTZWFyY2hUZXh0OiBcIihcIiArIG9wdGlvbnMubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4LlZhbHVlOyB9KS5qb2luKCcsJykgKyBcIilcIiB9KSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKGZ1bmN0aW9uIChwcmV2U2V0dGVyKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHByZXZTZXR0ZXIpLCB7IFNlYXJjaFRleHQ6ICcnIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBkZWZhdWx0VmFsdWU6ICdvZmYnIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jaGVjay1sYWJlbFwiIH0sIFwiU2VsZWN0IEFsbFwiKSkpLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5tYXAoZnVuY3Rpb24gKHZsaSwgaW5kZXgpIHsgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGtleTogaW5kZXggfSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tY2hlY2tcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGNsYXNzTmFtZTogXCJmb3JtLWNoZWNrLWlucHV0XCIsIHN0eWxlOiB7IHpJbmRleDogMSB9LCBvbkNoYW5nZTogZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldnQudGFyZ2V0LmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpc3QgPSBwcm9wcy5GaWx0ZXIuU2VhcmNoVGV4dC5yZXBsYWNlKCcoJywgJycpLnJlcGxhY2UoJyknLCAnJykuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA9IGxpc3QuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICE9PSBcIlwiOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKHZsaS5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0XzEgPSBcIihcIiArIGxpc3Quam9pbignLCcpICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlNldHRlcihmdW5jdGlvbiAocHJldlNldHRlcikgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcmV2U2V0dGVyKSwgeyBTZWFyY2hUZXh0OiB0ZXh0XzEgfSkpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gcHJvcHMuRmlsdGVyLlNlYXJjaFRleHQucmVwbGFjZSgnKCcsICcnKS5yZXBsYWNlKCcpJywgJycpLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QgPSBsaXN0LmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geCAhPT0gXCJcIjsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QgPSBsaXN0LmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geCAhPT0gdmxpLlZhbHVlOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHRfMiA9IFwiKFwiICsgbGlzdC5qb2luKCcsJykgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKGZ1bmN0aW9uIChwcmV2U2V0dGVyKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHByZXZTZXR0ZXIpLCB7IFNlYXJjaFRleHQ6IHRleHRfMiB9KSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHZhbHVlOiBwcm9wcy5GaWx0ZXIuU2VhcmNoVGV4dC5pbmRleE9mKHZsaS5WYWx1ZSkgPj0gMCA/ICdvbicgOiAnb2ZmJywgY2hlY2tlZDogcHJvcHMuRmlsdGVyLlNlYXJjaFRleHQuaW5kZXhPZih2bGkuVmFsdWUpID49IDAgPyB0cnVlIDogZmFsc2UgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJmb3JtLWNoZWNrLWxhYmVsXCIgfSwgdmxpLkxhYmVsKSkpOyB9KSkpKTtcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBUb29sVGlwLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8xNC8yMDIxIC0gQ2hyaXN0b3BoIExhY2tuZXJcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG52YXIgX19tYWtlVGVtcGxhdGVPYmplY3QgPSAodGhpcyAmJiB0aGlzLl9fbWFrZVRlbXBsYXRlT2JqZWN0KSB8fCBmdW5jdGlvbiAoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcclxudmFyIHN0eWxlZF9jb21wb25lbnRzXzEgPSByZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIik7XHJcbnZhciBoZWxwZXJfZnVuY3Rpb25zXzEgPSByZXF1aXJlKFwiQGdwYS1nZW1zdG9uZS9oZWxwZXItZnVuY3Rpb25zXCIpO1xyXG52YXIgV3JhcHBlckRpdiA9IHN0eWxlZF9jb21wb25lbnRzXzEuZGVmYXVsdC5kaXYodGVtcGxhdGVPYmplY3RfMSB8fCAodGVtcGxhdGVPYmplY3RfMSA9IF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcbiAgJiB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIHBhZGRpbmc6IDhweCAyMXB4O1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZS1vdXQ7XFxuICAgIHotaW5kZXg6IFwiLCBcIjtcXG4gICAgb3BhY2l0eTogXCIsIFwiO1xcbiAgICBjb2xvcjogXCIsIFwiO1xcbiAgICBiYWNrZ3JvdW5kOiBcIiwgXCI7XFxuICAgIHRvcDogXCIsIFwiO1xcbiAgICBsZWZ0OiBcIiwgXCI7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgfVxcbiAgXCIsIFwiXFxuICBcIiwgXCJcXG4gIFwiLCBcIlxcbiAgXCIsIFwiXCJdLCBbXCJcXG4gICYge1xcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBwYWRkaW5nOiA4cHggMjFweDtcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2Utb3V0O1xcbiAgICB6LWluZGV4OiBcIiwgXCI7XFxuICAgIG9wYWNpdHk6IFwiLCBcIjtcXG4gICAgY29sb3I6IFwiLCBcIjtcXG4gICAgYmFja2dyb3VuZDogXCIsIFwiO1xcbiAgICB0b3A6IFwiLCBcIjtcXG4gICAgbGVmdDogXCIsIFwiO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gIH1cXG4gIFwiLFxyXG4gICAgXCJcXG4gIFwiLFxyXG4gICAgXCJcXG4gIFwiLFxyXG4gICAgXCJcXG4gIFwiLFxyXG4gICAgXCJcIlxyXG4gICAgLy8gVGhlIG90aGVyIGVsZW1lbnQgbmVlZHMgdG8gYmUgbGFiZWxkIGFzIGRhdGEtdG9vbHRpcCB0aGF0IHdpbGwgb25seSBiZSB1c2VkIGZvciBwb3NpdGlvbmluZ1xyXG5dKSksIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gcHJvcHMuWmluZGV4OyB9LCBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIHByb3BzLlNob3cgPyBcIjAuOVwiIDogXCIwXCI7IH0sIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gKHByb3BzLlRoZW1lID09PSAnZGFyaycgPyBcIiNmZmZcIiA6ICcjMjIyJyk7IH0sIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gKHByb3BzLlRoZW1lID09PSAnZGFyaycgPyBcIiMyMjJcIiA6ICcjZmZmJyk7IH0sIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gcHJvcHMuVG9wICsgXCJweFwiOyB9LCBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIHByb3BzLkxlZnQgKyBcInB4XCI7IH0sIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gKHByb3BzLkxvY2F0aW9uID09PSAndG9wJyA/IFwiXFxuICAgICY6OmFmdGVyIHtcXG4gICAgIGJvcmRlci1sZWZ0OiA4cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICBib3JkZXItcmlnaHQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgIGJvcmRlci10b3A6IDhweCBzb2xpZCBcIiArIChwcm9wcy5UaGVtZSA9PT0gJ2RhcmsnID8gXCIjMjIyXCIgOiAnI2ZmZicpICsgXCI7XFxuICAgICBsZWZ0OiA1MCU7XFxuICAgICBib3R0b206IC02cHg7XFxuICAgICBtYXJnaW4tbGVmdDogLThweDtcXG4gICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgd2lkdGg6IDBweDtcXG4gICAgIGhlaWdodDogMHB4O1xcbiAgICAgcG9zaXRpb246IGFic29sdXRlXFxuICAgIH1cXG4gIFwiIDogJycpOyB9LCBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIChwcm9wcy5Mb2NhdGlvbiA9PT0gJ2JvdHRvbScgPyBcIlxcbiAgICAmOjpiZWZvcmUge1xcbiAgICAgYm9yZGVyLWxlZnQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgIGJvcmRlci1yaWdodDogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgYm9yZGVyLWJvdHRvbTogOHB4IHNvbGlkIFwiICsgKHByb3BzLlRoZW1lID09PSAnZGFyaycgPyBcIiMyMjJcIiA6ICcjZmZmJykgKyBcIjtcXG4gICAgIGxlZnQ6IDUwJTtcXG4gICAgIHRvcDogLTZweDtcXG4gICAgIG1hcmdpbi1sZWZ0OiAtOHB4O1xcbiAgICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgICB3aWR0aDogMHB4O1xcbiAgICAgaGVpZ2h0OiAwcHg7XFxuICAgICBwb3NpdGlvbjogYWJzb2x1dGVcXG4gICAgfVxcbiAgXCIgOiAnJyk7IH0sIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gKHByb3BzLkxvY2F0aW9uID09PSAnbGVmdCcgPyBcIlxcbiAgICAmOjpiZWZvcmUge1xcbiAgICAgYm9yZGVyLXRvcDogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgYm9yZGVyLWJvdHRvbTogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgYm9yZGVyLWxlZnQ6IDhweCBzb2xpZCBcIiArIChwcm9wcy5UaGVtZSA9PT0gJ2RhcmsnID8gXCIjMjIyXCIgOiAnI2ZmZicpICsgXCI7XFxuICAgICB0b3A6IDUwJTtcXG4gICAgIGxlZnQ6IDEwMCU7XFxuICAgICBtYXJnaW4tdG9wOiAtOHB4O1xcbiAgICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgICB3aWR0aDogMHB4O1xcbiAgICAgaGVpZ2h0OiAwcHg7XFxuICAgICBwb3NpdGlvbjogYWJzb2x1dGVcXG4gICAgfVxcbiAgXCIgOiAnJyk7IH0sIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gKHByb3BzLkxvY2F0aW9uID09PSAncmlnaHQnID8gXCJcXG4gICAgJjo6YmVmb3JlIHtcXG4gICAgIGJvcmRlci10b3A6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgIGJvcmRlci1ib3R0b206IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgIGJvcmRlci1yaWdodDogOHB4IHNvbGlkIFwiICsgKHByb3BzLlRoZW1lID09PSAnZGFyaycgPyBcIiMyMjJcIiA6ICcjZmZmJykgKyBcIjtcXG4gICAgIHRvcDogNTAlO1xcbiAgICAgbGVmdDogLTZweDtcXG4gICAgIG1hcmdpbi10b3A6IC04cHg7XFxuICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgIHdpZHRoOiAwcHg7XFxuICAgICBoZWlnaHQ6IDBweDtcXG4gICAgIHBvc2l0aW9uOiBhYnNvbHV0ZVxcbiAgICB9XFxuICBcIiA6ICcnKTsgfSk7XHJcbi8vIFRoZSBvdGhlciBlbGVtZW50IG5lZWRzIHRvIGJlIGxhYmVsZCBhcyBkYXRhLXRvb2x0aXAgdGhhdCB3aWxsIG9ubHkgYmUgdXNlZCBmb3IgcG9zaXRpb25pbmdcclxudmFyIFRvb2xUaXAgPSBmdW5jdGlvbiAocHJvcHMpIHtcclxuICAgIHZhciBfYSA9IFJlYWN0LnVzZVN0YXRlKDApLCB0b3AgPSBfYVswXSwgc2V0VG9wID0gX2FbMV07XHJcbiAgICB2YXIgX2IgPSBSZWFjdC51c2VTdGF0ZSgwKSwgbGVmdCA9IF9iWzBdLCBzZXRMZWZ0ID0gX2JbMV07XHJcbiAgICB2YXIgX2MgPSBSZWFjdC51c2VTdGF0ZShcIlwiKSwgZ3VpZCA9IF9jWzBdLCBzZXRHdWlkID0gX2NbMV07XHJcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNldEd1aWQoaGVscGVyX2Z1bmN0aW9uc18xLkNyZWF0ZUd1aWQoKSk7XHJcbiAgICB9LCBbXSk7XHJcbiAgICBSZWFjdC51c2VMYXlvdXRFZmZlY3QoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYSA9IFVwZGF0ZVBvc2l0aW9uKCksIHQgPSBfYVswXSwgbCA9IF9hWzFdO1xyXG4gICAgICAgIGlmICh0ICE9PSB0b3ApXHJcbiAgICAgICAgICAgIHNldFRvcCh0KTtcclxuICAgICAgICBpZiAobCAhPT0gbGVmdClcclxuICAgICAgICAgICAgc2V0TGVmdChsKTtcclxuICAgIH0pO1xyXG4gICAgdmFyIHpJbmRleCA9IChwcm9wcy5aaW5kZXggPT09IHVuZGVmaW5lZCA/IDIwMDAgOiBwcm9wcy5aaW5kZXgpO1xyXG4gICAgZnVuY3Rpb24gVXBkYXRlUG9zaXRpb24oKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS10b29sdGlwXCIgKyAocHJvcHMuVGFyZ2V0ID09PSB1bmRlZmluZWQgPyAnJyA6IFwiPVxcXCJcIiArIHByb3BzLlRhcmdldCArIFwiXFxcIlwiKSArIFwiXVwiKTtcclxuICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIFstOTk5LCAtOTk5XTtcclxuICAgICAgICB2YXIgdGFyZ2V0TG9jYXRpb24gPSBoZWxwZXJfZnVuY3Rpb25zXzEuR2V0Tm9kZVNpemUodGFyZ2V0WzBdKTtcclxuICAgICAgICB2YXIgdG9vbFRpcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGd1aWQpO1xyXG4gICAgICAgIGlmICh0b29sVGlwID09PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gWy05OTksIC05OTldO1xyXG4gICAgICAgIHZhciB0aXBMb2NhdGlvbiA9IGhlbHBlcl9mdW5jdGlvbnNfMS5HZXROb2RlU2l6ZSh0b29sVGlwKTtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gNTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gWzAsIDBdO1xyXG4gICAgICAgIGlmIChwcm9wcy5Qb3NpdGlvbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFswXSA9IHRhcmdldExvY2F0aW9uLnRvcCArIDAuNSAqIHRhcmdldExvY2F0aW9uLmhlaWdodCAtIDAuNSAqIHRpcExvY2F0aW9uLmhlaWdodDtcclxuICAgICAgICAgICAgcmVzdWx0WzFdID0gdGFyZ2V0TG9jYXRpb24ubGVmdCAtIHRpcExvY2F0aW9uLndpZHRoIC0gb2Zmc2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwcm9wcy5Qb3NpdGlvbiA9PT0gJ3JpZ2h0Jykge1xyXG4gICAgICAgICAgICByZXN1bHRbMF0gPSB0YXJnZXRMb2NhdGlvbi50b3AgKyAwLjUgKiB0YXJnZXRMb2NhdGlvbi5oZWlnaHQgLSAwLjUgKiB0aXBMb2NhdGlvbi5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHJlc3VsdFsxXSA9IHRhcmdldExvY2F0aW9uLmxlZnQgKyB0YXJnZXRMb2NhdGlvbi53aWR0aCArIG9mZnNldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocHJvcHMuUG9zaXRpb24gPT09ICd0b3AnKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFswXSA9IHRhcmdldExvY2F0aW9uLnRvcCAtIHRpcExvY2F0aW9uLmhlaWdodCAtIG9mZnNldDtcclxuICAgICAgICAgICAgcmVzdWx0WzFdID0gdGFyZ2V0TG9jYXRpb24ubGVmdCArIDAuNSAqIHRhcmdldExvY2F0aW9uLndpZHRoIC0gMC41ICogdGlwTG9jYXRpb24ud2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHByb3BzLlBvc2l0aW9uID09PSAnYm90dG9tJykge1xyXG4gICAgICAgICAgICByZXN1bHRbMF0gPSB0YXJnZXRMb2NhdGlvbi50b3AgKyB0YXJnZXRMb2NhdGlvbi5oZWlnaHQgKyBvZmZzZXQ7XHJcbiAgICAgICAgICAgIHJlc3VsdFsxXSA9IHRhcmdldExvY2F0aW9uLmxlZnQgKyAwLjUgKiB0YXJnZXRMb2NhdGlvbi53aWR0aCAtIDAuNSAqIHRpcExvY2F0aW9uLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgdmFyIHRoZW1lID0gKHByb3BzLlRoZW1lID09PSB1bmRlZmluZWQgPyAnZGFyaycgOiBwcm9wcy5UaGVtZSk7XHJcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoV3JhcHBlckRpdiwgeyBTaG93OiBwcm9wcy5TaG93LCBUaGVtZTogdGhlbWUsIFRvcDogdG9wLCBMZWZ0OiBsZWZ0LCBpZDogZ3VpZCwgTG9jYXRpb246IHByb3BzLlBvc2l0aW9uID09PSB1bmRlZmluZWQgPyAndG9wJyA6IHByb3BzLlBvc2l0aW9uLCBaaW5kZXg6IHpJbmRleCB9LCBwcm9wcy5jaGlsZHJlbikpO1xyXG59O1xyXG5leHBvcnRzLmRlZmF1bHQgPSBUb29sVGlwO1xyXG52YXIgdGVtcGxhdGVPYmplY3RfMTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgV2FybmluZy50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMTIvMjkvMjAyMCAtIENocmlzdG9waCBMYWNrbmVyXHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XHJcbnZhciBNb2RhbF8xID0gcmVxdWlyZShcIi4vTW9kYWxcIik7XHJcbi8vIFVzYWdlOlxyXG4vLyA8V2FybmluZyBUaXRsZT0nVGhpcyBpcyBhIFdhcm5pbmcnIE1lc3NhZ2U9eydBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gQ29udGludWU/J30gQ2FsbGJhY2s9eyhjYW5jZWxlZCkgPT4gc2V0U2hvdyhmYWxzZSl9IFNob3c9e3Nob3d9IC8+XHJcbi8vXHJcbi8vIFByb3BzIERlc2NyaXB0aW9uOlxyXG4vLyBUaXRsZSA9PiBUaXRsZSBvZiBUaGUgTW9kYWxcclxuLy8gQ2FsbEJhY2sgPT4gRnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gY2xvc2luZyB0aGUgTW9kYWwgZWl0aGVyIHRocm91Z2ggQ2FuY2VsIChjb25maXJtZWQ9ZmFsc2UpIG9yIENvbmZpcm0gQnV0dG9uIChjb25maXJtZWQ9dHJ1ZSlcclxuLy8gU2hvdyA9PiBXaGV0aGVyIHRvIHNob3cgdGhlIG1vZGFsXHJcbi8vIE1lc3NhZ2UgPT4gVGhlIG1lc3NhZ2Ugc2hvd24gYnkgdGhlIE1vZGFsXHJcbnZhciBXYXJuaW5nID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTW9kYWxfMS5kZWZhdWx0LCB7IFRpdGxlOiBwcm9wcy5UaXRsZSwgU2hvdzogcHJvcHMuU2hvdywgQ2FuY2VsQnRuQ2xhc3M6ICdidG4tZGFuZ2VyJywgQ2FuY2VsVGV4dDogJ0NhbmNlbCcsIENvbmZpcm1CdG5DbGFzczogJ2J0bi1zdWNjZXNzJywgQ29uZmlybVRleHQ6ICdDb25maXJtJywgU2hvd1g6IGZhbHNlLCBTaG93Q2FuY2VsOiB0cnVlLCBTaXplOiAnc20nLCBDYWxsQmFjazogZnVuY3Rpb24gKGNvbmZpcm1lZCkgeyByZXR1cm4gcHJvcHMuQ2FsbEJhY2soY29uZmlybWVkKTsgfSB9LFxyXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIHByb3BzLk1lc3NhZ2UpKSk7XHJcbn07XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFdhcm5pbmc7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIGluZGV4LnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAxMi8yOS8yMDIwIC0gQy4gTGFja25lciBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVG9vbFRpcCA9IGV4cG9ydHMuTG9hZGluZ0ljb24gPSBleHBvcnRzLkxvYWRpbmdTY3JlZW4gPSBleHBvcnRzLlNlYXJjaEJhciA9IGV4cG9ydHMuV2FybmluZyA9IGV4cG9ydHMuTW9kYWwgPSB2b2lkIDA7XHJcbnZhciBNb2RhbF8xID0gcmVxdWlyZShcIi4vTW9kYWxcIik7XHJcbmV4cG9ydHMuTW9kYWwgPSBNb2RhbF8xLmRlZmF1bHQ7XHJcbnZhciBXYXJuaW5nXzEgPSByZXF1aXJlKFwiLi9XYXJuaW5nXCIpO1xyXG5leHBvcnRzLldhcm5pbmcgPSBXYXJuaW5nXzEuZGVmYXVsdDtcclxudmFyIFNlYXJjaEJhcl8xID0gcmVxdWlyZShcIi4vU2VhcmNoQmFyXCIpO1xyXG5leHBvcnRzLlNlYXJjaEJhciA9IFNlYXJjaEJhcl8xLmRlZmF1bHQ7XHJcbnZhciBMb2FkaW5nU2NyZWVuXzEgPSByZXF1aXJlKFwiLi9Mb2FkaW5nU2NyZWVuXCIpO1xyXG5leHBvcnRzLkxvYWRpbmdTY3JlZW4gPSBMb2FkaW5nU2NyZWVuXzEuZGVmYXVsdDtcclxudmFyIExvYWRpbmdJY29uXzEgPSByZXF1aXJlKFwiLi9Mb2FkaW5nSWNvblwiKTtcclxuZXhwb3J0cy5Mb2FkaW5nSWNvbiA9IExvYWRpbmdJY29uXzEuZGVmYXVsdDtcclxudmFyIFRvb2xUaXBfMSA9IHJlcXVpcmUoXCIuL1Rvb2xUaXBcIik7XHJcbmV4cG9ydHMuVG9vbFRpcCA9IFRvb2xUaXBfMS5kZWZhdWx0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICBUYWJsZS50c3ggLSBHYnRjXG4vL1xuLy8gIENvcHlyaWdodCDCqSAyMDE4LCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcbi8vXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbi8vXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxuLy9cbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vICAwOC8wMi8yMDE4IC0gQmlsbHkgRXJuZXN0XG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cbi8vXG4vLyAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgQW5nbGVJY29uID0gZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZTogeyB3aWR0aDogMTAsIGhlaWdodDogMTAsIG1hcmdpbjogMyB9LCBjbGFzc05hbWU6ICdmYSBmYS1hbmdsZS0nICsgKHByb3BzLmFzY2VuZGluZyA/ICd1cCcgOiAnZG93bicpIH0pKTsgfTtcbnZhciBUYWJsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVGFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVGFibGUocHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBUYWJsZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcm93Q29tcG9uZW50cyA9IHRoaXMuZ2VuZXJhdGVSb3dzKCk7XG4gICAgICAgIHZhciBoZWFkZXJDb21wb25lbnRzID0gdGhpcy5nZW5lcmF0ZUhlYWRlcnMoKTtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgeyBjbGFzc05hbWU6IHRoaXMucHJvcHMudGFibGVDbGFzcyAhPT0gdW5kZWZpbmVkID8gdGhpcy5wcm9wcy50YWJsZUNsYXNzIDogJycsIHN0eWxlOiB0aGlzLnByb3BzLnRhYmxlU3R5bGUgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aGVhZFwiLCB7IHN0eWxlOiB0aGlzLnByb3BzLnRoZWFkU3R5bGUgfSwgaGVhZGVyQ29tcG9uZW50cyksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiwgeyBzdHlsZTogdGhpcy5wcm9wcy50Ym9keVN0eWxlIH0sIHJvd0NvbXBvbmVudHMpKSk7XG4gICAgfTtcbiAgICBUYWJsZS5wcm90b3R5cGUuZ2VuZXJhdGVIZWFkZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgY2VsbHMgPSB0aGlzLnByb3BzLmNvbHMubWFwKGZ1bmN0aW9uIChjb2xEYXRhLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIHN0eWxlO1xuICAgICAgICAgICAgaWYgKGNvbERhdGEuaGVhZGVyU3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN0eWxlID0gY29sRGF0YS5oZWFkZXJTdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHt9O1xuICAgICAgICAgICAgaWYgKHN0eWxlLmN1cnNvciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIHsga2V5OiBpbmRleCwgc3R5bGU6IHN0eWxlLCBvbkNsaWNrOiBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuaGFuZGxlU29ydCh7IGNvbDogY29sRGF0YS5rZXksIGFzY2VuZGluZzogX3RoaXMucHJvcHMuYXNjZW5kaW5nIH0sIGUpOyB9IH0sXG4gICAgICAgICAgICAgICAgY29sRGF0YS5sYWJlbCxcbiAgICAgICAgICAgICAgICBfdGhpcy5wcm9wcy5zb3J0RmllbGQgPT09IGNvbERhdGEua2V5ID8gUmVhY3QuY3JlYXRlRWxlbWVudChBbmdsZUljb24sIHsgYXNjZW5kaW5nOiBfdGhpcy5wcm9wcy5hc2NlbmRpbmcgfSkgOiBudWxsKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIG51bGwsIGNlbGxzKTtcbiAgICB9O1xuICAgIFRhYmxlLnByb3RvdHlwZS5nZW5lcmF0ZVJvd3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRhdGEubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmRhdGEubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGNlbGxzID0gX3RoaXMucHJvcHMuY29scy5tYXAoZnVuY3Rpb24gKGNvbERhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3NzO1xuICAgICAgICAgICAgICAgIGlmIChjb2xEYXRhLnJvd1N0eWxlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIGNzcyA9IHt9O1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY3NzID0gX19hc3NpZ24oe30sIGNvbERhdGEucm93U3R5bGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIHsga2V5OiBpbmRleC50b1N0cmluZygpICsgaXRlbVtjb2xEYXRhLmtleV0gKyBjb2xEYXRhLmtleSwgc3R5bGU6IGNzcywgb25DbGljazogX3RoaXMuaGFuZGxlQ2xpY2suYmluZChfdGhpcywgeyBjb2w6IGNvbERhdGEua2V5LCByb3c6IGl0ZW0sIGRhdGE6IGl0ZW1bY29sRGF0YS5rZXldIH0pIH0sIGNvbERhdGEuY29udGVudCAhPT0gdW5kZWZpbmVkID8gY29sRGF0YS5jb250ZW50KGl0ZW0sIGNvbERhdGEua2V5LCBjc3MpIDogaXRlbVtjb2xEYXRhLmtleV0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHN0eWxlO1xuICAgICAgICAgICAgaWYgKF90aGlzLnByb3BzLnJvd1N0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IF9fYXNzaWduKHt9LCBfdGhpcy5wcm9wcy5yb3dTdHlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB7fTtcbiAgICAgICAgICAgIGlmIChzdHlsZS5jdXJzb3IgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICBpZiAoX3RoaXMucHJvcHMuc2VsZWN0ZWQgIT09IHVuZGVmaW5lZCAmJiBfdGhpcy5wcm9wcy5zZWxlY3RlZChpdGVtKSlcbiAgICAgICAgICAgICAgICBzdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAneWVsbG93JztcbiAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInRyXCIsIHsgc3R5bGU6IHN0eWxlLCBrZXk6IGluZGV4LnRvU3RyaW5nKCkgfSwgY2VsbHMpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUYWJsZS5wcm90b3R5cGUuaGFuZGxlQ2xpY2sgPSBmdW5jdGlvbiAoZGF0YSwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGRhdGEsIGV2ZW50KTtcbiAgICB9O1xuICAgIFRhYmxlLnByb3RvdHlwZS5oYW5kbGVTb3J0ID0gZnVuY3Rpb24gKGRhdGEsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJvcHMub25Tb3J0KGRhdGEpO1xuICAgIH07XG4gICAgcmV0dXJuIFRhYmxlO1xufShSZWFjdC5Db21wb25lbnQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFRhYmxlO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8vXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hhbGxvd0VxdWFsKG9iakEsIG9iakIsIGNvbXBhcmUsIGNvbXBhcmVDb250ZXh0KSB7XG4gIHZhciByZXQgPSBjb21wYXJlID8gY29tcGFyZS5jYWxsKGNvbXBhcmVDb250ZXh0LCBvYmpBLCBvYmpCKSA6IHZvaWQgMDtcblxuICBpZiAocmV0ICE9PSB2b2lkIDApIHtcbiAgICByZXR1cm4gISFyZXQ7XG4gIH1cblxuICBpZiAob2JqQSA9PT0gb2JqQikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmpBICE9PSBcIm9iamVjdFwiIHx8ICFvYmpBIHx8IHR5cGVvZiBvYmpCICE9PSBcIm9iamVjdFwiIHx8ICFvYmpCKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKG9iakIpO1xuXG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXNCLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBiSGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmJpbmQob2JqQik7XG5cbiAgLy8gVGVzdCBmb3IgQSdzIGtleXMgZGlmZmVyZW50IGZyb20gQi5cbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwga2V5c0EubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciBrZXkgPSBrZXlzQVtpZHhdO1xuXG4gICAgaWYgKCFiSGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZUEgPSBvYmpBW2tleV07XG4gICAgdmFyIHZhbHVlQiA9IG9iakJba2V5XTtcblxuICAgIHJldCA9IGNvbXBhcmUgPyBjb21wYXJlLmNhbGwoY29tcGFyZUNvbnRleHQsIHZhbHVlQSwgdmFsdWVCLCBrZXkpIDogdm9pZCAwO1xuXG4gICAgaWYgKHJldCA9PT0gZmFsc2UgfHwgKHJldCA9PT0gdm9pZCAwICYmIHZhbHVlQSAhPT0gdmFsdWVCKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcbiIsIi8vIEBmbG93XG5cbmRlY2xhcmUgdmFyIFNDX0RJU0FCTEVfU1BFRURZOiA/Ym9vbGVhbjtcbmRlY2xhcmUgdmFyIF9fVkVSU0lPTl9fOiBzdHJpbmc7XG5cbmV4cG9ydCBjb25zdCBTQ19BVFRSOiBzdHJpbmcgPVxuICAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIChwcm9jZXNzLmVudi5SRUFDVF9BUFBfU0NfQVRUUiB8fCBwcm9jZXNzLmVudi5TQ19BVFRSKSkgfHxcbiAgJ2RhdGEtc3R5bGVkJztcblxuZXhwb3J0IGNvbnN0IFNDX0FUVFJfQUNUSVZFID0gJ2FjdGl2ZSc7XG5leHBvcnQgY29uc3QgU0NfQVRUUl9WRVJTSU9OID0gJ2RhdGEtc3R5bGVkLXZlcnNpb24nO1xuZXhwb3J0IGNvbnN0IFNDX1ZFUlNJT04gPSBfX1ZFUlNJT05fXztcbmV4cG9ydCBjb25zdCBTUExJVFRFUiA9ICcvKiFzYyovXFxuJztcblxuZXhwb3J0IGNvbnN0IElTX0JST1dTRVIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAnSFRNTEVsZW1lbnQnIGluIHdpbmRvdztcblxuZXhwb3J0IGNvbnN0IERJU0FCTEVfU1BFRURZID1cbiAgQm9vbGVhbih0eXBlb2YgU0NfRElTQUJMRV9TUEVFRFkgPT09ICdib29sZWFuJ1xuICAgID8gU0NfRElTQUJMRV9TUEVFRFlcbiAgICA6ICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MuZW52LlJFQUNUX0FQUF9TQ19ESVNBQkxFX1NQRUVEWSAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX1NDX0RJU0FCTEVfU1BFRURZICE9PSAnJ1xuICAgICAgPyBwcm9jZXNzLmVudi5SRUFDVF9BUFBfU0NfRElTQUJMRV9TUEVFRFkgPT09ICdmYWxzZScgPyBmYWxzZSA6IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9TQ19ESVNBQkxFX1NQRUVEWVxuICAgICAgOiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBwcm9jZXNzLmVudi5TQ19ESVNBQkxFX1NQRUVEWSAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnYuU0NfRElTQUJMRV9TUEVFRFkgIT09ICcnXG4gICAgICAgID8gcHJvY2Vzcy5lbnYuU0NfRElTQUJMRV9TUEVFRFkgPT09ICdmYWxzZScgPyBmYWxzZSA6IHByb2Nlc3MuZW52LlNDX0RJU0FCTEVfU1BFRURZXG4gICAgICAgIDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJ1xuICAgICAgKVxuICAgICkpO1xuXG4vLyBTaGFyZWQgZW1wdHkgZXhlY3V0aW9uIGNvbnRleHQgd2hlbiBnZW5lcmF0aW5nIHN0YXRpYyBzdHlsZXNcbmV4cG9ydCBjb25zdCBTVEFUSUNfRVhFQ1VUSU9OX0NPTlRFWFQgPSB7fTtcbiIsIi8vIEBmbG93XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuXG5pbXBvcnQgeyBtYWtlU3R5bGVUYWcsIGdldFNoZWV0IH0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHR5cGUgeyBTaGVldE9wdGlvbnMsIFRhZyB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKiogQ3JlYXRlIGEgQ1NTU3R5bGVTaGVldC1saWtlIHRhZyBkZXBlbmRpbmcgb24gdGhlIGVudmlyb25tZW50ICovXG5leHBvcnQgY29uc3QgbWFrZVRhZyA9ICh7IGlzU2VydmVyLCB1c2VDU1NPTUluamVjdGlvbiwgdGFyZ2V0IH06IFNoZWV0T3B0aW9ucyk6IFRhZyA9PiB7XG4gIGlmIChpc1NlcnZlcikge1xuICAgIHJldHVybiBuZXcgVmlydHVhbFRhZyh0YXJnZXQpO1xuICB9IGVsc2UgaWYgKHVzZUNTU09NSW5qZWN0aW9uKSB7XG4gICAgcmV0dXJuIG5ldyBDU1NPTVRhZyh0YXJnZXQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgVGV4dFRhZyh0YXJnZXQpO1xuICB9XG59O1xuXG5leHBvcnQgY2xhc3MgQ1NTT01UYWcgaW1wbGVtZW50cyBUYWcge1xuICBlbGVtZW50OiBIVE1MU3R5bGVFbGVtZW50O1xuXG4gIHNoZWV0OiBDU1NTdHlsZVNoZWV0O1xuXG4gIGxlbmd0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHRhcmdldD86IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgZWxlbWVudCA9ICh0aGlzLmVsZW1lbnQgPSBtYWtlU3R5bGVUYWcodGFyZ2V0KSk7XG5cbiAgICAvLyBBdm9pZCBFZGdlIGJ1ZyB3aGVyZSBlbXB0eSBzdHlsZSBlbGVtZW50cyBkb24ndCBjcmVhdGUgc2hlZXRzXG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuXG4gICAgdGhpcy5zaGVldCA9IGdldFNoZWV0KGVsZW1lbnQpO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgfVxuXG4gIGluc2VydFJ1bGUoaW5kZXg6IG51bWJlciwgcnVsZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc2hlZXQuaW5zZXJ0UnVsZShydWxlLCBpbmRleCk7XG4gICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlUnVsZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zaGVldC5kZWxldGVSdWxlKGluZGV4KTtcbiAgICB0aGlzLmxlbmd0aC0tO1xuICB9XG5cbiAgZ2V0UnVsZShpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBydWxlID0gdGhpcy5zaGVldC5jc3NSdWxlc1tpbmRleF07XG4gICAgLy8gQXZvaWQgSUUxMSBxdWlyayB3aGVyZSBjc3NUZXh0IGlzIGluYWNjZXNzaWJsZSBvbiBzb21lIGludmFsaWQgcnVsZXNcbiAgICBpZiAocnVsZSAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBydWxlLmNzc1RleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gcnVsZS5jc3NUZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XG59XG5cbi8qKiBBIFRhZyB0aGF0IGVtdWxhdGVzIHRoZSBDU1NTdHlsZVNoZWV0IEFQSSBidXQgdXNlcyB0ZXh0IG5vZGVzICovXG5leHBvcnQgY2xhc3MgVGV4dFRhZyBpbXBsZW1lbnRzIFRhZyB7XG4gIGVsZW1lbnQ6IEhUTUxTdHlsZUVsZW1lbnQ7XG5cbiAgbm9kZXM6IE5vZGVMaXN0PE5vZGU+O1xuXG4gIGxlbmd0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHRhcmdldD86IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgZWxlbWVudCA9ICh0aGlzLmVsZW1lbnQgPSBtYWtlU3R5bGVUYWcodGFyZ2V0KSk7XG4gICAgdGhpcy5ub2RlcyA9IGVsZW1lbnQuY2hpbGROb2RlcztcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG4gIH1cblxuICBpbnNlcnRSdWxlKGluZGV4OiBudW1iZXIsIHJ1bGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmIChpbmRleCA8PSB0aGlzLmxlbmd0aCAmJiBpbmRleCA+PSAwKSB7XG4gICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocnVsZSk7XG4gICAgICBjb25zdCByZWZOb2RlID0gdGhpcy5ub2Rlc1tpbmRleF07XG4gICAgICB0aGlzLmVsZW1lbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHJlZk5vZGUgfHwgbnVsbCk7XG4gICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZWxldGVSdWxlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5ub2Rlc1tpbmRleF0pO1xuICAgIHRoaXMubGVuZ3RoLS07XG4gIH1cblxuICBnZXRSdWxlKGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGlmIChpbmRleCA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlc1tpbmRleF0udGV4dENvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbn1cblxuLyoqIEEgY29tcGxldGVseSB2aXJ0dWFsIChzZXJ2ZXItc2lkZSkgVGFnIHRoYXQgZG9lc24ndCBtYW5pcHVsYXRlIHRoZSBET00gKi9cbmV4cG9ydCBjbGFzcyBWaXJ0dWFsVGFnIGltcGxlbWVudHMgVGFnIHtcbiAgcnVsZXM6IHN0cmluZ1tdO1xuXG4gIGxlbmd0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKF90YXJnZXQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMucnVsZXMgPSBbXTtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG4gIH1cblxuICBpbnNlcnRSdWxlKGluZGV4OiBudW1iZXIsIHJ1bGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmIChpbmRleCA8PSB0aGlzLmxlbmd0aCkge1xuICAgICAgdGhpcy5ydWxlcy5zcGxpY2UoaW5kZXgsIDAsIHJ1bGUpO1xuICAgICAgdGhpcy5sZW5ndGgrKztcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlUnVsZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5ydWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMubGVuZ3RoLS07XG4gIH1cblxuICBnZXRSdWxlKGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGlmIChpbmRleCA8IHRoaXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5ydWxlc1tpbmRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbn1cbiIsIi8vIEBmbG93XG5pbXBvcnQgeyBESVNBQkxFX1NQRUVEWSwgSVNfQlJPV1NFUiB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBFTVBUWV9PQkpFQ1QgfSBmcm9tICcuLi91dGlscy9lbXB0aWVzJztcbmltcG9ydCB7IG1ha2VHcm91cGVkVGFnIH0gZnJvbSAnLi9Hcm91cGVkVGFnJztcbmltcG9ydCB7IGdldEdyb3VwRm9ySWQgfSBmcm9tICcuL0dyb3VwSURBbGxvY2F0b3InO1xuaW1wb3J0IHsgb3V0cHV0U2hlZXQsIHJlaHlkcmF0ZVNoZWV0IH0gZnJvbSAnLi9SZWh5ZHJhdGlvbic7XG5pbXBvcnQgeyBtYWtlVGFnIH0gZnJvbSAnLi9UYWcnO1xuaW1wb3J0IHR5cGUgeyBHcm91cGVkVGFnLCBTaGVldCwgU2hlZXRPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5cbmxldCBTSE9VTERfUkVIWURSQVRFID0gSVNfQlJPV1NFUjtcblxudHlwZSBTaGVldENvbnN0cnVjdG9yQXJncyA9IHtcbiAgaXNTZXJ2ZXI/OiBib29sZWFuLFxuICB1c2VDU1NPTUluamVjdGlvbj86IGJvb2xlYW4sXG4gIHRhcmdldD86IEhUTUxFbGVtZW50LFxufTtcblxudHlwZSBHbG9iYWxTdHlsZXNBbGxvY2F0aW9uTWFwID0geyBba2V5OiBzdHJpbmddOiBudW1iZXIgfTtcbnR5cGUgTmFtZXNBbGxvY2F0aW9uTWFwID0gTWFwPHN0cmluZywgU2V0PHN0cmluZz4+O1xuXG5jb25zdCBkZWZhdWx0T3B0aW9uczogU2hlZXRPcHRpb25zID0ge1xuICBpc1NlcnZlcjogIUlTX0JST1dTRVIsXG4gIHVzZUNTU09NSW5qZWN0aW9uOiAhRElTQUJMRV9TUEVFRFksXG59O1xuXG4vKiogQ29udGFpbnMgdGhlIG1haW4gc3R5bGVzaGVldCBsb2dpYyBmb3Igc3RyaW5naWZpY2F0aW9uIGFuZCBjYWNoaW5nICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHlsZVNoZWV0IGltcGxlbWVudHMgU2hlZXQge1xuICBnczogR2xvYmFsU3R5bGVzQWxsb2NhdGlvbk1hcDtcblxuICBuYW1lczogTmFtZXNBbGxvY2F0aW9uTWFwO1xuXG4gIG9wdGlvbnM6IFNoZWV0T3B0aW9ucztcblxuICB0YWc6IHZvaWQgfCBHcm91cGVkVGFnO1xuXG4gIC8qKiBSZWdpc3RlciBhIGdyb3VwIElEIHRvIGdpdmUgaXQgYW4gaW5kZXggKi9cbiAgc3RhdGljIHJlZ2lzdGVySWQoaWQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgcmV0dXJuIGdldEdyb3VwRm9ySWQoaWQpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgb3B0aW9uczogU2hlZXRDb25zdHJ1Y3RvckFyZ3MgPSBFTVBUWV9PQkpFQ1QsXG4gICAgZ2xvYmFsU3R5bGVzPzogR2xvYmFsU3R5bGVzQWxsb2NhdGlvbk1hcCA9IHt9LFxuICAgIG5hbWVzPzogTmFtZXNBbGxvY2F0aW9uTWFwXG4gICkge1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuXG4gICAgdGhpcy5ncyA9IGdsb2JhbFN0eWxlcztcbiAgICB0aGlzLm5hbWVzID0gbmV3IE1hcChuYW1lcyk7XG5cbiAgICAvLyBXZSByZWh5ZHJhdGUgb25seSBvbmNlIGFuZCB1c2UgdGhlIHNoZWV0IHRoYXQgaXMgY3JlYXRlZCBmaXJzdFxuICAgIGlmICghdGhpcy5vcHRpb25zLmlzU2VydmVyICYmIElTX0JST1dTRVIgJiYgU0hPVUxEX1JFSFlEUkFURSkge1xuICAgICAgU0hPVUxEX1JFSFlEUkFURSA9IGZhbHNlO1xuICAgICAgcmVoeWRyYXRlU2hlZXQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgcmVjb25zdHJ1Y3RXaXRoT3B0aW9ucyhvcHRpb25zOiBTaGVldENvbnN0cnVjdG9yQXJncywgd2l0aE5hbWVzPzogYm9vbGVhbiA9IHRydWUpIHtcbiAgICByZXR1cm4gbmV3IFN0eWxlU2hlZXQoXG4gICAgICB7IC4uLnRoaXMub3B0aW9ucywgLi4ub3B0aW9ucyB9LFxuICAgICAgdGhpcy5ncyxcbiAgICAgICh3aXRoTmFtZXMgJiYgdGhpcy5uYW1lcykgfHwgdW5kZWZpbmVkXG4gICAgKTtcbiAgfVxuXG4gIGFsbG9jYXRlR1NJbnN0YW5jZShpZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuICh0aGlzLmdzW2lkXSA9ICh0aGlzLmdzW2lkXSB8fCAwKSArIDEpO1xuICB9XG5cbiAgLyoqIExhemlseSBpbml0aWFsaXNlcyBhIEdyb3VwZWRUYWcgZm9yIHdoZW4gaXQncyBhY3R1YWxseSBuZWVkZWQgKi9cbiAgZ2V0VGFnKCk6IEdyb3VwZWRUYWcge1xuICAgIHJldHVybiB0aGlzLnRhZyB8fCAodGhpcy50YWcgPSBtYWtlR3JvdXBlZFRhZyhtYWtlVGFnKHRoaXMub3B0aW9ucykpKTtcbiAgfVxuXG4gIC8qKiBDaGVjayB3aGV0aGVyIGEgbmFtZSBpcyBrbm93biBmb3IgY2FjaGluZyAqL1xuICBoYXNOYW1lRm9ySWQoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubmFtZXMuaGFzKGlkKSAmJiAodGhpcy5uYW1lcy5nZXQoaWQpOiBhbnkpLmhhcyhuYW1lKTtcbiAgfVxuXG4gIC8qKiBNYXJrIGEgZ3JvdXAncyBuYW1lIGFzIGtub3duIGZvciBjYWNoaW5nICovXG4gIHJlZ2lzdGVyTmFtZShpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBnZXRHcm91cEZvcklkKGlkKTtcblxuICAgIGlmICghdGhpcy5uYW1lcy5oYXMoaWQpKSB7XG4gICAgICBjb25zdCBncm91cE5hbWVzID0gbmV3IFNldCgpO1xuICAgICAgZ3JvdXBOYW1lcy5hZGQobmFtZSk7XG4gICAgICB0aGlzLm5hbWVzLnNldChpZCwgZ3JvdXBOYW1lcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICh0aGlzLm5hbWVzLmdldChpZCk6IGFueSkuYWRkKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBJbnNlcnQgbmV3IHJ1bGVzIHdoaWNoIGFsc28gbWFya3MgdGhlIG5hbWUgYXMga25vd24gKi9cbiAgaW5zZXJ0UnVsZXMoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBydWxlczogc3RyaW5nW10pIHtcbiAgICB0aGlzLnJlZ2lzdGVyTmFtZShpZCwgbmFtZSk7XG4gICAgdGhpcy5nZXRUYWcoKS5pbnNlcnRSdWxlcyhnZXRHcm91cEZvcklkKGlkKSwgcnVsZXMpO1xuICB9XG5cbiAgLyoqIENsZWFycyBhbGwgY2FjaGVkIG5hbWVzIGZvciBhIGdpdmVuIGdyb3VwIElEICovXG4gIGNsZWFyTmFtZXMoaWQ6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm5hbWVzLmhhcyhpZCkpIHtcbiAgICAgICh0aGlzLm5hbWVzLmdldChpZCk6IGFueSkuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQ2xlYXJzIGFsbCBydWxlcyBmb3IgYSBnaXZlbiBncm91cCBJRCAqL1xuICBjbGVhclJ1bGVzKGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmdldFRhZygpLmNsZWFyR3JvdXAoZ2V0R3JvdXBGb3JJZChpZCkpO1xuICAgIHRoaXMuY2xlYXJOYW1lcyhpZCk7XG4gIH1cblxuICAvKiogQ2xlYXJzIHRoZSBlbnRpcmUgdGFnIHdoaWNoIGRlbGV0ZXMgYWxsIHJ1bGVzIGJ1dCBub3QgaXRzIG5hbWVzICovXG4gIGNsZWFyVGFnKCkge1xuICAgIC8vIE5PVEU6IFRoaXMgZG9lcyBub3QgY2xlYXIgdGhlIG5hbWVzLCBzaW5jZSBpdCdzIG9ubHkgdXNlZCBkdXJpbmcgU1NSXG4gICAgLy8gc28gdGhhdCB3ZSBjYW4gY29udGludW91c2x5IG91dHB1dCBvbmx5IG5ldyBydWxlc1xuICAgIHRoaXMudGFnID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqIE91dHB1dHMgdGhlIGN1cnJlbnQgc2hlZXQgYXMgYSBDU1Mgc3RyaW5nIHdpdGggbWFya2VycyBmb3IgU1NSICovXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG91dHB1dFNoZWV0KHRoaXMpO1xuICB9XG59XG4iLCIvLyBAZmxvd1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi9pc0Z1bmN0aW9uJztcbmltcG9ydCBpc1N0eWxlZENvbXBvbmVudCBmcm9tICcuL2lzU3R5bGVkQ29tcG9uZW50JztcbmltcG9ydCB0eXBlIHsgUnVsZVNldCB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNTdGF0aWNSdWxlcyhydWxlczogUnVsZVNldCk6IGJvb2xlYW4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgcnVsZSA9IHJ1bGVzW2ldO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24ocnVsZSkgJiYgIWlzU3R5bGVkQ29tcG9uZW50KHJ1bGUpKSB7XG4gICAgICAvLyBmdW5jdGlvbnMgYXJlIGFsbG93ZWQgdG8gYmUgc3RhdGljIGlmIHRoZXkncmUganVzdCBiZWluZ1xuICAgICAgLy8gdXNlZCB0byBnZXQgdGhlIGNsYXNzbmFtZSBvZiBhIG5lc3RlZCBzdHlsZWQgY29tcG9uZW50XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG4iLCIvLyBAZmxvd1xuaW1wb3J0IFN0eWxlU2hlZXQgZnJvbSAnLi4vc2hlZXQnO1xuaW1wb3J0IHsgdHlwZSBTdHJpbmdpZmllciB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB0aHJvd1N0eWxlZEVycm9yIGZyb20gJy4uL3V0aWxzL2Vycm9yJztcbmltcG9ydCB7IG1hc3RlclN0eWxpcyB9IGZyb20gJy4vU3R5bGVTaGVldE1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlmcmFtZXMge1xuICBpZDogc3RyaW5nO1xuXG4gIG5hbWU6IHN0cmluZztcblxuICBydWxlczogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgcnVsZXM6IHN0cmluZykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pZCA9IGBzYy1rZXlmcmFtZXMtJHtuYW1lfWA7XG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xuICB9XG5cbiAgaW5qZWN0ID0gKHN0eWxlU2hlZXQ6IFN0eWxlU2hlZXQsIHN0eWxpc0luc3RhbmNlOiBTdHJpbmdpZmllciA9IG1hc3RlclN0eWxpcykgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVkTmFtZSA9IHRoaXMubmFtZSArIHN0eWxpc0luc3RhbmNlLmhhc2g7XG5cbiAgICBpZiAoIXN0eWxlU2hlZXQuaGFzTmFtZUZvcklkKHRoaXMuaWQsIHJlc29sdmVkTmFtZSkpIHtcbiAgICAgIHN0eWxlU2hlZXQuaW5zZXJ0UnVsZXMoXG4gICAgICAgIHRoaXMuaWQsXG4gICAgICAgIHJlc29sdmVkTmFtZSxcbiAgICAgICAgc3R5bGlzSW5zdGFuY2UodGhpcy5ydWxlcywgcmVzb2x2ZWROYW1lLCAnQGtleWZyYW1lcycpXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICB0b1N0cmluZyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhyb3dTdHlsZWRFcnJvcigxMiwgU3RyaW5nKHRoaXMubmFtZSkpO1xuICB9O1xuXG4gIGdldE5hbWUoc3R5bGlzSW5zdGFuY2U6IFN0cmluZ2lmaWVyID0gbWFzdGVyU3R5bGlzKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArIHN0eWxpc0luc3RhbmNlLmhhc2g7XG4gIH1cbn1cbiIsIi8vIEBmbG93XG5pbXBvcnQgdmFsaWRBdHRyIGZyb20gJ0BlbW90aW9uL2lzLXByb3AtdmFsaWQnO1xuaW1wb3J0IGhvaXN0IGZyb20gJ2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzJztcbmltcG9ydCBSZWFjdCwgeyBjcmVhdGVFbGVtZW50LCB0eXBlIFJlZiwgdXNlQ29udGV4dCwgdXNlRGVidWdWYWx1ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFNDX1ZFUlNJT04gfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHR5cGUge1xuICBBdHRycyxcbiAgSVN0eWxlZENvbXBvbmVudCxcbiAgSVN0eWxlZFN0YXRpY3MsXG4gIFJ1bGVTZXQsXG4gIFNob3VsZEZvcndhcmRQcm9wLFxuICBUYXJnZXQsXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGNoZWNrRHluYW1pY0NyZWF0aW9uIH0gZnJvbSAnLi4vdXRpbHMvY2hlY2tEeW5hbWljQ3JlYXRpb24nO1xuaW1wb3J0IGNyZWF0ZVdhcm5Ub29NYW55Q2xhc3NlcyBmcm9tICcuLi91dGlscy9jcmVhdGVXYXJuVG9vTWFueUNsYXNzZXMnO1xuaW1wb3J0IGRldGVybWluZVRoZW1lIGZyb20gJy4uL3V0aWxzL2RldGVybWluZVRoZW1lJztcbmltcG9ydCB7IEVNUFRZX0FSUkFZLCBFTVBUWV9PQkpFQ1QgfSBmcm9tICcuLi91dGlscy9lbXB0aWVzJztcbmltcG9ydCBlc2NhcGUgZnJvbSAnLi4vdXRpbHMvZXNjYXBlJztcbmltcG9ydCBnZW5lcmF0ZUNvbXBvbmVudElkIGZyb20gJy4uL3V0aWxzL2dlbmVyYXRlQ29tcG9uZW50SWQnO1xuaW1wb3J0IGdlbmVyYXRlRGlzcGxheU5hbWUgZnJvbSAnLi4vdXRpbHMvZ2VuZXJhdGVEaXNwbGF5TmFtZSc7XG5pbXBvcnQgZ2V0Q29tcG9uZW50TmFtZSBmcm9tICcuLi91dGlscy9nZXRDb21wb25lbnROYW1lJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4uL3V0aWxzL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3R5bGVkQ29tcG9uZW50IGZyb20gJy4uL3V0aWxzL2lzU3R5bGVkQ29tcG9uZW50JztcbmltcG9ydCBpc1RhZyBmcm9tICcuLi91dGlscy9pc1RhZyc7XG5pbXBvcnQgam9pblN0cmluZ3MgZnJvbSAnLi4vdXRpbHMvam9pblN0cmluZ3MnO1xuaW1wb3J0IG1lcmdlIGZyb20gJy4uL3V0aWxzL21peGluRGVlcCc7XG5pbXBvcnQgQ29tcG9uZW50U3R5bGUgZnJvbSAnLi9Db21wb25lbnRTdHlsZSc7XG5pbXBvcnQgeyB1c2VTdHlsZVNoZWV0LCB1c2VTdHlsaXMgfSBmcm9tICcuL1N0eWxlU2hlZXRNYW5hZ2VyJztcbmltcG9ydCB7IFRoZW1lQ29udGV4dCB9IGZyb20gJy4vVGhlbWVQcm92aWRlcic7XG5cbmNvbnN0IGlkZW50aWZpZXJzID0ge307XG5cbi8qIFdlIGRlcGVuZCBvbiBjb21wb25lbnRzIGhhdmluZyB1bmlxdWUgSURzICovXG5mdW5jdGlvbiBnZW5lcmF0ZUlkKGRpc3BsYXlOYW1lPzogc3RyaW5nLCBwYXJlbnRDb21wb25lbnRJZD86IHN0cmluZykge1xuICBjb25zdCBuYW1lID0gdHlwZW9mIGRpc3BsYXlOYW1lICE9PSAnc3RyaW5nJyA/ICdzYycgOiBlc2NhcGUoZGlzcGxheU5hbWUpO1xuICAvLyBFbnN1cmUgdGhhdCBubyBkaXNwbGF5TmFtZSBjYW4gbGVhZCB0byBkdXBsaWNhdGUgY29tcG9uZW50SWRzXG4gIGlkZW50aWZpZXJzW25hbWVdID0gKGlkZW50aWZpZXJzW25hbWVdIHx8IDApICsgMTtcblxuICBjb25zdCBjb21wb25lbnRJZCA9IGAke25hbWV9LSR7Z2VuZXJhdGVDb21wb25lbnRJZChcbiAgICAvLyBTQ19WRVJTSU9OIGdpdmVzIHVzIGlzb2xhdGlvbiBiZXR3ZWVuIG11bHRpcGxlIHJ1bnRpbWVzIG9uIHRoZSBwYWdlIGF0IG9uY2VcbiAgICAvLyB0aGlzIGlzIGltcHJvdmVkIGZ1cnRoZXIgd2l0aCB1c2Ugb2YgdGhlIGJhYmVsIHBsdWdpbiBcIm5hbWVzcGFjZVwiIGZlYXR1cmVcbiAgICBTQ19WRVJTSU9OICsgbmFtZSArIGlkZW50aWZpZXJzW25hbWVdXG4gICl9YDtcblxuICByZXR1cm4gcGFyZW50Q29tcG9uZW50SWQgPyBgJHtwYXJlbnRDb21wb25lbnRJZH0tJHtjb21wb25lbnRJZH1gIDogY29tcG9uZW50SWQ7XG59XG5cbmZ1bmN0aW9uIHVzZVJlc29sdmVkQXR0cnM8Q29uZmlnPih0aGVtZTogYW55ID0gRU1QVFlfT0JKRUNULCBwcm9wczogQ29uZmlnLCBhdHRyczogQXR0cnMpIHtcbiAgLy8gTk9URTogY2FuJ3QgbWVtb2l6ZSB0aGlzXG4gIC8vIHJldHVybnMgW2NvbnRleHQsIHJlc29sdmVkQXR0cnNdXG4gIC8vIHdoZXJlIHJlc29sdmVkQXR0cnMgaXMgb25seSB0aGUgdGhpbmdzIGluamVjdGVkIGJ5IHRoZSBhdHRycyB0aGVtc2VsdmVzXG4gIGNvbnN0IGNvbnRleHQgPSB7IC4uLnByb3BzLCB0aGVtZSB9O1xuICBjb25zdCByZXNvbHZlZEF0dHJzID0ge307XG5cbiAgYXR0cnMuZm9yRWFjaChhdHRyRGVmID0+IHtcbiAgICBsZXQgcmVzb2x2ZWRBdHRyRGVmID0gYXR0ckRlZjtcbiAgICBsZXQga2V5O1xuXG4gICAgaWYgKGlzRnVuY3Rpb24ocmVzb2x2ZWRBdHRyRGVmKSkge1xuICAgICAgcmVzb2x2ZWRBdHRyRGVmID0gcmVzb2x2ZWRBdHRyRGVmKGNvbnRleHQpO1xuICAgIH1cblxuICAgIC8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuICAgIGZvciAoa2V5IGluIHJlc29sdmVkQXR0ckRlZikge1xuICAgICAgY29udGV4dFtrZXldID0gcmVzb2x2ZWRBdHRyc1trZXldID1cbiAgICAgICAga2V5ID09PSAnY2xhc3NOYW1lJ1xuICAgICAgICAgID8gam9pblN0cmluZ3MocmVzb2x2ZWRBdHRyc1trZXldLCByZXNvbHZlZEF0dHJEZWZba2V5XSlcbiAgICAgICAgICA6IHJlc29sdmVkQXR0ckRlZltrZXldO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIGd1YXJkLWZvci1pbiAqL1xuICB9KTtcblxuICByZXR1cm4gW2NvbnRleHQsIHJlc29sdmVkQXR0cnNdO1xufVxuXG5mdW5jdGlvbiB1c2VJbmplY3RlZFN0eWxlPFQ+KFxuICBjb21wb25lbnRTdHlsZTogQ29tcG9uZW50U3R5bGUsXG4gIGlzU3RhdGljOiBib29sZWFuLFxuICByZXNvbHZlZEF0dHJzOiBULFxuICB3YXJuVG9vTWFueUNsYXNzZXM/OiAkQ2FsbDx0eXBlb2YgY3JlYXRlV2FyblRvb01hbnlDbGFzc2VzLCBzdHJpbmcsIHN0cmluZz5cbikge1xuICBjb25zdCBzdHlsZVNoZWV0ID0gdXNlU3R5bGVTaGVldCgpO1xuICBjb25zdCBzdHlsaXMgPSB1c2VTdHlsaXMoKTtcblxuICBjb25zdCBjbGFzc05hbWUgPSBpc1N0YXRpY1xuICAgID8gY29tcG9uZW50U3R5bGUuZ2VuZXJhdGVBbmRJbmplY3RTdHlsZXMoRU1QVFlfT0JKRUNULCBzdHlsZVNoZWV0LCBzdHlsaXMpXG4gICAgOiBjb21wb25lbnRTdHlsZS5nZW5lcmF0ZUFuZEluamVjdFN0eWxlcyhyZXNvbHZlZEF0dHJzLCBzdHlsZVNoZWV0LCBzdHlsaXMpO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9ydWxlcy1vZi1ob29rc1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgdXNlRGVidWdWYWx1ZShjbGFzc05hbWUpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFpc1N0YXRpYyAmJiB3YXJuVG9vTWFueUNsYXNzZXMpIHtcbiAgICB3YXJuVG9vTWFueUNsYXNzZXMoY2xhc3NOYW1lKTtcbiAgfVxuXG4gIHJldHVybiBjbGFzc05hbWU7XG59XG5cbmZ1bmN0aW9uIHVzZVN0eWxlZENvbXBvbmVudEltcGwoXG4gIGZvcndhcmRlZENvbXBvbmVudDogSVN0eWxlZENvbXBvbmVudCxcbiAgcHJvcHM6IE9iamVjdCxcbiAgZm9yd2FyZGVkUmVmOiBSZWY8YW55PixcbiAgaXNTdGF0aWM6IGJvb2xlYW5cbikge1xuICBjb25zdCB7XG4gICAgYXR0cnM6IGNvbXBvbmVudEF0dHJzLFxuICAgIGNvbXBvbmVudFN0eWxlLFxuICAgIGRlZmF1bHRQcm9wcyxcbiAgICBmb2xkZWRDb21wb25lbnRJZHMsXG4gICAgc2hvdWxkRm9yd2FyZFByb3AsXG4gICAgc3R5bGVkQ29tcG9uZW50SWQsXG4gICAgdGFyZ2V0LFxuICB9ID0gZm9yd2FyZGVkQ29tcG9uZW50O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9ydWxlcy1vZi1ob29rc1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgdXNlRGVidWdWYWx1ZShzdHlsZWRDb21wb25lbnRJZCk7XG5cbiAgLy8gTk9URTogdGhlIG5vbi1ob29rcyB2ZXJzaW9uIG9ubHkgc3Vic2NyaWJlcyB0byB0aGlzIHdoZW4gIWNvbXBvbmVudFN0eWxlLmlzU3RhdGljLFxuICAvLyBidXQgdGhhdCdkIGJlIGFnYWluc3QgdGhlIHJ1bGVzLW9mLWhvb2tzLiBXZSBjb3VsZCBiZSBuYXVnaHR5IGFuZCBkbyBpdCBhbnl3YXkgYXMgaXRcbiAgLy8gc2hvdWxkIGJlIGFuIGltbXV0YWJsZSB2YWx1ZSwgYnV0IGJlaGF2ZSBmb3Igbm93LlxuICBjb25zdCB0aGVtZSA9IGRldGVybWluZVRoZW1lKHByb3BzLCB1c2VDb250ZXh0KFRoZW1lQ29udGV4dCksIGRlZmF1bHRQcm9wcyk7XG5cbiAgY29uc3QgW2NvbnRleHQsIGF0dHJzXSA9IHVzZVJlc29sdmVkQXR0cnModGhlbWUgfHwgRU1QVFlfT0JKRUNULCBwcm9wcywgY29tcG9uZW50QXR0cnMpO1xuXG4gIGNvbnN0IGdlbmVyYXRlZENsYXNzTmFtZSA9IHVzZUluamVjdGVkU3R5bGUoXG4gICAgY29tcG9uZW50U3R5bGUsXG4gICAgaXNTdGF0aWMsXG4gICAgY29udGV4dCxcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gZm9yd2FyZGVkQ29tcG9uZW50Lndhcm5Ub29NYW55Q2xhc3NlcyA6IHVuZGVmaW5lZFxuICApO1xuXG4gIGNvbnN0IHJlZlRvRm9yd2FyZCA9IGZvcndhcmRlZFJlZjtcblxuICBjb25zdCBlbGVtZW50VG9CZUNyZWF0ZWQ6IFRhcmdldCA9IGF0dHJzLiRhcyB8fCBwcm9wcy4kYXMgfHwgYXR0cnMuYXMgfHwgcHJvcHMuYXMgfHwgdGFyZ2V0O1xuXG4gIGNvbnN0IGlzVGFyZ2V0VGFnID0gaXNUYWcoZWxlbWVudFRvQmVDcmVhdGVkKTtcbiAgY29uc3QgY29tcHV0ZWRQcm9wcyA9IGF0dHJzICE9PSBwcm9wcyA/IHsgLi4ucHJvcHMsIC4uLmF0dHJzIH0gOiBwcm9wcztcbiAgY29uc3QgcHJvcHNGb3JFbGVtZW50ID0ge307XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGd1YXJkLWZvci1pblxuICBmb3IgKGNvbnN0IGtleSBpbiBjb21wdXRlZFByb3BzKSB7XG4gICAgaWYgKGtleVswXSA9PT0gJyQnIHx8IGtleSA9PT0gJ2FzJykgY29udGludWU7XG4gICAgZWxzZSBpZiAoa2V5ID09PSAnZm9yd2FyZGVkQXMnKSB7XG4gICAgICBwcm9wc0ZvckVsZW1lbnQuYXMgPSBjb21wdXRlZFByb3BzW2tleV07XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHNob3VsZEZvcndhcmRQcm9wID8gc2hvdWxkRm9yd2FyZFByb3Aoa2V5LCB2YWxpZEF0dHIpIDogaXNUYXJnZXRUYWcgPyB2YWxpZEF0dHIoa2V5KSA6IHRydWVcbiAgICApIHtcbiAgICAgIC8vIERvbid0IHBhc3MgdGhyb3VnaCBub24gSFRNTCB0YWdzIHRocm91Z2ggdG8gSFRNTCBlbGVtZW50c1xuICAgICAgcHJvcHNGb3JFbGVtZW50W2tleV0gPSBjb21wdXRlZFByb3BzW2tleV07XG4gICAgfVxuICB9XG5cbiAgaWYgKHByb3BzLnN0eWxlICYmIGF0dHJzLnN0eWxlICE9PSBwcm9wcy5zdHlsZSkge1xuICAgIHByb3BzRm9yRWxlbWVudC5zdHlsZSA9IHsgLi4ucHJvcHMuc3R5bGUsIC4uLmF0dHJzLnN0eWxlIH07XG4gIH1cblxuICBwcm9wc0ZvckVsZW1lbnQuY2xhc3NOYW1lID0gQXJyYXkucHJvdG90eXBlXG4gICAgLmNvbmNhdChcbiAgICAgIGZvbGRlZENvbXBvbmVudElkcyxcbiAgICAgIHN0eWxlZENvbXBvbmVudElkLFxuICAgICAgZ2VuZXJhdGVkQ2xhc3NOYW1lICE9PSBzdHlsZWRDb21wb25lbnRJZCA/IGdlbmVyYXRlZENsYXNzTmFtZSA6IG51bGwsXG4gICAgICBwcm9wcy5jbGFzc05hbWUsXG4gICAgICBhdHRycy5jbGFzc05hbWVcbiAgICApXG4gICAgLmZpbHRlcihCb29sZWFuKVxuICAgIC5qb2luKCcgJyk7XG5cbiAgcHJvcHNGb3JFbGVtZW50LnJlZiA9IHJlZlRvRm9yd2FyZDtcblxuICByZXR1cm4gY3JlYXRlRWxlbWVudChlbGVtZW50VG9CZUNyZWF0ZWQsIHByb3BzRm9yRWxlbWVudCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVN0eWxlZENvbXBvbmVudChcbiAgdGFyZ2V0OiAkUHJvcGVydHlUeXBlPElTdHlsZWRDb21wb25lbnQsICd0YXJnZXQnPixcbiAgb3B0aW9uczoge1xuICAgIGF0dHJzPzogQXR0cnMsXG4gICAgY29tcG9uZW50SWQ6IHN0cmluZyxcbiAgICBkaXNwbGF5TmFtZT86IHN0cmluZyxcbiAgICBwYXJlbnRDb21wb25lbnRJZD86IHN0cmluZyxcbiAgICBzaG91bGRGb3J3YXJkUHJvcD86IFNob3VsZEZvcndhcmRQcm9wLFxuICB9LFxuICBydWxlczogUnVsZVNldFxuKSB7XG4gIGNvbnN0IGlzVGFyZ2V0U3R5bGVkQ29tcCA9IGlzU3R5bGVkQ29tcG9uZW50KHRhcmdldCk7XG4gIGNvbnN0IGlzQ29tcG9zaXRlQ29tcG9uZW50ID0gIWlzVGFnKHRhcmdldCk7XG5cbiAgY29uc3Qge1xuICAgIGF0dHJzID0gRU1QVFlfQVJSQVksXG4gICAgY29tcG9uZW50SWQgPSBnZW5lcmF0ZUlkKG9wdGlvbnMuZGlzcGxheU5hbWUsIG9wdGlvbnMucGFyZW50Q29tcG9uZW50SWQpLFxuICAgIGRpc3BsYXlOYW1lID0gZ2VuZXJhdGVEaXNwbGF5TmFtZSh0YXJnZXQpLFxuICB9ID0gb3B0aW9ucztcblxuICBjb25zdCBzdHlsZWRDb21wb25lbnRJZCA9XG4gICAgb3B0aW9ucy5kaXNwbGF5TmFtZSAmJiBvcHRpb25zLmNvbXBvbmVudElkXG4gICAgICA/IGAke2VzY2FwZShvcHRpb25zLmRpc3BsYXlOYW1lKX0tJHtvcHRpb25zLmNvbXBvbmVudElkfWBcbiAgICAgIDogb3B0aW9ucy5jb21wb25lbnRJZCB8fCBjb21wb25lbnRJZDtcblxuICAvLyBmb2xkIHRoZSB1bmRlcmx5aW5nIFN0eWxlZENvbXBvbmVudCBhdHRycyB1cCAoaW1wbGljaXQgZXh0ZW5kKVxuICBjb25zdCBmaW5hbEF0dHJzID1cbiAgICBpc1RhcmdldFN0eWxlZENvbXAgJiYgKCh0YXJnZXQ6IGFueSk6IElTdHlsZWRDb21wb25lbnQpLmF0dHJzXG4gICAgICA/IEFycmF5LnByb3RvdHlwZS5jb25jYXQoKCh0YXJnZXQ6IGFueSk6IElTdHlsZWRDb21wb25lbnQpLmF0dHJzLCBhdHRycykuZmlsdGVyKEJvb2xlYW4pXG4gICAgICA6IGF0dHJzO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICBsZXQgc2hvdWxkRm9yd2FyZFByb3AgPSBvcHRpb25zLnNob3VsZEZvcndhcmRQcm9wO1xuXG4gIGlmIChpc1RhcmdldFN0eWxlZENvbXAgJiYgdGFyZ2V0LnNob3VsZEZvcndhcmRQcm9wKSB7XG4gICAgaWYgKG9wdGlvbnMuc2hvdWxkRm9yd2FyZFByb3ApIHtcbiAgICAgIC8vIGNvbXBvc2UgbmVzdGVkIHNob3VsZEZvcndhcmRQcm9wIGNhbGxzXG4gICAgICBzaG91bGRGb3J3YXJkUHJvcCA9IChwcm9wLCBmaWx0ZXJGbikgPT5cbiAgICAgICAgKCgoKHRhcmdldDogYW55KTogSVN0eWxlZENvbXBvbmVudCkuc2hvdWxkRm9yd2FyZFByb3A6IGFueSk6IFNob3VsZEZvcndhcmRQcm9wKShcbiAgICAgICAgICBwcm9wLFxuICAgICAgICAgIGZpbHRlckZuXG4gICAgICAgICkgJiYgKChvcHRpb25zLnNob3VsZEZvcndhcmRQcm9wOiBhbnkpOiBTaG91bGRGb3J3YXJkUHJvcCkocHJvcCwgZmlsdGVyRm4pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgIHNob3VsZEZvcndhcmRQcm9wID0gKCh0YXJnZXQ6IGFueSk6IElTdHlsZWRDb21wb25lbnQpLnNob3VsZEZvcndhcmRQcm9wO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbXBvbmVudFN0eWxlID0gbmV3IENvbXBvbmVudFN0eWxlKFxuICAgIHJ1bGVzLFxuICAgIHN0eWxlZENvbXBvbmVudElkLFxuICAgIGlzVGFyZ2V0U3R5bGVkQ29tcCA/ICgodGFyZ2V0OiBPYmplY3QpLmNvbXBvbmVudFN0eWxlOiBDb21wb25lbnRTdHlsZSkgOiB1bmRlZmluZWRcbiAgKTtcblxuICAvLyBzdGF0aWNhbGx5IHN0eWxlZC1jb21wb25lbnRzIGRvbid0IG5lZWQgdG8gYnVpbGQgYW4gZXhlY3V0aW9uIGNvbnRleHQgb2JqZWN0LFxuICAvLyBhbmQgc2hvdWxkbid0IGJlIGluY3JlYXNpbmcgdGhlIG51bWJlciBvZiBjbGFzcyBuYW1lc1xuICBjb25zdCBpc1N0YXRpYyA9IGNvbXBvbmVudFN0eWxlLmlzU3RhdGljICYmIGF0dHJzLmxlbmd0aCA9PT0gMDtcblxuICAvKipcbiAgICogZm9yd2FyZFJlZiBjcmVhdGVzIGEgbmV3IGludGVyaW0gY29tcG9uZW50LCB3aGljaCB3ZSdsbCB0YWtlIGFkdmFudGFnZSBvZlxuICAgKiBpbnN0ZWFkIG9mIGV4dGVuZGluZyBQYXJlbnRDb21wb25lbnQgdG8gY3JlYXRlIF9hbm90aGVyXyBpbnRlcmltIGNsYXNzXG4gICAqL1xuICBsZXQgV3JhcHBlZFN0eWxlZENvbXBvbmVudDogSVN0eWxlZENvbXBvbmVudDtcblxuICBjb25zdCBmb3J3YXJkUmVmID0gKHByb3BzLCByZWYpID0+XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgdXNlU3R5bGVkQ29tcG9uZW50SW1wbChXcmFwcGVkU3R5bGVkQ29tcG9uZW50LCBwcm9wcywgcmVmLCBpc1N0YXRpYyk7XG5cbiAgZm9yd2FyZFJlZi5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuXG4gIFdyYXBwZWRTdHlsZWRDb21wb25lbnQgPSAoKFJlYWN0LmZvcndhcmRSZWYoZm9yd2FyZFJlZik6IGFueSk6IElTdHlsZWRDb21wb25lbnQpO1xuICBXcmFwcGVkU3R5bGVkQ29tcG9uZW50LmF0dHJzID0gZmluYWxBdHRycztcbiAgV3JhcHBlZFN0eWxlZENvbXBvbmVudC5jb21wb25lbnRTdHlsZSA9IGNvbXBvbmVudFN0eWxlO1xuICBXcmFwcGVkU3R5bGVkQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gIFdyYXBwZWRTdHlsZWRDb21wb25lbnQuc2hvdWxkRm9yd2FyZFByb3AgPSBzaG91bGRGb3J3YXJkUHJvcDtcblxuICAvLyB0aGlzIHN0YXRpYyBpcyB1c2VkIHRvIHByZXNlcnZlIHRoZSBjYXNjYWRlIG9mIHN0YXRpYyBjbGFzc2VzIGZvciBjb21wb25lbnQgc2VsZWN0b3JcbiAgLy8gcHVycG9zZXM7IHRoaXMgaXMgZXNwZWNpYWxseSBpbXBvcnRhbnQgd2l0aCB1c2FnZSBvZiB0aGUgY3NzIHByb3BcbiAgV3JhcHBlZFN0eWxlZENvbXBvbmVudC5mb2xkZWRDb21wb25lbnRJZHMgPSBpc1RhcmdldFN0eWxlZENvbXBcbiAgICA/IEFycmF5LnByb3RvdHlwZS5jb25jYXQoXG4gICAgICAgICgodGFyZ2V0OiBhbnkpOiBJU3R5bGVkQ29tcG9uZW50KS5mb2xkZWRDb21wb25lbnRJZHMsXG4gICAgICAgICgodGFyZ2V0OiBhbnkpOiBJU3R5bGVkQ29tcG9uZW50KS5zdHlsZWRDb21wb25lbnRJZFxuICAgICAgKVxuICAgIDogRU1QVFlfQVJSQVk7XG5cbiAgV3JhcHBlZFN0eWxlZENvbXBvbmVudC5zdHlsZWRDb21wb25lbnRJZCA9IHN0eWxlZENvbXBvbmVudElkO1xuXG4gIC8vIGZvbGQgdGhlIHVuZGVybHlpbmcgU3R5bGVkQ29tcG9uZW50IHRhcmdldCB1cCBzaW5jZSB3ZSBmb2xkZWQgdGhlIHN0eWxlc1xuICBXcmFwcGVkU3R5bGVkQ29tcG9uZW50LnRhcmdldCA9IGlzVGFyZ2V0U3R5bGVkQ29tcFxuICAgID8gKCh0YXJnZXQ6IGFueSk6IElTdHlsZWRDb21wb25lbnQpLnRhcmdldFxuICAgIDogdGFyZ2V0O1xuXG4gIFdyYXBwZWRTdHlsZWRDb21wb25lbnQud2l0aENvbXBvbmVudCA9IGZ1bmN0aW9uIHdpdGhDb21wb25lbnQodGFnOiBUYXJnZXQpIHtcbiAgICBjb25zdCB7IGNvbXBvbmVudElkOiBwcmV2aW91c0NvbXBvbmVudElkLCAuLi5vcHRpb25zVG9Db3B5IH0gPSBvcHRpb25zO1xuXG4gICAgY29uc3QgbmV3Q29tcG9uZW50SWQgPVxuICAgICAgcHJldmlvdXNDb21wb25lbnRJZCAmJlxuICAgICAgYCR7cHJldmlvdXNDb21wb25lbnRJZH0tJHtpc1RhZyh0YWcpID8gdGFnIDogZXNjYXBlKGdldENvbXBvbmVudE5hbWUodGFnKSl9YDtcblxuICAgIGNvbnN0IG5ld09wdGlvbnMgPSB7XG4gICAgICAuLi5vcHRpb25zVG9Db3B5LFxuICAgICAgYXR0cnM6IGZpbmFsQXR0cnMsXG4gICAgICBjb21wb25lbnRJZDogbmV3Q29tcG9uZW50SWQsXG4gICAgfTtcblxuICAgIHJldHVybiBjcmVhdGVTdHlsZWRDb21wb25lbnQodGFnLCBuZXdPcHRpb25zLCBydWxlcyk7XG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdyYXBwZWRTdHlsZWRDb21wb25lbnQsICdkZWZhdWx0UHJvcHMnLCB7XG4gICAgZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2ZvbGRlZERlZmF1bHRQcm9wcztcbiAgICB9LFxuXG4gICAgc2V0KG9iaikge1xuICAgICAgdGhpcy5fZm9sZGVkRGVmYXVsdFByb3BzID0gaXNUYXJnZXRTdHlsZWRDb21wXG4gICAgICAgID8gbWVyZ2Uoe30sICgodGFyZ2V0OiBhbnkpOiBJU3R5bGVkQ29tcG9uZW50KS5kZWZhdWx0UHJvcHMsIG9iailcbiAgICAgICAgOiBvYmo7XG4gICAgfSxcbiAgfSk7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBjaGVja0R5bmFtaWNDcmVhdGlvbihkaXNwbGF5TmFtZSwgc3R5bGVkQ29tcG9uZW50SWQpO1xuXG4gICAgV3JhcHBlZFN0eWxlZENvbXBvbmVudC53YXJuVG9vTWFueUNsYXNzZXMgPSBjcmVhdGVXYXJuVG9vTWFueUNsYXNzZXMoXG4gICAgICBkaXNwbGF5TmFtZSxcbiAgICAgIHN0eWxlZENvbXBvbmVudElkXG4gICAgKTtcbiAgfVxuXG4gIFdyYXBwZWRTdHlsZWRDb21wb25lbnQudG9TdHJpbmcgPSAoKSA9PiBgLiR7V3JhcHBlZFN0eWxlZENvbXBvbmVudC5zdHlsZWRDb21wb25lbnRJZH1gO1xuXG4gIGlmIChpc0NvbXBvc2l0ZUNvbXBvbmVudCkge1xuICAgIGhvaXN0PFxuICAgICAgSVN0eWxlZFN0YXRpY3MsXG4gICAgICAkUHJvcGVydHlUeXBlPElTdHlsZWRDb21wb25lbnQsICd0YXJnZXQnPixcbiAgICAgIHsgW2tleTogJEtleXM8SVN0eWxlZFN0YXRpY3M+XTogdHJ1ZSB9XG4gICAgPihXcmFwcGVkU3R5bGVkQ29tcG9uZW50LCAoKHRhcmdldDogYW55KTogJFByb3BlcnR5VHlwZTxJU3R5bGVkQ29tcG9uZW50LCAndGFyZ2V0Jz4pLCB7XG4gICAgICAvLyBhbGwgU0Mtc3BlY2lmaWMgdGhpbmdzIHNob3VsZCBub3QgYmUgaG9pc3RlZFxuICAgICAgYXR0cnM6IHRydWUsXG4gICAgICBjb21wb25lbnRTdHlsZTogdHJ1ZSxcbiAgICAgIGRpc3BsYXlOYW1lOiB0cnVlLFxuICAgICAgZm9sZGVkQ29tcG9uZW50SWRzOiB0cnVlLFxuICAgICAgc2hvdWxkRm9yd2FyZFByb3A6IHRydWUsXG4gICAgICBzdHlsZWRDb21wb25lbnRJZDogdHJ1ZSxcbiAgICAgIHRhcmdldDogdHJ1ZSxcbiAgICAgIHdpdGhDb21wb25lbnQ6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gV3JhcHBlZFN0eWxlZENvbXBvbmVudDtcbn1cbiIsIi8vIEBmbG93XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tICcuLi9zaGVldCc7XG5pbXBvcnQgdHlwZSB7IFJ1bGVTZXQsIFN0cmluZ2lmaWVyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IGZsYXR0ZW4gZnJvbSAnLi4vdXRpbHMvZmxhdHRlbic7XG5pbXBvcnQgaXNTdGF0aWNSdWxlcyBmcm9tICcuLi91dGlscy9pc1N0YXRpY1J1bGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2xvYmFsU3R5bGUge1xuICBjb21wb25lbnRJZDogc3RyaW5nO1xuXG4gIGlzU3RhdGljOiBib29sZWFuO1xuXG4gIHJ1bGVzOiBSdWxlU2V0O1xuXG4gIGNvbnN0cnVjdG9yKHJ1bGVzOiBSdWxlU2V0LCBjb21wb25lbnRJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5ydWxlcyA9IHJ1bGVzO1xuICAgIHRoaXMuY29tcG9uZW50SWQgPSBjb21wb25lbnRJZDtcbiAgICB0aGlzLmlzU3RhdGljID0gaXNTdGF0aWNSdWxlcyhydWxlcyk7XG5cbiAgICAvLyBwcmUtcmVnaXN0ZXIgdGhlIGZpcnN0IGluc3RhbmNlIHRvIGVuc3VyZSBnbG9iYWwgc3R5bGVzXG4gICAgLy8gbG9hZCBiZWZvcmUgY29tcG9uZW50IG9uZXNcbiAgICBTdHlsZVNoZWV0LnJlZ2lzdGVySWQodGhpcy5jb21wb25lbnRJZCArIDEpO1xuICB9XG5cbiAgY3JlYXRlU3R5bGVzKFxuICAgIGluc3RhbmNlOiBudW1iZXIsXG4gICAgZXhlY3V0aW9uQ29udGV4dDogT2JqZWN0LFxuICAgIHN0eWxlU2hlZXQ6IFN0eWxlU2hlZXQsXG4gICAgc3R5bGlzOiBTdHJpbmdpZmllclxuICApIHtcbiAgICBjb25zdCBmbGF0Q1NTID0gZmxhdHRlbih0aGlzLnJ1bGVzLCBleGVjdXRpb25Db250ZXh0LCBzdHlsZVNoZWV0LCBzdHlsaXMpO1xuICAgIGNvbnN0IGNzcyA9IHN0eWxpcyhmbGF0Q1NTLmpvaW4oJycpLCAnJyk7XG4gICAgY29uc3QgaWQgPSB0aGlzLmNvbXBvbmVudElkICsgaW5zdGFuY2U7XG5cbiAgICAvLyBOT1RFOiBXZSB1c2UgdGhlIGlkIGFzIGEgbmFtZSBhcyB3ZWxsLCBzaW5jZSB0aGVzZSBydWxlcyBuZXZlciBjaGFuZ2VcbiAgICBzdHlsZVNoZWV0Lmluc2VydFJ1bGVzKGlkLCBpZCwgY3NzKTtcbiAgfVxuXG4gIHJlbW92ZVN0eWxlcyhpbnN0YW5jZTogbnVtYmVyLCBzdHlsZVNoZWV0OiBTdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVTaGVldC5jbGVhclJ1bGVzKHRoaXMuY29tcG9uZW50SWQgKyBpbnN0YW5jZSk7XG4gIH1cblxuICByZW5kZXJTdHlsZXMoXG4gICAgaW5zdGFuY2U6IG51bWJlcixcbiAgICBleGVjdXRpb25Db250ZXh0OiBPYmplY3QsXG4gICAgc3R5bGVTaGVldDogU3R5bGVTaGVldCxcbiAgICBzdHlsaXM6IFN0cmluZ2lmaWVyXG4gICkge1xuICAgIGlmIChpbnN0YW5jZSA+IDIpIFN0eWxlU2hlZXQucmVnaXN0ZXJJZCh0aGlzLmNvbXBvbmVudElkICsgaW5zdGFuY2UpO1xuXG4gICAgLy8gTk9URTogUmVtb3ZlIG9sZCBzdHlsZXMsIHRoZW4gaW5qZWN0IHRoZSBuZXcgb25lc1xuICAgIHRoaXMucmVtb3ZlU3R5bGVzKGluc3RhbmNlLCBzdHlsZVNoZWV0KTtcbiAgICB0aGlzLmNyZWF0ZVN0eWxlcyhpbnN0YW5jZSwgZXhlY3V0aW9uQ29udGV4dCwgc3R5bGVTaGVldCwgc3R5bGlzKTtcbiAgfVxufVxuIiwiLy8gQGZsb3dcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgSVNfQlJPV1NFUiwgU0NfQVRUUiwgU0NfQVRUUl9WRVJTSU9OLCBTQ19WRVJTSU9OIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB0aHJvd1N0eWxlZEVycm9yIGZyb20gJy4uL3V0aWxzL2Vycm9yJztcbmltcG9ydCBnZXROb25jZSBmcm9tICcuLi91dGlscy9ub25jZSc7XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tICcuLi9zaGVldCc7XG5pbXBvcnQgU3R5bGVTaGVldE1hbmFnZXIgZnJvbSAnLi9TdHlsZVNoZWV0TWFuYWdlcic7XG5cbmRlY2xhcmUgdmFyIF9fU0VSVkVSX186IGJvb2xlYW47XG5cbmNvbnN0IENMT1NJTkdfVEFHX1IgPSAvXlxccyo8XFwvW2Etel0vaTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyU3R5bGVTaGVldCB7XG4gIGlzU3RyZWFtaW5nOiBib29sZWFuO1xuXG4gIGluc3RhbmNlOiBTdHlsZVNoZWV0O1xuXG4gIHNlYWxlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFN0eWxlU2hlZXQoeyBpc1NlcnZlcjogdHJ1ZSB9KTtcbiAgICB0aGlzLnNlYWxlZCA9IGZhbHNlO1xuICB9XG5cbiAgX2VtaXRTaGVldENTUyA9ICgpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IGNzcyA9IHRoaXMuaW5zdGFuY2UudG9TdHJpbmcoKTtcbiAgICBjb25zdCBub25jZSA9IGdldE5vbmNlKCk7XG4gICAgY29uc3QgYXR0cnMgPSBbbm9uY2UgJiYgYG5vbmNlPVwiJHtub25jZX1cImAsIGAke1NDX0FUVFJ9PVwidHJ1ZVwiYCwgYCR7U0NfQVRUUl9WRVJTSU9OfT1cIiR7U0NfVkVSU0lPTn1cImBdO1xuICAgIGNvbnN0IGh0bWxBdHRyID0gYXR0cnMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKTtcblxuICAgIHJldHVybiBgPHN0eWxlICR7aHRtbEF0dHJ9PiR7Y3NzfTwvc3R5bGU+YDtcbiAgfTtcblxuICBjb2xsZWN0U3R5bGVzKGNoaWxkcmVuOiBhbnkpIHtcbiAgICBpZiAodGhpcy5zZWFsZWQpIHtcbiAgICAgIHJldHVybiB0aHJvd1N0eWxlZEVycm9yKDIpO1xuICAgIH1cblxuICAgIHJldHVybiA8U3R5bGVTaGVldE1hbmFnZXIgc2hlZXQ9e3RoaXMuaW5zdGFuY2V9PntjaGlsZHJlbn08L1N0eWxlU2hlZXRNYW5hZ2VyPjtcbiAgfVxuXG4gIGdldFN0eWxlVGFncyA9ICgpOiBzdHJpbmcgPT4ge1xuICAgIGlmICh0aGlzLnNlYWxlZCkge1xuICAgICAgcmV0dXJuIHRocm93U3R5bGVkRXJyb3IoMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2VtaXRTaGVldENTUygpO1xuICB9O1xuXG4gIGdldFN0eWxlRWxlbWVudCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zZWFsZWQpIHtcbiAgICAgIHJldHVybiB0aHJvd1N0eWxlZEVycm9yKDIpO1xuICAgIH1cblxuICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgW1NDX0FUVFJdOiAnJyxcbiAgICAgIFtTQ19BVFRSX1ZFUlNJT05dOiBTQ19WRVJTSU9OLFxuICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHtcbiAgICAgICAgX19odG1sOiB0aGlzLmluc3RhbmNlLnRvU3RyaW5nKCksXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBub25jZSA9IGdldE5vbmNlKCk7XG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICAocHJvcHM6IGFueSkubm9uY2UgPSBub25jZTtcbiAgICB9XG5cbiAgICAvLyB2NCByZXR1cm5lZCBhbiBhcnJheSBmb3IgdGhpcyBmbiwgc28gd2UnbGwgZG8gdGhlIHNhbWUgZm9yIHY1IGZvciBiYWNrd2FyZCBjb21wYXRcbiAgICByZXR1cm4gWzxzdHlsZSB7Li4ucHJvcHN9IGtleT1cInNjLTAtMFwiIC8+XTtcbiAgfTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgaW50ZXJsZWF2ZVdpdGhOb2RlU3RyZWFtKGlucHV0OiBhbnkpIHtcbiAgICBpZiAoIV9fU0VSVkVSX18gfHwgSVNfQlJPV1NFUikge1xuICAgICAgcmV0dXJuIHRocm93U3R5bGVkRXJyb3IoMyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNlYWxlZCkge1xuICAgICAgcmV0dXJuIHRocm93U3R5bGVkRXJyb3IoMik7XG4gICAgfVxuXG4gICAgaWYgKF9fU0VSVkVSX18pIHtcbiAgICAgIHRoaXMuc2VhbCgpO1xuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ2xvYmFsLXJlcXVpcmVcbiAgICAgIGNvbnN0IHsgUmVhZGFibGUsIFRyYW5zZm9ybSB9ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbiAgICAgIGNvbnN0IHJlYWRhYmxlU3RyZWFtOiBSZWFkYWJsZSA9IGlucHV0O1xuICAgICAgY29uc3QgeyBpbnN0YW5jZTogc2hlZXQsIF9lbWl0U2hlZXRDU1MgfSA9IHRoaXM7XG5cbiAgICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gbmV3IFRyYW5zZm9ybSh7XG4gICAgICAgIHRyYW5zZm9ybTogZnVuY3Rpb24gYXBwZW5kU3R5bGVDaHVua3MoY2h1bmssIC8qIGVuY29kaW5nICovIF8sIGNhbGxiYWNrKSB7XG4gICAgICAgICAgLy8gR2V0IHRoZSBjaHVuayBhbmQgcmV0cmlldmUgdGhlIHNoZWV0J3MgQ1NTIGFzIGFuIEhUTUwgY2h1bmssXG4gICAgICAgICAgLy8gdGhlbiByZXNldCBpdHMgcnVsZXMgc28gd2UgZ2V0IG9ubHkgbmV3IG9uZXMgZm9yIHRoZSBuZXh0IGNodW5rXG4gICAgICAgICAgY29uc3QgcmVuZGVyZWRIdG1sID0gY2h1bmsudG9TdHJpbmcoKTtcbiAgICAgICAgICBjb25zdCBodG1sID0gX2VtaXRTaGVldENTUygpO1xuXG4gICAgICAgICAgc2hlZXQuY2xlYXJUYWcoKTtcblxuICAgICAgICAgIC8vIHByZXBlbmQgc3R5bGUgaHRtbCB0byBjaHVuaywgdW5sZXNzIHRoZSBzdGFydCBvZiB0aGUgY2h1bmsgaXMgYVxuICAgICAgICAgIC8vIGNsb3NpbmcgdGFnIGluIHdoaWNoIGNhc2UgYXBwZW5kIHJpZ2h0IGFmdGVyIHRoYXRcbiAgICAgICAgICBpZiAoQ0xPU0lOR19UQUdfUi50ZXN0KHJlbmRlcmVkSHRtbCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVuZE9mQ2xvc2luZ1RhZyA9IHJlbmRlcmVkSHRtbC5pbmRleE9mKCc+JykgKyAxO1xuICAgICAgICAgICAgY29uc3QgYmVmb3JlID0gcmVuZGVyZWRIdG1sLnNsaWNlKDAsIGVuZE9mQ2xvc2luZ1RhZyk7XG4gICAgICAgICAgICBjb25zdCBhZnRlciA9IHJlbmRlcmVkSHRtbC5zbGljZShlbmRPZkNsb3NpbmdUYWcpO1xuXG4gICAgICAgICAgICB0aGlzLnB1c2goYmVmb3JlICsgaHRtbCArIGFmdGVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wdXNoKGh0bWwgKyByZW5kZXJlZEh0bWwpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgcmVhZGFibGVTdHJlYW0ub24oJ2Vycm9yJywgZXJyID0+IHtcbiAgICAgICAgLy8gZm9yd2FyZCB0aGUgZXJyb3IgdG8gdGhlIHRyYW5zZm9ybSBzdHJlYW1cbiAgICAgICAgdHJhbnNmb3JtZXIuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZWFkYWJsZVN0cmVhbS5waXBlKHRyYW5zZm9ybWVyKTtcbiAgICB9XG4gIH1cblxuICBzZWFsID0gKCkgPT4ge1xuICAgIHRoaXMuc2VhbGVkID0gdHJ1ZTtcbiAgfTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=