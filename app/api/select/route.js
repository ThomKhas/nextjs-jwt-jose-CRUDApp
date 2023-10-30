import { supabase } from '../auth/login/route'

export async function select() {
  let { data: result, error } = await supabase
    .from('data_users')
    .select('*')
  
  if (error) {
    console.error('Error obteniendo datos:', error)
    return null
  } else {
    console.log('Datos obtenidos con éxito:', result)
    return result
  }
}