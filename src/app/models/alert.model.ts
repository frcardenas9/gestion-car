export interface AlertModel {
  id?: number;
  name?: string;
  date?: Date;
  dateFormatted?: string;
  status?: string;
  remainingDays?: number;
  icon?: string;
  borderColor?: string;
  backgroundColor?: string;
  color?: string;
}

export interface AlertsCounter {
  total?: number;
  distant?: number;
  upcoming?: number;
  urgent?: number;
  expired?: number;
}
