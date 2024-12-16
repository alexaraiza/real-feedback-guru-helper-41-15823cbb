import React from "react";
import { Link } from "react-router-dom";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Multiplier Ltd</h1>
          <div className="flex justify-between text-gray-600">
            <h2 className="font-medium">Website Terms & Conditions</h2>
            <p>Monday 16 December 2024</p>
          </div>
        </div>

        {/* Background */}
        <section className="mb-8">
          <h2 className="font-bold mb-4">BACKGROUND:</h2>
          <p className="text-gray-700 leading-relaxed">
            This agreement applies as between you, the User of this Web Site and Multiplier Ltd, the owner(s) of this Web Site. Your agreement to comply with and be bound by these terms and conditions is deemed to occur upon your first use of the Web Site. If you do not agree to be bound by these terms and conditions, you should stop using the Web Site immediately.
          </p>
        </section>

        {/* Definitions */}
        <section className="mb-8">
          <h2 className="font-bold text-lg mb-4">1. Definitions and Interpretation</h2>
          <p className="mb-4">In this Agreement the following terms shall have the following meanings:</p>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="font-medium">"Content"</div>
              <div className="md:col-span-3">means any text, graphics, images, audio, video, software, data compilations and any other form of information capable of being stored in a computer that appears on or forms part of this Web Site;</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="font-medium">"Multiplier Ltd"</div>
              <div className="md:col-span-3">means Multiplier Ltd trading as EatUP! 71-75 Shelton Street, London, England, WC2H 9JQ;</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="font-medium">"Service"</div>
              <div className="md:col-span-3">means collectively any online facilities, tools, services or information that Multiplier Ltd makes available through the Web Site either now or in the future;</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="font-medium">"System"</div>
              <div className="md:col-span-3">means any online communications infrastructure that Multiplier Ltd makes available through the Web Site either now or in the future. This includes, but is not limited to, web-based email, message boards, live chat facilities and email links;</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="font-medium">"User" / "Users"</div>
              <div className="md:col-span-3">means any third party that accesses the Web Site and is not employed by Multiplier Ltd and acting in the course of their employment;</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="font-medium">"Web Site"</div>
              <div className="md:col-span-3">means the website that you are currently using (https://www.eatup.co/) and any sub-domains of this site unless expressly excluded by their own terms and conditions.</div>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <h2 className="font-bold text-lg mb-4">2. Intellectual Property</h2>
          <div className="space-y-4">
            <p className="text-gray-700">2.1 All Content included on the Web Site, unless uploaded by Users, including, but not limited to, text, graphics, logos, icons, images, sound clips, video clips, data compilations, page layout, underlying code and software is the property of Multiplier Ltd our affiliates or other relevant third parties. By continuing to use the Web Site you acknowledge that such material is protected by applicable United Kingdom and International intellectual property and other relevant laws.</p>
            <p className="text-gray-700">2.2 Subject to sub-clause 2.3 you may not reproduce, copy, distribute, store or in any other fashion re-use material from the Web Site unless otherwise indicated on the Web Site or unless given express written permission to do so by Multiplier Ltd.</p>
            <p className="text-gray-700">2.3 Material from the Web Site may be re-used without written permission where any of the exceptions detailed in Chapter III of the Copyright Designs and Patents Act 1988 apply.</p>
          </div>
        </section>

        {/* Links */}
        <section className="mb-8">
          <h2 className="font-bold text-lg mb-4">3. Links to Other Web Sites</h2>
          <p className="text-gray-700">
            This Web Site may contain links to other sites. Unless expressly stated, these sites are not under the control of Multiplier Ltd or that of our affiliates. We assume no responsibility for the content of such web sites and disclaim liability for any and all forms of loss or damage arising out of the use of them. The inclusion of a link to another site on this Web Site does not imply any endorsement of the sites themselves or of those in control of them.
          </p>
        </section>

        {/* Back to Home */}
        <div className="mt-12 border-t pt-8">
          <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;