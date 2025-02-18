import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t bg-white p-6 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 items-end">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="w-full resize-none rounded-2xl border-2 border-gray-200 p-4 pr-12 focus:outline-none focus:border-blue-500 transition-colors min-h-[60px]"
              rows={1}
              disabled={disabled}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={disabled || !input.trim()}
            className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 shadow-md hover:shadow-lg"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}