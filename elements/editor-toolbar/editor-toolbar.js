"use strict";

Polymer({
  is: 'editor-toolbar',
  properties: {
    editorSize: {
      type: Number,
      value: 14
    },
    showBoards: {
      type: Boolean,
      value: true
    },
    showLibrary: {
      type: Boolean,
      value: false
    }
  },

  ready: function ready() {
    var _this = this;

    this.HOP_SIZE = 3;

    this.async(function () {
      _this._editor().addEventListener("mode-change", function (_ref) {
        var detail = _ref.detail;

        _this.showLibrary = detail === "library";
      });
    });
  },

  togglePanel: function togglePanel() {
    $("paper-drawer-panel")[0].togglePanel();
  },

  toggleShowBoards: function toggleShowBoards() {
    this.showBoards = !this.showBoards;
    this.fire("show-boards-changed", this.showBoards);
  },

  toggleLibrary: function toggleLibrary() {
    this._editor().toggleMode();
  },

  buttonCssClass: function buttonCssClass(element) {
    if (!this.domHost) return;
    return this.domHost.buttonCssClass(element);
  },

  moreSize: function moreSize() {
    this.editorSize += this.HOP_SIZE;
    this._updateSize();
  },

  lessSize: function lessSize() {
    this.editorSize -= this.HOP_SIZE;
    this._updateSize();
  },

  _updateSize: function _updateSize() {
    if (this.editorSize <= 8) return;
    this._editor().setSize(this.editorSize);
  },

  _editor: function _editor() {
    return document.querySelector("#editor");
  }
});