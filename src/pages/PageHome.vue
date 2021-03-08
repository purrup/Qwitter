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
          @click="addNewQweet"
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

    <q-list separator>
      <q-item
      v-for="qweet in qweets"
      :key="qweet.id"
      class="q-py-md">
        <q-item-section avatar top>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>
              Vin
            </strong>
            <span class="text-grey-7">
              @purrup
            </span>
          </q-item-label>
          <q-item-label class="qweet-content">
            {{ qweet.content }}
          </q-item-label>
          <div class="qweet-icons row justify-between q-mt-sm">
            <q-btn
              color="grey"
              size="sm"
              icon="far fa-comment"
              flat
              round
            />
            <q-btn
              color="grey"
              size="sm"
              icon="fas fa-retweet"
              flat
              round
            />
            <q-btn
              color="grey"
              size="sm"
              icon="far fa-heart"
              flat
              round
            />
            <q-btn
              @click="deleteQweet(qweet.id)"
              color="grey"
              size="sm"
              icon="fas fa-trash"
              flat
              round
            />
          </div>
        </q-item-section>

        <q-item-section side top>
          {{ qweet.date |  relativeDate }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { formatDistance } from 'date-fns'
export default {
  name: 'PageHome',
  data () {
    return {
      newQwteetContent: '',
      qweets: [
        {
          id: this.uuid(),
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, magni repellendus! Repellendus non ipsa, laudantium omnis sunt, repellat dicta voluptas cum provident repudiandae architecto inventore. Reprehenderit error ducimus officiis non',
          date: 1615208104428
        },
        {
          id: this.uuid(),
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, magni repellendus! Repellendus non ipsa, laudantium omnis sunt, repellat dicta voluptas cum provident repudiandae architecto inventore. Reprehenderit error ducimus officiis non',
          date: 1615208202055
        }
      ]
    }
  },
  methods: {
    addNewQweet () {
      const newQweet = {
        id: this.uuid(),
        content: this.newQwteetContent,
        date: Date.now()
      }
      this.qweets.unshift(newQweet)
      this.newQwteetContent = ''
    },
    deleteQweet (qweetId) {
      this.qweets = this.qweets.filter(qweet => qweet.id !== qweetId)
    },
    uuid () { // 建立id
      return Math.random().toString(16).slice(2)
    }
  },
  filters: {
    relativeDate (value) {
      return formatDistance(value, new Date())
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

.qweet-content
 white-space: pre-line

.qweet-icons
  margin-left: -5px
  max-width: 30%
</style>
