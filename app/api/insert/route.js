// Desc: Inserta datos en la tabla data_users de la base de datos de Supabase
import { supabase } from '../auth/login/route'

export async function insertData(data) {
  console.log('Datos a insertar:', data); // Agrega esta línea
  let { data: result, error } = await supabase
    .from('data_users')
    .insert([data])
  
  if (error) {
    console.error('Error insertando datos:', error)
    return null
  } else {
    console.log('Datos insertados con éxito:', result)
    return result
  }
}
