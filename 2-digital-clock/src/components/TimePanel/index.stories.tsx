import type { Meta, StoryObj } from '@storybook/react';
import TimePanel from '.';

const meta: Meta<typeof TimePanel> = {
  title: 'Components/TimePanel',
  component: TimePanel,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TimePanel>;
export const Default: Story = {
  args: {
    hour: 24,
    minute: 24,
  },
};
