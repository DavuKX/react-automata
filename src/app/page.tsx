"use client"
import NavBar from "@/components/navBar/navBar";
import ToolsSection from "@/components/toolsSection/toolsSection";
import Grid from '@mui/material/Unstable_Grid2'
import AutomatonGraph from "@/components/automatonGraph/automatonGraph";
import { useTranslation} from 'react-i18next';
import '@/i18n'


export default function Home() {
    return (
        <div className='h-screen w-full bg-white'>
            <NavBar />
            <Grid container spacing={2}>
                <Grid xs={3}>
                    <ToolsSection />
                </Grid>
                <Grid xs={9}>
                    <AutomatonGraph />
                </Grid>
                <Grid xs={12}></Grid>
            </Grid>
        </div>
    )
}
