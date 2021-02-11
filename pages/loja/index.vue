<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <div class="text-center"><h1>Busque ou Selecione uma Estampa</h1></div>
      <v-card>
        <v-text-field
          v-model="busca"
          label="Busca"
          placeholder="Busque aqui"
        ></v-text-field>
        <EstampaList
          v-if="carregado"
          :itens="itens"
          :loja="true"
          :action="redirecionar"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import VuetifyLogo from '~/components/VuetifyLogo.vue'
import EstampaList from '@/components/EstampaList'
export default {
  layout: 'loja',
  components: {
    EstampaList,
    // VuetifyLogo,
  },
  data() {
    return {
      busca: '',
      itens: [],
      carregado: false,
    }
  },
  watch: {
    busca(busca) {
      this.buscar(this.busca)
    },
    itens(novosItens) {
      localStorage.itens = novosItens
      this.itens = novosItens
      if (this.itens.length > 0) {
        setInterval(() => {
          this.carregado = true
        }, 3000)
      } else this.empty = true
      setInterval(() => {
        this.carregado = true
      }, 3000)
    },
  },
  methods: {
    buscar(busca) {
      this.$axios.get(`/estampa/busca/${busca}`).then((response) => {
        this.itens = response.data
        this.itens.forEach((element) => {
          this.buscaImagens(element)
        })
      })
    },
    async buscaImagens(estampa) {
      await this.$axios.get(`/estampa/img/${estampa.id}`).then((img) => {
        estampa.imagens = img.data
      })
    },
    redirecionar(estampa) {
      //  this.$store.commit('carrinho/add', estampa)
      this.$router.push({
        name: 'loja-estampa-selecionar_produto',
        params: { estampa },
      })
    },
  },
}
</script>
