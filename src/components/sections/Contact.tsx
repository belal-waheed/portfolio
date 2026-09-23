import { useState } from "react";
import {
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { Button, Input, Textarea } from "@/components/ui";
import { PROFILE } from "@/data/constants";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const TOPIC_PILLS = [
  "Full-Time Opportunity",
  "Freelance / Contract Project",
  "Architecture & Code Review",
  "General Inquiry",
];

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [draftCopied, setDraftCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleCopyDraft = () => {
    const draftText = `Subject: ${formData.subject || "Portfolio Inquiry"}\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`;
    navigator.clipboard.writeText(draftText);
    setDraftCopied(true);
    setTimeout(() => setDraftCopied(false), 2500);
  };

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    setFormData((prev) => ({ ...prev, subject: topic }));
    if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
    if (submitError) setSubmitError(null);
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Please enter your name";
    if (!formData.email.trim()) errs.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Please enter a valid email";
    if (!formData.message.trim()) errs.message = "Please enter your message";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        message?: string;
      };

      if (res.ok && (data.success || !data.error)) {
        setIsSubmitted(true);
        setSubmitError(null);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSelectedTopic("");
        setTimeout(() => setIsSubmitted(false), 7000);
      } else {
        const errorMsg =
          data.error || data.message || "Server error while dispatching email.";
        setSubmitError(errorMsg);
        setIsSubmitted(false);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Network connection failed.";
      setSubmitError(msg);
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (submitError) setSubmitError(null);
  };

  const mailtoFallbackUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    formData.subject || "Portfolio Inquiry",
  )}&body=${encodeURIComponent(
    `Hi Belal,\n\nMy name is ${formData.name || "[Your Name]"} (${formData.email || "[Your Email]"}).\n\n${formData.message || ""}`,
  )}`;

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden bg-zinc-950"
    >
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
            <Mail size={13} />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight">
            Let's Build Something{" "}
            <span className="text-gradient-emerald">Great</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3">
            Whether you have a full-time role, a freelance project, or an
            engineering challenge, my inbox is always open.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: 1-Click Fast Actions & Direct Contacts */}
          <div className="lg:col-span-5 space-y-5">
            {/* 1-Click Copy Email Card */}
            <div className="studio-card p-6 border border-emerald-500/30 bg-zinc-900/90 shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Fastest Way to Reach Me
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-base font-bold text-zinc-100 font-mono select-all">
                {PROFILE.email}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md cursor-pointer active:scale-95"
                >
                  {emailCopied ? (
                    <>
                      <Check size={15} /> Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy size={15} /> 1-Click Copy Email
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-zinc-200 transition-colors"
                  title="Open in Email App"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Location & Response Time */}
            <div className="studio-card p-5 border border-white/10 space-y-3 bg-zinc-900/60">
              <div className="flex items-center gap-3 text-zinc-300 text-xs">
                <MapPin size={16} className="text-emerald-400 shrink-0" />
                <span>Cairo, Egypt (UTC+2) • Remote Worldwide</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>Typical response time: Under 12 hours</span>
              </div>
            </div>

            {/* Social Network Profiles */}
            <div className="studio-card p-5 border border-white/10 space-y-3 bg-zinc-900/60">
              <h4 className="text-xs font-mono text-zinc-400 uppercase">
                Profiles & Social
              </h4>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/belal-waheed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-white/5 transition-colors"
                >
                  <Github size={14} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/belal-whaeed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-white/5 transition-colors"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct-Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="studio-card p-6 sm:p-8 border border-white/10 shadow-2xl bg-zinc-900/90 space-y-6">
              {/* Topic Intent Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase block">
                  1. Select Inquiry Topic (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {TOPIC_PILLS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => handleTopicClick(topic)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        selectedTopic === topic
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold"
                          : "bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 border border-white/5"
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                      Your Name
                    </label>
                    <Input
                      name="name"
                      placeholder="e.g. Alex Miller"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      disabled={isSubmitting}
                      className="bg-zinc-950 border-white/10 text-zinc-100 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      disabled={isSubmitting}
                      className="bg-zinc-950 border-white/10 text-zinc-100 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    placeholder="Project Inquiry / Role Discussion"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="bg-zinc-950 border-white/10 text-zinc-100 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-zinc-300 block mb-1.5">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project scope, timeline, or engineering opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    disabled={isSubmitting}
                    className="bg-zinc-950 border-white/10 text-zinc-100 focus:border-emerald-500"
                  />
                </div>

                {/* Status Banners & Actions */}
                <div className="space-y-3 pt-2">
                  {/* Error Alert Box with 1-Click Fallback Action */}
                  {submitError && (
                    <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-zinc-200 text-xs space-y-2.5 animate-fade-in">
                      <div className="flex items-center gap-2 text-amber-400 font-semibold">
                        <AlertCircle size={15} />
                        <span>Direct Dispatch Notice</span>
                      </div>
                      <p className="text-zinc-300 leading-relaxed">
                        {submitError} Your message has been saved in the form.
                        You can copy it or send directly to{" "}
                        <span className="font-mono text-emerald-400">
                          {PROFILE.email}
                        </span>
                        .
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleCopyDraft}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors border border-white/10 cursor-pointer"
                        >
                          {draftCopied ? (
                            <Check size={13} className="text-emerald-400" />
                          ) : (
                            <Copy size={13} />
                          )}
                          <span>
                            {draftCopied
                              ? "Message Copied!"
                              : "Copy Form Content"}
                          </span>
                        </button>
                        <a
                          href={mailtoFallbackUrl}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-medium transition-colors border border-emerald-500/30"
                        >
                          <ExternalLink size={13} />
                          <span>Open in Email App</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending
                        Message...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Check size={16} /> Message Sent Successfully!
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </Button>

                  {/* Success Message Banner */}
                  {isSubmitted && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center animate-fade-in">
                      <p className="text-xs text-emerald-400 font-mono font-medium">
                        Thank you! Your message has been dispatched. I will
                        reply shortly.
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
