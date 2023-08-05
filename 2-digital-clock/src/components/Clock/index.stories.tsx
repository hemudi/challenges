import type { Meta, StoryObj } from '@storybook/react';
import Clock from '.';

const meta: Meta<typeof Clock> = {
  title: 'Components/Clock',
  component: Clock,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Clock>;
export const Default: Story = {
  args: {},
};
