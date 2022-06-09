import Dashboard from './pages/dashboard';
import ViewStocks from './pages/viewStocks';
import Billing from './pages/biiling';
import PageNotFound from './pages/pageNotFound';
import Login from './auth/login';
import Register from './auth/register';
import HomePage from './pages/homepage';
import ForgotPassword from './auth/forgot-password';
import ResetPassword from './auth/reset-password';
import ViewOutOfStock from './pages/viewOutOfStocks';
import PastBills from './pages/pastBills';
import BillPageDemo from './pages/billPageDemo';

export const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/forgot-password',
        component: ForgotPassword
    },
    {
        path: '/reset-password',
        component: ResetPassword
    },
    {
        path: '/stocks',
        component: ViewStocks
    },
    {
        path: '/outofstocks',
        component: ViewOutOfStock
    },
    {
        path: '/newbill',
        component: Billing
    },
    {
        path: '/pastbills',
        component: PastBills
    },
    {
        path: '/bill',
        component: BillPageDemo
    },
    {
        path: '*',
        component: PageNotFound
    }
]