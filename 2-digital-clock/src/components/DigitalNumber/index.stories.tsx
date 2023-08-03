import type { Meta, StoryObj } from '@storybook/react';
import DigitalNumber from '.';

const meta: Meta<typeof DigitalNumber> = {
  title: 'Components/DigitalNumber',
  component: DigitalNumber,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DigitalNumber>;
export const Default: Story = {
  args: {
    value: 0,
  },
};
