import { format } from 'date-fns';

function mergeObj(base: any, src: any) {
    if (src) { /* empty */
    } else {
        return base
    }
    const keysb = Object.keys(base)
    const keyss = Object.keys(src)
    for (const k of keyss) {
        if (keysb.includes(k)) {
            base[k] = src[k]
        }
    }
    return base
}

interface ByteUnit {
    name: string,
    size: number,
    value: number,
}

const units: ByteUnit[] = [
    { name: 'B', size: 1, value: 1 },
    { name: 'KB', size: 1024, value: 1 },
    { name: 'MB', size: 1024 * 1024, value: 1 },
    { name: 'GB', size: 1024 * 1024 * 1024, value: 1 },
    { name: 'TB', size: 1024 * 1024 * 1024 * 1024, value: 1 },
    { name: 'PB', size: 1024 * 1024 * 1024 * 1024 * 1024, value: 1 },
]

function findUnit(size: number, fixed: number = 1): ByteUnit {
    let unit: ByteUnit | null = null
    for (let i = 0; i < units.length; i++) {
        const c = units[i]
        if (size < c.size) {
            unit = units[i - 1]
            break
        }
    }
    if (unit == null) {
        unit = units[0]
    }
    return {
        name: unit.name,
        size: unit.size,
        value: Number((size / unit.size).toFixed(fixed))
    }
}


class TorrentSetting {
    public savePath = ''
    public downloadLimit = 0
    public uploadLimit = 0
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


class Torrent {

    show: boolean = false
    isActive: boolean = false

    /***********************************************/
    setting: TorrentSetting = new TorrentSetting()
    trackers: Tracker[] = []
    files: TorrentFile[] = []
    /***********************************************/

    hash: string = ''
    name: string = ''
    size: number = 0
    total_size: number = 0
    dlspeed: number = 0
    dl_limit: number = 0
    completed: number = 0
    downloaded: number = 0
    upspeed: number = 0
    up_limit: number = 0
    progress: number = 0
    seeding_time: number = 0
    eta: number = 0
    f_l_piece_prio: boolean = false
    force_start: boolean = false
    category: string = ''
    tags: string[] = []
    num_complete: number = 0
    num_incomplete: number = 0
    num_leechs: number = 0
    num_seeds: number = 0
    priority: number = 0
    ratio: number = 0
    seq_dl: boolean = false
    state: string = 'downloading'
    super_seeding: boolean = false
    magnet_uri: string = ''
    content_path: string = ''
    added_on: number = 0
    last_activity: number = 0
    time_active: number = 0
    tracker: string = ''
    save_path: string = ''

    addition_date = 1438429165
    comment = 'Debian CD from cdimage.debian.org'
    completion_date = 1438429234
    created_by = ''
    creation_date = 1433605214
    dl_speed = 0
    dl_speed_avg = 9736015
    last_seen = 1438430354
    nb_connections = 3
    nb_connections_limit = 250
    peers = 1
    peers_total = 89
    piece_size = 524288
    pieces_have = 1254
    pieces_num = 1254
    reannounce = 672
    seeds = 1
    seeds_total = 254
    share_ratio = 0.00072121022562178299
    time_elapsed = 1197
    total_downloaded = 681521119
    total_downloaded_session = 681521119
    total_uploaded = 491520
    total_uploaded_session = 491520
    total_wasted = 23481724
    up_speed = 0
    up_speed_avg = 410

    private readonly stateMap = {
        'downloading': [
            "allocating", //开启磁盘空间，马上就下载， 所以算在下载中
            "downloading",
            "metaDL",  //开始下载了，正在获取种子的metadata
            "stalledDL",  //开始下载了，但是无连接
            "checkingDL", //校验中，校验完成立即下载
            "forcedDL",//强制下载， 忽略队列限制
        ],
        'upload': [
            "uploading",
            "pausedUP",  //已经下载完成了，但是暂停上传中
            "quenedUP", //在队列中等待上传，应该已经下载完成了 ？？？
            "stalledUP",  //开始做种了，但是无连接
            "checkingUP", //校验中， 是下载完成后的校验
            "forcedUP",//强制上传， 应该已经下载完成了 ？？？
        ],
        'quene': [
            "quenedDL", //在队列中等待下载
        ],
        'error': [
            "pausedDL",
            "error",
            "missingFiles",
            "checkingResumeData",
            "moving",
            "unknown"
        ]
    }


    /**
     * 设置配置值
     */

    public initSetting() {
        this.setting.torrentName = this.name
        this.setting.savePath = this.save_path
        this.setting.downloadLimit = this.dl_limit
        this.setting.uploadLimit = this.up_limit
        this.setting.category = this.category
        this.setting.tags = this.tags
        this.setting.sequential = this.seq_dl
        this.setting.superSeed = this.super_seeding
        this.setting.f_l_piece_prio = this.f_l_piece_prio
    }

    /**
     * refreshFiles
     */
    public refreshFiles(tFiles: TorrentFile[]) {
        this.files.length = 0
        const fileMap = new Map<string, TorrentFile>()
        tFiles.map(it => it as TorrentFile).forEach(it => {
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
        console.log('files', this.files)
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

    public refreshTracker(data: any) {
        this.trackers.length = 0
        data.forEach((it: any) => {
            this.trackers.push(it)
        })
    }

    constructor(hash: string) {
        this.hash = hash
    }

    public refresh(obj: any) {
        //关于标签的数据，需要特殊处理
        const tags = obj.tags
        if (tags instanceof String || typeof tags == 'string') {
            obj.tags = tags.split(',').filter(it => it != '')
        }
        mergeObj(this, obj)
        return this
    }


    public getShowState(): string {
        return this.stateMap.downloading.includes(this.state) ? 'downloading' :
            this.stateMap.upload.includes(this.state) ? 'finish' :
                this.stateMap.quene.includes(this.state) ? 'quene' :
                    this.stateMap.error.includes(this.state) ? 'error' : 'unknown'
    }

    public getProgress(): number {
        return Math.floor(this.progress * 100) / 100
    }

    public getPercentageProgress() {
        return Math.floor(this.progress * 100)
    }

    public getEtaStr() {
        if (this.getProgress() == 1) {
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
        } else if (time > 60) {
            const m = Math.floor(time / 60)
            const s = time - (m * 60)
            return m + 'm ' + s + 's'
        } else {
            return time + 's'
        }
    }

    public getAddOnStr(ft = 'yyyy-MM-dd HH:mm:ss'): string {
        return format(new Date(this.added_on * 1000), ft)
    }

    public getLastActivityStr(ft = 'yyyy-MM-dd HH:mm:ss'): string {
        return format(new Date(this.last_activity * 1000), ft)
    }

}


class Preference {
    public show = false

    public loginShow: boolean = true

    public currentMenu = 'all'
    public showTorrentAddView = false
    public showDetail = false
    public currentTorrent: Torrent | null = null

    //本次定时任务批次的编码，
    public resetRid = false
    public rid = 0
    public intervalId: number = 0 //定时任务的批次号
    public isRequesting: boolean = false;
    public refresh_interval = 2000

    public torrents: Torrent[] = []
    /**********************************************************************/

    public connection_status = 'connected'
    public dht_nodes = 0
    public dl_info_data = 0
    public dl_info_speed = 0
    public dl_rate_limit = 0
    public up_info_data = 0
    public up_info_speed = 0
    public up_rate_limit = 0

    public categories: string[] = []
    public tags: string[] = []

    public alltime_dl = 224357181908
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

    /**************************************************************************/

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
    public scan_dirs = {}

    public refresh(obj: any) {
        //关于标签的数据，需要特殊处理
        const tags = obj.tags
        if (tags instanceof String || typeof tags == 'string') {
            obj.tags = tags.split(',').filter(it => it != '')
        }
        mergeObj(this, obj)
    }


    public getTorrents(category: string = 'all') {
        switch (category) {
            case 'all':
                return this.torrents
            case 'downloading':
                return this.torrents.filter(t => t.getShowState() == 'downloading')
            case 'finish':
                return this.torrents.filter(t => t.getShowState() == 'finish')
            case 'quene':
                return this.torrents.filter(t => t.getShowState() == 'quene')
            case 'error':
                return this.torrents.filter(t => t.getShowState() == 'error')
        }
        return this.torrents
    }


    /**
     * 更新 torrents列表信息
     * @param ts
     * @param fullUpdate  是否全量替换
     */
    public refreshTorrents(ts: any | null, fullUpdate: boolean) {
        if (ts == null) {
            return
        }
        const torrents = this.torrents
        if (fullUpdate) {
            //第一步清空
            torrents.length = 0
            //转换装载对象
            Object.keys(ts)
                .map(key => new Torrent(key).refresh(ts[key]))
                .sort((a: Torrent, b: Torrent) => b.addition_date - a.addition_date)
                .forEach(it => torrents.push(it))
        } else {
            torrents.forEach(it => it.refresh(ts[it.hash]))
        }
    }

    public setCategory(category: any | null) {
        if (category == null) {
            return
        }
        this.categories.length = 0
        Object.keys(category).forEach(it => {
            this.categories.push(it)
        })
    }

    public setTags(tags: string[] | String | null) {
        if (tags == null) {
            return
        }
        if (tags instanceof String) {
            this.tags.length = 0
            tags.split(",").forEach(it => {
                this.tags.push(it)
            })
            return
        }

        if (Array.isArray(tags)) {
            this.tags.length = 0
            tags.forEach(it => {
                this.tags.push(it)
            })
            return
        }
    }

}

export { Preference, Torrent, TorrentFile, TorrentSetting, Tracker, findUnit, units, type ByteUnit };

