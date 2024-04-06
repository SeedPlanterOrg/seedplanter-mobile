import React, { createContext, useState, useEffect } from 'react';
import {getPlantCatalogPage,
    findPlantById, 
    getGarden,
    addPlant,
    createGarden} from '../utils/http';

export const PlantContext = createContext();

export const PlantProvider = ({ children }) => {
    const [plantsData, setPlantsData] = useState([]);
    const [fullPlantsData, setFullPlantsData] = useState([]);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const plantsArray = await getPlantCatalogPage(1); // fix hardcoded value 
                setPlantsData(plantsArray);
                setFullPlantsData(plantsArray);
            } catch (error) {
                console.error('Error fetching plants:', error);
            }
        };

        fetchPlants();
    }, []);

    return (
        <PlantContext.Provider value={{ plantsData, setPlantsData, fullPlantsData, setFullPlantsData }}>
            {children}
        </PlantContext.Provider>
    );
};