const initData = {
    'categories': {},
    'full_update': true,
    'rid': 1,
    'server_state': {
        'alltime_dl': 220293881445,
        'alltime_ul': 1477619826207,
        'average_time_queue': 3452,
        'connection_status': 'connected',
        'dht_nodes': 731,
        'dl_info_data': 0,
        'dl_info_speed': 0,
        'dl_rate_limit': 0,
        'free_space_on_disk': 17617567744,
        'global_ratio': '6.70',
        'queued_io_jobs': 0,
        'queueing': true,
        'read_cache_hits': '0',
        'read_cache_overload': '0',
        'refresh_interval': 1500,
        'total_buffers_size': 32768,
        'total_peer_connections': 34,
        'total_queued_size': 0,
        'total_wasted_session': 0,
        'up_info_data': 45627856074,
        'up_info_speed': 86289,
        'up_rate_limit': 0,
        'use_alt_speed_limits': false,
        'write_cache_overload': '0'
    },
    'tags': [],
    'torrents': {
        '3158bc6a3ebf4b33fe4c2e8a64c7d0c6c42a0acf': {
            'added_on': 1708346744,
            'amount_left': 0,
            'auto_tmm': false,
            'availability': -1,
            'category': '',
            'completed': 19081039662,
            'completion_on': 1708788143,
            'content_path': '/downloads/2023年12月合集',
            'dl_limit': 0,
            'dlspeed': 0,
            'download_path': '',
            'downloaded': 19292165148,
            'downloaded_session': 0,
            'eta': 8640000,
            'f_l_piece_prio': false,
            'force_start': false,
            'infohash_v1': '3158bc6a3ebf4b33fe4c2e8a64c7d0c6c42a0acf',
            'infohash_v2': '',
            'last_activity': 1712673796,
            'magnet_uri': 'magnet:?xt=urn:btih:3158bc6a3ebf4b33fe4c2e8a64c7d0c6c42a0acf&dn=2023%e5%b9%b412%e6%9c%88%e5%90%88%e9%9b%86',
            'max_ratio': -1,
            'max_seeding_time': -1,
            'name': '2023年12月合集',
            'num_complete': 32,
            'num_incomplete': 2817,
            'num_leechs': 14,
            'num_seeds': 0,
            'priority': 0,
            'progress': 1,
            'ratio': 19.859356180543514,
            'ratio_limit': -2,
            'save_path': '/downloads',
            'seeding_time': 2380663,
            'seeding_time_limit': -2,
            'seen_complete': 1712642833,
            'seq_dl': false,
            'size': 19081039662,
            'state': 'uploading',
            'super_seeding': false,
            'tags': '',
            'time_active': 2822061,
            'total_size': 19081039662,
            'tracker': '',
            'trackers_count': 0,
            'up_limit': 0,
            'uploaded': 383129979168,
            'uploaded_session': 41493951970,
            'upspeed': 107351
        },
        'fe4febd0581492f01c583ca2201c9af7ef697365': {
            'added_on': 1710435981,
            'amount_left': 0,
            'auto_tmm': false,
            'availability': 0.996999979019165,
            'category': '',
            'completed': 4385144832,
            'completion_on': 1710462131,
            'content_path': '/downloads/2024年02月合集',
            'dl_limit': 0,
            'dlspeed': 0,
            'download_path': '',
            'downloaded': 11673922778,
            'downloaded_session': 0,
            'eta': 8640000,
            'f_l_piece_prio': false,
            'force_start': false,
            'infohash_v1': 'fe4febd0581492f01c583ca2201c9af7ef697365',
            'infohash_v2': '',
            'last_activity': 1712673787,
            'magnet_uri': 'magnet:?xt=urn:btih:fe4febd0581492f01c583ca2201c9af7ef697365&dn=2024%e5%b9%b402%e6%9c%88%e5%90%88%e9%9b%86',
            'max_ratio': -1,
            'max_seeding_time': -1,
            'name': '2024年02月合集',
            'num_complete': 170,
            'num_incomplete': 2679,
            'num_leechs': 15,
            'num_seeds': 0,
            'priority': 0,
            'progress': 1,
            'ratio': 4.640462861471911,
            'ratio_limit': -2,
            'save_path': '/downloads',
            'seeding_time': 823802,
            'seeding_time_limit': -2,
            'seen_complete': 1712667608,
            'seq_dl': false,
            'size': 4385144832,
            'state': 'uploading',
            'super_seeding': false,
            'tags': '',
            'time_active': 849953,
            'total_size': 26032070156,
            'tracker': '',
            'trackers_count': 0,
            'up_limit': 0,
            'uploaded': 54172405099,
            'uploaded_session': 4133904104,
            'upspeed': 13073
        }
    },
    'trackers': {}
}

const syncData = {
    'rid': 2,
    'server_state': {
        'alltime_dl': Math.floor(Math.random() * 220293915921),
        'alltime_ul': Math.floor(Math.random() * 1477620344431),
        'total_buffers_size': 65536,
        'total_peer_connections': Math.floor(Math.random() * 100),
        'up_info_data': Math.floor(Math.random() * 45628338590),
        'up_info_speed': Math.floor(Math.random() * 1023461)
    },
    'torrents': {
        '3158bc6a3ebf4b33fe4c2e8a64c7d0c6c42a0acf': {
            'num_leechs': Math.floor(Math.random() * 100),
            'ratio': Math.floor(Math.random() * 100),
            'seeding_time': 2380666,
            'time_active': 2822064,
            'uploaded': Math.floor(Math.random() * 1020153461),
            'uploaded_session': 41494434486,
            'upspeed': Math.floor(Math.random() * 1023461)
        },
        'fe4febd0581492f01c583ca2201c9af7ef697365': {
            'num_leechs': Math.floor(Math.random() * 100),
            'num_seeds': Math.floor(Math.random() * 100),
            'seeding_time': 823805,
            'time_active': 849956,
            'upspeed': Math.floor(Math.random() * 1023461)
        }
    }
}


const files = [
    {
        "availability": 1,
        "index": 0,
        "is_seed": false,
        "name": "375本全彩/mycomics（2024.2.27版本）.改rar",
        "piece_range": [
            0,
            14510
        ],
        "priority": 1,
        "progress": 0.009854799741658472,
        "size": 60862268917
    },
    {
        "availability": 1,
        "index": 1,
        "name": "375本全彩/目录.后缀改成rar",
        "piece_range": [
            14510,
            14566
        ],
        "priority": 1,
        "progress": 0.01803121200121728,
        "size": 232613537
    }
]

const files2 = [
    {
        "availability": 1,
        "index": 0,
        "is_seed": false,
        "name": "2024年02月合集/前作/[ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION/[221227][ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第2巻.mkv",
        "piece_range": [
            0,
            246
        ],
        "priority": 1,
        "progress": 0.7083399058045812,
        "size": 517708617
    },
    {
        "availability": 1,
        "index": 1,
        "name": "2024年02月合集/Fonts.zip",
        "piece_range": [
            246,
            299
        ],
        "priority": 1,
        "progress": 1,
        "size": 109699905
    },
    {
        "availability": 1,
        "index": 2,
        "name": "2024年02月合集/Subs.zip",
        "piece_range": [
            299,
            299
        ],
        "priority": 1,
        "progress": 1,
        "size": 149747
    },
    {
        "availability": 1,
        "index": 3,
        "name": "2024年02月合集/02月海报/69～偽りの微笑～ ～性妊欲求～.jpg",
        "piece_range": [
            299,
            299
        ],
        "priority": 1,
        "progress": 1,
        "size": 384836
    },
    {
        "availability": 1,
        "index": 4,
        "name": "2024年02月合集/02月海报/NO 猥婦 NO LIFE！ 1[chin].jpg",
        "piece_range": [
            299,
            299
        ],
        "priority": 1,
        "progress": 1,
        "size": 451108
    },
    {
        "availability": 1,
        "index": 5,
        "name": "2024年02月合集/02月海报/OVA ツンデロシリーズ ＃5.jpg",
        "piece_range": [
            299,
            299
        ],
        "priority": 1,
        "progress": 1,
        "size": 393099
    },
    {
        "availability": 1,
        "index": 6,
        "name": "2024年02月合集/02月海报/OVA ツンデロシリーズ ＃6.jpg",
        "piece_range": [
            299,
            300
        ],
        "priority": 1,
        "progress": 1,
        "size": 408401
    },
    {
        "availability": 1,
        "index": 7,
        "name": "2024年02月合集/02月海报/初めてのヒトヅマ 第6話 母子の思い.jpg",
        "piece_range": [
            300,
            300
        ],
        "priority": 1,
        "progress": 1,
        "size": 296238
    },
    {
        "availability": 1,
        "index": 8,
        "name": "2024年02月合集/02月海报/勇者姫ミリア 第二話 知識の園で情報収集！ アカデミアのエッチな授業！.jpg",
        "piece_range": [
            300,
            300
        ],
        "priority": 1,
        "progress": 1,
        "size": 476558
    },
    {
        "availability": 1,
        "index": 9,
        "name": "2024年02月合集/02月海报/同居する粘液 第2話 混ざり合う日常.jpg",
        "piece_range": [
            300,
            300
        ],
        "priority": 1,
        "progress": 1,
        "size": 342735
    },
    {
        "availability": 1,
        "index": 10,
        "name": "2024年02月合集/02月海报/姉辱尽くし ～滴り零れる姉辱の嬌声～.jpg",
        "piece_range": [
            300,
            300
        ],
        "priority": 1,
        "progress": 1,
        "size": 389813
    },
    {
        "availability": 1,
        "index": 11,
        "name": "2024年02月合集/02月海报/満たされて目覚める朝に、地味な朝食を The Animation.jpg",
        "piece_range": [
            300,
            300
        ],
        "priority": 1,
        "progress": 1,
        "size": 399261
    },
    {
        "availability": 1,
        "index": 12,
        "name": "2024年02月合集/02月海报/異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第3巻.jpg",
        "piece_range": [
            300,
            301
        ],
        "priority": 1,
        "progress": 1,
        "size": 420753
    },
    {
        "availability": 1,
        "index": 13,
        "name": "2024年02月合集/02月海报/異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第4巻.jpg",
        "piece_range": [
            301,
            301
        ],
        "priority": 1,
        "progress": 1,
        "size": 488672
    },
    {
        "availability": 1,
        "index": 14,
        "name": "2024年02月合集/03月预告/OVA 初恋時間。 ＃5.jpg",
        "piece_range": [
            301,
            301
        ],
        "priority": 1,
        "progress": 1,
        "size": 490226
    },
    {
        "availability": 1,
        "index": 15,
        "name": "2024年02月合集/03月预告/OVA 初恋時間。 ＃6.jpg",
        "piece_range": [
            301,
            301
        ],
        "priority": 1,
        "progress": 1,
        "size": 364713
    },
    {
        "availability": 1,
        "index": 16,
        "name": "2024年02月合集/03月预告/おじさんで埋める穴 THE ANIMATION 第1巻.jpg",
        "piece_range": [
            301,
            301
        ],
        "priority": 1,
        "progress": 1,
        "size": 343277
    },
    {
        "availability": 1,
        "index": 17,
        "name": "2024年02月合集/03月预告/おじさんで埋める穴 THE ANIMATION 第2巻.jpg",
        "piece_range": [
            301,
            302
        ],
        "priority": 1,
        "progress": 1,
        "size": 317608
    },
    {
        "availability": 1,
        "index": 18,
        "name": "2024年02月合集/03月预告/シニシスタ 第二話 母と子.jpg",
        "piece_range": [
            302,
            302
        ],
        "priority": 1,
        "progress": 1,
        "size": 192690
    },
    {
        "availability": 1,
        "index": 19,
        "name": "2024年02月合集/03月预告/ルインズシーカー 第1章 彼方に在りし尋ね人.jpg",
        "piece_range": [
            302,
            302
        ],
        "priority": 1,
        "progress": 1,
        "size": 436541
    },
    {
        "availability": 1,
        "index": 20,
        "name": "2024年02月合集/03月预告/断れない母 前編[gonza].jpg",
        "piece_range": [
            302,
            302
        ],
        "priority": 1,
        "progress": 1,
        "size": 353284
    },
    {
        "availability": 1,
        "index": 21,
        "name": "2024年02月合集/03月预告/旬花蒐陶 ～生イキアオ歓サラシ～.jpg",
        "piece_range": [
            302,
            302
        ],
        "priority": 1,
        "progress": 1,
        "size": 390482
    },
    {
        "availability": 1,
        "index": 22,
        "name": "2024年02月合集/CHS/[240202][King Bee]同居する粘液 第2話 混ざり合う日常.chs.mp4",
        "piece_range": [
            302,
            444
        ],
        "priority": 1,
        "progress": 1,
        "size": 297509235
    },
    {
        "availability": 1,
        "index": 23,
        "name": "2024年02月合集/CHS/[240202][ばにぃうぉ～か～]OVAツンデロシリーズ ＃5.chs.mp4",
        "piece_range": [
            444,
            634
        ],
        "priority": 1,
        "progress": 0.4472007217629213,
        "size": 398338002
    },
    {
        "availability": 1,
        "index": 24,
        "name": "2024年02月合集/CHS/[240202][ばにぃうぉ～か～]OVAツンデロシリーズ ＃6.chs.mp4",
        "piece_range": [
            634,
            844
        ],
        "priority": 1,
        "progress": 0.22899760686460066,
        "size": 440645356
    },
    {
        "availability": 1,
        "index": 25,
        "name": "2024年02月合集/CHS/[240202][メリー・ジェーン]初めてのヒトヅマ 第6話 母子の思い.chs.mp4",
        "piece_range": [
            844,
            979
        ],
        "priority": 1,
        "progress": 1,
        "size": 283145660
    },
    {
        "availability": 1,
        "index": 26,
        "name": "2024年02月合集/CHS/[240222][nur]69～偽りの微笑～ ～性妊欲求～.chs.mp4",
        "piece_range": [
            979,
            1182
        ],
        "priority": 1,
        "progress": 0.45764524862434625,
        "size": 425342858
    },
    {
        "availability": 1,
        "index": 27,
        "name": "2024年02月合集/CHS/[240222][nur]姉辱尽くし ～滴り零れる姉辱の嬌声～.chs.mp4",
        "piece_range": [
            1182,
            1401
        ],
        "priority": 1,
        "progress": 0.2827409275141128,
        "size": 459043150
    },
    {
        "availability": 1,
        "index": 28,
        "name": "2024年02月合集/CHS/[240222][ショーテン]満たされて目覚める朝に、地味な朝食を The Animation.chs.mp4",
        "piece_range": [
            1401,
            1543
        ],
        "priority": 1,
        "progress": 0.6893780723061486,
        "size": 297064308
    },
    {
        "availability": 1,
        "index": 29,
        "name": "2024年02月合集/CHS/[240222][ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第3巻.chs.mp4",
        "piece_range": [
            1543,
            1716
        ],
        "priority": 1,
        "progress": 0.49064142473997124,
        "size": 363149775
    },
    {
        "availability": 1,
        "index": 30,
        "name": "2024年02月合集/CHS/[240222][ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第4巻.chs.mp4",
        "piece_range": [
            1716,
            1927
        ],
        "priority": 1,
        "progress": 0.14167300808778274,
        "size": 444082898
    },
    {
        "availability": 1,
        "index": 31,
        "name": "2024年02月合集/CHS/[240222][魔人]勇者姫ミリア 第二話 知識の園で情報収集！ アカデミアのエッチな授業！.chs.mp4",
        "piece_range": [
            1927,
            2131
        ],
        "priority": 1,
        "progress": 0.3818979142576348,
        "size": 427648455
    },
    {
        "availability": 1,
        "index": 32,
        "name": "2024年02月合集/CHS/[240223][Queen Bee]NO 猥婦 NO LIFE！1.chs.mp4",
        "piece_range": [
            2131,
            2335
        ],
        "priority": 1,
        "progress": 0.34153537923867033,
        "size": 426778234
    },
    {
        "availability": 1,
        "index": 33,
        "name": "2024年02月合集/CHT/[240202][King Bee]同居する粘液 第2話 混ざり合う日常.cht.mp4",
        "piece_range": [
            2335,
            2477
        ],
        "priority": 1,
        "progress": 1,
        "size": 297503735
    },
    {
        "availability": 1,
        "index": 34,
        "name": "2024年02月合集/CHT/[240202][ばにぃうぉ～か～]OVAツンデロシリーズ ＃5.cht.mp4",
        "piece_range": [
            2477,
            2667
        ],
        "priority": 1,
        "progress": 1,
        "size": 398338956
    },
    {
        "availability": 1,
        "index": 35,
        "name": "2024年02月合集/CHT/[240202][ばにぃうぉ～か～]OVAツンデロシリーズ ＃6.cht.mp4",
        "piece_range": [
            2667,
            2877
        ],
        "priority": 1,
        "progress": 1,
        "size": 440424671
    },
    {
        "availability": 1,
        "index": 36,
        "name": "2024年02月合集/CHT/[240202][メリー・ジェーン]初めてのヒトヅマ 第6話 母子の思い.cht.mp4",
        "piece_range": [
            2877,
            3012
        ],
        "priority": 1,
        "progress": 1,
        "size": 283077796
    },
    {
        "availability": 1,
        "index": 37,
        "name": "2024年02月合集/CHT/[240222][nur]69～偽りの微笑～ ～性妊欲求～.cht.mp4",
        "piece_range": [
            3012,
            3214
        ],
        "priority": 1,
        "progress": 1,
        "size": 425278153
    },
    {
        "availability": 1,
        "index": 38,
        "name": "2024年02月合集/CHT/[240222][nur]姉辱尽くし ～滴り零れる姉辱の嬌声～.cht.mp4",
        "piece_range": [
            3214,
            3433
        ],
        "priority": 1,
        "progress": 1,
        "size": 458997439
    },
    {
        "availability": 1,
        "index": 39,
        "name": "2024年02月合集/CHT/[240222][ショーテン]満たされて目覚める朝に、地味な朝食を The Animation.cht.mp4",
        "piece_range": [
            3433,
            3575
        ],
        "priority": 1,
        "progress": 1,
        "size": 296943962
    },
    {
        "availability": 1,
        "index": 40,
        "name": "2024年02月合集/CHT/[240222][ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第3巻.cht.mp4",
        "piece_range": [
            3575,
            3748
        ],
        "priority": 1,
        "progress": 1,
        "size": 363063893
    },
    {
        "availability": 1,
        "index": 41,
        "name": "2024年02月合集/CHT/[240222][ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第4巻.cht.mp4",
        "piece_range": [
            3748,
            3960
        ],
        "priority": 1,
        "progress": 1,
        "size": 444014234
    },
    {
        "availability": 1,
        "index": 42,
        "name": "2024年02月合集/CHT/[240222][魔人]勇者姫ミリア 第二話 知識の園で情報収集！ アカデミアのエッチな授業！.cht.mp4",
        "piece_range": [
            3960,
            4164
        ],
        "priority": 1,
        "progress": 1,
        "size": 427436121
    },
    {
        "availability": 1,
        "index": 43,
        "name": "2024年02月合集/CHT/[240223][Queen Bee]NO 猥婦 NO LIFE！1.cht.mp4",
        "piece_range": [
            4164,
            4367
        ],
        "priority": 1,
        "progress": 1,
        "size": 426654707
    },
    {
        "availability": 1,
        "index": 44,
        "name": "2024年02月合集/RAW/[240202][King Bee]同居する粘液 第2話 混ざり合う日常.mkv",
        "piece_range": [
            4367,
            4482
        ],
        "priority": 1,
        "progress": 0.7919103090942773,
        "size": 241874779
    },
    {
        "availability": 1,
        "index": 45,
        "name": "2024年02月合集/RAW/[240202][ばにぃうぉ～か～]OVAツンデロシリーズ ＃5.mkv",
        "piece_range": [
            4482,
            4654
        ],
        "priority": 1,
        "progress": 0.8309551401890928,
        "size": 359770821
    },
    {
        "availability": 1,
        "index": 46,
        "name": "2024年02月合集/RAW/[240202][ばにぃうぉ～か～]OVAツンデロシリーズ ＃6.mkv",
        "piece_range": [
            4654,
            4849
        ],
        "priority": 1,
        "progress": 0.8414609992086476,
        "size": 410067628
    },
    {
        "availability": 1,
        "index": 47,
        "name": "2024年02月合集/RAW/[240202][メリー・ジェーン]初めてのヒトヅマ 第6話 母子の思い.mkv",
        "piece_range": [
            4849,
            4973
        ],
        "priority": 1,
        "progress": 0.7485877994407326,
        "size": 258586146
    },
    {
        "availability": 1,
        "index": 48,
        "name": "2024年02月合集/RAW/[240222][nur]69～偽りの微笑～ ～性妊欲求～.mkv",
        "piece_range": [
            4973,
            5177
        ],
        "priority": 1,
        "progress": 0.8285479191165394,
        "size": 428109823
    },
    {
        "availability": 1,
        "index": 49,
        "name": "2024年02月合集/RAW/[240222][nur]姉辱尽くし ～滴り零れる姉辱の嬌声～.mkv",
        "piece_range": [
            5177,
            5365
        ],
        "priority": 1,
        "progress": 0.7441430684374091,
        "size": 393435876
    },
    {
        "availability": 1,
        "index": 50,
        "name": "2024年02月合集/RAW/[240222][ショーテン]満たされて目覚める朝に、地味な朝食を The Animation.mkv",
        "piece_range": [
            5365,
            5487
        ],
        "priority": 1,
        "progress": 0.8534685925748734,
        "size": 257615324
    },
    {
        "availability": 1,
        "index": 51,
        "name": "2024年02月合集/RAW/[240222][ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第3巻.mkv",
        "piece_range": [
            5487,
            5645
        ],
        "priority": 1,
        "progress": 0.7584556725510512,
        "size": 329926092
    },
    {
        "availability": 1,
        "index": 52,
        "name": "2024年02月合集/RAW/[240222][ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第4巻.mkv",
        "piece_range": [
            5645,
            5861
        ],
        "priority": 1,
        "progress": 0.8154879178772579,
        "size": 454637328
    },
    {
        "availability": 1,
        "index": 53,
        "name": "2024年02月合集/RAW/[240222][魔人]勇者姫ミリア 第二話 知識の園で情報収集！ アカデミアのエッチな授業！.mkv",
        "piece_range": [
            5861,
            6037
        ],
        "priority": 1,
        "progress": 0.9371624861610931,
        "size": 367116243
    },
    {
        "availability": 1,
        "index": 54,
        "name": "2024年02月合集/RAW/[240223][Queen Bee]NO 猥婦 NO LIFE！1.mkv",
        "piece_range": [
            6037,
            6199
        ],
        "priority": 1,
        "progress": 0.8339113845782761,
        "size": 340921043
    },
    {
        "availability": 1,
        "index": 55,
        "name": "2024年02月合集/前作/[King Bee]同居する粘液/[231110][King Bee]同居する粘液 第1話日常の中の非日常.chs.mp4",
        "piece_range": [
            6199,
            6337
        ],
        "priority": 1,
        "progress": 0.49916864864944566,
        "size": 288926577
    },
    {
        "availability": 1,
        "index": 56,
        "name": "2024年02月合集/前作/[King Bee]同居する粘液/[231110][King Bee]同居する粘液 第1話日常の中の非日常.cht.mp4",
        "piece_range": [
            6337,
            6475
        ],
        "priority": 1,
        "progress": 0.23047902737760098,
        "size": 288878562
    },
    {
        "availability": 1,
        "index": 57,
        "name": "2024年02月合集/前作/[King Bee]同居する粘液/[231110][King Bee]同居する粘液 第1話日常の中の非日常.mkv",
        "piece_range": [
            6475,
            6597
        ],
        "priority": 1,
        "progress": 0.16698270849765126,
        "size": 256788792
    },
    {
        "availability": 1,
        "index": 58,
        "name": "2024年02月合集/前作/[King Bee]同居する粘液/同居する粘液 第1話 日常の中の非日常.jpg",
        "piece_range": [
            6597,
            6597
        ],
        "priority": 1,
        "progress": 1,
        "size": 344799
    },
    {
        "availability": 1,
        "index": 59,
        "name": "2024年02月合集/前作/[nur]姉辱尽くし/[231124][nur]姉辱尽くし ～滑り堕ちる姉の淫汁～.chs.mp4",
        "piece_range": [
            6597,
            6817
        ],
        "priority": 1,
        "progress": 0.14252268078333832,
        "size": 460562576
    },
    {
        "availability": 1,
        "index": 60,
        "name": "2024年02月合集/前作/[nur]姉辱尽くし/[231124][nur]姉辱尽くし ～滑り堕ちる姉の淫汁～.cht.mp4",
        "piece_range": [
            6817,
            7036
        ],
        "priority": 1,
        "progress": 0.28218822601173205,
        "size": 460695465
    },
    {
        "availability": 1,
        "index": 61,
        "name": "2024年02月合集/前作/[nur]姉辱尽くし/[231203][231124][nur]姉辱尽くし ～滑り堕ちる姉の淫汁～.mkv",
        "piece_range": [
            7036,
            7238
        ],
        "priority": 1,
        "progress": 0.5727051741389491,
        "size": 422085785
    },
    {
        "availability": 1,
        "index": 62,
        "name": "2024年02月合集/前作/[nur]姉辱尽くし/姉辱尽くし ～滑り堕ちる姉の淫汁～.jpg",
        "piece_range": [
            7238,
            7238
        ],
        "priority": 1,
        "progress": 1,
        "size": 342717
    },
    {
        "availability": 1,
        "index": 63,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/[230901][ばにぃうぉ～か～]OVAツンデロシリーズ ＃1.chs.mp4",
        "piece_range": [
            7238,
            7414
        ],
        "priority": 1,
        "progress": 0.0828766466045123,
        "size": 368944923
    },
    {
        "availability": 1,
        "index": 64,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/[230901][ばにぃうぉ～か～]OVAツンデロシリーズ ＃1.cht.mp4",
        "piece_range": [
            7414,
            7590
        ],
        "priority": 1,
        "progress": 0.11938607200011407,
        "size": 368888860
    },
    {
        "availability": 1,
        "index": 65,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/[230901][ばにぃうぉ～か～]OVAツンデロシリーズ ＃1.mkv",
        "piece_range": [
            7590,
            7736
        ],
        "priority": 1,
        "progress": 0.1477861932510324,
        "size": 306997325
    },
    {
        "availability": 1,
        "index": 66,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/[230901][ばにぃうぉ～か～]OVAツンデロシリーズ ＃2.chs.mp4",
        "piece_range": [
            7736,
            7920
        ],
        "priority": 1,
        "progress": 0.1162829103056809,
        "size": 385332375
    },
    {
        "availability": 1,
        "index": 67,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/[230901][ばにぃうぉ～か～]OVAツンデロシリーズ ＃2.cht.mp4",
        "piece_range": [
            7920,
            8104
        ],
        "priority": 1,
        "progress": 0.1581843862768006,
        "size": 385205945
    },
    {
        "availability": 1,
        "index": 68,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/[230901][ばにぃうぉ～か～]OVAツンデロシリーズ ＃2.mkv",
        "piece_range": [
            8104,
            8266
        ],
        "priority": 1,
        "progress": 0.09260583204366707,
        "size": 339743581
    },
    {
        "availability": 1,
        "index": 69,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/[231201][ばにぃうぉ～か～]OVAツンデロシリーズ ＃3.chs.mp4",
        "piece_range": [
            8266,
            8443
        ],
        "priority": 1,
        "progress": 0.08036572927306952,
        "size": 371708392
    },
    {
        "availability": 1,
        "index": 70,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/[231201][ばにぃうぉ～か～]OVAツンデロシリーズ ＃3.cht.mp4",
        "piece_range": [
            8443,
            8620
        ],
        "priority": 1,
        "progress": 0.09718409846058687,
        "size": 371664167
    },
    {
        "availability": 1,
        "index": 71,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/[231201][ばにぃうぉ～か～]OVAツンデロシリーズ ＃3.mkv",
        "piece_range": [
            8620,
            8771
        ],
        "priority": 1,
        "progress": 0.13547103091460286,
        "size": 316955778
    },
    {
        "availability": 1,
        "index": 72,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/[231201][ばにぃうぉ～か～]OVAツンデロシリーズ ＃4.chs.mp4",
        "piece_range": [
            8771,
            8966
        ],
        "priority": 1,
        "progress": 0.15948218076054202,
        "size": 407642482
    },
    {
        "availability": 1,
        "index": 73,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/[231201][ばにぃうぉ～か～]OVAツンデロシリーズ ＃4.cht.mp4",
        "piece_range": [
            8966,
            9160
        ],
        "priority": 1,
        "progress": 0.1440786255616622,
        "size": 407557025
    },
    {
        "availability": 1,
        "index": 74,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/[231201][ばにぃうぉ～か～]OVAツンデロシリーズ ＃4.mkv",
        "piece_range": [
            9160,
            9331
        ],
        "priority": 1,
        "progress": 0.11734455775839797,
        "size": 357868842
    },
    {
        "availability": 1,
        "index": 75,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/OVA ツンデロシリーズ ＃1.jpg",
        "piece_range": [
            9331,
            9331
        ],
        "priority": 1,
        "progress": 1,
        "size": 417980
    },
    {
        "availability": 1,
        "index": 76,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/OVA ツンデロシリーズ ＃2.jpg",
        "piece_range": [
            9331,
            9331
        ],
        "priority": 1,
        "progress": 1,
        "size": 455891
    },
    {
        "availability": 1,
        "index": 77,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/OVA ツンデロシリーズ ＃3.jpg",
        "piece_range": [
            9331,
            9331
        ],
        "priority": 1,
        "progress": 1,
        "size": 421182
    },
    {
        "availability": 1,
        "index": 78,
        "name": "2024年02月合集/前作/[ばにぃうぉ～か～]OVAツンデロシリーズ/OVA ツンデロシリーズ ＃4.jpg",
        "piece_range": [
            9331,
            9331
        ],
        "priority": 1,
        "progress": 1,
        "size": 400856
    },
    {
        "availability": 1,
        "index": 79,
        "name": "2024年02月合集/前作/[ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION/[221227][ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第1巻.chs.mp4",
        "piece_range": [
            9331,
            9498
        ],
        "priority": 1,
        "progress": 0.1030154030920239,
        "size": 349480805
    },
    {
        "availability": 1,
        "index": 80,
        "name": "2024年02月合集/前作/[ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION/[221227][ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第1巻.cht.mp4",
        "piece_range": [
            9498,
            9665
        ],
        "priority": 1,
        "progress": 0.1324735039988427,
        "size": 349365455
    },
    {
        "availability": 1,
        "index": 81,
        "name": "2024年02月合集/前作/[ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION/[221227][ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第1巻.mkv",
        "piece_range": [
            9665,
            9896
        ],
        "priority": 1,
        "progress": 0.4003184710237587,
        "size": 486098227
    },
    {
        "availability": 1,
        "index": 82,
        "name": "2024年02月合集/前作/[ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION/[221227][ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第2巻.chs.mp4",
        "piece_range": [
            9896,
            10084
        ],
        "priority": 1,
        "progress": 0.14480495854866016,
        "size": 393079212
    },
    {
        "availability": 1,
        "index": 83,
        "name": "2024年02月合集/前作/[ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION/[221227][ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第2巻.cht.mp4",
        "piece_range": [
            10084,
            10271
        ],
        "priority": 1,
        "progress": 0.15230094988661336,
        "size": 392630020
    },
    {
        "availability": 1,
        "index": 84,
        "name": "2024年02月合集/2024年2月里番简评.txt",
        "piece_range": [
            10271,
            10271
        ],
        "priority": 1,
        "progress": 1,
        "size": 3846
    },
    {
        "availability": 1,
        "index": 85,
        "name": "2024年02月合集/前作/[ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION/異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第1巻.jpg",
        "piece_range": [
            10271,
            10271
        ],
        "priority": 1,
        "progress": 1,
        "size": 432953
    },
    {
        "availability": 1,
        "index": 86,
        "name": "2024年02月合集/前作/[ピンクパイナップル]異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION/異世界来たのでスケベスキルで全力謳歌しようと思う THE ANIMATION 第2巻.jpg",
        "piece_range": [
            10271,
            10271
        ],
        "priority": 1,
        "progress": 1,
        "size": 438993
    },
    {
        "availability": 1,
        "index": 87,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[200522][720p][BIG5][メリー・ジェーン]初めてのヒトヅマ 第1話 俺が見たことのない彼女.mp4",
        "piece_range": [
            10271,
            10352
        ],
        "priority": 1,
        "progress": 0.07107246721925212,
        "size": 169320420
    },
    {
        "availability": 1,
        "index": 88,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[200522][720p][GB][メリー・ジェーン]初めてのヒトヅマ 第1話 俺が見たことのない彼女.mp4",
        "piece_range": [
            10352,
            10433
        ],
        "priority": 1,
        "progress": 0.18260245930114202,
        "size": 169332577
    },
    {
        "availability": 1,
        "index": 89,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[200522][Ma10p_720p][メリー・ジェーン]初めてのヒトヅマ 第1話 俺が見たことのない彼女.mkv",
        "piece_range": [
            10433,
            10508
        ],
        "priority": 1,
        "progress": 0.18200475491778265,
        "size": 156546976
    },
    {
        "availability": 1,
        "index": 90,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[200807][720p][BIG5][メリー・ジェーン]初めてのヒトヅマ 第2話 続・俺が見たことのない彼女.mp4.mp4",
        "piece_range": [
            10508,
            10611
        ],
        "priority": 1,
        "progress": 0.11615585281546452,
        "size": 216655669
    },
    {
        "availability": 1,
        "index": 91,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[200807][720p][GB][メリー・ジェーン]初めてのヒトヅマ 第2話 続・俺が見たことのない彼女.mp4",
        "piece_range": [
            10611,
            10714
        ],
        "priority": 1,
        "progress": 0.18393823937964068,
        "size": 216626451
    },
    {
        "availability": 1,
        "index": 92,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[200807][Ma444-10p_1080p][メリー・ジェーン] 初めてのヒトヅマ 第2話 続・俺が見たことのない彼女 .mkv",
        "piece_range": [
            10714,
            10937
        ],
        "priority": 1,
        "progress": 0.16536957815856657,
        "size": 468195498
    },
    {
        "availability": 1,
        "index": 93,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[211126][メリー・ジェーン]初めてのヒトヅマ 第3話 デリバリーセックス.png",
        "piece_range": [
            10937,
            10938
        ],
        "priority": 1,
        "progress": 1,
        "size": 1802163
    },
    {
        "availability": 1,
        "index": 94,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[220304][メリー・ジェーン]初めてのヒトヅマ 第4話 ビッチな女子の恋愛相談.jpg",
        "piece_range": [
            10938,
            10938
        ],
        "priority": 1,
        "progress": 1,
        "size": 117034
    },
    {
        "availability": 1,
        "index": 95,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[230503][メリー・ジェーン]初めてのヒトヅマ 第5話 J系ママの試験対策.chs.mp4",
        "piece_range": [
            10938,
            11090
        ],
        "priority": 1,
        "progress": 0.07996725434637594,
        "size": 319044479
    },
    {
        "availability": 1,
        "index": 96,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[230503][メリー・ジェーン]初めてのヒトヅマ 第5話 J系ママの試験対策.cht.mp4",
        "piece_range": [
            11090,
            11243
        ],
        "priority": 1,
        "progress": 0.07232410072602748,
        "size": 318962445
    },
    {
        "availability": 1,
        "index": 97,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[230503][メリー・ジェーン]初めてのヒトヅマ 第5話 J系ママの試験対策.mkv",
        "piece_range": [
            11243,
            11373
        ],
        "priority": 1,
        "progress": 0.09957938257090516,
        "size": 273781332
    },
    {
        "availability": 1,
        "index": 98,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[メリージェーン]初めてのヒトヅマ 第4話 ビッチな女子の恋愛相談.chs.mp4",
        "piece_range": [
            11373,
            11474
        ],
        "priority": 1,
        "progress": 0.1758910702633484,
        "size": 212209528
    },
    {
        "availability": 1,
        "index": 99,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[メリージェーン]初めてのヒトヅマ 第4話 ビッチな女子の恋愛相談.cht.mp4",
        "piece_range": [
            11474,
            11575
        ],
        "priority": 1,
        "progress": 0.13015333221545128,
        "size": 212163112
    },
    {
        "availability": 1,
        "index": 100,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[メリージェーン]初めてのヒトヅマ 第4話 ビッチな女子の恋愛相談.mkv",
        "piece_range": [
            11575,
            11696
        ],
        "priority": 1,
        "progress": 0.1761669925285794,
        "size": 252014724
    },
    {
        "availability": 1,
        "index": 101,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[メリー・ジェーン]初めてのヒトヅマ 第2話 続・俺が見たことのない彼女.jpg",
        "piece_range": [
            11696,
            11696
        ],
        "priority": 1,
        "progress": 1,
        "size": 571442
    },
    {
        "availability": 1,
        "index": 102,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[メリー・ジェーン]初めてのヒトヅマ 第3話 デリバリーセックス.chs.mp4",
        "piece_range": [
            11696,
            11781
        ],
        "priority": 1,
        "progress": 0.1454435356658176,
        "size": 179148017
    },
    {
        "availability": 1,
        "index": 103,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[メリー・ジェーン]初めてのヒトヅマ 第3話 デリバリーセックス.cht.mp4",
        "piece_range": [
            11781,
            11867
        ],
        "priority": 1,
        "progress": 0.13400451888999812,
        "size": 179203300
    },
    {
        "availability": 1,
        "index": 104,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[メリー・ジェーン]初めてのヒトヅマ 第3話 デリバリーセックス.mkv",
        "piece_range": [
            11867,
            11935
        ],
        "priority": 1,
        "progress": 0.10220422969506358,
        "size": 142489279
    },
    {
        "availability": 1,
        "index": 105,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/[封面][メリー・ジェーン]初めてのヒトヅマ 第1話 俺が見たことのない彼女.jpg",
        "piece_range": [
            11935,
            11935
        ],
        "priority": 1,
        "progress": 1,
        "size": 341241
    },
    {
        "availability": 1,
        "index": 106,
        "name": "2024年02月合集/前作/[メリー・ジェーン]初めてのヒトヅマ/初めてのヒトヅマ 第5話 J系ママの試験対策.jpg",
        "piece_range": [
            11935,
            11935
        ],
        "priority": 1,
        "progress": 1,
        "size": 404397
    },
    {
        "availability": 1,
        "index": 107,
        "name": "2024年02月合集/前作/[魔人]勇者姫ミリア/[231222][魔人]勇者姫ミリア 第一話 史上最悪の勇者爆誕！ ナマイキ勇者をわからせろ！.chs.mp4",
        "piece_range": [
            11935,
            12103
        ],
        "priority": 1,
        "progress": 0.07399867861892533,
        "size": 351903027
    },
    {
        "availability": 1,
        "index": 108,
        "name": "2024年02月合集/前作/[魔人]勇者姫ミリア/[231222][魔人]勇者姫ミリア 第一話 史上最悪の勇者爆誕！ ナマイキ勇者をわからせろ！.cht.mp4",
        "piece_range": [
            12103,
            12271
        ],
        "priority": 1,
        "progress": 0.1315798346887112,
        "size": 351650153
    },
    {
        "availability": 1,
        "index": 109,
        "name": "2024年02月合集/前作/[魔人]勇者姫ミリア/[231222][魔人]勇者姫ミリア 第一話 史上最悪の勇者爆誕！ ナマイキ勇者をわからせろ！.mkv",
        "piece_range": [
            12271,
            12412
        ],
        "priority": 1,
        "progress": 0.16766977299793567,
        "size": 297314609
    },
    {
        "availability": 1,
        "index": 110,
        "name": "2024年02月合集/前作/[魔人]勇者姫ミリア/勇者姫ミリア 第一話 史上最悪の勇者爆誕！ ナマイキ勇者をわからせろ！.jpg",
        "piece_range": [
            12412,
            12413
        ],
        "priority": 1,
        "progress": 1,
        "size": 470630
    }
]


const trackers = [
    {
        "msg": "",
        "num_downloaded": 0,
        "num_leeches": 8,
        "num_peers": 0,
        "num_seeds": 0,
        "status": 2,
        "tier": -1,
        "url": "** [DHT] **"
    },
    {
        "msg": "",
        "num_downloaded": 0,
        "num_leeches": 12,
        "num_peers": 0,
        "num_seeds": 0,
        "status": 2,
        "tier": -1,
        "url": "** [PeX] **"
    },
    {
        "msg": "",
        "num_downloaded": 0,
        "num_leeches": 0,
        "num_peers": 0,
        "num_seeds": 0,
        "status": 2,
        "tier": -1,
        "url": "** [LSD] **"
    }
]
const catogry = {
    "合计": {
        "name": "合计",
        "savePath": ""
    },
    "合集": {
        "name": "合集",
        "savePath": ""
    },
    "合集3": {
        "name": "合集3",
        "savePath": ""
    },
    "合集4": {
        "name": "合集4",
        "savePath": ""
    },
    "合集5": {
        "name": "合集5",
        "savePath": ""
    }
}
const Tags = ['标签1', '标签2', '标签3', '标签4']
const preferenece = {
    "add_trackers": "", "add_trackers_enabled": false, "alt_dl_limit": 20480, "alt_up_limit": 102400, "alternative_webui_enabled": true, "alternative_webui_path": "/dist", "announce_ip": "", "announce_to_all_tiers": true, "announce_to_all_trackers": false, "anonymous_mode": false, "async_io_threads": 10, "auto_delete_mode": 0, "auto_tmm_enabled": false, "autorun_enabled": false, "autorun_on_torrent_added_enabled": false, "autorun_on_torrent_added_program": "", "autorun_program": "", "banned_IPs": "", "bittorrent_protocol": 0, "block_peers_on_privileged_ports": false, "bypass_auth_subnet_whitelist": "", "bypass_auth_subnet_whitelist_enabled": false, "bypass_local_auth": false, "category_changed_tmm_enabled": false, "checking_memory_use": 32, "connection_speed": 30, "current_interface_address": "", "current_network_interface": "", "dht": true, "disk_cache": -1, "disk_cache_ttl": 60, "disk_io_read_mode": 1, "disk_io_type": 0, "disk_io_write_mode": 1, "disk_queue_size": 1048576, "dl_limit": 0, "dont_count_slow_torrents": true, "dyndns_domain": "changeme.dyndns.org", "dyndns_enabled": false, "dyndns_password": "", "dyndns_service": 0, "dyndns_username": "", "embedded_tracker_port": 9000, "embedded_tracker_port_forwarding": false, "enable_coalesce_read_write": false, "enable_embedded_tracker": false, "enable_multi_connections_from_same_ip": false, "enable_piece_extent_affinity": false, "enable_upload_suggestions": false, "encryption": 0, "excluded_file_names": "", "excluded_file_names_enabled": false, "export_dir": "", "export_dir_fin": "", "file_pool_size": 5000, "hashing_threads": 1, "idn_support_enabled": false, "incomplete_files_ext": false, "ip_filter_enabled": false, "ip_filter_path": "", "ip_filter_trackers": false, "limit_lan_peers": true, "limit_tcp_overhead": false, "limit_utp_rate": true, "listen_port": 16881, "locale": "zh_CN", "lsd": true, "mail_notification_auth_enabled": true, "mail_notification_email": "", "mail_notification_enabled": false, "mail_notification_password": "", "mail_notification_sender": "qBittorrent_notification@example.com", "mail_notification_smtp": "smtp.changeme.com", "mail_notification_ssl_enabled": false, "mail_notification_username": "", "max_active_checking_torrents": 1, "max_active_downloads": 80, "max_active_torrents": 100, "max_active_uploads": 80, "max_concurrent_http_announces": 50, "max_connec": 100, "max_connec_per_torrent": 30, "max_ratio": -1, "max_ratio_act": 0, "max_ratio_enabled": false, "max_seeding_time": -1, "max_seeding_time_enabled": false, "max_uploads": 60, "max_uploads_per_torrent": 30, "memory_working_set_limit": 512, "outgoing_ports_max": 0, "outgoing_ports_min": 0, "peer_tos": 4, "peer_turnover": 4, "peer_turnover_cutoff": 90, "peer_turnover_interval": 300, "performance_warning": false, "pex": true, "preallocate_all": false, "proxy_auth_enabled": false, "proxy_hostname_lookup": true, "proxy_ip": "0.0.0.0", "proxy_password": "", "proxy_peer_connections": false, "proxy_port": 8080, "proxy_torrents_only": false, "proxy_type": 0, "proxy_username": "", "queueing_enabled": true, "random_port": false, "reannounce_when_address_changed": false, "recheck_completed_torrents": false, "refresh_interval": 1500, "request_queue_size": 500, "resolve_peer_countries": true, "resume_data_storage_type": "Legacy", "rss_auto_downloading_enabled": false, "rss_download_repack_proper_episodes": true, "rss_max_articles_per_feed": 50, "rss_processing_enabled": false, "rss_refresh_interval": 30, "rss_smart_episode_filters": "s(\\d+)e(\\d+)\n(\\d+)x(\\d+)\n(\\d{4}[.\\-]\\d{1,2}[.\\-]\\d{1,2})\n(\\d{1,2}[.\\-]\\d{1,2}[.\\-]\\d{4})", "save_path": "/downloads", "save_path_changed_tmm_enabled": false, "save_resume_data_interval": 60, "scan_dirs": {}, "schedule_from_hour": 8, "schedule_from_min": 0, "schedule_to_hour": 20, "schedule_to_min": 0, "scheduler_days": 0, "scheduler_enabled": false, "send_buffer_low_watermark": 10, "send_buffer_watermark": 500, "send_buffer_watermark_factor": 50, "slow_torrent_dl_rate_threshold": 2, "slow_torrent_inactive_timer": 60, "slow_torrent_ul_rate_threshold": 2, "socket_backlog_size": 30, "ssrf_mitigation": true, "start_paused_enabled": false, "stop_tracker_timeout": 5, "temp_path": "/downloads/incomplete", "temp_path_enabled": false, "torrent_changed_tmm_enabled": true, "torrent_content_layout": "Original", "torrent_stop_condition": "None", "up_limit": 0, "upload_choking_algorithm": 1, "upload_slots_behavior": 0, "upnp": true, "upnp_lease_duration": 0, "use_category_paths_in_manual_mode": false, "use_https": false, "utp_tcp_mixed_mode": 0, "validate_https_tracker_certificate": true, "web_ui_address": "*", "web_ui_ban_duration": 3600, "web_ui_clickjacking_protection_enabled": false, "web_ui_csrf_protection_enabled": false, "web_ui_custom_http_headers": "", "web_ui_domain_list": "*", "web_ui_host_header_validation_enabled": false, "web_ui_https_cert_path": "", "web_ui_https_key_path": "", "web_ui_max_auth_fail_count": 7, "web_ui_port": 8080, "web_ui_reverse_proxies_list": "", "web_ui_reverse_proxy_enabled": false, "web_ui_secure_cookie_enabled": true, "web_ui_session_timeout": 3600, "web_ui_upnp": true, "web_ui_use_custom_http_headers_enabled": false, "web_ui_username": "admin"
}
export {files, Tags, files2, preferenece, initData, syncData, trackers, catogry}

