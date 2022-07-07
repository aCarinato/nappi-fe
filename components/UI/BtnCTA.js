import classes from './BtnCTA.module.css';
import { Icon } from '@iconify/react';

function BtnCTA({
  type = 'button',
  classname = 'btn-light',
  label,
  onCLickAction,
  icon = false,
  iconType,
}) {
  // const { type, classname, label, onCLickAction } = props;
  return (
    <button
      type={type}
      className={classes[`${classname}`]}
      onClick={onCLickAction}
    >
      {label} {icon && <Icon icon={iconType} />}
    </button>
  );
}

export default BtnCTA;
