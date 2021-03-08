<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input
          v-model="newQwteetContent"
          class="new-qweet"
          placeholder="What's happening"
          maxlength="280"
          counter
          autogrow
          >
          <template v-slot:before>
            <q-avatar size="xl">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg">
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="col col-shrink">
        <q-btn
        class="q-mb-lg"
          :disable="!newQwteetContent"
          color="primary"
          label="Qweet"
          rounded
          unelevated
          no-caps
          ></q-btn>
      </div>
    </div>

    <q-separator
      class="divider"
      size="10px"
      color="grey-2"/>
  </q-page>
</template>

<script>
export default {
  name: 'PageHome',
  data () {
    return {
      newQwteetContent: ''
    }
  }
}
</script>
<style lang="sass">
.new-qweet
  textarea
    font-size: 1.1rem
    line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
</style>
