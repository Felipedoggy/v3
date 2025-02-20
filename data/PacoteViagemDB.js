import conectar from "../config/db";
import PacoteViagem from "../models/PacoteViagem";

export default class PacoteViagemDB {

    constructor() {
        this.init();
    }

    async init() {
        const conexao = await conectar();
        await conexao.execute(`CREATE TABLE IF NOT EXISTS pacotes_viagem (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            departure DATE NOT NULL,
            destination VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            description TEXT NOT NULL,
            duration VARCHAR(255) NOT NULL,
            departureLocation VARCHAR(255) NOT NULL,
            availableSpots INT NOT NULL,
            image VARCHAR(255) NOT NULL
        )`);
        conexao.end();
    }

    // Gravar (Criar) um pacote
    async criarPacote(pacote) {
        const conexao = await conectar();
        const sql = `INSERT INTO pacotes_viagem (name, departure, destination, price, description, duration, departureLocation, availableSpots, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const parametros = [pacote.name, pacote.departure, pacote.destination, pacote.price, pacote.description, pacote.duration, pacote.departureLocation, pacote.availableSpots, pacote.image];
        await conexao.execute(sql, parametros);
        conexao.end();
    }

    // Atualizar um pacote
    async atualizarPacote(pacote) {
        const conexao = await conectar();
        const sql = `UPDATE pacotes_viagem SET name = ?, departure = ?, destination = ?, price = ?, description = ?, duration = ?, departureLocation = ?, availableSpots = ?, image = ? WHERE id = ?`;
        const parametros = [pacote.name, pacote.departure, pacote.destination, pacote.price, pacote.description, pacote.duration, pacote.departureLocation, pacote.availableSpots, pacote.image, pacote.id];
        await conexao.execute(sql, parametros);
        conexao.end();
    }

    // Excluir um pacote
    async excluirPacote(id) {
        const conexao = await conectar();
        const sql = `DELETE FROM pacotes_viagem WHERE id = ?`;
        await conexao.execute(sql, [id]);
        conexao.end();
    }

    // Consultar todos os pacotes
    async consultarTodosPacotes() {
        const conexao = await conectar();
        const sql = `SELECT * FROM pacotes_viagem`;
        const [rows] = await conexao.query(sql);
        conexao.end();
        return rows.map(row => new PacoteViagem(row.id, row.name, row.departure, row.destination, row.price, row.description, row.duration, row.departureLocation, row.availableSpots, row.image));
    }

    // Consultar um pacote específico
    async consultarPacote(id) {
        const conexao = await conectar();
        const sql = `SELECT * FROM pacotes_viagem WHERE id = ?`;
        const [rows] = await conexao.query(sql, [id]);
        conexao.end();
        return rows.map(row => new PacoteViagem(row.id, row.name, row.departure, row.destination, row.price, row.description, row.duration, row.departureLocation, row.availableSpots, row.image));
    }
}