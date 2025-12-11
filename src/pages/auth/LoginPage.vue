<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="row">
          <div class="col-md-4 col-xs-12 fixed-center">
            <q-card class="my-card text-center">
              <q-card-section>
                <div class="text-h4 text-green q-mb-lg">Login</div>
                <div class="text-h5 text-green q-mb-lg">Masukkan Username & Password</div>
                <q-form @submit="onSubmit">
                  <q-input v-model="username" label="Masukkan Username" color="green" class="q-mb-sm" :rules="[val => val !== '' || 'mohon isi dengan benar']">
                    <template v-slot:prepend>
                      <q-icon name="person" color="green" />
                    </template>
                  </q-input>
                  <q-input v-model="password" type="password" label="Masukkan Password" color="green" class="q-mb-lg">
                    <template v-slot:prepend>
                      <q-icon name="lock" color="green" />
                    </template>
                  </q-input>
                  <q-btn  color="green" label="Login" class="full-width q-mb-md" type="submit" />
                  <q-btn
                  color="green"
                  label="Registrasi"
                  class="full-width"
                  outline
                  :to="{
                    name:'registerPage'
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
  const q = useQuasar()
  const router = useRouter()

  const onSubmit = async () => {
    try {
      const res = await api.post('users/login', {
        username: username.value,
        password: password.value
      })
      console.log(res.data)
      q.notify({
        type: 'positive',
        message: res.data.message
      })
      router.push({
        name:'movieAdmin'
      })
    } catch (error) {
      console.log(error)
      q.notify({
        type: 'negative',
        message: error.response.data
      })
    }
  }
  console.log(username.value,password.value)
</script>
