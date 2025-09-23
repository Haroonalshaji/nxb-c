import DashboardHeader from '@/components/dashboard-header'
import { SidebarProvider } from '@/components/dashboard-sidebar'
import { Toaster } from '@/components/ui/toaster'


export const metadata = {
  title: 'Dashboard | Nexus Built',
  description: 'Your Nexus Built dashboard',
}

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <DashboardHeader />
      <Toaster />
      <div className="flex gap-6 min-h-[80vh]">
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
} 