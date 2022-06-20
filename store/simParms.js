// store/fruits.js

export const state = () => ({
  parms: [],
  lobs: [
    { longName: 'Personal Property', shortName: 'PProp' },
    { longName: 'Personal Auto', shortName: 'PAuto' },
    { longName: 'Commercial Property', shortName: 'CProp' },
    { longName: 'Commercial Auto', shortName: 'CAuto' },
    { longName: 'Professional Liability', shortName: 'ProfLiab' },
    { longName: 'Workers Compensation', shortName: 'WC' },
    { longName: 'Products Liability', shortName: 'ProdLiab' },
    { longName: 'Medical Malpractice', shortName: 'MedMal' },
  ],
  lobRels: [
    { shortname: 'PProp', lrRel: 0.95, erRel: 1.05, cvRel: 1.2, prPct: 0.15 },
    { shortname: 'PAuto', lrRel: 1.0, erRel: 1.1, cvRel: 0.9, prPct: 0.25 },
    { shortname: 'CProp', lrRel: 0.9, erRel: .95, cvRel: 1.2, prPct: 0.15 },
    { shortname: 'CAuto', lrRel: 1.3, erRel: 1.15, cvRel: 0.9, prPct: 0.15 },
    { shortname: 'ProfLiab', lrRel: 1.08, erRel: 1, cvRel: 1.5, prPct: 0.1 },
    { shortname: 'WC', lrRel: 1.01, erRel: .9, cvRel: 1.2, prPct: 0.075 },
    {
      shortname: 'ProdLiab',
      lrRel: 1.1,
      erRel: 1.05,
      cvRel: 1.5,
      prPct: 0.075,
    },
    { shortname: 'MedMal', lrRel: 1.05, erRel: 1.05, cvRel: 1.2, prPct: 0.05 },
  ],
  buRels: [
    { shortname: 'NE_US', lrRel: 1.05, erRel: 1.05, cvRel: 1.2, prPct: 0.15 },
    { shortname: 'SE_US', lrRel: 1.2, erRel: 1.15, cvRel: 0.9, prPct: 0.1 },
    { shortname: 'CE_US', lrRel: 1.1, erRel: .95, cvRel: 1.2, prPct: 0.12 },
    { shortname: 'SW_US', lrRel: 0.9, erRel: 1.1, cvRel: 0.9, prPct: 0.15 },
    { shortname: 'NW_US', lrRel: 1.03, erRel: .9, cvRel: 1.5, prPct: 0.13 },
    { shortname: 'CAN', lrRel: 0.98, erRel: 1.0, cvRel: 1.2, prPct: 0.15 },
    { shortname: 'MEX', lrRel: 1.01, erRel: 1.075, cvRel: 1.5, prPct: 0.2 },
  ],
  bus: [
    { longName: 'North East US', shortName: 'NE_US' },
    { longName: 'South East US', shortName: 'SE_US' },
    { longName: 'Central US', shortName: 'CE_US' },
    { longName: 'South West US', shortName: 'SW_US' },
    { longName: 'North West US', shortName: 'NW_US' },
    { longName: 'Canada', shortName: 'CAN' },
    { longName: 'Mexico', shortName: 'MEX' },
  ],
})

export const mutations = {
  ADD_LOB(state, lob) {
    state.lobs.push(lob)
  },
  DROP_LOB(state, dLob) {
    state.lobs = state.lobs.map((e) => {
      if (e.lobName === dLob) {
        e.alive = false
      }
      return e
    })
  },
  ADD_BU(state, bu) {
    state.bus.push(bu)
  },
  DROP_BU(state, dBu) {
    state.bus = state.bus.map((e) => {
      if (e.lobName === dBu) {
        e.alive = false
      }
      return e
    })
  },
  SET_PARMS(state, parms) {
    state.parms = parms
  },
  SET_BUS(state, bus) {
    state.bus = bus
  },
  SET_LOBS(state, lobs) {
    state.lobs = lobs
  },
  RENAME_BU(state, bu) {
    const idx = state.bus.findIndex((e) => e.longName === bu.item)
    const bus = state.bus
    bu = { longName: bu.longName, shortName: bu.shortName }
    bus[idx] = bu
    state.bus = bus
  },
  RENAME_LOB(state, lob) {
    const idx = state.lobs.findIndex((e) => e.longName === lob.item)
    const lobs = state.lobs
    lob = { longName: lob.longName, shortName: lob.shortName }
    lobs[idx] = lob
    state.lobs = lobs
  },
}

export const actions = {
  INIT_PARMS(context) {
    if (context.state.parms.length === 0) {
      const parms = context.getters.getParms
      context.commit('SET_PARMS', parms)
    }
  },
  NEW_PARMS(context) {
    const parms = context.getters.getParms
    context.commit('SET_PARMS', parms)
  },
}

export const getters = {
  getParms: (state) => {
    const parms = []
    state.bus.map((b,i)=>{
      const br = Math.min(i,state.buRels.length-1)
      const buRels = state.buRels[br]
      state.lobs.map((l,j)=>{
        const lr = Math.min(j,state.lobRels.length-1)
        const lobRels = state.lobRels[lr]
        const temp = {}
        temp.key = i * 1000 + j
        temp.alive = true
        temp.buName = b.longName
        temp.bu = b.shortName
        temp.lobName = l.longName
        temp.lob = l.shortName
        temp.prem = Math.round(1000000*buRels.prPct*lobRels.prPct)
        temp.er = Math.round(100*.32*buRels.erRel*lobRels.erRel)/100
        temp.lr = Math.round(100*.65*buRels.lrRel*lobRels.lrRel)/100
        temp.cv = Math.round(100*.5*buRels.cvRel*lobRels.cvRel)/100
        temp.dist = 'LogNormal'
        temp.cf = j+1
        temp.cfwt = Math.round(100*.4*buRels.lrRel*lobRels.lrRel)/100
        parms.push(temp)
        return null
      })
      return null
    })
    return parms
  },
  getUnused: (state) => {
    const parms = []
    const key = state.parms.map((e) => e.key)
    for (let b = 0; b < state.bus.length; b++) {
      for (let l = 0; l < state.lobs.length; l++) {
        const temp = {}
        temp.key = b * 1000 + l
        temp.buName = state.bus[b].longName
        temp.bu = state.bus[b].shortName
        temp.lobName = state.lobs[l].longName
        temp.lob = state.lobs[l].shortName
        const incl =
          state.bus[b].alive && state.lobs[l].alive && !key.includes(temp.key)
        if (incl) parms.push(temp)
      }
    }
    return parms
  },
}
