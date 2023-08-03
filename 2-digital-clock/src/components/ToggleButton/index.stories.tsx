import type { Meta, StoryObj } from '@storybook/react';
import ToggleButton from '.';

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;
export const Default: Story = {
  args: {
    onChange: (e) => {
      console.log(e.currentTarget.checked);
    },
  },
};
