import { SvgMapViewerConfigUser } from '@daijimaps/svgmapviewer'

const userConfig: SvgMapViewerConfigUser = {
  title: 'Expo 2025',
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  zoomFactor: 5,
  cartoConfig: {
    skipNamePattern: /丁目$|町$|売店$|レストハウス|^新宿御苑$|センター|案内図$|Ticket|シラカシ/,
    splitNamePattern: /(カフェ|レストラン|ミュージアム|センター|門衛所|御休所|休憩所|案内図|パビリオン|マーケットプレイス|ターミナル|停留所|エクスペリエンス|ポップアップステージ)/,
  },
}

document.title = `svgmapviewer @ ${window.location.host}`

export default userConfig
