import * as React from 'react'
import { extendTheme, styled } from '@mui/material/styles'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import BarChartIcon from '@mui/icons-material/BarChart'
import DescriptionIcon from '@mui/icons-material/Description'
import PersonPinIcon from '@mui/icons-material/PersonPin'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { PageContainer } from '@toolpad/core/PageContainer'
import Dashboard from '../../components/Admin/Dashboard'
import Orders from '../../components/Admin/Orders'
import ReportSales from '../../components/Admin/ReportSales'
import ReportProducts from '../../components/Admin/ReportProducts'
import AccountInfo from '../../components/Admin/AccountInfo'
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'products',
        title: 'Products List',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Account',
  },
  {
    segment: 'account',
    icon: <PersonPinIcon />,
  },
]

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
})

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath)

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    }
  }, [pathname])

  return router
}

export default function DashboardLayoutBasic(props) {
  const { window } = props

  const router = useDemoRouter('/dashboard')

  const demoWindow = window ? window() : undefined

  const renderPage = () => {
    switch (router.pathname) {
      case '/dashboard':
        return <Dashboard />
      case '/orders':
        return <Orders />
      case '/reports/sales':
        return <ReportSales />
      case '/reports/products':
        return <ReportProducts />
      case '/account':
        return <AccountInfo />
      default:
        return <div>Page Not Found</div>
    }
  }
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{
        logo: <img src="../../src/assets/GFD.webp" alt="Admin GFD" />,
        title: 'Admin GFD',
        homeUrl: '/toolpad/core/introduction',
      }}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>{renderPage()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  )
}
