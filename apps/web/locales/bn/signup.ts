import type { SignupTranslations } from "../en/signup";

const signup: SignupTranslations = {
  brandTagline: "জ্ঞান · দিকনির্দেশনা · শান্তি", language: "ভাষা", alreadyAccount: "আগে থেকেই অ্যাকাউন্ট আছে?", signIn: "সাইন ইন",
  hero: { join: "যোগ দিন", brand: "HudaVerse", subtitle: "আপনার যাত্রা শুরু করুন", with: "সঙ্গে", knowledge: "ঐশী জ্ঞান", paragraph: "এক জায়গায় কুরআন, হাদিস, ইসলামি জ্ঞান এবং কার্যকর শেখার উপকরণ পান।", features: [{ title: "কুরআন ও হাদিস", description: "পড়ুন, শিখুন ও ভাবুন" }, { title: "ইসলামি শিক্ষা", description: "আপনার জ্ঞান বাড়ান" }, { title: "AI সহকারী", description: "বিশ্বস্ত দিকনির্দেশনা পান" }, { title: "বিশ্ব সম্প্রদায়", description: "সংযুক্ত হোন ও একসঙ্গে এগিয়ে যান" }], quote: "জ্ঞান অন্বেষণ করুন, কারণ তা এমন আলো যা কখনো ম্লান হয় না।", quoteBy: "— HudaVerse", languages: "ভাষা" },
  card: { title: "অ্যাকাউন্ট তৈরি করুন", subtitle: "HudaVerse ইকোসিস্টেমে আপনার যাত্রা শুরু করুন" },
  fields: { fullName: "পুরো নাম *", fullNamePlaceholder: "আপনার পুরো নাম লিখুন", email: "ইমেইল ঠিকানা *", emailPlaceholder: "you@example.com", password: "পাসওয়ার্ড *", passwordPlaceholder: "শক্তিশালী পাসওয়ার্ড তৈরি করুন", confirm: "পাসওয়ার্ড নিশ্চিত করুন *", confirmPlaceholder: "পাসওয়ার্ড আবার লিখুন", dob: "জন্মতারিখ (ঐচ্ছিক)", dobPlaceholder: "জন্মতারিখ নির্বাচন করুন", country: "দেশ / অঞ্চল", countryPlaceholder: "আপনার দেশ নির্বাচন করুন", countrySearch: "দেশ খুঁজুন", countryEmpty: "কোনো দেশ পাওয়া যায়নি", interests: "আপনার আগ্রহ নির্বাচন করুন (ঐচ্ছিক)", interestsPlaceholder: "এক বা একাধিক আগ্রহ বাছুন", showPassword: "পাসওয়ার্ড দেখান", hidePassword: "পাসওয়ার্ড লুকান" },
  interests: { quran: "কুরআন", hadith: "হাদিস", fiqh: "ফিকহ", tafsir: "তাফসির", islamicHistory: "ইসলামি ইতিহাস", others: "অন্যান্য" },
  strength: { label: "পাসওয়ার্ডের শক্তি", weak: "দুর্বল", fair: "মাঝারি", strong: "শক্তিশালী" },
  terms: { before: "আমি সম্মত", and: "এবং", service: "পরিষেবার শর্তাবলি", privacy: "গোপনীয়তা নীতি", required: "চালিয়ে যেতে পরিষেবার শর্তাবলি ও গোপনীয়তা নীতিতে সম্মতি দিন।" },
  submit: "অ্যাকাউন্ট তৈরি করুন", submitting: "অ্যাকাউন্ট তৈরি হচ্ছে…", continueWith: "অথবা চালিয়ে যান", social: { google: "Google দিয়ে চালিয়ে যান", microsoft: "Microsoft দিয়ে চালিয়ে যান", facebook: "Facebook দিয়ে চালিয়ে যান" }, securityNote: "HudaVerse-এ আপনার তথ্য নিরাপদ ও সুরক্ষিত।",
  errors: { required: "প্রয়োজনীয় তথ্য পূরণ করে আবার চেষ্টা করুন।", mismatch: "পাসওয়ার্ড দুটি মেলেনি।", weak: "কমপক্ষে ১০ অক্ষরের, প্রচলিত নয় এমন পাসওয়ার্ড দিন।", rateLimit: "অনেকবার চেষ্টা হয়েছে। আবার চেষ্টা করার আগে অপেক্ষা করুন।", unavailable: "এই সাইন-আপ পদ্ধতি এখনো উপলভ্য নয়।", general: "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।", email: "সঠিক ইমেইল ঠিকানা দিন।" },
  success: { title: "আপনার ইমেইল দেখুন", body: "এই ঠিকানার জন্য অ্যাকাউন্ট তৈরি করা গেলে, আপনার ইনবক্সে যাচাইকরণ নির্দেশনা পাঠানো হবে। অ্যাকাউন্ট তৈরির জন্য লিংকটি অনুসরণ করুন।", back: "সাইন ইন-এ ফিরুন" }
};
export default signup;
