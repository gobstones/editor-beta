"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CodeLoader = function (_Loader) {
  _inherits(CodeLoader, _Loader);

  function CodeLoader() {
    _classCallCheck(this, CodeLoader);

    var _this = _possibleConstructorReturn(this, (CodeLoader.__proto__ || Object.getPrototypeOf(CodeLoader)).call(this));

    _this.SUFFIX = ".code.gbs";
    return _this;
  }

  _createClass(CodeLoader, [{
    key: "getFile",
    value: function getFile(context) {
      var code = context.editor.code.main;
      return this._getFile(context, code);
    }
  }, {
    key: "readContent",
    value: function readContent(context, content, fileName) {
      context.setProjectName(fileName);
      this._setCode(context, content);
    }
  }, {
    key: "readContentForProject",
    value: function readContentForProject(context, content) {
      this._setCode(context, content);
    }
  }]);

  return CodeLoader;
}(Loader);
//# sourceMappingURL=codeLoader.js.map
