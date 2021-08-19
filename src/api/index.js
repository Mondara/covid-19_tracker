import axios from 'axios';

const url = 'https://disease.sh/v3/covid-19';
const urlDailyData = 'https://disease.sh/v3/covid-19';


export const fetchData = async (country) => {

    try {
        
        const { data: { cases, recovered, deaths, updated } } = await axios
            .get(
                country 
                    ? `${url}/countries/${country}`
                    : `${url}/all`
                );

        return { cases, recovered, deaths, updated };

    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data: { cases, recovered, deaths } } = await axios.get(`${urlDailyData}/historical/all?lastdays=all`);

        const modifiedData = {
            dailyCases: Object.values(cases),
            dailyRecovered: Object.values(recovered),
            dailyDeaths: Object.values(deaths),
            dailyDate: Object.keys(cases),
        }
        return modifiedData;

    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(`${url}/countries`);
        
        return data.map(country => country.country);

    } catch(error) {
        console.log(error);
    }
}