import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';

const AIAssistant = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI assistant powered by Gemini. How can I help you with device repairs today?',
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    // Simulate AI response (In production, this would call Gemini API)
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: generateMockResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  const generateMockResponse = (question) => {
    const responses = {
      battery: 'For battery replacement:\n1. Power off the device completely\n2. Remove the back cover using a heat gun\n3. Disconnect the battery connector\n4. Remove adhesive strips carefully\n5. Install new battery and test\n\nAlways check battery health before replacement.',
      
      screen: 'Screen replacement procedure:\n1. Heat the edges to soften adhesive\n2. Use suction cup and opening tool\n3. Disconnect display cables\n4. Remove damaged screen\n5. Install new display assembly\n6. Test touch and display functionality',
      
      water: 'Water damage repair steps:\n1. Do NOT power on the device\n2. Disassemble immediately\n3. Clean with isopropyl alcohol (99%)\n4. Dry all components thoroughly\n5. Check for corrosion\n6. Replace damaged components\n7. Test all functionality',
      
      default: 'I can help you with:\n• Battery replacement procedures\n• Screen repair guidelines\n• Water damage recovery\n• Component diagnostics\n• Troubleshooting steps\n\nPlease ask me specific questions about device repair!',
    };

    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('battery') || lowerQuestion.includes('baterai')) {
      return responses.battery;
    } else if (lowerQuestion.includes('screen') || lowerQuestion.includes('layar')) {
      return responses.screen;
    } else if (lowerQuestion.includes('water') || lowerQuestion.includes('air')) {
      return responses.water;
    }
    
    return responses.default;
  };

  const quickQuestions = [
    'How to replace iPhone battery?',
    'Screen replacement procedure',
    'Water damage repair steps',
    'Component diagnostic tools',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/tech/tasks')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-green-600" />
              <h1 className="text-xl font-semibold">AI Assistant (Gemini)</h1>
            </div>
          </div>
          <span className="text-sm text-gray-600">{user?.name}</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm flex flex-col h-[calc(100vh-200px)]">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-green-600" />
                  </div>
                )}
                
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>

                {message.type === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="border-t border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-2">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about device repair..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Powered by Gemini AI - Ask for repair procedures, diagnostics, and troubleshooting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
