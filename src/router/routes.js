const routes = [
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/movie', component: () => import('pages/admin/movie/IndexPage.vue'),
        name: 'movieAdmin'
       },
      { path: '/genre', component: () => import('pages/admin/genre/IndexPage.vue'),
        name: 'genreAdmin'
       }
    ]
  },
  { path: '/', component: () => import('pages/auth/LoginPage.vue'),
    name: "loginPage"
   },
  { path: '/registrasi', component: () => import('pages/auth/RegistrasiPage.vue'),
    name: "registerPage"
   },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
