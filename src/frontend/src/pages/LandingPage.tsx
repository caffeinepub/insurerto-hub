import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Facebook,
  FileText,
  Headphones,
  Heart,
  Home,
  Instagram,
  Key,
  LayoutGrid,
  Mail,
  MapPin,
  Menu,
  Phone,
  RefreshCw,
  Shield,
  Star,
  Twitter,
  Users,
  Wallet,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetSiteSettings, useSubmitInquiry } from "../hooks/useQueries";

const services = [
  {
    category: "Insurance",
    icon: Heart,
    title: "Life Insurance",
    desc: "Secure your family's future with comprehensive life cover plans.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    category: "Insurance",
    icon: Shield,
    title: "Health Insurance",
    desc: "Cashless hospitalisation & complete medical cover for you and family.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    category: "Insurance",
    icon: Car,
    title: "Vehicle Insurance",
    desc: "Third-party & comprehensive cover for 2-wheelers, cars & commercial vehicles.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    category: "Insurance",
    icon: Home,
    title: "Property Insurance",
    desc: "Protect your home and assets against fire, theft & natural calamities.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    category: "Loans",
    icon: Wallet,
    title: "Personal Loan",
    desc: "Instant approval personal loans at competitive interest rates.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    category: "Loans",
    icon: Building2,
    title: "Home Loan",
    desc: "Flexible home loans with low EMI and quick processing.",
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
  {
    category: "Loans",
    icon: Briefcase,
    title: "Business Loan",
    desc: "Fuel your business growth with collateral-free business loans.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
  {
    category: "Loans",
    icon: Car,
    title: "Vehicle Loan",
    desc: "Drive your dream car or bike with easy vehicle finance options.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    category: "RTO",
    icon: FileText,
    title: "Vehicle Registration",
    desc: "Hassle-free new vehicle registration & renewal services.",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    category: "RTO",
    icon: RefreshCw,
    title: "RC Transfer",
    desc: "Quick RC transfer for second-hand vehicle purchase/sale.",
    color: "text-lime-600",
    bg: "bg-lime-50",
  },
  {
    category: "RTO",
    icon: Key,
    title: "License Renewal",
    desc: "Renew your driving licence online with document assistance.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    category: "RTO",
    icon: ClipboardList,
    title: "NOC Certificate",
    desc: "Obtain vehicle NOC from RTO for re-registration or sale.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
];

const features = [
  {
    icon: Zap,
    title: "Fast Processing",
    desc: "Same-day document processing and quick approvals across all services.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    desc: "Certified advisors with 10+ years of experience in insurance & loans.",
  },
  {
    icon: LayoutGrid,
    title: "All-in-One Platform",
    desc: "Insurance, Loans, and RTO services under one roof — no running around.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Round-the-clock customer support via phone, chat & WhatsApp.",
  },
];

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Business Owner, Delhi",
    initials: "RS",
    rating: 5,
    review:
      "InsureRTO Hub made my vehicle insurance and RC transfer completely smooth. What used to take 2 weeks was done in just 2 days. Highly recommended!",
  },
  {
    name: "Priya Patel",
    role: "Software Engineer, Pune",
    initials: "PP",
    rating: 5,
    review:
      "Got my home loan approved at the best interest rate thanks to their expert guidance. The team is very professional and transparent throughout the process.",
  },
  {
    name: "Mohammed Iqbal",
    role: "Teacher, Hyderabad",
    initials: "MI",
    rating: 5,
    review:
      "Their health insurance plans are excellent. The advisor understood our family's needs perfectly and helped us choose a policy that covers everything we needed.",
  },
];

const socialLinks = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
];

const serviceOptions = services.map((s) => s.title);

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({
    serviceType: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitInquiry = useSubmitInquiry();
  const { data: siteSettings } = useGetSiteSettings();

  const brandName = siteSettings?.businessName || "InsureRTO Hub";
  const contactPhone = siteSettings?.phone || "+91 98765 43210";
  const contactEmail = siteSettings?.email || "info@insurertohub.in";
  const contactAddress =
    siteSettings?.address || "123 MG Road, Bangalore, Karnataka 560001";
  const logoUrl = siteSettings?.logo.getDirectURL() ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.serviceType || !form.name || !form.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitInquiry.mutateAsync(form);
      setSubmitted(true);
      toast.success("Inquiry submitted! Our team will contact you shortly.");
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const goToAdmin = () => {
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={brandName}
                className="h-9 w-auto max-w-[120px] object-contain"
              />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
            )}
            <span className="font-display font-700 text-lg text-navy">
              {brandName.includes(" ") ? (
                <>
                  {brandName.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="text-green-brand">
                    {brandName.split(" ").slice(-1)[0]}
                  </span>
                </>
              ) : (
                brandName
              )}
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {["home", "services", "about", "contact"].map((id) => (
              <button
                type="button"
                key={id}
                data-ocid={`nav.${id}.link`}
                onClick={() => scrollTo(id)}
                className="text-sm font-medium text-muted-foreground hover:text-navy capitalize transition-colors"
              >
                {id}
              </button>
            ))}
            <button
              type="button"
              data-ocid="nav.loans.link"
              onClick={() => scrollTo("services")}
              className="text-sm font-medium text-muted-foreground hover:text-navy transition-colors"
            >
              Loans
            </button>
            <button
              type="button"
              data-ocid="nav.rto.link"
              onClick={() => scrollTo("services")}
              className="text-sm font-medium text-muted-foreground hover:text-navy transition-colors"
            >
              RTO
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              data-ocid="nav.admin.button"
              onClick={goToAdmin}
              className="border-navy text-navy hover:bg-navy hover:text-white"
            >
              Client Login
            </Button>
            <Button
              size="sm"
              data-ocid="nav.quote.button"
              onClick={() => scrollTo("contact")}
              className="bg-green-brand hover:bg-green-700 text-white"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-navy"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-ocid="nav.mobile.toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
            {["home", "services", "loans", "rto", "about", "contact"].map(
              (id) => (
                <button
                  type="button"
                  key={id}
                  onClick={() =>
                    scrollTo(id === "loans" || id === "rto" ? "services" : id)
                  }
                  className="text-sm font-medium text-left text-muted-foreground capitalize py-1"
                >
                  {id}
                </button>
              ),
            )}
            <Button
              size="sm"
              onClick={() => scrollTo("contact")}
              className="bg-green-brand text-white w-full mt-2"
            >
              Get Quote
            </Button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-[600px] flex">
        {/* Left panel */}
        <div className="relative z-10 w-full md:w-[55%] bg-navy flex items-center px-8 md:px-16 py-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-lg"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-6">
              🇮🇳 Trusted by 50,000+ Indians
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              Your Trusted Partner for{" "}
              <span className="text-green-400">Insurance, Loans</span> &amp; RTO
              Services
            </h1>
            <p className="text-white/75 text-base md:text-lg mb-8 leading-relaxed">
              One platform for all your financial needs — fast approvals, expert
              advice, and complete peace of mind. Serving pan-India.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                data-ocid="hero.getstarted.button"
                onClick={() => scrollTo("contact")}
                className="bg-green-brand hover:bg-green-700 text-white font-semibold px-7"
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                data-ocid="hero.services.button"
                onClick={() => scrollTo("services")}
                className="border-white/40 text-white hover:bg-white/10 font-semibold"
              >
                Our Services
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                ["50K+", "Happy Clients"],
                ["15+", "Years Experience"],
                ["200+", "Insurance Plans"],
              ].map(([val, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white">{val}</div>
                  <div className="text-white/60 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right image */}
        <div
          className="hidden md:block absolute inset-y-0 right-0 w-[50%]"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-insurance-family.dim_1200x700.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-navy/20" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-[#F3F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-3">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive financial and RTO solutions for every need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                data-ocid={`services.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 rounded-full ${svc.bg} flex items-center justify-center mb-4`}
                >
                  <svc.icon className={`w-6 h-6 ${svc.color}`} />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {svc.category}
                </span>
                <h3 className="font-semibold text-navy mt-1 mb-2 text-base">
                  {svc.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {svc.desc}
                </p>
                <button
                  type="button"
                  className="text-green-brand text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                  onClick={() => scrollTo("contact")}
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-3">
              Why Choose Us?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We simplify complex financial processes so you can focus on what
              matters most
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-tint flex items-center justify-center mb-4">
                  <feat.icon className="w-7 h-7 text-green-brand" />
                </div>
                <h3 className="font-semibold text-navy text-lg mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section id="contact" className="py-20 bg-[#F3F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
                Streamline Your Needs
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                Tell us what you're looking for and our expert advisors will get
                back to you within 2 hours with the best options available.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Free initial consultation",
                  "Compare 50+ plans instantly",
                  "No hidden charges or commissions",
                  "Doorstep document collection",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-brand shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                data-ocid="inquiry.cta.button"
                onClick={() =>
                  document
                    .getElementById("inquiry-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-navy text-white hover:bg-navy/90"
              >
                Make an Inquiry
              </Button>
            </motion.div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                id="inquiry-form"
                className="bg-white rounded-2xl shadow-card p-8"
                data-ocid="inquiry.form.panel"
              >
                {submitted ? (
                  <div
                    data-ocid="inquiry.success_state"
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-tint flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-brand" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-navy mb-2">
                      Inquiry Submitted!
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Our team will contact you within 2 hours.
                    </p>
                    <Button
                      className="mt-6 bg-green-brand text-white"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="font-display text-xl font-bold text-navy mb-1">
                      Get Free Consultation
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We'll call you back within 2 hours
                    </p>

                    <div>
                      <Label
                        className="text-sm font-medium text-foreground"
                        htmlFor="serviceType"
                      >
                        Service Type <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={form.serviceType}
                        onValueChange={(v) =>
                          setForm((f) => ({ ...f, serviceType: v }))
                        }
                      >
                        <SelectTrigger
                          data-ocid="inquiry.service.select"
                          className="mt-1"
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceOptions.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        data-ocid="inquiry.name.input"
                        className="mt-1"
                        placeholder="e.g. Rajesh Sharma"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          data-ocid="inquiry.phone.input"
                          className="mt-1"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, phone: e.target.value }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          data-ocid="inquiry.email.input"
                          className="mt-1"
                          placeholder="you@email.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        data-ocid="inquiry.message.textarea"
                        className="mt-1 resize-none"
                        rows={3}
                        placeholder="Tell us more about your requirement..."
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      data-ocid="inquiry.submit.button"
                      disabled={submitInquiry.isPending}
                      className="w-full bg-green-brand hover:bg-green-700 text-white font-semibold"
                    >
                      {submitInquiry.isPending
                        ? "Submitting..."
                        : "Submit Inquiry"}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-3">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Trusted by thousands of families and businesses across India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                data-ocid={`testimonials.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#F3F5F7] rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, starIdx) => (
                    <Star
                      key={`${t.name}-star-${starIdx}`}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-5">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white text-sm font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-navy">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={brandName}
                    className="h-8 w-auto max-w-[100px] object-contain"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-green-brand flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="font-display font-bold text-lg">
                  {brandName}
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Your one-stop solution for Insurance, Loans, and all RTO
                services. Trusted pan-India.
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ Icon, label }) => (
                  <button
                    type="button"
                    key={label}
                    aria-label={label}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-green-brand flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Insurance */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide mb-4">
                Insurance
              </h4>
              <ul className="space-y-2">
                {[
                  "Life Insurance",
                  "Health Insurance",
                  "Vehicle Insurance",
                  "Property Insurance",
                ].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => scrollTo("services")}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Loans & RTO */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide mb-4">
                Loans &amp; RTO
              </h4>
              <ul className="space-y-2">
                {[
                  "Personal Loan",
                  "Home Loan",
                  "Vehicle Registration",
                  "RC Transfer",
                  "License Renewal",
                ].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => scrollTo("services")}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide mb-4">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  {contactPhone}
                </li>
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  {contactEmail}
                </li>
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  {contactAddress}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
            <span>
              © {new Date().getFullYear()} {brandName}. All rights reserved.
            </span>
            <span>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white/70 transition-colors"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
