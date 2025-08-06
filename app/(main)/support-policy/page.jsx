import PolicyHeader from "../../../components/policy-header"

export default function SupportPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <PolicyHeader title="Support & Grievance Redressal Policy" type="terms" effectiveDate="August 4, 2025" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed mb-0">
                At Nexus Built, we are committed to delivering reliable, timely, and respectful support to all users and vendors on our platform. This policy outlines our support channels, escalation mechanisms, and grievance redressal process.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">1. Support Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We offer multiple channels to assist users with general queries, platform issues, subscription concerns, and technical problems.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Available Support For:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Vendor onboarding and verification</li>
                  <li>Profile updates and listing issues</li>
                  <li>Subscription and billing support</li>
                  <li>Enquiry dashboard guidance</li>
                  <li>Technical bugs or login problems</li>
                  <li>Refund, cancellation, and T&C-related clarifications</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">2. Primary Support Channels</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You can reach us via:</p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-2">
                      <strong>Email:</strong> <a href="mailto:support@nexusbuilt.com" className="text-[#B93239] hover:underline">support@nexusbuilt.com</a>
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Business Hours:</strong> Sunday to Thursday, 10:00 AM – 6:00 PM (UAE Time)
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-0">
                      <strong>Expected Response Time:</strong> Within 24–48 business hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-gray-700 mb-0">
                  <strong>For subscription-related queries, use the subject line:</strong> SUBSCRIPTION SUPPORT – [Your Business Name]
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">3. Escalation Matrix</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If your concern is not resolved within the expected timeframe or you are not satisfied with the response, you may escalate the issue to our Grievance Officer.
              </p>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Grievance Officer Contact:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Name:</strong> Compliance Desk – Nexus Built</li>
                  <li><strong>Email:</strong> <a href="mailto:grievance@nexusbuilt.com" className="text-[#B93239] hover:underline">grievance@nexusbuilt.com</a></li>
                  <li><strong>Subject Line:</strong> GRIEVANCE – [Nature of Complaint]</li>
                  <li><strong>Response Time:</strong> Within 5 business days</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Please include the following in your escalation email:</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Full Name and Business Name</li>
                  <li>Registered Email ID</li>
                  <li>Description of the issue and ticket number (if applicable)</li>
                  <li>Screenshots or evidence (if applicable)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">4. Resolution Timelines</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Type of Request</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Expected Resolution Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">General platform queries</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">24–48 business hours</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Account verification issues</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">2–3 business days</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Subscription/billing issues</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">3–5 business days</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Refund & cancellation</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Up to 10 business days</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Escalated grievances</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700">Within 5 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">5. Commitment to Fair Resolution</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We are committed to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Providing clear and timely communication</li>
                <li>Keeping all support interactions confidential</li>
                <li>Treating all users with fairness and professionalism</li>
                <li>Resolving disputes in accordance with our Terms & Conditions and applicable UAE laws</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">6. Policy Updates</h2>
              <p className="text-gray-700 leading-relaxed">
                This policy may be updated from time to time to align with operational changes or legal requirements. Updates will be reflected on this page with the latest effective date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-[#B93239] pb-2">Need Help?</h2>
              <div className="bg-[#B93239]/10 border border-[#B93239]/20 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-0">
                  We're here to help you grow your business smoothly. For assistance, write to us anytime at: 
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
