class Info {
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


class ByteData {
  /**
   *
   * @param bytes  字节数
   */
  constructor(bytes: number) {
    this._bytes = bytes
  }

  private _bytes: number

  private readonly KB = 1024
  private readonly MB = 1024 * 1024
  private readonly GB = 1024 * 1024 * 1024
  private readonly TB = 1024 * 1024 * 1024 * 1024

  public setBytes(bytes: number) {
    this._bytes = bytes
  }

  public getSpeedUnit(): string {
    if (this._bytes < this.KB) {
      return 'B/s'
    }
    if (this._bytes < this.MB) {
      return 'KB/s'
    }
    if (this._bytes < this.GB) {
      return 'MB/s'
    }
    if (this._bytes < this.TB) {
      return 'GB/s'
    }
    return 'TB/s'
  }

  public getSizeUnit(): string {
    if (this._bytes < this.KB) {
      return 'B'
    }
    if (this._bytes < this.MB) {
      return 'KB'
    }
    if (this._bytes < this.GB) {
      return 'MB'
    }
    if (this._bytes < this.TB) {
      return 'GB'
    }
    return 'TB'
  }

  public getSize(): number {
    if (this._bytes < this.KB) {
      return this._bytes
    }
    if (this._bytes < this.MB) {
      return Math.round((this._bytes / this.KB) * 10) / 10
    }
    if (this._bytes < this.GB) {
      return Math.round((this._bytes / this.MB) * 10) / 10
    }
    if (this._bytes < this.TB) {
      return Math.round((this._bytes / this.GB) * 100) / 100
    }
    return Math.round((this._bytes / this.TB) * 100) / 100
  }

}


class TorrentInfo {
  hash = '8c212779b4abde7c6bc608063a0d008b7e40ce32'
  name = 'debian-8.1.0-amd64-CD-1.iso'
  size = 657457152
  dlspeed = 9681262
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
  progress = 0.16108787059783936
  ratio = 0
  seq_dl = false
  state = 'downloading'
  super_seeding = false
  upspeed = 0
  properties = new TorrentProperties()

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

export { Info, GlobalSpeedLimit, ByteData, TorrentInfo, TorrentProperties }