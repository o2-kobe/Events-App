import faqs from "./../(data)/faqs";
import FAQCard from "./FAQCard";

export default function FAQs() {
  return (
    <div className="mb-4">
      <h3 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2">
        Frequently Asked Questions
      </h3>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <FAQCard
            key={faq.id}
            pos={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </div>
  );
}
