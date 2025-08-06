import PolicyHeader from "../../../components/policy-header"

export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <PolicyHeader title="Shipping & Delivery Policy" type="terms" effectiveDate="August 4, 2025" />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <article className="prose prose-lg max-w-none">
                        <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-8 rounded-r-lg">
                            <p className="text-gray-700 leading-relaxed mb-0">
                                Nexus Built is a digital services platform. We do not sell or deliver physical goods. All services provided — including vendor listings, dashboard access, and customer enquiries — are fully digital and activated upon successful registration and verification.
                            </p>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">1. Nature of Our Services</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                All services offered by Nexus Built are intangible, non-physical, and delivered digitally through our website and user dashboards. These services include:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Vendor onboarding and listing</li>
                                <li>Access to a personalized vendor dashboard</li>
                                <li>Customer enquiry management</li>
                                <li>Subscription to digital visibility and listing benefits</li>
                                <li>Display in category-specific vendor directories</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">2. Service Activation Timeline</h2>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Your subscription and platform access are activated immediately after successful payment and completion of manual vendor verification.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-0">
                                    If additional documentation is required during onboarding, you will be notified via email.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">3. No Physical Shipment</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                As there are no physical products involved, there is:
                            </p>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-0">
                                    <li><strong>No shipping process</strong></li>
                                    <li><strong>No shipping charges</strong></li>
                                    <li><strong>No delivery timeline</strong></li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">4. Access Issues or Delays</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                In rare cases, if access is delayed due to technical or verification-related reasons:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Our support team will reach out within 24–48 business hours</li>
                                <li>You may contact <a href="mailto:support@nexusbuilt.com" className="text-[#B93239] hover:underline">support@nexusbuilt.com</a> if you have not received access or confirmation within the expected timeframe</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">5. Confirmation of Service</h2>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <p className="text-gray-700 leading-relaxed mb-0">
                                    You will receive a confirmation email once your payment is processed and your vendor account is verified. This email will serve as your digital "delivery confirmation."
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">6. Need Help?</h2>
                            <div className="bg-[#B93239]/10 border border-[#B93239]/20 rounded-lg p-6">
                                <p className="text-gray-700 leading-relaxed mb-0">
                                    For any access or service-related concerns, you can contact us via:
                                    <br />
                                    📧 <a href="mailto:support@nexusbuilt.com" className="text-[#B93239] hover:underline font-medium">support@nexusbuilt.com</a>
                                </p>
                            </div>
                        </section>
                    </article>
                </div>
            </div>
        </div>
    )
}
