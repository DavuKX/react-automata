import NavBar from "@/components/navBar/navBar";
import ToolsSection from "@/components/toolsSection/toolsSection";
import Grid from '@mui/material/Unstable_Grid2'


export default function Home() {
    return (
        <div className='h-screen'>
            <NavBar />
            <Grid container spacing={2}>
                <Grid xs={3}>
                    <ToolsSection />
                </Grid>
                <Grid xs={9}>
                    2
                </Grid>
                <Grid xs={12}></Grid>
            </Grid>
        </div>
    )
}
