import { FullItem } from "./types";

import GameBoyColorImage from "../assets/gameboy-color.webp";
import CupcakeImage from "../assets/cupcake.webp";
import ZapatillasVansImage from "../assets/zapatillas-vans.webp";
import ModeloFiat600Image from "../assets/modelo-fiat600.webp";
import MandoXboxOneImage from "../assets/mando-xboxone.webp";
import ModeloFerrariImage from "../assets/modelo-ferrari.webp";
import AppleAirpodsImage from "../assets/apple-airpods.webp";
import AmazonEchoImage from "../assets/amazon-echo.webp";

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
    pictureURL: GameBoyColorImage,
  },
  {
    id: "cupcake",
    title: "Cupcake",
    description: "Un perfecto cupcake color amarillo",
    categories: ["comida", "amarillo"],
    price: 10,
    stock: 18,
    display: true,
    pictureURL: CupcakeImage,
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
          size38: { displayName: "38" },
          size39: { displayName: "39" },
          size40: { displayName: "40" },
          size42: { displayName: "42" },
        },
      },
    },
    stock: 100,
    display: true,
    pictureURL: ZapatillasVansImage,
  },
  {
    id: "modelo-fiat600",
    title: "Modelo Fiat 600",
    description: "Un modelo a escala de colección de un Fiat 600.",
    categories: ["autos", "amarillo"],
    price: 10,
    stock: 4,
    display: true,
    pictureURL: ModeloFiat600Image,
  },
  {
    id: "mando-xboxone",
    title: "Mando de XBox One",
    description: "Un mando de XBox One en su color blanco original.",
    categories: ["tecnologia", "video-juegos", "blanco"],
    price: 10,
    stock: 16,
    display: true,
    pictureURL: MandoXboxOneImage,
  },
  {
    id: "modelo-ferrari",
    title: "Modelo de Ferrari",
    description: "Un modelo a escala de colección de un auto Ferrari.",
    categories: ["autos", "blanco"],
    price: 10,
    stock: 4,
    display: true,
    pictureURL: ModeloFerrariImage,
  },
  {
    id: "apple-airpods",
    title: "Apple Airpods",
    description: "Los Apple Airpods son auriculares inalambricos.",
    categories: ["tecnologia", "blanco"],
    price: 10,
    stock: 20,
    display: true,
    pictureURL: AppleAirpodsImage,
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
    pictureURL: AmazonEchoImage,
  },
] as FullItem[];

export default Items;
