import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const GEMINI_API_KEY = 'AIzaSyANHa1R2CW84LhWUyBrZBz3UZf5jq7mzDo';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!inputValue.trim()) return;
    if (inputValue.trim().length > 500) {
      toast({
        title: 'Message too long',
        description: 'Please keep messages under 500 characters',
      });
      return;
    }

    // Add user message
    const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call Gemini API
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: inputValue }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 256,
            }
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const data = await res.json();
      
      // Parse response
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 
                   "I couldn't understand that. Could you try again?";

      // Add bot message
      const botMessage = { id: Date.now() + 1, text: reply, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      console.error('Gemini API error:', err);
      toast({
        title: 'Error',
        description: 'Failed to get a response from the AI assistant.',
        variant: 'destructive',
      });
      setMessages(prev => [...prev, { 
        id: Date.now() + 2, 
        text: 'Sorry, I encountered an error. Please try again later.', 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: 'Chat cleared',
      description: 'The conversation history has been reset.',
    });
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button 
          onClick={toggleChat} 
          size="icon" 
          className="rounded-full w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-xl hover:scale-110 transition-transform"
        >
          {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-full max-w-sm"
          >
            <Card className="shadow-2xl glassmorphism">
              <CardHeader className="pb-2 flex flex-row justify-between items-center">
                <CardTitle className="text-lg gradient-text">AI Assistant</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearChat}
                  disabled={messages.length === 0 || isLoading}
                >
                  Clear
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-y-auto mb-4 p-2 border rounded-md bg-background/80">
                  {messages.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Ask me anything about your learning journey!
                    </p>
                  )}
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`mb-2 p-2 rounded-lg max-w-[80%] ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted text-muted-foreground mr-auto'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="mb-2 p-2 rounded-lg max-w-[80%] bg-muted text-muted-foreground mr-auto">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
                      </div>
                    </div>
                  )}
                </div>
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={isLoading || !inputValue.trim()}
                  >
                    {isLoading ? '...' : 'Send'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;