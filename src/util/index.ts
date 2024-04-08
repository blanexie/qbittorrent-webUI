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

    public refresh(infoV: any) {
        if (infoV.dht_nodes) {
            this.dht_nodes = infoV.dht_nodes
        }
        if (infoV.dl_info_data) {
            this.dl_info_data.setBytes(infoV.dl_info_data)
        }
        if (infoV.dl_info_speed) {
            this.dl_info_speed.setBytes(infoV.dl_info_speed)
        }
        if (infoV.dl_rate_limit) {
            this.dl_rate_limit = infoV.dl_rate_limit
        }
        if (infoV.up_info_data) {
            this.up_info_data.setBytes(infoV.up_info_data)
        }
        if (infoV.up_info_speed) {
            this.up_info_speed.setBytes(infoV.up_info_speed)
        }
        if (infoV.up_rate_limit) {
            this.up_rate_limit = infoV.up_rate_limit
        }
    }


}

class GlobalSpeedLimit {
    speedLimitsMode = 0  //全局速度限制是否启用
    downloadLimit = new ByteData(0)   //全局下载速度限制， 0表示没限制
    uploadLimit = new ByteData(0)   //全局上传速度限制 ， 0 没有限制
}


class TorrentInfo {
    hash = '8c212779b4abde7c6bc608063a0d008b7e40ce32'
    name = 'debian-8.1.0-amd64-CD-1.iso'
    size: ByteData = new ByteData(657457152)
    progress = 0.16108787059783936
    dlspeed = new ByteData(9681262)
    downloaded = new ByteData(9681262)
    upspeed = new ByteData(4507841)
    seeding_time: number = 3 * 60 * 60 + 69
    eta = 87
    f_l_piece_prio = false
    force_start = false
    category = ''
    tags = ''
    num_complete = -1
    num_incomplete = -1
    num_leechs = 2
    num_seeds = 54
    priority = 1
    ratio = 0
    seq_dl = false
    state = 'downloading'
    super_seeding = false

    properties = new TorrentProperties()


    public refresh(t: any) {
        if (t.name) {
            this.name = t.name
        }
        if (t.size) {
            this.size = new ByteData(t.size)
        }
        if (t.progress) {
            this.progress = t.progress
        }
        if (t.dlspeed) {
            this.dlspeed = new ByteData(t.dlspeed)
        }
        if (t.downloaded) {
            this.downloaded = new ByteData(t.downloaded)
        }
        if (t.upspeed) {
            this.upspeed = new ByteData(t.upspeed)
        }

        if (t.seeding_time) {
            this.seeding_time = t.seeding_time
        }

        if (t.eta) {
            this.eta = t.eta
        }
        if (t.f_l_piece_prio) {
            this.f_l_piece_prio = t.f_l_piece_prio
        }
        if (t.force_start) {
            this.force_start = t.force_start
        }

        if (t.category) {
            this.category = t.category
        }
        if (t.tags) {
            this.tags = t.tags
        }
        if (t.num_complete) {
            this.num_complete = t.num_complete
        }
        if (t.num_incomplete) {
            this.num_incomplete = t.num_incomplete
        }
        if (t.num_leechs) {
            this.num_leechs = t.num_leechs
        }
        if (t.num_seeds) {
            this.num_seeds = t.num_seeds
        }
        if (t.priority) {
            this.priority = t.priority
        }

        if (t.ratio) {
            this.ratio = t.ratio
        }

        if (t.seq_dl) {
            this.seq_dl = t.seq_dl
        }

        if (t.state) {
            this.state = t.state
        }

        if (t.super_seeding) {
            this.super_seeding = t.super_seeding
        }

    }


    public setProperties(props: TorrentProperties) {
        this.properties = props
    }

    public getProgress(): number {
        return Math.floor(this.progress * 100)
    }

    public getSeedNeedTime() {
        if (this.seeding_time > 3600) {
            const h = Math.floor(this.seeding_time / 3600)
            const m = Math.floor((this.seeding_time - (3600 * h)) / 60)
            return h + 'h ' + m + 'm '
        } else {
            const m = Math.floor(this.seeding_time / 60)
            const s = this.seeding_time - (m * 60)
            return +s + 's'
        }
    }

}


class TorrentProperties {
    addition_date = 1438429165
    comment = 'Debian CD from cdimage.debian.org'
    completion_date = 1438429234
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

export {TorrentListReq, GlobalInfo, GlobalSpeedLimit, ByteData, TorrentInfo, TorrentProperties}