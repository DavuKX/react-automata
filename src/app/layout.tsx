import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Footer from "@/components/footer/footer";
import React from "react";
import dynamic from "next/dynamic";

const inter = Inter({subsets: ['latin']})
const NavBarNoSSR = dynamic(() => import('@/components/navBar/navBar'), {ssr: false})

export const metadata: Metadata = {
    title: 'Automaton',
    description: 'Automaton',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NavBarNoSSR/>
                {children}
                <Footer/>
            </body>
        </html>
    )
}
