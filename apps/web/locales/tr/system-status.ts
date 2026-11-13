export const systemStatus = {
  actions: {
    home: "Ana Sayfaya Dön",
    explore: "HudaVerse'ü Keşfet",
    retry: "Tekrar Dene",
  },
  notFound: {
    eyebrow: "Sayfa Bulunamadı",
    heading: "Her bilgi yolculuğunun bir sonraki adımı vardır.",
    message: "Aradığınız sayfa burada mevcut değil. Taşınmış veya bu adres yanlış olabilir. Öğrenme yolculuğunuza başka bir yerde devam edebilirsiniz.",
    note: "Bilgi bir yolculuktur. Keşfetmeye devam edin.",
  },
  unavailable: {
    eyebrow: "Henüz Mevcut Değil",
    heading: "Bu deneyim henüz mevcut değil.",
    message: "HudaVerse yol haritası, sahih bilgiye ve öğrenmeye öncelik verir. Şimdilik ekosistemin mevcut bölümlerini keşfedebilirsiniz.",
    note: "Bilgi bir yolculuktur. Keşfetmeye devam edin.",
  },
  applicationError: {
    eyebrow: "Kısa Süreli Bir Kesinti",
    heading: "Bu sayfayı açamadık.",
    message: "Beklenmeyen bir sorun bu sayfanın açılmasını engelledi. Lütfen tekrar deneyin veya HudaVerse'ün başka bir bölümüne geçin.",
    note: "Ekosistemdeki yolculuğunuz burada devam edebilir.",
  },
} as const;
