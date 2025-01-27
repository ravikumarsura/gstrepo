import React, { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default')));
const Customervendor = Loadable(lazy(() => import('GSTScreens/Customervendor')));
const ProductServices = Loadable(lazy(() => import('GSTScreens/ProductServices/ProductServices')));
const ProductGroup = Loadable(lazy(() => import('GSTScreens/ProductServices/ProductGroup')));
const Stock = Loadable(lazy(() => import('GSTScreens/ProductServices/Stock')));
const SalesInvoice = Loadable(lazy(() => import('GSTScreens/SalesInvoice')));
const PurchaseInvoice = Loadable(lazy(() => import('GSTScreens/PurchaseInvoice')));
const Payment = Loadable(lazy(() => import('GSTScreens/Payment')));
const ExpenseIncome = Loadable(lazy(() => import('GSTScreens/ExpenseIncome')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    { path: '/customer-vendor', element: <Customervendor /> },
    { path: '/products-services', element: <ProductServices /> },
    { path: '/product-group', element: <ProductGroup /> },
    { path: '/stock', element: <Stock /> },
    { path: '/sales-invoice', element: <SalesInvoice /> },
    { path: '/purchase-invoice', element: <PurchaseInvoice /> },
    { path: '/payment', element: <Payment /> },
    { path: '/expense-income', element: <ExpenseIncome /> },
  ]
};

export default MainRoutes;
