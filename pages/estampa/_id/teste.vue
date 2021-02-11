<template>
  <div>
    {{ itens }}
    <v-list>
      <v-list-item
        v-for="(item, i) in itens"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>mdi-tshirt-v-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="itens.produto.title" />
          <v-text-field v-model="itens.quantidade" type="number"></v-text-field>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  data: () => ({
    itens: [],
  }),
  mounted() {
    this.$nextTick(function () {
      setInterval(() => {
        this.itens = this.$store.state.carrinho.itens
      }, 3000)
      // Código que irá rodar apenas após toda
      // a árvore do componente ter sido renderizada
    })
  },
  methods: {
    async login(usuario) {
      console.log(usuario)
      const data = usuario
      alert(data)
      try {
        const res = await this.$axios.post('/signin', data)
        console.log(res)
        this.$emit('meu-evento', {
          dados: {
            name: res.data.nome,
            job: 'developer',
          },
        })
      } catch (error) {
        alert(error)
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
