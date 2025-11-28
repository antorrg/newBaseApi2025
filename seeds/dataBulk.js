const dataBulk = async (table, tableName, info) => {
  try {
    // Verificar si ya hay datos en la base de datos, si no, entonces los incorpora
    const existingdatas = await table.findAll()
    if (existingdatas.length === 0) {
      // Hacer una lectura de la data.json para llenar la tabla
      await table.bulkCreate(info)
      console.log(`"${tableName}" table filled successfully`)
    } else {
      console.log(`The "${tableName}" table already contains data.`)
    }
  } catch (error) {
    console.error({ error: error.message })
  }
}

export default dataBulk
