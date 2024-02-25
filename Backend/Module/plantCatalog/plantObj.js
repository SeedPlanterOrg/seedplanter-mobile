class PlantOBJ {
    constructor({id, binomial_name, 
        name, daily_watering, zone, 
        average_height, spacing, fertilize,
        light, features, carelevel, image_urls, 
        description}){
            this.id = id;
            this.binomial_name = binomial_name;
            this.name = name;
            this.daily_watering = daily_watering;
            this.zone = zone;
            this.average_height = average_height;
            this.spacing = spacing;
            this.fertilize = fertilize;
            this.light = light; 
            this.features = features;
            this.carelevel = carelevel;
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