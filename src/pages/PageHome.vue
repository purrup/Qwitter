<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">

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
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item
          v-for="qweet in qweets"
          :key="qweet.id"
          class="q-py-md qweet-separator">
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
                  <br class="lt-md">&bull; {{ qweet.date |  relativeDate }}
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
                  @click="toggleLiked(qweet)"
                  :color="qweet.liked ? 'pink' : 'grey'"
                  size="sm"
                  :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart' "
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
          </q-item>
        </transition-group>
      </q-list>

    </q-scroll-area>
  </q-page>
</template>

<script>
import { formatDistance } from 'date-fns'
import db from 'src/boot/firebase.js'

export default {
  name: 'PageHome',
  data () {
    return {
      newQwteetContent: '',
      qweets: [
        // {
        //   id: this.uuid(),
        //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, magni repellendus! Repellendus non ipsa, laudantium omnis sunt, repellat dicta voluptas cum provident repudiandae architecto inventore. Reprehenderit error ducimus officiis non',
        //   date: 1615208104428,
        //   liked: false
        // },
        // {
        //   id: this.uuid(),
        //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, magni repellendus! Repellendus non ipsa, laudantium omnis sunt, repellat dicta voluptas cum provident repudiandae architecto inventore. Reprehenderit error ducimus officiis non',
        //   date: 1615208202055,
        //   liked: true
        // }
        // {
        //   id: this.uuid(),
        //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, magni repellendus! Repellendus non ipsa, laudantium omnis sunt, repellat dicta voluptas cum provident repudiandae architecto inventore. Reprehenderit error ducimus officiis non',
        //   date: 1615208104428
        // },
        // {
        //   id: this.uuid(),
        //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, magni repellendus! Repellendus non ipsa, laudantium omnis sunt, repellat dicta voluptas cum provident repudiandae architecto inventore. Reprehenderit error ducimus officiis non',
        //   date: 1615208104428
        // },
        // {
        //   id: this.uuid(),
        //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, magni repellendus! Repellendus non ipsa, laudantium omnis sunt, repellat dicta voluptas cum provident repudiandae architecto inventore. Reprehenderit error ducimus officiis non',
        //   date: 1615208104428
        // },
        // {
        //   id: this.uuid(),
        //   content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, magni repellendus! Repellendus non ipsa, laudantium omnis sunt, repellat dicta voluptas cum provident repudiandae architecto inventore. Reprehenderit error ducimus officiis non',
        //   date: 1615208104428
        // }
      ]
    }
  },
  methods: {
    uuid () {
      return Math.random().toString(16).slice(2)
    },
    addNewQweet () {
      const newQweet = {
        // id: this.uuid(),
        content: this.newQwteetContent,
        date: Date.now(),
        liked: false
      }
      db.collection('qweets').add(newQweet)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
      this.newQwteetContent = ''
    },
    deleteQweet (qweetId) {
      db.collection('qweets').doc(qweetId).delete().then(() => {
        console.log('Document successfully deleted!')
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    },
    toggleLiked (qweet) {
      db.collection('qweets').doc(qweet.id).update({
        liked: !qweet.liked
      })
        .then(() => {
          console.log('Document succefully updated!')
        })
        .catch((error) => {
          console.error('Error updating document: ', error)
        })
    }
  },
  filters: {
    relativeDate (value) {
      return formatDistance(value, new Date())
    }
  },
  mounted () {
    db.collection('qweets').orderBy('date').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const qweetChange = change.doc.data()
        qweetChange.id = change.doc.id
        if (change.type === 'added') {
          console.log('Add qweet: ', qweetChange)
          this.qweets.unshift(qweetChange)
        }
        if (change.type === 'modified') {
          console.log('Modified qweet: ', qweetChange)
          const targetQweet = this.qweets.find(qweet => qweet.id === qweetChange.id)
          Object.assign(targetQweet, qweetChange)
        }
        if (change.type === 'removed') {
          console.log('Removed qweet: ', qweetChange)
          this.qweets = this.qweets.filter(qweet => qweet.id !== qweetChange.id)
        }
      })
    })
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

.qweet-separator:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)
</style>
