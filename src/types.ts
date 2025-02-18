export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Chat {
  id: string;
  messages: Message[];
  title: string;
}

export interface ApiResponse {
  response: string;
  api_created_by: string;
}