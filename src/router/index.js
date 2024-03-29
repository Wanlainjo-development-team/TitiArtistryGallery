// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/website/Default.vue'),
    children: [
      {
        path: '',
        name: 'web.home1',
        component: () => import('@/views/website/Home.vue'),
      },
      {
        path: 'home',
        name: 'web.home2',
        component: () => import('@/views/website/Home.vue'),
      },
      {
        path: 'gallery',
        name: 'web.gallery',
        component: () => import('@/views/website/gallery/Gallery.vue'),

        children: [
          {
            path: '',
            component: () => import('@/views/website/gallery/Images.vue')
          },
        ]
      },
      {
        path: 'blog',
        name: 'web.blog',
        component: () => import('@/views/website/blog/Blog.vue'),

        children: [
          {
            path: '',
            component: () => import('@/views/website/blog/Blogs.vue')
          },
          {
            path: ':id',
            component: () => import('@/views/website/blog/ViewBlog.vue')
          }
        ]
      },
      {
        path: 'contact',
        name: 'web.contact',
        component: () => import('@/views/website/Contact.vue'),
      }
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/admin/Default.vue'),
    children: [
      {
        path: '',
        name: 'Admin.Home',
        component: () => import('@/views/admin/Auth.vue'),
      },
      {
        path: 'dashboard',
        name: 'Admin.dashboard',
        component: () => import('@/views/admin/dashboard/Home.vue'),

        children: [
          {
            path: '',
            component: () => import('@/views/admin/dashboard/website/WebsiteView.vue')
          },
          {
            path: 'website',
            component: () => import('@/views/admin/dashboard/website/WebsiteView.vue')
          },
          {
            path: 'blog',
            component: () => import('@/views/admin/dashboard/blog/BlogView.vue'),

            children: [
              {
                path: '',
                component: () => import('@/views/admin/dashboard/blog/Blogs.vue'),

                children: [
                  {
                    path: '',
                    component: () => import('@/views/admin/dashboard/blog/blogs/Blogs.vue')
                  },
                  {
                    path: ':id',
                    component: () => import('@/views/admin/dashboard/blog/blogs/Blog.vue')
                  }
                ]
              },
              {
                path: 'newBlog',
                component: () => import('@/views/admin/dashboard/blog/NewBlog.vue')
              },
            ]
          },
          {
            path: 'gallery',
            component: () => import('@/views/admin/dashboard/gallery/GalleryView.vue'),

            children: [
              {
                path: '',
                component: () => import('@/views/admin/dashboard/gallery/Images.vue'),

                children: [
                  {
                    path: '',
                    component: () => import('@/views/admin/dashboard/gallery/views/Images.vue'),
                  },
                  {
                    path: ':id',
                    component: () => import('@/views/admin/dashboard/gallery/views/Image.vue')
                  }
                ]
              }
            ]
          }
        ]
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
