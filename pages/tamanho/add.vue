<template>
  <div>
    <form-tamanho :submit-form="salvar" />
  </div>
</template>
<script>
import FormTamanho from '@/components/tamanho/FormTamanho'
export default {
  layout: 'adm',
  components: {
    FormTamanho,
  },
  methods: {
    async salvar(tamanho) {
      try {
        await this.$axios.post('/tamanho', tamanho).then((res) => {
          alert('Tamanho Cadastrado')
          this.$router.push({ name: 'tamanho' })
        })
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>
