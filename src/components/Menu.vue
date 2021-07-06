<template>
  <div>
    <v-list-item v-for="item in items" :key="item.title" :to="item.to"> {{ item.title }}</v-list-item>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        title: 'home',
        to: '/'
      },
      {
        title: 'about',
        to: '/about'
      },
      {
        title: 'xxx',
        to: '/xxx'
      }
    ]
  })
}
</script>
