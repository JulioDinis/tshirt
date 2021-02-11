<template>
  <div>
    <v-container class="grey lighten-5 mb-6">
      <v-row align="top" no-gutters style="height: 300px">
        <v-col md="8">
          <Carrinho />
        </v-col>
        <v-col md="4">
          <v-card class="pa-2" outlined tile>
            <h2>Detalhes da Compra</h2>
            <p>Valor: {{ pedido.valor }}</p>
            <p>Descontos:</p>
            <p>Frete:</p>
            <p>Total:</p>
            <v-btn depressed color="primary" @click="finalizarPedido(pedido)">
              Finalizar Pedido</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container>
      <v-row align="center">
        <v-col md="8">
          <v-card class="pa-2" outlined tile>
            <h2>Endereço de envio</h2>
            <v-radio-group v-model="radios">
              <template v-slot:label>
                <div>
                  Selecione o endereço de entrega
                  <strong>ou Cadastre um novo endereço</strong>
                </div>
              </template>
              <v-radio
                v-for="endereco in enderecos"
                :key="endereco.id"
                :value="endereco.id"
              >
                <template v-slot:label>
                  <div>
                    {{ endereco.destinatario }}, {{ endereco.rua }} -
                    {{ endereco.numero }}, CEP: {{ endereco.cep }}
                    {{ endereco.cidade }} - 23,00
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
            <FormEndereco />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Carrinho from '@/components/venda/Carrinho'
import FormEndereco from '@/components/endereco/FormEndereco'
export default {
  layout: 'loja',
  components: {
    Carrinho,
    FormEndereco,
  },
  data() {
    return {
      items: [],
      enderecos: [],
      pedido: {
        valor: '0',
      },
    }
  },
  mounted() {
    this.pedido = this.$store.state.carrinho.itens
    this.getEnderecos()
    this.calculaValores()
    this.$nextTick(function () {
      setInterval(() => {
        this.carregado = true
      }, 3000)
      // Código que irá rodar apenas após toda
      // a árvore do componente ter sido renderizada
    })
  },
  methods: {
    async finalizarPedido(pedido) {
      this.calculaValores()
      window.open(
        `http://www.sicadi.com.br/mhouse/boleto/boleto3.php?numero_banco=341-7&local_pagamento=PAG%C1VEL+EM+QUALQUER+BANCO+AT%C9+O+VENCIMENTO&cedente=Tshirt-Vendas&data_documento=28%2F01%2F2021&numero_documento=DF+00113&especie=Dinheiro&aceite=N&data_processamento=29%2F01%2F2021&uso_banco=&carteira=179&especie_moeda=Real&quantidade=1&valor=1&vencimento=05%2F02%2F2021&agencia=0049&codigo_cedente=10201-5&meunumero=00010435&valor_documento=${pedido.valor}%2C00&instrucoes=Ap%F3s+o+vencimento+nao+receber&mensagem1=Teste&mensagem2=&mensagem3=ATEN%C7%C3O%3A+N%C3O+RECEBER+AP%D3S+O+VENCIMENTO&sacado=&Submit=Enviar`,
        'Boleto Gerado'
      )
      try {
        await this.$axios.post('/pedido', this.pedido).then((res) => {
          alert('Pedido Realizado')
          // this.$router.push({ name: 'tamanho' })
        })
      } catch (error) {
        alert(error)
      }
    },
    async getEnderecos() {
      await this.$axios.get(`/endereco/7`).then((response) => {
        this.enderecos = response.data
      })
    },
    calculaValores() {
      let valor = 0
      this.pedido.forEach((item) => {
        valor = valor + (item.itens.estampa.valor + item.itens.produto.valor)
      })
      this.pedido.valor = valor
    },
  },
}
</script>
