<template>
  <div>
    <estampa-form :submit-form="cadastro" />
  </div>
</template>
<script>
import EstampaForm from '@/components/EstampaForm'
export default {
  layout: 'adm',
  components: {
    EstampaForm,
  },
  data() {
    return {
      selectedFile: '',
    }
  },
  methods: {
    async cadastro(estampa) {
      const data = estampa
      try {
        await this.$axios.post('/estampa/add', data).then(() => {
          alert('Estampa Cadastrada')
          this.$router.push({ name: 'estampa' })
        })
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>
