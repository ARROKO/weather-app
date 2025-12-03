export interface ForecastData {
    list: ForecastItem[];
    city: {
        name: string;
        country: string;
        sunrise: number;
        sunset: number;
    };
}

export interface ForecastItem {
    dt: number;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
        pressure: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
    pop: number; // Probability of precipitation
    dt_txt: string;
}

export interface AirQualityData {
    list: {
        main: {
            aqi: number; // 1-5 (1=Good, 5=Very Poor)
        };
        components: {
            co: number;
            no2: number;
            o3: number;
            pm2_5: number;
            pm10: number;
        };
    }[];
}

export interface DailyForecast {
    date: Date;
    temp_min: number;
    temp_max: number;
    icon: string;
    description: string;
    pop: number;
}
