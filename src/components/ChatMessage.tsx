import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, User, Bot } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div className={`flex gap-4 p-6 ${message.role === 'assistant' ? 'bg-blue-50' : ''}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        message.role === 'assistant' ? 'bg-blue-600' : 'bg-gray-700'
      }`}>
        {message.role === 'assistant' ? (
          <Bot className="w-6 h-6 text-white" />
        ) : (
          <User className="w-6 h-6 text-white" />
        )}
      </div>
      <div className="flex-1">
        <div className="prose prose-blue max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
      {message.role === 'assistant' && (
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
          title="Copy message"
        >
          <Copy size={20} />
        </button>
      )}
    </div>
  );
}