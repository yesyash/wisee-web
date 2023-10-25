import React from 'react'
import type { Preview } from "@storybook/react";

import { inter } from '../src/fonts';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={`font-sans ${inter.variable}`}>
        <Story />
      </div>
    )
  ]
};

export default preview;
