"use client"

import { Mail, MessageSquare, Phone } from "lucide-react"
import styles from '@/app/contact/contact.module.css'

function ContactCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
      <div className={styles.contactCard}>
        <div className={`${styles.contactIconWrapper} bg-blue-50`}>
          <Mail className="h-4 w-4 text-blue-600" />
        </div>
        <h3 className="text-lg font-garnett mb-2">Email Us</h3>
        <p className="text-gray-600 text-sm mb-3 font-universal">Drop us a line anytime</p>
        <a href="mailto:hello@leadaio.com" className="text-blue-600 hover:text-blue-700 text-sm font-universal">
          hello@leadaio.com
        </a>
      </div>

      <div className={styles.contactCard}>
        <div className={`${styles.contactIconWrapper} bg-green-50`}>
          <MessageSquare className="h-4 w-4 text-green-600" />
        </div>
        <h3 className="text-lg font-garnett mb-2">Live Chat</h3>
        <p className="text-gray-600 text-sm mb-3 font-universal">Chat with our team</p>
        <button className="text-green-600 hover:text-green-700 text-sm font-universal">
          Start a conversation
        </button>
      </div>

      <div className={styles.contactCard}>
        <div className={`${styles.contactIconWrapper} bg-purple-50`}>
          <Phone className="h-4 w-4 text-purple-600" />
        </div>
        <h3 className="text-lg font-garnett mb-2">Phone</h3>
        <p className="text-gray-600 text-sm mb-3 font-universal">Mon-Fri from 8am to 5pm</p>
        <a href="tel:+1234567890" className="text-purple-600 hover:text-purple-700 text-sm font-universal">
          +1 (234) 567-890
        </a>
      </div>
    </div>
  )
}

export { ContactCards }
export default ContactCards