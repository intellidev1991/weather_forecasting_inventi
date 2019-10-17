import React from 'react';

const DescriptionItem = ({ label, value, unit = '' }) => {
  return (
    <p style={styles.label}>
      {`${label}: `}
      <span style={styles.value}>
        {parseFloat(value).toFixed(3)} {unit}
      </span>
    </p>
  );
};

export { DescriptionItem };

const colors = {
  black: '#212121',
  blue: '#1A237E'
};

const styles = {
  label: {
    fontSize: '14',
    fontWeight: '700',
    color: colors.blue
  },
  value: {
    fontSize: '14',
    fontWeight: '400',
    color: colors.black
  }
};
