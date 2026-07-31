import { useState } from 'react'
import type { Vehicle } from '../types'
import { VEHICLE_DATA } from '../data/mockData'

interface VehicleSelectorProps {
  activeVehicle: Vehicle | null
  savedVehicles: Vehicle[]
  onSelect: (vehicle: Vehicle) => void
  onClose: () => void
}

const YEARS = Array.from({ length: 12 }, (_, i) => 2024 - i)
const MAKES = Object.keys(VEHICLE_DATA)

export default function VehicleSelector({ activeVehicle, savedVehicles, onSelect, onClose }: VehicleSelectorProps) {
  const [year, setYear] = useState<number | null>(activeVehicle?.year ?? null)
  const [make, setMake] = useState(activeVehicle?.make ?? '')
  const [model, setModel] = useState(activeVehicle?.model ?? '')
  const [engine, setEngine] = useState(activeVehicle?.engine ?? '')

  const models = make ? Object.keys(VEHICLE_DATA[make] ?? {}) : []
  const engines = make && model ? (VEHICLE_DATA[make]?.[model] ?? []) : []

  const isComplete = year && make && model && engine

  function apply() {
    if (!isComplete) return
    onSelect({ id: `v_${Date.now()}`, year: year!, make, model, engine })
    onClose()
  }

  function reset() {
    setYear(null); setMake(''); setModel(''); setEngine('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}
      >
        {/* Шапка */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-wire">
          <div>
            <h2 className="font-display text-xl font-700 text-ink" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              Выберите автомобиль
            </h2>
            <p className="text-sm text-ink-40 mt-0.5">Найдите запчасти, подходящие именно вашему автомобилю</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-ink-40 hover:bg-surface-2 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Сохранённые автомобили */}
        {savedVehicles.length > 0 && (
          <div className="px-6 py-4 border-b border-wire">
            <p className="text-xs font-600 text-ink-40 uppercase tracking-widest mb-3" style={{ fontFamily: 'Barlow, sans-serif' }}>Мой гараж</p>
            <div className="flex flex-wrap gap-2">
              {savedVehicles.map(v => (
                <button
                  key={v.id}
                  onClick={() => { onSelect(v); onClose() }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                    activeVehicle?.id === v.id
                      ? 'bg-brand-tint border-brand text-brand'
                      : 'bg-surface border-wire text-ink-60 hover:border-brand hover:text-brand'
                  }`}
                  style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 500 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"/>
                    <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
                  </svg>
                  {v.year} {v.make} {v.model}
                  {activeVehicle?.id === v.id && (
                    <span className="w-1.5 h-1.5 bg-brand rounded-full"/>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Форма выбора */}
        <div className="px-6 py-5">
          <p className="text-xs font-600 text-ink-40 uppercase tracking-widest mb-3" style={{ fontFamily: 'Barlow, sans-serif' }}>Добавить автомобиль</p>
          <div className="grid grid-cols-2 gap-3">
            {/* Год */}
            <div>
              <label className="block text-xs font-600 text-ink-60 mb-1.5" style={{ fontFamily: 'Barlow, sans-serif' }}>Год выпуска</label>
              <select
                value={year ?? ''}
                onChange={e => { setYear(e.target.value ? parseInt(e.target.value) : null); setMake(''); setModel(''); setEngine('') }}
                className="w-full px-3 py-2.5 rounded-lg border border-wire text-sm text-ink bg-white focus:outline-none focus:border-brand transition-colors"
              >
                <option value="">Выберите год</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            {/* Марка */}
            <div>
              <label className="block text-xs font-600 text-ink-60 mb-1.5" style={{ fontFamily: 'Barlow, sans-serif' }}>Марка</label>
              <select
                value={make}
                onChange={e => { setMake(e.target.value); setModel(''); setEngine('') }}
                disabled={!year}
                className="w-full px-3 py-2.5 rounded-lg border border-wire text-sm text-ink bg-white focus:outline-none focus:border-brand transition-colors disabled:opacity-40"
              >
                <option value="">Выберите марку</option>
                {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Модель */}
            <div>
              <label className="block text-xs font-600 text-ink-60 mb-1.5" style={{ fontFamily: 'Barlow, sans-serif' }}>Модель</label>
              <select
                value={model}
                onChange={e => { setModel(e.target.value); setEngine('') }}
                disabled={!make}
                className="w-full px-3 py-2.5 rounded-lg border border-wire text-sm text-ink bg-white focus:outline-none focus:border-brand transition-colors disabled:opacity-40"
              >
                <option value="">Выберите модель</option>
                {models.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Двигатель */}
            <div>
              <label className="block text-xs font-600 text-ink-60 mb-1.5" style={{ fontFamily: 'Barlow, sans-serif' }}>Двигатель</label>
              <select
                value={engine}
                onChange={e => setEngine(e.target.value)}
                disabled={!model}
                className="w-full px-3 py-2.5 rounded-lg border border-wire text-sm text-ink bg-white focus:outline-none focus:border-brand transition-colors disabled:opacity-40"
              >
                <option value="">Выберите двигатель</option>
                {engines.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>

          {/* Индикатор прогресса */}
          <div className="flex gap-1.5 mt-4">
            {[!!year, !!make, !!model, !!engine].map((done, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${done ? 'bg-brand' : 'bg-wire'}`}
              />
            ))}
          </div>
        </div>

        {/* Подвал */}
        <div className="flex items-center justify-between px-6 py-4 bg-surface border-t border-wire">
          <button
            onClick={reset}
            className="text-sm text-ink-40 hover:text-ink transition-colors"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            Сбросить
          </button>
          <button
            onClick={apply}
            disabled={!isComplete}
            className="px-6 py-2.5 bg-brand hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-600 transition-colors"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            Найти запчасти для этого автомобиля
          </button>
        </div>
      </div>
    </div>
  )
}
