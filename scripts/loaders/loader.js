"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = function () {
  function Loader() {
    _classCallCheck(this, Loader);
  }

  _createClass(Loader, [{
    key: "save",
    value: function save(context) {
      this._saveText(this.getFile(context));
    }
  }, {
    key: "read",
    value: function read(context, event, callback) {
      var _this = this;

      this._readText(event, function (content, fileName) {
        if (!content || !fileName) return _this._clean(event);

        _this.readContent(context, content, fileName);
        callback();
      });
    }
  }, {
    key: "readIfNeeded",
    value: function readIfNeeded(context, path, getContent) {
      var _this2 = this;

      if (_.endsWith(path, this.SUFFIX)) {
        getContent().then(function (content) {
          _this2.readContentForProject(context, content);
        });
      }
    }
  }, {
    key: "readContentForProject",
    value: function readContentForProject(context, content) {
      this.readContent(context, content);
    }

    // SUFFIX; <<abstract>>
    // getFile(context); <<abstract>>
    // readContent(context, content, fileName); <<abstract>>

  }, {
    key: "_setCode",
    value: function _setCode(context, code, mode) {
      context.editor.setCode(code, mode);
    }
  }, {
    key: "_runCode",
    value: function _runCode(context) {
      context.editor.onRunCode();
    }
  }, {
    key: "_setAndRunCode",
    value: function _setAndRunCode(context, code, mode) {
      this._setCode(context, code, mode);
      this._runCode();
    }
  }, {
    key: "_getFile",
    value: function _getFile(context, content) {
      return {
        content: content,
        name: context.getProjectName() + this.SUFFIX
      };
    }
  }, {
    key: "_saveText",
    value: function _saveText(_ref) {
      var content = _ref.content,
          name = _ref.name;

      this._saveBlob(new Blob([content], { type: "text/plain" }), name);
    }
  }, {
    key: "_saveBlob",
    value: function _saveBlob(blob, name) {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = name;
      a.click();
    }
  }, {
    key: "_readText",
    value: function _readText(event, callback) {
      var _readLocalFile2 = this._readLocalFile(event),
          file = _readLocalFile2.file,
          fileName = _readLocalFile2.fileName;

      var reader = new FileReader();
      reader.onload = function () {
        var content = reader.result;
        callback(content, fileName);
      };
      reader.readAsText(file);
    }
  }, {
    key: "_readLocalFile",
    value: function _readLocalFile(event) {
      var file = _.first(event.target.files);
      var fileName = _.first(file.name.split("."));

      this._clean(event);
      return { file: file, fileName: fileName };
    }
  }, {
    key: "_clean",
    value: function _clean(event) {
      event.target.value = null;
    }
  }]);

  return Loader;
}();
//# sourceMappingURL=loader.js.map
