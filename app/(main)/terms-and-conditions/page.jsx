import PolicyHeader from "../../../components/policy-header"

export default function TermsConditionsPage() {
    return (
        <div className="min-h-screen bg-white">
            <PolicyHeader title="Terms & Conditions" type="terms" effectiveDate="August 4, 2025" />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <article className="prose prose-lg max-w-none">
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8 rounded-r-lg">
                            <p className="text-gray-700 leading-relaxed mb-0">
                                These Terms & Conditions ("Terms") govern your use of the Nexus Built platform ("we," "our," or "us"). By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our platform.
                            </p>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">1. Eligibility</h2>
                            <p className="text-gray-700 leading-relaxed">
                                You must be at least 18 years old to register or use any services on Nexus Built. By registering, you confirm that you meet this requirement.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">2. Account Registration and Responsibility</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                                <li>All information you provide must be accurate, complete, and updated.</li>
                                <li>You are fully responsible for all activities under your account.</li>
                                <li>We reserve the right to suspend or terminate accounts that violate these Terms or submit false information.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">3. Vendor Subscription and Payments</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Vendors are required to pay a subscription fee to access listing features and the dashboard.</li>
                                <li>Pricing plans (Monthly, Quarterly, Yearly) are displayed on the Pricing page.</li>
                                <li>Payments are processed securely through third-party gateways like Razorpay.</li>
                                <li>All fees are non-refundable unless otherwise stated in our Refund Policy.</li>
                                <li>Subscription auto-renewal may apply depending on plan type.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">4. Manual Verification</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>All vendors undergo a manual verification process by the Nexus Built team.</li>
                                <li>We may request supporting documents to confirm business legitimacy.</li>
                                <li>We reserve the right to approve, reject, or remove listings at our discretion.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">5. Platform Use and Conduct</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">By using Nexus Built, you agree not to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Post or share misleading, false, or unlawful information</li>
                                <li>Use the platform for spam, fraud, or unsolicited promotions</li>
                                <li>Infringe on any third-party rights (intellectual property, privacy, etc.)</li>
                                <li>Attempt to access another user's account or data without authorization</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                Violation of these rules may result in account suspension or legal action.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">6. Content Ownership and Usage</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Vendors retain ownership of content submitted (business details, images, documents)</li>
                                <li>By listing on Nexus Built, you grant us a non-exclusive right to display your content on the platform for promotional or listing purposes</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">7. Intellectual Property</h2>
                            <p className="text-gray-700 leading-relaxed">
                                All platform content — including the logo, design, and backend code — is the intellectual property of Nexus Built and protected by applicable laws. You may not reuse or replicate it without permission.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">8. Third-Party Services</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We may integrate third-party tools (e.g., payment gateways, analytics tools). Nexus Built is not liable for the terms and practices of those third parties. Users are encouraged to read their respective terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">9. Service Availability</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We strive to maintain uninterrupted access to our platform. However, we may need to suspend services for maintenance, upgrades, or unforeseen technical issues. We are not liable for service downtime.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">10. Termination</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">We may terminate or suspend your account if:</p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                <li>You breach any terms or policies</li>
                                <li>Your information is found to be false or misleading</li>
                                <li>We are required to do so for legal or regulatory reasons</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                You may also request account deletion at any time via email.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">11. Limitation of Liability</h2>
                            <p className="text-gray-700 leading-relaxed">
                                To the fullest extent permitted by law, Nexus Built is not liable for any indirect, incidental, or consequential damages arising out of or in connection with your use of the platform.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">12. Indemnification</h2>
                            <p className="text-gray-700 leading-relaxed">
                                You agree to indemnify and hold harmless Nexus Built and its affiliates from any claims, damages, or expenses arising from your use of the platform or violation of these Terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">13. Changes to Terms</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We may update these Terms from time to time. Any changes will be effective upon posting. Continued use of the platform after changes means you accept the updated Terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">14. Governing Law</h2>
                            <p className="text-gray-700 leading-relaxed">
                                These Terms are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of UAE courts.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">15. Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                For questions or clarifications regarding these Terms, contact us at:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700 mb-0">
                                    <strong>Email:</strong> <a href="mailto:support@nexusbuilt.com" className="text-[#B93239] hover:underline">support@nexusbuilt.com</a>
                                </p>
                            </div>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                By using Nexus Built, you confirm that you have read, understood, and agree to these Terms & Conditions.
                            </p>
                        </section>
                    </article>
                </div>
            </div>
        </div>
    )
}
