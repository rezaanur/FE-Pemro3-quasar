<template>
  <q-page padding>
    <q-table
      flat
      bordered
      title="Data Genre"
      :rows="rows"
      :columns="columns"
      row-key="id_genre"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="Tambah"
          icon="add"
          unelevated
          no-caps
          @click="bukaTambah()"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id_genre" :props="props">
            {{ props.row.id_genre }}
          </q-td>
          <q-td key="nama_genre" :props="props">
            {{ props.row.nama_genre }}
          </q-td>
          <q-td key="aksi" :props="props">
            <q-btn color="warning" label="Edit" icon="edit" class="q-mr-sm" @click="bukaEdit(props.row)" />
            <q-btn color="negative" label="Hapus" icon="delete" @click="hapusGenre(props.row.id_genre)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="dialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">
            {{ editMode ? 'Edit Genre' : 'Tambah Genre' }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="simpanGenre">
            <q-input
              v-model="nama_genre"
              label="Nama Genre"
              outlined
              dense
              required
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Simpan" color="primary" @click="simpanGenre" />
          <q-btn flat label="Batal" v-close-popup @click="resetForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const q = useQuasar();

const rows = ref([]);
const dialog = ref(false);
const nama_genre = ref('');
const editMode = ref(false);
const editId = ref(null);

const columns = [
  { name: 'id_genre', label: 'ID Genre', field: 'id_genre', align: 'left', sortable: true },
  { name: 'nama_genre', label: 'Nama Genre', field: 'nama_genre', align: 'center', sortable: true },
  { name: 'aksi', label: 'Aksi', field: 'aksi', align: 'center' },
];

onMounted(() => getdata());

const getdata = async () => {
  try {
    const res = await api.get('genre/all');
    rows.value = res.data.data;
  } catch (error) {
    console.error('Gagal mengambil data:', error);
    q.notify({
      type: 'negative',
      message: 'Gagal memuat data genre.',

    });
  }
};

const resetForm = () => {
  nama_genre.value = '';
  editMode.value = false;
  editId.value = null;
};

const bukaTambah = () => {
  resetForm();
  dialog.value = true;
};

const bukaEdit = (row) => {
  nama_genre.value = row.nama_genre;
  editId.value = row.id_genre;
  editMode.value = true;
  dialog.value = true;
};

const simpanGenre = async () => {
  try {
    if (editMode.value) {
      // Mode edit
      await api.put(`genre/update/${editId.value}`, {
        nama_genre: nama_genre.value,
      });
      q.notify({
        type: 'positive',
        message: 'Genre berhasil diperbarui!',

      });
    } else {
      // Tambah baru
      await api.post('genre/create', {
        nama_genre: nama_genre.value,
      });
      q.notify({
        type: 'positive',
        message: 'Genre berhasil ditambahkan!',

      });
    }
    dialog.value = false;
    resetForm();
    getdata();
  } catch (error) {
    console.error('Gagal menyimpan genre:', error);
    q.notify({
      type: 'negative',
      message: `Gagal menyimpan genre: ${error.response?.data?.message || error.message}`,

    });
  }
};

const hapusGenre = async (id_genre) => {
  q.dialog({
    title: 'Konfirmasi Hapus',
    message: 'Yakin ingin menghapus genre ini?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await api.delete(`genre/delete/${id_genre}`);
      q.notify({
        type: 'positive',
        message: 'Genre berhasil dihapus!',

      });
      getdata();
    } catch (error) {
      console.error('Gagal menghapus genre:', error);
      q.notify({
        type: 'negative',
        message: `Gagal menghapus genre: ${error.response?.data?.message || error.message}`,

      });
    }
  });
};
</script>
