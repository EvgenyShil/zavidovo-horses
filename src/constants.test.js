import { describe, it, expect } from 'vitest'
import { BRAND, PHONE_LINK, services } from './constants.js'

describe('constants sanity', () => {
  it('BRAND contains double quotes and has no stray backslashes', () => {
    expect(BRAND).toContain('"')
    expect(/\/.test(BRAND)).toBe(false)
  })
  it('PHONE_LINK is digits only', () => {
    expect(/^\d+$/.test(PHONE_LINK)).toBe(true)
  })
  it('has at least 3 services', () => {
    expect(Array.isArray(services)).toBe(true)
    expect(services.length).toBeGreaterThanOrEqual(3)
  })
})
