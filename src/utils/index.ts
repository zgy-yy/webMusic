export function playNumStr(num: number) {
  return Math.floor(num / 10000) + 'w'
}

let audio: HTMLAudioElement

export function musicUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export function getAudioContext() {
  // const url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`

  if (audio) {
    return audio
  } else {
    audio = new Audio()
    return audio
  }
}

export class Lyric {
  lrc: string
  tags: {
    [index: string]: string
  }
  lines: Array<{ time: number; txt: string }>
  timer: number = -1

  constructor(lrc: string) {
    this.lrc = lrc
    this.tags = {
      title: 'ti',
      artist: 'ar',
      album: 'al',
      offset: 'offset',
      by: 'by'
    }
    this.lines = []
    this._initTag()
    this._initLines()
  }

  private _initTag() {
    for (const tag in this.tags) {
      const matches = this.lrc.match(new RegExp(`\\[${this.tags[tag]}:([^\\]]*)]`, 'i'))
      this.tags[tag] = (matches && matches[1]) || ''
    }
  }

  private _initLines() {
    const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
    const lines = this.lrc.split('\n')
    const offset = parseInt(this.tags['offset']) || 0
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const result = timeExp.exec(line)
      if (result) {
        const txt = line.replace(timeExp, '').trim()
        if (txt) {
          this.lines.push({
            time:
              (parseInt(result[1]) * 60 + parseInt(result[2])) * 1000 +
              parseInt(result[3] || '0') * 10 +
              offset,
            txt
          })
        }
      }
    }
  }

  public getLines() {
    return this.lines
  }

  public seek(time: number) {
    const len = this.lines.length
    const recursiveBserach = (low: number, high: number, val: number): number => {
      const mid = low + ((high - low) >> 1)
      if (low > high) {
        return mid
      }
      if (this.lines[mid].time == val) {
        return mid
      } else if (this.lines[mid].time > val) {
        return recursiveBserach(low, mid - 1, val)
      } else {
        return recursiveBserach(mid + 1, high, val)
      }
    }
    return recursiveBserach(0, len - 1, time)
  }

  public update(curTime: number, handler: (index: number) => void) {
    const curIndex = this.seek(curTime)
    const nextIndex = curIndex + 1
    handler(curIndex)
    if (nextIndex >= this.lines.length) {
      handler(curIndex)
      return
    }
    const detail = this.lines[nextIndex].time - curTime
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      handler(nextIndex)
    }, detail)
  }

  public stop() {
    clearTimeout(this.timer)
  }
}


export function formatTime(interval:number) {
  interval = interval | 0
  const minute = ((interval / 60 | 0) + '').padStart(2, '0')
  const second = (interval % 60 + '').padStart(2, '0')
  return `${minute}:${second}`
}
