export const state = () => ({
  itens: [],
})

export const mutations = {
  add(state, itens) {
    state.itens.push({
      itens,
    })
  },
  remove(state, { todo }) {
    state.itens.splice(state.itens.indexOf(todo), 1)
  },
}
