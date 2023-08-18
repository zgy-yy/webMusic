import request from "@/server/request";

export function getHotSerch() {
    return request.get({
        url: '/search/hot/detail'
    }).then(res => {
        return res
    })
}

export function getSearchRes(key: string) {
    return request.get({
        url: '/cloudsearch',
        params: {
            keywords: key
        }
    }).then(res => {
        return res
    })
}