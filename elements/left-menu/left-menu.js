"use strict";

Polymer({
  is: 'left-menu',
  behaviors: [Polymer.AppLocalizeBehavior],
  properties: {
    language: { value: "es" },
    projectName: {
      type: String,
      value: "Program"
    }
  },

  attached: function attached() {
    var _this = this;

    this.loadResources(this.resolveUrl("../../locales.json"));
    this.loaders = {
      Project: new ProjectLoader(),
      Code: new CodeLoader(),
      Library: new LibraryLoader(),
      Attire: new AttireLoader()
    };

    ["Project", "Code", "Library", "Attire"].forEach(function (item) {
      _this["save" + item] = function () {
        _this.loaders[item].save(_this._context());
      };

      _this["load" + item] = function () {
        $("#" + item).click();
      };

      _this["onLoaded" + item] = function () {
        _this.loaders[item].read(_this._context(), event, function () {
          _this._closePanel();
        });
      };
    });
  },

  _closePanel: function _closePanel() {
    $("paper-drawer-panel")[0].togglePanel();
  },

  _context: function _context() {
    var _this2 = this;

    var query = function query(id) {
      return document.querySelector(id);
    };

    return {
      editor: query("#editor"),
      boards: query("#boards"),
      getProjectName: function getProjectName() {
        return _this2.projectName;
      },
      setProjectName: function setProjectName(name) {
        return _this2.projectName = name;
      }
    };
  }
});