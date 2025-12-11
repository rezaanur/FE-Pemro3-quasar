<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>
        <q-item
          clickable :to="{name: 'movieAdmin'}"
        >
          <q-item-section
            avatar
          >
            <q-icon name="space_dashboard" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Movie</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable :to="{name: 'genreAdmin'}"
        >
          <q-item-section
            avatar
          >
            <q-icon name="music_note" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Genre</q-item-label>
          </q-item-section>
        </q-item>


      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'




const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="js"></style>
