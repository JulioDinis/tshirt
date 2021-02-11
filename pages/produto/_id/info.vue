<template>
  <div v-if="carregado">
    <v-row no-gutters>
      <v-col md="4">
        <Carrousel :produto="pedido.produto" />
      </v-col>
      <v-col md="1"> <v-divider vertical></v-divider> </v-col>
      <v-col md="7">
        <Informacoes :pedido="pedido" :submit="adicionarCarrinho" />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <h1>Informações</h1>
        <v-divider />

        <p>dasdosadosdjas asdasd camiseta shado ehso dalsho</p>
        <v-divider></v-divider>
        <p>asdahsdkasdakdjl</p>
      </v-col>
    </v-row>
    <ContinuarComprando :dialog="mensagem" @evento="mostrar" />
  </div>
  <div v-else>
    <carregando />
  </div>
</template>

<script>
import Carrousel from '@/components/venda/Carrousel'
import Informacoes from '@/components/venda/Informacoes'
import ContinuarComprando from '@/components/venda/ContinuarComprando'
import Carregando from '~/components/Carregando.vue'
export default {
  layout: 'loja',
  components: {
    Carregando,
    Carrousel,
    Informacoes,
    ContinuarComprando,
  },
  data: () => ({
    carregado: false,
    pedido: {
      produto: {
        id: '',
        descricao: ' ',
        valor: ' ',
        genero: ' ',
        imagens: [],
      },
      tamanho: '',
      quantidade: '',
      cor: '',
      frete: '',
    },
    novasImagens: [],
    mensagem: false,
    valid: true,
    zoomerOptions: {
      zoomFactor: 3, // scale for zoomer
      pane: 'pane', // three type of pane ['pane', 'container-round', 'container']
      hoverDelay: 300, // how long after the zoomer take effect
      namespace: 'zoomer', // add a namespace for zoomer component, useful when on page have mutiple zoomer
      move_by_click: false, // move image by click thumb image or by mouseover
      scroll_items: 5, // thumbs for scroll
      choosed_thumb_border_color: '#bbdefb', // choosed thumb border color
      scroller_button_style: 'line',
      scroller_position: 'left',
      zoomer_pane_position: 'right',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    },
  }),
  watch: {
    produto(novosItens) {
      setInterval(() => {
        this.carregado = true
      }, 500)
    },
  },
  mounted() {
    this.initialize()
  },
  methods: {
    adicionarCarrinho(produto) {
      this.$store.commit('carrinho/add', produto)
      this.mensagem = true
      // this.$router.push({ name: 'index' })
      console.log(this.$store.state.carrinho.itens)
    },
    async salvar(arquivos) {
      try {
        await this.$axios
          .put(`/produto/${this.$route.params.id}`, this.produto)
          .then((res) => {
            alert('Alterações Realizadas') // mudar para toast depois
            this.$router.push({ name: 'produto' })
          })
      } catch (error) {
        alert(error)
      }
    },
    async initialize() {
      this.pedido.estampa = this.$route.params.estampa
      await this.$axios
        .get(`/produto/${this.$route.params.id}`)
        .then((response) => {
          this.pedido.produto = response.data[0]
          this.buscaImagens(this.pedido.produto)
          setInterval(() => {
            this.carregado = true
          }, 500)
        })
    },
    async buscaImagens(produto) {
      await this.$axios.get(`/produto/img/${produto.id}`).then((img) => {
        this.pedido.produto.imagens = img.data
      })
    },
    mostrar(payload) {
      this.mensagem = payload.dados.dialog
      this.$router.push({ name: payload.dados.rota })
    },
  },
}
</script>
