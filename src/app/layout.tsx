import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Footer from "@/components/footer/footer";
import NavBar from "@/components/navBar/navBar";
import React from "react";

const inter = Inter({subsets: ['latin']})

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
                <NavBar/>
                {children}
                <Footer/>
            </body>
        </html>
    )
}
