<template>
  <div>
    <div v-if="empty"><H1>Não existem Produtos Disponiveis</H1></div>
    <ProdutoList
      v-if="carregado"
      :itens="itens"
      :editar="editar"
      :excluir="excluir"
    />

    <dialog-delete
      :delete-document-dialog="deleteDocumentDialog"
      :deletar="deletar"
      :cancelar="fecharDialog"
      :selecionado="selecionado"
      :mensagem="mensagem"
      :botoes="mostrarBotoes"
    />
    <hr />
    <nuxt-link :to="`/produto/add`" class="btn btn-sm btn-primary">
      Adicionar
    </nuxt-link>
  </div>
</template>
<script>
import ProdutoList from '@/components/ProdutoList'
import DialogDelete from '@/components/DialogDelete'
export default {
  layout: 'adm',
  components: {
    DialogDelete,
    ProdutoList,
  },
  props: {},
  data() {
    return {
      carregado: false,
      itens: [
        {
          id: '',
          descricao: '',
          data_cadastro: '',
          valor: '',
          genero: '',
          imagens: [
            {
              caminho: '',
              produtoId: '',
            },
          ],
          cores: [
            {
              cor: '',
              produtoId: '',
            },
          ],
          tamanhos: [{}],
        },
      ],
      deleteDocumentDialog: false,
      selecionado: 0,
      mensagem: 'Você está certo disso?',
      mostrarBotoes: true,
      empty: false,
    }
  },
  watch: {
    itens(novosItens) {
      localStorage.itens = novosItens
      this.itens = novosItens
      if (this.itens.length > 0) {
      } else this.empty = true
    },
  },
  mounted() {
    this.initialize()
    this.$nextTick(function () {
      setInterval(() => {
        this.carregado = true
      }, 2000)
      // Código que irá rodar apenas após toda
      // a árvore do componente ter sido renderizada
    })
  },
  methods: {
    editar(id) {
      this.$router.push({ name: 'produto-id-edit', params: { id } })
    },
    excluir(id) {
      this.deleteDocumentDialog = true
      this.selecionado = id
    },
    fecharDialog() {
      this.deleteDocumentDialog = false
    },
    async deletar(id) {
      await this.$axios.delete(`/produto/${id}`).then((res) => {
        this.mensagem = 'Mal feito feito!'
        this.mostrarBotoes = false
        setTimeout(() => {
          this.fecharDialog()
          this.mostrarBotoes = true
          this.mensagem = 'Voce está certo disso?'
        }, 3000)
        this.$router.go(this.$router.currentRoute)
      })
    },
    async initialize() {
      await this.$axios.get('/produto').then((response) => {
        this.itens = response.data
        this.itens.forEach((element) => {
          this.buscaImagens(element)
        })
      })
    },
    async buscaImagens(produto) {
      await this.$axios.get(`/produto/img/${produto.id}`).then((img) => {
        produto.imagens = img.data
      })
    },
  },
}
</script>
