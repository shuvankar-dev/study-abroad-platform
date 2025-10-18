import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'codescholar_top_banner_dismissed'

export default function TopBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY)
      if (dismissed !== 'true') {
        // Show banner on first visit
        setVisible(true)
      }
    } catch (err) {
      // if localStorage is not available, still show banner
      setVisible(true)
    }
  }, [])

  const dismiss = (remember = true) => {
    try {
      if (remember) localStorage.setItem(STORAGE_KEY, 'true')
    } catch (err) {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-2xl bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-xl shadow-2xl overflow-hidden min-h-[140px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-8 md:p-10">
          <div className="text-center md:text-left">
            <strong className="block text-lg md:text-xl">Limited time offer — 10% off application assistance</strong>
            <span className="block mt-1 text-sm md:text-base opacity-95">Register now and talk to our experts to claim the discount.</span>
          </div>

          <div className="flex items-center gap-3">
            {/* <Link to="/services" className="inline-block bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-md text-sm">Learn more</Link> */}
            <button
              onClick={() => dismiss(true)}
              aria-label="Close banner"
              className="p-2 rounded-full hover:bg-white/10 bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
