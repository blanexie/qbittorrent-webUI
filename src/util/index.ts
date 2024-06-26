import {axios} from "@/requests";
import {ElMessage} from "element-plus";

class TorrentSetting {
    public savePath = ''
    public downloadLimit = 0
    public downloadLimitUnit = 1
    public uploadLimit = 0
    public uploadLimitUnit = 1
    public torrentName = ''
    public category = ''
    public tags: string[] = []
    public sequential = false
    public superSeed = false
    public f_l_piece_prio = false
    public autoManagement = true
}

class Tracker {
    public msg = ""
    public num_peers = 0
    public num_downloaded = 0
    public num_leeches = 0
    public num_seeds = 0
    public tier = -1
    public status = 2
    public url = ''

    public statusText =
        this.status === 0 ? 'disabled' : this.status === 1 ? 'contacted' : this.status === 2 ? 'working' : this.status === 3 ? 'updating' : 'not working'

}

class TorrentFile {
    public index = 0
    public is_seed = false

    public prefix: string = ""
    public label: string = ''

    public name = ""
    public piece_range = [0, 1253]
    public priority = 1
    public progress = 0
    public size = 657457152
    public availability = 0.5
    public isLeaf = false

    public children: TorrentFile[] = []

    public constructor(prefix: string, label: string) {
        this.label = label
        this.prefix = prefix
        if (prefix == '') {
            this.name = label
        } else {
            this.name = prefix + "/" + label
        }
    }

}

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

    public getUnit(): number {
        if (this.bytes < this.KB) {
            return 1
        }
        if (this.bytes < this.MB) {
            return this.KB
        }
        if (this.bytes < this.GB) {
            return this.MB
        }
        if (this.bytes < this.TB) {
            return this.GB
        }
        return this.TB
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
    public dl_rate_limit = new ByteData(13)
    public up_info_data = new ByteData(1223)
    public up_info_speed = new ByteData(1631)
    public up_rate_limit = new ByteData(13)

    public categories: string[] = []
    public tags: string[] = []

    public alltime_d = 224357181908
    public alltime_ul = 1481274895225
    public average_time_queue = 3273

    public free_space_on_disk = 15657558016
    public global_ratio = "6.60"
    public queued_io_jobs = 0
    public queueing = true
    public read_cache_hits = "0"
    public read_cache_overload = "0"

    public total_buffers_size = 131072
    public total_peer_connections = 67
    public total_queued_size = 0
    public total_wasted_session = 271592381
    public use_alt_speed_limits = false
    public write_cache_overload = "0"

    public loginShow: boolean = true
    public currentMenu = "downloading"    //当前目录选择

    public showTorrentAddView = false
    public showDetail = false
    public currentTorrent: TorrentInfo | null = null
    public setting: TorrentSetting = new TorrentSetting()
    public files: TorrentFile[] = []
    public trackers: Tracker[] = []

    //本次定时任务批次的编码，
    public rid = 0
    public intervalId: number = 0 //定时任务的批次号
    public isRequesting: boolean = false;
    public refresh_interval = 3000

    /**
     * setCurrentTorrent
     */
    public setCurrentTorrent(torrent: TorrentInfo) {
        this.currentTorrent = torrent
        this.setting = new TorrentSetting()

        this.setting.torrentName = torrent.name
        this.setting.savePath = torrent.save_path
        this.setting.downloadLimit = torrent.dl_limit.getSize()
        this.setting.downloadLimitUnit = torrent.dl_limit.getUnit()
        this.setting.uploadLimit = torrent.up_limit.getSize()
        this.setting.uploadLimitUnit = torrent.up_limit.getUnit()
        this.setting.category = torrent.category
        this.setting.tags = torrent.getTags()
        this.setting.sequential = torrent.seq_dl
        this.setting.superSeed = torrent.super_seeding
        this.setting.f_l_piece_prio = torrent.f_l_piece_prio

        if (this.setting.downloadLimit === 0) {
            this.setting.downloadLimitUnit = 1024
        }
        if (this.setting.uploadLimit === 0) {
            this.setting.uploadLimitUnit = 1024
        }

        this.showDetail = true
    }

    /**
     * refreshFiles
     */
    public refreshFiles(tFiles: TorrentFile[]) {
        this.files.length = 0
        const fileMap = new Map<string, TorrentFile>()
        tFiles.forEach(it => {
            it.isLeaf = true
            const [p, l] = this.splitPrefix(it.name)
            it.prefix = p
            it.label = l
            fileMap.set(it.name, it)
            const parent = this.findMapFile(p, fileMap)
            parent?.children.push(it)
        });
        //获取一级目录
        fileMap.forEach((it) => {
            if (it.prefix == '') {
                this.files.push(it)
            }
        })
    }


    private findMapFile(name: string, fileMap: Map<string, TorrentFile>) {
        if (name == '') {
            return null
        }
        let file = fileMap.get(name)
        if (file) {
            return file
        } else {
            const [p, l] = this.splitPrefix(name)
            file = new TorrentFile(p, l)
            fileMap.set(file.name, file)
            const parent = this.findMapFile(p, fileMap)
            parent?.children.push(file)
            return file
        }
    }

    private splitPrefix = (name: string) => {
        const paths = name.split("/")
        if (paths.length == 1) {
            return ['', name]
        }
        if (paths.length == 2) {
            return [paths[0], paths[1]]
        }
        const last = paths[paths.length - 1]
        paths.length = paths.length - 1
        const prefix = paths.join("/")
        return [prefix, last]
    }

    public setCategoryAndTags(category: any | null, tags: string[] | null) {
        if (category) {
            this.categories.length = 0
            Object.keys(category).forEach(it => this.categories.push(it))
        }
        if (tags) {
            this.tags = tags
        }
    }

    public refresh(ts: any) {
        mergeObj(this, ts)
    }


}


class TorrentInfo {
    public hash = '8c212779b4abde7c6bc608063a0d008b7e40ce32'
    public name = 'debian-8.1.0-amd64-CD-1.iso'
    public size: ByteData = new ByteData(657457152)
    public total_size: ByteData = new ByteData(657457152)
    public progress = 0.16108787059783936
    public dlspeed = new ByteData(9681262)
    public dl_limit = new ByteData(9681262)
    public completed = new ByteData(0)
    public downloaded = new ByteData(9681262)
    public upspeed = new ByteData(4507841)
    public up_limit = new ByteData(4507841)
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
    public magnet_uri = ""
    public content_path = ''
    public added_on = 0
    public last_activity = 0
    public time_active = 0
    public tracker = ''
    public save_path = '/Downloads/debian-8.1.0-amd64-CD-1.iso'

    public show: boolean = false
    public isActive: boolean = false

    public properties = new TorrentProperties()

    public constructor(hash: string) {
        this.hash = hash
    }

    private dl = [
        "allocating", //开启磁盘空间，马上就下载， 所以算在下载中
        "downloading",
        "metaDL",  //开始下载了，正在获取种子的metadata
        "stalledDL",  //开始下载了，但是无连接
        "checkingDL", //校验中，校验完成立即下载
        "forcedDL",//强制下载， 忽略队列限制
    ]

    private flinsh = [
        "uploading",
        "pausedUP",  //已经下载完成了，但是暂停上传中
        "quenedUP", //在队列中等待上传，应该已经下载完成了 ？？？
        "stalledUP",  //开始做种了，但是无连接
        "checkingUP", //校验中， 是下载完成后的校验
        "forcedUP",//强制上传， 应该已经下载完成了 ？？？
    ]
    private quene = [
        "quenedDL", //在队列中等待下载
    ]

    private error = [
        "pausedDL",
        "error",
        "missingFiles",
        "checkingResumeData",
        "moving",
        "unknown"
    ]

    public getCState() {
        if (this.dl.includes(this.state)) {
            return "downloading"
        }
        if (this.flinsh.includes(this.state)) {
            return "finish"
        }
        if (this.quene.includes(this.state)) {
            return "quene"
        }
        if (this.error.includes(this.state)) {
            return "error"
        }
    }

    public getProgress(): number {
        return Math.floor(this.progress * 100)
    }

    public getDownloadSizeStr(): string {
        return this.getProgress() + '% (' + this.completed.getSizeStr() + '/' + this.total_size.getSizeStr() + ')'
    }

    public getTags() {
        return this.tags == '' ? [] : this.tags.split(',')
    }

    public getEtaStr() {
        if (this.getProgress() == 100) {
            return '0'
        }
        const time = this.eta
        if (time > 24 * 3600) {
            const d = Math.floor(time / (3600 * 24))
            const h = Math.floor((time - (3600 * 24 * d)) / 3600)
            return d + 'd ' + h + 'h'
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

    public refresh(ts: any): TorrentInfo {
        mergeObj(this, ts)
        return this
    }

    public getTimeStr(key: string) {
        if (key == "added_on") {
            return timeS(this.added_on)
        }
        if (key == "last_activity") {
            return timeS(this.last_activity + this.time_active)
        }
        return ''
    }

}


class TorrentProperties {
    public addition_date = 1438429165
    public comment = 'Debian CD from cdimage.debian.org'
    public completion_date = 1438429234
    public created_by = ''
    public creation_date = 1433605214
    public dl_limit = -1
    public dl_speed = 0
    public dl_speed_avg = 9736015
    public eta = 8640000
    public last_seen = 1438430354
    public nb_connections = 3
    public nb_connections_limit = 250
    public peers = 1
    public peers_total = 89
    public piece_size = 524288
    public pieces_have = 1254
    public pieces_num = 1254
    public reannounce = 672
    public save_path = '/Downloads/debian-8.1.0-amd64-CD-1.iso'
    public seeding_time = 1128
    public seeds = 1
    public seeds_total = 254
    public share_ratio = 0.00072121022562178299
    public time_elapsed = 1197
    public total_downloaded = 681521119
    public total_downloaded_session = 681521119
    public total_size = 657457152
    public total_uploaded = 491520
    public total_uploaded_session = 491520
    public total_wasted = 23481724
    public up_limit = -1
    public up_speed = 0
    public up_speed_avg = 410
}

function time(time = +new Date(), type: string = 'yyyy-MM-dd hh:mm:ss') {
    // 前端开发过程中，常常需要将时间戳转化为标准时间格式供用户浏览
    // 不借助方法库的情况下，如何又快又好的实现呢？
    // 下面介绍两种方法
    const date = new Date(time);
    const Year = date.getFullYear();
    const month = date.getMonth() + 1;
    const Month = month >= 10 ? month : '0' + month;
    const day = date.getDate();
    const Day = day >= 10 ? day : '0' + day;
    const Hour1 = date.getHours();
    const Hour = Hour1 < 10 ? '0' + Hour1 : Hour1;
    const Minute1 = date.getMinutes();
    const Minute = Minute1 < 10 ? '0' + Minute1 : Minute1;
    const Second1 = date.getSeconds();
    const Second = Second1 < 10 ? '0' + Second1 : Second1;

    if (type === 'yyyy-MM-dd') {
        return Year + '-' + Month + '-' + Day;
        ;
    } else if (type === 'yyyy-MM-dd hh:mm:ss') {
        return Year + '-' + Month + '-' + Day + ' ' + Hour + ':' + Minute + ':' + Second;
    } else if (type === 'hh:mm:ss') {
        return Hour + ':' + Minute + ':' + Second;
    } else {
        return 'error time type!';
    }
}


function timeS(time: number, type: string = 'yyyy-MM-dd hh:mm:ss') {
    // 前端开发过程中，常常需要将时间戳转化为标准时间格式供用户浏览
    // 不借助方法库的情况下，如何又快又好的实现呢？
    // 下面介绍两种方法
    const date = new Date(time * 1000);
    const Year = date.getFullYear();
    const month = date.getMonth() + 1;
    const Month = month >= 10 ? month : '0' + month;
    const day = date.getDate();
    const Day = day >= 10 ? day : '0' + day;
    const Hour1 = date.getHours();
    const Hour = Hour1 < 10 ? '0' + Hour1 : Hour1;
    const Minute1 = date.getMinutes();
    const Minute = Minute1 < 10 ? '0' + Minute1 : Minute1;
    const Second1 = date.getSeconds();
    const Second = Second1 < 10 ? '0' + Second1 : Second1;

    if (type === 'yyyy-MM-dd') {
        return Year + '-' + Month + '-' + Day;
        ;
    } else if (type === 'yyyy-MM-dd hh:mm:ss') {
        return Year + '-' + Month + '-' + Day + ' ' + Hour + ':' + Minute + ':' + Second;
    } else if (type === 'hh:mm:ss') {
        return Hour + ':' + Minute + ':' + Second;
    } else {
        return 'error time type!';
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


class Preference {

    public show = false

    public random_port = false
    public listen_port = 58925
    public locale = 'en'
    public alt_dl_limit = 10240
    public alt_up_limit = 10240
    public dht = true
    public upnp = true
    public enable_embedded_tracker = false
    public embedded_tracker_port = 9000
    public queueing_enabled = false
    public up_limit = 0
    public dl_limit = 0
    public dont_count_slow_torrents = false

    public start_paused_enabled = false
    public temp_path = '/home/user/Downloads/temp'
    public temp_path_enabled = false

    public alternative_webui_enabled = false
    public alternative_webui_path = ''

    public dyndns_domain = 'changeme.dyndns.org'
    public dyndns_enabled = false
    public dyndns_password = ''
    public dyndns_service = 0
    public dyndns_username = ''

    public add_trackers = ''
    public add_trackers_enabled = false
    public announce_ip = ''
    public announce_to_all_tiers = true
    public announce_to_all_trackers = false
    public anonymous_mode = false
    public async_io_threads = 4
    public auto_delete_mode = 0
    public auto_tmm_enabled = false
    public autorun_enabled = false
    public autorun_program = ''
    public banned_IPs = ''
    public bittorrent_protocol = 0
    public bypass_auth_subnet_whitelist = ''
    public bypass_auth_subnet_whitelist_enabled = false
    public bypass_local_auth = false
    public category_changed_tmm_enabled = false
    public checking_memory_use = 32
    public create_subfolder_enabled = true
    public current_interface_address = ''
    public current_network_interface = ''
    public disk_cache = -1
    public disk_cache_ttl = 60
    public enable_coalesce_read_write = false
    public enable_multi_connections_from_same_ip = false
    public enable_os_cache = true
    public enable_piece_extent_affinity = false
    public enable_upload_suggestions = false
    public encryption = 0
    public export_dir = '/home/user/Downloads/all'
    public export_dir_fin = '/home/user/Downloads/completed'
    public file_pool_size = 40
    public incomplete_files_ext = false
    public ip_filter_enabled = false
    public ip_filter_path = ''
    public ip_filter_trackers = false
    public limit_lan_peers = true
    public limit_tcp_overhead = false
    public limit_utp_rate = true
    public lsd = true
    public mail_notification_auth_enabled = false
    public mail_notification_email = ''
    public mail_notification_enabled = false
    public mail_notification_password = ''
    public mail_notification_sender = 'qBittorrent_notification@example.com'
    public mail_notification_smtp = 'smtp.changeme.com'
    public mail_notification_ssl_enabled = false
    public mail_notification_username = ''

    public max_active_downloads = 3
    public max_active_torrents = 5
    public max_active_uploads = 3
    public max_connec = 500
    public max_connec_per_torrent = 100
    public max_ratio = -1
    public max_ratio_act = 0
    public max_ratio_enabled = false
    public max_seeding_time = -1
    public max_seeding_time_enabled = false
    public max_uploads = -1
    public max_uploads_per_torrent = -1

    public outgoing_ports_max = 0
    public outgoing_ports_min = 0
    public pex = true
    public preallocate_all = false
    public proxy_auth_enabled = false
    public proxy_ip = '0.0.0.0'
    public proxy_password = ''
    public proxy_peer_connections = false
    public proxy_port = 8080
    public proxy_torrents_only = false
    public proxy_type = 0
    public proxy_username = ''


    public recheck_completed_torrents = false
    public resolve_peer_countries = true
    public rss_auto_downloading_enabled = true
    public rss_download_repack_proper_episodes = true
    public rss_max_articles_per_feed = 50
    public rss_processing_enabled = true
    public rss_refresh_interval = 30
    public rss_smart_episode_filters = 's(\\d+)e(\\d+)\n(\\d+)x(\\d+)\n(\\d{4}[.\\-]\\d{1,2}[.\\-]\\d{1,2})'

    public save_path = '/home/user/Downloads/'
    public save_path_changed_tmm_enabled = false
    public save_resume_data_interval = 60

    public schedule_from_hour = 8
    public schedule_from_min = 0
    public schedule_to_hour = 20
    public schedule_to_min = 0
    public scheduler_days = 0
    public scheduler_enabled = false

    public send_buffer_low_watermark = 10
    public send_buffer_watermark = 500
    public send_buffer_watermark_factor = 50
    public slow_torrent_dl_rate_threshold = 2
    public slow_torrent_inactive_timer = 60
    public slow_torrent_ul_rate_threshold = 2
    public socket_backlog_size = 30
    public stop_tracker_timeout = 1

    public torrent_changed_tmm_enabled = true

    public upload_choking_algorithm = 1
    public upload_slots_behavior = 0

    public use_https = false
    public utp_tcp_mixed_mode = 0
    public web_ui_address = '*'
    public web_ui_ban_duration = 3600
    public web_ui_clickjacking_protection_enabled = true
    public web_ui_csrf_protection_enabled = true
    public web_ui_custom_http_headers = ''
    public web_ui_domain_list = '*'
    public web_ui_host_header_validation_enabled = true
    public web_ui_https_cert_path = ''
    public web_ui_https_key_path = ''
    public web_ui_max_auth_fail_count = 5
    public web_ui_port = 8080
    public web_ui_secure_cookie_enabled = true
    public web_ui_session_timeout = 3600
    public web_ui_upnp = false
    public web_ui_use_custom_http_headers_enabled = false
    public web_ui_username = 'admin'
    public web_ui_password = ''
    public scan_dirs = {
        '/home/user/Downloads/incoming/games': 0,
        '/home/user/Downloads/incoming/movies': 1
    }
}


function scheduleMaindata(intervalId: number, info: GlobalInfo, torrents: TorrentInfo[]) {
    //检查当前批次是否还存在
    if (intervalId !== info.intervalId) {
        return
    }

    // const data = initData
    // const fullUpdate = data.full_update ? data.full_update : false
    // store.info.refresh(data.server_state)
    // refreshTorrents(data.torrents, fullUpdate)

    axios.get('/api/v2/sync/maindata?rid=' + info.rid + "&" + new Date().getTime()).then(resp => {
        const data = resp.data
        if (info.rid !== 0) {
            info.rid = data.rid
        } else {
            info.rid = 1
        }
        //设置分类和标签
        info.setCategoryAndTags(data.categories, data.tags)
        //设置全局属性
        info.refresh(data.server_state)
        //设置各个torrent属性
        const fullUpdate = data.full_update ? data.full_update : false
        refreshTorrents(torrents, data.torrents, fullUpdate)
        setTimeout(() => {
            scheduleMaindata(intervalId, info, torrents)
        }, info.refresh_interval)
    }).catch(err => {
        console.error(err)
        ElMessage.error('/api/v2/sync/maindata error' + err)
        setTimeout(() => {
            scheduleMaindata(intervalId, info, torrents)
        }, info.refresh_interval)
    })

}

/**
 * 更新 torrents列表信息
 * @param ts
 * @param fullUpdate  是否全量替换
 */
const refreshTorrents = (torrents: TorrentInfo[], ts: any | null, fullUpdate: boolean) => {
    if (ts == null) {
        return
    }
    if (fullUpdate) {
        //第一步清空
        torrents.length = 0
        //转换装载对象
        Object.keys(ts)
            .map(key => new TorrentInfo(key).refresh(ts[key]))
            .sort((a, b) => b.properties.addition_date - a.properties.addition_date)
            .forEach(it => torrents.push(it))
    } else {
        torrents.forEach(it => it.refresh(ts[it.hash]))
    }
}


export {
    ByteData, GlobalInfo, Preference, TorrentFile, TorrentInfo, TorrentProperties, TorrentSetting, Tracker, mergeObj
}


