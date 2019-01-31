import Login from './../components/Login'
import AdminLogin from './../components/Admin/Login'
import Admin from './../components/Admin/Admin'
import AddAdmin from './../components/Admin/addAdmin'
import ChangePassword from './../components/Admin/ChangePassword'
import ChangeIndex from './../components/Admin/ChangeIndex'

export const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin/login',
    component: AdminLogin
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/admin/addAdmin',
    component: AddAdmin
  },
  {
    path: '/admin/changePassword',
    component: ChangePassword
  },
  {
    path: '/admin/changeIndex',
    component: ChangeIndex
  }
]
