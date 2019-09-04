<template>
  <div class="share-dropdown-menu" :class="{active:isActive}">
    <div class="share-dropdown-menu-wrapper">
      <span class="share-dropdown-menu-title" @click.self="clickTitle">{{title}}</span>
      <div class="share-dropdown-menu-item" v-for="(item,index) of items" :key='index'>
        <a v-if="item.href" :href="item.href" target="_blank">{{item.title}}</a>
        <span v-else>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    },
    title: {
      type: String,
      default: 'vue'
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    clickTitle() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >

</style>
