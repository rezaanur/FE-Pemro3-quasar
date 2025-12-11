<template>
  <!-- inside vue code -->
  <q-page class="flex flex-center">
    {{ nama }}
    <q-input v-model="nama" outlined label="Masukkan Nama"/>
    <q-input v-model="nama" outlined="" label="MN"></q-input>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
// outside vue code
const nama = ref('')
console.log(nama.value)

</script>
