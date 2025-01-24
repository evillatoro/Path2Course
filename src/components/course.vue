<template>
    <div class="question">
      <p>{{ item.question }}</p>
      <button @click="idState.replyOpen = !idState.replyOpen">Reply</button>
      <textarea
        v-if="idState.replyOpen"
        v-model="idState.replyText"
        placeholder="Type your reply"
      />
    </div>
  </template>

<script>
import { IdState } from 'vue-virtual-scroller'

export default {
  mixins: [
    IdState({
      // You can customize this
      idProp: vm => vm.item.id,
    }),
  ],

  props: {
    // Item in the list
    item: Object,
  },

  // This replaces data () { ... }
  idState () {
    return {
      replyOpen: false,
      replyText: '',
    }
  },
}
</script>