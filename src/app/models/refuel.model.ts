export interface RefuelModel {
  id?: number;
  date?: string;
  odometer?: number;
  price?: number;
  total?: number;
  fuelAmount?: number;
  isFilling?: boolean;
  vehicleId?: number;
  performance: number;
}
