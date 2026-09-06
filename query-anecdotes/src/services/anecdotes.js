const baseUrl = 'http://localhost:3001/anecdotes'
const request = async (url, options) => { const response = await fetch(url, options); if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.error || 'request failed') } return response.json() }
export const getAnecdotes = () => request(baseUrl)
export const createAnecdote = content => request(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) })
export const updateAnecdote = anecdote => request(`${baseUrl}/${anecdote.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 }) })
