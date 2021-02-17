<template>
  <div>
  <!-- Loader while loading carda -->
    <loader v-if="loade"/>
    <b-container v-else class="contain">
      <b-row class="mt-1  ">
        <b-col
          md="7"
          class="text-right pl-5 pr-0 mb-5"
        >
          <h4> Lista de Produtos</h4>
        </b-col>
        <b-col
          md="5"
          class="text-right pt-1">
          <b-row class="ml-5">
            <b-col md="6" class="text-right mr-0 pr-0">
              <b-form-checkbox
                class="mt-1"
                v-model="editProducts"
                switch
              >
              </b-form-checkbox>
            </b-col>
            <b-col md="6" class="text-left ml-0 pl-0 text-edit"><span>Modo edição</span></b-col>
          </b-row>
        </b-col>
      </b-row>
      <!-- Cards products list -->
      <b-row
        align-h="center"
        class="pl-5 pr-5"
        no-gutters
      >
        <b-col
          class="mr-auto ml-auto text-center p-1"
          v-for="(prod, index) in products"
          :key="index"
          md="4"
        >
          <b-card
            tag="article"
            class="mb-2 product-card text-center"
          >
            <b-card-group deck class="text-center">
              <b-button
                @click="getProductById(prod.id)"
                v-b-modal.modal-delete
                v-if="editProducts"
                variant="danger"
                class="delete-button"
                v-b-tooltip
                title="Excluir">
                <b-icon
                  icon="x-square"
                  scale="1.2"
                  variant="light"
                ></b-icon>
              </b-button>
              <b-card-img
                :src="'http://127.0.0.1:5000/' + prod.image_url"
                alt="Image"
                class="rounded-0 pl-5 pr-5 mb-1 image-products" />
              <b-card-text class="mr-auto ml-auto mt-4">
                <span class="name text-muted">{{ prod.name }} </span> <br>
                <span class="value">R$ {{ prod.price }}</span>
              </b-card-text>
            </b-card-group>
          </b-card>
        </b-col>
      </b-row>
      <!-- Modal of delete product -->
      <b-modal
        id="modal-delete"
        ref="modal"
        centered
        hide-footer
        hide-header
        no-close-on-backdrop
      >
        <h4 class="pt-2">Remover produto</h4>
        <span style="font-size: 14px;">Você realmente deseja remover este produto?</span>
        <b-col class="text-right mb-2 mt-4">
          <b-button
            @click="$bvModal.hide('modal-delete')"
            class="close-button mr-3"
            variant="outline-dark"
          >
            Manter
          </b-button>
          <b-button
            @click.prevent="deleteProduct()"
            class="close-button"
            variant="danger"
          
          >
            Remover
          </b-button>
        </b-col>
      </b-modal>
      <!-- Add bar to open add modal-->
      <b-col v-if="editProducts" md="8" class="mr-auto ml-auto">
        <div class="edit-bar ">
          <b-row>
            <b-col class="mt-1">
              Modo de edição ativo
            </b-col>
            <b-col >
              <b-button
                @click.prevent="changeEditingState()"
                class="close-button mr-3"
                variant="outline-light">
                Fechar
              </b-button>
              <b-button
                variant="success"
                v-b-modal.modal-add>
                Adicionar Produto
              </b-button>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <!-- Add modal -->
      <b-modal
        id="modal-add"
        ref="modal"
        centered
        hide-footer
        no-close-on-backdrop
        title="Adicionar produto">
        <form ref="form" class="modal-form ml-auto mr-auto">
          <div class="div-image text-center">
            <div class="mt-4" v-if="file">  {{ file.name }}</div>
            <b-icon
              v-else
              icon="image"
              class="img-model ml-auto mr-auto mt-2"
              style="width: 50px; height: 70px;">
            </b-icon><br>
            <span style="font-size: 14px;" class="text-muted">Clique em selecionar imagem ou arraste-a aqui</span><br>
            <label for="image" style="color: rgb(20, 115, 230);">Selecionar imagem</label>
            <b-file accept="image/*" id="image" type="file" style="display: none;" @change="selectedFile" v-model="file"/>
          </div>
          <b-form-group
            label="Nome"
            label-for="name"
            invalid-feedback="O campo nome é requerido."
            :state="nameState">
            <b-form-input
              autocomplete="off"
              class="modal-add-inputs"
              id="name"
              v-model="product.name"
              :state="nameState"
              required>
            </b-form-input>
          </b-form-group>
          <b-form-group
            label="Preço"
            label-for="price"
            invalid-feedback="O campo preço é requerido."
            :state="nameState">
            <b-form-input
              autocomplete="off"
              step=".01"
              type="number"
              class="modal-add-inputs text-right"
              id="price"
              v-model="product.price"
              :state="priceState"
              required>
            </b-form-input>
          </b-form-group>
          <b-button
            @click="saveProduct()"
            class="modal-add-inputs ml-auto mr-auto"
            size="md"
            variant="success"
            block>
            Adicionar
          </b-button>
        </form>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import loader from '../components/loader.vue'

export default {
  components: { loader },
  data () {
    return {
      file: '',
      loade: true,
      editProducts: false,
      products: [],
      nameState: null,
      priceState: null,
      product: {
        name: '',
        price: '',
        image: []
      },
      productIdToDelete: null,
      /* ok: false */
    }
  },

  created() {
    this.getProducts()
  },
  
  methods: {

    async getProducts () {
      const get = await axios.get('http://127.0.0.1:5000/products')
      this.products = get.data
      this.loade = false
    },
   async getProductById (id) {
      await axios.get('http://127.0.0.1:5000/products')
      this.productIdToDelete = id
    },

    changeEditingState () {
      this.editProducts = false
    },

    selectedFile (event) {
      let fff;
      fff = event.target.files[0]
      this.product.image = fff;
    },

    saveProduct() {
      this.checkFormValidity();
          
      const fd = new FormData()
      fd.append('name', this.product.name );
      fd.append('price', this.product.price)
      fd.append('image', this.product.image);

      if (this.nameState && this.priceState) {
        const post = 'http://127.0.0.1:5000/products' 
        axios.post(post, fd, { headers: {'Content-Type':'multipart/form-data'}})
          .then( () => {
            Swal.fire({
              title: 'Produto adicionado com sucesso!',
              icon:'success',
              timer: 1500
          })
            this.getProducts()
            this.changeEditingState()
            this.product.name = ''
            this.product.price = ''
            this.product.image = []
            this.file = ''
          }).catch((error) => {
            console.error(error.message)
          })
      }
    },

    async deleteProduct () {
      await axios.delete('http://127.0.0.1:5000/products/' + this.productIdToDelete)
      console.log('Produto deletado!')
      this.getProducts()
      this.changeEditingState()
      await Swal.fire({
        title: 'Produto deletado com sucesso!',
        icon:'success',
        timer: 1500
      })
      await this.$bvModal.hide('modal-delete')
    },

    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      this.priceState = valid
    },

    resetModal() {
      this.nameState = null
      this.priceState = null
    },
  }
}
</script>

<style lang="scss">
.contain {
  padding: 15px;
  padding-top: 3rem;
}

.text-edit {
  font-size: 12px;
  padding-top: 6px !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #28a745 !important;
  background-color: #28a745 !important;
  box-shadow: none !important;
}
/* Styles for product cards */
.product-card {
  border: none !important;
  width: 100%;
  height: 350px;
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

.delete-button {
  position: absolute;
  top: -0.1rem;
  right: -0.1rem;
  padding: 0 !important;
  border: none !important;
}

.delete-button:hover,
.delete-button:focus {
  box-shadow: none !important;
}


/* Stylish for add bar */
.edit-bar {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  padding: 0.75rem !important;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  float: center !important;
  top: 35rem;
  
  position: fixed;
}

.close-button {
  padding-left: 2.40rem !important;
  padding-right: 2.40rem !important;
}
/* Stylish for add modal */
.modal-add-inputs {
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

.card-body {
  padding-top: 0 !important;
}

.image-products {
  min-height: 15rem;
  max-height: 15rem;
}
</style>
