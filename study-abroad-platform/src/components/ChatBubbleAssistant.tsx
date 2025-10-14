import { useState } from 'react';

const PREDEFINED_QA = [
  {
    q: 'How do I start my application?',
    a: 'Click on Register or Book Consultation. Our team will guide you step by step!'
  },
  {
    q: 'What services do you offer?',
    a: 'We help with university selection, visa, accommodation, test prep, and more.'
  },
  {
    q: 'Can you help with scholarships?',
    a: 'Yes! We guide you to find and apply for scholarships relevant to your profile.'
  },
  {
    q: 'How do I contact a counselor?',
    a: 'Use the chat, call us, or book a free consultation from the homepage.'
  },
  {
    q: 'Is there a fee for your services?',
    a: 'Our initial counseling is free. Some services may have a fee, discussed transparently.'
  }
];

export default function ChatBubbleAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{from: 'user'|'bot', text: string}[]>([]);

  const handleQuestion = (q: string, a: string) => {
    setMessages(msgs => [...msgs, {from: 'user', text: q}, {from: 'bot', text: a}]);
  };

  return (
    <>
      {/* Floating bubble button */}
      <button
        className="fixed z-40 bottom-28 right-8 bg-gradient-to-br from-primary to-accent text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-2xl hover:scale-105 transition-all"
        onClick={() => setOpen(o => !o)}
        aria-label="Open assistant chat"
      >
        💬
      </button>
      {/* Chat window */}
      {open && (
        <div className="fixed z-50 bottom-44 right-8 w-80 max-w-xs bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-3 font-bold text-lg">Ask Assistant</div>
          <div className="flex-1 px-4 py-3 space-y-2 overflow-y-auto max-h-80">
            {messages.length === 0 && (
              <div className="text-gray-500 text-sm mb-2">Select a question below to get started:</div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.from === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-800'}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {PREDEFINED_QA.map((qa, i) => (
                <button
                  key={i}
                  className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full hover:bg-primary/20 transition"
                  onClick={() => handleQuestion(qa.q, qa.a)}
                  disabled={!!messages.find(m => m.text === qa.q)}
                >
                  {qa.q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
