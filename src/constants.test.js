import { describe, it, expect } from 'vitest'
import { BRAND, PHONE_LINK, services } from './constants.js'

describe('constants sanity', () => {
  it('BRAND is a non-empty string', () => {
    expect(typeof BRAND).toBe('string')
    expect(BRAND.length).toBeGreaterThan(0)
  })
  it('PHONE_LINK is digits only', () => {
    expect(/^\d+$/.test(PHONE_LINK)).toBe(true)
  })
  it('has at least 3 services', () => {
    expect(Array.isArray(services)).toBe(true)
    expect(services.length).toBeGreaterThanOrEqual(3)
  })
})
