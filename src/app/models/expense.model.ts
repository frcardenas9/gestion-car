export interface ExpenseModel {
  id?: number;
  expenseType?: string;
  date?: string;
  odometer?: number;
  total?: number;
  vehicleId?: number;
}

export interface ExpensesSummary {
  month?: {
    fuel?: number;
    maintenance?: number;
    insurance?: number;
    others?: number;
    total?: number;
  };
  allTime?: {
    fuel?: number;
    maintenance?: number;
    insurance?: number;
    others?: number;
    total?: number;
  };
}
