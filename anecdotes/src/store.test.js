import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import useStore from './store'
const initial = [{ id: 'one', content: 'First anecdote', votes: 2 }, { id: 'two', content: 'Second anecdote', votes: 0 }]
const respond = value => vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => value }))
beforeEach(() => { vi.useFakeTimers(); useStore.setState({ anecdotes: [], filter: '', notification: '', timer: null }) })
afterEach(() => { vi.clearAllTimers(); vi.useRealTimers(); vi.unstubAllGlobals() })
describe('anecdote store', () => {
  it('initializes with the backend anecdotes', async () => {
    respond(initial)
    await useStore.getState().initialize()
    expect(useStore.getState().anecdotes).toEqual(initial)
  })
  it('adds the saved anecdote without changing existing entries', async () => {
    useStore.setState({ anecdotes: initial })
    const created = { id: 'three', content: 'A new anecdote', votes: 0 }
    respond(created)
    await useStore.getState().createAnecdote(created.content)
    expect(useStore.getState().anecdotes).toEqual([...initial, created])
  })
  it('updates only the voted anecdote and shows a notification', async () => {
    useStore.setState({ anecdotes: initial })
    respond({ ...initial[0], votes: 3 })
    await useStore.getState().vote(initial[0])
    expect(useStore.getState().anecdotes).toEqual([{ ...initial[0], votes: 3 }, initial[1]])
    expect(initial[0].votes).toBe(2)
    expect(useStore.getState().notification).toContain(initial[0].content)
    vi.advanceTimersByTime(5000)
    expect(useStore.getState().notification).toBe('')
  })
  it('removes the requested anecdote', async () => {
    useStore.setState({ anecdotes: initial })
    respond({})
    await useStore.getState().remove('two')
    expect(useStore.getState().anecdotes).toEqual([initial[0]])
  })
  it('updates the filter and gives replacement notifications their full timeout', () => {
    useStore.getState().setFilter('First')
    expect(useStore.getState().filter).toBe('First')
    useStore.getState().showNotification('first')
    vi.advanceTimersByTime(3000)
    useStore.getState().showNotification('second')
    vi.advanceTimersByTime(2000)
    expect(useStore.getState().notification).toBe('second')
    vi.advanceTimersByTime(3000)
    expect(useStore.getState().notification).toBe('')
  })
})
