class PlantOBJ {
    constructor({id, page, binomial_name, 
        name, daily_watering, zone,
        light, care_level, image_urls, 
        description}){
            this.id = id;
            this.page = page;
            this.binomial_name = binomial_name;
            this.name = name;
            this.daily_watering = daily_watering;
            this.zone = zone;
            this.light = light; 
            this.care_level = care_level;
            this.image_urls = image_urls;
            this.description = description;
    }
};

class Zone {
    constructor(hardy, seasons){
        this.hardy = hardy;
        this.seasons = seasons;
    }
};

class Seasons {
    constructor(annual, perennial, bennial) {
        this.annual = annual;
        this.perennial = perennial;
        this.bennial = bennial;
    }
}

module.exports = {
    PlantOBJ,
    Zone,
    Seasons
}