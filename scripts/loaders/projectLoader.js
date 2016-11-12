"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectLoader = function (_Loader) {
  _inherits(ProjectLoader, _Loader);

  function ProjectLoader() {
    _classCallCheck(this, ProjectLoader);

    var _this = _possibleConstructorReturn(this, (ProjectLoader.__proto__ || Object.getPrototypeOf(ProjectLoader)).call(this));

    _this.loaders = [new CodeLoader(), new LibraryLoader(), new AttireLoader()];
    return _this;
  }

  _createClass(ProjectLoader, [{
    key: "save",
    value: function save(context) {
      var _this2 = this;

      var files = this.loaders.map(function (loader) {
        return loader.getFile(context);
      });

      var zip = new JSZip();
      files.forEach(function (file) {
        zip.file(file.name, file.content);
      });

      zip.generateAsync({ type: "blob" }).then(function (content) {
        _this2._saveBlob(content, context.getProjectName() + ".gbp");
      });
    }
  }, {
    key: "read",
    value: function read(context, event, callback) {
      var _this3 = this;

      var _readLocalFile = this._readLocalFile(event),
          file = _readLocalFile.file,
          fileName = _readLocalFile.fileName;

      JSZip.loadAsync(file).then(function (zip) {
        zip.forEach(function (relativePath, zipEntry) {
          _this3._loadComponent(context, relativePath, zipEntry);
        });

        context.setProjectName(fileName);
        context.editor.setAsDirty();
        callback();
      });
    }
  }, {
    key: "_loadComponent",
    value: function _loadComponent(context, relativePath, zipEntry) {
      this.loaders.forEach(function (loader) {
        var getContent = function getContent() {
          return zipEntry.async("string");
        };
        loader.readIfNeeded(context, relativePath, getContent);
      });
    }
  }]);

  return ProjectLoader;
}(Loader);
//# sourceMappingURL=projectLoader.js.map
