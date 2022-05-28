import { connect } from 'mongoose'
const uri = 'mongodb://localhost:27017/my_database'

connect(uri).then(
  () => {
    console.log('Connected to the database')
  },
  (err) => {
    console.log(err.reason)
  }
)
