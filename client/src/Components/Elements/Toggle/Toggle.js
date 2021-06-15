import React, { useEffect, useState } from 'react';
import classes from './Toggle.module.css';

const Toggle = (props) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => props.onClick(checked), [checked]);

  return (
    <div>
      <label className={classes.switch}>
        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
        <span className={classes.slider} />
      </label>
    </div>
  );
};

export default Toggle;
