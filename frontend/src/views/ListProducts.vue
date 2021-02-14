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
          <b-button v-if="editProducts" variant="danger" class="delete-button">
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
            <b-col class="mt-1">Modo de edição ativo</b-col>
            <b-col class="text-right">
              <b-button class="close-button mr-3" variant="outline-light">Fechar</b-button>
              <b-button class="idit-buttons" variant="success">Adicionar Produto</b-button>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Produto from '../services/config'

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
    }
  },
  
  created () {
    console.log(this.products[0])
  }
 /*  mounted() {
    Produto.list().then(resp => {
      console.log('ja')
    })
  } */
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

.delete-button:hover, .delete-button:focus {
  box-shadow: none !important;
}


</style>
