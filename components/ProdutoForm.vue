<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="12" md="12" xs="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="produto.descricao"
            :counter="20"
            label="Descricao"
            required
            :prepend-icon="mdiDescricao"
          ></v-text-field>

          <v-text-field
            v-model="produto.valor"
            label="Valor"
            required
            :prepend-icon="mdiValor"
          ></v-text-field>
          <v-text-field
            v-model="produto.genero"
            label="Genero"
            required
            prepend-icon="mdi-gender-male-female"
          ></v-text-field>
          <file-uploader
            ref="FileUploader"
            :document-attachment.sync="documentAttachment"
            :file-accept="fileExtensions"
            :max-file-size.sync="maxFileSizeChange"
            :image-compressor.sync="imageCompressorState"
            :image-compress-level.sync="imageCompressLevelChange"
            :file-uploader-type="'table'"
            :max-file-count.sync="maxFileCountChange"
            :badge-counter.sync="badgeCounterState"
            :thumb.sync="thumbState"
            :table-fixed-header.sync="tableFixedHeaderStatus"
            :table-height.sync="tableHeightChange"
            :table-thumb-column.sync="tableThumbColumnState"
            :lang.sync="setLang"
            :change-file-name.sync="changeFileNameState"
            :add-file-description.sync="addFileDescriptionState"
            :add-file-tag.sync="addFileTagState"
            :tags="tags"
            :imagens-list="novasImagens"
          >
          </file-uploader>
          <v-btn color="success" @click="salvar(documentAttachment)">
            Salvar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FileUploader from '@/components/FileUploader'
import { mdiImageText, mdiCurrencyUsd } from '@mdi/js'
export default {
  layout: 'adm',
  components: {
    FileUploader,
  },
  props: {
    salvar: {
      type: Function,
      default() {},
    },
    produto: {
      type: Object,
      default() {},
    },
    novasImagens: {
      type: Array,
      default() {},
    },
  },
  data: () => ({
    mdiDescricao: mdiImageText,
    mdiValor: mdiCurrencyUsd,
    documentAttachment: [],
    optionDialog: false,
    selectedCardType: 0,
    cardType: '',
    badgeCounterState: true,
    maxFileCountChange: 5,
    maxFileSizeChange: 5120,
    imageCompressorState: true,
    imageCompressorChange: 0.5,
    imageCompressLevelChange: 0.5,
    fileExtensions: 'image/png,image/gif,image/jpeg,image/webp',
    thumbState: true,
    tableThumbColumnState: true,
    tableFixedHeaderStatus: true,
    tableHeightChange: 350,
    selectedLanguage: 0,
    setLang: 'pt',
    changeFileNameState: true,
    addFileDescriptionState: true,
    addFileTagState: true,
    tags: ['12', '14', '16', 'PP', 'P', 'M', 'G', 'GG', 'XG'],
    valid: true,
  }),
  watch: {
    selectedCardType() {
      this.setCardType()
    },
    badgeCounterState() {
      this.badgeCounter = this.badgeCounterState
    },
    maxFileCountChange() {
      this.maxFileCount = this.maxFileCountChange
    },
    maxFileSizeChange() {
      this.maxFileSize = Number(this.maxFileSizeChange)
    },
    imageCompressorState() {
      this.imageCompressor = this.imageCompressorState
    },
    imageCompressLevelChange() {
      this.imageCompressLevel = this.imageCompressLevelChange
    },
    fileExtensions() {
      this.fileAccept = this.fileExtensions
    },
    thumbState() {
      this.thumb = this.thumbState
    },
    tableThumbColumnState() {
      this.tableThumbColumn = this.tableThumbColumnState
    },
    tableFixedHeaderStatus() {
      this.tableFixedHeader = this.tableFixedHeaderStatus
    },
    tableHeightChange() {
      this.tableHeight = this.tableHeightChange
    },
    changeFileNameState() {
      this.changeFileName = this.changeFileNameState
    },
    addFileDescriptionState() {
      this.addFileDescription = this.addFileDescriptionState
    },
    addFileTagState() {
      this.addFileTag = this.addFileTagState
    },
    selectedLanguage() {
      this.setLanguage()
    },
  },
  methods: {
    setLanguage() {
      switch (this.selectedLanguage) {
        case 0:
          this.setLang = 'en'
          break
        case 1:
          this.setLang = 'fa'
          break
        case 2:
          this.setLang = 'fr'
          break
        case 3:
          this.setLang = 'ch'
          break
        case 4:
          this.setLang = 'ar'
          break
      }
    },
    async salvarbanco(produto) {
      const data = produto
      alert(data)
      try {
        await this.$axios.post('/produto/add', data)
      } catch (error) {
        alert(error)
      }
    },
  },
}
</script>
