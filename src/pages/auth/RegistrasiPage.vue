<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="row">
          <div class="col-md-4 col-xs-12 fixed-center">
            <q-card class="my-card text-center">
              <q-card-section>
                <div class="text-h4 text-green q-ma-sm">Registrasi</div>
                <div class="text-h5 text-green q-ma-sm">Daftar Akun Anda</div>
                <q-form @submit="onSubmit">
                  <q-input v-model="username" label="Masukkan Username" color="green" class="q-mb-sm" :rules="[val => val !== '' || 'Tidak Boleh Kosong !']">
                    <template v-slot:prepend>
                      <q-icon name="person" color="green" />
                    </template>
                  </q-input>
                  <q-input v-model="password" type="password" label="Masukkan Password" color="green" class="q-mb-sm" :rules="[val => val !== '' || 'Tidak Boleh Kosong !']">
                    <template v-slot:prepend>
                      <q-icon name="lock" color="green" />
                    </template>
                  </q-input>
                    <q-input v-model="nama" label="Masukkan Nama Lengkap" color="green" class="q-mb-sm" :rules="[val => val !== '' || 'Tidak Boleh Kosong !']">
                    <template v-slot:prepend>
                      <q-icon name="man" color="green" />
                    </template>
                  </q-input>
                    <q-input v-model="email" label="Masukkan Email" type="email" color="green" class="q-mb-sm" :rules="[val => val !== '' || 'Tidak Boleh Kosong !']">
                      <template v-slot:prepend>
                      <q-icon name="mail" color="green" />
                    </template>
                  </q-input>
                    <q-input v-model="telephone" label="Masukkan Telephone" color="green" class="q-mb-sm" :rules="[val => val !== '' || 'Tidak Boleh Kosong !']">
                    <template v-slot:prepend>
                      <q-icon name="call" color="green" />
                    </template>
                  </q-input>
                  <q-btn color="green" label="Registrasi" class="full-width q-mb-md" type="submit" />
                  <q-btn
                  color="green"
                  label="Login"
                  class="full-width q-mb-md"
                  outline
                  :to="{
                    name: 'loginPage'
                  }"
                  />
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>

import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


  const username = ref('')
  const password = ref('')
  const nama = ref('')
  const email = ref('')
  const telephone = ref('')
  const q = useQuasar()
  const router = useRouter()

  const onSubmit = async () => {
    try {
      const res = await api.post('users/register',{
        username: username.value,
        password: password.value,
        nama: nama.value,
        email: email.value,
        telephone: telephone.value,
      })
      q.notify({
        type: 'positive',
        message: res.data.message
      })
      router.push({
        name: 'loginPage'
      })
    } catch (error) {
      // console.log(error)
      q.notify({
        type: 'negative',
        message:error.response.data
      })
    }
  }
</script>
