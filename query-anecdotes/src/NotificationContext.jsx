import { createContext, useContext, useReducer } from 'react'
const Context = createContext()
const reducer = (_state, action) => action.type === 'CLEAR' ? null : { text: action.text, error: action.error }
export const NotificationProvider = ({ children }) => { const [notification, dispatch] = useReducer(reducer, null); const show = (text, error = false) => { dispatch({ type: 'SET', text, error }); setTimeout(() => dispatch({ type: 'CLEAR' }), 5000) }; return <Context.Provider value={{ notification, show }}>{children}</Context.Provider> }
export const useNotification = () => useContext(Context)
