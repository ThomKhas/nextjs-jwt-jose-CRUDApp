import { supabase } from '../auth/login/route'

export async function deleteData(id) {
  let { error } = await supabase
    .from('data_users')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error eliminando datos:', error)
    return null
  } else {
    console.log('Datos eliminados con éxito')
    return true
  }
}