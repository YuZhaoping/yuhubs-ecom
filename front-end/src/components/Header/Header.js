import React from 'react';


import styled from '@material-ui/core/styles/styled';

import MuiAppBar from '@material-ui/core/AppBar';
import MuiIconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';


import AppsMenu from 'Components/AppsMenu';


import sizes from 'Components/sizes';

const toolbarHeight = sizes.headerToolbarHeight;


const AppBar = styled(MuiAppBar)(({
  theme
}) => ({
  top: 0,
  background: theme.palette.common.white,
  color: theme.menubar.dark
}));


const Toolbar = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',

  height: `${toolbarHeight}px`
});


const GrowSpace = styled('div')({
  flexGrow: 1,
  width: '100%'
});


const SidebarButton = styled(MuiIconButton)(({
  theme
}) => ({
  padding: theme.spacing(2)
}));


const Header = ({ onDrawerToggle }) => (
  <AppBar position="sticky" elevation={0}>
    <Toolbar>
      <SidebarButton
        onClick={ onDrawerToggle }
        color="inherit"
        aria-label="Open drawer"
      >
        <MenuIcon />
      </SidebarButton>

      <GrowSpace />

      <AppsMenu />

    </Toolbar>
  </AppBar>
);


export default Header;
