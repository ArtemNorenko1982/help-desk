export type TicketFormType = {
  formType: 'create' | 'edit';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
};
