import { expect, test } from '@playwright/test'
import { HomePage } from './page-object-model/example-home-page'

test.describe.only('Apply Digital Homepage Tests', () => {
  test('Verify homepage content', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.navigateTo()

    // Verify main banner
    await expect(page.locator('h1:has-text("APPLY DIGITAL")')).toBeVisible()
    await expect(
      page.locator('h2:has-text("Your digital transformation partner")')
    ).toBeVisible()

    // Verify introductory paragraph
    await expect(
      page.locator(
        'text=Drive impact with strategy, products, platforms, commerce, and innovation.'
      )
    ).toBeVisible()
  })

  test('Verify navigation menu links', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.navigateTo()

    const navLinks = [
      { text: 'About Us', url: '/about-us/' },
      { text: 'Job Openings', url: '/careers/#current-openings' },
      { text: 'Insights', url: '/insights/learn/' },
      { text: 'Events', url: '/events/' },
    ]

    for (const link of navLinks) {
      const navItem = page.locator(
        `footer >> nav >> a:has-text('${link.text}')`
      )
      await expect(navItem).toBeVisible()
      await expect(navItem).toHaveAttribute('href', link.url)
    }
  })

  test('Verify client logos are displayed', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.navigateTo()

    const clientLogos = [
      'Kraft Heinz logo in dark grey',
      'Disney logo in dark grey.',
      'Lululemon logo in dark grey.',
      'Sony logo in dark grey.',
      'HBS logo in dark grey.',
      'Moderna logo in dark grey.',
      'Atlassian logo in dark grey.',
      'American Express Logo in dark grey.',
      'Coca-Cola Embonor logo in dark grey.',
      "Arc'teryx logo in dark grey.",
      'Games Workshop logo in dark grey.',
      'Western Union Logo in dark grey.',
      'Thomas Pink logo dark',
      'Tishman Speyer logo in dark grey.',
      'Parkland logo in dark',
      'Focus Features logo in dark grey.',
      'SelectQuote Logo in Dark',
      'A+E Networks Logo in Dark',
      'Dropbox Logo in Dark',
    ]

    for (const logo of clientLogos) {
      const escapedLogo = logo.replace(/'/g, "\\'") // Escape single quotes
      await expect(page.locator(`img[alt='${escapedLogo}']`)).toBeVisible()
    }
  })

  test('Verify footer links', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.navigateTo()

    const footerLinks = [
      {
        text: 'Privacy Policy',
        url: 'https://www.iubenda.com/privacy-policy/7875909',
      },
    ]

    for (const link of footerLinks) {
      const footerItem = page.locator(`footer >> a:has-text('${link.text}')`)
      await expect(footerItem).toBeVisible()
      await expect(footerItem).toHaveAttribute('href', link.url)
    }

    // Verify Cookies Preferences button
    const cookiesButton = page.locator(
      'footer >> button:has-text("Cookies Preferences")'
    )
    await expect(cookiesButton).toBeVisible()
  })

  test('Verify responsive design', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.navigateTo()

    // Test for desktop view
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('h1:has-text("APPLY DIGITAL")')).toBeVisible()

    // Test for mobile view
    await page.setViewportSize({ width: 375, height: 812 })
    await expect(page.locator('h1:has-text("APPLY DIGITAL")')).toBeVisible()
  })
})
