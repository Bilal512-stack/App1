import { Order } from "@/types/Order";
import haversine from "haversine";

// Mock implementation of getCoordinates function
// Replace this with the actual implementation or import it from the correct module
export const getCoordinates = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  // Example: Replace with actual geocoding logic
  return address ? { lat: 0, lng: 0 } : null;
};

export interface DistanceInfo {
    sender?: { lat: number; lng: number } | null;
    recipient?: { lat: number; lng: number } | null;
    distance?: number | null;
  }
  
  export const calculateDistances = async (orders: Order[]): Promise<Record<string, DistanceInfo>> => {
    const distances: Record<string, DistanceInfo> = {};
    const addressPromises = orders.flatMap(order => [
      getCoordinates(order.senderAddress),
      getCoordinates(order.recipientAddress),
    ]);
  
    const coordinates = await Promise.all(addressPromises);
  
    coordinates.forEach((coords, index) => {
      if (coords) {
        const orderIndex = Math.floor(index / 2);
        const isSender = index % 2 === 0;
  
        if (!distances[orders[orderIndex].id]) {
          distances[orders[orderIndex].id] = {};
        }
  
        if (isSender) {
          distances[orders[orderIndex].id].sender = coords;
        } else {
          distances[orders[orderIndex].id].recipient = coords;
        }
      }
    });
  
    Object.keys(distances).forEach(orderId => {
      const { sender, recipient } = distances[orderId];
      if (sender && recipient) {
        distances[orderId].distance = haversine(
          { latitude: sender.lat, longitude: sender.lng },
          { latitude: recipient.lat, longitude: recipient.lng },
          { unit: 'km' }
        );
      }
    });
  
    return distances;
  };