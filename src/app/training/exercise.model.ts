export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  /* To make an optional property in an interface we use the ?: symbol, as shown below.
   */
  date?: Date;
  /* To accept multiple values of a property we separate the accepted values using the | symbol, as shown below.
   */
  state ?: 'completed' | 'cancelled' | null;
}
