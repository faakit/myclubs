export type IClient = {
  id?: number;
  cpf?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password_hash?: string;
  updated_at?: Date | string;
  created_at?: Date | string;
};
