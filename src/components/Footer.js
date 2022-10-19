import * as React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArchiveIcon from '@mui/icons-material/Archive'
import Paper from '@mui/material/Paper'
import styled from 'styled-components'

export default function FixedBottomNavigation() {
 const [value, setValue] = React.useState(0)

 return (
  <ContainerFooter>
   <Paper
    sx={{
     position: 'fixed',
     bottom: 0,
     left: 0,
     right: 0,
     backgroundColor: 'var(--midnight)',
     boxShadow: 'var(--lightShadow)',
    }}
    elevation={3}
    className="paper"
   >
    <BottomNavigation
     showLabels
     value={value}
     onChange={(event, newValue) => {
      setValue(newValue)
     }}
     sx={{
      backgroundColor: 'var(--clr-bcg)',
      boxShadow: 'var(--lightShadow)',
      height: '10vh',
     }}
    >
     <BottomNavigationAction
      label="Recents"
      icon={<RestoreIcon opacity="0.3" />}
     />
     <BottomNavigationAction
      label="Favorites"
      icon={<FavoriteIcon opacity="0.3" />}
     />
     <BottomNavigationAction
      label="Archive"
      icon={<ArchiveIcon opacity="0.3" />}
     />
    </BottomNavigation>
   </Paper>
  </ContainerFooter>
 )
}

const ContainerFooter = styled.div``
