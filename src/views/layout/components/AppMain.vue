<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive><!-- :include="cachedViews"-->
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  height: calc(100vh - 84px);
  position: relative;
  overflow: auto;
  min-width: 1120px;
  background: #F8F8F8;
}
</style>

