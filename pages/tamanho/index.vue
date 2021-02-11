<template>
  <div>
    <v-list-group :value="true" no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>Tamanhos Cadastrado</v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item v-for="(tamanho, i) in tamanhoList" :key="i" link>
        <v-list-item-title v-text="tamanho.sigla"></v-list-item-title>
        <v-list-item-title v-text="tamanho.genero"></v-list-item-title>
        <v-list-item-title v-text="tamanho.cintura"></v-list-item-title>
        <v-list-item-icon>
          <v-icon v-text="icon"></v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>

    <nuxt-link :to="`/tamanho/add`" class="btn btn-sm btn-primary">
      Adicionar
    </nuxt-link>
  </div>
</template>
<script>
export default {
  layout: 'adm',
  data() {
    return {
      tamanhoList: [],
    }
  },
  mounted() {
    this.carregar()
  },
  methods: {
    async carregar() {
      await this.$axios.get('/tamanho').then((response) => {
        this.tamanhoList = response.data
      })
    },
  },
}
</script>
