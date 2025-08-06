import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6 text-lg">Furniture Showcase is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Information Collection</h2>
          <p className="mb-6">We collect information that you provide directly to us, such as when you create an account, place an order, or contact us for support.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Information</h2>
          <p className="mb-6">We use your information to process orders, provide customer service, and improve our website. We do not sell or share your personal information with third parties except as required by law.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
          <p className="mb-6">Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Security</h2>
          <p className="mb-6">We implement a variety of security measures to maintain the safety of your personal information.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at support@furnitureshowcase.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}