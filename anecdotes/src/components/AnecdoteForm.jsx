import useStore from '../store'
export default function AnecdoteForm() { const create = useStore(state => state.createAnecdote); const submit = event => { event.preventDefault(); const content = event.target.anecdote.value; event.target.reset(); create(content) }; return <><h2>create new</h2><form onSubmit={submit}><input name="anecdote" /><button>create</button></form></> }
