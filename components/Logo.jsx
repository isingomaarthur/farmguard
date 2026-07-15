import Image from 'next/image'


export default function Logo({ variant = 'medium', alt = 'Farm Guard logo' }) {
  const sizes = {
    small: { width: 24, height: 24 },
    medium: { width: 64, height: 64 },
    large: { width: 96, height: 96 },
  }

  const { width, height } = sizes[variant] || sizes.medium

  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={width}
      height={height}
      style={{ height: 'auto' }}
      priority
    />
  )
}
