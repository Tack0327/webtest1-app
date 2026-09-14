import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import './PropertiesPage.css'

// ダミーの物件データ
const DUMMY_PROPERTIES = [
  { id: 1, name: 'サンライズマンション101', rent: '8.5万円', area: '東京都渋谷区' },
  { id: 2, name: 'グリーンパークハイツ203', rent: '12.0万円', area: '東京都世田谷区' },
  { id: 3, name: 'アーバンビュー501', rent: '15.3万円', area: '東京都港区' },
  { id: 4, name: 'コーポラス桜台302', rent: '6.8万円', area: '東京都練馬区' },
  { id: 5, name: 'メゾン青葉104', rent: '9.2万円', area: '神奈川県横浜市' },
  { id: 6, name: 'リバーサイド新宿707', rent: '18.0万円', area: '東京都新宿区' },
]

export default function PropertiesPage() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="properties-page">
      <div className="properties-header">
        <h1>物件一覧</h1>
        <button className="logout-button" onClick={handleLogout}>
          ログアウト
        </button>
      </div>
      <div className="property-grid">
        {DUMMY_PROPERTIES.map((property) => (
          <div className="property-card" key={property.id}>
            <h2>{property.name}</h2>
            <p className="rent">{property.rent}</p>
            <p className="area">{property.area}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
