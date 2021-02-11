<template>
  <form>
    <v-text-field
      v-model="cliente.name"
      :error-messages="nomeErrors"
      :counter="10"
      label="Nome"
      required
      @input="$v.cliente.name.$touch()"
      @blur="$v.cliente.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="cliente.sobrenome"
      :error-messages="sobrenomeErrors"
      :counter="20"
      label="Sobrenome"
      requerid
      @input="$v.cliente.sobrenome.$touch()"
      @blur="$v.cliente.sobrenome.$touch()"
    >
    </v-text-field>
    <v-text-field
      v-model="cliente.telefone"
      :error-messages="telefoneErrors"
      :counter="15"
      label="Telefone"
      required
      @input="$v.cliente.telefone.$touch()"
      @blur="$v.cliente.telefone.$touch()"
    >
    </v-text-field>
    <v-text-field
      v-model="cliente.cpf"
      :error-messages="cpfErrors"
      :counter="14"
      label="CPF"
      required
      @input="$v.cliente.cpf.$touch()"
      @blur="$v.cliente.cpf.$touch()"
    >
    </v-text-field>
    <v-select
      v-model="cliente.sexo"
      :items="items"
      :error-messages="sexoErrors"
      label="Sexo"
      dense
      required
    ></v-select>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="cliente.dataNascimento"
          label="Data de Nascimento"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="cliente.dataNascimento"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="cliente.email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.cliente.email.$touch()"
      @blur="$v.cliente.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="cliente.senha"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :error-messages="senhaErrors"
      :type="show ? 'text' : 'password'"
      name="senha"
      label="Senha"
      required
      :counter="16"
      @click:append="show = !show"
      @input="$v.cliente.senha.$touch()"
      @blur="$v.cliente.senha.$touch()"
    >
    </v-text-field>
    <v-text-field
      v-model="cliente.confirmaSenha"
      :append-icon="verConfirmacao ? 'mdi-eye' : 'mdi-eye-off'"
      :error-messages="confirmaSenhaErrors"
      :type="verConfirmacao ? 'text' : 'password'"
      name="confirmaSenha"
      label="Confirme a senha"
      required
      :counter="16"
      @click:append="verConfirmacao = !verConfirmacao"
      @input="$v.cliente.confirmaSenha.$touch()"
      @blur="$v.cliente.confirmaSenha.$touch()"
    >
    </v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Aceito os Termos e condições e autorizo o uso de meus dados de acordo com a Declaração de privacidade."
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn color="warning" @click="clear"> Limpar </v-btn>
    <v-btn class="mr-4 primary" @click="submit(cliente)"> Cadastrar </v-btn>
  </form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
} from 'vuelidate/lib/validators'
const regexTelefone = helpers.regex(
  'telefone',
  /(\(?\d{2}\)?\s)?(\d{4,5}-? ?\d{4})/
)
const regexCpf = helpers.regex('cpf', /\d{3}.?\d{3}.?\d{3}-?\d{2}/)
const regexRg = helpers.regex('rg', /\d/)
const regexSenha = helpers.regex(
  'senha',
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$!*&@#])[0-9a-zA-Z$*!&@#](?:([0-9a-zA-Z$!*&@#])(?!\\1)){8,16}$/
)
const verifica = () => {
  return false
}
export default {
  mixins: [validationMixin],
  props: {
    submit: {
      type: Function,
      default() {},
    },
  },
  validations: {
    cliente: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15),
      },
      sobrenome: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30),
      },
      telefone: {
        required,
        maxLength: maxLength(15),
        regexTelefone,
      },
      cpf: {
        required,
        maxLength: maxLength(14),
        regexCpf,
      },
      rg: {
        maxLength: maxLength(12),
        minLength: minLength(9),
        regexRg,
      },
      sexo: {
        required,
      },
      email: { required, email },
      senha: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(8),
        regexSenha,
      },
      confirmaSenha: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(8),
        regexSenha,
        verifica,
      },
    },

    checkbox: {
      checked(val) {
        return val
      },
    },
  },

  data: () => ({
    cliente: {
      name: '',
      sobrenome: '',
      telefone: '',
      cpf: '',
      dataNascimento: null,
      rg: '',
      sexo: '',
      email: '',
      senha: '',
      confirmaSenha: '',
    },
    menu: false,
    verificaSenha: true,
    show: false,
    verConfirmacao: false,
    items: ['Masculino', 'Feminino'],
    checkbox: false,
  }),

  computed: {
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('Voce Precisa Aceitar os termos')
      return errors
    },
    nomeErrors() {
      const errors = []
      if (!this.$v.cliente.name.$dirty) return errors
      !this.$v.cliente.name.maxLength &&
        errors.push('O nome pode ter no máximo 15 caracteres')
      !this.$v.cliente.name.minLength &&
        errors.push('O nome precisa ter no minimo 3 caracteres')
      !this.$v.cliente.name.required &&
        errors.push('Nome não pode ficar em branco.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.cliente.email.$dirty) return errors
      !this.$v.cliente.email.email && errors.push('Insira um e-mail valido')
      !this.$v.cliente.email.required &&
        errors.push('E-mail não pode ficar em branco.')
      return errors
    },
    sobrenomeErrors() {
      const errors = []
      if (!this.$v.cliente.sobrenome.$dirty) return errors
      !this.$v.cliente.sobrenome.maxLength &&
        errors.push('Máximo de 20 caracteres')
      !this.$v.cliente.sobrenome.minLength &&
        errors.push('O sobrenome precisa de no minimo 3 caracteres')
      !this.$v.cliente.sobrenome.required &&
        errors.push('Sobrenome não pode ficar em branco.')
      return errors
    },
    telefoneErrors() {
      const errors = []
      if (!this.$v.cliente.telefone.$dirty) return errors
      !this.$v.cliente.telefone.maxLength &&
        errors.push('Máximo de 15 caracteres')
      !this.$v.cliente.telefone.regexTelefone &&
        errors.push('Digite um número de telefone Valido')
      !this.$v.cliente.telefone.required &&
        errors.push('Telefone não pode ficar em branco')
      return errors
    },
    cpfErrors() {
      console.log(this.$v)
      const errors = []
      if (!this.$v.cliente.cpf.$dirty) return errors
      !this.$v.cliente.cpf.maxLength && errors.push('Máximo de 14 caracteres')
      !this.$v.cliente.cpf.regexCpf && errors.push('CPF Invalido!')
      !this.$v.cliente.cpf.required &&
        errors.push('CPF não pode ficar em branco')
      return errors
    },
    sexoErrors() {
      const errors = []
      if (!this.$v.cliente.sexo.$dirty) return errors
      !this.$v.cliente.sexo.required &&
        errors.push('Sexo não pode ficar em branco')
      return errors
    },
    senhaErrors() {
      const errors = []
      if (!this.$v.cliente.senha.$dirty) return errors
      !this.$v.cliente.senha.maxLength &&
        errors.push('A senha deve ter no máximo de 16 caracteres')
      !this.$v.cliente.senha.minLength &&
        errors.push('A senha deve possuir ao menos 8 caracteres')
      !this.$v.cliente.senha.regexSenha &&
        errors.push(
          'A senha deve possuir ao menos: 1 letra maiúscula, 1 letra minuscula, e um carater especial($*&!@#)'
        )
      !this.$v.cliente.senha.required &&
        errors.push('Senha não pode ficar em branco')
      return errors
    },
    confirmaSenhaErrors() {
      const errors = []
      if (!this.$v.cliente.confirmaSenha.$dirty) return errors
      !this.$v.cliente.confirmaSenha.maxLength && errors.push('as')
      !this.$v.cliente.confirmaSenha.required &&
        errors.push('Confirmar sena não pode ficar em branco')
      if (!this.validaSenha(this.cliente.confirmaSenha)) {
        errors.push('As senhas não são iguais')
      }
      return errors
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
    clear() {
      this.$v.$reset()
      this.cliente.name = ''
      this.cliente.sobrenome = ''
      this.cliente.telefone = ''
      this.cliente.cpf = ''
      this.cliente.rg = ''
      this.cliente.senha = ''
      this.cliente.confirmaSenha = ''
      this.cliente.sexo = ''
      this.cliente.email = ''
      this.cliente.select = null
      this.cliente.checkbox = false
      this.cliente.dataNascimento = null
    },
    validaSenha(confirmacao) {
      if (this.cliente.senha === confirmacao) return true
      else return false
    },
  },
}
</script>
