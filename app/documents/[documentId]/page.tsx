import { Tiptap } from "./editor"
interface DocumentIdPageProps {
    params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
    return (
        <Tiptap />
    )
}

export default DocumentIdPage