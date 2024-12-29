import { StoryContent } from '@/types/types';
import React from 'react';

export const STORY_DATA: StoryContent[] = [
  {
    id: "vacation",
    type: "video",
    src: "/videos/summer.mp4",
    title: React.createElement('span', {}, [
      'vacati',
      React.createElement('b', { key: 'o' }, 'o'),
      'n'
    ]),
    description: "A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure.",
    buttonText: "Read Summer Story",
    fullStory: "Our summer adventures were filled with unexpected joy and countless memories..."
  },
  {
    id: "love",
    type: "video",
    src: "/videos/latte.mp4",
    title: React.createElement('span', {}, [
      'Lo',
      React.createElement('b', { key: 'v' }, 'v'),
      'e'
    ]),
    description: "An anime and gaming-inspired NFT collection - the IP primed for expansion.",
    buttonText: "Read Love Story",
    fullStory: "The journey of our love story began with a simple coffee date..."
  },
  {
    id: "yummy",
    type: "video",
    src: "/videos/bakery.mp4",
    title: React.createElement('span', {}, [
      'Lo',
      React.createElement('b', { key: 'v' }, 'v'),
      'e'
    ]),
    description: "An anime and gaming-inspired NFT collection - the IP primed for expansion.",
    buttonText: "Read Love Story",
    fullStory: "The journey of our love story began with a simple coffee date..."
  },
  {
    id: "text-story",
    type: "text",
    backgroundColor: "#1a1a1a",
    title: React.createElement('span', {}, [
      'Th',
      React.createElement('b', { key: 'o' }, 'o'),
      'ughts'
    ]),
    description: "A collection of memories and thoughts that shape our journey together.",
    buttonText: "Read Thoughts",
    fullStory: "Every moment spent together adds a new chapter to our story..."
  },
  {
    id: "ai-chat",
    type: "ai-chat",
    src: "videos/chat.mp4",
    title: React.createElement('span', {}, [
      'Ch',
      React.createElement('b', { key: 'a' }, 'a'),
      't'
    ]),
    description: "Have a conversation with our AI companion about our journey together.",
    buttonText: "Start Chat",
  }
];