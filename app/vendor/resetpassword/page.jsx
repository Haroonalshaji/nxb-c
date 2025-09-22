import { Suspense } from "react"
import PasswordResetVendorMain from '@/components/vendorResetPassword'

export default function VendorResetPassword() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <PasswordResetVendorMain />
            </Suspense>
        </div>
    );
}