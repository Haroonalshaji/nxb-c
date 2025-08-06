import { Shield, FileText } from 'lucide-react'



export default function PolicyHeader({ title, type, effectiveDate }) {
    const Icon = type === "privacy" ? Shield : FileText

    return (
        <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#B93239] to-[#A02A31] rounded-2xl flex items-center justify-center">
                            <Icon className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
                    <p className="text-gray-600 text-lg">
                        <span className="font-medium">Effective Date:</span> {effectiveDate}
                    </p>
                </div>
            </div>
        </div>
    )
}
