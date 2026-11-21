import React from 'react'

export function Logo() {
  return (
    <div className="yl-admin-logo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Young Leaders" width={72} height={72} />
      <div>
        <strong>Young Leaders</strong>
        <span>Espace d’administration</span>
      </div>
    </div>
  )
}

export function Icon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.png" alt="Young Leaders" width={28} height={28} style={{ objectFit: 'contain' }} />
  )
}
