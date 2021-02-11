<template>
  <v-row justify="center">
    <v-dialog v-model="deleteDocumentDialog" persistent width="30%">
      <v-card>
        <v-card-title>
          <v-icon color="red"></v-icon>
        </v-card-title>
        <v-card-text class="BYekan"> {{ mensagem }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="botoes"
            class="BYekan"
            color="primary"
            text
            @click="cancelar"
            >Cancelar</v-btn
          >
          <v-btn
            v-if="botoes"
            class="BYekan"
            color="red darken-2"
            @click="deletar(selecionado)"
          >
            <v-icon left> mdi-pencil </v-icon>
            {{ excluir }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    excluir: {
      type: String,
      default: 'excluir',
    },
    deleteDocumentDialog: {
      type: Boolean,
      default: false,
    },
    deletar: {
      type: Function,
      default() {},
    },
    cancelar: {
      type: Function,
      default() {},
    },
    selecionado: {
      type: Number,
      default: 0,
    },
    mensagem: {
      type: String,
      default: 'Você está certo  disso?',
    },
    botoes: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
