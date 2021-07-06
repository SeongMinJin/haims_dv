<template>
  <v-footer
      app
      color=primary
      dark
      absolute
    >
      {{ footer }}
    </v-footer>
</template>
<script>
export default {
  props: [
    'footer'
  ]
}
</script>
