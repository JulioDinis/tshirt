<template>
  <div>
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
          <v-list-item-title v-text="item.itens.produto.descricao" />
          <v-text-field
            v-model="item.itens.quantidade"
            type="number"
            min="0"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  props: {
    itens: {
      type: Array,
      default() {},
    },
  },
  data: () => ({}),
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
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
