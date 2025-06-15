import { SvgMapViewerConfigUser } from '@daijimaps/svgmapviewer'

const userConfig: SvgMapViewerConfigUser = {
  title: 'Expo 2025',
  copyright: '@ Daiji Maps | map data @ OpenStreetMap contributers',
  zoomFactor: 5,
  cartoConfig: {
    backgroundColor: 'lightblue',
    skipNamePattern: /(ゾーン$|大屋根リング|日本国際博覧会|予定地|コンテナ埠頭)/,
    splitNamePattern: /(カフェ|レストラン|ミュージアム|センター|休憩所|案内図|パビリオン|マーケットプレイス|ターミナル|停留所|エクスペリエンス|ポップアップステージ)/,
  },
}

document.title = `svgmapviewer @ ${window.location.host}`

export default userConfig
