<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="12" md="12" xs="12">
        <div class="text-center">
          <p style="color: #757575; font-size: 1.5rem">
            Simple file uploader example
          </p>
          <v-chip
            class="ma-2"
            color="pink"
            label
            text-color="white"
            @click="optionDialog = true"
          >
            <v-icon left>mdi-cog-outline</v-icon>
            Options
          </v-chip>
        </div>
      </v-col>
      <v-col cols="12" lg="12" md="12" xs="12">
        <file-uploader
          ref="fileUploader"
          :document-attachment.sync="documentAttachment"
          :file-accept="fileExtensions"
          :max-file-size.sync="maxFileSizeChange"
          :image-compressor.sync="imageCompressorState"
          :image-compress-level.sync="imageCompressLevelChange"
          :file-uploader-type="'simple'"
          :max-file-count.sync="maxFileCountChange"
          :card-type.sync="cardType"
          :badge-counter.sync="badgeCounterState"
          :thumb.sync="thumbState"
          :lang.sync="setLang"
          :change-file-name.sync="changeFileNameState"
          :add-file-description.sync="addFileDescriptionState"
          :add-file-tag.sync="addFileTagState"
          :tags="tags"
        >
        </file-uploader>
      </v-col>
    </v-row>
    <!---------------------File Uploader Options------------------------------->
    <v-dialog v-model="optionDialog" max-width="80%">
      <v-card>
        <v-card-title class="headline"
          >You can customize your Simple File Uploader</v-card-title
        >

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="12" xs="12">
                <p>Select Language:</p>
                <v-chip-group
                  v-model="selectedLanguage"
                  active-class="deep-purple accent-4 white--text"
                  column
                >
                  <v-chip>English</v-chip>

                  <v-chip>Persian</v-chip>

                  <v-chip>French</v-chip>

                  <v-chip>Chines</v-chip>

                  <v-chip>Arabic</v-chip>
                </v-chip-group>
              </v-col>
              <v-col cols="12" md="12" xs="12">
                <p>Select card type:</p>
                <v-chip-group
                  v-model="selectedCardType"
                  active-class="deep-purple accent-4 white--text"
                  column
                >
                  <v-chip>DEFAULT</v-chip>

                  <v-chip>OUTLINED</v-chip>

                  <v-chip>RAISED</v-chip>

                  <v-chip>SHAPED</v-chip>

                  <v-chip>TILE</v-chip>
                </v-chip-group>
              </v-col>
              <v-col cols="12" md="4" xs="12">
                <v-switch
                  v-model="changeFileNameState"
                  :label="`Change file name : ${changeFileNameState.toString()}`"
                ></v-switch>
              </v-col>
              <v-col cols="12" md="4" xs="12">
                <v-switch
                  v-model="addFileDescriptionState"
                  :label="`Add file description : ${addFileDescriptionState.toString()}`"
                ></v-switch>
              </v-col>
              <v-col cols="12" md="4" xs="12">
                <v-switch
                  v-model="addFileTagState"
                  :label="`Add file tags : ${addFileTagState.toString()}`"
                ></v-switch>
              </v-col>
              <v-col cols="12" md="12" xs="12">
                <v-switch
                  v-model="thumbState"
                  :label="`Thumb for images : ${thumbState.toString()}`"
                ></v-switch>
              </v-col>
              <v-col cols="12" md="12" xs="12">
                <v-text-field v-model="fileExtensions" label="File extensions">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" xs="12">
                <v-text-field
                  v-model="maxFileCountChange"
                  label="Maximum file count"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" xs="12">
                <v-text-field
                  v-model="maxFileSizeChange"
                  label="Maximum file size (KB)"
                >
                </v-text-field>
              </v-col>
              <v-col cols="3" md="3" xs="12">
                <v-switch
                  v-model="imageCompressorState"
                  :label="`Image compressor: ${imageCompressorState.toString()}`"
                ></v-switch>
              </v-col>
              <v-col cols="9" md="9" xs="12">
                <v-slider
                  v-model="imageCompressLevelChange"
                  style="margin-top: 16px"
                  :disabled="!imageCompressorState"
                  label="Image compress level"
                  persistent-hint
                  max="1"
                  step="0.1"
                  thumb-label="always"
                  ticks
                ></v-slider>
              </v-col>
              <v-col cols="12" md="12" xs="12">
                <v-switch
                  v-model="badgeCounterState"
                  :label="`Badge counter: ${badgeCounterState.toString()}`"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="optionDialog = false">
            ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!---------------------File Uploader Options------------------------------->
  </v-container>
</template>

<script>
import FileUploader from '@/components/FileUploader'
export default {
  components: {
    FileUploader,
  },
  data: () => ({
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
    selectedLanguage: 0,
    setLang: 'en',
    changeFileNameState: true,
    addFileDescriptionState: true,
    addFileTagState: true,
    tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6'],
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
    setCardType() {
      switch (this.selectedCardType) {
        case 0:
          this.cardType = 'default'
          break
        case 1:
          this.cardType = 'outlined'
          break
        case 2:
          this.cardType = 'raised'
          break
        case 3:
          this.cardType = 'shaped'
          break
        case 4:
          this.cardType = 'tile'
          break
      }
    },

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
  },
}
</script>
