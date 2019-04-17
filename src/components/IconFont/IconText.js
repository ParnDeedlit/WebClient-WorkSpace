import * as React from 'react';
import IconFont from './mapgis';

const IconText = ({ type, text }) => (
    <span>
      <IconFont type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export default IconText;