"use client";

import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-reckoner font-bold text-[#ffcc00] hover:opacity-80 transition-opacity">
            THINKCHAINS
          </Link>
          <Link href="/" className="text-white/70 hover:text-[#ffcc00] transition-colors text-sm uppercase tracking-wider">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-reckoner font-bold text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-white/60 text-sm uppercase tracking-wider">
              Last Updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10 text-white/80 leading-relaxed">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-reckoner font-bold text-[#ffcc00] mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to ThinkChains. These Terms and Conditions govern your use of our website and services. 
                By accessing or using our services, you agree to be bound by these terms. If you do not agree 
                with any part of these terms, please do not use our services.
              </p>
              <p>
                ThinkChains provides strategic advisory services including ideation support, early-stage execution, 
                fundraising narrative development, technical advisory, architecture decisions, product simplification, 
                and category positioning for founders and teams.
              </p>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-2xl font-reckoner font-bold text-[#ffcc00] mb-4">2. Our Services</h2>
              <p className="mb-4">ThinkChains offers the following advisory and consulting services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Ideation & Concept Development:</strong> Helping founders shape and validate their ideas into actionable roadmaps.</li>
                <li><strong>Early-Stage Execution:</strong> Guiding teams from concept to first ship, ensuring clarity and focus throughout the process.</li>
                <li><strong>Fundraising Narrative:</strong> Crafting compelling investor stories, pitch decks, and presentation strategies.</li>
                <li><strong>Technical Advisory:</strong> Providing guidance on technology stack selection, implementation strategies, and best practices.</li>
                <li><strong>Architecture Decisions:</strong> Advising on system design, scalability, and technical trade-offs.</li>
                <li><strong>Product Simplification:</strong> Helping teams prioritize features, reduce scope, and ship focused products.</li>
                <li><strong>Category Positioning:</strong> Developing go-to-market strategies and market positioning frameworks.</li>
              </ul>
            </section>

            {/* Engagement Terms */}
            <section>
              <h2 className="text-2xl font-reckoner font-bold text-[#ffcc00] mb-4">3. Engagement Terms</h2>
              <p className="mb-4">
                All consulting engagements with ThinkChains are subject to a separate Statement of Work (SOW) 
                or engagement letter that outlines the specific scope, deliverables, timeline, and fees for 
                each project.
              </p>
              <p className="mb-4">
                Our advisory services are provided on an as-is basis. While we strive to provide the best 
                possible guidance, we do not guarantee specific business outcomes, funding success, or 
                commercial results.
              </p>
              <p>
                Clients are responsible for all final decisions regarding their business, product, and strategy. 
                ThinkChains provides recommendations and guidance, but implementation and outcomes remain the 
                responsibility of the client.
              </p>
            </section>

            {/* Confidentiality */}
            <section>
              <h2 className="text-2xl font-reckoner font-bold text-[#ffcc00] mb-4">4. Confidentiality</h2>
              <p className="mb-4">
                ThinkChains treats all client information with strict confidentiality. We will not disclose 
                any proprietary information, business plans, technical details, or strategic discussions 
                shared during our engagements without explicit written consent.
              </p>
              <p>
                Clients may be asked to sign a mutual Non-Disclosure Agreement (NDA) before detailed 
                discussions commence. We respect the sensitive nature of early-stage ventures and 
                fundraising activities.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-reckoner font-bold text-[#ffcc00] mb-4">5. Intellectual Property</h2>
              <p className="mb-4">
                All intellectual property developed by clients remains the property of the client. 
                ThinkChains does not claim ownership of any ideas, products, code, or materials 
                developed by clients during or after our engagement.
              </p>
              <p>
                Any frameworks, templates, or methodologies shared by ThinkChains during engagements 
                are provided for client use within the scope of the engagement but remain the 
                intellectual property of ThinkChains.
              </p>
            </section>

            {/* Services Offered Free */}
            <section>
              <h2 className="text-2xl font-reckoner font-bold text-[#ffcc00] mb-4">6. Complimentary Services</h2>
              <p className="mb-4">
                ThinkChains currently offers its advisory and consulting services on a complimentary basis. 
                There are no fees charged for our services at this time.
              </p>
              <p>
                We reserve the right to introduce paid services or modify this policy in the future. 
                Any changes to our pricing model will be communicated in advance and will not affect 
                ongoing engagements without mutual agreement.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-reckoner font-bold text-[#ffcc00] mb-4">7. Limitation of Liability</h2>
              <p className="mb-4">
                ThinkChains provides advisory services based on our experience and expertise. However, 
                we cannot guarantee specific outcomes including but not limited to: successful fundraising, 
                product-market fit, revenue targets, or business success.
              </p>
              <p>
                To the maximum extent permitted by law, ThinkChains shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including loss of profits, data, 
                or business opportunities arising from the use of our complimentary services.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-reckoner font-bold text-[#ffcc00] mb-4">8. Termination</h2>
              <p className="mb-4">
                Either party may terminate an engagement with 14 days written notice. 
              </p>
              <p>
                ThinkChains reserves the right to terminate engagements immediately in cases of breach 
                of these terms or conduct that conflicts with our values and ethics.
              </p>
            </section>

            {/* Website Use */}
            <section>
              <h2 className="text-2xl font-reckoner font-bold text-[#ffcc00] mb-4">9. Website Use</h2>
              <p className="mb-4">
                The content on this website is for informational purposes only. While we strive to keep 
                information accurate and up-to-date, we make no warranties about the completeness, 
                reliability, or accuracy of the information.
              </p>
              <p>
                You may not use our website for any unlawful purpose, attempt to gain unauthorized access, 
                or interfere with the proper functioning of the website.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-reckoner font-bold text-[#ffcc00] mb-4">10. Governing Law</h2>
              <p>
                These Terms and Conditions are governed by and construed in accordance with the laws of India. 
                Any disputes arising from these terms or our services shall be subject to the exclusive 
                jurisdiction of the courts in Indore, Madhya Pradesh, India.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-reckoner font-bold text-[#ffcc00] mb-4">11. Changes to Terms</h2>
              <p>
                ThinkChains reserves the right to modify these Terms and Conditions at any time. 
                Changes will be effective immediately upon posting to this website. Your continued 
                use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-reckoner font-bold text-[#ffcc00] mb-4">12. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="mb-2"><strong>Email:</strong> aditya@thinkchains.com</p>
                <p className="mb-2"><strong>Phone:</strong> +91 9130080178</p>
                <p><strong>Address:</strong> Vijay Nagar, Indore, Madhya Pradesh 453010, India</p>
              </div>
            </section>
          </div>

          {/* Back to Home */}
          <div className="mt-16 text-center">
            <Link 
              href="/" 
              className="inline-block px-8 py-4 bg-[#ffcc00] text-black font-reckoner font-bold uppercase tracking-wider hover:bg-[#ffcc00]/90 transition-colors rounded-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center">
        <p className="text-white/50 text-sm">
          © 2025 ThinkChains. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
