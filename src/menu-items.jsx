import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import IncomeOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

const icons = {
  DashboardOutlinedIcon,
  PeopleOutlinedIcon,
  StoreOutlinedIcon,
  CategoryOutlinedIcon,
  Inventory2OutlinedIcon,
  ReceiptLongOutlinedIcon,
  AttachMoneyOutlinedIcon,
  TrendingUpOutlinedIcon,
  AccountCircleOutlinedIcon,
  PaymentOutlinedIcon,
  IncomeOutlinedIcon,
  SecurityOutlinedIcon,
};

export default {
  items: [
    {
      id: 'navigation',
      title: 'Sky Web Design',
      type: 'group',
      icon: icons['DashboardOutlinedIcon'],
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: icons['DashboardOutlinedIcon'],
          url: '/dashboard',
        },
      ],
    },
    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: icons['DashboardOutlinedIcon'],
      children: [
        {
          id: 'Customer/Vendor',
          title: 'Customer / Vendor',
          type: 'item',
          url: '/customer-vendor',
          icon: icons['PeopleOutlinedIcon'],
        },
        {
          id: 'Products/Services',
          title: 'Products / Services',
          type: 'collapse',
          icon: icons['StoreOutlinedIcon'],
          children: [
            {
              id: 'products-services',
              title: 'Products / Services',
              type: 'item',
              url: '/products-services',
              // target: true,
              icon: icons['StoreOutlinedIcon'],
            },
            {
              id: 'productgroup',
              title: 'Product Group',
              type: 'item',
              url: '/product-group',
              // target: true,
              icon: icons['CategoryOutlinedIcon'],
            },
            {
              id: 'stock',
              title: 'Stock',
              type: 'item',
              url: '/stock',
              // target: true,
              icon: icons['Inventory2OutlinedIcon'],
            },
          ],
        },
        {
          id: 'salesinvoice',
          title: 'Sales Invoice',
          type: 'item',
          url: '/sales-invoice',
          icon: icons['ReceiptLongOutlinedIcon'],
        },
        {
          id: 'purchaseinvoice',
          title: 'Purchase Invoice',
          type: 'item',
          url: '/purchase-invoice',
          icon: icons['AttachMoneyOutlinedIcon'],
        },
        {
          id: 'payment',
          title: 'Payment',
          type: 'item',
          url: '/payment',
          icon: icons['PaymentOutlinedIcon'],
        },
        {
          id: 'expenseincome',
          title: 'Expense / Income',
          type: 'item',
          url: '/expense-income',
          icon: icons['IncomeOutlinedIcon'],
        },
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: icons['AccountCircleOutlinedIcon'],
          children: [
            {
              id: 'login-1',
              title: 'Login',
              type: 'item',
              url: '/login',
              // target: true,
              icon: icons['SecurityOutlinedIcon'],
            },
            {
              id: 'register',
              title: 'Register',
              type: 'item',
              url: '/register',
              // target: true,
              icon: icons['SecurityOutlinedIcon'],
            },
          ],
        },
      ],
    },
  ],
};
