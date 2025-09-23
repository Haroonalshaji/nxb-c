"use client"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function StatusUpdateModal({ isOpen, onClose, onSubmit, status }) {
    const [statusNotes, setStatusNotes] = useState("")

    const handleSave = () => {
        onSubmit(statusNotes) // pass notes back to parent
        setStatusNotes("")
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Status to "{status}"</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Label htmlFor="statusNotes">Status Notes</Label>
                    <Textarea
                        id="statusNotes"
                        placeholder="Enter notes about this status change..."
                        value={statusNotes}
                        onChange={(e) => setStatusNotes(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="bg-[#B80D2D] text-white" onClick={handleSave}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
