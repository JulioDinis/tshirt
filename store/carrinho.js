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
  updateQuantidade(state, quantidade) {
    state.itens.quantidade = quantidade
  },
  adicionarEstampa(state, estampa) {
    state.itens.estampa = estampa
  },
}
