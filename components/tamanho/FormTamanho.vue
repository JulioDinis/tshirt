<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-radio-group v-model="tamanho.genero" row>
      <v-radio label="Masculino" value="masculino"></v-radio>
      <v-radio label="Feminino" value="feminino"></v-radio>
    </v-radio-group>
    <v-text-field v-model="tamanho.sigla" label="Sigla" required></v-text-field>
    <v-text-field
      v-if="bustoTorax"
      v-model="tamanho.busto_torax"
      :counter="10"
      :label="bustoTorax"
      required
    ></v-text-field>
    <v-text-field
      v-model="tamanho.cintura"
      label="Cintura"
      required
    ></v-text-field>
    <v-btn color="primary" class="mr-4" @click="submitForm(tamanho)">
      Salvar
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
  </v-form>
</template>
<script>
export default {
  layout: 'adm',
  props: {
    submitForm: {
      type: Function,
      default() {},
    },
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false,
    tamanho: {
      genero: '',
      busto_torax: '',
      cintura: '',
      sigla: '',
    },

    bustoTorax: '',
  }),
  watch: {
    'tamanho.genero'(novoGenero) {
      if (novoGenero === 'masculino') {
        this.bustoTorax = 'Torax'
      } else {
        this.bustoTorax = 'Busto'
      }
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
