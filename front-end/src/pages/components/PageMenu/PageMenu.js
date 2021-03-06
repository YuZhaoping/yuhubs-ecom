import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';


import { useIntl } from 'react-intl';


import withStyles from '@material-ui/styles/withStyles';
import styled from '@material-ui/core/styles/styled';

import MuiIconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MoreVertIcon from '@material-ui/icons/MoreVert';


import sizes from 'Pages/components/sizes';

const menuItemHeight = sizes.pageMenuItemHeight;


const IconButton = styled(MuiIconButton)(({
  theme
}) => ({
  padding: theme.spacing(2, 2),
  color: theme.menubar.color,

  '& svg': {
    fontSize: '16px',
    width: '16px',
    height: '16px'
  }
}));


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));


const StyledMenuItem = withStyles(theme => ({
  root: {
    height: `${menuItemHeight}px`
  }
}))(MenuItem);


const Link = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));


const PageMenu = (props) => {
  const { menus, pageRef } = props;

  const intl = useIntl();


  const [anchorMenu, setAnchorMenu] = useState(null);

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  }

  const closeMenu = () => {
    setAnchorMenu(null);
  }

  const open = Boolean(anchorMenu);


  const handleMenuItemClick = (item, index) => {
    closeMenu();

    if (item.path) {
      return;
    }

    if (pageRef && pageRef.current) {
      const onMenuItemClick = pageRef.current.onMenuItemClick;

      if (onMenuItemClick) {
        onMenuItemClick(index);
      }
    }
  };


  return (
    <React.Fragment>

      <IconButton onClick={ toggleMenu }>
        <MoreVertIcon />
      </IconButton>

      <StyledMenu
        id="page-menu"
        anchorEl={ anchorMenu }
        open={ open }
        onClose={ closeMenu }
      >
        {menus.map((item, index) => (
          <StyledMenuItem
            key={ index }
            onClick={ (event) => { handleMenuItemClick(item, index); } }
            component={ item.path ? Link : 'li' }
            to={ item.path }
          >
            <ListItemIcon>
              { item.icon }
            </ListItemIcon>
            <ListItemText
              primary={ intl.formatMessage({id: item.name}) }
            />
          </StyledMenuItem>
        ))}
      </StyledMenu>

    </React.Fragment>
  );
};


export default PageMenu;
