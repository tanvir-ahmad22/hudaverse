import type { ExploreTranslations } from "../en/explore";

export const explore: ExploreTranslations = {
  hero: {
    entranceHeading: "HudaVerse’e Girin",
    entranceDescription: "İslami bilgi, öğrenme ve bağlantılı kaynakları keşfetmek için bir alan.",
    enter: "HudaVerse’e Girin",
    folioAreas: ["Kur’an", "Hadis", "Tefsir", "Fıkıh"],
    pillars: ["Öğrenin", "Anlayın", "Araştırın", "Bağ Kurun"],
    nodes: [
      { label: "Kur’an", description: "Kur’an’ı okuyun, anlayın ve keşfedin." },
      { label: "Hadis", description: "Güvenilir hadisleri ve anlamlarını keşfedin." },
      { label: "Yapay Zekâ Asistanı", description: "Sorular sorun, kaynaklara dayalı yanıtlar alın." },
      { label: "Öğrenme", description: "Yapılandırılmış derslerle bilginizi geliştirin." },
      { label: "Dua", description: "Her an için güvenilir dualar bulun." },
      { label: "Namaz", description: "Namaz vakitlerini ve ibadetlerinizi tek yerde takip edin." },
    ],
    eyebrow: "HudaVerse’ü Keşfedin",
    titleStart: "İhtiyacınız Olan Her Şey",
    titleHighlight: "Öğrenin, Anlayın",
    titleEnd: "ve İslam’ı Keşfedin",
    description: "İlk indirilen ayetteki bir Arapça kelimeyi kökü, anlamı ve ilgili biçimleri üzerinden keşfedin. Güvenilir kaynakların neler gösterdiğini görmek için bir kelimeye dokunun.",
    start: "Keşfetmeye Başlayın",
    ecosystem: "Ekosistemi Görün",
    continuationLabel: "HudaVerse’ü keşfetmeye devam edin",
    continuation: "Keşfetmeye Devam Edin",
    imageAlt: "İslami bilgi alanlarını sunan açıklamalı bir sayfa",
    coreLabel: "İslami Bilgi",
    ecosystemName: "İslami Bilgi Ekosistemi",
    connected: "Burada her şey bağlantılıdır; hiçbir şey tek başına değildir.",
    headingStart: "Tek bir kelimeyle başlayın.",
    headingHighlight: "Ne kadar derine indiğini görün.",
    hint: "Ayetin herhangi bir kelimesine dokunun",
    visualizerLabel: "Arapça Kök Görselleştirmesi",
    noRootLabel: "Kökü yok",
    formsLabel: "Bu kelimeden türeyen kelimeler",
    illustrative: "Örnek önizleme. Kökler ve biçimler yayımlanmadan önce uzman incelemesi gerektirir.",
    citation: "Alak Suresi 96:1",
    rootLabel: "kök",
    pause: "Duraklat",
    play: "Oynat",
    regionLabel: "Ayetten bir kelime seçin",
    selectWordLabel: "Kelime",
    words: [
      { meaning: "Oku / Tilavet et", transliteration: "iqra", caption: "Üç harf, okuma ve tilavetin temel anlamını taşır.", forms: [
        { meaning: "Oku!", transliteration: "iqra'", pattern: "Emir fiil" }, { meaning: "Tilavet", transliteration: "qur'an", pattern: "Mastar" }, { meaning: "Okuma", transliteration: "qira'a", pattern: "Mastar" }, { meaning: "Okuyan", transliteration: "qari'", pattern: "Fail" }, { meaning: "Okunan", transliteration: "maqru'", pattern: "Meçhul" },
      ] },
      { meaning: "Adıyla", transliteration: "bismi", caption: "Adlandırma kökü. İlllet harfi değişebilir veya düşebilir.", forms: [
        { meaning: "İsim", transliteration: "ism", pattern: "İsim" }, { meaning: "Adlandırdı", transliteration: "samma", pattern: "Geçmiş fiil" }, { meaning: "Adlandırılmış", transliteration: "musamman", pattern: "Meçhul" },
      ] },
      { meaning: "Rabbin", transliteration: "rabbika", caption: "Terbiye etme ve gözetme kökü.", forms: [
        { meaning: "Rab, terbiye eden", transliteration: "rabb", pattern: "İsim" }, { meaning: "Yetiştirdi", transliteration: "rabba", pattern: "Geçmiş fiil" }, { meaning: "Terbiye", transliteration: "tarbiya", pattern: "Mastar" },
      ] },
      { meaning: "O kimse ki", transliteration: "alladhi", caption: "Kökü olmayan bir görev sözcüğüdür; biçimi değişir.", forms: [
        { meaning: "O kadın ki", transliteration: "allati", pattern: "Dişil" }, { meaning: "Onlar ki", transliteration: "alladhina", pattern: "Çoğul" },
      ] },
      { meaning: "Yarattı", transliteration: "khalaqa", caption: "Yaratma ve biçim verme kökü.", forms: [
        { meaning: "Yaratma", transliteration: "khalq", pattern: "Mastar" }, { meaning: "Yaratan", transliteration: "khaliq", pattern: "Fail" }, { meaning: "Yaratılmış", transliteration: "makhluq", pattern: "Meçhul" },
      ] },
    ],
  },
  ai: { eyebrow: "HudaVerse nasıl yanıtlar?", title: "Tek soru. Bütünlüklü bir açıklama.", description: "Bir sorunun ilgili İslami kaynaklardan açıkça belirtilen bir açıklamaya uzanan yolunu izleyin.", researching: "İlgili kaynaklar bulunuyor", asking: "Sorunuz", thinking: "Soru inceleniyor", connecting: "Kaynaklar ilişkilendiriliyor", answer: "Örnek açıklama", sources: "Örnek kaynaklar", illustrative: "Bu yalnızca açıklayıcı bir örnektir. Kaynaklar ve yorum yayımdan önce ilmî inceleme gerektirir.", question: "İslam sabır hakkında ne söyler?", assistant: "HudaVerse Asistanı", answerText: "Bu örnek sentez, sabrı zorluk sırasında iman ve ibadette sebat etmek ve Allah'tan yardım dilemek olarak açıklar. Kaynak materyalin bir yanıta nasıl bağlanabileceğini gösterir; doğrulanmış bir dinî hüküm değildir.", sourceItems: [
    { type: "quran", label: "Kur'an", reference: "Al-Baqarah · 2:153", preview: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", meta: "Kur'an metni" },
    { type: "hadith", label: "Hadis", reference: "Sahih Muslim", preview: "Sabır ve zorluk karşısındaki tutum hakkında örnek bir aktarım; rivayet ve kaynak yayımdan önce doğrulanmalıdır.", meta: "Örnek aktarım" },
    { type: "tafsir", label: "Tefsir", reference: "Tafsir Ibn Kathir", preview: "Sebat ve Allah'tan yardım dileme hakkında örnek bir özet; yorum atıf yapılan baskıyla karşılaştırılmalıdır.", meta: "Örnek özet" },
    { type: "scholarly", label: "İlmî bağlam", reference: "General topic summary", preview: "Konunun genel bir özeti; alıntı veya belirli bir âlime ait hüküm değildir. Yayımdan önce doğrulanmış kaynak ekleyin.", meta: "Doğrulanmış kaynak gerekli" },
  ] },
  learning: {
 eyebrow:"Talab al-Ilm", title:"Bir ayet, anlamanın pek çok katmanı.", description:"Kaynakla başlayın; anlam, tefsir, hadis ve fıkıh katmanlarında adım adım derinleşin. HudaVerse her katmandaki yerinizi hatırlar.", sample:"Al-Baqarah 2:286", sourceText:"لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", sourceTranslation:"“Allah does not burden a soul beyond what it can bear.”", completed:"Tamamlandı", inProgress:"Devam ediyor", upcoming:"Kilitli", pathTitle:"Kelime anlamı",
 steps: [
      { title: "Başlangıç", description: "Ayeti ve referansını tanıyın.", duration: "" },
      { title: "Okuma", description: "Ayeti ve çevirisini okuyun.", duration: "" },
      { title: "Kelime anlamı", description: "Her kelimenin taşıdığı anlamı keşfedin.", duration: "" },
      { title: "Kontrol sınavı", description: "Şimdiye kadar anladıklarınızı gözden geçirin.", duration: "" },
      { title: "Tefsir: gücün anlamı", description: "Ayetin güç yetirebilme hakkındaki açıklamasını okuyun.", duration: "" },
      { title: "Hadis ve Fıkıh", description: "İlgili hadis ve fıkıh bağlamıyla devam edin.", duration: "" },
    ],
    layers:{sourceLabel:"Kaynak",wordMeaning:{title:"Kelime anlamı",description:"Her kelimenin taşıdığı anlamı keşfedin."},tafsir:{title:"Tefsir",description:"Güvenilir ilim geleneğine dayanan bir açıklama okuyun."},relatedHadith:{title:"İlgili hadis",description:"Ayetle bağlantılı rivayetleri inceleyin."},fiqhContext:{title:"Fıkıh bağlamı",description:"Fakihlerin ayetin anlamını nasıl ele aldığını görün."}},
 labels:{start:"",lesson:"",currentLesson:"",checkpoint:"",nextMilestone:"",locked:"",score:"",viewDetails:"",learningJourney:"",progress:"",stepsCompleted:"{total} adımdan {completed} tanesi tamamlandı",quizScore:"Test puanı {score}",readingComplete:"Okuma tamamlandı",stepCount:"{total} adımın {n}.si",upNext:"Sıradaki",minutesLeft:"Yaklaşık {minutes} dakika kaldı",continue:"Derse devam et",learningNote:"",illustrative:"Örnek: Bu öğrenme yolu canlı bir kayıt değil, tanıtım amaçlı bir önizlemedir.",layers:"Öğrenme katmanları",closing:"",flow:[]},
 },
  personalSpace: { eyebrow: "Kişisel Alan", titleStart: "Çalışmalarınız,", titleHighlight: "Bir Arada.", description: "Kaydedilen ayetlere, öğrenme etkinliklerine ve önceki sorulara dönmeyi gösteren bir kişisel alan önizlemesi.", yourSpace: "HudaVerse’iniz", savedForYou: "Kaydedilenler", returnTo: "Geri dönmek için.", continueLearning: "Öğrenmeye devam et", previousQuestions: "Önceki sorular", demo: { settings: "Ayarlar", moreOptions: "Diğer seçenekler", tagline: "Bilginiz çevrenizde düzenlenir ve kaydedilir.", savedCount: "{count} kayıt", types: { Ayah: "Ayet", Hadith: "Hadis", Dua: "Dua" }, savedItems: [{ title: "Indeed, with hardship comes ease.", meta: "2 gün önce kaydedildi" }, { title: "Actions are judged by intentions.", meta: "2 gün önce kaydedildi" }, { title: "Hidayet ve sebat için bir dua.", meta: "2 gün önce kaydedildi" }], learningDescription: "Kaldığınız yerden devam edin.", pathLabel: "Öğrenme yolu", pathTitle: "Namazı anlamak", lessonsProgress: "10 dersin 5'i", keepGoing: "Devam edin", learningCenter: "İslami Eğitim Merkezi", lessonsStudied: "Çalışılan dersler", learningTime: "Öğrenme süresi", inProgress: "Devam ediyor", historyDescription: "Önceki sorularınız bir arada.", historyItems: [{ title: "Zorlukta sabır hakkında soru", time: "3 gün önce" }, { title: "Tevekkülün anlamını keşfetme", time: "5 gün önce" }], historyNote: "Kişisel geçmişin nasıl görünebileceğine dair örnek bir önizleme.", tabs: ["Kaydedilenler", "Öğrenme", "Yapay zekâ geçmişi"], mobileTabs: ["Kaydedilenler", "Öğren", "Yapay zekâ", "Ayarlar"] } },
  knowledge: {
    "eyebrow": "İlim talebesinin soruları",
    "title": "Bir ayete anlamını ve nereye yönlendirdiğini sorun.",
    "description": "Bir menüyle değil, bir soruyla başlayın. Her cevap kaynağıyla ve derinleşme yolu ile gelir.",
    "sourceAyah": "Kaynak ayet",
    "sourceReference": "Bakara 2:286",
    "sourceTranslation": "Allah hiçbir kimseyi gücünün yettiğinden fazlasıyla yükümlü kılmaz.",
    "questionsLabel": "Bu ayet hakkında sorular",
    "sourceLabel": "Kaynaklar",
    "questionProgress": "{total} sorudan {current}.",
    "illustrative": "Örnek amaçlıdır. Kaynaklar ve yorum, yayımlanmadan önce ilmî incelemeden geçmelidir.",
    "aiExplanation": "Sade dille hazırlanmış örnek bir açıklama. Fetva değildir; kaynakların ve âlimlerin incelemesi gerekir.",
    "questions": [
      {
        "question": "Yukallifu ne anlama gelir?",
        "answer": "Kelime, birine yük veya sorumluluk vermeyi anlatır. Bu ayette Allah’ın kişinin taşıyamayacağı bir yük yüklemediği bildirilir.",
        "calloutLabel": "Arapça sözlük anlamı",
        "callout": "يُكَلِّفُ: birine yük veya sorumluluk vermek.",
        "chips": [
          "Bakara 2:286",
          "Kaynak belirtildi"
        ],
        "primaryAction": "Kelime incelemesini aç",
        "secondaryAction": "Basitçe açıkla"
      },
      {
        "question": "Âlimler ne söyledi?",
        "answer": "Ayet, Allah’ın kişiye gücünü aşan bir şeyi yüklemediğini ve sorumluluğun kişinin gücüne bağlı olduğunu bildirir.",
        "calloutLabel": "Tefsir İbn Kesîr",
        "callout": "Allah kişiye gücünü aşan bir şeyi yüklemez.",
        "chips": [
          "Bakara 2:286",
          "Kaynak belirtildi"
        ],
        "primaryAction": "Tefsirin tamamını oku",
        "secondaryAction": "Basitçe açıkla"
      },
      {
        "question": "Bununla ilgili bir hadis var mı?",
        "answer": "Peygamber ﷺ amellerin niyetlere göre değerlendirildiğini öğreterek sorumluluğu kişinin niyetine bağladı.",
        "calloutLabel": "Sahih el-Buhari 1",
        "callout": "Ameller niyetlere göredir.",
        "chips": [
          "Sahih el-Buhari 1",
          "Kaynak belirtildi"
        ],
        "primaryAction": "Hadisi oku",
        "secondaryAction": "Basitçe açıkla"
      },
      {
        "question": "Kur’an bunu başka nerede söylüyor?",
        "answer": "İlgili ayetler, Allah’ın insanlar için kolaylık istediği ve zorluk istemediği ilkesini pekiştirir.",
        "calloutLabel": "Kur’an, Bakara 2:185",
        "callout": "Allah sizin için kolaylık ister, zorluk istemez.",
        "chips": [
          "Bakara 2:185",
          "Kaynak belirtildi"
        ],
        "primaryAction": "İlgili ayeti aç",
        "secondaryAction": "Basitçe açıkla"
      },
      {
        "question": "Fıkıh bu konuda ne söyler?",
        "answer": "Güç yetirebilme ilkesi İslami hükümlerde yer alır; kişinin bir yükümlülüğü normal biçimde yerine getiremediği gerçek durumlar için kolaylıklar da buna dahildir.",
        "calloutLabel": "Fıkıh ilkesi",
        "callout": "Güç yetirebilme ve zorluk.",
        "chips": [
          "Fıkıh ilkesi",
          "Kaynak belirtildi"
        ],
        "primaryAction": "Fıkıh bağlamını oku",
        "secondaryAction": "Basitçe açıkla"
      },
      {
        "question": "Hangi konularla bağlantılı?",
        "answer": "Bu ayet sorumluluk, zorluk, bağışlanma, niyet ve kişisel hesap verebilirlikle doğal biçimde bağlantılıdır.",
        "calloutLabel": "Bilgi konusu",
        "callout": "Sorumluluk.",
        "chips": [
          "Sorumluluk",
          "Zorluk",
          "Bağışlanma",
          "Niyet",
          "Kişisel hesap verebilirlik"
        ],
        "primaryAction": "Bu konuyu keşfet",
        "secondaryAction": "Basitçe açıkla"
      }
    ]
  },
  trust: {
    eyebrow: "Kendiniz doğrulayın",
    title: "Güvenin, ama kontrol edin: her kaynak elinizin altında olmalı.",
    description: "İslami bilginin ardındaki kaynakları keşfedin. Özgün metinleri kontrol edin, atıfları izleyin ve açıklamaların nereden geldiğini anlayın.",
    steps: [
      { title: "Kaynak atfını açın", description: "Bir kaynak atfı varsa içeriğin dayandığı kaynağı görmek için açın." },
      { title: "Özgün metni kontrol edin", description: "Atıf yapılan Arapça metni ve referansını özgün kaynakla karşılaştırın." },
      { title: "Atfı anlayın", description: "Mevcut olduğunda adı belirtilen âlimi, kitabı veya kaynağı görün." },
      { title: "Uzman rehberliği alın", description: "HudaVerse'ü öğrenme kaynağı olarak kullanın. Kişisel dinî hükümler veya karmaşık sorular için yetkin bir âlime danışın." },
    ],
    cardTitle: "Kaynak atfı",
    referenceTitle: "Bakara 2:286",
    contentType: "Kur'an referansı",
    referenceLabel: "Referans",
    referenceValue: "Bakara Suresi · Ayet 286",
    originalTextLabel: "Özgün metin",
    translationLabel: "Çeviri",
    translationUnavailable: "Bu örnekte çevirmen bilgisi verilmemiştir.",
    explanationLabel: "Açıklama kaynağı",
    attributionUnavailable: "Kaynak atfı verilmemiştir",
    contentTypeLabel: "İçerik türü",
    openSource: "Atıf yapılan kaynağı aç",
    copyReference: "Referansı kopyala",
    copied: "Kopyalandı",
    sourceNote: "Örnek gösterim. Kaynak ve atıf bulunabilirliği içeriğe bağlıdır.",
    stripTitle: "Kaynağı bilin. Bağlamı anlayın. Referansı doğrulayın.",
    stripDescription: "Kaynak referansları bilgiyi kaynağına kadar izlemenize yardımcı olur.",
    disclaimer: "Örnek gösterim. Kaynak ve atıf bulunabilirliği içeriğe bağlıdır. Çeviriler ve ilmî açıklamalar atıf yapılan kaynaklarla karşılaştırılmalıdır.",
  },
  day: {
    moments: [
      { time: "Sabah namazı", title: "Sakin bir başlangıç", description: "Namaz vakti hatırlatıcısı sizi nazikçe uyandırır." },
      { time: "Sabah", title: "Gün başlamadan önce", description: "Güne başlamadan önce Kur’an’la birkaç dakika." },
      { time: "Öğle", title: "İhtiyaç duyduğunuzda açıklık", description: "İş yerinde bir soru aklınıza gelir; hadis ve yapay zekâ dakikalar içinde açıklık sunar." },
      { time: "İkindi", title: "Öğrenmek için biraz zaman", description: "Boş zaman bir derse, öğrenme yolunuzda yeni bir adıma dönüşür." },
      { time: "Akşam namazı", title: "Tanıdık bir dua", description: "Geçen hafta kaydettiğiniz akşam duası, tam ihtiyaç duyduğunuz anda yanınızda." },
      { time: "Yatsı", title: "Sessiz bir tefekkür", description: "Günün yer imleri ve notları tek bir yerde." },
    ],
    badge: "HudaVerse’te Bir Gün",
    titleStart: "Sabah namazından yatsıya,",
    titleHighlight: "Bilgi Size Eşlik Eder.",
    description: "HudaVerse günde bir kez açıp kapatacağınız bir şey değil; gününüzün akışının bir parçası.",
    closing: "Bir gün · Pek çok an · Bağlantılı tek bir alan",
    disclaimer: "Bu örnek bir senaryodur; gösterilen her iş akışı şu anda kullanılamayabilir.",
  },

  ecosystem: {
  eyebrow: "HudaVerse'ü keşfedin", title: "HudaVerse'ün size neler sunabileceğini keşfedin.",
  description: "HudaVerse bölümlerini, sunduklarını ve modüllerin nasıl bağlantı kurduğunu inceleyin.",
  constellationLabel: "HudaVerse modül ağı",
  centralLabel: "Birbiriyle bağlantılı bir bilgi ekosistemi",
  moduleIndex: "Modülleri keşfedin",
  search: "Modüllerde ara", searchPlaceholder: "Kur'an, Hadis, Yapay Zekâ, Öğrenme, Profil...",
  searchLabel: "HudaVerse modüllerinde ara", searchResults: "Arama sonuçları:", clear: "Temizle", all: "Tümü", moduleCount: "modülü keşfedin",
  emptyTitle: "Modül bulunamadı", emptyDescription: "Başka bir ifade deneyin veya tüm modülleri görmek için filtreleri temizleyin.",
  showAll: "Tüm modülleri göster", closeDetails: "Modül ayrıntılarını kapat", role: "HudaVerse'deki rolü",
  keyCapabilities: "Temel özellikler", moreCapabilities: "Diğer özellikler", benefits: "Kullanıcıya faydaları",
  journey: "Örnek kullanıcı yolculuğu", connected: "Bağlantılı modüller", exploreModule: "Modülü keşfet",
  noMatch: "Eşleşen modül yok", moduleLabel: "Modül", closeSearch: "Aramayı kapat", searchFooter: "HudaVerse modüllerinde ara", escape: "Kapatmak için ESC",
  supportCards: ["Özgürce keşfedin", "Bağlantıları keşfedin", "Başlamadan önce öğrenin"],
  supportDescriptions: ["Ürüne geçmeden önce modülün ne sunmak üzere tasarlandığını öğrenin.", "Bilgi, öğrenme, yapay zekâ ve araçların HudaVerse'de nasıl bağlandığını görün.", "Her bölümün özelliklerini, faydalarını ve örnek kullanımını inceleyin."],
  categories: { "Core Knowledge": "Temel Bilgi", "Daily Worship": "Günlük İbadet", "Intelligent Assistance": "Akıllı Yardım", Education: "Eğitim", "Social Learning": "Sosyal Öğrenme", Utilities: "Araçlar", "Personal Experience": "Kişisel Deneyim", "Personal Knowledge": "Kişisel Bilgi" },
  modules: { quran: "Kur'an", hadith: "Hadis", prayer: "Namaz", dua: "Dua", ai: "Yapay Zekâ Asistanı", learning: "Öğrenme Merkezi", community: "Topluluk", tools: "İslami Araçlar", profile: "Profil", bookmarks: "Yer İşaretleri ve Notlar", settings: "Ayarlar ve Kişiselleştirme" },
  moduleSummaries: {
    quran: "Kur’an’ı bağlantılı anlamlar ve bağlamla okuyup keşfedin.",
    hadith: "Hadisleri kaynak bağlamı ve ilişkili bilgilerle inceleyin.",
    prayer: "Namaz vakitleri ve ibadet rehberi bir arada.",
    dua: "Anlamı, bağlamı ve kaynak bilgileriyle duaları bulun.",
    ai: "Bir soru sorun, ilgili kaynakları inceleyin ve asıl materyale geçin.",
    learning: "Konuları dersler, alıştırmalar ve ilerleme göstergeleriyle takip edin.",
    community: "Yol haritasının 6. aşamasında yer alan bir genişleme; kullanıcı kapsamı henüz tanımlanmadı.",
    tools: "Blueprint’te belirtilen Namaz ve Zekât alanlarını bir arada gösteren özet.",
    profile: "Bu yetenekler kullanıma sunuldukça hesap bilgileri ve tercihler için kişisel alan.",
    bookmarks: "Desteklendiği yerlerde notlarla birlikte, modüller arası kayıtlı çalışma materyalleri için planlanan alan.",
    settings: "Her modülün desteklediği dil, okuma ve gizlilik tercihlerini yönetin.",
  },
},
};
