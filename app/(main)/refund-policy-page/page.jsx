import PolicyHeader from "../../../components/policy-header"

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <PolicyHeader title="Refund & Cancellation Policy" type="terms" effectiveDate="August 4, 2025" />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <article className="prose prose-lg max-w-none">
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mb-8 rounded-r-lg">
                            <p className="text-gray-700 leading-relaxed mb-0">
                                At Nexus Built, we value transparency and strive to create a fair and efficient experience for all vendors using our platform. This Refund & Cancellation Policy outlines the terms under which refunds or cancellations may be granted for vendor subscriptions and services.
                            </p>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">1. General Terms</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Nexus Built offers digital listing and discovery services through subscription-based plans (Monthly, Quarterly, and Yearly). Once a vendor is onboarded and verified, the subscription plan is activated, and services begin immediately.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">2. Subscription Fees</h2>
                            <p className="text-gray-700 leading-relaxed">
                                All subscription fees paid to Nexus Built are used to activate your profile, maintain visibility, enable dashboard access, and support account services. These are non-transferable and tied to your business profile.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">3. Refund Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>We follow a strict no-refund policy once the vendor profile has been verified and activated on the platform.</strong>
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                However, refunds may be considered only under the following exceptional circumstances:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                                <li>Duplicate payment due to a technical error</li>
                                <li>Payment made but vendor verification is denied or not completed</li>
                                <li>Service not rendered at all due to internal platform failure (not user-based issues)</li>
                            </ul>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Refund Conditions:</h3>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Refund requests must be made within 7 days of payment</li>
                                    <li>The vendor must not have already used core features (e.g., profile published, enquiries received)</li>
                                    <li>Refunds, if approved, will be processed within 7–10 business days to the original payment method</li>
                                    <li>To request a refund, email <a href="mailto:support@nexusbuilt.com" className="text-[#B93239] hover:underline">support@nexusbuilt.com</a> with your transaction ID, business name, and reason.</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">4. Cancellation Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You may cancel your subscription at any time through your vendor dashboard or by emailing us at <a href="mailto:support@nexusbuilt.com" className="text-[#B93239] hover:underline">support@nexusbuilt.com</a>.
                            </p>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Important Notes:</h3>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Cancellation will stop the next billing cycle for applicable subscription plans</li>
                                    <li>No refunds are given for the remaining time left in an active plan</li>
                                    <li>Upon cancellation, your profile will remain visible until the current plan expires</li>
                                    <li>After plan expiry, your account will be marked inactive unless renewed</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">5. Auto-Renewal and Opt-Out</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Some plans may be set to auto-renew based on your selection at checkout.</li>
                                <li>You will receive a reminder before renewal (for Quarterly and Yearly plans)</li>
                                <li>You can opt out of auto-renewal at any time from your dashboard settings</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">6. Dispute Resolution</h2>
                            <p className="text-gray-700 leading-relaxed">
                                If you have any concerns regarding billing, please contact us before raising a payment dispute with your bank or payment provider. Most issues can be resolved quickly by our team.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">7. Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have questions or require help related to cancellation or refund, reach us at:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700 mb-2">
                                    <strong>Email:</strong> <a href="mailto:support@nexusbuilt.com" className="text-[#B93239] hover:underline">support@nexusbuilt.com</a>
                                </p>
                                <p className="text-gray-700 mb-0">
                                    <strong>Response Time:</strong> Within 2 business days
                                </p>
                            </div>
                        </section>
                    </article>
                </div>
            </div>
        </div>
    )
}
