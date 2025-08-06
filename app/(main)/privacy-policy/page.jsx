import PolicyHeader from "../../../components/policy-header"

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <PolicyHeader title="Privacy Policy" type="privacy" effectiveDate="August 4, 2025" />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <article className="prose prose-lg max-w-none">
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 rounded-r-lg">
                            <p className="text-gray-700 leading-relaxed mb-0">
                                Nexus Built ("we," "us," or "our") respects your privacy and is committed to protecting the information you share with us. This Privacy Policy outlines how we collect, use, store, and protect your information when you use our website, services, and vendor platform.
                            </p>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">1. Information We Collect</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We collect both personal and non-personal data from users, including:
                            </p>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1. Personal Information:</h3>
                                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                    <li>Full name</li>
                                    <li>Email address</li>
                                    <li>Phone number</li>
                                    <li>Company name and registration details</li>
                                    <li>Service category or area of business</li>
                                    <li>Billing and payment details (processed via third-party gateways)</li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">1.2. Technical and Usage Information:</h3>
                                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                    <li>IP address and device type</li>
                                    <li>Browser type, operating system, and referral source</li>
                                    <li>Pages visited, time spent on each page, and clickstream data</li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">1.3. Cookies and Tracking:</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    We use cookies, pixels, and tracking technologies to enhance user experience, analyze traffic, and personalize content.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">2. How We Use Your Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">We use collected data to:</p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                <li>Provide, manage, and improve our platform and services</li>
                                <li>Create and manage user/vendor accounts</li>
                                <li>Facilitate payment processing and subscription management</li>
                                <li>Communicate updates, promotions, and platform changes</li>
                                <li>Analyze usage patterns to improve user experience</li>
                                <li>Comply with applicable laws and regulations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">3. Sharing of Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We do not sell or rent your personal data. We may share information with:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li><strong>Payment processors:</strong> Such as Razorpay or Stripe, to process transactions securely</li>
                                <li><strong>Third-party service providers:</strong> Who support our technical operations under strict confidentiality agreements</li>
                                <li><strong>Government authorities:</strong> If required to comply with legal obligations or investigations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">4. Data Retention</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">We retain your personal data for as long as:</p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                <li>Your account remains active</li>
                                <li>It is necessary to fulfill the purpose for which it was collected</li>
                                <li>Required to comply with legal, regulatory, or operational obligations</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                You may request deletion of your data, subject to identity verification and lawful exceptions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">5. Your Rights</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                <li>Access and review the personal information we hold about you</li>
                                <li>Correct or update inaccurate information</li>
                                <li>Request deletion of your data (subject to certain limitations)</li>
                                <li>Opt out of marketing communications</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                To exercise these rights, please email us at <a href="mailto:support@nexusbuilt.com" className="text-[#B93239] hover:underline">support@nexusbuilt.com</a>
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">6. Data Security</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We implement industry-standard safeguards to protect your personal data:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                <li>SSL encryption on data transmission</li>
                                <li>Secure servers with limited access</li>
                                <li>Regular monitoring for unauthorized access</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                However, no method of data transmission or storage is completely secure. Users share information at their own risk.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">7. Cookies Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Cookies are small text files stored on your browser. We use cookies for:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 text-gray-700">
                                <li>Authentication and login sessions</li>
                                <li>Remembering user preferences</li>
                                <li>Tracking website traffic and analytics (e.g., Google Analytics)</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                You can control cookies through your browser settings. Disabling them may affect certain functionalities.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">8. Third-Party Links</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Our platform may contain links to third-party websites or services. We are not responsible for their privacy practices or content. Please review their policies before submitting any information.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">9. Children's Privacy</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Nexus Built is not intended for individuals under the age of 18. We do not knowingly collect or process data from children. If we become aware of such activity, we will delete the data promptly.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">10. International Users</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Nexus Built primarily operates within the UAE. If you are accessing the platform from outside the UAE, your information may be transferred to and processed in the UAE. By using our services, you consent to this transfer.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">11. Changes to This Policy</h2>
                            <p className="text-gray-700 leading-relaxed">
                                We may update this Privacy Policy to reflect changes in our practices or for legal reasons. We will notify users of material changes through email or a notice on the website.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                <strong>Last Updated:</strong> August 4, 2025
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">12. Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions or concerns regarding this Privacy Policy, you may contact us at:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700 mb-0">
                                    <strong>Email:</strong> <a href="mailto:support@nexusbuilt.com" className="text-[#B93239] hover:underline">support@nexusbuilt.com</a>
                                </p>
                            </div>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                By using Nexus Built, you agree to the terms of this Privacy Policy.
                            </p>
                        </section>
                    </article>
                </div>
            </div>
        </div>
    )
}
