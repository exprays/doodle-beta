import { ReactElement } from "react";

export interface StoryContent {
  id: string;
  type: 'video' | 'text' | 'ai-chat';
  src?: string;
  backgroundColor?: string;
  title: string | ReactElement; // Changed from ReactNode to be more specific
  description: string;
  buttonText: string;
  fullStory?: string;
}