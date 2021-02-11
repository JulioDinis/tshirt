<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Cadastrar novo endereço
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Novo Endereço</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="endereco.destinatario"
                  label="Destinatario*"
                  required
                  hint="Ex: Jõao Pedro"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field
                  v-model="endereco.rua"
                  label="Rua*"
                  hint="Ex: Rua do Zero"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="endereco.numero"
                  label="Numero*"
                  hint="Ex: 0"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="endereco.complemento"
                  label="Complemento"
                  hint="Ex: casa, apartamento..."
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="endereco.bairro"
                  label="Bairro*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="endereco.cep"
                  label="CEP*"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field
                  v-model="endereco.cidade"
                  label="Cidade*"
                  hint="Ex: Presidente Epitácio"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="endereco.estado"
                  :items="estados"
                  label="Estado*"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>Campos com * são obrigatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="salvar(endereco)">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    estados: [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MS',
      'MT',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
    ],
    endereco: {
      destinatario: '',
      complemento: '',
      rua: '',
      numero: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
      cliente: '',
    },
  }),
  methods: {
    async salvar(endereco) {
      this.dialog = false
      const id = this.$auth.$storage.getUniversal('usuarioLogado').usuarioId
      endereco.cliente = id
      const data = endereco
      console.log(endereco)
      alert(data)
      try {
        await this.$axios.post('/endereco', data)
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>
