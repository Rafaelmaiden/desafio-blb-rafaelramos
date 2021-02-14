<template>
  <b-container class="contain">
    <b-row>
      <b-col md="7" class="text-right pl-5 pr-0">
        <h4 class="text-list">Lista de Produtos</h4>
      </b-col>
      <b-col md="5" class="text-right">
        <b-form-checkbox  v-model="editProducts" switch>
          <span class="text-edit ">Modo edição</span>
        </b-form-checkbox>
      </b-col>
    </b-row>
    <b-row align-h="center" class="pl-5 pr-5" no-gutters>
      <b-col
        class="mr-auto ml-auto text-center p-1"
        v-for="(product, index) in products" :key="index"
        md="4">
        <b-card
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2 product-card text-center">
          <b-button
            v-if="editProducts"
            variant="danger"
            class="delete-button"
            v-b-tooltip title="Excluir">
            <b-icon icon="x-square" scale="1.2" variant="light"></b-icon>
          </b-button>
          
          <b-card-text class="text-center">
            <span class="name text-muted">{{ product.name }} </span> <br>
          
            <span class="value">R$ {{ product.value}}</span>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="editProducts">
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
                class="idit-buttons"
                variant="success"
                v-b-modal.modal-prevent>
                Adicionar Produto
              </b-button>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
    <b-modal
      id="modal-prevent"
      ref="modal"
      centered
      hide-footer
      title="Adicionar Produto">
      <form ref="form" @submit.stop.prevent="saveProduct()">
        <div class="image">
          <b-file plain>  Selecionar imagem</b-file>
        </div>
        <b-form-group
          label="Nome"
          label-for="name"
          invalid-feedback="O campo nome é requerido."
          :state="nameState">
          <b-form-input
            id="name"
            v-model="name"
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
            id="name"
            v-model="value"
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
/* import Produto from '../services/config' */

export default {
  name: 'ListProduct',
  data () {
    return {
      editProducts: false,
      products: [
        {
          name: 'bolsa',
          value: '30'
        },

        {
          name: 'bolsa1',
          value: '300'
        },

        {
          name: 'bolsa2',
          value: '110'
        },

        {
          name: 'bolsa2',
          value: '120'
        },
      ],
      nameState: null,
      valueState: null
    }
  },
  
  created () {
    console.log(this.products[0])
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

<style lang="scss" scoped>
.product-card {
  border: none !important;
  width: 100%;
  height: 250px;
}

.contain {
  padding: 15px;
}

.name {
  font-size: 12px;
  font-family: sans-serif;
}

.value {
  font-size: 14px;
  font-family: sans-serif;
  font-weight: 500;
}

.text-edit {
  font-size: 12px;
  padding-bottom: 2px;
}

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #18d26e !important;
  background-color: #18d26e !important;
  box-shadow: none !important;

}

.edit-bar {
  padding: 0.75rem !important;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  float: center !important;
  top: -10rem;
  position: relative;
}


.btn, .card {
  border-radius: 0 !important;
}

.card {
  padding: 0 !important;
}

.close-button {
  padding-left: 2.40rem !important;
  padding-right: 2.40rem !important;
}

.delete-button {
  position: absolute;
  top: -0.1rem;
  right: -0.1rem;
  padding: 0 !important;
  border: none !important;
}

.add-button {
  width: 100%;
  padding-top: 0.6rem !important;
  padding-bottom: 0.6rem !important;
}

.delete-button:hover, .delete-button:focus {
  box-shadow: none !important;
}

.modal {
  height: 500px !important;
  width: 80% !important;
}

.modal-header {
  border-bottom: none !important;
}

.modal-backdrop {
  background: #cdcdcd !important;
  opacity: 0.5 !important;
}
.modal-title {
  text-align: center;
}

.form-control {
  border-radius: 0 !important;
}

.image {
  margin-left: auto;
  margin-right: auto;
  height: 175px;
  background: #000;
  border: 2px dashed #fff;
  width: 90%;
}
</style>
