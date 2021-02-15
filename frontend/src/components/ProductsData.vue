<template>
  <b-container>
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
            v-b-modal.modal-delete
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
    <b-modal
      id="modal-delete"
      ref="modal"
      centered
      hide-footer
      hide-header
      no-close-on-backdrop>
      <h4 class="pt-2">Remover produto</h4>
      <span style="font-size: 14px;">Você realmente deseja remover este produto?</span>
       <b-col class="text-right mb-2 mt-4">
        <b-button
          @click="$bvModal.hide('modal-delete')"
          class="close-button mr-3"
          variant="outline-dark">
          Manter
        </b-button>
        <b-button
          class="close-button"
          variant="danger">
          Remover
        </b-button>
      </b-col>
    </b-modal>
  </b-container >
</template>

<script>
export default {
  data() {
    return {
      editProducts: true,
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
}
</script>

<style lang="scss">
.product-card {
  border: none !important;
  width: 100%;
  height: 250px;
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

.delete-button:hover, .delete-button:focus {
  box-shadow: none !important;
}
</style>