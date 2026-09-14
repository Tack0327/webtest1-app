import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { supabase } from '../supabaseClient'
import PropertyForm from './PropertyForm'
import './PropertiesPage.css'

export default function PropertiesPage() {
  const { session, signOut } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)

  // 物件一覧を取得する（RLSにより自分が登録した物件のみ返る）
  const fetchProperties = async () => {
    setLoading(true)
    setError('')

    const { data, error: fetchError } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError('物件一覧の取得に失敗しました。')
    } else {
      setProperties(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  // 物件の新規登録
  const handleCreate = async (values) => {
    const { error: insertError } = await supabase
      .from('properties')
      .insert({ ...values, user_id: session.user.id })

    if (insertError) {
      setError('物件の登録に失敗しました。')
      return
    }

    setShowCreateForm(false)
    fetchProperties()
  }

  // 物件の更新
  const handleUpdate = async (values) => {
    const { error: updateError } = await supabase
      .from('properties')
      .update(values)
      .eq('id', editingProperty.id)

    if (updateError) {
      setError('物件の更新に失敗しました。')
      return
    }

    setEditingProperty(null)
    fetchProperties()
  }

  // 物件の削除
  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) {
      return
    }

    const { error: deleteError } = await supabase.from('properties').delete().eq('id', id)

    if (deleteError) {
      setError('物件の削除に失敗しました。')
      return
    }

    fetchProperties()
  }

  return (
    <div className="properties-page">
      <div className="properties-header">
        <h1>物件一覧</h1>
        <div className="header-actions">
          <button
            className="new-button"
            onClick={() => {
              setEditingProperty(null)
              setShowCreateForm((prev) => !prev)
            }}
          >
            {showCreateForm ? '閉じる' : '新規登録'}
          </button>
          <button className="logout-button" onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {showCreateForm && (
        <PropertyForm submitLabel="登録する" onSubmit={handleCreate} />
      )}

      {loading ? (
        <p>読み込み中...</p>
      ) : properties.length === 0 ? (
        <p>登録された物件がありません。</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) =>
            editingProperty?.id === property.id ? (
              <div className="property-card" key={property.id}>
                <PropertyForm
                  initialValue={editingProperty}
                  submitLabel="更新する"
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingProperty(null)}
                />
              </div>
            ) : (
              <div className="property-card" key={property.id}>
                <h2>{property.name}</h2>
                <p className="rent">{property.rent.toLocaleString()}円</p>
                <p className="area">{property.area}／{property.layout}</p>
                <div className="card-actions">
                  <button onClick={() => setEditingProperty(property)}>編集</button>
                  <button className="delete-button" onClick={() => handleDelete(property.id)}>
                    削除
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  )
}
