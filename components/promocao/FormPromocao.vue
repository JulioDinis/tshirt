<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Cadastrar nova Promoção
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
                  v-model="promocao.cupom"
                  label="Cupom*"
                  required
                  hint="Ex: CP2FZ"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="8">
                <v-text-field
                  v-model="promocao.descricao"
                  label="Descricao*"
                  hint="Ex: Descricao da Promoção"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="promocao.mensagem"
                  label="Mensagem*"
                  hint="Ex: 0"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="promocao.desconto"
                  label="desconto"
                  hint="Ex: casa, apartamento..."
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
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
                      v-model="promocao.validade"
                      label="Validade da Promoção"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="promocao.validade"
                    :min="new Date().toISOString().substr(0, 10)"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
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
          <v-btn color="blue darken-1" text @click="salvar(promocao)">
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
    menu: '',
    promocao: {
      cupom: '',
      desconto: '',
      descricao: '',
      mensagem: '',
      validade: '',
      dataCadastro: '',
    },
  }),
  methods: {
    async salvar(promocao) {
      this.dialog = false
      const id = this.$auth.$storage.getUniversal('usuarioLogado').usuarioId
      promocao.cliente = id
      const data = promocao
      console.log(promocao)
      alert(data)
      try {
        await this.$axios.post('/promocao', data)
      } catch (error) {
        alert(error)
      }
    },
    save(date) {
      this.$refs.menu.save(date)
    },
  },
}
</script>
