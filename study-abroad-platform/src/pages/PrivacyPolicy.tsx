import React from 'react'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-700 mb-6">Last updated: October 15, 2025</p>

        <section className="prose max-w-none text-gray-800">
          <h2>Introduction</h2>
          <p>
            Codescholar Overseas ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>Personal information you provide (name, email, phone, etc.).</li>
            <li>Automatically collected information (IP address, browser, device, analytics).</li>
            <li>Information from cookies and similar technologies.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use information to provide and improve our services, communicate with you, process requests, and for analytics and security purposes.</p>

          <h2>Sharing and Disclosure</h2>
          <p>We do not sell personal information. We may share data with service providers who perform services on our behalf, and when required by law.</p>

          <h2>Your Choices</h2>
          <p>You may opt out of marketing communications, delete account data where applicable, and control cookies through your browser settings.</p>

          <h2>Security</h2>
          <p>We implement reasonable measures to protect your information but cannot guarantee absolute security.</p>

          <h2>Contact</h2>
          <p>If you have questions about this policy, contact us at <a href="mailto:info.codescholaroverseas@gmail.com" className="text-blue-600">info.codescholaroverseas@gmail.com</a>.</p>

          <p className="mt-6">Back to <Link to="/" className="text-blue-600 hover:underline">home</Link>.</p>
        </section>
      </div>
    </div>
  )
}
