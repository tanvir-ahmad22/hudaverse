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
  continueWith: "veya şununla devam edin",
  social: {
    google: "Google ile devam et",
    apple: "Apple ile devam et",
    phone: "Telefon ile devam et",
  },
  noAccount: "Hesabınız yok mu?",
  createAccount: "Hesap oluştur",
  previewNotice: "Yalnızca arayüz ön izlemesidir. Giriş bağlı değildir ve hiçbir kimlik bilgisi gönderilmez.",
  unavailableNotice: "Bu seçenek görsel ön izlemede bağlı değil.",
  forgotNotice: "Şifre kurtarma görsel ön izlemede bağlı değil.",
  createNotice: "Hesap oluşturma görsel ön izlemede bağlı değil.",
  passwordShow: "Şifreyi göster",
  passwordHide: "Şifreyi gizle",
  showcase: {
    title: "Eksiksiz İslami Ekosistem",
    principlesTitle: "Bilginin rehberliğinde",
    imageAlt: "Gün batımında bir cami illüstrasyonu",
    principles: [
      { title: "Önce bilgi", description: "İslami bilgiyi teknoloji ve yapay zekânın önünde tutun." },
      { title: "Özgün bilgi", description: "Özgün İslami bilgiyi temel alın." },
      { title: "Sorumlu teknoloji", description: "Teknolojiyi öğrenme ve keşfi desteklemek için kullanın." },
    ],
  },
};

export default login;
