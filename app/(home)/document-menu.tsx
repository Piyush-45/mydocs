/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button'
import { Id } from '@/convex/_generated/dataModel';
import { Edit2Icon, ExternalLinkIcon, FilePenIcon, FileX2Icon, MoreVertical, TrashIcon } from 'lucide-react'
import React from 'react'

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RemoveDialog } from '../components/remove-dialog';
import { RenameDialog } from '../components/rename-dialog';

interface DocumentMenuProps {
    documentId: Id<"documents">;
    title: string;
    onNewTab: (id: Id<"documents">) => void;
}
function DocumentMenu({ documentId, title, onNewTab }: DocumentMenuProps) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white '>
                <DropdownMenuItem
                    onClick={() => onNewTab(documentId)}>
                    Open in a new tab
                    <ExternalLinkIcon />
                </DropdownMenuItem>
                <RemoveDialog documentId={documentId} >
                    <DropdownMenuItem
                        onClick={(e) => e.stopPropagation()}
                        onSelect={(e) => e.preventDefault()}
                    >
                        <TrashIcon className='size-4 mr02' />
                        Delete document
                    </DropdownMenuItem>
                </RemoveDialog>
                <RenameDialog
                    documentId={documentId}
                    initialTitle = {title}
                >
                    <DropdownMenuItem
                        onClick={(e) => e.stopPropagation()}
                        onSelect={(e) => e.preventDefault()}
                    >
                        <FilePenIcon className='size-4 mr02' />
                        Rename document
                    </DropdownMenuItem>
                </RenameDialog>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default DocumentMenu