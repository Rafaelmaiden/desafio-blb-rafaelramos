<template>
  <b-container class="contain">
    <b-row class="mt-1  ">
      <b-col md="7" class="text-right pl-5 pr-0 mb-5">
        <h4> Lista de Produtos</h4>
      </b-col>
      <b-col md="5" class="text-right">
        <b-form-checkbox v-model="editProducts" switch :indeterminate.sync="indeterminate">
          <span class="text-edit">Modo edição</span>
        </b-form-checkbox>
      </b-col>
      <ProductsData/>
    </b-row> 
    <b-row v-if="editProducts">
      <AddNewProductBar/>
    </b-row>
  </b-container>
</template>

<script>
/* import Produto from '../services/config' */
import ProductsData from '../components/ProductsData'
import AddNewProductBar from '../components/AddNewProductBar'
import { EventBus } from '@/eventBus'

export default {
  name: 'ListProduct',
  components: {  AddNewProductBar, ProductsData },
  data () {
    return {
      indeterminate: true,
      editProducts: false,
    }
  },

  watch: {
    editProducts: function () {
      this.getD()
      return this.editProducts
    }
  },

  methods: {
    getD () {
      EventBus.$on('editProducts', () => {
        this.editProducts = false
        return this.editProducts
      })
    }
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
  padding-bottom: 2px;
}

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #28a745 !important;
  background-color: #28a745 !important;
  box-shadow: none !important;

}
</style>
