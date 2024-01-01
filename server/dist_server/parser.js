"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosts = getPosts;
exports.parseLinks = parseLinks;
exports.parser = parser;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _unirest = _interopRequireDefault(require("unirest"));
var _cheerio = _interopRequireDefault(require("cheerio"));
var _axios = _interopRequireDefault(require("axios"));
var _ = require(".");
var delay = function delay(ms) {
  new Promise(function (r) {
    return setTimeout(function () {}, ms);
  });
};
var log = function log(i, count, ms) {
  return new Promise(function (r) {
    return setTimeout(function () {
      console.log("\n    \u0417\u0430\u043F\u0438\u0441\u044C: ".concat(i, ",\n    \u0412\u0441\u0435\u0433\u043E \u0437\u0430\u043F\u0438\u0441\u0435\u0439: ").concat(count, "\n  "));
      r();
    }, ms);
  });
};
function parser(url, configs) {
  return new Promise(function (resolve, reject) {
    _unirest.default.get(url).end(function (_ref) {
      var body = _ref.body;
      //  if (error) console.log("Ошибка в модуле Parser"); else
      {
        var $ = _cheerio.default.load(body);
        //const domain = url.match(/\/\/(.*?)\//)[1]; 
        var title = $(configs.title).text().trim();
        var baseImage = $(configs.image).attr('src');
        if (baseImage == undefined) {
          baseImage = '';
        } else {
          baseImage = baseImage.indexOf("http") >= 0 ? baseImage : "http://".concat(baseImage);
        }
        var name = configs.name;
        var s_text = $(configs.text).text().trim();
        var text = '';
        if (configs.text_special == 'true') {
          var setText = function setText(s) {
            return s.length >= 1000 ? s.substr(0, 1000) + ' ...' : s;
          };
          text = setText(s_text);
        }
        if (configs.text_special == 'false') text = s_text;
        var post = {
          title: title,
          title_orig: title,
          image: baseImage,
          text: text,
          text_orig: text,
          name: name,
          url: url
        };
        resolve(post);
      }
    });
  });
}
function parseLinks(url, className, maxLinks) {
  return new Promise(function (resolve, reject) {
    var links = [];
    _unirest.default.get(url).end(function (_ref2) {
      var body = _ref2.body,
        error = _ref2.error;
      if (error) reject(error);
      //  console.log(body);
      var $ = _cheerio.default.load(body);
      var domain = url.match(/\/\/(.*?)\//)[1];
      $(className).each(function (i, e) {
        if (!links.includes($(e).attr('href'))) {
          if (i + 1 <= maxLinks) {
            var link_str = $(e).attr('href');
            if (link_str.indexOf("http") >= 0) links.push($(e).attr('href'));else links.push('http://' + domain + $(e).attr('href'));
            console.log(links[i]);
          }
        }
      });
      resolve(links);
      if (!links.length) reject({
        error: "Empty parseLinks"
      });
    });
  });
}
var googleTranslate = function googleTranslate(from, to, txt) {
  return "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=".concat(from, "&tl=").concat(to, "&q=").concat(txt);
};
function getPosts(_x, _x2) {
  return _getPosts.apply(this, arguments);
}
function _getPosts() {
  _getPosts = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(links, configs) {
    return _regenerator.default.wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {
              var count, posts, _loop, i, check;
              return _regenerator.default.wrap(function _callee$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    count = links.length;
                    posts = [];
                    _loop = /*#__PURE__*/_regenerator.default.mark(function _loop() {
                      var post;
                      return _regenerator.default.wrap(function _loop$(_context) {
                        while (1) switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return parser(links[i], configs).then(function (post) {
                              return post;
                            });
                          case 2:
                            post = _context.sent;
                            _context.next = 5;
                            return (0, _axios.default)(googleTranslate(configs.lang, 'ru', post.title)).then(function (resp) {
                              var i = 0;
                              var text = '';
                              if (resp.data[0] != null) while (resp.data[0][i]) {
                                text += resp.data[0][i][0];
                                i++;
                              }
                              post.title = text;
                            });
                          case 5:
                            delay(400);
                            _context.next = 8;
                            return (0, _axios.default)(googleTranslate(configs.lang, 'ru', post.text)).then(function (resp) {
                              var i = 0;
                              var text = '';
                              if (resp.data[0] != null) while (resp.data[0][i]) {
                                text += resp.data[0][i][0];
                                i++;
                              }
                              post.text = text;
                            });
                          case 8:
                            delay(400);
                            check = (post.text.match(/\%/g) || []).length; //console.log(check);
                            if (check < 10) _.country_post.push(post);else console.log('Ошибка перевода, пост не будет записан');
                            posts.push(post);
                            _context.next = 14;
                            return log(i + 1, count, 200);
                          case 14:
                          case "end":
                            return _context.stop();
                        }
                      }, _loop);
                    });
                    i = 0;
                  case 4:
                    if (!(i < count)) {
                      _context2.next = 9;
                      break;
                    }
                    return _context2.delegateYield(_loop(), "t0", 6);
                  case 6:
                    i++;
                    _context2.next = 4;
                    break;
                  case 9:
                    if (!posts.length) reject({
                      empty: "Empty getPosts() в переводе"
                    });
                    resolve(posts);
                  case 11:
                  case "end":
                    return _context2.stop();
                }
              }, _callee);
            }));
            return function (_x3, _x4) {
              return _ref3.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee2);
  }));
  return _getPosts.apply(this, arguments);
}