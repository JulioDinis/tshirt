<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center"><h1>Bem vindo!</h1></div>
      <form-cliente :submit="salvarbanco"></form-cliente>
    </v-col>
  </v-row>
</template>

<script>
// import VuetifyLogo from '~/components/VuetifyLogo.vue'
import FormCliente from '@/components/cliente/FormCliente'
export default {
  layout: 'loja',
  components: {
    // VuetifyLogo,
    FormCliente,
  },
  methods: {
    async salvarbanco(cliente) {
      console.log(cliente)
      const data = cliente
      alert(data)
      try {
        await this.$axios.post('/singup', data)
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>
