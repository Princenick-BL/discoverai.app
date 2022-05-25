import React from "react";

export const useAsync = fn => {
    const initialState = { loading: false, error: null, data: null };
    const stateReducer = (_, action) => {
      switch (action.type) {
        case 'start':
          return { loading: true, error: null, data: null };
        case 'finish':
          return { loading: false, error: null, data: action.data };
        case 'error':
          return { loading: false, error: action.error, data: null };
      }
    };
  
    const [state, dispatch] = React.useReducer(stateReducer, initialState);
  
    const run = async (args = null) => {
      try {
        dispatch({ type: 'start' });
        const data = await fn(args);
        dispatch({ type: 'finish', data });
      } catch (error) {
        dispatch({ type: 'error', error });
      }
    };
  
    return { ...state, run };
  };