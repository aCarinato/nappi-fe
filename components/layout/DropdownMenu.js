import React from 'react';
import classes from './DropdownMenu.module.css';

const DropdownMenu = React.forwardRef((props, ref) => {
  const { menuItems } = props;

  //   console.log(menuItems);

  const menu = menuItems.map((menuItem, index) => (
    <div
      className={classes['container-flex-vertical-item']}
      key={index}
      onClick={menuItem.action}
    >
      <span>{menuItem.name}</span>
    </div>
  ));

  return (
    <div ref={ref} className={classes['container-flex-vertical']}>
      {menu}
    </div>
  );
});

export default DropdownMenu;
