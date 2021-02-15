<template>
  <!-- Add bar to open add modal-->
  <b-container>
    <b-col md="8" class="mr-auto ml-auto">
      <div class="edit-bar">
        <b-row>
          <b-col class="mt-1">
            Modo de edição ativo
          </b-col>
          <b-col class="text-right">
            <b-button
              class="close-button mr-3"
              variant="outline-light">
              Fechar
            </b-button>
            <b-button
              variant="success"
              v-b-modal.modal-prevent>
              Adicionar Produto
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-col>
    <!-- Add modal -->
    <b-modal
      id="modal-prevent"
      ref="modal"
      centered
      hide-footer
      title="Adicionar produto">
      <form ref="form" @submit.stop.prevent="saveProduct()" class="modal-form ml-auto mr-auto">
        <div class="div-image text-center">
          <b-icon
            icon="image"
            class="img-model ml-auto mr-auto mt-2"
            style="width: 50px; height: 70px;">
          </b-icon><br>
          <span style="font-size: 14px;">Clique em selecionar imagem ou arraste-a aqui</span><br>
          <label for="upload-photo" style="color: rgb(20, 115, 230);">Selecionar imagem</label>
          <b-file id="upload-photo" type="file" style="display:none;" v-model="product.photo"/>
        </div>
        <b-form-group
          label="Nome"
          label-for="name"
          invalid-feedback="O campo nome é requerido."
          :state="nameState">
          <b-form-input
            class="modal-add-inputs"
            id="name"
            v-model="product.name"
            :state="nameState"
            required>
          </b-form-input>
        </b-form-group>
        <b-form-group
          label="Preço"
          label-for="value"
          invalid-feedback="O campo preço é requerido."
          :state="nameState">
          <b-form-input
            class="modal-add-inputs text-right"
            id="name"
            v-model="product.value"
            :state="valueState"
            required>
          </b-form-input>
        </b-form-group>
        <b-button type="submit" class="add-button ml-auto mr-auto" size="md" variant="success" @click="saveProduct()">
          Adicionar
        </b-button>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  data () {
    return {
      product: {
        name: '',
        value: 'R$' + '',
        photo: ''
      }
    }
  },

  methods: {
    saveProduct() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      this.valueState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
      this.valueState = null
    }
      // Push the name to submitted names
      /* this.submittedNames.push(this.name) */
      // Hide the modal manually
 /*  mounted() {
    Produto.list().then(resp => {
      console.log('ja')
    })*/
  }
}
</script>

<style lang="scss">
/* Stylish for add bar */
.edit-bar {
  padding: 0.75rem !important;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  float: center !important;
  top: -10rem;
  position: relative;
}

.close-button {
  padding-left: 2.40rem !important;
  padding-right: 2.40rem !important;
}
/* Stylish for add modal */
.add-button, .modal-add-inputs {
  width: 100%;
  padding-top: 0.6rem !important;
  padding-bottom: 0.6rem !important;
}

.modal-header {
  border-bottom: none !important;
  padding-left: 2.5rem !important;
}

.modal-backdrop {
  background: #cdcdcd !important;
  opacity: 15 !important;
}

.modal-title {
  font-size: 1.8rem !important;
  font-weight: bold !important;
  font-family: "Segoe UI",Arial,sans-serif !important;
  margin-top: 0.5em !important;
}

.form-control {
  border-radius: 0 !important;
  font-family: "Segoe UI",Arial,sans-serif !important;
  height: calc(1.75em + 0.75rem + 2px) !important;
}

.div-image {
  margin-left: auto;
  margin-right: auto;
  height: 160px;
  border: 2.5px dashed #cdcdcd;
  width: 100%;
  margin-bottom: 16px;
}

.modal-content {
  width: 85% !important;
  border-radius: 0 !important;
  right: -2.3rem;
}
.modal-form{
  border: none !important;
  border-radius: 0 !important;
  width: 95% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.img-model {
  color: #b4b3b3;
  background: #fff;
}

.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: 'Browse';
}
</style>