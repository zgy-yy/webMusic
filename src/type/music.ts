export interface Song {
  name: string
  id: number
  pst: number
  t: number
  ar: { id: number; name: string; tns: undefined[]; alias: undefined[] }[]
  alia: undefined[]
  pop: number
  st: number
  rt: string
  fee: number
  v: number
  crbt: object
  cf: string
  al: {
    id: number
    name: string
    picUrl: string
    tns: undefined[]
    pic_str: string
    pic: number
  }
  dt: number
  h: { br: number; fid: number; size: number; vd: number; sr: number }
  m: { br: number; fid: number; size: number; vd: number; sr: number }
  l: { br: number; fid: number; size: number; vd: number; sr: number }
  sq: { br: number; fid: number; size: number; vd: number; sr: number }
  hr: object
  a: object
  cd: string
  no: number
  rtUrl: null
  ftype: number
  rtUrls: []
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData: null
  tagPicList: null
  resourceState: boolean
  version: number
  songJumpInfo: null
  entertainmentTags: null
  awardTags: null
  single: number
  noCopyrightRcmd: null
  rtype: number
  rurl: null
  mst: number
  cp: number
  mv: number
  publishTime: number
}

export interface Lyric {
  sgc: boolean
  sfy: boolean
  qfy: boolean
  lrc: { version: number; lyric: string }
  klyric: { version: number; lyric: string }
  tlyric: { version: number; lyric: string }
  romalrc: { version: number; lyric: string }
  code: number
}
