"use strict";

Polymer({
  is: "gobstones-editor",
  listeners: {
    "ace.editor-ready": "onAceReady",
    "ace.editor-content": "onContentChange",
    "iron-localstorage-load": "onLastCodeLoaded"
  },
  properties: {
    mode: { type: String, value: "main" },
    codeWasLoaded: { type: Boolean, value: false },
    code: {
      type: Object,
      observer: "_initializeCode"
    }
  },

  ready: function ready() {
    var _this = this;

    this._subscribeToBoards("initial-state", function (eventInfo) {
      _this._runCode(eventInfo.detail);
    });

    this.editor = this.$.ace.editor;
    this.parser = new Parser();

    this._setFatalities();

    this.stylist = new Stylist();
    this.setSize(14);
    $(window).resize(function () {
      _this._fixEditorHeight();
    });
  },

  setCode: function setCode(code) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "main";

    this.code[mode] = code;
    if (this.mode === mode) this.editor.setValue(code);
  },

  onAceReady: function onAceReady() {
    this.$.ace.editor.$blockScrolling = Infinity;
  },

  onContentChange: function onContentChange(content) {
    this.code[this.mode] = content.detail.value;
    this.$.localStorage.save();

    this.setAsDirty();
  },

  onLastCodeLoaded: function onLastCodeLoaded() {
    if (this.codeWasLoaded) return;
    this.editor.setValue(this.code.main);
    this.codeWasLoaded = true;
  },

  onRunCode: function onRunCode() {
    this._setMode("main");
    this.fire("execution-request");
  },

  setSize: function setSize(newSize) {
    var _this2 = this;

    this.customStyle["--editor-size"] = newSize + "px";
    this.updateStyles();
    setTimeout(function () {
      _this2._fixEditorHeight();
    }, 500);
  },

  toggleMode: function toggleMode() {
    this._setMode(this.mode === "main" ? "library" : "main");
  },

  setAsDirty: function setAsDirty() {
    this.editor.getSession().setAnnotations([]);
    this.fire("editor-dirty");
  },

  _runCode: function _runCode(initialState) {
    this.editor.getSession().clearAnnotations();

    try {
      var libraryAst = this._parse(this.code.library);
      if (libraryAst && libraryAst.error) return this._setMode("library");
    } catch (e) {/* library errors, bleh */}

    var sourceCode = this.code.library + "\n" + this.code.main;

    var ast = this._parse(sourceCode);
    if (ast.error) return;
    var context = this._interpret(ast, initialState);
    if (context.error || context.on) return;

    this.fire("execution-result", { context: context });
  },

  _parse: function _parse(sourceCode) {
    try {
      return this.parser.parse(sourceCode);
    } catch (e) {
      // Parser errors
      this._reportError(e, e.error);

      // var AceRange = ace.require('ace/range').Range;
      // this.editor.getSession().addMarker(new AceRange(e.on.range.start.row, e.on.range.start.column, e.on.range.end.row, e.on.range.end.column), "error-line", "fullLine", true)

      this.fire("compilation-error", e.error);
      return e;
    }
  },

  _interpret: function _interpret(ast, initialState) {
    try {
      return this.parser.interpret(ast, initialState);
    } catch (e) {
      // Runtime errors
      if (e.error) this._reportError(e, e.error, "info");

      // Business errors
      if (e.on) this._reportError(e, e.message, "info");

      this.fire("execution-error", e.message);
      return e;
    }
  },

  _reportError: function _reportError(e, message) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "error";

    console.log(e);
    this.editor.getSession().setAnnotations([{
      row: e.on.range.start.row - 1,
      column: 0,
      text: message,
      type: type
    }]);
  },

  _setMode: function _setMode(mode) {
    this.mode = mode;
    this.fire("mode-change", this.mode);
    this.editor.setValue(this.code[this.mode]);
    this.editor.focus();
  },

  _subscribeToBoards: function _subscribeToBoards(eventName, eventHandler) {
    this.async(function () {
      document.querySelector("#boards").addEventListener(eventName, eventHandler);
    });
  },

  _setFatalities: function _setFatalities() {
    var _this3 = this;

    var ace = this.$.ace;
    ace.editor.commands.addCommand({
      name: "run-code",
      bindKey: { win: "ctrl+enter", mac: "command+enter" },
      exec: function exec() {
        _this3.onRunCode();
      }
    });
  },

  _fixEditorHeight: function _fixEditorHeight() {
    this.stylist.correctEditorHeight(this.editor);
  },

  _initializeCode: function _initializeCode() {
    if (!this.code) this.code = { main: "", library: "" };
  }
});