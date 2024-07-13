import React , {useContext} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import DataContext from '../context/DataContext';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const MainWeb = ( {children} ) => {

  const {theme} = useContext(DataContext);

  return (<ThemeProvider theme={theme}>
            <Header />
                {children}  
            <Footer />
           </ThemeProvider>
  )
}

export default MainWeb