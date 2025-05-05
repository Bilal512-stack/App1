declare module 'haversine' {
    interface Coordinate {
        latitude: number;
        longitude: number;
    }

    interface Options {
        unit?: 'km' | 'mile' | 'meter' | 'nmi';
        threshold?: number;
    }

    export default function haversine(
        start: Coordinate,
        end: Coordinate,
        options?: Options
    ): number;
}