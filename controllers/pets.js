var fn_addPets = async (ctx,next) => {
  let name = ctx.request.body.petname;
  console.log(name)
}
module.exports = {
  'POST /addpets': fn_addPets
}