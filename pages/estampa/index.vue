<template>
  <div>
    <div v-if="empty"><H1>Não existem Estampas cadastradas</H1></div>
    <estampa-list v-if="carregado" :itens="itens" :action="editar" />
    <div v-else>
      <carregando />
    </div>
    <add-button />
    <nuxt-link :to="`/estampa/add`" class="btn btn-sm btn-primary">
      Adicionar
    </nuxt-link>
  </div>
</template>
<script>
import AddButton from '@/components/AddButton'
import EstampaList from '@/components/EstampaList'
import Carregando from '@/components/Carregando'
import { mapMutations } from 'vuex'
export default {
  layout: 'adm',
  components: {
    EstampaList,
    AddButton,
    Carregando,
  },
  data() {
    return {
      carregado: false,
      empty: false,
      itens: [
        {
          id: '',
          dataLancamento: '',
          descricao: '',
          valor: '',
          imagens: [
            {
              caminho: '',
              estampaId: '',
            },
          ],
        },
      ],
      seila: '',
    }
  },
  computed: {
    todos() {
      return this.$store.state.estampas.list
    },
  },
  watch: {
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
  mounted() {
    if (this.$store.estampas) {
      this.itens = this.$store.estampas
    } else {
      this.initialize()
    }
  },
  methods: {
    editar(id) {
      this.$router.push({ name: 'estampa-id-edit', params: { id } })
      //  /estampa/${estampa.id}/edit/`
    },
    excluir() {},
    addTodo(e) {
      this.$store.commit('estampas/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle',
    }),
    initialize() {
      this.$axios.get('/estampa').then((response) => {
        this.itens = response.data
        this.$store.commit('estampas/add', this.itens)
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
  },
}
</script>
