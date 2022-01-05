<script language="ts">
// @ts-ignore
import { computed, defineComponent, reactive, ref } from 'vue'
import { useStore } from '@/store'
import { useUserStore } from '@/pinia-store/user'
import { useCartStore } from '@/pinia-store/cart'
// @ts-ignore
import { GoogleMap, Marker } from 'vue3-google-map'

export default defineComponent({
  name: 'StateTest',
  components: {},
  setup() {
    const user = useUserStore()
    const cart = useCartStore()
    const itemName = ref('')
    function addItemToCart() {
      if (!itemName.value) return
      cart.addItem(itemName.value)
      itemName.value = ''
    }
    function clearCart() {
      if (window?.confirm('Are you sure you want to clear the cart?')) {
        cart.rawItems = []
      }
    }

    async function buy() {
      const n = await cart.purchaseItems()
      console.log(`Bought ${n} items`)

      cart.rawItems = []
    }
    if (typeof window !== 'undefined') {
      //  @ts-ignore
      window.stores = { user, cart }
    }
    return {
      addItemToCart,
      cart,
      user,
      buy,
      clearCart,
      itemName
    }
  }
})
</script>

<template>
  <div>
    <form @submit.prevent="addItemToCart" data-testid="add-items">
      <input class="border-2 border-rose-600" type="text" v-model="itemName" />
      <button>Add +</button>
    </form>
    <form @submit.prevent="buy">
      <ul data-testid="items">
        <li v-for="item in cart.items" :key="item.name">
          {{ item.name }} ({{ item.amount }})
          <button @click="cart.removeItem(item.name)" type="button">X</button>
        </li>
      </ul>

      <button :disabled="!user.name">Buy</button>
      <button :disabled="!cart.items.length" @click="clearCart" type="button" data-testid="clear">Clear the cart</button>
    </form>
  </div>
</template>
