import React, { useState } from 'react';
import { Plus, Send } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { LoadingDots } from './components/LoadingDots';
import { Message, ApiResponse } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const clearChat = () => {
    setMessages([]);
    setInput('');
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const encodedPrompt = encodeURIComponent(input.trim());
      const response = await fetch(`https://deepseekai-api.vercel.app/chat/llama/${encodedPrompt}`);
      if (!response.ok) throw new Error('API request failed');
      
      const data: ApiResponse = await response.json();
      const aiMessage: Message = {
        role: 'assistant',
        content: data.response
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again in a moment.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <h1 className="text-4xl font-bold mb-12">What can I help with?</h1>
          <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
            <button className="flex items-center gap-3 p-6 rounded-2xl border border-gray-700 hover:bg-gray-900 transition-colors text-left">
              <div className="p-2 bg-green-900 rounded-lg">
                <Plus className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-xl text-gray-300">Create image</span>
            </button>
            <button className="flex items-center gap-3 p-6 rounded-2xl border border-gray-700 hover:bg-gray-900 transition-colors text-left">
              <div className="p-2 bg-blue-900 rounded-lg">
                <Plus className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xl text-gray-300">Code</span>
            </button>
            <button className="flex items-center gap-3 p-6 rounded-2xl border border-gray-700 hover:bg-gray-900 transition-colors text-left">
              <div className="p-2 bg-yellow-900 rounded-lg">
                <Plus className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-xl text-gray-300">Brainstorm</span>
            </button>
            <button className="flex items-center gap-3 p-6 rounded-2xl border border-gray-700 hover:bg-gray-900 transition-colors text-left">
              <div className="p-2 bg-purple-900 rounded-lg">
                <Plus className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xl text-gray-300">More</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto py-6 px-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {loading && (
              <div className="my-4">
                <LoadingDots />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="border-t border-gray-800 p-4">
        <div className="max-w-3xl mx-auto flex gap-4">
          <button
            onClick={clearChat}
            className="p-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
          <div className="flex-1 flex items-center gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message"
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;