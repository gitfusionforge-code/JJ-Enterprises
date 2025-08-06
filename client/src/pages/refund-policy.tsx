import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Refund Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6 text-lg">Thank you for shopping at Furniture Showcase. If you are not entirely satisfied with your purchase, we're here to help.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Returns</h2>
          <p className="mb-6">You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging and you need to have the receipt or proof of purchase.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Refunds</h2>
          <p className="mb-6">Once we receive your item, we will inspect it and notify you that we have received your returned item. If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping</h2>
          <p className="mb-6">You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non­refundable.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions on how to return your item to us, contact us at support@furnitureshowcase.com.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}