import type { Song } from '@/type/music'

interface Artist {
  name: string
  id: number
  picId: number
  img1v1Id: number
  briefDesc: string
  picUrl: string
  img1v1Url: string
  albumSize: number
  alias: string[]
  trans: string
  musicSize: number
  topicPerson: number
  picId_str: string
  img1v1Id_str: string
}

export interface AlbumType {
  name: string
  id: number
  type: string
  size: number
  picId: number
  blurPicUrl: string
  companyId: number
  pic: number
  picUrl: string
  publishTime: number
  description: string
  tags: string
  company: string
  briefDesc: string
  artist: Artist
  songs: any
  alias: string[]
  status: number
  copyrightId: number
  commentThreadId: string
  artists: Artist[]
  paid: boolean
  onSale?: boolean
  picId_str: string
}

export interface AlbumDetail {
  code: number
  songs: Song[]
  album: {
    songs: undefined[]
    paid: boolean
    onSale: boolean
    mark: number
    awardTags: object
    companyId: number
    blurPicUrl: string
    pic: number
    alias: undefined[]
    artists: Artist[]
    copyrightId: number
    picId: number
    artist: Artist
    briefDesc: string
    publishTime: number
    company: string
    picUrl: string
    commentThreadId: string
    tags: string
    status: number
    subType: string
    description: string
    name: string
    id: number
    type: string
    size: number
    picId_str: string
    info: {
      commentThread: {
        id: string
        resourceInfo: {
          id: number
          userId: number
          name: string
          imgUrl: string
          creator: object
          encodedId: object
          subTitle: object
          webUrl: object
        }
        resourceType: number
        commentCount: number
        likedCount: number
        shareCount: number
        hotCount: number
        latestLikedUsers: object
        resourceId: number
        resourceTitle: string
        resourceOwnerId: number
      }
      latestLikedUsers: object
      liked: boolean
      comments: object
      resourceType: number
      resourceId: number
      commentCount: number
      likedCount: number
      shareCount: number
      threadId: string
    }
  }
}
