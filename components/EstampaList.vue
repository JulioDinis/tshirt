<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-row>
        <v-col v-for="estampa in itens" :key="estampa.id" :cols="4">
          <v-card elevation="24">
            <v-carousel hide-delimiters height="300px">
              <v-carousel-item
                v-for="(imagem, id) in estampa.imagens"
                :key="id"
              >
                <v-img
                  :src="imagem.caminho"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="300px"
                >
                  <v-card-title v-text="estampa.descricao" />
                </v-img>
              </v-carousel-item>
            </v-carousel>

            <v-card-subtitle> Valor: R$: {{ estampa.valor }}</v-card-subtitle>

            <v-card-actions>
              <div v-if="loja">
                <v-btn icon placeholder="Selecionar" @click="action(estampa)">
                  <v-icon color="blue darken-2">mdi-cart</v-icon>
                </v-btn>
              </div>
              <div v-else>
                <v-btn @click="action(estampa.id)">Editar </v-btn>
              </div>
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
    loja: {
      type: Boolean,
      default: false,
    },
    action: {
      type: Function,
      default() {},
    },
  },
  data: () => ({}),
  mounted() {},
  methods: {},
}
</script>
