/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaginationStatus } from "convex/react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Doc } from "../../convex/_generated/dataModel";
import { LoaderIcon } from "lucide-react";
import { DocumentRow } from "./document-row";

interface DocumentTableProps {
    documents: Doc<"documents">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus;
}

export const DocumentTable = ({ documents,loadMore, status }: DocumentTableProps) => {
    return (
        <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
            {documents === undefined ? (
                <div className="flex justify-center items-center h-24">
                    <LoaderIcon className="animate-spin text-muted-foreground size-5" />
                </div>
            ) : (
                    <Table>
                        <TableHeader >
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="text-gray-500">Name</TableHead>
                                <TableHead className="text-gray-500">&nbsp;</TableHead>
                                <TableHead className="hidden md:table-cell text-gray-500">Shared at</TableHead>
                                <TableHead className="hidden md:table-cell text-gray-500">Created at</TableHead>
                            </TableRow>
                        </TableHeader>
                        {documents.length === 0 ? (
                            <TableBody>
                                <TableRow className="hover: bg-transparent">
                                    <TableCell className="col-span-4 text-center text-red-900"> No documents found</TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (

                            <TableBody>
                                {documents.map((document) => (
                                    <DocumentRow key={document._id} document={document} />
                                ))}
                            </TableBody>
                        )}
                    </Table>
            )}
        </div>
    );
};