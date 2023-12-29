import { Airplane } from "./airplane"

export interface Airline {
    id?: number
    name?: string
    headquarters?: string
    airplanes?: Airplane[]    
  }