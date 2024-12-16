
import Image from 'next/image'
import React from 'react'
import logo from "../../public/logo.svg"
import Link from 'next/link'
import { SearchInput } from './search-input'
import {UserButton,  OrganizationSwitcher} from "@clerk/nextjs"
export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between h-full w-full">
            <div className="flex gap-3 items-center shrink-0 pr-6">
                <Link href="/" >
                    <Image src={logo} alt="Logo" width={100} height={100} />
                </Link>
                <h3 className="text-xl">Docs</h3>
            </div>
            <SearchInput/>
            <div className="flex gap-3 items-center pl-6">
                <OrganizationSwitcher
                afterCreateOrganizationUrl='/'
                afterLeaveOrganizationUrl='/'
                afterSelectOrganizationUrl='/'
                afterSelectPersonalUrl='/'
                />
            </div>
        <UserButton/>
        </nav>
    )
}
