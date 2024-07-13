import { createContext , useState} from "react";
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const DataContext = createContext({});

export const DataProvider = ({children}) => { 

    const theme = createTheme({
        root: {
          margin: "0px",
          padding: "0px"
        }
        , palette: {
          primary: {
            main: "#4c5a7d",
          },
          action: {
            disabledBackground: '#696969',
            disabled: '#696969'
          },
          fontFamily: "Kanit"
          
        },
        typography: {
          fontFamily: "Kanit",
          fontWeightBold:100,
          fontWeightLight: 300,
        }
       
      });
      const styles = {
        paperContainer: {
            backgroundImage: `url(${'../../image/bgexam.webp'})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
            transition: "all 150ms linear 0.3s",
            overflow: 'auto'
           
        },
        homeBanner: {
            backgroundImage: `url(${'../../images/homebanner.webp'})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '305px',
            transition: "all 150ms linear 0.3s",
           
        },
        breaCrumbs: {
            backgroundImage: `url(${'../../images/breadcrumbsimg.jpg'})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '305px',
            transition: "all 150ms linear 0.3s",
           
        },
    }

      var codes = "lSzT2MFRywq7beS3wR4fZZJg0zqzXmpkzk0u49nM82U=";
      const scaleTablet = useMediaQuery('(min-width:768px)');
      const scaleMobile = useMediaQuery('(max-width:899px)');
      const scaleMini = useMediaQuery('(max-width:375px)');
      const [listBooking , setListBooking] = useState(JSON.parse(localStorage.getItem('booking')));

      return (
        <DataContext.Provider value={{theme , styles , scaleTablet , scaleMini, scaleMobile , codes , listBooking , setListBooking}}>
            {children}
        </DataContext.Provider>
    )


}

export default DataContext