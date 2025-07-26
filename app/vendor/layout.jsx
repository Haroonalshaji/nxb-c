import AOSInit from '@/components/AOSInit'
import HeaderVendor from '@/components/headerVendor'
import VendorFooter from '@/components/vendorFooter'
import { Toaster } from '@/components/ui/toaster'

export const metadata = {
  title: 'Vendor | Nexus Built',
  description: 'Vendor dashboard and profile',
}

export default function VendorLayout({ children }) {
  return (
    <>
      <AOSInit />
      <Toaster />
      <HeaderVendor />
      {children}
      <VendorFooter />
    </>
  )
} 