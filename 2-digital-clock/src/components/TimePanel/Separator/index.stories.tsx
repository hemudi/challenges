import type { Meta, StoryObj } from '@storybook/react';
import Separator from '.';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Separator>;
export const Default: Story = {};
