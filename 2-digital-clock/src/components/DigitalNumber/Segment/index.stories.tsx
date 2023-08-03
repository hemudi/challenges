import type { Meta, StoryObj } from '@storybook/react';
import Segment from '.';

const meta: Meta<typeof Segment> = {
  title: 'Components/Segment',
  component: Segment,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Segment>;
export const Default: Story = {
  args: {
    status: 'on',
    align: 'vertical',
  },
};
