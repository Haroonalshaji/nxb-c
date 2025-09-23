"use client"

import { X } from "lucide-react"
import Image from "next/image" // optional, can be used for optimization

export default function AttachmentsGrid({ images, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-full overflow-y-auto p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Attachments</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.length === 0 ? (
                        <p className="text-gray-500 col-span-full text-center">No attachments available</p>
                    ) : (
                        images.map((img, index) => (
                            <div key={index} className="relative group">
                                {/* Image opens in new tab */}
                                <Image
                                    src={img.filePath}
                                    alt={img.fileName || `Attachment ${index + 1}`}
                                    width={200} // set desired width
                                    height={128} // set desired height
                                    className="rounded-lg cursor-pointer border border-gray-200 hover:scale-105 transition-transform"
                                    onClick={() => window.open(img.filePath, "_blank")}
                                />


                                {/* Download button */}
                                <a
                                    href={img.filePath}
                                    download={img.fileName || `attachment-${index + 1}`}
                                    className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity text-gray-700"
                                    title="Download"
                                >
                                    ⬇️
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
