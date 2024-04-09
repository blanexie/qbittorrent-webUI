class ByteData {
    /**
     *
     * @param bytes  字节数
     */
    constructor(bytes: number) {
        this.bytes = bytes
    }

    bytes: number

    private readonly KB = 1024
    private readonly MB = 1024 * 1024
    private readonly GB = 1024 * 1024 * 1024
    private readonly TB = 1024 * 1024 * 1024 * 1024

    public setBytes(bytes: number) {
        this.bytes = bytes
    }

    public getBytes(): number {
        return this.bytes
    }

    public getSpeedStr(): string {
        return this.getSize() + this.getSpeedUnit()
    }

    public getSizeStr(): string {
        return this.getSize() + this.getSizeUnit()
    }

    public getSpeedUnit(): string {
        if (this.bytes < this.KB) {
            return 'B/s'
        }
        if (this.bytes < this.MB) {
            return 'KB/s'
        }
        if (this.bytes < this.GB) {
            return 'MB/s'
        }
        if (this.bytes < this.TB) {
            return 'GB/s'
        }
        return 'TB/s'
    }

    public getSizeUnit(): string {
        if (this.bytes < this.KB) {
            return 'B'
        }
        if (this.bytes < this.MB) {
            return 'KB'
        }
        if (this.bytes < this.GB) {
            return 'MB'
        }
        if (this.bytes < this.TB) {
            return 'GB'
        }
        return 'TB'
    }

    public getSize(): number {
        if (this.bytes < this.KB) {
            return this.bytes
        }
        if (this.bytes < this.MB) {
            return Math.round((this.bytes / this.KB) * 10) / 10
        }
        if (this.bytes < this.GB) {
            return Math.round((this.bytes / this.MB) * 10) / 10
        }
        if (this.bytes < this.TB) {
            return Math.round((this.bytes / this.GB) * 100) / 100
        }
        return Math.round((this.bytes / this.TB) * 100) / 100
    }

}


class GlobalInfo {
    public connection_status = 'connected'
    public dht_nodes = 0
    public dl_info_data = new ByteData(421)
    public dl_info_speed = new ByteData(13)
    public dl_rate_limit = 0
    public up_info_data = new ByteData(1223)
    public up_info_speed = new ByteData(1631)
    public up_rate_limit = 0

}

class GlobalSpeedLimit {
    speedLimitsMode = 0  //全局速度限制是否启用
    downloadLimit = new ByteData(0)   //全局下载速度限制， 0表示没限制
    uploadLimit = new ByteData(0)   //全局上传速度限制 ， 0 没有限制
}


class TorrentInfo {
    public hash = '8c212779b4abde7c6bc608063a0d008b7e40ce32'
    public name = 'debian-8.1.0-amd64-CD-1.iso'
    public size: ByteData = new ByteData(657457152)
    public total_size: ByteData = new ByteData(657457152)
    public progress = 0.16108787059783936
    public dlspeed = new ByteData(9681262)
    public downloaded = new ByteData(9681262)
    public upspeed = new ByteData(4507841)
    public seeding_time: number = 3 * 60 * 60 + 69
    public eta = 87
    public f_l_piece_prio = false
    public force_start = false
    public category = ''
    public tags = ''
    public num_complete = -1
    public num_incomplete = -1
    public num_leechs = 2
    public num_seeds = 54
    public priority = 1
    public ratio = 0
    public seq_dl = false
    public state = 'downloading'
    public super_seeding = false

    public properties = new TorrentProperties()


    public setProperties(props: TorrentProperties) {
        this.properties = props
    }

    public getProgress(): number {
        return Math.floor(this.progress * 100)
    }

    public getSeedNeedTime() {
        const time = this.eta
        if (time > 24 * 3600) {
            const d = Math.floor(time / (3600 * 24))
            const h = Math.floor((time - (3600 * 24 * d)) / 3600)
            return d + "d " + h + "h"
        } else if (time > 3600) {
            const h = Math.floor(time / 3600)
            const m = Math.floor((time - (3600 * h)) / 60)
            return h + 'h ' + m + 'm '
        } else {
            const m = Math.floor(time / 60)
            const s = time - (m * 60)
            return m + 'm ' + s + 's'
        }
    }

}


class TorrentProperties {
    public addition_date = 1438429165
    public comment = 'Debian CD from cdimage.debian.org'
    public completion_date = 1438429234
    created_by = ''
    creation_date = 1433605214
    dl_limit = -1
    dl_speed = 0
    dl_speed_avg = 9736015
    eta = 8640000
    last_seen = 1438430354
    nb_connections = 3
    nb_connections_limit = 250
    peers = 1
    peers_total = 89
    piece_size = 524288
    pieces_have = 1254
    pieces_num = 1254
    reannounce = 672
    save_path = '/Downloads/debian-8.1.0-amd64-CD-1.iso'
    seeding_time = 1128
    seeds = 1
    seeds_total = 254
    share_ratio = 0.00072121022562178299
    time_elapsed = 1197
    total_downloaded = 681521119
    total_downloaded_session = 681521119
    total_size = 657457152
    total_uploaded = 491520
    total_uploaded_session = 491520
    total_wasted = 23481724
    up_limit = -1
    up_speed = 0
    up_speed_avg = 410
}


class TorrentListReq {
    filter: string = 'all'
    category: string | undefined = undefined
    tag: string | undefined = undefined
    sort: string | undefined = undefined
    reverse: boolean = false
    limit: number = 10
    offset: number = 0
    hashes: string | undefined = undefined

    public getReqStr(): string {
        let path = this.filter
        if (this.category) {
            path = `${path}&category=${this.category}`
        }
        if (this.tag) {
            path = `${path}&tag=${this.tag}`
        }
        if (this.sort) {
            path = `${path}&sort=${this.sort}`
        }
        if (this.reverse) {
            path = `${path}&reverse=${this.reverse}`
        }
        if (this.limit) {
            path = `${path}&limit =${this.limit}`
        }
        if (this.offset) {
            path = `${path}&limit =${this.offset}`
        }
        if (this.hashes) {
            path = `${path}&limit =${this.hashes}`
        }
        return path
    }
}


function mergeObj(base: any, src: any) {
    if (src) { /* empty */
    } else {
        return base
    }
    const keysb = Object.keys(base)
    const keyss = Object.keys(src)

    for (const k of keyss) {
        const index = keysb.indexOf(k)
        if (index >= 0) {
            if (base[k] instanceof ByteData) {
                base[k].setBytes(src[k])
            } else {
                base[k] = src[k]
            }
        }
    }
    return base
}


export {mergeObj, TorrentListReq, GlobalInfo, GlobalSpeedLimit, ByteData, TorrentInfo, TorrentProperties}