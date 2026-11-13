import type { LoginTranslations } from "../en/login";

const login: LoginTranslations = {
  previewLabel: "ভিজ্যুয়াল ল্যাব · ইন্টারফেস প্রিভিউ",
  title: "আবার স্বাগতম",
  subtitle: "জ্ঞান অন্বেষণের যাত্রা চালিয়ে যেতে সাইন ইন করুন।",
  methods: { email: "ইমেইল", phone: "ফোন", username: "ব্যবহারকারীর নাম" },
  fields: {
    email: "ইমেইল ঠিকানা",
    phone: "ফোন নম্বর",
    username: "ব্যবহারকারীর নাম",
    password: "পাসওয়ার্ড",
  },
  placeholders: {
    email: "আপনার ইমেইল ঠিকানা লিখুন",
    phone: "আপনার ফোন নম্বর লিখুন",
    username: "আপনার ব্যবহারকারীর নাম লিখুন",
    password: "আপনার পাসওয়ার্ড লিখুন",
  },
  rememberMe: "আমাকে মনে রাখুন",
  forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
  loginButton: "সাইন ইন",
  continueWith: "অথবা এভাবে চালিয়ে যান",
  social: {
    google: "Google দিয়ে চালিয়ে যান",
    apple: "Apple দিয়ে চালিয়ে যান",
    phone: "ফোন দিয়ে চালিয়ে যান",
  },
  noAccount: "আপনার কি অ্যাকাউন্ট নেই?",
  createAccount: "অ্যাকাউন্ট তৈরি করুন",
  previewNotice:
    "শুধু ইন্টারফেস প্রিভিউ। সাইন-ইন সংযুক্ত নয় এবং কোনো পরিচয়পত্র পাঠানো হয় না।",
  unavailableNotice: "এই বিকল্পটি ভিজ্যুয়াল প্রিভিউতে সংযুক্ত নয়।",
  forgotNotice: "ভিজ্যুয়াল প্রিভিউতে পাসওয়ার্ড পুনরুদ্ধার সংযুক্ত নয়।",
  createNotice: "ভিজ্যুয়াল প্রিভিউতে অ্যাকাউন্ট তৈরি সংযুক্ত নয়।",
  passwordShow: "পাসওয়ার্ড দেখান",
  passwordHide: "পাসওয়ার্ড লুকান",
  showcase: {
    title: "সম্পূর্ণ ইসলামি ইকোসিস্টেম",
    principlesTitle: "জ্ঞানের আলোকে পরিচালিত",
    imageAlt: "সূর্যাস্তের সময় একটি মসজিদের চিত্র",
    principles: [
      { title: "জ্ঞান প্রথমে", description: "প্রযুক্তি ও এআই-এর আগে ইসলামি জ্ঞানকে স্থান দিন।" },
      { title: "বিশুদ্ধ জ্ঞান", description: "বিশুদ্ধ ইসলামি জ্ঞানকে ভিত্তি হিসেবে রাখুন।" },
      { title: "দায়িত্বশীল প্রযুক্তি", description: "প্রযুক্তি যেন শিক্ষা ও জ্ঞান অন্বেষণে সহায়তা করে।" },
    ],
  },
};

export default login;
