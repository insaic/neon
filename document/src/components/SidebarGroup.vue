<template>
  <div class="sidebar-group" :class="{ first, collapsable }">
    <p class="sidebar-heading">{{ item[0] | config('groupType')}}</p>
      <ul class="sidebar-group-items" ref="items">
        <li v-for="(child, i) in item[1]" :key="i">
          <router-link
            :to="item[0] === 'developmentGuide'
              ? `/${child.to}`
              : (item[0] === 'directives' ? `/docs/directives/${child.to}` : `/docs/components/${item[0]}/${child.to}`)"
            @click.native="autoHideSidebar"
            class="sidebar-link"
          >
            {{ item[0] !== 'directives' ? child.name.replace(/-/g, ' ') : child.name }}
          </router-link>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarGroup',

  props: ['item', 'first', 'open', 'collapsable'],

  methods: {
    autoHideSidebar () {
      if (this.$parent.$parent.$options.name === 'Layout') {
        this.$parent.$parent.isSidebarOpen && (this.$parent.$parent.isSidebarOpen = false)
      }
    }
  }
}
</script>

<style lang="sass">
.sidebar-group
  &:not(.first)
    margin-top: 1em
  .sidebar-group
    padding-left: 0.5em
  &:not(.collapsable)
    .sidebar-heading
      cursor: auto
      color: inherit

.sidebar-heading
  color: #999
  transition: color .15s ease
  cursor: pointer
  font-size: 1.1em
  font-weight: bold
  text-transform: uppercase
  padding-left: 1.5rem
  margin-top: 0
  margin-bottom: 0.5rem
  &.open, &:hover
    color: inherit
  .arrow
    position: relative
    top: -0.12em
    left: 0.5em
  // &:.open .arrow
    // top: -0.18em

.sidebar-group-items
  transition: height .1s ease-out
  overflow: hidden
</style>
