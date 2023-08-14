export interface Song {
    name: string
    id: number
    ar?: { id: number; name: string; tns: undefined[]; alias: undefined[] }[]
    al?: {
        id: number
        name: string
        picUrl: string
        pic_str: string
        pic: number
    }
    mp3Url?: string
    artists?: {
        name: string
        img1v1Url: string
        picUrl: string
    }[]
    album?: { picUrl: string, blurPicUrl: string }
}

export interface Lyric {
    sgc?: boolean
    sfy?: boolean
    qfy?: boolean
    lrc: { version: number; lyric: string }
    klyric?: { version: number; lyric: string }
    tlyric?: { version: number; lyric: string }
    romalrc?: { version: number; lyric: string }
    code?: number
}
