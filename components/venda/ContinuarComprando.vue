<template>
  <v-row justify="center">
    <v-dialog
      transition="dialog-bottom-transition"
      :value="dialog"
      persistent
      max-width="400"
      @input="$emit('evento')"
    >
      <v-card>
        <v-card-title color="primary">
          Produto Adicionado ao Carrinho
        </v-card-title>
        <v-card-text
          >O produto escolhido foi adicionado ao carrinho. Caso deseje continuar
          comprando clique em continuar comprando, caso queira finalizar a
          compra clique em finalizar Pedido</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray darken-1" text @click="finalizarPedido">
            Finalizar Pedido
          </v-btn>
          <v-btn color="red darken-1" text @click="continuarComprando">
            Continuar Comprando
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      teste: false,
    }
  },
  methods: {
    continuarComprando() {
      this.$emit('evento', {
        dados: {
          dialog: false,
          rota: 'loja',
        },
      })
    },
    finalizarPedido() {
      this.$emit('evento', {
        dados: {
          dialog: false,
          rota: 'pedido-add',
        },
      })
    },
  },
}
</script>
