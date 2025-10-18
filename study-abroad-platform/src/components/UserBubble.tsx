import React, { useState, useRef, useEffect } from 'react'
import bubbleImg from '../assets/bubbleImg.png'

interface UserBubbleProps {
  onOpenRegistration?: () => void
}

const UserBubble: React.FC<UserBubbleProps> = ({ onOpenRegistration }) => {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const handleScheduleCall = () => {
    const message = 'Schedule a call for me. I want more information about your study abroad facility'
    const phone = '918777841275'
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    setOpen(false)
  }

  return (
    <>
      {/* Floating bubble */}
      <div className="fixed right-6 bottom-6 z-50 flex items-end">
        {/* Panel */}
        {open && (
          <div ref={panelRef} className="mr-4 mb-2 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition transform scale-100">
            <div className="relative px-4 py-4">
              {/* Close X in panel header */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close panel"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-sm"
              >
                ×
              </button>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden shadow-md">
                  <img src={bubbleImg} alt="expert" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 pr-2">
                  <h4 className="text-sm font-semibold text-gray-900">Connect with an Expert</h4>
                  <p className="text-xs text-gray-500 mt-1">Get free guidance and schedule a quick call to explore programs and scholarships.</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <button onClick={handleScheduleCall} className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-semibold shadow-md">Schedule Call with Expert</button>
                <button onClick={() => { onOpenRegistration && onOpenRegistration(); setOpen(false) }} className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium shadow-sm">Register Now for Getting More Discount</button>
              </div>

              <div className="mt-3 text-xs text-gray-400 text-center">2,30,502 students booked and succeeded</div>
            </div>
          </div>
        )}

        {/* Bubble button */}
        <button
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? 'Close expert bubble' : 'Open expert bubble'}
          className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-xl flex items-center justify-center focus:outline-none transition-transform hover:scale-105 ${open ? 'ring-2 ring-primary/40' : ''}`}
        >
          {open ? (
            <span className="text-xl font-bold text-gray-700">×</span>
          ) : (
            <div className="w-11 h-11 rounded-full overflow-hidden flex items-center justify-center">
              <img src={bubbleImg} alt="expert" className="w-full h-full object-cover" />
            </div>
          )}
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-500 ring-2 ring-white" />
          )}
        </button>
      </div>
    </>
  )
}

export default UserBubble
