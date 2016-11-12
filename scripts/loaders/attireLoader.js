"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AttireLoader = function (_Loader) {
  _inherits(AttireLoader, _Loader);

  function AttireLoader() {
    _classCallCheck(this, AttireLoader);

    var _this = _possibleConstructorReturn(this, (AttireLoader.__proto__ || Object.getPrototypeOf(AttireLoader)).call(this));

    _this.SUFFIX = ".attire.json";
    return _this;
  }

  _createClass(AttireLoader, [{
    key: "getFile",
    value: function getFile(context) {
      var attire = context.boards.attire;
      return this._getFile(context, JSON.stringify(attire));
    }
  }, {
    key: "readContent",
    value: function readContent(context, content, fileName) {
      var attire = JSON.parse(content);
      if (attire && attire.name && attire.rules) context.boards.addOrSetAttire(attire);
    }
  }]);

  return AttireLoader;
}(Loader);
//# sourceMappingURL=attireLoader.js.map
