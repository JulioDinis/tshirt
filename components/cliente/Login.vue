<template>
  <v-container align="center" class="grey lighten-5 mb-6">
    <v-row align="center" no-gutters style="height: auto">
      <v-col>
        <v-card class="pa-2" outlined tile>
          <div v-if="!this.$auth.$storage.getUniversal('usuarioLogado')">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="usuario.email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

              <v-text-field
                v-model="usuario.senha"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                name="senha"
                label="Senha"
                required
                counter="16"
                @click:append="show = !show"
              >
              </v-text-field>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-12"
                align="center"
                @click="login(usuario)"
              >
                Login
              </v-btn>
              <v-btn color="warning" @click="resetValidation">
                Cadastre-se
              </v-btn>
            </v-form>
          </div>
          <div v-else>
            <p>
              {{ this.$auth.$storage.getUniversal('usuarioLogado').nome }}
            </p>
            <v-btn icon @click="logOut()">
              <v-icon>mdi-cart-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    usuario: {
      email: '',
      senha: '',
    },
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    show: false,
  }),

  methods: {
    async login(usuario) {
      console.log(usuario)
      const data = usuario
      alert(data)
      try {
        const res = await this.$axios.post('/signin', data)
        console.log(res)
        this.$emit('meu-evento', res.data)
      } catch (error) {
        alert(error)
      }
    },
    logOut() {
      const usuarioLogado = this.$auth.$storage.getUniversal('usuarioLogado')
      console.log(usuarioLogado)
      this.$auth.$storage.removeUniversal('usuarioLogado')
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
