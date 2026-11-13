import type { LoginTranslations } from "../en/login";

const login: LoginTranslations = {
  previewLabel: "GÖRSEL LAB · ARAYÜZ ÖN İZLEMESİ",
  title: "Tekrar hoş geldiniz",
  subtitle: "Bilgi yolculuğunuza devam etmek için giriş yapın.",
  methods: { email: "E-posta", phone: "Telefon", username: "Kullanıcı adı" },
  fields: {
    email: "E-posta adresi",
    phone: "Telefon numarası",
    username: "Kullanıcı adı",
    password: "Şifre",
  },
  placeholders: {
    email: "E-posta adresinizi girin",
    phone: "Telefon numaranızı girin",
    username: "Kullanıcı adınızı girin",
    password: "Şifrenizi girin",
  },
  rememberMe: "Beni hatırla",
  forgotPassword: "Şifrenizi mi unuttunuz?",
  loginButton: "Giriş yap",
  continueWith: "veya şu yöntemle devam et",
  loginWith: "veya şu yöntemle giriş yap",
  social: {
    google: "Google ile devam et",
    apple: "Apple ile devam et",
    phone: "Telefon ile devam et",
  },
  noAccount: "Hesabınız yok mu?",
  createAccount: "Hesap oluştur",
  previewNotice: "Yalnızca arayüz ön izlemesidir. Giriş bağlı değildir ve hiçbir kimlik bilgisi gönderilmez.",
  unavailableNotice: "Bu oturum açma yöntemi henüz kullanılamıyor.",
  forgotNotice: "Bu e-postayla eşleşen bir hesap varsa parola sıfırlama talimatları gönderildi.",
  submitting: "Giriş yapılıyor…",
  genericFailure: "Giriş tamamlanamadı. Lütfen yeniden deneyin.",
  createNotice: "Hesap oluşturma görsel ön izlemede bağlı değil.",
  passwordShow: "Şifreyi göster",
  passwordHide: "Şifreyi gizle",
  biometrics: "Biyometri Kullan",
  encryptionNote: "Verileriniz uçtan uca şifrelemeyle korunur",
  languageSelector: "Dil",
  themeToggle: "Temayı değiştir",
  verse: { arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", translation: "Şüphesiz zorlukla beraber bir kolaylık vardır.", citation: "— Kur'an 94:6" },
  showcase: {
    title: "Eksiksiz İslami Ekosistem",
    principlesTitle: "Bilginin rehberliğinde",
    imageAlt: "Gün batımında bir cami illüstrasyonu",
    features: [
      { title: "Güvenli ve Özel", description: "Verileriniz bizimle güvende. Gizliliğinizi korumak için gelişmiş şifreleme kullanıyoruz." },
      { title: "Güvenilir İçerik", description: "Güvenilir ve sahih kaynaklardan Kur'an, Hadis ve İslami içerikler." },
      { title: "İslami Yapay Zekâ Asistanı", description: "İslam hakkında sorun ve Kur'an ile Hadis kaynaklarına dayalı yanıtlar alın." },
      { title: "Çevrimdışı Kullanım", description: "İçerikleri indirin ve HudaVerse'i internet olmadan kullanın." },
    ],
    principles: [
      { title: "Önce bilgi", description: "İslami bilgiyi teknoloji ve yapay zekânın önünde tutun." },
      { title: "Özgün bilgi", description: "Özgün İslami bilgiyi temel alın." },
      { title: "Sorumlu teknoloji", description: "Teknolojiyi öğrenme ve keşfi desteklemek için kullanın." },
    ],
  },
};

export default login;
