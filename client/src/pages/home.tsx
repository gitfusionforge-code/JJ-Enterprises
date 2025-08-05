import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedProducts from "@/components/featured-products";
import ProductsGallery from "@/components/products-gallery";
import AboutSection from "@/components/about-section";
import Testimonials from "@/components/testimonials";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <ProductsGallery />
      <AboutSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}
