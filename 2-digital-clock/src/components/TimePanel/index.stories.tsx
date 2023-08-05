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
    hours: 24,
    minutes: 24,
  },
};
