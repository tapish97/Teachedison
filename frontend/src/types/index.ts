export interface Resource {
  id: number;
  title: string;
  type: string;
  category: string;
  description: string;   // ✅ add this
  completed: boolean;
}