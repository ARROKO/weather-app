export interface WeatherData {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface PopularCity {
  name: string;
  country: string;
  image: string;
}