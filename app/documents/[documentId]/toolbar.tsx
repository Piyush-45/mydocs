"use client";

import { useEditorStore } from "@/app/store/user-editor-store";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils";
import {
    BoldIcon,
    ItalicIcon,
    LucideIcon,
    PrinterIcon,
    Redo2Icon,
    SpellCheckIcon,
    UnderlineIcon,
    Undo2Icon,
    LinkIcon,
    ImageIcon,
    ListIcon,
    AlignLeftIcon,
    AlignCenterIcon,
    AlignRightIcon,
    HighlighterIcon,
    TextIcon,
    ListTodoIcon,
    RemoveFormattingIcon,
    ChevronDownIcon
} from "lucide-react";
import { type ColorResult, SketchPicker } from 'react-color'

import { Level } from "@tiptap/extension-heading";

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

const TextColorButton = () => {
    const { editor } = useEditorStore()

    const value = editor?.getAttributes("textStyle").color || "#000000"

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <button className={cn(
                    "h-7 min-w-7  shrink-0 flex flex-col  items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}>
                    <span className="text-xs">A</span>
                    <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 border-0 ">
                <SketchPicker color={value} onChange={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    )


}

const TextHighlightButton = () => {
    const { editor } = useEditorStore()

    const value = editor?.getAttributes("highlight")?.color || "#FFFF00";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <button className={cn(
                    "h-7 min-w-7  shrink-0 flex flex-col  items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}>
                    <HighlighterIcon className="size-4"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 border-0 ">
                <SketchPicker  color={value} onChange={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const FontFamilyButton = () => {
    const { editor } = useEditorStore();

    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" },
        { label: "Georgia", value: "Georgia" },
        { label: "Verdana", value: "Verdana" },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    "h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}>
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {fonts.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() =>
                            editor?.chain().focus().setFontFamily(value).run()
                        }
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                        )}
                    >
                        <span className="text-sm ">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const HeadingLevelButton = () => {
    const { editor } = useEditorStore();

    const headings = [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: 'Heading 1', value: 1, fontSize: '32px' },
        { label: 'Heading 2', value: 2, fontSize: '24px' },
        { label: 'Heading 3', value: 3, fontSize: '20px' },
        { label: 'Heading 4', value: 4, fontSize: '16px' },
        { label: 'Heading 5', value: 5, fontSize: '18px' },

    ]
    const getCurrentHeading = () => {
        for (let level = 0; level <= 5; level++) {
            if (editor?.isActive('heading', { level })) {
                return `Heading ${level}`
            }
        }

        return "Normal text"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    "h-7 min-w-7   shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                )}>
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">

                {headings.map(({ label, value, fontSize }) => (
                    <button
                        key={value}
                        style={{ fontSize }}
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run()
                            } else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run()
                            }
                        }}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && 'bg-neutral-200/80'
                        )}
                    >
                        <span >{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/10",
                isActive && "bg-neutral-200/80"
            )}
        >
            <Icon className="size-4" />
        </button>
    );
};

const ToolBar = () => {
    const { editor } = useEditorStore();

    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            // Undo/Redo/Print/Spell Check
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print(),
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute(
                            "spellcheck",
                            current === "false" ? "true" : "false"
                        );
                    },
                },
                {
                    label: "Remove formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run()
                },
            ],

            // Text Formatting
            [

                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                },

            ],


            // Links/Images

            [
                {
                    label: "Tasklist",
                    icon: ListTodoIcon,
                    isActive: editor?.isActive("tasklist"),
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                },
                {
                    label: "Link",
                    icon: LinkIcon,
                    onClick: () => {
                        const url = prompt("Enter a URL:");
                        if (url) {
                            editor?.chain().focus().setLink({ href: url }).run();
                        }
                    },
                },
                {
                    label: "Image",
                    icon: ImageIcon,
                    onClick: () => {
                        const url = prompt("Enter image URL:");
                        if (url) {
                            editor?.chain().focus().setImage({ src: url }).run();
                        }
                    },
                },
            ],

            // Alignment & List
            [
                {
                    label: "Align Left",
                    icon: AlignLeftIcon,
                    onClick: () => editor?.chain().focus().setTextAlign("left").run(),
                },
                {
                    label: "Align Center",
                    icon: AlignCenterIcon,
                    onClick: () =>
                        editor?.chain().focus().setTextAlign("center").run(),
                },
                {
                    label: "Align Right",
                    icon: AlignRightIcon,
                    onClick: () =>
                        editor?.chain().focus().setTextAlign("right").run(),
                },
                {
                    label: "List",
                    icon: ListIcon,
                    onClick: () => editor?.chain().focus().toggleBulletList().run(),
                },
                {
                    label: "Line Height",
                    icon: TextIcon,
                    onClick: () => console.log("Adjust line height (TODO)"),
                },
            ],

            // heading 

        ];

    return (
        <div className="bg-[#F1F4F9] -z-10 px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">

            {sections[0].map((item) => (<ToolbarButton key={item.label} {...item} />))}
            <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300 "
            />
            <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300 "
            />
            <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300 "
            />
            {/* !! */}
            <FontFamilyButton />
            <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300 "
            />
            <HeadingLevelButton />
            {sections[1].map((item) => (<ToolbarButton key={item.label} {...item} />))}
            <TextColorButton />
            <TextHighlightButton />
            <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300 "
            />
            {sections[2].map((item) => (<ToolbarButton key={item.label} {...item} />))}
            <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300 "
            />

            {sections[3].map((item) => (<ToolbarButton key={item.label} {...item} />))}
            <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300 "
            />


        </div>
    );
};

export default ToolBar;
