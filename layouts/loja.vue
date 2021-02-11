<template>
  <v-app dark>
    <v-card color="red lighten-4" flat height="50px" tile>
      <v-app-bar
        color="red"
        dense
        :clipped-right="clipped"
        :clipped-left="clipped"
        fixed
        app
      >
        <v-toolbar-title>T@Shirt</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-col cols="12" sm="8" md="6"> </v-col>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon @click.stop="menuDireita = !menuDireita">
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>
        <v-btn icon @click.stop="mostrarCarrinho = !mostrarCarrinho">
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="menuDireita"
      :mini-variant="miniVariant"
      :clipped="clipped"
      right
      fixed
      app
      temporary
    >
      <h1>Entre ou Cadastre-se</h1>
      <login @meu-evento="fazerIsto" />
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
          <v-divider></v-divider>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="mostrarCarrinho"
      :mini-variant="miniVariant"
      :clipped="clipped"
      right
      fixed
      app
    >
      <Carrinho />
      <v-divider></v-divider>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import Login from '@/components/cliente/Login'
import Carrinho from '@/components/venda/Carrinho'
export default {
  components: {
    Login,
    Carrinho,
  },
  data() {
    return {
      clipped: true,
      miniVariant: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Cadastre-se',
          to: '/cliente',
        },
        {
          icon: 'mdi-exit-to-app',
          title: 'Sair',
          to: '/inspire',
        },
        {
          icon: 'mdi-account-settings',
          title: 'Perfil',
          to: '/perfil',
        },
      ],
      produtos: [
        {
          icon: 'mdi-apps',
          title: 'Cadastre-se',
          quantidade: 10,
        },
        {
          icon: 'mdi-exit-to-app',
          title: 'Sair',
          quantidade: 13,
        },
        {
          icon: 'mdi-cart-outline',
          title: 'Carrinho',
          quantidade: 15,
        },
      ],
      menuDireita: false,
      mostrarCarrinho: false,
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.mostrarCarrinho = false
    })
  },
  methods: {
    fazerIsto(payload) {
      this.$auth.$storage.setUniversal('usuarioLogado', payload)
      this.$toast.success(
        `Seja bem vindo ${
          this.$auth.$storage.getUniversal('usuarioLogado').usuario
        }`
      )
      this.menuDireita = false
    },
  },
}
</script>
