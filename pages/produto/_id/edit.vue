<template>
  <produto-form
    :salvar="salvar"
    :produto="produto"
    :novas-imagens="novasImagens"
  />
</template>

<script>
import ProdutoForm from '@/components/ProdutoForm'
export default {
  layout: 'adm',
  components: {
    ProdutoForm,
  },
  data: () => ({
    produto: {
      descricao: ' ',
      valor: ' ',
      genero: ' ',
      imagens: [],
      novasImagens: [],
    },
    novasImagens: [],
    valid: true,
  }),
  watch: {
    novasImagens(novasImagens) {
      this.produto.novasImagens = novasImagens
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
      await this.$axios
        .get(`/produto/${this.$route.params.id}`)
        .then((response) => {
          this.produto = response.data[0]
        })
    },
  },
}
</script>
