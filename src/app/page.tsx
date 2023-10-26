"use client"
import React from 'react';
import dynamic from "next/dynamic";
const NoSSR = dynamic(() => import("@/components/home/home"), {ssr: false});
export default function Home() {
    return (
        <>
            <NoSSR/>
        </>
    );
}
