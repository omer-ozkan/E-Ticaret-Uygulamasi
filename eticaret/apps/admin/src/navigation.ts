export interface NavigationModel {
  title: string;
  url: string;
  icon: string;
}

export const navigations: NavigationModel[] = [
  {
    title: "Ana sayfa",
    url: "/",
    icon: "home"
  },
   {
    title: "Kategoriler",
    url: "/categories",
    icon: "category"
  },
  {
    title: "Ürünler",
    url: "/products",
    icon: "store"
  },
  {
    title: "Kullanıcılar",
    url: "/users",
    icon: "group"
  }

];