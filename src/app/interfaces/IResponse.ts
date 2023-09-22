export type IMSResponse<T, PropertyName extends string> = {
  success: boolean;
} & { [P in PropertyName]: T };
