import { supabase } from '../auth/login/route'

export async function updateData(id, data) {
  let { error } = await supabase
    .from('data_users')
    .update(data)
    .eq('id', id)
  
  if (error) {
    console.error('Error actualizando datos:', error)
    return null
  } else {
    console.log('Datos actualizados con éxito')
    return true
  }
}