(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~Asset~ByLocation~ByMeter~Company~Customer~Location~Meter~NewMeterWizard"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9pcy1wcm9wLXZhbGlkL2Rpc3QvaXMtcHJvcC12YWxpZC5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9tZW1vaXplL2Rpc3QvbWVtb2l6ZS5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZW1vdGlvbi9zdHlsaXMvZGlzdC9zdHlsaXMuYnJvd3Nlci5lc20uanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGVtb3Rpb24vdW5pdGxlc3MvZGlzdC91bml0bGVzcy5icm93c2VyLmVzbS5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL2dwYS1zeW1ib2xzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL2hlbHBlci1mdW5jdGlvbnMvbGliL0NyZWF0ZUd1aWQuanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9oZWxwZXItZnVuY3Rpb25zL2xpYi9HZXROb2RlU2l6ZS5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL2hlbHBlci1mdW5jdGlvbnMvbGliL0dldFRleHRXaWR0aC5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL2hlbHBlci1mdW5jdGlvbnMvbGliL2luZGV4LmpzIiwid2VicGFjazovLy9EOi9Qcm9qZWN0cy9TeXN0ZW1DZW50ZXIvU291cmNlL0FwcGxpY2F0aW9ucy9TeXN0ZW1DZW50ZXIvbm9kZV9tb2R1bGVzL0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUvbGliL0xvYWRpbmdJY29uLmpzIiwid2VicGFjazovLy9EOi9Qcm9qZWN0cy9TeXN0ZW1DZW50ZXIvU291cmNlL0FwcGxpY2F0aW9ucy9TeXN0ZW1DZW50ZXIvbm9kZV9tb2R1bGVzL0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUvbGliL0xvYWRpbmdTY3JlZW4uanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9yZWFjdC1pbnRlcmFjdGl2ZS9saWIvTW9kYWwuanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9yZWFjdC1pbnRlcmFjdGl2ZS9saWIvU2VhcmNoQmFyLmpzIiwid2VicGFjazovLy9EOi9Qcm9qZWN0cy9TeXN0ZW1DZW50ZXIvU291cmNlL0FwcGxpY2F0aW9ucy9TeXN0ZW1DZW50ZXIvbm9kZV9tb2R1bGVzL0BncGEtZ2Vtc3RvbmUvcmVhY3QtaW50ZXJhY3RpdmUvbGliL1Rvb2xUaXAuanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvQGdwYS1nZW1zdG9uZS9yZWFjdC1pbnRlcmFjdGl2ZS9saWIvV2FybmluZy5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LWludGVyYWN0aXZlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9AZ3BhLWdlbXN0b25lL3JlYWN0LXRhYmxlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovUHJvamVjdHMvU3lzdGVtQ2VudGVyL1NvdXJjZS9BcHBsaWNhdGlvbnMvU3lzdGVtQ2VudGVyL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L1Byb2plY3RzL1N5c3RlbUNlbnRlci9Tb3VyY2UvQXBwbGljYXRpb25zL1N5c3RlbUNlbnRlci9ub2RlX21vZHVsZXMvc2hhbGxvd2VxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uLi9zcmMvc2hlZXQvVGFnLmpzIiwid2VicGFjazovLy8uLi9zcmMvc2hlZXQvU2hlZXQuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy91dGlscy9pc1N0YXRpY1J1bGVzLmpzIiwid2VicGFjazovLy8uLi9zcmMvbW9kZWxzL0tleWZyYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL21vZGVscy9TdHlsZWRDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tb2RlbHMvR2xvYmFsU3R5bGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9tb2RlbHMvU2VydmVyU3R5bGVTaGVldC5qcyJdLCJuYW1lcyI6WyJub2RlcyIsImluc2VydFJ1bGUiLCJuYW1lcyIsImlkIiwib3B0aW9ucyIsImZsYXR0ZW4iLCJSZWFjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBdUM7O0FBRXZDLGs3SEFBazdIOztBQUVsN0gsWUFBWSxnRUFBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLG9FQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNkckI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxzRUFBTyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDUnZCO0FBQUE7QUFDQTtBQUNBLHlLQUF5SyxPQUFPO0FBQ2hMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLE9BQU87QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0Isa0NBQWtDO0FBQzFEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFVBQVU7QUFDeEM7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixVQUFVO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFVBQVU7O0FBRXBDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbERhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xDYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6Q2E7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2Q2E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7QUNuSEE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhzQkMxQ2dDLHVvT0NtRk5BLGdIQWdCeEJDLFdBQUEseVdDM0RRQyx5eEJBbUM4QkMsaU9Ba0JWQSxreUJDM0Z1QixtaUhDY0hBLHV5TENxUGlCQyxxd0ZDL08vQ0Msa0NBRVZGLGs2RUNzQ0VHIiwiZmlsZSI6InZlbmRvcnN+QXNzZXR+QnlMb2NhdGlvbn5CeU1ldGVyfkNvbXBhbnl+Q3VzdG9tZXJ+TG9jYXRpb25+TWV0ZXJ+TmV3TWV0ZXJXaXphcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWVtb2l6ZSBmcm9tICdAZW1vdGlvbi9tZW1vaXplJztcblxudmFyIHJlYWN0UHJvcHNSZWdleCA9IC9eKChjaGlsZHJlbnxkYW5nZXJvdXNseVNldElubmVySFRNTHxrZXl8cmVmfGF1dG9Gb2N1c3xkZWZhdWx0VmFsdWV8ZGVmYXVsdENoZWNrZWR8aW5uZXJIVE1MfHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZ3xzdXBwcmVzc0h5ZHJhdGlvbldhcm5pbmd8dmFsdWVMaW5rfGFjY2VwdHxhY2NlcHRDaGFyc2V0fGFjY2Vzc0tleXxhY3Rpb258YWxsb3d8YWxsb3dVc2VyTWVkaWF8YWxsb3dQYXltZW50UmVxdWVzdHxhbGxvd0Z1bGxTY3JlZW58YWxsb3dUcmFuc3BhcmVuY3l8YWx0fGFzeW5jfGF1dG9Db21wbGV0ZXxhdXRvUGxheXxjYXB0dXJlfGNlbGxQYWRkaW5nfGNlbGxTcGFjaW5nfGNoYWxsZW5nZXxjaGFyU2V0fGNoZWNrZWR8Y2l0ZXxjbGFzc0lEfGNsYXNzTmFtZXxjb2xzfGNvbFNwYW58Y29udGVudHxjb250ZW50RWRpdGFibGV8Y29udGV4dE1lbnV8Y29udHJvbHN8Y29udHJvbHNMaXN0fGNvb3Jkc3xjcm9zc09yaWdpbnxkYXRhfGRhdGVUaW1lfGRlY29kaW5nfGRlZmF1bHR8ZGVmZXJ8ZGlyfGRpc2FibGVkfGRpc2FibGVQaWN0dXJlSW5QaWN0dXJlfGRvd25sb2FkfGRyYWdnYWJsZXxlbmNUeXBlfGZvcm18Zm9ybUFjdGlvbnxmb3JtRW5jVHlwZXxmb3JtTWV0aG9kfGZvcm1Ob1ZhbGlkYXRlfGZvcm1UYXJnZXR8ZnJhbWVCb3JkZXJ8aGVhZGVyc3xoZWlnaHR8aGlkZGVufGhpZ2h8aHJlZnxocmVmTGFuZ3xodG1sRm9yfGh0dHBFcXVpdnxpZHxpbnB1dE1vZGV8aW50ZWdyaXR5fGlzfGtleVBhcmFtc3xrZXlUeXBlfGtpbmR8bGFiZWx8bGFuZ3xsaXN0fGxvYWRpbmd8bG9vcHxsb3d8bWFyZ2luSGVpZ2h0fG1hcmdpbldpZHRofG1heHxtYXhMZW5ndGh8bWVkaWF8bWVkaWFHcm91cHxtZXRob2R8bWlufG1pbkxlbmd0aHxtdWx0aXBsZXxtdXRlZHxuYW1lfG5vbmNlfG5vVmFsaWRhdGV8b3BlbnxvcHRpbXVtfHBhdHRlcm58cGxhY2Vob2xkZXJ8cGxheXNJbmxpbmV8cG9zdGVyfHByZWxvYWR8cHJvZmlsZXxyYWRpb0dyb3VwfHJlYWRPbmx5fHJlZmVycmVyUG9saWN5fHJlbHxyZXF1aXJlZHxyZXZlcnNlZHxyb2xlfHJvd3N8cm93U3BhbnxzYW5kYm94fHNjb3BlfHNjb3BlZHxzY3JvbGxpbmd8c2VhbWxlc3N8c2VsZWN0ZWR8c2hhcGV8c2l6ZXxzaXplc3xzbG90fHNwYW58c3BlbGxDaGVja3xzcmN8c3JjRG9jfHNyY0xhbmd8c3JjU2V0fHN0YXJ0fHN0ZXB8c3R5bGV8c3VtbWFyeXx0YWJJbmRleHx0YXJnZXR8dGl0bGV8dHlwZXx1c2VNYXB8dmFsdWV8d2lkdGh8d21vZGV8d3JhcHxhYm91dHxkYXRhdHlwZXxpbmxpc3R8cHJlZml4fHByb3BlcnR5fHJlc291cmNlfHR5cGVvZnx2b2NhYnxhdXRvQ2FwaXRhbGl6ZXxhdXRvQ29ycmVjdHxhdXRvU2F2ZXxjb2xvcnxpbmVydHxpdGVtUHJvcHxpdGVtU2NvcGV8aXRlbVR5cGV8aXRlbUlEfGl0ZW1SZWZ8b258cmVzdWx0c3xzZWN1cml0eXx1bnNlbGVjdGFibGV8YWNjZW50SGVpZ2h0fGFjY3VtdWxhdGV8YWRkaXRpdmV8YWxpZ25tZW50QmFzZWxpbmV8YWxsb3dSZW9yZGVyfGFscGhhYmV0aWN8YW1wbGl0dWRlfGFyYWJpY0Zvcm18YXNjZW50fGF0dHJpYnV0ZU5hbWV8YXR0cmlidXRlVHlwZXxhdXRvUmV2ZXJzZXxhemltdXRofGJhc2VGcmVxdWVuY3l8YmFzZWxpbmVTaGlmdHxiYXNlUHJvZmlsZXxiYm94fGJlZ2lufGJpYXN8Ynl8Y2FsY01vZGV8Y2FwSGVpZ2h0fGNsaXB8Y2xpcFBhdGhVbml0c3xjbGlwUGF0aHxjbGlwUnVsZXxjb2xvckludGVycG9sYXRpb258Y29sb3JJbnRlcnBvbGF0aW9uRmlsdGVyc3xjb2xvclByb2ZpbGV8Y29sb3JSZW5kZXJpbmd8Y29udGVudFNjcmlwdFR5cGV8Y29udGVudFN0eWxlVHlwZXxjdXJzb3J8Y3h8Y3l8ZHxkZWNlbGVyYXRlfGRlc2NlbnR8ZGlmZnVzZUNvbnN0YW50fGRpcmVjdGlvbnxkaXNwbGF5fGRpdmlzb3J8ZG9taW5hbnRCYXNlbGluZXxkdXJ8ZHh8ZHl8ZWRnZU1vZGV8ZWxldmF0aW9ufGVuYWJsZUJhY2tncm91bmR8ZW5kfGV4cG9uZW50fGV4dGVybmFsUmVzb3VyY2VzUmVxdWlyZWR8ZmlsbHxmaWxsT3BhY2l0eXxmaWxsUnVsZXxmaWx0ZXJ8ZmlsdGVyUmVzfGZpbHRlclVuaXRzfGZsb29kQ29sb3J8Zmxvb2RPcGFjaXR5fGZvY3VzYWJsZXxmb250RmFtaWx5fGZvbnRTaXplfGZvbnRTaXplQWRqdXN0fGZvbnRTdHJldGNofGZvbnRTdHlsZXxmb250VmFyaWFudHxmb250V2VpZ2h0fGZvcm1hdHxmcm9tfGZyfGZ4fGZ5fGcxfGcyfGdseXBoTmFtZXxnbHlwaE9yaWVudGF0aW9uSG9yaXpvbnRhbHxnbHlwaE9yaWVudGF0aW9uVmVydGljYWx8Z2x5cGhSZWZ8Z3JhZGllbnRUcmFuc2Zvcm18Z3JhZGllbnRVbml0c3xoYW5naW5nfGhvcml6QWR2WHxob3Jpek9yaWdpblh8aWRlb2dyYXBoaWN8aW1hZ2VSZW5kZXJpbmd8aW58aW4yfGludGVyY2VwdHxrfGsxfGsyfGszfGs0fGtlcm5lbE1hdHJpeHxrZXJuZWxVbml0TGVuZ3RofGtlcm5pbmd8a2V5UG9pbnRzfGtleVNwbGluZXN8a2V5VGltZXN8bGVuZ3RoQWRqdXN0fGxldHRlclNwYWNpbmd8bGlnaHRpbmdDb2xvcnxsaW1pdGluZ0NvbmVBbmdsZXxsb2NhbHxtYXJrZXJFbmR8bWFya2VyTWlkfG1hcmtlclN0YXJ0fG1hcmtlckhlaWdodHxtYXJrZXJVbml0c3xtYXJrZXJXaWR0aHxtYXNrfG1hc2tDb250ZW50VW5pdHN8bWFza1VuaXRzfG1hdGhlbWF0aWNhbHxtb2RlfG51bU9jdGF2ZXN8b2Zmc2V0fG9wYWNpdHl8b3BlcmF0b3J8b3JkZXJ8b3JpZW50fG9yaWVudGF0aW9ufG9yaWdpbnxvdmVyZmxvd3xvdmVybGluZVBvc2l0aW9ufG92ZXJsaW5lVGhpY2tuZXNzfHBhbm9zZTF8cGFpbnRPcmRlcnxwYXRoTGVuZ3RofHBhdHRlcm5Db250ZW50VW5pdHN8cGF0dGVyblRyYW5zZm9ybXxwYXR0ZXJuVW5pdHN8cG9pbnRlckV2ZW50c3xwb2ludHN8cG9pbnRzQXRYfHBvaW50c0F0WXxwb2ludHNBdFp8cHJlc2VydmVBbHBoYXxwcmVzZXJ2ZUFzcGVjdFJhdGlvfHByaW1pdGl2ZVVuaXRzfHJ8cmFkaXVzfHJlZlh8cmVmWXxyZW5kZXJpbmdJbnRlbnR8cmVwZWF0Q291bnR8cmVwZWF0RHVyfHJlcXVpcmVkRXh0ZW5zaW9uc3xyZXF1aXJlZEZlYXR1cmVzfHJlc3RhcnR8cmVzdWx0fHJvdGF0ZXxyeHxyeXxzY2FsZXxzZWVkfHNoYXBlUmVuZGVyaW5nfHNsb3BlfHNwYWNpbmd8c3BlY3VsYXJDb25zdGFudHxzcGVjdWxhckV4cG9uZW50fHNwZWVkfHNwcmVhZE1ldGhvZHxzdGFydE9mZnNldHxzdGREZXZpYXRpb258c3RlbWh8c3RlbXZ8c3RpdGNoVGlsZXN8c3RvcENvbG9yfHN0b3BPcGFjaXR5fHN0cmlrZXRocm91Z2hQb3NpdGlvbnxzdHJpa2V0aHJvdWdoVGhpY2tuZXNzfHN0cmluZ3xzdHJva2V8c3Ryb2tlRGFzaGFycmF5fHN0cm9rZURhc2hvZmZzZXR8c3Ryb2tlTGluZWNhcHxzdHJva2VMaW5lam9pbnxzdHJva2VNaXRlcmxpbWl0fHN0cm9rZU9wYWNpdHl8c3Ryb2tlV2lkdGh8c3VyZmFjZVNjYWxlfHN5c3RlbUxhbmd1YWdlfHRhYmxlVmFsdWVzfHRhcmdldFh8dGFyZ2V0WXx0ZXh0QW5jaG9yfHRleHREZWNvcmF0aW9ufHRleHRSZW5kZXJpbmd8dGV4dExlbmd0aHx0b3x0cmFuc2Zvcm18dTF8dTJ8dW5kZXJsaW5lUG9zaXRpb258dW5kZXJsaW5lVGhpY2tuZXNzfHVuaWNvZGV8dW5pY29kZUJpZGl8dW5pY29kZVJhbmdlfHVuaXRzUGVyRW18dkFscGhhYmV0aWN8dkhhbmdpbmd8dklkZW9ncmFwaGljfHZNYXRoZW1hdGljYWx8dmFsdWVzfHZlY3RvckVmZmVjdHx2ZXJzaW9ufHZlcnRBZHZZfHZlcnRPcmlnaW5YfHZlcnRPcmlnaW5ZfHZpZXdCb3h8dmlld1RhcmdldHx2aXNpYmlsaXR5fHdpZHRoc3x3b3JkU3BhY2luZ3x3cml0aW5nTW9kZXx4fHhIZWlnaHR8eDF8eDJ8eENoYW5uZWxTZWxlY3Rvcnx4bGlua0FjdHVhdGV8eGxpbmtBcmNyb2xlfHhsaW5rSHJlZnx4bGlua1JvbGV8eGxpbmtTaG93fHhsaW5rVGl0bGV8eGxpbmtUeXBlfHhtbEJhc2V8eG1sbnN8eG1sbnNYbGlua3x4bWxMYW5nfHhtbFNwYWNlfHl8eTF8eTJ8eUNoYW5uZWxTZWxlY3Rvcnx6fHpvb21BbmRQYW58Zm9yfGNsYXNzfGF1dG9mb2N1cyl8KChbRGRdW0FhXVtUdF1bQWFdfFtBYV1bUnJdW0lpXVtBYV18eCktLiopKSQvOyAvLyBodHRwczovL2VzYmVuY2guY29tL2JlbmNoLzViZmVlNjhhNGNkN2U2MDA5ZWY2MWQyM1xuXG52YXIgaW5kZXggPSBtZW1vaXplKGZ1bmN0aW9uIChwcm9wKSB7XG4gIHJldHVybiByZWFjdFByb3BzUmVnZXgudGVzdChwcm9wKSB8fCBwcm9wLmNoYXJDb2RlQXQoMCkgPT09IDExMVxuICAvKiBvICovXG4gICYmIHByb3AuY2hhckNvZGVBdCgxKSA9PT0gMTEwXG4gIC8qIG4gKi9cbiAgJiYgcHJvcC5jaGFyQ29kZUF0KDIpIDwgOTE7XG59XG4vKiBaKzEgKi9cbik7XG5cbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuIiwiZnVuY3Rpb24gbWVtb2l6ZShmbikge1xuICB2YXIgY2FjaGUgPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICBpZiAoY2FjaGVbYXJnXSA9PT0gdW5kZWZpbmVkKSBjYWNoZVthcmddID0gZm4oYXJnKTtcbiAgICByZXR1cm4gY2FjaGVbYXJnXTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWVtb2l6ZTtcbiIsImZ1bmN0aW9uIHN0eWxpc19taW4gKFcpIHtcbiAgZnVuY3Rpb24gTShkLCBjLCBlLCBoLCBhKSB7XG4gICAgZm9yICh2YXIgbSA9IDAsIGIgPSAwLCB2ID0gMCwgbiA9IDAsIHEsIGcsIHggPSAwLCBLID0gMCwgaywgdSA9IGsgPSBxID0gMCwgbCA9IDAsIHIgPSAwLCBJID0gMCwgdCA9IDAsIEIgPSBlLmxlbmd0aCwgSiA9IEIgLSAxLCB5LCBmID0gJycsIHAgPSAnJywgRiA9ICcnLCBHID0gJycsIEM7IGwgPCBCOykge1xuICAgICAgZyA9IGUuY2hhckNvZGVBdChsKTtcbiAgICAgIGwgPT09IEogJiYgMCAhPT0gYiArIG4gKyB2ICsgbSAmJiAoMCAhPT0gYiAmJiAoZyA9IDQ3ID09PSBiID8gMTAgOiA0NyksIG4gPSB2ID0gbSA9IDAsIEIrKywgSisrKTtcblxuICAgICAgaWYgKDAgPT09IGIgKyBuICsgdiArIG0pIHtcbiAgICAgICAgaWYgKGwgPT09IEogJiYgKDAgPCByICYmIChmID0gZi5yZXBsYWNlKE4sICcnKSksIDAgPCBmLnRyaW0oKS5sZW5ndGgpKSB7XG4gICAgICAgICAgc3dpdGNoIChnKSB7XG4gICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgY2FzZSA1OTpcbiAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgZiArPSBlLmNoYXJBdChsKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBnID0gNTk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGcpIHtcbiAgICAgICAgICBjYXNlIDEyMzpcbiAgICAgICAgICAgIGYgPSBmLnRyaW0oKTtcbiAgICAgICAgICAgIHEgPSBmLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICBrID0gMTtcblxuICAgICAgICAgICAgZm9yICh0ID0gKytsOyBsIDwgQjspIHtcbiAgICAgICAgICAgICAgc3dpdGNoIChnID0gZS5jaGFyQ29kZUF0KGwpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxMjM6XG4gICAgICAgICAgICAgICAgICBrKys7XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgMTI1OlxuICAgICAgICAgICAgICAgICAgay0tO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDQ3OlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChnID0gZS5jaGFyQ29kZUF0KGwgKyAxKSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQyOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ3OlxuICAgICAgICAgICAgICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodSA9IGwgKyAxOyB1IDwgSjsgKyt1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZS5jaGFyQ29kZUF0KHUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0NzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICg0MiA9PT0gZyAmJiA0MiA9PT0gZS5jaGFyQ29kZUF0KHUgLSAxKSAmJiBsICsgMiAhPT0gdSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsID0gdSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICg0NyA9PT0gZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsID0gdSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsID0gdTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDkxOlxuICAgICAgICAgICAgICAgICAgZysrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICAgIGcrKztcblxuICAgICAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICAgIGZvciAoOyBsKysgPCBKICYmIGUuY2hhckNvZGVBdChsKSAhPT0gZzspIHtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKDAgPT09IGspIGJyZWFrO1xuICAgICAgICAgICAgICBsKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGsgPSBlLnN1YnN0cmluZyh0LCBsKTtcbiAgICAgICAgICAgIDAgPT09IHEgJiYgKHEgPSAoZiA9IGYucmVwbGFjZShjYSwgJycpLnRyaW0oKSkuY2hhckNvZGVBdCgwKSk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAocSkge1xuICAgICAgICAgICAgICBjYXNlIDY0OlxuICAgICAgICAgICAgICAgIDAgPCByICYmIChmID0gZi5yZXBsYWNlKE4sICcnKSk7XG4gICAgICAgICAgICAgICAgZyA9IGYuY2hhckNvZGVBdCgxKTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoZykge1xuICAgICAgICAgICAgICAgICAgY2FzZSAxMDA6XG4gICAgICAgICAgICAgICAgICBjYXNlIDEwOTpcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTE1OlxuICAgICAgICAgICAgICAgICAgY2FzZSA0NTpcbiAgICAgICAgICAgICAgICAgICAgciA9IGM7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByID0gTztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBrID0gTShjLCByLCBrLCBnLCBhICsgMSk7XG4gICAgICAgICAgICAgICAgdCA9IGsubGVuZ3RoO1xuICAgICAgICAgICAgICAgIDAgPCBBICYmIChyID0gWChPLCBmLCBJKSwgQyA9IEgoMywgaywgciwgYywgRCwgeiwgdCwgZywgYSwgaCksIGYgPSByLmpvaW4oJycpLCB2b2lkIDAgIT09IEMgJiYgMCA9PT0gKHQgPSAoayA9IEMudHJpbSgpKS5sZW5ndGgpICYmIChnID0gMCwgayA9ICcnKSk7XG4gICAgICAgICAgICAgICAgaWYgKDAgPCB0KSBzd2l0Y2ggKGcpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgMTE1OlxuICAgICAgICAgICAgICAgICAgICBmID0gZi5yZXBsYWNlKGRhLCBlYSk7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2UgMTAwOlxuICAgICAgICAgICAgICAgICAgY2FzZSAxMDk6XG4gICAgICAgICAgICAgICAgICBjYXNlIDQ1OlxuICAgICAgICAgICAgICAgICAgICBrID0gZiArICd7JyArIGsgKyAnfSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlIDEwNzpcbiAgICAgICAgICAgICAgICAgICAgZiA9IGYucmVwbGFjZShmYSwgJyQxICQyJyk7XG4gICAgICAgICAgICAgICAgICAgIGsgPSBmICsgJ3snICsgayArICd9JztcbiAgICAgICAgICAgICAgICAgICAgayA9IDEgPT09IHcgfHwgMiA9PT0gdyAmJiBMKCdAJyArIGssIDMpID8gJ0Atd2Via2l0LScgKyBrICsgJ0AnICsgayA6ICdAJyArIGs7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBrID0gZiArIGssIDExMiA9PT0gaCAmJiAoayA9IChwICs9IGssICcnKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGsgPSAnJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGsgPSBNKGMsIFgoYywgZiwgSSksIGssIGgsIGEgKyAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRiArPSBrO1xuICAgICAgICAgICAgayA9IEkgPSByID0gdSA9IHEgPSAwO1xuICAgICAgICAgICAgZiA9ICcnO1xuICAgICAgICAgICAgZyA9IGUuY2hhckNvZGVBdCgrK2wpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDEyNTpcbiAgICAgICAgICBjYXNlIDU5OlxuICAgICAgICAgICAgZiA9ICgwIDwgciA/IGYucmVwbGFjZShOLCAnJykgOiBmKS50cmltKCk7XG4gICAgICAgICAgICBpZiAoMSA8ICh0ID0gZi5sZW5ndGgpKSBzd2l0Y2ggKDAgPT09IHUgJiYgKHEgPSBmLmNoYXJDb2RlQXQoMCksIDQ1ID09PSBxIHx8IDk2IDwgcSAmJiAxMjMgPiBxKSAmJiAodCA9IChmID0gZi5yZXBsYWNlKCcgJywgJzonKSkubGVuZ3RoKSwgMCA8IEEgJiYgdm9pZCAwICE9PSAoQyA9IEgoMSwgZiwgYywgZCwgRCwgeiwgcC5sZW5ndGgsIGgsIGEsIGgpKSAmJiAwID09PSAodCA9IChmID0gQy50cmltKCkpLmxlbmd0aCkgJiYgKGYgPSAnXFx4MDBcXHgwMCcpLCBxID0gZi5jaGFyQ29kZUF0KDApLCBnID0gZi5jaGFyQ29kZUF0KDEpLCBxKSB7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlIDY0OlxuICAgICAgICAgICAgICAgIGlmICgxMDUgPT09IGcgfHwgOTkgPT09IGcpIHtcbiAgICAgICAgICAgICAgICAgIEcgKz0gZiArIGUuY2hhckF0KGwpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgNTggIT09IGYuY2hhckNvZGVBdCh0IC0gMSkgJiYgKHAgKz0gUChmLCBxLCBnLCBmLmNoYXJDb2RlQXQoMikpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEkgPSByID0gdSA9IHEgPSAwO1xuICAgICAgICAgICAgZiA9ICcnO1xuICAgICAgICAgICAgZyA9IGUuY2hhckNvZGVBdCgrK2wpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoZykge1xuICAgICAgICBjYXNlIDEzOlxuICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgIDQ3ID09PSBiID8gYiA9IDAgOiAwID09PSAxICsgcSAmJiAxMDcgIT09IGggJiYgMCA8IGYubGVuZ3RoICYmIChyID0gMSwgZiArPSAnXFx4MDAnKTtcbiAgICAgICAgICAwIDwgQSAqIFkgJiYgSCgwLCBmLCBjLCBkLCBELCB6LCBwLmxlbmd0aCwgaCwgYSwgaCk7XG4gICAgICAgICAgeiA9IDE7XG4gICAgICAgICAgRCsrO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgNTk6XG4gICAgICAgIGNhc2UgMTI1OlxuICAgICAgICAgIGlmICgwID09PSBiICsgbiArIHYgKyBtKSB7XG4gICAgICAgICAgICB6Kys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB6Kys7XG4gICAgICAgICAgeSA9IGUuY2hhckF0KGwpO1xuXG4gICAgICAgICAgc3dpdGNoIChnKSB7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICBpZiAoMCA9PT0gbiArIG0gKyBiKSBzd2l0Y2ggKHgpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDQ0OlxuICAgICAgICAgICAgICAgIGNhc2UgNTg6XG4gICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgICAgICAgICB5ID0gJyc7XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAzMiAhPT0gZyAmJiAoeSA9ICcgJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgeSA9ICdcXFxcMCc7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICB5ID0gJ1xcXFxmJztcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgIHkgPSAnXFxcXHYnO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgMCA9PT0gbiArIGIgKyBtICYmIChyID0gSSA9IDEsIHkgPSAnXFxmJyArIHkpO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAxMDg6XG4gICAgICAgICAgICAgIGlmICgwID09PSBuICsgYiArIG0gKyBFICYmIDAgPCB1KSBzd2l0Y2ggKGwgLSB1KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgMTEyID09PSB4ICYmIDU4ID09PSBlLmNoYXJDb2RlQXQobCAtIDMpICYmIChFID0geCk7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAxMTEgPT09IEsgJiYgKEUgPSBLKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA1ODpcbiAgICAgICAgICAgICAgMCA9PT0gbiArIGIgKyBtICYmICh1ID0gbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDQ0OlxuICAgICAgICAgICAgICAwID09PSBiICsgdiArIG4gKyBtICYmIChyID0gMSwgeSArPSAnXFxyJyk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDM0OlxuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgMCA9PT0gYiAmJiAobiA9IG4gPT09IGcgPyAwIDogMCA9PT0gbiA/IGcgOiBuKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgOTE6XG4gICAgICAgICAgICAgIDAgPT09IG4gKyBiICsgdiAmJiBtKys7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDkzOlxuICAgICAgICAgICAgICAwID09PSBuICsgYiArIHYgJiYgbS0tO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA0MTpcbiAgICAgICAgICAgICAgMCA9PT0gbiArIGIgKyBtICYmIHYtLTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgIGlmICgwID09PSBuICsgYiArIG0pIHtcbiAgICAgICAgICAgICAgICBpZiAoMCA9PT0gcSkgc3dpdGNoICgyICogeCArIDMgKiBLKSB7XG4gICAgICAgICAgICAgICAgICBjYXNlIDUzMzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHEgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2Kys7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSA2NDpcbiAgICAgICAgICAgICAgMCA9PT0gYiArIHYgKyBuICsgbSArIHUgKyBrICYmIChrID0gMSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDQyOlxuICAgICAgICAgICAgY2FzZSA0NzpcbiAgICAgICAgICAgICAgaWYgKCEoMCA8IG4gKyBtICsgdikpIHN3aXRjaCAoYikge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgIHN3aXRjaCAoMiAqIGcgKyAzICogZS5jaGFyQ29kZUF0KGwgKyAxKSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDIzNTpcbiAgICAgICAgICAgICAgICAgICAgICBiID0gNDc7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyMjA6XG4gICAgICAgICAgICAgICAgICAgICAgdCA9IGwsIGIgPSA0MjtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDQyOlxuICAgICAgICAgICAgICAgICAgNDcgPT09IGcgJiYgNDIgPT09IHggJiYgdCArIDIgIT09IGwgJiYgKDMzID09PSBlLmNoYXJDb2RlQXQodCArIDIpICYmIChwICs9IGUuc3Vic3RyaW5nKHQsIGwgKyAxKSksIHkgPSAnJywgYiA9IDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgMCA9PT0gYiAmJiAoZiArPSB5KTtcbiAgICAgIH1cblxuICAgICAgSyA9IHg7XG4gICAgICB4ID0gZztcbiAgICAgIGwrKztcbiAgICB9XG5cbiAgICB0ID0gcC5sZW5ndGg7XG5cbiAgICBpZiAoMCA8IHQpIHtcbiAgICAgIHIgPSBjO1xuICAgICAgaWYgKDAgPCBBICYmIChDID0gSCgyLCBwLCByLCBkLCBELCB6LCB0LCBoLCBhLCBoKSwgdm9pZCAwICE9PSBDICYmIDAgPT09IChwID0gQykubGVuZ3RoKSkgcmV0dXJuIEcgKyBwICsgRjtcbiAgICAgIHAgPSByLmpvaW4oJywnKSArICd7JyArIHAgKyAnfSc7XG5cbiAgICAgIGlmICgwICE9PSB3ICogRSkge1xuICAgICAgICAyICE9PSB3IHx8IEwocCwgMikgfHwgKEUgPSAwKTtcblxuICAgICAgICBzd2l0Y2ggKEUpIHtcbiAgICAgICAgICBjYXNlIDExMTpcbiAgICAgICAgICAgIHAgPSBwLnJlcGxhY2UoaGEsICc6LW1vei0kMScpICsgcDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAxMTI6XG4gICAgICAgICAgICBwID0gcC5yZXBsYWNlKFEsICc6Oi13ZWJraXQtaW5wdXQtJDEnKSArIHAucmVwbGFjZShRLCAnOjotbW96LSQxJykgKyBwLnJlcGxhY2UoUSwgJzotbXMtaW5wdXQtJDEnKSArIHA7XG4gICAgICAgIH1cblxuICAgICAgICBFID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gRyArIHAgKyBGO1xuICB9XG5cbiAgZnVuY3Rpb24gWChkLCBjLCBlKSB7XG4gICAgdmFyIGggPSBjLnRyaW0oKS5zcGxpdChpYSk7XG4gICAgYyA9IGg7XG4gICAgdmFyIGEgPSBoLmxlbmd0aCxcbiAgICAgICAgbSA9IGQubGVuZ3RoO1xuXG4gICAgc3dpdGNoIChtKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHZhciBiID0gMDtcblxuICAgICAgICBmb3IgKGQgPSAwID09PSBtID8gJycgOiBkWzBdICsgJyAnOyBiIDwgYTsgKytiKSB7XG4gICAgICAgICAgY1tiXSA9IFooZCwgY1tiXSwgZSkudHJpbSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhciB2ID0gYiA9IDA7XG5cbiAgICAgICAgZm9yIChjID0gW107IGIgPCBhOyArK2IpIHtcbiAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IG07ICsrbikge1xuICAgICAgICAgICAgY1t2KytdID0gWihkW25dICsgJyAnLCBoW2JdLCBlKS50cmltKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gYztcbiAgfVxuXG4gIGZ1bmN0aW9uIFooZCwgYywgZSkge1xuICAgIHZhciBoID0gYy5jaGFyQ29kZUF0KDApO1xuICAgIDMzID4gaCAmJiAoaCA9IChjID0gYy50cmltKCkpLmNoYXJDb2RlQXQoMCkpO1xuXG4gICAgc3dpdGNoIChoKSB7XG4gICAgICBjYXNlIDM4OlxuICAgICAgICByZXR1cm4gYy5yZXBsYWNlKEYsICckMScgKyBkLnRyaW0oKSk7XG5cbiAgICAgIGNhc2UgNTg6XG4gICAgICAgIHJldHVybiBkLnRyaW0oKSArIGMucmVwbGFjZShGLCAnJDEnICsgZC50cmltKCkpO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoMCA8IDEgKiBlICYmIDAgPCBjLmluZGV4T2YoJ1xcZicpKSByZXR1cm4gYy5yZXBsYWNlKEYsICg1OCA9PT0gZC5jaGFyQ29kZUF0KDApID8gJycgOiAnJDEnKSArIGQudHJpbSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZCArIGM7XG4gIH1cblxuICBmdW5jdGlvbiBQKGQsIGMsIGUsIGgpIHtcbiAgICB2YXIgYSA9IGQgKyAnOycsXG4gICAgICAgIG0gPSAyICogYyArIDMgKiBlICsgNCAqIGg7XG5cbiAgICBpZiAoOTQ0ID09PSBtKSB7XG4gICAgICBkID0gYS5pbmRleE9mKCc6JywgOSkgKyAxO1xuICAgICAgdmFyIGIgPSBhLnN1YnN0cmluZyhkLCBhLmxlbmd0aCAtIDEpLnRyaW0oKTtcbiAgICAgIGIgPSBhLnN1YnN0cmluZygwLCBkKS50cmltKCkgKyBiICsgJzsnO1xuICAgICAgcmV0dXJuIDEgPT09IHcgfHwgMiA9PT0gdyAmJiBMKGIsIDEpID8gJy13ZWJraXQtJyArIGIgKyBiIDogYjtcbiAgICB9XG5cbiAgICBpZiAoMCA9PT0gdyB8fCAyID09PSB3ICYmICFMKGEsIDEpKSByZXR1cm4gYTtcblxuICAgIHN3aXRjaCAobSkge1xuICAgICAgY2FzZSAxMDE1OlxuICAgICAgICByZXR1cm4gOTcgPT09IGEuY2hhckNvZGVBdCgxMCkgPyAnLXdlYmtpdC0nICsgYSArIGEgOiBhO1xuXG4gICAgICBjYXNlIDk1MTpcbiAgICAgICAgcmV0dXJuIDExNiA9PT0gYS5jaGFyQ29kZUF0KDMpID8gJy13ZWJraXQtJyArIGEgKyBhIDogYTtcblxuICAgICAgY2FzZSA5NjM6XG4gICAgICAgIHJldHVybiAxMTAgPT09IGEuY2hhckNvZGVBdCg1KSA/ICctd2Via2l0LScgKyBhICsgYSA6IGE7XG5cbiAgICAgIGNhc2UgMTAwOTpcbiAgICAgICAgaWYgKDEwMCAhPT0gYS5jaGFyQ29kZUF0KDQpKSBicmVhaztcblxuICAgICAgY2FzZSA5Njk6XG4gICAgICBjYXNlIDk0MjpcbiAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgYTtcblxuICAgICAgY2FzZSA5Nzg6XG4gICAgICAgIHJldHVybiAnLXdlYmtpdC0nICsgYSArICctbW96LScgKyBhICsgYTtcblxuICAgICAgY2FzZSAxMDE5OlxuICAgICAgY2FzZSA5ODM6XG4gICAgICAgIHJldHVybiAnLXdlYmtpdC0nICsgYSArICctbW96LScgKyBhICsgJy1tcy0nICsgYSArIGE7XG5cbiAgICAgIGNhc2UgODgzOlxuICAgICAgICBpZiAoNDUgPT09IGEuY2hhckNvZGVBdCg4KSkgcmV0dXJuICctd2Via2l0LScgKyBhICsgYTtcbiAgICAgICAgaWYgKDAgPCBhLmluZGV4T2YoJ2ltYWdlLXNldCgnLCAxMSkpIHJldHVybiBhLnJlcGxhY2UoamEsICckMS13ZWJraXQtJDInKSArIGE7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDkzMjpcbiAgICAgICAgaWYgKDQ1ID09PSBhLmNoYXJDb2RlQXQoNCkpIHN3aXRjaCAoYS5jaGFyQ29kZUF0KDUpKSB7XG4gICAgICAgICAgY2FzZSAxMDM6XG4gICAgICAgICAgICByZXR1cm4gJy13ZWJraXQtYm94LScgKyBhLnJlcGxhY2UoJy1ncm93JywgJycpICsgJy13ZWJraXQtJyArIGEgKyAnLW1zLScgKyBhLnJlcGxhY2UoJ2dyb3cnLCAncG9zaXRpdmUnKSArIGE7XG5cbiAgICAgICAgICBjYXNlIDExNTpcbiAgICAgICAgICAgIHJldHVybiAnLXdlYmtpdC0nICsgYSArICctbXMtJyArIGEucmVwbGFjZSgnc2hyaW5rJywgJ25lZ2F0aXZlJykgKyBhO1xuXG4gICAgICAgICAgY2FzZSA5ODpcbiAgICAgICAgICAgIHJldHVybiAnLXdlYmtpdC0nICsgYSArICctbXMtJyArIGEucmVwbGFjZSgnYmFzaXMnLCAncHJlZmVycmVkLXNpemUnKSArIGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tcy0nICsgYSArIGE7XG5cbiAgICAgIGNhc2UgOTY0OlxuICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyAnLW1zLWZsZXgtJyArIGEgKyBhO1xuXG4gICAgICBjYXNlIDEwMjM6XG4gICAgICAgIGlmICg5OSAhPT0gYS5jaGFyQ29kZUF0KDgpKSBicmVhaztcbiAgICAgICAgYiA9IGEuc3Vic3RyaW5nKGEuaW5kZXhPZignOicsIDE1KSkucmVwbGFjZSgnZmxleC0nLCAnJykucmVwbGFjZSgnc3BhY2UtYmV0d2VlbicsICdqdXN0aWZ5Jyk7XG4gICAgICAgIHJldHVybiAnLXdlYmtpdC1ib3gtcGFjaycgKyBiICsgJy13ZWJraXQtJyArIGEgKyAnLW1zLWZsZXgtcGFjaycgKyBiICsgYTtcblxuICAgICAgY2FzZSAxMDA1OlxuICAgICAgICByZXR1cm4ga2EudGVzdChhKSA/IGEucmVwbGFjZShhYSwgJzotd2Via2l0LScpICsgYS5yZXBsYWNlKGFhLCAnOi1tb3otJykgKyBhIDogYTtcblxuICAgICAgY2FzZSAxZTM6XG4gICAgICAgIGIgPSBhLnN1YnN0cmluZygxMykudHJpbSgpO1xuICAgICAgICBjID0gYi5pbmRleE9mKCctJykgKyAxO1xuXG4gICAgICAgIHN3aXRjaCAoYi5jaGFyQ29kZUF0KDApICsgYi5jaGFyQ29kZUF0KGMpKSB7XG4gICAgICAgICAgY2FzZSAyMjY6XG4gICAgICAgICAgICBiID0gYS5yZXBsYWNlKEcsICd0YicpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDIzMjpcbiAgICAgICAgICAgIGIgPSBhLnJlcGxhY2UoRywgJ3RiLXJsJyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMjIwOlxuICAgICAgICAgICAgYiA9IGEucmVwbGFjZShHLCAnbHInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tcy0nICsgYiArIGE7XG5cbiAgICAgIGNhc2UgMTAxNzpcbiAgICAgICAgaWYgKC0xID09PSBhLmluZGV4T2YoJ3N0aWNreScsIDkpKSBicmVhaztcblxuICAgICAgY2FzZSA5NzU6XG4gICAgICAgIGMgPSAoYSA9IGQpLmxlbmd0aCAtIDEwO1xuICAgICAgICBiID0gKDMzID09PSBhLmNoYXJDb2RlQXQoYykgPyBhLnN1YnN0cmluZygwLCBjKSA6IGEpLnN1YnN0cmluZyhkLmluZGV4T2YoJzonLCA3KSArIDEpLnRyaW0oKTtcblxuICAgICAgICBzd2l0Y2ggKG0gPSBiLmNoYXJDb2RlQXQoMCkgKyAoYi5jaGFyQ29kZUF0KDcpIHwgMCkpIHtcbiAgICAgICAgICBjYXNlIDIwMzpcbiAgICAgICAgICAgIGlmICgxMTEgPiBiLmNoYXJDb2RlQXQoOCkpIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICBhID0gYS5yZXBsYWNlKGIsICctd2Via2l0LScgKyBiKSArICc7JyArIGE7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMjA3OlxuICAgICAgICAgIGNhc2UgMTAyOlxuICAgICAgICAgICAgYSA9IGEucmVwbGFjZShiLCAnLXdlYmtpdC0nICsgKDEwMiA8IG0gPyAnaW5saW5lLScgOiAnJykgKyAnYm94JykgKyAnOycgKyBhLnJlcGxhY2UoYiwgJy13ZWJraXQtJyArIGIpICsgJzsnICsgYS5yZXBsYWNlKGIsICctbXMtJyArIGIgKyAnYm94JykgKyAnOycgKyBhO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGEgKyAnOyc7XG5cbiAgICAgIGNhc2UgOTM4OlxuICAgICAgICBpZiAoNDUgPT09IGEuY2hhckNvZGVBdCg1KSkgc3dpdGNoIChhLmNoYXJDb2RlQXQoNikpIHtcbiAgICAgICAgICBjYXNlIDEwNTpcbiAgICAgICAgICAgIHJldHVybiBiID0gYS5yZXBsYWNlKCctaXRlbXMnLCAnJyksICctd2Via2l0LScgKyBhICsgJy13ZWJraXQtYm94LScgKyBiICsgJy1tcy1mbGV4LScgKyBiICsgYTtcblxuICAgICAgICAgIGNhc2UgMTE1OlxuICAgICAgICAgICAgcmV0dXJuICctd2Via2l0LScgKyBhICsgJy1tcy1mbGV4LWl0ZW0tJyArIGEucmVwbGFjZShiYSwgJycpICsgYTtcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gJy13ZWJraXQtJyArIGEgKyAnLW1zLWZsZXgtbGluZS1wYWNrJyArIGEucmVwbGFjZSgnYWxpZ24tY29udGVudCcsICcnKS5yZXBsYWNlKGJhLCAnJykgKyBhO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDk3MzpcbiAgICAgIGNhc2UgOTg5OlxuICAgICAgICBpZiAoNDUgIT09IGEuY2hhckNvZGVBdCgzKSB8fCAxMjIgPT09IGEuY2hhckNvZGVBdCg0KSkgYnJlYWs7XG5cbiAgICAgIGNhc2UgOTMxOlxuICAgICAgY2FzZSA5NTM6XG4gICAgICAgIGlmICghMCA9PT0gbGEudGVzdChkKSkgcmV0dXJuIDExNSA9PT0gKGIgPSBkLnN1YnN0cmluZyhkLmluZGV4T2YoJzonKSArIDEpKS5jaGFyQ29kZUF0KDApID8gUChkLnJlcGxhY2UoJ3N0cmV0Y2gnLCAnZmlsbC1hdmFpbGFibGUnKSwgYywgZSwgaCkucmVwbGFjZSgnOmZpbGwtYXZhaWxhYmxlJywgJzpzdHJldGNoJykgOiBhLnJlcGxhY2UoYiwgJy13ZWJraXQtJyArIGIpICsgYS5yZXBsYWNlKGIsICctbW96LScgKyBiLnJlcGxhY2UoJ2ZpbGwtJywgJycpKSArIGE7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIDk2MjpcbiAgICAgICAgaWYgKGEgPSAnLXdlYmtpdC0nICsgYSArICgxMDIgPT09IGEuY2hhckNvZGVBdCg1KSA/ICctbXMtJyArIGEgOiAnJykgKyBhLCAyMTEgPT09IGUgKyBoICYmIDEwNSA9PT0gYS5jaGFyQ29kZUF0KDEzKSAmJiAwIDwgYS5pbmRleE9mKCd0cmFuc2Zvcm0nLCAxMCkpIHJldHVybiBhLnN1YnN0cmluZygwLCBhLmluZGV4T2YoJzsnLCAyNykgKyAxKS5yZXBsYWNlKG1hLCAnJDEtd2Via2l0LSQyJykgKyBhO1xuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9XG5cbiAgZnVuY3Rpb24gTChkLCBjKSB7XG4gICAgdmFyIGUgPSBkLmluZGV4T2YoMSA9PT0gYyA/ICc6JyA6ICd7JyksXG4gICAgICAgIGggPSBkLnN1YnN0cmluZygwLCAzICE9PSBjID8gZSA6IDEwKTtcbiAgICBlID0gZC5zdWJzdHJpbmcoZSArIDEsIGQubGVuZ3RoIC0gMSk7XG4gICAgcmV0dXJuIFIoMiAhPT0gYyA/IGggOiBoLnJlcGxhY2UobmEsICckMScpLCBlLCBjKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVhKGQsIGMpIHtcbiAgICB2YXIgZSA9IFAoYywgYy5jaGFyQ29kZUF0KDApLCBjLmNoYXJDb2RlQXQoMSksIGMuY2hhckNvZGVBdCgyKSk7XG4gICAgcmV0dXJuIGUgIT09IGMgKyAnOycgPyBlLnJlcGxhY2Uob2EsICcgb3IgKCQxKScpLnN1YnN0cmluZyg0KSA6ICcoJyArIGMgKyAnKSc7XG4gIH1cblxuICBmdW5jdGlvbiBIKGQsIGMsIGUsIGgsIGEsIG0sIGIsIHYsIG4sIHEpIHtcbiAgICBmb3IgKHZhciBnID0gMCwgeCA9IGMsIHc7IGcgPCBBOyArK2cpIHtcbiAgICAgIHN3aXRjaCAodyA9IFNbZ10uY2FsbChCLCBkLCB4LCBlLCBoLCBhLCBtLCBiLCB2LCBuLCBxKSkge1xuICAgICAgICBjYXNlIHZvaWQgMDpcbiAgICAgICAgY2FzZSAhMTpcbiAgICAgICAgY2FzZSAhMDpcbiAgICAgICAgY2FzZSBudWxsOlxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgeCA9IHc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHggIT09IGMpIHJldHVybiB4O1xuICB9XG5cbiAgZnVuY3Rpb24gVChkKSB7XG4gICAgc3dpdGNoIChkKSB7XG4gICAgICBjYXNlIHZvaWQgMDpcbiAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgQSA9IFMubGVuZ3RoID0gMDtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZCkgU1tBKytdID0gZDtlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIGQpIGZvciAodmFyIGMgPSAwLCBlID0gZC5sZW5ndGg7IGMgPCBlOyArK2MpIHtcbiAgICAgICAgICBUKGRbY10pO1xuICAgICAgICB9IGVsc2UgWSA9ICEhZCB8IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIFQ7XG4gIH1cblxuICBmdW5jdGlvbiBVKGQpIHtcbiAgICBkID0gZC5wcmVmaXg7XG4gICAgdm9pZCAwICE9PSBkICYmIChSID0gbnVsbCwgZCA/ICdmdW5jdGlvbicgIT09IHR5cGVvZiBkID8gdyA9IDEgOiAodyA9IDIsIFIgPSBkKSA6IHcgPSAwKTtcbiAgICByZXR1cm4gVTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEIoZCwgYykge1xuICAgIHZhciBlID0gZDtcbiAgICAzMyA+IGUuY2hhckNvZGVBdCgwKSAmJiAoZSA9IGUudHJpbSgpKTtcbiAgICBWID0gZTtcbiAgICBlID0gW1ZdO1xuXG4gICAgaWYgKDAgPCBBKSB7XG4gICAgICB2YXIgaCA9IEgoLTEsIGMsIGUsIGUsIEQsIHosIDAsIDAsIDAsIDApO1xuICAgICAgdm9pZCAwICE9PSBoICYmICdzdHJpbmcnID09PSB0eXBlb2YgaCAmJiAoYyA9IGgpO1xuICAgIH1cblxuICAgIHZhciBhID0gTShPLCBlLCBjLCAwLCAwKTtcbiAgICAwIDwgQSAmJiAoaCA9IEgoLTIsIGEsIGUsIGUsIEQsIHosIGEubGVuZ3RoLCAwLCAwLCAwKSwgdm9pZCAwICE9PSBoICYmIChhID0gaCkpO1xuICAgIFYgPSAnJztcbiAgICBFID0gMDtcbiAgICB6ID0gRCA9IDE7XG4gICAgcmV0dXJuIGE7XG4gIH1cblxuICB2YXIgY2EgPSAvXlxcMCsvZyxcbiAgICAgIE4gPSAvW1xcMFxcclxcZl0vZyxcbiAgICAgIGFhID0gLzogKi9nLFxuICAgICAga2EgPSAvem9vfGdyYS8sXG4gICAgICBtYSA9IC8oWyw6IF0pKHRyYW5zZm9ybSkvZyxcbiAgICAgIGlhID0gLyxcXHIrPy9nLFxuICAgICAgRiA9IC8oW1xcdFxcclxcbiBdKSpcXGY/Ji9nLFxuICAgICAgZmEgPSAvQChrXFx3KylcXHMqKFxcUyopXFxzKi8sXG4gICAgICBRID0gLzo6KHBsYWNlKS9nLFxuICAgICAgaGEgPSAvOihyZWFkLW9ubHkpL2csXG4gICAgICBHID0gL1tzdmhdXFx3Ky1bdGJscl17Mn0vLFxuICAgICAgZGEgPSAvXFwoXFxzKiguKilcXHMqXFwpL2csXG4gICAgICBvYSA9IC8oW1xcc1xcU10qPyk7L2csXG4gICAgICBiYSA9IC8tc2VsZnxmbGV4LS9nLFxuICAgICAgbmEgPSAvW15dKj8oOltycF1bZWxdYVtcXHctXSspW15dKi8sXG4gICAgICBsYSA9IC9zdHJldGNofDpcXHMqXFx3K1xcLSg/OmNvbnRlfGF2YWlsKS8sXG4gICAgICBqYSA9IC8oW14tXSkoaW1hZ2Utc2V0XFwoKS8sXG4gICAgICB6ID0gMSxcbiAgICAgIEQgPSAxLFxuICAgICAgRSA9IDAsXG4gICAgICB3ID0gMSxcbiAgICAgIE8gPSBbXSxcbiAgICAgIFMgPSBbXSxcbiAgICAgIEEgPSAwLFxuICAgICAgUiA9IG51bGwsXG4gICAgICBZID0gMCxcbiAgICAgIFYgPSAnJztcbiAgQi51c2UgPSBUO1xuICBCLnNldCA9IFU7XG4gIHZvaWQgMCAhPT0gVyAmJiBVKFcpO1xuICByZXR1cm4gQjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R5bGlzX21pbjtcbiIsInZhciB1bml0bGVzc0tleXMgPSB7XG4gIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiAxLFxuICBib3JkZXJJbWFnZU91dHNldDogMSxcbiAgYm9yZGVySW1hZ2VTbGljZTogMSxcbiAgYm9yZGVySW1hZ2VXaWR0aDogMSxcbiAgYm94RmxleDogMSxcbiAgYm94RmxleEdyb3VwOiAxLFxuICBib3hPcmRpbmFsR3JvdXA6IDEsXG4gIGNvbHVtbkNvdW50OiAxLFxuICBjb2x1bW5zOiAxLFxuICBmbGV4OiAxLFxuICBmbGV4R3JvdzogMSxcbiAgZmxleFBvc2l0aXZlOiAxLFxuICBmbGV4U2hyaW5rOiAxLFxuICBmbGV4TmVnYXRpdmU6IDEsXG4gIGZsZXhPcmRlcjogMSxcbiAgZ3JpZFJvdzogMSxcbiAgZ3JpZFJvd0VuZDogMSxcbiAgZ3JpZFJvd1NwYW46IDEsXG4gIGdyaWRSb3dTdGFydDogMSxcbiAgZ3JpZENvbHVtbjogMSxcbiAgZ3JpZENvbHVtbkVuZDogMSxcbiAgZ3JpZENvbHVtblNwYW46IDEsXG4gIGdyaWRDb2x1bW5TdGFydDogMSxcbiAgbXNHcmlkUm93OiAxLFxuICBtc0dyaWRSb3dTcGFuOiAxLFxuICBtc0dyaWRDb2x1bW46IDEsXG4gIG1zR3JpZENvbHVtblNwYW46IDEsXG4gIGZvbnRXZWlnaHQ6IDEsXG4gIGxpbmVIZWlnaHQ6IDEsXG4gIG9wYWNpdHk6IDEsXG4gIG9yZGVyOiAxLFxuICBvcnBoYW5zOiAxLFxuICB0YWJTaXplOiAxLFxuICB3aWRvd3M6IDEsXG4gIHpJbmRleDogMSxcbiAgem9vbTogMSxcbiAgV2Via2l0TGluZUNsYW1wOiAxLFxuICAvLyBTVkctcmVsYXRlZCBwcm9wZXJ0aWVzXG4gIGZpbGxPcGFjaXR5OiAxLFxuICBmbG9vZE9wYWNpdHk6IDEsXG4gIHN0b3BPcGFjaXR5OiAxLFxuICBzdHJva2VEYXNoYXJyYXk6IDEsXG4gIHN0cm9rZURhc2hvZmZzZXQ6IDEsXG4gIHN0cm9rZU1pdGVybGltaXQ6IDEsXG4gIHN0cm9rZU9wYWNpdHk6IDEsXG4gIHN0cm9rZVdpZHRoOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCB1bml0bGVzc0tleXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW5wdXROdW1iZXJzID0gZXhwb3J0cy5ETkEgPSBleHBvcnRzLkRvd25BcnJvdyA9IGV4cG9ydHMuVXBBcnJvdyA9IGV4cG9ydHMuRmxhZyA9IGV4cG9ydHMuV3JlbmNoID0gZXhwb3J0cy5TcGlubmVyID0gZXhwb3J0cy5XYXJuaW5nID0gZXhwb3J0cy5QbHVzID0gZXhwb3J0cy5Dcm9zc01hcmsgPSBleHBvcnRzLlRyYXNoQ2FuID0gZXhwb3J0cy5QZW5jaWwgPSBleHBvcnRzLkhlYXZ5Q2hlY2tNYXJrID0gdm9pZCAwO1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAgaW5kZXgudHN4IC0gR2J0Y1xuLy9cbi8vICBDb3B5cmlnaHQgwqkgMjAyMSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbi8vXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XG4vL1xuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4vL1xuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cbi8vXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyAgMDkvMzAvMjAyMCAtIEJpbGx5IEVybmVzdFxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXG4vL1xuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG52YXIgSGVhdnlDaGVja01hcmsgPSAn4pyU77iPJztcbmV4cG9ydHMuSGVhdnlDaGVja01hcmsgPSBIZWF2eUNoZWNrTWFyaztcbnZhciBQZW5jaWwgPSAn4pyP77iPJztcbmV4cG9ydHMuUGVuY2lsID0gUGVuY2lsO1xudmFyIFRyYXNoQ2FuID0gJ/Cfl5HvuI8nO1xuZXhwb3J0cy5UcmFzaENhbiA9IFRyYXNoQ2FuO1xudmFyIENyb3NzTWFyayA9ICfinYwnO1xuZXhwb3J0cy5Dcm9zc01hcmsgPSBDcm9zc01hcms7XG52YXIgUGx1cyA9ICfinpUnO1xuZXhwb3J0cy5QbHVzID0gUGx1cztcbnZhciBXYXJuaW5nID0gJ+KaoO+4jyc7XG5leHBvcnRzLldhcm5pbmcgPSBXYXJuaW5nO1xudmFyIFNwaW5uZXIgPSAn8J+UhCc7XG5leHBvcnRzLlNwaW5uZXIgPSBTcGlubmVyO1xudmFyIFdyZW5jaCA9ICfwn5SnJztcbmV4cG9ydHMuV3JlbmNoID0gV3JlbmNoO1xudmFyIEZsYWcgPSAn8J+aqSc7XG5leHBvcnRzLkZsYWcgPSBGbGFnO1xudmFyIFVwQXJyb3cgPSAn4qyG77iPJztcbmV4cG9ydHMuVXBBcnJvdyA9IFVwQXJyb3c7XG52YXIgRG93bkFycm93ID0gJ+Ksh++4jyc7XG5leHBvcnRzLkRvd25BcnJvdyA9IERvd25BcnJvdztcbnZhciBETkEgPSAn8J+nrCc7XG5leHBvcnRzLkROQSA9IEROQTtcbnZhciBJbnB1dE51bWJlcnMgPSAn8J+Uoic7XG5leHBvcnRzLklucHV0TnVtYmVycyA9IElucHV0TnVtYmVycztcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIENyZWF0ZUd1aWQudHMgLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMSwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vICBcclxuLy8gIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNTAzNC9ob3ctdG8tY3JlYXRlLWEtZ3VpZC11dWlkXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMDQvMjAyMSAtIEJpbGx5IEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5DcmVhdGVHdWlkID0gdm9pZCAwO1xyXG5mdW5jdGlvbiBDcmVhdGVHdWlkKCkge1xyXG4gICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcclxuICAgICAgICB2YXIgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDA7XHJcbiAgICAgICAgdmFyIHYgPSBjID09PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpO1xyXG4gICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuQ3JlYXRlR3VpZCA9IENyZWF0ZUd1aWQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIEdldE5vZGVTaXplLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIxLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAwMS8xNS8yMDIxIC0gQy4gTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5HZXROb2RlU2l6ZSA9IHZvaWQgMDtcclxuZnVuY3Rpb24gR2V0Tm9kZVNpemUobm9kZSkge1xyXG4gICAgaWYgKG5vZGUgPT09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgIH07XHJcbiAgICB2YXIgX2EgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBoZWlnaHQgPSBfYS5oZWlnaHQsIHdpZHRoID0gX2Eud2lkdGgsIHRvcCA9IF9hLnRvcCwgbGVmdCA9IF9hLmxlZnQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGhlaWdodDogcGFyc2VJbnQoaGVpZ2h0LnRvU3RyaW5nKCksIDEwKSxcclxuICAgICAgICB3aWR0aDogcGFyc2VJbnQod2lkdGgudG9TdHJpbmcoKSwgMTApLFxyXG4gICAgICAgIHRvcDogcGFyc2VJbnQodG9wLnRvU3RyaW5nKCksIDEwKSxcclxuICAgICAgICBsZWZ0OiBwYXJzZUludChsZWZ0LnRvU3RyaW5nKCksIDEwKSxcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5HZXROb2RlU2l6ZSA9IEdldE5vZGVTaXplO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBHZXRUZXh0V2lkdGgudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjEsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzA3LzIwMjEgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuR2V0VGV4dFdpZHRoID0gdm9pZCAwO1xyXG5mdW5jdGlvbiBHZXRUZXh0V2lkdGgoZm9udCwgZm9udFNpemUsIHdvcmQpIHtcclxuICAgIHZhciB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHQpO1xyXG4gICAgdGV4dC5zdHlsZS5mb250ID0gZm9udDtcclxuICAgIHRleHQuc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZTtcclxuICAgIHRleHQuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xyXG4gICAgdGV4dC5zdHlsZS53aWR0aCA9ICdhdXRvJztcclxuICAgIHRleHQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgdGV4dC5zdHlsZS53aGl0ZVNwYWNlID0gJ25vLXdyYXAnO1xyXG4gICAgdGV4dC5pbm5lckhUTUwgPSB3b3JkO1xyXG4gICAgdmFyIHdpZHRoID0gTWF0aC5jZWlsKHRleHQuY2xpZW50V2lkdGgpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXh0KTtcclxuICAgIHJldHVybiB3aWR0aDtcclxufVxyXG5leHBvcnRzLkdldFRleHRXaWR0aCA9IEdldFRleHRXaWR0aDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgaW5kZXgudHMgLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQg77+9IDIwMjEsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vLyAgXHJcbi8vICBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDUwMzQvaG93LXRvLWNyZWF0ZS1hLWd1aWQtdXVpZFxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzA0LzIwMjEgLSBCaWxseSBFcm5lc3RcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuR2V0Tm9kZVNpemUgPSBleHBvcnRzLkdldFRleHRXaWR0aCA9IGV4cG9ydHMuQ3JlYXRlR3VpZCA9IHZvaWQgMDtcclxudmFyIENyZWF0ZUd1aWRfMSA9IHJlcXVpcmUoXCIuL0NyZWF0ZUd1aWRcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNyZWF0ZUd1aWRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIENyZWF0ZUd1aWRfMS5DcmVhdGVHdWlkOyB9IH0pO1xyXG52YXIgR2V0VGV4dFdpZHRoXzEgPSByZXF1aXJlKFwiLi9HZXRUZXh0V2lkdGhcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkdldFRleHRXaWR0aFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gR2V0VGV4dFdpZHRoXzEuR2V0VGV4dFdpZHRoOyB9IH0pO1xyXG52YXIgR2V0Tm9kZVNpemVfMSA9IHJlcXVpcmUoXCIuL0dldE5vZGVTaXplXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJHZXROb2RlU2l6ZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gR2V0Tm9kZVNpemVfMS5HZXROb2RlU2l6ZTsgfSB9KTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgTG9hZGluZ0ljb24udHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzExLzIwMjAgLSBDaHJpc3RvcGggTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbnZhciBfX21ha2VUZW1wbGF0ZU9iamVjdCA9ICh0aGlzICYmIHRoaXMuX19tYWtlVGVtcGxhdGVPYmplY3QpIHx8IGZ1bmN0aW9uIChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xyXG52YXIgc3R5bGVkX2NvbXBvbmVudHNfMSA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTtcclxudmFyIHNwaW4gPSBzdHlsZWRfY29tcG9uZW50c18xLmtleWZyYW1lcyh0ZW1wbGF0ZU9iamVjdF8xIHx8ICh0ZW1wbGF0ZU9iamVjdF8xID0gX19tYWtlVGVtcGxhdGVPYmplY3QoW1wiXFxuIDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cXG4gMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cXG5cIl0sIFtcIlxcbiAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XFxuIDEwMCUgeyB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpOyB9XFxuXCJdKSkpO1xyXG52YXIgSWNvbiA9IHN0eWxlZF9jb21wb25lbnRzXzEuZGVmYXVsdC5kaXYodGVtcGxhdGVPYmplY3RfMiB8fCAodGVtcGxhdGVPYmplY3RfMiA9IF9fbWFrZVRlbXBsYXRlT2JqZWN0KFtcIlxcblxcdGFuaW1hdGlvbjogXCIsIFwiIDFzIGxpbmVhciBpbmZpbml0ZTtcXG5cXHRib3JkZXI6IFwiLCBcInB4IHNvbGlkICNmM2YzZjM7XFxuXFx0Ym9yZGVyLVRvcDogXCIsIFwicHggc29saWQgIzU1NTtcXG5cXHRib3JkZXItUmFkaXVzOiA1MCU7XFxuXFx0d2lkdGg6IFwiLCBcInB4O1xcblxcdGhlaWdodDogXCIsIFwicHhcXG5cIl0sIFtcIlxcblxcdGFuaW1hdGlvbjogXCIsIFwiIDFzIGxpbmVhciBpbmZpbml0ZTtcXG5cXHRib3JkZXI6IFwiLCBcInB4IHNvbGlkICNmM2YzZjM7XFxuXFx0Ym9yZGVyLVRvcDogXCIsIFwicHggc29saWQgIzU1NTtcXG5cXHRib3JkZXItUmFkaXVzOiA1MCU7XFxuXFx0d2lkdGg6IFwiLCBcInB4O1xcblxcdGhlaWdodDogXCIsIFwicHhcXG5cIl0pKSwgc3BpbiwgZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBwcm9wcy5zaXplIC8gNTsgfSwgZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBwcm9wcy5zaXplIC8gNTsgfSwgZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBwcm9wcy5zaXplOyB9LCBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIHByb3BzLnNpemU7IH0pO1xyXG52YXIgTG9hZGluZ0ljb24gPSBmdW5jdGlvbiAocHJvcHMpIHtcclxuICAgIHZhciBoID0gKHByb3BzLlNpemUgPT09IHVuZGVmaW5lZCA/IDI1IDogcHJvcHMuU2l6ZSk7XHJcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgd2lkdGg6IChwcm9wcy5MYWJlbCA9PT0gdW5kZWZpbmVkID8gaCA6IHVuZGVmaW5lZCksIG1hcmdpbjogJ2F1dG8nIH0sIGhpZGRlbjogIXByb3BzLlNob3cgfSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJY29uLCB7IHNpemU6IGggfSksXHJcbiAgICAgICAgICAgIHByb3BzLkxhYmVsICE9PSB1bmRlZmluZWQgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBudWxsLCBwcm9wcy5MYWJlbCkgOiBudWxsKSkpO1xyXG59O1xyXG5leHBvcnRzLmRlZmF1bHQgPSBMb2FkaW5nSWNvbjtcclxudmFyIHRlbXBsYXRlT2JqZWN0XzEsIHRlbXBsYXRlT2JqZWN0XzI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIExvYWRpbmdTY3JlZW4udHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzExLzIwMjAgLSBDaHJpc3RvcGggTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xyXG52YXIgTG9hZGluZ0ljb25fMSA9IHJlcXVpcmUoXCIuL0xvYWRpbmdJY29uXCIpO1xyXG52YXIgTG9hZGluZ1NjcmVlbiA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG4gICAgdmFyIHggPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gMjA7XHJcbiAgICByZXR1cm4gKHByb3BzLlNob3cgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgICAgIHpJbmRleDogOTk4MCxcclxuICAgICAgICB9IH0sXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IGhlaWdodDogJzQwcHgnLCB3aWR0aDogJzQwcHgnLCBtYXJnaW46ICdhdXRvJywgbWFyZ2luVG9wOiB4IH0gfSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMb2FkaW5nSWNvbl8xLmRlZmF1bHQsIHsgU2hvdzogdHJ1ZSwgU2l6ZTogNDAgfSkpKSA6IG51bGwpO1xyXG59O1xyXG5leHBvcnRzLmRlZmF1bHQgPSBMb2FkaW5nU2NyZWVuO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBNb2RhbC50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMTIvMjkvMjAyMCAtIENocmlzdG9waCBMYWNrbmVyXHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XHJcbnZhciBUb29sVGlwXzEgPSByZXF1aXJlKFwiLi9Ub29sVGlwXCIpO1xyXG52YXIgaGVscGVyX2Z1bmN0aW9uc18xID0gcmVxdWlyZShcIkBncGEtZ2Vtc3RvbmUvaGVscGVyLWZ1bmN0aW9uc1wiKTtcclxuLy8gUHJvcHMgRGVzY3JpcHRpb246XHJcbi8vIFRpdGxlID0+IFRpdGxlIG9mIFRoZSBNb2RhbFxyXG4vLyBTaG93WCA9PiBzaG93IG9yIGhpZGUgdGhlIFggYnV0dG9uIChkZWZhdWx0IHRydWUpXHJcbi8vIENhbGxCYWNrID0+IEZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIGNsb3NpbmcgdGhlIE1vZGFsIGVpdGhlciB0aHJvdWdoIENhbmNlbCAoY29uZmlybWVkPWZhbHNlKSBvciBBY2NlcHQgQnV0dG9uIChjb25maXJtZWQ9dHJ1ZSlcclxuLy8gU2hvdyA9PiBXaGV0aGVyIHRvIHNob3cgdGhlIG1vZGFsXHJcbi8vIFNpemUgPT4gU2l6ZSBvZiB0aGUgbW9kYWxcclxuLy8gU2hvd0NhbmNlbCA9PiBXaGV0aGVyIHRvIHNob3cgdGhlIGNhbmNlbCBidXR0b25cclxuLy8gRGlzYWJsZUNvbmZpcm0gPT4gRGlzYWJsZXMgdGhlIENvbmZpcm0gYnV0dG9uXHJcbi8vIENhbmNlbFRleHQgPT4gVGV4dCBvbiBDYW5jZWwgQnV0dG9uXHJcbi8vIENvbmZpcm0gdGV4dCA9PiBUZXh0IG9uIENvbmZpcm0gYnV0dG9uXHJcbi8vIENvbmZpcm1CdG5DbGFzcyA9PiBDbGFzcyBvZiB0aGUgQ29uZmlybSBCdXR0b25cclxuLy8gQ2FuY2VsQnRuQ2xhc3MgPT4+IENsYXNzIG9mIHRoZSBDYW5jZWwgQnV0dG9uXHJcbnZhciBNb2RhbCA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG4gICAgdmFyIF9hID0gUmVhY3QudXNlU3RhdGUoJ25vbmUnKSwgaG92ZXIgPSBfYVswXSwgc2V0SG92ZXIgPSBfYVsxXTtcclxuICAgIHZhciBfYiA9IFJlYWN0LnVzZVN0YXRlKCcnKSwgZ3VpZCA9IF9iWzBdLCBzZXRHdWlkID0gX2JbMV07XHJcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNldEd1aWQoaGVscGVyX2Z1bmN0aW9uc18xLkNyZWF0ZUd1aWQoKSk7XHJcbiAgICB9LCBbXSk7XHJcbiAgICB2YXIgY29uZmlybUJ0biA9IChwcm9wcy5Db25maXJtVGV4dCA9PT0gdW5kZWZpbmVkID8gJ1NhdmUnIDogcHJvcHMuQ29uZmlybVRleHQpO1xyXG4gICAgdmFyIGN4bkJ0biA9IChwcm9wcy5DYW5jZWxUZXh0ID09PSB1bmRlZmluZWQgPyAnQ2FuY2VsJyA6IHByb3BzLkNhbmNlbFRleHQpO1xyXG4gICAgdmFyIGN4bmJ0bkNscyA9ICdidG4gJyArIChwcm9wcy5DYW5jZWxCdG5DbGFzcyA9PT0gdW5kZWZpbmVkID8gJ2J0bi1kYW5nZXInIDogcHJvcHMuQ2FuY2VsQnRuQ2xhc3MpO1xyXG4gICAgdmFyIGNvbmZpcm1idG5DbHMgPSAnYnRuICcgKyAocHJvcHMuQ29uZmlybUJ0bkNsYXNzID09PSB1bmRlZmluZWQgPyAnYnRuLXByaW1hcnknIDogcHJvcHMuQ29uZmlybUJ0bkNsYXNzKTtcclxuICAgIHZhciBzaG93Q29uZmlybVRvb2xUaXAgPSAocHJvcHMuQ29uZmlybVNob3dUb29sVGlwICE9PSB1bmRlZmluZWQgJiYgcHJvcHMuQ29uZmlybVNob3dUb29sVGlwKSAmJiBob3ZlciA9PT0gJ2NvbmZpcm0nO1xyXG4gICAgdmFyIHNob3dDeG5Ub29sVGlwID0gKHByb3BzLkNhbmNlbFNob3dUb29sVGlwICE9PSB1bmRlZmluZWQgJiYgcHJvcHMuQ2FuY2VsU2hvd1Rvb2xUaXApICYmIGhvdmVyID09PSAnY2FuY2VsJztcclxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm1vZGFsXCIgKyAocHJvcHMuU2hvdyA/IFwiIHNob3dcIiA6ICcnKSwgc3R5bGU6IHByb3BzLlNob3cgPyB7IGRpc3BsYXk6ICdibG9jaycsIHpJbmRleDogOTk5MCB9IDoge30gfSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtb2RhbC1kaWFsb2dcIiArIChwcm9wcy5TaXplID09PSB1bmRlZmluZWQgPyAnJyA6IHByb3BzLlNpemUgPT09ICd4bGcnID8gJycgOiAoXCIgbW9kYWwtXCIgKyBwcm9wcy5TaXplKSksIHN0eWxlOiBwcm9wcy5TaXplID09PSAneGxnJyA/IHsgbWF4V2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoIC0gMTAwIH0gOiB7fSB9LFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtb2RhbC1jb250ZW50XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm1vZGFsLWhlYWRlclwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoNFwiLCB7IGNsYXNzTmFtZTogXCJtb2RhbC10aXRsZVwiIH0sIHByb3BzLlRpdGxlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2hvd1ggPyBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJidXR0b25cIiwgY2xhc3NOYW1lOiBcImNsb3NlXCIsIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHByb3BzLkNhbGxCYWNrKGZhbHNlLCBmYWxzZSk7IH0gfSwgXCJcXHUwMEQ3XCIpIDogbnVsbCksXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtb2RhbC1ib2R5XCIgfSwgcHJvcHMuU2hvdyA/IHByb3BzLmNoaWxkcmVuIDogbnVsbCksXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtb2RhbC1mb290ZXJcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgdHlwZTogXCJidXR0b25cIiwgY2xhc3NOYW1lOiBjb25maXJtYnRuQ2xzICsgKCEocHJvcHMuRGlzYWJsZUNvbmZpcm0gPT09IHVuZGVmaW5lZCB8fCAhcHJvcHMuRGlzYWJsZUNvbmZpcm0pID8gJyBkaXNhYmxlZCcgOiAnJyksIFwiZGF0YS10b29sdGlwXCI6IGd1aWQgKyAnLWNvbmZpcm0nLCBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7IGlmICghKHByb3BzLkRpc2FibGVDb25maXJtID09PSB1bmRlZmluZWQgfHwgIXByb3BzLkRpc2FibGVDb25maXJtKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47IHByb3BzLkNhbGxCYWNrKHRydWUsIHRydWUpOyB9LCBvbk1vdXNlRW50ZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNldEhvdmVyKCdjb25maXJtJyk7IH0sIG9uTW91c2VMZWF2ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2V0SG92ZXIoJ25vbmUnKTsgfSB9LCBjb25maXJtQnRuKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2hvd0NhbmNlbCA9PT0gdW5kZWZpbmVkIHx8IHByb3BzLlNob3dDYW5jZWwgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IHR5cGU6IFwiYnV0dG9uXCIsIGNsYXNzTmFtZTogY3huYnRuQ2xzICsgKCEocHJvcHMuRGlzYWJsZUNhbmNlbCA9PT0gdW5kZWZpbmVkIHx8ICFwcm9wcy5EaXNhYmxlQ2FuY2VsKSA/ICcgZGlzYWJsZWQnIDogJycpLCBcImRhdGEtdG9vbHRpcFwiOiBndWlkICsgJy1jYW5jZWwnLCBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7IGlmICghKHByb3BzLkRpc2FibGVDYW5jZWwgPT09IHVuZGVmaW5lZCB8fCAhcHJvcHMuRGlzYWJsZUNhbmNlbCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjsgcHJvcHMuQ2FsbEJhY2soZmFsc2UsIHRydWUpOyB9LCBvbk1vdXNlRW50ZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNldEhvdmVyKCdjYW5jZWwnKTsgfSwgb25Nb3VzZUxlYXZlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXRIb3Zlcignbm9uZScpOyB9IH0sIGN4bkJ0bilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb29sVGlwXzEuZGVmYXVsdCwgeyBTaG93OiBzaG93Q29uZmlybVRvb2xUaXAsIFBvc2l0aW9uOiAndG9wJywgVGhlbWU6ICdkYXJrJywgVGFyZ2V0OiBndWlkICsgJy1jb25maXJtJywgWmluZGV4OiA5OTk5IH0sIHByb3BzLkNvbmZpcm1Ub29sVGlwQ29udGVudCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9vbFRpcF8xLmRlZmF1bHQsIHsgU2hvdzogc2hvd0N4blRvb2xUaXAsIFBvc2l0aW9uOiAndG9wJywgVGhlbWU6ICdkYXJrJywgVGFyZ2V0OiBndWlkICsgJy1jYW5jZWwnLCBaaW5kZXg6IDk5OTkgfSwgcHJvcHMuQ2FuY2VsVG9vbFRpcENvbnRlbnQpKSkpKSxcclxuICAgICAgICBwcm9wcy5TaG93ID8gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjUsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgICAgICAgICAgIHpJbmRleDogOTk4MCxcclxuICAgICAgICAgICAgfSB9KSA6IG51bGwpKTtcclxufTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gTW9kYWw7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFNlYXJjaEJhci50c3ggLSBHYnRjXHJcbi8vXHJcbi8vICBDb3B5cmlnaHQgwqkgMjAyMCwgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlLiAgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuLy9cclxuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcclxuLy8gIHRoZSBOT1RJQ0UgZmlsZSBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC5cclxuLy8gIFRoZSBHUEEgbGljZW5zZXMgdGhpcyBmaWxlIHRvIHlvdSB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHRoZSBcIkxpY2Vuc2VcIjsgeW91IG1heSBub3QgdXNlIHRoaXNcclxuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxyXG4vL1xyXG4vLyAgICAgIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcclxuLy9cclxuLy8gIFVubGVzcyBhZ3JlZWQgdG8gaW4gd3JpdGluZywgdGhlIHN1YmplY3Qgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cclxuLy8gIFwiQVMtSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFJlZmVyIHRvIHRoZVxyXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXHJcbi8vXHJcbi8vICBDb2RlIE1vZGlmaWNhdGlvbiBIaXN0b3J5OlxyXG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgMDEvMDYvMjAyMCAtIENocmlzdG9waCBMYWNrbmVyXHJcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxyXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG52YXIgX19zcHJlYWRBcnJheXMgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXlzKSB8fCBmdW5jdGlvbiAoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XHJcbnZhciBNb2RhbF8xID0gcmVxdWlyZShcIi4vTW9kYWxcIik7XHJcbnZhciBMb2FkaW5nSWNvbl8xID0gcmVxdWlyZShcIi4vTG9hZGluZ0ljb25cIik7XHJcbnZhciByZWFjdF9mb3Jtc18xID0gcmVxdWlyZShcIkBncGEtZ2Vtc3RvbmUvcmVhY3QtZm9ybXNcIik7XHJcbnZhciBncGFfc3ltYm9sc18xID0gcmVxdWlyZShcIkBncGEtZ2Vtc3RvbmUvZ3BhLXN5bWJvbHNcIik7XHJcbmZ1bmN0aW9uIFNlYXJjaEJhcihwcm9wcykge1xyXG4gICAgdmFyIF9hID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpLCBob3ZlciA9IF9hWzBdLCBzZXRIb3ZlciA9IF9hWzFdO1xyXG4gICAgdmFyIF9iID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpLCBzaG93ID0gX2JbMF0sIHNldFNob3cgPSBfYlsxXTtcclxuICAgIHZhciBfYyA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKSwgaXNOZXcgPSBfY1swXSwgc2V0SXNOZXcgPSBfY1sxXTtcclxuICAgIHZhciBfZCA9IFJlYWN0LnVzZVN0YXRlKFtdKSwgZmlsdGVycyA9IF9kWzBdLCBzZXRGaWx0ZXJzID0gX2RbMV07XHJcbiAgICB2YXIgX2UgPSBSZWFjdC51c2VTdGF0ZSh7IEZpZWxkTmFtZTogcHJvcHMuQ29sbHVtbkxpc3RbMF0ua2V5LCBTZWFyY2hUZXh0OiAnJywgT3BlcmF0b3I6IHByb3BzLkNvbGx1bW5MaXN0WzBdLnR5cGUgPT09ICdzdHJpbmcnID8gJ0xJS0UnIDogJz0nLCBUeXBlOiBwcm9wcy5Db2xsdW1uTGlzdFswXS50eXBlIH0pLCBmaWx0ZXIgPSBfZVswXSwgc2V0RmlsdGVyID0gX2VbMV07XHJcbiAgICB2YXIgX2YgPSBSZWFjdC51c2VTdGF0ZShcIlwiKSwgc2VhcmNoID0gX2ZbMF0sIHNldFNlYXJjaCA9IF9mWzFdO1xyXG4gICAgdmFyIF9nID0gUmVhY3QudXNlU3RhdGUobnVsbCksIHNlYXJjaEZpbHRlciA9IF9nWzBdLCBzZXRTZWFyY2hGaWx0ZXIgPSBfZ1sxXTtcclxuICAgIC8vIFVwZGF0ZSBTZWFyY2hGaWx0ZXIgaWYgdGhlcmUgYXJlIGFueSBDaGFyYWN0ZXIgYW5kIG9ubHkgZG8gaXQgZXZlcnkgNTAwbXMgdG8gYXZvaWQgaGFtbWVyaW5nIHRoZSBzZXJ2ZXIgd2hpbGUgdHlwaW5nXHJcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBoYW5kbGUgPSBudWxsO1xyXG4gICAgICAgIGlmIChzZWFyY2gubGVuZ3RoID4gMCAmJiBwcm9wcy5kZWZhdWx0Q29sbHVtbiAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBoYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9wcy5kZWZhdWx0Q29sbHVtbiAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHNldFNlYXJjaEZpbHRlcih7IEZpZWxkTmFtZTogcHJvcHMuZGVmYXVsdENvbGx1bW4ua2V5LCBPcGVyYXRvcjogJ0xJS0UnLCBUeXBlOiBwcm9wcy5kZWZhdWx0Q29sbHVtbi50eXBlLCBTZWFyY2hUZXh0OiAoJyonICsgc2VhcmNoICsgJyonKSB9KTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0U2VhcmNoRmlsdGVyKG51bGwpO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IGlmIChoYW5kbGUgIT09IG51bGwpXHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChoYW5kbGUpOyB9O1xyXG4gICAgfSwgW3NlYXJjaF0pO1xyXG4gICAgUmVhY3QudXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoc2VhcmNoRmlsdGVyICE9PSBudWxsKVxyXG4gICAgICAgICAgICBwcm9wcy5TZXRGaWx0ZXIoX19zcHJlYWRBcnJheXMoZmlsdGVycywgW3NlYXJjaEZpbHRlcl0pKTtcclxuICAgICAgICBpZiAoc2VhcmNoRmlsdGVyID09PSBudWxsKVxyXG4gICAgICAgICAgICBwcm9wcy5TZXRGaWx0ZXIoZmlsdGVycyk7XHJcbiAgICB9LCBbc2VhcmNoRmlsdGVyXSk7XHJcbiAgICBmdW5jdGlvbiBkZWxldGVGaWx0ZXIoZikge1xyXG4gICAgICAgIHZhciBpbmRleCA9IGZpbHRlcnMuZmluZEluZGV4KGZ1bmN0aW9uIChmcykgeyByZXR1cm4gZnMgPT09IGY7IH0pO1xyXG4gICAgICAgIHZhciBmaWx0cyA9IF9fc3ByZWFkQXJyYXlzKGZpbHRlcnMpO1xyXG4gICAgICAgIGZpbHRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgc2V0RmlsdGVycyhmaWx0cyk7XHJcbiAgICAgICAgc2V0SG92ZXIoZmFsc2UpO1xyXG4gICAgICAgIGlmIChwcm9wcy5kZWZhdWx0Q29sbHVtbiAhPT0gdW5kZWZpbmVkICYmIHNlYXJjaEZpbHRlciAhPT0gbnVsbClcclxuICAgICAgICAgICAgcHJvcHMuU2V0RmlsdGVyKF9fc3ByZWFkQXJyYXlzKGZpbHRzLCBbc2VhcmNoRmlsdGVyXSkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcHJvcHMuU2V0RmlsdGVyKGZpbHRzKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGFkZEZpbHRlcigpIHtcclxuICAgICAgICB2YXIgb2xkRmlsdGVycyA9IF9fc3ByZWFkQXJyYXlzKGZpbHRlcnMpO1xyXG4gICAgICAgIHZhciBhZGp1c3RlZEZpbHRlciA9IF9fYXNzaWduKHt9LCBmaWx0ZXIpO1xyXG4gICAgICAgIGlmIChhZGp1c3RlZEZpbHRlci5UeXBlID09PSAnc3RyaW5nJyAmJiBhZGp1c3RlZEZpbHRlci5PcGVyYXRvciA9PT0gJ0xJS0UnKVxyXG4gICAgICAgICAgICBhZGp1c3RlZEZpbHRlci5TZWFyY2hUZXh0ID0gJyonICsgYWRqdXN0ZWRGaWx0ZXIuU2VhcmNoVGV4dCArICcqJztcclxuICAgICAgICBvbGRGaWx0ZXJzLnB1c2goYWRqdXN0ZWRGaWx0ZXIpO1xyXG4gICAgICAgIHNldEZpbHRlcnMob2xkRmlsdGVycyk7XHJcbiAgICAgICAgc2V0RmlsdGVyKHsgRmllbGROYW1lOiBwcm9wcy5Db2xsdW1uTGlzdFswXS5rZXksIFNlYXJjaFRleHQ6ICcnLCBPcGVyYXRvcjogcHJvcHMuQ29sbHVtbkxpc3RbMF0udHlwZSA9PT0gJ3N0cmluZycgPyAnTElLRScgOiAnPScsIFR5cGU6IHByb3BzLkNvbGx1bW5MaXN0WzBdLnR5cGUgfSk7XHJcbiAgICAgICAgc2V0RmlsdGVyKHsgRmllbGROYW1lOiBwcm9wcy5Db2xsdW1uTGlzdFswXS5rZXksIFNlYXJjaFRleHQ6ICcnLCBPcGVyYXRvcjogcHJvcHMuQ29sbHVtbkxpc3RbMF0udHlwZSA9PT0gJ3N0cmluZycgPyAnTElLRScgOiAnPScsIFR5cGU6IHByb3BzLkNvbGx1bW5MaXN0WzBdLnR5cGUgfSk7XHJcbiAgICAgICAgaWYgKHByb3BzLmRlZmF1bHRDb2xsdW1uICE9PSB1bmRlZmluZWQgJiYgc2VhcmNoRmlsdGVyICE9PSBudWxsKVxyXG4gICAgICAgICAgICBwcm9wcy5TZXRGaWx0ZXIoX19zcHJlYWRBcnJheXMob2xkRmlsdGVycywgW3NlYXJjaEZpbHRlcl0pKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHByb3BzLlNldEZpbHRlcihvbGRGaWx0ZXJzKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGVkaXRGaWx0ZXIoaW5kZXgpIHtcclxuICAgICAgICBzZXRJc05ldyhmYWxzZSk7XHJcbiAgICAgICAgdmFyIG9sZEZpbHRlcnMgPSBfX3NwcmVhZEFycmF5cyhmaWx0ZXJzKTtcclxuICAgICAgICB2YXIgZmlsdCA9IG9sZEZpbHRlcnNbaW5kZXhdO1xyXG4gICAgICAgIG9sZEZpbHRlcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBpZiAoZmlsdC5UeXBlID09PSAnc3RyaW5nJyAmJiBmaWx0Lk9wZXJhdG9yID09PSAnTElLRScpXHJcbiAgICAgICAgICAgIGZpbHQuU2VhcmNoVGV4dCA9IGZpbHQuU2VhcmNoVGV4dC5zdWJzdHIoMSwgZmlsdC5TZWFyY2hUZXh0Lmxlbmd0aCAtIDIpO1xyXG4gICAgICAgIHNldFNob3codHJ1ZSk7XHJcbiAgICAgICAgc2V0RmlsdGVycyhvbGRGaWx0ZXJzKTtcclxuICAgICAgICBzZXRGaWx0ZXIoZmlsdCk7XHJcbiAgICAgICAgaWYgKHByb3BzLmRlZmF1bHRDb2xsdW1uICE9PSB1bmRlZmluZWQgJiYgc2VhcmNoRmlsdGVyICE9PSBudWxsKVxyXG4gICAgICAgICAgICBwcm9wcy5TZXRGaWx0ZXIoX19zcHJlYWRBcnJheXMob2xkRmlsdGVycywgW3NlYXJjaEZpbHRlcl0pKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHByb3BzLlNldEZpbHRlcihvbGRGaWx0ZXJzKTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUZpbHRlcigpIHtcclxuICAgICAgICBzZXRTaG93KCFzaG93KTtcclxuICAgICAgICBzZXRJc05ldyh0cnVlKTtcclxuICAgICAgICBzZXRGaWx0ZXIoeyBGaWVsZE5hbWU6IHByb3BzLkNvbGx1bW5MaXN0WzBdLmtleSwgU2VhcmNoVGV4dDogJycsIE9wZXJhdG9yOiBwcm9wcy5Db2xsdW1uTGlzdFswXS50eXBlID09PSAnc3RyaW5nJyA/ICdMSUtFJyA6ICc9JywgVHlwZTogcHJvcHMuQ29sbHVtbkxpc3RbMF0udHlwZSB9KTtcclxuICAgIH1cclxuICAgIHZhciBjb250ZW50ID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImZvcm1cIiwgbnVsbCxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJyb3dcIiB9LFxyXG4gICAgICAgICAgICAgICAgcHJvcHMuZGVmYXVsdENvbGx1bW4gIT09IHVuZGVmaW5lZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJjb2xcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImlucHV0LWdyb3VwXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2wgbXItc20tMlwiLCB0eXBlOiBcInNlYXJjaFwiLCBwbGFjZWhvbGRlcjogXCJTZWFyY2ggXCIgKyBwcm9wcy5kZWZhdWx0Q29sbHVtbi5sYWJlbCwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldmVudCkgeyByZXR1cm4gc2V0U2VhcmNoKGV2ZW50LnRhcmdldC52YWx1ZSk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TaG93TG9hZGluZyAhPT0gdW5kZWZpbmVkICYmIHByb3BzLlNob3dMb2FkaW5nID8gUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbnB1dC1ncm91cC1hcHBlbmRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTG9hZGluZ0ljb25fMS5kZWZhdWx0LCB7IFNob3c6IHRydWUgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIpIDogbnVsbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsgc3R5bGU6IHsgbWFyZ2luVG9wOiAyLCBtYXJnaW5Cb3R0b206IDIgfSB9LCBwcm9wcy5SZXN1bHROb3RlKSkgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyB9LCBjbGFzc05hbWU6ICdjb2wnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzTmFtZTogXCJidG4gYnRuLXByaW1hcnlcIiwgb25DbGljazogZnVuY3Rpb24gKGV2dCkgeyBldnQucHJldmVudERlZmF1bHQoKTsgY3JlYXRlRmlsdGVyKCk7IH0sIG9uTW91c2VFbnRlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2V0SG92ZXIodHJ1ZSk7IH0sIG9uTW91c2VMZWF2ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2V0SG92ZXIoZmFsc2UpOyB9IH0sIFwiQWRkIEZpbHRlclwiKSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoIC8gMywgZGlzcGxheTogaG92ZXIgPyAnYmxvY2snIDogJ25vbmUnLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgYmFja2dyb3VuZENvbG9yOiAnI2YxZjFmMScsIGJveFNoYWRvdzogJzBweCA4cHggMTZweCAwcHggcmdiYSgwLDAsMCwwLjIpJywgekluZGV4OiAxLCByaWdodDogKHByb3BzLkRpcmVjdGlvbiA9PT0gJ3JpZ2h0JyA/IDAgOiB1bmRlZmluZWQpLCBsZWZ0OiAocHJvcHMuRGlyZWN0aW9uID09PSAnbGVmdCcgPyAwIDogdW5kZWZpbmVkKSB9LCBvbk1vdXNlRW50ZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNldEhvdmVyKHRydWUpOyB9LCBvbk1vdXNlTGVhdmU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNldEhvdmVyKGZhbHNlKTsgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiwgeyBjbGFzc05hbWU6ICd0YWJsZScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aGVhZFwiLCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwgbnVsbCwgXCJDb2x1bW5cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiLCBudWxsLCBcIk9wZXJhdG9yXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwgbnVsbCwgXCJTZWFyY2ggVGV4dFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIG51bGwsIFwiRWRpdFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRoXCIsIG51bGwsIFwiUmVtb3ZlXCIpKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiwgbnVsbCwgZmlsdGVycy5tYXAoZnVuY3Rpb24gKGYsIGkpIHsgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0clwiLCB7IGtleTogaSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLCBmLkZpZWxkTmFtZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRkXCIsIG51bGwsIGYuT3BlcmF0b3IpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLCBmLlNlYXJjaFRleHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcImJ0biBidG4tc21cIiwgb25DbGljazogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGVkaXRGaWx0ZXIoaSk7IH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsIGdwYV9zeW1ib2xzXzEuUGVuY2lsKSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiLCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgY2xhc3NOYW1lOiBcImJ0biBidG4tc21cIiwgb25DbGljazogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGRlbGV0ZUZpbHRlcihmKTsgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgZ3BhX3N5bWJvbHNfMS5UcmFzaENhbikpKSk7IH0pKSkpKSkpKSk7XHJcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyB3aWR0aDogJzEwMCUnIH0gfSxcclxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibmF2XCIsIHsgY2xhc3NOYW1lOiBcIm5hdmJhciBuYXZiYXItZXhwYW5kLWxnIG5hdmJhci1saWdodCBiZy1saWdodFwiIH0sXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCIsIHN0eWxlOiB7IHdpZHRoOiAnMTAwJScgfSB9LFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHsgY2xhc3NOYW1lOiBcIm5hdmJhci1uYXYgbXItYXV0b1wiLCBzdHlsZTogeyB3aWR0aDogJzEwMCUnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5EaXJlY3Rpb24gPT09ICdyaWdodCcgPyBwcm9wcy5jaGlsZHJlbiA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuTGFiZWwgIT09IHVuZGVmaW5lZCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJuYXYtaXRlbVwiLCBzdHlsZTogeyBtaW5XaWR0aDogKHByb3BzLldpZHRoID09PSB1bmRlZmluZWQgPyAnMTUwcHgnIDogdW5kZWZpbmVkKSwgd2lkdGg6IHByb3BzLldpZHRoLCBwYWRkaW5nUmlnaHQ6IDEwIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiLCB7IGNsYXNzTmFtZTogXCJib3JkZXJcIiwgc3R5bGU6IHsgcGFkZGluZzogJzEwcHgnLCBoZWlnaHQ6ICcxMDAlJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxlZ2VuZFwiLCB7IGNsYXNzTmFtZTogXCJ3LWF1dG9cIiwgc3R5bGU6IHsgZm9udFNpemU6ICdsYXJnZScgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5MYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI6XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQpKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogXCJuYXYtaXRlbVwiLCBzdHlsZTogeyBtaW5XaWR0aDogKHByb3BzLldpZHRoID09PSB1bmRlZmluZWQgPyAnMTUwcHgnIDogdW5kZWZpbmVkKSwgd2lkdGg6IHByb3BzLldpZHRoLCBwYWRkaW5nUmlnaHQ6IDEwIH0gfSwgY29udGVudCksXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuRGlyZWN0aW9uID09PSAnbGVmdCcgPyBwcm9wcy5jaGlsZHJlbiA6IG51bGwpKSksXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbF8xLmRlZmF1bHQsIHsgVGl0bGU6ICdBZGQgRmlsdGVyJywgU2hvdzogc2hvdywgQ2FsbEJhY2s6IGZ1bmN0aW9uIChjb25mKSB7IGlmIChjb25mKVxyXG4gICAgICAgICAgICAgICAgYWRkRmlsdGVyKCk7IHNldFNob3coZmFsc2UpOyB9LCBDb25maXJtVGV4dDogaXNOZXcgPyAnQWRkJyA6ICdTYXZlJywgQ2FuY2VsVGV4dDogaXNOZXcgPyAnQ2xvc2UnIDogJ0RlbGV0ZScgfSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChyZWFjdF9mb3Jtc18xLlNlbGVjdCwgeyBSZWNvcmQ6IGZpbHRlciwgRmllbGQ6ICdGaWVsZE5hbWUnLCBPcHRpb25zOiBwcm9wcy5Db2xsdW1uTGlzdC5tYXAoZnVuY3Rpb24gKGZsKSB7IHJldHVybiAoeyBWYWx1ZTogZmwua2V5LCBMYWJlbDogZmwubGFiZWwgfSk7IH0pLCBTZXR0ZXI6IGZ1bmN0aW9uIChyZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3BlcmF0b3IgPSBcIklOXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbHVtbiA9IHByb3BzLkNvbGx1bW5MaXN0LmZpbmQoZnVuY3Rpb24gKGZsKSB7IHJldHVybiBmbC5rZXkgPT09IHJlY29yZC5GaWVsZE5hbWU7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4gIT09IHVuZGVmaW5lZCAmJiBjb2x1bW4udHlwZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdG9yID0gXCJMSUtFXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RmlsdGVyKGZ1bmN0aW9uIChwcmV2RmlsdGVyKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHByZXZGaWx0ZXIpLCB7IEZpZWxkTmFtZTogcmVjb3JkLkZpZWxkTmFtZSwgU2VhcmNoVGV4dDogJycsIE9wZXJhdG9yOiBvcGVyYXRvciwgVHlwZTogKGNvbHVtbiAhPT0gdW5kZWZpbmVkID8gY29sdW1uLnR5cGUgOiAnc3RyaW5nJykgfSkpOyB9KTtcclxuICAgICAgICAgICAgICAgIH0sIExhYmVsOiAnQ29sdW1uJyB9KSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGaWx0ZXJDcmVhdG9yLCB7IEZpbHRlcjogZmlsdGVyLCBGaWVsZDogcHJvcHMuQ29sbHVtbkxpc3QuZmluZChmdW5jdGlvbiAoZmwpIHsgcmV0dXJuIGZsLmtleSA9PT0gZmlsdGVyLkZpZWxkTmFtZTsgfSksIFNldHRlcjogZnVuY3Rpb24gKHJlY29yZCkgeyByZXR1cm4gc2V0RmlsdGVyKHJlY29yZCk7IH0sIEVudW06IChwcm9wcy5HZXRFbnVtID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBwcm9wcy5HZXRFbnVtKSB9KSkpKTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBTZWFyY2hCYXI7XHJcbmZ1bmN0aW9uIEZpbHRlckNyZWF0b3IocHJvcHMpIHtcclxuICAgIHZhciBfYSA9IFJlYWN0LnVzZVN0YXRlKFtdKSwgb3B0aW9ucyA9IF9hWzBdLCBzZXRPcHRpb25zID0gX2FbMV07XHJcbiAgICBSZWFjdC51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChwcm9wcy5GaWVsZCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKHByb3BzLkZpZWxkLmVudW0gIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgc2V0T3B0aW9ucyhwcm9wcy5GaWVsZC5lbnVtKTtcclxuICAgICAgICBpZiAocHJvcHMuRW51bSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuRW51bShzZXRPcHRpb25zLCBwcm9wcy5GaWVsZCk7XHJcbiAgICAgICAgaWYgKHByb3BzLkZpZWxkLmVudW0gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICB9LCBbcHJvcHMuRmllbGQsIHByb3BzLkVudW1dKTtcclxuICAgIGlmIChwcm9wcy5GaWVsZCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgaWYgKHByb3BzLkZpZWxkLnR5cGUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBcIkNvbHVtbiB0eXBlIGlzIHN0cmluZy4gV2lsZGNhcmQgKCopIGNhbiBiZSB1c2VkIHdpdGggJ0xJS0UnIGFuZCAnTk9UIExJS0UnXCIpLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAncm93JyB9LFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2NvbC00JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwgeyBjbGFzc05hbWU6ICdmb3JtLWNvbnRyb2wnLCB2YWx1ZTogcHJvcHMuRmlsdGVyLk9wZXJhdG9yLCBvbkNoYW5nZTogZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlNldHRlcihmdW5jdGlvbiAocHJldlN0YXRlKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHByZXZTdGF0ZSksIHsgT3BlcmF0b3I6IHZhbHVlIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiAnTElLRScgfSwgXCJMSUtFXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsgdmFsdWU6ICc9JyB9LCBcIj1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogJ05PVCBMSUtFJyB9LCBcIk5PVCBMSUtFXCIpKSksXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAnY29sJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IGNsYXNzTmFtZTogJ2Zvcm0tY29udHJvbCcsIHZhbHVlOiBwcm9wcy5GaWx0ZXIuU2VhcmNoVGV4dCwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIoZnVuY3Rpb24gKHByZXZTdGF0ZSkgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcmV2U3RhdGUpLCB7IFNlYXJjaFRleHQ6IHZhbHVlIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSkpKSkpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocHJvcHMuRmllbGQudHlwZSA9PT0gXCJpbnRlZ2VyXCIgfHwgcHJvcHMuRmllbGQudHlwZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIG51bGwsXHJcbiAgICAgICAgICAgICAgICBcIkNvbHVtbiB0eXBlIGlzIFwiLFxyXG4gICAgICAgICAgICAgICAgcHJvcHMuRmllbGQudHlwZSxcclxuICAgICAgICAgICAgICAgIFwiLlwiKSxcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ3JvdycgfSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdjb2wtNCcgfSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIsIHsgY2xhc3NOYW1lOiAnZm9ybS1jb250cm9sJywgdmFsdWU6IHByb3BzLkZpbHRlci5PcGVyYXRvciwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIoZnVuY3Rpb24gKHByZXZTdGF0ZSkgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcmV2U3RhdGUpLCB7IE9wZXJhdG9yOiB2YWx1ZSB9KSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogJz0nIH0sIFwiPVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiAnPD4nIH0sIFwiIT1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogJz4nIH0sIFwiPlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiAnPj0nIH0sIFwiPj1cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIiwgeyB2YWx1ZTogJzwnIH0sIFwiPFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiAnPj0nIH0sIFwiPj1cIikpKSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6ICdjb2wnIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgdHlwZTogJ251bWJlcicsIGNsYXNzTmFtZTogJ2Zvcm0tY29udHJvbCcsIHZhbHVlOiBwcm9wcy5GaWx0ZXIuU2VhcmNoVGV4dCwgb25DaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGV2dC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIoZnVuY3Rpb24gKHByZXZTdGF0ZSkgeyByZXR1cm4gKF9fYXNzaWduKF9fYXNzaWduKHt9LCBwcmV2U3RhdGUpLCB7IFNlYXJjaFRleHQ6IHZhbHVlIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSkpKSkpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocHJvcHMuRmllbGQudHlwZSA9PT0gXCJkYXRldGltZVwiKSB7XHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCxcclxuICAgICAgICAgICAgICAgIFwiQ29sdW1uIHR5cGUgaXMgXCIsXHJcbiAgICAgICAgICAgICAgICBwcm9wcy5GaWVsZC50eXBlLFxyXG4gICAgICAgICAgICAgICAgXCIuXCIpLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiAncm93JyB9LFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2NvbC00JyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwgeyBjbGFzc05hbWU6ICdmb3JtLWNvbnRyb2wnLCB2YWx1ZTogcHJvcHMuRmlsdGVyLk9wZXJhdG9yLCBvbkNoYW5nZTogZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlNldHRlcihmdW5jdGlvbiAocHJldlN0YXRlKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHByZXZTdGF0ZSksIHsgT3BlcmF0b3I6IHZhbHVlIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiAnPScgfSwgXCI9XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsgdmFsdWU6ICc8PicgfSwgXCIhPVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiAnPicgfSwgXCI+XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsgdmFsdWU6ICc+PScgfSwgXCI+PVwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiAnPCcgfSwgXCI8XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIsIHsgdmFsdWU6ICc+PScgfSwgXCI+PVwiKSkpLFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2NvbCcgfSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyB0eXBlOiAnZGF0ZScsIGNsYXNzTmFtZTogJ2Zvcm0tY29udHJvbCcsIHZhbHVlOiBwcm9wcy5GaWx0ZXIuU2VhcmNoVGV4dC5zcGxpdCgnICcpWzBdLCBvbkNoYW5nZTogZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzLlNldHRlcihmdW5jdGlvbiAocHJldlN0YXRlKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHByZXZTdGF0ZSksIHsgU2VhcmNoVGV4dDogKHZhbHVlICsgJyAnICsgKHByZXZTdGF0ZS5TZWFyY2hUZXh0LnNwbGl0KCcgJykubGVuZ3RoID4gMSA/IHByZXZTdGF0ZS5TZWFyY2hUZXh0LnNwbGl0KCcgJylbMV0gOiAnMDowMCcpKSB9KSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IHR5cGU6ICd0aW1lJywgY2xhc3NOYW1lOiAnZm9ybS1jb250cm9sJywgdmFsdWU6IHByb3BzLkZpbHRlci5TZWFyY2hUZXh0LnNwbGl0KCcgJykubGVuZ3RoID4gMSA/IHByb3BzLkZpbHRlci5TZWFyY2hUZXh0LnNwbGl0KCcgJylbMV0gOiAnMDowMCcsIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKGZ1bmN0aW9uIChwcmV2U3RhdGUpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJldlN0YXRlKSwgeyBTZWFyY2hUZXh0OiAocHJldlN0YXRlLlNlYXJjaFRleHQuc3BsaXQoJyAnKVswXSArICcgJyArIHZhbHVlKSB9KSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IH0pKSkpKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHByb3BzLkZpZWxkLnR5cGUgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQocmVhY3RfZm9ybXNfMS5DaGVja0JveCwgeyBSZWNvcmQ6IHByb3BzLkZpbHRlciwgRmllbGQ6ICdTZWFyY2hUZXh0JywgU2V0dGVyOiBmdW5jdGlvbiAoZmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIoZnVuY3Rpb24gKHByZXZGaWx0ZXIpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJldkZpbHRlciksIHsgT3BlcmF0b3I6ICc9JywgU2VhcmNoVGV4dDogZmlsdGVyLlNlYXJjaFRleHQudG9TdHJpbmcoKSA9PT0gJ3RydWUnID8gJzEnIDogJzAnIH0pKTsgfSk7XHJcbiAgICAgICAgICAgIH0sIExhYmVsOiBcIkNvbHVtbiB0eXBlIGlzIGJvb2xlYW4uIFllcy9PbiBpcyBjaGVja2VkLlwiIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxyXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJDb2x1bW4gdHlwZSBpcyBlbnVtZXJhYmxlLiBTZWxlY3QgZnJvbSBiZWxvdy5cIiksXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7IHN0eWxlOiB7IGxpc3RTdHlsZTogJ25vbmUnIH0gfSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jaGVja1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgY2xhc3NOYW1lOiBcImZvcm0tY2hlY2staW5wdXRcIiwgc3R5bGU6IHsgekluZGV4OiAxIH0sIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQuY2hlY2tlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKGZ1bmN0aW9uIChwcmV2U2V0dGVyKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHByZXZTZXR0ZXIpLCB7IFNlYXJjaFRleHQ6IFwiKFwiICsgb3B0aW9ucy5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguVmFsdWU7IH0pLmpvaW4oJywnKSArIFwiKVwiIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIoZnVuY3Rpb24gKHByZXZTZXR0ZXIpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJldlNldHRlciksIHsgU2VhcmNoVGV4dDogJycgfSkpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGRlZmF1bHRWYWx1ZTogJ29mZicgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCB7IGNsYXNzTmFtZTogXCJmb3JtLWNoZWNrLWxhYmVsXCIgfSwgXCJTZWxlY3QgQWxsXCIpKSksXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLm1hcChmdW5jdGlvbiAodmxpLCBpbmRleCkgeyByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsga2V5OiBpbmRleCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZm9ybS1jaGVja1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgY2xhc3NOYW1lOiBcImZvcm0tY2hlY2staW5wdXRcIiwgc3R5bGU6IHsgekluZGV4OiAxIH0sIG9uQ2hhbmdlOiBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2dC50YXJnZXQuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGlzdCA9IHByb3BzLkZpbHRlci5TZWFyY2hUZXh0LnJlcGxhY2UoJygnLCAnJykucmVwbGFjZSgnKScsICcnKS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ID0gbGlzdC5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggIT09IFwiXCI7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2godmxpLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRleHRfMSA9IFwiKFwiICsgbGlzdC5qb2luKCcsJykgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMuU2V0dGVyKGZ1bmN0aW9uIChwcmV2U2V0dGVyKSB7IHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIHByZXZTZXR0ZXIpLCB7IFNlYXJjaFRleHQ6IHRleHRfMSB9KSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpc3QgPSBwcm9wcy5GaWx0ZXIuU2VhcmNoVGV4dC5yZXBsYWNlKCcoJywgJycpLnJlcGxhY2UoJyknLCAnJykuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA9IGxpc3QuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICE9PSBcIlwiOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdCA9IGxpc3QuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICE9PSB2bGkuVmFsdWU7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dF8yID0gXCIoXCIgKyBsaXN0LmpvaW4oJywnKSArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wcy5TZXR0ZXIoZnVuY3Rpb24gKHByZXZTZXR0ZXIpIHsgcmV0dXJuIChfX2Fzc2lnbihfX2Fzc2lnbih7fSwgcHJldlNldHRlciksIHsgU2VhcmNoVGV4dDogdGV4dF8yIH0pKTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdmFsdWU6IHByb3BzLkZpbHRlci5TZWFyY2hUZXh0LmluZGV4T2YodmxpLlZhbHVlKSA+PSAwID8gJ29uJyA6ICdvZmYnLCBjaGVja2VkOiBwcm9wcy5GaWx0ZXIuU2VhcmNoVGV4dC5pbmRleE9mKHZsaS5WYWx1ZSkgPj0gMCA/IHRydWUgOiBmYWxzZSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHsgY2xhc3NOYW1lOiBcImZvcm0tY2hlY2stbGFiZWxcIiB9LCB2bGkuTGFiZWwpKSk7IH0pKSkpO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gIFRvb2xUaXAudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDAxLzE0LzIwMjEgLSBDaHJpc3RvcGggTGFja25lclxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbnZhciBfX21ha2VUZW1wbGF0ZU9iamVjdCA9ICh0aGlzICYmIHRoaXMuX19tYWtlVGVtcGxhdGVPYmplY3QpIHx8IGZ1bmN0aW9uIChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xyXG52YXIgc3R5bGVkX2NvbXBvbmVudHNfMSA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTtcclxudmFyIGhlbHBlcl9mdW5jdGlvbnNfMSA9IHJlcXVpcmUoXCJAZ3BhLWdlbXN0b25lL2hlbHBlci1mdW5jdGlvbnNcIik7XHJcbnZhciBXcmFwcGVyRGl2ID0gc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0LmRpdih0ZW1wbGF0ZU9iamVjdF8xIHx8ICh0ZW1wbGF0ZU9iamVjdF8xID0gX19tYWtlVGVtcGxhdGVPYmplY3QoW1wiXFxuICAmIHtcXG4gICAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgcGFkZGluZzogOHB4IDIxcHg7XFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlLW91dDtcXG4gICAgei1pbmRleDogXCIsIFwiO1xcbiAgICBvcGFjaXR5OiBcIiwgXCI7XFxuICAgIGNvbG9yOiBcIiwgXCI7XFxuICAgIGJhY2tncm91bmQ6IFwiLCBcIjtcXG4gICAgdG9wOiBcIiwgXCI7XFxuICAgIGxlZnQ6IFwiLCBcIjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICB9XFxuICBcIiwgXCJcXG4gIFwiLCBcIlxcbiAgXCIsIFwiXFxuICBcIiwgXCJcIl0sIFtcIlxcbiAgJiB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIHBhZGRpbmc6IDhweCAyMXB4O1xcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZS1vdXQ7XFxuICAgIHotaW5kZXg6IFwiLCBcIjtcXG4gICAgb3BhY2l0eTogXCIsIFwiO1xcbiAgICBjb2xvcjogXCIsIFwiO1xcbiAgICBiYWNrZ3JvdW5kOiBcIiwgXCI7XFxuICAgIHRvcDogXCIsIFwiO1xcbiAgICBsZWZ0OiBcIiwgXCI7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgfVxcbiAgXCIsXHJcbiAgICBcIlxcbiAgXCIsXHJcbiAgICBcIlxcbiAgXCIsXHJcbiAgICBcIlxcbiAgXCIsXHJcbiAgICBcIlwiXHJcbiAgICAvLyBUaGUgb3RoZXIgZWxlbWVudCBuZWVkcyB0byBiZSBsYWJlbGQgYXMgZGF0YS10b29sdGlwIHRoYXQgd2lsbCBvbmx5IGJlIHVzZWQgZm9yIHBvc2l0aW9uaW5nXHJcbl0pKSwgZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBwcm9wcy5aaW5kZXg7IH0sIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gcHJvcHMuU2hvdyA/IFwiMC45XCIgOiBcIjBcIjsgfSwgZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiAocHJvcHMuVGhlbWUgPT09ICdkYXJrJyA/IFwiI2ZmZlwiIDogJyMyMjInKTsgfSwgZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiAocHJvcHMuVGhlbWUgPT09ICdkYXJrJyA/IFwiIzIyMlwiIDogJyNmZmYnKTsgfSwgZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBwcm9wcy5Ub3AgKyBcInB4XCI7IH0sIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gcHJvcHMuTGVmdCArIFwicHhcIjsgfSwgZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiAocHJvcHMuTG9jYXRpb24gPT09ICd0b3AnID8gXCJcXG4gICAgJjo6YWZ0ZXIge1xcbiAgICAgYm9yZGVyLWxlZnQ6IDhweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgIGJvcmRlci1yaWdodDogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgYm9yZGVyLXRvcDogOHB4IHNvbGlkIFwiICsgKHByb3BzLlRoZW1lID09PSAnZGFyaycgPyBcIiMyMjJcIiA6ICcjZmZmJykgKyBcIjtcXG4gICAgIGxlZnQ6IDUwJTtcXG4gICAgIGJvdHRvbTogLTZweDtcXG4gICAgIG1hcmdpbi1sZWZ0OiAtOHB4O1xcbiAgICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgICB3aWR0aDogMHB4O1xcbiAgICAgaGVpZ2h0OiAwcHg7XFxuICAgICBwb3NpdGlvbjogYWJzb2x1dGVcXG4gICAgfVxcbiAgXCIgOiAnJyk7IH0sIGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gKHByb3BzLkxvY2F0aW9uID09PSAnYm90dG9tJyA/IFwiXFxuICAgICY6OmJlZm9yZSB7XFxuICAgICBib3JkZXItbGVmdDogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgYm9yZGVyLXJpZ2h0OiA4cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICBib3JkZXItYm90dG9tOiA4cHggc29saWQgXCIgKyAocHJvcHMuVGhlbWUgPT09ICdkYXJrJyA/IFwiIzIyMlwiIDogJyNmZmYnKSArIFwiO1xcbiAgICAgbGVmdDogNTAlO1xcbiAgICAgdG9wOiAtNnB4O1xcbiAgICAgbWFyZ2luLWxlZnQ6IC04cHg7XFxuICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgIHdpZHRoOiAwcHg7XFxuICAgICBoZWlnaHQ6IDBweDtcXG4gICAgIHBvc2l0aW9uOiBhYnNvbHV0ZVxcbiAgICB9XFxuICBcIiA6ICcnKTsgfSwgZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiAocHJvcHMuTG9jYXRpb24gPT09ICdsZWZ0JyA/IFwiXFxuICAgICY6OmJlZm9yZSB7XFxuICAgICBib3JkZXItdG9wOiA4cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICBib3JkZXItYm90dG9tOiA4cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICBib3JkZXItbGVmdDogOHB4IHNvbGlkIFwiICsgKHByb3BzLlRoZW1lID09PSAnZGFyaycgPyBcIiMyMjJcIiA6ICcjZmZmJykgKyBcIjtcXG4gICAgIHRvcDogNTAlO1xcbiAgICAgbGVmdDogMTAwJTtcXG4gICAgIG1hcmdpbi10b3A6IC04cHg7XFxuICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgIHdpZHRoOiAwcHg7XFxuICAgICBoZWlnaHQ6IDBweDtcXG4gICAgIHBvc2l0aW9uOiBhYnNvbHV0ZVxcbiAgICB9XFxuICBcIiA6ICcnKTsgfSwgZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiAocHJvcHMuTG9jYXRpb24gPT09ICdyaWdodCcgPyBcIlxcbiAgICAmOjpiZWZvcmUge1xcbiAgICAgYm9yZGVyLXRvcDogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgYm9yZGVyLWJvdHRvbTogOHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgYm9yZGVyLXJpZ2h0OiA4cHggc29saWQgXCIgKyAocHJvcHMuVGhlbWUgPT09ICdkYXJrJyA/IFwiIzIyMlwiIDogJyNmZmYnKSArIFwiO1xcbiAgICAgdG9wOiA1MCU7XFxuICAgICBsZWZ0OiAtNnB4O1xcbiAgICAgbWFyZ2luLXRvcDogLThweDtcXG4gICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgd2lkdGg6IDBweDtcXG4gICAgIGhlaWdodDogMHB4O1xcbiAgICAgcG9zaXRpb246IGFic29sdXRlXFxuICAgIH1cXG4gIFwiIDogJycpOyB9KTtcclxuLy8gVGhlIG90aGVyIGVsZW1lbnQgbmVlZHMgdG8gYmUgbGFiZWxkIGFzIGRhdGEtdG9vbHRpcCB0aGF0IHdpbGwgb25seSBiZSB1c2VkIGZvciBwb3NpdGlvbmluZ1xyXG52YXIgVG9vbFRpcCA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG4gICAgdmFyIF9hID0gUmVhY3QudXNlU3RhdGUoMCksIHRvcCA9IF9hWzBdLCBzZXRUb3AgPSBfYVsxXTtcclxuICAgIHZhciBfYiA9IFJlYWN0LnVzZVN0YXRlKDApLCBsZWZ0ID0gX2JbMF0sIHNldExlZnQgPSBfYlsxXTtcclxuICAgIHZhciBfYyA9IFJlYWN0LnVzZVN0YXRlKFwiXCIpLCBndWlkID0gX2NbMF0sIHNldEd1aWQgPSBfY1sxXTtcclxuICAgIFJlYWN0LnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2V0R3VpZChoZWxwZXJfZnVuY3Rpb25zXzEuQ3JlYXRlR3VpZCgpKTtcclxuICAgIH0sIFtdKTtcclxuICAgIFJlYWN0LnVzZUxheW91dEVmZmVjdChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9hID0gVXBkYXRlUG9zaXRpb24oKSwgdCA9IF9hWzBdLCBsID0gX2FbMV07XHJcbiAgICAgICAgaWYgKHQgIT09IHRvcClcclxuICAgICAgICAgICAgc2V0VG9wKHQpO1xyXG4gICAgICAgIGlmIChsICE9PSBsZWZ0KVxyXG4gICAgICAgICAgICBzZXRMZWZ0KGwpO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgekluZGV4ID0gKHByb3BzLlppbmRleCA9PT0gdW5kZWZpbmVkID8gMjAwMCA6IHByb3BzLlppbmRleCk7XHJcbiAgICBmdW5jdGlvbiBVcGRhdGVQb3NpdGlvbigpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXRvb2x0aXBcIiArIChwcm9wcy5UYXJnZXQgPT09IHVuZGVmaW5lZCA/ICcnIDogXCI9XFxcIlwiICsgcHJvcHMuVGFyZ2V0ICsgXCJcXFwiXCIpICsgXCJdXCIpO1xyXG4gICAgICAgIGlmICh0YXJnZXQubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gWy05OTksIC05OTldO1xyXG4gICAgICAgIHZhciB0YXJnZXRMb2NhdGlvbiA9IGhlbHBlcl9mdW5jdGlvbnNfMS5HZXROb2RlU2l6ZSh0YXJnZXRbMF0pO1xyXG4gICAgICAgIHZhciB0b29sVGlwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ3VpZCk7XHJcbiAgICAgICAgaWYgKHRvb2xUaXAgPT09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBbLTk5OSwgLTk5OV07XHJcbiAgICAgICAgdmFyIHRpcExvY2F0aW9uID0gaGVscGVyX2Z1bmN0aW9uc18xLkdldE5vZGVTaXplKHRvb2xUaXApO1xyXG4gICAgICAgIHZhciBvZmZzZXQgPSA1O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbMCwgMF07XHJcbiAgICAgICAgaWYgKHByb3BzLlBvc2l0aW9uID09PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgcmVzdWx0WzBdID0gdGFyZ2V0TG9jYXRpb24udG9wICsgMC41ICogdGFyZ2V0TG9jYXRpb24uaGVpZ2h0IC0gMC41ICogdGlwTG9jYXRpb24uaGVpZ2h0O1xyXG4gICAgICAgICAgICByZXN1bHRbMV0gPSB0YXJnZXRMb2NhdGlvbi5sZWZ0IC0gdGlwTG9jYXRpb24ud2lkdGggLSBvZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHByb3BzLlBvc2l0aW9uID09PSAncmlnaHQnKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFswXSA9IHRhcmdldExvY2F0aW9uLnRvcCArIDAuNSAqIHRhcmdldExvY2F0aW9uLmhlaWdodCAtIDAuNSAqIHRpcExvY2F0aW9uLmhlaWdodDtcclxuICAgICAgICAgICAgcmVzdWx0WzFdID0gdGFyZ2V0TG9jYXRpb24ubGVmdCArIHRhcmdldExvY2F0aW9uLndpZHRoICsgb2Zmc2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwcm9wcy5Qb3NpdGlvbiA9PT0gJ3RvcCcpIHtcclxuICAgICAgICAgICAgcmVzdWx0WzBdID0gdGFyZ2V0TG9jYXRpb24udG9wIC0gdGlwTG9jYXRpb24uaGVpZ2h0IC0gb2Zmc2V0O1xyXG4gICAgICAgICAgICByZXN1bHRbMV0gPSB0YXJnZXRMb2NhdGlvbi5sZWZ0ICsgMC41ICogdGFyZ2V0TG9jYXRpb24ud2lkdGggLSAwLjUgKiB0aXBMb2NhdGlvbi53aWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocHJvcHMuUG9zaXRpb24gPT09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFswXSA9IHRhcmdldExvY2F0aW9uLnRvcCArIHRhcmdldExvY2F0aW9uLmhlaWdodCArIG9mZnNldDtcclxuICAgICAgICAgICAgcmVzdWx0WzFdID0gdGFyZ2V0TG9jYXRpb24ubGVmdCArIDAuNSAqIHRhcmdldExvY2F0aW9uLndpZHRoIC0gMC41ICogdGlwTG9jYXRpb24ud2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICB2YXIgdGhlbWUgPSAocHJvcHMuVGhlbWUgPT09IHVuZGVmaW5lZCA/ICdkYXJrJyA6IHByb3BzLlRoZW1lKTtcclxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChXcmFwcGVyRGl2LCB7IFNob3c6IHByb3BzLlNob3csIFRoZW1lOiB0aGVtZSwgVG9wOiB0b3AsIExlZnQ6IGxlZnQsIGlkOiBndWlkLCBMb2NhdGlvbjogcHJvcHMuUG9zaXRpb24gPT09IHVuZGVmaW5lZCA/ICd0b3AnIDogcHJvcHMuUG9zaXRpb24sIFppbmRleDogekluZGV4IH0sIHByb3BzLmNoaWxkcmVuKSk7XHJcbn07XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFRvb2xUaXA7XHJcbnZhciB0ZW1wbGF0ZU9iamVjdF8xO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICBXYXJuaW5nLnRzeCAtIEdidGNcclxuLy9cclxuLy8gIENvcHlyaWdodCDCqSAyMDIwLCBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UuICBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4vL1xyXG4vLyAgTGljZW5zZWQgdG8gdGhlIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZSAoR1BBKSB1bmRlciBvbmUgb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuIFNlZVxyXG4vLyAgdGhlIE5PVElDRSBmaWxlIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLlxyXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xyXG4vLyAgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXQ6XHJcbi8vXHJcbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxyXG4vL1xyXG4vLyAgVW5sZXNzIGFncmVlZCB0byBpbiB3cml0aW5nLCB0aGUgc3ViamVjdCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxyXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXHJcbi8vICBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucy5cclxuLy9cclxuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XHJcbi8vICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAxMi8yOS8yMDIwIC0gQ2hyaXN0b3BoIExhY2tuZXJcclxuLy8gICAgICAgR2VuZXJhdGVkIG9yaWdpbmFsIHZlcnNpb24gb2Ygc291cmNlIGNvZGUuXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcclxudmFyIE1vZGFsXzEgPSByZXF1aXJlKFwiLi9Nb2RhbFwiKTtcclxuLy8gVXNhZ2U6XHJcbi8vIDxXYXJuaW5nIFRpdGxlPSdUaGlzIGlzIGEgV2FybmluZycgTWVzc2FnZT17J0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBDb250aW51ZT8nfSBDYWxsYmFjaz17KGNhbmNlbGVkKSA9PiBzZXRTaG93KGZhbHNlKX0gU2hvdz17c2hvd30gLz5cclxuLy9cclxuLy8gUHJvcHMgRGVzY3JpcHRpb246XHJcbi8vIFRpdGxlID0+IFRpdGxlIG9mIFRoZSBNb2RhbFxyXG4vLyBDYWxsQmFjayA9PiBGdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiBjbG9zaW5nIHRoZSBNb2RhbCBlaXRoZXIgdGhyb3VnaCBDYW5jZWwgKGNvbmZpcm1lZD1mYWxzZSkgb3IgQ29uZmlybSBCdXR0b24gKGNvbmZpcm1lZD10cnVlKVxyXG4vLyBTaG93ID0+IFdoZXRoZXIgdG8gc2hvdyB0aGUgbW9kYWxcclxuLy8gTWVzc2FnZSA9PiBUaGUgbWVzc2FnZSBzaG93biBieSB0aGUgTW9kYWxcclxudmFyIFdhcm5pbmcgPSBmdW5jdGlvbiAocHJvcHMpIHtcclxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChNb2RhbF8xLmRlZmF1bHQsIHsgVGl0bGU6IHByb3BzLlRpdGxlLCBTaG93OiBwcm9wcy5TaG93LCBDYW5jZWxCdG5DbGFzczogJ2J0bi1kYW5nZXInLCBDYW5jZWxUZXh0OiAnQ2FuY2VsJywgQ29uZmlybUJ0bkNsYXNzOiAnYnRuLXN1Y2Nlc3MnLCBDb25maXJtVGV4dDogJ0NvbmZpcm0nLCBTaG93WDogZmFsc2UsIFNob3dDYW5jZWw6IHRydWUsIFNpemU6ICdzbScsIENhbGxCYWNrOiBmdW5jdGlvbiAoY29uZmlybWVkKSB7IHJldHVybiBwcm9wcy5DYWxsQmFjayhjb25maXJtZWQpOyB9IH0sXHJcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgcHJvcHMuTWVzc2FnZSkpKTtcclxufTtcclxuZXhwb3J0cy5kZWZhdWx0ID0gV2FybmluZztcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAgaW5kZXgudHN4IC0gR2J0Y1xyXG4vL1xyXG4vLyAgQ29weXJpZ2h0IMKpIDIwMjAsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbi8vXHJcbi8vICBMaWNlbnNlZCB0byB0aGUgR3JpZCBQcm90ZWN0aW9uIEFsbGlhbmNlIChHUEEpIHVuZGVyIG9uZSBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gU2VlXHJcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXHJcbi8vICBUaGUgR1BBIGxpY2Vuc2VzIHRoaXMgZmlsZSB0byB5b3UgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCB0aGUgXCJMaWNlbnNlXCI7IHlvdSBtYXkgbm90IHVzZSB0aGlzXHJcbi8vICBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdDpcclxuLy9cclxuLy8gICAgICBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXHJcbi8vXHJcbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXHJcbi8vICBcIkFTLUlTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBSZWZlciB0byB0aGVcclxuLy8gIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zLlxyXG4vL1xyXG4vLyAgQ29kZSBNb2RpZmljYXRpb24gSGlzdG9yeTpcclxuLy8gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gIDEyLzI5LzIwMjAgLSBDLiBMYWNrbmVyIEVybmVzdFxyXG4vLyAgICAgICBHZW5lcmF0ZWQgb3JpZ2luYWwgdmVyc2lvbiBvZiBzb3VyY2UgY29kZS5cclxuLy9cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Ub29sVGlwID0gZXhwb3J0cy5Mb2FkaW5nSWNvbiA9IGV4cG9ydHMuTG9hZGluZ1NjcmVlbiA9IGV4cG9ydHMuU2VhcmNoQmFyID0gZXhwb3J0cy5XYXJuaW5nID0gZXhwb3J0cy5Nb2RhbCA9IHZvaWQgMDtcclxudmFyIE1vZGFsXzEgPSByZXF1aXJlKFwiLi9Nb2RhbFwiKTtcclxuZXhwb3J0cy5Nb2RhbCA9IE1vZGFsXzEuZGVmYXVsdDtcclxudmFyIFdhcm5pbmdfMSA9IHJlcXVpcmUoXCIuL1dhcm5pbmdcIik7XHJcbmV4cG9ydHMuV2FybmluZyA9IFdhcm5pbmdfMS5kZWZhdWx0O1xyXG52YXIgU2VhcmNoQmFyXzEgPSByZXF1aXJlKFwiLi9TZWFyY2hCYXJcIik7XHJcbmV4cG9ydHMuU2VhcmNoQmFyID0gU2VhcmNoQmFyXzEuZGVmYXVsdDtcclxudmFyIExvYWRpbmdTY3JlZW5fMSA9IHJlcXVpcmUoXCIuL0xvYWRpbmdTY3JlZW5cIik7XHJcbmV4cG9ydHMuTG9hZGluZ1NjcmVlbiA9IExvYWRpbmdTY3JlZW5fMS5kZWZhdWx0O1xyXG52YXIgTG9hZGluZ0ljb25fMSA9IHJlcXVpcmUoXCIuL0xvYWRpbmdJY29uXCIpO1xyXG5leHBvcnRzLkxvYWRpbmdJY29uID0gTG9hZGluZ0ljb25fMS5kZWZhdWx0O1xyXG52YXIgVG9vbFRpcF8xID0gcmVxdWlyZShcIi4vVG9vbFRpcFwiKTtcclxuZXhwb3J0cy5Ub29sVGlwID0gVG9vbFRpcF8xLmRlZmF1bHQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gIFRhYmxlLnRzeCAtIEdidGNcbi8vXG4vLyAgQ29weXJpZ2h0IMKpIDIwMTgsIEdyaWQgUHJvdGVjdGlvbiBBbGxpYW5jZS4gIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vL1xuLy8gIExpY2Vuc2VkIHRvIHRoZSBHcmlkIFByb3RlY3Rpb24gQWxsaWFuY2UgKEdQQSkgdW5kZXIgb25lIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiBTZWVcbi8vICB0aGUgTk9USUNFIGZpbGUgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuXG4vLyAgVGhlIEdQQSBsaWNlbnNlcyB0aGlzIGZpbGUgdG8geW91IHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgdGhlIFwiTGljZW5zZVwiOyB5b3UgbWF5IG5vdCB1c2UgdGhpc1xuLy8gIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0OlxuLy9cbi8vICAgICAgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLy9cbi8vICBVbmxlc3MgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHRoZSBzdWJqZWN0IHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4vLyAgXCJBUy1JU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gUmVmZXIgdG8gdGhlXG4vLyAgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMuXG4vL1xuLy8gIENvZGUgTW9kaWZpY2F0aW9uIEhpc3Rvcnk6XG4vLyAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gIDA4LzAyLzIwMTggLSBCaWxseSBFcm5lc3Rcbi8vICAgICAgIEdlbmVyYXRlZCBvcmlnaW5hbCB2ZXJzaW9uIG9mIHNvdXJjZSBjb2RlLlxuLy9cbi8vICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciBBbmdsZUljb24gPSBmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7IHdpZHRoOiAxMCwgaGVpZ2h0OiAxMCwgbWFyZ2luOiAzIH0sIGNsYXNzTmFtZTogJ2ZhIGZhLWFuZ2xlLScgKyAocHJvcHMuYXNjZW5kaW5nID8gJ3VwJyA6ICdkb3duJykgfSkpOyB9O1xudmFyIFRhYmxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUYWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWJsZShwcm9wcykge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgcHJvcHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIFRhYmxlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByb3dDb21wb25lbnRzID0gdGhpcy5nZW5lcmF0ZVJvd3MoKTtcbiAgICAgICAgdmFyIGhlYWRlckNvbXBvbmVudHMgPSB0aGlzLmdlbmVyYXRlSGVhZGVycygpO1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiLCB7IGNsYXNzTmFtZTogdGhpcy5wcm9wcy50YWJsZUNsYXNzICE9PSB1bmRlZmluZWQgPyB0aGlzLnByb3BzLnRhYmxlQ2xhc3MgOiAnJywgc3R5bGU6IHRoaXMucHJvcHMudGFibGVTdHlsZSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRoZWFkXCIsIHsgc3R5bGU6IHRoaXMucHJvcHMudGhlYWRTdHlsZSB9LCBoZWFkZXJDb21wb25lbnRzKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiLCB7IHN0eWxlOiB0aGlzLnByb3BzLnRib2R5U3R5bGUgfSwgcm93Q29tcG9uZW50cykpKTtcbiAgICB9O1xuICAgIFRhYmxlLnByb3RvdHlwZS5nZW5lcmF0ZUhlYWRlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNvbHMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBjZWxscyA9IHRoaXMucHJvcHMuY29scy5tYXAoZnVuY3Rpb24gKGNvbERhdGEsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgc3R5bGU7XG4gICAgICAgICAgICBpZiAoY29sRGF0YS5oZWFkZXJTdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSBjb2xEYXRhLmhlYWRlclN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHN0eWxlID0ge307XG4gICAgICAgICAgICBpZiAoc3R5bGUuY3Vyc29yID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidGhcIiwgeyBrZXk6IGluZGV4LCBzdHlsZTogc3R5bGUsIG9uQ2xpY2s6IGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5oYW5kbGVTb3J0KHsgY29sOiBjb2xEYXRhLmtleSwgYXNjZW5kaW5nOiBfdGhpcy5wcm9wcy5hc2NlbmRpbmcgfSwgZSk7IH0gfSxcbiAgICAgICAgICAgICAgICBjb2xEYXRhLmxhYmVsLFxuICAgICAgICAgICAgICAgIF90aGlzLnByb3BzLnNvcnRGaWVsZCA9PT0gY29sRGF0YS5rZXkgPyBSZWFjdC5jcmVhdGVFbGVtZW50KEFuZ2xlSWNvbiwgeyBhc2NlbmRpbmc6IF90aGlzLnByb3BzLmFzY2VuZGluZyB9KSA6IG51bGwpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgbnVsbCwgY2VsbHMpO1xuICAgIH07XG4gICAgVGFibGUucHJvdG90eXBlLmdlbmVyYXRlUm93cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGF0YS5sZW5ndGggPT09IDApXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGF0YS5tYXAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgY2VsbHMgPSBfdGhpcy5wcm9wcy5jb2xzLm1hcChmdW5jdGlvbiAoY29sRGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBjc3M7XG4gICAgICAgICAgICAgICAgaWYgKGNvbERhdGEucm93U3R5bGUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgY3NzID0ge307XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjc3MgPSBfX2Fzc2lnbih7fSwgY29sRGF0YS5yb3dTdHlsZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidGRcIiwgeyBrZXk6IGluZGV4LnRvU3RyaW5nKCkgKyBpdGVtW2NvbERhdGEua2V5XSArIGNvbERhdGEua2V5LCBzdHlsZTogY3NzLCBvbkNsaWNrOiBfdGhpcy5oYW5kbGVDbGljay5iaW5kKF90aGlzLCB7IGNvbDogY29sRGF0YS5rZXksIHJvdzogaXRlbSwgZGF0YTogaXRlbVtjb2xEYXRhLmtleV0gfSkgfSwgY29sRGF0YS5jb250ZW50ICE9PSB1bmRlZmluZWQgPyBjb2xEYXRhLmNvbnRlbnQoaXRlbSwgY29sRGF0YS5rZXksIGNzcykgOiBpdGVtW2NvbERhdGEua2V5XSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgc3R5bGU7XG4gICAgICAgICAgICBpZiAoX3RoaXMucHJvcHMucm93U3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN0eWxlID0gX19hc3NpZ24oe30sIF90aGlzLnByb3BzLnJvd1N0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHt9O1xuICAgICAgICAgICAgaWYgKHN0eWxlLmN1cnNvciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgIGlmIChfdGhpcy5wcm9wcy5zZWxlY3RlZCAhPT0gdW5kZWZpbmVkICYmIF90aGlzLnByb3BzLnNlbGVjdGVkKGl0ZW0pKVxuICAgICAgICAgICAgICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwidHJcIiwgeyBzdHlsZTogc3R5bGUsIGtleTogaW5kZXgudG9TdHJpbmcoKSB9LCBjZWxscykpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFRhYmxlLnByb3RvdHlwZS5oYW5kbGVDbGljayA9IGZ1bmN0aW9uIChkYXRhLCBldmVudCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZGF0YSwgZXZlbnQpO1xuICAgIH07XG4gICAgVGFibGUucHJvdG90eXBlLmhhbmRsZVNvcnQgPSBmdW5jdGlvbiAoZGF0YSwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNvcnQoZGF0YSk7XG4gICAgfTtcbiAgICByZXR1cm4gVGFibGU7XG59KFJlYWN0LkNvbXBvbmVudCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gVGFibGU7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLy9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGFsbG93RXF1YWwob2JqQSwgb2JqQiwgY29tcGFyZSwgY29tcGFyZUNvbnRleHQpIHtcbiAgdmFyIHJldCA9IGNvbXBhcmUgPyBjb21wYXJlLmNhbGwoY29tcGFyZUNvbnRleHQsIG9iakEsIG9iakIpIDogdm9pZCAwO1xuXG4gIGlmIChyZXQgIT09IHZvaWQgMCkge1xuICAgIHJldHVybiAhIXJldDtcbiAgfVxuXG4gIGlmIChvYmpBID09PSBvYmpCKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iakEgIT09IFwib2JqZWN0XCIgfHwgIW9iakEgfHwgdHlwZW9mIG9iakIgIT09IFwib2JqZWN0XCIgfHwgIW9iakIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMob2JqQik7XG5cbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGJIYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuYmluZChvYmpCKTtcblxuICAvLyBUZXN0IGZvciBBJ3Mga2V5cyBkaWZmZXJlbnQgZnJvbSBCLlxuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBrZXlzQS5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNBW2lkeF07XG5cbiAgICBpZiAoIWJIYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlQSA9IG9iakFba2V5XTtcbiAgICB2YXIgdmFsdWVCID0gb2JqQltrZXldO1xuXG4gICAgcmV0ID0gY29tcGFyZSA/IGNvbXBhcmUuY2FsbChjb21wYXJlQ29udGV4dCwgdmFsdWVBLCB2YWx1ZUIsIGtleSkgOiB2b2lkIDA7XG5cbiAgICBpZiAocmV0ID09PSBmYWxzZSB8fCAocmV0ID09PSB2b2lkIDAgJiYgdmFsdWVBICE9PSB2YWx1ZUIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuIiwiLy8gQGZsb3dcblxuZGVjbGFyZSB2YXIgU0NfRElTQUJMRV9TUEVFRFk6ID9ib29sZWFuO1xuZGVjbGFyZSB2YXIgX19WRVJTSU9OX186IHN0cmluZztcblxuZXhwb3J0IGNvbnN0IFNDX0FUVFI6IHN0cmluZyA9XG4gICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgKHByb2Nlc3MuZW52LlJFQUNUX0FQUF9TQ19BVFRSIHx8IHByb2Nlc3MuZW52LlNDX0FUVFIpKSB8fFxuICAnZGF0YS1zdHlsZWQnO1xuXG5leHBvcnQgY29uc3QgU0NfQVRUUl9BQ1RJVkUgPSAnYWN0aXZlJztcbmV4cG9ydCBjb25zdCBTQ19BVFRSX1ZFUlNJT04gPSAnZGF0YS1zdHlsZWQtdmVyc2lvbic7XG5leHBvcnQgY29uc3QgU0NfVkVSU0lPTiA9IF9fVkVSU0lPTl9fO1xuZXhwb3J0IGNvbnN0IFNQTElUVEVSID0gJy8qIXNjKi9cXG4nO1xuXG5leHBvcnQgY29uc3QgSVNfQlJPV1NFUiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICdIVE1MRWxlbWVudCcgaW4gd2luZG93O1xuXG5leHBvcnQgY29uc3QgRElTQUJMRV9TUEVFRFkgPVxuICBCb29sZWFuKHR5cGVvZiBTQ19ESVNBQkxFX1NQRUVEWSA9PT0gJ2Jvb2xlYW4nXG4gICAgPyBTQ19ESVNBQkxFX1NQRUVEWVxuICAgIDogKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX1NDX0RJU0FCTEVfU1BFRURZICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudi5SRUFDVF9BUFBfU0NfRElTQUJMRV9TUEVFRFkgIT09ICcnXG4gICAgICA/IHByb2Nlc3MuZW52LlJFQUNUX0FQUF9TQ19ESVNBQkxFX1NQRUVEWSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX1NDX0RJU0FCTEVfU1BFRURZXG4gICAgICA6ICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MuZW52LlNDX0RJU0FCTEVfU1BFRURZICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudi5TQ19ESVNBQkxFX1NQRUVEWSAhPT0gJydcbiAgICAgICAgPyBwcm9jZXNzLmVudi5TQ19ESVNBQkxFX1NQRUVEWSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogcHJvY2Vzcy5lbnYuU0NfRElTQUJMRV9TUEVFRFlcbiAgICAgICAgOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nXG4gICAgICApXG4gICAgKSk7XG5cbi8vIFNoYXJlZCBlbXB0eSBleGVjdXRpb24gY29udGV4dCB3aGVuIGdlbmVyYXRpbmcgc3RhdGljIHN0eWxlc1xuZXhwb3J0IGNvbnN0IFNUQVRJQ19FWEVDVVRJT05fQ09OVEVYVCA9IHt9O1xuIiwiLy8gQGZsb3dcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG5cbmltcG9ydCB7IG1ha2VTdHlsZVRhZywgZ2V0U2hlZXQgfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgdHlwZSB7IFNoZWV0T3B0aW9ucywgVGFnIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKiBDcmVhdGUgYSBDU1NTdHlsZVNoZWV0LWxpa2UgdGFnIGRlcGVuZGluZyBvbiB0aGUgZW52aXJvbm1lbnQgKi9cbmV4cG9ydCBjb25zdCBtYWtlVGFnID0gKHsgaXNTZXJ2ZXIsIHVzZUNTU09NSW5qZWN0aW9uLCB0YXJnZXQgfTogU2hlZXRPcHRpb25zKTogVGFnID0+IHtcbiAgaWYgKGlzU2VydmVyKSB7XG4gICAgcmV0dXJuIG5ldyBWaXJ0dWFsVGFnKHRhcmdldCk7XG4gIH0gZWxzZSBpZiAodXNlQ1NTT01JbmplY3Rpb24pIHtcbiAgICByZXR1cm4gbmV3IENTU09NVGFnKHRhcmdldCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBUZXh0VGFnKHRhcmdldCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBDU1NPTVRhZyBpbXBsZW1lbnRzIFRhZyB7XG4gIGVsZW1lbnQ6IEhUTUxTdHlsZUVsZW1lbnQ7XG5cbiAgc2hlZXQ6IENTU1N0eWxlU2hlZXQ7XG5cbiAgbGVuZ3RoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IodGFyZ2V0PzogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gKHRoaXMuZWxlbWVudCA9IG1ha2VTdHlsZVRhZyh0YXJnZXQpKTtcblxuICAgIC8vIEF2b2lkIEVkZ2UgYnVnIHdoZXJlIGVtcHR5IHN0eWxlIGVsZW1lbnRzIGRvbid0IGNyZWF0ZSBzaGVldHNcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSk7XG5cbiAgICB0aGlzLnNoZWV0ID0gZ2V0U2hlZXQoZWxlbWVudCk7XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuICB9XG5cbiAgaW5zZXJ0UnVsZShpbmRleDogbnVtYmVyLCBydWxlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5zaGVldC5pbnNlcnRSdWxlKHJ1bGUsIGluZGV4KTtcbiAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZWxldGVSdWxlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNoZWV0LmRlbGV0ZVJ1bGUoaW5kZXgpO1xuICAgIHRoaXMubGVuZ3RoLS07XG4gIH1cblxuICBnZXRSdWxlKGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IHJ1bGUgPSB0aGlzLnNoZWV0LmNzc1J1bGVzW2luZGV4XTtcbiAgICAvLyBBdm9pZCBJRTExIHF1aXJrIHdoZXJlIGNzc1RleHQgaXMgaW5hY2Nlc3NpYmxlIG9uIHNvbWUgaW52YWxpZCBydWxlc1xuICAgIGlmIChydWxlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHJ1bGUuY3NzVGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBydWxlLmNzc1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cbn1cblxuLyoqIEEgVGFnIHRoYXQgZW11bGF0ZXMgdGhlIENTU1N0eWxlU2hlZXQgQVBJIGJ1dCB1c2VzIHRleHQgbm9kZXMgKi9cbmV4cG9ydCBjbGFzcyBUZXh0VGFnIGltcGxlbWVudHMgVGFnIHtcbiAgZWxlbWVudDogSFRNTFN0eWxlRWxlbWVudDtcblxuICBub2RlczogTm9kZUxpc3Q8Tm9kZT47XG5cbiAgbGVuZ3RoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IodGFyZ2V0PzogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gKHRoaXMuZWxlbWVudCA9IG1ha2VTdHlsZVRhZyh0YXJnZXQpKTtcbiAgICB0aGlzLm5vZGVzID0gZWxlbWVudC5jaGlsZE5vZGVzO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgfVxuXG4gIGluc2VydFJ1bGUoaW5kZXg6IG51bWJlciwgcnVsZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKGluZGV4IDw9IHRoaXMubGVuZ3RoICYmIGluZGV4ID49IDApIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShydWxlKTtcbiAgICAgIGNvbnN0IHJlZk5vZGUgPSB0aGlzLm5vZGVzW2luZGV4XTtcbiAgICAgIHRoaXMuZWxlbWVudC5pbnNlcnRCZWZvcmUobm9kZSwgcmVmTm9kZSB8fCBudWxsKTtcbiAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZVJ1bGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLm5vZGVzW2luZGV4XSk7XG4gICAgdGhpcy5sZW5ndGgtLTtcbiAgfVxuXG4gIGdldFJ1bGUoaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKGluZGV4IDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzW2luZGV4XS50ZXh0Q29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxufVxuXG4vKiogQSBjb21wbGV0ZWx5IHZpcnR1YWwgKHNlcnZlci1zaWRlKSBUYWcgdGhhdCBkb2Vzbid0IG1hbmlwdWxhdGUgdGhlIERPTSAqL1xuZXhwb3J0IGNsYXNzIFZpcnR1YWxUYWcgaW1wbGVtZW50cyBUYWcge1xuICBydWxlczogc3RyaW5nW107XG5cbiAgbGVuZ3RoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoX3RhcmdldD86IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5ydWxlcyA9IFtdO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgfVxuXG4gIGluc2VydFJ1bGUoaW5kZXg6IG51bWJlciwgcnVsZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKGluZGV4IDw9IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJ1bGVzLnNwbGljZShpbmRleCwgMCwgcnVsZSk7XG4gICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZWxldGVSdWxlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnJ1bGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5sZW5ndGgtLTtcbiAgfVxuXG4gIGdldFJ1bGUoaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKGluZGV4IDwgdGhpcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJ1bGVzW2luZGV4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQGZsb3dcbmltcG9ydCB7IERJU0FCTEVfU1BFRURZLCBJU19CUk9XU0VSIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IEVNUFRZX09CSkVDVCB9IGZyb20gJy4uL3V0aWxzL2VtcHRpZXMnO1xuaW1wb3J0IHsgbWFrZUdyb3VwZWRUYWcgfSBmcm9tICcuL0dyb3VwZWRUYWcnO1xuaW1wb3J0IHsgZ2V0R3JvdXBGb3JJZCB9IGZyb20gJy4vR3JvdXBJREFsbG9jYXRvcic7XG5pbXBvcnQgeyBvdXRwdXRTaGVldCwgcmVoeWRyYXRlU2hlZXQgfSBmcm9tICcuL1JlaHlkcmF0aW9uJztcbmltcG9ydCB7IG1ha2VUYWcgfSBmcm9tICcuL1RhZyc7XG5pbXBvcnQgdHlwZSB7IEdyb3VwZWRUYWcsIFNoZWV0LCBTaGVldE9wdGlvbnMgfSBmcm9tICcuL3R5cGVzJztcblxubGV0IFNIT1VMRF9SRUhZRFJBVEUgPSBJU19CUk9XU0VSO1xuXG50eXBlIFNoZWV0Q29uc3RydWN0b3JBcmdzID0ge1xuICBpc1NlcnZlcj86IGJvb2xlYW4sXG4gIHVzZUNTU09NSW5qZWN0aW9uPzogYm9vbGVhbixcbiAgdGFyZ2V0PzogSFRNTEVsZW1lbnQsXG59O1xuXG50eXBlIEdsb2JhbFN0eWxlc0FsbG9jYXRpb25NYXAgPSB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9O1xudHlwZSBOYW1lc0FsbG9jYXRpb25NYXAgPSBNYXA8c3RyaW5nLCBTZXQ8c3RyaW5nPj47XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBTaGVldE9wdGlvbnMgPSB7XG4gIGlzU2VydmVyOiAhSVNfQlJPV1NFUixcbiAgdXNlQ1NTT01JbmplY3Rpb246ICFESVNBQkxFX1NQRUVEWSxcbn07XG5cbi8qKiBDb250YWlucyB0aGUgbWFpbiBzdHlsZXNoZWV0IGxvZ2ljIGZvciBzdHJpbmdpZmljYXRpb24gYW5kIGNhY2hpbmcgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0eWxlU2hlZXQgaW1wbGVtZW50cyBTaGVldCB7XG4gIGdzOiBHbG9iYWxTdHlsZXNBbGxvY2F0aW9uTWFwO1xuXG4gIG5hbWVzOiBOYW1lc0FsbG9jYXRpb25NYXA7XG5cbiAgb3B0aW9uczogU2hlZXRPcHRpb25zO1xuXG4gIHRhZzogdm9pZCB8IEdyb3VwZWRUYWc7XG5cbiAgLyoqIFJlZ2lzdGVyIGEgZ3JvdXAgSUQgdG8gZ2l2ZSBpdCBhbiBpbmRleCAqL1xuICBzdGF0aWMgcmVnaXN0ZXJJZChpZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZ2V0R3JvdXBGb3JJZChpZCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBvcHRpb25zOiBTaGVldENvbnN0cnVjdG9yQXJncyA9IEVNUFRZX09CSkVDVCxcbiAgICBnbG9iYWxTdHlsZXM/OiBHbG9iYWxTdHlsZXNBbGxvY2F0aW9uTWFwID0ge30sXG4gICAgbmFtZXM/OiBOYW1lc0FsbG9jYXRpb25NYXBcbiAgKSB7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgLi4uZGVmYXVsdE9wdGlvbnMsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG5cbiAgICB0aGlzLmdzID0gZ2xvYmFsU3R5bGVzO1xuICAgIHRoaXMubmFtZXMgPSBuZXcgTWFwKG5hbWVzKTtcblxuICAgIC8vIFdlIHJlaHlkcmF0ZSBvbmx5IG9uY2UgYW5kIHVzZSB0aGUgc2hlZXQgdGhhdCBpcyBjcmVhdGVkIGZpcnN0XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuaXNTZXJ2ZXIgJiYgSVNfQlJPV1NFUiAmJiBTSE9VTERfUkVIWURSQVRFKSB7XG4gICAgICBTSE9VTERfUkVIWURSQVRFID0gZmFsc2U7XG4gICAgICByZWh5ZHJhdGVTaGVldCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICByZWNvbnN0cnVjdFdpdGhPcHRpb25zKG9wdGlvbnM6IFNoZWV0Q29uc3RydWN0b3JBcmdzLCB3aXRoTmFtZXM/OiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHJldHVybiBuZXcgU3R5bGVTaGVldChcbiAgICAgIHsgLi4udGhpcy5vcHRpb25zLCAuLi5vcHRpb25zIH0sXG4gICAgICB0aGlzLmdzLFxuICAgICAgKHdpdGhOYW1lcyAmJiB0aGlzLm5hbWVzKSB8fCB1bmRlZmluZWRcbiAgICApO1xuICB9XG5cbiAgYWxsb2NhdGVHU0luc3RhbmNlKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKHRoaXMuZ3NbaWRdID0gKHRoaXMuZ3NbaWRdIHx8IDApICsgMSk7XG4gIH1cblxuICAvKiogTGF6aWx5IGluaXRpYWxpc2VzIGEgR3JvdXBlZFRhZyBmb3Igd2hlbiBpdCdzIGFjdHVhbGx5IG5lZWRlZCAqL1xuICBnZXRUYWcoKTogR3JvdXBlZFRhZyB7XG4gICAgcmV0dXJuIHRoaXMudGFnIHx8ICh0aGlzLnRhZyA9IG1ha2VHcm91cGVkVGFnKG1ha2VUYWcodGhpcy5vcHRpb25zKSkpO1xuICB9XG5cbiAgLyoqIENoZWNrIHdoZXRoZXIgYSBuYW1lIGlzIGtub3duIGZvciBjYWNoaW5nICovXG4gIGhhc05hbWVGb3JJZChpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lcy5oYXMoaWQpICYmICh0aGlzLm5hbWVzLmdldChpZCk6IGFueSkuaGFzKG5hbWUpO1xuICB9XG5cbiAgLyoqIE1hcmsgYSBncm91cCdzIG5hbWUgYXMga25vd24gZm9yIGNhY2hpbmcgKi9cbiAgcmVnaXN0ZXJOYW1lKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIGdldEdyb3VwRm9ySWQoaWQpO1xuXG4gICAgaWYgKCF0aGlzLm5hbWVzLmhhcyhpZCkpIHtcbiAgICAgIGNvbnN0IGdyb3VwTmFtZXMgPSBuZXcgU2V0KCk7XG4gICAgICBncm91cE5hbWVzLmFkZChuYW1lKTtcbiAgICAgIHRoaXMubmFtZXMuc2V0KGlkLCBncm91cE5hbWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgKHRoaXMubmFtZXMuZ2V0KGlkKTogYW55KS5hZGQobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEluc2VydCBuZXcgcnVsZXMgd2hpY2ggYWxzbyBtYXJrcyB0aGUgbmFtZSBhcyBrbm93biAqL1xuICBpbnNlcnRSdWxlcyhpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHJ1bGVzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMucmVnaXN0ZXJOYW1lKGlkLCBuYW1lKTtcbiAgICB0aGlzLmdldFRhZygpLmluc2VydFJ1bGVzKGdldEdyb3VwRm9ySWQoaWQpLCBydWxlcyk7XG4gIH1cblxuICAvKiogQ2xlYXJzIGFsbCBjYWNoZWQgbmFtZXMgZm9yIGEgZ2l2ZW4gZ3JvdXAgSUQgKi9cbiAgY2xlYXJOYW1lcyhpZDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubmFtZXMuaGFzKGlkKSkge1xuICAgICAgKHRoaXMubmFtZXMuZ2V0KGlkKTogYW55KS5jbGVhcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDbGVhcnMgYWxsIHJ1bGVzIGZvciBhIGdpdmVuIGdyb3VwIElEICovXG4gIGNsZWFyUnVsZXMoaWQ6IHN0cmluZykge1xuICAgIHRoaXMuZ2V0VGFnKCkuY2xlYXJHcm91cChnZXRHcm91cEZvcklkKGlkKSk7XG4gICAgdGhpcy5jbGVhck5hbWVzKGlkKTtcbiAgfVxuXG4gIC8qKiBDbGVhcnMgdGhlIGVudGlyZSB0YWcgd2hpY2ggZGVsZXRlcyBhbGwgcnVsZXMgYnV0IG5vdCBpdHMgbmFtZXMgKi9cbiAgY2xlYXJUYWcoKSB7XG4gICAgLy8gTk9URTogVGhpcyBkb2VzIG5vdCBjbGVhciB0aGUgbmFtZXMsIHNpbmNlIGl0J3Mgb25seSB1c2VkIGR1cmluZyBTU1JcbiAgICAvLyBzbyB0aGF0IHdlIGNhbiBjb250aW51b3VzbHkgb3V0cHV0IG9ubHkgbmV3IHJ1bGVzXG4gICAgdGhpcy50YWcgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKiogT3V0cHV0cyB0aGUgY3VycmVudCBzaGVldCBhcyBhIENTUyBzdHJpbmcgd2l0aCBtYXJrZXJzIGZvciBTU1IgKi9cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gb3V0cHV0U2hlZXQodGhpcyk7XG4gIH1cbn1cbiIsIi8vIEBmbG93XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24nO1xuaW1wb3J0IGlzU3R5bGVkQ29tcG9uZW50IGZyb20gJy4vaXNTdHlsZWRDb21wb25lbnQnO1xuaW1wb3J0IHR5cGUgeyBSdWxlU2V0IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1N0YXRpY1J1bGVzKHJ1bGVzOiBSdWxlU2V0KTogYm9vbGVhbiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBydWxlID0gcnVsZXNbaV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihydWxlKSAmJiAhaXNTdHlsZWRDb21wb25lbnQocnVsZSkpIHtcbiAgICAgIC8vIGZ1bmN0aW9ucyBhcmUgYWxsb3dlZCB0byBiZSBzdGF0aWMgaWYgdGhleSdyZSBqdXN0IGJlaW5nXG4gICAgICAvLyB1c2VkIHRvIGdldCB0aGUgY2xhc3NuYW1lIG9mIGEgbmVzdGVkIHN0eWxlZCBjb21wb25lbnRcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbiIsIi8vIEBmbG93XG5pbXBvcnQgU3R5bGVTaGVldCBmcm9tICcuLi9zaGVldCc7XG5pbXBvcnQgeyB0eXBlIFN0cmluZ2lmaWVyIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHRocm93U3R5bGVkRXJyb3IgZnJvbSAnLi4vdXRpbHMvZXJyb3InO1xuaW1wb3J0IHsgbWFzdGVyU3R5bGlzIH0gZnJvbSAnLi9TdHlsZVNoZWV0TWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWZyYW1lcyB7XG4gIGlkOiBzdHJpbmc7XG5cbiAgbmFtZTogc3RyaW5nO1xuXG4gIHJ1bGVzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBydWxlczogc3RyaW5nKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlkID0gYHNjLWtleWZyYW1lcy0ke25hbWV9YDtcbiAgICB0aGlzLnJ1bGVzID0gcnVsZXM7XG4gIH1cblxuICBpbmplY3QgPSAoc3R5bGVTaGVldDogU3R5bGVTaGVldCwgc3R5bGlzSW5zdGFuY2U6IFN0cmluZ2lmaWVyID0gbWFzdGVyU3R5bGlzKSA9PiB7XG4gICAgY29uc3QgcmVzb2x2ZWROYW1lID0gdGhpcy5uYW1lICsgc3R5bGlzSW5zdGFuY2UuaGFzaDtcblxuICAgIGlmICghc3R5bGVTaGVldC5oYXNOYW1lRm9ySWQodGhpcy5pZCwgcmVzb2x2ZWROYW1lKSkge1xuICAgICAgc3R5bGVTaGVldC5pbnNlcnRSdWxlcyhcbiAgICAgICAgdGhpcy5pZCxcbiAgICAgICAgcmVzb2x2ZWROYW1lLFxuICAgICAgICBzdHlsaXNJbnN0YW5jZSh0aGlzLnJ1bGVzLCByZXNvbHZlZE5hbWUsICdAa2V5ZnJhbWVzJylcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHRvU3RyaW5nID0gKCkgPT4ge1xuICAgIHJldHVybiB0aHJvd1N0eWxlZEVycm9yKDEyLCBTdHJpbmcodGhpcy5uYW1lKSk7XG4gIH07XG5cbiAgZ2V0TmFtZShzdHlsaXNJbnN0YW5jZTogU3RyaW5naWZpZXIgPSBtYXN0ZXJTdHlsaXMpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lICsgc3R5bGlzSW5zdGFuY2UuaGFzaDtcbiAgfVxufVxuIiwiLy8gQGZsb3dcbmltcG9ydCB2YWxpZEF0dHIgZnJvbSAnQGVtb3Rpb24vaXMtcHJvcC12YWxpZCc7XG5pbXBvcnQgaG9pc3QgZnJvbSAnaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MnO1xuaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUVsZW1lbnQsIHR5cGUgUmVmLCB1c2VDb250ZXh0LCB1c2VEZWJ1Z1ZhbHVlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU0NfVkVSU0lPTiB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7XG4gIEF0dHJzLFxuICBJU3R5bGVkQ29tcG9uZW50LFxuICBJU3R5bGVkU3RhdGljcyxcbiAgUnVsZVNldCxcbiAgU2hvdWxkRm9yd2FyZFByb3AsXG4gIFRhcmdldCxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY2hlY2tEeW5hbWljQ3JlYXRpb24gfSBmcm9tICcuLi91dGlscy9jaGVja0R5bmFtaWNDcmVhdGlvbic7XG5pbXBvcnQgY3JlYXRlV2FyblRvb01hbnlDbGFzc2VzIGZyb20gJy4uL3V0aWxzL2NyZWF0ZVdhcm5Ub29NYW55Q2xhc3Nlcyc7XG5pbXBvcnQgZGV0ZXJtaW5lVGhlbWUgZnJvbSAnLi4vdXRpbHMvZGV0ZXJtaW5lVGhlbWUnO1xuaW1wb3J0IHsgRU1QVFlfQVJSQVksIEVNUFRZX09CSkVDVCB9IGZyb20gJy4uL3V0aWxzL2VtcHRpZXMnO1xuaW1wb3J0IGVzY2FwZSBmcm9tICcuLi91dGlscy9lc2NhcGUnO1xuaW1wb3J0IGdlbmVyYXRlQ29tcG9uZW50SWQgZnJvbSAnLi4vdXRpbHMvZ2VuZXJhdGVDb21wb25lbnRJZCc7XG5pbXBvcnQgZ2VuZXJhdGVEaXNwbGF5TmFtZSBmcm9tICcuLi91dGlscy9nZW5lcmF0ZURpc3BsYXlOYW1lJztcbmltcG9ydCBnZXRDb21wb25lbnROYW1lIGZyb20gJy4uL3V0aWxzL2dldENvbXBvbmVudE5hbWUnO1xuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnLi4vdXRpbHMvaXNGdW5jdGlvbic7XG5pbXBvcnQgaXNTdHlsZWRDb21wb25lbnQgZnJvbSAnLi4vdXRpbHMvaXNTdHlsZWRDb21wb25lbnQnO1xuaW1wb3J0IGlzVGFnIGZyb20gJy4uL3V0aWxzL2lzVGFnJztcbmltcG9ydCBqb2luU3RyaW5ncyBmcm9tICcuLi91dGlscy9qb2luU3RyaW5ncyc7XG5pbXBvcnQgbWVyZ2UgZnJvbSAnLi4vdXRpbHMvbWl4aW5EZWVwJztcbmltcG9ydCBDb21wb25lbnRTdHlsZSBmcm9tICcuL0NvbXBvbmVudFN0eWxlJztcbmltcG9ydCB7IHVzZVN0eWxlU2hlZXQsIHVzZVN0eWxpcyB9IGZyb20gJy4vU3R5bGVTaGVldE1hbmFnZXInO1xuaW1wb3J0IHsgVGhlbWVDb250ZXh0IH0gZnJvbSAnLi9UaGVtZVByb3ZpZGVyJztcblxuY29uc3QgaWRlbnRpZmllcnMgPSB7fTtcblxuLyogV2UgZGVwZW5kIG9uIGNvbXBvbmVudHMgaGF2aW5nIHVuaXF1ZSBJRHMgKi9cbmZ1bmN0aW9uIGdlbmVyYXRlSWQoZGlzcGxheU5hbWU/OiBzdHJpbmcsIHBhcmVudENvbXBvbmVudElkPzogc3RyaW5nKSB7XG4gIGNvbnN0IG5hbWUgPSB0eXBlb2YgZGlzcGxheU5hbWUgIT09ICdzdHJpbmcnID8gJ3NjJyA6IGVzY2FwZShkaXNwbGF5TmFtZSk7XG4gIC8vIEVuc3VyZSB0aGF0IG5vIGRpc3BsYXlOYW1lIGNhbiBsZWFkIHRvIGR1cGxpY2F0ZSBjb21wb25lbnRJZHNcbiAgaWRlbnRpZmllcnNbbmFtZV0gPSAoaWRlbnRpZmllcnNbbmFtZV0gfHwgMCkgKyAxO1xuXG4gIGNvbnN0IGNvbXBvbmVudElkID0gYCR7bmFtZX0tJHtnZW5lcmF0ZUNvbXBvbmVudElkKFxuICAgIC8vIFNDX1ZFUlNJT04gZ2l2ZXMgdXMgaXNvbGF0aW9uIGJldHdlZW4gbXVsdGlwbGUgcnVudGltZXMgb24gdGhlIHBhZ2UgYXQgb25jZVxuICAgIC8vIHRoaXMgaXMgaW1wcm92ZWQgZnVydGhlciB3aXRoIHVzZSBvZiB0aGUgYmFiZWwgcGx1Z2luIFwibmFtZXNwYWNlXCIgZmVhdHVyZVxuICAgIFNDX1ZFUlNJT04gKyBuYW1lICsgaWRlbnRpZmllcnNbbmFtZV1cbiAgKX1gO1xuXG4gIHJldHVybiBwYXJlbnRDb21wb25lbnRJZCA/IGAke3BhcmVudENvbXBvbmVudElkfS0ke2NvbXBvbmVudElkfWAgOiBjb21wb25lbnRJZDtcbn1cblxuZnVuY3Rpb24gdXNlUmVzb2x2ZWRBdHRyczxDb25maWc+KHRoZW1lOiBhbnkgPSBFTVBUWV9PQkpFQ1QsIHByb3BzOiBDb25maWcsIGF0dHJzOiBBdHRycykge1xuICAvLyBOT1RFOiBjYW4ndCBtZW1vaXplIHRoaXNcbiAgLy8gcmV0dXJucyBbY29udGV4dCwgcmVzb2x2ZWRBdHRyc11cbiAgLy8gd2hlcmUgcmVzb2x2ZWRBdHRycyBpcyBvbmx5IHRoZSB0aGluZ3MgaW5qZWN0ZWQgYnkgdGhlIGF0dHJzIHRoZW1zZWx2ZXNcbiAgY29uc3QgY29udGV4dCA9IHsgLi4ucHJvcHMsIHRoZW1lIH07XG4gIGNvbnN0IHJlc29sdmVkQXR0cnMgPSB7fTtcblxuICBhdHRycy5mb3JFYWNoKGF0dHJEZWYgPT4ge1xuICAgIGxldCByZXNvbHZlZEF0dHJEZWYgPSBhdHRyRGVmO1xuICAgIGxldCBrZXk7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihyZXNvbHZlZEF0dHJEZWYpKSB7XG4gICAgICByZXNvbHZlZEF0dHJEZWYgPSByZXNvbHZlZEF0dHJEZWYoY29udGV4dCk7XG4gICAgfVxuXG4gICAgLyogZXNsaW50LWRpc2FibGUgZ3VhcmQtZm9yLWluICovXG4gICAgZm9yIChrZXkgaW4gcmVzb2x2ZWRBdHRyRGVmKSB7XG4gICAgICBjb250ZXh0W2tleV0gPSByZXNvbHZlZEF0dHJzW2tleV0gPVxuICAgICAgICBrZXkgPT09ICdjbGFzc05hbWUnXG4gICAgICAgICAgPyBqb2luU3RyaW5ncyhyZXNvbHZlZEF0dHJzW2tleV0sIHJlc29sdmVkQXR0ckRlZltrZXldKVxuICAgICAgICAgIDogcmVzb2x2ZWRBdHRyRGVmW2tleV07XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgZ3VhcmQtZm9yLWluICovXG4gIH0pO1xuXG4gIHJldHVybiBbY29udGV4dCwgcmVzb2x2ZWRBdHRyc107XG59XG5cbmZ1bmN0aW9uIHVzZUluamVjdGVkU3R5bGU8VD4oXG4gIGNvbXBvbmVudFN0eWxlOiBDb21wb25lbnRTdHlsZSxcbiAgaXNTdGF0aWM6IGJvb2xlYW4sXG4gIHJlc29sdmVkQXR0cnM6IFQsXG4gIHdhcm5Ub29NYW55Q2xhc3Nlcz86ICRDYWxsPHR5cGVvZiBjcmVhdGVXYXJuVG9vTWFueUNsYXNzZXMsIHN0cmluZywgc3RyaW5nPlxuKSB7XG4gIGNvbnN0IHN0eWxlU2hlZXQgPSB1c2VTdHlsZVNoZWV0KCk7XG4gIGNvbnN0IHN0eWxpcyA9IHVzZVN0eWxpcygpO1xuXG4gIGNvbnN0IGNsYXNzTmFtZSA9IGlzU3RhdGljXG4gICAgPyBjb21wb25lbnRTdHlsZS5nZW5lcmF0ZUFuZEluamVjdFN0eWxlcyhFTVBUWV9PQkpFQ1QsIHN0eWxlU2hlZXQsIHN0eWxpcylcbiAgICA6IGNvbXBvbmVudFN0eWxlLmdlbmVyYXRlQW5kSW5qZWN0U3R5bGVzKHJlc29sdmVkQXR0cnMsIHN0eWxlU2hlZXQsIHN0eWxpcyk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL3J1bGVzLW9mLWhvb2tzXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB1c2VEZWJ1Z1ZhbHVlKGNsYXNzTmFtZSk7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgIWlzU3RhdGljICYmIHdhcm5Ub29NYW55Q2xhc3Nlcykge1xuICAgIHdhcm5Ub29NYW55Q2xhc3NlcyhjbGFzc05hbWUpO1xuICB9XG5cbiAgcmV0dXJuIGNsYXNzTmFtZTtcbn1cblxuZnVuY3Rpb24gdXNlU3R5bGVkQ29tcG9uZW50SW1wbChcbiAgZm9yd2FyZGVkQ29tcG9uZW50OiBJU3R5bGVkQ29tcG9uZW50LFxuICBwcm9wczogT2JqZWN0LFxuICBmb3J3YXJkZWRSZWY6IFJlZjxhbnk+LFxuICBpc1N0YXRpYzogYm9vbGVhblxuKSB7XG4gIGNvbnN0IHtcbiAgICBhdHRyczogY29tcG9uZW50QXR0cnMsXG4gICAgY29tcG9uZW50U3R5bGUsXG4gICAgZGVmYXVsdFByb3BzLFxuICAgIGZvbGRlZENvbXBvbmVudElkcyxcbiAgICBzaG91bGRGb3J3YXJkUHJvcCxcbiAgICBzdHlsZWRDb21wb25lbnRJZCxcbiAgICB0YXJnZXQsXG4gIH0gPSBmb3J3YXJkZWRDb21wb25lbnQ7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL3J1bGVzLW9mLWhvb2tzXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB1c2VEZWJ1Z1ZhbHVlKHN0eWxlZENvbXBvbmVudElkKTtcblxuICAvLyBOT1RFOiB0aGUgbm9uLWhvb2tzIHZlcnNpb24gb25seSBzdWJzY3JpYmVzIHRvIHRoaXMgd2hlbiAhY29tcG9uZW50U3R5bGUuaXNTdGF0aWMsXG4gIC8vIGJ1dCB0aGF0J2QgYmUgYWdhaW5zdCB0aGUgcnVsZXMtb2YtaG9va3MuIFdlIGNvdWxkIGJlIG5hdWdodHkgYW5kIGRvIGl0IGFueXdheSBhcyBpdFxuICAvLyBzaG91bGQgYmUgYW4gaW1tdXRhYmxlIHZhbHVlLCBidXQgYmVoYXZlIGZvciBub3cuXG4gIGNvbnN0IHRoZW1lID0gZGV0ZXJtaW5lVGhlbWUocHJvcHMsIHVzZUNvbnRleHQoVGhlbWVDb250ZXh0KSwgZGVmYXVsdFByb3BzKTtcblxuICBjb25zdCBbY29udGV4dCwgYXR0cnNdID0gdXNlUmVzb2x2ZWRBdHRycyh0aGVtZSB8fCBFTVBUWV9PQkpFQ1QsIHByb3BzLCBjb21wb25lbnRBdHRycyk7XG5cbiAgY29uc3QgZ2VuZXJhdGVkQ2xhc3NOYW1lID0gdXNlSW5qZWN0ZWRTdHlsZShcbiAgICBjb21wb25lbnRTdHlsZSxcbiAgICBpc1N0YXRpYyxcbiAgICBjb250ZXh0LFxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBmb3J3YXJkZWRDb21wb25lbnQud2FyblRvb01hbnlDbGFzc2VzIDogdW5kZWZpbmVkXG4gICk7XG5cbiAgY29uc3QgcmVmVG9Gb3J3YXJkID0gZm9yd2FyZGVkUmVmO1xuXG4gIGNvbnN0IGVsZW1lbnRUb0JlQ3JlYXRlZDogVGFyZ2V0ID0gYXR0cnMuJGFzIHx8IHByb3BzLiRhcyB8fCBhdHRycy5hcyB8fCBwcm9wcy5hcyB8fCB0YXJnZXQ7XG5cbiAgY29uc3QgaXNUYXJnZXRUYWcgPSBpc1RhZyhlbGVtZW50VG9CZUNyZWF0ZWQpO1xuICBjb25zdCBjb21wdXRlZFByb3BzID0gYXR0cnMgIT09IHByb3BzID8geyAuLi5wcm9wcywgLi4uYXR0cnMgfSA6IHByb3BzO1xuICBjb25zdCBwcm9wc0ZvckVsZW1lbnQgPSB7fTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ3VhcmQtZm9yLWluXG4gIGZvciAoY29uc3Qga2V5IGluIGNvbXB1dGVkUHJvcHMpIHtcbiAgICBpZiAoa2V5WzBdID09PSAnJCcgfHwga2V5ID09PSAnYXMnKSBjb250aW51ZTtcbiAgICBlbHNlIGlmIChrZXkgPT09ICdmb3J3YXJkZWRBcycpIHtcbiAgICAgIHByb3BzRm9yRWxlbWVudC5hcyA9IGNvbXB1dGVkUHJvcHNba2V5XTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgc2hvdWxkRm9yd2FyZFByb3AgPyBzaG91bGRGb3J3YXJkUHJvcChrZXksIHZhbGlkQXR0cikgOiBpc1RhcmdldFRhZyA/IHZhbGlkQXR0cihrZXkpIDogdHJ1ZVxuICAgICkge1xuICAgICAgLy8gRG9uJ3QgcGFzcyB0aHJvdWdoIG5vbiBIVE1MIHRhZ3MgdGhyb3VnaCB0byBIVE1MIGVsZW1lbnRzXG4gICAgICBwcm9wc0ZvckVsZW1lbnRba2V5XSA9IGNvbXB1dGVkUHJvcHNba2V5XTtcbiAgICB9XG4gIH1cblxuICBpZiAocHJvcHMuc3R5bGUgJiYgYXR0cnMuc3R5bGUgIT09IHByb3BzLnN0eWxlKSB7XG4gICAgcHJvcHNGb3JFbGVtZW50LnN0eWxlID0geyAuLi5wcm9wcy5zdHlsZSwgLi4uYXR0cnMuc3R5bGUgfTtcbiAgfVxuXG4gIHByb3BzRm9yRWxlbWVudC5jbGFzc05hbWUgPSBBcnJheS5wcm90b3R5cGVcbiAgICAuY29uY2F0KFxuICAgICAgZm9sZGVkQ29tcG9uZW50SWRzLFxuICAgICAgc3R5bGVkQ29tcG9uZW50SWQsXG4gICAgICBnZW5lcmF0ZWRDbGFzc05hbWUgIT09IHN0eWxlZENvbXBvbmVudElkID8gZ2VuZXJhdGVkQ2xhc3NOYW1lIDogbnVsbCxcbiAgICAgIHByb3BzLmNsYXNzTmFtZSxcbiAgICAgIGF0dHJzLmNsYXNzTmFtZVxuICAgIClcbiAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgLmpvaW4oJyAnKTtcblxuICBwcm9wc0ZvckVsZW1lbnQucmVmID0gcmVmVG9Gb3J3YXJkO1xuXG4gIHJldHVybiBjcmVhdGVFbGVtZW50KGVsZW1lbnRUb0JlQ3JlYXRlZCwgcHJvcHNGb3JFbGVtZW50KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3R5bGVkQ29tcG9uZW50KFxuICB0YXJnZXQ6ICRQcm9wZXJ0eVR5cGU8SVN0eWxlZENvbXBvbmVudCwgJ3RhcmdldCc+LFxuICBvcHRpb25zOiB7XG4gICAgYXR0cnM/OiBBdHRycyxcbiAgICBjb21wb25lbnRJZDogc3RyaW5nLFxuICAgIGRpc3BsYXlOYW1lPzogc3RyaW5nLFxuICAgIHBhcmVudENvbXBvbmVudElkPzogc3RyaW5nLFxuICAgIHNob3VsZEZvcndhcmRQcm9wPzogU2hvdWxkRm9yd2FyZFByb3AsXG4gIH0sXG4gIHJ1bGVzOiBSdWxlU2V0XG4pIHtcbiAgY29uc3QgaXNUYXJnZXRTdHlsZWRDb21wID0gaXNTdHlsZWRDb21wb25lbnQodGFyZ2V0KTtcbiAgY29uc3QgaXNDb21wb3NpdGVDb21wb25lbnQgPSAhaXNUYWcodGFyZ2V0KTtcblxuICBjb25zdCB7XG4gICAgYXR0cnMgPSBFTVBUWV9BUlJBWSxcbiAgICBjb21wb25lbnRJZCA9IGdlbmVyYXRlSWQob3B0aW9ucy5kaXNwbGF5TmFtZSwgb3B0aW9ucy5wYXJlbnRDb21wb25lbnRJZCksXG4gICAgZGlzcGxheU5hbWUgPSBnZW5lcmF0ZURpc3BsYXlOYW1lKHRhcmdldCksXG4gIH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IHN0eWxlZENvbXBvbmVudElkID1cbiAgICBvcHRpb25zLmRpc3BsYXlOYW1lICYmIG9wdGlvbnMuY29tcG9uZW50SWRcbiAgICAgID8gYCR7ZXNjYXBlKG9wdGlvbnMuZGlzcGxheU5hbWUpfS0ke29wdGlvbnMuY29tcG9uZW50SWR9YFxuICAgICAgOiBvcHRpb25zLmNvbXBvbmVudElkIHx8IGNvbXBvbmVudElkO1xuXG4gIC8vIGZvbGQgdGhlIHVuZGVybHlpbmcgU3R5bGVkQ29tcG9uZW50IGF0dHJzIHVwIChpbXBsaWNpdCBleHRlbmQpXG4gIGNvbnN0IGZpbmFsQXR0cnMgPVxuICAgIGlzVGFyZ2V0U3R5bGVkQ29tcCAmJiAoKHRhcmdldDogYW55KTogSVN0eWxlZENvbXBvbmVudCkuYXR0cnNcbiAgICAgID8gQXJyYXkucHJvdG90eXBlLmNvbmNhdCgoKHRhcmdldDogYW55KTogSVN0eWxlZENvbXBvbmVudCkuYXR0cnMsIGF0dHJzKS5maWx0ZXIoQm9vbGVhbilcbiAgICAgIDogYXR0cnM7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gIGxldCBzaG91bGRGb3J3YXJkUHJvcCA9IG9wdGlvbnMuc2hvdWxkRm9yd2FyZFByb3A7XG5cbiAgaWYgKGlzVGFyZ2V0U3R5bGVkQ29tcCAmJiB0YXJnZXQuc2hvdWxkRm9yd2FyZFByb3ApIHtcbiAgICBpZiAob3B0aW9ucy5zaG91bGRGb3J3YXJkUHJvcCkge1xuICAgICAgLy8gY29tcG9zZSBuZXN0ZWQgc2hvdWxkRm9yd2FyZFByb3AgY2FsbHNcbiAgICAgIHNob3VsZEZvcndhcmRQcm9wID0gKHByb3AsIGZpbHRlckZuKSA9PlxuICAgICAgICAoKCgodGFyZ2V0OiBhbnkpOiBJU3R5bGVkQ29tcG9uZW50KS5zaG91bGRGb3J3YXJkUHJvcDogYW55KTogU2hvdWxkRm9yd2FyZFByb3ApKFxuICAgICAgICAgIHByb3AsXG4gICAgICAgICAgZmlsdGVyRm5cbiAgICAgICAgKSAmJiAoKG9wdGlvbnMuc2hvdWxkRm9yd2FyZFByb3A6IGFueSk6IFNob3VsZEZvcndhcmRQcm9wKShwcm9wLCBmaWx0ZXJGbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgc2hvdWxkRm9yd2FyZFByb3AgPSAoKHRhcmdldDogYW55KTogSVN0eWxlZENvbXBvbmVudCkuc2hvdWxkRm9yd2FyZFByb3A7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29tcG9uZW50U3R5bGUgPSBuZXcgQ29tcG9uZW50U3R5bGUoXG4gICAgcnVsZXMsXG4gICAgc3R5bGVkQ29tcG9uZW50SWQsXG4gICAgaXNUYXJnZXRTdHlsZWRDb21wID8gKCh0YXJnZXQ6IE9iamVjdCkuY29tcG9uZW50U3R5bGU6IENvbXBvbmVudFN0eWxlKSA6IHVuZGVmaW5lZFxuICApO1xuXG4gIC8vIHN0YXRpY2FsbHkgc3R5bGVkLWNvbXBvbmVudHMgZG9uJ3QgbmVlZCB0byBidWlsZCBhbiBleGVjdXRpb24gY29udGV4dCBvYmplY3QsXG4gIC8vIGFuZCBzaG91bGRuJ3QgYmUgaW5jcmVhc2luZyB0aGUgbnVtYmVyIG9mIGNsYXNzIG5hbWVzXG4gIGNvbnN0IGlzU3RhdGljID0gY29tcG9uZW50U3R5bGUuaXNTdGF0aWMgJiYgYXR0cnMubGVuZ3RoID09PSAwO1xuXG4gIC8qKlxuICAgKiBmb3J3YXJkUmVmIGNyZWF0ZXMgYSBuZXcgaW50ZXJpbSBjb21wb25lbnQsIHdoaWNoIHdlJ2xsIHRha2UgYWR2YW50YWdlIG9mXG4gICAqIGluc3RlYWQgb2YgZXh0ZW5kaW5nIFBhcmVudENvbXBvbmVudCB0byBjcmVhdGUgX2Fub3RoZXJfIGludGVyaW0gY2xhc3NcbiAgICovXG4gIGxldCBXcmFwcGVkU3R5bGVkQ29tcG9uZW50OiBJU3R5bGVkQ29tcG9uZW50O1xuXG4gIGNvbnN0IGZvcndhcmRSZWYgPSAocHJvcHMsIHJlZikgPT5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICB1c2VTdHlsZWRDb21wb25lbnRJbXBsKFdyYXBwZWRTdHlsZWRDb21wb25lbnQsIHByb3BzLCByZWYsIGlzU3RhdGljKTtcblxuICBmb3J3YXJkUmVmLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG5cbiAgV3JhcHBlZFN0eWxlZENvbXBvbmVudCA9ICgoUmVhY3QuZm9yd2FyZFJlZihmb3J3YXJkUmVmKTogYW55KTogSVN0eWxlZENvbXBvbmVudCk7XG4gIFdyYXBwZWRTdHlsZWRDb21wb25lbnQuYXR0cnMgPSBmaW5hbEF0dHJzO1xuICBXcmFwcGVkU3R5bGVkQ29tcG9uZW50LmNvbXBvbmVudFN0eWxlID0gY29tcG9uZW50U3R5bGU7XG4gIFdyYXBwZWRTdHlsZWRDb21wb25lbnQuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgV3JhcHBlZFN0eWxlZENvbXBvbmVudC5zaG91bGRGb3J3YXJkUHJvcCA9IHNob3VsZEZvcndhcmRQcm9wO1xuXG4gIC8vIHRoaXMgc3RhdGljIGlzIHVzZWQgdG8gcHJlc2VydmUgdGhlIGNhc2NhZGUgb2Ygc3RhdGljIGNsYXNzZXMgZm9yIGNvbXBvbmVudCBzZWxlY3RvclxuICAvLyBwdXJwb3NlczsgdGhpcyBpcyBlc3BlY2lhbGx5IGltcG9ydGFudCB3aXRoIHVzYWdlIG9mIHRoZSBjc3MgcHJvcFxuICBXcmFwcGVkU3R5bGVkQ29tcG9uZW50LmZvbGRlZENvbXBvbmVudElkcyA9IGlzVGFyZ2V0U3R5bGVkQ29tcFxuICAgID8gQXJyYXkucHJvdG90eXBlLmNvbmNhdChcbiAgICAgICAgKCh0YXJnZXQ6IGFueSk6IElTdHlsZWRDb21wb25lbnQpLmZvbGRlZENvbXBvbmVudElkcyxcbiAgICAgICAgKCh0YXJnZXQ6IGFueSk6IElTdHlsZWRDb21wb25lbnQpLnN0eWxlZENvbXBvbmVudElkXG4gICAgICApXG4gICAgOiBFTVBUWV9BUlJBWTtcblxuICBXcmFwcGVkU3R5bGVkQ29tcG9uZW50LnN0eWxlZENvbXBvbmVudElkID0gc3R5bGVkQ29tcG9uZW50SWQ7XG5cbiAgLy8gZm9sZCB0aGUgdW5kZXJseWluZyBTdHlsZWRDb21wb25lbnQgdGFyZ2V0IHVwIHNpbmNlIHdlIGZvbGRlZCB0aGUgc3R5bGVzXG4gIFdyYXBwZWRTdHlsZWRDb21wb25lbnQudGFyZ2V0ID0gaXNUYXJnZXRTdHlsZWRDb21wXG4gICAgPyAoKHRhcmdldDogYW55KTogSVN0eWxlZENvbXBvbmVudCkudGFyZ2V0XG4gICAgOiB0YXJnZXQ7XG5cbiAgV3JhcHBlZFN0eWxlZENvbXBvbmVudC53aXRoQ29tcG9uZW50ID0gZnVuY3Rpb24gd2l0aENvbXBvbmVudCh0YWc6IFRhcmdldCkge1xuICAgIGNvbnN0IHsgY29tcG9uZW50SWQ6IHByZXZpb3VzQ29tcG9uZW50SWQsIC4uLm9wdGlvbnNUb0NvcHkgfSA9IG9wdGlvbnM7XG5cbiAgICBjb25zdCBuZXdDb21wb25lbnRJZCA9XG4gICAgICBwcmV2aW91c0NvbXBvbmVudElkICYmXG4gICAgICBgJHtwcmV2aW91c0NvbXBvbmVudElkfS0ke2lzVGFnKHRhZykgPyB0YWcgOiBlc2NhcGUoZ2V0Q29tcG9uZW50TmFtZSh0YWcpKX1gO1xuXG4gICAgY29uc3QgbmV3T3B0aW9ucyA9IHtcbiAgICAgIC4uLm9wdGlvbnNUb0NvcHksXG4gICAgICBhdHRyczogZmluYWxBdHRycyxcbiAgICAgIGNvbXBvbmVudElkOiBuZXdDb21wb25lbnRJZCxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGNyZWF0ZVN0eWxlZENvbXBvbmVudCh0YWcsIG5ld09wdGlvbnMsIHJ1bGVzKTtcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV3JhcHBlZFN0eWxlZENvbXBvbmVudCwgJ2RlZmF1bHRQcm9wcycsIHtcbiAgICBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZm9sZGVkRGVmYXVsdFByb3BzO1xuICAgIH0sXG5cbiAgICBzZXQob2JqKSB7XG4gICAgICB0aGlzLl9mb2xkZWREZWZhdWx0UHJvcHMgPSBpc1RhcmdldFN0eWxlZENvbXBcbiAgICAgICAgPyBtZXJnZSh7fSwgKCh0YXJnZXQ6IGFueSk6IElTdHlsZWRDb21wb25lbnQpLmRlZmF1bHRQcm9wcywgb2JqKVxuICAgICAgICA6IG9iajtcbiAgICB9LFxuICB9KTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGNoZWNrRHluYW1pY0NyZWF0aW9uKGRpc3BsYXlOYW1lLCBzdHlsZWRDb21wb25lbnRJZCk7XG5cbiAgICBXcmFwcGVkU3R5bGVkQ29tcG9uZW50Lndhcm5Ub29NYW55Q2xhc3NlcyA9IGNyZWF0ZVdhcm5Ub29NYW55Q2xhc3NlcyhcbiAgICAgIGRpc3BsYXlOYW1lLFxuICAgICAgc3R5bGVkQ29tcG9uZW50SWRcbiAgICApO1xuICB9XG5cbiAgV3JhcHBlZFN0eWxlZENvbXBvbmVudC50b1N0cmluZyA9ICgpID0+IGAuJHtXcmFwcGVkU3R5bGVkQ29tcG9uZW50LnN0eWxlZENvbXBvbmVudElkfWA7XG5cbiAgaWYgKGlzQ29tcG9zaXRlQ29tcG9uZW50KSB7XG4gICAgaG9pc3Q8XG4gICAgICBJU3R5bGVkU3RhdGljcyxcbiAgICAgICRQcm9wZXJ0eVR5cGU8SVN0eWxlZENvbXBvbmVudCwgJ3RhcmdldCc+LFxuICAgICAgeyBba2V5OiAkS2V5czxJU3R5bGVkU3RhdGljcz5dOiB0cnVlIH1cbiAgICA+KFdyYXBwZWRTdHlsZWRDb21wb25lbnQsICgodGFyZ2V0OiBhbnkpOiAkUHJvcGVydHlUeXBlPElTdHlsZWRDb21wb25lbnQsICd0YXJnZXQnPiksIHtcbiAgICAgIC8vIGFsbCBTQy1zcGVjaWZpYyB0aGluZ3Mgc2hvdWxkIG5vdCBiZSBob2lzdGVkXG4gICAgICBhdHRyczogdHJ1ZSxcbiAgICAgIGNvbXBvbmVudFN0eWxlOiB0cnVlLFxuICAgICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgICBmb2xkZWRDb21wb25lbnRJZHM6IHRydWUsXG4gICAgICBzaG91bGRGb3J3YXJkUHJvcDogdHJ1ZSxcbiAgICAgIHN0eWxlZENvbXBvbmVudElkOiB0cnVlLFxuICAgICAgdGFyZ2V0OiB0cnVlLFxuICAgICAgd2l0aENvbXBvbmVudDogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBXcmFwcGVkU3R5bGVkQ29tcG9uZW50O1xufVxuIiwiLy8gQGZsb3dcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gJy4uL3NoZWV0JztcbmltcG9ydCB0eXBlIHsgUnVsZVNldCwgU3RyaW5naWZpZXIgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgZmxhdHRlbiBmcm9tICcuLi91dGlscy9mbGF0dGVuJztcbmltcG9ydCBpc1N0YXRpY1J1bGVzIGZyb20gJy4uL3V0aWxzL2lzU3RhdGljUnVsZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbG9iYWxTdHlsZSB7XG4gIGNvbXBvbmVudElkOiBzdHJpbmc7XG5cbiAgaXNTdGF0aWM6IGJvb2xlYW47XG5cbiAgcnVsZXM6IFJ1bGVTZXQ7XG5cbiAgY29uc3RydWN0b3IocnVsZXM6IFJ1bGVTZXQsIGNvbXBvbmVudElkOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJ1bGVzID0gcnVsZXM7XG4gICAgdGhpcy5jb21wb25lbnRJZCA9IGNvbXBvbmVudElkO1xuICAgIHRoaXMuaXNTdGF0aWMgPSBpc1N0YXRpY1J1bGVzKHJ1bGVzKTtcblxuICAgIC8vIHByZS1yZWdpc3RlciB0aGUgZmlyc3QgaW5zdGFuY2UgdG8gZW5zdXJlIGdsb2JhbCBzdHlsZXNcbiAgICAvLyBsb2FkIGJlZm9yZSBjb21wb25lbnQgb25lc1xuICAgIFN0eWxlU2hlZXQucmVnaXN0ZXJJZCh0aGlzLmNvbXBvbmVudElkICsgMSk7XG4gIH1cblxuICBjcmVhdGVTdHlsZXMoXG4gICAgaW5zdGFuY2U6IG51bWJlcixcbiAgICBleGVjdXRpb25Db250ZXh0OiBPYmplY3QsXG4gICAgc3R5bGVTaGVldDogU3R5bGVTaGVldCxcbiAgICBzdHlsaXM6IFN0cmluZ2lmaWVyXG4gICkge1xuICAgIGNvbnN0IGZsYXRDU1MgPSBmbGF0dGVuKHRoaXMucnVsZXMsIGV4ZWN1dGlvbkNvbnRleHQsIHN0eWxlU2hlZXQsIHN0eWxpcyk7XG4gICAgY29uc3QgY3NzID0gc3R5bGlzKGZsYXRDU1Muam9pbignJyksICcnKTtcbiAgICBjb25zdCBpZCA9IHRoaXMuY29tcG9uZW50SWQgKyBpbnN0YW5jZTtcblxuICAgIC8vIE5PVEU6IFdlIHVzZSB0aGUgaWQgYXMgYSBuYW1lIGFzIHdlbGwsIHNpbmNlIHRoZXNlIHJ1bGVzIG5ldmVyIGNoYW5nZVxuICAgIHN0eWxlU2hlZXQuaW5zZXJ0UnVsZXMoaWQsIGlkLCBjc3MpO1xuICB9XG5cbiAgcmVtb3ZlU3R5bGVzKGluc3RhbmNlOiBudW1iZXIsIHN0eWxlU2hlZXQ6IFN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZVNoZWV0LmNsZWFyUnVsZXModGhpcy5jb21wb25lbnRJZCArIGluc3RhbmNlKTtcbiAgfVxuXG4gIHJlbmRlclN0eWxlcyhcbiAgICBpbnN0YW5jZTogbnVtYmVyLFxuICAgIGV4ZWN1dGlvbkNvbnRleHQ6IE9iamVjdCxcbiAgICBzdHlsZVNoZWV0OiBTdHlsZVNoZWV0LFxuICAgIHN0eWxpczogU3RyaW5naWZpZXJcbiAgKSB7XG4gICAgaWYgKGluc3RhbmNlID4gMikgU3R5bGVTaGVldC5yZWdpc3RlcklkKHRoaXMuY29tcG9uZW50SWQgKyBpbnN0YW5jZSk7XG5cbiAgICAvLyBOT1RFOiBSZW1vdmUgb2xkIHN0eWxlcywgdGhlbiBpbmplY3QgdGhlIG5ldyBvbmVzXG4gICAgdGhpcy5yZW1vdmVTdHlsZXMoaW5zdGFuY2UsIHN0eWxlU2hlZXQpO1xuICAgIHRoaXMuY3JlYXRlU3R5bGVzKGluc3RhbmNlLCBleGVjdXRpb25Db250ZXh0LCBzdHlsZVNoZWV0LCBzdHlsaXMpO1xuICB9XG59XG4iLCIvLyBAZmxvd1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBJU19CUk9XU0VSLCBTQ19BVFRSLCBTQ19BVFRSX1ZFUlNJT04sIFNDX1ZFUlNJT04gfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHRocm93U3R5bGVkRXJyb3IgZnJvbSAnLi4vdXRpbHMvZXJyb3InO1xuaW1wb3J0IGdldE5vbmNlIGZyb20gJy4uL3V0aWxzL25vbmNlJztcbmltcG9ydCBTdHlsZVNoZWV0IGZyb20gJy4uL3NoZWV0JztcbmltcG9ydCBTdHlsZVNoZWV0TWFuYWdlciBmcm9tICcuL1N0eWxlU2hlZXRNYW5hZ2VyJztcblxuZGVjbGFyZSB2YXIgX19TRVJWRVJfXzogYm9vbGVhbjtcblxuY29uc3QgQ0xPU0lOR19UQUdfUiA9IC9eXFxzKjxcXC9bYS16XS9pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXJTdHlsZVNoZWV0IHtcbiAgaXNTdHJlYW1pbmc6IGJvb2xlYW47XG5cbiAgaW5zdGFuY2U6IFN0eWxlU2hlZXQ7XG5cbiAgc2VhbGVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgU3R5bGVTaGVldCh7IGlzU2VydmVyOiB0cnVlIH0pO1xuICAgIHRoaXMuc2VhbGVkID0gZmFsc2U7XG4gIH1cblxuICBfZW1pdFNoZWV0Q1NTID0gKCk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgY3NzID0gdGhpcy5pbnN0YW5jZS50b1N0cmluZygpO1xuICAgIGNvbnN0IG5vbmNlID0gZ2V0Tm9uY2UoKTtcbiAgICBjb25zdCBhdHRycyA9IFtub25jZSAmJiBgbm9uY2U9XCIke25vbmNlfVwiYCwgYCR7U0NfQVRUUn09XCJ0cnVlXCJgLCBgJHtTQ19BVFRSX1ZFUlNJT059PVwiJHtTQ19WRVJTSU9OfVwiYF07XG4gICAgY29uc3QgaHRtbEF0dHIgPSBhdHRycy5maWx0ZXIoQm9vbGVhbikuam9pbignICcpO1xuXG4gICAgcmV0dXJuIGA8c3R5bGUgJHtodG1sQXR0cn0+JHtjc3N9PC9zdHlsZT5gO1xuICB9O1xuXG4gIGNvbGxlY3RTdHlsZXMoY2hpbGRyZW46IGFueSkge1xuICAgIGlmICh0aGlzLnNlYWxlZCkge1xuICAgICAgcmV0dXJuIHRocm93U3R5bGVkRXJyb3IoMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIDxTdHlsZVNoZWV0TWFuYWdlciBzaGVldD17dGhpcy5pbnN0YW5jZX0+e2NoaWxkcmVufTwvU3R5bGVTaGVldE1hbmFnZXI+O1xuICB9XG5cbiAgZ2V0U3R5bGVUYWdzID0gKCk6IHN0cmluZyA9PiB7XG4gICAgaWYgKHRoaXMuc2VhbGVkKSB7XG4gICAgICByZXR1cm4gdGhyb3dTdHlsZWRFcnJvcigyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZW1pdFNoZWV0Q1NTKCk7XG4gIH07XG5cbiAgZ2V0U3R5bGVFbGVtZW50ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnNlYWxlZCkge1xuICAgICAgcmV0dXJuIHRocm93U3R5bGVkRXJyb3IoMik7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICBbU0NfQVRUUl06ICcnLFxuICAgICAgW1NDX0FUVFJfVkVSU0lPTl06IFNDX1ZFUlNJT04sXG4gICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xuICAgICAgICBfX2h0bWw6IHRoaXMuaW5zdGFuY2UudG9TdHJpbmcoKSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IG5vbmNlID0gZ2V0Tm9uY2UoKTtcbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIChwcm9wczogYW55KS5ub25jZSA9IG5vbmNlO1xuICAgIH1cblxuICAgIC8vIHY0IHJldHVybmVkIGFuIGFycmF5IGZvciB0aGlzIGZuLCBzbyB3ZSdsbCBkbyB0aGUgc2FtZSBmb3IgdjUgZm9yIGJhY2t3YXJkIGNvbXBhdFxuICAgIHJldHVybiBbPHN0eWxlIHsuLi5wcm9wc30ga2V5PVwic2MtMC0wXCIgLz5dO1xuICB9O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBpbnRlcmxlYXZlV2l0aE5vZGVTdHJlYW0oaW5wdXQ6IGFueSkge1xuICAgIGlmICghX19TRVJWRVJfXyB8fCBJU19CUk9XU0VSKSB7XG4gICAgICByZXR1cm4gdGhyb3dTdHlsZWRFcnJvcigzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2VhbGVkKSB7XG4gICAgICByZXR1cm4gdGhyb3dTdHlsZWRFcnJvcigyKTtcbiAgICB9XG5cbiAgICBpZiAoX19TRVJWRVJfXykge1xuICAgICAgdGhpcy5zZWFsKCk7XG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBnbG9iYWwtcmVxdWlyZVxuICAgICAgY29uc3QgeyBSZWFkYWJsZSwgVHJhbnNmb3JtIH0gPSByZXF1aXJlKCdzdHJlYW0nKTtcblxuICAgICAgY29uc3QgcmVhZGFibGVTdHJlYW06IFJlYWRhYmxlID0gaW5wdXQ7XG4gICAgICBjb25zdCB7IGluc3RhbmNlOiBzaGVldCwgX2VtaXRTaGVldENTUyB9ID0gdGhpcztcblxuICAgICAgY29uc3QgdHJhbnNmb3JtZXIgPSBuZXcgVHJhbnNmb3JtKHtcbiAgICAgICAgdHJhbnNmb3JtOiBmdW5jdGlvbiBhcHBlbmRTdHlsZUNodW5rcyhjaHVuaywgLyogZW5jb2RpbmcgKi8gXywgY2FsbGJhY2spIHtcbiAgICAgICAgICAvLyBHZXQgdGhlIGNodW5rIGFuZCByZXRyaWV2ZSB0aGUgc2hlZXQncyBDU1MgYXMgYW4gSFRNTCBjaHVuayxcbiAgICAgICAgICAvLyB0aGVuIHJlc2V0IGl0cyBydWxlcyBzbyB3ZSBnZXQgb25seSBuZXcgb25lcyBmb3IgdGhlIG5leHQgY2h1bmtcbiAgICAgICAgICBjb25zdCByZW5kZXJlZEh0bWwgPSBjaHVuay50b1N0cmluZygpO1xuICAgICAgICAgIGNvbnN0IGh0bWwgPSBfZW1pdFNoZWV0Q1NTKCk7XG5cbiAgICAgICAgICBzaGVldC5jbGVhclRhZygpO1xuXG4gICAgICAgICAgLy8gcHJlcGVuZCBzdHlsZSBodG1sIHRvIGNodW5rLCB1bmxlc3MgdGhlIHN0YXJ0IG9mIHRoZSBjaHVuayBpcyBhXG4gICAgICAgICAgLy8gY2xvc2luZyB0YWcgaW4gd2hpY2ggY2FzZSBhcHBlbmQgcmlnaHQgYWZ0ZXIgdGhhdFxuICAgICAgICAgIGlmIChDTE9TSU5HX1RBR19SLnRlc3QocmVuZGVyZWRIdG1sKSkge1xuICAgICAgICAgICAgY29uc3QgZW5kT2ZDbG9zaW5nVGFnID0gcmVuZGVyZWRIdG1sLmluZGV4T2YoJz4nKSArIDE7XG4gICAgICAgICAgICBjb25zdCBiZWZvcmUgPSByZW5kZXJlZEh0bWwuc2xpY2UoMCwgZW5kT2ZDbG9zaW5nVGFnKTtcbiAgICAgICAgICAgIGNvbnN0IGFmdGVyID0gcmVuZGVyZWRIdG1sLnNsaWNlKGVuZE9mQ2xvc2luZ1RhZyk7XG5cbiAgICAgICAgICAgIHRoaXMucHVzaChiZWZvcmUgKyBodG1sICsgYWZ0ZXIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnB1c2goaHRtbCArIHJlbmRlcmVkSHRtbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICByZWFkYWJsZVN0cmVhbS5vbignZXJyb3InLCBlcnIgPT4ge1xuICAgICAgICAvLyBmb3J3YXJkIHRoZSBlcnJvciB0byB0aGUgdHJhbnNmb3JtIHN0cmVhbVxuICAgICAgICB0cmFuc2Zvcm1lci5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlYWRhYmxlU3RyZWFtLnBpcGUodHJhbnNmb3JtZXIpO1xuICAgIH1cbiAgfVxuXG4gIHNlYWwgPSAoKSA9PiB7XG4gICAgdGhpcy5zZWFsZWQgPSB0cnVlO1xuICB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==