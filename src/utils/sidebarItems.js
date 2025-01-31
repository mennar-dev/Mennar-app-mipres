import { TbMedicineSyrup, TbFileInvoice, TbHome, TbNews  } from "react-icons/tb"; // entrega


export const sidebarItems = [
    { icon: TbHome, text: "Inicio", path: "/inicio", matchPath: /^\/inicio/ },
    { icon: TbFileInvoice, text: "Direccionamientos", path: "/direccionamientos", matchPath: /^\/direccionamientos/ },
    { icon: TbMedicineSyrup, text: "Entrega", path: "/entrega", matchPath: /^\/entrega/ },
    { icon: TbNews, text: "Novedades", path: "/novedades", matchPath: /^\/novedades/ },
]