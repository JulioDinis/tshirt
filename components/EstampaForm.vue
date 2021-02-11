<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="estampa.descricao"
      :counter="20"
      :rules="descricaoRules"
      label="Descricao"
      required
      :prepend-icon="mdiDescricao"
    ></v-text-field>

    <v-text-field
      v-model="estampa.valor"
      label="Valor"
      required
      :prepend-icon="mdiValor"
      :rules="valorRules"
    ></v-text-field>
    <file-input
      label="Imagens da Estampa"
      placeholder="Selecione fotos da estampa"
      :imagens-list="estampa.novasImagens"
    />
    <v-carousel height="300px">
      <v-carousel-item v-for="(imagem, id) in estampa.imagens" :key="id">
        <v-chip class="ma-2" color="red" text-color="white" align="center">
          Remover {{ id }}
          <v-icon large right> mdi-delete </v-icon>
        </v-chip>
        <v-img
          :src="imagem.caminho"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="300px"
        >
          <v-card-title v-text="estampa.descricao" />
        </v-img>
      </v-carousel-item>
    </v-carousel>

    <v-btn color="success" @click="submitForm(estampa)">
      {{ novo ? 'Salvar' : 'Alterar' }}
    </v-btn>

    <v-btn v-show="novo" color="error" class="mr-4" @click="reset">
      Reset Form
    </v-btn>

    <v-btn v-show="novo" color="warning" @click="resetValidation">
      Reset Validation
    </v-btn>
  </v-form>
</template>
<script>
import FileInput from '@/components/FileInput'
import { mdiImageText, mdiCurrencyUsd } from '@mdi/js'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { FileInput },
  props: {
    submitForm: {
      type: Function,
      default() {},
    },
    novo: {
      type: Boolean,
      default: true,
    },
    deletarImagen: {
      type: Function,
      default() {},
    },
    alterarEstampa: {
      type: Function,
      default() {},
    },
  },
  data: () => ({
    mdiDescricao: mdiImageText,
    mdiValor: mdiCurrencyUsd,
    estampa: {
      descricao: '',
      valor: '',
      imagens: [],
      id: '',
      novasImagens: [],
    },

    imagens: [],
    selectedFiles: [],
    valid: true,
    descricaoRules: [
      (v) => !!v || 'É obrigatório informar a descrição da estampa',
      (v) => (v && v.length <= 50) || 'Descrição precisa ser menor que 50',
    ],
    valorRules: [(v) => !!v || 'É obrigatório informar o valor da estampa'],
  }),
  watch: {
    'estampa.valor'(nv) {
      if (Number.isNaN(Number.parseFloat(nv))) {
        this.estampa.valor = 0
        alert(nv)
      }
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.$axios.get(`/estampa/${this.$route.params.id}`).then((response) => {
        this.estampa.descricao = response.data[0].descricao
        this.estampa.valor = response.data[0].valor
        this.estampa.id = response.data[0].id
        this.estampa.imagens = []
      })
      this.$axios.get(`/estampa/img/${this.$route.params.id}`).then((img) => {
        this.estampa.imagens = img.data
      })
    }
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
