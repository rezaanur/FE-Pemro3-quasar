<template>
  <q-page padding>
    <q-table
      flat
      bordered
      title="Data Film"
      :rows="rows"
      :columns="columns"
      row-key="id_movie"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="Tambah Film"
          icon="add"
          unelevated
          no-caps
          @click="bukaTambah()"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id_movie" :props="props">
            {{ props.row.id_movie }}
          </q-td>
          <q-td key="judul" :props="props">
            {{ props.row.judul }}
          </q-td>
          <q-td key="genre" :props="props">
            {{ props.row.genre }} </q-td>
          <q-td key="tahun" :props="props">
            {{ props.row.tahun }}
          </q-td>
          <q-td key="rating" :props="props">
            {{ props.row.rating }}
          </q-td>
          <q-td key="harga" :props="props">
            {{ formatCurrency(props.row.harga) }}
          </q-td>
          <q-td key="aksi" :props="props">
            <q-btn
              color="warning"
              label="Edit"
              icon="edit"
              class="q-mr-sm"
              @click="bukaEdit(props.row)"
            />
            <q-btn
              color="negative"
              label="Hapus"
              icon="delete"
              @click="hapusMovie(props.row.id_movie)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="dialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">
            {{ editMode ? 'Edit Film' : 'Tambah Film' }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="simpanMovie">
            <q-input
              v-model="movie.judul"
              label="Judul Film"
              outlined
              dense
              required
              class="q-mb-md"
            />
            <q-select
              v-model="movie.idGenre"
              :options="genreOptions"
              option-value="id_genre"
              option-label="nama_genre"
              emit-value
              map-options
              label="Genre"
              outlined
              dense
              required
              class="q-mb-md"
            />
            <q-input
              v-model="movie.tahun"
              label="Tahun Rilis"
              type="number"
              outlined
              dense
              required
              class="q-mb-md"
            />
            <q-input
              v-model="movie.rating"
              label="Rating (1-10)"
              type="number"
              outlined
              dense
              required
              min="1"
              max="10"
              class="q-mb-md"
            />
            <q-input
              v-model="movie.harga"
              label="Harga"
              type="number"
              outlined
              dense
              required
              class="q-mb-md"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Simpan" color="primary" @click="simpanMovie" />
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
const editMode = ref(false);
const editId = ref(null);

const movie = ref({
  judul: '',
  idGenre: null,
  tahun: null,
  rating: null,
  harga: null
});

const genreOptions = ref([]); // Untuk dropdown pilihan genre

const columns = [
  { name: 'id_movie',
    label: 'ID Film',
    field: 'id_movie',
    align: 'left',
    sortable: true
  },
  { name: 'judul',
    label: 'Judul',
    field: 'judul',
    align: 'left',
    sortable: true
  },
  { name: 'genre',
    label: 'ID Genre',
    field: 'genre',
    align: 'center',
    sortable: true
  },
  { name: 'tahun',
    abel: 'Tahun',
    field: 'tahun',
    align: 'center',
    sortable: true
  },
  { name: 'rating',
    label: 'Rating',
    field: 'rating',
    align: 'center',
    sortable: true
  },
  { name: 'harga',
    label: 'Harga',
    field: 'harga',
    align: 'right',
    sortable: true
  },
    { name: 'aksi',
    label: 'Aksi',
    field: 'aksi',
    align: 'center'
  },
];

onMounted(() => {
  ambilDataMovie();
  ambilDataGenre();
});

const ambilDataMovie = async () => {
  try {
    const res = await api.get('movie/all');
    rows.value = res.data.data; // Sesuaikan dengan struktur respons backend
  } catch (error) {
    console.error('Gagal mengambil data film:', error);
    q.notify({
      type: 'negative',
      message: `Gagal memuat data film: ${error.response?.data?.message || error.message}`,
    });
  }
};

const ambilDataGenre = async () => {
  try {
    const res = await api.get('genre/all');
    genreOptions.value = res.data.data;
  } catch (error) {
    console.error('Gagal mengambil data genre:', error);
    q.notify({
      type: 'negative',
      message: `Gagal memuat data genre untuk pilihan: ${error.response?.data?.message || error.message}`,
    });
  }
};

const resetForm = () => {
  movie.value = {
    judul: '',
    idGenre: null,
    tahun: null,
    rating: null,
    harga: null
  };
  editMode.value = false;
  editId.value = null;
};

const bukaTambah = () => {
  resetForm();
  dialog.value = true;
};

const bukaEdit = (row) => {
  movie.value = {
    judul: row.judul,
    idGenre: row.genre,
    tahun: row.tahun,
    rating: row.rating,
    harga: row.harga
  };
  editId.value = row.id_movie;
  editMode.value = true;
  dialog.value = true;
};

const simpanMovie = async () => {
  try {
    if (editMode.value) {
      await api.put(`movie/update/${editId.value}`, {
        judul: movie.value.judul,
        genre: movie.value.idGenre,
        tahun: movie.value.tahun,
        rating: movie.value.rating,
        harga: movie.value.harga
      });
      q.notify({
        type: 'positive',
        message: 'Film berhasil diperbarui !',
      });
    } else {
      await api.post('movie/create', {
        judul: movie.value.judul,
        idGenre: movie.value.idGenre,
        tahun: movie.value.tahun,
        rating: movie.value.rating,
        harga: movie.value.harga
      });
      q.notify({
        type: 'positive',
        message: 'Film berhasil ditambahkan!',
      });
    }
    dialog.value = false;
    resetForm();
    ambilDataMovie(); // Refresh data setelah simpan
  } catch (error) {
    console.error('Gagal menyimpan film:', error);
    q.notify({
      type: 'negative',
      message: `Gagal menyimpan film: ${error.response?.data?.message || error.message}`,
    });
  }
};

const hapusMovie = async (id_movie) => {
  q.dialog({
    title: 'Konfirmasi Hapus',
    message: 'Yakin ingin menghapus film ini?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await api.delete(`movie/delete/${id_movie}`);
      q.notify({
        type: 'positive',
        message: 'Film berhasil dihapus!',
      });
      ambilDataMovie(); // Refresh data setelah hapus
    } catch (error) {
      console.error('Gagal menghapus film:', error);
      q.notify({
        type: 'negative',
        message: `Gagal menghapus film: ${error.response?.data?.message || error.message}`,
      });
    }
  });
};

const formatCurrency = (value) => {
  if (value === null || value === undefined) return '';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};
</script>
