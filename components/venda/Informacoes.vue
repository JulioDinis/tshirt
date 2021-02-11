<template>
  <v-container>
    <h1>{{ pedido.produto.descricao }}</h1>
    <form>
      <v-select
        v-model="pedido.tamanho"
        :items="tamanhos"
        label="Tamanho"
        required
      ></v-select>
      <v-text-field
        v-model="pedido.quantidade"
        type="number"
        label="Quantidade"
        min="0"
        required
      ></v-text-field>
      <v-btn class="mr-4" @click="submit(pedido)">
        Adicionar ao Carrinho
      </v-btn>
    </form>
    <v-spacer></v-spacer>
    <v-divider />
    <v-row>
      <v-col md="6">
        <v-text-field v-model="cep" type="texto" label="CEP" required>
        </v-text-field>
      </v-col>
      <v-col>
        <v-btn class="mr-4" color="secondary" @click="calcularFrete(cep)">
          Calcular Frete
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="frete > 0">
      <v-radio-group v-model="pedido.frete">
        <v-radio :value="frete">
          <template v-slot:label>
            <div>
              Entrega normal: R$
              <strong class="primary--text">{{ frete }}</strong
              >, receba em 15 dias uteis.
            </div>
          </template>
        </v-radio>
        <v-radio :value="parseFloat((frete + 20).toFixed(2))">
          <template v-slot:label>
            <div>
              Entrega Express: R$
              <strong class="primary--text">{{
                (frete + 20).toFixed(2)
              }}</strong
              >, receba em 14 dias uteis.
            </div>
          </template>
        </v-radio>
      </v-radio-group>
    </div>
    <div v-else><p>Informe o CEP para saber o valor do frete.</p></div>
  </v-container>
</template>
<script>
export default {
  props: {
    pedido: {
      type: Object,
      default() {},
    },
    submit: {
      type: Function,
      default() {},
    },
  },
  data: () => ({
    tamanhos: [],
    pedido_veio: {
      tamanho: '',
      quantidade: '',
      cor: '',
    },
    cep: '',
    frete: '',
  }),
  computed: {
    quantidade: {
      get() {
        return this.$store.state.carrinho.itens.quantidade
      },
      set(quantidade) {
        this.$store.commit('updateQuantidade', quantidade)
      },
    },
  },
  mounted() {
    this.initialize()
    this.$nextTick(function () {
      setInterval(() => {
        this.carregado = true
      }, 3000)
      // Código que irá rodar apenas após toda
      // a árvore do componente ter sido renderizada
    })
  },
  methods: {
    async initialize() {
      await this.$axios
        .get(`/tamanho/produto/${this.pedido.produto.id}`)
        .then((response) => {
          console.log(response.data)
          response.data.forEach((tamanho) => {
            this.$axios
              .get(`/tamanho/${tamanho.tamanhoId}`)
              .then((response) => {
                console.log(response.data[0].sigla)
                this.tamanhos.push(response.data[0].sigla)
              })
          })
        })
    },

    calcularFrete(cep) {
      if (this.pedido.frete === '') {
        if (cep !== '') {
          const calculo = Math.random() * (100 - 10) + 10
          this.frete = parseFloat(calculo.toFixed(2))
          this.pedido.frete = this.frete
        } else this.frete = 0
      } else this.frete = this.pedido.frete
    },
  },
}
</script>
