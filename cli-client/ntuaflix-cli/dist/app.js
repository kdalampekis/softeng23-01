import React from 'react';
import { Text } from 'ink';
export default function App({
  name = 'Ntuaflix CLI'
}) {
  return /*#__PURE__*/React.createElement(Text, null, "$", /*#__PURE__*/React.createElement(Text, {
    color: "green"
  }, name));
}