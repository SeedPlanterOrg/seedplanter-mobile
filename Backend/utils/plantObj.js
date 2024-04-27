// JS class describing a plant object
class PlantOBJ {
    constructor({id, page, binomial_name, 
        name, daily_watering, zone,
        light, care_level, image_urls, 
        description, watering_description, 
        sunlight_description, pruning_description,
        hardiness_url}){
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
            this.watering_description =  watering_description,
            this.sunlight_description = sunlight_description,
            this.pruning_description = pruning_description,
            this.hardiness_url = hardiness_url
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