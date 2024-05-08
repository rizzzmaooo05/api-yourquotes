const isEmpty = (str) => str === ''

const isAlphaNumeric = str => /^[a-z0-9]*$/gi.test(str)

const isLowerCase = str => str === str.toLowerCase()

const isEightCharMin = str => str.length >= 8

const isExist = async (db, req) => {
  const user = await db.from("users").select().eq("id", req.body.id)

  try {
    if(user.data[0].id) return true
  } catch {
    return false
  }
}

const validation = {
  isEmpty,
  isLowerCase,
  isAlphaNumeric,
  isEightCharMin,
  isExist
}

export default validation