<template>
  <v-container>
    <vue-slick-carousel :arrows="true" :dots="true">
      <inner-image-zoom
        :src="produto.imagens[0].caminho"
        :zoom-src="produto.imagens[0].caminho"
        :fullscreen-on-mobile="true"
      />
      <inner-image-zoom
        :src="produto.imagens[0].caminho"
        :zoom-src="produto.imagens[0].caminho"
        :fullscreen-on-mobile="true"
      />
      <inner-image-zoom
        :src="produto.imagens[0].caminho"
        :zoom-src="produto.imagens[0].caminho"
        :fullscreen-on-mobile="true"
      />
    </vue-slick-carousel>
  </v-container>
</template>
<script>
import InnerImageZoom from 'vue-inner-image-zoom'
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: {
    InnerImageZoom,
    VueSlickCarousel,
  },
  props: {
    produto: {
      type: Object,
      default() {},
    },
  },
}
</script>
