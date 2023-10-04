import NavBar from "@/components/navBar/navBar";
import ToolsSection from "@/components/toolsSection/toolsSection";
import Grid from '@mui/material/Unstable_Grid2'

import global_en from '@/locales/en/global.json';
import global_es from '@/locales/es/global.json';
import global_pt from '@/locales/pt/global.json';
import i18next from 'i18next';

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',                              // language to use
  resources: {
    en: {
      global: global_en           
    },
    es: {
      global: global_es
    },
    pt: {
      global: global_pt
    },
  },
});

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
