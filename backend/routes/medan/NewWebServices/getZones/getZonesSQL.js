
let statements = {
  getZonesById: {
            statement :`select * from ASSETS_DEFINITION ad where nvl(AD.DELETED,0)=0 and ZONE_ID = :ZONE_ID `,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
    },

    getAllZones: {
      statement :`select * from INVENTORY.ZONES
      z
      where nvl(Z.DELETED,0)=0`,
      returns: [],
      bindings: [],
      qstring: "",
      requireCommit: false
}
}
  module.exports = statements ;
  