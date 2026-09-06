import { create } from 'zustand'
const baseUrl = 'http://localhost:3001/anecdotes'
const request = async (url, options) => { const response = await fetch(url, options); if (!response.ok) throw new Error(await response.text()); return response.json() }
const useAnecdoteStore = create((set, get) => ({
  anecdotes: [], filter: '', notification: '', timer: null,
  initialize: async () => set({ anecdotes: await request(baseUrl) }),
  createAnecdote: async (content) => { const anecdote = await request(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content, votes: 0 }) }); set(state => ({ anecdotes: state.anecdotes.concat(anecdote) })) },
  vote: async (anecdote) => { const updated = await request(`${baseUrl}/${anecdote.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 }) }); set(state => ({ anecdotes: state.anecdotes.map(item => item.id === updated.id ? updated : item) })); get().showNotification(`you voted '${anecdote.content}'`) },
  remove: async (id) => { await fetch(`${baseUrl}/${id}`, { method: 'DELETE' }); set(state => ({ anecdotes: state.anecdotes.filter(item => item.id !== id) })) },
  setFilter: filter => set({ filter }),
  showNotification: (notification, seconds = 5) => { clearTimeout(get().timer); const timer = setTimeout(() => set({ notification: '' }), seconds * 1000); set({ notification, timer }) }
}))
export const useAnecdotes = () => useAnecdoteStore(state => state.anecdotes)
export default useAnecdoteStore
