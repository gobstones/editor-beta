class Parser {
  constructor() {
    console.log(window.gsWeblangCore);

    this.Context = window.gsWeblangCore.Context;
    this.buildAst = window.gsWeblangCore.grammar.parse;
  }

  parse(sourceCode) {
    return this.buildAst(sourceCode);
  }

  interpret(ast, initialState) {
    const context = this._createContext(initialState);
    ast.interpret(context);
    return context;
  }

  _createContext(initialState) {
    const context = new this.Context();
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
}
