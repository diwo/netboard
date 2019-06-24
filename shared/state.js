(function() {
  /** @type { { amd: string, commonjs: string }[] } */
  const deps = [
    { amd: 'rxjs', commonjs: 'rxjs' }
  ];

  /**
   * @param { import('rxjs') } rxjs
   */
  function factory(rxjs) {
    return (initialState) => {
      let currentState = initialState;

      function toTransformer({isLocalSrc}) {
        return (changes) => {
          return (state) => {
            currentState = changes.reduce((prevState, change) => {
              let obj = prevState[change.id];
              let isLocalChange = isLocalSrc && obj.isAuthoritative;
              let isRemoteChange = !isLocalSrc && !obj.isAuthoritative;
              let isPredictiveChange = isLocalSrc && !obj.isAuthoritative;
              if (isLocalChange || isRemoteChange) {
                return applyChange(prevState, change, { isAuthoritative: true });
              } else if (isPredictiveChange) {
                return applyChange(prevState, change, { isAuthoritative: false });
              } else {
                return prevState;
              }
            }, state);
            return currentState;
          };
        };
      }

      function applyChange() {}

      return (input$, network$) => {
        return rxjs.merge(
          input$.pipe(rxjs.map(toTransformer({ isLocalSrc: true }))),
          network$.pipe(rxjs.map(toTransformer({ isLocalSrc: false })))
        ).pipe(rxjs.map(transform => transform(currentState)));
      };
    };
  }

  // UMD boilerplate
  if (typeof define === 'function' && define.amd) {
    // amd
    define(deps.map(d => d.amd), factory);
  } else if (typeof module === 'object' && module.exports) {
    // commonjs
    module.exports = factory(...deps.map(d => require(d.commonjs)));
  } else {
    throw Error('Unrecognized module loader');
  }
})();
