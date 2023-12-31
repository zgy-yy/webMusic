import type {Song} from '@/type/music'

export interface Banner {
    imageUrl: string
    targetId: number
    targetType: number
    titleColor: string
    typeTitle: string
    url: string
    exclusive: boolean
    encodeId: string
    song: null

}

export interface RecommendPlaylist {
    id: number
    type?: number
    name: string
    copywriter?: string
    picUrl: string
    canDislike?: boolean
    trackNumberUpdateTime?: number
    playCount: number
    trackCount?: number
    highQuality?: boolean
    alg: string
}

export interface PlayList {
    id: number
    name: string
    coverImgId: number
    coverImgUrl: string
    coverImgId_str: string
    adType: number
    userId: number
    createTime: number
    status: number
    opRecommend: boolean
    highQuality: boolean
    newImported: boolean
    updateTime: number
    trackCount: number
    specialType: number
    privacy: number
    trackUpdateTime: number
    commentThreadId: string
    playCount: number
    trackNumberUpdateTime: number
    subscribedCount: number
    cloudTrackCount: number
    ordered: boolean
    description: string
    tags: string[]
    backgroundCoverId: number
    backgroundCoverUrl: null
    titleImage: number
    copied: boolean
    relateResType: null
    subscribers: {
        defaultAvatar: boolean
        province: number
        authStatus: number
        followed: boolean
        avatarUrl: string
        accountStatus: number
        gender: number
        city: number
        birthday: number
        userId: number
        userType: number
        nickname: string
        signature: string
        description: string
        detailDescription: string
        avatarImgId: number
        backgroundImgId: number
        backgroundUrl: string
        authority: number
        mutual: boolean
        expertTags: null
        experts: null
        djStatus: number
        vipType: number
        remarkName: null
        authenticationTypes: number
        avatarDetail: null
        avatarImgIdStr: string
        backgroundImgIdStr: string
        anchor: boolean
        avatarImgId_str: string
    }[]
    tracks: Array<any>
}
