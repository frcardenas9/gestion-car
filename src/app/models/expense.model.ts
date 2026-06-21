export interface ExpenseModel {
  id?: number;
  expenseType?: string;
  description?: string;
  date?: string;
  odometer?: number;
  total?: number;
  vehicleId?: number;
  vehicleName?: string;
  dateFormatted?: string;
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
