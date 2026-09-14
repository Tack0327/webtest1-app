import { useEffect, useState } from 'react'

// 新規登録・編集で共用する物件フォーム
const EMPTY_FORM = { name: '', rent: '', area: '', layout: '' }

export default function PropertyForm({ initialValue, submitLabel, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)

  // 編集対象が変わったらフォームの内容を差し替える
  useEffect(() => {
    setForm(initialValue ?? EMPTY_FORM)
  }, [initialValue])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await onSubmit({
      name: form.name,
      rent: Number(form.rent),
      area: form.area,
      layout: form.layout,
    })
    setSubmitting(false)
  }

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <label>
        物件名
        <input type="text" value={form.name} onChange={handleChange('name')} required />
      </label>
      <label>
        家賃（円）
        <input
          type="number"
          min="0"
          value={form.rent}
          onChange={handleChange('rent')}
          required
        />
      </label>
      <label>
        エリア
        <input type="text" value={form.area} onChange={handleChange('area')} required />
      </label>
      <label>
        間取り
        <input
          type="text"
          placeholder="例：1LDK"
          value={form.layout}
          onChange={handleChange('layout')}
          required
        />
      </label>
      <div className="property-form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? '保存中...' : submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="cancel-button" onClick={onCancel}>
            キャンセル
          </button>
        )}
      </div>
    </form>
  )
}
