import PacoteViagem from "../models/PacoteViagem.js";

var pacotes = new PacoteViagem(1, "Pacote 1", "2023-07-01", "Rio de Janeiro", 100, "Descrição do pacote 1", 5, "Cidade A", 10, "image1.jpg");

console.log(pacotes.departureLocation);