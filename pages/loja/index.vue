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
        <div v-if="empty">
          <p>Nenhuma estampa encontrada</p>
        </div>
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
      empty: false,
    }
  },
  watch: {
    busca(busca) {
      this.buscar(this.busca)
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
      let estampas
      await this.$axios.get(`/estampa/busca/${busca}`).then((response) => {
        estampas = response.data
        estampas.forEach((element) => {
          this.buscaImagens(element)
        })
      })
      this.itens = estampas
      console.log(this.itens)
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
