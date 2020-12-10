import { createMuiTheme } from '@material-ui/core/styles'
import { teal, green } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
      primary: {
      light: '#92b891',
      main: '#2e3332',
      dark: '#2e3332',
      contrastText: '#fff',
    },
    secondary: {
      light: '#92b891',
      main: '#ffa726',
      dark: '#c77800',
      contrastText: '#000',
    },
      openTitle: teal['700'],
      protectedTitle: green['700'],
      type: 'light'
    }
  })

  export default theme  