<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <div class="text-center">
        <h1>Agora Busque e Selecione um Modelo de Camiseta</h1>
      </div>
      <v-card>
        <v-text-field
          v-model="busca"
          label="Busca"
          placeholder="Busque aqui"
        ></v-text-field>
        <ProdutoList
          v-if="carregado"
          :itens="itens"
          :editar="redirecionar"
          :loja="true"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import VuetifyLogo from '~/components/VuetifyLogo.vue'
import ProdutoList from '@/components/ProdutoList'
export default {
  layout: 'loja',
  components: {
    ProdutoList,
    // VuetifyLogo,
  },
  data() {
    return {
      busca: '',
      itens: [],
      carregado: false,
      empty: false,
    }
  },
  watch: {
    busca(busca) {
      this.buscar(busca)
    },
    itens(novosItens) {
      this.carregado = false
      console.log('alterado')
      localStorage.itens = novosItens
      this.itens = novosItens
      if (this.itens.length > 0) {
        this.empty = false
        setInterval(() => {
          this.carregado = true
        }, 2000)
      } else this.empty = true
    },
  },
  methods: {
    async buscar(busca) {
      let produtos
      await this.$axios.get(`/produto/busca/${busca}`).then((response) => {
        produtos = response.data
        produtos.forEach((element) => {
          this.buscaImagens(element)
        })
      })
      this.itens = produtos
      console.log(this.itens)
    },
    async buscaImagens(produto) {
      await this.$axios.get(`/produto/img/${produto.id}`).then((img) => {
        produto.imagens = img.data
      })
    },
    redirecionar(id) {
      const estampa = this.$route.params.estampa
      this.$router.push({ name: 'produto-id-info', params: { id, estampa } })
    },
  },
}
</script>
