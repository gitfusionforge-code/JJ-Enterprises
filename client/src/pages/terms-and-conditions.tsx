import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms and Conditions</h1>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6 text-lg">Welcome to Furniture Showcase! By accessing or using our website, you agree to be bound by these terms and conditions. Please read them carefully.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Site</h2>
          <p className="mb-6">You may use our site for lawful purposes only. You must not misuse our website by knowingly introducing viruses or other malicious material.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
          <p className="mb-6">All content on this site, including text, graphics, logos, and images, is the property of Furniture Showcase and is protected by copyright laws.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
          <p className="mb-6">Furniture Showcase will not be liable for any damages arising from the use or inability to use the site or any products purchased through the site.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Terms</h2>
          <p className="mb-6">We reserve the right to modify these terms at any time. Changes will be posted on this page. Your continued use of the site constitutes acceptance of the new terms.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at support@furnitureshowcase.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}