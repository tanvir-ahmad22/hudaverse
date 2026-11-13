export const systemStatus = {
  actions: {
    home: "Return to Home",
    explore: "Explore HudaVerse",
    retry: "Try Again",
  },
  notFound: {
    eyebrow: "Page Not Found",
    heading: "Every journey of knowledge has a next step.",
    message: "The page you're looking for isn't available here. It may have moved, or this address may be incorrect. Your journey of learning can continue elsewhere.",
    note: "Knowledge is a journey. Keep exploring.",
  },
  unavailable: {
    eyebrow: "Not Available Yet",
    heading: "This experience is not available yet.",
    message: "The HudaVerse roadmap prioritizes authentic knowledge and learning. For now, explore the parts of the ecosystem that are available.",
    note: "Knowledge is a journey. Keep exploring.",
  },
  applicationError: {
    eyebrow: "A Momentary Interruption",
    heading: "We couldn't open this page.",
    message: "An unexpected problem interrupted this page. Please try again, or continue from another part of HudaVerse.",
    note: "Your place in the wider ecosystem is still here.",
  },
} as const;
