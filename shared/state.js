(function() {
  /** @type { { amd: string, commonjs: string }[] } */
  const deps = [
    { amd: 'rxjs', commonjs: '../server/rxjs' }
  ];

  /**
   * @param { import('../types/rxjs') } rxjs
   */
  function factory(rxjs) {
    const { merge } = rxjs;
    const { map, scan } = rxjs.operators;

    return (initialState) => {
      return (input$, network$) => {
        return merge(
          input$.pipe(map(toTransformer({ isLocalChange: true }))),
          network$.pipe(map(toTransformer({ isLocalChange: false })))
        ).pipe(scan((state, transform) => transform(state), initialState));
      };
    };

    function toTransformer({ isLocalChange }) {
      return (changes) => {
        return (state) => {
          return changes.reduce((prevState, change) => {
            let prevObj = prevState[change.id];
            let updateStrategy = getUpdateStrategy({
              isLocalChange,
              isLocalAuthority: obj.isLocalAuthority
            });
            return {
              ...prevState,
              [change.id]: updateStrategy(prevObj, change.data)
            };
          }, state);
        };
      };
    }

    function getUpdateStrategy({ isLocalChange, isLocalAuthority }) {
      let isFinal = (isLocalChange && isLocalAuthority) || (!isLocalChange && !isLocalAuthority);
      let isPredictive = isLocalChange && !isLocalAuthority;
      if (!isFinal && !isPredictive) {
        return obj => obj;
      }
      return (obj, data) => {
        return updateObject(obj, data, { isFinal });
      };
    }

    function updateObject(obj, data, { isFinal }) {
      // ???
    }
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
