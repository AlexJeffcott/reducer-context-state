import React, {
  createContext,
  FC,
  useContext,
  useReducer
} from 'react'
import type {
  State,
  ContextType,
  ActionHandlers,
  Actions,
  Item,
  Items,
  ProviderType
} from './types'
/***
 * DESCRIPTION
 * This combines a state machine pattern (reducer) combined with the provider pattern (here using React's context).
 * This implementation further utilises the 'action handler' pattern, rather than exposing the dispatch directly.
 *
 * USAGE
 * Add <ListProvider></ListProvider> as a wrapper anywhere above the component that uses the useListReducer() custom hook.
 */

const initialState: State = {
  items: []
}

const stateInitializer = (
  _initialState: State
): State => {
  return {
    ..._initialState
  }
}

const Context = createContext<ContextType>([
  stateInitializer(initialState),
  {} as ActionHandlers
])

const useListReducer = (): ContextType => useContext(Context)

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'addItem': {
      return {
        ...state,
        items: [
          ...state.items.filter((l) => l.title !== action.item.title),
          action.item
        ]
      }
    }
    case 'removeItem': {
      return {
        ...state,
        items: state.items.filter((l: Item): boolean => l.id !== action.itemId)
      }
    }
    case 'updateItem': {
      return {
        ...state,
        items: state.items.reduce((items: Items, item: Item): Items => {
          if (item.id === action.item.id) return [...items, action.item]
          return [...items, item]
        }, [])
      }
    }
  }
}

const ListProvider: FC<ProviderType> = ({ children }) => {
  const [state, dispatch]: [
    State,
    React.Dispatch<Actions>
  ] = useReducer(reducer, initialState, stateInitializer)

  const actionHandlers: ActionHandlers = {
    addItem: (item) => dispatch({ type: 'addItem', item }),
    removeItem: (itemId) => dispatch({ type: 'removeItem', itemId }),
    updateItem: (item) => dispatch({ type: 'updateItem', item })
    }
  }

  return (
    <Context.Provider value={[state, actionHandlers]}>
      {children}
    </Context.Provider>
  )
}

export { useListReducer, ListProvider }
