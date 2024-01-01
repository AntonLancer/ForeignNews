"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Start_posts = Start_posts;
exports.country_post = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _parser = require("./parser");
var _fs = _interopRequireDefault(require("fs"));
var _configs = require("./configs");
var Country_massiv = [
//USA
[_configs.configs.NYTimes, _configs.configs.WashingtonPost, _configs.configs.TheHill],
//Denmark
[_configs.configs.Spiegel, _configs.configs.JungeFreiheit, _configs.configs.BerlinerMorgenpost],
//Japan
[_configs.configs.TheAsahiShimbun, _configs.configs.YomiuriShimbun, _configs.configs.MainichiShimbun],
//China
[
// configs.GlobalTimesCH,              
_configs.configs.China_com, _configs.configs.Janmin],
//Poland
[_configs.configs.GazetaPL, _configs.configs.NiezaleznaPL, _configs.configs.wPolitycePL]];
var filenameJS = '';
function saveInFile(json) {
  _fs.default.writeFile("../src/containers/".concat(filenameJS, ".json"), json, function (err) {
    if (err) console.log('File result is not saved');
  });
}
var country_post = [];
exports.country_post = country_post;
function Start_posts() {
  return _Start_posts.apply(this, arguments);
}
function _Start_posts() {
  _Start_posts = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var _loop, j;
    return _regenerator.default.wrap(function _callee2$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _loop = /*#__PURE__*/_regenerator.default.mark(function _loop(j) {
            var _loop2, i;
            return _regenerator.default.wrap(function _loop$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  exports.country_post = country_post = [];
                  _loop2 = /*#__PURE__*/_regenerator.default.mark(function _loop2(i) {
                    var web_site, web_links;
                    return _regenerator.default.wrap(function _loop2$(_context2) {
                      while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                          console.log(Country_massiv[j][i].name);
                          filenameJS = Country_massiv[j][i].filename;
                          web_site = Country_massiv[j][i].web;
                          web_links = Country_massiv[j][i].links;
                          _context2.next = 6;
                          return (0, _parser.parseLinks)(web_site, web_links, 5).then( /*#__PURE__*/function () {
                            var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(links) {
                              return _regenerator.default.wrap(function _callee$(_context) {
                                while (1) switch (_context.prev = _context.next) {
                                  case 0:
                                    _context.next = 2;
                                    return (0, _parser.getPosts)(links, Country_massiv[j][i]).then(function (posts) {
                                      return console.log(country_post);
                                    }).catch(function (e) {
                                      return console.log(e);
                                    });
                                  case 2:
                                  case "end":
                                    return _context.stop();
                                }
                              }, _callee);
                            }));
                            return function (_x) {
                              return _ref.apply(this, arguments);
                            };
                          }());
                        case 6:
                        case "end":
                          return _context2.stop();
                      }
                    }, _loop2);
                  });
                  i = 0;
                case 3:
                  if (!(i < Country_massiv[j].length)) {
                    _context3.next = 8;
                    break;
                  }
                  return _context3.delegateYield(_loop2(i), "t0", 5);
                case 5:
                  i++;
                  _context3.next = 3;
                  break;
                case 8:
                  saveInFile(JSON.stringify(country_post));
                case 9:
                case "end":
                  return _context3.stop();
              }
            }, _loop);
          });
          j = 0;
        case 2:
          if (!(j < Country_massiv.length)) {
            _context4.next = 7;
            break;
          }
          return _context4.delegateYield(_loop(j), "t0", 4);
        case 4:
          j++;
          _context4.next = 2;
          break;
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee2);
  }));
  return _Start_posts.apply(this, arguments);
}
Start_posts();

//  const headliner = '.headline relative gray-darkest pb-xs';
//'https://www.washingtonpost.com/?reload=true&_=1681590122812', `${headliner} h2 a`
//'http://russian.people.com.cn/31521/index.html', `.d2_08 tr a`
/*
РАБОЧИЙ ЗАПРОС  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

parseLinks('https://www.washingtonpost.com/?reload=true&_=1681590122812', 'h2 a', 7).then(links => {
  getPosts(links, configs.WashingtonPost).then(posts => saveInFile(JSON.stringify(posts))).catch(e => console.log(e));
});

*/

/*
const appendFile = json => {
  fs.appendFile(`../src/${filenameJS}.json`, json, err => {
    if (err) console.log('File result is not append');
  });
}*/

/*const getPost = async () => {
  return await Post.then(data => data);
};*/

//'.one_t tr a'
//npx babel src_server --out-dir dist_server && node dist_server/index.js