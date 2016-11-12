'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser() {
    _classCallCheck(this, Parser);

    this.Context = window.gsWeblangCore.Context;
    this.getParser = window.gsWeblangCore.getParser;
    console.log(window.gsWeblangCore);
  }

  _createClass(Parser, [{
    key: 'parse',
    value: function parse(sourceCode) {
      console.log('PARSING');
      console.log(sourceCode);
      return this.getParser().parse(sourceCode);
    }
  }, {
    key: 'interpret',
    value: function interpret(ast, initialState) {
      var context = this._createContext(initialState);
      ast.interpret(context);
      return context;
    }
  }, {
    key: '_createContext',
    value: function _createContext(initialState) {
      var context = new this.Context();
      context.board().sizeX = initialState.size.x;
      context.board().sizeY = initialState.size.y;
      context.init();

      _.assign(context.board(), {
        x: initialState.header.x,
        y: initialState.header.y,
        table: initialState.table
      });

      return context;
    }
  }]);

  return Parser;
}();
//# sourceMappingURL=parser.js.map
