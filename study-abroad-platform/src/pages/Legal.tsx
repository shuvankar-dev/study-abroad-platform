import { Link } from 'react-router-dom'

export default function Legal() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-4">Legal & Terms</h1>
        <p className="text-gray-700 mb-6">Last updated: October 15, 2025</p>

        <section className="prose max-w-none text-gray-800">
          <h2>Terms of Use</h2>
          <p>By accessing or using Codescholar Overseas (the "Service"), you agree to be bound by these Terms of Use. Please read them carefully.</p>

          <h2>Acceptable Use</h2>
          <p>Users must not misuse the Service. Prohibited activities include unauthorized access, data scraping, harassment, and illegal activities.</p>

          <h2>Intellectual Property</h2>
          <p>All content on this site is the property of Codescholar Overseas or its licensors. You may not reproduce or redistribute content without permission.</p>

          <h2>Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Codescholar Overseas will not be liable for indirect, incidental, or consequential damages arising from your use of the Service.</p>

          <h2>Governing Law</h2>
          <p>These terms are governed by the laws of the jurisdiction where Codescholar Overseas operates.</p>

          <h2>Contact</h2>
          <p>Questions about these terms should be sent to <a href="mailto:hello@codescholar.com" className="text-blue-600"> info.codescholaroverseas@gmail.com</a>.</p>

          <p className="mt-6">Back to <Link to="/" className="text-blue-600 hover:underline">home</Link>.</p>
        </section>
      </div>
    </div>
  )
}
