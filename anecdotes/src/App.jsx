import { useEffect } from 'react'
import useStore from './store'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
export default function App() { const initialize = useStore(state => state.initialize); const filter = useStore(state => state.filter); const setFilter = useStore(state => state.setFilter); const notification = useStore(state => state.notification); useEffect(() => { initialize() }, [initialize]); return <div><h2>Anecdotes</h2><div>filter <input data-testid="filter" value={filter} onChange={e => setFilter(e.target.value)} /></div><div data-testid="notification" style={{ display: notification ? '' : 'none' }}>{notification}</div><AnecdoteList /><AnecdoteForm /></div> }
