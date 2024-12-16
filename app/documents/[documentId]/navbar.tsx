'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DocumentInput } from './document-input'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import {
  BoldIcon, FileIcon, FileJsonIcon, FilePenIcon,
  FilePlusIcon, FileTextIcon, GlobeIcon, ItalicIcon,
  PrinterIcon, Redo2Icon, Strikethrough, TextIcon,
  TrashIcon, UnderlineIcon, Undo2Icon
} from 'lucide-react';

import { BsFilePdf } from 'react-icons/bs';
import { useEditorStore } from '@/app/store/user-editor-store'
import { onSaveHTML, onSaveJSON, onSaveText } from './downloadingMethods'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

export const Navbar = () => {
  const { editor } = useEditorStore()

  const downloadFile = (type: string) => {
    const content = editor?.getHTML() || "";
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `document.${type.toLowerCase()}`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href={'/'}>
          <Image src={"/logo.svg"} alt='logo' width={106} height={106} />
        </Link>
        <div className='flex flex-col'>
          <DocumentInput />
          <div className='flex'>
            <Menubar className="border-none bg-white shadow-none h-auto p-0">

              {/* File Menu */}
              <MenubarMenu>
                <MenubarTrigger className="menubar-trigger">File</MenubarTrigger>
                <MenubarContent className='print:hidden'>

                  <MenubarItem className='menubar-item'>
                    <FilePlusIcon className='size-4 mr-2' /> New Document
                  </MenubarItem>

                  {/* Download Submenu */}
                  <MenubarSub>
                    <MenubarSubTrigger className='menubar-sub-trigger'>
                      <FileIcon className='size-4 mr-2' /> Download
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        className='menubar-item'
                        onClick={() => onSaveHTML(editor)}
                      >
                        <GlobeIcon className='size-4 mr-2' /> HTML
                      </MenubarItem>
                      <MenubarItem
                        className='menubar-item'
                        onClick={() => onSaveJSON(editor)}
                      >
                        <FileJsonIcon className='size-4 mr-2' /> JSON
                      </MenubarItem>
                      <MenubarItem
                        className='menubar-item'
                        onClick={() => window.print()}
                      >
                        <BsFilePdf className='size-4 mr-2' /> PDF
                      </MenubarItem>
                      <MenubarItem
                        className='menubar-item'
                        onClick={() => onSaveText(editor)}
                      >
                        <FileTextIcon className='size-4 mr-2' /> Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarSeparator />

                  <MenubarItem onClick={() => window.print()} className='menubar-item'>
                    <PrinterIcon className='size-4 mr-2' /> Print
                    <MenubarShortcut>⌘ P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              {/* Edit Menu */}
              <MenubarMenu>
                <MenubarTrigger className="menubar-trigger">Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    className='menubar-item'
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className='size-4 mr-2' /> Undo
                    <MenubarShortcut>⌘ Z</MenubarShortcut>
                  </MenubarItem>

                  <MenubarItem
                    className='menubar-item'
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className='size-4 mr-2' /> Redo
                    <MenubarShortcut>⌘ Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              {/* Format Menu */}
              <MenubarMenu>
                <MenubarTrigger className="menubar-trigger">Format</MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger className='menubar-sub-trigger'>
                      <TextIcon className="size-4 mr-2" /> Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem className='menubar-item'>
                        <BoldIcon className="size-4 mr-2" /> Bold
                        <MenubarShortcut>⌘ B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem className='menubar-item'>
                        <ItalicIcon className="size-4 mr-2" /> Italic
                        <MenubarShortcut>⌘ I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem className='menubar-item'>
                        <UnderlineIcon className="size-4 mr-2" /> Underline
                        <MenubarShortcut>⌘ U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem className='menubar-item'>
                        <Strikethrough className="size-4 mr-2" /> Strikethrough
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>

      </div>
      <div className='flex items-center mr-4'>
        <div className="flex gap-3 items-center pl-6">
          <OrganizationSwitcher
            afterCreateOrganizationUrl='/'
            afterLeaveOrganizationUrl='/'
            afterSelectOrganizationUrl='/'
            afterSelectPersonalUrl='/'
          />
        </div>
        <UserButton />
      </div>
    </nav>
  )
}
