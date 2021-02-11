<template>
  <div>
    <estampa-form :novo="false" :submit-form="editar" />
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
      estampa: '',
    }
  },
  methods: {
    async editar(estampa) {
      const data = estampa
      try {
        await this.$axios
          .put(`/estampa/${this.$route.params.id}`, data)
          .then(() => {
            alert('Alteração realizada com sucesso')
            this.$router.push({ name: 'estampa' })
          })
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>
