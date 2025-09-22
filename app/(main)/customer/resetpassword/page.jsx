import ResetPassword from "../../../../components/resetPassword";
import { Suspense } from "react"

export default function CustomerResetPassword() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPassword />
            </Suspense>
        </div>
    )
}