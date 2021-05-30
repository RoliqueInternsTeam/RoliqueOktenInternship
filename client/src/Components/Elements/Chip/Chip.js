import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ChipInput from 'material-ui-chip-input';
import PropTypes from 'prop-types';
import Label from '../Label/Label';

const useStyles = makeStyles(() => ({
  root: {
    background: '#FAFAFB',
    border: '1px solid #BFBFBF',
    width: '408px',
    minHeight: '32px',
    borderRadius: '6px',
    boxSizing: 'border-box',
    marginTop: '8px',
    marginBottom: '16px',
    paddingLeft: '12px',

  },
  chipContainer: {
    minHeight: '32px',
  },
  chip: {
    marginTop: '6px',
    height: '23px',
  },
}));

function Chip(props) {
  const classes = useStyles();

  return (
    <div>
      <Label label='Hashtags' />
      <ChipInput
        onChange={(chips) => props.setState(chips)}
        classes={{
          root: classes.root,
          chipContainer: classes.chipContainer,
          chip: classes.chip,
        }}
        disableUnderline
        disabled={props.disabled}
      />
    </div>
  );
}

Chip.propTypes = {
  setState: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Chip.defaultProps = {
  disabled: false,
};

export default Chip;
