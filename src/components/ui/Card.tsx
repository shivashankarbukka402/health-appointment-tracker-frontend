import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-soft border border-slate-100 ${className}`}
      {...props}
    />
  )
}