import Image from 'next/image'


export default function Logo({ variant = 'medium', alt = 'Farm Guard logo' }) {
  const sizes = {
    small: { width: 48, height: 48 },
    medium: { width: 128, height: 128 },
    large: { width: 256, height: 256 },
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
