const {db} = require('./index')

export const getAllCompanies = () => {
  db.collection('companies').get()
}
