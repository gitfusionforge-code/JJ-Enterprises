import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { storeInfo } from "@/lib/data";
import { MapPin, Phone, Mail, Clock, Check } from "lucide-react";
import type { InsertContact } from "@shared/schema";

export default function ContactSection() {
  const [formData, setFormData] = useState<InsertContact>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createContactMutation = useMutation({
    mutationFn: async (contact: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", contact);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        interest: "",
        message: ""
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: () => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createContactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof InsertContact, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-cream-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">Visit Our Showroom</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">Experience our furniture collections in person and receive personalized design consultation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-playfair font-semibold mb-6 text-charcoal">Store Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-rich-brown mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-charcoal" data-testid="text-store-name">
                        {storeInfo.name}
                      </p>
                      <p className="text-gray-600" data-testid="text-store-street">
                        {storeInfo.address.street}
                      </p>
                      <p className="text-gray-600" data-testid="text-store-city">
                        {storeInfo.address.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-rich-brown mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-charcoal">Phone</p>
                      <p className="text-gray-600" data-testid="text-store-phone">
                        {storeInfo.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-rich-brown mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-charcoal">Email</p>
                      <p className="text-gray-600" data-testid="text-store-email">
                        {storeInfo.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-rich-brown mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-charcoal">Store Hours</p>
                      <div className="text-gray-600 space-y-1">
                        <p data-testid="text-hours-weekdays">{storeInfo.hours.weekdays}</p>
                        <p data-testid="text-hours-saturday">{storeInfo.hours.saturday}</p>
                        <p data-testid="text-hours-sunday">{storeInfo.hours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-playfair font-semibold mb-4 text-charcoal">Why Visit Us?</h3>
                <ul className="space-y-3 text-gray-600">
                  {[
                    "Free design consultation",
                    "Touch and feel our quality materials",
                    "Custom furniture options",
                    "Expert style advice"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-rich-brown mr-3" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-white shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-playfair font-semibold mb-6 text-charcoal">Get In Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="w-full"
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-charcoal mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="w-full"
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full"
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full"
                    data-testid="input-phone"
                  />
                </div>
                
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-charcoal mb-2">
                    Interest
                  </label>
                  <Select value={formData.interest || ""} onValueChange={(value) => handleInputChange("interest", value)}>
                    <SelectTrigger data-testid="select-interest">
                      <SelectValue placeholder="Select your interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sofas">Sofas & Sectionals</SelectItem>
                      <SelectItem value="dining">Dining Room</SelectItem>
                      <SelectItem value="bedroom">Bedroom Furniture</SelectItem>
                      <SelectItem value="office">Office Furniture</SelectItem>
                      <SelectItem value="custom">Custom Design</SelectItem>
                      <SelectItem value="consultation">Design Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your project or any questions you have..."
                    value={formData.message || ""}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="w-full resize-none"
                    data-testid="textarea-message"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={createContactMutation.isPending}
                  className="w-full bg-rich-brown text-white px-6 py-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200 font-medium text-lg"
                  data-testid="button-send-message"
                >
                  {createContactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
