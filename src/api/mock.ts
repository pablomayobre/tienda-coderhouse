import { FullItem } from "./types";

const Items = [
  {
    id: "gameboy-color",
    title: "Game Boy Color",
    description:
      "La Game Boy Color es una consola de videojuegos portatil lanzada en el año 1998, hoy considerada una reliquia",
    categories: ["tecnologia", "video-juegos", "amarillo"],
    price: 10,
    stock: 2,
    display: true,
    pictureURL:
      "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "cupcake",
    title: "Cupcake",
    description: "Un perfecto cupcake color amarillo",
    categories: ["comida", "amarillo"],
    price: 10,
    stock: 18,
    display: true,
    pictureURL:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "zapatillas-vans",
    title: "Zapatillas Vans",
    description:
      "Unas zapatillas marca Vans On the Wall, hechas de tela y gamuza negra.",
    categories: ["ropa", "amarillo"],
    price: 10,
    variants: {
      color: {
        displayName: "Color",
        type: "color",
        default: "white",
        values: {
          black: { displayName: "Negro", color: "#000000" },
          white: { displayName: "Blanco", color: "#ffffff" },
        },
      },
      size: {
        displayName: "Talle",
        type: "dropdown",
        default: "size40",
        values: {
          size38: {displayName: "38"},
          size39: {displayName: "39"},
          size40: {displayName: "40"},
          size42: {displayName: "42"}
        }
      }
    },
    stock: 100,
    display: true,
    pictureURL:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=343&q=80",
  },
  {
    id: "modelo-fiat600",
    title: "Modelo Fiat 600",
    description: "Un modelo a escala de colección de un Fiat 600.",
    categories: ["autos", "amarillo"],
    price: 10,
    stock: 4,
    display: true,
    pictureURL:
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "mando-xboxone",
    title: "Mando de XBox One",
    description: "Un mando de XBox One en su color blanco original.",
    categories: ["tecnologia", "video-juegos", "blanco"],
    price: 10,
    stock: 16,
    display: true,
    pictureURL:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1534&q=80",
  },
  {
    id: "modelo-ferrari",
    title: "Modelo de Ferrari",
    description: "Un modelo a escala de colección de un auto Ferrari.",
    categories: ["autos", "blanco"],
    price: 10,
    stock: 4,
    display: true,
    pictureURL:
      "https://images.unsplash.com/photo-1572635196184-84e35138cf62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "airpods",
    title: "Apple Airpods",
    description: "Los Apple Airpods son auriculares inalambricos.",
    categories: ["tecnologia", "blanco"],
    price: 10,
    stock: 20,
    display: true,
    pictureURL:
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80",
  },
  {
    id: "amazon-echo",
    title: "Amazon Echo",
    description:
      "Amazon Echo acerca a Alexa, tu asistente personal, a donde quiera que la necesites.",
    categories: ["tecnologia", "blanco"],
    price: 10,
    stock: 15,
    display: true,
    pictureURL:
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1567&q=80",
  },
] as FullItem[];

export default Items;
