/**
 * Единый источник фактов о садике «Ақ-Кайын».
 *
 * Все сведения взяты с официального сайта https://sites.google.com/view/akkayinsad
 * (страницы «Главная», «Біз туралы / О нас», «Топтар / Группы», «Контакты»).
 * Тексты интерфейса лежат в i18n/kk.ts и i18n/ru.ts, здесь — только данные.
 *
 * Чтобы заменить фото, положите новый файл в public/images с тем же именем
 * или поменяйте путь ниже.
 */

export type Locale = "kk" | "ru";
export type Localized = Record<Locale, string>;

export const kindergarten = {
  sourceUrl: "https://sites.google.com/view/akkayinsad",
  foundedYear: 2017,
  director: "Мадина Калмаханбетовна",

  contacts: {
    phoneDisplay: "+7 708 973 92 39",
    phoneHref: "tel:+77089739239",
    whatsappHref: "https://wa.me/77089739239",
    address: {
      kk: "Алматы қ., Қабылбаева көшесі, 91",
      ru: "г. Алматы, ул. Кабылбаева, 91",
    } satisfies Localized,
    // Ссылка на карточку садика в 2GIS — со страницы «Контакты» исходного сайта.
    twoGisHref: "https://2gis.kz/almaty/geo/70000001028300953/76.812007,43.218829",
    // Координаты метки из карты, встроенной на исходный сайт.
    map: { lat: 43.218605, lng: 76.811891 },
    // Ролик, предоставленный садиком. Ссылка на профиль на исходном сайте не указана.
    instagramReelHref: "https://www.instagram.com/reel/DetvU6UARxv/",
    instagramReelEmbed: "https://www.instagram.com/reel/DetvU6UARxv/embed",
  },

  schedule: {
    open: "08:00",
    close: "18:00",
  },

  // Возрастные группы — со страницы «Топтар / Группы».
  groups: [
    { id: "balapan", name: "Балапан", ages: { from: 2, to: 3 }, icon: "bird" },
    { id: "klubnichka", name: "Клубничка", ages: { from: 3, to: 5 }, icon: "cherry" },
    { id: "romashka", name: "Ромашка", ages: { from: 5, to: 6 }, icon: "flower" },
  ],

  images: {
    logo: { src: "/images/logo.png", width: 512, height: 512 },
    hero: { src: "/images/main-page.jpg", width: 1082, height: 1082 },
    about: { src: "/images/main-page2.jpg", width: 1200, height: 1032 },
    director: { src: "/images/director.jpg", width: 752, height: 900 },
  },

  // position — фокус кадра для превью, чтобы при обрезке не терялись лица.
  gallery: [
    { id: "nauryz", src: "/images/gallery/photo-01.jpg", width: 1200, height: 1200, position: "50% 40%" },
    { id: "lesson", src: "/images/gallery/photo-02.jpg", width: 1246, height: 1200, position: "50% 55%" },
    { id: "costumes", src: "/images/gallery/photo-03.jpg", width: 609, height: 649, position: "50% 45%" },
    { id: "newyear", src: "/images/gallery/photo-04.jpg", width: 960, height: 960, position: "50% 45%" },
    { id: "playroom", src: "/images/gallery/photo-05.jpg", width: 1536, height: 1152, position: "50% 50%" },
    { id: "classroom", src: "/images/gallery/photo-06.jpg", width: 1152, height: 1536, position: "50% 40%" },
    { id: "lockers", src: "/images/gallery/photo-07.jpg", width: 1536, height: 1152, position: "50% 50%" },
    { id: "drawing", src: "/images/gallery/photo-08.jpg", width: 1200, height: 1032, position: "50% 45%" },
    { id: "holiday", src: "/images/gallery/photo-09.jpg", width: 1082, height: 1082, position: "50% 45%" },
    { id: "groupRoom", src: "/images/gallery/image1.jpeg", width: 1179, height: 1549, position: "50% 55%" },
    { id: "roomBeds", src: "/images/gallery/image2.jpeg", width: 1179, height: 1563, position: "50% 50%" },
    { id: "roomAnimals", src: "/images/gallery/image3.jpeg", width: 1179, height: 1586, position: "50% 45%" },
    { id: "roomSpace", src: "/images/gallery/image4.jpeg", width: 1179, height: 1549, position: "50% 50%" },
    { id: "beds", src: "/images/gallery/image5.jpeg", width: 1179, height: 826, position: "50% 50%" },
    { id: "playground", src: "/images/gallery/image6.jpeg", width: 1179, height: 1579, position: "50% 55%" },
    { id: "building", src: "/images/gallery/image7.jpeg", width: 1179, height: 873, position: "50% 45%" },
    { id: "yard", src: "/images/gallery/image8.jpeg", width: 1179, height: 912, position: "50% 50%" },
    { id: "hallway", src: "/images/gallery/image9.jpeg", width: 1179, height: 1573, position: "50% 50%" },
    { id: "hall", src: "/images/gallery/image10.jpeg", width: 1179, height: 1580, position: "50% 40%" },
    { id: "kazakhCorner", src: "/images/gallery/image11.jpeg", width: 1125, height: 1525, position: "50% 45%" },
    { id: "diningRoom", src: "/images/gallery/image12.jpeg", width: 1125, height: 1586, position: "50% 50%" },
    { id: "republicDay", src: "/images/gallery/image13.jpeg", width: 1200, height: 1600, position: "50% 65%" },
  ],

  /**
   * Папка с документами на Google Диске. Пока ссылка пустая, в разделе
   * «Құжаттар / Документы» показывается неактивная кнопка «Жақында қосылады /
   * Скоро подключим». Вставьте ссылку вида
   * "https://drive.google.com/drive/folders/..." — папка должна быть открыта по ссылке.
   */
  documentsFolderHref: "" as string,
} as const;

export type GroupId = (typeof kindergarten.groups)[number]["id"];
export type PhotoId = (typeof kindergarten.gallery)[number]["id"];

export const mapEmbedSrc = `https://maps.google.com/maps?q=${kindergarten.contacts.map.lat},${kindergarten.contacts.map.lng}&z=17&output=embed`;
