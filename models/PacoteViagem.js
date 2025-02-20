import PacoteViagemDB from '../data/PacoteViagemDB.js';


export default class PacoteViagem {
    #id;
    #name
    #departure
    #destination
    #price
    #description
    #duration
    #departureLocation
    #availableSpots
    #image 

    constructor(id, name, departure, destination, price, description, duration, departureLocation, availableSpots, image) {
        this.#id = id;
        this.#name = name;
        this.#departure = departure;
        this.#destination = destination;
        this.#price = price;
        this.#description = description;
        this.#duration = duration;
        this.#departureLocation = departureLocation;
        this.#availableSpots = availableSpots;
        this.#image = image;
    }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            departure: this.#departure,
            destination: this.#destination,
            price: this.#price,
            description: this.#description,
            duration: this.#duration,
            departureLocation: this.#departureLocation,
            availableSpots: this.#availableSpots,
            image: this.#image
        }
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get departure() {
        return this.#departure;
    }

    get destination() {
        return this.#destination;
    }

    get price() {
        return this.#price;
    }

    get description() {
        return this.#description;
    }

    get duration() {
        return this.#duration;
    }    

    get departureLocation() {
        return this.#departureLocation;
    }

    get availableSpots() {
        return this.#availableSpots;
    }

    get image() {
        return this.#image;
    }
    set id(id) {
        this.#id = id;
    } 
    set name(name) {
        this.#name = name;
    }
    set departure(departure) {
        this.#departure = departure;
    }
    set destination(destination) {
        this.#destination = destination;
    }
    set price(price) {
        this.#price = price;
    }
    set description(description) {
        this.#description = description;
    }    
    set duration(duration) {
        this.#duration = duration;
    }
    set departureLocation(departureLocation) {
        this.#departureLocation = departureLocation;
    }
    set availableSpots(availableSpots) {
        this.#availableSpots = availableSpots;
    }
    set image(image) {
        this.#image = image;
    }
    async criarPacote() {
        const pacoteDB = new PacoteViagemDB();
        return await pacoteDB.criarPacote(this);
    }
    async buscarTodos() {
        const pacoteDB = new PacoteViagemDB();
        return await pacoteDB.buscarTodos();
    }
    async buscarPorId(id) {
        const pacoteDB = new PacoteViagemDB();
        return await pacoteDB.buscarPorId(id);
    }
    async atualizarPacote(id) {
        const pacoteDB = new PacoteViagemDB();
        return await pacoteDB.atualizarPacote(id, this);
    }
    async excluirPacote(id) {
        const pacoteDB = new PacoteViagemDB();
        return await pacoteDB.deletarPacote(id);
    }
}
