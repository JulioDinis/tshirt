<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-row>
        <v-col v-for="produto in itens" :key="produto.id" :cols="4">
          <v-card elevation="24">
            <v-carousel hide-delimiters height="300px">
              <v-carousel-item
                v-for="(imagem, id) in produto.imagens"
                :key="id"
              >
                <v-img
                  :src="imagem.caminho"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="300px"
                >
                  <v-card-title v-text="produto.descricao" />
                </v-img>
              </v-carousel-item>
            </v-carousel>

            <v-card-subtitle> Valor: R$: {{ produto.valor }}</v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                icon
                placeholder="Editar Produto"
                @click="editar(produto.id)"
              >
                <v-icon color="blue darken-2">mdi-pencil</v-icon>
              </v-btn>

              <v-btn icon @click="excluir(produto.id)">
                <v-icon color="red darken-3">mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>

            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  components: {},
  props: {
    editar: {
      type: Function,
      default() {},
    },
    excluir: {
      type: Function,
      default() {},
    },
    itens: {
      type: Array,
      default() {},
    },
  },
  data: () => ({}),
  mounted() {},
  methods: {},
}
</script>
