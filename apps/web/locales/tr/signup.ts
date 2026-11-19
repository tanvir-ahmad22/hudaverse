import type { SignupTranslations } from "../en/signup";

const signup: SignupTranslations = {
  brandTagline: "Bilgi · Rehberlik · Huzur", language: "Dil", alreadyAccount: "Zaten hesabınız var mı?", signIn: "Giriş Yap",
  hero: { join: "HudaVerse'e", brand: "katılın", subtitle: "Yolculuğunuza başlayın", with: "", knowledge: "İlahi Bilgiyle", paragraph: "Kur'an'a, Hadis'e, İslami bilgiye ve güçlü öğrenme araçlarına tek bir yerden erişin.", features: [{ title: "Kur'an ve Hadis", description: "Okuyun, öğrenin ve düşünün" }, { title: "İslami Öğrenme", description: "Bilginizi derinleştirin" }, { title: "Yapay Zekâ Asistanı", description: "Güvenilir rehberlik alın" }, { title: "Küresel Topluluk", description: "Bağ kurun ve birlikte gelişin" }], quote: "Bilgi arayın; çünkü o hiç sönmeyen bir ışıktır.", quoteBy: "— HudaVerse", languages: "Dil" },
  card: { title: "Hesap Oluştur", subtitle: "HudaVerse ekosistemindeki yolculuğunuza başlayın" },
  fields: { fullName: "Ad Soyad *", fullNamePlaceholder: "Adınızı ve soyadınızı girin", email: "E-posta Adresi *", emailPlaceholder: "you@example.com", password: "Parola *", passwordPlaceholder: "Güçlü bir parola oluşturun", confirm: "Parolayı Onayla *", confirmPlaceholder: "Parolanızı yeniden girin", dob: "Doğum Tarihi (İsteğe Bağlı)", dobPlaceholder: "Doğum tarihinizi seçin", country: "Ülke / Bölge", countryPlaceholder: "Ülkenizi seçin", countrySearch: "Ülkelerde ara", countryEmpty: "Ülke bulunamadı", interests: "İlgi Alanlarınızı Seçin (İsteğe Bağlı)", interestsPlaceholder: "Bir veya daha fazla ilgi alanı seçin", showPassword: "Parolayı göster", hidePassword: "Parolayı gizle" },
  interests: { quran: "Kur'an", hadith: "Hadis", fiqh: "Fıkıh", tafsir: "Tefsir", islamicHistory: "İslam Tarihi", others: "Diğer" },
  strength: { label: "Parola gücü", weak: "Zayıf", fair: "Orta", strong: "Güçlü" },
  terms: { before: "Şunları kabul ediyorum:", and: "ve", service: "Hizmet Koşulları", privacy: "Gizlilik Politikası", required: "Devam etmek için Hizmet Koşulları'nı ve Gizlilik Politikası'nı kabul edin." },
  submit: "Hesap Oluştur", submitting: "Hesabınız oluşturuluyor…", continueWith: "veya şununla devam edin", social: { google: "Google ile devam et", microsoft: "Microsoft ile devam et", facebook: "Facebook ile devam et" }, securityNote: "Bilgileriniz HudaVerse ile güvende ve korunur.",
  errors: { required: "Gerekli alanları doldurup tekrar deneyin.", mismatch: "Parolalar eşleşmiyor.", weak: "En az 10 karakterli, yaygın olmayan bir parola seçin.", rateLimit: "Çok fazla deneme yapıldı. Yeniden denemeden önce bekleyin.", unavailable: "Bu kayıt yöntemi henüz kullanılamıyor.", general: "Hesabınız oluşturulamadı. Lütfen tekrar deneyin.", email: "Geçerli bir e-posta adresi girin." },
  success: { title: "E-postanızı kontrol edin", body: "Bu adres için hesap oluşturulabiliyorsa gelen kutunuza doğrulama yönergeleri gönderilir. Hesap oluşturmayı tamamlamak için bağlantıyı izleyin.", back: "Girişe dön" }
};
export default signup;
