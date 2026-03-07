export const TICKET_PRIORITIES = [
  { value: 'low', label: 'Low priority' },
  { value: 'medium', label: 'Medium priority' },
  { value: 'high', label: 'High priority' },
  { value: 'critical', label: 'Critical priority' },
] as const;

export const FORM_TYPES = ['create', 'edit'] as const;

export const TICKET_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
] as const;

export type TicketPriorityType = (typeof TICKET_PRIORITIES)[number]['value'];
export type TicketFormType = (typeof FORM_TYPES)[number];
export type TicketStatusType = (typeof TICKET_STATUSES)[number]['value'];

export interface TicketForm {
  formType: TicketFormType;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  details: string;
  priority: TicketPriorityType;
  status?: TicketStatusType;
  createdAt?: Date;
  startedAt?: Date;
  resolvedAt?: Date;
  comments?: string[];
}
