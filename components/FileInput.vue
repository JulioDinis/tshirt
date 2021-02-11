<template>
  <div>
    <v-file-input
      v-model="files"
      accept="image/png, image/jpeg, image/bmp"
      color="deep-purple accent-4"
      counter
      :label="label"
      multiple
      :placeholder="placeholder"
      prepend-icon="mdi-camera"
      outlined
      :show-size="1000"
      type="file"
      @change="onFileChange"
    >
      <template v-slot:selection="{ index, text }">
        <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
          {{ text }}
        </v-chip>

        <span
          v-else-if="index === 2"
          class="overline grey--text text--darken-3 mx-2"
        >
          +{{ files.length - 2 }} File(s)
        </span>
      </template>
    </v-file-input>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    changeFile: {
      type: Function,
      default() {},
    },
    imagensList: {
      type: Array,
      default() {},
    },
  },
  data: () => ({
    files: [],
    selectedFile: '',
  }),
  methods: {
    onFileChange(e) {
      const selectedFile = e // accessing file
      this.selectedFile = selectedFile
      this.selectedFile.forEach((imagem) => {
        this.UploadFile(imagem)
      })
    },
    UploadFile(file) {
      const formData = new FormData()
      formData.append('file', file) // appending file

      //  Mudar isso depois em
      this.$axios
        .post('/estampa/upload', formData, {
          onUploadProgress: (ProgressEvent) => {
            const progress =
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              '%'
            this.progress = progress
          },
        })
        .then((res) => {
          this.imagensList.push(res.data.path)
        })
        .catch((err) => {
          alert(
            'Estamos com problemas tecnicos, tente novamente mais tarde' + err
          )
        })
    },
  },
}
</script>
